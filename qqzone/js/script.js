
//--------  公共函数

    var g = function(id){ return document.getElementById(id);}
    var getBodyW = function(){ return document.body.offsetWidth; };
    var getBodyH = function(){ return document.body.offsetHeight; };
    var getElTop = function(el){ return el.offsetTop+170; };

//--------  模版内容输出

        //  分析归类数据
        var list = {};  //  { year: { month : [ item ,item ] } }

        data.sort(function(a,b){
            return new Date(a.date).getTime() > new Date(b.date).getTime();
        })

        //  格式化数据
        for (var i = data.length - 1; i >= 0; i--) {

            var date = new Date(data[i].date);
            var year  = date.getFullYear();
            var month = date.getMonth()+1;
            var lunar = GetLunarDateString( date );

            if( !list[year] ){ list[year] = {}; }
            if( !list[year][month] ){ list[year][month] = []; }

            var item = data[i];
            item.lunar = lunar[0]+'<br>&nbsp;&nbsp;&nbsp;'+lunar[1];
            item.like_format = item.like < 10000 ? item.like : ( item.like / 10000 ).toFixed(1) + '万';

            list[year][month].push( item );
        };


        //  最终html内容
        var html_scrubber = [];
        var html_content  = [];

        //  模版
        var tpl_scrubber_year = g('tpl_scrubber_year').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
        var tpl_scrubber_month = g('tpl_scrubber_month').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');

        var tpl_content_year = g('tpl_content_year').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
        var tpl_content_month = g('tpl_content_month').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');

        //  构建时序和内容html
        for (year in list) {

            var scrubber_month = [];
            var content_month = [];

            var isLeft = 0;

            for (month in list[year]) {
                scrubber_month.unshift(  tpl_scrubber_month.replace(/\{year\}/g,year).replace(/\{month\}/g,month) );

                for (var i = list[year][month].length - 1; i >= 0; i--) {
                    var item = list[year][month][i];

                    isLeft = isLeft ^ 1;
                    content_month.unshift(
                        ( (i==0) ?  '<div class="clear c_month" id="c_month_'+year+'_'+month+'"></div>'   : '' ) + tpl_content_month.replace(/\{year\}/g,year).replace(/\{month\}/g,month)
                            .replace(/\{lunar\}/g,item.lunar)
                            .replace(/\{date\}/g,item.date)
                            .replace(/\{intro\}/g,item.intro)
                            .replace(/\{media\}/g,item.media)
                            .replace(/\{like\}/g,item.like)
                            .replace(/\{comment\}/g,item.comment)
                            .replace(/\{like_format\}/g,item.like_format)
                            .replace(/\{leftOrRight\}/g, isLeft ? 'left' : 'right')
                            .replace(/\{isFirst\}/g, i == 0 ? 'c_item_first' : '')
                        ) ;
                };

            };
            html_scrubber.unshift( tpl_scrubber_year.replace(/\{year\}/g,year).replace(/\{list\}/g,scrubber_month.join('') ) );

            html_content.unshift( tpl_content_year.replace(/\{year\}/g,year).replace(/\{list\}/g,content_month.join('') )  );
        };

        //  写入内容
        g('scrubber').innerHTML = '<a href="javascript:;" onclick="scrollTopTo(0)">现在</a>'+html_scrubber.join('')+'<a href="javascript:;" onclick="scrollTopTo(getBodyH())">出生</a>';
        g('content').innerHTML = html_content.join('')+ tpl_content_year.replace(/\{year\}/g,'出生').replace(/\{list\}/g,'')+'<div class="clear c_month" id="c_month_0_0"></div>'  ;



//--------  脚本处理

        //  动画卷动
        var  scrollTopTo = function( to ){
            var start =  document.body.scrollTop;
            fx( function( now , type ){  window.scroll(0,now); },start ,to );
        }


        //  展开时序
        var expandScrubber = function( year,elem ){

            var years  = document.getElementsByClassName('s_year');
            var months = document.getElementsByClassName('s_month');

            var year_months = document.getElementsByClassName(year+'_month');

            //  清理所有年份的 cur 样式
            for (var i = years.length - 1; i >= 0; i--) {
                years[i].className = 's_year';
            };
            
            //  隐藏所有的月份
            for (var i = months.length - 1; i >= 0; i--) {
                months[i].style.display = 'none';
            };

            //  展现当前年份下所有的月份
            for (var i = year_months.length - 1; i >= 0; i--) {
                year_months[i].style.display = 'block';
            };

            //  设置当前年份的 cur 样式
            elem.className = 's_year cur';
        }

        //  高亮月份
        var highlightMonth = function( year , month , elem ){
            
            var months = document.getElementsByClassName(year+'_month');
            for (var i = months.length - 1; i >= 0; i--) {
                months[i].className = months[i].className.replace('cur','');

            };
            elem.className = elem.className+' cur';
        }

        //  年份点击处理
        var showYear = function(year,elem){
            expandScrubber(year ,elem);
            var top = getElTop( g('content_year_'+year) );
            scrollTopTo( top );
            //  滚动到当前年份的位置
        }

        //  月份点击处理
        var showMonth = function( year , month ,elem ){
            var top = getElTop( document.getElementsByClassName('content_date_'+year+''+month)[0] );
            highlightMonth( year , month , elem );
            scrollTopTo( top );
        }


        //  根据窗口滚动条更新时序年份状态
        var updateScrubberOnTop = function( top ){

            var years  = g('content').getElementsByClassName('c_year');
            var tops = [];

            for (var i = 0; i <years.length ; i++) {
                tops.push( years[i].offsetTop );
            };

            for(var i = 1; i <tops.length ; i++){

                if( top > tops[i-1] && top < tops[i] ){

                    var year = years[i-1].innerHTML;

                    expandScrubber(year,g('scrubber_year_'+year));
                    return ;
                }
            }

        }

        //  根据窗口滚动条更新时序月份状态
        var updateMonthOnTop = function( top ){

            var months  = g('content').getElementsByClassName('c_month');
            var tops = [];

            for (var i = 0; i <months.length ; i++) {
                tops.push( months[i].offsetTop );
            };

            for(var i = 1; i <tops.length ; i++){

                if( top > tops[i-1] && top < tops[i] ){

                    var info  = months[i-1].id.split('_');
                    var year  = info[2];
                    var month = info[3];
                    highlightMonth( year , month , g('scrubber_month_'+year+month) );

                    return ;
                }
            }
        }

        //  滚动条事件处理; 定位时间
        window.onscroll = function(){

            var top = document.body.scrollTop ;

            if( top > 200){
                g('scrubber').style.position = 'fixed';
                g('scrubber').style.left = (getBodyW()-960)/2+ 'px';
                g('scrubber').style.top  = '60px';
            }else{
                g('scrubber').style.position = '';
                g('scrubber').style.left =     '';
                g('scrubber').style.top  =     '';
            }

            //  更新时序状态
            updateScrubberOnTop( top );
            updateMonthOnTop( top );
        }

        //  窗口改变事件处理; 保持时序列表的位置
        window.onresize = function(){
            window.onscroll();
        }