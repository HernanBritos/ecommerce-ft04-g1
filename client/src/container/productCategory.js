import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";

function ProductCategory(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/categoria/${props.nombrecat}`)
      .then((data) => {
        setProducts(data.data);
        console.log(props.nombrecat);
      });
  }, products);

  return (
    <div>
      <Link to="/">
        <button className="btn btn-primary">Pagina de Inicio</button>
      </Link>
      <div className={cComponent.catalog}>
        {products.map((product) => {
          return (
            <div key={product.id} className={cComponent.pCard}>
              <div>
                <ProductCard producto={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategory;
