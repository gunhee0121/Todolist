import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import TodoInput from './components/TodoInput';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';


const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: 'React 공부하기', checked: false },
      { id: 1, text: 'React 소개', checked: true },
      { id: 2, text: 'React 예제 만들기', checked: false },
      { id: 3, text: 'HTML + CSS 공부하기', checked: false },
    ],
    color: '#343a40'
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
                    // input 의 다음 바뀔 값
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input: '',     
      todos: todos.concat({ // concat으로 배열에 추가
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => { // Enter면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
        todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoListTemplate
      form={(
        <TodoInput 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
        palette={(
          <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;


