import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import ToDoList from './components/ToDoList';

function App() {
  // POP-UP WINDOW
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ADD NEW TASK
  const [addTask, setAddTask] = useState(false);

  function AddNewTask() {
    setAddTask(prevState => !prevState);
  }

  return (
    <>
      <div className="App">
        <Modal className="todolist" show={show} onHide={handleClose} animation={false}  backdrop={'static'} scrollable={true} >
          <Modal.Header>
            <Dropdown>
              <Dropdown.Toggle className="mytask-button" variant="success" id="dropdown-basic">
                My Task
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Personal Errands</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Urgent To-Do</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
            <Button onClick={AddNewTask} variant="primary">New Task</Button>
          </Modal.Header>
          <Modal.Body>
            <ToDoList 
              addTask={addTask}
              setAddTask={setAddTask}
            />
          </Modal.Body>
        </Modal>
        <div className="menu-icons">
          <span><img className='todolist'onClick={handleShow} src="../images/buttons/todolist.svg" alt="to-do-list"/></span>
          <span><img className='messaging'src="../images/buttons/messaging.svg" alt="messaging-app"/></span>
          <span><img className='menu' src="../images/buttons/menu.svg" alt="menu"/></span>
        </div>
      </div>
    </>
  );
}

export default App;
