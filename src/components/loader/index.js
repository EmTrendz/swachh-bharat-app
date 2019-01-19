
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EmtChart from "../../widgets/chart/EmtChart";

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { from } = this.props;
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      series: [
        {
          name: 'Loading..',
          type: 'pie',
          radius: ['1%', '1%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'Loading' }]
        }
      ]
    };
    ;
    return (
      <ScrollView contentContainerStyle={styles.view}>
        <View>
          {/* <Text>Loading....</Text>
          <Text>{from}</Text> */}
          <EmtChart chartOption={option} configuration={{ title: 'Loading....' }}></EmtChart>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    padding: 20
  },
});
export default Loader;