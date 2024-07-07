import {useState} from 'react'

// custom components
import CustomForm from "./components/CustomForm/CustomForm.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import EditForm from "./components/EditForm/EditForm.jsx";
import EmojiSelector from "./components/Emoji/EmojiSelector.jsx";

// custom hooks
import useLocalStorage from "./hooks/useLocalStorage.jsx";

function App() {

    const [tasks, setTasks] = useLocalStorage("my-todo.tasks", [])
    const [preFocusEl, setPreFocusEl] = useState(null);

    // state for editing tasks
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    // state for emoji selection
    const [isEmojiSelecting, setIsEmojiSelecting] = useState(null);

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

    const updateEmoji = (emoji) => {
        setTasks(
            tasks.map(
                task => (
                    task.id === editedTask.id ? {...task, emoji} : task
                )
            )
        )
        closeEmojiSelectMode();
    }

    const enterEmojiSelectMode = (task) => {
        setIsEmojiSelecting(true);
        setEditedTask(task)
        setPreFocusEl(document.activeElement);
    }

    const closeEmojiSelectMode = () => {
        setIsEmojiSelecting(false);
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
            {
                isEmojiSelecting && (
                    <EmojiSelector updateEmoji={updateEmoji} closeEmojiSelectMode={closeEmojiSelectMode}/>
                )
            }
            <CustomForm addTask={addTask}/>
            {tasks &&
                <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                    enterEditMode={enterEditMode}
                    enterEmojiSelectMode={enterEmojiSelectMode}
                />
            }
        </div>
    )
}

export default App
