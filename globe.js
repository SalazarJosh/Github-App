var scene3d = $(".container");
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 900;

//Setup Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040d21);

//Setup Camera
const camera = new THREE.PerspectiveCamera(75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);
camera.position.z = 5;

//Setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 900);
renderer.setSize(window.innerWidth, window.innerHeight);

//Setup Geometry
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshBasicMaterial({
  color: 0x262e76
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();

$(window).resize(function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
});