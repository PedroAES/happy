import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import NursingHomesMap from './pages/NursingHomeMap';
import NursingHomeDetails from './pages/NursingHomeDetails';

import SelectMapPosition from './pages/CreateNursingHome/SelectMapPosition';
import NursingHomeData from './pages/CreateNursingHome/NursingHomeData';
import Header from './components/Header';

function routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#faf3f5' } }} >
        <Screen
          name='NursingHomeMap'
          component={NursingHomesMap}
        />
        
        <Screen
          name='NursingHomeDetails'
          component={NursingHomeDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Asilo" />
          }}
        />

        <Screen
          name='SelectMapPosition'
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />
        
        <Screen
          name='NursingHomeData'
          component={NursingHomeData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default routes;
