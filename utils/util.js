const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/') ;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 计算日期是当年的第几周
var theWeekOfYear = function (curDate) {  
  /* 
   date1是当前日期 
   date2是当年第一天 
   d是当前日期是今年第多少天 
   用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
   */  
  var a = curDate.getFullYear();  
  var b = curDate.getMonth() + 1;  
  var c = curDate.getDate();  
 
  var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),  
      d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);  
  return Math.ceil(  
      (d + ((date2.getDay() + 1) - 1)) / 7  
  );  
};
// 判断是否同一天 ：
function isSameDay(timeStampA, timeStampB) {
  let dateA = new Date(timeStampA);
  let dateB = new Date(timeStampB);
  return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
}
// 判断是否同一周：
function isSameWeek(timeStampA, timeStampB) {
  let A = new Date(timeStampA).setHours(0, 0, 0, 0);
  let B = new Date(timeStampB).setHours(0, 0, 0, 0);
  var oneDayTime = 1000 * 60 * 60 * 24;
  var old_count = parseInt(A / oneDayTime);
  var now_other = parseInt(B / oneDayTime);
  return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}

// 思路1：获取到目前的时间，然后转化到今天的凌晨的时间点的毫秒数，然后再去拉取今天星期几，再往前推对应的天数，找到当前天数所在的周一的凌晨点毫秒数，比对之前存储的数值，相同的话就是同一周，处理。不同的话就说明不是同一周，再覆盖存储周一的值，再处理。

// 思路2：计算出 现在距离1970年1月1日的总天数，因为1970年1月1 是周4   所以（总天数+7）/7 取整 就是周数  如果相同就是同一周反之就不是。


// ##写了一个函数，传入年份，返回周数数组
export function setweekOption(year){//传入年份
    year=new Date(year).getFullYear()
    let days = getDay(year || new Date().getFullYear())
    let weeks = {};
    for (let i = 0; i < days.length; i++) {
      let weeksKeyLen = Object.keys(weeks).length;  
      let daySplit = days[i].split('_');
      if (weeks[weeksKeyLen] === undefined) {
        weeks[weeksKeyLen + 1] = [daySplit[0]]
      } else {
        if (daySplit[1] == '1') {
          weeks[weeksKeyLen + 1] = [daySplit[0]]
        } else {
          weeks[weeksKeyLen].push(daySplit[0])
        }
      }
    }
    let option= []
    let weeksKeyLen = Object.keys(weeks).length;
    for(let i = 1; i < weeksKeyLen+1; i++){
        let obj = {};
        obj.text = "第" + i + "周"+'('+weeks[i][0]+'-'+weeks[i][weeks[i].length-1]+')';
        console.log(year,typeof year,'year.substring(2)')
        obj.content=year.toString().substring(2) + '-'+ i.toString().padStart(2,'0')+'w';
        obj.value = i;
        obj.id=i;
        
        option.push(obj)

    }
    return option;
  }
  export function getDay(year) {
    let dates = [];
    for (let i = 1; i <= 12; i++) {
      for (let j = 1; j <= new Date(year, i, 0).getDate(); j++) {
        dates.push(formatNumber(i) + '/' + formatNumber(j) + '_' + new Date([year, formatNumber(i), formatNumber(j)].join('-')).getDay())//返回当年所有日期（带星期数）
      }
    }
    return dates;
  }


module.exports = {
  formatTime: formatTime,
  theWeekOfYear:theWeekOfYear,
  isSameWeek:isSameWeek,
  isSameDay:isSameDay,
  setweekOption
}
