class MessageManager {
    constructor() {
        this.container = document.getElementById('message-container');
        this.content = document.getElementById('message-content');
        this.historyOverlay = document.getElementById('history-overlay');
        this.historyContent = document.getElementById('history-content');

        this.queue = [];
        this.history = [];
        this.isDisplaying = false;

        // Close history on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideHistory();
            }
        });
    }

    showMessage(text, duration = 5000, sender = "EXTERNAL") {
        // Add to history
        const timestamp = new Date().toLocaleTimeString();
        const fullText = sender ? `${sender}: ${text}` : text;
        this.history.push({ text: fullText, timestamp });

        this.queue.push({ text: fullText, duration });
        if (!this.isDisplaying) {
            this.processQueue();
        }
    }

    processQueue() {
        if (this.queue.length === 0) {
            this.hide();
            this.isDisplaying = false;
            return;
        }

        this.isDisplaying = true;
        const msg = this.queue.shift();
        this.show();
        this.decodeEffect(msg.text, this.content, () => {
            setTimeout(() => {
                this.processQueue();
            }, msg.duration);
        });
    }

    decodeEffect(text, element, callback) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iterations = 0;
        const maxIterations = 3; // How many times to scramble each character

        // Clear content initially
        element.textContent = '';

        const interval = setInterval(() => {
            element.textContent = text.split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= text.length) {
                clearInterval(interval);
                element.textContent = text; // Ensure final text is correct
                if (callback) callback();
            }

            iterations += 1 / 2; // Speed of decoding (smaller = slower)
        }, 30);
    }

    show() {
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }

    toggleHistory() {
        if (this.historyOverlay.classList.contains('hidden')) {
            this.showHistory();
        } else {
            this.hideHistory();
        }
    }

    showHistory() {
        this.historyContent.innerHTML = '';
        if (this.history.length === 0) {
            this.historyContent.innerHTML = '<div class="history-entry">No messages logged.</div>';
        } else {
            this.history.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'history-entry';
                div.innerHTML = `
                    <div class="history-timestamp">[${entry.timestamp}]</div>
                    <div class="history-text">${entry.text}</div>
                `;
                this.historyContent.appendChild(div);
            });
        }
        this.historyOverlay.classList.remove('hidden');
    }

    hideHistory() {
        this.historyOverlay.classList.add('hidden');
    }

    printHistoryToCUI(terminal) {
        if (this.history.length === 0) {
            terminal.print('No notification messages received.', 'system-msg');
            return;
        }

        terminal.print('=== NOTIFICATION MESSAGE HISTORY ===', 'system-msg');
        terminal.print('');
        this.history.forEach(entry => {
            terminal.print(`[${entry.timestamp}] ${entry.text}`);
        });
        terminal.print('');
    }
}
