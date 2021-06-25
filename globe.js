container = document.getElementById('canvas');

//SETUP SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040d21);

//SETUP RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 900);
document.body.appendChild(renderer.domElement);

//SETUP lights
var light1 = new THREE.PointLight(0x5a54ff, 0.75);
light1.position.set(-150, 150, -50);

var light2 = new THREE.PointLight(0x4158f6, 0.75);
light2.position.set(-400, 200, 150);

var light3 = new THREE.PointLight(0x803bff, 0.7);
light3.position.set(100, 250, -100);

scene.add(light1, light2, light3);

//SETUP GEOMETRY
//setuphalo
const atmosphereShader = {
  'atmosphere': {
    uniforms: {},
    vertexShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
      'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
      '}'
    ].join('\n')
  }
}
const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);

const atmosphereMaterial = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
  vertexShader: atmosphereShader['atmosphere'].vertexShader,
  fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});
const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
atm.scale.set(1.02, 1.02, 1.02);
scene.add(atm);

atm.position.set(-.1, .1, 0);

//setup globe
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xeeeeee
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

//setup map overlay
const loader = new THREE.TextureLoader();
const overlayMaterial = new THREE.MeshBasicMaterial({
  map: loader.load('https://i.imgur.com/JLFp6Ws.png'),
  transparent: true
});

const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
const overlaySphere = new THREE.Mesh(overlaySphereGeometry, overlayMaterial);
overlaySphere.castShadow = true;
overlaySphere.receiveShadow = true;
scene.add(overlaySphere);

//Detect click-drag rotation
/* */
var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};
$("#canvas").on('mousedown', function(e) {
    isDragging = true;
  })
  .on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
      x: e.offsetX - previousMousePosition.x
    };
    console.log(deltaMove.x);

    if (isDragging) {
      sphere.rotation.y += deltaMove.x * .001;
    }

    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });


$(document).mouseup(function() {
  isDragging = false;
});

$("#canvas").mouseout(function() {
  isDragging = false;
});


//SETUP camera
const camera = new THREE.PerspectiveCamera(75, 900 / 900, 0.1, 1000);
camera.position.z = 6;

//ANIMATION LOOP
const animate = function() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    sphere.rotation.y += 0.001;
  }

  overlaySphere.rotation.y = sphere.rotation.y;

  renderer.render(scene, camera);
  container.appendChild(renderer.domElement);
};

animate();