import React, { useState, useEffect, useRef } from 'react';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import ProjectsSection from './ProjectsSection';

const PortfolioInterface = () => {
  const [currentView, setCurrentView] = useState('main');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pageStartTime] = useState(Date.now());
  const inputRef = useRef(null);

  const commands = {
    'help': {
      description: 'Mostrar todos los comandos disponibles',
      action: () => showHelp()
    },
    './skills': {
      description: 'Ver tecnologías y habilidades técnicas',
      action: () => setCurrentView('skills')
    },
    './experience': {
      description: 'Mostrar experiencia profesional y educación',
      action: () => setCurrentView('experience')
    },
    './projects': {
      description: 'Listar proyectos y repositorios',
      action: () => setCurrentView('projects')
    },
    './contact': {
      description: 'Información de contacto y redes sociales',
      action: () => setCurrentView('contact')
    },
    './home': {
      description: 'Volver al terminal principal (personajes)',
      action: () => window.location.href = '/'
    },
    'clear': {
      description: 'Limpiar terminal',
      action: () => {
        setCommandHistory([]);
        setCurrentView('main');
      }
    },
    'whoami': {
      description: 'Información del usuario',
      action: () => {
        const output = [
          '',
          '> Usuario: Andrés Almeida Jara',
          '> Rol: Full Stack Developer & Data Analyst',
          '> Especialidades: React, Python, R, Shiny, ETL Pipelines',
          '> Estado: DISPONIBLE PARA NUEVAS OPORTUNIDADES',
          '> Ubicación: Quito, Ecuador (UTC-5)',
          '> GitHub: github.com/andresalmeida',
          '> Email: almeidaandres12@gmail.com',
          ''
        ];
        
        setCommandHistory(prev => [...prev, {
          command: 'whoami',
          output: output,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        }]);
      }
    },
    'date': {
      description: 'Mostrar fecha y hora actual',
      action: () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('es-ES', { 
          hour12: false,
          timeZoneName: 'short'
        });
        
        const output = [
          '',
          `> Fecha: ${dateStr}`,
          `> Hora: ${timeStr}`,
          `> Zona horaria: Ecuador (UTC-5)`,
          `> Timestamp Unix: ${Math.floor(now.getTime() / 1000)}`,
          ''
        ];
        
        setCommandHistory(prev => [...prev, {
          command: 'date',
          output: output,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        }]);
      }
    },
    'uptime': {
      description: 'Tiempo de actividad del sistema',
      action: () => {
        const uptime = Date.now() - pageStartTime;
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        const uptimeStr = hours > 0 
          ? `${hours}h ${minutes % 60}m ${seconds % 60}s`
          : minutes > 0 
            ? `${minutes}m ${seconds % 60}s`
            : `${seconds}s`;
            
        const output = [
          '',
          `> PORTAFOLIO Terminal ha estado activo durante: ${uptimeStr}`,
          `> Inicio de sesión: ${new Date(pageStartTime).toLocaleTimeString('es-ES')}`,
          `> Estado del sistema: OPERATIVO`,
          `> Secciones cargadas: ${Object.keys(commands).length} comandos`,
          `> Recursos utilizados: ÓPTIMOS`,
          ''
        ];
        
        setCommandHistory(prev => [...prev, {
          command: 'uptime',
          output: output,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        }]);
      }
    },
    'version': {
      description: 'Información del sistema',
      action: () => {
        const output = [
          '',
          '> PORTAFOLIO Terminal v2.4.1',
          '> Sistema operativo: Web Browser Environment',
          '> Framework: Astro + React 18',
          '> Styling: Tailwind CSS v3.x',
          '> Modo: Portafolio Profesional',
          '> Build: Producción optimizada',
          '> Desarrollado por: Andrés Almeida',
          '> Licencia: MIT',
          '> GitHub: github.com/andresalmeida/lexcorp-terminal',
          ''
        ];
        
        setCommandHistory(prev => [...prev, {
          command: 'version',
          output: output,
          timestamp: new Date().toLocaleTimeString([], { hour12: false })
        }]);
      }
    },
    'exit': {
      description: 'Volver al menú principal del portafolio',
      action: () => setCurrentView('main')
    }
  };

  const showHelp = () => {
    const helpOutput = [
      '',
      '=== COMANDOS DISPONIBLES ===',
      '',
      ...Object.entries(commands).map(([cmd, info]) => 
        `${cmd.padEnd(15)} - ${info.description}`
      ),
      '',
      '================================',
      ''
    ];
    
    setCommandHistory(prev => [...prev, {
      command: 'help',
      output: helpOutput,
      timestamp: new Date().toLocaleTimeString([], { hour12: false })
    }]);
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });

    // Agregar comando al historial
    setCommandHistory(prev => [...prev, {
      command: trimmedCmd,
      timestamp,
      type: 'input'
    }]);

    if (commands[trimmedCmd]) {
      commands[trimmedCmd].action();
    } else if (trimmedCmd === '') {
      // Comando vacío, no hacer nada
    } else {
      // Comando no reconocido
      setCommandHistory(prev => [...prev, {
        command: trimmedCmd,
        output: [
          `Comando no reconocido: ${trimmedCmd}`,
          'Escribe "help" para ver los comandos disponibles.'
        ],
        timestamp,
        type: 'error'
      }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(currentCommand);
    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-completar comandos
      const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(currentCommand.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentView]);

  const getCurrentPrompt = () => {
    switch (currentView) {
      case 'skills': return 'root@portafolio:~/skills$';
      case 'experience': return 'root@portafolio:~/experience$';
      case 'projects': return 'root@portafolio:~/projects$';
      case 'contact': return 'root@portafolio:~/contact$';
      default: return 'root@portafolio:~$';
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'skills':
        return <SkillsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'projects':
        return <ProjectsSection isVisible={true} />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <div className="space-y-4">
            <div className="text-terminal-accent">
              PORTAFOLIO TERMINAL INICIADO CORRECTAMENTE
            </div>
            <div className="text-terminal-text/80">
              Utiliza los comandos para navegar entre las diferentes secciones.
              Escribe <span className="text-terminal-accent">"help"</span> para ver todos los comandos disponibles.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="font-mono">
      {/* Command History */}
      <div className="mb-4 space-y-2">
        {commandHistory.map((entry, index) => (
          <div key={index}>
            {entry.type === 'input' ? (
              <div className="flex items-center space-x-2">
                <span className="text-terminal-accent">{getCurrentPrompt()}</span>
                <span className="text-terminal-text">{entry.command}</span>
                <span className="text-terminal-accent/60 text-xs ml-auto">[{entry.timestamp}]</span>
              </div>
            ) : (
              <div className={`ml-4 whitespace-pre-line ${
                entry.type === 'error' ? 'text-red-400' : 'text-terminal-text/90'
              }`}>
                {Array.isArray(entry.output) ? entry.output.join('\n') : entry.output}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current View Content */}
      <div className="mb-6">
        {renderCurrentView()}
      </div>

      {/* Command Input */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <span className="text-terminal-accent whitespace-nowrap">
          {getCurrentPrompt()}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-terminal-text placeholder-terminal-accent/50"
          placeholder="Escribe un comando..."
          autoComplete="off"
          spellCheck="false"
        />
        <span className="text-terminal-accent animate-blink">█</span>
      </form>
    </div>
  );
};

export default PortfolioInterface; 