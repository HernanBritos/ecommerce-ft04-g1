import React, { useEffect, useState } from "react";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import cComponent from "./css/productComponent.module.css";
import { addToCart } from "../Redux/Cart/Actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

var placeholder = "/imagenes/Placeholder.png";

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
              <img
                className={`${cComponent.cardImage}`}
                src={`/imagenes/${productDet.img}`}
                alt="fotoCarrito"
              />
              <div className={`${cComponent.cardDet}`}>{productDet.name}</div>
              <div className={cComponent.cardDesc}>
                <p>
                  <i>{productDet.description}</i>
                </p>
              </div>
              <h4 className={cComponent.cardCat}>{productDet.category}</h4>
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
              <div className={`${cComponent.cardPrice}`}>
                <h4>Precio</h4>
                <span>$ {productDet.price}</span>
                <button
                  onClick={handleAddToCart}
                  className={`alert-warning ${cComponent.addcart}`}
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
