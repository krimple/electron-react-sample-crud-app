/**
 * TODO - find a better mechanism for using sqlite3 from electron.
 * Currently the sqlite3 NPM module doesn't run under Electron,
 * so we're using "better-sqlite3". But is it? Maybe. It does
 * build and run, but you sometimes have to run npm rebuild from
 * this project to fix the node library version.
 *
 * This API screams for a database mapping tool. VERY unDRY.
 */
import {Task} from '../../shared/task';
// I use UUID generation for primary keys to make the example
// simple. Famous last words...

// NOTE - apparently this is broken with import statements, and
// only works if you alias the v4 function to another name. Took
// a LOT of searching to find the fix, but the symptom is that it
// will complain about not having access to a crypto API
const uuidv4 = require('uuid').v4;

// Node APIs should use require, not import, as well
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// TODO - externalize setup of DB to root-level
const dbPath = path.join(__dirname,'../../thelight.db');

// NOTE - another oddball dependency import example. You need to
// import the better-sqlite3 root, but do it via require, so it
// loads properly. Using import fails.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('better-sqlite3')(dbPath, {});

// TODO - externalize management of schema. This is plain dumb
// and needs a better approach. Migrations anyone?
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
            // n.b. - all brings all rows back - don't use get (see below)
            const result = stmt.all();
            if (result) {
              // TODO - better type conversion. Ick.
              resolve(result.map((r: any) => ({
                ...r,
                  due: r.due ? new Date(r.due) : null,
                  complete: r.complete ? new Date(r.complete) : null
              } as Task)));
            } else {
              // TODO - better than this. For now, to
              // avoid an error, just return nothing.
              // This may never happen as hopefully no rows
              // is an array with zero entries and hence
              // is truthy (yes, I tested that in the console)
              resolve([]);
            }
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
            // n.b. - get brings back the 1st row
            const results = stmt.get(id);
            if (!results) {
              // TODO - test this and check for ipc calls
              throw new Error('no row found');
            }
            resolve({
              ...results,
              due: results.due ? new Date(results.due) : null,
              complete: results.complete ? new Date(results.complete) : null
            } as Task);
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

// TODO - test date parsing
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
