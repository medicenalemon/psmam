import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import pickerPropertyDepartment from '../components/pickerPropertyDepartment';
import pickerPropertyProvinces from '../components/pickerPropertyProvinces';
import pickerPropertySMN from '../components/pickerPropertySMN';
import pickerPropertyType from '../components/pickerPropertyType';
import pickerPropertyUse from '../components/pickerPropertyUse';
import axios from 'axios';

const CreatePropertyScreen = (props) => {
    const [state, setState] = useState({
        name: '',
        location: '',
        department: '',
        smn: '',
        propertyType: '',
        propertyUse: '',
        groundSurface: '',
        buildingSurface: '',
        renewableEnergySource: '',
        owner: '',
        tenant: ''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    const saveNewProperty = async() => {
        if(state.name === '' || state.location === '' || state.groundSurface === '' || state.buildingSurface === ''){
            alert('Llene todos los campos');
        } else {
            try {
                await axios.post('https://6a69-181-94-254-32.ngrok.io/api/property', setState({
                    name: state.name,
                    location: state.location,
                    department: state.department,
                    smn: state.smn,
                    propertyType: state.propertyType,
                    propertyUse: state.propertyUse,
                    groundSurface: state.groundSurface,
                    buildingSurface: state.buildingSurface,
                    renewableEnergySource: state.renewableEnergySource,
                    owner: state.owner,
                    tenant: state.tenant
                })).data;
                props.navigation.navigate('PropertyList');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View>
                <Text>CREAR PROPIEDAD</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text>Nombre *</Text>
                <TextInput 
                    placeholder="Nombre" 
                    onChangeText={(value) => handleChangeText("name", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Localidad *</Text>
                <TextInput 
                    placeholder="Ubicación" 
                    onChangeText={(value) => handleChangeText("location", value)}
                />
            </View>
            <pickerPropertyProvinces />
            <pickerPropertyDepartment />
            <pickerPropertySMN />
            <View>
                <Text>TIPO Y USO</Text>
            </View>
            <pickerPropertyType />
            <pickerPropertyUse />
            <View>
                <Text>Relación *</Text>
                <SegmentedControl
                    values={['Dueño', 'Inquilino']}
                    selectedIndex={this.state.owner}
                    onChange={(event) => {
                    this.setState({owner: event.nativeEvent.selectedSegmentIndex});
                    }}
                />
            </View>
            <View>
                <Text>SUPERFICIE DE TERRENO</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text>Total (m2) *</Text>
                <TextInput 
                    placeholder="Valor" 
                    onChangeText={(value) => handleChangeText("groundSurface", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Construido (m2) *</Text>
                <TextInput 
                    placeholder="Valor" 
                    onChangeText={(value) => handleChangeText("buildingSurface", value)}
                />
            </View>
            <View>
                <Text>FUENTE DE ENERGIA RENOVABLE</Text>
            </View>
            <View>
                <Text>Fuente *</Text>
                <SegmentedControl
                    values={['Ninguno', 'Solar Térmica', 'Solar Fotovoltaica', 'Biomasa']}
                    selectedIndex={this.state.renewableEnergySource}
                    onChange={(event) => {
                    this.setState({renewableEnergySource: event.nativeEvent.selectedSegmentIndex});
                    }}
                />
            </View>
            <View>
                <Button title="Crear Propiedad" onPress={() => saveNewProperty()} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
});

export default CreatePropertyScreen
