import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused, Link} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Notas from '../Notas/Notas';
import NotaAberta from '../NotaAberta/NotaAberta';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();

export default function Home() {
  const navigation = useNavigation();



  

  //renderizar notas =======================
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
 
  // renderizar notas e atualizar pagina ao voltar
  useEffect(() => {
    findNotes();
  }, [notes, isFocused]);

  
  // buscar notas ===========================

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notas');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  //ver detalhes da nota (abrir nota)

  const openNote = nota => {
    navigation.navigate('NotaAberta', {nota});
  };


  return (
    <View style={styles.container}>
      <Text />

      {!notes.length ? (
        <View style={styles.container}>
          <Image source={require('../../assets/Icon/icon-home.png')} />
          <View style={{marginTop: 40}}>
            <Text style={styles.titulo}>Não tem nenhuma nota aqui</Text>
            <Text style={styles.texto}>
              Crie notas e você poderá vê-las aqui.
            </Text>
          </View>
          <View style={styles.iconeAddNota}>
            <TouchableOpacity onPress={() => navigation.navigate('CriarNota')}>
              <Image source={require('../../assets/Icon/IconButton/Add.png')} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={notes}
          numColumns={2}
          columnWrapperStyle={{marginBottom: 15}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
          
          <Notas onPress={() => openNote(item)} item={item} />
          
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowHeight,
    height: windowHeight,
    paddingTop: 20,
    paddingLeft: 15,
    backgroundColor: 'white',
    position: 'relative',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    color: '#161616',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: '#8D8D8D',
  },
  iconeAddNota: {
    position: 'absolute',
    bottom: 200,
    left: 300,
    
  },
});
