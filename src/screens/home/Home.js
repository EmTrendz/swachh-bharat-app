
import React from "react";
import { View, Text, Button , StyleSheet} from "react-native";
//import Echarts from 'native-echarts';
import server from "../../utils/server";
//import EmtChart from "../../widgets/chart/EmtChart";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
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
  render() {
    const { navigate } = this.props.navigation;
    const option = this.state.chartOption;

    return (
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
    );
  }
}