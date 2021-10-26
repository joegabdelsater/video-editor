import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const GalleryItemComponent = ({ item, onLongPress, onItemSelect, onItemDeselect }) => {
    const [selected, setSelected] = useState(false);


    const toggle = () => {
        if(!selected) {
            onItemSelect(item.node.image.uri)
        } else {
            onItemDeselect(item.node.image.uri)
        }
        setSelected(!selected)
    }

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={toggle}
            onLongPress={() => onLongPress(item.node.image.uri)}
        >
            <View style={[styles.selectButton,  selected ? styles.buttonSelected : {}]}></View>
            <Image
                style={styles.image}
                source={{ uri: item.node.image.uri }}
            />
        </TouchableOpacity>)

}

export default GalleryItemComponent

const styles = StyleSheet.create({
    selectButton: {
        height: 20,
        width: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#cecece',
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 5,
        elevation: 1,
    },
    buttonSelected: { backgroundColor: 'blue'},
    image: { width: '100%', height: '100%' },
    itemContainer: { width: '33%', height: 100 }

})