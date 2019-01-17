import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/home/Home';
import ProfileScreen from './screens/profile/Profile';

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
},
{
  initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);