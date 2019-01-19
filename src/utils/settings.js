var _settings = {};

var Settings = function () {
    getItem = function (key, defaultValue) {
        console.log('getting from Settings ', key);
        return _settings[key];
    }
    setItem = function (key, value) {
        console.log('Setting in Settings ', key, value);
        _settings[key] = value;
    }
    return {
        getItem: getItem,
        setItem: setItem,
        getRoutes: (data) => {
            return getItem('routes');
        },
        getHomeRoute: () => {
            return getItem('routes').find(item => item.href === '/');
        },
        setRoutes: (data) => {
            setItem('routes', data);
        },
    }
}
export default Settings();