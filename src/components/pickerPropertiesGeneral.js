import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertiesGeneral = () => {

    const [property, setProperty] = useState([]);
    const [propertySelected, setPropertySelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property'
        }).then(response => {
            setProperty(response.data)
        })
    }, [])

    return(
        <View>
            <Text>PROPIEDAD *</Text>
            <Picker 
                selectedValue={propertySelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setPropertySelected(itemValue);
                }}
            >
                {
                    property.map(pro => {
                        return <Picker.Item label={pro} value={pro} />
                    })
                }
            </Picker>
        </View>
    );
}

export default pickerPropertiesGeneral