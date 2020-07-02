import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PokedexHome from './src/components/PokedexHome'
import Sac from './src/components/Sac'

const Tab = createBottomTabNavigator()
class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size }) => {
                let iconName
                let color
                if (route.name === 'PokedexHome') {
                  iconName = focused
                    ? 'book'
                    : 'book'
                  color = focused
                    ? '#fae007'
                    : '#aaa9a4'
                } else if (route.name === 'Sac') {
                  iconName = focused
                    ? 'shopping-bag'
                    : 'shopping-bag'
                  color = focused
                    ? '#fae007'
                    : '#aaa9a4'
                }
                return <Icon name={iconName} size={size} color={color} />
              }
            })}
            tabBarOptions={{
              showIcon: true,
              showLabel: true,
              style: {
                backgroundColor: '#f4502d',
              }
            }}
          >
            <Tab.Screen name='PokedexHome' component={PokedexHome} />
            <Tab.Screen name='Sac' component={Sac} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}

export default App
