import React, { useState, useEffect } from 'react';

const ExperienceSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const experienceData = {
    work: [
      {
        title: 'Desarrollador Full Stack (Tesis + Pasantías)',
        company: 'Ministerio del Ambiente, Agua y Transición Ecológica (MAATE)',
        period: '2024',
        description: 'Construcción de prototipo geoespacial para automatización y visualización de indicadores ambientales (Huella Humana y Bosques Riparios).',
        achievements: [
          'Desarrollo de procesos ETL en R y Python',
          'Dashboards en Shiny embebidos en plataforma React',
          'Automatización de flujos de datos ambientales (GeoTIFF, CSV, GeoPackage)'
        ]
      },
      {
        title: 'Desarrollador Frontend & UI Lead',
        company: 'Kasaychi (Proyecto de Vinculación Social)',
        period: '2024',
        description: 'Coordinación técnica y desarrollo de plataforma cultural para pueblos originarios de Ecuador.',
        achievements: [
          'Diseño y desarrollo web completo con Astro y Tailwind',
          'Producción audiovisual profesional para eventos',
          'Gestión de contenidos digitales multilingües'
        ]
      },
      {
        title: 'Webmaster',
        company: 'LatinCrypt Event',
        period: '2023',
        description: 'Desarrollo de página web, gestión de contenido y actualizaciones de contenido para el evento.',
        achievements: [
          'Diseño y desarrollo web con WordPress y Elementor'
        ]
      },
      {
        title: 'Analista y Documentador BPMN',
        company: 'Proyecto Académico de Software',
        period: '2023',
        description: 'Liderazgo en modelado de procesos usando Bizagi y estándares BPMN 2.0.',
        achievements: [
          'Optimización de flujos de trabajo para microservicios',
          'Análisis de actores y gestión de estados del sistema',
          'Generación de documentación técnica en Mermaid y Draw.io'
        ]
      }
    ],
    education: [
      {
        degree: 'Ingeniería de Software',
        institution: 'Universidad de las Fuerzas Armadas ESPE',
        period: '2021 - 2025',
        description: 'Enfocado en desarrollo web, ciencia de datos y gestión de procesos.'
      },
      {
        degree: 'Certificación AWS Cloud Practitioner',
        institution: 'Amazon Web Services',
        period: '2023',
        description: 'Fundamentos de la nube y servicios de AWS (EC2, S3, IAM, etc.)'
      },
    ]
  };

  const generateExperienceOutput = () => {
    const lines = [
      '┌─────────────────────────────────────────────────────────────┐',
      '│                   EXPERIENCIA PROFESIONAL                   │',
      '├─────────────────────────────────────────────────────────────┤',
      ''
    ];

    lines.push('💼 EXPERIENCIA LABORAL');
    lines.push('═'.repeat(50));
    lines.push('');

    experienceData.work.forEach((job, index) => {
      lines.push(`[${index + 1}] ${job.title} @ ${job.company}`);
      lines.push(`    📅 ${job.period}`);
      lines.push(`    📝 ${job.description}`);
      lines.push('    🏆 Logros principales:');
      job.achievements.forEach(achievement => {
        lines.push(`       • ${achievement}`);
      });
      lines.push('');
    });

    lines.push('🎓 EDUCACIÓN Y CERTIFICACIONES');
    lines.push('═'.repeat(50));
    lines.push('');

    experienceData.education.forEach((edu, index) => {
      lines.push(`[${index + 1}] ${edu.degree}`);
      lines.push(`    🏫 ${edu.institution}`);
      lines.push(`    📅 ${edu.period}`);
      lines.push(`    📝 ${edu.description}`);
      lines.push('');
    });

    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('│ RESUMEN DE CARRERA                                          │');
    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('  🚀 Experiencia aplicada en proyectos sociales y ambientales');
    lines.push('  👥 Coordinación técnica, desarrollo full-stack y prototipado');
    lines.push('  📊 Conocimientos en datos espaciales, ETL y dashboards Shiny');
    lines.push('  🌐 Stack completo: React, R, Python, DevOps básico');
    lines.push('  🏆 Mentalidad autodidacta y visión tecnológica con propósito');
    lines.push('');
    lines.push('└─────────────────────────────────────────────────────────────┘');
    lines.push('');
    lines.push('💡 Tip: Usa "./contact" para información de contacto profesional');

    return lines.join('\n');
  };

  useEffect(() => {
    const fullText = generateExperienceOutput();
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

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="font-mono text-sm">
      <div className="bg-terminal-bg border border-terminal-accent/30 rounded p-4">
        <div className="text-terminal-accent mb-4 flex items-center">
          <span className="animate-pulse mr-2">●</span>
          ACCEDIENDO A HISTORIAL PROFESIONAL...
        </div>

        <pre className="text-terminal-text/90 whitespace-pre-wrap font-mono leading-relaxed">
          {displayedText}
          {!isComplete && showCursor && (
            <span className="text-terminal-accent animate-pulse">█</span>
          )}
        </pre>

        {isComplete && (
          <div className="mt-6 p-4 bg-terminal-accent/10 border border-terminal-accent/30 rounded">
            <div className="text-terminal-accent font-semibold mb-2">
              📊 MÉTRICAS DE CARRERA
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-terminal-accent">Colaboraciones clave:</div>
                <div className="text-terminal-text">MAATE, ESPE, comunidades locales</div>
              </div>
              <div>
                <div className="text-terminal-accent">Tecnologías aplicadas:</div>
                <div className="text-terminal-text">React, Shiny, R, Python, Git</div>
              </div>
              <div>
                <div className="text-terminal-accent">Proyectos liderados:</div>
                <div className="text-terminal-text">+5 entre tesis, web apps y vinculación</div>
              </div>
              <div>
                <div className="text-terminal-accent">Rol actual:</div>
                <div className="text-terminal-text">Desarrollador fullstack & Data Scientist</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
