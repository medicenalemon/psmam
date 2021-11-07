import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

const PropertyList = (props) => {

    const [properties, setProperties] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/property/user'
        }).then(response => {
            setProperties(response.data)
        })
    }, []);

    return(
        <ScrollView>
            {
                properties.map(property => {
                    return(
                        <ListItem 
                            key={property.id}
                            bottomDivider
                            onPress={() => console.log(property.id)}
                        >
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>Nombre: {property.name}</ListItem.Title>
                                <ListItem.Subtitle>Ubicación: {property.location}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
            }
            <Button title="Crear Propiedad" onPress={() => props.navigation.navigate("CreatePropertyScreen")} />
        </ScrollView>
    );

}

export default PropertyList