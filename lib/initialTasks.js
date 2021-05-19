import { v4 as uuidv4 } from "uuid";

/**
 * Task Schema and first load
 * @const {Array}
 */

const task = [
  "doggy playtime",
  "kitty appointment",
  "birb seed feeder",
  "otter sports",
  "house chores",
  "gaming",
  "car repairs",
  "eat lunch",
  "run around like crazy",
  "love girlfriend",
  "love girlfriend even more",
  "worship girlfriend",
  "cut the trees",
  "drink that gasoline",
  "make a sculpture out of energy cans",
  "build a house out of javascript",
  "eat your phone",
  "browse the dark werb",
  "let the spider catch you",
  "write an origin story",
];
const randomTask = (arr1) => {
  return arr1[Math.round(Math.random() * arr1.length) - 1];
};

export const tasks = Array.from({ length: 12 }, () => ({
  id: uuidv4(),
  content: randomTask(task),
  progress: Math.round(Math.random() * 100),
  dateStart: null,
  dateEnd: null,
  target: 10,
  current: 0,
  remainer: 10,
}));

export const taskBoards = ["todo", "doing", "done", "archive"].map(
  (title, i) => ({
    id: uuidv4(),
    title,
    taskIds: tasks.slice(i * 3, i * 3 + 3).map((task) => task.id),
  })
);

const taskCollection = {
  tasks,
  taskBoards,
};

export default taskCollection;
