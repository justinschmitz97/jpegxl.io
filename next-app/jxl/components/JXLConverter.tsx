import type { FileInfo } from '../pages/index'
import { useState, useEffect } from 'react';
import { Options } from './OptionsBox'

let JXLModule: any = null;

export interface JXLConverterProps {
    options: Options | null
    files: FileInfo[]
    onFileConverted(name: string, buffer: any): void
}

interface ConvertWorker {
    worker: Worker 
    name: string
}

const JXLConverter = (props: JXLConverterProps) => {
    const [workers, setWorkers] = useState<ConvertWorker[]>([]);
    
    useEffect(() => {
        for (let i = 0; i < props.files.length; i++) {
            const fileName = props.files[i].name;
            const index = workers.findIndex( (e) => {
                if (e.name === fileName)
                    return true;
            });

            if (props.files[i].converted === null && index === -1) {
                let worker = new Worker('worker.js');

                worker.onmessage = (e) => {
                    setWorkers( (prev) => {
                        const index = prev.findIndex( (e) => {
                            return e.name === fileName;
                        });
                        let result = [...prev];
                        if (index !== -1) {
                            result.splice(index, 1);
                        }
                        return result;
                    })
                    props.onFileConverted(fileName, e.data.buffer);
                }

                worker.postMessage({buffer: props.files[i].buffer, options: props.options});

                setWorkers((prev) => {
                    return [...prev, {worker: worker, name: fileName}];
                });
            }
        }

    }, [props.files]);

    return null;
}

export default JXLConverter