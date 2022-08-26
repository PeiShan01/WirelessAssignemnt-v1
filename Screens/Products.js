import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Products(props) {
    return (
        <View style = {styles.products}>
            <View style = {styles.productContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    products: {
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 6,
    },

    productContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        alignItems: 'center',
    }
});