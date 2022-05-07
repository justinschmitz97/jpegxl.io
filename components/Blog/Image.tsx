/* eslint-disable @next/next/no-img-element */
export default function Image(props: { alt: string; src: string }) {
  const sizes = [768, 384];
  const formats = [
    ["image/avif", "avif"],
    ["image/webp", "webp"],
  ];

  const sources = formats.map((format: any) => (
    <source
      key={format[1]}
      sizes="(max-width: 768px) 100vw, 768px"
      srcSet={`/img/${props.src}-${sizes[0]}.${format[1]} ${sizes[0]}w, /img/${props.src}-${sizes[1]}.${format[1]} ${sizes[1]}w`}
      type={`${format[0]}`}
    />
  ));

  return (
    <picture className="overflow-hidden rounded-md">
      {sources}
      <img
        loading="lazy"
        decoding="async"
        width={2880}
        height={1620}
        src={`/img/${props.src}-768.webp`}
        alt={props.alt}
        title={props.alt}
      />
    </picture>
  );
}
