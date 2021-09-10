import { Component, Input, OnInit } from '@angular/core';

import { Item } from '@app/items/shared/item.model';
import { ItemService } from '@app/items/shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];

  // pagination params
  readonly pageSize = 5;
  collectionSize = 0;
  page = 1;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.get().subscribe(
      (pagination) => {
        this.items = pagination.data;
        this.collectionSize = pagination.total;
      },
      (err) => console.log(err)
    );
  }

  pageChange(page: number): void {
    this.itemService.get(page).subscribe(
      (pagination) => {
        this.items = pagination.data;
        this.collectionSize = pagination.total;
      },
      (err) => console.log(err)
    );
  }
}
