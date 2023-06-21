/* eslint-disable */

interface VueOptions {
  el?: string | Element
  template?: string // todo - support #
  data?: Record<string, any> | (() => Record<string, any>)
  computed?: Record<string, () => any> // todo - support more type
  watch?: Record<string, (newValue: any, oldValue: any) => void> // todo - support more type
  methods?: Record<string, (...args: any[]) => any>
  beforeCreate?: () => void
  created?: () => void
  beforeMount?: () => void
  mounted?: () => void
  beforeUpdate?: () => void
  updated?: () => void
  render?: () => string // todo - update render options function
}

class Vue {
  public static readonly version = '0.0.0'

  private static readonly EventBus = class {
    private _events = {}
    public on(eventName: string, callback: (...args: any) => any) {
      this._events[eventName] ? this._events[eventName].push(callback) : this._events = [callback]
    }
    public emit(eventName: string, ...payload: any[]) {
      this._events[eventName].forEach(function (callback: (...args: any) => any) {
        callback(payload)
      })
    }
  }

  public $data: Record<string, any>
  public $el: Element
  public $options: VueOptions

  private _event_bus = new Vue.EventBus()

  public constructor(options: VueOptions) {
    this.$options = options

    if (typeof this.$options.beforeCreate === 'function') {
      this.$options.beforeCreate.call(this)
    }

    this.$data = (typeof this.$options.data === 'function' ? this.$options.data() : this.$options.data) ?? {}

    this._initData()
    this._initComputed()
    this._initWatch()
    this._initMethods()

    if (typeof this.$options.created === 'function') {
      this.$options.created.call(this)
    }

    if (typeof this.$options.el !== 'undefined') {
      this.$mount(this.$options.el)
    }
  }

  public $mount(el: string | Element): void {
    if (typeof this.$options.beforeMount === 'function') {
      this.$options.beforeMount.call(this)
    }

    const element = typeof el === 'string' ? document.querySelector(el) : el
    if (element === null) throw new Error('[ERROR]: initial element failed')
    this.$el = element

    this._render()

    if (typeof this.$options.mounted === 'function') {
      this.$options.mounted.call(this)
    }
  }

  public $on(eventName: string, callback: (...args: any) => any): void {
    this._event_bus.on(eventName, callback)
  }

  public $emit(eventName: string, ...payload: any[]): void {
    this._event_bus.emit(eventName, ...payload)
  }

  private _initData(): void {
    const self = this
    Object.keys(this.$data).forEach(function (key) {
      Object.defineProperty(self, key, {
        get: function() {
          return self.$data[key]
        },
        set: function(value) {
          self.$data[key] = value

          if (typeof self.$options.beforeUpdate === 'function') {
            self.$options.beforeUpdate.call(self)
          }

          self._render()

          if (typeof self.$options.updated === 'function') {
            self.$options.updated.call(self)
          }
        },
      })
    })
  }

  private _initComputed (): void {
    const self = this
    Object.keys(this.$options.computed ?? {}).forEach(function (key) {
      Object.defineProperty(self, key, {
        get: function () {
          return this.$options.computed[key].call(self)
        }
      })
    })
  }

  private _initWatch(): void {
    const self = this
    Object.keys(this.$options.watch ?? {}).forEach(function (key) {
      Object.defineProperty(self.$data, key, {
        get: function () {
          return self.$data[key]
        },
        set: function (newValue) {
          self.$data[key] = newValue
          self.$options.watch![key].call(self, newValue)
        }
      })
    })
  }

  private _initMethods(): void {
    const self = this
    Object.keys(this.$options.methods ?? {}).forEach(function (key) {
      Object.defineProperty(self, key, {
        get: function () {
          return self.$options.methods![key].bind(self)
        }
      })
    })
  }

  private _render(): void {
    if (typeof this.$options.render === 'function') {
      this._renderFunction()
    } else if (typeof this.$options.template === 'string') {
      this._renderTemplate()
    }
  }

  private _renderFunction(): void {
    this.$el.innerHTML = this.$options.render!.call(this)
  }

  private _renderTemplate(): void {
    const self = this

    const template = this.$options.template!

    const compliedTemplate = template.replace(/\{\{(.*?)\}\}/g, function (_, expression: string) {
      const val = (function(expression: string) {
        with (self.$data) {
          return eval(expression)
        }
      })(expression)
      return val ?? ''
    })

    this.$el.innerHTML = compliedTemplate.trim()

    this.$el.querySelectorAll('[v-text]').forEach(function (el) {
      const val = el.getAttribute('v-text')!
      el.textContent = this.$data[val]
    })

    // todo - support custom component and more html element
    this.$el.querySelectorAll('[v-model]').forEach(function (el) {
      const val = el.getAttribute('v-model')!
      if (el instanceof HTMLInputElement) {
        el.value = this.$data[val]
        el.addEventListener('input', function (e) {
          this.$data.val = (e.target as HTMLInputElement).value
        })
      }
    })
  }
}
