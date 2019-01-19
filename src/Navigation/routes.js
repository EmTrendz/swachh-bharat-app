import HomeScreen from '../screens/home/Home';
import AboutScreen from '../screens/about/About';
import CreditsScreen from '../screens/about/Credits';
import Layout from '../screens/layout';

/* Icon key is optional. It must be of type string and its value should match a valid provider icon
  name.
  To omit the icon just pass null on its value.
*/
export default [
  {name: 'layout', screen: Layout, icon: 'home'},
  {name: 'About', screen: AboutScreen, icon: 'information-outline'},
  {name: 'Credits', screen: CreditsScreen, icon: 'account-circle'},
];
