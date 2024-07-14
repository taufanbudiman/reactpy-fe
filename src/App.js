import TaskList from './TaskLists';
import CreateTask from './CreateTasks';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="container mt-5">
          <h1 className="text-center mb-4">Task App</h1>
          <TaskList/>
      </div>
  );
}

export default App;
