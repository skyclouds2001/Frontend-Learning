<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowHelper, AxesHelper, CameraHelper, Color, DirectionalLight, DirectionalLightHelper, GridHelper, HemisphereLight, HemisphereLightHelper, PerspectiveCamera, PointLight, PointLightHelper, PolarGridHelper, Scene, SpotLight, SpotLightHelper, Vector3, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)
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

  const camera = new PerspectiveCamera(50, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(400, 400, 400)
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

  const axesHelper = new AxesHelper(200)
  scene.add(axesHelper)

  const gridHelper = new GridHelper(400, 40, 0x0000ff, 0x808080)
  gridHelper.position.set(0, -50, 0)
  scene.add(gridHelper)

  const polarGridHelper = new PolarGridHelper(200, 20, 10, 64, 0x00ff00, 0x808080)
  polarGridHelper.position.set(0, 50, 0)
  scene.add(polarGridHelper)

  const perspectiveCamera = new PerspectiveCamera(50, width / height, 0.1, 100)
  perspectiveCamera.position.set(200, 200, 200)
  perspectiveCamera.lookAt(0, 0, 0)

  const arrowHelper = new ArrowHelper(new Vector3(1, 1, 1).normalize(), new Vector3(0, 0, 0), 50, 0xffff00)
  scene.add(arrowHelper)

  const cameraHelper = new CameraHelper(perspectiveCamera)
  scene.add(cameraHelper)

  const pointLight = new PointLight()
  pointLight.position.set(200, 100, 150)
  scene.add(pointLight)

  const pointLightHelper = new PointLightHelper(pointLight, 50)
  scene.add(pointLightHelper)

  const directionLight = new DirectionalLight()
  directionLight.position.set(-200, 100, 150)
  scene.add(directionLight)

  const directionLightHelper = new DirectionalLightHelper(directionLight, 100)
  scene.add(directionLightHelper)

  const spotLight = new SpotLight()
  spotLight.position.set(200, 100, -150)
  scene.add(spotLight)

  const spotLightHelper = new SpotLightHelper(spotLight)
  scene.add(spotLightHelper)

  const hemisphereLight = new HemisphereLight()
  hemisphereLight.position.set(-200, 100, -150)
  scene.add(hemisphereLight)

  const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight, 50)
  scene.add(hemisphereLightHelper)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  })

  useEventListener(window.screen.orientation, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
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
