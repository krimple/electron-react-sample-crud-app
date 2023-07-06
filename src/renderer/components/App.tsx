import './App.css'
import FileChooser from './FileChooser';
import DBInserter from "./DBInserter.tsx";
import DBTaskList from '$components/DBTaskList.tsx';

function App() {
  return (
    <>
        <FileChooser />
        <hr/>
        <DBInserter />
        <hr/>
        <DBTaskList />
    </>
  )
}

export default App
