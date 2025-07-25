// Servicio para comunicarse con la API de Gemini
class GeminiChatService {
  constructor() {
    this.conversationHistory = new Map(); // Historial por entidad
    this.messageCount = new Map(); // Contador de mensajes por sesión
    this.maxMessagesPerSession = 25; // Límite optimizado para uso personal
  }

  // Verificar si se puede enviar más mensajes
  canSendMessage(entity) {
    const count = this.messageCount.get(entity) || 0;
    return count < this.maxMessagesPerSession;
  }

  // Obtener mensajes restantes
  getRemainingMessages(entity) {
    const count = this.messageCount.get(entity) || 0;
    return Math.max(0, this.maxMessagesPerSession - count);
  }

  // Enviar mensaje al chat
  async sendMessage(entity, message) {
    try {
      // Verificar límite de mensajes
      if (!this.canSendMessage(entity)) {
        return {
          success: false,
          error: 'LIMIT_EXCEEDED',
          message: `Has alcanzado el límite de ${this.maxMessagesPerSession} mensajes con este personaje. ¡Vuelve mañana para más conversaciones!`
        };
      }

      // Obtener historial de conversación
      const history = this.conversationHistory.get(entity) || [];

      // Realizar petición a la API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          entity: entity,
          conversationHistory: history.slice(-6) // Solo últimas 6 interacciones para contexto
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la comunicación');
      }

      // Actualizar historial
      const newInteraction = {
        user: message,
        assistant: data.response,
        timestamp: new Date().toISOString()
      };

      const updatedHistory = [...history, newInteraction];
      this.conversationHistory.set(entity, updatedHistory);

      // Incrementar contador de mensajes
      const currentCount = this.messageCount.get(entity) || 0;
      this.messageCount.set(entity, currentCount + 1);

      return {
        success: true,
        response: data.response,
        character: data.character,
        remainingMessages: this.getRemainingMessages(entity)
      };

    } catch (error) {
      console.error('Error en GeminiChatService:', error);
      
      return {
        success: false,
        error: 'NETWORK_ERROR',
        message: 'Error de conexión. Intenta de nuevo en unos momentos.',
        fallback: this.getFallbackResponse(entity)
      };
    }
  }

  // Respuestas de emergencia cuando falla la API
  getFallbackResponse(entity) {
    const fallbacks = {
      lexcorp: "Sistema temporalmente fuera de línea. Los ingenieros de LexCorp están trabajando en una solución. — Sistema Automatizado",
      oracle: "Red de comunicaciones en mantenimiento. Sistemas de respaldo activados. — Oracle Network",
      sue: "Campo de fuerza temporal activo. Restableciendo comunicaciones... — Sue Storm"
    };

    return fallbacks[entity] || "Sistema temporalmente no disponible.";
  }

  // Limpiar historial de una entidad
  clearHistory(entity) {
    this.conversationHistory.delete(entity);
    this.messageCount.delete(entity);
  }

  // Limpiar todo el historial
  clearAllHistory() {
    this.conversationHistory.clear();
    this.messageCount.clear();
  }

  // Obtener estadísticas de uso
  getUsageStats() {
    const stats = {};
    ['lexcorp', 'oracle', 'sue'].forEach(entity => {
      stats[entity] = {
        messagesUsed: this.messageCount.get(entity) || 0,
        messagesRemaining: this.getRemainingMessages(entity),
        conversationLength: (this.conversationHistory.get(entity) || []).length
      };
    });
    return stats;
  }
}

// Instancia singleton del servicio
export const geminiChat = new GeminiChatService();

// Exportar también la clase para testing
export { GeminiChatService }; 