import Link from "@components/Link";

export interface ContentTableEntry {
  text: string;
  href: string;
}

export interface ContentTableProps {
  contentTable: ContentTableEntry[];
}

export default function ContentTable(props: ContentTableProps) {
  return (
    <nav className="p-4 my-3 rounded-lg md:py-2 bg-bg-400">
      <h4 className="mb-2 bold">Table of Content</h4>
      <ol>
        {props.contentTable.map((entry, index: any) => (
          <li className="py-0 [counter-increment:step-counter]" key={index}>
            <Link
              className="no-underline md:text-base text-tiny"
              href={entry.href}
              text={entry.text}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
