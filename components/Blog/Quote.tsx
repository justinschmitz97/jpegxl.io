import Link from "@components/Link";

interface Props {
  text: string;
  author: string;
  source: string;
}

export default function Quote(props: Props) {
  const { text, author, source } = props;
  return (
    <blockquote className="p-4 my-4 border-l-4 bg-bg-500 border-l-bg-300">
      <p className="p-0 m-0">{text}</p>
      <Link
        className="no-underline text-tiny color-white"
        href={source}
        text={author}
      />
    </blockquote>
  );
}
