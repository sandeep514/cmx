import AsyncStorage from "@react-native-community/async-storage";
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
  Modal,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { getPosts, showToast } from "../Api/client";
import FooterMenu from "../components/FooterMenu";
import { Dimensions } from "react-native";
import Global from '../assets/css/global';

const Dashboard = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [filePath, setFilePath] = useState({});
  const isDarkMode = useColorScheme() === "dark";
  const [loader, setLoader] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listPosts, setListPosts] = useState({});
  const [listPostsLoader, setListPostsLoader] = useState(false);

  useEffect(() => {
    console.log(navigation);
    setLoader(false);
    AsyncStorage.setItem("currentPage", "home");
    getListPosts();
  }, []);

  function getListPosts() {
    setListPostsLoader(true);
    getPosts().then(
      (res) => {
        console.log(res);
        setListPosts(res.data.message);
        setListPostsLoader(false);
      },
      (err) => {
        showToast("No new Post available");
        setListPostsLoader(false);
      }
    );
  }
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (res) => {
      if (res.didCancel) {
      } else if (res.error) {
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        // const source = { uri: res.uri };
      }
    });
  };

  const handleChoosePhoto = (type) => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.fileSize != undefined) {
        if (response.fileSize < 2000000) {
          setRC(response);
          ImgToBase64.getBase64String(response.uri)
            .then((base64String) => {
              if (response.type == "image/jpeg") {
                image64 = "data:image/jpeg;base64," + base64String;
              } else {
                image64 = "data:image/png;base64," + base64String;
              }
            })
            .catch((err) => {});
        } else {
          alert("File size must be less than 2MB.");
        }
      }
    });
  };
  const openComments = () => {
    setModelOpen(true);
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={Global.safeAreaViewContainer}>
      <View style={{ flex: 1, backgroundColor: "#f8f8f8", paddingTop: 15 }}>
        <View
          style={{
            paddingHorizontal: 15,
            flex: 0.7,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 0.3,
            borderBottomColor: "#ededed",
            paddingBottom: 10,
          }}
        >
          <View>
            <View style={{ marginTop: 13 }}>
              {/* <Image source={require('../images/img_avatar.png')}  style={{ width: 40,height: 40 ,borderRadius: 100}}/> */}
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Company Name
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: "#e8e8e8",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              {/* <Image source={require('../images/messenger.png')}  style={{ width: 25,height: 25}}/> */}
              <Icon name="search" color="black" />
            </View>
          </View>
        </View>

        {modelOpen ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalText}>Comments</Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 10 }}>
                        <Image
                          source={require("../images/images.jpg")}
                          style={{
                            marginTop: 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: "#ededed",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 100,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Divine
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13 }}>
                            This is my comment.
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: "grey", marginLeft: 80 }}>
                        24m ago
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  borderTopColor: "#ededed",
                  borderTopWidth: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  placeholder="Add Comment"
                  style={{ maxWidth: "80%" }}
                />
                <Icon
                  name="send"
                  style={{
                    padding: 10,
                    backgroundColor: "#517edf",
                    borderRadius: 100,
                    marginTop: 10,
                  }}
                  color="white"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <View></View>
        )}

        <View style={{ flex: 10 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical={true}
          >
            <View style={{ flex: 3 }}>
              {/* <Text style={{fontSize: 15,fontWeight: '800',paddingVertical: 10}}>LAST CONVERSATIONS</Text> */}
              <View style={{ borderWidth: 1, borderColor: "#ededed" }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    paddingVertical: 10,
                  }}
                >
                  <Image
                    source={require("../images/images.jpg")}
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                    }}
                  />

                  <Pressable
                    style={{ width: "100%" }}
                    onPress={() => {
                      navigation.push("Post");
                    }}
                  >
                    <Text style={{ fontSize: 18, marginTop: 15, marginLeft: 10 }}>
                      What is in your mind.
                    </Text>
                  </Pressable>
                  {/* <Input
                      placeholder="What's in your mind."
                      placeholderTextColor="black"
                      onChangeText={(value) => { comment: value }}
                      inputContainerStyle={{borderBottomWidth:0,color: 'black',marginTop: 10}}
                      style={{ fontSize: 15 }}

                    /> */}
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ededed",
                    padding: 2,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ paddingVertical: 5 }}>
                    <Pressable
                      onPress={() => {
                        cameraLaunch();
                      }}
                      style={{ flexDirection: "row" }}
                    >
                      <Icon name="photo-library" color="lightgreen" size={30} />
                      <Text style={{ marginTop: 6, fontWeight: "600" }}>
                        Photo
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{ borderRightColor: "#ededed", borderRightWidth: 1 }}
                  ></View>
                  <View style={{ paddingVertical: 5 }}>
                    <Pressable
                      onPress={() => {
                        handleChoosePhoto();
                      }}
                      style={{ flexDirection: "row" }}
                    >
                      <Icon name="camera-alt" color="skyblue" size={30} />
                      <Text style={{ marginTop: 6, fontWeight: "600" }}>
                        Photo
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            {listPostsLoader ? (
              <View>
                <ActivityIndicator color="skyblue" />
              </View>
            ) : (
              <View></View>
            )}
            {listPosts.length > 0 ? (
              listPosts.map((value, key) => {
                return (
                  <View style={styles.post} key={key}>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRIght: 10,
                      }}
                    >
                      <View
                        style={{
                          marginRight: 10,
                          borderWidth: 2,
                          borderColor: "#5988c3",
                          borderRadius: 100,
                          padding: 3,
						   width: 50, height: 50
                        }}
                      >
                        {/* <Image source={require('../images/images.jpg')}  style={{ width: 40,height: 40 ,borderRadius: 100}}/> */}
                        <Image
                          source={{ uri: value.user.image }}
                          style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                      </View>
                      <View style={{ marginTop: 4 }}>
                        <View style={{ flexDirection : "row"}}>
                          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            {value.user.name} 
							{ (value.post_type == 'reco')? <Icon name="insert-comment" color="green" size={15} style={{marginHorizontal: 5}} />:<Text></Text>}
							<Text style={{ fontWeight: "normal", fontSize: 12 ,borderWidth: 2, borderColor: 'red'}}>
							{ (value.post_type == 'reco'  && windowWidth <= 400)? ' is looking for \n recommendations.' : '' }
							{ (value.post_type == 'reco'  && windowWidth > 400)? ' is looking for recommendations.' : '' }
							</Text>
                          </Text>
						  
						  
                        </View>
                        <View>
                          <Text style={{ color: "grey", fontSize: 12 }}>
                            {value.created_at}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {value.post != null && value.post != "" ? (
                      <View
                        style={{
                          paddingHorizontal: 10,
                          marginTop: 10,
                          paddingVertical: 10,
                        }}
                      >
                        <Text>{value.post} </Text>
                      </View>
                    ) : (
                      <View></View>
                    )}
                    {value.image != null && value.image != "" ? (
                      <View
                        style={{
                          marginTop: 10,
                          width: "100%",
                          height: windowWidth,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{ uri: value.image }}
                          style={{ width: windowWidth, height: windowHeight / 2 }}
                        />
                        {/* <Image source={{ uri: value.image }}  style={{ width: '100%',height: 250,transform: [{ rotate: '90deg' }]}} /> */}
                      </View>
                    ) : (
                      <View></View>
                    )}

                    <View
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: "#ededed",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View style={{ paddingVertical: 5 }}>
                        <Pressable
                          onPress={() => {}}
                          style={{ flexDirection: "row" }}
                        >
                          <Icon
                            name="thumb-up"
                            color="white"
                            size={15}
                            style={{
                              backgroundColor: "#517edf",
                              padding: 4,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              marginTop: 3,
                              fontWeight: "600",
                              color: "#a1a1a1",
                              marginLeft: 4,
                              fontSize: 16,
                            }}
                          >
                            129
                          </Text>
                        </Pressable>
                      </View>
                      <View style={{ paddingVertical: 5 }}>
                        <Pressable
                          onPress={() => {}}
                          style={{ flexDirection: "row" }}
                        >
                          {/* <Icon name="chat-bubble-outline" color="#7b7b7b" style={{marginTop: 5}} /> */}
                          <Text
                            style={{
                              marginTop: 6,
                              fontWeight: "600",
                              color: "#868686",
                              marginLeft: 4,
                              fontSize: 16,
                            }}
                          >
                            4
                          </Text>
                          <Text
                            style={{
                              marginTop: 6,
                              fontWeight: "600",
                              color: "#868686",
                              marginLeft: 4,
                              fontSize: 16,
                            }}
                          >
                            Comments
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: "#ededed",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ paddingVertical: 5 }}>
                        <Pressable
                          onPress={() => {}}
                          style={{ flexDirection: "row" }}
                        >
                          <Icon
                            name="thumb-up-off-alt"
                            color="#808080"
                            size={30}
                          />
                          <Text
                            style={{
                              marginTop: 6,
                              fontWeight: "600",
                              color: "#868686",
                              marginLeft: 4,
                              fontSize: 16,
                            }}
                          >
                            Like
                          </Text>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          borderRightColor: "#ededed",
                          borderRightWidth: 1,
                        }}
                      ></View>
                      <View style={{ paddingVertical: 5 }}>
                        <Pressable
                          onPress={() => {
                            openComments();
                          }}
                          style={{ flexDirection: "row" }}
                        >
                          <Icon
                            name="chat-bubble-outline"
                            color="#7b7b7b"
                            style={{ marginTop: 5 }}
                          />
                          <Text
                            style={{
                              marginTop: 6,
                              fontWeight: "600",
                              color: "#868686",
                              marginLeft: 4,
                              fontSize: 16,
                            }}
                          >
                            Comment
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View></View>
            )}
            <View style={{ height: 10 }}></View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.7,
            backgroundColor: "white",
            borderTopColor: "#ededed",
            borderTopWidth: 4,
          }}
        >
          <FooterMenu></FooterMenu>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    borderTopColor: "#cfcfcf",
    borderTopWidth: 5,
    // borderRadius: 10,
    overflow: "hidden",
    // marginTop: 20
  },
  centeredView: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 40,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 250,
  },
  modalText: {
    textAlign: "center",
    borderBottomColor: "#ededed",
    borderBottomWidth: 2,
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  
});

export default Dashboard;
