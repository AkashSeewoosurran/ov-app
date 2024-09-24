import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { mvpPlayer } from 'src/app/shared/models/playerInfo.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';

@Component({
  selector: 'app-mvp-overlay',
  templateUrl: './mvp-overlay.component.html',
  styleUrls: ['./mvp-overlay.component.scss'],
})
export class MvpOverlayComponent implements AfterViewInit {
  options: EChartsOption = {
    radar: {
      indicator: [
        { name: 'DAMAGE', max: 2000 },
        { name: 'ELIMS', max: 10 },
        { name: 'DAMAGE TAKEN', max: 1000 },
        { name: 'SURVIVAL TIME', max: 40 },
        { name: 'ASSISTS', max: 5 },
        { name: 'KNOCKOUTS', max: 5 },
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(9, 13, 64)', // Color of the axis lines
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgb(195, 48, 148)', // Color of the split lines
        },
      },
      axisName: {
        rich: {
          value: {
            fontSize: 48,
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'oswald-bold',
          },
          label: {
            fontSize: 14,
            color: '#fff',
            fontFamily: 'oswald-bold',
          },
        },
      },
      splitNumber: 0,
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [1, 1, 1, 1, 1, 1],
          },
        ],
        lineStyle: {
          color: 'rgb(255, 255, 255)', // Color of the radar line
        },
        itemStyle: {
          color: 'rgb(195, 48, 148)', // Color of the dots
        },
      },
    ],
  };

  mergeOptions: EChartsOption;
  mvpStats: mvpPlayer;

  constructor(private service: PubgmDataService) {}

  ngAfterViewInit(): void {
    this.service.getMvpPlayer(1).subscribe((res: mvpPlayer[]) => {
      if (res.length > 0) {
        const player = res[0];
        this.mvpStats = player;
        const indicators = [
          { name: `{value|${player.damage}}\n{label|DAMAGE}`, max: 2000 },
          { name: `{value|${player.killNum}}\n{label|ELIMS}`, max: 10 },
          {
            name: `{value|${player.inDamage}}\n{label|DAMAGE TAKEN}`,
            max: 1000,
          },
          {
            name: `{value|${parseFloat(
              player.survivalTime.replace(':', '.')
            )}}\n{label|SURVIVAL TIME}`,
            max: 40,
          },
          { name: `{value|${player.assists}}\n{label|ASSISTS}`, max: 5 },
          { name: `{value|${player.knockouts}}\n{label|KNOCKOUTS}`, max: 5 },
        ];

        this.mergeOptions = {
          radar: {
            indicator: indicators,
          },
          series: [
            {
              data: [
                {
                  value: [
                    player.damage,
                    player.killNum,
                    player.inDamage,
                    parseFloat(player.survivalTime.replace(':', '.')),
                    player.assists,
                    player.knockouts,
                  ],
                },
              ],
            },
          ],
        };
      }
    });
  }
}
