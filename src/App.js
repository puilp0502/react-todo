import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <TodoInput />
        <TodoItemList todos={this.props.todos} />
      </div>
    );
  }
}

function TodoInput(props) {
  return (
    <div className="Todo-input">
      <input type="text" placeholder="What needs to be done?" />
      <button>Submit</button>
    </div>
  );
}

function TodoItemList(props) {
  let list = props.todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} />))
  return <div className="Todo-item-list">{list}</div>;
}

function TodoItem(props) {
  const klass = props.todo.done ? "Todo-item Todo-done" : "Todo-item";
  return (
    <div className={klass}>
      {props.key}
      <input type="text" value={props.todo.text} />
      <button>Check</button>
    </div>

  )
}


export default App;
