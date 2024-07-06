const chatMessages = document.getElementById('chat-messages');
const userInputElement = document.getElementById('user-input');
let currentContext = ''; // Variable para almacenar el contexto actual del usuario
let selectedProduct = ''; // Variable para almacenar el producto seleccionado
let selectedProductPrice = 0; // Variable para almacenar el precio del producto seleccionado


const pedidosPorDNI = {
    '72722708': "🤖 Hola Michael, te informamos que tu pedido ya fue ingresado por Olva Courier el día de hoy a las 6:54 am, ya se encuentra en camino.",
    '24605872': "🤖 Hola Dayan, te informamos que tu pedido aún no ha sido enviado.",
    '64897523': "🤖 Hola Alejandra, verificamos que tu pedido ya llegó a la terminal La Asunción - Cajamarca el día de hoy a las 5:00 am."
};
const productos = {
    'blusas': [
        { nombre: 'Blusa de encaje', precio: 59.90 },
        { nombre: 'Blusa Off-Shoulder', precio: 49.90 },
        { nombre: 'Blusa Peplumn', precio: 59.90 },
        { nombre: 'Blusa de Seda', precio: 69.90 }
    ],
    'vestidos': [
        { nombre: 'Vestido de cóctel', precio: 99.90 },
        { nombre: 'Vestido Maxi', precio: 109.90 },
        { nombre: 'Vestido de Línea A', precio: 79.90 },
        { nombre: 'Vestido Camisero', precio: 99.90 }
    ],
    'jeans': [
        { nombre: 'Mom jeans', precio: 89.90 },
        { nombre: 'Skinny', precio: 79.90 },
        { nombre: 'Super Skinny', precio: 89.90 },
        { nombre: 'Jeans a la cadera', precio: 79.90 },
        { nombre: 'Slim Fit', precio: 69.90 },
        { nombre: 'Cargo', precio: 89.90 },
        { nombre: 'Flare', precio: 79.90 }
    ]
};

function sendMessage() {
    const userMessage = userInputElement.value.trim();
    if (userMessage === '') return;

    appendUserMessage(userMessage);
    processUserMessage(userMessage);
    userInputElement.value = '';
}

