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
  databaseUrl: "https://jpegxl-8164f-default-rtdb.firebaseio.com/",
};

export default function AvifIo({ Component, pageProps }: any) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    }
  }, []);

  return (
    <>
      <Script strategy="beforeInteractive" src="/detectSupport.js" />
      <Script strategy="beforeInteractive" src="/detectSupport-jxl.js" />
      <Script
        strategy="lazyOnload"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4499854243209236"
      />
      <div className="overflow-x-hidden page">
        <Component {...pageProps} />
      </div>
      <a
        className="fixed bottom-2 left-2 invisible z-50 py-1 px-2 w-auto rounded-sm md:visible bg-bg-300 text-tiny"
        href={`mailto:support@jpegxl.io`}
        target="_blank"
        rel="noreferrer"
      >
        Report an issue
      </a>
    </>
  );
}
