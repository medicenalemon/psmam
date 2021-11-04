import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertyUse = () => {

    const [propertyUse, setPropertyUse] = useState([]);
    const [propertyUseSelected, setPropertyUseSelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/uses'
        }).then(response => {
            setPropertyUse(response.data)
        })
    }, [])

    return(
        <View>
            <Text>USO *</Text>
            <Picker 
                selectedValue={propertyUseSelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setPropertyUseSelected(itemValue);
                }}
            >
                {
                    propertyUse.map(pu => {
                        return <Picker.Item label={pu} value={pu} />
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

export default pickerPropertyUse