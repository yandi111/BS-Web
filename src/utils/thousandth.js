

export function thousandth(number) {
    // 检查输入是否为空或不是数字
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    const numStr = number.toString();
    
    // 使用正则表达式进行千分位格式化
    const [integerPart, decimalPart] = numStr.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 如果有小数部分，则返回格式化后的整数部分和小数部分
    if (decimalPart) {
        // 去掉小数部分末尾的零
        const trimmedDecimal = decimalPart.replace(/0+$/, '');
        return trimmedDecimal.length > 0 ? `${formattedInteger}.${trimmedDecimal}` : formattedInteger;
    }

    return formattedInteger;
}




export function removeTrailingZeros(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();
    
    // 检查是否为整数
    if (Number.isInteger(Number(numStr))) {
        return numStr; // 如果是整数，直接返回该值
    }

    // 使用正则表达式去掉小数点后面的零
    numStr = numStr.replace(/(\.\d*?[1-9])0+$/, '$1'); // 只去掉小数点后面的零

    // 如果小数部分是0，去掉小数点
    return numStr.replace(/\.0$/, ''); // 如果最后是 .0，去掉小数点
}


export function formatTimestamp(timestamp) {
    // 非空校验
    if (timestamp === null || timestamp === undefined || isNaN(timestamp)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 如果时间戳是以秒为单位，则转换为毫秒
    if (timestamp < 10000000000) { // 10位数的时间戳表示秒
        timestamp *= 1000; // 转换为毫秒
    }

    // 创建一个 Date 对象
    const date = new Date(timestamp);

    // 获取月、日、时、分、秒
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0'); // 日
    const hours = String(date.getHours()).padStart(2, '0'); // 时
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 分
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒

    // 返回格式化后的字符串
    return `${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function toTwoDecimals(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();

    // 找到小数点的位置
    const decimalIndex = numStr.indexOf('.');

    // 如果没有小数点，直接返回原始数字
    if (decimalIndex === -1) {
        return numStr; // 没有小数部分，返回整数部分
    }

    // 截取小数点后两位
    const twoDecimalPlaces = numStr.slice(0, decimalIndex + 3); // +3 是因为要包括小数点和后面的两位

    return twoDecimalPlaces;
}


// 千分位  +  截取两位小数
export function formatNumberWithCommas(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();

    // 分离整数部分和小数部分
    let [integerPart, decimalPart] = numStr.split('.');

    // 使用正则表达式添加千分位
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 截取小数部分到两位
    if (decimalPart) {
        decimalPart = decimalPart.substring(0, 2); // 截取前两位
    }

    // 组合整数部分和小数部分
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}




// 科学计数法数据处理
export function dataInitialization(value) {
    // 判断输入是否为有效的字符串
    if (typeof value !== 'string' || value.trim() === '') {
        return '0'; // 如果不是字符串或为空，返回 '0'
    }

    // 判断是否为科学计数法
    const scientificNotationRegex = /^[+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)$/;

    // 如果是科学计数法
    if (scientificNotationRegex.test(value)) {
        return '0'; // 如果是科学计数法，直接返回 '0'
    }

    // 处理非科学计数法的情况
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
        // 将数字转换为字符串并去掉小数点后面的零
        return parsedValue.toString().replace(/(\.\d*?[1-9])0+$/, '$1') // 去掉小数点后面的零
                                      .replace(/\.0$/, ''); // 如果最后是 .0，去掉小数点
    }

    // 否则，返回原值
    return value;
}

//  复制
export async function copyContent(text) {
    if (!text || text== '') {
        this.$customMessage(1, "复制内容不能为空"); // 显示复制内容不能为空的提示
        return;
    }

    try {
        // 尝试使用 Clipboard API 复制文本
        await navigator.clipboard.writeText(text);
        this.$customMessage(0, "复制成功"); // 显示复制成功的提示
    } catch (err) {
        // 如果 Clipboard API 失败，使用 execCommand 作为后备
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        
        // 选择文本
        textArea.select();
        textArea.setSelectionRange(0, 99999); // 对于移动设备

        // 执行复制命令
        try {
            document.execCommand("copy");
            this.$customMessage(0, "复制成功"); // 显示复制成功的提示
        } catch (err) {
            console.error('execCommand 复制失败:', err); // 处理错误
            this.$customMessage(1, "复制失败"); // 显示复制失败的提示
        }

        // 移除临时文本区域  
        document.body.removeChild(textArea);
    }
}

export function formatNumber(number) {
    if (!number) {
        return
    }
    return number.toLocaleString(); // 将数字转换为千分位格式
}





export function formatPrice(price) {   // 币对价格精度    
    if (!price) {
        return
    }
    let precision = this.$store.state.contract.pricePrecision
    
    // 非空校验
    if (price === null || price === undefined) {
        throw new Error('Price cannot be null or undefined');
    }
    if (precision === null || precision === undefined) {
        throw new Error('Precision cannot be null or undefined');
    }

    // 尝试将 price 转换为数字
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
        throw new Error('Invalid price value');
    }

    // 尝试将 precision 转换为整数
    const numericPrecision = Number(precision);
    if (isNaN(numericPrecision) || numericPrecision < 0) {
        throw new Error('Invalid precision value');
    }

    // 将价格转换为字符串
    const priceStr = numericPrice.toString();
    const decimalIndex = priceStr.indexOf('.');

    // 如果没有小数部分，直接返回价格
    // if (decimalIndex === -1) {
    //     return priceStr;
    // }
    let amountDetail
    if (decimalIndex !== -1) {
        const integerPart = priceStr.slice(0, decimalIndex); // 整数部分
        const decimalPart = priceStr.slice(decimalIndex + 1, decimalIndex + 1 + numericPrecision); // 小数部分
        // 拼接整数部分和截取的小数部分
        amountDetail = decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
    }else {
        amountDetail = priceStr
    }
    // 截取小数部分

    const numStr = amountDetail.toString();
    
    // 使用正则表达式进行千分位格式化
    const [integerPartS, decimalPartS] = numStr.split('.');
    const formattedInteger = integerPartS.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 如果有小数部分，则返回格式化后的整数部分和小数部分
    if (decimalPartS) {
        // 去掉小数部分末尾的零
        const trimmedDecimal = decimalPartS.replace(/0+$/, '');
        return trimmedDecimal.length > 0 ? `${formattedInteger}.${trimmedDecimal}` : formattedInteger;
    }
    return formattedInteger;
    
}















export function formatAmount(price) {   // 币对的数量精度    
    if (!price) {
        return
    }
    let precision = this.$store.state.contract.amountPrecision
    
    // 非空校验
    if (price === null || price === undefined) {
        throw new Error('Price cannot be null or undefined');
    }
    if (precision === null || precision === undefined) {
        throw new Error('Precision cannot be null or undefined');
    }

    // 尝试将 price 转换为数字
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
        throw new Error('Invalid price value');
    }

    // 尝试将 precision 转换为整数
    const numericPrecision = Number(precision);
    if (isNaN(numericPrecision) || numericPrecision < 0) {
        throw new Error('Invalid precision value');
    }

    // 将价格转换为字符串
    const priceStr = numericPrice.toString();
    const decimalIndex = priceStr.indexOf('.');

    // 如果没有小数部分，直接返回价格
    // if (decimalIndex === -1) {
    //     return priceStr;
    // }
    let amountDetail
    if (decimalIndex !== -1) {
        const integerPart = priceStr.slice(0, decimalIndex); // 整数部分
        const decimalPart = priceStr.slice(decimalIndex + 1, decimalIndex + 1 + numericPrecision); // 小数部分
        // 拼接整数部分和截取的小数部分
        amountDetail = decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
    }else {
        amountDetail = priceStr
    }
    // 截取小数部分

    const numStr = amountDetail.toString();
    
    // 使用正则表达式进行千分位格式化
    const [integerPartS, decimalPartS] = numStr.split('.');
    const formattedInteger = integerPartS.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 如果有小数部分，则返回格式化后的整数部分和小数部分
    if (decimalPartS) {
        // 去掉小数部分末尾的零
        const trimmedDecimal = decimalPartS.replace(/0+$/, '');
        return trimmedDecimal.length > 0 ? `${formattedInteger}.${trimmedDecimal}` : formattedInteger;
    }
    return formattedInteger;
    
}




export function thousandthPrice(number) {
    // 检查输入是否为空或不是数字
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    const numStr = number.toString();
    
    // 使用正则表达式进行千分位格式化
    const [integerPart, decimalPart] = numStr.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 如果有小数部分，则返回格式化后的整数部分和小数部分
    if (decimalPart) {
        // 去掉小数部分末尾的零
        const trimmedDecimal = decimalPart.replace(/0+$/, '');
        return trimmedDecimal.length > 0 ? `${formattedInteger}.${trimmedDecimal}` : formattedInteger;
    }
    

    return formattedInteger; // 仅返回格式化后的整数部分
}