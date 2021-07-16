import AsyncStorage from "@react-native-community/async-storage";
import { create } from "apisauce";
import Toast from "react-native-simple-toast";
import axios from "axios";
let apiClient = create({
  baseURL:
    "http://singhengineeringaustralia.com/real-estate.singhengineeringaustralia.com/public/api/",
  headers: {
    Accept: "application/json",
  },
});

export const getRandString = () => {
  let r = Math.random().toString(36).substring(7);
  return r;
};
export const showToast = (message, type) => {
  Toast.show(message);
};
export const registerUser = () => {
  return new Promise((resolve, reject) => {
    apiClient.post("register", data).then((response) => {
      if (response.data.status == true) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const addPost = (data) => {
  return new Promise((resolve, reject) => {
    apiClient.post("posts/save", data).then((response) => {
      if (response.data.status == true) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("id").then((userId) => {
      apiClient
        .post("get/Department/posts", { userId: userId })
        .then((response) => {
          if (response.data.status == true) {
            resolve(response);
          } else {
            reject(response);
          }
        });
    });
  });
};

export const LoginUser = (LoginDetails) => {
  return new Promise((resolve, reject) => {
    apiClient
      .post("login", LoginDetails)
      .then((response) => {
        console.log("response", response);
        if (response?.data?.status == "success") {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log("LoginUser err", error);
        reject(error);
      });
  });
};
// export const imagePre= 'http://tsbcab.com/admin/public/';
// export const register = (data) => {
//     return new Promise( (resolve , reject) => {
// 		apiClient.post('register' , data).then((response) =>
// 			{
// 				console.log(response.data);
// 				if(response.data.status == true){
// 					resolve(response);
// 				}else{
// 					reject(response);
// 				}
// 			}
// 		);
// 	});
// }
