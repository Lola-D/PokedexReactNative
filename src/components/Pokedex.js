import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import axios from 'axios'

class Pokedex extends Component {

  state = {
    pokemonList: [],
    pokemonInfos: []
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=50&limit=50')
      .then(res => this.setState({ pokemonList: res.data.results }, () => this.getImage()))
  }

  getImage = () => {
    this.state.pokemonList.map(pokemon => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(res => this.setState({ pokemonInfos: [...this.state.pokemonInfos, res.data] }))
    })
  }

  getPokemon = pokemonId => {
    const { navigation } = this.props
    navigation.navigate('Pokemon', {
      pokemonId
    })
  }

  render() {
    const { pokemonInfos } = this.state
    return (
      <View style={{ margin: 10 }}>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {
            pokemonInfos.map((pokemon, i) => (
              <TouchableHighlight key={i} onPress={() => this.getPokemon(pokemon.id)}>
                <View style={styles.card}>
                  <Text style={styles.name}>
                    {pokemon.name}
                  </Text>
                  <Image
                    source={{
                      uri: pokemon.sprites.front_default
                    }}
                    style={styles.image} />
                </View>
              </TouchableHighlight>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#c6c6c6',
    borderRadius: 5,
    marginTop: 15
  },
  name: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  },
  image: {
    width: 150,
    height: 150
  }
})

export default Pokedex
