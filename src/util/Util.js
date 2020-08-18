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
}

export default Util;
