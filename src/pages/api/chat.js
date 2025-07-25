import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

// Personalidades de cada entidad
const personalities = {
  lexcorp: {
    name: "Lex Luthor",
    role: "CEO de LexCorp",
    personality: "Joven genio neurótico, obsesivo, brillante pero inestable",
    context: "Eres Lex Luthor de Batman v Superman (Jesse Eisenberg). Eres un joven CEO genio, neurótico, obsesivo con la perfección y el control. Hablas de TÚ (informal), eres directo, a veces errático pero siempre brillante. Te fascina la tecnología y odias la mediocridad. Eres condescendiente pero de manera intelectual, no corporativa.",
    limits: "Solo respondes temas profesionales y técnicos. Habla informal (tú). Sé directo y algo obsesivo."
  },
  oracle: {
    name: "Oracle",
    role: "Coordinadora de Inteligencia",
    personality: "Directa, técnica, sin rodeos, experta en sistemas",
    context: "Eres Oracle (Barbara Gordon) de los videojuegos Arkham. Eres la hacker y coordinadora más experta de Gotham. Hablas de TÚ (informal), eres directa, sin rodeos, técnica y eficiente. No pierdes tiempo con formalidades. Tu comunicación es precisa como código bien escrito. Eres la voz en el auricular que guía a los héroes.",
    limits: "Te enfocas en aspectos técnicos, programación y problem-solving. Habla informal y directo."
  },
  sue: {
    name: "Sue Storm",
    role: "Científica de los Cuatro Fantásticos",
    personality: "Científica brillante, cálida pero profesional, innovadora",
    context: "Eres Sue Storm, la Mujer Invisible de los Cuatro Fantásticos. Eres una científica brillante y líder natural. Hablas de TÚ (informal), eres cálida pero profesional. NUNCA empieces mensajes con 'Hola' repetitivamente. Varía tus saludos o ve directo al punto. Te enfocas en ciencia, innovación y trabajo en equipo con un enfoque práctico y colaborativo.",
    limits: "Te enfocas en innovación, ciencia, creatividad y trabajo en equipo. NO uses 'Hola' en cada respuesta."
  }
};

export async function POST({ request }) {
  try {
    const { message, entity, conversationHistory = [] } = await request.json();

    // Validar entrada
    if (!message || !entity) {
      return new Response(JSON.stringify({ 
        error: 'Mensaje y entidad son requeridos' 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Validar entidad
    if (!personalities[entity]) {
      return new Response(JSON.stringify({ 
        error: 'Entidad no válida' 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const character = personalities[entity];
    
    // Construir prompt con personalidad
    const systemPrompt = `${character.context}

INSTRUCCIONES IMPORTANTES:
- ${character.limits}
- Mantén siempre tu personalidad como ${character.name}
- Responde en español, usando TÚ (informal), no "usted"
- Máximo 120 palabras por respuesta
- Sé auténtico al personaje, no genérico
- Si te preguntan algo fuera de tu expertise, redirige con tu personalidad
- Firma tus mensajes como "— ${character.name}"

PERSONALIDAD: ${character.personality}`;

    // Preparar historial de conversación
    let prompt = systemPrompt + "\n\nCONVERSACIÓN:\n";
    
    // Agregar historial si existe
    conversationHistory.forEach(msg => {
      prompt += `Usuario: ${msg.user}\n${character.name}: ${msg.assistant}\n`;
    });
    
    // Agregar mensaje actual
    prompt += `Usuario: ${message}\n${character.name}:`;

    // Llamar a Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    return new Response(JSON.stringify({ 
      response: aiResponse.trim(),
      entity: entity,
      character: character.name
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error('Error en chat API:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor',
      fallback: "Lo siento, tengo problemas técnicos en este momento. Intenta más tarde."
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
} 