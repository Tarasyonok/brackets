module.exports = function check(str, bracketsConfig) {
  stack = []
  // проверка на валидность СП
  if (str.length % 2 == 1) {
    return false;
  }
  let run = true;
  bracketsConfig.forEach(b => {
    let op = b[0];
    let cl = b[1];

    if (op != cl && (str[0] === cl || str[str.length - 1] === op)) {
      run = false;
    }
  });
  if (!run) {
    return false
  }

  // перебор символов
  for (let i = 0; i < str.length; i++) {
    let smb = str[i];
    bracketsConfig.forEach(b => {
      if (smb === b[0]) {
        if (b[0] == b[1]) {
          if (stack[stack.length - 1] == b[1]) {
            stack.pop();
          } else {
            stack.push(smb);
          }
        } else {
          stack.push(smb);
        }
      }
    });
    bracketsConfig.forEach(b1 => {
      if (b1[0] != b1[1] && smb === b1[1]) {
        if (stack.length == 0) {
          run = false;
        } else if (stack[stack.length - 1] == b1[0]) {
          stack.pop()
        } else {
          run = false;
        }
      }
    }); 
  }

  if (!run) {
    return false;
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
}