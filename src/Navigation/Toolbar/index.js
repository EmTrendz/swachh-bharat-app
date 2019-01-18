import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bgHeader } from "../../global.styles";

class Toolbar extends React.Component {
  onActionSelected = (position) => {
    const { navigateTo } = this.props;

    if (position === 0) {
      navigateTo('About');
    } else if (position === 1) {
      navigateTo('Credits');
    }
  };

  render() {
    const { showMenu, goBack, actualRoute } = this.props;
    debugger;
    console.log('######################');
    console.log(actualRoute);
    
    return (
      <View style={styles.header}>
        <Icon.ToolbarAndroid
          navIconName={actualRoute.routeKey === 'Home' ? 'menu' : 'arrow-left'}
          titleColor="#fff"
          title={actualRoute.routeKey}
          onIconClicked={actualRoute.routeKey === 'Home' ? showMenu : goBack}
          overflowIconName="dots-vertical"
          style={{ height: 56 }}
          actions={[
            { title: 'About', show: 'never', iconName: 'information-outline' },
            { title: 'Credits', show: 'never', iconName: 'account-circle' },
          ]}
          onActionSelected={this.onActionSelected}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: bgHeader,
    height: 80, // 56dp AppBar height plus 24dp correction for the StatusBar translucent
    paddingTop: 24, // StatusBar's height
  },
});

export default Toolbar;