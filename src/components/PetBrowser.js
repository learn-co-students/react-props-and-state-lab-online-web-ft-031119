import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  generatePetCards = () =>{
    return this.props.pets.map( pet => <Pet onAdoptPet={this.props.onAdoptPet} key={pet.id} pet={pet}/>)
  }

  render() {
    return <div className="ui cards">
            {this.generatePetCards()}
          </div>
  }
}

export default PetBrowser
