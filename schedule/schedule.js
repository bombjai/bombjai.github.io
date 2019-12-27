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

	buildCurrentTime: function() {
		return "<div><ul class='ct-list'>"
			   + "<li><span class='bold'>Korea</span>: "+ this.getCurrent(this.constant.ko) +"</li>"
			   + "<li><span class='bold'>Taiwan</span>: "+ this.getCurrent(this.constant.tw) +"</li>"
			   + "<li><span class='bold'>US</span>: "+ this.getCurrent(this.constant.us) +"</li>"
			   + "<li><span class='bold'>Europe</span>: "+ this.getCurrent(this.constant.eu) +"</li>"
			   +"</ul></div>"

	},

	buildWeekData: function(opt) {
		var data = {};

		for (var i = 0, length = this.weekNum; i < length; i++) {
			data.day = this.getDay(i);
			data.week = this.getWeek(i);
			data.fullday = this.getFullDay(i);
			data.num = i;

			if (opt == 'text') {
				$('.copy').append('<div class="copy-style copy-'+i+'"></div>')

				this.buildTextSchedule(data);
			} else {
				$('.ind-wrapper').append('<div class="indv individual-'+i+'"></div>')

				this.buildWeekTemplate(data);
			}
			//reset obj
			data = {};
		}
	},

	buildWeekTemplate: function(data) {
		var ddList = '<select class="thingList select-list-'+data.num+'"></select>',
		 	ddHourList = '<select class="hourList hour-list-'+data.num+'"></select>',
		 	ddMinList = '<select class="minList min-list-'+data.num+'"></select>';

		$('.individual-'+data.num).append('<div class="day-breaker">'+ data.day + ' (' + data.week + ') - </div>');
		$('.individual-'+data.num).append('<span>Activity: '+ddList+' </span>');		
		this.buildDropDown(data.num);

		$('.individual-'+data.num).append('<span class="space">Hour: '+ddHourList+' </span>');
		$('.individual-'+data.num).append('<span class="space">Min: '+ddMinList+' </span>');
		this.buildSchedule(data.num);
	},

	buildTextSchedule: function(data) {
		var dateInfo = '<span class="copy-breaker">'+ data.day + ' (' + data.week + ') - </span>';
		var actInfo = '<span>'+$('.select-list-'+data.num).val()+'</span>'
		var timeInfo = '<div class="time">'+this.buildTimeZone(data)+'</div>'

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
				$('.hour-list-'+i).append('<option val="0'+counter+'">0'+counter+'</option>');
			}
			else if (counter == 12) {
				$('.hour-list-'+i).append('<option selected val="'+counter+'">'+counter+'</option>');
			}
			else {
				$('.hour-list-'+i).append('<option val="'+counter+'">'+counter+'</option>');
			}
		  counter++;
		}
	},

	buildTimeZone: function(data) {

		var today = this.getFullDay(data.num),
			hour = $('.hour-list-'+data.num).val().toString(), 
			min = $('.min-list-'+data.num).val().toString(),
			usTime = "",
			koTime = "",
			twTime = "",
			euTime = "",
			lineText = "";


		var fullDay = today + " " + hour + ":" + min + ":00";
		//var thisday = moment(fullDay);

		if (this.currentTime == "Asia/Seoul") {
			twTime = moment(fullDay).subtract(1, 'hours').format("ha");
			koTime = moment(fullDay).format("ha");
			usTime = moment(fullDay).subtract(17, 'hours').format("ha");
			euTime = moment(fullDay).subtract(8, 'hours').format("ha");
		}


		// console.log("full dat", fullDay);
		// console.log("thid dat", thisday);
		// console.log('korean ', moment.tz(thisday, "Asia/Seoul").format("ha"));
		// console.log('us ',  moment.tz(thisday, "America/Los_Angeles").format("ha"));
		//console.log('us ', moment(fullDay).tz(this.constant.us).format("HH"))


		if (data.num == 0) {
			lineText = "(台灣時間 " + twTime +", 한국시간 " + koTime + "시, PST " + usTime + ", CET " + euTime +")\n";
		} else {
			lineText = "\n(台灣時間 " + twTime +", 한국시간 " + koTime + "시, PST " + usTime + ", CET " + euTime +")\n";
		}
		
		return lineText;

	},

	generateText: function() {
		$('#picker-wrapper').hide();
		$('#result').removeClass('hide');

		this.buildWeekData('text');
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
	$('input[type=radio][name=timezone]').change(function() {
        scheduler.currentTime = this.value
	});

	scheduler.init();
});
