const version = 0;
import AppNavigator from './AppNavigator';
import React from "react";
import Loader from './components/loader';
import server from "./utils/server";
import { BRAND, CHANNEL } from './utils/AppConstants';
import storage from './utils/storage';
import {
    View,
    Alert,
    Linking
} from 'react-native';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        let me = this;
        me.state = {
            initialized: false,
            updated: true,
        };
    }
    componentDidMount() {
        let me = this;
        storage.setItem('cookie', '');
        server.getData(`/${CHANNEL}/${BRAND}/ping`).then((brand) => {
            //setTheme(brand.data.theme);
            console.log(brand);
            // temporary hack 
            storage.setItem('cookie', 'pong=s%3A6JbV0XgJ9BFl9j4IUBklY_4mqJwS2wVd.cZ%2Btp4x08jfTYCFxakASrUxyXQWqIjZqmAvrA5n2Nz4');

            server.getData(`/api/user/${BRAND}/me`)
                .then((usr) => {
                    //setTheme(usr.data.theme);
                    console.log(usr);


                    if (brand.message !== "Network Error") {
                        console.log('Set State Init : ');
                        me.setState({
                            initialized: true,
                            updated: version > brand.data.version
                        });
                    } else {
                        // show loading screen

                    }
                })
                .catch((ex) => {
                    console.log(ex);
                });
        });
    }
    render() {
        let { initialized, updated } = this.state;
        let component = initialized ? <AppNavigator /> : <Loader from={"App"} />;
        if (!updated) {
            component = <View></View>;
            // Works on both iOS and Android
            Alert.alert(
                'Update available',
                'New version of application is available, please update to use this application.',
                [
                    {
                        text: 'Update', onPress: () => {
                            Linking.openURL("market://details?id=com.emtrendz.swachh_bharat").catch(err => console.error('An error occurred', err));
                        }
                    },
                ],
                { cancelable: false }
            )
        }
        return component;
    }
}