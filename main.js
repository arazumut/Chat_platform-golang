

//! Produced By Kamil Umut Araz

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Base camera
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -14
camera.position.y = 6  
camera.position.z = 16
scene.add(camera)

//Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = true
controls.minDistance = 10
controls.maxDistance = 22
// controls.maxDistance = 35

controls.minPolarAngle = Math.PI / 5
controls.maxPolarAngle = Math.PI / 2

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding


// Top
const light = new THREE.DirectionalLight( '#ffffff', 3 )
scene.add( light )
light.position.set(0,3,0)
light.intensity = 1.5

// // Left
const light2 = new THREE.DirectionalLight( '#ffffff', 3 )
scene.add( light2 )
light2.position.set(-4,0,-2)
light2.intensity = 1.5

// //Right
const light3 = new THREE.DirectionalLight( '#ffffff', 3 )
scene.add( light3 )
light3.position.set(4,1,2)
light3.intensity = .5

// // Front
const light4 = new THREE.DirectionalLight( '#ffffff', 3 )
scene.add( light4 )
light4.position.set(0,0,3)
light4.intensity = .6

// Back
const light5 = new THREE.DirectionalLight( '#ffffff', 4 )
scene.add( light5 )
light5.position.set(0,0,-5)
light5.intensity = 1

const rectLight = new THREE.RectAreaLight( 0xffffff, .9, 10, 10 )
rectLight.position.set( 0, 2, 0 )
rectLight.lookAt( 0, 0, 0 )
scene.add( rectLight )

// Materials
const bakedTexture = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room12/cecbd1c77333b3c9ee23bb1eb41dee395e14ca3e/dist/baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const normalTexture = textureLoader.load('')
normalTexture.flipY = false
normalTexture.encoding = THREE.sRGBEncoding

const occlusionTexture = textureLoader.load('')
occlusionTexture.flipY = false
occlusionTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshStandardMaterial({ 
	map: bakedTexture,
	normalMap: normalTexture,
    aoMap: occlusionTexture,
    side: THREE.DoubleSide,
})

const metalicMaterial = new THREE.MeshStandardMaterial({ 
    map: bakedTexture,
    side: THREE.DoubleSide,
})

//Loader
const loader = new THREE.GLTFLoader()

loader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room12/cecbd1c77333b3c9ee23bb1eb41dee395e14ca3e/dist/model.glb',
    (gltf) => {
        const model = gltf.scene
        model.traverse( child => {
			child.material = metalicMaterial 
            child.material.roughness = 0
		})
        scene.add(model)
	   
    },
	( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
    }
)

loader.load('',
    (gltf) => {
        const model = gltf.scene
        model.traverse( child => {
			child.material = bakedMaterial 
            child.material.metalness = .85
            child.material.roughness = .5
		})
        scene.add(model)
    },
	( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
    }
)


window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
// Animation

let rmapped = 0
let minPan = new THREE.Vector3( -2, -.5, -2 )
let maxPan = new THREE.Vector3( 2, .5, 2 )

const tick = () => {
    controls.update()
	controls.target.clamp( minPan, maxPan )
	controls.target.clamp( minPan, maxPan )
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
	
	let h = rmapped * 0.0025 % 1
    let s = 0.5
    let l = 0.5
    // rectLight.color.setHSL ( h, s, l )
    // rmapped ++
}

tick()
