import React from "react";
import sBar from "./css/sideBarComponent.module.css";

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
      </div>
    );
  }
}

export default SideBarComponent;
