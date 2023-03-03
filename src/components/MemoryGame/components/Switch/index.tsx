import s from "./Switch.module.scss";

interface SwitchProps {
  isChecked: boolean;
  setIsChecked: (arg: boolean) => void;
  leftText?: string;
  rightText?: string;
}

const Switch = ({
  leftText,
  rightText,
  isChecked,
  setIsChecked,
  ...props
}: SwitchProps) => {
  return (
    <div className={s.switch}>
      {!!leftText && (
        <button
          type="button"
          onClick={() => {
            setIsChecked(false);
          }}
        >
          {leftText}
        </button>
      )}
      <div className={s.toggle}>
        <input
          type="checkbox"
          id="switch"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
          {...props}
        />
        <label htmlFor="switch"></label>
      </div>
      {!!rightText && (
        <button
          type="button"
          onClick={() => {
            setIsChecked(true);
          }}
        >
          {rightText}
        </button>
      )}
    </div>
  );
};

export default Switch;
