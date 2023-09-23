<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type BufferGeometry, Clock, Group, type Mesh, type MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer, AmbientLight } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier'
import { useEventListener } from '@sky-fly/shooks'
import { LeePerrySmith } from '@/assets'

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
  camera.position.set(0, 5, 15)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

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

  scene.add(new AmbientLight(0xffffff, 1))

  const light = new PointLight(0xffffff, 400)
  camera.add(light)
  scene.add(camera)

  const group = new Group()
  scene.add(group)

  const loader = new GLTFLoader()

  const modifier = new SimplifyModifier()

  const clock = new Clock()

  loader.load(new URL(LeePerrySmith, import.meta.url).href, (gltf) => {
    const mesh = gltf.scene.children[0] as Mesh<BufferGeometry, MeshStandardMaterial>
    mesh.position.set(-5, 0, 0)
    mesh.rotation.set(0, Math.PI / 2, 0)
    group.add(mesh)

    const simplified = mesh.clone()
    simplified.material = mesh.material.clone()
    simplified.material.flatShading = true
    simplified.position.set(5, 0, 0)
    simplified.rotation.set(0, -Math.PI / 2, 0)
    simplified.geometry = modifier.modify(simplified.geometry, Math.floor(simplified.geometry.attributes.position.count * 0.75))
    group.add(simplified)
  })

  const render = (): void => {
    const time = clock.getElapsedTime()

    group.rotation.y = time * 0.5
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
