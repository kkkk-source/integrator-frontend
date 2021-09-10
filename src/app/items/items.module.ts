import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemsComponent } from '@app/items/items.component';
import { ItemListComponent } from '@app/items/item-list/item-list.component';
import { ItemCreateComponent } from '@app/items/item-create/item-create.component';

@NgModule({
  declarations: [ItemsComponent, ItemListComponent, ItemCreateComponent],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [ItemsComponent, ItemListComponent],
  providers: [CurrencyPipe],
})
export class ItemsModule {}
