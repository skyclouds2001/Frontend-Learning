<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, Box3, BufferAttribute, BufferGeometry, CanvasTexture, ClampToEdgeWrapping, Clock, Color, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, TextureLoader, Vector3, WebGLRenderer } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { color } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  let time = 0
  const clock = new Clock()

  const render = (): void => {
    time = (time + clock.getDelta() * 0.4) % 1

    // @ts-expect-error not existed property
    rainMaterial.cameraPosition = camera.position

    // @ts-expect-error not existed property
    if (rainMaterial.uniforms != null) {
      // @ts-expect-error not existed property
      rainMaterial.uniforms.cameraPosition.value = camera.position
      // @ts-expect-error not existed property
      rainMaterial.uniforms.time.value = time
    }

    controls.update()
    stats.update()
    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const camera = new PerspectiveCamera(45, width / height, 1, 150000)
  camera.position.set(10000, 10000, 10000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new Color(0x333333)

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  const axes = new AxesHelper()
  scene.add(axes)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true
  controls.autoRotate = false
  controls.enablePan = true

  const loader = new TextureLoader()

  const box = new Box3(new Vector3(-4000, 0, -4000), new Vector3(4000, 5000, 4000))

  const rainMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.8,
    map: loader.load(new URL(color, import.meta.url).href),
    depthWrite: false,
  })

  rainMaterial.onBeforeCompile = (shader) => {
    const getRoot = `
            uniform float top;
            uniform float bottom;
            uniform float time;
            #include <common>
            float angle(float x, float y){
              return atan(y, x);
            }
            vec2 getFoot(vec2 camera,vec2 normal,vec2 pos){
                vec2 position;

                float distanceLen = distance(pos, normal);

                float a = angle(camera.x - normal.x, camera.y - normal.y);

                pos.x > normal.x ? a -= 0.785 : a += 0.785; 

                position.x = cos(a) * distanceLen;
                position.y = sin(a) * distanceLen;
                
                return position + normal;
            }
            `
    const beginVertex = `
            vec2 foot = getFoot(vec2(cameraPosition.x, cameraPosition.z),  vec2(normal.x, normal.z), vec2(position.x, position.z));
            float height = top - bottom;
            float y = normal.y - bottom - height * time;
            y = y + (y < 0.0 ? height : 0.0);
            float ratio = (1.0 - y / height) * (1.0 - y / height);
            y = height * (1.0 - ratio);
            y += bottom;
            y += position.y - normal.y;
            vec3 transformed = vec3( foot.x, y, foot.y );
            // vec3 transformed = vec3( position );
            `
    shader.vertexShader = shader.vertexShader.replace('#include <common>', getRoot)
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', beginVertex)

    shader.uniforms.cameraPosition = {
      value: new Vector3(0, 200, 0),
    }
    shader.uniforms.top = {
      value: 500,
    }
    shader.uniforms.bottom = {
      value: 0,
    }
    shader.uniforms.time = {
      value: 0,
    }
    // @ts-expect-error not existed property
    rainMaterial.uniforms = shader.uniforms
  }

  const rainGeometry = new BufferGeometry()

  const verties = []
  const normals = []
  const uvs = []
  const indices = []

  for (let i = 0; i < 10000; ++i) {
    const pos = new Vector3()
    pos.x = Math.random() * (box.max.x - box.min.x) + box.min.x
    pos.y = Math.random() * (box.max.y - box.min.y) + box.min.y
    pos.z = Math.random() * (box.max.z - box.min.z) + box.min.z

    const height = (box.max.y - box.min.y) / 15
    const width = height / 50
    verties.push(pos.x + width, pos.y + height / 2, pos.z, pos.x - width, pos.y + height / 2, pos.z, pos.x - width, pos.y - height / 2, pos.z, pos.x + width, pos.y - height / 2, pos.z)
    normals.push(pos.x, pos.y, pos.z, pos.x, pos.y, pos.z, pos.x, pos.y, pos.z, pos.x, pos.y, pos.z)
    uvs.push(1, 1, 0, 1, 0, 0, 1, 0)
    indices.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3)
  }

  rainGeometry.setAttribute('position', new BufferAttribute(new Float32Array(verties), 3))
  rainGeometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
  rainGeometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
  rainGeometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1))

  const rainMesh = new Mesh(rainGeometry, rainMaterial)
  scene.add(rainMesh)

  const noise = new ImprovedNoise()
  const data = new Uint8Array(256 * 256)
  for (let j = 0, k = Math.random() * 100, quality = 1; j < 4; ++j, quality *= 5) {
    for (let i = 0; i < 256 * 256; ++i) {
      // eslint-disable-next-line security/detect-object-injection
      data[i] += Math.abs(noise.noise((i % 256) / quality, ~~(i / 256) / quality, k) * quality * 1.75)
    }
  }

  const geometry = new PlaneGeometry(7500, 7500, 255, 255)
  geometry.rotateX(-Math.PI / 2)

  const vertices = geometry.attributes.position.array
  for (let i = 0, j = 0, l = vertices.length; i < l; ++i, j += 3) {
    // eslint-disable-next-line security/detect-object-injection
    vertices[j + 1] = data[i] * 10
  }

  const vector = new Vector3(0, 0, 0)
  const sun = new Vector3(1, 1, 1).normalize()

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (context === null) return
  context.fillStyle = '#000'
  context.fillRect(0, 0, 256, 256)

  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  const imageData = image.data

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, ++j) {
    vector.x = data[j - 2] - data[j + 2]
    vector.y = 2
    vector.z = data[j - 256 * 2] - data[j + 256 * 2]
    vector.normalize()

    const shade = vector.dot(sun)

    // eslint-disable-next-line security/detect-object-injection
    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007)
    // eslint-disable-next-line security/detect-object-injection
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007)
    // eslint-disable-next-line security/detect-object-injection
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007)
  }

  context.putImageData(image, 0, 0)

  const canva = document.createElement('canvas')
  canva.width = 256 * 4
  canva.height = 256 * 4

  const contex = canva.getContext('2d')
  if (contex === null) return
  contex.scale(4, 4)
  contex.drawImage(canvas, 0, 0)

  const imag = contex.getImageData(0, 0, canva.width, canva.height)
  const imagDat = imag.data

  for (let i = 0, l = imagDat.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5)

    // eslint-disable-next-line security/detect-object-injection
    imagDat[i] += v
    imagDat[i + 1] += v
    imagDat[i + 2] += v
  }

  contex.putImageData(imag, 0, 0)

  const texture = new CanvasTexture(canva)
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping

  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    })
  )
  scene.add(mesh)

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
