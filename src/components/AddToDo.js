import { useForm } from "react-hook-form";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

// CUSTOM TOGGLE COLLAPSE 
function CustomToggle({ _, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
  
    return (
      <img onClick={decoratedOnClick} src="../images/buttons/collapse.svg" alt="collapse button" />

    );
  }

function AddToDo(props) {
    const { register, handleSubmit, reset, formState } = useForm();
    // const onSubmit = data => {
    //     fetch("https://my-json-server.typicode.com/made-edina/quick-database/todo", 
    //         {method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         }
    //     })
    //         .then(() => {
    //             props.pasAdd(true)
    //             // setShow(true)
    //         })

    //         .catch((err) => {
    //             console.log(err.message);
    //          });
    // };

    const onSubmit = (data) => {
        props.setAddTask(false)
        props.setTodo(prevTodo => {
            return [
                {...data,
                    desc: "No Description",
                    id: uuidv4(),
                    completed: []
                },
                ...prevTodo 
            ];
        
        })
        
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ 
            id: '',
            title: '',
            date: '',
            desc: '',
            completed: [],
            tag: ''
         });
        }
      }, [formState, reset]);

    return (
        <>
        <Accordion style={{display: props.addTask ? 'block' : 'none'}} defaultActiveKey="0" alwaysOpen flush>
            <form  onBlur={handleSubmit(onSubmit)}>
            <Card>
                <Card.Header>
                    <Container fluid>
                        <Row>
                            <Col xs="auto">
                                <input type="checkbox" {...register("completed")}/>
                            </Col>
                            <Col xs={6}>
                                <input className="input-title w-100" {...register("title")} placeholder="Type Task Title" />
                            </Col>
                            <Col style={{justifyContent: "flex-end", display: "flex"}}>
                                <CustomToggle eventKey="0">Click me!</CustomToggle> 
                                <img className="more" src="../images/buttons/more.svg" alt="more" />
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col xs="auto">
                                <img className="schedule-icon" src="../images/icons/schedule-gray.svg" alt="schedule" />
                            </Col>
                            <Col>
                                <input type="date" {...register("date")} placeholder="Set Date" />
                            </Col>
                        </Row>
                        <Row className="description">
                            <Col xs="auto">
                            <img className="desc-icon" src="../images/icons/desc-gray.svg" alt="desc" />
                            </Col>
                            <Col>
                                <p>No Description</p>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </form>
        </Accordion>
        </>
    );
}

export default AddToDo;