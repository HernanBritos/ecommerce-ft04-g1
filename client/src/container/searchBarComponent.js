import React, {useState, useEffect} from "react";
import sBar from "./css/searchBarComponent.module.css";
var search = require("../components/img/lupa.jpg");
// Importo la imagen del boton que acciona el form o searchbar

function searchBarComponent () {
    const [input, setInput] = useState({
      value: '',
    });
      // Creamos el estado del componente para almacenar
      // el valor del campo de busqueda

  const handleInputChange = async (e) => {
    e.persist();
    await setInput({value: e.target.value});
    // Funcion que maneja el estado del input
    // a medida que se va modificando, pasandolo
    // al estado general del componente
  };

    return (
      // Cuando el form se submitea llama a una funcion
      // que sera obtenida de this.props, le pasa el estado
      // y asi se comunica con el back
      <form>
        <div className={sBar.bar}>
          <button className={sBar.boton} type="submit">
            <img className={sBar.img} src={search} alt="searchBtn" />
          </button>
          <input
            className={sBar.search}
            type="text"
            placeholder="Buscar producto..."
            value={input.value}
            onChange={handleInputChange}
          ></input>
        </div>
      </form>
    );
}

export default searchBarComponent;
