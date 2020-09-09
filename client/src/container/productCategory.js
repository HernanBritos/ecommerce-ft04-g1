import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";


class ProductCategory extends React.Component {
 
constructor(props) {
    super(props);
    this.props = props;
    this.state = { products: [] };
    
}

  componentDidMount() {
    axios.get(`http://localhost:3001/products/categoria/${this.props.nombrecat}`).then((data) => {
      this.setState({ products: data.data });
     console.log(this.props.nombrecat)
   });
  } 

  render() {
   
    return (
      <div>
         <Link to="/">
          <button className="btn btn-primary">
            Pagina de Inicio
          </button>
          </Link>
      
        <div className={cComponent.catalog}>
        {this.state.products.map((product) => {
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
}

export default ProductCategory;