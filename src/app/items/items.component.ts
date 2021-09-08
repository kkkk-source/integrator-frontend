import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Item } from '@app/items/shared/item.model';
import { ItemService } from '@app/items/shared/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  createItemForm = this.formBuilder.group({
    name: '',
    description: '',
    price: 0,
  });

  constructor(private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {}

  onSubmit(): void {
    console.warn('You order has been submitted', this.createItemForm.value);
    this.itemService.add({ ...this.createItemForm.value } as Item).subscribe((item) => {
      this.createItemForm.reset();
    });
  }
}
