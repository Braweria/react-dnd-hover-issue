import Board from "./Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskContext } from "../lib/TaskStore";

/**
 * Component for the KanbanBoard
 */

export default function KanbanBoard() {
  // prettier-ignore
  const { taskList: { taskBoards }, } = useTaskContext();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <DndProvider debugMode={true} backend={HTML5Backend}>
        {taskBoards.map((board, index) => {
          return (
            <Board
              taskIds={board.taskIds}
              boardType={board.title}
              boardId={board.id}
              boardIndex={index}
              key={board.id}
              hasTasks={board.taskIds.length > 0}
            />
          );
        })}
      </DndProvider>
    </div>
  );
}
