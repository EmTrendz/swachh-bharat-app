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
import widgets from '../../widgets';
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { components: [], name: 'no name' };
    }

    componentDidMount() {
        let me = this;
        const { state } = this.props.navigation;

        server.getData(state.params.components).then((_components) => {
            me.setState({
                components: _components.data,
                name: state.params.text
            });
        });
    }

    render() {
        const { name, components } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.view}>
                <Text style={styles.header1}>{name}</Text>
                {
                    this.renderWidgets(components)
                }
                <Text style={styles.photo}>
                    Pigeon Point Lighthouse, Pescadero, California
                </Text>
                <Text style={styles.text}>
                    Know the most beautiful lighthouses of the world.
                </Text>
            </ScrollView>
        )
    }

    renderWidgets(components) {
        return components.map((component) => {
            let Widget = widgets[component.clientWidget];
            return Widget ? <Widget
                key={component.key}
                configuration={component}
            ></Widget> :
                <Text key={component.key} style={styles.photo}>
                    Widget Not Available
                </Text>;
        });
    }
}

const styles = StyleSheet.create({
    view: {
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
