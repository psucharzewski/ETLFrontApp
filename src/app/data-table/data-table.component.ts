import { AfterViewInit, Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { Race } from '../model/race';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Race>;
  dataSource: DataTableDataSource;
  api:ApiService;
  re:Race[] =[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','name','type','link','averageTime'];
  
  
  ngOnInit() {
    this.re = this.api.races;
    this.dataSource = new DataTableDataSource(this.re);
  }

  public loadRacesInTable(){
    this.childMessage ="RAz";
    this.api.getRaces().subscribe(resp=>{
      for (const data of resp.body) {
        this.re.push(data);
      }
      console.log(this.re);
      console.log("yes");
      this.api.updateRaces(this.re);
      this.dataSource = new DataTableDataSource(this.re);
      this.table.renderRows;
      this.ngAfterViewInit();
    });
 //   this.api.updateRaces(this.re);
//this.dataSource = new DataTableDataSource(this.re);
   // this.table.renderRows;
   // this.ngAfterViewInit();
  }
  @Input() childMessage: string;

  constructor(private apiService:ApiService) { 
    this.api = apiService;

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
