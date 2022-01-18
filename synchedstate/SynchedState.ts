import {action, createStore, useStoreActions, useStoreState} from "easy-peasy";
import {SynchedVariableInterface} from "../storage/SynchedVariableInterface";

export function useSynchedState(storageKey): [value: string, setValue: (value) => {}] {
    const value = useStoreState((state) => state[storageKey].value);
    const setValue = useStoreActions((actions) => actions[storageKey].setValue);
    return [
        value,
        setValue
    ]
}

export default class SynchedState {

    private static store;
    private static globalSynchedStoreModels: {[key: string] : SynchedVariableInterface} = {};

    static getContextStore(){
        return SynchedState.store;
    }

    private static registerSynchedState(key: string, defaultValue?: string, beforeHook?, afterHook?, override: boolean = false){
        let additionalModel = SynchedState.globalSynchedStoreModels[key];
        if(!!additionalModel && !override){
            return new Error("Additional variable for storage already exists for that key: "+key);
        }
        SynchedState.globalSynchedStoreModels[key] = new SynchedVariableInterface(key, defaultValue, beforeHook, afterHook);
    }

    static registerSynchedStates(listOfKeys: string[] | string, defaultValue?: string, beforeHook?, afterHook?, override: boolean = false){
        if (typeof listOfKeys === 'string'){
            listOfKeys = [listOfKeys];
        }

        for(let i=0; i<listOfKeys.length; i++){
            let key = listOfKeys[i];
            SynchedState.registerSynchedState(key, defaultValue, beforeHook, afterHook, override);
        }
    }

    private static handleAction(storageKey, state, payload, aditionalStoreModel: SynchedVariableInterface){
        let beforeHook = aditionalStoreModel.beforeHook;
        let afterHook = aditionalStoreModel.afterHook;
        let cancel = false;
        if(!!beforeHook){
            cancel = !beforeHook(storageKey, state, payload);
        }
        if(!cancel){
            state.value = payload;
            if(!!afterHook){
                afterHook(storageKey, state, payload);
            }
        }
    }

    static initContextStores(){
        let model = {};

        let additionalKeys = Object.keys(SynchedState.globalSynchedStoreModels);
        for(let i=0; i<additionalKeys.length; i++){
            let key = additionalKeys[i];
            let aditionalStoreModel: SynchedVariableInterface = SynchedState.globalSynchedStoreModels[key];
            let storageKey = aditionalStoreModel.key;
            model[storageKey] = {
                value: aditionalStoreModel.defaultValue,
                setValue: action((state, payload) => {
                    SynchedState.handleAction(storageKey, state, payload, aditionalStoreModel);
                })
            }
        }

        const store = createStore(
            model
        );
        SynchedState.store = store;
    }
}