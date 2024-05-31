import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  @Input() responseData: any = [];
  @Input() config: any = {};
  @Output() actionHappens = new EventEmitter();
  @Output() updateList = new EventEmitter();
  columns: object[] = [];
  records: object[] = [];
  selectedField!: [];
  showOptions: boolean | undefined;
  products = [
    { code: '1223', name: 'raj', category: 'Accessories', quantity: '1' },
    { code: '1224', name: 'somesh', category: 'Accessories', quantity: '2' }
  ];
  cols!: Column[];
  UpdateValue() {
    this.updateList.emit(this.selectedField);
  }
  actionData(row: any, action: any): any {
    if (!action.func) {
      return action;
    }
    return action.func(row, action);
  }
  actionClick(type: string, data: any) {
    if (type === 'options') {
      this.showOptions = true;
    }
    this.actionHappens.emit({ type, data });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['responseData'] && changes['responseData'].currentValue) {
      // Handle the change in responseDate here
      this.records = this.responseData;
      // You can perform additional actions here if needed
    }
    if (changes['config'] && changes['config'].currentValue) {
      this.columns = this.config.columns;
    }
  }
  ngOnInit() {
      this.cols = this.config.columns;
      this.records = this.responseData;
  }
}
