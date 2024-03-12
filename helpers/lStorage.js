export const lStorageGet = (keyName) => {
    const value = localStorage.getItem(keyName);
    return JSON.parse(value);
}

export const lStorageSet = async (keyName, keyValue) => {
    localStorage.setItem(keyName, JSON.stringify(keyValue));
}

export const lStorageRemove = async (keyName) => {
    localStorage.removeItem(keyName);
}

export const lStorageClear = async (keyName) => {
    localStorage.clear();
}