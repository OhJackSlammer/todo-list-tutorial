import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import * as KEYS from './constants/keys';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => []);

  const addNewTask = () => {
    setTasks(prev => {
      return [...prev, {
        title: '',
        is_complete: false
      }]
    })
  }

  const saveTasksToStorage = (newTasks) => {
    window.localStorage.setItem(KEYS.TASK_STORAGE_KEY, JSON.stringify(newTasks));
  }

  const completeTask = (index) => {
    let copy =  [...tasks]
    copy.splice(index, 1);
    setTasks(copy)
    saveTasksToStorage(copy)
  }

  const deleteTask = (index) => {
    let copy =  [...tasks]
    copy.splice(index, 1);
    setTasks(copy)
    saveTasksToStorage(copy)
  }

  const changeTaskTitle = (index, value) => {
    let copy = [...tasks];
    copy[index].title = value;
    setTasks(copy)
    saveTasksToStorage(copy)
  }

  useEffect(() => {
    try {
      let savedTasks = window.localStorage.getItem(KEYS.TASK_STORAGE_KEY);

      if (!savedTasks){
        addNewTask()
      }

      savedTasks = JSON.parse(savedTasks);

      setTasks(savedTasks)
    } catch (err) {

    }
  }, [])



  return (
    <Container>
      <Button className="mt-5 mb-5" onClick={addNewTask}>Add Task To List</Button>
      {
        tasks.map((task, i) => {
            return (
              <Row key={i} className="mt-2 mb-2">
                <Col>
                  <Form.Group>
                    <Form.Control type="text" 
                                  value={task.title}
                                  onChange={evt => changeTaskTitle(i, evt.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="success" onClick={() => completeTask(i)}>Task Complete</Button>
                  <Button variant="danger"  onClick={() => deleteTask(i)}>X</Button>
                </Col>
              </Row>
            )
        })  
      }
    </Container>
  );
}

export default App;
