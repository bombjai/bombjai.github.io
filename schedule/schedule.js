/**
 * @author Kaqlos/Kevin L.
 * @Year: 2019
 * @Purpose: Scheduler for discord
 */

var scheduler = {

	currentTime: "",
	weekNum: 9,
	constant: {
		"ko": "Asia/Seoul",
		"tw": "Asia/Taipei",
		"us": "America/Los_Angeles",
		"eu": "Europe/Paris",
	},
	itemList: ["PC Stream (電腦實況, 컴터방송)", "Outdoor Stream (戶外實況, 야외방송)", "No Stream (沒有實況, 휴방)"],

	getWeek: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format('ddd').toUpperCase();
	},

	getDay: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format("MM/DD");
	},
	getFullDay: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format("YYYY-MM-DD");
	},
	getCurrent: function(val) {
		myVal = val || this.currentTime;

		return moment().tz(myVal).format('MM/DD/YY, h:mm a');
	},
	getCurrentRadio: function() {
		var radios = document.getElementsByName('timezone');
		for (var i = 0, length = radios.length; i < length; i++) {
		  if (radios[i].checked) {
		    this.currentTime = radios[i].value;
		    break;
		  }
		}
	},

	lookUpTimeName: function (name) {
		if (name == this.constant.ko) {
			return "ko-style";
		} else if (name == this.constant.tw) {
			return "tw-style";
		} else if (name == this.constant.us) {
			return "us-style";
		} else if (name == this.constant.eu) {
			return "eu-style";
		}
	},

	buildCurrentTime: function() {
		return "<div><ul class='ct-list'>"
			   + "<li><label for='tw-radio'><span class='bold'>Taiwan</span>: "+ this.getCurrent(this.constant.tw) +"</label></li>"
			   + "<li class='active'><label for='ko-radio'><span class='bold'>Korea</span>: "+ this.getCurrent(this.constant.ko) +"</label></li>"
			   + "<li><label for='us-radio'><span class='bold'>US</span>: "+ this.getCurrent(this.constant.us) +"</label></li>"
			   + "<li><label for='eu-radio'><span class='bold'>Europe</span>: "+ this.getCurrent(this.constant.eu) +"</label></li>"
			   + "</ul></div>"

	},

	buildWeekData: function(opt) {
		var data = {};

		for (var i = -1, length = this.weekNum; i < length; i++) {
			data.day = this.getDay(i);
			data.week = this.getWeek(i);
			data.fullday = this.getFullDay(i);
			data.num = i;

			if (opt == 'text') {
				$('.copy').append('<div class="copy-style copy-'+i+'"></div>')

				this.buildTextSchedule(data);
			} else {
				$('.ind-wrapper').append('<div class="card individual-'+i+'"></div>')

				this.buildWeekTemplate(data);
			}
			//reset obj
			data = {};
		}
	},

	buildWeekTemplate: function(data) {
		var ddList = '<select class="thingList select-css select-list-'+data.num+'"></select>',
		 	ddHourList = '<select class="hourList select-css hour-list-'+data.num+'"></select>',
		 	ddMinList = '<select class="minList select-css min-list-'+data.num+'"></select>',
		 	ckbox = '<input type="checkbox" name="extend" class="checkbox-label" id="estimate-'+data.num+'"></input>';

		$('.individual-'+data.num).append('<div class="day-breaker">'+ data.day + ' (' + data.week + ') </div>');
		$('.individual-'+data.num).append('<span class="block tal">Activity: '+ddList+' </span>');		
		this.buildDropDown(data.num);

		$('.individual-'+data.num).append('<span class="space">Hour: '+ddHourList+' </span>');
		$('.individual-'+data.num).append('<span class="space">Min: '+ddMinList+' </span>');
		this.buildSchedule(data.num);

		$('.individual-'+data.num).append('<span class="space"><label>Estimated (eg.12-1pm): '+ckbox+' </label></span>');
	},

	buildTextSchedule: function(data) {
		var dateInfo = '<span class="copy-breaker">'+ data.day + ' (' + data.week + ') - </span>';
		var actInfo = '<span>'+$('.select-list-'+data.num).val()+'</span>'
		var timeInfo = '<div class="time">'+this.buildTimeZone(data, actInfo)+'</div>'

		$('.copy-'+data.num).append(timeInfo + dateInfo + actInfo +"<br/>");
	},


	buildDropDown: function(i) {
		var itemList = this.itemList;

		for (var k = 0, length = itemList.length; k < length; k++) {
			$('.select-list-'+i).append('<option val="'+k+'">'+itemList[k]+'</option>');
		}
	},

	buildSchedule: function(i) {
		var counter = 0,
		 	hour = 24,
		 	min = ["00", "15", "30", "45"];

		for (var k = 0, length = min.length; k < length; k++) { 
			$('.min-list-'+i).append('<option val="'+k+'">'+min[k]+'</option>');
		}

		while (counter < hour) {
			if (counter < 10) {
				$('.hour-list-'+i).append('<option value="0'+counter+'">'+moment(counter, "HH").format("hh a")+'</option>');
			}
			else if (counter == 12) {
				$('.hour-list-'+i).append('<option selected value="'+counter+'">'+ moment(counter, "HH").format("hh a") +'</option>');
			}
			else {
				$('.hour-list-'+i).append('<option value="'+counter+'">'+moment(counter, "HH").format("hh a")+'</option>');
			}
		  counter++;
		}
	},

	buildTimeZone: function(data, act) {

		var today = this.getFullDay(data.num),
			hour = $('.hour-list-'+data.num).val().toString(), 
			min = $('.min-list-'+data.num).val().toString(),
			usTime = "", usTimeExtend = "",
			koTime = "", koTimeExtend = "",
			twTime = "", twTimeExtend = "",
			euTime = "", euTimeExtend = "";

		var fullDay = today + " " + hour + ":" + min + ":00";
		var isChecked = $('#estimate-'+data.num).is(":checked");
		//var thisday = moment(fullDay);

		//TODO: refoctor time
		//Daylight 
		if (this.currentTime == this.constant.ko) {
			var twTemp = 1;
			var usTemp = 17;
			var euTemp = 8;

			twTime = moment(fullDay).subtract(twTemp, 'hours').format('hh:mma');
			koTime = moment(fullDay).format('hh:mma');
			usTime = moment(fullDay).subtract(usTemp, 'hours').format('hh:mma');
			euTime = moment(fullDay).subtract(euTemp, 'hours').format('hh:mma');

			twTimeExtend = moment(fullDay).subtract(twTemp -1, 'hours').format('hh:mma');
			koTimeExtend = moment(fullDay).add(1, 'hours').format('hh:mma');
			usTimeExtend = moment(fullDay).subtract(usTemp -1, 'hours').format('hh:mma');
			euTimeExtend = moment(fullDay).subtract(euTemp -1, 'hours').format('hh:mma');
		}
		else if (this.currentTime == this.constant.tw) {
			var koTemp = 1;
			var usTemp = 16;
			var euTemp = 7;

			twTime = moment(fullDay).format('hh:mma'); 
			koTime = moment(fullDay).add(koTemp, 'hours').format('hh:mma');
			usTime = moment(fullDay).subtract(usTemp, 'hours').format('hh:mma');
			euTime = moment(fullDay).subtract(euTemp, 'hours').format('hh:mma');

			twTimeExtend = moment(fullDay).add(1, 'hours').format('hh:mma');
			koTimeExtend = moment(fullDay).add(2, 'hours').format('hh:mma');
			usTimeExtend = moment(fullDay).subtract(usTemp -1, 'hours').format('hh:mma');
			euTimeExtend = moment(fullDay).subtract(euTemp -1, 'hours').format('hh:mma');
		}
		else if (this.currentTime == this.constant.us) {
			var koTemp = 17;
			var twTemp = 16;
			var euTemp = 9;

			twTime = moment(fullDay).add(twTemp, 'hours').format('hh:mma');
			koTime = moment(fullDay).add(koTemp, 'hours').format('hh:mma');
			usTime = moment(fullDay).format('hh:mma'); 
			euTime = moment(fullDay).add(euTemp, 'hours').format('hh:mma');

			twTimeExtend = moment(fullDay).add(twTemp +1, 'hours').format('hh:mma');
			koTimeExtend = moment(fullDay).add(koTemp + 1, 'hours').format('hh:mma');
			usTimeExtend = moment(fullDay).add(1, 'hours').format('hh:mma');
			euTimeExtend = moment(fullDay).add(euTemp +1, 'hours').format('hh:mma');
		}
		else if (this.currentTime == this.constant.eu) {
			var koTemp = 8;
			var twTemp = 7;
			var usTemp = 9;

			twTime = moment(fullDay).add(twTemp, 'hours').format('hh:mma');
			koTime = moment(fullDay).add(koTemp, 'hours').format('hh:mma');
			usTime = moment(fullDay).subtract(usTemp, 'hours').format('hh:mma');
			euTime = moment(fullDay).format('hh:mma'); 

			twTimeExtend = moment(fullDay).add(twTemp +1, 'hours').format('hh:mma');
			koTimeExtend = moment(fullDay).add(koTemp + 1, 'hours').format('hh:mma');
			usTimeExtend = moment(fullDay).subtract(usTemp -1, 'hours').format('hh:mma'); 
			euTimeExtend = moment(fullDay).add(1, 'hours').format('hh:mma');
		}

		
		var lineText = "(台灣時間 " + twTime +", 한국시간 " + koTime + ", PST " + usTime + ", CET " + euTime +")";
		var lineTextExtent = "(台灣時間 " + twTime+"-"+twTimeExtend +", 한국시간 " + koTime+"-"+koTimeExtend + ", PST " + usTime+"-"+usTimeExtend + ", CET " + euTime+"-"+euTimeExtend +")";
		var returnText = "";

		if (act.indexOf("No Stream") > -1) {
			return "\n";
		} else if (isChecked) {
			if (data.num == 0) {
				returnText = lineTextExtent+"\n";
			} else {
				returnText = "\n"+lineTextExtent+"\n";
			}
		} else {
			if (data.num == 0) {
				returnText = lineText+"\n";
			} else {
				returnText = "\n"+lineText+"\n";
			}
		}
		
		return returnText;
	},

	generateText: function() {
		this.hideFirstPage();
		this.buildWeekData('text');
	}, 
	
	hideFirstPage: function() {
		$('#picker-wrapper').hide();
		$('#result').removeClass('hide');
		$('#note').removeClass('hide');
		$('#reset').removeClass('hide');
	},

	copyText: function(element) {
	  var text = $(element).clone().find('br').prepend('\r\n').end().text()
	  element = $('<textarea>').appendTo('body').val(text).select()
	  document.execCommand('copy')
	  element.remove()

	  $(".copy-final").removeClass("hide");
	},

	init: function() {
		//get current radio
		this.getCurrentRadio();

		this.buildWeekData();
		$('.currentTime').html(this.buildCurrentTime());
	}
};


$(function(){
	scheduler.init();

	$('input[type=radio][name=timezone]').change(function() {
        scheduler.currentTime = this.value
        var styleName = scheduler.lookUpTimeName(this.value)
        $('.ind-wrapper').removeClass().addClass('ind-wrapper').addClass(styleName)
	});

	$('.ct-list li, .ct-list li label').on('click', function(event) {
	  var $this = $(this);
	  event.stopPropagation();
	  $('.ct-list li').removeClass('active');
	  if ($this[0].localName == 'li') {
	  	$this.addClass('active');
	  } else {
	  	$this.parent().addClass('active');
	  }


	});

});
