import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [editDescriptionInput, setEditDescriptionInput] = useState('');
  const [editDueDateInput, setEditDueDateInput] = useState('');
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (titleInput.trim() && descriptionInput.trim() && dueDateInput) {
      const newTodo = {
        title: titleInput,
        description: descriptionInput,
        dueDate: dueDateInput,
        id: Date.now(),
        completed: false,
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTitleInput('');
      setDescriptionInput('');
      setDueDateInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    s
    /
    '[;
    ----------------------------/etEditId(todo.id);
    setEditTitleInput(todo.title);
    setEditDescriptionInput(todo.description);
    setEditDueDateInput(todo.dueDate);
  };

  const saveEdit = () => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editId ? { ...todo, title: editTitleInput, description: editDescriptionInput, dueDate: editDueDateInput } : todo
      )
    );
    setEditId(null);
    setEditTitleInput('');
    setEditDescriptionInput('');
    setEditDueDateInput('');
  };

  const completeTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  }
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    [
    ]
    /
  ]'/[]
    ]
  };
  
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase()) ||
    todo.description.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const aValue = sortKey === 'dueDate' ? new Date(a.dueDate) : a[sortKey].toLowerCase();
    const bValue = sortKey === 'dueDate' ? new Date(b.dueDate) : b[sortKey].toLowerCase();
    return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="card input-card">
        <h2>Create New Task</h2>
        <div className="input-container">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Task Title"
            className="todo-input"
            aria-label="Task Title"
          />
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="Task Description"
            className="todo-input"
            aria-label="Task Description"
          />
          <input
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            className="todo-input"
            aria-label="Due Date"
          />
          <button onClick={addTodo} className="add-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="card filter-sort-card">
        <h2>Filter and Sort Tasks</h2>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by title or description"
          className="filter-input"
        />
        <div className="sort-container">
          <label htmlFor="sortKey">Sort by:</label>
          <select id="sortKey" onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="dueDate">Due Date</option>
          </select>
          
          <label htmlFor="sortOrder">Order:</label>
          <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="card result-card">
  <h2>Today's Tasks</h2>
  <table className="todo-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {sortedTodos.filter(todo => !todo.completed).map((todo) => (
        <tr key={todo.id}>
          <td>
            {editId === todo.id ? (
              <input
                type="text"
                value={editTitleInput}
                onChange={(e) => setEditTitleInput(e.target.value)}
                className="edit-input"
              />
            ) : (
              todo.title
            )}
          </td>
          <td>
            {editId === todo.id ? (
              <input
                type="text"
                value={editDescriptionInput}
                onChange={(e) => setEditDescriptionInput(e.target.value)}
                className="edit-input"
              />
            ) : (
              todo.description
            )}
          </td>
          <td>
            {editId === todo.id ? (
              <input
                type="date"
                value={editDueDateInput}
                onChange={(e) => setEditDueDateInput(e.target.value)}
                className="edit-input"
              />
            ) : (
              todo.dueDate
            )}
          </td>
          <td>
            {editId === todo.id ? (
              <button onClick={saveEdit} className="save-button">Save</button>
            ) : (
              <>
                <button onClick={() => startEdit(todo)} className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => removeTodo(todo.id)} className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={() => completeTodo(todo.id)} className="complete-button">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


<div className="card completed-tasks-card">
  <h2>Completed Tasks</h2>
  <button onClick={clearCompleted} className="clear-button">Clear All Completed Tasks</button>
  <table className="todo-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Due Date</th>
      </tr>
    </thead>
    <tbody>
      {todos.filter(todo => todo.completed).map((todo) => (
        <tr key={todo.id}>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>{todo.dueDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default App;
