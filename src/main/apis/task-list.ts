import {Task} from '../../shared/task';
const uuidv4 = require('uuid').v4;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// TODO - externalize setup of DB to root-level and do schema gen 1x
const dbPath = path.join(__dirname,'../../mylite.db');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('better-sqlite3')(dbPath, {});

export function initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
        console.log(`Startup!`);
        try {
            db.exec(`
              CREATE TABLE IF NOT EXISTS Tasks
              (
                  id          char(38) primary key,
                  description varchar(4096) not null,
                  priority    int           not null,
                  due         date          not null,
                  completed   date          null
              )
            `);
            console.log(`Logging in!`);
            console.dir(db);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

export function getAll(): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {
        try {
            const stmt = db.prepare(`
                SELECT id,
                       description,
                       priority,
                       due,
                       completed
                FROM Tasks
            `);
            const result = stmt.get();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

export function getOne(id: string): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
        try {
            const stmt = db.prepare(`
                SELECT id,
                       description,
                       priority,
                       due,
                       completed
                FROM Tasks
                WHERE id = ?
            `);
            const results = stmt.get(id);
            resolve(results);
        } catch (e) {
            reject(e);
        }
    });
}

export function addTask(task: Task): Promise<string> {
    return new Promise((resolve, reject)=> {
        try {
            const id = uuidv4();
            const stmt = db.prepare(`
                        INSERT INTO Tasks(id, description, priority, due)
                        VALUES (?, ?, ?, ?)`);

            stmt.run(id, task.description, task.priority, task.due.toISOString());
            resolve(id);
        } catch (e) {
            reject(e);
        }
    });
}

export function updateTask(task: Task) : Promise<null> {
    return new Promise((resolve, reject)=> {
        try {
            const stmt = db.prepare(`
                        UPDATE Tasks
                        SET description = ?,
                            priority = ?,
                            due = ?,
                            complete = ?
                        WHERE id = ?
        `);
            stmt.run(task.description, task.priority, task.due, task.complete, task.id);
            resolve(null)
        } catch (e) {
            reject(e);
        }
   });
}

export function removeTask (id: number): Promise<null> {
    return new Promise((resolve, reject)=> {
        try {
            const stmt = db.prepare(`
                        DELETE FROM Tasks
                        WHERE id = ?
                        `);

            stmt.run(id);
            resolve(null)
        } catch (e) {
            reject(e);
        }
    });
}
