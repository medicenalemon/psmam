import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';

import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      style={{flex: 1}}
      enabled>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.container}>
        <LoginScreen />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
});

export default App;