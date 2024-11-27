import app from "../config/firebase.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createClient } from "@supabase/supabase-js";

// const storage = getStorage(app, "gs://my-custom-bucket");

const supabaseUrl = "https://xsdzkvctceyxhipwoaht.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZHprdmN0Y2V5eGhpcHdvYWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NDU1MTUsImV4cCI6MjA0ODAyMTUxNX0.s-ne_TRLPGOTPkwnSzfosjo1k4Ahg3MwVRC7KNrps3A";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function uploadMedia(file) {
  if (!file) {
    console.log("No file selected");
    return;
  }

  // const fileRef = ref(storage, file.name);

  // return uploadBytes(fileRef, file);
}

export function uploadMediaToSupabase(file) {
  if (!file) {
    console.log("No file selected");
    return;
  }
  return supabase.storage.from("Images").upload(file.name, file, {
    cacheControl: "3600",
    upsert: false,
  });
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
