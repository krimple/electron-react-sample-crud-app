import { ipcMain, IpcMainEvent } from 'electron';
import { addTask, getAll } from '../task-list.ts';

export function setupTaskHandlers() {
  ipcMain.on('add-task', (e: IpcMainEvent, arg: any) => {
    (async () => {
      try {
        console.log(`add-task. Got ${JSON.stringify(arg, null, 2)} as arg`);
        const uuid = await addTask(arg);
        console.log(`Got uuid back from addTask ${uuid}`);
        e.returnValue = uuid;
      } catch (error) {
        // TODO - how to best handle errors from IPC handlers.
        //        Not a fan of having a polymorphic returnValue here for errors.
        e.returnValue = error;
        console.error(error);
      }
    })();
  });


  ipcMain.on('get-all-tasks', (e) => {
    (async () => {
      try {
        const tasks = await getAll();
        e.returnValue = tasks;
      } catch (error) {
        // See above method
        e.returnValue = error;
        console.error(error);
      }
    })();
  });
}
