import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NuevoPedido} from './views/NuevaOrden';
import {Menu} from './views/Menu';
import {DetallePlatillo} from './views/DetallePlatillo';
import {FormularioPedido} from './views/FormularioPlatillo';
import {ResumenPedido} from './views/ResumenPedido';
import {ProgresoPedido} from './views/ProgresoPedido';
import {FirebaseState} from './context/firebase/firebaseState';
import {PedidosState} from './context/pedidos/pedidosState';
import {decode, encode} from 'base-64';
import {BotonResumen} from './components/BotonResumen';

const Stack = createStackNavigator();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidosState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#ffda00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#000',
              }}>
              <Stack.Screen
                name="NuevaOrden"
                component={NuevoPedido}
                options={{
                  title: 'Nueva orden',
                }}
              />

              <Stack.Screen
                name="menu"
                component={Menu}
                options={{
                  title: 'Nuestro menu',
                  headerRight: (props) => <BotonResumen />,
                }}
              />

              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: 'Nueva orden',
                }}
              />

              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPedido}
                options={{
                  title: 'Ordenar Platillo',
                }}
              />

              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen del pedido',
                }}
              />

              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Nueva orden',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidosState>
      </FirebaseState>
    </>
  );
};

export default App;
