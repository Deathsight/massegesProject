import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet, View, Image } from "react-native";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import db from "../db";
import { recoveredProps } from "expo-error-recovery";
import { from } from "rxjs/observable/from";

export default ({ message, hamdleEdit }) => {
  useEffect(() => {
    handleUser();
  }, []);
  const [user, setUser] = useState(null);

  const handleUser = async () => {
    const snap = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    console.log("PhotoURL", snap.data());
    setUser(snap.data());
  };

  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
  };

  return (
    user && (
      <>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: user.photoURL }}
        />
        <View>
          <Text style={{ backgroundColor: "lightgray" }} numberOfLines={2}>
            from {user.displayName} to {message.to} :{message.message}
          </Text>
          <Button title="X" onPress={() => handleDelete(message)} />
          <Button title="U" onPress={() => handleEdit(message)} />
        </View>
      </>
    )
  );
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
