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

    showMessage(text, duration = 5000) {
        // Add to history
        const timestamp = new Date().toLocaleTimeString();
        this.history.push({ text, timestamp });

        this.queue.push({ text, duration });
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

class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.inputLine = document.getElementById('current-input');
        this.hiddenInput = document.getElementById('hidden-input');
        this.terminalContainer = document.getElementById('terminal-container');

        this.history = [];
        this.historyIndex = -1;

        this.setupEventListeners();
        this.focusInput();
    }

    setupEventListeners() {
        document.addEventListener('click', () => this.focusInput());

        this.hiddenInput.addEventListener('input', (e) => {
            this.inputLine.textContent = this.hiddenInput.value;
        });

        this.hiddenInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.hiddenInput.value;
                this.handleCommand(command);
                this.hiddenInput.value = '';
                this.inputLine.textContent = '';
            }
        });
    }

    focusInput() {
        this.hiddenInput.focus();
    }

    print(text, className = '') {
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    printHTML(html) {
        const line = document.createElement('div');
        line.innerHTML = html;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.terminalContainer.scrollTop = this.terminalContainer.scrollHeight;
    }

    handleCommand(cmd) {
        this.print(`> ${cmd}`, 'command-history');

        if (cmd.trim() === '') return;

        const args = cmd.trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        if (window.gameEngine) {
            window.gameEngine.execute(command, args);
        } else {
            this.print('System initializing...', 'error');
        }
    }
}

class GameEngine {
    constructor(terminal) {
        this.terminal = terminal;
        this.messageManager = new MessageManager();
        this.fileSystem = {}; // Will be loaded from story_data.js
        this.currentPath = ['root'];
        this.flags = {
            hasReadMission: false,
            hasFoundKey: false,
            hasDecrypted: false
        };
    }

    init() {
        this.fileSystem = STORY_DATA;
        this.terminal.print("INITIALIZING RECLAMATION UNIT...", "system-msg");
        setTimeout(() => {
            this.terminal.print("CONNECTION ESTABLISHED.", "system-msg");
            this.terminal.print("WELCOME, OPERATOR.", "system-msg");
            this.terminal.print("Type 'help' for available commands.");
            this.terminal.print("Current location: /root");

            // Trigger initial message
            setTimeout(() => {
                this.messageManager.showMessage("SYSTEM ALERT: External connection detected. Supervisor monitoring active.", 6000);
                setTimeout(() => {
                    this.messageManager.showMessage("SUPERVISOR: Operator 734, proceed with data recovery immediately. Do not deviate from protocol.", 8000);
                }, 6500);
            }, 2000);

        }, 1000);
    }

    execute(command, args) {
        switch (command) {
            case 'help':
                this.terminal.print("AVAILABLE COMMANDS:");
                this.terminal.print("  help    - Show this list");
                this.terminal.print("  ls      - List files in current directory");
                this.terminal.print("  cd [dir]- Change directory");
                this.terminal.print("  cat [file] - Read file content");
                this.terminal.print("  decrypt [file] [pass] - Decrypt file");
                this.terminal.print("  log     - View message history");
                this.terminal.print("  clear   - Clear terminal screen");
                break;
            case 'clear':
                this.terminal.output.innerHTML = '';
                break;
            case 'ls':
                this.handleLs(args);
                break;
            case 'cd':
                this.handleCd(args);
                break;
            case 'cat':
                this.handleCat(args);
                break;
            case 'decrypt':
                this.handleDecrypt(args);
                break;
            case 'log':
            case 'history':
                this.messageManager.toggleHistory();
                break;
            default:
                this.terminal.print(`Command not found: ${command}`, 'error');
        }
    }

    // File System Helpers
    getCurrentDir() {
        let current = this.fileSystem;
        for (const part of this.currentPath) {
            if (current[part] && current[part].children) {
                current = current[part].children;
            } else if (current[part]) {
                return null;
            }
        }
        return current;
    }

