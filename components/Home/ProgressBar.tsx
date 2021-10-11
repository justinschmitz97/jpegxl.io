export interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const progressPercent = Math.round(props.progress * 100);

  const innerStyle = {
    width: `${progressPercent}%`,
  };

  return (
    <div
      className={
        "w-full absolute bottom-0 z-50 h-1 m-0 rounded-lg origin-right transition-all ease-out duration-500 bg-green-1000"
      }
    >
      <div
        className={
          "rounded-lg z-50 flex items-center justify-end h-full mb-2 bg-gradient transition-all ease-out duration-300"
        }
        style={innerStyle}
      >
        <div
          className="relative w-2 h-2 bg-blue-400"
          style={{
            marginRight: "-4px",
            boxShadow: "0 0 3px 2px rgba(255,255,255,0.05)",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}
