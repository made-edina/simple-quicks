import { useState, useEffect } from 'react';
import ToDo from './ToDo';
import AddToDo from './AddToDo';
import Spinner from 'react-bootstrap/Spinner';

function ToDoList(props) {
    const [todo, setTodo] = useState()
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
      fetch("https://my-json-server.typicode.com/made-edina/quick-database/todo")
        .then(res => res.json())
        .then(data => {
          setTodo(data)
          setRefresh(false)
          
        })
  
    }, [refresh])

    // DELETE TO-DO
    function handleDelete(id) {
        setTodo(prevToDo => {
          return prevToDo.filter(x => x.id !== id)
        })
    }

    return(
        <> 
        <AddToDo 
            setTodo={setTodo}
            addTask={props.addTask}
            setAddTask={props.setAddTask}
        />
        {todo ? 
        todo?.map(x => <ToDo 
            key={x.id}
            {...x}
            pasDelete={setRefresh}
            handleDelete={() => handleDelete(x.id)}
            setTodo={setTodo}
            />)
             : 
            <div className="loading">
            <Spinner className="d-block mx-auto load-spinner" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="loading-text">Loading Task List ...</p>
            </div>
        }
        </>
    )
}

export default ToDoList