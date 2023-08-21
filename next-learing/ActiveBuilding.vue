<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, AxesHelper, Color, CubeTextureLoader, DirectionalLight, Euler, LoadingManager, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEventListener } from '@sky-fly/shooks'
import { building, nx, ny, nz, px, py, pz } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const skyMaps = [px, nx, py, ny, pz, nz].map((path) => new URL(path, import.meta.url).href)

const cameraPosition = new Vector3(0, -13, 48)

const modalPosition = new Vector3(14, -40.8, 0)

const manager = new LoadingManager()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.preload()

const gltfLoader = new GLTFLoader(manager)
gltfLoader.setDRACOLoader(dracoLoader)

onMounted(() => {
  if (container.value === null) return

  const animate = (): void => {
    renderer.render(scene, camera)
    control.update()
  }

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.copy(cameraPosition)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new CubeTextureLoader(manager).load(skyMaps)

  const ambientLight = new AmbientLight(new Color(255, 255, 255))
  scene.add(ambientLight)

  const directionLight = new DirectionalLight(new Color(255, 99, 71), 2)
  directionLight.position.set(-220, 30, 50)
  scene.add(directionLight)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const control = new OrbitControls(camera, renderer.domElement)
  control.enabled = true
  control.enableDamping = true
  control.enableZoom = true
  control.autoRotate = false
  control.autoRotateSpeed = 0.1
  control.enablePan = true
  control.zoomSpeed = 1
  control.minDistance = 0
  control.maxDistance = Infinity

  const axes = new AxesHelper(50)
  axes.visible = false
  scene.add(axes)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gltfLoader.load(new URL(building, import.meta.url).href, (modal: any) => {
    modal.scene.position.copy(modalPosition)

    const r: Euler = modal.scene.rotation.clone()
    modal.scene.rotation.copy(new Euler(r.x, r.y - (131 * Math.PI) / 180, r.z, r.order))

    scene.add(modal.scene)
  })

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
  })
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
