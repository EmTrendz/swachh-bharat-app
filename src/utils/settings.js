import storage from "./storage";
import RNRestart from 'react-native-restart'; // Import package from node modules
import server from "./server";

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
        getUser: () => {
            return getItem('user');
        },
        setUser: (data) => {
            setItem('user', data);
        },
        logoutUser: () => {
            setItem('user', undefined);
            storage.setUserToken("").then(() => {
                server.postData('/auth/local/signout').then(function (res) {
                    // document.cookie.split(";").forEach(function (c) {
                    //     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + 'Thu, 01-Jan-1970 00:00:01 GMT' + ";path=/");
                    // });
                    //setLanguage("en_US", "/");
                    //setTheme("");
                    RNRestart.Restart();
                });

            })
        },
        loginUser: (user) => {
            storage.setUserToken(user.emt_key)
                .then(() => {
                    RNRestart.Restart();
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
export default Settings();