import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  test: number[] = [1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  }

}
