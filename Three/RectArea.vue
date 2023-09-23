<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BoxGeometry, Color, Mesh, MeshStandardMaterial, PerspectiveCamera, RectAreaLight, Scene, TorusKnotGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { useEventListener } from '@sky-fly/shooks'

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

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 5, -15)
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

  useEventListener(
    window,
    'resize',
    () => {
      if (container.value === null) return

      const { width, height } = container.value.getBoundingClientRect()

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
    },
    {
      passive: true,
    }
  )

  useEventListener(
    window,
    'orientationchange',
    () => {
      if (container.value === null) return

      const { width, height } = container.value.getBoundingClientRect()

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
    },
    {
      passive: true,
    }
  )

  RectAreaLightUniformsLib.init()

  const rectAreaLight1 = new RectAreaLight(0xff0000, 5, 4, 10)
  rectAreaLight1.position.set(-5, 5, 5)
  scene.add(rectAreaLight1)

  scene.add(new RectAreaLightHelper(rectAreaLight1))

  const rectAreaLight2 = new RectAreaLight(0x00ff00, 5, 4, 10)
  rectAreaLight2.position.set(0, 5, 5)
  scene.add(rectAreaLight2)

  scene.add(new RectAreaLightHelper(rectAreaLight2))

  const rectAreaLight3 = new RectAreaLight(0x0000ff, 5, 4, 10)
  rectAreaLight3.position.set(5, 5, 5)
  scene.add(rectAreaLight3)

  scene.add(new RectAreaLightHelper(rectAreaLight3))

  const boxGeometry = new BoxGeometry(2000, 0.1, 2000)
  const boxMaterial = new MeshStandardMaterial({
    color: 0xbcbcbc,
    roughness: 0.1,
    metalness: 0,
  })
  const boxMesh = new Mesh(boxGeometry, boxMaterial)
  scene.add(boxMesh)

  const torusKnotGeometry = new TorusKnotGeometry(1.5, 0.5, 200, 16)
  const torusKnotMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0,
  })
  const torusKnotMesh = new Mesh(torusKnotGeometry, torusKnotMaterial)
  torusKnotMesh.position.set(0, 5, 0)
  scene.add(torusKnotMesh)

  controls.target.copy(torusKnotMesh.position)

  const render = (): void => {
    torusKnotMesh.rotation.y = performance.now() / 1000
  }
})
</script>

<template>
  <div v-if="WebGL.isWebGLAvailable()" id="container" ref="container"></div>
  <div v-else>WebGL is not supported by current version of browser, please update to the newest version of browser.</div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
