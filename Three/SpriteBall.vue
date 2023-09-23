<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Color, PerspectiveCamera, Scene } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as TWEEN from 'three/examples/jsm/libs/tween.module'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useEventListener } from '@sky-fly/shooks'
import { sprite } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    TWEEN.update()

    const time = performance.now()

    objects.forEach((object) => {
      const scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1
      object.scale.set(scale, scale, scale)
    })

    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
  }

  if (!WebGL.isWebGLAvailable()) return

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(50, width / height, 1, 5000)
  camera.position.set(1000, 1500, 2000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new CSS3DRenderer()
  renderer.setSize(width, height)

  window.requestAnimationFrame(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new TrackballControls(camera, renderer.domElement)

  let current: 0 | 1 | 2 | 3 = 0
  const total = 512
  const objects = Array<CSS3DSprite>(total)
  const positions = Array<number>(total * 3 * 4)

  // random cube cube site length
  const site = 4000

  // each row of object's number | 8 * 8 * 8 = 512
  const amount = 8
  // each site length of object
  const separation = 150
  const offset = ((amount - 1) * separation) / 2

  const amountX = 16
  const amountZ = 32
  const plane = 150
  const offsetX = ((amountX - 1) * plane) / 2
  const offsetZ = ((amountZ - 1) * plane) / 2

  const radius = 750

  for (let i = 0; i < total; ++i) {
    positions[total * 3 * 0 + i * 3 + 0] = Math.random() * site - site / 2
    positions[total * 3 * 0 + i * 3 + 1] = Math.random() * site - site / 2
    positions[total * 3 * 0 + i * 3 + 2] = Math.random() * site - site / 2

    positions[total * 3 * 1 + i * 3 + 0] = (i % amount) * separation - offset
    positions[total * 3 * 1 + i * 3 + 1] = Math.floor((i / amount) % amount) * separation - offset
    positions[total * 3 * 1 + i * 3 + 2] = Math.floor(i / amount / amount) * separation - offset

    positions[total * 3 * 2 + i * 3 + 0] = (i % amountX) * plane - offsetX
    positions[total * 3 * 2 + i * 3 + 1] = Math.floor(i / amountX) * plane
    positions[total * 3 * 2 + i * 3 + 2] = (Math.sin((i % amountX) * plane * 0.5) + Math.sin(Math.floor(i / amountX) * plane * 0.5)) * 200 - offsetZ

    const phi = Math.acos(-1 + (2 * i) / total)
    const theta = Math.sqrt(total * Math.PI) * phi

    positions[total * 3 * 3 + i * 3 + 0] = radius * Math.cos(theta) * Math.sin(phi)
    positions[total * 3 * 3 + i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
    positions[total * 3 * 3 + i * 3 + 2] = radius * Math.cos(phi)
  }

  const image = document.createElement('img')
  image.addEventListener(
    'load',
    () => {
      for (let i = 0; i < total; ++i) {
        const object = new CSS3DSprite(image.cloneNode() as HTMLImageElement)

        object.position.x = positions[total * 3 * current + i * 3 + 0]
        object.position.y = positions[total * 3 * current + i * 3 + 1]
        object.position.z = positions[total * 3 * current + i * 3 + 2]

        scene.add(object)

        objects[i] = object
      }

      transition()
    },
    {
      passive: true,
      once: true,
    }
  )
  image.src = new URL(sprite, import.meta.url).href

  const transition = (): void => {
    objects.forEach((object, i) => {
      new TWEEN.Tween(object.position)
        .to(
          {
            x: positions[total * 3 * current + i * 3 + 0],
            y: positions[total * 3 * current + i * 3 + 1],
            z: positions[total * 3 * current + i * 3 + 2],
          },
          Math.random() * 2000 + 2000
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
    })

    new TWEEN.Tween(window)
      .to({}, 2000 * 3)
      .onComplete(transition)
      .start()

    current = ((current + 1) % 4) as 0 | 1 | 2 | 3
  }

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.render(scene, camera)
  })

  useEventListener(window.screen.orientation, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.render(scene, camera)
  })
})
</script>

<template>
  <div v-if="WebGL.isWebGLAvailable()" id="container" ref="container"></div>
  <div v-else>WebGL is not supported by current version of browser, please update to the newest version of browser.</div>
</template>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
