import { Button } from "react-bootstrap";

export default function TaskList({ tasks, SetActiveItem, fetchTasks, SetEditing }) {

    const startEdit = (item) => {
        SetEditing(true)
        SetActiveItem(item)
        document.getElementById("task-item").focus()
    }


    const toggleCompleted = (item) => {
        const url = `http://127.0.0.1:8000/api/todo-update/${item.id}/`
        fetch(url, {
            method: "PUT", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({...item, completed: !item.completed}),
        }).then((response) => {
            fetchTasks()
            console.log("Marked completed/uncompleted")
        })
    }


    const deleteItem = (id) => {
        const url = `http://127.0.0.1:8000/api/todo-delete/${id}/`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        }).then((response) => {
            fetchTasks()
            console.log("Successfully deleted item")
        })
    }


    return (
        <div className="task-list-container">
            {tasks.map((item) => {
                return (
                    <div key={item.id} className="form-inline">
                        <p 
                            className={item.completed ? "form-text strike-through" : "form-text"}  
                            onClick={() => toggleCompleted(item)}
                        >
                            {item.title}
                        </p>
                        <div className="form-icons">
                            <Button 
                                variant="outline-success"
                                onClick={() => startEdit(item)}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button 
                                variant="outline-danger"
                                onClick={() => deleteItem(item.id)}
                            >
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
