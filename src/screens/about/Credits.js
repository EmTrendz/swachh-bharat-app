import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Linking,
  StyleSheet
} from 'react-native';

const Credits = () => (
  <ScrollView contentContainerStyle={styles.view}>
      <Text style={styles.h1}>Credits</Text>
      <Text style={[styles.text, styles.p]}>EmTrendz
        <Text onPress={() =>
          Linking.openURL('https://github.com/EmTrendz')}
          style={styles.linkCredits}
        >
          EmTrendz </Text>.
      </Text>
      <Text style={[styles.text, styles.p]}>CodeRower Software Pvt. Ltd. <Text onPress={() =>
        Linking.openURL('https://github.com/crspl')}
        style={styles.linkCredits}
      >
        CRSPL</Text>.
      </Text>
    </ScrollView>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
    padding: 20
  },
  h1: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10
  },
  p: {
    textAlign: 'left',
    marginBottom: 20
  },
  linkCredits: {
    fontStyle: 'italic',
    color: '#2962FF'
  }
});

export default Credits;
