import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

const LoginScreen = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        colors={['#fff', '#fff', '#fff']}
        style={styles.container}
      >
        <Text style={styles.welcomeText}>UTN-IEDS</Text>
        <Text style={styles.loginText}>Selecccione una opción</Text>
        <View>
            <Button style={styles.loginButtonText} title="Login">Login</Button>
        </View>
        <View>
            <Button style={styles.loginButtonText} title="Login">Login</Button>
        </View>
        <View>
            <Button style={styles.loginButtonText} title="Login">Login</Button>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: '900',
    color: '#1890ff',
    alignSelf: 'center',
    marginTop: 70,
  },
  loginText: {
    color: '#1890ff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#833471',
    paddingVertical: 12,
    height: 20,
    borderRadius: 6,
    marginTop: 40,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
  },
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#808e9b',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default LoginScreen;