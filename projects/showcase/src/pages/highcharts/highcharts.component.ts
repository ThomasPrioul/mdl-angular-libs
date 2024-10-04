import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding } from '@angular/core';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards';
import DataGrid from '@highcharts/dashboards/datagrid';
import LayoutModule from '@highcharts/dashboards/modules/layout';
import { DarkModeService } from 'mdl-angular/dark';

LayoutModule(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highcharts.component.html',
  styleUrl: './highcharts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighchartsComponent {
  private readonly isAsync = true;

  private options: Dashboards.Board.Options = {};

  constructor(
    public elementRef: ElementRef,
    private darkModeService: DarkModeService,
  ) {}

  @HostBinding('class.highcharts-dark') private get isDarkHighcharts() {
    return this.darkModeService.applyDark();
  }

  @HostBinding('class.highcharts-light') private get isLightkHighcharts() {
    return !this.darkModeService.applyDark();
  }

  public ngOnInit() {
    this.setOptions();
    this.renderDashboard();
  }

  private renderDashboard() {
    Dashboards.board(this.elementRef.nativeElement, this.options, this.isAsync);
  }

  private setOptions() {
    this.options = {
      dataPool: {
        connectors: [
          {
            id: 'micro-element',
            type: 'JSON',
            options: {
              firstRowAsNames: false,
              columnNames: ['Food', 'Vitamin A', 'Iron'],
              data: [
                ['Beef Liver', 6421, 6.5],
                ['Lamb Liver', 2122, 6.5],
                ['Cod Liver Oil', 1350, 0.9],
                ['Mackerel', 388, 1],
                ['Tuna', 214, 0.6],
              ],
            },
          },
        ],
      },
      editMode: {
        enabled: true,
        contextMenu: {
          enabled: true,
          items: ['editMode'],
        },
      },
      gui: {
        layouts: [
          {
            rows: [
              {
                cells: [
                  {
                    id: 'kpi-wrapper',
                    layout: {
                      rows: [
                        {
                          cells: [
                            {
                              id: 'kpi-vitamin-a',
                            },
                            {
                              id: 'kpi-iron',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    id: 'dashboard-col-0',
                  },
                  {
                    id: 'dashboard-col-1',
                  },
                ],
              },
              {
                cells: [
                  {
                    id: 'dashboard-col-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      components: [
        {
          type: 'KPI',
          renderTo: 'kpi-vitamin-a',
          value: 900,
          valueFormat: '{value}',
          title: 'Vitamin A',
          subtitle: 'daily recommended dose',
        },
        {
          type: 'KPI',
          renderTo: 'kpi-iron',
          value: 8,
          title: 'Iron',
          valueFormat: '{value}',
          subtitle: 'daily recommended dose',
        },
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: 'micro-element',
            columnAssignment: [
              {
                seriesId: 'Vitamin A',
                data: ['Food', 'Vitamin A'],
              },
            ],
          },
          renderTo: 'dashboard-col-0',
          type: 'Highcharts',
          chartOptions: {
            xAxis: {
              type: 'category',
              accessibility: {
                description: 'Groceries',
              },
            },
            yAxis: {
              title: {
                text: 'mcg',
              },
              plotLines: [
                {
                  value: 900,
                  zIndex: 7,
                  dashStyle: 'ShortDash',
                  label: {
                    text: 'RDA',
                    align: 'right',
                    style: {
                      color: '#B73C28',
                    },
                  },
                },
              ],
            },
            credits: {
              enabled: false,
            },
            plotOptions: {
              series: {
                marker: {
                  radius: 6,
                },
              },
            },
            legend: {
              enabled: true,
              verticalAlign: 'top',
            },
            chart: {
              animation: false,
              type: 'column',
              spacing: [30, 30, 30, 20],
            },
            title: {
              text: '',
            },
            tooltip: {
              valueSuffix: ' mcg',
              stickOnContact: true,
            },
            lang: {
              accessibility: {
                chartContainerLabel: 'Vitamin A in food. Highcharts Interactive Chart.',
              },
            },
            accessibility: {
              description: `The chart is displaying the Vitamin A amount in
                  micrograms for some groceries. There is a plotLine demonstrating
                  the daily Recommended Dietary Allowance (RDA) of 900
                  micrograms.`,
              point: {
                valueSuffix: ' mcg',
              },
            },
          },
        },
        {
          renderTo: 'dashboard-col-1',
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: 'micro-element',
            columnAssignment: [
              {
                seriesId: 'Iron',
                data: ['Food', 'Iron'],
              },
            ],
          },
          type: 'Highcharts',
          chartOptions: {
            xAxis: {
              type: 'category',
              accessibility: {
                description: 'Groceries',
              },
            },
            yAxis: {
              title: {
                text: 'mcg',
              },
              max: 8,
              plotLines: [
                {
                  value: 8,
                  dashStyle: 'ShortDash',
                  label: {
                    text: 'RDA',
                    align: 'right',
                    style: {
                      color: '#B73C28',
                    },
                  },
                },
              ],
            },
            credits: {
              enabled: false,
            },
            plotOptions: {
              series: {
                marker: {
                  radius: 6,
                },
              },
            },
            title: {
              text: '',
            },
            legend: {
              enabled: true,
              verticalAlign: 'top',
            },
            chart: {
              animation: false,
              type: 'column',
              spacing: [30, 30, 30, 20],
            },
            tooltip: {
              valueSuffix: ' mcg',
              stickOnContact: true,
            },
            lang: {
              accessibility: {
                chartContainerLabel: 'Iron in food. Highcharts Interactive Chart.',
              },
            },
            accessibility: {
              description: `The chart is displaying the Iron amount in
                  micrograms for some groceries. There is a plotLine demonstrating
                  the daily Recommended Dietary Allowance (RDA) of 8
                  micrograms.`,
              point: {
                valueSuffix: ' mcg',
              },
            },
          },
        },
        {
          renderTo: 'dashboard-col-2',
          connector: {
            id: 'micro-element',
          },
          type: 'DataGrid',
          sync: {
            highlight: true,
            visibility: true,
          },
        },
      ],
    };
  }
}