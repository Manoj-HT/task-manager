import { file, write } from "bun";
const FILE_PATH = 'tasks.json'

/** Read file */
export const getTasks = async () => {
    return await file(FILE_PATH).json();
}
/** Write in to file */
export const writeTasks = async (tasks: Task[]) => {
    await write(FILE_PATH, JSON.stringify(tasks, null, 2))
}