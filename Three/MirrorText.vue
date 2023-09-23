<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Cache, Color, DirectionalLight, Fog, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, Vector3, WebGLRenderer } from 'three'
import { type Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { useEventListener } from '@sky-fly/shooks'
import { optimer_regular } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

Cache.enabled = true

onMounted(() => {
  const render = (): void => {
    group.rotation.y += (target - group.rotation.y) * 0.05

    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(30, width / height, 1, 1500)
  camera.position.set(0, 400, 700)
  camera.lookAt(new Vector3(0, 150, 0))

  const scene = new Scene()
  scene.background = new Color(0x000000)
  scene.fog = new Fog(0x000000, 250, 1400)

  const directionalLight = new DirectionalLight(0xffffff, 0.4)
  directionalLight.position.set(0, 0, 1).normalize()
  scene.add(directionalLight)

  const pointLight = new PointLight(0xffffff, 4.5, 0, 0)
  pointLight.color.setHSL(Math.random(), 1, 0.5)
  pointLight.position.set(0, 100, 90)
  scene.add(pointLight)

  const plane = new Mesh(new PlaneGeometry(10000, 10000), new MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true }))
  plane.position.y = 100
  plane.position.x = -Math.PI / 2
  scene.add(plane)

  const group = new Group()
  group.position.y = 100
  scene.add(group)

  const materials = [new MeshPhongMaterial({ color: 0xffffff, flatShading: true }), new MeshPhongMaterial({ color: 0xffffff })]

  let text = 'Hello World'
  let textMesh1: Mesh
  let textMesh2: Mesh
  let font: Font

  new FontLoader().load(
    optimer_regular,
    (result: Font) => {
      font = result

      renderText()
    },
    (event: ProgressEvent) => {
      console.log((event.loaded / event.total) * 100)
    },
    (error: unknown) => {
      console.error(error)
    }
  )

  const renderText = (): void => {
    const textGeometry = new TextGeometry(text, {
      font,
      size: 70,
      height: 20,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelEnabled: true,
    })
    textGeometry.computeBoundingBox()

    const center = -0.5 * ((textGeometry.boundingBox?.max.x ?? 0) - (textGeometry.boundingBox?.min.x ?? 0))

    textMesh1 = new Mesh(textGeometry, materials)
    textMesh1.position.set(center, 30, 0)
    textMesh1.rotation.set(0, 2 * Math.PI, 0)
    group.add(textMesh1)

    textMesh2 = new Mesh(textGeometry, materials)
    textMesh2.position.set(center, -30, 0)
    textMesh2.rotation.set(Math.PI, 2 * Math.PI, 0)
    group.add(textMesh2)
  }

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(render)
  renderer.useLegacyLights = false
  container.value.appendChild(renderer.domElement)

  container.value.style.touchAction = 'none'

  useEventListener(window, 'keydown', (e) => {
    if (e.key === 'Backspace') {
      text = text.slice(0, -1)
    } else {
      text += e.key
    }

    group.clear()

    if (text.length === 0) return

    renderText()
  })

  let target = 0

  useEventListener(container.value, 'pointerdown', (e: PointerEvent) => {
    if (!e.isPrimary) return

    const pos = e.clientX - width / 2
    const rawTarget = target

    container.value?.setPointerCapture(e.pointerId)

    const move = (e: PointerEvent): void => {
      if (!e.isPrimary) return

      target = rawTarget + (e.clientX - width / 2 - pos) * 0.02
    }

    const stop = (): void => {
      container.value?.releasePointerCapture(e.pointerId)

      container.value?.removeEventListener('pointermove', move)
      container.value?.removeEventListener('pointerup', stop)
    }

    container.value?.addEventListener('pointermove', move, { passive: true })
    container.value?.addEventListener('pointerup', stop, { passive: true })
  })
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
