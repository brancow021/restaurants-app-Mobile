import React, {useState, useContext, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import PedidosContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from 'native-base';

import globalStyle from '../styles/Global';
import {useNavigation} from '@react-navigation/native';

export const ResumenPedido = () => {
  const {pedido, total, mostrarResumen} = useContext(PedidosContext);

  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;

    nuevoTotal = pedido.reduce((nuevoTotal, articulo) => {
      return nuevoTotal + articulo.total;
    }, 0);

    mostrarResumen(nuevoTotal);
  };

  return (
    <Container style={globalStyle.contenedor}>
      <Content style={globalStyle.contenido}>
        <H1 style={globalStyle.titulo}>Resumen de pedido</H1>
        {pedido.map((platillo, index) => {
          const {cantidad, nombre, imagen, id, precio} = platillo;
          return (
            <List key={id + index}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: imagen}} />
                </Left>

                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: $ {precio}</Text>
                </Body>
              </ListItem>
            </List>
          );
        })}

        <Text style={globalStyle.cantidad}>Total a pagar: ${total}</Text>
        <Button
          onPress={() => navigation.navigate('menu')}
          style={[globalStyle.boton, {marginTop: 30}]}
          full>
          <Text style={globalStyle.botonText}>Seguir Pidiendo</Text>
        </Button>
      </Content>
    </Container>
  );
};
