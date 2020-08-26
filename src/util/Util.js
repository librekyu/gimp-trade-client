import React from 'react';

class Util {
  /**
   * 자릿수를 입력 받아 랜덤 id 생성
   * @author kimhg
   * @param {Int} length
   * @return {String}
   */
  static makeRandomID = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  /**
   * 차트 내의 최대 값을 구한다.
   * @param {Array} dataArray
   * */
  static getMaxValueInChart = (dataArray) => {
    const maxChartData
      = dataArray.length > 0 && Math.max.apply(null, dataArray) > 100 && Math.max.apply(null, dataArray)
      || dataArray.length > 0 && Math.max.apply(null, dataArray);
    // 자릿수 구함
    const maxChartDataLength = maxChartData.toString().length;
    const roundsNum = Math.pow(10, maxChartDataLength - 1);

    const maxValue = Math.ceil(maxChartData / (roundsNum)) * (roundsNum);

    const stepSize = maxValue / 4;

    return {
      maxValue: maxChartData,
      stepSize
    };
  };

  /**
   * gimp data를 Chart에 넣을 데이터로 변경한다. (하나의 데이터만 출력하는 용도)
   * @param {Array} gimpDataArray
   * @return {Object} convertedGimpData
   * */

  static convertGimpDataToChartData = (gimpDataArray) => {
    const convertedGimpData = {
      labels: [],
      datasets: [{
        data: []
      }],
    };

    gimpDataArray.map((gimpData) => {
      convertedGimpData.labels.push(gimpData.datetime || '');
      convertedGimpData.datasets[0].data.push(gimpData.fixed_gimp || '');
    });

    return convertedGimpData;
  };
}

export default Util;
