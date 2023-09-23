<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) {
    container.value.appendChild(WebGL.getWebGLErrorMessage())
    return
  }

  const animate = (): void => {
    stats.begin()
    render()
    stats.end()

    controls.update()
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color(0x444488)

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2500)
  camera.name = 'PerspectiveCamera'
  camera.position.set(500, 500, 800)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(400)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 200
  controls.maxDistance = 2000

  const onResize = (): void => {
    if (container.value === null) return

    const { width: w, height: h } = container.value.getBoundingClientRect()

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.render(scene, camera)

    width = w
    height = h
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  scene.add(new THREE.AmbientLight(0xc1c1c1, 3))

  const light = new THREE.PointLight(0xffffff, 10, 800, 0)
  scene.add(light)
  light.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(4, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
    )
  )

  const side = 400
  const number = 5
  const radius = (side / number) * 0.8 * 0.5
  const step = 1 / number
  const format = renderer.capabilities.isWebGL2 ? THREE.RedFormat : THREE.LuminanceFormat

  const geometry = new THREE.SphereGeometry(radius, 32, 16)

  for (let alpha = 0, index = 0; alpha < 1; ++index, alpha += step) {
    const colors = new Uint8Array(index + 2)

    for (let c = 0; c <= colors.length; ++c) {
      colors[c] = (c / colors.length) * 256
    }

    const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format)
    // gradientMap.needsUpdate = true

    for (let beta = 0; beta < 1; beta += step) {
      for (let gamma = 0; gamma <= 1; gamma += step) {
        const color = new THREE.Color().setHSL(alpha, 0.5, gamma * 0.5 + 0.1).multiplyScalar(1 - beta * 0.2)

        const material = new THREE.MeshToonMaterial({
          color,
          gradientMap,
        })

        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(alpha * 400 - 200, beta * 400 - 200, gamma * 400 - 200)

        scene.add(mesh)
      }
    }
  }

  const effect = new OutlineEffect(renderer)

  const clock = new THREE.Clock()

  const render = (): void => {
    const time = clock.getElapsedTime() * 0.25

    light.position.set(Math.sin(time * 7) * 300, Math.cos(time * 5) * 400, Math.cos(time * 3) * 300)

    effect.render(scene, camera)
  }
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
