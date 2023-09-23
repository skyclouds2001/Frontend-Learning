<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, Color, DirectionalLight, Fog, GridHelper, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, TorusKnotGeometry, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { DRACOExporter } from 'three/examples/jsm/exporters/DRACOExporter'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter'
// @ts-expect-error no available definition file provided
import DracoEncoderModule from 'three/examples/jsm/libs/draco/draco_encoder'
import { useEventListener } from '@sky-fly/shooks'

Object.defineProperty(globalThis, 'DracoEncoderModule', {
  value: DracoEncoderModule,
  writable: false,
  configurable: false,
  enumerable: true,
})

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
  scene.background = new Color(0xa0a0a0)
  scene.fog = new Fog(0xa0a0a0, 4, 20)

  const camera = new PerspectiveCamera(45, width / height, 0.1, 100)
  camera.name = 'PerspectiveCamera'
  camera.position.set(4, 2, 4)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(20)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 1.5, 0)

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

  const hemisphere = new HemisphereLight(0xffffff, 0x444444, 3)
  hemisphere.name = 'hemisphere'
  hemisphere.position.set(0, 20, 0)
  scene.add(hemisphere)

  const directional = new DirectionalLight(0xffffff, 3)
  directional.name = 'directional'
  directional.position.set(0, 20, 10)
  directional.castShadow = true
  directional.shadow.camera.top = 2
  directional.shadow.camera.bottom = -2
  directional.shadow.camera.left = -2
  directional.shadow.camera.right = 2
  scene.add(directional)

  const ground = new Mesh(
    new PlaneGeometry(200, 200),
    new MeshStandardMaterial({
      color: 0xbbbbbb,
      depthWrite: false,
    })
  )
  ground.name = 'ground'
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const grid = new GridHelper(40, 20, 0x000000, 0x000000)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene.add(grid)

  const geometry = new TorusKnotGeometry(0.75, 0.2, 200, 30)
  const material = new MeshStandardMaterial({
    color: 0x00ff00,
  })
  const mesh = new Mesh(geometry, material)
  mesh.castShadow = true
  mesh.position.y = 1.5
  scene.add(mesh)

  const draco = new DRACOExporter()

  const gltf = new GLTFExporter()

  const obj = new OBJExporter()

  const ply = new PLYExporter()

  const stl = new STLExporter()

  const usdz = new USDZExporter()

  const download = (buffer: ArrayBufferView | ArrayBuffer | Blob | string, file: string, type: string): void => {
    const blob = new Blob([buffer], {
      type,
    })
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = file
    a.hidden = true
    a.ariaHidden = 'true'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(href)
  }

  const props = {
    draco: () => {
      const buffer = draco.parse(mesh)
      download(buffer, 'file.drc', 'application/octet-stream')
    },
    gltf: () => {
      gltf.parse(
        mesh,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (gltf: Record<string, any>) => {
          if (!(gltf instanceof ArrayBuffer)) {
            const buffer = JSON.stringify(gltf, null, 2)
            download(buffer, 'file.gltf', 'text/plain')
          }
        },
        (error) => {
          console.error(error)
        }
      )
    },
    glb: () => {
      gltf.parse(
        mesh,
        (gltf) => {
          if (gltf instanceof ArrayBuffer) {
            download(gltf, 'file.glb', 'application/octet-stream')
          }
        },
        (error) => {
          console.error(error)
        },
        {
          binary: true,
        }
      )
    },
    obj: () => {
      const buffer = obj.parse(mesh)
      download(buffer, 'file.obj', 'text/plain')
    },
    ply: () => {
      ply.parse(mesh, (buffer) => {
        download(buffer, 'file.ply', 'text/plain')
      })
    },
    stl: () => {
      const buffer = stl.parse(mesh)
      download(buffer, 'file.stl', 'text/plain')
    },
    usdz: async () => {
      const buffer = await usdz.parse(mesh)
      download(buffer, 'file.usdz', 'application/octet-stream')
    },
  }

  const gui = new GUI({
    container: container.value,
  })
  const folder = gui.addFolder('export')
  folder.add(props, 'draco').name('Export Draco')
  folder.add(props, 'gltf').name('Export glTF as JSON')
  folder.add(props, 'glb').name('Export glTF as binary')
  folder.add(props, 'obj').name('Export OBJ')
  folder.add(props, 'ply').name('Export PLY')
  folder.add(props, 'stl').name('Export STL')
  folder.add(props, 'usdz').name('Export USDZ')
  gui.open()

  const render = (): void => {
    const time = performance.now() * 0.0005
    mesh.rotation.y = time
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

:global(.lil-gui.root) {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
