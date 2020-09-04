import React from "react";
import "./catalogComponent.css";
import ProductCard from "./productCard";
import data from "./data";
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
    return (
      <div className="catalog">
        {this.state.products.map((product) => {
          return (
            <div className="pcard">
              <div>
                <ProductCard producto={product} />
              </div>

              {/* <ProductCard producto={product} /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CatalogComponent;
