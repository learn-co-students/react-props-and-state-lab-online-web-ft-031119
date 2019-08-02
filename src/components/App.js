import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()
    // Set up initial state
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // uses the state to read filters.type and uses that value to help set the endpoint for an api fetch call
  fetchPets = () => {
    let endpoint = '/api/pets';
    const filterType = this.state.filters.type

    if (filterType !== 'all') {
      endpoint += `?type=${filterType}`
    }

    // Sets state.pets to the json response of the api fetch call using the generated endpoint
    fetch(endpoint)
      .then(response => response.json())
      .then(pets => this.setState({ pets }))
  }

  // sets the state for filters.type to the selected value
  onChangeType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  // prop callback that gets passed down to PetBrowser's children components through props
  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet
    })

    this.setState({ pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              {/* // uses state.pets to set the pets prop on PetBrowser */}
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
