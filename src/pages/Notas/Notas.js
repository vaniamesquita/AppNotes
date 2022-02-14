import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import moment from 'moment';

// //deletar nota
// async function deletarNota() {
//   await AsyncStorage.clear();
// }

const windowWidth = Dimensions.get('window').width - 40;
const windowHeight = Dimensions.get('window').height * 1.3;

export default ({item, onPress}) => {
  const {
    id,
    nomeNota,
    descricao,
    prioridade,
    data,
    itemTarefa,
    corTarefa,
    tag,
  } = item;

  const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();

    return `${day}/${month}/${year} - ${hrs}:${min}`;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        <TouchableOpacity onPress={onPress}>
          <View
            //eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderRadius: 4,
              backgroundColor: corTarefa === 'Azul' ? '#eaf1ff' : '#f8f8f8',
              borderColor: '#f2f2f2',
              borderWidth: 1,
              padding: 10,
              flexWrap: 'wrap',
              width: windowWidth / 2,
            }}>
            <View>
              <Text style={styles.textoId} numberOfLines={1}>
                {formatDate(id)}
              </Text>
              <Text style={styles.textNome} numberOfLines={3}>
                {nomeNota}
              </Text>
              <Text style={styles.textoDescricao} numberOfLines={10}>
                {descricao}
              </Text>
              {/* <Text numberOfLines={1}>{prioridade}</Text> */}
              {/* <Text numberOfLines={1}>{data}</Text> */}
              {itemTarefa.map((itemTarefa, index) => {
                return (
                  <View style={styles.containerTarefas} key={index}>
                    <BouncyCheckbox
                      iconStyle={{borderRadius: 0}}
                      size={13}
                      fillColor="#000"
                      onPress={isChecked => {}}
                    />
                    <Text style={styles.textoTarefa}>{itemTarefa}</Text>
                  </View>
                );
              })}
              {/* <Text numberOfLines={1}>{corTarefa}</Text> */}
              {/* <Text style={styles.tag}  numberOfLines={2}>{tag}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#f8f8f8',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    padding: 10,
    flexWrap: 'wrap',
    width: windowWidth / 2,
  },
  textNome: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tag: {
    backgroundColor: '#0f62fe',
    color: '#fff',
    borderRadius: 50,
    height: 20,
  },
  containerTarefas: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    height: 20,
    flexWrap: 'wrap',
  },
  textoId: {
    fontSize: 10,
    color: 'grey',
  },
  textoDescricao: {
    marginBottom: 10,
  },
  textoTarefa: {
    fontSize: 10,
    textAlignVertical: 'center',
    marginLeft: -8,
  },
  Rosa: {
    backgroundColor: '#fff3f3',
  },
  Azul: {
    backgroundColor: '#eaf1ff',
  },
  Basico: {
    backgroundColor: '#f8f8f8',
  },
  verde: {
    backgroundColor: '#e4ffef',
  },
});
