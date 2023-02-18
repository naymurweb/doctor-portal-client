import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const error=useRouteError()
    const {LogOut}=useContext(AuthContext)
    const handalerLogOut = () => {
        LogOut()
          .then(() => {})
          .catch((error) => console.log(error));
      };
    return (
        <div>
        <h3 className='text-red-500'>Not found!!!</h3>
        <p className='text-red-500'>{error.statusText||error.message}</p>
        <h4 className='text-red-500'>plz <button onClick={handalerLogOut
        }>signOut</button></h4>
            
        </div>
    );  
};

export default DisplayError;