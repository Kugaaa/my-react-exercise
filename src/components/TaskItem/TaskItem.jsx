import {useState} from "react";

// libraries
import {CheckIcon} from '@heroicons/react/24/outline';
import {PencilIcon} from '@heroicons/react/24/outline';
import {TrashIcon} from '@heroicons/react/24/outline';


// styles
import styles from "./TaskItem.module.css"

const TaskItem = ({task, deleteTask, completeTask, enterEditMode}) => {

    const [checked, setChecked] = useState(task.completed)

    const handleCheckboxChange = (e) => {
        setChecked(!checked)
    }

    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checked}
                    name={task.name}
                    id={task.id}
                    onChange={handleCheckboxChange}
                />
                <label
                    htmlFor={task.id}
                    className={styles.label}
                    onClick={() => completeTask(task.id)}
                >
                    {task.name}
                    <p className={styles.checkmark}>
                        <CheckIcon strokeWidth={2} width={24} height={24}/>
                    </p>
                </label>
            </div>
            <div className={styles['task-group']}>
                <button
                    className="btn"
                    aria-label={`Update ${task.name} Task`}
                    onClick={() => enterEditMode(task)}
                >
                    <PencilIcon width={24} height={24}/>
                </button>

                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.name} Task`}
                    onClick={() => deleteTask(task.id)}
                >
                    <TrashIcon width={24} height={24}/>
                </button>
            </div>
        </li>)
}

export default TaskItem;