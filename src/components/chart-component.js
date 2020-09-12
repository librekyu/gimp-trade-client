import React, { useCallback, useEffect, useState, memo } from 'react';
import ChartComponent from 'react-chartjs-2';
import Util from '../util/Util';
import CONST from '../common/globalConst';
import Hammer from "hammerjs";
import 'chartjs-plugin-datalabels';
import * as Zoom from "chartjs-plugin-zoom";
import DownsamplePlugin from 'chartjs-plugin-downsample';

const COMMON_CHART_OPTION = {
  downsample: {
    enabled: true,
    threshold: 1000,
    // auto: true,
    // onInit: true,
    //
    // // if true, replaces the downsampled data with the original data after each update
    // restoreOriginalData: true,
    // // if true, downsamples original data instead of data
    // preferOriginalData: false,
    //
    // //if not undefined and not empty, indicates the ids of the datasets to downsample
    // targetDatasets: [],
  },
  maintainAspectRatio: false, // 차트 비율 유지
  responsive: true,
  elements: {
    line: {
      tension: 0,             // 차트 각지게
      fill: false,
      stepped: false,
      borderDash: []
    },
  },
  layout: {
    padding: {
      right: 30,              // 맨 우측 데이터가 차트 영역밖으로 나가서 데이터 값 안보이는 것을 방지하기 위한 옵션
    },
  },
  pan: {
    enabled: true,
    //   },
    mode: 'x',

    rangeMin: {
      // Format of min pan range depends on scale type
      x: null,
      y: null
    },
    rangeMax: {
      // Format of max pan range depends on scale type
      x: null,
      y: null
    },

    // On category scale, factor of pan velocity
    speed: 50,

    // Minimal pan distance required before actually applying pan
    threshold: 100,

    // Function called while the user is panning
    onPan: function ({chart}) {
      console.log(`I'm panning!!!`);
    },
    // Function called once panning is completed
    onPanComplete: function ({chart}) {
      console.log(`I was panned!!!`);
    }
  },
  zoom: {             // 확대/축소 옵션 (스크롤)
    enabled: true,
    drag: false,
    mode: "x",
    speed: 0.01,
    threshold: 1,
    sensitivity: 1,

    // 표시할 최소 값
    rangeMin: {
      x: null,
      y: null,
    },
    // 표시할 최대 값
    rangeMax: {
      x: null,
      y: null,
    },
    onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
    onZoomComplete: function (myChart) {
      console.log(myChart);
      // myChart.chart.resetZoom();
    }
  },
  plugins: {                  // chartjs-plugin-datalabels 플러그인 설치 (차트 데이터 표기 위한 플러그인)
    datalabels: {
      display: 'auto',
      color: 'black',
      anchor: 'end',
      align: 'start',
      offset: -18, // 그래프 위의 상단데이터 위치
    },

  },
  legend: {
    display: false, // 각 그래프에 대한 범례. 클릭에 따라 표시 될지 안될지가 결정된다.
    // align: 'start',
    position: 'top',
    margins: {
      top: -10
    }
  },
  tooltips: {
    // tooltip box 내부에 같은 x축에 있는 데이터를 모두 표시해주는 옵션. 이 옵션을 활성화 하면 여러개의 차트에 같은 x 축 선택시, 다른 차트 데이터를 구분할 수 있다.
    // mode: 'label',
    custom: function (tooltip) {
      if (!tooltip) return;
      tooltip.displayColors = false;    // tooltip 맨 앞에 컬러박스 보여지는 것 여부
    },
  },
  dataset: {
    maxBarThickness: 50
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: false,
      },
      ticks: { // y축 간격
        beginAtZero: true,      // 데이터 0부터 시작하는지 여부
      },
      gridLines: {
        drawOnChartArea: false, // grid 선 보임, 안보임
      }
    }],
    xAxes: [
      {
        maxBarThickness: 50,
        afterTickToLabelConversion: function (scaleInstance) {
          // console.log(scaleInstance);
          // 첫번째 라벨 안보이도록 함.
          // scaleInstance.ticks[0] = null;
        },
        id: 'first-x-axis',
        ticks: {
          autoSkip: false,
          min: 30,
          // display: false
        },
        // barPercentage: 0.3,
        gridLines: {
          display: false,
          drawOnChartArea: false,
          tickMarkLength: 20
        }
      }]
  },
  animation: false,
  hover: {
    animationDuration: 0 // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 0, // animation duration after a resize

};

