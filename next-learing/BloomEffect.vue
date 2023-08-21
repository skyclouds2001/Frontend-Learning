<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.02

    composer.render()
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

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 0, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true
  controls.autoRotate = false
  controls.enablePan = true

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    color: 0xffffff,
  })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const composer = new EffectComposer(renderer)

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const bloomPass = new UnrealBloomPass(new Vector2(width, height), 1.5, 0.4, 0.85)
  composer.addPass(bloomPass)

  const finalPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: {
          value: null,
        },
        bloomTexture: {
          value: composer.renderTarget2.texture,
        },
      },
      vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;

      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv);
      }
    `,
      defines: {},
    }),
    'baseTexture'
  )
  finalPass.needsSwap = true
  composer.addPass(finalPass)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  useEventListener(window, 'orientationchange', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
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
