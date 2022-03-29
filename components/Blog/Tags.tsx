import Link from "@components/Link";
import sortBy from "lodash/sortBy";

export interface TagsProps {
  tags: string[];
}

export default function Tags(props: TagsProps) {
  let tags = props.tags.map((text) => {
    let href = `google.com/search?q=site%3Ajpegxl.io+${text.replace(
      /\s+/g,
      "+"
    )}`;
    return { href, text };
  });
  tags = sortBy(tags, (s) => s.text);

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Topic clusters
      </h5>
      <ol>
        {tags.map((source: any, index: any) => (
          <li
            key={index}
            className="inline-block px-1 mr-1 text-teal-400 rounded-md text-tiny bg-green-1000"
          >
            <Link text={source.text} href={source.href} />
          </li>
        ))}
      </ol>
    </>
  );
}
