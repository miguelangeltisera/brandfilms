// Función para inicializar la aplicación
export function initializeApp() {
  const root = document.getElementById('root');
  
  // Estructura HTML principal
  root.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          BrandFilms AI
        </h1>
        <p class="text-gray-300 text-lg">
          Analiza estrategias de marca en películas y música
        </p>
      </header>

      <!-- Formulario de búsqueda -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
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
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="example-btn px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors" data-example="Estrategias de marca en Marvel">
            Marvel
          </button>
          <button class="example-btn px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors" data-example="Campañas de Coca-Cola">
            Coca-Cola
          </button>
          <button class="example-btn px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors" data-example="Estrategias musicales de Apple">
            Apple Music
          </button>
        </div>
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
  
  // Evento para Enter en el input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        performSearch(query);
      }
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
    <div class="bg-gray-800 rounded-xl p-6 shadow-2xl">
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

// Función para generar resultados de ejemplo
function generateExampleResults(query) {
  const examples = [
    {
      title: "Análisis de Estrategia de Marca",
      content: `La estrategia de marca identificada para "${query}" muestra un enfoque multidimensional que combina elementos visuales, narrativos y emocionales para crear una conexión duradera con la audiencia. Se observa una clara identidad de marca que resuena con los valores del público objetivo.`
    },
    {
      title: "Elementos Clave Identificados",
      content: `1. Consistencia visual en todas las plataformas\n2. Narrativa coherente que refuerza los valores de marca\n3. Integración orgánica de productos/servicios\n4. Conexión emocional con la audiencia objetivo\n5. Diferenciación clara frente a la competencia`
    },
    {
      title: "Recomendaciones Estratégicas",
      content: `Basado en el análisis, se recomienda:\n• Reforzar los elementos de marca más efectivos\n• Explorar nuevas plataformas de contenido\n• Desarrollar campañas complementarias\n• Medir el impacto emocional en la audiencia\n• Adaptar la estrategia a nuevas tendencias del mercado`
    }
  ];
  
  return examples;
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
        <div class="bg-gray-700/50 p-4 rounded-lg">
          <h4 class="font-semibold text-purple-300 mb-2">Tendencias Actuales</h4>
          <p class="text-gray-300 text-sm">Las estrategias de marca están evolucionando hacia experiencias más inmersivas y personalizadas.</p>
        </div>
        <div class="bg-gray-700/50 p-4 rounded-lg">
          <h4 class="font-semibold text-pink-300 mb-2">Próximos Pasos</h4>
          <p class="text-gray-300 text-sm">Considera implementar campañas multicanal que refuercen los hallazgos de este análisis.</p>
        </div>
      </div>
    </div>
  `;
  
  resultsArea.innerHTML = resultsHTML;
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
      <div class="flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-lg p-3 cursor-pointer transition-colors history-item" data-query="${item}">
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