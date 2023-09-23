<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { useEventListener } from '@sky-fly/shooks'
import { lensflare } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) {
    container.value.appendChild(WebGL.getWebGLErrorMessage())
    return
  }

  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01, THREE.SRGBColorSpace)
  scene.fog = new THREE.Fog(scene.background, 3500, 15000)

  const camera = new THREE.PerspectiveCamera(40, width / height, 1, 15000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 250)
  camera.up.set(0, 1, 0)
  camera.lookAt(scene.position)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(15000)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 1
  controls.maxDistance = 15000

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

  const geometry = new THREE.BoxGeometry(250, 250, 250)
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 50,
  })
  for (let i = 0; i < 3000; ++i) {
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1), 8000 * (2 * Math.random() - 1))
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()

    scene.add(mesh)
  }

  const light = new THREE.DirectionalLight(0xffffff, 0.15)
  light.position.set(0, -1, 0).normalize()
  light.color.setHSL(0.1, 0.7, 0.5)
  scene.add(light)

  const loader = new THREE.TextureLoader()

  const texture = loader.load(new URL(lensflare, import.meta.url).href)

  const lights = [
    [0.55, 0.9, 0.5, 5000, 0, -1000],
    [0.08, 0.8, 0.5, 0, 0, -1000],
    [0.995, 0.5, 0.9, 5000, 5000, -1000],
  ]

  for (const l of lights) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000, 0)
    light.position.set(l[3], l[4], l[5])
    light.color.set(l[0], l[1], l[2])
    scene.add(light)

    const lensflare = new Lensflare()
    lensflare.addElement(new LensflareElement(texture, 700, 0, light.color))
    lensflare.addElement(new LensflareElement(texture, 60, 0.6))
    lensflare.addElement(new LensflareElement(texture, 70, 0.7))
    lensflare.addElement(new LensflareElement(texture, 120, 0.9))
    lensflare.addElement(new LensflareElement(texture, 70, 1))
    light.add(lensflare)
  }
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
