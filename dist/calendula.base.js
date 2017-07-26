/*! Calendula | © 2017 Denis Seleznev | https://github.com/hcodes/calendula/ */
!function(t,e,n,i,o){!function(t,e){"function"==typeof define&&define.amd?define("calendula",[],e):"object"==typeof exports?module.exports=e():t.Calendula=e()}(this,function(){"use strict";function r(t){return(t<10?"0":"")+t}function s(t,e,n){return[t,r(e+1),r(n)].join("-")}function a(t){var e,i,o=null;if(t)if(g(t)){if("today"===t)return new n;(e=/^\s*(\d{4})[-/.](\d\d)(?:[-/.](\d\d))?\s*$/.exec(t))?i=[e[3],e[2],e[1]]:(e=/^\s*(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{4}|\d\d))?\s*$/.exec(t))&&(i=[e[1],e[2],e[3]]),i&&(o=new n(p(i[2]),p(i[1]-1),p(i[0])))}else A(t)?t instanceof n?o=t:t.year&&t.day&&(o=new n(t.year,t.month,t.day,12,0,0,0)):x(t)&&(o=new n(t));return o}function h(t){var e=a(t);return e?[e.getFullYear(),r(e.getMonth()+1),r(e.getDate())].join("-"):null}function c(t){var e=a(t);return e?{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}:{}}function l(t,e,n){return null===n||!1===n?e="":!0!==n&&n!==o||(n=""),w+"__"+t+(e?"_"+e+(""===n?"":"_"+n):"")}function u(t,e){return null===e||!1===e?t="":!0!==e&&e!==o||(e=""),w+(t?"_"+t+(""===e?"":"_"+e):"")}function f(t,e){var n=y(t),i=n?l(n,e):u(e);(t.className||"").split(" ").forEach(function(e){e!==i&&-1===e.search(i+"_")||t.classList.remove(e)})}function _(t,e,n){var i=y(t);f(t,e),t.classList.add(i?l(i,e,n):u(e,n))}function d(t,e,n){var i=y(t);return t.classList.contains(i?l(i,e,n):u(e,n))}function m(t,e){return t.classList.contains(l(e))}function y(t){var e=t.className.match(/__([^ _$]+)/);return e?e[1]:""}function p(t){return parseInt(t,10)}function v(t){return"[object Object]"===Object.prototype.toString.call(t)}function g(t){return"string"==typeof t}function x(t){return"number"==typeof t}function A(t){return"object"==typeof t}function b(t){return void 0===t}function E(n){var i={top:0,left:0};return n&&!b(n.getBoundingClientRect)&&(i=n.getBoundingClientRect()),{top:i.top+(t.pageYOffset||e.scrollTop||0)-(e.clientTop||0),left:i.left+(t.pageXOffset||e.scrollLeft||0)-(e.clientLeft||0)}}function D(t,e){O(t,e.left),S(t,e.top)}function O(t,e){t.style.left=x(e)?e+"px":e}function S(t,e){t.style.top=x(e)?e+"px":e}var w="calendula",H=function(){function t(n){if(null===n||n===o)return"";var i=[];if(v(n))return e(n);if(Array.isArray(n)){for(var r=0,s=n.length;r<s;r++)i.push(t(n[r]));return i.join("")}return""+n}function e(e){var i=e.t||"div",o="<"+i+n(e)+">";return e.c&&(o+=t(e.c)),o+="</"+i+">"}function n(t){var e,n,o=Object.keys(t),r=["c","t","e","m"],s=[],a=[],h="";if(t.e&&a.push(l(t.e)),t.m)if(t.e)for(e in t.m)t.m.hasOwnProperty(e)&&a.push(l(t.e,e,t.m[e]));else for(e in t.m)t.m.hasOwnProperty(e)&&a.push(u(e,t.m[e]));for(a.length&&s.push(i("class",a)),e=0,n=o.length;e<n;e++){var c=o[e];-1===r.indexOf(c)&&s.push(i(c,t[c]))}return(h=s.join(" "))?" "+h:""}function i(t,e){return null!==e&&e!==o?t+'="'+(Array.isArray(e)?e.join(" "):e)+'"':""}return t}(),M={ESC:27,PAGE_DOWN:34,PAGE_UP:33,CURSOR_UP:38,CURSOR_DOWN:40,CURSOR_LEFT:37,CURSOR_RIGHT:39},T=function(){var t=e.createElement("div"),n=!1;return["Moz","Webkit","O","ms",""].forEach(function(e){var i=e+(e?"T":"t")+"ransform";i in t.style&&(n=i)}),!1===n?function(t,e){t.style.top=x(e)?e+"px":e}:function(t,e){t.style[n]="translateY("+(x(e)?e+"px":e)+")"}}(),N=function(t){t=N.extend({},t||{});var e=this._prepareYears(t.years),n=N.extend(t,{autocloseable:!!b(t.autocloseable)||t.autocloseable,closeAfterSelection:!!b(t.closeAfterSelection)||t.closeAfterSelection,locale:t.locale||N._defaultLocale,max:c(t.max),min:c(t.min),showOn:t.showOn||"click",theme:t.theme||"default",_startYear:e.start,_endYear:e.end});this._data=n,this._initExtensions(),this.val(n.value),this._addSwitcherEvents(n.showOn)};return N.extend=function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},N.MIN_MONTH=0,N.MAX_MONTH=11,N.extend(N.prototype,{isOpened:function(){return this._isOpened},open:function(){var t=this;return this._init(),this.isOpened()||(this.timeout.clearAll(["open","close"]).set(function(){_(t._container,"opened"),t._update(),t._monthSelector(t._currentDate.month,!1),t._yearSelector(t._currentDate.year,!1),t._openedEvents()},0,"open"),this._isOpened=!0,this.event.trigger("open")),this},close:function(){var t=this;return this._init(),this.isOpened()&&(this.timeout.clearAll(["open","close"]).set(function(){t.timeout.clearAll("open"),t._update(),t._delOpenedEvents(),f(t._container,"opened"),t.tooltip.hide(),t.event.trigger("close")},0,"close"),this._isOpened=!1),this},toggle:function(){return this.isOpened()?this.close():this.open()},val:function(t){if(!arguments.length)return this._val;t?(this._val=c(t),this._currentDate=N.extend({},this._val)):(this._val={},this._currentDate=this._current()),this._container&&this._updateSelection(),this._updateSwitcher()},setting:function(t,e){var n=this._data,i=this._container,o={min:!0,max:!0,locale:!0};return 1===arguments.length?n[t]:(n[t]=["min","max","value"].indexOf(t)>-1?c(e):e,"showOn"===t&&this._addSwitcherEvents(e),i&&("theme"===t?_(i,"theme",e):"daysAfterMonths"===t&&(e?_(i,"days-after-months"):f(i,"days-after-months")),"position"===t&&this.isOpened()&&this._position(e),o[t]&&this._rebuild()),this)},destroy:function(){this._isInited&&(this.close(),this._removeExtensions(),e.body.removeChild(this._container),this._data=null,this._container=null,this._isInited=null)},_init:function(){if(!this._isInited){this._isInited=!0;var t=this.setting("id"),n=e.createElement("div");t&&(n.id=t),this._container=n,n.classList.add(w),_(n,"theme",this._data.theme),this.setting("daysAfterMonths")&&_(n,"days-after-months"),this._rebuild(),e.body.appendChild(n)}},_isAuto:function(t){return"auto"===t||b(t)},_position:function(t){t=(t||"").split(" ");var e=this.setting("switcher"),n=t[0],i=t[1];if(e&&(this._isAuto(n)||this._isAuto(i))){var o=this._calcBestPosition(n,i,e);n=o.left,i=o.top}D(this._container,this._calcPosition(n,i,e))},_calcPosition:function(t,e,n){var i,o,r=E(n),s=this._container,a=s.offsetWidth,h=s.offsetHeight,c=r.left,l=r.top;if(g(t))switch(t){case"left":i=c;break;case"center":i=c+(n.offsetWidth-a)/2;break;case"right":i=c+n.offsetWidth-a}if(g(e))switch(e){case"top":o=l-h;break;case"center":o=l-(h-n.offsetHeight)/2;break;case"bottom":o=l+n.offsetHeight}return{left:i,top:o}},_calcVisibleSquare:function(t,e,n){var o={x1:t,y1:e,x2:t+this._container.offsetWidth,y2:e+this._container.offsetHeight},r=function(t,e,n,o){return e<=n||t>=o?0:i.min(e,o)-i.max(t,n)};return r(o.x1,o.x2,n.x1,n.x2)*r(o.y1,o.y2,n.y1,n.y2)},_calcBestPosition:function(t,e,n){var i=-1,o=0,r=this._winArea(),s=this._isAuto(t),a=this._isAuto(e);this._bestPositions.forEach(function(h,c){var l,u,f=h[0],_=h[1];(s&&a||s&&e===_||a&&t===f)&&(l=this._calcPosition(f,_,n),(u=this._calcVisibleSquare(l.left,l.top,r))>i&&(i=u,o=c))},this);var h=this._bestPositions[o];return{left:h[0],top:h[1]}},_bestPositions:[["left","bottom"],["left","top"],["right","bottom"],["right","top"],["center","bottom"],["center","top"]],_winArea:function(){var n=e.documentElement,i=t.pageXOffset,o=t.pageYOffset;return{x1:i,y1:o,x2:i+n.clientWidth,y2:o+n.clientHeight}},_current:function(){var t=new n;return{day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}},_update:function(){this._init(),this._position(this.setting("position"))},_findDayByDate:function(t){if(t.year!==this._currentDate.year)return null;var e=this._elemAll("days-month")[t.month];return e?this._elemAllContext(e,"day")[t.day-1]||null:null},_onresize:function(){this._update()},_onscroll:function(){this._update()},_rebuild:function(){var t=this.isOpened();t&&this._delOpenedEvents(),this._container.innerHTML=this.template.get("main"),t&&(this._openedEvents(),this._monthSelector(this._currentDate.month,!1),this._yearSelector(this._currentDate.year,!1))},_rebuildDays:function(){this._elem("days-container").innerHTML=this.template.get("days"),this._monthSelector(this._currentDate.month,!1)},_intoContainer:function(t){for(var e=t;e;){if(e===this._container)return!0;e=e.parentNode}return!1},_openedEvents:function(){var n=this;this.domEvent.on(e,"click",function(t){!t.button&&n.setting("autocloseable")&&(t.target===n.setting("switcher")||n._intoContainer(t.target)||n.close())},"open"),this.domEvent.on(t,"resize",function(){n._onresize()},"open").on(e,"scroll",function(){n._onscroll()},"open").on(e,"keypress",function(t){var e=n._currentDate;switch(t.keyCode){case M.ESC:n.close();break;case M.PAGE_DOWN:t.ctrlKey||t.altKey?n._monthSelector(e.month+1,!0):n._yearSelector(e.year+1,!0),t.preventDefault();break;case M.PAGE_UP:t.ctrlKey||t.altKey?n._monthSelector(e.month-1,!0):n._yearSelector(e.year-1,!0),t.preventDefault()}},"open").on(this._container,"click",function(t){t.button||n.tooltip.hide()},"open");var i=this._elem("days"),o=this._elem("months"),r=this._elem("years"),a=function(t){var e=0;return t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e};this._onwheelmonths=function(t){var e=a(t);e&&(n._monthSelector(n._currentDate.month+e,!0),t.preventDefault())},this._onwheelyears=function(t){var e=a(t);e&&(n._yearSelector(n._currentDate.year+e,!0),t.preventDefault())},this.domEvent.on(i,"wheel",this._onwheelmonths,"open").on(o,"wheel",this._onwheelmonths,"open").on(r,"wheel",this._onwheelyears,"open"),this.domEvent.on(o,"click",function(t){t.button||m(t.target,"month")&&n._monthSelector(+t.target.dataset.month,!0)},"open"),this.domEvent.on(r,"click",function(t){if(!t.button){var e=t.target.dataset.year;e&&n._yearSelector(+e,!0)}},"open"),this.domEvent.on(i,"mouseover",function(t){var e=t.target,i=+e.dataset.day,o=+e.dataset.month,r=+n._currentDate.year;m(e,"day")&&d(e,"has-title")&&n.tooltip.show(e,n.title.get(s(r,o,i)))},"open"),this.domEvent.on(i,"mouseout",function(t){m(t.target,"day")&&n.tooltip.hide()},"open"),this.domEvent.on(i,"click",function(t){if(!t.button){var e=n._currentDate,o=t.target,r=o.dataset.day,s=o.dataset.month;if(r){if(d(o,"minmax"))return;if(!d(o,"selected")){e.day=+r,e.month=+s;var a=i.querySelector("."+l("day","selected"));a&&f(a,"selected"),_(o,"selected"),n.event.trigger("select",{day:e.day,month:e.month,year:e.year}),n.setting("closeAfterSelection")&&n.close()}}}},"open")},_monthSelector:function(t,e){t<N.MIN_MONTH?t=N.MIN_MONTH:t>N.MAX_MONTH&&(t=N.MAX_MONTH),this._currentDate.month=t;var n,o=this._elem("months"),r=this._elem("month").offsetHeight,s=this._elemAll("days-month")[t],a=this._elem("month-selector"),h=this._elem("days-container"),c=this._elem("days");e||(_(c,"noanim"),_(o,"noanim"));var l=i.floor(this._currentDate.month*r-r/2);l<=0&&(l=1),l+a.offsetHeight>=o.offsetHeight&&(l=o.offsetHeight-a.offsetHeight-1),T(a,l),(n=-i.floor(s.offsetTop-c.offsetHeight/2+s.offsetHeight/2))>0&&(n=0);var u=c.offsetHeight-h.offsetHeight;n<u&&(n=u),T(h,n),this._colorizeMonths(t),e||this.timeout.set(function(){f(c,"noanim"),f(o,"noanim")},0,"anim")},_yearSelector:function(t,e){var n=this._data,o=n._startYear,r=n._endYear,s=this._currentDate.year;t<o?t=o:t>r&&(t=r),this._currentDate.year=t;var a=this._elem("years"),h=this._elem("years-container"),c=this._elem("year").offsetHeight,l=this._elem("year-selector");e||_(a,"noanim");var u=i.floor((this._currentDate.year-o)*c),d=-i.floor((this._currentDate.year-o)*c-a.offsetHeight/2);d>0&&(d=0),d<a.offsetHeight-h.offsetHeight&&(d=a.offsetHeight-h.offsetHeight);var m=0;a.offsetHeight>=h.offsetHeight&&((r-o+1)%2&&(m=c),d=i.floor((a.offsetHeight-h.offsetHeight-m)/2)),t!==s&&this._rebuildDays(t),T(l,u),T(h,d),this._colorizeYears(t),e||this.timeout.set(function(){f(a,"noanim")},0,"anim")},_maxColor:5,_decolorize:function(t){for(var e=0;e<this._maxColor;e++)for(var n=this._elemAll(t,"color",e),i=0,o=n.length;i<o;i++)f(n[i],"color",e)},_colorizeMonths:function(t){var e=this._elemAll("month");this._decolorize("month"),_(e[t],"color","0"),t-1>=N.MIN_MONTH&&_(e[t-1],"color","0"),t+1<=N.MAX_MONTH&&_(e[t+1],"color","0");for(var n=1,i=t-2;i>=N.MIN_MONTH&&n<this._maxColor;i--,n++)_(e[i],"color",n);for(n=1,i=t+2;i<=N.MAX_MONTH&&n<this._maxColor;i++,n++)_(e[i],"color",n)},_colorizeYears:function(t){var e=this._elemAll("year"),n=this._data._startYear;this._decolorize("year"),_(e[t-n],"color","0");for(var i=1,o=t-1;o>=n&&i<this._maxColor;o--,i++)_(e[o-n],"color",i);for(i=1,o=t+1;o<=this._data._endYear&&i<this._maxColor;o++,i++)_(e[o-n],"color",i)},_delOpenedEvents:function(){this.domEvent.offAll("open")},_prepareYears:function(t){var e,n,o,r=this._current();return g(t)&&(n=p((e=t.trim().split(/[:,; ]/))[0]),o=p(e[1]),isNaN(n)||isNaN(o)||(i.abs(n)<1e3&&(n=r.year+n),i.abs(o)<1e3&&(o=r.year+o))),{start:n||r.year-11,end:o||r.year+1}},_updateSelection:function(){var t=this._elem("day","selected");if(t&&f(t,"selected"),this._currentDate.year===this._val.year){var e=this._elemAll("days-month");if(e&&e[this._val.month]){var n=this._elemAllContext(e[this._val.month],"day"),i=this._val.day-1;n&&n[i]&&_(n[i],"selected")}}},_addSwitcherEvents:function(t){var e=this.setting("switcher"),n=this,i=Array.isArray(t)?t:[t||"click"],o=["input","textarea"],r=["focus","mouseover"];if(this.domEvent.offAll("switcher"),-1===i.indexOf("none")&&e){var s=e.tagName.toLowerCase();i.forEach(function(t){n.domEvent.on(e,t,function(){-1!==o.indexOf(s)||-1!==r.indexOf(t)?n.open():n.toggle()},"switcher")})}},_switcherText:function(){var t=this._currentDate,e=this.text("months"),n=this.text("caseMonths");return t.day+" "+(n||e)[t.month]+" "+t.year},_updateSwitcher:function(){var t,e=this.setting("switcher"),n=this._switcherText();e&&("input"===(t=e.tagName.toLowerCase())||"textarea"===t?e.value=n:e.innerHTML=n)},_elem:function(t,e,n){return this._container.querySelector("."+l(t,e,n))},_elemAll:function(t,e,n){return this._container.querySelectorAll("."+l(t,e,n))},_elemAllContext:function(t,e,n,i){return t.querySelectorAll("."+l(e,n,i))}}),N.version="0.9.11",N.extend(N.prototype,{_initExtensions:function(){N._exts.forEach(function(t){var e=t[0],n=t[1]||function(){},i=t[2];N.extend(n.prototype,i),this[e]=new n;var o=this[e];o.parent=this,o.init&&o.init(this._data,this._container)},this)},_removeExtensions:function(){N._exts.forEach(function(t){var e=t[0];this[e].destroy(),delete this[e]},this)}}),N._exts=[],N.addExtension=function(t,e,n){N._exts.push([t,e,n])},N.addExtension("domEvent",function(){this._buf=[]},{on:function(t,e,n,i){return t&&e&&n&&(t.addEventListener(e,n,!1),this._buf.push({elem:t,type:e,callback:n,ns:i})),this},off:function(t,e,n,i){for(var o=this._buf,r=0;r<o.length;r++){var s=o[r];s&&s.elem===t&&s.callback===n&&s.type===e&&s.ns===i&&(t.removeEventListener(e,n,!1),o.splice(r,1),r--)}return this},offAll:function(t){for(var e=this._buf,n=0;n<e.length;n++){var i=e[n];t?t===i.ns&&(i.elem.removeEventListener(i.type,i.callback,!1),e.splice(n,1),n--):i.elem.removeEventListener(i.type,i.callback,!1)}return t||(this._buf=[]),this},destroy:function(){this.offAll(),delete this._buf}}),N.addExtension("event",function(){this._buf=[]},{on:function(t,e){return t&&e&&this._buf.push({type:t,callback:e}),this},off:function(t,e){for(var n=this._buf,i=0;i<n.length;i++)e===n[i].callback&&t===n[i].type&&(n.splice(i,1),i--);return this},trigger:function(t,e){for(var n=this._buf,i=0;i<n.length;i++)t===n[i].type&&n[i].callback.call(this,{type:t},e);return this},destroy:function(){delete this._buf}}),N.extend(N,{addHolidays:function(t,e){this._holidays=this._holidays||{},this._holidays[t]=e}}),N.prototype.getHoliday=function(t,e,n){var i=this._data.locale,r=N._holidays;return r&&r[i]&&r[i][n]?r[i][n][t+"-"+(e+1)]:o},N.extend(N,{_locales:[],_texts:{},addLocale:function(t,e){this._locales.push(t),this._texts[t]=e,e.def&&(this._defaultLocale=t)}}),N.prototype.text=function(t){return N._texts[this._data.locale][t]},N.addExtension("template",null,{get:function(t){return H(this[t]())},SATURDAY:6,SUNDAY:0,days:function(){for(var t=[],e=N.MIN_MONTH;e<=N.MAX_MONTH;e++)t.push(this.month(e,this.parent._currentDate.year));return t},dayNames:function(){for(var t=this.parent.text("firstWeekday")||0,e={first:t,last:t?t-1:this.SATURDAY},n=t,i=0;i<7;i++)e[n]=i,++n>this.SATURDAY&&(n=this.SUNDAY);return e},month:function(t,e){var i=new n;i.setHours(12,0,0,0);for(var o,r,a,h=new n(e,t,1,12,0,0,0),c=h.getTime(),l=this.parent,u=h.getDay(),f=this.dayNames(),_=f[u],d=l.setting("min"),m=l.setting("max"),y=this._getTs(d),p=this._getTs(m),v=i.getTime(),g={t:"tr",c:[u!==f.first?{t:"td",colspan:_,e:"empty",c:_<3?"":this._getTitleMonth(d,m,t,e)}:""]},x={e:"days-month",c:[_<3?this._getTitleMonth(d,m,t,e):"",{t:"table",e:"days-table",c:[g]}]},A=1;h.getMonth()===t;h.setDate(++A)){o="",c=+h,u=h.getDay(),r=l.getHoliday(A,t,e),a={},u===this.SUNDAY||u===this.SATURDAY?a.holiday=!0:a.workday=!0,0===r?a.nonholiday=!0:1===r&&(a.highday=!0),this._isSelected(l._val,A,t,e)&&(a.selected=!0),v===c&&(a.now=!0,o=l.text("today")),(y&&c<y||p&&c>p)&&(a.minmax=!0);var b=l.title.get(s(e,t,A));b&&(a["has-title"]=!0,a["title-color"]=b.color||"default"),u===f.first&&(g={t:"tr",c:[]},x.c[1].c.push(g)),g.c.push({t:"td",e:"day",m:a,title:o,"data-month":t,"data-day":A,c:A})}return x},years:function(){for(var t=this.parent._data,e=t._startYear,n=t._endYear,i=[{e:"year-selector",c:{e:"year-selector-i"}}],o=e;o<=n;o++)i.push({e:"year","data-year":o,c:o});return i},months:function(){var t=[{e:"month-selector",c:{e:"month-selector-i"}}];return this.parent.text("months").forEach(function(e,n){t.push({e:"month","data-month":n,c:e})}),t},main:function(){var t=this.parent,e=t.text("firstWeekday")||this.SUNDAY,n=t.text("dayNames")||[],i=[];return t.text("shortDayNames").forEach(function(t,o,r){i.push({e:"short-daynames-cell",m:{n:e},title:n[e]||r[e],c:r[e]}),++e>this.SATURDAY&&(e=this.SUNDAY)},this),[{e:"short-daynames",c:i},{e:"container",c:[{e:"days",c:{e:"days-container",c:this.days()}},{e:"months",c:this.months()},{e:"years",c:{e:"years-container",c:this.years()}}]}]},destroy:function(){},_isSelected:function(t,e,n,i){return e===t.day&&n===t.month&&i===t.year},_getTitleMonth:function(t,e,n,i){function o(t){return p(""+t.year+r(t.month))}var s=o(t),a=o(e),h={},c=p(""+i+r(n));return(t&&c<s||e&&c>a)&&(h.minmax=!0),{e:"days-title-month",m:h,c:this.parent.text("months")[n]}},_getTs:function(t){return t.year?new n(t.year,t.month,t.day,12,0,0,0).getTime():null}}),N.addExtension("timeout",function(){this._buf=[]},{set:function(t,e,n){var i=this,o=setTimeout(function(){t(),i.clear(o)},e);return this._buf.push({id:o,ns:n}),o},clear:function(t){var e=this._buf,n=-1;return e&&(e.some(function(e,i){return e.id===t&&(n=i,!0)}),n>=0&&(clearTimeout(e[n].id),e.splice(n,1))),this},clearAll:function(t){var e=this._buf,n=[],i=Array.isArray(t)?t:[t];return e.forEach(function(e){t?-1!==i.indexOf(e.ns)?clearTimeout(e.id):n.push(e):clearTimeout(e.id)},this),this._buf=t?n:[],this},destroy:function(){this.clearAll(),delete this._buf}}),N.addExtension("title",function(){this._title={}},{init:function(t){this.set(t.title)},get:function(t){var e=h(t);return e?this._title[e]:null},set:function(t){Array.isArray(t)?t.forEach(function(t){this._set(t)},this):v(t)&&this._set(t)},_set:function(t){var e,n=h(t.date),i=this.parent;n&&(this._title[n]={text:t.text,color:t.color},i._isInited&&(e=i._findDayByDate(c(t.date)))&&(_(e,"has-title"),_(e,"title-color",t.color)))},remove:function(t){Array.isArray(t)?t.forEach(function(t){this._remove(t)},this):this._remove(t)},_remove:function(t){var e=this.parent,n=h(t);if(n&&(delete this._title[n],e._isInited)){var i=e._findDayByDate(c(t));i&&(f(i,"has-title"),f(i,"title-color"))}},removeAll:function(){if(this._title={},this.parent._isInited){var t=this.parent._elemAll("day","has-title");if(t)for(var e=0,n=t.length;e<n;e++)f(t[e],"has-title"),f(t[e],"title-color")}},destroy:function(){delete this._title}}),N.addExtension("tooltip",null,{show:function(t,e){var n=e||{};this._create(),_(this._container,"theme",this.parent.setting("theme")),_(this._container,"visible"),this._container.querySelector(".calendula__tooltip-text").innerHTML=H({c:n.text,e:"tooltip-row"}),_(this._container,"color",n.color||"default"),this._isOpened=!0;var i=E(t),o=i.left-(this._container.offsetWidth-t.offsetWidth)/2,r=i.top-this._container.offsetHeight-5;D(this._container,{left:o,top:r})},hide:function(){this._isOpened&&(f(this._container,"visible"),this._isOpened=!1)},destroy:function(){this._container&&(this.hide(),e.body.removeChild(this._container),delete this._container)},_create:function(){if(!this._container){var t=e.createElement("div");t.classList.add(l("tooltip")),t.innerHTML=H([{e:"tooltip-text"},{e:"tooltip-tail"}]),e.body.appendChild(t),this._container=t}}}),N})}(this,this.document,Date,Math);