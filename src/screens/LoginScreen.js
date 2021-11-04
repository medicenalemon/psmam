import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card, WingBlank, InputItem, Button } from "@ant-design/react-native";
import { useForm, Controller } from "react-hook-form";

import Spinner from "react-native-loading-spinner-overlay";

import { post } from "../infraestructure/axiosInstance";
import { saveKey, localStorageConst } from "../infraestructure/asyncStorage";

const initialState = {
  isLoading: false,
};

const LoginScreen = ({ loginSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [state, setState] = useState(initialState);

  const onSubmit = async (data) => {
    setState({
      ...state,
      isLoading: true,
    });
    try {
      const response = await post("/auth/login", data);
      await saveKey(localStorageConst.TOKEN, response.token);
      setState({
        ...state,
        isLoading: false,
      });
      loginSuccess();
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        // errors: error.response.data,
        isLoading: false,
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Spinner
        visible={state.isLoading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
      <WingBlank>
        <Card>
          <Card.Body>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Por favor ingrese un usuario" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputItem
                  placeholder="Usuario"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && (
              <Text style={{ color: "red" }}>{errors.username.message}</Text>
            )}

            <Controller
              name="password"
              control={control}
              rules={{ required: "Por favor ingrese una contraseña" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputItem
                  placeholder="Contraseña"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  type="password"
                  secureTextEntry
                  error={Boolean(errors.password)}
                />
              )}
            />

            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
            <Button type="primary" onPress={handleSubmit(onSubmit)} style={{ color: "#1890ff" }}>
              Iniciar Sesión
            </Button>
          </Card.Body>
        </Card>
      </WingBlank>
    </View>
  );
};

export default LoginScreen;
