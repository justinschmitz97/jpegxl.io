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
    <nav className="p-2 mt-4 mb-2 rounded-md md:p-4 3xl:absolute 3xl:left-0 3xl:mt-0 3xl:rounded-l-none bg-bg-400">
      <h4 className="m-0 bold">Table of Content</h4>
      <ol className="m-0">
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
