import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiChat } from '../services/geminiService.js';

const EntityModal = ({ isOpen, onClose, entity, isLexAngry = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isShowingFarewell, setIsShowingFarewell] = useState(false);
  const [farewellText, setFarewellText] = useState('');
  
  // Estados para IA
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(25);
  
  // Estados para historial de chat
  const [chatHistory, setChatHistory] = useState([]);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  // Contenido específico para cada entidad
  const entityData = {
    lexcorp: {
      title: "LEXCORP SECURE CHANNEL",
      subtitle: "ENCRYPTED COMMUNICATION ESTABLISHED",
      header: "FROM: lex.luthor@lexcorp.com",
      timestamp: "CLASSIFIED // PRIORITY: ALPHA",
      theme: "lexcorp",
      glitch: false,
      messages: [
        "> Estableciendo canal seguro...",
        "> Verificación biométrica: AUTORIZADA",
        "> ",
        "Estimado colaborador,",
        "",
        "En LexCorp, no creemos en límites.",
        "Creemos en PODER. En INNOVACIÓN. En DOMINIO.",
        "",
        "Tu potencial es evidente, pero el potencial",
        "sin dirección es simplemente energía desperdiciada.",
        "",
        "Únete a nosotros. Ayúdanos a construir",
        "el futuro que MERECEMOS controlar.",
        "",
        "— L. Luthor",
        "CEO & Founder, LexCorp Industries",
        "",
        "> Transmisión completada.",
        "> Cerrando canal en 30 segundos..."
      ]
    },
    oracle: {
      title: "ORACLE NETWORK INTERFACE",
      subtitle: "INTELLIGENCE STREAM ACTIVE",
      header: "FROM: barbara.gordon@oracle.net",
      timestamp: "ENCRYPTED // BIRDS OF PREY PROTOCOL",
      theme: "oracle",
      glitch: false,
      messages: [
        "> Iniciando protocolo Oracle...",
        "> Red neuronal sincronizada",
        "> ",
        "Hola, futuro aliado.",
        "",
        "Información es poder, pero sabiduría",
        "es saber cómo usarla responsablemente.",
        "",
        "He estado monitoreando tu progreso.",
        "Tus habilidades técnicas son impresionantes,",
        "pero más importante: tu integridad permanece intacta.",
        "",
        "En esta era digital, necesitamos guardianes",
        "que protejan tanto la información como la humanidad.",
        "",
        "¿Estás listo para ser parte de la solución?",
        "",
        "— Oracle",
        "Coordinadora de Operaciones Especiales",
        "",
        "> Mensaje archivado en base de datos segura.",
        "> Mantén esta comunicación clasificada."
      ]
    },
    sue: {
      title: "FANTASTIC FOUR COMMUNICATIONS",
      subtitle: "INVISIBLE WOMAN PROTOCOL ACTIVE",
      header: "FROM: sue.storm@baxter-building.com",
      timestamp: "PHASE SHIFT // PRIORITY: FANTASTIC",
      theme: "sue",
      glitch: false,
      messages: [
        "> Activando campo de invisibilidad...",
        "> Comunicación cuántica establecida",
        "> ",
        "Mensaje desde el Edificio Baxter",
        "",
        "Hola, futuro miembro del equipo.",
        "",
        "Como líder de los Cuatro Fantásticos,",
        "he aprendido que los verdaderos superpoderes",
        "no solo vienen de radiación cósmica.",
        "",
        "La innovación, la creatividad y el trabajo en equipo",
        "son las fuerzas más poderosas del universo.",
        "",
        "Tu habilidad para resolver problemas complejos",
        "y crear soluciones elegantes me recuerda",
        "a Reed en sus mejores momentos.",
        "",
        "¿Estás listo para unirte a una misión",
        "que va más allá de las estrellas?",
        "",
        "— Sue Storm",
        "Fantastic Four // Invisible Woman",
        "",
        "> Desactivando campo de invisibilidad...",
        "> Transmisión completada desde dimensión N."
      ]
    }
  };

  // Mensaje especial cuando Lex se enoja por spam
  const lexAngryMessage = {
    title: "LEXCORP SECURITY BREACH DETECTED",
    subtitle: "UNAUTHORIZED RAPID ACCESS ATTEMPTS",
    header: "FROM: security@lexcorp.com",
    timestamp: "ALERT LEVEL: MAXIMUM // INTRUSION DETECTED",
    theme: "lexcorp",
    glitch: true,
    messages: [
      "> SISTEMA DE DETECCIÓN DE INTRUSOS ACTIVADO",
      "> Analizando patrones de comportamiento...",
      "> ",
      "¿EN SERIO?",
      "",
      "¿CREES QUE PUEDES JUGAR CON LEXCORP?",
      "¿ABRIR Y CERRAR MODALES COMO UN NIÑO?",
      "",
      "NO SOY TU JUGUETE.",
      "",
      "Si quieres información, USA EL TERMINAL",
      "como una persona CIVILIZADA.",
      "",
      "No vuelvas a hacer esto.",
      "",
      "— Lex Luthor // CEO & Dictador Supreme",
      "",
      "> CERRANDO COMUNICACIÓN POR ABUSO...",
      "> USUARIO BLOQUEADO POR 5 SEGUNDOS",
      "> ACCESO RESTRINGIDO"
    ]
  };

  // Respuestas de despedida personalizadas
  const farewellMessages = {
    lexcorp: [
      "> SISTEMA DE CHAT DETECTADO",
      "> Analizando intención comunicativa...",
      "> ",
      "Impresionante. Intentas comunicarte directamente.",
      "",
      "Pero no estás LISTO aún.",
      "LexCorp no habla con cualquiera.",
      "",
      "Demuestra tu VALOR primero.",
      "Cuando tengas algo que OFRECER,",
      "nosotros te contactaremos.",
      "",
      "— Sistema Automatizado LexCorp",
      "",
      "> Cerrando comunicación...",
      "> ACCESO DENEGADO"
    ],
    oracle: [
      "> PROTOCOLO DE CHAT ACTIVADO",
      "> Evaluando credenciales de seguridad...",
      "> ",
      "Interesante... intentas establecer contacto directo.",
      "",
      "Pero aún no es el momento adecuado.",
      "La confianza se construye con tiempo y acciones.",
      "",
      "Continúa desarrollando tus habilidades.",
      "Cuando demuestres que puedes manejar",
      "información sensible responsablemente,",
      "reanudaremos esta conversación.",
      "",
      "— Oracle Network AI",
      "",
      "> Pausando comunicaciones...",
      "> MANTÉN LA CALMA Y SIGUE ADELANTE"
    ],
    sue: [
      "> CAMPO DE FUERZA COMUNICACIONAL DETECTADO",
      "> Analizando patrones de energía...",
      "> ",
      "¡Vaya! Tienes iniciativa para comunicarte.",
      "",
      "Pero como Reed siempre dice:",
      "'La paciencia es la mayor de las virtudes científicas.'",
      "",
      "Tu momento llegará cuando estés preparado",
      "para las responsabilidades que conlleva",
      "formar parte de algo más grande.",
      "",
      "Sigue innovando. Te estaremos observando.",
      "",
      "— Sue Storm // Sistema de Monitoreo F4",
      "",
      "> Desvaneciendo comunicación...",
      "> INVISIBLE HASTA NUEVO AVISO"
    ]
  };

  const currentEntity = isLexAngry ? lexAngryMessage : (entityData[entity] || entityData.lexcorp);

  // Función para manejar el chat (versión mejorada con IA)
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isShowingFarewell || isAiLoading) return;

    const message = chatInput.trim();
    setChatInput('');

    // Activar modo IA y mostrar loading
    setIsAiMode(true);
    setIsAiLoading(true);
    setAiResponse('');

    try {
      // Llamar al servicio de IA
      const result = await geminiChat.sendMessage(entity, message);

      if (result.success) {
        // Agregar mensaje del usuario al historial
        const userMessage = {
          type: 'user',
          content: message,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        };
        
        setChatHistory(prev => [...prev, userMessage]);
        setIsAiLoading(false);
        setRemainingMessages(result.remainingMessages);
        setShowInitialMessage(false); // Ocultar mensaje inicial una vez que empezamos a chatear
        
        // Agregar respuesta de la IA al historial con efecto typing
        const aiMessage = {
          type: 'ai',
          content: '',
          timestamp: new Date().toLocaleTimeString([], { hour12: false }),
          character: result.character,
          isTyping: true
        };
        
        setChatHistory(prev => [...prev, aiMessage]);
        
        // Efecto typing para respuesta de IA
        let index = 0;
        const fullResponse = result.response;
        
        const typeAiResponse = () => {
          if (index < fullResponse.length) {
            setChatHistory(prev => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.type === 'ai') {
                lastMessage.content = fullResponse.slice(0, index + 1);
              }
              return updated;
            });
            index++;
            setTimeout(typeAiResponse, Math.random() * 25 + 15);
          } else {
            // Marcar como typing completo
            setChatHistory(prev => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage.type === 'ai') {
                lastMessage.isTyping = false;
              }
              return updated;
            });
          }
        };
        
        typeAiResponse();
        
      } else {
        // Manejar errores - agregar mensaje del usuario al historial
        const userMessage = {
          type: 'user',
          content: message,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        };
        
        setChatHistory(prev => [...prev, userMessage]);
        setIsAiLoading(false);
        setShowInitialMessage(false);
        
        // Agregar mensaje de error al historial
        const errorMessage = {
          type: 'ai',
          content: result.fallback || result.message || 'Error de conexión. Intenta de nuevo.',
          timestamp: new Date().toLocaleTimeString([], { hour12: false }),
          character: `${currentEntity.title} [SYSTEM ERROR]`,
          isTyping: false,
          isError: true
        };
        
        setChatHistory(prev => [...prev, errorMessage]);
        
        // Si es límite excedido, mostrar fallback clásico después de un momento
        if (result.error === 'LIMIT_EXCEEDED') {
          setTimeout(() => {
            showClassicFarewell();
          }, 2000);
        }
      }
      
    } catch (error) {
      console.error('Error en chat:', error);
      
      // Agregar mensaje del usuario al historial
      const userMessage = {
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour12: false })
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      setIsAiLoading(false);
      setShowInitialMessage(false);
      
      // Agregar mensaje de error al historial
      const errorMessage = {
        type: 'ai',
        content: 'Error de conexión. Los sistemas están experimentando problemas. Intenta de nuevo en unos momentos.',
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        character: `${currentEntity.title} [CONNECTION ERROR]`,
        isTyping: false,
        isError: true
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
      
      // Fallback a mensaje clásico
      setTimeout(() => {
        showClassicFarewell();
      }, 1500);
    }
  };

  // Función para mostrar despedida clásica (fallback)
  const showClassicFarewell = () => {
    const farewell = farewellMessages[entity] || farewellMessages.lexcorp;
    const farewellFullText = farewell.join('\n');
    
    setIsShowingFarewell(true);
    setFarewellText('');
    setIsAiMode(false);
    setAiResponse('');
    
    let index = 0;
    let farewellTimeoutId;
    
    const typeFarewell = () => {
      if (index < farewellFullText.length) {
        setFarewellText(farewellFullText.slice(0, index + 1));
        index++;
        farewellTimeoutId = setTimeout(typeFarewell, Math.random() * 40 + 30);
      } else {
        // Cerrar modal después de 3 segundos
        farewellTimeoutId = setTimeout(() => {
          onClose();
        }, 3000);
      }
    };

    typeFarewell();
  };

  // Reset completo cuando cambia la entidad o se abre/cierra el modal
  useEffect(() => {
    if (!isOpen) {
      // Resetear todo cuando se cierra
      setDisplayedText('');
      setIsTypingComplete(false);
      setChatInput('');
      setIsShowingFarewell(false);
      setFarewellText('');
      setShowCursor(true);
      return;
    }

    // Resetear todo cuando se abre o cambia de entidad
    setDisplayedText('');
    setIsTypingComplete(false);
    setChatInput('');
    setIsShowingFarewell(false);
    setFarewellText('');
    setShowCursor(true);
    
    // Resetear estados de IA
          setIsAiMode(false);
      setAiResponse('');
      setIsAiLoading(false);
      setChatHistory([]);
      setShowInitialMessage(true);
    setRemainingMessages(geminiChat.getRemainingMessages(entity));
    
    // Resetear historial de chat
    setChatHistory([]);
    setShowInitialMessage(true);

    if (!currentEntity.messages) return;

    const messages = currentEntity.messages;
    const fullText = messages.join('\n');
    
    let index = 0;
    let timeoutId;
    
    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeText, Math.random() * 15 + 10); // Más rápido para acceso inmediato
      } else {
        setIsTypingComplete(true);
      }
    };

    // Delay inicial reducido para acceso más rápido
    timeoutId = setTimeout(typeText, 300);
    
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen, entity]); // Removed isShowingFarewell dependency to prevent loops

  // Cursor parpadeante
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll al último mensaje
  useEffect(() => {
    if (chatHistory.length > 0) {
      const chatContainer = document.querySelector('.chat-history-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  if (!isOpen) return null;

  const getThemeClasses = () => {
    switch (currentEntity.theme) {
      case 'lexcorp':
        return {
          border: 'border-terminal-lexcorp-glow',
          glow: 'shadow-terminal-lexcorp-glow/30',
          accent: 'text-terminal-lexcorp-glow',
          bg: 'bg-terminal-lexcorp-secondary/10'
        };
      case 'oracle':
        return {
          border: 'border-terminal-oracle-glow',
          glow: 'shadow-terminal-oracle-glow/30',
          accent: 'text-terminal-oracle-glow',
          bg: 'bg-terminal-oracle-secondary/10'
        };
      case 'sue':
        return {
          border: 'border-terminal-sue-glow',
          glow: 'shadow-terminal-sue-glow/30',
          accent: 'text-terminal-sue-glow',
          bg: 'bg-terminal-sue-secondary/10'
        };
      default:
        return {
          border: 'border-terminal-text',
          glow: 'shadow-terminal-text/30',
          accent: 'text-terminal-text',
          bg: 'bg-terminal-bg/10'
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={isLexAngry ? undefined : onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
                      className={`
            bg-terminal-bg ${theme.border} ${theme.glow} ${theme.bg}
            border-2 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden
            ${isLexAngry ? 'animate-glitch border-4 border-red-500 shadow-red-500/50' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className={`border-b ${theme.border} p-4 ${theme.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className={`text-xl font-bold ${theme.accent} font-mono`}>
                {currentEntity.title}
              </h2>
              {!isLexAngry && (
                <button
                  onClick={onClose}
                  className={`${theme.accent} hover:bg-terminal-text/10 rounded px-2 py-1 transition-colors`}
                >
                  ✕
                </button>
              )}
              {isLexAngry && (
                <div className="text-red-500 font-bold animate-pulse">
                  🔒 BLOQUEADO
                </div>
              )}
            </div>
            <div className={`text-sm ${theme.accent}/70`}>
              {currentEntity.subtitle}
            </div>
            <div className="text-xs text-terminal-text/50 mt-2">
              <div>{currentEntity.header}</div>
              <div>{currentEntity.timestamp}</div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Mensaje inicial o historial de chat */}
            {showInitialMessage && !isShowingFarewell ? (
              <div className={`font-mono leading-relaxed ${isLexAngry ? 'text-red-400' : 'text-terminal-text'}`}>
                <pre className="whitespace-pre-wrap">
                  {displayedText}
                  {!isTypingComplete && showCursor && <span className={`${isLexAngry ? 'text-red-500' : theme.accent} animate-blink`}>|</span>}
                </pre>
              </div>
                         ) : chatHistory.length > 0 && !isShowingFarewell ? (
               <div className={`font-mono leading-relaxed max-h-80 overflow-y-auto chat-history-container scrollbar-thin scrollbar-track-terminal-bg scrollbar-thumb-terminal-text/30 ${isLexAngry ? 'text-red-400' : 'text-terminal-text'}`} style={{scrollbarWidth: 'thin'}}>
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-terminal-text/10 border border-terminal-text/30' 
                        : `bg-${currentEntity.theme === 'lexcorp' ? 'terminal-lexcorp-primary' : currentEntity.theme === 'oracle' ? 'terminal-oracle-primary' : 'terminal-sue-primary'}/10 border border-${currentEntity.theme === 'lexcorp' ? 'terminal-lexcorp-primary' : currentEntity.theme === 'oracle' ? 'terminal-oracle-primary' : 'terminal-sue-primary'}/30`
                    }`}>
                      <div className={`text-xs mb-1 ${
                        msg.type === 'user' 
                          ? 'text-terminal-text/60' 
                          : theme.accent
                      }`}>
                        {msg.type === 'user' ? 'USUARIO' : msg.character || currentEntity.title} • {msg.timestamp}
                      </div>
                                             <div className={`text-sm whitespace-pre-wrap ${msg.isError ? 'text-red-400' : ''}`}>
                         {msg.content}
                         {msg.isTyping && <span className={`${theme.accent} animate-blink`}>|</span>}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isShowingFarewell ? (
              <div className={`font-mono leading-relaxed ${isLexAngry ? 'text-red-400' : 'text-terminal-text'}`}>
                <pre className="whitespace-pre-wrap">
                  {farewellText}
                  {isShowingFarewell && <span className={`${theme.accent} animate-blink`}>|</span>}
                </pre>
              </div>
            ) : null}

            {/* Loading de IA */}
            {isAiLoading && (
              <div className="mt-4 flex items-center space-x-2 text-terminal-text/70">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-sm">Procesando respuesta...</span>
              </div>
            )}



            {/* Chat Input - Disponible inmediatamente (excepto en despedida y Lex enojado) */}
            {!isShowingFarewell && !isLexAngry && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 border-t border-terminal-text/20 pt-4"
              >
                <div className={`text-sm ${theme.accent} mb-2 flex justify-between items-center`}>
                  <span>› {isTypingComplete ? 'Comunicación directa con IA:' : 'Chat disponible mientras se conecta:'}</span>
                  <span className="text-xs text-terminal-text/60">
                    {remainingMessages} mensajes restantes
                  </span>
                </div>
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isAiLoading ? "Procesando..." : remainingMessages > 0 ? "Pregunta algo..." : "Límite alcanzado"}
                    disabled={isAiLoading || remainingMessages === 0}
                    className={`
                      flex-1 bg-terminal-bg border ${theme.border} 
                      ${theme.accent} placeholder-terminal-text/50 
                      px-3 py-2 rounded font-mono text-sm
                      focus:outline-none focus:ring-2 focus:ring-${currentEntity.theme === 'lexcorp' ? 'terminal-lexcorp-glow' : currentEntity.theme === 'oracle' ? 'terminal-oracle-glow' : 'terminal-sue-glow'}/50
                      ${(isAiLoading || remainingMessages === 0) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || remainingMessages === 0 || !chatInput.trim()}
                    className={`
                      px-4 py-2 ${theme.border} border ${theme.accent} 
                      hover:bg-${currentEntity.theme === 'lexcorp' ? 'terminal-lexcorp-glow' : currentEntity.theme === 'oracle' ? 'terminal-oracle-glow' : 'terminal-sue-glow'}/10 
                      rounded font-mono text-sm transition-colors
                      ${(isAiLoading || remainingMessages === 0 || !chatInput.trim()) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {isAiLoading ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </form>
                <div className="text-xs text-terminal-text/40 mt-2">
                  › {!isTypingComplete ? 
                      "Chat listo - No necesitas esperar a que termine la conexión" :
                      remainingMessages > 0 ? 
                      "Presiona Enter para chatear con IA" : 
                      "Límite diario alcanzado. ¡Vuelve mañana!"}
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className={`border-t ${theme.border} p-4 ${theme.bg}`}>
            <div className="flex justify-between items-center text-xs text-terminal-text/50">
              <div>SECURE CONNECTION: ACTIVE</div>
              <div className="flex space-x-4">
                <span>ENCRYPTION: AES-256</span>
                <span className={`${theme.accent}`}>STATUS: CONNECTED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EntityModal; 