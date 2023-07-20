/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RealmProvider} from './src/DB/Models/Person';
import Index from './src/screens';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <NativeBaseProvider>
        <SafeAreaView style={styles.rootContainer}>
          <Index />
        </SafeAreaView>
      </NativeBaseProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#00d6ff',
  },
});

export default App;
