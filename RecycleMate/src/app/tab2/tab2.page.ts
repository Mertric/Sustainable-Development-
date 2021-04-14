import RecyclableDescriptions from '../../assets/recyclableDetails.json';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RecyclingSymbolDescription } from '../model/recycling-symbol-description';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public toDisplay: RecyclingSymbolDescription = null;

  arrayOfImages: any;

  constructor() {
    this.arrayOfImages = RecyclableDescriptions.RecyclableDescriptions;
  }

  setDisplayBySymbolValue(value: number): void {
    this.toDisplay = RecyclableDescriptions.RecyclableDescriptions[value];
    console.log(this.toDisplay);
  }
  scroll(id) {
    const itemToScrollTo = document.getElementById('symbolImage-' + id);
    // null check to ensure that the element actually exists
    if (itemToScrollTo) {
      itemToScrollTo.scrollIntoView(true);
    }
  }
}
