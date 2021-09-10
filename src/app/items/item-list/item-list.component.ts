import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '@app/items/shared/item.model';
import { ItemService } from '@app/items/shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  itemToDelete: Item;

  // pagination params
  readonly pageSize = 5;
  collectionSize = 0;
  page = 1;

  constructor(private modalService: NgbModal, private itemService: ItemService) {}

  ngOnInit() {
    this.fetchItemsPaginatedAt(this.page);
  }

  pageChange(page: number): void {
    this.fetchItemsPaginatedAt(page);
  }

  open(content, index: number) {
    this.itemToDelete = this.items[index];

    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result) => {
        this.itemService.remove({ ...this.itemToDelete }).subscribe(
          (_) => this.fetchItemsPaginatedAt(this.page),
          (err) => console.log(err)
        );
      },
      (reason) => {}
    );
  }

  private fetchItemsPaginatedAt(page: number): void {
    this.itemService.get(page).subscribe(
      (pagination) => {
        this.items = pagination.data;
        this.collectionSize = pagination.total;
      },
      (err) => console.log(err)
    );
  }
}
