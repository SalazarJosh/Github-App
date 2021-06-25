container = document.getElementById('canvas');

//SETUP SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040d21);

//SETUP RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 900);
document.body.appendChild(renderer.domElement);

//SETUP GEOMETRY
//setuphalo
const haloGeometry = new THREE.SphereGeometry(2.1, 64, 64);
const haloMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff
});
const halo = new THREE.Mesh(haloGeometry, haloMaterial);
halo.scale.multiplyScalar(1.15);
halo.rotateX(Math.PI * 0.03);
halo.rotateY(Math.PI * 0.03);
scene.add(halo);
//setup globe
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x1f285e
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


//SETUP camera
const camera = new THREE.PerspectiveCamera(75, 900 / 900, 0.1, 1000);
camera.position.z = 5;

//ANIMATION LOOP
const animate = function() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.001;

  renderer.render(scene, camera);
  container.appendChild(renderer.domElement);
};

animate();