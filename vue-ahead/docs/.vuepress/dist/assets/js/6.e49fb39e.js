(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{279:function(t,e,n){},300:function(t,e,n){"use strict";var a=n(279);n.n(a).a},310:function(t,e,n){},328:function(t,e,n){"use strict";n.r(e);n(282);var a={props:{active:Boolean,item:Object,index:Number},data:function(){return{className:this.getClassName(),info:this.item&&this.item.extraData}},methods:{getClassName:function(){return this.active?"menu_option menu_option_active":"menu_option"}},watch:{active:function(){this.className=this.getClassName()},item:function(){this.info=this.item&&this.item.extraData||null}}},i=(n(300),n(34)),s=Object(i.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"elem",class:t.className},[n("img",{staticClass:"avatar",attrs:{src:t.info&&t.info.profile_image_url_https}}),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"name"},[n("b",[t._v(t._s(t.item.label||""))])]),t._v(" "),n("div",{staticClass:"screen_name"},[t._v("\n      @"+t._s(t.info&&t.info.screen_name||"")+"\n    ")]),t._v(" "),n("div",{staticClass:"description"},[t._v("\n      "+t._s(t.info&&t.info.description||"")+"\n    ")])])])}),[],!1,null,"b8ccc5fc",null);e.default=s.exports},379:function(t,e,n){"use strict";var a=n(310);n.n(a).a},386:function(t,e,n){"use strict";n.r(e);n(56),n(93),n(88);var a=n(50),i=n(284),s=n(328),r={settings:{method:"get",url:"https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search",timeout:1e3},dataParser:function(t){return t.map((function(t){return{label:t.name,extraData:t}}))},prefetch:function(){var t=Object(a.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e([]);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},c={components:{VueAhead:i.a},data:function(){return{remote:r,item:s.default}}},o=(n(379),n(34)),u=Object(o.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("VueAhead",{staticClass:"control",attrs:{remote:this.remote,itemRenderer:this.item,placeholder:"select a twitter handle"}})],1)}),[],!1,null,"12d38b5d",null);e.default=u.exports}}]);