import React from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";

class SideBarComponent extends React.Component {
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
      </div>
    );
  }
}

export default SideBarComponent;
