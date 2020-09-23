import React, { useState, useEffect } from "react";
import cComponent from "./css/addReviewContainer.module.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "react-select";
import {
  fetchReviews,
  setReview,
  setRating,
  deleteReview,
} from "../Redux/Review/Actions/reviewAction.js";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";

export default function AddReviewContainer(props) {
  const [input, setInput] = useState({
    title: "",
    description: "",
    star: "",
  });

  const [firstRender, setFirstRender] = useState(true);

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
    dispatch(setReview(props.producto, input, reviews));
    dispatch(setRating(props.producto));
  };

  useEffect(() => {
    if (props.producto && firstRender) {
      dispatch(fetchReviews(props.producto));
      setFirstRender(false);
    }
  }, [dispatch, props.producto, firstRender]);

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
          <h3>Agregar Review: </h3>
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
        <div className={cComponent.reviews}>
          {reviews.map((review) => {
            const rating = review.star;
            const rId = review.id;
            const onDelete = () => {
              dispatch(deleteReview(rId, props.producto));
              dispatch(setRating(props.producto));
            };

            return loadingRev ? (
              <div className="alert-info">Loading..</div>
            ) : (
              <div key={review.id} className={cComponent.review}>
                <div className={cComponent.botonDelete}>
                  {JSON.parse(localStorage.getItem("user")).id ===
                    review.idUser && (
                    <button onClick={onDelete}>
                      <DeleteIcon style={{ width: "20px", height: "20px" }} />
                    </button>
                  )}
                </div>
                <div className={cComponent.contenido}>
                  <p>{review.title}</p>
                  <p>{review.description}</p>
                  <span>
                    <ReactStars
                      count={5}
                      edit={false}
                      value={rating}
                      size={15}
                    />
                  </span>
                </div>
                <div className={cComponent.botonEdit}>
                  <Link
                    to={{
                      pathname:
                        "/products/" +
                        `${props.producto}` +
                        "/review/" +
                        `${review.id}` +
                        "/edit",
                      state: review,
                    }}
                  >
                    {JSON.parse(localStorage.getItem("user")).id ===
                      review.idUser && (
                      <button>
                        <EditIcon style={{ width: "20px", height: "20px" }} />
                      </button>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
