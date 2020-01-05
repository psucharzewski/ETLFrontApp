import { Component, OnInit,Output, EventEmitter, Input, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../api.service';
import { DataTableComponent } from '../data-table/data-table.component';
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
    this.transformFlag = false;
    this.loadFlag = false;
    this.raceFlag = false;
    this.personFlag = false;
    this.deleteFlag = false;
  }
  extractFlag:boolean;
  transformFlag:boolean;
  loadFlag:boolean;
  raceFlag:boolean;
  personFlag:boolean;
  deleteFlag:boolean;
  message: string = "Hello!"

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
      this.changeFlags();
    });

  }

  runTransform() {
    this.changeFlags();
    this.api.runTransform().subscribe(resp=>{
      console.log(resp);
      this.changeFlags();
    });
  }

  runSave(){

  }
  writeRaceFiles() {
    this.changeFlags();
    this.api.writeRaceFiles().subscribe(resp=>{
    console.log(resp);
    this.changeFlags();
  });
  }

  writePersonFiles() {
    this.changeFlags();
    this.api.writePersonFiles().subscribe(resp=>{
      console.log(resp);
      this.changeFlags();
    });
  }

  deleteRaces() {
    this.changeFlags();
    this.api.deleteRaces().subscribe(resp=>{
      console.log(resp);
      this.changeFlags();
    });
  }
  constructor(private apiService:ApiService,private cdr: ChangeDetectorRef) { 
    this.api = apiService;
    this._cdr = cdr;
  }
}
