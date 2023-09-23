<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BackSide, Color, DirectionalLight, Mesh, ObjectLoader, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MeshBasicNodeMaterial, vec4, color, positionLocal, mix } from 'three/examples/jsm/nodes/Nodes'
import { nodeFrame } from 'three/examples/jsm/renderers/webgl/nodes/WebGLNodes'
import { useEventListener } from '@sky-fly/shooks'
import { lightmap } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    render()
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
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(40, width / height, 1, 10000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(700, 200, -500)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = false
  controls.maxPolarAngle = (0.9 * Math.PI) / 2

  const onResize = (): void => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const light = new DirectionalLight(0xd5deff)
  light.position.set(300, 250, -500)
  scene.add(light)

  const topColor = new Color().copy(light.color)
  const bottomColor = new Color(0xffffff)
  const offset = 400
  const exponent = 0.6

  // @ts-expect-error as a fact it can be use
  const h = positionLocal.add(offset).normalize().y

  const skyGeometry = new SphereGeometry(4000, 32, 15)
  const skyMaterial = new MeshBasicNodeMaterial({
    side: BackSide,
  })
  skyMaterial.colorNode = vec4(mix(color(bottomColor), color(topColor), h.max(0.0).pow(exponent)), 1.0)
  const sky = new Mesh(skyGeometry, skyMaterial)
  scene.add(sky)

  const loader = new ObjectLoader()
  loader.load(new URL(lightmap, import.meta.url).href, (object) => {
    scene.add(object)
  })

  const render = (): void => {
    nodeFrame.update()
  }
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
