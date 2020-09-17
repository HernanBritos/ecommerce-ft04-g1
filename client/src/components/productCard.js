import React, { useEffect } from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import AgregarReview from "../container/agregarreview";
var placeholder = "/imagenes/Placeholder.png";

function ProductCard(props) {
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
              src={`/imagenes/${props.producto.img}`}
              alt="productCardImage"
            ></img>
          ) : (
            <img src={`${placeholder}`} alt="productCardImage"></img>
          )}
        </div>
        <div className={pCard.productData}>
          <span className={pCard.name}>{props.producto.name}</span>
          <span className={pCard.category}>{props.producto.category}</span>

          <ReactStars
            count={5}
            value={props.producto.rating}
            edit={false}
            size={15}
            isHalf={true}
          />
          <Link
            to={{
              pathname: "/products/" + props.producto.id + "/review",
            }}
          >
            <div className="AgregarReview">
              <AgregarReview id={props.producto.id} />{" "}
            </div>
          </Link>
          <span className={pCard.price}> $ {props.producto.price}</span>
          {props.producto.stock !== 0 ? (
            <span className={pCard.carrito}>
              <Link
                to={{
                  pathname: "/users/cart/" + props.producto.id + "?qty=" + 1,
                  state: props.producto.id,
                }}
              >
                <img alt="carrito" src="/imagenes/carrito-de-compras.png"></img>
              </Link>
            </span>
          ) : (
            <div className="alert-danger"> Sin Stock!</div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
