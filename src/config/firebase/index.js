import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCP1uk92woCcaJJ5yp6QdV6XXd2SC4Wrdw",
    authDomain: "simple-note-b08ef.firebaseapp.com",
    projectId: "simple-note-b08ef",
    storageBucket: "simple-note-b08ef.appspot.com",
    messagingSenderId: "695006460090",
    appId: "1:695006460090:web:8f90b6c71c3b06f5caea83",
    measurementId: "G-DJ23YZ8ES4"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);

export default app;