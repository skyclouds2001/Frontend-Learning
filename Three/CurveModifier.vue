<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, BoxGeometry, BufferGeometry, CatmullRomCurve3, Color, DirectionalLight, LineBasicMaterial, LineLoop, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { Flow, InstancedFlow } from 'three/examples/jsm/modifiers/CurveModifier'
import { type Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { useEventListener } from '@sky-fly/shooks'
import { helvetiker_regular } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) {
    container.value.appendChild(WebGL.getWebGLErrorMessage())
    return
  }

  const animate = (): void => {
    render()

    stats.update()
    renderer.render(scene, camera)
  }

  let { width, height, top, left } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'

  const camera = new PerspectiveCamera(40, width / height, 1, 1000)
  camera.name = 'PerspectiveCamera'
  camera.position.set(2, 2, 4)
  camera.up.set(0, 1, 0)
  camera.lookAt(scene.position)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const control = new OrbitControls(camera, renderer.domElement)
  control.enableDamping = true

  const onResize = (): void => {
    if (container.value === null) return

    const { width: w, height: h, top: t, left: l } = container.value.getBoundingClientRect()

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.render(scene, camera)

    width = w
    height = h
    top = t
    left = l
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  scene.add(new AmbientLight(0x003973, 3))

  const light = new DirectionalLight(0xffaa33, 3)
  light.position.set(-10, 10, 10)
  scene.add(light)

  const geometry = new BoxGeometry(0.1, 0.1, 0.1)
  const material = new MeshBasicMaterial()

  const handles = [
    [new Vector3(1, 0.5, -1), new Vector3(1, 0.5, 1), new Vector3(-1, 0.5, 1), new Vector3(-1, 0.5, -1)],
    [new Vector3(1, -0.5, -1), new Vector3(1, -0.5, 1), new Vector3(-1, -0.5, 1), new Vector3(-1, -0.5, -1)],
  ].map((points) => {
    return points.map((point) => {
      const handle = new Mesh(geometry, material)
      handle.position.copy(point)
      scene.add(handle)

      return handle
    })
  })

  const curves = handles.map((handles) => {
    const curve = new CatmullRomCurve3(handles.map((handle) => handle.position))
    curve.curveType = 'centripetal'
    curve.closed = true

    return curve
  })

  const lines = curves.map((curve) => {
    const line = new LineLoop(
      new BufferGeometry().setFromPoints(curve.getPoints(50)),
      new LineBasicMaterial({
        color: 0x00ff00,
      })
    )
    scene.add(line)

    return line
  })

  const loader = new FontLoader()

  let flow: Flow

  let instancedFlow: InstancedFlow

  let font: Font

  let text = 'Hello world'

  const renderFlows = (font: Font): void => {
    const geometry = new TextGeometry(text, {
      font,
      size: 0.2,
      height: 0.05,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    })
    geometry.rotateX(Math.PI)
    geometry.rotateY(Math.PI)

    const material = new MeshStandardMaterial({
      color: 0x99ffff,
    })

    flow = new Flow(new Mesh(geometry, material))
    flow.updateCurve(0, curves[0])
    scene.add(flow.object3D)

    instancedFlow = new InstancedFlow(4, 1, geometry, material)
    instancedFlow.updateCurve(0, curves[1])
    scene.add(instancedFlow.object3D)

    for (let i = 0; i < 4; ++i) {
      instancedFlow.setCurve(i, 0)
      instancedFlow.moveIndividualAlongCurve(i, (i * 1) / 4)
      instancedFlow.object3D.setColorAt(i, new Color(0xffffff * Math.random()))
    }
  }

  loader.load(new URL(helvetiker_regular, import.meta.url).href, (f) => {
    font = f
    renderFlows(font)
  })

  const raycaster = new Raycaster()

  const controls = new TransformControls(camera, renderer.domElement)
  controls.addEventListener('dragging-changed', (e) => {
    if (!(e.value as boolean) && controls.object != null) {
      if (handles[0].includes(controls.object as Mesh<BoxGeometry, MeshBasicMaterial>)) {
        const points = curves[0].getPoints(50)
        lines[0].geometry.setFromPoints(points)
        flow.updateCurve(0, curves[0])
      }
      if (handles[1].includes(controls.object as Mesh<BoxGeometry, MeshBasicMaterial>)) {
        const points = curves[1].getPoints(50)
        lines[1].geometry.setFromPoints(points)
        instancedFlow.updateCurve(0, curves[1])
      }
    }
  })
  scene.add(controls)

  enum Action {
    NONE = 0,
    SELECT = 1,
  }

  const mouse = new Vector2()

  let action: Action = Action.NONE

  useEventListener(window, 'pointerdown', (e) => {
    action = Action.SELECT
    mouse.x = ((e.clientX - left) / width) * 2 - 1
    mouse.y = -((e.clientY - top) / height) * 2 + 1
  })

  useEventListener(window, 'keypress', (e) => {
    text += e.key
    const offset = flow.uniforms.pathOffset.value
    scene.remove(flow.object3D)
    renderFlows(font)
    flow.uniforms.pathOffset.value = offset
  })

  const render = (): void => {
    if (action === Action.SELECT) {
      raycaster.setFromCamera(mouse, camera)
      action = Action.NONE
      const intersects = raycaster.intersectObjects(handles.flat(1), false)
      if (intersects.length > 0) {
        controls.attach(intersects[0].object)
        control.enabled = false
      } else {
        controls.detach()
        control.enabled = true
      }
    }

    if (flow != null) {
      flow.moveAlongCurve(0.001)
    }
    if (instancedFlow != null) {
      instancedFlow.moveAlongCurve(0.001)
    }
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
