import Link from "@components/Link";

export interface QuestionsProps {
  questions: string[];
}

export default function Questions(props: QuestionsProps) {
  let questions = props.questions.map((text) => {
    let href = `google.com/search?q=site%3Ajpegxl.io+${text
      .replace(/\s+/g, "+")
      .toLowerCase()}`;
    return { text, href };
  });

  return (
    <>
      <h5 className="inline-block mt-4 font-bold rounded-md">Questions</h5>
      <ol className="flex flex-wrap gap-1 text-teal-400 text-tiny">
        {questions.map((source: any, index: any) => (
          <li key={index} className="px-1 rounded-md bg-green-1000">
            <Link text={source.text} href={source.href} />
          </li>
        ))}
      </ol>
    </>
  );
}
