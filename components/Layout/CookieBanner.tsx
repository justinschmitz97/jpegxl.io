import { useEffect, useState } from "react";

function useStickyState(defaultValue: any, key: any) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const CookieBanner = () => {
  const [mode, setMode] = useStickyState(false, true);
  return (
    <div
      className={`border-2 border-bg-500 p-3 bg-bg-700 fixed bottom-2 right-2 text-tiny rounded-md z-50 ${
        mode && "hidden"
      }`}
    >
      We use cookies for our services.
      <div
        role="button"
        onKeyDown={() => setMode("true")}
        onClick={() => setMode("true")}
        tabIndex={0}
        className="inline-block ml-2 font-bold"
      >
        OK
      </div>
    </div>
  );
};

export default CookieBanner;
