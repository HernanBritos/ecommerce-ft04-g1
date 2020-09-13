import CnavBar from "./css/navBar.module.css";

function navBar(props)  {
    
    //console.log(props);

    return (
    <div className={CnavBar.topnav}>
        <a  href="http://localhost:3001/">Home</a>
        <a  href="http://localhost:3001/products">Products</a>
        <a href="http://localhost:3001/categories">Categories</a>
        <a href="http://localhost:3001/contact">About</a> {/* Falta hacer */}
    </div>
    );
  
}

export default navBar;