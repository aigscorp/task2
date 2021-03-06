let shift = [];
let crr = [];

if(process.argv.length < 3){
  print();
  return;
}
let params = process.argv[2];
let data = "";
let N = 50;  // default for random  
const POWER = 5; 

if(params != "-r" && params != "-i"){
  print();
  return;
}
if(params == "-r"){
  let num = +process.argv[3] || N;
  N = Math.floor(num);
  for(let i = 0; i < N; i++){
    crr[i] = powerTwo(Math.floor(Math.floor(POWER * Math.random()) * Math.random())); 
  }
}else if(params == "-i"){
    let str = process.argv[3];
    if(str == undefined){
      print();
      return;
    }
    str = str.trim();
    data = str.replace('[','').replace(']','');
    let arrdata = data.split(',');
    for(let i = 0, len = arrdata.length; i < len; i++){
      let two = +arrdata[i];
      if(two % 2 == 0 || two == 1){
        crr[i] = +arrdata[i];
      }else{
        print();
        return;
      }
    }
}

let found = true;
console.log('input  =', crr.join(','));

while(found){
  for(let i = 0; i < crr.length; i++){
    if(crr[i] == crr[i + 1]){
      Incr = maxIncr(crr, i);
      Decr = maxDecr(crr, i+1);
      if(Incr.count == 0 && Decr.count == 0){
        let res = mono(crr, i);
        if(res){
          shift.push('left');
          crr.splice(i, res, res * crr[i]);
        }else{
          shift.push('right');
          deleteElement(crr, i, 'right');
        }
        found = true;
        break;
      } 
      if(Incr.count > Decr.count){
        shift.push('right');
        for(let j = 0; j <= Incr.count; j++){
          deleteElement(crr, Incr.index, 'right');
        }
      }else{
        shift.push('left');
        for(let j = Decr.count; j >= 0; j--){
          deleteElement(crr, Decr.index--, 'left');
        } 
      }
      found = true;
      break;
    }
    found = false;
  }
}
console.log('output =', crr.join(','));
console.log('shift: ', shift.join(','));
function deleteElement(arr, index, dir){// удаление элемента массива со сдвигом массива влево, вправо
  let left = [];
  let right = [];
  let val = arr[index];
  let len = arr.length;

  for(let i = 0; i < len; i++){
    if(i < index) left.push(arr[i]);
    if(i > index) right.push(arr[i]); 
  }
  if(dir == "left") left.push(left.pop() + val);
  if(dir == "right") right[0] += val;
  let all = left.concat(right);
  arr.pop();
  for(let i = 0; i < all.length; i++){
    arr[i] = all[i];
  }
};

function maxIncr(arr, index){ // поиск возрастающей последовательности элементов массива
  let res = 0;
  let count = 0;
  let val = arr[index]; 
  for(let i = index; i < arr.length-1; i++){
    if(arr[i] == arr[i+1] && arr[i+1] == val) continue;
    if(2 * arr[i] == arr[i+1]){
      res = i;
      count++;
      continue;
    }else{
      break;
    }
  }
  return {count: count, index: res - count};
};

function maxDecr(arr, index){ //поиск убывающей последовательности массива
  let res = 0;
  let count = 0;
  let val = arr[index];
  for(let i = index; i > 0; i--){
    if(arr[i-1] == arr[i] && arr[i] == val) continue;
    if(arr[i-1] / 2 == arr[i]){
      count++;
      res = i;
    }else{
      break;
    }
  }
  return {count: count, index: res + count};
};

function mono(arr, index){
  let count = 1;
  let val = arr[index];
  let len = arr.length;
  let next = 0;
  
  for(let i = index; i < len-1; i++){
    if(arr[i] == arr[i+1]){
      count++;
    }else{
      next = i;
      break;
    }
  }
  
  if(len > next+1) next++;
  if(count * val == arr[next]){
    return count;
  }
  return 0;
};

function powerTwo(pwr){ //степень двойки
	if(pwr < 0) return 1;
	let a = 1;
	return a << pwr;
};

function print(){
  console.log('нет параметров');
  console.log('node appname -i -r N');
  console.log('i - входной массив');
  console.log('r - случайный массив');
  console.log('N - длина массива');
  console.log('\tпримеры:');
  console.log('node appname -i 1,2,4,4,2,1,8');
  console.log('node appname -r 100');
};
