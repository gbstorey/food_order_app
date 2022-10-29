import useInput from "../../hooks/use-input";
import classes from "./CartFormItem.module.css";
import { useImperativeHandle } from "react";
import React from "react";

const CartFormItem = React.forwardRef((props, ref) => {
      const {
            value: enteredValue,
            isValid: enteredValueIsValid,
            hasError: inputHasError,
            valueChangeHandler: inputChangeHandler,
            inputBlurHandler: blurHandler,
            reset: resetValue,
      } = useInput((value) => value.trim() !== "");

      const getValidity = () => {
            return enteredValueIsValid;
      };

      useImperativeHandle(ref, () => {
            return {
                  getValidity: getValidity,
                  reset: resetValue,
            };
      });

      const inputClasses = inputHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`;

      return (
            <div className={inputClasses}>
                  <label htmlFor={props.name}>{props.name} </label>
                  <input
                        type="text"
                        id={props.name}
                        onChange={inputChangeHandler}
                        onBlur={blurHandler}
                        value={enteredValue}
                  />
                  {inputHasError && (
                        <p className={classes.invalid}>
                              Field must not be empty.
                        </p>
                  )}
            </div>
      );
});
export default CartFormItem;
