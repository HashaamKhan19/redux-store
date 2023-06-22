import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(remove({ id }));
  };

  const cards = products.map((product) => {
    return (
      <div className="col-md-12 my-2">
        <Card style={{ width: "18rem" }} key={product.id} className="h-100">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px", alignSelf: "center" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description.substring(0, 50)}...</Card.Text>
            <Card.Text>Price: Rs.{product.price}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="danger"
              onClick={() => {
                removeFromCart(product.id);
              }}
            >
              Remove from Cart
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return <div className="row">{cards}</div>;
};

export default Cart;
