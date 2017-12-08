import React, { Component } from 'react';
import './App.css';

const STORAGE_KEY = 'react-todo.App.todos';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.storage = props.storage;
    this.state = { todos: this.getStoredTodos(this.storage) };
  }
  getStoredTodos(storage){
    return JSON.parse(storage.getItem(STORAGE_KEY) || '[{"text": "Learn react", "done": true}]');
  }
  storeTodo(storage, todos) {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
  handleSubmit(text) {
    this.setState(function (prevState, props) {
      let todos = prevState.todos;
      todos.push({ text: text, done: false });
      this.storeTodo(this.storage, todos);
      return { todos: todos };
    });
  }
  handleStatusChange(index, newTodo) {
    this.setState(function (prevState, props) {
      let todos = prevState.todos;
      todos[index] = newTodo;
      this.storeTodo(this.storage, todos);
      return { todos: todos };
    });
  }
  render() {
    return (
      <div className="Todo">
        <TodoInput handleSubmit={this.handleSubmit} />
        <TodoItemList
          handleStatusChange={this.handleStatusChange}
          todos={this.state.todos} />
      </div>
    );
  }
}

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.handleSubmit(this.textInput.value);
      this.textInput.value = '';
    }
  }
  handleOnClick(e) {
    this.props.handleSubmit(this.textInput.value);
    this.textInput.value = '';
  }
  render() {
    return (
      <div className="Todo-input">
        <input
          type="text"
          placeholder="What needs to be done?"
          onKeyPress={this.handleKeyPress}
          ref={(input) => (this.textInput = input)} />
        <div
          id="submit-button"
          onClick={this.handleOnClick}>
          <i className="material-icons" id="submit-icon">arrow_forward</i>
        </div>
      </div>
    );
  }
}

function TodoItemList(props) {
  let list = props.todos.map((todo, index) => (
    <TodoItem
      key={index}
      index={index}
      todo={todo}
      handleStatusChange={props.handleStatusChange} />)).reverse()
  return <div className="Todo-item-list">{list}</div>;
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleTextChange(event) {
    const newTodo = { "text": event.target.value, "done": this.props.todo.done };
    this.props.handleStatusChange(this.props.index, newTodo);
  }
  handleClick(event) {
    const todo = this.props.todo;
    const newTodo = { "text": todo.text, "done": !todo.done };
    this.props.handleStatusChange(this.props.index, newTodo);
  }
  render() {
    let klass = "";
    if (this.props.todo.done) {
      klass = "Todo-item done";
    } else {
      klass = "Todo-item";
    }
    return (
      <div className={klass}>
        <input
          type="text"
          defaultValue={this.props.todo.text}
          onBlur={this.handleTextChange} />
        <div
          className="Todo-item-check"
          onClick={this.handleClick}>
          <i className="material-icons item-status">check</i>
        </div>
      </div>

    )
  }
}


export default App;
