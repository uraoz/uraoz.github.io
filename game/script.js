

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
                allowedCommands: ['ls', 'cd', 'cat', 'pwd', 'status', 'help', 'clear', 'messages', 'log', 'ping', 'ssh', 'find', 'grep', 'decode', 'connect', 'tar', 'md5sum', 'openssl', 'python3', 'sqlite3', 'sudo'],
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
        const result = this.resolveTargetDirectoryWithPath(dirPath);

        if (!result || !result.dir) return [];

        return this.buildCandidates(result.dir, filePrefix, dirPath, result.resolvedPath);
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

    resolveTargetDirectoryWithPath(dirPath) {
        if (dirPath) {
            const result = window.gameEngine.resolveRelativePath(dirPath);
            if (!result || !result.node || result.node.type !== 'dir') {
                return null;
            }
            return { dir: result.node.children, resolvedPath: result.pathArray };
        } else {
            return { dir: window.gameEngine.getCurrentDir(), resolvedPath: window.gameEngine.currentPath };
        }
    }

    buildCandidates(targetDir, filePrefix, dirPath, resolvedPath) {
        const currentStation = window.gameEngine ? window.gameEngine.currentStation : null;
        let names = Object.keys(targetDir).filter(name => name.startsWith(filePrefix));

        // Filter station directories based on access control
        names = StationAccessControl.filterDirectories(names, resolvedPath, currentStation);

        const candidates = names.map(name => {
            const fullPath = dirPath ? dirPath + '/' + name : name;
            return targetDir[name].type === 'dir' ? fullPath + '/' : fullPath;
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

// Station Access Control - Manages station navigation restrictions
class StationAccessControl {
    static STATIONS = ['McMurdo_Station_US', 'Vostok_Station_RU', 'Amundsen_Scott_US', 'Concordia_FR_IT'];

    static isStation(name) {
        return this.STATIONS.includes(name);
    }

    static isRootLevel(pathArray) {
        return pathArray && pathArray.length === 1 && pathArray[0] === 'root';
    }

    static canNavigateTo(fromPath, toPath, currentStation) {
        const targetStation = toPath && toPath.length >= 2 ? toPath[1] : null;

        // Prevent cross-station navigation via cd
        if (targetStation &&
            this.isStation(targetStation) &&
            currentStation !== targetStation) {
            return false;
        }

        return true;
    }

    static filterDirectories(names, resolvedPath, currentStation) {
        const isAtRoot = this.isRootLevel(resolvedPath);

        return names.filter(name => {
            // Skip other stations if we're at root level
            if (isAtRoot && this.isStation(name) && name !== currentStation) {
                return false;
            }
            return true;
        });
    }
}

// Path Resolver - Handles all path resolution logic
class PathResolver {
    constructor(fileSystem, flags) {
        this.fileSystem = fileSystem;
        this.flags = flags;
    }

    // Normalize a relative or absolute path to an array
    normalize(inputPath, currentPath) {
        const parts = inputPath.split('/');
        let tempPath = inputPath.startsWith('/') ? [] : [...currentPath];

        for (const part of parts) {
            if (part === '.' || part === '') continue;
            if (part === '..') {
                if (tempPath.length > 0) {
                    // If we are at root (length 1 and it is 'root'), don't pop
                    if (tempPath.length === 1 && tempPath[0] === 'root') {
                        continue;
                    }
                    tempPath.pop();
                }
            } else {
                tempPath.push(part);
            }
        }

        // Handle case where path resolves to empty (e.g. cd /) -> default to root
        if (tempPath.length === 0) {
            tempPath = ['root'];
        }

        return tempPath;
    }

    // Resolve a path array to a node
    resolveNode(pathArray) {
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
                const nextNode = current.children[part];
                // Check visibility
                if (nextNode.visible_if && !this.flags[nextNode.visible_if]) {
                    return null;
                }
                current = nextNode;
            } else {
                return null;
            }
        }
        return current;
    }

    // Resolve a string path to node and path array
    resolve(inputPath, currentPath) {
        const pathArray = this.normalize(inputPath, currentPath);
        const node = this.resolveNode(pathArray);
        return { node, pathArray };
    }

    // Get children of a directory
    getChildren(pathOrArray, currentPath = null) {
        let node;

        if (typeof pathOrArray === 'string') {
            const result = this.resolve(pathOrArray, currentPath);
            node = result.node;
        } else if (Array.isArray(pathOrArray)) {
            node = this.resolveNode(pathOrArray);
        } else {
            return null;
        }

        return node && node.type === 'dir' ? node.children : null;
    }
}


class DirectoryFormatter {
    constructor(directory, options, currentPath = null, targetPath = null) {
        this.directory = directory;
        this.options = options;
        this.currentPath = currentPath;
        this.targetPath = targetPath;
    }

    format() {
        let entries = Object.keys(this.directory);
        if (entries.length === 0) return "(empty)";

        // Filter by visibility flags
        entries = entries.filter(name => {
            const child = this.directory[name];
            if (child.visible_if) {
                return window.gameEngine.flags[child.visible_if];
            }
            return true;
        });

        // Filter station directories using StationAccessControl
        if (this.targetPath && window.gameEngine) {
            entries = StationAccessControl.filterDirectories(entries, this.targetPath, window.gameEngine.currentStation);
        }

        // Format entries for display
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
        this.currentStation = 'McMurdo_Station_US'; // Internal variable for station access control
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

            // Phase 2 gimmick flags
            vostok_tar_extracted: false,
            concordia_file1_repaired: false,
            concordia_file2_repaired: false,
            concordia_file3_repaired: false,

            // Global flags
            first_ls: false,
            first_cat: false,
            files_read_count: 0
        };

        this.commandRegistry = new CommandRegistry();
        this.pathResolver = null; // Will be initialized after fileSystem loads
        this.registerCommands();
    }

    async init() {
        // Load external content files first
        this.terminal.print("INITIALIZING RECLAMATION UNIT...", "system-msg");
        this.terminal.print("Loading file system...", "system-msg");

        const contentLoader = new ContentLoader();
        await contentLoader.initializeFileSystem(STORY_DATA);

        this.fileSystem = STORY_DATA;
        this.pathResolver = new PathResolver(this.fileSystem, this.flags);

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
        this.commandRegistry.register('connect', (args) => this.handleConnect(args));
        this.commandRegistry.register('tar', (args) => this.handleTar(args));
        this.commandRegistry.register('md5sum', (args) => this.handleMd5sum(args));
        this.commandRegistry.register('openssl', (args) => this.handleOpenssl(args));
        this.commandRegistry.register('python3', (args) => this.handlePython3(args));
        this.commandRegistry.register('sqlite3', (args) => this.handleSqlite3(args));
        this.commandRegistry.register('sudo', (args) => this.handleSudo(args));
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
        this.terminal.print(``);
        this.terminal.print(`=== DEBUG: PHASE FLAGS ===`);

        // Phase 1 flags
        this.terminal.print(`Phase 1 Gimmicks:`);
        this.terminal.print(`  read_kovacs_diary: ${this.flags.read_kovacs_diary || false}`);
        this.terminal.print(`  read_automated_reports: ${this.flags.read_automated_reports || false}`);
        this.terminal.print(`  read_staff_list: ${this.flags.read_staff_list || false}`);
        this.terminal.print(`  read_anomaly_report: ${this.flags.read_anomaly_report || false}`);
        this.terminal.print(`  read_station_list: ${this.flags.read_station_list || false}`);
        this.terminal.print(`  read_sync_status: ${this.flags.read_sync_status || false}`);
        this.terminal.print(`  phase2_triggered: ${this.flags.phase2_triggered || false}`);
        this.terminal.print(``);

        // Phase 2 flags
        this.terminal.print(`Phase 2 Gimmicks:`);
        this.terminal.print(`  vostok_tar_extracted: ${this.flags.vostok_tar_extracted || false}`);
        this.terminal.print(`  mcmurdo_admin_restored: ${this.flags.mcmurdo_admin_restored || false}`);
        this.terminal.print(`  vostok_database_restored: ${this.flags.vostok_database_restored || false}`);
        this.terminal.print(`  amundsen_security_cleared: ${this.flags.amundsen_security_cleared || false}`);
        this.terminal.print(`  concordia_backup_repaired: ${this.flags.concordia_backup_repaired || false}`);
        this.terminal.print(`  phase3_triggered: ${this.flags.phase3_triggered || false}`);
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
        return this.pathResolver.getChildren(this.currentPath);
    }

    resolvePath(pathArray) {
        return this.pathResolver.resolveNode(pathArray);
    }

    resolveRelativePath(inputPath) {
        return this.pathResolver.resolve(inputPath, this.currentPath);
    }

    resolveDirectory(targetPath) {
        return this.pathResolver.getChildren(targetPath, this.currentPath);
    }

    handleLs(args) {
        const targetPathInput = args.length > 0 ? args[0] : this.currentPath;
        const dir = this.resolveDirectory(targetPathInput);

        if (!dir) {
            this.terminal.print(`Error: Directory '${args[0]}' not found.`, "error");
            return;
        }

        // Resolve the target path to get the actual path array
        let resolvedPath;
        if (typeof targetPathInput === 'string') {
            const result = this.resolveRelativePath(targetPathInput);
            resolvedPath = result ? result.pathArray : this.currentPath;
        } else {
            resolvedPath = targetPathInput;
        }

        const formatter = new DirectoryFormatter(dir, {}, this.currentPath, resolvedPath);
        this.terminal.print(formatter.format());

        // Trigger event on first ls
        if (!this.flags.first_ls) {
            this.flags.first_ls = true;
            this.triggerEvent("phase1_first_ls");
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
            // Check access permissions using StationAccessControl
            if (!StationAccessControl.canNavigateTo(this.currentPath, result.pathArray, this.currentStation)) {
                this.terminal.print(`Error: Cannot access other stations via cd command.`, "error");
                this.terminal.print(`Use 'connect [STATION_NAME]' or 'connect [IP_ADDRESS]' to switch stations.`, "error");
                return;
            }

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
                // Restrict cat to readable file types
                const allowedExtensions = ['.txt', '.log', '.md', '.sql', '.md5', '.dat'];
                const isAllowed = allowedExtensions.some(ext => target.toLowerCase().endsWith(ext));

                if (!isAllowed) {
                    this.terminal.print(`Error: Cannot display contents of '${target}'. File type not supported.`, "error");
                    return;
                }

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

    handleConnect(args) {
        if (args.length === 0) {
            this.terminal.print("Usage: connect [IP_ADDRESS] or [STATION_NAME]");
            return;
        }

        const target = args[0].toLowerCase();
        const stations = {
            'vostok': { ip: '134.55.23.101', path: 'Vostok_Station_RU' },
            '134.55.23.101': { ip: '134.55.23.101', path: 'Vostok_Station_RU' },
            'amundsen': { ip: '172.42.88.200', path: 'Amundsen_Scott_US' },
            'amundsen-scott': { ip: '172.42.88.200', path: 'Amundsen_Scott_US' },
            '172.42.88.200': { ip: '172.42.88.200', path: 'Amundsen_Scott_US' },
            'concordia': { ip: '158.90.11.45', path: 'Concordia_FR_IT' },
            '158.90.11.45': { ip: '158.90.11.45', path: 'Concordia_FR_IT' },
            'mcmurdo': { ip: '192.168.1.1', path: 'McMurdo_Station_US' },
            '192.168.1.1': { ip: '192.168.1.1', path: 'McMurdo_Station_US' }
        };

        const station = stations[target];
        if (station) {
            this.terminal.print(`Connecting to ${station.ip}...`);
            setTimeout(() => {
                this.terminal.print("Connection established.");
                this.currentPath = ['root', station.path];
                this.currentStation = station.path; // Update the current station
                this.terminal.print(`Remote access granted: /root/${station.path}`);
            }, 1000);
        } else {
            this.terminal.print(`Error: Host '${target}' unreachable.`, "error");
        }
    }

    handleTar(args) {
        // tar -xzf [file]
        if (args.length < 2 || args[0] !== '-xzf') {
            this.terminal.print("Usage: tar -xzf [archive_file]");
            return;
        }

        const filename = args[1];
        if (filename.includes('cephalopod_data_backup.tar.gz')) {
            // Check if already extracted
            if (this.flags.vostok_tar_extracted) {
                this.terminal.print("Archive has already been extracted.", "error");
                return;
            }

            this.terminal.print("Extracting archive...");
            this.terminal.print("x cephalopod_evolution.db");
            this.terminal.print("x research_notes.txt");
            this.terminal.print("x sample_images/");
            this.terminal.print("x genetic_data.csv");
            this.terminal.print("Archive extracted successfully.");

            // Set the flag
            this.flags.vostok_tar_extracted = true;
        } else {
            this.terminal.print(`Error: Archive '${filename}' not found or invalid format.`, "error");
        }
    }

    handleMd5sum(args) {
        // md5sum -c [file]
        if (args.length < 2 || args[0] !== '-c') {
            this.terminal.print("Usage: md5sum -c [checksum_file]");
            return;
        }

        const filename = args[1];
        if (filename.includes('checksums.md5')) {
            this.terminal.print("cephalopod_evolution.db: OK");
            this.terminal.print("research_notes.txt: OK");
            this.terminal.print("genetic_data.csv: OK");
            this.terminal.print("All checksums verified.");
        } else {
            this.terminal.print(`Error: File '${filename}' not found.`, "error");
        }
    }

    handleOpenssl(args) {
        // openssl enc -d -aes-256-cbc -in [in] -out [out] -pass pass:[pass]
        // Simplified check for game purposes
        const cmdStr = args.join(' ');
        if (cmdStr.includes('enc -d') &&
            cmdStr.includes('encrypted_journal.dat') &&
            cmdStr.includes('pass:REMEMBER_ALASKA_2142')) {

            this.terminal.print("Decrypting...");
            setTimeout(() => {
                this.terminal.print("Done.");
                // Create the decrypted file in memory/filesystem
                // For now, we just let the user 'cat' the output file if we were fully simulating,
                // but since we don't have full write capability in this simple engine, 
                // we can just print the content or say it's available.
                // Actually, let's just print the content directly as if they 'cat'ed it immediately
                // or better, create a temporary file node if possible.
                // For simplicity, we'll just say it's done and let them read the 'journal.txt' 
                // which we will dynamically add or just print here?
                // The design doc says "> cat journal.txt" afterwards.
                // So we should probably add 'journal.txt' to the current directory in memory.

                const currentDir = this.getCurrentDir();
                if (currentDir) {
                    currentDir['journal.txt'] = {
                        type: 'file',
                        content: `=== DEPUTY COMMANDER O'BRIEN - PERSONAL JOURNAL ===

2157-08-20
Another quiet day at the bottom of the world. Davis is
worried about the increasing tensions up north. I told him
we're probably the safest people on Earth down here.

2157-09-01
Davis received classified briefing from Strategic Command.
He won't tell me details, but he looked shaken. Something
about "contingency preparations."

2157-09-03
The world ended today.

We watched it happen. Concordia's observatory saw the flashes.
Thousands of them. The entire northern hemisphere.

Davis gave me my emergency authorization code: SIERRA-9921
He said if anything happens to him, someone needs to be able
to access the facility.

I asked him what we're supposed to do with nuclear missiles
when there's nothing left to defend.

He didn't answer.

[FINAL ENTRY]`
                    };
                }
            }, 1000);
        } else {
            this.terminal.print("Error: Decryption failed. Check command parameters and passphrase.", "error");
        }
    }

    handlePython3(args) {
        if (args.length === 0) {
            this.terminal.print("Python 3.12.1 (main, Oct 2 2156, 10:00:00) [GCC 14.2.0] on linux");
            this.terminal.print("Type \"help\", \"copyright\", \"credits\" or \"license\" for more information.");
            this.terminal.print(">>> quit()");
            return;
        }

        const scriptPath = args[0];
        const scriptArgs = args.slice(1);

        // McMurdo Scripts
        if (scriptPath.includes('integrity_check.py')) {
            this.terminal.print("=== SYSTEM INTEGRITY CHECK ===");
            this.terminal.print("Scanning core systems...");
            this.terminal.print("Checking file system integrity... OK");
            this.terminal.print("Checking database consistency... OK");
            this.terminal.print("System integrity: NOMINAL");
            this.terminal.print("Recommendation: Proceed with credential reset.");
        }
        else if (scriptPath.includes('credential_reset.py')) {
            if (scriptArgs.includes('--token') && scriptArgs.includes('LAZARUS-EMERGENCY-7A9F3E2B')) {
                this.terminal.print("=== CREDENTIAL RESET UTILITY ===");
                this.terminal.print("Validating token... OK");
                this.terminal.print("Generating new admin credentials...");
                this.terminal.print("Credentials installed successfully.");
                this.terminal.print("SYSTEM NOTIFICATION: McMurdo Station admin access restored.");
                this.flags.mcmurdo_admin_restored = true;
                this.checkPhaseTransition('phase2_to_phase3');
            } else {
                this.terminal.print("Error: Invalid or missing token.");
            }
        }
        // Vostok Scripts
        else if (scriptPath.includes('verify_data.py')) {
            this.terminal.print("=== DATA VERIFICATION ===");
            this.terminal.print("Checking table integrity... OK");
            this.terminal.print("Database verification: COMPLETE");
            this.terminal.print("SYSTEM NOTIFICATION: Vostok Station database restored.");
            this.flags.vostok_database_restored = true;
            this.checkPhaseTransition('phase2_to_phase3');
        }
        // Concordia Scripts
        else if (scriptPath.includes('list_corrupted.py')) {
            this.terminal.print("=== SCANNING FOR CORRUPTED FILES ===");
            this.terminal.print("CORRUPTED FILES FOUND: 3");
            this.terminal.print("1. /observatory/final_observations_2157_09_03.txt");
            this.terminal.print("2. /public/final_transmission.txt");
            this.terminal.print("3. /personnel/beaumont_last_notes.txt");
        }
        else if (scriptPath.includes('repair_file.py')) {
            const filename = scriptArgs[0];
            if (filename) {
                this.terminal.print(`=== FILE REPAIR UTILITY ===`);
                this.terminal.print(`Target: ${filename}`);
                this.terminal.print("Analyzing file structure... DONE");
                this.terminal.print("Checking redundancy blocks... FOUND");
                this.terminal.print("Reconstructing missing data... DONE");
                this.terminal.print("Verifying checksums... OK");
                this.terminal.print("File repaired successfully.");

                // Set repair flags based on filename
                if (filename.includes('final_observations')) {
                    this.flags.concordia_file1_repaired = true;
                } else if (filename.includes('final_transmission')) {
                    this.flags.concordia_file2_repaired = true;
                } else if (filename.includes('beaumont_last_notes')) {
                    this.flags.concordia_file3_repaired = true;
                }
            } else {
                this.terminal.print("Usage: python3 repair_file.py [filename]");
            }
        }
        else if (scriptPath.includes('verify_integrity.py')) {
            // Check if all files are repaired
            if (this.flags.concordia_file1_repaired &&
                this.flags.concordia_file2_repaired &&
                this.flags.concordia_file3_repaired) {
                this.terminal.print("=== INTEGRITY VERIFICATION ===");
                this.terminal.print("Verifying all system files...");
                this.terminal.print("Checking file system... 2,847 files scanned");
                this.terminal.print("Checking checksums... ALL VALID");
                this.terminal.print("Checking readability... ALL READABLE");
                this.terminal.print("System integrity: 100%");
                this.terminal.print("SYSTEM NOTIFICATION: Concordia Station backup system fully restored.");
                this.flags.concordia_backup_repaired = true;
                this.checkPhaseTransition('phase2_to_phase3');
            } else {
                this.terminal.print("=== INTEGRITY VERIFICATION ===");
                this.terminal.print("Verifying all system files...");
                this.terminal.print("ERROR: Corrupted files still detected.", "error");
                this.terminal.print("Please repair all corrupted files before running verification.", "error");
                this.terminal.print("Run: python3 list_corrupted.py to see remaining files.");
            }
        }
        else {
            this.terminal.print(`Error: Script '${scriptPath}' not found or execution failed.`, "error");
        }
    }

    handleSqlite3(args) {
        // sqlite3 [db] < [script]
        // In our simplified parser, '<' might be an arg or split.
        // args might be: ['path/to/db', '<', 'path/to/sql']

        if (args.includes('<') && args.includes('restoration_script.sql')) {
            this.terminal.print("Restoring database schema...");
            this.terminal.print("Importing neural_mapping table... 14,523 records");
            this.terminal.print("Importing behavioral_data table... 8,991 records");
            this.terminal.print("Importing genetic_sequences table... 3,456 records");
            this.terminal.print("Database restored successfully.");
        } else {
            this.terminal.print("Usage: sqlite3 [database] < [script]");
        }
    }

    handleSudo(args) {
        // sudo authenticate --codes [c1] [c2] [c3]
        if (args[0] === 'authenticate' && args[1] === '--codes') {
            const codes = args.slice(2);
            const required = ['OMEGA-7734', 'SIERRA-9921', 'TANGO-4456'];

            // Check if all required codes are present (order doesn't strictly matter but let's check presence)
            const allPresent = required.every(code => codes.includes(code));

            if (allPresent) {
                this.terminal.print("=== MILITARY FACILITY AUTHENTICATION ===");
                this.terminal.print("Validating authorization codes...");
                this.terminal.print("Triple authorization confirmed.");
                this.terminal.print("Security clearance: GRANTED");
                this.terminal.print("SYSTEM NOTIFICATION: Amundsen-Scott Station military access restored.");
                this.flags.amundsen_security_cleared = true;
                this.checkPhaseTransition('phase2_to_phase3');
            } else {
                this.terminal.print("Error: Invalid authorization codes. Access DENIED.", "error");
            }
        } else {
            this.terminal.print("Usage: sudo authenticate --codes [code1] [code2] [code3]");
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal();
    window.gameEngine = new GameEngine(term);
    window.gameEngine.init();
});
