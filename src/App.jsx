import {useState} from 'react'

// custom components
import CustomForm from "./components/CustomForm/CustomForm.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import EditForm from "./components/EditForm/EditForm.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";

// custom hooks


function App() {

    const [tasks, setTasks] = useLocalStorage("my-todo.tasks", [])
    const [preFocusEl, setPreFocusEl] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    }

    const deleteTask = (id) => {
        setTasks(pre => pre.filter(task => task.id !== id));
    }

    const completeTask = (id) => {
        setTasks(
            tasks.map(
                task => (
                    task.id === id ? {...task, completed: !task.completed} : task
                )
            )
        )
    }

    const updateTask = (newTask) => {
        setTasks(
            tasks.map(
                task => (
                    // 如果 task.id === id，返回修改后的新对象（合并 其实只有 name 属性变了）
                    task.id === newTask.id ? {...task, name: newTask.name} : task
                )
            )
        )
        closeEditMode();
    }

    const enterEditMode = (task) => {
        setIsEditing(true);
        setEditedTask(task);
        setPreFocusEl(document.activeElement);
    }

    const closeEditMode = () => {
        setIsEditing(false);
        setEditedTask(null);
        preFocusEl && preFocusEl.focus();
    }

    return (
        <div className="container">
            <header>
                <h1>{"Hello My Todo List"}</h1>
            </header>
            {
                isEditing && (
                    <EditForm
                        editedTask={editedTask}
                        updateTask={updateTask}
                        closeEditMode={closeEditMode}>
                    </EditForm>
                )
            }
            <CustomForm addTask={addTask}/>
            {tasks &&
                <TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask}
                          enterEditMode={enterEditMode}/>}
        </div>
    )
}

export default App
