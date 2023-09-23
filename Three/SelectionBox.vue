<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, BoxGeometry, Color, Mesh, MeshLambertMaterial, PCFShadowMap, PerspectiveCamera, Scene, SpotLight, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
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
  scene.background = new Color(0xf0f0f0)

  const camera = new PerspectiveCamera(70, width / height, 0.1, 500)
  camera.position.set(0, 0, 50)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFShadowMap

  container.value.appendChild(renderer.domElement)

  const ambient = new AmbientLight(0xaaaaaa)
  scene.add(ambient)

  const spot = new SpotLight(0xffffff, 10000)
  spot.position.set(0, 25, 50)
  spot.angle = Math.PI / 5
  spot.castShadow = true
  spot.shadow.camera.near = 10
  spot.shadow.camera.far = 100
  spot.shadow.mapSize.width = 1024
  spot.shadow.mapSize.height = 1024

  for (let i = 0; i < 100; ++i) {
    const geometry = new BoxGeometry()

    const material = new MeshLambertMaterial({
      color: 0xffffff * Math.random(),
    })

    const mesh = new Mesh(geometry, material)

    mesh.position.x = Math.random() * 80 - 40
    mesh.position.y = Math.random() * 45 - 25
    mesh.position.z = Math.random() * 45 - 25

    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI

    mesh.scale.x = Math.random() * 2 + 1
    mesh.scale.y = Math.random() * 2 + 1
    mesh.scale.z = Math.random() * 2 + 1

    mesh.castShadow = true
    mesh.receiveShadow = true

    mesh.castShadow = true
    mesh.receiveShadow = true

    scene.add(mesh)
  }

  const selectionBox = new SelectionBox(camera, scene)
  const selectionHelper = new SelectionHelper(renderer, 'select-box')

  useEventListener(document, 'pointerdown', (e) => {
    if (container.value === null) return

    const { width, height, left, top } = container.value.getBoundingClientRect()

    for (const item of selectionBox.collection) {
      ;(item.material as MeshLambertMaterial).emissive.set(0x000000)
    }

    selectionBox.startPoint.set(((e.clientX - left) / width) * 2 - 1, -((e.clientY - top) / height) * 2 + 1, 0.5)
  })

  useEventListener(document, 'pointermove', (e) => {
    if (container.value === null) return

    if (selectionHelper.isDown) {
      const { width, height, left, top } = container.value.getBoundingClientRect()

      for (const item of selectionBox.collection) {
        ;(item.material as MeshLambertMaterial).emissive.set(0x000000)
      }

      selectionBox.endPoint.set(((e.clientX - left) / width) * 2 - 1, -((e.clientY - top) / height) * 2 + 1, 0.5)

      for (const item of selectionBox.select()) {
        ;(item.material as MeshLambertMaterial).emissive.set(0xffffff)
      }
    }
  })

  useEventListener(document, 'pointerup', (e) => {
    if (container.value === null) return

    const { width, height, left, top } = container.value.getBoundingClientRect()

    selectionBox.endPoint.set(((e.clientX - left) / width) * 2 - 1, -((e.clientY - top) / height) * 2 + 1, 0.5)

    for (const item of selectionBox.select()) {
      ;(item.material as MeshLambertMaterial).emissive.set(0xffffff)
    }
  })

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  })

  useEventListener(window, 'orientationchange', () => {
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

<style scoped lang="scss">
:global(.select-box) {
  position: fixed;
  background-color: rgb(75 160 255 / 30%);
  border: 1px solid #5af;
}

#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
