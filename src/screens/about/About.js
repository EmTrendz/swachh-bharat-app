import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Linking,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = () => (
  <ScrollView contentContainerStyle={styles.view}>
    <Text style={styles.h1}>About</Text>
    <Text style={[styles.text, styles.p]}>In 2014, Prime Minister Narendra Modi launched the Swachh Bharat (Clean India) campaign. Swachh Bharat is the largest cleanliness drive in the history of India, and one of it aims to eradicate open defecation. Prime Minister said people should neither litter, nor let others litter. He gave the mantra of ‘Na gandagi karenge, Na karne denge’. Prime Minister Modi urged the corporate sector to get involved, take initatives and provide solution to acheive "Swachh Bharat Abhiyan."

Ministry of Urban Development, GOI has selected Bharat Sanchar Nigam Limited (BSNL) as technology partner for providing ICT platform(  <Text onPress={() =>
        Linking.openURL('https://emtrendz.com/')}
        style={styles.linkCredits}
      >EmTrendz</Text> ) to effectively monitor the cleanliness of Community and Public toilets. In this regard, MOU was signed between the two departments on 17th May 2017. Main objective of this technology platform is to monitor cleanliness of Community and Public toilets under ULBs.

Additional activities include:

Monitoring of cleanliness of toilets on a click
MIS for cleanliness monitoring
Real time SMS Delivery for unmaintained and dirty doilets
Transparency in civic administration.

SBM FPS is a world class solution developed by BSNL for meeting the above objectives. It comprises of Web and Mobile applications integrated with ICT Devices to provide unmatched solution to ULBs. This platform effectively addresses citizen concerns as well.
</Text>
    <Text style={[styles.text, styles.p]}>You can use this project and can be ordered with customizations according to your needs.</Text>
    <Text style={[styles.text, styles.p]}>Thank you.</Text>
    <Text style={styles.signature}>EmTrendz</Text>
    <Text style={styles.position}>A product of CodeRower Software Pvt. Ltd.</Text>
    <View style={styles.social}>
      <Icon name="logo-linkedin" size={30} color="#2962FF" style={{ marginRight: 10 }} />
      <Text onPress={() =>
        Linking.openURL('https://www.linkedin.com/in/EmTrendz')}
        style={styles.link}
      >
        www.linkedin.com/in/EmTrendz
        </Text>
    </View>
    <View style={styles.social}>
      <Icon name="logo-github" size={30} color="#2962FF" style={{ marginRight: 10 }} />
      <Text onPress={() =>
        Linking.openURL('https://github.com/EmTrendz')}
        style={styles.link}
      >
        https://github.com/EmTrendz
        </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
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
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  signature: {
    fontSize: 16,
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#2962FF'
  }
});

export default About;
