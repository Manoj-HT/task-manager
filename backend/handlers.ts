import { Server } from "bun"
import { getTasks, writeTasks } from "./file"
import { addCorsHeaders, corsHeaders, handleCors } from "./cors";

/** Get all tasks */
export const getTaskList = async (req: Request, server: Server): Promise<Response> => {
    const tasks: Task[] = await getTasks();
    return Response.json(tasks);
}

/** Get single task */
export const getTask = async (req: Request, server: Server): Promise<Response> => {
    const url = new URL(req.url);
    const id = Number(url.pathname.split('/').pop());
    const tasks: Task[] = await getTasks();
    const task = tasks.find(t => t.id === id);
    return task ? Response.json(task) : new Response("Task not found", { status: 404 });
};

/** Add single task */
export const addTask = async (req: Request, server: Server): Promise<Response> => {
    if (req.method === "OPTIONS") return handleCors(req);
    const tasks: Task[] = await getTasks();
    const newTask: Task = await req.json();
    tasks.push(newTask);
    await writeTasks(tasks);
    return Response.json(newTask, { status: 201, headers: corsHeaders });
};

/** Add multiple tasks */
export const addMultipleTasks = async (req: Request, server: Server): Promise<Response> => {
    const tasks: Task[] = await getTasks();
    const newTasks: Task[] = await req.json();
    newTasks.forEach(task => tasks.push(task));
    await writeTasks(tasks);
    return Response.json(newTasks, { status: 201 });
};

/** Update a single task */
export const updateTask = async (req: Request, server: Server): Promise<Response> => {
    if (req.method === "OPTIONS") return handleCors(req);
    const url = new URL(req.url);
    const id = Number(url.pathname.split('/').pop());
    let tasks: Task[] = await getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return Response.json("Task not found", { status: 201, headers: corsHeaders });

    const updatedTask: Partial<Task> = await req.json();
    tasks[index] = { ...tasks[index], ...updatedTask };
    await writeTasks(tasks);
    return Response.json(tasks[index], { status: 201, headers: corsHeaders });
};

/** Delete a task */
export const deleteTask = async (req: Request, server: Server): Promise<Response> => {
    const url = new URL(req.url);
    const id = Number(url.pathname.split('/').pop());
    let tasks: Task[] = await getTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    if (tasks.length === filteredTasks.length) return new Response("Task not found", { status: 404 });

    await writeTasks(filteredTasks);
    return Response.json({ message: "Task deleted"}, { status: 200 });
};