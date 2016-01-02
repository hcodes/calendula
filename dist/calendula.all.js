/*! Calendula | © 2016 Denis Seleznev | https://github.com/hcodes/calendula/ */
!function(t,e,n,i,o){!function(t,e){"function"==typeof define&&define.amd?define("calendula",[],e):"object"==typeof exports?module.exports=e():t.Calendula=e()}(this,function(){"use strict";function a(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function r(t){return(10>t?"0":"")+t}function s(t,e,n){return[t,r(e+1),r(n)].join("-")}function l(t){var e,i,o=null;if(t)if(b(t)){if("today"===t)return new n;e=/^\s*(\d{4})[-\/.](\d\d)(?:[-\/.](\d\d))?\s*$/.exec(t),e?i=[e[3],e[2],e[1]]:(e=/^\s*(\d{1,2})[-\/.](\d{1,2})(?:[-\/.](\d{4}|\d\d))?\s*$/.exec(t),e&&(i=[e[1],e[2],e[3]])),i&&(o=new n(v(i[2]),v(i[1]-1),v(i[0])))}else D(t)?t instanceof n?o=t:t.year&&t.day&&(o=new n(t.year,t.month,t.day,12,0,0,0)):x(t)&&(o=new n(t));return o}function c(t){var e=l(t);return e?[e.getFullYear(),r(e.getMonth()+1),r(e.getDate())].join("-"):null}function h(t){var e=l(t);return e?{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}:{}}function u(t,e,n){return null===n||n===!1?e="":(n===!0||n===o)&&(n=""),T+"__"+t+(e?"_"+e+(""===n?"":"_"+n):"")}function f(t,e){return null===e||e===!1?t="":(e===!0||e===o)&&(e=""),T+(t?"_"+t+(""===e?"":"_"+e):"")}function d(t,e){var n=p(t),i=n?u(n,e):f(e),o=(t.className||"").split(" ");o.forEach(function(e){(e===i||-1!==e.search(i+"_"))&&W(t,e)})}function m(t,e,n){var i=p(t);d(t,e),L(t,i?u(i,e,n):f(e,n))}function _(t,e,n){var i=p(t);return P(t,i?u(i,e,n):f(e,n))}function y(t,e){return P(t,u(e))}function p(t){var e=t.className.match(/__([^ _$]+)/);return e?e[1]:""}function v(t){return parseInt(t,10)}function g(t){return"[object Object]"===Object.prototype.toString.call(t)}function b(t){return"string"==typeof t}function x(t){return"number"==typeof t}function D(t){return"object"==typeof t}function w(t){return"undefined"==typeof t}function E(n){var i={top:0,left:0};return n&&!w(n.getBoundingClientRect)&&(i=n.getBoundingClientRect()),{top:i.top+(t.pageYOffset||e.scrollTop||0)-(e.clientTop||0),left:i.left+(t.pageXOffset||e.scrollLeft||0)-(e.clientLeft||0)}}function S(t,e){M(t,e.left),k(t,e.top)}function M(t,e){t.style.left=x(e)?e+"px":e}function k(t,e){t.style.top=x(e)?e+"px":e}var A=0,N=11,O=function(t){t=a({},t||{});var e=this._prepareYears(t.years),n=a(t,{autocloseable:w(t.autocloseable)?!0:t.autocloseable,closeAfterSelection:w(t.closeAfterSelection)?!0:t.closeAfterSelection,locale:t.locale||O._defaultLocale,max:h(t.max),min:h(t.min),showOn:t.showOn||"click",theme:t.theme||"default",_startYear:e.start,_endYear:e.end});this._data=n,this._initExts(),this.val(n.value),this._addSwitcherEvents(n.showOn)};a(O.prototype,{isOpened:function(){return this._isOpened},open:function(){var t=this;return this._init(),this.isOpened()||(this.timeout.clearAll(["open","close"]).set(function(){m(t._container,"opened"),t._update(),t._monthSelector(t._currentDate.month,!1),t._yearSelector(t._currentDate.year,!1),t._openedEvents()},0,"open"),this._isOpened=!0,this.event.trigger("open")),this},close:function(){var t=this;return this._init(),this.isOpened()&&(this.timeout.clearAll(["open","close"]).set(function(){t.timeout.clearAll("open"),t._update(),t._delOpenedEvents(),d(t._container,"opened"),t.tooltip.hide(),t.event.trigger("close")},0,"close"),this._isOpened=!1),this},toggle:function(){return this.isOpened()?this.close():this.open()},val:function(t){return arguments.length?(t?(this._val=h(t),this._currentDate=a({},this._val)):(this._val={},this._currentDate=this._current()),this._container&&this._updateSelection(),void this._updateSwitcher()):this._val},setting:function(t,e){var n=this._data,i=this._container,o={min:!0,max:!0,locale:!0};return 1===arguments.length?n[t]:(n[t]=["min","max","value"].indexOf(t)>-1?h(e):e,"showOn"===t&&this._addSwitcherEvents(e),i&&("theme"===t?m(i,"theme",e):"daysAfterMonths"===t&&(e?m(i,"days-after-months"):d(i,"days-after-months")),"position"===t&&this.isOpened()&&this._position(e),o[t]&&this._rebuild()),this)},destroy:function(){this._isInited&&(this.close(),this._removeExts(),e.body.removeChild(this._container),this._data=null,this._container=null,this._isInited=null)},_init:function(){if(!this._isInited){this._isInited=!0;var t=this.setting("id"),n=e.createElement("div");t&&(n.id=t),this._container=n,L(n,T),m(n,"theme",this._data.theme),this.setting("daysAfterMonths")&&m(n,"days-after-months"),this._rebuild(),e.body.appendChild(n)}},_isAuto:function(t){return"auto"===t||w(t)},_position:function(t){t=(t||"").split(" ");var e=this.setting("switcher"),n=t[0],i=t[1];if(e&&(this._isAuto(n)||this._isAuto(i))){var o=this._calcBestPosition(n,i,e);n=o.left,i=o.top}S(this._container,this._calcPosition(n,i,e))},_calcPosition:function(t,e,n){var i,o,a=E(n),r=this._container,s=r.offsetWidth,l=r.offsetHeight,c=a.left,h=a.top;if(b(t))switch(t){case"left":i=c;break;case"center":i=c+(n.offsetWidth-s)/2;break;case"right":i=c+n.offsetWidth-s}if(b(e))switch(e){case"top":o=h-l;break;case"center":o=h-(l-n.offsetHeight)/2;break;case"bottom":o=h+n.offsetHeight}return{left:i,top:o}},_calcVisibleSquare:function(t,e,n){var o={x1:t,y1:e,x2:t+this._container.offsetWidth,y2:e+this._container.offsetHeight},a=function(t,e,n,o){return n>=e||t>=o?0:i.min(e,o)-i.max(t,n)},r=a(o.x1,o.x2,n.x1,n.x2),s=a(o.y1,o.y2,n.y1,n.y2);return r*s},_calcBestPosition:function(t,e,n){var i=-1,o=0,a=this._winArea(),r=this._isAuto(t),s=this._isAuto(e);this._bestPositions.forEach(function(l,c){var h,u,f=l[0],d=l[1];(r&&s||r&&e===d||s&&t===f)&&(h=this._calcPosition(f,d,n),u=this._calcVisibleSquare(h.left,h.top,a),u>i&&(i=u,o=c))},this);var l=this._bestPositions[o];return{left:l[0],top:l[1]}},_bestPositions:[["left","bottom"],["left","top"],["right","bottom"],["right","top"],["center","bottom"],["center","top"]],_winArea:function(){var n=e.documentElement,i=t.pageXOffset,o=t.pageYOffset;return{x1:i,y1:o,x2:i+n.clientWidth,y2:o+n.clientHeight}},_current:function(){var t=new n;return{day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}},_update:function(){this._init(),this._position(this.setting("position"))},_findDayByDate:function(t){if(t.year!==this._currentDate.year)return null;var e=this._elemAll("days-month")[t.month];if(e){var n=this._elemAllContext(e,"day")[t.day-1];return n||null}return null},_onresize:function(){this._update()},_onscroll:function(){this._update()},_rebuild:function(){var t=this.isOpened();t&&this._delOpenedEvents(),this._container.innerHTML=this.template.get("main"),t&&(this._openedEvents(),this._monthSelector(this._currentDate.month,!1),this._yearSelector(this._currentDate.year,!1))},_rebuildDays:function(){this._elem("days-container").innerHTML=this.template.get("days"),this._monthSelector(this._currentDate.month,!1)},_intoContainer:function(t){for(var e=t;e;){if(e===this._container)return!0;e=e.parentNode}return!1},_openedEvents:function(){var n=this;this.domEvent.on(e,"click",function(t){!t.button&&n.setting("autocloseable")&&(t.target===n.setting("switcher")||n._intoContainer(t.target)||n.close())},"open"),this.domEvent.on(t,"resize",function(){n._onresize()},"open").on(e,"scroll",function(){n._onscroll()},"open").on(e,"keypress",function(t){27===t.keyCode&&n.close()},"open").on(this._container,"click",function(t){t.button||n.tooltip.hide()},"open");var i=this._elem("days"),o=this._elem("months"),a=this._elem("years"),r=function(t){var e=0;return t.deltaY>0?e=1:t.deltaY<0&&(e=-1),e};this._onwheelmonths=function(t){var e=r(t);e&&(n._monthSelector(n._currentDate.month+e,!0),t.preventDefault())},this._onwheelyears=function(t){var e=r(t);e&&(n._yearSelector(n._currentDate.year+e,!0),t.preventDefault())},this.domEvent.onWheel(i,this._onwheelmonths,"open").onWheel(o,this._onwheelmonths,"open").onWheel(a,this._onwheelyears,"open"),this.domEvent.on(o,"click",function(t){t.button||y(t.target,"month")&&n._monthSelector(+z(t.target,"month"),!0)},"open"),this.domEvent.on(a,"click",function(t){if(!t.button){var e=z(t.target,"year");e&&n._yearSelector(+e,!0)}},"open"),this.domEvent.on(i,"mouseover",function(t){var e=t.target,i=+z(e,"day"),o=+z(e,"month"),a=+n._currentDate.year;y(e,"day")&&_(e,"has-title")&&n.tooltip.show(e,n.title.get(s(a,o,i)))},"open"),this.domEvent.on(i,"mouseout",function(t){y(t.target,"day")&&n.tooltip.hide()},"open"),this.domEvent.on(i,"click",function(t){if(!t.button){var e=n._currentDate,o=t.target,a=z(o,"day"),r=z(o,"month");if(a){if(_(o,"minmax"))return;if(!_(o,"selected")){e.day=+a,e.month=+r;var s=i.querySelector("."+u("day","selected"));s&&d(s,"selected"),m(o,"selected"),n.event.trigger("select",{day:e.day,month:e.month,year:e.year}),n.setting("closeAfterSelection")&&n.close()}}}},"open")},_monthSelector:function(t,e){A>t?t=A:t>N&&(t=N),this._currentDate.month=t;var n,o=this._elem("months"),a=this._elem("month").offsetHeight,r=this._elemAll("days-month"),s=r[t],l=this._elem("month-selector"),c=this._elem("days-container"),h=this._elem("days");e||(m(h,"noanim"),m(o,"noanim"));var u=i.floor(this._currentDate.month*a-a/2);0>=u&&(u=1),u+l.offsetHeight>=o.offsetHeight&&(u=o.offsetHeight-l.offsetHeight-1),J(l,u),n=-i.floor(s.offsetTop-h.offsetHeight/2+s.offsetHeight/2),n>0&&(n=0);var f=h.offsetHeight-c.offsetHeight;f>n&&(n=f),J(c,n),this._colorizeMonths(t),e||this.timeout.set(function(){d(h,"noanim"),d(o,"noanim")},0,"anim")},_yearSelector:function(t,e){var n=this._data,o=n._startYear,a=n._endYear,r=this._currentDate.year;o>t?t=o:t>a&&(t=a),this._currentDate.year=t;var s=this._elem("years"),l=this._elem("years-container"),c=this._elem("year").offsetHeight,h=this._elem("year-selector");e||m(s,"noanim");var u=i.floor((this._currentDate.year-o)*c),f=-i.floor((this._currentDate.year-o)*c-s.offsetHeight/2);f>0&&(f=0),f<s.offsetHeight-l.offsetHeight&&(f=s.offsetHeight-l.offsetHeight);var _=0;s.offsetHeight>=l.offsetHeight&&((a-o+1)%2&&(_=c),f=i.floor((s.offsetHeight-l.offsetHeight-_)/2)),t!==r&&this._rebuildDays(t),J(h,u),J(l,f),this._colorizeYears(t),e||this.timeout.set(function(){d(s,"noanim")},0,"anim")},_maxColor:5,_decolorize:function(t){for(var e=0;e<this._maxColor;e++)for(var n=this._elemAll(t,"color",e),i=0,o=n.length;o>i;i++)d(n[i],"color",e)},_colorizeMonths:function(t){var e=this._elemAll("month");this._decolorize("month"),m(e[t],"color","0"),t-1>=A&&m(e[t-1],"color","0"),N>=t+1&&m(e[t+1],"color","0");for(var n=1,i=t-2;i>=A&&n<this._maxColor;i--,n++)m(e[i],"color",n);for(n=1,i=t+2;N>=i&&n<this._maxColor;i++,n++)m(e[i],"color",n)},_colorizeYears:function(t){var e=this._elemAll("year"),n=this._data._startYear;this._decolorize("year"),m(e[t-n],"color","0");for(var i=1,o=t-1;o>=n&&i<this._maxColor;o--,i++)m(e[o-n],"color",i);for(i=1,o=t+1;o<=this._data._endYear&&i<this._maxColor;o++,i++)m(e[o-n],"color",i)},_delOpenedEvents:function(){this.domEvent.offAll("open")},_prepareYears:function(t){var e,n,o,a=this._current();return b(t)&&(e=t.trim().split(/[:,; ]/),n=v(e[0]),o=v(e[1]),isNaN(n)||isNaN(o)||(i.abs(n)<1e3&&(n=a.year+n),i.abs(o)<1e3&&(o=a.year+o))),{start:n||a.year-11,end:o||a.year+1}},_updateSelection:function(){var t=this._elem("day","selected");if(t&&d(t,"selected"),this._currentDate.year===this._val.year){var e=this._elemAll("days-month");if(e&&e[this._val.month]){var n=this._elemAllContext(e[this._val.month],"day"),i=this._val.day-1;n&&n[i]&&m(n[i],"selected")}}},_addSwitcherEvents:function(t){var e=this.setting("switcher"),n=this,i=j(t)?t:[t||"click"],o=["input","textarea"],a=["focus","mouseover"];if(this.domEvent.offAll("switcher"),-1===i.indexOf("none")&&e){var r=e.tagName.toLowerCase();i.forEach(function(t){n.domEvent.on(e,t,function(){-1!==o.indexOf(r)||-1!==a.indexOf(t)?n.open():n.toggle()},"switcher")})}},_switcherText:function(){var t=this._currentDate,e=this.text("months"),n=this.text("caseMonths");return t.day+" "+(n||e)[t.month]+" "+t.year},_updateSwitcher:function(){var t,e=this.setting("switcher"),n=this._switcherText();e&&(t=e.tagName.toLowerCase(),"input"===t||"textarea"===t?e.value=n:e.innerHTML=n)},_elem:function(t,e,n){return this._container.querySelector("."+u(t,e,n))},_elemAll:function(t,e,n){return this._container.querySelectorAll("."+u(t,e,n))},_elemAllContext:function(t,e,n,i){return t.querySelectorAll("."+u(e,n,i))}}),a(O.prototype,{_initExts:function(t){O._exts.forEach(function(t){var e=t[0],n=t[1]||function(){},i=t[2];a(n.prototype,i),this[e]=new n;var o=this[e];o.parent=this,o.init&&o.init(this._data,this._container)},this)},_removeExts:function(){O._exts.forEach(function(t){var e=t[0];this[e].destroy(),delete this[e]},this)}}),O._exts=[],O.addExt=function(t,e,n){O._exts.push([t,e,n])};var C=e.createElement("div"),z=C.dataset?function(t,e){return t.dataset[e]}:function(t,e){return t.getAttribute("data-"+e)},H=!!C.classList,L=H?function(t,e){t.classList.add(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");n.test(e.className)||(t.className=(t.className+" "+e).replace(/\s+/g," ").replace(/(^ | $)/g,""))},W=H?function(t,e){t.classList.remove(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");t.className=t.className.replace(n,"$1").replace(/\s+/g," ").replace(/(^ | $)/g,"")},P=H?function(t,e){return t.classList.contains(e)}:function(t,e){var n=new RegExp("(^|\\s)"+e+"(\\s|$)","g");return-1!==t.className.search(n)},T="calendula";a(O,{addHolidays:function(t,e){this._holidays=this._holidays||{},this._holidays[t]=e}}),O.prototype.getHoliday=function(t,e,n){var i=this._data.locale,a=O._holidays;return a&&a[i]&&a[i][n]?a[i][n][t+"-"+(e+1)]:o};var Y=function(){var t=function(n){if(null===n||n===o)return"";var i=[];if(g(n))return e(n);if(j(n)){for(var a=0,r=n.length;r>a;a++)i.push(t(n[a]));return i.join("")}return""+n},e=function(e){var i=e.t||"div",o="<"+i+n(e)+">";return e.c&&(o+=t(e.c)),o+="</"+i+">"},n=function(t){var e,n,o=Object.keys(t),a=["c","t","e","m"],r=[],s=[],l="";if(t.e&&s.push(u(t.e)),t.m)if(t.e)for(e in t.m)t.m.hasOwnProperty(e)&&s.push(u(t.e,e,t.m[e]));else for(e in t.m)t.m.hasOwnProperty(e)&&s.push(f(e,t.m[e]));for(s.length&&r.push(i("class",s)),e=0,n=o.length;n>e;e++){var c=o[e];-1===a.indexOf(c)&&r.push(i(c,t[c]))}return l=r.join(" "),l?" "+l:""},i=function(t,e){return null!==e&&e!==o?t+'="'+(j(e)?e.join(" "):e)+'"':""};return t}();a(O,{_locales:[],_texts:{},addLocale:function(t,e){this._locales.push(t),this._texts[t]=e,e.def&&(this._defaultLocale=t)}}),O.prototype.text=function(t){return O._texts[this._data.locale][t]};var j=Array.isArray,J=function(){var t=e.createElement("div"),n=!1;return["Moz","Webkit","O","ms",""].forEach(function(e){var i=e+(e?"T":"t")+"ransform";i in t.style&&(n=i)}),n===!1?function(t,e){t.style.top=x(e)?e+"px":e}:function(t,e){t.style[n]="translateY("+(x(e)?e+"px":e)+")"}}(),F="onwheel"in e.createElement("div")?"wheel":e.onmousewheel!==o?"mousewheel":"DOMMouseScroll";O.addExt("domEvent",function(){this._buf=[]},{onWheel:function(e,n,i){return this.on(e,"DOMMouseScroll"===F?"MozMousePixelScroll":F,"wheel"===F?n:function(e){e||(e=t.event);var i={originalEvent:e,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"===e.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}},o=-1/40;return"mousewheel"===F?(i.deltaY=o*e.wheelDelta,e.wheelDeltaX&&(i.deltaX=o*e.wheelDeltaX)):i.deltaY=e.detail,n(i)},i)},on:function(t,e,n,i){return t&&e&&n&&(t.addEventListener(e,n,!1),this._buf.push({elem:t,type:e,callback:n,ns:i})),this},off:function(t,e,n,i){for(var o=this._buf,a=0;a<o.length;a++){var r=o[a];r&&r.elem===t&&r.callback===n&&r.type===e&&r.ns===i&&(t.removeEventListener(e,n,!1),o.splice(a,1),a--)}return this},offAll:function(t){for(var e=this._buf,n=0;n<e.length;n++){var i=e[n];t?t===i.ns&&(i.elem.removeEventListener(i.type,i.callback,!1),e.splice(n,1),n--):i.elem.removeEventListener(i.type,i.callback,!1)}return t||(this._buf=[]),this},destroy:function(){this.offAll(),delete this._buf}}),O.addExt("event",function(){this._buf=[]},{on:function(t,e){return t&&e&&this._buf.push({type:t,callback:e}),this},off:function(t,e){for(var n=this._buf,i=0;i<n.length;i++)e===n[i].callback&&t===n[i].type&&(n.splice(i,1),i--);return this},trigger:function(t,e){for(var n=this._buf,i=0;i<n.length;i++)t===n[i].type&&n[i].callback.call(this,{type:t},e);return this},destroy:function(){delete this._buf}});var V=6,$=0;return O.addExt("template",null,{get:function(t){return Y(this[t]())},days:function(){for(var t=[],e=A;N>=e;e++)t.push(this.month(e,this.parent._currentDate.year));return t},dayNames:function(){for(var t=this.parent.text("firstWeekday")||0,e={first:t,last:t?t-1:V},n=t,i=0;7>i;i++)e[n]=i,n++,n>V&&(n=$);return e},month:function(t,e){var i=new n(e,t,1,12,0,0,0),o=i.getTime(),a=new n,l=function(t,e,n){var i=m._val;return t===i.day&&e===i.month&&n===i.year},c=function(t){return t.year?new n(t.year,t.month,t.day,12,0,0,0).getTime():null},h=function(){var n=function(t){return v(""+t.year+r(t.month))},i=n(b),o=n(x),a={},s=v(""+e+r(t));return(b&&i>s||x&&s>o)&&(a.minmax=!0),{e:"days-title-month",m:a,c:g}};a.setHours(12,0,0,0);for(var u,f,d,m=this.parent,_=i.getDay(),y=this.dayNames(),p=y[_],g=m.text("months")[t],b=m.setting("min"),x=m.setting("max"),D=c(b),w=c(x),E=a.getTime(),S={t:"tr",c:[_!==y.first?{t:"td",colspan:p,e:"empty",c:3>p?"":h()}:""]},M=S,k={e:"days-month",c:[3>p?h():"",{t:"table",e:"days-table",c:[M]}]},A=1;i.getMonth()===t;i.setDate(++A)){u="",o=+i,_=i.getDay(),f=m.getHoliday(A,t,e),d={},_===$||_===V?d.holiday=!0:d.workday=!0,0===f?d.nonholiday=!0:1===f&&(d.highday=!0),l(A,t,e)&&(d.selected=!0),E===o&&(d.now=!0,u=m.text("today")),(D&&D>o||w&&o>w)&&(d.minmax=!0);var N=m.title.get(s(e,t,A));N&&(d["has-title"]=!0,d["title-color"]=N.color||"default"),_===y.first&&(M={t:"tr",c:[]},k.c[1].c.push(M)),M.c.push({t:"td",e:"day",m:d,title:u,"data-month":t,"data-day":A,c:A})}return k},years:function(){for(var t=this.parent._data,e=t._startYear,n=t._endYear,i=[{e:"year-selector",c:{e:"year-selector-i"}}],o=e;n>=o;o++)i.push({e:"year","data-year":o,c:o});return i},months:function(){var t=[{e:"month-selector",c:{e:"month-selector-i"}}];return this.parent.text("months").forEach(function(e,n){t.push({e:"month","data-month":n,c:e})}),t},main:function(){var t=this.parent,e=t.text("firstWeekday")||$,n=t.text("dayNames")||[],i=[];return t.text("shortDayNames").forEach(function(t,o,a){i.push({e:"short-daynames-cell",m:{n:e},title:n[e]||a[e],c:a[e]}),e++,e>V&&(e=$)},this),[{e:"short-daynames",c:i},{e:"container",c:[{e:"days",c:{e:"days-container",c:this.days()}},{e:"months",c:this.months()},{e:"years",c:{e:"years-container",c:this.years()}}]}]},destroy:function(){}}),O.addExt("timeout",function(){this._buf=[]},{set:function(t,e,n){var i=this,o=setTimeout(function(){t(),i.clear(o)},e);return this._buf.push({id:o,ns:n}),o},clear:function(t){var e=this._buf,n=-1;return e&&(e.some(function(e,i){return e.id===t?(n=i,!0):!1}),n>=0&&(clearTimeout(e[n].id),e.splice(n,1))),this},clearAll:function(t){var e=this._buf,n=[],i=Array.isArray(t)?t:[t];return e.forEach(function(e,o){t?-1!==i.indexOf(e.ns)?clearTimeout(e.id):n.push(e):clearTimeout(e.id)},this),this._buf=t?n:[],this},destroy:function(){this.clearAll(),delete this._buf}}),O.addExt("title",function(){this._title={}},{init:function(t){this.set(t.title)},get:function(t){var e=c(t);return e?this._title[e]:o},set:function(t){j(t)?t.forEach(function(e){this._set(t)},this):g(t)&&this._set(t)},_set:function(t){var e,n=c(t.date),i=this.parent;n&&(this._title[n]={text:t.text,color:t.color},i._isInited&&(e=i._findDayByDate(h(t.date)),e&&(m(e,"has-title"),m(e,"title-color",t.color))))},remove:function(t){j(t)?t.forEach(function(t){this._remove(t)},this):this._remove(t)},_remove:function(t){var e=this.parent,n=c(t);if(n&&(delete this._title[n],e._isInited)){var i=e._findDayByDate(h(t));i&&(d(i,"has-title"),d(i,"title-color"))}},removeAll:function(){if(this._title={},this.parent._isInited){var t=this.parent._elemAll("day","has-title");if(t)for(var e=0,n=t.length;n>e;e++)d(t[e],"has-title"),d(t[e],"title-color")}},destroy:function(){delete this._title}}),O.addExt("tooltip",null,{create:function(){if(!this._container){var t=e.createElement("div");L(t,u("tooltip")),t.innerHTML=Y([{e:"tooltip-text"},{e:"tooltip-tail"}]),e.body.appendChild(t),this._container=t}},show:function(t,e){var n=e||{},i=5;this.create(),m(this._container,"theme",this.parent.setting("theme")),m(this._container,"visible"),this._container.querySelector(".calendula__tooltip-text").innerHTML=Y({c:n.text,e:"tooltip-row"}),m(this._container,"color",n.color||"default"),this._isOpened=!0;var o=E(t),a=o.left-(this._container.offsetWidth-t.offsetWidth)/2,r=o.top-this._container.offsetHeight-i;S(this._container,{left:a,top:r})},hide:function(){this._isOpened&&(d(this._container,"visible"),this._isOpened=!1)},destroy:function(){this._container&&(this.hide(),e.body.removeChild(this._container),delete this._container)}}),O})}(this,this.document,Date,Math),Calendula.addLocale("be",{months:["студзень","люты","сакавік","красавік","май","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],caseMonths:["студзеня","лютага","сакавіка","красавіка","траўня","траўня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня"],shortDayNames:["Н","П","А","С","Ч","П","С"],dayNames:["Нядзеля","Панядзелак","Аўторак","Серада","Чацьвер","Пятніца","Субота"],today:"Сення",firstWeekday:1}),Calendula.addLocale("de",{months:["Januar","Februar","Marz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],shortDayNames:["So","Mo","Di","Mi","Do","Fr","Sa"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],today:"Heute",firstWeekday:1}),Calendula.addLocale("en",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],today:"Today",firstWeekday:0,def:!0}),Calendula.addLocale("es",{months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],shortDayNames:["Do","Lu","Ma","Mi","Ju","Vi","S?"],dayNames:["Domingo","Lunes","Martes","Mi?rcoles","Jueves","Viernes","S?bado"],today:"Hoy",firstWeekday:1}),Calendula.addLocale("fr",{months:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],shortDayNames:["Di","Lu","Ma","Me","Je","Ve","Sa"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],today:"Aujourd’hui",firstWeekday:1}),Calendula.addLocale("it",{months:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],shortDayNames:["Do","Lu","Ma","Me","Gi","Ve","Sa"],dayNames:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],today:"Oggi",firstWeekday:1}),Calendula.addLocale("pl",{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],caseMonths:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"],shortDayNames:["N","P","W","Ś","C","P","S"],dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],today:"Dziś",firstWeekday:1}),Calendula.addLocale("ru",{months:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],caseMonths:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],shortDayNames:["В","П","В","С","Ч","П","С"],dayNames:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],today:"Сегодня",firstWeekday:1}),Calendula.addLocale("tr",{months:["ocak","şubat","mart","nisan","mayıs","haziran","temmuz","ağustos","eylül","ekim","kasım","aralık"],shortDayNames:["Pz","Pt","Sa","Ça","Pe","Cu","Ct"],dayNames:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],today:"Bugün",firstWeekday:1}),Calendula.addLocale("uk",{months:["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"],caseMonths:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],shortDayNames:["Н","П","В","С","Ч","П","С"],dayNames:["Неділя","Понеділок","Вівторок","Середа","Четвер","П’ятниця","Субота"],today:"Сьогодні",firstWeekday:1});