import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../lib/itemTypes";
import { useTaskContext } from "../lib/TaskStore";

/**
 * Component for the Task
 */

export default function Task({
  id,
  boardId,
  boardIndex,
  task,
  taskIndex,
  isSpacer,
}) {
  const [, dragRef, previewRef] = useDrag({
    type: ItemTypes.TASK,
    item: {
      taskId: id,
      boardIndex,
      boardId,
      ...task,
      taskIndex,
    },
  });

  // prettier-ignore
  const { dispatchTaskList } = useTaskContext();

  const [, dropRef] = useDrop({
    accept: ItemTypes.TASK,
    hover: (_, monitor) => {
      dispatchTaskList({
        type: "moveTask",
        args: [monitor.getItem().taskId, taskIndex, boardId],
      });
    },
  });

  const ref = useRef(null);
  dragRef(dropRef(ref));
  const spacer = isSpacer
    ? { height: "100%", padding: 50, backgroundColor: "grey" }
    : null;
  return (
    <div
      ref={previewRef}
      style={{ padding: 5, margin: 5, border: "1px solid grey", ...spacer }}
    >
      <div
        ref={ref}
        style={{ ...spacer }}
        // key={task?.id}
      >
        {task?.content}
      </div>
    </div>
  );
}
