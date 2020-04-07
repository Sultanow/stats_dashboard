import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'frontend';
  pendingResult = false;
  resultAvailable = null;
  availableFiles = [];
  selectedOption= "";

  constructor(private backend: BackendService){}

  ngOnInit() {
    this.backend
    .getFiles()
    .subscribe(availableFiles => this.availableFiles = availableFiles);
  }

  selectFile() {
    this.pendingResult = true;
    if (this.selectedOption){
      console.log("submitting...")

      this.backend
    .getGraphData(this.selectedOption).subscribe(result=> {
      this.resultAvailable = JSON.stringify(result);
      this.pendingResult = false;
      
    });
    }
    
  }

  selectOption(id: number) {
    console.log(this.selectedOption)
    this.resultAvailable = null;
  }
}
