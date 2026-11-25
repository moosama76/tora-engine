var ToraNative=(()=>{var Wh=Object.defineProperty;var Rv=Object.getOwnPropertyDescriptor;var Pv=Object.getOwnPropertyNames;var Lv=Object.prototype.hasOwnProperty;var Nv=(n,e)=>{for(var t in e)Wh(n,t,{get:e[t],enumerable:!0})},Dv=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Pv(e))!Lv.call(n,r)&&r!==t&&Wh(n,r,{get:()=>e[r],enumerable:!(i=Rv(e,r))||i.enumerable});return n};var Uv=n=>Dv(Wh({},"__esModule",{value:!0}),n);var QS={};Nv(QS,{computeSafeArea:()=>Of,createNetworkBridge:()=>Z0,layoutStandardText:()=>J0,mountNative:()=>KS});var sp=function(n,e){if(!n)throw Error(e)},ra=function(){return[1,0,0,1,0,0]};function Xh(n){return sp(Array.isArray(n)&&n.length===6&&n.every(Number.isFinite),"E_SCENE_MATRIX"),n}function Hs(n,e){return Xh(n),Xh(e),[n[0]*e[0]+n[2]*e[1],n[1]*e[0]+n[3]*e[1],n[0]*e[2]+n[2]*e[3],n[1]*e[2]+n[3]*e[3],n[0]*e[4]+n[2]*e[5]+n[4],n[1]*e[4]+n[3]*e[5]+n[5]]}function qr(n){Xh(n);var e=n[0]*n[3]-n[1]*n[2];return sp(Math.abs(e)>1e-12,"E_SCENE_SINGULAR_TRANSFORM"),[n[3]/e,-n[1]/e,-n[2]/e,n[0]/e,(n[2]*n[5]-n[3]*n[4])/e,(n[1]*n[4]-n[0]*n[5])/e]}var Yh=function(){return Yh=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Yh.apply(this,arguments)},aa=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},xs=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},qh=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function op(n){var e=n.rows,t=n.columns,i=n.seed,r=n.slots,a=n.paint,s=n.onEvent,o=r.map(function(fe){return fe.group}),c=xs([],aa(new Set(o)),!1),l=xs([],aa(o),!1),h=i,f="idle",d=0,m,y,T=[],g=[],p=0,v=0,w=0,_,A,I=function(fe,Ie){return fe*t+Ie},U=function(fe){return Math.floor(fe/t)},x=function(fe){return fe%t},L=function(){return h=Math.imul(h,1664525)+1013904223>>>0,h/4294967296};function k(fe){for(var Ie=new Set,De=0;De<e;De++)for(var re=0;re<t;re++){var le=I(De,re),Re=fe[le];if(re+2<t&&Re===fe[le+1]&&Re===fe[le+2])for(var ze=0;ze<3;ze++)Ie.add(le+ze);if(De+2<e&&Re===fe[le+t]&&Re===fe[le+t*2])for(var ze=0;ze<3;ze++)Ie.add(le+t*ze)}return xs([],aa(Ie),!1)}function V(fe,Ie){var De;if(l[fe]===l[Ie])return!1;var re=xs([],aa(l),!1);return De=aa([re[Ie],re[fe]],2),re[fe]=De[0],re[Ie]=De[1],k(re).some(function(le){return le===fe||le===Ie})}function Y(){for(var fe=[],Ie=0;Ie<l.length;Ie++)x(Ie)+1<t&&V(Ie,Ie+1)&&fe.push({from:r[Ie].id,to:r[Ie+1].id}),U(Ie)+1<e&&V(Ie,Ie+t)&&fe.push({from:r[Ie].id,to:r[Ie+t].id});return fe}function E(){for(var fe=0;fe<64;fe++){l=[];for(var Ie=function(re){var le=c.filter(function(Re){return!(x(re)>=2&&l[re-1]===Re&&l[re-2]===Re)&&!(U(re)>=2&&l[re-t]===Re&&l[re-t*2]===Re)});l.push(le[Math.floor(L()*le.length)])},De=0;De<r.length;De++)Ie(De);if(Y().length)return}l=r.map(function(re,le){return c[(U(le)*2+x(le))%3]}),l[0]=c[0],l[1]=c[1],l[2]=c[0],l[t+1]=c[0]}function S(){for(var fe=0;fe<r.length;fe++)a(fe,l[fe],{})}function B(){h=i,l=xs([],aa(o),!1),f="idle",d=0,m=void 0,y=void 0,T=[],g=[],p=0,v=0,w=0,_=void 0,A=void 0,(k(l).length||!Y().length)&&E(),S()}function z(fe,Ie){if(f!=="idle")return!1;var De=r.findIndex(function(le){return le.id===fe}),re=r.findIndex(function(le){return le.id===Ie});return De<0||re<0||Math.abs(U(De)-U(re))+Math.abs(x(De)-x(re))!==1?!1:(m=void 0,_=void 0,S(),y=[De,re],f="swap",d=0,!0)}function K(fe){if(f==="idle"){if(m===fe){m=void 0;return}if(!(m&&z(m,fe)))return m=fe,m}}function W(){T=k(l),w+=T.length,A={group:l[T[0]],from:r[T[0]].id,count:T.length},s("matchClear"),f="clear",d=0}function O(){var fe=new Set(T),Ie=xs([],aa(l),!1);g=[];for(var De=0;De<t;De++){for(var re=[],le=e-1;le>=0;le--)fe.has(I(le,De))||re.push(I(le,De));for(var Re=0,le=e-1;le>=0;le--){var ze=I(le,De),Fe=re[e-1-le];Fe!==void 0?(Ie[ze]=l[Fe],g.push({cell:ze,from:Fe,offsetRows:0})):(Ie[ze]=c[Math.floor(L()*c.length)],g.push({cell:ze,from:ze,offsetRows:-(le+1+Re++)}))}}l=Ie,f="fall",d=0}function ne(){if(k(l).length&&p<3){p++,W();return}(k(l).length||!Y().length)&&E(),S(),f="idle",d=0,y=void 0,T=[],g=[],v++,s("validMatch")}function ae(fe){var Ie,De,re,le,Re,ze,Fe;if(f==="idle"){if(_){_.elapsed+=fe;var ft=1+.065*Math.sin(Math.min(1,_.elapsed/.8)*Math.PI*4),Ot=function(ke){a(r.findIndex(function(We){return We.id===ke}),l[r.findIndex(function(We){return We.id===ke})],{scale:ft})};try{for(var ut=qh(_.ids),It=ut.next();!It.done;It=ut.next()){var pt=It.value;Ot(pt)}}catch(ke){Ie={error:ke}}finally{try{It&&!It.done&&(De=ut.return)&&De.call(ut)}finally{if(Ie)throw Ie.error}}_.elapsed>=.8&&(_=void 0,S())}return}if(d+=fe,f==="swap"||f==="reverse"){var bt=Math.min(1,d/.14),Ve=bt*bt*(3-2*bt),fn=aa(y,2),en=fn[0],Bt=fn[1];if(a(en,l[en],{from:Bt,progress:f==="swap"?Ve:1-Ve}),a(Bt,l[Bt],{from:en,progress:f==="swap"?Ve:1-Ve}),bt<1)return;if(f==="reverse"){S(),f="idle",y=void 0,s("invalidMatch");return}if(!V(en,Bt)){f="reverse",d=0;return}re=aa([l[Bt],l[en]],2),l[en]=re[0],l[Bt]=re[1],S(),W();return}if(f==="clear"){var tn=Math.min(1,d/.18),ft=tn<.22?1+tn*.45:Math.max(.05,1.1*(1-tn)/.78);try{for(var ee=qh(T),Qt=ee.next();!Qt.done;Qt=ee.next()){var Xt=Qt.value;a(Xt,l[Xt],{scale:ft,opacity:1-tn})}}catch(We){le={error:We}}finally{try{Qt&&!Qt.done&&(Re=ee.return)&&Re.call(ee)}finally{if(le)throw le.error}}tn===1&&O();return}var G=Math.min(1,d/.25),b=1-Math.pow(1-G,3);try{for(var oe=qh(g),ue=oe.next();!ue.done;ue=oe.next()){var Me=ue.value;a(Me.cell,l[Me.cell],{from:Me.from,offsetRows:Me.offsetRows,progress:1-b})}}catch(ke){ze={error:ke}}finally{try{ue&&!ue.done&&(Fe=oe.return)&&Fe.call(oe)}finally{if(ze)throw ze.error}}G===1&&ne()}function xe(){if(f==="idle"){m=void 0;var fe=Y()[0];fe&&(_={ids:[fe.from,fe.to],elapsed:0})}}function be(){var fe;return{phase:f,busy:f!=="idle",selected:m??null,moves:v,cleared:w,groups:xs([],aa(l),!1),legalMoves:f==="idle"?Y():[],hint:(fe=_?.ids)!==null&&fe!==void 0?fe:[],lastMatch:A?Yh({},A):null}}return{reset:B,select:K,swap:z,tick:ae,showHint:xe,snapshot:be,cancelSelection:function(){m=void 0,_&&(_=void 0,S())}}}var uc=function(){return uc=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},uc.apply(this,arguments)},lp=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Fv=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},cp=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function up(){var n=new Map,e=new Map,t=function(r){var a,s,o=e.get(r);o!==void 0&&((a=n.get(o))===null||a===void 0||a.delete(r),((s=n.get(o))===null||s===void 0?void 0:s.size)===0&&n.delete(o)),e.delete(r)},i=function(r,a){t(r),a!=null&&(n.has(a)||n.set(a,new Set),n.get(a).add(r),e.set(r,a))};return{occupants:n,itemZone:e,release:t,place:i,clear:function(){n.clear(),e.clear()},items:function(r){var a;return Fv([],lp((a=n.get(r))!==null&&a!==void 0?a:[]),!1).sort()},zoneOf:function(r){return e.get(r)},snapshot:function(){return{itemZone:Object.fromEntries(e)}}}}function hc(n){var e,t,i=n.itemId,r=n.tag,a=r===void 0?"":r,s=n.zones,o=n.occupancy,c=s.filter(function(y){var T,g,p;return y.id!==i&&(((g=(T=y.acceptTags)===null||T===void 0?void 0:T.length)!==null&&g!==void 0?g:0)===0||((p=y.acceptTags)===null||p===void 0?void 0:p.includes(a)))});c.sort(function(y,T){return Number(T.itemTarget)-Number(y.itemTarget)||T.paintOrder-y.paintOrder||y.distance-T.distance||y.id.localeCompare(T.id)});try{for(var l=cp(c),h=l.next();!h.done;h=l.next()){var f=h.value,d=o.items(f.id).filter(function(y){return y!==i}),m=f.capacity>0&&d.length>=f.capacity;return f.snapMode==="reject"?{kind:"reject",zone:f,occupantId:d[0]}:m?f.onOccupied==="emit"?{kind:"emit",zone:f,occupantId:d[0]}:f.onOccupied==="swap"&&d.length?{kind:"swap",zone:f,occupantId:d[0]}:{kind:"reject",zone:f,occupantId:d[0]}:{kind:"accept",zone:f}}}catch(y){e={error:y}}finally{try{h&&!h.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}return null}function hp(n,e,t,i,r,a){if(t===void 0&&(t=28),i===void 0&&(i=-1/0),r===void 0&&(r=0),a===void 0&&(a=80),r-i<a)return null;var s=e.x-n.x,o=e.y-n.y;return Math.max(Math.abs(s),Math.abs(o))<t?null:Math.abs(s)>Math.abs(o)?s<0?"left":"right":o<0?"up":"down"}function dp(n,e){var t=e,i=1;return{tick:function(r){return n.pingPong?(t+=i*n.ratePerSecond*r,t>=n.max?(t=n.max,i=-1):t<=n.min&&(t=n.min,i=1)):t=Math.max(n.min,Math.min(n.max,t+n.ratePerSecond*r)),t}}}function fp(){var n=new Map;return{to:function(e,t,i,r,a){r===void 0&&(r=.18),n.set(e,{from:uc({},t),to:uc({},i),seconds:Math.max(.02,r),elapsed:0,onDone:a})},cancel:function(e){n.delete(e)},clear:function(){n.clear()},tick:function(e,t){var i,r,a;try{for(var s=cp(n),o=s.next();!o.done;o=s.next()){var c=lp(o.value,2),l=c[0],h=c[1];h.elapsed+=e;var f=Math.min(1,h.elapsed/h.seconds),d=1-Math.pow(1-f,3);t(l,{x:h.from.x+(h.to.x-h.from.x)*d,y:h.from.y+(h.to.y-h.from.y)*d}),f===1&&(n.delete(l),(a=h.onDone)===null||a===void 0||a.call(h))}}catch(m){i={error:m}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}}}}var Zh=function(){return Zh=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Zh.apply(this,arguments)},pp=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function mp(n){var e,t,i=2166136261;try{for(var r=pp(String(n)),a=r.next();!a.done;a=r.next()){var s=a.value;i^=s.codePointAt(0),i=Math.imul(i,16777619)}}catch(o){e={error:o}}finally{try{a&&!a.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return i>>>0||1}function Ov(n){var e=n>>>0||1,t=e;return{next:function(){return t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296},between:function(i,r,a){if(a===void 0&&(a=!1),a){var s=Math.ceil(i),o=Math.floor(r);return o<s?s:Math.min(o,s+Math.floor((o-s+1)*this.next()))}return i+(r-i)*this.next()},reset:function(){t=e}}}function vp(n,e,t,i,r){var a,s;i===void 0&&(i=0);var o=null,c=1/0;try{for(var l=pp(e),h=l.next();!h.done;h=l.next()){var f=h.value;if(!(f.id===r||f.team!==t)){var d=Math.hypot(f.x-n.x,f.y-n.y);i>0&&d>i||(d<c||d===c&&f.id<o?.id)&&(o=f,c=d)}}}catch(m){a={error:m}}finally{try{h&&!h.done&&(s=l.return)&&s.call(l)}finally{if(a)throw a.error}}return o}function gp(n,e,t){var i=((e-n+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return n+Math.max(-t,Math.min(t,i))}function yp(n){var e=Ov(n),t=new Map,i=new Map;return{rng:e,states:t,headings:i,reset:function(){e.reset(),t.clear(),i.clear()},initialize:function(r,a){var s;return t.has(r)||t.set(r,{hp:a.hp,maxHp:a.maxHp,value:a.value,tag:(s=a.tag)!==null&&s!==void 0?s:"",team:a.team}),t.get(r)},remove:function(r){t.delete(r),i.delete(r)},snapshot:function(r){var a=t.get(r);return a?Zh({},a):void 0}}}function xp(n,e){var t,i,r,a,s=e===void 0?{}:e,o=s.width,c=s.height,l=s.onProgress,h=l===void 0?function(){}:l,f=s.onComplete,d=f===void 0?function(){}:f,m=s.canvasFactory,y=s.source,T=n,g=T.gridSize,p=new Uint8Array(g*g),v=0,w=!1,_=-1,A=!1,I=Math.max(1,o),U=Math.max(1,c),x=Math.min(1,512/Math.max(I,U)),L=(t=m?.())!==null&&t!==void 0?t:!((i=globalThis.document)===null||i===void 0)&&i.createElement?globalThis.document.createElement("canvas"):void 0;L&&(L.width=Math.max(1,Math.round(I*x)),L.height=Math.max(1,Math.round(U*x)));var k=(r=L?.getContext)===null||r===void 0?void 0:r.call(L,"2d"),V=(a=T.maskColor)!==null&&a!==void 0?a:"#dceeff",Y=function(){return!!(y&&y.complete&&y.naturalWidth>0)},E=function(){k&&(k.globalCompositeOperation="source-over",k.clearRect(0,0,L.width,L.height),T.mode==="erase"&&(Y()?(k.drawImage(y,0,0,L.width,L.height),A=!0):(k.fillStyle=V,k.fillRect(0,0,L.width,L.height),A=!1)))};E();var S=function(){if(!w){var z=Math.round(v/p.length*100),K=Math.min(100,z);K!==_&&(_=K,h(K)),K>=T.targetPercent&&(w=!0,d(K))}},B=function(z,K){for(var W=Math.max(0,Math.min(g-1,Math.floor(z/I*g))),O=Math.max(0,Math.min(g-1,Math.floor(K/U*g))),ne=Math.max(0,Math.ceil(T.brushRadiusPx/I*g)),ae=Math.max(0,Math.ceil(T.brushRadiusPx/U*g)),xe=Math.max(0,O-ae);xe<=Math.min(g-1,O+ae);xe++)for(var be=Math.max(0,W-ne);be<=Math.min(g-1,W+ne);be++)if(!(Math.hypot((be+.5)/g*I-z,(xe+.5)/g*U-K)>T.brushRadiusPx)){var fe=xe*g+be;p[fe]||(p[fe]=1,v++)}k&&(k.save(),k.scale(x,x),k.globalCompositeOperation=T.mode==="erase"?"destination-out":"source-over",k.fillStyle=V,k.beginPath(),k.arc(z,K,T.brushRadiusPx,0,Math.PI*2),k.fill(),T.mode==="reveal"&&y&&(k.globalCompositeOperation="source-in",k.drawImage(y,0,0,I,U)),k.restore()),S()};return{canvas:L,stampSegment:function(z,K){for(var W=Math.hypot(K.x-z.x,K.y-z.y),O=Math.max(1,Math.ceil(W/Math.max(1,T.brushRadiusPx*.45))),ne=0;ne<=O;ne++)B(z.x+(K.x-z.x)*ne/O,z.y+(K.y-z.y)*ne/O)},reset:function(){p.fill(0),v=0,w=!1,_=-1,E(),S()},get progress(){return Math.round(v/p.length*100)},render:function(z){T.mode==="erase"&&v===0&&!A&&Y()&&E(),L?z.drawImage(L,0,0,L.width,L.height,0,0,o,c):T.mode==="erase"&&this.progress<100&&(z.save(),z.globalAlpha=1-this.progress/100,z.fillStyle=V,z.fillRect(0,0,o,c),z.restore())}}}var _s=function(){return _s=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},_s.apply(this,arguments)},Bv=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Jh(n,e,t,i){var r=function(h,f,d){return(f.x-h.x)*(d.y-h.y)-(f.y-h.y)*(d.x-h.x)},a=r(n,e,t),s=r(n,e,i),o=r(t,i,n),c=r(t,i,e),l=1e-8;return Math.abs(a)<l&&Math.abs(s)<l&&Math.abs(o)<l&&Math.abs(c)<l?Math.max(Math.min(n.x,e.x),Math.min(t.x,i.x))<=Math.min(Math.max(n.x,e.x),Math.max(t.x,i.x))+l&&Math.max(Math.min(n.y,e.y),Math.min(t.y,i.y))<=Math.min(Math.max(n.y,e.y),Math.max(t.y,i.y))+l:a>0!=s>0&&o>0!=c>0}function _p(n,e){for(var t=!1,i=0,r=e.length-1;i<e.length;r=i++){var a=e[i],s=e[r];a.y>n.y!=s.y>n.y&&n.x<(s.x-a.x)*(n.y-a.y)/(s.y-a.y)+a.x&&(t=!t)}return t}function Mp(n,e,t){if(t.length>=3&&(_p(n,t)||_p(e,t)))return!0;for(var i=0;i<t.length;i++)if(Jh(n,e,t[i],t[(i+1)%t.length]))return!0;return!1}function Sp(n){var e=n,t=[],i=null,r=0,a=function(s){return _s(_s({},s),{points:s.points.map(function(o){return _s({},o)})})};return{begin:function(s){var o={id:++r,points:[_s({},s)],age:0,hitIds:new Set};return i=o,t.push(o),t.length>e.maxStrokes&&t.shift(),o},add:function(s){if(!i||i.points.length>=e.maxPoints)return!1;var o=i.points[i.points.length-1];return Math.hypot(s.x-o.x,s.y-o.y)<e.minSegmentPx?!1:(i.points.push(_s({},s)),!0)},end:function(){var s=i;return i=null,s?a(s):void 0},cancel:function(){i&&(t=t.filter(function(s){return s!==i})),i=null},clear:function(){i=null,t=[]},tick:function(s){var o,c;try{for(var l=Bv(t),h=l.next();!h.done;h=l.next()){var f=h.value;f.age+=s}}catch(d){o={error:d}}finally{try{h&&!h.done&&(c=l.return)&&c.call(l)}finally{if(o)throw o.error}}t=t.filter(function(d){return d===i||d.age<.18||e.mode!=="slice-blade"})},get active(){return i},get strokes(){return t}}}function bp(n,e){for(var t=[],i=1;i<n.points.length;i++){var r=n.points[i-1],a=n.points[i],s=Math.hypot(a.x-r.x,a.y-r.y);s<.001||t.push({id:"stroke-".concat(n.id,"-").concat(i),strokeId:n.id,mode:"static",shape:"box",x:(r.x+a.x)/2,y:(r.y+a.y)/2,width:s,height:Math.max(2,e),angle:Math.atan2(a.y-r.y,a.x-r.x),restitution:.8})}return t}var qo=function(){return qo=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},qo.apply(this,arguments)},Cp=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ya=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},zv=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ea=function(n,e){return Math.hypot(n,e)},wp=function(n,e,t){return Math.max(e,Math.min(t,n))},Ms=function(n){return Math.max(1,Math.min(n.width,n.height)/2)};function Tp(n){var e,t,i=Math.cos((e=n.angle)!==null&&e!==void 0?e:0),r=Math.sin((t=n.angle)!==null&&t!==void 0?t:0),a=n.width/2,s=n.height/2;return[[-a,-s],[a,-s],[a,s],[-a,s]].map(function(o){var c=Cp(o,2),l=c[0],h=c[1];return{x:n.x+l*i-h*r,y:n.y+l*r+h*i}})}function kv(n,e){var t,i,r,a,s,o,c,l,h,f,d=Tp(n),m=Tp(e),y=[(c=n.angle)!==null&&c!==void 0?c:0,((l=n.angle)!==null&&l!==void 0?l:0)+Math.PI/2,(h=e.angle)!==null&&h!==void 0?h:0,((f=e.angle)!==null&&f!==void 0?f:0)+Math.PI/2],T=1/0,g=1,p=0;try{for(var v=Ya(y),w=v.next();!w.done;w=v.next()){var _=w.value,A=Math.cos(_),I=Math.sin(_),U=1/0,x=-1/0,L=1/0,k=-1/0;try{for(var V=(r=void 0,Ya(d)),Y=V.next();!Y.done;Y=V.next()){var E=Y.value,S=E.x*A+E.y*I;S<U&&(U=S),S>x&&(x=S)}}catch(W){r={error:W}}finally{try{Y&&!Y.done&&(a=V.return)&&a.call(V)}finally{if(r)throw r.error}}try{for(var B=(s=void 0,Ya(m)),z=B.next();!z.done;z=B.next()){var E=z.value,S=E.x*A+E.y*I;S<L&&(L=S),S>k&&(k=S)}}catch(W){s={error:W}}finally{try{z&&!z.done&&(o=B.return)&&o.call(B)}finally{if(s)throw s.error}}var K=Math.min(x,k)-Math.max(U,L);if(K<=0)return null;K<T&&(T=K,g=A,p=I)}}catch(W){t={error:W}}finally{try{w&&!w.done&&(i=v.return)&&i.call(v)}finally{if(t)throw t.error}}return(n.x-e.x)*g+(n.y-e.y)*p<0&&(g=-g,p=-p),{nx:g,ny:p,penetration:T}}function Ep(n,e){var t,i,r,a=Ms(n),s=-((t=e.angle)!==null&&t!==void 0?t:0),o=Math.cos(s),c=Math.sin(s),l=n.x-e.x,h=n.y-e.y,f=l*o-h*c,d=l*c+h*o,m=e.width/2,y=e.height/2,T=wp(f,-m,m),g=wp(d,-y,y),p=f-T,v=d-g,w=Ea(p,v),_;if(w>=a)return null;if(w<1e-4){var A=[{d:m-Math.abs(f),x:f>=0?1:-1,y:0},{d:y-Math.abs(d),x:0,y:d>=0?1:-1}].sort(function(x,L){return x.d-L.d});p=A[0].x,v=A[0].y,_=a+A[0].d}else p/=w,v/=w,_=a-w;var I=Math.cos((i=e.angle)!==null&&i!==void 0?i:0),U=Math.sin((r=e.angle)!==null&&r!==void 0?r:0);return{nx:p*I-v*U,ny:p*U+v*I,penetration:_}}function Ap(n,e){var t;return!!(n.ignoreGroup&&n.ignoreGroup!=="none"&&(n.ignoreGroup==="all"||n.ignoreGroup===((t=e.collisionGroup)!==null&&t!==void 0?t:"all")))}function Ip(n,e,t){var i,r,a,s,o,c;if(!(n.captured||e.captured||Ap(n,e)||Ap(e,n))){var l=n.x-e.x,h=n.y-e.y,f;if(n.shape==="circle"&&e.shape==="circle"){var d=Ea(l,h),m=Ms(n)+Ms(e)-d;if(m<=0)return;f=m,d>1e-4?(l/=d,h/=d):(l=1,h=0)}else if(n.shape==="circle"&&e.shape==="box"){var y=Ep(n,e);if(!y)return;l=y.nx,h=y.ny,f=y.penetration}else if(n.shape==="box"&&e.shape==="circle"){var y=Ep(e,n);if(!y)return;l=-y.nx,h=-y.ny,f=y.penetration}else if(n.shape==="box"&&e.shape==="box"){var y=kv(n,e);if(!y)return;l=y.nx,h=y.ny,f=y.penetration}else return;var T=n.mode==="dynamic"?1/((i=n.mass)!==null&&i!==void 0?i:1):0,g=e.mode==="dynamic"?1/((r=e.mass)!==null&&r!==void 0?r:1):0,p=T+g;if(p){n.x+=l*f*T/p,n.y+=h*f*T/p,e.mode==="dynamic"&&(e.x-=l*f*g/p,e.y-=h*f*g/p);var v=n.vx-((a=e.vx)!==null&&a!==void 0?a:0),w=n.vy-((s=e.vy)!==null&&s!==void 0?s:0),_=v*l+w*h;if(!(_>=0)){var A=Math.max((o=n.restitution)!==null&&o!==void 0?o:0,(c=e.restitution)!==null&&c!==void 0?c:0),I=-(1+A)*_/p;n.vx+=l*I*T,n.vy+=h*I*T,e.mode==="dynamic"&&(e.vx-=l*I*g,e.vy-=h*I*g),n.atRest=!1,n.restElapsed=0,e.mode==="dynamic"&&(e.atRest=!1,e.restElapsed=0),Math.abs(_)>4&&(t("bodyBounce",n,e,{speed:Math.abs(_)}),e.mode==="dynamic"&&t("bodyBounce",e,n,{speed:Math.abs(_)}))}}}}function Vv(n,e,t,i){var r,a;if(!(n.mode!=="dynamic"||n.captured))try{for(var s=Ya(e),o=s.next();!o.done;o=s.next()){var c=o.value,l=c.x-n.x,h=c.y-n.y,f=Ea(l,h);if(!(f>=c.radius*2.5)){if(f>c.radius&&f>.001&&c.pullStrength>0){var d=c.pullStrength*(1-f/(c.radius*2.5));n.vx+=l/f*d*t,n.vy+=h/f*d*t}if(f<c.radius&&Ea(n.vx,n.vy)<=c.maxCaptureSpeed){n.captured=!0,n.atRest=!0,n.vx=c.stopBody?0:n.vx,n.vy=c.stopBody?0:n.vy,c.stopBody&&(n.x=c.x,n.y=c.y),i("zoneCapture",n,c,{});return}}}}catch(m){r={error:m}}finally{try{o&&!o.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}}function Gv(n,e){var t,i,r,a,s,o,c=function(d){if(d.broken)return"continue";var m=e.find(function(U){return U.id===d.bodyId}),y=e.find(function(U){return U.id===d.anchorId});if(!m||m.mode!=="dynamic")return"continue";var T=(a=(r=y?.x)!==null&&r!==void 0?r:d.x)!==null&&a!==void 0?a:0,g=(o=(s=y?.y)!==null&&s!==void 0?s:d.y)!==null&&o!==void 0?o:0,p=m.x-T,v=m.y-g,w=Ea(p,v);if(w<=d.lengthPx||w<1e-4)return"continue";var _=p/w,A=v/w;m.x=T+_*d.lengthPx,m.y=g+A*d.lengthPx;var I=m.vx*_+m.vy*A;I>0&&(m.vx-=_*I,m.vy-=A*I)};try{for(var l=Ya(n),h=l.next();!h.done;h=l.next()){var f=h.value;c(f)}}catch(d){t={error:d}}finally{try{h&&!h.done&&(i=l.return)&&i.call(l)}finally{if(t)throw t.error}}}function $h(n){for(var e,t,i,r,a,s,o,c,l,h,f,d=n.bodies,m=n.zones,y=m===void 0?[]:m,T=n.joints,g=T===void 0?[]:T,p=n.bounds,v=n.dt,w=n.onEvent,_=w===void 0?function(){}:w,A=d.filter(function(re){return re.mode==="dynamic"&&!re.captured}),I=A.reduce(function(re,le){return Math.max(re,Ea(le.vx,le.vy))},0),U=A.reduce(function(re,le){return Math.min(re,Ms(le))},24),x=Math.min(16,Math.max(1,Math.ceil(I*v/(U*.45)))),L=v/x,k=0;k<x;k++){try{for(var V=(e=void 0,Ya(A)),Y=V.next();!Y.done;Y=V.next()){var E=Y.value;E.vy+=((o=E.gravity)!==null&&o!==void 0?o:0)*L;var S=Ea(E.vx,E.vy);if(S>E.maxSpeed){var B=E.maxSpeed/S;E.vx*=B,E.vy*=B,S=E.maxSpeed}E.x+=E.vx*L,E.y+=E.vy*L;var z=Math.max(0,S-((c=E.friction)!==null&&c!==void 0?c:0)*L),K=Math.exp(-((l=E.linearDamping)!==null&&l!==void 0?l:0)*L);if(S>1e-4){var W=z/S*K;E.vx*=W,E.vy*=W}E.spinToRotation&&(E.angle=((h=E.angle)!==null&&h!==void 0?h:0)+Ea(E.vx,E.vy)*L/Ms(E)*(E.vx<0?-1:1))}}catch(re){e={error:re}}finally{try{Y&&!Y.done&&(t=V.return)&&t.call(V)}finally{if(e)throw e.error}}for(var O=0;O<A.length;O++){var E=A[O];try{for(var ne=(i=void 0,Ya(d)),ae=ne.next();!ae.done;ae=ne.next()){var xe=ae.value;xe.id!==E.id&&xe.mode!=="dynamic"&&Ip(E,xe,_)}}catch(le){i={error:le}}finally{try{ae&&!ae.done&&(r=ne.return)&&r.call(ne)}finally{if(i)throw i.error}}for(var xe=O+1;xe<A.length;xe++)Ip(A[xe],E,_);var be=E.shape==="box"?E.width/2:Ms(E),fe=E.shape==="box"?E.height/2:Ms(E);E.wallBounce?(E.x-be<p.left&&(E.x=p.left+be,E.vx<0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.x+be>p.right&&(E.x=p.right-be,E.vx>0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.y-fe<p.top&&(E.y=p.top+fe,E.vy<0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution)),E.y+fe>p.bottom&&(E.y=p.bottom-fe,E.vy>0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution))):!E.exited&&(E.x+be<p.left||E.x-be>p.right||E.y+fe<p.top||E.y-fe>p.bottom)&&(E.exited=!0,_("boundaryExit",E,null,{})),Vv(E,y,L,_)}Gv(g,d)}try{for(var Ie=Ya(A),De=Ie.next();!De.done;De=Ie.next()){var E=De.value,S=Ea(E.vx,E.vy);S<E.restSpeed&&!E.captured?(E.restElapsed=((f=E.restElapsed)!==null&&f!==void 0?f:0)+v,E.restElapsed>=E.restDelaySeconds&&!E.atRest&&(E.atRest=!0,E.vx=0,E.vy=0,_("bodyRest",E,null,{}))):S>=E.restSpeed&&(E.restElapsed=0,E.atRest=!1)}}catch(re){a={error:re}}finally{try{De&&!De.done&&(s=Ie.return)&&s.call(Ie)}finally{if(a)throw a.error}}}function Rp(n){for(var e=n.body,t=n.bodies,i=n.zones,r=i===void 0?[]:i,a=n.bounds,s=n.dots,o=s===void 0?8:s,c=n.bounces,l=c===void 0?1:c,h=function(w){return qo({},w)},f=h(e),d=t.filter(function(w){return w.id!==e.id}).map(h),m=zv([f],Cp(d),!1),y=[],T=0,g=!1,p=function(w,_,A,I){w==="bodyBounce"&&I.sourceId===e.id&&T++,w==="zoneCapture"&&I.sourceId===e.id&&(g=!0)},v=0;v<90&&y.length<o&&!g&&T<=l;v++)$h({bodies:m,zones:r,bounds:a,dt:1/60,onEvent:function(w,_,A,I){return p(w,_,A,qo(qo({},I),{sourceId:_.id}))}}),v%Math.max(1,Math.floor(90/o))===0&&y.push({x:f.x,y:f.y});return y}var Ws=function(){return Ws=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Ws.apply(this,arguments)},dc=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Lp=.008333333333333333;function Yo(n,e,t){var i,r,a,s=(i=n.boundsX)!==null&&i!==void 0?i:3,o=(r=n.boundsZ)!==null&&r!==void 0?r:7;if(Math.abs(e)>s||Math.abs(t)>o)return null;if(!n.ramp)return 0;var c=(a=n.rampHeight)!==null&&a!==void 0?a:1.1;return t>=1?0:t<=-1?c:(1-t)*(c*.5)}function Pp(n,e,t,i){var r,a,s,o=n.radius,c=Math.cos(e.angle),l=Math.sin(e.angle),h=n.x-e.x,f=n.z-e.z,d=c*h+l*f,m=-l*h+c*f,y=Math.max(-e.hx,Math.min(e.hx,d)),T=Math.max(-e.hz,Math.min(e.hz,m)),g=d-y,p=m-T,v=Math.hypot(g,p),w=Yo(n,n.x,n.z);if(!(v>=o||w!==null&&n.y>w+.55)){v<1e-8?e.hx-Math.abs(d)<e.hz-Math.abs(m)?(g=d<0?-1:1,p=0,v=0):(g=0,p=m<0?-1:1,v=0):(g/=v,p/=v);var _=c*g-l*p,A=l*g+c*p;n.x+=_*(o-v+1e-5),n.z+=A*(o-v+1e-5);var I=(r=e.vx)!==null&&r!==void 0?r:0,U=(a=e.vz)!==null&&a!==void 0?a:0,x=(n.vx-I)*_+(n.vz-U)*A;if(x<0){var L=1+((s=n.restitution)!==null&&s!==void 0?s:.72);n.vx-=L*x*_,n.vz-=L*x*A,Math.abs(x)>.3&&t>0&&i&&i("bodyBounce",n,e.sourceId?e:void 0)}}}function Np(n,e){n.vx=0,n.vy=0,n.vz=0,n.airborne=!1,n.atRest=!0,n.restElapsed=0,n.movingTime=0,e&&e("bodyRest",n)}function Kh(n,e){n.x=n.lastSafe.x,n.y=n.lastSafe.y,n.z=n.lastSafe.z,Np(n,e)}function Qh(n){var e,t,i,r,a,s,o,c,l,h,f,d,m,y,T,g,p,v,w=n.bodies,_=n.walls,A=n.zones,I=n.dt,U=n.onEvent;if(!(!Number.isFinite(I)||I<=0))for(var x=Math.max(1,Math.round(I/Lp)),L=I/x,k=0;k<x;k++)try{for(var V=(e=void 0,dc(w)),Y=V.next();!Y.done;Y=V.next()){var E=Y.value;if(!(E.mode!=="dynamic"||E.captured)&&!E.atRest){var S=(l=E.boundsX)!==null&&l!==void 0?l:3,B=(h=E.boundsZ)!==null&&h!==void 0?h:7;if(E.y<-3||Math.abs(E.x)>S+2||Math.abs(E.z)>B+2){Kh(E,U);continue}E.movingTime=((f=E.movingTime)!==null&&f!==void 0?f:0)+L;var z=E.radius,K=Math.hypot(E.vx,E.vy,E.vz),W=Math.max(1,Math.min(16,Math.ceil(K*L/(z*.45)))),O=L/W;(!E._perimeter||E._pbx!==S||E._pbz!==B)&&(E._pbx=S,E._pbz=B,E._perimeter=[{x:-(S+.1),z:0,hx:.1,hz:B+.1,angle:0,vx:0,vz:0},{x:S+.1,z:0,hx:.1,hz:B+.1,angle:0,vx:0,vz:0},{x:0,z:-(B+.1),hx:S+.1,hz:.1,angle:0,vx:0,vz:0},{x:0,z:B+.1,hx:S+.1,hz:.1,angle:0,vx:0,vz:0}]);for(var ne=E._perimeter,ae=!1,xe=0;xe<W;xe++){var be=Yo(E,E.x,E.z),fe=be!==null&&E.y<=be+z+.012&&E.vy<=.1,Ie=be;if(fe){E.y=be+z,E.vy=0;var De=Math.hypot(E.vx,E.vz),re=Math.max(0,De-((d=E.friction)!==null&&d!==void 0?d:1.05)*O);if(De>0&&(E.vx*=re/De,E.vz*=re/De),E.ramp&&E.z<1&&E.z>-1){var le=((m=E.rampHeight)!==null&&m!==void 0?m:1.1)*.5;E.vz+=9.81*le/(1+le*le)*O}}else E.vy-=9.81*O,E.airborne||(E.airborne=!0,U&&U("bodyJump",E));E.x+=E.vx*O,E.z+=E.vz*O,E.y+=E.vy*O;var Re=Yo(E,E.x,E.z);if(Re!==null){if(fe&&Ie!==null){var le=((y=E.rampHeight)!==null&&y!==void 0?y:1.1)*.5;E.ramp&&E.z<=-1&&E.z-E.vz*O>-1.5&&E.vz<-.8?(E.vy=-E.vz*le,E.airborne=!0,U&&U("bodyJump",E)):E.y=Re+z}E.y<Re+z&&(E.y=Re+z,E.vy=0,E.airborne=!1)}if(E.y<2){try{for(var ze=(i=void 0,dc(_)),Fe=ze.next();!Fe.done;Fe=ze.next()){var ft=Fe.value;Pp(E,ft,O,U)}}catch(Bt){i={error:Bt}}finally{try{Fe&&!Fe.done&&(r=ze.return)&&r.call(ze)}finally{if(i)throw i.error}}try{for(var Ot=(a=void 0,dc(ne)),ut=Ot.next();!ut.done;ut=Ot.next()){var ft=ut.value;Pp(E,ft,O,U)}}catch(Bt){a={error:Bt}}finally{try{ut&&!ut.done&&(s=Ot.return)&&s.call(Ot)}finally{if(a)throw a.error}}}E.spin=((T=E.spin)!==null&&T!==void 0?T:0)+Math.hypot(E.vx,E.vz)*O/z;var It=Math.hypot(E.vx,E.vz);try{for(var pt=(o=void 0,dc(A)),bt=pt.next();!bt.done;bt=pt.next()){var Ve=bt.value,fn=Math.hypot(E.x-Ve.x,E.z-Ve.z);if(fn<Ve.radius&&Math.abs(E.y-(Ve.y+z))<Ve.heightTolerance&&It<Ve.maxCaptureSpeed){E.captured=!0,E.captureElapsed=0,E.captureTarget={x:Ve.x,y:Ve.y,z:Ve.z},E.vx=0,E.vy=0,E.vz=0,E.atRest=!0,U&&U("zoneCapture",E,Ve),ae=!0;break}}}catch(Bt){o={error:Bt}}finally{try{bt&&!bt.done&&(c=pt.return)&&c.call(pt)}finally{if(o)throw o.error}}if(ae)break;if(E.y<-3||Math.abs(E.x)>S+2||Math.abs(E.z)>B+2){Kh(E,U),ae=!0;break}}if(!ae){var en=Math.hypot(E.vx,E.vy,E.vz);en<((g=E.restSpeed)!==null&&g!==void 0?g:.07)?(E.restElapsed=((p=E.restElapsed)!==null&&p!==void 0?p:0)+L,E.restElapsed>((v=E.restDelaySeconds)!==null&&v!==void 0?v:.25)&&Np(E,U)):E.restElapsed=0,E.movingTime>18&&Kh(E,U)}}}}catch(Bt){e={error:Bt}}finally{try{Y&&!Y.done&&(t=V.return)&&t.call(V)}finally{if(e)throw e.error}}}function Dp(n){var e,t=n.body,i=n.walls,r=n.zones,a=n.vx,s=n.vz,o=n.dots,c=o===void 0?15:o,l=Math.hypot(a,s);if(!Number.isFinite(l)||l<.35)return[];for(var h=Math.min(1,((e=t.maxSpeed)!==null&&e!==void 0?e:9)/l),f=Ws(Ws({},t),{vx:a*h,vy:0,vz:s*h,atRest:!1,captured:!1,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:t.x,y:t.y,z:t.z}}),d=i.map(function(v){return Ws(Ws({},v),{vx:0,vz:0})}),m=[f],y={bodies:m,walls:d,zones:r,dt:Lp},T=[],g=Math.max(18,c*6),p=0;p<g&&(Qh(y),p%6===0&&T.push({x:f.x,y:f.y,z:f.z}),!(f.atRest||f.captured));p++);return T}var fm=0,Fd=1,pm=2;var Ll=1,Mu=2,Mo=3,os=0,sr=1,vr=2,pa=0,So=1,Od=2,Bd=3,zd=4,mm=5;var Rs=100,vm=101,gm=102,ym=103,xm=104,_m=200,Mm=201,Sm=202,bm=203,kd=204,Vd=205,wm=206,Tm=207,Em=208,Am=209,Im=210,Cm=211,Rm=212,Pm=213,Lm=214,Oc=0,Bc=1,zc=2,oo=3,kc=4,Vc=5,Gc=6,Hc=7,Su=0,Nm=1,Dm=2,Kr=0,Gd=1,Hd=2,Wd=3,Xd=4,qd=5,Yd=6,Zd=7;var Jd=300,ls=301,Ps=302,bu=303,wu=304,Nl=306,Wc=1e3,oa=1001,Xc=1002,Fi=1003,Um=1004;var Dl=1005;var Vi=1006,Tu=1007;var cs=1008;var gr=1009,$d=1010,Kd=1011,bo=1012,Eu=1013,Qr=1014,Or=1015,jr=1016,Au=1017,Iu=1018,wo=1020,Qd=35902,jd=35899,ef=1021,tf=1022,Br=1023,la=1026,us=1027,Cu=1028,Ru=1029,hs=1030,Pu=1031;var Lu=1033,Ul=33776,Fl=33777,Ol=33778,Bl=33779,Nu=35840,Du=35841,Uu=35842,Fu=35843,Ou=36196,Bu=37492,zu=37496,ku=37488,Vu=37489,zl=37490,Gu=37491,Hu=37808,Wu=37809,Xu=37810,qu=37811,Yu=37812,Zu=37813,Ju=37814,$u=37815,Ku=37816,Qu=37817,ju=37818,eh=37819,th=37820,nh=37821,ih=36492,rh=36494,ah=36495,sh=36283,oh=36284,kl=36285,lh=36286;var rl=2300,qc=2301,Uc=2302,Td=2303,Ed=2400,Ad=2401,Id=2402;var Fm=3200;var ch=0,Om=1,Da="",ar="srgb",al="srgb-linear",sl="linear",Fn="srgb";var Fc=7680;var Bm=519,zm=512,km=513,Vm=514,uh=515,Gm=516,Hm=517,hh=518,Wm=519,Xm=35044;var nf="300 es",$r=2e3,lo=2001;function Hv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Wv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ol(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qm(){let n=ol("canvas");return n.style.display="block",n}var Up={},co=null;function rf(...n){let e="THREE."+n.shift();co?co("log",e,...n):console.log(e,...n)}function Ym(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Zt(...n){n=Ym(n);let e="THREE."+n.shift();if(co)co("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function $t(...n){n=Ym(n);let e="THREE."+n.shift();if(co)co("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Es(...n){let e=n.join(" ");e in Up||(Up[e]=!0,Zt(...n))}function Zm(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}var Jm={[Oc]:Bc,[zc]:Gc,[kc]:Hc,[oo]:Vc,[Bc]:Oc,[Gc]:zc,[Hc]:kc,[Vc]:oo},ca=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}},Ki=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var jh=Math.PI/180,Yc=180/Math.PI;function To(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ki[n&255]+Ki[n>>8&255]+Ki[n>>16&255]+Ki[n>>24&255]+"-"+Ki[e&255]+Ki[e>>8&255]+"-"+Ki[e>>16&15|64]+Ki[e>>24&255]+"-"+Ki[t&63|128]+Ki[t>>8&255]+"-"+Ki[t>>16&255]+Ki[t>>24&255]+Ki[i&255]+Ki[i>>8&255]+Ki[i>>16&255]+Ki[i>>24&255]).toLowerCase()}function xn(n,e,t){return Math.max(e,Math.min(t,n))}function Xv(n,e){return(n%e+e)%e}function ed(n,e,t){return(1-t)*n+t*e}function Zo(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var uf=class uf{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xn(this.x,e.x,t.x),this.y=xn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xn(this.x,e,t),this.y=xn(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(xn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(xn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uf.prototype.isVector2=!0;var At=uf,ua=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3],d=a[s+0],m=a[s+1],y=a[s+2],T=a[s+3];if(f!==T||c!==d||l!==m||h!==y){let g=c*d+l*m+h*y+f*T;g<0&&(d=-d,m=-m,y=-y,T=-T,g=-g);let p=1-o;if(g<.9995){let v=Math.acos(g),w=Math.sin(v);p=Math.sin(p*v)/w,o=Math.sin(o*v)/w,c=c*p+d*o,l=l*p+m*o,h=h*p+y*o,f=f*p+T*o}else{c=c*p+d*o,l=l*p+m*o,h=h*p+y*o,f=f*p+T*o;let v=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=v,l*=v,h*=v,f*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,s){let o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=a[s],d=a[s+1],m=a[s+2],y=a[s+3];return e[t]=o*y+h*f+c*m-l*d,e[t+1]=c*y+h*d+l*f-o*m,e[t+2]=l*y+h*m+o*d-c*f,e[t+3]=h*y-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(a/2),d=c(i/2),m=c(r/2),y=c(a/2);switch(s){case"XYZ":this._x=d*h*f+l*m*y,this._y=l*m*f-d*h*y,this._z=l*h*y+d*m*f,this._w=l*h*f-d*m*y;break;case"YXZ":this._x=d*h*f+l*m*y,this._y=l*m*f-d*h*y,this._z=l*h*y-d*m*f,this._w=l*h*f+d*m*y;break;case"ZXY":this._x=d*h*f-l*m*y,this._y=l*m*f+d*h*y,this._z=l*h*y+d*m*f,this._w=l*h*f-d*m*y;break;case"ZYX":this._x=d*h*f-l*m*y,this._y=l*m*f+d*h*y,this._z=l*h*y-d*m*f,this._w=l*h*f+d*m*y;break;case"YZX":this._x=d*h*f+l*m*y,this._y=l*m*f+d*h*y,this._z=l*h*y-d*m*f,this._w=l*h*f-d*m*y;break;case"XZY":this._x=d*h*f-l*m*y,this._y=l*m*f-d*h*y,this._z=l*h*y+d*m*f,this._w=l*h*f+d*m*y;break;default:Zt("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(a-l)*m,this._z=(s-r)*m}else if(i>o&&i>f){let m=2*Math.sqrt(1+i-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(a+l)/m}else if(o>f){let m=2*Math.sqrt(1+o-i-f);this._w=(a-l)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+f-i-o);this._w=(s-r)/m,this._x=(a+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xn(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+s*o+r*l-a*c,this._y=r*h+s*c+a*o-i*l,this._z=a*h+s*l+i*c-r*o,this._w=s*h-i*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},hf=class hf{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*i),h=2*(o*t-a*r),f=2*(a*i-s*t);return this.x=t+c*l+s*f-o*h,this.y=i+c*h+o*l-a*f,this.z=r+c*f+a*h-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xn(this.x,e.x,t.x),this.y=xn(this.y,e.y,t.y),this.z=xn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xn(this.x,e,t),this.y=xn(this.y,e,t),this.z=xn(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(xn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return td.copy(this).projectOnVector(e),this.sub(td)}reflect(e){return this.sub(td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(xn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hf.prototype.isVector3=!0;var he=hf,td=new he,Fp=new ua,df=class df{constructor(e,t,i,r,a,s,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l)}set(e,t,i,r,a,s,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=s,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],d=i[2],m=i[5],y=i[8],T=r[0],g=r[3],p=r[6],v=r[1],w=r[4],_=r[7],A=r[2],I=r[5],U=r[8];return a[0]=s*T+o*v+c*A,a[3]=s*g+o*w+c*I,a[6]=s*p+o*_+c*U,a[1]=l*T+h*v+f*A,a[4]=l*g+h*w+f*I,a[7]=l*p+h*_+f*U,a[2]=d*T+m*v+y*A,a[5]=d*g+m*w+y*I,a[8]=d*p+m*_+y*U,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*s*h-t*o*l-i*a*h+i*o*c+r*a*l-r*s*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*s-o*l,d=o*c-h*a,m=l*a-s*c,y=t*f+i*d+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/y;return e[0]=f*T,e[1]=(r*l-h*i)*T,e[2]=(o*i-r*s)*T,e[3]=d*T,e[4]=(h*t-r*c)*T,e[5]=(r*a-o*t)*T,e[6]=m*T,e[7]=(i*c-l*t)*T,e[8]=(s*t-i*a)*T,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){let c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return Es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nd.makeScale(e,t)),this}rotate(e){return Es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nd.makeRotation(-e)),this}translate(e,t){return Es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};df.prototype.isMatrix3=!0;var an=df,nd=new an,Op=new an().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bp=new an().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qv(){let n={enabled:!0,workingColorSpace:al,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===Fn&&(r.r=La(r.r),r.g=La(r.g),r.b=La(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Fn&&(r.r=ao(r.r),r.g=ao(r.g),r.b=ao(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Da?sl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[al]:{primaries:e,whitePoint:i,transfer:sl,toXYZ:Op,fromXYZ:Bp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ar},outputColorSpaceConfig:{drawingBufferColorSpace:ar}},[ar]:{primaries:e,whitePoint:i,transfer:Fn,toXYZ:Op,fromXYZ:Bp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ar}}}),n}var _n=qv();function La(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ao(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Xs,Zc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xs===void 0&&(Xs=ol("canvas")),Xs.width=e.width,Xs.height=e.height;let r=Xs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ol("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=La(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(La(t[i]/255)*255):t[i]=La(t[i]);return{data:t,width:e.width,height:e.height}}else return Zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Yv=0,uo=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=To(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(id(r[s].image)):a.push(id(r[s]))}else a=id(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function id(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Zt("Texture: Unable to serialize Texture."),{})}var Zv=0,rd=new he,er=class n extends ca{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=oa,r=oa,a=Vi,s=cs,o=Br,c=gr,l=n.DEFAULT_ANISOTROPY,h=Da){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zv++}),this.uuid=To(),this.name="",this.source=new uo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new an,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rd).x}get height(){return this.source.getSize(rd).y}get depth(){return this.source.getSize(rd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Zt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Zt(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wc:e.x=e.x-Math.floor(e.x);break;case oa:e.x=e.x<0?0:1;break;case Xc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wc:e.y=e.y-Math.floor(e.y);break;case oa:e.y=e.y<0?0:1;break;case Xc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};er.DEFAULT_IMAGE=null;er.DEFAULT_MAPPING=Jd;er.DEFAULT_ANISOTROPY=1;var ff=class ff{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a,c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],m=c[5],y=c[9],T=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-T)<.01&&Math.abs(y-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+T)<.1&&Math.abs(y+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,_=(m+1)/2,A=(p+1)/2,I=(h+d)/4,U=(f+T)/4,x=(y+g)/4;return w>_&&w>A?w<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(w),r=I/i,a=U/i):_>A?_<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(_),i=I/r,a=x/r):A<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(A),i=U/a,r=x/a),this.set(i,r,a,t),this}let v=Math.sqrt((g-y)*(g-y)+(f-T)*(f-T)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-y)/v,this.y=(f-T)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xn(this.x,e.x,t.x),this.y=xn(this.y,e.y,t.y),this.z=xn(this.z,e.z,t.z),this.w=xn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xn(this.x,e,t),this.y=xn(this.y,e,t),this.z=xn(this.z,e,t),this.w=xn(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(xn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ff.prototype.isVector4=!0;var ri=ff,Jc=class extends ca{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ri(0,0,e,t),this.scissorTest=!1,this.viewport=new ri(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new er(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Vi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new uo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mr=class extends Jc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ll=class extends er{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var $c=class extends er{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var _u=class _u{constructor(e,t,i,r,a,s,o,c,l,h,f,d,m,y,T,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l,h,f,d,m,y,T,g)}set(e,t,i,r,a,s,o,c,l,h,f,d,m,y,T,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=d,p[3]=m,p[7]=y,p[11]=T,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _u().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/qs.setFromMatrixColumn(e,0).length(),a=1/qs.setFromMatrixColumn(e,1).length(),s=1/qs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){let d=s*h,m=s*f,y=o*h,T=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=m+y*l,t[5]=d-T*l,t[9]=-o*c,t[2]=T-d*l,t[6]=y+m*l,t[10]=s*c}else if(e.order==="YXZ"){let d=c*h,m=c*f,y=l*h,T=l*f;t[0]=d+T*o,t[4]=y*o-m,t[8]=s*l,t[1]=s*f,t[5]=s*h,t[9]=-o,t[2]=m*o-y,t[6]=T+d*o,t[10]=s*c}else if(e.order==="ZXY"){let d=c*h,m=c*f,y=l*h,T=l*f;t[0]=d-T*o,t[4]=-s*f,t[8]=y+m*o,t[1]=m+y*o,t[5]=s*h,t[9]=T-d*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){let d=s*h,m=s*f,y=o*h,T=o*f;t[0]=c*h,t[4]=y*l-m,t[8]=d*l+T,t[1]=c*f,t[5]=T*l+d,t[9]=m*l-y,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){let d=s*c,m=s*l,y=o*c,T=o*l;t[0]=c*h,t[4]=T-d*f,t[8]=y*f+m,t[1]=f,t[5]=s*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*f+y,t[10]=d-T*f}else if(e.order==="XZY"){let d=s*c,m=s*l,y=o*c,T=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+T,t[5]=s*h,t[9]=m*f-y,t[2]=y*f-m,t[6]=o*h,t[10]=T*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jv,e,$v)}lookAt(e,t,i){let r=this.elements;return Sr.subVectors(e,t),Sr.lengthSq()===0&&(Sr.z=1),Sr.normalize(),Za.crossVectors(i,Sr),Za.lengthSq()===0&&(Math.abs(i.z)===1?Sr.x+=1e-4:Sr.z+=1e-4,Sr.normalize(),Za.crossVectors(i,Sr)),Za.normalize(),fc.crossVectors(Sr,Za),r[0]=Za.x,r[4]=fc.x,r[8]=Sr.x,r[1]=Za.y,r[5]=fc.y,r[9]=Sr.y,r[2]=Za.z,r[6]=fc.z,r[10]=Sr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],d=i[9],m=i[13],y=i[2],T=i[6],g=i[10],p=i[14],v=i[3],w=i[7],_=i[11],A=i[15],I=r[0],U=r[4],x=r[8],L=r[12],k=r[1],V=r[5],Y=r[9],E=r[13],S=r[2],B=r[6],z=r[10],K=r[14],W=r[3],O=r[7],ne=r[11],ae=r[15];return a[0]=s*I+o*k+c*S+l*W,a[4]=s*U+o*V+c*B+l*O,a[8]=s*x+o*Y+c*z+l*ne,a[12]=s*L+o*E+c*K+l*ae,a[1]=h*I+f*k+d*S+m*W,a[5]=h*U+f*V+d*B+m*O,a[9]=h*x+f*Y+d*z+m*ne,a[13]=h*L+f*E+d*K+m*ae,a[2]=y*I+T*k+g*S+p*W,a[6]=y*U+T*V+g*B+p*O,a[10]=y*x+T*Y+g*z+p*ne,a[14]=y*L+T*E+g*K+p*ae,a[3]=v*I+w*k+_*S+A*W,a[7]=v*U+w*V+_*B+A*O,a[11]=v*x+w*Y+_*z+A*ne,a[15]=v*L+w*E+_*K+A*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],m=e[14],y=e[3],T=e[7],g=e[11],p=e[15],v=c*m-l*d,w=o*m-l*f,_=o*d-c*f,A=s*m-l*h,I=s*d-c*h,U=s*f-o*h;return t*(T*v-g*w+p*_)-i*(y*v-g*A+p*I)+r*(y*w-T*A+p*U)-a*(y*_-T*I+g*U)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(s*h-o*l)-i*(a*h-o*c)+r*(a*l-s*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],m=e[11],y=e[12],T=e[13],g=e[14],p=e[15],v=t*o-i*s,w=t*c-r*s,_=t*l-a*s,A=i*c-r*o,I=i*l-a*o,U=r*l-a*c,x=h*T-f*y,L=h*g-d*y,k=h*p-m*y,V=f*g-d*T,Y=f*p-m*T,E=d*p-m*g,S=v*E-w*Y+_*V+A*k-I*L+U*x;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/S;return e[0]=(o*E-c*Y+l*V)*B,e[1]=(r*Y-i*E-a*V)*B,e[2]=(T*U-g*I+p*A)*B,e[3]=(d*I-f*U-m*A)*B,e[4]=(c*k-s*E-l*L)*B,e[5]=(t*E-r*k+a*L)*B,e[6]=(g*_-y*U-p*w)*B,e[7]=(h*U-d*_+m*w)*B,e[8]=(s*Y-o*k+l*x)*B,e[9]=(i*k-t*Y-a*x)*B,e[10]=(y*I-T*_+p*v)*B,e[11]=(f*_-h*I-m*v)*B,e[12]=(o*L-s*V-c*x)*B,e[13]=(t*V-i*L+r*x)*B,e[14]=(T*w-y*A-g*v)*B,e[15]=(h*A-f*w+d*v)*B,this}scale(e){let t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,l=a*s,h=a*o;return this.set(l*s+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*s,0,l*c-r*o,h*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,h=s+s,f=o+o,d=a*l,m=a*h,y=a*f,T=s*h,g=s*f,p=o*f,v=c*l,w=c*h,_=c*f,A=i.x,I=i.y,U=i.z;return r[0]=(1-(T+p))*A,r[1]=(m+_)*A,r[2]=(y-w)*A,r[3]=0,r[4]=(m-_)*I,r[5]=(1-(d+p))*I,r[6]=(g+v)*I,r[7]=0,r[8]=(y+w)*U,r[9]=(g-v)*U,r[10]=(1-(d+T))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=qs.set(r[0],r[1],r[2]).length(),o=qs.set(r[4],r[5],r[6]).length(),c=qs.set(r[8],r[9],r[10]).length();a<0&&(s=-s),Yr.copy(this);let l=1/s,h=1/o,f=1/c;return Yr.elements[0]*=l,Yr.elements[1]*=l,Yr.elements[2]*=l,Yr.elements[4]*=h,Yr.elements[5]*=h,Yr.elements[6]*=h,Yr.elements[8]*=f,Yr.elements[9]*=f,Yr.elements[10]*=f,t.setFromRotationMatrix(Yr),i.x=s,i.y=o,i.z=c,this}makePerspective(e,t,i,r,a,s,o=$r,c=!1){let l=this.elements,h=2*a/(t-e),f=2*a/(i-r),d=(t+e)/(t-e),m=(i+r)/(i-r),y,T;if(c)y=a/(s-a),T=s*a/(s-a);else if(o===$r)y=-(s+a)/(s-a),T=-2*s*a/(s-a);else if(o===lo)y=-s/(s-a),T=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=y,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=$r,c=!1){let l=this.elements,h=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),m=-(i+r)/(i-r),y,T;if(c)y=1/(s-a),T=s/(s-a);else if(o===$r)y=-2/(s-a),T=-(s+a)/(s-a);else if(o===lo)y=-1/(s-a),T=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=y,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};_u.prototype.isMatrix4=!0;var On=_u,qs=new he,Yr=new On,Jv=new he(0,0,0),$v=new he(1,1,1),Za=new he,fc=new he,Sr=new he,zp=new On,kp=new ua,Na=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(xn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-xn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(xn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-xn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(xn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-xn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kp.setFromEuler(this),this.setFromQuaternion(kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Na.DEFAULT_ORDER="XYZ";var ho=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Kv=0,Vp=new he,Ys=new ua,Aa=new On,pc=new he,Jo=new he,Qv=new he,jv=new ua,Gp=new he(1,0,0),Hp=new he(0,1,0),Wp=new he(0,0,1),Xp={type:"added"},eg={type:"removed"},Zs={type:"childadded",child:null},ad={type:"childremoved",child:null},tr=class n extends ca{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kv++}),this.uuid=To(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new he,t=new Na,i=new ua,r=new he(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new On},normalMatrix:{value:new an}}),this.matrix=new On,this.matrixWorld=new On,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ho,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Gp,e)}rotateY(e){return this.rotateOnAxis(Hp,e)}rotateZ(e){return this.rotateOnAxis(Wp,e)}translateOnAxis(e,t){return Vp.copy(e).applyQuaternion(this.quaternion),this.position.add(Vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gp,e)}translateY(e){return this.translateOnAxis(Hp,e)}translateZ(e){return this.translateOnAxis(Wp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Aa.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?pc.copy(e):pc.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Jo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Aa.lookAt(Jo,pc,this.up):Aa.lookAt(pc,Jo,this.up),this.quaternion.setFromRotationMatrix(Aa),r&&(Aa.extractRotation(r.matrixWorld),Ys.setFromRotationMatrix(Aa),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xp),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eg),ad.child=e,this.dispatchEvent(ad),ad.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Aa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Aa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Aa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xp),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,e,Qv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,jv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){let o=s(e.geometries),c=s(e.materials),l=s(e.textures),h=s(e.images),f=s(e.shapes),d=s(e.skeletons),m=s(e.animations),y=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=r,i;function s(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};tr.DEFAULT_UP=new he(0,1,0);tr.DEFAULT_MATRIX_AUTO_UPDATE=!0;tr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pr=class extends tr{constructor(){super(),this.isGroup=!0,this.type="Group"}},tg={type:"move"},fo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new he,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new he),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new he,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new he,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let T of e.hand.values()){let g=t.getJointPose(T,i),p=this._getHandJoint(l,T);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),m=.02,y=.005;l.inputState.pinching&&d>m+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new pr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},$m={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ja={h:0,s:0,l:0},mc={h:0,s:0,l:0};function sd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var un=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ar){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_n.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=_n.workingColorSpace){return this.r=e,this.g=t,this.b=i,_n.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=_n.workingColorSpace){if(e=Xv(e,1),t=xn(t,0,1),i=xn(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=sd(s,a,e+1/3),this.g=sd(s,a,e),this.b=sd(s,a,e-1/3)}return _n.colorSpaceToWorking(this,r),this}setStyle(e,t=ar){function i(a){a!==void 0&&parseFloat(a)<1&&Zt("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Zt("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Zt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ar){let i=$m[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Zt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=La(e.r),this.g=La(e.g),this.b=La(e.b),this}copyLinearToSRGB(e){return this.r=ao(e.r),this.g=ao(e.g),this.b=ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ar){return _n.workingToColorSpace(Qi.copy(this),e),Math.round(xn(Qi.r*255,0,255))*65536+Math.round(xn(Qi.g*255,0,255))*256+Math.round(xn(Qi.b*255,0,255))}getHexString(e=ar){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_n.workingColorSpace){_n.workingToColorSpace(Qi.copy(this),t);let i=Qi.r,r=Qi.g,a=Qi.b,s=Math.max(i,r,a),o=Math.min(i,r,a),c,l,h=(o+s)/2;if(o===s)c=0,l=0;else{let f=s-o;switch(l=h<=.5?f/(s+o):f/(2-s-o),s){case i:c=(r-a)/f+(r<a?6:0);break;case r:c=(a-i)/f+2;break;case a:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=_n.workingColorSpace){return _n.workingToColorSpace(Qi.copy(this),t),e.r=Qi.r,e.g=Qi.g,e.b=Qi.b,e}getStyle(e=ar){_n.workingToColorSpace(Qi.copy(this),e);let t=Qi.r,i=Qi.g,r=Qi.b;return e!==ar?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ja),this.setHSL(Ja.h+e,Ja.s+t,Ja.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ja),e.getHSL(mc);let i=ed(Ja.h,mc.h,t),r=ed(Ja.s,mc.s,t),a=ed(Ja.l,mc.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qi=new un;un.NAMES=$m;var cl=class extends tr{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Na,this.environmentIntensity=1,this.environmentRotation=new Na,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Zr=new he,Ia=new he,od=new he,Ca=new he,Js=new he,$s=new he,qp=new he,ld=new he,cd=new he,ud=new he,hd=new ri,dd=new ri,fd=new ri,ja=class n{constructor(e=new he,t=new he,i=new he){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zr.subVectors(e,t),r.cross(Zr);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Zr.subVectors(r,t),Ia.subVectors(i,t),od.subVectors(e,t);let s=Zr.dot(Zr),o=Zr.dot(Ia),c=Zr.dot(od),l=Ia.dot(Ia),h=Ia.dot(od),f=s*l-o*o;if(f===0)return a.set(0,0,0),null;let d=1/f,m=(l*c-o*h)*d,y=(s*h-o*c)*d;return a.set(1-m-y,y,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ca)===null?!1:Ca.x>=0&&Ca.y>=0&&Ca.x+Ca.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,Ca)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Ca.x),c.addScaledVector(s,Ca.y),c.addScaledVector(o,Ca.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return hd.setScalar(0),dd.setScalar(0),fd.setScalar(0),hd.fromBufferAttribute(e,t),dd.fromBufferAttribute(e,i),fd.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(hd,a.x),s.addScaledVector(dd,a.y),s.addScaledVector(fd,a.z),s}static isFrontFacing(e,t,i,r){return Zr.subVectors(i,t),Ia.subVectors(e,t),Zr.cross(Ia).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zr.subVectors(this.c,this.b),Ia.subVectors(this.a,this.b),Zr.cross(Ia).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,a=this.c,s,o;Js.subVectors(r,i),$s.subVectors(a,i),ld.subVectors(e,i);let c=Js.dot(ld),l=$s.dot(ld);if(c<=0&&l<=0)return t.copy(i);cd.subVectors(e,r);let h=Js.dot(cd),f=$s.dot(cd);if(h>=0&&f<=h)return t.copy(r);let d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return s=c/(c-h),t.copy(i).addScaledVector(Js,s);ud.subVectors(e,a);let m=Js.dot(ud),y=$s.dot(ud);if(y>=0&&m<=y)return t.copy(a);let T=m*l-c*y;if(T<=0&&l>=0&&y<=0)return o=l/(l-y),t.copy(i).addScaledVector($s,o);let g=h*y-m*f;if(g<=0&&f-h>=0&&m-y>=0)return qp.subVectors(a,r),o=(f-h)/(f-h+(m-y)),t.copy(r).addScaledVector(qp,o);let p=1/(g+T+d);return s=T*p,o=d*p,t.copy(i).addScaledVector(Js,s).addScaledVector($s,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ha=class{constructor(e=new he(1/0,1/0,1/0),t=new he(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Jr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Jr):Jr.fromBufferAttribute(a,s),Jr.applyMatrix4(e.matrixWorld),this.expandByPoint(Jr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vc.copy(i.boundingBox)),vc.applyMatrix4(e.matrixWorld),this.union(vc)}let r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jr),Jr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($o),gc.subVectors(this.max,$o),Ks.subVectors(e.a,$o),Qs.subVectors(e.b,$o),js.subVectors(e.c,$o),$a.subVectors(Qs,Ks),Ka.subVectors(js,Qs),Ss.subVectors(Ks,js);let t=[0,-$a.z,$a.y,0,-Ka.z,Ka.y,0,-Ss.z,Ss.y,$a.z,0,-$a.x,Ka.z,0,-Ka.x,Ss.z,0,-Ss.x,-$a.y,$a.x,0,-Ka.y,Ka.x,0,-Ss.y,Ss.x,0];return!pd(t,Ks,Qs,js,gc)||(t=[1,0,0,0,1,0,0,0,1],!pd(t,Ks,Qs,js,gc))?!1:(yc.crossVectors($a,Ka),t=[yc.x,yc.y,yc.z],pd(t,Ks,Qs,js,gc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ra),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ra=[new he,new he,new he,new he,new he,new he,new he,new he],Jr=new he,vc=new ha,Ks=new he,Qs=new he,js=new he,$a=new he,Ka=new he,Ss=new he,$o=new he,gc=new he,yc=new he,bs=new he;function pd(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){bs.fromArray(n,a);let o=r.x*Math.abs(bs.x)+r.y*Math.abs(bs.y)+r.z*Math.abs(bs.z),c=e.dot(bs),l=t.dot(bs),h=i.dot(bs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var wi=new he,xc=new At,ng=0,Tr=class extends ca{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ng++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xm,this.updateRanges=[],this.gpuType=Or,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xc.fromBufferAttribute(this,t),xc.applyMatrix3(e),this.setXY(t,xc.x,xc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wi.fromBufferAttribute(this,t),wi.applyMatrix3(e),this.setXYZ(t,wi.x,wi.y,wi.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wi.fromBufferAttribute(this,t),wi.applyMatrix4(e),this.setXYZ(t,wi.x,wi.y,wi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wi.fromBufferAttribute(this,t),wi.applyNormalMatrix(e),this.setXYZ(t,wi.x,wi.y,wi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wi.fromBufferAttribute(this,t),wi.transformDirection(e),this.setXYZ(t,wi.x,wi.y,wi.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zo(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=fr(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zo(t,this.array)),t}setX(e,t){return this.normalized&&(t=fr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zo(t,this.array)),t}setY(e,t){return this.normalized&&(t=fr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zo(t,this.array)),t}setW(e,t){return this.normalized&&(t=fr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=fr(t,this.array),i=fr(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=fr(t,this.array),i=fr(i,this.array),r=fr(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=fr(t,this.array),i=fr(i,this.array),r=fr(r,this.array),a=fr(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ul=class extends Tr{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var hl=class extends Tr{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ln=class extends Tr{constructor(e,t,i){super(new Float32Array(e),t,i)}},ig=new ha,Ko=new he,md=new he,es=class{constructor(e=new he,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):ig.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ko.subVectors(e,this.center);let t=Ko.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ko,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(md.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ko.copy(e.center).add(md)),this.expandByPoint(Ko.copy(e.center).sub(md))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},rg=0,Fr=new On,vd=new tr,eo=new he,br=new ha,Qo=new ha,Ui=new he,Gi=class n extends ca{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=To(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hv(e)?hl:ul)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new an().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Fr.makeRotationFromQuaternion(e),this.applyMatrix4(Fr),this}rotateX(e){return Fr.makeRotationX(e),this.applyMatrix4(Fr),this}rotateY(e){return Fr.makeRotationY(e),this.applyMatrix4(Fr),this}rotateZ(e){return Fr.makeRotationZ(e),this.applyMatrix4(Fr),this}translate(e,t,i){return Fr.makeTranslation(e,t,i),this.applyMatrix4(Fr),this}scale(e,t,i){return Fr.makeScale(e,t,i),this.applyMatrix4(Fr),this}lookAt(e){return vd.lookAt(e),vd.updateMatrix(),this.applyMatrix4(vd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(eo).negate(),this.translate(eo.x,eo.y,eo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,a=e.length;r<a;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ln(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ha);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new he(-1/0,-1/0,-1/0),new he(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let a=t[i];br.setFromBufferAttribute(a),this.morphTargetsRelative?(Ui.addVectors(this.boundingBox.min,br.min),this.boundingBox.expandByPoint(Ui),Ui.addVectors(this.boundingBox.max,br.max),this.boundingBox.expandByPoint(Ui)):(this.boundingBox.expandByPoint(br.min),this.boundingBox.expandByPoint(br.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new es);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new he,1/0);return}if(e){let i=this.boundingSphere.center;if(br.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){let o=t[a];Qo.setFromBufferAttribute(o),this.morphTargetsRelative?(Ui.addVectors(br.min,Qo.min),br.expandByPoint(Ui),Ui.addVectors(br.max,Qo.max),br.expandByPoint(Ui)):(br.expandByPoint(Qo.min),br.expandByPoint(Qo.max))}br.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Ui.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Ui));if(t)for(let a=0,s=t.length;a<s;a++){let o=t[a],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ui.fromBufferAttribute(o,l),c&&(eo.fromBufferAttribute(e,l),Ui.add(eo)),r=Math.max(r,i.distanceToSquared(Ui))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,a=t.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new Tr(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new he,c[x]=new he;let l=new he,h=new he,f=new he,d=new At,m=new At,y=new At,T=new he,g=new he;function p(x,L,k){l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,L),f.fromBufferAttribute(i,k),d.fromBufferAttribute(a,x),m.fromBufferAttribute(a,L),y.fromBufferAttribute(a,k),h.sub(l),f.sub(l),m.sub(d),y.sub(d);let V=1/(m.x*y.y-y.x*m.y);isFinite(V)&&(T.copy(h).multiplyScalar(y.y).addScaledVector(f,-m.y).multiplyScalar(V),g.copy(f).multiplyScalar(m.x).addScaledVector(h,-y.x).multiplyScalar(V),o[x].add(T),o[L].add(T),o[k].add(T),c[x].add(g),c[L].add(g),c[k].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,L=v.length;x<L;++x){let k=v[x],V=k.start,Y=k.count;for(let E=V,S=V+Y;E<S;E+=3)p(e.getX(E+0),e.getX(E+1),e.getX(E+2))}let w=new he,_=new he,A=new he,I=new he;function U(x){A.fromBufferAttribute(r,x),I.copy(A);let L=o[x];w.copy(L),w.sub(A.multiplyScalar(A.dot(L))).normalize(),_.crossVectors(I,L);let V=_.dot(c[x])<0?-1:1;s.setXYZW(x,w.x,w.y,w.z,V)}for(let x=0,L=v.length;x<L;++x){let k=v[x],V=k.start,Y=k.count;for(let E=V,S=V+Y;E<S;E+=3)U(e.getX(E+0)),U(e.getX(E+1)),U(e.getX(E+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Tr(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);let r=new he,a=new he,s=new he,o=new he,c=new he,l=new he,h=new he,f=new he;if(e)for(let d=0,m=e.count;d<m;d+=3){let y=e.getX(d+0),T=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,T),s.fromBufferAttribute(t,g),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),o.fromBufferAttribute(i,y),c.fromBufferAttribute(i,T),l.fromBufferAttribute(i,g),o.add(h),c.add(h),l.add(h),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(T,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ui.fromBufferAttribute(e,t),Ui.normalize(),e.setXYZ(t,Ui.x,Ui.y,Ui.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,d=new l.constructor(c.length*h),m=0,y=0;for(let T=0,g=c.length;T<g;T++){o.isInterleavedBufferAttribute?m=c[T]*o.data.stride+o.offset:m=c[T]*h;for(let p=0;p<h;p++)d[y++]=l[m++]}return new Tr(d,h,f)}if(this.index===null)return Zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=e(c,i);t.setAttribute(o,l)}let a=this.morphAttributes;for(let o in a){let c=[],l=a[o];for(let h=0,f=l.length;h<f;h++){let d=l[h],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,c=s.length;o<c;o++){let l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},a=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){let m=l[f];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let a=e.morphAttributes;for(let l in a){let h=[],f=a[l];for(let d=0,m=f.length;d<m;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,h=s.length;l<h;l++){let f=s[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var gd=new he,ag=new he,sg=new an,wr=class{constructor(e=new he(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=gd.subVectors(i,t).cross(ag.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(gd),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||sg.getNormalMatrix(e),r=this.coplanarPoint(gd).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},og=0,ts=class extends ca{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=To(),this.name="",this.type="Material",this.blending=So,this.side=os,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kd,this.blendDst=Vd,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new un(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fc,this.stencilZFail=Fc,this.stencilZPass=Fc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Zt(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Zt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let s=[];for(let o in a){let c=a[o];delete c.metadata,s.push(c)}return s}if(t){let a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new un().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new wr().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new At().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new At().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Pa=new he,yd=new he,_c=new he,Mc=new he,dl=class{constructor(e=new he,t=new he(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pa)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pa.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pa.copy(this.origin).addScaledVector(this.direction,t),Pa.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){yd.copy(e).add(t).multiplyScalar(.5),_c.copy(t).sub(e).normalize(),Mc.copy(this.origin).sub(yd);let a=e.distanceTo(t)*.5,s=-this.direction.dot(_c),o=Mc.dot(this.direction),c=-Mc.dot(_c),l=Mc.lengthSq(),h=Math.abs(1-s*s),f,d,m,y;if(h>0)if(f=s*c-o,d=s*o-c,y=a*h,f>=0)if(d>=-y)if(d<=y){let T=1/h;f*=T,d*=T,m=f*(f+s*d+2*o)+d*(s*f+d+2*c)+l}else d=a,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*c)+l;else d=-a,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-y?(f=Math.max(0,-(-s*a+o)),d=f>0?-a:Math.min(Math.max(-a,-c),a),m=-f*f+d*(d+2*c)+l):d<=y?(f=0,d=Math.min(Math.max(-a,-c),a),m=d*(d+2*c)+l):(f=Math.max(0,-(s*a+o)),d=f>0?a:Math.min(Math.max(-a,-c),a),m=-f*f+d*(d+2*c)+l);else d=s>0?-a:a,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(yd).addScaledVector(_c,d),m}intersectSphere(e,t){if(e.radius<0)return null;Pa.subVectors(e.center,this.origin);let i=Pa.dot(this.direction),r=Pa.dot(Pa)-i*i,a=e.radius*e.radius;if(r>a)return null;let s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(a=(e.min.y-d.y)*h,s=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,s=(e.min.y-d.y)*h),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pa)!==null}intersectTriangle(e,t,i,r,a){let s=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-s.x,d=e.y-s.y,m=e.z-s.z,y=t.x-s.x,T=t.y-s.y,g=t.z-s.z,p=i.x-s.x,v=i.y-s.y,w=i.z-s.z,_=Math.abs(c),A=Math.abs(l),I=Math.abs(h),U,x,L,k,V,Y,E,S,B,z,K,W;if(_>=A&&_>=I?(L=c,Y=f,B=y,W=p,c>=0?(U=l,x=h,k=d,V=m,E=T,S=g,z=v,K=w):(U=h,x=l,k=m,V=d,E=g,S=T,z=w,K=v)):A>=I?(L=l,Y=d,B=T,W=v,l>=0?(U=h,x=c,k=m,V=f,E=g,S=y,z=w,K=p):(U=c,x=h,k=f,V=m,E=y,S=g,z=p,K=w)):(L=h,Y=m,B=g,W=w,h>=0?(U=c,x=l,k=f,V=d,E=y,S=T,z=p,K=v):(U=l,x=c,k=d,V=f,E=T,S=y,z=v,K=p)),L===0)return null;let O=U/L,ne=x/L,ae=1/L,xe=k-O*Y,be=V-ne*Y,fe=E-O*B,Ie=S-ne*B,De=z-O*W,re=K-ne*W,le=De*Ie-re*fe,Re=xe*re-be*De,ze=fe*be-Ie*xe;if(r){if(le<0||Re<0||ze<0)return null}else if((le<0||Re<0||ze<0)&&(le>0||Re>0||ze>0))return null;let Fe=le+Re+ze;if(Fe===0)return null;let ft=ae*(le*Y+Re*B+ze*W);return(Fe>0?ft<0:ft>0)?null:this.at(ft/Fe,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},da=class extends ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new un(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Na,this.combine=Su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yp=new On,ws=new dl,Sc=new es,Zp=new he,bc=new he,wc=new he,Tc=new he,xd=new he,Ec=new he,Jp=new he,Ac=new he,Vn=class extends tr{constructor(e=new Gi,t=new da){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){let o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(a&&o){Ec.set(0,0,0);for(let c=0,l=a.length;c<l;c++){let h=o[c],f=a[c];h!==0&&(xd.fromBufferAttribute(f,e),s?Ec.addScaledVector(xd,h):Ec.addScaledVector(xd.sub(t),h))}t.add(Ec)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sc.copy(i.boundingSphere),Sc.applyMatrix4(a),ws.copy(e.ray).recast(e.near),!(Sc.containsPoint(ws.origin)===!1&&(ws.intersectSphere(Sc,Zp)===null||ws.origin.distanceToSquared(Zp)>(e.far-e.near)**2))&&(Yp.copy(a).invert(),ws.copy(e.ray).applyMatrix4(Yp),!(i.boundingBox!==null&&ws.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ws)))}_computeIntersections(e,t,i){let r,a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,d=a.groups,m=a.drawRange;if(o!==null)if(Array.isArray(s))for(let y=0,T=d.length;y<T;y++){let g=d[y],p=s[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,A=w;_<A;_+=3){let I=o.getX(_),U=o.getX(_+1),x=o.getX(_+2);r=Ic(this,p,e,i,l,h,f,I,U,x),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,m.start),T=Math.min(o.count,m.start+m.count);for(let g=y,p=T;g<p;g+=3){let v=o.getX(g),w=o.getX(g+1),_=o.getX(g+2);r=Ic(this,s,e,i,l,h,f,v,w,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let y=0,T=d.length;y<T;y++){let g=d[y],p=s[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,A=w;_<A;_+=3){let I=_,U=_+1,x=_+2;r=Ic(this,p,e,i,l,h,f,I,U,x),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,m.start),T=Math.min(c.count,m.start+m.count);for(let g=y,p=T;g<p;g+=3){let v=g,w=g+1,_=g+2;r=Ic(this,s,e,i,l,h,f,v,w,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function lg(n,e,t,i,r,a,s,o){let c;if(e.side===sr?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===os,o),c===null)return null;Ac.copy(o),Ac.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Ac);return l<t.near||l>t.far?null:{distance:l,point:Ac.clone(),object:n}}function Ic(n,e,t,i,r,a,s,o,c,l){n.getVertexPosition(o,bc),n.getVertexPosition(c,wc),n.getVertexPosition(l,Tc);let h=lg(n,e,t,i,bc,wc,Tc,Jp);if(h){let f=new he;ja.getBarycoord(Jp,bc,wc,Tc,f),r&&(h.uv=ja.getInterpolatedAttribute(r,o,c,l,f,new At)),a&&(h.uv1=ja.getInterpolatedAttribute(a,o,c,l,f,new At)),s&&(h.normal=ja.getInterpolatedAttribute(s,o,c,l,f,new he),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new he,materialIndex:0};ja.getNormal(bc,wc,Tc,d.normal),h.face=d,h.barycoord=f}return h}var fl=class extends er{constructor(e=null,t=1,i=1,r,a,s,o,c,l=Fi,h=Fi,f,d){super(null,s,o,c,l,h,r,a,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pl=class extends Tr{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},to=new On,$p=new On,Cc=[],Kp=new ha,cg=new On,jo=new Vn,el=new es,fa=class extends Vn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new pl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,cg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ha),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,to),Kp.copy(e.boundingBox).applyMatrix4(to),this.boundingBox.union(Kp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new es),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,to),el.copy(e.boundingSphere).applyMatrix4(to),this.boundingSphere.union(el)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(jo.geometry=this.geometry,jo.material=this.material,jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),el.copy(this.boundingSphere),el.applyMatrix4(i),e.ray.intersectsSphere(el)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,to),$p.multiplyMatrices(i,to),jo.matrixWorld=$p,jo.raycast(e,Cc);for(let s=0,o=Cc.length;s<o;s++){let c=Cc[s];c.instanceId=a,c.object=this,t.push(c)}Cc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new pl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new fl(new Float32Array(r*this.count),r,this.count,Cu,Or));let a=this.morphTexture.source.data.data,s=0;for(let l=0;l<i.length;l++)s+=i[l];let o=this.geometry.morphTargetsRelative?1:1-s,c=r*e;return a[c]=o,a.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ts=new es,ug=new At(.5,.5),Rc=new he,po=class{constructor(e=new wr,t=new wr,i=new wr,r=new wr,a=new wr,s=new wr){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=$r,i=!1){let r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],h=a[4],f=a[5],d=a[6],m=a[7],y=a[8],T=a[9],g=a[10],p=a[11],v=a[12],w=a[13],_=a[14],A=a[15];if(r[0].setComponents(l-s,m-h,p-y,A-v).normalize(),r[1].setComponents(l+s,m+h,p+y,A+v).normalize(),r[2].setComponents(l+o,m+f,p+T,A+w).normalize(),r[3].setComponents(l-o,m-f,p-T,A-w).normalize(),i)r[4].setComponents(c,d,g,_).normalize(),r[5].setComponents(l-c,m-d,p-g,A-_).normalize();else if(r[4].setComponents(l-c,m-d,p-g,A-_).normalize(),t===$r)r[5].setComponents(l+c,m+d,p+g,A+_).normalize();else if(t===lo)r[5].setComponents(c,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(e){Ts.center.set(0,0,0);let t=ug.distanceTo(e.center);return Ts.radius=.7071067811865476+t,Ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Rc.x=r.normal.x>0?e.max.x:e.min.x,Rc.y=r.normal.y>0?e.max.y:e.min.y,Rc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Rc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ml=class extends er{constructor(e=[],t=ls,i,r,a,s,o,c,l,h){super(e,t,i,r,a,s,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ns=class extends er{constructor(e,t,i=Qr,r,a,s,o=Fi,c=Fi,l,h=la,f=1){if(h!==la&&h!==us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,r,a,s,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new uo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Kc=class extends ns{constructor(e,t=Qr,i=ls,r,a,s=Fi,o=Fi,c,l=la){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,a,s,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},vl=class extends er{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Er=class n extends Gi{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};let o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);let c=[],l=[],h=[],f=[],d=0,m=0;y("z","y","x",-1,-1,i,t,e,s,a,0),y("z","y","x",1,-1,i,t,-e,s,a,1),y("x","z","y",1,1,e,i,t,r,s,2),y("x","z","y",1,-1,e,i,-t,r,s,3),y("x","y","z",1,-1,e,t,i,r,a,4),y("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Ln(l,3)),this.setAttribute("normal",new Ln(h,3)),this.setAttribute("uv",new Ln(f,2));function y(T,g,p,v,w,_,A,I,U,x,L){let k=_/U,V=A/x,Y=_/2,E=A/2,S=I/2,B=U+1,z=x+1,K=0,W=0,O=new he;for(let ne=0;ne<z;ne++){let ae=ne*V-E;for(let xe=0;xe<B;xe++){let be=xe*k-Y;O[T]=be*v,O[g]=ae*w,O[p]=S,l.push(O.x,O.y,O.z),O[T]=0,O[g]=0,O[p]=I>0?1:-1,h.push(O.x,O.y,O.z),f.push(xe/U),f.push(1-ne/x),K+=1}}for(let ne=0;ne<x;ne++)for(let ae=0;ae<U;ae++){let xe=d+ae+B*ne,be=d+ae+B*(ne+1),fe=d+(ae+1)+B*(ne+1),Ie=d+(ae+1)+B*ne;c.push(xe,be,Ie),c.push(be,fe,Ie),W+=6}o.addGroup(m,W,L),m+=W,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var mo=class n extends Gi{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let a=[],s=[],o=[],c=[],l=new he,h=new At;s.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){let m=i+f/t*r;l.x=e*Math.cos(m),l.y=e*Math.sin(m),s.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(s[d]/e+1)/2,h.y=(s[d+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)a.push(f,f+1,0);this.setIndex(a),this.setAttribute("position",new Ln(s,3)),this.setAttribute("normal",new Ln(o,3)),this.setAttribute("uv",new Ln(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},As=class n extends Gi{constructor(e=1,t=1,i=1,r=32,a=1,s=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),a=Math.floor(a);let h=[],f=[],d=[],m=[],y=0,T=[],g=i/2,p=0;v(),s===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Ln(f,3)),this.setAttribute("normal",new Ln(d,3)),this.setAttribute("uv",new Ln(m,2));function v(){let _=new he,A=new he,I=0,U=(t-e)/i;for(let x=0;x<=a;x++){let L=[],k=x/a,V=k*(t-e)+e;for(let Y=0;Y<=r;Y++){let E=Y/r,S=E*c+o,B=Math.sin(S),z=Math.cos(S);A.x=V*B,A.y=-k*i+g,A.z=V*z,f.push(A.x,A.y,A.z),_.set(B,U,z).normalize(),d.push(_.x,_.y,_.z),m.push(E,1-k),L.push(y++)}T.push(L)}for(let x=0;x<r;x++)for(let L=0;L<a;L++){let k=T[L][x],V=T[L+1][x],Y=T[L+1][x+1],E=T[L][x+1];(e>0||L!==0)&&(h.push(k,V,E),I+=3),(t>0||L!==a-1)&&(h.push(V,Y,E),I+=3)}l.addGroup(p,I,0),p+=I}function w(_){let A=y,I=new At,U=new he,x=0,L=_===!0?e:t,k=_===!0?1:-1;for(let Y=1;Y<=r;Y++)f.push(0,g*k,0),d.push(0,k,0),m.push(.5,.5),y++;let V=y;for(let Y=0;Y<=r;Y++){let S=Y/r*c+o,B=Math.cos(S),z=Math.sin(S);U.x=L*z,U.y=g*k,U.z=L*B,f.push(U.x,U.y,U.z),d.push(0,k,0),I.x=B*.5+.5,I.y=z*.5*k+.5,m.push(I.x,I.y),y++}for(let Y=0;Y<r;Y++){let E=A+Y,S=V+Y;_===!0?h.push(S,S+1,E):h.push(S+1,S,E),x+=3}l.addGroup(p,x,_===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ar=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Zt("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,s;t?s=t:s=e*i[a-1];let o=0,c=a-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-s,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===s)return r/(a-1);let h=i[r],d=i[r+1]-h,m=(s-h)/d;return(r+m)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);let s=this.getPoint(r),o=this.getPoint(a),c=t||(s.isVector2?new At:new he);return c.copy(o).sub(s).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new he,r=[],a=[],s=[],o=new he,c=new On;for(let m=0;m<=e;m++){let y=m/e;r[m]=this.getTangentAt(y,new he)}a[0]=new he,s[0]=new he;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),d<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let m=1;m<=e;m++){if(a[m]=a[m-1].clone(),s[m]=s[m-1].clone(),o.crossVectors(r[m-1],r[m]),o.length()>Number.EPSILON){o.normalize();let y=Math.acos(xn(r[m-1].dot(r[m]),-1,1));a[m].applyMatrix4(c.makeRotationAxis(o,y))}s[m].crossVectors(r[m],a[m])}if(t===!0){let m=Math.acos(xn(a[0].dot(a[e]),-1,1));m/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(m=-m);for(let y=1;y<=e;y++)a[y].applyMatrix4(c.makeRotationAxis(r[y],m*y)),s[y].crossVectors(r[y],a[y])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vo=class extends Ar{constructor(e=0,t=0,i=1,r=1,a=0,s=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new At){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);let o=this.aStartAngle+e*a,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*f+this.aX,l=d*f+m*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Qc=class extends vo{constructor(e,t,i,r,a,s){super(e,t,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function af(){let n=0,e=0,t=0,i=0;function r(a,s,o,c){n=a,e=o,t=-3*a+3*s-2*o-c,i=2*a-2*s+o+c}return{initCatmullRom:function(a,s,o,c,l){r(s,o,l*(o-a),l*(c-s))},initNonuniformCatmullRom:function(a,s,o,c,l,h,f){let d=(s-a)/l-(o-a)/(l+h)+(o-s)/h,m=(o-s)/h-(c-s)/(h+f)+(c-o)/f;d*=h,m*=h,r(s,o,d,m)},calc:function(a){let s=a*a,o=s*a;return n+e*a+t*s+i*o}}}var Qp=new he,jp=new he,_d=new af,Md=new af,Sd=new af,jc=class extends Ar{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new he){let i=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e,o=Math.floor(s),c=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:c===0&&o===a-1&&(o=a-2,c=1);let l,h;this.closed||o>0?l=r[(o-1)%a]:(jp.subVectors(r[0],r[1]).add(r[0]),l=jp);let f=r[o%a],d=r[(o+1)%a];if(this.closed||o+2<a?h=r[(o+2)%a]:(Qp.subVectors(r[a-1],r[a-2]).add(r[a-1]),h=Qp),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,y=Math.pow(l.distanceToSquared(f),m),T=Math.pow(f.distanceToSquared(d),m),g=Math.pow(d.distanceToSquared(h),m);T<1e-4&&(T=1),y<1e-4&&(y=T),g<1e-4&&(g=T),_d.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,y,T,g),Md.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,y,T,g),Sd.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,y,T,g)}else this.curveType==="catmullrom"&&(_d.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),Md.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),Sd.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return i.set(_d.calc(c),Md.calc(c),Sd.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new he().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function em(n,e,t,i,r){let a=(i-e)*.5,s=(r-t)*.5,o=n*n,c=n*o;return(2*t-2*i+a+s)*c+(-3*t+3*i-2*a-s)*o+a*n+t}function hg(n,e){let t=1-n;return t*t*e}function dg(n,e){return 2*(1-n)*n*e}function fg(n,e){return n*n*e}function nl(n,e,t,i){return hg(n,e)+dg(n,t)+fg(n,i)}function pg(n,e){let t=1-n;return t*t*t*e}function mg(n,e){let t=1-n;return 3*t*t*n*e}function vg(n,e){return 3*(1-n)*n*n*e}function gg(n,e){return n*n*n*e}function il(n,e,t,i,r){return pg(n,e)+mg(n,t)+vg(n,i)+gg(n,r)}var gl=class extends Ar{constructor(e=new At,t=new At,i=new At,r=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new At){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(il(e,r.x,a.x,s.x,o.x),il(e,r.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},eu=class extends Ar{constructor(e=new he,t=new he,i=new he,r=new he){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new he){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(il(e,r.x,a.x,s.x,o.x),il(e,r.y,a.y,s.y,o.y),il(e,r.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},yl=class extends Ar{constructor(e=new At,t=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new At){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new At){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tu=class extends Ar{constructor(e=new he,t=new he){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new he){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xl=class extends Ar{constructor(e=new At,t=new At,i=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new At){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(nl(e,r.x,a.x,s.x),nl(e,r.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nu=class extends Ar{constructor(e=new he,t=new he,i=new he){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new he){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(nl(e,r.x,a.x,s.x),nl(e,r.y,a.y,s.y),nl(e,r.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_l=class extends Ar{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new At){let i=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,c=r[s===0?s:s-1],l=r[s],h=r[s>r.length-2?r.length-1:s+1],f=r[s>r.length-3?r.length-1:s+2];return i.set(em(o,c.x,l.x,h.x,f.x),em(o,c.y,l.y,h.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new At().fromArray(r))}return this}},tm=Object.freeze({__proto__:null,ArcCurve:Qc,CatmullRomCurve3:jc,CubicBezierCurve:gl,CubicBezierCurve3:eu,EllipseCurve:vo,LineCurve:yl,LineCurve3:tu,QuadraticBezierCurve:xl,QuadraticBezierCurve3:nu,SplineCurve:_l}),iu=class extends Ar{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tm[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let s=r[a]-i,o=this.curves[a],c=o.getLength(),l=c===0?0:1-s/c;return o.getPointAt(l,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let s=a[r],o=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,c=s.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new tm[r.type]().fromJSON(r))}return this}},Is=class extends iu{constructor(e){super(),this.type="Path",this.currentPoint=new At,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new yl(this.currentPoint.clone(),new At(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new xl(this.currentPoint.clone(),new At(e,t),new At(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,s){let o=new gl(this.currentPoint.clone(),new At(e,t),new At(i,r),new At(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new _l(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,s){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,r,a,s),this}absarc(e,t,i,r,a,s){return this.absellipse(e,t,i,i,r,a,s),this}ellipse(e,t,i,r,a,s,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,r,a,s,o,c),this}absellipse(e,t,i,r,a,s,o,c){let l=new vo(e,t,i,r,a,s,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},go=class extends Is{constructor(e){super(e),this.uuid=To(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Is().fromJSON(r))}return this}};function yg(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,a=Km(n,0,r,t,!0),s=[];if(!a||a.next===a.prev)return s;let o,c,l;if(i&&(a=bg(n,e,a,t)),n.length>80*t){o=n[0],c=n[1];let h=o,f=c;for(let d=t;d<r;d+=t){let m=n[d],y=n[d+1];m<o&&(o=m),y<c&&(c=y),m>h&&(h=m),y>f&&(f=y)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return Ml(a,s,t,o,c,l,0),s}function Km(n,e,t,i,r){let a;if(r===Dg(n,e,t,i)>0)for(let s=e;s<t;s+=i)a=nm(s/i|0,n[s],n[s+1],a);else for(let s=t-i;s>=e;s-=i)a=nm(s/i|0,n[s],n[s+1],a);return a&&yo(a,a.next)&&(bl(a),a=a.next),a}function Cs(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(yo(t,t.next)||ui(t.prev,t,t.next)===0)){if(bl(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ml(n,e,t,i,r,a,s){if(!n)return;!s&&a&&Ig(n,i,r,a);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(a?_g(n,i,r,a):xg(n)){e.push(c.i,n.i,l.i),bl(n),n=l.next,o=l.next;continue}if(n=l,n===o){s?s===1?(n=Mg(Cs(n),e),Ml(n,e,t,i,r,a,2)):s===2&&Sg(n,e,t,i,r,a):Ml(Cs(n),e,t,i,r,a,1);break}}}function xg(n){let e=n.prev,t=n,i=n.next;if(ui(e,t,i)>=0)return!1;let r=e.x,a=t.x,s=i.x,o=e.y,c=t.y,l=i.y,h=Math.min(r,a,s),f=Math.min(o,c,l),d=Math.max(r,a,s),m=Math.max(o,c,l),y=i.next;for(;y!==e;){if(y.x>=h&&y.x<=d&&y.y>=f&&y.y<=m&&tl(r,o,a,c,s,l,y.x,y.y)&&ui(y.prev,y,y.next)>=0)return!1;y=y.next}return!0}function _g(n,e,t,i){let r=n.prev,a=n,s=n.next;if(ui(r,a,s)>=0)return!1;let o=r.x,c=a.x,l=s.x,h=r.y,f=a.y,d=s.y,m=Math.min(o,c,l),y=Math.min(h,f,d),T=Math.max(o,c,l),g=Math.max(h,f,d),p=Cd(m,y,e,t,i),v=Cd(T,g,e,t,i),w=n.prevZ,_=n.nextZ;for(;w&&w.z>=p&&_&&_.z<=v;){if(w.x>=m&&w.x<=T&&w.y>=y&&w.y<=g&&w!==r&&w!==s&&tl(o,h,c,f,l,d,w.x,w.y)&&ui(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=m&&_.x<=T&&_.y>=y&&_.y<=g&&_!==r&&_!==s&&tl(o,h,c,f,l,d,_.x,_.y)&&ui(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=p;){if(w.x>=m&&w.x<=T&&w.y>=y&&w.y<=g&&w!==r&&w!==s&&tl(o,h,c,f,l,d,w.x,w.y)&&ui(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=v;){if(_.x>=m&&_.x<=T&&_.y>=y&&_.y<=g&&_!==r&&_!==s&&tl(o,h,c,f,l,d,_.x,_.y)&&ui(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Mg(n,e){let t=n;do{let i=t.prev,r=t.next.next;!yo(i,r)&&jm(i,t,t.next,r)&&Sl(i,r)&&Sl(r,i)&&(e.push(i.i,t.i,r.i),bl(t),bl(t.next),t=n=r),t=t.next}while(t!==n);return Cs(t)}function Sg(n,e,t,i,r,a){let s=n;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&Pg(s,o)){let c=e0(s,o);s=Cs(s,s.next),c=Cs(c,c.next),Ml(s,e,t,i,r,a,0),Ml(c,e,t,i,r,a,0);return}o=o.next}s=s.next}while(s!==n)}function bg(n,e,t,i){let r=[];for(let a=0,s=e.length;a<s;a++){let o=e[a]*i,c=a<s-1?e[a+1]*i:n.length,l=Km(n,o,c,i,!1);l===l.next&&(l.steiner=!0),r.push(Rg(l))}r.sort(wg);for(let a=0;a<r.length;a++)t=Tg(r[a],t);return t}function wg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Tg(n,e){let t=Eg(n,e);if(!t)return e;let i=e0(t,n);return Cs(i,i.next),Cs(t,t.next)}function Eg(n,e){let t=e,i=n.x,r=n.y,a=-1/0,s;if(yo(n,t))return t;do{if(yo(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>a&&(a=f,s=t.x<t.next.x?t:t.next,f===i))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(i>=t.x&&t.x>=c&&i!==t.x&&Qm(r<l?i:a,r,c,l,r<l?a:i,r,t.x,t.y)){let f=Math.abs(r-t.y)/(i-t.x);Sl(t,n)&&(f<h||f===h&&(t.x>s.x||t.x===s.x&&Ag(s,t)))&&(s=t,h=f)}t=t.next}while(t!==o);return s}function Ag(n,e){return ui(n.prev,n,e.prev)<0&&ui(e.next,n,n.next)<0}function Ig(n,e,t,i){let r=n;do r.z===0&&(r.z=Cd(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Cg(r)}function Cg(n){let e,t=1;do{let i=n,r;n=null;let a=null;for(e=0;i;){e++;let s=i,o=0;for(let l=0;l<t&&(o++,s=s.nextZ,!!s);l++);let c=t;for(;o>0||c>0&&s;)o!==0&&(c===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,o--):(r=s,s=s.nextZ,c--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;i=s}a.nextZ=null,t*=2}while(e>1);return n}function Cd(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Rg(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Qm(n,e,t,i,r,a,s,o){return(r-s)*(e-o)>=(n-s)*(a-o)&&(n-s)*(i-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(r-s)*(i-o)}function tl(n,e,t,i,r,a,s,o){return!(n===s&&e===o)&&Qm(n,e,t,i,r,a,s,o)}function Pg(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Lg(n,e)&&(Sl(n,e)&&Sl(e,n)&&Ng(n,e)&&(ui(n.prev,n,e.prev)||ui(n,e.prev,e))||yo(n,e)&&ui(n.prev,n,n.next)>0&&ui(e.prev,e,e.next)>0)}function ui(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function yo(n,e){return n.x===e.x&&n.y===e.y}function jm(n,e,t,i){let r=Lc(ui(n,e,t)),a=Lc(ui(n,e,i)),s=Lc(ui(t,i,n)),o=Lc(ui(t,i,e));return!!(r!==a&&s!==o||r===0&&Pc(n,t,e)||a===0&&Pc(n,i,e)||s===0&&Pc(t,n,i)||o===0&&Pc(t,e,i))}function Pc(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Lc(n){return n>0?1:n<0?-1:0}function Lg(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&jm(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Sl(n,e){return ui(n.prev,n,n.next)<0?ui(n,e,n.next)>=0&&ui(n,n.prev,e)>=0:ui(n,e,n.prev)<0||ui(n,n.next,e)<0}function Ng(n,e){let t=n,i=!1,r=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&r<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function e0(n,e){let t=Rd(n.i,n.x,n.y),i=Rd(e.i,e.x,e.y),r=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function nm(n,e,t,i){let r=Rd(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function bl(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Rd(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Dg(n,e,t,i){let r=0;for(let a=e,s=t-i;a<t;a+=i)r+=(n[s]-n[a])*(n[a+1]+n[s+1]),s=a;return r}var Pd=class{static triangulate(e,t,i=2){return yg(e,t,i)}},so=class n{static area(e){let t=e.length,i=0;for(let r=t-1,a=0;a<t;r=a++)i+=e[r].x*e[a].y-e[a].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],a=[];im(e),rm(i,e);let s=e.length;t.forEach(im);for(let c=0;c<t.length;c++)r.push(s),s+=t[c].length,rm(i,t[c]);let o=Pd.triangulate(i,r);for(let c=0;c<o.length;c+=3)a.push(o.slice(c,c+3));return a}};function im(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function rm(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var wl=class n extends Gi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,d=t/c,m=[],y=[],T=[],g=[];for(let p=0;p<h;p++){let v=p*d-s;for(let w=0;w<l;w++){let _=w*f-a;y.push(_,-v,0),T.push(0,0,1),g.push(w/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let w=v+l*p,_=v+l*(p+1),A=v+1+l*(p+1),I=v+1+l*p;m.push(w,_,I),m.push(_,A,I)}this.setIndex(m),this.setAttribute("position",new Ln(y,3)),this.setAttribute("normal",new Ln(T,3)),this.setAttribute("uv",new Ln(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},xo=class n extends Gi{constructor(e=.5,t=1,i=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:a,thetaLength:s},i=Math.max(3,i),r=Math.max(1,r);let o=[],c=[],l=[],h=[],f=e,d=(t-e)/r,m=new he,y=new At;for(let T=0;T<=r;T++){for(let g=0;g<=i;g++){let p=a+g/i*s;m.x=f*Math.cos(p),m.y=f*Math.sin(p),c.push(m.x,m.y,m.z),l.push(0,0,1),y.x=(m.x/t+1)/2,y.y=(m.y/t+1)/2,h.push(y.x,y.y)}f+=d}for(let T=0;T<r;T++){let g=T*(i+1);for(let p=0;p<i;p++){let v=p+g,w=v,_=v+i+1,A=v+i+2,I=v+1;o.push(w,_,I),o.push(_,A,I)}}this.setIndex(o),this.setAttribute("position",new Ln(c,3)),this.setAttribute("normal",new Ln(l,3)),this.setAttribute("uv",new Ln(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Tl=class n extends Gi{constructor(e=new go([new At(0,.5),new At(-.5,-.5),new At(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],a=[],s=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new Ln(r,3)),this.setAttribute("normal",new Ln(a,3)),this.setAttribute("uv",new Ln(s,2));function l(h){let f=r.length/3,d=h.extractPoints(t),m=d.shape,y=d.holes;so.isClockWise(m)===!1&&(m=m.reverse());for(let g=0,p=y.length;g<p;g++){let v=y[g];so.isClockWise(v)===!0&&(y[g]=v.reverse())}let T=so.triangulateShape(m,y);for(let g=0,p=y.length;g<p;g++){let v=y[g];m=m.concat(v)}for(let g=0,p=m.length;g<p;g++){let v=m[g];r.push(v.x,v.y,0),a.push(0,0,1),s.push(v.x,v.y)}for(let g=0,p=T.length;g<p;g++){let v=T[g],w=v[0]+f,_=v[1]+f,A=v[2]+f;i.push(w,_,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ug(t,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let s=t[e.shapes[r]];i.push(s)}return new n(i,e.curveSegments)}};function Ug(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var is=class n extends Gi{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(s+o,Math.PI),l=0,h=[],f=new he,d=new he,m=[],y=[],T=[],g=[];for(let p=0;p<=i;p++){let v=[],w=p/i,_=s+w*o,A=e*Math.cos(_),I=Math.sqrt(e*e-A*A),U=0;p===0&&s===0?U=.5/t:p===i&&c===Math.PI&&(U=-.5/t);for(let x=0;x<=t;x++){let L=x/t,k=r+L*a;f.x=-I*Math.cos(k),f.y=A,f.z=I*Math.sin(k),y.push(f.x,f.y,f.z),d.copy(f).normalize(),T.push(d.x,d.y,d.z),g.push(L+U,1-w),v.push(l++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){let w=h[p][v+1],_=h[p][v],A=h[p+1][v],I=h[p+1][v+1];(p!==0||s>0)&&m.push(w,_,I),(p!==i-1||c<Math.PI)&&m.push(_,A,I)}this.setIndex(m),this.setAttribute("position",new Ln(y,3)),this.setAttribute("normal",new Ln(T,3)),this.setAttribute("uv",new Ln(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ls(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(am(r))r.isRenderTargetTexture?(Zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(am(r[0])){let a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function nr(n){let e={};for(let t=0;t<n.length;t++){let i=Ls(n[t]);for(let r in i)e[r]=i[r]}return e}function am(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function sf(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_n.workingColorSpace}var t0={clone:Ls,merge:nr},Og=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ir=class extends ts{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Og,this.fragmentShader=Bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ls(e.uniforms),this.uniformsGroups=Fg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new un().setHex(r.value);break;case"v2":this.uniforms[i].value=new At().fromArray(r.value);break;case"v3":this.uniforms[i].value=new he().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ri().fromArray(r.value);break;case"m3":this.uniforms[i].value=new an().fromArray(r.value);break;case"m4":this.uniforms[i].value=new On().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ru=class extends Ir{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Hi=class extends ts{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new un(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new un(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ch,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Na,this.combine=Su,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},au=class extends ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},su=class extends ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function no(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function bd(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var rs=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<a)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=r,r=t[++i],e<r)break t}s=t.length;break n}if(!(e>=a)){let o=t[1];e<o&&(i=2,a=o);for(let c=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=a,a=t[--i-1],e>=a)break t}s=i,i=0;break n}break e}for(;i<s;){let o=i+s>>>1;e<t[o]?s=o:i=o+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let s=0;s!==r;++s)t[s]=i[a+s];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ou=class extends rs{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ed,endingEnd:Ed}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,s=e+1,o=r[a],c=r[s];if(o===void 0)switch(this.getSettings_().endingStart){case Ad:a=e,o=2*t-i;break;case Id:a=r.length-2,o=t+r[a]-r[a+1];break;default:a=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Ad:s=e,c=2*i-t;break;case Id:s=1,c=i+r[1]-r[0];break;default:s=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=a*h,this._offsetNext=s*h}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,m=this._weightNext,y=(i-t)/(r-t),T=y*y,g=T*y,p=-d*g+2*d*T-d*y,v=(1+d)*g+(-1.5-2*d)*T+(-.5+d)*y+1,w=(-1-m)*g+(1.5+m)*T+.5*y,_=m*g-m*T;for(let A=0;A!==o;++A)a[A]=p*s[h+A]+v*s[l+A]+w*s[c+A]+_*s[f+A];return a}},lu=class extends rs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(i-t)/(r-t),f=1-h;for(let d=0;d!==o;++d)a[d]=s[l+d]*f+s[c+d]*h;return a}},cu=class extends rs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},uu=class extends rs{interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let y=(i-t)/(r-t),T=1-y;for(let g=0;g!==o;++g)a[g]=s[l+g]*T+s[c+g]*y;return a}let d=o*2,m=e-1;for(let y=0;y!==o;++y){let T=s[l+y],g=s[c+y],p=m*d+y*2,v=f[p],w=f[p+1],_=e*d+y*2,A=h[_],I=h[_+1],U=kg(i,t,v,A,r);a[y]=n0(U,T,w,I,g)}return a}};function n0(n,e,t,i,r){let a=1-n;return a*a*a*e+3*a*a*n*t+3*a*n*n*i+n*n*n*r}function zg(n,e,t,i,r){let a=1-n;return 3*a*a*(t-e)+6*a*n*(i-t)+3*n*n*(r-i)}function kg(n,e,t,i,r){let a=(n-e)/(r-e);for(let s=0;s<8;s++){let o=n0(a,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let c=zg(a,e,t,i,r);if(Math.abs(c)<1e-10)break;a=Math.max(0,Math.min(1,a-o/c))}return a}var Cr=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=no(t,this.TimeBufferType),this.values=no(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:no(e.times,Array),values:no(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),bd(e.settings)&&(i.settings={inTangents:no(e.settings.inTangents,Array),outTangents:no(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new cu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new lu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ou(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new uu(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case rl:t=this.InterpolantFactoryMethodDiscrete;break;case qc:t=this.InterpolantFactoryMethodLinear;break;case Uc:t=this.InterpolantFactoryMethodSmooth;break;case Td:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Zt("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rl;case this.InterpolantFactoryMethodLinear:return qc;case this.InterpolantFactoryMethodSmooth:return Uc;case this.InterpolantFactoryMethodBezier:return Td}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;bd(this.settings)&&(sm(this.settings.inTangents,e),sm(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,s=r-1;for(;a!==r&&i[a]<e;)++a;for(;s!==-1&&i[s]>t;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let o=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*o,s*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($t("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&($t("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==a;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){$t("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(s!==null&&s>c){$t("KeyframeTrack: Out of order keys.",this,o,c,s),e=!1;break}s=c}if(r!==void 0&&Wv(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){$t("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Uc,a=e.length-1,s=1;for(let o=1;o<a;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(r)c=!0;else{let f=o*i,d=f-i,m=f+i;for(let y=0;y!==i;++y){let T=t[f+y];if(T!==t[d+y]||T!==t[m+y]){c=!0;break}}}if(c){if(o!==s){e[s]=e[o];let f=o*i,d=s*i;for(let m=0;m!==i;++m)t[d+m]=t[f+m]}++s}}if(a>0){e[s]=e[a];for(let o=a*i,c=s*i,l=0;l!==i;++l)t[c+l]=t[o+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,bd(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function sm(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Cr.prototype.ValueTypeName="";Cr.prototype.TimeBufferType=Float32Array;Cr.prototype.ValueBufferType=Float32Array;Cr.prototype.DefaultInterpolation=qc;var as=class extends Cr{constructor(e,t,i){super(e,t,i)}};as.prototype.ValueTypeName="bool";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=rl;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;var hu=class extends Cr{constructor(e,t,i,r){super(e,t,i,r)}};hu.prototype.ValueTypeName="color";var du=class extends Cr{constructor(e,t,i,r){super(e,t,i,r)}};du.prototype.ValueTypeName="number";var fu=class extends rs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,c=(i-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)ua.slerpFlat(a,0,s,l-o,s,l,c);return a}},El=class extends Cr{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new fu(this.times,this.values,this.getValueSize(),e)}};El.prototype.ValueTypeName="quaternion";El.prototype.InterpolantFactoryMethodSmooth=void 0;var ss=class extends Cr{constructor(e,t,i){super(e,t,i)}};ss.prototype.ValueTypeName="string";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=rl;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;var pu=class extends Cr{constructor(e,t,i,r){super(e,t,i,r)}};pu.prototype.ValueTypeName="vector";var mu=class{constructor(e,t,i){let r=this,a=!1,s=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,a===!1&&r.onStart!==void 0&&r.onStart(h,s,o),a=!0},this.itemEnd=function(h){s++,r.onProgress!==void 0&&r.onProgress(h,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){let m=l[f],y=l[f+1];if(m.global&&(m.lastIndex=0),m.test(h))return y}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},i0=new mu,vu=class{constructor(e){this.manager=e!==void 0?e:i0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};vu.DEFAULT_MATERIAL_NAME="__DEFAULT";var Al=class extends tr{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new un(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Il=class extends Al{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new un(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},wd=new On,om=new he,lm=new he,gu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=gr,this.map=null,this.mapPass=null,this.matrix=new On,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new ri(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;om.setFromMatrixPosition(e.matrixWorld),t.position.copy(om),lm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){wd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(wd,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,s=r?r.z/a.x:1,o=r?r.w/a.y:1,c=r?r.x/a.x:0,l=r?r.y/a.y:0;e.coordinateSystem===lo||e.reversedDepth?t.set(.5*s,0,0,.5*s+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*s,0,0,.5*s+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(wd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Nc=new he,Dc=new ua,sa=new he,Cl=class extends tr{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new On,this.projectionMatrix=new On,this.projectionMatrixInverse=new On,this.coordinateSystem=$r,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Nc,Dc,sa),sa.x===1&&sa.y===1&&sa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Dc,sa.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Nc,Dc,sa),sa.x===1&&sa.y===1&&sa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Dc,sa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qa=new he,cm=new At,um=new At,ji=class extends Cl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(jh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yc*2*Math.atan(Math.tan(jh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z),Qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z)}getViewSize(e,t){return this.getViewBounds(e,cm,um),t.subVectors(um,cm)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(jh*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}let o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var _o=class extends Cl{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ld=class extends gu{constructor(){super(new _o(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rl=class extends Al{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tr.DEFAULT_UP),this.updateMatrix(),this.target=new tr,this.shadow=new Ld}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var io=-90,ro=1,yu=class extends tr{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ji(io,ro,e,t);r.layers=this.layers,this.add(r);let a=new ji(io,ro,e,t);a.layers=this.layers,this.add(a);let s=new ji(io,ro,e,t);s.layers=this.layers,this.add(s);let o=new ji(io,ro,e,t);o.layers=this.layers,this.add(o);let c=new ji(io,ro,e,t);c.layers=this.layers,this.add(c);let l=new ji(io,ro,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(let l of t)this.remove(l);if(e===$r)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,o,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;let T=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=T,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}},xu=class extends ji{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var of="\\[\\]\\.:\\/",Vg=new RegExp("["+of+"]","g"),lf="[^"+of+"]",Gg="[^"+of.replace("\\.","")+"]",Hg=/((?:WC+[\/:])*)/.source.replace("WC",lf),Wg=/(WCOD+)?/.source.replace("WCOD",Gg),Xg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lf),qg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lf),Yg=new RegExp("^"+Hg+Wg+Xg+qg+"$"),Zg=["material","materials","bones","map"],Nd=class{constructor(e,t,i){let r=i||ei.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ei=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Vg,"")}static parseTrackName(e){let t=Yg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);Zg.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(a){for(let s=0;s<a.length;s++){let o=a[s];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$t("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$t("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$t("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){$t("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){$t("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;$t("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ei.Composite=Nd;ei.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ei.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ei.prototype.GetterByBindingType=[ei.prototype._getValue_direct,ei.prototype._getValue_array,ei.prototype._getValue_arrayElement,ei.prototype._getValue_toArray];ei.prototype.SetterByBindingTypeAndVersioning=[[ei.prototype._setValue_direct,ei.prototype._setValue_direct_setNeedsUpdate,ei.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ei.prototype._setValue_array,ei.prototype._setValue_array_setNeedsUpdate,ei.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ei.prototype._setValue_arrayElement,ei.prototype._setValue_arrayElement_setNeedsUpdate,ei.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ei.prototype._setValue_fromArray,ei.prototype._setValue_fromArray_setNeedsUpdate,ei.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var lb=new Float32Array(1);var hm=new On,Pl=class{constructor(e,t,i=0,r=1/0){this.ray=new dl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ho,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$t("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hm),this}intersectObject(e,t=!0,i=[]){return Dd(e,this,i,t),i.sort(dm),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)Dd(e[r],this,i,t);return i.sort(dm),i}};function dm(n,e){return n.distance-e.distance}function Dd(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let a=n.children;for(let s=0,o=a.length;s<o;s++)Dd(a[s],e,t,!0)}}var pf=class pf{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}};pf.prototype.isMatrix2=!0;var Ud=pf;function cf(n,e,t,i){let r=Jg(i);switch(t){case ef:return n*e;case Cu:return n*e/r.components*r.byteLength;case Ru:return n*e/r.components*r.byteLength;case hs:return n*e*2/r.components*r.byteLength;case Pu:return n*e*2/r.components*r.byteLength;case tf:return n*e*3/r.components*r.byteLength;case Br:return n*e*4/r.components*r.byteLength;case Lu:return n*e*4/r.components*r.byteLength;case Ul:case Fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ol:case Bl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Du:case Fu:return Math.max(n,16)*Math.max(e,8)/4;case Nu:case Uu:return Math.max(n,8)*Math.max(e,8)/2;case Ou:case Bu:case ku:case Vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zu:case zl:case Gu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Xu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case qu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Yu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Zu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ju:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case $u:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ku:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Qu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ju:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case eh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case th:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case nh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ih:case rh:case ah:return Math.ceil(n/4)*Math.ceil(e/4)*16;case sh:case oh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case kl:case lh:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jg(n){switch(n){case gr:case $d:return{byteLength:1,components:1};case bo:case Kd:case jr:return{byteLength:2,components:1};case Au:case Iu:return{byteLength:2,components:4};case Qr:case Eu:case Or:return{byteLength:4,components:1};case Qd:case jd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function T0(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Kg(n){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){let h=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,h);else{f.sort((m,y)=>m.start-y.start);let d=0;for(let m=1;m<f.length;m++){let y=f[d],T=f[m];T.start<=y.start+y.count+1?y.count=Math.max(y.count,T.start+T.count-y.start):(++d,f[d]=T)}f.length=d+1;for(let m=0,y=f.length;m<y;m++){let T=f[m];n.bufferSubData(l,T.start*h.BYTES_PER_ELEMENT,h,T.start,T.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var Qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ey=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ty=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ny=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ry=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ay=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,oy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ly=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,py=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,my=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_y=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,My=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,by=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,wy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ty=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ey=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ay=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ry=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Py=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ly=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ny=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Uy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Oy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,By=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ky=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Wy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Xy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$y=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ky=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ex=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ox=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ux=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,px=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_x=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Mx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ex=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ax=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ox=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Yx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,a_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,s_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,o_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,l_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,d_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,f_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,g_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,x_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,__=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,b_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,A_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,R_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,P_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hn={alphahash_fragment:Qg,alphahash_pars_fragment:jg,alphamap_fragment:ey,alphamap_pars_fragment:ty,alphatest_fragment:ny,alphatest_pars_fragment:iy,aomap_fragment:ry,aomap_pars_fragment:ay,batching_pars_vertex:sy,batching_vertex:oy,begin_vertex:ly,beginnormal_vertex:cy,bsdfs:uy,iridescence_fragment:hy,bumpmap_pars_fragment:dy,clipping_planes_fragment:fy,clipping_planes_pars_fragment:py,clipping_planes_pars_vertex:my,clipping_planes_vertex:vy,color_fragment:gy,color_pars_fragment:yy,color_pars_vertex:xy,color_vertex:_y,common:My,cube_uv_reflection_fragment:Sy,defaultnormal_vertex:by,displacementmap_pars_vertex:wy,displacementmap_vertex:Ty,emissivemap_fragment:Ey,emissivemap_pars_fragment:Ay,colorspace_fragment:Iy,colorspace_pars_fragment:Cy,envmap_fragment:Ry,envmap_common_pars_fragment:Py,envmap_pars_fragment:Ly,envmap_pars_vertex:Ny,envmap_physical_pars_fragment:Wy,envmap_vertex:Dy,fog_vertex:Uy,fog_pars_vertex:Fy,fog_fragment:Oy,fog_pars_fragment:By,gradientmap_pars_fragment:zy,lightmap_pars_fragment:ky,lights_lambert_fragment:Vy,lights_lambert_pars_fragment:Gy,lights_pars_begin:Hy,lights_toon_fragment:Xy,lights_toon_pars_fragment:qy,lights_phong_fragment:Yy,lights_phong_pars_fragment:Zy,lights_physical_fragment:Jy,lights_physical_pars_fragment:$y,lights_fragment_begin:Ky,lights_fragment_maps:Qy,lights_fragment_end:jy,lightprobes_pars_fragment:ex,logdepthbuf_fragment:tx,logdepthbuf_pars_fragment:nx,logdepthbuf_pars_vertex:ix,logdepthbuf_vertex:rx,map_fragment:ax,map_pars_fragment:sx,map_particle_fragment:ox,map_particle_pars_fragment:lx,metalnessmap_fragment:cx,metalnessmap_pars_fragment:ux,morphinstance_vertex:hx,morphcolor_vertex:dx,morphnormal_vertex:fx,morphtarget_pars_vertex:px,morphtarget_vertex:mx,normal_fragment_begin:vx,normal_fragment_maps:gx,normal_pars_fragment:yx,normal_pars_vertex:xx,normal_vertex:_x,normalmap_pars_fragment:Mx,clearcoat_normal_fragment_begin:Sx,clearcoat_normal_fragment_maps:bx,clearcoat_pars_fragment:wx,iridescence_pars_fragment:Tx,opaque_fragment:Ex,packing:Ax,premultiplied_alpha_fragment:Ix,project_vertex:Cx,dithering_fragment:Rx,dithering_pars_fragment:Px,roughnessmap_fragment:Lx,roughnessmap_pars_fragment:Nx,shadowmap_pars_fragment:Dx,shadowmap_pars_vertex:Ux,shadowmap_vertex:Fx,shadowmask_pars_fragment:Ox,skinbase_vertex:Bx,skinning_pars_vertex:zx,skinning_vertex:kx,skinnormal_vertex:Vx,specularmap_fragment:Gx,specularmap_pars_fragment:Hx,tonemapping_fragment:Wx,tonemapping_pars_fragment:Xx,transmission_fragment:qx,transmission_pars_fragment:Yx,uv_pars_fragment:Zx,uv_pars_vertex:Jx,uv_vertex:$x,worldpos_vertex:Kx,background_vert:Qx,background_frag:jx,backgroundCube_vert:e_,backgroundCube_frag:t_,cube_vert:n_,cube_frag:i_,depth_vert:r_,depth_frag:a_,distance_vert:s_,distance_frag:o_,equirect_vert:l_,equirect_frag:c_,linedashed_vert:u_,linedashed_frag:h_,meshbasic_vert:d_,meshbasic_frag:f_,meshlambert_vert:p_,meshlambert_frag:m_,meshmatcap_vert:v_,meshmatcap_frag:g_,meshnormal_vert:y_,meshnormal_frag:x_,meshphong_vert:__,meshphong_frag:M_,meshphysical_vert:S_,meshphysical_frag:b_,meshtoon_vert:w_,meshtoon_frag:T_,points_vert:E_,points_frag:A_,shadow_vert:I_,shadow_frag:C_,sprite_vert:R_,sprite_frag:P_},vt={common:{diffuse:{value:new un(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new an},alphaMap:{value:null},alphaMapTransform:{value:new an},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new an}},envmap:{envMap:{value:null},envMapRotation:{value:new an},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new an}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new an}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new an},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new an},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new an},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new an}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new an}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new an}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new un(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new he},probesMax:{value:new he},probesResolution:{value:new he}},points:{diffuse:{value:new un(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new an},alphaTest:{value:0},uvTransform:{value:new an}},sprite:{diffuse:{value:new un(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new an},alphaMap:{value:null},alphaMapTransform:{value:new an},alphaTest:{value:0}}},va={basic:{uniforms:nr([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:hn.meshbasic_vert,fragmentShader:hn.meshbasic_frag},lambert:{uniforms:nr([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new un(0)},envMapIntensity:{value:1}}]),vertexShader:hn.meshlambert_vert,fragmentShader:hn.meshlambert_frag},phong:{uniforms:nr([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new un(0)},specular:{value:new un(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:hn.meshphong_vert,fragmentShader:hn.meshphong_frag},standard:{uniforms:nr([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new un(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:hn.meshphysical_vert,fragmentShader:hn.meshphysical_frag},toon:{uniforms:nr([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new un(0)}}]),vertexShader:hn.meshtoon_vert,fragmentShader:hn.meshtoon_frag},matcap:{uniforms:nr([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:hn.meshmatcap_vert,fragmentShader:hn.meshmatcap_frag},points:{uniforms:nr([vt.points,vt.fog]),vertexShader:hn.points_vert,fragmentShader:hn.points_frag},dashed:{uniforms:nr([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:hn.linedashed_vert,fragmentShader:hn.linedashed_frag},depth:{uniforms:nr([vt.common,vt.displacementmap]),vertexShader:hn.depth_vert,fragmentShader:hn.depth_frag},normal:{uniforms:nr([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:hn.meshnormal_vert,fragmentShader:hn.meshnormal_frag},sprite:{uniforms:nr([vt.sprite,vt.fog]),vertexShader:hn.sprite_vert,fragmentShader:hn.sprite_frag},background:{uniforms:{uvTransform:{value:new an},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:hn.background_vert,fragmentShader:hn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new an}},vertexShader:hn.backgroundCube_vert,fragmentShader:hn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:hn.cube_vert,fragmentShader:hn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:hn.equirect_vert,fragmentShader:hn.equirect_frag},distance:{uniforms:nr([vt.common,vt.displacementmap,{referencePosition:{value:new he},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:hn.distance_vert,fragmentShader:hn.distance_frag},shadow:{uniforms:nr([vt.lights,vt.fog,{color:{value:new un(0)},opacity:{value:1}}]),vertexShader:hn.shadow_vert,fragmentShader:hn.shadow_frag}};va.physical={uniforms:nr([va.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new an},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new an},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new an},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new an},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new an},sheen:{value:0},sheenColor:{value:new un(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new an},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new an},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new an},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new an},attenuationDistance:{value:0},attenuationColor:{value:new un(0)},specularColor:{value:new un(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new an},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new an},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new an}}]),vertexShader:hn.meshphysical_vert,fragmentShader:hn.meshphysical_frag};var dh={r:0,b:0,g:0},L_=new On,E0=new an;E0.set(-1,0,0,0,1,0,0,0,1);function N_(n,e,t,i,r,a){let s=new un(0),o=r===!0?0:1,c,l,h=null,f=0,d=null;function m(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){let _=v.backgroundBlurriness>0;w=e.get(w,_)}return w}function y(v){let w=!1,_=m(v);_===null?g(s,o):_&&_.isColor&&(g(_,1),w=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function T(v,w){let _=m(w);_&&(_.isCubeTexture||_.mapping===Nl)?(l===void 0&&(l=new Vn(new Er(1,1,1),new Ir({name:"BackgroundCubeMaterial",uniforms:Ls(va.backgroundCube.uniforms),vertexShader:va.backgroundCube.vertexShader,fragmentShader:va.backgroundCube.fragmentShader,side:sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(L_.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(E0),l.material.toneMapped=_n.getTransfer(_.colorSpace)!==Fn,(h!==_||f!==_.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Vn(new wl(2,2),new Ir({name:"BackgroundMaterial",uniforms:Ls(va.background.uniforms),vertexShader:va.background.vertexShader,fragmentShader:va.background.fragmentShader,side:os,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=_n.getTransfer(_.colorSpace)!==Fn,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,w){v.getRGB(dh,sf(n)),t.buffers.color.setClear(dh.r,dh.g,dh.b,w,a)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(v,w=1){s.set(v),o=w,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(s,o)},render:y,addToRenderList:T,dispose:p}}function D_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),a=r,s=!1;function o(V,Y,E,S,B){let z=!1,K=f(V,S,E,Y);a!==K&&(a=K,l(a.object)),z=m(V,S,E,B),z&&y(V,S,E,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(z||s)&&(s=!1,_(V,Y,E,S),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(V){return n.bindVertexArray(V)}function h(V){return n.deleteVertexArray(V)}function f(V,Y,E,S){let B=S.wireframe===!0,z=i[Y.id];z===void 0&&(z={},i[Y.id]=z);let K=V.isInstancedMesh===!0?V.id:0,W=z[K];W===void 0&&(W={},z[K]=W);let O=W[E.id];O===void 0&&(O={},W[E.id]=O);let ne=O[B];return ne===void 0&&(ne=d(c()),O[B]=ne),ne}function d(V){let Y=[],E=[],S=[];for(let B=0;B<t;B++)Y[B]=0,E[B]=0,S[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:E,attributeDivisors:S,object:V,attributes:{},index:null}}function m(V,Y,E,S){let B=a.attributes,z=Y.attributes,K=0,W=E.getAttributes();for(let O in W)if(W[O].location>=0){let ae=B[O],xe=z[O];if(xe===void 0&&(O==="instanceMatrix"&&V.instanceMatrix&&(xe=V.instanceMatrix),O==="instanceColor"&&V.instanceColor&&(xe=V.instanceColor)),ae===void 0||ae.attribute!==xe||xe&&ae.data!==xe.data)return!0;K++}return a.attributesNum!==K||a.index!==S}function y(V,Y,E,S){let B={},z=Y.attributes,K=0,W=E.getAttributes();for(let O in W)if(W[O].location>=0){let ae=z[O];ae===void 0&&(O==="instanceMatrix"&&V.instanceMatrix&&(ae=V.instanceMatrix),O==="instanceColor"&&V.instanceColor&&(ae=V.instanceColor));let xe={};xe.attribute=ae,ae&&ae.data&&(xe.data=ae.data),B[O]=xe,K++}a.attributes=B,a.attributesNum=K,a.index=S}function T(){let V=a.newAttributes;for(let Y=0,E=V.length;Y<E;Y++)V[Y]=0}function g(V){p(V,0)}function p(V,Y){let E=a.newAttributes,S=a.enabledAttributes,B=a.attributeDivisors;E[V]=1,S[V]===0&&(n.enableVertexAttribArray(V),S[V]=1),B[V]!==Y&&(n.vertexAttribDivisor(V,Y),B[V]=Y)}function v(){let V=a.newAttributes,Y=a.enabledAttributes;for(let E=0,S=Y.length;E<S;E++)Y[E]!==V[E]&&(n.disableVertexAttribArray(E),Y[E]=0)}function w(V,Y,E,S,B,z,K){K===!0?n.vertexAttribIPointer(V,Y,E,B,z):n.vertexAttribPointer(V,Y,E,S,B,z)}function _(V,Y,E,S){T();let B=S.attributes,z=E.getAttributes(),K=Y.defaultAttributeValues;for(let W in z){let O=z[W];if(O.location>=0){let ne=B[W];if(ne===void 0&&(W==="instanceMatrix"&&V.instanceMatrix&&(ne=V.instanceMatrix),W==="instanceColor"&&V.instanceColor&&(ne=V.instanceColor)),ne!==void 0){let ae=ne.normalized,xe=ne.itemSize,be=e.get(ne);if(be===void 0)continue;let fe=be.buffer,Ie=be.type,De=be.bytesPerElement,re=Ie===n.INT||Ie===n.UNSIGNED_INT||ne.gpuType===Eu;if(ne.isInterleavedBufferAttribute){let le=ne.data,Re=le.stride,ze=ne.offset;if(le.isInstancedInterleavedBuffer){for(let Fe=0;Fe<O.locationSize;Fe++)p(O.location+Fe,le.meshPerAttribute);V.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Fe=0;Fe<O.locationSize;Fe++)g(O.location+Fe);n.bindBuffer(n.ARRAY_BUFFER,fe);for(let Fe=0;Fe<O.locationSize;Fe++)w(O.location+Fe,xe/O.locationSize,Ie,ae,Re*De,(ze+xe/O.locationSize*Fe)*De,re)}else{if(ne.isInstancedBufferAttribute){for(let le=0;le<O.locationSize;le++)p(O.location+le,ne.meshPerAttribute);V.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let le=0;le<O.locationSize;le++)g(O.location+le);n.bindBuffer(n.ARRAY_BUFFER,fe);for(let le=0;le<O.locationSize;le++)w(O.location+le,xe/O.locationSize,Ie,ae,xe*De,xe/O.locationSize*le*De,re)}}else if(K!==void 0){let ae=K[W];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(O.location,ae);break;case 3:n.vertexAttrib3fv(O.location,ae);break;case 4:n.vertexAttrib4fv(O.location,ae);break;default:n.vertexAttrib1fv(O.location,ae)}}}}v()}function A(){L();for(let V in i){let Y=i[V];for(let E in Y){let S=Y[E];for(let B in S){let z=S[B];for(let K in z)h(z[K].object),delete z[K];delete S[B]}}delete i[V]}}function I(V){if(i[V.id]===void 0)return;let Y=i[V.id];for(let E in Y){let S=Y[E];for(let B in S){let z=S[B];for(let K in z)h(z[K].object),delete z[K];delete S[B]}}delete i[V.id]}function U(V){for(let Y in i){let E=i[Y];for(let S in E){let B=E[S];if(B[V.id]===void 0)continue;let z=B[V.id];for(let K in z)h(z[K].object),delete z[K];delete B[V.id]}}}function x(V){for(let Y in i){let E=i[Y],S=V.isInstancedMesh===!0?V.id:0,B=E[S];if(B!==void 0){for(let z in B){let K=B[z];for(let W in K)h(K[W].object),delete K[W];delete B[z]}delete E[S],Object.keys(E).length===0&&delete i[Y]}}}function L(){k(),s=!0,a!==r&&(a=r,l(a.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:k,dispose:A,releaseStatesOfGeometry:I,releaseStatesOfObject:x,releaseStatesOfProgram:U,initAttributes:T,enableAttribute:g,disableUnusedAttributes:v}}function U_(n,e,t){let i;function r(c){i=c}function a(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function s(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let d=0;for(let m=0;m<h;m++)d+=l[m];t.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function F_(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let U=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(U){return!(U!==Br&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(U){let x=U===jr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==gr&&U!==Or&&!x&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(U){if(U==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Zt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),I=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:y,maxTextureSize:T,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:_,maxSamples:A,samples:I}}function O_(n){let e=this,t=null,i=0,r=!1,a=!1,s=new wr,o=new an,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,m){let y=f.clippingPlanes,T=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!r||y===null||y.length===0||a&&!g)a?h(null):l();else{let v=a?0:i,w=v*4,_=p.clippingState||null;c.value=_,_=h(y,d,w,m);for(let A=0;A!==w;++A)_[A]=t[A];p.clippingState=_,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,m,y){let T=f!==null?f.length:0,g=null;if(T!==0){if(g=c.value,y!==!0||g===null){let p=m+T*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,_=m;w!==T;++w,_+=4)s.copy(f[w]).applyMatrix4(v,o),s.normal.toArray(g,_),g[_+3]=s.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,g}}var Ao=4,B_=6,z_=20,k_=256,Vl=new _o,r0=new un,mf=null,vf=0,gf=0,yf=!1,V_=new he,Ns=new he,ph=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:s=256,position:o=V_}=a;mf=this._renderer.getRenderTarget(),vf=this._renderer.getActiveCubeFace(),gf=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=o0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=s0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(mf,vf,gf),this._renderer.xr.enabled=yf,e.scissorTest=!1,Eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ls||e.mapping===Ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mf=this._renderer.getRenderTarget(),vf=this._renderer.getActiveCubeFace(),gf=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vi,minFilter:Vi,generateMipmaps:!1,type:jr,format:Br,colorSpace:al,depthBuffer:!1},r=a0(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=a0(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=G_(a)),this._blurMaterial=W_(a,e,t),this._ggxMaterial=H_(a,e,t)}return r}_compileMaterial(e){let t=new Vn(new Gi,e);this._renderer.compile(t,Vl)}_sceneToCubeUV(e,t,i,r,a){let c=new ji(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,m=f.toneMapping;f.getClearColor(r0),f.toneMapping=Kr,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vn(new Er,new da({name:"PMREM.Background",side:sr,depthWrite:!1,depthTest:!1})));let T=this._backgroundBox,g=T.material,p=!1,v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(r0),p=!0);for(let w=0;w<6;w++){let _=w%3;_===0?(c.up.set(0,l[w],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+h[w],a.y,a.z)):_===1?(c.up.set(0,0,l[w]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+h[w],a.z)):(c.up.set(0,l[w],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+h[w]));let A=this._cubeSize;Eo(r,_*A,w>2?A:0,A,A),f.setRenderTarget(r),p&&f.render(T,c),f.render(e,c)}f.toneMapping=m,f.autoClear=d,e.background=v}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ls||e.mapping===Ps;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=o0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=s0());let a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;let o=a.uniforms;o.envMap.value=e;let c=this._cubeSize;Eo(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Vl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;let c=s.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),d=l*1.25,m=f*d,{_lodMax:y}=this,T=this._sizeLods[i],g=3*T*(i>y-Ao?i-y+Ao:0),p=4*(this._cubeSize-T);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=y-t,Eo(a,g,p,3*T,2*T),r.setRenderTarget(a),r.render(o,Vl),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=y-i,Eo(e,g,p,3*T,2*T),r.setRenderTarget(e),r.render(o,Vl)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){let s=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[r],f=3*h*(r>this._lodMax-Ao?r-this._lodMax+Ao:0),d=4*(this._cubeSize-h);Eo(t,f,d,3*h,2*h),s.setRenderTarget(t),s.render(c,Vl)}};function G_(n){let e=[],t=[],i=n,r=n-Ao+1+B_;for(let a=0;a<r;a++){let s=Math.pow(2,i);e.push(s);let o=1/(s-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,d=6,m=3,y=new Float32Array(m*d*f),T=new Float32Array(m*d*f);for(let p=0;p<f;p++){let v=p%3*2/3-1,w=p>2?0:-1,_=[v,w,0,v+2/3,w,0,v+2/3,w+1,0,v,w,0,v+2/3,w+1,0,v,w+1,0];y.set(_,m*d*p);for(let A=0;A<d;A++){let I=h[A*2]*2-1,U=h[A*2+1]*2-1;p===0?Ns.set(1,U,I):p===1?Ns.set(-I,1,-U):p===2?Ns.set(-I,U,1):p===3?Ns.set(-1,U,-I):p===4?Ns.set(-I,-1,U):Ns.set(I,U,-1),Ns.toArray(T,(p*d+A)*m)}}let g=new Gi;g.setAttribute("position",new Tr(y,m)),g.setAttribute("outputDirection",new Tr(T,m)),t.push(new Vn(g,null)),i>Ao&&i--}return{lodMeshes:t,sizeLods:e}}function a0(n,e,t){let i=new mr(n,e,t);return i.texture.mapping=Nl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Eo(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function H_(n,e,t){return new Ir({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:k_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function W_(n,e,t){return new Ir({name:"SphericalGaussianBlur",defines:{SAMPLES:z_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function s0(){return new Ir({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function o0(){return new Ir({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pa,depthTest:!1,depthWrite:!1})}function gh(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var mh=class extends mr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ml(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Er(5,5,5),a=new Ir({name:"CubemapFromEquirect",uniforms:Ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sr,blending:pa});a.uniforms.tEquirect.value=t;let s=new Vn(r,a),o=t.minFilter;return t.minFilter===cs&&(t.minFilter=Vi),new yu(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}};function X_(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,m=!1){return d==null?null:m?s(d):a(d)}function a(d){if(d&&d.isTexture){let m=d.mapping;if(m===bu||m===wu)if(e.has(d)){let y=e.get(d).texture;return o(y,d.mapping)}else{let y=d.image;if(y&&y.height>0){let T=new mh(y.height);return T.fromEquirectangularTexture(n,d),e.set(d,T),d.addEventListener("dispose",l),o(T.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture){let m=d.mapping,y=m===bu||m===wu,T=m===ls||m===Ps;if(y||T){let g=t.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new ph(n)),g=y?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let v=d.image;return y&&v&&v.height>0||T&&v&&c(v)?(i===null&&(i=new ph(n)),g=y?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,m){return m===bu?d.mapping=ls:m===wu&&(d.mapping=Ps),d}function c(d){let m=0,y=6;for(let T=0;T<y;T++)d[T]!==void 0&&m++;return m===y}function l(d){let m=d.target;m.removeEventListener("dispose",l);let y=e.get(m);y!==void 0&&(e.delete(m),y.dispose())}function h(d){let m=d.target;m.removeEventListener("dispose",h);let y=t.get(m);y!==void 0&&(t.delete(m),y.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function q_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Es("WebGLRenderer: "+i+" extension not supported."),r}}}function Y_(n,e,t,i){let r={},a=new WeakMap;function s(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let y in d.attributes)e.remove(d.attributes[y]);d.removeEventListener("dispose",s),delete r[d.id];let m=a.get(d);m&&(e.remove(m),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",s),r[d.id]=!0,t.memory.geometries++),d}function c(f){let d=f.attributes;for(let m in d)e.update(d[m],n.ARRAY_BUFFER)}function l(f){let d=[],m=f.index,y=f.attributes.position,T=0;if(y===void 0)return;if(m!==null){let v=m.array;T=m.version;for(let w=0,_=v.length;w<_;w+=3){let A=v[w+0],I=v[w+1],U=v[w+2];d.push(A,I,I,U,U,A)}}else{let v=y.array;T=y.version;for(let w=0,_=v.length/3-1;w<_;w+=3){let A=w+0,I=w+1,U=w+2;d.push(A,I,I,U,U,A)}}let g=new(y.count>=65535?hl:ul)(d,1);g.version=T;let p=a.get(f);p&&e.remove(p),a.set(f,g)}function h(f){let d=a.get(f);if(d){let m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return a.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Z_(n,e,t){let i;function r(f){i=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function c(f,d){n.drawElements(i,d,a,f*s),t.update(d,i,1)}function l(f,d,m){m!==0&&(n.drawElementsInstanced(i,d,a,f*s,m),t.update(d,i,m))}function h(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,m);let T=0;for(let g=0;g<m;g++)T+=d[g];t.update(T,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function J_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:$t("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function $_(n,e,t){let i=new WeakMap,r=new ri;function a(s,o,c){let l=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==f){let L=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",L)};d!==void 0&&d.texture.dispose();let m=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],w=0;m===!0&&(w=1),y===!0&&(w=2),T===!0&&(w=3);let _=o.attributes.position.count*w,A=1;_>e.maxTextureSize&&(A=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let I=new Float32Array(_*A*4*f),U=new ll(I,_,A,f);U.type=Or,U.needsUpdate=!0;let x=w*4;for(let k=0;k<f;k++){let V=g[k],Y=p[k],E=v[k],S=_*A*4*k;for(let B=0;B<V.count;B++){let z=B*x;m===!0&&(r.fromBufferAttribute(V,B),I[S+z+0]=r.x,I[S+z+1]=r.y,I[S+z+2]=r.z,I[S+z+3]=0),y===!0&&(r.fromBufferAttribute(Y,B),I[S+z+4]=r.x,I[S+z+5]=r.y,I[S+z+6]=r.z,I[S+z+7]=0),T===!0&&(r.fromBufferAttribute(E,B),I[S+z+8]=r.x,I[S+z+9]=r.y,I[S+z+10]=r.z,I[S+z+11]=E.itemSize===4?r.w:1)}}d={count:f,texture:U,size:new At(_,A)},i.set(o,d),o.addEventListener("dispose",L)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let m=0;for(let T=0;T<l.length;T++)m+=l[T];let y=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function K_(n,e,t,i,r){let a=new WeakMap;function s(l){let h=r.render.frame,f=l.geometry,d=e.get(l,f);if(a.get(d)!==h&&(e.update(d),a.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,h))),l.isSkinnedMesh){let m=l.skeleton;a.get(m)!==h&&(m.update(),a.set(m,h))}return d}function o(){a=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:o}}var Q_={[Gd]:"LINEAR_TONE_MAPPING",[Hd]:"REINHARD_TONE_MAPPING",[Wd]:"CINEON_TONE_MAPPING",[Xd]:"ACES_FILMIC_TONE_MAPPING",[Yd]:"AGX_TONE_MAPPING",[Zd]:"NEUTRAL_TONE_MAPPING",[qd]:"CUSTOM_TONE_MAPPING"};function j_(n,e,t,i,r,a){let s=new mr(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Gi;l.setAttribute("position",new Ln([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ln([0,2,0,0,2,0],2));let h=new ru({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Vn(l,h),d=new _o(-1,1,1,-1,0,1),m=null,y=null,T=!1,g,p=null,v=[],w=!1;this.setSize=function(_,A){s.setSize(_,A),o!==null&&o.setSize(_,A),c!==null&&c.setSize(_,A);for(let I=0;I<v.length;I++){let U=v[I];U.setSize&&U.setSize(_,A)}},this.setEffects=function(_){v=_,w=v.length>0&&v[0].isRenderPass===!0;let A=s.width,I=s.height;v.length>0&&o===null&&(o=new mr(A,I,{type:jr,depthBuffer:!1,stencilBuffer:!1}),c=new mr(A,I,{type:jr,depthBuffer:!1,stencilBuffer:!1}));for(let U=0;U<v.length;U++){let x=v[U];x.setSize&&x.setSize(A,I)}},this.begin=function(_,A){if(T||_.toneMapping===Kr&&v.length===0)return!1;if(p=A,A!==null){let I=A.width,U=A.height;(s.width!==I||s.height!==U)&&this.setSize(I,U)}return w===!1&&_.setRenderTarget(s),g=_.toneMapping,_.toneMapping=Kr,!0},this.hasRenderPass=function(){return w},this.end=function(_,A){_.toneMapping=g,T=!0;let I=s,U=o;for(let x=0;x<v.length;x++){let L=v[x];L.enabled!==!1&&(L.render(_,U,I,A),L.needsSwap!==!1&&(I=U,U=U===o?c:o))}if(m!==_.outputColorSpace||y!==_.toneMapping){m=_.outputColorSpace,y=_.toneMapping,h.defines={},_n.getTransfer(m)===Fn&&(h.defines.SRGB_TRANSFER="");let x=Q_[y];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=I.texture,_.setRenderTarget(p),_.render(f,d),p=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var A0=new er,Mf=new ns(1,1),I0=new ll,C0=new $c,R0=new ml,l0=[],c0=[],u0=new Float32Array(16),h0=new Float32Array(9),d0=new Float32Array(4);function Co(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,a=l0[r];if(a===void 0&&(a=new Float32Array(r),l0[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Ai(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ii(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function yh(n,e){let t=c0[e];t===void 0&&(t=new Int32Array(e),c0[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function eM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function tM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ai(t,e))return;n.uniform2fv(this.addr,e),Ii(t,e)}}function nM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ai(t,e))return;n.uniform3fv(this.addr,e),Ii(t,e)}}function iM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ai(t,e))return;n.uniform4fv(this.addr,e),Ii(t,e)}}function rM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ai(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ii(t,e)}else{if(Ai(t,i))return;d0.set(i),n.uniformMatrix2fv(this.addr,!1,d0),Ii(t,i)}}function aM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ai(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ii(t,e)}else{if(Ai(t,i))return;h0.set(i),n.uniformMatrix3fv(this.addr,!1,h0),Ii(t,i)}}function sM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ai(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ii(t,e)}else{if(Ai(t,i))return;u0.set(i),n.uniformMatrix4fv(this.addr,!1,u0),Ii(t,i)}}function oM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function lM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ai(t,e))return;n.uniform2iv(this.addr,e),Ii(t,e)}}function cM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ai(t,e))return;n.uniform3iv(this.addr,e),Ii(t,e)}}function uM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ai(t,e))return;n.uniform4iv(this.addr,e),Ii(t,e)}}function hM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function dM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ai(t,e))return;n.uniform2uiv(this.addr,e),Ii(t,e)}}function fM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ai(t,e))return;n.uniform3uiv(this.addr,e),Ii(t,e)}}function pM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ai(t,e))return;n.uniform4uiv(this.addr,e),Ii(t,e)}}function mM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Mf.compareFunction=t.isReversedDepthBuffer()?hh:uh,a=Mf):a=A0,t.setTexture2D(e||a,r)}function vM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||C0,r)}function gM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||R0,r)}function yM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||I0,r)}function xM(n){switch(n){case 5126:return eM;case 35664:return tM;case 35665:return nM;case 35666:return iM;case 35674:return rM;case 35675:return aM;case 35676:return sM;case 5124:case 35670:return oM;case 35667:case 35671:return lM;case 35668:case 35672:return cM;case 35669:case 35673:return uM;case 5125:return hM;case 36294:return dM;case 36295:return fM;case 36296:return pM;case 35678:case 36198:case 36298:case 36306:case 35682:return mM;case 35679:case 36299:case 36307:return vM;case 35680:case 36300:case 36308:case 36293:return gM;case 36289:case 36303:case 36311:case 36292:return yM}}function _M(n,e){n.uniform1fv(this.addr,e)}function MM(n,e){let t=Co(e,this.size,2);n.uniform2fv(this.addr,t)}function SM(n,e){let t=Co(e,this.size,3);n.uniform3fv(this.addr,t)}function bM(n,e){let t=Co(e,this.size,4);n.uniform4fv(this.addr,t)}function wM(n,e){let t=Co(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function TM(n,e){let t=Co(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function EM(n,e){let t=Co(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function AM(n,e){n.uniform1iv(this.addr,e)}function IM(n,e){n.uniform2iv(this.addr,e)}function CM(n,e){n.uniform3iv(this.addr,e)}function RM(n,e){n.uniform4iv(this.addr,e)}function PM(n,e){n.uniform1uiv(this.addr,e)}function LM(n,e){n.uniform2uiv(this.addr,e)}function NM(n,e){n.uniform3uiv(this.addr,e)}function DM(n,e){n.uniform4uiv(this.addr,e)}function UM(n,e,t){let i=this.cache,r=e.length,a=yh(t,r);Ai(i,a)||(n.uniform1iv(this.addr,a),Ii(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=Mf:s=A0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function FM(n,e,t){let i=this.cache,r=e.length,a=yh(t,r);Ai(i,a)||(n.uniform1iv(this.addr,a),Ii(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||C0,a[s])}function OM(n,e,t){let i=this.cache,r=e.length,a=yh(t,r);Ai(i,a)||(n.uniform1iv(this.addr,a),Ii(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||R0,a[s])}function BM(n,e,t){let i=this.cache,r=e.length,a=yh(t,r);Ai(i,a)||(n.uniform1iv(this.addr,a),Ii(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||I0,a[s])}function zM(n){switch(n){case 5126:return _M;case 35664:return MM;case 35665:return SM;case 35666:return bM;case 35674:return wM;case 35675:return TM;case 35676:return EM;case 5124:case 35670:return AM;case 35667:case 35671:return IM;case 35668:case 35672:return CM;case 35669:case 35673:return RM;case 5125:return PM;case 36294:return LM;case 36295:return NM;case 36296:return DM;case 35678:case 36198:case 36298:case 36306:case 35682:return UM;case 35679:case 36299:case 36307:return FM;case 35680:case 36300:case 36308:case 36293:return OM;case 36289:case 36303:case 36311:case 36292:return BM}}var Sf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=xM(t.type)}},bf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zM(t.type)}},wf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let o=r[a];o.setValue(e,t[o.id],i)}}},xf=/(\w+)(\])?(\[|\.)?/g;function f0(n,e){n.seq.push(e),n.map[e.id]=e}function kM(n,e,t){let i=n.name,r=i.length;for(xf.lastIndex=0;;){let a=xf.exec(i),s=xf.lastIndex,o=a[1],c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){f0(t,l===void 0?new Sf(o,n,e):new bf(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new wf(o),f0(t,f)),t=f}}}var Io=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);kM(o,c,this)}let r=[],a=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){let o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function p0(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var VM=37297,GM=0;function HM(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){let o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}var m0=new an;function WM(n){_n._getMatrix(m0,_n.workingColorSpace,n);let e=`mat3( ${m0.elements.map(t=>t.toFixed(4))} )`;switch(_n.getTransfer(n)){case sl:return[e,"LinearTransferOETF"];case Fn:return[e,"sRGBTransferOETF"];default:return Zt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function v0(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+HM(n.getShaderSource(e),o)}else return a}function XM(n,e){let t=WM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var qM={[Gd]:"Linear",[Hd]:"Reinhard",[Wd]:"Cineon",[Xd]:"ACESFilmic",[Yd]:"AgX",[Zd]:"Neutral",[qd]:"Custom"};function YM(n,e){let t=qM[e];return t===void 0?(Zt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var fh=new he;function ZM(){_n.getLuminanceCoefficients(fh);let n=fh.x.toFixed(4),e=fh.y.toFixed(4),t=fh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hl).join(`
`)}function $M(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function KM(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let a=n.getActiveAttrib(e,r),s=a.name,o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Hl(n){return n!==""}function g0(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function y0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var QM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tf(n){return n.replace(QM,eS)}var jM=new Map;function eS(n,e){let t=hn[e];if(t===void 0){let i=jM.get(e);if(i!==void 0)t=hn[i],Zt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Tf(t)}var tS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function x0(n){return n.replace(tS,nS)}function nS(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function _0(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var iS={[Ll]:"SHADOWMAP_TYPE_PCF",[Mo]:"SHADOWMAP_TYPE_VSM"};function rS(n){return iS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var aS={[ls]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE",[Nl]:"ENVMAP_TYPE_CUBE_UV"};function sS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":aS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var oS={[Ps]:"ENVMAP_MODE_REFRACTION"};function lS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":oS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cS={[Su]:"ENVMAP_BLENDING_MULTIPLY",[Nm]:"ENVMAP_BLENDING_MIX",[Dm]:"ENVMAP_BLENDING_ADD"};function uS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":cS[n.combine]||"ENVMAP_BLENDING_NONE"}function hS(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function dS(n,e,t,i){let r=n.getContext(),a=t.defines,s=t.vertexShader,o=t.fragmentShader,c=rS(t),l=sS(t),h=lS(t),f=uS(t),d=hS(t),m=JM(t),y=$M(a),T=r.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Hl).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Hl).join(`
`),p.length>0&&(p+=`
`)):(g=[_0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hl).join(`
`),p=[_0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kr?"#define TONE_MAPPING":"",t.toneMapping!==Kr?hn.tonemapping_pars_fragment:"",t.toneMapping!==Kr?YM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",hn.colorspace_pars_fragment,XM("linearToOutputTexel",t.outputColorSpace),ZM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hl).join(`
`)),s=Tf(s),s=g0(s,t),s=y0(s,t),o=Tf(o),o=g0(o,t),o=y0(o,t),s=x0(s),o=x0(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===nf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=v+g+s,_=v+p+o,A=p0(r,r.VERTEX_SHADER,w),I=p0(r,r.FRAGMENT_SHADER,_);r.attachShader(T,A),r.attachShader(T,I),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function U(V){if(n.debug.checkShaderErrors){let Y=r.getProgramInfoLog(T)||"",E=r.getShaderInfoLog(A)||"",S=r.getShaderInfoLog(I)||"",B=Y.trim(),z=E.trim(),K=S.trim(),W=!0,O=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,T,A,I);else{let ne=v0(r,A,"vertex"),ae=v0(r,I,"fragment");$t("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+B+`
`+ne+`
`+ae)}else B!==""?Zt("WebGLProgram: Program Info Log:",B):(z===""||K==="")&&(O=!1);O&&(V.diagnostics={runnable:W,programLog:B,vertexShader:{log:z,prefix:g},fragmentShader:{log:K,prefix:p}})}r.deleteShader(A),r.deleteShader(I),x=new Io(r,T),L=KM(r,T)}let x;this.getUniforms=function(){return x===void 0&&U(this),x};let L;this.getAttributes=function(){return L===void 0&&U(this),L};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(T,VM)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=GM++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=A,this.fragmentShader=I,this}var fS=0,Ef=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Af(e),t.set(e,i)),i}},Af=class{constructor(e){this.id=fS++,this.code=e,this.usedTimes=0}};function pS(n){return n===hs||n===zl||n===kl}function mS(n,e,t,i,r,a){let s=new ho,o=new Ef,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(x){return c.add(x),x===0?"uv":`uv${x}`}function T(x,L,k,V,Y,E){let S=V.fog,B=Y.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?V.environment:null,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,W=e.get(x.envMap||z,K),O=W&&W.mapping===Nl?W.image.height:null,ne=m[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Zt("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xe=ae!==void 0?ae.length:0,be=0;B.morphAttributes.position!==void 0&&(be=1),B.morphAttributes.normal!==void 0&&(be=2),B.morphAttributes.color!==void 0&&(be=3);let fe,Ie,De,re;if(ne){let Ye=va[ne];fe=Ye.vertexShader,Ie=Ye.fragmentShader}else{fe=x.vertexShader,Ie=x.fragmentShader;let Ye=o.getVertexShaderStage(x),Wt=o.getFragmentShaderStage(x);o.update(x,Ye,Wt),De=Ye.id,re=Wt.id}let le=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),ze=Y.isInstancedMesh===!0,Fe=Y.isBatchedMesh===!0,ft=!!x.map,Ot=!!x.matcap,ut=!!W,It=!!x.aoMap,pt=!!x.lightMap,bt=!!x.bumpMap&&x.wireframe===!1,Ve=!!x.normalMap,fn=!!x.displacementMap,en=!!x.emissiveMap,Bt=!!x.metalnessMap,tn=!!x.roughnessMap,ee=x.anisotropy>0,Qt=x.clearcoat>0,Xt=x.dispersion>0,G=x.retroreflectivity>0,b=x.iridescence>0,oe=x.sheen>0,ue=x.transmission>0,Me=ee&&!!x.anisotropyMap,ke=Qt&&!!x.clearcoatMap,We=Qt&&!!x.clearcoatNormalMap,Se=Qt&&!!x.clearcoatRoughnessMap,we=b&&!!x.iridescenceMap,Je=b&&!!x.iridescenceThicknessMap,gt=oe&&!!x.sheenColorMap,$e=oe&&!!x.sheenRoughnessMap,Pe=!!x.specularMap,yt=!!x.specularColorMap,et=!!x.specularIntensityMap,Lt=ue&&!!x.transmissionMap,ie=ue&&!!x.thicknessMap,nt=!!x.gradientMap,Ce=!!x.alphaMap,je=x.alphaTest>0,ot=!!x.alphaHash,Oe=!!x.extensions,ht=Kr;x.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ht=n.toneMapping);let Ge={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:fe,fragmentShader:Ie,defines:x.defines,customVertexShaderID:De,customFragmentShaderID:re,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Fe,batchingColor:Fe&&Y._colorsTexture!==null,instancing:ze,instancingColor:ze&&Y.instanceColor!==null,instancingMorph:ze&&Y.morphTexture!==null,outputColorSpace:le===null?n.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:_n.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ft,matcap:Ot,envMap:ut,envMapMode:ut&&W.mapping,envMapCubeUVHeight:O,aoMap:It,lightMap:pt,bumpMap:bt,normalMap:Ve,displacementMap:fn,emissiveMap:en,normalMapObjectSpace:Ve&&x.normalMapType===Om,normalMapTangentSpace:Ve&&x.normalMapType===ch,packedNormalMap:Ve&&x.normalMapType===ch&&pS(x.normalMap.format),metalnessMap:Bt,roughnessMap:tn,anisotropy:ee,anisotropyMap:Me,clearcoat:Qt,clearcoatMap:ke,clearcoatNormalMap:We,clearcoatRoughnessMap:Se,dispersion:Xt,retroreflection:G,iridescence:b,iridescenceMap:we,iridescenceThicknessMap:Je,sheen:oe,sheenColorMap:gt,sheenRoughnessMap:$e,specularMap:Pe,specularColorMap:yt,specularIntensityMap:et,transmission:ue,transmissionMap:Lt,thicknessMap:ie,gradientMap:nt,opaque:x.transparent===!1&&x.blending===So&&x.alphaToCoverage===!1,alphaMap:Ce,alphaTest:je,alphaHash:ot,combine:x.combine,mapUv:ft&&y(x.map.channel),aoMapUv:It&&y(x.aoMap.channel),lightMapUv:pt&&y(x.lightMap.channel),bumpMapUv:bt&&y(x.bumpMap.channel),normalMapUv:Ve&&y(x.normalMap.channel),displacementMapUv:fn&&y(x.displacementMap.channel),emissiveMapUv:en&&y(x.emissiveMap.channel),metalnessMapUv:Bt&&y(x.metalnessMap.channel),roughnessMapUv:tn&&y(x.roughnessMap.channel),anisotropyMapUv:Me&&y(x.anisotropyMap.channel),clearcoatMapUv:ke&&y(x.clearcoatMap.channel),clearcoatNormalMapUv:We&&y(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&y(x.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&y(x.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&y(x.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&y(x.sheenColorMap.channel),sheenRoughnessMapUv:$e&&y(x.sheenRoughnessMap.channel),specularMapUv:Pe&&y(x.specularMap.channel),specularColorMapUv:yt&&y(x.specularColorMap.channel),specularIntensityMapUv:et&&y(x.specularIntensityMap.channel),transmissionMapUv:Lt&&y(x.transmissionMap.channel),thicknessMapUv:ie&&y(x.thicknessMap.channel),alphaMapUv:Ce&&y(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ve||ee),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!B.attributes.uv&&(ft||Ce),fog:!!S,useFog:x.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&Ve===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Re,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:be,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:E.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:ht,decodeVideoTexture:ft&&x.map.isVideoTexture===!0&&_n.getTransfer(x.map.colorSpace)===Fn,decodeVideoTextureEmissive:en&&x.emissiveMap.isVideoTexture===!0&&_n.getTransfer(x.emissiveMap.colorSpace)===Fn,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vr,flipSided:x.side===sr,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Oe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&x.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function g(x){let L=[];if(x.shaderID?L.push(x.shaderID):(L.push(x.customVertexShaderID),L.push(x.customFragmentShaderID)),x.defines!==void 0)for(let k in x.defines)L.push(k),L.push(x.defines[k]);return x.isRawShaderMaterial===!1&&(p(L,x),v(L,x),L.push(n.outputColorSpace)),L.push(x.customProgramCacheKey),L.join()}function p(x,L){x.push(L.precision),x.push(L.outputColorSpace),x.push(L.envMapMode),x.push(L.envMapCubeUVHeight),x.push(L.mapUv),x.push(L.alphaMapUv),x.push(L.lightMapUv),x.push(L.aoMapUv),x.push(L.bumpMapUv),x.push(L.normalMapUv),x.push(L.displacementMapUv),x.push(L.emissiveMapUv),x.push(L.metalnessMapUv),x.push(L.roughnessMapUv),x.push(L.anisotropyMapUv),x.push(L.clearcoatMapUv),x.push(L.clearcoatNormalMapUv),x.push(L.clearcoatRoughnessMapUv),x.push(L.iridescenceMapUv),x.push(L.iridescenceThicknessMapUv),x.push(L.sheenColorMapUv),x.push(L.sheenRoughnessMapUv),x.push(L.specularMapUv),x.push(L.specularColorMapUv),x.push(L.specularIntensityMapUv),x.push(L.transmissionMapUv),x.push(L.thicknessMapUv),x.push(L.combine),x.push(L.fogExp2),x.push(L.sizeAttenuation),x.push(L.morphTargetsCount),x.push(L.morphAttributeCount),x.push(L.numSunLights),x.push(L.numDirLights),x.push(L.numPointLights),x.push(L.numSpotLights),x.push(L.numSpotLightMaps),x.push(L.numHemiLights),x.push(L.numRectAreaLights),x.push(L.numSunLightShadows),x.push(L.numDirLightShadows),x.push(L.numPointLightShadows),x.push(L.numSpotLightShadows),x.push(L.numSpotLightShadowsWithMaps),x.push(L.numLightProbes),x.push(L.shadowMapType),x.push(L.toneMapping),x.push(L.numClippingPlanes),x.push(L.numClipIntersection),x.push(L.depthPacking)}function v(x,L){s.disableAll(),L.instancing&&s.enable(0),L.instancingColor&&s.enable(1),L.instancingMorph&&s.enable(2),L.matcap&&s.enable(3),L.envMap&&s.enable(4),L.normalMapObjectSpace&&s.enable(5),L.normalMapTangentSpace&&s.enable(6),L.clearcoat&&s.enable(7),L.iridescence&&s.enable(8),L.alphaTest&&s.enable(9),L.vertexColors&&s.enable(10),L.vertexAlphas&&s.enable(11),L.vertexUv1s&&s.enable(12),L.vertexUv2s&&s.enable(13),L.vertexUv3s&&s.enable(14),L.vertexTangents&&s.enable(15),L.anisotropy&&s.enable(16),L.alphaHash&&s.enable(17),L.batching&&s.enable(18),L.dispersion&&s.enable(19),L.retroreflection&&s.enable(24),L.batchingColor&&s.enable(20),L.gradientMap&&s.enable(21),L.packedNormalMap&&s.enable(22),L.vertexNormals&&s.enable(23),x.push(s.mask),s.disableAll(),L.fog&&s.enable(0),L.useFog&&s.enable(1),L.flatShading&&s.enable(2),L.logarithmicDepthBuffer&&s.enable(3),L.reversedDepthBuffer&&s.enable(4),L.skinning&&s.enable(5),L.morphTargets&&s.enable(6),L.morphNormals&&s.enable(7),L.morphColors&&s.enable(8),L.premultipliedAlpha&&s.enable(9),L.shadowMapEnabled&&s.enable(10),L.doubleSided&&s.enable(11),L.flipSided&&s.enable(12),L.useDepthPacking&&s.enable(13),L.dithering&&s.enable(14),L.transmission&&s.enable(15),L.sheen&&s.enable(16),L.opaque&&s.enable(17),L.pointsUvs&&s.enable(18),L.decodeVideoTexture&&s.enable(19),L.decodeVideoTextureEmissive&&s.enable(20),L.alphaToCoverage&&s.enable(21),L.numLightProbeGrids>0&&s.enable(22),L.hasPositionAttribute&&s.enable(23),x.push(s.mask)}function w(x){let L=m[x.type],k;if(L){let V=va[L];k=t0.clone(V.uniforms)}else k=x.uniforms;return k}function _(x,L){let k=h.get(L);return k!==void 0?++k.usedTimes:(k=new dS(n,L,x,r),l.push(k),h.set(L,k)),k}function A(x){if(--x.usedTimes===0){let L=l.indexOf(x);l[L]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function I(x){o.remove(x)}function U(){o.dispose()}return{getParameters:T,getProgramCacheKey:g,getUniforms:w,acquireProgram:_,releaseProgram:A,releaseShaderCache:I,programs:l,dispose:U}}function vS(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function gS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function M0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function S0(){let n=[],e=0,t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,y,T,g,p){let v=n[e];return v===void 0?(v={id:d.id,object:d,geometry:m,material:y,materialVariant:s(d),groupOrder:T,renderOrder:d.renderOrder,z:g,group:p},n[e]=v):(v.id=d.id,v.object=d,v.geometry=m,v.material=y,v.materialVariant=s(d),v.groupOrder=T,v.renderOrder=d.renderOrder,v.z=g,v.group=p),e++,v}function c(d,m,y,T,g,p,v){v.reversedDepth===!0&&(g=-g);let w=o(d,m,y,T,g,p);y.transmission>0?i.push(w):y.transparent===!0?r.push(w):t.push(w)}function l(d,m,y,T,g,p){let v=o(d,m,y,T,g,p);y.transmission>0?i.unshift(v):y.transparent===!0?r.unshift(v):t.unshift(v)}function h(d,m){t.length>1&&t.sort(d||gS),i.length>1&&i.sort(m||M0),r.length>1&&r.sort(m||M0)}function f(){for(let d=e,m=n.length;d<m;d++){let y=n[d];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:l,finish:f,sort:h}}function yS(){let n=new WeakMap;function e(i,r){let a=n.get(i),s;return a===void 0?(s=new S0,n.set(i,[s])):r>=a.length?(s=new S0,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function xS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new he,color:new un};break;case"SpotLight":t={position:new he,direction:new he,color:new un,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new he,color:new un,distance:0,decay:0};break;case"HemisphereLight":t={direction:new he,skyColor:new un,groundColor:new un};break;case"RectAreaLight":t={color:new un,position:new he,halfWidth:new he,halfHeight:new he};break}return n[e.id]=t,t}}}function _S(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var MS=0;function SS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function bS(n){let e=new xS,t=_S(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new he);let r=new he,a=new On,s=new On;function o(l){let h=0,f=0,d=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let m=0,y=0,T=0,g=0,p=0,v=0,w=0,_=0,A=0,I=0,U=0,x=0,L=0,k=0;l.sort(SS);for(let Y=0,E=l.length;Y<E;Y++){let S=l[Y],B=S.color,z=S.intensity,K=S.distance,W=null;if(S.shadow&&S.shadow.map&&(S.shadow.map.texture.format===hs?W=S.shadow.map.texture:W=S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)h+=B.r*z,f+=B.g*z,d+=B.b*z;else if(S.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(S.sh.coefficients[O],z);k++}else if(S.isSunLight){let O=e.get(S);if(O.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let ne=S.shadow,ae=t.get(S);ae.shadowIntensity=ne.intensity,ae.shadowBias=ne.bias,ae.shadowNormalBias=ne.normalBias,ae.shadowRadius=ne.radius,ae.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),i.sunShadow[y]=ae,i.sunShadowMap[y]=W;let xe=ne.getViewportCount();for(let be=0;be<xe;be++)i.sunShadowMatrix[T+be]=ne.getMatrix(be),i.sunShadowCascade[T+be]=ne._cascadeData[be];T+=xe,y++}i.sun[m]=O,m++}else if(S.isDirectionalLight){let O=e.get(S);if(O.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let ne=S.shadow,ae=t.get(S);ae.shadowIntensity=ne.intensity,ae.shadowBias=ne.bias,ae.shadowNormalBias=ne.normalBias,ae.shadowRadius=ne.radius,ae.shadowMapSize=ne.mapSize,i.directionalShadow[g]=ae,i.directionalShadowMap[g]=W,i.directionalShadowMatrix[g]=S.shadow.matrix,A++}i.directional[g]=O,g++}else if(S.isSpotLight){let O=e.get(S);O.position.setFromMatrixPosition(S.matrixWorld),O.color.copy(B).multiplyScalar(z),O.distance=K,O.coneCos=Math.cos(S.angle),O.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),O.decay=S.decay,i.spot[v]=O;let ne=S.shadow;if(S.map&&(i.spotLightMap[x]=S.map,x++,ne.updateMatrices(S),S.castShadow&&L++),i.spotLightMatrix[v]=ne.matrix,S.castShadow){let ae=t.get(S);ae.shadowIntensity=ne.intensity,ae.shadowBias=ne.bias,ae.shadowNormalBias=ne.normalBias,ae.shadowRadius=ne.radius,ae.shadowMapSize=ne.mapSize,i.spotShadow[v]=ae,i.spotShadowMap[v]=W,U++}v++}else if(S.isRectAreaLight){let O=e.get(S);O.color.copy(B).multiplyScalar(z),O.halfWidth.set(S.width*.5,0,0),O.halfHeight.set(0,S.height*.5,0),i.rectArea[w]=O,w++}else if(S.isPointLight){let O=e.get(S);if(O.color.copy(S.color).multiplyScalar(S.intensity),O.distance=S.distance,O.decay=S.decay,S.castShadow){let ne=S.shadow,ae=t.get(S);ae.shadowIntensity=ne.intensity,ae.shadowBias=ne.bias,ae.shadowNormalBias=ne.normalBias,ae.shadowRadius=ne.radius,ae.shadowMapSize=ne.mapSize,ae.shadowCameraNear=ne.camera.near,ae.shadowCameraFar=ne.camera.far,i.pointShadow[p]=ae,i.pointShadowMap[p]=W,i.pointShadowMatrix[p]=S.shadow.matrix,I++}i.point[p]=O,p++}else if(S.isHemisphereLight){let O=e.get(S);O.skyColor.copy(S.color).multiplyScalar(z),O.groundColor.copy(S.groundColor).multiplyScalar(z),i.hemi[_]=O,_++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;let V=i.hash;(V.sunLength!==m||V.directionalLength!==g||V.pointLength!==p||V.spotLength!==v||V.rectAreaLength!==w||V.hemiLength!==_||V.numSunShadows!==y||V.numDirectionalShadows!==A||V.numPointShadows!==I||V.numSpotShadows!==U||V.numSpotMaps!==x||V.numLightProbes!==k)&&(i.sun.length=m,i.directional.length=g,i.spot.length=v,i.rectArea.length=w,i.point.length=p,i.hemi.length=_,i.sunShadow.length=y,i.sunShadowMap.length=y,i.sunShadowMatrix.length=T,i.sunShadowCascade.length=T,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=I,i.pointShadowMap.length=I,i.pointShadowMatrix.length=I,i.spotShadow.length=U,i.spotShadowMap.length=U,i.spotLightMatrix.length=U+x-L,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=k,V.sunLength=m,V.directionalLength=g,V.pointLength=p,V.spotLength=v,V.rectAreaLength=w,V.hemiLength=_,V.numSunShadows=y,V.numDirectionalShadows=A,V.numPointShadows=I,V.numSpotShadows=U,V.numSpotMaps=x,V.numLightProbes=k,i.version=MS++)}function c(l,h){let f=0,d=0,m=0,y=0,T=0,g=0,p=h.matrixWorldInverse;for(let v=0,w=l.length;v<w;v++){let _=l[v];if(_.isSunLight){let A=i.sun[f];A.direction.setFromMatrixPosition(_.matrixWorld),A.direction.transformDirection(p),f++}else if(_.isDirectionalLight){let A=i.directional[d];A.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),d++}else if(_.isSpotLight){let A=i.spot[y];A.position.setFromMatrixPosition(_.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),y++}else if(_.isRectAreaLight){let A=i.rectArea[T];A.position.setFromMatrixPosition(_.matrixWorld),A.position.applyMatrix4(p),s.identity(),a.copy(_.matrixWorld),a.premultiply(p),s.extractRotation(a),A.halfWidth.set(_.width*.5,0,0),A.halfHeight.set(0,_.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),T++}else if(_.isPointLight){let A=i.point[m];A.position.setFromMatrixPosition(_.matrixWorld),A.position.applyMatrix4(p),m++}else if(_.isHemisphereLight){let A=i.hemi[g];A.direction.setFromMatrixPosition(_.matrixWorld),A.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:i}}function b0(n){let e=new bS(n),t=[],i=[],r=[];function a(d){f.camera=d,t.length=0,i.length=0,r.length=0}function s(d){t.push(d)}function o(d){i.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:l,setupLightsView:h,pushLight:s,pushShadow:o,pushLightProbeGrid:c}}function wS(n){let e=new WeakMap;function t(r,a=0){let s=e.get(r),o;return s===void 0?(o=new b0(n),e.set(r,[o])):a>=s.length?(o=new b0(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var TS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ES=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,AS=[new he(1,0,0),new he(-1,0,0),new he(0,1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1)],IS=[new he(0,-1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1),new he(0,-1,0),new he(0,-1,0)],w0=new On,Gl=new he,_f=new he;function CS(n,e,t){let i=new po,r=new At,a=new At,s=new ri,o=new au,c=new su,l={},h=t.maxTextureSize,f={[os]:sr,[sr]:os,[vr]:vr},d=new Ir({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:TS,fragmentShader:ES}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let y=new Gi;y.setAttribute("position",new Tr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new Vn(y,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ll;let p=this.type;this.render=function(I,U,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||I.length===0)return;this.type===Mu&&(Zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ll);let L=n.getRenderTarget(),k=n.getActiveCubeFace(),V=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(pa),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let E=p!==this.type;E&&U.traverse(function(S){S.material&&(Array.isArray(S.material)?S.material.forEach(B=>B.needsUpdate=!0):S.material.needsUpdate=!0)});for(let S=0,B=I.length;S<B;S++){let z=I[S],K=z.shadow;if(K===void 0){Zt("WebGLShadowMap:",z,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);let W=K.getFrameExtents();r.multiply(W),a.copy(K.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/W.x),r.x=a.x*W.x,K.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/W.y),r.y=a.y*W.y,K.mapSize.y=a.y));let O=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=O,K.map===null||E===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Mo){if(z.isPointLight){Zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new mr(r.x,r.y,{format:hs,type:jr,minFilter:Vi,magFilter:Vi,generateMipmaps:!1}),K.map.texture.name=z.name+".shadowMap",K.map.depthTexture=new ns(r.x,r.y,Or),K.map.depthTexture.name=z.name+".shadowMapDepth",K.map.depthTexture.format=la,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Fi,K.map.depthTexture.magFilter=Fi}else z.isPointLight?(K.map=new mh(r.x),K.map.depthTexture=new Kc(r.x,Qr)):(K.map=new mr(r.x,r.y),K.map.depthTexture=new ns(r.x,r.y,Qr)),K.map.depthTexture.name=z.name+".shadowMap",K.map.depthTexture.format=la,this.type===Ll?(K.map.depthTexture.compareFunction=O?hh:uh,K.map.depthTexture.minFilter=Vi,K.map.depthTexture.magFilter=Vi):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Fi,K.map.depthTexture.magFilter=Fi);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==r.x||K.map.height!==r.y)&&K.map.setSize(r.x,r.y);let ne=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();z.isPointLight!==!0&&K.updateMatrices(z,x);for(let ae=0;ae<ne;ae++){let xe=K.getCamera(ae);if(z.isPointLight){let be=K.camera,fe=K.matrix,Ie=z.distance||be.far;Ie!==be.far&&(be.far=Ie,be.updateProjectionMatrix()),Gl.setFromMatrixPosition(z.matrixWorld),be.position.copy(Gl),_f.copy(be.position),_f.add(AS[ae]),be.up.copy(IS[ae]),be.lookAt(_f),be.updateMatrixWorld(),fe.makeTranslation(-Gl.x,-Gl.y,-Gl.z),w0.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),K._frustum.setFromProjectionMatrix(w0,be.coordinateSystem,be.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(K.map),n.clear());let be=K.getViewport(ae);s.set(a.x*be.x,a.y*be.y,a.x*be.z,a.y*be.w),Y.viewport(s)}i=K.getFrustum(ae),_(U,x,xe,z,this.type)}K.isPointLightShadow!==!0&&this.type===Mo&&v(K,x),K.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(L,k,V)};function v(I,U){let x=e.update(T);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,m.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),I.mapPass===null?I.mapPass=new mr(r.x,r.y,{format:hs,type:jr}):(I.mapPass.width!==I.map.width||I.mapPass.height!==I.map.height)&&I.mapPass.setSize(I.map.width,I.map.height),d.uniforms.shadow_pass.value=I.map.depthTexture,d.uniforms.resolution.value.set(I.map.width,I.map.height),d.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(U,null,x,d,T,null),m.uniforms.shadow_pass.value=I.mapPass.texture,m.uniforms.resolution.value.set(I.map.width,I.map.height),m.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(U,null,x,m,T,null)}function w(I,U,x,L){let k=null,V=x.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(V!==void 0)k=V;else if(k=x.isPointLight===!0?c:o,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){let Y=k.uuid,E=U.uuid,S=l[Y];S===void 0&&(S={},l[Y]=S);let B=S[E];B===void 0&&(B=k.clone(),S[E]=B,U.addEventListener("dispose",A)),k=B}if(k.visible=U.visible,k.wireframe=U.wireframe,L===Mo?k.side=U.shadowSide!==null?U.shadowSide:U.side:k.side=U.shadowSide!==null?U.shadowSide:f[U.side],k.alphaMap=U.alphaMap,k.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,k.map=U.map,k.clipShadows=U.clipShadows,k.clippingPlanes=U.clippingPlanes,k.clipIntersection=U.clipIntersection,k.displacementMap=U.displacementMap,k.displacementScale=U.displacementScale,k.displacementBias=U.displacementBias,k.wireframeLinewidth=U.wireframeLinewidth,k.linewidth=U.linewidth,x.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let Y=n.properties.get(k);Y.light=x}return k}function _(I,U,x,L,k){if(I.visible===!1)return;if(I.layers.test(U.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&k===Mo)&&(!I.frustumCulled||I.intersectsFrustum(i))){I.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,I.matrixWorld);let E=e.update(I),S=I.material;if(Array.isArray(S)){let B=E.groups;for(let z=0,K=B.length;z<K;z++){let W=B[z],O=S[W.materialIndex];if(O&&O.visible){let ne=w(I,O,L,k);I.onBeforeShadow(n,I,U,x,E,ne,W),n.renderBufferDirect(x,null,E,ne,I,W),I.onAfterShadow(n,I,U,x,E,ne,W)}}}else if(S.visible){let B=w(I,S,L,k);I.onBeforeShadow(n,I,U,x,E,B,null),n.renderBufferDirect(x,null,E,B,I,null),I.onAfterShadow(n,I,U,x,E,B,null)}}let Y=I.children;for(let E=0,S=Y.length;E<S;E++)_(Y[E],U,x,L,k)}function A(I){I.target.removeEventListener("dispose",A);for(let x in l){let L=l[x],k=I.target.uuid;k in L&&(L[k].dispose(),delete L[k])}}}function RS(n,e){function t(){let ie=!1,nt=new ri,Ce=null,je=new ri(0,0,0,0);return{setMask:function(ot){Ce!==ot&&!ie&&(n.colorMask(ot,ot,ot,ot),Ce=ot)},setLocked:function(ot){ie=ot},setClear:function(ot,Oe,ht,Ge,Ye){Ye===!0&&(ot*=Ge,Oe*=Ge,ht*=Ge),nt.set(ot,Oe,ht,Ge),je.equals(nt)===!1&&(n.clearColor(ot,Oe,ht,Ge),je.copy(nt))},reset:function(){ie=!1,Ce=null,je.set(-1,0,0,0)}}}function i(){let ie=!1,nt=!1,Ce=null,je=null,ot=null;return{setReversed:function(Oe){if(nt!==Oe){let ht=e.get("EXT_clip_control");Oe?ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.ZERO_TO_ONE_EXT):ht.clipControlEXT(ht.LOWER_LEFT_EXT,ht.NEGATIVE_ONE_TO_ONE_EXT),nt=Oe;let Ge=ot;ot=null,this.setClear(Ge)}},getReversed:function(){return nt},setTest:function(Oe){Oe?le(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(Oe){Ce!==Oe&&!ie&&(n.depthMask(Oe),Ce=Oe)},setFunc:function(Oe){if(nt&&(Oe=Jm[Oe]),je!==Oe){switch(Oe){case Oc:n.depthFunc(n.NEVER);break;case Bc:n.depthFunc(n.ALWAYS);break;case zc:n.depthFunc(n.LESS);break;case oo:n.depthFunc(n.LEQUAL);break;case kc:n.depthFunc(n.EQUAL);break;case Vc:n.depthFunc(n.GEQUAL);break;case Gc:n.depthFunc(n.GREATER);break;case Hc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}je=Oe}},setLocked:function(Oe){ie=Oe},setClear:function(Oe){ot!==Oe&&(ot=Oe,nt&&(Oe=1-Oe),n.clearDepth(Oe))},reset:function(){ie=!1,Ce=null,je=null,ot=null,nt=!1}}}function r(){let ie=!1,nt=null,Ce=null,je=null,ot=null,Oe=null,ht=null,Ge=null,Ye=null;return{setTest:function(Wt){ie||(Wt?le(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(Wt){nt!==Wt&&!ie&&(n.stencilMask(Wt),nt=Wt)},setFunc:function(Wt,qt,kt){(Ce!==Wt||je!==qt||ot!==kt)&&(n.stencilFunc(Wt,qt,kt),Ce=Wt,je=qt,ot=kt)},setOp:function(Wt,qt,kt){(Oe!==Wt||ht!==qt||Ge!==kt)&&(n.stencilOp(Wt,qt,kt),Oe=Wt,ht=qt,Ge=kt)},setLocked:function(Wt){ie=Wt},setClear:function(Wt){Ye!==Wt&&(n.clearStencil(Wt),Ye=Wt)},reset:function(){ie=!1,nt=null,Ce=null,je=null,ot=null,Oe=null,ht=null,Ge=null,Ye=null}}}let a=new t,s=new i,o=new r,c=new WeakMap,l=new WeakMap,h={},f={},d={},m=new WeakMap,y=[],T=null,g=!1,p=null,v=null,w=null,_=null,A=null,I=null,U=null,x=new un(0,0,0),L=0,k=!1,V=null,Y=null,E=null,S=null,B=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,W=0,O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),K=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),K=W>=2);let ne=null,ae={},xe=n.getParameter(n.SCISSOR_BOX),be=n.getParameter(n.VIEWPORT),fe=new ri().fromArray(xe),Ie=new ri().fromArray(be);function De(ie,nt,Ce,je){let ot=new Uint8Array(4),Oe=n.createTexture();n.bindTexture(ie,Oe),n.texParameteri(ie,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(ie,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ht=0;ht<Ce;ht++)ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,je,0,n.RGBA,n.UNSIGNED_BYTE,ot):n.texImage2D(nt+ht,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ot);return Oe}let re={};re[n.TEXTURE_2D]=De(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=De(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=De(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=De(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),le(n.DEPTH_TEST),s.setFunc(oo),bt(!1),Ve(Fd),le(n.CULL_FACE),It(pa);function le(ie){h[ie]!==!0&&(n.enable(ie),h[ie]=!0)}function Re(ie){h[ie]!==!1&&(n.disable(ie),h[ie]=!1)}function ze(ie,nt){return d[ie]!==nt?(n.bindFramebuffer(ie,nt),d[ie]=nt,ie===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=nt),ie===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function Fe(ie,nt){let Ce=y,je=!1;if(ie){Ce=m.get(nt),Ce===void 0&&(Ce=[],m.set(nt,Ce));let ot=ie.textures;if(Ce.length!==ot.length||Ce[0]!==n.COLOR_ATTACHMENT0){for(let Oe=0,ht=ot.length;Oe<ht;Oe++)Ce[Oe]=n.COLOR_ATTACHMENT0+Oe;Ce.length=ot.length,je=!0}}else Ce[0]!==n.BACK&&(Ce[0]=n.BACK,je=!0);je&&n.drawBuffers(Ce)}function ft(ie){return T!==ie?(n.useProgram(ie),T=ie,!0):!1}let Ot={[Rs]:n.FUNC_ADD,[vm]:n.FUNC_SUBTRACT,[gm]:n.FUNC_REVERSE_SUBTRACT};Ot[ym]=n.MIN,Ot[xm]=n.MAX;let ut={[_m]:n.ZERO,[Mm]:n.ONE,[Sm]:n.SRC_COLOR,[kd]:n.SRC_ALPHA,[Im]:n.SRC_ALPHA_SATURATE,[Em]:n.DST_COLOR,[wm]:n.DST_ALPHA,[bm]:n.ONE_MINUS_SRC_COLOR,[Vd]:n.ONE_MINUS_SRC_ALPHA,[Am]:n.ONE_MINUS_DST_COLOR,[Tm]:n.ONE_MINUS_DST_ALPHA,[Cm]:n.CONSTANT_COLOR,[Rm]:n.ONE_MINUS_CONSTANT_COLOR,[Pm]:n.CONSTANT_ALPHA,[Lm]:n.ONE_MINUS_CONSTANT_ALPHA};function It(ie,nt,Ce,je,ot,Oe,ht,Ge,Ye,Wt){if(ie===pa){g===!0&&(Re(n.BLEND),g=!1);return}if(g===!1&&(le(n.BLEND),g=!0),ie!==mm){if(ie!==p||Wt!==k){if((v!==Rs||A!==Rs)&&(n.blendEquation(n.FUNC_ADD),v=Rs,A=Rs),Wt)switch(ie){case So:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFunc(n.ONE,n.ONE);break;case Bd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:$t("WebGLState: Invalid blending: ",ie);break}else switch(ie){case So:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Bd:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zd:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",ie);break}w=null,_=null,I=null,U=null,x.set(0,0,0),L=0,p=ie,k=Wt}return}ot=ot||nt,Oe=Oe||Ce,ht=ht||je,(nt!==v||ot!==A)&&(n.blendEquationSeparate(Ot[nt],Ot[ot]),v=nt,A=ot),(Ce!==w||je!==_||Oe!==I||ht!==U)&&(n.blendFuncSeparate(ut[Ce],ut[je],ut[Oe],ut[ht]),w=Ce,_=je,I=Oe,U=ht),(Ge.equals(x)===!1||Ye!==L)&&(n.blendColor(Ge.r,Ge.g,Ge.b,Ye),x.copy(Ge),L=Ye),p=ie,k=!1}function pt(ie,nt){ie.side===vr?Re(n.CULL_FACE):le(n.CULL_FACE);let Ce=ie.side===sr;nt&&(Ce=!Ce),bt(Ce),ie.blending===So&&ie.transparent===!1?It(pa):It(ie.blending,ie.blendEquation,ie.blendSrc,ie.blendDst,ie.blendEquationAlpha,ie.blendSrcAlpha,ie.blendDstAlpha,ie.blendColor,ie.blendAlpha,ie.premultipliedAlpha),s.setFunc(ie.depthFunc),s.setTest(ie.depthTest),s.setMask(ie.depthWrite),a.setMask(ie.colorWrite);let je=ie.stencilWrite;o.setTest(je),je&&(o.setMask(ie.stencilWriteMask),o.setFunc(ie.stencilFunc,ie.stencilRef,ie.stencilFuncMask),o.setOp(ie.stencilFail,ie.stencilZFail,ie.stencilZPass)),en(ie.polygonOffset,ie.polygonOffsetFactor,ie.polygonOffsetUnits),ie.alphaToCoverage===!0?le(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function bt(ie){V!==ie&&(ie?n.frontFace(n.CW):n.frontFace(n.CCW),V=ie)}function Ve(ie){ie!==fm?(le(n.CULL_FACE),ie!==Y&&(ie===Fd?n.cullFace(n.BACK):ie===pm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),Y=ie}function fn(ie){ie!==E&&(K&&n.lineWidth(ie),E=ie)}function en(ie,nt,Ce){ie?(le(n.POLYGON_OFFSET_FILL),(S!==nt||B!==Ce)&&(S=nt,B=Ce,s.getReversed()&&(nt=-nt),n.polygonOffset(nt,Ce))):Re(n.POLYGON_OFFSET_FILL)}function Bt(ie){ie?le(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function tn(ie){ie===void 0&&(ie=n.TEXTURE0+z-1),ne!==ie&&(n.activeTexture(ie),ne=ie)}function ee(ie,nt,Ce){Ce===void 0&&(ne===null?Ce=n.TEXTURE0+z-1:Ce=ne);let je=ae[Ce];je===void 0&&(je={type:void 0,texture:void 0},ae[Ce]=je),(je.type!==ie||je.texture!==nt)&&(ne!==Ce&&(n.activeTexture(Ce),ne=Ce),n.bindTexture(ie,nt||re[ie]),je.type=ie,je.texture=nt)}function Qt(){let ie=ae[ne];ie!==void 0&&ie.type!==void 0&&(n.bindTexture(ie.type,null),ie.type=void 0,ie.texture=void 0)}function Xt(){try{n.compressedTexImage2D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function G(){try{n.compressedTexImage3D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function b(){try{n.texSubImage2D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function oe(){try{n.texSubImage3D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function ue(){try{n.compressedTexSubImage2D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function ke(){try{n.texStorage2D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function We(){try{n.texStorage3D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function Se(){try{n.texImage2D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function we(){try{n.texImage3D(...arguments)}catch(ie){$t("WebGLState:",ie)}}function Je(ie){return f[ie]!==void 0?f[ie]:n.getParameter(ie)}function gt(ie,nt){f[ie]!==nt&&(n.pixelStorei(ie,nt),f[ie]=nt)}function $e(ie){fe.equals(ie)===!1&&(n.scissor(ie.x,ie.y,ie.z,ie.w),fe.copy(ie))}function Pe(ie){Ie.equals(ie)===!1&&(n.viewport(ie.x,ie.y,ie.z,ie.w),Ie.copy(ie))}function yt(ie,nt){let Ce=l.get(nt);Ce===void 0&&(Ce=new WeakMap,l.set(nt,Ce));let je=Ce.get(ie);je===void 0&&(je=n.getUniformBlockIndex(nt,ie.name),Ce.set(ie,je))}function et(ie,nt){let je=l.get(nt).get(ie);c.get(nt)!==je&&(n.uniformBlockBinding(nt,je,ie.__bindingPointIndex),c.set(nt,je))}function Lt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ne=null,ae={},d={},m=new WeakMap,y=[],T=null,g=!1,p=null,v=null,w=null,_=null,A=null,I=null,U=null,x=new un(0,0,0),L=0,k=!1,V=null,Y=null,E=null,S=null,B=null,fe.set(0,0,n.canvas.width,n.canvas.height),Ie.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:le,disable:Re,bindFramebuffer:ze,drawBuffers:Fe,useProgram:ft,setBlending:It,setMaterial:pt,setFlipSided:bt,setCullFace:Ve,setLineWidth:fn,setPolygonOffset:en,setScissorTest:Bt,activeTexture:tn,bindTexture:ee,unbindTexture:Qt,compressedTexImage2D:Xt,compressedTexImage3D:G,texImage2D:Se,texImage3D:we,pixelStorei:gt,getParameter:Je,updateUBOMapping:yt,uniformBlockBinding:et,texStorage2D:ke,texStorage3D:We,texSubImage2D:b,texSubImage3D:oe,compressedTexSubImage2D:ue,compressedTexSubImage3D:Me,scissor:$e,viewport:Pe,reset:Lt}}function PS(n,e,t,i,r,a,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,h=new WeakMap,f=new Set,d,m=new WeakMap,y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(G,b){return y?new OffscreenCanvas(G,b):ol("canvas")}function g(G,b,oe){let ue=1,Me=Xt(G);if((Me.width>oe||Me.height>oe)&&(ue=oe/Math.max(Me.width,Me.height)),ue<1)if(typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&G instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&G instanceof ImageBitmap||typeof VideoFrame<"u"&&G instanceof VideoFrame){let ke=Math.floor(ue*Me.width),We=Math.floor(ue*Me.height);d===void 0&&(d=T(ke,We));let Se=b?T(ke,We):d;return Se.width=ke,Se.height=We,Se.getContext("2d").drawImage(G,0,0,ke,We),Zt("WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+ke+"x"+We+")."),Se}else return"data"in G&&Zt("WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),G;return G}function p(G){return G.generateMipmaps}function v(G){n.generateMipmap(G)}function w(G){return G.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:G.isWebGL3DRenderTarget?n.TEXTURE_3D:G.isWebGLArrayRenderTarget||G.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(G,b,oe,ue,Me,ke=!1){if(G!==null){if(n[G]!==void 0)return n[G];Zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+G+"'")}let We;ue&&(We=e.get("EXT_texture_norm16"),We||Zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Se=b;if(b===n.RED&&(oe===n.FLOAT&&(Se=n.R32F),oe===n.HALF_FLOAT&&(Se=n.R16F),oe===n.UNSIGNED_BYTE&&(Se=n.R8),oe===n.UNSIGNED_SHORT&&We&&(Se=We.R16_EXT),oe===n.SHORT&&We&&(Se=We.R16_SNORM_EXT)),b===n.RED_INTEGER&&(oe===n.UNSIGNED_BYTE&&(Se=n.R8UI),oe===n.UNSIGNED_SHORT&&(Se=n.R16UI),oe===n.UNSIGNED_INT&&(Se=n.R32UI),oe===n.BYTE&&(Se=n.R8I),oe===n.SHORT&&(Se=n.R16I),oe===n.INT&&(Se=n.R32I)),b===n.RG&&(oe===n.FLOAT&&(Se=n.RG32F),oe===n.HALF_FLOAT&&(Se=n.RG16F),oe===n.UNSIGNED_BYTE&&(Se=n.RG8),oe===n.UNSIGNED_SHORT&&We&&(Se=We.RG16_EXT),oe===n.SHORT&&We&&(Se=We.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(oe===n.UNSIGNED_BYTE&&(Se=n.RG8UI),oe===n.UNSIGNED_SHORT&&(Se=n.RG16UI),oe===n.UNSIGNED_INT&&(Se=n.RG32UI),oe===n.BYTE&&(Se=n.RG8I),oe===n.SHORT&&(Se=n.RG16I),oe===n.INT&&(Se=n.RG32I)),b===n.RGB_INTEGER&&(oe===n.UNSIGNED_BYTE&&(Se=n.RGB8UI),oe===n.UNSIGNED_SHORT&&(Se=n.RGB16UI),oe===n.UNSIGNED_INT&&(Se=n.RGB32UI),oe===n.BYTE&&(Se=n.RGB8I),oe===n.SHORT&&(Se=n.RGB16I),oe===n.INT&&(Se=n.RGB32I)),b===n.RGBA_INTEGER&&(oe===n.UNSIGNED_BYTE&&(Se=n.RGBA8UI),oe===n.UNSIGNED_SHORT&&(Se=n.RGBA16UI),oe===n.UNSIGNED_INT&&(Se=n.RGBA32UI),oe===n.BYTE&&(Se=n.RGBA8I),oe===n.SHORT&&(Se=n.RGBA16I),oe===n.INT&&(Se=n.RGBA32I)),b===n.RGB&&(oe===n.UNSIGNED_SHORT&&We&&(Se=We.RGB16_EXT),oe===n.SHORT&&We&&(Se=We.RGB16_SNORM_EXT),oe===n.UNSIGNED_INT_5_9_9_9_REV&&(Se=n.RGB9_E5),oe===n.UNSIGNED_INT_10F_11F_11F_REV&&(Se=n.R11F_G11F_B10F)),b===n.RGBA){let we=ke?sl:_n.getTransfer(Me);oe===n.FLOAT&&(Se=n.RGBA32F),oe===n.HALF_FLOAT&&(Se=n.RGBA16F),oe===n.UNSIGNED_BYTE&&(Se=we===Fn?n.SRGB8_ALPHA8:n.RGBA8),oe===n.UNSIGNED_SHORT&&We&&(Se=We.RGBA16_EXT),oe===n.SHORT&&We&&(Se=We.RGBA16_SNORM_EXT),oe===n.UNSIGNED_SHORT_4_4_4_4&&(Se=n.RGBA4),oe===n.UNSIGNED_SHORT_5_5_5_1&&(Se=n.RGB5_A1)}return(Se===n.R16F||Se===n.R32F||Se===n.RG16F||Se===n.RG32F||Se===n.RGBA16F||Se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function A(G,b){let oe;return G?b===null||b===Qr||b===wo?oe=n.DEPTH24_STENCIL8:b===Or?oe=n.DEPTH32F_STENCIL8:b===bo&&(oe=n.DEPTH24_STENCIL8,Zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Qr||b===wo?oe=n.DEPTH_COMPONENT24:b===Or?oe=n.DEPTH_COMPONENT32F:b===bo&&(oe=n.DEPTH_COMPONENT16),oe}function I(G,b){return p(G)===!0||G.isFramebufferTexture&&G.minFilter!==Fi&&G.minFilter!==Vi?Math.log2(Math.max(b.width,b.height))+1:G.mipmaps!==void 0&&G.mipmaps.length>0?G.mipmaps.length:G.isCompressedTexture&&Array.isArray(G.image)?b.mipmaps.length:1}function U(G){let b=G.target;b.removeEventListener("dispose",U),L(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&f.delete(b)}function x(G){let b=G.target;b.removeEventListener("dispose",x),V(b)}function L(G){let b=i.get(G);if(b.__webglInit===void 0)return;let oe=G.source,ue=m.get(oe);if(ue){let Me=ue[b.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&k(G),Object.keys(ue).length===0&&m.delete(oe)}i.remove(G)}function k(G){let b=i.get(G);n.deleteTexture(b.__webglTexture);let oe=G.source,ue=m.get(oe);delete ue[b.__cacheKey],s.memory.textures--}function V(G){let b=i.get(G);if(G.depthTexture&&(G.depthTexture.dispose(),i.remove(G.depthTexture)),G.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(b.__webglFramebuffer[ue]))for(let Me=0;Me<b.__webglFramebuffer[ue].length;Me++)n.deleteFramebuffer(b.__webglFramebuffer[ue][Me]);else n.deleteFramebuffer(b.__webglFramebuffer[ue]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[ue])}else{if(Array.isArray(b.__webglFramebuffer))for(let ue=0;ue<b.__webglFramebuffer.length;ue++)n.deleteFramebuffer(b.__webglFramebuffer[ue]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ue=0;ue<b.__webglColorRenderbuffer.length;ue++)b.__webglColorRenderbuffer[ue]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[ue]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let oe=G.textures;for(let ue=0,Me=oe.length;ue<Me;ue++){let ke=i.get(oe[ue]);ke.__webglTexture&&(n.deleteTexture(ke.__webglTexture),s.memory.textures--),i.remove(oe[ue])}i.remove(G)}let Y=0;function E(){Y=0}function S(){return Y}function B(G){Y=G}function z(){let G=Y;return G>=r.maxTextures&&Zt("WebGLTextures: Trying to use "+(G+1)+" texture units while this GPU supports only "+r.maxTextures),Y+=1,G}function K(G){let b=[];return b.push(G.wrapS),b.push(G.wrapT),b.push(G.wrapR||0),b.push(G.magFilter),b.push(G.minFilter),b.push(G.anisotropy),b.push(G.internalFormat),b.push(G.format),b.push(G.type),b.push(G.generateMipmaps),b.push(G.premultiplyAlpha),b.push(G.flipY),b.push(G.unpackAlignment),b.push(G.colorSpace),b.join()}function W(G,b){let oe=i.get(G);if(G.isVideoTexture&&ee(G),G.isRenderTargetTexture===!1&&G.isExternalTexture!==!0&&G.version>0&&oe.__version!==G.version){let ue=G.image;if(ue===null)Zt("WebGLRenderer: Texture marked for update but no image data found.");else if(ue.complete===!1)Zt("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(oe,G,b);return}}else G.isExternalTexture&&(oe.__webglTexture=G.sourceTexture?G.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture,n.TEXTURE0+b)}function O(G,b){let oe=i.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&oe.__version!==G.version){Re(oe,G,b);return}else G.isExternalTexture&&(oe.__webglTexture=G.sourceTexture?G.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,oe.__webglTexture,n.TEXTURE0+b)}function ne(G,b){let oe=i.get(G);if(G.isRenderTargetTexture===!1&&G.version>0&&oe.__version!==G.version){Re(oe,G,b);return}t.bindTexture(n.TEXTURE_3D,oe.__webglTexture,n.TEXTURE0+b)}function ae(G,b){let oe=i.get(G);if(G.isCubeDepthTexture!==!0&&G.version>0&&oe.__version!==G.version){ze(oe,G,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,oe.__webglTexture,n.TEXTURE0+b)}let xe={[Wc]:n.REPEAT,[oa]:n.CLAMP_TO_EDGE,[Xc]:n.MIRRORED_REPEAT},be={[Fi]:n.NEAREST,[Um]:n.NEAREST_MIPMAP_NEAREST,[Dl]:n.NEAREST_MIPMAP_LINEAR,[Vi]:n.LINEAR,[Tu]:n.LINEAR_MIPMAP_NEAREST,[cs]:n.LINEAR_MIPMAP_LINEAR},fe={[zm]:n.NEVER,[Wm]:n.ALWAYS,[km]:n.LESS,[uh]:n.LEQUAL,[Vm]:n.EQUAL,[hh]:n.GEQUAL,[Gm]:n.GREATER,[Hm]:n.NOTEQUAL};function Ie(G,b){if(b.type===Or&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Vi||b.magFilter===Tu||b.magFilter===Dl||b.magFilter===cs||b.minFilter===Vi||b.minFilter===Tu||b.minFilter===Dl||b.minFilter===cs)&&Zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(G,n.TEXTURE_WRAP_S,xe[b.wrapS]),n.texParameteri(G,n.TEXTURE_WRAP_T,xe[b.wrapT]),(G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY)&&n.texParameteri(G,n.TEXTURE_WRAP_R,xe[b.wrapR]),n.texParameteri(G,n.TEXTURE_MAG_FILTER,be[b.magFilter]),n.texParameteri(G,n.TEXTURE_MIN_FILTER,be[b.minFilter]),b.compareFunction&&(n.texParameteri(G,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(G,n.TEXTURE_COMPARE_FUNC,fe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Fi||b.minFilter!==Dl&&b.minFilter!==cs||b.type===Or&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let oe=e.get("EXT_texture_filter_anisotropic");n.texParameterf(G,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function De(G,b){let oe=!1;G.__webglInit===void 0&&(G.__webglInit=!0,b.addEventListener("dispose",U));let ue=b.source,Me=m.get(ue);Me===void 0&&(Me={},m.set(ue,Me));let ke=K(b);if(ke!==G.__cacheKey){Me[ke]===void 0&&(Me[ke]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,oe=!0),Me[ke].usedTimes++;let We=Me[G.__cacheKey];We!==void 0&&(Me[G.__cacheKey].usedTimes--,We.usedTimes===0&&k(b)),G.__cacheKey=ke,G.__webglTexture=Me[ke].texture}return oe}function re(G,b,oe){return Math.floor(Math.floor(G/oe)/b)}function le(G,b,oe,ue){let ke=G.updateRanges;if(ke.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,oe,ue,b.data);else{ke.sort((gt,$e)=>gt.start-$e.start);let We=0;for(let gt=1;gt<ke.length;gt++){let $e=ke[We],Pe=ke[gt],yt=$e.start+$e.count,et=re(Pe.start,b.width,4),Lt=re($e.start,b.width,4);Pe.start<=yt+1&&et===Lt&&re(Pe.start+Pe.count-1,b.width,4)===et?$e.count=Math.max($e.count,Pe.start+Pe.count-$e.start):(++We,ke[We]=Pe)}ke.length=We+1;let Se=t.getParameter(n.UNPACK_ROW_LENGTH),we=t.getParameter(n.UNPACK_SKIP_PIXELS),Je=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let gt=0,$e=ke.length;gt<$e;gt++){let Pe=ke[gt],yt=Math.floor(Pe.start/4),et=Math.ceil(Pe.count/4),Lt=yt%b.width,ie=Math.floor(yt/b.width),nt=et,Ce=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Lt),t.pixelStorei(n.UNPACK_SKIP_ROWS,ie),t.texSubImage2D(n.TEXTURE_2D,0,Lt,ie,nt,Ce,oe,ue,b.data)}G.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,we),t.pixelStorei(n.UNPACK_SKIP_ROWS,Je)}}function Re(G,b,oe){let ue=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ue=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ue=n.TEXTURE_3D);let Me=De(G,b),ke=b.source;t.bindTexture(ue,G.__webglTexture,n.TEXTURE0+oe);let We=i.get(ke);if(ke.version!==We.__version||Me===!0){if(t.activeTexture(n.TEXTURE0+oe),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let Ce=_n.getPrimaries(_n.workingColorSpace),je=b.colorSpace===Da?null:_n.getPrimaries(b.colorSpace),ot=b.colorSpace===Da||Ce===je?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let we=g(b.image,!1,r.maxTextureSize);we=Qt(b,we);let Je=a.convert(b.format,b.colorSpace),gt=a.convert(b.type),$e=_(b.internalFormat,Je,gt,b.normalized,b.colorSpace,b.isVideoTexture);Ie(ue,b);let Pe,yt=b.mipmaps,et=b.isVideoTexture!==!0,Lt=We.__version===void 0||Me===!0,ie=ke.dataReady,nt=I(b,we);if(b.isDepthTexture)$e=A(b.format===us,b.type),Lt&&(et?t.texStorage2D(n.TEXTURE_2D,1,$e,we.width,we.height):t.texImage2D(n.TEXTURE_2D,0,$e,we.width,we.height,0,Je,gt,null));else if(b.isDataTexture)if(yt.length>0){et&&Lt&&t.texStorage2D(n.TEXTURE_2D,nt,$e,yt[0].width,yt[0].height);for(let Ce=0,je=yt.length;Ce<je;Ce++)Pe=yt[Ce],et?ie&&t.texSubImage2D(n.TEXTURE_2D,Ce,0,0,Pe.width,Pe.height,Je,gt,Pe.data):t.texImage2D(n.TEXTURE_2D,Ce,$e,Pe.width,Pe.height,0,Je,gt,Pe.data);b.generateMipmaps=!1}else et?(Lt&&t.texStorage2D(n.TEXTURE_2D,nt,$e,we.width,we.height),ie&&le(b,we,Je,gt)):t.texImage2D(n.TEXTURE_2D,0,$e,we.width,we.height,0,Je,gt,we.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){et&&Lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,$e,yt[0].width,yt[0].height,we.depth);for(let Ce=0,je=yt.length;Ce<je;Ce++)if(Pe=yt[Ce],b.format!==Br)if(Je!==null)if(et){if(ie)if(b.layerUpdates.size>0){let ot=cf(Pe.width,Pe.height,b.format,b.type);for(let Oe of b.layerUpdates){let ht=Pe.data.subarray(Oe*ot/Pe.data.BYTES_PER_ELEMENT,(Oe+1)*ot/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Ce,0,0,Oe,Pe.width,Pe.height,1,Je,ht)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Ce,0,0,0,Pe.width,Pe.height,we.depth,Je,Pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Ce,$e,Pe.width,Pe.height,we.depth,0,Pe.data,0,0);else Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Ce,0,0,0,Pe.width,Pe.height,we.depth,Je,gt,Pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Ce,$e,Pe.width,Pe.height,we.depth,0,Je,gt,Pe.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{et&&Lt&&t.texStorage2D(n.TEXTURE_2D,nt,$e,yt[0].width,yt[0].height);for(let Ce=0,je=yt.length;Ce<je;Ce++)Pe=yt[Ce],b.format!==Br?Je!==null?et?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,Ce,0,0,Pe.width,Pe.height,Je,Pe.data):t.compressedTexImage2D(n.TEXTURE_2D,Ce,$e,Pe.width,Pe.height,0,Pe.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?ie&&t.texSubImage2D(n.TEXTURE_2D,Ce,0,0,Pe.width,Pe.height,Je,gt,Pe.data):t.texImage2D(n.TEXTURE_2D,Ce,$e,Pe.width,Pe.height,0,Je,gt,Pe.data)}else if(b.isDataArrayTexture)if(et){if(Lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,$e,we.width,we.height,we.depth),ie)if(b.layerUpdates.size>0){let Ce=cf(we.width,we.height,b.format,b.type);for(let je of b.layerUpdates){let ot=we.data.subarray(je*Ce/we.data.BYTES_PER_ELEMENT,(je+1)*Ce/we.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,je,we.width,we.height,1,Je,gt,ot)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,we.width,we.height,we.depth,Je,gt,we.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,$e,we.width,we.height,we.depth,0,Je,gt,we.data);else if(b.isData3DTexture)et?(Lt&&t.texStorage3D(n.TEXTURE_3D,nt,$e,we.width,we.height,we.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,we.width,we.height,we.depth,Je,gt,we.data)):t.texImage3D(n.TEXTURE_3D,0,$e,we.width,we.height,we.depth,0,Je,gt,we.data);else if(b.isFramebufferTexture){if(Lt)if(et)t.texStorage2D(n.TEXTURE_2D,nt,$e,we.width,we.height);else{let Ce=we.width,je=we.height;for(let ot=0;ot<nt;ot++)t.texImage2D(n.TEXTURE_2D,ot,$e,Ce,je,0,Je,gt,null),Ce>>=1,je>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let Ce=n.canvas;if(Ce.hasAttribute("layoutsubtree")||Ce.setAttribute("layoutsubtree","true"),we.parentNode!==Ce){Ce.appendChild(we),f.add(b),Ce.onpaint=je=>{let ot=je.changedElements;for(let Oe of f)ot.includes(Oe.image)&&(Oe.needsUpdate=!0)},Ce.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,we);else{let ot=n.RGBA,Oe=n.RGBA,ht=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ot,Oe,ht,we)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(yt.length>0){if(et&&Lt){let Ce=Xt(yt[0]);t.texStorage2D(n.TEXTURE_2D,nt,$e,Ce.width,Ce.height)}for(let Ce=0,je=yt.length;Ce<je;Ce++)Pe=yt[Ce],et?ie&&t.texSubImage2D(n.TEXTURE_2D,Ce,0,0,Je,gt,Pe):t.texImage2D(n.TEXTURE_2D,Ce,$e,Je,gt,Pe);b.generateMipmaps=!1}else if(et){if(Lt){let Ce=Xt(we);t.texStorage2D(n.TEXTURE_2D,nt,$e,Ce.width,Ce.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Je,gt,we)}else t.texImage2D(n.TEXTURE_2D,0,$e,Je,gt,we);p(b)&&v(ue),We.__version=ke.version,b.onUpdate&&b.onUpdate(b)}G.__version=b.version}function ze(G,b,oe){if(b.image.length!==6)return;let ue=De(G,b),Me=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+oe);let ke=i.get(Me);if(Me.version!==ke.__version||ue===!0){t.activeTexture(n.TEXTURE0+oe);let We=_n.getPrimaries(_n.workingColorSpace),Se=b.colorSpace===Da?null:_n.getPrimaries(b.colorSpace),we=b.colorSpace===Da||We===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Je=b.isCompressedTexture||b.image[0].isCompressedTexture,gt=b.image[0]&&b.image[0].isDataTexture,$e=[];for(let Oe=0;Oe<6;Oe++)!Je&&!gt?$e[Oe]=g(b.image[Oe],!0,r.maxCubemapSize):$e[Oe]=gt?b.image[Oe].image:b.image[Oe],$e[Oe]=Qt(b,$e[Oe]);let Pe=$e[0],yt=a.convert(b.format,b.colorSpace),et=a.convert(b.type),Lt=_(b.internalFormat,yt,et,b.normalized,b.colorSpace),ie=b.isVideoTexture!==!0,nt=ke.__version===void 0||ue===!0,Ce=Me.dataReady,je=I(b,Pe);Ie(n.TEXTURE_CUBE_MAP,b);let ot;if(Je){ie&&nt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,je,Lt,Pe.width,Pe.height);for(let Oe=0;Oe<6;Oe++){ot=$e[Oe].mipmaps;for(let ht=0;ht<ot.length;ht++){let Ge=ot[ht];b.format!==Br?yt!==null?ie?Ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht,0,0,Ge.width,Ge.height,yt,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht,Lt,Ge.width,Ge.height,0,Ge.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ie?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht,0,0,Ge.width,Ge.height,yt,et,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht,Lt,Ge.width,Ge.height,0,yt,et,Ge.data)}}}else{if(ot=b.mipmaps,ie&&nt){ot.length>0&&je++;let Oe=Xt($e[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,je,Lt,Oe.width,Oe.height)}for(let Oe=0;Oe<6;Oe++)if(gt){ie?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,0,0,$e[Oe].width,$e[Oe].height,yt,et,$e[Oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Lt,$e[Oe].width,$e[Oe].height,0,yt,et,$e[Oe].data);for(let ht=0;ht<ot.length;ht++){let Ye=ot[ht].image[Oe].image;ie?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht+1,0,0,Ye.width,Ye.height,yt,et,Ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht+1,Lt,Ye.width,Ye.height,0,yt,et,Ye.data)}}else{ie?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,0,0,yt,et,$e[Oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Lt,yt,et,$e[Oe]);for(let ht=0;ht<ot.length;ht++){let Ge=ot[ht];ie?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht+1,0,0,yt,et,Ge.image[Oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ht+1,Lt,yt,et,Ge.image[Oe])}}}p(b)&&v(n.TEXTURE_CUBE_MAP),ke.__version=Me.version,b.onUpdate&&b.onUpdate(b)}G.__version=b.version}function Fe(G,b,oe,ue,Me,ke){let We=a.convert(oe.format,oe.colorSpace),Se=a.convert(oe.type),we=_(oe.internalFormat,We,Se,oe.normalized,oe.colorSpace),Je=i.get(b),gt=i.get(oe);if(gt.__renderTarget=b,!Je.__hasExternalTextures){let $e=Math.max(1,b.width>>ke),Pe=Math.max(1,b.height>>ke);Me===n.TEXTURE_3D||Me===n.TEXTURE_2D_ARRAY?t.texImage3D(Me,ke,we,$e,Pe,b.depth,0,We,Se,null):t.texImage2D(Me,ke,we,$e,Pe,0,We,Se,null)}t.bindFramebuffer(n.FRAMEBUFFER,G),tn(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,Me,gt.__webglTexture,0,Bt(b)):(Me===n.TEXTURE_2D||Me>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ue,Me,gt.__webglTexture,ke),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(G,b,oe){if(n.bindRenderbuffer(n.RENDERBUFFER,G),b.depthBuffer){let ue=b.depthTexture,Me=ue&&ue.isDepthTexture?ue.type:null,ke=A(b.stencilBuffer,Me),We=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;tn(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Bt(b),ke,b.width,b.height):oe?n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt(b),ke,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ke,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,We,n.RENDERBUFFER,G)}else{let ue=b.textures;for(let Me=0;Me<ue.length;Me++){let ke=ue[Me],We=a.convert(ke.format,ke.colorSpace),Se=a.convert(ke.type),we=_(ke.internalFormat,We,Se,ke.normalized,ke.colorSpace);tn(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Bt(b),we,b.width,b.height):oe?n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt(b),we,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,we,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ot(G,b,oe){let ue=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,G),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Me=i.get(b.depthTexture);if(Me.__renderTarget=b,(!Me.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ue){if(Me.__webglInit===void 0&&(Me.__webglInit=!0,b.depthTexture.addEventListener("dispose",U)),Me.__webglTexture===void 0){Me.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Me.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,b.depthTexture);let Je=a.convert(b.depthTexture.format),gt=a.convert(b.depthTexture.type),$e;b.depthTexture.format===la?$e=n.DEPTH_COMPONENT24:b.depthTexture.format===us&&($e=n.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,$e,b.width,b.height,0,Je,gt,null)}}else W(b.depthTexture,0);let ke=Me.__webglTexture,We=Bt(b),Se=ue?n.TEXTURE_CUBE_MAP_POSITIVE_X+oe:n.TEXTURE_2D,we=b.depthTexture.format===us?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===la)tn(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,we,Se,ke,0,We):n.framebufferTexture2D(n.FRAMEBUFFER,we,Se,ke,0);else if(b.depthTexture.format===us)tn(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,we,Se,ke,0,We):n.framebufferTexture2D(n.FRAMEBUFFER,we,Se,ke,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ut(G){let b=i.get(G),oe=G.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==G.depthTexture){let ue=G.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ue){let Me=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ue.removeEventListener("dispose",Me)};ue.addEventListener("dispose",Me),b.__depthDisposeCallback=Me}b.__boundDepthTexture=ue}if(G.depthTexture&&!b.__autoAllocateDepthBuffer)if(oe)for(let ue=0;ue<6;ue++)Ot(b.__webglFramebuffer[ue],G,ue);else{let ue=G.texture.mipmaps;ue&&ue.length>0?Ot(b.__webglFramebuffer[0],G,0):Ot(b.__webglFramebuffer,G,0)}else if(oe){b.__webglDepthbuffer=[];for(let ue=0;ue<6;ue++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[ue]),b.__webglDepthbuffer[ue]===void 0)b.__webglDepthbuffer[ue]=n.createRenderbuffer(),ft(b.__webglDepthbuffer[ue],G,!1);else{let Me=G.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ke=b.__webglDepthbuffer[ue];n.bindRenderbuffer(n.RENDERBUFFER,ke),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,ke)}}else{let ue=G.texture.mipmaps;if(ue&&ue.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),ft(b.__webglDepthbuffer,G,!1);else{let Me=G.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ke=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ke),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,ke)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function It(G,b,oe){let ue=i.get(G);b!==void 0&&Fe(ue.__webglFramebuffer,G,G.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),oe!==void 0&&ut(G)}function pt(G){let b=G.texture,oe=i.get(G),ue=i.get(b);G.addEventListener("dispose",x);let Me=G.textures,ke=G.isWebGLCubeRenderTarget===!0,We=Me.length>1;if(We||(ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture()),ue.__version=b.version,s.memory.textures++),ke){oe.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(b.mipmaps&&b.mipmaps.length>0){oe.__webglFramebuffer[Se]=[];for(let we=0;we<b.mipmaps.length;we++)oe.__webglFramebuffer[Se][we]=n.createFramebuffer()}else oe.__webglFramebuffer[Se]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){oe.__webglFramebuffer=[];for(let Se=0;Se<b.mipmaps.length;Se++)oe.__webglFramebuffer[Se]=n.createFramebuffer()}else oe.__webglFramebuffer=n.createFramebuffer();if(We)for(let Se=0,we=Me.length;Se<we;Se++){let Je=i.get(Me[Se]);Je.__webglTexture===void 0&&(Je.__webglTexture=n.createTexture(),s.memory.textures++)}if(G.samples>0&&tn(G)===!1){oe.__webglMultisampledFramebuffer=n.createFramebuffer(),oe.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer);for(let Se=0;Se<Me.length;Se++){let we=Me[Se];oe.__webglColorRenderbuffer[Se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,oe.__webglColorRenderbuffer[Se]);let Je=a.convert(we.format,we.colorSpace),gt=a.convert(we.type),$e=_(we.internalFormat,Je,gt,we.normalized,we.colorSpace,G.isXRRenderTarget===!0),Pe=Bt(G);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,$e,G.width,G.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,oe.__webglColorRenderbuffer[Se])}n.bindRenderbuffer(n.RENDERBUFFER,null),G.depthBuffer&&(oe.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(oe.__webglDepthRenderbuffer,G,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ke){t.bindTexture(n.TEXTURE_CUBE_MAP,ue.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,b);for(let Se=0;Se<6;Se++)if(b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Fe(oe.__webglFramebuffer[Se][we],G,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,we);else Fe(oe.__webglFramebuffer[Se],G,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);p(b)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(We){for(let Se=0,we=Me.length;Se<we;Se++){let Je=Me[Se],gt=i.get(Je),$e=n.TEXTURE_2D;(G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&($e=G.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($e,gt.__webglTexture),Ie($e,Je),Fe(oe.__webglFramebuffer,G,Je,n.COLOR_ATTACHMENT0+Se,$e,0),p(Je)&&v($e)}t.unbindTexture()}else{let Se=n.TEXTURE_2D;if((G.isWebGL3DRenderTarget||G.isWebGLArrayRenderTarget)&&(Se=G.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Se,ue.__webglTexture),Ie(Se,b),b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Fe(oe.__webglFramebuffer[we],G,b,n.COLOR_ATTACHMENT0,Se,we);else Fe(oe.__webglFramebuffer,G,b,n.COLOR_ATTACHMENT0,Se,0);p(b)&&v(Se),t.unbindTexture()}G.depthBuffer&&ut(G)}function bt(G){let b=G.textures;for(let oe=0,ue=b.length;oe<ue;oe++){let Me=b[oe];if(p(Me)){let ke=w(G),We=i.get(Me).__webglTexture;t.bindTexture(ke,We),v(ke),t.unbindTexture()}}}let Ve=[],fn=[];function en(G){if(G.samples>0){if(tn(G)===!1){let b=G.textures,oe=G.width,ue=G.height,Me=n.COLOR_BUFFER_BIT,ke=G.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,We=i.get(G),Se=b.length>1;if(Se)for(let Je=0;Je<b.length;Je++)t.bindFramebuffer(n.FRAMEBUFFER,We.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Je,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,We.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Je,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,We.__webglMultisampledFramebuffer);let we=G.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,We.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,We.__webglFramebuffer);for(let Je=0;Je<b.length;Je++){if(G.resolveDepthBuffer&&(G.depthBuffer&&(Me|=n.DEPTH_BUFFER_BIT),G.stencilBuffer&&G.resolveStencilBuffer&&(Me|=n.STENCIL_BUFFER_BIT)),Se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,We.__webglColorRenderbuffer[Je]);let gt=i.get(b[Je]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,gt,0)}n.blitFramebuffer(0,0,oe,ue,0,0,oe,ue,Me,n.NEAREST),c===!0&&(Ve.length=0,fn.length=0,Ve.push(n.COLOR_ATTACHMENT0+Je),G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&(Ve.push(ke),fn.push(ke),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,fn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Se)for(let Je=0;Je<b.length;Je++){t.bindFramebuffer(n.FRAMEBUFFER,We.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Je,n.RENDERBUFFER,We.__webglColorRenderbuffer[Je]);let gt=i.get(b[Je]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,We.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Je,n.TEXTURE_2D,gt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,We.__webglMultisampledFramebuffer)}else if(G.depthBuffer&&G.storeMultisampledDepthBuffer===!1&&c){let b=G.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Bt(G){return Math.min(r.maxSamples,G.samples)}function tn(G){let b=i.get(G);return G.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ee(G){let b=s.render.frame;h.get(G)!==b&&(h.set(G,b),G.update())}function Qt(G,b){let oe=G.colorSpace,ue=G.format,Me=G.type;return G.isCompressedTexture===!0||G.isVideoTexture===!0||oe!==al&&oe!==Da&&(_n.getTransfer(oe)===Fn?(ue!==Br||Me!==gr)&&Zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",oe)),b}function Xt(G){return typeof HTMLImageElement<"u"&&G instanceof HTMLImageElement?(l.width=G.naturalWidth||G.width,l.height=G.naturalHeight||G.height):typeof VideoFrame<"u"&&G instanceof VideoFrame?(l.width=G.displayWidth,l.height=G.displayHeight):(l.width=G.width,l.height=G.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=E,this.getTextureUnits=S,this.setTextureUnits=B,this.setTexture2D=W,this.setTexture2DArray=O,this.setTexture3D=ne,this.setTextureCube=ae,this.rebindTextures=It,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=bt,this.updateMultisampleRenderTarget=en,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=tn,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function LS(n,e){function t(i,r=Da){let a,s=_n.getTransfer(r);if(i===gr)return n.UNSIGNED_BYTE;if(i===Au)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Iu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$d)return n.BYTE;if(i===Kd)return n.SHORT;if(i===bo)return n.UNSIGNED_SHORT;if(i===Eu)return n.INT;if(i===Qr)return n.UNSIGNED_INT;if(i===Or)return n.FLOAT;if(i===jr)return n.HALF_FLOAT;if(i===ef)return n.ALPHA;if(i===tf)return n.RGB;if(i===Br)return n.RGBA;if(i===la)return n.DEPTH_COMPONENT;if(i===us)return n.DEPTH_STENCIL;if(i===Cu)return n.RED;if(i===Ru)return n.RED_INTEGER;if(i===hs)return n.RG;if(i===Pu)return n.RG_INTEGER;if(i===Lu)return n.RGBA_INTEGER;if(i===Ul||i===Fl||i===Ol||i===Bl)if(s===Fn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ul)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ol)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ul)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ol)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Nu||i===Du||i===Uu||i===Fu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Nu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Du)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Uu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ou||i===Bu||i===zu||i===ku||i===Vu||i===zl||i===Gu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ou||i===Bu)return s===Fn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===zu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ku)return a.COMPRESSED_R11_EAC;if(i===Vu)return a.COMPRESSED_SIGNED_R11_EAC;if(i===zl)return a.COMPRESSED_RG11_EAC;if(i===Gu)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Hu||i===Wu||i===Xu||i===qu||i===Yu||i===Zu||i===Ju||i===$u||i===Ku||i===Qu||i===ju||i===eh||i===th||i===nh)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Hu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ju)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$u)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ku)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qu)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ju)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===eh)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===th)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nh)return s===Fn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ih||i===rh||i===ah)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===ih)return s===Fn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ah)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sh||i===oh||i===kl||i===lh)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===sh)return a.COMPRESSED_RED_RGTC1_EXT;if(i===oh)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===kl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===lh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===wo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var NS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,If=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new vl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ir({vertexShader:NS,fragmentShader:DS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vn(new wl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cf=class extends ca{constructor(e,t){super();let i=this,r=null,a=1,s=null,o="local-floor",c=1,l=null,h=null,f=null,d=null,m=null,y=null,T=typeof XRWebGLBinding<"u",g=new If,p={},v=t.getContextAttributes(),w=null,_=null,A=[],I=[],U=new At,x=null,L=null,k=new ji;k.viewport=new ri;let V=new ji;V.viewport=new ri;let Y=[k,V],E=new xu,S=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let le=A[re];return le===void 0&&(le=new fo,A[re]=le),le.getTargetRaySpace()},this.getControllerGrip=function(re){let le=A[re];return le===void 0&&(le=new fo,A[re]=le),le.getGripSpace()},this.getHand=function(re){let le=A[re];return le===void 0&&(le=new fo,A[re]=le),le.getHandSpace()};function z(re){let le=I.indexOf(re.inputSource);if(le===-1)return;let Re=A[le];Re!==void 0&&(Re.update(re.inputSource,re.frame,l||s),Re.dispatchEvent({type:re.type,data:re.inputSource}))}function K(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",W);for(let re=0;re<A.length;re++){let le=I[re];le!==null&&(I[re]=null,A[re].disconnect(le))}S=null,B=null,g.reset();for(let re in p)delete p[re];if(e.setRenderTarget(w),m=null,d=null,f=null,r=null,_=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(U.width,U.height,!1),L!==null){let re=L.camera;re.fov=L.fov,re.zoom=L.zoom,re.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){a=re,i.isPresenting===!0&&Zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,i.isPresenting===!0&&Zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(re){l=re},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f===null&&T&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(re){if(r=re,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",K),r.addEventListener("inputsourceschange",W),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(U),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,ze=null,Fe=null;v.depth&&(Fe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=v.stencil?us:la,ze=v.stencil?wo:Qr);let ft={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(ft),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new mr(d.textureWidth,d.textureHeight,{format:Br,type:gr,depthTexture:new ns(d.textureWidth,d.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,t,Re),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new mr(m.framebufferWidth,m.framebufferHeight,{format:Br,type:gr,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),De.setContext(r),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(re){for(let le=0;le<re.removed.length;le++){let Re=re.removed[le],ze=I.indexOf(Re);ze>=0&&(I[ze]=null,A[ze].disconnect(Re))}for(let le=0;le<re.added.length;le++){let Re=re.added[le],ze=I.indexOf(Re);if(ze===-1){for(let ft=0;ft<A.length;ft++)if(ft>=I.length){I.push(Re),ze=ft;break}else if(I[ft]===null){I[ft]=Re,ze=ft;break}if(ze===-1)break}let Fe=A[ze];Fe&&Fe.connect(Re)}}let O=new he,ne=new he;function ae(re,le,Re){O.setFromMatrixPosition(le.matrixWorld),ne.setFromMatrixPosition(Re.matrixWorld);let ze=O.distanceTo(ne),Fe=le.projectionMatrix.elements,ft=Re.projectionMatrix.elements,Ot=Fe[14]/(Fe[10]-1),ut=Fe[14]/(Fe[10]+1),It=(Fe[9]+1)/Fe[5],pt=(Fe[9]-1)/Fe[5],bt=(Fe[8]-1)/Fe[0],Ve=(ft[8]+1)/ft[0],fn=Ot*bt,en=Ot*Ve,Bt=ze/(-bt+Ve),tn=Bt*-bt;if(le.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(tn),re.translateZ(Bt),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Fe[10]===-1)re.projectionMatrix.copy(le.projectionMatrix),re.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let ee=Ot+Bt,Qt=ut+Bt,Xt=fn-tn,G=en+(ze-tn),b=It*ut/Qt*ee,oe=pt*ut/Qt*ee;re.projectionMatrix.makePerspective(Xt,G,b,oe,ee,Qt),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function xe(re,le){le===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(le.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(r===null)return;let le=re.near,Re=re.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(Re=g.depthFar)),E.near=V.near=k.near=le,E.far=V.far=k.far=Re,(S!==E.near||B!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),S=E.near,B=E.far),E.layers.mask=re.layers.mask|6,k.layers.mask=E.layers.mask&-5,V.layers.mask=E.layers.mask&-3;let ze=re.parent,Fe=E.cameras;xe(E,ze);for(let ft=0;ft<Fe.length;ft++)xe(Fe[ft],ze);Fe.length===2?ae(E,k,V):E.projectionMatrix.copy(k.projectionMatrix),L===null&&re.isPerspectiveCamera&&(L={camera:re,fov:re.fov,zoom:re.zoom}),be(re,E,ze)};function be(re,le,Re){Re===null?re.matrix.copy(le.matrixWorld):(re.matrix.copy(Re.matrixWorld),re.matrix.invert(),re.matrix.multiply(le.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(le.projectionMatrix),re.projectionMatrixInverse.copy(le.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Yc*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(re){c=re,d!==null&&(d.fixedFoveation=re),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=re)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(E)},this.getCameraTexture=function(re){return p[re]};let fe=null;function Ie(re,le){if(h=le.getViewerPose(l||s),y=le,h!==null){let Re=h.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ze=!1;Re.length!==E.cameras.length&&(E.cameras.length=0,ze=!0);for(let ut=0;ut<Re.length;ut++){let It=Re[ut],pt=null;if(m!==null)pt=m.getViewport(It);else{let Ve=f.getViewSubImage(d,It);pt=Ve.viewport,ut===0&&(e.setRenderTargetTextures(_,Ve.colorTexture,Ve.depthStencilTexture),e.setRenderTarget(_))}let bt=Y[ut];bt===void 0&&(bt=new ji,bt.layers.enable(ut),bt.viewport=new ri,Y[ut]=bt),bt.matrix.fromArray(It.transform.matrix),bt.matrix.decompose(bt.position,bt.quaternion,bt.scale),bt.projectionMatrix.fromArray(It.projectionMatrix),bt.projectionMatrixInverse.copy(bt.projectionMatrix).invert(),bt.viewport.set(pt.x,pt.y,pt.width,pt.height),ut===0&&(E.matrix.copy(bt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ze===!0&&E.cameras.push(bt)}let Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){f=i.getBinding();let ut=f.getDepthInformation(Re[0]);ut&&ut.isValid&&ut.texture&&g.init(ut,r.renderState)}if(Fe&&Fe.includes("camera-access")&&T){e.state.unbindTexture(),f=i.getBinding();for(let ut=0;ut<Re.length;ut++){let It=Re[ut].camera;if(It){let pt=p[It];pt||(pt=new vl,p[It]=pt);let bt=f.getCameraImage(It);pt.sourceTexture=bt}}}}for(let Re=0;Re<A.length;Re++){let ze=I[Re],Fe=A[Re];ze!==null&&Fe!==void 0&&Fe.update(ze,le,l||s)}fe&&fe(re,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),y=null}let De=new T0;De.setAnimationLoop(Ie),this.setAnimationLoop=function(re){fe=re},this.dispose=function(){}}},US=new On,P0=new an;P0.set(-1,0,0,0,1,0,0,0,1);function FS(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,sf(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,w,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(g,p):p.isMeshLambertMaterial?(a(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(g,p),f(g,p)):p.isMeshPhongMaterial?(a(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(g,p),d(g,p),p.isMeshPhysicalMaterial&&m(g,p,_)):p.isMeshMatcapMaterial?(a(g,p),y(g,p)):p.isMeshDepthMaterial?a(g,p):p.isMeshDistanceMaterial?(a(g,p),T(g,p)):p.isMeshNormalMaterial?a(g,p):p.isLineBasicMaterial?(s(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,v,w):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===sr&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===sr&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),w=v.envMap,_=v.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(US.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(P0),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function s(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=w*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sr&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,p){p.matcap&&(g.matcap.value=p.matcap)}function T(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function OS(n,e,t,i){let r={},a={},s=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,A){let I=A.program;i.uniformBlockBinding(_,I)}function l(_,A){let I=r[_.id];I===void 0&&(g(_),I=h(_),r[_.id]=I,_.addEventListener("dispose",v));let U=A.program;i.updateUBOMapping(_,U);let x=e.render.frame;a[_.id]!==x&&(d(_),a[_.id]=x)}function h(_){let A=f();_.__bindingPointIndex=A;let I=n.createBuffer(),U=_.__size,x=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,I),n.bufferData(n.UNIFORM_BUFFER,U,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,I),I}function f(){for(let _=0;_<o;_++)if(s.indexOf(_)===-1)return s.push(_),_;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let A=r[_.id],I=_.uniforms,U=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let x=0,L=I.length;x<L;x++){let k=I[x];if(Array.isArray(k))for(let V=0,Y=k.length;V<Y;V++)m(k[V],x,V,U);else m(k,x,0,U)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(_,A,I,U){if(T(_,A,I,U)===!0){let x=_.__offset,L=_.value;if(Array.isArray(L)){let k=0;for(let V=0;V<L.length;V++){let Y=L[V],E=p(Y);y(Y,_.__data,k),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(k+=E.storage/Float32Array.BYTES_PER_ELEMENT)}}else y(L,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,_.__data)}}function y(_,A,I){typeof _=="number"||typeof _=="boolean"?A[0]=_:_.isMatrix3?(A[0]=_.elements[0],A[1]=_.elements[1],A[2]=_.elements[2],A[3]=0,A[4]=_.elements[3],A[5]=_.elements[4],A[6]=_.elements[5],A[7]=0,A[8]=_.elements[6],A[9]=_.elements[7],A[10]=_.elements[8],A[11]=0):ArrayBuffer.isView(_)?A.set(new _.constructor(_.buffer,_.byteOffset,A.length)):_.toArray(A,I)}function T(_,A,I,U){let x=_.value,L=A+"_"+I;if(U[L]===void 0)return typeof x=="number"||typeof x=="boolean"?U[L]=x:ArrayBuffer.isView(x)?U[L]=x.slice():U[L]=x.clone(),!0;{let k=U[L];if(typeof x=="number"||typeof x=="boolean"){if(k!==x)return U[L]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(k.equals(x)===!1)return k.copy(x),!0}}return!1}function g(_){let A=_.uniforms,I=0,U=16;for(let L=0,k=A.length;L<k;L++){let V=Array.isArray(A[L])?A[L]:[A[L]];for(let Y=0,E=V.length;Y<E;Y++){let S=V[Y],B=Array.isArray(S.value)?S.value:[S.value];for(let z=0,K=B.length;z<K;z++){let W=B[z],O=p(W),ne=I%U,ae=ne%O.boundary,xe=ne+ae;I+=ae,xe!==0&&U-xe<O.storage&&(I+=U-xe),S.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=I,I+=O.storage}}}let x=I%U;return x>0&&(I+=U-x),_.__size=I,_.__cache={},this}function p(_){let A={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(A.boundary=4,A.storage=4):_.isVector2?(A.boundary=8,A.storage=8):_.isVector3||_.isColor?(A.boundary=16,A.storage=12):_.isVector4?(A.boundary=16,A.storage=16):_.isMatrix3?(A.boundary=48,A.storage=48):_.isMatrix4?(A.boundary=64,A.storage=64):_.isTexture?Zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(A.boundary=16,A.storage=_.byteLength):Zt("WebGLRenderer: Unsupported uniform value type.",_),A}function v(_){let A=_.target;A.removeEventListener("dispose",v);let I=s.indexOf(A.__bindingPointIndex);s.splice(I,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete a[A.id]}function w(){for(let _ in r)n.deleteBuffer(r[_]);s=[],r={},a={}}return{bind:c,update:l,dispose:w}}var BS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ma=null;function zS(){return ma===null&&(ma=new fl(BS,16,16,hs,jr),ma.name="DFG_LUT",ma.minFilter=Vi,ma.magFilter=Vi,ma.wrapS=oa,ma.wrapT=oa,ma.generateMipmaps=!1,ma.needsUpdate=!0),ma}var vh=class{constructor(e={}){let{canvas:t=qm(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:m=gr}=e;this.isWebGLRenderer=!0;let y;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=i.getContextAttributes().alpha}else y=s;let T=m,g=new Set([Lu,Pu,Ru]),p=new Set([gr,Qr,bo,wo,Au,Iu]),v=new Uint32Array(4),w=new Int32Array(4),_=new he,A=null,I=null,U=[],x=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Kr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,V=!1,Y=null,E=null,S=null,B=null;this._outputColorSpace=ar;let z=0,K=0,W=null,O=-1,ne=null,ae=new ri,xe=new ri,be=null,fe=new un(0),Ie=0,De=t.width,re=t.height,le=1,Re=null,ze=null,Fe=new ri(0,0,De,re),ft=new ri(0,0,De,re),Ot=!1,ut=new po,It=!1,pt=!1,bt=new On,Ve=new he,fn=new ri,en={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Bt=!1;function tn(){return W===null?le:1}let ee=i;function Qt(C,se){return t.getContext(C,se)}let Xt,G,b,oe,ue,Me,ke,We,Se,we,Je,gt,$e,Pe,yt,et,Lt,ie,nt,Ce,je,ot,Oe;try{let C={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ye,!1),t.addEventListener("webglcontextrestored",Wt,!1),t.addEventListener("webglcontextcreationerror",qt,!1),ee===null){let se="webgl2";if(ee=Qt(se,C),ee===null)throw Qt(se)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ht()}catch(C){throw t.removeEventListener("webglcontextlost",Ye,!1),t.removeEventListener("webglcontextrestored",Wt,!1),t.removeEventListener("webglcontextcreationerror",qt,!1),$t("WebGLRenderer: "+C.message),C}function ht(){Xt=new q_(ee),Xt.init(),je=new LS(ee,Xt),G=new F_(ee,Xt,e,je),b=new RS(ee,Xt),G.reversedDepthBuffer&&d&&b.buffers.depth.setReversed(!0),E=ee.createFramebuffer(),S=ee.createFramebuffer(),B=ee.createFramebuffer(),oe=new J_(ee),ue=new vS,Me=new PS(ee,Xt,b,ue,G,je,oe),ke=new X_(k),We=new Kg(ee),ot=new D_(ee,We),Se=new Y_(ee,We,oe,ot),we=new K_(ee,Se,We,ot,oe),ie=new $_(ee,G,Me),yt=new O_(ue),Je=new mS(k,ke,Xt,G,ot,yt),gt=new FS(k,ue),$e=new yS,Pe=new wS(Xt),Lt=new N_(k,ke,b,we,y,c),et=new CS(k,we,G),Oe=new OS(ee,oe,G,b),nt=new U_(ee,Xt,oe),Ce=new Z_(ee,Xt,oe),oe.programs=Je.programs,k.capabilities=G,k.extensions=Xt,k.properties=ue,k.renderLists=$e,k.shadowMap=et,k.state=b,k.info=oe}T!==gr&&(L=new j_(T,t.width,t.height,o,r,a));let Ge=new Cf(k,ee);this.xr=Ge,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){let C=Xt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Xt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(C){C!==void 0&&(le=C,this.setSize(De,re,!1))},this.getSize=function(C){return C.set(De,re)},this.setSize=function(C,se,ge=!0){if(Ge.isPresenting){Zt("WebGLRenderer: Can't change size while VR device is presenting.");return}De=C,re=se,t.width=Math.floor(C*le),t.height=Math.floor(se*le),ge===!0&&(t.style.width=C+"px",t.style.height=se+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,C,se)},this.getDrawingBufferSize=function(C){return C.set(De*le,re*le).floor()},this.setDrawingBufferSize=function(C,se,ge){De=C,re=se,le=ge,t.width=Math.floor(C*ge),t.height=Math.floor(se*ge),this.setViewport(0,0,C,se)},this.setEffects=function(C){if(T===gr){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let se=0;se<C.length;se++)if(C[se].isOutputPass===!0){Zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(ae)},this.getViewport=function(C){return C.copy(Fe)},this.setViewport=function(C,se,ge,ve){C.isVector4?Fe.set(C.x,C.y,C.z,C.w):Fe.set(C,se,ge,ve),b.viewport(ae.copy(Fe).multiplyScalar(le).round())},this.getScissor=function(C){return C.copy(ft)},this.setScissor=function(C,se,ge,ve){C.isVector4?ft.set(C.x,C.y,C.z,C.w):ft.set(C,se,ge,ve),b.scissor(xe.copy(ft).multiplyScalar(le).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(C){b.setScissorTest(Ot=C)},this.setOpaqueSort=function(C){Re=C},this.setTransparentSort=function(C){ze=C},this.getClearColor=function(C){return C.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor(...arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha(...arguments)},this.clear=function(C=!0,se=!0,ge=!0){let ve=0;if(C){let pe=!1;if(W!==null){let Ke=W.texture.format;pe=g.has(Ke)}if(pe){let Ke=W.texture.type,dt=p.has(Ke),st=Lt.getClearColor(),Be=Lt.getClearAlpha(),tt=st.r,Xe=st.g,Gt=st.b;dt?(v[0]=tt,v[1]=Xe,v[2]=Gt,v[3]=Be,ee.clearBufferuiv(ee.COLOR,0,v)):(w[0]=tt,w[1]=Xe,w[2]=Gt,w[3]=Be,ee.clearBufferiv(ee.COLOR,0,w))}else ve|=ee.COLOR_BUFFER_BIT}se&&(ve|=ee.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ge&&(ve|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ve!==0&&ee.clear(ve)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),Y=C},this.dispose=function(){t.removeEventListener("webglcontextlost",Ye,!1),t.removeEventListener("webglcontextrestored",Wt,!1),t.removeEventListener("webglcontextcreationerror",qt,!1),Lt.dispose(),$e.dispose(),Pe.dispose(),ue.dispose(),ke.dispose(),we.dispose(),ot.dispose(),Oe.dispose(),Je.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Oi),Ge.removeEventListener("sessionend",oi),hi.stop()};function Ye(C){C.preventDefault(),rf("WebGLRenderer: Context Lost."),V=!0}function Wt(){rf("WebGLRenderer: Context Restored."),V=!1;let C=oe.autoReset,se=et.enabled,ge=et.autoUpdate,ve=et.needsUpdate,pe=et.type;ht(),oe.autoReset=C,et.enabled=se,et.autoUpdate=ge,et.needsUpdate=ve,et.type=pe}function qt(C){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function kt(C){let se=C.target;se.removeEventListener("dispose",kt),dn(se)}function dn(C){at(C),ue.remove(C)}function at(C){let se=ue.get(C).programs;se!==void 0&&(se.forEach(function(ge){Je.releaseProgram(ge)}),C.isShaderMaterial&&Je.releaseShaderCache(C))}this.renderBufferDirect=function(C,se,ge,ve,pe,Ke){se===null&&(se=en);let dt=pe.isMesh&&pe.matrixWorld.determinantAffine()<0,st=Dt(C,se,ge,ve,pe);b.setMaterial(ve,dt);let Be=ge.index,tt=1;if(ve.wireframe===!0){if(Be=Se.getWireframeAttribute(ge),Be===void 0)return;tt=2}let Xe=ge.drawRange,Gt=ge.attributes.position,_t=Xe.start*tt,Mn=(Xe.start+Xe.count)*tt;Ke!==null&&(_t=Math.max(_t,Ke.start*tt),Mn=Math.min(Mn,(Ke.start+Ke.count)*tt)),Be!==null?(_t=Math.max(_t,0),Mn=Math.min(Mn,Be.count)):Gt!=null&&(_t=Math.max(_t,0),Mn=Math.min(Mn,Gt.count));let Jn=Mn-_t;if(Jn<0||Jn===1/0)return;ot.setup(pe,ve,st,ge,Be);let Tn,Sn=nt;if(Be!==null&&(Tn=We.get(Be),Sn=Ce,Sn.setIndex(Tn)),pe.isMesh)ve.wireframe===!0?(b.setLineWidth(ve.wireframeLinewidth*tn()),Sn.setMode(ee.LINES)):Sn.setMode(ee.TRIANGLES);else if(pe.isLine){let li=ve.linewidth;li===void 0&&(li=1),b.setLineWidth(li*tn()),pe.isLineSegments?Sn.setMode(ee.LINES):pe.isLineLoop?Sn.setMode(ee.LINE_LOOP):Sn.setMode(ee.LINE_STRIP)}else pe.isPoints?Sn.setMode(ee.POINTS):pe.isSprite&&Sn.setMode(ee.TRIANGLES);if(pe.isBatchedMesh)if(Xt.get("WEBGL_multi_draw"))Sn.renderMultiDraw(pe._multiDrawStarts,pe._multiDrawCounts,pe._multiDrawCount);else{let li=pe._multiDrawStarts,mt=pe._multiDrawCounts,$n=pe._multiDrawCount,nn=Be?We.get(Be).bytesPerElement:1,Yn=ue.get(ve).currentProgram.getUniforms();for(let Nn=0;Nn<$n;Nn++)Yn.setValue(ee,"_gl_DrawID",Nn),Sn.render(li[Nn]/nn,mt[Nn])}else if(pe.isInstancedMesh)Sn.renderInstances(_t,Jn,pe.count);else if(ge.isInstancedBufferGeometry){let li=ge._maxInstanceCount!==void 0?ge._maxInstanceCount:1/0,mt=Math.min(ge.instanceCount,li);Sn.renderInstances(_t,Jn,mt)}else Sn.render(_t,Jn)};function ti(C,se,ge,ve){Y!==null&&C.isNodeMaterial&&Y.setObject(ve,C),It===!0&&yt.setState(C,ge,!1),C.transparent===!0&&C.side===vr&&C.forceSinglePass===!1?(C.side=sr,C.needsUpdate=!0,Wi(C,se,ve),C.side=os,C.needsUpdate=!0,Wi(C,se,ve),C.side=vr):Wi(C,se,ve)}this.compile=function(C,se,ge=null){ge===null&&(ge=C),Y!==null&&Y.renderStart(C,se,ge),I=Pe.get(ge),I.init(se),x.push(I),ge.traverseVisible(function(pe){pe.isLight&&pe.layers.test(se.layers)&&(I.pushLight(pe),pe.castShadow&&I.pushShadow(pe))}),C!==ge&&C.traverseVisible(function(pe){pe.isLight&&pe.layers.test(se.layers)&&(I.pushLight(pe),pe.castShadow&&I.pushShadow(pe))}),I.setupLights(),Y!==null&&Y.updateLights(I.state.lightsArray),pt=this.localClippingEnabled,It=yt.init(this.clippingPlanes,pt),It===!0&&yt.setGlobalState(this.clippingPlanes,se),Y!==null&&et.render(I.state.shadowsArray,ge,se);let ve=new Set;return C.traverse(function(pe){if(!(pe.isMesh||pe.isPoints||pe.isLine||pe.isSprite))return;let Ke=pe.material;if(Ke)if(Array.isArray(Ke))for(let dt=0;dt<Ke.length;dt++){let st=Ke[dt];ti(st,ge,se,pe),ve.add(st)}else ti(Ke,ge,se,pe),ve.add(Ke)}),I=x.pop(),Y!==null&&Y.renderEnd(),ve},this.compileAsync=function(C,se,ge=null){let ve=this.compile(C,se,ge);return new Promise(pe=>{function Ke(){if(ve.forEach(function(dt){let Be=ue.get(dt).currentProgram;(Be===void 0||Be.isReady())&&ve.delete(dt)}),ve.size===0){pe(C);return}setTimeout(Ke,10)}Xt.get("KHR_parallel_shader_compile")!==null?Ke():setTimeout(Ke,10)})};let gn=null;function Ci(C){gn&&gn(C)}function Oi(){hi.stop()}function oi(){hi.start()}let hi=new T0;hi.setAnimationLoop(Ci),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(C){gn=C,Ge.setAnimationLoop(C),C===null?hi.stop():hi.start()},Ge.addEventListener("sessionstart",Oi),Ge.addEventListener("sessionend",oi),this.render=function(C,se){if(se!==void 0&&se.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;Y!==null&&Y.renderStart(C,se);let ge=Ge.enabled===!0&&Ge.isPresenting===!0,ve=L!==null&&(W===null||ge)&&L.begin(k,W);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),se.parent===null&&se.matrixWorldAutoUpdate===!0&&se.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(se),se=Ge.getCamera()),C.isScene===!0&&C.onBeforeRender(k,C,se,W),I=Pe.get(C,x.length),I.init(se),I.state.textureUnits=Me.getTextureUnits(),x.push(I),bt.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),ut.setFromProjectionMatrix(bt,$r,se.reversedDepth),pt=this.localClippingEnabled,It=yt.init(this.clippingPlanes,pt),A=$e.get(C,U.length),A.init(),U.push(A),Ge.enabled===!0&&Ge.isPresenting===!0){let dt=k.xr.getDepthSensingMesh();dt!==null&&ln(dt,se,-1/0,k.sortObjects)}ln(C,se,0,k.sortObjects),A.finish(),Y!==null&&Y.updateLights(I.state.lightsArray),k.sortObjects===!0&&A.sort(Re,ze),Bt=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,Bt&&Lt.addToRenderList(A,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),It===!0&&yt.beginShadows();let pe=I.state.shadowsArray;if(et.render(pe,C,se),It===!0&&yt.endShadows(),(ve&&L.hasRenderPass())===!1){let dt=A.opaque,st=A.transmissive;if(I.setupLights(),se.isArrayCamera){let Be=se.cameras;if(st.length>0)for(let tt=0,Xe=Be.length;tt<Xe;tt++){let Gt=Be[tt];Rr(dt,st,C,Gt)}Bt&&Lt.render(C);for(let tt=0,Xe=Be.length;tt<Xe;tt++){let Gt=Be[tt];qn(A,C,Gt,Gt.viewport)}}else st.length>0&&Rr(dt,st,C,se),Bt&&Lt.render(C),qn(A,C,se)}W!==null&&K===0&&(Me.updateMultisampleRenderTarget(W),Me.updateRenderTargetMipmap(W)),ve&&L.end(k),C.isScene===!0&&C.onAfterRender(k,C,se),ot.resetDefaultState(),O=-1,ne=null,x.pop(),x.length>0?(I=x[x.length-1],Me.setTextureUnits(I.state.textureUnits),It===!0&&yt.setGlobalState(k.clippingPlanes,I.state.camera)):I=null,U.pop(),U.length>0?A=U[U.length-1]:A=null,Y!==null&&Y.renderEnd()};function ln(C,se,ge,ve){if(C.visible===!1)return;if(C.layers.test(se.layers)){if(C.isGroup)ge=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(se);else if(C.isLightProbeGrid)I.pushLightProbeGrid(C);else if(C.isLight)I.pushLight(C),C.castShadow&&I.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(ut)){ve&&fn.setFromMatrixPosition(C.matrixWorld).applyMatrix4(bt);let dt=we.update(C),st=C.material;st.visible&&A.push(C,dt,st,ge,fn.z,null,se)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(ut))){let dt=we.update(C),st=C.material;if(ve&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),fn.copy(C.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),fn.copy(dt.boundingSphere.center)),fn.applyMatrix4(C.matrixWorld).applyMatrix4(bt)),Array.isArray(st)){let Be=dt.groups;for(let tt=0,Xe=Be.length;tt<Xe;tt++){let Gt=Be[tt],_t=st[Gt.materialIndex];_t&&_t.visible&&A.push(C,dt,_t,ge,fn.z,Gt,se)}}else st.visible&&A.push(C,dt,st,ge,fn.z,null,se)}}let Ke=C.children;for(let dt=0,st=Ke.length;dt<st;dt++)ln(Ke[dt],se,ge,ve)}function qn(C,se,ge,ve){let{opaque:pe,transmissive:Ke,transparent:dt}=C;I.setupLightsView(ge),It===!0&&yt.setGlobalState(k.clippingPlanes,ge),ve&&b.viewport(ae.copy(ve)),pe.length>0&&wn(pe,se,ge),Ke.length>0&&wn(Ke,se,ge),dt.length>0&&wn(dt,se,ge),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Rr(C,se,ge,ve){if((ge.isScene===!0?ge.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[ve.id]===void 0){let _t=Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[ve.id]=new mr(1,1,{generateMipmaps:!0,type:_t?jr:gr,minFilter:cs,samples:Math.max(4,G.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_n.workingColorSpace})}let Ke=I.state.transmissionRenderTarget[ve.id],dt=ve.viewport||ae;Ke.setSize(dt.z*k.transmissionResolutionScale,dt.w*k.transmissionResolutionScale);let st=k.getRenderTarget(),Be=k.getActiveCubeFace(),tt=k.getActiveMipmapLevel();k.setRenderTarget(Ke),k.getClearColor(fe),Ie=k.getClearAlpha(),Ie<1&&k.setClearColor(16777215,.5),k.clear(),Bt&&Lt.render(ge);let Xe=k.toneMapping;k.toneMapping=Kr;let Gt=ve.viewport;if(ve.viewport!==void 0&&(ve.viewport=void 0),I.setupLightsView(ve),It===!0&&yt.setGlobalState(k.clippingPlanes,ve),wn(C,ge,ve),Me.updateMultisampleRenderTarget(Ke),Me.updateRenderTargetMipmap(Ke),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let _t=!1;for(let Mn=0,Jn=se.length;Mn<Jn;Mn++){let Tn=se[Mn],{object:Sn,geometry:li,material:mt,group:$n}=Tn;if(mt.side===vr&&Sn.layers.test(ve.layers)){let nn=mt.side;mt.side=sr,mt.needsUpdate=!0,Yt(Sn,ge,ve,li,mt,$n),mt.side=nn,mt.needsUpdate=!0,_t=!0}}_t===!0&&(Me.updateMultisampleRenderTarget(Ke),Me.updateRenderTargetMipmap(Ke))}k.setRenderTarget(st,Be,tt),k.setClearColor(fe,Ie),Gt!==void 0&&(ve.viewport=Gt),k.toneMapping=Xe}function wn(C,se,ge){let ve=se.isScene===!0?se.overrideMaterial:null;for(let pe=0,Ke=C.length;pe<Ke;pe++){let dt=C[pe],{object:st,geometry:Be,group:tt}=dt,Xe=dt.material;Xe.allowOverride===!0&&ve!==null&&(Xe=ve),st.layers.test(ge.layers)&&Yt(st,se,ge,Be,Xe,tt)}}function Yt(C,se,ge,ve,pe,Ke){Y!==null&&pe.isNodeMaterial&&Y.setObject(C,pe),C.onBeforeRender(k,se,ge,ve,pe,Ke),C.modelViewMatrix.multiplyMatrices(ge.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),pe.onBeforeRender(k,se,ge,ve,C,Ke),pe.transparent===!0&&pe.side===vr&&pe.forceSinglePass===!1?(pe.side=sr,pe.needsUpdate=!0,k.renderBufferDirect(ge,se,ve,pe,C,Ke),pe.side=os,pe.needsUpdate=!0,k.renderBufferDirect(ge,se,ve,pe,C,Ke),pe.side=vr):k.renderBufferDirect(ge,se,ve,pe,C,Ke),C.onAfterRender(k,se,ge,ve,pe,Ke)}function Wi(C,se,ge){se.isScene!==!0&&(se=en);let ve=ue.get(C),pe=I.state.lights,Ke=I.state.shadowsArray,dt=pe.state.version,st=Je.getParameters(C,pe.state,Ke,se,ge,I.state.lightProbeGridArray),Be=Je.getProgramCacheKey(st),tt=ve.programs;ve.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?se.environment:null,ve.fog=se.fog;let Xe=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ve.envMap=ke.get(C.envMap||ve.environment,Xe),ve.envMapRotation=ve.environment!==null&&C.envMap===null?se.environmentRotation:C.envMapRotation,tt===void 0&&(C.addEventListener("dispose",kt),tt=new Map,ve.programs=tt);let Gt=tt.get(Be);if(Gt!==void 0){if(ve.currentProgram===Gt&&ve.lightsStateVersion===dt)return Pr(C,st),Gt}else st.uniforms=Je.getUniforms(C),Y!==null&&C.isNodeMaterial&&Y.build(C,ge,st),C.onBeforeCompile(st,k),Gt=Je.acquireProgram(st,Be),tt.set(Be,Gt),ve.uniforms=st.uniforms;let _t=ve.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(_t.clippingPlanes=yt.uniform),Pr(C,st),ve.needsLights=Oa(C),ve.lightsStateVersion=dt,ve.needsLights&&(_t.ambientLightColor.value=pe.state.ambient,_t.lightProbe.value=pe.state.probe,_t.sunLights.value=pe.state.sun,_t.sunLightShadows.value=pe.state.sunShadow,_t.directionalLights.value=pe.state.directional,_t.directionalLightShadows.value=pe.state.directionalShadow,_t.spotLights.value=pe.state.spot,_t.spotLightShadows.value=pe.state.spotShadow,_t.rectAreaLights.value=pe.state.rectArea,_t.ltc_1.value=pe.state.rectAreaLTC1,_t.ltc_2.value=pe.state.rectAreaLTC2,_t.pointLights.value=pe.state.point,_t.pointLightShadows.value=pe.state.pointShadow,_t.hemisphereLights.value=pe.state.hemi,_t.sunShadowMatrix.value=pe.state.sunShadowMatrix,_t.sunShadowCascade.value=pe.state.sunShadowCascade,_t.directionalShadowMatrix.value=pe.state.directionalShadowMatrix,_t.spotLightMatrix.value=pe.state.spotLightMatrix,_t.spotLightMap.value=pe.state.spotLightMap,_t.pointShadowMatrix.value=pe.state.pointShadowMatrix),ve.lightProbeGrid=I.state.lightProbeGridArray.length>0,ve.currentProgram=Gt,ve.uniformsList=null,Gt}function or(C){if(C.uniformsList===null){let se=C.currentProgram.getUniforms();C.uniformsList=Io.seqWithValue(se.seq,C.uniforms)}return C.uniformsList}function Pr(C,se){let ge=ue.get(C);ge.outputColorSpace=se.outputColorSpace,ge.batching=se.batching,ge.batchingColor=se.batchingColor,ge.instancing=se.instancing,ge.instancingColor=se.instancingColor,ge.instancingMorph=se.instancingMorph,ge.skinning=se.skinning,ge.morphTargets=se.morphTargets,ge.morphNormals=se.morphNormals,ge.morphColors=se.morphColors,ge.morphTargetsCount=se.morphTargetsCount,ge.numClippingPlanes=se.numClippingPlanes,ge.numIntersection=se.numClipIntersection,ge.vertexAlphas=se.vertexAlphas,ge.vertexTangents=se.vertexTangents,ge.toneMapping=se.toneMapping}function Fa(C,se){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;_.setFromMatrixPosition(se.matrixWorld);for(let ge=0,ve=C.length;ge<ve;ge++){let pe=C[ge];if(pe.texture!==null&&pe.boundingBox.containsPoint(_))return pe}return null}function Dt(C,se,ge,ve,pe){se.isScene!==!0&&(se=en),Me.resetTextureUnits();let Ke=se.fog,dt=ve.isMeshStandardMaterial||ve.isMeshLambertMaterial||ve.isMeshPhongMaterial?se.environment:null,st=W===null?k.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:_n.workingColorSpace,Be=ve.isMeshStandardMaterial||ve.isMeshLambertMaterial&&!ve.envMap||ve.isMeshPhongMaterial&&!ve.envMap,tt=ke.get(ve.envMap||dt,Be),Xe=ve.vertexColors===!0&&!!ge.attributes.color&&ge.attributes.color.itemSize===4,Gt=!!ge.attributes.tangent&&(!!ve.normalMap||ve.anisotropy>0),_t=!!ge.morphAttributes.position,Mn=!!ge.morphAttributes.normal,Jn=!!ge.morphAttributes.color,Tn=Kr;ve.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Tn=k.toneMapping);let Sn=ge.morphAttributes.position||ge.morphAttributes.normal||ge.morphAttributes.color,li=Sn!==void 0?Sn.length:0,mt=ue.get(ve),$n=I.state.lights;if(It===!0&&(pt===!0||C!==ne)){let St=C===ne&&ve.id===O;yt.setState(ve,C,St)}let nn=!1;ve.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==$n.state.version||mt.outputColorSpace!==st||pe.isBatchedMesh&&mt.batching===!1||!pe.isBatchedMesh&&mt.batching===!0||pe.isBatchedMesh&&mt.batchingColor===!0&&pe._colorsTexture===null||pe.isBatchedMesh&&mt.batchingColor===!1&&pe._colorsTexture!==null||pe.isInstancedMesh&&mt.instancing===!1||!pe.isInstancedMesh&&mt.instancing===!0||pe.isSkinnedMesh&&mt.skinning===!1||!pe.isSkinnedMesh&&mt.skinning===!0||pe.isInstancedMesh&&mt.instancingColor===!0&&pe.instanceColor===null||pe.isInstancedMesh&&mt.instancingColor===!1&&pe.instanceColor!==null||pe.isInstancedMesh&&mt.instancingMorph===!0&&pe.morphTexture===null||pe.isInstancedMesh&&mt.instancingMorph===!1&&pe.morphTexture!==null||mt.envMap!==tt||ve.fog===!0&&mt.fog!==Ke||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==yt.numPlanes||mt.numIntersection!==yt.numIntersection)||mt.vertexAlphas!==Xe||mt.vertexTangents!==Gt||mt.morphTargets!==_t||mt.morphNormals!==Mn||mt.morphColors!==Jn||mt.toneMapping!==Tn||mt.morphTargetsCount!==li||!!mt.lightProbeGrid!=I.state.lightProbeGridArray.length>0)&&(nn=!0):(nn=!0,mt.__version=ve.version);let Yn=mt.currentProgram;nn===!0&&(Yn=Wi(ve,se,pe),Y&&ve.isNodeMaterial&&Y.onUpdateProgram(ve,Yn,mt));let Nn=!1,wt=!1,Bi=!1,rn=Yn.getUniforms(),Dn=mt.uniforms;if(b.useProgram(Yn.program)&&(Nn=!0,wt=!0,Bi=!0),ve.id!==O&&(O=ve.id,wt=!0),mt.needsLights){let St=Fa(I.state.lightProbeGridArray,pe);mt.lightProbeGrid!==St&&(mt.lightProbeGrid=St,wt=!0)}if(Nn||ne!==C){b.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),rn.setValue(ee,"projectionMatrix",C.projectionMatrix),rn.setValue(ee,"viewMatrix",C.matrixWorldInverse);let Gn=rn.map.cameraPosition;Gn!==void 0&&Gn.setValue(ee,Ve.setFromMatrixPosition(C.matrixWorld)),G.logarithmicDepthBuffer&&rn.setValue(ee,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ve.isMeshPhongMaterial||ve.isMeshToonMaterial||ve.isMeshLambertMaterial||ve.isMeshBasicMaterial||ve.isMeshStandardMaterial||ve.isShaderMaterial)&&rn.setValue(ee,"isOrthographic",C.isOrthographicCamera===!0),ne!==C&&(ne=C,wt=!0,Bi=!0)}if(mt.needsLights&&($n.state.sunShadowMap.length>0&&rn.setValue(ee,"sunShadowMap",$n.state.sunShadowMap,Me),$n.state.directionalShadowMap.length>0&&rn.setValue(ee,"directionalShadowMap",$n.state.directionalShadowMap,Me),$n.state.spotShadowMap.length>0&&rn.setValue(ee,"spotShadowMap",$n.state.spotShadowMap,Me),$n.state.pointShadowMap.length>0&&rn.setValue(ee,"pointShadowMap",$n.state.pointShadowMap,Me)),pe.isSkinnedMesh){rn.setOptional(ee,pe,"bindMatrix"),rn.setOptional(ee,pe,"bindMatrixInverse");let St=pe.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),rn.setValue(ee,"boneTexture",St.boneTexture,Me))}pe.isBatchedMesh&&(rn.setOptional(ee,pe,"batchingTexture"),rn.setValue(ee,"batchingTexture",pe._matricesTexture,Me),rn.setOptional(ee,pe,"batchingIdTexture"),rn.setValue(ee,"batchingIdTexture",pe._indirectTexture,Me),rn.setOptional(ee,pe,"batchingColorTexture"),pe._colorsTexture!==null&&rn.setValue(ee,"batchingColorTexture",pe._colorsTexture,Me));let Xi=ge.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&ie.update(pe,ge,Yn),(wt||mt.receiveShadow!==pe.receiveShadow)&&(mt.receiveShadow=pe.receiveShadow,rn.setValue(ee,"receiveShadow",pe.receiveShadow)),(ve.isMeshStandardMaterial||ve.isMeshLambertMaterial||ve.isMeshPhongMaterial)&&ve.envMap===null&&se.environment!==null&&(Dn.envMapIntensity.value=se.environmentIntensity),Dn.dfgLUT!==void 0&&(Dn.dfgLUT.value=zS()),wt){if(rn.setValue(ee,"toneMappingExposure",k.toneMappingExposure),mt.needsLights&&lr(Dn,Bi),Ke&&ve.fog===!0&&gt.refreshFogUniforms(Dn,Ke),gt.refreshMaterialUniforms(Dn,ve,le,re,I.state.transmissionRenderTarget[C.id]),mt.needsLights&&mt.lightProbeGrid){let St=mt.lightProbeGrid;Dn.probesSH.value=St.texture,Dn.probesMin.value.copy(St.boundingBox.min),Dn.probesMax.value.copy(St.boundingBox.max),Dn.probesResolution.value.copy(St.resolution)}Io.upload(ee,or(mt),Dn,Me)}if(ve.isShaderMaterial&&ve.uniformsNeedUpdate===!0&&(Io.upload(ee,or(mt),Dn,Me),ve.uniformsNeedUpdate=!1),ve.isSpriteMaterial&&rn.setValue(ee,"center",pe.center),rn.setValue(ee,"modelViewMatrix",pe.modelViewMatrix),rn.setValue(ee,"normalMatrix",pe.normalMatrix),rn.setValue(ee,"modelMatrix",pe.matrixWorld),ve.uniformsGroups!==void 0){let St=ve.uniformsGroups;for(let Gn=0,qi=St.length;Gn<qi;Gn++){let fs=St[Gn];Oe.update(fs,Yn),Oe.bind(fs,Yn)}}return Yn}function lr(C,se){C.ambientLightColor.needsUpdate=se,C.lightProbe.needsUpdate=se,C.sunLights.needsUpdate=se,C.sunLightShadows.needsUpdate=se,C.directionalLights.needsUpdate=se,C.directionalLightShadows.needsUpdate=se,C.pointLights.needsUpdate=se,C.pointLightShadows.needsUpdate=se,C.spotLights.needsUpdate=se,C.spotLightShadows.needsUpdate=se,C.rectAreaLights.needsUpdate=se,C.hemisphereLights.needsUpdate=se}function Oa(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(C,se,ge){let ve=ue.get(C);ve.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ve.__autoAllocateDepthBuffer===!1&&(ve.__useRenderToTexture=!1),ue.get(C.texture).__webglTexture=se,ue.get(C.depthTexture).__webglTexture=ve.__autoAllocateDepthBuffer?void 0:ge,ve.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,se){let ge=ue.get(C);ge.__webglFramebuffer=se,ge.__useDefaultFramebuffer=se===void 0},this.setRenderTarget=function(C,se=0,ge=0){W=C,z=se,K=ge;let ve=null,pe=!1,Ke=!1;if(C){let st=ue.get(C);if(st.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(ee.FRAMEBUFFER,st.__webglFramebuffer),ae.copy(C.viewport),xe.copy(C.scissor),be=C.scissorTest,b.viewport(ae),b.scissor(xe),b.setScissorTest(be),O=-1;return}else if(st.__webglFramebuffer===void 0)Me.setupRenderTarget(C);else if(st.__hasExternalTextures)Me.rebindTextures(C,ue.get(C.texture).__webglTexture,ue.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Xe=C.depthTexture;if(st.__boundDepthTexture!==Xe){if(Xe!==null&&ue.has(Xe)&&(C.width!==Xe.image.width||C.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Me.setupDepthRenderbuffer(C)}}let Be=C.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Ke=!0);let tt=ue.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(tt[se])?ve=tt[se][ge]:ve=tt[se],pe=!0):C.samples>0&&Me.useMultisampledRTT(C)===!1?ve=ue.get(C).__webglMultisampledFramebuffer:Array.isArray(tt)?ve=tt[ge]:ve=tt,ae.copy(C.viewport),xe.copy(C.scissor),be=C.scissorTest}else ae.copy(Fe).multiplyScalar(le).floor(),xe.copy(ft).multiplyScalar(le).floor(),be=Ot;if(ge!==0&&(ve=E),b.bindFramebuffer(ee.FRAMEBUFFER,ve)&&b.drawBuffers(C,ve),b.viewport(ae),b.scissor(xe),b.setScissorTest(be),pe){let st=ue.get(C.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+se,st.__webglTexture,ge)}else if(Ke){let st=se;for(let Be=0;Be<C.textures.length;Be++){let tt=ue.get(C.textures[Be]);ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0+Be,tt.__webglTexture,ge,st)}}else if(C!==null&&ge!==0){let st=ue.get(C.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,st.__webglTexture,ge)}O=-1};function Cn(C){let se=ue.get(C);return(se.__readFormat!==C.format||se.__readType!==C.type)&&(se.__readFormat=C.format,se.__readType=C.type,se.__formatReadable=G.textureFormatReadable(C.format),se.__typeReadable=G.textureTypeReadable(C.type)),se}this.readRenderTargetPixels=function(C,se,ge,ve,pe,Ke,dt,st=0){if(!(C&&C.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=ue.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&dt!==void 0&&(Be=Be[dt]),Be){b.bindFramebuffer(ee.FRAMEBUFFER,Be);try{let tt=C.textures[st],Xe=tt.format,Gt=tt.type;C.textures.length>1&&ee.readBuffer(ee.COLOR_ATTACHMENT0+st);let _t=Cn(tt);if(_t.__formatReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(_t.__typeReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}se>=0&&se<=C.width-ve&&ge>=0&&ge<=C.height-pe&&ee.readPixels(se,ge,ve,pe,je.convert(Xe),je.convert(Gt),Ke)}finally{let tt=W!==null?ue.get(W).__webglFramebuffer:null;b.bindFramebuffer(ee.FRAMEBUFFER,tt)}}},this.readRenderTargetPixelsAsync=async function(C,se,ge,ve,pe,Ke,dt,st=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=ue.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&dt!==void 0&&(Be=Be[dt]),Be)if(se>=0&&se<=C.width-ve&&ge>=0&&ge<=C.height-pe){b.bindFramebuffer(ee.FRAMEBUFFER,Be);let tt=C.textures[st],Xe=tt.format,Gt=tt.type;C.textures.length>1&&ee.readBuffer(ee.COLOR_ATTACHMENT0+st);let _t=Cn(tt);if(_t.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(_t.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Mn=ee.createBuffer();ee.bindBuffer(ee.PIXEL_PACK_BUFFER,Mn),ee.bufferData(ee.PIXEL_PACK_BUFFER,Ke.byteLength,ee.STREAM_READ),ee.readPixels(se,ge,ve,pe,je.convert(Xe),je.convert(Gt),0),ee.bindBuffer(ee.PIXEL_PACK_BUFFER,null);let Jn=W!==null?ue.get(W).__webglFramebuffer:null;b.bindFramebuffer(ee.FRAMEBUFFER,Jn);let Tn=ee.fenceSync(ee.SYNC_GPU_COMMANDS_COMPLETE,0);return ee.flush(),await Zm(ee,Tn,4),ee.bindBuffer(ee.PIXEL_PACK_BUFFER,Mn),ee.getBufferSubData(ee.PIXEL_PACK_BUFFER,0,Ke),ee.bindBuffer(ee.PIXEL_PACK_BUFFER,null),ee.deleteBuffer(Mn),ee.deleteSync(Tn),Ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,se=null,ge=0){let ve=Math.pow(2,-ge),pe=Math.floor(C.image.width*ve),Ke=Math.floor(C.image.height*ve),dt=se!==null?se.x:0,st=se!==null?se.y:0;Me.setTexture2D(C,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,ge,0,0,dt,st,pe,Ke),b.unbindTexture()},this.copyTextureToTexture=function(C,se,ge=null,ve=null,pe=0,Ke=0){let dt,st,Be,tt,Xe,Gt,_t,Mn,Jn,Tn=C.isCompressedTexture?C.mipmaps[Ke]:C.image;if(ge!==null)dt=ge.max.x-ge.min.x,st=ge.max.y-ge.min.y,Be=ge.isBox3?ge.max.z-ge.min.z:1,tt=ge.min.x,Xe=ge.min.y,Gt=ge.isBox3?ge.min.z:0;else{let Dn=Math.pow(2,-pe);dt=Math.floor(Tn.width*Dn),st=Math.floor(Tn.height*Dn),C.isDataArrayTexture?Be=Tn.depth:C.isData3DTexture?Be=Math.floor(Tn.depth*Dn):Be=1,tt=0,Xe=0,Gt=0}ve!==null?(_t=ve.x,Mn=ve.y,Jn=ve.z):(_t=0,Mn=0,Jn=0);let Sn=je.convert(se.format),li=je.convert(se.type),mt;se.isData3DTexture?(Me.setTexture3D(se,0),mt=ee.TEXTURE_3D):se.isDataArrayTexture||se.isCompressedArrayTexture?(Me.setTexture2DArray(se,0),mt=ee.TEXTURE_2D_ARRAY):(Me.setTexture2D(se,0),mt=ee.TEXTURE_2D),b.activeTexture(ee.TEXTURE0),b.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,se.flipY),b.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),b.pixelStorei(ee.UNPACK_ALIGNMENT,se.unpackAlignment);let $n=b.getParameter(ee.UNPACK_ROW_LENGTH),nn=b.getParameter(ee.UNPACK_IMAGE_HEIGHT),Yn=b.getParameter(ee.UNPACK_SKIP_PIXELS),Nn=b.getParameter(ee.UNPACK_SKIP_ROWS),wt=b.getParameter(ee.UNPACK_SKIP_IMAGES);b.pixelStorei(ee.UNPACK_ROW_LENGTH,Tn.width),b.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,Tn.height),b.pixelStorei(ee.UNPACK_SKIP_PIXELS,tt),b.pixelStorei(ee.UNPACK_SKIP_ROWS,Xe),b.pixelStorei(ee.UNPACK_SKIP_IMAGES,Gt);let Bi=C.isDataArrayTexture||C.isData3DTexture,rn=se.isDataArrayTexture||se.isData3DTexture;if(C.isDepthTexture){let Dn=ue.get(C),Xi=ue.get(se),St=ue.get(Dn.__renderTarget),Gn=ue.get(Xi.__renderTarget);b.bindFramebuffer(ee.READ_FRAMEBUFFER,St.__webglFramebuffer),b.bindFramebuffer(ee.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let qi=0;qi<Be;qi++)Bi&&(ee.framebufferTextureLayer(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ue.get(C).__webglTexture,pe,Gt+qi),ee.framebufferTextureLayer(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ue.get(se).__webglTexture,Ke,Jn+qi)),ee.blitFramebuffer(tt,Xe,dt,st,_t,Mn,dt,st,ee.DEPTH_BUFFER_BIT,ee.NEAREST);b.bindFramebuffer(ee.READ_FRAMEBUFFER,null),b.bindFramebuffer(ee.DRAW_FRAMEBUFFER,null)}else if(pe!==0||C.isRenderTargetTexture||ue.has(C)){let Dn=ue.get(C),Xi=ue.get(se);b.bindFramebuffer(ee.READ_FRAMEBUFFER,S),b.bindFramebuffer(ee.DRAW_FRAMEBUFFER,B);for(let St=0;St<Be;St++)Bi?ee.framebufferTextureLayer(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Dn.__webglTexture,pe,Gt+St):ee.framebufferTexture2D(ee.READ_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,Dn.__webglTexture,pe),rn?ee.framebufferTextureLayer(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Xi.__webglTexture,Ke,Jn+St):ee.framebufferTexture2D(ee.DRAW_FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_2D,Xi.__webglTexture,Ke),pe!==0?ee.blitFramebuffer(tt,Xe,dt,st,_t,Mn,dt,st,ee.COLOR_BUFFER_BIT,ee.NEAREST):rn?ee.copyTexSubImage3D(mt,Ke,_t,Mn,Jn+St,tt,Xe,dt,st):ee.copyTexSubImage2D(mt,Ke,_t,Mn,tt,Xe,dt,st);b.bindFramebuffer(ee.READ_FRAMEBUFFER,null),b.bindFramebuffer(ee.DRAW_FRAMEBUFFER,null)}else rn?C.isDataTexture||C.isData3DTexture?ee.texSubImage3D(mt,Ke,_t,Mn,Jn,dt,st,Be,Sn,li,Tn.data):se.isCompressedArrayTexture?ee.compressedTexSubImage3D(mt,Ke,_t,Mn,Jn,dt,st,Be,Sn,Tn.data):ee.texSubImage3D(mt,Ke,_t,Mn,Jn,dt,st,Be,Sn,li,Tn):C.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,Ke,_t,Mn,dt,st,Sn,li,Tn.data):C.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,Ke,_t,Mn,Tn.width,Tn.height,Sn,Tn.data):ee.texSubImage2D(ee.TEXTURE_2D,Ke,_t,Mn,dt,st,Sn,li,Tn);b.pixelStorei(ee.UNPACK_ROW_LENGTH,$n),b.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,nn),b.pixelStorei(ee.UNPACK_SKIP_PIXELS,Yn),b.pixelStorei(ee.UNPACK_SKIP_ROWS,Nn),b.pixelStorei(ee.UNPACK_SKIP_IMAGES,wt),Ke===0&&se.generateMipmaps&&ee.generateMipmap(mt),b.unbindTexture()},this.initRenderTarget=function(C){ue.get(C).__webglFramebuffer===void 0&&Me.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Me.setTextureCube(C,0):C.isData3DTexture?Me.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Me.setTexture2DArray(C,0):Me.setTexture2D(C,0),b.unbindTexture()},this.resetState=function(){z=0,K=0,W=null,b.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_n._getDrawingBufferColorSpace(e),t.unpackColorSpace=_n._getUnpackColorSpace()}};var ai=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},N0=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a};function kS(n){for(var e=atob(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);for(var r=new DataView(t.buffer,t.byteOffset,t.byteLength),a=r.getUint32(8,!0),s=r.getUint32(12,!0),o=new Float32Array(a*3),c=new Float32Array(a*3),l=new Float32Array(a*2),h=16,i=0;i<a;i++)o[i*3]=r.getFloat32(h,!0),o[i*3+1]=r.getFloat32(h+4,!0),o[i*3+2]=r.getFloat32(h+8,!0),c[i*3]=r.getFloat32(h+12,!0),c[i*3+1]=r.getFloat32(h+16,!0),c[i*3+2]=r.getFloat32(h+20,!0),l[i*2]=r.getFloat32(h+24,!0),l[i*2+1]=r.getFloat32(h+28,!0),h+=32;for(var f=new Uint16Array(s),i=0;i<s;i++)f[i]=r.getUint16(h+i*2,!0);var d=new Gi;return d.setAttribute("position",new Ln(o,3)),d.setAttribute("normal",new Ln(c,3)),d.setAttribute("uv",new Ln(l,2)),d.setIndex(Array.from(f)),d}function L0(n,e,t){return!n||t>=1?0:t<=-1?1.1:(1-t)*.55}function VS(n,e,t){var i,r,a,s,o,c,l,h,f,d,m,y,T,g,p,v,w,_=new pr,A=!!n.fairwayRamp,I=(T=n.cupX)!==null&&T!==void 0?T:0,U=(g=n.cupZ)!==null&&g!==void 0?g:-4.8,x=(p=n.cupRadius)!==null&&p!==void 0?p:.23,L=new Er(1,1,1),k=new Map,V=function(we,Je,gt,$e,Pe,yt,et){var Lt=k.get(et);Lt||(Lt=new Hi({color:et}),k.set(et,Lt));var ie=new Vn(L,Lt);ie.position.set(we,Je,gt),ie.scale.set($e,Pe,yt),_.add(ie)};try{for(var Y=ai([-3.2,3.2]),E=Y.next();!E.done;E=Y.next()){var S=E.value;V(S,-.65,0,.2,1.1,14.6,"#a1b8b1"),V(S-Math.sign(S)*.1,-.18,0,.2,.25,14.4,"#e9cea5")}}catch(we){i={error:we}}finally{try{E&&!E.done&&(r=Y.return)&&r.call(Y)}finally{if(i)throw i.error}}try{for(var B=ai([-7.2,7.2]),z=B.next();!z.done;z=B.next()){var K=z.value;V(0,-.65,K,6.4,1.1,.2,"#a1b8b1"),V(0,-.18,K-Math.sign(K)*.1,6.2,.25,.2,"#e9cea5")}}catch(we){a={error:we}}finally{try{z&&!z.done&&(s=B.return)&&s.call(B)}finally{if(a)throw a.error}}var W=.5,O=.5;if(t){var ne=t.getAttribute("uv"),ae=t.getAttribute("normal");if(ne&&ae){for(var xe=0;xe<ae.count&&ae.getY(xe)<.9;)xe++;xe<ne.count&&(W=ne.getX(xe),O=ne.getY(xe))}}var be=!!(e&&(!((v=e.image)===null||v===void 0)&&v.complete)&&((w=e.image)===null||w===void 0?void 0:w.naturalWidth)>0),fe=be?new Hi({map:e}):new Hi({color:"#6ec458"}),Ie=be?new Hi({map:e,color:"#779263"}):new Hi({color:"#5a9949"});e&&!be&&(fe.userData.pendingTex={tex:e,color:"#ffffff"},Ie.userData.pendingTex={tex:e,color:"#779263"});var De=A?[[-7,-1],[-1,1],[1,7]]:[[-7,7]];try{for(var re=ai(De),le=re.next();!le.done;le=re.next()){var Re=N0(le.value,2),ze=Re[0],Fe=Re[1],ft=new go;if(ft.moveTo(-3,ze),ft.lineTo(3,ze),ft.lineTo(3,Fe),ft.lineTo(-3,Fe),ft.closePath(),U>ze&&U<Fe){var Ot=new Is;Ot.absarc(I,U,x,0,Math.PI*2,!0),ft.holes.push(Ot)}for(var ut=new Tl(ft,32),It=ut.getAttribute("position"),pt=!1,bt=!1,Ve=0;Ve<It.count;Ve++){var fn=It.getX(Ve),en=It.getY(Ve),Bt=L0(A,fn,en);Bt===0&&(pt=!0),Bt>0&&(bt=!0),It.setXYZ(Ve,fn,Bt,en)}var tn=ut.getIndex();if(tn)for(var Ve=0;Ve<tn.count;Ve+=3){var ee=tn.getX(Ve+1);tn.setX(Ve+1,tn.getX(Ve+2)),tn.setX(Ve+2,ee)}ut.computeVertexNormals();for(var Qt=ut.getAttribute("uv"),Ve=0;Ve<Qt.count;Ve++)Qt.setXY(Ve,W,O);var Xt=new Vn(ut,A&&pt&&bt?Ie:fe);Xt.name="continuous-fairway",_.add(Xt)}}catch(we){o={error:we}}finally{try{le&&!le.done&&(c=re.return)&&c.call(re)}finally{if(o)throw o.error}}var G="#d69260",b="#f1bd87";try{for(var oe=ai([-3.1,3.1]),ue=oe.next();!ue.done;ue=oe.next()){var S=ue.value;V(S,.12,0,.2,.3,14.2,G),V(S,.29,0,.22,.04,14.2,b)}}catch(we){l={error:we}}finally{try{ue&&!ue.done&&(h=oe.return)&&h.call(oe)}finally{if(l)throw l.error}}try{for(var Me=ai([-7.1,7.1]),ke=Me.next();!ke.done;ke=Me.next()){var K=ke.value;V(0,L0(A,0,K>0?6:-6)+.12,K,6.4,.3,.2,G)}}catch(we){f={error:we}}finally{try{ke&&!ke.done&&(d=Me.return)&&d.call(Me)}finally{if(f)throw f.error}}if(A)try{for(var We=ai([-3.1,3.1]),Se=We.next();!Se.done;Se=We.next()){var S=Se.value;V(S,.7,-4.5,.2,1.1,5.2,G)}}catch(we){m={error:we}}finally{try{Se&&!Se.done&&(y=We.return)&&y.call(We)}finally{if(m)throw m.error}}return _}function GS(n){var e,t=new pr,i=(e=n.cupRadius)!==null&&e!==void 0?e:.23,r=new Vn(new As(i,i*.89,.48,24,1,!0),new Hi({color:"#244640",side:vr}));r.position.y=-.24,t.add(r);var a=new Vn(new mo(i*.91,24),new da({color:"#082c2b"}));a.rotation.x=-Math.PI/2,a.position.y=-.475,t.add(a);var s=new Vn(new As(i,i*.978,.09,24,1,!0),new Hi({color:"#eee9cf",side:vr}));s.position.y=-.045,t.add(s);var o=new Vn(new xo(i,i+.06,24),new Hi({color:"#fff7d1"}));return o.rotation.x=-Math.PI/2,o.position.y=.004,t.add(o),t}function HS(){for(var n,e,t=new pr,i=new Er(.18,1,.18),r=new Hi({color:"#b27b59"}),a=new Er(1.5,.2,1.6),s=new Hi({color:"#82b88b"}),o=new is(.62,7,5),c=new is(.49,7,5),l=new Hi({color:"#77b86b"}),h=new Hi({color:"#3e9d79"}),f=new fa(i,r,14),d=new fa(a,s,14),m=5,y=9,T=new fa(o,l,m),g=new fa(c,l,m),p=new fa(o,h,y),v=new fa(c,h,y),w=new On,_=0,A=0,I=0;I<14;I++){var U=I%2?-1:1,x=U*(3.8+I%3*.35),L=-6.5+Math.floor(I/2)*2;w.makeTranslation(x,-.02,L),f.setMatrixAt(I,w),w.makeTranslation(x,-.48,L),d.setMatrixAt(I,w),I%3===0?(w.makeTranslation(x,.5,L),T.setMatrixAt(_,w),w.makeTranslation(x,1,L),g.setMatrixAt(_,w),_++):(w.makeTranslation(x,.5,L),p.setMatrixAt(A,w),w.makeTranslation(x,1,L),v.setMatrixAt(A,w),A++)}try{for(var k=ai([f,d,T,g,p,v]),V=k.next();!V.done;V=k.next()){var Y=V.value;Y.instanceMatrix.needsUpdate=!0,t.add(Y)}}catch(E){n={error:E}}finally{try{V&&!V.done&&(e=k.return)&&e.call(k)}finally{if(n)throw n.error}}return t}function WS(n,e,t){for(var i=n.getAttribute("position"),r=0;r<i.count;r++){var a=e[r*3],s=e[r*3+1],o=e[r*3+2],c=s>.7?Math.max(0,Math.min(1,(-a-.035)/.32)):0;i.setXYZ(r,a,s+Math.sin(t*3.2+a*10)*.018*c,o+Math.sin(t*3.2+a*10+s*2)*.07*c)}i.needsUpdate=!0,n.computeVertexNormals()}function D0(n,e,t){var i=new Map,r=new Map,a=new Map,s,o,c,l,h;function f(){var w;return o||(s=document.createElement("canvas"),(w=s.addEventListener)===null||w===void 0||w.call(s,"webglcontextrestored",function(){var _,A;h=void 0;try{for(var I=ai(a.values()),U=I.next();!U.done;U=I.next()){var x=U.value;x.compiled=!1,x.textureDirty=!0,x.lastRenderedTime=-1,x.lastFlagStep=-1}}catch(L){_={error:L}}finally{try{U&&!U.done&&(A=I.return)&&A.call(I)}finally{if(_)throw _.error}}t?.()}),c=document.createElement("canvas"),l=c.getContext("2d"),o=new vh({canvas:s,antialias:!0,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"default"}),o.shadowMap.type=Mu,o)}function d(w){if(w){if(i.has(w))return i.get(w);var _=e.get(w);if(!(!_||_.mime!=="model/tora-mesh"||!_.data)){var A=kS(_.data);return i.set(w,A),A}}}function m(w){if(w){if(r.has(w))return r.get(w);var _=e.get(w);if(!(!_||!_.mime.startsWith("image/")||!_.data)){var A=new Image,I=new er(A);I.colorSpace=ar;var U=function(x){var L,k;I.needsUpdate=!0;try{for(var V=ai(a.values()),Y=V.next();!Y.done;Y=V.next()){var E=Y.value;E.scene.traverse(function(S){var B,z,K,W=S.isMesh&&S.material?Array.isArray(S.material)?S.material:[S.material]:[];try{for(var O=(B=void 0,ai(W)),ne=O.next();!ne.done;ne=O.next()){var ae=ne.value;!((K=ae.userData)===null||K===void 0)&&K.pendingTex&&ae.userData.pendingTex.tex===I&&(ae.map=I,ae.color.set(ae.userData.pendingTex.color||"#ffffff"),delete ae.userData.pendingTex,ae.needsUpdate=!0)}}catch(xe){B={error:xe}}finally{try{ne&&!ne.done&&(z=O.return)&&z.call(O)}finally{if(B)throw B.error}}}),E.textureDirty=!0}}catch(S){L={error:S}}finally{try{Y&&!Y.done&&(k=V.return)&&k.call(V)}finally{if(L)throw L.error}}x&&t?.()};return r.set(w,I),A.onload=function(){return U(!0)},A.src="data:"+_.mime+";base64,"+_.data,A.complete&&A.naturalWidth&&U(!1),I}}}function y(w){var _,A,I,U,x,L,k,V,Y,E,S,B,z,K,W,O,ne,ae,xe,be,fe,Ie,De,re,le,Re,ze,Fe,ft,Ot,ut,It,pt,bt,Ve,fn,en,Bt,tn,ee=w.parameters,Qt=new cl;Qt.background=new un(ee.skyColor||"#b8e2ed");var Xt=new ji((I=ee.cameraFov)!==null&&I!==void 0?I:39,1,.1,120);Xt.position.set((U=ee.cameraX)!==null&&U!==void 0?U:10,(x=ee.cameraY)!==null&&x!==void 0?x:18,(L=ee.cameraZ)!==null&&L!==void 0?L:21),Xt.lookAt((k=ee.lookAtX)!==null&&k!==void 0?k:0,(V=ee.lookAtY)!==null&&V!==void 0?V:.15,(Y=ee.lookAtZ)!==null&&Y!==void 0?Y:0),Qt.add(new Il(ee.hemiSkyColor||"#fff9dd",ee.hemiGroundColor||"#527b75",(E=ee.hemiIntensity)!==null&&E!==void 0?E:1.8));var G=new Rl(ee.sunColor||"#fff0cf",(S=ee.sunIntensity)!==null&&S!==void 0?S:2.1);G.position.set((B=ee.sunX)!==null&&B!==void 0?B:-9,(z=ee.sunY)!==null&&z!==void 0?z:18,(K=ee.sunZ)!==null&&K!==void 0?K:8),Qt.add(G);var b=m((O=(W=w.assetSlots)===null||W===void 0?void 0:W[0])===null||O===void 0?void 0:O.assetId),oe=new Map,ue=[],Me=[],ke=[],We=function(Ge){var Ye,Wt;try{for(var qt=ai(n.components),kt=qt.next();!kt.done;kt=qt.next()){var dn=kt.value;dn.parentId===Ge&&dn.contract==="native.mesh3d.v1"&&!dn.prototype&&(ke.push(dn),We(dn.id))}}catch(at){Ye={error:at}}finally{try{kt&&!kt.done&&(Wt=qt.return)&&Wt.call(qt)}finally{if(Ye)throw Ye.error}}};We(w.id);var Se=function(Ge){var Ye=Ge.parameters,Wt=Ge.parentId===w.id?Qt:(ne=oe.get(Ge.parentId))!==null&&ne!==void 0?ne:Qt,qt=void 0,kt=function(){var oi,hi,ln={},qn=!!(b&&(!((oi=b.image)===null||oi===void 0)&&oi.complete)&&((hi=b.image)===null||hi===void 0?void 0:hi.naturalWidth)>0);Ye.useTexture&&b&&qn?ln.map=b:ln.color=Ye.useTexture?Ye.waveFlag?"#e85d56":"#d89b6a":Ye.color||"#ffffff",Ye.doubleSide&&(ln.side=vr),Ye.opacity<1&&(ln.transparent=!0,ln.opacity=Ye.opacity,ln.depthWrite=!1);var Rr=Ye.unlit?new da(ln):new Hi(ln);return Ye.useTexture&&b&&!qn&&(Rr.userData.pendingTex={tex:b,color:"#ffffff"}),Rr};if(Ye.primitive==="group")qt=new pr;else if(Ye.primitive==="fairway")qt=VS(Ye,b,d((xe=(ae=Ge.assetSlots)===null||ae===void 0?void 0:ae[0])===null||xe===void 0?void 0:xe.assetId));else if(Ye.primitive==="cup")qt=GS(Ye);else if(Ye.primitive==="garden")qt=HS();else if(Ye.primitive==="mesh"){var dn=d((fe=(be=Ge.assetSlots)===null||be===void 0?void 0:be[0])===null||fe===void 0?void 0:fe.assetId),at=Ye.waveFlag&&dn?dn.clone():dn??new Er(1,1,1);qt=new Vn(at,kt()),Ye.waveFlag&&dn&&ue.push({geo:at,rest:new Float32Array(at.getAttribute("position").array)})}else Ye.primitive==="sphere"?qt=new Vn(new is((Ie=Ye.radiusTop)!==null&&Ie!==void 0?Ie:.5,16,12),kt()):Ye.primitive==="cylinder"?qt=new Vn(new As((De=Ye.radiusTop)!==null&&De!==void 0?De:.23,(re=Ye.radiusBottom)!==null&&re!==void 0?re:.21,1,32,1,!!Ye.openEnded),kt()):Ye.primitive==="ring"?qt=new Vn(new xo((le=Ye.innerRadius)!==null&&le!==void 0?le:0,(Re=Ye.radiusTop)!==null&&Re!==void 0?Re:.15,24),kt()):Ye.primitive==="circle"?qt=new Vn(new mo((ze=Ye.radiusTop)!==null&&ze!==void 0?ze:.21,32),kt()):qt=new Vn(new Er(1,1,1),kt());if(qt.position.set((Fe=Ye.x)!==null&&Fe!==void 0?Fe:0,(ft=Ye.y)!==null&&ft!==void 0?ft:0,(Ot=Ye.z)!==null&&Ot!==void 0?Ot:0),qt.rotation.set((ut=Ye.rx)!==null&&ut!==void 0?ut:0,(It=Ye.ry)!==null&&It!==void 0?It:0,(pt=Ye.rz)!==null&&pt!==void 0?pt:0),qt.scale.set((bt=Ye.sx)!==null&&bt!==void 0?bt:1,(Ve=Ye.sy)!==null&&Ve!==void 0?Ve:1,(fn=Ye.sz)!==null&&fn!==void 0?fn:1),qt.visible=Ye.visible!==!1,Wt.add(qt),oe.set(Ge.id,qt),Ye.confetti){var ti=new pr,gn=new Er(.08,.025,.12),Ci=["#ffda69","#fff6c9","#ef8774","#7cc6bf"].map(function(oi){return new da({color:oi})}),Oi=Array.from({length:28},function(oi,hi){var ln=new Vn(gn,Ci[hi%4]);return ln.visible=!1,ti.add(ln),ln});Qt.add(ti),Me.push({id:Ge.id,origin:{x:(en=Ye.x)!==null&&en!==void 0?en:0,y:(Bt=Ye.y)!==null&&Bt!==void 0?Bt:0,z:(tn=Ye.z)!==null&&tn!==void 0?tn:0},pieces:Oi})}};try{for(var we=ai(ke),Je=we.next();!Je.done;Je=we.next()){var gt=Je.value;Se(gt)}}catch(Ge){_={error:Ge}}finally{try{Je&&!Je.done&&(A=we.return)&&A.call(we)}finally{if(_)throw _.error}}var $e=new pr;Qt.add($e);var Pe=new is(1,8,5),yt=new da({color:"#fff1a2",transparent:!0,opacity:.85}),et=Array.from({length:24},function(){var Ge=new Vn(Pe,yt);return Ge.visible=!1,$e.add(Ge),Ge}),Lt=new Pl,ie=new At,nt=new he,Ce=new wr(new he(0,1,0),0),je=new he,ot="",Oe=Array.from(oe,function(Ge){var Ye=N0(Ge,2),Wt=Ye[0],qt=Ye[1];return{id:Wt,obj:qt,comp:n.components.find(function(kt){return kt.id===Wt})}}).filter(function(Ge){return Ge.comp}),ht={id:w.id,scene:Qt,camera:Xt,nodes:oe,nodeEntries:Oe,wavingFlags:ue,confettiSystems:Me,guideGroup:$e,guidePool:et,compiled:!1,lastRenderMs:0,textureDirty:!0,skyColor:ee.skyColor||"#b8e2ed",lastWaveAt:-1,lastRenderedTime:-1,lastRenderedW:0,lastRenderedH:0,guideDirty:!0,focusZ:0,lastTime:-1,lastWidth:0,lastHeight:0,setGuide:function(Ge){var Ye=Ge?Math.min(Ge.length,et.length):0,Wt=Ye?Ge.slice(0,Ye).map(function(ti){return"".concat(ti.x.toFixed(2),",").concat(ti.y.toFixed(2),",").concat(ti.z.toFixed(2))}).join("|"):"";if(Wt!==ot){ot=Wt,ht.guideDirty=!0;for(var qt=0;qt<et.length;qt++){var kt=et[qt];if(qt<Ye){var dn=Ge[qt],at=.055*(1-qt/Ye*.5);kt.visible=!0,kt.scale.setScalar(at),kt.position.set(dn.x,dn.y+.03,dn.z)}else kt.visible=!1}}},project:function(Ge,Ye,Wt){return nt.set(Ge.x,Ge.y,Ge.z).project(Xt),{x:(nt.x+1)*Ye/2,y:(1-nt.y)*Wt/2}},unproject:function(Ge,Ye,Wt,qt,kt){return ie.set(Ge/Wt*2-1,1-Ye/qt*2),Lt.setFromCamera(ie,Xt),Ce.constant=-kt,Lt.ray.intersectPlane(Ce,je)?{x:je.x,y:je.y,z:je.z}:null}};return a.set(w.id,ht),ht}function T(w){var _;return(_=a.get(w.id))!==null&&_!==void 0?_:y(w)}function g(w,_,A,I,U,x,L){var k,V,Y,E,S,B,z,K,W,O,ne,ae,xe,be,fe,Ie,De,re,le,Re,ze,Fe,ft,Ot,ut,It,pt,bt,Ve,fn,en,Bt,tn,ee,Qt,Xt,G,b,oe,ue,Me,ke,We,Se,we,Je,gt,$e,Pe,yt,et,Lt,ie,nt,Ce,je=L.time,ot=L.ambientTime,Oe=L.propsOf,ht=L.bodies3d,Ge=L.aimLocked,Ye=L.groundFn,Wt=L.worldWidth,qt=Wt===void 0?U:Wt,kt=L.worldHeight,dn=kt===void 0?x:kt,at=T(w),ti=ot??je,gn=Oe(w),Ci=gn.skyColor||"#b8e2ed";at.skyColor!==Ci&&(at.skyColor=Ci,at.scene.background=new un(Ci));try{for(var Oi=ai(at.nodeEntries),oi=Oi.next();!oi.done;oi=Oi.next()){var hi=oi.value,ln=hi.id,qn=hi.obj,Rr=hi.comp,wn=Oe(Rr);qn.visible=wn.visible!==!1;var Yt=ht?.get(ln);if(Yt&&Yt.mode==="dynamic"){var Wi=Yt.captured?Math.min(1,((fe=Yt.captureElapsed)!==null&&fe!==void 0?fe:0)/.55):0,or=Yt.captured&&Yt.captureTarget?Yt.x+(Yt.captureTarget.x-Yt.x)*Wi:Yt.x,Pr=Yt.y-Wi*.45,Fa=Yt.captured&&Yt.captureTarget?Yt.z+(Yt.captureTarget.z-Yt.z)*Wi:Yt.z;qn.position.set(or,Pr,Fa);var Dt=1-Wi*.65;qn.scale.set(((Ie=wn.sx)!==null&&Ie!==void 0?Ie:1)*Dt,((De=wn.sy)!==null&&De!==void 0?De:1)*Dt,((re=wn.sz)!==null&&re!==void 0?re:1)*Dt),qn.rotation.set(-((le=Yt.spin)!==null&&le!==void 0?le:0),(Re=wn.ry)!==null&&Re!==void 0?Re:0,((ze=Yt.spin)!==null&&ze!==void 0?ze:0)*.22)}else if(Yt&&Yt.mode==="kinematic")qn.position.set(Yt.x,(ft=(Fe=Yt.y)!==null&&Fe!==void 0?Fe:wn.y)!==null&&ft!==void 0?ft:0,Yt.z),qn.rotation.set((Ot=wn.rx)!==null&&Ot!==void 0?Ot:0,-((It=(ut=Yt.angle)!==null&&ut!==void 0?ut:wn.ry)!==null&&It!==void 0?It:0),(pt=wn.rz)!==null&&pt!==void 0?pt:0);else if(wn.dropShadowOf&&ht?.has(wn.dropShadowOf)){var lr=ht.get(wn.dropShadowOf),Oa=Ye?(bt=Ye(lr,lr.x,lr.z))!==null&&bt!==void 0?bt:-1:0;qn.position.set(lr.x,Oa+.008,lr.z);var Cn=Math.max(0,lr.y-Oa-lr.radius);qn.material&&(qn.material.opacity=.22/(1+Cn*2));var Dt=1+Cn*.4;qn.scale.set(Dt,Dt,Dt),qn.visible=!lr.captured&&wn.visible!==!1}else qn.position.set((Ve=wn.x)!==null&&Ve!==void 0?Ve:0,(fn=wn.y)!==null&&fn!==void 0?fn:0,(en=wn.z)!==null&&en!==void 0?en:0),qn.rotation.set((Bt=wn.rx)!==null&&Bt!==void 0?Bt:0,(tn=wn.ry)!==null&&tn!==void 0?tn:0,(ee=wn.rz)!==null&&ee!==void 0?ee:0),qn.scale.set((Qt=wn.sx)!==null&&Qt!==void 0?Qt:1,(Xt=wn.sy)!==null&&Xt!==void 0?Xt:1,(G=wn.sz)!==null&&G!==void 0?G:1)}}catch(Kn){k={error:Kn}}finally{try{oi&&!oi.done&&(V=Oi.return)&&V.call(Oi)}finally{if(k)throw k.error}}var C;if(ht)try{for(var se=ai(ht.values()),ge=se.next();!ge.done;ge=se.next()){var Yt=ge.value;if(Yt.stageId===w.id&&Yt.captured){C=Yt;break}}}catch(Kn){Y={error:Kn}}finally{try{ge&&!ge.done&&(E=se.return)&&E.call(se)}finally{if(Y)throw Y.error}}var ve=function(Kn){var za=!!C,ka=C&&(b=C.captureElapsed)!==null&&b!==void 0?b:0;Kn.pieces.forEach(function(Us,ya){var Lo,Fs,Va,ms,No,Os;if(Us.visible=za,!!za){var Bs=ya*2.399,zs=(Fs=(Lo=C.captureTarget)===null||Lo===void 0?void 0:Lo.x)!==null&&Fs!==void 0?Fs:Kn.origin.x,Ah=(ms=(Va=C.captureTarget)===null||Va===void 0?void 0:Va.y)!==null&&ms!==void 0?ms:Kn.origin.y,Do=(Os=(No=C.captureTarget)===null||No===void 0?void 0:No.z)!==null&&Os!==void 0?Os:Kn.origin.z;Us.position.set(zs+Math.cos(Bs)*ka*(.5+ya%4*.17),Ah+.3+Math.sin(Math.min(1,ka/2)*Math.PI)*(1+ya%5*.15),Do+Math.sin(Bs)*ka*(.5+ya%4*.17)),Us.rotation.set(ka*3+ya,ka*2+ya,Math.sin(ka+ya))}})};try{for(var pe=ai(at.confettiSystems),Ke=pe.next();!Ke.done;Ke=pe.next()){var dt=Ke.value;ve(dt)}}catch(Kn){S={error:Kn}}finally{try{Ke&&!Ke.done&&(B=pe.return)&&B.call(pe)}finally{if(S)throw S.error}}var st=dn>=qt,Be=at.lastTime<0||ti<at.lastTime?0:Math.min(.05,ti-at.lastTime),tt=gn.followTargetId?ht?.get(gn.followTargetId):void 0,Xe=tt?tt.z*((oe=gn.followZFactor)!==null&&oe!==void 0?oe:.12):(ue=gn.lookAtZ)!==null&&ue!==void 0?ue:0;at.lastTime<0||ti<at.lastTime?at.focusZ=Xe:Ge||(at.focusZ+=(Xe-at.focusZ)*(1-Math.exp(-6*Be))),at.lastTime=ti,at.camera.aspect=qt/Math.max(1,dn);var Gt=Math.max(0,1-ti/1.5),_t=!gn.followTargetId&&((Me=gn.introLift)!==null&&Me!==void 0?Me:2)===0;if(!Ge){var Mn=_t?Math.sin(ti*.42)*1.15:0,Jn=_t?(Math.cos(ti*.42)-1)*.55:0,Tn=(st?(ke=gn.cameraX)!==null&&ke!==void 0?ke:10:(We=gn.landscapeCameraX)!==null&&We!==void 0?We:13)+Mn,Sn=st?((Se=gn.cameraY)!==null&&Se!==void 0?Se:18)+Gt*((we=gn.introLift)!==null&&we!==void 0?we:2):(Je=gn.landscapeCameraY)!==null&&Je!==void 0?Je:15,li=(st?(gt=gn.cameraZ)!==null&&gt!==void 0?gt:21:($e=gn.landscapeCameraZ)!==null&&$e!==void 0?$e:18)+Jn,mt=Be===0?Sn:at.camera.position.y+(Sn-at.camera.position.y)*(1-Math.exp(-6*Be));at.camera.position.set(Tn,mt,li+at.focusZ),at.camera.fov=st?(Pe=gn.cameraFov)!==null&&Pe!==void 0?Pe:39:(yt=gn.landscapeCameraFov)!==null&&yt!==void 0?yt:22.6199,at.camera.lookAt((et=gn.lookAtX)!==null&&et!==void 0?et:0,(Lt=gn.lookAtY)!==null&&Lt!==void 0?Lt:.15,at.focusZ)}if(at.camera.updateProjectionMatrix(),A<2||I<2)return _.fillStyle=at.skyColor,_.fillRect(0,0,U,x),at;var $n=f();if(!((Ce=(nt=(ie=$n.getContext)===null||ie===void 0?void 0:ie.call($n))===null||nt===void 0?void 0:nt.isContextLost)===null||Ce===void 0)&&Ce.call(nt))return _.fillStyle=at.skyColor,_.fillRect(0,0,U,x),at;var nn=Math.max(A,I,1),Yn=520,Nn=nn>Yn?Yn/nn:1,wt=Math.max(2,Math.round(A*Nn)),Bi=Math.max(2,Math.round(I*Nn)),rn=s.width!==wt||s.height!==Bi;if(rn&&($n.setPixelRatio(1),$n.setSize(wt,Bi,!1),c.width=wt,c.height=Bi,h=void 0),!at.compiled){at.compiled=!0;var Dn=[];at.guidePool[0]&&!at.guidePool[0].visible&&(at.guidePool[0].visible=!0,at.guidePool[0].position.set(0,-99,0),Dn.push(at.guidePool[0]));try{for(var Xi=ai(at.confettiSystems),St=Xi.next();!St.done;St=Xi.next()){var dt=St.value;dt.pieces[0]&&!dt.pieces[0].visible&&(dt.pieces[0].visible=!0,dt.pieces[0].position.set(0,-99,0),Dn.push(dt.pieces[0]))}}catch(Kn){z={error:Kn}}finally{try{St&&!St.done&&(K=Xi.return)&&K.call(Xi)}finally{if(z)throw z.error}}$n.compile(at.scene,at.camera);try{for(var Gn=ai(Dn),qi=Gn.next();!qi.done;qi=Gn.next()){var fs=qi.value;fs.visible=!1}}catch(Kn){W={error:Kn}}finally{try{qi&&!qi.done&&(O=Gn.return)&&O.call(Gn)}finally{if(W)throw W.error}}}var Jl=!1;if(ht)try{for(var Ds=ai(ht.values()),ea=Ds.next();!ea.done;ea=Ds.next()){var Yt=ea.value;if(Yt.stageId===w.id&&(Yt.mode==="kinematic"||Yt.mode==="dynamic"&&(!Yt.atRest||Yt.captured))){Jl=!0;break}}}catch(Kn){ne={error:Kn}}finally{try{ea&&!ea.done&&(ae=Ds.return)&&ae.call(Ds)}finally{if(ne)throw ne.error}}var ps=Math.floor(ti*20),Eh=at.wavingFlags.length>0&&at.lastFlagStep!==ps,$l=_t&&Math.abs(ti-at.lastRenderedTime)>=.032,di=Jl&&at.lastRenderedTime!==ti,gi=rn||h!==w.id||at.guideDirty||at.textureDirty||at.lastRenderedTime<0||at.lastRenderedW!==wt||at.lastRenderedH!==Bi||Eh||$l||di;if(gi){if(at.wavingFlags.length>0&&at.lastFlagStep!==ps){try{for(var Lr=ai(at.wavingFlags),ir=Lr.next();!ir.done;ir=Lr.next()){var Ba=ir.value;WS(Ba.geo,Ba.rest,ps/20)}}catch(Kn){xe={error:Kn}}finally{try{ir&&!ir.done&&(be=Lr.return)&&be.call(Lr)}finally{if(xe)throw xe.error}}at.lastFlagStep=ps}$n.setClearColor(at.skyColor,1),$n.render(at.scene,at.camera),s.width>0&&s.height>0&&(l.drawImage(s,0,0,wt,Bi),h=w.id),at.lastRenderedTime=ti,at.lastRenderedW=wt,at.lastRenderedH=Bi,at.guideDirty=!1,at.textureDirty=!1}return at.lastWidth=U,at.lastHeight=x,c.width>0&&c.height>0&&_.drawImage(c,0,0,U,x),at}function p(){var w,_;try{for(var A=ai(a.values()),I=A.next();!I.done;I=A.next()){var U=I.value;U.focusZ=0,U.lastTime=-1,U.lastRenderedTime=-1,U.lastFlagStep=-1,U.guideDirty=!0,U.setGuide([])}}catch(x){w={error:x}}finally{try{I&&!I.done&&(_=A.return)&&_.call(A)}finally{if(w)throw w.error}}}function v(){var w,_,A,I,U,x,L;try{for(var k=ai(a.values()),V=k.next();!V.done;V=k.next()){var Y=V.value;Y.scene.traverse(function(O){var ne,ae;if(O.isMesh&&(O.geometry&&!Array.from(i.values()).includes(O.geometry)&&O.geometry.dispose(),O.material))try{for(var xe=(ne=void 0,ai(Array.isArray(O.material)?O.material:[O.material])),be=xe.next();!be.done;be=xe.next()){var fe=be.value;fe.dispose()}}catch(Ie){ne={error:Ie}}finally{try{be&&!be.done&&(ae=xe.return)&&ae.call(xe)}finally{if(ne)throw ne.error}}})}}catch(O){w={error:O}}finally{try{V&&!V.done&&(_=k.return)&&_.call(k)}finally{if(w)throw w.error}}try{for(var E=ai(i.values()),S=E.next();!S.done;S=E.next()){var B=S.value;B.dispose()}}catch(O){A={error:O}}finally{try{S&&!S.done&&(I=E.return)&&I.call(E)}finally{if(A)throw A.error}}try{for(var z=ai(r.values()),K=z.next();!K.done;K=z.next()){var W=K.value;W.dispose()}}catch(O){U={error:O}}finally{try{K&&!K.done&&(x=z.return)&&x.call(z)}finally{if(U)throw U.error}}a.clear(),i.clear(),r.clear(),(L=o?.forceContextLoss)===null||L===void 0||L.call(o),o?.dispose(),o=void 0,s=void 0,c=void 0,l=void 0,h=void 0}return{getStage:T,renderStage:g,reset:p,dispose:v}}var Ua=function(){return Ua=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Ua.apply(this,arguments)},zr=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},kr=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Wl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},U0=function(n,e,t){return Math.max(e,Math.min(t,n))},ds=function(n,e){return Math.hypot(e.x-n.x,e.y-n.y)};function F0(n){var e=n.id,t=n.nodes,i=n.edges,r=n.gates,a=r===void 0?[]:r,s=n.onEvent,o=s===void 0?function(){}:s,c=new Map(t.map(function(S){return[S.id,Ua({},S)]})),l=new Map(i.map(function(S){return[S.id,Ua({speedScale:1,enabled:!0,bidirectional:!1,cost:0},S)]})),h=new Map(a.map(function(S){return[S.id,Ua({},S)]})),f=new Map,d=f,m=0,y=0,T=function(S){return c.get(S)},g=function(S){return kr([],zr(h.values()),!1).find(function(B){return B.parameters.nodeId===S})},p=function(S){var B=S.parameters;if(B.mode==="open")return!0;if(B.mode==="closed")return!1;var z=B.openSeconds+B.closedSeconds,K=(m+B.phaseOffsetSeconds)%z;return K<B.openSeconds},v=function(S){return kr([],zr(l.values()),!1).filter(function(B){return B.enabled&&(B.from===S||B.bidirectional&&B.to===S)}).sort(function(B,z){return B.id<z.id?-1:B.id>z.id?1:0})},w=function(S,B){return kr([],zr(l.values()),!1).find(function(z){return z.enabled&&(z.from===S&&z.to===B||z.bidirectional&&z.from===B&&z.to===S)})};function _(S,B){var z,K,W,O;if(S===B)return[S];for(var ne=new Map([[S,0]]),ae=new Map,xe=new Set([S]);xe.size;){var be=kr([],zr(xe),!1).sort(function(ut,It){return ne.get(ut)-ne.get(It)||(ut<It?-1:ut>It?1:0)})[0];if(xe.delete(be),be===B)break;try{for(var fe=(z=void 0,Wl(v(be))),Ie=fe.next();!Ie.done;Ie=fe.next()){var De=Ie.value,re=De.from===be?De.to:De.from,le=g(re),Re=T(re),ze=le?le.parameters.holdSeconds*90+(p(le)?0:le.parameters.closedSeconds*90):0,Fe=ne.get(be)+ds(T(be),Re)/De.speedScale+De.cost+((W=Re.cost)!==null&&W!==void 0?W:0)+ze;Fe>=((O=ne.get(re))!==null&&O!==void 0?O:1/0)||(ne.set(re,Fe),ae.set(re,be),xe.add(re))}}catch(ut){z={error:ut}}finally{try{Ie&&!Ie.done&&(K=fe.return)&&K.call(fe)}finally{if(z)throw z.error}}}if(!ne.has(B))return[];for(var ft=[B],Ot=B;Ot!==S;)Ot=ae.get(Ot),ft.unshift(Ot);return ft}function A(S){var B,z=S.route.length>=2&&S.segment<S.route.length-1;if(!z){var K=(B=S.route[Math.min(S.segment,S.route.length-1)])!==null&&B!==void 0?B:S.startNode,W=_(K,S.target);S.route=W.length?W:[K],S.segment=0,S.distance=0,S.arrived=!1,S.active=S.route.length>=2;return}var O=S.route[S.segment],ne=S.route[S.segment+1],ae=ds(T(O),T(ne));if(S.arrived||S.distance>=ae-1e-4){var W=_(ne,S.target);S.route=W.length?W:[ne],S.segment=0,S.distance=0,S.arrived=!1,S.active=S.route.length>=2;return}var xe=_(ne,S.target);S.route=xe.length?kr([O],zr(xe),!1):[O,ne],S.segment=0}function I(S){var B,z=_(S.startNode,S.targetNode),K=T(S.startNode),W=z.length>=2?T(z[1]):K,O=z.length>=2?Math.atan2(W.y-K.y,W.x-K.x):0,ne=Math.floor((O%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4,ae=Ua(Ua({},S),{loop:(B=S.loop)!==null&&B!==void 0?B:"none",originNode:S.startNode,destinationNode:S.targetNode,target:S.targetNode,networkId:e,route:z.length?z:[S.startNode],segment:0,distance:0,x:K.x,y:K.y,heading:O,frame:[0,1,2,3][ne],flipX:Math.cos(O)<0,hold:0,arrived:!1,active:S.active&&z.length>=2,blockedTicks:0,blockedEmitted:!1,speedMultiplier:1});return f.set(ae.id,ae),ae}function U(S){if(x("pathArrive",S,S.target),S.loop==="none"){S.active=!1;return}var B=S.target,z=S.loop==="ping-pong"?B===S.destinationNode?S.originNode:S.destinationNode:B===S.originNode?S.destinationNode:S.originNode;S.startNode=B,S.target=z,S.route=_(B,z),S.segment=0,S.distance=0,S.arrived=!1,S.route.length<2&&(S.active=!1)}function x(S,B,z){o(S,{componentId:B.id,nodeId:z})}function L(S,B){var z,K,W=S.route[S.segment+1],O=g(W);if(O&&!p(O)){S.blockedTicks++,S.blockedTicks>=30&&!S.blockedEmitted&&(S.blockedEmitted=!0,x("pathBlocked",S,W));return}if(!S.arrived){if(S.arrived=!0,S.segment+1===S.route.length-1){W===S.target?U(S):(S.active=!1,S.blockedEmitted||(S.blockedEmitted=!0,x("pathBlocked",S,W)));return}S.hold=Math.max((z=T(W).holdSeconds)!==null&&z!==void 0?z:0,(K=O?.parameters.holdSeconds)!==null&&K!==void 0?K:0)}if(S.hold>0){S.hold=Math.max(0,S.hold-B),S.blockedTicks++,S.blockedTicks>=30&&!S.blockedEmitted&&(S.blockedEmitted=!0,x("pathBlocked",S,W));return}S.segment++,S.distance=0,S.arrived=!1,S.blockedTicks=0,S.blockedEmitted=!1}function k(S,B){var z,K;if(S.spacing<=0)return B;var W=S.route[S.segment],O=S.route[S.segment+1],ne=ds(T(W),T(O)),ae=ne-S.distance,xe=B;try{for(var be=Wl(d.values()),fe=be.next();!fe.done;fe=be.next()){var Ie=fe.value;if(!(Ie.id===S.id||!Ie.active||Ie.route.length<2||Ie.segment>=Ie.route.length-1)){var De=Ie.route[Ie.segment],re=Ie.route[Ie.segment+1],le=1/0;if(De===W&&re===O&&(Ie.distance>S.distance||Ie.distance===S.distance&&Ie.id<S.id))le=Ie.distance-S.distance;else if(De===O)le=ae+Ie.distance;else if(re===O&&De!==W){var Re=ds(T(De),T(re))-Ie.distance;Re<S.spacing&&(Re<ae||Re===ae&&Ie.id<S.id)&&(le=ae)}le<1/0&&(xe=Math.min(xe,Math.max(0,le-S.spacing)))}}}catch(ze){z={error:ze}}finally{try{fe&&!fe.done&&(K=be.return)&&K.call(be)}finally{if(z)throw z.error}}return xe}function V(S){var B=T(S.route[S.segment]),z=T(S.route[S.segment+1]),K=ds(B,z),W=U0(S.distance/Math.max(1e-4,K),0,1),O=B.x+(z.x-B.x)*W,ne=B.y+(z.y-B.y)*W,ae=Math.atan2(z.y-B.y,z.x-B.x),xe=Math.min(S.cornerRadius,K/3),be=S.route[S.segment+2];if(xe>0&&be){var fe=T(be),Ie=ds(z,fe),De=Math.min(xe,Ie/3);if(S.distance>K-xe){var re={x:z.x-(z.x-B.x)/K*xe,y:z.y-(z.y-B.y)/K*xe},le={x:z.x+(fe.x-z.x)/Ie*De,y:z.y+(fe.y-z.y)/Ie*De},Re=U0((S.distance-(K-xe))/(xe*2),0,.5),ze=1-Re;O=ze*ze*re.x+2*ze*Re*z.x+Re*Re*le.x,ne=ze*ze*re.y+2*ze*Re*z.y+Re*Re*le.y;var Fe=2*ze*(z.x-re.x)+2*Re*(le.x-z.x),ft=2*ze*(z.y-re.y)+2*Re*(le.y-z.y);Math.abs(Fe)+Math.abs(ft)>.001&&(ae=Math.atan2(ft,Fe))}}return{x:O,y:ne,heading:ae}}function Y(S){var B,z,K,W;m+=S,y++;var O=kr([],zr(f.values()),!1).sort(function(bt,Ve){return bt.id<Ve.id?-1:bt.id>Ve.id?1:0}),ne=O.length?y%O.length:0,ae=kr(kr([],zr(O.slice(ne)),!1),zr(O.slice(0,ne)),!1);try{for(var xe=Wl(ae),be=xe.next();!be.done;be=xe.next()){var fe=be.value;if(!(!fe.active||fe.route.length<2||fe.segment>=fe.route.length-1)){var Ie=fe.route[fe.segment],De=fe.route[fe.segment+1],re=ds(T(Ie),T(De));if(!(fe.distance>=re-1e-4&&(L(fe,S),!fe.active||fe.route.length<2||fe.segment>=fe.route.length-1))){var le=fe.route[fe.segment],Re=fe.route[fe.segment+1],ze=ds(T(le),T(Re)),Fe=ze-fe.distance,ft=(W=(K=w(le,Re))===null||K===void 0?void 0:K.speedScale)!==null&&W!==void 0?W:1,Ot=Math.min(Fe,fe.speed*ft*Math.max(0,fe.speedMultiplier)*S),ut=k(fe,Ot);ut<=1e-4?(fe.blockedTicks++,fe.blockedTicks>=30&&!fe.blockedEmitted&&(fe.blockedEmitted=!0,x("pathBlocked",fe,Re))):(fe.distance+=ut,fe.blockedTicks=0,fe.blockedEmitted=!1);var It=V(fe);fe.x=It.x,fe.y=It.y,fe.heading=It.heading;var pt=Math.floor((fe.heading%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4;fe.frame=[0,1,2,3][pt],fe.flipX=Math.cos(fe.heading)<0}}}}catch(bt){B={error:bt}}finally{try{be&&!be.done&&(z=xe.return)&&z.call(xe)}finally{if(B)throw B.error}}}function E(){return{id:e,nodeCount:c.size,edgeCount:l.size,activeAgents:kr([],zr(f.values()),!1).filter(function(S){return S.active}).length,queuedAgents:kr([],zr(f.values()),!1).filter(function(S){return S.active&&S.blockedTicks>0}).length,agents:kr([],zr(f.values()),!1).map(function(S){var B;return{id:S.id,x:S.x,y:S.y,heading:S.heading,frame:(B=S.frame)!==null&&B!==void 0?B:0,flipX:!!S.flipX,active:S.active,targetNode:S.target,route:kr([],zr(S.route),!1),segment:S.segment,distance:S.distance,blocked:S.blockedTicks>0}})}}return{addAgent:I,removeAgent:function(S){return f.delete(S)},getAgent:function(S){return f.get(S)},setTarget:function(S,B){var z=f.get(S);return!z||!T(B)?!1:(z.target=B,z.destinationNode=B,z.active=!0,A(z),!0)},setEdge:function(S,B,z){var K,W,O=l.get(S);if(!O)return!1;O.enabled=B,z!==void 0&&(O.cost=z);try{for(var ne=Wl(f.values()),ae=ne.next();!ae.done;ae=ne.next()){var xe=ae.value;A(xe)}}catch(be){K={error:be}}finally{try{ae&&!ae.done&&(W=ne.return)&&W.call(ne)}finally{if(K)throw K.error}}return!0},setGate:function(S,B,z){var K,W,O=h.get(S);if(!O)return!1;O.parameters=Ua(Ua({},O.parameters),{mode:B,holdSeconds:z});try{for(var ne=Wl(f.values()),ae=ne.next();!ae.done;ae=ne.next()){var xe=ae.value;A(xe)}}catch(be){K={error:be}}finally{try{ae&&!ae.done&&(W=ne.return)&&W.call(ne)}finally{if(K)throw K.error}}return!0},tick:Y,snapshot:E}}var Xl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},xh=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},_h=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Mh={A:["01110","10001","10001","11111","10001","10001","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],C:["01111","10000","10000","10000","10000","10000","01111"],D:["11110","10001","10001","10001","10001","10001","11110"],E:["11111","10000","10000","11110","10000","10000","11111"],F:["11111","10000","10000","11110","10000","10000","10000"],G:["01111","10000","10000","10111","10001","10001","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],I:["11111","00100","00100","00100","00100","00100","11111"],J:["00111","00010","00010","00010","10010","10010","01100"],K:["10001","10010","10100","11000","10100","10010","10001"],L:["10000","10000","10000","10000","10000","10000","11111"],M:["10001","11011","10101","10101","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"],O:["01110","10001","10001","10001","10001","10001","01110"],P:["11110","10001","10001","11110","10000","10000","10000"],Q:["01110","10001","10001","10001","10101","10010","01101"],R:["11110","10001","10001","11110","10100","10010","10001"],S:["01111","10000","10000","01110","00001","00001","11110"],T:["11111","00100","00100","00100","00100","00100","00100"],U:["10001","10001","10001","10001","10001","10001","01110"],V:["10001","10001","10001","10001","10001","01010","00100"],W:["10001","10001","10001","10101","10101","10101","01010"],X:["10001","10001","01010","00100","01010","10001","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],Z:["11111","00001","00010","00100","01000","10000","11111"],0:["01110","10001","10011","10101","11001","10001","01110"],1:["00100","01100","00100","00100","00100","00100","01110"],2:["01110","10001","00001","00010","00100","01000","11111"],3:["11110","00001","00001","01110","00001","00001","11110"],4:["00010","00110","01010","10010","11111","00010","00010"],5:["11111","10000","10000","11110","00001","00001","11110"],6:["01110","10000","10000","11110","10001","10001","01110"],7:["11111","00001","00010","00100","01000","01000","01000"],8:["01110","10001","10001","01110","10001","10001","01110"],9:["01110","10001","10001","01111","00001","00001","01110"],"!":["00100","00100","00100","00100","00100","00000","00100"],"?":["01110","10001","00001","00010","00100","00000","00100"],".":["00000","00000","00000","00000","00000","00110","00110"],",":["00000","00000","00000","00000","00110","00110","00100"],":":["00000","00110","00110","00000","00110","00110","00000"],"+":["00000","00100","00100","11111","00100","00100","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],"/":["00001","00010","00010","00100","01000","01000","10000"],"'":["00100","00100","00000","00000","00000","00000","00000"]," ":["000","000","000","000","000","000","000"]},ql=function(n){var e,t,i,r,a=0;try{for(var s=Xl(n),o=s.next();!o.done;o=s.next()){var c=o.value;a+=((r=(i=Mh[c])===null||i===void 0?void 0:i[0].length)!==null&&r!==void 0?r:5)+1}}catch(l){e={error:l}}finally{try{o&&!o.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}return Math.max(0,a-1)},XS=function(n,e){var t,i,r=[],a="";try{for(var s=Xl(n),o=s.next();!o.done;o=s.next()){var c=o.value;a&&ql(a+c)>e&&(r.push(a),a=""),a+=c}}catch(l){t={error:l}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(t)throw t.error}}return a&&r.push(a),r};function qS(n,e,t){var i,r,a,s,o;t===void 0&&(t=1);var c=Math.max(1,Math.floor(e/Math.max(1,t))),l=[];try{for(var h=Xl(String(n).toUpperCase().split(`
`)),f=h.next();!f.done;f=h.next()){var d=f.value,m=d.split(/\s+/).filter(Boolean);if(!m.length){l.push("");continue}var y="";try{for(var T=(a=void 0,Xl(m)),g=T.next();!g.done;g=T.next()){var p=g.value;if(ql(p)>c){y&&l.push(y);var v=XS(p,c);l.push.apply(l,_h([],xh(v.slice(0,-1)),!1)),y=(o=v.at(-1))!==null&&o!==void 0?o:""}else{var w=y?y+" "+p:p;ql(w)<=c?y=w:(y&&l.push(y),y=p)}}}catch(_){a={error:_}}finally{try{g&&!g.done&&(s=T.return)&&s.call(T)}finally{if(a)throw a.error}}y&&l.push(y)}}catch(_){i={error:_}}finally{try{f&&!f.done&&(r=h.return)&&r.call(h)}finally{if(i)throw i.error}}return l}var O0=function(n){var e,t=Math.max(0,(e=n.padding)!==null&&e!==void 0?e:4),i=n.pixelPanel&&n.padding===void 0;return{x:i?8:t,y:i?4:t}},YS=function(n,e,t,i){var r,a=e.wrap===!1?String(n).toUpperCase().split(`
`):qS(n,i,t),s=a.slice(0,16),o=Math.round(t*8*((r=e.lineHeight)!==null&&r!==void 0?r:1.2));return{allLines:a,lines:s,renderedWidth:Math.max.apply(Math,_h([0],xh(s.map(function(c){return ql(c)*t})),!1)),renderedHeight:(s.length-1)*o+7*t}};function Rf(n,e){for(var t,i=O0(e),r=Math.max(0,e.width-2*i.x),a=Math.max(0,e.height-2*i.y),s=Math.max(1,Math.floor(e.fontSize/8)),o=e.autoFit===!1?s:Math.min(s,Math.max(1,Math.ceil(((t=e.minFontSize)!==null&&t!==void 0?t:12)/8))),c=_h([],xh(new Set(_h([],xh(String(n).toUpperCase()),!1).filter(function(y){return y!==`
`&&!Mh[y]}))),!1),l,h=s;h>=o;h--){var f=YS(n,e,h,r),d=f.renderedWidth>r,m=f.allLines.length>16||f.renderedHeight>a;if(l={lines:f.lines,scale:h,fontSize:h*8,renderedWidth:f.renderedWidth,renderedHeight:f.renderedHeight,overflowsWidth:d,overflowsHeight:m,unsupportedChars:c},e.autoFit===!1||!d&&!m)break}return l}function B0(n,e,t){var i,r=Rf(e,t),a=r.lines,s=r.scale,o=O0(t),c=Math.max(0,t.width-2*o.x),l=Math.max(0,t.height-2*o.y),h=Math.round(r.fontSize*((i=t.lineHeight)!==null&&i!==void 0?i:1.2)),f=o.y+(l-r.renderedHeight)/2;return n.fillStyle=t.color,a.forEach(function(d,m){var y,T,g,p=ql(d)*s,v=t.align==="left"?o.x:t.align==="right"?t.width-p-o.x:o.x+(c-p)/2,w=v;try{for(var _=Xl(d),A=_.next();!A.done;A=_.next()){var I=A.value,U=(g=Mh[I])!==null&&g!==void 0?g:Mh["?"];U.forEach(function(x,L){for(var k=0;k<x.length;k++)x[k]==="1"&&n.fillRect(Math.round(w+k*s),Math.round(f+m*h+L*s),s,s)}),w+=(U[0].length+1)*s}}catch(x){y={error:x}}finally{try{A&&!A.done&&(T=_.return)&&T.call(_)}finally{if(y)throw y.error}}}),r}var ga=function(){return ga=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},ga.apply(this,arguments)},Lf=Math.PI*2,si=function(n,e){return((Math.imul(n+1,2654435769)^Math.imul(e,2246822507))>>>0)/4294967296};function Nf(n,e,t){var i,r,a=[n.color,n.color2,n.color3].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(c,l){var h,f,d=o+((l+.2+si(l,1)*.6)/n.count-.5)*s,m=n.speed*(.42+.65*si(l,2));return ga(ga({},e),{clipId:t,shape:"pixel-confetti",age:-.12*si(l,3),vx:Math.cos(d)*m,vy:Math.sin(d)*m,gravity:(h=n.gravity)!==null&&h!==void 0?h:250,life:((f=n.lifetime)!==null&&f!==void 0?f:.7)*(.6+.4*si(l,4)),color:a[l%a.length],size:3+Math.floor(3*si(l,5)),angle:Lf*si(l,6),spin:(si(l,7)-.5)*12})})}function z0(n){var e=Math.min(12,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return Nf(n).map(function(r,a){return ga(ga({},r),{screen:!0,x:(a%e+.15+.7*si(a,8))/e,y:(Math.floor(a/e)+.15+.7*si(a,9))/t,vx:i*(si(a,10)-.5)*.7,vy:i*(.3+.5*si(a,11)),size:r.size+1})})}var bh=function(n,e){return(n%e+e)%e};function k0(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,c=e.life,l=e.gravity,h=e.size,f=e.angle,d=e.spin,m=e.color;if(!(o<0)){var y=a*o,T=s*o+l*o*o/2,g=Math.round(t?t.x+bh(i*t.width+y,t.width):i+y),p=Math.round(t?t.y+bh(r*t.height+T,t.height):r+T),v=Math.round((f+d*o)/(Math.PI/4))&3;if(n.globalAlpha*=Math.min(1,(c-o)*4),n.fillStyle="#3c293388",v===0)n.fillRect(g-h+1,p+1,h*2+1,h+1);else if(v===2)n.fillRect(g+1,p-h+1,h+1,h*2+1);else for(var w=-1;w<=1;w++)n.fillRect(g+w*h+1,p+w*h*(v===1?1:-1)+1,h+1,h+1);if(n.fillStyle=m,v===0)n.fillRect(g-h,p,h*2,h);else if(v===2)n.fillRect(g,p-h,h,h*2);else for(var w=-1;w<=1;w++)n.fillRect(g+w*h,p+w*h*(v===1?1:-1),h,h)}}function Df(n,e,t){var i,r,a=[n.color,n.color2,n.color3,"#ff6b6b","#4ecdc4","#fff3b0"].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(c,l){var h,f,d=o+((l+.2+si(l,11)*.6)/n.count-.5)*s,m=n.speed*(.45+.65*si(l,12));return ga(ga({},e),{clipId:t,shape:"confetti",age:-.15*si(l,13),vx:Math.cos(d)*m,vy:Math.sin(d)*m,gravity:(h=n.gravity)!==null&&h!==void 0?h:140,life:((f=n.lifetime)!==null&&f!==void 0?f:2.6)*(.75+.35*si(l,14)),color:a[l%a.length],size:5+Math.floor(5*si(l,15)),kind:l%5===0?"star":"ribbon",angle:Lf*si(l,16),spin:(si(l,17)-.5)*5.5,flutter:1.6+2.2*si(l,18),phase:Lf*si(l,19)})})}function V0(n){var e=Math.min(14,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return Df(n,{x:0,y:0}).map(function(r,a){var s;return ga(ga({},r),{screen:!0,x:(a%e+.12+.76*si(a,20))/e,y:(Math.floor(a/e)+.08+.84*si(a,21))/t,vx:i*(si(a,22)-.5)*.65,vy:i*(.38+.55*si(a,23)),gravity:Math.min((s=n.gravity)!==null&&s!==void 0?s:90,90)})})}function G0(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,c=e.life,l=e.gravity,h=e.size,f=e.angle,d=e.spin,m=e.flutter,y=e.phase,T=e.color,g=e.kind;if(!(o<0)){var p=Math.sin(o*m+y)*14,v=a*o+p,w=s*o+l*o*o/2,_=t?t.x+bh(i*t.width+v,t.width):i+v,A=t?t.y+bh(r*t.height+w,t.height):r+w,I=Math.min(1,o*2.8,(c-o)*2.2);if(!(I<=0)){n.save(),n.globalAlpha*=I,n.translate(_,A),n.rotate(f+d*o);var U=Math.cos(o*m*1.4+y);if(n.scale(1,Math.max(.22,Math.abs(U))),n.fillStyle=T,g==="star"){var x=h*.85;n.beginPath();for(var L=0;L<8;L++){var k=L%2===0?x:x*.38,V=L*Math.PI/4;L===0?n.moveTo(Math.cos(V)*k,Math.sin(V)*k):n.lineTo(Math.cos(V)*k,Math.sin(V)*k)}n.closePath(),n.fill()}else n.fillRect(-h*.7,-h*.34,h*1.4,h*.68),n.fillStyle="#ffffff55",n.fillRect(-h*.7,-h*.34,h*1.4,h*.2);n.restore()}}}function H0(n,e,t,i,r){var a=e.width,s=e.height;if(!(a<=0||s<=0)){var o=Math.min(3,Math.floor(Math.min(a,s)/8));if(!o){n.fillStyle=t,n.fillRect(0,0,a,s);return}var c=i?o*2:0,l=s-(i?o:o*3),h=r>=0?.5+.5*Math.sin(r*4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd05a99",n.shadowBlur=8+h*9,n.fillStyle=t,n.fillRect(o,c+o,a-2*o,s-c-2*o),n.restore()),n.fillStyle=e.stroke,n.fillRect(o,0,a-2*o,s),n.fillRect(0,o,a,s-2*o),n.fillStyle=t,n.fillRect(o,c+o,a-2*o,s-c-2*o),n.fillStyle="#431d1380",n.fillRect(o,l,a-2*o,s-o-l),n.fillStyle=e.enabled?"#fff4be":"#ffffff55",n.fillRect(2*o,c+o,a-4*o,i?o:o*2),n.fillStyle="#ffffff55",n.fillRect(o,c+3*o,o,Math.max(0,l-c-3*o)),n.fillStyle="#521b2444",n.fillRect(a-2*o,c+3*o,o,Math.max(0,l-c-3*o));var f=r>=0?r%1.9:-1,d=(f-.1)/.55;if(e.enabled&&!i&&d>=0&&d<1){n.save(),n.beginPath(),n.rect(2*o,c+3*o,a-4*o,Math.max(0,l-c-3*o)),n.clip();for(var m=Math.floor(((a+14*o)*d-6*o)/o)*o,y=c+3*o,T=0;y<l;y+=o,T++){var g=m-Math.floor(T/2)*o;n.fillStyle="#fff4be44",n.fillRect(g-2*o,y,9*o,o),n.fillStyle="#fffef0aa",n.fillRect(g,y,4*o,o)}n.restore()}if(e.enabled&&!i&&r>=0){var p=Math.max(0,Math.sin(r*4.2)),v=Math.max(0,Math.sin(r*4.2+2.2)),w=function(_,A,I){if(!(I<.25)){n.save(),n.globalAlpha*=I*.95,n.fillStyle="#fffef4";var U=I>.65?o*2:o;n.fillRect(Math.round(_-U),Math.round(A-o/2),U*2+o,o),n.fillRect(Math.round(_-o/2),Math.round(A-U),o,U*2+o),n.restore()}};w(5*o,c+4*o,p),w(a-6*o,c+5*o,v)}}}function Sh(n,e,t,i,r,a){var s=Math.max(0,Math.min(a,i/2,r/2));n.beginPath(),typeof n.roundRect=="function"?n.roundRect(e,t,i,r,s):(n.moveTo(e+s,t),n.arcTo(e+i,t,e+i,t+r,s),n.arcTo(e+i,t+r,e,t+r,s),n.arcTo(e,t+r,e,t,s),n.arcTo(e,t,e+i,t,s),n.closePath())}function Pf(n,e,t,i,r){if(!(r<=.02||i<=.5)){n.save(),n.translate(e,t),n.globalAlpha*=r,n.fillStyle="#fffef0",n.beginPath();for(var a=0;a<8;a++){var s=a%2===0?i:i*.24,o=a*Math.PI/4;a===0?n.moveTo(Math.cos(o)*s,Math.sin(o)*s):n.lineTo(Math.cos(o)*s,Math.sin(o)*s)}n.closePath(),n.fill(),n.restore()}}function W0(n,e,t,i,r){var a,s,o,c=e.width,l=e.height;if(!(c<=0||l<=0)){var h=Math.min((a=e.radius)!==null&&a!==void 0?a:16,c/2,l/2),f=i?2:6,d=i?3:0,m=r>=0?.5-.5*Math.cos(r*2.4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd23f99",n.shadowBlur=10+m*12,Sh(n,0,d,c,l-d,h),n.fillStyle=t,n.fill(),n.restore()),n.save(),Sh(n,0,d+2,c,Math.max(4,l-d-2),h),n.fillStyle="#0e2830",n.fill(),n.restore(),n.save(),Sh(n,0,d,c,Math.max(4,l-f),h),n.fillStyle=t,n.fill(),n.clip();var y=(s=n.createLinearGradient)===null||s===void 0?void 0:s.call(n,0,d,0,l-f);if(y?.addColorStop&&(y.addColorStop(0,"#ffffffa8"),y.addColorStop(.42,"#ffffff26"),y.addColorStop(.45,"#00000000"),y.addColorStop(1,"#00000024"),n.fillStyle=y,n.fillRect(0,d,c,l-f)),n.fillStyle="#fffef0bb",n.fillRect(h*.55,d+3,Math.max(0,c-h*1.1),3),e.enabled&&!i&&r>=0){var T=(r%2.4-.15)/.95;if(T>0&&T<1){var g=T*T*(3-2*T),p=Math.sin(T*Math.PI),v=-c*.36+c*1.72*g;n.save(),n.globalAlpha*=p,n.translate(v,d),n.transform(1,0,-.36,1,0,0);var w=(o=n.createLinearGradient)===null||o===void 0?void 0:o.call(n,-48,0,48,0);w?.addColorStop?(w.addColorStop(0,"#ffffff00"),w.addColorStop(.32,"#ffffff48"),w.addColorStop(.5,"#fffef8cc"),w.addColorStop(.68,"#ffffff48"),w.addColorStop(1,"#ffffff00"),n.fillStyle=w,n.fillRect(-48,0,96,l)):(n.fillStyle="#fffef8a8",n.fillRect(-14,0,28,l)),n.restore()}}if(n.restore(),e.strokeWidth&&(n.save(),Sh(n,0,d,c,Math.max(4,l-f),h),n.strokeStyle=e.stroke,n.lineWidth=e.strokeWidth,n.stroke(),n.restore()),e.enabled&&!i&&r>=0){var _=Math.max(0,Math.sin(r*2.4)),A=_*_,I=Math.max(0,Math.sin(r*2.4+2.1)),U=I*I,x=Math.max(0,Math.sin(r*2.4+4.2)),L=x*x;Pf(n,c*.12,d+9,4+A*6,A*.92),Pf(n,c*.88,d+10,3.8+U*5.5,U*.9),Pf(n,c*.76,Math.max(d+14,l-f-8),3+L*4.2,L*.8)}}}function wh(n){if(/\s/.test(n)||n.length>512)return!1;var e=/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,9}$/,t=/^https:\/\/apps\.apple\.com\/([a-z]{2}\/)?app\/([a-zA-Z0-9-]+\/)?id[1-9][0-9]{5,19}$/;return e.test(n)&&!/id=example\.|[.=]placeholder(\.|$)|id=com\.example(\.|$)/.test(n)||t.test(n)}var Yl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Zl=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Uf=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function X0(n){var e,t,i;n===void 0&&(n={});var r=(e=n.timeoutMs)!==null&&e!==void 0?e:5e3,a=(t=n.pollMs)!==null&&t!==void 0?t:25;if(![r,a].every(function(W){return Number.isFinite(W)&&W>=1&&W<=6e4}))throw Error("Invalid Unity host deadline/poll interval");var s=(i=n.getHost)!==null&&i!==void 0?i:(function(){return window.mraid}),o=new Set,c=new Set,l=[],h={},f=!1,d=!1,m=!1,y=!1,T=!1,g=!1,p,v,w,_,A,I,U=function(){return m||y};function x(){var W,O,ne;clearTimeout(A),clearTimeout(I);try{for(var ae=Yl(l.splice(0)),xe=ae.next();!xe.done;xe=ae.next()){var be=Zl(xe.value,2),fe=be[0],Ie=be[1];try{(ne=h.mraid)===null||ne===void 0||ne.removeEventListener(fe,Ie)}catch{}}}catch(De){W={error:De}}finally{try{xe&&!xe.done&&(O=ae.return)&&O.call(ae)}finally{if(W)throw W.error}}}function L(W){_?.(W instanceof Error?W:Error(String(W))),w=void 0,_=void 0}function k(W){var O,ne;if(!U()){var ae=f;if(m=!0,f=!1,d=!1,x(),L(W),ae)try{for(var xe=Yl(Uf([],Zl(c),!1)),be=xe.next();!be.done;be=xe.next()){var fe=be.value;fe()}}catch(Ie){O={error:Ie}}finally{try{be&&!be.done&&(ne=xe.return)&&ne.call(xe)}finally{if(O)throw O.error}}o.clear(),c.clear()}}function V(W,O){return l.push([W,O]),h.mraid.addEventListener(W,O),Y(W,O)}function Y(W,O){if(U()){try{h.mraid.removeEventListener(W,O)}catch{}return!1}return!0}function E(W){var O,ne;if(!U()){if(typeof W!="boolean"){k(Error("Invalid Unity viewability event"));return}if(!f){p=W;return}if(d!==W){d=W;try{for(var ae=Yl(Uf([],Zl(o),!1)),xe=ae.next();!xe.done;xe=ae.next()){var be=xe.value;if(U())break;be(d)}}catch(fe){O={error:fe}}finally{try{xe&&!xe.done&&(ne=ae.return)&&ne.call(ae)}finally{if(O)throw O.error}}}}}var S=function(W){W==="hidden"&&k(Error("Unity host closed"))},B=function(){var W;f&&!U()&&((W=n.onResize)===null||W===void 0||W.call(n))};function z(){var W,O,ne,ae;if(!(!T||f||g||U())){g=!0;try{var xe=h.mraid.getState();if(U()||xe==="loading")return;if(xe==="hidden")throw Error("Unity host closed before ready");if(!["default","expanded","resized"].includes(xe))throw Error("Invalid Unity host state");var be=h.mraid.getVersion();if(U())return;if(be!=="3.0")throw Error("Unity Ads UA requires MRAID 3.0");try{for(var fe=Yl([["viewableChange",E],["stateChange",S],["sizeChange",B]]),Ie=fe.next();!Ie.done;Ie=fe.next()){var De=Zl(Ie.value,2),re=De[0],le=De[1];if(!V(re,le))return}}catch(Ot){W={error:Ot}}finally{try{Ie&&!Ie.done&&(O=fe.return)&&O.call(fe)}finally{if(W)throw W.error}}var Re=h.mraid.isViewable();if(U())return;if(typeof Re!="boolean")throw Error("Invalid Unity initial viewability");d=p??Re,f=!0,clearTimeout(A),clearTimeout(I),w?.(),w=void 0,_=void 0;try{for(var ze=Yl(Uf([],Zl(o),!1)),Fe=ze.next();!Fe.done;Fe=ze.next()){var ft=Fe.value;if(U())break;ft(d)}}catch(Ot){ne={error:Ot}}finally{try{Fe&&!Fe.done&&(ae=ze.return)&&ae.call(ze)}finally{if(ne)throw ne.error}}}catch(Ot){k(Ot)}finally{g=!1}}}function K(){if(!U())try{var W=s();if(U())return;if(!W){I=setTimeout(K,a);return}if(h.mraid=W,l.push(["ready",z]),h.mraid.addEventListener("ready",z),!Y("ready",z))return;T=!0,z()}catch(O){k(O)}}return{init:function(){return v||(v=new Promise(function(W,O){w=W,_=O}),U()?(L(Error("Unity bridge destroyed")),v):(A=setTimeout(function(){return k(Error("Unity MRAID readiness timed out"))},r),K(),v))},isReady:function(){return f&&!U()},isVisible:function(){return f&&d&&!U()},isClosed:U,onVisibilityChanged:function(W){return U()||o.add(W),function(){return o.delete(W)}},onClosed:function(W){return U()||c.add(W),function(){return c.delete(W)}},openStore:function(W){if(!f||!d||U()||!wh(W))throw Error("Unity store request not permitted");h.mraid.open(W)},destroy:function(){y||(y=!0,f=!1,d=!1,x(),L(Error("Unity bridge destroyed")),o.clear(),c.clear())}}}var Ro=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Po=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ff=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function q0(n){var e;n===void 0&&(n={});var t=(e=n.getHost)!==null&&e!==void 0?e:(function(){return window.mraid}),i,r=!1,a=!1,s=!1,o=!1,c=!1,l,h,f,d,m,y=new Set,T=new Set,g=[];function p(){var V,Y;clearTimeout(d),clearTimeout(m);try{for(var E=Ro(g.splice(0)),S=E.next();!S.done;S=E.next()){var B=Po(S.value,2),z=B[0],K=B[1];try{i?.removeEventListener(z,K)}catch{}}}catch(W){V={error:W}}finally{try{S&&!S.done&&(Y=E.return)&&Y.call(E)}finally{if(V)throw V.error}}}function v(V,Y){if(g.push([V,Y]),i.addEventListener(V,Y),s||o){try{i.removeEventListener(V,Y)}catch{}return!1}return!0}function w(V){var Y=V instanceof Error?V:Error(String(V));f?.(Y),h=void 0,f=void 0}function _(V,Y){var E,S;if(!(s||o)&&(s=!0,r=!1,a=!1,p(),w(V),Y))try{for(var B=Ro(Ff([],Po(T),!1)),z=B.next();!z.done;z=B.next()){var K=z.value;K()}}catch(W){E={error:W}}finally{try{z&&!z.done&&(S=B.return)&&S.call(B)}finally{if(E)throw E.error}}}function A(){var V,Y,E,S;if(!(!c||r||s||o))try{var B=i.getState();if(s||o||B==="loading")return;if(B==="hidden"){_(Error("MRAID closed before ready"),!0);return}if(!["default","expanded","resized"].includes(B))throw Error("Invalid MRAID state");try{for(var z=Ro([["viewableChange",U],["stateChange",x],["sizeChange",L]]),K=z.next();!K.done;K=z.next()){var W=Po(K.value,2),O=W[0],ne=W[1];if(!v(O,ne))return}}catch(fe){V={error:fe}}finally{try{K&&!K.done&&(Y=z.return)&&Y.call(z)}finally{if(V)throw V.error}}var ae=i.isViewable();if(s||o)return;if(typeof ae!="boolean")throw Error("Invalid MRAID viewability");a=ae,r=!0,clearTimeout(d),clearTimeout(m),h?.(),h=void 0,f=void 0;try{for(var xe=Ro(Ff([],Po(y),!1)),be=xe.next();!be.done;be=xe.next()){var ne=be.value;ne(a)}}catch(fe){E={error:fe}}finally{try{be&&!be.done&&(S=xe.return)&&S.call(xe)}finally{if(E)throw E.error}}}catch(fe){_(fe,r)}}var I=function(){return A()},U=function(V){var Y,E;if(!(!r||s||o)){if(typeof V!="boolean"){_(Error("Invalid MRAID visibility event"),!0);return}a=V;try{for(var S=Ro(Ff([],Po(y),!1)),B=S.next();!B.done;B=S.next()){var z=B.value;z(a)}}catch(K){Y={error:K}}finally{try{B&&!B.done&&(E=S.return)&&E.call(S)}finally{if(Y)throw Y.error}}}},x=function(V){V==="hidden"&&_(Error("MRAID closed"),!0)},L=function(){var V;r&&!s&&!o&&((V=n.onResize)===null||V===void 0||V.call(n))};function k(){var V,Y,E;if(!(s||o))try{if(i=t(),s||o)return;if(!i){m=setTimeout(k,(E=n.pollMs)!==null&&E!==void 0?E:50);return}if(![i.getState,i.isViewable,i.addEventListener,i.removeEventListener,i.open].every(function(O){return typeof O=="function"}))throw Error("Incomplete MRAID 2 interface");try{for(var S=Ro([["ready",I]]),B=S.next();!B.done;B=S.next()){var z=Po(B.value,2),K=z[0],W=z[1];if(!v(K,W))return}}catch(O){V={error:O}}finally{try{B&&!B.done&&(Y=S.return)&&Y.call(S)}finally{if(V)throw V.error}}c=!0,A()}catch(O){_(O,!1)}}return{init:function(){var V;return l||(l=new Promise(function(Y,E){h=Y,f=E}),s||o?(w(Error("MRAID bridge destroyed")),l):(d=setTimeout(function(){return _(Error("MRAID readiness timed out"),!1)},(V=n.timeoutMs)!==null&&V!==void 0?V:5e3),k(),l))},isReady:function(){return r&&!s&&!o},isVisible:function(){return a&&r&&!s&&!o},isClosed:function(){return s||o},onVisibilityChanged:function(V){return!s&&!o&&y.add(V),function(){return y.delete(V)}},onClosed:function(V){return!s&&!o&&T.add(V),function(){return T.delete(V)}},openStore:function(V){if(!r||!a||s||o||!wh(V))throw Error("MRAID store request not permitted");i.open(V)},destroy:function(){o||(o=!0,r=!1,a=!1,p(),w(Error("MRAID bridge destroyed")),y.clear(),T.clear())}}}var xt=function(){return xt=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},xt.apply(this,arguments)},ZS=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(h){try{l(i.next(h))}catch(f){s(f)}}function c(h){try{l(i.throw(h))}catch(f){s(f)}}function l(h){h.done?a(h.value):r(h.value).then(o,c)}l((i=i.apply(n,e||[])).next())})},JS=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(h){return c([l,h])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(h){l=[6,h],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Ne=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ze=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ue=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Z0(n){if(n!=="standalone"){if(n==="unity-ads-ua-playable")return X0();if(n==="applovin-growth-playable")return q0();throw Error("E_NATIVE_TARGET")}}function Of(n){var e=[{id:"sdk-top-left",left:0,top:0,right:Math.min(48,n.width),bottom:Math.min(48,n.height)},{id:"sdk-top-right",left:Math.max(0,n.width-56),top:0,right:n.width,bottom:Math.min(56,n.height)},{id:"sdk-bottom-left",left:0,top:Math.max(0,n.height-28),right:Math.min(48,n.width),bottom:n.height}];return{left:Math.min(48,n.width),top:Math.min(56,n.height),right:Math.max(0,n.width-56),bottom:Math.max(0,n.height-28),zones:e}}function Th(n,e){var t,i,r=(i=(t=n.measureText)===null||t===void 0?void 0:t.call(n,e))===null||i===void 0?void 0:i.width,a=/(\d+(?:\.\d+)?)px/.exec(n.font||"");return Number.isFinite(r)?r:Ze([],Ne(e),!1).length*(a?Number(a[1]):16)*.6}function Y0(n,e,t,i){var r,a,s,o,c,l,h;n.font=t.fontWeight+" "+i+"px "+t.fontFamily;var f=Math.max(0,t.width-2*((h=t.padding)!==null&&h!==void 0?h:4)),d=[];try{for(var m=Ue(String(e).split(`
`)),y=m.next();!y.done;y=m.next()){var T=y.value;if(t.wrap===!1){d.push(T);continue}var g=T.trim()?T.trim().split(/\s+/):[""],p=void 0;try{for(var v=(s=void 0,Ue(g)),w=v.next();!w.done;w=v.next()){var _=w.value,A=p?p+" "+_:_;if(Th(n,A)<=f){p=A;continue}if(p&&d.push(p),Th(n,_)<=f){p=_;continue}var I="";try{for(var U=(c=void 0,Ue(_)),x=U.next();!x.done;x=U.next()){var L=x.value;I&&Th(n,I+L)>f?(d.push(I),I=L):I+=L}}catch(k){c={error:k}}finally{try{x&&!x.done&&(l=U.return)&&l.call(U)}finally{if(c)throw c.error}}p=I}}catch(k){s={error:k}}finally{try{w&&!w.done&&(o=v.return)&&o.call(v)}finally{if(s)throw s.error}}d.push(p)}}catch(k){r={error:k}}finally{try{y&&!y.done&&(a=m.return)&&a.call(m)}finally{if(r)throw r.error}}return d}function J0(n,e,t){var i,r,a=(i=t.padding)!==null&&i!==void 0?i:4,s=Math.max(0,t.width-2*a),o=Math.max(0,t.height-2*a),c=Math.min(t.fontSize,(r=t.minFontSize)!==null&&r!==void 0?r:12),l=t.fontSize,h=Y0(n,e,t,l),f,d=function(){var m;n.font=t.fontWeight+" "+l+"px "+t.fontFamily;var y=Math.max.apply(Math,Ze([0],Ne(h.map(function(v){return Th(n,v)})),!1)),T=l*((m=t.lineHeight)!==null&&m!==void 0?m:1.2),g=h.length>16;g&&(h=h.slice(0,16));var p=h.length*T;return{lines:h,fontSize:l,scale:l/t.fontSize,renderedWidth:y,renderedHeight:p,availableWidth:s,availableHeight:o,padding:a,lineHeight:T,overflowsWidth:y>s+.01,overflowsHeight:g||p>o+.01,unsupportedChars:[]}};if(f=d(),t.autoFit!==!1)for(;(f.overflowsWidth||f.overflowsHeight)&&l>c;)l=Math.max(c,l-1),h=Y0(n,e,t,l),f=d();return f}function $S(n,e,t){var i=J0(n,e,t),r=i.padding;n.fillStyle=t.color,n.font=t.fontWeight+" "+i.fontSize+"px "+t.fontFamily,n.textAlign=t.align,n.textBaseline="middle";var a=t.align==="left"?r:t.align==="right"?t.width-r:t.width/2,s=(t.height-i.renderedHeight)/2;return i.lines.forEach(function(o,c){return n.fillText(o,a,s+(c+.5)*i.lineHeight)}),i}function KS(n,e,t){var i,r,a,s,o,c=t===void 0?{}:t,l=c.edit,h=l===void 0?!1:l,f=c.sceneId,d=f===void 0?n.base.startScene:f,m=c.onSelect,y=m===void 0?function(){}:m,T=c.network,g=T===void 0?"standalone":T,p=Z0(g),v=e.getContext("2d"),w=new Map(n.components.map(function(u){return[u.id,u]})),_=new Map(n.assets.map(function(u){return[u.id,u]})),A=new Map,I=new Map(n.events.map(function(u){return[u.id,u]})),U=new Map(n.gameplay.filter(function(u){return u.kind==="responsive-layout"}).map(function(u){return[u.componentId,u.parameters]})),x=(a=globalThis.matchMedia)===null||a===void 0?void 0:a.call(globalThis,"(prefers-reduced-motion: reduce)"),L,k=new Map,V=k;function Y(){var u=U.size>0&&e.clientWidth>e.clientHeight;return{width:u?Math.max(n.base.width,n.base.height):n.base.width,height:u?Math.min(n.base.width,n.base.height):n.base.height,landscape:u}}function E(){L!==Y().landscape&&(Yn(),Zi())}try{for(var S=Ue(n.assets),B=S.next();!B.done;B=S.next()){var z=B.value;if(z.mime.startsWith("image/")){var K=new Image;K.src="data:"+z.mime+";base64,"+z.data,A.set(z.id,K)}}}catch(u){i={error:u}}finally{try{B&&!B.done&&(r=S.return)&&r.call(S)}finally{if(i)throw i.error}}var W=d,O={},ne=[],ae=[],xe=[],be=[],fe=new Set,Ie=new Map,De=0,re=0,le=0,Re=0,ze=0,Fe=!1,ft=0,Ot=0,ut=!1,It=[],pt,bt,Ve,fn,en,Bt,tn,ee,Qt,Xt=[],G,b=[],oe=[],ue,Me=0,ke=!1,We=0,Se=g==="standalone",we=g==="standalone",Je=g==="standalone",gt=!1,$e=!1,Pe=new Map,yt=new Map,et=new Map,Lt=new Map,ie=new Set,nt=new Map,Ce=new Set,je=new Map,ot=new Map,Oe=new Map,ht=new Map,Ge=new Map,Ye=new Map,Wt=0,qt=0,kt,dn,at=new Map,ti=new Map,gn=new Map,Ci=new Map,Oi=new Map,oi=new Map,hi=new Map,ln=up(),qn=fp(),Rr=new Map,wn=new Map,Yt=yp(mp(n.projectId)),Wi=new Map,or=new Map,Pr=new Map,Fa=new Set,Dt,lr=1,Oa=1,Cn,C,se={x:0,y:0},ge,ve=[],pe=[],Ke=new Map,dt=new Map,st=new Map,Be,tt;n.components.some(function(u){return u.contract==="native.stage3d.v1"})&&(tt=D0(n,_,function(){$e||Promise.resolve().then(function(){$e||Zi()})}));var Xe=function(u){var M;return(M=et.get(u))!==null&&M!==void 0?M:w.get(u)},Gt=function(u,M){return n.gameplay.find(function(N){return N.kind===u&&N.componentId===M})},_t=function(){var u,M;Wt++,Ce.clear(),je.clear(),Oe.clear(),ht.clear();try{for(var N=Ue(ie),R=N.next();!R.done;R=N.next()){var P=R.value;try{P.stop()}catch{}}}catch(F){u={error:F}}finally{try{R&&!R.done&&(M=N.return)&&M.call(N)}finally{if(u)throw u.error}}ie.clear(),ot.clear()},Mn=function(u){var M,N;if(!Dt||u!==void 0&&Dt.pointerId!==u)return!1;var R=Dt.pointerId;Dt.behavior.parameters.powerVariableId&&(O[Dt.behavior.parameters.powerVariableId]=0),Dt=void 0;try{!((M=e.hasPointerCapture)===null||M===void 0)&&M.call(e,R)&&((N=e.releasePointerCapture)===null||N===void 0||N.call(e,R))}catch{}return!0},Jn=function(u){var M,N,R;if(!Be||u!==void 0&&Be.pointerId!==u)return!1;var P=Be.pointerId;Be.behavior.parameters.powerVariableId&&(O[Be.behavior.parameters.powerVariableId]=0),(M=tt?.getStage(w.get(Be.stageId)))===null||M===void 0||M.setGuide([]),Be=void 0;try{!((N=e.hasPointerCapture)===null||N===void 0)&&N.call(e,P)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,P))}catch{}return!0},Tn=function(u,M){var N,R;if(M===void 0&&(M=!0),!Ve||u!==void 0&&Ve.pointerId!==u)return!1;var P=Ve,F=P.pointerId;if(Ve=void 0,C=void 0,M){var D=Xe(P.targetId);D&&P.b.parameters.snapBack&&(ir(D,P.origin.x,P.origin.y),P.originZone&&ln.place(D.id,P.originZone))}try{!((N=e.hasPointerCapture)===null||N===void 0)&&N.call(e,F)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,F))}catch{}return!0},Sn=function(u){var M,N;G?.pointerId===u.pointerId&&(G=void 0);try{for(var R=Ue(Ge.values()),P=R.next();!P.done;P=R.next()){var F=P.value;F.pointerId===u.pointerId&&F.held&&(F.held=!1,F.releasedAt=De)}}catch(Z){M={error:Z}}finally{try{P&&!P.done&&(N=R.return)&&N.call(R)}finally{if(M)throw M.error}}var D=Tn(u.pointerId);return Bt===u.pointerId?(en=void 0,Bt=void 0,!0):D},li=function(u){var M,N,R,P,F,D,Z,H;if(u){Ve&&((Z=et.get(Ve.targetId))===null||Z===void 0?void 0:Z.instanceId)===u&&Tn(void 0,!1),Dt&&((H=et.get(Dt.targetId))===null||H===void 0?void 0:H.instanceId)===u&&Mn();var j=[];ln.release(u),qn.cancel(u),Wi.delete(u),Pr.delete(u),Yt.remove(u),ne=ne.filter(function(Ae){return Ae.id!==u});try{for(var X=Ue(et),Q=X.next();!Q.done;Q=X.next()){var J=Ne(Q.value,2),$=J[0],te=J[1];if(te.instanceId===u){j.push($),ln.release($),qn.cancel($),et.delete($),Pe.delete($),Lt.delete($),gn.delete($),Oi.delete($),oi.delete($);try{for(var q=(R=void 0,Ue(Ci.values())),ce=q.next();!ce.done;ce=q.next()){var de=ce.value;de.removeAgent($)}}catch(Ae){R={error:Ae}}finally{try{ce&&!ce.done&&(P=q.return)&&P.call(q)}finally{if(R)throw R.error}}try{for(var me=(F=void 0,Ue(yt.keys())),_e=me.next();!_e.done;_e=me.next()){var ye=_e.value;ye.endsWith(":"+$)&&yt.delete(ye)}}catch(Ae){F={error:Ae}}finally{try{_e&&!_e.done&&(D=me.return)&&D.call(me)}finally{if(F)throw F.error}}}}}catch(Ae){M={error:Ae}}finally{try{Q&&!Q.done&&(N=X.return)&&N.call(X)}finally{if(M)throw M.error}}xe=xe.filter(function(Ae){return!j.includes(Ae.targetId)})}},mt=function(u){for(;u;){if(u.prototype)return u.id;u=Xe(u.parentId)}},$n=function(){var u,M,N;return{viewport:Y(),components:Object.fromEntries(Ze([],Ne(Pe),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return[F,xt(xt({},D),{parameters:xt({},D.parameters)})]})),mode:h?"edit":"play",scene:W,variables:xt({},O),time:De,instances:ne.map(function(R){return xt({id:R.id,prototypeId:R.prototypeId,x:R.transform[4],y:R.transform[5]},Yt.snapshot(R.id))}),particles:ae.length,animations:xe.length,contacts:fe.size,spriteFrames:Object.fromEntries(Ze([],Ne(Lt),!1).map(function(R){var P,F=Ne(R,2),D=F[0],Z=F[1];return[D,(P=Z.frame)!==null&&P!==void 0?P:0]})),input:{dragging:!!Ve,pointerId:(M=(u=Ve?.pointerId)!==null&&u!==void 0?u:Cn?.pointerId)!==null&&M!==void 0?M:null,pressed:en??null,holding:!!Cn?.holds.length,occupancy:ln.snapshot()},feedback:{presses:Ge.size,floatingTexts:b.length,flashes:oe.length,shaking:!!ue,tutorialHands:We},match:{boards:Object.fromEntries(Ze([],Ne(at),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return[F,D.snapshot()]})),selected:kt??null,cells:Ze([],Ne(Ye),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return xt({id:F},D)})},physics:No(),physics3d:$0(),paths:Object.fromEntries(Ze([],Ne(Ci),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return[F,D.snapshot()]})),canvas:{masks:Object.fromEntries(Ze([],Ne(Wi),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return[F,{progress:D.progress}]})),strokes:Object.fromEntries(Ze([],Ne(or),!1).map(function(R){var P=Ne(R,2),F=P[0],D=P[1];return[F,D.strokes.length]})),walls:ve.length,joints:pe.filter(function(R){return!R.broken}).length},audio:{state:(N=pt?.state)!==null&&N!==void 0?N:"locked",voices:ie.size,blocked:qt},network:{target:g,ready:we,visible:Je,started:Se,closed:gt},diagnostics:Ze([],Ne(It),!1)}},nn=function(){return!h&&!Fe&&!document.hidden&&we&&Je&&Se&&!gt},Yn=function(){var u,M,N,R;G=void 0,Mn(),Jn(),Tn(),Cn=void 0,C=void 0,ge=void 0;try{for(var P=Ue(or.values()),F=P.next();!F.done;F=P.next()){var D=F.value;D.cancel()}}catch(X){u={error:X}}finally{try{F&&!F.done&&(M=P.return)&&M.call(P)}finally{if(u)throw u.error}}qn.clear(),dn=void 0;try{for(var Z=Ue(at.values()),H=Z.next();!H.done;H=Z.next()){var j=H.value;j.cancelSelection()}}catch(X){N={error:X}}finally{try{H&&!H.done&&(R=Z.return)&&R.call(Z)}finally{if(N)throw N.error}}at.size&&(kt=void 0),en=void 0,Bt=void 0,Ge.clear()},Nn=function(u){ut=!0,It.push(u),It=It.slice(-16),be=[]},wt=function(u){var M,N,R;return xt(xt(xt({},u.parameters),u.prototypeId?(M=Pe.get(u.prototypeId))===null||M===void 0?void 0:M.parameters:{}),(R=Pe.get((N=u.runtimeId)!==null&&N!==void 0?N:u.id))===null||R===void 0?void 0:R.parameters)};function Bi(u,M){var N,R=Ge.get(u.id);if(!R||x?.matches)return M;var P=Ze([],Ne(M),!1),F=R.held?0:De-((N=R.releasedAt)!==null&&N!==void 0?N:De),D=R.held?0:Math.min(1,F/R.behavior.springBackSeconds),Z=R.held?R.behavior.scaleDown:R.behavior.scaleDown+(1-R.behavior.scaleDown)*(1-Math.pow(1-D,3)),H=wt(u);P[4]+=(1-Z)*(P[0]*H.width+P[2]*H.height)/2,P[5]+=(1-Z)*(P[1]*H.width+P[3]*H.height)/2;for(var j=0;j<4;j++)P[j]*=Z;return P}function rn(u){var M,N,R,P,F,D,Z,H=u.transform,j=(R=(N=Pe.get((M=u.runtimeId)!==null&&M!==void 0?M:u.id))===null||N===void 0?void 0:N.transform)!==null&&R!==void 0?R:H,X=U.get((P=u.prototypeId)!==null&&P!==void 0?P:u.id);if(!X)return Bi(u,j);var Q=Y(),J=Ze([],Ne(j),!1);Q.landscape&&(J[4]+=X.x-H[4],J[5]+=X.y-H[5],J[0]*=X.scaleX,J[1]*=X.scaleX,J[2]*=X.scaleY,J[3]*=X.scaleY);var $=(F=X.anchor)!==null&&F!==void 0?F:"none";if($==="none"&&!X.respectSafeArea)return Bi(u,J);var te=X.respectSafeArea?Of(Q):{left:0,top:0,right:Q.width,bottom:Q.height},q=wt(u),ce=(D=X.marginX)!==null&&D!==void 0?D:0,de=(Z=X.marginY)!==null&&Z!==void 0?Z:0,me=Math.abs(J[0])*q.width+Math.abs(J[2])*q.height,_e=Math.abs(J[1])*q.width+Math.abs(J[3])*q.height;return $!=="none"?(J[4]=$.endsWith("left")?te.left+ce:$.endsWith("right")?te.right-me-ce:(te.left+te.right-me)/2,J[5]=$.startsWith("top")?te.top+de:$.startsWith("bottom")?te.bottom-_e-de:(te.top+te.bottom-_e)/2):(J[4]=Math.max(te.left+ce,Math.min(te.right-me-ce,J[4])),J[5]=Math.max(te.top+de,Math.min(te.bottom-_e-de,J[5]))),Bi(u,J)}var Dn=function(u){return(et.has(u)?Ze([],Ne(et.values()),!1):Ze(Ze([],Ne(n.components),!1),Ne(ne),!1)).filter(function(M){return M.parentId===u&&!M.prototype}).sort(function(M,N){return M.order-N.order||(M.id<N.id?-1:M.id>N.id?1:0)})},Xi=function(){return n.components.filter(function(u){return u.sceneId===W&&!u.parentId&&!u.prototype}).sort(function(u,M){return u.order-M.order||(u.id<M.id?-1:u.id>M.id?1:0)})},St=function(u){if(be.length>=256){Nn("Event queue budget exhausted");return}be.push(u)},Gn=function(u,M,N,R){var P,F,D,Z;return R===void 0&&(R={}),xt(xt({kind:u,componentId:(P=M.prototypeId)!==null&&P!==void 0?P:M.id,selfInstanceId:(F=M.instanceId)!==null&&F!==void 0?F:M.id,instanceId:M.instanceId},N?{otherId:(D=N.prototypeId)!==null&&D!==void 0?D:N.id,otherInstanceId:(Z=N.instanceId)!==null&&Z!==void 0?Z:N.id}:{}),R)};function qi(u){for(var M,N=u;N;N=Xe(N.parentId)){var R=Yt.states.get((M=N.instanceId)!==null&&M!==void 0?M:N.id);if(R)return R}}function fs(u){var M,N,R=Gt("instance-state",(M=u.prototypeId)!==null&&M!==void 0?M:u.id);return R?Yt.initialize((N=u.instanceId)!==null&&N!==void 0?N:u.id,R.parameters):void 0}function Jl(){var u,M,N,R;try{for(var P=Ue(n.gameplay.filter(function(X){return X.kind==="instance-state"})),F=P.next();!F.done;F=P.next()){var D=F.value;try{for(var Z=(N=void 0,Ue(di(w.get(D.componentId)))),H=Z.next();!H.done;H=Z.next()){var j=H.value;fs(j)}}catch(X){N={error:X}}finally{try{H&&!H.done&&(R=Z.return)&&R.call(Z)}finally{if(N)throw N.error}}}}catch(X){u={error:X}}finally{try{F&&!F.done&&(M=P.return)&&M.call(P)}finally{if(u)throw u.error}}}function Ds(u,M,N,R){var P=qi(u);if(P){var F=P.hp;if(M==="tag")P.tag=N==="set"?String(R):P.tag;else{var D=Number(R);if(P[M]=N==="add"?P[M]+D:N==="sub"?P[M]-D:D,!Number.isFinite(P[M])){Nn("Instance state range exceeded");return}M==="hp"&&(P.hp=Math.max(0,Math.min(P.maxHp,P.hp)))}F>0&&P.hp<=0&&St(Gn("instanceDepleted",u))}}function ea(u,M){var N,R,P;if(!u)return!0;if(u.all)return u.all.every(function(j){return ea(j,M)});if(u.any)return u.any.some(function(j){return ea(j,M)});var F=u.instanceTarget==="other"?M?.otherInstanceId:(N=M?.selfInstanceId)!==null&&N!==void 0?N:M?.instanceId,D=u.instanceField?(R=Xe(F))!==null&&R!==void 0?R:Ze([],Ne(et.values()),!1).find(function(j){return j.instanceId===F}):void 0,Z=u.instanceField?(P=qi(D))===null||P===void 0?void 0:P[u.instanceField]:O[u.variableId],H=u.compareVariableId?O[u.compareVariableId]:u.value;return{eq:function(){return Z===H},ne:function(){return Z!==H},lt:function(){return Z<H},lte:function(){return Z<=H},gt:function(){return Z>H},gte:function(){return Z>=H}}[u.op]()}function ps(u){var M,N,R;kt=void 0,dn=void 0,u||Ye.clear();try{for(var P=Ue(n.gameplay),F=P.next();!F.done;F=P.next()){var D=F.value;if(D.kind==="match-tile"){var Z=w.get(D.componentId);if(u&&Z.id!==u&&!yr(Z,u))continue;Pe.delete(Z.id),Ye.set(Z.id,{row:D.parameters.row,column:D.parameters.column,group:D.parameters.group,sceneId:Z.sceneId,boardId:(R=Z.parentId)!==null&&R!==void 0?R:Z.sceneId})}}}catch(H){M={error:H}}finally{try{F&&!F.done&&(N=P.return)&&N.call(P)}finally{if(M)throw M.error}}}function Eh(){var u,M,N=function(D){var Z,H;if(at.has(D.componentId))return"continue";var j=D.componentId,X=D.parameters,Q=n.gameplay.filter(function(ye){return ye.kind==="match-tile"&&w.get(ye.componentId).parentId===j}).sort(function(ye,Ae){return ye.parameters.row-Ae.parameters.row||ye.parameters.column-Ae.parameters.column}).map(function(ye){return xt({id:ye.componentId},ye.parameters)}),J=new Map;try{for(var $=(Z=void 0,Ue(Q)),te=$.next();!te.done;te=$.next()){var q=te.value;if(!J.has(q.group)){var ce=w.get(q.id);J.set(q.group,{fill:ce.parameters.fill,children:Dn(q.id).filter(function(ye){return["native.image.v1","native.text.v1"].includes(ye.contract)})})}}}catch(ye){Z={error:ye}}finally{try{te&&!te.done&&(H=$.return)&&H.call($)}finally{if(Z)throw Z.error}}ti.set(j,J);var de=w.get(Q[X.columns].id).transform[5]-w.get(Q[0].id).transform[5],me=function(ye,Ae,Ee){var Le,He=Ee.from,rt=He===void 0?ye:He,qe=Ee.progress,Tt=qe===void 0?0:qe,lt=Ee.offsetRows,Nt=lt===void 0?0:lt,Vt=Ee.scale,ct=Vt===void 0?1:Vt,Jt=Ee.opacity,Kt=Jt===void 0?1:Jt,Mt=Q[ye],Qe=w.get(Mt.id),zt=w.get(Q[rt].id),Pt=J.get(Ae),it=Ze([],Ne(Qe.transform),!1);it[4]+=(zt.transform[4]-Qe.transform[4])*Tt,it[5]+=(zt.transform[5]-Qe.transform[5]+Nt*de)*Tt,it[4]+=(1-ct)*(it[0]*Qe.parameters.width+it[2]*Qe.parameters.height)/2,it[5]+=(1-ct)*(it[1]*Qe.parameters.width+it[3]*Qe.parameters.height)/2;for(var Ct=0;Ct<4;Ct++)it[Ct]*=ct;Pe.set(Mt.id,xt(xt({},Pe.get(Mt.id)),{transform:it,parameters:xt(xt({},(Le=Pe.get(Mt.id))===null||Le===void 0?void 0:Le.parameters),{fill:Pt.fill,opacity:Kt})})),Ye.get(Mt.id).group=Ae;var jt=Dn(Mt.id).filter(function(pn){return["native.image.v1","native.text.v1"].includes(pn.contract)});jt.forEach(function(pn,Ht){var An,Ti,bn=Pt.children[Ht];if(!(!bn||bn.contract!==pn.contract)){var sn=(An=Pe.get(pn.id))!==null&&An!==void 0?An:{transform:Ze([],Ne(pn.transform),!1),parameters:{}};pn.contract==="native.image.v1"?sn.assetId=(Ti=bn.assetSlots[0])===null||Ti===void 0?void 0:Ti.assetId:sn.parameters.text=bn.parameters.text,Pe.set(pn.id,sn)}})},_e=op(xt(xt({},X),{slots:Q,paint:me,onEvent:function(ye){kt=void 0,St({kind:ye,componentId:j})}}));at.set(j,_e)};try{for(var R=Ue(n.gameplay.filter(function(D){return D.kind==="match-board"})),P=R.next();!P.done;P=R.next()){var F=P.value;N(F)}}catch(D){u={error:D}}finally{try{P&&!P.done&&(M=R.return)&&M.call(R)}finally{if(u)throw u.error}}}function $l(u){var M,N;Eh();try{for(var R=Ue(at),P=R.next();!P.done;P=R.next()){var F=Ne(P.value,2),D=F[0],Z=F[1];(!u||u===D||yr(w.get(D),u))&&Z.reset()}}catch(H){M={error:H}}finally{try{P&&!P.done&&(N=R.return)&&N.call(R)}finally{if(M)throw M.error}}}function di(u){return mt(u)?Ze([],Ne(et.values()),!1).filter(function(M){return M.prototypeId===u.id}):[u]}function gi(u){var M=wt(u);return En(Bn(u),M.width/2,M.height/2)}function Lr(u,M,N){var R;N===void 0&&(N="self");var P=w.get(u),F=N==="other"?M.otherInstanceId:(R=M.selfInstanceId)!==null&&R!==void 0?R:M.instanceId,D=!!(P&&mt(P));if(F!==void 0){if(u){var Z=Ze([],Ne(et.values()),!1).find(function(H){return H.prototypeId===u&&(H.instanceId===F||H.id===F)});if(Z)return Z}if(N==="other"||!u)return Xe(F);if(D&&typeof F=="string"&&F.startsWith("instance."))return}return P?D?di(P)[0]:Xe(u):void 0}function ir(u,M,N){var R,P=wt(u),F=(R=Pe.get(u.id))!==null&&R!==void 0?R:{transform:Ze([],Ne(u.transform),!1),parameters:{}},D=Ze([],Ne(F.transform),!1),Z=u.parentId?Bn(Xe(u.parentId)):ra(),H=En(qr(Z),M,N);D[4]=H.x-(D[0]*P.width+D[2]*P.height)/2,D[5]=H.y-(D[1]*P.width+D[3]*P.height)/2,Pe.set(u.id,xt(xt({},F),{transform:D})),u.prototypeId&&(u.transform=Ze([],Ne(D),!1))}function Ba(u,M,N){var R,P,F,D;N===void 0&&(N=!1);var Z=(R=Pe.get(u.id))!==null&&R!==void 0?R:{transform:Ze([],Ne(u.transform),!1),parameters:{}},H=(D=(F=w.get((P=u.prototypeId)!==null&&P!==void 0?P:u.id))===null||F===void 0?void 0:F.transform)!==null&&D!==void 0?D:u.transform,j=Math.hypot(H[0],H[1])*(N?-1:1),X=Math.hypot(H[2],H[3]),Q=M+(N?0:Math.atan2(H[1],H[0])),J=Math.cos(Q),$=Math.sin(Q),te=Ze([],Ne(Z.transform),!1);te[0]=J*j,te[1]=$*j,te[2]=-$*X,te[3]=J*X,Pe.set(u.id,xt(xt({},Z),{transform:te}))}function Kn(u,M){var N=gn.get(u.id);if(N)return N;var R=Bn(u),P=wt(u),F=En(R,P.width/2,P.height/2);return N=xt({id:u.id,sourceId:M.componentId,instanceId:u.instanceId,x:F.x,y:F.y,vx:0,vy:0,width:Math.hypot(R[0],R[1])*P.width,height:Math.hypot(R[2],R[3])*P.height,angle:Math.atan2(R[1],R[0]),restElapsed:0,atRest:!0},M.parameters),gn.set(u.id,N),N}function za(u,M){var N,R=Wi.get(u.id);if(R)return R;var P=wt(u),F=M.parameters;return R=xp(F,{width:P.width,height:P.height,source:u.contract==="native.image.v1"?A.get((N=u.assetSlots[0])===null||N===void 0?void 0:N.assetId):void 0,onProgress:function(D){F.progressVariableId&&(O[F.progressVariableId]=D),St(Gn("maskProgress",u))},onComplete:function(){return St(Gn("maskComplete",u))}}),Wi.set(u.id,R),R}function ka(u){var M=or.get(u.componentId);return M||(M=Sp(u.parameters),or.set(u.componentId,M)),M}function Us(){var u,M,N,R,P,F,D,Z,H,j,X,Q,J=new Set,$=[];try{for(var te=Ue(n.gameplay.filter(function(it){return it.kind==="physics-body"})),q=te.next();!q.done;q=te.next()){var ce=q.value,de=w.get(ce.componentId);if(de.sceneId===W)try{for(var me=(N=void 0,Ue(di(de))),_e=me.next();!_e.done;_e=me.next()){var ye=_e.value;if(fi(ye)){if($.length>=64){Nn("Physics body budget exhausted");break}var Ae=Kn(ye,ce),Ee=Bn(ye),Le=wt(ye),He=En(Ee,Le.width/2,Le.height/2);if(J.add(ye.id),Ae.width=Math.hypot(Ee[0],Ee[1])*Le.width,Ae.height=Math.hypot(Ee[2],Ee[3])*Le.height,Ae.mode!=="dynamic"){var rt=Oi.get(ye.id),qe=ye.parentId?Bn(Xe(ye.parentId)):ra(),Tt=(X=rt?.vx)!==null&&X!==void 0?X:0,lt=(Q=rt?.vy)!==null&&Q!==void 0?Q:0;Ae.x=He.x,Ae.y=He.y,Ae.angle=Math.atan2(Ee[1],Ee[0]),Ae.vx=qe[0]*Tt+qe[2]*lt,Ae.vy=qe[1]*Tt+qe[3]*lt}else Ae.atRest&&(Ae.x=He.x,Ae.y=He.y);$.push(Ae)}}}catch(it){N={error:it}}finally{try{_e&&!_e.done&&(R=me.return)&&R.call(me)}finally{if(N)throw N.error}}}}catch(it){u={error:it}}finally{try{q&&!q.done&&(M=te.return)&&M.call(te)}finally{if(u)throw u.error}}try{for(var Nt=Ue(gn.keys()),Vt=Nt.next();!Vt.done;Vt=Nt.next()){var ct=Vt.value;!J.has(ct)&&!et.has(ct)&&gn.delete(ct)}}catch(it){P={error:it}}finally{try{Vt&&!Vt.done&&(F=Nt.return)&&F.call(Nt)}finally{if(P)throw P.error}}var Jt=[];try{for(var Kt=Ue(n.gameplay.filter(function(it){return it.kind==="capture-zone"})),Mt=Kt.next();!Mt.done;Mt=Kt.next()){var ce=Mt.value,de=w.get(ce.componentId);if(de.sceneId===W)try{for(var Qe=(H=void 0,Ue(di(de))),zt=Qe.next();!zt.done;zt=Qe.next()){var ye=zt.value;if(fi(ye)){var Ee=Bn(ye),Le=wt(ye),He=En(Ee,Le.width/2,Le.height/2),Pt=Math.max(.1,Math.min(Math.hypot(Ee[0],Ee[1]),Math.hypot(Ee[2],Ee[3])));Jt.push(xt(xt({id:ye.id,sourceId:de.id,instanceId:ye.instanceId,x:He.x,y:He.y},ce.parameters),{radius:ce.parameters.radius*Pt}))}}}catch(jt){H={error:jt}}finally{try{zt&&!zt.done&&(j=Qe.return)&&j.call(Qe)}finally{if(H)throw H.error}}}}catch(it){D={error:it}}finally{try{Mt&&!Mt.done&&(Z=Kt.return)&&Z.call(Kt)}finally{if(D)throw D.error}}return{bodies:Ze(Ze([],Ne($),!1),Ne(ve),!1),zones:Jt}}function ya(u){var M,N,R,P,F,D,Z,H=Us(),j=H.bodies,X=H.zones,Q=Y();pe=[];try{for(var J=Ue(n.gameplay.filter(function(qe){return qe.kind==="physics-joint"})),$=J.next();!$.done;$=J.next()){var te=$.value,q=w.get(te.componentId);if(q.sceneId===W){var ce=Xe(te.parameters.anchorComponentId),de=Gt("physics-body",q.id);if(!(!ce||!de))try{for(var me=(R=void 0,Ue(di(q))),_e=me.next();!_e.done;_e=me.next()){var ye=_e.value;Kn(ye,de);var Ae=gi(ce),Ee=te.id+":"+ye.id;pe.push(xt(xt({},te.parameters),{id:te.id,key:Ee,componentId:q.id,bodyId:ye.id,anchorId:ce.id,x:Ae.x,y:Ae.y,broken:Fa.has(Ee)}))}}catch(qe){R={error:qe}}finally{try{_e&&!_e.done&&(P=me.return)&&P.call(me)}finally{if(R)throw R.error}}}}}catch(qe){M={error:qe}}finally{try{$&&!$.done&&(N=J.return)&&N.call(J)}finally{if(M)throw M.error}}$h({bodies:j,zones:X,joints:pe,bounds:{left:0,top:0,right:Q.width,bottom:Q.height},dt:u,onEvent:function(qe,Tt,lt){var Nt,Vt,ct,Jt;if(!(qe==="bodyBounce"&&lt&&Tt.sourceId===lt.sourceId&&Tt.id>lt.id)){var Kt=(Nt=Tt.instanceId)!==null&&Nt!==void 0?Nt:Tt.id,Mt=lt?(Vt=lt.instanceId)!==null&&Vt!==void 0?Vt:lt.id:void 0,Qe=xt(xt({kind:qe,componentId:Tt.sourceId,selfInstanceId:Kt},Mt?{otherInstanceId:Mt}:{}),{instanceId:(ct=Tt.instanceId)!==null&&ct!==void 0?ct:lt?.instanceId});if(lt&&(Qe.otherId=lt.sourceId),St(Qe),qe==="zoneCapture"){var zt=Xe(Tt.id),Pt=w.get(lt.sourceId);if(lt.hideCaptured&&zt){var it=(Jt=Pe.get(zt.id))!==null&&Jt!==void 0?Jt:{transform:Ze([],Ne(zt.transform),!1),parameters:{}};it.parameters.visible=!1,Pe.set(zt.id,it)}lt.stopBody&&Pt&&zt&&ir(zt,lt.x,lt.y)}}}});try{for(var Le=Ue(j),He=Le.next();!He.done;He=Le.next()){var rt=He.value,ye=Xe(rt.id);!ye||rt.mode!=="dynamic"||(rt.spinToRotation&&Ba(ye,(Z=rt.angle)!==null&&Z!==void 0?Z:0),ir(ye,rt.x,rt.y))}}catch(qe){F={error:qe}}finally{try{He&&!He.done&&(D=Le.return)&&D.call(Le)}finally{if(F)throw F.error}}}function Lo(){var u,M,N,R,P;try{for(var F=Ue(n.gameplay.filter(function(_e){return _e.kind==="oscillate"})),D=F.next();!D.done;D=F.next()){var Z=D.value,H=w.get(Z.componentId);if(H.sceneId===W)try{for(var j=(N=void 0,Ue(di(H))),X=j.next();!X.done;X=j.next()){var Q=X.value,J=Oi.get(Q.id);J||(J={base:Ze([],Ne(rn(Q)),!1),vx:0,vy:0},Oi.set(Q.id,J));var $=Z.parameters,te=(De/$.periodSeconds+$.phase)*Math.PI*2,q=Math.sin(te)*$.amplitude,ce=Math.cos(te)*$.amplitude*Math.PI*2/$.periodSeconds,de=(P=Pe.get(Q.id))!==null&&P!==void 0?P:{parameters:{}},me=Ze([],Ne(J.base),!1);$.axis==="x"?(me[4]+=q,J.vx=ce,J.vy=0):(me[5]+=q,J.vy=ce,J.vx=0),Pe.set(Q.id,xt(xt({},de),{transform:me})),Oi.set(Q.id,J)}}catch(_e){N={error:_e}}finally{try{X&&!X.done&&(R=j.return)&&R.call(j)}finally{if(N)throw N.error}}}}catch(_e){u={error:_e}}finally{try{D&&!D.done&&(M=F.return)&&M.call(F)}finally{if(u)throw u.error}}}function Fs(){var u,M;Ci.clear();var N=function(D){var Z=n.gameplay.filter(function(j){return j.kind==="path-gate"&&j.parameters.networkBehaviorId===D.id}),H=F0({id:D.id,nodes:D.parameters.nodes,edges:D.parameters.edges,gates:Z,onEvent:function(j,X){var Q,J=Xe(X.componentId),$=(Q=J?.prototypeId)!==null&&Q!==void 0?Q:X.componentId;St(xt({kind:j,componentId:$,instanceId:J?.instanceId},X.nodeId?{nodeId:X.nodeId}:{}))}});Ci.set(D.id,H)};try{for(var R=Ue(n.gameplay.filter(function(D){return D.kind==="path-network"})),P=R.next();!P.done;P=R.next()){var F=P.value;N(F)}}catch(D){u={error:D}}finally{try{P&&!P.done&&(M=R.return)&&M.call(R)}finally{if(u)throw u.error}}}function Va(u,M){var N,R,P,F,D,Z,H,j,X,Q,J,$,te;M===void 0&&(M=!0);var q=0;try{for(var ce=Ue(n.gameplay.filter(function(it){return it.kind==="path-agent"})),de=ce.next();!de.done;de=ce.next()){var me=de.value,_e=w.get(me.componentId),ye=Ci.get(me.parameters.networkBehaviorId);if(!(_e.sceneId!==W||!ye))try{for(var Ae=(P=void 0,Ue(di(_e))),Ee=Ae.next();!Ee.done;Ee=Ae.next()){var Le=Ee.value;if(++q>64){Nn("Path agent budget exhausted");break}var He=ye.getAgent(Le.id);He||(He=ye.addAgent(xt(xt({},me.parameters),{id:Le.id,startNode:(J=Le.pathStartNode)!==null&&J!==void 0?J:me.parameters.startNode,targetNode:($=Le.pathTargetNode)!==null&&$!==void 0?$:me.parameters.targetNode}))),He.speedMultiplier=Math.max(0,Number(me.parameters.speedMultiplierVariableId?O[me.parameters.speedMultiplierVariableId]:1))}}catch(it){P={error:it}}finally{try{Ee&&!Ee.done&&(F=Ae.return)&&F.call(Ae)}finally{if(P)throw P.error}}}}catch(it){N={error:it}}finally{try{de&&!de.done&&(R=ce.return)&&R.call(ce)}finally{if(N)throw N.error}}if(M){var rt=function(it,Ct){var jt=n.gameplay.find(function(pn){return pn.id===it});w.get(jt.componentId).sceneId===W&&Ct.tick(u)};try{for(var qe=Ue(Ci),Tt=qe.next();!Tt.done;Tt=qe.next()){var lt=Ne(Tt.value,2),Nt=lt[0],Vt=lt[1];rt(Nt,Vt)}}catch(it){D={error:it}}finally{try{Tt&&!Tt.done&&(Z=qe.return)&&Z.call(qe)}finally{if(D)throw D.error}}}try{for(var ct=Ue(n.gameplay.filter(function(it){return it.kind==="path-agent"})),Jt=ct.next();!Jt.done;Jt=ct.next()){var me=Jt.value,_e=w.get(me.componentId),Kt=Ci.get(me.parameters.networkBehaviorId);if(!(_e.sceneId!==W||!Kt))try{for(var Mt=(X=void 0,Ue(di(_e))),Qe=Mt.next();!Qe.done;Qe=Mt.next()){var Le=Qe.value,He=Kt.getAgent(Le.id);if(He){if(He.orientToPath==="rotate")Ba(Le,He.heading);else if(He.orientToPath==="flip-x")Ba(Le,0,He.flipX);else if(He.orientToPath==="iso-4"){var zt=(te=Pe.get(Le.id))!==null&&te!==void 0?te:{transform:Ze([],Ne(Le.transform),!1),parameters:{}};zt.pathFrame=He.frame,Pe.set(Le.id,zt)}var Pt=Le.parentId?En(Bn(Xe(Le.parentId)),He.x,He.y):He;ir(Le,Pt.x,Pt.y)}}}catch(jt){X={error:jt}}finally{try{Qe&&!Qe.done&&(Q=Mt.return)&&Q.call(Mt)}finally{if(X)throw X.error}}}}catch(it){H={error:it}}finally{try{Jt&&!Jt.done&&(j=ct.return)&&j.call(ct)}finally{if(H)throw H.error}}}function ms(u){var M,N,R,P,F,D,Z,H,j,X,Q=new Set;try{for(var J=Ue(n.gameplay.filter(function(sn){return sn.kind==="value-meter"})),$=J.next();!$.done;$=J.next()){var te=$.value,q=w.get(te.componentId);if(q.sceneId===W)try{for(var ce=(R=void 0,Ue(di(q))),de=ce.next();!de.done;de=ce.next()){var me=de.value,_e=te.parameters,ye=_e.instanceField?qi(me):void 0,Ae=_e.instanceField==="hp"&&ye?ye.hp/ye.maxHp*(_e.max-_e.min)+_e.min:_e.instanceField==="value"&&ye?ye.value:Number(O[_e.variableId]),Ee=oi.get(me.id);Ee||(Ee={base:Ze([],Ne(rn(me)),!1),value:Number.isFinite(Ae)?Math.max(_e.min,Math.min(_e.max,Ae)):_e.min},oi.set(me.id,Ee)),Q.add(me.id);var Le=Math.max(_e.min,Math.min(_e.max,Ae)),He=_e.smoothingSeconds?1-Math.exp(-u/_e.smoothingSeconds):1;Ee.value+=((Number.isFinite(Le)?Le:_e.min)-Ee.value)*He;var rt=Math.max(0,Math.min(1,(Ee.value-_e.min)/(_e.max-_e.min))),qe=Ze([],Ne(Ee.base),!1),Tt=(j=Pe.get(me.id))!==null&&j!==void 0?j:{parameters:{}},lt=_e.axis==="x"?wt(me).width:wt(me).height;if(_e.axis==="x"?(qe[0]*=rt,qe[1]*=rt):(qe[2]*=rt,qe[3]*=rt),_e.direction==="negative"){var Nt=lt*(1-rt);_e.axis==="x"?(qe[4]+=Ee.base[0]*Nt,qe[5]+=Ee.base[1]*Nt):(qe[4]+=Ee.base[2]*Nt,qe[5]+=Ee.base[3]*Nt)}Pe.set(me.id,xt(xt({},Tt),{transform:qe}))}}catch(sn){R={error:sn}}finally{try{de&&!de.done&&(P=ce.return)&&P.call(ce)}finally{if(R)throw R.error}}}}catch(sn){M={error:sn}}finally{try{$&&!$.done&&(N=J.return)&&N.call(J)}finally{if(M)throw M.error}}try{for(var Vt=Ue(oi.keys()),ct=Vt.next();!ct.done;ct=Vt.next()){var Jt=ct.value;Q.has(Jt)||oi.delete(Jt)}}catch(sn){F={error:sn}}finally{try{ct&&!ct.done&&(D=Vt.return)&&D.call(Vt)}finally{if(F)throw F.error}}try{for(var Kt=Ue(n.gameplay.filter(function(sn){return sn.kind==="camera-follow"})),Mt=Kt.next();!Mt.done;Mt=Kt.next()){var te=Mt.value,Qe=w.get(te.componentId),Le=Xe(te.parameters.targetId);if(!(Qe.sceneId!==W||!Le)){var zt=hi.get(Qe.id);zt||(zt={base:Ze([],Ne(Qe.transform),!1),x:te.parameters.minX,y:te.parameters.minY},hi.set(Qe.id,zt));var Pt=function(mi,yi){for(var jn=[],Si=mi;Si&&Si.id!==yi.id;Si=Xe(Si.parentId))jn.unshift(Si);return jn.reduce(function(Hn,yn){return Hs(Hn,rn(yn))},ra())},qe=yr(Le,Qe.id)?Pt(Le,Qe):Bn(Le),_e=wt(Le),it=En(qe,_e.width/2,_e.height/2),Ct=Y(),jt=te.parameters,pn=Math.max(jt.minX,jt.maxX-Ct.width/jt.zoom),Ht=Math.max(jt.minY,jt.maxY-Ct.height/jt.zoom),An=Math.max(jt.minX,Math.min(pn,it.x-Ct.width/(2*jt.zoom))),Ti=Math.max(jt.minY,Math.min(Ht,it.y-Ct.height/(2*jt.zoom))),He=1-Math.exp(-jt.smoothing*u);zt.x+=(An-zt.x)*He,zt.y+=(Ti-zt.y)*He;var Tt=(X=Pe.get(Qe.id))!==null&&X!==void 0?X:{parameters:{}},bn=Ze([],Ne(zt.base),!1);bn[0]*=jt.zoom,bn[1]*=jt.zoom,bn[2]*=jt.zoom,bn[3]*=jt.zoom,bn[4]-=zt.x*jt.zoom,bn[5]-=zt.y*jt.zoom,Pe.set(Qe.id,xt(xt({},Tt),{transform:bn}))}}}catch(sn){Z={error:sn}}finally{try{Mt&&!Mt.done&&(H=Kt.return)&&H.call(Kt)}finally{if(Z)throw Z.error}}}function No(){return{bodies:Ze([],Ne(gn.values()),!1).map(function(u){return{id:u.id,sourceId:u.sourceId,x:u.x,y:u.y,vx:u.vx,vy:u.vy,atRest:!!u.atRest,captured:!!u.captured}}),aiming:Dt?{componentId:Dt.sourceId,pointerId:Dt.pointerId,power:Dt.power}:null}}function Os(u){for(var M=u;M;){if(M.contract==="native.stage3d.v1")return M;M=M.parentId?Xe(M.parentId):void 0}}function Bs(u,M){var N,R,P,F,D,Z,H=Ke.get(u.id);if(H)return H;var j=wt(u),X=Os(u);return H=xt({id:u.id,sourceId:M.componentId,stageId:X?.id,x:(N=j.x)!==null&&N!==void 0?N:0,y:(R=j.y)!==null&&R!==void 0?R:0,z:(P=j.z)!==null&&P!==void 0?P:0,vx:0,vy:0,vz:0,spin:0,atRest:!0,captured:!1,captureElapsed:0,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:(F=j.x)!==null&&F!==void 0?F:0,y:(D=j.y)!==null&&D!==void 0?D:0,z:(Z=j.z)!==null&&Z!==void 0?Z:0}},M.parameters),Ke.set(u.id,H),H}function zs(){var u,M,N,R,P,F,D,Z=[],H=[],j=[];if(!tt)return{bodies:Z,walls:H,zones:j};try{for(var X=Ue(n.gameplay.filter(function(me){return me.kind==="physics-3d"})),Q=X.next();!Q.done;Q=X.next()){var J=Q.value,$=w.get(J.componentId);if(!(!$||$.sceneId!==W||!fi($))){var te=Bs($,J);te.mode==="dynamic"?Z.push(te):H.push(te)}}}catch(me){u={error:me}}finally{try{Q&&!Q.done&&(M=X.return)&&M.call(X)}finally{if(u)throw u.error}}try{for(var q=Ue(n.gameplay.filter(function(me){return me.kind==="capture-zone-3d"})),ce=q.next();!ce.done;ce=q.next()){var J=ce.value,$=w.get(J.componentId);if(!(!$||$.sceneId!==W||!fi($))){var de=wt($);j.push(xt({id:$.id,sourceId:$.id,x:(P=de.x)!==null&&P!==void 0?P:0,y:(F=de.y)!==null&&F!==void 0?F:0,z:(D=de.z)!==null&&D!==void 0?D:0},J.parameters))}}}catch(me){N={error:me}}finally{try{ce&&!ce.done&&(R=q.return)&&R.call(q)}finally{if(N)throw N.error}}return{bodies:Z,walls:H,zones:j}}function Ah(u){var M,N,R,P,F,D,Z,H,j,X;if(tt){try{for(var Q=Ue(n.gameplay.filter(function(Jt){return Jt.kind==="oscillate-3d"})),J=Q.next();!J.done;J=Q.next()){var $=J.value,te=w.get($.componentId);if(!(!te||te.sceneId!==W)){var q=dt.get(te.id);if(!q){var ce=wt(te);q={x:(F=ce.x)!==null&&F!==void 0?F:0,y:(D=ce.y)!==null&&D!==void 0?D:0,z:(Z=ce.z)!==null&&Z!==void 0?Z:0},dt.set(te.id,q)}var de=$.parameters,me=De*de.angularSpeed+de.phase,_e=Math.sin(me)*de.amplitude,ye=Math.cos(me)*de.amplitude*de.angularSpeed,Ae=(H=Ke.get(te.id))!==null&&H!==void 0?H:Gt("physics-3d",te.id)?Bs(te,Gt("physics-3d",te.id)):void 0,Ee=q.x+(de.axis==="x"?_e:0),Le=q.y+(de.axis==="y"?_e:0),He=q.z+(de.axis==="z"?_e:0);if(Ae)Ae.x=Ee,Ae.y=Le,Ae.z=He,Ae.vx=de.axis==="x"?ye:0,Ae.vy=de.axis==="y"?ye:0,Ae.vz=de.axis==="z"?ye:0;else{var rt=(j=Pe.get(te.id))!==null&&j!==void 0?j:{transform:Ze([],Ne(te.transform),!1),parameters:{}};rt.parameters.x=Ee,rt.parameters.y=Le,rt.parameters.z=He,Pe.set(te.id,rt)}}}}catch(Jt){M={error:Jt}}finally{try{J&&!J.done&&(N=Q.return)&&N.call(Q)}finally{if(M)throw M.error}}var qe=zs(),Tt=qe.bodies,lt=qe.walls,Nt=qe.zones;Qh({bodies:Tt,walls:lt,zones:Nt,dt:u,onEvent:function(Jt,Kt,Mt){var Qe={kind:Jt,componentId:Kt.sourceId};Mt&&(Qe.otherId=Mt.sourceId),St(Qe)}});try{for(var Vt=Ue(Tt),ct=Vt.next();!ct.done;ct=Vt.next()){var Ae=ct.value;Ae.captured&&(Ae.captureElapsed=((X=Ae.captureElapsed)!==null&&X!==void 0?X:0)+u)}}catch(Jt){R={error:Jt}}finally{try{ct&&!ct.done&&(P=Vt.return)&&P.call(Vt)}finally{if(R)throw R.error}}}}function Do(u){var M,N,R;if(!tt)return null;var P=Xe(u);if(!P||P.contract!=="native.mesh3d.v1")return null;var F=Os(P);if(!F)return null;var D=tt.getStage(F);if(!D||!D.lastWidth||!D.lastHeight)return null;var Z=Ke.get(P.id),H=wt(P),j=D.project({x:Z?Z.x:(M=H.x)!==null&&M!==void 0?M:0,y:Z?Z.y:(N=H.y)!==null&&N!==void 0?N:0,z:Z?Z.z:(R=H.z)!==null&&R!==void 0?R:0},D.lastWidth,D.lastHeight);return En(Bn(F),j.x,j.y)}function Bf(){if(!Be||!tt)return{vx:0,vz:0,power:0,pull:0};var u=w.get(Be.stageId),M=tt.getStage(u),N=Ke.get(Be.targetId),R=Be.behavior.parameters;if(!M||!N||!M.lastWidth||!M.lastHeight)return{vx:0,vz:0,power:0,pull:0};var P=qr(Bn(u)),F=En(P,Be.start.x,Be.start.y),D=En(P,Be.current.x,Be.current.y),Z=Math.hypot(Be.current.x-Be.start.x,Be.current.y-Be.start.y),H=M.unproject(F.x,F.y,M.lastWidth,M.lastHeight,N.y),j=M.unproject(D.x,D.y,M.lastWidth,M.lastHeight,N.y);if(!H||!j)return{vx:0,vz:0,power:0,pull:Z};var X=(H.x-j.x)*R.dragScale,Q=(H.z-j.z)*R.dragScale,J=Math.hypot(X,Q);return J>R.maxSpeed&&(X*=R.maxSpeed/J,Q*=R.maxSpeed/J),{vx:X,vz:Q,power:Math.min(1,Math.hypot(X,Q)/Math.max(.001,R.maxSpeed)),pull:Z}}function zf(u){if(!(!Be||!tt)){Be.current=u;var M=Bf(),N=Be.behavior.parameters;Be.power=M.power,N.powerVariableId&&(O[N.powerVariableId]=M.power);var R=w.get(Be.stageId),P=tt.getStage(R),F=Ke.get(Be.targetId);if(P&&F&&N.showTrajectory&&M.pull>=N.minPullPx){var D=zs(),Z=D.walls,H=D.zones;P.setGuide(Dp({body:F,walls:Z,zones:H,vx:M.vx,vz:M.vz,dots:N.trajectoryDots}))}else P?.setGuide([])}}function $0(){return{bodies:Ze([],Ne(Ke.values()),!1).map(function(u){return{id:u.id,sourceId:u.sourceId,x:u.x,y:u.y,z:u.z,vx:u.vx,vy:u.vy,vz:u.vz,atRest:!!u.atRest,captured:!!u.captured,airborne:!!u.airborne}}),aiming:Be?{componentId:Be.sourceId,pointerId:Be.pointerId,power:Be.power}:null,projected:Object.fromEntries(st)}}function Ih(){Yn(),ln.clear(),Rr.clear(),wn.clear(),Yt.reset(),Wi.clear(),or.clear(),ve=[],pe=[],Pr.clear(),Fa.clear(),k.clear(),b=[],oe=[],ue=void 0,Me=0,ke=!1,We=0,O=Object.fromEntries(n.variables.map(function(u){return[u.id,u.initial]})),_t(),qt=0,et.clear(),Lt.clear(),gn.clear(),Oi.clear(),Ke.clear(),dt.clear(),st.clear(),tt?.reset(),oi.clear(),hi.clear(),Dt=void 0,ne=[],ae=[],xe=[],Pe.clear(),ps(),yt.clear(),fe.clear(),Ie.clear(),be=[],De=0,re=0,le=0,ut=!1,Re=0,W=n.base.startScene,en=void 0,Bt=void 0,fn=void 0,ee=void 0,h||(Jl(),$l(),Fs(),zs(),Va(0,!1),Ph(),ms(0),St({kind:"sceneEnter",sceneId:W}))}function Ch(){var u,M;if(!(!pt||pt.state!=="running"||!je.size)){var N=Ze([],Ne(je.values()),!1);je.clear();try{for(var R=Ue(N),P=R.next();!P.done;P=R.next()){var F=P.value;Gf(F)}}catch(D){u={error:D}}finally{try{P&&!P.done&&(M=R.return)&&M.call(R)}finally{if(u)throw u.error}}}}function Uo(u){if(u===void 0&&(u=!1),!pt)return Promise.resolve(void 0);if(pt.state==="running")return Promise.resolve().then(Ch),Promise.resolve(pt);if(!bt||u){var M=pt,N=Promise.resolve().then(function(){return M.resume()}).then(function(){if(M.state==="running")return Ch(),M}).catch(function(){}).finally(function(){bt===N&&(bt=void 0)});bt=N}return bt}function kf(){var u,M,N=Ze([],Ne(ot.values()),!1),R=N.some(function(X){return X.bus==="voice"}),P=N.some(function(X){return X.bus==="stinger"}),F=P?.2:R?.25:1;try{for(var D=Ue(N),Z=D.next();!Z.done;Z=D.next()){var H=Z.value;if(H.bus==="music"){var j=H.volume*F;H.gain.gain.setTargetAtTime&&H.gain.gain.setTargetAtTime(j,pt.currentTime,.04)}}}catch(X){u={error:X}}finally{try{Z&&!Z.done&&(M=D.return)&&M.call(D)}finally{if(u)throw u.error}}}function Vf(u,M,N){var R,P=(R=N.parameters.bus)!==null&&R!==void 0?R:"sfx";u.connect(M),M.connect(pt.destination),ie.add(u),ot.set(u,{gain:M,bus:P,volume:N.parameters.volume}),u.onended=function(){ie.delete(u),ot.delete(u),N.parameters.loop&&Ce.delete(N.id),kf()},kf()}function Gf(u){return ZS(this,void 0,void 0,function(){var M,N,R,P,F,D,Z,H,j,X,Q,J,$,te,q,ce,de,me,_e,ye,Ae,Ee,Le,He,rt,qe,Tt,lt,Nt,Vt;return JS(this,function(ct){switch(ct.label){case 0:return ie.size>=32?[2]:pt?(M=pt,N=Wt,R=(He=u.parameters.cooldownMs)!==null&&He!==void 0?He:45,P=M.currentTime,R>0&&P-((rt=Oe.get(u.id))!==null&&rt!==void 0?rt:-1/0)<R/1e3?[2]:u.parameters.loop&&Ce.has(u.id)?[2]:(F=w.get(u.componentId),D=_.get((qe=F?.assetSlots[0])===null||qe===void 0?void 0:qe.assetId),Z=D?.mime==="audio/wav"||D?.mime==="audio/mpeg",!Z&&u.parameters.allowSynthFallback===!1?(qt++,[2]):(Oe.set(u.id,P),H=M.state!=="running",H?[4,Uo()]:[3,2]))):(u.parameters.loop&&je.set(u.id,u),[2]);case 1:H=!ct.sent(),ct.label=2;case 2:if(H)return u.parameters.loop&&je.set(u.id,u),[2];if(pt!==M||M.state!=="running"||N!==Wt||ie.size>=32)return[2];if(j=(Tt=ht.get(u.id))!==null&&Tt!==void 0?Tt:0,X=[0,-.5,.5,-1,1],Q=((lt=u.parameters.pitchJitter)!==null&&lt!==void 0?lt:0)*X[j%X.length],J=Number((Nt=O[u.parameters.pitchVariableId])!==null&&Nt!==void 0?Nt:0),$=Math.max(-12,Math.min(12,Q+J*((Vt=u.parameters.pitchStep)!==null&&Vt!==void 0?Vt:0))),te=Math.pow(2,$/12),ht.set(u.id,j+1),!Z)return[3,8];u.parameters.loop&&Ce.add(u.id),ct.label=3;case 3:if(ct.trys.push([3,6,,7]),q=nt.get(D.hash),q)return[3,5];for(ce=atob(D.data),de=new Uint8Array(ce.length),me=0;me<ce.length;me++)de[me]=ce.charCodeAt(me);return[4,new Promise(function(Jt,Kt){var Mt=M.decodeAudioData(de.buffer,Jt,Kt);Mt&&typeof Mt.then=="function"&&Mt.then(Jt,Kt)})];case 4:q=ct.sent(),nt.set(D.hash,q),ct.label=5;case 5:return pt!==M||M.state!=="running"||N!==Wt||ie.size>=32?(u.parameters.loop&&N===Wt&&Ce.delete(u.id),[2]):(_e=M.createBufferSource(),ye=M.createGain(),_e.buffer=q,_e.loop=u.parameters.loop,_e.playbackRate&&(_e.playbackRate.value=te),ye.gain.value=u.parameters.volume,Vf(_e,ye,u),_e.start(),[3,7]);case 6:return Ae=ct.sent(),Ce.delete(u.id),Nn("Audio decode failed"),[3,7];case 7:return[2];case 8:return Ee=M.createOscillator(),Le=M.createGain(),Ee.frequency.value=u.parameters.frequency*te,Ee.type="sine",Le.gain.setValueAtTime(u.parameters.volume,M.currentTime),Le.gain.exponentialRampToValueAtTime(.001,M.currentTime+u.parameters.seconds),Vf(Ee,Le,u),Ee.start(),Ee.stop(M.currentTime+u.parameters.seconds),[2]}})})}function K0(u,M){for(var N=Ze([],Ne(Ye.values()),!1).filter(function(X){return X.boardId===u}),R=function(X,Q){var J;return(J=N.find(function($){return $.row===X&&$.column===Q}))===null||J===void 0?void 0:J.group},P=function(X){for(var Q=function(te){var q=R(X,te);if(q&&q===R(X,te+1)&&q===R(X,te+2)&&M.some(function(ce){return ce.row===X&&ce.column>=te&&ce.column<=te+2}))return{value:!0}},J=0;J<14;J++){var $=Q(J);if(typeof $=="object")return $}},F=0;F<16;F++){var D=P(F);if(typeof D=="object")return D.value}for(var Z=function(X){for(var Q=function(te){var q=R(te,X);if(q&&q===R(te+1,X)&&q===R(te+2,X)&&M.some(function(ce){return ce.column===X&&ce.row>=te&&ce.row<=te+2}))return{value:!0}},J=0;J<14;J++){var $=Q(J);if(typeof $=="object")return $}},H=0;H<16;H++){var j=Z(H);if(typeof j=="object")return j.value}return!1}function Q0(u){var M,N,R,P=Ye.get(u.id);if(!(!P||P.sceneId!==W||!wt(u).enabled||!fi(u))){var F=at.get(u.parentId);if(F){kt=F.select(u.id);return}if(kt===u.id){kt=void 0;return}var D=Ye.get(kt);if(!D||D.sceneId!==W||D.boardId!==P.boardId){kt=u.id;return}var Z=w.get(kt);if(Math.abs(D.row-P.row)+Math.abs(D.column-P.column)!==1){kt=u.id;return}if(D.group===P.group){kt=void 0,St({kind:"invalidMatch",componentId:(M=u.parentId)!==null&&M!==void 0?M:u.id});return}var H=D.row,j=D.column,X=P.row,Q=P.column,J=Ze([],Ne(rn(Z)),!1),$=Ze([],Ne(rn(u)),!1);if(D.row=X,D.column=Q,P.row=H,P.column=j,K0(P.boardId,[D,P])){var te=function(q,ce){var de,me=(de=Pe.get(q.id))!==null&&de!==void 0?de:{transform:Ze([],Ne(rn(q)),!1),parameters:{}};me.transform=Ze([],Ne(me.transform),!1),me.transform[4]=ce[4],me.transform[5]=ce[5],Pe.set(q.id,me)};te(Z,$),te(u,J),kt=void 0,St({kind:"validMatch",componentId:(N=u.parentId)!==null&&N!==void 0?N:u.id})}else D.row=H,D.column=j,P.row=X,P.column=Q,kt=void 0,St({kind:"invalidMatch",componentId:(R=u.parentId)!==null&&R!==void 0?R:u.id})}}function Rh(u){var M,N,R,P,F=[],D=Yi(u,Bn(u)),Z=gi(u),H=Gt("drag",(R=u.prototypeId)!==null&&R!==void 0?R:u.id),j=function($){var te,q,ce=w.get($.componentId),de=$.parameters;if(ce.sceneId!==W)return"continue";var me=function(Ee){if(Ee.id===u.id||yr(Ee,u.id)||!fi(Ee))return"continue";var Le=Yi(Ee,Bn(Ee)),He=gi(Ee),rt=Math.hypot(He.x-Z.x,He.y-Z.y),qe=de.radiusPx>0?rt<=de.radiusPx:D.left<Le.right&&D.right>Le.left&&D.top<Le.bottom&&D.bottom>Le.top;if(!qe)return"continue";F.push(xt({id:Ee.id,c:Ee,sourceId:ce.id,paintOrder:Xt.findIndex(function(Tt){return Tt.c.id===Ee.id}),distance:rt,itemTarget:n.gameplay.some(function(Tt){return Tt.kind==="drag"&&Tt.componentId===ce.id})},de))};try{for(var _e=(te=void 0,Ue(di(ce))),ye=_e.next();!ye.done;ye=_e.next()){var Ae=ye.value;me(Ae)}}catch(Ee){te={error:Ee}}finally{try{ye&&!ye.done&&(q=_e.return)&&q.call(_e)}finally{if(te)throw te.error}}};try{for(var X=Ue(n.gameplay.filter(function($){return $.kind==="drop-zone"})),Q=X.next();!Q.done;Q=X.next()){var J=Q.value;j(J)}}catch($){M={error:$}}finally{try{Q&&!Q.done&&(N=X.return)&&N.call(X)}finally{if(M)throw M.error}}return{zones:F,tag:(P=H?.parameters.tag)!==null&&P!==void 0?P:""}}function Ph(u){var M,N,R=u?[u]:n.gameplay.filter(function(Q){return Q.kind==="drag"}).flatMap(function(Q){return di(w.get(Q.componentId))});try{for(var P=Ue(R),F=P.next();!F.done;F=P.next()){var D=F.value;if(!(!D||!fi(D)||ln.zoneOf(D.id))){var Z=Rh(D),H=Z.zones,j=Z.tag,X=hc({itemId:D.id,tag:j,zones:H.filter(function(Q){return!Q.itemTarget}),occupancy:ln});X?.kind==="accept"&&ln.place(D.id,X.zone.id)}}}catch(Q){M={error:Q}}finally{try{F&&!F.done&&(N=P.return)&&N.call(P)}finally{if(M)throw M.error}}}function vs(u,M,N){N===void 0&&(N=.18),u&&qn.to(u.id,gi(u),M,N)}function Lh(u,M,N,R){var P,F,D=R??N?.c;St(xt(xt({},Gn(u,M,D,xt({},N?{otherId:N.sourceId}:{}))),{instanceId:(P=M.instanceId)!==null&&P!==void 0?P:(F=N?.c)===null||F===void 0?void 0:F.instanceId}))}function j0(u){var M,N,R,P,F,D,Z;if(!Ve||Ve.pointerId!==u.pointerId)return!1;var H=Ve,j=Xe(H.targetId),X=H.b.parameters;Ve=void 0,C=void 0;try{!((M=e.hasPointerCapture)===null||M===void 0)&&M.call(e,u.pointerId)&&((N=e.releasePointerCapture)===null||N===void 0||N.call(e,u.pointerId))}catch{}if(!j)return!0;var Q=Rh(j),J=Q.zones,$=Q.tag,te=hc({itemId:j.id,tag:$,zones:J,occupancy:ln}),q=H.origin,ce=H.originZone;if(!te)return Lh("dragReject",j,void 0,void 0),X.snapBack&&(ce&&ln.place(j.id,ce),vs(j,q,(R=X.snapBackSeconds)!==null&&R!==void 0?R:.18)),!0;var de=te.zone,me=te.occupantId?Xe(te.occupantId):void 0;return te.kind==="reject"?(Lh("dragReject",j,de,me),X.snapBack&&(ce&&ln.place(j.id,ce),vs(j,q,(P=X.snapBackSeconds)!==null&&P!==void 0?P:.18)),!0):(te.kind==="accept"?(ln.place(j.id,de.id),de.snapMode==="center"&&vs(j,gi(de.c),(F=X.snapBackSeconds)!==null&&F!==void 0?F:.18)):te.kind==="swap"&&me&&(ln.place(j.id,de.id),ce?ln.place(me.id,ce):ln.release(me.id),vs(j,gi(de.c),(D=X.snapBackSeconds)!==null&&D!==void 0?D:.18),vs(me,q,(Z=X.snapBackSeconds)!==null&&Z!==void 0?Z:.18)),Lh("dragDrop",j,de,te.kind==="accept"?de.c:me),!0)}function ev(u){var M,N,R,P,F;qn.tick(u,function(te,q){var ce=Xe(te);ce&&ir(ce,q.x,q.y)});try{for(var D=Ue(Ze([],Ne(ln.itemZone.keys()),!1)),Z=D.next();!Z.done;Z=D.next()){var H=Z.value,j=Xe(H);(!j||!fi(j))&&ln.release(H)}}catch(te){M={error:te}}finally{try{Z&&!Z.done&&(N=D.return)&&N.call(D)}finally{if(M)throw M.error}}if(Cn)try{for(var X=Ue(Cn.holds),Q=X.next();!Q.done;Q=X.next()){var J=Q.value,$=J.charge.tick(u);$!==O[J.behavior.parameters.variableId]&&(O[J.behavior.parameters.variableId]=$,St({kind:"variableChange",variableId:J.behavior.parameters.variableId,instanceId:J.c.instanceId,selfInstanceId:(F=J.c.instanceId)!==null&&F!==void 0?F:J.c.id}))}}catch(te){R={error:te}}finally{try{Q&&!Q.done&&(P=X.return)&&P.call(X)}finally{if(R)throw R.error}}}function Hf(u,M){var N,R,P,F,D=M.targetMode;if(D==="pointer")return xt({},se);if(D==="component"){var Z=Xe(M.targetComponentId);return Z?gi(Z):void 0}if(D==="nearest-team"){var H=gi(u),j=[],X=M.team,Q=(P=M.maxRangePx)!==null&&P!==void 0?P:0;try{for(var J=Ue(Yt.states),$=J.next();!$.done;$=J.next()){var te=Ne($.value,2),q=te[0],ce=te[1],Z=Xe(q);Z&&fi(Z)&&j.push(xt(xt({id:q},gi(Z)),{team:ce.team}))}}catch(de){N={error:de}}finally{try{$&&!$.done&&(R=J.return)&&R.call(J)}finally{if(N)throw N.error}}return vp(H,j,X,Q,(F=u.instanceId)!==null&&F!==void 0?F:u.id)}}function tv(u){var M,N,R,P,F;try{for(var D=Ue(n.gameplay.filter(function(Ae){return Ae.kind==="steer"})),Z=D.next();!Z.done;Z=D.next()){var H=Z.value,j=w.get(H.componentId),X=H.parameters;if(j.sceneId===W)try{for(var Q=(R=void 0,Ue(di(j))),J=Q.next();!J.done;J=Q.next()){var $=J.value;if(fi($)){var te=Hf($,X);if(te){var q=gi($),ce=te.x-q.x,de=te.y-q.y;if(!(X.maxRangePx>0&&Math.hypot(ce,de)>X.maxRangePx)){var me=Math.atan2(de,ce);X.mode==="flee"?me+=Math.PI:X.mode==="orbit"&&(me+=Math.PI/2);var _e=(F=Yt.headings.get($.id))!==null&&F!==void 0?F:me,ye=gp(_e,me,X.turnRateDegPerSec*Math.PI/180*u);Yt.headings.set($.id,ye),ir($,q.x+Math.cos(ye)*X.speed*u,q.y+Math.sin(ye)*X.speed*u),X.orientToVelocity!==!1&&Ba($,ye)}}}}}catch(Ae){R={error:Ae}}finally{try{J&&!J.done&&(P=Q.return)&&P.call(Q)}finally{if(R)throw R.error}}}}catch(Ae){M={error:Ae}}finally{try{Z&&!Z.done&&(N=D.return)&&N.call(D)}finally{if(M)throw M.error}}}function Nh(u,M,N,R){var P;if(ne.length>=128){Nn("Instance budget exhausted");return}var F=w.get(u),D=function(X){return 1+n.components.filter(function(Q){return Q.parentId===X}).reduce(function(Q,J){return Q+D(J.id)},0)};if(et.size+D(F.id)>4096){Nn("Runtime node budget exhausted");return}var Z="instance."+ ++le;function H(X,Q){var J,$,te=X.id===F.id?Z:Z+":"+X.id,q=xt(xt({},X),{id:te,runtimeId:te,instanceId:Z,prototypeId:X.id,prototype:!1,parentId:Q,transform:Ze([],Ne(X.transform),!1),spawnTime:De});et.set(te,q);try{for(var ce=Ue(n.components.filter(function(_e){return _e.parentId===X.id})),de=ce.next();!de.done;de=ce.next()){var me=de.value;H(me,te)}}catch(_e){J={error:_e}}finally{try{de&&!de.done&&($=ce.return)&&$.call(ce)}finally{if(J)throw J.error}}return q}var j=H(F,void 0);return j.transform[4]=M,j.transform[5]=N,R&&(j.pathStartNode=R.startNode,j.pathTargetNode=R.targetNode,j.parentId=(P=n.gameplay.find(function(X){return X.id===R.networkBehaviorId}))===null||P===void 0?void 0:P.componentId),ne.push(j),fs(j),Ph(j),R&&Va(0,!1),j}function nv(u,M,N){var R,P,F,D,Z,H,j,X,Q,J,$,te,q,ce,de,me,_e,ye,Ae,Ee,Le,He,rt,qe,Tt,lt,Nt,Vt,ct,Jt;if(++Ot>1024){Nn("Action budget exhausted");return}if(u.kind==="add"||u.kind==="set"){var Kt=O[u.variableId],Mt=u.kind==="add"?Kt+u.value:u.value;if(typeof Mt=="number"&&(!Number.isFinite(Mt)||Math.abs(Mt)>1e12)){Nn("Variable range exceeded");return}O[u.variableId]=Mt,Kt!==Mt&&St({kind:"variableChange",variableId:u.variableId,instanceId:M.instanceId})}else if(u.kind==="setComponent"||u.kind==="setAsset"){var Qe=Xe(u.componentId);if(!Qe)return;var zt=(Q=Pe.get(Qe.id))!==null&&Q!==void 0?Q:{transform:Ze([],Ne(Qe.transform),!1),parameters:{}};u.kind==="setComponent"?zt.parameters[u.key]=u.valueVariableId?O[u.valueVariableId]:u.value:zt.assetId=u.assetId,Pe.set(Qe.id,zt),u.kind==="setComponent"&&u.key==="visible"&&u.value===!1&&(ln.release(Qe.id),qn.cancel(Qe.id))}else if(u.kind==="resetMatch")ps(u.componentId),$l(u.componentId);else if(u.kind==="clearStrokes")(J=or.get(u.componentId))===null||J===void 0||J.clear(),ve=ve.filter(function(cn){return cn.owner!==u.componentId});else if(u.kind==="resetMask"){var Qe=Xe(u.componentId),Pt=Gt("erase-mask",u.componentId);Qe&&Pt&&za(Qe,Pt).reset()}else if(u.kind==="copyMatchAsset"){var it=($=at.get(u.boardId))===null||$===void 0?void 0:$.snapshot().lastMatch,Ct=w.get(u.componentId),jt=it&&((q=(te=ti.get(u.boardId))===null||te===void 0?void 0:te.get(it.group))===null||q===void 0?void 0:q.children.find(function(cn){return cn.contract==="native.image.v1"}));if(it&&jt){var pn=w.get(it.from),Ht=En(Bn(pn),pn.parameters.width/2,pn.parameters.height/2),An=Ct.parentId?Bn(w.get(Ct.parentId)):ra(),Ti=En(qr(An),Ht.x,Ht.y),bn=(ce=Pe.get(Ct.id))!==null&&ce!==void 0?ce:{transform:Ze([],Ne(Ct.transform),!1),parameters:{}};bn.transform=Ze([],Ne(bn.transform),!1),bn.transform[4]=Ti.x-Ct.parameters.width/2,bn.transform[5]=Ti.y-Ct.parameters.height/2,bn.assetId=(de=jt.assetSlots[0])===null||de===void 0?void 0:de.assetId,Pe.set(Ct.id,bn)}}else if(u.kind==="hintMatch")kt=void 0,(me=at.get(u.componentId))===null||me===void 0||me.showHint();else if(u.kind==="spawn")Nh(u.prototypeId,u.x,u.y);else if(u.kind==="spawnAt"){var sn=(u.at==="self"||u.at==="midpoint")&&(M.selfInstanceId!==void 0||M.instanceId!==void 0)?Xe((_e=M.selfInstanceId)!==null&&_e!==void 0?_e:M.instanceId):Lr(u.targetComponentId,M,"self"),Ri=(u.at==="other"||u.at==="midpoint")&&M.otherInstanceId!==void 0?Xe(M.otherInstanceId):void 0,Ct=u.at==="other"?Ri:sn;if(u.at==="pointer"||(u.at==="midpoint"?sn&&Ri:Ct))for(var Qn=sn?gi(sn):void 0,Pi=Ri?gi(Ri):void 0,Ht=u.at==="pointer"?se:u.at==="midpoint"?{x:(Qn.x+Pi.x)/2,y:(Qn.y+Pi.y)/2}:gi(Ct),Ei=w.get(u.prototypeId),pi=Math.max(0,Math.min(16,Math.floor(u.countVariableId?Number(O[u.countVariableId]):(ye=u.count)!==null&&ye!==void 0?ye:1))),mi=0;mi<pi;mi++){var yi=u.jitterX?(Yt.rng.next()*2-1)*u.jitterX:0,jn=u.jitterY?(Yt.rng.next()*2-1)*u.jitterY:0;Nh(u.prototypeId,Ht.x+u.offsetX+yi-Ei.parameters.width/2,Ht.y+u.offsetY+jn-Ei.parameters.height/2)}}else if(u.kind==="random"){var Kt=O[u.variableId],Mt=Yt.rng.between(u.min,u.max,u.integer===!0);O[u.variableId]=Mt,Kt!==Mt&&St({kind:"variableChange",variableId:u.variableId,instanceId:M.instanceId})}else if(u.kind==="modifyInstanceState"){var Qe=u.target==="component"?Xe(u.componentId):Lr(u.componentId,M,u.target);Qe&&Ds(Qe,u.field,u.op,u.variableId?O[u.variableId]:u.value)}else if(u.kind==="launchToward"){var pn=w.get(u.componentId),Si=di(pn),Hn=(Ae=M.selfInstanceId)!==null&&Ae!==void 0?Ae:M.instanceId,Qe=pn.prototype?(Ee=Si.find(function(Li){return Li.instanceId===Hn||Li.id===Hn}))!==null&&Ee!==void 0?Ee:Si[Si.length-1]:(Le=Lr(u.componentId,M,"self"))!==null&&Le!==void 0?Le:Xe(u.componentId),Pt=Gt("physics-body",u.componentId),yn=Qe&&Kn(Qe,Pt);if(!yn)return;var xr=void 0;if(u.targetMode==="angle-variable")xr=Number(O[u.angleVariableId])*Math.PI/180;else{var Ct=Hf(Qe,u);if(!Ct)return;var Ht=gi(Qe);xr=Math.atan2(Ct.y-Ht.y,Ct.x-Ht.x)}var Nr=Number(u.speedVariableId?O[u.speedVariableId]:u.speed);if(!Number.isFinite(Nr)){Nn("Launch speed invalid");return}yn.vx=Math.cos(xr)*Nr,yn.vy=Math.sin(xr)*Nr,yn.atRest=!1,yn.restElapsed=0,yn.captured=!1,yn.exited=!1,u.orientToVelocity!==!1&&Ba(Qe,xr),St(Gn("launch",Qe))}else if(u.kind==="moveToComponent"){var Rn=w.get(u.targetComponentId),Qe=Lr(u.componentId,M,(He=u.target)!==null&&He!==void 0?He:"self"),Ct=Rn&&mt(Rn)?(rt=Lr(u.targetComponentId,M,u.target==="other"?"self":"other"))!==null&&rt!==void 0?rt:di(Rn)[0]:Xe(u.targetComponentId);Qe&&Ct&&vs(Qe,gi(Ct),u.seconds)}else if(u.kind==="returnToOrigin"){var Qe=Lr(u.componentId,M,"self"),Wn=Qe&&Rr.get(Qe.id);Qe&&Wn&&vs(Qe,Wn,u.seconds)}else if(u.kind==="spawnOnPath")Nh(u.prototypeId,0,0,{startNode:u.startNode,targetNode:u.targetNode,networkBehaviorId:u.networkBehaviorId});else if(["setVelocity","applyImpulse","stopBody"].includes(u.kind)){var Rt=w.get(u.componentId),vi=M.instanceId?Ze([],Ne(et.values()),!1).filter(function(zn){return zn.instanceId===M.instanceId&&zn.prototypeId===Rt.id}):di(Rt),Pt=Gt("physics-body",Rt.id);try{for(var Vr=Ue(vi),Dr=Vr.next();!Dr.done;Dr=Vr.next()){var Qe=Dr.value,yn=Kn(Qe,Pt);u.kind==="setVelocity"?(yn.vx=u.vxVariableId?O[u.vxVariableId]:u.vx,yn.vy=u.vyVariableId?O[u.vyVariableId]:u.vy):u.kind==="applyImpulse"?(yn.vx+=u.vxVariableId?O[u.vxVariableId]:u.ix,yn.vy+=u.vyVariableId?O[u.vyVariableId]:u.iy):(yn.vx=0,yn.vy=0,yn.atRest=!0),yn.captured=!1,yn.exited=!1,yn.restElapsed=0,u.kind!=="stopBody"&&(yn.atRest=!1)}}catch(zn){R={error:zn}}finally{try{Dr&&!Dr.done&&(P=Vr.return)&&P.call(Vr)}finally{if(R)throw R.error}}}else if(u.kind==="setPosition"){var _a=w.get(u.componentId),vi=M.instanceId?Ze([],Ne(et.values()),!1).filter(function(xi){return xi.instanceId===M.instanceId&&xi.prototypeId===_a.id}):di(_a),Pt=Gt("physics-body",_a.id);try{for(var _r=Ue(vi),Ur=_r.next();!Ur.done;Ur=_r.next()){var Qe=Ur.value,yn=Kn(Qe,Pt);yn.x=u.xVariableId?O[u.xVariableId]:u.x,yn.y=u.yVariableId?O[u.yVariableId]:u.y,yn.vx=0,yn.vy=0,yn.captured=!1,yn.exited=!1,yn.atRest=!0,ir(Qe,yn.x,yn.y)}}catch(xi){F={error:xi}}finally{try{Ur&&!Ur.done&&(D=_r.return)&&D.call(_r)}finally{if(F)throw F.error}}}else if(u.kind==="setPathEdge")(qe=Ci.get(u.behaviorId))===null||qe===void 0||qe.setEdge(u.edgeId,u.enabled,u.cost);else if(u.kind==="setPathGate")(lt=Ci.get((Tt=n.gameplay.find(function(cn){return cn.id===u.behaviorId}))===null||Tt===void 0?void 0:Tt.parameters.networkBehaviorId))===null||lt===void 0||lt.setGate(u.behaviorId,u.mode,u.holdSeconds);else if(u.kind==="setPathTarget"){var Gr=w.get(u.componentId),Pt=Gt("path-agent",Gr.id),Ha=Ci.get(Pt.parameters.networkBehaviorId);try{for(var Mr=Ue(M.instanceId?Ze([],Ne(et.values()),!1).filter(function(zn){return zn.instanceId===M.instanceId&&zn.prototypeId===Gr.id}):di(Gr)),rr=Mr.next();!rr.done;rr=Mr.next()){var Qe=rr.value;Qe.pathTargetNode=u.targetNode,Ha?.setTarget(Qe.id,u.targetNode)}}catch(zn){Z={error:zn}}finally{try{rr&&!rr.done&&(H=Mr.return)&&H.call(Mr)}finally{if(Z)throw Z.error}}}else if(u.kind==="compute"){var bi=Number(O[u.variableId]),ci=u.operandVariableId!==void 0?Number(O[u.operandVariableId]):u.value;if(["div","mod"].includes(u.op)&&ci===0){Nn("Division by zero");return}var Mt={add:function(){return bi+ci},sub:function(){return bi-ci},mul:function(){return bi*ci},div:function(){return ci===0?bi:bi/ci},mod:function(){return ci===0?bi:bi%ci},min:function(){return Math.min(bi,ci)},max:function(){return Math.max(bi,ci)},set:function(){return ci},floor:function(){return Math.floor(bi)},ceil:function(){return Math.ceil(bi)},abs:function(){return Math.abs(bi)},clamp:function(){return Math.max(u.min,Math.min(u.max,bi))}}[u.op]();if(u.round&&(Mt=Math.round(Mt)),!Number.isFinite(Mt)||Math.abs(Mt)>1e12){Nn("Variable range exceeded");return}var Kt=O[u.variableId];O[u.variableId]=Mt,Kt!==Mt&&St({kind:"variableChange",variableId:u.variableId,instanceId:M.instanceId})}else if(u.kind==="despawn"){var sn=(Nt=M.selfInstanceId)!==null&&Nt!==void 0?Nt:M.instanceId;u.target==="other"?li(M.otherInstanceId):u.target==="both"?(li(sn),li(M.otherInstanceId)):li(sn)}else if(u.kind==="changeScene")ee=u.sceneId;else if(u.kind==="restart")ee="__restart";else if(u.kind==="cameraShake")x?.matches||(ue={intensity:u.intensity,seconds:u.seconds,elapsed:0});else if(u.kind==="screenFlash")oe.push({color:u.color,opacity:u.opacity,seconds:u.seconds,elapsed:0}),oe.length>8&&oe.shift();else if(u.kind==="floatingText"){var Ma=w.get(u.componentId),pn=M.instanceId?(Vt=Ze([],Ne(et.values()),!1).find(function(xi){return xi.instanceId===M.instanceId&&xi.prototypeId===u.componentId}))!==null&&Vt!==void 0?Vt:Ma:(ct=Xe(u.componentId))!==null&&ct!==void 0?ct:Ma,Ct=pn?.sceneId===W?pn:Ma;if(Ct){var Ht=void 0;if(Ct.contract==="native.mesh3d.v1"&&(Ht=Do(Ct.id)),!Ht){var cr=wt(Ct);Ht=En(Bn(Ct),cr.width/2,cr.height/2)}b.push({x:Ht.x,y:Ht.y,text:u.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(Li,Xn){var _i;return String((_i=O[Xn])!==null&&_i!==void 0?_i:"")}),color:u.color,fontSize:u.fontSize,risePx:u.risePx,seconds:u.seconds,elapsed:0}),b.length>32&&b.shift()}}else if(u.kind==="store")M.kind==="click"&&M.pointerId!==void 0&&!G&&(G={pointerId:M.pointerId,targetId:M.targetId,condition:N},(Jt=e.setPointerCapture)===null||Jt===void 0||Jt.call(e,M.pointerId));else if(u.behaviorId){var zi=n.gameplay.find(function(cn){return cn.id===u.behaviorId});if(u.kind==="playAudio")Gf(zi);else if(u.kind==="animate"){var Ji=w.get(zi.componentId),vi=mt(Ji)?Ze([],Ne(et.values()),!1).filter(function(zn){return zn.prototypeId===Ji.id&&(!M.instanceId||zn.instanceId===M.instanceId)}):[Ji],gs=function(zn){var xi=zi.id+":"+zn.id;xe=xe.filter(function(Xn){return Xn.id!==xi});var Li=xt({},zi.parameters);Li.fromCurrent&&(Li.from=Li.property==="opacity"?wt(zn).opacity:rn(zn)[Li.property==="x"?4:5]),xe.push(xt(xt({},zi),{parameters:Li,id:xi,behaviorId:zi.id,targetId:zn.id,elapsed:0,baseTransform:Ze([],Ne(zn.transform),!1)}))};try{for(var ni=Ue(vi),Zn=ni.next();!Zn.done;Zn=ni.next()){var Ct=Zn.value;gs(Ct)}}catch(zn){j={error:zn}}finally{try{Zn&&!Zn.done&&(X=ni.return)&&X.call(ni)}finally{if(j)throw j.error}}}else u.kind==="stopAnimation"?xe=xe.filter(function(cn){return cn.behaviorId!==zi.id}):u.kind==="emit"&&iv(zi,M)}}function iv(u,M){var N,R,P,F,D,Z,H=u.parameters,j=H.shape==="pixel-confetti",X=H.shape==="confetti",Q=j||X;if(!(Q&&x?.matches)){if(ae.length+H.count>256){Nn("Particle budget exhausted");return}if(j&&H.coverage==="screen"){ae.push.apply(ae,Ze([],Ne(z0(H)),!1));return}if(X&&H.coverage==="screen"){ae.push.apply(ae,Ze([],Ne(V0(H)),!1));return}for(var J=w.get(u.componentId),$=M.instanceId&&(N=Ze([],Ne(et.values()),!1).find(function(Ee){return Ee.instanceId===M.instanceId&&Ee.prototypeId===J.id}))!==null&&N!==void 0?N:J,te=rn($),q,ce=Xe($.parentId);ce;ce=Xe(ce.parentId)){if(Q&&ce.contract==="native.group.v1"&&wt(ce).clip){q=ce.id;break}te=Hs(rn(ce),te)}var de=wt($),me=H.origin==="anchor"?En(te,0,0):Q||H.origin==="center"?En(te,de.width/2,de.height/2):{x:te[4]+$.parameters.width/2,y:te[5]+$.parameters.height/2};if(j){ae.push.apply(ae,Ze([],Ne(Nf(H,me,q)),!1));return}if(X){ae.push.apply(ae,Ze([],Ne(Df(H,me,q)),!1));return}for(var _e=0;_e<H.count;_e++){var ye=((R=H.spread)!==null&&R!==void 0?R:360)===360?_e*2.399963:-Math.PI/2+((_e+.5)/H.count-.5)*((P=H.spread)!==null&&P!==void 0?P:360)*Math.PI/180,Ae=H.speed*(.5+_e%7/14);ae.push(xt(xt({},me),{vx:Math.cos(ye)*Ae,vy:Math.sin(ye)*Ae,life:(F=H.lifetime)!==null&&F!==void 0?F:.7,gravity:(D=H.gravity)!==null&&D!==void 0?D:250,color:H.color,shape:(Z=H.shape)!==null&&Z!==void 0?Z:"circle"}))}}}function xa(){for(var u=function(){var M,N,R,P,F,D,Z=be.shift();ft++;var H=function(ye){return ye===void 0||!!Xe(ye)||Ze([],Ne(et.values()),!1).some(function(Ae){return Ae.instanceId===ye})};if(!H(Z.selfInstanceId)||!H(Z.otherInstanceId)||["contactBegin","boundaryExit"].includes(Z.kind)&&Z.instanceId&&!et.has(Z.instanceId))return"continue";try{for(var j=(M=void 0,Ue(n.eventBindings)),X=j.next();!X.done;X=j.next()){var Q=X.value;if(Object.entries(I.get(Q.eventId)).every(function(ye){var Ae=Ne(ye,2),Ee=Ae[0],Le=Ae[1];return Ee==="id"||Z[Ee]===Le})&&ea(Q.condition,Z)){try{for(var J=(R=void 0,Ue(Q.actions)),$=J.next();!$.done;$=J.next()){var te=$.value;if(Ot>=1024||ut)break;nv(te,Z,Q.condition)}}catch(ye){R={error:ye}}finally{try{$&&!$.done&&(P=J.return)&&P.call(J)}finally{if(R)throw R.error}}if(ee)break}}}catch(ye){M={error:ye}}finally{try{X&&!X.done&&(N=j.return)&&N.call(j)}finally{if(M)throw M.error}}if(ee){var q=ee;if(ee=void 0,q==="__restart")Ih();else if(q!==W){var ce=W;_t(),W=q,ln.clear(),Rr.clear(),wn.clear(),Wi.clear(),or.clear(),ve=[],pe=[],Pr.clear(),Fa.clear(),kt=void 0,ne=[],ae=[],b=[],oe=[],ue=void 0,ke=!1,We=0,et.clear(),gn.clear(),Oi.clear(),Ke.clear(),dt.clear(),st.clear(),tt?.reset(),oi.clear(),hi.clear(),Dt=void 0,Fs(),be=be.filter(function(ye){return ye.kind==="variableChange"}),Pe.clear(),dn=void 0;try{for(var de=(F=void 0,Ue(at.values())),me=de.next();!me.done;me=de.next()){var _e=me.value;_e.reset()}}catch(ye){F={error:ye}}finally{try{me&&!me.done&&(D=de.return)&&D.call(de)}finally{if(F)throw F.error}}fe.clear(),Ie.clear(),yt.clear(),xe=[],Yn(),k.clear(),en=void 0,Bt=void 0,zs(),Va(0,!1),Ph(),ms(0),St({kind:"sceneExit",sceneId:ce}),St({kind:"sceneEnter",sceneId:W})}}};be.length&&!ut&&ft<256&&Ot<1024;)u();be.length&&Nn("Event/action budget exhausted")}function Bn(u){return Hs(u.parentId?Bn(Xe(u.parentId)):ra(),rn(u))}var En=function(u,M,N){return{x:u[0]*M+u[2]*N+u[4],y:u[1]*M+u[3]*N+u[5]}};function Yi(u,M){var N=wt(u),R=[[0,0],[N.width,0],[N.width,N.height],[0,N.height]].map(function(P){var F=Ne(P,2),D=F[0],Z=F[1];return En(M,D,Z)});return{left:Math.min.apply(Math,Ze([],Ne(R.map(function(P){return P.x})),!1)),right:Math.max.apply(Math,Ze([],Ne(R.map(function(P){return P.x})),!1)),top:Math.min.apply(Math,Ze([],Ne(R.map(function(P){return P.y})),!1)),bottom:Math.max.apply(Math,Ze([],Ne(R.map(function(P){return P.y})),!1))}}function fi(u){return wt(u).visible&&wt(u).opacity>0&&(!u.parentId||fi(Xe(u.parentId)))}function Wf(u,M){for(var N=wt(u),R=Bn(u),P=Math.min(N.width,N.height)/2,F=M==="circle"?Array.from({length:32},function(H,j){return En(R,N.width/2+Math.cos(j*Math.PI/16)*P,N.height/2+Math.sin(j*Math.PI/16)*P)}):[[0,0],[N.width,0],[N.width,N.height],[0,N.height]].map(function(H){var j=Ne(H,2),X=j[0],Q=j[1];return En(R,X,Q)}),D=u.parentId?Xe(u.parentId):void 0,Z=function(){var H=wt(D);if(D.contract==="native.group.v1"&&H.clip){for(var j=Bn(D),X=[[0,0],[H.width,0],[H.width,H.height],[0,H.height]].map(function(q){var ce=Ne(q,2),de=ce[0],me=ce[1];return En(j,de,me)}),Q=0,J=0;J<4;J++)Q+=X[J].x*X[(J+1)%4].y-X[(J+1)%4].x*X[J].y;for(var $=Q>=0?1:-1,te=function(q){var ce,de,me=X[q],_e=X[(q+1)%4],ye=function(Nt){return $*((_e.x-me.x)*(Nt.y-me.y)-(_e.y-me.y)*(Nt.x-me.x))},Ae=F;F=[];var Ee=Ae[Ae.length-1],Le=ye(Ee);try{for(var He=(ce=void 0,Ue(Ae)),rt=He.next();!rt.done;rt=He.next()){var qe=rt.value,Tt=ye(qe);if(Tt>=0!=Le>=0){var lt=Le/(Le-Tt);F.push({x:Ee.x+(qe.x-Ee.x)*lt,y:Ee.y+(qe.y-Ee.y)*lt})}Tt>=0&&F.push(qe),Ee=qe,Le=Tt}}catch(Nt){ce={error:Nt}}finally{try{rt&&!rt.done&&(de=He.return)&&de.call(He)}finally{if(ce)throw ce.error}}},J=0;J<4&&F.length;J++)te(J)}D=D.parentId?Xe(D.parentId):void 0};D;)Z();return F}function rv(u,M){var N,R,P,F,D,Z;if(u.length<3||M.length<3)return!1;try{for(var H=Ue([u,M]),j=H.next();!j.done;j=H.next())for(var X=j.value,Q=0;Q<X.length;Q++){var J=X[Q],$=X[(Q+1)%X.length],te=J.y-$.y,q=$.x-J.x,ce=1/0,de=-1/0,me=1/0,_e=-1/0;try{for(var ye=(P=void 0,Ue(u)),Ae=ye.next();!Ae.done;Ae=ye.next()){var Ee=Ae.value,Le=Ee.x*te+Ee.y*q;ce=Math.min(ce,Le),de=Math.max(de,Le)}}catch(qe){P={error:qe}}finally{try{Ae&&!Ae.done&&(F=ye.return)&&F.call(ye)}finally{if(P)throw P.error}}try{for(var He=(D=void 0,Ue(M)),rt=He.next();!rt.done;rt=He.next()){var Ee=rt.value,Le=Ee.x*te+Ee.y*q;me=Math.min(me,Le),_e=Math.max(_e,Le)}}catch(qe){D={error:qe}}finally{try{rt&&!rt.done&&(Z=He.return)&&Z.call(He)}finally{if(D)throw D.error}}if(de<me||_e<ce)return!1}}catch(qe){N={error:qe}}finally{try{j&&!j.done&&(R=H.return)&&R.call(H)}finally{if(N)throw N.error}}return!0}function av(u){var M,N,R,P,F,D,Z,H,j,X,Q,J,$,te,q,ce,de,me,_e,ye,Ae,Ee,Le,He,rt,qe,Tt,lt,Nt,Vt,ct,Jt,Kt=Y();De+=u,_v(u),ev(u),tv(u),Lo();try{for(var Mt=Ue(Ge),Qe=Mt.next();!Qe.done;Qe=Mt.next()){var zt=Ne(Qe.value,2),Pt=zt[0],it=zt[1];!it.held&&De-((Le=it.releasedAt)!==null&&Le!==void 0?Le:De)>=it.behavior.springBackSeconds&&Ge.delete(Pt)}}catch(Ut){M={error:Ut}}finally{try{Qe&&!Qe.done&&(N=Mt.return)&&N.call(Mt)}finally{if(M)throw M.error}}ue&&(ue.elapsed+=u,ue.elapsed>=ue.seconds&&(ue=void 0));try{for(var Ct=Ue(oe),jt=Ct.next();!jt.done;jt=Ct.next()){var pn=jt.value;pn.elapsed+=u}}catch(Ut){R={error:Ut}}finally{try{jt&&!jt.done&&(P=Ct.return)&&P.call(Ct)}finally{if(R)throw R.error}}oe=oe.filter(function(Ut){return Ut.elapsed<Ut.seconds});try{for(var Ht=Ue(b),An=Ht.next();!An.done;An=Ht.next()){var Ti=An.value;Ti.elapsed+=u}}catch(Ut){F={error:Ut}}finally{try{An&&!An.done&&(D=Ht.return)&&D.call(Ht)}finally{if(F)throw F.error}}b=b.filter(function(Ut){return Ut.elapsed<Ut.seconds});try{for(var bn=Ue(at),sn=bn.next();!sn.done;sn=bn.next()){var Ri=Ne(sn.value,2),Pt=Ri[0],Qn=Ri[1];w.get(Pt).sceneId===W&&fi(w.get(Pt))&&Qn.tick(u)}}catch(Ut){Z={error:Ut}}finally{try{sn&&!sn.done&&(H=bn.return)&&H.call(bn)}finally{if(Z)throw Z.error}}var Pi=function(Ut){var Pn,Ni,Un=w.get(Ut.componentId);if(Un.sceneId!==W)return"continue";var dr=mt(Un)?Ze([],Ne(et.values()),!1).filter(function(Bo){return Bo.prototypeId===Un.id}):[Un];try{for(var In=(Pn=void 0,Ue(dr)),Di=In.next();!Di.done;Di=In.next()){var ki=Di.value,Sa=Ut.id+":"+ki.id;if(Ut.kind==="motion"){var $i=(He=Pe.get(ki.id))!==null&&He!==void 0?He:{transform:Ze([],Ne(ki.transform),!1),parameters:{}},ta=(rt=$i.velocity)!==null&&rt!==void 0?rt:{x:Ut.parameters.vx,y:Ut.parameters.vy};ta.y+=Ut.parameters.gravity*u,$i.transform[4]+=ta.x*u,$i.transform[5]+=ta.y*u,$i.velocity=ta,Pe.set(ki.id,$i),ki.prototypeId&&(ki.transform=$i.transform);var Vs=Bn(ki);(Vs[5]>Kt.height||Vs[4]<-300||Vs[4]>Kt.width+300)&&($i.exited||($i.exited=!0,St({kind:"boundaryExit",componentId:Un.id,instanceId:ki.instanceId})))}else if(Ut.kind==="timer"){var qa=((qe=yt.get(Sa))!==null&&qe!==void 0?qe:0)+u;yt.set(Sa,qa),qa>=Ut.parameters.seconds&&qa-u<Ut.parameters.seconds&&(St({kind:"timer",behaviorId:Ut.id,componentId:Un.id}),Ut.parameters.repeat&&yt.set(Sa,qa-Ut.parameters.seconds))}}}catch(Bo){Pn={error:Bo}}finally{try{Di&&!Di.done&&(Ni=In.return)&&Ni.call(In)}finally{if(Pn)throw Pn.error}}};try{for(var Ei=Ue(n.gameplay),pi=Ei.next();!pi.done;pi=Ei.next()){var mi=pi.value;Pi(mi)}}catch(Ut){j={error:Ut}}finally{try{pi&&!pi.done&&(X=Ei.return)&&X.call(Ei)}finally{if(j)throw j.error}}ya(u),Ah(u),Va(u),ms(u);var yi=[],jn=function(Ut){var Pn,Ni,Un=w.get(Ut.componentId);if(Un.sceneId!==W)return"continue";try{for(var dr=(Pn=void 0,Ue(mt(Un)?Ze([],Ne(et.values()),!1).filter(function(ki){return ki.prototypeId===Un.id}):[Un])),In=dr.next();!In.done;In=dr.next()){var Di=In.value;if(fi(Di)){if(yi.length>=256){Nn("Collider budget exhausted");break}yi.push({b:Ut,c:Di,box:Yi(Di,Bn(Di)),polygon:Wf(Di,Ut.parameters.shape)})}}}catch(ki){Pn={error:ki}}finally{try{In&&!In.done&&(Ni=dr.return)&&Ni.call(dr)}finally{if(Pn)throw Pn.error}}};try{for(var Si=Ue(n.gameplay.filter(function(Ut){return Ut.kind==="collider"})),Hn=Si.next();!Hn.done;Hn=Si.next()){var mi=Hn.value;jn(mi)}}catch(Ut){Q={error:Ut}}finally{try{Hn&&!Hn.done&&(J=Si.return)&&J.call(Si)}finally{if(Q)throw Q.error}}var yn=new Set,xr=new Map,Nr=function(Ut,Pn,Ni){var Un,dr,In;((Un=Pn.c.prototypeId)!==null&&Un!==void 0?Un:Pn.c.id)===((dr=Ni.c.prototypeId)!==null&&dr!==void 0?dr:Ni.c.id)&&Pn.c.id>Ni.c.id||St(xt(xt({},Gn(Ut,Pn.c,Ni.c)),{instanceId:(In=Pn.c.instanceId)!==null&&In!==void 0?In:Ni.c.instanceId}))},Rn=0;e:for(var Wn=0;Wn<yi.length;Wn++)for(var mi=Wn+1;mi<yi.length;mi++){var Rt=yi[Wn],vi=yi[mi];if(!(Rt.c.instanceId&&Rt.c.instanceId===vi.c.instanceId)){var Vr=Rt.box,Dr=vi.box,_a=Vr.left<Dr.right&&Vr.right>Dr.left&&Vr.top<Dr.bottom&&Vr.bottom>Dr.top;if(_a){if(++Rn>4096){Nn("Collision budget exhausted");break e}_a=rv(Rt.polygon,vi.polygon)}if(_a){var _r=[Rt.c.id,vi.c.id].sort().join("|");if(yn.add(_r),xr.set(_r,[Rt,vi]),!fe.has(_r))try{for(var Ur=($=void 0,Ue([[Rt,vi],[vi,Rt]])),Gr=Ur.next();!Gr.done;Gr=Ur.next()){var Ha=Ne(Gr.value,2),Mr=Ha[0],rr=Ha[1];Nr("contactBegin",Mr,rr)}}catch(Pn){$={error:Pn}}finally{try{Gr&&!Gr.done&&(te=Ur.return)&&te.call(Ur)}finally{if($)throw $.error}}}}}try{for(var bi=Ue(Ie),ci=bi.next();!ci.done;ci=bi.next()){var Ma=Ne(ci.value,2),_r=Ma[0],cr=Ne(Ma[1],2),Rt=cr[0],vi=cr[1];if(!yn.has(_r))try{for(var zi=(de=void 0,Ue([[Rt,vi],[vi,Rt]])),Ji=zi.next();!Ji.done;Ji=zi.next()){var gs=Ne(Ji.value,2),Mr=gs[0],rr=gs[1];Nr("contactEnd",Mr,rr)}}catch(Un){de={error:Un}}finally{try{Ji&&!Ji.done&&(me=zi.return)&&me.call(zi)}finally{if(de)throw de.error}}}}catch(Ut){q={error:Ut}}finally{try{ci&&!ci.done&&(ce=bi.return)&&ce.call(bi)}finally{if(q)throw q.error}}fe=yn,Ie=xr;try{for(var ni=Ue(xe),Zn=ni.next();!Zn.done;Zn=ni.next()){var Wn=Zn.value;Wn.elapsed+=u;var cn=Wn.parameters,zn=(Tt=cn.delay)!==null&&Tt!==void 0?Tt:0,xi=Wn.elapsed-zn;if(!(xi<0)){var Li=xi/cn.seconds,Xn=cn.loop?Li%1:Math.min(1,Li),_i=(lt=cn.easing)!==null&&lt!==void 0?lt:"ease-out",on=Xn;cn.loop&&_i==="ease-in-out"?on=.5-.5*Math.cos(Xn*Math.PI*2):_i==="ease-out"?on=1-Math.pow(1-Xn,3):_i==="ease-in"?on=Math.pow(Xn,3):_i==="ease-in-out"?on=Xn<.5?4*Math.pow(Xn,3):1-Math.pow(-2*Xn+2,3)/2:_i==="back-out"&&(on=1+2.70158*Math.pow(Xn-1,3)+1.70158*Math.pow(Xn-1,2));var mn=cn.from+(cn.to-cn.from)*on,Wa=Xe((Nt=Wn.targetId)!==null&&Nt!==void 0?Nt:Wn.componentId);if(Wa){var ur=(Vt=Pe.get(Wa.id))!==null&&Vt!==void 0?Vt:{transform:Ze([],Ne(Wa.transform),!1),parameters:{}},hr=(ct=Wn.baseTransform)!==null&&ct!==void 0?ct:Wa.transform;if(cn.property==="opacity")ur.parameters.opacity=Math.max(0,Math.min(1,mn));else if(["scale","scaleX","scaleY","rotation"].includes(cn.property)){(Jt=ur.animationAxes)!==null&&Jt!==void 0||(ur.animationAxes={scale:1,scaleX:1,scaleY:1,rotation:0}),ur.animationAxes[cn.property]=mn;var Hr=ur.animationAxes,tc=Hr.rotation*Math.PI/180,ys=Math.cos(tc),Xa=Math.sin(tc),ks=Hr.scale*Hr.scaleX,Oo=Hr.scale*Hr.scaleY;ur.transform[0]=(hr[0]*ys+hr[2]*Xa)*ks,ur.transform[1]=(hr[1]*ys+hr[3]*Xa)*ks,ur.transform[2]=(-hr[0]*Xa+hr[2]*ys)*Oo,ur.transform[3]=(-hr[1]*Xa+hr[3]*ys)*Oo}else ur.transform[cn.property==="x"?4:5]=mn;Pe.set(Wa.id,ur),cn.loop&&xi>=cn.seconds&&(Wn.elapsed=zn+xi%cn.seconds)}}}}catch(Ut){_e={error:Ut}}finally{try{Zn&&!Zn.done&&(ye=ni.return)&&ye.call(ni)}finally{if(_e)throw _e.error}}xe=xe.filter(function(Ut){var Pn,Ni;return Xe((Pn=Ut.targetId)!==null&&Pn!==void 0?Pn:Ut.componentId)&&(Ut.elapsed<Ut.parameters.seconds+((Ni=Ut.parameters.delay)!==null&&Ni!==void 0?Ni:0)||Ut.parameters.loop)});try{for(var Wr=Ue(ae),Xr=Wr.next();!Xr.done;Xr=Wr.next()){var cn=Xr.value;if(cn.shape==="pixel-confetti"||cn.shape==="confetti"){cn.age+=u;continue}cn.life-=u,cn.x+=cn.vx*u,cn.y+=cn.vy*u,cn.vy+=cn.gravity*u}}catch(Ut){Ae={error:Ut}}finally{try{Xr&&!Xr.done&&(Ee=Wr.return)&&Ee.call(Wr)}finally{if(Ae)throw Ae.error}}ae=ae.filter(function(Ut){var Pn;return Ut.life>((Pn=Ut.age)!==null&&Pn!==void 0?Pn:0)}),xa()}function Kl(u,M){var N,R,P;if(v.beginPath(),u.contract==="native.ellipse.v1")v.ellipse(M.width/2,M.height/2,M.width/2,M.height/2,0,0,Math.PI*2);else if(u.contract==="native.path.v1"){var F=function(J,$){({M:function(){return v.moveTo.apply(v,Ze([],Ne($),!1))},L:function(){return v.lineTo.apply(v,Ze([],Ne($),!1))},C:function(){return v.bezierCurveTo.apply(v,Ze([],Ne($),!1))},Q:function(){return v.quadraticCurveTo.apply(v,Ze([],Ne($),!1))},Z:function(){return v.closePath()}})[J]()};try{for(var D=Ue(M.commands),Z=D.next();!Z.done;Z=D.next()){var H=Ne(Z.value),j=H[0],X=H.slice(1);F(j,X)}}catch(J){N={error:J}}finally{try{Z&&!Z.done&&(R=D.return)&&R.call(D)}finally{if(N)throw N.error}}}else{var Q=Math.min((P=M.radius)!==null&&P!==void 0?P:0,M.width/2,M.height/2);typeof v.roundRect=="function"?v.roundRect(0,0,M.width,M.height,Q):(v.moveTo(Q,0),v.arcTo(M.width,0,M.width,M.height,Q),v.arcTo(M.width,M.height,0,M.height,Q),v.arcTo(0,M.height,0,0,Q),v.arcTo(0,0,M.width,0,Q),v.closePath())}}function sv(u,M,N){var R,P,F,D=(R=Pe.get(u.id))===null||R===void 0?void 0:R.pathFrame;if(D!==void 0)return Math.min(M.frameCount-1,D);if(h||!M.frameRate)return 0;if(u.contract!=="native.walk-sprite.v1")return Math.floor(Math.max(0,De-((P=u.spawnTime)!==null&&P!==void 0?P:0))*M.frameRate)%M.frameCount;var Z=(F=u.runtimeId)!==null&&F!==void 0?F:u.id,H=Lt.get(Z);if(!H)return Lt.set(Z,{x:N[4],y:N[5],phase:0,lastMove:-1/0,frame:0}),0;var j=Math.hypot(N[4]-H.x,N[5]-H.y)>.3;if(j){var X=De-H.lastMove;H.phase=Number.isFinite(X)&&X<.25?H.phase+Math.min(X,.12)*M.frameRate:0,H.lastMove=De}return H.x=N[4],H.y=N[5],De-H.lastMove>.11&&(H.phase=0),H.frame=Math.floor(H.phase)%M.frameCount,H.frame}function Fo(u,M,N,R){var P,F,D,Z,H,j,X,Q,J,$,te;if(M===void 0&&(M=ra()),N===void 0&&(N=[]),u.contract!=="native.mesh3d.v1"){var q=wt(u),ce=Gt("erase-mask",(H=u.prototypeId)!==null&&H!==void 0?H:u.id);if(!(!q.visible||q.opacity<=0)){var de=Hs(M,rn(u));v.save(),v.transform.apply(v,Ze([],Ne(rn(u)),!1)),v.globalAlpha*=q.opacity;var me=Ge.get(u.id);me?.behavior.liftShadow&&(v.shadowColor="#00000055",v.shadowBlur=8,v.shadowOffsetY=4);var _e=N;u.contract==="native.group.v1"&&q.clip&&(v.beginPath(),v.rect(0,0,q.width,q.height),v.clip(),_e=Ze(Ze([],Ne(N),!1),[{matrix:de,width:q.width,height:q.height}],!1));var ye=!1;if(!["native.group.v1","native.text.v1","native.image.v1","native.sprite.v1","native.walk-sprite.v1","native.stage3d.v1","native.mesh3d.v1"].includes(u.contract)){var Ae=u.contract==="native.button.v1",Ee=en===u.id,Le=Ae?q.enabled?Ee?q.pressedFill:fn===u.id?q.hoverFill:q.fill:q.disabledFill:q.fill;if(Ae&&(q.presentation==="pixel-cta"||q.presentation==="shiny-cta")){var He=(j=V.get(u.id))!==null&&j!==void 0?j:re;k.set(u.id,He);var rt=!h&&!x?.matches?re-He:-1;q.presentation==="shiny-cta"?W0(v,q,Le,Ee,rt):H0(v,q,Le,Ee,rt)}else q.pixelFrame&&(v.save(),v.translate(3,4),Kl(u,q),v.fillStyle="#3c293366",v.fill(),v.restore()),Kl(u,q),ce?(v.save(),v.clip(),za(u,ce).render(v),v.restore(),ye=!0,Kl(u,q)):(v.fillStyle=Le,v.fill()),q.pixelFrame&&!(q.radius>0)&&(v.fillStyle="#ffffff22",v.fillRect(2,2,Math.max(0,q.width-4),2),v.fillRect(2,2,2,Math.max(0,q.height-4))),q.strokeWidth&&(v.strokeStyle=q.stroke,v.lineWidth=q.strokeWidth,v.stroke());kt===u.id&&(Kl(u,q),v.strokeStyle="#ffffff",v.lineWidth=5,v.stroke())}var qe;if(u.contract==="native.text.v1"){var Tt=q.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(pi,mi){var yi;return String((yi=O[mi])!==null&&yi!==void 0?yi:"")});q.pixelPanel&&(v.fillStyle="#3c293366",v.fillRect(3,4,q.width,q.height),v.fillStyle=q.panelFill,v.fillRect(0,0,q.width,q.height),v.strokeStyle=(X=q.panelStroke)!==null&&X!==void 0?X:q.color,v.lineWidth=2,v.strokeRect(1,1,q.width-2,q.height-2),v.fillStyle="#ffffff22",v.fillRect(3,3,Math.max(0,q.width-6),2));var lt=q.fontFamily==="pixel"?Rf(Tt,q):void 0;lt&&!lt.unsupportedChars.length?qe=B0(v,Tt,q):qe=$S(v,Tt,lt?xt(xt({},q),{fontFamily:"sans-serif",fontWeight:"700"}):q)}if(["native.image.v1","native.sprite.v1","native.walk-sprite.v1"].includes(u.contract)&&!ce){var Nt=A.get((J=(Q=Pe.get(u.id))===null||Q===void 0?void 0:Q.assetId)!==null&&J!==void 0?J:($=u.assetSlots[0])===null||$===void 0?void 0:$.assetId);if(Nt?.complete&&Nt.naturalWidth){v.save(),v.beginPath(),v.rect(0,0,q.width,q.height),v.clip();var Vt=u.contract!=="native.image.v1",ct=Vt?Math.min(q.frameColumns,q.frameCount):1,Jt=Vt?Math.ceil(q.frameCount/ct):1,Kt=Nt.width/ct,Mt=Nt.height/Jt,Qe=Vt?sv(u,q,de):0,zt=Qe%ct*Kt,Pt=Math.floor(Qe/ct)*Mt,it=q.fit==="cover"?Math.max(q.width/Kt,q.height/Mt):Math.min(q.width/Kt,q.height/Mt),Ct=q.fit==="stretch"?q.width:Kt*it,jt=q.fit==="stretch"?q.height:Mt*it;v.imageSmoothingEnabled=(te=q.smoothing)!==null&&te!==void 0?te:!0,v.drawImage(Nt,zt,Pt,Kt,Mt,(q.width-Ct)/2,(q.height-jt)/2,Ct,jt),v.restore()}}if(ce&&!ye&&za(u,ce).render(v),u.contract==="native.stage3d.v1"&&tt){var zt=Math.hypot(de[0],de[1]),Pt=Math.hypot(de[2],de[3]),pn=tt.renderStage(u,v,q.width*zt*lr*Oa,q.height*Pt*lr*Oa,q.width,q.height,{time:De,ambientTime:re,propsOf:wt,bodies3d:Ke,aimLocked:!!Be,groundFn:Yo,worldWidth:q.width*zt,worldHeight:q.height*Pt});try{for(var Ht=Ue(Ke),An=Ht.next();!An.done;An=Ht.next()){var Ti=Ne(An.value,2),bn=Ti[0],sn=Ti[1];if(sn.stageId===u.id&&sn.mode==="dynamic"){var Ri=pn.project({x:sn.x,y:sn.y,z:sn.z},q.width,q.height);st.set(bn,En(de,Ri.x,Ri.y))}}}catch(yi){P={error:yi}}finally{try{An&&!An.done&&(F=Ht.return)&&F.call(Ht)}finally{if(P)throw P.error}}}Xt.push({c:u,m:de,clips:_e,instance:R??u.prototypeId,textMetrics:qe});try{for(var Qn=Ue(Dn(u.id)),Pi=Qn.next();!Pi.done;Pi=Qn.next()){var Ei=Pi.value;Fo(Ei,de,_e,R??u.prototypeId)}}catch(pi){D={error:pi}}finally{try{Pi&&!Pi.done&&(Z=Qn.return)&&Z.call(Qn)}finally{if(D)throw D.error}}q.clip&&u.contract==="native.group.v1"&&Dh(u.id),v.restore()}}}function Dh(u,M){var N,R;if(!x?.matches)try{for(var P=Ue(ae),F=P.next();!F.done;F=P.next()){var D=F.value;D.shape!=="pixel-confetti"&&D.shape!=="confetti"||D.clipId!==u||!!D.screen!=!!M||(v.save(),D.shape==="confetti"?G0(v,D,M):k0(v,D,M),v.restore())}}catch(Z){N={error:Z}}finally{try{F&&!F.done&&(R=P.return)&&R.call(P)}finally{if(N)throw N.error}}}function ov(u,M,N,R){v.save(),v.translate(u,M),v.globalAlpha=.92,v.lineWidth=2,v.lineJoin="round",N==="tap"&&(v.strokeStyle="#fff0bd",v.globalAlpha=.7*(1-R),v.beginPath(),v.arc(0,0,12+R*12,0,Math.PI*2),v.stroke(),v.globalAlpha=.92),v.fillStyle="#fff0bd",v.strokeStyle="#193b46",v.beginPath(),v.moveTo(-7,10),v.lineTo(-9,-1),v.quadraticCurveTo(-9,-5,-5,-5),v.lineTo(-3,-3),v.lineTo(-3,-17),v.quadraticCurveTo(-3,-22,1,-22),v.quadraticCurveTo(5,-22,5,-17),v.lineTo(5,-6),v.quadraticCurveTo(9,-9,11,-5),v.quadraticCurveTo(15,-7,16,-2),v.lineTo(14,9),v.quadraticCurveTo(12,18,3,18),v.lineTo(-1,18),v.quadraticCurveTo(-5,17,-7,10),v.closePath(),v.fill(),v.stroke(),v.restore()}function lv(){var u,M,N,R,P,F,D,Z,H,j,X,Q,J,$;if(We=0,!h)try{for(var te=Ue(n.gameplay.filter(function(jn){return jn.kind==="tutorial-hand"})),q=te.next();!q.done;q=te.next()){var ce=q.value,de=w.get(ce.componentId),me=Xe(ce.parameters.targetId);if(!(!de||de.sceneId!==W||!me||me.sceneId!==W||!fi(me))&&!(ce.parameters.hideOnFirstInput&&ke)){var _e=Se?De:re;if(!(_e-Me<ce.parameters.idleDelaySeconds)){We++;var ye=ce.parameters.destinationId?Xe(ce.parameters.destinationId):void 0,Ae=wt(me),Ee=void 0;me.contract==="native.mesh3d.v1"&&(Ee=Do(me.id)),Ee||(Ee=En(Bn(me),Ae.width/2,Ae.height/2));var Le=_e%1.2/1.2,He=x?.matches?0:Le*Le*(3-2*Le),rt=Ee.x,qe=Ee.y;if(ce.parameters.mode!=="tap"){var Tt=ye?En(Bn(ye),wt(ye).width/2,wt(ye).height/2):{x:Ee.x-36,y:Ee.y+48};rt=Ee.x+(Tt.x-Ee.x)*He,qe=Ee.y+(Tt.y-Ee.y)*He}ov(rt+8,qe+22,ce.parameters.mode,He)}}}}catch(jn){u={error:jn}}finally{try{q&&!q.done&&(M=te.return)&&M.call(te)}finally{if(u)throw u.error}}try{for(var lt=Ue(or),Nt=lt.next();!Nt.done;Nt=lt.next()){var Vt=Ne(Nt.value,2),ct=Vt[0],Jt=Vt[1],Kt=Gt("draw-stroke",ct).parameters;try{for(var Mt=(P=void 0,Ue(Jt.strokes)),Qe=Mt.next();!Qe.done;Qe=Mt.next()){var zt=Qe.value;if(!(zt.points.length<2)){v.save(),v.globalAlpha=Kt.mode==="slice-blade"?Math.max(0,1-zt.age/.18):1,v.strokeStyle=Kt.color,v.lineWidth=Kt.strokeWidth,v.lineCap="round",v.lineJoin="round",v.beginPath(),v.moveTo(zt.points[0].x,zt.points[0].y);try{for(var Pt=(D=void 0,Ue(zt.points.slice(1))),it=Pt.next();!it.done;it=Pt.next()){var Ct=it.value;v.lineTo(Ct.x,Ct.y)}}catch(jn){D={error:jn}}finally{try{it&&!it.done&&(Z=Pt.return)&&Z.call(Pt)}finally{if(D)throw D.error}}v.stroke(),v.restore()}}}catch(jn){P={error:jn}}finally{try{Qe&&!Qe.done&&(F=Mt.return)&&F.call(Mt)}finally{if(P)throw P.error}}}}catch(jn){N={error:jn}}finally{try{Nt&&!Nt.done&&(R=lt.return)&&R.call(lt)}finally{if(N)throw N.error}}try{for(var jt=Ue(pe),pn=jt.next();!pn.done;pn=jt.next()){var Ht=pn.value;if(!(Ht.broken||!Ht.drawRope)){var An=gn.get(Ht.bodyId),Ti=Xe(Ht.anchorId);if(!(!An||!Ti)){var bn=gi(Ti);v.save(),v.strokeStyle=Ht.ropeColor,v.lineWidth=Ht.ropeWidth,v.beginPath(),v.moveTo(bn.x,bn.y),v.lineTo(An.x,An.y),v.stroke(),v.restore()}}}}catch(jn){H={error:jn}}finally{try{pn&&!pn.done&&(j=jt.return)&&j.call(jt)}finally{if(H)throw H.error}}try{for(var sn=Ue(b),Ri=sn.next();!Ri.done;Ri=sn.next()){var Qn=Ri.value,Pi=Math.min(1,Qn.elapsed/Qn.seconds);v.save(),v.globalAlpha=1-Pi,v.fillStyle=Qn.color,v.strokeStyle="#193b46",v.lineWidth=3,v.font="900 "+Qn.fontSize+"px sans-serif",v.textAlign="center",v.textBaseline="middle";var qe=Qn.y-(x?.matches?0:Qn.risePx*Pi);v.strokeText(Qn.text,Qn.x,qe),v.fillText(Qn.text,Qn.x,qe),v.restore()}}catch(jn){X={error:jn}}finally{try{Ri&&!Ri.done&&(Q=sn.return)&&Q.call(sn)}finally{if(X)throw X.error}}try{for(var Ei=Ue(oe),pi=Ei.next();!pi.done;pi=Ei.next()){var mi=pi.value,Pi=Math.min(1,mi.elapsed/mi.seconds),yi=Y();v.save(),v.globalAlpha=mi.opacity*(1-Pi),v.fillStyle=mi.color,v.fillRect(0,0,yi.width,yi.height),v.restore()}}catch(jn){J={error:jn}}finally{try{pi&&!pi.done&&($=Ei.return)&&$.call(Ei)}finally{if(J)throw J.error}}}function cv(){if(Dt){var u=gn.get(Dt.targetId),M=Dt.behavior.parameters;if(u){var N=Dt.current.x-Dt.start.x,R=Dt.current.y-Dt.start.y,P=Math.hypot(N,R),F=Math.min(M.maxPullPx,P),D=P>.001?F/P:0;v.save(),v.lineCap="round";var Z=Math.max(12,Math.min(u.width,u.height)*.62);if(v.strokeStyle="#173a2f66",v.lineWidth=3.5,v.beginPath(),v.arc(u.x,u.y,Z,0,Math.PI*2),v.stroke(),v.strokeStyle=M.trajectoryColor,v.lineWidth=2,v.beginPath(),v.arc(u.x,u.y,Z,0,Math.PI*2),v.stroke(),M.showTrajectory&&P>=M.minPullPx){var H=Fh(),j=Us(),X=j.bodies,Q=j.zones,J=Y(),$=Rp({body:xt(xt({},u),{vx:H.vx,vy:H.vy,atRest:!1}),bodies:X,zones:Q,bounds:{left:0,top:0,right:J.width,bottom:J.height},dots:M.trajectoryDots,bounces:M.trajectoryBounces});$.forEach(function(ce,de){var me=.96-.52*(de/Math.max(1,$.length)),_e=Math.max(2.2,4.5-de*.22);v.globalAlpha=me,v.fillStyle="#173a2f88",v.beginPath(),v.arc(ce.x,ce.y,_e+1.3,0,Math.PI*2),v.fill(),v.fillStyle=M.trajectoryColor,v.beginPath(),v.arc(ce.x,ce.y,_e,0,Math.PI*2),v.fill()})}if(P>=4){var te=u.x+N*D,q=u.y+R*D;v.globalAlpha=.9,v.strokeStyle="#173a2f66",v.lineWidth=5,v.beginPath(),v.moveTo(u.x,u.y),v.lineTo(te,q),v.stroke(),v.strokeStyle=M.trajectoryColor,v.lineWidth=2.6,v.beginPath(),v.moveTo(u.x,u.y),v.lineTo(te,q),v.stroke(),v.fillStyle="#173a2f88",v.beginPath(),v.arc(te,q,5.2,0,Math.PI*2),v.fill(),v.fillStyle=M.trajectoryColor,v.beginPath(),v.arc(te,q,3.6,0,Math.PI*2),v.fill()}v.restore()}}}function uv(u){var M,N,R,P;try{for(var F=Ue(Xi()),D=F.next();!D.done;D=F.next()){var Z=D.value,H=Z.contract==="native.group.v1"?Dn(Z.id):[Z];try{for(var j=(R=void 0,Ue(H)),X=j.next();!X.done;X=j.next()){var Q=X.value;if(Q.contract==="native.stage3d.v1"&&fi(Q)&&wt(Q).skyColor)return wt(Q).skyColor;if(!(Q.contract!=="native.rectangle.v1"||!fi(Q))){var J=wt(Q);if(!(J.opacity<.95||!J.fill||J.fill==="transparent")&&(/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test(Q.id)||J.width>=u.width*.9&&J.height>=u.height*.9))return J.fill}}}catch($){R={error:$}}finally{try{X&&!X.done&&(P=j.return)&&P.call(j)}finally{if(R)throw R.error}}}}catch($){M={error:$}}finally{try{D&&!D.done&&(N=F.return)&&N.call(F)}finally{if(M)throw M.error}}return"#102a34"}function hv(){var u;if(C&&fi(C.c)){var M=C.c,N=wt(M);v.save(),v.transform.apply(v,Ze([],Ne(Bn(M)),!1)),v.strokeStyle=(u=C.highlightColor)!==null&&u!==void 0?u:"#ffffff",v.lineWidth=4,v.globalAlpha=.85,v.strokeRect(-4,-4,N.width+8,N.height+8),v.restore()}if(Ve?.b.parameters.bringToFront){var M=Xe(Ve.targetId);M&&Fo(M,M.parentId?Bn(Xe(M.parentId)):ra(),[],M.prototypeId)}}function Zi(){var u,M,N,R,P,F;V=k,k=new Map;var D=Y();L!==void 0&&L!==D.landscape&&Yn(),L=D.landscape;var Z=Math.min(devicePixelRatio||1,2),H=e.clientWidth,j=e.clientHeight;(e.width!==Math.round(H*Z)||e.height!==Math.round(j*Z))&&(e.width=Math.round(H*Z),e.height=Math.round(j*Z)),v.setTransform(Z,0,0,Z,0,0),v.fillStyle=uv(D),v.fillRect(0,0,H,j);var X=Math.min(H/D.width,j/D.height),Q=(H-D.width*X)/2,J=(j-D.height*X)/2;if(lr=X||1,Oa=Z,v.translate(Q,J),v.scale(X,X),ue){var $=Math.min(1,ue.elapsed/ue.seconds),te=ue.intensity*(1-$);v.translate(Math.sin(ue.elapsed*95)*te,Math.cos(ue.elapsed*113)*te)}v.save(),v.beginPath(),v.rect(0,0,D.width,D.height),v.clip(),Xt=[];try{for(var q=Ue(Xi()),ce=q.next();!ce.done;ce=q.next()){var de=ce.value;Fo(de)}}catch(ct){u={error:ct}}finally{try{ce&&!ce.done&&(M=q.return)&&M.call(q)}finally{if(u)throw u.error}}try{for(var me=Ue(ne),_e=me.next();!_e.done;_e=me.next()){var de=_e.value;de.parentId||Fo(de,ra(),[],de.prototypeId)}}catch(ct){N={error:ct}}finally{try{_e&&!_e.done&&(R=me.return)&&R.call(me)}finally{if(N)throw N.error}}if(hv(),cv(),h&&Qt){for(var ye=w.get(Qt);ye?.parentId;)ye=w.get(ye.parentId);ye?.prototype&&Fo(ye)}Dh(),v.save();try{for(var Ae=Ue(ae),Ee=Ae.next();!Ee.done;Ee=Ae.next()){var Le=Ee.value;if(!(Le.shape==="pixel-confetti"||Le.shape==="confetti")){var He=Math.min(1,Le.life*2),rt=1.5+2.5*He;if(v.globalAlpha=He,v.globalCompositeOperation=Le.shape==="square"?"source-over":"lighter",v.fillStyle=Le.color,Le.shape==="square"){var qe=Math.max(2,Math.round(rt*1.6));v.fillRect(Math.round(Le.x-qe/2),Math.round(Le.y-qe/2),qe,qe);continue}v.globalCompositeOperation="lighter",v.shadowColor=Le.color,v.shadowBlur=ae.length<=16?6:0,v.strokeStyle=Le.color,v.lineWidth=1.5+He,v.beginPath(),v.moveTo(Le.x-Le.vx*.025,Le.y-Le.vy*.025),v.lineTo(Le.x,Le.y),v.stroke(),v.beginPath(),v.arc(Le.x,Le.y,rt,0,Math.PI*2),v.fill()}}}catch(ct){P={error:ct}}finally{try{Ee&&!Ee.done&&(F=Ae.return)&&F.call(Ae)}finally{if(P)throw P.error}}if(v.restore(),lv(),h&&Qt){var Tt=Xt.filter(function(ct){return ct.c.contract!=="native.group.v1"&&(ct.c.id===Qt||yr(ct.c,Qt))});if(Tt.length){var lt=Tt.map(function(ct){return Yi(ct.c,ct.m)}),Nt=Math.min.apply(Math,Ze([],Ne(lt.map(function(ct){return ct.left})),!1)),Vt=Math.min.apply(Math,Ze([],Ne(lt.map(function(ct){return ct.top})),!1));v.strokeStyle="#55e6ef",v.lineWidth=2/X,v.strokeRect(Nt,Vt,Math.max.apply(Math,Ze([],Ne(lt.map(function(ct){return ct.right})),!1))-Nt,Math.max.apply(Math,Ze([],Ne(lt.map(function(ct){return ct.bottom})),!1))-Vt)}}v.restore(),X>0&&Dh(void 0,{x:-Q/X,y:-J/X,width:H/X,height:j/X})}function dv(u){var M,N,R,P,F=Array.isArray(u)?Ze([],Ne(new Set(u)),!1):void 0;Zi();var D=Y(),Z=new Set,H=[];try{for(var j=Ue(Xt),X=j.next();!X.done;X=j.next()){var Q=X.value,J=(R=Q.c.prototypeId)!==null&&R!==void 0?R:Q.c.id;if(!(Q.c.contract==="native.group.v1"||F&&!F.includes(J))){Z.add(J);var $=Yi(Q.c,Q.m),te=((P=wt(Q.c).strokeWidth)!==null&&P!==void 0?P:0)/2;$.left-=te,$.right+=te,$.top-=te,$.bottom+=te;var q={left:Math.max(0,-$.left),right:Math.max(0,$.right-D.width),top:Math.max(0,-$.top),bottom:Math.max(0,$.bottom-D.height)};Object.values(q).some(function(de){return de>.01})&&H.push({id:J,contract:Q.c.contract,bounds:$,overflow:q})}}}catch(de){M={error:de}}finally{try{X&&!X.done&&(N=j.return)&&N.call(j)}finally{if(M)throw M.error}}var ce=F?F.filter(function(de){return!Z.has(de)}):[];return{ok:H.length===0&&ce.length===0,viewport:xt(xt({},D),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight}),issues:H,missing:ce}}function fv(u){var M,N,R,P,F,D,Z,H,j,X,Q,J,$,te,q,ce,de,me,_e,ye,Ae,Ee,Le,He,rt,qe,Tt,lt,Nt,Vt,ct,Jt,Kt,Mt=u===void 0?{}:u,Qe=Mt.ids,zt=Mt.interactiveIds,Pt=Mt.network,it=Pt===void 0?"standalone":Pt,Ct=Mt.minTouchPx,jt=Ct===void 0?44:Ct,pn=Array.isArray(Qe)?Ze([],Ne(new Set(Qe)),!1):void 0;Zi();var Ht=Y(),An=Math.min(e.clientWidth/Ht.width,e.clientHeight/Ht.height),Ti=Of(Ht,it),bn=[],sn=new Set,Ri=function(Te){var Et;return!pn||pn.includes((Et=Te.c.prototypeId)!==null&&Et!==void 0?Et:Te.c.id)},Qn=Xt.filter(Ri),Pi=new Set(n.events.filter(function(Te){return Te.kind==="click"}).map(function(Te){return Te.componentId}));try{for(var Ei=Ue(n.gameplay),pi=Ei.next();!pi.done;pi=Ei.next()){var mi=pi.value;["drag","match-tile","aim-launch","aim-launch-3d","swipe-input","hold-charge","draw-stroke","erase-mask"].includes(mi.kind)&&Pi.add(mi.componentId)}}catch(Te){M={error:Te}}finally{try{pi&&!pi.done&&(N=Ei.return)&&N.call(Ei)}finally{if(M)throw M.error}}var yi=new Set(zt??Pi),jn=new Set(n.gameplay.filter(function(Te){return["aim-launch","aim-launch-3d","swipe-input","hold-charge","draw-stroke"].includes(Te.kind)&&(Te.parameters.dragMode==="anywhere"||Te.kind==="draw-stroke")}).map(function(Te){return Te.componentId})),Si=function(Te){var Et;return yi.has((Et=Te.c.prototypeId)!==null&&Et!==void 0?Et:Te.c.id)},Hn=function(Te,Et,Ft,vn,Mi,ii){return bn.push(xt(xt({kind:Te,severity:Et,id:Ft},ii?{otherId:ii}:{}),{detail:vn,metrics:Mi}))},yn=function(Te){var Et=[[0,0],[Te.width,0],[Te.width,Te.height],[0,Te.height]].map(function(Ft){var vn=Ne(Ft,2),Mi=vn[0],ii=vn[1];return En(Te.matrix,Mi,ii)});return{left:Math.min.apply(Math,Ze([],Ne(Et.map(function(Ft){return Ft.x})),!1)),right:Math.max.apply(Math,Ze([],Ne(Et.map(function(Ft){return Ft.x})),!1)),top:Math.min.apply(Math,Ze([],Ne(Et.map(function(Ft){return Ft.y})),!1)),bottom:Math.max.apply(Math,Ze([],Ne(Et.map(function(Ft){return Ft.y})),!1))}};try{for(var xr=Ue(Qn),Nr=xr.next();!Nr.done;Nr=xr.next()){var Rn=Nr.value,Wn=(Le=Rn.c.prototypeId)!==null&&Le!==void 0?Le:Rn.c.id;sn.add(Wn);var Rt=Yi(Rn.c,Rn.m),vi=((He=wt(Rn.c).strokeWidth)!==null&&He!==void 0?He:0)/2;Rt.left-=vi,Rt.right+=vi,Rt.top-=vi,Rt.bottom+=vi;var Vr=Rn.c.contract==="native.group.v1"&&!wt(Rn.c).clip,Dr=Rn.c.contract==="native.image.v1"&&Rn.clips.length===0&&wt(Rn.c).fit==="cover"&&Rt.left<=0&&Rt.top<=0&&Rt.right>=Ht.width&&Rt.bottom>=Ht.height||Rn.c.contract==="native.stage3d.v1"&&Rt.left<=0&&Rt.top<=0&&Rt.right>=Ht.width&&Rt.bottom>=Ht.height,_a=Rn.c.contract==="native.rectangle.v1"&&vi===0&&Rt.left<=0&&Rt.top<=0&&Rt.right>=Ht.width&&Rt.bottom>=Ht.height||Dr;if(!Vr){var _r={left:Math.max(0,-Rt.left),right:Math.max(0,Rt.right-Ht.width),top:Math.max(0,-Rt.top),bottom:Math.max(0,Rt.bottom-Ht.height)};if(!_a&&!pv(Rn.c)&&Object.values(_r).some(function(Te){return Te>.01})&&Hn("stage-overflow","blocker",Wn,"Component extends beyond the active stage.",{bounds:Rt,overflow:_r}),Rn.c.contract==="native.image.v1"&&Rn.clips.length===0){var Ur=Rt.right-Rt.left,Gr=Rt.bottom-Rt.top,Ha=/(?:^|\.)(backdrop|background|bg)$/.test(Wn)||wt(Rn.c).fit==="cover"&&!Rn.c.parentId&&Rt.left<=1&&Rt.top<=1&&(Ur>=Ht.width*.4||Gr>=Ht.height*.4);Ha&&(Rt.left>.5||Rt.top>.5||Rt.right<Ht.width-.5||Rt.bottom<Ht.height-.5)&&Hn("backdrop-incomplete","blocker",Wn,"Backdrop image does not cover the full active stage, leaving a visible seam.",{bounds:Rt,stage:{width:Ht.width,height:Ht.height}})}try{for(var Mr=(F=void 0,Ue(Rn.clips)),rr=Mr.next();!rr.done;rr=Mr.next()){var bi=rr.value,ci=yn(bi),Ma={left:Math.max(0,ci.left-Rt.left),right:Math.max(0,Rt.right-ci.right),top:Math.max(0,ci.top-Rt.top),bottom:Math.max(0,Rt.bottom-ci.bottom)};Object.values(Ma).some(function(Te){return Te>.01})&&Hn("parent-clip-crop","blocker",Wn,"Component is cropped by an ancestor clipping group.",{bounds:Rt,clip:ci,crop:Ma})}}catch(Te){F={error:Te}}finally{try{rr&&!rr.done&&(D=Mr.return)&&D.call(Mr)}finally{if(F)throw F.error}}}if(Rn.textMetrics){var cr=Rn.textMetrics;(cr.overflowsWidth||cr.overflowsHeight)&&Hn("text-overflow","blocker",Wn,"Text does not fit its component after wrapping and auto-fit.",cr);var zi=(rt=cr.fontSize)!==null&&rt!==void 0?rt:cr.scale*8;zi<12&&Hn("text-illegible",zi<8?"blocker":"warning",Wn,"Rendered text is below the recommended legible size.",xt({renderedFontSize:zi},cr));var Ji=wt(Rn.c);if(Ji.pixelPanel&&Ji.align!=="center"){var gs=Math.max(0,Ji.width-2*(Ji.padding===void 0?8:Ji.padding));gs-((qe=cr.renderedWidth)!==null&&qe!==void 0?qe:0)>12&&Hn("panel-off-center","blocker",Wn,"Text inside a framed pixel panel is not horizontally centered.",{align:Ji.align,innerWidth:gs,renderedWidth:(Tt=cr.renderedWidth)!==null&&Tt!==void 0?Tt:0})}}if(Si(Rn)&&!jn.has(Wn)&&(Rn.c.contract!=="native.group.v1"||Rt.right>Rt.left&&Rt.bottom>Rt.top)){var ni=(Rt.right-Rt.left)*An,Zn=(Rt.bottom-Rt.top)*An;(ni<jt-.01||Zn<jt-.01)&&Hn("touch-target-small","blocker",Wn,"Interactive target is smaller than the required physical touch size.",{width:ni,height:Zn,minTouchPx:jt,scale:An})}if(Si(Rn)&&!jn.has(Wn)||Rn.c.contract==="native.text.v1")try{for(var cn=(Z=void 0,Ue(Ti.zones)),zn=cn.next();!zn.done;zn=cn.next()){var xi=zn.value,ni=Math.min(Rt.right,xi.right)-Math.max(Rt.left,xi.left),Zn=Math.min(Rt.bottom,xi.bottom)-Math.max(Rt.top,xi.top);ni>.01&&Zn>.01&&Hn("sdk-safe-area-collision","blocker",Wn,"Component intersects a reserved ad-SDK overlay zone.",{bounds:Rt,zone:xi,intersection:{width:ni,height:Zn},network:it})}}catch(Te){Z={error:Te}}finally{try{zn&&!zn.done&&(H=cn.return)&&H.call(cn)}finally{if(Z)throw Z.error}}}}catch(Te){R={error:Te}}finally{try{Nr&&!Nr.done&&(P=xr.return)&&P.call(xr)}finally{if(R)throw R.error}}for(var Li=Qn.filter(function(Te){return Si(Te)&&Te.c.contract!=="native.group.v1"}),Xn=0;Xn<Li.length;Xn++)for(var _i=Xn+1;_i<Li.length;_i++){var on=Li[Xn],mn=Li[_i],Wa=(lt=on.c.prototypeId)!==null&&lt!==void 0?lt:on.c.id,ur=(Nt=mn.c.prototypeId)!==null&&Nt!==void 0?Nt:mn.c.id;if(!(Wa===ur||yr(on.c,mn.c.id)||yr(mn.c,on.c.id))){var hr=Yi(on.c,on.m),Hr=Yi(mn.c,mn.m),ni=Math.min(hr.right,Hr.right)-Math.max(hr.left,Hr.left),Zn=Math.min(hr.bottom,Hr.bottom)-Math.max(hr.top,Hr.top);ni>1&&Zn>1&&Hn("interactive-overlap","blocker",Wa,"Interactive targets overlap.",{intersection:{width:ni,height:Zn},first:hr,second:Hr},ur)}}var tc=function(Te){if(!Te||Te==="transparent")return!1;var Et=/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.exec(Te);if(Et)return Et[1].length===4?Et[1][3].toLowerCase()==="f":Et[1].slice(6).toLowerCase()==="ff";var Ft=/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\s*\)$/i.exec(Te);return Ft?Number(Ft[1])>=.95:!0},ys=[];Qn.forEach(function(Te,Et){var Ft,vn;Te.c.contract==="native.rectangle.v1"&&!Si(Te)&&((Ft=wt(Te.c).opacity)!==null&&Ft!==void 0?Ft:1)>=.95&&tc(wt(Te.c).fill)&&ys.push({rowIndex:Et,row:Te,order:(vn=Te.c.order)!==null&&vn!==void 0?vn:0,bounds:Yi(Te.c,Te.m)})});var Xa=Qn.filter(function(Te,Et){var Ft,vn=Yi(Te.c,Te.m),Mi=(Ft=Te.c.order)!==null&&Ft!==void 0?Ft:0;return!ys.some(function(ii){return ii.rowIndex>Et&&ii.order>Mi&&ii.row.c.id!==Te.c.id&&!yr(ii.row.c,Te.c.id)&&!yr(Te.c,ii.row.c.id)&&ii.bounds.left<=vn.left+1&&ii.bounds.right>=vn.right-1&&ii.bounds.top<=vn.top+1&&ii.bounds.bottom>=vn.bottom-1})}),ks=Xa.map(function(Te,Et){return{row:Te,rowIndex:Et}}).filter(function(Te){var Et,Ft=Te.row;if(Ft.c.contract!=="native.rectangle.v1")return!1;var vn=Yi(Ft.c,Ft.m),Mi=vn.right-vn.left,ii=vn.bottom-vn.top,ba=((Et=wt(Ft.c).strokeWidth)!==null&&Et!==void 0?Et:0)===0&&vn.left<=0&&vn.right>=Ht.width;return!ba&&Mi>=180&&ii>=140&&!Si(Ft)}).map(function(Te){var Et,Ft=Te.row,vn=Te.rowIndex;return{id:(Et=Ft.c.prototypeId)!==null&&Et!==void 0?Et:Ft.c.id,row:Ft,rowIndex:vn,bounds:Yi(Ft.c,Ft.m)}}),Oo=function(Te,Et,Ft,vn){var Mi,ii;vn===void 0&&(vn=!1);var ba=(Mi=Te.c.prototypeId)!==null&&Mi!==void 0?Mi:Te.c.id,Xo=(Ft.left+Ft.right)/2,wa=(Ft.top+Ft.bottom)/2,Hh=(ii=Te.c.order)!==null&&ii!==void 0?ii:0;return ks.filter(function(kn){var Ta;return kn.id!==ba&&(!vn||kn.rowIndex<Et||((Ta=kn.row.c.order)!==null&&Ta!==void 0?Ta:0)===Hh)&&Ft.right-Ft.left<=kn.bounds.right-kn.bounds.left+4&&Ft.bottom-Ft.top<=kn.bounds.bottom-kn.bounds.top+4&&Xo>=kn.bounds.left&&Xo<=kn.bounds.right&&wa>=kn.bounds.top&&wa<=kn.bounds.bottom}).sort(function(kn,Ta){return(kn.bounds.right-kn.bounds.left)*(kn.bounds.bottom-kn.bounds.top)-(Ta.bounds.right-Ta.bounds.left)*(Ta.bounds.bottom-Ta.bounds.top)||Ta.rowIndex-kn.rowIndex})[0]},Wr=new Map,Xr=new Map;if(ks.length){Xa.forEach(function(Te,Et){var Ft,vn=(Ft=Te.c.prototypeId)!==null&&Ft!==void 0?Ft:Te.c.id,Mi=Yi(Te.c,Te.m),ii=(Mi.left+Mi.right)/2,ba=(Mi.top+Mi.bottom)/2,Xo=Te.c.contract==="native.button.v1"&&!Ye.has(Te.c.id),wa=Te.c.parentId?Xe(Te.c.parentId):void 0,Hh=Te.c.contract==="native.text.v1"&&wt(Te.c).align==="center"&&wa?.contract!=="native.button.v1";if(Xo||Hh){var kn=Oo(Te,Et,Mi,!1);kn&&(Wr.has(kn.id)||Wr.set(kn.id,{panel:kn,items:[]}),Wr.get(kn.id).items.push({id:vn,bounds:Mi,cx:ii,cy:ba,isBtn:Xo}))}if(["native.text.v1","native.image.v1","native.button.v1"].includes(Te.c.contract)&&wa?.contract!=="native.button.v1"){var kn=Oo(Te,Et,Mi,!0);kn&&(Xr.has(kn.id)||Xr.set(kn.id,{panel:kn,content:[]}),Xr.get(kn.id).content.push({row:Te,id:vn,bounds:Mi}))}});try{for(var Ut=Ue(Wr.values()),Pn=Ut.next();!Pn.done;Pn=Ut.next()){var Ni=Pn.value,Un=Ni.panel,dr=Ni.items;if(dr.some(function(Te){return Te.isBtn})){var In=Un.bounds,Di=(In.left+In.right)/2;try{for(var ki=(Q=void 0,Ue(dr)),Sa=ki.next();!Sa.done;Sa=ki.next()){var $i=Sa.value,ta={left:$i.bounds.left-In.left,right:In.right-$i.bounds.right,top:$i.bounds.top-In.top,bottom:In.bottom-$i.bounds.bottom},Vs=Math.min(ta.left,ta.right,ta.top,ta.bottom);(Vs<10||Vs*An<8)&&Hn("panel-edge-cramped","blocker",$i.id,"Element sits too close to its enclosing panel edge.",{panelId:Un.id,margins:ta,scale:An,minStagePx:10,minCssPx:8},Un.id)}}catch(Te){Q={error:Te}}finally{try{Sa&&!Sa.done&&(J=ki.return)&&J.call(ki)}finally{if(Q)throw Q.error}}var qa=[],Bo=function(Te){var Et=qa.find(function(Ft){return Math.abs(Ft.cy-Te.cy)<=16&&Ft.isBtn===Te.isBtn});Et?Et.items.push(Te):qa.push({cy:Te.cy,isBtn:Te.isBtn,items:[Te]})};try{for(var nc=($=void 0,Ue(dr)),zo=nc.next();!zo.done;zo=nc.next()){var $i=zo.value;Bo($i)}}catch(Te){$={error:Te}}finally{try{zo&&!zo.done&&(te=nc.return)&&te.call(nc)}finally{if($)throw $.error}}try{for(var ic=(q=void 0,Ue(qa)),ko=ic.next();!ko.done;ko=ic.next()){var Vh=ko.value,bv=Math.min.apply(Math,Ze([],Ne(Vh.items.map(function(Te){return Te.bounds.left})),!1)),wv=Math.max.apply(Math,Ze([],Ne(Vh.items.map(function(Te){return Te.bounds.right})),!1)),jf=(bv+wv)/2,ep=jf-Di;Math.abs(ep)>3&&Hn("panel-off-center","blocker",Vh.items[0].id,"Element is not horizontally centered inside its enclosing panel.",{panelId:Un.id,offsetX:ep,groupCenterX:jf,panelCenterX:Di,scale:An},Un.id)}}catch(Te){q={error:Te}}finally{try{ko&&!ko.done&&(ce=ic.return)&&ce.call(ic)}finally{if(q)throw q.error}}}}}catch(Te){j={error:Te}}finally{try{Pn&&!Pn.done&&(X=Ut.return)&&X.call(Ut)}finally{if(j)throw j.error}}try{for(var rc=Ue(Xr.values()),Vo=rc.next();!Vo.done;Vo=rc.next())for(var tp=Vo.value,Un=tp.panel,ac=tp.content,Tv=Wr.has(Un.id),Xn=0;Xn<ac.length;Xn++)for(var _i=Xn+1;_i<ac.length;_i++){var on=ac[Xn],mn=ac[_i];if(!(on.id===mn.id||yr(on.row.c,mn.row.c.id)||yr(mn.row.c,on.row.c.id))){var Ev=on.row.c.contract==="native.image.v1"&&mn.row.c.contract==="native.image.v1";if(!(Ev&&(!Tv||on.row.c.parentId&&on.row.c.parentId===mn.row.c.parentId))){var ni=Math.min(on.bounds.right,mn.bounds.right)-Math.max(on.bounds.left,mn.bounds.left),Zn=Math.min(on.bounds.bottom,mn.bounds.bottom)-Math.max(on.bounds.top,mn.bounds.top);ni>2&&Zn>2&&Hn("panel-content-overlap","blocker",on.id,"Panel elements overlap each other.",{panelId:Un.id,intersection:{width:ni,height:Zn},first:on.bounds,second:mn.bounds},mn.id)}}}}catch(Te){de={error:Te}}finally{try{Vo&&!Vo.done&&(me=rc.return)&&me.call(rc)}finally{if(de)throw de.error}}}var Gs=Xa.filter(function(Te){if(Te.c.contract!=="native.text.v1")return!1;var Et=Te.c.parentId?Xe(Te.c.parentId):void 0;return Et?.contract!=="native.button.v1"}).map(function(Te){var Et,Ft,vn=String((Et=wt(Te.c).text)!==null&&Et!==void 0?Et:"").replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(Mi,ii){var ba;return String((ba=O[ii])!==null&&ba!==void 0?ba:"")}).trim();return{row:Te,id:(Ft=Te.c.prototypeId)!==null&&Ft!==void 0?Ft:Te.c.id,bounds:Yi(Te.c,Te.m),raw:vn,norm:vn.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}}).filter(function(Te){return Te.raw.length>0}),Av=ks.filter(function(Te){var Et,Ft;return((Et=Wr.get(Te.id))===null||Et===void 0?void 0:Et.items.some(function(vn){return vn.isBtn}))||((Ft=Xr.get(Te.id))===null||Ft===void 0?void 0:Ft.content.some(function(vn){return vn.row.c.contract==="native.button.v1"}))});try{for(var sc=Ue(Av),Go=sc.next();!Go.done;Go=sc.next()){var Un=Go.value,In=Un.bounds,Di=(In.left+In.right)/2,Iv=In.right-In.left;try{for(var oc=(Ae=void 0,Ue(Gs)),Ho=oc.next();!Ho.done;Ho=oc.next()){var na=Ho.value;if(wt(na.row.c).align==="center"&&!(na.bounds.bottom>In.top+6||In.top-na.bounds.bottom>48)){var np=na.bounds.right-na.bounds.left,Wo=(na.bounds.left+na.bounds.right)/2,Cv=Math.min(na.bounds.right,In.right)-Math.max(na.bounds.left,In.left);(Wo>=In.left&&Wo<=In.right||Cv>=np*.6)&&np<=Iv+60&&Math.abs(Wo-Di)>4&&Hn("header-off-center","blocker",na.id,"Centered text above a panel is not horizontally aligned with the panel below it.",{panelId:Un.id,offsetX:Wo-Di,textCenterX:Wo,panelCenterX:Di,scale:An},Un.id)}}}catch(vn){Ae={error:vn}}finally{try{Ho&&!Ho.done&&(Ee=oc.return)&&Ee.call(oc)}finally{if(Ae)throw Ae.error}}}}catch(Te){_e={error:Te}}finally{try{Go&&!Go.done&&(ye=sc.return)&&ye.call(sc)}finally{if(_e)throw _e.error}}for(var Xn=0;Xn<Gs.length;Xn++)for(var _i=Xn+1;_i<Gs.length;_i++){var on=Gs[Xn],mn=Gs[_i];if(!(on.id===mn.id||yr(on.row.c,mn.row.c.id)||yr(mn.row.c,on.row.c.id))){var ni=Math.min(on.bounds.right,mn.bounds.right)-Math.max(on.bounds.left,mn.bounds.left),Zn=Math.min(on.bounds.bottom,mn.bounds.bottom)-Math.max(on.bounds.top,mn.bounds.top);if(ni>2&&Zn>2&&Hn("panel-content-overlap","blocker",on.id,"Visible text elements overlap.",{intersection:{width:ni,height:Zn},first:on.bounds,second:mn.bounds},mn.id),on.norm&&mn.norm){var ip=Ne(on.norm.length<=mn.norm.length?[on.norm,mn.norm]:[mn.norm,on.norm],2),lc=ip[0],rp=ip[1];(lc===rp&&lc.length>=6||lc.length>=12&&rp.includes(lc))&&Hn("duplicate-visible-copy","blocker",on.id,"Duplicate visible copy appears in multiple text elements simultaneously.",{first:on.raw,second:mn.raw},mn.id)}}}var ia=Gs.filter(function(Te){return!/^[\d\s/.,:%+\-x]+$/i.test(Te.raw)}),cc=ia.reduce(function(Te,Et){return Te+(Et.norm?Et.norm.split(" ").filter(Boolean).length:0)},0),Gh=ia.reduce(function(Te,Et){return Te+Et.raw.replace(/\s+/g," ").length},0);cc>20||Gh>130||ia.length>5?Hn("text-clutter-heavy","blocker",(ct=(Vt=ia[0])===null||Vt===void 0?void 0:Vt.id)!==null&&ct!==void 0?ct:null,"Too much visible copy on one screen; keep playable ads visual and concise.",{blocks:ia.length,wordCount:cc,charCount:Gh,texts:ia.map(function(Te){return Te.raw})}):(cc>12||ia.length>4)&&Hn("text-clutter-heavy","warning",(Kt=(Jt=ia[0])===null||Jt===void 0?void 0:Jt.id)!==null&&Kt!==void 0?Kt:null,"Screen copy is getting dense; consider trimming narration so gameplay carries the experience.",{blocks:ia.length,wordCount:cc,charCount:Gh,texts:ia.map(function(Te){return Te.raw})});var ap=pn?pn.filter(function(Te){if(sn.has(Te))return!1;var Et=Xe(Te);return Et?.contract==="native.mesh3d.v1"?!1:!Et||fi(Et)}):[];return{ok:!bn.some(function(Te){return Te.severity==="blocker"})&&ap.length===0,viewport:xt(xt({},Ht),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight,scale:An}),defects:bn,missing:ap,interactive:Li.map(function(Te){var Et;return{id:(Et=Te.c.prototypeId)!==null&&Et!==void 0?Et:Te.c.id,bounds:Yi(Te.c,Te.m)}}),safeArea:Ti}}function yr(u,M){for(;u.parentId;){if(u.parentId===M)return!0;u=Xe(u.parentId)}return!1}function pv(u){for(var M=function(P){if(n.gameplay.some(function(F){var D;return F.kind==="camera-follow"&&F.componentId===((D=P.prototypeId)!==null&&D!==void 0?D:P.id)}))return{value:!0}},N=u;N;N=N.parentId?Xe(N.parentId):void 0){var R=M(N);if(typeof R=="object")return R.value}return!1}function Uh(u){var M=Y(),N=e.getBoundingClientRect(),R=Math.min(N.width/M.width,N.height/M.height);return{x:(u.clientX-N.left-(N.width-M.width*R)/2)/R,y:(u.clientY-N.top-(N.height-M.height*R)/2)/R}}function mv(u,M){var N,R,P,F;try{try{for(var D=Ue(u.clips),Z=D.next();!Z.done;Z=D.next()){var H=Z.value,j=En(qr(H.matrix),M.x,M.y);if(j.x<0||j.y<0||j.x>H.width||j.y>H.height)return!1}}catch(ye){N={error:ye}}finally{try{Z&&!Z.done&&(R=D.return)&&R.call(D)}finally{if(N)throw N.error}}var X=En(qr(u.m),M.x,M.y),Q=wt(u.c);if(u.c.contract==="native.path.v1"){var J=new Path2D,$=function(ye,Ae){({M:function(){return J.moveTo.apply(J,Ze([],Ne(Ae),!1))},L:function(){return J.lineTo.apply(J,Ze([],Ne(Ae),!1))},C:function(){return J.bezierCurveTo.apply(J,Ze([],Ne(Ae),!1))},Q:function(){return J.quadraticCurveTo.apply(J,Ze([],Ne(Ae),!1))},Z:function(){return J.closePath()}})[ye]()};try{for(var te=Ue(Q.commands),q=te.next();!q.done;q=te.next()){var ce=Ne(q.value),de=ce[0],me=ce.slice(1);$(de,me)}}catch(ye){P={error:ye}}finally{try{q&&!q.done&&(F=te.return)&&F.call(te)}finally{if(P)throw P.error}}v.save(),v.setTransform(1,0,0,1,0,0),v.lineWidth=Q.strokeWidth;var _e=v.isPointInPath(J,X.x,X.y)||Q.strokeWidth>0&&v.isPointInStroke(J,X.x,X.y);return v.restore(),_e}return u.c.contract==="native.ellipse.v1"?Math.pow((X.x-Q.width/2)/(Q.width/2),2)+Math.pow((X.y-Q.height/2)/(Q.height/2),2)<=1:X.x>=0&&X.y>=0&&X.x<=Q.width&&X.y<=Q.height}catch{return!1}}function Ql(u){return Ze([],Ne(Xt),!1).reverse().find(function(M){return M.c.contract!=="native.group.v1"&&M.c.sceneId===W&&Xe(M.c.id)&&fi(M.c)&&mv(M,u)})}function jl(u){for(var M=[];u;)M.push(u),u=Xe(u.parentId);return M}function Fh(){if(!Dt)return{vx:0,vy:0,power:0,pull:0};var u=Dt.behavior.parameters,M=Dt.current.x-Dt.start.x,N=Dt.current.y-Dt.start.y,R=Math.hypot(M,N),P=Math.max(0,Math.min(1,(R-u.minPullPx)/Math.max(1,u.maxPullPx-u.minPullPx))),F=u.minSpeed+(u.maxSpeed-u.minSpeed)*P,D=u.invert?-1:1;return{vx:R?M/R*F*D:0,vy:R?N/R*F*D:0,power:P,pull:R}}function Xf(u){if(Dt){Dt.current=u;var M=Fh();Dt.power=M.power,Dt.behavior.parameters.powerVariableId&&(O[Dt.behavior.parameters.powerVariableId]=M.power)}}function Oh(u){var M,N;u===void 0&&(u=!1);try{var R=(M=globalThis.AudioContext)!==null&&M!==void 0?M:globalThis.webkitAudioContext;R&&!pt&&(pt=new R,(N=pt.addEventListener)===null||N===void 0||N.call(pt,"statechange",function(){pt?.state==="running"&&Ch()})),Uo(u)}catch{}}function vv(u,M,N){var R,P,F,D,Z,H,j=function(Ae){var Ee=N.find(function(rt){var qe;return((qe=rt.prototypeId)!==null&&qe!==void 0?qe:rt.id)===Ae.componentId});if(!Ee)return"continue";var Le=En(qr(Bn(Ee)),M.x,M.y),He=za(Ee,Ae);return He.stampSegment(Le,Le),ge={kind:"mask",pointerId:u.pointerId,c:Ee,behavior:Ae,last:Le},(Z=e.setPointerCapture)===null||Z===void 0||Z.call(e,u.pointerId),{value:!0}};try{for(var X=Ue(n.gameplay.filter(function(Ae){var Ee;return Ae.kind==="erase-mask"&&((Ee=w.get(Ae.componentId))===null||Ee===void 0?void 0:Ee.sceneId)===W})),Q=X.next();!Q.done;Q=X.next()){var J=Q.value,$=j(J);if(typeof $=="object")return $.value}}catch(Ae){R={error:Ae}}finally{try{Q&&!Q.done&&(P=X.return)&&P.call(X)}finally{if(R)throw R.error}}if(N.some(function(Ae){return Ae.contract==="native.button.v1"||n.events.some(function(Ee){var Le;return Ee.kind==="click"&&Ee.componentId===((Le=Ae.prototypeId)!==null&&Le!==void 0?Le:Ae.id)})}))return!1;try{for(var te=Ue(n.gameplay.filter(function(Ae){var Ee;return Ae.kind==="draw-stroke"&&((Ee=w.get(Ae.componentId))===null||Ee===void 0?void 0:Ee.sceneId)===W})),q=te.next();!q.done;q=te.next()){var J=q.value,ce=w.get(J.componentId),de=qr(Bn(ce)),me=En(de,M.x,M.y),_e=wt(ce);if(!(me.x<0||me.y<0||me.x>_e.width||me.y>_e.height)){var ye=ka(J);return ye.begin(M),ge={kind:"stroke",pointerId:u.pointerId,c:ce,behavior:J,store:ye,last:M},St({kind:"strokeStart",componentId:ce.id}),(H=e.setPointerCapture)===null||H===void 0||H.call(e,u.pointerId),!0}}}catch(Ae){F={error:Ae}}finally{try{q&&!q.done&&(D=te.return)&&D.call(te)}finally{if(F)throw F.error}}return!1}function gv(u,M,N){var R,P,F,D,Z,H,j,X=N.store.active;if(X){try{for(var Q=Ue(n.gameplay.filter(function(He){var rt;return He.kind==="collider"&&((rt=w.get(He.componentId))===null||rt===void 0?void 0:rt.sceneId)===W})),J=Q.next();!J.done;J=Q.next()){var $=J.value,te=w.get($.componentId);try{for(var q=(F=void 0,Ue(di(te))),ce=q.next();!ce.done;ce=q.next()){var de=ce.value;!fi(de)||X.hitIds.has(de.id)||Mp(u,M,Wf(de,$.parameters.shape))&&(X.hitIds.add(de.id),St(Gn("sliceHit",de)))}}catch(He){F={error:He}}finally{try{ce&&!ce.done&&(D=q.return)&&D.call(q)}finally{if(F)throw F.error}}}}catch(He){R={error:He}}finally{try{J&&!J.done&&(P=Q.return)&&P.call(Q)}finally{if(R)throw R.error}}try{for(var me=Ue(pe),_e=me.next();!_e.done;_e=me.next()){var ye=_e.value;if(!(ye.broken||!ye.breakable||X.hitIds.has(ye.key))){var Ae=gn.get(ye.bodyId),Ee=Xe(ye.anchorId);if(!(!Ae||!Ee)){var Le=gi(Ee);Jh(u,M,{x:Le.x,y:Le.y},{x:Ae.x,y:Ae.y})&&(X.hitIds.add(ye.key),ye.broken=!0,Fa.add(ye.key),St({kind:"jointBreak",behaviorId:ye.id,componentId:ye.componentId,selfInstanceId:ye.bodyId,instanceId:(j=Xe(ye.bodyId))===null||j===void 0?void 0:j.instanceId}))}}}}catch(He){Z={error:He}}finally{try{_e&&!_e.done&&(H=me.return)&&H.call(me)}finally{if(Z)throw Z.error}}}}function yv(u,M){var N,R=M.last,P=M.behavior.parameters;if(P.inkVariableId){var F=P.inkVariableId,D=Math.hypot(u.x-R.x,u.y-R.y);if(((N=O[F])!==null&&N!==void 0?N:0)<D)return;O[F]-=D}M.store.add(u)&&(P.mode==="slice-blade"&&gv(R,u,M),M.last=u)}function xv(u){var M,N;if(!(!ge||ge.pointerId!==u.pointerId)){var R=ge;ge=void 0;try{!((M=e.hasPointerCapture)===null||M===void 0)&&M.call(e,u.pointerId)&&((N=e.releasePointerCapture)===null||N===void 0||N.call(e,u.pointerId))}catch{}if(R.kind==="stroke"){var P=R.store.end(),F=R.behavior.parameters;if(P){if(F.mode==="physics-wall"){var D=new Set(R.store.strokes.map(function(H){return H.id}));ve=ve.filter(function(H){return H.owner!==R.c.id||D.has(H.strokeId)}),ve.push.apply(ve,Ze([],Ne(bp(P,F.strokeWidth).map(function(H){return xt(xt({},H),{owner:R.c.id})})),!1))}else if(F.mode==="path-trace"){var Z=Xe(F.followComponentId);Z&&P.points.length>1&&Pr.set(Z.id,{points:P.points,index:1,speed:F.followSpeed})}}St({kind:"strokeEnd",componentId:R.c.id})}}}function _v(u){var M,N,R,P;try{for(var F=Ue(or.values()),D=F.next();!D.done;D=F.next()){var Z=D.value;Z.tick(u)}}catch(ye){M={error:ye}}finally{try{D&&!D.done&&(N=F.return)&&N.call(F)}finally{if(M)throw M.error}}try{for(var H=Ue(Pr),j=H.next();!j.done;j=H.next()){var X=Ne(j.value,2),Q=X[0],J=X[1],$=Xe(Q);if(!$){Pr.delete(Q);continue}var te=J.points[J.index];if(!te){Pr.delete(Q),St(Gn("pathArrive",$));continue}var q=gi($),ce=te.x-q.x,de=te.y-q.y,me=Math.hypot(ce,de),_e=J.speed*u;me<=_e?(ir($,te.x,te.y),J.index++):me>.001&&ir($,q.x+ce/me*_e,q.y+de/me*_e)}}catch(ye){R={error:ye}}finally{try{j&&!j.done&&(P=H.return)&&P.call(H)}finally{if(R)throw R.error}}}function Mv(u,M,N){var R,P,F=[],D=[],Z=function(Q){var J=w.get(Q.componentId),$=Q.parameters.dragMode==="anywhere"?di(J).find(function(ce){return fi(ce)}):N.find(function(ce){var de;return((de=ce.prototypeId)!==null&&de!==void 0?de:ce.id)===J.id});if(!$)return"continue";if(Q.kind==="swipe-input")D.push({behavior:Q,c:$});else{var te=Q.parameters,q=Math.max(te.min,Math.min(te.max,Number(O[te.variableId])));O[te.variableId]=q,F.push({behavior:Q,c:$,charge:dp(te,q)}),St(Gn("holdStart",$))}};try{for(var H=Ue(n.gameplay.filter(function(Q){var J;return["swipe-input","hold-charge"].includes(Q.kind)&&((J=w.get(Q.componentId))===null||J===void 0?void 0:J.sceneId)===W})),j=H.next();!j.done;j=H.next()){var X=j.value;Z(X)}}catch(Q){R={error:Q}}finally{try{j&&!j.done&&(P=H.return)&&P.call(H)}finally{if(R)throw R.error}}(F.length||D.length)&&(Cn={pointerId:u.pointerId,start:M,current:M,holds:F,swipes:D})}function Sv(u,M){var N,R,P,F,D,Z,H,j;if(!(!Cn||Cn.pointerId!==u.pointerId)){var X=Cn,Q=new Set;Cn=void 0;try{for(var J=Ue(Ze(Ze([],Ne(X.holds),!1),Ne(X.swipes),!1)),$=J.next();!$.done;$=J.next()){var te=$.value,q=te.behavior,ce=te.c;Q.has(q.componentId)||(Q.add(q.componentId),St(Gn("pointerUp",ce,void 0,{targetId:ce.id,pointerId:u.pointerId})))}}catch(qe){N={error:qe}}finally{try{$&&!$.done&&(R=J.return)&&R.call(J)}finally{if(N)throw N.error}}try{for(var de=Ue(X.holds),me=de.next();!me.done;me=de.next()){var _e=me.value,ye=_e.behavior.parameters;if(St(Gn("holdRelease",_e.c)),ye.resetOnRelease!==!1){var Ae=O[ye.variableId];O[ye.variableId]=ye.min,Ae!==ye.min&&St({kind:"variableChange",variableId:ye.variableId,selfInstanceId:(H=_e.c.instanceId)!==null&&H!==void 0?H:_e.c.id,instanceId:_e.c.instanceId})}}}catch(qe){P={error:qe}}finally{try{me&&!me.done&&(F=de.return)&&F.call(de)}finally{if(P)throw P.error}}try{for(var Ee=Ue(X.swipes),Le=Ee.next();!Le.done;Le=Ee.next()){var He=Le.value,rt=hp(X.start,M,He.behavior.parameters.minDistancePx,(j=wn.get(He.behavior.id))!==null&&j!==void 0?j:-1/0,De*1e3,He.behavior.parameters.cooldownMs);rt&&(wn.set(He.behavior.id,De*1e3),St(Gn("swipe",He.c,void 0,{direction:rt})))}}catch(qe){D={error:qe}}finally{try{Le&&!Le.done&&(Z=Ee.return)&&Z.call(Ee)}finally{if(D)throw D.error}}return Q}}var qf=function(u){var M,N,R,P,F,D,Z,H,j,X,Q,J;E();var $=Uh(u),te=Ql($);if(se=$,!(!te&&h)){if(h){te&&(Qt=te.c.id,y((F=te.c.prototypeId)!==null&&F!==void 0?F:te.c.id));return}if(!(!u.isTrusted||u.button!==void 0&&u.button!==0||u.isPrimary===!1||Fe||gt||Ve&&Ve.pointerId!==u.pointerId||Cn&&Cn.pointerId!==u.pointerId||Dt&&Dt.pointerId!==u.pointerId||Be&&Be.pointerId!==u.pointerId||p&&(!we||!Je))){var q=!Se;Me=De,ke=!0,Se=!0,Oh(!0),q&&!ut&&(ft=Ot=0,xa());var ce=te?jl(te.c):[];if(vv(u,$,ce)){xa(),Zi();return}Mv(u,$,ce);var de=tt&&!ce.some(function(Pt){return Pt.contract==="native.button.v1"})?n.gameplay.find(function(Pt){var it;return Pt.kind==="aim-launch-3d"&&((it=w.get(Pt.componentId))===null||it===void 0?void 0:it.sceneId)===W}):void 0;if(de){var me=w.get(de.componentId),_e=Gt("physics-3d",me.id),ye=_e?Bs(me,_e):void 0,Ae=Do(me.id),Ee=de.parameters.dragMode==="anywhere"||Ae&&Math.hypot($.x-Ae.x,$.y-Ae.y)<=de.parameters.hitRadiusPx;if(ye&&ye.atRest&&!ye.captured&&Ee){Be={behavior:de,targetId:me.id,sourceId:me.id,stageId:de.parameters.stageId,pointerId:u.pointerId,start:$,current:$,power:0},zf($),(D=e.setPointerCapture)===null||D===void 0||D.call(e,u.pointerId);return}}var Le=n.gameplay.find(function(Pt){return Pt.kind==="aim-launch"&&w.get(Pt.componentId).sceneId===W&&(Pt.parameters.dragMode==="anywhere"&&!ce.some(function(it){return it.contract==="native.button.v1"})||ce.some(function(it){var Ct;return((Ct=it.prototypeId)!==null&&Ct!==void 0?Ct:it.id)===Pt.componentId}))});if(Le){var He=w.get(Le.componentId),rt=(Z=ce.find(function(it){var Ct;return((Ct=it.prototypeId)!==null&&Ct!==void 0?Ct:it.id)===He.id}))!==null&&Z!==void 0?Z:di(He).find(function(it){return fi(it)}),ye=rt&&Kn(rt,Gt("physics-body",He.id));if(ye&&(!Le.parameters.onlyWhenAtRest||ye.atRest)){Dt={behavior:Le,targetId:rt.id,sourceId:He.id,pointerId:u.pointerId,start:$,current:$,power:0},Xf($),(H=e.setPointerCapture)===null||H===void 0||H.call(e,u.pointerId),Zi();return}}try{for(var qe=Ue(ce),Tt=qe.next();!Tt.done;Tt=qe.next()){var lt=Tt.value,Nt=Gt("press-feedback",(j=lt.prototypeId)!==null&&j!==void 0?j:lt.id);Nt&&(lt.contract!=="native.button.v1"||wt(lt).enabled)&&Ge.set(lt.id,{behavior:Nt.parameters,pointerId:u.pointerId,held:!0})}}catch(Pt){M={error:Pt}}finally{try{Tt&&!Tt.done&&(N=qe.return)&&N.call(qe)}finally{if(M)throw M.error}}var Vt=ce.find(function(Pt){var it;return((it=Ye.get(Pt.id))===null||it===void 0?void 0:it.sceneId)===W});if(Vt){var ct=at.get(Vt.parentId);if(ct?.snapshot().busy)return;Q0(Vt),ct&&!ct.snapshot().busy&&(dn={pointerId:u.pointerId,boardId:Vt.parentId,tileId:Vt.id,start:$},(X=e.setPointerCapture)===null||X===void 0||X.call(e,u.pointerId))}en=(Q=ce.find(function(Pt){return Pt.contract==="native.button.v1"&&wt(Pt).enabled}))===null||Q===void 0?void 0:Q.id,Bt=en?u.pointerId:void 0;var Jt=n.gameplay.find(function(Pt){return Pt.kind==="drag"&&ce.some(function(it){var Ct;return((Ct=it.prototypeId)!==null&&Ct!==void 0?Ct:it.id)===Pt.componentId})});if(Jt){var lt=ce.find(function(it){var Ct;return((Ct=it.prototypeId)!==null&&Ct!==void 0?Ct:it.id)===Jt.componentId}),Kt=gi(lt),Mt=ln.zoneOf(lt.id);Rr.set(lt.id,Kt),ln.release(lt.id),Ve={b:Jt,targetId:lt.id,start:$,current:$,origin:Kt,originZone:Mt,m:Ze([],Ne(rn(lt)),!1),pointerId:u.pointerId},St(Gn("dragStart",lt)),e.setPointerCapture(u.pointerId)}ft=Ot=0,ut=!1;try{for(var Qe=Ue(ce),zt=Qe.next();!zt.done;zt=Qe.next()){var lt=zt.value;(lt.contract!=="native.button.v1"||wt(lt).enabled)&&St({kind:"click",componentId:(J=lt.prototypeId)!==null&&J!==void 0?J:lt.id,instanceId:lt.instanceId,targetId:lt.id,pointerId:u.pointerId})}}catch(Pt){R={error:Pt}}finally{try{zt&&!zt.done&&(P=Qe.return)&&P.call(Qe)}finally{if(R)throw R.error}}xa(),Zi()}}};function Yf(u,M){if(!dn||dn.pointerId!==u.pointerId)return!1;if(!u.isTrusted||!nn())return!0;var N=dn,R=at.get(N.boardId);if(R.snapshot().busy)return dn=void 0,!0;var P=qr(Bn(w.get(N.boardId))),F=En(P,N.start.x,N.start.y),D=En(P,M.x,M.y),Z=D.x-F.x,H=D.y-F.y,j=w.get(N.tileId);if(Math.max(Math.abs(Z),Math.abs(H))<Math.min(j.parameters.width,j.parameters.height)*.35)return!0;var X=Ye.get(j.id),Q=Math.abs(Z)>Math.abs(H),J=X.row+(Q?0:Math.sign(H)),$=X.column+(Q?Math.sign(Z):0),te=Ze([],Ne(Ye),!1).find(function(q){var ce=Ne(q,2),de=ce[1];return de.boardId===N.boardId&&de.row===J&&de.column===$});return te&&R.swap(j.id,te[0])&&(kt=void 0,Zi()),dn=void 0,!0}var Zf=function(u){var M,N;if(!Fe){E();var R=Y(),P=Uh(u);if(se=P,Cn?.pointerId===u.pointerId&&(Cn.current=P),ge?.pointerId===u.pointerId){if(ge.kind==="mask"){var F=ge,D=En(qr(Bn(F.c)),P.x,P.y);za(F.c,F.behavior).stampSegment(F.last,D),F.last=D}else yv(P,ge);xa(),Zi();return}if(Be?.pointerId===u.pointerId){u.isTrusted&&nn()&&zf(P);return}if(Dt?.pointerId===u.pointerId){u.isTrusted&&nn()&&Xf(P),Zi();return}var Z=Ql(P);if(fn=Z?(M=jl(Z.c).find(function(qe){return qe.contract==="native.button.v1"}))===null||M===void 0?void 0:M.id:void 0,!Yf(u,P)&&!(!Ve||Ve.pointerId!==u.pointerId)){var H=Xe(Ve.targetId);if(!H){Tn();return}var j=H.parentId?Bn(Xe(H.parentId)):ra(),X=qr(j),Q=En(X,Ve.start.x,Ve.start.y),J=En(X,P.x,P.y),$=Ze([],Ne(Ve.m),!1),te=Ve.b.parameters.axis;if(te!=="y"){var q=Ve.m[4]+J.x-Q.x;Number.isFinite(Ve.b.parameters.minX)&&(q=Math.max(Ve.b.parameters.minX,q)),Number.isFinite(Ve.b.parameters.maxX)&&(q=Math.min(Ve.b.parameters.maxX,q)),$[4]=q}if(te!=="x"){var ce=Ve.m[5]+J.y-Q.y;Number.isFinite(Ve.b.parameters.minY)&&(ce=Math.max(Ve.b.parameters.minY,ce)),Number.isFinite(Ve.b.parameters.maxY)&&(ce=Math.min(Ve.b.parameters.maxY,ce)),$[5]=ce}if(!H.parentId)te!=="y"&&($[4]=Math.max(0,Math.min(R.width-H.parameters.width,$[4])));else{var de=Yi(H,Hs(j,$)),me=0;de.left<0||de.right-de.left>R.width?me=-de.left:de.right>R.width&&(me=R.width-de.right);var _e=te==="y"?0:j[0],ye=te==="x"?0:j[2];Math.abs(_e)>=Math.abs(ye)&&Math.abs(_e)>1e-8?$[4]+=me/_e:Math.abs(ye)>1e-8&&($[5]+=me/ye)}var Ae=(N=Pe.get(H.id))!==null&&N!==void 0?N:{parameters:{}};Pe.set(H.id,xt(xt({},Ae),{transform:$})),Ve.current=P;var Ee=Rh(H),Le=Ee.zones,He=Ee.tag,rt=hc({itemId:H.id,tag:He,zones:Le,occupancy:ln});C=rt&&rt.kind!=="reject"?rt.zone:void 0}}},Jf=function(u){var M,N,R,P,F;E();var D=Uh(u),Z=G;se=D,xv(u);var H=(R=Sv(u,D))!==null&&R!==void 0?R:new Set;if(j0(u),u.isTrusted&&nn()){var j=Ql(D);try{for(var X=Ue(j?jl(j.c):[]),Q=X.next();!Q.done;Q=X.next()){var J=Q.value;!H.has((P=J.prototypeId)!==null&&P!==void 0?P:J.id)&&(J.contract!=="native.button.v1"||wt(J).enabled)&&St(Gn("pointerUp",J,void 0,{targetId:J.id,pointerId:u.pointerId}))}}catch(me){M={error:me}}finally{try{Q&&!Q.done&&(N=X.return)&&N.call(X)}finally{if(M)throw M.error}}}if(xa(),Zi(),Be?.pointerId===u.pointerId){var $=Be,te=Bf(),q=Ke.get($.targetId);(F=tt?.getStage(w.get($.stageId)))===null||F===void 0||F.setGuide([]),Be=void 0,$.behavior.parameters.powerVariableId&&(O[$.behavior.parameters.powerVariableId]=0);var ce=Math.hypot(te.vx,te.vz);u.isTrusted&&Oh(!0),q&&u.isTrusted&&nn()&&te.pull>=$.behavior.parameters.minPullPx&&ce>=$.behavior.parameters.minSpeed&&(q.vx=te.vx,q.vy=0,q.vz=te.vz,q.atRest=!1,q.restElapsed=0,q.movingTime=0,q.captured=!1,q.lastSafe={x:q.x,y:q.y,z:q.z},St({kind:"launch",componentId:$.sourceId})),Sn(u),xa();return}if(Dt?.pointerId===u.pointerId){var $=Dt,te=Fh(),q=gn.get($.targetId);Dt=void 0,$.behavior.parameters.powerVariableId&&(O[$.behavior.parameters.powerVariableId]=0),q&&u.isTrusted&&nn()&&te.pull>=$.behavior.parameters.minPullPx&&(q.vx=te.vx,q.vy=te.vy,q.atRest=!1,q.restElapsed=0,q.captured=!1,q.exited=!1,St({kind:"launch",componentId:$.sourceId,instanceId:q.instanceId})),Sn(u),xa(),Zi();return}if(Yf(u,D),dn?.pointerId===u.pointerId&&(dn=void 0),Sn(u),!(Z?.pointerId!==u.pointerId||!u.isTrusted||!nn()||navigator.userActivation&&navigator.userActivation.isActive!==!0||!ea(Z.condition))){var de=Ql(D);!de||!jl(de.c).some(function(me){return me.id===Z.targetId&&(me.contract!=="native.button.v1"||wt(me).enabled)})||(p?p.openStore(n.base.storeUrl):window.open(n.base.storeUrl,"_blank","noopener"))}},ec=function(u){var M,N;if(Be?.pointerId===u.pointerId&&Jn(u.pointerId),Dt?.pointerId===u.pointerId&&(Dt.behavior.parameters.powerVariableId&&(O[Dt.behavior.parameters.powerVariableId]=0),Dt=void 0),dn?.pointerId===u.pointerId&&(dn=void 0),ge?.pointerId===u.pointerId&&(ge.kind==="stroke"&&ge.store.cancel(),ge=void 0),Cn?.pointerId===u.pointerId){try{for(var R=Ue(Cn.holds),P=R.next();!P.done;P=R.next()){var F=P.value;F.behavior.parameters.resetOnRelease!==!1&&(O[F.behavior.parameters.variableId]=F.behavior.parameters.min)}}catch(D){M={error:D}}finally{try{P&&!P.done&&(N=R.return)&&N.call(R)}finally{if(M)throw M.error}}Cn=void 0}Sn(u)},$f=function(u){u?.isTrusted&&!h&&!Fe&&!gt&&Oh(!0)},Bh=function(){$e||Zi()},Ga=typeof globalThis.ResizeObserver=="function"?new globalThis.ResizeObserver(Bh):void 0;try{(s=Ga?.observe)===null||s===void 0||s.call(Ga,e)}catch{}var Kf=function(){Re=0,ze=0,document.hidden&&Yn(),pt&&(document.hidden?pt.suspend().catch(function(){}):!Fe&&Se&&Uo())};document.addEventListener("visibilitychange",Kf),(o=globalThis.addEventListener)===null||o===void 0||o.call(globalThis,"resize",Bh),e.addEventListener("pointerdown",qf),e.addEventListener("pointermove",Zf),e.addEventListener("pointerup",Jf),e.addEventListener("pointercancel",ec),e.addEventListener("lostpointercapture",ec),e.addEventListener("click",$f);var zh=p?.onVisibilityChanged(function(u){Je=u,Re=0,ze=0,u||Yn(),pt&&(u?!Fe&&Se&&Uo():pt.suspend().catch(function(){}))}),kh=p?.onClosed(function(){gt=!0,Re=0,ze=0,Yn(),_t()});function Qf(u){var M=!h&&!Fe&&!document.hidden&&we&&Je&&!gt;if(M&&ze&&(re+=Math.min((u-ze)/1e3,5/60)),nn()){ft=Ot=0,ut=!1,ze&&(Re+=Math.min((u-ze)/1e3,5/60));for(var N=0;N<5&&Re>=1/60;N++)av(1/60),Re-=1/60;xa()}else Re=0;ze=u,Zi(),tn=requestAnimationFrame(Qf)}return Ih(),h&&(W=d),Zi(),tn=requestAnimationFrame(Qf),p&&p.init().then(function(){$e||(we=!0,Je=p.isVisible(),Re=0,ze=0)}).catch(function(){$e||(gt=!0,Yn(),_t())}),{state:$n,auditViewport:dv,auditSceneLayout:fv,restart:function(){Ih(),Zi()},select:function(u){Qt=u},inspectScene:function(u){h&&n.scenes.some(function(M){return M.id===u})&&(W=u,Qt=void 0)},pause:function(u){Fe=u,Re=0,ze=0,u&&Yn(),pt&&(u?pt.suspend().catch(function(){}):Se&&Uo())},destroy:function(){var u,M;$e=!0,cancelAnimationFrame(tn),Yn(),_t(),tt?.dispose(),zh?.(),kh?.(),p?.destroy(),(u=Ga?.disconnect)===null||u===void 0||u.call(Ga),document.removeEventListener("visibilitychange",Kf),(M=globalThis.removeEventListener)===null||M===void 0||M.call(globalThis,"resize",Bh),e.removeEventListener("pointerdown",qf),e.removeEventListener("pointermove",Zf),e.removeEventListener("pointerup",Jf),e.removeEventListener("pointercancel",ec),e.removeEventListener("lostpointercapture",ec),e.removeEventListener("click",$f),pt?.close().catch(function(){})}}}return Uv(QS);})();
