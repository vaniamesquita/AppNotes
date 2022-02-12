import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//deletar nota
async function deletarNota() {
  await AsyncStorage.clear();
}

const windowWidth = Dimensions.get('window').width - 40;

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

  return (
      //onPress={onPress} para abrir a pagina NotaAberta. Incluir nas propriedades tb lá em cima
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text numberOfLines={1}>{id}</Text>
          <Text style={styles.textNome} numberOfLines={3}>
            {nomeNota}
          </Text>
          <Text numberOfLines={99}>{descricao}</Text>
          {/* <Text numberOfLines={1}>{prioridade}</Text> */}
          {/* <Text numberOfLines={1}>{data}</Text> */}
          {itemTarefa.map((itemTarefa, index) => {
            return (
              <View style={styles.containerTarefas} key={index}>
                <BouncyCheckbox
                  iconStyle={{borderRadius: 0}}
                  size={15}
                  fillColor="#000"
                  onPress={isChecked => {}}
                />
                <Text style={{textAlignVertical: 'center', marginLeft: -8}}>
                  {itemTarefa}
                </Text>
              </View>
            );
          })}

          {/* <Text numberOfLines={1}>{corTarefa}</Text> */}
          {/* <Text style={styles.tag}  numberOfLines={2}>{tag.length > 0 ? tag : null}</Text> */}

          {/* <TouchableOpacity onPress={deletarNota}>
              <Text>Deletar</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#f8f8f8',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 10,
    flexWrap: 'wrap',
    zIndex: 99,
    width: windowWidth / 2,
  },
  textNome: {
    fontWeight: 'bold',
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
    height: 30,
  },
});
