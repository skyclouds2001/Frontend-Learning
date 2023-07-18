const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

const audioContext = new AudioContext()

const sourceNode = audioContext.createMediaStreamSource(mediaStream)

const analyser = audioContext.createAnalyser()
sourceNode.connect(analyser)

const biquadFilter = audioContext.createBiquadFilter()
analyser.connect(biquadFilter)
biquadFilter.type = 'lowshelf'
biquadFilter.frequency.value = 1000
biquadFilter.gain.value = 25

const convolver = audioContext.createConvolver()
biquadFilter.connect(convolver)

const gainNode = audioContext.createGain()
convolver.connect(gainNode)
gainNode.gain.value = 2.0

const wakeShaper = audioContext.createWaveShaper()
gainNode.connect(wakeShaper)

wakeShaper.connect(audioContext.destination)

export {}
