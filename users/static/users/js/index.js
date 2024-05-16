function calculateSums() {
var sum_1100 = 0;
var sum_1200 = 0;
var sum_1300 = 0;
var sum_1400 = 0;
var sum_1500 = 0;

var inputs = document.querySelectorAll('.indicator-input');
inputs.forEach(function(input) {
var value = parseFloat(input.value);
if (!isNaN(value)) {
var code = input.name.split('_')[1];
if (code.startsWith('11') && code !=='1100') {
sum_1100 += value;
} else if (code.startsWith('12') && code !=='1200') {
sum_1200 += value;
} else if (code.startsWith('13') && code !=='1300') {
sum_1300 += value;
} else if (code.startsWith('14') && code !=='1400') {
sum_1400 += value;
} else if (code.startsWith('15') && code !=='1500') {
sum_1500 += value;
}
}
});

document.querySelector('input[name="indicator_1100"]').value = sum_1100;
document.querySelector('input[name="indicator_1200"]').value = sum_1200;
document.querySelector('input[name="indicator_1300"]').value = sum_1300;
document.querySelector('input[name="indicator_1400"]').value = sum_1400;
document.querySelector('input[name="indicator_1500"]').value = sum_1500;
}

function calc() {
calculateSums();
var currentLiquidity = parseFloat(document.querySelector('input[name="indicator_1200"]').value) / parseFloat(document.querySelector('input[name="indicator_1500"]').value);
var absoluteLiquidity = (parseFloat(document.querySelector('input[name="indicator_1200"]').value) + parseFloat(document.querySelector('input[name="indicator_1300"]').value)) / parseFloat(document.querySelector('input[name="indicator_1500"]').value);
var quickLiquidity = (parseFloat(document.querySelector('input[name="indicator_1200"]').value) + parseFloat(document.querySelector('input[name="indicator_1300"]').value) + parseFloat(document.querySelector('input[name="indicator_1400"]').value)) / parseFloat(document.querySelector('input[name="indicator_1500"]').value);

var tableHTML = '<table class="table"><tbody>';
tableHTML += '<tr><td>Текущая ликвидность</td><td>' + currentLiquidity + '</td></tr>';
tableHTML += '<tr><td>Абсолютная ликвидность</td><td>' + absoluteLiquidity + '</td></tr>';
tableHTML += '<tr><td>Быстрая ликвидность</td><td>' + quickLiquidity + '</td></tr>';
tableHTML += '</tbody></table>';

document.getElementById('liquidityTable').innerHTML = tableHTML;

var period = document.getElementById('yearHeader').textContent;
renderLiquidityChart([currentLiquidity, absoluteLiquidity, quickLiquidity], period);
}

function buildReport() {
var sum_1200 = parseFloat(document.querySelector('input[name="indicator_1200"]').value);
var sum_1300 = parseFloat(document.querySelector('input[name="indicator_1300"]').value);
var sum_1400 = parseFloat(document.querySelector('input[name="indicator_1400"]').value);
var sum_1500 = parseFloat(document.querySelector('input[name="indicator_1500"]').value);
var a_1 = parseFloat(document.querySelector('input[name="indicator_1240"]').value)+parseFloat(document.querySelector('input[name="indicator_1250"]').value);
var a_2 = parseFloat(document.querySelector('input[name="indicator_1230"]').value);
console.log(a_1)
var currentLiquidity = sum_1200 / sum_1500;
var absoluteLiquidity = a_1 / sum_1500;
var quickLiquidity =(a_1+a_2)/ sum_1500;

var liquidityData = [currentLiquidity, absoluteLiquidity, quickLiquidity];

renderLiquidityChart(liquidityData);
}

document.addEventListener('DOMContentLoaded', function() {
var inputs = document.querySelectorAll('.indicator-input');
inputs.forEach(function(input) {
input.addEventListener('input', function() {
calculateSums();
});
});
var container = document.getElementById('yearSelectorContainer');
for (var year = 2023; year >= 1990; year--) {
    var option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    container.appendChild(option);
}

var yearSelector = document.getElementById('yearSelectorContainer');
yearSelector.addEventListener('change', function() {
    var selectedYear = parseInt(yearSelector.value);
});

var yearHeader = document.getElementById('yearHeader');
yearHeader.textContent = 'За 31.12. ' + container.value;
container.addEventListener('change', function() {
    yearHeader.textContent = 'За 31.12.' + container.value;
});

});
var myChart; // Глобальная переменная для хранения объекта графика

function renderLiquidityChart(liquidityData, period) {
    var ctx = document.getElementById('liquidityChart').getContext('2d');
    var labels = ["Текущая ликвидность", "Абсолютная ликвидность", "Быстрая ликвидность"];

    // Если график уже существует, удаляем его
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: period,
                data: liquidityData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function readFile() {
    var fileInput = document.getElementById('formFile');
    if (fileInput.files.length === 0) {
        alert("Выберите файл Excel для загрузки.");
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheetName = workbook.SheetNames[0];
        var firstSheet = workbook.Sheets[firstSheetName];

        // Пример чтения данных из ячеек и заполнения полей ввода с проверкой на существование ячейки
        var cellAddress1 = 'A1';
        if (firstSheet[cellAddress1] !== undefined && firstSheet[cellAddress1].v !== undefined) {
            var cellValue1 = firstSheet[cellAddress1].v;
            document.querySelector('input[name="indicator_1110"]').value = cellValue1;
        } else {
            console.error("Ячейка A1 не найдена или не содержит значения.");
        }
        var cellAddress1 = 'A2';
        if (firstSheet[cellAddress1] !== undefined && firstSheet[cellAddress1].v !== undefined) {
            var cellValue1 = firstSheet[cellAddress1].v;
            document.querySelector('input[name="indicator_1120"]').value = cellValue1;
        } else {
            console.error("Ячейка A1 не найдена или не содержит значения.");
        }

        // Продолжайте этот процесс для других полей ввода, если необходимо
    };

    reader.readAsArrayBuffer(file);
}

