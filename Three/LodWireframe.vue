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
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0x000000, 1, 15000)

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 15000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 1000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(15000)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 1
  controls.maxDistance = 15000
  controls.target.set(0, 0, 0)

  const point = new THREE.PointLight(0xff2200, 3, 0, 0)
  point.position.set(0, 0, 0)
  scene.add(point)

  const directional = new THREE.DirectionalLight(0xffffff, 3)
  directional.position.set(0, 0, 1)
  scene.add(directional)

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

  const geometries: Array<[THREE.IcosahedronGeometry, number]> = [
    [new THREE.IcosahedronGeometry(100, 16), 50],
    [new THREE.IcosahedronGeometry(100, 8), 300],
    [new THREE.IcosahedronGeometry(100, 4), 1000],
    [new THREE.IcosahedronGeometry(100, 2), 2000],
    [new THREE.IcosahedronGeometry(100, 1), 8000],
  ]

  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: true,
  })

  for (let i = 0; i < 1000; ++i) {
    const lod = new THREE.LOD()

    geometries.forEach(([geometry, level]) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(1.5, 1.5, 1.5)
      mesh.updateMatrix()
      mesh.matrixAutoUpdate = false

      lod.addLevel(mesh, level)
    })

    lod.position.set(7500 * (0.5 - Math.random()), 7500 * (0.5 - Math.random()), 7500 * (0.5 - Math.random()))
    lod.updateMatrix()
    lod.matrixAutoUpdate = false
    scene.add(lod)
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
