import {useCallback, useState} from "react";
import {Task} from '../../shared/task';

function DBTaskList() {
    const [tasks, setTasks] = useState<Task[]|null>(null);

    const loadTasks = useCallback(() => {
        const tasks = window.MainAPI.getAllTasks();
        console.log('got back results from loadTasks in component');
        console.dir(tasks);
        setTasks(tasks);
    }, [])
    return (
        <>
            <h2>Electron SQLite Task List</h2>
            <button onClick={loadTasks}>Load</button>
            <pre>{JSON.stringify(tasks || [], null, 2)}</pre>
        </>
    )
}

export default DBTaskList;
