import React from "react";
// Material UI
import Button from "@material-ui/core/Button";

// styles
import { Wrapper } from "./Item.styles";

// type
import { ItemType } from "../../App";
import IconButton from "@material-ui/core/IconButton";

type Props = {
  item: ItemType;
  handleAddToCart: (clickedItem: ItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt="itemImg" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
    </Wrapper>
  );
};

export default Item;
