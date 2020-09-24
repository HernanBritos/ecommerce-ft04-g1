import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addToCart,
  removeFromCart,
  fetchOrders,
} from "../Redux/Cart/Actions/cartActions";
import cComponent from "./css/cartComponent.module.css";

function CartComponent(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.c.match.params.id;
  const qty = props.c.location.search.split("=")[1] || 1;

  const [input, setInput] = useState({
    idUser: "",
    date: "",
    priceTotal: "",
    status: "pendiente",
    address: "",
    description: "",
    paymentmethod: "",
    shipping: "",
    products: cartItems,
    qty: qty,
  });

  const dispatch = useDispatch();

  const fetchUser = () => {
    var user = JSON.parse(localStorage.getItem("user"));

    user && setInput({ ...input, idUser: user.id });
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  var subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  var cantidad = cartItems.reduce((a, c) => a + c.qty, 0);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (input.idUser) {
      dispatch(fetchOrders(input.idUser));
    }
    fetchUser();
  }, [dispatch, productId, qty, input.idUser]);

  const checkoutHandler = async () => {
    await axios
      .post(`http://localhost:3001/users/${input.idUser}/orders`, {
        idUser: input.idUser,
        date: input.date,
        priceTotal: subtotal,
        status: input.status,
        address: input.address,
        description: input.description,
        paymentmethod: input.paymentmethod,
        shipping: input.shipping,
      })
      .then((data) => {
        console.log(data.data.id);
        cartItems.map(async (product) => {
          await axios
            .post(`http://localhost:3001/orders`, {
              idOrder: data.data.id,
              idProduct: product.product,
              price: product.price,
              ammount: product.qty,
            })
            .then((res) => console.log(res));
        });
        return data;
      });
    return null;
    // return (window.location = `http://localhost:3000/users/${input.idUser}/orders`);
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
        <div className="alert-info">El carrito está vacío</div>
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
                  onChange={(e) => {
                    return dispatch(addToCart(el.product, e.target.value));
                  }}
                />
                <button
                  onClick={() => removeFromCartHandler(el.product)}
                  className={`btn btn-danger ${cComponent.button}`}
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
        <form>
          {/* <div className="form-group">
            <label htmlFor="idUser">Id User: </label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="idUser"
              value={input.idUser}
              type="number"
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="address">Direccion: </label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="address"
              value={input.address}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripcion: </label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="description"
              value={input.description}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentmethod">Forma de pago: </label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="paymentmethod"
              value={input.paymentmethod}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipping">Envio: </label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="shipping"
              value={input.shipping}
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </form>
        <h4>
          Subtotal: ({cantidad} items) : $ {subtotal}
        </h4>
        {JSON.parse(localStorage.getItem("user")) ? (
          <Link
            to={{
              pathname: `/users/${input.idUser}/orders`,
              state: { cartItems },
            }}
          >
            <button
              onClick={checkoutHandler}
              className="btn btn-success"
              disabled={cartItems.length === 0}
            >
              Finalizar compra
            </button>
          </Link>
        ) : (
          <Link
            to={{
              pathname: `/users/login`,
              state: {
                redCart: true,
                formCart: input,
                cartItems: cartItems,
                subtotal: subtotal,
              },
            }}
          >
            <button
              className="btn btn-success"
              disabled={cartItems.length === 0}
            >
              Finalizar compra
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CartComponent;
