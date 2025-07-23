
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { documentContent, SECTIONS, SectionKey } from './constants/documentContent';
import { ContentPage } from './components/ContentPage';
import { Home } from './components/Home';
import { GeminiChat } from './components/GeminiChat';

const App: React.FC = () => {
    return (
        <HashRouter>
            <MainLayout />
        </HashRouter>
    );
};

const MainLayout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const currentPathKey = location.pathname.substring(1) as SectionKey;
    const currentSection = SECTIONS.find(s => s.id === currentPathKey);
    const pageTitle = currentSection ? currentSection.title : "Análisis de Música en Publicidad";

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-gray-200">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-gray-800/80 backdrop-blur-sm border-b border-pink-500/30">
                <h1 className="text-lg font-bold text-pink-400">Menú</h1>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-40 text-gray-200 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
                    </svg>
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`fixed lg:relative top-0 left-0 h-full z-20 w-64 bg-gray-900 border-r border-pink-500/30 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="p-6 sticky top-0">
                    <h2 className="text-2xl font-bold text-white mb-2">Análisis de Estrategia</h2>
                    <p className="text-sm text-pink-400 mb-8">Música en Publicidad y Brand Films</p>
                    <nav className="flex flex-col space-y-2">
                        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `px-4 py-2 rounded-md text-gray-300 hover:bg-pink-500/20 hover:text-white transition-colors ${isActive ? 'bg-pink-500/30 text-white font-semibold' : ''}`}>
                            Inicio
                        </NavLink>
                        {SECTIONS.map(section => (
                            <NavLink
                                key={section.id}
                                to={`/${section.id}`}
                                onClick={closeMenu}
                                className={({ isActive }) => `px-4 py-2 rounded-md text-gray-300 hover:bg-pink-500/20 hover:text-white transition-colors ${isActive ? 'bg-pink-500/30 text-white font-semibold' : ''}`}
                            >
                                {section.title}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                 <div className="max-w-4xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {SECTIONS.map(section => (
                            <Route 
                                key={section.id} 
                                path={`/${section.id}`} 
                                element={<ContentPage title={section.title} content={documentContent[section.id]} />} 
                            />
                        ))}
                    </Routes>
                </div>
            </main>

            {/* AI Chat Section */}
            <aside className="w-full lg:w-96 bg-gray-800/50 border-l border-pink-500/20 p-4 sticky bottom-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
                <GeminiChat context={{title: pageTitle, content: documentContent[currentPathKey]}} />
            </aside>
        </div>
    );
};

export default App;
