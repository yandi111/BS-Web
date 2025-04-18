//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(...args) {
  if (args.length < 2) {
    throw new Error("accDiv function requires at least two arguments.");
  }

  let result = args[0];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    result = divide(result, arg);
   // console.log(result, arg, 'result, arg');
  }
	
  return result == Infinity ? 0 : result;
}

function divide(arg1, arg2) {
  arg2=arg2?arg2:'0'
  arg1=arg1?arg1:'0'
// console.log(arg1, arg2,'arg1, arg2');
  let t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}


//给Number类型增加一个div方法，调用起来更加 方便。
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
}
String.prototype.div = function (arg) {
  return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以 arg2的精确结果
function accMul(...args) {
  if (args.length < 2) {
    throw new Error("accMul function requires at least two arguments.");
  }

  let result = args[0];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    result = multiply(result, arg);
  }

  return result == Infinity ? 0 : result;
}

function multiply(arg1, arg2) {
  let m = 0, s1 = arg1?.toString(), s2 = arg2?.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1?.replace(".", "")) * Number(s2?.replace(".", "")) / Math.pow(10, m);
}


// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
}
String.prototype.mul = function (arg) {
  return accMul(arg, this);
}

export default {
  accDiv,
  accMul
}