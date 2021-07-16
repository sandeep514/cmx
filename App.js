import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Pressable } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { fontFamilyRegular } from "./components/Colors";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import Post from "./Views/Post";
import Recomendation from "./Views/Recomendation";
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  const [isUser, SetIsUser] = useState(false);
  const Stack = createStackNavigator();
  useEffect(() => {
    AsyncStorage.getItem("name").then((username) => {
      if (username != null) {
        SetIsUser(true);
      }
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          options={{ headerShown: false }}
          component={Dashboard}
        />
        <Stack.Screen
          name="Post"
          options={{ headerShown: false }}
          component={Post}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Recomendation"
          options={{ headerShown: false }}
          component={Recomendation}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});
export const exportedStyles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1
  }
});


export default App;
