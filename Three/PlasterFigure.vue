<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Clock, Color, type Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEventListener } from '@sky-fly/shooks'
import { WaltHead } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
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

  const camera = new PerspectiveCamera(50, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 100)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

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

  let object: Group | null = null

  const clock = new Clock()

  const sphere = new SphereGeometry(0.5, 16, 8)

  const light1 = new PointLight(0xff0040, 400)
  light1.add(new Mesh(sphere, new MeshBasicMaterial({ color: 0xff0040 })))
  scene.add(light1)

  const light2 = new PointLight(0x0040ff, 400)
  light2.add(new Mesh(sphere, new MeshBasicMaterial({ color: 0x0040ff })))
  scene.add(light2)

  const light3 = new PointLight(0x80ff80, 400)
  light3.add(new Mesh(sphere, new MeshBasicMaterial({ color: 0x80ff80 })))
  scene.add(light3)

  const light4 = new PointLight(0xffaa00, 400)
  light4.add(new Mesh(sphere, new MeshBasicMaterial({ color: 0xffaa00 })))
  scene.add(light4)

  const render = (): void => {
    const time = Date.now() * 0.0005
    const delta = clock.getDelta()

    if (object !== null) object.rotation.y -= 0.5 * delta

    light1.position.x = Math.sin(time * 0.7) * 30
    light1.position.y = Math.cos(time * 0.5) * 40
    light1.position.z = Math.cos(time * 0.3) * 30

    light2.position.x = Math.cos(time * 0.3) * 30
    light2.position.y = Math.sin(time * 0.5) * 40
    light2.position.z = Math.sin(time * 0.7) * 30

    light3.position.x = Math.sin(time * 0.7) * 30
    light3.position.y = Math.cos(time * 0.3) * 40
    light3.position.z = Math.sin(time * 0.5) * 30

    light4.position.x = Math.sin(time * 0.3) * 30
    light4.position.y = Math.cos(time * 0.7) * 40
    light4.position.z = Math.sin(time * 0.5) * 30
  }

  new OBJLoader().load(new URL(WaltHead, import.meta.url).href, (obj) => {
    obj.scale.multiplyScalar(0.8)
    obj.position.set(0, -30, 0)
    scene.add(obj)

    object = obj
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
