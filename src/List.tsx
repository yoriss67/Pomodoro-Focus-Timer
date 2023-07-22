import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// 🌸🕰️
import History from './History'; 


// 🙋‍♀️🤔
// ①textのstate②todo配列のstateを作成

function List() {
  const [inputText, setInputText] = useState('');
  // 🤔🤔🤔🤔🤔why [] 🌸🌸🌸🌸🌸, [] is an empty array, which means that todos will start off as an empty array.
  const [todos, setTodos] = useState<Todo[]>([]);
  // 🌸🕰️ = history storage
  const [history, setHistory] = useState<Todo[]>([]);

  type Todo = {
    id: number;
    inputValue: string;
    checked: boolean;
    completedAt?: Date; // This property will hold the time of task completion.
  };

  // 🤔🤔🤔🤔🤔why two "HTML..."" 🌸🌸🌸🌸🌸This is more general than HTMLInputElement. It means that the event target can be any HTML element, not just an input element.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // 🌸🤬formじゃないからいらない
    // e.preventDefault();
    setInputText(e.target.value);
  };

  // 🌸🤬The e parameter in the handleSubmit function should be of type React.FormEvent<HTMLFormElement> instead of React.ChangeEvent<HTMLInputElement>. This is because handleSubmit is handling a form submission event, not an input change event.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🌸🤬handleSubmitの中じゃないと毎回作られない
    // 🌸🤬objectだから;じゃなく,
    const newTask: Todo = {
      // 🌸🤬For the id of newTask, since you don't have a separate state or variable to hold the next ID value, you could use the current length of the todos array as a simple way to generate unique IDs. Note that this approach only works as long as you never remove tasks from the middle of the list.
      // id: id,
      // 🙋‍♀️🤔why todos.length,?
      // 🌸👩‍🎓 Using the length of the todos array to generate the id is a simple way to ensure uniqueness when you're only adding items to the end of the list.
      // In a real-world application, you might use something like a UUID (Universally Unique Identifier) or an ID generated by a backend database to ensure uniqueness. For this simple example, using the array length as the id is an easy solution that doesn't require any extra libraries or backend setup.
      id: todos.length,
      inputValue: inputText,
      checked: false,
    };

    // 🌸🤬In the handleSubmit function, you're trying to add inputText directly to the todos array. But each todo should be an object with properties id, inputValue, and checked. So, you should create a new Todo object with these properties and add that to the todos array.
    // setTodos([inputText, ...todos]);
    // 🌸🤬In setTodos([newTask.inputValue, ...todos]), you should be adding newTask, not newTask.inputValue, to the todos array.
    // setTodos([newTask.inputValue, ...todos]);
    setTodos([newTask, ...todos]);

    console.log(todos);
  };

  const handleEdit = (id: number, inputValue: string) => {
    console.log(id, inputValue);
    // 🌸👩‍🎓 handleEdit: When the text input of a todo item is changed, this function is called with the id of the todo and the new input value. Inside this function, you should create a new array of todos where the todo with the given id has its inputValue replaced with the new input value. Then, call setTodos with this new array.
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        //      ↓👩‍🎓👩‍🎓今打ってるvalue
        todo.inputValue = inputValue;
      }
      // 🤔🤔🤔🤔🤔why todo🌸🌸🌸🌸🌸This line is in a .map function that is transforming the todos array.
      return todo;
    });
    setTodos(newTodos);
  };

  // 28:30~
  // 🤔🤔🤔🤔🤔is it default that when i click the checkbox, i cant edit TextField  className="inputText" ?🌸🌸🌸🌸🌸ここですdisabled={todo.checked}
  const handleChecked = (id: number, checked: boolean) => {
    console.log(id, checked);

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        //  ↓👩‍🎓👩‍🎓今打ってるvalueを前のinputValueに入れる  31:20👩‍🎓🤬「！」入れる！！！
        todo.checked = !checked;
        todo.completedAt = new Date();
      }
      return todo;
    });

    // 🌸🕰️
    // New: Filter out the completed todo and add it to the history
    const completedTodo = newTodos.find((todo) => todo.id === id && todo.checked);
    if (completedTodo) {
      setTodos(newTodos.filter((todo) => todo.id !== id)); // Remove the completed todo from todos
      setHistory([completedTodo, ...history]); // Add the completed todo to the history
      console.log(history, history);
    } else {
      setTodos(newTodos);
    }
  };

  const handleDelete = (id: number) => {
    console.log(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="content">
    <div className="list">
      <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="filled-basic"
          label="In this session, I'll do..."
          variant="filled"
          type="text"
          onChange={(e) => handleChange(e)}
          className="inputText"
        />
        <Button variant="contained" type="submit" value="create" className="submitButton">
          Create
        </Button>
      </form>
      {/* タスク設定が完了したら */}
      {/*ここから🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️  */}
      {/* 🌸🤬 */}
      <ul className="todoList">
        {/* 🌸🤬(todo) => のあとはかっこ！！ */}
        {todos.map((todo) => (
          <li key={todo.id} className="todo">
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              type="text"
              value={todo.inputValue}
              // 🌸🤬第一引数はtodo.id
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              className="inputText"
              disabled={todo.checked}
            />
            <input
              type="checkbox"
              checked={todo.checked}
              // 🌸🤬
              onChange={() => handleChecked(todo.id, todo.checked)}
            />
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

    </div>
      {/* 🌸🕰️ */}
      <History history={history} />
    </div>
  );
}
export default List;
