import { contextBridge, ipcRenderer } from 'electron';
import {Task} from "../shared/task.ts";

contextBridge.exposeInMainWorld('MainAPI', {
    sayHello: (message: string) => {
        console.log(message);
    },
    raiseFileChooserDialog: (): string => {
        console.log(`raising dialog`);
        const response = ipcRenderer.sendSync('raise-dialog', 'hi');
        console.log(`dialog response: ${response}`);
        return response;
    },
    dbInsert: (task: Task): void => {
        ipcRenderer.send('add-task', task);
    }
});
