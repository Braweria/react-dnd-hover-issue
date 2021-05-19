import { createContext, useContext, useReducer } from "react";
import taskCollection from "./initialTasks";

export const TaskContext = createContext();
TaskContext.displayName = "Task Context";

function moveTask(currentBoards, taskId, indexInBoard, destBoardId) {
  const cloneOfBoards = [...currentBoards];
  const updatedBoards = cloneOfBoards.map((board) => {
    const filteredBoardTasks = board.taskIds.filter((id) => id !== taskId);

    let updatedTasks = [];
    if (board.id === destBoardId) {
      updatedTasks = [
        ...filteredBoardTasks.slice(0, indexInBoard),
        taskId,
        ...filteredBoardTasks.slice(indexInBoard),
      ];
      board.taskIds = updatedTasks;
    } else {
      board.taskIds = [...filteredBoardTasks];
    }

    return board;
  });
  return updatedBoards;
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case "moveTask":
      const updatedBoards = moveTask(state.taskBoards, ...action.args);
      return { ...state, taskBoards: updatedBoards };
    default:
      return state;
  }
};

export default function TaskStore(props) {
  // const [taskList, setTaskContext] = useState(tasks);
  const [taskList, dispatchTaskList] = useReducer(taskReducer, taskCollection);

  return (
    <TaskContext.Provider value={{ taskList, dispatchTaskList }}>
      {props.children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error(
      "useTaskContext must be used within a UserDocumentStore Component."
    );
  }
  return context;
}
