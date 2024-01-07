import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-conversions',
  templateUrl: './quick-conversions.component.html',
  styleUrls: ['./quick-conversions.component.css']
})
export class QuickConversionsComponent implements OnInit {
  @Input() conversions: { amount: number, result: number }[] = [];
  @Input() direction: 'quick' | 'reverse' = 'quick';

  constructor() {}
  ngOnInit(): void {

  }







}
