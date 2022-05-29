import "../styles.css";
import Script from "next/script";

export default function AvifIo({ Component, pageProps }: any) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4499854243209236"
      />
      <div className="overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </>
  );
}
