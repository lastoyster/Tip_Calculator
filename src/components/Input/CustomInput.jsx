import React from "react";
import classes from "./CustomInput.module.css";
import { BsFillPersonFill } from "react-icons/bs";

const CustomInput = ({
  isLabelNecessary = false,
  value,
  onChange,
  placeholder,
  error = false,
  dollar = false,
  icon = false
}) => {
  const invalidInputs = error ? classes.invalid : classes.input;

  return (
    <div className={classes.container}>
      {!isLabelNecessary && <label className={classes.label}>Bill</label>}
      <div className={classes.InputContainer}>
        {dollar && <p id={classes.dollar}>$</p>}
        {icon && <BsFillPersonFill className={classes.icon} />}
        <input
          value={value}
          onChange={onChange}
          type="number"
          placeholder={placeholder}
          className={invalidInputs}
          maxLength={3}
          color="#00494d"
        />
      </div>
    </div>
  );
};

export default CustomInput;
