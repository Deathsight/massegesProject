import React, { useState, useEffect } from "react";
import { ExpoConfigView } from "@expo/samples";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import db from "../db";
import * as firebase from "firebase/app";
import "firebase/auth";
export default function SettingsScreen() {
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(false);
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const [displayName, setDisplayName] = useState();
  const [photoURL, setPhotoURL] = useState();

  const askPermission = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    setHasCameraRollPermission(status === "granted");
  };

  const handleSet = async () => {
    const info = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    setDisplayName(info.data().displayName);
    setPhotoURL(info.data().photoURL);
  };
  useEffect(() => {
    handleSet();
  }, []);

  const handleSave = () => {
    //firebase.auth().currentUser.updateProfile({displayName,photoURL});
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({
        displayName,
        photoURL
      });

    handleSet();
  };
  const handlePickImage = () => {
    // show camera roll and pick an image to upload.
    // use firebase storage for uploading images.
    // set the the name of images to the use uid to clearify the uniques of each image
    // get the url and set it as the porfile avatar (photURL).
  };

  return (
    <View style={styles.container}>
      <Text>Display Name</Text>

      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Dispaly Name"
        onChangeText={text => setDisplayName(text)}
        value={displayName}
      />
      <Image source={{ uri: photoURL }} style={{ width: 184, height: 184 }} />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Photo URL"
        onChangeText={text => setPhotoURL(text)}
        value={photoURL}
      />
      <Button title="Upload Image" onPress={handlePickImage} />
      <Button title="Save" onPress={() => handleSave()} />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "Setting"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 100,
    marginTop: 10
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
    paddingTop: 50
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
