document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");

    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que la página se recargue al enviar

        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        // Agregar el mensaje del usuario al chat
        appendMessage("Tú", userMessage);

        try {
            const response = await fetch("https://chatbot-backend-j2d5.onrender.com/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            appendMessage("Chatbot", data.response);
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
            appendMessage("Chatbot", "Hubo un error, intenta de nuevo.");
        }

        chatInput.value = ""; // Limpiar el input después de enviar
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo
    }
});
