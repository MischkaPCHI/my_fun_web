import { useState } from "react";

const Currency = () => {
  const [userInputCurrencyValue, setCurrencyValue] = useState("");
  const [userInputConvertFrom, setConvertFrom] = useState("");
  const [userInputConvertTo, setConvertTo] = useState("");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState("");

  const responseFromServerPromise = (q) => {
    return fetch(q);
  };

  const serverWorks = async () => {
    const serverResponse = await responseFromServerPromise("https://openexchangerates.org/api/latest.json?app_id=c56da6a380da489ea5745895577c2ac4");
    const body = await serverResponse.json();
    setRates(body.rates);
  };
  serverWorks();

  const inputFieldCurrencyValue = (evt) => {
    setCurrencyValue(evt.target.value);
    if (isNaN(userInputCurrencyValue)) {
      alert("Лось! Введи сумму!");
    }
  };

  const inputFieldConvertFromAndTo = (evt) => {
    if (evt.target.id === "cur1") {
      setConvertFrom(evt.target.value);
    }
    if (evt.target.id === "cur2") {
      setConvertTo(evt.target.value);
    }
  };

  function convertCurrency(evt) {
    evt.preventDefault();
    if (!userInputCurrencyValue) {
      alert("Лось! Введи сумму!");
      return;
    }
    let firstRate = rates[userInputConvertFrom] || 1;
    let secondRate = rates[userInputConvertTo] || 1;

    setResult(((userInputCurrencyValue / firstRate) * secondRate).toFixed(3));
  }

  const resetConverter = () => {
    setResult("");
    setCurrencyValue("");
  };

  return (
    <main className="main">
      <div className="main-box2">
        <div className="main-box">
          <h1>Currency Calculator</h1>

          <form className="position">
            <div className="input-output">
              <div className="input">
                <input className="value-input" type="text" onChange={inputFieldCurrencyValue} />
                <p>Result: </p>
                <div id="result">{result}</div>
              </div>

              <div className="currency">
                <div className="from">
                  <label className="label" id="from" for="currency">
                    Convert from:{" "}
                  </label>

                  <select className="select" id="cur1" onChange={inputFieldConvertFromAndTo}>
                    {Object.keys(rates).map((key) => (
                      <option key={key} value={key}>{key}</option>))}</select>
                </div>

                <div className="to">
                  <label className="label" id="to" for="currency">Convert to:{" "}</label>

                  <select className="select" id="cur2" onChange={inputFieldConvertFromAndTo}>
                    {Object.keys(rates).map((key) => (<option key={key} value={key}>{key}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="button-box">
              <button className="button" id="calculate" onClick={convertCurrency}>Calculate</button>
              <button className="button" id="clear" onClick={resetConverter}>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Currency;
