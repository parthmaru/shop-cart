import CartItems from "../CartItems/CartItems";
import { Wrapper } from "./Cart.styles";
import { ItemType } from "../../App";

type Props = {
  cartItems: ItemType[];
  addToCart: (clickedItem: ItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: ItemType[]) => {
    return items.reduce((ack, item) => ack + item.amount * item.price, 0);
  };

  return (
    <Wrapper>
      <div>Your Shopping Cart</div>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItems
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
