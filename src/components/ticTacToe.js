import { useState, useEffect } from "react";

const TicTacToe = () => {
    const [box, setBox] = useState(Array(9).fill('')); // => создает массив с 9 пустыми элементами и заполняет их пустыми строками
    const [turn, setTurn] = useState('X');
    const [isGameState, setIsGameState] = useState(false);

    //комбинации надо записывать индексами ячеек
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const handleClick = (i) => {
      if (!isGameState && box[i] === '') {
        const newBoxes = [...box];
        newBoxes[i] = turn;
        setBox(newBoxes);
        checkWin(newBoxes);
        setTurn('O'); 
      }
    };

    useEffect(() => {
      if (!isGameState && turn === 'O') {
          const intervalId = setInterval(() => {
              const ran = Math.floor(Math.random() * 9);
              if (box[ran] === '') {
                  const newBoxes = [...box];
                  newBoxes[ran] = turn;
                  setBox(newBoxes);
                  checkWin(newBoxes);
                  setTurn('X');
                  clearInterval(intervalId);
              }
          }, 500);
      }
  }, [box, turn, isGameState]); // отслеживает изменения 
  
    const checkWin = (currentBoxes) => {
      winCombo.forEach((combo) => {
        const [a, b, c] = combo.map((i) => currentBoxes[i]);
        if (a && a === b && a === c) {
          setIsGameState(true);
        }
      });
    };

    const handlePlayAgain = () => {
        setIsGameState(false);
        setTurn('X');
        setBox(Array(9).fill(''));
      };

    return (
        <div className="game-container">
        <div className="main-table">
          {box.map((value, i) => (
            <div key={i} className={`main-table-box ${value}`} onClick={() => handleClick(i)}>{value}</div>
          ))}
        </div>
        <div className="turn-blocks">
          <div className={`turn-block ${turn === 'X' ? 'active' : ''}`}>X</div>
          <div className={`turn-block ${turn === 'O' ? 'active' : ''}`}>O</div>
        </div>
        {isGameState && (
          <div className="result">
            {/* для меня тугодума если вдруг захочу опять передвинуть круглую скобку в конец. НЕ СМЕЙ!!! */}
            {box.map((value) => value === 'X' || value === 'O') ? `Game over: ${turn}` : ``}
          </div>
        )}
        <button className="play-again" onClick={handlePlayAgain}>Play Again</button>
      </div>
    )

};

export default TicTacToe;