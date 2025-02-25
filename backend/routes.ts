import { Server } from "bun";
import {
    addMultipleTasks,
    addTask,
    deleteTask,
    getTask,
    getTaskList,
    updateTask
} from "./handlers";

type BackendRouteType = {
    url: string;
    fn: (request: Request, server: Server) => Promise<Response>
}

const backend_routes: BackendRouteType[] = [
    { url: 'get-tasks-list', fn: getTaskList },
    { url: 'get-task/:id', fn: getTask },
    { url: 'add-task', fn: addTask },
    { url: 'add-multiple-tasks', fn: addMultipleTasks },
    { url: 'update-task/:id', fn: updateTask },
    { url: 'delete-task/:id', fn: deleteTask }
];

export default backend_routes