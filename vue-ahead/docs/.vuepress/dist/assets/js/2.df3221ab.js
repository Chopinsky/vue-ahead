(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{284:function(t,e,n){"use strict";n(18),n(56),n(19),n(277),n(281);var i=n(51),s={display:"none",backgroundColor:"transparent",width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:1e5},o={props:{on:Boolean},data:function(){return{style:Object.assign({},s)}},watch:{on:function(){this.style.display=this.on?"inherit":"none"}}},a=(n(352),n(34)),r=Object(a.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vue_ahead__control_input_shield",style:t.style,on:{mousedown:function(e){return t.$emit("mousedown",e)}}})}),[],!1,null,null,null).exports,l=(n(279),{props:{path:{type:String,required:!0},size:{type:Number,default:16},viewBox:{type:String,default:"0 0 18 18"}}}),c=(n(353),Object(a.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{"aria-hidden":"true",tabIndex:"0"},on:{click:function(e){return t.$emit("click",e)},keydown:function(e){return t.$emit("keydown",e)}}},[n("svg",{staticClass:"icon",attrs:{x:"0px",y:"0px",focusable:"false","aria-hidden":"true",width:t.size,height:t.size,viewBox:t.viewBox}},[n("path",{attrs:{d:t.path}})])])}),[],!1,null,"7ed3be30",null).exports),u=n(303),h={props:{display:Function,item:Object,itemRenderer:Object,index:Number},components:{ControlIcon:c},data:function(){var t=this.getDisplayText();return{text:t.text,title:t.title,iconPath:"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z"}},methods:{getDisplayText:function(){var t=this.item.label||"...",e=Object(u.getDisplay)(this.item,this.display,"multi-selection");return e&&e.length>8&&(e=e.substr(0,6)+"..."),{text:e,title:t}},handleRemovalKeydown:function(t,e){if(t){var n=t.keyCode;13!==n&&32!==n||(this.$emit("item-removal",t,e),t.preventDefault()),0===this.index&&9===n&&t.shiftKey&&this.$emit("special-key")}}}},p=(n(355),Object(a.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue_ahead__selection_container"},[n("div",{staticClass:"vue_ahead__selection_content",attrs:{title:t.title}},[t.itemRenderer?n(t.itemRenderer,{tag:"component",attrs:{item:t.item,display:t.display,defaultText:t.text}}):n("div",[t._v("\r\n\t\t\t"+t._s(t.text)+"\r\n\t\t")])],1),t._v(" "),n("ControlIcon",{staticClass:"vue_ahead__selection_removal",attrs:{title:"remove "+t.title,path:t.iconPath},on:{keydown:function(e){return e.stopPropagation(),t.handleRemovalKeydown(e)}},nativeOn:{mousedown:function(e){return e.stopPropagation(),t.$emit("item-removal",e)}}})],1)}),[],!1,null,null,null).exports),d={boxSizing:"content-box",color:"inherit",fontSize:"inherit",fontFamily:"inherit",fontWeight:"inherit",minWidth:"1px",width:"2px",height:"100%",outline:"none",border:0,padding:"0"},f={position:"absolute",top:"0",left:"0",visibility:"hidden",height:"0",width:"min-content",overflow:"auto",whiteSpace:"pre",fontSize:"inherit",fontFamily:"inherit",fontWeight:"inherit",fontStyle:"normal",letterSpacing:"normal",textTransform:"none"},m={display:"inline-block",padding:"0 0 1px 1px"},v={props:{active:Boolean,customClassNames:Object,display:Function,isMulti:Boolean,multiSelRenderer:Object,placeholder:{type:String,default:""},singleSelRenderer:Object,selection:Array,theme:String,value:{type:String,default:""}},components:{ControlIcon:c,SelectionItem:p},data:function(){var t=this.getPlaceholder(),e=t.placeholder,n=t.phContent;return{classes:{wrapper:this.getWrapperClassName(),placeholder:e},path:{clear:"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z",dropdown:"M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z"},phContent:n,styles:{container:f,input:Object.assign({},d),field:m},width:2}},methods:{clear:function(){this.$refs.contentHolder.innerText="",this.styles.input.width="2px"},focus:function(){this.$refs.input.focus()},select:function(){if(""!==this.value){var t=this.$refs.input;t.selectionStart<t.selectionEnd?t.setSelectionRange(this.value.length,this.value.length):t.select()}},getWrapperClassName:function(){var t=this.theme?"vue_ahead__control_wrapper form-control":"vue_ahead__control_wrapper vue_ahead__regular_theme";return this.customClassNames&&this.customClassNames.input&&(t+=" "+this.customClassNames.input),this.active&&(this.customClassNames&&this.customClassNames.active?t+=" "+this.customClassNames.active:t+=this.theme?" vue_ahead__themed_control_active":" vue_ahead__control_active"),t},getSelectionKey:function(t,e){return e.toString()+"#"+Object(u.getItemLabel)(t).substr(0,5)},getPlaceholder:function(){var t={placeholder:"vue_ahead__plain_text",phContent:{content:"",title:""}};return""!==this.value?(t.phContent.content="",t.phContent.title=this.value,t):(this.isMulti||1!==this.selection.length?0===this.selection.length&&(t.phContent.content=this.placeholder||""):(t.placeholder+=" vue_ahead__plain_text_values",t.phContent.content=Object(u.getDisplay)(this.selection[0],this.display,"selection")),t.phContent.title=t.phContent.content,t.phContent.content&&t.phContent.content.length>32&&(t.phContent.content=t.phContent.content.substr(0,30)+" ..."),t)},handleFocus:function(t){var e=t&&t.target&&"INPUT"===t.target.nodeName;this.$emit("focus",t,e?"input":"icon")},handleInput:function(t){var e=t&&t.target&&t.target.value||"";this.$refs.contentHolder.innerText=e,this.styles.input.width="".concat(this.$refs.contentHolder.offsetWidth+2,"px"),this.$emit("change",t,e)},handleKeydown:function(t,e){if(!e){if(!t)return;e=t.keyCode||0}switch(e){case 8:if(this.isMulti&&""===this.value&&this.selection.length>0){var n=this.selection[this.selection.length-1];this.$emit("item-removal",t,n)}break;case 9:t.shiftKey||this.$emit("special-key","tab");break;case 13:t.preventDefault(),this.$emit("special-key","enter");break;case 27:t.preventDefault(),this.$emit("special-key","esc");break;case 38:case 40:t.preventDefault(),this.$emit("special-key",38===e?"up":"down")}},handleIconKeydown:function(t,e){var n=t.keyCode;switch(n){case 13:case 32:this.$emit("special-key",e,"clear"===e);break;case 38:case 40:this.$emit("special-key",38===n?"up":"down",!0);break;case 9:"dropdown"!==e||t.shiftKey||this.$emit("special-key","tab-out")}}},computed:{},watch:{value:function(){""===this.value&&this.clear();var t=this.getPlaceholder(),e=t.placeholder,n=t.phContent;this.classes.placeholder=e,this.phContent=n},selection:function(){var t=this.getPlaceholder(),e=t.placeholder,n=t.phContent;this.classes.placeholder=e,this.phContent=n},active:function(){this.classes.wrapper=this.getWrapperClassName()},customClassNames:function(){this.classes.wrapper=this.getWrapperClassName()}}},g=(n(356),Object(a.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.classes.wrapper,on:{"!dblclick":function(e){return e.stopPropagation(),t.$emit("dblclick",e)},mousedown:function(e){return e.stopPropagation(),t.$emit("mousedown",e)},"!focus":function(e){return t.handleFocus(e)},"!blur":function(e){return t.$emit("blur",e)}}},[n("div",{staticClass:"vue_ahead__input_container",attrs:{title:t.phContent.title}},[""!==t.phContent.content?n("div",{class:t.classes.placeholder},[t.singleSelRenderer&&1===t.selection.length?n(t.singleSelRenderer,{tag:"component",attrs:{defaultText:t.phContent.content,display:t.display,item:t.selection[0].src}}):n("div",[t._v(t._s(t.phContent.content))])],1):t._e(),t._v(" "),t._l(t.selection,(function(e,i){return n("div",{key:t.getSelectionKey(e,i)},[t.isMulti?n("SelectionItem",{attrs:{item:e,itemRenderer:t.multiSelRenderer,index:i},on:{"item-removal":function(n){return t.$emit("item-removal",n,e)},"special-key":function(e){return t.$emit("special-key","tab-out")}}}):t._e()],1)})),t._v(" "),n("div",{style:t.styles.field},[n("input",{ref:"input",style:t.styles.input,attrs:{autoCapitalize:"none",autoComplete:"off",autoCorrect:"off",spellCheck:"false",type:"text"},domProps:{value:t.value},on:{keydown:t.handleKeydown,input:t.handleInput}}),t._v(" "),n("div",{ref:"contentHolder",style:t.styles.container})])],2),t._v(" "),n("div",{staticClass:"vue_ahead__icons_container"},[n("ControlIcon",{staticClass:"vue_ahead__action_icon vue_ahead__clear_icon",attrs:{title:"clear all",path:t.path.clear,size:18},on:{keydown:function(e){return e.stopPropagation(),t.handleIconKeydown(e,"clear")}},nativeOn:{mousedown:function(e){return e.stopPropagation(),t.$emit("icon-event",e,"clear")}}}),t._v(" "),n("span",{staticClass:"vue_ahead__action_icon_separator"}),t._v(" "),n("ControlIcon",{staticClass:"vue_ahead__action_icon vue_ahead__dropdown_icon",attrs:{title:"dropdown menu",path:t.path.dropdown,size:18},on:{keydown:function(e){return e.stopPropagation(),t.handleIconKeydown(e,"dropdown")}},nativeOn:{mousedown:function(e){return e.stopPropagation(),t.$emit("icon-event",e,"dropdown")}}})],1)])}),[],!1,null,null,null).exports),_=(n(140),{props:{active:Boolean,created:Boolean,highlightSource:String,item:Object,index:Number},data:function(){return{className:this.getClassName(),content:this.getDisplay(),styles:{prefix:{paddingRight:"2px",opacity:.8,fontWeight:600},text:{padding:0,margin:0,opacity:this.highlightSource?.8:1},hl:{padding:0,margin:0,fontWeight:600,textDecoration:"underline"}}}},methods:{getClassName:function(){var t=this.active?"vue_ahead__menu_option vue_ahead__menu_option_active":"vue_ahead__menu_option";return this.class&&this.active&&(t+=" "+this.class),t},getDisplay:function(){var t=Object(u.getItemLabel)(this.item);if(this.highlightSource&&!this.created&&t){var e=t.trim().toLowerCase(),n=this.highlightSource.trim().toLowerCase(),i=e.indexOf(n);if(i>=0)return[0===i?null:t.substring(0,i),t.substring(i,i+n.length),t.substring(i+n.length)]}return[t,null,null]}},watch:{active:function(){if(this.className=this.getClassName(),this.active){var t=this.$refs.elem,e=t.offsetTop,n=t.scrollHeight;this.$emit("item-activated",e,n)}},highlightSource:function(){this.content=this.getDisplay(),this.styles.text.opacity=this.highlightSource?.8:1}}}),y=(n(357),Object(a.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"elem",class:t.className,on:{"!mouseover":function(e){return t.$emit("mouseover",e,t.index)},mousedown:function(e){return t.$emit("mousedown",e,t.index)}}},[t.created?n("span",{style:t.styles.prefix},[t._v("Create: ")]):t._e(),n("span",{style:t.styles.text},[t._v(t._s(t.content[0]))]),t.content[1]?n("span",{style:t.styles.hl},[t._v(t._s(t.content[1]))]):t._e(),t.content[2]?n("span",{style:t.styles.text},[t._v(t._s(t.content[2]))]):t._e()])}),[],!1,null,null,null).exports),b={props:{data:Object}},C=(n(358),Object(a.a)(b,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue_ahead__group_label",on:{mousedown:function(e){return t.$emit("mousedown",e)}}},[n("span",[t._v("\r\n      "+t._s(t.data.label||"Default")+"\r\n    ")]),t._v(" "),n("span",{staticClass:"vue_ahead__group_label_icon"},[t._v("\r\n      "+t._s(t.data.count||0)+"\r\n    ")])])}),[],!1,null,null,null).exports),w={position:"absolute",display:"default",top:0,left:0,width:"100%",height:"100%",textAlign:"center",justifyContent:"center",zIndex:1e6,backgroundColor:"transparent",userSelect:"none"},x={position:"absolute",top:"50%",left:"0",textAlign:"center",margin:"-12px 0 0 0",padding:0,width:"100%",height:"100%",opacity:1},S={props:{autoScroll:Boolean,createable:Boolean,customClassNames:Object,groups:Object,highlightSource:String,isRemoteInit:Boolean,optionRenderer:Object,options:{type:Array,default:new Array},reason:Number,shield:Boolean},components:{GroupLabel:C,Item:y},data:function(){return this._manualMove="",this._moveDebounceId=null,this._debounceId=null,{activeIdx:0,className:this.getClassName(),shieldVisible:!1,styles:{shield:w,title:x},emptyText:this.getEmptyText()}},methods:{getClassName:function(){var t="vue_ahead__dropdown_wrapper";return this.customClassNames&&this.customClassNames.dropdown&&(t+=" "+this.customClassNames.dropdown),t},getEmptyText:function(){return this.isRemoteInit?"Type to search":this.createable?"No option and unable to create":"No option"},getMenuItem:function(t){return"created"===t.type?t:t.src},move:function(t){var e=this.activeIdx;"down"===t?e++:e--,e>=this.options.length&&(e=this.options.length-1),e<0&&(e=0),e!==this.activeIdx&&(this._manualMove=t,this.activeIdx=e)},select:function(){if(!(this.activeIdx<0||this.activeIdx>=this.options.length)){var t=this.options[this.activeIdx];this.$emit("item-selection",null,t.key)}},handleLabelClicked:function(t){var e=this.options[this.activeIdx];this.$emit("item-selection",t,e.key)},handleItemActivated:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30;if(!(this.options.length<4)&&this._manualMove){var n=this.$refs.contentWrapper,i=n.getBoundingClientRect(),s=i.height,o=n.scrollTop,a=o;t>o+s-e&&"down"===this._manualMove?a=o+e:t<o+5&&"up"===this._manualMove&&(a=o-e),a!==o&&(this._moveDebounceId&&clearTimeout(this._moveDebounceId),this._moveDelay>0?this._moveDebounceId=setTimeout((function(){return n.scrollTo(0,a)}),this._moveDelay):n.scrollTo(0,a)),this._manualMove="",this._moveDelay=0}},handleMouseOver:function(t,e){e<this.options.length?this.activeIdx=e:this.activeIdx=this.options.length-1,this.activeIdx<0&&(this.activeIdx=0)}},watch:{activeIdx:function(t,e){if(this.autoScroll&&!this._manualMove&&(this._manualMove=this.activeIdx>e?"down":"up",this._moveDelay=200),this.optionRenderer){var n="item_".concat(this.activeIdx);if(this.$refs[n]&&1===this.$refs[n].length){var i=this.$refs[n][0],s=i.offsetTop,o=i.offsetHeight;this.handleItemActivated(s,o)}}},className:function(){this.className=this.getClassName()},isRemoteInit:function(){this.emptyText=this.getEmptyText()},options:function(){0===this.reason?(this.activeIdx=0,this.$refs.contentWrapper.scrollTo(0,0)):this.activeIdx>=this.options.length&&(this.activeIdx=this.options.length-1)},shield:function(){var t=this;this.shield?(this._debounceId&&clearTimeout(this._debounceId),this._debounceId=setTimeout((function(){t.shieldVisible=!0,t.styles.shield.opacity=.7,t.styles.shield.backgroundColor="#F5F5F5"}),200)):(clearTimeout(this._debounceId),this._debounceId=null,this.shieldVisible=!1,this.styles.shield.opacity=1,this.styles.shield.backgroundColor="transparent")}}},I=(n(359),Object(a.a)(S,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.className},[t.shield?n("div",{style:t.styles.shield,on:{"!mousedown":function(e){return e.stopPropagation(),t.$emit("shield-click",e)}}},[n("h5",{directives:[{name:"show",rawName:"v-show",value:t.shieldVisible,expression:"shieldVisible"}],style:t.styles.title},[t._v("\r\n      Loading ...\r\n    ")])]):t._e(),t._v(" "),n("div",{ref:"contentWrapper",staticClass:"vue_ahead__dropdown_container"},[t._l(t.options,(function(e,i){return n("div",{key:e.key},[t.groups&&t.groups.hasOwnProperty(i)?n("GroupLabel",{attrs:{data:t.groups[i]},on:{mousedown:function(e){return e.stopPropagation(),t.handleLabelClicked(e)}}}):t._e(),t._v(" "),t.optionRenderer?n("div",{ref:"item_"+i.toString(),refInFor:!0,class:t.customClassNames&&t.customClassNames.activeItem||"",attrs:{created:"created"===e.type},on:{mouseover:function(e){return t.handleMouseOver(e,i)},mousedown:function(n){return n.stopPropagation(),t.$emit("item-selection",n,e.key)}}},[n(t.optionRenderer,{tag:"component",attrs:{active:t.activeIdx===i,highlightSource:t.highlightSource,item:t.getMenuItem(e),index:i}})],1):n("Item",{class:t.customClassNames&&t.customClassNames.activeItem||"",attrs:{active:t.activeIdx===i,created:"created"===e.type,highlightSource:t.highlightSource,item:t.getMenuItem(e),index:i},on:{mouseover:t.handleMouseOver,mousedown:function(n){return n.stopPropagation(),t.$emit("item-selection",n,e.key)},"item-activated":t.handleItemActivated}})],1)})),t._v(" "),t.options&&0!==t.options.length?t._e():n("div",{staticClass:"vue_ahead__dropdown_empty_options"},[t._v("\r\n      "+t._s(t.emptyText)+"\r\n    ")])],2)])}),[],!1,null,null,null).exports),k=n(319),O=(n(360),n(82)),$=n(32),N=n(21),j=n(52),P=n(361),R=n.n(P),T=function(){function t(e){if(Object(N.a)(this,t),!R.a&&!e.proxy)throw new Error("expecting `axios` module or a proxy settings to be provided before the control, found none ... ");if(e.proxy&&"function"!=typeof e.proxy)throw new Error("expecting `remote`'s proxy to be a function returning a Promise, but found wrong primitive type ... ");this._props=e||{},this._store=[],this._cache={last:[],data:{}},this._transport=e.proxy?e.proxy:R.a,this._props.cacheSize||(this._props.cacheSize=10)}return Object(j.a)(t,[{key:"add",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(0!==t.length)if(Array.isArray(t)){var e;(e=this._store).push.apply(e,Object($.a)(t))}else{var n=t.toString();this._store.push({label:n,key:n})}}},{key:"query",value:function(t,e){var n=this;if("string"!=typeof t&&(t=t.toString()),t=t.trim().toLowerCase(),Object(k.hasProperty)(this._cache.data,t)){var i=this._cache.data[t],s=this._cache.last.indexOf(t);return s>=0&&(this._cache.last.splice(s,1),this._cache.last.push(t)),e(i,t)}if(this._props.remote){var o=this._props.remote,a=o.dataParser,r=o.settings,l=Object.assign({},r);return l.params?l.params.q=t:l.params={q:t},this._transport(l).then((function(i){var s="function"==typeof a?a(i.data):i.data;if(n._store.length>0){var o=n._localSearch(t);o&&o.length>0&&s.push.apply(s,Object($.a)(o))}return n._updateCache(t,s),e(s,t)})).catch((function(n){return console.error("[error] failed to fetch data from the remote server:",n,"\nremote settings:",r),e([],t)}))}if(""===t)return e(this._store,t);var c=this._localSearch(t);return this._updateCache(t,c),e(c,t)}},{key:"prefetch",value:function(t){if(this._props.remote){var e=this._props.remote,n=e.dataParser,i=e.settings;return this._transport(Object.assign({},i,{params:{q:"",t:"prefetch"}})).then((function(e){var i="function"==typeof n?n(e.data):e.data;t(i)})).catch((function(t){console.error("[error] failed to fetch data from remote server:",t)}))}}},{key:"setOptions",value:function(t){this._props=t}},{key:"setOption",value:function(t,e){this._props[t]=e}},{key:"_updateCache",value:function(t,e){if(this._cache.last.push(e),this._cache.data[e]=t,this._cache.last.length>this._props.cacheSize){var n=this._cache.last.splice(0,1),i=Object(O.a)(n,1)[0];delete this._cache.data[i]}}},{key:"_localSearch",value:function(t){var e=this._props.matchEval;return"function"!=typeof e&&(e=null),this._store.filter((function(n){if(e)return e(t,n);var i=n.label.toLowerCase();return i&&i.indexOf(t)>=0}))}}]),t}(),M=0,D=1,A=2,B=3,E=4,L=5,K=-1,z={inheritAttrs:!1,name:"VueAhead",components:{Shield:r,Input:g,Dropdown:I},beforeMount:function(){},beforeDestroy:function(){},props:{createable:Boolean,customClassNames:Object,display:Function,dropdownAutoScroll:Boolean,grouped:Boolean,highlight:Boolean,initOptions:Array,initSelections:Array,isMulti:Boolean,multiSelRenderer:{type:Object,defualt:null},optionRenderer:{type:Object,default:null},placeholder:String,remote:Object,singleSelRenderer:{type:Object,default:null},theme:String},data:function(){if(this.remote&&!this.remote.settings&&!this.remote.proxy)throw new Error("the remote expects the remote object to have a 'settings' property, but found nothing ... ");this._keys=null,this._shieldId=null,this._debounceId=null;var t=this.init(),e=t.source,n=t.options,i=t.selection,s=t.groups;return this._engine=new T({remote:this.remote||null}),this._engine.add(e),{className:this.getClassName(),focusStatus:M,groups:s,open:!1,options:n,reason:0,selection:i,source:e,shield:!1,shieldDisplay:"none",value:""}},methods:{init:function(){var t=[],e=null;this.remote?"function"==typeof this.remote.prefetch&&this.runPrefetcher(this.remote.prefetch):(t=this.prepareOptions(this.initOptions),this.initSelections&&this.initSelections.length>0&&(e=this.prepareInitState(t,this.initSelections)));var n=e?e.options:t,i=e?e.selection:{items:[],indices:{}},s=this.grouped?this.buildOptionGroups(n):{options:n,groups:null};return{source:t,options:s.options,selection:i,groups:s.groups}},focusInput:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;setTimeout((function(){t.focusStatus!==D&&(t.$refs.inputControl.focus(),t.open=null===e||e),t.focusStatus=D}),0)},focuseReset:function(){this.focusStatus=M,this.open=!1,this.value="",this.resetOptions()},getClassName:function(){var t="vue_ahead__control_container";return this.class&&(t+=" "+this.class),this.customClassNames&&this.customClassNames.control&&(t+=" "+this.customClassNames.control),t},resetOptions:function(){this.reason=0,this.remote?"function"==typeof this.remote.prefetch?this.runPrefetcher(this.remote.prefetch,!0):(this.source=[],this.options=this.getOptions()):this.options=this.getOptions()},buildOptionGroups:function(t){if(!t||0===t.length)return{options:t,groups:null};t=t.sort((function(t,e){return"created"===t.type?1:"created"===e.type||"default"===t.group?-1:"default"===e.group?1:t.group===e.group?0:t.group>e.group?1:-1}));for(var e={},n="",i=-1,s=0,o=0;o<t.length;o++)t[o].group!==n&&(i>=0&&(e[i]={label:n,count:s}),i=o,n=t[o].group,s=0),s++;return""!==n&&i>=0&&(e[i]={label:n,count:s}),{options:t,groups:e}},getOptions:function(t){t||(t=this.source||[]);var e=(this.selection||{}).indices;if(!e)return t;var n=t.filter((function(t){return!Object(k.hasProperty)(e,t.key)}));if(this.grouped){var i=this.buildOptionGroups(n),s=i.options,o=i.groups;n=s,this.groups=o}return n},prepareOptions:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this._keys={};var n=e.filter((function(t){return"object"===Object(i.a)(t)&&!!t})).map((function(e,n){var i=Object(k.buildItem)(e,n,t._keys,t.grouped);return t._keys[i.key]=null,i}));return n||[]},prepareInitState:function(t,e){for(var n={},i=[],s=[],o=0;o<e.length;o++){var a=e[o];if("string"!=typeof a&&(a=a.toString()),n[a]=null,!this.isMulti)break}for(var r=0;r<t.length;r++)Object(k.hasProperty)(n,t[r].key)&&(this.isMulti||0===s.length)?s.push(t[r]):i.push(t[r]);return{options:i,selection:{items:s,indices:n}}},clear:function(){var t=this.selection.items;this.selection={items:[],indices:{}},this.value="",this.reason=1,this.remote?"function"==typeof this.remote.prefetch?this.runPrefetcher(this.remote.prefetch):(this.source=[],this.options=this.getOptions()):this.options=this.getOptions(),t&&t.length>0&&this.$emit("selection",{type:"clear",items:[],removed:t.map((function(t){return"created"===t.type?t:t.src}))})},reset:function(){var t=this.selection.items,e=this.init(),n=e.options,i=e.selection,s=e.groups;this.value="",this.reason=1,this.options=n,this.groups=s,this.selection=i,t&&t.length>0&&this.$emit("selection",{type:"clear",items:[],removed:t.map((function(t){return"created"===t.type?t:t.src}))})},isValueCreateable:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(""===t)return!1;if(0===e.length)return!0;t=t.trim().toLowerCase();for(var n=0;n<e.length;n++){var i=e[n].label;if(i.trim().toLowerCase()===t)return!1}if(this.selection.items&&this.selection.items.length>0)for(var s=0;s<this.selection.items.length;s++){var o=this.selection.items[s].label;if(o.trim().toLowerCase()===t)return!1}return!0},runPrefetcher:function(t,e){var n=this;t((function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];setTimeout((function(){var s=n.prepareOptions(t),o=s,a=n.selection;if(i&&i.length>0&&(!e||!n.selection.items.length)){var r=n.prepareInitState(s,i);a=r.selection,o=r.options}var l=n.grouped?n.buildOptionGroups(o):{options:o,groups:null},c=l.options,u=l.groups;n.source=s,n.options=c,n.selection=a,n.groups=u}),0)}))},shieldAction:function(t){var e=this;this._shieldId&&clearTimeout(this._shieldId),t?this._shieldId=setTimeout((function(){e.shield=!0}),10):(this._shieldId=null,this.shield=!1)},handleFocus:function(t,e){this.focusStatus="input"===e?D:A,this.focusStatus===D&&(this.open=!0)},handleShieldClick:function(t){this.focusStatus=L,this.focusInput()},handleDbClick:function(t){var e=this;setTimeout((function(){e.$refs.inputControl.select()}),0)},handleInputClick:function(t){this.focusStatus=B,this.focusInput()},handleIconEvent:function(t,e){switch(this.focusStatus=B,e){case"clear":this.clear();break;case"dropdown":this.open=!this.open}this.focusInput("dropdown"===e?this.open:null)},handleInputBlur:function(t,e){var n=this;(this.focusStatus<=A||e)&&(this.focusStatus=K,setTimeout((function(){n.focusStatus===K&&n.focuseReset()}),0))},handleInputChange:function(t,e){var n=this;this.value=e,this.open=!0,""!==e&&""!==e.trim()?(this.shieldAction(!0),this._debounceId&&clearTimeout(this._debounceId),this._debounceId=setTimeout((function(){n._engine.query(e,(function(){var t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(n.remote?(n.source=n.prepareOptions(i),t=n.source):t=i,n.createable&&n.isValueCreateable(e,t)){for(var s=e.trim().toLowerCase();Object(k.hasProperty)(n._keys,s);)s+=Object(k.randomSuffix)();t.push({label:e,key:s,group:"new",type:"created"})}n.reason=0,n.options=n.getOptions(t),n.shieldAction(!1),n._debounceId=null}))}),120)):this.resetOptions()},handleItemSelection:function(t,e){if(!Object(k.hasProperty)(this.selection.indices,e)){var n=this.selection,i=n.items,s=n.indices,o=null;this.isMulti||(o="created"===i[0].type?i[0]:i[0].src,i=[],s={});for(var a=0;a<this.options.length;a++)if(this.options[a].key===e){i.push(this.options[a]),s[e]=null;break}this.selection={items:i,indices:s},this.$emit("selection",{type:"add",items:this.selection.items.map((function(t){return"created"===t.type?t:t.src})),replaced:o,value:this.value}),""!==this.value&&(this.value=""),this.reason=1,this.options=this.getOptions(),this.focusStatus=E,this.focusInput()}},handleItemRemoval:function(t,e){if(this.isMulti&&e&&e.key){var n=e.key,i=this.selection,s=i.items,o=i.indices,a=null;delete o[n],s=s.filter((function(t){return t.key!==n||(a=t,!1)})),this.selection={items:s,indices:o},this.$emit("selection",{type:"remove",items:this.selection.items.map((function(t){return"created"===t.type?t:t.src})),removed:[a]}),this.reason=1,this.options=this.getOptions().filter((function(t){return!Object(k.hasProperty)(o,t.key)})),this.focusStatus=A,this.focusInput()}},handleSpecialKey:function(t,e){switch(t){case"enter":this.$refs.dropdownControl&&this.$refs.dropdownControl.select();break;case"esc":this.open=!1;break;case"clear":this.clear();break;case"dropdown":this.open=!this.open;break;case"up":case"down":this.open?this.$refs.dropdownControl&&this.$refs.dropdownControl.move(t):this.open=!0;break;case"tab":this.focusStatus=A;break;case"tab-out":this.focuseReset()}e&&this.focusInput()}},watch:{class:function(){this.className=this.getClassName()},customClasses:function(){this.className=this.getClassName()},initOptions:function(){this.reset()},initSelections:function(){this.reset()}}},F=(n(378),Object(a.a)(z,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.className},[n("Shield",{attrs:{on:t.shield},on:{"!mousedown":function(e){return e.stopPropagation(),t.handleShieldClick(e)}}}),t._v(" "),n("Input",{ref:"inputControl",attrs:{active:0!==t.focusStatus,customClassNames:t.customClassNames,display:t.display,multiSelRenderer:t.multiSelRenderer,isMulti:t.isMulti,placeholder:t.placeholder,selection:t.selection.items,singleSelRenderer:t.singleSelRenderer,theme:t.theme,value:t.value},on:{dblclick:t.handleDbClick,change:t.handleInputChange,blur:t.handleInputBlur,focus:t.handleFocus,mousedown:t.handleInputClick,"icon-event":t.handleIconEvent,"special-key":t.handleSpecialKey,"item-removal":t.handleItemRemoval}}),t._v(" "),t.open?n("Dropdown",{ref:"dropdownControl",attrs:{autoScroll:t.dropdownAutoScroll,createable:t.createable,customClassNames:t.customClassNames,groups:t.groups,highlightSource:t.highlight?t.value.trim():null,isRemoteInit:t.remote&&""===t.value,optionRenderer:t.optionRenderer,open:t.open,options:t.options,reason:t.reason,shield:t.shield},on:{"item-selection":t.handleItemSelection}}):t._e()],1)}),[],!1,null,null,null).exports),W={install:function t(e){t.installed||(t.installed=!0,e.component("VueAhead",F))}},V=null;"undefined"!=typeof window?V=window.Vue:"undefined"!=typeof global&&(V=global.Vue),V&&V.use(W);e.a=F},301:function(t,e,n){},302:function(t,e,n){},303:function(t,e,n){n(19),n(277);var i=n(354),s=function(t){var e="object"===i(t)?t.label:t;return"string"!=typeof e&&(e=e.toString()),e};t.exports={getDisplay:function(t,e,n){var i=s(t);return e&&(i=e(i,t.src,n)),"string"!=typeof i?"...":i},getGroupKey:function(t){var e="object"===i(t)?t.group:"default";return"string"!=typeof e&&"number"!=typeof e&&(e="default"),(e=e.toString()||"default").toUpperCase()},getItemLabel:s}},304:function(t,e,n){},305:function(t,e,n){},306:function(t,e,n){},307:function(t,e,n){},308:function(t,e,n){},309:function(t,e,n){},319:function(t,e,n){n(19),n(277);var i=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s=function(){return Math.random().toString(36).substring(2,8)};t.exports={buildItem:function(t,e,n,o){var a={src:t};i(t,"key")||(t.key=e.toString()+"#"+s());var r=t.key;"string"!=typeof r&&(r=null==r?s():r.toString());for(var l=r;i(n,l);)l=r+s();a.key=l;var c=t.label;if("string"!=typeof c&&(c=null==c?"":c.toString()),a.label=c,o){var u=t.group;"string"!=typeof u&&(u=null==u?"default":u.toString()),a.group=u}return a},hasProperty:i,randomSuffix:s}},352:function(t,e,n){"use strict";var i=n(301);n.n(i).a},353:function(t,e,n){"use strict";var i=n(302);n.n(i).a},355:function(t,e,n){"use strict";var i=n(304);n.n(i).a},356:function(t,e,n){"use strict";var i=n(305);n.n(i).a},357:function(t,e,n){"use strict";var i=n(306);n.n(i).a},358:function(t,e,n){"use strict";var i=n(307);n.n(i).a},359:function(t,e,n){"use strict";var i=n(308);n.n(i).a},378:function(t,e,n){"use strict";var i=n(309);n.n(i).a}}]);