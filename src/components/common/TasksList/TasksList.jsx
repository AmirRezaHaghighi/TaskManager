import React from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";

const TasksList = (props) => {
  const { tasks, board, editTask, deleteTask, moveTask, index, boardLength } =
    props;
  let taskList, tasksForStatus;
  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === index && task.id !== undefined;
    });
  }
  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          editTask={(id) => editTask(id)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, board) => moveTask(id, board)}
          key={task.id}
          task={task}
          index={index}
          boardLength={boardLength}
        />
      );
    });
  }

  return (
    <div className="col-3 py-2 me-3 board shadow">
      <h3 className="text-center text-uppercase">{board}</h3>
      {taskList}
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array,
  board: PropTypes.string,
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
  moveTask: PropTypes.func,
};

TasksList.defaultProps = {
  tasks: [],
  board: [],
  editTask: () => {},
  deleteTask: () => {},
  moveTask: () => {},
};

export default TasksList;
