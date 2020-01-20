import * as WebBrowser from "expo-web-browser";
import db from "../db";
import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Picker
} from "react-native";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState("to");
  const [from, setFrom] = useState("fron");
  const [input, setInput] = useState("message");
  const [id, setId] = useState("id");

  useEffect(() => {
    db.collection("messages").onSnapshot(querySnapshot => {
      const masseges = [];
      querySnapshot.forEach(doc => {
        masseges.push({ id: doc.id, ...doc.data() });
      });
      console.log("Current masseges in DB: ", masseges.join(", "));
      setMessages([...masseges]);
    });
  }, []);
  const handleEdit = item => {
    setFrom(item.from);
    setTo(item.to);
    setInput(item.message);
    setId(item.id);
  };
  const handleSend = () => {
    if (id) {
      db.collection("messages")
        .doc(id)
        .update({ from, to, message: input });
    } else {
      db.collection("messages").add({ from, to, message: input });
    }
    setFrom("");
    setTo("");
    setInput("");
    setId("");
  };
  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
  };
  const handleNew = message => {
    db.collection("messages").add({
      to,
      from,
      message: input
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", paddingTop: 30 }}>
        <Button title="Add a Message" onPress={() => handleNew()} />
      </View>
      <ScrollView style={{ flex: 2, marginTop: 75 }}>
        {messages.map((item, i) => (
          <View>
            <Text
              key={i}
              style={{ backgroundColor: "lightgray" }}
              numberOfLines={2}
            >
              from {item.from} to {item.to} :{item.message}
            </Text>
            <Button title="X" onPress={() => handleDelete(item)} />
            <Button title="U" onPress={() => handleEdit(item)} />
          </View>
        ))}
      </ScrollView>
      <View style={{}}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => setFrom(text)}
          value={from}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => setTo(text)}
          value={to}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => setInput(text)}
          value={input}
        />

        <Button title="send" onPress={() => handleSend()} />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

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
