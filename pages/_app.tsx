import "@styles/global.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNoLouFnI-wU9VCmJh5deOnqvSe3KhaXY",
  authDomain: "justinschmitz-97.firebaseapp.com",
  projectId: "justinschmitz-97",
  storageBucket: "justinschmitz-97.appspot.com",
  messagingSenderId: "296151736700",
  appId: "1:296151736700:web:02c61aabc04cc453cf04f9"
};

export default function App({ Component, pageProps }: any) {
      const app = initializeApp(firebaseConfig);
  return <Component {...pageProps} />;
}
