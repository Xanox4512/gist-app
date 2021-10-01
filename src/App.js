import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TokenInput from './components/TokenInput';
import Main from './components/Main';
import EditGist from './components/EditGist';
import CreateGist from './components/CreateGist';

export default class App extends React.Component {
  state = {
    token: '',
    isTokenWritten: false,
  }

handleChange(event) {
  this.setState({token: event.target.value})
}

handleSubmit() {
  if(localStorage.getItem('token') == null) {
    localStorage.setItem('token', this.state.token)
    this.setState({isTokenWritten: true})
  }
  else this.setState({isTokenWritten: true})
}

render() {

  return(
    <div>
      {!this.state.isTokenWritten ? <div>
        <TokenInput state={this.state} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
      </div> :
      <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/edit_gist" component={EditGist}/>
            <Route path="/create_gist" component={CreateGist}/>
          </Switch>
        </Router> }
    </div>
  )
}
}