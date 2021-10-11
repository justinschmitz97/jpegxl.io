/* eslint-disable @next/next/no-img-element */
export default function Image(props: { alt: string; url: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/img/${props.url}-1536.avif 1536w, /img/${props.url}-768.avif 768w, /img/${props.url}-576.avif 576w, /img/${props.url}-384.avif 384w`}
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <source
        type="image/webp"
        srcSet={`/img/${props.url}-1536.webp 1536w, /img/${props.url}-768.webp 768w, /img/${props.url}-576.webp 576w, /img/${props.url}-384.webp 384w`}
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <source
        type="image/jpeg"
        srcSet={`/img/${props.url}-1536.jpg 1536w, /img/${props.url}-768.jpg 768w, /img/${props.url}-576.jpg 576w, /img/${props.url}-384.jpg 384w`}
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <img
        loading="lazy"
        decoding="async"
        width={2880}
        height={1620}
        src={`/img/${props.url}-1536.jpg`}
        alt={props.alt}
        title={props.alt}
      />
    </picture>
  );
}
