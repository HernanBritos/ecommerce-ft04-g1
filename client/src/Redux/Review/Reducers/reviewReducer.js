import { ADD_REVIEW, GET_REVIEWS } from "../Constants/reviewConstants";

function addReviewReducer(state = {}, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return Object.assign({}, state, action.review);
    default:
      return state;
  }
}

function getReviewReducer(state = { reviews: [] }, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return (state = {
        reviews: action.payload,
      });
    default:
      return state;
  }
}

export { addReviewReducer, getReviewReducer };
