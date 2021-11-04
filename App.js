import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Button } from "@ant-design/react-native";
import {
  getKey,
  clear,
  localStorageConst,
} from "./src/infraestructure/asyncStorage";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScrean from "./src/screens/HomeScreen";
import CreatePropertyScreen from "./src/screens/CreatePropertyScreen";
import PropertyDetailScreen from "./src/screens/PropertyDetailScreen";
import PropertyList from './src/screens/PropertyList';

const Stack = createStackNavigator();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    loadFont();
  }, []);

  useEffect(() => {
    isSignedIn();
  }, []);

  const isSignedIn = async () => {
    const key = await getKey(localStorageConst.TOKEN);
    setSigned(key !== null);
  };

  const logout = async () => {
    await clear();
    setSigned(false);
  };

  const loginSuccess = () => setSigned(true);

  const loadFont = async () => {
    await Font.loadAsync(
      "antoutline",
      require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    );
    await Font.loadAsync(
      "antfill",
      require("@ant-design/icons-react-native/fonts/antfill.ttf")
    );

    setFontLoaded(true);
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <Stack.Navigator>
          {!signed ? (
            <Stack.Screen name="Inicio de Sesión">
              {(props) => (
                <LoginScreen {...props} loginSuccess={loginSuccess} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScrean}
                options={{
                  headerRight: () => (
                    <Button onPress={logout}>Cerrar Sesión</Button>
                  ),
                }}
              />
              <Stack.Screen name="PropertyList" component={PropertyList} options={{ title: 'Listar Propiedades'}}/>
              <Stack.Screen name="CreatePropertyScreen" component={CreatePropertyScreen} options={{ title: 'Crear Nueva Propiedad'}}/>      
              <Stack.Screen name="PropertyDetailScreen" component={PropertyDetailScreen} options={{ title: 'Editar Propiedad'}}/>
            </>
          )}
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

export default App;
