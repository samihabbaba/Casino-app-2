import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.page.html',
  styleUrls: ['./table-selection.page.scss'],
})
export class TableSelectionPage implements OnInit {
  tables: any[] = [];
  constructor(
    private dataService: DataService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.getTables();
  }

  ionViewWillEnter() {}

  getTables() {
    this.dataService.getTables().subscribe((resp) => {
      this.tables = resp;
    });
  }

  handleTableClick(table) {
    if (!table.isActive) {
      this.toast.dark('Select an active table');
      return;
    }
    if (localStorage.getItem('table')) {
      localStorage.removeItem('table');
    }
    localStorage.setItem('table', JSON.stringify(table));
    this.navCtrl.navigateRoot('/', { animationDirection: 'forward' });
    // console.log(table);
  }
}
