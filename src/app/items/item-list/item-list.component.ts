import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '@app/items/shared/item.model';
import { ItemService } from '@app/items/shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  @Output() itemsChange = new EventEmitter<Item[]>();

  itemEditForm: FormGroup;

  readonly pageSize = 5;
  collectionSize = 0;
  itemToDelete: Item;
  page = 1;

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.fetchItemsPaginatedAt(this.page);

    this.itemEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.pattern('^0$|^[1-9][0-9]*$')]],
      description: [''],
    });

    this.itemEditForm.valueChanges.subscribe((form) => {
      if (form.price) {
        this.itemEditForm.patchValue(
          {
            price: this.currencyPipe.transform(form.price.replace(/\D|^0+/g, ''), 'USD', 'symbol', '1.0-0'),
          },
          {
            emitEvent: false,
          }
        );
      }
    });
  }

  pageChange(page: number): void {
    this.fetchItemsPaginatedAt(page);
  }

  openRemovingModal(content, index: number) {
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

  openEditingModal(content, index: number) {
    const itemToEdit = this.items[index];

    this.itemEditForm.patchValue({
      name: itemToEdit.name,
      price: itemToEdit.price.toString(),
      quantity: itemToEdit.quantity,
      description: itemToEdit.description,
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        const price = this.itemEditForm.value.price.replace(/\$|,/g, '');
        this.itemService.update({ id: itemToEdit.id, ...this.itemEditForm.value, price: price } as Item).subscribe(
          (item) => {
            this.items[index] = item;
            this.itemsChange.emit(this.items);

            this.itemEditForm.reset();
            this.itemEditForm.patchValue({
              name: '',
              price: '',
              quantity: 0,
              description: '',
            });
          },
          (err) => console.log(err)
        );
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  private fetchItemsPaginatedAt(page: number): void {
    this.itemService.get(page).subscribe(
      (pagination) => {
        this.itemsChange.emit(pagination.data);
        this.collectionSize = pagination.total;
      },
      (err) => console.log(err)
    );
  }
}
