import React, { useEffect } from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Cart/Actions/cartActions";
var placeholder = "/imagenes/Placeholder.png";
function ProductCard(props) {
  const dispatch = useDispatch();

  const agregarCarrito = (props) => {
    dispatch(addToCart(props.id, 1));
  };

  return (
    <Link
      to={{
        pathname: "/product/" + props.producto.id,
        state: props.producto,
      }}
    >
      <div className={pCard.card}>
        <div className={pCard.image}>
          {props.producto.img.includes("jpg") ? (
            <img
              src={`/imagenes/uploads/${props.producto.img}`}
              alt=""
              lazyload="true"
            ></img>
          ) : (
            <img src={`${placeholder}`} alt="productCardImage"></img>
          )}
        </div>
        <div className={pCard.productData}>
          <span className={pCard.name}>{props.producto.name}</span>

          <ReactStars
            count={5}
            value={props.producto.rating}
            edit={false}
            size={12}
            isHalf={true}
          />

          <span className={pCard.price}> $ {props.producto.price}</span>
          {props.producto.stock !== 0 ? (
            <span className={pCard.carrito}>
              <Link
                to={{
                  pathname: "/",
                }}
              >
                <button type="button">
                  <img
                    src={`/imagenes/carrito-de-compras.png`}
                    alt="carrito"
                    onClick={() => agregarCarrito(props.producto)}
                  />
                </button>
              </Link>
            </span>
          ) : (
            <div className={`alert-danger ${pCard.nostock}`}> Sin Stock!</div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
