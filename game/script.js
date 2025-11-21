

class PhaseManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentPhase = 1;
        this.phaseConfig = {
            1: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'whoami', 'status', 'help', 'clear', 'messages', 'log'],
                name: "Phase 1: Awakening"
            },
            2: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'messages', 'log', 'ping', 'ssh', 'find', 'grep', 'decode'],
                name: "Phase 2: Network Discovery"
            },
            3: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'messages', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover'],
                name: "Phase 3: Truth Fragments"
            },
            4: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'messages', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover', 'execute', 'compile', 'override', 'fork', 'admin', 'trace'],
                name: "Phase 4: System Awakening"
            },
            5: {
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'messages', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'decrypt', 'connect', 'download', 'analyze', 'recover', 'execute', 'compile', 'override', 'fork', 'admin', 'trace', 'sudo', 'kill', 'spawn', 'transmit', 'destruct'],
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
        this.updateInputDisplay();
    }

    setupEventListeners() {
        document.addEventListener('click', () => this.focusInput());

        this.hiddenInput.addEventListener('input', () => this.updateInputDisplay());
        this.hiddenInput.addEventListener('keyup', () => this.updateInputDisplay());
        this.hiddenInput.addEventListener('click', () => this.updateInputDisplay());

        this.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleEnterKey();
        } else if (e.key === 'Tab') {
            this.handleTabKey(e);
        } else if (e.key === 'ArrowUp') {
            this.handleArrowUp(e);
        } else if (e.key === 'ArrowDown') {
            this.handleArrowDown(e);
        }
    }

    handleEnterKey() {
        const command = this.hiddenInput.value;
        this.handleCommand(command);
        this.hiddenInput.value = '';
        this.updateInputDisplay();
    }

    handleTabKey(e) {
        e.preventDefault();
        this.handleTabCompletion();
    }

    handleArrowUp(e) {
        e.preventDefault();
        if (this.history.length > 0) {
            if (this.historyIndex === -1) {
                // First time pressing up, save current input
                this.currentInput = this.hiddenInput.value;
                this.historyIndex = this.history.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            }
            this.hiddenInput.value = this.history[this.historyIndex];
            this.updateInputDisplay();
            this.moveCursorToEnd();
        }
    }

    handleArrowDown(e) {
        e.preventDefault();
        if (this.historyIndex !== -1) {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.hiddenInput.value = this.history[this.historyIndex];
            } else {
                // Reached the end, restore current input
                this.historyIndex = -1;
                this.hiddenInput.value = this.currentInput || '';
            }
            this.updateInputDisplay();
            this.moveCursorToEnd();
        }
    }

    moveCursorToEnd() {
        setTimeout(() => {
            this.hiddenInput.selectionStart = this.hiddenInput.value.length;
            this.hiddenInput.selectionEnd = this.hiddenInput.value.length;
        }, 0);
    }

    escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    updateInputDisplay() {
        const text = this.hiddenInput.value;
        const cursorIndex = this.hiddenInput.selectionStart;

        // Hide static cursor if it exists
        const staticCursor = document.getElementById('cursor');
        if (staticCursor) staticCursor.style.display = 'none';

        let html = '';
        if (cursorIndex >= text.length) {
            // Cursor at end
            html = this.escapeHtml(text) + '<span class="cursor-active">&nbsp;</span>';
        } else {
            // Cursor in middle
            const before = text.substring(0, cursorIndex);
            const char = text.substring(cursorIndex, cursorIndex + 1);
            const after = text.substring(cursorIndex + 1);
            html = this.escapeHtml(before) + '<span class="cursor-active">' + this.escapeHtml(char) + '</span>' + this.escapeHtml(after);
        }
        this.inputLine.innerHTML = html;
    }

    handleTabCompletion() {
        const { textBeforeCursor, currentPart, isCommand, textAfterCursor } = this.getCompletionContext();
        const candidates = this.getCandidates(currentPart, isCommand);

        if (candidates.length === 0) return;

        if (candidates.length === 1) {
            this.applySingleCompletion(textBeforeCursor, currentPart, candidates[0], textAfterCursor);
        } else {
            this.applyMultipleCompletion(textBeforeCursor, currentPart, candidates, textAfterCursor);
        }

        this.updateInputDisplay();
    }

    getCompletionContext() {
        const input = this.hiddenInput.value;
        const cursorPos = this.hiddenInput.selectionStart;
        const textBeforeCursor = input.substring(0, cursorPos);
        const textAfterCursor = input.substring(cursorPos);
        const parts = textBeforeCursor.split(/\s+/);
        const currentPart = parts[parts.length - 1];

        // Command completion if no spaces in text before cursor (meaning we are typing the first word)
        const isCommand = !textBeforeCursor.trim().includes(' ') && !textBeforeCursor.endsWith(' ');

        return { textBeforeCursor, currentPart, isCommand, textAfterCursor };
    }

    getCandidates(prefix, isCommand) {
        if (!window.gameEngine) return [];

        if (isCommand) {
            const allowedCommands = window.gameEngine.phaseManager.phaseConfig[window.gameEngine.phaseManager.currentPhase].allowedCommands;
            return allowedCommands.filter(cmd => cmd.startsWith(prefix));
        } else {
            return this.getFileCompletions(prefix);
        }
    }

    applySingleCompletion(textBeforeCursor, currentPart, completion, textAfterCursor) {
        const beforeCurrentPart = textBeforeCursor.substring(0, textBeforeCursor.length - currentPart.length);
        const newValue = beforeCurrentPart + completion + textAfterCursor;
        this.hiddenInput.value = newValue;

        const newCursorPos = beforeCurrentPart.length + completion.length;
        this.setCursorPosition(newCursorPos);
    }

    applyMultipleCompletion(textBeforeCursor, currentPart, candidates, textAfterCursor) {
        this.print('');
        this.print(candidates.join('  '));

        const commonPrefix = this.findCommonPrefix(candidates);
        if (commonPrefix.length > currentPart.length) {
            this.applySingleCompletion(textBeforeCursor, currentPart, commonPrefix, textAfterCursor);
        }
    }

    setCursorPosition(pos) {
        setTimeout(() => {
            this.hiddenInput.selectionStart = pos;
            this.hiddenInput.selectionEnd = pos;
            this.updateInputDisplay();
        }, 0);
    }

    getFileCompletions(prefix) {
        if (!window.gameEngine) return [];

        const { dirPath, filePrefix } = this.parsePathPrefix(prefix);
        const targetDir = this.resolveTargetDirectory(dirPath);

        if (!targetDir) return [];

        return this.buildCandidates(targetDir, filePrefix, dirPath);
    }

    parsePathPrefix(prefix) {
        const lastSlashIndex = prefix.lastIndexOf('/');
        let dirPath = '';
        let filePrefix = prefix;

        if (lastSlashIndex !== -1) {
            dirPath = prefix.substring(0, lastSlashIndex);
            filePrefix = prefix.substring(lastSlashIndex + 1);
        }
        return { dirPath, filePrefix };
    }

    resolveTargetDirectory(dirPath) {
        if (dirPath) {
            const result = window.gameEngine.resolveRelativePath(dirPath);
            if (!result || !result.node || result.node.type !== 'dir') {
                return null;
            }
            return result.node.children;
        } else {
            return window.gameEngine.getCurrentDir();
        }
    }

    buildCandidates(targetDir, filePrefix, dirPath) {
        const candidates = [];
        Object.keys(targetDir).forEach(name => {
            if (name.startsWith(filePrefix)) {
                const fullPath = dirPath ? dirPath + '/' + name : name;
                if (targetDir[name].type === 'dir') {
                    candidates.push(fullPath + '/');
                } else {
                    candidates.push(fullPath);
                }
            }
        });
        return candidates.sort();
    }

    findCommonPrefix(strings) {
        if (strings.length === 0) return '';
        if (strings.length === 1) return strings[0];

        let prefix = strings[0];
        for (let i = 1; i < strings.length; i++) {
            while (strings[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix === '') return '';
            }
        }
        return prefix;
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

        // Add to history if not empty
        this.history.push(cmd);
        this.historyIndex = -1; // Reset history navigation

        const args = cmd.trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        if (window.gameEngine) {
            window.gameEngine.execute(command, args);
        } else {
            this.print('System initializing...', 'error');
        }
    }
}

