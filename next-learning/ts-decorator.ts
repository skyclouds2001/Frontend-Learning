export const freeze = (): ClassDecorator => {
  return (target) => {
    Object.freeze(target)
    Object.freeze(target.prototype)
  }
}

export const preventExtensions = (): ClassDecorator => {
  return (target) => {
    Object.preventExtensions(target)
    Object.preventExtensions(target.prototype)
  }
}

export const seal = (): ClassDecorator => {
  return (target) => {
    Object.seal(target)
    Object.seal(target.prototype)
  }
}

export const enumerable = (value: boolean): PropertyDecorator => {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(target, propertyKey),
      enumerable: value,
    })
  }
}

export const configurable = (value: boolean): PropertyDecorator => {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(target, propertyKey),
      configurable: value,
    })
  }
}

export const writable = (value: boolean): PropertyDecorator => {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(target, propertyKey),
      writable: value,
    })
  }
}

export const override = (): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    if (Object.hasOwn(target, propertyKey) && !(propertyKey in target)) {
      console.warn(`Method "${String(propertyKey)}" Not A Override Function`)
    }
  }
}
