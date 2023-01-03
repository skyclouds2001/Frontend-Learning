const hue = 215
const maxStars = 1000

class Star {
  private orbitRadius: number
  private radius: number
  private orbitX: number
  private orbitY: number
  private timePassed: number
  private speed: number
  private alpha: number

  public static ctx: CanvasRenderingContext2D
  public static canvas: HTMLCanvasElement
  public static stars: Star[]
  public static width: number
  public static height: number

  static {
    Star.stars = new Array(maxStars).fill(new Star())

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx == null)
      throw new Error('Null point canvas context')

    canvas.width = 100
    canvas.height = 100

    const half = canvas.width / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)

    gradient.addColorStop(0.025, '#fff')
    gradient.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
    gradient.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
    gradient.addColorStop(1, 'transparent')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(half, half, half, 0, Math.PI * 2)
    ctx.fill()

    Star.canvas = canvas
    Star.ctx = ctx
  }

  constructor () {
      this.orbitRadius = Star.random(Star.maxOrbit(Star.width, Star.height))
      this.radius = Star.random(60, this.orbitRadius) / 12
      this.orbitX = Star.width / 2
      this.orbitY = Star.height / 2
      this.timePassed = Star.random(0, maxStars)
      this.speed = Star.random(this.orbitRadius) / 50000
      this.alpha = Star.random(2, 10) / 10
  }

  public draw() {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
    const twinkle = Star.random(10)

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    Star.ctx.globalAlpha = this.alpha
    Star.ctx.drawImage(Star.canvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
    this.timePassed += this.speed
  }

  private static random (max: number = 0, min: number = 0) {
    return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + Math.min(min, max)
  }

  private static maxOrbit (x: number, y: number) {
    return Math.round(Math.sqrt(2 * (Math.max(x, y) ** 2))) / 2
  }
}

export const init = () => {
  const canvas = document.getElementById('bg')
  if (canvas === null || !(canvas instanceof HTMLCanvasElement))
    throw new Error('Not a canvas element bg')

  const width = Star.width = canvas.width = window.innerWidth
  const height = Star.width = canvas.height = window.innerHeight

  const ctx = canvas.getContext('2d')
  if (ctx == null)
    throw new Error('Null point canvas context')

  Star.ctx = ctx
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 0.8
  ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`
  ctx.fillRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'

  Star.stars.forEach(v => v.draw())
}
