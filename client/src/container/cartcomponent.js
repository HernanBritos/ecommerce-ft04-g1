import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Cart/Actions/cartActions";
import cComponent from "./css/cartComponent.module.css";

function CartComponent(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.c.match.params.id;
  const qty = props.c.location.search
    ? Number(props.c.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.c.history.push("/signin?redirect=shipping");
  };

  return (
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <div className={cComponent.actionpane}>
        <Link to="/">
          <button className="btn btn-info">Volver a Home</button>
        </Link>
        <center>
          <h2 className={`${cComponent.titulo}`}>Detalle de su carrito</h2>
        </center>
      </div>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío</div>
      ) : (
        cartItems.map((el) => (
          <div key={el.product} className={`${cComponent.carritoPage}`}>
            <div className={`${cComponent.cards}`}>
              <img
                className={`${cComponent.cardImage}`}
                src={`/imagenes/uploads/${el.img}`}
                alt="fotoCarrito"
              />
              <div className={`${cComponent.cardDet}`}>
                <Link to={`/product/${el.product}`}>{el.name}</Link>
              </div>
              <div className={`${cComponent.qty}`}>
                <label htmlFor="stock">Cantidad: </label>
                <input
                  name="stock"
                  type="number"
                  className="form-control"
                  id="stock"
                  value={el.qty}
                  onChange={(e) =>
                    dispatch(addToCart(el.product, e.target.value))
                  }
                />
                <button
                  onClick={() => removeFromCartHandler(el.product)}
                  className={` btn-danger ${cComponent.button}`}
                >
                  Eliminar
                </button>
              </div>
              <div className={`${cComponent.cardPrice}`}>
                <h4>Precio</h4>
                <span>$ {el.price}</span>
              </div>
            </div>
          </div>
        ))
      )}
      <div className={`${cComponent.footer}`}>
        <a>
          Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </a>
        <button
          onClick={checkoutHandler}
          className="btn btn-success"
          disabled={cartItems.length === 0}
        >
          Continuar con la compra
        </button>
      </div>
    </div>
  );
}

export default CartComponent;
