/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  Button,
  View,
  PermissionsAndroid,
  Platform,
  Text,
  StyleSheet
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import GalleryItemComponent from '../Components/GalleryItemComponent';
import Video from 'react-native-video';

const GalleryScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoPreviewUri, setVideoPreviewUri] = useState('');
  const [selectedVideos, setSelectedVideos] = useState([]);

  useEffect(() => {
    askPermission();
  }, []);

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Videos',
    })
      .then((res) => {
        setPhotos(res.edges);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };

  const showVideo = () => setVideoVisible(true)
  const hideVideo = () => setVideoVisible(false)

  const handleItemLongPress = (uri) => {
    setVideoPreviewUri(uri);
    showVideo();
  }

  const handleItemSelect = (uri) => {
    let selectedVideosCopy = [...selectedVideos]
    selectedVideosCopy.push(uri)
    setSelectedVideos(selectedVideosCopy)
  }

  const handleItemDeselect = (uri) => {
    let selectedVideosCopy = [...selectedVideos]
    const index = selectedVideosCopy.indexOf(uri)

    if (index > -1) {
      selectedVideosCopy.splice(index,1)
    }

    setSelectedVideos(selectedVideosCopy)
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Button
        title="Done"
        onPress={() => navigation.navigate('Editor',  {selectedVideos})}
      />
      <FlatList
        data={photos}
        numColumns={3}
        renderItem={({ item }) => <GalleryItemComponent
          item={item}
          onLongPress={handleItemLongPress}
          onItemSelect={handleItemSelect}
          onItemDeselect={handleItemDeselect}
        />}>
      </FlatList>

      {videoVisible && <View style={styles.videoPopup}>
        <View>
          <Button
            title="CLOSE"
            onPress={hideVideo}
          />
        </View>
        <Video
          resizeMode="contain"
          source={{ uri: videoPreviewUri }}
          style={styles.video} />
      </View>}
    </SafeAreaView>
  );
};


export default GalleryScreen;

const styles = StyleSheet.create({
  video: {
    height: 300,
    width: 350

  },
  videoPopup: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%'
  }
})


