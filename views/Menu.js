import React, { useContext, useEffect, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Left, Body } from 'native-base'
import globalStyle from '../styles/Global'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'

export const Menu = () => {


  // Context de firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext)
  
  const { seleccionarPlatillo } = useContext(PedidosContext)

  const navigation = useNavigation()

  useEffect(() => {
    obtenerProductos();
  }, [])

  const mostrarHeading = (categoria, index) => {
    if(index > 0){
      const categoriaAnterior = menu[index - 1].categoria
    
      if(categoriaAnterior !== categoria){
        return(
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
          </Separator>
        )
      }
    } else{
      return(
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
        </Separator>
      )
    }
  }

  return (
    <Container style={globalStyle.contenedor}>
      <Content style={{backgroundColor: '#fff'}}>
        <List>
          {menu.map((platillo, index) => {
            const { imagen, nombre, descripcion, categoria, id, precio } = platillo

            return(
              <Fragment key={id}>
                { mostrarHeading(categoria, index) }
                <ListItem onPress={() => {
                  const { existencia, ...platillo2 } = platillo

                  seleccionarPlatillo(platillo2)
                  navigation.navigate('DetallePlatillo')
                }}>
                  <Thumbnail large square source={{uri: imagen}}/>
                  <Body>
                    <Text>{nombre}</Text>

                    <Text 
                      numberOfLines={2} 
                      note >
                      {descripcion}
                    </Text>

                    <Text>Precio: ${precio}</Text>

                  </Body>
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Content>
    </Container>
  )
}


const styles = StyleSheet.create({
  separador:{
    backgroundColor:'#000'
  },
  separadorTexto:{
    color: '#ffda00',
    fontWeight: 'bold',
    fontSize: 12
  }

})