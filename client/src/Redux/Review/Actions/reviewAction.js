import axios from "axios";
import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWS_REQUEST,
} from "../Constants/reviewConstants";

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const deleteReview = (reviewId, productId) => async (dispatch) => {
  await axios
    .delete(`http://localhost:3001/products/${productId}/review/${reviewId}`)
    .then((res) => {
      return res;
    });
  dispatch({ type: DELETE_REVIEW, payload: reviewId });
};

const setReview = (productId, review) => async (dispatch) => {
  await axios
    .post(`http://localhost:3001/products/${productId}/review`, {
      title: `${review.title}`,
      description: `${review.description}`,
      star: `${review.star}`,
    })
    .then((data) => {
      return data;
    });
  return (window.location = `http://localhost:3000/products/${productId}/review`);
};

const updateReview = (productId, review) => async (dispatch) => {
  await axios
    .put(`http://localhost:3001/products/${productId}/review/${review.id}`, {
      title: `${review.title}`,
      description: `${review.description}`,
      star: `${review.star}`,
    })
    .then((data) => {
      return data;
    });
  return (window.location = `http://localhost:3000/products/${productId}/review`);
};

const setRating = (productId, suma) => async (dispatch) => {
  await axios
    .put(`http://localhost:3001/products/${productId}`, {
      rating: suma,
    })
    .then((data) => {
      return data;
    });
};

const fetchReviews = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/products/${productId}/review`
    );
    dispatch({
      type: GET_REVIEWS,
      payload: data,
    });
  } catch (error) {}
};

export {
  addReview,
  getReviews,
  setReview,
  fetchReviews,
  setRating,
  deleteReview,
  updateReview,
};
