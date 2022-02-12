import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Tarefa = props => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View />
        <BouncyCheckbox
          iconStyle={{
            borderRadius: 0,
          }}
          size={15}
          fillColor="#000"
          // onPress={(isChecked) => {}}
        />
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Tarefa;
