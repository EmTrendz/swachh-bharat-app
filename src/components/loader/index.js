
import React from "react";
import { View, Text } from "react-native";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { from } = this.props;
    return (
      <View>
        <Text>Loading.... </Text>
        <Text>{from}</Text>
      </View>
    );
  }
}