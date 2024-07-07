// custom components
import TaskItem from "../TaskItem/TaskItem.jsx";

// styles
import styles from './TaskList.module.css';

const TaskList = ({tasks, deleteTask, completeTask, enterEditMode}) => {
    return (
        <div className={styles.tasks}>
            {tasks
                .sort((a, b) => b.id - a.id)
                .map(task =>
                    (
                        <TaskItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            completeTask={completeTask}
                            enterEditMode={enterEditMode}
                        />
                    ))
            }
        </div>
    );
}

export default TaskList;