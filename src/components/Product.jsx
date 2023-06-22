import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const productsInCart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products.map((product) => {
    return (
      <div className="col-md-3 my-2">
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
              variant="primary"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to Cart
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h1>Products Dashboard</h1>
        <button
          className="btn-secondary"
          onClick={() => {
            navigate("/cart");
          }}
        >
          view cart ({productsInCart.length})
        </button>
      </div>
      <div className="row">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          cards
        )}
      </div>
    </div>
  );
};

export default Product;
