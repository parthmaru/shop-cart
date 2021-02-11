import { useState } from "react";
import { useQuery } from "react-query";

// Material UI
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Bagde from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

// styles
import { Wrapper, StyledButton } from "./App.styles";

// components
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

export type ItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
};

function App() {
  const fetchProducts = async (): Promise<ItemType[]> => {
    const data = await fetch("https://fakestoreapi.com/products/").then((res) =>
      res.json()
    );

    return data;
  };

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ItemType[]>([]);

  const { data, isLoading, error } = useQuery<ItemType[]>(
    "products",
    fetchProducts
  );

  const getTotalItems = (items: ItemType[]) =>
    items.reduce((n: number, item) => n + item.amount, 0);

  const handleAddToCart = (clickedItem: ItemType) => {
    setCartItems((prev) => {
      // If item already exists
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      // First time item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          console.log(ack);
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ItemType[])
    );
  };

  return (
    <Wrapper>
      <div>
        <h1>Shop Cart</h1>
        {isLoading && <LinearProgress />}
        {error && <h3>Something went wrong...</h3>}

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Bagde badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Bagde>
        </StyledButton>

        <Grid container spacing={3}>
          {data?.map((item) => {
            return (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Wrapper>
  );
}

export default App;
