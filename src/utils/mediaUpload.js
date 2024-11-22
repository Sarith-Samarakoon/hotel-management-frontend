import app from "../config/firebase.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, "gs://my-custom-bucket");

export default function uploadMedia(file) {
  if (!file) {
    console.log("No file selected");
    return;
  }

  const fileRef = ref(storage, file.name);

  return uploadBytes(fileRef, file);
}

/*
.then((snapshot) => {
  getDownloadURL(snapshot.ref).then((url) => {
    console.log("File uploaded successfully:", url);
  });
});
*/

/*
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFileToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const storageRef = ref(storage, uploads/${file.name});

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

*/