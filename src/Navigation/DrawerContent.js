import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  bgDrawerHeader,
  drawerLogoColor,
  headerColor,
  drawerActiveItemColor,
  drawerInactiveItemColor,
  bgDrawerInactiveItem,
  bgDrawerActiveItem,
  drawerHeaderColor,
} from '../global.styles';
import routes from './routes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import settings from '../utils/settings';

const DrawerContent = ({ navigateTo, activeRouteKey }) => (
  <ScrollView>
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <Icon name="lighthouse" size={50} color={drawerLogoColor} />
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.drawerTitle}>EmTrendz</Text>
        <Text style={styles.drawerEmail}>Swachh Bharat</Text>
      </View>
    </View>
    {settings.getItem('routes').map(route => {
      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => navigateTo("layout", route)}
          style={activeRouteKey === route.key ? [styles.drawerItem, styles.activeDrawerItem] : styles.drawerItem}
        >
          {route.iconn && (
            <View
              style={styles.drawerItemLogo}
            >
              <Icon
                name={route.icon}
                size={30}
                color={activeRouteKey === route.key ? "#fff" : "#000"}
              />
            </View>
          )}
          <Text style={activeRouteKey === route.key ? { color: "#fff" } : { color: "#000" }}>{route.text}</Text>
        </TouchableOpacity>
      )
    })
    }
  </ScrollView>
);

DrawerContent.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  activeRouteName: PropTypes.string,
};

DrawerContent.defaultProps = {
  activeRouteName: '',
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    paddingTop: 40, // 24dp (Space for the translucent StatusBar) plus 16dp Android Header paddingTop
    paddingLeft: 16,
    height: 170,
    backgroundColor: bgDrawerHeader,
  },
  headerLogo: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  subTitle: {
    height: 56,
    paddingTop: 8,
  },
  drawerTitle: {
    color: drawerHeaderColor,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
  },
  drawerEmail: {
    color: drawerHeaderColor,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
  },
  activeDrawerItem: {
    backgroundColor: bgDrawerActiveItem,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: bgDrawerInactiveItem,
    color: drawerInactiveItemColor,
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  drawerItemLogo: {
    paddingRight: 16,
  },
});

export default DrawerContent;
