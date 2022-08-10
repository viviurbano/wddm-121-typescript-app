import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const box = document.getElementById('box');
const listItem = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const btn = document.querySelector<HTMLInputElement>('button');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();

// CSS is here because I had difficulties to set in another file
if (box != null) {
  box.style.setProperty('background-color', '#00888C');
  box.style.setProperty('color', 'white');
  box.style.fontSize = '1em';
  box.style.textAlign = 'center';
  box.style.display = 'grid';
  box.style.margin = '50px 200px';
}

if (listItem != null) {
  listItem.style.setProperty('background-color', '#f3f3f3');
  listItem.style.setProperty('color', 'white');
  listItem.style.listStyle = 'none';
  listItem.style.fontSize = '1.5em';
  listItem.style.overflow = 'scroll';
  listItem.style.display = 'grid';
  listItem.style.margin = '25px 200px';
  listItem.style.padding = '2px 50px';
  listItem.style.fontFamily = 'sans-serif';
  listItem.style.color = '#6b6b6b';
  listItem.style.gap = '10px';
  listItem.style.borderStyle = '2px dashed solid';
}

if (form != null) {
  form.style.setProperty('color', 'white');
  form.style.fontSize = '2em';
  form.style.overflow = 'scroll';
  form.style.display = 'flex';
  form.style.margin = '25px 200px';
  form.style.padding = '2px 50px';
  form.style.fontFamily = 'sans-serif';
  form.style.color = '#6b6b6b';
  form.style.gap = '10px';
  form.style.borderStyle = '2px dashed solid';
}

if (btn != null) {
  btn.style.setProperty('background-color', '#5d87f5');
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';
  btn.style.alignItems = 'center';
  btn.style.boxShadow =
    'rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;';
  btn.style.fontSize = '0.6em';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.padding = '5px';
}

tasks.forEach(addListItem);

form?.addEventListener('submit', e => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const myNewTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(myNewTask);
  saveTasks();

  addListItem(myNewTask);
  input.value = ' ';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  listItem?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
