/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {initialize, endAppStartup, logMessage} from 'react-native-embrace';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    initialize();
    console.log('[App] application started!');
  }

  componentDidMount() {
    endAppStartup();
    logMessage('[Example] example app test log');
  }

  render() {
    return (
      <View style={styles.container} testID={'WelcomeScreen'}>
        <View>
          <Text style={styles.header}>{'Embrace + Detox Example'}</Text>
          <Text style={styles.body}>
            {'This is an example test application using embrace and detox.'}
          </Text>
          <Button title={'CLick me'} onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    flex: 1,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    padding: 32,
  },
  body: {
    textAlign: 'center',
    paddingBottom: 64,
    fontSize: 16,
  },
});
