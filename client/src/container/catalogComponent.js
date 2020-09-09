import React from "react";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";
import {useState, useEffect} from 'react';
import axios from "axios";

function CatalogComponent (props) {
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:3001/products").then((data) => {
      setProducts( data.data );
    });
  },products) 
      return (
        <div className={cComponent.catalog}>
          {products && products.map((product) => {
            return (
              <div key={product.id} className={cComponent.pCard}>
                <div>
                  <ProductCard producto={product} />
                </div>
              </div>
            );
          })}
        </div>
      );
}
export default CatalogComponent;
