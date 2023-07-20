import {createRealmContext} from '@realm/react';
import 'react-native-get-random-values';
import Realm from 'realm';

// Define your object model
export class Person extends Realm.Object<Person> {
  _id!: Realm.BSON.ObjectId; //Primary Key
  name!: string;
  age!: number;
  gender!: string;

  static schema = {
    name: 'Person',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      gender: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Person],
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
