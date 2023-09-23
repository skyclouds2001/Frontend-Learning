<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, BufferAttribute, BufferGeometryLoader, CanvasTexture, Color, DirectionalLight, DoubleSide, Float32BufferAttribute, IcosahedronGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, SRGBColorSpace, Scene, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lut } from 'three/examples/jsm/math/Lut.js'
import { useEventListener } from '@sky-fly/shooks'
import { pressure } from '@/assets'

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

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0xffffff)

  const camera = new PerspectiveCamera(20, width / height, 1, 10000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 2000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 500
  controls.maxDistance = 10000 - 1000
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI / 2

  const onResize = (): void => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.render(scene, camera)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const light = new DirectionalLight(0xffffff, 1)
  light.position.set(0, 0, 1)
  scene.add(light)
  scene.add(new AmbientLight(0xffffff, 0.5))

  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128

  const context = canvas.getContext('2d')
  if (context == null) return

  const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
  gradient.addColorStop(0.1, 'rgba(210, 210, 210, 1)')
  gradient.addColorStop(1, 'rgba(255,255,255,1)')

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const shadowTexture = new CanvasTexture(canvas)
  const shadowGeometry = new PlaneGeometry(300, 300, 1, 1)
  const shadowMaterial = new MeshBasicMaterial({
    map: shadowTexture,
  })
  const shadowMesh = new Mesh(shadowGeometry, shadowMaterial)
  shadowMesh.position.y = -250
  shadowMesh.rotation.x = -Math.PI / 2
  scene.add(shadowMesh)

  const radius = 200

  const geometry = new IcosahedronGeometry(radius, 1)

  const count = geometry.attributes.position.count
  const colors = new Float32Array(count * 3)
  geometry.setAttribute('color', new BufferAttribute(colors, 3))
  for (let i = 0, c = new Color(), position = geometry.attributes.position; i < count; ++i) {
    c.setHSL((position.getY(i) / radius + 1) / 2, 1.0, 0.5, SRGBColorSpace)
    colors[3 * i + 0] = c.r
    colors[3 * i + 1] = c.g
    colors[3 * i + 2] = c.b
  }

  const material = new MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
    shininess: 0,
  })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const wireframe = new Mesh(
    geometry,
    new MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
    })
  )
  mesh.add(wireframe)

  const lut = new Lut()
  lut.setColorMap('rainbow')
  lut.setMin(0)
  lut.setMax(2000)

  new BufferGeometryLoader().load(new URL(pressure, import.meta.url).href, (geometry) => {
    geometry.center()
    geometry.computeVertexNormals()
    geometry.scale(75, 75, 75)
    geometry.translate(500, 0, 0)

    const colors = new Float32Array(geometry.attributes.position.count * 3).fill(1)
    for (let i = 0, c = new Color(), p = geometry.attributes.pressure; i < p.count; ++i) {
      c.copy(lut.getColor(p.array[i])).convertSRGBToLinear()
      colors[3 * i + 0] = c.r
      colors[3 * i + 1] = c.g
      colors[3 * i + 2] = c.b
    }
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

    const material = new MeshLambertMaterial({
      side: DoubleSide,
      color: 0xf5f5f5,
      vertexColors: true,
    })

    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
  })

  const render = (): void => {
    camera.lookAt(scene.position)
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
