import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "./db";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const handleRegister = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    db.collection("users").doc(
      firebase.auth().currentUser.uid.update({ display: "", photoURL: "" })
    );
  };
  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else if (!user) {
    return (
      <View style={styles.login}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "100%",
            textAlign: "center",
            alignSelf: "center",
            marginBottom: 5
          }}
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "100%",
            textAlign: "center",
            alignSelf: "center"
          }}
          onChangeText={setPass}
          placeholder="Password"
          value={password}
        />
        <View style={{ flexDirection: "row" }}>
          <Button style={{}} title="Login" onPress={() => handleLogin()} />
          <Button title="Register" onPress={() => handleRegister()} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  login: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center"
  }
});
