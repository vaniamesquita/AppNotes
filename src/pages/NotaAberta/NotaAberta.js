import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function NotaAberta(props) {
  const {nota} = props.route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.textoRotulo}>Data de Criação: </Text>
      <Text>{nota.id}</Text>

      <Text style={styles.textoRotulo}>Nome </Text>
      <Text style={styles.textoNomeNota}>{nota.nomeNota}</Text>

      <Text style={styles.textoRotulo}>Descrição </Text>
      <Text style={styles.textoDescricao}>{nota.descricao}</Text>

      <Text style={styles.textoRotulo}>Prioridade </Text>
      <Text>{nota.prioridade}</Text>

      <Text style={styles.textoRotulo}>Data </Text>
      <Text>{nota.data}</Text>

      <Text style={styles.textoRotulo}>Tarefas </Text>
      <Text>{nota.itemTarefa}</Text>

      <Text style={styles.textoRotulo}>Cor </Text>
      <Text>{nota.corTarefa}</Text>

      <Text style={styles.textoRotulo}>Tags </Text>
      <Text>{nota.tags}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 328,
    alignSelf: 'center',
  },
  textoRotulo: {
    fontSize: 10,
    fontWeight: '600',
    width: 328,
    flexDirection: 'column',
    backgroundColor: 'red',

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
  },
});
