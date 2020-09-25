import React from 'react';
import navbar from './css/navbar.module.css';

class NavBar extends React.Component {
    render() {
        return (
            <div class="topnav" className={navbar.navbar} id="myTopnav">
            <a href="http://localhost:3000/" class="active">Inicio</a>
            <a href="#">Quines somos</a>
            <a href="#">Historia</a>
            <a href="#">Historia</a>
            <a href="#">Contacto</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
            </a>
        </div>
        )
    }    
}

export default NavBar;