import { ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { createObj3DProviderArray,NgxThreeModule } from 'ngx-three';
import { ThMesh } from 'ngx-three';
import { ThObject3D } from 'ngx-three';
import * as THREE from 'three';
import { BoxGeometry, MeshStandardMaterial } from 'three';


@Component({
  template: '',
  selector: 'th-box',
  moduleId: 'ThMesh',
  providers: createObj3DProviderArray(Box),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Box extends ThMesh implements OnInit {
  @Input() public newMaterial?: MeshStandardMaterial;
  constructor(@SkipSelf() parent: ThObject3D) {
    super(parent);
  }
  
  public override ngOnInit() {
    super.ngOnInit();
    if (this.objRef) {
      this.objRef.material = new MeshStandardMaterial({ color: 'green' });
      this.objRef.geometry = new BoxGeometry(1, 1, 1);
    }
  }

}

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerComponent implements OnInit {

  public material = new THREE.MeshStandardMaterial;
  constructor() {
    this.material.color.set('green');
    setInterval(() => {
      if (this.material.color.r !== 0) {
        this.material = new THREE.MeshStandardMaterial();
        this.material.color.set('green');
      } else {
        this.material = new THREE.MeshStandardMaterial();
        this.material.color.set('red');
      }
    }, 200);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public THREE = THREE;

  public box = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.5, 1.5, 1.5));
  public color = new THREE.Color(1, 0, 0);

  public rotation: [x: number, y: number, z: number] = [0, 0, 0];

  //public material = new THREE.MeshStandardMaterial();


  /*public start() {
    if(!this.active) {
        this.active = true;
        this.requestAnimationFrame();
    }
  }*/

  /*
  public requestAnimationFrame() {
    if (this.frameId === undefined) {
      this.ngZone.runOutsideAngular(
        () =>
          (this.frameId = requestAnimationFrame(() => {
            this.frameId = undefined;
            this.engineService.render();
            if(this.active) {
                this.requestAnimationFrame();
            }
          }))
      );
    }
  }
  */

  public selected = false;

  public onBeforeRender() {
    this.rotation = [0, this.rotation[2] + 0.01, this.rotation[2] + 0.01];
  }

  ngOnInit(): void {}
}
