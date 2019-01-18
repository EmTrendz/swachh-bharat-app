import * as React from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import routes from './routes';

const routeConfig = {};

routes.map(route => {
  routeConfig[route.name] = route.screen;
});
//https://emt-api.emtrendz.com/api/routes/rail/menu
const MainStack = createStackNavigator(
    {
      ...routeConfig,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    },
);

export default createAppContainer(MainStack);