import { SubTask } from "./subTasks";

export interface Task {
    id?: number;
    name: string;
    priority: string
    status: string;
    description?: string;
    createdAt: Date;
    dueDate: Date;
    subTasks?: SubTask[];

}