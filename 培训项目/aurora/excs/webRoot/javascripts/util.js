/**
 * 转化为千分位
 * 
 * @param num
 * @return
 */
function format_thousand(value, record, name) {
	return commafy(value);
}

function commafy(num) {
	if (!num) {
		return "";
	}
	if (trim((num + "")) == "") {
		return "";
	}
	num = trim(num + "");
	num = num.replaceAll(',', '');

	if (/^.*\..*$/.test(num)) {
		var pointIndex = num.lastIndexOf(".");
		var intPart = num.substring(0, pointIndex);
		var pointPart = num.substring(pointIndex + 1, num.length);
		intPart = intPart + "";
		var re = /(-?\d+)(\d{3})/
		while (re.test(intPart)) {
			intPart = intPart.replace(re, "$1,$2")
		}
		num = intPart + "." + pointPart;
	} else {
		num = num + "";
		var re = /(-?\d+)(\d{3})/
		while (re.test(num)) {
			num = num.replace(re, "$1,$2")
		}
		num += '.00';
	}
	return num;
}

function trim(s) {
	if (!s)
		return '';
	return s.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 
 * @param dateS
 * @return yyyy-MM-dd 返回'F' 代表日期格式不正确
 */
function format_date(dateS) {
	if (!dateS || !trim(dateS)) {
		return '';
	}
	if (dateS.lenth < 8) {
		return 'F';
	}
	dateS = dateS.replaceAll('-', '');
	dateS = dateS.replaceAll('/', '');
	dateS = dateS.substring(0, 4) + "/" + dateS.substring(4, 6) + "/"
			+ dateS.substring(6);
	// dateS = dateS.replaceAll('-','/');
	var DateIn = new Date(trim(dateS));
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var result = "";
	// 初始化时间
	Year = DateIn.getFullYear();
	if (!Year) {
		return 'F';
	}
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	result = Year + "-";
	if (Month >= 10) {
		result = result + Month + "-";
	} else {
		result = result + "0" + Month + "-";
	}
	if (Day >= 10) {
		result = result + Day;
	} else {
		result = result + "0" + Day;
	}
	return result;
}

/**
 * 当前时间
 * 
 * @return
 */
function getCurrentDate() {
	var DateIn = new Date();
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	// 初始化时间
	Year = DateIn.getFullYear();
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	CurrentDate = Year + "-";
	if (Month >= 10) {
		CurrentDate = CurrentDate + Month + "-";
	} else {
		CurrentDate = CurrentDate + "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate = CurrentDate + Day;
	} else {
		CurrentDate = CurrentDate + "0" + Day;
	}
	return CurrentDate;
}

/**
 * 校验是否是数字
 * 
 * @return
 */
function isNumber(strNumber) {
	var newPar = /^(-?\d+)(\.\d+)?$/;
	return newPar.test(strNumber);
}

// 加法
Number.prototype.add = function(arg) {
	var r1, r2, m;
	try {
		r1 = this.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (this * m + arg * m) / m;
}
// 减法
Number.prototype.sub = function(arg) {
	var r1, r2, m;
	try {
		r1 = this.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (this * m + arg * m) / m;
}
// 乘法
// 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
// 调用：accMul(arg1,arg2)
// 返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m)
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
	return accMul(arg, this);
}
// 除法
// 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
// 调用：accDiv(arg1,arg2)
// 返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""))
		r2 = Number(arg2.toString().replace(".", ""))
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function(arg) {
	return accDiv(this, arg);
}

/*
 * 四则运算精度修正函数 m 数值1(number) n 数值2(number) op 操作符(string)
 */
function fixMath(m, n, op) {
	if (n < 0 && op == '-') {
		n = n * -1;
		op = '+';
	}
	var a = (m + "");
	var b = (n + "");
	var x = 1;
	var y = 1;
	var c = 1;
	if (a.indexOf(".") > 0) {
		x = Math.pow(10, a.length - a.indexOf(".") - 1);
	}
	if (b.indexOf(".") > 0) {
		y = Math.pow(10, b.length - b.indexOf(".") - 1);
	}
	switch (op) {
	case '+':
	case '-':
		c = Math.max(x, y);
		m = Math.round(m * c);
		n = Math.round(n * c);
		break;
	case '*':
		c = x * y
		m = Math.round(m * x);
		n = Math.round(n * y);
		break;
	case '/':
		c = Math.max(x, y);
		m = Math.round(m * c);
		n = Math.round(n * c);
		c = 1;
		break;
	}
	return eval("(" + m + op + n + ")/" + c);
}
