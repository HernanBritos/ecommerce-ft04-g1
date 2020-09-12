import React from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

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

  handleCategoryInputChange(e) {
    var categories = [];
    categories.push(e.target.id);
  }

  render() {
    return (
      <div>
        <div className={sBar.auth}>
          <button className={sBar.signIn} href="#">
            Iniciar Sesion
          </button>
          <Link to= "/users/signup">
            <button className={sBar.signUp} href="#">
               Registrarse
            </button>
          </Link>
        </div>
        <button className={sBar.closeButton} onClick={this.props.onclose}>
          x
        </button>
        <Link to="/admin">
          <div className={sBar.admin}>
            <button className={`btn btn-secondary`}>Admin</button>
          </div>
        </Link>
        <label className={sBar.filtro}>Filtrar por categoria: </label>
        <div className={sBar.categories}>
          {this.state.categories &&
            this.state.categories.map((cat) => (
              <div key={cat.id}>
                <Link to={"/products/categoria/" + cat.name}>
                  <button className={`${sBar.category}`}>{cat.name}</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default SideBarComponent;
