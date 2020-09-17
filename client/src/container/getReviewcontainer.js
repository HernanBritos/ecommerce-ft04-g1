import React from 'react';
import { setReview } from '../Redux/Review/Actions/reviewAction';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';
import cComponent from "./css/formproducto.module.css";
import ReactStars from "react-rating-stars-component";


function GetReviewContainer (props) {

const [reviews, setReviews] = useState([]);


useEffect(() => {
    
    axios.get(`http://localhost:3001/products/${props.producto}/review`).then((data) => {
    setReviews(data.data);
    });
}, [0]);

console.log(reviews);

return (
    <div className={cComponent.Fcontent}>
    <div className="card border-dark mb-3" style={{ maxWidth: '18rem' }}>
    <div className="card-header">
        <strong>{reviews.title}</strong>

        <ReactStars count={5} value={reviews.star} edit={false} size={15} />
    </div>
    <div className="card-body text-dark">
        {/* <h5 className="card-title">Dark card title</h5> */}
        <p className="card-text">{reviews.description}</p>
    </div>
    </div>
    </div>
);

}

    
    
    export default GetReviewContainer;