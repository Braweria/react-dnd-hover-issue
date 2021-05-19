import KanbanBoard from "../components/Kanban";
import TaskStore from "../lib/TaskStore";

export default function Home() {
  return (
    <div>
      <TaskStore>
        <KanbanBoard />
      </TaskStore>
    </div>
  );
}
