import SyncStorage from 'sync-storage';


var Storage = function () {
    
    return {
        getItem(key) {
            console.log('getting from storage ', SyncStorage.get(key))
            return SyncStorage.get(key);
        },
        setItem(key, value) {
            console.log('Setting in storage ', key, value)
            SyncStorage.set(key, value);
        }
    }
}

    console.log('Setting AsyncStorage is ready!', data);
    const data = SyncStorage.init();
    console.log('AsyncStorage is ready!', data);
export default Storage();