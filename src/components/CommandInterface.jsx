import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsSection from './ProjectsSection.jsx';

const CommandInterface = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [pageStartTime] = useState(Date.now());
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Mostrar comandos disponibles',
      execute: () => {
        return [
          '> LEXCORP Terminal - Comandos Disponibles:',
          '',
          '  ./projects      - Acceder al repositorio de proyectos',
          '  ./vision.txt    - Leer manifiesto personal',
          '  ./timeline      - Ver historial de desarrollo',
          '  ./portafolio.txt - Abrir portafolio profesional',
          '  help           - Mostrar esta ayuda',
          '  clear          - Limpiar terminal',
          '  whoami         - Información del usuario',
          '  date           - Mostrar fecha y hora actual',
          '  uptime         - Tiempo de actividad del sistema',
          '  version        - Información del sistema',
          '  exit           - Cerrar sección actual',
          '',
          'Tip: Usa las flechas ↑↓ para navegar por el historial'
        ];
      }
    },

    './projects': {
      description: 'Acceder al repositorio de proyectos',
      execute: () => {
        setCurrentSection('projects');
        return [
          '> Accediendo a repositorio de proyectos...',
          '> Autenticación exitosa',
          '> Cargando datos...'
        ];
      }
    },

    './vision.txt': {
      description: 'Leer manifiesto personal',
      execute: () => {
        setCurrentSection('vision');
        return [
          '> Abriendo archivo vision.txt...',
          '> Descifrando contenido...',
          '> Acceso autorizado'
        ];
      }
    },

    './timeline': {
      description: 'Ver historial de desarrollo',
      execute: () => {
        setCurrentSection('timeline');
        return [
          '> Accediendo a historial git...',
          '> Cargando commits...',
          '> Generando timeline...'
        ];
      }
    },

    './portafolio.txt': {
      description: 'Abrir portafolio profesional',
      execute: () => {
        return [
          '> Accediendo al portafolio profesional...',
          '> Estableciendo conexión segura...',
          '> Redirigiendo a terminal de portafolio...'
        ];
      },
      redirect: '/portafolio'
    },

    clear: {
      description: 'Limpiar terminal',
      execute: () => {
        setOutput([]);
        return null;
      }
    },

    whoami: {
      description: 'Información del usuario',
      execute: () => {
        return [
          '> Usuario: Andrés Almeida Jara',
          '> Rol: Full Stack Developer & Data Analyst',
          '> Clearance Level: ALPHA',
          '> Especialidades: React, Python, R, Shiny, ETL Pipelines',
          '> Estado: DISPONIBLE PARA NUEVAS OPORTUNIDADES',
          '> Ubicación: Quito, Ecuador (UTC-5)',
          '> GitHub: github.com/andresalmeida',
          '> Email: almeidaandres12@gmail.com'
        ];
      }
    },

    date: {
      description: 'Mostrar fecha y hora actual',
      execute: () => {
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
        
        return [
          `> Fecha: ${dateStr}`,
          `> Hora: ${timeStr}`,
          `> Zona horaria: Ecuador (UTC-5)`,
          `> Timestamp Unix: ${Math.floor(now.getTime() / 1000)}`
        ];
      }
    },

    uptime: {
      description: 'Tiempo de actividad del sistema',
      execute: () => {
        const uptime = Date.now() - pageStartTime;
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        const uptimeStr = hours > 0 
          ? `${hours}h ${minutes % 60}m ${seconds % 60}s`
          : minutes > 0 
            ? `${minutes}m ${seconds % 60}s`
            : `${seconds}s`;
            
        return [
          `> LEXCORP Terminal ha estado activo durante: ${uptimeStr}`,
          `> Inicio de sesión: ${new Date(pageStartTime).toLocaleTimeString('es-ES')}`,
          `> Estado del sistema: OPERATIVO`,
          `> Conexiones IA: ESTABLES`,
          `> Recursos utilizados: ÓPTIMOS`
        ];
      }
    },

    version: {
      description: 'Información del sistema',
      execute: () => {
        return [
          '> LEXCORP Terminal v2.4.1',
          '> Sistema operativo: Web Browser Environment',
          '> Framework: Astro + React 18',
          '> Styling: Tailwind CSS v3.x',
          '> IA Engine: Google Gemini 1.5 Flash',
          '> Build: Producción optimizada',
          '> Desarrollado por: Andrés Almeida',
          '> Licencia: MIT',
          '> GitHub: github.com/andresalmeida/lexcorp-terminal'
        ];
      }
    },

    exit: {
      description: 'Cerrar sección actual',
      execute: () => {
        setCurrentSection(null);
        return ['> Cerrando sección actual...', '> Regresando al terminal principal'];
      }
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    
    if (trimmedCmd === '') return;

    // Agregar comando al historial
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Agregar comando al output
    setOutput(prev => [...prev, `root@lexcorp-terminal:~$ ${trimmedCmd}`]);

    // Ejecutar comando
    const command = commands[trimmedCmd];
    if (command) {
      const result = command.execute();
      if (result) {
        setOutput(prev => [...prev, ...result, '']);
      }
      
      // Manejar redirect si existe
      if (command.redirect) {
        setTimeout(() => {
          window.location.href = command.redirect;
        }, 2000); // Redirigir después de 2 segundos
      }
    } else {
      setOutput(prev => [...prev, `bash: ${trimmedCmd}: command not found`, 'Tip: Escribe "help" para ver comandos disponibles', '']);
    }

    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current && !currentSection) {
      inputRef.current.focus();
    }
  }, [currentSection]);

  const renderVisionContent = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-terminal-bg/50 border border-terminal-text/30 rounded-lg p-6 font-mono"
    >
      <div className="text-terminal-accent mb-4">
        📄 vision.txt - Personal Manifesto
      </div>
      <div className="text-terminal-text leading-relaxed">
        <pre className="whitespace-pre-wrap text-sm">
{`# MI VISIÓN PERSONAL

## LA MISIÓN
No construyo solo código, construyo SOLUCIONES.
No desarrollo solo productos, desarrollo EXPERIENCIAS.
No trabajo solo con datos, trabajo con HISTORIAS.

## LOS PRINCIPIOS

1. **INNOVACIÓN SIN LÍMITES**
   La tecnología debe romper barreras, no crearlas.
   Cada línea de código es una oportunidad de cambio.

2. **IMPACTO REAL** 
   Los proyectos deben resolver problemas reales.
   La elegancia técnica sin propósito es vanidad.

3. **APRENDIZAJE CONTINUO**
   La curiosidad es mi superpoder.
   Cada error es una lección disfrazada.

4. **COLABORACIÓN ÉPICA**
   Los mejores productos nacen de equipos diversos.
   Compartir conocimiento es multiplicar poder.

## EL FUTURO QUE CONSTRUYO

Donde los datos cuenten historias humanas.
Donde la IA amplíe la creatividad, no la reemplace.
Donde la tecnología sea accesible para todos.

## MI COMPROMISO

Escribir código que importe.
Construir productos que duren.
Formar equipos que trasciendan.
Dejar el mundo un poco mejor de como lo encontré.

---
# ESTA ES MI DECLARACIÓN DE GUERRA CONTRA LA MEDIOCRIDAD
# ESTE ES MI PACTO CON LA EXCELENCIA
---

[Última actualización: $(date)]
[Versión: 2.1.0 - "The LexCorp Vision"]`}
        </pre>
      </div>
    </motion.div>
  );

  const renderTimelineContent = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-terminal-bg/50 border border-terminal-text/30 rounded-lg p-6 font-mono"
    >
      <div className="text-terminal-accent mb-4">
        📅 Development Timeline - Git Log Style
      </div>
      <div className="text-terminal-text text-sm space-y-3">
        {[
          { date: '2025-01-15', hash: 'a7f5c92', message: 'feat: Implementing LEXCORP Terminal portfolio system', author: 'Developer' },
          { date: '2024-12-15', hash: 'b3e8d41', message: 'feat: Advanced Shiny dashboards with real-time analytics', author: 'Developer' },
          { date: '2024-11-28', hash: 'c9a2f56', message: 'feat: ETL pipeline optimization - 300% performance boost', author: 'Developer' },
          { date: '2024-10-15', hash: 'd4b7e12', message: 'feat: ML pipeline with automated model deployment', author: 'Developer' },
          { date: '2024-09-22', hash: 'e8c3a94', message: 'feat: Microservices architecture with Docker + K8s', author: 'Developer' },
          { date: '2024-08-10', hash: 'f2d9b87', message: 'feat: Blockchain explorer with transaction visualization', author: 'Developer' },
          { date: '2024-06-05', hash: 'a1e4c73', message: 'feat: First production-ready API with 99.9% uptime', author: 'Developer' },
          { date: '2024-03-20', hash: 'b8f2d41', message: 'feat: Advanced data visualization with D3.js', author: 'Developer' },
          { date: '2023-12-01', hash: 'c5a9e16', message: 'feat: Started machine learning journey', author: 'Developer' },
          { date: '2023-08-15', hash: 'd7b4f29', message: 'feat: First Python automation scripts', author: 'Developer' },
          { date: '2023-03-10', hash: 'e2c8a53', message: 'init: Beginning of the coding odyssey', author: 'Developer' }
        ].map((commit, index) => (
          <div key={index} className="flex items-start space-x-4 text-xs">
            <div className="text-yellow-400 font-mono w-16">{commit.hash}</div>
            <div className="text-terminal-text/70 w-20">{commit.date}</div>
            <div className="text-terminal-text flex-1">{commit.message}</div>
            <div className="text-terminal-accent w-20">{commit.author}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-terminal-text/70 text-xs">
        <p>📊 Estadísticas del repositorio:</p>
        <p>• Total commits: 247</p>
        <p>• Líneas de código: 45,630</p>
        <p>• Lenguajes: Python, R, JavaScript, TypeScript, SQL</p>
        <p>• Colaboradores: 1 (pero con el poder de 10)</p>
      </div>
    </motion.div>
  );

  if (currentSection === 'projects') {
    return (
      <div className="space-y-4">
        <ProjectsSection isVisible={true} />
        <div className="text-terminal-text/70 text-sm mb-4">
          Escribe "exit" para regresar al terminal principal
        </div>
        {/* Command Input for exit */}
        <div className="flex items-center space-x-2">
          <span className="text-terminal-accent text-sm font-mono">root@lexcorp-terminal:~/projects$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-terminal-text font-mono text-sm outline-none border-none"
            placeholder="Escribe 'exit' para volver"
            autoComplete="off"
          />
          <span className="text-terminal-accent animate-blink font-mono">|</span>
        </div>
      </div>
    );
  }

  if (currentSection === 'vision') {
    return (
      <div className="space-y-4">
        {renderVisionContent()}
        <div className="text-terminal-text/70 text-sm mb-4">
          Escribe "exit" para regresar al terminal principal
        </div>
        {/* Command Input for exit */}
        <div className="flex items-center space-x-2">
          <span className="text-terminal-accent text-sm font-mono">root@lexcorp-terminal:~/vision$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-terminal-text font-mono text-sm outline-none border-none"
            placeholder="Escribe 'exit' para volver"
            autoComplete="off"
          />
          <span className="text-terminal-accent animate-blink font-mono">|</span>
        </div>
      </div>
    );
  }

  if (currentSection === 'timeline') {
    return (
      <div className="space-y-4">
        {renderTimelineContent()}
        <div className="text-terminal-text/70 text-sm mb-4">
          Escribe "exit" para regresar al terminal principal
        </div>
        {/* Command Input for exit */}
        <div className="flex items-center space-x-2">
          <span className="text-terminal-accent text-sm font-mono">root@lexcorp-terminal:~/timeline$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-terminal-text font-mono text-sm outline-none border-none"
            placeholder="Escribe 'exit' para volver"
            autoComplete="off"
          />
          <span className="text-terminal-accent animate-blink font-mono">|</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Command Output */}
      <div className="space-y-1">
        {output.map((line, index) => (
          <div key={index} className="text-terminal-text text-sm font-mono">
            {line.startsWith('root@lexcorp-terminal:~$') ? (
              <span className="text-terminal-accent">{line}</span>
            ) : line.startsWith('bash:') ? (
              <span className="text-red-400">{line}</span>
            ) : line.startsWith('Tip:') ? (
              <span className="text-yellow-400">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>

      {/* Command Input */}
      <div className="flex items-center space-x-2">
        <span className="text-terminal-accent text-sm font-mono">root@lexcorp-terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal-text font-mono text-sm outline-none border-none"
          placeholder="Escribe un comando (ej: help, ./projects, ./vision.txt)"
          autoComplete="off"
        />
        <span className="text-terminal-accent animate-blink font-mono">|</span>
      </div>

      {/* Help hint */}
      {output.length === 0 && (
        <div className="text-terminal-text/50 text-xs mt-4">
          💡 Tip: Escribe "help" para ver todos los comandos disponibles
        </div>
      )}
    </div>
  );
};

export default CommandInterface; 