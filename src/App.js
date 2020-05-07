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

  removeItem(id) {
    // get current list
    const currentList = [...this.state.list];

    // filter out item containing the target id
    const updatedList = currentList.filter((item) => {
      return (
        item.id !== id
      )
    })

    // update the state
    this.setState({
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
          {
            this.state.list.map((item) => {
              return (
                <li
                  // give a unique key using the item id
                  key={item.id}
                >
                  {item.value}
                  <button
                    // pass item id into remove method
                    onClick={() => this.removeItem(item.id)}
                  >
                    X
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default App;
