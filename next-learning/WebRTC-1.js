async function init () {
  const video = document.createElement('video')
  video.id = 'video'
  document.body.appendChild(video)
  /**
   * 查看 constraints参数具体支持的配置项
   * navigator.mediaDevices.getSupportedConstraints()
   */

  getLocalStream({
    audio: false,
    video: {
      width: 1280,
      height: 720,
    },
  })
}

/**
 * 获取本地音视频流
 *
 * @param {MediaStreamConstraints} constraints
 */
async function getLocalStream (constraints = {}) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

/**
 * 播放本地视频流
 *
 * @param {MediaStream} stream
 */
async function playLocalStream (stream) {
  const video = document.getElementById('video')
  video.srcObject = stream
}

/**
 * 转换为图片
 */
async function takePhoto () {
  const video = document.getElementById('video')
  const canvas = document.createElement('canvas')
  canvas.width = video.width
  canvas.height = video.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataUrl = canvas.toDataURL('image/png')
  const img = document.createElement('img')
  img.src = dataUrl
  img.width = canvas.width
  img.height = canvas.height
  img.alt = ''
  document.body.appendChild(img)
}

/**
 * 获取所有视频输入设备
 */
async function getDevices () {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoInputDevices = devices.filter((device) => device.kind === 'videoinput')
}

/**
 * 切换设备
 *
 * @param {string} deviceId
 */
async function handleDeviceChange (deviceId) {
  getLocalStream({
    audio: false,
    video: {
      deviceId: {
        exact: deviceId,
      },
    },
  })
}

/**
 * 切换前后摄像头
 *
 * @param {'environment' | 'user' | 'left' | 'right'} type
 */
async function switchCamera (type) {
  const stream = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: type,
    },
  })
  playLocalStream(stream)
}

/**
 * 获取屏幕共享的媒体流
 */
async function shareScreen () {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  playLocalStream(stream)
}

// 获取支持的媒体类型
async function getSupportedMimeTypes () {
  const media = 'video'
  const types = ['webm', 'mp4', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'ts', 'x-matroska']    // 常用的视频格式
  const codecs = ['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264']    // 常用的视频编码
  const supported = []    // 支持的媒体类型
  types.forEach((type) => {
    const mimeType = `${media}/${type}`
    codecs.forEach((codec) =>
      [
        `${mimeType};codecs=${codec}`,
        `${mimeType};codecs=${codec.toUpperCase()}`,
      ].forEach((variation) => {
        if (MediaRecorder.isTypeSupported(variation)) supported.push(variation)
      }),
    )
    if (MediaRecorder.isTypeSupported(mimeType)) supported.push(mimeType)
  })
  return supported
}

/**
 * 录制媒体流
 *
 * @param {MediaStream} stream
 */
async function startRecord (stream) {
  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  })
  mediaRecorder.start()

  mediaRecorder.ondataavailable = (e) => {
    const blob = new Blob([e.data], { type: 'video/mp4' })
    downloadBlob(blob)
  }
  mediaRecorder.onstop = (e) => {}
}
