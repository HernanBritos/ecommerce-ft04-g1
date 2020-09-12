import React from "react";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";
import { useEffect } from "react";
import { listProduct } from "../Redux/Products/Actions/productActions";
import {useSelector, useDispatch} from 'react-redux';


function CatalogComponent(props) {
  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();
  
  useEffect(() => {
   dispatch(listProduct());
  },[]);
  return (
    <div className={cComponent.catalog}>
       {products? (
        products.map((product) => {
          return (
            <div key={product.id} className={cComponent.pCard}>
              <div>
                <ProductCard producto={product} />
              </div>
            </div>
          );
        })
      ) : (
        <div className={` ${cComponent.alerta} alert alert-warning`}>
          Oops! No hay productos creados aún. Prueba creando uno.
        </div>
      )}
    </div>
  );
}
export default CatalogComponent;
