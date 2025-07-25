import { useState, useEffect } from 'react';
import EntityModal from './EntityModal.jsx';

const ModalManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState('lexcorp');
  const [modalOpenCount, setModalOpenCount] = useState(0);
  const [isLexAngry, setIsLexAngry] = useState(false);
  const [lastOpenTime, setLastOpenTime] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const handleOpenModal = (event) => {
      // Si estás bloqueado, no hacer nada
      if (isBlocked) {
        console.log('🔒 LEXCORP SECURITY: Access denied. Try again later.');
        return;
      }

      const now = Date.now();
      const timeSinceLastOpen = now - lastOpenTime;
      
      // Si abres un modal menos de 3 segundos después del anterior, cuenta como spam
      if (timeSinceLastOpen < 3000) {
        setModalOpenCount(prev => prev + 1);
      } else {
        // Reset counter si pasó mucho tiempo
        setModalOpenCount(1);
      }
      
      setLastOpenTime(now);
      
      // Si abriste más de 4 modales rápidamente, Lex se enoja
      if (modalOpenCount >= 4 && !isLexAngry) {
        setIsLexAngry(true);
        setIsBlocked(true); // Bloquear acceso
        setCurrentEntity('lexcorp'); // Forzar que sea Lex quien se enoje
        setIsModalOpen(true);
        
        // Auto-cerrar después de 15 segundos - BERRINCHE COMPLETO DE LEX
        setTimeout(() => {
          setIsModalOpen(false);
          setIsLexAngry(false);
          setModalOpenCount(0);
        }, 20000);
        
        // Desbloquear después de 20 segundos total (15 + 5)
        setTimeout(() => {
          setIsBlocked(false);
          console.log('🔓 LEXCORP SECURITY: Access restored. Behave yourself.');
        }, 20000);
        
        return;
      }
      
      // Comportamiento normal
      setCurrentEntity(event.detail.entity || 'lexcorp');
      setIsModalOpen(true);
    };

    window.addEventListener('openEntityModal', handleOpenModal);

    return () => {
      window.removeEventListener('openEntityModal', handleOpenModal);
    };
  }, [modalOpenCount, lastOpenTime, isLexAngry, isBlocked]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <EntityModal 
      isOpen={isModalOpen} 
      onClose={closeModal} 
      entity={currentEntity}
      isLexAngry={isLexAngry}
    />
  );
};

export default ModalManager; 