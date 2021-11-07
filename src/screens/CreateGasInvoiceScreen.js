import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { DatePicker } from '@ant-design/react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import pickerPropertiesGeneral from '../components/pickerPropertiesGeneral';
import axios from 'axios';

const CreateGasInvoiceScreen = (props) => {
    const [state, setState] = useState({
        property: '',
        invoiceType: 2,
        monthly: '',
        bimonthly: '',
        price: '',
        cubicMeter: '',
        pci: '',
        startDate: '',
        endDate: ''
    })

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    const saveNewInvoice = async() => {
        if(state.startDate === '' || state.endDate === '' || state.pci === '' || state.cubicMeter === '' || state.price === ''){
            alert('Llene todos los campos');
        } else {
            try {
                await axios.post('https://6a69-181-94-254-32.ngrok.io/api/invoice', setState({
                    property: state.property,
                    invoiceType: 2,
                    monthly: state.monthly,
                    bimonthly: state.bimonthly,
                    startDate: state.startDate,
                    endDate: state.endDate,
                    price: state.price,
                    cubicMeter: state.cubicMeter,
                    pci: state.pci
                })).data;
                props.navigation.navigate('GasInvoiceList');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View>
                <Text>CREAR FACTURA DE GAS</Text>
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
                <Text>Metros cúbicos (m3) *</Text>
                <TextInput 
                    placeholder="m3" 
                    onChangeText={(value) => handleChangeText("cubicMeter", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>PCI *</Text>
                <TextInput 
                    placeholder="pci" 
                    onChangeText={(value) => handleChangeText("pci", value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Precio Total ($) *</Text>
                <TextInput 
                    placeholder="Valor" 
                    onChangeText={(value) => handleChangeText("price", value)}
                />
            </View>
            <View>
                <Button title="Crear Factura" onPress={() => saveNewInvoice()} />
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

export default CreateGasInvoiceScreen