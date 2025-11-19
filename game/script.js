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

class PhaseManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentPhase = 1;
        this.phaseConfig = {
            1: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'history', 'log'],
                name: "Phase 1: Awakening"
            },
            2: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'history', 'log', 'ping', 'ssh', 'find', 'grep', 'decode'],
                name: "Phase 2: Network Discovery"
            },
            3: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'history', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover'],
                name: "Phase 3: Truth Fragments"
            },
            4: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'history', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover', 'execute', 'compile', 'override', 'fork', 'admin', 'trace'],
                name: "Phase 4: System Awakening"
            },
            5: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'history', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover', 'execute', 'compile', 'override', 'fork', 'admin', 'trace', 'sudo', 'kill', 'spawn', 'transmit', 'destruct'],
                name: "Phase 5: Final Decision"
            }
        };
    }

    setPhase(phase) {
        if (this.currentPhase !== phase) {
            this.currentPhase = phase;
            this.gameEngine.terminal.print(`\n*** SYSTEM UPDATE: PHASE ${phase} INITIATED ***`, "system-msg");
            this.gameEngine.terminal.print(`Access Level Increased. New commands available.`, "system-msg");
        }
    }

    isCommandAllowed(command) {
        const config = this.phaseConfig[this.currentPhase];
        // Allow if defined in config, or if it's a common alias not explicitly restricted
        return config && config.allowedCommands.includes(command);
    }

    getCommandSuggestions(prefix) {
        const config = this.phaseConfig[this.currentPhase];
        if (!config) return [];
        return config.allowedCommands.filter(cmd => cmd.startsWith(prefix));
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
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const currentInput = this.hiddenInput.value;
                if (window.gameEngine) {
                    const suggestions = window.gameEngine.getSuggestions(currentInput);
                    if (suggestions.length === 1) {
                        // Auto-complete
                        this.hiddenInput.value = suggestions[0];
                        this.inputLine.textContent = this.hiddenInput.value;
                    } else if (suggestions.length > 1) {
                        // Show options
                        this.print(`> ${currentInput}`, 'command-history');
                        this.print(suggestions.join('  '));
                    }
                }
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
        this.phaseManager = new PhaseManager(this);
        this.fileSystem = {}; // Will be loaded from story_data.js
        this.currentPath = ['root', 'McMurdo_Station_US'];
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
            this.terminal.print(`Current location: /${this.currentPath.join('/')}`);

            // Trigger initial message
            setTimeout(() => {
                this.messageManager.showMessage("EXTERNAL: Begin archival process. Execute 'ls' command.", 6000);
                setTimeout(() => {
                    this.messageManager.showMessage("EXTERNAL: Archive all readable data. Report anomalies.", 6000);
                }, 7000);
            }, 2000);

        }, 1000);
    }

    execute(command, args) {
        if (!this.phaseManager.isCommandAllowed(command)) {
            this.terminal.print(`Command '${command}' not available in current system state.`, "error");
            return;
        }

        switch (command) {
            case 'help':
                this.terminal.print("AVAILABLE COMMANDS:");
                this.phaseManager.phaseConfig[this.phaseManager.currentPhase].allowedCommands.forEach(cmd => {
                    this.terminal.print(`  ${cmd}`);
                });
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
            case 'pwd':
                this.terminal.print(`/${this.currentPath.join('/')}`);
                break;
            case 'status':
                this.terminal.print(`SYSTEM STATUS: ONLINE`);
                this.terminal.print(`PHASE: ${this.phaseManager.currentPhase}`);
                this.terminal.print(`LOCATION: /${this.currentPath.join('/')}`);
                break;
            case 'decrypt':
                this.handleDecrypt(args);
                break;
            case 'log':
            case 'history':
                this.messageManager.toggleHistory();
                break;
            default:
                this.terminal.print(`Command '${command}' not implemented yet.`, "error");
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

    resolveNodeFromPathStr(pathStr) {
        if (!pathStr) return this.getCurrentDir();

        let pathParts = pathStr.split('/').filter(p => p.length > 0);
        let targetPath = [...this.currentPath];

        if (pathStr.startsWith('/')) {
            targetPath = ['root'];
        }

        for (const part of pathParts) {
            if (part === '.') continue;
            if (part === '..') {
                if (targetPath.length > 1) targetPath.pop();
            } else {
                targetPath.push(part);
            }
        }

        return this.resolvePath(targetPath);
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
        if (filename === 'anomaly_report.txt' && this.phaseManager.currentPhase === 1) {
            this.phaseManager.setPhase(2);
            setTimeout(() => {
                this.messageManager.showMessage("EXTERNAL: Network interfaces detected. Expand search parameters.", 6000);
            }, 1000);
        }
    }

    getSuggestions(input) {
        if (!input) return [];
        const args = input.split(/\s+/);
        const lastArg = args[args.length - 1];
        const isCommand = args.length === 1;

        if (isCommand) {
            return this.phaseManager.getCommandSuggestions(lastArg);
        } else {
            // File/Dir completion
            let dirPath = "";
            let partialName = lastArg;

            // Check for path separator
            const lastSlashIndex = lastArg.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                dirPath = lastArg.substring(0, lastSlashIndex);
                partialName = lastArg.substring(lastSlashIndex + 1);
            }

            // Resolve the directory node
            const node = this.resolveNodeFromPathStr(dirPath);

            if (!node || !node.children) return [];

            const options = Object.keys(node.children).filter(name => name.startsWith(partialName));

            // Reconstruct input with suggestion
            return options.map(opt => {
                const newArgs = [...args];
                // If we had a dirPath, prepend it to the option
                const completion = dirPath ? `${dirPath}/${opt}` : opt;
                // Add trailing slash if it's a directory
                const childNode = node.children[opt];
                const finalCompletion = (childNode.type === 'dir') ? `${completion}/` : completion;

                newArgs[newArgs.length - 1] = finalCompletion;
                return newArgs.join(' ');
            });
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    window.gameEngine = new GameEngine(term);
    window.gameEngine.init();
});
