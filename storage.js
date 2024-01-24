```javascript
const storage = {
    saveComment: function (url, comment) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(url, (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                let comments = items[url] || [];
                comments.push(comment);
                let itemsToSave = {};
                itemsToSave[url] = comments;
                chrome.storage.sync.set(itemsToSave, () => {
                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }
                    resolve();
                });
            });
        });
    },

    loadComments: function (url) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(url, (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(items[url] || []);
            });
        });
    }
};

export default storage;
```