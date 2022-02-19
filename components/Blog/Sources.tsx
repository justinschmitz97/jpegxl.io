import sortBy from "lodash/sortBy";

export interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  let sources = props.sources.map((original) => {
    let text = new URL(`https://${original}`).hostname.replace(/^www\./, "");
    let href = `https://${original}`;
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
          <li
            key={index}
            className="inline-block px-1 mr-1 text-teal-400 rounded-md text-tiny bg-green-1000"
          >
            <a target="_blank" rel="noreferrer" href={source.href}>
              {source.text}
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
