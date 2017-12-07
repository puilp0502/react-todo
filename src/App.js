import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: props.todos };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

  }
  handleSubmit(text) {
    this.setState((prevState, props) => (
      { todos: prevState.todos.concat([{ text: text, done: false }]) }
    ));
  }
  handleStatusChange(index, newTodo) {
    this.setState(function (prevState, props) {
      let todos = prevState.todos;
      todos[index] = newTodo;
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
    let klass = "", icon = "";
    if (this.props.todo.done) {
      klass = "Todo-item done";
      icon = <i className="material-icons item-status">check</i>;
    } else {
      klass = "Todo-item";
      icon = <i className="material-icons item-status">clear</i>;
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
          {icon}
        </div>
      </div>

    )
  }
}


export default App;
