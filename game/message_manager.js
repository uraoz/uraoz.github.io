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
        this.content.textContent = msg.text;
        this.show();

        setTimeout(() => {
            this.processQueue();
        }, msg.duration);
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
}
