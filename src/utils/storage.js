import SyncStorage from 'sync-storage';


var Storage = function () {
    retrieveItem = (key) => {
        console.log('getting from storage ', SyncStorage.get(key))
        return SyncStorage.get(key);
    }
    storeItem = (key, value) => {
        console.log('Setting in storage ', key, value)
        return SyncStorage.set(key, value);
    }
    return {
        init: async () => {
            console.log('Setting AsyncStorage is ready!', data);
            const data = await SyncStorage.init();
            console.log('AsyncStorage is ready!', data);
        },
        getUserToken: () => {
            return retrieveItem('token');
        },
        setUserToken: (token) => {
            return storeItem('token', token);
        }

    }
}

export default Storage();