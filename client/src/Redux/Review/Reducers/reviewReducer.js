import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWS_REQUEST,
} from "../Constants/reviewConstants";

function addReviewReducer(state = {}, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return Object.assign({}, state, action.review);
    default:
      return state;
  }
}

function getReviewReducer(state = { reviews: [] }, action) {
  const filter = (el) => {
    return el.id !== action.payload;
  };
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        loadingRev: true,
        reviews: [],
      };
    case GET_REVIEWS:
      return {
        reviews: action.payload,
        loadingRev: false,
      };
    case DELETE_REVIEW:
      return (state = {
        reviews: state.reviews.filter(filter),
      });
    default:
      return state;
  }
}

export { addReviewReducer, getReviewReducer };
