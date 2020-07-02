import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'

class Pokemon extends Component {

  state = {
    abilities: [],
    stats: [],
    infos: null
  }

  componentDidMount() {
    this.getDetails()
  }

  getAbilities = () => {
    const { infos } = this.state
    let listOfAbilities = []
    let listOfStats = []
    listOfAbilities.push(infos.abilities.map(ab => ab.ability.name))
    listOfStats.push(infos.stats.map(st => st))
    this.setState({
      abilities: listOfAbilities,
      stats: listOfStats
    })
  }

  getDetails = () => {
    const { route } = this.props
    const { pokemonId } = route.params
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => this.setState({ infos: res.data }, this.getAbilities))
  }

  render() {
    const { route } = this.props
    const { pokemonId } = route.params
    const { abilities, stats, infos } = this.state
    if (!infos) {
      return <View><Text>loading {pokemonId}</Text></View>
    }
    return (
      <View>
        <Text style={styles.name}>{infos.name}</Text>
        <Image
          source={{
            uri: infos.sprites.front_default
          }}
          style={styles.image} />
        <View style={styles.infosContainer}>
          <View style={styles.infos}>
            <View style={styles.infosContainerTitle}>
              <Text style={styles.infosTitle}>Attaques :</Text>
            </View>
            {
              abilities.map(ability => (ability.map((ab, i) => (
                <Text key={i}>{ab}</Text>
              ))
              ))
            }
          </View>
          <View style={styles.infos}>
            <View style={styles.infosContainerTitle}>
              <Text style={styles.infosTitle}>Stats :</Text>
            </View>
            {
              stats.map(stat => (stat.map((s, i) => (
                <Text key={i}>{s.stat.name} : {s.base_stat}</Text>
              ))
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  image: {
    width: 300,
    height: 300
  },
  infos: {
    margin: 10
  },
  infosContainerTitle: {
    marginBottom: 5
  },
  infosTitle: {
    fontWeight: '600'
  },
  infosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#a4a4a4',
    borderRadius: 5
  }
})

export default Pokemon
