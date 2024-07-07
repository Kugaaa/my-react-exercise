import {useState} from 'react';
import {PlusCircleIcon} from '@heroicons/react/24/solid'

const CustomForm = ({addTask}) => {

    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            id: Date.now(),
            name: task,
            emoji: "",
            completed: false
        });
        setTask("");
    };

    return (
        <form className="todo" onSubmit={handleSubmit}>
            <div className="wrapper">
                <input
                    type="text"
                    id="task"
                    className="input"
                    value={task}
                    onInput={(e) => setTask(e.target.value)}
                    required
                    autoFocus
                    maxLength={50}
                    placeholder="输入 Todo 名称"
                />
                <label
                    htmlFor="task"
                    className="label"
                >{"输入 Todo"}</label>
            </div>
            <button
                className="btn"
                aria-label="Add Task"
                type="submit"
            >
                <PlusCircleIcon/>
            </button>
        </form>);
}

export default CustomForm;