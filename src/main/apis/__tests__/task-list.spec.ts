import {Task} from '../../../shared/task';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import {addTask, initialize} from '../task-list';

describe('task list API', () => {
    beforeAll(async () => {
        initialize();
    });

    it('should add a task', async () => {
        const task = {
            due: new Date(),
            name: 'da task',
            description: 'because it is there',
            priority: 5
        } as Task;
        expect(() => {
            addTask(task);
        }).not.toThrowError();
    })
});

