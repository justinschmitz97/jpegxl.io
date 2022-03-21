import Link from "@components/Link";

const posts = [
  ["⏩GENERAL INFORMATION", "%E2%8F%A9generalinformation"],
  ["Introduction", "introduction"],
  ["What is a JPEG XL file?", "whatisajpegxlfile?"],
  ["What is the file extension JXL?", "whatisthefileextensionjxl?"],
  ["What are the benefits of JPEG XL?", "whatarethebenefitsofjpegxl?"],
  ["What is the downside of JPEG XL?", "whatisthedownsideofjpegxl?"],
  [
    "Why is a new image format like JPEG XL needed?",
    "whyisanewimageformatlikejpegxlneeded?",
  ],
  ["What is the primary goal of JXL?", "whatistheprimarygoalofjxl?"],
  ["Who created JPEG XL?", "whocreatedjpegxl?"],
  [
    "Who are the key contributors of JPEG XL?",
    "whoarethekeycontributorsofjpegxl?",
  ],
  ["Why is JPEG XL called JPEG XL?", "whyisjpegxlcalledjpegxl?"],
  ["Since when does JPEG XL exist?", "sincewhendoesjpegxlexist?"],
  ["What is the timeline of JPEG XL?", "whatisthetimelineofjpegxl?"],
  ["Is JPEG XL based on other formats?", "isjpegxlbasedonotherformats?"],
  ["Is JPEG XL royalty-free?", "isjpegxlroyalty-free?"],
  ["Is there a Standard for JPEG XL?", "isthereastandardforjpegxl?"],
  ["⏩BASIC FEATURES", "%E2%8F%A9basicfeatures"],
  ["What features does JPEG XL support?", "whatfeaturesdoesjpegxlsupport?"],
  [
    "Does JPEG XL support alpha transparency?",
    "doesjpegxlsupportalphatransparency?",
  ],
  ["Does JPEG XL support animation?", "doesjpegxlsupportanimation?"],
  [
    "Does JXL support progressive decoding?",
    "doesjxlsupportprogressivedecoding?",
  ],
  ["Does JPEG XL support HDR?", "doesjpegxlsupporthdr?"],
  [
    "What is the highest megapixel count for JPEG XL?",
    "whatisthehighestmegapixelcountforjpegxl?",
  ],
  ["⏩COMPRESSION FEATURES", "%E2%8F%A9compressionfeatures"],
  ["How does JPEG XL optimize my images?", "howdoesjpegxloptimizemyimages?"],
  [
    "Does JPEG XL support lossless compression?",
    "doesjpegxlsupportlosslesscompression?",
  ],
  [
    "Does JPEG XL support lossy compression?",
    "doesjpegxlsupportlossycompression?",
  ],
  [
    "Is JPEG XL suitable for low-fidelity images?",
    "isjpegxlsuitableforlow-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for medium-fidelity images?",
    "isjpegxlsuitableformedium-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for high-fidelity images?",
    "isjpegxlsuitableforhigh-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for non-photographic images?",
    "isjpegxlsuitablefornon-photographicimages?",
  ],
  [
    "How much file size does lossless JPEG XL save?",
    "howmuchfilesizedoeslosslessjpegxlsave?",
  ],
  [
    "How much file size does lossy JPEG XL save?",
    "howmuchfilesizedoeslossyjpegxlsave?",
  ],
  [
    "Does JPEG XL have a vast header just like AVIF?",
    "doesjpegxlhaveavastheaderjustlikeavif?",
  ],
  ["⏩SPEED FEATURES", "%E2%8F%A9speedfeatures"],
  ["Single-core encode speed", "single-coreencodespeed"],
  ["Single-core decode speed", "single-coredecodespeed"],
  ["Parallelizable", "parallelizable"],
  ["Multi-core speed", "multi-corespeed"],
  ["Progressive image based on DCT", "progressiveimagebasedondct"],
  ["⏩ADVANCED FEATURES", "%E2%8F%A9advancedfeatures"],
  ["Lossless transcoding from JPEG", "losslesstranscodingfromjpeg"],
  [
    "Does JPEG XL work with high fidelity images?",
    "doesjpegxlworkwithhighfidelityimages?",
  ],
  ["What is the max bit depth of JPEG XL?", "whatisthemaxbitdepthofjpegxl?"],
  ["What color spaces does JXL support?", "whatcolorspacesdoesjxlsupport?"],
  ["What is the XYB color space?", "whatisthexybcolorspace?"],
  ["Generation Loss Resilience", "generationlossresilience"],
  ["Fulll automatic decoding", "fulllautomaticdecoding"],
  ["Does JPEG XL support film grain?", "doesjpegxlsupportfilmgrain?"],
  [
    "What is the maximum number of channels for JPEG XL?",
    "whatisthemaximumnumberofchannelsforjpegxl?",
  ],
  ["Does JXL support depth map?", "doesjxlsupportdepthmap?"],
  ["Does JXL support overlays?", "doesjxlsupportoverlays?"],
  ["⏩EXPERT QUESTIONS", "%E2%8F%A9expertquestions"],
  [
    "What does the encoder architecture for JPEG XL look like?",
    "whatdoestheencoderarchitectureforjpegxllooklike?",
  ],
  ["What coding modes does JPEG XL have?", "whatcodingmodesdoesjpegxlhave?"],
  [
    "What coding tools does JPEG XL provide?",
    "whatcodingtoolsdoesjpegxlprovide?",
  ],
  [
    "Does JPEG XL use variable block sizes?",
    "doesjpegxlusevariableblocksizes?",
  ],
  ["What are Patches in JPEG XL?", "whatarepatchesinjpegxl?"],
  ["What is Adaptive quantization?", "whatisadaptivequantization?"],
  ["What is an Adaptive predictor?", "whatisanadaptivepredictor?"],
  [
    "How does JPEG XL handle artifacts and banding?",
    "howdoesjpegxlhandleartifactsandbanding?",
  ],
  [
    "What else does JPEG XL do to prevent banding and artifacts?",
    "whatelsedoesjpegxldotopreventbandingandartifacts?",
  ],
  ["What are Loop Filters?", "whatareloopfilters?"],
  ["AC Encoding", "acencoding"],
  ["Entropy Coding", "entropycoding"],
  ["⏩WORKING WITH JPEG XL", "%E2%8F%A9workingwithjpegxl"],
  ["What are the use cases for JPEG XL?", "whataretheusecasesforjpegxl?"],
  ["Can I use JPEG XL?", "caniusejpegxl?"],
  ["Should I use JPEG XL?", "shouldiusejpegxl?"],
  ["Should I use JPEG XL for my website?", "shouldiusejpegxlformywebsite?"],
  [
    "Do I need new hardware to encode and decode JPEG XL?",
    "doineednewhardwaretoencodeanddecodejpegxl?",
  ],
  ["How can I convert images to JPEG XL?", "howcaniconvertimagestojpegxl?"],
  [
    "Can I recompress my JPG images to JXL losslessly?",
    "canirecompressmyjpgimagestojxllosslessly?",
  ],
  ["⏩JPEG XL SUPPORT", "%E2%8F%A9jpegxlsupport"],
  ["What image viewers support JPEG XL?", "whatimageviewerssupportjpegxl?"],
  ["What browsers support JPEG XL?", "whatbrowserssupportjpegxl?"],
  ["What CDNs support JPEG XL?", "whatcdnssupportjpegxl?"],
  [
    "What Operating system support JPEG XL?",
    "whatoperatingsystemsupportjpegxl?",
  ],
  ["Do mobile phones support JPEG XL?", "domobilephonessupportjpegxl?"],
  ["Compare JPEG XL with JPEG", "comparejpegxlwithjpeg"],
];

export default function PostCloud() {
  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        FAQ
      </h5>
      <ol>
        {posts.map((source: any, index: any) => (
          <li
            key={index}
            className={`${
              source[0].includes("⏩")
                ? "block mt-3"
                : "inline-block bg-green-1000"
            } px-1 mr-1 text-teal-400 rounded-md text-tiny `}
          >
            <Link text={source[0]} href={`/articles/faq/#${source[1]}/`} />
          </li>
        ))}
      </ol>
    </>
  );
}
