import { Component, OnInit, Inject } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  pendingResult = false;
  resultAvailable = null;
  configData=null;
  availableFiles = [];
  selectedOption= "";
  selectingGraph=true;

  settingsOpen=false;
  addingEntry=false;
  pendingAddEntry=false;
  newExcel="beispiel.xlsx";
  newPython="script.py";

  isDeleteMode=false;
  pendingDelete=false
  displayedColumns: string[] = ['excel', 'py','id'];

  constructor(private backend: BackendService){}

  ngOnInit() {
    this.backend
    .getFiles()
    .subscribe(availableFiles => this.availableFiles = availableFiles);
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
    if (this.settingsOpen) {
      this.getConfigData();
    }
  }

  getConfigData() {
    this.backend.getConfig().subscribe(config => {
      this.configData = config;
    });
  }

  deleteBinding(id: number) {
    this.pendingDelete = true;
    this.backend.deleteConfig(id.toString()).subscribe(result => {
      this.pendingDelete = false;
      this.isDeleteMode = false;
      console.log("deleted entry ", id);
      this.getConfigData();
    });
  }

  entryMode() {
    this.addingEntry = true;
  }

  removeMode() {
    this.isDeleteMode=true;
  }

  submitEntry() {
    // generate new ID based on last entry +1
    console.log("submitted entry")
    this.pendingAddEntry = true;
    this.backend
    .newConfig((parseInt(this.configData[this.configData.length - 1]["id"])+1).toString(),this.newExcel, this.newPython)
    .subscribe(result=>{
      this.addingEntry = false;
      this.pendingAddEntry = false;
      this.getConfigData();
    })
  }

  selectFile() {
    if (this.selectedOption){
      this.pendingResult = true;
      this.backend
    .getGraphData(this.selectedOption).subscribe(result=> {
      this.selectingGraph = false;
      console.log("should minimize!");
      this.resultAvailable = JSON.stringify(result);
      this.pendingResult = false;
      
    });
    }
  }

  selectOption(id: number) {
    console.log(this.selectedOption)
    this.resultAvailable = null;
    this.pendingResult= false;
  }
}
