import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '@app/items/shared/item.model';
import { ItemService } from '@app/items/shared/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
})
export class ItemCreateComponent implements OnInit {
  modalReference: NgbModalRef;

  itemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.pattern('^0$|^[1-9][0-9]*$')]],
      description: [''],
    });

    this.itemForm.valueChanges.subscribe((form) => {
      if (form.price) {
        this.itemForm.patchValue(
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

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(): void {
    const price = this.itemForm.value.price.replace(/\$|,/g, '');
    this.itemService.add({ ...this.itemForm.value, price } as Item).subscribe(
      (item) => {
        this.modalReference.close();
        this.itemForm.reset();
      },
      (err) => console.log(err)
    );
  }
}
