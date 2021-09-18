import styles from '../styles/DropArea.module.css'
import OptionsBox, {Options} from './OptionsBox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Button from '@mui/material/Button';
import { useState} from 'react'

export interface DropAreaProps {
    onDrop(files: File[]): void
    onOptionsChanged(options: Options): void
}

const DropArea = (props: DropAreaProps) => {
    const [optionsButton, setOptionsButton] = useState<HTMLButtonElement | null>(null)

    const openOptions = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        
        setOptionsButton(e.target);
    }

    const openFileDialog = (e: any) => {
        e.preventDefault();
        const input = document.getElementById("file-choose");
        if (input)
            input.click();
    }

    const filesChoosed = (e: any) => {
        props.onDrop([...e.target.files]);
        e.target.value = "";
    }

    const preventDefault = (e: any) => {
        e.preventDefault();
    }

    const filesDroped = (e: any) => {
        e.preventDefault();
        props.onDrop([...e.dataTransfer.files]);
    }

    return (
        <div className={styles.dropBackground} >
            <a onClick={openFileDialog} onDrop={filesDroped} onDragOver={preventDefault} onDragEnter={preventDefault} role="button" className={styles.dropArea} href=""> 
                <div className={styles.arrowButton} >
                    <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowUp}></FontAwesomeIcon>
                </div>
                <p className={styles.dropInfoLabel} >Drop images or browse</p>
                <p className={styles.formatsLabel} >supports png • jpg • webp • and more</p>
                <Button variant="contained" onClick={openOptions} className={styles.optionsButton}>
                    Options
                </Button>
            </a>
            <input id="file-choose" onChange={filesChoosed} type="file" className={styles.fileInput} multiple autoComplete="off"/>
            <OptionsBox anchorElement={optionsButton} onOptionsChanged={(options: Options) => { props.onOptionsChanged(options) }} onClose={() => setOptionsButton(null)} />
        </div>
    );
}

export default DropArea