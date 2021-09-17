import Popover from '@mui/material/Popover';
import styles from '../styles/OptionsBox.module.css'

export interface OptionsBoxProps {
  anchorElement: HTMLButtonElement | null
  onClose(): void
}

const OptionsBox = (props: OptionsBoxProps) => {

  const open = Boolean(props.anchorElement);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={props.anchorElement}
        onClose={() => props.onClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={styles.optionsContainer}>
          <h4 className={styles.topLabel} >Conversion settings</h4>
          <div className={styles.inputRow}>
            <input checked={true}
              style={{ background: "rbg(0, 212, 255)"}} type="checkbox" id="flexCheckDefault" />
            <label style={{ fontSize: "1.2rem" }} className="form-check-label" htmlFor="flexCheckDefault">
              Progressive
            </label>
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default OptionsBox;