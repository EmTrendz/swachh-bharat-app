import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import server from '../../utils/server';
import async from 'async-es';
import requestBuilder from '../../utils/requestBuilder';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    flex: 1
  },
});

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class EmtMap extends Component {
  map = null;

  state = {
    region: {
      latitude: -37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    ready: true,
    filteredMarkers: []
  };

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  constructor(props) {
    super(props);
    this.state = { devices: [] };
  }
  componentDidMount() {
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
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
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
    }
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };



  render() {
    const { devices, region } = this.state;
    const { children, renderMarker, markers } = this.props;
    return <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        ref={map => { this.map = map }}
        data={markers}
        initialRegion={initialRegion}
        renderMarker={renderMarker}
        onMapReady={this.onMapReady}
        showsMyLocationButton={false}
        onRegionChange={this.onRegionChange.bind(this)}
        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        style={StyleSheet.absoluteFill}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}
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
