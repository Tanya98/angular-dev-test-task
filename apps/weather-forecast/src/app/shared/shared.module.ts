import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { ToasterService } from './services';

const PROVIDERS = [ToasterService];
const COMPONENTS = [];
const PIPES = [];

@NgModule({
  imports: [MaterialModule],
  exports: [MaterialModule],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...PROVIDERS],
})
export class SharedModule {}
