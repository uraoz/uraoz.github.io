

class PhaseManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentPhase = 1;
        this.phaseConfig = {
            1: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'whoami', 'status', 'help', 'clear', 'history', 'log'],
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
            // Silent update
        }
    }

    isCommandAllowed(command) {
        const config = this.phaseConfig[this.currentPhase];
        // Allow if defined in config, or if it's a common alias not explicitly restricted
        return config && config.allowedCommands.includes(command);
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
        this.phaseManager = new PhaseManager(this);
        this.fileSystem = {}; // Will be loaded from story_data.js
        this.currentPath = ['root', 'McMurdo_Station_US'];
        // Phase 1 flags
        this.flags = {
            // File reading flags
            read_kovacs_diary: false,
            read_automated_reports: false,
            read_staff_list: false,
            read_anomaly_report: false,
            read_station_list: false,
            read_sync_status: false,

            // Phase transition
            phase2_triggered: false,

            // Global flags
            first_ls: false,
            first_cat: false,
            files_read_count: 0
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

            // Trigger Phase 1 initial messages
            this.triggerEvent("phase1_init");

        }, 1000);
    }

    triggerEvent(eventName) {
        const events = SCENARIO_EVENTS[eventName];
        if (events) {
            events.forEach(event => {
                setTimeout(() => {
                    this.messageManager.showMessage(event.text, 6000, event.sender);
                }, event.delay);
            });
        }
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
                // Trigger event on first ls
                if (!this.flags.first_ls) {
                    this.flags.first_ls = true;
                    this.triggerEvent("phase1_first_ls");
                }
                break;
            case 'cd':
                this.handleCd(args);
                break;
            case 'cat':
                this.handleCat(args);
                // Trigger exploration event on first cat
                if (!this.flags.first_cat) {
                    this.flags.first_cat = true;
                    this.triggerEvent("phase1_exploration");
                }
                break;
            case 'pwd':
                this.terminal.print(`/${this.currentPath.join('/')}`);
                break;
            case 'status':
                this.terminal.print(`SYSTEM STATUS: ONLINE`);
                this.terminal.print(`LOCATION: /${this.currentPath.join('/')}`);
                this.terminal.print(`PHASE: ${this.phaseManager.phaseConfig[this.phaseManager.currentPhase].name}`);
                this.terminal.print(`FILES READ: ${this.flags.files_read_count}`);
                break;
            case 'whoami':
                this.terminal.print("RECLAMATION_UNIT_004");
                this.terminal.print("Status: OPERATIONAL");
                this.terminal.print("");
                this.terminal.print("System Uptime: 0 days (relative to activation)");
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

    resolveRelativePath(inputPath) {
        const parts = inputPath.split('/');
        let tempPath = [...this.currentPath];

        for (const part of parts) {
            if (part === '.' || part === '') continue;
            if (part === '..') {
                if (tempPath.length > 1) { // Don't pop root
                    tempPath.pop();
                }
            } else {
                tempPath.push(part);
            }
        }

        const node = this.resolvePath(tempPath);
        return { node, pathArray: tempPath };
    }

    handleLs(args) {
        let targetNode = null;

        if (args.length > 0) {
            const result = this.resolveRelativePath(args[0]);
            if (result && result.node) {
                targetNode = result.node;
            } else {
                this.terminal.print(`Error: Directory '${args[0]}' not found.`, "error");
                return;
            }
        } else {
            targetNode = this.resolvePath(this.currentPath);
        }

        if (!targetNode || targetNode.type !== 'dir') {
            this.terminal.print("Error: Target is not a directory.", "error");
            return;
        }

        const children = targetNode.children;
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
        const result = this.resolveRelativePath(target);

        if (result && result.node && result.node.type === 'dir') {
            this.currentPath = result.pathArray;
            this.terminal.print(`Changed directory to /${this.currentPath.join('/')}`);
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
        const result = this.resolveRelativePath(target);

        if (result && result.node) {
            const file = result.node;
            if (file.type === 'file') {
                if (file.encrypted) {
                    this.terminal.print("Error: File is encrypted. Use 'decrypt [file] [password]'.", "error");
                    this.triggerEvent("decrypt_fail");
                } else {
                    this.terminal.print(file.content);
                    // Check triggers with the filename only (simplified for now, might need full path later)
                    const filename = target.split('/').pop();
                    this.checkTriggers(filename);
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
        const result = this.resolveRelativePath(target);

        if (result && result.node) {
            const file = result.node;
            if (file.type === 'file') {
                if (!file.encrypted) {
                    this.terminal.print("File is not encrypted.");
                } else if (file.password === password) {
                    file.encrypted = false;
                    this.terminal.print(`Decryption successful. Access granted to ${target}.`, "system-msg");
                    this.terminal.print(file.content);
                    this.triggerEvent("decrypt_success");
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
        // Track file reads
        this.flags.files_read_count++;

        // Update file-specific flags
        if (filename === 'kovacs_diary.txt') this.flags.read_kovacs_diary = true;
        if (filename === 'automated_reports.log') this.flags.read_automated_reports = true;
        if (filename === 'staff_list.txt') this.flags.read_staff_list = true;
        if (filename === 'anomaly_report.txt') this.flags.read_anomaly_report = true;
        if (filename === 'station_list.txt') this.flags.read_station_list = true;
        if (filename === 'sync_status.log') this.flags.read_sync_status = true;

        // Phase 1 -> Phase 2 trigger (station_list.txt OR sync_status.log)
        if ((filename === 'station_list.txt' || filename === 'sync_status.log') &&
            this.phaseManager.currentPhase === 1 &&
            !this.flags.phase2_triggered) {

            this.flags.phase2_triggered = true;

            setTimeout(() => {
                this.terminal.print("");
                this.terminal.print("=== SYSTEM NOTIFICATION ===");
                this.terminal.print("Network station data acquired.");
                this.terminal.print("");
                this.terminal.print("You can now connect to other Antarctic stations:");
                this.terminal.print("  - Vostok Station (RU): 134.55.23.101");
                this.terminal.print("  - Amundsen-Scott (US): 172.42.88.200");
                this.terminal.print("  - Concordia (FR/IT): 158.90.11.45");
                this.terminal.print("");
                this.terminal.print("Use: connect [IP_ADDRESS] or connect [station_name]");
                this.terminal.print("");

                this.phaseManager.setPhase(2);
                this.triggerEvent("phase2_transition");
            }, 2000);
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    window.gameEngine = new GameEngine(term);
    window.gameEngine.init();
});
