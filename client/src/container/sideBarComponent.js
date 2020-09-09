import React from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom"; 
import axios from 'axios';

class SideBarComponent extends React.Component {

constructor() {
  super();
  this.state = { categories: [] };
 

}

componentDidMount() {
  axios.get("http://localhost:3001/categories").then((data) => {
    this.setState({ categories: data.data });
    console.log(this.state.categories)
  });
}

handleCategoryInputChange (e) {
  var categories = [];
  categories.push(e.target.id);
  
};

handleSubmit (e) {
  e.preventDefault();
  axios
    .get(`http://localhost:3001/products/category/${this.cat.name}`)
     .then((data) => {
      return data;
    });
  return (window.location = "http://localhost:3000/admin");
};


  render() {
    return (
      
      <div>
        <div className={sBar.auth}>
          <button className={sBar.signIn} href="#">
            Iniciar Sesion
          </button>
          <button className={sBar.signUp} href="#">
            Registrarse
          </button>
        </div>
        <button className={sBar.closeButton} onClick={this.props.onclose}>
          x
        </button>
        <Link to="/admin">
          <div className={sBar.admin}>
            <button className={`btn btn-secondary`}>Admin</button>
          </div>
        </Link>
        <div className={sBar.categories}>
        <label htmlFor="productname">Elegir x Categorias:  </label>
        
        <fieldset aria-labelledby="lblDBXP">
              <div id="choicelist">
                {this.state.categories &&
                  this.state.categories.map((cat) => (
                    <div key={cat.id}>
                      <input
                        name="DBXP"
                        type="radio"
                        id= {cat.id}
                        onChange={this.handleCategoryInputChange}
                      />
                      <label htmlFor={cat.id} aria-label="categories">
                        {cat.name}
                      </label>
                    </div>
                  ))}
              </div>
              <button onSubmit={this.handleSubmit}> Filtrar por Categorias
             </button>
            </fieldset>
           
            
        </div>
      </div>
    );
  }
}

export default SideBarComponent;
