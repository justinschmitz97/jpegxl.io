const Ad = () => {
  return (
    <div className="block my-6 w-full">
      <ins
        className="block w-full text-center rounded-md border-2 border-bg-400 adsbygoogle"
        style={{ backgroundColor: "#091c1b" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4499854243209236"
        data-ad-slot="3895493968"
      ></ins>
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({})`}</script>
    </div>
  );
};

export default Ad;
