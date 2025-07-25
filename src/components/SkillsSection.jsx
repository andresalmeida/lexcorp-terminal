import React, { useState, useEffect } from 'react';

const SkillsSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      icon: '🎨',
      skills: ['React', 'Astro', 'Tailwind CSS', 'HTML5/CSS3', 'WordPress']
    },
    backend: {
      name: 'Backend Development',
      icon: '⚙️',
      skills: ['Python', 'R', 'FastAPI', 'Node.js', 'REST APIs', 'SOAP APIs', 'ASP.NET']
    },
    data: {
      name: 'Data Science & ETL',
      icon: '📊',
      skills: ['Pandas', 'Shiny', 'Power BI', 'Plotly', 'NumPy', 'ETL Pipelines', 'GeoTIFF']
    },
    tools: {
      name: 'Herramientas & DevOps',
      icon: '🛠️',
      skills: ['Git/GitHub', 'Docker', 'Firebase', 'AWS EC2', 'Vercel', 'VS Code', 'ArcGIS']
    },
    soft: {
      name: 'Habilidades Blandas',
      icon: '🧠',
      skills: ['Pensamiento crítico', 'Curiosidad técnica', 'Gestión de proyectos', 'Trabajo colaborativo', 'Comunicación efectiva', 'Resiliencia']
    }
  };

  const generateSkillsOutput = () => {
    const lines = [
      '┌─────────────────────────────────────────────────────────────┐',
      '│                    TECNOLOGÍAS Y HABILIDADES                │',
      '├─────────────────────────────────────────────────────────────┤',
      ''
    ];

    Object.entries(skillsData).forEach(([key, category]) => {
      lines.push(`${category.icon} ${category.name.toUpperCase()}`);
      lines.push('─'.repeat(50));

      const skills = category.skills;
      for (let i = 0; i < skills.length; i += 2) {
        const skill1 = skills[i] ? `✓ ${skills[i]}`.padEnd(25) : '';
        const skill2 = skills[i + 1] ? `✓ ${skills[i + 1]}` : '';
        lines.push(`  ${skill1} ${skill2}`);
      }
      lines.push('');
    });

    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('│ CERTIFICACIONES Y LOGROS                                    │');
    lines.push('├─────────────────────────────────────────────────────────────┤');
    lines.push('  🧩 Tesis aplicada con dashboards Shiny embebidos en React');
    lines.push('  🌍 Automatización ETL de indicadores ambientales (Python y R)');
    lines.push('  🔍 Análisis con modelos BPMN y procesos de software');
    lines.push('  💡 Proyecto de vinculación social (Kasaychi) con desarrollo web');
    lines.push('  🧪 Exploración autodidacta en inteligencia artificial y ML');
    lines.push('');
    lines.push('└─────────────────────────────────────────────────────────────┘');
    lines.push('');
    lines.push('💡 Tip: Usa "./projects" para ver proyectos donde apliqué estas tecnologías');

    return lines.join('\n');
  };

  useEffect(() => {
    const fullText = generateSkillsOutput();
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
          CARGANDO PERFIL TÉCNICO...
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
              📈 ESTADÍSTICAS DE HABILIDADES
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-terminal-accent">Años de experiencia:</div>
                <div className="text-terminal-text">3+ años (proyectos, tesis y trabajo colaborativo)</div>
              </div>
              <div>
                <div className="text-terminal-accent">Proyectos completados:</div>
                <div className="text-terminal-text">20+ (prototipos, visualizaciones, APIs)</div>
              </div>
              <div>
                <div className="text-terminal-accent">Lenguajes dominados:</div>
                <div className="text-terminal-text">JavaScript, Python, R</div>
              </div>
              <div>
                <div className="text-terminal-accent">Especialización:</div>
                <div className="text-terminal-text">Full-Stack Data + Visualización Geoespacial</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;