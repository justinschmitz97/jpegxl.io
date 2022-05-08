import "atropos/css";
import Atropos from "atropos/react";

const advantages = [
  [
    "visualizer-1",
    "reduces file size by an average of 20-60%",
    "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11353/2556264/Benchmarking-JPEG-XL-image-compression/10.1117/12.2556264.short?SSO=1",
  ],
  [
    "visualizer-3",
    "developed by the JPEG committee",
    "https://jpeg.org/jpegxl/",
  ],
  [
    "visualizer-4",
    "progressive decoding for web experience",
    "https://www.youtube.com/watch?v=UphN1_7nP8U",
  ],
  [
    "visualizer-6",
    "lossless jpeg transcoding",
    "https://cloudinary.com/blog/legacy_and_transition_creating_a_new_universal_image_codec",
  ],
  [
    "visualizer-7",
    "photographic & synthetic images",
    "https://cloudinary.com/blog/time_for_next_gen_codecs_to_dethrone_jpeg",
  ],
  [
    "visualizer-8",
    "embraces wide gamut / HDR and 32 bit depth",
    "https://cloudinary.com/blog/how_jpeg_xl_compares_to_other_image_codecs#universality",
  ],
  [
    "visualizer-9",
    "fast software encoding and decoding",
    "https://cloudinary.com/blog/how_jpeg_xl_compares_to_other_image_codecs#computational_complexity",
  ],
  [
    "visualizer-11",
    "full of smartphone features like overlays",
    "http://ds.jpeg.org/documents/wg1n83043-REQ-JPEG_XL_Use_Cases_and_Requirements.pdf",
  ],
  [
    "visualizer-8",
    "WIP support for animated frames",
    "https://gitlab.com/wg1/jpeg-xl/-/issues/68",
  ],
  [
    "visualizer-12",
    "FOSS and royalty-free license",
    "https://gitlab.com/wg1/jpeg-xl/-/blob/main/LICENSE",
  ],
];

export default function Advantages() {
  return (
    <section
      className="container grid relative grid-cols-1 gap-4 p-2 mt-2 mb-12 md:grid-cols-2 lg:grid-cols-3 lg:p-0 xl:grid-cols-4 2xl:grid-cols-5"
      id="avifadvantages"
    >
      {advantages.map((advantage) => (
        <Atropos
          key={advantage[1]}
          activeOffset={20}
          shadowScale={1.01}
          rotateXMax={20}
          scaleClassName="rounded-lg h-full"
          rotateClassName="rounded-lg h-full"
          innerClassName="rounded-lg h-full"
          shadow={false}
          rotateTouch={false}
        >
          <a
            tabIndex={0}
            className="grid overflow-hidden relative z-50 p-4 h-full text-center rounded-lg transition-all duration-200 ease-out transform-gpu hover:scale-105 group bg-bg-600"
            data-atropos-offset="0"
            href={advantage[2]}
          >
            <div
              className="z-0 mb-4 h-6 bg-center bg-no-repeat bg-contain rounded-lg transition-all duration-500 ease-out origin-center background-no-repeat group-hover:scale-[2.0]"
              data-atropos-offset="10"
              style={{
                backgroundImage: `url(/assets/${advantage[0]}.svg)`,
              }}
            ></div>
            <div
              className="h-auto leading-snug ease-in md:h-7"
              data-atropos-offset="2"
            >
              <span className="font-bold leading-snug text-teal-400">
                {advantage[1]}
              </span>
            </div>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-cover md:bg-no-repeat"
              style={{
                backgroundImage: `url(/assets/${advantage[0]}.svg)`,
                opacity: "0.025",
                filter: "blur(4px)",
              }}
            ></div>
          </a>
        </Atropos>
      ))}
    </section>
  );
}
