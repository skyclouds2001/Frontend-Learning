<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Color, CylinderGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    stats.update()
    renderer.render(scene, camera)

    render()
  }

  if (!WebGL.isWebGLAvailable()) return

  if (container.value === null) return

  let { width, height, top, left } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.background = new Color(0xffffff)

  const camera = new PerspectiveCamera(40, width / height, 1, 15000)
  camera.position.set(0, 0, 3200)
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

      const rect = container.value.getBoundingClientRect()

      width = rect.width
      height = rect.height
      top = rect.top
      left = rect.left

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

      const rect = container.value.getBoundingClientRect()

      width = rect.width
      height = rect.height
      top = rect.top
      left = rect.left

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

  const sphere = new Mesh(new SphereGeometry(100, 20, 20), new MeshNormalMaterial())
  scene.add(sphere)

  const geometry = new CylinderGeometry(0, 10, 100, 12)
  geometry.rotateX(Math.PI / 2)
  const material = new MeshNormalMaterial()
  for (let i = 0; i < 1000; ++i) {
    const mesh = new Mesh(geometry, material)
    mesh.position.set(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2
    scene.add(mesh)
  }

  let mx = 0
  let my = 0
  const render = (): void => {
    const time = Date.now() * 0.0005
    sphere.position.x = Math.sin(time * 0.7) * 2000
    sphere.position.y = Math.cos(time * 0.5) * 2000
    sphere.position.z = Math.cos(time * 0.3) * 2000

    scene.children.forEach((object) => {
      object.lookAt(sphere.position)
    })

    camera.position.x += (mx - camera.position.x) * 0.05
    camera.position.y += (-my - camera.position.y) * 0.05
    camera.lookAt(scene.position)
  }

  useEventListener(
    document,
    'mousemove',
    (e) => {
      mx = (e.clientX - left - width / 2) * 10
      my = (e.clientY - top - height / 2) * 10
    },
    {
      passive: true,
    }
  )
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
