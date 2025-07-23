import React from 'react';

// Reusable components for styling content
function Highlight({ children }: { children: React.ReactNode }) {
    return <strong className="font-semibold text-pink-400">{children}</strong>;
}

function Quote({ children }: { children: React.ReactNode }) {
    return <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-400 my-4">{children}</blockquote>;
}

function Table({ headers, data }: { headers: string[], data: (string | React.ReactNode)[][] }) {
    return (
        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                    <tr>
                        {headers.map((header, i) => <th key={i} scope="col" className="px-6 py-3">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="bg-gray-800/50 border-b border-gray-700">
                            {row.map((cell, j) => <td key={j} className="px-6 py-4">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export type SectionKey = 'resumen' | 'pilar_publicidad' | 'brand_films' | 'caso_barbie' | 'ejemplos_exitosos' | 'conclusiones';

export const SECTIONS: {id: SectionKey, title: string}[] = [
    { id: 'resumen', title: 'Resumen Ejecutivo' },
    { id: 'pilar_publicidad', title: 'Pilar de la Publicidad' },
    { id: 'brand_films', title: 'Brand Films' },
    { id: 'caso_barbie', title: 'Caso de Estudio: Barbie' },
    { id: 'ejemplos_exitosos', title: 'Ejemplos Exitosos' },
    { id: 'conclusiones', title: 'Conclusiones' },
];

export const documentContent: Record<SectionKey, React.ReactNode> = {
    resumen: (
        <>
            <p>El presente informe examina el papel fundamental y multifacético de la música en la publicidad contemporánea y su evolución hacia un componente estratégico en los <Highlight>brand films</Highlight>. Se detalla cómo la música trasciende el mero acompañamiento para convertirse en un motor de memoria, conexión emocional y persuasión, influyendo directamente en el comportamiento del consumidor y las decisiones de compra.</p>
            <p>Se analiza su impacto psicológico y su capacidad para construir y reforzar la identidad de marca en un ecosistema digital en constante cambio. Finalmente, se presenta un estudio de caso exhaustivo de la película Barbie, demostrando cómo una banda sonora cuidadosamente orquestada puede catalizar un fenómeno cultural, revitalizar una marca global y asegurar un éxito comercial masivo.</p>
            <Quote>Este análisis subraya que la música, cuando se integra estratégicamente, se convierte en una poderosa herramienta narrativa y de <Highlight>branding</Highlight> en el panorama mediático actual.</Quote>
        </>
    ),
    pilar_publicidad: (
        <>
            <h2>1. La Música como Pilar de la Publicidad Moderna</h2>
            <p>La música se ha consolidado como una de las herramientas más potentes y completas en el arsenal publicitario. Su capacidad para comunicar sensaciones, estilos, clases y estados de ánimo que de otra manera serían inarticulables la posiciona como un vehículo publicitario excepcionalmente eficaz y participativo.</p>
            
            <h3>1.1. Impacto Psicológico y Emocional</h3>
            <p>La música posee una habilidad inherente para potenciar sentimientos y emociones, estableciendo conexiones profundas con diversos públicos objetivos. Este poder radica en su carácter subjetivo, que le permite operar en el ámbito de las emociones y lo aspiracional. Históricamente, los <Highlight>jingles</Highlight> o canciones publicitarias han demostrado ser formatos excepcionalmente eficaces para potenciar la memoria del mensaje en los consumidores.</p>
            
            <h3>1.2. Construcción de Identidad de Marca</h3>
            <p>Los <Highlight>logotipos sonoros</Highlight>, o <Highlight>audio branding</Highlight>, son sonidos distintivos que permiten a los consumidores identificar rápidamente una marca. Ejemplos paradigmáticos incluyen el jingle "I'm Lovin' It" de McDonald's o el distintivo sonido "ta-dum" de Netflix.</p>
            <Table 
                headers={["Función Clave", "Descripción", "Impacto Estratégico"]}
                data={[
                    ["Memoria y Recordación", "Aumenta y facilita el recuerdo de mensajes y jingles.", "Alta recordación de marca; jingles recordados incluso años después."],
                    ["Impacto Emocional", "Potencia sentimientos y emociones, conecta con públicos a nivel aspiracional.", "Persuasión efectiva; impulsa la intención de compra."],
                    ["Identidad de Marca", "Brinda personalidad, define una identidad sonora única (logotipos, música ambiental).", "Creación de logotipos sonoros icónicos; diferenciación en el mercado."],
                    ["Influencia en Comportamiento", "Modifica el comportamiento del consumidor en entornos comerciales (ej. tempo).", "Aumento de ventas; prolongación de la estancia en tiendas."]
                ]}
            />
        </>
    ),
    brand_films: (
        <>
            <h2>2. Brand Films: La Narrativa de Marca en el Gran Formato</h2>
            <p>Los <Highlight>brand films</Highlight> representan una evolución significativa en la estrategia de marketing y comunicación de las marcas. Estas piezas audiovisuales están diseñadas para destacar los valores intrínsecos de una marca, no para la venta directa.</p>
            <Quote>La distinción entre la publicidad tradicional, enfocada en la venta directa, y los <Highlight>brand films</Highlight>, que buscan ofrecer valor sin imponer la venta, ilustra un cambio fundamental en la estrategia de marketing, de la interrupción a la atracción.</Quote>
            <h3>2.3. La Música como Elemento Central en el Storytelling</h3>
            <p>La música, por su naturaleza intrínsecamente emocional, amplifica la narración al añadir capas de significado a las historias de marca. No se limita a apoyar la narración; en muchos casos, <Highlight>"es narración"</Highlight>.</p>
        </>
    ),
    caso_barbie: (
        <>
            <h2>3. Caso de Estudio: La Película Barbie y su Sinfonía de Marca</h2>
            <p>La película Barbie, bajo la dirección de Greta Gerwig, se erige como un caso de estudio ejemplar sobre cómo la música puede ser un pilar central en la revitalización de una marca. La banda sonora fue un elemento crucial que enriqueció la narrativa y la experiencia del público.</p>
            <Quote>Margot Robbie, quien encarnó a Barbie, destacó que la música se transformó en un dispositivo para mejorar la percepción y la experiencia de la audiencia, llegando incluso a ser la <Highlight>"voz de la audiencia"</Highlight>.</Quote>
            <h3>3.2. Rol de la Música en la Narrativa y Empoderamiento</h3>
            <p>La canción "What Was I Made For?" de Billie Eilish, en particular, aportó una capa de profundidad y emotividad a la crisis de identidad de Barbie y Ken. Esta pieza resonó profundamente con la "experiencia de la feminidad" de numerosos espectadores.</p>
            <Table 
                headers={["Elemento Musical", "Artista(s)", "Rol y Contribución", "Impacto"]}
                data={[
                    ["\"Dance the Night\"", "Dua Lipa, Mark Ronson, Andrew Wyatt", "Himno disco central, establece el tono vibrante.", "Definió la estética inicial de la película, generando expectación."],
                    ["\"I'm Just Ken\"", "Ryan Gosling, Mark Ronson", "Balada clave para la crisis de identidad de Ken.", "Resonó con el público por su honestidad y humor."],
                    ["\"What Was I Made For?\"", "Billie Eilish", "Balada introspectiva que acompaña la crisis existencial de Barbie.", "Conectó profundamente con la experiencia universal de la feminidad."],
                    ["\"Barbie Girl\"", "Aqua ft. Nicki Minaj & Ice Spice", "Guiño nostálgico que conecta el legado con la reinvención.", "Activó la nostalgia y reforzó el mensaje de evolución de la marca."]
                ]}
            />
            <h3>3.3. Impacto Cultural y Fenómeno en TikTok</h3>
            <p>El éxito de la banda sonora en las listas y su "impacto palpable en el zeitgeist digital," así como su influencia en tendencias de TikTok como <Highlight>#Barbiecore</Highlight>, van más allá de la simple popularidad; es la música impulsando la creación de contenido generado por el usuario.</p>
        </>
    ),
    ejemplos_exitosos: (
        <>
            <h2>4. Ejemplos Destacados de Estrategias Musicales Exitosas</h2>
            <p>La historia de la publicidad está repleta de campañas que demuestran el poder transformador de la música.</p>
            <h3>4.1. Campañas Icónicas</h3>
            <ul>
                <li className="my-2"><strong>Apple "Share your gifts":</strong> Usó "Come out and play" de Billie Eilish para desatar el potencial emocional de una historia de empoderamiento.</li>
                <li className="my-2"><strong>Cadbury "Gorilla":</strong> Un gorila tocando "In The Air Tonight" de Phil Collins se centró en la emoción de la felicidad en lugar del producto.</li>
                <li className="my-2"><strong>Coca-Cola "I'd Like to Buy the World a Coke":</strong> Trascendió el ámbito publicitario para convertirse en un himno cultural de unidad.</li>
                <li className="my-2"><strong>Levi's "Odyssey":</strong> Un ejemplo de "disrupción sonora" al emplear música clásica de Handel para una marca juvenil, resultando en un aumento del 200% en ventas.</li>
            </ul>
        </>
    ),
    conclusiones: (
        <>
            <h2>Conclusiones</h2>
            <p>La música emerge como un pilar estratégico indispensable en el panorama de la publicidad y la comunicación de marca contemporánea. No es un mero adorno, sino un componente activo que puede persuadir a un nivel subconsciente, establecer conexiones emocionales y actuar como un lenguaje universal.</p>
            <p>El auge de los <Highlight>brand films</Highlight> representa una evolución natural de esta comprensión. La música en un brand film no solo apoya la historia, sino que la define, añadiendo capas de significado y resonancia.</p>
            <Quote>El caso de la película Barbie es un testimonio elocuente de este poder. Su banda sonora se convirtió en un motor clave de su éxito comercial y fenómeno cultural.</Quote>
            <p>En un mercado saturado de estímulos visuales, el marketing auditivo y la integración estratégica de la música ofrecen una vía poderosa para la diferenciación y la conexión auténtica. La música, en esencia, no solo hace que las marcas sean escuchadas, sino que las hace sentir y recordar.</p>
        </>
    )
};