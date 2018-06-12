var developMode = false;
if (developMode) {
    require.config({
        paths: {
            air: 'http://echarts.iconpng.com/china'
        },
        packages: [{
            name: 'echarts',
            location: '../../../../src',
            main: 'echarts'
        }, {
            name: 'zrender',
            location: '../../../../../zrender/src',
            main: 'zrender'
        }]
    });
} else {
    require.config({
        paths: {
            echarts: './www/js'
        }
    });
}
var EC_READY = false;
var DATA_READY = false;
var myChart0;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
var myChart5;
var myChart6;
var myChart7;
var myChart8;
var myChart9;
var myChart10;
require(['echarts', 'echarts/chart/config', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/scatter', 'echarts/chart/k', 'echarts/chart/pie', 'echarts/chart/radar', 'echarts/chart/force', 'echarts/chart/chord', 'echarts/chart/gauge', 'echarts/chart/funnel', 'echarts/chart/eventRiver', 'echarts/chart/map'], function(ec, ecConfig) {
    myChart8 = ec.init(document.getElementById('g8')).showLoading({
        effect: 'bubble'
    });
    myChart0 = ec.init(document.getElementById('g0')).showLoading({
        effect: 'bubble'
    });
    myChart1 = ec.init(document.getElementById('g1')).showLoading({
        effect: 'bubble'
    });
    myChart2 = ec.init(document.getElementById('g2')).showLoading({
        effect: 'bubble'
    });
    myChart3 = ec.init(document.getElementById('g3')).showLoading({
        effect: 'bubble'
    });
    myChart5 = ec.init(document.getElementById('g5')).showLoading({
        effect: 'bubble'
    });
    myChart7 = ec.init(document.getElementById('g7')).showLoading({
        effect: 'bubble'
    });
    myChart9 = ec.init(document.getElementById('g9')).showLoading({
        effect: 'bubble'
    });
    myChart10 = ec.init(document.getElementById('g10')).showLoading({
        effect: 'bubble'
    });
    showProvinceMap("新疆");
    showchinaMap(myChart0);
    myChart2.setOption(option2);
    myChart2.hideLoading();
    myChart3.setOption(option3);
    myChart3.hideLoading();
    myChart5.setOption(option5);
    myChart5.hideLoading();
    myChart7.setOption(option7);
    myChart7.hideLoading();
    myChart8.setOption(option81);
    myChart8.hideLoading();
    myChart9.setOption(option9(top100checknum));
    myChart9.hideLoading();
    myChart10.setOption(option10(checknum));
    myChart10.hideLoading();
    setprovincebutton();
});
var resizeTicket = '';
window.onload = function() {
    window.onresize = function() {
        clearTimeout(resizeTicket);
        resizeTicket = setTimeout(function() {
            myChart0.resize();
            myChart1.resize();
            myChart2.resize();
            myChart3.resize();
            myChart5.resize();
            myChart7.resize();
            myChart8.resize();
            myChart9.resize();
            myChart10.resize();
        }, 200);
    }
}
