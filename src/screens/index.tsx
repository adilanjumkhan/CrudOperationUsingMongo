/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import {Person, useQuery, useRealm} from '../DB/Models/Person';
import SelectField from '../Components/SelectFormField';
import CustomDialog from '../Components/updateDialog';

const Index = (): JSX.Element => {
  const [gender, setGender] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [currentPerson, updateCurrentPerson] = useState<Person>();
  const realm = useRealm();
  const addedPerson = useQuery(Person);
  const [dialogueVisibility, updateDialogueVisibility] =
    useState<boolean>(false);

  const insertDataHandler = () => {
    if (
      name === '' ||
      gender === '' ||
      age === '' ||
      isNaN(parseInt(age, 10))
    ) {
      Alert.alert(
        'Invalid Data Entry',
        'Enter valid person credentials to Insert data',
        [{text: 'OK', style: 'destructive', onPress: () => {}}],
      );
    } else {
      realm.write(() => {
        realm.create('Person', {
          _id: new Realm.BSON.ObjectId(),
          name: name,
          age: parseInt(age, 10),
          gender: gender,
        });
      });
      setName('');
      setGender('');
      setAge('');
      Alert.alert(
        'Data Entry Successful',
        'Data has been inserted to DB successfully',
        [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => {},
          },
        ],
      );
    }
  };
  const deleteActionHandler = (person: Person) => {
    console.log('Delete Requested');
    realm.write(() => {
      realm.delete(person);
    });
  };
  const updatePersonName = (updatedPersonName: string) => {
    updateDialogueVisibility(false);
    if (updatedPersonName.trim() === '') {
      Alert.alert('Invalid Name', 'Enter valid person name', [
        {text: 'OK', style: 'destructive', onPress: () => {}},
      ]);
    } else {
      if (currentPerson !== undefined) {
        realm.write(() => {
          currentPerson.name = updatedPersonName;
        });
      }
    }
  };
  const updateButtonHandler = (person: Person) => {
    updateCurrentPerson(person);
    updateDialogueVisibility(true);
  };

  return (
    <View style={styles.parentContainer}>
      <CustomDialog
        updateVisibility={updateDialogueVisibility}
        visibility={dialogueVisibility}
        person={currentPerson}
        updatePerson={updatePersonName}
      />
      <Text style={styles.header}>Crud Operation Using Realm</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your Name"
          placeholderTextColor={'#79e9ff'}
          onChangeText={setName}
          autoCorrect={false}
          value={name}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your Age"
          placeholderTextColor={'#79e9ff'}
          keyboardType="numeric"
          onChangeText={setAge}
          autoCorrect={false}
          value={age}
        />
        <SelectField gender={gender} setGender={setGender} />
      </View>
      <Pressable onPress={insertDataHandler}>
        <View style={styles.customButton}>
          <Text style={styles.buttonTxt}>Insert</Text>
        </View>
      </Pressable>
      {Array.from(addedPerson).length !== 0 ? (
        <Text style={styles.sectionHeader}>User Data inside DB</Text>
      ) : (
        <></>
      )}

      <View style={styles.dataContainer}>
        <FlatList
          data={Array.from(addedPerson)}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onLongPress={updateButtonHandler.bind(this, item)}
                style={styles.itemDisplayStyle}>
                <View style={styles.dataEntry}>
                  <Text style={styles.infoTxt}>{index + 1})</Text>
                </View>
                <View style={[styles.dataEntry, styles.additionalStyle]}>
                  <Text style={styles.infoTxt}>{item.name}</Text>
                </View>
                <View style={styles.dataEntry}>
                  <Text style={styles.infoTxt}>{item.age}</Text>
                </View>
                <View style={styles.dataEntry}>
                  <Text style={styles.infoTxt}>{item.gender}</Text>
                </View>
                <Pressable
                  onPress={deleteActionHandler.bind(this, item)}
                  style={styles.dataEntry}>
                  <Image
                    style={styles.deleteIcon}
                    source={require('../asserts/delete.png')}
                  />
                </Pressable>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    paddingVertical: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  inputField: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#00d6ff',
    marginVertical: 10,
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  customButton: {
    marginTop: 12,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  buttonTxt: {
    color: '#00d6ff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  dataContainer: {
    flex: 1,
    width: '90%',
  },
  itemDisplayStyle: {
    backgroundColor: 'white',
    marginTop: 12,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataEntry: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTxt: {
    color: '#01bade',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteIcon: {
    height: 20,
    width: 20,
  },
  additionalStyle: {
    flex: 2,
  },
});

export default Index;
