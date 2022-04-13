import { useRouter } from "next/router";

const socialMedia = [
  ["twitter", "https://twitter.com/intent/tweet?text="],
  ["reddit", "https://reddit.com/submit?url="],
  ["facebook", "https://facebook.com/share.php?u="],
];

export default function Blog() {
  const { asPath } = useRouter();

  function share() {
    event!.preventDefault();
    navigator.share({ url: `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}` });
  }

  const shareFunction = (media: any) =>
    window.open(
      `${media}${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`,
      "_blank"
    );

  return (
    <div className="fixed right-2 bottom-2 z-40 p-1 rounded-md border-2 md:right-3 md:bottom-3 md:border-0 bg-bg-500 border-bg-700">
      <div className="flex justify-items-center content-center items-center">
        <div className="hidden mr-2 ml-1 md:block text-tiny">Share</div>
        {socialMedia.map((media: any) => (
          <button
            className="hidden p-1 m-0 w-5 h-5 bg-center bg-no-repeat bg-contain md:block"
            style={{ backgroundImage: `url(/assets/${media[0]}.svg)` }}
            onClick={() => shareFunction(media[1])}
            onKeyPress={() => shareFunction(media[1])}
            title={`Share on ${media[0]}`}
            id={media[0]}
            tabIndex={0}
            key={media[0]}
          />
        ))}
        <button
          className="block p-1 w-5 h-5 bg-center bg-no-repeat bg-contain md:hidden"
          style={{ backgroundImage: `url(/assets/share.svg)` }}
          onClick={() => share()}
          onKeyPress={() => share()}
          aria-label="share"
          title="share on social media"
          id="share"
        />
      </div>
    </div>
  );
}
