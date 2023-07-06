import {Task} from './shared/task'

export interface IMainAPI {
    raiseFileChooserDialog: () => string
    dbInsert: (task: Task) => string
    getAllTasks: () => Task[]
    sayHello: () => void
}

declare global {
    interface Window {
        MainAPI:IMainAPI
    }
}
