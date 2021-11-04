import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

const pickerPropertyDepartment = () => {

    const [department, setDepartment] = useState([]);
    const [departmentSelected, setDepartmentSelected] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/provinces'
        }).then(response => {
            setDepartment(response.data.department)
        })
    }, [])

    return(
        <View>
            <Text>DEPARTAMENTO *</Text>
            <Picker 
                selectedValue={departmentSelected}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setDepartmentSelected(itemValue);
                }}
            >
                {
                    department.map(dep => {
                        return <Picker.Item label={dep} value={dep} />
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

export default pickerPropertyDepartment