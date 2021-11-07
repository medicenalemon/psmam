import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DatePicker from 'react-native-date-picker';
import pickerPropertiesGeneral from '../components/pickerPropertiesGeneral';
import axios from 'axios';

const ElectroInvoiceDetailScreen = (props) => {

    const initialState = {
        property: '',
        invoiceType: 1,
        monthly: '',
        bimonthly: '',
        price: '',
        kwh: '',
        startDate: '',
        endDate: ''
    }

    const [invoice, setInvoice] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const getInvoiceById = async(id) => {
        const dbRef = axios.get(
            'https://6a69-181-94-254-32.ngrok.io/api/invoice',
            {
              params: {
                id: id
              }
            }
          );;
        const doc = await dbRef.get();
        const invoice = doc.data();
        setInvoice({
            ...invoice,
            id: doc.id,
        });
        setLoading(false);
    }

    useEffect(() => {
        getInvoiceById(props.route.params.invoiceId);
    }, []);

    const handleChangeText = (name, value) => {
        setInvoice({ ...invoice, [name]: value })
    }

    const deleteInvoice = async(id) => {
        await axios.delete('https://6a69-181-94-254-32.ngrok.io/api/invoice/' + id);
        props.navigation.navigate('ElectroInvoiceList');
    }

    const updateInvoice = async() => {
        try {
            await axios.post('https://6a69-181-94-254-32.ngrok.io/api/invoice', setInvoice({
                property: invoice.property,
                invoiceType: 1,
                monthly: invoice.monthly,
                bimonthly: invoice.bimonthly,
                price: invoice.price,
                kwh: invoice.kwh,
                startDate: invoice.startDate,
                endDate: invoice.endDate
            })).data;
            setInvoice(initialState);
            props.navigation.navigate('ElectroInvoiceList');
        } catch (error) {
            console.log(error);
        }
    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar factura','¿Está seguro que desea eliminar esta factura?', [
            {text: 'Sí', onPress: () => deleteInvoice()},
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
                <Text>CREAR FACTURA DE ELECTRICIDAD</Text>
            </View>
            <pickerPropertiesGeneral />
            <View style={styles.inputGroup}>
                <Text>Fecha Inicial de Facturación *</Text>
                <DatePicker date={startDate} onDateChange={setStartDate} />
            </View>
            <View style={styles.inputGroup}>
                <Text>Fecha Final de Facturación *</Text>
                <DatePicker date={endDate} onDateChange={setEndDate} />
            </View>
            <View>
                <Text>Periodo de Cobro *</Text>
                <SegmentedControl
                        values={['Mensual', 'Bimestral']}
                        selectedIndex={this.state.monthly}
                        onChange={(event) => {
                            event.nativeEvent.selectedSegmentIndex === 'Mensual' ? this.setState({monthly: true, bimonthly: false}) : this.setState({monthly: false, bimonthly: true});
                        }}
                    />
            </View>
            
            <View style={styles.inputGroup}>
                <Text>KWH *</Text>
                <TextInput 
                    placeholder="KWH" 
                    onChangeText={(value) => handleChangeText("kwh", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Precio Total ($) *</Text>
                <TextInput 
                    placeholder="Valor" 
                    onChangeText={(value) => handleChangeText("price", value)}
                />
            </View>
            <View style={styles.padding}>
                <Button title="Actualizar" color="#00ee00" onPress={() => updateInvoice()} />    
            </View>
            <View style={styles.padding}>
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

export default ElectroInvoiceDetailScreen