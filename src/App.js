import React, { Component } from 'react';

import './App.css';
import Header from './Header'
import ThingList from './ThingList'
import AddThingButton from './AddThingButton'
import base from './base'

class App extends Component {
  componentWillMount() {
    this.ref = base.syncState(
      'things',
      {
        context: this,
        state: 'things'
      }
    )
  }

  state = {
    things: {}
  }

  thingCounter = 0


  addThing = (ev) => {
    ev.preventDefault()
    const id = this.thingCounter++
    const things = {...this.state.things}
    things[id] = {id, name : "", status : false}
    this.setState({ things })
  }

  saveThing = (thing) => {
    const things = {...this.state.things}
    things[thing.id] = thing
    this.setState({ things })
  }

  removeThing = (thing) => {
    const things = {...this.state.things}
    things[thing.id] = null
    this.setState({ things })
  }

  complete = (thing) => {
    const things = {...this.state.things}
    things[thing.id].checked = !things[thing.id].checked
    this.setState({ things })
  }

  render() {
    const actions = {
      saveThing: this.saveThing,
      removeThing: this.removeThing,
    }
  

    return (
      <div className="App">
        <Header />
        <AddThingButton addThing={this.addThing} />
        <ThingList
          things={this.state.things}
          {...actions}
        />
      </div>
    );
  }
}
export default App;
  