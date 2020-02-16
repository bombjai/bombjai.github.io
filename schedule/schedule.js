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
		"usEast": "America/New_York",
		"eu": "Europe/Paris",
	},
	itemList: ["Nothing (no activity display)", "PC Stream (電腦實況, 컴터방송)", "Outdoor Stream (戶外實況, 야외방송)", "Short Stream (短實況, 짧방송)", "No Stream (沒有實況, 휴방)"],

	getWeek: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format('ddd').toUpperCase();
	},

	getWeekFull: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format('dddd');
	},

	getDay: function(day) {
		return moment().add(day, 'days').tz(this.currentTime).format("MM/DD");
	},

	getDayCont: function(day, zone, obj) {
		var today =  moment().add(day, 'days').tz(zone).format("YYYY-MM-DD");
		var fullDay = obj[zone]
		var currentTime = moment.tz(fullDay, zone).tz(zone).format('MM/DD');

		//console.log('cdscas: ', fullDay , currentTime )

		return currentTime;
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
		} else if (name == this.constant.usEast) {
			return "usEast-style";
		}
	},

	buildCurrentTime: function() {
		return "<div><ul class='ct-list'>"
			   + "<li><label for='tw-radio'><span class='bold'>Taiwan</span>: "+ this.getCurrent(this.constant.tw) +"</label></li>"
			   + "<li class='active'><label for='ko-radio'><span class='bold'>Korea</span>: "+ this.getCurrent(this.constant.ko) +"</label></li>"
			   + "<li><label for='us-radio'><span class='bold'>US (PST)</span>: "+ this.getCurrent(this.constant.us) +"</label></li>"
			   + "<li><label for='usEast-radio'><span class='bold'>US (EST)</span>: "+ this.getCurrent(this.constant.usEast) +"</label></li>"
			   + "<li><label for='eu-radio'><span class='bold'>Europe</span>: "+ this.getCurrent(this.constant.eu) +"</label></li>"
			   + "</ul></div>"

	},

	buildWeekData: function(opt) {
		var data = {};

		for (var i = -1, length = this.weekNum; i < length; i++) {
			data.day = this.getDay(i);
			data.week = this.getWeek(i);
			data.fullWeek = this.getWeekFull(i);
			data.fullday = this.getFullDay(i);
			data.num = i;

			if (opt == 'text') {
				$('.copy').append('<div class="copy-style copy-'+i+'"></div>')
				data.textOnly = true;
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

		$('.individual-'+data.num).append('<div class="space">Hour: '+ddHourList+' </div>');
		$('.individual-'+data.num).append('<div class="card-detail-wrapper hide"><span class="space hide-list opt">Min: '+ddMinList+' </span><span class="space hide-list opt"><label>Estimated (eg.12-1pm): '+ckbox+' </label></span></div>');
		this.buildScheduleCard(data.num);
	},

	buildTextSchedule: function(data) {
		var dateInfo = '<span class="copy-breaker"> __**<strong>'+ data.fullWeek +'</strong> </span>';
		
		var selDDLval = $('.select-list-'+data.num).val();
		if (data.textOnly && selDDLval.indexOf('Nothing') > -1) {
			selDDLval = "&nbsp;";
		}
		var actInfo = '<span class="act-info"><strong>'+selDDLval+'</strong>**__</span>';
		var timeInfo = '<div class="time">'+this.buildTimeZone(data, actInfo)+'</div>';

		$('.copy-'+data.num).append(dateInfo + actInfo + timeInfo +"<br/>");
	},


	buildDropDown: function(i) {
		var itemList = this.itemList;

		for (var k = 0, length = itemList.length; k < length; k++) {
			$('.select-list-'+i).append('<option val="'+k+'">'+itemList[k]+'</option>');
		}
	},

	buildScheduleCard: function(i) {
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
			usWest = "", usWestExtend = "",
			usEast = "", usEastExtend = "",
			koTime = "", koTimeExtend = "",
			twTime = "", twTimeExtend = "",
			euTime = "", euTimeExtend = "";
			var now = "";

		var fullDay = today + " " + hour + ":" + min + ":00";
		var isChecked = $('#estimate-'+data.num).is(":checked");
		//var thisday = moment(fullDay);

		//the right way
		//https://stackoverflow.com/questions/40401543/get-timezone-from-users-browser-using-momenttimezone-js
		var currentTime = moment.tz(fullDay, this.currentTime);
			koTime = currentTime.tz(this.constant.ko).format('hh:mma');
			twTime = currentTime.tz(this.constant.tw).format('hh:mma');
			usWest = currentTime.tz(this.constant.us).format('hh:mma');
			usEast = currentTime.tz(this.constant.usEast).format('hh:mma');
			euTime = currentTime.tz(this.constant.eu).format('hh:mma');

		var curTimeObj = {
			"Asia/Seoul": currentTime.tz(this.constant.ko),
			"Asia/Taipei": currentTime.tz(this.constant.tw),
			"America/Los_Angeles": currentTime.tz(this.constant.us),
			"America/New_York": currentTime.tz(this.constant.usEast),
			"Europe/Paris": currentTime.tz(this.constant.eu)
		}

		var currentTimeExtend = moment.tz(fullDay, this.currentTime).add(1, 'hours');
			koTimeExtend = currentTimeExtend.tz(this.constant.ko).format('hh:mma');
			twTimeExtend = currentTimeExtend.tz(this.constant.tw).format('hh:mma');
			usWestExtend = currentTimeExtend.tz(this.constant.us).format('hh:mma');
			usEastExtend = currentTimeExtend.tz(this.constant.usEast).format('hh:mma');
			euTimeExtend = currentTimeExtend.tz(this.constant.eu).format('hh:mma');

			//console.log('data: ', data, ' atc: ', act)



		var lineText = "<img src='https://discordapp.com/assets/b57d2718c0f2330c0e06166d4b5fb606.svg' aria-label=':flag_kr:' alt=':flag_kr:' /> " +  koTime + " ("+ this.getDayCont(data.num, this.constant.ko, curTimeObj) +")"
						+ "<br/> <img src='https://discordapp.com/assets/9a866b52de950f63b2a345271a2a54b7.svg' aria-label=':flag_tw:' alt=':flag_tw:' /> " + twTime + " ("+ this.getDayCont(data.num, this.constant.tw, curTimeObj) +")"
						+ "<br/> <img src='https://discordapp.com/assets/4be7421b4e5f8718344dffd8549333e9.svg' aria-label=':flag_eu:' alt=':flag_eu:' /> " + euTime + " CET ("+ this.getDayCont(data.num, this.constant.eu, curTimeObj) +") "
						+ "<br/> <img src='https://discordapp.com/assets/d788b9231ed2028dc29245f76cf0a415.svg' aria-label=':flag_us:' alt=':flag_us:' /> " + usWest + " PST ("+ this.getDayCont(data.num, this.constant.us, curTimeObj) +")"
						+ "/" + usEast + " EST ("+ this.getDayCont(data.num, this.constant.usEast, curTimeObj)
						+")";

		//var lineTextExtent = "(台灣時間 " + twTime+"-"+twTimeExtend +", 한국시간 " + koTime+"-"+koTimeExtend + ", EST " + usEast+"-"+usEastExtend + ", PST " + usWest+"-"+usWestExtend + ", CET " + euTime+"-"+euTimeExtend +")";
		var lineTextExtent = "<img src='https://discordapp.com/assets/b57d2718c0f2330c0e06166d4b5fb606.svg' aria-label=':flag_kr:' alt=':flag_kr:' /> " +  koTime+"-"+koTimeExtend + " ("+ this.getDayCont(data.num, this.constant.ko, curTimeObj) +")"
						+ "<br/> <img src='https://discordapp.com/assets/9a866b52de950f63b2a345271a2a54b7.svg' aria-label=':flag_tw:' alt=':flag_tw:' /> " + twTime+"-"+twTimeExtend + " ("+ this.getDayCont(data.num, this.constant.tw, curTimeObj) +")"
						+ "<br/> <img src='https://discordapp.com/assets/4be7421b4e5f8718344dffd8549333e9.svg' aria-label=':flag_eu:' alt=':flag_eu:' /> " + euTime+"-"+euTimeExtend + " CET ("+ this.getDayCont(data.num, this.constant.eu, curTimeObj) +") "
						+ "<br/> <img src='https://discordapp.com/assets/d788b9231ed2028dc29245f76cf0a415.svg' aria-label=':flag_us:' alt=':flag_us:' /> " + usWest+"-"+usWestExtend + " PST ("+ this.getDayCont(data.num, this.constant.us, curTimeObj) +")"
						+ "/" + usEast+"-"+usEastExtend + " EST ("+ this.getDayCont(data.num, this.constant.usEast, curTimeObj)
						+")";

		var returnText = "";

		if (act.indexOf("No Stream") > -1) {
			return "\n";
		} else if (act.indexOf("&nbsp;") > -1) {
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

	goBackBtn: function() {
		this.goBackFirstPage();
	},
	
	hideFirstPage: function() {
		$('#picker-wrapper').hide();
		$('#result').removeClass('hide');
		$('#note').removeClass('hide');
		$('#reset').removeClass('hide');
		$('#goBack').removeClass('hide');
	},

	goBackFirstPage: function() {
		$('#picker-wrapper').show();
		$('#result').addClass('hide');
		$('#note').addClass('hide');
		$('#reset').addClass('hide');
		$('#goBack').addClass('hide');
		$('#copy').html("");
	},

	toggleCardDetail: function() {
		//$('.opt').toggle();

		if ( $('.card-detail-wrapper').hasClass('hide')) {
			$('.card-detail-wrapper').removeClass('hide');
		    $('.c-detail-title').text('Hide');
		} else {
			$('.card-detail-wrapper').addClass('hide');
			$('.c-detail-title').text('Show');
		}
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