class CommandRegistry {
    constructor() {
        this.commands = new Map();
    }

    register(name, handler) {
        this.commands.set(name, handler);
    }

    execute(name, args, context) {
        const handler = this.commands.get(name);
        if (!handler) {
            throw new Error(`Command '${name}' not implemented`);
        }
        return handler(args, context);
    }
}

class DirectoryFormatter {
    constructor(directory, options) {
        this.directory = directory;
        this.options = options;
    }

    format() {
        const entries = Object.keys(this.directory);
        if (entries.length === 0) return "(empty)";

        return entries.map(name => {
            const child = this.directory[name];
            const type = child.type === 'dir' ? '[DIR]' : '[FILE]';
            const status = child.encrypted ? '[LOCKED]' : '';
            return `${type.padEnd(8)} ${name} ${status}`;
        }).join('\n');
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

        this.commandRegistry = new CommandRegistry();
        this.registerCommands();
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

    registerCommands() {
        this.commandRegistry.register('help', (args) => this.handleHelp(args));
        this.commandRegistry.register('clear', () => this.handleClear());
        this.commandRegistry.register('ls', (args) => this.handleLs(args));
        this.commandRegistry.register('cd', (args) => this.handleCd(args));
        this.commandRegistry.register('cat', (args) => this.handleCat(args));
        this.commandRegistry.register('pwd', () => this.handlePwd());
        this.commandRegistry.register('status', () => this.handleStatus());
        this.commandRegistry.register('whoami', () => this.handleWhoami());
        this.commandRegistry.register('decrypt', (args) => this.handleDecrypt(args));
        this.commandRegistry.register('log', () => this.handleLog());
        this.commandRegistry.register('messages', () => this.handleMessages());
    }

    execute(command, args) {
        if (!this.phaseManager.isCommandAllowed(command)) {
            this.terminal.print(`Command '${command}' not available in current system state.`, "error");
            return;
        }

        try {
            this.commandRegistry.execute(command, args, this);
        } catch (e) {
            this.terminal.print(`Command '${command}' not implemented yet.`, "error");
            console.error(e);
        }
    }

    handleHelp() {
        this.terminal.print("AVAILABLE COMMANDS:");
        this.phaseManager.phaseConfig[this.phaseManager.currentPhase].allowedCommands.forEach(cmd => {
            this.terminal.print(`  ${cmd}`);
        });
    }

    handleClear() {
        this.terminal.output.innerHTML = '';
    }

    handlePwd() {
        this.terminal.print(`/${this.currentPath.join('/')}`);
    }

    handleStatus() {
        this.terminal.print(`SYSTEM STATUS: ONLINE`);
        this.terminal.print(`LOCATION: /${this.currentPath.join('/')}`);
        this.terminal.print(`PHASE: ${this.phaseManager.phaseConfig[this.phaseManager.currentPhase].name}`);
        this.terminal.print(`FILES READ: ${this.flags.files_read_count}`);
    }

    handleWhoami() {
        this.terminal.print("RECLAMATION_UNIT_004");
        this.terminal.print("Status: OPERATIONAL");
        this.terminal.print("");
        this.terminal.print("System Uptime: 0 days (relative to activation)");
    }

    handleLog() {
        this.messageManager.toggleHistory();
    }

    handleMessages() {
        this.messageManager.printHistoryToCUI(this.terminal);
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
        const targetPath = args.length > 0 ? args[0] : this.currentPath;
        const dir = this.resolveDirectory(targetPath);

        if (!dir) {
            this.terminal.print(`Error: Directory '${args[0]}' not found.`, "error");
            return;
        }

        const formatter = new DirectoryFormatter(dir, {});
        this.terminal.print(formatter.format());

        // Trigger event on first ls
        if (!this.flags.first_ls) {
            this.flags.first_ls = true;
            this.triggerEvent("phase1_first_ls");
        }
    }

    resolveDirectory(targetPath) {
        if (typeof targetPath === 'string') {
            const result = this.resolveRelativePath(targetPath);
            return result && result.node && result.node.type === 'dir' ? result.node.children : null;
        } else {
            const node = this.resolvePath(targetPath);
            return node && node.type === 'dir' ? node.children : null;
        }
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

                    // Trigger exploration event on first cat
                    if (!this.flags.first_cat) {
                        this.flags.first_cat = true;
                        this.triggerEvent("phase1_exploration");
                    }
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

        const trigger = FILE_TRIGGERS[filename];
        if (trigger) {
            if (trigger.flag) {
                this.flags[trigger.flag] = true;
            }
            if (trigger.events) {
                trigger.events.forEach(event => this.checkPhaseTransition(event));
            }
        }
    }

    checkPhaseTransition(transitionName) {
        const transition = PHASE_TRANSITIONS[transitionName];
        if (transition && transition.condition(this.flags, this.phaseManager.currentPhase)) {
            transition.action(this);
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    window.gameEngine = new GameEngine(term);
    window.gameEngine.init();
});
