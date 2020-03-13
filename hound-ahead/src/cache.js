exports.cache = () => {
  let _head = null;
  let _tail = null;

  const hit = target => {

  };

  const clear = () => {
    _head = null;
    _tail = null;
  }

  return {
    hit,
    clear,
  }
}