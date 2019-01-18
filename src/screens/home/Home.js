
import React from "react";
import { View, Text, Button } from "react-native";
import Echarts from 'native-echarts';
import server from "../../utils/server";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  constructor(props) {
    super(props);
    this.state = {
      chartOption: {}
   }
    //   this.loadData();
  }
  componentDidMount() {
    console.log('Hello');
    debugger;
    let me = this;
    // Make a request for a user with a given ID
    server.postData('/api/execute-widgets/rail/emt_survey_responses/stats_by_filter',
      {
        brand: 'rail',
        query: '?&respondedon={"startDate":"1547679600000","endDate":"1547765999999"}',
        questionId: 'toilet_clean',
        surveyId: 'sbm',
        type: 'pie',
        widgetUID: 'rail__emt_today_response_statistics'
      }
    )
      .then(function (response) {
        // handle success
        console.log(response);
        me.setState({chartOption:response.data.chartOptions});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const option = this.state.chartOption;

    return (
      <View>
        <Echarts option={option} height={300} />

        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', { name: 'Jane' })}
        />
      </View>
    );
  }
}