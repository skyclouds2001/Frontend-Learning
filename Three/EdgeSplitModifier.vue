<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, type BufferGeometry, Clock, Color, Fog, HemisphereLight, type Mesh, type MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { useEventListener } from '@sky-fly/shooks'
import { Cerberus } from '@/assets'

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
  scene.background = new Color(0xaaaaaa)
  scene.fog = new Fog(0xaaaaaa, 10, 25)

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 1, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(25)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 2.5
  controls.maxDistance = Infinity

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

  const light = new HemisphereLight(0xffffff, 0x444444, 3)
  scene.add(light)

  const clock = new Clock()

  const loader = new OBJLoader()

  const modifier = new EdgeSplitModifier()

  let cerberus: Mesh<BufferGeometry, MeshPhongMaterial>
  let modified: Mesh<BufferGeometry, MeshPhongMaterial>

  loader.load(new URL(Cerberus, import.meta.url).href, (group) => {
    cerberus = group.children.at(0) as Mesh<BufferGeometry, MeshPhongMaterial>
    cerberus.position.set(-1, 0, 0)
    cerberus.scale.set(3, 3, 3)
    scene.add(cerberus)

    modified = cerberus.clone()
    modified.geometry = modifier.modify(BufferGeometryUtils.mergeVertices(modified.geometry), (20 * Math.PI) / 180, true)
    modified.material.flatShading = false
    modified.position.set(1, 0, 0)
    modified.scale.set(3, 3, 3)
    scene.add(modified)

    animate()
  })

  const render = (): void => {
    if (cerberus != null && modified != null) {
      const time = clock.getElapsedTime()

      cerberus.rotation.set(time * 0.5, 0, 0)
      modified.rotation.set(time * 0.5, 0, 0)
    }
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
