import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    return window.localStorage.getItem("tasks")
      ? JSON.parse(window.localStorage.getItem("tasks"))
      : [];
  });
  const finalizatedTasks = () => {
    let i = 0;

    tasks.forEach((e) => {
      if (!e.isFinalizated) i++;
    });

    return i;
  };

  const handleCheck = ({ index }) => {
    let anteriorTasks = [...tasks];
    anteriorTasks[index].isFinalizated = !anteriorTasks[index].isFinalizated;

    anteriorTasks;

    setTasks(anteriorTasks);

    window.localStorage.setItem("tasks", JSON.stringify(anteriorTasks));
  };

  const addTask = () => {
    const name = prompt("Nombre de la tarea");
    const color = prompt("Color de la tarea");
    const days = prompt("Dias de la tarea");

    const newTasks = [
      ...tasks,
      { name: name, color: color, days: days, isFinalizated: false },
    ];
    setTasks(newTasks);

    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = ({ index }) => {
    let anteriorTasks = [...tasks];
    anteriorTasks.splice(index, 1);

    console.log(anteriorTasks);

    setTasks(anteriorTasks);

    window.localStorage.setItem("tasks", JSON.stringify(anteriorTasks));
  };

  // useEffect(() => {
  //   tasks.forEach((e) => {
  //     if (!e.isFinalizated) remaining++;
  //   });
  // }, [tasks]);

  return (
    <div id="container">
      <div id="tasks">
        {tasks?.map((e, i) => {
          return (
            <div key={i} style={{ backgroundColor: e.color }} className="task">
              <h2>{e.name}</h2>
              <div className="buttons">
                <input
                  type="checkbox"
                  onChange={() => {
                    handleCheck({ index: i });
                  }}
                  checked={e.isFinalizated}
                />
                <button onClick={() => deleteTask({ index: i })}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {tasks.length > 0 && <p>Quedan {finalizatedTasks()} tareas</p>}
      <button id="create-task" onClick={addTask}>
        Crear tarea
      </button>
    </div>
  );
}

export default App;
