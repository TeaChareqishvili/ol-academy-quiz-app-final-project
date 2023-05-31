import { useFetchData } from "../Hooks/useFetchData";
import { Loader } from "./Loader";

function QuizTest() {
  const { quiz } = useFetchData();

  return <div>{quiz ? <h2>hi quiz</h2> : <Loader/>}</div>;
}

export { QuizTest };
