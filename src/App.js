import React from "react";
import classes from "./App.module.css";
import CustomInput from "./components/Input/CustomInput";
import Button from "./components/Button/Button";

import { useState } from "react";

const App = () => {
  const initialTip = "0.00";

  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipAmount, setTipAmount] = useState(initialTip);
  const [totalAmount, setTotalAmount] = useState(initialTip);
  const [customTip, setCustomTip] = useState();
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState();

  const billHandler = (e) => {
    setBill(e.target.value);
  };

  const numberOfPeopleHandler = (e) => {
    setNumberOfPeople(e.target.value);
  };

  const billEror = !bill || bill < 0;
  const numberOfPersonsError = numberOfPeople <= 0;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (billEror || numberOfPersonsError) {
      setError("Can not be zero");
    }
    // resetHandler();
  };

  const calculations = (theTip) => {
    const tip = theTip * +bill;
    const tipPerPerson = tip / numberOfPeople;
    setTipAmount(tipPerPerson.toFixed(2));
    const personalTotalAmount = bill / numberOfPeople + tipPerPerson;
    setTotalAmount(personalTotalAmount.toFixed(2));
  };

  const buttonTips = [
    { label: 5 },
    { label: 10 },
    { label: 15 },
    { label: 25 },
    { label: 50 }
  ];

  const tipPercentage = (tipPercentage, index) => {
    const tip = tipPercentage / 100;
    calculations(tip);
    setActive(true);
    setSelected(index);
  };

  const customTipHandler = (e) => {
    const enteredTip = +e.target.value;
    if (enteredTip < 0) {
      setError(showError);
      return;
    }

    setCustomTip(+enteredTip);
    calculations(+enteredTip / 100);
    setActive(false);
  };

  function resetHandler() {
    setNumberOfPeople("");
    setTipAmount("0.00");
    setTotalAmount("0.00");
    setBill("");
    setCustomTip("");
    setError(false);
    setActive(false);
  }

  let showError = (
    <p className={classes.error}>
      Invalid Inputs!! <br /> Please reset
    </p>
  );

  return (
    <div className={classes.app}>
      <h1 className={classes.h1}>
        SPlI
        <br />
        tter
      </h1>
      <div className={classes.app_container}>
        <div className={classes.app_container__left}>
          <form onSubmit={formSubmitHandler}>
            <CustomInput
              error={billEror && error}
              value={bill}
              onChange={billHandler}
              dollar
            />
            <div className={classes.label_error}>
              <label className={classes.label}>Number of people</label>
              <p>{numberOfPersonsError && error}</p>
            </div>
            <CustomInput
              isLabelNecessary
              value={numberOfPeople}
              onChange={numberOfPeopleHandler}
              error={numberOfPersonsError && error}
              icon
            />
            <p className={classes.selectTip}>Select Tip %</p>
            <nav className={classes.tip_buttons}>
              {buttonTips.map((buttonTip, index) => (
                <Button
                  isActive={index === selected && active}
                  type="submit"
                  onClick={() => tipPercentage(buttonTip.label, index)}
                >
                  {buttonTip.label}%
                </Button>
              ))}

              <CustomInput
                isLabelNecessary
                placeholder="CUSTOM"
                onChange={customTipHandler}
                value={customTip}
                error={error}
              />
            </nav>
          </form>
        </div>

        {/* Right Container */}

        <div className={classes.app_container__right}>
          <div className={classes.tipContainer}>
            <div className={classes.tip_amount}>
              <div className={classes.tip}>
                <h3>Tip Amount</h3>
                <p>per person</p>
              </div>
              <p className={classes.tip_tag}>
                {!error && <span>$</span>}
                {error ? showError : tipAmount}
              </p>
            </div>
            <div className={classes.tip_total}>
              <div className={classes.tip}>
                <h3> Total</h3>
                <p>per person</p>
              </div>
              <p className={classes.tip_tag}>
                {!error && <span>$</span>}
                {error ? showError : totalAmount}
              </p>
            </div>
            <button className={classes.button} onClick={resetHandler}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
