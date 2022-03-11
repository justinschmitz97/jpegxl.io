import Link from "@components/Link";

export interface QuestionsProps {
  questions: string[];
}

export default function Questions(props: QuestionsProps) {
  let questions = props.questions.map((original) => {
    let url = `google.com/search?q=site%3Ajpegxl.io+${original
      .replace(/\s+/g, "+")
      .toLowerCase()}`;
    return { original, url };
  });

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Related search terms
      </h5>
      <ol>
        {questions.map((source: any, index: any) => (
          <li
            key={index}
            className="inline-block px-1 mr-1 text-teal-400 rounded-md text-tiny bg-green-1000"
          >
            <Link text={source.original} href={source.url} />
          </li>
        ))}
      </ol>
    </>
  );
}
