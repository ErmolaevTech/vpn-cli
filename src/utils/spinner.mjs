function infinityPromise() {
  let resolve;
  const p = new Promise((r) => {
    resolve = r;
  });

  return [p, resolve];
}
export function startSpinner(text, ms = 500) {
  let resolve;

  const timer = setTimeout(() => {
    const struct = infinityPromise();
    resolve = struct[1];
    spinner(text, () => struct[0]);
  }, ms);

  return () => {
    resolve?.(true);
    clearTimeout(timer);
  };
}
