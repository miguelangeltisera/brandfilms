
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-5xl font-bold text-white mb-4">
        Bienvenido al Analizador de <span className="text-pink-400">Estrategias Musicales</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Una herramienta interactiva para estudiantes universitarios. Explora el poder de la música en la publicidad y los brand films, con un análisis profundo del caso Barbie.
      </p>
      <div className="flex justify-center gap-4">
        <NavLink 
          to="/resumen" 
          className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-transform transform hover:scale-105"
        >
          Empezar Análisis
        </NavLink>
        <a 
          href="https://github.com/your-repo" // Placeholder Link
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          Ver en GitHub
        </a>
      </div>
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">¿Cómo usar este sitio?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-pink-500/30">
            <h3 className="font-bold text-lg text-pink-400 mb-2">1. Navega por el Contenido</h3>
            <p className="text-gray-400">Usa el menú de la izquierda para explorar las diferentes secciones del informe, desde el resumen ejecutivo hasta el caso de estudio de Barbie.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="font-bold text-lg text-cyan-400 mb-2">2. Lee y Analiza</h3>
            <p className="text-gray-400">Sumérgete en el análisis detallado sobre cómo la música influye en la percepción de marca y el comportamiento del consumidor.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border-gray-500/30">
            <h3 className="font-bold text-lg text-gray-400 mb-2">3. Interactúa con la IA</h3>
            <p className="text-gray-400">Utiliza el panel de "AI Tutor" a la derecha para hacer preguntas específicas sobre la sección que estás leyendo y obtener respuestas al instante.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
