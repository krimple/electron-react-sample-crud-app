module.exports = {
    contextBridge: {
        exposeInMainWorld: jest.fn(),
        exposeInIsolatedWorld: jest.fn()
    }
};
