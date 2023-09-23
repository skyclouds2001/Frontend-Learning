<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, Color, DirectionalLight, Group, MathUtils, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { useEventListener } from '@sky-fly/shooks'
import { helvetiker_regular } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const labels = [
  { size: 0.01, scale: 0.0001, label: 'microscopic (1µm)' },
  { size: 0.01, scale: 0.1, label: 'minuscule (1mm)' },
  { size: 0.01, scale: 1.0, label: 'tiny (1cm)' },
  { size: 1, scale: 1.0, label: 'child-sized (1m)' },
  { size: 10, scale: 1.0, label: 'tree-sized (10m)' },
  { size: 100, scale: 1.0, label: 'building-sized (100m)' },
  { size: 1000, scale: 1.0, label: 'medium (1km)' },
  { size: 10000, scale: 1.0, label: 'city-sized (10km)' },
  { size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
  { size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
  { size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
  { size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
  { size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
  { size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
  { size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' },
]

onMounted(() => {
  const animate = (): void => {
    stats.update()
    renderer.render(scene, camera)

    render()
  }

  if (!WebGL.isWebGLAvailable()) return

  if (container.value === null) return

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(50, width / height, 1e-6, 1e27)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0, 0, 0)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const onResize = (): void => {
    if (container.value === null) return

    const rect = container.value.getBoundingClientRect()
    width = rect.width
    height = rect.height

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

  const ambient = new AmbientLight(0x777777)
  scene.add(ambient)

  const directional = new DirectionalLight(0xffffff, 3)
  directional.position.set(100, 100, 100)
  scene.add(directional)

  new FontLoader().load(new URL(helvetiker_regular, import.meta.url).href, (font) => {
    const sphereGeometry = new SphereGeometry(0.5, 24, 12)

    for (const { label, size, scale } of labels) {
      const textGeometry = new TextGeometry(label, {
        font,
        size,
        height: size / 2,
      })

      textGeometry.computeBoundingSphere()

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      textGeometry.translate(-textGeometry.boundingSphere!.radius, 0, 0)

      const material = new MeshPhongMaterial({
        color: new Color().setHSL(Math.random(), 0.5, 0.5),
        specular: 0x050505,
        shininess: 50,
        emissive: 0x000000,
      })

      const group = new Group()
      group.position.set(0, 0, -size * scale)
      scene.add(group)

      const textMesh = new Mesh(textGeometry, material)
      textMesh.scale.set(scale, scale, scale)
      textMesh.position.set(0, (size / 4) * scale, -size * scale)
      group.add(textMesh)

      const sphereMesh = new Mesh(sphereGeometry, material)
      sphereMesh.position.set(0, (-size / 4) * scale, 0)
      sphereMesh.scale.multiplyScalar(size * scale)
      scene.add(sphereMesh)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const minZoom = labels.at(0)!.size * labels.at(0)!.scale * 1
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const maxZoom = labels.at(-1)!.size * labels.at(-1)!.scale * 100

  let zoomPos = -100
  let minZoomSpeed = 0.015
  let zoomSpeed = -100
  const mouse = [0.5, 0.5]

  const render = (): void => {
    let damping = Math.abs(zoomSpeed) > minZoomSpeed ? 0.95 : 1.0

    const zoom = MathUtils.clamp(Math.pow(Math.E, zoomPos), minZoom, maxZoom)
    zoomPos = Math.log(zoom)

    if ((zoom === minZoom && zoomSpeed < 0) || (zoom === maxZoom && zoomSpeed > 0)) {
      damping = 0.85
    }

    zoomPos += zoomSpeed
    zoomSpeed *= damping

    camera.position.x = Math.sin(0.5 * Math.PI * (mouse[0] - 0.5)) * zoom
    camera.position.y = Math.sin(0.25 * Math.PI * (mouse[1] - 0.5)) * zoom
    camera.position.z = Math.cos(0.5 * Math.PI * (mouse[0] - 0.5)) * zoom
    camera.lookAt(scene.position)
  }

  useEventListener(
    window,
    'wheel',
    (e) => {
      const amount = e.deltaY
      if (amount === 0) return
      const dir = amount / Math.abs(amount)

      zoomSpeed = dir / 10
      minZoomSpeed = 0.001
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

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
