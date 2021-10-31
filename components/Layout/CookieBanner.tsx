import React from "react";

function useStickyState(defaultValue: any, key: any) {
  const [value, setValue] = React.useState(defaultValue);
  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const CookieBanner = () => {
  const [mode, setMode] = useStickyState(false, true);
  return (
    <div
      className={`p-3 bg-bg-500 fixed bottom-2 right-2 text-tiny rounded-md z-50 ${
        mode && "hidden"
      }`}
    >
      We use cookies from Google to deliver services.
      <div
        role="button"
        onKeyDown={() => setMode("true")}
        onClick={() => setMode("true")}
        tabIndex={0}
        className="font-bold"
      >
        OK
      </div>
    </div>
  );
};

export default CookieBanner;
