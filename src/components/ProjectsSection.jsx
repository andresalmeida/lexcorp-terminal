import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = ({ isVisible }) => {
  const [currentDirectory, setCurrentDirectory] = useState('~/projects');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const projects = [
    {
      name: 'shiny_dashboards.R',
      type: 'file',
      language: 'R',
      description: 'Environmental indicators dashboards built with Shiny (Thesis project)',
      status: 'completed',
      lines: '2,847',
      lastModified: '2024-12-15'
    },
    {
      name: 'react_frontend_espe/',
      type: 'directory',
      language: 'React',
      description: 'Web frontend for embedding Shiny dashboards and data insights (Thesis)',
      status: 'completed',
      lines: '3,000+',
      lastModified: '2024-12-16'
    },
    {
      name: 'kasaychi_platform/',
      type: 'directory',
      language: 'Web',
      description: 'Community-driven tech platform for rural empowerment (Kasaychi Project)',
      status: 'in_progress',
      lines: '2,100+',
      lastModified: '2025-05-20'
    },
    {
      name: 'cedula_validator.cs',
      type: 'file',
      language: 'C#',
      description: 'Ecuadorian national ID validation algorithm',
      status: 'completed',
      lines: '120',
      lastModified: '2024-06-01'
    },
    {
      name: 'microservices_system/',
      type: 'directory',
      language: 'Node.js',
      description: 'Student/course microservices with independent APIs and DBs',
      status: 'completed',
      lines: '3,500+',
      lastModified: '2025-01-10'
    },
    {
      name: 'dcco_web_portal/',
      type: 'directory',
      language: 'Web',
      description: 'Web portal for ESPE’s DCCO department (archived)',
      status: 'archived',
      lines: '1,900+',
      lastModified: '2023-08-12'
    },
    {
      name: 'mobile_utilities/',
      type: 'directory',
      language: 'Dart',
      description: 'Various Flutter mobile apps (utilities, student tools)',
      status: 'in_progress',
      lines: '1,500+',
      lastModified: '2025-02-20'
    },
    {
      name: 'lexcorp_terminal/',
      type: 'directory',
      language: 'Web',
      description: 'Interactive terminal-style hacker portfolio',
      status: 'in_progress',
      lines: '700+',
      lastModified: 'now'
    }
  ];  

  const generateTerminalOutput = () => {
    const lines = [
      `> cd ${currentDirectory}`,
      '> ls -la --format=detailed',
      '',
      'total 12',
      'drwxr-xr-x  8 user adaghost 4096 Dec 15 23:42 .',
      'drwxr-xr-x  3 user adaghost 4096 Dec 01 10:30 ..',
      '-rw-r--r--  1 user adaghost  156 Nov 28 14:22 .gitignore',
      '-rw-r--r--  1 user adaghost  892 Dec 15 09:15 README.md',
      ''
    ];

    // Add projects without ANSI codes
    projects.forEach(project => {
      const statusIcon = project.status === 'completed' ? '✓' : 
                        project.status === 'in_progress' ? '◐' : '◯';
      const typeIcon = project.type === 'directory' ? '📁' : '📄';
      
      lines.push(`${statusIcon} ${typeIcon} ${project.name}`);
      lines.push(`    ├─ Description: ${project.description}`);
      lines.push(`    ├─ Language: ${project.language}`);
      lines.push(`    ├─ Lines: ${project.lines}`);
      lines.push(`    └─ Modified: ${project.lastModified}`);
      lines.push('');
    });

    // Add summary section
    lines.push('> access --summary');
    lines.push('');
    lines.push('Projects Summary:');
    lines.push(`├─ Total repositories: ${projects.length}`);
    lines.push(`├─ Completed: ${projects.filter(p => p.status === 'completed').length}`);
    lines.push(`├─ In Progress: ${projects.filter(p => p.status === 'in_progress').length}`);
    lines.push(`├─ Archived: ${projects.filter(p => p.status === 'archived').length}`);
    lines.push('└─ Primary Languages: Python, R, JavaScript, Web Technologies');
    lines.push('');

    // Add skills tree
    lines.push('> tree --skills');
    lines.push('');
    lines.push('Technical Stack:');
    lines.push('├─ Backend');
    lines.push('│   ├─ Python (pandas, geopandas, FastAPI, NumPy)');
    lines.push('│   ├─ R (Shiny, dplyr, tidyr, leaflet)');
    lines.push('│   └─ Node.js (Express)');
    lines.push('├─ Frontend');
    lines.push('│   ├─ React (Hooks, Context, Framer Motion)');
    lines.push('│   ├─ Astro (SSG, Islands Architecture)');
    lines.push('│   ├─ TailwindCSS (Responsive Design)');
    lines.push('│   └─ HTML5 / CSS3 / Vanilla JS');
    lines.push('├─ Data Science & Geospatial');
    lines.push('│   ├─ ETL Pipelines (tidyverse, custom scripts, rasterio)');
    lines.push('│   ├─ Visualization (Shiny, ggplot2, plotly, leaflet)');
    lines.push('│   └─ GIS Tools (QGIS, ArcGIS, GeoTIFF, GeoPackage)');
    lines.push('├─ DevOps & Deployment');
    lines.push('│   ├─ Docker (Shiny apps, FastAPI services)');
    lines.push('│   ├─ AWS (EC2, S3) & Firebase Hosting');
    lines.push('│   └─ CI/CD (GitHub Actions, Vercel, Netlify)');
    lines.push('└─ Additional Skills');
    lines.push('    ├─ BPMN & Systems Modeling (Bizagi, Draw.io)');
    lines.push('    ├─ UI/UX Design (Figma, minimalist design systems)');
    lines.push('    └─ Project Management (Notion, Trello, Agile boards)');
    lines.push('');

    // Add status
    lines.push('> status --all');
    lines.push('');
    lines.push('System Status: OPERATIONAL');
    lines.push('Last Commit: 2 minutes ago');
    lines.push('Active Projects: 1');
    lines.push('Deployment Status: READY');
    lines.push('Security Level: MAXIMUM');
    lines.push('');
    lines.push('> _');

    return lines.join('\n');
  };

  useEffect(() => {
    if (!isVisible) {
      setDisplayedOutput('');
      return;
    }

    setIsTyping(true);
    const fullText = generateTerminalOutput();
    
    let index = 0;
    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedOutput(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeText, Math.random() * 20 + 10);
      } else {
        setIsTyping(false);
      }
    };

    const timeout = setTimeout(typeText, 500);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-terminal-bg border border-terminal-text/30 rounded-lg p-6 font-mono"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-terminal-text/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-terminal-text/70 text-sm">
          LEXCORP_PROJECTS // ACCESS_LEVEL: AUTHORIZED
        </div>
        <div className="text-terminal-accent text-sm">
          {currentDirectory}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="text-terminal-text text-sm leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {displayedOutput}
          {isTyping && <span className="text-terminal-accent animate-blink">|</span>}
        </pre>
      </div>

      {/* Interactive Project Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: displayedOutput.length > 500 ? 1 : 0 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-terminal-bg/50 border border-terminal-text/20 rounded p-4 hover:border-terminal-accent/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span>{project.type === 'directory' ? '📁' : '📄'}</span>
                <span className="text-terminal-accent text-sm font-semibold">
                  {project.name}
                </span>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                project.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {project.status}
              </div>
            </div>
            <p className="text-terminal-text/70 text-xs mb-2">
              {project.description}
            </p>
            <div className="flex justify-between text-xs text-terminal-text/50">
              <span>{project.language}</span>
              <span>{project.lines} lines</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;
