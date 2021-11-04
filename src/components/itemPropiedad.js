import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, WingBlank, InputItem, Button } from "@ant-design/react-native";

const ItemPropiedad = (props) => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <WingBlank>
            <Card>
                <Card.Body>
                    <Text>Nombre: {props.name}</Text>
                    <Text>Ubicación: {props.location}</Text>
                    <Text>Relación con propiedad: {props.owner}</Text>
                </Card.Body>
            </Card>
        </WingBlank>
    </View>
);

export default ItemPropiedad;