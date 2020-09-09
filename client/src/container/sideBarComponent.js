import React from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom"; 
import axios from 'axios';
import ProductCategory from "./productCategory"

class SideBarComponent extends React.Component {

constructor() {
  super();
  this.state = { categories: [] };
 

}

componentDidMount() {
  axios.get("http://localhost:3001/categories").then((data) => {
    this.setState({ categories: data.data });
    
  });
}

handleCategoryInputChange (e) {
  var categories = [];
  categories.push(e.target.id);
  
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
        <div class="container">
    <div class="row">
        <div class="col-lg-12">
            
            <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Filtrar por Categoria <span class="caret"></span></button>
                <ul class="dropdown-menu scrollable-menu" role="menu">
                {this.state.categories &&
                  this.state.categories.map((cat) => (
                    <div>
                       <label htmlFor={cat.id} aria-label="categories">
                      <Link to={"/products/categoria/" + cat.name} > 
                        {cat.name}
                        </Link>
                      </label>
                    </div>
                    ))}
                </ul>
            </div>
            
        </div>
    </div>
</div>
        <div className={sBar.categories}>
        <label htmlFor="productname">Elegir x Categorias:  </label>
        <fieldset aria-labelledby="lblDBXP">
              <div id="choicelist">
                {this.state.categories &&
                  this.state.categories.map((cat) => (
                   <div key={cat.id}>
                     <input 
                        name="name" 
                        type="radio"
                        id= {cat.id}  	
                        onChange={this.handleCategoryInputChange}
                      />
                      <label htmlFor={cat.id} aria-label="categories">
                      <Link to={"/products/categoria/" + cat.name} > 
                        {cat.name}
                        </Link>
                      </label>
                     </div>
                  ))}
                </div>  
             </fieldset>
          </div> 
       </div> 
    );
  }
}

export default SideBarComponent;
