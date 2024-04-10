import logo from "./logo.svg";
import "./styles/style.css";
import "./styles/styleCurrency.css";
import "./styles/styleTimer.css";
import "./styles/styleTicTacToe.css";
import { useState } from "react";
import { links } from "./link";
import Currency from "./components/currency";
import Timer from "./components/timer";
import TicTacToe from "./components/ticTacToe";

function App() {
  const [mode, setMode] = useState("todo");

  return (
    <>
      <header className="header">
        <div className="logo-wrapper">
          <img className="logo" src={logo} alt="" onClick={() => setMode("")} />
        </div>

        {links.map((link, i) => (
          <button className="button-app" onClick={() => setMode(link.title)}>
            {link.title}
          </button>
        ))}
      </header>

      {mode === "Currency" && <Currency></Currency>}

      {mode === "Timer" && <Timer></Timer>}

      {mode === "Tic Tac Toe" && <TicTacToe></TicTacToe>}
    </>
  );
}

export default App;
