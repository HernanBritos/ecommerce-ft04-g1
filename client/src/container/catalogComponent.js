import React from "react";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";
import axios from "axios";

class CatalogComponent extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/products").then((data) => {
      this.setState({ products: data.data });
    });
  }
  render() {
    console.log(this.state.products);
    if (this.state.products.length > 0) {
      return (
        <div className={cComponent.catalog}>
          {this.state.products.map((product) => {
            return (
              <div className={cComponent.pCard}>
                <div>
                  <ProductCard producto={product} />
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={cComponent.catalog}>
          <div className={`alert alert-warning ${cComponent.alerta}`}>
            Oops! Parece que no hay ningún producto, prueba creando uno.
          </div>
        </div>
      );
    }
  }
}

export default CatalogComponent;
