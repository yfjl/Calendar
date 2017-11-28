;(function($,window,document,undefined) {
  var _data = new Date();
  var MyDate = function(ele,opt) {

    if($('.wrapper').length == 0 ){
        var html = '<div class="wrapper"></div>'
        $('body').append(html)
    }

      

    this.el = ele
    this.elName = ""
    this.$ele  = $('.wrapper') ;
    this.year  = _data.getFullYear() ;          //年
    this.month = _data.getMonth() + 1 ;         //月
    this.week  = _data.getDay();                //星期
    this.date  = _data.getDate() ;              //日
    this.hour = _data.getHours()   //时
    this.minute = _data.getMinutes()   //分
    this.second = _data.getSeconds()  //秒
    this.left = this.el.offset().left
    this.top = this.el.offset().top
    this.height = this.el.height()+6
    this.monthArr = [31,28,31,30,31,30,31,31,30,31,30,31] ;   //12个月天数
    this.defaults = {
     language:'CN',
     beginYears:1900,
     endYears:2050,
     format:'YYYY-MM-DD'
    };

    this.options = $.extend(true, this.defaults, opt) ;  //自定义覆盖默认设置



    

    this._init();
    

    

    var _this = this
    this.el.click(function(){

      window.elName = _this.el.attr("class")
      $('.wrapper').css({
        "position":"absolute",
        "left":_this.left+"px",
        "top":(_this.top+_this.height)+"px",
        "zIndex":999
      }).show()

      _this.contorl();

    })

  };

  var dt =  MyDate.prototype

  dt._init = function(){

    this.$ele.empty(); //移除所有内容


    this.$ele.prepend([
      '<div class="contorl">',
        '<div class="contorl-years"></div>',
        '<div class="contorl-month"></div>',
        '<div class="contorl-week"></div>',
        '<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2272021114,887851389&fm=27&gp=0.jpg" alt="" class="logo1" />', 
      '</div>'].join('')) ;
    if ( (this.year % 4 == '0' || this.year % 400 == '0' ) && this.year % 100 != '0'  ) {
      this.monthArr[1] = 29
    }
    this.showMonth();
    this.showYear()

    // this.$ele.prepend(this.showYear()) ;
    this.$ele.append(this.showWeek()) ;   //渲染周
    this.$ele.append(this.showDate()) ;   //渲染日


    this.$ele.append([
      '<div class="time">',
        '<div>时间：</div>',
        '<div class="time-hour"></div>',
        '<div>:</div>',
        '<div class="time-minute"></div>',
        '<div>:</div>',
        '<div class="time-second"></div>',
      '</div>'].join('')) ; 

    var format = this.options.format


    this.showHour()  //渲染时
      this.showMinute()  //渲染分
      this.showSecond()  //渲染秒
   



    this.$ele.append([
      '<div class="operate">',
        '<input type="button" class="operate-clear" value="清空" />',
        '<input type="button" class="operate-select" value="确认选择" />',
        '<input type="button" class="operate-today" value="今日" />',
        '<input type="button" class="operate-close" value="关闭" />',
      '</div>'].join('')) ; 

  };





  dt.contorl = function(){
    var  _this = this ;

   
    _this.$ele.on('change','.contorl-years', function(event) {
      _this.year = $(this).find('option:selected').val();
      _this._init();
    }).on('change','.contorl-month', function(event) {
      _this.month = $(this).find('option:selected').val();
      _this._init();
    }).on('click', 'ul.date li:not(.gray)', function(event) {
      var $this = $(this);
      // _this.date = $this.html();
      _this.showWeek();
      $this.addClass('red').siblings().removeClass('red');
    });

    _this.$ele.on("click",'.operate-close',function(event){   //关闭
      $('.wrapper').hide()
    }).on("click",'.operate-today',function(event){  //今日

         var _data = new Date(),
            year = _data.getFullYear(),
            month = _data.getMonth()+1,
            day = _data.getDate()

         var format = _this.options.format
        var result=[]


        if(format == 'YYYY-MM-DD'){
          result.push(year+"-"+month+"-"+day)
        }else if(format == 'YYYY-MM-DD hh:mm'){
          result.push(year+"-"+month+"-"+day+" "+_this.hour+":"+_this.minute)
        }else if(format == 'YYYY-MM-DD hh:mm:ss'){
          result.push(year+"-"+month+"-"+day+" "+_this.hour+":"+_this.minute+":"+_this.second)
        }
      

      $("."+window.elName).val(result)
      // _this.el.val(result)
        $('.wrapper').hide()
    }).on("click",'.operate-select',function(event){    //确认选择
      var year = $('.contorl-years').find('option:selected').val(),
          month = $('.contorl-month').find('option:selected').val(),
          day = $('.date .red').html(),
          hour = $('.time-hour').find('option:selected').val(),
          minute = $('.time-minute').find('option:selected').val(),
          second = $('.time-second').find('option:selected').val()

          month = month>9 ? month : "0" + month
          hour = hour>9 ? hour : "0" + hour
          minute = minute>9 ? minute : "0" + minute
          second = second>9 ? second : "0" + second

          if(day){
           day = day>9 ? day : "0" + day
          }else{
            day = "01"
          }
           var format = _this.options.format
        var result=[]


        if(format == 'YYYY-MM-DD'){
          result.push(year+"-"+month+"-"+day)
        }else if(format == 'YYYY-MM-DD hh:mm'){
          result.push(year+"-"+month+"-"+day+" "+hour+":"+minute)
        }else if(format == 'YYYY-MM-DD hh:mm:ss'){
          result.push(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second)
        }

        $("."+window.elName).val(result)
        $('.wrapper').hide()
    }).on("click",".operate-clear",function(event){   //清空
        $("."+window.elName).val("")
        $('.wrapper').hide()
    })


  }

  //小时渲染
  dt.showHour = function(){
    var hour = []
    for(var i=0;i<24;i++){
      if(i == this.hour){
        hour.push('<option value="'+i+'" selected>'+(i=i>9?i:"0"+i)+'</option>')
      }else{
        hour.push('<option value="'+i+'">'+(i=i>9?i:"0"+i)+'</option>')
      }
      
    }
    $(".time-hour").html('<select name="hour" >'+ hour.join('') +'</select>')
  }
  //分钟渲染
  dt.showMinute = function(){
    var minute = []
    for(var i=0;i<60;i++){
      if(i == this.minute){
        minute.push('<option value="'+i+'" selected>'+(i=i>9?i:"0"+i)+'</option>')
      }else{
        minute.push('<option value="'+i+'">'+(i=i>9?i:"0"+i)+'</option>')
      }
      
    }
    $(".time-minute").html('<select name="minute" >'+ minute.join('') +'</select>')
  }

  //秒渲染
  dt.showSecond = function(){
    var second = []
    for(var i=0;i<60;i++){
      if(i == this.second){
        second.push('<option value="'+i+'" selected>'+(i=i>9?i:"0"+i)+'</option>')
      }else{
        second.push('<option value="'+i+'">'+(i=i>9?i:"0"+i)+'</option>')
      }
      
    }
    $(".time-second").html('<select name="second" >'+ second.join('') +'</select>')
  }

  //年渲染
  dt.showYear = function(){
    var years = [] ;
    for (var i = this.options.beginYears; i <= this.options.endYears; i++) {
      if (i==this.year) {
        years.push('<option value="'+i+'" selected>'+i+'年</option>')
      } else {
        years.push('<option value="'+i+'">'+i+'年</option>')
      }
      
    }
    $('.contorl-years').html('<select name="years" >'+ years.join('') +'</select>')
  };

  //月渲染
  dt.showMonth = function(){
    var month = [] ;
    for (var i = 1; i <= 12; i++) {
      if (i==this.month) {
        month.push('<option value="'+i+'" selected>'+i+'月</option>')
      } else {
        month.push('<option value="'+i+'">'+i+'月</option>')
      }
      
    }
    $('.contorl-month').html('<select name="month" >'+ month.join('') +'</select>')  
  };

  //周渲染
  dt.showWeek = function(){
    var _week_ch = ['一','二','三','四','五','六','日'] ;
    var _week_en = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun'] ;
    var _week = [] ;
    this.week = new Date(this.year,this.month-1,this.date).getDay();

    console.log(this.week)

    this.week = this.week==0?7:this.week;
    for (var i = 0; i < _week_ch.length; i++) {
      if (this.options.language=='CN') {
        _week.push('<li>'+_week_ch[i]+'</li>')
      } else {
        _week.push('<li>'+_week_en[i]+'</li>')
      }
    }
    _week = '<ul class="week">'+_week.join('')+'</ul>' ;
    $('.contorl-week').html(_week_ch[this.week-1])
    return _week ;
  };

  //日渲染
  dt.showDate = function(){
    var newDate = new Date(this.year,this.month-1,1) ;
    var firstLi = newDate.getDay();   //当月的第一天从周几开始


    console.log("firstLi:"+firstLi)

    var _date = [] ;
    var _html = [] ;
    firstLi = firstLi==0?7:firstLi ;

    console.log("this.month:"+this.month)
    var _length = (firstLi+this.monthArr[this.month-1])>36?42:35;
      console.log(_length)

    var _prevMonthLenght = this.monthArr[(this.month-2)] ;
    var $date = $('.date') ;
    for (var i = _prevMonthLenght - firstLi + 2; i <= _prevMonthLenght  ; i++) { 
      _date.push(i);
    }

    for (var i = 1 ; i <= this.monthArr[this.month-1]; i++) {
      _date.push(i);
    }

    for (var i = 1 ; i <= _length - this.monthArr[this.month-1] - firstLi + 1 ; i++) {
      _date.push(i);
    }

    for (var i = 0; i < _date.length; i++) {
      if (i<firstLi-1||i>this.monthArr[this.month-1]+firstLi-2) {
        _html.push('<li class="gray">'+_date[i]+'</li>')
      } else if(i==(this.date+firstLi-2)){
        _html.push('<li class="red">'+_date[i]+'</li>')
      }else {
        _html.push('<li>'+_date[i]+'</li>')
      }
      
    }
    _html = '<ul class="date">'+_html.join('')+'</ul>' ;
    return _html ;
  };

  $.fn.Calendar = function(opt){
      console.log(this)
      new MyDate(this,opt);
  };

})(jQuery,window,document);