import "@styles/global.css";
import { useEffect } from "react";
import Script from "next/script";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAnyQzUmFahQiH8XBsJfCJY8ogZvUT8o8E",
  authDomain: "avif-a6e25.firebaseapp.com",
  databaseURL: "https://avif-a6e25.firebaseio.com",
  projectId: "avif-a6e25",
  storageBucket: "avif-a6e25.appspot.com",
  messagingSenderId: "1077707178739",
  appId: "1:1077707178739:web:c98c39aae900425defad86",
  measurementId: "G-Z25VRG05C4",
};

export default function AvifIo({ Component, pageProps }: any) {
  useEffect(arrayBufferPolyfill, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const app = initializeApp(firebaseConfig);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const analytics = getAnalytics(app);
    }
  }, []);

  return (
    <>
      <Script strategy="beforeInteractive" src="/avif.js" />
      {/*<Script strategy="afterInteractive" src="/hotjar.js" />*/}
      <div className="overflow-x-hidden page">
        <Component {...pageProps} />
      </div>
    </>
  );
}

// Poylfill mostly for Safari
function arrayBufferPolyfill() {
  File.prototype.arrayBuffer = File.prototype.arrayBuffer || myArrayBuffer;
  Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || myArrayBuffer;

  function myArrayBuffer(this: File | Blob): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result as ArrayBuffer);
      };
      fr.readAsArrayBuffer(this);
    });
  }
}
