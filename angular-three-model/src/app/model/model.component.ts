import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three"
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {


  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public rotationSpeedZ: number = 0.01;
  @Input() public size: number = 200;
  //@Input() public texture: string = "/assets/wall-white.jpg";
  @Input() public src: string = "/assets/robot";

  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  private ambientLight!:     THREE.AmbientLight;
  private light1!      :     THREE.PointLight;
  private light2!      :     THREE.PointLight;
  private light3!      :     THREE.PointLight;
  private light4!      :     THREE.PointLight;
  private directionalLight!: THREE.DirectionalLight;
  
  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();

  private loaderGLTF = new GLTFLoader();

  private model!: any;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };

  private createScene() {
    //* Scene
    this.scene =  new THREE.Scene;
    this.scene.background = new THREE.Color(0xd4d4d8);
    this.loaderGLTF.load(this.src+'/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
    
    //* Camera
    let aspectRatio = this.getAspectRatio();
    this .camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )

    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  animateModel() {
    if (this.model){
      this.model.rotation.z += this.rotationSpeedZ;
    }
    //this.model.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop() {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ModelComponent = this;
    (function render() {
      component.animateModel();
      component.renderer.render(component.scene, component.camera);
      requestAnimationFrame(render);
    }());
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
