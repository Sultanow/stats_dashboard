import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';



declare var Plotly: any;

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  @Input() graphData: string;
  @ViewChild("Graph", { static: true })
  private Graph: ElementRef;

  name = 'Angular';

  basicChart() {
    const element = this.Graph.nativeElement;
    const data = JSON.parse(this.graphData)["traces"]
    const layout = {
      xaxis: {
        showline: true,
        showgrid:true,
        showticklabels: true,
        linewidth: 2,
        ticks: 'outside',
        tickfont: {
              family:'Arial',
              size:12,
        }
      },
      yaxis: {
        showgrid: true,
        zeroline: true,
        showline: true,
        showticklabels: true,
      },
      autosize: true,
      margin: {
          autoexpand: true,
          l:100,
          r:20,
          t:110,
      },
      showlegend: true
      }
      Plotly.newPlot(element, data, layout);
  }

  ngOnInit() { this.basicChart();console.log("Created chart")}

}
