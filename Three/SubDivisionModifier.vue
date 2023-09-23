<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, BoxGeometry, Clock, DoubleSide, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, RepeatWrapping, SRGBColorSpace, Scene, TextureLoader, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LoopSubdivision } from 'three-subdivide'
import { useEventListener } from '@sky-fly/shooks'
import { uv_grid_opengl } from '@/assets'

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

    render()
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 1, 2)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(5)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 0, 0)
  controls.minDistance = 2.5
  controls.maxDistance = 10
  controls.rotateSpeed = 0.5

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

  scene.add(new HemisphereLight(0xffffff, 0x737373, 3))

  const loader = new TextureLoader()

  const texture = loader.load(new URL(uv_grid_opengl, import.meta.url).href, (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.colorSpace = SRGBColorSpace
  })

  const basic = new Mesh(
    new BoxGeometry(),
    new MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      flatShading: false,
    })
  )
  basic.position.set(0.75, 0, 0)
  scene.add(basic)

  const modified = new Mesh(
    LoopSubdivision.modify(new BoxGeometry(), 3, {
      split: true,
      uvSmooth: false,
      preserveEdges: false,
      flatOnly: false,
      maxTriangles: 2500,
    }),
    new MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      flatShading: false,
    })
  )
  modified.position.set(-0.75, 0, 0)
  scene.add(modified)

  const clock = new Clock()

  const render = (): void => {
    const time = clock.getElapsedTime()

    basic.rotation.set(0, 0, time * -0.1)
    modified.rotation.set(0, 0, time * 0.1)
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
