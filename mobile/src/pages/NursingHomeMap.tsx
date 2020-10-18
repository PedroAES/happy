import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface NursingHome {
  _id: number,
  name: string,
  latitude: number,
  longitude: number,
}

function NursingHomesMap() {
  const [ nursingHome, setNursingHome ] = useState<NursingHome[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('nursing_homes').then(response => {
      setNursingHome(response.data);
    });
  });

  function handleNavigateToNursingHomeDetails(id: number) {
    navigation.navigate('NursingHomeDetails', { id });
  }

  function handleNavigateToCreateNursingHome() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -12.9876699,
          longitude: -38.4987764,
          latitudeDelta: 0.050,
          longitudeDelta: 0.050,
        }}
      >
        {nursingHome.map(nursingHome => {
          return (
            <Marker
              key={nursingHome._id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: nursingHome.latitude,
                longitude: nursingHome.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToNursingHomeDetails(nursingHome._id)}>
                <View style={styles.calloutContainer} >
                  <Text style={styles.calloutText}>{nursingHome.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{nursingHome.length} asilos encontrados</Text>

        <RectButton style={styles.createNursingHomeButton} onPress={handleNavigateToCreateNursingHome}>
          <Feather name='plus' size={20} color='#FFF' />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',

    elevation: 3,
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 10,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createNursingHomeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default NursingHomesMap;
