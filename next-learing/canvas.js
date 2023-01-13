/**
 * @type {HTMLCanvasElement}
 */
const cnv = document.getElementById('canvas')

cnv.width = 500
cnv.height = 300

cnv.style.border = '1px solid black'

/**
 * @type {CanvasRenderingContext2D}
 */
const cxt = cnv.getContext('2d')


/**********   **********/


cxt.beginPath()

cxt.lineWidth = 2
cxt.strokeStyle = 'red'
cxt.lineCap = 'round'

cxt.moveTo(100, 100)
cxt.lineTo(200, 200)

cxt.stroke()


/**********   **********/


cxt.beginPath()

cxt.lineWidth = 1
cxt.strokeStyle = 'black'
cxt.lineCap = 'butt'

cxt.moveTo(50, 200)
cxt.lineTo(100, 50)
cxt.lineTo(200, 200)
cxt.lineTo(250, 50)

cxt.stroke()


/**********   **********/


cxt.beginPath()

cxt.strokeStyle = 'green'
cxt.strokeRect(50, 50, 200, 100)

cxt.beginPath()

cxt.fillStyle = 'blue'
cxt.fillRect(0, 0, 50, 50)

cxt.beginPath()

cxt.strokeStyle = 'red'
cxt.fillStyle = 'pink'
cxt.rect(200, 200, 100, 100)
cxt.stroke()
cxt.fill()

cxt.clearRect(225, 225, 50, 50)


/**********   **********/


cxt.beginPath()

cxt.moveTo(50, 50)
cxt.lineTo(200, 50)
cxt.lineTo(200, 200)

cxt.closePath()

cxt.lineJoin = 'miter'
cxt.lineWidth = 2

cxt.stroke()


/**********   **********/


cxt.beginPath()
cxt.arc(350, 150, 80, 0, 360 * Math.PI / 180)
cxt.closePath()
cxt.stroke()

cxt.beginPath()
cxt.arc(400, 150, 100, 0, 180 * Math.PI / 180)
cxt.closePath()
cxt.stroke()

cxt.beginPath()
cxt.arc(400, 200, 100, 0, 30 * Math.PI / 180)
cxt.stroke()

cxt.moveTo(40, 40)
cxt.arcTo(120, 40, 120, 120, 80)
cxt.stroke()


/**********   **********/


cxt.font = '50px Arial'
cxt.strokeStyle = 'black'
cxt.strokeText('6', 0, 100)
cxt.fillStyle = 'black'
cxt.fillText('5', 0, 200)


/**********   **********/

const image = new Image()
image.src = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
image.onload = () => {
  cxt.drawImage(image, 400, 0, 100, 100)
}

const imageElement = document.getElementById('img') || image
cxt.drawImage(imageElement, 400, 0, 100, 100)
