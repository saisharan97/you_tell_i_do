const calculate = (firstValue, arg) => {
  //   console.log(arg)
  const [operator, secondValue] = arg
  //   console.log(firstValue, operator, secondValue)

  switch (operator) {
    case 'plus':
      return firstValue + secondValue
    case 'minus':
      return firstValue - secondValue
    case 'times':
      return firstValue * secondValue
    case 'dividedBy':
      return Math.floor(firstValue / secondValue)

    default:
      return null
  }
}

function zero(params = 0) {
  if (params === 0) {
    return params
  }
  return calculate(0, params)
}

function one(params = 1) {
  if (params === 1) {
    return params
  }
  return calculate(1, params)
}

function two(params = 2) {
  if (params === 2) {
    return params
  }
  return calculate(2, params)
}

function three(params = 3) {
  if (params === 3) {
    return params
  }
  return calculate(3, params)
}

function four(params = 4) {
  if (params === 4) {
    return params
  }
  return calculate(4, params)
}

function five(params = 5) {
  if (params === 5) {
    return params
  }
  return calculate(5, params)
}

function six(params = 6) {
  if (params === 6) {
    return params
  }
  return calculate(6, params)
}

function seven(params = 7) {
  if (params === 7) {
    return params
  }
  return calculate(7, params)
}

function eight(params = 8) {
  if (params === 8) {
    return params
  }
  return calculate(8, params)
}

function nine(params = 9) {
  if (params === 9) {
    return params
  }
  return calculate(9, params)
}

function plus(value) {
  return ['plus', value]
}

function minus(value) {
  return ['minus', value]
}

function times(value) {
  return ['times', value]
}

function dividedBy(value) {
  return ['dividedBy', value]
}

// eslint-disable-next-line no-eval
const calculator = input => eval(input)

export default calculator
