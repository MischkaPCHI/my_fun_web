import logo from "./logo.svg";
import {ReactComponent as Menu} from "./071menu_99999.svg"
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
  const [isActive, setActive] = useState(false);

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
        <div className="menu-btn" onClick={() => {setActive(!isActive)}}>
          <Menu className="burger-menu"></Menu>
        </div>
      </header>

      <div className={`menu ${isActive ? 'active' : ''}`}>
        <nav>
          <ul>
          <li>Главная</li>
          <li>О нас</li>
          <li>Услуги</li>
          <li>Контакты</li>
          </ul>
        </nav>
      </div>

      {mode === "Currency" && <Currency></Currency>}

      {mode === "Timer" && <Timer></Timer>}

      {mode === "Tic Tac Toe" && <TicTacToe></TicTacToe>}
    </>
  );
}

export default App;
