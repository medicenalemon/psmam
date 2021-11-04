import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertyType = () => {

    const [propertyType, setPropertyType] = useState([]);
    const [propertyTypeSelected, setPropertyTypeSelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/types'
        }).then(response => {
            setPropertyType(response.data)
        })
    }, [])

    return(
        <View>
            <Text>TIPO *</Text>
            <Picker 
                selectedValue={propertyTypeSelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setPropertyTypeSelected(itemValue);
                }}
            >
                {
                    propertyType.map(pt => {
                        return <Picker.Item label={pt} value={pt} />
                    })
                }
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 100,
        flex: 1
    }
});

export default pickerPropertyType