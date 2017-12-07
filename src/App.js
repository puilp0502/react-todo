import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="Todo">
        <TodoInput />
        <TodoItemList todos={this.props.todos.reverse()} />
      </div>
    );
  }
}

function TodoInput(props) {
  return (
    <div className="Todo-input">
      <input type="text" placeholder="What needs to be done?" />
      <div id="submit-button"><i class="material-icons" id="submit-icon">arrow_forward</i></div>
    </div>
  );
}

function TodoItemList(props) {
  let list = props.todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} index={index} />))
  return <div className="Todo-item-list">{list}</div>;
}

function TodoItem(props) {
  let klass = "";
  let icon = "";
  if (props.todo.done) {
    klass = "Todo-item done";
    icon = <i class="material-icons item-status">check</i>;
  } else {
    klass = "Todo-item";
    icon = <i class="material-icons item-status">clear</i>;
  }
  return (
    <div className={klass}>
      <input type="text" value={props.todo.text} />
      <div class="Todo-item-check">{icon}</div>
    </div>

  )
}


export default App;
