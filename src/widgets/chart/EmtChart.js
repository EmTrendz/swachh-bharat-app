
import React from "react";
import { View, Text, Button } from "react-native";
import Echarts from 'native-echarts';
import server from "../../utils/server";

export default class EmtChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOption: {}
    }
  }
  componentDidMount() {
    let me = this;
    const { configuration } = this.props;

    if (configuration && configuration.params && configuration.params.api) {
      // Make a request for a user with a given ID
      server.postData(configuration.params.api,
        {
          brand: 'rail',
          query: '?&respondedon={"startDate":1547334000000,"endDate":1547938799999}',
          questionId: 'toilet_clean',
          surveyId: 'sbm',
          type: "daily_stats_by_filter",
          widgetUID: "rail__emt_daily_response_statistics"
        }
      )
        .then(function (response) {
          // handle success
          console.log('From EmtChart widget');
          console.log(response);
          me.setState({ chartOption: response.data.chartOptions });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }
  reload() {

  }
  render() {
    const option = this.state.chartOption;
    const { configuration } = this.props;
    return configuration ? (
      <View height={300}>
        <Text>{configuration.title}</Text>
        <Echarts option={option} height={300} />
      </View>
    ) : <View height={300}>
        <Text>Issue in configuration</Text>
      </View>;
  }
}