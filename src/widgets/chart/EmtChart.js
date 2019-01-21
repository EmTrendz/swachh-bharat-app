
import React from "react";
import { View, Text, StyleSheet, } from "react-native";
//import Echarts from 'native-echarts';
import Echarts from 'react-native-wk-echarts';

import server from "../../utils/server";
import requestBuilder from "../../utils/requestBuilder";

class EmtChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOption: undefined,
      legends: []
    }
  }
  componentDidMount() {
    let me = this;
    const { configuration, queryString } = this.props;
    //console.log(queryString, configuration.params);

    if (configuration && configuration.params && configuration.params.api) {
      //console.log(configuration.params);
      var reqParams = requestBuilder.buildParams(queryString, configuration)
      //console.log(reqParams);
      // Make a request for a user with a given ID
      server.postData(configuration.params.api, reqParams)
        .then(function (response) {
          // handle success
          //  console.log('From EmtChart widget');
          //  console.log(response);
          me.setState({
            chartOption: response.data.chartOptions,
            legends: response.data.chartOptions && response.data.chartOptions.series ? response.data.chartOptions.series[0].data : []
          });
        })
        .catch(function (error) {
          // handle error
          //console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }
  render() {
    const option = this.state.chartOption || this.props.chartOption || {};
    const legends = this.state.legends
    const { configuration } = this.props;
    console.log(option);
    return configuration ? (
      <View style={styles.view}>
        <Text style={styles.header1}>{configuration.title}</Text>
        <Echarts option={option} height={300} />
        {legends && legends.length > 0 ? (<View style={{ flex: 1, flexDirection: 'row' }} >{legends.map(legend => {
          return <View style={{ flex: 1 / legends.length, borderWidth: 1, height: 50, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center' }}>
            <Text>{legend.name}</Text>
            <Text>{legend.value}</Text>
          </View>
        })}
        </View>) : null
        }




      </View>
    ) : <View height={300}>
        <Text>Issue in configuration</Text>
      </View>;
  }
}
const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  header1: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    fontSize: 24,
    padding: 2,
    fontWeight: 'bold',
  },
});
export default EmtChart;