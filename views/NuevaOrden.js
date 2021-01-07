import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import globalStyle from '../styles/Global'
import { useNavigation } from '@react-navigation/native'

export const NuevoPedido = () => {

	const navigation = useNavigation();

	return (
		<Container style={globalStyle.contenedor}>
			<View style={[globalStyle.contenido, styles.contenido]}>
				<Button
					style={globalStyle.boton}
					rounded 
					block
					onPress={() => navigation.navigate('menu')}
				>
					<Text 
						style={globalStyle.botonText}>
						Crear Nueva Orden
					</Text>
				</Button>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	contenido: {
		flexDirection: 'column',
		justifyContent: 'center'
	}
})