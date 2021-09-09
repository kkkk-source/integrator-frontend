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
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {}

  update(): void {}
}
