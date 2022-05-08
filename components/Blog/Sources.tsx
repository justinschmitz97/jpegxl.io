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
      <h5 className="inline-block mt-4 font-bold rounded-md">Sources</h5>
      <ol className="flex flex-wrap gap-1 text-teal-400 text-tiny">
        {sources.map((source: any, index: any) => (
          <cite
            key={index}
            className="py-0 px-1 not-italic rounded-md bg-green-1000"
          >
            <Link text={source.text} href={source.href} />
          </cite>
        ))}
      </ol>
    </>
  );
}
