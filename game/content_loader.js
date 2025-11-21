/**
 * ContentLoader - Utility for loading external content files for the game's virtual file system
 * This allows us to separate content text from the story_data.js structure definition
 */
class ContentLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Load content from a file path
     * @param {string} path - Path to the content file
     * @returns {Promise<string>} The content text
     */
    async loadContent(path) {
        // Return cached content if available
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        // Return existing loading promise if in progress
        if (this.loadingPromises.has(path)) {
            return this.loadingPromises.get(path);
        }

        // Start loading and cache the promise
        const loadPromise = (async () => {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}: ${response.statusText}`);
                }
                const content = await response.text();
                this.cache.set(path, content);
                return content;
            } catch (error) {
                console.error(`Error loading content from ${path}:`, error);
                return `[ERROR: Could not load content from ${path}]`;
            } finally {
                this.loadingPromises.delete(path);
            }
        })();

        this.loadingPromises.set(path, loadPromise);
        return loadPromise;
    }

    /**
     * Initialize the file system by loading all content files
     * Recursively traverses the file system tree and replaces contentPath with content
     * @param {Object} storyData - The STORY_DATA object
     * @returns {Promise<Object>} The same storyData object with content loaded
     */
    async initializeFileSystem(storyData) {
        console.log('ContentLoader: Initializing file system...');
        const startTime = performance.now();

        await this._traverseAndLoad(storyData.root);

        const endTime = performance.now();
        const loadTime = (endTime - startTime).toFixed(2);
        const fileCount = this.cache.size;
        console.log(`ContentLoader: Loaded ${fileCount} files in ${loadTime}ms`);

        return storyData;
    }

    /**
     * Recursively traverse the file system tree and load content
     * @param {Object} node - Current node in the file system tree
     * @private
     */
    async _traverseAndLoad(node) {
        if (node.type === 'file' && node.contentPath) {
            // Load the content and replace contentPath with content
            node.content = await this.loadContent(node.contentPath);
            // Keep contentPath for reference, but content is what the game will use
        } else if (node.type === 'dir' && node.children) {
            // Recursively process all children
            const childPromises = Object.values(node.children).map(child =>
                this._traverseAndLoad(child)
            );
            await Promise.all(childPromises);
        }
    }

    /**
     * Get cache statistics
     * @returns {Object} Cache statistics
     */
    getStats() {
        return {
            cachedFiles: this.cache.size,
            loadingInProgress: this.loadingPromises.size,
            cacheKeys: Array.from(this.cache.keys())
        };
    }
}
