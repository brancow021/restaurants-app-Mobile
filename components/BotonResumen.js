import React from 'react';
import {Button, Text} from 'native-base';
import globalStyle from '../styles/Global';
import {useNavigation} from '@react-navigation/native';

export const BotonResumen = () => {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => navigation.navigate('ResumenPedido')}
      style={globalStyle.boton}>
      <Text style={globalStyle.botonText}>Ir a Pedido</Text>
    </Button>
  );
};
