import React from 'react'
import CnavBar from './css/navBar.module.css'
function navBar(props)  {
    

    return (
    <div className={CnavBar.navBar}>
        <a className={CnavBar.navBar_a} href="http://localhost:3001/">Home</a>
        <a className={CnavBar.navBar_a}  href="http://localhost:3001/products">Products</a>
        <a className={CnavBar.navBar_a}  href="http://localhost:3001/categories">Categories</a>
        <a className={CnavBar.navBar_a} href="http://localhost:3001/contact">About</a> {/* Falta hacer */}
    </div>
    );
  
}

export default navBar;