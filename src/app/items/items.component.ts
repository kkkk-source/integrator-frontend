import { Component, OnInit, Type } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

import { Item } from '@app/items/shared/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private titleService: Title) {
    this.titleService.setTitle(`${this.titleService.getTitle()} | items`);
  }

  ngOnInit() {}
}
