import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

const FooterMenu = ({}) => {
  const [activePage, setActivePage] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("currentPage").then((page) => {
      setActivePage(page);
    });
  });

  const goToPage = (Goto) => {
    AsyncStorage.setItem("currentPage", Goto);
    if (Goto == "home") {
      navigation.navigate("Dashboard");
    }
    if (Goto == "chat") {
      // navigation.navigate()
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around",backgroundColor:'white' }}>
      <Pressable
        onPress={() => {
          goToPage("home");
        }}
        style={{
          justifyContent: "space-evenly",
          borderRightColor: "grey",
          minWidth: 50,
          borderTopWidth: 3,
          borderTopColor: "#3978e6",
        }}
      >
        <Icon size={30} name="home" color="#3978e6" />
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={{ justifyContent: "center", paddingVertical: 10, minWidth: 50 }}
      >
        <Icon size={30} name="store" color="grey" />
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={{ borderRightColor: "grey", paddingVertical: 10, minWidth: 50 }}
      >
        <Icon size={30} name="supervised-user-circle" color="grey" />
      </Pressable>
      <Pressable
        onPress={() => {
          goToPage("chat");
        }}
        style={{ borderRightColor: "grey", paddingVertical: 10, minWidth: 50 }}
      >
        <Icon size={25} name="messenger" type="fontisto" color="grey" />
      </Pressable>

      <Pressable
        onPress={() => {
          AsyncStorage.clear(), navigation.navigate("Login");
        }}
        style={{ paddingVertical: 10, minWidth: 50 }}
      >
        <Icon size={30} name="lock" color="red" />
        {/* <Text style={{ textAlign: "center" }}>LOGOUT</Text> */}
      </Pressable>
    </View>
  );
};
export default FooterMenu;
