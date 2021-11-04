import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertySMN = () => {

    const [smn, setSmn] = useState([]);
    const [smnSelected, smnSelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/provinces'
        }).then(response => {
            setSmn(response.data.smn)
        })
    }, [])

    return(
        <View>
            <Picker 
                selectedValue={smnSelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setSmnSelected(itemValue);
                }}
            >
                {
                    smn.map(sm => {
                        return <Picker.Item label={sm} value={sm} />
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

export default pickerPropertySMN