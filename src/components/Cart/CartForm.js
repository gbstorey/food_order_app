import classes from "./CartForm.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CartForm = (props) => {
      const [formInputsValidity, setFormInputsValidity] = useState({
            name: true,
            street: true,
            city: true,
            postalCode: true,
      });

      const nameInputRef = useRef();
      const streetInputRef = useRef();
      const postalCodeInputRef = useRef();
      const cityInputRef = useRef();

      const formSubmissionHandler = (event) => {
            console.log("submitted");
            event.preventDefault();
            const enteredName = nameInputRef.current.value;
            const enteredStreet = streetInputRef.current.value;
            const enteredPostalCode = postalCodeInputRef.current.value;
            const enteredCity = cityInputRef.current.value;

            const enteredNameIsValid = !isEmpty(enteredName);
            const enteredStreetIsValid = !isEmpty(enteredStreet);
            const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
            const enteredCityIsValid = !isEmpty(enteredCity);

            setFormInputsValidity({
                  name: enteredNameIsValid,
                  street: enteredStreetIsValid,
                  postalCode: enteredPostalCodeIsValid,
                  city: enteredCityIsValid,
            });

            const formIsValid =
                  enteredNameIsValid &&
                  enteredStreetIsValid &&
                  enteredPostalCodeIsValid &&
                  enteredCityIsValid;

            if (!formIsValid) {
                  return;
            }

            props.onConfirm({
                  name: enteredName,
                  street: enteredStreet,
                  city: enteredCity,
                  postalCode: enteredPostalCode,
            });
      };

      const nameControlClasses = `${classes.control} ${
            formInputsValidity.name ? "" : classes.invalid
      }`;

      const streetControlClasses = `${classes.control} ${
            formInputsValidity.street ? "" : classes.invalid
      }`;

      const cityControlClasses = `${classes.control} ${
            formInputsValidity.city ? "" : classes.invalid
      }`;

      const postalCodeControlClasses = `${classes.control} ${
            formInputsValidity.postalCode ? "" : classes.invalid
      }`;

      return (
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                  <div>
                        <div className={nameControlClasses}>
                              <label htmlFor="name">Your Name </label>
                              <input type="text" id="name" ref={nameInputRef} />
                              {!formInputsValidity.name && (
                                    <p>Field must not be empty.</p>
                              )}
                        </div>

                        <div className={streetControlClasses}>
                              <label htmlFor="street"> Address </label>
                              <input
                                    type="text"
                                    id="name"
                                    ref={streetInputRef}
                              />
                              {!formInputsValidity.street && (
                                    <p>Field must not be empty.</p>
                              )}
                        </div>

                        <div className={cityControlClasses}>
                              <label htmlFor="city">City </label>
                              <input type="text" id="city" ref={cityInputRef} />
                              {!formInputsValidity.city && (
                                    <p>Field must not be empty.</p>
                              )}
                        </div>

                        <div className={postalCodeControlClasses}>
                              <label htmlFor="postal">Postal Code </label>
                              <input
                                    type="text"
                                    id="postal"
                                    ref={postalCodeInputRef}
                              />
                              {!formInputsValidity.postalCode && (
                                    <p>Must be a five digit number.</p>
                              )}
                        </div>
                        <button type="button" onClick={props.onCancel}>
                              Cancel
                        </button>
                        <button>Confirm</button>
                  </div>
            </form>
      );
};

export default CartForm;
