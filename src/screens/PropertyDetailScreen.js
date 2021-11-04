import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import pickerPropertyDepartment from '../components/pickerPropertyDepartment';
import pickerPropertyProvinces from '../components/pickerPropertyProvinces';
import pickerPropertySMN from '../components/pickerPropertySMN';
import pickerPropertyType from '../components/pickerPropertyType';
import pickerPropertyUse from '../components/pickerPropertyUse';
import axios from 'axios';

const PropertyDetailScreen = (props) => {

    const initialState = {
        id: '',
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
    }

    const [property, setProperty] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const getPropertyById = async(id) => {
        const dbRef = axios.get(
            'https://6a69-181-94-254-32.ngrok.io/api/property',
            {
              params: {
                id: id
              }
            }
          );;
        const doc = await dbRef.get();
        const property = doc.data();
        setProperty({
            ...property,
            id: doc.id,
        });
        setLoading(false);
    }

    useEffect(() => {
        getUserById(props.route.params.propertyId);
    }, []);

    const handleChangeText = (name, value) => {
        setProperty({ ...property, [name]: value })
    }

    const deleteProperty = async(id) => {
        await axios.delete('https://6a69-181-94-254-32.ngrok.io/api/property/' + id);
        props.navigation.navigate('PropertyList');
    }

    const updateProperty = async() => {
        try {
            await axios.post('https://6a69-181-94-254-32.ngrok.io/api/property', setState({
                name: property.name,
                location: property.location,
                department: property.department,
                smn: property.smn,
                propertyType: property.propertyType,
                propertyUse: property.propertyUse,
                groundSurface: property.groundSurface,
                buildingSurface: property.buildingSurface,
                renewableEnergySource: property.renewableEnergySource,
                owner: property.owner,
                tenant: property.tenant
            })).data;
            setProperty(initialState);
            props.navigation.navigate('PropertyList');
        } catch (error) {
            console.log(error);
        }
    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar propiedad','¿Está seguro que desea eliminar esta propiedad?', [
            {text: 'Sí', onPress: () => deleteProperty()},
            {text: 'No', onPress: () => console.log(false)}
        ])
    }

    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
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
            <View style={styles.padding}>
                <Button title="Actualizar" color="#00ee00" onPress={() => updateProperty()} />    
            </View>
            <View>
                <Button title="Eliminar" color="#ff0000" onPress={() => openConfirmationAlert()} />
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
    },
    padding: {
        marginBottom: 5
    }
});

export default PropertyDetailScreen