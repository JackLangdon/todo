import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleChange(e) {
    // watch for changes
    let newItem = e.target.value;

    // update state accordingly
    this.setState({
      newItem: newItem
    })
  }

  addItem() {
    // create a new item object with the input
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem,
    }

    // take the current list
    const updatedList = [...this.state.list];

    // add the new item object to the updated list
    updatedList.push(newItem);

    // update the state and reset the input
    this.setState({
      newItem: '',
      list: updatedList
    })
  }

  render() {
    return (
      <div>
        <h1>ToDo</h1>
        <input
          type="text"
          placeholder="Type new item here"
          value={this.state.newItem}
          onChange={this.handleChange}
          autoFocus
        />
        <button
          onClick={this.addItem}
        >
          Add
        </button>
        <ul>
          {/* List items go here mapped from state.list */}
        </ul>
      </div>
    )
  }
}

export default App;
