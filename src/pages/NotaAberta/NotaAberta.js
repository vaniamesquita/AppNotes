import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height * 1.3;

export default function NotaAberta(props) {
  const navigation = useNavigation();
  const {nota} = props.route.params;

  const deletarNota = async () => {
    const result = await AsyncStorage.getItem('notas');
    let notes = [];
    if (result !== null) {
      notes = JSON.parse(result);
    }

    const newNotes = notes.filter(n => n.id !== nota.id);
    await AsyncStorage.setItem('notas', JSON.stringify(newNotes));
    navigation.dispatch(StackActions.popToTop());
  };

  const deleteAlert = () => {
    Alert.alert(
      'Alerta',
      'Tem certeza que deseja excluir esta nota? Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('cancelar'),
        },
        {
          text: 'Excluir',
          onPress: deletarNota,
        },
      ],
      {
        cancelable: true,
      },
    );
  };

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
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.containerButtonDelete}
            onPress={deleteAlert}>
            <Image source={require('../../assets/Icon/delete/delete.png')} />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => console.log('Editar')}>
            <Link to={{screen: 'CriarNota'}}>
                    <Text style={styles.textEditar}>Editar</Text>
                  </Link>
          </TouchableOpacity> */}

          <View style={styles.containerDados}>
            <Text style={styles.textoId} numberOfLines={1}>
              {`Nota Criada em ${formatDate(nota.id)}`}
            </Text>

            <Text style={styles.textoRotulo}>Nome </Text>
            <Text style={styles.textoNomeNota}>{nota.nomeNota}</Text>

            {nota.descricao.length > 0 ? (
              <View>
                <Text style={styles.textoRotulo}>Descrição </Text>
                <Text style={styles.textoDescricao}>{nota.descricao}</Text>
              </View>
            ) : null}

            <View>
              <Text style={styles.textoRotulo}>Prioridade </Text>
              <Text style={styles.dropbox}>{nota.prioridade}</Text>
            </View>

            {nota.data.length > 0 ? (
              <View>
                <Text style={styles.textoRotulo}>Data </Text>
                <Text style={styles.dropbox}>{nota.data}</Text>
              </View>
            ) : null}

            {nota.itemTarefa.length > 0 ? (
              <View>
                <Text style={styles.textoRotulo}>Tarefas </Text>
                <View>
                  {nota.itemTarefa.map((item, index) => {
                    return (
                      <View style={styles.containerTarefas} key={index}>
                        <BouncyCheckbox
                          iconStyle={{borderRadius: 0}}
                          size={15}
                          fillColor="#000"
                          onPress={isChecked => {}}
                        />
                        <Text>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

            <Text style={styles.textoRotulo}>Cor </Text>
            <Text style={styles.dropbox}>{nota.corTarefa}</Text>

            {nota.tag.length > 0 ? (
              <View>
                <Text style={styles.textoRotulo}>Tags </Text>
                <View style={styles.containerTag}>
                  {nota.tag.map((item, index) => {
                    return (
                      <View style={styles.containerTextTag} key={index}>
                        <Text style={styles.textoTag}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: windowHeight,
    width: windowWidth,
  },
  containerDados: {
    width: 328,
    alignSelf: 'center',
  },
  textoRotulo: {
    fontSize: 10,
    fontWeight: '600',
    width: 328,
    flexDirection: 'column',

    marginTop: 30,
  },
  textoNomeNota: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
  },

  textoDescricao: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 10,
    fontWeight: '400',
    color: '#000',
  },
  dropbox: {
    borderRadius: 0,
    margin: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    padding: 10,
    backgroundColor: '#F4F4F4',
    width: 328,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  containerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  containerTextTag: {
    marginRight: 10,
    marginBottom: 10,
  },
  textoTag: {
    marginTop: 3,

    paddingVertical: 5,
    paddingHorizontal: 10,

    backgroundColor: '#e0e0e0',
    color: '#000',

    height: 30,
    borderRadius: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerTarefas: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    height: 30,
  },
  containerButtonDelete: {
    backgroundColor: '#0f62fe',
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  textoId: {
    fontSize: 12,
    top: 10,
    color: 'grey',
  },
});
