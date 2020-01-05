import { Component, OnInit,Output, EventEmitter, Input, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../api.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { Statistic } from '../model/statistic';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  api:ApiService;
  _cdr:ChangeDetectorRef;
  @Input()
  tableref:DataTableComponent;

  ngOnInit() {
    this.extractFlag = false;
    this.transformFlag = true;
    this.loadFlag = true;
    this.raceFlag = false;
    this.personFlag = true;
    this.deleteFlag = false;
  }
  extractFlag:boolean;
  transformFlag:boolean;
  loadFlag:boolean;
  raceFlag:boolean;
  personFlag:boolean;
  deleteFlag:boolean;
  message: string = "Hello!"
  stat:Statistic;

  @Output() messageEvent = new EventEmitter<string>();

  loadRaces() {
    this.changeFlags();
    this.api.runLoad().subscribe(resp=>{
      console.log(resp);
      this.tableref.loadRacesInTable();
      this.changeFlags();
    })
  }

  changeFlags(){
    this.extractFlag = !this.extractFlag;
    this.transformFlag = !this.transformFlag;
    this.loadFlag = !this.loadFlag;
    this.raceFlag = !this.raceFlag;
    this.personFlag = !this.personFlag;
    this.deleteFlag = !this.deleteFlag;
  }
  runExtract() {
    this.changeFlags();
    this.api.runExtract().subscribe(resp=>{
      console.log(resp);
      this.stat= resp;
      alert(this.stat.stage + this.stat.info);
      this.changeFlags();
      this.transformFlag = false;
      this.personFlag = false;
    });

  }

  runTransform() {
    this.changeFlags();
    this.api.runTransform().subscribe(resp=>{
      console.log(resp);
      this.stat= resp;
      alert(this.stat.stage + this.stat.info);
      this.changeFlags();
      this.loadFlag = false;
    });
  }


  writeRaceFiles() {
    this.changeFlags();
    this.api.writeRaceFiles().subscribe(resp=>{
      console.log(resp);
      this.stat= resp;
      alert(this.stat.stage + this.stat.info);
      this.changeFlags();
  });
  }

  writePersonFiles() {
    this.changeFlags();
    this.api.writePersonFiles().subscribe(resp=>{
      console.log(resp);
      this.stat= resp;
      alert(this.stat.stage + this.stat.info);
      this.changeFlags();
    });
  }

  deleteRaces() {
    this.changeFlags();
    this.api.deleteRaces().subscribe(resp=>{
      console.log(resp);
      this.changeFlags();
      alert("Removed all data from database");
    });
  }
  constructor(private apiService:ApiService,private cdr: ChangeDetectorRef) { 
    this.api = apiService;
    this._cdr = cdr;
  }
}
