import { useFetchData } from "../Hooks/useFetchData";

function QuizTest() {
  const { quiz } = useFetchData();

  return <div>{quiz ? <h2>hi quiz</h2> : <h2>it is loading</h2>}</div>;
}

export { QuizTest };
