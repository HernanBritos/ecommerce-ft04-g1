import React, { useEffect } from "react";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import pComp from "./css/productComponent.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

var placeholder = "/imagenes/Placeholder.png";

function ProductComponent(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { productDet, loadingDet, errorDet } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.producto.match.params.id));
  }, [dispatch, props.producto.match.params.id]);

  return (
    <div>
      <div>
        <Link to="/">
          <button className="btn btn-primary">Volver al panel de admin</button>
        </Link>
      </div>
      <div className={pComp.card}>
        {loadingDet ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorDet ? (
          <div>{errorDet}</div>
        ) : (
          <div>
            <div className={pComp.image}>
              {productDet.img ? (
                <img
                  src={`/imagenes/${productDet.img}`}
                  alt="productCardImage"
                ></img>
              ) : (
                <img
                  src={`/imagenes/${placeholder}`}
                  alt="productCardImage"
                ></img>
              )}
            </div>
            <div className={pComp.productData}>
              <span className={pComp.name}>{productDet.name}</span>
              <span className={pComp.category}>{productDet.category}</span>
              <span className={pComp.description}>
                {productDet.description}
              </span>
              <span className={pComp.price}> $ {productDet.price}</span>
              <span className={pComp.stock}>
                {productDet.stock}
                <span className={pComp.stockIcon} role="img">
                  &#9921;
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductComponent;
