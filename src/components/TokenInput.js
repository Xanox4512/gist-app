import React from 'react'

const TokenInput = props => {
    return (
    <div>
    <form onSubmit={props.handleSubmit}>
    <label>
      Token:
      <input type="text" token={props.state.token} onChange={props.handleChange} placeholder='Wprowadź swój token' defaultValue={localStorage.getItem('token')}></input>
    </label>
    <input type="submit" value="Zatwierdź" />
  </form>
  </div>
    )
}

export default TokenInput