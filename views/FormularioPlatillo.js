import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import PedidosContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Content,
  Form,
  Icon,
  Grid,
  Input,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
  Col,
} from 'native-base';
import globalStyle from '../styles/Global';
import {useNavigation} from '@react-navigation/native';

export const FormularioPedido = () => {
  const [cantidad, setguardarCantidad] = useState(1);
  const [total, settotal] = useState(0);
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {precio} = platillo;

  const navigation = useNavigation();

  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad);
    setguardarCantidad(nuevaCantidad + 1);
  };

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    settotal(totalPagar);
  };

  const decrementar = () => {
    const nuevaCantidad = parseInt(cantidad);
    if (cantidad > 1) {
      setguardarCantidad(nuevaCantidad - 1);
    }
  };

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podra modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };
            guardarPedido(pedido);
            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyle.cantidad}>Cantidad</Text>
          <Grid style={{marginHorizontal: 0}}>
            <Col>
              <Button
                onPress={() => decrementar()}
                props
                dark
                style={{width: 110, height: 80, justifyContent: 'center'}}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                keyboardType="numeric"
                style={{textAlign: 'center', fontSize: 20}}
                value={cantidad.toString()}
                onChangeText={(cantidad) => setguardarCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                onPress={() => incrementar()}
                props
                dark
                style={{width: 119, height: 80, justifyContent: 'center'}}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyle.cantidad}>Subtotal: $ {total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => confirmarOrden()} style={globalStyle.boton}>
            <Text style={globalStyle.botonText}>Agregar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
