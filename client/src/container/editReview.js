import React, { useState } from "react";
import cComponent from "./css/addReviewContainer.module.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Select from "react-select";
import {
  setRating,
  updateReview,
} from "../Redux/Review/Actions/reviewAction.js";
import { useSelector, useDispatch } from "react-redux";

export default function EditReviewContainer(props) {
  const [input, setInput] = useState({
    id: props.props.match.params.idreview,
    title: "",
    description: "",
    star: "",
  });

  const dispatch = useDispatch();
  const getReviews = useSelector((state) => state.getReviews);
  const { loadingRev, reviews } = getReviews;

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputStarChange = function (e) {
    setInput({
      ...input,
      star: e.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(updateReview(props.props.match.params.id, input));
    var suma =
      reviews.reduce((acc, num) => {
        return acc + num.star;
      }, 0) / reviews.length;
    dispatch(setRating(props.props.match.params.id, suma));
  };

  return (
    <div className={cComponent.formPage}>
      <div className={cComponent.container}>
        <div className={cComponent.options}>
          <Link to="/">
            <button className={cComponent.botonBack}>
              <ArrowBackIcon />
            </button>
          </Link>
        </div>
        <div className={cComponent.upload}>
          <h3>Edite su Review: </h3>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Titulo: </label>
            <input
              placeholder="Nombre"
              name="title"
              value={input.title}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className={cComponent.categories}>
            <span>Puntaje: </span>
            <Select
              placeholder="Elija Puntaje"
              onChange={handleInputStarChange}
              options={[
                {
                  label: 1,
                  value: 1,
                },
                {
                  label: 2,
                  value: 2,
                },
                {
                  label: 3,
                  value: 3,
                },
                {
                  label: 4,
                  value: 4,
                },
                {
                  label: 5,
                  value: 5,
                },
              ]}
            />
          </div>
          <div className={cComponent.description}>
            <span>Descripcion: </span>
            <textarea
              placeholder="Ingrese descripcion"
              rows="2"
              name="description"
              value={input.description}
              onChange={handleInputChange}
              id="Description"
            ></textarea>
          </div>
          <button className={cComponent.botonAdd} type="submit">
            Añadir su Review
          </button>
        </form>
      </div>
    </div>
  );
}
