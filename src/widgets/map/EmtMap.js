import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import server from '../../utils/server';
import async from 'async-es';
import requestBuilder from '../../utils/requestBuilder';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class EmtMap extends Component {
  map = null;

  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      forceRefresh: 1
    },
    ready: false,
    filteredMarkers: []
  };

  setRegion(region) {
    if (this.state.ready) {
      //alert('dffdfdf');
      //setTimeout(() => this.map.mapview.animateToRegion(region), 10);
      this.setState({ region: region, forceRefresh: Math.floor(Math.random() * 100) });
    }

    //this.setState({ region });
  }

  constructor(props) {
    super(props);
    this.state = { devices: [] };
  }
  //componentDidMount() {
  loadMapData() {
    this.fetchData();
    console.log('Component did mount');
    this.getCurrentPosition();

  }
  fetchData() {
    let me = this;
    const { configuration, queryString } = this.props;
    //console.log(queryString, configuration.params);
    if (configuration && configuration.params && configuration.params.api) {
      //console.log(configuration.params);
      var reqParams = requestBuilder.buildParams(queryString, configuration);
      //console.log(reqParams);
      // Make a request for a user with a given ID
      server.postData(configuration.params.api, reqParams)
        .then(function (response) {
          // handle success
          //  console.log('From EmtChart widget');
          console.log(response.data);
          me.setState({
            devices: response.data.data
          });
        })
        .catch(function (error) {
          // handle error
          //console.log(error);
        })
        .then(function () {
          if (configuration.reloadInterval && configuration.reloadInterval > 1000) {
            setTimeout(() => {
              me.fetchData.call(me);
            }, configuration.reloadInterval)
          }
        });
    }
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "To locate your location enable permission for the application in Settings - Privacy - Location");
              } else {
                Alert.alert("", "To locate your location enable permission for the application in Settings - Apps - Swachh Bharat - Location");
              }
              break;
            default:
              Alert.alert("", "Error in detecting  location");
          }
        }
      );
    } catch (e) {
      alert(e.message || "");
    }
  };

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true });
      this.loadMapData();
    }
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
    this.setRegion(region);
  };



  render() {
    const { devices, region } = this.state;
    const { children, renderMarker, markers } = this.props;
    return <View style={styles.container}>
      <MapView
        key={"mapv"}
        showsUserLocation
        ref={map => { this.map = map }}
        region={region}
        renderMarker={renderMarker}
        onMapReady={this.onMapReady}
        showsMyLocationButton={false}
        onRegionChange={this.onRegionChange.bind(this)}
        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        style={StyleSheet.absoluteFill}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}
        zoomControlEnabled
      >
        {devices && devices.length > 0 ? devices.map(device => <Marker key={device.device}
          coordinate={{
            latitude: device.info.lat,
            longitude: device.info.lng
          }}
          title={device.info.name}
          description={"description"}
        />) : null}

      </MapView>
    </View>
  }
}
