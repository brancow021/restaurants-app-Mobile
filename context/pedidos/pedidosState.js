import React, {useReducer} from 'react';
import firebase from '../../firebase';
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
} from '../../types';
import PedidosContext from './pedidosContext';
import pedidosReducer from './pedidosReducer';

export const PedidosState = (props) => {
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
  };

  const guardarPedido = (pedido) => {
    dispath({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };
  // Reducer

  const [state, dispath] = useReducer(pedidosReducer, initialState);

  //Seleccionar el producto que el usuario desear ordenar
  const seleccionarPlatillo = (platillo) => {
    dispath({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  // Muestra el total a pagar en el resumen
  const mostrarResumen = (total) => {
    dispath({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        total: state.total,
      }}>
      {props.children}
    </PedidosContext.Provider>
  );
};
