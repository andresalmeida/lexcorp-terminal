import React, { useState, useEffect } from 'react';

const ContactSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const contactData = {
    personal: {
      name: 'Andrés Almeida Jara',
      title: 'Full Stack Developer & Data Analyst',
      location: 'Quito, Ecuador',
      timezone: 'UTC-5',
      languages: ['Español (Nativo)', 'Inglés (Fluido)']
    },
    contact: {
      email: 'almeidaandres12@gmail.com',
      phone: '+593 99 054 5539',
      website: 'www.adaghost.me',
      linkedin: 'linkedin.com/in/andres-almeida-jara/',
      github: 'github.com/andresalmeida'
    },
    availability: {
      status: 'Disponible para nuevas oportunidades',
      type: 'Full-time / Freelance / Consultoría',
      remote: 'Trabajo remoto preferido',
      relocation: 'Abierto a reubicación'
    }
  };

  const generateContactOutput = () => {
    const lines = [
      '┌─────────────────────────────────────────────────────────────┐',
      '│                     INFORMACIÓN DE CONTACTO                 │',
      '├─────────────────────────────────────────────────────────────┤',
      ''
    ];

    lines.push('👤 INFORMACIÓN PERSONAL');
    lines.push('═'.repeat(50));
    lines.push(`  Nombre:        ${contactData.personal.name}`);
    lines.push(`  Título:        ${contactData.personal.title}`);
    lines.push(`  Ubicación:     ${contactData.personal.location} (${contactData.personal.timezone})`);
    lines.push(`  Idiomas:       ${contactData.personal.languages.join(', ')}`);
    lines.push('');

    lines.push('📧 CONTACTO PROFESIONAL');
    lines.push('═'.repeat(50));
    lines.push(`  📧 Email:      ${contactData.contact.email}`);
    lines.push(`  📱 Teléfono:   ${contactData.contact.phone}`);
    lines.push(`  🌐 Website:    ${contactData.contact.website}`);
    lines.push(`  💼 LinkedIn:   ${contactData.contact.linkedin}`);
    lines.push(`  🐙 GitHub:     ${contactData.contact.github}`);
    lines.push('');

    lines.push('💼 DISPONIBILIDAD');
    lines.push('═'.repeat(50));
    lines.push(`  📊 Estado:     ${contactData.availability.status}`);
    lines.push(`  🕐 Modalidad:  ${contactData.availability.type}`);
    lines.push(`  🏠 Remoto:     ${contactData.availability.remote}`);
    lines.push(`  ✈️  Viajes:     ${contactData.availability.relocation}`);
    lines.push('');

    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('│ MEJOR FORMA DE CONTACTO                                     │');
    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('  🚀 Para oportunidades laborales: LinkedIn o Email');
    lines.push('  💡 Para colaboraciones técnicas: GitHub o Email');
    lines.push('  🤝 Para networking: LinkedIn o Twitter');
    lines.push('  📞 Para emergencias: WhatsApp/Telegram');
    lines.push('');
    lines.push('  ⏰ Horario de respuesta: 24-48 horas hábiles');
    lines.push('  🌍 Zona horaria preferida para calls: UTC-5 (9AM-6PM)');
    lines.push('');
    lines.push('└─────────────────────────────────────────────────────────────┘');
    lines.push('');
    lines.push('💌 Mensaje: ¡Siempre abierto a nuevas oportunidades y colaboraciones!');

    return lines.join('\n');
  };

  useEffect(() => {
    const fullText = generateContactOutput();
    let index = 0;

    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeText, Math.random() * 20 + 5);
      } else {
        setIsComplete(true);
        setShowCursor(false);
      }
    };

    typeText();

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      // Aquí podrías mostrar una notificación de éxito
      console.log(`${type} copiado al portapapeles: ${text}`);
    });
  };

  return (
    <div className="font-mono text-sm">
      <div className="bg-terminal-bg border border-terminal-accent/30 rounded p-4">
        <div className="text-terminal-accent mb-4 flex items-center">
          <span className="animate-pulse mr-2">●</span>
          CARGANDO INFORMACIÓN DE CONTACTO...
        </div>
        
        <pre className="text-terminal-text/90 whitespace-pre-wrap font-mono leading-relaxed">
          {displayedText}
          {!isComplete && showCursor && (
            <span className="text-terminal-accent animate-pulse">█</span>
          )}
        </pre>

        {isComplete && (
          <div className="mt-6 space-y-4">
            {/* Quick Contact Buttons */}
            <div className="p-4 bg-terminal-accent/10 border border-terminal-accent/30 rounded">
              <div className="text-terminal-accent font-semibold mb-3">
                🚀 CONTACTO RÁPIDO
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button 
                  onClick={() => copyToClipboard(contactData.contact.email, 'Email')}
                  className="p-2 bg-terminal-accent/20 border border-terminal-accent/40 rounded hover:bg-terminal-accent/30 transition-colors text-left"
                >
                  📧 Copiar Email
                </button>
                <button 
                  onClick={() => window.open(`https://${contactData.contact.linkedin}`, '_blank')}
                  className="p-2 bg-terminal-accent/20 border border-terminal-accent/40 rounded hover:bg-terminal-accent/30 transition-colors text-left"
                >
                  💼 Abrir LinkedIn
                </button>
                <button 
                  onClick={() => window.open(`https://${contactData.contact.github}`, '_blank')}
                  className="p-2 bg-terminal-accent/20 border border-terminal-accent/40 rounded hover:bg-terminal-accent/30 transition-colors text-left"
                >
                  🐙 Ver GitHub
                </button>
                <button 
                  onClick={() => copyToClipboard(contactData.contact.phone, 'Teléfono')}
                  className="p-2 bg-terminal-accent/20 border border-terminal-accent/40 rounded hover:bg-terminal-accent/30 transition-colors text-left"
                >
                  📱 Copiar Teléfono
                </button>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/40 rounded">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Estado: DISPONIBLE</span>
              </div>
              <span className="text-green-300 text-sm">Última actualización: Hoy</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection; 