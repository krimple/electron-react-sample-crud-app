import {Task} from './shared/task'

export interface IMainAPI {
    raiseFileChooserDialog: () => string
    dbInsert: (task: Task) => void
    sayHello: () => void
}

declare global {
    interface Window {
        MainAPI:IMainAPI
    }
}
