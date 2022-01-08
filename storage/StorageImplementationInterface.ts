export interface StorageImplementationInterface{
    get(key: string);
    set(key: string, value: string);
    remove(key: string);
}