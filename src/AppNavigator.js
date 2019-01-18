
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  StatusBar,
  DrawerLayoutAndroid,
} from 'react-native';
import DrawerContent from './Navigation/DrawerContent';
import Toolbar from './Navigation/Toolbar';
import AppNavigation from './Navigation/AppNavigation';
import {
  createStackNavigator,
  createAppContainer,
  NavigationActions
} from 'react-navigation';
import { bgStatusBar, bgDrawer } from './global.styles';
import Loader from './components/loader';
import { API } from './utils/AppConstants';
import settings from './utils/settings';
import server from './utils/server';
import routes from './Navigation/routes';

/* getDrawerWidth       Default drawer width is screen width - header width
* https://material.io/guidelines/patterns/navigation-drawer.html
*/
const getDrawerWidth = () => Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64);

export default class AppNavigator extends Component {
  constructor() {
    super();

    this.drawer = React.createRef();
    this.navigator = React.createRef();
    this.state = {
      routeStack: [],
      routesLoaded: false
    };
  }

  openDrawer = () => {
    this.drawer.current.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.current.closeDrawer();
  };

  stackHasRoute = route => this.state.routeStack.find(item => item.routeKey === route);

  navigateToRoute = (routeKey, routeConfig) => {
    if (routeKey === this.state.routeStack[this.state.routeStack.length - 1]) {
      this.closeDrawer();
      return;
    }

    if (this.stackHasRoute(routeKey)) {
      this.setState({
        routeStack: this.state.routeStack.slice(0, this.state.routeStack.indexOf(routeKey))
          .concat([{ routeKey: routeKey, routeConfig: routeConfig }]),
      });
      this.navigator.current && this.navigator.current.dispatch(
        NavigationActions.navigate({ routeName: 'layout', params: routeConfig, key: routeConfig.key })
      );
      this.closeDrawer();
      return;
    }

    this.navigator.current && this.navigator.current.dispatch(
      NavigationActions.navigate({ routeName: 'layout', params: routeConfig, key: routeConfig.key })
    ) && this.setState({
      routeStack: this.state.routeStack.concat([{ routeKey: routeKey, routeConfig: routeConfig }]),
    }, () => this.closeDrawer());
  };

  goBack = () => {
    this.navigator.current && this.navigator.current.dispatch(
      NavigationActions.back()
    ) && this.setState({
      routeStack: this.state.routeStack.slice(0, this.state.routeStack.length - 1),
    });
  };

  componentDidMount() {
    let me = this;
    server.getData(API.ROUTES).then((_routes) => {
      settings.setItem('routes', _routes.data);
      me.setState({
        routeStack:
          [{ routeKey: _routes.data[0].key, routeConfig: _routes.data[0], key: _routes.data[0].key }], routesLoaded: true
      });
    });
  }

  render() {
    const { routeStack, routesLoaded } = this.state;
    return routesLoaded && routeStack.length > 0 ? (
      <DrawerLayoutAndroid
        drawerWidth={getDrawerWidth()}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={
          () => <DrawerContent
            activeRouteKey={routeStack[routeStack.length - 1]}
            navigateTo={this.navigateToRoute} />
        }
        drawerBackgroundColor={bgDrawer}
        ref={this.drawer}
      >
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor={bgStatusBar}
            animated
          />
          <Toolbar
            showMenu={this.openDrawer}
            goBack={this.goBack}
            navigateTo={this.navigateToRoute}
            actualRoute={routeStack[routeStack.length - 1]}
          />
          <AppNavigation ref={this.navigator} />
        </View>
      </DrawerLayoutAndroid>
    ) : <Loader />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
