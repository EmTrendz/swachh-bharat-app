
import React from "react";
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator
} from "react-native";
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

    return (
      <ScrollView contentContainerStyle={styles.view}>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        <View style={{ opacity: 0 }}>
          <EmtChart chartOption={option} configuration={{ title: 'Loading....' }}></EmtChart>
          <EmtChart chartOption={option} configuration={{ title: 'Loading....' }}></EmtChart>
          <EmtChart chartOption={option} configuration={{ title: 'Loading....' }}></EmtChart>
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
export default Loader;