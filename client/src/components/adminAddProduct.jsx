import React from "react";
import cComponent from "../components/css/adminAddProduct.module.css";
import { Link } from "react-router-dom";

export default function AdminAddProduct() {


return (
<div class={cComponent.products} ng-app="app" ng-controller="AppCtrl">

  <md-content layout-padding>
    <div class={cComponent.actionpane}>
    <Link to="/admin/products/add">
      <button class="btn btn-default">New Product</button>
    </Link> 
    </div>
    
    
    <div class="tables">
      <table class="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
      <thead><tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Created</th>
        </tr></thead>
        <tbody>
          <tr>
            <td>123434</td>
            <td><span class={cComponent.name}>Zapatos Negros</span>
</td>
            <td>Botas</td>
            <td>10,000.00</td>
            <td>12</td>
            <td><span class="label label-success"> Available </span></td>
            <td>07 Ago 2020</td>
            <div class={cComponent.botones} >
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked />  Edit
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off" /> Delete
            </label>
            </div>
            </div>
          </tr>
          <tr>
            <td>123434</td>
            <td><span class={cComponent.name}>Botas Altas Rojas</span>
</td>
            <td>Zapatos</td>
            <td>5,000.00</td>
            <td>12</td>
            <td><span class="label label-danger"> UnAvailable </span></td>
            <td>20 Marzo 2020</td>
            <div class={cComponent.botones} >
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked />  Edit  
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off" /> Delete
            </label>
            </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </md-content>
</div>

)


};