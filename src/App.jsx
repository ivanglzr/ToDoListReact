import { useState } from "react";
import "./App.css";
// import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleCheck = ({ index }) => {
    let anteriorTasks = tasks;
    anteriorTasks[index].isFinalizated = !anteriorTasks[index].isFinalizated;

    setTasks(anteriorTasks);

    tasks.forEach;
  };

  const addTask = (e) => {
    e.preventDefault();

    const { name, color, days } = Object.fromEntries(new FormData(e.target));

    if (name.length < 2 || color.length < 2)
      return alert("Los datos no son correctos");

    let exists = false;

    tasks.forEach((e) => {
      if (e.name == name) exists = true;
    });

    if (exists) return alert("La tarea ya existe");

    const anteriorTasks = tasks;

    setTasks([
      ...anteriorTasks,
      { name: name, color: color, isFinalizated: false, days: days },
    ]);
  };

  const deleteTask = ({ index }) => {
    let anteriorTasks = [...tasks];
    anteriorTasks.splice(index, 1);

    console.log(anteriorTasks);

    setTasks(anteriorTasks);
  };

  // useEffect(() => {
  //   tasks.forEach((e) => {
  //     if (!e.isFinalizated) remaining++;
  //   });
  // }, [tasks]);

  return (
    <div id="container">
      <ul className="tasks">
        {tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="task"
              style={{ backgroundColor: task.color }}
            >
              <h2 className="task-name">{task.name}</h2>
              <div className="buttons">
                {task.isFinalizated ? (
                  <input
                    type="checkbox"
                    name="isFinalizated"
                    onClick={() => handleCheck({ index })}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="isFinalizated"
                    onClick={() => handleCheck({ index })}
                  />
                )}
                <i
                  onClick={() => deleteTask({ index })}
                  className="fa-solid fa-trash-can"
                ></i>
              </div>
            </li>
          );
        })}
      </ul>
      {/* <p>{remaining}</p> */}
      <form onSubmit={addTask}>
        <input type="text" name="name" />
        <input type="text" name="color" />
        <input type="text" name="days" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
