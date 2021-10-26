import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg';

const EditorScreen = ({ navigation, route }) => {
    const { selectedVideos } = route.params
    const [selectedVideo, setSelectedVideo] = useState(null);

     const handleSelect = (uri) => {
        setSelectedVideo(uri)
     }

     const handlePress = () => {
        RNFFmpeg.execute(`-ss 00:00:05 -i ${selectedVideo} -to 00:00:10`).then(result => console.log(`FFmpeg process exited with rc=${result}.`));
     }

    return (
        <SafeAreaView>
            <StatusBar />

            <FlatList
                data={selectedVideos}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <EditedVideoThumbnail
                    uri={item}
                    onSelect={handleSelect}
                    selectedUri={selectedVideo}
                />}>
            </FlatList>

            <Button 
            title='test'
            onPress={handlePress}
            />
        </SafeAreaView>
    )
}

const EditedVideoThumbnail = ({ uri, onSelect, selectedUri }) => {
    console.log(uri)
    console.log(selectedUri)

    useEffect(() => {}, [selectedUri])

    return (
        <TouchableOpacity style={[ selectedUri == uri ? styles.imageBorder : {}]} onPress={() => onSelect(uri)}>
            <Image source={{ uri: uri }} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
    )
}

export default EditorScreen

const styles = StyleSheet.create({
    imageBorder: {
        borderWidth: 4,
        borderColor: 'blue'
    }
})