import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "../Cart/CartItem";
import CartForm from "./CartForm";

export default function Cart(props) {
      const [isCheckout, setIsCheckout] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [didSubmit, setDidSubmit] = useState(false);
      const cartCtx = useContext(CartContext);

      const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

      const hasItems = cartCtx.items.length > 0;

      const cartItemRemoveHandler = (id) => {
            cartCtx.removeItem(id);
      };

      const cartItemAddHandler = (item) => {
            cartCtx.addItem({ ...item, amount: 1 });
      };

      const orderHandler = () => {
            setIsCheckout(true);
      };

      const submitOrderHandler = async (userData) => {
            setIsSubmitting(true);
            await fetch(
                  "https://react-http-21c77-default-rtdb.firebaseio.com/orders.json",
                  {
                        method: "POST",
                        body: JSON.stringify({
                              user: userData,
                              orderedItems: cartCtx.items,
                        }),
                  }
            );
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
      };

      const cartItems = (
            <ul className={classes["cart-items"]}>
                  {cartCtx.items.map((item) => (
                        <CartItem
                              key={item.id}
                              name={item.name}
                              amount={item.amount}
                              price={item.price}
                              onRemove={cartItemRemoveHandler.bind(
                                    null,
                                    item.id
                              )}
                              onAdd={cartItemAddHandler.bind(null, item)}
                        />
                  ))}
            </ul>
      );

      const modalActions = (
            <div className={classes.actions}>
                  <button
                        className={classes["button--alt"]}
                        onClick={props.onCloseCart}
                  >
                        Close
                  </button>
                  {hasItems && (
                        <button
                              className={classes.button}
                              onClick={orderHandler}
                        >
                              Order
                        </button>
                  )}
            </div>
      );

      const cartModalContent = (
            <>
                  {cartItems}
                  <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                  </div>
                  {isCheckout && (
                        <CartForm
                              onConfirm={submitOrderHandler}
                              onCancel={props.onCloseCart}
                        />
                  )}
                  {!isCheckout && modalActions}
            </>
      );

      const didSubmitModalContent = (
            <>
                  <p>Successfully sent the order.</p>
                  <div className={classes.actions}>
                        <button
                              className={classes.button}
                              onClick={props.onCloseCart}
                        >
                              Close
                        </button>
                  </div>
            </>
      );

      const isSubmittingModalContent = <p>Sending order data...</p>;

      return (
            <Modal onClick={props.onCloseCart}>
                  {!isSubmitting && !didSubmit && cartModalContent}
                  {isSubmitting && isSubmittingModalContent}
                  {!isSubmitting && didSubmit && didSubmitModalContent}
            </Modal>
      );
}
