import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

const ElectroInvoiceList = (props) => {

    const [invoice, setInvoice] = useState([{
        endDate: '',
        price: '',
    }])

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://6a69-181-94-254-32.ngrok.io/api/invoice?invoiceType=1'
        }).then(response => {
            setInvoice(response.data)
        })
    }, []);

    return(
        <ScrollView>
            {
                invoice.map(invoice => {
                    return(
                        <ListItem
                            key={invoice.endDate}
                            bottomDivider
                            onPress={() => console.log(invoice.endDate)} 
                        >
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>Precio: {invoice.price}</ListItem.Title>
                                <ListItem.Subtitle>Fecha Vencimiento: {invoice.endDate}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
            }
            <Button title="Ingresar nueva factura" onPress={() => props.navigation.navigate("CreateGasInvoiceScreen")} />
        </ScrollView>
    );

}

export default ElectroInvoiceList