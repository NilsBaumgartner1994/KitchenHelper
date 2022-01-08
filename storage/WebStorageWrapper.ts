import {StorageImplementationInterface} from "./StorageImplementationInterface";

export class WebStorageWrapper implements StorageImplementationInterface/** extends Storage */{
    private webstorage: any;

    constructor(webstorage: Storage) {
        this.webstorage = webstorage;
    }

    get(key: string) {
        return this.webstorage.getItem(key)
    }

    remove(key: string) {
        return this.webstorage.removeItem(key)
    }

    set(key: string, value: string) {
        return this.webstorage.setItem(key, value)
    }


}