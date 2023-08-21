<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { rain } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    const p = points.geometry.getAttribute('position').array as Float32Array
    p.forEach((v, i) => {
      if (i % 3 === 1) {
        // eslint-disable-next-line security/detect-object-injection
        p[i] -= Math.random() * 0.5
        if (v < -40) {
          // eslint-disable-next-line security/detect-object-injection
          p[i] = 40
        }
      }
    })
    points.geometry.getAttribute('position').needsUpdate = true
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
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 0, 40)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const POINT_COUNT = 1000

  const geometry = new BufferGeometry()
  const positions = new Float32Array(POINT_COUNT * 3).fill(0).map(() => (Math.random() - 0.5) * 100)
  geometry.setAttribute('position', new BufferAttribute(positions, 3))

  const texture = new TextureLoader()
  const rainTexture = texture.load(rain)

  const material = new PointsMaterial({
    size: 1,
    transparent: true,
    opacity: 0.5,
    vertexColors: false,
    sizeAttenuation: true,
    color: 0xededed,
    depthTest: true,
    depthWrite: false,
    map: rainTexture,
    alphaMap: rainTexture,
    blending: AdditiveBlending,
  })

  const points = new Points(geometry, material)
  scene.add(points)

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
