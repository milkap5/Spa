document.addEventListener('DOMContentLoaded', () => {
    const chatbotFab = document.getElementById('chatbotFab');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');

    // --- Base de conocimientos ---
    const knowledgeBase = [
        // --- Respuestas MUY Específicas (Servicios Individuales y Grupales con Descripción Completa) ---
        {
            keywords: ["masaje anti-stress", "anti stress", "masajes relajantes", "masaje antiestres"],
            response: "Masaje Anti-Stress (Masajes)\n💬 Descripción: Relajación profunda para eliminar el estrés, utilizando técnicas de aromaterapia y digitopuntura.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Alivia la tensión muscular, reduce la ansiedad, mejora el estado de ánimo.\n💲 Precio: $10.000"
        },
        {
            keywords: ["masaje descontracturante", "descontracturante"],
            response: "Masaje Descontracturante (Masajes)\n💬 Descripción: Alivia tensiones musculares localizadas, ideal para deportistas o personas con trabajos de alta exigencia física.\n🕒 Duración: 45 minutos\n🎯 Beneficios: Libera nudos y contracturas, mejora la movilidad, reduce el dolor.\n💲 Precio: $12.000"
        },
        {
            keywords: ["masaje piedras calientes", "piedras calientes", "masaje con piedras"],
            response: "Masaje con piedras calientes (Masajes)\n💬 Descripción: Técnica de calor terapéutico para relajar músculos profundamente y mejorar la circulación energética.\n🕒 Duración: 75 minutos\n🎯 Beneficios: Relaja la musculatura, disminuye el estrés, aumenta la sensación de bienestar.\n💲 Precio: $16.000"
        },
        {
            keywords: ["masaje circulatorio", "circulatorio"],
            response: "Masaje circulatorio (Masajes)\n💬 Descripción: Mejora la circulación sanguínea y la oxigenación de los tejidos, ideal para piernas cansadas y retención de líquidos.\n🕒 Duración: 50 minutos\n🎯 Beneficios: Reduce la hinchazón, alivia la fatiga, mejora la nutrición de la piel.\n💲 Precio: $14.500"
        },
        {
            keywords: ["lifting pestañas", "pestañas lifting", "lifting de pestañas"],
            response: "Lifting de pestañas (Belleza)\n💬 Descripción: Realza tus pestañas de forma natural, alargándolas y curvándolas desde la raíz.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Mirada más abierta e intensa, no requiere rímel, resultado duradero.\n💲 Precio: $25.000"
        },
        {
            keywords: ["depilación facial", "depilar cara"],
            response: "Depilación facial (Belleza)\n💬 Descripción: Eliminación precisa del vello facial con cera o hilo, adaptado a cada tipo de piel.\n🕒 Duración: 30 minutos\n🎯 Beneficios: Piel suave y sin irritaciones, define las cejas, mejora la apariencia del maquillaje.\n💲 Precio: $17.000"
        },
        {
            keywords: ["belleza manos pies", "manos y pies", "manicura", "pedicura", "belleza de manos y pies"],
            response: "Belleza de manos y pies (Belleza)\n💬 Descripción: Cuidado completo que incluye exfoliación, limado, esmaltado y masaje relajante.\n🕒 Duración: 90 minutos\n🎯 Beneficios: Manos y pies suaves e hidratados, uñas fuertes y saludables, sensación de bienestar.\n💲 Precio: $21.000"
        },
        {
            keywords: ["punta de diamante", "microdermoabrasión"],
            response: "Punta de Diamante (Faciales)\n💬 Descripción: Microexfoliación que revitaliza la piel, eliminando células muertas y estimulando la producción de colágeno.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Piel más luminosa y suave, reduce arrugas finas y cicatrices, mejora la absorción de productos.\n💲 Precio: $20.000"
        },
        {
            keywords: ["limpieza facial", "hidratación facial", "limpieza profunda", "limpieza profunda mas hidratacion"],
            response: "Limpieza profunda + Hidratación (Faciales)\n💬 Descripción: Purificación facial con extracción de impurezas e hidratación intensiva con mascarilla nutritiva.\n🕒 Duración: 75 minutos\n🎯 Beneficios: Piel limpia y fresca, poros descongestionados, hidratación profunda.\n💲 Precio: $18.000"
        },
        {
            keywords: ["criofrecuencia facial", "lifting facial"],
            response: "Criofrecuencia facial (Faciales)\n💬 Descripción: Shock térmico que estimula la producción de colágeno y elastina, logrando un efecto lifting instantáneo.\n🕒 Duración: 45 minutos\n🎯 Beneficios: Reafirma la piel, reduce la flacidez, atenúa arrugas y líneas de expresión.\n💲 Precio: $22.000"
        },
        {
            keywords: ["velaslim"],
            response: "VelaSlim (Corporales)\n💬 Descripción: Reduce la circunferencia corporal y la celulitis, combinando radiofrecuencia, infrarrojos, vacumterapia y masaje de rodillos.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Modela la figura, mejora la textura de la piel, reduce la retención de líquidos.\n💲 Precio: $35.000"
        },
        {
            keywords: ["dermohealth"],
            response: "DermoHealth (Corporales)\n💬 Descripción: Moviliza los distintos tejidos de la piel y estimula la microcirculación, generando un drenaje linfático y mejorando el aspecto de la piel.\n🕒 Duración: 45 minutos\n🎯 Beneficios: Reduce la celulitis, mejora la circulación, tonifica la piel.\n💲 Precio: $36.000"
        },
        {
            keywords: ["criofrecuencia corporal"],
            response: "Criofrecuencia corporal (Corporales)\n💬 Descripción: Efecto lifting instantáneo en el cuerpo, reafirmando la piel y reduciendo la flacidez gracias al shock térmico.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Reafirma la piel, remodela el contorno corporal, mejora la elasticidad.\n💲 Precio: $29.000"
        },
        {
            keywords: ["ultracavitación", "ultracavitacion"],
            response: "Ultracavitación (Corporales)\n💬 Descripción: Técnica reductora no invasiva que elimina la grasa localizada mediante ondas de ultrasonido.\n🕒 Duración: 50 minutos\n🎯 Beneficios: Reduce la grasa localizada, remodela la figura, mejora la apariencia de la piel.\n💲 Precio: $29.000"
        },
        {
            keywords: ["hidromasaje", "hidromasajes", "jacuzzi", "hidromasajes grupales"],
            response: "Hidromasajes (Grupales)\n💬 Descripción: Sesión grupal de hidromasajes relajantes en nuestras piscinas termales, ideal para compartir con amigos o familia.\n🕒 Duración: 90 minutos\n🎯 Beneficios: Relaja los músculos, alivia el estrés, mejora la circulación, promueve la socialización.\n💲 Precio: $8.000 por persona"
        },
        {
            keywords: ["yoga", "clases de yoga", "yoga grupal"],
            response: "Yoga (Grupales)\n💬 Descripción: Clases grupales de yoga multinivel, adaptadas para principiantes y avanzados, para mejorar tu bienestar físico y mental.\n🕒 Duración: 60 minutos\n🎯 Beneficios: Aumenta la flexibilidad, fortalece el cuerpo, reduce el estrés, mejora la concentración.\n💲 Precio: $6.000 por persona"
        },

        // --- Respuestas por Categoría (Individuales y Grupales, con lista de servicios) ---
        {
            keywords: ["masajes", "masajes individuales", "masajes que ofrecen", "tipos de masajes"],
            response: "💆 En Masajes individuales ofrecemos:\n- Masaje Anti-Stress (60 min, $10.000)\n- Masaje Descontracturante (45 min, $12.000)\n- Masaje con piedras calientes (75 min, $16.000)\n- Masaje circulatorio (50 min, $14.500)"
        },
        {
            keywords: ["belleza", "belleza individual", "servicios de belleza", "servicios de estetica"],
            response: "💅 En Belleza ofrecemos:\n- Lifting de pestañas (60 min, $25.000)\n- Depilación facial (30 min, $17.000)\n- Belleza de manos y pies (90 min, $21.000)"
        },
        {
            keywords: ["faciales", "facial", "tratamientos faciales", "tratamientos para la cara", "cuidado facial"],
            response: "🌸 Tratamientos Faciales:\n- Punta de Diamante (60 min, $20.000)\n- Limpieza profunda + Hidratación (75 min, $18.000)\n- Criofrecuencia facial (45 min, $22.000)"
        },
        {
            keywords: ["corporales", "cuerpo", "tratamientos corporales", "tratamientos para el cuerpo", "reductores", "celulitis", "flacidez"],
            response: "🌿 Tratamientos Corporales:\n- VelaSlim (60 min, $35.000)\n- DermoHealth (45 min, $36.000)\n- Criofrecuencia corporal (60 min, $29.000)\n- Ultracavitación (50 min, $29.000)"
        },
        {
            keywords: ['servicios grupales','servicios en grupo','servicios para grupos','grupal', 'grupales', 'actividades grupales'],
            response: "👥 Nuestros Servicios Grupales incluyen:\n- Hidromasajes (90 min, $8.000 por persona)\n- Clases de Yoga (60 min, $6.000 por persona)\n¿Querés que te cuente más sobre alguno en particular?"
        },
        {
            keywords: ['servicios individuales', 'servicios uno a uno', 'personalizados'],
            response: 'Ofrecemos una variedad de Servicios Individuales como Masajes, Tratamientos Faciales, Corporales y Belleza. ¿Te gustaría saber más sobre alguna categoría en particular?'
        },

        // --- Respuestas de Información General del Spa ---
        {
            keywords: ['servicio', 'servicios', 'ofrecen', 'tienen', 'qué hacen', 'lista de servicios completos'],
            responses: [
                'Ofrecemos Masajes, Belleza, Tratamientos Faciales y Corporales, además de Servicios Grupales. ¿Querés que te detalle alguno?',
                'Tenemos servicios para relajarte y cuidarte: masajes, faciales, corporales y grupales. ¿Qué te interesa conocer más? Puedes ver todos los detalles en nuestras secciones "Servicios Individuales" y "Servicios Grupales".'
            ]
        },
        {
            keywords: ['precio', 'precios', 'costo', 'costos', 'cuánto sale', 'valor', 'valen'],
            response: 'Los precios varían según el servicio. Por ejemplo, Masaje Anti-Stress: $10.000, Lifting de Pestañas: $25.000, Hidromasaje grupal: $8.000 por persona y Clases de Yoga: $6.000 por persona. Podés verlos completos en las secciones "Servicios Individuales" o "Servicios Grupales" de nuestra web.'
        },
        {
            keywords: ['contacto', 'comunicarse', 'llamar', 'teléfono', 'email', 'whatsapp', 'numero de telefono'],
            response: 'Podés contactarnos por WhatsApp al +54 9 (362) 456-7890, por email a info@sentirsebien.com.ar, o visitarnos en French 414, Resistencia.🙌'
        },
        {
            keywords: ["donde estan", "ubicacion", "direccion", "como llegar", "local", "donde se ubican"],
            response: "📍 Estamos en French 414, Ciudad de Resistencia, Chaco. ¡Te esperamos!"
        },
        {
            keywords: ["horarios", "abren", "cierran", "atencion", "a que hora abren", "a que hora cierran"],
            response: "🕒 Nuestro horario es: Lunes a Viernes de 9:00 a 19:00 hs, y Sábados de 10:00 a 15:00 hs."
        },
        {
            keywords: ["turno", "agendar", "reservar", "cita", "como reservo", "pedir turno"],
            response: "📅 Podés reservar turnos directamente desde nuestra web en la sección Servicios. Elegí tu servicio, la fecha y horario que prefieras. ¡Es muy fácil!"
        },

        // --- Saludos y Despedidas ---
        {
            keywords: ['hola', 'buenas', 'hi', 'buen dia', 'buenas tardes'],
            responses: [
                '¡Hola! Soy Valeria, tu asistente virtual de Sentirse Bien 🌿. ¿En qué puedo ayudarte hoy?',
                '¡Bienvenida/o a Sentirse Bien! 💆‍♀️ ¿Cómo puedo asistirte?',
                '¡Hola! ¿Querés saber más sobre nuestros servicios, precios u horarios?'
            ]
        },
        {
            keywords: ['gracias', 'muchas gracias', 'agradezco', 'grx'],
            responses: [
                '¡De nada! 💜 ¿Puedo ayudarte con algo más?',
                'Con gusto 😊 Estoy acá para lo que necesites.',
                '¡Siempre a tu disposición!😘 ¿Hay algo más en lo que pueda asistirte?'
            ]
        },
        {
            keywords: ['chau', 'adios', 'nos vemos', 'hasta luego', 'bye'],
            responses: [
                '¡Hasta pronto! 💆‍♂️ Que tengas un hermoso día.',
                'Nos vemos pronto en Sentirse Bien 🌸',
                '¡Gracias por visitarnos! Te esperamos cuando quieras.'
            ]
        },

        // --- Respuesta por defecto (última en la lista) ---
        {
            keywords: ['default'],
            responses: [
                'No entendí tu pregunta 😕. Podés consultarme por servicios (individuales o grupales), precios, horarios o cómo reservar.',
                'Ups, no reconozco eso. ¿Querés preguntar por masajes, faciales, grupales o contacto?',
                'Intentalo con otra frase. Puedo ayudarte con información sobre nuestros servicios, reservas o datos de contacto.'
            ]
        }
    ];

    // --- Funciones del Chatbot ---

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getBotResponse(userMessage) {
        const normalized = normalize(userMessage);

        for (const item of knowledgeBase) {
            if (item.keywords[0] !== 'default') {
                for (const keyword of item.keywords) {
                    if (normalized.includes(normalize(keyword))) {
                        const responses = item.response || item.responses;
                        return Array.isArray(responses)
                            ? responses[Math.floor(Math.random() * responses.length)]
                            : responses;
                    }
                }
            }
        }

        const fallback = knowledgeBase.find(item => item.keywords[0] === 'default');
        const fallbackResponses = fallback.response || fallback.responses;
        return Array.isArray(fallbackResponses)
            ? fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
            : fallbackResponses;
    }

    function processUserInput() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        chatbotInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, 500);
    }

    // --- Event Listeners ---

    chatbotFab.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotFab.style.display = 'none';
    });

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotFab.style.display = 'flex';
    });
//test de sincronizacion con gittttt ayuda 
    chatbotSendBtn.addEventListener('click', processUserInput);

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
});