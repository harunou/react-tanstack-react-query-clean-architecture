import { Orders, OrdersCli } from "../orders";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Orders />
        <OrdersCli />
      </header>
    </div>
  );
};

export default App;
