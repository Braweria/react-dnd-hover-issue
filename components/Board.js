import Task from "./Task";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../lib/itemTypes";
import { useTaskContext } from "../lib/TaskStore";
import { v4 } from "uuid";

/**
 * Component for the Board
 */

const Board = ({ taskIds, boardId, boardType, boardIndex, hasTasks }) => {
  // prettier-ignore
  const { taskList: { tasks }, dispatchTaskList } = useTaskContext();

  const [, dropRef] = useDrop({
    accept: ItemTypes.TASK,
    hover: (_, monitor) => {
      if (!hasTasks) {
        console.log(monitor.getItem().taskId);
        dispatchTaskList({
          type: "moveTask",
          args: [monitor.getItem().taskId, 0, boardIndex],
        });
        debugger;
        console.log(monitor);
      }
    },
  });

  return (
    <div>
      <div>
        <h5>
          {boardType.toUpperCase().charAt(0) + boardType.toLowerCase().slice(1)}
        </h5>
      </div>
      <div ref={dropRef}>
        {taskIds
          .map((taskId) => tasks.find((task) => task.id === taskId))
          .map((task, index) => (
            <Task
              key={task.id}
              id={task.id}
              boardId={boardId}
              boardIndex={boardIndex}
              task={task}
              taskIndex={index}
            />
          ))}
        {taskIds.length === 0 && <Task key={v4()} isSpacer />}
      </div>
    </div>
  );
};

export default Board;
