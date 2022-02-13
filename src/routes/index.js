import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Alert,
} from 'react-native';

import {useNavigation, Link} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../pages/Home/Home';
import CriarNota from '../pages/CriarNota/CriarNota';
import Notas from '../pages/Notas/Notas';
import NotaAberta from '../pages/NotaAberta/NotaAberta';

import {deleteAlert} from '../pages/NotaAberta/NotaAberta';

export function AppRoutes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F62FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: '300',
          },
          headerTitleAlign: 'left',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Notas',

            headerRight: () => (
              <View style={styles.containerButtonHeader}>
                <TouchableOpacity>
                  <Image
                    style={styles.imageButton}
                    source={require('../../src/assets/Icon/Search/Search.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Link to={{screen: 'CriarNota'}}>
                    <Text style={styles.textAddButton}>+</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="CriarNota"
          component={CriarNota}
          options={{
            title: 'Criar Nota',

            headerRight: () => (
              <View style={styles.containerButtonHeader}>
                <TouchableOpacity>
                  <Image
                    style={styles.imageButton}
                    source={require('../../src/assets/Icon/Search/Search.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Link to={{screen: 'CriarNota'}}>
                    <Text style={styles.textAddButton}>+</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Notas"
          component={Notas}
          options={{
            title: 'Notas',

            headerRight: () => (
              <View style={styles.containerButtonHeader}>
                <TouchableOpacity>
                  <Image
                    style={styles.imageButton}
                    source={require('../../src/assets/Icon/Search/Search.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Link to={{screen: 'CriarNota'}}>
                    <Text style={styles.textAddButton}>+</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="NotaAberta"
          component={NotaAberta}
          options={{
            title: '',
            

            headerRight: () => (
              <View style={styles.containerButtonHeaderNota}>
                <TouchableOpacity >
                  {/* <Image
                    style={styles.imageButton}
                    source={require('../../src/assets/Icon/delete/delete.png')}
                  /> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('Editar')}>
                  {/* <Link to={{screen: 'CriarNota'}}>
                    <Text style={styles.textEditar}>Editar</Text>
                  </Link> */}
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerButtonHeader: {
    flexDirection: 'row',
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageButton: {
    marginRight: 20,
    marginLeft: 5,
  },
  textAddButton: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '300',
    textAlign: 'center',
  },
  textEditar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  containerButtonHeaderNota: {
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
});
