import React, {useState, useEffect} from "react";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import pComp from "./css/productComponent.module.css";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
var placeholder = "/imagenes/Placeholder.png";

function ProductComponent(props) {
  const productDetails = useSelector(state => state.productDetails);
  const {product, loading, error} = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.producto.match.params.id));
    },[]);

console.log(props);
    return (
      <div>
        <div>
       <Link to="/">
        <button className="btn btn-primary">Volver al panel de admin</button>
      </Link>
      </div>
      <div className={pComp.card}>
        {
        loading? (<div>Loading...</div>):
        error? (<div>{error}</div>): 
        (<div>
        <div className={pComp.image}>
            <img
              src={`/imagenes/${product.img}`}
              alt="productCardImage"
            ></img>
            </div>
        <div className={pComp.productData}>
          <span className={pComp.name}>{product.name}</span>
          <span className={pComp.category}>{product.category}</span>
          <span className={pComp.description}>
            {product.description}
          </span>
          <span className={pComp.price}> $ {product.price}</span>
          <span className={pComp.stock}>
            {product.stock}
            <span className={pComp.stockIcon} role="img">
              &#9921;
            </span>
          </span>
        </div>
        </div>
        )
        }
        </div>  
        </div>    
    );
  } 

export default ProductComponent;
