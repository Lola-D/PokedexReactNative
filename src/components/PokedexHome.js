import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'

const Stack = createStackNavigator()

const PokedexHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokedex" component={Pokedex} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  )
}

export default PokedexHome