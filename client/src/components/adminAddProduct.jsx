import React from "react";
import cComponent from "../components/css/adminAddProduct.module.css";
import { Link } from "react-router-dom";

export default function AdminAddProduct() {


return (
<div class={cComponent.products} ng-app="app" ng-controller="AppCtrl">

  <md-content layout-padding>
    <div class="actionpane">
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
            <td><span class={cComponent.name}>Titanuim streak wedding band</span>
</td>
            <td>Rings</td>
            <td>N5,000.00</td>
            <td>12</td>
            <td><span class="label label-success"> Available </span></td>
            <td>4 Feb 2017</td>
          </tr>
          <tr>
            <td>123434</td>
            <td><span class={cComponent.name}>Cascade sterling silver wedding band</span>
</td>
            <td>Rings</td>
            <td>N5,000.00</td>
            <td>12</td>
            <td><span class="label label-danger"> UnAvailable </span></td>
            <td>4 Feb 2017</td>
          </tr>
        </tbody>
      </table>
    </div>
  </md-content>
</div>

)


};