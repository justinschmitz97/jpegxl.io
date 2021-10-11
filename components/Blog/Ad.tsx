import React from "react";

const Ad = () => {
  return (
    <div className="block w-full">
      <ins
        className="block my-6 w-full text-center adsbygoogle"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4499854243209236"
        data-ad-slot="9846855571"
      ></ins>
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({})`}</script>
    </div>
  );
};

export default Ad;
