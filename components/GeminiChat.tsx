
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getAiResponse } from '../services/geminiService';

interface GeminiChatProps {
    context: {
        title: string;
        content: React.ReactNode;
    }
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const renderReactNodeToText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (node === null || typeof node === 'boolean' || typeof node === 'undefined') return '';
    if (Array.isArray(node)) return node.map(renderReactNodeToText).join('');
    if ('props' in node && node.props.children) {
        return renderReactNodeToText(node.props.children);
    }
    return '';
};

export const GeminiChat: React.FC<GeminiChatProps> = ({ context }) => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        setMessages([
          {
            sender: 'ai',
            text: `¡Hola! Soy tu asistente de IA. Estás en la sección "${context.title}". Pregúntame lo que quieras sobre este tema.`,
          },
        ]);
    }, [context.title]);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const contextText = renderReactNodeToText(context.content);
            const fullPrompt = `
              Eres un tutor universitario experto en marketing y comunicación.
              Tu propósito es ayudar a los estudiantes a comprender un informe sobre el uso de la música en la publicidad.
              Responde de forma clara, concisa y educativa.
              
              CONTEXTO DE LA SECCIÓN ACTUAL DEL INFORME (titulada "${context.title}"):
              ---
              ${contextText.substring(0, 3000)}... 
              ---
              
              PREGUNTA DEL ESTUDIANTE:
              "${input}"

              Tu respuesta debe ser directa a la pregunta del estudiante, utilizando el contexto proporcionado.
            `;
            const aiResponse = await getAiResponse(fullPrompt);
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage = "Lo siento, no pude procesar tu solicitud. Inténtalo de nuevo.";
            setMessages(prev => [...prev, { sender: 'ai', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, context]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"/></svg>
                AI Tutor Interactivo
            </h3>
            <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="bg-gray-700 rounded-lg p-4 flex items-center space-x-2">
                             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex-shrink-0 flex items-center mt-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pregúntale a la IA..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-200"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-pink-600 text-white px-4 py-2 rounded-r-md hover:bg-pink-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
