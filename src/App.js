import React, { useEffect, useState, useCallback } from "react";
import useHttp from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformData = useCallback((data) => {
    const downLoadedTasks = [];
    for (let key in data) {
      downLoadedTasks.push({ id: key, text: data[key].text });
    }
    setTasks(downLoadedTasks);
  }, []);

  const { sendRequest, isLoading, error } = useHttp(transformData);

  useEffect(() => {
    sendRequest({
      url: "https://react-http-bb182-default-rtdb.firebaseio.com/tasks.json",
    });
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
