!function(e,t){"use strict";var n=t.module("app",["ngRoute","ngAnimate","ngTouch","appLocale"]);n.config(["$locationProvider","$routeProvider",function(e,t){e.html5Mode(!1),t.when("/",{templateUrl:"views/dashboard.html",controller:"dashboardController",animation:null,level:0}).when("/settings",{templateUrl:"views/settings.html",controller:"settingsController",animation:"raise-anim",level:1}).when("/drinking",{templateUrl:"views/drinking.html",controller:"createDrinkingController",animation:"slide-anim",level:2}).when("/drinking/:id",{templateUrl:"views/drinking.html",controller:"updateDrinkingController",animation:"slide-anim",level:2}).when("/presets",{templateUrl:"views/presets.html",controller:"presetsController",animation:"slide-anim",level:1}).when("/preset",{templateUrl:"views/preset.html",controller:"createPresetController",animation:"slide-anim",level:2}).when("/preset/:id",{templateUrl:"views/preset.html",controller:"updatePresetController",animation:"slide-anim",level:2}).when("/about",{templateUrl:"views/about.html",controller:"aboutController",animation:"slide-anim",level:1}).otherwise({redirectTo:"/"})}]),n.controller("AppCtrl",["$scope","$rootScope","$window","$location","$document","$http",function(e,n,a,i){var r=a.localStorage.getItem("profile");n.profile=r?t.fromJson(r):{weight:75,gender:"m"},n.$watch("profile",function(){a.localStorage.setItem("profile",t.toJson(n.profile))});var o=a.localStorage.getItem("skipWelcome");n.skipWelcome=o?t.fromJson(o):!1,n.$watch("skipWelcome",function(){a.localStorage.setItem("skipWelcome",t.toJson(n.skipWelcome))}),i.path("/"),e.animation="",e.go=function(e){i.path(e)},e.goBack=function(){a.history.back()},e.$on("$routeChangeStart",function(t,n,a){n&&a&&(e.animation=n.level<a.level?a?a.animation+"-reverse":"":n?n.animation:"")})}])}(window,window.angular),angular.module("app").run(["$templateCache",function(e){e.put("templates/ad-banner.html","<div class=ad-banner><div ng-hide=noFill></div></div>"),e.put("templates/chart.html",'<div class=chart><div class=loading ng-hide=chartReady><progress></progress></div><canvas width="{{31 * ratio}}" height="{{225 * ratio}}"></canvas><article><canvas width="{{7440 * ratio}}" height="{{225 * ratio}}"></canvas></article></div>'),e.put("views/about.html",'<section role=region><header><a ng-click=goBack()><span class="gaia-icon icon-back"></span></a><h1 translate=ABOUT></h1></header><article class=content><ul><li><div class=about><img src=icons/icon_60.png><aside><p class=large translate=ALCOHOL_CALCULATOR></p><p class=micro><span translate=COPYRIGHT></span><br><span translate=AUTHOR></span></p></aside></div><p class=small translate=ABOUT_MSG_1></p><p class=small translate=ABOUT_MSG_2></p><p ng-if=notInstalled><button ng-disabled=installing ng-click=install() translate=INSTALL></button></p></li></ul></article></section>'),e.put("views/dashboard.html",'<section data-type=sidebar aria-expanded={{sideNavOpen}}><header></header><nav><ul><li><a ng-click="go(\'/settings\')" translate=SETTINGS></a></li><li><a ng-click="go(\'/presets\')" translate=DRINK_PRESETS></a></li><li><a ng-click="go(\'/about\')" translate=ABOUT></a></li></ul></nav></section><section role=region><header><a ng-click="sideNavOpen = false"><span class="gaia-icon icon-menu"></span></a> <a ng-click="sideNavOpen = true"><span class="gaia-icon icon-menu"></span></a><menu type=toolbar><a ng-click="go(\'/drinking\')"><span class="ac-icon ac-icon-add-drink"></span></a></menu><h1 translate=ALCOHOL_CALCULATOR></h1></header><article class=content><ul role=tablist class=bb-tablist><li role=presentation aria-selected="{{tab === \'chart\'}}"><a role=tab class="ac-icon ac-icon-chart" ng-click="tab = \'chart\'" aria-selected="{{tab === \'chart\'}}"></a><div class=bb-tabpanel role=tabpanel aria-selected="{{tab === \'chart\'}}"><div ng-include="loadedChartTab ? \'views/dashboardChart.html\' : null"></div></div></li><li role=presentation aria-selected="{{tab === \'list\'}}"><a role=tab class="ac-icon ac-icon-list" ng-click="tab = \'list\'" aria-selected="{{tab === \'list\'}}"></a><div class=bb-tabpanel role=tabpanel aria-selected="{{tab === \'list\'}}"><div ng-if=loadedListTab ng-include="\'views/dashboardList.html\'"></div></div></li></ul></article></section><form role=dialog data-type=confirm ng-show=welcomeDialogOpen><section><h1 translate=WELCOME></h1><p translate=SETUP_SETTINGS></p><p translate=SETUP_DRING_PRESETS></p><label class=pack-checkbox><input checked type=checkbox ng-model=skipWelcome> <span></span> {{::\'DONT_DISPLAY_NEXT_TIME\' | translate}}</label></section><menu><button class=recommend ng-click="welcomeDialogOpen = false" translate=OK_GOT_IT></button></menu></form>'),e.put("views/dashboardChart.html","<div ng-controller=dashboardChartController><ad-banner hold-on=350></ad-banner><ul><li><p ng-if=state.closingDate class=small><strong>{{state.value | number: 3}}&permil;</strong> {{::'SOBER_AT' | translate}} <strong>{{state.closingDate | date: 'HH:mm'}}</strong></p><p ng-if=state.deltaEmptyDate class=small>{{::'SOBER_FOR' | translate}} <strong>{{state.deltaEmptyDate | deltaTime}}</strong></p><p ng-if=\"!state.closingDate && !state.deltaEmptyDate\" class=small translate=NO_DRINKS_THIS_MONTH></p></li><li><chart data=chartData></chart></li></ul></div>"),e.put("views/dashboardList.html",'<section data-type=list ng-controller=dashboardListController><ul ng-if="drinkings.length > 0"><li ng-repeat="drinking in ::drinkings track by ::drinking.id" ng-class="{\'next-group\': ($index > 0 && isNextDay(drinking.date, drinkings[$index-1].date))}"><aside class=pack-end><p>{{::drinking.alcoholContent}}% / {{::drinking.volume}}ml</p></aside><a ng-click="go(\'/drinking/{{::drinking.id}}\')"><p>{{::drinking.drinkName}}</p><p><time>{{::drinking.date | date: \'MM.dd.yyyy HH:mm\'}}</time></p></a></li><li class=load-more ng-if=hasNextPage><a ng-click=fetchDrinkingsNextPage()><p translate=LOAD_MORE_RECORDS></p></a></li></ul><div ng-if="drinkings.length === 0" class="tooltip ac-icon ac-icon-drink"><div class=message><p translate=NO_DRINKS></p><p translate=START_ADDING_THEM_NOW></p><p class="ac-icon ac-icon-add-drink" translate=ADD_NEW_DRINK></p></div></div></section>'),e.put("views/drinking.html",'<section role=region><header><a ng-click=goBack()><span class="gaia-icon icon-back"></span></a><menu type=toolbar><button ng-disabled=drinkingForm.$invalid ng-click=save()>{{::isUpdate ? \'UPDATE\' : \'DONE\' | translate}}</button></menu><h1>{{::isUpdate ? \'EDIT_DRINK\' : \'ADD_DRINK\' | translate}}</h1></header><article class="content skin-organic"><form name=drinkingForm><header><h2 translate=TIME></h2></header><p><input type=date ng-model=date class=date-field required placeholder="{{::\'DATE\' | translate}}"> <input type=time ng-model=time date-display-format=HH:mm class=time-field required placeholder="{{::\'TIME\' | translate}}"></p><header><h2 translate=DRINK_OPTIONS></h2></header><p><button type=button class=recommend ng-click="presetDialogOpen = true" ng-disabled="drinks.length  === 0" translate=SELECT_PRESET></button></p><p><input type=text ng-model=drinking.drinkName name=drinkName required placeholder="{{\'DRINK_NAME\' | translate}}"></p><p><input type=number ng-model=drinking.volume name=volume min=0 step=any required placeholder="{{\'VOLUME_ML\' | translate}}"></p><p><input type=number ng-model=drinking.alcoholContent name=alcoholContent min=0 max=100 step=any required placeholder="{{\'ALCOHOL_CONTENT_PERCENT\' | translate}}"></p><p><button type=button ng-click=savePreset() ng-disabled="drinkExist || !(drinkingForm.drinkName.$valid && drinkingForm.volume.$valid && drinkingForm.alcoholContent.$valid)" translate=SAVE_AS_PRESET></button></p><footer ng-hide=!drinking.id><button type=button class=danger ng-click=delete() ng-hide=!drinking.id translate=DELETE></button></footer></form></article></section><form role=dialog data-type=action ng-show=presetDialogOpen ng-init="presetDialogOpen = false"><header><h1 translate=SELECT_DRINK></h1></header><menu><button ng-repeat="drink in drinks track by ::drink.id" ng-click="setDrink(drink); $parent.presetDialogOpen = false">{{::drink.name}}</button> <button ng-click="presetDialogOpen = false" translate=CANCEL></button></menu></form>'),e.put("views/preset.html","<section role=region><header><a ng-click=goBack()><span class=\"gaia-icon icon-back\"></span></a><menu type=toolbar><button ng-disabled=presentForm.$invalid ng-click=save()>{{::isUpdate ? 'UPDATE' : 'DONE' | translate}}</button></menu><h1>{{::isUpdate ? 'EDIT_PRESET' : 'ADD_PRESET' | translate}}</h1></header><article class=\"content skin-organic\"><form name=presentForm><header><h2 translate=DRINK_OPTIONS></h2></header><p><input type=text ng-model=drink.name required placeholder=\"{{::'DRINK_NAME' | translate}}\"></p><p><input type=number ng-model=drink.volume min=0 step=any required placeholder=\"{{::'VOLUME_ML' | translate}}\"></p><p><input type=number ng-model=drink.alcoholContent min=0 max=100 step=any required placeholder=\"{{::'ALCOHOL_CONTENT_PERCENT' | translate}}\"></p><footer ng-hide=!drink.id><button class=danger ng-click=delete() translate=DELETE></button></footer></form></article></section>"),e.put("views/presets.html",'<section role=region><header><a ng-click=goBack()><span class="gaia-icon icon-back"></span></a><menu type=toolbar><a ng-click="go(\'/preset\')"><span class="gaia-icon icon-newadd"></span></a></menu><h1 translate=DRINK_PRESETS></h1></header><article class=content data-type=list><ul ng-if="drinks.length > 0"><li ng-repeat="drink in ::drinks track by ::drink.id"><aside class=pack-end><p>{{::drink.alcoholContent}}% / {{::drink.volume}}ml</p></aside><a ng-click="go(\'/preset/{{drink.id}}\')"><p>{{::drink.name}}</p></a></li></ul><div ng-if="drinks.length === 0" class="tooltip ac-icon ac-icon-drink"><div class=message><p translate=NO_DRINK_PRESETS></p><p translate=START_ADDING_THEM_NOW></p><p class="gaia-icon icon-newadd" translate=ADD_NEW_DRINK_PRESET></p></div></div></article></section>'),e.put("views/settings.html","<section role=region class=skin-organic><header><a ng-click=goBack()><span class=\"gaia-icon icon-closecancel\"></span></a><menu type=toolbar><button ng-disabled=profileForm.$invalid ng-click=save() translate=DONE></button></menu><h1 translate=SETTINGS></h1></header><article class=\"content settings\"><form name=profileForm><header><h2 translate=WEIGHT></h2></header><ul><li><input type=number ng-model=profile.weight required step=any min=0 placeholder=\"{{::'WEIGHT_KG' | translate}}\"></li></ul><header><h2 translate=GENER></h2></header><ul><li><label class=pack-radio>{{::'MAN' | translate}} <input type=radio ng-model=profile.gender value=m> <span></span></label></li><li><label class=pack-radio>{{::'WOMAN' | translate}} <input type=radio ng-model=profile.gender value=w> <span></span></label></li></ul></form></article></section>")}]),function(e,t){"use strict";var n=t.module("app");n.filter("translate",["locale",function(e){return function(t){return e.MESSAGES[t]}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.filter("deltaTime",["locale",function(e){return function(t){var n=Math.floor(t/864e5);t-=864e5*n;var a=Math.floor(t/36e5);t-=36e5*a;var i=Math.floor(t/6e4),r=[];return n&&r.push(n,e.getPlural(n,"DAY")),a&&(n&&r.push(e.MESSAGES.AND),r.push(a,e.getPlural(a,"HOUR"))),n||(a&&r.push(e.MESSAGES.AND),r.push(i,e.getPlural(i,"MINUTE"))),r.join(" ")}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.directive("chart",["$window","$filter",function(e,t){function n(e){var t=e.axisCanvas,n=t.getContext("2d");n.save(),n.setTransform(e.ratio,0,0,e.ratio,0,.5,.5),n.clearRect(-.5,-.5,31,225),n.font="14px MozTT, sans-serif",n.fillStyle="#424242",n.fillText("3\u2030",0,26),n.fillText("2\u2030",0,76),n.fillText("1\u2030",0,126),n.fillText("0\u2030",0,176),n.restore()}function a(e){function n(e,t,n,a){g.beginPath(),g.moveTo(e,t),g.lineTo(n,a),g.stroke()}function a(e){return Math.round((e-s)/36e5*10)}var i,r,o,l,s=e.data.startDate,c=e.data.endDate,d=e.data.currentDate,u=e.data.currentValue,p=e.data.values,g=e.chartCanvas.getContext("2d");for(g.save(),g.setTransform(e.ratio,0,0,e.ratio,0,.5,.5),g.clearRect(-.5,-.5,7440,225),g.font="14px MozTT, sans-serif",g.strokeStyle="#e7e7e7",n(0,30,7440,30),n(0,80,7440,80),n(0,130,7440,130),n(0,180,7440,180),g.strokeStyle="#e7e7e7",g.fillStyle="#424242",l=s;c>=l;){i=new Date(l);var m=i.getHours(),f=m%4===0;r=a(l),f&&(g.textAlign=l===s?"start":l===c?"end":"center",g.fillText(t("date")(l,"HH"),r,203)),n(r,185,r,f?0:180),l+=36e5}for(i=new Date(s),i.setHours(12),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),g.fillStyle="#404040",g.textAlign="center",l=i.getTime();c>=l;)r=a(l),g.fillText(t("date")(l,"mediumDate"),r,220),l+=864e5;g.strokeStyle="#bbda00",g.fillStyle="rgba(187, 218, 0, 0.25)",g.lineWidth=2;var h=0;for(var k in p){var v=p[k];(0!==v||0!==h)&&g.lineTo(a(k),180-50*v),0===v&&(0===h?(g.beginPath(),g.moveTo(a(k),180)):(g.fill(),g.stroke())),h=v}r=a(d),o=180,g.fillStyle="#25abcf",g.beginPath(),g.moveTo(r,o),g.lineTo(r-5,o+10),g.lineTo(r+5,o+10),g.fill(),g.lineWidth=1,g.strokeStyle="#25abcf",n(r,190,r,0),u>0&&(g.beginPath(),g.fillStyle="#fff",g.lineWidth=2,g.arc(a(d),180-50*u,4,0,2*Math.PI),g.fill(),g.strokeStyle="#25abcf",g.stroke()),g.restore()}function i(t,i){t.chartReady=!1;var r=i.find("article")[0],o=i.find("canvas");t.axisCanvas=o[0],t.chartCanvas=o[1];var l=e.devicePixelRatio||1,s=t.axisCanvas.getContext("2d"),c=s.webkitBackingStorePixelRatio||s.mozBackingStorePixelRatio||s.backingStorePixelRatio||1;t.ratio=l/c,t.$watch(function(){return t.data?{startDate:t.data.startDate,endDate:t.data.endDate,values:t.data.values,currentDate:t.data.currentDate,currentValue:t.data.currentValue}:t.data},function(){t.data&&(t.chartReady||(n(t),r.scrollLeft=r.scrollWidth-r.clientWidth-130),a(t),t.chartReady=!0)},!0)}return{restrict:"E",replace:!0,transclude:!1,link:i,scope:{data:"=data"},templateUrl:"templates/chart.html"}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.directive("adBanner",["$window","$filter","$timeout",function(e,t,n){function a(t,a){t.noFill=!1,"_inmobi"in e&&n(function(){e._inmobi.getNewAd(a.find("div")[0],{siteid:"f9a2cade13ce40f3b3d46b40f29f331f",slot:"15",manual:!0,autoRefresh:60,test:!1,onError:function(e){t.noFill="nfr"===e,t.$apply()}})},t.holdOn||0)}return{restrict:"E",replace:!0,transclude:!1,link:a,scope:{holdOn:"=holdOn"},templateUrl:"templates/ad-banner.html"}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.directive("translate",["locale",function(e){function t(t,n,a){a.translate&&(n[0].innerHTML=a.translate in e.MESSAGES?e.MESSAGES[a.translate]:a.translate)}return{restrict:"A",link:t}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.directive("dateDisplayFormat",["$filter",function(e){return{restrict:"A",require:"ngModel",link:function(t,n,a,i){i.$formatters=[function(t){return e("date")(t,a.dateDisplayFormat)}]}}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.factory("database",["$q","$log","$window",function(e,t,n){function a(e){if(E)e();else if(v=n.indexedDB||n.webkitIndexedDB||n.mozIndexedDB||n.msIndexedDB,w=n.IDBKeyRange||n.webkitIDBKeyRange||n.mozIDBKeyRange||n.msIDBKeyRange,v){var a=v.open(D,b);a.onerror=function(e){t.error(e)},a.onsuccess=function(){E=a.result,E.onerror=function(e){t.error(e)},e()},a.onupgradeneeded=i}else t.error("IndexedDB is not available")}function i(e){t.log("Upgrading db");var n=e.target.result,a=n.createObjectStore("drinkings",{keyPath:"id",autoIncrement:!0});a.createIndex("date","date",{unique:!1}),a=n.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0}),a.createIndex("name","name",{unique:!0}),t.log("Upgrading db done")}function r(e,t,n){var a=E.transaction(e,t);return a.onerror=function(e){n.reject(e.target.error)},a.objectStore(e)}function o(t,n){var i=e.defer();return a(function(){var e=[],a=w.bound(t,n,!0,!0);r("drinkings","readonly",i).index("date").openCursor(a,"next").onsuccess=function(t){var n=t.target.result;n?(e.push(n.value),n.continue()):i.resolve(e)}}),i.promise}function l(t,n){var i=e.defer();return a(function(){var e=[];r("drinkings","readonly",i).index("date").openCursor(null,"prev").onsuccess=function(a){var r=a.target.result;t?(r.advance(t),t=0):r&&e.length<n?(e.push(r.value),r.continue()):(e.hasNextPage=null!==r,i.resolve(e))}}),i.promise}function s(t){var n=e.defer();return a(function(){var e=r("drinkings","readonly",n);e.get(t).onsuccess=function(e){n.resolve(e.target.result)}}),n.promise}function c(t){var n=e.defer();return a(function(){var e=r("drinkings","readwrite",n);e.transaction.oncomplete=function(e){n.resolve(e.target.result)},e.add(t)}),n.promise}function d(t){var n=e.defer();return a(function(){var e=r("drinkings","readwrite",n);e.transaction.oncomplete=function(){n.resolve()},e.put(t)}),n.promise}function u(t){var n=e.defer();return a(function(){var e=r("drinkings","readwrite",n);e.transaction.oncomplete=function(){n.resolve()},e.delete(t)}),n.promise}function p(){var t=e.defer();return a(function(){var e=[];r("drinks","readonly",t).index("name").openCursor(null,"next").onsuccess=function(n){var a=n.target.result;a?(e.push(a.value),a.continue()):t.resolve(e)}}),t.promise}function g(t){var n=e.defer();return a(function(){var e=r("drinks","readonly",n);e.get(t).onsuccess=function(e){n.resolve(e.target.result)}}),n.promise}function m(t){var n=e.defer();return a(function(){var e=r("drinks","readonly",n);e.index("name").get(t).onsuccess=function(e){n.resolve(void 0!==e.target.result)}}),n.promise}function f(t){var n=e.defer();return a(function(){var e=r("drinks","readwrite",n);e.transaction.oncomplete=function(e){n.resolve(e.target.result)},e.add(t)}),n.promise}function h(t){var n=e.defer();return a(function(){var e=r("drinks","readwrite",n);e.transaction.oncomplete=function(){n.resolve()},e.put(t)}),n.promise}function k(t){var n=e.defer();return a(function(){var e=r("drinks","readwrite",n);e.transaction.oncomplete=function(){n.resolve()},e.delete(t)}),n.promise}var v,w,D="DrinkLog",b=1,E=null;return{getDrinkingsByPage:l,getDrinkingsByRange:o,getDrinking:s,createDrinking:c,updateDrinking:d,deleteDrinking:u,getDrinks:p,getDrink:g,createDrink:f,updateDrink:h,deleteDrink:k,hasDrink:m}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.factory("calculator",["$rootScope",function(e){function t(t){var n=e.profile.weight*("m"===e.profile.gender?.7:.6),i=e.profile.weight*("m"===e.profile.gender?.1:.085),r=0,o=0,l=0,s={};for(var c in t){var d=t[c],u=d.volume*(d.alcoholContent/100)*.8,p=(d.date-o)/36e5;if(r=Math.max(r-i*p,0),0===r&&l<d.date-a)l&&(s[l]=0,l=0),s[d.date-a]=0;else if(d.date-o>a){var g=Math.max(r-i*(a/36e5),0);s[d.date-a]=g/n}r+=u,o=d.date,l=o+Math.round(r/i*36e5),s[o]=r/n}return l&&(s[l]=0),s}function n(e,t){for(var n=t.getTime(),a=Object.keys(e),i=0,r=0,o=a.length-1;o>=0&&(!i||!r);o--){var l=a[o];i?l>i&&n>=l&&(i=l):n>=l&&(i=l),r?r>l&&l>=n&&(r=l):l>=n&&(r=l)}var s={date:n};if(i&&r){var c=r-i,d=e[r]-e[i],u=(n-i)/c;s.value=e[i]+u*d}else s.value=0;if(a.length>0){var p=a[a.length-1];p>n?(s.closingDate=p,s.deltaEmptyDate=0):(s.closingDate=0,s.deltaEmptyDate=n-p)}else s.closingDate=0,s.deltaEmptyDate=0;return s}var a=6e5;return{createCourse:t,getState:n}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.factory("modal",["$document","$timeout",function(e,n){function a(a){var i=e.find("body"),r=t.element("<section role='status' class='onviewport'><p>"+a+"</p></section>");i.append(r),n(function(){r.removeClass("onviewport"),n(function(){r.remove()},300)},2e3)}return{status:a}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("dashboardController",["$scope","$rootScope","$window",function(e,t){e.tab=t.dahsboardTab?t.dahsboardTab:"chart",e.skipWelcome=t.skipWelcome,e.sideNavOpen=!1,e.welcomeDialogOpen=!1,t.skipWelcome||t.dahsboardShowed||(e.sideNavOpen=!0,e.welcomeDialogOpen=!0,t.dahsboardShowed=!0),e.loadedChartTab=!1,e.loadedListTab=!1,e.$watch("tab",function(n){switch(t.dahsboardTab=n,n){case"chart":e.loadedChartTab=!0;break;case"list":e.loadedListTab=!0}}),e.$watch("skipWelcome",function(e){t.skipWelcome=e})}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("dashboardChartController",["$scope","$interval","$timeout","database","calculator",function(e,t,n,a,i){function r(){o(),e.state=i.getState(e.course,new Date),e.chartData.currentDate=e.state.date,e.chartData.currentValue=e.state.value}function o(){var t=new Date;t.setDate(t.getDate()-30),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),e.startDate=t.getTime(),t.setDate(t.getDate()+31),e.endDate=t.getTime()}o(),e.showAds=!1,a.getDrinkingsByRange(e.startDate,e.endDate).then(function(a){n(function(){e.showAds=!0,e.course=i.createCourse(a),e.chartData={values:e.course,startDate:e.startDate,endDate:e.endDate},r()},200);var o=t(r,6e4);e.$on("$destroy",function(){t.cancel(o)})})}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("dashboardListController",["$scope","database",function(e,t){e.hasNextPage=!1;var n=20;e.pageStart=n,t.getDrinkingsByPage(0,n).then(function(t){e.drinkings=t,e.hasNextPage=t.hasNextPage}),e.isNextDay=function(e,t){return Math.abs(t-e)>864e5?!0:new Date(e).getDay()!==new Date(t).getDay()},e.fetchDrinkingsNextPage=function(){t.getDrinkingsByPage(e.pageStart,n).then(function(t){e.drinkings=e.drinkings.concat(t),e.pageStart+=n,e.hasNextPage=t.hasNextPage})}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("settingsController",["$scope","$rootScope",function(e,n){e.profile=t.copy(n.profile),e.save=function(){n.profile=e.profile,e.goBack()}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("aboutController",["$scope","$filter","modal",function(t,n,a){if(t.notInstalled=!1,t.installing=!1,"mozApps"in e.navigator){var i=e.navigator.mozApps.getSelf();i.onsuccess=function(){t.notInstalled=!i.result,t.$apply()}}t.install=function(){t.installing=!0;var i=e.location.href.replace(e.location.hash,"");i=i.substr(0,i.lastIndexOf("/"));var r=i+"/manifest.webapp",o=e.navigator.mozApps.install(r);o.onsuccess=function(){t.notInstalled=!1,t.installing=!1,t.$apply(),a.status(n("translate")("INSTALL_SUCCESS"))},o.onerror=function(){console.log(this.error),t.installing=!1,t.$apply(),a.status(n("translate")("INSTALL_FAILED"))}}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("createDrinkingController",["$scope","$filter","database","modal",function(e,t,n,a){function i(){n.getDrinks().then(function(t){e.drinks=t})}e.isUpdate=!1,e.drinking={},e.date=new Date,e.time=new Date,e.time.setSeconds(0),e.time.setMilliseconds(0),e.drinkExist=!1,i(),e.setDrink=function(t){e.drinking.drinkName=t.name,e.drinking.volume=t.volume,e.drinking.alcoholContent=t.alcoholContent},e.save=function(){var t=new Date(e.date.getTime());t.setHours(e.time.getHours()),t.setMinutes(e.time.getMinutes()),t.setSeconds(0),t.setMilliseconds(0),e.drinking.date=t.getTime(),n.createDrinking(e.drinking).then(e.goBack)},e.savePreset=function(){var r={name:e.drinking.drinkName,volume:e.drinking.volume,alcoholContent:e.drinking.alcoholContent};n.createDrink(r).then(function(){e.drinkExist=!0,a.status(t("translate")("DRINK_PRESET_WAS_CREATED")),i()})},e.$watch("drinking.drinkName",function(t){t&&n.hasDrink(t).then(function(t){e.drinkExist=t})})}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("updateDrinkingController",["$scope","$routeParams","$filter","database","modal",function(e,t,n,a,i){function r(){a.getDrinks().then(function(t){e.drinks=t})}e.isUpdate=!0,e.drinkExist=!1,a.getDrinking(parseInt(t.id)).then(function(t){e.drinking=t,e.date=new Date(t.date),e.time=new Date(t.date)}),r(),e.setDrink=function(t){e.drinking.drinkName=t.name,e.drinking.volume=t.volume,e.drinking.alcoholContent=t.alcoholContent},e.save=function(){var t=new Date(e.date.getTime());t.setHours(e.time.getHours()),t.setMinutes(e.time.getMinutes()),t.setSeconds(e.time.getSeconds()),e.drinking.date=t.getTime(),a.updateDrinking(e.drinking).then(e.goBack)},e.savePreset=function(){var t={name:e.drinking.drinkName,volume:e.drinking.volume,alcoholContent:e.drinking.alcoholContent};a.createDrink(t).then(function(){e.drinkExist=!0,i.status(n("translate")("DRINK_PRESET_WAS_CREATED")),r()})},e.delete=function(){a.deleteDrinking(e.drinking.id).then(e.goBack)},e.$watch("drinking.drinkName",function(t){t&&a.hasDrink(t).then(function(t){e.drinkExist=t})})}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("presetsController",["$scope","database",function(e,t){t.getDrinks().then(function(t){e.drinks=t})}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("createPresetController",["$scope","$filter","database","modal",function(e,t,n,a){e.isUpdate=!1,e.drink={},e.save=function(){n.createDrink(e.drink).then(e.goBack,function(e){"ConstraintError"===e.name&&a.status(t("translate")("DRINK_PRESET_WITH_NAME_EXISTS"))})}}])}(window,window.angular),function(e,t){"use strict";var n=t.module("app");n.controller("updatePresetController",["$scope","$routeParams","$filter","database","modal",function(e,t,n,a,i){e.isUpdate=!0,a.getDrink(parseInt(t.id)).then(function(t){e.drink=t}),e.save=function(){a.updateDrink(e.drink).then(e.goBack,function(e){"ConstraintError"===e.name&&i.status(n("translate")("DRINK_PRESET_WITH_NAME_EXISTS"))})},e.delete=function(){a.deleteDrink(e.drink.id).then(e.goBack)}}])}(window,window.angular);