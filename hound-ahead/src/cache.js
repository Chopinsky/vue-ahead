exports.cache = options => {
  let _head, _tail, _nodeMap, _count;
  let _options = options || { capacity: 16 };

  const clear = () => {
    if (_count === 0) {
      return;
    }

    _head = { previous: null, next: null };
    _tail = { previous: null, next: null };
    _nodeMap = {};
    _count = 0;

    _head.next = _tail;
    _tail.previous = _head;
  }

  const hit = target => {
    if (typeof target !== 'string') {
      return null;
    }

    target = target.trim();
    if (!target) {
      return null;
    }

    target = target.toLowerCase();
    if (_nodeMap.hasOwnProperty(target)) {
      // if the token is already in the cache, move it to the head
      let node = touch(target) || { data: null };
      return node.data;
    }

    return null;
  };

  const insert = (target, data) => {
    if (typeof target !== 'string') {
      return;
    }

    target = target.trim();
    if (!target) {
      return;
    }

    target = target.toLowerCase();
    if (_nodeMap.hasOwnProperty(target)) {
      let node = touch(target);
      node.data = data;
      return;
    }

    // if the token is not in the cache, and push the target to the head
    let targetNode = {
      previous: null,
      next: null,
      token: target,
      data,
    };

    _nodeMap[target] = targetNode;
    _count++;

    let next = _head.next;
    _head.next = targetNode;
    targetNode.previous = _head;

    next.previous = targetNode;
    targetNode.next = next;

    // pop tails if exceeding the cache capacity
    while (_count > _options.capacity) {
      drop(_tail.previous);
      _count--;
    }
  }

  const drop = node => {
    if (node.next) {
      node.next['previous'] = node.previous;
    }

    if (node.previous) {
      node.previous['next'] = node.next;
    }

    node.next = null;
    node.previous = null;

    delete _nodeMap[node.token];

    return node;
  }

  const touch = target => {
    let node = _nodeMap[target];
    if (!node) {
      return null;
    }

    if (node.previous !== _head) {
      // drop self from the current link    
      if (node.next) {
        node.next['previous'] = node.previous;
      }

      if (node.previous) {
        node.previous['next'] = node.next;
      }
      
      // add to the front of the linked list
      let next = _head.next;
      _head.next = node;
      next.previous = node;

      node.previous = _head;
      node.next = next;
    }

    return node;
  }

  const _debug = () => {
    console.log(_nodeMap);

    console.log(_count);

    let node = _head.next;
    while (node.next !== null) {
      console.log(node.token);
      node = node.next;
    }

    return;
  }

  const replaceOptions = (options) => {
    _options = options;
  };

  const setOption = (name, value) => {
    _options[name] = value;
  }

  // rebuild the cache system
  clear();

  return {
    clear,
    hit,
    insert,
    setOption,
    replaceOptions,
    _debug,
  }
}