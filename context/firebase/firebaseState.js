import React, {useReducer} from 'react';
import FirebaseContext from './firebaseContext';
import firebaseReducer from './firebaseReducer';

import firebase from '../../firebase';
import _ from 'lodash';
import {OBTENER_PRODUCTOS_EXITO} from '../../types';


export const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  // Reducer
  const [state, dispath] = useReducer(firebaseReducer, initialState);

  // FUNCION PARA TRAER LOS PRODUCTOS
  const obtenerProductos = () => {
    // CONSULTAR FIREBASE
    firebase.db.settings({experimentalForceLongPolling: true});

    firebase.db
      .collection('producto')
      .where('existencia', '==', true)
      .onSnapshot(manejarSnapShot);

    function manejarSnapShot(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      platillos = _.sortBy(platillos, 'categoria');
      dispath({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
