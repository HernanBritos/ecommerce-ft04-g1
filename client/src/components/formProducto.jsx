import React from "react";
import cComponent from "../components/css/formproducto.module.css";


export default function FormProduct() {

const [input, setInput] = React.useState({
    productname: '',
    description: '',
    price: '',
    stock: '',
    img: ''
    });

const [errors, setErrors] = React.useState({});

const handleInputChange = function(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    // setErrors(validate({
    //     ...input,
    //     [e.target.name]: e.target.value
    // }));
}

const handleSubmit = function(e) {
    e.preventDefault();
}

return (
    <form onSubmit={handleSubmit}>
    <div class={cComponent.form}>
    <h1 className="my-3">Add Product... </h1>
    <div class="nose">
    <label for="productname">Product Name: </label>
    <input 
    name="name"
    value={input.name} 
    type="text" 
    onChange={handleInputChange}
    class="form-control" 
    id="ProductName" 
    placeholder="Product Name"
    />
    </div>
    <div class="form-group">
    <label for="description">Description: </label>
    <input 
    name="description"
    value={input.description} 
    type="text" 
    onChange={handleInputChange}
    class="form-control" 
    id="Description" 
    placeholder="Description"
    />
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="form-group">
    <label for="price">Price: </label>
    <input 
    name="price"
    value={input.price} 
    type="real" 
    onChange={handleInputChange}
    class="form-control" 
    id="price" 
    placeholder="Price"
    />
    </div>
    <div class="form-group">
    <label for="stock">Stock: </label>
    <input 
    name="stock"
    value={input.stock} 
    type="number" 
    onChange={handleInputChange}
    class="form-control" 
    id="stock" 
    placeholder="Stock"
    />
    </div>
    <div class="form-group">
    <label for="exampleFormControlFile1"></label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1" />
    </div>
    <button type="submit" class="btn btn-outline-success">Add to Products</button>
    </div>
    
  </form>
    )


};