import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {Person} from '../DB/Models/Person';

type DialogProps = {
  visibility: boolean;
  updateVisibility: (status: boolean) => void;
  person?: Person;
  updatePerson: (newTaskDescription: string) => void;
};

const CustomDialog = (prop: DialogProps): JSX.Element => {
  const [personName, updatePersonName] = useState<string>('');
  const updateBtnHandler = () => {
    prop.updatePerson(personName);
  };
  return (
    <Dialog
      animationType="fade"
      visible={prop.visibility}
      dialogStyle={styles.dialogStyle}
      onTouchOutside={prop.updateVisibility.bind(this, false)}>
      <View style={styles.parentStyleContainer}>
        <Text style={styles.titleStyle}>Update User Name</Text>
        <TextInput
          onChangeText={updatePersonName}
          style={styles.inputContainer}
          placeholder={prop.person?.name}
          placeholderTextColor={'#79e9ff'}
          autoCorrect={false}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressableStyle}
            onPress={prop.updateVisibility.bind(this, false)}>
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonTxt}>Cancel</Text>
            </View>
          </Pressable>
          <Pressable style={styles.pressableStyle} onPress={updateBtnHandler}>
            <View style={[styles.buttonStyle, styles.updateBtn]}>
              <Text style={styles.buttonTxt}>Update</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Dialog>
  );
};
export default CustomDialog;

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: '#00d6ff',
    borderRadius: 15,
  },
  parentStyleContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    fontSize: 14,
    color: '#00d6ff',
    fontWeight: '500',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '70%',
  },
  pressableStyle: {
    flex: 1,
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#FA3F3F',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  buttonTxt: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  updateBtn: {
    backgroundColor: '#71e8ff',
  },
});
