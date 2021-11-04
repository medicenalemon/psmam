import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertyProvinces = () => {

    const [province, setProvince] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/provinces'
        }).then(response => {
            setProvince(response.data)
        })
    }, [])

    return(
        <View>
            <Text>PROVINCIA *</Text>
            <Picker 
                selectedValue={provinceSelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setProvinceSelected(itemValue);
                }}
            >
                {
                    province.map(prov => {
                        return <Picker.Item label={prov} value={prov} />
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

export default pickerPropertyProvinces