import { useState, useEffect } from "react";
import TasksList from "../components/common/TasksList/TasksList";
import { Button } from "react-bootstrap";
import ButtonForm from "../components/common/Button/ButtonForm";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loadData, saveData } from "../utils/localStorage";
import { taskBoards } from "../data/boards";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

const initialTask = {
  id: 0,
  title: "",
  description: "",
  urgency: "",
  status: 0,
};

const initialBoard = {
  id: 0,
  title: "",
  priority: null,
};

const TaskManager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [boardFormCollapsed, setBoardFormCollapsed] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(initialTask);
  const [board, setBoard] = useState(initialBoard);
  const [boards, setBoards] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const groupByTasks = tasks.reduce((group, Task) => {
    const { status } = Task;
    group[status] = group[status] ?? [];
    group[status].push(Task);
    // console.log(group);
    return group;
  }, {});

  const checkUserExist = () => {
    const usersData = loadData("userData");
    const activeUser = loadData("activeUser");
    if (usersData === null) {
      toast.error("Unable to find user");
      navigate("/signup");
      return false;
    } else if (activeUser === null) {
      toast.error("Access denied");
      navigate("/login");
      return false;
    }
    return true;
  };

  const formToggler = () => {
    setCollapsed(!collapsed);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleBoardChange = (event) => {
    const { name, value } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
  };

  const addBoard = () => {
    const valid = checkUserExist();
    if (valid) {
      if (board.priority) {
        boards.insert(board.priority - 1, board.title);
      } else {
        boards.insert(boards.length, board.title);
      }
      setBoards([...boards]);
      saveBoardsToLocalStorage([...boards]);
      setBoard(initialBoard);
      setBoardFormCollapsed(false);
    }
  };

  const addTask = () => {
    const valid = checkUserExist();
    if (valid) {
      if (task.id === 0) {
        setTasks([...tasks, { ...task, id: uuid() }]);
        saveTasksToLocalStorage([...tasks, { ...task, id: uuid() }]);
        setTask(initialTask);
      } else {
        const filteredTasks = tasks.filter((taskItem) => {
          return taskItem.id !== task.id;
        });
        setTasks([...filteredTasks, task]);
        saveTasksToLocalStorage([...filteredTasks, task]);
        setTask(initialTask);
      }
      setCollapsed(false);
      reset();
    }

  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  };

  const moveTask = (id, newStatus) => {
    const task = tasks.find((task) => {
      return task.id === id;
    });

    const filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    task.status = newStatus;
    let newTasks = [...filteredTasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const editTask = (id) => {
    const task = tasks.find((task) => {
      return task.id === id;
    });
    setFormAction("Edit");
    if (task) {
      setCollapsed(true);
      setTask(task);
    }
  };

  const saveTasksToLocalStorage = (tasks) => {
    const userId = loadData("activeUser");
    let oldUsersTasks = loadData("usersTasks");
    if (oldUsersTasks) {
      saveData("usersTasks", { ...oldUsersTasks, [userId]: tasks });
    } else {
      saveData("usersTasks", { [userId]: tasks });
    }
  };

  const loadTasksFromLocalStorage = () => {
    const usersTasks = loadData("usersTasks");

    if (usersTasks) {
      const userId = loadData("activeUser");
      setTasks(usersTasks[userId]);
    }
  };

  const saveBoardsToLocalStorage = (boards) => {
    const userId = loadData("activeUser");
    let oldUsersBoards = loadData("usersBoards");
    if (oldUsersBoards) {
      saveData("usersBoards", { ...oldUsersBoards, [userId]: boards });
    } else {
      saveData("usersBoards", { [userId]: boards });
    }
  };

  const loadBoardsFromLocalStorage = () => {
    const usersBoards = loadData("usersBoards");
    const userId = loadData("activeUser");

    if (usersBoards != null && usersBoards[userId] != null) {
      setBoards(usersBoards[userId]);
    } else {
      setBoards(taskBoards);
    }
  };

  useEffect(() => {
    checkUserExist();
    loadTasksFromLocalStorage();
    loadBoardsFromLocalStorage();
  }, []);

  return (
    <main className="container my-5 ">
      <section className=" py-3">
        <div className="row">
          <div className="col-4 col-md-2 ">
            <Button onClick={formToggler}>
              {task.id === 0 ? "Add" : "Update"} Task
            </Button>
          </div>
          <div className="col-12 col-md-10">
            <h2 className="display-4 text-center ">Trello Task Manager</h2>
          </div>
        </div>
        {/* form */}
        {collapsed && (
          <form
            className="d-flex flex-column "
            onSubmit={handleSubmit(addTask)}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              {...register("title")}
              onChange={handleChange}
              value={task.title}
              className="my-2"
            />
            <p className="text-danger">{errors.title?.message}</p>

            <textarea
              name="description"
              placeholder="Description"
              {...register("description")}
              value={task.description}
              onChange={handleChange}
              rows={2}
            />
            <p className="text-danger">{errors.description?.message}</p>
            <div className="my-2">
              <label>Urgent status:</label>
              <label className="mx-2">
                <input
                  type="radio"
                  name="urgency"
                  value="low"
                  onChange={handleChange}
                  checked={task.urgency === "low"}
                />
                Low
              </label>
              <label className="mx-2">
                <input
                  type="radio"
                  name="urgency"
                  value="medium"
                  onChange={handleChange}
                  checked={task.urgency === "medium"}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="high"
                  onChange={handleChange}
                  checked={task.urgency === "high"}
                />
                High
              </label>
            </div>
            <ButtonForm value={task.id === 0 ? "Add" : "Update"} width={25} />
          </form>
        )}
      </section>
      <section className="mt-5 parent">
        <div className=" d-flex align-items-start horizontal-scrollable">
          {boards.map((board, index) => {
            return (
              <TasksList
                tasks={groupByTasks[index]}
                board={board}
                editTask={editTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                key={index}
                index={index}
                boardLength={boards.length}
              />
            );
          })}
          <div className="col-2">
            {!boardFormCollapsed && (
              <Button
                className="col-12"
                onClick={() => setBoardFormCollapsed(true)}
              >
                + Add another Board
              </Button>
            )}
            {boardFormCollapsed && (
              <form
                className="text-center d-flex flex-column"
                onSubmit={addBoard}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Board Title"
                  defaultValue={board.title}
                  onChange={handleBoardChange}
                />

                <input
                  type="number"
                  name="priority"
                  placeholder="Enter Board Priority"
                  defaultValue={board.priority}
                  onChange={handleBoardChange}
                />

                <div className="mt-2">
                  <Button onClick={addBoard} className="me-2">
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setBoardFormCollapsed(false);
                    }}
                  >
                    X
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TaskManager;
