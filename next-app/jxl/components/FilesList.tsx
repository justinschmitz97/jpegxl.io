import type {FileInfo} from '../pages/index'
import styles from '../styles/FilesList.module.css'
import FilesListItem from './FilesListItem'
import ScrollBar from 'react-perfect-scrollbar'

export interface FilesListProps {
    files: FileInfo[]
}

const FilesList = (props: FilesListProps) => {
    return(
        <div>
            <div className={styles.listContainer}>
                { props.files.map((file, index) => { return <FilesListItem key={index} file={file} />}) }
            </div>
        </div>
    )
}

export default FilesList