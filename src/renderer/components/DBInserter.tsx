import {useCallback, useState} from "react";
import {Task} from '../../shared/task';

function DBInserter() {
    const [uuid, setUUID] = useState<string|null>(null);

    const insertData = useCallback(async () => {
        const uuid = await window.MainAPI.dbInsert({
            description: 'Foo',
            priority: 3,
            due: new Date()
        } as Task);
        console.dir(uuid);
        // setUUID(uuid);
    }, [])
    return (
        <>
            <h2>Electron SQLite insert demo</h2>
            <button onClick={insertData}>Insert</button>
            <h3>UUID</h3>
            {uuid || 'No uuid yet'}
        </>
    )
}

export default DBInserter
