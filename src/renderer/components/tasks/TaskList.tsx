import { useEffect, useState } from 'react';
import { Task } from '../../../shared/task.ts';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    try {
      const tasks = window.MainAPI.getAllTasks();
      console.log('got back results from loadTasks in component');
      console.dir(tasks);
      setTasks(tasks);
    } catch (e) {
      setTasks([]);
    }
  }, []);

  const taskRows = tasks.map((t: Task) => (
    <tr>
      <td>{t.id}</td>
      <td>{t.description}</td>
      <td>{t.priority}</td>
      <td>{t.due ? t.due.toLocaleDateString() : 'No due date'} </td>
      <td>{t.complete ? t.complete.toLocaleDateString() : 'No'}</td>
    </tr>
  ))
  return (
    <section className="task-list container">
      <h1>Tasks</h1>
      { tasks?.length > 0 &&
        <table>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due</th>
            <th>Completed?</th>
          </tr>
          { taskRows }
        </table>
      }
      { (!tasks || tasks.length === 0) &&
        <p>No tasks.</p>
      }
    </section>
  );
}
