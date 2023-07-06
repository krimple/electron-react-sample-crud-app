import {useCallback, useState} from "react";

function DBInserter() {
    const [uuid, setUUID] = useState<string|null>(null);

    const insertData = useCallback(async () => {
        const uuid = await window.MainAPI.dbInsert();
        setUUID(uuid);
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
