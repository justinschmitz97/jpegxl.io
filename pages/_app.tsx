import "@styles/global.css";
import { useEffect } from "react";
import Script from "next/script";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChFA56DSf3-p_4NoViFaQkMr8T8Q0UJyU",
  authDomain: "jpegxl-8164f.firebaseapp.com",
  projectId: "jpegxl-8164f",
  storageBucket: "jpegxl-8164f.appspot.com",
  messagingSenderId: "1054719837554",
  appId: "1:1054719837554:web:5c5d13fdb02436b217c9eb",
  measurementId: "G-12SZR00CGD",
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
      <Script strategy="beforeInteractive" src="/detectSupport.js" />
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