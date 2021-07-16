import React, { useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import { Pressable  } from 'react-native';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TextInput
} from 'react-native';
import { Input , Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { launchImageLibrary  ,launchCamera} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { addPost, showToast } from '../Api/client';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import FooterMenu from '../components/FooterMenu';
import Global from '../assets/css/global';

const Post = ({navigation}) => {
	const [textPost , setTextPost] = useState();
	const [baseImage , setBaseImage] = useState();
	const [imageWidth , setImageWidth] = useState();
	const [hasBaseImage , setHasBaseImage] = useState(false);
	const [PostUploadIndicator , setPostUploadIndicator] = useState(false);
	const cameraLaunch = () => {
		ImagePicker.openCamera({
			width: 1000,
			height: 1000,
			cropping: true,
		}).then(image => {
			console.log(image);
			if( image.size < 2000000 ){
				ImgToBase64.getBase64String(image.path).then((base64String) => {
					if( image.mime == "image/jpeg" ){
						image64 = 'data:image/jpeg;base64,'+base64String;
					}else{
						image64 = 'data:image/png;base64,'+base64String;
					}
					console.log(image64)
					setBaseImage(image64)
					setImageWidth(image.width)
					setHasBaseImage(true)
				}).catch((err) =>{  } );
			}else{
				alert('File size must be less than 2MB.');
			}
		},(err) => {

		});
		let options = {
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
			maxWidth: 2000,
			maxHeight: 1000,
			quality: 1
		};
		launchCamera(options, (res) => {
			console.log('Response = ', res);

			if (res.didCancel) {
				console.log('User cancelled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error: ', res.error);
			} else if (res.customButton) {
				console.log('User tapped custom button: ', res.customButton);
				alert(res.customButton);
			} else {
				if( res.assets[0].fileSize < 2000000 ){
					ImgToBase64.getBase64String(res.assets[0].uri).then((base64String) => {
						if( res.assets[0].type == "image/jpeg" ){
							image64 = 'data:image/jpeg;base64,'+base64String;
						}else{
							image64 = 'data:image/png;base64,'+base64String;
						}
						setBaseImage(image64)
						setImageWidth(response.assets[0].width)
						setHasBaseImage(true)
					}).catch((err) =>{  } );
				}else{
					alert('File size must be less than 2MB.');
				}
			}
		});
	}

	const handleChoosePhoto = (type) => {
		ImagePicker.openPicker({
			width: 1000,
			height: 1000,
			cropping: true
		}).then(image => {
			console.log(image);
			if( image.size < 2000000 ){
				ImgToBase64.getBase64String(image.path).then((base64String) => {
					if( image.mime == "image/jpeg" ){
						image64 = 'data:image/jpeg;base64,'+base64String;
					}else{
						image64 = 'data:image/png;base64,'+base64String;
					}
					setBaseImage(image64)
					setImageWidth(image.width)
					setHasBaseImage(true)
				}).catch((err) =>{ console.log(err) } );
			}else{
				alert('File size must be less than 2MB.');
			}
		},(err) => {
			console.log(err)
		});
		return false;
		launchImageLibrary({ noData: true,mediaType : 'photo',maxWidth: 2000,maxHeight: 1000, quality: 1,rotation: 0 }, (response) => {
			console.log(response)
			if(!response.didCancel ){
				if(response != undefined){
					if( response.assets[0].fileSize < 2000000 ){
						ImgToBase64.getBase64String(response.assets[0].uri).then((base64String) => {
							if( response.assets[0].type == "image/jpeg" ){
								image64 = 'data:image/jpeg;base64,'+base64String;
							}else{
								image64 = 'data:image/png;base64,'+base64String;
							}
							setBaseImage(image64)
							setImageWidth(response.assets[0].width)
							setHasBaseImage(true)
						}).catch((err) =>{  } );
					}else{
						alert('File size must be less than 2MB.');
					}
				}
			}
		});
	};

	const addPosts = () => {
		AsyncStorage.getItem('id').then((userId) => {

			if( userId != undefined && userId != null ){
				if( textPost != undefined && textPost.length > 0 && baseImage != undefined){
					Keyboard.dismiss()
					setPostUploadIndicator(true)
					addPost({user : userId , post: textPost,image: baseImage}).then((res) => {
						setPostUploadIndicator(false)
						showToast('Post uploaded successfully.');
						navigation.push('Dashboard')
						AsyncStorage.setItem("reload" , 'true');
					} , (err) => {
						setPostUploadIndicator(false)
						showToast("Something went wrong");
					});
					return false;
				}
				if( textPost != undefined && textPost.length > 0 ){
					Keyboard.dismiss()
					setPostUploadIndicator(true)
					addPost({user : userId , post: textPost}).then((res) => {
						setPostUploadIndicator(false)

						showToast('Post uploaded successfully.');
						navigation.push('Dashboard')
					} , (err) => {
						setPostUploadIndicator(false)
						showToast("Something went wrong");
					});
				}
				if( baseImage != undefined ){
					Keyboard.dismiss()
					setPostUploadIndicator(true)
					addPost({user : userId , image: baseImage}).then((res) => {
						setPostUploadIndicator(false)
	
						showToast('Post uploaded successfully.');
						// console.log(navigation)
						navigation.push('Dashboard')
					} , (err) => {
						setPostUploadIndicator(false)
						showToast("Something went wrong");
					});
				}
			}
		})

	}
  return (
	  <SafeAreaView style={Global.safeAreaViewContainer}>
		  <View style={{flex: 1, backgroundColor: '#f8f8f8',paddingTop: 15}}>
			
			<View style={{paddingHorizontal: 15,flex: 0.7,flexDirection: 'row',justifyContent:'space-between',borderBottomWidth: 0.3 , borderBottomColor: '#ededed',paddingBottom: 10}}>
				<View>
					<View style={{ marginTop: 7 ,flexDirection: 'row'}}>
						{/* <Image source={require('../images/img_avatar.png')}  style={{ width: 40,height: 40 ,borderRadius: 100}}/> */}
						<Pressable onPress={() => { navigation.navigate('Dashboard') }}>
							<Icon name="arrow-back" color="skyblue" style={{marginRight: 20}}/>
						</Pressable>
						<Text style={{fontSize: 20 ,fontWeight: 'bold',color: 'skyblue'}}>Create Post</Text>
					</View>
				</View>
				<View>
					{/* <Image source={require('../images/messenger.png')}  style={{ width: 25,height: 25}}/> */}
					{(!PostUploadIndicator) ? 
						<Pressable style={{backgroundColor: '#4176f1',paddingVertical: 10,paddingHorizontal: 15,borderRadius: 7}} onPress={() => { addPosts() }}> 
							<Text style={{color: 'white',fontSize: 15}}>Post</Text>
						</Pressable>
					:
						<ActivityIndicator color="white" style={{backgroundColor: '#4176f1',paddingVertical: 10,paddingHorizontal: 15,borderRadius: 7}} />
					}
					{/* {( textPost != undefined|| hasBaseImage || textPost != '' ) ?
					:
						<Pressable style={{backgroundColor: '#e8e8e8',paddingVertical: 10,paddingHorizontal: 15,borderRadius: 7}}> 
							<Text style={{color: '#000',fontSize: 15}}>Post</Text>
						</Pressable>
					} */}
				</View>
			</View>
			

			<View style={{flex: 10}}>
				<ScrollView vertical={true}>
                    <View style={{flex: 3}}>
                        {/* <Text style={{fontSize: 15,fontWeight: '800',paddingVertical: 10}}>LAST CONVERSATIONS</Text> */}
                        <View style={{}}>
                            
                            <View style={{width: '100%',flexDirection: 'row'}}>
								<Image source={require('../images/images.jpg')}  style={{ marginTop: 10,marginLeft: 10,width: 60,height: 60 ,borderRadius: 100,marginRight: 10}}/>
                                <Text style={{fontWeight: 'bold',fontSize: 20 , marginTop: 15}}>Vinay Sharma</Text>
                            </View>
                           
                        </View>
                    </View>
                    <View>
                       
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                placeholder="What's in your mind?"
                                placeholderTextColor="#969698"
                                style={{ fontSize: 27,height:300,marginLeft: 7, textAlignVertical: 'top',borderBottomWidth: 2,borderBottomColor: '#ededed'}}
                                onChange={(value) => {  setTextPost(value.nativeEvent.text) } }
                            />
                    </View>
					{( hasBaseImage )?	
						<View style={{width: '100%',alignItems: 'center'}}>
							<View style={{width: 200}}>
								<Image source={{ uri: baseImage }} style={{width: '100%' , height: 200}}/>
							</View>
						</View>				
					:
						<View>
						</View>
					}
                    <View>
                        <View>
                            <View style={{borderTopWidth: 1 , borderTopColor: '#ededed',padding: 2,flexDirection: 'column',justifyContent: 'space-around'}}>

                                <View style={{paddingVertical: 15,paddingHorizontal: 10,borderBottomColor: '#ededed',borderBottomWidth: 1}}>
                                    <Pressable onPress={() => {cameraLaunch()}} style={{flexDirection: 'row'}}>
                                        <Icon name="photo-library" color="lightgreen" size={30} />
                                        <Text style={{ marginTop: 6,fontWeight: '600',marginLeft: 10 }}>Photo</Text>
                                    </Pressable>
                                </View>

                                <View style={{paddingVertical: 15,paddingHorizontal: 10,borderBottomColor: '#ededed',borderBottomWidth: 1}}>
                                    <Pressable onPress={() => {handleChoosePhoto()}} style={{flexDirection: 'row'}}>
                                        <Icon name="camera-alt" color="skyblue" size={30} />
                                        <Text style={{ marginTop: 6,fontWeight: '600',marginLeft: 10 }}>Camera</Text>
                                    </Pressable>
                                </View>
                                <View style={{paddingVertical: 15,paddingHorizontal: 10,borderBottomColor: '#ededed',borderBottomWidth: 1}}>
                                    <Pressable onPress={() => { navigation.push('Recomendation') }} style={{flexDirection: 'row'}}>
                                        <Icon name="insert-comment" color="green" size={30} />
                                        <Text style={{ marginTop: 6,fontWeight: '600',marginLeft: 10 }}>Ask For Recommendation</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
					<View style={{height: 10}}>

					</View>
				</ScrollView>
			</View>
				<FooterMenu></FooterMenu>
		</View>
	  </SafeAreaView>
		
  );
};

const styles = StyleSheet.create({
	post: {
		borderColor: '#cfcfcf',
		borderWidth: 2, 
		// borderRadius: 10,
		overflow: 'hidden',
		// marginTop: 20
	},
    textAreaContainer: {
        borderColor: '#ededed',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 250,
        justifyContent: "flex-start",
        borderColor: 'red',
        borderWidth: 2
    }
});

export default Post;