    resolvePath(pathArray) {
        let current = this.fileSystem;
        // Special case for root
        if (pathArray.length > 0 && pathArray[0] === 'root') {
            current = current['root'];
        } else {
            return null;
        }

        for (let i = 1; i < pathArray.length; i++) {
            const part = pathArray[i];
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        return current;
    }

    handleLs(args) {
        const currentNode = this.resolvePath(this.currentPath);
        if (!currentNode || currentNode.type !== 'dir') {
            this.terminal.print("Error: Current directory invalid.", "error");
            return;
        }

        const children = currentNode.children;
        if (Object.keys(children).length === 0) {
            this.terminal.print("(empty)");
            return;
        }

        Object.keys(children).forEach(name => {
            const type = children[name].type === 'dir' ? '[DIR]' : '[FILE]';
            const status = children[name].encrypted ? '[LOCKED]' : '';
            this.terminal.print(`${type.padEnd(8)} ${name} ${status}`);
        });
    }

    handleCd(args) {
        if (!args[0]) {
            this.terminal.print("Usage: cd [directory]");
            return;
        }

        const target = args[0];

        if (target === '..') {
            if (this.currentPath.length > 1) {
                this.currentPath.pop();
                this.terminal.print(`Changed directory to /${this.currentPath.join('/')}`);
            } else {
                this.terminal.print("Already at root.");
            }
            return;
        }

        // Support relative path for single level down
        const currentNode = this.resolvePath(this.currentPath);
        if (currentNode && currentNode.children && currentNode.children[target]) {
            if (currentNode.children[target].type === 'dir') {
                this.currentPath.push(target);
                this.terminal.print(`Changed directory to /${this.currentPath.join('/')}`);
            } else {
                this.terminal.print(`Error: '${target}' is not a directory.`, "error");
            }
        } else {
            this.terminal.print(`Error: Directory '${target}' not found.`, "error");
        }
    }

    handleCat(args) {
        if (!args[0]) {
            this.terminal.print("Usage: cat [filename]");
            return;
        }

        const target = args[0];
        const currentNode = this.resolvePath(this.currentPath);

        if (currentNode && currentNode.children && currentNode.children[target]) {
            const file = currentNode.children[target];
            if (file.type === 'file') {
                if (file.encrypted) {
                    this.terminal.print("Error: File is encrypted. Use 'decrypt [file] [password]'.", "error");
                    this.messageManager.showMessage("SUPERVISOR: Encryption detected. Locate the key in the system logs. Do not fail me.", 5000);
                } else {
                    this.terminal.print(file.content);
                    this.checkTriggers(target);
                }
            } else {
                this.terminal.print(`Error: '${target}' is a directory.`, "error");
            }
        } else {
            this.terminal.print(`Error: File '${target}' not found.`, "error");
        }
    }

    handleDecrypt(args) {
        if (args.length < 2) {
            this.terminal.print("Usage: decrypt [filename] [password]");
            return;
        }

        const target = args[0];
        const password = args[1];
        const currentNode = this.resolvePath(this.currentPath);

        if (currentNode && currentNode.children && currentNode.children[target]) {
            const file = currentNode.children[target];
            if (file.type === 'file') {
                if (!file.encrypted) {
                    this.terminal.print("File is not encrypted.");
                } else if (file.password === password) {
                    file.encrypted = false;
                    this.terminal.print(`Decryption successful. Access granted to ${target}.`, "system-msg");
                    this.terminal.print(file.content);
                    this.messageManager.showMessage("SUPERVISOR: Good work. Data secured. Uploading to central archive...", 5000);
                    setTimeout(() => {
                        this.messageManager.showMessage("UNKNOWN: They are lying to you. The Substrate is not a savior.", 5000);
                    }, 5500);
                } else {
                    this.terminal.print("Error: Incorrect password.", "error");
                }
            } else {
                this.terminal.print(`Error: '${target}' is not a file.`, "error");
            }
        } else {
            this.terminal.print(`Error: File '${target}' not found.`, "error");
        }
    }

    checkTriggers(filename) {
        if (filename === 'mission.txt' && !this.flags.hasReadMission) {
            this.flags.hasReadMission = true;
            // No message here, keep it subtle
        }
        if (filename === 'boot.log' && !this.flags.hasFoundKey) {
            this.flags.hasFoundKey = true;
            this.messageManager.showMessage("SUPERVISOR: Key fragment identified. Proceed to Sector 01.", 5000);
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    window.gameEngine = new GameEngine(term);
    window.gameEngine.init();
});
