import React from "react";
import sBar from "./css/searchBarComponent.module.css";
var search = require("../components/img/lupa.jpg");
// Importo la imagen del boton que acciona el form o searchbar

class searchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      // Creamos el estado del componente para almacenar
      // el valor del campo de busqueda
    };
  }

  handleInputChange = async (e) => {
    e.persist();
    await this.setState({ value: e.target.value });
    // Funcion que maneja el estado del input
    // a medida que se va modificando, pasandolo
    // al estado general del componente
  };

  render() {
    return (
      // Cuando el form se submitea llama a una funcion
      // que sera obtenida de this.props, le pasa el estado
      // y asi se comunica con el back
      <form onSubmit={this.props} className={sBar.bar}>
        <button type="submit">
          <img src={search} alt="searchBtn" />
        </button>
        <input
          className={sBar.search}
          type="text"
          placeholder="Buscar producto..."
          value={this.state.value}
          onChange={this.handleInputChange}
        ></input>
      </form>
    );
  }
}

export default searchBarComponent;
