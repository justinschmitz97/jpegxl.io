import _ from "lodash";

export interface QuestionsProps {
  questions: string[];
}

export default function Questions(props: QuestionsProps) {
  let questions = props.questions.map((original) => {
    original = original.replace(/\s+/g, "+").toLowerCase();
    let short = original.replace(/\/$/, "");
    original = `https://google.com/search?q=site%3Ajpegxl.io+${original}`;
    short = short.replace(/\+/g, " ");
    return { original, short };
  });
  questions = _.sortBy(questions, (s) => s.short);

  const listQuestions = questions.map((source: any) => (
    <li
      key={source.original}
      className="inline-block p-1 m-1 text-teal-400 rounded-md text-tiny bg-green-1000"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <div className="questions_container f0">
      <ol className="questions_wrapper">{listQuestions}</ol>
    </div>
  );
}
