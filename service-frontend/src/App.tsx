import "./App.css";
import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import logo from "./logo.svg";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="container">
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
};

export default App;
