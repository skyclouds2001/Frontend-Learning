function createContext(defaultValue) {
  const context = {
    $$type: 'CONTEXT',
    Provider: null,
    _currentValue: defaultValue,
  }

  context.Provider = {
    $$type: 'PROVIDER',
    _context: context,
  }

  return context
}

const contextValueStack = []

function pushProvider(context, newValue) {
  contextValueStack.push(context._currentValue)
  context._currentValue = newValue
}

function popProvider(context) {
  context._currentValue = contextValueStack.pop()
}
