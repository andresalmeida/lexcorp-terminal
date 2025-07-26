// Servicio para comunicarse con la API de Gemini
class GeminiChatService {
  constructor() {
    this.conversationHistory = new Map(); // Historial por entidad
    this.messageCount = new Map(); // Contador de mensajes por sesión
    this.maxMessagesPerSession = 8; // Límite por personaje para experiencia equilibrada
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
          message: `Has alcanzado el límite de ${this.maxMessagesPerSession} mensajes con este personaje. ¡Prueba con otro personaje o vuelve más tarde!`
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
      // DC Universe
      lexcorp: "Sistema temporalmente fuera de línea. Los ingenieros de LexCorp están trabajando en una solución. — Sistema Automatizado",
      oracle: "Red de comunicaciones en mantenimiento. Sistemas de respaldo activados. — Oracle Network",
      superman: "Los sistemas de comunicación están experimentando interferencias. Mantén la esperanza, volveré pronto. — Superman",
      
      // Marvel Universe
      sue: "Campo de fuerza temporal activo. Restableciendo comunicaciones... — Sue Storm",
      ironman: "FRIDAY está realizando actualizaciones del sistema. Volveré con mejores respuestas. — Tony Stark",
      captainmarvel: "Señal perdida temporalmente. Regresando de misión cósmica. — Carol Danvers"
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
    // Incluir todos los personajes disponibles
    ['lexcorp', 'oracle', 'superman', 'sue', 'ironman', 'captainmarvel'].forEach(entity => {
      stats[entity] = {
        messagesUsed: this.messageCount.get(entity) || 0,
        messagesRemaining: this.getRemainingMessages(entity),
        conversationLength: (this.conversationHistory.get(entity) || []).length
      };
    });
    return stats;
  }

  // Obtener personajes por universo
  getDCCharacters() {
    return ['lexcorp', 'oracle', 'superman'];
  }

  getMarvelCharacters() {
    return ['sue', 'ironman', 'captainmarvel'];
  }

  // Verificar si una entidad pertenece a un universo específico
  isFromUniverse(entity, universe) {
    const dcChars = this.getDCCharacters();
    const marvelChars = this.getMarvelCharacters();
    
    if (universe === 'dc') return dcChars.includes(entity);
    if (universe === 'marvel') return marvelChars.includes(entity);
    return false;
  }
}

// Instancia singleton del servicio
export const geminiChat = new GeminiChatService();

// Exportar también la clase para testing
export { GeminiChatService }; 