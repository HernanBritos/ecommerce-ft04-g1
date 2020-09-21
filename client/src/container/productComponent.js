import React, { useEffect, useState } from "react";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import cComponent from "./css/productComponent.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function ProductComponent(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { productDet, loadingDet, errorDet } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.producto.match.params.id));
  }, [dispatch, props.producto.match.params.id]);

  const handleAddToCart = () => {
    props.producto.history.push(
      "/users/cart/" + props.producto.match.params.id + "?qty=" + qty
    );
  };

  return (
    <div>
      <div>
        <Link to="/">
          <button className="btn btn-primary">Volver al panel de admin</button>
        </Link>
      </div>
      <div className={cComponent.cards}>
        {loadingDet ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorDet ? (
          <div>{errorDet}</div>
        ) : (
          <div className={`${cComponent.carritoPage}`}>
            <div className={`${cComponent.cards}`}>
              <div className={cComponent.stcolumn}>
                <img
                  className={`${cComponent.cardImage}`}
                  src={`/imagenes/uploads/${productDet.img}`}
                  alt=""
                  lazyload="true"
                />

                <div className={`${cComponent.cardDet}`}>
                  {productDet.name}
                  <h4 className={cComponent.cardCat}>{productDet.category}</h4>
                  <div className={cComponent.cardDesc}>
                    <p>
                      <i>{productDet.description}</i>
                    </p>
                  </div>
                  <ReactStars
                    count={5}
                    value={productDet.rating}
                    edit={false}
                    size={15}
                    isHalf={true}
                  />
                  <div className={`${cComponent.qty}`}>
                    <label htmlFor="stock">Cantidad: </label>
                    <input
                      name="stock"
                      type="number"
                      className="form-control"
                      id="stock"
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    />
                  </div>
                  <Link
                    to={{
                      pathname:
                        "/products/" +
                        props.producto.match.params.id +
                        "/review",
                    }}
                  >
                    <button className={cComponent.addreview}>
                      Dejá tu opinión
                    </button>
                  </Link>
                </div>
              </div>
              <div className={cComponent.ndcolumn}>
                <div className={`${cComponent.cardPrice}`}>
                  <h5>Precio</h5>
                  <span>$ {productDet.price}</span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={` ${cComponent.addcart}`}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductComponent;
