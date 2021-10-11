{
  /* Turn off for now.
const log = console.log.bind(console);
const warn = console.warn.bind(console);
const error = console.error.bind(console);
// eslint-disable-next-line no-undef
const db = firebase.database();

console.log = (...args) => {
  log(...args);
  const data = db.ref("/").push();
  data.set({
    userAgent: navigator.userAgent,
    log: args,
  });
};

console.warn = (...args) => {
  warn(...args);
  const data = db.ref("/").push();
  data.set({
    userAgent: navigator.userAgent,
    warn: args,
  });
};

console.error = (...args) => {
  error(...args);
  const data = db.ref("/").push();
  data.set({
    userAgent: navigator.userAgent,
    error: args,
  });
};
*/
}
