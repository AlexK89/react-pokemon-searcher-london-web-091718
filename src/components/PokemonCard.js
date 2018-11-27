import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    clicked: false
  };

  getHp = () => this.props.pokemon.stats.find(item => item.name === 'hp').value;

  clickHandler = () => {
    this.setState({clicked: !this.state.clicked})
  };

  render() {
    const pokemon = this.props.pokemon;
    const imgToRender = this.state.clicked ? pokemon.sprites.back : pokemon.sprites.front;
    return (
      <Card>
        <div onClick={this.clickHandler}>
          <div className="image">
            <img src={imgToRender} alt={pokemon.name} />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
                {this.getHp()}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
