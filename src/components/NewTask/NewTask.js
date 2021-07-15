import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = ({ onAddTask }) => {
  const { sendRequest, isLoading, error } = useHttp();

  const enterTaskHandler = (text) => {
    const requestConfig = {
      url: "https://react-http-bb182-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text },
    };
    const dataTransformer = (data) => {
      const generatedId = data.name;
      const createdTask = {
        id: generatedId,
        text,
      };
      onAddTask(createdTask);
    };
    sendRequest(requestConfig, dataTransformer);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
