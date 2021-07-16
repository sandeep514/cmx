import React, { useState } from "react";
import { ActivityIndicator, Keyboard } from "react-native";
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
import { LoginUser, showToast } from "../Api/client";
import { fontFamilyRegular } from "../components/Colors";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const [loader, setLoader] = useState(false);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const SigninUser = () => {
    // Keyboard.dismiss();
    setLoader(true);
    if (Email != undefined || Password != undefined) {
      LoginUser({ email: Email, password: Password }).then(
        (res) => {
          console.log("res", res);
          AsyncStorage.setItem("id", res.data.user.id.toString());
          AsyncStorage.setItem("name", res.data.user.name);
          AsyncStorage.setItem("email", res.data.user.email);
          AsyncStorage.setItem("mobile", res.data.user.mobile.toString());
          AsyncStorage.setItem("image", res.data.user.image);
          AsyncStorage.setItem(
            "home_mobile",
            res.data.user.home_mobile.toString()
          );
          AsyncStorage.setItem("role", res.data.user.role.toString());

          setLoader(false);
          navigation.push("Dashboard");
        },
        (err) => {
          console.log("err", err.data.errors);
          showToast("Wrong user details.");
          setLoader(false);
        }
      );
    } else {
      showToast("Required fields are missing.");
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={{ flex: 2.9, elevation: 10 }}>
        <Image
          source={require("../images/loginbackground.jpg")}
          style={{
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
      </View>

      <View style={{ flex: 6, paddingHorizontal: 20 }}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text
            style={
              (fontFamilyRegular,
              {
                fontSize: 25,
                textAlign: "center",
                marginTop: 20,
                marginBottom: 20,
                fontWeight: "bold",
              })
            }
          >
            Login
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <View>
            <Input
              placeholder="Email or Mobile"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(value) => {
                setEmail(value);
              }}
            />
          </View>
          <View>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "key" }}
              onChangeText={(value) => {
                setPassword(value);
              }}
            />
          </View>
          <View>
            {loader ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    textAlign: "center",
                    backgroundColor: "#2c2a3a",
                    borderRadius: 100,
                    padding: 16,
                    width: 50,
                    height: 50,
                  }}
                >
                  <ActivityIndicator size="small" color="white" />
                </View>
              </View>
            ) : (
              <Button
                buttonStyle={{
                  backgroundColor: "#2c2a3a",
                  borderRadius: 20,
                  padding: 12,
                  marginHorizontal: 40,
                }}
                title="Signin"
                onPress={() => {
                  SigninUser();
                }}
              ></Button>
            )}
          </View>
          <View style={{ justifyContent: "center", marginTop: 20 }}>
            <Text style={{ textAlign: "center" }}>Read all </Text>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ color: "skyblue" }}>Terms and condition</Text> ,{" "}
              <Text style={{ color: "skyblue" }}>Private Policy</Text>
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>
            © copyright reserved{" "}
            <Text style={{ fontWeight: "bold" }}>REALTOR CNX</Text>
          </Text>
        </View>
      </View>
    </View>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container:{
	  flex: 1
  }
});

export default Login;
