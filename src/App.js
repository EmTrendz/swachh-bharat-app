import AppNavigator from './AppNavigator';
import React from "react";
import Loader from './components/loader';
import server from "./utils/server";
import { BRAND } from './utils/AppConstants';
import storage from './utils/storage';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        let me = this;
        me.state = {
            initialized: false
        };
    }
    componentDidMount() {
        let me = this;
        storage.setItem('cookie', '');
        server.getData(`/${BRAND}/ping`).then((brand) => {
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
                            initialized: true
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
        let { initialized } = this.state;
        return initialized ? <AppNavigator /> : <Loader from={"App"} />;
    }
}