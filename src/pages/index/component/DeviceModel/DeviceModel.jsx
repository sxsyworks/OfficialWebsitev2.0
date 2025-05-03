import { OssBaseUrl } from '@/utils/constant';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import styles from './index.less';

const DeviceModel = (props) => {
  let camera, scene, renderer;

  function init() {
    const container = document.getElementById(props.id);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1800);

    if (props.id === '3841') {
      camera.position.set(12, 10, 13);
    } else {
      camera.position.set(15, 15, 13);
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f6f6);
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0x848484);
    dirLight.position.set(-1000, 800, 1000);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    const container = document.getElementById(props.id);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  useEffect(() => {
    init();

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.target.set(0, 1, 0);

    // model
    const loader = new FBXLoader();
    const url = `${OssBaseUrl}/static/model/${props.id === '3841' ? '3841' : '3841hex'}.fbx`;
    loader.load(
      url,
      function (object) {
        // object.traverse((child) => {
        //   if (child instanceof THREE.Mesh) {
        //     if (child.material === undefined) {
        //       child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        //     }
        //   }
        // });
        scene.add(object);
      },
      // function (xhr) {
      //   console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      // },
      // function (error) {
      //   console.log('An error happened', error);
      // },
    );

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      // console.log('camare', camera.position);
    }

    animate();

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return <div id={props.id} style={{ height: '100%', width: '100%' }} className={styles.model}></div>;
};

export default DeviceModel;
