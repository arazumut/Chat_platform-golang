document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');

    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data);
        messages.innerHTML += `<p><strong>${message.username}:</strong> ${message.message}</p>`;
        messages.scrollTop = messages.scrollHeight;
    };

    messageForm.addEventListener('submit', event => {
        event.preventDefault();

        const message = {
            username: usernameInput.value,
            message: messageInput.value
        };

        ws.send(JSON.stringify(message));
        messageInput.value = '';
    });
});
