import React, { useState, useEffect, useCallback } from 'react';
import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function Task() {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [filter, setFilter] = useState('all');
    const [priority, setPriority] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('');

    useEffect(() => {
        getTodos();
    }, []);

    const filterHandler = useCallback(() => {
        let filteredTodos = todos;
        if (filter !== 'all') {
            filteredTodos = filteredTodos.filter(todo =>
                filter === 'completed' ? todo.completed : !todo.completed
            );
        }
        if (priority !== 'all') {
            filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
        }
        return filteredTodos;
    }, [todos, filter, priority]);

    const saveLocalTodos = useCallback(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        saveLocalTodos();
    }, [todos, saveLocalTodos]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;
        setTodos([
            ...todos,
            { text: inputText, completed: false, priority: selectedPriority, id: Date.now() }
        ]);
        setInputText('');
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleCompleteTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleSelectPriority = (e) => {
        setSelectedPriority(e.target.value);
    };

    const getTodos = () => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    };

    return (
        <div>
            <form>
                <div className="mainInput">
                    <input
                        type="text"
                        className="todo-input"
                        value={inputText}
                        onChange={handleInputChange}
                    />
                    <div className="select">
                        <select name="priority" className="select-priority" onChange={handleSelectPriority}>
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <button className="todo-button" type="submit" onClick={handleAddTodo}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                    </button>
                </div>
                
            </form>
            <hr></hr>
            <div className="prioInput">
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                    <div className="select">
                        <select name="priority" className="filter-priority" onChange={handlePriorityChange}>
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    
                </div>
            <div className="todo-container">
                <ul className="todo-list">
                    {filterHandler().map(todo => (
                        <div className={`todo ${todo.priority}`} key={todo.id}>
                            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                {todo.text}
                            </li>
                            <button onClick={() => handleCompleteTodo(todo.id)} className="complete-btn">
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button onClick={() => handleDeleteTodo(todo.id)} className="trash-btn">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Task;
