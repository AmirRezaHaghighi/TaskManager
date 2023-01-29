import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTrashAlt,
  FaRegEdit,
} from "react-icons/fa";
import Card from "react-bootstrap/Card";

const Task = (props) => {
  const { editTask, deleteTask, moveTask, task, index, boardLength } = props;

  const handleMoveLeft = () => {
    moveTask(task.id, index - 1);
  };
  const handleMoveRight = () => {
    moveTask(task.id, index + 1);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    editTask(task.id);
  };

  let bgColor = "";
  if (task.urgency) {
    if (task.urgency === "low") {
      bgColor = "primary";
    } else if (task.urgency === "medium") {
      bgColor = "warning";
    } else if (task.urgency === "high") {
      bgColor = "danger";
    }
  }

  return (
    <Card className="text-center mb-3 mx-3 shadow ">
      <Card.Body className="text-center">
        <Card.Title>
          <p>{task.title}</p>
          <p className={`badge rounded-pill bg-${bgColor}`}>{task.urgency}</p>
        </Card.Title>
        <Card.Text>
          {task.description ? task.description : "--------"}
        </Card.Text>
        <Card.Footer className="d-flex justify-content-between bg-transparent border-0">
          <div>
            <Button className="me-2">
              <FaTrashAlt onClick={handleDelete} />
            </Button>
            <Button>
              <FaRegEdit onClick={handleEdit} />
            </Button>
          </div>
          <div>
            <Button
              variant="primary"
              onClick={handleMoveLeft}
              className="me-2"
              disabled={index === 0}
            >
              <FaAngleDoubleLeft />
            </Button>
            <Button
              variant="primary"
              onClick={handleMoveRight}
              disabled={(index == boardLength - 1)}
            >
              <FaAngleDoubleRight />
            </Button>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

Task.propTypes = {
  tasks: PropTypes.array,
  status: PropTypes.string,
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
  moveTask: PropTypes.func,
};

Task.defaultProps = {
  tasks: [],
  status: "",
  editTask: () => console.error(" "),
  deleteTask: () => {},
  moveTask: () => {},
};

export default Task;
