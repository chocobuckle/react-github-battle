import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape, object, bool, string } from 'prop-types';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';

export default class Battle extends Component {
  static propTypes = {
    match: shape({
      isExact: bool,
      params: object,
      path: string,
      url: string
    }).isRequired
  }

  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset = (id) => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    });
  }

  render() {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button className='reset' onClick={() => this.handleReset('playerOne')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button className='reset' onClick={() => this.handleReset('playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneImage &&
          playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    );
  }
}
