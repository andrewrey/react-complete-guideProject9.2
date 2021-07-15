import { useState } from "react";
import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { sendRequest, isLoading, error } = useHttp();

  const enterTaskHandler = (text) => {
    const requestConfig = {
      url: "https://react-http-bb182-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: text,
    };
    const dataTransformer = (data = {});
    sendRequest(requestConfig, dataTransformer);
  };
  // const generatedId = data.name; // firebase-specific => "name" contains generated id
  //const createdTask = { id: generatedId, text: taskText };

  //props.onAddTask(createdTask);

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
