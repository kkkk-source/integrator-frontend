import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemsComponent } from '@app/items/items.component';
import { ItemListComponent } from '@app/items/item-list/item-list.component';
import { ItemCreateComponent } from '@app/items/item-create/item-create.component';

@NgModule({
  declarations: [ItemsComponent, ItemListComponent, ItemCreateComponent],
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  exports: [ItemsComponent, ItemListComponent],
})
export class ItemsModule {}