function appendBotMessage(message) {
    const botMessage = `<div class="chat-message bot-message"><span class="message">${message}</span></div>`;
    chatMessages.innerHTML += botMessage;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendUserMessage(message) {
    const userMessage = `<div class="chat-message user-message"><span class="message">${message}</span></div>`;
    chatMessages.innerHTML += userMessage;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserMessage(message) {
    const lowercaseMessage = message.toLowerCase();

    if (lowercaseMessage === 'estado de mi pedido') {
        appendBotMessage("🤖 Bríndame tu número de DNI.");
        currentContext = 'estado_pedido';
    } else if (lowercaseMessage === 'hacer un pedido') {
        showHacerPedido();
        currentContext = 'hacer_pedido';
    } else if (lowercaseMessage === 'otra consulta') {
        appendBotMessage("🤖 ¿En qué más te puedo ayudar?");
        appendBotMessage("A) Otra consulta");
        appendBotMessage("B) Deseas comunicarte con un asesor");
        currentContext = 'otra_consulta';
    } else if (currentContext === 'hacer_pedido') {
        handlePedidoOpcion(lowercaseMessage);
    } else if (currentContext === 'seleccion_prenda') {
        handleSeleccionPrenda(lowercaseMessage);
    } else if (currentContext === 'cantidad_prenda') {
        handleCantidadPrenda(lowercaseMessage);
    } else if (currentContext === 'calculo_total') {
        handleCalculoTotal(lowercaseMessage);
    } else if (lowercaseMessage === 'a') {
        if (currentContext === 'estado_pedido') {
            // Redireccionar al inicio
            location.reload();
        } else if (currentContext === 'hacer_pedido') {
            // Aquí puedes añadir alguna acción adicional si es necesario
        }
    } else if (lowercaseMessage === 'b') {
        // Abrir enlace de WhatsApp para comunicarse con un asesor
        window.open('https://api.whatsapp.com/send?phone=51993111904', '_blank');
    } else {
        // Verificar si el mensaje es un DNI válido
        if (pedidosPorDNI.hasOwnProperty(message)) {
            appendBotMessage(pedidosPorDNI[message]);
            appendBotMessage("🤖 ¿En qué más te puedo ayudar?");
            appendBotMessage("B) Deseo comunicarme con un asesor");
            currentContext = 'consulta_dni_valido';
        } else {
            appendBotMessage("🤖 No tienes ningún pedido en proceso.");
            appendBotMessage("🤖¿Deseas comunicarte con un asesor?  escribe la letra B para que puedas comunicarte con nosotros. Gracias, ten un buen día.");
            currentContext = 'sin_pedido';
        }
    }
}

function showPedidoEstado() {
    appendBotMessage("Estado de mi pedido");
    appendBotMessage("🤖 Bríndame tu número de DNI.");
    currentContext = 'estado_pedido';
}

function showHacerPedido() {
    appendBotMessage("Hacer un pedido");
    appendBotMessage("🤖 ¿Cómo deseas realizar tu pedido?");
    appendBotMessage("A) Por unidad");
    appendBotMessage("B) Al por mayor");
    currentContext = 'hacer_pedido';
}

function handlePedidoOpcion(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage === 'a') {
        showProductosPorUnidad();
    } else if (lowercaseMessage === 'b') {
        appendBotMessage("🤖¿Qué prenda deseas comprar al por mayor?");
        appendBotMessage("A) Blusas");
        appendBotMessage("B) Vestidos");
        appendBotMessage("C) Jeans");
        currentContext = 'seleccion_prenda';
    } else {
        appendBotMessage("🤖 Por favor, selecciona una opción válida: A o B.");
    }
}

function showProductosPorUnidad() {
    appendBotMessage("Productos por unidad:");
    appendBotMessage("\n🤖★ JEANS:");
    appendBotMessage("\nMom jeans: S/.89.90 (EN STOCK)\n");
    appendBotMessage("\nSkinny: S/.79.90 (EN STOCK)\n");
    appendBotMessage("\nSuper Skinny: S/.89.90 (EN STOCK)\n");
    appendBotMessage("\nJeans a la cadera: S/.79.90 (EN STOCK)\n");
    appendBotMessage("\nSlim Fit: S/.69.90 (EN STOCK)\n");
    appendBotMessage("\nCargo: S/.89.90 (EN STOCK)\n");
    appendBotMessage("\nFlare: S/.79.90 (EN STOCK)\n");

    appendBotMessage("\n🤖★ VESTIDOS:");
    appendBotMessage("\nVestido de cóctel: S/.99.90 (EN STOCK)\n");
    appendBotMessage("\nVestido Maxi: S/.109.90 (EN STOCK)\n");
    appendBotMessage("\nVestido de Línea A: S/.79.90 (EN STOCK)\n");
    appendBotMessage("\nVestido Camisero: S/.99.90 (EN STOCK)\n");

    appendBotMessage("\n🤖★ BLUSAS:");
    appendBotMessage("\nBlusa de encaje: S/.59.90 (EN STOCK)\n");
    appendBotMessage("\nBlusa Off-Shoulder: S/.49.90 (EN STOCK)\n");
    appendBotMessage("\nBlusa Peplumn: S/.59.90 (EN STOCK)\n");
    appendBotMessage("\nBlusa de Seda: S/.69.90 (EN STOCK)\n");
}

function handleSeleccionPrenda(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    switch (lowercaseMessage) {
        case 'a':
            appendBotMessage("★ BLUSAS:");
            productos.blusas.forEach((blusa, index) => {
                appendBotMessage(`${index + 1}) ${blusa.nombre}: S/.${blusa.precio.toFixed(2)} (EN STOCK)`);
            });
            selectedProduct = 'blusas';
            break;
        case 'b':
            appendBotMessage("★ VESTIDOS:");
            productos.vestidos.forEach((vestido, index) => {
                appendBotMessage(`${index + 1}) ${vestido.nombre}: S/.${vestido.precio.toFixed(2)} (EN STOCK)`);
            });
            selectedProduct = 'vestidos';
            break;
        case 'c':
            appendBotMessage("★ JEANS:");
            productos.jeans.forEach((jean, index) => {
                appendBotMessage(`${index + 1}) ${jean.nombre}: S/.${jean.precio.toFixed(2)} (EN STOCK)`);
            });
            selectedProduct = 'jeans';
            break;
        default:
            appendBotMessage("🤖Por favor, selecciona una opción válida: A, B o C.");
            return;
    }

    appendBotMessage("🤖Por favor selecciona el número de la prenda que deseas comprar.");
    currentContext = 'cantidad_prenda';
}

function handleCantidadPrenda(userMessage) {
    const selection = parseInt(userMessage);
    if (isNaN(selection) || selection < 1 || selection > productos[selectedProduct].length) {
        appendBotMessage("🤖Por favor, selecciona un número válido de la lista.");
        return;
    }

    const selectedProductInfo = productos[selectedProduct][selection - 1];
    selectedProductPrice = selectedProductInfo.precio;
    appendBotMessage(`🤖Has seleccionado ${selectedProductInfo.nombre}. ¿Cuántas deseas comprar?`);
    currentContext = 'calculo_total';
}

function handleCalculoTotal(userMessage) {
    const cantidad = parseInt(userMessage);
    if (isNaN(cantidad) || cantidad < 1) {
        appendBotMessage("🤖Por favor, ingresa una cantidad válida.");
        return;
    }

    const total = cantidad * selectedProductPrice;
    appendBotMessage(`Total de ${selectedProduct}: S/.${total.toFixed(2)}`);
    appendBotMessage("🤖¿En qué más te puedo ayudar?");
    appendBotMessage("B) ¿Deseas comunicarte con un asesor?");
    currentContext = 'otra_consulta';
}

function scrollToChat() {
    // Enfocar el contenedor principal del chat
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Función para mostrar opciones de devolución

function showDevoluciones() {
    appendBotMessage("🤖 Seleccionaste consultar devolución. ¿Cómo podemos ayudarte?");
    appendBotMessage("A) Política de devolución");
    appendBotMessage("B) Realizar devolución");
    
    currentContext = 'devolucion_consulta';
}

function handleDevolucionConsulta(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    switch (lowercaseMessage) {
        case 'a':
            appendBotMessage("🤖 Política de devolución: Puedes devolver los productos en un plazo de 30 días desde la compra.");
            break;
        case 'b':
            appendBotMessage("🤖 Realizar devolución: Por favor, envía un correo a devoluciones@tamine.com con los detalles de tu pedido.");
            break;
        
        default:
            appendBotMessage("🤖 Por favor, selecciona una opción válida: A o B.");
            return;
    }

    appendBotMessage("🤖 ¿En qué más te puedo ayudar?");
    appendBotMessage("B) Deseo comunicarme con un asesor");
    currentContext = 'otra_consulta';
}

// Procesar mensaje para devoluciones
function processDevolucionMessage(message) {
    if (currentContext === 'devolucion_consulta') {
        handleDevolucionConsulta(message);
    } else {
        // Manejar otros contextos o respuestas aquí si es necesario
    }
}

// Función para enviar mensajes del usuario
function sendMessage() {
    const userMessage = userInputElement.value.trim();
    if (userMessage === '') return;

    appendUserMessage(userMessage);
    
    // Procesar mensaje para devoluciones si está en contexto de devolución
    if (currentContext === 'devolucion_consulta') {
        processDevolucionMessage(userMessage);
    } else {
        // Procesar otros mensajes
        processUserMessage(userMessage);
    }

    userInputElement.value = '';
}

function showOtraConsulta() {
    window.location.href = 'https://forms.gle/hpSgZ6gXqaF8KoCV9';
}




