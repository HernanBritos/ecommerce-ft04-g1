  
  export const getUser = (user) => {
      return{
          type: 'GET_USER',
          payload: user
      }
  };
  
  export const deleteUser = (user) => {
      return {
          type: 'DELETE_USER',
          payload: user
      } 
  };
  export const modificateUser = (user) => {
    return{
        type: 'MODIFICATE_USER',
        payload: user
    }
};