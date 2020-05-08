import React from 'react';
import './App.css';

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

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value })
        }
      }
    }
  }

  handleChange(e) {
    // watch for changes
    let newItem = e.target.value;

    // update state accordingly
    this.setState({
      newItem: newItem
    })
  }

  addItem(e) {
    //prevent page auto refresh
    e.preventDefault();

    //require some input
    if (this.state.newItem !== '') {
      // create a new item object with the input
      const newItem = {
        id: 1 + Math.random(),
        value: this.state.newItem,
        checked: false
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

      // update local storage
      localStorage.setItem('list', JSON.stringify(updatedList));
    }
  }

  checkItem(id) {
    // get the current list
    const updatedList = [...this.state.list];

    // find item index
    const itemIndex = updatedList.findIndex((item) => {
      return (
        item.id === id
      )
    })

    // toggle checked
    updatedList[itemIndex].checked = !updatedList[itemIndex].checked;

    // update the state
    this.setState({
      list: updatedList
    })

    // update local storage
    localStorage.setItem('list', JSON.stringify(updatedList));
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

    // update local storage
    localStorage.setItem('list', JSON.stringify(updatedList));
  }

  render() {
    return (
      <div className="todo">
        <h1 className="title">ToDo</h1>
        <form
          onSubmit={this.addItem}
          className="input-form"
        >
          <input
            type="text"
            placeholder="Type new item here"
            value={this.state.newItem}
            onChange={this.handleChange}
            autoFocus
            className="input"
          />
          <button
            type="submit"
            onClick={this.addItem}
            className="btn btn-add"
          >
            Add
          </button>
        </form>
        <ul className="list">
          {
            this.state.list.map((item) => {
              return (
                <li
                  // give a unique key using the item id
                  key={item.id}
                  className="list-item"
                >
                  <button
                    onClick={() => this.checkItem(item.id)}
                    className={item.checked === true ? 'checked btn btn-item' : 'btn btn-item'}
                  >
                    {item.value}
                  </button>
                  <button
                    onClick={() => this.removeItem(item.id)}
                    className="btn btn-remove"
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
