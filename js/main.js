const size = parseInt(prompt('Введите число, которое определит длину массива:', 10));
const topRightCornerValue = parseInt(prompt('Введите число для элемента массива вверху справа:', 7));
const userRow = parseInt(prompt('Введите номер строки для подсчета ее суммы:', 3) + 1);
const userColumn = parseInt(prompt('Введите номер столбца для подсчета его суммы:', 5) + 1);

// Генерация матрицы с элементом вверху справа, который указал пользователь
function createMatrix(size, topRightCornerValue){
    let matrix = [];
    for(let i = 0; i < size; i++){
        let row = [];
        for(let j = 0; j < size; j++){
            row.push(Math.round(Math.random() * 9));
        }
        matrix.push(row);
    }
    matrix[0][size - 1] = topRightCornerValue;
    return matrix;
}

// Присвоение ф-ции выше переменной
const matrix = createMatrix(size, topRightCornerValue);

// Тут сюжет фильма для взрослых, который выводится в html
function changeStyleElements(matrix, elements, color = 'lightblue'){
    let size = matrix.length;
    let htmlCode = '<table>';
    for(let i = 0; i < size; i++){
        htmlCode += '<tr>';
        for(let j = 0; j < size; j++){
            if(elements[i] && elements[i].includes(j)){
                htmlCode += `<td style="background-color: ${color}">${matrix[i][j]}</td>`;
            } else {
                htmlCode += `<td>${matrix[i][j]}</td>`;
            }
        }
        htmlCode += '</tr>';
    }
    htmlCode += '</table>';
    document.write(htmlCode);
}

// Сумма диагонали матрицы
function mainDiagonalSum(matrix){
    let sum = 0;
    let elements = {};
    for(let i = 0; i < matrix.length; i++){
        sum += matrix[i][i];
        if(!elements[i]){ // проверка существует ли массив "элементс[i] для строки i"
            elements[i] = []; // если не существует или undefined принимаем как пустой массив
        }
        elements[i].push(i);
    }
    changeStyleElements(matrix, elements, 'lightcoral');
    return sum;
}

// Сумма побочной диагонали матрицы
function secondaryDiagonalSum(matrix){
    let sum = 0;
    let elements = {};
    for(let i = 0; i < matrix.length; i++){
        sum += matrix[i][matrix.length - i - 1];
        if(!elements[i]){
            elements[i] = [];
        }
        elements[i].push(matrix.length - i - 1);
    }
    changeStyleElements(matrix, elements, 'lightskyblue');
    return sum;
}

// Ф-ция подсчета нужных нам элементом посредством условия condition и параметров
// isMainDiagonal - главная/побочная(или по какую сторону считать будем)
// includeDiagonal - включаем иль не включаем
// isUpper - кто снизу, кто сверху или еще одна причина возненавидеть циклы
function matrixSum(matrix, includeDiagonal, isUpper, isMainDiagonal){
    let sum = 0;
    let elements = {};
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
            let condition;
            if(isMainDiagonal){
                condition = isUpper ? (j > i) : (j < i);
            } else {
                condition = isUpper ? (j < matrix.length - i - 1) : (j > matrix.length - i - 1);
            }
            if(condition || (includeDiagonal && ((isMainDiagonal && j === i) || (!isMainDiagonal && j === matrix.length - i - 1)))){
                sum += matrix[i][j];
                if(!elements[i]){
                    elements[i] = [];
                }
                elements[i].push(j);
            }
        }
    }
    changeStyleElements(matrix, elements, 'lightsalmon');
    return sum;
}

// Сложными математическими вычислениями узнаем сумму рядка, который задал пользователь
function userRowSum(matrix, row){
    let sum = matrix[row].reduce((acc, item) => acc + item, 0);
    let elements = {};
    elements[row] = [];
    for(let i = 0; i < matrix.length; i++){
        elements[row].push(i);
    }
    changeStyleElements(matrix, elements, 'lightyellow');
    return sum;
}

// // Не менее сложными математическими вычислениями узнаем сумму столбца, который задал пользователь
function userColumnSum(matrix, column){
    let sum = 0;
    let elements = {};
    for(let i = 0; i < matrix.length; i++){
        sum += matrix[i][column];
        if(!elements[i]){
            elements[i] = [];
        }
        elements[i].push(column);
    }
    changeStyleElements(matrix, elements, 'lightpink');
    return sum;
}

document.write(`<h2>Жертва будущих вычислений:</h2>`);
changeStyleElements(matrix, {});

document.write(`<h2>Сложные математические вычисления:</h2>`);
document.write(`<h3>1. Сумма главной диагонали: <span>${mainDiagonalSum(matrix)}</span></h3>`);
document.write(`<h3>2. Сумма побочной диагонали: <span>${secondaryDiagonalSum(matrix)}</span></h3>`);
document.write(`<h3>3. Сумма половины матрицы без главной диагонали вверху справа: <span>${matrixSum(matrix, false, true, true)}</span></h3>`);
document.write(`<h3>4. Сумма половины матрицы с главной диагональю вверху справа: <span>${matrixSum(matrix, true, true, true)}</span></h3>`);
document.write(`<h3>5. Сумма половины матрицы без главной диагонали снизу слева: <span>${matrixSum(matrix, false, false, true)}</span></h3>`);
document.write(`<h3>6. Сумма половины матрицы с главной диагональю снизу слева: <span>${matrixSum(matrix, true, false, true)}</span></h3>`);
document.write(`<h3>7. Сумма половины матрицы без побочной диагонали вверху слева: <span>${matrixSum(matrix, false, true, false)}</span></h3>`);
document.write(`<h3>8. Сумма половины матрицы с побочной диагональю вверху слева: <span>${matrixSum(matrix, true, true, false)}</span></h3>`);
document.write(`<h3>9. Сумма половины матрицы без побочной диагонали снизу справа: <span>${matrixSum(matrix, false, false, false)}</span></h3>`);
document.write(`<h3>10. Сумма всех элементов строки ${userRow}: <span>${userRowSum(matrix, userRow)}</span></h3>`);
document.write(`<h3>11. Сумма всех элементов стлобца ${userColumn}: <span>${userColumnSum(matrix, userColumn)}</span></h3>`);
document.write(`Внимание! Спасибо за внимание.`)