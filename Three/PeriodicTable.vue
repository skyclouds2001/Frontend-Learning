<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Color, Object3D, PerspectiveCamera, Scene, Vector3 } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import TWEEN from 'three/examples/jsm/libs/tween.module'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useEventListener } from '@sky-fly/shooks'
import { periodic } from '@/data'

const container = ref<HTMLDivElement | null>(null)

const table = ref<HTMLDivElement | null>(null)

const sphere = ref<HTMLDivElement | null>(null)

const helix = ref<HTMLDivElement | null>(null)

const grid = ref<HTMLDivElement | null>(null)

const count = periodic.length / 5

onMounted(() => {
  const animate = (): void => {
    controls.update()
    stats.update()
    // eslint-disable-next-line import/no-named-as-default-member
    TWEEN.update()

    window.requestAnimationFrame(animate)
  }

  const render = (): void => {
    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(40, width / height, 1, 1000)
  camera.position.set(0, 0, 3000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new CSS3DRenderer()
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const controls = new TrackballControls(camera, renderer.domElement)
  controls.minDistance = 500
  controls.maxDistance = 6000
  controls.addEventListener('change', render)

  const objects: CSS3DObject[] = []
  const targets: Record<'table' | 'sphere' | 'helix' | 'grid', Object3D[]> = {
    table: [],
    sphere: [],
    helix: [],
    grid: [],
  }

  for (let i = 0, v = new Vector3(); i < count; ++i) {
    const element = document.createElement('div')
    element.classList.add('element')
    element.style.backgroundColor = `rgba(0, 127, 127, ${Math.random() * 0.5 + 0.25})`

    const number = document.createElement('div')
    number.classList.add('number')
    number.textContent = String(i + 1)
    element.appendChild(number)

    const symbol = document.createElement('div')
    symbol.classList.add('symbol')
    symbol.textContent = String(periodic[i * 5])
    element.appendChild(symbol)

    const details = document.createElement('div')
    details.classList.add('details')
    details.innerHTML = `${String(periodic[i * 5 + 1])}<br />${String(periodic[i * 5 + 2])}`
    element.appendChild(details)

    const objectCSS = new CSS3DObject(element)
    objectCSS.position.x = Math.random() * 4000 - 2000
    objectCSS.position.y = Math.random() * 4000 - 2000
    objectCSS.position.z = Math.random() * 4000 - 2000
    scene.add(objectCSS)

    objects.push(objectCSS)

    const table = new Object3D()
    table.position.x = Number(periodic[i * 5 + 3]) * 140 - 1330
    table.position.y = -Number(periodic[i * 5 + 4]) * 180 + 990
    targets.table.push(table)

    const sphere = new Object3D()
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    sphere.position.setFromSphericalCoords(800, phi, theta)
    v.copy(sphere.position).multiplyScalar(2)
    sphere.lookAt(v)
    targets.sphere.push(sphere)

    const helix = new Object3D()
    helix.position.setFromCylindricalCoords(900, i * 0.175 + Math.PI, -(i * 8) + 450)
    v.x = helix.position.x * 2
    v.y = helix.position.y
    v.z = helix.position.z * 2
    helix.lookAt(v)
    targets.helix.push(helix)

    const grid = new Object3D()
    grid.position.x = (i % 5) * 400 - 800
    grid.position.y = -(Math.floor(i / 5) % 5) * 400 + 800
    grid.position.z = Math.floor(i / 25) * 1000 - 2000
    targets.grid.push(grid)
  }

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)

    render()
  })

  useEventListener(window, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)

    render()
  })

  useEventListener(table.value as HTMLDivElement, 'click', (e: MouseEvent) => {
    transform(targets.table, 2000, e.target as HTMLDivElement)
  })

  useEventListener(sphere.value as HTMLDivElement, 'click', (e: MouseEvent) => {
    transform(targets.sphere, 2000, e.target as HTMLDivElement)
  })

  useEventListener(helix.value as HTMLDivElement, 'click', (e: MouseEvent) => {
    transform(targets.helix, 2000, e.target as HTMLDivElement)
  })

  useEventListener(grid.value as HTMLDivElement, 'click', (e: MouseEvent) => {
    transform(targets.grid, 2000, e.target as HTMLDivElement)
  })

  const transform = (targets: Object3D[], duration: number, thisArgs: HTMLElement): void => {
    // eslint-disable-next-line import/no-named-as-default-member
    TWEEN.removeAll()

    for (let i = 0; i < count; ++i) {
      const object = objects[i]
      const target = targets[i]

      // eslint-disable-next-line import/no-named-as-default-member
      new TWEEN.Tween(object.position)
        .to({
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
        })
        // eslint-disable-next-line import/no-named-as-default-member
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      // eslint-disable-next-line import/no-named-as-default-member
      new TWEEN.Tween(object.rotation)
        .to({
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z,
        })
        // eslint-disable-next-line import/no-named-as-default-member
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
    }

    // eslint-disable-next-line import/no-named-as-default-member
    new TWEEN.Tween(thisArgs)
      .to({}, duration * 2)
      .onUpdate(render)
      .start()
  }

  window.requestAnimationFrame(animate)

  transform(targets.table, 2000, container.value)
})
</script>

<template>
  <div id="container" ref="container"></div>
  <div id="menu">
    <button id="table" ref="table">TABLE</button>
    <button id="sphere" ref="sphere">SPHERE</button>
    <button id="helix" ref="helix">HELIX</button>
    <button id="grid" ref="grid">GRID</button>
  </div>
</template>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}

#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

:deep(.element) {
  width: 120px;
  height: 160px;
  font-family: Helvetica, sans-serif;
  line-height: normal;
  text-align: center;
  border: 1px solid rgb(127 255 255 / 25%);
  box-shadow: 0 0 12px rgb(0 255 255 / 50%);
  cursor: default;

  &:hover {
    border: 1px solid rgb(127 255 255 / 75%);
    box-shadow: 0 0 12px rgb(0 255 255 / 75%);
  }

  .number {
    position: absolute;
    top: 20px;
    right: 20px;
    color: rgb(127 255 255 / 75%);
    font-size: 12px;
  }

  .symbol {
    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    color: rgb(255 255 255 / 75%);
    font-weight: bold;
    font-size: 60px;
    text-shadow: 0 0 10px rgb(0 255 255 / 95%);
  }

  .details {
    position: absolute;
    right: 0;
    bottom: 15px;
    left: 0;
    color: rgb(127 255 255 / 75%);
    font-size: 12px;
  }
}

button {
  padding: 5px 10px;
  color: rgb(127 255 255 / 75%);
  background: transparent;
  border: 0;
  outline: 1px solid rgb(127 255 255 / 75%);
  cursor: pointer;

  &:hover {
    background-color: rgb(0 255 255 / 50%);
  }

  &:active {
    color: #000;
    background-color: rgb(0 255 255 / 75%);
  }
}
</style>
