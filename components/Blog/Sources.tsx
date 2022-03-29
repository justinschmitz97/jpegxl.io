import Link from "@components/Link";
import sortBy from "lodash/sortBy";

export interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  let sources = props.sources.map((href) => {
    let text = new URL(`https://${href}`).hostname.replace(/^www\./, "");
    return { href, text };
  });
  sources = sortBy(sources, (s) => s.text);
  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Sources
      </h5>
      <ol>
        {sources.map((source: any, index: any) => (
          <cite
            key={index}
            className="inline-block py-0 px-1 mr-1 not-italic text-teal-400 rounded-md text-tiny bg-green-1000"
          >
            <Link text={source.text} href={source.href} />
          </cite>
        ))}
      </ol>
    </>
  );
}
