export const commaDecimal = (value : number | null) : string => {
    if (value === null || Number.isNaN(value)) return '';
    return value.toLocaleString().replace(/\.0+$/, '');
  };
  
  /**
   * 소수 몇번째 짜리까지 표현
   */
  export const fixedRound = (value : number, places : number) : number => {
    const multiplier = 10 ** places;
    return Math.round(value * multiplier) / multiplier;
  };
  
  /**
   * 자릿수 만큼 앞에 0 채우기
   */
  export const fillZero = (width : number, str : number | string) : string => {
    str = String(str);
    return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
  };
  
  /**
   * start 부터 end 까지 count 애니메이션 처리
   */
  
  export const countAni = (start : number, end : number, callback : ({start, end} : {start : number, end : number}) => any) => {
    const values = { start, end };
    const countInterval = setInterval(() => {
      if (values.start === values.end) clearInterval(countInterval);
      else values.start += 1;
      if (callback) callback(values);
  
    }, 1000 / (values.end - values.start));
    return countInterval;
  };
  
  /**
   * @description 숫자를 받아서 해당 digit 만큼 number 를 만들어 준다.
   * @example (1, 3) -> '001'
   */
  export const makeDigitStrNum = (number : number | string, digit : number) : string => {
    let answer = `${number}`;
    const count = digit - answer.length;
    for (let i = 0; i < count; i++) answer = '0' + answer;
    return answer;
  };
  
  /**
   * @description 숫자를 한글로 읽어서 반환
   */
  export const readNumberAsKorean = (number : number | string) : string => {
    let n = Number(number);
    if (Number.isNaN(n)) return '';
    n = Math.floor(n);
    if (n === 0) return '영';
    const phonemic = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const unit = ['', '', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조'];
  
    let ret = '';
    let p;
    const part : any[] = [];
    for (let x = 0; x < String(n).length; x += 1) part[x] = String(n).substring(x, x + 1);
    for (let i = 0, cnt = String(n).length; cnt > 0; cnt -= 1, i += 1) {
      p = phonemic[part[i]];
      p += p ? (cnt > 4 && phonemic[part[i + 1]]) ? unit[cnt].substring(0, 1) : unit[cnt] : '';
      ret += p;
    }
    return ret.replace(/일([십백천])/g, '$1');
  }
  