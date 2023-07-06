export interface Task {
    id?: string;
    description: string;
    priority: number;
    due: Date;
    complete?: Date;
}
