import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  tableDetails: any;
  tableFloat: any;
  tableData: any = [
    { name: '2', cashIn: 20, cashOut1000: 40, cashOut100: 10, cashOut500: 200 },
    { name: '2', cashIn: 20, cashOut1000: 40, cashOut100: 10, cashOut500: 200 },
    { name: '2', cashIn: 20, cashOut1000: 40, cashOut100: 10, cashOut500: 200 },
  ];

  // Datatable variables
  ColumnMode = ColumnMode;
  selected = [];

  constructor(
    private toast: ToastService,
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private dataService: DataService,
    public authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    if (!localStorage.getItem('table')) {
      this.navCtrl.navigateRoot('/table-selection', {
        animationDirection: 'back',
      });
      return;
    }
    this.tableDetails = JSON.parse(localStorage.getItem('table'));
    console.log(this.tableDetails);
    this.getTableData();
    this.getFloat();
  }

  doRefresh(event) {
    event.target.complete();
  }

  getTableData() {
    this.dataService.getLastDrop(this.tableDetails.id).subscribe((resp) => {
      this.tableData = resp;
    });
  }

  getFloat() {
    this.dataService.getFloat(this.tableDetails.id).subscribe((resp) => {
      this.tableFloat = resp;
      console.log(this.tableFloat);
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  deleteTransaction(item) {
    this.dataService.deleteTransaction(item.id).subscribe(
      (resp) => {
        this.toast.success('Deleted successfully');
        // this.getTransactionPending();
      },
      () => {
        this.toast.danger('Something went wrong');
      }
    );
  }
}
