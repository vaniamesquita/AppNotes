//CRIAR NOTA

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import Tarefa from '../../Components/Tarefa';

import Tags from 'react-native-tags';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CriarNota() {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const [nomeNota, setNomeNota] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [tag, setTag] = useState('');

  const [notes, setNotes] = useState([]);

  //CHECKBOX TAREFA
  const [tarefa, setTarefa] = useState('');
  const [itemTarefa, setItemTarefa] = useState([]);

  const handleAddTarefa = () => {
    Keyboard.dismiss();
    setItemTarefa([...itemTarefa, tarefa]);
    setTarefa(null);
  };

  //remove um item do array e guarda o resultado em copiaTarefa e seta no itemtarefa
  //que não inclui o que foi excluido
  const tarefaCompleta = index => {
    let copiaTarefa = [...itemTarefa];
    copiaTarefa.splice(index, 1);
    setItemTarefa(copiaTarefa);
  };

  //DROPDOWN PRIORIDADES
  const [open, setOpen] = useState(false);
  const [prioridade, setPrioridade] = useState(null);
  const [items, setItems] = useState([
    {key: 1, label: 'Urgente', value: 'Urgente'},
    {key: 2, label: 'Alta', value: 'Alta'},
    {key: 3, label: 'Média', value: 'Média'},
    {key: 4, label: 'Baixa', value: 'Baixa'},
  ]);

  //DROPDOWN COR
  const [openCor, setOpenCor] = useState(false);
  const [corTarefa, setCorTarefa] = useState(null);
  // eslint-disable-next-line no-sparse-arrays
  const [itemsCor, setItemsCor] = useState([
    {
      key: 1,
      label: 'Básico',
      value: 'Básico',
      containerStyle: {
        backgroundColor: '#F8F8F8',
      },
    },
    {
      key: 2,
      label: 'Rosa',
      value: 'Rosa',
      containerStyle: {
        backgroundColor: '#FFF3F3',
      },
    },
    {
      key: 3,
      label: 'Azul',
      value: 'Azul',
      containerStyle: {
        backgroundColor: '#EAF1FF',
      },
    },
    {
      key: 4,
      label: 'Verde-água',
      value: 'Verde-água',
      containerStyle: {
        backgroundColor: '#E4FFEF',
      },
    },
    ,
  ]);

  //renderizar todas as notas quando a pagina abrir
  useEffect(() => {
    findNotes();
  }, [notes]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notas');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  //SALVAR NOTAS - ASYNC STORAGE
  async function storeData() {
    const dados = {
      id: Date.now(),
      nomeNota: nomeNota,
      descricao: descricao,
      prioridade: prioridade,
      data: data,
      itemTarefa: itemTarefa,
      corTarefa: corTarefa,
      tag: tag,
    };
    const updateNotes = [...notes, dados];
    setNotes(updateNotes);
    await AsyncStorage.setItem('notas', JSON.stringify(updateNotes));

    Alert.alert('Nota Cadastrada', 'Sua nota foi cadastrada com sucesso!');
    navigation.dispatch(StackActions.popToTop());
  }

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={false}>
        <View style={{flex: 0.9, margin: 20}}>
          <Text style={{marginBottom: 500}}>
            <View>
              {/* ==================== INPUT - NOME DA NOTA ==================== */}

              <Text style={styles.inputLabel}>Nome da Nota (obrigatório)</Text>
              <TextInput
                returnKeyType={'next'}
                //returnKeyLabel={'next'}
                style={styles.input}
                onChangeText={text => setNomeNota(text)}
                value={nomeNota}
                placeholder="Insira"
                onSubmitEditing={Keyboard.dismiss}
              />

              {/* ==================== INPUT MULTLINE - DESCRIÇÃO ==================== */}
              <View style={styles.containerDescricao}>
                <Text style={styles.textDescricaoLeft}>Descrição</Text>
                <Text style={styles.textDescricaoRight}>0/240</Text>
              </View>

              <TextInput
                style={styles.inputMultiline}
                multiline
                numberOfLines={4}
                onChangeText={text => setDescricao(text)}
                value={descricao}
                placeholder="Insira"
                keyboardType="default"
              />

              {/* ========== DROPDOWN - PRIORIDADES ========== */}

              <Text style={styles.inputLabel}>Prioridade</Text>

              <DropDownPicker
                style={styles.dropbox}
                open={open}
                value={prioridade}
                items={items}
                setOpen={setOpen}
                setValue={setPrioridade}
                setItems={setItems}
                listMode="SCROLLVIEW"
                defaultNull
                placeholder="Escolha"
                dropDownContainerStyle={{
                  borderWidth: 0,
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignSelf: 'center',
                  width: '97%',
                  marginTop: 10,
                }}
              />

              {/* ========== INPUT - DATA ========== */}
              <Text style={styles.inputLabel}>Data</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setData(text)}
                value={data}
                placeholder="dd/mm/yyyy"
                keyboardType="numeric"
              />

              {/* ========== CHECKBOX - TAREFAS ========== */}

              <View>
                <Text style={styles.inputLabel}>Lista de tarefas</Text>
              </View>

              {itemTarefa.map((item, index) => {
                return (
                  <View key={index} style={styles.containerListaTarefas}>
                    <Tarefa key={index} text={item} />
                    <TouchableOpacity
                      onPress={() => {
                        tarefaCompleta(index);
                      }}>
                      <Text style={styles.textDeleteTarefa}>X</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <View style={{width: 350}}>
                <TextInput
                  onChangeText={text => setTarefa(text)}
                  value={tarefa}
                  style={styles.inputTarefa}
                  placeholder="Nova Tarefa"
                />
                <TouchableOpacity onPress={() => handleAddTarefa()}>
                  <Text style={styles.btnAdicionarTarefa}>Adicionar Item</Text>
                </TouchableOpacity>
              </View>

              {/* ========== FILE PICKER - ADICIONAR FOTO OU ARQUIVO ========== */}
              <View>
                <Text style={styles.inputLabel}>Adicionar foto ou arquivo</Text>
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 5,
                    marginBottom: 10,
                    fontSize: 12,
                  }}>
                  ** Falta Implementar **
                </Text>

                <TouchableOpacity style={styles.buttonAddFile}>
                  <Text style={styles.textButtonAddFile}>Adicione Aqui</Text>
                </TouchableOpacity>
              </View>

              {/* ========== DROPDOWN - COR TAREFA ========== */}

              <Text style={styles.inputLabel}>Cor</Text>

              <DropDownPicker
                style={styles.dropbox}
                open={openCor}
                value={corTarefa}
                items={itemsCor}
                setOpen={setOpenCor}
                setValue={setCorTarefa}
                setItems={setItemsCor}
                listMode="SCROLLVIEW"
                defaultNull
                placeholder="Escolha"
                dropDownContainerStyle={{
                  borderWidth: 0,
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignSelf: 'center',
                  width: '97%',
                  marginTop: 10,
                }}
                selectedItemContainerStyle={{
                  backgroundColor: itemsCor,
                }}
              />

              {/* ========== ADICIONAR TAGS ========== */}
              <View>
                <Text style={styles.inputLabel}>Adicionar Tags</Text>

                <Tags
                  style={{borderWidth: 0, width: 333, alignSelf: 'center'}}
                  initialText=""
                  textInputProps={{
                    placeholder: 'Sua Tag',
                  }}
                  initialTags={[]}
                  onChangeTags={tag => setTag(tag)}
                  maxNumberOfTags={10}
                  onTagPress={(index, tagLabel, event, deleted) =>
                    console.log(
                      index,
                      tagLabel,
                      event,
                      deleted ? 'deleted' : 'not deleted',
                    )
                  }
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    marginVertical: 4,
                    borderRadius: 0,
                    paddingTop: 4,
                  }}
                  tagTextStyle={{backgroundColor: 'black', borderRadius: 50}}
                  inputStyle={{backgroundColor: 'white'}}
                  renderTag={({
                    tag,
                    index,
                    onPress,
                    deleteTagOnPress,
                    readonly,
                  }) => (
                    <TouchableOpacity
                      key={`${tag}-${index}`}
                      onPress={onPress}
                      deleteTagOnPress={true}>
                      <View>
                        <Text style={styles.textoTag}>{tag}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Text>
        </View>
      </ScrollView>
      <View style={{flex: 0.1}}>
        <View style={styles.container}>
          {nomeNota.trim().length > 0 ? (
            <TouchableOpacity style={styles.button} onPress={storeData}>
              <Text style={styles.buttonText}>Criar Nota</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonDisable}
              onPress={() => {
                Alert.alert('Atenção', 'O nome da nota é obrigatório');
              }}>
              <Text style={styles.buttonText}>Criar Nota</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    zIndex: 1,
  },
  containerDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 328,
    marginLeft: 10,
  },
  textDescricaoLeft: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },

  textDescricaoRight: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    backgroundColor: '#0F62FE',
    width: '100%',
    margin: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonDisable: {
    backgroundColor: '#c2c2c2',
    width: '100%',
    margin: 0,
    height: 100,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  inputLabel: {
    width: 328,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    color: '#161616',
  },
  input: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    padding: 10,
    backgroundColor: '#fff',
    width: 328,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25,
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
    backgroundColor: '#fff',
    width: 328,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputMultiline: {
    margin: 12,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    padding: 10,
    backgroundColor: '#fff',
    width: 328,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  inputTarefa: {
    margin: 20,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    padding: 10,
    backgroundColor: '#fff',
    width: 328,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonAddFile: {
    width: 328,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,

    justifyContent: 'center',
  },
  textButtonAddFile: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  containerListaTarefas: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDeleteTarefa: {
    fontSize: 10,
    marginTop: 15,
  },
  btnAdicionarTarefa: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0F62FE',
    marginTop: 0,
    marginLeft: 15,
    marginBottom: 25,
  },
  textoTag: {
    marginTop: 2,
    marginBottom: 2,

    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,

    backgroundColor: '#e0e0e0',

    borderRadius: 50,
  },
});
