import {useCallback, useState} from "react";

function FileChooser() {
    const [file, setFile] = useState<string|null>(null);

    const sendMessage = useCallback(() => {
        const fileListing = window.MainAPI.raiseFileChooserDialog();
        setFile(fileListing);
    }, [])
    return (
        <>
            <h2>Electron File Chooser demo</h2>
            <button onClick={sendMessage}>Choose File</button>
            <h3>File selected</h3>
            {file || 'No file selected'}
        </>
    )
}

export default FileChooser