/**
 * 공통 차트 컴포넌트
 * @param type : {string} - 차트 타입 [bar | line]
 * @param height: {number} - 차트 높이
 * @param unit: {string} - 단위 (좌측)
 * @param chartData : {Object} - 차트 데이터 (API 를 통해 주는 객체 자체)
 *  {
 *    @param labels: {Array} - x 축에 표시될 라벨들
 *    @param datasets: {Array} - 데이터 묶음
 *      {
 *        @param tooltip : {Array} - 마우스 올렸을 때 표시될 라벨들
 *        @param data: {Array} - 실제 데이터
 *      }
 *    @param colors: {Array} - 2차원 배열. 각 datasets 별 색깔 표시.
 *    @param customLegendLabels : {Array} - 각 범례에 표시 될 이름. datasets 배열 길이와 같아야 함.
 *     @param customXLabels : {Array} - x 축에 커스터마이징한 라벨들
 *  }
 * @param chartOptions : {Object} - 차트 옵션
 * */
const CommonChart = (
  {
    type = 'bar',
    height = 200,
    unit = '',
    chartData,
    chartOptions = COMMON_CHART_OPTION,
  }) => {

  const [_chartData, _setChartData] = useState(chartData);
  const [_chartOption, _setChartOption] = useState({ ...COMMON_CHART_OPTION, ...chartOptions });

  const datasetKeyProvider = useCallback((dataSet) => (dataSet.label || Util.makeRandomID(3)), []);

  useEffect(() => {
    // ChartComponent.plugins.register(DownSamplePlugin);
  }, []);

  /** chartData에 대한 useEffect */
  useEffect(() => {
    const _datas = [];
    let _config = COMMON_CHART_OPTION;

    /**
     * datasets 에서 최대 값 찾기.
     * datasets 배열에서 모든 데이터를 찾아 dataArray 에 넣고 그 중 최대 값을 구하고,
     * dataset 개수가 여러개 이면 범례를 표기하도록 한다.
     *  */
    const dataArray = [];
    
    chartData
    && chartData.datasets
    && Array.isArray(chartData.datasets)
    && chartData.datasets.map((dataset) => {
      dataset.data.map((singleData) => {
        dataArray.push((singleData));
      });
    });
    const maxValueStepSize = Util.getMaxValueInChart(dataArray);
    /**
     * 100 이하 일때는 chart.js가 maxValue 처리 안해줌
     * 예.
     * */
    _config.scales.yAxes[0].ticks.max =
      maxValueStepSize.maxValue <= 10 && Math.ceil(maxValueStepSize.maxValue + 1)      // 10 이하의 소수점 일 때,
      || maxValueStepSize.maxValue <= 100 && Math.ceil((maxValueStepSize.maxValue + 5) / 10) * 10  // 11 이상 100 이하 일 때,
      || maxValueStepSize.maxValue <= 1000 && Math.ceil((maxValueStepSize.maxValue + 50) / 100) * 100  // 101 이상 100 이하 일 때,
      || undefined;                                                         // 100 이상 일때
    // _config.scales.yAxes[0].ticks.stepSize = maxValueStepSize.maxValue < 10 && 1 || undefined;
    _config = {
      ..._config, ...{
        legend: {
          display: (chartData && chartData.datasets && Array.isArray(chartData.datasets) && chartData.datasets.length > 1),
          align: 'start',
        }
      }
    };

    /** dataset 에서 tooltip 배열 있으면 옵션에 tooltip 넣기 및 tooltip 표기 관련 옵션 적용 */
    _config = {
      ..._config,
      ...{
        tooltips: {
          ..._config.tooltips,
          /** tooltip Title */
          callbacks: {
            // title: function(tooltipItems, data){
            //   console.log(tooltipItems, data);
            //   return 'tooltipTitle';
            // },
            /** tooltip Label */
            label: (tooltipItem, data) => {
              try {
                const tooltipArray = [];
                const splitTooltipLabel
                  = chartData
                  && chartData.datasets
                  && chartData.datasets[tooltipItem.datasetIndex]
                  && chartData.datasets[tooltipItem.datasetIndex].tooltip
                  && chartData.datasets[tooltipItem.datasetIndex].tooltip[tooltipItem.index].split(' ');
                Array.isArray(splitTooltipLabel) && splitTooltipLabel.length > 0 && splitTooltipLabel.filter(tooltipItem => tooltipItem !== ':')
                  .map((tooltipItem) => {
                    tooltipArray.push(tooltipItem);
                  });
                return (
                  tooltipArray.length > 0 && tooltipArray
                  || chartData.datasets[tooltipItem.datasetIndex].data && chartData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                  || `${tooltipItem.label} - ${tooltipItem.value} ${unit}` || '');
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      }
    };

    if (unit) {
      _config.scales.yAxes[0].scaleLabel = {
        display: true,
        labelString: '단위 ' + unit
      };
    } else {
      _config.scales.yAxes[0].scaleLabel = {
        display: false
      };
    }
    /**
     * 데이터 별로 범례 라벨 및 색깔 선택
     *
     * fill: 라인 차트 밑에 색칠 여부
     * default 색 : 'rgba(2, 167, 240, 1)'
     * */
    chartData && chartData.datasets && Array.isArray(chartData.datasets)
    && chartData.datasets.map((item, index) => {
      _datas.push({
        ...item,
        label: chartData.customLegendLabels && chartData.customLegendLabels[index] || '',
        backgroundColor:
          (chartData.colors && Array.isArray(chartData.colors) && chartData.colors.length > 1 && chartData.colors[index])
          || (chartData.colors && Array.isArray(chartData.colors) && chartData.colors[0])
          || 'rgba(2, 167, 240, 1)',
        borderColor:
          (chartData.colors && Array.isArray(chartData.colors) && chartData.colors.length > 1 && chartData.colors[index])
          || (chartData.colors && Array.isArray(chartData.colors) && chartData.colors[0])
          || 'rgba(2, 167, 240, 1)',
        fill: false,
      });
    });

    /** 데이터 및 옵션 set. 추가 옵션에 customXLabels 배열이 있으면 x축을 customXLabels로 설정하고 아니면 기본으로 들어온 labels로 set을 한다. */
    _setChartData({
      ...chartData, ...{
        datasets: _datas,
        labels: chartData && (chartData.customXLabels || chartData.labels)
      }
    });
    _setChartOption(_config);
  }, [chartData, chartOptions]);

  /**
   * 차트 데이터 보여지는 조건
   * 1. 차트 데이터의 labels 가 배열이고, labels 배열의 길이가 1 이상.
   * 2. 차트 데이터의 datasets 가 배열이고, datasets 배열의 길이가 1 이상.
   * */
  return (
    <>
      {_chartData && Array.isArray(_chartData.labels) && _chartData.labels.length > 0
      && Array.isArray(_chartData.datasets) && _chartData.datasets.length > 0
        ? <ChartComponent
          type={type}
          data={_chartData}
          options={{..._chartOption}}
          datasetKeyProvider={datasetKeyProvider}
          height={height}
        />
        :
        <div style={{
          verticalAlign: 'middle',
          textAlign: 'center',
          lineHeight: (height || 100) / 2 + 'px'
        }}>{CONST.COMMON_MESSAGE.EMPTY_CHART_DATA_MESSAGE}</div>
      }
    </>

  );
};

export default CommonChart;
