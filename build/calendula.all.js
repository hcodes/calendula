var Calendula=function(t,e){"use strict";function n(t){return(10>t?"0":"")+t}function i(t){return(t%4||!(t%100))&&t%400?!1:!0}var a="calendula",s=0,o=11,r=function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},h=function(t){t=r({},t||{});var e=(new Date,this._prepareYears(t.years)),n=this;this._data=r(t,{autoclose:"undefined"==typeof t.autoclose?!0:t.autoclose,closeAfterSelection:"undefined"==typeof t.closeAfterSelection?!0:t.closeAfterSelection,locale:t.locale||h._defaultLocale,theme:t.theme||"default",min:this._parseDateToObj(t.min),max:this._parseDateToObj(t.max),_startYear:e.start,_endYear:e.end}),this._domEvent=new g,this.val(this._data.value);var i=this.setting("button");i&&this._domEvent.on(i,"click",function(){n.toggle()},"init")};h.version="0.9.0",r(h.prototype,{isOpened:function(){return this._isOpened},open:function(){var t=this;return this._init(),this._ignoreDocumentClick=!0,this.isOpened()||(this._timeout.set(function(){_(t._container,c("opened")),t._update(),t._monthSelector(t._currentDate.month,!1),t._yearSelector(t._currentDate.year,!1),t._openedEvents()},1,"open"),this._isOpened=!0,this.trigger("open")),this},close:function(){return this._init(),this.isOpened()&&(this._ignoreDocumentClick=!1,this._timeout.clearAll("open"),this._update(),this._delOpenedEvents(),m(this._container,c("opened")),this._isOpened=!1,this.trigger("close")),this},toggle:function(){return this.isOpened()?this.close():this.open(),this},val:function(t){return arguments.length?(t?(this._val=this._parseDateToObj(t),this._currentDate=r({},this._val)):(this._val={},this._currentDate=this._current()),this._container&&this._updateSelection(),void this._updateButton()):this._val},setting:function(t,e){if(1===arguments.length)return this._data[t];var n=this._data[t],i=this._container,a={min:!0,max:!0,locale:!0};return this._data[t]="min"===t||"max"===t||"value"===t?this._parseDateToObj(e):e,i&&("theme"===t&&(m(i,c("theme",n)),_(i,c("theme",e))),a[t]&&this._rebuild()),this},destroy:function(){this._isInited&&(this.close(),this._timeout.clearAll(),this._eventBuf=[],this._domEvent.offAll(),e.body.removeChild(this._container),["_container","_data","_domEvent","_ignoreDocumentClick","_isInited","_isOpened","_timeout"].forEach(function(t){delete this[t]},this))},_init:function(){if(!this._isInited){this._isInited=!0,this._timeout=new p,this._templates.parent=this;var t=this.setting("id"),n=e.createElement("div");this._container=n,t&&(n.id=t),_(n,a),_(n,c("theme",this._data.theme)),this._rebuild(),e.body.appendChild(n)}},_current:function(){var t=new Date;return{day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}},_update:function(){this._init();var t,e=this.setting("button");e&&(t=this._offset(e),t.top+=e.offsetHeight,this._position(this._container,t))},_resize:function(){this._update()},_rebuild:function(){this._container.innerHTML=this.template("main")},_rebuildDays:function(){this._elem("days-container").innerHTML=this._templates.prepare(this._templates.days(this._currentDate.year)),this._monthSelector(this._currentDate.month,!1)},_openedEvents:function(){var n=this;this._ignoreDocumentClick=!1,this._domEvent.on(e,"click",function(t){!t.button&&n.setting("autoclose")&&(n._ignoreDocumentClick?n._ignoreDocumentClick=!1:n.close())},"open"),this._domEvent.on(t,"resize",function(){n._resize()},"open"),this._domEvent.on(e,"keypress",function(t){27===t.keyCode&&n.close()},"open"),this._domEvent.on(this._container,"click",function(t){t.button||(n._ignoreDocumentClick=!0)},"open");var i=this._elem("days"),a=this._elem("months"),s=this._elem("years");this._onwheelmonths=function(t){var e=0;t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e&&(n._monthSelector(n._currentDate.month+e,!0),t.preventDefault())},this._onwheelyears=function(t){var e=0;t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e&&(n._yearSelector(n._currentDate.year+e,!0),t.preventDefault())},this._domEvent.onWheel(i,this._onwheelmonths,"open"),this._domEvent.onWheel(a,this._onwheelmonths,"open"),this._domEvent.onWheel(s,this._onwheelyears,"open"),this._domEvent.on(a,"click",function(t){t.button||y(t.target,l("month"))&&n._monthSelector(+d(t.target,"month"),!0)},"open"),this._domEvent.on(s,"click",function(t){if(!t.button){var e=d(t.target,"year");e&&n._yearSelector(+e,!0)}},"open"),this._domEvent.on(i,"click",function(t){if(!t.button){var e=l("day","selected"),a=n._currentDate,s=t.target,o=d(s,"day"),r=d(s,"month");if(o){if(y(s,l("day","minmax")))return;if(!y(s,e)){a.day=+o,a.month=+r;var h=i.querySelector("."+e);h&&m(h,e),_(s,e),n.trigger("select",{day:a.day,month:a.month,year:a.year}),n.setting("closeAfterSelection")&&n.close()}}}},"open")},_monthSelector:function(t,e){s>t?t=s:t>o&&(t=o),this._currentDate.month=t;var n,i=this._elem("months"),a=this._elem("month").offsetHeight,r=this._elemAll("days-month"),h=this._elem("month-selector"),c=this._elem("days-container"),u=this._elem("days"),d=l("days","noanim"),f=l("months","noanim");e||(_(u,d),_(i,f));var y=Math.floor(this._currentDate.month*a-a/2);0>=y&&(y=1),y+h.offsetHeight>=i.offsetHeight&&(y=i.offsetHeight-h.offsetHeight-1),this._top(h,y),n=-Math.floor(r[t].offsetTop-u.offsetHeight/2+r[t].offsetHeight/2),n>0&&(n=0);var p=u.offsetHeight-c.offsetHeight;p>n&&(n=p),this._top(c,n),this._colorizeMonths(t),e||this._timeout.set(function(){m(u,d),m(i,f)},0,"anim")},_yearSelector:function(t,e){var n=this._data,i=n._startYear,a=n._endYear,s=this._currentDate.year;i>t?t=i:t>a&&(t=a),this._currentDate.year=t;var o=this._elem("years"),r=this._elem("years-container"),h=this._elem("year").offsetHeight,c=this._elem("year-selector"),i=this._data._startYear,a=this._data._endYear,u=l("years","noanim");e||_(o,u);var d=Math.floor((this._currentDate.year-i)*h),f=-Math.floor((this._currentDate.year-i)*h-o.offsetHeight/2);f>0&&(f=0),f<o.offsetHeight-r.offsetHeight&&(f=o.offsetHeight-r.offsetHeight);var y=0;o.offsetHeight>=r.offsetHeight&&((a-i+1)%2&&(y=h),f=Math.floor((o.offsetHeight-r.offsetHeight-y)/2)),t!==s&&this._rebuildDays(t),this._top(c,d),this._top(r,f),this._colorizeYears(t),e||this._timeout.set(function(){m(o,u)},0,"anim")},_colorizeMonths:function(t){for(var e=this._elemAll("month"),n=5,i=0;n>i;i++)for(var a=this._elemAll("month","color",i),r=0,h=a.length;h>r;r++)m(a[r],l("month","color",i));var c=l("month","color","0");_(e[t],c),t-1>=s&&_(e[t-1],c),o>=t+1&&_(e[t+1],c);var u=1;for(i=t-2;i>=s&&n>u;i--,u++)_(e[i],l("month","color",u));for(u=1,i=t+2;o>=i&&n>u;i++,u++)_(e[i],l("month","color",u))},_colorizeYears:function(t){for(var e=this._elemAll("year"),n=this._data._startYear,i=5,a=0;i>a;a++)for(var s=this._elemAll("year","color",a),o=0,r=s.length;r>o;o++)m(s[o],l("year","color",a));_(e[t-n],l("year","color","0"));var h=1;for(a=t-1;a>=this._data._startYear&&i>h;a--,h++)_(e[a-n],l("year","color",h));for(h=1,a=t+1;a<=this._data._endYear&&i>h;a++,h++)_(e[a-n],l("year","color",h))},_delOpenedEvents:function(){this._domEvent.offAll("open")},_prepareYears:function(t){var e,n,i,a=this._current();return"string"==typeof t&&(e=t.trim().split(/[:,; ]/),n=parseInt(e[0],10),i=parseInt(e[1],10),isNaN(n)||isNaN(i)||(Math.abs(n)<1e3&&(n=a.year+n),Math.abs(i)<1e3&&(i=a.year+i))),{start:n||a.year-11,end:i||a.year+1}},_updateSelection:function(){var t,e=this._elem("day","selected");e&&m(e,l("day","selected")),this._currentDate.year===this._val.year&&(t=this._elemAll("days-month"),t&&t[this._val.month]&&(e=this._elemAllContext(t[this._val.month],"day"),e&&e[this._val.day-1]&&_(e[this._val.day-1],l("day","selected"))))},_updateButton:function(){var t,e=this.setting("button"),n=this._buttonText();e&&(t=e.tagName.toLowerCase(),"input"===t||"textarea"===t?e.value=n:e.innerHTML=n)},_buttonText:function(){var t=this._currentDate,e=this.text("months"),n=this.text("caseMonths");return t.day+" "+(n||e)[t.month]+" "+t.year}});var l=function(t,e,n){return(null===n||void 0===n)&&(n=""),a+"__"+t+(e?"_"+e+(""===n?"":"_"+n):"")},c=function(t,e){return(null===e||void 0===e)&&(e=""),a+"_"+t+(""===e?"":"_"+e)},u=e.createElement("div"),d=u.dataset?function(t,e){return t.dataset[e]}:function(t,e){return t.getAttribute("data-"+e)},f=!!u.classList,_=f?function(t,e){return t.classList.add(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");n.test(e.className)||(t.className=(t.className+" "+e).replace(/\s+/g," ").replace(/(^ | $)/g,""))},m=f?function(t,e){return t.classList.remove(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");t.className=t.className.replace(n,"$1").replace(/\s+/g," ").replace(/(^ | $)/g,"")},y=f?function(t,e){return t.classList.contains(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");return-1!==t.className.search(n)};r(h.prototype,{_elem:function(t,e,n){return this._container.querySelector("."+l(t,e,n))},_elemContext:function(t,e,n,i){return t.querySelector("."+l(e,n,i))},_elemAll:function(t,e,n){return this._container.querySelectorAll("."+l(t,e,n))},_elemAllContext:function(t,e,n,i){return t.querySelectorAll("."+l(e,n,i))},_left:function(t,e){t.style.left=e+"px"},_top:function(t,e){t.style.top=e+"px"},_position:function(t,e){this._left(t,e.left),this._top(t,e.top)},_offset:function(n){var i={top:0,left:0};return"undefined"!=typeof n.getBoundingClientRect&&(i=n.getBoundingClientRect()),{top:i.top+(t.pageYOffset||e.scrollTop||0)-(e.clientTop||0),left:i.left+(t.pageXOffset||e.scrollLeft||0)-(e.clientLeft||0)}}});var p=function(){};r(p.prototype,{set:function(t,e,n){this._buf=this._buf||[];var i=setTimeout(t,e);return this._buf.push({id:i,ns:n}),i},clear:function(t){this._buf&&this._buf.forEach(function(e,n){e.id===t&&(clearTimeout(t),this._buf.slice(n,1))},this)},clearAll:function(t){this._buf&&this._buf.forEach(function(e,n){t?t===e.ns&&(clearTimeout(e.id),this._buf.slice(n,1)):this._buf.slice(n,1)},this)}});var v="onwheel"in e.createElement("div")?"wheel":void 0!==e.onmousewheel?"mousewheel":"DOMMouseScroll";r(h.prototype,{on:function(t,e){return t&&e&&(this._eventBuf=this._eventBuf||[],this._eventBuf.push({type:t,callback:e})),this},off:function(t,e){return this._eventBuf&&this._eventBuf.forEach(function(n,i){t===n.type&&e===n.callback&&this._eventBuf.slice(i,1)}),this},trigger:function(t){var e=arguments;return t&&this._eventBuf&&this._eventBuf.forEach(function(n){t===n.type&&n.callback.apply(this,[{type:t}].concat(Array.prototype.slice.call(e,1)))},this),this}});var g=function(){};return r(g.prototype,{onWheel:function(e,n,i){return this.on(e,"DOMMouseScroll"===v?"MozMousePixelScroll":v,"wheel"===v?n:function(e){e||(e=t.event);var i={originalEvent:e,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"===e.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}},a=-1/40;return"mousewheel"===v?(i.deltaY=a*e.wheelDelta,e.wheelDeltaX&&(i.deltaX=a*e.wheelDeltaX)):i.deltaY=e.detail,n(i)},i),this},on:function(t,e,n,i){return t&&e&&n&&(t.addEventListener(e,n,!1),this._buf=this._buf||[],this._buf.push({elem:t,type:e,callback:n,ns:i})),this},off:function(t,e,n,i){return t&&e&&n&&this._buf&&this._buf.forEach(function(a,s){a&&a.type===e&&a.elem===t&&a.callback===n&&a.ns===i&&(t.removeEventListener(e,n,!1),this._buf.slice(s,1))},this),this},offAll:function(t){return this._buf&&(this._buf.forEach(function(e){e&&this.off(e.elem,e.type,e.callback,t||e.ns)},this),t||(this._buf=[])),this}}),r(h.prototype,{template:function(t){return this._templates[t]()},_templates:{prepare:function(t){return t.replace(/\$/g,a+"__")},attr:function(t,e){return""===t||null===t||void 0===t?"":" "+t+'="'+e+'"'},days:function(t){for(var e="",n=s;o>=n;n++)e+=this.month(n,t);return e},weekdays:function(){for(var t=this.parent.text("firstWeekDay")||0,e={first:t,last:t?t-1:6},n=t,i=0;7>i;i++)e[n]=i,n++,n>6&&(n=0);return e},month:function(t,e){var a=new Date(e,t,1,12,0,0,0),s=a.getTime(),o=new Date,r=function(t,e,n){var i=_._val;return t===i.day&&e===i.month&&n===i.year},h=function(t){return t.year?new Date(t.year,t.month,t.day,12,0,0,0).getTime():null},l=function(){var i=!1,a=parseInt(""+D.year+n(D.month),10),s=parseInt(""+b.year+n(b.month),10),o=parseInt(""+e+n(t),10);return(D&&a>o||b&&o>s)&&(i=!0),'<div class="$days-title-month'+(i?" $days-title-month_minmax":"")+'">'+v+"</div>"};o.setHours(12),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0);var c,u,d,f,_=this.parent,m=a.getDay(),y=this.weekdays(),p=y[m],v=_.text("months")[t],g=[31,i(e)?29:28,31,30,31,30,31,31,30,31,30,31],D=_.setting("min"),b=_.setting("max"),k=h(D),w=h(b),M=o.getTime(),E=[];E.push('<div class="$days-month">'),3>p&&E.push(l()),E.push('<table class="$days-table"><tr>'),m!==y.first&&E.push('<td colspan="'+p+'" class="$empty">'+(3>p?"":l())+"</td>");for(var $=1;$<=g[t];$++)u="",c=!1,a.setDate($),m=a.getDay(),d=this.parent.getHoliday($,t,e),f=["$day"],f.push(0===m||6===m?"$day_holiday":"$day_workday"),0===d?f.push("$day_nonholiday"):1===d&&f.push("$day_highday"),r($,t,e)&&f.push("$day_selected"),M===s&&(f.push("$day_now"),u=_.text("today")),(k&&k>s||w&&s>w)&&f.push("$day_minmax"),E.push("<td"+this.attr("title",u)+' class="'+f.join(" ")+'" data-month="'+t+'" data-day="'+$+'">'+$+"</td>"),m===y.last&&(E.push("</tr>"),c=!0);return c||E.push("</tr>"),E.push("</table></div>"),E.join("")},years:function(){for(var t='<div class="$year-selector"><div class="$year-selector-i"></div></div>',e=this.parent._data._startYear,n=this.parent._data._endYear,i=e;n>=i;i++)t+='<div class="$year" data-year="'+i+'">'+i+"</div>";return t},months:function(){var t='<div class="$month-selector"><div class="$month-selector-i"></div></div>';return this.parent.text("months").forEach(function(e,n){t+='<div class="$month" data-month="'+n+'">'+e+"</div>"}),t},main:function(){var t=(this.parent.text("shortWeekDays"),this.parent.text("firstWeekDay")||0),e="";return this.parent.text("shortWeekDays").forEach(function(n,i,a){e+='<div class="$short-weekdays-cell $short-weekdays-cell_n_'+t+'"'+this.attr("title",a[t])+">"+a[t]+"</div>",t++,t>6&&(t=0)},this),this.prepare('<div class="$short-weekdays">'+e+'</div><div class="$container"><div class="$days">    <div class="$days-container">'+this.days(this.parent._currentDate.year)+'</div></div><div class="$months">'+this.months()+'</div><div class="$years"><div class="$years-container">'+this.years()+"</div></div></div>")}}}),r(h,{addHolidays:function(t,e){this._holidays=this._holidays||{},this._holidays[t]=e}}),h.prototype.getHoliday=function(t,e,n){var i=this._data.locale,a=h._holidays;return a&&a[i]&&a[i][n]?a[i][n][t+"-"+(e+1)]:void 0},r(h.prototype,{_parseDate:function(t){var e,n,i=null;return t&&("string"==typeof t?(e=/^\s*(\d{4})[-/.](\d\d)(?:[-/.](\d\d))?\s*$/.exec(t),e?n=[e[3],e[2]-1,e[1]]:(e=/^\s*(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{4}|\d\d))?\s*$/.exec(t),e&&(n=[e[1],e[2]-1,e[3]])),n&&(i=new Date(parseInt(n[2],10),parseInt(n[1],10),parseInt(n[0],10)))):"object"==typeof t?t instanceof Date?i=t:t.year&&t.day&&(i=new Date(t.year,t.month-1,t.day,12,0,0,0)):"number"==typeof number&&(i=new Date(t))),i},_parseDateToObj:function(t){var e=this._parseDate(t);return e?{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}:{}}}),r(h,{_texts:{},_locales:[],addLocale:function(t,e){this._locales.push(t),this._texts[t]=e,e.def&&(this._defaultLocale=t)}}),h.prototype.text=function(t){return h._texts[this._data.locale][t]},h.addLocale("be",{months:["студзень","люты","сакавік","красавік","май","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],caseMonths:["студзеня","лютага","сакавіка","красавіка","траўня","траўня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня"],shortWeekDays:["Н","П","А","С","Ч","П","С"],today:"Сення",firstWeekDay:1}),h.addLocale("de",{months:["Januar","Februar","Marz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],shortWeekDays:["So","Mo","Di","Mi","Do","Fr","Sa"],today:"Heute",firstWeekDay:1}),h.addLocale("en",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortWeekDays:["Su","Mo","Tu","We","Th","Fr","Sa"],today:"Today",firstWeekDay:0,def:!0}),h.addLocale("es",{months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],shortWeekDays:["Do","Lu","Ma","Mi","Ju","Vi","Sá"],today:"Hoy",firstWeekDay:1}),h.addLocale("fr",{months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],shortWeekDays:["Di","Lu","Ma","Me","Je","Ve","Sa"],today:"Aujourd’hui",firstWeekDay:1}),h.addLocale("it",{months:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],shortWeekDays:["Do","Lu","Ma","Me","Gi","Ve","Sa"],today:"Oggi",firstWeekDay:1}),h.addLocale("pl",{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],caseMonths:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"],shortWeekDays:["N","P","W","Ś","C","P","S"],today:"Dziś",firstWeekDay:1}),h.addLocale("ru",{months:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],caseMonths:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],shortWeekDays:["В","П","В","С","Ч","П","С"],today:"Сегодня",firstWeekDay:1}),h.addLocale("tr",{months:["ocak","şubat","mart","nisan","mayıs","haziran","temmuz","ağustos","eylül","ekim","kasım","aralık"],shortWeekDays:["Pa","PT","Sa","Çarş","Per","CU","Ctesi"],today:"Bugün",firstWeekDay:1}),h.addLocale("uk",{months:["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"],caseMonths:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],shortWeekDays:["Н","П","В","С","Ч","П","С"],today:"Сьогодні",firstWeekDay:1}),h}(this,this.document);