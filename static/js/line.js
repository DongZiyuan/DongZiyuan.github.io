var today = new Date();
var dates;

$.getJSON("/static/json/sequence.json", function(result) {
    dates = result['dates'];
    var myChart = echarts.init(document.getElementById('01'), 'white', {renderer: 'svg'});
    var option = {
        title: {
            text: 'Total Confirmed Cases',
            subtext: 'update by:' + today.toDateString(),
        },
        xAxis: {
            splitLine: {show: true},
            data: dates
        },
        yAxis: [
            {type: 'value'},
            {type: 'log'}
        ],
        legend: {
            show: true,
            orient: 'vertical',
            x: '80',
            y: '50'
        },
        series: [
            {
                type: 'line',
                name: 'Linear Scale',
                yAxisIndex: '0',
                data:  result['total_cases']
            },
            {
                type: 'line',
                name: 'Logarithmic Scale',
                yAxisIndex: '1',
                data:  result['total_cases']
            }
        ],
        tooltip: {
            show: true,
            trigger: 'item',
            triggerOn: 'mousemove|click'
        },
        dataZoom: {
            show: true,
            type: 'slider',
            realtime: true,
            orient: 'horizontal',
            start: 10,
            end: 90
        }
    };
    myChart.setOption(option);

    myChart = echarts.init(document.getElementById('02'), 'white', {renderer: 'svg'});
    option['title']['text'] = 'Daily New Cases & the 7-day Moving Average';
    option['yAxis'] = {type: 'value'};
    option['series'] = [
        {
            type: 'line',
            name: 'Daily New Cases',
            data: result['daily_cases']
        },
        {
            type: 'line',
            name: '7-day Moving Average',
            data: result['daily_cases_avg']
        }
    ];
    myChart.setOption(option);

    myChart = echarts.init(document.getElementById('03'), 'white', {renderer: 'svg'});
    option['title']['text'] = 'Total Confirmed Deaths';
    option['yAxis'] = [{type: 'value'}, {type: 'log'}];
    option['series'] = [
        {
            type: 'line',
            name: 'Linear Scale',
            yAxisIndex: '0',
            data: result['total_deaths']
        },
        {
            type: 'line',
            name: 'Logarithmic Scale',
            yAxisIndex: '1',
            data: result['total_deaths']
        }
    ];
    myChart.setOption(option);

    myChart = echarts.init(document.getElementById('04'), 'white', {renderer: 'svg'});
    option['title']['text'] = 'Daily New Deaths & the 7-day Moving Average';
    option['yAxis'] = {type: 'value'};
    option['series'] = [
        {
            type: 'line',
            name: 'Daily New Deaths',
            data: result['daily_deaths']
        },
        {
            type: 'line',
            name: '7-day Moving Average',
            data: result['daily_deaths_avg']
        }
    ];
    myChart.setOption(option);

    myChart = echarts.init(document.getElementById('05'), 'white', {renderer: 'svg'});
    option['title']['text'] = 'Confirmed Cases for Top 6 Communities';
    option['series'] = [];
    for (let key in result['top_cases']) {
        option['series'].push({type: 'line', name: key, data: result['top_cases'][key]});
    }
    myChart.setOption(option);

    myChart = echarts.init(document.getElementById('06'), 'white', {renderer: 'svg'});
    option['title']['text'] = 'Case Density for Top 6 Communities';
    option['series'] = [];
    for (let key in result['top_density']) {
        option['series'].push({type: 'line', name: key, data: result['top_density'][key]});
    }
    myChart.setOption(option);
});