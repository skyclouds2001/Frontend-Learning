<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

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

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(10, 10, 10)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(25)
  scene.add(helper)

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

  scene.add(new THREE.AmbientLight(0xffffff, 1))

  scene.add(new THREE.DirectionalLight(0xffffff, 2))

  const clock = new THREE.Clock()

  const geometry = new THREE.TorusKnotGeometry()

  const basic = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: 0x049ef4,
    })
  )
  basic.position.set(-4, 0, 4)
  scene.add(basic)

  const lambert = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({
      color: 0x049ef4,
    })
  )
  lambert.position.set(-2, 0, 2)
  scene.add(lambert)

  const phong = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: 0x049ef4,
    })
  )
  phong.position.set(0, 0, 0)
  scene.add(phong)

  const standard = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0x049ef4,
    })
  )
  standard.position.set(2, 0, -2)
  scene.add(standard)

  const physical = new THREE.Mesh(
    geometry,
    new THREE.MeshPhysicalMaterial({
      color: 0x049ef4,
    })
  )
  physical.position.set(4, 0, -4)
  scene.add(physical)

  const depth = new THREE.Mesh(geometry, new THREE.MeshDepthMaterial())
  depth.position.set(-2, -2, 6)
  scene.add(depth)

  // const distance = new THREE.Mesh(geometry, new THREE.MeshDistanceMaterial())
  // distance.position.set(0, -2, 4)
  // scene.add(distance)

  const matcap = new THREE.Mesh(
    geometry,
    new THREE.MeshMatcapMaterial({
      color: 0x049ef4,
    })
  )
  matcap.position.set(2, -2, 2)
  scene.add(matcap)

  const normal = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial())
  normal.position.set(4, -2, 0)
  scene.add(normal)

  const toon = new THREE.Mesh(
    geometry,
    new THREE.MeshToonMaterial({
      color: 0x049ef4,
    })
  )
  toon.position.set(6, -2, -2)
  scene.add(toon)

  const render = (): void => {
    const time = clock.getElapsedTime()

    basic.position.setY(Math.sin(time + 0 + Math.PI * 0) * 2 + 0)
    lambert.position.setY(Math.sin(time + Math.PI * 0.25) * 2 + 0)
    phong.position.setY(Math.sin(time + Math.PI * 0.5) * 2 + 0)
    standard.position.setY(Math.sin(time + Math.PI * 0.75) * 2 + 0)
    physical.position.setY(Math.sin(time + Math.PI * 1) * 2 + 0)
    depth.position.setY(Math.sin(time + Math.PI * 0) * 2 + -2)
    // distance.position.setY(Math.sin(time + Math.PI * 0.25) * 2 + -2)
    matcap.position.setY(Math.sin(time + Math.PI * 0.5) * 2 + -2)
    normal.position.setY(Math.sin(time + Math.PI * 0.75) * 2 + -2)
    toon.position.setY(Math.sin(time + Math.PI * 1) * 2 + -2)
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
