export interface QuestionsProps {
  posts: string[];
}

const content = [
  ["⏩GENERAL INFORMATION", "/articles/faq/#%E2%8F%A9generalinformation"],
  ["Introduction", "/articles/faq/#introduction"],
  ["What is a JPEG XL file?", "/articles/faq/#whatisajpegxlfile?"],
  [
    "What is the file extension JXL?",
    "/articles/faq/#whatisthefileextensionjxl?",
  ],
  [
    "What are the benefits of JPEG XL?",
    "/articles/faq/#whatarethebenefitsofjpegxl?",
  ],
  [
    "What is the downside of JPEG XL?",
    "/articles/faq/#whatisthedownsideofjpegxl?",
  ],
  [
    "Why is a new image format like JPEG XL needed?",
    "/articles/faq/#whyisanewimageformatlikejpegxlneeded?",
  ],
  [
    "What is the primary goal of JXL?",
    "/articles/faq/#whatistheprimarygoalofjxl?",
  ],
  ["Who created JPEG XL?", "/articles/faq/#whocreatedjpegxl?"],
  [
    "Who are the key contributors of JPEG XL?",
    "/articles/faq/#whoarethekeycontributorsofjpegxl?",
  ],
  ["Why is JPEG XL called JPEG XL?", "/articles/faq/#whyisjpegxlcalledjpegxl?"],
  [
    "Since when does JPEG XL exist?",
    "/articles/faq/#sincewhendoesjpegxlexist?",
  ],
  [
    "What is the timeline of JPEG XL?",
    "/articles/faq/#whatisthetimelineofjpegxl?",
  ],
  [
    "Is JPEG XL based on other formats?",
    "/articles/faq/#isjpegxlbasedonotherformats?",
  ],
  ["Is JPEG XL royalty-free?", "/articles/faq/#isjpegxlroyalty-free?"],
  [
    "Is there a Standard for JPEG XL?",
    "/articles/faq/#isthereastandardforjpegxl?",
  ],
  ["⏩BASIC FEATURES", "/articles/faq/#%E2%8F%A9basicfeatures"],
  [
    "What features does JPEG XL support?",
    "/articles/faq/#whatfeaturesdoesjpegxlsupport?",
  ],
  [
    "Does JPEG XL support alpha transparency?",
    "/articles/faq/#doesjpegxlsupportalphatransparency?",
  ],
  [
    "Does JPEG XL support animation?",
    "/articles/faq/#doesjpegxlsupportanimation?",
  ],
  [
    "Does JXL support progressive decoding?",
    "/articles/faq/#doesjxlsupportprogressivedecoding?",
  ],
  ["Does JPEG XL support HDR?", "/articles/faq/#doesjpegxlsupporthdr?"],
  [
    "What is the highest megapixel count for JPEG XL?",
    "/articles/faq/#whatisthehighestmegapixelcountforjpegxl?",
  ],
  ["⏩COMPRESSION FEATURES", "/articles/faq/#%E2%8F%A9compressionfeatures"],
  [
    "How does JPEG XL optimize my images?",
    "/articles/faq/#howdoesjpegxloptimizemyimages?",
  ],
  [
    "Does JPEG XL support lossless compression?",
    "/articles/faq/#doesjpegxlsupportlosslesscompression?",
  ],
  [
    "Does JPEG XL support lossy compression?",
    "/articles/faq/#doesjpegxlsupportlossycompression?",
  ],
  [
    "Is JPEG XL suitable for low-fidelity images?",
    "/articles/faq/#isjpegxlsuitableforlow-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for medium-fidelity images?",
    "/articles/faq/#isjpegxlsuitableformedium-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for high-fidelity images?",
    "/articles/faq/#isjpegxlsuitableforhigh-fidelityimages?",
  ],
  [
    "Is JPEG XL suitable for non-photographic images?",
    "/articles/faq/#isjpegxlsuitablefornon-photographicimages?",
  ],
  [
    "How much file size does lossless JPEG XL save?",
    "/articles/faq/#howmuchfilesizedoeslosslessjpegxlsave?",
  ],
  [
    "How much file size does lossy JPEG XL save?",
    "/articles/faq/#howmuchfilesizedoeslossyjpegxlsave?",
  ],
  [
    "Does JPEG XL have a vast header just like AVIF?",
    "/articles/faq/#doesjpegxlhaveavastheaderjustlikeavif?",
  ],
  ["⏩SPEED FEATURES", "/articles/faq/#%E2%8F%A9speedfeatures"],
  ["Single-core encode speed", "/articles/faq/#single-coreencodespeed"],
  ["Single-core decode speed", "/articles/faq/#single-coredecodespeed"],
  ["Parallelizable", "/articles/faq/#parallelizable"],
  ["Multi-core speed", "/articles/faq/#multi-corespeed"],
  [
    "Progressive image based on DCT",
    "/articles/faq/#progressiveimagebasedondct",
  ],
  ["⏩ADVANCED FEATURES", "/articles/faq/#%E2%8F%A9advancedfeatures"],
  [
    "Lossless transcoding from JPEG",
    "/articles/faq/#losslesstranscodingfromjpeg",
  ],
  [
    "Does JPEG XL work with high fidelity images?",
    "/articles/faq/#doesjpegxlworkwithhighfidelityimages?",
  ],
  [
    "What is the max bit depth of JPEG XL?",
    "/articles/faq/#whatisthemaxbitdepthofjpegxl?",
  ],
  [
    "What color spaces does JXL support?",
    "/articles/faq/#whatcolorspacesdoesjxlsupport?",
  ],
  ["What is the XYB color space?", "/articles/faq/#whatisthexybcolorspace?"],
  ["Generation Loss Resilience", "/articles/faq/#generationlossresilience"],
  ["Fulll automatic decoding", "/articles/faq/#fulllautomaticdecoding"],
  [
    "Does JPEG XL support film grain?",
    "/articles/faq/#doesjpegxlsupportfilmgrain?",
  ],
  [
    "What is the maximum number of channels for JPEG XL?",
    "/articles/faq/#whatisthemaximumnumberofchannelsforjpegxl?",
  ],
  ["Does JXL support depth map?", "/articles/faq/#doesjxlsupportdepthmap?"],
  ["Does JXL support overlays?", "/articles/faq/#doesjxlsupportoverlays?"],
  ["⏩EXPERT QUESTIONS", "/articles/faq/#%E2%8F%A9expertquestions"],
  [
    "What does the encoder architecture for JPEG XL look like?",
    "/articles/faq/#whatdoestheencoderarchitectureforjpegxllooklike?",
  ],
  [
    "What coding modes does JPEG XL have?",
    "/articles/faq/#whatcodingmodesdoesjpegxlhave?",
  ],
  [
    "What coding tools does JPEG XL provide?",
    "/articles/faq/#whatcodingtoolsdoesjpegxlprovide?",
  ],
  [
    "Does JPEG XL use variable block sizes?",
    "/articles/faq/#doesjpegxlusevariableblocksizes?",
  ],
  ["What are Patches in JPEG XL?", "/articles/faq/#whatarepatchesinjpegxl?"],
  [
    "What is Adaptive quantization?",
    "/articles/faq/#whatisadaptivequantization?",
  ],
  [
    "What is an Adaptive predictor?",
    "/articles/faq/#whatisanadaptivepredictor?",
  ],
  [
    "How does JPEG XL handle artifacts and banding?",
    "/articles/faq/#howdoesjpegxlhandleartifactsandbanding?",
  ],
  [
    "What else does JPEG XL do to prevent banding and artifacts?",
    "/articles/faq/#whatelsedoesjpegxldotopreventbandingandartifacts?",
  ],
  ["What are Loop Filters?", "/articles/faq/#whatareloopfilters?"],
  ["AC Encoding", "/articles/faq/#acencoding"],
  ["Entropy Coding", "/articles/faq/#entropycoding"],
  ["⏩WORKING WITH JPEG XL", "/articles/faq/#%E2%8F%A9workingwithjpegxl"],
  [
    "What are the use cases for JPEG XL?",
    "/articles/faq/#whataretheusecasesforjpegxl?",
  ],
  ["Can I use JPEG XL?", "/articles/faq/#caniusejpegxl?"],
  ["Should I use JPEG XL?", "/articles/faq/#shouldiusejpegxl?"],
  [
    "Should I use JPEG XL for my website?",
    "/articles/faq/#shouldiusejpegxlformywebsite?",
  ],
  [
    "Do I need new hardware to encode and decode JPEG XL?",
    "/articles/faq/#doineednewhardwaretoencodeanddecodejpegxl?",
  ],
  [
    "How can I convert images to JPEG XL?",
    "/articles/faq/#howcaniconvertimagestojpegxl?",
  ],
  [
    "Can I recompress my JPG images to JXL losslessly?",
    "/articles/faq/#canirecompressmyjpgimagestojxllosslessly?",
  ],
  ["⏩JPEG XL SUPPORT", "/articles/faq/#%E2%8F%A9jpegxlsupport"],
  [
    "What image viewers support JPEG XL?",
    "/articles/faq/#whatimageviewerssupportjpegxl?",
  ],
  [
    "What browsers support JPEG XL?",
    "/articles/faq/#whatbrowserssupportjpegxl?",
  ],
  ["What CDNs support JPEG XL?", "/articles/faq/#whatcdnssupportjpegxl?"],
  [
    "What Operating system support JPEG XL?",
    "/articles/faq/#whatoperatingsystemsupportjpegxl?",
  ],
  [
    "Do mobile phones support JPEG XL?",
    "/articles/faq/#domobilephonessupportjpegxl?",
  ],
  ["Compare JPEG XL with JPEG", "/articles/faq/#comparejpegxlwithjpeg"],
];

export default function PostCloud() {
  const listQuestions = content.map((source: any, index: any) => (
    <li
      key={index}
      className={`${
        source[0].startsWith("⏩")
          ? "block py-1 mt-2 font-bold max-w-sm"
          : "inline-block"
      }
    px-1 text-teal-400 mr-1 rounded-md text-tiny bg-green-1000 `}
    >
      <a target="_blank" rel="noreferrer" href={source[1]}>
        {source[0]}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        FAQ
      </h5>
      <ol>{listQuestions}</ol>
    </>
  );
}
