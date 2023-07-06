import './App.css'
import FileChooser from './FileChooser';
import DBInserter from "./DBInserter.tsx";
import DBTaskList from '$components/DBTaskList.tsx';
import { TaskContainer } from '$components/tasks/TaskContainer.tsx';

function App() {
  return (
    <>
      <TaskContainer />
      <hr/>
      <FileChooser />
      <hr/>
      <DBInserter />
      <hr/>
      <DBTaskList />
    </>
  )
}

export default App
