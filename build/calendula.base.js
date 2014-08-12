var Calendula=function(t,e){"use strict";function n(t){return(t%4||!(t%100))&&t%400?!1:!0}var i="calendula",s=0,o=11,a=function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},r=function(t){t=a({},t||{});var e=(new Date,this._prepareYears(t.years)),n=this;this._data=a(t,{autoclose:"undefined"==typeof t.autoclose?!0:t.autoclose,closeAfterSelection:"undefined"==typeof t.closeAfterSelection?!0:t.closeAfterSelection,locale:t.locale||r._defaultLocale,theme:t.theme||"default",_startYear:e.start,_endYear:e.end}),this._domEvent=new v,this.val(this._data.value);var i=this.setting("button");i&&this._domEvent.on(i,"click",function(){n.toggle()},"init")};r.version="0.9.0",a(r.prototype,{isOpened:function(){return this._isOpened},open:function(){var t=this;return this._init(),this._ignoreDocumentClick=!0,this.isOpened()||(this._timeout.set(function(){_(t._container,l("opened")),t._update(),t._monthSelector(t._currentDate.month,!1),t._yearSelector(t._currentDate.year,!1),t._openedEvents()},1,"open"),this._isOpened=!0,this.trigger("open")),this},close:function(){return this._init(),this.isOpened()&&(this._ignoreDocumentClick=!1,this._timeout.clearAll("open"),this._update(),this._delOpenedEvents(),d(this._container,l("opened")),this._isOpened=!1,this.trigger("close")),this},toggle:function(){return this.isOpened()?this.close():this.open(),this},val:function(t){var e;return arguments.length?(t?(e=this._parseDate(t),this._val={day:e.getDate(),month:e.getMonth(),year:e.getFullYear()},this._currentDate=a({},this._val)):(this._val={},this._currentDate=this._current()),void(this._container&&this._updateSelection())):this._val},setting:function(t,e){if(1===arguments.length)return this._data[t];var n=this._data[t],i=this._container;return this._data[t]=e,i&&("theme"===t&&(d(i,l("theme",n)),_(i,l("theme",e))),"locale"===t&&this._rebuild()),this},destroy:function(){this._isInited&&(this.close(),this._timeout.clearAll(),this._eventBuf=[],this._domEvent.offAll(),e.body.removeChild(this._container),["_container","_data","_domEvent","_ignoreDocumentClick","_isInited","_isOpened","_timeout"].forEach(function(t){delete this[t]},this))},_init:function(){if(!this._isInited){this._isInited=!0,this._timeout=new m,this._templates.parent=this;var t=e.createElement("div");this._container=t,_(t,i),_(t,l("theme",this._data.theme)),this._rebuild(),e.body.appendChild(t)}},_current:function(){var t=new Date;return{day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}},_update:function(){this._init();var t,e=this.setting("button");e&&(t=this._offset(e),t.top+=e.offsetHeight,this._position(this._container,t))},_resize:function(){this._update()},_rebuild:function(){this._container.innerHTML=this.template("main")},_rebuildDays:function(){this._elem("days-container").innerHTML=this._templates.prepare(this._templates.days(this._currentDate.year)),this._monthSelector(this._currentDate.month,!1)},_openedEvents:function(){var n=this;this._ignoreDocumentClick=!1,this._domEvent.on(e,"click",function(t){!t.button&&n.setting("autoclose")&&(n._ignoreDocumentClick?n._ignoreDocumentClick=!1:n.close())},"open"),this._domEvent.on(t,"resize",function(){n._resize()},"open"),this._domEvent.on(e,"keypress",function(t){27===t.keyCode&&n.close()},"open"),this._domEvent.on(this._container,"click",function(t){t.button||(n._ignoreDocumentClick=!0)},"open");var i=this._elem("days"),s=this._elem("months"),o=this._elem("years");this._onwheelmonths=function(t){var e=0;t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e&&(n._monthSelector(n._currentDate.month+e,!0),t.preventDefault())},this._onwheelyears=function(t){var e=0;t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e&&(n._yearSelector(n._currentDate.year+e,!0),t.preventDefault())},this._domEvent.onWheel(i,this._onwheelmonths,"open"),this._domEvent.onWheel(s,this._onwheelmonths,"open"),this._domEvent.onWheel(o,this._onwheelyears,"open"),this._domEvent.on(s,"click",function(t){t.button||p(t.target,h("month"))&&n._monthSelector(+u(t.target,"month"),!0)},"open"),this._domEvent.on(o,"click",function(t){if(!t.button){var e=u(t.target,"year");e&&n._yearSelector(+e,!0)}},"open"),this._domEvent.on(i,"click",function(t){if(!t.button){var e=h("day","selected"),s=n._currentDate,o=t.target,a=u(o,"day"),r=u(o,"month");if(a&&!p(o,e)){s.day=+a,s.month=+r;var l=i.querySelector("."+e);l&&d(l,e),_(o,e),n.trigger("select",{day:s.day,month:s.month,year:s.year}),n.setting("closeAfterSelection")&&n.close()}}},"open")},_monthSelector:function(t,e){s>t?t=s:t>o&&(t=o),this._currentDate.month=t;var n,i=this._elem("months"),a=this._elem("month").offsetHeight,r=this._elemAll("days-month"),l=this._elem("month-selector"),c=this._elem("days-container"),u=this._elem("days"),f=h("days","noanim"),p=h("months","noanim");e||(_(u,f),_(i,p));var m=Math.floor(this._currentDate.month*a-a/2);0>=m&&(m=1),m+l.offsetHeight>=i.offsetHeight&&(m=i.offsetHeight-l.offsetHeight-1),this._top(l,m),n=-Math.floor(r[t].offsetTop-u.offsetHeight/2+r[t].offsetHeight/2),n>0&&(n=0);var y=u.offsetHeight-c.offsetHeight;y>n&&(n=y),this._top(c,n),this._colorizeMonths(t),e||this._timeout.set(function(){d(u,f),d(i,p)},0,"anim")},_yearSelector:function(t,e){var n=this._data,i=n._startYear,s=n._endYear,o=this._currentDate.year;i>t?t=i:t>s&&(t=s),this._currentDate.year=t;var a=this._elem("years"),r=this._elem("years-container"),l=this._elem("year").offsetHeight,c=this._elem("year-selector"),i=this._data._startYear,s=this._data._endYear,u=h("years","noanim");e||_(a,u);var f=Math.floor((this._currentDate.year-i)*l),p=-Math.floor((this._currentDate.year-i)*l-a.offsetHeight/2);p>0&&(p=0),p<a.offsetHeight-r.offsetHeight&&(p=a.offsetHeight-r.offsetHeight);var m=0;a.offsetHeight>=r.offsetHeight&&((s-i+1)%2&&(m=l),p=Math.floor((a.offsetHeight-r.offsetHeight-m)/2)),t!==o&&this._rebuildDays(t),this._top(c,f),this._top(r,p),this._colorizeYears(t),e||this._timeout.set(function(){d(a,u)},0,"anim")},_colorizeMonths:function(t){for(var e=this._elemAll("month"),n=5,i=0;n>i;i++)for(var a=this._elemAll("month","color",i),r=0,l=a.length;l>r;r++)d(a[r],h("month","color",i));var c=h("month","color","0");_(e[t],c),t-1>=s&&_(e[t-1],c),o>=t+1&&_(e[t+1],c);var u=1;for(i=t-2;i>=s&&n>u;i--,u++)_(e[i],h("month","color",u));for(u=1,i=t+2;o>=i&&n>u;i++,u++)_(e[i],h("month","color",u))},_colorizeYears:function(t){for(var e=this._elemAll("year"),n=this._data._startYear,i=5,s=0;i>s;s++)for(var o=this._elemAll("year","color",s),a=0,r=o.length;r>a;a++)d(o[a],h("year","color",s));_(e[t-n],h("year","color","0"));var l=1;for(s=t-1;s>=this._data._startYear&&i>l;s--,l++)_(e[s-n],h("year","color",l));for(l=1,s=t+1;s<=this._data._endYear&&i>l;s++,l++)_(e[s-n],h("year","color",l))},_delOpenedEvents:function(){this._domEvent.offAll("open")},_prepareYears:function(t){var e,n,i,s=this._current();return"string"==typeof t&&(e=t.trim().split(/[:,; ]/),n=parseInt(e[0],10),i=parseInt(e[1],10),isNaN(n)||isNaN(i)||(Math.abs(n)<1e3&&(n=s.year+n),Math.abs(i)<1e3&&(i=s.year+i))),{start:n||s.year-11,end:i||s.year+1}},_parseDate:function(t){var e,n,i=null;return t&&("string"==typeof t?(e=/^\s*(\d{4})[-/.](\d\d)(?:[-/.](\d\d))?\s*$/.exec(t),e?n=[e[3],e[2]-1,e[1]]:(e=/^\s*(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{4}|\d\d))?\s*$/.exec(t),e&&(n=[e[1],e[2]-1,e[3]])),n&&(i=new Date(parseInt(n[2],10),parseInt(n[1],10),parseInt(n[0],10)))):"object"==typeof t?t instanceof Date?i=t:t.year&&t.day&&(i=new Date(t.year,t.month-1,t.day,12,0,0,0)):"number"==typeof number&&(i=new Date(t))),i},_updateSelection:function(){var t,e=this._elem("day","selected");e&&d(e,h("day","selected")),this._currentDate.year===this._val.year&&(t=this._elemAll("days-month"),t&&t[this._val.month]&&(e=this._elemAllContext(t[this._val.month],"day"),e&&e[this._val.day-1]&&_(e[this._val.day-1],h("day","selected"))))},_buttonText:function(){var t=this._currentDate,e=this.text("months"),n=this.text("caseMonths");return t.day+" "+(n||e)[t.month]+" "+t.year}});var h=function(t,e,n){return(null===n||void 0===n)&&(n=""),i+"__"+t+(e?"_"+e+(""===n?"":"_"+n):"")},l=function(t,e){return(null===e||void 0===e)&&(e=""),i+"_"+t+(""===e?"":"_"+e)},c=e.createElement("div"),u=c.dataset?function(t,e){return t.dataset[e]}:function(t,e){return t.getAttribute("data-"+e)},f=!!c.classList,_=f?function(t,e){return t.classList.add(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");n.test(e.className)||(t.className=(t.className+" "+e).replace(/\s+/g," ").replace(/(^ | $)/g,""))},d=f?function(t,e){return t.classList.remove(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");t.className=t.className.replace(n,"$1").replace(/\s+/g," ").replace(/(^ | $)/g,"")},p=f?function(t,e){return t.classList.contains(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");return-1!==t.className.search(n)};a(r.prototype,{_elem:function(t,e,n){return this._container.querySelector("."+h(t,e,n))},_elemContext:function(t,e,n,i){return t.querySelector("."+h(e,n,i))},_elemAll:function(t,e,n){return this._container.querySelectorAll("."+h(t,e,n))},_elemAllContext:function(t,e,n,i){return t.querySelectorAll("."+h(e,n,i))},_left:function(t,e){t.style.left=e+"px"},_top:function(t,e){t.style.top=e+"px"},_position:function(t,e){this._left(t,e.left),this._top(t,e.top)},_offset:function(n){var i={top:0,left:0};return"undefined"!=typeof n.getBoundingClientRect&&(i=n.getBoundingClientRect()),{top:i.top+(t.pageYOffset||e.scrollTop||0)-(e.clientTop||0),left:i.left+(t.pageXOffset||e.scrollLeft||0)-(e.clientLeft||0)}}});var m=function(){};a(m.prototype,{set:function(t,e,n){this._buf=this._buf||[];var i=setTimeout(t,e);return this._buf.push({id:i,ns:n}),i},clear:function(t){this._buf&&this._buf.forEach(function(e,n){e.id===t&&(clearTimeout(t),this._buf.slice(n,1))},this)},clearAll:function(t){this._buf&&this._buf.forEach(function(e,n){t?t===e.ns&&(clearTimeout(e.id),this._buf.slice(n,1)):this._buf.slice(n,1)},this)}});var y="onwheel"in e.createElement("div")?"wheel":void 0!==e.onmousewheel?"mousewheel":"DOMMouseScroll";a(r.prototype,{on:function(t,e){return t&&e&&(this._eventBuf=this._eventBuf||[],this._eventBuf.push({type:t,callback:e})),this},off:function(t,e){return this._eventBuf&&this._eventBuf.forEach(function(n,i){t===n.type&&e===n.callback&&this._eventBuf.slice(i,1)}),this},trigger:function(t){var e=arguments;return t&&this._eventBuf&&this._eventBuf.forEach(function(n){t===n.type&&n.callback.apply(this,[{type:t}].concat(Array.prototype.slice.call(e,1)))},this),this}});var v=function(){};return a(v.prototype,{onWheel:function(e,n,i){return this.on(e,"DOMMouseScroll"===y?"MozMousePixelScroll":y,"wheel"===y?n:function(e){e||(e=t.event);var i={originalEvent:e,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"===e.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}},s=-1/40;return"mousewheel"===y?(i.deltaY=s*e.wheelDelta,e.wheelDeltaX&&(i.deltaX=s*e.wheelDeltaX)):i.deltaY=e.detail,n(i)},i),this},on:function(t,e,n,i){return t&&e&&n&&(t.addEventListener(e,n,!1),this._buf=this._buf||[],this._buf.push({elem:t,type:e,callback:n,ns:i})),this},off:function(t,e,n,i){return t&&e&&n&&this._buf&&this._buf.forEach(function(s,o){s&&s.type===e&&s.elem===t&&s.callback===n&&s.ns===i&&(t.removeEventListener(e,n,!1),this._buf.slice(o,1))},this),this},offAll:function(t){return this._buf&&(this._buf.forEach(function(e){e&&this.off(e.elem,e.type,e.callback,t||e.ns)},this),t||(this._buf=[])),this}}),r.prototype.template=function(t){return this._templates[t]()},r.prototype._templates={prepare:function(t){return t.replace(/\$/g,i+"__")},attr:function(t,e){return""===t||null===t||void 0===t?"":" "+t+'="'+e+'"'},days:function(t){for(var e="",n=s;o>=n;n++)e+=this.month(n,t);return e},weekdays:function(){for(var t=this.parent.text("firstWeekDay")||0,e={first:t,last:t?t-1:6},n=t,i=0;7>i;i++)e[n]=i,n++,n>6&&(n=0);return e},month:function(t,e){var i=new Date(e,t,1,12,0,0),s=new Date,o=[s.getDate(),s.getMonth(),s.getFullYear()].join("-"),a=this.parent,r=i.getDay(),h=this.weekdays(),l=h[r],c=a.text("months")[t],u=[31,n(e)?29:28,31,30,31,30,31,31,30,31,30,31],f="",_=[],d=function(){return Array.prototype.join.call(arguments,"-")===o};_.push('<div class="$days-month">'),3>l&&_.push('<div class="$days-title-month">'+c+"</div>"),_.push('<table class="$days-table"><tr>'),r!==h.first&&_.push('<td colspan="'+l+'" class="$empty">'+(3>l?"":'<div class="$days-title-month">'+c+"</div>")+"</td>");for(var p,m,y,v=a._val.day,g=a._val.month,D=a._val.year,b=1;b<=u[t];b++)m="",p=!1,i.setDate(b),r=i.getDay(),y=this.parent.getHoliday(b,t,e),f=0===r||6===r?"$day_holiday":"$day_weekday",0===y?f="$day_weekday":1===y&&(f="$day_holiday"),b===v&&t===g&&e===D&&(f+=" $day_selected"),d(b,t,e)&&(f+=" $day_now",m=a.text("today")),_.push("<td"+this.attr("title",m)+' class="$day '+f+'" data-month="'+t+'" data-day="'+b+'">'+b+"</td>"),r===h.last&&(_.push("</tr>"),p=!0);return p||_.push("</tr>"),_.push("</table></div>"),_.join("")},years:function(){for(var t='<div class="$year-selector"><div class="$year-selector-i"></div></div>',e=this.parent._data._startYear,n=this.parent._data._endYear,i=e;n>=i;i++)t+='<div class="$year" data-year="'+i+'">'+i+"</div>";return t},months:function(){var t='<div class="$month-selector"><div class="$month-selector-i"></div></div>';return this.parent.text("months").forEach(function(e,n){t+='<div class="$month" data-month="'+n+'">'+e+"</div>"}),t},main:function(){var t=(this.parent.text("shortWeekDays"),this.parent.text("firstWeekDay")||0),e="";return this.parent.text("shortWeekDays").forEach(function(n,i,s){e+='<div class="$short-weekdays-cell $short-weekdays-cell_n_'+t+'"'+this.attr("title",s[t])+">"+s[t]+"</div>",t++,t>6&&(t=0)},this),this.prepare('<div class="$short-weekdays">'+e+'</div><div class="$container"><div class="$days">    <div class="$days-container">'+this.days(this.parent._currentDate.year)+'</div></div><div class="$months">'+this.months()+'</div><div class="$years"><div class="$years-container">'+this.years()+"</div></div></div>")}},a(r,{addHolidays:function(t,e){this._holidays=this._holidays||{},this._holidays[t]=e}}),r.prototype.getHoliday=function(t,e,n){var i=this._data.locale,s=r._holidays;return s&&s[i]&&s[i][n]?s[i][n][t+"-"+(e+1)]:void 0},a(r,{_texts:{},_locales:[],addLocale:function(t,e){this._locales.push(t),this._texts[t]=e,e.def&&(this._defaultLocale=t)}}),r.prototype.text=function(t){return r._texts[this._data.locale][t]},r}(this,this.document);