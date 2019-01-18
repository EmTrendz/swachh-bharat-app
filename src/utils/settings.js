var _settings = {};

var Settings = function () {
    return {
        getItem(key, defaultValue) {
            console.log('getting from Settings ',key);
            return _settings[key];
        },
        setItem(key, value) {
            console.log('Setting in Settings ', key, value);
            _settings[key] = value;
        }
    }
}
export default Settings();