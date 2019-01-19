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
import settings from '../../utils/settings';
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { components: [], name: 'no name' };
    }

    componentDidMount() {
        let me = this, routeConfig;
        const { state } = this.props.navigation;
        if (!state.params) {
            routeConfig = settings.getHomeRoute();
        } else {
            routeConfig = state.params;
        }
        server.getData(routeConfig.components).then((_components) => {
            me.setState({
                components: _components.data,
                name: routeConfig.text,
                queryString: routeConfig.queryString
            });
        });
    }

    render() {
        const { name, components, queryString } = this.state;
        return (
            <ScrollView contentContainerStyle={styles.view}>
                 {
                    this.renderWidgets(components, queryString)
                }
                <Text style={styles.header1}></Text>
               
                <Text style={styles.photo}>
                    
                </Text>
                <Text style={styles.text}>
                    
                </Text>
            </ScrollView>
        )
    }

    renderWidgets(components, queryString) {
        return components.map((component) => {
            let Widget = widgets[component.clientWidget];
            return Widget ? <Widget
                key={component.key}
                configuration={component}
                queryString={queryString}
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
