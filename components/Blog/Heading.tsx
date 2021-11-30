import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContentTableEntry } from "./ContentTable";
export interface Props {
  text: string;
  level: number;
  callback?: (entry: ContentTableEntry) => void;
}

export default function Heading(props: Props) {
  const { text, level, callback } = props;
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;
  const trimmedText = text.replace(/\s/g, "").toLowerCase();
  const router = useRouter();

  useEffect(() => {
    callback?.({ text: text, href: `#${trimmedText}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyToClipboard(e: any) {
    navigator.clipboard.writeText(
      `https://justinschmitz.de${router.asPath}#${trimmedText}`
    );
    e.target.focus();
  }

  return (
    <>
      <CustomTag
        id={level === 2 || level === 3 ? trimmedText : undefined}
        className={`${
          level === 2 ? "mt-8 mb-3 md:text-3xl md:mt-12 md:mb-4 " : ""
        } ${level === 3 ? "mt-8 " : ""} ${
          level === 4 ? "mt-6 mb-3 " : ""
        } group items-center flex relative rounded-sm`}
      >
        {level === 2 || level === 3 ? (
          <a
            className={`transform inline-flex text-red-700 opacity-0 items-center group-hover:opacity-100 group-hover:translate-x-2 transition-all`}
            href={`${router.asPath}#${trimmedText}`}
            onClick={copyToClipboard}
          >
            {text}
          </a>
        ) : (
          { text }
        )}
      </CustomTag>
    </>
  );
}
