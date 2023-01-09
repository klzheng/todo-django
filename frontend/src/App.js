import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
    const [todoList, SetTodoList] = useState([]);
    const [editing, SetEditing] = useState(false);
    const [activeItem, SetActiveItem] = useState({
        id: null,
        title: "",
        completed: false,
    });

    const fetchTasks = useCallback(() => {
        console.log("Fetching data...");

        fetch("http://127.0.0.1:8000/api/todo-list/")
            .then((response) => response.json())
            .then((data) => {
                SetTodoList(data);
            });
    }, []);

    const handleChange = (e) => {
        SetActiveItem({
            ...activeItem,
            title: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(activeItem);
        fetch("http://127.0.0.1:8000/api/todo-create/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(activeItem),
        }).then(() => {
            fetchTasks();
            SetActiveItem({
                id: null,
                title: "",
                completed: false,
            })
        }).catch((err) => {
            console.log("ERROR:", err)
        })
    };

    const updateItem = (e) => {
        e.preventDefault()
        const url = `http://127.0.0.1:8000/api/todo-update/${activeItem.id}/`
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(activeItem)
        }).then(() => {
            fetchTasks()
            SetActiveItem({
                id: null,
                title: "",
                completed: false,
            })
            SetEditing(false)
            console.log("Item updated")
        })
    }

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <Background>
            <Container>
                <Form onSubmit={editing ? updateItem : handleSubmit} className="form-container">
                    <Row>
                        <Col >
                            <Form.Control
                                onChange={handleChange}
                                type="textarea"
                                placeholder="Add task..."
                                value={activeItem.title}
                                id="task-item"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant={editing ? "success" : "primary"} type="submit">
                                {editing ? "Update Item" : "Create Item"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <TaskList 
                    tasks={todoList} 
                    fetchTasks={fetchTasks}
                    SetActiveItem={SetActiveItem} 
                    SetEditing={SetEditing}
                >
                </TaskList>
            </Container>
        </Background>
    );
}

export default App;
