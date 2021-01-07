import React, {useContext} from 'react';
import {Image} from 'react-native';
import PedidosContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
} from 'native-base';
import globalStyle from '../styles/Global';
import {useNavigation} from '@react-navigation/native';

export const DetallePlatillo = () => {
  const {platillo} = useContext(PedidosContext);
  const {nombre, imagen, descripcion, precio} = platillo;

  const navigation = useNavigation();

  return (
    <Container style={globalStyle.contenedor}>
      <Content style={globalStyle.contenido}>
        <H1 style={globalStyle.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyle.imagen} source={{uri: imagen}} />
              <Text style={{marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyle.cantidad}>Precio: $ {precio}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            onPress={() => navigation.navigate('FormularioPlatillo')}
            style={globalStyle.boton}>
            <Text style={globalStyle.botonText}>Ordenar Platillo</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
