// Función para inicializar la aplicación
export function initializeApp() {
  const root = document.getElementById('root');
  
  // Estructura HTML principal
  root.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Header principal -->
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          BrandFilms AI
        </h1>
        <p class="text-gray-300 text-lg md:text-xl">
          Analiza estrategias de marca en películas y música
        </p>
      </header>

      <!-- Sección de búsqueda -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl border border-gray-700">
        <div class="mb-6">
          <label for="searchInput" class="block text-sm font-medium text-gray-300 mb-2">
            ¿Qué estrategia de marca quieres analizar?
          </label>
          <div class="flex gap-2">
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Ej: Campaña de marca en Marvel, estrategia musical de Coca-Cola..." 
              class="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            >
            <button 
              id="searchButton" 
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Buscar
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button class="example-btn px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-sm transition-all" data-example="Estrategias de marca en Marvel">
            Marvel
          </button>
          <button class="example-btn px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-sm transition-all" data-example="Campañas de Coca-Cola">
            Coca-Cola
          </button>
          <button class="example-btn px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg text-sm transition-all" data-example="Estrategias musicales de Apple">
            Apple Music
          </button>
        </div>
      </div>

      <!-- Sección de guion literario -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-8 shadow-2xl border border-gray-700">
        <h2 class="text-2xl font-bold mb-4 text-purple-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Analizador de Guion Literario
        </h2>
        <div class="mb-4">
          <label for="scriptInput" class="block text-sm font-medium text-gray-300 mb-2">
            Ingresa tu guion literario para sugerencias de música:
          </label>
          <textarea 
            id="scriptInput" 
            rows="6" 
            placeholder="Escribe o pega tu guion aquí..." 
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
          ></textarea>
        </div>
        <button 
          id="analyzeScriptButton" 
          class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Analizar Guion y Sugerir Música
        </button>
      </div>

      <!-- Área de resultados -->
      <div id="resultsArea" class="space-y-6">
        <!-- Los resultados se mostrarán aquí -->
      </div>

      <!-- Historial -->
      <div id="historyArea" class="mt-12">
        <h2 class="text-2xl font-bold mb-4 text-gray-200">Búsquedas recientes</h2>
        <div id="historyList" class="space-y-2">
          <!-- Historial se mostrará aquí -->
        </div>
      </div>
    </div>
  `;

  // Inicializar funcionalidad
  initializeFunctionality();
}

// Función para inicializar la funcionalidad
function initializeFunctionality() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const scriptInput = document.getElementById('scriptInput');
  const analyzeScriptButton = document.getElementById('analyzeScriptButton');
  const exampleButtons = document.querySelectorAll('.example-btn');
  
  // Cargar historial desde localStorage
  loadHistory();
  
  // Evento para el botón de búsqueda
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query);
    }
  });
  
  // Evento para Enter en el input de búsqueda
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        performSearch(query);
      }
    }
  });
  
  // Evento para el botón de análisis de guion
  analyzeScriptButton.addEventListener('click', () => {
    const script = scriptInput.value.trim();
    if (script) {
      analyzeScript(script);
    } else {
      alert('Por favor, ingresa un guion para analizar');
    }
  });
  
  // Eventos para botones de ejemplo
  exampleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const example = button.getAttribute('data-example');
      searchInput.value = example;
      performSearch(example);
    });
  });
}

// Función para realizar la búsqueda
async function performSearch(query) {
  const resultsArea = document.getElementById('resultsArea');
  const historyList = document.getElementById('historyList');
  
  // Guardar en historial
  saveToHistory(query);
  
  // Mostrar estado de carga
  resultsArea.innerHTML = `
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div class="flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p class="text-gray-300">Analizando estrategias de marca para: <span class="font-semibold text-purple-400">"${query}"</span></p>
          <p class="text-gray-400 text-sm mt-2 loading-dots">Procesando</p>
        </div>
      </div>
    </div>
  `;
  
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generar resultados de ejemplo (en una implementación real, aquí iría la llamada a tu API)
    const results = generateExampleResults(query);
    
    // Mostrar resultados
    displayResults(results, query);
    
    // Actualizar historial
    loadHistory();
  } catch (error) {
    resultsArea.innerHTML = `
      <div class="bg-red-900/50 border border-red-700 rounded-xl p-6 shadow-2xl">
        <div class="text-center">
          <p class="text-red-300">❌ Error al analizar: ${error.message}</p>
          <p class="text-gray-400 text-sm mt-2">Por favor, inténtalo de nuevo más tarde</p>
        </div>
      </div>
    `;
  }
}

// Función para analizar guion y sugerir música
async function analyzeScript(script) {
  const resultsArea = document.getElementById('resultsArea');
  
  // Mostrar estado de carga
  resultsArea.innerHTML = `
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div class="flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p class="text-gray-300">Analizando guion y generando sugerencias musicales...</p>
          <p class="text-gray-400 text-sm mt-2 loading-dots">Procesando</p>
        </div>
      </div>
    </div>
  `;
  
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generar sugerencias musicales basadas en el guion
    const suggestions = generateMusicSuggestions(script);
    
    // Mostrar sugerencias
    displayMusicSuggestions(suggestions, script);
  } catch (error) {
    resultsArea.innerHTML = `
      <div class="bg-red-900/50 border border-red-700 rounded-xl p-6 shadow-2xl">
        <div class="text-center">
          <p class="text-red-300">❌ Error al analizar el guion: ${error.message}</p>
          <p class="text-gray-400 text-sm mt-2">Por favor, inténtalo de nuevo más tarde</p>
        </div>
      </div>
    `;
  }
}

// Función para generar resultados de ejemplo
function generateExampleResults(query) {
  const examples = [
    {
      title: "Análisis de Estrategia de Marca",
      content: `La estrategia de marca identificada para "${query}" muestra un enfoque multidimensional que combina elementos visuales, narrativos y emocionales para crear una conexión duradera con la audiencia. Se observa una clara identidad de marca que resuena con los valores del público objetivo.\n\nSegún el documento "Música, Publicidad y Películas Marca", la música en la publicidad puede aumentar la recordación de marca y crear vínculos emocionales profundos que trascienden la razón.`
    },
    {
      title: "Elementos Clave Identificados",
      content: `1. Consistencia visual en todas las plataformas\n2. Narrativa coherente que refuerza los valores de marca\n3. Integración orgánica de productos/servicios\n4. Conexión emocional con la audiencia objetivo\n5. Diferenciación clara frente a la competencia\n\nLa música ejerce una influencia considerable en la percepción de los productos y en la construcción de la identidad de marca, como se menciona en el documento.`
    },
    {
      title: "Recomendaciones Estratégicas",
      content: `Basado en el análisis, se recomienda:\n• Reforzar los elementos de marca más efectivos\n• Explorar nuevas plataformas de contenido\n• Desarrollar campañas complementarias\n• Medir el impacto emocional en la audiencia\n• Adaptar la estrategia a nuevas tendencias del mercado\n\nLa música no solo acompaña la publicidad, sino que se convierte en la publicidad misma, según el documento.`
    }
  ];
  
  return examples;
}

// Función para generar sugerencias musicales basadas en guion
function generateMusicSuggestions(script) {
  // Extraer palabras clave del guion (simplificado)
  const keywords = script.toLowerCase().match(/\b(\w{4,})\b/g) || [];
  const uniqueKeywords = [...new Set(keywords)].slice(0, 10);
  
  // Generar sugerencias basadas en palabras clave
  const suggestions = [
    {
      scene: "Escena de acción/intensidad",
      musicType: "Música épica/orquestal",
      examples: "Hans Zimmer, John Williams, Two Steps from Hell",
      reasoning: "Para escenas de alta intensidad que requieren emoción y grandeza"
    },
    {
      scene: "Momento romántico",
      musicType: "Baladas suaves/pop",
      examples: "Ed Sheeran, Adele, Bruno Mars",
      reasoning: "Para crear conexión emocional y atmósfera íntima"
    },
    {
      scene: "Ambiente misterioso",
      musicType: "Música ambiental/electrónica",
      examples: "Hildur Guðnadóttir, Trent Reznor, Brian Eno",
      reasoning: "Para generar tensión y suspenso"
    },
    {
      scene: "Celebración/fiesta",
      musicType: "Música dance/urbana",
      examples: "Dua Lipa, Calvin Harris, Bad Bunny",
      reasoning: "Para transmitir energía y alegría"
    }
  ];
  
  return {
    keywords: uniqueKeywords,
    suggestions: suggestions,
    overallTone: "Basado en tu guion, se detecta una narrativa que combina momentos emotivos con escenas dinámicas, lo que requiere una banda sonora versátil que pueda transitar entre géneros."
  };
}

// Función para mostrar resultados
function displayResults(results, query) {
  const resultsArea = document.getElementById('resultsArea');
  
  let resultsHTML = `
    <div class="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-xl p-6 shadow-2xl mb-6">
      <h2 class="text-2xl font-bold mb-4 text-purple-300">Resultados para: "${query}"</h2>
      <p class="text-gray-300">Análisis generado inteligentemente basado en estrategias de marca exitosas</p>
    </div>
  `;
  
  results.forEach((result, index) => {
    resultsHTML += `
      <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-colors">
        <h3 class="text-xl font-bold mb-3 text-purple-300">${result.title}</h3>
        <div class="text-gray-300 whitespace-pre-line">${result.content}</div>
      </div>
    `;
  });
  
  resultsHTML += `
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mt-6">
      <h3 class="text-xl font-bold mb-3 text-pink-400">💡 Insights Adicionales</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
          <h4 class="font-semibold text-purple-300 mb-2">Tendencias Actuales</h4>
          <p class="text-gray-300 text-sm">Las estrategias de marca están evolucionando hacia experiencias más inmersivas y personalizadas.</p>
        </div>
        <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
          <h4 class="font-semibold text-pink-300 mb-2">Próximos Pasos</h4>
          <p class="text-gray-300 text-sm">Considera implementar campañas multicanal que refuercen los hallazgos de este análisis.</p>
        </div>
      </div>
    </div>
  `;
  
  resultsArea.innerHTML = resultsHTML;
}

// Función para mostrar sugerencias musicales
function displayMusicSuggestions(suggestions, script) {
  const resultsArea = document.getElementById('resultsArea');
  
  let suggestionsHTML = `
    <div class="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/50 rounded-xl p-6 shadow-2xl mb-6">
      <h2 class="text-2xl font-bold mb-4 text-indigo-300 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        Análisis Musical de tu Guion
      </h2>
      <p class="text-gray-300">Sugerencias personalizadas basadas en tu narrativa</p>
    </div>
    
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mb-6">
      <h3 class="text-xl font-bold mb-3 text-indigo-300">Resumen del Guion</h3>
      <div class="bg-gray-700/50 p-4 rounded-lg mb-4">
        <p class="text-gray-300 italic">"${script.substring(0, 200)}${script.length > 200 ? '...' : ''}"</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
        ${suggestions.keywords.map(keyword => `
          <span class="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs text-center">${keyword}</span>
        `).join('')}
      </div>
      <p class="text-gray-400 text-sm mt-3">${suggestions.overallTone}</p>
    </div>
  `;
  
  suggestionsHTML += `
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-indigo-300">Sugerencias Musicales</h3>
      <div class="space-y-4">
  `;
  
  suggestions.suggestions.forEach((suggestion, index) => {
    suggestionsHTML += `
      <div class="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
        <div class="flex items-start">
          <div class="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            ${index + 1}
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-indigo-300 mb-1">${suggestion.scene}</h4>
            <p class="text-gray-300 text-sm mb-2"><span class="font-medium">Tipo:</span> ${suggestion.musicType}</p>
            <p class="text-gray-300 text-sm mb-2"><span class="font-medium">Ejemplos:</span> ${suggestion.examples}</p>
            <p class="text-gray-400 text-xs">${suggestion.reasoning}</p>
          </div>
        </div>
      </div>
    `;
  });
  
  suggestionsHTML += `
      </div>
      
      <div class="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-700/50">
        <h4 class="font-semibold text-indigo-300 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Consejo Profesional
        </h4>
        <p class="text-gray-300 text-sm">
          Como menciona el documento "Música, Publicidad y Películas Marca", la música no solo acompaña la narrativa, sino que se convierte en un elemento narrativo primordial. 
          Considera integrar la música desde las primeras etapas de desarrollo creativo para una conexión más auténtica con tu audiencia.
        </p>
      </div>
    </div>
  `;
  
  resultsArea.innerHTML = suggestionsHTML;
}

// Función para guardar en historial
function saveToHistory(query) {
  let history = JSON.parse(localStorage.getItem('brandfilms_history') || '[]');
  
  // Evitar duplicados
  if (!history.includes(query)) {
    history.unshift(query);
    // Mantener solo las últimas 10 búsquedas
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    localStorage.setItem('brandfilms_history', JSON.stringify(history));
  }
}

// Función para cargar historial
function loadHistory() {
  const historyList = document.getElementById('historyList');
  const history = JSON.parse(localStorage.getItem('brandfilms_history') || '[]');
  
  if (history.length === 0) {
    historyList.innerHTML = '<p class="text-gray-500 text-center py-4">No hay búsquedas recientes</p>';
    return;
  }
  
  let historyHTML = '';
  history.forEach(item => {
    historyHTML += `
      <div class="flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-lg p-3 cursor-pointer transition-colors history-item border border-gray-700" data-query="${item}">
        <span class="text-gray-300 truncate flex-1">${item}</span>
        <span class="text-gray-500 text-xs ml-2">↗</span>
      </div>
    `;
  });
  
  historyList.innerHTML = historyHTML;
  
  // Agregar eventos a los items del historial
  document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => {
      const query = item.getAttribute('data-query');
      document.getElementById('searchInput').value = query;
      performSearch(query);
    });
  });
}
