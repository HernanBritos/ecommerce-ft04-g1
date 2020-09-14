import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hInicio from "../components/css/headerInicio.module.css";


export default function Cart() {

    return (
        <div>
             <div className={hInicio.cart}>
               <Link
                to={{
                  pathname: "/users/cart",
               }}
              >
                <button
                className={hInicio.cartboton2}
                type="submit"
                >
                  <img src={require(`./carrito-de-compras.png`)} className={hInicio.cartboton} />
                </button>
              </Link>
        </div>
        </div>
    )
}