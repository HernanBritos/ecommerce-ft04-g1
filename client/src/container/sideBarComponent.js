import React from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";

class SideBarComponent extends React.Component {
  render() {
    return (
      <div>
        <div className={sBar.auth}>
          <a className={sBar.signIn} href="#">
            Iniciar Sesion
          </a>
          <a className={sBar.signUp} href="#">
            Registrarse
          </a>
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
