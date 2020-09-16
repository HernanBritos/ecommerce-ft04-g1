import React from "react";
import sBar from "./css/searchBarComponent.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

class searchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      search: "",
      flag: true,
    };
  }

  handleInputChange = (e) => {
    this.setState({ search: e.target.value });
  };

  componentDidUpdate = () => {
    if (this.state.flag) {
      axios
        .get(`http://localhost:3001/products/search?query=${this.state.search}`)
        .then((data) => {
          this.setState({ value: data.data });
          this.setState({ flag: false });
        });
    }
  };
  cambioFlag = () => {
    this.setState({ flag: true });
  };

  render() {
    return (
      <div>
        <form>
          <div className={sBar.bar}>
            <Link
              to={{
                pathname: "/products/search",
                state: this.state.value,
              }}
            >
              <button
                className={sBar.boton}
                type="submit"
                onClick={this.cambioFlag}
              >
                <SearchIcon />
              </button>
            </Link>
            <input
              className={sBar.search}
              type="text"
              placeholder="Buscar producto..."
              value={this.state.search}
              onChange={(e) => this.handleInputChange(e)}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default searchBarComponent;
