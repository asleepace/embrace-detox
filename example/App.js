/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.content}>
          <Text style={styles.header}>{"Embrace + Detox Example"}</Text>
          <Text style={styles.body}>{"This is an example test application using embrace and detox."}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  body: {
    fontSize: 16,
  },
});

export default App;
