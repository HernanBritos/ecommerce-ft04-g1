import {USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL}  from '../constantes/userConstants'
import axios from "axios";

const getUser = () => async (dispatch) => {
    try {
        dispatch({type: USER_LIST_REQUEST});
        const  {data} = await axios.get("http://localhost:3001/users/");
        dispatch ( { type: USER_LIST_SUCCESS, payload: data})
    }
    catch(error)
     {
        dispatch ( { type: USER_LIST_FAIL, payload: error.message})
     }
};

  
const deleteUser = () => {
      
  };

const modificateUser = () => {
   
};

export {getUser, deleteUser, modificateUser}