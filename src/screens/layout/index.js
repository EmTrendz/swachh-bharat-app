import { NavigationActions } from 'react-navigation';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import server from '../../utils/server';
import { API } from '../../utils/AppConstants';
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 'no name' };
    }

    componentDidMount() {
        let me = this;

        server.getData(API.ROUTES).then((_routes) => {

            const { state } = this.props.navigation;
            // console.log(state.params);
            // console.log('state.params');
            // console.log(state.params.href);

            me.setState({
                name: state.params.text
            });
        });
    }

    render() {
        const { name } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.view}>
                <Text style={styles.header1}>{name}</Text>

                <Text style={styles.photo}>
                    Pigeon Point Lighthouse, Pescadero, California
                </Text>
                <Text style={styles.text}>
                    Know the most beautiful lighthouses of the world.
                </Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        padding: 20
    },
    img: {
        width: 300,
        height: 300,
        marginBottom: 10
    },
    header1: {
        fontSize: 24,
        marginBottom: 10
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 10
    },
    photo: {
        fontStyle: 'italic',
        marginBottom: 15
    }
});

export default Layout;
