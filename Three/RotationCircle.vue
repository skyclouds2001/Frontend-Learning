<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BufferGeometry, Color, ColorManagement, Float32BufferAttribute, Line, LineBasicMaterial, LineDashedMaterial, PerspectiveCamera, Scene } from 'three'
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    let count = 0
    const time = window.performance.now() / 1000

    scene.traverse((child) => {
      child.rotation.x = count + time / 3
      child.rotation.z = count + time / 4
      ++count
    })
    renderer.render(scene, camera)

    window.requestAnimationFrame(render)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  ColorManagement.enabled = false

  const camera = new PerspectiveCamera(33, width / height, 0.1, 100)
  camera.position.set(0, 0, 10)

  const scene = new Scene()
  scene.background = new Color(0, 0, 0)

  const renderer = new SVGRenderer()
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const vertices = new Array(50)
    .fill(0)
    .map((_, i) => {
      const v = (i / 50) * (Math.PI * 2)
      return [Math.sin(v), 0, Math.cos(v)]
    })
    .flat()

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

  const lines = new Array(3).fill(0).map((_, i) => {
    const material = new LineBasicMaterial({
      color: Math.random() * 0xffffff,
      linewidth: 10,
    })

    const line = new Line(geometry, material)
    line.scale.setScalar(i / 3)

    return line
  })
  scene.add(...lines)

  const material = new LineDashedMaterial({
    color: 'blue',
    linewidth: 1,
    dashSize: 10,
    gapSize: 10,
  })
  const line = new Line(geometry, material)
  line.scale.setScalar(2)
  scene.add(line)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })

  window.requestAnimationFrame(render)
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
