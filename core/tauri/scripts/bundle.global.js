"use strict";var __TAURI_IIFE__=(()=>{var A=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var Y=Object.prototype.hasOwnProperty;var d=(t,e)=>{for(var n in e)A(t,n,{get:e[n],enumerable:!0})},J=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of Z(e))!Y.call(t,l)&&l!==n&&A(t,l,{get:()=>e[l],enumerable:!(o=Q(e,l))||o.enumerable});return t};var X=t=>J(A({},"__esModule",{value:!0}),t);var et={};d(et,{app:()=>C,event:()=>x,invoke:()=>Be,os:()=>N,path:()=>L,process:()=>O,tauri:()=>T,updater:()=>I,window:()=>z});var C={};d(C,{getName:()=>ne,getTauriVersion:()=>ie,getVersion:()=>te,hide:()=>re,show:()=>ae});var T={};d(T,{convertFileSrc:()=>ee,invoke:()=>r,transformCallback:()=>g});function B(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function g(t,e=!1){let n=B(),o=`_${n}`;return Object.defineProperty(window,o,{value:l=>(e&&Reflect.deleteProperty(window,o),t?.(l)),writable:!1,configurable:!0}),n}async function r(t,e={}){return new Promise((n,o)=>{let l=g(u=>{n(u),Reflect.deleteProperty(window,`_${s}`)},!0),s=g(u=>{o(u),Reflect.deleteProperty(window,`_${l}`)},!0);window.__TAURI_IPC__({cmd:t,callback:l,error:s,...e})})}function ee(t,e="asset"){let n=encodeURIComponent(t);return navigator.userAgent.includes("Windows")?`https://${e}.localhost/${n}`:`${e}://localhost/${n}`}async function i(t){return r("tauri",t)}async function te(){return i({__tauriModule:"App",message:{cmd:"getAppVersion"}})}async function ne(){return i({__tauriModule:"App",message:{cmd:"getAppName"}})}async function ie(){return i({__tauriModule:"App",message:{cmd:"getTauriVersion"}})}async function ae(){return i({__tauriModule:"App",message:{cmd:"show"}})}async function re(){return i({__tauriModule:"App",message:{cmd:"hide"}})}var x={};d(x,{TauriEvent:()=>w,emit:()=>f,listen:()=>S,once:()=>U});async function V(t,e){return i({__tauriModule:"Event",message:{cmd:"unlisten",event:t,eventId:e}})}async function _(t,e,n){await i({__tauriModule:"Event",message:{cmd:"emit",event:t,windowLabel:e,payload:n}})}async function h(t,e,n){return i({__tauriModule:"Event",message:{cmd:"listen",event:t,windowLabel:e,handler:g(n)}}).then(o=>async()=>V(t,o))}async function P(t,e,n){return h(t,e,o=>{n(o),V(t,o.id).catch(()=>{})})}var w=(c=>(c.WINDOW_RESIZED="tauri://resize",c.WINDOW_MOVED="tauri://move",c.WINDOW_CLOSE_REQUESTED="tauri://close-requested",c.WINDOW_CREATED="tauri://window-created",c.WINDOW_DESTROYED="tauri://destroyed",c.WINDOW_FOCUS="tauri://focus",c.WINDOW_BLUR="tauri://blur",c.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",c.WINDOW_THEME_CHANGED="tauri://theme-changed",c.WINDOW_FILE_DROP="tauri://file-drop",c.WINDOW_FILE_DROP_HOVER="tauri://file-drop-hover",c.WINDOW_FILE_DROP_CANCELLED="tauri://file-drop-cancelled",c.MENU="tauri://menu",c.CHECK_UPDATE="tauri://update",c.UPDATE_AVAILABLE="tauri://update-available",c.INSTALL_UPDATE="tauri://update-install",c.STATUS_UPDATE="tauri://update-status",c.DOWNLOAD_PROGRESS="tauri://update-download-progress",c))(w||{});async function S(t,e){return h(t,null,e)}async function U(t,e){return P(t,null,e)}async function f(t,e){return _(t,void 0,e)}var L={};d(L,{BaseDirectory:()=>H,appCacheDir:()=>ce,appConfigDir:()=>se,appDataDir:()=>le,appLocalDataDir:()=>ue,appLogDir:()=>Ce,audioDir:()=>de,basename:()=>Fe,cacheDir:()=>me,configDir:()=>pe,dataDir:()=>ye,delimiter:()=>Ue,desktopDir:()=>ge,dirname:()=>Re,documentDir:()=>he,downloadDir:()=>be,executableDir:()=>_e,extname:()=>Ie,fontDir:()=>Pe,homeDir:()=>we,isAbsolute:()=>ke,join:()=>Oe,localDataDir:()=>fe,normalize:()=>Le,pictureDir:()=>ve,publicDir:()=>We,resolve:()=>xe,resolveResource:()=>Ee,resourceDir:()=>Me,runtimeDir:()=>De,sep:()=>Se,templateDir:()=>Ae,videoDir:()=>Te});function b(){return navigator.appVersion.includes("Win")}var H=(a=>(a[a.Audio=1]="Audio",a[a.Cache=2]="Cache",a[a.Config=3]="Config",a[a.Data=4]="Data",a[a.LocalData=5]="LocalData",a[a.Document=6]="Document",a[a.Download=7]="Download",a[a.Picture=8]="Picture",a[a.Public=9]="Public",a[a.Video=10]="Video",a[a.Resource=11]="Resource",a[a.Temp=12]="Temp",a[a.AppConfig=13]="AppConfig",a[a.AppData=14]="AppData",a[a.AppLocalData=15]="AppLocalData",a[a.AppCache=16]="AppCache",a[a.AppLog=17]="AppLog",a[a.Desktop=18]="Desktop",a[a.Executable=19]="Executable",a[a.Font=20]="Font",a[a.Home=21]="Home",a[a.Runtime=22]="Runtime",a[a.Template=23]="Template",a))(H||{});async function se(){return r("plugin:path|resolve_directory",{directory:13})}async function le(){return r("plugin:path|resolve_directory",{directory:14})}async function ue(){return r("plugin:path|resolve_directory",{directory:15})}async function ce(){return r("plugin:path|resolve_directory",{directory:16})}async function de(){return r("plugin:path|resolve_directory",{directory:1})}async function me(){return r("plugin:path|resolve_directory",{directory:2})}async function pe(){return r("plugin:path|resolve_directory",{directory:3})}async function ye(){return r("plugin:path|resolve_directory",{directory:4})}async function ge(){return r("plugin:path|resolve_directory",{directory:18})}async function he(){return r("plugin:path|resolve_directory",{directory:6})}async function be(){return r("plugin:path|resolve_directory",{directory:7})}async function _e(){return r("plugin:path|resolve_directory",{directory:19})}async function Pe(){return r("plugin:path|resolve_directory",{directory:20})}async function we(){return r("plugin:path|resolve_directory",{directory:21})}async function fe(){return r("plugin:path|resolve_directory",{directory:5})}async function ve(){return r("plugin:path|resolve_directory",{directory:8})}async function We(){return r("plugin:path|resolve_directory",{directory:9})}async function Me(){return r("plugin:path|resolve_directory",{directory:11})}async function Ee(t){return r("plugin:path|resolve_directory",{directory:11,path:t})}async function De(){return r("plugin:path|resolve_directory",{directory:22})}async function Ae(){return r("plugin:path|resolve_directory",{directory:23})}async function Te(){return r("plugin:path|resolve_directory",{directory:10})}async function Ce(){return r("plugin:path|resolve_directory",{directory:17})}var Se=b()?"\\":"/",Ue=b()?";":":";async function xe(...t){return r("plugin:path|resolve",{paths:t})}async function Le(t){return r("plugin:path|normalize",{path:t})}async function Oe(...t){return r("plugin:path|join",{paths:t})}async function Re(t){return r("plugin:path|dirname",{path:t})}async function Ie(t){return r("plugin:path|extname",{path:t})}async function Fe(t,e){return r("plugin:path|basename",{path:t,ext:e})}async function ke(t){return r("plugin:path|isAbsolute",{path:t})}var O={};d(O,{exit:()=>ze,relaunch:()=>Ne});async function ze(t=0){return i({__tauriModule:"Process",message:{cmd:"exit",exitCode:t}})}async function Ne(){return i({__tauriModule:"Process",message:{cmd:"relaunch"}})}var I={};d(I,{checkUpdate:()=>He,installUpdate:()=>Ve,onUpdaterEvent:()=>R});async function R(t){return S("tauri://update-status",e=>{t(e?.payload)})}async function Ve(){let t;function e(){t&&t(),t=void 0}return new Promise((n,o)=>{function l(s){if(s.error){e(),o(s.error);return}s.status==="DONE"&&(e(),n())}R(l).then(s=>{t=s}).catch(s=>{throw e(),s}),f("tauri://update-install").catch(s=>{throw e(),s})})}async function He(){let t;function e(){t&&t(),t=void 0}return new Promise((n,o)=>{function l(u){e(),n({manifest:u,shouldUpdate:!0})}function s(u){if(u.error){e(),o(u.error);return}u.status==="UPTODATE"&&(e(),n({shouldUpdate:!1}))}U("tauri://update-available",u=>{l(u?.payload)}).catch(u=>{throw e(),u}),R(s).then(u=>{t=u}).catch(u=>{throw e(),u}),f("tauri://update").catch(u=>{throw e(),u})})}var z={};d(z,{CloseRequestedEvent:()=>D,LogicalPosition:()=>W,LogicalSize:()=>v,PhysicalPosition:()=>y,PhysicalSize:()=>p,UserAttentionType:()=>$,WebviewWindow:()=>m,WebviewWindowHandle:()=>M,WindowManager:()=>E,appWindow:()=>F,availableMonitors:()=>qe,currentMonitor:()=>$e,getAll:()=>j,getCurrent:()=>Ge,primaryMonitor:()=>je});var v=class{constructor(e,n){this.type="Logical";this.width=e,this.height=n}},p=class{constructor(e,n){this.type="Physical";this.width=e,this.height=n}toLogical(e){return new v(this.width/e,this.height/e)}},W=class{constructor(e,n){this.type="Logical";this.x=e,this.y=n}},y=class{constructor(e,n){this.type="Physical";this.x=e,this.y=n}toLogical(e){return new W(this.x/e,this.y/e)}},$=(n=>(n[n.Critical=1]="Critical",n[n.Informational=2]="Informational",n))($||{});function Ge(){return new m(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0})}function j(){return window.__TAURI_METADATA__.__windows.map(t=>new m(t.label,{skip:!0}))}var G=["tauri://created","tauri://error"],M=class{constructor(e){this.label=e,this.listeners=Object.create(null)}async listen(e,n){return this._handleTauriEvent(e,n)?Promise.resolve(()=>{let o=this.listeners[e];o.splice(o.indexOf(n),1)}):h(e,this.label,n)}async once(e,n){return this._handleTauriEvent(e,n)?Promise.resolve(()=>{let o=this.listeners[e];o.splice(o.indexOf(n),1)}):P(e,this.label,n)}async emit(e,n){if(G.includes(e)){for(let o of this.listeners[e]||[])o({event:e,id:-1,windowLabel:this.label,payload:n});return Promise.resolve()}return _(e,this.label,n)}_handleTauriEvent(e,n){return G.includes(e)?(e in this.listeners?this.listeners[e].push(n):this.listeners[e]=[n],!0):!1}},E=class extends M{async scaleFactor(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"scaleFactor"}}}})}async innerPosition(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerPosition"}}}}).then(({x:e,y:n})=>new y(e,n))}async outerPosition(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerPosition"}}}}).then(({x:e,y:n})=>new y(e,n))}async innerSize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerSize"}}}}).then(({width:e,height:n})=>new p(e,n))}async outerSize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerSize"}}}}).then(({width:e,height:n})=>new p(e,n))}async isFullscreen(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isFullscreen"}}}})}async isMinimized(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMinimized"}}}})}async isMaximized(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMaximized"}}}})}async isDecorated(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isDecorated"}}}})}async isResizable(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isResizable"}}}})}async isVisible(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isVisible"}}}})}async title(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"title"}}}})}async theme(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"theme"}}}})}async center(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"center"}}}})}async requestUserAttention(e){let n=null;return e&&(e===1?n={type:"Critical"}:n={type:"Informational"}),i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"requestUserAttention",payload:n}}}})}async setResizable(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setResizable",payload:e}}}})}async setTitle(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setTitle",payload:e}}}})}async maximize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"maximize"}}}})}async unmaximize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unmaximize"}}}})}async toggleMaximize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"toggleMaximize"}}}})}async minimize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"minimize"}}}})}async unminimize(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unminimize"}}}})}async show(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"show"}}}})}async hide(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"hide"}}}})}async close(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"close"}}}})}async setDecorations(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setDecorations",payload:e}}}})}async setShadow(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setShadow",payload:e}}}})}async setAlwaysOnTop(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setAlwaysOnTop",payload:e}}}})}async setContentProtected(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setContentProtected",payload:e}}}})}async setSize(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSize",payload:{type:e.type,data:{width:e.width,height:e.height}}}}}})}async setMinSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMinSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setMaxSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMaxSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setFullscreen(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFullscreen",payload:e}}}})}async setFocus(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFocus"}}}})}async setIcon(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIcon",payload:{icon:typeof e=="string"?e:Array.from(e)}}}}})}async setSkipTaskbar(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSkipTaskbar",payload:e}}}})}async setCursorGrab(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorGrab",payload:e}}}})}async setCursorVisible(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorVisible",payload:e}}}})}async setCursorIcon(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorIcon",payload:e}}}})}async setCursorPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setIgnoreCursorEvents(e){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIgnoreCursorEvents",payload:e}}}})}async startDragging(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"startDragging"}}}})}async onResized(e){return this.listen("tauri://resize",n=>{n.payload=K(n.payload),e(n)})}async onMoved(e){return this.listen("tauri://move",n=>{n.payload=q(n.payload),e(n)})}async onCloseRequested(e){return this.listen("tauri://close-requested",n=>{let o=new D(n);Promise.resolve(e(o)).then(()=>{if(!o.isPreventDefault())return this.close()})})}async onFocusChanged(e){let n=await this.listen("tauri://focus",l=>{e({...l,payload:!0})}),o=await this.listen("tauri://blur",l=>{e({...l,payload:!1})});return()=>{n(),o()}}async onScaleChanged(e){return this.listen("tauri://scale-change",e)}async onMenuClicked(e){return this.listen("tauri://menu",e)}async onFileDropEvent(e){let n=await this.listen("tauri://file-drop",s=>{e({...s,payload:{type:"drop",paths:s.payload}})}),o=await this.listen("tauri://file-drop-hover",s=>{e({...s,payload:{type:"hover",paths:s.payload}})}),l=await this.listen("tauri://file-drop-cancelled",s=>{e({...s,payload:{type:"cancel"}})});return()=>{n(),o(),l()}}async onThemeChanged(e){return this.listen("tauri://theme-changed",e)}},D=class{constructor(e){this._preventDefault=!1;this.event=e.event,this.windowLabel=e.windowLabel,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}},m=class extends E{constructor(e,n={}){super(e),n?.skip||i({__tauriModule:"Window",message:{cmd:"createWebview",data:{options:{label:e,...n}}}}).then(async()=>this.emit("tauri://created")).catch(async o=>this.emit("tauri://error",o))}static getByLabel(e){return j().some(n=>n.label===e)?new m(e,{skip:!0}):null}},F;"__TAURI_METADATA__"in window?F=new m(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0}):(console.warn(`Could not find "window.__TAURI_METADATA__". The "appWindow" value will reference the "main" window label.
Note that this is not an issue if running this frontend on a browser instead of a Tauri window.`),F=new m("main",{skip:!0}));function k(t){return t===null?null:{name:t.name,scaleFactor:t.scaleFactor,position:q(t.position),size:K(t.size)}}function q(t){return new y(t.x,t.y)}function K(t){return new p(t.width,t.height)}async function $e(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"currentMonitor"}}}}).then(k)}async function je(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"primaryMonitor"}}}}).then(k)}async function qe(){return i({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"availableMonitors"}}}}).then(t=>t.map(k))}var N={};d(N,{EOL:()=>Ke,arch:()=>Je,platform:()=>Qe,tempdir:()=>Xe,type:()=>Ye,version:()=>Ze});var Ke=b()?`\r
`:`
`;async function Qe(){return i({__tauriModule:"Os",message:{cmd:"platform"}})}async function Ze(){return i({__tauriModule:"Os",message:{cmd:"version"}})}async function Ye(){return i({__tauriModule:"Os",message:{cmd:"osType"}})}async function Je(){return i({__tauriModule:"Os",message:{cmd:"arch"}})}async function Xe(){return i({__tauriModule:"Os",message:{cmd:"tempdir"}})}var Be=r;return X(et);})();
window.__TAURI__ = __TAURI_IIFE__
