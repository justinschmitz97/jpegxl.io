import Tooltip from "@components/Home/Tooltip";

export interface PercentageSliderProps {
  className?: string;
  value: number;
  name: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  explanation: string;
  onChange(value: number): void;
}

export default function PercentageSlider(props: PercentageSliderProps) {
  return (
    <div className="mb-3" id={props.id}>
      <div className="flex align-center">
        <p className="font-bold">{props.name}</p>
        <Tooltip text="?">{props.explanation}</Tooltip>
      </div>
      <div className="flex content-center items-center">
        <label className="text-none">
          {props.label}
          <input
            type={"range"}
            value={props.value}
            onChange={(e) => props.onChange(Number(e.target.value))}
            min={0}
            max={90}
            disabled={props.disabled}
            step={5}
          />
        </label>
        <b style={{ marginLeft: 10 }}>{props.value + 10}%</b>
      </div>
    </div>
  );
}
