import { useSelector, useDispatch } from "react-redux";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import { Button } from "reactstrap";
import { decrement, increment } from "@/features/counter/counterSlice";

interface RootState {
  counter: {
    firstName: string;
    value: number;
  };
}
function Index() {
  // const [count, setCount] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button onClick={() => dispatch(decrement())} color="danger">
        subtract
      </Button>
    </>
  );
}

export default Index;
