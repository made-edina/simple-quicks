import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, forwardRef } from 'react';
import moment from 'moment';
import { useForm } from "react-hook-form";

// COLLAPSE BUTTON
function CustomToggle({ _, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey)
  
    return (
      <img className="collapse-icon" onClick={decoratedOnClick} src="../images/buttons/collapse.svg" alt="collapse button" />
    );
  }

// DELETE BUTTON
const CustomToggleDelete = forwardRef(({ onClick }, ref) => (
    <img 
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="more" src="../images/buttons/more.svg" alt="more" />
));

function ToDo(props) {
    // CHECKBOX 
    const [checked, setChecked] = useState(props.completed[0] === "on" ? true : false)
    function handleChecked() {
        setChecked(prevState => !prevState)
    }
    
    //EDIT FORM 
    const { register, handleSubmit } = useForm({
        values: {
            title: props.title,
            date: props.date,
            desc: props.desc,
            completed:props.completed,
            tag: props.tag,
            id: props.id
        }
    });

    // EDIT TITLE
    const [inputShow, setInputShow] = useState(false)
    const [textShow, setTextShow] = useState(false)

    function handleEditTitle() {
        setInputShow(true)
    }

    function handleUpdateTitle(data) {
        setInputShow(false)
        setTextShow(false)
        props.setTodo(prevData => {
            return prevData.map(obj => {
              return obj.id === data.id ? data : obj
            })
          })
    }

    // EDIT DESCRIPTION
    function handleEditDesc() {
        setTextShow(true)
    }

    return (
        <>
        <Accordion defaultActiveKey="0" flush>
            <form onBlur={handleSubmit(handleUpdateTitle)}>
            <Card >
                <Card.Header>
                    <Container fluid>
                        <Row>
                            <Col xs="auto">
                                <input type="checkbox" {...register("completed")} onClick={handleChecked}/>
                            </Col>
                            <Col xs={6}>
                                <label 
                                    style={{display: inputShow ? 'none' : 'block', 
                                    textDecoration: checked ? 'line-through' : 'none',
                                    color: checked ? '#828282' : 'black'}}
                                    onClick={handleEditTitle} 
                                    className="todo-title">
                                        {props.title}
                                </label>
                                <input 
                                    style={{display: inputShow ? 'block' : 'none'}} 
                                    className="input-title w-100" {...register("title")} />
                                
                            </Col>
                            <Col style={{justifyContent: "flex-end", display: "flex"}}>
                                <span className="todo-days">{moment().to(moment(props.date), true)} left</span>
                                <span className="todo-date">{moment(props.date).format("D/MM/YYYY")}</span>
                                <CustomToggle eventKey="0">Click me!</CustomToggle> 
                                <Dropdown>
                                <Dropdown.Toggle as={CustomToggleDelete} id="dropdown-custom-components">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={props.handleDelete} className="delete" eventKey="1">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col xs="auto">
                                <img className="schedule-icon" src="../images/icons/date.svg" alt="schedule" />
                            </Col>
                            <Col>
                                <input type="date" {...register("date")} />
                            </Col>
                        </Row>
                        <Row className="description">
                            <Col xs="auto">
                            <img className="desc-icon" src="../images/icons/desc.svg" alt="desc" />
                            </Col>
                            <Col>
                            <p onClick={handleEditDesc} style={{display: textShow ? 'none' : 'block'}}>{props.desc}</p>
                            <textarea 
                                style={{display: textShow ? 'block' : 'none'}}
                                className='w-100' {...register("desc")} />
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </form>
        </Accordion>
        </>
    )
}

export default ToDo