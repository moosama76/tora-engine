var ToraNative=(()=>{var eh=Object.defineProperty;var ug=Object.getOwnPropertyDescriptor;var dg=Object.getOwnPropertyNames;var hg=Object.prototype.hasOwnProperty;var fg=(n,e)=>{for(var t in e)eh(n,t,{get:e[t],enumerable:!0})},pg=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of dg(e))!hg.call(n,r)&&r!==t&&eh(n,r,{get:()=>e[r],enumerable:!(i=ug(e,r))||i.enumerable});return n};var mg=n=>pg(eh({},"__esModule",{value:!0}),n);var Jb={};fg(Jb,{computeSafeArea:()=>Qf,createNetworkBridge:()=>xv,layoutStandardText:()=>_v,mountNative:()=>Zb});var Ep=function(n,e){if(!n)throw Error(e)},pa=function(){return[1,0,0,1,0,0]};function th(n){return Ep(Array.isArray(n)&&n.length===6&&n.every(Number.isFinite),"E_SCENE_MATRIX"),n}function Hs(n,e){return th(n),th(e),[n[0]*e[0]+n[2]*e[1],n[1]*e[0]+n[3]*e[1],n[0]*e[2]+n[2]*e[3],n[1]*e[2]+n[3]*e[3],n[0]*e[4]+n[2]*e[5]+n[4],n[1]*e[4]+n[3]*e[5]+n[5]]}function _r(n){th(n);var e=n[0]*n[3]-n[1]*n[2];return Ep(Math.abs(e)>1e-12,"E_SCENE_SINGULAR_TRANSFORM"),[n[3]/e,-n[1]/e,-n[2]/e,n[0]/e,(n[2]*n[5]-n[3]*n[4])/e,(n[1]*n[4]-n[0]*n[5])/e]}var ih=function(){return ih=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},ih.apply(this,arguments)},ma=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ms=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},nh=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Ap(n){var e=n.rows,t=n.columns,i=n.seed,r=n.slots,a=n.paint,s=n.onEvent,o=r.map(function(ue){return ue.group}),u=Ms([],ma(new Set(o)),!1),l=Ms([],ma(o),!1),d=i,h="idle",f=0,m,x,T=[],g=[],p=0,D=0,v=0,y,C,N=function(ue,fe){return ue*t+fe},O=function(ue){return Math.floor(ue/t)},S=function(ue){return ue%t},E=function(){return d=Math.imul(d,1664525)+1013904223>>>0,d/4294967296};function B(ue){for(var fe=new Set,Fe=0;Fe<e;Fe++)for(var ne=0;ne<t;ne++){var oe=N(Fe,ne),Ue=ue[oe];if(ne+2<t&&Ue===ue[oe+1]&&Ue===ue[oe+2])for(var Be=0;Be<3;Be++)fe.add(oe+Be);if(Fe+2<e&&Ue===ue[oe+t]&&Ue===ue[oe+t*2])for(var Be=0;Be<3;Be++)fe.add(oe+t*Be)}return Ms([],ma(fe),!1)}function F(ue,fe){var Fe;if(l[ue]===l[fe])return!1;var ne=Ms([],ma(l),!1);return Fe=ma([ne[fe],ne[ue]],2),ne[ue]=Fe[0],ne[fe]=Fe[1],B(ne).some(function(oe){return oe===ue||oe===fe})}function q(){for(var ue=[],fe=0;fe<l.length;fe++)S(fe)+1<t&&F(fe,fe+1)&&ue.push({from:r[fe].id,to:r[fe+1].id}),O(fe)+1<e&&F(fe,fe+t)&&ue.push({from:r[fe].id,to:r[fe+t].id});return ue}function b(){for(var ue=0;ue<64;ue++){l=[];for(var fe=function(ne){var oe=u.filter(function(Ue){return!(S(ne)>=2&&l[ne-1]===Ue&&l[ne-2]===Ue)&&!(O(ne)>=2&&l[ne-t]===Ue&&l[ne-t*2]===Ue)});l.push(oe[Math.floor(E()*oe.length)])},Fe=0;Fe<r.length;Fe++)fe(Fe);if(q().length)return}l=r.map(function(ne,oe){return u[(O(oe)*2+S(oe))%3]}),l[0]=u[0],l[1]=u[1],l[2]=u[0],l[t+1]=u[0]}function M(){for(var ue=0;ue<r.length;ue++)a(ue,l[ue],{})}function k(){d=i,l=Ms([],ma(o),!1),h="idle",f=0,m=void 0,x=void 0,T=[],g=[],p=0,D=0,v=0,y=void 0,C=void 0,(B(l).length||!q().length)&&b(),M()}function V(ue,fe){if(h!=="idle")return!1;var Fe=r.findIndex(function(oe){return oe.id===ue}),ne=r.findIndex(function(oe){return oe.id===fe});return Fe<0||ne<0||Math.abs(O(Fe)-O(ne))+Math.abs(S(Fe)-S(ne))!==1?!1:(m=void 0,y=void 0,M(),x=[Fe,ne],h="swap",f=0,!0)}function Q(ue){if(h==="idle"){if(m===ue){m=void 0;return}if(!(m&&V(m,ue)))return m=ue,m}}function j(){T=B(l),v+=T.length,C={group:l[T[0]],from:r[T[0]].id,count:T.length},s("matchClear"),h="clear",f=0}function W(){var ue=new Set(T),fe=Ms([],ma(l),!1);g=[];for(var Fe=0;Fe<t;Fe++){for(var ne=[],oe=e-1;oe>=0;oe--)ue.has(N(oe,Fe))||ne.push(N(oe,Fe));for(var Ue=0,oe=e-1;oe>=0;oe--){var Be=N(oe,Fe),ze=ne[e-1-oe];ze!==void 0?(fe[Be]=l[ze],g.push({cell:Be,from:ze,offsetRows:0})):(fe[Be]=u[Math.floor(E()*u.length)],g.push({cell:Be,from:Be,offsetRows:-(oe+1+Ue++)}))}}l=fe,h="fall",f=0}function Z(){if(B(l).length&&p<3){p++,j();return}(B(l).length||!q().length)&&b(),M(),h="idle",f=0,x=void 0,T=[],g=[],D++,s("validMatch")}function re(ue){var fe,Fe,ne,oe,Ue,Be,ze;if(h==="idle"){if(y){y.elapsed+=ue;var ht=1+.065*Math.sin(Math.min(1,y.elapsed/.8)*Math.PI*4),Gt=function(He){a(r.findIndex(function($e){return $e.id===He}),l[r.findIndex(function($e){return $e.id===He})],{scale:ht})};try{for(var ut=nh(y.ids),wt=ut.next();!wt.done;wt=ut.next()){var Zt=wt.value;Gt(Zt)}}catch(He){fe={error:He}}finally{try{wt&&!wt.done&&(Fe=ut.return)&&Fe.call(ut)}finally{if(fe)throw fe.error}}y.elapsed>=.8&&(y=void 0,M())}return}if(f+=ue,h==="swap"||h==="reverse"){var je=Math.min(1,f/.14),xt=je*je*(3-2*je),_t=ma(x,2),cn=_t[0],Pt=_t[1];if(a(cn,l[cn],{from:Pt,progress:h==="swap"?xt:1-xt}),a(Pt,l[Pt],{from:cn,progress:h==="swap"?xt:1-xt}),je<1)return;if(h==="reverse"){M(),h="idle",x=void 0,s("invalidMatch");return}if(!F(cn,Pt)){h="reverse",f=0;return}ne=ma([l[Pt],l[cn]],2),l[cn]=ne[0],l[Pt]=ne[1],M(),j();return}if(h==="clear"){var $t=Math.min(1,f/.18),ht=$t<.22?1+$t*.45:Math.max(.05,1.1*(1-$t)/.78);try{for(var ae=nh(T),hn=ae.next();!hn.done;hn=ae.next()){var qt=hn.value;a(qt,l[qt],{scale:ht,opacity:1-$t})}}catch($e){oe={error:$e}}finally{try{hn&&!hn.done&&(Ue=ae.return)&&Ue.call(ae)}finally{if(oe)throw oe.error}}$t===1&&W();return}var X=Math.min(1,f/.25),w=1-Math.pow(1-X,3);try{for(var le=nh(g),ve=le.next();!ve.done;ve=le.next()){var Me=ve.value;a(Me.cell,l[Me.cell],{from:Me.from,offsetRows:Me.offsetRows,progress:1-w})}}catch(He){Be={error:He}}finally{try{ve&&!ve.done&&(ze=le.return)&&ze.call(le)}finally{if(Be)throw Be.error}}X===1&&Z()}function ye(){if(h==="idle"){m=void 0;var ue=q()[0];ue&&(y={ids:[ue.from,ue.to],elapsed:0})}}function Se(){var ue;return{phase:h,busy:h!=="idle",selected:m??null,moves:D,cleared:v,groups:Ms([],ma(l),!1),legalMoves:h==="idle"?q():[],hint:(ue=y?.ids)!==null&&ue!==void 0?ue:[],lastMatch:C?ih({},C):null}}return{reset:k,select:Q,swap:V,tick:re,showHint:ye,snapshot:Se,cancelSelection:function(){m=void 0,y&&(y=void 0,M())}}}var gc=function(){return gc=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},gc.apply(this,arguments)},Ip=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},vg=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Cp=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Rp(){var n=new Map,e=new Map,t=function(r){var a,s,o=e.get(r);o!==void 0&&((a=n.get(o))===null||a===void 0||a.delete(r),((s=n.get(o))===null||s===void 0?void 0:s.size)===0&&n.delete(o)),e.delete(r)},i=function(r,a){t(r),a!=null&&(n.has(a)||n.set(a,new Set),n.get(a).add(r),e.set(r,a))};return{occupants:n,itemZone:e,release:t,place:i,clear:function(){n.clear(),e.clear()},items:function(r){var a;return vg([],Ip((a=n.get(r))!==null&&a!==void 0?a:[]),!1).sort()},zoneOf:function(r){return e.get(r)},snapshot:function(){return{itemZone:Object.fromEntries(e)}}}}function yc(n){var e,t,i=n.itemId,r=n.tag,a=r===void 0?"":r,s=n.zones,o=n.occupancy,u=s.filter(function(x){var T,g,p;return x.id!==i&&(((g=(T=x.acceptTags)===null||T===void 0?void 0:T.length)!==null&&g!==void 0?g:0)===0||((p=x.acceptTags)===null||p===void 0?void 0:p.includes(a)))});u.sort(function(x,T){return Number(T.itemTarget)-Number(x.itemTarget)||T.paintOrder-x.paintOrder||x.distance-T.distance||x.id.localeCompare(T.id)});try{for(var l=Cp(u),d=l.next();!d.done;d=l.next()){var h=d.value,f=o.items(h.id).filter(function(x){return x!==i}),m=h.capacity>0&&f.length>=h.capacity;return h.snapMode==="reject"?{kind:"reject",zone:h,occupantId:f[0]}:m?h.onOccupied==="emit"?{kind:"emit",zone:h,occupantId:f[0]}:h.onOccupied==="swap"&&f.length?{kind:"swap",zone:h,occupantId:f[0]}:{kind:"reject",zone:h,occupantId:f[0]}:{kind:"accept",zone:h}}}catch(x){e={error:x}}finally{try{d&&!d.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}return null}function Pp(n,e,t,i,r,a){if(t===void 0&&(t=28),i===void 0&&(i=-1/0),r===void 0&&(r=0),a===void 0&&(a=80),r-i<a)return null;var s=e.x-n.x,o=e.y-n.y;return Math.max(Math.abs(s),Math.abs(o))<t?null:Math.abs(s)>Math.abs(o)?s<0?"left":"right":o<0?"up":"down"}function Lp(n,e){var t=e,i=1;return{tick:function(r){return n.pingPong?(t+=i*n.ratePerSecond*r,t>=n.max?(t=n.max,i=-1):t<=n.min&&(t=n.min,i=1)):t=Math.max(n.min,Math.min(n.max,t+n.ratePerSecond*r)),t}}}function Dp(){var n=new Map;return{to:function(e,t,i,r,a){r===void 0&&(r=.18),n.set(e,{from:gc({},t),to:gc({},i),seconds:Math.max(.02,r),elapsed:0,onDone:a})},cancel:function(e){n.delete(e)},clear:function(){n.clear()},tick:function(e,t){var i,r,a;try{for(var s=Cp(n),o=s.next();!o.done;o=s.next()){var u=Ip(o.value,2),l=u[0],d=u[1];d.elapsed+=e;var h=Math.min(1,d.elapsed/d.seconds),f=1-Math.pow(1-h,3);t(l,{x:d.from.x+(d.to.x-d.from.x)*f,y:d.from.y+(d.to.y-d.from.y)*f}),h===1&&(n.delete(l),(a=d.onDone)===null||a===void 0||a.call(d))}}catch(m){i={error:m}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}}}}function rh(n,e,t,i){t===void 0&&(t=56),i===void 0&&(i=.12);var r=Math.max(1,t),a=e.x-n.x,s=e.y-n.y,o=Math.hypot(a,s),u=Math.min(o,r),l=u/r,d=o>1e-6?a/o:0,h=o>1e-6?s/o:0,f=n.x+d*u,m=n.y+h*u;if(l<=i)return{nx:0,ny:0,magnitude:0,angle:0,knobX:f,knobY:m};var x=(l-i)/Math.max(1e-6,1-i);return{nx:d*x,ny:h*x,magnitude:x,angle:Math.atan2(h,d)*180/Math.PI,knobX:f,knobY:m}}var ah=function(){return ah=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},ah.apply(this,arguments)},Np=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Up(n){var e,t,i=2166136261;try{for(var r=Np(String(n)),a=r.next();!a.done;a=r.next()){var s=a.value;i^=s.codePointAt(0),i=Math.imul(i,16777619)}}catch(o){e={error:o}}finally{try{a&&!a.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return i>>>0||1}function gg(n){var e=n>>>0||1,t=e;return{next:function(){return t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296},between:function(i,r,a){if(a===void 0&&(a=!1),a){var s=Math.ceil(i),o=Math.floor(r);return o<s?s:Math.min(o,s+Math.floor((o-s+1)*this.next()))}return i+(r-i)*this.next()},reset:function(){t=e}}}function Fp(n,e,t,i,r){var a,s;i===void 0&&(i=0);var o=null,u=1/0;try{for(var l=Np(e),d=l.next();!d.done;d=l.next()){var h=d.value;if(!(h.id===r||h.team!==t)){var f=Math.hypot(h.x-n.x,h.y-n.y);i>0&&f>i||(f<u||f===u&&h.id<o?.id)&&(o=h,u=f)}}}catch(m){a={error:m}}finally{try{d&&!d.done&&(s=l.return)&&s.call(l)}finally{if(a)throw a.error}}return o}function Op(n,e,t){var i=((e-n+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return n+Math.max(-t,Math.min(t,i))}function Bp(n){var e=gg(n),t=new Map,i=new Map;return{rng:e,states:t,headings:i,reset:function(){e.reset(),t.clear(),i.clear()},initialize:function(r,a){var s;return t.has(r)||t.set(r,{hp:a.hp,maxHp:a.maxHp,value:a.value,tag:(s=a.tag)!==null&&s!==void 0?s:"",team:a.team}),t.get(r)},remove:function(r){t.delete(r),i.delete(r)},snapshot:function(r){var a=t.get(r);return a?ah({},a):void 0}}}function kp(n,e){var t,i,r,a,s=e===void 0?{}:e,o=s.width,u=s.height,l=s.onProgress,d=l===void 0?function(){}:l,h=s.onComplete,f=h===void 0?function(){}:h,m=s.canvasFactory,x=s.source,T=n,g=T.gridSize,p=new Uint8Array(g*g),D=0,v=!1,y=-1,C=!1,N=Math.max(1,o),O=Math.max(1,u),S=Math.min(1,512/Math.max(N,O)),E=(t=m?.())!==null&&t!==void 0?t:!((i=globalThis.document)===null||i===void 0)&&i.createElement?globalThis.document.createElement("canvas"):void 0;E&&(E.width=Math.max(1,Math.round(N*S)),E.height=Math.max(1,Math.round(O*S)));var B=(r=E?.getContext)===null||r===void 0?void 0:r.call(E,"2d"),F=(a=T.maskColor)!==null&&a!==void 0?a:"#dceeff",q=function(){return!!(x&&x.complete&&x.naturalWidth>0)},b=function(){B&&(B.globalCompositeOperation="source-over",B.clearRect(0,0,E.width,E.height),T.mode==="erase"&&(q()?(B.drawImage(x,0,0,E.width,E.height),C=!0):(B.fillStyle=F,B.fillRect(0,0,E.width,E.height),C=!1)))};b();var M=function(){if(!v){var V=Math.round(D/p.length*100),Q=Math.min(100,V);Q!==y&&(y=Q,d(Q)),Q>=T.targetPercent&&(v=!0,f(Q))}},k=function(V,Q){for(var j=Math.max(0,Math.min(g-1,Math.floor(V/N*g))),W=Math.max(0,Math.min(g-1,Math.floor(Q/O*g))),Z=Math.max(0,Math.ceil(T.brushRadiusPx/N*g)),re=Math.max(0,Math.ceil(T.brushRadiusPx/O*g)),ye=Math.max(0,W-re);ye<=Math.min(g-1,W+re);ye++)for(var Se=Math.max(0,j-Z);Se<=Math.min(g-1,j+Z);Se++)if(!(Math.hypot((Se+.5)/g*N-V,(ye+.5)/g*O-Q)>T.brushRadiusPx)){var ue=ye*g+Se;p[ue]||(p[ue]=1,D++)}B&&(B.save(),B.scale(S,S),B.globalCompositeOperation=T.mode==="erase"?"destination-out":"source-over",B.fillStyle=F,B.beginPath(),B.arc(V,Q,T.brushRadiusPx,0,Math.PI*2),B.fill(),T.mode==="reveal"&&x&&(B.globalCompositeOperation="source-in",B.drawImage(x,0,0,N,O)),B.restore()),M()};return{canvas:E,stampSegment:function(V,Q){for(var j=Math.hypot(Q.x-V.x,Q.y-V.y),W=Math.max(1,Math.ceil(j/Math.max(1,T.brushRadiusPx*.45))),Z=0;Z<=W;Z++)k(V.x+(Q.x-V.x)*Z/W,V.y+(Q.y-V.y)*Z/W)},reset:function(){p.fill(0),D=0,v=!1,y=-1,b(),M()},get progress(){return Math.round(D/p.length*100)},render:function(V){T.mode==="erase"&&D===0&&!C&&q()&&b(),E?V.drawImage(E,0,0,E.width,E.height,0,0,o,u):T.mode==="erase"&&this.progress<100&&(V.save(),V.globalAlpha=1-this.progress/100,V.fillStyle=F,V.fillRect(0,0,o,u),V.restore())}}}var Ss=function(){return Ss=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Ss.apply(this,arguments)},yg=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function sh(n,e,t,i){var r=function(d,h,f){return(h.x-d.x)*(f.y-d.y)-(h.y-d.y)*(f.x-d.x)},a=r(n,e,t),s=r(n,e,i),o=r(t,i,n),u=r(t,i,e),l=1e-8;return Math.abs(a)<l&&Math.abs(s)<l&&Math.abs(o)<l&&Math.abs(u)<l?Math.max(Math.min(n.x,e.x),Math.min(t.x,i.x))<=Math.min(Math.max(n.x,e.x),Math.max(t.x,i.x))+l&&Math.max(Math.min(n.y,e.y),Math.min(t.y,i.y))<=Math.min(Math.max(n.y,e.y),Math.max(t.y,i.y))+l:a>0!=s>0&&o>0!=u>0}function zp(n,e){for(var t=!1,i=0,r=e.length-1;i<e.length;r=i++){var a=e[i],s=e[r];a.y>n.y!=s.y>n.y&&n.x<(s.x-a.x)*(n.y-a.y)/(s.y-a.y)+a.x&&(t=!t)}return t}function Vp(n,e,t){if(t.length>=3&&(zp(n,t)||zp(e,t)))return!0;for(var i=0;i<t.length;i++)if(sh(n,e,t[i],t[(i+1)%t.length]))return!0;return!1}function Gp(n){var e=n,t=[],i=null,r=0,a=function(s){return Ss(Ss({},s),{points:s.points.map(function(o){return Ss({},o)})})};return{begin:function(s){var o={id:++r,points:[Ss({},s)],age:0,hitIds:new Set};return i=o,t.push(o),t.length>e.maxStrokes&&t.shift(),o},add:function(s){if(!i||i.points.length>=e.maxPoints)return!1;var o=i.points[i.points.length-1];return Math.hypot(s.x-o.x,s.y-o.y)<e.minSegmentPx?!1:(i.points.push(Ss({},s)),!0)},end:function(){var s=i;return i=null,s?a(s):void 0},cancel:function(){i&&(t=t.filter(function(s){return s!==i})),i=null},clear:function(){i=null,t=[]},tick:function(s){var o,u;try{for(var l=yg(t),d=l.next();!d.done;d=l.next()){var h=d.value;h.age+=s}}catch(f){o={error:f}}finally{try{d&&!d.done&&(u=l.return)&&u.call(l)}finally{if(o)throw o.error}}t=t.filter(function(f){return f===i||f.age<.18||e.mode!=="slice-blade"})},get active(){return i},get strokes(){return t}}}function Hp(n,e){for(var t=[],i=1;i<n.points.length;i++){var r=n.points[i-1],a=n.points[i],s=Math.hypot(a.x-r.x,a.y-r.y);s<.001||t.push({id:"stroke-".concat(n.id,"-").concat(i),strokeId:n.id,mode:"static",shape:"box",x:(r.x+a.x)/2,y:(r.y+a.y)/2,width:s,height:Math.max(2,e),angle:Math.atan2(a.y-r.y,a.x-r.x),restitution:.8})}return t}var Jo=function(){return Jo=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Jo.apply(this,arguments)},Jp=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},$a=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},xg=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ua=function(n,e){return Math.hypot(n,e)},Wp=function(n,e,t){return Math.max(e,Math.min(t,n))},bs=function(n){return Math.max(1,Math.min(n.width,n.height)/2)};function Xp(n){var e,t,i=Math.cos((e=n.angle)!==null&&e!==void 0?e:0),r=Math.sin((t=n.angle)!==null&&t!==void 0?t:0),a=n.width/2,s=n.height/2;return[[-a,-s],[a,-s],[a,s],[-a,s]].map(function(o){var u=Jp(o,2),l=u[0],d=u[1];return{x:n.x+l*i-d*r,y:n.y+l*r+d*i}})}function _g(n,e){var t,i,r,a,s,o,u,l,d,h,f=Xp(n),m=Xp(e),x=[(u=n.angle)!==null&&u!==void 0?u:0,((l=n.angle)!==null&&l!==void 0?l:0)+Math.PI/2,(d=e.angle)!==null&&d!==void 0?d:0,((h=e.angle)!==null&&h!==void 0?h:0)+Math.PI/2],T=1/0,g=1,p=0;try{for(var D=$a(x),v=D.next();!v.done;v=D.next()){var y=v.value,C=Math.cos(y),N=Math.sin(y),O=1/0,S=-1/0,E=1/0,B=-1/0;try{for(var F=(r=void 0,$a(f)),q=F.next();!q.done;q=F.next()){var b=q.value,M=b.x*C+b.y*N;M<O&&(O=M),M>S&&(S=M)}}catch(j){r={error:j}}finally{try{q&&!q.done&&(a=F.return)&&a.call(F)}finally{if(r)throw r.error}}try{for(var k=(s=void 0,$a(m)),V=k.next();!V.done;V=k.next()){var b=V.value,M=b.x*C+b.y*N;M<E&&(E=M),M>B&&(B=M)}}catch(j){s={error:j}}finally{try{V&&!V.done&&(o=k.return)&&o.call(k)}finally{if(s)throw s.error}}var Q=Math.min(S,B)-Math.max(O,E);if(Q<=0)return null;Q<T&&(T=Q,g=C,p=N)}}catch(j){t={error:j}}finally{try{v&&!v.done&&(i=D.return)&&i.call(D)}finally{if(t)throw t.error}}return(n.x-e.x)*g+(n.y-e.y)*p<0&&(g=-g,p=-p),{nx:g,ny:p,penetration:T}}function Yp(n,e){var t,i,r,a=bs(n),s=-((t=e.angle)!==null&&t!==void 0?t:0),o=Math.cos(s),u=Math.sin(s),l=n.x-e.x,d=n.y-e.y,h=l*o-d*u,f=l*u+d*o,m=e.width/2,x=e.height/2,T=Wp(h,-m,m),g=Wp(f,-x,x),p=h-T,D=f-g,v=Ua(p,D),y;if(v>=a)return null;if(v<1e-4){var C=[{d:m-Math.abs(h),x:h>=0?1:-1,y:0},{d:x-Math.abs(f),x:0,y:f>=0?1:-1}].sort(function(S,E){return S.d-E.d});p=C[0].x,D=C[0].y,y=a+C[0].d}else p/=v,D/=v,y=a-v;var N=Math.cos((i=e.angle)!==null&&i!==void 0?i:0),O=Math.sin((r=e.angle)!==null&&r!==void 0?r:0);return{nx:p*N-D*O,ny:p*O+D*N,penetration:y}}function qp(n,e){var t;return!!(n.ignoreGroup&&n.ignoreGroup!=="none"&&(n.ignoreGroup==="all"||n.ignoreGroup===((t=e.collisionGroup)!==null&&t!==void 0?t:"all")))}function Zp(n,e,t){var i,r,a,s,o,u;if(!(n.captured||e.captured||qp(n,e)||qp(e,n))){var l=n.x-e.x,d=n.y-e.y,h;if(n.shape==="circle"&&e.shape==="circle"){var f=Ua(l,d),m=bs(n)+bs(e)-f;if(m<=0)return;h=m,f>1e-4?(l/=f,d/=f):(l=1,d=0)}else if(n.shape==="circle"&&e.shape==="box"){var x=Yp(n,e);if(!x)return;l=x.nx,d=x.ny,h=x.penetration}else if(n.shape==="box"&&e.shape==="circle"){var x=Yp(e,n);if(!x)return;l=-x.nx,d=-x.ny,h=x.penetration}else if(n.shape==="box"&&e.shape==="box"){var x=_g(n,e);if(!x)return;l=x.nx,d=x.ny,h=x.penetration}else return;var T=n.mode==="dynamic"?1/((i=n.mass)!==null&&i!==void 0?i:1):0,g=e.mode==="dynamic"?1/((r=e.mass)!==null&&r!==void 0?r:1):0,p=T+g;if(p){n.x+=l*h*T/p,n.y+=d*h*T/p,e.mode==="dynamic"&&(e.x-=l*h*g/p,e.y-=d*h*g/p);var D=n.vx-((a=e.vx)!==null&&a!==void 0?a:0),v=n.vy-((s=e.vy)!==null&&s!==void 0?s:0),y=D*l+v*d;if(!(y>=0)){var C=Math.max((o=n.restitution)!==null&&o!==void 0?o:0,(u=e.restitution)!==null&&u!==void 0?u:0),N=-(1+C)*y/p;n.vx+=l*N*T,n.vy+=d*N*T,e.mode==="dynamic"&&(e.vx-=l*N*g,e.vy-=d*N*g),n.atRest=!1,n.restElapsed=0,e.mode==="dynamic"&&(e.atRest=!1,e.restElapsed=0),Math.abs(y)>4&&(t("bodyBounce",n,e,{speed:Math.abs(y)}),e.mode==="dynamic"&&t("bodyBounce",e,n,{speed:Math.abs(y)}))}}}}function Mg(n,e,t,i){var r,a;if(!(n.mode!=="dynamic"||n.captured))try{for(var s=$a(e),o=s.next();!o.done;o=s.next()){var u=o.value,l=u.x-n.x,d=u.y-n.y,h=Ua(l,d);if(!(h>=u.radius*2.5)){if(h>u.radius&&h>.001&&u.pullStrength>0){var f=u.pullStrength*(1-h/(u.radius*2.5));n.vx+=l/h*f*t,n.vy+=d/h*f*t}if(h<u.radius&&Ua(n.vx,n.vy)<=u.maxCaptureSpeed){n.captured=!0,n.atRest=!0,n.vx=u.stopBody?0:n.vx,n.vy=u.stopBody?0:n.vy,u.stopBody&&(n.x=u.x,n.y=u.y),i("zoneCapture",n,u,{});return}}}}catch(m){r={error:m}}finally{try{o&&!o.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}}function Sg(n,e){var t,i,r,a,s,o,u=function(f){if(f.broken)return"continue";var m=e.find(function(O){return O.id===f.bodyId}),x=e.find(function(O){return O.id===f.anchorId});if(!m||m.mode!=="dynamic")return"continue";var T=(a=(r=x?.x)!==null&&r!==void 0?r:f.x)!==null&&a!==void 0?a:0,g=(o=(s=x?.y)!==null&&s!==void 0?s:f.y)!==null&&o!==void 0?o:0,p=m.x-T,D=m.y-g,v=Ua(p,D);if(v<=f.lengthPx||v<1e-4)return"continue";var y=p/v,C=D/v;m.x=T+y*f.lengthPx,m.y=g+C*f.lengthPx;var N=m.vx*y+m.vy*C;N>0&&(m.vx-=y*N,m.vy-=C*N)};try{for(var l=$a(n),d=l.next();!d.done;d=l.next()){var h=d.value;u(h)}}catch(f){t={error:f}}finally{try{d&&!d.done&&(i=l.return)&&i.call(l)}finally{if(t)throw t.error}}}function oh(n){for(var e,t,i,r,a,s,o,u,l,d,h,f=n.bodies,m=n.zones,x=m===void 0?[]:m,T=n.joints,g=T===void 0?[]:T,p=n.bounds,D=n.dt,v=n.onEvent,y=v===void 0?function(){}:v,C=f.filter(function(ne){return ne.mode==="dynamic"&&!ne.captured}),N=C.reduce(function(ne,oe){return Math.max(ne,Ua(oe.vx,oe.vy))},0),O=C.reduce(function(ne,oe){return Math.min(ne,bs(oe))},24),S=Math.min(16,Math.max(1,Math.ceil(N*D/(O*.45)))),E=D/S,B=0;B<S;B++){try{for(var F=(e=void 0,$a(C)),q=F.next();!q.done;q=F.next()){var b=q.value;b.vy+=((o=b.gravity)!==null&&o!==void 0?o:0)*E;var M=Ua(b.vx,b.vy);if(M>b.maxSpeed){var k=b.maxSpeed/M;b.vx*=k,b.vy*=k,M=b.maxSpeed}b.x+=b.vx*E,b.y+=b.vy*E;var V=Math.max(0,M-((u=b.friction)!==null&&u!==void 0?u:0)*E),Q=Math.exp(-((l=b.linearDamping)!==null&&l!==void 0?l:0)*E);if(M>1e-4){var j=V/M*Q;b.vx*=j,b.vy*=j}b.spinToRotation&&(b.angle=((d=b.angle)!==null&&d!==void 0?d:0)+Ua(b.vx,b.vy)*E/bs(b)*(b.vx<0?-1:1))}}catch(ne){e={error:ne}}finally{try{q&&!q.done&&(t=F.return)&&t.call(F)}finally{if(e)throw e.error}}for(var W=0;W<C.length;W++){var b=C[W];try{for(var Z=(i=void 0,$a(f)),re=Z.next();!re.done;re=Z.next()){var ye=re.value;ye.id!==b.id&&ye.mode!=="dynamic"&&Zp(b,ye,y)}}catch(oe){i={error:oe}}finally{try{re&&!re.done&&(r=Z.return)&&r.call(Z)}finally{if(i)throw i.error}}for(var ye=W+1;ye<C.length;ye++)Zp(C[ye],b,y);var Se=b.shape==="box"?b.width/2:bs(b),ue=b.shape==="box"?b.height/2:bs(b);b.wallBounce?(b.x-Se<p.left&&(b.x=p.left+Se,b.vx<0&&(y("bodyBounce",b,null,{speed:Math.abs(b.vx)}),b.vx=-b.vx*b.restitution)),b.x+Se>p.right&&(b.x=p.right-Se,b.vx>0&&(y("bodyBounce",b,null,{speed:Math.abs(b.vx)}),b.vx=-b.vx*b.restitution)),b.y-ue<p.top&&(b.y=p.top+ue,b.vy<0&&(y("bodyBounce",b,null,{speed:Math.abs(b.vy)}),b.vy=-b.vy*b.restitution)),b.y+ue>p.bottom&&(b.y=p.bottom-ue,b.vy>0&&(y("bodyBounce",b,null,{speed:Math.abs(b.vy)}),b.vy=-b.vy*b.restitution))):!b.exited&&(b.x+Se<p.left||b.x-Se>p.right||b.y+ue<p.top||b.y-ue>p.bottom)&&(b.exited=!0,y("boundaryExit",b,null,{})),Mg(b,x,E,y)}Sg(g,f)}try{for(var fe=$a(C),Fe=fe.next();!Fe.done;Fe=fe.next()){var b=Fe.value,M=Ua(b.vx,b.vy);M<b.restSpeed&&!b.captured?(b.restElapsed=((h=b.restElapsed)!==null&&h!==void 0?h:0)+D,b.restElapsed>=b.restDelaySeconds&&!b.atRest&&(b.atRest=!0,b.vx=0,b.vy=0,y("bodyRest",b,null,{}))):M>=b.restSpeed&&(b.restElapsed=0,b.atRest=!1)}}catch(ne){a={error:ne}}finally{try{Fe&&!Fe.done&&(s=fe.return)&&s.call(fe)}finally{if(a)throw a.error}}}function $p(n){for(var e=n.body,t=n.bodies,i=n.zones,r=i===void 0?[]:i,a=n.bounds,s=n.dots,o=s===void 0?8:s,u=n.bounces,l=u===void 0?1:u,d=function(v){return Jo({},v)},h=d(e),f=t.filter(function(v){return v.id!==e.id}).map(d),m=xg([h],Jp(f),!1),x=[],T=0,g=!1,p=function(v,y,C,N){v==="bodyBounce"&&N.sourceId===e.id&&T++,v==="zoneCapture"&&N.sourceId===e.id&&(g=!0)},D=0;D<90&&x.length<o&&!g&&T<=l;D++)oh({bodies:m,zones:r,bounds:a,dt:1/60,onEvent:function(v,y,C,N){return p(v,y,C,Jo(Jo({},N),{sourceId:y.id}))}}),D%Math.max(1,Math.floor(90/o))===0&&x.push({x:h.x,y:h.y});return x}var Ws=function(){return Ws=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Ws.apply(this,arguments)},$o=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Qp=.008333333333333333;function Xs(n,e,t){var i,r,a,s=(i=n.boundsX)!==null&&i!==void 0?i:3,o=(r=n.boundsZ)!==null&&r!==void 0?r:7;if(Math.abs(e)>s||Math.abs(t)>o)return null;if(!n.ramp)return 0;var u=(a=n.rampHeight)!==null&&a!==void 0?a:1.1;return t>=1?0:t<=-1?u:(1-t)*(u*.5)}function Kp(n,e,t,i){var r,a,s,o=n.radius,u=Math.cos(e.angle),l=Math.sin(e.angle),d=n.x-e.x,h=n.z-e.z,f=u*d+l*h,m=-l*d+u*h,x=Math.max(-e.hx,Math.min(e.hx,f)),T=Math.max(-e.hz,Math.min(e.hz,m)),g=f-x,p=m-T,D=Math.hypot(g,p),v=Xs(n,n.x,n.z);if(!(D>=o||v!==null&&n.y>v+.55)){D<1e-8?e.hx-Math.abs(f)<e.hz-Math.abs(m)?(g=f<0?-1:1,p=0,D=0):(g=0,p=m<0?-1:1,D=0):(g/=D,p/=D);var y=u*g-l*p,C=l*g+u*p;n.x+=y*(o-D+1e-5),n.z+=C*(o-D+1e-5);var N=(r=e.vx)!==null&&r!==void 0?r:0,O=(a=e.vz)!==null&&a!==void 0?a:0,S=(n.vx-N)*y+(n.vz-O)*C;if(S<0){var E=1+((s=n.restitution)!==null&&s!==void 0?s:.72);n.vx-=E*S*y,n.vz-=E*S*C,Math.abs(S)>.3&&t>0&&i&&i("bodyBounce",n,e.sourceId?e:void 0)}}}function jp(n,e){n.vx=0,n.vy=0,n.vz=0,n.airborne=!1,n.atRest=!0,n.restElapsed=0,n.movingTime=0,e&&e("bodyRest",n)}function lh(n,e){n.x=n.lastSafe.x,n.y=n.lastSafe.y,n.z=n.lastSafe.z,jp(n,e)}function ch(n){var e,t,i,r,a,s,o,u,l,d,h,f,m,x,T,g,p,D,v=n.bodies,y=n.walls,C=n.zones,N=n.dt,O=n.onEvent;if(!(!Number.isFinite(N)||N<=0))for(var S=Math.max(1,Math.round(N/Qp)),E=N/S,B=0;B<S;B++)try{for(var F=(e=void 0,$o(v)),q=F.next();!q.done;q=F.next()){var b=q.value;if(!(b.mode!=="dynamic"||b.captured)&&!b.atRest){var M=(l=b.boundsX)!==null&&l!==void 0?l:3,k=(d=b.boundsZ)!==null&&d!==void 0?d:7;if(b.y<-3||Math.abs(b.x)>M+2||Math.abs(b.z)>k+2){lh(b,O);continue}b.movingTime=((h=b.movingTime)!==null&&h!==void 0?h:0)+E;var V=b.radius,Q=Math.hypot(b.vx,b.vy,b.vz),j=Math.max(1,Math.min(16,Math.ceil(Q*E/(V*.45)))),W=E/j;(!b._perimeter||b._pbx!==M||b._pbz!==k)&&(b._pbx=M,b._pbz=k,b._perimeter=[{x:-(M+.1),z:0,hx:.1,hz:k+.1,angle:0,vx:0,vz:0},{x:M+.1,z:0,hx:.1,hz:k+.1,angle:0,vx:0,vz:0},{x:0,z:-(k+.1),hx:M+.1,hz:.1,angle:0,vx:0,vz:0},{x:0,z:k+.1,hx:M+.1,hz:.1,angle:0,vx:0,vz:0}]);for(var Z=b._perimeter,re=!1,ye=0;ye<j;ye++){var Se=Xs(b,b.x,b.z),ue=Se!==null&&b.y<=Se+V+.012&&b.vy<=.1,fe=Se;if(ue){b.y=Se+V,b.vy=0;var Fe=Math.hypot(b.vx,b.vz),ne=Math.max(0,Fe-((f=b.friction)!==null&&f!==void 0?f:1.05)*W);if(Fe>0&&(b.vx*=ne/Fe,b.vz*=ne/Fe),b.ramp&&b.z<1&&b.z>-1){var oe=((m=b.rampHeight)!==null&&m!==void 0?m:1.1)*.5;b.vz+=9.81*oe/(1+oe*oe)*W}}else b.vy-=9.81*W,b.airborne||(b.airborne=!0,O&&O("bodyJump",b));b.x+=b.vx*W,b.z+=b.vz*W,b.y+=b.vy*W;var Ue=Xs(b,b.x,b.z);if(Ue!==null){if(ue&&fe!==null){var oe=((x=b.rampHeight)!==null&&x!==void 0?x:1.1)*.5;b.ramp&&b.z<=-1&&b.z-b.vz*W>-1.5&&b.vz<-.8?(b.vy=-b.vz*oe,b.airborne=!0,O&&O("bodyJump",b)):b.y=Ue+V}b.y<Ue+V&&(b.y=Ue+V,b.vy=0,b.airborne=!1)}if(b.y<2){try{for(var Be=(i=void 0,$o(y)),ze=Be.next();!ze.done;ze=Be.next()){var ht=ze.value;Kp(b,ht,W,O)}}catch(Pt){i={error:Pt}}finally{try{ze&&!ze.done&&(r=Be.return)&&r.call(Be)}finally{if(i)throw i.error}}try{for(var Gt=(a=void 0,$o(Z)),ut=Gt.next();!ut.done;ut=Gt.next()){var ht=ut.value;Kp(b,ht,W,O)}}catch(Pt){a={error:Pt}}finally{try{ut&&!ut.done&&(s=Gt.return)&&s.call(Gt)}finally{if(a)throw a.error}}}b.spin=((T=b.spin)!==null&&T!==void 0?T:0)+Math.hypot(b.vx,b.vz)*W/V;var wt=Math.hypot(b.vx,b.vz);try{for(var Zt=(o=void 0,$o(C)),je=Zt.next();!je.done;je=Zt.next()){var xt=je.value,_t=Math.hypot(b.x-xt.x,b.z-xt.z);if(_t<xt.radius&&Math.abs(b.y-(xt.y+V))<xt.heightTolerance&&wt<xt.maxCaptureSpeed){b.captured=!0,b.captureElapsed=0,b.captureTarget={x:xt.x,y:xt.y,z:xt.z},b.vx=0,b.vy=0,b.vz=0,b.atRest=!0,O&&O("zoneCapture",b,xt),re=!0;break}}}catch(Pt){o={error:Pt}}finally{try{je&&!je.done&&(u=Zt.return)&&u.call(Zt)}finally{if(o)throw o.error}}if(re)break;if(b.y<-3||Math.abs(b.x)>M+2||Math.abs(b.z)>k+2){lh(b,O),re=!0;break}}if(!re){var cn=Math.hypot(b.vx,b.vy,b.vz);cn<((g=b.restSpeed)!==null&&g!==void 0?g:.07)?(b.restElapsed=((p=b.restElapsed)!==null&&p!==void 0?p:0)+E,b.restElapsed>((D=b.restDelaySeconds)!==null&&D!==void 0?D:.25)&&jp(b,O)):b.restElapsed=0,b.movingTime>18&&lh(b,O)}}}}catch(Pt){e={error:Pt}}finally{try{q&&!q.done&&(t=F.return)&&t.call(F)}finally{if(e)throw e.error}}}function em(n){var e,t=n.body,i=n.walls,r=n.zones,a=n.vx,s=n.vz,o=n.dots,u=o===void 0?15:o,l=Math.hypot(a,s);if(!Number.isFinite(l)||l<.35)return[];for(var d=Math.min(1,((e=t.maxSpeed)!==null&&e!==void 0?e:9)/l),h=Ws(Ws({},t),{vx:a*d,vy:0,vz:s*d,atRest:!1,captured:!1,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:t.x,y:t.y,z:t.z}}),f=i.map(function(D){return Ws(Ws({},D),{vx:0,vz:0})}),m=[h],x={bodies:m,walls:f,zones:r,dt:Qp},T=[],g=Math.max(18,u*6),p=0;p<g&&(ch(x),p%6===0&&T.push({x:h.x,y:h.y,z:h.z}),!(h.atRest||h.captured));p++);return T}function uh(n,e,t,i,r,a){var s,o,u,l;i===void 0&&(i=[]),r===void 0&&(r=12),a===void 0&&(a=12);for(var d=n,h=e,f=Math.max(.05,t??.45),m=0;m<2;m++){try{for(var x=(s=void 0,$o(i)),T=x.next();!T.done;T=x.next()){var g=T.value,p=Math.cos((u=g.angle)!==null&&u!==void 0?u:0),D=Math.sin((l=g.angle)!==null&&l!==void 0?l:0),v=d-g.x,y=h-g.z,C=p*v+D*y,N=-D*v+p*y,O=Math.max(-g.hx,Math.min(g.hx,C)),S=Math.max(-g.hz,Math.min(g.hz,N)),E=C-O,B=N-S,F=Math.hypot(E,B);if(!(F>=f)){F<1e-8?g.hx-Math.abs(C)<g.hz-Math.abs(N)?(E=C<0?-1:1,B=0):(E=0,B=N<0?-1:1):(E/=F,B/=F);var q=p*E-D*B,b=D*E+p*B;d+=q*(f-F+1e-4),h+=b*(f-F+1e-4)}}}catch(V){s={error:V}}finally{try{T&&!T.done&&(o=x.return)&&o.call(x)}finally{if(s)throw s.error}}var M=Math.max(0,(r??12)-f),k=Math.max(0,(a??12)-f);d=Math.max(-M,Math.min(M,d)),h=Math.max(-k,Math.min(k,h))}return{x:d,z:h}}var Dm=0,Zh=1,Nm=2;var Ul=1,Au=2,So=3,us=0,mr=1,wr=2,wa=0,bo=1,Jh=2,$h=3,Kh=4,Um=5;var Ls=100,Fm=101,Om=102,Bm=103,km=104,zm=200,Vm=201,Gm=202,Hm=203,Qh=204,jh=205,Wm=206,Xm=207,Ym=208,qm=209,Zm=210,Jm=211,$m=212,Km=213,Qm=214,Hc=0,Wc=1,Xc=2,lo=3,Yc=4,qc=5,Zc=6,Jc=7,Iu=0,jm=1,e0=2,ta=0,ef=1,tf=2,nf=3,rf=4,af=5,sf=6,of=7;var lf=300,ds=301,Ds=302,Cu=303,Ru=304,Fl=306,$c=1e3,ga=1001,Kc=1002,zi=1003,t0=1004;var Ol=1005;var Wi=1006,Pu=1007;var hs=1008;var Tr=1009,cf=1010,uf=1011,wo=1012,Lu=1013,na=1014,Hr=1015,ia=1016,Du=1017,Nu=1018,To=1020,df=35902,hf=35899,ff=1021,pf=1022,Wr=1023,ya=1026,fs=1027,Uu=1028,Fu=1029,ps=1030,Ou=1031;var Bu=1033,Bl=33776,kl=33777,zl=33778,Vl=33779,ku=35840,zu=35841,Vu=35842,Gu=35843,Hu=36196,Wu=37492,Xu=37496,Yu=37488,qu=37489,Gl=37490,Zu=37491,Ju=37808,$u=37809,Ku=37810,Qu=37811,ju=37812,ed=37813,td=37814,nd=37815,id=37816,rd=37817,ad=37818,sd=37819,od=37820,ld=37821,cd=36492,ud=36494,dd=36495,hd=36283,fd=36284,Hl=36285,pd=36286;var ol=2300,Qc=2301,Vc=2302,Oh=2303,Bh=2400,kh=2401,zh=2402;var n0=3200;var md=0,i0=1,Ha="",pr="srgb",ll="srgb-linear",cl="linear",Xn="srgb";var Gc=7680;var r0=519,a0=512,s0=513,o0=514,vd=515,l0=516,c0=517,gd=518,u0=519,d0=35044;var mf="300 es",ea=2e3,co=2001;function bg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function wg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ul(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function h0(){let n=ul("canvas");return n.style.display="block",n}var tm={},uo=null;function vf(...n){let e="THREE."+n.shift();uo?uo("log",e,...n):console.log(e,...n)}function f0(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function an(...n){n=f0(n);let e="THREE."+n.shift();if(uo)uo("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function sn(...n){n=f0(n);let e="THREE."+n.shift();if(uo)uo("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Is(...n){let e=n.join(" ");e in tm||(tm[e]=!0,an(...n))}function p0(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}var m0={[Hc]:Wc,[Xc]:Zc,[Yc]:Jc,[lo]:qc,[Wc]:Hc,[Zc]:Xc,[Jc]:Yc,[qc]:lo},xa=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}},ji=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var dh=Math.PI/180,jc=180/Math.PI;function Eo(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ji[n&255]+ji[n>>8&255]+ji[n>>16&255]+ji[n>>24&255]+"-"+ji[e&255]+ji[e>>8&255]+"-"+ji[e>>16&15|64]+ji[e>>24&255]+"-"+ji[t&63|128]+ji[t>>8&255]+"-"+ji[t>>16&255]+ji[t>>24&255]+ji[i&255]+ji[i>>8&255]+ji[i>>16&255]+ji[i>>24&255]).toLowerCase()}function wn(n,e,t){return Math.max(e,Math.min(t,n))}function Tg(n,e){return(n%e+e)%e}function hh(n,e,t){return(1-t)*n+t*e}function Ko(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Sf=class Sf{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wn(this.x,e.x,t.x),this.y=wn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wn(this.x,e,t),this.y=wn(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(wn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Sf.prototype.isVector2=!0;var Dt=Sf,_a=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let u=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3],f=a[s+0],m=a[s+1],x=a[s+2],T=a[s+3];if(h!==T||u!==f||l!==m||d!==x){let g=u*f+l*m+d*x+h*T;g<0&&(f=-f,m=-m,x=-x,T=-T,g=-g);let p=1-o;if(g<.9995){let D=Math.acos(g),v=Math.sin(D);p=Math.sin(p*D)/v,o=Math.sin(o*D)/v,u=u*p+f*o,l=l*p+m*o,d=d*p+x*o,h=h*p+T*o}else{u=u*p+f*o,l=l*p+m*o,d=d*p+x*o,h=h*p+T*o;let D=1/Math.sqrt(u*u+l*l+d*d+h*h);u*=D,l*=D,d*=D,h*=D}}e[t]=u,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,a,s){let o=i[r],u=i[r+1],l=i[r+2],d=i[r+3],h=a[s],f=a[s+1],m=a[s+2],x=a[s+3];return e[t]=o*x+d*h+u*m-l*f,e[t+1]=u*x+d*f+l*h-o*m,e[t+2]=l*x+d*m+o*f-u*h,e[t+3]=d*x-o*h-u*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,u=Math.sin,l=o(i/2),d=o(r/2),h=o(a/2),f=u(i/2),m=u(r/2),x=u(a/2);switch(s){case"XYZ":this._x=f*d*h+l*m*x,this._y=l*m*h-f*d*x,this._z=l*d*x+f*m*h,this._w=l*d*h-f*m*x;break;case"YXZ":this._x=f*d*h+l*m*x,this._y=l*m*h-f*d*x,this._z=l*d*x-f*m*h,this._w=l*d*h+f*m*x;break;case"ZXY":this._x=f*d*h-l*m*x,this._y=l*m*h+f*d*x,this._z=l*d*x+f*m*h,this._w=l*d*h-f*m*x;break;case"ZYX":this._x=f*d*h-l*m*x,this._y=l*m*h+f*d*x,this._z=l*d*x-f*m*h,this._w=l*d*h+f*m*x;break;case"YZX":this._x=f*d*h+l*m*x,this._y=l*m*h+f*d*x,this._z=l*d*x-f*m*h,this._w=l*d*h-f*m*x;break;case"XZY":this._x=f*d*h-l*m*x,this._y=l*m*h-f*d*x,this._z=l*d*x+f*m*h,this._w=l*d*h+f*m*x;break;default:an("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],u=t[9],l=t[2],d=t[6],h=t[10],f=i+o+h;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-u)*m,this._y=(a-l)*m,this._z=(s-r)*m}else if(i>o&&i>h){let m=2*Math.sqrt(1+i-o-h);this._w=(d-u)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(a+l)/m}else if(o>h){let m=2*Math.sqrt(1+o-i-h);this._w=(a-l)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(u+d)/m}else{let m=2*Math.sqrt(1+h-i-o);this._w=(s-r)/m,this._x=(a+l)/m,this._y=(u+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wn(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,u=t._y,l=t._z,d=t._w;return this._x=i*d+s*o+r*l-a*u,this._y=r*d+s*u+a*o-i*l,this._z=a*d+s*l+i*u-r*o,this._w=s*d-i*o-r*u-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let u=1-t;if(o<.9995){let l=Math.acos(o),d=Math.sin(l);u=Math.sin(u*l)/d,t=Math.sin(t*l)/d,this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},bf=class bf{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,u=e.w,l=2*(s*r-o*i),d=2*(o*t-a*r),h=2*(a*i-s*t);return this.x=t+u*l+s*h-o*d,this.y=i+u*d+o*l-a*h,this.z=r+u*h+a*d-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wn(this.x,e.x,t.x),this.y=wn(this.y,e.y,t.y),this.z=wn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wn(this.x,e,t),this.y=wn(this.y,e,t),this.z=wn(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,u=t.z;return this.x=r*u-a*o,this.y=a*s-i*u,this.z=i*o-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fh.copy(this).projectOnVector(e),this.sub(fh)}reflect(e){return this.sub(fh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(wn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bf.prototype.isVector3=!0;var ge=bf,fh=new ge,nm=new _a,wf=class wf{constructor(e,t,i,r,a,s,o,u,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,l)}set(e,t,i,r,a,s,o,u,l){let d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=a,d[5]=u,d[6]=i,d[7]=s,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],u=i[6],l=i[1],d=i[4],h=i[7],f=i[2],m=i[5],x=i[8],T=r[0],g=r[3],p=r[6],D=r[1],v=r[4],y=r[7],C=r[2],N=r[5],O=r[8];return a[0]=s*T+o*D+u*C,a[3]=s*g+o*v+u*N,a[6]=s*p+o*y+u*O,a[1]=l*T+d*D+h*C,a[4]=l*g+d*v+h*N,a[7]=l*p+d*y+h*O,a[2]=f*T+m*D+x*C,a[5]=f*g+m*v+x*N,a[8]=f*p+m*y+x*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8];return t*s*d-t*o*l-i*a*d+i*o*u+r*a*l-r*s*u}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8],h=d*s-o*l,f=o*u-d*a,m=l*a-s*u,x=t*h+i*f+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/x;return e[0]=h*T,e[1]=(r*l-d*i)*T,e[2]=(o*i-r*s)*T,e[3]=f*T,e[4]=(d*t-r*u)*T,e[5]=(r*a-o*t)*T,e[6]=m*T,e[7]=(i*u-l*t)*T,e[8]=(s*t-i*a)*T,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){let u=Math.cos(a),l=Math.sin(a);return this.set(i*u,i*l,-i*(u*s+l*o)+s+e,-r*l,r*u,-r*(-l*s+u*o)+o+t,0,0,1),this}scale(e,t){return Is("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ph.makeScale(e,t)),this}rotate(e){return Is("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ph.makeRotation(-e)),this}translate(e,t){return Is("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ph.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};wf.prototype.isMatrix3=!0;var un=wf,ph=new un,im=new un().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rm=new un().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eg(){let n={enabled:!0,workingColorSpace:ll,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===Xn&&(r.r=Va(r.r),r.g=Va(r.g),r.b=Va(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Xn&&(r.r=so(r.r),r.g=so(r.g),r.b=so(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ha?cl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ll]:{primaries:e,whitePoint:i,transfer:cl,toXYZ:im,fromXYZ:rm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pr},outputColorSpaceConfig:{drawingBufferColorSpace:pr}},[pr]:{primaries:e,whitePoint:i,transfer:Xn,toXYZ:im,fromXYZ:rm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pr}}}),n}var An=Eg();function Va(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function so(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ys,eu=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ys===void 0&&(Ys=ul("canvas")),Ys.width=e.width,Ys.height=e.height;let r=Ys.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ys}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ul("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Va(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Va(t[i]/255)*255):t[i]=Va(t[i]);return{data:t,width:e.width,height:e.height}}else return an("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ag=0,ho=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=Eo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(mh(r[s].image)):a.push(mh(r[s]))}else a=mh(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function mh(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?eu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(an("Texture: Unable to serialize Texture."),{})}var Ig=0,vh=new ge,nr=class n extends xa{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=ga,r=ga,a=Wi,s=hs,o=Wr,u=Tr,l=n.DEFAULT_ANISOTROPY,d=Ha){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=Eo(),this.name="",this.source=new ho(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=u,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new un,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vh).x}get height(){return this.source.getSize(vh).y}get depth(){return this.source.getSize(vh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){an(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){an(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $c:e.x=e.x-Math.floor(e.x);break;case ga:e.x=e.x<0?0:1;break;case Kc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $c:e.y=e.y-Math.floor(e.y);break;case ga:e.y=e.y<0?0:1;break;case Kc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};nr.DEFAULT_IMAGE=null;nr.DEFAULT_MAPPING=lf;nr.DEFAULT_ANISOTROPY=1;var Tf=class Tf{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a,u=e.elements,l=u[0],d=u[4],h=u[8],f=u[1],m=u[5],x=u[9],T=u[2],g=u[6],p=u[10];if(Math.abs(d-f)<.01&&Math.abs(h-T)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+T)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,y=(m+1)/2,C=(p+1)/2,N=(d+f)/4,O=(h+T)/4,S=(x+g)/4;return v>y&&v>C?v<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(v),r=N/i,a=O/i):y>C?y<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(y),i=N/r,a=S/r):C<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(C),i=O/a,r=S/a),this.set(i,r,a,t),this}let D=Math.sqrt((g-x)*(g-x)+(h-T)*(h-T)+(f-d)*(f-d));return Math.abs(D)<.001&&(D=1),this.x=(g-x)/D,this.y=(h-T)/D,this.z=(f-d)/D,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wn(this.x,e.x,t.x),this.y=wn(this.y,e.y,t.y),this.z=wn(this.z,e.z,t.z),this.w=wn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wn(this.x,e,t),this.y=wn(this.y,e,t),this.z=wn(this.z,e,t),this.w=wn(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Tf.prototype.isVector4=!0;var hi=Tf,tu=class extends xa{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new hi(0,0,e,t),this.scissorTest=!1,this.viewport=new hi(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new nr(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Wi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ho(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},br=class extends tu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},dl=class extends nr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zi,this.minFilter=zi,this.wrapR=ga,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var nu=class extends nr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zi,this.minFilter=zi,this.wrapR=ga,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Eu=class Eu{constructor(e,t,i,r,a,s,o,u,l,d,h,f,m,x,T,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,l,d,h,f,m,x,T,g)}set(e,t,i,r,a,s,o,u,l,d,h,f,m,x,T,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=u,p[2]=l,p[6]=d,p[10]=h,p[14]=f,p[3]=m,p[7]=x,p[11]=T,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Eu().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/qs.setFromMatrixColumn(e,0).length(),a=1/qs.setFromMatrixColumn(e,1).length(),s=1/qs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),u=Math.cos(r),l=Math.sin(r),d=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){let f=s*d,m=s*h,x=o*d,T=o*h;t[0]=u*d,t[4]=-u*h,t[8]=l,t[1]=m+x*l,t[5]=f-T*l,t[9]=-o*u,t[2]=T-f*l,t[6]=x+m*l,t[10]=s*u}else if(e.order==="YXZ"){let f=u*d,m=u*h,x=l*d,T=l*h;t[0]=f+T*o,t[4]=x*o-m,t[8]=s*l,t[1]=s*h,t[5]=s*d,t[9]=-o,t[2]=m*o-x,t[6]=T+f*o,t[10]=s*u}else if(e.order==="ZXY"){let f=u*d,m=u*h,x=l*d,T=l*h;t[0]=f-T*o,t[4]=-s*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=s*d,t[9]=T-f*o,t[2]=-s*l,t[6]=o,t[10]=s*u}else if(e.order==="ZYX"){let f=s*d,m=s*h,x=o*d,T=o*h;t[0]=u*d,t[4]=x*l-m,t[8]=f*l+T,t[1]=u*h,t[5]=T*l+f,t[9]=m*l-x,t[2]=-l,t[6]=o*u,t[10]=s*u}else if(e.order==="YZX"){let f=s*u,m=s*l,x=o*u,T=o*l;t[0]=u*d,t[4]=T-f*h,t[8]=x*h+m,t[1]=h,t[5]=s*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*h+x,t[10]=f-T*h}else if(e.order==="XZY"){let f=s*u,m=s*l,x=o*u,T=o*l;t[0]=u*d,t[4]=-h,t[8]=l*d,t[1]=f*h+T,t[5]=s*d,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*d,t[10]=T*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cg,e,Rg)}lookAt(e,t,i){let r=this.elements;return Pr.subVectors(e,t),Pr.lengthSq()===0&&(Pr.z=1),Pr.normalize(),Ka.crossVectors(i,Pr),Ka.lengthSq()===0&&(Math.abs(i.z)===1?Pr.x+=1e-4:Pr.z+=1e-4,Pr.normalize(),Ka.crossVectors(i,Pr)),Ka.normalize(),xc.crossVectors(Pr,Ka),r[0]=Ka.x,r[4]=xc.x,r[8]=Pr.x,r[1]=Ka.y,r[5]=xc.y,r[9]=Pr.y,r[2]=Ka.z,r[6]=xc.z,r[10]=Pr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],u=i[8],l=i[12],d=i[1],h=i[5],f=i[9],m=i[13],x=i[2],T=i[6],g=i[10],p=i[14],D=i[3],v=i[7],y=i[11],C=i[15],N=r[0],O=r[4],S=r[8],E=r[12],B=r[1],F=r[5],q=r[9],b=r[13],M=r[2],k=r[6],V=r[10],Q=r[14],j=r[3],W=r[7],Z=r[11],re=r[15];return a[0]=s*N+o*B+u*M+l*j,a[4]=s*O+o*F+u*k+l*W,a[8]=s*S+o*q+u*V+l*Z,a[12]=s*E+o*b+u*Q+l*re,a[1]=d*N+h*B+f*M+m*j,a[5]=d*O+h*F+f*k+m*W,a[9]=d*S+h*q+f*V+m*Z,a[13]=d*E+h*b+f*Q+m*re,a[2]=x*N+T*B+g*M+p*j,a[6]=x*O+T*F+g*k+p*W,a[10]=x*S+T*q+g*V+p*Z,a[14]=x*E+T*b+g*Q+p*re,a[3]=D*N+v*B+y*M+C*j,a[7]=D*O+v*F+y*k+C*W,a[11]=D*S+v*q+y*V+C*Z,a[15]=D*E+v*b+y*Q+C*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],u=e[9],l=e[13],d=e[2],h=e[6],f=e[10],m=e[14],x=e[3],T=e[7],g=e[11],p=e[15],D=u*m-l*f,v=o*m-l*h,y=o*f-u*h,C=s*m-l*d,N=s*f-u*d,O=s*h-o*d;return t*(T*D-g*v+p*y)-i*(x*D-g*C+p*N)+r*(x*v-T*C+p*O)-a*(x*y-T*N+g*O)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],u=e[2],l=e[6],d=e[10];return t*(s*d-o*l)-i*(a*d-o*u)+r*(a*l-s*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8],h=e[9],f=e[10],m=e[11],x=e[12],T=e[13],g=e[14],p=e[15],D=t*o-i*s,v=t*u-r*s,y=t*l-a*s,C=i*u-r*o,N=i*l-a*o,O=r*l-a*u,S=d*T-h*x,E=d*g-f*x,B=d*p-m*x,F=h*g-f*T,q=h*p-m*T,b=f*p-m*g,M=D*b-v*q+y*F+C*B-N*E+O*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/M;return e[0]=(o*b-u*q+l*F)*k,e[1]=(r*q-i*b-a*F)*k,e[2]=(T*O-g*N+p*C)*k,e[3]=(f*N-h*O-m*C)*k,e[4]=(u*B-s*b-l*E)*k,e[5]=(t*b-r*B+a*E)*k,e[6]=(g*y-x*O-p*v)*k,e[7]=(d*O-f*y+m*v)*k,e[8]=(s*q-o*B+l*S)*k,e[9]=(i*B-t*q-a*S)*k,e[10]=(x*N-T*y+p*D)*k,e[11]=(h*y-d*N-m*D)*k,e[12]=(o*E-s*F-u*S)*k,e[13]=(t*F-i*E+r*S)*k,e[14]=(T*v-x*C-g*D)*k,e[15]=(d*C-h*v+f*D)*k,this}scale(e){let t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,u=e.z,l=a*s,d=a*o;return this.set(l*s+i,l*o-r*u,l*u+r*o,0,l*o+r*u,d*o+i,d*u-r*s,0,l*u-r*o,d*u+r*s,a*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,a=t._x,s=t._y,o=t._z,u=t._w,l=a+a,d=s+s,h=o+o,f=a*l,m=a*d,x=a*h,T=s*d,g=s*h,p=o*h,D=u*l,v=u*d,y=u*h,C=i.x,N=i.y,O=i.z;return r[0]=(1-(T+p))*C,r[1]=(m+y)*C,r[2]=(x-v)*C,r[3]=0,r[4]=(m-y)*N,r[5]=(1-(f+p))*N,r[6]=(g+D)*N,r[7]=0,r[8]=(x+v)*O,r[9]=(g-D)*O,r[10]=(1-(f+T))*O,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=qs.set(r[0],r[1],r[2]).length(),o=qs.set(r[4],r[5],r[6]).length(),u=qs.set(r[8],r[9],r[10]).length();a<0&&(s=-s),Kr.copy(this);let l=1/s,d=1/o,h=1/u;return Kr.elements[0]*=l,Kr.elements[1]*=l,Kr.elements[2]*=l,Kr.elements[4]*=d,Kr.elements[5]*=d,Kr.elements[6]*=d,Kr.elements[8]*=h,Kr.elements[9]*=h,Kr.elements[10]*=h,t.setFromRotationMatrix(Kr),i.x=s,i.y=o,i.z=u,this}makePerspective(e,t,i,r,a,s,o=ea,u=!1){let l=this.elements,d=2*a/(t-e),h=2*a/(i-r),f=(t+e)/(t-e),m=(i+r)/(i-r),x,T;if(u)x=a/(s-a),T=s*a/(s-a);else if(o===ea)x=-(s+a)/(s-a),T=-2*s*a/(s-a);else if(o===co)x=-s/(s-a),T=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=ea,u=!1){let l=this.elements,d=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),m=-(i+r)/(i-r),x,T;if(u)x=1/(s-a),T=s/(s-a);else if(o===ea)x=-2/(s-a),T=-(s+a)/(s-a);else if(o===co)x=-1/(s-a),T=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Eu.prototype.isMatrix4=!0;var Yn=Eu,qs=new ge,Kr=new Yn,Cg=new ge(0,0,0),Rg=new ge(1,1,1),Ka=new ge,xc=new ge,Pr=new ge,am=new Yn,sm=new _a,Ga=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,a=r[0],s=r[4],o=r[8],u=r[1],l=r[5],d=r[9],h=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(wn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-wn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(u,l)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(wn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-wn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(wn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-wn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,m),this._y=0);break;default:an("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return am.makeRotationFromQuaternion(e),this.setFromRotationMatrix(am,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sm.setFromEuler(this),this.setFromQuaternion(sm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ga.DEFAULT_ORDER="XYZ";var fo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Pg=0,om=new ge,Zs=new _a,Fa=new Yn,_c=new ge,Qo=new ge,Lg=new ge,Dg=new _a,lm=new ge(1,0,0),cm=new ge(0,1,0),um=new ge(0,0,1),dm={type:"added"},Ng={type:"removed"},Js={type:"childadded",child:null},gh={type:"childremoved",child:null},ir=class n extends xa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=Eo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new ge,t=new Ga,i=new _a,r=new ge(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Yn},normalMatrix:{value:new un}}),this.matrix=new Yn,this.matrixWorld=new Yn,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(lm,e)}rotateY(e){return this.rotateOnAxis(cm,e)}rotateZ(e){return this.rotateOnAxis(um,e)}translateOnAxis(e,t){return om.copy(e).applyQuaternion(this.quaternion),this.position.add(om.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lm,e)}translateY(e){return this.translateOnAxis(cm,e)}translateZ(e){return this.translateOnAxis(um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fa.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_c.copy(e):_c.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fa.lookAt(Qo,_c,this.up):Fa.lookAt(_c,Qo,this.up),this.quaternion.setFromRotationMatrix(Fa),r&&(Fa.extractRotation(r.matrixWorld),Zs.setFromRotationMatrix(Fa),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(sn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dm),Js.child=e,this.dispatchEvent(Js),Js.child=null):sn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ng),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dm),Js.child=e,this.dispatchEvent(Js),Js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,e,Lg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qo,Dg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let u=o.shapes;if(Array.isArray(u))for(let l=0,d=u.length;l<d;l++){let h=u[l];a(e.shapes,h)}else a(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let u=0,l=this.material.length;u<l;u++)o.push(a(e.materials,this.material[u]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let u=this.animations[o];r.animations.push(a(e.animations,u))}}if(t){let o=s(e.geometries),u=s(e.materials),l=s(e.textures),d=s(e.images),h=s(e.shapes),f=s(e.skeletons),m=s(e.animations),x=s(e.nodes);o.length>0&&(i.geometries=o),u.length>0&&(i.materials=u),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function s(o){let u=[];for(let l in o){let d=o[l];delete d.metadata,u.push(d)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ir.DEFAULT_UP=new ge(0,1,0);ir.DEFAULT_MATRIX_AUTO_UPDATE=!0;ir.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Sr=class extends ir{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ug={type:"move"},po=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ge,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ge),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ge,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ge,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null,o=this._targetRay,u=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let T of e.hand.values()){let g=t.getJointPose(T,i),p=this._getHandJoint(l,T);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=d.position.distanceTo(h.position),m=.02,x=.005;l.inputState.pinching&&f>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ug)))}return o!==null&&(o.visible=r!==null),u!==null&&(u.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Sr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},v0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qa={h:0,s:0,l:0},Mc={h:0,s:0,l:0};function yh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var mn=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,An.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=An.workingColorSpace){return this.r=e,this.g=t,this.b=i,An.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=An.workingColorSpace){if(e=Tg(e,1),t=wn(t,0,1),i=wn(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=yh(s,a,e+1/3),this.g=yh(s,a,e),this.b=yh(s,a,e-1/3)}return An.colorSpaceToWorking(this,r),this}setStyle(e,t=pr){function i(a){a!==void 0&&parseFloat(a)<1&&an("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:an("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);an("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pr){let i=v0[e.toLowerCase()];return i!==void 0?this.setHex(i,t):an("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pr){return An.workingToColorSpace(er.copy(this),e),Math.round(wn(er.r*255,0,255))*65536+Math.round(wn(er.g*255,0,255))*256+Math.round(wn(er.b*255,0,255))}getHexString(e=pr){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=An.workingColorSpace){An.workingToColorSpace(er.copy(this),t);let i=er.r,r=er.g,a=er.b,s=Math.max(i,r,a),o=Math.min(i,r,a),u,l,d=(o+s)/2;if(o===s)u=0,l=0;else{let h=s-o;switch(l=d<=.5?h/(s+o):h/(2-s-o),s){case i:u=(r-a)/h+(r<a?6:0);break;case r:u=(a-i)/h+2;break;case a:u=(i-r)/h+4;break}u/=6}return e.h=u,e.s=l,e.l=d,e}getRGB(e,t=An.workingColorSpace){return An.workingToColorSpace(er.copy(this),t),e.r=er.r,e.g=er.g,e.b=er.b,e}getStyle(e=pr){An.workingToColorSpace(er.copy(this),e);let t=er.r,i=er.g,r=er.b;return e!==pr?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qa),this.setHSL(Qa.h+e,Qa.s+t,Qa.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qa),e.getHSL(Mc);let i=hh(Qa.h,Mc.h,t),r=hh(Qa.s,Mc.s,t),a=hh(Qa.l,Mc.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},er=new mn;mn.NAMES=v0;var hl=class extends ir{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ga,this.environmentIntensity=1,this.environmentRotation=new Ga,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qr=new ge,Oa=new ge,xh=new ge,Ba=new ge,$s=new ge,Ks=new ge,hm=new ge,_h=new ge,Mh=new ge,Sh=new ge,bh=new hi,wh=new hi,Th=new hi,ns=class n{constructor(e=new ge,t=new ge,i=new ge){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Qr.subVectors(e,t),r.cross(Qr);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Qr.subVectors(r,t),Oa.subVectors(i,t),xh.subVectors(e,t);let s=Qr.dot(Qr),o=Qr.dot(Oa),u=Qr.dot(xh),l=Oa.dot(Oa),d=Oa.dot(xh),h=s*l-o*o;if(h===0)return a.set(0,0,0),null;let f=1/h,m=(l*u-o*d)*f,x=(s*d-o*u)*f;return a.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ba)===null?!1:Ba.x>=0&&Ba.y>=0&&Ba.x+Ba.y<=1}static getInterpolation(e,t,i,r,a,s,o,u){return this.getBarycoord(e,t,i,r,Ba)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,Ba.x),u.addScaledVector(s,Ba.y),u.addScaledVector(o,Ba.z),u)}static getInterpolatedAttribute(e,t,i,r,a,s){return bh.setScalar(0),wh.setScalar(0),Th.setScalar(0),bh.fromBufferAttribute(e,t),wh.fromBufferAttribute(e,i),Th.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(bh,a.x),s.addScaledVector(wh,a.y),s.addScaledVector(Th,a.z),s}static isFrontFacing(e,t,i,r){return Qr.subVectors(i,t),Oa.subVectors(e,t),Qr.cross(Oa).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qr.subVectors(this.c,this.b),Oa.subVectors(this.a,this.b),Qr.cross(Oa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,a=this.c,s,o;$s.subVectors(r,i),Ks.subVectors(a,i),_h.subVectors(e,i);let u=$s.dot(_h),l=Ks.dot(_h);if(u<=0&&l<=0)return t.copy(i);Mh.subVectors(e,r);let d=$s.dot(Mh),h=Ks.dot(Mh);if(d>=0&&h<=d)return t.copy(r);let f=u*h-d*l;if(f<=0&&u>=0&&d<=0)return s=u/(u-d),t.copy(i).addScaledVector($s,s);Sh.subVectors(e,a);let m=$s.dot(Sh),x=Ks.dot(Sh);if(x>=0&&m<=x)return t.copy(a);let T=m*l-u*x;if(T<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(Ks,o);let g=d*x-m*h;if(g<=0&&h-d>=0&&m-x>=0)return hm.subVectors(a,r),o=(h-d)/(h-d+(m-x)),t.copy(r).addScaledVector(hm,o);let p=1/(g+T+f);return s=T*p,o=f*p,t.copy(i).addScaledVector($s,s).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ma=class{constructor(e=new ge(1/0,1/0,1/0),t=new ge(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=jr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,jr):jr.fromBufferAttribute(a,s),jr.applyMatrix4(e.matrixWorld),this.expandByPoint(jr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sc.copy(i.boundingBox)),Sc.applyMatrix4(e.matrixWorld),this.union(Sc)}let r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jr),jr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),bc.subVectors(this.max,jo),Qs.subVectors(e.a,jo),js.subVectors(e.b,jo),eo.subVectors(e.c,jo),ja.subVectors(js,Qs),es.subVectors(eo,js),ws.subVectors(Qs,eo);let t=[0,-ja.z,ja.y,0,-es.z,es.y,0,-ws.z,ws.y,ja.z,0,-ja.x,es.z,0,-es.x,ws.z,0,-ws.x,-ja.y,ja.x,0,-es.y,es.x,0,-ws.y,ws.x,0];return!Eh(t,Qs,js,eo,bc)||(t=[1,0,0,0,1,0,0,0,1],!Eh(t,Qs,js,eo,bc))?!1:(wc.crossVectors(ja,es),t=[wc.x,wc.y,wc.z],Eh(t,Qs,js,eo,bc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ka[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ka[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ka[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ka[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ka[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ka[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ka[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ka[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ka),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ka=[new ge,new ge,new ge,new ge,new ge,new ge,new ge,new ge],jr=new ge,Sc=new Ma,Qs=new ge,js=new ge,eo=new ge,ja=new ge,es=new ge,ws=new ge,jo=new ge,bc=new ge,wc=new ge,Ts=new ge;function Eh(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){Ts.fromArray(n,a);let o=r.x*Math.abs(Ts.x)+r.y*Math.abs(Ts.y)+r.z*Math.abs(Ts.z),u=e.dot(Ts),l=t.dot(Ts),d=i.dot(Ts);if(Math.max(-Math.max(u,l,d),Math.min(u,l,d))>o)return!1}return!0}var Ei=new ge,Tc=new Dt,Fg=0,Nr=class extends xa{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=d0,this.updateRanges=[],this.gpuType=Hr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Tc.fromBufferAttribute(this,t),Tc.applyMatrix3(e),this.setXY(t,Tc.x,Tc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ei.fromBufferAttribute(this,t),Ei.applyMatrix3(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ei.fromBufferAttribute(this,t),Ei.applyMatrix4(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ei.fromBufferAttribute(this,t),Ei.applyNormalMatrix(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ei.fromBufferAttribute(this,t),Ei.transformDirection(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ko(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Mr(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ko(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ko(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ko(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ko(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Mr(t,this.array),i=Mr(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Mr(t,this.array),i=Mr(i,this.array),r=Mr(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=Mr(t,this.array),i=Mr(i,this.array),r=Mr(r,this.array),a=Mr(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var fl=class extends Nr{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var pl=class extends Nr{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var zn=class extends Nr{constructor(e,t,i){super(new Float32Array(e),t,i)}},Og=new Ma,el=new ge,Ah=new ge,is=class{constructor(e=new ge,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Og.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;el.subVectors(e,this.center);let t=el.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(el,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(el.copy(e.center).add(Ah)),this.expandByPoint(el.copy(e.center).sub(Ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Bg=0,Gr=new Yn,Ih=new ir,to=new ge,Lr=new Ma,tl=new Ma,ki=new ge,Xi=class n extends xa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=Eo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bg(e)?pl:fl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new un().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gr.makeRotationFromQuaternion(e),this.applyMatrix4(Gr),this}rotateX(e){return Gr.makeRotationX(e),this.applyMatrix4(Gr),this}rotateY(e){return Gr.makeRotationY(e),this.applyMatrix4(Gr),this}rotateZ(e){return Gr.makeRotationZ(e),this.applyMatrix4(Gr),this}translate(e,t,i){return Gr.makeTranslation(e,t,i),this.applyMatrix4(Gr),this}scale(e,t,i){return Gr.makeScale(e,t,i),this.applyMatrix4(Gr),this}lookAt(e){return Ih.lookAt(e),Ih.updateMatrix(),this.applyMatrix4(Ih.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(to).negate(),this.translate(to.x,to.y,to.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,a=e.length;r<a;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new zn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&an("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ma);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ge(-1/0,-1/0,-1/0),new ge(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let a=t[i];Lr.setFromBufferAttribute(a),this.morphTargetsRelative?(ki.addVectors(this.boundingBox.min,Lr.min),this.boundingBox.expandByPoint(ki),ki.addVectors(this.boundingBox.max,Lr.max),this.boundingBox.expandByPoint(ki)):(this.boundingBox.expandByPoint(Lr.min),this.boundingBox.expandByPoint(Lr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&sn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ge,1/0);return}if(e){let i=this.boundingSphere.center;if(Lr.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){let o=t[a];tl.setFromBufferAttribute(o),this.morphTargetsRelative?(ki.addVectors(Lr.min,tl.min),Lr.expandByPoint(ki),ki.addVectors(Lr.max,tl.max),Lr.expandByPoint(ki)):(Lr.expandByPoint(tl.min),Lr.expandByPoint(tl.max))}Lr.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)ki.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(ki));if(t)for(let a=0,s=t.length;a<s;a++){let o=t[a],u=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)ki.fromBufferAttribute(o,l),u&&(to.fromBufferAttribute(e,l),ki.add(to)),r=Math.max(r,i.distanceToSquared(ki))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&sn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){sn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,a=t.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new Nr(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let o=[],u=[];for(let S=0;S<i.count;S++)o[S]=new ge,u[S]=new ge;let l=new ge,d=new ge,h=new ge,f=new Dt,m=new Dt,x=new Dt,T=new ge,g=new ge;function p(S,E,B){l.fromBufferAttribute(i,S),d.fromBufferAttribute(i,E),h.fromBufferAttribute(i,B),f.fromBufferAttribute(a,S),m.fromBufferAttribute(a,E),x.fromBufferAttribute(a,B),d.sub(l),h.sub(l),m.sub(f),x.sub(f);let F=1/(m.x*x.y-x.x*m.y);isFinite(F)&&(T.copy(d).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(F),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(F),o[S].add(T),o[E].add(T),o[B].add(T),u[S].add(g),u[E].add(g),u[B].add(g))}let D=this.groups;D.length===0&&(D=[{start:0,count:e.count}]);for(let S=0,E=D.length;S<E;++S){let B=D[S],F=B.start,q=B.count;for(let b=F,M=F+q;b<M;b+=3)p(e.getX(b+0),e.getX(b+1),e.getX(b+2))}let v=new ge,y=new ge,C=new ge,N=new ge;function O(S){C.fromBufferAttribute(r,S),N.copy(C);let E=o[S];v.copy(E),v.sub(C.multiplyScalar(C.dot(E))).normalize(),y.crossVectors(N,E);let F=y.dot(u[S])<0?-1:1;s.setXYZW(S,v.x,v.y,v.z,F)}for(let S=0,E=D.length;S<E;++S){let B=D[S],F=B.start,q=B.count;for(let b=F,M=F+q;b<M;b+=3)O(e.getX(b+0)),O(e.getX(b+1)),O(e.getX(b+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Nr(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);let r=new ge,a=new ge,s=new ge,o=new ge,u=new ge,l=new ge,d=new ge,h=new ge;if(e)for(let f=0,m=e.count;f<m;f+=3){let x=e.getX(f+0),T=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,T),s.fromBufferAttribute(t,g),d.subVectors(s,a),h.subVectors(r,a),d.cross(h),o.fromBufferAttribute(i,x),u.fromBufferAttribute(i,T),l.fromBufferAttribute(i,g),o.add(d),u.add(d),l.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(T,u.x,u.y,u.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),d.subVectors(s,a),h.subVectors(r,a),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ki.fromBufferAttribute(e,t),ki.normalize(),e.setXYZ(t,ki.x,ki.y,ki.z)}toNonIndexed(){function e(o,u){let l=o.array,d=o.itemSize,h=o.normalized,f=new l.constructor(u.length*d),m=0,x=0;for(let T=0,g=u.length;T<g;T++){o.isInterleavedBufferAttribute?m=u[T]*o.data.stride+o.offset:m=u[T]*d;for(let p=0;p<d;p++)f[x++]=l[m++]}return new Nr(f,d,h)}if(this.index===null)return an("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let u=r[o],l=e(u,i);t.setAttribute(o,l)}let a=this.morphAttributes;for(let o in a){let u=[],l=a[o];for(let d=0,h=l.length;d<h;d++){let f=l[d],m=e(f,i);u.push(m)}t.morphAttributes[o]=u}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,u=s.length;o<u;o++){let l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let u=this.parameters;for(let l in u)u[l]!==void 0&&(e[l]=u[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let u in i){let l=i[u];e.data.attributes[u]=l.toJSON(e.data)}let r={},a=!1;for(let u in this.morphAttributes){let l=this.morphAttributes[u],d=[];for(let h=0,f=l.length;h<f;h++){let m=l[h];d.push(m.toJSON(e.data))}d.length>0&&(r[u]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let d=r[l];this.setAttribute(l,d.clone(t))}let a=e.morphAttributes;for(let l in a){let d=[],h=a[l];for(let f=0,m=h.length;f<m;f++)d.push(h[f].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,d=s.length;l<d;l++){let h=s[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ch=new ge,kg=new ge,zg=new un,Dr=class{constructor(e=new ge(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Ch.subVectors(i,t).cross(kg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Ch),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||zg.getNormalMatrix(e),r=this.coplanarPoint(Ch).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vg=0,rs=class extends xa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Eo(),this.name="",this.type="Material",this.blending=bo,this.side=us,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qh,this.blendDst=jh,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mn(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=r0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gc,this.stencilZFail=Gc,this.stencilZPass=Gc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){an(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){an(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let s=[];for(let o in a){let u=a[o];delete u.metadata,s.push(u)}return s}if(t){let a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new mn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Dr().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Dt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var za=new ge,Rh=new ge,Ec=new ge,Ac=new ge,ml=class{constructor(e=new ge,t=new ge(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,za)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=za.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(za.copy(this.origin).addScaledVector(this.direction,t),za.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Rh.copy(e).add(t).multiplyScalar(.5),Ec.copy(t).sub(e).normalize(),Ac.copy(this.origin).sub(Rh);let a=e.distanceTo(t)*.5,s=-this.direction.dot(Ec),o=Ac.dot(this.direction),u=-Ac.dot(Ec),l=Ac.lengthSq(),d=Math.abs(1-s*s),h,f,m,x;if(d>0)if(h=s*u-o,f=s*o-u,x=a*d,h>=0)if(f>=-x)if(f<=x){let T=1/d;h*=T,f*=T,m=h*(h+s*f+2*o)+f*(s*h+f+2*u)+l}else f=a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*u)+l;else f=-a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*u)+l;else f<=-x?(h=Math.max(0,-(-s*a+o)),f=h>0?-a:Math.min(Math.max(-a,-u),a),m=-h*h+f*(f+2*u)+l):f<=x?(h=0,f=Math.min(Math.max(-a,-u),a),m=f*(f+2*u)+l):(h=Math.max(0,-(s*a+o)),f=h>0?a:Math.min(Math.max(-a,-u),a),m=-h*h+f*(f+2*u)+l);else f=s>0?-a:a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*u)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Rh).addScaledVector(Ec,f),m}intersectSphere(e,t){if(e.radius<0)return null;za.subVectors(e.center,this.origin);let i=za.dot(this.direction),r=za.dot(za)-i*i,a=e.radius*e.radius;if(r>a)return null;let s=Math.sqrt(a-r),o=i-s,u=i+s;return u<0?null:o<0?this.at(u,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,u,l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),d>=0?(a=(e.min.y-f.y)*d,s=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,s=(e.min.y-f.y)*d),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),h>=0?(o=(e.min.z-f.z)*h,u=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,u=(e.min.z-f.z)*h),i>u||o>r)||((o>i||i!==i)&&(i=o),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,za)!==null}intersectTriangle(e,t,i,r,a){let s=this.origin,o=this.direction,u=o.x,l=o.y,d=o.z,h=e.x-s.x,f=e.y-s.y,m=e.z-s.z,x=t.x-s.x,T=t.y-s.y,g=t.z-s.z,p=i.x-s.x,D=i.y-s.y,v=i.z-s.z,y=Math.abs(u),C=Math.abs(l),N=Math.abs(d),O,S,E,B,F,q,b,M,k,V,Q,j;if(y>=C&&y>=N?(E=u,q=h,k=x,j=p,u>=0?(O=l,S=d,B=f,F=m,b=T,M=g,V=D,Q=v):(O=d,S=l,B=m,F=f,b=g,M=T,V=v,Q=D)):C>=N?(E=l,q=f,k=T,j=D,l>=0?(O=d,S=u,B=m,F=h,b=g,M=x,V=v,Q=p):(O=u,S=d,B=h,F=m,b=x,M=g,V=p,Q=v)):(E=d,q=m,k=g,j=v,d>=0?(O=u,S=l,B=h,F=f,b=x,M=T,V=p,Q=D):(O=l,S=u,B=f,F=h,b=T,M=x,V=D,Q=p)),E===0)return null;let W=O/E,Z=S/E,re=1/E,ye=B-W*q,Se=F-Z*q,ue=b-W*k,fe=M-Z*k,Fe=V-W*j,ne=Q-Z*j,oe=Fe*fe-ne*ue,Ue=ye*ne-Se*Fe,Be=ue*Se-fe*ye;if(r){if(oe<0||Ue<0||Be<0)return null}else if((oe<0||Ue<0||Be<0)&&(oe>0||Ue>0||Be>0))return null;let ze=oe+Ue+Be;if(ze===0)return null;let ht=re*(oe*q+Ue*k+Be*j);return(ze>0?ht<0:ht>0)?null:this.at(ht/ze,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sa=class extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ga,this.combine=Iu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},fm=new Yn,Es=new ml,Ic=new is,pm=new ge,Cc=new ge,Rc=new ge,Pc=new ge,Ph=new ge,Lc=new ge,mm=new ge,Dc=new ge,Kn=class extends ir{constructor(e=new Xi,t=new Sa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){let o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(a&&o){Lc.set(0,0,0);for(let u=0,l=a.length;u<l;u++){let d=o[u],h=a[u];d!==0&&(Ph.fromBufferAttribute(h,e),s?Lc.addScaledVector(Ph,d):Lc.addScaledVector(Ph.sub(t),d))}t.add(Lc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ic.copy(i.boundingSphere),Ic.applyMatrix4(a),Es.copy(e.ray).recast(e.near),!(Ic.containsPoint(Es.origin)===!1&&(Es.intersectSphere(Ic,pm)===null||Es.origin.distanceToSquared(pm)>(e.far-e.near)**2))&&(fm.copy(a).invert(),Es.copy(e.ray).applyMatrix4(fm),!(i.boundingBox!==null&&Es.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Es)))}_computeIntersections(e,t,i){let r,a=this.geometry,s=this.material,o=a.index,u=a.attributes.position,l=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,f=a.groups,m=a.drawRange;if(o!==null)if(Array.isArray(s))for(let x=0,T=f.length;x<T;x++){let g=f[x],p=s[g.materialIndex],D=Math.max(g.start,m.start),v=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let y=D,C=v;y<C;y+=3){let N=o.getX(y),O=o.getX(y+1),S=o.getX(y+2);r=Nc(this,p,e,i,l,d,h,N,O,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),T=Math.min(o.count,m.start+m.count);for(let g=x,p=T;g<p;g+=3){let D=o.getX(g),v=o.getX(g+1),y=o.getX(g+2);r=Nc(this,s,e,i,l,d,h,D,v,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(s))for(let x=0,T=f.length;x<T;x++){let g=f[x],p=s[g.materialIndex],D=Math.max(g.start,m.start),v=Math.min(u.count,Math.min(g.start+g.count,m.start+m.count));for(let y=D,C=v;y<C;y+=3){let N=y,O=y+1,S=y+2;r=Nc(this,p,e,i,l,d,h,N,O,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),T=Math.min(u.count,m.start+m.count);for(let g=x,p=T;g<p;g+=3){let D=g,v=g+1,y=g+2;r=Nc(this,s,e,i,l,d,h,D,v,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Gg(n,e,t,i,r,a,s,o){let u;if(e.side===mr?u=i.intersectTriangle(s,a,r,!0,o):u=i.intersectTriangle(r,a,s,e.side===us,o),u===null)return null;Dc.copy(o),Dc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Dc);return l<t.near||l>t.far?null:{distance:l,point:Dc.clone(),object:n}}function Nc(n,e,t,i,r,a,s,o,u,l){n.getVertexPosition(o,Cc),n.getVertexPosition(u,Rc),n.getVertexPosition(l,Pc);let d=Gg(n,e,t,i,Cc,Rc,Pc,mm);if(d){let h=new ge;ns.getBarycoord(mm,Cc,Rc,Pc,h),r&&(d.uv=ns.getInterpolatedAttribute(r,o,u,l,h,new Dt)),a&&(d.uv1=ns.getInterpolatedAttribute(a,o,u,l,h,new Dt)),s&&(d.normal=ns.getInterpolatedAttribute(s,o,u,l,h,new ge),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let f={a:o,b:u,c:l,normal:new ge,materialIndex:0};ns.getNormal(Cc,Rc,Pc,f.normal),d.face=f,d.barycoord=h}return d}var vl=class extends nr{constructor(e=null,t=1,i=1,r,a,s,o,u,l=zi,d=zi,h,f){super(null,s,o,u,l,d,r,a,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gl=class extends Nr{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},no=new Yn,vm=new Yn,Uc=[],gm=new Ma,Hg=new Yn,nl=new Kn,il=new is,ba=class extends Kn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Hg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ma),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,no),gm.copy(e.boundingBox).applyMatrix4(no),this.boundingBox.union(gm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new is),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,no),il.copy(e.boundingSphere).applyMatrix4(no),this.boundingSphere.union(il)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(nl.geometry=this.geometry,nl.material=this.material,nl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),il.copy(this.boundingSphere),il.applyMatrix4(i),e.ray.intersectsSphere(il)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,no),vm.multiplyMatrices(i,no),nl.matrixWorld=vm,nl.raycast(e,Uc);for(let s=0,o=Uc.length;s<o;s++){let u=Uc[s];u.instanceId=a,u.object=this,t.push(u)}Uc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new vl(new Float32Array(r*this.count),r,this.count,Uu,Hr));let a=this.morphTexture.source.data.data,s=0;for(let l=0;l<i.length;l++)s+=i[l];let o=this.geometry.morphTargetsRelative?1:1-s,u=r*e;return a[u]=o,a.set(i,u+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},As=new is,Wg=new Dt(.5,.5),Fc=new ge,mo=class{constructor(e=new Dr,t=new Dr,i=new Dr,r=new Dr,a=new Dr,s=new Dr){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ea,i=!1){let r=this.planes,a=e.elements,s=a[0],o=a[1],u=a[2],l=a[3],d=a[4],h=a[5],f=a[6],m=a[7],x=a[8],T=a[9],g=a[10],p=a[11],D=a[12],v=a[13],y=a[14],C=a[15];if(r[0].setComponents(l-s,m-d,p-x,C-D).normalize(),r[1].setComponents(l+s,m+d,p+x,C+D).normalize(),r[2].setComponents(l+o,m+h,p+T,C+v).normalize(),r[3].setComponents(l-o,m-h,p-T,C-v).normalize(),i)r[4].setComponents(u,f,g,y).normalize(),r[5].setComponents(l-u,m-f,p-g,C-y).normalize();else if(r[4].setComponents(l-u,m-f,p-g,C-y).normalize(),t===ea)r[5].setComponents(l+u,m+f,p+g,C+y).normalize();else if(t===co)r[5].setComponents(u,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),As.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),As.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(As)}intersectsSprite(e){As.center.set(0,0,0);let t=Wg.distanceTo(e.center);return As.radius=.7071067811865476+t,As.applyMatrix4(e.matrixWorld),this.intersectsSphere(As)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Fc.x=r.normal.x>0?e.max.x:e.min.x,Fc.y=r.normal.y>0?e.max.y:e.min.y,Fc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Fc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yl=class extends nr{constructor(e=[],t=ds,i,r,a,s,o,u,l,d){super(e,t,i,r,a,s,o,u,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var as=class extends nr{constructor(e,t,i=na,r,a,s,o=zi,u=zi,l,d=ya,h=1){if(d!==ya&&d!==fs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:h};super(f,r,a,s,o,u,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ho(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},iu=class extends as{constructor(e,t=na,i=ds,r,a,s=zi,o=zi,u,l=ya){let d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,r,a,s,o,u,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xl=class extends nr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ur=class n extends Xi{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};let o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);let u=[],l=[],d=[],h=[],f=0,m=0;x("z","y","x",-1,-1,i,t,e,s,a,0),x("z","y","x",1,-1,i,t,-e,s,a,1),x("x","z","y",1,1,e,i,t,r,s,2),x("x","z","y",1,-1,e,i,-t,r,s,3),x("x","y","z",1,-1,e,t,i,r,a,4),x("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(u),this.setAttribute("position",new zn(l,3)),this.setAttribute("normal",new zn(d,3)),this.setAttribute("uv",new zn(h,2));function x(T,g,p,D,v,y,C,N,O,S,E){let B=y/O,F=C/S,q=y/2,b=C/2,M=N/2,k=O+1,V=S+1,Q=0,j=0,W=new ge;for(let Z=0;Z<V;Z++){let re=Z*F-b;for(let ye=0;ye<k;ye++){let Se=ye*B-q;W[T]=Se*D,W[g]=re*v,W[p]=M,l.push(W.x,W.y,W.z),W[T]=0,W[g]=0,W[p]=N>0?1:-1,d.push(W.x,W.y,W.z),h.push(ye/O),h.push(1-Z/S),Q+=1}}for(let Z=0;Z<S;Z++)for(let re=0;re<O;re++){let ye=f+re+k*Z,Se=f+re+k*(Z+1),ue=f+(re+1)+k*(Z+1),fe=f+(re+1)+k*Z;u.push(ye,Se,fe),u.push(Se,ue,fe),j+=6}o.addGroup(m,j,E),m+=j,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var vo=class n extends Xi{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let a=[],s=[],o=[],u=[],l=new ge,d=new Dt;s.push(0,0,0),o.push(0,0,1),u.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){let m=i+h/t*r;l.x=e*Math.cos(m),l.y=e*Math.sin(m),s.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(s[f]/e+1)/2,d.y=(s[f+1]/e+1)/2,u.push(d.x,d.y)}for(let h=1;h<=t;h++)a.push(h,h+1,0);this.setIndex(a),this.setAttribute("position",new zn(s,3)),this.setAttribute("normal",new zn(o,3)),this.setAttribute("uv",new zn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Cs=class n extends Xi{constructor(e=1,t=1,i=1,r=32,a=1,s=!1,o=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:u};let l=this;r=Math.floor(r),a=Math.floor(a);let d=[],h=[],f=[],m=[],x=0,T=[],g=i/2,p=0;D(),s===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(d),this.setAttribute("position",new zn(h,3)),this.setAttribute("normal",new zn(f,3)),this.setAttribute("uv",new zn(m,2));function D(){let y=new ge,C=new ge,N=0,O=(t-e)/i;for(let S=0;S<=a;S++){let E=[],B=S/a,F=B*(t-e)+e;for(let q=0;q<=r;q++){let b=q/r,M=b*u+o,k=Math.sin(M),V=Math.cos(M);C.x=F*k,C.y=-B*i+g,C.z=F*V,h.push(C.x,C.y,C.z),y.set(k,O,V).normalize(),f.push(y.x,y.y,y.z),m.push(b,1-B),E.push(x++)}T.push(E)}for(let S=0;S<r;S++)for(let E=0;E<a;E++){let B=T[E][S],F=T[E+1][S],q=T[E+1][S+1],b=T[E][S+1];(e>0||E!==0)&&(d.push(B,F,b),N+=3),(t>0||E!==a-1)&&(d.push(F,q,b),N+=3)}l.addGroup(p,N,0),p+=N}function v(y){let C=x,N=new Dt,O=new ge,S=0,E=y===!0?e:t,B=y===!0?1:-1;for(let q=1;q<=r;q++)h.push(0,g*B,0),f.push(0,B,0),m.push(.5,.5),x++;let F=x;for(let q=0;q<=r;q++){let M=q/r*u+o,k=Math.cos(M),V=Math.sin(M);O.x=E*V,O.y=g*B,O.z=E*k,h.push(O.x,O.y,O.z),f.push(0,B,0),N.x=k*.5+.5,N.y=V*.5*B+.5,m.push(N.x,N.y),x++}for(let q=0;q<r;q++){let b=C+q,M=F+q;y===!0?d.push(M,M+1,b):d.push(M+1,M,b),S+=3}l.addGroup(p,S,y===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Fr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){an("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,s;t?s=t:s=e*i[a-1];let o=0,u=a-1,l;for(;o<=u;)if(r=Math.floor(o+(u-o)/2),l=i[r]-s,l<0)o=r+1;else if(l>0)u=r-1;else{u=r;break}if(r=u,i[r]===s)return r/(a-1);let d=i[r],f=i[r+1]-d,m=(s-d)/f;return(r+m)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);let s=this.getPoint(r),o=this.getPoint(a),u=t||(s.isVector2?new Dt:new ge);return u.copy(o).sub(s).normalize(),u}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new ge,r=[],a=[],s=[],o=new ge,u=new Yn;for(let m=0;m<=e;m++){let x=m/e;r[m]=this.getTangentAt(x,new ge)}a[0]=new ge,s[0]=new ge;let l=Number.MAX_VALUE,d=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);d<=l&&(l=d,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),f<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let m=1;m<=e;m++){if(a[m]=a[m-1].clone(),s[m]=s[m-1].clone(),o.crossVectors(r[m-1],r[m]),o.length()>Number.EPSILON){o.normalize();let x=Math.acos(wn(r[m-1].dot(r[m]),-1,1));a[m].applyMatrix4(u.makeRotationAxis(o,x))}s[m].crossVectors(r[m],a[m])}if(t===!0){let m=Math.acos(wn(a[0].dot(a[e]),-1,1));m/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(m=-m);for(let x=1;x<=e;x++)a[x].applyMatrix4(u.makeRotationAxis(r[x],m*x)),s[x].crossVectors(r[x],a[x])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},go=class extends Fr{constructor(e=0,t=0,i=1,r=1,a=0,s=Math.PI*2,o=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=u}getPoint(e,t=new Dt){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);let o=this.aStartAngle+e*a,u=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=u-this.aX,m=l-this.aY;u=f*d-m*h+this.aX,l=f*h+m*d+this.aY}return i.set(u,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ru=class extends go{constructor(e,t,i,r,a,s){super(e,t,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function gf(){let n=0,e=0,t=0,i=0;function r(a,s,o,u){n=a,e=o,t=-3*a+3*s-2*o-u,i=2*a-2*s+o+u}return{initCatmullRom:function(a,s,o,u,l){r(s,o,l*(o-a),l*(u-s))},initNonuniformCatmullRom:function(a,s,o,u,l,d,h){let f=(s-a)/l-(o-a)/(l+d)+(o-s)/d,m=(o-s)/d-(u-s)/(d+h)+(u-o)/h;f*=d,m*=d,r(s,o,f,m)},calc:function(a){let s=a*a,o=s*a;return n+e*a+t*s+i*o}}}var ym=new ge,xm=new ge,Lh=new gf,Dh=new gf,Nh=new gf,au=class extends Fr{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new ge){let i=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e,o=Math.floor(s),u=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:u===0&&o===a-1&&(o=a-2,u=1);let l,d;this.closed||o>0?l=r[(o-1)%a]:(xm.subVectors(r[0],r[1]).add(r[0]),l=xm);let h=r[o%a],f=r[(o+1)%a];if(this.closed||o+2<a?d=r[(o+2)%a]:(ym.subVectors(r[a-1],r[a-2]).add(r[a-1]),d=ym),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,x=Math.pow(l.distanceToSquared(h),m),T=Math.pow(h.distanceToSquared(f),m),g=Math.pow(f.distanceToSquared(d),m);T<1e-4&&(T=1),x<1e-4&&(x=T),g<1e-4&&(g=T),Lh.initNonuniformCatmullRom(l.x,h.x,f.x,d.x,x,T,g),Dh.initNonuniformCatmullRom(l.y,h.y,f.y,d.y,x,T,g),Nh.initNonuniformCatmullRom(l.z,h.z,f.z,d.z,x,T,g)}else this.curveType==="catmullrom"&&(Lh.initCatmullRom(l.x,h.x,f.x,d.x,this.tension),Dh.initCatmullRom(l.y,h.y,f.y,d.y,this.tension),Nh.initCatmullRom(l.z,h.z,f.z,d.z,this.tension));return i.set(Lh.calc(u),Dh.calc(u),Nh.calc(u)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new ge().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _m(n,e,t,i,r){let a=(i-e)*.5,s=(r-t)*.5,o=n*n,u=n*o;return(2*t-2*i+a+s)*u+(-3*t+3*i-2*a-s)*o+a*n+t}function Xg(n,e){let t=1-n;return t*t*e}function Yg(n,e){return 2*(1-n)*n*e}function qg(n,e){return n*n*e}function al(n,e,t,i){return Xg(n,e)+Yg(n,t)+qg(n,i)}function Zg(n,e){let t=1-n;return t*t*t*e}function Jg(n,e){let t=1-n;return 3*t*t*n*e}function $g(n,e){return 3*(1-n)*n*n*e}function Kg(n,e){return n*n*n*e}function sl(n,e,t,i,r){return Zg(n,e)+Jg(n,t)+$g(n,i)+Kg(n,r)}var _l=class extends Fr{constructor(e=new Dt,t=new Dt,i=new Dt,r=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Dt){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(sl(e,r.x,a.x,s.x,o.x),sl(e,r.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},su=class extends Fr{constructor(e=new ge,t=new ge,i=new ge,r=new ge){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new ge){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(sl(e,r.x,a.x,s.x,o.x),sl(e,r.y,a.y,s.y,o.y),sl(e,r.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ml=class extends Fr{constructor(e=new Dt,t=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Dt){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Dt){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ou=class extends Fr{constructor(e=new ge,t=new ge){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new ge){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sl=class extends Fr{constructor(e=new Dt,t=new Dt,i=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Dt){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(al(e,r.x,a.x,s.x),al(e,r.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lu=class extends Fr{constructor(e=new ge,t=new ge,i=new ge){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ge){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(al(e,r.x,a.x,s.x),al(e,r.y,a.y,s.y),al(e,r.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bl=class extends Fr{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Dt){let i=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,u=r[s===0?s:s-1],l=r[s],d=r[s>r.length-2?r.length-1:s+1],h=r[s>r.length-3?r.length-1:s+2];return i.set(_m(o,u.x,l.x,d.x,h.x),_m(o,u.y,l.y,d.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Dt().fromArray(r))}return this}},Mm=Object.freeze({__proto__:null,ArcCurve:ru,CatmullRomCurve3:au,CubicBezierCurve:_l,CubicBezierCurve3:su,EllipseCurve:go,LineCurve:Ml,LineCurve3:ou,QuadraticBezierCurve:Sl,QuadraticBezierCurve3:lu,SplineCurve:bl}),cu=class extends Fr{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mm[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let s=r[a]-i,o=this.curves[a],u=o.getLength(),l=u===0?0:1-s/u;return o.getPointAt(l,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let s=a[r],o=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,u=s.getPoints(o);for(let l=0;l<u.length;l++){let d=u[l];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Mm[r.type]().fromJSON(r))}return this}},Rs=class extends cu{constructor(e){super(),this.type="Path",this.currentPoint=new Dt,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Ml(this.currentPoint.clone(),new Dt(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new Sl(this.currentPoint.clone(),new Dt(e,t),new Dt(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,s){let o=new _l(this.currentPoint.clone(),new Dt(e,t),new Dt(i,r),new Dt(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new bl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,s){let o=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+o,t+u,i,r,a,s),this}absarc(e,t,i,r,a,s){return this.absellipse(e,t,i,i,r,a,s),this}ellipse(e,t,i,r,a,s,o,u){let l=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+l,t+d,i,r,a,s,o,u),this}absellipse(e,t,i,r,a,s,o,u){let l=new go(e,t,i,r,a,s,o,u);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let d=l.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},yo=class extends Rs{constructor(e){super(e),this.uuid=Eo(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Rs().fromJSON(r))}return this}};function Qg(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,a=g0(n,0,r,t,!0),s=[];if(!a||a.next===a.prev)return s;let o,u,l;if(i&&(a=iy(n,e,a,t)),n.length>80*t){o=n[0],u=n[1];let d=o,h=u;for(let f=t;f<r;f+=t){let m=n[f],x=n[f+1];m<o&&(o=m),x<u&&(u=x),m>d&&(d=m),x>h&&(h=x)}l=Math.max(d-o,h-u),l=l!==0?32767/l:0}return wl(a,s,t,o,u,l,0),s}function g0(n,e,t,i,r){let a;if(r===py(n,e,t,i)>0)for(let s=e;s<t;s+=i)a=Sm(s/i|0,n[s],n[s+1],a);else for(let s=t-i;s>=e;s-=i)a=Sm(s/i|0,n[s],n[s+1],a);return a&&xo(a,a.next)&&(El(a),a=a.next),a}function Ps(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(xo(t,t.next)||vi(t.prev,t,t.next)===0)){if(El(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function wl(n,e,t,i,r,a,s){if(!n)return;!s&&a&&ly(n,i,r,a);let o=n;for(;n.prev!==n.next;){let u=n.prev,l=n.next;if(a?ey(n,i,r,a):jg(n)){e.push(u.i,n.i,l.i),El(n),n=l.next,o=l.next;continue}if(n=l,n===o){s?s===1?(n=ty(Ps(n),e),wl(n,e,t,i,r,a,2)):s===2&&ny(n,e,t,i,r,a):wl(Ps(n),e,t,i,r,a,1);break}}}function jg(n){let e=n.prev,t=n,i=n.next;if(vi(e,t,i)>=0)return!1;let r=e.x,a=t.x,s=i.x,o=e.y,u=t.y,l=i.y,d=Math.min(r,a,s),h=Math.min(o,u,l),f=Math.max(r,a,s),m=Math.max(o,u,l),x=i.next;for(;x!==e;){if(x.x>=d&&x.x<=f&&x.y>=h&&x.y<=m&&rl(r,o,a,u,s,l,x.x,x.y)&&vi(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function ey(n,e,t,i){let r=n.prev,a=n,s=n.next;if(vi(r,a,s)>=0)return!1;let o=r.x,u=a.x,l=s.x,d=r.y,h=a.y,f=s.y,m=Math.min(o,u,l),x=Math.min(d,h,f),T=Math.max(o,u,l),g=Math.max(d,h,f),p=Vh(m,x,e,t,i),D=Vh(T,g,e,t,i),v=n.prevZ,y=n.nextZ;for(;v&&v.z>=p&&y&&y.z<=D;){if(v.x>=m&&v.x<=T&&v.y>=x&&v.y<=g&&v!==r&&v!==s&&rl(o,d,u,h,l,f,v.x,v.y)&&vi(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=m&&y.x<=T&&y.y>=x&&y.y<=g&&y!==r&&y!==s&&rl(o,d,u,h,l,f,y.x,y.y)&&vi(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=m&&v.x<=T&&v.y>=x&&v.y<=g&&v!==r&&v!==s&&rl(o,d,u,h,l,f,v.x,v.y)&&vi(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=D;){if(y.x>=m&&y.x<=T&&y.y>=x&&y.y<=g&&y!==r&&y!==s&&rl(o,d,u,h,l,f,y.x,y.y)&&vi(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ty(n,e){let t=n;do{let i=t.prev,r=t.next.next;!xo(i,r)&&x0(i,t,t.next,r)&&Tl(i,r)&&Tl(r,i)&&(e.push(i.i,t.i,r.i),El(t),El(t.next),t=n=r),t=t.next}while(t!==n);return Ps(t)}function ny(n,e,t,i,r,a){let s=n;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&dy(s,o)){let u=_0(s,o);s=Ps(s,s.next),u=Ps(u,u.next),wl(s,e,t,i,r,a,0),wl(u,e,t,i,r,a,0);return}o=o.next}s=s.next}while(s!==n)}function iy(n,e,t,i){let r=[];for(let a=0,s=e.length;a<s;a++){let o=e[a]*i,u=a<s-1?e[a+1]*i:n.length,l=g0(n,o,u,i,!1);l===l.next&&(l.steiner=!0),r.push(uy(l))}r.sort(ry);for(let a=0;a<r.length;a++)t=ay(r[a],t);return t}function ry(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function ay(n,e){let t=sy(n,e);if(!t)return e;let i=_0(t,n);return Ps(i,i.next),Ps(t,t.next)}function sy(n,e){let t=e,i=n.x,r=n.y,a=-1/0,s;if(xo(n,t))return t;do{if(xo(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>a&&(a=h,s=t.x<t.next.x?t:t.next,h===i))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,u=s.x,l=s.y,d=1/0;t=s;do{if(i>=t.x&&t.x>=u&&i!==t.x&&y0(r<l?i:a,r,u,l,r<l?a:i,r,t.x,t.y)){let h=Math.abs(r-t.y)/(i-t.x);Tl(t,n)&&(h<d||h===d&&(t.x>s.x||t.x===s.x&&oy(s,t)))&&(s=t,d=h)}t=t.next}while(t!==o);return s}function oy(n,e){return vi(n.prev,n,e.prev)<0&&vi(e.next,n,n.next)<0}function ly(n,e,t,i){let r=n;do r.z===0&&(r.z=Vh(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,cy(r)}function cy(n){let e,t=1;do{let i=n,r;n=null;let a=null;for(e=0;i;){e++;let s=i,o=0;for(let l=0;l<t&&(o++,s=s.nextZ,!!s);l++);let u=t;for(;o>0||u>0&&s;)o!==0&&(u===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,o--):(r=s,s=s.nextZ,u--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;i=s}a.nextZ=null,t*=2}while(e>1);return n}function Vh(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function uy(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function y0(n,e,t,i,r,a,s,o){return(r-s)*(e-o)>=(n-s)*(a-o)&&(n-s)*(i-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(r-s)*(i-o)}function rl(n,e,t,i,r,a,s,o){return!(n===s&&e===o)&&y0(n,e,t,i,r,a,s,o)}function dy(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!hy(n,e)&&(Tl(n,e)&&Tl(e,n)&&fy(n,e)&&(vi(n.prev,n,e.prev)||vi(n,e.prev,e))||xo(n,e)&&vi(n.prev,n,n.next)>0&&vi(e.prev,e,e.next)>0)}function vi(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function xo(n,e){return n.x===e.x&&n.y===e.y}function x0(n,e,t,i){let r=Bc(vi(n,e,t)),a=Bc(vi(n,e,i)),s=Bc(vi(t,i,n)),o=Bc(vi(t,i,e));return!!(r!==a&&s!==o||r===0&&Oc(n,t,e)||a===0&&Oc(n,i,e)||s===0&&Oc(t,n,i)||o===0&&Oc(t,e,i))}function Oc(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Bc(n){return n>0?1:n<0?-1:0}function hy(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&x0(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Tl(n,e){return vi(n.prev,n,n.next)<0?vi(n,e,n.next)>=0&&vi(n,n.prev,e)>=0:vi(n,e,n.prev)<0||vi(n,n.next,e)<0}function fy(n,e){let t=n,i=!1,r=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&r<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function _0(n,e){let t=Gh(n.i,n.x,n.y),i=Gh(e.i,e.x,e.y),r=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function Sm(n,e,t,i){let r=Gh(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function El(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Gh(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function py(n,e,t,i){let r=0;for(let a=e,s=t-i;a<t;a+=i)r+=(n[s]-n[a])*(n[a+1]+n[s+1]),s=a;return r}var Hh=class{static triangulate(e,t,i=2){return Qg(e,t,i)}},oo=class n{static area(e){let t=e.length,i=0;for(let r=t-1,a=0;a<t;r=a++)i+=e[r].x*e[a].y-e[a].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],a=[];bm(e),wm(i,e);let s=e.length;t.forEach(bm);for(let u=0;u<t.length;u++)r.push(s),s+=t[u].length,wm(i,t[u]);let o=Hh.triangulate(i,r);for(let u=0;u<o.length;u+=3)a.push(o.slice(u,u+3));return a}};function bm(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function wm(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Al=class n extends Xi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let a=e/2,s=t/2,o=Math.floor(i),u=Math.floor(r),l=o+1,d=u+1,h=e/o,f=t/u,m=[],x=[],T=[],g=[];for(let p=0;p<d;p++){let D=p*f-s;for(let v=0;v<l;v++){let y=v*h-a;x.push(y,-D,0),T.push(0,0,1),g.push(v/o),g.push(1-p/u)}}for(let p=0;p<u;p++)for(let D=0;D<o;D++){let v=D+l*p,y=D+l*(p+1),C=D+1+l*(p+1),N=D+1+l*p;m.push(v,y,N),m.push(y,C,N)}this.setIndex(m),this.setAttribute("position",new zn(x,3)),this.setAttribute("normal",new zn(T,3)),this.setAttribute("uv",new zn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},_o=class n extends Xi{constructor(e=.5,t=1,i=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:a,thetaLength:s},i=Math.max(3,i),r=Math.max(1,r);let o=[],u=[],l=[],d=[],h=e,f=(t-e)/r,m=new ge,x=new Dt;for(let T=0;T<=r;T++){for(let g=0;g<=i;g++){let p=a+g/i*s;m.x=h*Math.cos(p),m.y=h*Math.sin(p),u.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,d.push(x.x,x.y)}h+=f}for(let T=0;T<r;T++){let g=T*(i+1);for(let p=0;p<i;p++){let D=p+g,v=D,y=D+i+1,C=D+i+2,N=D+1;o.push(v,y,N),o.push(y,C,N)}}this.setIndex(o),this.setAttribute("position",new zn(u,3)),this.setAttribute("normal",new zn(l,3)),this.setAttribute("uv",new zn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Il=class n extends Xi{constructor(e=new yo([new Dt(0,.5),new Dt(-.5,-.5),new Dt(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],a=[],s=[],o=0,u=0;if(Array.isArray(e)===!1)l(e);else for(let d=0;d<e.length;d++)l(e[d]),this.addGroup(o,u,d),o+=u,u=0;this.setIndex(i),this.setAttribute("position",new zn(r,3)),this.setAttribute("normal",new zn(a,3)),this.setAttribute("uv",new zn(s,2));function l(d){let h=r.length/3,f=d.extractPoints(t),m=f.shape,x=f.holes;oo.isClockWise(m)===!1&&(m=m.reverse());for(let g=0,p=x.length;g<p;g++){let D=x[g];oo.isClockWise(D)===!0&&(x[g]=D.reverse())}let T=oo.triangulateShape(m,x);for(let g=0,p=x.length;g<p;g++){let D=x[g];m=m.concat(D)}for(let g=0,p=m.length;g<p;g++){let D=m[g];r.push(D.x,D.y,0),a.push(0,0,1),s.push(D.x,D.y)}for(let g=0,p=T.length;g<p;g++){let D=T[g],v=D[0]+h,y=D[1]+h,C=D[2]+h;i.push(v,y,C),u+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return my(t,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let s=t[e.shapes[r]];i.push(s)}return new n(i,e.curveSegments)}};function my(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var ss=class n extends Xi{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let u=Math.min(s+o,Math.PI),l=0,d=[],h=new ge,f=new ge,m=[],x=[],T=[],g=[];for(let p=0;p<=i;p++){let D=[],v=p/i,y=s+v*o,C=e*Math.cos(y),N=Math.sqrt(e*e-C*C),O=0;p===0&&s===0?O=.5/t:p===i&&u===Math.PI&&(O=-.5/t);for(let S=0;S<=t;S++){let E=S/t,B=r+E*a;h.x=-N*Math.cos(B),h.y=C,h.z=N*Math.sin(B),x.push(h.x,h.y,h.z),f.copy(h).normalize(),T.push(f.x,f.y,f.z),g.push(E+O,1-v),D.push(l++)}d.push(D)}for(let p=0;p<i;p++)for(let D=0;D<t;D++){let v=d[p][D+1],y=d[p][D],C=d[p+1][D],N=d[p+1][D+1];(p!==0||s>0)&&m.push(v,y,N),(p!==i-1||u<Math.PI)&&m.push(y,C,N)}this.setIndex(m),this.setAttribute("position",new zn(x,3)),this.setAttribute("normal",new zn(T,3)),this.setAttribute("uv",new zn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ns(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Tm(r))r.isRenderTargetTexture?(an("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Tm(r[0])){let a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function rr(n){let e={};for(let t=0;t<n.length;t++){let i=Ns(n[t]);for(let r in i)e[r]=i[r]}return e}function Tm(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function vy(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yf(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:An.workingColorSpace}var M0={clone:Ns,merge:rr},gy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Or=class extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gy,this.fragmentShader=yy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=vy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new mn().setHex(r.value);break;case"v2":this.uniforms[i].value=new Dt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new ge().fromArray(r.value);break;case"v4":this.uniforms[i].value=new hi().fromArray(r.value);break;case"m3":this.uniforms[i].value=new un().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Yn().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},uu=class extends Or{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Yi=class extends rs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new mn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=md,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ga,this.combine=Iu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},du=class extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=n0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},hu=class extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function io(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Uh(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var os=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<a)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=r,r=t[++i],e<r)break t}s=t.length;break n}if(!(e>=a)){let o=t[1];e<o&&(i=2,a=o);for(let u=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(r=a,a=t[--i-1],e>=a)break t}s=i,i=0;break n}break e}for(;i<s;){let o=i+s>>>1;e<t[o]?s=o:i=o+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let s=0;s!==r;++s)t[s]=i[a+s];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},fu=class extends os{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bh,endingEnd:Bh}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,s=e+1,o=r[a],u=r[s];if(o===void 0)switch(this.getSettings_().endingStart){case kh:a=e,o=2*t-i;break;case zh:a=r.length-2,o=t+r[a]-r[a+1];break;default:a=e,o=i}if(u===void 0)switch(this.getSettings_().endingEnd){case kh:s=e,u=2*i-t;break;case zh:s=1,u=i+r[1]-r[0];break;default:s=e-1,u=t}let l=(i-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(u-i),this._offsetPrev=a*d,this._offsetNext=s*d}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,m=this._weightNext,x=(i-t)/(r-t),T=x*x,g=T*x,p=-f*g+2*f*T-f*x,D=(1+f)*g+(-1.5-2*f)*T+(-.5+f)*x+1,v=(-1-m)*g+(1.5+m)*T+.5*x,y=m*g-m*T;for(let C=0;C!==o;++C)a[C]=p*s[d+C]+D*s[l+C]+v*s[u+C]+y*s[h+C];return a}},pu=class extends os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=(i-t)/(r-t),h=1-d;for(let f=0;f!==o;++f)a[f]=s[l+f]*h+s[u+f]*d;return a}},mu=class extends os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vu=class extends os{interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=this.inTangents,h=this.outTangents;if(!d||!h){let x=(i-t)/(r-t),T=1-x;for(let g=0;g!==o;++g)a[g]=s[l+g]*T+s[u+g]*x;return a}let f=o*2,m=e-1;for(let x=0;x!==o;++x){let T=s[l+x],g=s[u+x],p=m*f+x*2,D=h[p],v=h[p+1],y=e*f+x*2,C=d[y],N=d[y+1],O=_y(i,t,D,C,r);a[x]=S0(O,T,v,N,g)}return a}};function S0(n,e,t,i,r){let a=1-n;return a*a*a*e+3*a*a*n*t+3*a*n*n*i+n*n*n*r}function xy(n,e,t,i,r){let a=1-n;return 3*a*a*(t-e)+6*a*n*(i-t)+3*n*n*(r-i)}function _y(n,e,t,i,r){let a=(n-e)/(r-e);for(let s=0;s<8;s++){let o=S0(a,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let u=xy(a,e,t,i,r);if(Math.abs(u)<1e-10)break;a=Math.max(0,Math.min(1,a-o/u))}return a}var Br=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=io(t,this.TimeBufferType),this.values=io(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:io(e.times,Array),values:io(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Uh(e.settings)&&(i.settings={inTangents:io(e.settings.inTangents,Array),outTangents:io(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new pu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vu(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ol:t=this.InterpolantFactoryMethodDiscrete;break;case Qc:t=this.InterpolantFactoryMethodLinear;break;case Vc:t=this.InterpolantFactoryMethodSmooth;break;case Oh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return an("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ol;case this.InterpolantFactoryMethodLinear:return Qc;case this.InterpolantFactoryMethodSmooth:return Vc;case this.InterpolantFactoryMethodBezier:return Oh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Uh(this.settings)&&(Em(this.settings.inTangents,e),Em(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,s=r-1;for(;a!==r&&i[a]<e;)++a;for(;s!==-1&&i[s]>t;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let o=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*o,s*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(sn("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(sn("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==a;o++){let u=i[o];if(typeof u=="number"&&isNaN(u)){sn("KeyframeTrack: Time is not a valid number.",this,o,u),e=!1;break}if(s!==null&&s>u){sn("KeyframeTrack: Out of order keys.",this,o,u,s),e=!1;break}s=u}if(r!==void 0&&wg(r))for(let o=0,u=r.length;o!==u;++o){let l=r[o];if(isNaN(l)){sn("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Vc,a=e.length-1,s=1;for(let o=1;o<a;++o){let u=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(r)u=!0;else{let h=o*i,f=h-i,m=h+i;for(let x=0;x!==i;++x){let T=t[h+x];if(T!==t[f+x]||T!==t[m+x]){u=!0;break}}}if(u){if(o!==s){e[s]=e[o];let h=o*i,f=s*i;for(let m=0;m!==i;++m)t[f+m]=t[h+m]}++s}}if(a>0){e[s]=e[a];for(let o=a*i,u=s*i,l=0;l!==i;++l)t[u+l]=t[o+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Uh(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Em(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Br.prototype.ValueTypeName="";Br.prototype.TimeBufferType=Float32Array;Br.prototype.ValueBufferType=Float32Array;Br.prototype.DefaultInterpolation=Qc;var ls=class extends Br{constructor(e,t,i){super(e,t,i)}};ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=ol;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;var gu=class extends Br{constructor(e,t,i,r){super(e,t,i,r)}};gu.prototype.ValueTypeName="color";var yu=class extends Br{constructor(e,t,i,r){super(e,t,i,r)}};yu.prototype.ValueTypeName="number";var xu=class extends os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=(i-t)/(r-t),l=e*o;for(let d=l+o;l!==d;l+=4)_a.slerpFlat(a,0,s,l-o,s,l,u);return a}},Cl=class extends Br{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new xu(this.times,this.values,this.getValueSize(),e)}};Cl.prototype.ValueTypeName="quaternion";Cl.prototype.InterpolantFactoryMethodSmooth=void 0;var cs=class extends Br{constructor(e,t,i){super(e,t,i)}};cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=ol;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var _u=class extends Br{constructor(e,t,i,r){super(e,t,i,r)}};_u.prototype.ValueTypeName="vector";var Mu=class{constructor(e,t,i){let r=this,a=!1,s=0,o=0,u,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,a===!1&&r.onStart!==void 0&&r.onStart(d,s,o),a=!0},this.itemEnd=function(d){s++,r.onProgress!==void 0&&r.onProgress(d,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),u?u(d):d},this.setURLModifier=function(d){return u=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){let h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=l.length;h<f;h+=2){let m=l[h],x=l[h+1];if(m.global&&(m.lastIndex=0),m.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},b0=new Mu,Su=class{constructor(e){this.manager=e!==void 0?e:b0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Su.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rl=class extends ir{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new mn(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Pl=class extends Rl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ir.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mn(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Fh=new Yn,Am=new ge,Im=new ge,bu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.mapType=Tr,this.map=null,this.mapPass=null,this.matrix=new Yn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mo,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new hi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Am.setFromMatrixPosition(e.matrixWorld),t.position.copy(Am),Im.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Im),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Fh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Fh,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,s=r?r.z/a.x:1,o=r?r.w/a.y:1,u=r?r.x/a.x:0,l=r?r.y/a.y:0;e.coordinateSystem===co||e.reversedDepth?t.set(.5*s,0,0,.5*s+u,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*s,0,0,.5*s+u,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Fh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},kc=new ge,zc=new _a,va=new ge,Ll=class extends ir{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yn,this.projectionMatrix=new Yn,this.projectionMatrixInverse=new Yn,this.coordinateSystem=ea,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kc,zc,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,zc,va.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(kc,zc,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,zc,va.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ts=new ge,Cm=new Dt,Rm=new Dt,tr=class extends Ll{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=jc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(dh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jc*2*Math.atan(Math.tan(dh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,Cm,Rm),t.subVectors(Rm,Cm)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(dh*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let u=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/u,t-=s.offsetY*i/l,r*=s.width/u,i*=s.height/l}let o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Mo=class extends Ll{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,s=i+e,o=r+t,u=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=d*this.view.offsetY,u=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Wh=class extends bu{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dl=class extends Rl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ir.DEFAULT_UP),this.updateMatrix(),this.target=new ir,this.shadow=new Wh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ro=-90,ao=1,wu=class extends ir{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new tr(ro,ao,e,t);r.layers=this.layers,this.add(r);let a=new tr(ro,ao,e,t);a.layers=this.layers,this.add(a);let s=new tr(ro,ao,e,t);s.layers=this.layers,this.add(s);let o=new tr(ro,ao,e,t);o.layers=this.layers,this.add(o);let u=new tr(ro,ao,e,t);u.layers=this.layers,this.add(u);let l=new tr(ro,ao,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,u]=t;for(let l of t)this.remove(l);if(e===ea)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===co)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,o,u,l,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let T=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=T,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,f,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Tu=class extends tr{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var xf="\\[\\]\\.:\\/",My=new RegExp("["+xf+"]","g"),_f="[^"+xf+"]",Sy="[^"+xf.replace("\\.","")+"]",by=/((?:WC+[\/:])*)/.source.replace("WC",_f),wy=/(WCOD+)?/.source.replace("WCOD",Sy),Ty=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_f),Ey=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_f),Ay=new RegExp("^"+by+wy+Ty+Ey+"$"),Iy=["material","materials","bones","map"],Xh=class{constructor(e,t,i){let r=i||ri.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ri=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(My,"")}static parseTrackName(e){let t=Ay.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);Iy.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(a){for(let s=0;s<a.length;s++){let o=a[s];if(o.name===t||o.uuid===t)return o;let u=i(o.children);if(u)return u}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){an("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){sn("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){sn("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){sn("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){sn("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){sn("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){sn("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){sn("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;sn("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){sn("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){sn("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}u=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(u=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ri.Composite=Xh;ri.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ri.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ri.prototype.GetterByBindingType=[ri.prototype._getValue_direct,ri.prototype._getValue_array,ri.prototype._getValue_arrayElement,ri.prototype._getValue_toArray];ri.prototype.SetterByBindingTypeAndVersioning=[[ri.prototype._setValue_direct,ri.prototype._setValue_direct_setNeedsUpdate,ri.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ri.prototype._setValue_array,ri.prototype._setValue_array_setNeedsUpdate,ri.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ri.prototype._setValue_arrayElement,ri.prototype._setValue_arrayElement_setNeedsUpdate,ri.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ri.prototype._setValue_fromArray,ri.prototype._setValue_fromArray_setNeedsUpdate,ri.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aw=new Float32Array(1);var Pm=new Yn,Nl=class{constructor(e,t,i=0,r=1/0){this.ray=new ml(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new fo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):sn("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pm),this}intersectObject(e,t=!0,i=[]){return Yh(e,this,i,t),i.sort(Lm),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)Yh(e[r],this,i,t);return i.sort(Lm),i}};function Lm(n,e){return n.distance-e.distance}function Yh(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let a=n.children;for(let s=0,o=a.length;s<o;s++)Yh(a[s],e,t,!0)}}var Ef=class Ef{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}};Ef.prototype.isMatrix2=!0;var qh=Ef;function Mf(n,e,t,i){let r=Cy(i);switch(t){case ff:return n*e;case Uu:return n*e/r.components*r.byteLength;case Fu:return n*e/r.components*r.byteLength;case ps:return n*e*2/r.components*r.byteLength;case Ou:return n*e*2/r.components*r.byteLength;case pf:return n*e*3/r.components*r.byteLength;case Wr:return n*e*4/r.components*r.byteLength;case Bu:return n*e*4/r.components*r.byteLength;case Bl:case kl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zl:case Vl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zu:case Gu:return Math.max(n,16)*Math.max(e,8)/4;case ku:case Vu:return Math.max(n,8)*Math.max(e,8)/2;case Hu:case Wu:case Yu:case qu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xu:case Gl:case Zu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ju:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $u:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ku:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ju:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ed:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case td:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case nd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case id:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case rd:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ad:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case sd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case od:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ld:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case cd:case ud:case dd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hd:case fd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Hl:case pd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cy(n){switch(n){case Tr:case cf:return{byteLength:1,components:1};case wo:case uf:case ia:return{byteLength:2,components:1};case Du:case Nu:return{byteLength:2,components:4};case na:case Lu:case Hr:return{byteLength:4,components:1};case df:case hf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?an("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function X0(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Py(n){let e=new WeakMap;function t(o,u){let l=o.array,d=o.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(u,f),n.bufferData(u,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,u,l){let d=u.array,h=u.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((m,x)=>m.start-x.start);let f=0;for(let m=1;m<h.length;m++){let x=h[f],T=h[m];T.start<=x.start+x.count+1?x.count=Math.max(x.count,T.start+T.count-x.start):(++f,h[f]=T)}h.length=f+1;for(let m=0,x=h.length;m<x;m++){let T=h[m];n.bufferSubData(l,T.start*d.BYTES_PER_ELEMENT,d,T.start,T.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let u=e.get(o);u&&(n.deleteBuffer(u.buffer),e.delete(o))}function s(o,u){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,u));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,u),l.version=o.version}}return{get:r,remove:a,update:s}}var Ly=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dy=`#ifdef USE_ALPHAHASH
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
#endif`,Ny=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Oy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,By=`#ifdef USE_AOMAP
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
#endif`,ky=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zy=`#ifdef USE_BATCHING
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
#endif`,Vy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xy=`#ifdef USE_IRIDESCENCE
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
#endif`,Yy=`#ifdef USE_BUMPMAP
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
#endif`,qy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$y=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,tx=`#define PI 3.141592653589793
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
} // validated`,nx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ix=`vec3 transformedNormal = objectNormal;
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
#endif`,rx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ox=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lx="gl_FragColor = linearToOutputTexel( gl_FragColor );",cx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ux=`#ifdef USE_ENVMAP
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
#endif`,dx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hx=`#ifdef USE_ENVMAP
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
#endif`,fx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xx=`#ifdef USE_GRADIENTMAP
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
}`,_x=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wx=`#ifdef USE_ENVMAP
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
#endif`,Tx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ex=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ax=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ix=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cx=`PhysicalMaterial material;
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
#endif`,Rx=`uniform sampler2D dfgLUT;
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
}`,Px=`
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
#endif`,Lx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Dx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ux=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gx=`#if defined( USE_POINTS_UV )
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
#endif`,Hx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`#ifdef USE_MORPHTARGETS
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
#endif`,Jx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$x=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,t_=`#ifdef USE_NORMALMAP
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
#endif`,n_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,o_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,l_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,g_=`float getShadowMask() {
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
}`,y_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x_=`#ifdef USE_SKINNING
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
#endif`,__=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M_=`#ifdef USE_SKINNING
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
#endif`,S_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,E_=`#ifdef USE_TRANSMISSION
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
#endif`,A_=`#ifdef USE_TRANSMISSION
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
#endif`,I_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,L_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D_=`uniform sampler2D t2D;
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
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,F_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`#include <common>
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
}`,k_=`#if DEPTH_PACKING == 3200
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
}`,z_=`#define DISTANCE
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
}`,V_=`#define DISTANCE
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
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`uniform float scale;
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
}`,X_=`uniform vec3 diffuse;
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
}`,Y_=`#include <common>
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
}`,q_=`uniform vec3 diffuse;
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
}`,Z_=`#define LAMBERT
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
}`,J_=`#define LAMBERT
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
}`,$_=`#define MATCAP
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
}`,K_=`#define MATCAP
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
}`,Q_=`#define NORMAL
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
}`,j_=`#define NORMAL
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
}`,eM=`#define PHONG
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
}`,tM=`#define PHONG
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
}`,nM=`#define STANDARD
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
}`,iM=`#define STANDARD
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
}`,rM=`#define TOON
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
}`,aM=`#define TOON
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
}`,sM=`uniform float size;
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
}`,oM=`uniform vec3 diffuse;
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
}`,lM=`#include <common>
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
}`,cM=`uniform vec3 color;
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
}`,uM=`uniform float rotation;
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
}`,dM=`uniform vec3 diffuse;
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
}`,vn={alphahash_fragment:Ly,alphahash_pars_fragment:Dy,alphamap_fragment:Ny,alphamap_pars_fragment:Uy,alphatest_fragment:Fy,alphatest_pars_fragment:Oy,aomap_fragment:By,aomap_pars_fragment:ky,batching_pars_vertex:zy,batching_vertex:Vy,begin_vertex:Gy,beginnormal_vertex:Hy,bsdfs:Wy,iridescence_fragment:Xy,bumpmap_pars_fragment:Yy,clipping_planes_fragment:qy,clipping_planes_pars_fragment:Zy,clipping_planes_pars_vertex:Jy,clipping_planes_vertex:$y,color_fragment:Ky,color_pars_fragment:Qy,color_pars_vertex:jy,color_vertex:ex,common:tx,cube_uv_reflection_fragment:nx,defaultnormal_vertex:ix,displacementmap_pars_vertex:rx,displacementmap_vertex:ax,emissivemap_fragment:sx,emissivemap_pars_fragment:ox,colorspace_fragment:lx,colorspace_pars_fragment:cx,envmap_fragment:ux,envmap_common_pars_fragment:dx,envmap_pars_fragment:hx,envmap_pars_vertex:fx,envmap_physical_pars_fragment:wx,envmap_vertex:px,fog_vertex:mx,fog_pars_vertex:vx,fog_fragment:gx,fog_pars_fragment:yx,gradientmap_pars_fragment:xx,lightmap_pars_fragment:_x,lights_lambert_fragment:Mx,lights_lambert_pars_fragment:Sx,lights_pars_begin:bx,lights_toon_fragment:Tx,lights_toon_pars_fragment:Ex,lights_phong_fragment:Ax,lights_phong_pars_fragment:Ix,lights_physical_fragment:Cx,lights_physical_pars_fragment:Rx,lights_fragment_begin:Px,lights_fragment_maps:Lx,lights_fragment_end:Dx,lightprobes_pars_fragment:Nx,logdepthbuf_fragment:Ux,logdepthbuf_pars_fragment:Fx,logdepthbuf_pars_vertex:Ox,logdepthbuf_vertex:Bx,map_fragment:kx,map_pars_fragment:zx,map_particle_fragment:Vx,map_particle_pars_fragment:Gx,metalnessmap_fragment:Hx,metalnessmap_pars_fragment:Wx,morphinstance_vertex:Xx,morphcolor_vertex:Yx,morphnormal_vertex:qx,morphtarget_pars_vertex:Zx,morphtarget_vertex:Jx,normal_fragment_begin:$x,normal_fragment_maps:Kx,normal_pars_fragment:Qx,normal_pars_vertex:jx,normal_vertex:e_,normalmap_pars_fragment:t_,clearcoat_normal_fragment_begin:n_,clearcoat_normal_fragment_maps:i_,clearcoat_pars_fragment:r_,iridescence_pars_fragment:a_,opaque_fragment:s_,packing:o_,premultiplied_alpha_fragment:l_,project_vertex:c_,dithering_fragment:u_,dithering_pars_fragment:d_,roughnessmap_fragment:h_,roughnessmap_pars_fragment:f_,shadowmap_pars_fragment:p_,shadowmap_pars_vertex:m_,shadowmap_vertex:v_,shadowmask_pars_fragment:g_,skinbase_vertex:y_,skinning_pars_vertex:x_,skinning_vertex:__,skinnormal_vertex:M_,specularmap_fragment:S_,specularmap_pars_fragment:b_,tonemapping_fragment:w_,tonemapping_pars_fragment:T_,transmission_fragment:E_,transmission_pars_fragment:A_,uv_pars_fragment:I_,uv_pars_vertex:C_,uv_vertex:R_,worldpos_vertex:P_,background_vert:L_,background_frag:D_,backgroundCube_vert:N_,backgroundCube_frag:U_,cube_vert:F_,cube_frag:O_,depth_vert:B_,depth_frag:k_,distance_vert:z_,distance_frag:V_,equirect_vert:G_,equirect_frag:H_,linedashed_vert:W_,linedashed_frag:X_,meshbasic_vert:Y_,meshbasic_frag:q_,meshlambert_vert:Z_,meshlambert_frag:J_,meshmatcap_vert:$_,meshmatcap_frag:K_,meshnormal_vert:Q_,meshnormal_frag:j_,meshphong_vert:eM,meshphong_frag:tM,meshphysical_vert:nM,meshphysical_frag:iM,meshtoon_vert:rM,meshtoon_frag:aM,points_vert:sM,points_frag:oM,shadow_vert:lM,shadow_frag:cM,sprite_vert:uM,sprite_frag:dM},At={common:{diffuse:{value:new mn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new un}},envmap:{envMap:{value:null},envMapRotation:{value:new un},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new un}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new un}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new un},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new un},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new un},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new un}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new un}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new un}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ge},probesMax:{value:new ge},probesResolution:{value:new ge}},points:{diffuse:{value:new mn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0},uvTransform:{value:new un}},sprite:{diffuse:{value:new mn(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}}},Ea={basic:{uniforms:rr([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:vn.meshbasic_vert,fragmentShader:vn.meshbasic_frag},lambert:{uniforms:rr([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new mn(0)},envMapIntensity:{value:1}}]),vertexShader:vn.meshlambert_vert,fragmentShader:vn.meshlambert_frag},phong:{uniforms:rr([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new mn(0)},specular:{value:new mn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:vn.meshphong_vert,fragmentShader:vn.meshphong_frag},standard:{uniforms:rr([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new mn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vn.meshphysical_vert,fragmentShader:vn.meshphysical_frag},toon:{uniforms:rr([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new mn(0)}}]),vertexShader:vn.meshtoon_vert,fragmentShader:vn.meshtoon_frag},matcap:{uniforms:rr([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:vn.meshmatcap_vert,fragmentShader:vn.meshmatcap_frag},points:{uniforms:rr([At.points,At.fog]),vertexShader:vn.points_vert,fragmentShader:vn.points_frag},dashed:{uniforms:rr([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vn.linedashed_vert,fragmentShader:vn.linedashed_frag},depth:{uniforms:rr([At.common,At.displacementmap]),vertexShader:vn.depth_vert,fragmentShader:vn.depth_frag},normal:{uniforms:rr([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:vn.meshnormal_vert,fragmentShader:vn.meshnormal_frag},sprite:{uniforms:rr([At.sprite,At.fog]),vertexShader:vn.sprite_vert,fragmentShader:vn.sprite_frag},background:{uniforms:{uvTransform:{value:new un},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vn.background_vert,fragmentShader:vn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new un}},vertexShader:vn.backgroundCube_vert,fragmentShader:vn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vn.cube_vert,fragmentShader:vn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vn.equirect_vert,fragmentShader:vn.equirect_frag},distance:{uniforms:rr([At.common,At.displacementmap,{referencePosition:{value:new ge},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vn.distance_vert,fragmentShader:vn.distance_frag},shadow:{uniforms:rr([At.lights,At.fog,{color:{value:new mn(0)},opacity:{value:1}}]),vertexShader:vn.shadow_vert,fragmentShader:vn.shadow_frag}};Ea.physical={uniforms:rr([Ea.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new un},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new un},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new un},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new un},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new un},sheen:{value:0},sheenColor:{value:new mn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new un},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new un},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new un},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new un},attenuationDistance:{value:0},attenuationColor:{value:new mn(0)},specularColor:{value:new mn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new un},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new un},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new un}}]),vertexShader:vn.meshphysical_vert,fragmentShader:vn.meshphysical_frag};var yd={r:0,b:0,g:0},hM=new Yn,Y0=new un;Y0.set(-1,0,0,0,1,0,0,0,1);function fM(n,e,t,i,r,a){let s=new mn(0),o=r===!0?0:1,u,l,d=null,h=0,f=null;function m(D){let v=D.isScene===!0?D.background:null;if(v&&v.isTexture){let y=D.backgroundBlurriness>0;v=e.get(v,y)}return v}function x(D){let v=!1,y=m(D);y===null?g(s,o):y&&y.isColor&&(g(y,1),v=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function T(D,v){let y=m(v);y&&(y.isCubeTexture||y.mapping===Fl)?(l===void 0&&(l=new Kn(new Ur(1,1,1),new Or({name:"BackgroundCubeMaterial",uniforms:Ns(Ea.backgroundCube.uniforms),vertexShader:Ea.backgroundCube.vertexShader,fragmentShader:Ea.backgroundCube.fragmentShader,side:mr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,N,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hM.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Y0),l.material.toneMapped=An.getTransfer(y.colorSpace)!==Xn,(d!==y||h!==y.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,f=n.toneMapping),l.layers.enableAll(),D.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(u===void 0&&(u=new Kn(new Al(2,2),new Or({name:"BackgroundMaterial",uniforms:Ns(Ea.background.uniforms),vertexShader:Ea.background.vertexShader,fragmentShader:Ea.background.fragmentShader,side:us,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=y,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.toneMapped=An.getTransfer(y.colorSpace)!==Xn,y.matrixAutoUpdate===!0&&y.updateMatrix(),u.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=y,h=y.version,f=n.toneMapping),u.layers.enableAll(),D.unshift(u,u.geometry,u.material,0,0,null))}function g(D,v){D.getRGB(yd,yf(n)),t.buffers.color.setClear(yd.r,yd.g,yd.b,v,a)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return s},setClearColor:function(D,v=1){s.set(D),o=v,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(D){o=D,g(s,o)},render:x,addToRenderList:T,dispose:p}}function pM(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),a=r,s=!1;function o(F,q,b,M,k){let V=!1,Q=h(F,M,b,q);a!==Q&&(a=Q,l(a.object)),V=m(F,M,b,k),V&&x(F,M,b,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(V||s)&&(s=!1,y(F,q,b,M),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function u(){return n.createVertexArray()}function l(F){return n.bindVertexArray(F)}function d(F){return n.deleteVertexArray(F)}function h(F,q,b,M){let k=M.wireframe===!0,V=i[q.id];V===void 0&&(V={},i[q.id]=V);let Q=F.isInstancedMesh===!0?F.id:0,j=V[Q];j===void 0&&(j={},V[Q]=j);let W=j[b.id];W===void 0&&(W={},j[b.id]=W);let Z=W[k];return Z===void 0&&(Z=f(u()),W[k]=Z),Z}function f(F){let q=[],b=[],M=[];for(let k=0;k<t;k++)q[k]=0,b[k]=0,M[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:b,attributeDivisors:M,object:F,attributes:{},index:null}}function m(F,q,b,M){let k=a.attributes,V=q.attributes,Q=0,j=b.getAttributes();for(let W in j)if(j[W].location>=0){let re=k[W],ye=V[W];if(ye===void 0&&(W==="instanceMatrix"&&F.instanceMatrix&&(ye=F.instanceMatrix),W==="instanceColor"&&F.instanceColor&&(ye=F.instanceColor)),re===void 0||re.attribute!==ye||ye&&re.data!==ye.data)return!0;Q++}return a.attributesNum!==Q||a.index!==M}function x(F,q,b,M){let k={},V=q.attributes,Q=0,j=b.getAttributes();for(let W in j)if(j[W].location>=0){let re=V[W];re===void 0&&(W==="instanceMatrix"&&F.instanceMatrix&&(re=F.instanceMatrix),W==="instanceColor"&&F.instanceColor&&(re=F.instanceColor));let ye={};ye.attribute=re,re&&re.data&&(ye.data=re.data),k[W]=ye,Q++}a.attributes=k,a.attributesNum=Q,a.index=M}function T(){let F=a.newAttributes;for(let q=0,b=F.length;q<b;q++)F[q]=0}function g(F){p(F,0)}function p(F,q){let b=a.newAttributes,M=a.enabledAttributes,k=a.attributeDivisors;b[F]=1,M[F]===0&&(n.enableVertexAttribArray(F),M[F]=1),k[F]!==q&&(n.vertexAttribDivisor(F,q),k[F]=q)}function D(){let F=a.newAttributes,q=a.enabledAttributes;for(let b=0,M=q.length;b<M;b++)q[b]!==F[b]&&(n.disableVertexAttribArray(b),q[b]=0)}function v(F,q,b,M,k,V,Q){Q===!0?n.vertexAttribIPointer(F,q,b,k,V):n.vertexAttribPointer(F,q,b,M,k,V)}function y(F,q,b,M){T();let k=M.attributes,V=b.getAttributes(),Q=q.defaultAttributeValues;for(let j in V){let W=V[j];if(W.location>=0){let Z=k[j];if(Z===void 0&&(j==="instanceMatrix"&&F.instanceMatrix&&(Z=F.instanceMatrix),j==="instanceColor"&&F.instanceColor&&(Z=F.instanceColor)),Z!==void 0){let re=Z.normalized,ye=Z.itemSize,Se=e.get(Z);if(Se===void 0)continue;let ue=Se.buffer,fe=Se.type,Fe=Se.bytesPerElement,ne=fe===n.INT||fe===n.UNSIGNED_INT||Z.gpuType===Lu;if(Z.isInterleavedBufferAttribute){let oe=Z.data,Ue=oe.stride,Be=Z.offset;if(oe.isInstancedInterleavedBuffer){for(let ze=0;ze<W.locationSize;ze++)p(W.location+ze,oe.meshPerAttribute);F.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ze=0;ze<W.locationSize;ze++)g(W.location+ze);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let ze=0;ze<W.locationSize;ze++)v(W.location+ze,ye/W.locationSize,fe,re,Ue*Fe,(Be+ye/W.locationSize*ze)*Fe,ne)}else{if(Z.isInstancedBufferAttribute){for(let oe=0;oe<W.locationSize;oe++)p(W.location+oe,Z.meshPerAttribute);F.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let oe=0;oe<W.locationSize;oe++)g(W.location+oe);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let oe=0;oe<W.locationSize;oe++)v(W.location+oe,ye/W.locationSize,fe,re,ye*Fe,ye/W.locationSize*oe*Fe,ne)}}else if(Q!==void 0){let re=Q[j];if(re!==void 0)switch(re.length){case 2:n.vertexAttrib2fv(W.location,re);break;case 3:n.vertexAttrib3fv(W.location,re);break;case 4:n.vertexAttrib4fv(W.location,re);break;default:n.vertexAttrib1fv(W.location,re)}}}}D()}function C(){E();for(let F in i){let q=i[F];for(let b in q){let M=q[b];for(let k in M){let V=M[k];for(let Q in V)d(V[Q].object),delete V[Q];delete M[k]}}delete i[F]}}function N(F){if(i[F.id]===void 0)return;let q=i[F.id];for(let b in q){let M=q[b];for(let k in M){let V=M[k];for(let Q in V)d(V[Q].object),delete V[Q];delete M[k]}}delete i[F.id]}function O(F){for(let q in i){let b=i[q];for(let M in b){let k=b[M];if(k[F.id]===void 0)continue;let V=k[F.id];for(let Q in V)d(V[Q].object),delete V[Q];delete k[F.id]}}}function S(F){for(let q in i){let b=i[q],M=F.isInstancedMesh===!0?F.id:0,k=b[M];if(k!==void 0){for(let V in k){let Q=k[V];for(let j in Q)d(Q[j].object),delete Q[j];delete k[V]}delete b[M],Object.keys(b).length===0&&delete i[q]}}}function E(){B(),s=!0,a!==r&&(a=r,l(a.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:B,dispose:C,releaseStatesOfGeometry:N,releaseStatesOfObject:S,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:g,disableUnusedAttributes:D}}function mM(n,e,t){let i;function r(u){i=u}function a(u,l){n.drawArrays(i,u,l),t.update(l,i,1)}function s(u,l,d){d!==0&&(n.drawArraysInstanced(i,u,l,d),t.update(l,i,d))}function o(u,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,l,0,d);let f=0;for(let m=0;m<d;m++)f+=l[m];t.update(f,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function vM(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let O=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(O){return!(O!==Wr&&i.convert(O)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(O){let S=O===ia&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==Tr&&O!==Hr&&!S&&i.convert(O)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function u(O){if(O==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=u(l);d!==l&&(an("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&an("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),D=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),N=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:T,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:D,maxVaryings:v,maxFragmentUniforms:y,maxSamples:C,samples:N}}function gM(n){let e=this,t=null,i=0,r=!1,a=!1,s=new Dr,o=new un,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,m){let x=h.clippingPlanes,T=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||x===null||x.length===0||a&&!g)a?d(null):l();else{let D=a?0:i,v=D*4,y=p.clippingState||null;u.value=y,y=d(x,f,v,m);for(let C=0;C!==v;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=D}};function l(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,m,x){let T=h!==null?h.length:0,g=null;if(T!==0){if(g=u.value,x!==!0||g===null){let p=m+T*4,D=f.matrixWorldInverse;o.getNormalMatrix(D),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,y=m;v!==T;++v,y+=4)s.copy(h[v]).applyMatrix4(D,o),s.normal.toArray(g,y),g[y+3]=s.constant}u.value=g,u.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,g}}var Io=4,yM=6,xM=20,_M=256,Wl=new Mo,w0=new mn,Af=null,If=0,Cf=0,Rf=!1,MM=new ge,Us=new ge,_d=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:s=256,position:o=MM}=a;Af=this._renderer.getRenderTarget(),If=this._renderer.getActiveCubeFace(),Cf=this._renderer.getActiveMipmapLevel(),Rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,r,u,o),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=A0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=E0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Af,If,Cf),this._renderer.xr.enabled=Rf,e.scissorTest=!1,Ao(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Af=this._renderer.getRenderTarget(),If=this._renderer.getActiveCubeFace(),Cf=this._renderer.getActiveMipmapLevel(),Rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Wi,minFilter:Wi,generateMipmaps:!1,type:ia,format:Wr,colorSpace:ll,depthBuffer:!1},r=T0(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=T0(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=SM(a)),this._blurMaterial=wM(a,e,t),this._ggxMaterial=bM(a,e,t)}return r}_compileMaterial(e){let t=new Kn(new Xi,e);this._renderer.compile(t,Wl)}_sceneToCubeUV(e,t,i,r,a){let u=new tr(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,m=h.toneMapping;h.getClearColor(w0),h.toneMapping=ta,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kn(new Ur,new Sa({name:"PMREM.Background",side:mr,depthWrite:!1,depthTest:!1})));let T=this._backgroundBox,g=T.material,p=!1,D=e.background;D?D.isColor&&(g.color.copy(D),e.background=null,p=!0):(g.color.copy(w0),p=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(u.up.set(0,l[v],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x+d[v],a.y,a.z)):y===1?(u.up.set(0,0,l[v]),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y+d[v],a.z)):(u.up.set(0,l[v],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y,a.z+d[v]));let C=this._cubeSize;Ao(r,y*C,v>2?C:0,C,C),h.setRenderTarget(r),p&&h.render(T,u),h.render(e,u)}h.toneMapping=m,h.autoClear=f,e.background=D}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ds||e.mapping===Ds;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=A0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=E0());let a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;let o=a.uniforms;o.envMap.value=e;let u=this._cubeSize;Ao(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(s,Wl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;let u=s.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),f=l*1.25,m=h*f,{_lodMax:x}=this,T=this._sizeLods[i],g=3*T*(i>x-Io?i-x+Io:0),p=4*(this._cubeSize-T);u.envMap.value=e.texture,u.roughness.value=m,u.mipInt.value=x-t,Ao(a,g,p,3*T,2*T),r.setRenderTarget(a),r.render(o,Wl),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=x-i,Ao(e,g,p,3*T,2*T),r.setRenderTarget(e),r.render(o,Wl)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){let s=this._renderer,o=this._blurMaterial,u=this._lodMeshes[r];u.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let d=this._sizeLods[r],h=3*d*(r>this._lodMax-Io?r-this._lodMax+Io:0),f=4*(this._cubeSize-d);Ao(t,h,f,3*d,2*d),s.setRenderTarget(t),s.render(u,Wl)}};function SM(n){let e=[],t=[],i=n,r=n-Io+1+yM;for(let a=0;a<r;a++){let s=Math.pow(2,i);e.push(s);let o=1/(s-2),u=-o,l=1+o,d=[u,u,l,u,l,l,u,u,l,l,u,l],h=6,f=6,m=3,x=new Float32Array(m*f*h),T=new Float32Array(m*f*h);for(let p=0;p<h;p++){let D=p%3*2/3-1,v=p>2?0:-1,y=[D,v,0,D+2/3,v,0,D+2/3,v+1,0,D,v,0,D+2/3,v+1,0,D,v+1,0];x.set(y,m*f*p);for(let C=0;C<f;C++){let N=d[C*2]*2-1,O=d[C*2+1]*2-1;p===0?Us.set(1,O,N):p===1?Us.set(-N,1,-O):p===2?Us.set(-N,O,1):p===3?Us.set(-1,O,-N):p===4?Us.set(-N,-1,O):Us.set(N,O,-1),Us.toArray(T,(p*f+C)*m)}}let g=new Xi;g.setAttribute("position",new Nr(x,m)),g.setAttribute("outputDirection",new Nr(T,m)),t.push(new Kn(g,null)),i>Io&&i--}return{lodMeshes:t,sizeLods:e}}function T0(n,e,t){let i=new br(n,e,t);return i.texture.mapping=Fl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ao(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function bM(n,e,t){return new Or({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_M,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bd(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function wM(n,e,t){return new Or({name:"SphericalGaussianBlur",defines:{SAMPLES:xM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:bd(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function E0(){return new Or({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bd(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function A0(){return new Or({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wa,depthTest:!1,depthWrite:!1})}function bd(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Md=class extends br{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new yl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ur(5,5,5),a=new Or({name:"CubemapFromEquirect",uniforms:Ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mr,blending:wa});a.uniforms.tEquirect.value=t;let s=new Kn(r,a),o=t.minFilter;return t.minFilter===hs&&(t.minFilter=Wi),new wu(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}};function TM(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,m=!1){return f==null?null:m?s(f):a(f)}function a(f){if(f&&f.isTexture){let m=f.mapping;if(m===Cu||m===Ru)if(e.has(f)){let x=e.get(f).texture;return o(x,f.mapping)}else{let x=f.image;if(x&&x.height>0){let T=new Md(x.height);return T.fromEquirectangularTexture(n,f),e.set(f,T),f.addEventListener("dispose",l),o(T.texture,f.mapping)}else return null}}return f}function s(f){if(f&&f.isTexture){let m=f.mapping,x=m===Cu||m===Ru,T=m===ds||m===Ds;if(x||T){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new _d(n)),g=x?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let D=f.image;return x&&D&&D.height>0||T&&D&&u(D)?(i===null&&(i=new _d(n)),g=x?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",d),g.texture):null}}}return f}function o(f,m){return m===Cu?f.mapping=ds:m===Ru&&(f.mapping=Ds),f}function u(f){let m=0,x=6;for(let T=0;T<x;T++)f[T]!==void 0&&m++;return m===x}function l(f){let m=f.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function d(f){let m=f.target;m.removeEventListener("dispose",d);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function EM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Is("WebGLRenderer: "+i+" extension not supported."),r}}}function AM(n,e,t,i){let r={},a=new WeakMap;function s(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",s),delete r[f.id];let m=a.get(f);m&&(e.remove(m),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function u(h){let f=h.attributes;for(let m in f)e.update(f[m],n.ARRAY_BUFFER)}function l(h){let f=[],m=h.index,x=h.attributes.position,T=0;if(x===void 0)return;if(m!==null){let D=m.array;T=m.version;for(let v=0,y=D.length;v<y;v+=3){let C=D[v+0],N=D[v+1],O=D[v+2];f.push(C,N,N,O,O,C)}}else{let D=x.array;T=x.version;for(let v=0,y=D.length/3-1;v<y;v+=3){let C=v+0,N=v+1,O=v+2;f.push(C,N,N,O,O,C)}}let g=new(x.count>=65535?pl:fl)(f,1);g.version=T;let p=a.get(h);p&&e.remove(p),a.set(h,g)}function d(h){let f=a.get(h);if(f){let m=h.index;m!==null&&f.version<m.version&&l(h)}else l(h);return a.get(h)}return{get:o,update:u,getWireframeAttribute:d}}function IM(n,e,t){let i;function r(h){i=h}let a,s;function o(h){a=h.type,s=h.bytesPerElement}function u(h,f){n.drawElements(i,f,a,h*s),t.update(f,i,1)}function l(h,f,m){m!==0&&(n.drawElementsInstanced(i,f,a,h*s,m),t.update(f,i,m))}function d(h,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,h,0,m);let T=0;for(let g=0;g<m;g++)T+=f[g];t.update(T,i,1)}this.setMode=r,this.setIndex=o,this.render=u,this.renderInstances=l,this.renderMultiDraw=d}function CM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:sn("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function RM(n,e,t){let i=new WeakMap,r=new hi;function a(s,o,u){let l=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,f=i.get(o);if(f===void 0||f.count!==h){let E=function(){O.dispose(),i.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],D=o.morphAttributes.color||[],v=0;m===!0&&(v=1),x===!0&&(v=2),T===!0&&(v=3);let y=o.attributes.position.count*v,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let N=new Float32Array(y*C*4*h),O=new dl(N,y,C,h);O.type=Hr,O.needsUpdate=!0;let S=v*4;for(let B=0;B<h;B++){let F=g[B],q=p[B],b=D[B],M=y*C*4*B;for(let k=0;k<F.count;k++){let V=k*S;m===!0&&(r.fromBufferAttribute(F,k),N[M+V+0]=r.x,N[M+V+1]=r.y,N[M+V+2]=r.z,N[M+V+3]=0),x===!0&&(r.fromBufferAttribute(q,k),N[M+V+4]=r.x,N[M+V+5]=r.y,N[M+V+6]=r.z,N[M+V+7]=0),T===!0&&(r.fromBufferAttribute(b,k),N[M+V+8]=r.x,N[M+V+9]=r.y,N[M+V+10]=r.z,N[M+V+11]=b.itemSize===4?r.w:1)}}f={count:h,texture:O,size:new Dt(y,C)},i.set(o,f),o.addEventListener("dispose",E)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let m=0;for(let T=0;T<l.length;T++)m+=l[T];let x=o.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",x),u.getUniforms().setValue(n,"morphTargetInfluences",l)}u.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:a}}function PM(n,e,t,i,r){let a=new WeakMap;function s(l){let d=r.render.frame,h=l.geometry,f=e.get(l,h);if(a.get(f)!==d&&(e.update(f),a.set(f,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",u)===!1&&l.addEventListener("dispose",u),a.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,d))),l.isSkinnedMesh){let m=l.skeleton;a.get(m)!==d&&(m.update(),a.set(m,d))}return f}function o(){a=new WeakMap}function u(l){let d=l.target;d.removeEventListener("dispose",u),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:s,dispose:o}}var LM={[ef]:"LINEAR_TONE_MAPPING",[tf]:"REINHARD_TONE_MAPPING",[nf]:"CINEON_TONE_MAPPING",[rf]:"ACES_FILMIC_TONE_MAPPING",[sf]:"AGX_TONE_MAPPING",[of]:"NEUTRAL_TONE_MAPPING",[af]:"CUSTOM_TONE_MAPPING"};function DM(n,e,t,i,r,a){let s=new br(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,u=null,l=new Xi;l.setAttribute("position",new zn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new zn([0,2,0,0,2,0],2));let d=new uu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Kn(l,d),f=new Mo(-1,1,1,-1,0,1),m=null,x=null,T=!1,g,p=null,D=[],v=!1;this.setSize=function(y,C){s.setSize(y,C),o!==null&&o.setSize(y,C),u!==null&&u.setSize(y,C);for(let N=0;N<D.length;N++){let O=D[N];O.setSize&&O.setSize(y,C)}},this.setEffects=function(y){D=y,v=D.length>0&&D[0].isRenderPass===!0;let C=s.width,N=s.height;D.length>0&&o===null&&(o=new br(C,N,{type:ia,depthBuffer:!1,stencilBuffer:!1}),u=new br(C,N,{type:ia,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<D.length;O++){let S=D[O];S.setSize&&S.setSize(C,N)}},this.begin=function(y,C){if(T||y.toneMapping===ta&&D.length===0)return!1;if(p=C,C!==null){let N=C.width,O=C.height;(s.width!==N||s.height!==O)&&this.setSize(N,O)}return v===!1&&y.setRenderTarget(s),g=y.toneMapping,y.toneMapping=ta,!0},this.hasRenderPass=function(){return v},this.end=function(y,C){y.toneMapping=g,T=!0;let N=s,O=o;for(let S=0;S<D.length;S++){let E=D[S];E.enabled!==!1&&(E.render(y,O,N,C),E.needsSwap!==!1&&(N=O,O=O===o?u:o))}if(m!==y.outputColorSpace||x!==y.toneMapping){m=y.outputColorSpace,x=y.toneMapping,d.defines={},An.getTransfer(m)===Xn&&(d.defines.SRGB_TRANSFER="");let S=LM[x];S&&(d.defines[S]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=N.texture,y.setRenderTarget(p),y.render(h,f),p=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),u!==null&&u.dispose(),l.dispose(),d.dispose()}}var q0=new nr,Df=new as(1,1),Z0=new dl,J0=new nu,$0=new yl,I0=[],C0=[],R0=new Float32Array(16),P0=new Float32Array(9),L0=new Float32Array(4);function Ro(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,a=I0[r];if(a===void 0&&(a=new Float32Array(r),I0[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Pi(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Li(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wd(n,e){let t=C0[e];t===void 0&&(t=new Int32Array(e),C0[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function NM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function UM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pi(t,e))return;n.uniform2fv(this.addr,e),Li(t,e)}}function FM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pi(t,e))return;n.uniform3fv(this.addr,e),Li(t,e)}}function OM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pi(t,e))return;n.uniform4fv(this.addr,e),Li(t,e)}}function BM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pi(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Li(t,e)}else{if(Pi(t,i))return;L0.set(i),n.uniformMatrix2fv(this.addr,!1,L0),Li(t,i)}}function kM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pi(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Li(t,e)}else{if(Pi(t,i))return;P0.set(i),n.uniformMatrix3fv(this.addr,!1,P0),Li(t,i)}}function zM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pi(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Li(t,e)}else{if(Pi(t,i))return;R0.set(i),n.uniformMatrix4fv(this.addr,!1,R0),Li(t,i)}}function VM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function GM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pi(t,e))return;n.uniform2iv(this.addr,e),Li(t,e)}}function HM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pi(t,e))return;n.uniform3iv(this.addr,e),Li(t,e)}}function WM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pi(t,e))return;n.uniform4iv(this.addr,e),Li(t,e)}}function XM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function YM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pi(t,e))return;n.uniform2uiv(this.addr,e),Li(t,e)}}function qM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pi(t,e))return;n.uniform3uiv(this.addr,e),Li(t,e)}}function ZM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pi(t,e))return;n.uniform4uiv(this.addr,e),Li(t,e)}}function JM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Df.compareFunction=t.isReversedDepthBuffer()?gd:vd,a=Df):a=q0,t.setTexture2D(e||a,r)}function $M(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||J0,r)}function KM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$0,r)}function QM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Z0,r)}function jM(n){switch(n){case 5126:return NM;case 35664:return UM;case 35665:return FM;case 35666:return OM;case 35674:return BM;case 35675:return kM;case 35676:return zM;case 5124:case 35670:return VM;case 35667:case 35671:return GM;case 35668:case 35672:return HM;case 35669:case 35673:return WM;case 5125:return XM;case 36294:return YM;case 36295:return qM;case 36296:return ZM;case 35678:case 36198:case 36298:case 36306:case 35682:return JM;case 35679:case 36299:case 36307:return $M;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return QM}}function eS(n,e){n.uniform1fv(this.addr,e)}function tS(n,e){let t=Ro(e,this.size,2);n.uniform2fv(this.addr,t)}function nS(n,e){let t=Ro(e,this.size,3);n.uniform3fv(this.addr,t)}function iS(n,e){let t=Ro(e,this.size,4);n.uniform4fv(this.addr,t)}function rS(n,e){let t=Ro(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function aS(n,e){let t=Ro(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function sS(n,e){let t=Ro(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function oS(n,e){n.uniform1iv(this.addr,e)}function lS(n,e){n.uniform2iv(this.addr,e)}function cS(n,e){n.uniform3iv(this.addr,e)}function uS(n,e){n.uniform4iv(this.addr,e)}function dS(n,e){n.uniform1uiv(this.addr,e)}function hS(n,e){n.uniform2uiv(this.addr,e)}function fS(n,e){n.uniform3uiv(this.addr,e)}function pS(n,e){n.uniform4uiv(this.addr,e)}function mS(n,e,t){let i=this.cache,r=e.length,a=wd(t,r);Pi(i,a)||(n.uniform1iv(this.addr,a),Li(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=Df:s=q0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function vS(n,e,t){let i=this.cache,r=e.length,a=wd(t,r);Pi(i,a)||(n.uniform1iv(this.addr,a),Li(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||J0,a[s])}function gS(n,e,t){let i=this.cache,r=e.length,a=wd(t,r);Pi(i,a)||(n.uniform1iv(this.addr,a),Li(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||$0,a[s])}function yS(n,e,t){let i=this.cache,r=e.length,a=wd(t,r);Pi(i,a)||(n.uniform1iv(this.addr,a),Li(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Z0,a[s])}function xS(n){switch(n){case 5126:return eS;case 35664:return tS;case 35665:return nS;case 35666:return iS;case 35674:return rS;case 35675:return aS;case 35676:return sS;case 5124:case 35670:return oS;case 35667:case 35671:return lS;case 35668:case 35672:return cS;case 35669:case 35673:return uS;case 5125:return dS;case 36294:return hS;case 36295:return fS;case 36296:return pS;case 35678:case 36198:case 36298:case 36306:case 35682:return mS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return gS;case 36289:case 36303:case 36311:case 36292:return yS}}var Nf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jM(t.type)}},Uf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xS(t.type)}},Ff=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let o=r[a];o.setValue(e,t[o.id],i)}}},Pf=/(\w+)(\])?(\[|\.)?/g;function D0(n,e){n.seq.push(e),n.map[e.id]=e}function _S(n,e,t){let i=n.name,r=i.length;for(Pf.lastIndex=0;;){let a=Pf.exec(i),s=Pf.lastIndex,o=a[1],u=a[2]==="]",l=a[3];if(u&&(o=o|0),l===void 0||l==="["&&s+2===r){D0(t,l===void 0?new Nf(o,n,e):new Uf(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Ff(o),D0(t,h)),t=h}}}var Co=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let o=e.getActiveUniform(t,s),u=e.getUniformLocation(t,o.name);_S(o,u,this)}let r=[],a=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){let o=t[a],u=i[o.id];u.needsUpdate!==!1&&o.setValue(e,u.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function N0(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var MS=37297,SS=0;function bS(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){let o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}var U0=new un;function wS(n){An._getMatrix(U0,An.workingColorSpace,n);let e=`mat3( ${U0.elements.map(t=>t.toFixed(4))} )`;switch(An.getTransfer(n)){case cl:return[e,"LinearTransferOETF"];case Xn:return[e,"sRGBTransferOETF"];default:return an("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function F0(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+bS(n.getShaderSource(e),o)}else return a}function TS(n,e){let t=wS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var ES={[ef]:"Linear",[tf]:"Reinhard",[nf]:"Cineon",[rf]:"ACESFilmic",[sf]:"AgX",[of]:"Neutral",[af]:"Custom"};function AS(n,e){let t=ES[e];return t===void 0?(an("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var xd=new ge;function IS(){An.getLuminanceCoefficients(xd);let n=xd.x.toFixed(4),e=xd.y.toFixed(4),t=xd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yl).join(`
`)}function RS(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function PS(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let a=n.getActiveAttrib(e,r),s=a.name,o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Yl(n){return n!==""}function O0(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function B0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var LS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Of(n){return n.replace(LS,NS)}var DS=new Map;function NS(n,e){let t=vn[e];if(t===void 0){let i=DS.get(e);if(i!==void 0)t=vn[i],an('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Of(t)}var US=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function k0(n){return n.replace(US,FS)}function FS(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function z0(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var OS={[Ul]:"SHADOWMAP_TYPE_PCF",[So]:"SHADOWMAP_TYPE_VSM"};function BS(n){return OS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var kS={[ds]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE",[Fl]:"ENVMAP_TYPE_CUBE_UV"};function zS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":kS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var VS={[Ds]:"ENVMAP_MODE_REFRACTION"};function GS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":VS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var HS={[Iu]:"ENVMAP_BLENDING_MULTIPLY",[jm]:"ENVMAP_BLENDING_MIX",[e0]:"ENVMAP_BLENDING_ADD"};function WS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":HS[n.combine]||"ENVMAP_BLENDING_NONE"}function XS(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function YS(n,e,t,i){let r=n.getContext(),a=t.defines,s=t.vertexShader,o=t.fragmentShader,u=BS(t),l=zS(t),d=GS(t),h=WS(t),f=XS(t),m=CS(t),x=RS(a),T=r.createProgram(),g,p,D=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Yl).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Yl).join(`
`),p.length>0&&(p+=`
`)):(g=[z0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yl).join(`
`),p=[z0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ta?"#define TONE_MAPPING":"",t.toneMapping!==ta?vn.tonemapping_pars_fragment:"",t.toneMapping!==ta?AS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",vn.colorspace_pars_fragment,TS("linearToOutputTexel",t.outputColorSpace),IS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yl).join(`
`)),s=Of(s),s=O0(s,t),s=B0(s,t),o=Of(o),o=O0(o,t),o=B0(o,t),s=k0(s),o=k0(o),t.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=D+g+s,y=D+p+o,C=N0(r,r.VERTEX_SHADER,v),N=N0(r,r.FRAGMENT_SHADER,y);r.attachShader(T,C),r.attachShader(T,N),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function O(F){if(n.debug.checkShaderErrors){let q=r.getProgramInfoLog(T)||"",b=r.getShaderInfoLog(C)||"",M=r.getShaderInfoLog(N)||"",k=q.trim(),V=b.trim(),Q=M.trim(),j=!0,W=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,T,C,N);else{let Z=F0(r,C,"vertex"),re=F0(r,N,"fragment");sn("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+k+`
`+Z+`
`+re)}else k!==""?an("WebGLProgram: Program Info Log:",k):(V===""||Q==="")&&(W=!1);W&&(F.diagnostics={runnable:j,programLog:k,vertexShader:{log:V,prefix:g},fragmentShader:{log:Q,prefix:p}})}r.deleteShader(C),r.deleteShader(N),S=new Co(r,T),E=PS(r,T)}let S;this.getUniforms=function(){return S===void 0&&O(this),S};let E;this.getAttributes=function(){return E===void 0&&O(this),E};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(T,MS)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SS++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=C,this.fragmentShader=N,this}var qS=0,Bf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new kf(e),t.set(e,i)),i}},kf=class{constructor(e){this.id=qS++,this.code=e,this.usedTimes=0}};function ZS(n){return n===ps||n===Gl||n===Hl}function JS(n,e,t,i,r,a){let s=new fo,o=new Bf,u=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return u.add(S),S===0?"uv":`uv${S}`}function T(S,E,B,F,q,b){let M=F.fog,k=q.geometry,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,Q=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,j=e.get(S.envMap||V,Q),W=j&&j.mapping===Fl?j.image.height:null,Z=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&an("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let re=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ye=re!==void 0?re.length:0,Se=0;k.morphAttributes.position!==void 0&&(Se=1),k.morphAttributes.normal!==void 0&&(Se=2),k.morphAttributes.color!==void 0&&(Se=3);let ue,fe,Fe,ne;if(Z){let Kt=Ea[Z];ue=Kt.vertexShader,fe=Kt.fragmentShader}else{ue=S.vertexShader,fe=S.fragmentShader;let Kt=o.getVertexShaderStage(S),Qt=o.getFragmentShaderStage(S);o.update(S,Kt,Qt),Fe=Kt.id,ne=Qt.id}let oe=n.getRenderTarget(),Ue=n.state.buffers.depth.getReversed(),Be=q.isInstancedMesh===!0,ze=q.isBatchedMesh===!0,ht=!!S.map,Gt=!!S.matcap,ut=!!j,wt=!!S.aoMap,Zt=!!S.lightMap,je=!!S.bumpMap&&S.wireframe===!1,xt=!!S.normalMap,_t=!!S.displacementMap,cn=!!S.emissiveMap,Pt=!!S.metalnessMap,$t=!!S.roughnessMap,ae=S.anisotropy>0,hn=S.clearcoat>0,qt=S.dispersion>0,X=S.retroreflectivity>0,w=S.iridescence>0,le=S.sheen>0,ve=S.transmission>0,Me=ae&&!!S.anisotropyMap,He=hn&&!!S.clearcoatMap,$e=hn&&!!S.clearcoatNormalMap,Ae=hn&&!!S.clearcoatRoughnessMap,Te=w&&!!S.iridescenceMap,Pe=w&&!!S.iridescenceThicknessMap,Ke=le&&!!S.sheenColorMap,Oe=le&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,De=!!S.specularColorMap,lt=!!S.specularIntensityMap,et=ve&&!!S.transmissionMap,ie=ve&&!!S.thicknessMap,Ze=!!S.gradientMap,Re=!!S.alphaMap,tt=S.alphaTest>0,ot=!!S.alphaHash,ke=!!S.extensions,Rt=ta;S.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Rt=n.toneMapping);let ft={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:ue,fragmentShader:fe,defines:S.defines,customVertexShaderID:Fe,customFragmentShaderID:ne,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ze,batchingColor:ze&&q._colorsTexture!==null,instancing:Be,instancingColor:Be&&q.instanceColor!==null,instancingMorph:Be&&q.morphTexture!==null,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:An.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ht,matcap:Gt,envMap:ut,envMapMode:ut&&j.mapping,envMapCubeUVHeight:W,aoMap:wt,lightMap:Zt,bumpMap:je,normalMap:xt,displacementMap:_t,emissiveMap:cn,normalMapObjectSpace:xt&&S.normalMapType===i0,normalMapTangentSpace:xt&&S.normalMapType===md,packedNormalMap:xt&&S.normalMapType===md&&ZS(S.normalMap.format),metalnessMap:Pt,roughnessMap:$t,anisotropy:ae,anisotropyMap:Me,clearcoat:hn,clearcoatMap:He,clearcoatNormalMap:$e,clearcoatRoughnessMap:Ae,dispersion:qt,retroreflection:X,iridescence:w,iridescenceMap:Te,iridescenceThicknessMap:Pe,sheen:le,sheenColorMap:Ke,sheenRoughnessMap:Oe,specularMap:Ge,specularColorMap:De,specularIntensityMap:lt,transmission:ve,transmissionMap:et,thicknessMap:ie,gradientMap:Ze,opaque:S.transparent===!1&&S.blending===bo&&S.alphaToCoverage===!1,alphaMap:Re,alphaTest:tt,alphaHash:ot,combine:S.combine,mapUv:ht&&x(S.map.channel),aoMapUv:wt&&x(S.aoMap.channel),lightMapUv:Zt&&x(S.lightMap.channel),bumpMapUv:je&&x(S.bumpMap.channel),normalMapUv:xt&&x(S.normalMap.channel),displacementMapUv:_t&&x(S.displacementMap.channel),emissiveMapUv:cn&&x(S.emissiveMap.channel),metalnessMapUv:Pt&&x(S.metalnessMap.channel),roughnessMapUv:$t&&x(S.roughnessMap.channel),anisotropyMapUv:Me&&x(S.anisotropyMap.channel),clearcoatMapUv:He&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:$e&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&x(S.sheenRoughnessMap.channel),specularMapUv:Ge&&x(S.specularMap.channel),specularColorMapUv:De&&x(S.specularColorMap.channel),specularIntensityMapUv:lt&&x(S.specularIntensityMap.channel),transmissionMapUv:et&&x(S.transmissionMap.channel),thicknessMapUv:ie&&x(S.thicknessMap.channel),alphaMapUv:Re&&x(S.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(xt||ae),vertexNormals:!!k.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!k.attributes.uv&&(ht||Re),fog:!!M,useFog:S.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||k.attributes.normal===void 0&&xt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ue,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Se,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:b.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Rt,decodeVideoTexture:ht&&S.map.isVideoTexture===!0&&An.getTransfer(S.map.colorSpace)===Xn,decodeVideoTextureEmissive:cn&&S.emissiveMap.isVideoTexture===!0&&An.getTransfer(S.emissiveMap.colorSpace)===Xn,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===wr,flipSided:S.side===mr,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ke&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&S.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ft.vertexUv1s=u.has(1),ft.vertexUv2s=u.has(2),ft.vertexUv3s=u.has(3),u.clear(),ft}function g(S){let E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(let B in S.defines)E.push(B),E.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(p(E,S),D(E,S),E.push(n.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function p(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numSunLights),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numSunLightShadows),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function D(S,E){s.disableAll(),E.instancing&&s.enable(0),E.instancingColor&&s.enable(1),E.instancingMorph&&s.enable(2),E.matcap&&s.enable(3),E.envMap&&s.enable(4),E.normalMapObjectSpace&&s.enable(5),E.normalMapTangentSpace&&s.enable(6),E.clearcoat&&s.enable(7),E.iridescence&&s.enable(8),E.alphaTest&&s.enable(9),E.vertexColors&&s.enable(10),E.vertexAlphas&&s.enable(11),E.vertexUv1s&&s.enable(12),E.vertexUv2s&&s.enable(13),E.vertexUv3s&&s.enable(14),E.vertexTangents&&s.enable(15),E.anisotropy&&s.enable(16),E.alphaHash&&s.enable(17),E.batching&&s.enable(18),E.dispersion&&s.enable(19),E.retroreflection&&s.enable(24),E.batchingColor&&s.enable(20),E.gradientMap&&s.enable(21),E.packedNormalMap&&s.enable(22),E.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),E.fog&&s.enable(0),E.useFog&&s.enable(1),E.flatShading&&s.enable(2),E.logarithmicDepthBuffer&&s.enable(3),E.reversedDepthBuffer&&s.enable(4),E.skinning&&s.enable(5),E.morphTargets&&s.enable(6),E.morphNormals&&s.enable(7),E.morphColors&&s.enable(8),E.premultipliedAlpha&&s.enable(9),E.shadowMapEnabled&&s.enable(10),E.doubleSided&&s.enable(11),E.flipSided&&s.enable(12),E.useDepthPacking&&s.enable(13),E.dithering&&s.enable(14),E.transmission&&s.enable(15),E.sheen&&s.enable(16),E.opaque&&s.enable(17),E.pointsUvs&&s.enable(18),E.decodeVideoTexture&&s.enable(19),E.decodeVideoTextureEmissive&&s.enable(20),E.alphaToCoverage&&s.enable(21),E.numLightProbeGrids>0&&s.enable(22),E.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function v(S){let E=m[S.type],B;if(E){let F=Ea[E];B=M0.clone(F.uniforms)}else B=S.uniforms;return B}function y(S,E){let B=d.get(E);return B!==void 0?++B.usedTimes:(B=new YS(n,E,S,r),l.push(B),d.set(E,B)),B}function C(S){if(--S.usedTimes===0){let E=l.indexOf(S);l[E]=l[l.length-1],l.pop(),d.delete(S.cacheKey),S.destroy()}}function N(S){o.remove(S)}function O(){o.dispose()}return{getParameters:T,getProgramCacheKey:g,getUniforms:v,acquireProgram:y,releaseProgram:C,releaseShaderCache:N,programs:l,dispose:O}}function $S(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,u){n.get(s)[o]=u}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function KS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function V0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function G0(){let n=[],e=0,t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(f){let m=0;return f.isInstancedMesh&&(m+=2),f.isSkinnedMesh&&(m+=1),m}function o(f,m,x,T,g,p){let D=n[e];return D===void 0?(D={id:f.id,object:f,geometry:m,material:x,materialVariant:s(f),groupOrder:T,renderOrder:f.renderOrder,z:g,group:p},n[e]=D):(D.id=f.id,D.object=f,D.geometry=m,D.material=x,D.materialVariant=s(f),D.groupOrder=T,D.renderOrder=f.renderOrder,D.z=g,D.group=p),e++,D}function u(f,m,x,T,g,p,D){D.reversedDepth===!0&&(g=-g);let v=o(f,m,x,T,g,p);x.transmission>0?i.push(v):x.transparent===!0?r.push(v):t.push(v)}function l(f,m,x,T,g,p){let D=o(f,m,x,T,g,p);x.transmission>0?i.unshift(D):x.transparent===!0?r.unshift(D):t.unshift(D)}function d(f,m){t.length>1&&t.sort(f||KS),i.length>1&&i.sort(m||V0),r.length>1&&r.sort(m||V0)}function h(){for(let f=e,m=n.length;f<m;f++){let x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:u,unshift:l,finish:h,sort:d}}function QS(){let n=new WeakMap;function e(i,r){let a=n.get(i),s;return a===void 0?(s=new G0,n.set(i,[s])):r>=a.length?(s=new G0,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function jS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new ge,color:new mn};break;case"SpotLight":t={position:new ge,direction:new ge,color:new mn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ge,color:new mn,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ge,skyColor:new mn,groundColor:new mn};break;case"RectAreaLight":t={color:new mn,position:new ge,halfWidth:new ge,halfHeight:new ge};break}return n[e.id]=t,t}}}function eb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var tb=0;function nb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ib(n){let e=new jS,t=eb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new ge);let r=new ge,a=new Yn,s=new Yn;function o(l){let d=0,h=0,f=0;for(let q=0;q<9;q++)i.probe[q].set(0,0,0);let m=0,x=0,T=0,g=0,p=0,D=0,v=0,y=0,C=0,N=0,O=0,S=0,E=0,B=0;l.sort(nb);for(let q=0,b=l.length;q<b;q++){let M=l[q],k=M.color,V=M.intensity,Q=M.distance,j=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===ps?j=M.shadow.map.texture:j=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)d+=k.r*V,h+=k.g*V,f+=k.b*V;else if(M.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(M.sh.coefficients[W],V);B++}else if(M.isSunLight){let W=e.get(M);if(W.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let Z=M.shadow,re=t.get(M);re.shadowIntensity=Z.intensity,re.shadowBias=Z.bias,re.shadowNormalBias=Z.normalBias,re.shadowRadius=Z.radius,re.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),i.sunShadow[x]=re,i.sunShadowMap[x]=j;let ye=Z.getViewportCount();for(let Se=0;Se<ye;Se++)i.sunShadowMatrix[T+Se]=Z.getMatrix(Se),i.sunShadowCascade[T+Se]=Z._cascadeData[Se];T+=ye,x++}i.sun[m]=W,m++}else if(M.isDirectionalLight){let W=e.get(M);if(W.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let Z=M.shadow,re=t.get(M);re.shadowIntensity=Z.intensity,re.shadowBias=Z.bias,re.shadowNormalBias=Z.normalBias,re.shadowRadius=Z.radius,re.shadowMapSize=Z.mapSize,i.directionalShadow[g]=re,i.directionalShadowMap[g]=j,i.directionalShadowMatrix[g]=M.shadow.matrix,C++}i.directional[g]=W,g++}else if(M.isSpotLight){let W=e.get(M);W.position.setFromMatrixPosition(M.matrixWorld),W.color.copy(k).multiplyScalar(V),W.distance=Q,W.coneCos=Math.cos(M.angle),W.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),W.decay=M.decay,i.spot[D]=W;let Z=M.shadow;if(M.map&&(i.spotLightMap[S]=M.map,S++,Z.updateMatrices(M),M.castShadow&&E++),i.spotLightMatrix[D]=Z.matrix,M.castShadow){let re=t.get(M);re.shadowIntensity=Z.intensity,re.shadowBias=Z.bias,re.shadowNormalBias=Z.normalBias,re.shadowRadius=Z.radius,re.shadowMapSize=Z.mapSize,i.spotShadow[D]=re,i.spotShadowMap[D]=j,O++}D++}else if(M.isRectAreaLight){let W=e.get(M);W.color.copy(k).multiplyScalar(V),W.halfWidth.set(M.width*.5,0,0),W.halfHeight.set(0,M.height*.5,0),i.rectArea[v]=W,v++}else if(M.isPointLight){let W=e.get(M);if(W.color.copy(M.color).multiplyScalar(M.intensity),W.distance=M.distance,W.decay=M.decay,M.castShadow){let Z=M.shadow,re=t.get(M);re.shadowIntensity=Z.intensity,re.shadowBias=Z.bias,re.shadowNormalBias=Z.normalBias,re.shadowRadius=Z.radius,re.shadowMapSize=Z.mapSize,re.shadowCameraNear=Z.camera.near,re.shadowCameraFar=Z.camera.far,i.pointShadow[p]=re,i.pointShadowMap[p]=j,i.pointShadowMatrix[p]=M.shadow.matrix,N++}i.point[p]=W,p++}else if(M.isHemisphereLight){let W=e.get(M);W.skyColor.copy(M.color).multiplyScalar(V),W.groundColor.copy(M.groundColor).multiplyScalar(V),i.hemi[y]=W,y++}}v>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;let F=i.hash;(F.sunLength!==m||F.directionalLength!==g||F.pointLength!==p||F.spotLength!==D||F.rectAreaLength!==v||F.hemiLength!==y||F.numSunShadows!==x||F.numDirectionalShadows!==C||F.numPointShadows!==N||F.numSpotShadows!==O||F.numSpotMaps!==S||F.numLightProbes!==B)&&(i.sun.length=m,i.directional.length=g,i.spot.length=D,i.rectArea.length=v,i.point.length=p,i.hemi.length=y,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=T,i.sunShadowCascade.length=T,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.directionalShadowMatrix.length=C,i.pointShadow.length=N,i.pointShadowMap.length=N,i.pointShadowMatrix.length=N,i.spotShadow.length=O,i.spotShadowMap.length=O,i.spotLightMatrix.length=O+S-E,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=B,F.sunLength=m,F.directionalLength=g,F.pointLength=p,F.spotLength=D,F.rectAreaLength=v,F.hemiLength=y,F.numSunShadows=x,F.numDirectionalShadows=C,F.numPointShadows=N,F.numSpotShadows=O,F.numSpotMaps=S,F.numLightProbes=B,i.version=tb++)}function u(l,d){let h=0,f=0,m=0,x=0,T=0,g=0,p=d.matrixWorldInverse;for(let D=0,v=l.length;D<v;D++){let y=l[D];if(y.isSunLight){let C=i.sun[h];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(p),h++}else if(y.isDirectionalLight){let C=i.directional[f];C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),f++}else if(y.isSpotLight){let C=i.spot[x];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),x++}else if(y.isRectAreaLight){let C=i.rectArea[T];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(p),s.identity(),a.copy(y.matrixWorld),a.premultiply(p),s.extractRotation(a),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(s),C.halfHeight.applyMatrix4(s),T++}else if(y.isPointLight){let C=i.point[m];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(p),m++}else if(y.isHemisphereLight){let C=i.hemi[g];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(p),g++}}}return{setup:o,setupView:u,state:i}}function H0(n){let e=new ib(n),t=[],i=[],r=[];function a(f){h.camera=f,t.length=0,i.length=0,r.length=0}function s(f){t.push(f)}function o(f){i.push(f)}function u(f){r.push(f)}function l(){e.setup(t)}function d(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:h,setupLights:l,setupLightsView:d,pushLight:s,pushShadow:o,pushLightProbeGrid:u}}function rb(n){let e=new WeakMap;function t(r,a=0){let s=e.get(r),o;return s===void 0?(o=new H0(n),e.set(r,[o])):a>=s.length?(o=new H0(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var ab=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sb=`uniform sampler2D shadow_pass;
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
}`,ob=[new ge(1,0,0),new ge(-1,0,0),new ge(0,1,0),new ge(0,-1,0),new ge(0,0,1),new ge(0,0,-1)],lb=[new ge(0,-1,0),new ge(0,-1,0),new ge(0,0,1),new ge(0,0,-1),new ge(0,-1,0),new ge(0,-1,0)],W0=new Yn,Xl=new ge,Lf=new ge;function cb(n,e,t){let i=new mo,r=new Dt,a=new Dt,s=new hi,o=new du,u=new hu,l={},d=t.maxTextureSize,h={[us]:mr,[mr]:us,[wr]:wr},f=new Or({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:ab,fragmentShader:sb}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let x=new Xi;x.setAttribute("position",new Nr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new Kn(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ul;let p=this.type;this.render=function(N,O,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||N.length===0)return;this.type===Au&&(an("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ul);let E=n.getRenderTarget(),B=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),q=n.state;q.setBlending(wa),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let b=p!==this.type;b&&O.traverse(function(M){M.material&&(Array.isArray(M.material)?M.material.forEach(k=>k.needsUpdate=!0):M.material.needsUpdate=!0)});for(let M=0,k=N.length;M<k;M++){let V=N[M],Q=V.shadow;if(Q===void 0){an("WebGLShadowMap:",V,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);let j=Q.getFrameExtents();r.multiply(j),a.copy(Q.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/j.x),r.x=a.x*j.x,Q.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/j.y),r.y=a.y*j.y,Q.mapSize.y=a.y));let W=n.state.buffers.depth.getReversed();if(Q.camera._reversedDepth=W,Q.map===null||b===!0){if(Q.map!==null&&(Q.map.depthTexture!==null&&(Q.map.depthTexture.dispose(),Q.map.depthTexture=null),Q.map.dispose()),this.type===So){if(V.isPointLight){an("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Q.map=new br(r.x,r.y,{format:ps,type:ia,minFilter:Wi,magFilter:Wi,generateMipmaps:!1}),Q.map.texture.name=V.name+".shadowMap",Q.map.depthTexture=new as(r.x,r.y,Hr),Q.map.depthTexture.name=V.name+".shadowMapDepth",Q.map.depthTexture.format=ya,Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=zi,Q.map.depthTexture.magFilter=zi}else V.isPointLight?(Q.map=new Md(r.x),Q.map.depthTexture=new iu(r.x,na)):(Q.map=new br(r.x,r.y),Q.map.depthTexture=new as(r.x,r.y,na)),Q.map.depthTexture.name=V.name+".shadowMap",Q.map.depthTexture.format=ya,this.type===Ul?(Q.map.depthTexture.compareFunction=W?gd:vd,Q.map.depthTexture.minFilter=Wi,Q.map.depthTexture.magFilter=Wi):(Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=zi,Q.map.depthTexture.magFilter=zi);Q.camera.updateProjectionMatrix()}Q.map.isWebGLCubeRenderTarget!==!0&&(Q.map.width!==r.x||Q.map.height!==r.y)&&Q.map.setSize(r.x,r.y);let Z=Q.map.isWebGLCubeRenderTarget?6:Q.getViewportCount();V.isPointLight!==!0&&Q.updateMatrices(V,S);for(let re=0;re<Z;re++){let ye=Q.getCamera(re);if(V.isPointLight){let Se=Q.camera,ue=Q.matrix,fe=V.distance||Se.far;fe!==Se.far&&(Se.far=fe,Se.updateProjectionMatrix()),Xl.setFromMatrixPosition(V.matrixWorld),Se.position.copy(Xl),Lf.copy(Se.position),Lf.add(ob[re]),Se.up.copy(lb[re]),Se.lookAt(Lf),Se.updateMatrixWorld(),ue.makeTranslation(-Xl.x,-Xl.y,-Xl.z),W0.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),Q._frustum.setFromProjectionMatrix(W0,Se.coordinateSystem,Se.reversedDepth)}if(Q.map.isWebGLCubeRenderTarget)n.setRenderTarget(Q.map,re),n.clear();else{re===0&&(n.setRenderTarget(Q.map),n.clear());let Se=Q.getViewport(re);s.set(a.x*Se.x,a.y*Se.y,a.x*Se.z,a.y*Se.w),q.viewport(s)}i=Q.getFrustum(re),y(O,S,ye,V,this.type)}Q.isPointLightShadow!==!0&&this.type===So&&D(Q,S),Q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(E,B,F)};function D(N,O){let S=e.update(T);f.defines.VSM_SAMPLES!==N.blurSamples&&(f.defines.VSM_SAMPLES=N.blurSamples,m.defines.VSM_SAMPLES=N.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),N.mapPass===null?N.mapPass=new br(r.x,r.y,{format:ps,type:ia}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),f.uniforms.shadow_pass.value=N.map.depthTexture,f.uniforms.resolution.value.set(N.map.width,N.map.height),f.uniforms.radius.value=N.radius,n.setRenderTarget(N.mapPass),n.clear(),n.renderBufferDirect(O,null,S,f,T,null),m.uniforms.shadow_pass.value=N.mapPass.texture,m.uniforms.resolution.value.set(N.map.width,N.map.height),m.uniforms.radius.value=N.radius,n.setRenderTarget(N.map),n.clear(),n.renderBufferDirect(O,null,S,m,T,null)}function v(N,O,S,E){let B=null,F=S.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(F!==void 0)B=F;else if(B=S.isPointLight===!0?u:o,n.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){let q=B.uuid,b=O.uuid,M=l[q];M===void 0&&(M={},l[q]=M);let k=M[b];k===void 0&&(k=B.clone(),M[b]=k,O.addEventListener("dispose",C)),B=k}if(B.visible=O.visible,B.wireframe=O.wireframe,E===So?B.side=O.shadowSide!==null?O.shadowSide:O.side:B.side=O.shadowSide!==null?O.shadowSide:h[O.side],B.alphaMap=O.alphaMap,B.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,B.map=O.map,B.clipShadows=O.clipShadows,B.clippingPlanes=O.clippingPlanes,B.clipIntersection=O.clipIntersection,B.displacementMap=O.displacementMap,B.displacementScale=O.displacementScale,B.displacementBias=O.displacementBias,B.wireframeLinewidth=O.wireframeLinewidth,B.linewidth=O.linewidth,S.isPointLight===!0&&B.isMeshDistanceMaterial===!0){let q=n.properties.get(B);q.light=S}return B}function y(N,O,S,E,B){if(N.visible===!1)return;if(N.layers.test(O.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&B===So)&&(!N.frustumCulled||N.intersectsFrustum(i))){N.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,N.matrixWorld);let b=e.update(N),M=N.material;if(Array.isArray(M)){let k=b.groups;for(let V=0,Q=k.length;V<Q;V++){let j=k[V],W=M[j.materialIndex];if(W&&W.visible){let Z=v(N,W,E,B);N.onBeforeShadow(n,N,O,S,b,Z,j),n.renderBufferDirect(S,null,b,Z,N,j),N.onAfterShadow(n,N,O,S,b,Z,j)}}}else if(M.visible){let k=v(N,M,E,B);N.onBeforeShadow(n,N,O,S,b,k,null),n.renderBufferDirect(S,null,b,k,N,null),N.onAfterShadow(n,N,O,S,b,k,null)}}let q=N.children;for(let b=0,M=q.length;b<M;b++)y(q[b],O,S,E,B)}function C(N){N.target.removeEventListener("dispose",C);for(let S in l){let E=l[S],B=N.target.uuid;B in E&&(E[B].dispose(),delete E[B])}}}function ub(n,e){function t(){let ie=!1,Ze=new hi,Re=null,tt=new hi(0,0,0,0);return{setMask:function(ot){Re!==ot&&!ie&&(n.colorMask(ot,ot,ot,ot),Re=ot)},setLocked:function(ot){ie=ot},setClear:function(ot,ke,Rt,ft,Kt){Kt===!0&&(ot*=ft,ke*=ft,Rt*=ft),Ze.set(ot,ke,Rt,ft),tt.equals(Ze)===!1&&(n.clearColor(ot,ke,Rt,ft),tt.copy(Ze))},reset:function(){ie=!1,Re=null,tt.set(-1,0,0,0)}}}function i(){let ie=!1,Ze=!1,Re=null,tt=null,ot=null;return{setReversed:function(ke){if(Ze!==ke){let Rt=e.get("EXT_clip_control");ke?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),Ze=ke;let ft=ot;ot=null,this.setClear(ft)}},getReversed:function(){return Ze},setTest:function(ke){ke?oe(n.DEPTH_TEST):Ue(n.DEPTH_TEST)},setMask:function(ke){Re!==ke&&!ie&&(n.depthMask(ke),Re=ke)},setFunc:function(ke){if(Ze&&(ke=m0[ke]),tt!==ke){switch(ke){case Hc:n.depthFunc(n.NEVER);break;case Wc:n.depthFunc(n.ALWAYS);break;case Xc:n.depthFunc(n.LESS);break;case lo:n.depthFunc(n.LEQUAL);break;case Yc:n.depthFunc(n.EQUAL);break;case qc:n.depthFunc(n.GEQUAL);break;case Zc:n.depthFunc(n.GREATER);break;case Jc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}tt=ke}},setLocked:function(ke){ie=ke},setClear:function(ke){ot!==ke&&(ot=ke,Ze&&(ke=1-ke),n.clearDepth(ke))},reset:function(){ie=!1,Re=null,tt=null,ot=null,Ze=!1}}}function r(){let ie=!1,Ze=null,Re=null,tt=null,ot=null,ke=null,Rt=null,ft=null,Kt=null;return{setTest:function(Qt){ie||(Qt?oe(n.STENCIL_TEST):Ue(n.STENCIL_TEST))},setMask:function(Qt){Ze!==Qt&&!ie&&(n.stencilMask(Qt),Ze=Qt)},setFunc:function(Qt,Bn,ei){(Re!==Qt||tt!==Bn||ot!==ei)&&(n.stencilFunc(Qt,Bn,ei),Re=Qt,tt=Bn,ot=ei)},setOp:function(Qt,Bn,ei){(ke!==Qt||Rt!==Bn||ft!==ei)&&(n.stencilOp(Qt,Bn,ei),ke=Qt,Rt=Bn,ft=ei)},setLocked:function(Qt){ie=Qt},setClear:function(Qt){Kt!==Qt&&(n.clearStencil(Qt),Kt=Qt)},reset:function(){ie=!1,Ze=null,Re=null,tt=null,ot=null,ke=null,Rt=null,ft=null,Kt=null}}}let a=new t,s=new i,o=new r,u=new WeakMap,l=new WeakMap,d={},h={},f={},m=new WeakMap,x=[],T=null,g=!1,p=null,D=null,v=null,y=null,C=null,N=null,O=null,S=new mn(0,0,0),E=0,B=!1,F=null,q=null,b=null,M=null,k=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,j=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),Q=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Q=j>=2);let Z=null,re={},ye=n.getParameter(n.SCISSOR_BOX),Se=n.getParameter(n.VIEWPORT),ue=new hi().fromArray(ye),fe=new hi().fromArray(Se);function Fe(ie,Ze,Re,tt){let ot=new Uint8Array(4),ke=n.createTexture();n.bindTexture(ie,ke),n.texParameteri(ie,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(ie,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Rt=0;Rt<Re;Rt++)ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?n.texImage3D(Ze,0,n.RGBA,1,1,tt,0,n.RGBA,n.UNSIGNED_BYTE,ot):n.texImage2D(Ze+Rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ot);return ke}let ne={};ne[n.TEXTURE_2D]=Fe(n.TEXTURE_2D,n.TEXTURE_2D,1),ne[n.TEXTURE_CUBE_MAP]=Fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[n.TEXTURE_2D_ARRAY]=Fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ne[n.TEXTURE_3D]=Fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),s.setFunc(lo),je(!1),xt(Zh),oe(n.CULL_FACE),wt(wa);function oe(ie){d[ie]!==!0&&(n.enable(ie),d[ie]=!0)}function Ue(ie){d[ie]!==!1&&(n.disable(ie),d[ie]=!1)}function Be(ie,Ze){return f[ie]!==Ze?(n.bindFramebuffer(ie,Ze),f[ie]=Ze,ie===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Ze),ie===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Ze),!0):!1}function ze(ie,Ze){let Re=x,tt=!1;if(ie){Re=m.get(Ze),Re===void 0&&(Re=[],m.set(Ze,Re));let ot=ie.textures;if(Re.length!==ot.length||Re[0]!==n.COLOR_ATTACHMENT0){for(let ke=0,Rt=ot.length;ke<Rt;ke++)Re[ke]=n.COLOR_ATTACHMENT0+ke;Re.length=ot.length,tt=!0}}else Re[0]!==n.BACK&&(Re[0]=n.BACK,tt=!0);tt&&n.drawBuffers(Re)}function ht(ie){return T!==ie?(n.useProgram(ie),T=ie,!0):!1}let Gt={[Ls]:n.FUNC_ADD,[Fm]:n.FUNC_SUBTRACT,[Om]:n.FUNC_REVERSE_SUBTRACT};Gt[Bm]=n.MIN,Gt[km]=n.MAX;let ut={[zm]:n.ZERO,[Vm]:n.ONE,[Gm]:n.SRC_COLOR,[Qh]:n.SRC_ALPHA,[Zm]:n.SRC_ALPHA_SATURATE,[Ym]:n.DST_COLOR,[Wm]:n.DST_ALPHA,[Hm]:n.ONE_MINUS_SRC_COLOR,[jh]:n.ONE_MINUS_SRC_ALPHA,[qm]:n.ONE_MINUS_DST_COLOR,[Xm]:n.ONE_MINUS_DST_ALPHA,[Jm]:n.CONSTANT_COLOR,[$m]:n.ONE_MINUS_CONSTANT_COLOR,[Km]:n.CONSTANT_ALPHA,[Qm]:n.ONE_MINUS_CONSTANT_ALPHA};function wt(ie,Ze,Re,tt,ot,ke,Rt,ft,Kt,Qt){if(ie===wa){g===!0&&(Ue(n.BLEND),g=!1);return}if(g===!1&&(oe(n.BLEND),g=!0),ie!==Um){if(ie!==p||Qt!==B){if((D!==Ls||C!==Ls)&&(n.blendEquation(n.FUNC_ADD),D=Ls,C=Ls),Qt)switch(ie){case bo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jh:n.blendFunc(n.ONE,n.ONE);break;case $h:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:sn("WebGLState: Invalid blending: ",ie);break}else switch(ie){case bo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case $h:sn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kh:sn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:sn("WebGLState: Invalid blending: ",ie);break}v=null,y=null,N=null,O=null,S.set(0,0,0),E=0,p=ie,B=Qt}return}ot=ot||Ze,ke=ke||Re,Rt=Rt||tt,(Ze!==D||ot!==C)&&(n.blendEquationSeparate(Gt[Ze],Gt[ot]),D=Ze,C=ot),(Re!==v||tt!==y||ke!==N||Rt!==O)&&(n.blendFuncSeparate(ut[Re],ut[tt],ut[ke],ut[Rt]),v=Re,y=tt,N=ke,O=Rt),(ft.equals(S)===!1||Kt!==E)&&(n.blendColor(ft.r,ft.g,ft.b,Kt),S.copy(ft),E=Kt),p=ie,B=!1}function Zt(ie,Ze){ie.side===wr?Ue(n.CULL_FACE):oe(n.CULL_FACE);let Re=ie.side===mr;Ze&&(Re=!Re),je(Re),ie.blending===bo&&ie.transparent===!1?wt(wa):wt(ie.blending,ie.blendEquation,ie.blendSrc,ie.blendDst,ie.blendEquationAlpha,ie.blendSrcAlpha,ie.blendDstAlpha,ie.blendColor,ie.blendAlpha,ie.premultipliedAlpha),s.setFunc(ie.depthFunc),s.setTest(ie.depthTest),s.setMask(ie.depthWrite),a.setMask(ie.colorWrite);let tt=ie.stencilWrite;o.setTest(tt),tt&&(o.setMask(ie.stencilWriteMask),o.setFunc(ie.stencilFunc,ie.stencilRef,ie.stencilFuncMask),o.setOp(ie.stencilFail,ie.stencilZFail,ie.stencilZPass)),cn(ie.polygonOffset,ie.polygonOffsetFactor,ie.polygonOffsetUnits),ie.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):Ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function je(ie){F!==ie&&(ie?n.frontFace(n.CW):n.frontFace(n.CCW),F=ie)}function xt(ie){ie!==Dm?(oe(n.CULL_FACE),ie!==q&&(ie===Zh?n.cullFace(n.BACK):ie===Nm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ue(n.CULL_FACE),q=ie}function _t(ie){ie!==b&&(Q&&n.lineWidth(ie),b=ie)}function cn(ie,Ze,Re){ie?(oe(n.POLYGON_OFFSET_FILL),(M!==Ze||k!==Re)&&(M=Ze,k=Re,s.getReversed()&&(Ze=-Ze),n.polygonOffset(Ze,Re))):Ue(n.POLYGON_OFFSET_FILL)}function Pt(ie){ie?oe(n.SCISSOR_TEST):Ue(n.SCISSOR_TEST)}function $t(ie){ie===void 0&&(ie=n.TEXTURE0+V-1),Z!==ie&&(n.activeTexture(ie),Z=ie)}function ae(ie,Ze,Re){Re===void 0&&(Z===null?Re=n.TEXTURE0+V-1:Re=Z);let tt=re[Re];tt===void 0&&(tt={type:void 0,texture:void 0},re[Re]=tt),(tt.type!==ie||tt.texture!==Ze)&&(Z!==Re&&(n.activeTexture(Re),Z=Re),n.bindTexture(ie,Ze||ne[ie]),tt.type=ie,tt.texture=Ze)}function hn(){let ie=re[Z];ie!==void 0&&ie.type!==void 0&&(n.bindTexture(ie.type,null),ie.type=void 0,ie.texture=void 0)}function qt(){try{n.compressedTexImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function X(){try{n.compressedTexImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function w(){try{n.texSubImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function le(){try{n.texSubImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function ve(){try{n.compressedTexSubImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function He(){try{n.texStorage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function $e(){try{n.texStorage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Ae(){try{n.texImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Te(){try{n.texImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Pe(ie){return h[ie]!==void 0?h[ie]:n.getParameter(ie)}function Ke(ie,Ze){h[ie]!==Ze&&(n.pixelStorei(ie,Ze),h[ie]=Ze)}function Oe(ie){ue.equals(ie)===!1&&(n.scissor(ie.x,ie.y,ie.z,ie.w),ue.copy(ie))}function Ge(ie){fe.equals(ie)===!1&&(n.viewport(ie.x,ie.y,ie.z,ie.w),fe.copy(ie))}function De(ie,Ze){let Re=l.get(Ze);Re===void 0&&(Re=new WeakMap,l.set(Ze,Re));let tt=Re.get(ie);tt===void 0&&(tt=n.getUniformBlockIndex(Ze,ie.name),Re.set(ie,tt))}function lt(ie,Ze){let tt=l.get(Ze).get(ie);u.get(Ze)!==tt&&(n.uniformBlockBinding(Ze,tt,ie.__bindingPointIndex),u.set(Ze,tt))}function et(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},Z=null,re={},f={},m=new WeakMap,x=[],T=null,g=!1,p=null,D=null,v=null,y=null,C=null,N=null,O=null,S=new mn(0,0,0),E=0,B=!1,F=null,q=null,b=null,M=null,k=null,ue.set(0,0,n.canvas.width,n.canvas.height),fe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:oe,disable:Ue,bindFramebuffer:Be,drawBuffers:ze,useProgram:ht,setBlending:wt,setMaterial:Zt,setFlipSided:je,setCullFace:xt,setLineWidth:_t,setPolygonOffset:cn,setScissorTest:Pt,activeTexture:$t,bindTexture:ae,unbindTexture:hn,compressedTexImage2D:qt,compressedTexImage3D:X,texImage2D:Ae,texImage3D:Te,pixelStorei:Ke,getParameter:Pe,updateUBOMapping:De,uniformBlockBinding:lt,texStorage2D:He,texStorage3D:$e,texSubImage2D:w,texSubImage3D:le,compressedTexSubImage2D:ve,compressedTexSubImage3D:Me,scissor:Oe,viewport:Ge,reset:et}}function db(n,e,t,i,r,a,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Dt,d=new WeakMap,h=new Set,f,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(X,w){return x?new OffscreenCanvas(X,w):ul("canvas")}function g(X,w,le){let ve=1,Me=qt(X);if((Me.width>le||Me.height>le)&&(ve=le/Math.max(Me.width,Me.height)),ve<1)if(typeof HTMLImageElement<"u"&&X instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&X instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&X instanceof ImageBitmap||typeof VideoFrame<"u"&&X instanceof VideoFrame){let He=Math.floor(ve*Me.width),$e=Math.floor(ve*Me.height);f===void 0&&(f=T(He,$e));let Ae=w?T(He,$e):f;return Ae.width=He,Ae.height=$e,Ae.getContext("2d").drawImage(X,0,0,He,$e),an("WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+He+"x"+$e+")."),Ae}else return"data"in X&&an("WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),X;return X}function p(X){return X.generateMipmaps}function D(X){n.generateMipmap(X)}function v(X){return X.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:X.isWebGL3DRenderTarget?n.TEXTURE_3D:X.isWebGLArrayRenderTarget||X.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(X,w,le,ve,Me,He=!1){if(X!==null){if(n[X]!==void 0)return n[X];an("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+X+"'")}let $e;ve&&($e=e.get("EXT_texture_norm16"),$e||an("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Ae=w;if(w===n.RED&&(le===n.FLOAT&&(Ae=n.R32F),le===n.HALF_FLOAT&&(Ae=n.R16F),le===n.UNSIGNED_BYTE&&(Ae=n.R8),le===n.UNSIGNED_SHORT&&$e&&(Ae=$e.R16_EXT),le===n.SHORT&&$e&&(Ae=$e.R16_SNORM_EXT)),w===n.RED_INTEGER&&(le===n.UNSIGNED_BYTE&&(Ae=n.R8UI),le===n.UNSIGNED_SHORT&&(Ae=n.R16UI),le===n.UNSIGNED_INT&&(Ae=n.R32UI),le===n.BYTE&&(Ae=n.R8I),le===n.SHORT&&(Ae=n.R16I),le===n.INT&&(Ae=n.R32I)),w===n.RG&&(le===n.FLOAT&&(Ae=n.RG32F),le===n.HALF_FLOAT&&(Ae=n.RG16F),le===n.UNSIGNED_BYTE&&(Ae=n.RG8),le===n.UNSIGNED_SHORT&&$e&&(Ae=$e.RG16_EXT),le===n.SHORT&&$e&&(Ae=$e.RG16_SNORM_EXT)),w===n.RG_INTEGER&&(le===n.UNSIGNED_BYTE&&(Ae=n.RG8UI),le===n.UNSIGNED_SHORT&&(Ae=n.RG16UI),le===n.UNSIGNED_INT&&(Ae=n.RG32UI),le===n.BYTE&&(Ae=n.RG8I),le===n.SHORT&&(Ae=n.RG16I),le===n.INT&&(Ae=n.RG32I)),w===n.RGB_INTEGER&&(le===n.UNSIGNED_BYTE&&(Ae=n.RGB8UI),le===n.UNSIGNED_SHORT&&(Ae=n.RGB16UI),le===n.UNSIGNED_INT&&(Ae=n.RGB32UI),le===n.BYTE&&(Ae=n.RGB8I),le===n.SHORT&&(Ae=n.RGB16I),le===n.INT&&(Ae=n.RGB32I)),w===n.RGBA_INTEGER&&(le===n.UNSIGNED_BYTE&&(Ae=n.RGBA8UI),le===n.UNSIGNED_SHORT&&(Ae=n.RGBA16UI),le===n.UNSIGNED_INT&&(Ae=n.RGBA32UI),le===n.BYTE&&(Ae=n.RGBA8I),le===n.SHORT&&(Ae=n.RGBA16I),le===n.INT&&(Ae=n.RGBA32I)),w===n.RGB&&(le===n.UNSIGNED_SHORT&&$e&&(Ae=$e.RGB16_EXT),le===n.SHORT&&$e&&(Ae=$e.RGB16_SNORM_EXT),le===n.UNSIGNED_INT_5_9_9_9_REV&&(Ae=n.RGB9_E5),le===n.UNSIGNED_INT_10F_11F_11F_REV&&(Ae=n.R11F_G11F_B10F)),w===n.RGBA){let Te=He?cl:An.getTransfer(Me);le===n.FLOAT&&(Ae=n.RGBA32F),le===n.HALF_FLOAT&&(Ae=n.RGBA16F),le===n.UNSIGNED_BYTE&&(Ae=Te===Xn?n.SRGB8_ALPHA8:n.RGBA8),le===n.UNSIGNED_SHORT&&$e&&(Ae=$e.RGBA16_EXT),le===n.SHORT&&$e&&(Ae=$e.RGBA16_SNORM_EXT),le===n.UNSIGNED_SHORT_4_4_4_4&&(Ae=n.RGBA4),le===n.UNSIGNED_SHORT_5_5_5_1&&(Ae=n.RGB5_A1)}return(Ae===n.R16F||Ae===n.R32F||Ae===n.RG16F||Ae===n.RG32F||Ae===n.RGBA16F||Ae===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Ae}function C(X,w){let le;return X?w===null||w===na||w===To?le=n.DEPTH24_STENCIL8:w===Hr?le=n.DEPTH32F_STENCIL8:w===wo&&(le=n.DEPTH24_STENCIL8,an("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===na||w===To?le=n.DEPTH_COMPONENT24:w===Hr?le=n.DEPTH_COMPONENT32F:w===wo&&(le=n.DEPTH_COMPONENT16),le}function N(X,w){return p(X)===!0||X.isFramebufferTexture&&X.minFilter!==zi&&X.minFilter!==Wi?Math.log2(Math.max(w.width,w.height))+1:X.mipmaps!==void 0&&X.mipmaps.length>0?X.mipmaps.length:X.isCompressedTexture&&Array.isArray(X.image)?w.mipmaps.length:1}function O(X){let w=X.target;w.removeEventListener("dispose",O),E(w),w.isVideoTexture&&d.delete(w),w.isHTMLTexture&&h.delete(w)}function S(X){let w=X.target;w.removeEventListener("dispose",S),F(w)}function E(X){let w=i.get(X);if(w.__webglInit===void 0)return;let le=X.source,ve=m.get(le);if(ve){let Me=ve[w.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&B(X),Object.keys(ve).length===0&&m.delete(le)}i.remove(X)}function B(X){let w=i.get(X);n.deleteTexture(w.__webglTexture);let le=X.source,ve=m.get(le);delete ve[w.__cacheKey],s.memory.textures--}function F(X){let w=i.get(X);if(X.depthTexture&&(X.depthTexture.dispose(),i.remove(X.depthTexture)),X.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray(w.__webglFramebuffer[ve]))for(let Me=0;Me<w.__webglFramebuffer[ve].length;Me++)n.deleteFramebuffer(w.__webglFramebuffer[ve][Me]);else n.deleteFramebuffer(w.__webglFramebuffer[ve]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[ve])}else{if(Array.isArray(w.__webglFramebuffer))for(let ve=0;ve<w.__webglFramebuffer.length;ve++)n.deleteFramebuffer(w.__webglFramebuffer[ve]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ve=0;ve<w.__webglColorRenderbuffer.length;ve++)w.__webglColorRenderbuffer[ve]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[ve]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let le=X.textures;for(let ve=0,Me=le.length;ve<Me;ve++){let He=i.get(le[ve]);He.__webglTexture&&(n.deleteTexture(He.__webglTexture),s.memory.textures--),i.remove(le[ve])}i.remove(X)}let q=0;function b(){q=0}function M(){return q}function k(X){q=X}function V(){let X=q;return X>=r.maxTextures&&an("WebGLTextures: Trying to use "+(X+1)+" texture units while this GPU supports only "+r.maxTextures),q+=1,X}function Q(X){let w=[];return w.push(X.wrapS),w.push(X.wrapT),w.push(X.wrapR||0),w.push(X.magFilter),w.push(X.minFilter),w.push(X.anisotropy),w.push(X.internalFormat),w.push(X.format),w.push(X.type),w.push(X.generateMipmaps),w.push(X.premultiplyAlpha),w.push(X.flipY),w.push(X.unpackAlignment),w.push(X.colorSpace),w.join()}function j(X,w){let le=i.get(X);if(X.isVideoTexture&&ae(X),X.isRenderTargetTexture===!1&&X.isExternalTexture!==!0&&X.version>0&&le.__version!==X.version){let ve=X.image;if(ve===null)an("WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)an("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(le,X,w);return}}else X.isExternalTexture&&(le.__webglTexture=X.sourceTexture?X.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,le.__webglTexture,n.TEXTURE0+w)}function W(X,w){let le=i.get(X);if(X.isRenderTargetTexture===!1&&X.version>0&&le.__version!==X.version){Ue(le,X,w);return}else X.isExternalTexture&&(le.__webglTexture=X.sourceTexture?X.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,le.__webglTexture,n.TEXTURE0+w)}function Z(X,w){let le=i.get(X);if(X.isRenderTargetTexture===!1&&X.version>0&&le.__version!==X.version){Ue(le,X,w);return}t.bindTexture(n.TEXTURE_3D,le.__webglTexture,n.TEXTURE0+w)}function re(X,w){let le=i.get(X);if(X.isCubeDepthTexture!==!0&&X.version>0&&le.__version!==X.version){Be(le,X,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture,n.TEXTURE0+w)}let ye={[$c]:n.REPEAT,[ga]:n.CLAMP_TO_EDGE,[Kc]:n.MIRRORED_REPEAT},Se={[zi]:n.NEAREST,[t0]:n.NEAREST_MIPMAP_NEAREST,[Ol]:n.NEAREST_MIPMAP_LINEAR,[Wi]:n.LINEAR,[Pu]:n.LINEAR_MIPMAP_NEAREST,[hs]:n.LINEAR_MIPMAP_LINEAR},ue={[a0]:n.NEVER,[u0]:n.ALWAYS,[s0]:n.LESS,[vd]:n.LEQUAL,[o0]:n.EQUAL,[gd]:n.GEQUAL,[l0]:n.GREATER,[c0]:n.NOTEQUAL};function fe(X,w){if(w.type===Hr&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Wi||w.magFilter===Pu||w.magFilter===Ol||w.magFilter===hs||w.minFilter===Wi||w.minFilter===Pu||w.minFilter===Ol||w.minFilter===hs)&&an("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(X,n.TEXTURE_WRAP_S,ye[w.wrapS]),n.texParameteri(X,n.TEXTURE_WRAP_T,ye[w.wrapT]),(X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY)&&n.texParameteri(X,n.TEXTURE_WRAP_R,ye[w.wrapR]),n.texParameteri(X,n.TEXTURE_MAG_FILTER,Se[w.magFilter]),n.texParameteri(X,n.TEXTURE_MIN_FILTER,Se[w.minFilter]),w.compareFunction&&(n.texParameteri(X,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(X,n.TEXTURE_COMPARE_FUNC,ue[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===zi||w.minFilter!==Ol&&w.minFilter!==hs||w.type===Hr&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let le=e.get("EXT_texture_filter_anisotropic");n.texParameterf(X,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Fe(X,w){let le=!1;X.__webglInit===void 0&&(X.__webglInit=!0,w.addEventListener("dispose",O));let ve=w.source,Me=m.get(ve);Me===void 0&&(Me={},m.set(ve,Me));let He=Q(w);if(He!==X.__cacheKey){Me[He]===void 0&&(Me[He]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,le=!0),Me[He].usedTimes++;let $e=Me[X.__cacheKey];$e!==void 0&&(Me[X.__cacheKey].usedTimes--,$e.usedTimes===0&&B(w)),X.__cacheKey=He,X.__webglTexture=Me[He].texture}return le}function ne(X,w,le){return Math.floor(Math.floor(X/le)/w)}function oe(X,w,le,ve){let He=X.updateRanges;if(He.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,le,ve,w.data);else{He.sort((Ke,Oe)=>Ke.start-Oe.start);let $e=0;for(let Ke=1;Ke<He.length;Ke++){let Oe=He[$e],Ge=He[Ke],De=Oe.start+Oe.count,lt=ne(Ge.start,w.width,4),et=ne(Oe.start,w.width,4);Ge.start<=De+1&&lt===et&&ne(Ge.start+Ge.count-1,w.width,4)===lt?Oe.count=Math.max(Oe.count,Ge.start+Ge.count-Oe.start):(++$e,He[$e]=Ge)}He.length=$e+1;let Ae=t.getParameter(n.UNPACK_ROW_LENGTH),Te=t.getParameter(n.UNPACK_SKIP_PIXELS),Pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let Ke=0,Oe=He.length;Ke<Oe;Ke++){let Ge=He[Ke],De=Math.floor(Ge.start/4),lt=Math.ceil(Ge.count/4),et=De%w.width,ie=Math.floor(De/w.width),Ze=lt,Re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,et),t.pixelStorei(n.UNPACK_SKIP_ROWS,ie),t.texSubImage2D(n.TEXTURE_2D,0,et,ie,Ze,Re,le,ve,w.data)}X.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Ae),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),t.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function Ue(X,w,le){let ve=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ve=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ve=n.TEXTURE_3D);let Me=Fe(X,w),He=w.source;t.bindTexture(ve,X.__webglTexture,n.TEXTURE0+le);let $e=i.get(He);if(He.version!==$e.__version||Me===!0){if(t.activeTexture(n.TEXTURE0+le),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let Re=An.getPrimaries(An.workingColorSpace),tt=w.colorSpace===Ha?null:An.getPrimaries(w.colorSpace),ot=w.colorSpace===Ha||Re===tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot)}t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment);let Te=g(w.image,!1,r.maxTextureSize);Te=hn(w,Te);let Pe=a.convert(w.format,w.colorSpace),Ke=a.convert(w.type),Oe=y(w.internalFormat,Pe,Ke,w.normalized,w.colorSpace,w.isVideoTexture);fe(ve,w);let Ge,De=w.mipmaps,lt=w.isVideoTexture!==!0,et=$e.__version===void 0||Me===!0,ie=He.dataReady,Ze=N(w,Te);if(w.isDepthTexture)Oe=C(w.format===fs,w.type),et&&(lt?t.texStorage2D(n.TEXTURE_2D,1,Oe,Te.width,Te.height):t.texImage2D(n.TEXTURE_2D,0,Oe,Te.width,Te.height,0,Pe,Ke,null));else if(w.isDataTexture)if(De.length>0){lt&&et&&t.texStorage2D(n.TEXTURE_2D,Ze,Oe,De[0].width,De[0].height);for(let Re=0,tt=De.length;Re<tt;Re++)Ge=De[Re],lt?ie&&t.texSubImage2D(n.TEXTURE_2D,Re,0,0,Ge.width,Ge.height,Pe,Ke,Ge.data):t.texImage2D(n.TEXTURE_2D,Re,Oe,Ge.width,Ge.height,0,Pe,Ke,Ge.data);w.generateMipmaps=!1}else lt?(et&&t.texStorage2D(n.TEXTURE_2D,Ze,Oe,Te.width,Te.height),ie&&oe(w,Te,Pe,Ke)):t.texImage2D(n.TEXTURE_2D,0,Oe,Te.width,Te.height,0,Pe,Ke,Te.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){lt&&et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ze,Oe,De[0].width,De[0].height,Te.depth);for(let Re=0,tt=De.length;Re<tt;Re++)if(Ge=De[Re],w.format!==Wr)if(Pe!==null)if(lt){if(ie)if(w.layerUpdates.size>0){let ot=Mf(Ge.width,Ge.height,w.format,w.type);for(let ke of w.layerUpdates){let Rt=Ge.data.subarray(ke*ot/Ge.data.BYTES_PER_ELEMENT,(ke+1)*ot/Ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Re,0,0,ke,Ge.width,Ge.height,1,Pe,Rt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Re,0,0,0,Ge.width,Ge.height,Te.depth,Pe,Ge.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Re,Oe,Ge.width,Ge.height,Te.depth,0,Ge.data,0,0);else an("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Re,0,0,0,Ge.width,Ge.height,Te.depth,Pe,Ke,Ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Re,Oe,Ge.width,Ge.height,Te.depth,0,Pe,Ke,Ge.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{lt&&et&&t.texStorage2D(n.TEXTURE_2D,Ze,Oe,De[0].width,De[0].height);for(let Re=0,tt=De.length;Re<tt;Re++)Ge=De[Re],w.format!==Wr?Pe!==null?lt?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,Re,0,0,Ge.width,Ge.height,Pe,Ge.data):t.compressedTexImage2D(n.TEXTURE_2D,Re,Oe,Ge.width,Ge.height,0,Ge.data):an("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?ie&&t.texSubImage2D(n.TEXTURE_2D,Re,0,0,Ge.width,Ge.height,Pe,Ke,Ge.data):t.texImage2D(n.TEXTURE_2D,Re,Oe,Ge.width,Ge.height,0,Pe,Ke,Ge.data)}else if(w.isDataArrayTexture)if(lt){if(et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ze,Oe,Te.width,Te.height,Te.depth),ie)if(w.layerUpdates.size>0){let Re=Mf(Te.width,Te.height,w.format,w.type);for(let tt of w.layerUpdates){let ot=Te.data.subarray(tt*Re/Te.data.BYTES_PER_ELEMENT,(tt+1)*Re/Te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,tt,Te.width,Te.height,1,Pe,Ke,ot)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,Pe,Ke,Te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Oe,Te.width,Te.height,Te.depth,0,Pe,Ke,Te.data);else if(w.isData3DTexture)lt?(et&&t.texStorage3D(n.TEXTURE_3D,Ze,Oe,Te.width,Te.height,Te.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,Pe,Ke,Te.data)):t.texImage3D(n.TEXTURE_3D,0,Oe,Te.width,Te.height,Te.depth,0,Pe,Ke,Te.data);else if(w.isFramebufferTexture){if(et)if(lt)t.texStorage2D(n.TEXTURE_2D,Ze,Oe,Te.width,Te.height);else{let Re=Te.width,tt=Te.height;for(let ot=0;ot<Ze;ot++)t.texImage2D(n.TEXTURE_2D,ot,Oe,Re,tt,0,Pe,Ke,null),Re>>=1,tt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in n){let Re=n.canvas;if(Re.hasAttribute("layoutsubtree")||Re.setAttribute("layoutsubtree","true"),Te.parentNode!==Re){Re.appendChild(Te),h.add(w),Re.onpaint=tt=>{let ot=tt.changedElements;for(let ke of h)ot.includes(ke.image)&&(ke.needsUpdate=!0)},Re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Te);else{let ot=n.RGBA,ke=n.RGBA,Rt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ot,ke,Rt,Te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(De.length>0){if(lt&&et){let Re=qt(De[0]);t.texStorage2D(n.TEXTURE_2D,Ze,Oe,Re.width,Re.height)}for(let Re=0,tt=De.length;Re<tt;Re++)Ge=De[Re],lt?ie&&t.texSubImage2D(n.TEXTURE_2D,Re,0,0,Pe,Ke,Ge):t.texImage2D(n.TEXTURE_2D,Re,Oe,Pe,Ke,Ge);w.generateMipmaps=!1}else if(lt){if(et){let Re=qt(Te);t.texStorage2D(n.TEXTURE_2D,Ze,Oe,Re.width,Re.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Pe,Ke,Te)}else t.texImage2D(n.TEXTURE_2D,0,Oe,Pe,Ke,Te);p(w)&&D(ve),$e.__version=He.version,w.onUpdate&&w.onUpdate(w)}X.__version=w.version}function Be(X,w,le){if(w.image.length!==6)return;let ve=Fe(X,w),Me=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+le);let He=i.get(Me);if(Me.version!==He.__version||ve===!0){t.activeTexture(n.TEXTURE0+le);let $e=An.getPrimaries(An.workingColorSpace),Ae=w.colorSpace===Ha?null:An.getPrimaries(w.colorSpace),Te=w.colorSpace===Ha||$e===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let Pe=w.isCompressedTexture||w.image[0].isCompressedTexture,Ke=w.image[0]&&w.image[0].isDataTexture,Oe=[];for(let ke=0;ke<6;ke++)!Pe&&!Ke?Oe[ke]=g(w.image[ke],!0,r.maxCubemapSize):Oe[ke]=Ke?w.image[ke].image:w.image[ke],Oe[ke]=hn(w,Oe[ke]);let Ge=Oe[0],De=a.convert(w.format,w.colorSpace),lt=a.convert(w.type),et=y(w.internalFormat,De,lt,w.normalized,w.colorSpace),ie=w.isVideoTexture!==!0,Ze=He.__version===void 0||ve===!0,Re=Me.dataReady,tt=N(w,Ge);fe(n.TEXTURE_CUBE_MAP,w);let ot;if(Pe){ie&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,tt,et,Ge.width,Ge.height);for(let ke=0;ke<6;ke++){ot=Oe[ke].mipmaps;for(let Rt=0;Rt<ot.length;Rt++){let ft=ot[Rt];w.format!==Wr?De!==null?ie?Re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt,0,0,ft.width,ft.height,De,ft.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt,et,ft.width,ft.height,0,ft.data):an("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ie?Re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt,0,0,ft.width,ft.height,De,lt,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt,et,ft.width,ft.height,0,De,lt,ft.data)}}}else{if(ot=w.mipmaps,ie&&Ze){ot.length>0&&tt++;let ke=qt(Oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,tt,et,ke.width,ke.height)}for(let ke=0;ke<6;ke++)if(Ke){ie?Re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,0,0,Oe[ke].width,Oe[ke].height,De,lt,Oe[ke].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,et,Oe[ke].width,Oe[ke].height,0,De,lt,Oe[ke].data);for(let Rt=0;Rt<ot.length;Rt++){let Kt=ot[Rt].image[ke].image;ie?Re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt+1,0,0,Kt.width,Kt.height,De,lt,Kt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt+1,et,Kt.width,Kt.height,0,De,lt,Kt.data)}}else{ie?Re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,0,0,De,lt,Oe[ke]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,et,De,lt,Oe[ke]);for(let Rt=0;Rt<ot.length;Rt++){let ft=ot[Rt];ie?Re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt+1,0,0,De,lt,ft.image[ke]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,Rt+1,et,De,lt,ft.image[ke])}}}p(w)&&D(n.TEXTURE_CUBE_MAP),He.__version=Me.version,w.onUpdate&&w.onUpdate(w)}X.__version=w.version}function ze(X,w,le,ve,Me,He){let $e=a.convert(le.format,le.colorSpace),Ae=a.convert(le.type),Te=y(le.internalFormat,$e,Ae,le.normalized,le.colorSpace),Pe=i.get(w),Ke=i.get(le);if(Ke.__renderTarget=w,!Pe.__hasExternalTextures){let Oe=Math.max(1,w.width>>He),Ge=Math.max(1,w.height>>He);Me===n.TEXTURE_3D||Me===n.TEXTURE_2D_ARRAY?t.texImage3D(Me,He,Te,Oe,Ge,w.depth,0,$e,Ae,null):t.texImage2D(Me,He,Te,Oe,Ge,0,$e,Ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,X),$t(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ve,Me,Ke.__webglTexture,0,Pt(w)):(Me===n.TEXTURE_2D||Me>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ve,Me,Ke.__webglTexture,He),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(X,w,le){if(n.bindRenderbuffer(n.RENDERBUFFER,X),w.depthBuffer){let ve=w.depthTexture,Me=ve&&ve.isDepthTexture?ve.type:null,He=C(w.stencilBuffer,Me),$e=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;$t(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt(w),He,w.width,w.height):le?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt(w),He,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,He,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,$e,n.RENDERBUFFER,X)}else{let ve=w.textures;for(let Me=0;Me<ve.length;Me++){let He=ve[Me],$e=a.convert(He.format,He.colorSpace),Ae=a.convert(He.type),Te=y(He.internalFormat,$e,Ae,He.normalized,He.colorSpace);$t(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt(w),Te,w.width,w.height):le?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt(w),Te,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Te,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Gt(X,w,le){let ve=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,X),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Me=i.get(w.depthTexture);if(Me.__renderTarget=w,(!Me.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ve){if(Me.__webglInit===void 0&&(Me.__webglInit=!0,w.depthTexture.addEventListener("dispose",O)),Me.__webglTexture===void 0){Me.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Me.__webglTexture),fe(n.TEXTURE_CUBE_MAP,w.depthTexture);let Pe=a.convert(w.depthTexture.format),Ke=a.convert(w.depthTexture.type),Oe;w.depthTexture.format===ya?Oe=n.DEPTH_COMPONENT24:w.depthTexture.format===fs&&(Oe=n.DEPTH24_STENCIL8);for(let Ge=0;Ge<6;Ge++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,0,Oe,w.width,w.height,0,Pe,Ke,null)}}else j(w.depthTexture,0);let He=Me.__webglTexture,$e=Pt(w),Ae=ve?n.TEXTURE_CUBE_MAP_POSITIVE_X+le:n.TEXTURE_2D,Te=w.depthTexture.format===fs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(w.depthTexture.format===ya)$t(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,Ae,He,0,$e):n.framebufferTexture2D(n.FRAMEBUFFER,Te,Ae,He,0);else if(w.depthTexture.format===fs)$t(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,Ae,He,0,$e):n.framebufferTexture2D(n.FRAMEBUFFER,Te,Ae,He,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ut(X){let w=i.get(X),le=X.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==X.depthTexture){let ve=X.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ve){let Me=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ve.removeEventListener("dispose",Me)};ve.addEventListener("dispose",Me),w.__depthDisposeCallback=Me}w.__boundDepthTexture=ve}if(X.depthTexture&&!w.__autoAllocateDepthBuffer)if(le)for(let ve=0;ve<6;ve++)Gt(w.__webglFramebuffer[ve],X,ve);else{let ve=X.texture.mipmaps;ve&&ve.length>0?Gt(w.__webglFramebuffer[0],X,0):Gt(w.__webglFramebuffer,X,0)}else if(le){w.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ve]),w.__webglDepthbuffer[ve]===void 0)w.__webglDepthbuffer[ve]=n.createRenderbuffer(),ht(w.__webglDepthbuffer[ve],X,!1);else{let Me=X.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,He=w.__webglDepthbuffer[ve];n.bindRenderbuffer(n.RENDERBUFFER,He),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,He)}}else{let ve=X.texture.mipmaps;if(ve&&ve.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),ht(w.__webglDepthbuffer,X,!1);else{let Me=X.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,He=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,He),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,He)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(X,w,le){let ve=i.get(X);w!==void 0&&ze(ve.__webglFramebuffer,X,X.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),le!==void 0&&ut(X)}function Zt(X){let w=X.texture,le=i.get(X),ve=i.get(w);X.addEventListener("dispose",S);let Me=X.textures,He=X.isWebGLCubeRenderTarget===!0,$e=Me.length>1;if($e||(ve.__webglTexture===void 0&&(ve.__webglTexture=n.createTexture()),ve.__version=w.version,s.memory.textures++),He){le.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(w.mipmaps&&w.mipmaps.length>0){le.__webglFramebuffer[Ae]=[];for(let Te=0;Te<w.mipmaps.length;Te++)le.__webglFramebuffer[Ae][Te]=n.createFramebuffer()}else le.__webglFramebuffer[Ae]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){le.__webglFramebuffer=[];for(let Ae=0;Ae<w.mipmaps.length;Ae++)le.__webglFramebuffer[Ae]=n.createFramebuffer()}else le.__webglFramebuffer=n.createFramebuffer();if($e)for(let Ae=0,Te=Me.length;Ae<Te;Ae++){let Pe=i.get(Me[Ae]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),s.memory.textures++)}if(X.samples>0&&$t(X)===!1){le.__webglMultisampledFramebuffer=n.createFramebuffer(),le.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer);for(let Ae=0;Ae<Me.length;Ae++){let Te=Me[Ae];le.__webglColorRenderbuffer[Ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,le.__webglColorRenderbuffer[Ae]);let Pe=a.convert(Te.format,Te.colorSpace),Ke=a.convert(Te.type),Oe=y(Te.internalFormat,Pe,Ke,Te.normalized,Te.colorSpace,X.isXRRenderTarget===!0),Ge=Pt(X);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,Oe,X.width,X.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,le.__webglColorRenderbuffer[Ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),X.depthBuffer&&(le.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(le.__webglDepthRenderbuffer,X,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(He){t.bindTexture(n.TEXTURE_CUBE_MAP,ve.__webglTexture),fe(n.TEXTURE_CUBE_MAP,w);for(let Ae=0;Ae<6;Ae++)if(w.mipmaps&&w.mipmaps.length>0)for(let Te=0;Te<w.mipmaps.length;Te++)ze(le.__webglFramebuffer[Ae][Te],X,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Te);else ze(le.__webglFramebuffer[Ae],X,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);p(w)&&D(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($e){for(let Ae=0,Te=Me.length;Ae<Te;Ae++){let Pe=Me[Ae],Ke=i.get(Pe),Oe=n.TEXTURE_2D;(X.isWebGL3DRenderTarget||X.isWebGLArrayRenderTarget)&&(Oe=X.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Oe,Ke.__webglTexture),fe(Oe,Pe),ze(le.__webglFramebuffer,X,Pe,n.COLOR_ATTACHMENT0+Ae,Oe,0),p(Pe)&&D(Oe)}t.unbindTexture()}else{let Ae=n.TEXTURE_2D;if((X.isWebGL3DRenderTarget||X.isWebGLArrayRenderTarget)&&(Ae=X.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,ve.__webglTexture),fe(Ae,w),w.mipmaps&&w.mipmaps.length>0)for(let Te=0;Te<w.mipmaps.length;Te++)ze(le.__webglFramebuffer[Te],X,w,n.COLOR_ATTACHMENT0,Ae,Te);else ze(le.__webglFramebuffer,X,w,n.COLOR_ATTACHMENT0,Ae,0);p(w)&&D(Ae),t.unbindTexture()}X.depthBuffer&&ut(X)}function je(X){let w=X.textures;for(let le=0,ve=w.length;le<ve;le++){let Me=w[le];if(p(Me)){let He=v(X),$e=i.get(Me).__webglTexture;t.bindTexture(He,$e),D(He),t.unbindTexture()}}}let xt=[],_t=[];function cn(X){if(X.samples>0){if($t(X)===!1){let w=X.textures,le=X.width,ve=X.height,Me=n.COLOR_BUFFER_BIT,He=X.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$e=i.get(X),Ae=w.length>1;if(Ae)for(let Pe=0;Pe<w.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,$e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,$e.__webglMultisampledFramebuffer);let Te=X.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,$e.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,$e.__webglFramebuffer);for(let Pe=0;Pe<w.length;Pe++){if(X.resolveDepthBuffer&&(X.depthBuffer&&(Me|=n.DEPTH_BUFFER_BIT),X.stencilBuffer&&X.resolveStencilBuffer&&(Me|=n.STENCIL_BUFFER_BIT)),Ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,$e.__webglColorRenderbuffer[Pe]);let Ke=i.get(w[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ke,0)}n.blitFramebuffer(0,0,le,ve,0,0,le,ve,Me,n.NEAREST),u===!0&&(xt.length=0,_t.length=0,xt.push(n.COLOR_ATTACHMENT0+Pe),X.depthBuffer&&X.storeMultisampledDepthBuffer===!1&&(xt.push(He),_t.push(He),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_t)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Ae)for(let Pe=0;Pe<w.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,$e.__webglColorRenderbuffer[Pe]);let Ke=i.get(w[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,$e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,Ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,$e.__webglMultisampledFramebuffer)}else if(X.depthBuffer&&X.storeMultisampledDepthBuffer===!1&&u){let w=X.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function Pt(X){return Math.min(r.maxSamples,X.samples)}function $t(X){let w=i.get(X);return X.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ae(X){let w=s.render.frame;d.get(X)!==w&&(d.set(X,w),X.update())}function hn(X,w){let le=X.colorSpace,ve=X.format,Me=X.type;return X.isCompressedTexture===!0||X.isVideoTexture===!0||le!==ll&&le!==Ha&&(An.getTransfer(le)===Xn?(ve!==Wr||Me!==Tr)&&an("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):sn("WebGLTextures: Unsupported texture color space:",le)),w}function qt(X){return typeof HTMLImageElement<"u"&&X instanceof HTMLImageElement?(l.width=X.naturalWidth||X.width,l.height=X.naturalHeight||X.height):typeof VideoFrame<"u"&&X instanceof VideoFrame?(l.width=X.displayWidth,l.height=X.displayHeight):(l.width=X.width,l.height=X.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=b,this.getTextureUnits=M,this.setTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=re,this.rebindTextures=wt,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=cn,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=$t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function hb(n,e){function t(i,r=Ha){let a,s=An.getTransfer(r);if(i===Tr)return n.UNSIGNED_BYTE;if(i===Du)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===df)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===hf)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===cf)return n.BYTE;if(i===uf)return n.SHORT;if(i===wo)return n.UNSIGNED_SHORT;if(i===Lu)return n.INT;if(i===na)return n.UNSIGNED_INT;if(i===Hr)return n.FLOAT;if(i===ia)return n.HALF_FLOAT;if(i===ff)return n.ALPHA;if(i===pf)return n.RGB;if(i===Wr)return n.RGBA;if(i===ya)return n.DEPTH_COMPONENT;if(i===fs)return n.DEPTH_STENCIL;if(i===Uu)return n.RED;if(i===Fu)return n.RED_INTEGER;if(i===ps)return n.RG;if(i===Ou)return n.RG_INTEGER;if(i===Bu)return n.RGBA_INTEGER;if(i===Bl||i===kl||i===zl||i===Vl)if(s===Xn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Bl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Bl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ku||i===zu||i===Vu||i===Gu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ku)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Hu||i===Wu||i===Xu||i===Yu||i===qu||i===Gl||i===Zu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Hu||i===Wu)return s===Xn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Xu)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Yu)return a.COMPRESSED_R11_EAC;if(i===qu)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Gl)return a.COMPRESSED_RG11_EAC;if(i===Zu)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ju||i===$u||i===Ku||i===Qu||i===ju||i===ed||i===td||i===nd||i===id||i===rd||i===ad||i===sd||i===od||i===ld)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ju)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$u)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ku)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qu)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ju)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ed)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===td)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nd)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===id)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===rd)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ad)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sd)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===od)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ld)return s===Xn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cd||i===ud||i===dd)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===cd)return s===Xn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ud)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hd||i===fd||i===Hl||i===pd)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===hd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===fd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===To?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var fb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pb=`
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

}`,zf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new xl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Or({vertexShader:fb,fragmentShader:pb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kn(new Al(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vf=class extends xa{constructor(e,t){super();let i=this,r=null,a=1,s=null,o="local-floor",u=1,l=null,d=null,h=null,f=null,m=null,x=null,T=typeof XRWebGLBinding<"u",g=new zf,p={},D=t.getContextAttributes(),v=null,y=null,C=[],N=[],O=new Dt,S=null,E=null,B=new tr;B.viewport=new hi;let F=new tr;F.viewport=new hi;let q=[B,F],b=new Tu,M=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let oe=C[ne];return oe===void 0&&(oe=new po,C[ne]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(ne){let oe=C[ne];return oe===void 0&&(oe=new po,C[ne]=oe),oe.getGripSpace()},this.getHand=function(ne){let oe=C[ne];return oe===void 0&&(oe=new po,C[ne]=oe),oe.getHandSpace()};function V(ne){let oe=N.indexOf(ne.inputSource);if(oe===-1)return;let Ue=C[oe];Ue!==void 0&&(Ue.update(ne.inputSource,ne.frame,l||s),Ue.dispatchEvent({type:ne.type,data:ne.inputSource}))}function Q(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",j);for(let ne=0;ne<C.length;ne++){let oe=N[ne];oe!==null&&(N[ne]=null,C[ne].disconnect(oe))}M=null,k=null,g.reset();for(let ne in p)delete p[ne];if(e.setRenderTarget(v),m=null,f=null,h=null,r=null,y=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(O.width,O.height,!1),E!==null){let ne=E.camera;ne.fov=E.fov,ne.zoom=E.zoom,ne.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){a=ne,i.isPresenting===!0&&an("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,i.isPresenting===!0&&an("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h===null&&T&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(ne){if(r=ne,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",j),D.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(O),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ue=null,Be=null,ze=null;D.depth&&(ze=D.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ue=D.stencil?fs:ya,Be=D.stencil?To:na);let ht={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:a};h=this.getBinding(),f=h.createProjectionLayer(ht),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new br(f.textureWidth,f.textureHeight,{format:Wr,type:Tr,depthTexture:new as(f.textureWidth,f.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,Ue),stencilBuffer:D.stencil,colorSpace:e.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Ue={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,t,Ue),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new br(m.framebufferWidth,m.framebufferHeight,{format:Wr,type:Tr,colorSpace:e.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(u),l=null,s=await r.requestReferenceSpace(o),Fe.setContext(r),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(ne){for(let oe=0;oe<ne.removed.length;oe++){let Ue=ne.removed[oe],Be=N.indexOf(Ue);Be>=0&&(N[Be]=null,C[Be].disconnect(Ue))}for(let oe=0;oe<ne.added.length;oe++){let Ue=ne.added[oe],Be=N.indexOf(Ue);if(Be===-1){for(let ht=0;ht<C.length;ht++)if(ht>=N.length){N.push(Ue),Be=ht;break}else if(N[ht]===null){N[ht]=Ue,Be=ht;break}if(Be===-1)break}let ze=C[Be];ze&&ze.connect(Ue)}}let W=new ge,Z=new ge;function re(ne,oe,Ue){W.setFromMatrixPosition(oe.matrixWorld),Z.setFromMatrixPosition(Ue.matrixWorld);let Be=W.distanceTo(Z),ze=oe.projectionMatrix.elements,ht=Ue.projectionMatrix.elements,Gt=ze[14]/(ze[10]-1),ut=ze[14]/(ze[10]+1),wt=(ze[9]+1)/ze[5],Zt=(ze[9]-1)/ze[5],je=(ze[8]-1)/ze[0],xt=(ht[8]+1)/ht[0],_t=Gt*je,cn=Gt*xt,Pt=Be/(-je+xt),$t=Pt*-je;if(oe.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX($t),ne.translateZ(Pt),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),ze[10]===-1)ne.projectionMatrix.copy(oe.projectionMatrix),ne.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{let ae=Gt+Pt,hn=ut+Pt,qt=_t-$t,X=cn+(Be-$t),w=wt*ut/hn*ae,le=Zt*ut/hn*ae;ne.projectionMatrix.makePerspective(qt,X,w,le,ae,hn),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function ye(ne,oe){oe===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(oe.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(r===null)return;let oe=ne.near,Ue=ne.far;g.texture!==null&&(g.depthNear>0&&(oe=g.depthNear),g.depthFar>0&&(Ue=g.depthFar)),b.near=F.near=B.near=oe,b.far=F.far=B.far=Ue,(M!==b.near||k!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),M=b.near,k=b.far),b.layers.mask=ne.layers.mask|6,B.layers.mask=b.layers.mask&-5,F.layers.mask=b.layers.mask&-3;let Be=ne.parent,ze=b.cameras;ye(b,Be);for(let ht=0;ht<ze.length;ht++)ye(ze[ht],Be);ze.length===2?re(b,B,F):b.projectionMatrix.copy(B.projectionMatrix),E===null&&ne.isPerspectiveCamera&&(E={camera:ne,fov:ne.fov,zoom:ne.zoom}),Se(ne,b,Be)};function Se(ne,oe,Ue){Ue===null?ne.matrix.copy(oe.matrixWorld):(ne.matrix.copy(Ue.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(oe.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(oe.projectionMatrix),ne.projectionMatrixInverse.copy(oe.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=jc*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&m===null))return u},this.setFoveation=function(ne){u=ne,f!==null&&(f.fixedFoveation=ne),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ne)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(b)},this.getCameraTexture=function(ne){return p[ne]};let ue=null;function fe(ne,oe){if(d=oe.getViewerPose(l||s),x=oe,d!==null){let Ue=d.views;m!==null&&(e.setRenderTargetFramebuffer(y,m.framebuffer),e.setRenderTarget(y));let Be=!1;Ue.length!==b.cameras.length&&(b.cameras.length=0,Be=!0);for(let ut=0;ut<Ue.length;ut++){let wt=Ue[ut],Zt=null;if(m!==null)Zt=m.getViewport(wt);else{let xt=h.getViewSubImage(f,wt);Zt=xt.viewport,ut===0&&(e.setRenderTargetTextures(y,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(y))}let je=q[ut];je===void 0&&(je=new tr,je.layers.enable(ut),je.viewport=new hi,q[ut]=je),je.matrix.fromArray(wt.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(wt.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),ut===0&&(b.matrix.copy(je.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Be===!0&&b.cameras.push(je)}let ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){h=i.getBinding();let ut=h.getDepthInformation(Ue[0]);ut&&ut.isValid&&ut.texture&&g.init(ut,r.renderState)}if(ze&&ze.includes("camera-access")&&T){e.state.unbindTexture(),h=i.getBinding();for(let ut=0;ut<Ue.length;ut++){let wt=Ue[ut].camera;if(wt){let Zt=p[wt];Zt||(Zt=new xl,p[wt]=Zt);let je=h.getCameraImage(wt);Zt.sourceTexture=je}}}}for(let Ue=0;Ue<C.length;Ue++){let Be=N[Ue],ze=C[Ue];Be!==null&&ze!==void 0&&ze.update(Be,oe,l||s)}ue&&ue(ne,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),x=null}let Fe=new X0;Fe.setAnimationLoop(fe),this.setAnimationLoop=function(ne){ue=ne},this.dispose=function(){}}},mb=new Yn,K0=new un;K0.set(-1,0,0,0,1,0,0,0,1);function vb(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,yf(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,D,v,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(g,p):p.isMeshLambertMaterial?(a(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(g,p),h(g,p)):p.isMeshPhongMaterial?(a(g,p),d(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(g,p),f(g,p),p.isMeshPhysicalMaterial&&m(g,p,y)):p.isMeshMatcapMaterial?(a(g,p),x(g,p)):p.isMeshDepthMaterial?a(g,p):p.isMeshDistanceMaterial?(a(g,p),T(g,p)):p.isMeshNormalMaterial?a(g,p):p.isLineBasicMaterial?(s(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?u(g,p,D,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===mr&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===mr&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let D=e.get(p),v=D.envMap,y=D.envMapRotation;v&&(g.envMap.value=v,g.envMapRotation.value.setFromMatrix4(mb.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(K0),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function s(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function u(g,p,D,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*D,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,D){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===mr&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=D.texture,g.transmissionSamplerSize.value.set(D.width,D.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function T(g,p){let D=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(D.matrixWorld),g.nearDistance.value=D.shadow.camera.near,g.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function gb(n,e,t,i){let r={},a={},s=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(y,C){let N=C.program;i.uniformBlockBinding(y,N)}function l(y,C){let N=r[y.id];N===void 0&&(g(y),N=d(y),r[y.id]=N,y.addEventListener("dispose",D));let O=C.program;i.updateUBOMapping(y,O);let S=e.render.frame;a[y.id]!==S&&(f(y),a[y.id]=S)}function d(y){let C=h();y.__bindingPointIndex=C;let N=n.createBuffer(),O=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,N),n.bufferData(n.UNIFORM_BUFFER,O,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,C,N),N}function h(){for(let y=0;y<o;y++)if(s.indexOf(y)===-1)return s.push(y),y;return sn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let C=r[y.id],N=y.uniforms,O=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,C);for(let S=0,E=N.length;S<E;S++){let B=N[S];if(Array.isArray(B))for(let F=0,q=B.length;F<q;F++)m(B[F],S,F,O);else m(B,S,0,O)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(y,C,N,O){if(T(y,C,N,O)===!0){let S=y.__offset,E=y.value;if(Array.isArray(E)){let B=0;for(let F=0;F<E.length;F++){let q=E[F],b=p(q);x(q,y.__data,B),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(B+=b.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,y.__data)}}function x(y,C,N){typeof y=="number"||typeof y=="boolean"?C[0]=y:y.isMatrix3?(C[0]=y.elements[0],C[1]=y.elements[1],C[2]=y.elements[2],C[3]=0,C[4]=y.elements[3],C[5]=y.elements[4],C[6]=y.elements[5],C[7]=0,C[8]=y.elements[6],C[9]=y.elements[7],C[10]=y.elements[8],C[11]=0):ArrayBuffer.isView(y)?C.set(new y.constructor(y.buffer,y.byteOffset,C.length)):y.toArray(C,N)}function T(y,C,N,O){let S=y.value,E=C+"_"+N;if(O[E]===void 0)return typeof S=="number"||typeof S=="boolean"?O[E]=S:ArrayBuffer.isView(S)?O[E]=S.slice():O[E]=S.clone(),!0;{let B=O[E];if(typeof S=="number"||typeof S=="boolean"){if(B!==S)return O[E]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(B.equals(S)===!1)return B.copy(S),!0}}return!1}function g(y){let C=y.uniforms,N=0,O=16;for(let E=0,B=C.length;E<B;E++){let F=Array.isArray(C[E])?C[E]:[C[E]];for(let q=0,b=F.length;q<b;q++){let M=F[q],k=Array.isArray(M.value)?M.value:[M.value];for(let V=0,Q=k.length;V<Q;V++){let j=k[V],W=p(j),Z=N%O,re=Z%W.boundary,ye=Z+re;N+=re,ye!==0&&O-ye<W.storage&&(N+=O-ye),M.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=N,N+=W.storage}}}let S=N%O;return S>0&&(N+=O-S),y.__size=N,y.__cache={},this}function p(y){let C={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(C.boundary=4,C.storage=4):y.isVector2?(C.boundary=8,C.storage=8):y.isVector3||y.isColor?(C.boundary=16,C.storage=12):y.isVector4?(C.boundary=16,C.storage=16):y.isMatrix3?(C.boundary=48,C.storage=48):y.isMatrix4?(C.boundary=64,C.storage=64):y.isTexture?an("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(C.boundary=16,C.storage=y.byteLength):an("WebGLRenderer: Unsupported uniform value type.",y),C}function D(y){let C=y.target;C.removeEventListener("dispose",D);let N=s.indexOf(C.__bindingPointIndex);s.splice(N,1),n.deleteBuffer(r[C.id]),delete r[C.id],delete a[C.id]}function v(){for(let y in r)n.deleteBuffer(r[y]);s=[],r={},a={}}return{bind:u,update:l,dispose:v}}var yb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ta=null;function xb(){return Ta===null&&(Ta=new vl(yb,16,16,ps,ia),Ta.name="DFG_LUT",Ta.minFilter=Wi,Ta.magFilter=Wi,Ta.wrapS=ga,Ta.wrapT=ga,Ta.generateMipmaps=!1,Ta.needsUpdate=!0),Ta}var Sd=class{constructor(e={}){let{canvas:t=h0(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:m=Tr}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=s;let T=m,g=new Set([Bu,Ou,Fu]),p=new Set([Tr,na,wo,To,Du,Nu]),D=new Uint32Array(4),v=new Int32Array(4),y=new ge,C=null,N=null,O=[],S=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ta,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,F=!1,q=null,b=null,M=null,k=null;this._outputColorSpace=pr;let V=0,Q=0,j=null,W=-1,Z=null,re=new hi,ye=new hi,Se=null,ue=new mn(0),fe=0,Fe=t.width,ne=t.height,oe=1,Ue=null,Be=null,ze=new hi(0,0,Fe,ne),ht=new hi(0,0,Fe,ne),Gt=!1,ut=new mo,wt=!1,Zt=!1,je=new Yn,xt=new ge,_t=new hi,cn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pt=!1;function $t(){return j===null?oe:1}let ae=i;function hn(I,se){return t.getContext(I,se)}let qt,X,w,le,ve,Me,He,$e,Ae,Te,Pe,Ke,Oe,Ge,De,lt,et,ie,Ze,Re,tt,ot,ke;try{let I={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:u,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Kt,!1),t.addEventListener("webglcontextrestored",Qt,!1),t.addEventListener("webglcontextcreationerror",Bn,!1),ae===null){let se="webgl2";if(ae=hn(se,I),ae===null)throw hn(se)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Rt()}catch(I){throw t.removeEventListener("webglcontextlost",Kt,!1),t.removeEventListener("webglcontextrestored",Qt,!1),t.removeEventListener("webglcontextcreationerror",Bn,!1),sn("WebGLRenderer: "+I.message),I}function Rt(){qt=new EM(ae),qt.init(),tt=new hb(ae,qt),X=new vM(ae,qt,e,tt),w=new ub(ae,qt),X.reversedDepthBuffer&&f&&w.buffers.depth.setReversed(!0),b=ae.createFramebuffer(),M=ae.createFramebuffer(),k=ae.createFramebuffer(),le=new CM(ae),ve=new $S,Me=new db(ae,qt,w,ve,X,tt,le),He=new TM(B),$e=new Py(ae),ot=new pM(ae,$e),Ae=new AM(ae,$e,le,ot),Te=new PM(ae,Ae,$e,ot,le),ie=new RM(ae,X,Me),De=new gM(ve),Pe=new JS(B,He,qt,X,ot,De),Ke=new vb(B,ve),Oe=new QS,Ge=new rb(qt),et=new fM(B,He,w,Te,x,u),lt=new cb(B,Te,X),ke=new gb(ae,le,X,w),Ze=new mM(ae,qt,le),Re=new IM(ae,qt,le),le.programs=Pe.programs,B.capabilities=X,B.extensions=qt,B.properties=ve,B.renderLists=Oe,B.shadowMap=lt,B.state=w,B.info=le}T!==Tr&&(E=new DM(T,t.width,t.height,o,r,a));let ft=new Vf(B,ae);this.xr=ft,this.getContext=function(){return ae},this.getContextAttributes=function(){return ae.getContextAttributes()},this.forceContextLoss=function(){let I=qt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=qt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(I){I!==void 0&&(oe=I,this.setSize(Fe,ne,!1))},this.getSize=function(I){return I.set(Fe,ne)},this.setSize=function(I,se,be=!0){if(ft.isPresenting){an("WebGLRenderer: Can't change size while VR device is presenting.");return}Fe=I,ne=se,t.width=Math.floor(I*oe),t.height=Math.floor(se*oe),be===!0&&(t.style.width=I+"px",t.style.height=se+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,I,se)},this.getDrawingBufferSize=function(I){return I.set(Fe*oe,ne*oe).floor()},this.setDrawingBufferSize=function(I,se,be){Fe=I,ne=se,oe=be,t.width=Math.floor(I*be),t.height=Math.floor(se*be),this.setViewport(0,0,I,se)},this.setEffects=function(I){if(T===Tr){sn("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(I){for(let se=0;se<I.length;se++)if(I[se].isOutputPass===!0){an("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(I||[])},this.getCurrentViewport=function(I){return I.copy(re)},this.getViewport=function(I){return I.copy(ze)},this.setViewport=function(I,se,be,pe){I.isVector4?ze.set(I.x,I.y,I.z,I.w):ze.set(I,se,be,pe),w.viewport(re.copy(ze).multiplyScalar(oe).round())},this.getScissor=function(I){return I.copy(ht)},this.setScissor=function(I,se,be,pe){I.isVector4?ht.set(I.x,I.y,I.z,I.w):ht.set(I,se,be,pe),w.scissor(ye.copy(ht).multiplyScalar(oe).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(I){w.setScissorTest(Gt=I)},this.setOpaqueSort=function(I){Ue=I},this.setTransparentSort=function(I){Be=I},this.getClearColor=function(I){return I.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(I=!0,se=!0,be=!0){let pe=0;if(I){let xe=!1;if(j!==null){let Je=j.texture.format;xe=g.has(Je)}if(xe){let Je=j.texture.type,We=p.has(Je),Ve=et.getClearColor(),Tt=et.getClearAlpha(),Et=Ve.r,ln=Ve.g,dn=Ve.b;We?(D[0]=Et,D[1]=ln,D[2]=dn,D[3]=Tt,ae.clearBufferuiv(ae.COLOR,0,D)):(v[0]=Et,v[1]=ln,v[2]=dn,v[3]=Tt,ae.clearBufferiv(ae.COLOR,0,v))}else pe|=ae.COLOR_BUFFER_BIT}se&&(pe|=ae.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),be&&(pe|=ae.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),pe!==0&&ae.clear(pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(I){I.setRenderer(this),q=I},this.dispose=function(){t.removeEventListener("webglcontextlost",Kt,!1),t.removeEventListener("webglcontextrestored",Qt,!1),t.removeEventListener("webglcontextcreationerror",Bn,!1),et.dispose(),Oe.dispose(),Ge.dispose(),ve.dispose(),He.dispose(),Te.dispose(),ot.dispose(),ke.dispose(),Pe.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",tn),ft.removeEventListener("sessionend",vt),In.stop()};function Kt(I){I.preventDefault(),vf("WebGLRenderer: Context Lost."),F=!0}function Qt(){vf("WebGLRenderer: Context Restored."),F=!1;let I=le.autoReset,se=lt.enabled,be=lt.autoUpdate,pe=lt.needsUpdate,xe=lt.type;Rt(),le.autoReset=I,lt.enabled=se,lt.autoUpdate=be,lt.needsUpdate=pe,lt.type=xe}function Bn(I){sn("WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function ei(I){let se=I.target;se.removeEventListener("dispose",ei),bn(se)}function bn(I){qn(I),ve.remove(I)}function qn(I){let se=ve.get(I).programs;se!==void 0&&(se.forEach(function(be){Pe.releaseProgram(be)}),I.isShaderMaterial&&Pe.releaseShaderCache(I))}this.renderBufferDirect=function(I,se,be,pe,xe,Je){se===null&&(se=cn);let We=xe.isMesh&&xe.matrixWorld.determinantAffine()<0,Ve=qi(I,se,be,pe,xe);w.setMaterial(pe,We);let Tt=be.index,Et=1;if(pe.wireframe===!0){if(Tt=Ae.getWireframeAttribute(be),Tt===void 0)return;Et=2}let ln=be.drawRange,dn=be.attributes.position,gt=ln.start*Et,ct=(ln.start+ln.count)*Et;Je!==null&&(gt=Math.max(gt,Je.start*Et),ct=Math.min(ct,(Je.start+Je.count)*Et)),Tt!==null?(gt=Math.max(gt,0),ct=Math.min(ct,Tt.count)):dn!=null&&(gt=Math.max(gt,0),ct=Math.min(ct,dn.count));let pn=ct-gt;if(pn<0||pn===1/0)return;ot.setup(xe,pe,Ve,be,Tt);let Ht,nt=Ze;if(Tt!==null&&(Ht=$e.get(Tt),nt=Re,nt.setIndex(Ht)),xe.isMesh)pe.wireframe===!0?(w.setLineWidth(pe.wireframeLinewidth*$t()),nt.setMode(ae.LINES)):nt.setMode(ae.TRIANGLES);else if(xe.isLine){let yn=pe.linewidth;yn===void 0&&(yn=1),w.setLineWidth(yn*$t()),xe.isLineSegments?nt.setMode(ae.LINES):xe.isLineLoop?nt.setMode(ae.LINE_LOOP):nt.setMode(ae.LINE_STRIP)}else xe.isPoints?nt.setMode(ae.POINTS):xe.isSprite&&nt.setMode(ae.TRIANGLES);if(xe.isBatchedMesh)if(qt.get("WEBGL_multi_draw"))nt.renderMultiDraw(xe._multiDrawStarts,xe._multiDrawCounts,xe._multiDrawCount);else{let yn=xe._multiDrawStarts,yt=xe._multiDrawCounts,Ti=xe._multiDrawCount,fn=Tt?$e.get(Tt).bytesPerElement:1,gi=ve.get(pe).currentProgram.getUniforms();for(let Ji=0;Ji<Ti;Ji++)gi.setValue(ae,"_gl_DrawID",Ji),nt.render(yn[Ji]/fn,yt[Ji])}else if(xe.isInstancedMesh)nt.renderInstances(gt,pn,xe.count);else if(be.isInstancedBufferGeometry){let yn=be._maxInstanceCount!==void 0?be._maxInstanceCount:1/0,yt=Math.min(be.instanceCount,yn);nt.renderInstances(gt,pn,yt)}else nt.render(gt,pn)};function Mi(I,se,be,pe){q!==null&&I.isNodeMaterial&&q.setObject(pe,I),wt===!0&&De.setState(I,be,!1),I.transparent===!0&&I.side===wr&&I.forceSinglePass===!1?(I.side=mr,I.needsUpdate=!0,ar(I,se,pe),I.side=us,I.needsUpdate=!0,ar(I,se,pe),I.side=wr):ar(I,se,pe)}this.compile=function(I,se,be=null){be===null&&(be=I),q!==null&&q.renderStart(I,se,be),N=Ge.get(be),N.init(se),S.push(N),be.traverseVisible(function(xe){xe.isLight&&xe.layers.test(se.layers)&&(N.pushLight(xe),xe.castShadow&&N.pushShadow(xe))}),I!==be&&I.traverseVisible(function(xe){xe.isLight&&xe.layers.test(se.layers)&&(N.pushLight(xe),xe.castShadow&&N.pushShadow(xe))}),N.setupLights(),q!==null&&q.updateLights(N.state.lightsArray),Zt=this.localClippingEnabled,wt=De.init(this.clippingPlanes,Zt),wt===!0&&De.setGlobalState(this.clippingPlanes,se),q!==null&&lt.render(N.state.shadowsArray,be,se);let pe=new Set;return I.traverse(function(xe){if(!(xe.isMesh||xe.isPoints||xe.isLine||xe.isSprite))return;let Je=xe.material;if(Je)if(Array.isArray(Je))for(let We=0;We<Je.length;We++){let Ve=Je[We];Mi(Ve,be,se,xe),pe.add(Ve)}else Mi(Je,be,se,xe),pe.add(Je)}),N=S.pop(),q!==null&&q.renderEnd(),pe},this.compileAsync=function(I,se,be=null){let pe=this.compile(I,se,be);return new Promise(xe=>{function Je(){if(pe.forEach(function(We){let Tt=ve.get(We).currentProgram;(Tt===void 0||Tt.isReady())&&pe.delete(We)}),pe.size===0){xe(I);return}setTimeout(Je,10)}qt.get("KHR_parallel_shader_compile")!==null?Je():setTimeout(Je,10)})};let Si=null;function ni(I){Si&&Si(I)}function tn(){In.stop()}function vt(){In.start()}let In=new X0;In.setAnimationLoop(ni),typeof self<"u"&&In.setContext(self),this.setAnimationLoop=function(I){Si=I,ft.setAnimationLoop(I),I===null?In.stop():In.start()},ft.addEventListener("sessionstart",tn),ft.addEventListener("sessionend",vt),this.render=function(I,se){if(se!==void 0&&se.isCamera!==!0){sn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;q!==null&&q.renderStart(I,se);let be=ft.enabled===!0&&ft.isPresenting===!0,pe=E!==null&&(j===null||be)&&E.begin(B,j);if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),se.parent===null&&se.matrixWorldAutoUpdate===!0&&se.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(se),se=ft.getCamera()),I.isScene===!0&&I.onBeforeRender(B,I,se,j),N=Ge.get(I,S.length),N.init(se),N.state.textureUnits=Me.getTextureUnits(),S.push(N),je.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),ut.setFromProjectionMatrix(je,ea,se.reversedDepth),Zt=this.localClippingEnabled,wt=De.init(this.clippingPlanes,Zt),C=Oe.get(I,O.length),C.init(),O.push(C),ft.enabled===!0&&ft.isPresenting===!0){let We=B.xr.getDepthSensingMesh();We!==null&&gn(We,se,-1/0,B.sortObjects)}gn(I,se,0,B.sortObjects),C.finish(),q!==null&&q.updateLights(N.state.lightsArray),B.sortObjects===!0&&C.sort(Ue,Be),Pt=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,Pt&&et.addToRenderList(C,I),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),wt===!0&&De.beginShadows();let xe=N.state.shadowsArray;if(lt.render(xe,I,se),wt===!0&&De.endShadows(),(pe&&E.hasRenderPass())===!1){let We=C.opaque,Ve=C.transmissive;if(N.setupLights(),se.isArrayCamera){let Tt=se.cameras;if(Ve.length>0)for(let Et=0,ln=Tt.length;Et<ln;Et++){let dn=Tt[Et];Er(We,Ve,I,dn)}Pt&&et.render(I);for(let Et=0,ln=Tt.length;Et<ln;Et++){let dn=Tt[Et];Di(C,I,dn,dn.viewport)}}else Ve.length>0&&Er(We,Ve,I,se),Pt&&et.render(I),Di(C,I,se)}j!==null&&Q===0&&(Me.updateMultisampleRenderTarget(j),Me.updateRenderTargetMipmap(j)),pe&&E.end(B),I.isScene===!0&&I.onAfterRender(B,I,se),ot.resetDefaultState(),W=-1,Z=null,S.pop(),S.length>0?(N=S[S.length-1],Me.setTextureUnits(N.state.textureUnits),wt===!0&&De.setGlobalState(B.clippingPlanes,N.state.camera)):N=null,O.pop(),O.length>0?C=O[O.length-1]:C=null,q!==null&&q.renderEnd()};function gn(I,se,be,pe){if(I.visible===!1)return;if(I.layers.test(se.layers)){if(I.isGroup)be=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(se);else if(I.isLightProbeGrid)N.pushLightProbeGrid(I);else if(I.isLight)N.pushLight(I),I.castShadow&&N.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||I.intersectsFrustum(ut)){pe&&_t.setFromMatrixPosition(I.matrixWorld).applyMatrix4(je);let We=Te.update(I),Ve=I.material;Ve.visible&&C.push(I,We,Ve,be,_t.z,null,se)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||I.intersectsFrustum(ut))){let We=Te.update(I),Ve=I.material;if(pe&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),_t.copy(I.boundingSphere.center)):(We.boundingSphere===null&&We.computeBoundingSphere(),_t.copy(We.boundingSphere.center)),_t.applyMatrix4(I.matrixWorld).applyMatrix4(je)),Array.isArray(Ve)){let Tt=We.groups;for(let Et=0,ln=Tt.length;Et<ln;Et++){let dn=Tt[Et],gt=Ve[dn.materialIndex];gt&&gt.visible&&C.push(I,We,gt,be,_t.z,dn,se)}}else Ve.visible&&C.push(I,We,Ve,be,_t.z,null,se)}}let Je=I.children;for(let We=0,Ve=Je.length;We<Ve;We++)gn(Je[We],se,be,pe)}function Di(I,se,be,pe){let{opaque:xe,transmissive:Je,transparent:We}=I;N.setupLightsView(be),wt===!0&&De.setGlobalState(B.clippingPlanes,be),pe&&w.viewport(re.copy(pe)),xe.length>0&&Tn(xe,se,be),Je.length>0&&Tn(Je,se,be),We.length>0&&Tn(We,se,be),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Er(I,se,be,pe){if((be.isScene===!0?be.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[pe.id]===void 0){let gt=qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[pe.id]=new br(1,1,{generateMipmaps:!0,type:gt?ia:Tr,minFilter:hs,samples:Math.max(4,X.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:An.workingColorSpace})}let Je=N.state.transmissionRenderTarget[pe.id],We=pe.viewport||re;Je.setSize(We.z*B.transmissionResolutionScale,We.w*B.transmissionResolutionScale);let Ve=B.getRenderTarget(),Tt=B.getActiveCubeFace(),Et=B.getActiveMipmapLevel();B.setRenderTarget(Je),B.getClearColor(ue),fe=B.getClearAlpha(),fe<1&&B.setClearColor(16777215,.5),B.clear(),Pt&&et.render(be);let ln=B.toneMapping;B.toneMapping=ta;let dn=pe.viewport;if(pe.viewport!==void 0&&(pe.viewport=void 0),N.setupLightsView(pe),wt===!0&&De.setGlobalState(B.clippingPlanes,pe),Tn(I,be,pe),Me.updateMultisampleRenderTarget(Je),Me.updateRenderTargetMipmap(Je),qt.has("WEBGL_multisampled_render_to_texture")===!1){let gt=!1;for(let ct=0,pn=se.length;ct<pn;ct++){let Ht=se[ct],{object:nt,geometry:yn,material:yt,group:Ti}=Ht;if(yt.side===wr&&nt.layers.test(pe.layers)){let fn=yt.side;yt.side=mr,yt.needsUpdate=!0,ai(nt,be,pe,yn,yt,Ti),yt.side=fn,yt.needsUpdate=!0,gt=!0}}gt===!0&&(Me.updateMultisampleRenderTarget(Je),Me.updateRenderTargetMipmap(Je))}B.setRenderTarget(Ve,Tt,Et),B.setClearColor(ue,fe),dn!==void 0&&(pe.viewport=dn),B.toneMapping=ln}function Tn(I,se,be){let pe=se.isScene===!0?se.overrideMaterial:null;for(let xe=0,Je=I.length;xe<Je;xe++){let We=I[xe],{object:Ve,geometry:Tt,group:Et}=We,ln=We.material;ln.allowOverride===!0&&pe!==null&&(ln=pe),Ve.layers.test(be.layers)&&ai(Ve,se,be,Tt,ln,Et)}}function ai(I,se,be,pe,xe,Je){q!==null&&xe.isNodeMaterial&&q.setObject(I,xe),I.onBeforeRender(B,se,be,pe,xe,Je),I.modelViewMatrix.multiplyMatrices(be.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),xe.onBeforeRender(B,se,be,pe,I,Je),xe.transparent===!0&&xe.side===wr&&xe.forceSinglePass===!1?(xe.side=mr,xe.needsUpdate=!0,B.renderBufferDirect(be,se,pe,xe,I,Je),xe.side=us,xe.needsUpdate=!0,B.renderBufferDirect(be,se,pe,xe,I,Je),xe.side=wr):B.renderBufferDirect(be,se,pe,xe,I,Je),I.onAfterRender(B,se,be,pe,xe,Je)}function ar(I,se,be){se.isScene!==!0&&(se=cn);let pe=ve.get(I),xe=N.state.lights,Je=N.state.shadowsArray,We=xe.state.version,Ve=Pe.getParameters(I,xe.state,Je,se,be,N.state.lightProbeGridArray),Tt=Pe.getProgramCacheKey(Ve),Et=pe.programs;pe.environment=I.isMeshStandardMaterial||I.isMeshLambertMaterial||I.isMeshPhongMaterial?se.environment:null,pe.fog=se.fog;let ln=I.isMeshStandardMaterial||I.isMeshLambertMaterial&&!I.envMap||I.isMeshPhongMaterial&&!I.envMap;pe.envMap=He.get(I.envMap||pe.environment,ln),pe.envMapRotation=pe.environment!==null&&I.envMap===null?se.environmentRotation:I.envMapRotation,Et===void 0&&(I.addEventListener("dispose",ei),Et=new Map,pe.programs=Et);let dn=Et.get(Tt);if(dn!==void 0){if(pe.currentProgram===dn&&pe.lightsStateVersion===We)return Ai(I,Ve),dn}else Ve.uniforms=Pe.getUniforms(I),q!==null&&I.isNodeMaterial&&q.build(I,be,Ve),I.onBeforeCompile(Ve,B),dn=Pe.acquireProgram(Ve,Tt),Et.set(Tt,dn),pe.uniforms=Ve.uniforms;let gt=pe.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(gt.clippingPlanes=De.uniform),Ai(I,Ve),pe.needsLights=aa(I),pe.lightsStateVersion=We,pe.needsLights&&(gt.ambientLightColor.value=xe.state.ambient,gt.lightProbe.value=xe.state.probe,gt.sunLights.value=xe.state.sun,gt.sunLightShadows.value=xe.state.sunShadow,gt.directionalLights.value=xe.state.directional,gt.directionalLightShadows.value=xe.state.directionalShadow,gt.spotLights.value=xe.state.spot,gt.spotLightShadows.value=xe.state.spotShadow,gt.rectAreaLights.value=xe.state.rectArea,gt.ltc_1.value=xe.state.rectAreaLTC1,gt.ltc_2.value=xe.state.rectAreaLTC2,gt.pointLights.value=xe.state.point,gt.pointLightShadows.value=xe.state.pointShadow,gt.hemisphereLights.value=xe.state.hemi,gt.sunShadowMatrix.value=xe.state.sunShadowMatrix,gt.sunShadowCascade.value=xe.state.sunShadowCascade,gt.directionalShadowMatrix.value=xe.state.directionalShadowMatrix,gt.spotLightMatrix.value=xe.state.spotLightMatrix,gt.spotLightMap.value=xe.state.spotLightMap,gt.pointShadowMatrix.value=xe.state.pointShadowMatrix),pe.lightProbeGrid=N.state.lightProbeGridArray.length>0,pe.currentProgram=dn,pe.uniformsList=null,dn}function Ar(I){if(I.uniformsList===null){let se=I.currentProgram.getUniforms();I.uniformsList=Co.seqWithValue(se.seq,I.uniforms)}return I.uniformsList}function Ai(I,se){let be=ve.get(I);be.outputColorSpace=se.outputColorSpace,be.batching=se.batching,be.batchingColor=se.batchingColor,be.instancing=se.instancing,be.instancingColor=se.instancingColor,be.instancingMorph=se.instancingMorph,be.skinning=se.skinning,be.morphTargets=se.morphTargets,be.morphNormals=se.morphNormals,be.morphColors=se.morphColors,be.morphTargetsCount=se.morphTargetsCount,be.numClippingPlanes=se.numClippingPlanes,be.numIntersection=se.numClipIntersection,be.vertexAlphas=se.vertexAlphas,be.vertexTangents=se.vertexTangents,be.toneMapping=se.toneMapping}function ra(I,se){if(I.length===0)return null;if(I.length===1)return I[0].texture!==null?I[0]:null;y.setFromMatrixPosition(se.matrixWorld);for(let be=0,pe=I.length;be<pe;be++){let xe=I[be];if(xe.texture!==null&&xe.boundingBox.containsPoint(y))return xe}return null}function qi(I,se,be,pe,xe){se.isScene!==!0&&(se=cn),Me.resetTextureUnits();let Je=se.fog,We=pe.isMeshStandardMaterial||pe.isMeshLambertMaterial||pe.isMeshPhongMaterial?se.environment:null,Ve=j===null?B.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:An.workingColorSpace,Tt=pe.isMeshStandardMaterial||pe.isMeshLambertMaterial&&!pe.envMap||pe.isMeshPhongMaterial&&!pe.envMap,Et=He.get(pe.envMap||We,Tt),ln=pe.vertexColors===!0&&!!be.attributes.color&&be.attributes.color.itemSize===4,dn=!!be.attributes.tangent&&(!!pe.normalMap||pe.anisotropy>0),gt=!!be.morphAttributes.position,ct=!!be.morphAttributes.normal,pn=!!be.morphAttributes.color,Ht=ta;pe.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ht=B.toneMapping);let nt=be.morphAttributes.position||be.morphAttributes.normal||be.morphAttributes.color,yn=nt!==void 0?nt.length:0,yt=ve.get(pe),Ti=N.state.lights;if(wt===!0&&(Zt===!0||I!==Z)){let Vn=I===Z&&pe.id===W;De.setState(pe,I,Vn)}let fn=!1;pe.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Ti.state.version||yt.outputColorSpace!==Ve||xe.isBatchedMesh&&yt.batching===!1||!xe.isBatchedMesh&&yt.batching===!0||xe.isBatchedMesh&&yt.batchingColor===!0&&xe._colorsTexture===null||xe.isBatchedMesh&&yt.batchingColor===!1&&xe._colorsTexture!==null||xe.isInstancedMesh&&yt.instancing===!1||!xe.isInstancedMesh&&yt.instancing===!0||xe.isSkinnedMesh&&yt.skinning===!1||!xe.isSkinnedMesh&&yt.skinning===!0||xe.isInstancedMesh&&yt.instancingColor===!0&&xe.instanceColor===null||xe.isInstancedMesh&&yt.instancingColor===!1&&xe.instanceColor!==null||xe.isInstancedMesh&&yt.instancingMorph===!0&&xe.morphTexture===null||xe.isInstancedMesh&&yt.instancingMorph===!1&&xe.morphTexture!==null||yt.envMap!==Et||pe.fog===!0&&yt.fog!==Je||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==De.numPlanes||yt.numIntersection!==De.numIntersection)||yt.vertexAlphas!==ln||yt.vertexTangents!==dn||yt.morphTargets!==gt||yt.morphNormals!==ct||yt.morphColors!==pn||yt.toneMapping!==Ht||yt.morphTargetsCount!==yn||!!yt.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(fn=!0):(fn=!0,yt.__version=pe.version);let gi=yt.currentProgram;fn===!0&&(gi=ar(pe,se,xe),q&&pe.isNodeMaterial&&q.onUpdateProgram(pe,gi,yt));let Ji=!1,Ni=!1,or=!1,xn=gi.getUniforms(),Zn=yt.uniforms;if(w.useProgram(gi.program)&&(Ji=!0,Ni=!0,or=!0),pe.id!==W&&(W=pe.id,Ni=!0),yt.needsLights){let Vn=ra(N.state.lightProbeGridArray,xe);yt.lightProbeGrid!==Vn&&(yt.lightProbeGrid=Vn,Ni=!0)}if(Ji||Z!==I){w.buffers.depth.getReversed()&&I.reversedDepth!==!0&&(I._reversedDepth=!0,I.updateProjectionMatrix()),xn.setValue(ae,"projectionMatrix",I.projectionMatrix),xn.setValue(ae,"viewMatrix",I.matrixWorldInverse);let bi=xn.map.cameraPosition;bi!==void 0&&bi.setValue(ae,xt.setFromMatrixPosition(I.matrixWorld)),X.logarithmicDepthBuffer&&xn.setValue(ae,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(pe.isMeshPhongMaterial||pe.isMeshToonMaterial||pe.isMeshLambertMaterial||pe.isMeshBasicMaterial||pe.isMeshStandardMaterial||pe.isShaderMaterial)&&xn.setValue(ae,"isOrthographic",I.isOrthographicCamera===!0),Z!==I&&(Z=I,Ni=!0,or=!0)}if(yt.needsLights&&(Ti.state.sunShadowMap.length>0&&xn.setValue(ae,"sunShadowMap",Ti.state.sunShadowMap,Me),Ti.state.directionalShadowMap.length>0&&xn.setValue(ae,"directionalShadowMap",Ti.state.directionalShadowMap,Me),Ti.state.spotShadowMap.length>0&&xn.setValue(ae,"spotShadowMap",Ti.state.spotShadowMap,Me),Ti.state.pointShadowMap.length>0&&xn.setValue(ae,"pointShadowMap",Ti.state.pointShadowMap,Me)),xe.isSkinnedMesh){xn.setOptional(ae,xe,"bindMatrix"),xn.setOptional(ae,xe,"bindMatrixInverse");let Vn=xe.skeleton;Vn&&(Vn.boneTexture===null&&Vn.computeBoneTexture(),xn.setValue(ae,"boneTexture",Vn.boneTexture,Me))}xe.isBatchedMesh&&(xn.setOptional(ae,xe,"batchingTexture"),xn.setValue(ae,"batchingTexture",xe._matricesTexture,Me),xn.setOptional(ae,xe,"batchingIdTexture"),xn.setValue(ae,"batchingIdTexture",xe._indirectTexture,Me),xn.setOptional(ae,xe,"batchingColorTexture"),xe._colorsTexture!==null&&xn.setValue(ae,"batchingColorTexture",xe._colorsTexture,Me));let Ui=be.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0)&&ie.update(xe,be,gi),(Ni||yt.receiveShadow!==xe.receiveShadow)&&(yt.receiveShadow=xe.receiveShadow,xn.setValue(ae,"receiveShadow",xe.receiveShadow)),(pe.isMeshStandardMaterial||pe.isMeshLambertMaterial||pe.isMeshPhongMaterial)&&pe.envMap===null&&se.environment!==null&&(Zn.envMapIntensity.value=se.environmentIntensity),Zn.dfgLUT!==void 0&&(Zn.dfgLUT.value=xb()),Ni){if(xn.setValue(ae,"toneMappingExposure",B.toneMappingExposure),yt.needsLights&&sr(Zn,or),Je&&pe.fog===!0&&Ke.refreshFogUniforms(Zn,Je),Ke.refreshMaterialUniforms(Zn,pe,oe,ne,N.state.transmissionRenderTarget[I.id]),yt.needsLights&&yt.lightProbeGrid){let Vn=yt.lightProbeGrid;Zn.probesSH.value=Vn.texture,Zn.probesMin.value.copy(Vn.boundingBox.min),Zn.probesMax.value.copy(Vn.boundingBox.max),Zn.probesResolution.value.copy(Vn.resolution)}Co.upload(ae,Ar(yt),Zn,Me)}if(pe.isShaderMaterial&&pe.uniformsNeedUpdate===!0&&(Co.upload(ae,Ar(yt),Zn,Me),pe.uniformsNeedUpdate=!1),pe.isSpriteMaterial&&xn.setValue(ae,"center",xe.center),xn.setValue(ae,"modelViewMatrix",xe.modelViewMatrix),xn.setValue(ae,"normalMatrix",xe.normalMatrix),xn.setValue(ae,"modelMatrix",xe.matrixWorld),pe.uniformsGroups!==void 0){let Vn=pe.uniformsGroups;for(let bi=0,Ii=Vn.length;bi<Ii;bi++){let pi=Vn[bi];ke.update(pi,gi),ke.bind(pi,gi)}}return gi}function sr(I,se){I.ambientLightColor.needsUpdate=se,I.lightProbe.needsUpdate=se,I.sunLights.needsUpdate=se,I.sunLightShadows.needsUpdate=se,I.directionalLights.needsUpdate=se,I.directionalLightShadows.needsUpdate=se,I.pointLights.needsUpdate=se,I.pointLightShadows.needsUpdate=se,I.spotLights.needsUpdate=se,I.spotLightShadows.needsUpdate=se,I.rectAreaLights.needsUpdate=se,I.hemisphereLights.needsUpdate=se}function aa(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return Q},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(I,se,be){let pe=ve.get(I);pe.__autoAllocateDepthBuffer=I.resolveDepthBuffer===!1,pe.__autoAllocateDepthBuffer===!1&&(pe.__useRenderToTexture=!1),ve.get(I.texture).__webglTexture=se,ve.get(I.depthTexture).__webglTexture=pe.__autoAllocateDepthBuffer?void 0:be,pe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(I,se){let be=ve.get(I);be.__webglFramebuffer=se,be.__useDefaultFramebuffer=se===void 0},this.setRenderTarget=function(I,se=0,be=0){j=I,V=se,Q=be;let pe=null,xe=!1,Je=!1;if(I){let Ve=ve.get(I);if(Ve.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(ae.FRAMEBUFFER,Ve.__webglFramebuffer),re.copy(I.viewport),ye.copy(I.scissor),Se=I.scissorTest,w.viewport(re),w.scissor(ye),w.setScissorTest(Se),W=-1;return}else if(Ve.__webglFramebuffer===void 0)Me.setupRenderTarget(I);else if(Ve.__hasExternalTextures)Me.rebindTextures(I,ve.get(I.texture).__webglTexture,ve.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){let ln=I.depthTexture;if(Ve.__boundDepthTexture!==ln){if(ln!==null&&ve.has(ln)&&(I.width!==ln.image.width||I.height!==ln.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Me.setupDepthRenderbuffer(I)}}let Tt=I.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(Je=!0);let Et=ve.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Et[se])?pe=Et[se][be]:pe=Et[se],xe=!0):I.samples>0&&Me.useMultisampledRTT(I)===!1?pe=ve.get(I).__webglMultisampledFramebuffer:Array.isArray(Et)?pe=Et[be]:pe=Et,re.copy(I.viewport),ye.copy(I.scissor),Se=I.scissorTest}else re.copy(ze).multiplyScalar(oe).floor(),ye.copy(ht).multiplyScalar(oe).floor(),Se=Gt;if(be!==0&&(pe=b),w.bindFramebuffer(ae.FRAMEBUFFER,pe)&&w.drawBuffers(I,pe),w.viewport(re),w.scissor(ye),w.setScissorTest(Se),xe){let Ve=ve.get(I.texture);ae.framebufferTexture2D(ae.FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ae.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ve.__webglTexture,be)}else if(Je){let Ve=se;for(let Tt=0;Tt<I.textures.length;Tt++){let Et=ve.get(I.textures[Tt]);ae.framebufferTextureLayer(ae.FRAMEBUFFER,ae.COLOR_ATTACHMENT0+Tt,Et.__webglTexture,be,Ve)}}else if(I!==null&&be!==0){let Ve=ve.get(I.texture);ae.framebufferTexture2D(ae.FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ae.TEXTURE_2D,Ve.__webglTexture,be)}W=-1};function Zi(I){let se=ve.get(I);return(se.__readFormat!==I.format||se.__readType!==I.type)&&(se.__readFormat=I.format,se.__readType=I.type,se.__formatReadable=X.textureFormatReadable(I.format),se.__typeReadable=X.textureTypeReadable(I.type)),se}this.readRenderTargetPixels=function(I,se,be,pe,xe,Je,We,Ve=0){if(!(I&&I.isWebGLRenderTarget)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=ve.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&We!==void 0&&(Tt=Tt[We]),Tt){w.bindFramebuffer(ae.FRAMEBUFFER,Tt);try{let Et=I.textures[Ve],ln=Et.format,dn=Et.type;I.textures.length>1&&ae.readBuffer(ae.COLOR_ATTACHMENT0+Ve);let gt=Zi(Et);if(gt.__formatReadable===!1){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(gt.__typeReadable===!1){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}se>=0&&se<=I.width-pe&&be>=0&&be<=I.height-xe&&ae.readPixels(se,be,pe,xe,tt.convert(ln),tt.convert(dn),Je)}finally{let Et=j!==null?ve.get(j).__webglFramebuffer:null;w.bindFramebuffer(ae.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(I,se,be,pe,xe,Je,We,Ve=0){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=ve.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&We!==void 0&&(Tt=Tt[We]),Tt)if(se>=0&&se<=I.width-pe&&be>=0&&be<=I.height-xe){w.bindFramebuffer(ae.FRAMEBUFFER,Tt);let Et=I.textures[Ve],ln=Et.format,dn=Et.type;I.textures.length>1&&ae.readBuffer(ae.COLOR_ATTACHMENT0+Ve);let gt=Zi(Et);if(gt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(gt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ct=ae.createBuffer();ae.bindBuffer(ae.PIXEL_PACK_BUFFER,ct),ae.bufferData(ae.PIXEL_PACK_BUFFER,Je.byteLength,ae.STREAM_READ),ae.readPixels(se,be,pe,xe,tt.convert(ln),tt.convert(dn),0),ae.bindBuffer(ae.PIXEL_PACK_BUFFER,null);let pn=j!==null?ve.get(j).__webglFramebuffer:null;w.bindFramebuffer(ae.FRAMEBUFFER,pn);let Ht=ae.fenceSync(ae.SYNC_GPU_COMMANDS_COMPLETE,0);return ae.flush(),await p0(ae,Ht,4),ae.bindBuffer(ae.PIXEL_PACK_BUFFER,ct),ae.getBufferSubData(ae.PIXEL_PACK_BUFFER,0,Je),ae.bindBuffer(ae.PIXEL_PACK_BUFFER,null),ae.deleteBuffer(ct),ae.deleteSync(Ht),Je}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(I,se=null,be=0){let pe=Math.pow(2,-be),xe=Math.floor(I.image.width*pe),Je=Math.floor(I.image.height*pe),We=se!==null?se.x:0,Ve=se!==null?se.y:0;Me.setTexture2D(I,0),ae.copyTexSubImage2D(ae.TEXTURE_2D,be,0,0,We,Ve,xe,Je),w.unbindTexture()},this.copyTextureToTexture=function(I,se,be=null,pe=null,xe=0,Je=0){let We,Ve,Tt,Et,ln,dn,gt,ct,pn,Ht=I.isCompressedTexture?I.mipmaps[Je]:I.image;if(be!==null)We=be.max.x-be.min.x,Ve=be.max.y-be.min.y,Tt=be.isBox3?be.max.z-be.min.z:1,Et=be.min.x,ln=be.min.y,dn=be.isBox3?be.min.z:0;else{let Zn=Math.pow(2,-xe);We=Math.floor(Ht.width*Zn),Ve=Math.floor(Ht.height*Zn),I.isDataArrayTexture?Tt=Ht.depth:I.isData3DTexture?Tt=Math.floor(Ht.depth*Zn):Tt=1,Et=0,ln=0,dn=0}pe!==null?(gt=pe.x,ct=pe.y,pn=pe.z):(gt=0,ct=0,pn=0);let nt=tt.convert(se.format),yn=tt.convert(se.type),yt;se.isData3DTexture?(Me.setTexture3D(se,0),yt=ae.TEXTURE_3D):se.isDataArrayTexture||se.isCompressedArrayTexture?(Me.setTexture2DArray(se,0),yt=ae.TEXTURE_2D_ARRAY):(Me.setTexture2D(se,0),yt=ae.TEXTURE_2D),w.activeTexture(ae.TEXTURE0),w.pixelStorei(ae.UNPACK_FLIP_Y_WEBGL,se.flipY),w.pixelStorei(ae.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),w.pixelStorei(ae.UNPACK_ALIGNMENT,se.unpackAlignment);let Ti=w.getParameter(ae.UNPACK_ROW_LENGTH),fn=w.getParameter(ae.UNPACK_IMAGE_HEIGHT),gi=w.getParameter(ae.UNPACK_SKIP_PIXELS),Ji=w.getParameter(ae.UNPACK_SKIP_ROWS),Ni=w.getParameter(ae.UNPACK_SKIP_IMAGES);w.pixelStorei(ae.UNPACK_ROW_LENGTH,Ht.width),w.pixelStorei(ae.UNPACK_IMAGE_HEIGHT,Ht.height),w.pixelStorei(ae.UNPACK_SKIP_PIXELS,Et),w.pixelStorei(ae.UNPACK_SKIP_ROWS,ln),w.pixelStorei(ae.UNPACK_SKIP_IMAGES,dn);let or=I.isDataArrayTexture||I.isData3DTexture,xn=se.isDataArrayTexture||se.isData3DTexture;if(I.isDepthTexture){let Zn=ve.get(I),Ui=ve.get(se),Vn=ve.get(Zn.__renderTarget),bi=ve.get(Ui.__renderTarget);w.bindFramebuffer(ae.READ_FRAMEBUFFER,Vn.__webglFramebuffer),w.bindFramebuffer(ae.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let Ii=0;Ii<Tt;Ii++)or&&(ae.framebufferTextureLayer(ae.READ_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ve.get(I).__webglTexture,xe,dn+Ii),ae.framebufferTextureLayer(ae.DRAW_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ve.get(se).__webglTexture,Je,pn+Ii)),ae.blitFramebuffer(Et,ln,We,Ve,gt,ct,We,Ve,ae.DEPTH_BUFFER_BIT,ae.NEAREST);w.bindFramebuffer(ae.READ_FRAMEBUFFER,null),w.bindFramebuffer(ae.DRAW_FRAMEBUFFER,null)}else if(xe!==0||I.isRenderTargetTexture||ve.has(I)){let Zn=ve.get(I),Ui=ve.get(se);w.bindFramebuffer(ae.READ_FRAMEBUFFER,M),w.bindFramebuffer(ae.DRAW_FRAMEBUFFER,k);for(let Vn=0;Vn<Tt;Vn++)or?ae.framebufferTextureLayer(ae.READ_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,Zn.__webglTexture,xe,dn+Vn):ae.framebufferTexture2D(ae.READ_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ae.TEXTURE_2D,Zn.__webglTexture,xe),xn?ae.framebufferTextureLayer(ae.DRAW_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,Ui.__webglTexture,Je,pn+Vn):ae.framebufferTexture2D(ae.DRAW_FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ae.TEXTURE_2D,Ui.__webglTexture,Je),xe!==0?ae.blitFramebuffer(Et,ln,We,Ve,gt,ct,We,Ve,ae.COLOR_BUFFER_BIT,ae.NEAREST):xn?ae.copyTexSubImage3D(yt,Je,gt,ct,pn+Vn,Et,ln,We,Ve):ae.copyTexSubImage2D(yt,Je,gt,ct,Et,ln,We,Ve);w.bindFramebuffer(ae.READ_FRAMEBUFFER,null),w.bindFramebuffer(ae.DRAW_FRAMEBUFFER,null)}else xn?I.isDataTexture||I.isData3DTexture?ae.texSubImage3D(yt,Je,gt,ct,pn,We,Ve,Tt,nt,yn,Ht.data):se.isCompressedArrayTexture?ae.compressedTexSubImage3D(yt,Je,gt,ct,pn,We,Ve,Tt,nt,Ht.data):ae.texSubImage3D(yt,Je,gt,ct,pn,We,Ve,Tt,nt,yn,Ht):I.isDataTexture?ae.texSubImage2D(ae.TEXTURE_2D,Je,gt,ct,We,Ve,nt,yn,Ht.data):I.isCompressedTexture?ae.compressedTexSubImage2D(ae.TEXTURE_2D,Je,gt,ct,Ht.width,Ht.height,nt,Ht.data):ae.texSubImage2D(ae.TEXTURE_2D,Je,gt,ct,We,Ve,nt,yn,Ht);w.pixelStorei(ae.UNPACK_ROW_LENGTH,Ti),w.pixelStorei(ae.UNPACK_IMAGE_HEIGHT,fn),w.pixelStorei(ae.UNPACK_SKIP_PIXELS,gi),w.pixelStorei(ae.UNPACK_SKIP_ROWS,Ji),w.pixelStorei(ae.UNPACK_SKIP_IMAGES,Ni),Je===0&&se.generateMipmaps&&ae.generateMipmap(yt),w.unbindTexture()},this.initRenderTarget=function(I){ve.get(I).__webglFramebuffer===void 0&&Me.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?Me.setTextureCube(I,0):I.isData3DTexture?Me.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?Me.setTexture2DArray(I,0):Me.setTexture2D(I,0),w.unbindTexture()},this.resetState=function(){V=0,Q=0,j=null,w.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ea}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=An._getDrawingBufferColorSpace(e),t.unpackColorSpace=An._getUnpackColorSpace()}};var Td=function(){return Td=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Td.apply(this,arguments)},jn=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},ql=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Q0=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function _b(n){for(var e=atob(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);for(var r=new DataView(t.buffer,t.byteOffset,t.byteLength),a=r.getUint32(8,!0),s=r.getUint32(12,!0),o=new Float32Array(a*3),u=new Float32Array(a*3),l=new Float32Array(a*2),d=16,i=0;i<a;i++)o[i*3]=r.getFloat32(d,!0),o[i*3+1]=r.getFloat32(d+4,!0),o[i*3+2]=r.getFloat32(d+8,!0),u[i*3]=r.getFloat32(d+12,!0),u[i*3+1]=r.getFloat32(d+16,!0),u[i*3+2]=r.getFloat32(d+20,!0),l[i*2]=r.getFloat32(d+24,!0),l[i*2+1]=r.getFloat32(d+28,!0),d+=32;for(var h=new Uint16Array(s),i=0;i<s;i++)h[i]=r.getUint16(d+i*2,!0);var f=new Xi;return f.setAttribute("position",new zn(o,3)),f.setAttribute("normal",new zn(u,3)),f.setAttribute("uv",new zn(l,2)),f.setIndex(Array.from(h)),f}function j0(n,e,t){return!n||t>=1?0:t<=-1?1.1:(1-t)*.55}function Mb(n,e,t){var i,r,a,s,o,u,l,d,h,f,m,x,T,g,p,D,v,y=new Sr,C=!!n.fairwayRamp,N=(T=n.cupX)!==null&&T!==void 0?T:0,O=(g=n.cupZ)!==null&&g!==void 0?g:-4.8,S=(p=n.cupRadius)!==null&&p!==void 0?p:.23,E=new Ur(1,1,1),B=new Map,F=function(Te,Pe,Ke,Oe,Ge,De,lt){var et=B.get(lt);et||(et=new Yi({color:lt}),B.set(lt,et));var ie=new Kn(E,et);ie.position.set(Te,Pe,Ke),ie.scale.set(Oe,Ge,De),y.add(ie)};try{for(var q=jn([-3.2,3.2]),b=q.next();!b.done;b=q.next()){var M=b.value;F(M,-.65,0,.2,1.1,14.6,"#a1b8b1"),F(M-Math.sign(M)*.1,-.18,0,.2,.25,14.4,"#e9cea5")}}catch(Te){i={error:Te}}finally{try{b&&!b.done&&(r=q.return)&&r.call(q)}finally{if(i)throw i.error}}try{for(var k=jn([-7.2,7.2]),V=k.next();!V.done;V=k.next()){var Q=V.value;F(0,-.65,Q,6.4,1.1,.2,"#a1b8b1"),F(0,-.18,Q-Math.sign(Q)*.1,6.2,.25,.2,"#e9cea5")}}catch(Te){a={error:Te}}finally{try{V&&!V.done&&(s=k.return)&&s.call(k)}finally{if(a)throw a.error}}var j=.5,W=.5;if(t){var Z=t.getAttribute("uv"),re=t.getAttribute("normal");if(Z&&re){for(var ye=0;ye<re.count&&re.getY(ye)<.9;)ye++;ye<Z.count&&(j=Z.getX(ye),W=Z.getY(ye))}}var Se=!!(e&&(!((D=e.image)===null||D===void 0)&&D.complete)&&((v=e.image)===null||v===void 0?void 0:v.naturalWidth)>0),ue=Se?new Yi({map:e}):new Yi({color:"#6ec458"}),fe=Se?new Yi({map:e,color:"#779263"}):new Yi({color:"#5a9949"});e&&!Se&&(ue.userData.pendingTex={tex:e,color:"#ffffff"},fe.userData.pendingTex={tex:e,color:"#779263"});var Fe=C?[[-7,-1],[-1,1],[1,7]]:[[-7,7]];try{for(var ne=jn(Fe),oe=ne.next();!oe.done;oe=ne.next()){var Ue=ql(oe.value,2),Be=Ue[0],ze=Ue[1],ht=new yo;if(ht.moveTo(-3,Be),ht.lineTo(3,Be),ht.lineTo(3,ze),ht.lineTo(-3,ze),ht.closePath(),O>Be&&O<ze){var Gt=new Rs;Gt.absarc(N,O,S,0,Math.PI*2,!0),ht.holes.push(Gt)}for(var ut=new Il(ht,32),wt=ut.getAttribute("position"),Zt=!1,je=!1,xt=0;xt<wt.count;xt++){var _t=wt.getX(xt),cn=wt.getY(xt),Pt=j0(C,_t,cn);Pt===0&&(Zt=!0),Pt>0&&(je=!0),wt.setXYZ(xt,_t,Pt,cn)}var $t=ut.getIndex();if($t)for(var xt=0;xt<$t.count;xt+=3){var ae=$t.getX(xt+1);$t.setX(xt+1,$t.getX(xt+2)),$t.setX(xt+2,ae)}ut.computeVertexNormals();for(var hn=ut.getAttribute("uv"),xt=0;xt<hn.count;xt++)hn.setXY(xt,j,W);var qt=new Kn(ut,C&&Zt&&je?fe:ue);qt.name="continuous-fairway",y.add(qt)}}catch(Te){o={error:Te}}finally{try{oe&&!oe.done&&(u=ne.return)&&u.call(ne)}finally{if(o)throw o.error}}var X="#d69260",w="#f1bd87";try{for(var le=jn([-3.1,3.1]),ve=le.next();!ve.done;ve=le.next()){var M=ve.value;F(M,.12,0,.2,.3,14.2,X),F(M,.29,0,.22,.04,14.2,w)}}catch(Te){l={error:Te}}finally{try{ve&&!ve.done&&(d=le.return)&&d.call(le)}finally{if(l)throw l.error}}try{for(var Me=jn([-7.1,7.1]),He=Me.next();!He.done;He=Me.next()){var Q=He.value;F(0,j0(C,0,Q>0?6:-6)+.12,Q,6.4,.3,.2,X)}}catch(Te){h={error:Te}}finally{try{He&&!He.done&&(f=Me.return)&&f.call(Me)}finally{if(h)throw h.error}}if(C)try{for(var $e=jn([-3.1,3.1]),Ae=$e.next();!Ae.done;Ae=$e.next()){var M=Ae.value;F(M,.7,-4.5,.2,1.1,5.2,X)}}catch(Te){m={error:Te}}finally{try{Ae&&!Ae.done&&(x=$e.return)&&x.call($e)}finally{if(m)throw m.error}}return y}function Sb(n){var e,t=new Sr,i=(e=n.cupRadius)!==null&&e!==void 0?e:.23,r=new Kn(new Cs(i,i*.89,.48,24,1,!0),new Yi({color:"#244640",side:wr}));r.position.y=-.24,t.add(r);var a=new Kn(new vo(i*.91,24),new Sa({color:"#082c2b"}));a.rotation.x=-Math.PI/2,a.position.y=-.475,t.add(a);var s=new Kn(new Cs(i,i*.978,.09,24,1,!0),new Yi({color:"#eee9cf",side:wr}));s.position.y=-.045,t.add(s);var o=new Kn(new _o(i,i+.06,24),new Yi({color:"#fff7d1"}));return o.rotation.x=-Math.PI/2,o.position.y=.004,t.add(o),t}function bb(){for(var n,e,t=new Sr,i=new Ur(.18,1,.18),r=new Yi({color:"#b27b59"}),a=new Ur(1.5,.2,1.6),s=new Yi({color:"#82b88b"}),o=new ss(.62,7,5),u=new ss(.49,7,5),l=new Yi({color:"#77b86b"}),d=new Yi({color:"#3e9d79"}),h=new ba(i,r,14),f=new ba(a,s,14),m=5,x=9,T=new ba(o,l,m),g=new ba(u,l,m),p=new ba(o,d,x),D=new ba(u,d,x),v=new Yn,y=0,C=0,N=0;N<14;N++){var O=N%2?-1:1,S=O*(3.8+N%3*.35),E=-6.5+Math.floor(N/2)*2;v.makeTranslation(S,-.02,E),h.setMatrixAt(N,v),v.makeTranslation(S,-.48,E),f.setMatrixAt(N,v),N%3===0?(v.makeTranslation(S,.5,E),T.setMatrixAt(y,v),v.makeTranslation(S,1,E),g.setMatrixAt(y,v),y++):(v.makeTranslation(S,.5,E),p.setMatrixAt(C,v),v.makeTranslation(S,1,E),D.setMatrixAt(C,v),C++)}try{for(var B=jn([h,f,T,g,p,D]),F=B.next();!F.done;F=B.next()){var q=F.value;q.instanceMatrix.needsUpdate=!0,t.add(q)}}catch(b){n={error:b}}finally{try{F&&!F.done&&(e=B.return)&&e.call(B)}finally{if(n)throw n.error}}return t}function wb(n,e,t){for(var i=n.getAttribute("position"),r=0;r<i.count;r++){var a=e[r*3],s=e[r*3+1],o=e[r*3+2],u=s>.7?Math.max(0,Math.min(1,(-a-.035)/.32)):0;i.setXYZ(r,a,s+Math.sin(t*3.2+a*10)*.018*u,o+Math.sin(t*3.2+a*10+s*2)*.07*u)}i.needsUpdate=!0,n.computeVertexNormals()}function ev(n,e,t){var i=new Map,r=new Map,a=new Map,s,o,u,l,d;function h(){var y,C;if(o!==void 0)return o;try{return s=document.createElement("canvas"),(y=s.addEventListener)===null||y===void 0||y.call(s,"webglcontextrestored",function(){var N,O;d=void 0;try{for(var S=jn(a.values()),E=S.next();!E.done;E=S.next()){var B=E.value;B.compiled=!1,B.textureDirty=!0,B.lastRenderedTime=-1,B.lastFlagStep=-1}}catch(F){N={error:F}}finally{try{E&&!E.done&&(O=S.return)&&O.call(S)}finally{if(N)throw N.error}}t?.()}),u=document.createElement("canvas"),l=(C=u.getContext)===null||C===void 0?void 0:C.call(u,"2d"),o=new Sd({canvas:s,antialias:!0,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"default"}),o.shadowMap.type=Au,o}catch{return o=null,null}}function f(y){if(y){if(i.has(y))return i.get(y);var C=e.get(y);if(!(!C||C.mime!=="model/tora-mesh"||!C.data)){var N=_b(C.data);return i.set(y,N),N}}}function m(y){if(y){if(r.has(y))return r.get(y);var C=e.get(y);if(!(!C||!C.mime.startsWith("image/")||!C.data)){var N=new Image,O=new nr(N);O.colorSpace=pr;var S=function(E){var B,F;O.needsUpdate=!0;try{for(var q=jn(a.values()),b=q.next();!b.done;b=q.next()){var M=b.value;M.scene.traverse(function(k){var V,Q,j,W=k.isMesh&&k.material?Array.isArray(k.material)?k.material:[k.material]:[];try{for(var Z=(V=void 0,jn(W)),re=Z.next();!re.done;re=Z.next()){var ye=re.value;!((j=ye.userData)===null||j===void 0)&&j.pendingTex&&ye.userData.pendingTex.tex===O&&(ye.map=O,ye.color.set(ye.userData.pendingTex.color||"#ffffff"),delete ye.userData.pendingTex,ye.needsUpdate=!0)}}catch(Se){V={error:Se}}finally{try{re&&!re.done&&(Q=Z.return)&&Q.call(Z)}finally{if(V)throw V.error}}}),M.textureDirty=!0}}catch(k){B={error:k}}finally{try{b&&!b.done&&(F=q.return)&&F.call(q)}finally{if(B)throw B.error}}E&&t?.()};return r.set(y,O),N.onload=function(){return S(!0)},N.src="data:"+C.mime+";base64,"+C.data,N.complete&&N.naturalWidth&&S(!1),O}}}function x(y){var C,N,O,S,E,B,F,q,b,M,k,V,Q,j,W,Z,re,ye,Se,ue,fe=y.parameters,Fe=new hl;Fe.background=new mn(fe.skyColor||"#b8e2ed");var ne=new tr((O=fe.cameraFov)!==null&&O!==void 0?O:39,1,.1,160);ne.position.set((S=fe.cameraX)!==null&&S!==void 0?S:10,(E=fe.cameraY)!==null&&E!==void 0?E:18,(B=fe.cameraZ)!==null&&B!==void 0?B:21),ne.lookAt((F=fe.lookAtX)!==null&&F!==void 0?F:0,(q=fe.lookAtY)!==null&&q!==void 0?q:.15,(b=fe.lookAtZ)!==null&&b!==void 0?b:0),Fe.add(ne),Fe.add(new Pl(fe.hemiSkyColor||"#fff9dd",fe.hemiGroundColor||"#527b75",(M=fe.hemiIntensity)!==null&&M!==void 0?M:1.8));var oe=new Dl(fe.sunColor||"#fff0cf",(k=fe.sunIntensity)!==null&&k!==void 0?k:2.1);oe.position.set((V=fe.sunX)!==null&&V!==void 0?V:-9,(Q=fe.sunY)!==null&&Q!==void 0?Q:18,(j=fe.sunZ)!==null&&j!==void 0?j:8),Fe.add(oe);var Ue=m((Z=(W=y.assetSlots)===null||W===void 0?void 0:W[0])===null||Z===void 0?void 0:Z.assetId),Be=new Map,ze=new Map,ht=[],Gt=[];function ut(Pe,Ke,Oe,Ge){Pe.traverse(function(De){De.userData.toraRootId=Ke,De.userData.toraSourceId=Oe,Ge&&(De.userData.cameraAttached=!0)})}function wt(Pe,Ke,Oe,Ge,De){var lt,et,ie,Ze,Re,tt,ot,ke,Rt,ft,Kt,Qt,Bn,ei,bn,qn,Mi,Si,ni,tn=Pe.parameters,vt,In=function(){var Er,Tn,ai={},ar=!!(Ue&&(!((Er=Ue.image)===null||Er===void 0)&&Er.complete)&&((Tn=Ue.image)===null||Tn===void 0?void 0:Tn.naturalWidth)>0);tn.useTexture&&Ue&&ar?ai.map=Ue:ai.color=tn.useTexture?tn.waveFlag?"#e85d56":"#d89b6a":tn.color||"#ffffff",tn.doubleSide&&(ai.side=wr),tn.opacity<1&&(ai.transparent=!0,ai.opacity=tn.opacity,ai.depthWrite=!1);var Ar=tn.unlit?new Sa(ai):new Yi(ai);return tn.useTexture&&Ue&&!ar&&(Ar.userData.pendingTex={tex:Ue,color:"#ffffff"}),Ar};if(tn.primitive==="group")vt=new Sr;else if(tn.primitive==="fairway")vt=Mb(tn,Ue,f((et=(lt=Pe.assetSlots)===null||lt===void 0?void 0:lt[0])===null||et===void 0?void 0:et.assetId));else if(tn.primitive==="cup")vt=Sb(tn);else if(tn.primitive==="garden")vt=bb();else if(tn.primitive==="mesh"){var gn=f((Ze=(ie=Pe.assetSlots)===null||ie===void 0?void 0:ie[0])===null||Ze===void 0?void 0:Ze.assetId),Di=tn.waveFlag&&gn?gn.clone():gn??new Ur(1,1,1);vt=new Kn(Di,In()),tn.waveFlag&&gn&&ht.push({geo:Di,rest:new Float32Array(Di.getAttribute("position").array)})}else tn.primitive==="sphere"?vt=new Kn(new ss((Re=tn.radiusTop)!==null&&Re!==void 0?Re:.5,16,12),In()):tn.primitive==="cylinder"?vt=new Kn(new Cs((tt=tn.radiusTop)!==null&&tt!==void 0?tt:.23,(ot=tn.radiusBottom)!==null&&ot!==void 0?ot:.21,1,32,1,!!tn.openEnded),In()):tn.primitive==="ring"?vt=new Kn(new _o((ke=tn.innerRadius)!==null&&ke!==void 0?ke:0,(Rt=tn.radiusTop)!==null&&Rt!==void 0?Rt:.15,24),In()):tn.primitive==="circle"?vt=new Kn(new vo((ft=tn.radiusTop)!==null&&ft!==void 0?ft:.21,32),In()):vt=new Kn(new Ur(1,1,1),In());return vt.position.set((Kt=tn.x)!==null&&Kt!==void 0?Kt:0,(Qt=tn.y)!==null&&Qt!==void 0?Qt:0,(Bn=tn.z)!==null&&Bn!==void 0?Bn:0),vt.rotation.set((ei=tn.rx)!==null&&ei!==void 0?ei:0,(bn=tn.ry)!==null&&bn!==void 0?bn:0,(qn=tn.rz)!==null&&qn!==void 0?qn:0),vt.scale.set((Mi=tn.sx)!==null&&Mi!==void 0?Mi:1,(Si=tn.sy)!==null&&Si!==void 0?Si:1,(ni=tn.sz)!==null&&ni!==void 0?ni:1),vt.visible=tn.visible!==!1,ut(vt,Oe,Ge,De),Ke.add(vt),vt}var Zt=[],je=new Map,xt=function(Pe,Ke,Oe){var Ge,De;try{for(var lt=jn(n.components),et=lt.next();!et.done;et=lt.next()){var ie=et.value;if(ie.parentId===Pe&&ie.contract==="native.mesh3d.v1"&&!ie.prototype){var Ze=Ke??ie,Re=Oe||!!ie.parameters.attachToCamera;je.set(ie.id,{rootId:Ze.id,sourceId:Ze.id,cameraAttached:Re}),Zt.push(ie),xt(ie.id,Ze,Re)}}}catch(tt){Ge={error:tt}}finally{try{et&&!et.done&&(De=lt.return)&&De.call(lt)}finally{if(Ge)throw Ge.error}}};xt(y.id,null,!1);var _t=function(Pe){var Ke=Pe.parameters,Oe=je.get(Pe.id),Ge=Ke.attachToCamera&&Pe.parentId===y.id?ne:Pe.parentId===y.id?Fe:(re=Be.get(Pe.parentId))!==null&&re!==void 0?re:Fe,De=wt(Pe,Ge,Oe.rootId,Oe.sourceId,Oe.cameraAttached);if(Be.set(Pe.id,De),Ke.confetti){var lt=new Sr;lt.userData.isConfetti=!0;var et=new Ur(.08,.025,.12),ie=["#ffda69","#fff6c9","#ef8774","#7cc6bf"].map(function(Re){return new Sa({color:Re})}),Ze=Array.from({length:28},function(Re,tt){var ot=new Kn(et,ie[tt%4]);return ot.visible=!1,lt.add(ot),ot});Fe.add(lt),Gt.push({id:Pe.id,origin:{x:(ye=Ke.x)!==null&&ye!==void 0?ye:0,y:(Se=Ke.y)!==null&&Se!==void 0?Se:0,z:(ue=Ke.z)!==null&&ue!==void 0?ue:0},pieces:Ze})}};try{for(var cn=jn(Zt),Pt=cn.next();!Pt.done;Pt=cn.next()){var $t=Pt.value;_t($t)}}catch(Pe){C={error:Pe}}finally{try{Pt&&!Pt.done&&(N=cn.return)&&N.call(cn)}finally{if(C)throw C.error}}var ae=new Sr;Fe.add(ae);var hn=new ss(1,8,5),qt=new Sa({color:"#fff1a2",transparent:!0,opacity:.85}),X=Array.from({length:24},function(){var Pe=new Kn(hn,qt);return Pe.visible=!1,ae.add(Pe),Pe}),w=new Nl,le=new Dt,ve=new ge,Me=new Dr(new ge(0,1,0),0),He=new ge,$e="",Ae=Array.from(Be,function(Pe){var Ke=ql(Pe,2),Oe=Ke[0],Ge=Ke[1];return{id:Oe,obj:Ge,comp:n.components.find(function(De){return De.id===Oe})}}).filter(function(Pe){return Pe.comp}),Te={id:y.id,scene:Fe,camera:ne,nodes:Be,dynamicNodes:ze,nodeEntries:Ae,createMeshObject:wt,wavingFlags:ht,confettiSystems:Gt,guideGroup:ae,guidePool:X,compiled:!1,lastRenderMs:0,textureDirty:!0,skyColor:fe.skyColor||"#b8e2ed",lastWaveAt:-1,lastRenderedTime:-1,lastRenderedW:0,lastRenderedH:0,lastPoseSig:"",guideDirty:!0,focusZ:0,lastTime:-1,lastWidth:0,lastHeight:0,setGuide:function(Pe){var Ke=Pe?Math.min(Pe.length,X.length):0,Oe=Ke?Pe.slice(0,Ke).map(function(ie){return"".concat(ie.x.toFixed(2),",").concat(ie.y.toFixed(2),",").concat(ie.z.toFixed(2))}).join("|"):"";if(Oe!==$e){$e=Oe,Te.guideDirty=!0;for(var Ge=0;Ge<X.length;Ge++){var De=X[Ge];if(Ge<Ke){var lt=Pe[Ge],et=.055*(1-Ge/Ke*.5);De.visible=!0,De.scale.setScalar(et),De.position.set(lt.x,lt.y+.03,lt.z)}else De.visible=!1}}},project:function(Pe,Ke,Oe){return ve.set(Pe.x,Pe.y,Pe.z).project(ne),{x:(ve.x+1)*Ke/2,y:(1-ve.y)*Oe/2}},unproject:function(Pe,Ke,Oe,Ge,De){return le.set(Pe/Oe*2-1,1-Ke/Ge*2),w.setFromCamera(le,ne),Me.constant=-De,w.ray.intersectPlane(Me,He)?{x:He.x,y:He.y,z:He.z}:null},raycast:function(Pe,Ke,Oe,Ge){var De,lt,et,ie,Ze,Re;Oe===void 0&&(Oe=80);var tt=Ge===void 0?{}:Ge,ot=tt.isTarget,ke=ot===void 0?function(){return!0}:ot,Rt=tt.isOccluder,ft=Rt===void 0?function(){return!1}:Rt;Fe.updateMatrixWorld(!0),ne.updateMatrixWorld(!0),le.set(Pe,Ke),w.near=.05,w.far=Oe,w.setFromCamera(le,ne);var Kt=w.intersectObjects(Fe.children,!0),Qt=new Set;try{for(var Bn=jn(Kt),ei=Bn.next();!ei.done;ei=Bn.next()){for(var bn=ei.value,qn=!1,Mi=bn.object;Mi;Mi=Mi.parent)if(!Mi.visible||Mi===ae||!((et=Mi.userData)===null||et===void 0)&&et.cameraAttached||!((ie=Mi.userData)===null||ie===void 0)&&ie.isConfetti){qn=!0;break}if(!qn){var Si=(Ze=bn.object.userData)===null||Ze===void 0?void 0:Ze.toraRootId,ni=(Re=bn.object.userData)===null||Re===void 0?void 0:Re.toraSourceId;if(!(!Si||Qt.has(Si))){if(Qt.add(Si),ke(Si,ni))return{id:Si,sourceId:ni,distance:bn.distance,point:{x:bn.point.x,y:bn.point.y,z:bn.point.z}};if(ft(Si,ni))return null}}}}catch(tn){De={error:tn}}finally{try{ei&&!ei.done&&(lt=Bn.return)&&lt.call(Bn)}finally{if(De)throw De.error}}return null}};return a.set(y.id,Te),Te}function T(y){var C;return(C=a.get(y.id))!==null&&C!==void 0?C:x(y)}function g(y,C){var N,O,S,E,B,F,q,b,M,k,V,Q,j,W,Z,re,ye,Se,ue,fe,Fe,ne,oe,Ue,Be,ze,ht,Gt,ut,wt,Zt,je,xt,_t,cn,Pt,$t,ae,hn,qt,X,w,le,ve,Me,He,$e,Ae,Te,Pe,Ke,Oe,Ge,De,lt,et,ie,Ze,Re,tt=C.time,ot=tt===void 0?0:tt,ke=C.ambientTime,Rt=C.propsOf,ft=C.bodies3d,Kt=C.fpsPose,Qt=C.instances3d,Bn=Qt===void 0?[]:Qt,ei=C.aimLocked,bn=ei===void 0?!1:ei,qn=C.groundFn,Mi=C.worldWidth,Si=Mi===void 0?390:Mi,ni=C.worldHeight,tn=ni===void 0?700:ni,vt=T(y),In=ke??ot,gn=Rt(y),Di=gn.skyColor||"#b8e2ed";vt.skyColor!==Di&&(vt.skyColor=Di,vt.scene.background=new mn(Di));var Er=new Set(Bn.map(function(_n){return _n.id}));try{for(var Tn=jn(vt.dynamicNodes),ai=Tn.next();!ai.done;ai=Tn.next()){var ar=ql(ai.value,2),Ar=ar[0],Ai=ar[1];Er.has(Ar)||((V=Ai.parent)===null||V===void 0||V.remove(Ai),vt.dynamicNodes.delete(Ar))}}catch(_n){N={error:_n}}finally{try{ai&&!ai.done&&(O=Tn.return)&&O.call(Tn)}finally{if(N)throw N.error}}var ra=function(_n){if(vt.dynamicNodes.has(_n.id))return"continue";var vs=_n.parentId===y.id?vt.scene:(j=(Q=vt.dynamicNodes.get(_n.parentId))!==null&&Q!==void 0?Q:vt.nodes.get(_n.parentId))!==null&&j!==void 0?j:vt.scene,en=(W=_n.instanceId)!==null&&W!==void 0?W:_n.id,si=(Z=Bn.find(function(gs){return gs.id===en}))!==null&&Z!==void 0?Z:_n,cr=(re=si.prototypeId)!==null&&re!==void 0?re:si.id,Ia=vt.createMeshObject(_n,vs,en,cr,!!_n.parameters.attachToCamera);vt.dynamicNodes.set(_n.id,Ia)};try{for(var qi=jn(Bn),sr=qi.next();!sr.done;sr=qi.next()){var aa=sr.value;ra(aa)}}catch(_n){S={error:_n}}finally{try{sr&&!sr.done&&(E=qi.return)&&E.call(qi)}finally{if(S)throw S.error}}var Zi=Q0(Q0([],ql(vt.nodeEntries),!1),ql(Bn.map(function(_n){return{id:_n.id,obj:vt.dynamicNodes.get(_n.id),comp:_n}}).filter(function(_n){return _n.obj})),!1),I="";try{for(var se=jn(Zi),be=se.next();!be.done;be=se.next()){var pe=be.value,xe=pe.id,Je=pe.obj,aa=pe.comp,We=Rt(aa);Je.visible=We.visible!==!1,!We.useTexture&&Je.isMesh&&(!((ye=Je.material)===null||ye===void 0)&&ye.color)&&We.color&&Je.material.color.set(We.color);var Ve=ft?.get(xe);if(Ve&&Ve.mode==="dynamic"){var Tt=Ve.captured?Math.min(1,((Se=Ve.captureElapsed)!==null&&Se!==void 0?Se:0)/.55):0,Et=Ve.captured&&Ve.captureTarget?Ve.x+(Ve.captureTarget.x-Ve.x)*Tt:Ve.x,ln=Ve.y-Tt*.45,dn=Ve.captured&&Ve.captureTarget?Ve.z+(Ve.captureTarget.z-Ve.z)*Tt:Ve.z;Je.position.set(Et,ln,dn);var gt=1-Tt*.65;Je.scale.set(((ue=We.sx)!==null&&ue!==void 0?ue:1)*gt,((fe=We.sy)!==null&&fe!==void 0?fe:1)*gt,((Fe=We.sz)!==null&&Fe!==void 0?Fe:1)*gt),Je.rotation.set(-((ne=Ve.spin)!==null&&ne!==void 0?ne:0),(oe=We.ry)!==null&&oe!==void 0?oe:0,((Ue=Ve.spin)!==null&&Ue!==void 0?Ue:0)*.22)}else if(Ve&&Ve.mode==="kinematic")Je.position.set(Ve.x,(ze=(Be=Ve.y)!==null&&Be!==void 0?Be:We.y)!==null&&ze!==void 0?ze:0,Ve.z),Je.rotation.set((ht=We.rx)!==null&&ht!==void 0?ht:0,-((ut=(Gt=Ve.angle)!==null&&Gt!==void 0?Gt:We.ry)!==null&&ut!==void 0?ut:0),(wt=We.rz)!==null&&wt!==void 0?wt:0);else if(We.dropShadowOf&&ft?.has(We.dropShadowOf)){var ct=ft.get(We.dropShadowOf),pn=qn?(Zt=qn(ct,ct.x,ct.z))!==null&&Zt!==void 0?Zt:-1:0;Je.position.set(ct.x,pn+.008,ct.z);var Ht=Math.max(0,ct.y-pn-ct.radius);Je.material&&(Je.material.opacity=.22/(1+Ht*2));var gt=1+Ht*.4;Je.scale.set(gt,gt,gt),Je.visible=!ct.captured&&We.visible!==!1}else Je.position.set((je=We.x)!==null&&je!==void 0?je:0,(xt=We.y)!==null&&xt!==void 0?xt:0,(_t=We.z)!==null&&_t!==void 0?_t:0),Je.rotation.set((cn=We.rx)!==null&&cn!==void 0?cn:0,(Pt=We.ry)!==null&&Pt!==void 0?Pt:0,($t=We.rz)!==null&&$t!==void 0?$t:0),Je.scale.set((ae=We.sx)!==null&&ae!==void 0?ae:1,(hn=We.sy)!==null&&hn!==void 0?hn:1,(qt=We.sz)!==null&&qt!==void 0?qt:1);(Kt||vt.dynamicNodes.size>0)&&(I+="".concat(xe,":").concat(Je.visible?1:0,",").concat(Je.position.x.toFixed(3),",").concat(Je.position.y.toFixed(3),",").concat(Je.position.z.toFixed(3),",").concat(Je.rotation.y.toFixed(3),",").concat((X=We.color)!==null&&X!==void 0?X:"","|"))}}catch(_n){B={error:_n}}finally{try{be&&!be.done&&(F=se.return)&&F.call(se)}finally{if(B)throw B.error}}var nt;if(ft)try{for(var yn=jn(ft.values()),yt=yn.next();!yt.done;yt=yn.next()){var Ve=yt.value;if(Ve.stageId===y.id&&Ve.captured){nt=Ve;break}}}catch(_n){q={error:_n}}finally{try{yt&&!yt.done&&(b=yn.return)&&b.call(yn)}finally{if(q)throw q.error}}var Ti=function(_n){var vs=!!nt,en=nt&&(w=nt.captureElapsed)!==null&&w!==void 0?w:0;_n.pieces.forEach(function(si,cr){var Ia,gs,No,Xa,Bs,Uo;if(si.visible=vs,!!vs){var Fo=cr*2.399,mi=(gs=(Ia=nt.captureTarget)===null||Ia===void 0?void 0:Ia.x)!==null&&gs!==void 0?gs:_n.origin.x,oi=(Xa=(No=nt.captureTarget)===null||No===void 0?void 0:No.y)!==null&&Xa!==void 0?Xa:_n.origin.y,Ca=(Uo=(Bs=nt.captureTarget)===null||Bs===void 0?void 0:Bs.z)!==null&&Uo!==void 0?Uo:_n.origin.z;si.position.set(mi+Math.cos(Fo)*en*(.5+cr%4*.17),oi+.3+Math.sin(Math.min(1,en/2)*Math.PI)*(1+cr%5*.15),Ca+Math.sin(Fo)*en*(.5+cr%4*.17)),si.rotation.set(en*3+cr,en*2+cr,Math.sin(en+cr))}})};try{for(var fn=jn(vt.confettiSystems),gi=fn.next();!gi.done;gi=fn.next()){var Ji=gi.value;Ti(Ji)}}catch(_n){M={error:_n}}finally{try{gi&&!gi.done&&(k=fn.return)&&k.call(fn)}finally{if(M)throw M.error}}var Ni=tn>=Si,or=vt.lastTime<0||In<vt.lastTime?0:Math.min(.05,In-vt.lastTime);vt.camera.aspect=Si/Math.max(1,tn);var xn=!1;if(Kt)vt.lastTime=In,vt.camera.rotation.order="YXZ",vt.camera.position.set(Kt.x,Kt.y+((le=Kt.bob)!==null&&le!==void 0?le:0),Kt.z),vt.camera.rotation.set(Kt.pitch,Kt.yaw,0),vt.camera.fov=Ni?(ve=gn.cameraFov)!==null&&ve!==void 0?ve:68:(Me=gn.landscapeCameraFov)!==null&&Me!==void 0?Me:54,I+="cam:".concat(vt.camera.position.x.toFixed(3),",").concat(vt.camera.position.y.toFixed(3),",").concat(vt.camera.position.z.toFixed(3),",").concat(Kt.yaw.toFixed(4),",").concat(Kt.pitch.toFixed(4),",").concat(vt.camera.fov.toFixed(2));else{var Zn=gn.followTargetId?ft?.get(gn.followTargetId):void 0,Ui=Zn?Zn.z*((He=gn.followZFactor)!==null&&He!==void 0?He:.12):($e=gn.lookAtZ)!==null&&$e!==void 0?$e:0;vt.lastTime<0||In<vt.lastTime?vt.focusZ=Ui:bn||(vt.focusZ+=(Ui-vt.focusZ)*(1-Math.exp(-6*or))),vt.lastTime=In;var Vn=Math.max(0,1-In/1.5);if(xn=!gn.followTargetId&&((Ae=gn.introLift)!==null&&Ae!==void 0?Ae:2)===0,!bn){var bi=xn?Math.sin(In*.42)*1.15:0,Ii=xn?(Math.cos(In*.42)-1)*.55:0,pi=(Ni?(Te=gn.cameraX)!==null&&Te!==void 0?Te:10:(Pe=gn.landscapeCameraX)!==null&&Pe!==void 0?Pe:13)+bi,Ft=Ni?((Ke=gn.cameraY)!==null&&Ke!==void 0?Ke:18)+Vn*((Oe=gn.introLift)!==null&&Oe!==void 0?Oe:2):(Ge=gn.landscapeCameraY)!==null&&Ge!==void 0?Ge:15,Do=(Ni?(De=gn.cameraZ)!==null&&De!==void 0?De:21:(lt=gn.landscapeCameraZ)!==null&&lt!==void 0?lt:18)+Ii,lr=or===0?Ft:vt.camera.position.y+(Ft-vt.camera.position.y)*(1-Math.exp(-6*or));vt.camera.position.set(pi,lr,Do+vt.focusZ),vt.camera.fov=Ni?(et=gn.cameraFov)!==null&&et!==void 0?et:39:(ie=gn.landscapeCameraFov)!==null&&ie!==void 0?ie:22.6199,vt.camera.lookAt((Ze=gn.lookAtX)!==null&&Ze!==void 0?Ze:0,(Re=gn.lookAtY)!==null&&Re!==void 0?Re:.15,vt.focusZ)}}return vt.camera.updateProjectionMatrix(),vt.camera.updateMatrixWorld(!0),{entry:vt,waveTime:In,victorySway:xn,poseParts:I}}function p(y,C,N,O,S,E,B){var F,q,b,M,k,V,Q,j,W,Z,re,ye,Se,ue=g(y,Td(Td({},B),{worldWidth:(W=B.worldWidth)!==null&&W!==void 0?W:S,worldHeight:(Z=B.worldHeight)!==null&&Z!==void 0?Z:E})),fe=ue.entry,Fe=ue.waveTime,ne=ue.victorySway,oe=ue.poseParts,Ue=B.bodies3d;if(N<2||O<2)return C.fillStyle=fe.skyColor,C.fillRect(0,0,S,E),fe;var Be=h();if(!Be||!((Se=(ye=(re=Be.getContext)===null||re===void 0?void 0:re.call(Be))===null||ye===void 0?void 0:ye.isContextLost)===null||Se===void 0)&&Se.call(ye))return C.fillStyle=fe.skyColor,C.fillRect(0,0,S,E),fe;var ze=Math.max(N,O,1),ht=520,Gt=ze>ht?ht/ze:1,ut=Math.max(2,Math.round(N*Gt)),wt=Math.max(2,Math.round(O*Gt)),Zt=s.width!==ut||s.height!==wt;if(Zt&&(Be.setPixelRatio(1),Be.setSize(ut,wt,!1),u.width=ut,u.height=wt,d=void 0),!fe.compiled){fe.compiled=!0;var je=[];fe.guidePool[0]&&!fe.guidePool[0].visible&&(fe.guidePool[0].visible=!0,fe.guidePool[0].position.set(0,-99,0),je.push(fe.guidePool[0]));try{for(var xt=jn(fe.confettiSystems),_t=xt.next();!_t.done;_t=xt.next()){var cn=_t.value;cn.pieces[0]&&!cn.pieces[0].visible&&(cn.pieces[0].visible=!0,cn.pieces[0].position.set(0,-99,0),je.push(cn.pieces[0]))}}catch(Oe){F={error:Oe}}finally{try{_t&&!_t.done&&(q=xt.return)&&q.call(xt)}finally{if(F)throw F.error}}Be.compile(fe.scene,fe.camera);try{for(var Pt=jn(je),$t=Pt.next();!$t.done;$t=Pt.next()){var ae=$t.value;ae.visible=!1}}catch(Oe){b={error:Oe}}finally{try{$t&&!$t.done&&(M=Pt.return)&&M.call(Pt)}finally{if(b)throw b.error}}}var hn=!1;if(Ue)try{for(var qt=jn(Ue.values()),X=qt.next();!X.done;X=qt.next()){var w=X.value;if(w.stageId===y.id&&(w.mode==="kinematic"||w.mode==="dynamic"&&(!w.atRest||w.captured))){hn=!0;break}}}catch(Oe){k={error:Oe}}finally{try{X&&!X.done&&(V=qt.return)&&V.call(qt)}finally{if(k)throw k.error}}var le=Math.floor(Fe*20),ve=fe.wavingFlags.length>0&&fe.lastFlagStep!==le,Me=ne&&Math.abs(Fe-fe.lastRenderedTime)>=.032,He=hn&&fe.lastRenderedTime!==Fe,$e=oe!==fe.lastPoseSig,Ae=Zt||d!==y.id||fe.guideDirty||fe.textureDirty||fe.lastRenderedTime<0||fe.lastRenderedW!==ut||fe.lastRenderedH!==wt||ve||Me||He||$e;if(Ae){if(fe.wavingFlags.length>0&&fe.lastFlagStep!==le){try{for(var Te=jn(fe.wavingFlags),Pe=Te.next();!Pe.done;Pe=Te.next()){var Ke=Pe.value;wb(Ke.geo,Ke.rest,le/20)}}catch(Oe){Q={error:Oe}}finally{try{Pe&&!Pe.done&&(j=Te.return)&&j.call(Te)}finally{if(Q)throw Q.error}}fe.lastFlagStep=le}Be.setClearColor(fe.skyColor,1),Be.render(fe.scene,fe.camera),s.width>0&&s.height>0&&(l.drawImage(s,0,0,ut,wt),d=y.id),fe.lastRenderedTime=Fe,fe.lastRenderedW=ut,fe.lastRenderedH=wt,fe.lastPoseSig=oe,fe.guideDirty=!1,fe.textureDirty=!1}return fe.lastWidth=S,fe.lastHeight=E,u.width>0&&u.height>0&&C.drawImage(u,0,0,S,E),fe}function D(){var y,C,N,O,S;try{for(var E=jn(a.values()),B=E.next();!B.done;B=E.next()){var F=B.value;try{for(var q=(N=void 0,jn(F.dynamicNodes.values())),b=q.next();!b.done;b=q.next()){var M=b.value;(S=M.parent)===null||S===void 0||S.remove(M)}}catch(k){N={error:k}}finally{try{b&&!b.done&&(O=q.return)&&O.call(q)}finally{if(N)throw N.error}}F.dynamicNodes.clear(),F.focusZ=0,F.lastTime=-1,F.lastRenderedTime=-1,F.lastFlagStep=-1,F.lastPoseSig="",F.guideDirty=!0,F.setGuide([])}}catch(k){y={error:k}}finally{try{B&&!B.done&&(C=E.return)&&C.call(E)}finally{if(y)throw y.error}}}function v(){var y,C,N,O,S,E,B;try{for(var F=jn(a.values()),q=F.next();!q.done;q=F.next()){var b=q.value;b.scene.traverse(function(Z){var re,ye;if(Z.isMesh&&(Z.geometry&&!Array.from(i.values()).includes(Z.geometry)&&Z.geometry.dispose(),Z.material))try{for(var Se=(re=void 0,jn(Array.isArray(Z.material)?Z.material:[Z.material])),ue=Se.next();!ue.done;ue=Se.next()){var fe=ue.value;fe.dispose()}}catch(Fe){re={error:Fe}}finally{try{ue&&!ue.done&&(ye=Se.return)&&ye.call(Se)}finally{if(re)throw re.error}}})}}catch(Z){y={error:Z}}finally{try{q&&!q.done&&(C=F.return)&&C.call(F)}finally{if(y)throw y.error}}try{for(var M=jn(i.values()),k=M.next();!k.done;k=M.next()){var V=k.value;V.dispose()}}catch(Z){N={error:Z}}finally{try{k&&!k.done&&(O=M.return)&&O.call(M)}finally{if(N)throw N.error}}try{for(var Q=jn(r.values()),j=Q.next();!j.done;j=Q.next()){var W=j.value;W.dispose()}}catch(Z){S={error:Z}}finally{try{j&&!j.done&&(E=Q.return)&&E.call(Q)}finally{if(S)throw S.error}}a.clear(),i.clear(),r.clear(),(B=o?.forceContextLoss)===null||B===void 0||B.call(o),o?.dispose(),o=void 0,s=void 0,u=void 0,l=void 0,d=void 0}return{getStage:T,syncStage:g,renderStage:p,reset:D,dispose:v}}var Wa=function(){return Wa=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Wa.apply(this,arguments)},Xr=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Yr=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Zl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},tv=function(n,e,t){return Math.max(e,Math.min(t,n))},ms=function(n,e){return Math.hypot(e.x-n.x,e.y-n.y)};function nv(n){var e=n.id,t=n.nodes,i=n.edges,r=n.gates,a=r===void 0?[]:r,s=n.onEvent,o=s===void 0?function(){}:s,u=new Map(t.map(function(M){return[M.id,Wa({},M)]})),l=new Map(i.map(function(M){return[M.id,Wa({speedScale:1,enabled:!0,bidirectional:!1,cost:0},M)]})),d=new Map(a.map(function(M){return[M.id,Wa({},M)]})),h=new Map,f=h,m=0,x=0,T=function(M){return u.get(M)},g=function(M){return Yr([],Xr(d.values()),!1).find(function(k){return k.parameters.nodeId===M})},p=function(M){var k=M.parameters;if(k.mode==="open")return!0;if(k.mode==="closed")return!1;var V=k.openSeconds+k.closedSeconds,Q=(m+k.phaseOffsetSeconds)%V;return Q<k.openSeconds},D=function(M){return Yr([],Xr(l.values()),!1).filter(function(k){return k.enabled&&(k.from===M||k.bidirectional&&k.to===M)}).sort(function(k,V){return k.id<V.id?-1:k.id>V.id?1:0})},v=function(M,k){return Yr([],Xr(l.values()),!1).find(function(V){return V.enabled&&(V.from===M&&V.to===k||V.bidirectional&&V.from===k&&V.to===M)})};function y(M,k){var V,Q,j,W;if(M===k)return[M];for(var Z=new Map([[M,0]]),re=new Map,ye=new Set([M]);ye.size;){var Se=Yr([],Xr(ye),!1).sort(function(ut,wt){return Z.get(ut)-Z.get(wt)||(ut<wt?-1:ut>wt?1:0)})[0];if(ye.delete(Se),Se===k)break;try{for(var ue=(V=void 0,Zl(D(Se))),fe=ue.next();!fe.done;fe=ue.next()){var Fe=fe.value,ne=Fe.from===Se?Fe.to:Fe.from,oe=g(ne),Ue=T(ne),Be=oe?oe.parameters.holdSeconds*90+(p(oe)?0:oe.parameters.closedSeconds*90):0,ze=Z.get(Se)+ms(T(Se),Ue)/Fe.speedScale+Fe.cost+((j=Ue.cost)!==null&&j!==void 0?j:0)+Be;ze>=((W=Z.get(ne))!==null&&W!==void 0?W:1/0)||(Z.set(ne,ze),re.set(ne,Se),ye.add(ne))}}catch(ut){V={error:ut}}finally{try{fe&&!fe.done&&(Q=ue.return)&&Q.call(ue)}finally{if(V)throw V.error}}}if(!Z.has(k))return[];for(var ht=[k],Gt=k;Gt!==M;)Gt=re.get(Gt),ht.unshift(Gt);return ht}function C(M){var k,V=M.route.length>=2&&M.segment<M.route.length-1;if(!V){var Q=(k=M.route[Math.min(M.segment,M.route.length-1)])!==null&&k!==void 0?k:M.startNode,j=y(Q,M.target);M.route=j.length?j:[Q],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var W=M.route[M.segment],Z=M.route[M.segment+1],re=ms(T(W),T(Z));if(M.arrived||M.distance>=re-1e-4){var j=y(Z,M.target);M.route=j.length?j:[Z],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var ye=y(Z,M.target);M.route=ye.length?Yr([W],Xr(ye),!1):[W,Z],M.segment=0}function N(M){var k,V=y(M.startNode,M.targetNode),Q=T(M.startNode),j=V.length>=2?T(V[1]):Q,W=V.length>=2?Math.atan2(j.y-Q.y,j.x-Q.x):0,Z=Math.floor((W%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4,re=Wa(Wa({},M),{loop:(k=M.loop)!==null&&k!==void 0?k:"none",originNode:M.startNode,destinationNode:M.targetNode,target:M.targetNode,networkId:e,route:V.length?V:[M.startNode],segment:0,distance:0,x:Q.x,y:Q.y,heading:W,frame:[0,1,2,3][Z],flipX:Math.cos(W)<0,hold:0,arrived:!1,active:M.active&&V.length>=2,blockedTicks:0,blockedEmitted:!1,speedMultiplier:1});return h.set(re.id,re),re}function O(M){if(S("pathArrive",M,M.target),M.loop==="none"){M.active=!1;return}var k=M.target,V=M.loop==="ping-pong"?k===M.destinationNode?M.originNode:M.destinationNode:k===M.originNode?M.destinationNode:M.originNode;M.startNode=k,M.target=V,M.route=y(k,V),M.segment=0,M.distance=0,M.arrived=!1,M.route.length<2&&(M.active=!1)}function S(M,k,V){o(M,{componentId:k.id,nodeId:V})}function E(M,k){var V,Q,j=M.route[M.segment+1],W=g(j);if(W&&!p(W)){M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,S("pathBlocked",M,j));return}if(!M.arrived){if(M.arrived=!0,M.segment+1===M.route.length-1){j===M.target?O(M):(M.active=!1,M.blockedEmitted||(M.blockedEmitted=!0,S("pathBlocked",M,j)));return}M.hold=Math.max((V=T(j).holdSeconds)!==null&&V!==void 0?V:0,(Q=W?.parameters.holdSeconds)!==null&&Q!==void 0?Q:0)}if(M.hold>0){M.hold=Math.max(0,M.hold-k),M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,S("pathBlocked",M,j));return}M.segment++,M.distance=0,M.arrived=!1,M.blockedTicks=0,M.blockedEmitted=!1}function B(M,k){var V,Q;if(M.spacing<=0)return k;var j=M.route[M.segment],W=M.route[M.segment+1],Z=ms(T(j),T(W)),re=Z-M.distance,ye=k;try{for(var Se=Zl(f.values()),ue=Se.next();!ue.done;ue=Se.next()){var fe=ue.value;if(!(fe.id===M.id||!fe.active||fe.route.length<2||fe.segment>=fe.route.length-1)){var Fe=fe.route[fe.segment],ne=fe.route[fe.segment+1],oe=1/0;if(Fe===j&&ne===W&&(fe.distance>M.distance||fe.distance===M.distance&&fe.id<M.id))oe=fe.distance-M.distance;else if(Fe===W)oe=re+fe.distance;else if(ne===W&&Fe!==j){var Ue=ms(T(Fe),T(ne))-fe.distance;Ue<M.spacing&&(Ue<re||Ue===re&&fe.id<M.id)&&(oe=re)}oe<1/0&&(ye=Math.min(ye,Math.max(0,oe-M.spacing)))}}}catch(Be){V={error:Be}}finally{try{ue&&!ue.done&&(Q=Se.return)&&Q.call(Se)}finally{if(V)throw V.error}}return ye}function F(M){var k=T(M.route[M.segment]),V=T(M.route[M.segment+1]),Q=ms(k,V),j=tv(M.distance/Math.max(1e-4,Q),0,1),W=k.x+(V.x-k.x)*j,Z=k.y+(V.y-k.y)*j,re=Math.atan2(V.y-k.y,V.x-k.x),ye=Math.min(M.cornerRadius,Q/3),Se=M.route[M.segment+2];if(ye>0&&Se){var ue=T(Se),fe=ms(V,ue),Fe=Math.min(ye,fe/3);if(M.distance>Q-ye){var ne={x:V.x-(V.x-k.x)/Q*ye,y:V.y-(V.y-k.y)/Q*ye},oe={x:V.x+(ue.x-V.x)/fe*Fe,y:V.y+(ue.y-V.y)/fe*Fe},Ue=tv((M.distance-(Q-ye))/(ye*2),0,.5),Be=1-Ue;W=Be*Be*ne.x+2*Be*Ue*V.x+Ue*Ue*oe.x,Z=Be*Be*ne.y+2*Be*Ue*V.y+Ue*Ue*oe.y;var ze=2*Be*(V.x-ne.x)+2*Ue*(oe.x-V.x),ht=2*Be*(V.y-ne.y)+2*Ue*(oe.y-V.y);Math.abs(ze)+Math.abs(ht)>.001&&(re=Math.atan2(ht,ze))}}return{x:W,y:Z,heading:re}}function q(M){var k,V,Q,j;m+=M,x++;var W=Yr([],Xr(h.values()),!1).sort(function(je,xt){return je.id<xt.id?-1:je.id>xt.id?1:0}),Z=W.length?x%W.length:0,re=Yr(Yr([],Xr(W.slice(Z)),!1),Xr(W.slice(0,Z)),!1);try{for(var ye=Zl(re),Se=ye.next();!Se.done;Se=ye.next()){var ue=Se.value;if(!(!ue.active||ue.route.length<2||ue.segment>=ue.route.length-1)){var fe=ue.route[ue.segment],Fe=ue.route[ue.segment+1],ne=ms(T(fe),T(Fe));if(!(ue.distance>=ne-1e-4&&(E(ue,M),!ue.active||ue.route.length<2||ue.segment>=ue.route.length-1))){var oe=ue.route[ue.segment],Ue=ue.route[ue.segment+1],Be=ms(T(oe),T(Ue)),ze=Be-ue.distance,ht=(j=(Q=v(oe,Ue))===null||Q===void 0?void 0:Q.speedScale)!==null&&j!==void 0?j:1,Gt=Math.min(ze,ue.speed*ht*Math.max(0,ue.speedMultiplier)*M),ut=B(ue,Gt);ut<=1e-4?(ue.blockedTicks++,ue.blockedTicks>=30&&!ue.blockedEmitted&&(ue.blockedEmitted=!0,S("pathBlocked",ue,Ue))):(ue.distance+=ut,ue.blockedTicks=0,ue.blockedEmitted=!1);var wt=F(ue);ue.x=wt.x,ue.y=wt.y,ue.heading=wt.heading;var Zt=Math.floor((ue.heading%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4;ue.frame=[0,1,2,3][Zt],ue.flipX=Math.cos(ue.heading)<0}}}}catch(je){k={error:je}}finally{try{Se&&!Se.done&&(V=ye.return)&&V.call(ye)}finally{if(k)throw k.error}}}function b(){return{id:e,nodeCount:u.size,edgeCount:l.size,activeAgents:Yr([],Xr(h.values()),!1).filter(function(M){return M.active}).length,queuedAgents:Yr([],Xr(h.values()),!1).filter(function(M){return M.active&&M.blockedTicks>0}).length,agents:Yr([],Xr(h.values()),!1).map(function(M){var k;return{id:M.id,x:M.x,y:M.y,heading:M.heading,frame:(k=M.frame)!==null&&k!==void 0?k:0,flipX:!!M.flipX,active:M.active,targetNode:M.target,route:Yr([],Xr(M.route),!1),segment:M.segment,distance:M.distance,blocked:M.blockedTicks>0}})}}return{addAgent:N,removeAgent:function(M){return h.delete(M)},getAgent:function(M){return h.get(M)},setTarget:function(M,k){var V=h.get(M);return!V||!T(k)?!1:(V.target=k,V.destinationNode=k,V.active=!0,C(V),!0)},setEdge:function(M,k,V){var Q,j,W=l.get(M);if(!W)return!1;W.enabled=k,V!==void 0&&(W.cost=V);try{for(var Z=Zl(h.values()),re=Z.next();!re.done;re=Z.next()){var ye=re.value;C(ye)}}catch(Se){Q={error:Se}}finally{try{re&&!re.done&&(j=Z.return)&&j.call(Z)}finally{if(Q)throw Q.error}}return!0},setGate:function(M,k,V){var Q,j,W=d.get(M);if(!W)return!1;W.parameters=Wa(Wa({},W.parameters),{mode:k,holdSeconds:V});try{for(var Z=Zl(h.values()),re=Z.next();!re.done;re=Z.next()){var ye=re.value;C(ye)}}catch(Se){Q={error:Se}}finally{try{re&&!re.done&&(j=Z.return)&&j.call(Z)}finally{if(Q)throw Q.error}}return!0},tick:q,snapshot:b}}var Jl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Ed=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ad=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Id={A:["01110","10001","10001","11111","10001","10001","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],C:["01111","10000","10000","10000","10000","10000","01111"],D:["11110","10001","10001","10001","10001","10001","11110"],E:["11111","10000","10000","11110","10000","10000","11111"],F:["11111","10000","10000","11110","10000","10000","10000"],G:["01111","10000","10000","10111","10001","10001","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],I:["11111","00100","00100","00100","00100","00100","11111"],J:["00111","00010","00010","00010","10010","10010","01100"],K:["10001","10010","10100","11000","10100","10010","10001"],L:["10000","10000","10000","10000","10000","10000","11111"],M:["10001","11011","10101","10101","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"],O:["01110","10001","10001","10001","10001","10001","01110"],P:["11110","10001","10001","11110","10000","10000","10000"],Q:["01110","10001","10001","10001","10101","10010","01101"],R:["11110","10001","10001","11110","10100","10010","10001"],S:["01111","10000","10000","01110","00001","00001","11110"],T:["11111","00100","00100","00100","00100","00100","00100"],U:["10001","10001","10001","10001","10001","10001","01110"],V:["10001","10001","10001","10001","10001","01010","00100"],W:["10001","10001","10001","10101","10101","10101","01010"],X:["10001","10001","01010","00100","01010","10001","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],Z:["11111","00001","00010","00100","01000","10000","11111"],0:["01110","10001","10011","10101","11001","10001","01110"],1:["00100","01100","00100","00100","00100","00100","01110"],2:["01110","10001","00001","00010","00100","01000","11111"],3:["11110","00001","00001","01110","00001","00001","11110"],4:["00010","00110","01010","10010","11111","00010","00010"],5:["11111","10000","10000","11110","00001","00001","11110"],6:["01110","10000","10000","11110","10001","10001","01110"],7:["11111","00001","00010","00100","01000","01000","01000"],8:["01110","10001","10001","01110","10001","10001","01110"],9:["01110","10001","10001","01111","00001","00001","01110"],"!":["00100","00100","00100","00100","00100","00000","00100"],"?":["01110","10001","00001","00010","00100","00000","00100"],".":["00000","00000","00000","00000","00000","00110","00110"],",":["00000","00000","00000","00000","00110","00110","00100"],":":["00000","00110","00110","00000","00110","00110","00000"],"+":["00000","00100","00100","11111","00100","00100","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],"/":["00001","00010","00010","00100","01000","01000","10000"],"'":["00100","00100","00000","00000","00000","00000","00000"]," ":["000","000","000","000","000","000","000"]},$l=function(n){var e,t,i,r,a=0;try{for(var s=Jl(n),o=s.next();!o.done;o=s.next()){var u=o.value;a+=((r=(i=Id[u])===null||i===void 0?void 0:i[0].length)!==null&&r!==void 0?r:5)+1}}catch(l){e={error:l}}finally{try{o&&!o.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}return Math.max(0,a-1)},Tb=function(n,e){var t,i,r=[],a="";try{for(var s=Jl(n),o=s.next();!o.done;o=s.next()){var u=o.value;a&&$l(a+u)>e&&(r.push(a),a=""),a+=u}}catch(l){t={error:l}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(t)throw t.error}}return a&&r.push(a),r};function Eb(n,e,t){var i,r,a,s,o;t===void 0&&(t=1);var u=Math.max(1,Math.floor(e/Math.max(1,t))),l=[];try{for(var d=Jl(String(n).toUpperCase().split(`
`)),h=d.next();!h.done;h=d.next()){var f=h.value,m=f.split(/\s+/).filter(Boolean);if(!m.length){l.push("");continue}var x="";try{for(var T=(a=void 0,Jl(m)),g=T.next();!g.done;g=T.next()){var p=g.value;if($l(p)>u){x&&l.push(x);var D=Tb(p,u);l.push.apply(l,Ad([],Ed(D.slice(0,-1)),!1)),x=(o=D.at(-1))!==null&&o!==void 0?o:""}else{var v=x?x+" "+p:p;$l(v)<=u?x=v:(x&&l.push(x),x=p)}}}catch(y){a={error:y}}finally{try{g&&!g.done&&(s=T.return)&&s.call(T)}finally{if(a)throw a.error}}x&&l.push(x)}}catch(y){i={error:y}}finally{try{h&&!h.done&&(r=d.return)&&r.call(d)}finally{if(i)throw i.error}}return l}var iv=function(n){var e,t=Math.max(0,(e=n.padding)!==null&&e!==void 0?e:4),i=n.pixelPanel&&n.padding===void 0;return{x:i?8:t,y:i?4:t}},Ab=function(n,e,t,i){var r,a=e.wrap===!1?String(n).toUpperCase().split(`
`):Eb(n,i,t),s=a.slice(0,16),o=Math.round(t*8*((r=e.lineHeight)!==null&&r!==void 0?r:1.2));return{allLines:a,lines:s,renderedWidth:Math.max.apply(Math,Ad([0],Ed(s.map(function(u){return $l(u)*t})),!1)),renderedHeight:(s.length-1)*o+7*t}};function Gf(n,e){for(var t,i=iv(e),r=Math.max(0,e.width-2*i.x),a=Math.max(0,e.height-2*i.y),s=Math.max(1,Math.floor(e.fontSize/8)),o=e.autoFit===!1?s:Math.min(s,Math.max(1,Math.ceil(((t=e.minFontSize)!==null&&t!==void 0?t:12)/8))),u=Ad([],Ed(new Set(Ad([],Ed(String(n).toUpperCase()),!1).filter(function(x){return x!==`
`&&!Id[x]}))),!1),l,d=s;d>=o;d--){var h=Ab(n,e,d,r),f=h.renderedWidth>r,m=h.allLines.length>16||h.renderedHeight>a;if(l={lines:h.lines,scale:d,fontSize:d*8,renderedWidth:h.renderedWidth,renderedHeight:h.renderedHeight,overflowsWidth:f,overflowsHeight:m,unsupportedChars:u},e.autoFit===!1||!f&&!m)break}return l}function rv(n,e,t){var i,r=Gf(e,t),a=r.lines,s=r.scale,o=iv(t),u=Math.max(0,t.width-2*o.x),l=Math.max(0,t.height-2*o.y),d=Math.round(r.fontSize*((i=t.lineHeight)!==null&&i!==void 0?i:1.2)),h=o.y+(l-r.renderedHeight)/2;return n.fillStyle=t.color,a.forEach(function(f,m){var x,T,g,p=$l(f)*s,D=t.align==="left"?o.x:t.align==="right"?t.width-p-o.x:o.x+(u-p)/2,v=D;try{for(var y=Jl(f),C=y.next();!C.done;C=y.next()){var N=C.value,O=(g=Id[N])!==null&&g!==void 0?g:Id["?"];O.forEach(function(S,E){for(var B=0;B<S.length;B++)S[B]==="1"&&n.fillRect(Math.round(v+B*s),Math.round(h+m*d+E*s),s,s)}),v+=(O[0].length+1)*s}}catch(S){x={error:S}}finally{try{C&&!C.done&&(T=y.return)&&T.call(y)}finally{if(x)throw x.error}}}),r}var Aa=function(){return Aa=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Aa.apply(this,arguments)},Wf=Math.PI*2,fi=function(n,e){return((Math.imul(n+1,2654435769)^Math.imul(e,2246822507))>>>0)/4294967296};function Xf(n,e,t){var i,r,a=[n.color,n.color2,n.color3].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(u,l){var d,h,f=o+((l+.2+fi(l,1)*.6)/n.count-.5)*s,m=n.speed*(.42+.65*fi(l,2));return Aa(Aa({},e),{clipId:t,shape:"pixel-confetti",age:-.12*fi(l,3),vx:Math.cos(f)*m,vy:Math.sin(f)*m,gravity:(d=n.gravity)!==null&&d!==void 0?d:250,life:((h=n.lifetime)!==null&&h!==void 0?h:.7)*(.6+.4*fi(l,4)),color:a[l%a.length],size:3+Math.floor(3*fi(l,5)),angle:Wf*fi(l,6),spin:(fi(l,7)-.5)*12})})}function av(n){var e=Math.min(12,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return Xf(n).map(function(r,a){return Aa(Aa({},r),{screen:!0,x:(a%e+.15+.7*fi(a,8))/e,y:(Math.floor(a/e)+.15+.7*fi(a,9))/t,vx:i*(fi(a,10)-.5)*.7,vy:i*(.3+.5*fi(a,11)),size:r.size+1})})}var Rd=function(n,e){return(n%e+e)%e};function sv(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,u=e.life,l=e.gravity,d=e.size,h=e.angle,f=e.spin,m=e.color;if(!(o<0)){var x=a*o,T=s*o+l*o*o/2,g=Math.round(t?t.x+Rd(i*t.width+x,t.width):i+x),p=Math.round(t?t.y+Rd(r*t.height+T,t.height):r+T),D=Math.round((h+f*o)/(Math.PI/4))&3;if(n.globalAlpha*=Math.min(1,(u-o)*4),n.fillStyle="#3c293388",D===0)n.fillRect(g-d+1,p+1,d*2+1,d+1);else if(D===2)n.fillRect(g+1,p-d+1,d+1,d*2+1);else for(var v=-1;v<=1;v++)n.fillRect(g+v*d+1,p+v*d*(D===1?1:-1)+1,d+1,d+1);if(n.fillStyle=m,D===0)n.fillRect(g-d,p,d*2,d);else if(D===2)n.fillRect(g,p-d,d,d*2);else for(var v=-1;v<=1;v++)n.fillRect(g+v*d,p+v*d*(D===1?1:-1),d,d)}}function Yf(n,e,t){var i,r,a=[n.color,n.color2,n.color3,"#ff6b6b","#4ecdc4","#fff3b0"].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(u,l){var d,h,f=o+((l+.2+fi(l,11)*.6)/n.count-.5)*s,m=n.speed*(.45+.65*fi(l,12));return Aa(Aa({},e),{clipId:t,shape:"confetti",age:-.15*fi(l,13),vx:Math.cos(f)*m,vy:Math.sin(f)*m,gravity:(d=n.gravity)!==null&&d!==void 0?d:140,life:((h=n.lifetime)!==null&&h!==void 0?h:2.6)*(.75+.35*fi(l,14)),color:a[l%a.length],size:5+Math.floor(5*fi(l,15)),kind:l%5===0?"star":"ribbon",angle:Wf*fi(l,16),spin:(fi(l,17)-.5)*5.5,flutter:1.6+2.2*fi(l,18),phase:Wf*fi(l,19)})})}function ov(n){var e=Math.min(14,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return Yf(n,{x:0,y:0}).map(function(r,a){var s;return Aa(Aa({},r),{screen:!0,x:(a%e+.12+.76*fi(a,20))/e,y:(Math.floor(a/e)+.08+.84*fi(a,21))/t,vx:i*(fi(a,22)-.5)*.65,vy:i*(.38+.55*fi(a,23)),gravity:Math.min((s=n.gravity)!==null&&s!==void 0?s:90,90)})})}function lv(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,u=e.life,l=e.gravity,d=e.size,h=e.angle,f=e.spin,m=e.flutter,x=e.phase,T=e.color,g=e.kind;if(!(o<0)){var p=Math.sin(o*m+x)*14,D=a*o+p,v=s*o+l*o*o/2,y=t?t.x+Rd(i*t.width+D,t.width):i+D,C=t?t.y+Rd(r*t.height+v,t.height):r+v,N=Math.min(1,o*2.8,(u-o)*2.2);if(!(N<=0)){n.save(),n.globalAlpha*=N,n.translate(y,C),n.rotate(h+f*o);var O=Math.cos(o*m*1.4+x);if(n.scale(1,Math.max(.22,Math.abs(O))),n.fillStyle=T,g==="star"){var S=d*.85;n.beginPath();for(var E=0;E<8;E++){var B=E%2===0?S:S*.38,F=E*Math.PI/4;E===0?n.moveTo(Math.cos(F)*B,Math.sin(F)*B):n.lineTo(Math.cos(F)*B,Math.sin(F)*B)}n.closePath(),n.fill()}else n.fillRect(-d*.7,-d*.34,d*1.4,d*.68),n.fillStyle="#ffffff55",n.fillRect(-d*.7,-d*.34,d*1.4,d*.2);n.restore()}}}function cv(n,e,t,i,r){var a=e.width,s=e.height;if(!(a<=0||s<=0)){var o=Math.min(3,Math.floor(Math.min(a,s)/8));if(!o){n.fillStyle=t,n.fillRect(0,0,a,s);return}var u=i?o*2:0,l=s-(i?o:o*3),d=r>=0?.5+.5*Math.sin(r*4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd05a99",n.shadowBlur=8+d*9,n.fillStyle=t,n.fillRect(o,u+o,a-2*o,s-u-2*o),n.restore()),n.fillStyle=e.stroke,n.fillRect(o,0,a-2*o,s),n.fillRect(0,o,a,s-2*o),n.fillStyle=t,n.fillRect(o,u+o,a-2*o,s-u-2*o),n.fillStyle="#431d1380",n.fillRect(o,l,a-2*o,s-o-l),n.fillStyle=e.enabled?"#fff4be":"#ffffff55",n.fillRect(2*o,u+o,a-4*o,i?o:o*2),n.fillStyle="#ffffff55",n.fillRect(o,u+3*o,o,Math.max(0,l-u-3*o)),n.fillStyle="#521b2444",n.fillRect(a-2*o,u+3*o,o,Math.max(0,l-u-3*o));var h=r>=0?r%1.9:-1,f=(h-.1)/.55;if(e.enabled&&!i&&f>=0&&f<1){n.save(),n.beginPath(),n.rect(2*o,u+3*o,a-4*o,Math.max(0,l-u-3*o)),n.clip();for(var m=Math.floor(((a+14*o)*f-6*o)/o)*o,x=u+3*o,T=0;x<l;x+=o,T++){var g=m-Math.floor(T/2)*o;n.fillStyle="#fff4be44",n.fillRect(g-2*o,x,9*o,o),n.fillStyle="#fffef0aa",n.fillRect(g,x,4*o,o)}n.restore()}if(e.enabled&&!i&&r>=0){var p=Math.max(0,Math.sin(r*4.2)),D=Math.max(0,Math.sin(r*4.2+2.2)),v=function(y,C,N){if(!(N<.25)){n.save(),n.globalAlpha*=N*.95,n.fillStyle="#fffef4";var O=N>.65?o*2:o;n.fillRect(Math.round(y-O),Math.round(C-o/2),O*2+o,o),n.fillRect(Math.round(y-o/2),Math.round(C-O),o,O*2+o),n.restore()}};v(5*o,u+4*o,p),v(a-6*o,u+5*o,D)}}}function Cd(n,e,t,i,r,a){var s=Math.max(0,Math.min(a,i/2,r/2));n.beginPath(),typeof n.roundRect=="function"?n.roundRect(e,t,i,r,s):(n.moveTo(e+s,t),n.arcTo(e+i,t,e+i,t+r,s),n.arcTo(e+i,t+r,e,t+r,s),n.arcTo(e,t+r,e,t,s),n.arcTo(e,t,e+i,t,s),n.closePath())}function Hf(n,e,t,i,r){if(!(r<=.02||i<=.5)){n.save(),n.translate(e,t),n.globalAlpha*=r,n.fillStyle="#fffef0",n.beginPath();for(var a=0;a<8;a++){var s=a%2===0?i:i*.24,o=a*Math.PI/4;a===0?n.moveTo(Math.cos(o)*s,Math.sin(o)*s):n.lineTo(Math.cos(o)*s,Math.sin(o)*s)}n.closePath(),n.fill(),n.restore()}}function uv(n,e,t,i,r){var a,s,o,u=e.width,l=e.height;if(!(u<=0||l<=0)){var d=Math.min((a=e.radius)!==null&&a!==void 0?a:16,u/2,l/2),h=i?2:6,f=i?3:0,m=r>=0?.5-.5*Math.cos(r*2.4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd23f99",n.shadowBlur=10+m*12,Cd(n,0,f,u,l-f,d),n.fillStyle=t,n.fill(),n.restore()),n.save(),Cd(n,0,f+2,u,Math.max(4,l-f-2),d),n.fillStyle="#0e2830",n.fill(),n.restore(),n.save(),Cd(n,0,f,u,Math.max(4,l-h),d),n.fillStyle=t,n.fill(),n.clip();var x=(s=n.createLinearGradient)===null||s===void 0?void 0:s.call(n,0,f,0,l-h);if(x?.addColorStop&&(x.addColorStop(0,"#ffffffa8"),x.addColorStop(.42,"#ffffff26"),x.addColorStop(.45,"#00000000"),x.addColorStop(1,"#00000024"),n.fillStyle=x,n.fillRect(0,f,u,l-h)),n.fillStyle="#fffef0bb",n.fillRect(d*.55,f+3,Math.max(0,u-d*1.1),3),e.enabled&&!i&&r>=0){var T=(r%2.4-.15)/.95;if(T>0&&T<1){var g=T*T*(3-2*T),p=Math.sin(T*Math.PI),D=-u*.36+u*1.72*g;n.save(),n.globalAlpha*=p,n.translate(D,f),n.transform(1,0,-.36,1,0,0);var v=(o=n.createLinearGradient)===null||o===void 0?void 0:o.call(n,-48,0,48,0);v?.addColorStop?(v.addColorStop(0,"#ffffff00"),v.addColorStop(.32,"#ffffff48"),v.addColorStop(.5,"#fffef8cc"),v.addColorStop(.68,"#ffffff48"),v.addColorStop(1,"#ffffff00"),n.fillStyle=v,n.fillRect(-48,0,96,l)):(n.fillStyle="#fffef8a8",n.fillRect(-14,0,28,l)),n.restore()}}if(n.restore(),e.strokeWidth&&(n.save(),Cd(n,0,f,u,Math.max(4,l-h),d),n.strokeStyle=e.stroke,n.lineWidth=e.strokeWidth,n.stroke(),n.restore()),e.enabled&&!i&&r>=0){var y=Math.max(0,Math.sin(r*2.4)),C=y*y,N=Math.max(0,Math.sin(r*2.4+2.1)),O=N*N,S=Math.max(0,Math.sin(r*2.4+4.2)),E=S*S;Hf(n,u*.12,f+9,4+C*6,C*.92),Hf(n,u*.88,f+10,3.8+O*5.5,O*.9),Hf(n,u*.76,Math.max(f+14,l-h-8),3+E*4.2,E*.8)}}}function Pd(n){if(/\s/.test(n)||n.length>512)return!1;var e=/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,9}$/,t=/^https:\/\/apps\.apple\.com\/([a-z]{2}\/)?app\/([a-zA-Z0-9-]+\/)?id[1-9][0-9]{5,19}$/;return e.test(n)&&!/id=example\.|[.=]placeholder(\.|$)|id=com\.example(\.|$)/.test(n)||t.test(n)}var Kl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Ql=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},qf=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function dv(n){var e,t,i;n===void 0&&(n={});var r=(e=n.timeoutMs)!==null&&e!==void 0?e:5e3,a=(t=n.pollMs)!==null&&t!==void 0?t:25;if(![r,a].every(function(j){return Number.isFinite(j)&&j>=1&&j<=6e4}))throw Error("Invalid Unity host deadline/poll interval");var s=(i=n.getHost)!==null&&i!==void 0?i:(function(){return window.mraid}),o=new Set,u=new Set,l=[],d={},h=!1,f=!1,m=!1,x=!1,T=!1,g=!1,p,D,v,y,C,N,O=function(){return m||x};function S(){var j,W,Z;clearTimeout(C),clearTimeout(N);try{for(var re=Kl(l.splice(0)),ye=re.next();!ye.done;ye=re.next()){var Se=Ql(ye.value,2),ue=Se[0],fe=Se[1];try{(Z=d.mraid)===null||Z===void 0||Z.removeEventListener(ue,fe)}catch{}}}catch(Fe){j={error:Fe}}finally{try{ye&&!ye.done&&(W=re.return)&&W.call(re)}finally{if(j)throw j.error}}}function E(j){y?.(j instanceof Error?j:Error(String(j))),v=void 0,y=void 0}function B(j){var W,Z;if(!O()){var re=h;if(m=!0,h=!1,f=!1,S(),E(j),re)try{for(var ye=Kl(qf([],Ql(u),!1)),Se=ye.next();!Se.done;Se=ye.next()){var ue=Se.value;ue()}}catch(fe){W={error:fe}}finally{try{Se&&!Se.done&&(Z=ye.return)&&Z.call(ye)}finally{if(W)throw W.error}}o.clear(),u.clear()}}function F(j,W){return l.push([j,W]),d.mraid.addEventListener(j,W),q(j,W)}function q(j,W){if(O()){try{d.mraid.removeEventListener(j,W)}catch{}return!1}return!0}function b(j){var W,Z;if(!O()){if(typeof j!="boolean"){B(Error("Invalid Unity viewability event"));return}if(!h){p=j;return}if(f!==j){f=j;try{for(var re=Kl(qf([],Ql(o),!1)),ye=re.next();!ye.done;ye=re.next()){var Se=ye.value;if(O())break;Se(f)}}catch(ue){W={error:ue}}finally{try{ye&&!ye.done&&(Z=re.return)&&Z.call(re)}finally{if(W)throw W.error}}}}}var M=function(j){j==="hidden"&&B(Error("Unity host closed"))},k=function(){var j;h&&!O()&&((j=n.onResize)===null||j===void 0||j.call(n))};function V(){var j,W,Z,re;if(!(!T||h||g||O())){g=!0;try{var ye=d.mraid.getState();if(O()||ye==="loading")return;if(ye==="hidden")throw Error("Unity host closed before ready");if(!["default","expanded","resized"].includes(ye))throw Error("Invalid Unity host state");var Se=d.mraid.getVersion();if(O())return;if(Se!=="3.0")throw Error("Unity Ads UA requires MRAID 3.0");try{for(var ue=Kl([["viewableChange",b],["stateChange",M],["sizeChange",k]]),fe=ue.next();!fe.done;fe=ue.next()){var Fe=Ql(fe.value,2),ne=Fe[0],oe=Fe[1];if(!F(ne,oe))return}}catch(Gt){j={error:Gt}}finally{try{fe&&!fe.done&&(W=ue.return)&&W.call(ue)}finally{if(j)throw j.error}}var Ue=d.mraid.isViewable();if(O())return;if(typeof Ue!="boolean")throw Error("Invalid Unity initial viewability");f=p??Ue,h=!0,clearTimeout(C),clearTimeout(N),v?.(),v=void 0,y=void 0;try{for(var Be=Kl(qf([],Ql(o),!1)),ze=Be.next();!ze.done;ze=Be.next()){var ht=ze.value;if(O())break;ht(f)}}catch(Gt){Z={error:Gt}}finally{try{ze&&!ze.done&&(re=Be.return)&&re.call(Be)}finally{if(Z)throw Z.error}}}catch(Gt){B(Gt)}finally{g=!1}}}function Q(){if(!O())try{var j=s();if(O())return;if(!j){N=setTimeout(Q,a);return}if(d.mraid=j,l.push(["ready",V]),d.mraid.addEventListener("ready",V),!q("ready",V))return;T=!0,V()}catch(W){B(W)}}return{init:function(){return D||(D=new Promise(function(j,W){v=j,y=W}),O()?(E(Error("Unity bridge destroyed")),D):(C=setTimeout(function(){return B(Error("Unity MRAID readiness timed out"))},r),Q(),D))},isReady:function(){return h&&!O()},isVisible:function(){return h&&f&&!O()},isClosed:O,onVisibilityChanged:function(j){return O()||o.add(j),function(){return o.delete(j)}},onClosed:function(j){return O()||u.add(j),function(){return u.delete(j)}},openStore:function(j){if(!h||!f||O()||!Pd(j))throw Error("Unity store request not permitted");d.mraid.open(j)},destroy:function(){x||(x=!0,h=!1,f=!1,S(),E(Error("Unity bridge destroyed")),o.clear(),u.clear())}}}var Po=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Lo=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Zf=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function hv(n){var e;n===void 0&&(n={});var t=(e=n.getHost)!==null&&e!==void 0?e:(function(){return window.mraid}),i,r=!1,a=!1,s=!1,o=!1,u=!1,l,d,h,f,m,x=new Set,T=new Set,g=[];function p(){var F,q;clearTimeout(f),clearTimeout(m);try{for(var b=Po(g.splice(0)),M=b.next();!M.done;M=b.next()){var k=Lo(M.value,2),V=k[0],Q=k[1];try{i?.removeEventListener(V,Q)}catch{}}}catch(j){F={error:j}}finally{try{M&&!M.done&&(q=b.return)&&q.call(b)}finally{if(F)throw F.error}}}function D(F,q){if(g.push([F,q]),i.addEventListener(F,q),s||o){try{i.removeEventListener(F,q)}catch{}return!1}return!0}function v(F){var q=F instanceof Error?F:Error(String(F));h?.(q),d=void 0,h=void 0}function y(F,q){var b,M;if(!(s||o)&&(s=!0,r=!1,a=!1,p(),v(F),q))try{for(var k=Po(Zf([],Lo(T),!1)),V=k.next();!V.done;V=k.next()){var Q=V.value;Q()}}catch(j){b={error:j}}finally{try{V&&!V.done&&(M=k.return)&&M.call(k)}finally{if(b)throw b.error}}}function C(){var F,q,b,M;if(!(!u||r||s||o))try{var k=i.getState();if(s||o||k==="loading")return;if(k==="hidden"){y(Error("MRAID closed before ready"),!0);return}if(!["default","expanded","resized"].includes(k))throw Error("Invalid MRAID state");try{for(var V=Po([["viewableChange",O],["stateChange",S],["sizeChange",E]]),Q=V.next();!Q.done;Q=V.next()){var j=Lo(Q.value,2),W=j[0],Z=j[1];if(!D(W,Z))return}}catch(ue){F={error:ue}}finally{try{Q&&!Q.done&&(q=V.return)&&q.call(V)}finally{if(F)throw F.error}}var re=i.isViewable();if(s||o)return;if(typeof re!="boolean")throw Error("Invalid MRAID viewability");a=re,r=!0,clearTimeout(f),clearTimeout(m),d?.(),d=void 0,h=void 0;try{for(var ye=Po(Zf([],Lo(x),!1)),Se=ye.next();!Se.done;Se=ye.next()){var Z=Se.value;Z(a)}}catch(ue){b={error:ue}}finally{try{Se&&!Se.done&&(M=ye.return)&&M.call(ye)}finally{if(b)throw b.error}}}catch(ue){y(ue,r)}}var N=function(){return C()},O=function(F){var q,b;if(!(!r||s||o)){if(typeof F!="boolean"){y(Error("Invalid MRAID visibility event"),!0);return}a=F;try{for(var M=Po(Zf([],Lo(x),!1)),k=M.next();!k.done;k=M.next()){var V=k.value;V(a)}}catch(Q){q={error:Q}}finally{try{k&&!k.done&&(b=M.return)&&b.call(M)}finally{if(q)throw q.error}}}},S=function(F){F==="hidden"&&y(Error("MRAID closed"),!0)},E=function(){var F;r&&!s&&!o&&((F=n.onResize)===null||F===void 0||F.call(n))};function B(){var F,q,b;if(!(s||o))try{if(i=t(),s||o)return;if(!i){m=setTimeout(B,(b=n.pollMs)!==null&&b!==void 0?b:50);return}if(![i.getState,i.isViewable,i.addEventListener,i.removeEventListener,i.open].every(function(W){return typeof W=="function"}))throw Error("Incomplete MRAID 2 interface");try{for(var M=Po([["ready",N]]),k=M.next();!k.done;k=M.next()){var V=Lo(k.value,2),Q=V[0],j=V[1];if(!D(Q,j))return}}catch(W){F={error:W}}finally{try{k&&!k.done&&(q=M.return)&&q.call(M)}finally{if(F)throw F.error}}u=!0,C()}catch(W){y(W,!1)}}return{init:function(){var F;return l||(l=new Promise(function(q,b){d=q,h=b}),s||o?(v(Error("MRAID bridge destroyed")),l):(f=setTimeout(function(){return y(Error("MRAID readiness timed out"),!1)},(F=n.timeoutMs)!==null&&F!==void 0?F:5e3),B(),l))},isReady:function(){return r&&!s&&!o},isVisible:function(){return a&&r&&!s&&!o},isClosed:function(){return s||o},onVisibilityChanged:function(F){return!s&&!o&&x.add(F),function(){return x.delete(F)}},onClosed:function(F){return!s&&!o&&T.add(F),function(){return T.delete(F)}},openStore:function(F){if(!r||!a||s||o||!Pd(F))throw Error("MRAID store request not permitted");i.open(F)},destroy:function(){o||(o=!0,r=!1,a=!1,p(),v(Error("MRAID bridge destroyed")),x.clear(),T.clear())}}}var Fs=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Os=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},jl=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function fv(n){n===void 0&&(n={});var e=new Set,t=new Set,i=new Set,r=[],a,s=!1,o=!1,u=!1,l=!1,d,h,f,m,x,T=function(){return u||l};function g(){var E,B;clearTimeout(m),clearTimeout(x);try{for(var F=Fs(r.splice(0)),q=F.next();!q.done;q=F.next()){var b=Os(q.value,2),M=b[0],k=b[1];try{a?.removeEventListener(M,k)}catch{}}}catch(V){E={error:V}}finally{try{q&&!q.done&&(B=F.return)&&B.call(F)}finally{if(E)throw E.error}}}function p(E){var B,F;if(!T()){u=!0,s=!1,o=!1,g(),f?.(E instanceof Error?E:Error(String(E))),h=void 0,f=void 0;try{for(var q=Fs(jl([],Os(t),!1)),b=q.next();!b.done;b=q.next()){var M=b.value;M()}}catch(k){B={error:k}}finally{try{b&&!b.done&&(F=q.return)&&F.call(q)}finally{if(B)throw B.error}}}}var D=function(E){if(!(typeof E!="number"||!Number.isFinite(E)||E<0))return Math.min(1,E>1?E/100:E)},v=function(E){if(typeof E=="boolean")return E;if(E&&typeof E=="object"&&typeof E.isViewable=="boolean")return E.isViewable},y=function(){var E,B,F,q,b,M;if(!(s||T()||!a||((b=a.isReady)===null||b===void 0?void 0:b.call(a))===!1))try{o=a.isViewable();var k=(M=a.getAudioVolume)===null||M===void 0?void 0:M.call(a),V=k===void 0?void 0:D(k);if(typeof o!="boolean"||k!==void 0&&V===void 0)throw Error("Invalid DAPI initial state");if(s=!0,clearTimeout(m),clearTimeout(x),h?.(),h=void 0,f=void 0,V!==void 0)try{for(var Q=Fs(jl([],Os(i),!1)),j=Q.next();!j.done;j=Q.next()){var W=j.value;W(V)}}catch(ye){E={error:ye}}finally{try{j&&!j.done&&(B=Q.return)&&B.call(Q)}finally{if(E)throw E.error}}try{for(var Z=Fs(jl([],Os(e),!1)),re=Z.next();!re.done;re=Z.next()){var W=re.value;W(o)}}catch(ye){F={error:ye}}finally{try{re&&!re.done&&(q=Z.return)&&q.call(Z)}finally{if(F)throw F.error}}}catch(ye){p(ye)}},C=function(E){var B,F;if(!T()){var q=v(E);if(q===void 0){p(Error("Invalid DAPI visibility"));return}o=q;try{for(var b=Fs(jl([],Os(e),!1)),M=b.next();!M.done;M=b.next()){var k=M.value;k(q)}}catch(V){B={error:V}}finally{try{M&&!M.done&&(F=b.return)&&F.call(b)}finally{if(B)throw B.error}}}},N=function(E){var B,F;if(!T()){var q=D(E);if(q===void 0){p(Error("Invalid DAPI volume"));return}try{for(var b=Fs(jl([],Os(i),!1)),M=b.next();!M.done;M=b.next()){var k=M.value;k(q)}}catch(V){B={error:V}}finally{try{M&&!M.done&&(F=b.return)&&F.call(b)}finally{if(B)throw B.error}}}},O=function(){var E;s&&!T()&&((E=n.onResize)===null||E===void 0||E.call(n))};function S(){var E,B,F;if(!T()){if(a=window.dapi,!a){x=setTimeout(S,(F=n.pollMs)!==null&&F!==void 0?F:25);return}try{try{for(var q=Fs([["ready",y],["viewableChange",C],["audioVolumeChange",N],["adResized",O]]),b=q.next();!b.done;b=q.next()){var M=Os(b.value,2),k=M[0],V=M[1];r.push([k,V]),a.addEventListener(k,V)}}catch(Q){E={error:Q}}finally{try{b&&!b.done&&(B=q.return)&&B.call(q)}finally{if(E)throw E.error}}y()}catch(Q){p(Q)}}}return{init:function(){var E;return d||(d=new Promise(function(B,F){h=B,f=F}),T()?(f?.(Error("DAPI bridge closed")),d):(m=setTimeout(function(){return p(Error("DAPI readiness timed out"))},(E=n.timeoutMs)!==null&&E!==void 0?E:5e3),S(),d))},isReady:function(){return s&&!T()},isVisible:function(){return s&&o&&!T()},isClosed:T,onVisibilityChanged:function(E){return T()||e.add(E),function(){return e.delete(E)}},onClosed:function(E){return T()||t.add(E),function(){return t.delete(E)}},onVolumeChanged:function(E){return T()||i.add(E),function(){return i.delete(E)}},openStore:function(){if(!s||!o||T()||typeof a?.openStoreUrl!="function")throw Error("DAPI store host unavailable");a.openStoreUrl()},destroy:function(){l||(l=!0,s=!1,o=!1,g(),f?.(Error("DAPI bridge destroyed")),e.clear(),t.clear(),i.clear())}}}var Ib=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(h){s(h)}}function u(d){try{l(i.throw(d))}catch(h){s(h)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Cb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Rb=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Pb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Lb=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function pv(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Lb(Pb([],Rb(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return Ib(this,void 0,void 0,function(){return Cb(this,function(a){switch(a.label){case 0:if(i)throw Error("Meta bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("Meta bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a=window.FbPlayableAd;if(!e||!t||i||typeof a?.onCTAClick!="function")throw Error("Meta CTA host unavailable");a.onCTAClick()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var Db=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(h){s(h)}}function u(d){try{l(i.throw(d))}catch(h){s(h)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Nb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Ub=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Fb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ob=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function mv(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Ob(Fb([],Ub(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return Db(this,void 0,void 0,function(){return Nb(this,function(a){switch(a.label){case 0:if(i)throw Error("Google Ads bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("Google Ads bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a=window.ExitApi;if(!e||!t||i||typeof a?.exit!="function")throw Error("Google ExitApi unavailable");a.exit()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var Bb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(h){s(h)}}function u(d){try{l(i.throw(d))}catch(h){s(h)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},kb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Jf=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},$f=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Kf=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function vv(){var n=window,e=new Set,t=new Set,i=n.gameStart,r=n.gameClose,a=!1,s=!1,o=!1,u=!1,l=function(){var h,f;if(!(o||u)){var m=!s||!a;if(a=!0,s=!0,m)try{for(var x=Kf($f([],Jf(e),!1)),T=x.next();!T.done;T=x.next()){var g=T.value;g(!0)}}catch(p){h={error:p}}finally{try{T&&!T.done&&(f=x.return)&&f.call(x)}finally{if(h)throw h.error}}}},d=function(){var h,f,m,x;if(!(o||u)){a=!1,s=!1,o=!0;try{for(var T=Kf($f([],Jf(e),!1)),g=T.next();!g.done;g=T.next()){var p=g.value;p(!1)}}catch(y){h={error:y}}finally{try{g&&!g.done&&(f=T.return)&&f.call(T)}finally{if(h)throw h.error}}try{for(var D=Kf($f([],Jf(t),!1)),v=D.next();!v.done;v=D.next()){var p=v.value;p()}}catch(y){m={error:y}}finally{try{v&&!v.done&&(x=D.return)&&x.call(D)}finally{if(m)throw m.error}}}};return n.gameStart=l,n.gameClose=d,{init:function(){return Bb(this,void 0,void 0,function(){return kb(this,function(h){if(o||u)throw Error("Mintegral bridge closed");if(typeof n.gameReady!="function")throw Error("Mintegral gameReady host unavailable");return n.gameReady(),[2]})})},isReady:function(){return a&&!o&&!u},isVisible:function(){return a&&s&&!o&&!u},isClosed:function(){return o||u},onVisibilityChanged:function(h){return!o&&!u&&e.add(h),function(){return e.delete(h)}},onClosed:function(h){return!o&&!u&&t.add(h),function(){return t.delete(h)}},notifyGameEnd:function(){var h;!o&&!u&&((h=n.gameEnd)===null||h===void 0||h.call(n))},notifyGameRetry:function(){var h;!o&&!u&&((h=n.gameRetry)===null||h===void 0||h.call(n))},openStore:function(){if(!a||!s||o||u||typeof n.install!="function")throw Error("Mintegral install host unavailable");n.install()},destroy:function(){u||(u=!0,a=!1,s=!1,n.gameStart===l&&(i?n.gameStart=i:delete n.gameStart),n.gameClose===d&&(r?n.gameClose=r:delete n.gameClose),e.clear(),t.clear())}}}var zb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(h){s(h)}}function u(d){try{l(i.throw(d))}catch(h){s(h)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Vb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Gb=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Hb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Wb=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function gv(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Wb(Hb([],Gb(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return zb(this,void 0,void 0,function(){return Vb(this,function(a){switch(a.label){case 0:if(i)throw Error("TikTok bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("TikTok bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a,s,o=window,u=typeof o.openAppStore=="function"?o.openAppStore.bind(o):(s=(a=o.playableSDK)===null||a===void 0?void 0:a.openAppStore)===null||s===void 0?void 0:s.bind(o.playableSDK);if(!e||!t||i||!u)throw Error("TikTok store host unavailable");u()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var St=function(){return St=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},St.apply(this,arguments)},Xb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(h){s(h)}}function u(d){try{l(i.throw(d))}catch(h){s(h)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Yb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Le=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},qe=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ne=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function xv(n){if(n!=="standalone"){if(n==="unity-ads-ua-playable")return dv();if(n==="applovin-growth-playable")return hv();if(n==="ironsource-levelplay-playable")return fv();if(n==="meta-audience-playable")return pv();if(n==="google-ads-app-playable")return mv();if(n==="mintegral-appgrowth-zip")return vv();if(n==="tiktok-ads-playable")return gv();throw Error("E_NATIVE_TARGET")}}function Qf(n){var e=[{id:"sdk-top-left",left:0,top:0,right:Math.min(48,n.width),bottom:Math.min(48,n.height)},{id:"sdk-top-right",left:Math.max(0,n.width-56),top:0,right:n.width,bottom:Math.min(56,n.height)},{id:"sdk-bottom-left",left:0,top:Math.max(0,n.height-28),right:Math.min(48,n.width),bottom:n.height}];return{left:Math.min(48,n.width),top:Math.min(56,n.height),right:Math.max(0,n.width-56),bottom:Math.max(0,n.height-28),zones:e}}function Ld(n,e){var t,i,r=(i=(t=n.measureText)===null||t===void 0?void 0:t.call(n,e))===null||i===void 0?void 0:i.width,a=/(\d+(?:\.\d+)?)px/.exec(n.font||"");return Number.isFinite(r)?r:qe([],Le(e),!1).length*(a?Number(a[1]):16)*.6}function yv(n,e,t,i){var r,a,s,o,u,l,d;n.font=t.fontWeight+" "+i+"px "+t.fontFamily;var h=Math.max(0,t.width-2*((d=t.padding)!==null&&d!==void 0?d:4)),f=[];try{for(var m=Ne(String(e).split(`
`)),x=m.next();!x.done;x=m.next()){var T=x.value;if(t.wrap===!1){f.push(T);continue}var g=T.trim()?T.trim().split(/\s+/):[""],p=void 0;try{for(var D=(s=void 0,Ne(g)),v=D.next();!v.done;v=D.next()){var y=v.value,C=p?p+" "+y:y;if(Ld(n,C)<=h){p=C;continue}if(p&&f.push(p),Ld(n,y)<=h){p=y;continue}var N="";try{for(var O=(u=void 0,Ne(y)),S=O.next();!S.done;S=O.next()){var E=S.value;N&&Ld(n,N+E)>h?(f.push(N),N=E):N+=E}}catch(B){u={error:B}}finally{try{S&&!S.done&&(l=O.return)&&l.call(O)}finally{if(u)throw u.error}}p=N}}catch(B){s={error:B}}finally{try{v&&!v.done&&(o=D.return)&&o.call(D)}finally{if(s)throw s.error}}f.push(p)}}catch(B){r={error:B}}finally{try{x&&!x.done&&(a=m.return)&&a.call(m)}finally{if(r)throw r.error}}return f}function _v(n,e,t){var i,r,a=(i=t.padding)!==null&&i!==void 0?i:4,s=Math.max(0,t.width-2*a),o=Math.max(0,t.height-2*a),u=Math.min(t.fontSize,(r=t.minFontSize)!==null&&r!==void 0?r:12),l=t.fontSize,d=yv(n,e,t,l),h,f=function(){var m;n.font=t.fontWeight+" "+l+"px "+t.fontFamily;var x=Math.max.apply(Math,qe([0],Le(d.map(function(D){return Ld(n,D)})),!1)),T=l*((m=t.lineHeight)!==null&&m!==void 0?m:1.2),g=d.length>16;g&&(d=d.slice(0,16));var p=d.length*T;return{lines:d,fontSize:l,scale:l/t.fontSize,renderedWidth:x,renderedHeight:p,availableWidth:s,availableHeight:o,padding:a,lineHeight:T,overflowsWidth:x>s+.01,overflowsHeight:g||p>o+.01,unsupportedChars:[]}};if(h=f(),t.autoFit!==!1)for(;(h.overflowsWidth||h.overflowsHeight)&&l>u;)l=Math.max(u,l-1),d=yv(n,e,t,l),h=f();return h}function qb(n,e,t){var i=_v(n,e,t),r=i.padding;n.fillStyle=t.color,n.font=t.fontWeight+" "+i.fontSize+"px "+t.fontFamily,n.textAlign=t.align,n.textBaseline="middle";var a=t.align==="left"?r:t.align==="right"?t.width-r:t.width/2,s=(t.height-i.renderedHeight)/2;return i.lines.forEach(function(o,u){return n.fillText(o,a,s+(u+.5)*i.lineHeight)}),i}function Zb(n,e,t){var i,r,a,s,o,u,l=t===void 0?{}:t,d=l.edit,h=d===void 0?!1:d,f=l.sceneId,m=f===void 0?n.base.startScene:f,x=l.onSelect,T=x===void 0?function(){}:x,g=l.network,p=g===void 0?"standalone":g,D=xv(p),v=e.getContext("2d"),y=new Map(n.components.map(function(c){return[c.id,c]})),C=new Map(n.assets.map(function(c){return[c.id,c]})),N=new Map,O=new Map(n.events.map(function(c){return[c.id,c]})),S=new Map(n.gameplay.filter(function(c){return c.kind==="responsive-layout"}).map(function(c){return[c.componentId,c.parameters]})),E=(a=globalThis.matchMedia)===null||a===void 0?void 0:a.call(globalThis,"(prefers-reduced-motion: reduce)"),B,F=new Map,q=F;function b(){var c=S.size>0&&e.clientWidth>e.clientHeight;return{width:c?Math.max(n.base.width,n.base.height):n.base.width,height:c?Math.min(n.base.width,n.base.height):n.base.height,landscape:c}}function M(){B!==b().landscape&&(Ii(),Ci())}try{for(var k=Ne(n.assets),V=k.next();!V.done;V=k.next()){var Q=V.value;if(Q.mime.startsWith("image/")){var j=new Image;j.src="data:"+Q.mime+";base64,"+Q.data,N.set(Q.id,j)}}}catch(c){i={error:c}}finally{try{V&&!V.done&&(r=k.return)&&r.call(k)}finally{if(i)throw i.error}}var W=m,Z={},re=[],ye=[],Se=[],ue=[],fe=new Set,Fe=new Map,ne=0,oe=0,Ue=0,Be=0,ze=0,ht=!1,Gt=0,ut=0,wt=!1,Zt=[],je,xt,_t,cn,Pt,$t,ae,hn,qt,X=[],w,le=[],ve=[],Me,He=0,$e=!1,Ae=0,Te=p==="standalone",Pe=p==="standalone",Ke=p==="standalone",Oe=!1,Ge=!1,De=new Map,lt=new Map,et=new Map,ie=new Map,Ze=new Set,Re=new Map,tt=new Set,ot=new Map,ke=new Map,Rt=new Map,ft=new Map,Kt=new Map,Qt=new Map,Bn=0,ei=0,bn,qn,Mi=1,Si,ni=new Map,tn=new Map,vt=new Map,In=new Map,gn=new Map,Di=new Map,Er=new Map,Tn=Rp(),ai=Dp(),ar=new Map,Ar=new Map,Ai=Bp(Up(n.projectId)),ra=new Map,qi=new Map,sr=new Map,aa=new Set,Zi=new Map,I,se=1,be=1,pe,xe,Je={x:0,y:0},We,Ve=[],Tt=[],Et=new Map,ln=new Map,dn=new Map,gt=new Map,ct,pn,Ht;n.components.some(function(c){return c.contract==="native.stage3d.v1"})&&(Ht=ev(n,C,function(){Ge||Promise.resolve().then(function(){Ge||Ci()})}));var nt=function(c){var _;return(_=et.get(c))!==null&&_!==void 0?_:y.get(c)},yn=function(c,_){return n.gameplay.find(function(P){return P.kind===c&&P.componentId===_})},yt=function(){var c,_;Bn++,tt.clear(),ot.clear(),Rt.clear(),ft.clear();try{for(var P=Ne(Ze),A=P.next();!A.done;A=P.next()){var R=A.value;try{R.stop()}catch{}}}catch(U){c={error:U}}finally{try{A&&!A.done&&(_=P.return)&&_.call(P)}finally{if(c)throw c.error}}Ze.clear(),ke.clear()},Ti=function(c){var _,P;if(!I||c!==void 0&&I.pointerId!==c)return!1;var A=I.pointerId;I.behavior.parameters.powerVariableId&&(Z[I.behavior.parameters.powerVariableId]=0),I=void 0;try{!((_=e.hasPointerCapture)===null||_===void 0)&&_.call(e,A)&&((P=e.releasePointerCapture)===null||P===void 0||P.call(e,A))}catch{}return!0},fn=function(c){var _,P,A;if(!ct||c!==void 0&&ct.pointerId!==c)return!1;var R=ct.pointerId;ct.behavior.parameters.powerVariableId&&(Z[ct.behavior.parameters.powerVariableId]=0),(_=Ht?.getStage(y.get(ct.stageId)))===null||_===void 0||_.setGuide([]),ct=void 0;try{!((P=e.hasPointerCapture)===null||P===void 0)&&P.call(e,R)&&((A=e.releasePointerCapture)===null||A===void 0||A.call(e,R))}catch{}return!0},gi=function(c){var _,P;if(!pn||c!==void 0&&pn.pointerId!==c)return!1;var A=pn.pointerId;pn=void 0;try{!((_=e.hasPointerCapture)===null||_===void 0)&&_.call(e,A)&&((P=e.releasePointerCapture)===null||P===void 0||P.call(e,A))}catch{}return!0},Ji=function(c){var _=c.behavior.parameters;_.axisXVariableId&&(Z[_.axisXVariableId]=c.nx),_.axisYVariableId&&(Z[_.axisYVariableId]=c.ny),_.magnitudeVariableId&&(Z[_.magnitudeVariableId]=c.magnitude),_.angleVariableId&&c.magnitude>0&&(Z[_.angleVariableId]=c.angle)},Ni=function(c,_){var P,A,R,U;_===void 0&&(_=!1);try{for(var L=Ne(Zi.values()),Y=L.next();!Y.done;Y=L.next()){var z=Y.value;if(!(z.pointerId===null||c!==void 0&&z.pointerId!==c)){var J=z.pointerId;z.pointerId=null,z.nx=0,z.ny=0,z.magnitude=0,z.knobX=z.origin.x,z.knobY=z.origin.y,Ji(z);try{!((R=e.hasPointerCapture)===null||R===void 0)&&R.call(e,J)&&((U=e.releasePointerCapture)===null||U===void 0||U.call(e,J))}catch{}_&&en(si("joystickEnd",z.c))}}}catch(G){P={error:G}}finally{try{Y&&!Y.done&&(A=L.return)&&A.call(L)}finally{if(P)throw P.error}}},or=function(c,_){var P,A;if(_===void 0&&(_=!0),!_t||c!==void 0&&_t.pointerId!==c)return!1;var R=_t,U=R.pointerId;if(_t=void 0,xe=void 0,_){var L=nt(R.targetId);L&&R.b.parameters.snapBack&&(sa(L,R.origin.x,R.origin.y),R.originZone&&Tn.place(L.id,R.originZone))}try{!((P=e.hasPointerCapture)===null||P===void 0)&&P.call(e,U)&&((A=e.releasePointerCapture)===null||A===void 0||A.call(e,U))}catch{}return!0},xn=function(c){var _,P;w?.pointerId===c.pointerId&&(w=void 0);try{for(var A=Ne(Kt.values()),R=A.next();!R.done;R=A.next()){var U=R.value;U.pointerId===c.pointerId&&U.held&&(U.held=!1,U.releasedAt=ne)}}catch(Y){_={error:Y}}finally{try{R&&!R.done&&(P=A.return)&&P.call(A)}finally{if(_)throw _.error}}var L=or(c.pointerId);return $t===c.pointerId?(Pt=void 0,$t=void 0,!0):L},Zn=function(c){var _,P,A,R,U,L,Y,z;if(c){_t&&((Y=et.get(_t.targetId))===null||Y===void 0?void 0:Y.instanceId)===c&&or(void 0,!1),I&&((z=et.get(I.targetId))===null||z===void 0?void 0:z.instanceId)===c&&Ti();var J=[];Tn.release(c),ai.cancel(c),ra.delete(c),sr.delete(c),Ai.remove(c),re=re.filter(function(we){return we.id!==c});try{for(var G=Ne(et),K=G.next();!K.done;K=G.next()){var $=Le(K.value,2),ee=$[0],te=$[1];if(te.instanceId===c){J.push(ee),Tn.release(ee),ai.cancel(ee),et.delete(ee),De.delete(ee),ie.delete(ee),vt.delete(ee),gn.delete(ee),Di.delete(ee);try{for(var H=(A=void 0,Ne(In.values())),ce=H.next();!ce.done;ce=H.next()){var de=ce.value;de.removeAgent(ee)}}catch(we){A={error:we}}finally{try{ce&&!ce.done&&(R=H.return)&&R.call(H)}finally{if(A)throw A.error}}try{for(var he=(U=void 0,Ne(lt.keys())),_e=he.next();!_e.done;_e=he.next()){var me=_e.value;me.endsWith(":"+ee)&&lt.delete(me)}}catch(we){U={error:we}}finally{try{_e&&!_e.done&&(L=he.return)&&L.call(he)}finally{if(U)throw U.error}}}}}catch(we){_={error:we}}finally{try{K&&!K.done&&(P=G.return)&&P.call(G)}finally{if(_)throw _.error}}Se=Se.filter(function(we){return!J.includes(we.targetId)})}},Ui=function(c){for(;c;){if(c.prototype)return c.id;c=nt(c.parentId)}},Vn=function(){var c,_,P;return{viewport:b(),components:Object.fromEntries(qe([],Le(De),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,St(St({},L),{parameters:St({},L.parameters)})]})),mode:h?"edit":"play",scene:W,variables:St({},Z),time:ne,instances:re.map(function(A){return St({id:A.id,prototypeId:A.prototypeId,x:A.transform[4],y:A.transform[5]},Ai.snapshot(A.id))}),particles:ye.length,animations:Se.length,contacts:fe.size,spriteFrames:Object.fromEntries(qe([],Le(ie),!1).map(function(A){var R,U=Le(A,2),L=U[0],Y=U[1];return[L,(R=Y.frame)!==null&&R!==void 0?R:0]})),input:{dragging:!!_t,pointerId:(_=(c=_t?.pointerId)!==null&&c!==void 0?c:pe?.pointerId)!==null&&_!==void 0?_:null,pressed:Pt??null,holding:!!pe?.holds.length,occupancy:Tn.snapshot(),joysticks:Object.fromEntries(qe([],Le(Zi),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,{active:L.pointerId!==null,x:L.nx,y:L.ny,magnitude:L.magnitude,angle:L.angle}]}))},feedback:{presses:Kt.size,floatingTexts:le.length,flashes:ve.length,shaking:!!Me,tutorialHands:Ae},match:{boards:Object.fromEntries(qe([],Le(ni),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,L.snapshot()]})),selected:bn??null,cells:qe([],Le(Qt),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return St({id:U},L)})},physics:wv(),physics3d:Cv(),paths:Object.fromEntries(qe([],Le(In),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,L.snapshot()]})),canvas:{masks:Object.fromEntries(qe([],Le(ra),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,{progress:L.progress}]})),strokes:Object.fromEntries(qe([],Le(qi),!1).map(function(A){var R=Le(A,2),U=R[0],L=R[1];return[U,L.strokes.length]})),walls:Ve.length,joints:Tt.filter(function(A){return!A.broken}).length},audio:{state:(P=je?.state)!==null&&P!==void 0?P:"locked",voices:Ze.size,blocked:ei},network:{target:p,ready:Pe,visible:Ke,started:Te,closed:Oe,hostVolume:Mi},diagnostics:qe([],Le(Zt),!1)}},bi=function(){return!h&&!ht&&!document.hidden&&Pe&&Ke&&Te&&!Oe},Ii=function(){var c,_,P,A;w=void 0,Ti(),fn(),gi(),Ni(),or(),pe=void 0,xe=void 0,We=void 0;try{for(var R=Ne(qi.values()),U=R.next();!U.done;U=R.next()){var L=U.value;L.cancel()}}catch(G){c={error:G}}finally{try{U&&!U.done&&(_=R.return)&&_.call(R)}finally{if(c)throw c.error}}ai.clear(),qn=void 0;try{for(var Y=Ne(ni.values()),z=Y.next();!z.done;z=Y.next()){var J=z.value;J.cancelSelection()}}catch(G){P={error:G}}finally{try{z&&!z.done&&(A=Y.return)&&A.call(Y)}finally{if(P)throw P.error}}ni.size&&(bn=void 0),Pt=void 0,$t=void 0,Kt.clear()},pi=function(c){wt=!0,Zt.push(c),Zt=Zt.slice(-16),ue=[]},Ft=function(c){var _,P,A;return St(St(St({},c.parameters),c.prototypeId?(_=De.get(c.prototypeId))===null||_===void 0?void 0:_.parameters:{}),(A=De.get((P=c.runtimeId)!==null&&P!==void 0?P:c.id))===null||A===void 0?void 0:A.parameters)};function Do(c,_){var P,A=Kt.get(c.id);if(!A||E?.matches)return _;var R=qe([],Le(_),!1),U=A.held?0:ne-((P=A.releasedAt)!==null&&P!==void 0?P:ne),L=A.held?0:Math.min(1,U/A.behavior.springBackSeconds),Y=A.held?A.behavior.scaleDown:A.behavior.scaleDown+(1-A.behavior.scaleDown)*(1-Math.pow(1-L,3)),z=Ft(c);R[4]+=(1-Y)*(R[0]*z.width+R[2]*z.height)/2,R[5]+=(1-Y)*(R[1]*z.width+R[3]*z.height)/2;for(var J=0;J<4;J++)R[J]*=Y;return R}function lr(c){var _,P,A,R,U,L,Y,z=c.transform,J=(A=(P=De.get((_=c.runtimeId)!==null&&_!==void 0?_:c.id))===null||P===void 0?void 0:P.transform)!==null&&A!==void 0?A:z,G=S.get((R=c.prototypeId)!==null&&R!==void 0?R:c.id);if(!G)return Do(c,J);var K=b(),$=qe([],Le(J),!1);K.landscape&&($[4]+=G.x-z[4],$[5]+=G.y-z[5],$[0]*=G.scaleX,$[1]*=G.scaleX,$[2]*=G.scaleY,$[3]*=G.scaleY);var ee=(U=G.anchor)!==null&&U!==void 0?U:"none";if(ee==="none"&&!G.respectSafeArea)return Do(c,$);var te=G.respectSafeArea?Qf(K):{left:0,top:0,right:K.width,bottom:K.height},H=Ft(c),ce=(L=G.marginX)!==null&&L!==void 0?L:0,de=(Y=G.marginY)!==null&&Y!==void 0?Y:0,he=Math.abs($[0])*H.width+Math.abs($[2])*H.height,_e=Math.abs($[1])*H.width+Math.abs($[3])*H.height;return ee!=="none"?($[4]=ee.endsWith("left")?te.left+ce:ee.endsWith("right")?te.right-he-ce:(te.left+te.right-he)/2,$[5]=ee.startsWith("top")?te.top+de:ee.startsWith("bottom")?te.bottom-_e-de:(te.top+te.bottom-_e)/2):($[4]=Math.max(te.left+ce,Math.min(te.right-he-ce,$[4])),$[5]=Math.max(te.top+de,Math.min(te.bottom-_e-de,$[5]))),Do(c,$)}var _n=function(c){return(et.has(c)?qe([],Le(et.values()),!1):qe(qe([],Le(n.components),!1),Le(re),!1)).filter(function(_){return _.parentId===c&&!_.prototype}).sort(function(_,P){return _.order-P.order||(_.id<P.id?-1:_.id>P.id?1:0)})},vs=function(){return n.components.filter(function(c){return c.sceneId===W&&!c.parentId&&!c.prototype}).sort(function(c,_){return c.order-_.order||(c.id<_.id?-1:c.id>_.id?1:0)})},en=function(c){var _,P;if(c.kind==="sceneEnter"&&((_=n.scenes.find(function(A){return A.id===c.sceneId}))===null||_===void 0?void 0:_.role)==="end-card"&&Si!==c.sceneId&&(Si=c.sceneId,(P=D?.notifyGameEnd)===null||P===void 0||P.call(D)),ue.length>=256){pi("Event queue budget exhausted");return}ue.push(c)},si=function(c,_,P,A){var R,U,L,Y;return A===void 0&&(A={}),St(St({kind:c,componentId:(R=_.prototypeId)!==null&&R!==void 0?R:_.id,selfInstanceId:(U=_.instanceId)!==null&&U!==void 0?U:_.id,instanceId:_.instanceId},P?{otherId:(L=P.prototypeId)!==null&&L!==void 0?L:P.id,otherInstanceId:(Y=P.instanceId)!==null&&Y!==void 0?Y:P.id}:{}),A)};function cr(c){for(var _,P=c;P;P=nt(P.parentId)){var A=Ai.states.get((_=P.instanceId)!==null&&_!==void 0?_:P.id);if(A)return A}}function Ia(c){var _,P,A=yn("instance-state",(_=c.prototypeId)!==null&&_!==void 0?_:c.id);return A?Ai.initialize((P=c.instanceId)!==null&&P!==void 0?P:c.id,A.parameters):void 0}function gs(){var c,_,P,A;try{for(var R=Ne(n.gameplay.filter(function(G){return G.kind==="instance-state"})),U=R.next();!U.done;U=R.next()){var L=U.value;try{for(var Y=(P=void 0,Ne(mi(y.get(L.componentId)))),z=Y.next();!z.done;z=Y.next()){var J=z.value;Ia(J)}}catch(G){P={error:G}}finally{try{z&&!z.done&&(A=Y.return)&&A.call(Y)}finally{if(P)throw P.error}}}}catch(G){c={error:G}}finally{try{U&&!U.done&&(_=R.return)&&_.call(R)}finally{if(c)throw c.error}}}function No(c,_,P,A){var R=cr(c);if(R){var U=R.hp;if(_==="tag")R.tag=P==="set"?String(A):R.tag;else{var L=Number(A);if(R[_]=P==="add"?R[_]+L:P==="sub"?R[_]-L:L,!Number.isFinite(R[_])){pi("Instance state range exceeded");return}_==="hp"&&(R.hp=Math.max(0,Math.min(R.maxHp,R.hp)))}U>0&&R.hp<=0&&en(si("instanceDepleted",c))}}function Xa(c,_){var P,A,R;if(!c)return!0;if(c.all)return c.all.every(function(J){return Xa(J,_)});if(c.any)return c.any.some(function(J){return Xa(J,_)});var U=c.instanceTarget==="other"?_?.otherInstanceId:(P=_?.selfInstanceId)!==null&&P!==void 0?P:_?.instanceId,L=c.instanceField?(A=nt(U))!==null&&A!==void 0?A:qe([],Le(et.values()),!1).find(function(J){return J.instanceId===U}):void 0,Y=c.instanceField?(R=cr(L))===null||R===void 0?void 0:R[c.instanceField]:Z[c.variableId],z=c.compareVariableId?Z[c.compareVariableId]:c.value;return{eq:function(){return Y===z},ne:function(){return Y!==z},lt:function(){return Y<z},lte:function(){return Y<=z},gt:function(){return Y>z},gte:function(){return Y>=z}}[c.op]()}function Bs(c){var _,P,A;bn=void 0,qn=void 0,c||Qt.clear();try{for(var R=Ne(n.gameplay),U=R.next();!U.done;U=R.next()){var L=U.value;if(L.kind==="match-tile"){var Y=y.get(L.componentId);if(c&&Y.id!==c&&!Ir(Y,c))continue;De.delete(Y.id),Qt.set(Y.id,{row:L.parameters.row,column:L.parameters.column,group:L.parameters.group,sceneId:Y.sceneId,boardId:(A=Y.parentId)!==null&&A!==void 0?A:Y.sceneId})}}}catch(z){_={error:z}}finally{try{U&&!U.done&&(P=R.return)&&P.call(R)}finally{if(_)throw _.error}}}function Uo(){var c,_,P=function(L){var Y,z;if(ni.has(L.componentId))return"continue";var J=L.componentId,G=L.parameters,K=n.gameplay.filter(function(me){return me.kind==="match-tile"&&y.get(me.componentId).parentId===J}).sort(function(me,we){return me.parameters.row-we.parameters.row||me.parameters.column-we.parameters.column}).map(function(me){return St({id:me.componentId},me.parameters)}),$=new Map;try{for(var ee=(Y=void 0,Ne(K)),te=ee.next();!te.done;te=ee.next()){var H=te.value;if(!$.has(H.group)){var ce=y.get(H.id);$.set(H.group,{fill:ce.parameters.fill,children:_n(H.id).filter(function(me){return["native.image.v1","native.text.v1"].includes(me.contract)})})}}}catch(me){Y={error:me}}finally{try{te&&!te.done&&(z=ee.return)&&z.call(ee)}finally{if(Y)throw Y.error}}tn.set(J,$);var de=y.get(K[G.columns].id).transform[5]-y.get(K[0].id).transform[5],he=function(me,we,Ie){var Ce,Ye=Ie.from,at=Ye===void 0?me:Ye,Xe=Ie.progress,pt=Xe===void 0?0:Xe,mt=Ie.offsetRows,Bt=mt===void 0?0:mt,kt=Ie.scale,it=kt===void 0?1:kt,Yt=Ie.opacity,It=Yt===void 0?1:Yt,dt=K[me],Qe=y.get(dt.id),rt=y.get(K[at].id),Mt=$.get(we),bt=qe([],Le(Qe.transform),!1);bt[4]+=(rt.transform[4]-Qe.transform[4])*pt,bt[5]+=(rt.transform[5]-Qe.transform[5]+Bt*de)*pt,bt[4]+=(1-it)*(bt[0]*Qe.parameters.width+bt[2]*Qe.parameters.height)/2,bt[5]+=(1-it)*(bt[1]*Qe.parameters.width+bt[3]*Qe.parameters.height)/2;for(var jt=0;jt<4;jt++)bt[jt]*=it;De.set(dt.id,St(St({},De.get(dt.id)),{transform:bt,parameters:St(St({},(Ce=De.get(dt.id))===null||Ce===void 0?void 0:Ce.parameters),{fill:Mt.fill,opacity:It})})),Qt.get(dt.id).group=we;var zt=_n(dt.id).filter(function(nn){return["native.image.v1","native.text.v1"].includes(nn.contract)});zt.forEach(function(nn,Vt){var rn,Ot,st=Mt.children[Vt];if(!(!st||st.contract!==nn.contract)){var Ut=(rn=De.get(nn.id))!==null&&rn!==void 0?rn:{transform:qe([],Le(nn.transform),!1),parameters:{}};nn.contract==="native.image.v1"?Ut.assetId=(Ot=st.assetSlots[0])===null||Ot===void 0?void 0:Ot.assetId:Ut.parameters.text=st.parameters.text,De.set(nn.id,Ut)}})},_e=Ap(St(St({},G),{slots:K,paint:he,onEvent:function(me){bn=void 0,en({kind:me,componentId:J})}}));ni.set(J,_e)};try{for(var A=Ne(n.gameplay.filter(function(L){return L.kind==="match-board"})),R=A.next();!R.done;R=A.next()){var U=R.value;P(U)}}catch(L){c={error:L}}finally{try{R&&!R.done&&(_=A.return)&&_.call(A)}finally{if(c)throw c.error}}}function Fo(c){var _,P;Uo();try{for(var A=Ne(ni),R=A.next();!R.done;R=A.next()){var U=Le(R.value,2),L=U[0],Y=U[1];(!c||c===L||Ir(y.get(L),c))&&Y.reset()}}catch(z){_={error:z}}finally{try{R&&!R.done&&(P=A.return)&&P.call(A)}finally{if(_)throw _.error}}}function mi(c){return Ui(c)?qe([],Le(et.values()),!1).filter(function(_){return _.prototypeId===c.id}):[c]}function oi(c){var _=Ft(c);return Cn(Fn(c),_.width/2,_.height/2)}function Ca(c,_,P){var A;P===void 0&&(P="self");var R=y.get(c),U=P==="other"?_.otherInstanceId:(A=_.selfInstanceId)!==null&&A!==void 0?A:_.instanceId,L=!!(R&&Ui(R));if(U!==void 0){if(c){var Y=qe([],Le(et.values()),!1).find(function(z){return z.prototypeId===c&&(z.instanceId===U||z.id===U)});if(Y)return Y}if(P==="other"||!c)return nt(U);if(L&&typeof U=="string"&&U.startsWith("instance."))return}return R?L?mi(R)[0]:nt(c):void 0}function sa(c,_,P){var A,R=Ft(c),U=(A=De.get(c.id))!==null&&A!==void 0?A:{transform:qe([],Le(c.transform),!1),parameters:{}},L=qe([],Le(U.transform),!1),Y=c.parentId?Fn(nt(c.parentId)):pa(),z=Cn(_r(Y),_,P);L[4]=z.x-(L[0]*R.width+L[2]*R.height)/2,L[5]=z.y-(L[1]*R.width+L[3]*R.height)/2,De.set(c.id,St(St({},U),{transform:L})),c.prototypeId&&(c.transform=qe([],Le(L),!1))}function ks(c,_,P){var A,R,U,L;P===void 0&&(P=!1);var Y=(A=De.get(c.id))!==null&&A!==void 0?A:{transform:qe([],Le(c.transform),!1),parameters:{}},z=(L=(U=y.get((R=c.prototypeId)!==null&&R!==void 0?R:c.id))===null||U===void 0?void 0:U.transform)!==null&&L!==void 0?L:c.transform,J=Math.hypot(z[0],z[1])*(P?-1:1),G=Math.hypot(z[2],z[3]),K=_+(P?0:Math.atan2(z[1],z[0])),$=Math.cos(K),ee=Math.sin(K),te=qe([],Le(Y.transform),!1);te[0]=$*J,te[1]=ee*J,te[2]=-ee*G,te[3]=$*G,De.set(c.id,St(St({},Y),{transform:te}))}function ys(c,_){var P=vt.get(c.id);if(P)return P;var A=Fn(c),R=Ft(c),U=Cn(A,R.width/2,R.height/2);return P=St({id:c.id,sourceId:_.componentId,instanceId:c.instanceId,x:U.x,y:U.y,vx:0,vy:0,width:Math.hypot(A[0],A[1])*R.width,height:Math.hypot(A[2],A[3])*R.height,angle:Math.atan2(A[1],A[0]),restElapsed:0,atRest:!0},_.parameters),vt.set(c.id,P),P}function Oo(c,_){var P,A=ra.get(c.id);if(A)return A;var R=Ft(c),U=_.parameters;return A=kp(U,{width:R.width,height:R.height,source:c.contract==="native.image.v1"?N.get((P=c.assetSlots[0])===null||P===void 0?void 0:P.assetId):void 0,onProgress:function(L){U.progressVariableId&&(Z[U.progressVariableId]=L),en(si("maskProgress",c))},onComplete:function(){return en(si("maskComplete",c))}}),ra.set(c.id,A),A}function Mv(c){var _=qi.get(c.componentId);return _||(_=Gp(c.parameters),qi.set(c.componentId,_)),_}function jf(){var c,_,P,A,R,U,L,Y,z,J,G,K,$=new Set,ee=[];try{for(var te=Ne(n.gameplay.filter(function(bt){return bt.kind==="physics-body"})),H=te.next();!H.done;H=te.next()){var ce=H.value,de=y.get(ce.componentId);if(de.sceneId===W)try{for(var he=(P=void 0,Ne(mi(de))),_e=he.next();!_e.done;_e=he.next()){var me=_e.value;if(ti(me)){if(ee.length>=64){pi("Physics body budget exhausted");break}var we=ys(me,ce),Ie=Fn(me),Ce=Ft(me),Ye=Cn(Ie,Ce.width/2,Ce.height/2);if($.add(me.id),we.width=Math.hypot(Ie[0],Ie[1])*Ce.width,we.height=Math.hypot(Ie[2],Ie[3])*Ce.height,we.mode!=="dynamic"){var at=gn.get(me.id),Xe=me.parentId?Fn(nt(me.parentId)):pa(),pt=(G=at?.vx)!==null&&G!==void 0?G:0,mt=(K=at?.vy)!==null&&K!==void 0?K:0;we.x=Ye.x,we.y=Ye.y,we.angle=Math.atan2(Ie[1],Ie[0]),we.vx=Xe[0]*pt+Xe[2]*mt,we.vy=Xe[1]*pt+Xe[3]*mt}else we.atRest&&(we.x=Ye.x,we.y=Ye.y);ee.push(we)}}}catch(bt){P={error:bt}}finally{try{_e&&!_e.done&&(A=he.return)&&A.call(he)}finally{if(P)throw P.error}}}}catch(bt){c={error:bt}}finally{try{H&&!H.done&&(_=te.return)&&_.call(te)}finally{if(c)throw c.error}}try{for(var Bt=Ne(vt.keys()),kt=Bt.next();!kt.done;kt=Bt.next()){var it=kt.value;!$.has(it)&&!et.has(it)&&vt.delete(it)}}catch(bt){R={error:bt}}finally{try{kt&&!kt.done&&(U=Bt.return)&&U.call(Bt)}finally{if(R)throw R.error}}var Yt=[];try{for(var It=Ne(n.gameplay.filter(function(bt){return bt.kind==="capture-zone"})),dt=It.next();!dt.done;dt=It.next()){var ce=dt.value,de=y.get(ce.componentId);if(de.sceneId===W)try{for(var Qe=(z=void 0,Ne(mi(de))),rt=Qe.next();!rt.done;rt=Qe.next()){var me=rt.value;if(ti(me)){var Ie=Fn(me),Ce=Ft(me),Ye=Cn(Ie,Ce.width/2,Ce.height/2),Mt=Math.max(.1,Math.min(Math.hypot(Ie[0],Ie[1]),Math.hypot(Ie[2],Ie[3])));Yt.push(St(St({id:me.id,sourceId:de.id,instanceId:me.instanceId,x:Ye.x,y:Ye.y},ce.parameters),{radius:ce.parameters.radius*Mt}))}}}catch(zt){z={error:zt}}finally{try{rt&&!rt.done&&(J=Qe.return)&&J.call(Qe)}finally{if(z)throw z.error}}}}catch(bt){L={error:bt}}finally{try{dt&&!dt.done&&(Y=It.return)&&Y.call(It)}finally{if(L)throw L.error}}return{bodies:qe(qe([],Le(ee),!1),Le(Ve),!1),zones:Yt}}function Sv(c){var _,P,A,R,U,L,Y,z=jf(),J=z.bodies,G=z.zones,K=b();Tt=[];try{for(var $=Ne(n.gameplay.filter(function(Xe){return Xe.kind==="physics-joint"})),ee=$.next();!ee.done;ee=$.next()){var te=ee.value,H=y.get(te.componentId);if(H.sceneId===W){var ce=nt(te.parameters.anchorComponentId),de=yn("physics-body",H.id);if(!(!ce||!de))try{for(var he=(A=void 0,Ne(mi(H))),_e=he.next();!_e.done;_e=he.next()){var me=_e.value;ys(me,de);var we=oi(ce),Ie=te.id+":"+me.id;Tt.push(St(St({},te.parameters),{id:te.id,key:Ie,componentId:H.id,bodyId:me.id,anchorId:ce.id,x:we.x,y:we.y,broken:aa.has(Ie)}))}}catch(Xe){A={error:Xe}}finally{try{_e&&!_e.done&&(R=he.return)&&R.call(he)}finally{if(A)throw A.error}}}}}catch(Xe){_={error:Xe}}finally{try{ee&&!ee.done&&(P=$.return)&&P.call($)}finally{if(_)throw _.error}}oh({bodies:J,zones:G,joints:Tt,bounds:{left:0,top:0,right:K.width,bottom:K.height},dt:c,onEvent:function(Xe,pt,mt){var Bt,kt,it,Yt;if(!(Xe==="bodyBounce"&&mt&&pt.sourceId===mt.sourceId&&pt.id>mt.id)){var It=(Bt=pt.instanceId)!==null&&Bt!==void 0?Bt:pt.id,dt=mt?(kt=mt.instanceId)!==null&&kt!==void 0?kt:mt.id:void 0,Qe=St(St({kind:Xe,componentId:pt.sourceId,selfInstanceId:It},dt?{otherInstanceId:dt}:{}),{instanceId:(it=pt.instanceId)!==null&&it!==void 0?it:mt?.instanceId});if(mt&&(Qe.otherId=mt.sourceId),en(Qe),Xe==="zoneCapture"){var rt=nt(pt.id),Mt=y.get(mt.sourceId);if(mt.hideCaptured&&rt){var bt=(Yt=De.get(rt.id))!==null&&Yt!==void 0?Yt:{transform:qe([],Le(rt.transform),!1),parameters:{}};bt.parameters.visible=!1,De.set(rt.id,bt)}mt.stopBody&&Mt&&rt&&sa(rt,mt.x,mt.y)}}}});try{for(var Ce=Ne(J),Ye=Ce.next();!Ye.done;Ye=Ce.next()){var at=Ye.value,me=nt(at.id);!me||at.mode!=="dynamic"||(at.spinToRotation&&ks(me,(Y=at.angle)!==null&&Y!==void 0?Y:0),sa(me,at.x,at.y))}}catch(Xe){U={error:Xe}}finally{try{Ye&&!Ye.done&&(L=Ce.return)&&L.call(Ce)}finally{if(U)throw U.error}}}function bv(){var c,_,P,A,R;try{for(var U=Ne(n.gameplay.filter(function(_e){return _e.kind==="oscillate"})),L=U.next();!L.done;L=U.next()){var Y=L.value,z=y.get(Y.componentId);if(z.sceneId===W)try{for(var J=(P=void 0,Ne(mi(z))),G=J.next();!G.done;G=J.next()){var K=G.value,$=gn.get(K.id);$||($={base:qe([],Le(lr(K)),!1),vx:0,vy:0},gn.set(K.id,$));var ee=Y.parameters,te=(ne/ee.periodSeconds+ee.phase)*Math.PI*2,H=Math.sin(te)*ee.amplitude,ce=Math.cos(te)*ee.amplitude*Math.PI*2/ee.periodSeconds,de=(R=De.get(K.id))!==null&&R!==void 0?R:{parameters:{}},he=qe([],Le($.base),!1);ee.axis==="x"?(he[4]+=H,$.vx=ce,$.vy=0):(he[5]+=H,$.vy=ce,$.vx=0),De.set(K.id,St(St({},de),{transform:he})),gn.set(K.id,$)}}catch(_e){P={error:_e}}finally{try{G&&!G.done&&(A=J.return)&&A.call(J)}finally{if(P)throw P.error}}}}catch(_e){c={error:_e}}finally{try{L&&!L.done&&(_=U.return)&&_.call(U)}finally{if(c)throw c.error}}}function ep(){var c,_;In.clear();var P=function(L){var Y=n.gameplay.filter(function(J){return J.kind==="path-gate"&&J.parameters.networkBehaviorId===L.id}),z=nv({id:L.id,nodes:L.parameters.nodes,edges:L.parameters.edges,gates:Y,onEvent:function(J,G){var K,$=nt(G.componentId),ee=(K=$?.prototypeId)!==null&&K!==void 0?K:G.componentId;en(St({kind:J,componentId:ee,instanceId:$?.instanceId},G.nodeId?{nodeId:G.nodeId}:{}))}});In.set(L.id,z)};try{for(var A=Ne(n.gameplay.filter(function(L){return L.kind==="path-network"})),R=A.next();!R.done;R=A.next()){var U=R.value;P(U)}}catch(L){c={error:L}}finally{try{R&&!R.done&&(_=A.return)&&_.call(A)}finally{if(c)throw c.error}}}function ec(c,_){var P,A,R,U,L,Y,z,J,G,K,$,ee,te;_===void 0&&(_=!0);var H=0;try{for(var ce=Ne(n.gameplay.filter(function(bt){return bt.kind==="path-agent"})),de=ce.next();!de.done;de=ce.next()){var he=de.value,_e=y.get(he.componentId),me=In.get(he.parameters.networkBehaviorId);if(!(_e.sceneId!==W||!me))try{for(var we=(R=void 0,Ne(mi(_e))),Ie=we.next();!Ie.done;Ie=we.next()){var Ce=Ie.value;if(++H>64){pi("Path agent budget exhausted");break}var Ye=me.getAgent(Ce.id);Ye||(Ye=me.addAgent(St(St({},he.parameters),{id:Ce.id,startNode:($=Ce.pathStartNode)!==null&&$!==void 0?$:he.parameters.startNode,targetNode:(ee=Ce.pathTargetNode)!==null&&ee!==void 0?ee:he.parameters.targetNode}))),Ye.speedMultiplier=Math.max(0,Number(he.parameters.speedMultiplierVariableId?Z[he.parameters.speedMultiplierVariableId]:1))}}catch(bt){R={error:bt}}finally{try{Ie&&!Ie.done&&(U=we.return)&&U.call(we)}finally{if(R)throw R.error}}}}catch(bt){P={error:bt}}finally{try{de&&!de.done&&(A=ce.return)&&A.call(ce)}finally{if(P)throw P.error}}if(_){var at=function(bt,jt){var zt=n.gameplay.find(function(nn){return nn.id===bt});y.get(zt.componentId).sceneId===W&&jt.tick(c)};try{for(var Xe=Ne(In),pt=Xe.next();!pt.done;pt=Xe.next()){var mt=Le(pt.value,2),Bt=mt[0],kt=mt[1];at(Bt,kt)}}catch(bt){L={error:bt}}finally{try{pt&&!pt.done&&(Y=Xe.return)&&Y.call(Xe)}finally{if(L)throw L.error}}}try{for(var it=Ne(n.gameplay.filter(function(bt){return bt.kind==="path-agent"})),Yt=it.next();!Yt.done;Yt=it.next()){var he=Yt.value,_e=y.get(he.componentId),It=In.get(he.parameters.networkBehaviorId);if(!(_e.sceneId!==W||!It))try{for(var dt=(G=void 0,Ne(mi(_e))),Qe=dt.next();!Qe.done;Qe=dt.next()){var Ce=Qe.value,Ye=It.getAgent(Ce.id);if(Ye){if(Ye.orientToPath==="rotate")ks(Ce,Ye.heading);else if(Ye.orientToPath==="flip-x")ks(Ce,0,Ye.flipX);else if(Ye.orientToPath==="iso-4"){var rt=(te=De.get(Ce.id))!==null&&te!==void 0?te:{transform:qe([],Le(Ce.transform),!1),parameters:{}};rt.pathFrame=Ye.frame,De.set(Ce.id,rt)}var Mt=Ce.parentId?Cn(Fn(nt(Ce.parentId)),Ye.x,Ye.y):Ye;sa(Ce,Mt.x,Mt.y)}}}catch(zt){G={error:zt}}finally{try{Qe&&!Qe.done&&(K=dt.return)&&K.call(dt)}finally{if(G)throw G.error}}}}catch(bt){z={error:bt}}finally{try{Yt&&!Yt.done&&(J=it.return)&&J.call(it)}finally{if(z)throw z.error}}}function Dd(c){var _,P,A,R,U,L,Y,z,J,G,K=new Set;try{for(var $=Ne(n.gameplay.filter(function(Ut){return Ut.kind==="value-meter"})),ee=$.next();!ee.done;ee=$.next()){var te=ee.value,H=y.get(te.componentId);if(H.sceneId===W)try{for(var ce=(A=void 0,Ne(mi(H))),de=ce.next();!de.done;de=ce.next()){var he=de.value,_e=te.parameters,me=_e.instanceField?cr(he):void 0,we=_e.instanceField==="hp"&&me?me.hp/me.maxHp*(_e.max-_e.min)+_e.min:_e.instanceField==="value"&&me?me.value:Number(Z[_e.variableId]),Ie=Di.get(he.id);Ie||(Ie={base:qe([],Le(lr(he)),!1),value:Number.isFinite(we)?Math.max(_e.min,Math.min(_e.max,we)):_e.min},Di.set(he.id,Ie)),K.add(he.id);var Ce=Math.max(_e.min,Math.min(_e.max,we)),Ye=_e.smoothingSeconds?1-Math.exp(-c/_e.smoothingSeconds):1;Ie.value+=((Number.isFinite(Ce)?Ce:_e.min)-Ie.value)*Ye;var at=Math.max(0,Math.min(1,(Ie.value-_e.min)/(_e.max-_e.min))),Xe=qe([],Le(Ie.base),!1),pt=(J=De.get(he.id))!==null&&J!==void 0?J:{parameters:{}},mt=_e.axis==="x"?Ft(he).width:Ft(he).height;if(_e.axis==="x"?(Xe[0]*=at,Xe[1]*=at):(Xe[2]*=at,Xe[3]*=at),_e.direction==="negative"){var Bt=mt*(1-at);_e.axis==="x"?(Xe[4]+=Ie.base[0]*Bt,Xe[5]+=Ie.base[1]*Bt):(Xe[4]+=Ie.base[2]*Bt,Xe[5]+=Ie.base[3]*Bt)}De.set(he.id,St(St({},pt),{transform:Xe}))}}catch(Ut){A={error:Ut}}finally{try{de&&!de.done&&(R=ce.return)&&R.call(ce)}finally{if(A)throw A.error}}}}catch(Ut){_={error:Ut}}finally{try{ee&&!ee.done&&(P=$.return)&&P.call($)}finally{if(_)throw _.error}}try{for(var kt=Ne(Di.keys()),it=kt.next();!it.done;it=kt.next()){var Yt=it.value;K.has(Yt)||Di.delete(Yt)}}catch(Ut){U={error:Ut}}finally{try{it&&!it.done&&(L=kt.return)&&L.call(kt)}finally{if(U)throw U.error}}try{for(var It=Ne(n.gameplay.filter(function(Ut){return Ut.kind==="camera-follow"})),dt=It.next();!dt.done;dt=It.next()){var te=dt.value,Qe=y.get(te.componentId),Ce=nt(te.parameters.targetId);if(!(Qe.sceneId!==W||!Ce)){var rt=Er.get(Qe.id);rt||(rt={base:qe([],Le(Qe.transform),!1),x:te.parameters.minX,y:te.parameters.minY},Er.set(Qe.id,rt));var Mt=function(Un,Qn){for(var yi=[],ci=Un;ci&&ci.id!==Qn.id;ci=nt(ci.parentId))yi.unshift(ci);return yi.reduce(function(Hn,qr){return Hs(Hn,lr(qr))},pa())},Xe=Ir(Ce,Qe.id)?Mt(Ce,Qe):Fn(Ce),_e=Ft(Ce),bt=Cn(Xe,_e.width/2,_e.height/2),jt=b(),zt=te.parameters,nn=Math.max(zt.minX,zt.maxX-jt.width/zt.zoom),Vt=Math.max(zt.minY,zt.maxY-jt.height/zt.zoom),rn=Math.max(zt.minX,Math.min(nn,bt.x-jt.width/(2*zt.zoom))),Ot=Math.max(zt.minY,Math.min(Vt,bt.y-jt.height/(2*zt.zoom))),Ye=1-Math.exp(-zt.smoothing*c);rt.x+=(rn-rt.x)*Ye,rt.y+=(Ot-rt.y)*Ye;var pt=(G=De.get(Qe.id))!==null&&G!==void 0?G:{parameters:{}},st=qe([],Le(rt.base),!1);st[0]*=zt.zoom,st[1]*=zt.zoom,st[2]*=zt.zoom,st[3]*=zt.zoom,st[4]-=rt.x*zt.zoom,st[5]-=rt.y*zt.zoom,De.set(Qe.id,St(St({},pt),{transform:st}))}}}catch(Ut){Y={error:Ut}}finally{try{dt&&!dt.done&&(z=It.return)&&z.call(It)}finally{if(Y)throw Y.error}}}function wv(){return{bodies:qe([],Le(vt.values()),!1).map(function(c){return{id:c.id,sourceId:c.sourceId,x:c.x,y:c.y,vx:c.vx,vy:c.vy,atRest:!!c.atRest,captured:!!c.captured}}),aiming:I?{componentId:I.sourceId,pointerId:I.pointerId,power:I.power}:null}}function tc(c){for(var _=c;_;){if(_.contract==="native.stage3d.v1")return _;_=_.parentId?nt(_.parentId):void 0}}function Nd(c,_){var P,A,R,U,L,Y,z=Et.get(c.id);if(z)return z;var J=Ft(c),G=tc(c);return z=St({id:c.id,sourceId:_.componentId,stageId:G?.id,x:(P=J.x)!==null&&P!==void 0?P:0,y:(A=J.y)!==null&&A!==void 0?A:0,z:(R=J.z)!==null&&R!==void 0?R:0,vx:0,vy:0,vz:0,spin:0,atRest:!0,captured:!1,captureElapsed:0,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:(U=J.x)!==null&&U!==void 0?U:0,y:(L=J.y)!==null&&L!==void 0?L:0,z:(Y=J.z)!==null&&Y!==void 0?Y:0}},_.parameters),Et.set(c.id,z),z}function nc(){var c,_,P,A,R,U,L,Y=[],z=[],J=[];if(!Ht)return{bodies:Y,walls:z,zones:J};try{for(var G=Ne(n.gameplay.filter(function(he){return he.kind==="physics-3d"})),K=G.next();!K.done;K=G.next()){var $=K.value,ee=y.get($.componentId);if(!(!ee||ee.sceneId!==W||!ti(ee))){var te=Nd(ee,$);te.mode==="dynamic"?Y.push(te):z.push(te)}}}catch(he){c={error:he}}finally{try{K&&!K.done&&(_=G.return)&&_.call(G)}finally{if(c)throw c.error}}try{for(var H=Ne(n.gameplay.filter(function(he){return he.kind==="capture-zone-3d"})),ce=H.next();!ce.done;ce=H.next()){var $=ce.value,ee=y.get($.componentId);if(!(!ee||ee.sceneId!==W||!ti(ee))){var de=Ft(ee);J.push(St({id:ee.id,sourceId:ee.id,x:(R=de.x)!==null&&R!==void 0?R:0,y:(U=de.y)!==null&&U!==void 0?U:0,z:(L=de.z)!==null&&L!==void 0?L:0},$.parameters))}}}catch(he){P={error:he}}finally{try{ce&&!ce.done&&(A=H.return)&&A.call(H)}finally{if(P)throw P.error}}return{bodies:Y,walls:z,zones:J}}function Tv(c){var _,P,A,R,U,L,Y,z,J,G;if(Ht){try{for(var K=Ne(n.gameplay.filter(function(Yt){return Yt.kind==="oscillate-3d"})),$=K.next();!$.done;$=K.next()){var ee=$.value,te=y.get(ee.componentId);if(!(!te||te.sceneId!==W)){var H=ln.get(te.id);if(!H){var ce=Ft(te);H={x:(U=ce.x)!==null&&U!==void 0?U:0,y:(L=ce.y)!==null&&L!==void 0?L:0,z:(Y=ce.z)!==null&&Y!==void 0?Y:0},ln.set(te.id,H)}var de=ee.parameters,he=ne*de.angularSpeed+de.phase,_e=Math.sin(he)*de.amplitude,me=Math.cos(he)*de.amplitude*de.angularSpeed,we=(z=Et.get(te.id))!==null&&z!==void 0?z:yn("physics-3d",te.id)?Nd(te,yn("physics-3d",te.id)):void 0,Ie=H.x+(de.axis==="x"?_e:0),Ce=H.y+(de.axis==="y"?_e:0),Ye=H.z+(de.axis==="z"?_e:0);if(we)we.x=Ie,we.y=Ce,we.z=Ye,we.vx=de.axis==="x"?me:0,we.vy=de.axis==="y"?me:0,we.vz=de.axis==="z"?me:0;else{var at=(J=De.get(te.id))!==null&&J!==void 0?J:{transform:qe([],Le(te.transform),!1),parameters:{}};at.parameters.x=Ie,at.parameters.y=Ce,at.parameters.z=Ye,De.set(te.id,at)}}}}catch(Yt){_={error:Yt}}finally{try{$&&!$.done&&(P=K.return)&&P.call(K)}finally{if(_)throw _.error}}var Xe=nc(),pt=Xe.bodies,mt=Xe.walls,Bt=Xe.zones;ch({bodies:pt,walls:mt,zones:Bt,dt:c,onEvent:function(Yt,It,dt){var Qe={kind:Yt,componentId:It.sourceId};dt&&(Qe.otherId=dt.sourceId),en(Qe)}});try{for(var kt=Ne(pt),it=kt.next();!it.done;it=kt.next()){var we=it.value;we.captured&&(we.captureElapsed=((G=we.captureElapsed)!==null&&G!==void 0?G:0)+c)}}catch(Yt){A={error:Yt}}finally{try{it&&!it.done&&(R=kt.return)&&R.call(kt)}finally{if(A)throw A.error}}Ev(c,mt)}}function ic(c){var _=gt.get(c.componentId);if(!_){var P=c.parameters;_={behavior:c,x:P.x,y:P.y,z:P.z,yaw:P.yaw,pitch:P.pitch,bobPhase:0,bob:0},gt.set(c.componentId,_)}return _}function tp(){var c,_;try{for(var P=Ne(n.gameplay.filter(function(U){var L;return U.kind==="fps-controller-3d"&&((L=y.get(U.componentId))===null||L===void 0?void 0:L.sceneId)===W})),A=P.next();!A.done;A=P.next()){var R=A.value;ic(R)}}catch(U){c={error:U}}finally{try{A&&!A.done&&(_=P.return)&&_.call(P)}finally{if(c)throw c.error}}}function np(c){var _,P,A,R=[];try{for(var U=Ne(et.values()),L=U.next();!L.done;L=U.next()){var Y=L.value;Y.contract==="native.mesh3d.v1"&&((A=tc(Y))===null||A===void 0?void 0:A.id)===c&&R.push(Y)}}catch(z){_={error:z}}finally{try{L&&!L.done&&(P=U.return)&&P.call(U)}finally{if(_)throw _.error}}return R}function ip(c,_,P){var A,R,U=ic(c),L=c.parameters,Y=L.lookSensitivity,z=L.invertAimY?-1:1,J=U.yaw-_*Y;L.minYaw!==void 0&&L.maxYaw!==void 0&&(J=Math.max(L.minYaw,Math.min(L.maxYaw,J))),U.yaw=J,U.pitch=Math.max((A=L.minPitch)!==null&&A!==void 0?A:-.75,Math.min((R=L.maxPitch)!==null&&R!==void 0?R:.75,U.pitch-P*Y*z))}function Ev(c,_){var P,A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he,_e,me,we=function(It){var dt=y.get(It.componentId);if(!dt||dt.sceneId!==W)return"continue";var Qe=ic(It),rt=It.parameters,Mt=rt.aimJoystickBehaviorId?Zi.get(rt.aimJoystickBehaviorId):void 0;if(Mt&&rt.aimMode==="rate"&&Mt.magnitude>1e-4&&c>0){var bt=(z=rt.aimTurnSpeed)!==null&&z!==void 0?z:1.8,jt=rt.invertAimY?-1:1,zt=Qe.yaw-Mt.nx*bt*c;rt.minYaw!==void 0&&rt.maxYaw!==void 0&&(zt=Math.max(rt.minYaw,Math.min(rt.maxYaw,zt))),Qe.yaw=zt,Qe.pitch=Math.max((J=rt.minPitch)!==null&&J!==void 0?J:-.75,Math.min((G=rt.maxPitch)!==null&&G!==void 0?G:.75,Qe.pitch-Mt.ny*bt*jt*c))}var nn=rt.joystickBehaviorId?Zi.get(rt.joystickBehaviorId):void 0,Vt=nn?nn.nx:Number(rt.moveXVariableId?Z[rt.moveXVariableId]:0),rn=nn?nn.ny:Number(rt.moveYVariableId?Z[rt.moveYVariableId]:0),Ot=Math.min(1,Math.hypot(Vt,rn));if(Ot>1e-4&&rt.moveSpeed>0&&c>0){var st=-rn,Ut=Vt,Gn=-Math.sin(Qe.yaw),Ln=-Math.cos(Qe.yaw),Ri=Math.cos(Qe.yaw),li=-Math.sin(Qe.yaw),Dn=rt.moveSpeed*c,Un=_.filter(function(yi){return yi.stageId===dt.id}),Qn=uh(Qe.x+(Gn*st+Ri*Ut)*Dn,Qe.z+(Ln*st+li*Ut)*Dn,(K=rt.playerRadius)!==null&&K!==void 0?K:.45,Un,($=rt.boundsX)!==null&&$!==void 0?$:12,(ee=rt.boundsZ)!==null&&ee!==void 0?ee:12);Qe.x=Qn.x,Qe.z=Qn.z,Qe.bobPhase+=c*10*Ot,Qe.bob=E?.matches?0:Math.sin(Qe.bobPhase)*((te=rt.bobAmplitude)!==null&&te!==void 0?te:.04)*Ot}else Qe.bob*=Math.max(0,1-12*c)};try{for(var Ie=Ne(n.gameplay.filter(function(It){return It.kind==="fps-controller-3d"})),Ce=Ie.next();!Ce.done;Ce=Ie.next()){var Ye=Ce.value;we(Ye)}}catch(It){P={error:It}}finally{try{Ce&&!Ce.done&&(A=Ie.return)&&A.call(Ie)}finally{if(P)throw P.error}}try{for(var at=Ne(n.gameplay.filter(function(It){return It.kind==="steer-3d"})),Xe=at.next();!Xe.done;Xe=at.next()){var Ye=Xe.value,pt=y.get(Ye.componentId);if(!(!pt||pt.sceneId!==W)){var mt=Ye.parameters,Bt=function(dt){if(!ti(dt))return"continue";var Qe=tc(dt),rt=Qe?gt.get(Qe.id):void 0;if(!rt)return"continue";var Mt=Ft(dt),bt=(H=Mt.x)!==null&&H!==void 0?H:0,jt=(ce=Mt.z)!==null&&ce!==void 0?ce:0,zt=rt.x-bt,nn=rt.z-jt,Vt=Math.hypot(zt,nn),rn=(de=mt.stopDistance)!==null&&de!==void 0?de:2.5,Ot=bt,st=jt;if(mt.mode==="chase-camera"&&Vt>rn&&Vt>1e-4){var Ut=Math.min(Vt-rn,mt.speed*c);Ot+=zt/Vt*Ut,st+=nn/Vt*Ut}else if(mt.mode==="strafe-camera"&&Vt>1e-4){var Gn=-nn/Vt,Ln=zt/Vt;Ot+=Gn*mt.speed*c,st+=Ln*mt.speed*c}else mt.mode==="patrol"&&(Ot+=Math.cos(ne*1.5)*mt.speed*c);var Ri=_.filter(function(Un){return Un.stageId===Qe.id&&Un.id!==dt.id}),li=uh(Ot,st,.45,Ri,(he=mt.boundsX)!==null&&he!==void 0?he:12,(_e=mt.boundsZ)!==null&&_e!==void 0?_e:12),Dn=(me=De.get(dt.id))!==null&&me!==void 0?me:{transform:qe([],Le(dt.transform),!1),parameters:{}};Dn.parameters.x=li.x,Dn.parameters.z=li.z,mt.faceCamera!==!1&&(Dn.parameters.ry=Math.atan2(rt.x-li.x,rt.z-li.z)),De.set(dt.id,Dn)};try{for(var kt=(L=void 0,Ne(mi(pt))),it=kt.next();!it.done;it=kt.next()){var Yt=it.value;Bt(Yt)}}catch(dt){L={error:dt}}finally{try{it&&!it.done&&(Y=kt.return)&&Y.call(kt)}finally{if(L)throw L.error}}}}}catch(It){R={error:It}}finally{try{Xe&&!Xe.done&&(U=at.return)&&U.call(at)}finally{if(R)throw R.error}}}function Av(c,_,P,A){if(re.length>=128){pi("Instance budget exhausted");return}var R=y.get(c),U=function(J){return 1+n.components.filter(function(G){return G.parentId===J}).reduce(function(G,K){return G+U(K.id)},0)};if(et.size+U(R.id)>4096){pi("Runtime node budget exhausted");return}var L="instance."+ ++Ue;function Y(J,G){var K,$,ee=J.id===R.id?L:L+":"+J.id,te=St(St({},J),{id:ee,runtimeId:ee,instanceId:L,prototypeId:J.id,prototype:!1,parentId:G,transform:qe([],Le(J.transform),!1),parameters:St({},J.parameters),spawnTime:ne});et.set(ee,te);try{for(var H=Ne(n.components.filter(function(he){return he.parentId===J.id})),ce=H.next();!ce.done;ce=H.next()){var de=ce.value;Y(de,ee)}}catch(he){K={error:he}}finally{try{ce&&!ce.done&&($=H.return)&&$.call(H)}finally{if(K)throw K.error}}return te}var z=Y(R,R.parentId);return z.parameters.x=_,z.parameters.y=P,z.parameters.z=A,re.push(z),Ia(z),z}function Iv(c){var _,P;if(Ht){var A=y.get(c.stageId);if(!(!A||A.sceneId!==W)){var R=Ft(A),U=Fn(A),L=Math.hypot(U[0],U[1]),Y=Math.hypot(U[2],U[3]),z=Ht.syncStage(A,{time:ne,ambientTime:oe,propsOf:Ft,bodies3d:Et,fpsPose:gt.get(A.id),instances3d:np(A.id),aimLocked:!!ct,groundFn:Xs,worldWidth:R.width*L,worldHeight:R.height*Y}).entry,J=0,G=0;if(c.mode==="pointer"){var K=Cn(_r(U),Je.x,Je.y);J=K.x/Math.max(1,R.width)*2-1,G=1-K.y/Math.max(1,R.height)*2}var $=new Set(n.gameplay.filter(function(de){return de.kind==="physics-3d"&&de.parameters.mode!=="dynamic"}).map(function(de){return de.componentId})),ee=(_=c.targetTeam)!==null&&_!==void 0?_:"any",te=function(de){var he,_e,me=nt(de);return!me||!ti(me)?!1:ee!=="any"?((he=cr(me))===null||he===void 0?void 0:he.team)===ee:!!cr(me)||!$.has((_e=me.prototypeId)!==null&&_e!==void 0?_e:me.id)},H=z.raycast(J,G,(P=c.maxDistance)!==null&&P!==void 0?P:80,{isTarget:te,isOccluder:function(de){return $.has(de)}});if(H){var ce=nt(H.id);ce&&en(si("raycastHit3d",ce,A))}else en({kind:"raycastMiss3d",componentId:A.id})}}}function Ud(c){var _,P,A;if(!Ht)return null;var R=nt(c);if(!R||R.contract!=="native.mesh3d.v1")return null;var U=tc(R);if(!U)return null;var L=Ht.getStage(U);if(!L||!L.lastWidth||!L.lastHeight)return null;var Y=Et.get(R.id),z=Ft(R),J=L.project({x:Y?Y.x:(_=z.x)!==null&&_!==void 0?_:0,y:Y?Y.y:(P=z.y)!==null&&P!==void 0?P:0,z:Y?Y.z:(A=z.z)!==null&&A!==void 0?A:0},L.lastWidth,L.lastHeight);return Cn(Fn(U),J.x,J.y)}function rp(){if(!ct||!Ht)return{vx:0,vz:0,power:0,pull:0};var c=y.get(ct.stageId),_=Ht.getStage(c),P=Et.get(ct.targetId),A=ct.behavior.parameters;if(!_||!P||!_.lastWidth||!_.lastHeight)return{vx:0,vz:0,power:0,pull:0};var R=_r(Fn(c)),U=Cn(R,ct.start.x,ct.start.y),L=Cn(R,ct.current.x,ct.current.y),Y=Math.hypot(ct.current.x-ct.start.x,ct.current.y-ct.start.y),z=_.unproject(U.x,U.y,_.lastWidth,_.lastHeight,P.y),J=_.unproject(L.x,L.y,_.lastWidth,_.lastHeight,P.y);if(!z||!J)return{vx:0,vz:0,power:0,pull:Y};var G=(z.x-J.x)*A.dragScale,K=(z.z-J.z)*A.dragScale,$=Math.hypot(G,K);return $>A.maxSpeed&&(G*=A.maxSpeed/$,K*=A.maxSpeed/$),{vx:G,vz:K,power:Math.min(1,Math.hypot(G,K)/Math.max(.001,A.maxSpeed)),pull:Y}}function ap(c){if(!(!ct||!Ht)){ct.current=c;var _=rp(),P=ct.behavior.parameters;ct.power=_.power,P.powerVariableId&&(Z[P.powerVariableId]=_.power);var A=y.get(ct.stageId),R=Ht.getStage(A),U=Et.get(ct.targetId);if(R&&U&&P.showTrajectory&&_.pull>=P.minPullPx){var L=nc(),Y=L.walls,z=L.zones;R.setGuide(em({body:U,walls:Y,zones:z,vx:_.vx,vz:_.vz,dots:P.trajectoryDots}))}else R?.setGuide([])}}function Cv(){return{bodies:qe([],Le(Et.values()),!1).map(function(c){return{id:c.id,sourceId:c.sourceId,x:c.x,y:c.y,z:c.z,vx:c.vx,vy:c.vy,vz:c.vz,atRest:!!c.atRest,captured:!!c.captured,airborne:!!c.airborne}}),aiming:ct?{componentId:ct.sourceId,pointerId:ct.pointerId,power:ct.power}:null,projected:Object.fromEntries(dn),fps:Object.fromEntries(qe([],Le(gt),!1).map(function(c){var _=Le(c,2),P=_[0],A=_[1];return[P,{x:A.x,y:A.y,z:A.z,yaw:A.yaw,pitch:A.pitch}]}))}}function Fd(){Si=void 0,Ii(),Zi.clear(),Tn.clear(),ar.clear(),Ar.clear(),Ai.reset(),ra.clear(),qi.clear(),Ve=[],Tt=[],sr.clear(),aa.clear(),F.clear(),le=[],ve=[],Me=void 0,He=0,$e=!1,Ae=0,Z=Object.fromEntries(n.variables.map(function(c){return[c.id,c.initial]})),yt(),ei=0,et.clear(),ie.clear(),vt.clear(),gn.clear(),Et.clear(),ln.clear(),dn.clear(),gt.clear(),Ht?.reset(),Di.clear(),Er.clear(),I=void 0,re=[],ye=[],Se=[],De.clear(),Bs(),lt.clear(),fe.clear(),Fe.clear(),ue=[],ne=0,oe=0,Ue=0,wt=!1,Be=0,W=n.base.startScene,Pt=void 0,$t=void 0,cn=void 0,hn=void 0,h||(gs(),Fo(),ep(),nc(),tp(),ec(0,!1),zd(),Dd(0),en({kind:"sceneEnter",sceneId:W}))}function Od(){var c,_;if(!(!je||je.state!=="running"||!ot.size)){var P=qe([],Le(ot.values()),!1);ot.clear();try{for(var A=Ne(P),R=A.next();!R.done;R=A.next()){var U=R.value;op(U)}}catch(L){c={error:L}}finally{try{R&&!R.done&&(_=A.return)&&_.call(A)}finally{if(c)throw c.error}}}}function Bo(c){if(c===void 0&&(c=!1),!je)return Promise.resolve(void 0);if(je.state==="running")return Promise.resolve().then(Od),Promise.resolve(je);if(!xt||c){var _=je,P=Promise.resolve().then(function(){return _.resume()}).then(function(){if(_.state==="running")return Od(),_}).catch(function(){}).finally(function(){xt===P&&(xt=void 0)});xt=P}return xt}function Bd(){var c,_,P=qe([],Le(ke.values()),!1),A=P.some(function(G){return G.bus==="voice"}),R=P.some(function(G){return G.bus==="stinger"}),U=R?.2:A?.25:1;try{for(var L=Ne(P),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=z.volume*Mi*(z.bus==="music"?U:1);z.gain.gain.setTargetAtTime?z.gain.gain.setTargetAtTime(J,je.currentTime,.04):z.gain.gain.value=J}}catch(G){c={error:G}}finally{try{Y&&!Y.done&&(_=L.return)&&_.call(L)}finally{if(c)throw c.error}}}function sp(c,_,P){var A,R=(A=P.parameters.bus)!==null&&A!==void 0?A:"sfx";c.connect(_),_.connect(je.destination),Ze.add(c),ke.set(c,{gain:_,bus:R,volume:P.parameters.volume}),c.onended=function(){Ze.delete(c),ke.delete(c),P.parameters.loop&&tt.delete(P.id),Bd()},Bd()}function op(c){return Xb(this,void 0,void 0,function(){var _,P,A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he,_e,me,we,Ie,Ce,Ye,at,Xe,pt,mt,Bt,kt;return Yb(this,function(it){switch(it.label){case 0:return Ze.size>=32?[2]:je?(_=je,P=Bn,A=(Ye=c.parameters.cooldownMs)!==null&&Ye!==void 0?Ye:45,R=_.currentTime,A>0&&R-((at=Rt.get(c.id))!==null&&at!==void 0?at:-1/0)<A/1e3?[2]:c.parameters.loop&&tt.has(c.id)?[2]:(U=y.get(c.componentId),L=C.get((Xe=U?.assetSlots[0])===null||Xe===void 0?void 0:Xe.assetId),Y=L?.mime==="audio/wav"||L?.mime==="audio/mpeg",!Y&&c.parameters.allowSynthFallback===!1?(ei++,[2]):(Rt.set(c.id,R),z=_.state!=="running",z?[4,Bo()]:[3,2]))):(c.parameters.loop&&ot.set(c.id,c),[2]);case 1:z=!it.sent(),it.label=2;case 2:if(z)return c.parameters.loop&&ot.set(c.id,c),[2];if(je!==_||_.state!=="running"||P!==Bn||Ze.size>=32)return[2];if(J=(pt=ft.get(c.id))!==null&&pt!==void 0?pt:0,G=[0,-.5,.5,-1,1],K=((mt=c.parameters.pitchJitter)!==null&&mt!==void 0?mt:0)*G[J%G.length],$=Number((Bt=Z[c.parameters.pitchVariableId])!==null&&Bt!==void 0?Bt:0),ee=Math.max(-12,Math.min(12,K+$*((kt=c.parameters.pitchStep)!==null&&kt!==void 0?kt:0))),te=Math.pow(2,ee/12),ft.set(c.id,J+1),!Y)return[3,8];c.parameters.loop&&tt.add(c.id),it.label=3;case 3:if(it.trys.push([3,6,,7]),H=Re.get(L.hash),H)return[3,5];for(ce=atob(L.data),de=new Uint8Array(ce.length),he=0;he<ce.length;he++)de[he]=ce.charCodeAt(he);return[4,new Promise(function(Yt,It){var dt=_.decodeAudioData(de.buffer,Yt,It);dt&&typeof dt.then=="function"&&dt.then(Yt,It)})];case 4:H=it.sent(),Re.set(L.hash,H),it.label=5;case 5:return je!==_||_.state!=="running"||P!==Bn||Ze.size>=32?(c.parameters.loop&&P===Bn&&tt.delete(c.id),[2]):(_e=_.createBufferSource(),me=_.createGain(),_e.buffer=H,_e.loop=c.parameters.loop,_e.playbackRate&&(_e.playbackRate.value=te),me.gain.value=c.parameters.volume,sp(_e,me,c),_e.start(),[3,7]);case 6:return we=it.sent(),tt.delete(c.id),pi("Audio decode failed"),[3,7];case 7:return[2];case 8:return Ie=_.createOscillator(),Ce=_.createGain(),Ie.frequency.value=c.parameters.frequency*te,Ie.type="sine",Ce.gain.setValueAtTime(c.parameters.volume,_.currentTime),Ce.gain.exponentialRampToValueAtTime(.001,_.currentTime+c.parameters.seconds),sp(Ie,Ce,c),Ie.start(),Ie.stop(_.currentTime+c.parameters.seconds),[2]}})})}function Rv(c,_){for(var P=qe([],Le(Qt.values()),!1).filter(function(G){return G.boardId===c}),A=function(G,K){var $;return($=P.find(function(ee){return ee.row===G&&ee.column===K}))===null||$===void 0?void 0:$.group},R=function(G){for(var K=function(te){var H=A(G,te);if(H&&H===A(G,te+1)&&H===A(G,te+2)&&_.some(function(ce){return ce.row===G&&ce.column>=te&&ce.column<=te+2}))return{value:!0}},$=0;$<14;$++){var ee=K($);if(typeof ee=="object")return ee}},U=0;U<16;U++){var L=R(U);if(typeof L=="object")return L.value}for(var Y=function(G){for(var K=function(te){var H=A(te,G);if(H&&H===A(te+1,G)&&H===A(te+2,G)&&_.some(function(ce){return ce.column===G&&ce.row>=te&&ce.row<=te+2}))return{value:!0}},$=0;$<14;$++){var ee=K($);if(typeof ee=="object")return ee}},z=0;z<16;z++){var J=Y(z);if(typeof J=="object")return J.value}return!1}function Pv(c){var _,P,A,R=Qt.get(c.id);if(!(!R||R.sceneId!==W||!Ft(c).enabled||!ti(c))){var U=ni.get(c.parentId);if(U){bn=U.select(c.id);return}if(bn===c.id){bn=void 0;return}var L=Qt.get(bn);if(!L||L.sceneId!==W||L.boardId!==R.boardId){bn=c.id;return}var Y=y.get(bn);if(Math.abs(L.row-R.row)+Math.abs(L.column-R.column)!==1){bn=c.id;return}if(L.group===R.group){bn=void 0,en({kind:"invalidMatch",componentId:(_=c.parentId)!==null&&_!==void 0?_:c.id});return}var z=L.row,J=L.column,G=R.row,K=R.column,$=qe([],Le(lr(Y)),!1),ee=qe([],Le(lr(c)),!1);if(L.row=G,L.column=K,R.row=z,R.column=J,Rv(R.boardId,[L,R])){var te=function(H,ce){var de,he=(de=De.get(H.id))!==null&&de!==void 0?de:{transform:qe([],Le(lr(H)),!1),parameters:{}};he.transform=qe([],Le(he.transform),!1),he.transform[4]=ce[4],he.transform[5]=ce[5],De.set(H.id,he)};te(Y,ee),te(c,$),bn=void 0,en({kind:"validMatch",componentId:(P=c.parentId)!==null&&P!==void 0?P:c.id})}else L.row=z,L.column=J,R.row=G,R.column=K,bn=void 0,en({kind:"invalidMatch",componentId:(A=c.parentId)!==null&&A!==void 0?A:c.id})}}function kd(c){var _,P,A,R,U=[],L=$i(c,Fn(c)),Y=oi(c),z=yn("drag",(A=c.prototypeId)!==null&&A!==void 0?A:c.id),J=function(ee){var te,H,ce=y.get(ee.componentId),de=ee.parameters;if(ce.sceneId!==W)return"continue";var he=function(Ie){if(Ie.id===c.id||Ir(Ie,c.id)||!ti(Ie))return"continue";var Ce=$i(Ie,Fn(Ie)),Ye=oi(Ie),at=Math.hypot(Ye.x-Y.x,Ye.y-Y.y),Xe=de.radiusPx>0?at<=de.radiusPx:L.left<Ce.right&&L.right>Ce.left&&L.top<Ce.bottom&&L.bottom>Ce.top;if(!Xe)return"continue";U.push(St({id:Ie.id,c:Ie,sourceId:ce.id,paintOrder:X.findIndex(function(pt){return pt.c.id===Ie.id}),distance:at,itemTarget:n.gameplay.some(function(pt){return pt.kind==="drag"&&pt.componentId===ce.id})},de))};try{for(var _e=(te=void 0,Ne(mi(ce))),me=_e.next();!me.done;me=_e.next()){var we=me.value;he(we)}}catch(Ie){te={error:Ie}}finally{try{me&&!me.done&&(H=_e.return)&&H.call(_e)}finally{if(te)throw te.error}}};try{for(var G=Ne(n.gameplay.filter(function(ee){return ee.kind==="drop-zone"})),K=G.next();!K.done;K=G.next()){var $=K.value;J($)}}catch(ee){_={error:ee}}finally{try{K&&!K.done&&(P=G.return)&&P.call(G)}finally{if(_)throw _.error}}return{zones:U,tag:(R=z?.parameters.tag)!==null&&R!==void 0?R:""}}function zd(c){var _,P,A=c?[c]:n.gameplay.filter(function(K){return K.kind==="drag"}).flatMap(function(K){return mi(y.get(K.componentId))});try{for(var R=Ne(A),U=R.next();!U.done;U=R.next()){var L=U.value;if(!(!L||!ti(L)||Tn.zoneOf(L.id))){var Y=kd(L),z=Y.zones,J=Y.tag,G=yc({itemId:L.id,tag:J,zones:z.filter(function(K){return!K.itemTarget}),occupancy:Tn});G?.kind==="accept"&&Tn.place(L.id,G.zone.id)}}}catch(K){_={error:K}}finally{try{U&&!U.done&&(P=R.return)&&P.call(R)}finally{if(_)throw _.error}}}function xs(c,_,P){P===void 0&&(P=.18),c&&ai.to(c.id,oi(c),_,P)}function Vd(c,_,P,A){var R,U,L=A??P?.c;en(St(St({},si(c,_,L,St({},P?{otherId:P.sourceId}:{}))),{instanceId:(R=_.instanceId)!==null&&R!==void 0?R:(U=P?.c)===null||U===void 0?void 0:U.instanceId}))}function Lv(c){var _,P,A,R,U,L,Y;if(!_t||_t.pointerId!==c.pointerId)return!1;var z=_t,J=nt(z.targetId),G=z.b.parameters;_t=void 0,xe=void 0;try{!((_=e.hasPointerCapture)===null||_===void 0)&&_.call(e,c.pointerId)&&((P=e.releasePointerCapture)===null||P===void 0||P.call(e,c.pointerId))}catch{}if(!J)return!0;var K=kd(J),$=K.zones,ee=K.tag,te=yc({itemId:J.id,tag:ee,zones:$,occupancy:Tn}),H=z.origin,ce=z.originZone;if(!te)return Vd("dragReject",J,void 0,void 0),G.snapBack&&(ce&&Tn.place(J.id,ce),xs(J,H,(A=G.snapBackSeconds)!==null&&A!==void 0?A:.18)),!0;var de=te.zone,he=te.occupantId?nt(te.occupantId):void 0;return te.kind==="reject"?(Vd("dragReject",J,de,he),G.snapBack&&(ce&&Tn.place(J.id,ce),xs(J,H,(R=G.snapBackSeconds)!==null&&R!==void 0?R:.18)),!0):(te.kind==="accept"?(Tn.place(J.id,de.id),de.snapMode==="center"&&xs(J,oi(de.c),(U=G.snapBackSeconds)!==null&&U!==void 0?U:.18)):te.kind==="swap"&&he&&(Tn.place(J.id,de.id),ce?Tn.place(he.id,ce):Tn.release(he.id),xs(J,oi(de.c),(L=G.snapBackSeconds)!==null&&L!==void 0?L:.18),xs(he,H,(Y=G.snapBackSeconds)!==null&&Y!==void 0?Y:.18)),Vd("dragDrop",J,de,te.kind==="accept"?de.c:he),!0)}function Dv(c){var _,P,A,R,U;ai.tick(c,function(te,H){var ce=nt(te);ce&&sa(ce,H.x,H.y)});try{for(var L=Ne(qe([],Le(Tn.itemZone.keys()),!1)),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=nt(z);(!J||!ti(J))&&Tn.release(z)}}catch(te){_={error:te}}finally{try{Y&&!Y.done&&(P=L.return)&&P.call(L)}finally{if(_)throw _.error}}if(pe)try{for(var G=Ne(pe.holds),K=G.next();!K.done;K=G.next()){var $=K.value,ee=$.charge.tick(c);ee!==Z[$.behavior.parameters.variableId]&&(Z[$.behavior.parameters.variableId]=ee,en({kind:"variableChange",variableId:$.behavior.parameters.variableId,instanceId:$.c.instanceId,selfInstanceId:(U=$.c.instanceId)!==null&&U!==void 0?U:$.c.id}))}}catch(te){A={error:te}}finally{try{K&&!K.done&&(R=G.return)&&R.call(G)}finally{if(A)throw A.error}}}function lp(c,_){var P,A,R,U,L=_.targetMode;if(L==="pointer")return St({},Je);if(L==="component"){var Y=nt(_.targetComponentId);return Y?oi(Y):void 0}if(L==="nearest-team"){var z=oi(c),J=[],G=_.team,K=(R=_.maxRangePx)!==null&&R!==void 0?R:0;try{for(var $=Ne(Ai.states),ee=$.next();!ee.done;ee=$.next()){var te=Le(ee.value,2),H=te[0],ce=te[1],Y=nt(H);Y&&ti(Y)&&J.push(St(St({id:H},oi(Y)),{team:ce.team}))}}catch(de){P={error:de}}finally{try{ee&&!ee.done&&(A=$.return)&&A.call($)}finally{if(P)throw P.error}}return Fp(z,J,G,K,(U=c.instanceId)!==null&&U!==void 0?U:c.id)}}function Nv(c){var _,P,A,R,U;try{for(var L=Ne(n.gameplay.filter(function(we){return we.kind==="steer"})),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=y.get(z.componentId),G=z.parameters;if(J.sceneId===W)try{for(var K=(A=void 0,Ne(mi(J))),$=K.next();!$.done;$=K.next()){var ee=$.value;if(ti(ee)){var te=lp(ee,G);if(te){var H=oi(ee),ce=te.x-H.x,de=te.y-H.y;if(!(G.maxRangePx>0&&Math.hypot(ce,de)>G.maxRangePx)){var he=Math.atan2(de,ce);G.mode==="flee"?he+=Math.PI:G.mode==="orbit"&&(he+=Math.PI/2);var _e=(U=Ai.headings.get(ee.id))!==null&&U!==void 0?U:he,me=Op(_e,he,G.turnRateDegPerSec*Math.PI/180*c);Ai.headings.set(ee.id,me),sa(ee,H.x+Math.cos(me)*G.speed*c,H.y+Math.sin(me)*G.speed*c),G.orientToVelocity!==!1&&ks(ee,me)}}}}}catch(we){A={error:we}}finally{try{$&&!$.done&&(R=K.return)&&R.call(K)}finally{if(A)throw A.error}}}}catch(we){_={error:we}}finally{try{Y&&!Y.done&&(P=L.return)&&P.call(L)}finally{if(_)throw _.error}}}function Gd(c,_,P,A){var R;if(re.length>=128){pi("Instance budget exhausted");return}var U=y.get(c),L=function(G){return 1+n.components.filter(function(K){return K.parentId===G}).reduce(function(K,$){return K+L($.id)},0)};if(et.size+L(U.id)>4096){pi("Runtime node budget exhausted");return}var Y="instance."+ ++Ue;function z(G,K){var $,ee,te=G.id===U.id?Y:Y+":"+G.id,H=St(St({},G),{id:te,runtimeId:te,instanceId:Y,prototypeId:G.id,prototype:!1,parentId:K,transform:qe([],Le(G.transform),!1),spawnTime:ne});et.set(te,H);try{for(var ce=Ne(n.components.filter(function(_e){return _e.parentId===G.id})),de=ce.next();!de.done;de=ce.next()){var he=de.value;z(he,te)}}catch(_e){$={error:_e}}finally{try{de&&!de.done&&(ee=ce.return)&&ee.call(ce)}finally{if($)throw $.error}}return H}var J=z(U,void 0);return J.transform[4]=_,J.transform[5]=P,A&&(J.pathStartNode=A.startNode,J.pathTargetNode=A.targetNode,J.parentId=(R=n.gameplay.find(function(G){return G.id===A.networkBehaviorId}))===null||R===void 0?void 0:R.componentId),re.push(J),Ia(J),zd(J),A&&ec(0,!1),J}function Uv(c,_,P){var A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he,_e,me,we,Ie,Ce,Ye,at,Xe,pt,mt,Bt,kt,it,Yt,It,dt;if(++ut>1024){pi("Action budget exhausted");return}if(c.kind==="add"||c.kind==="set"){var Qe=Z[c.variableId],rt=c.kind==="add"?Qe+c.value:c.value;if(typeof rt=="number"&&(!Number.isFinite(rt)||Math.abs(rt)>1e12)){pi("Variable range exceeded");return}Z[c.variableId]=rt,Qe!==rt&&en({kind:"variableChange",variableId:c.variableId,instanceId:_.instanceId})}else if(c.kind==="setComponent"||c.kind==="setAsset"){var Mt=nt(c.componentId);if(!Mt)return;var bt=(K=De.get(Mt.id))!==null&&K!==void 0?K:{transform:qe([],Le(Mt.transform),!1),parameters:{}};c.kind==="setComponent"?bt.parameters[c.key]=c.valueVariableId?Z[c.valueVariableId]:c.value:bt.assetId=c.assetId,De.set(Mt.id,bt),c.kind==="setComponent"&&c.key==="visible"&&c.value===!1&&(Tn.release(Mt.id),ai.cancel(Mt.id))}else if(c.kind==="resetMatch")Bs(c.componentId),Fo(c.componentId);else if(c.kind==="clearStrokes")($=qi.get(c.componentId))===null||$===void 0||$.clear(),Ve=Ve.filter(function(Nn){return Nn.owner!==c.componentId});else if(c.kind==="resetMask"){var Mt=nt(c.componentId),jt=yn("erase-mask",c.componentId);Mt&&jt&&Oo(Mt,jt).reset()}else if(c.kind==="raycast3d")Iv(c);else if(c.kind==="spawnAt3d")for(var zt=Math.max(1,Math.min(16,Math.floor((ee=c.count)!==null&&ee!==void 0?ee:1))),nn=0;nn<zt;nn++){var Vt=c.jitterX?(Ai.rng.next()*2-1)*c.jitterX:0,rn=c.jitterZ?(Ai.rng.next()*2-1)*c.jitterZ:0;Av(c.prototypeId,c.x+Vt,c.y,c.z+rn)}else if(c.kind==="copyMatchAsset"){var Ot=(te=ni.get(c.boardId))===null||te===void 0?void 0:te.snapshot().lastMatch,st=y.get(c.componentId),Ut=Ot&&((ce=(H=tn.get(c.boardId))===null||H===void 0?void 0:H.get(Ot.group))===null||ce===void 0?void 0:ce.children.find(function(Nn){return Nn.contract==="native.image.v1"}));if(Ot&&Ut){var Gn=y.get(Ot.from),Ln=Cn(Fn(Gn),Gn.parameters.width/2,Gn.parameters.height/2),Ri=st.parentId?Fn(y.get(st.parentId)):pa(),li=Cn(_r(Ri),Ln.x,Ln.y),Dn=(de=De.get(st.id))!==null&&de!==void 0?de:{transform:qe([],Le(st.transform),!1),parameters:{}};Dn.transform=qe([],Le(Dn.transform),!1),Dn.transform[4]=li.x-st.parameters.width/2,Dn.transform[5]=li.y-st.parameters.height/2,Dn.assetId=(he=Ut.assetSlots[0])===null||he===void 0?void 0:he.assetId,De.set(st.id,Dn)}}else if(c.kind==="hintMatch")bn=void 0,(_e=ni.get(c.componentId))===null||_e===void 0||_e.showHint();else if(c.kind==="spawn")Gd(c.prototypeId,c.x,c.y);else if(c.kind==="spawnAt"){var Un=(c.at==="self"||c.at==="midpoint")&&(_.selfInstanceId!==void 0||_.instanceId!==void 0)?nt((me=_.selfInstanceId)!==null&&me!==void 0?me:_.instanceId):Ca(c.targetComponentId,_,"self"),Qn=(c.at==="other"||c.at==="midpoint")&&_.otherInstanceId!==void 0?nt(_.otherInstanceId):void 0,st=c.at==="other"?Qn:Un;if(c.at==="pointer"||(c.at==="midpoint"?Un&&Qn:st))for(var yi=Un?oi(Un):void 0,ci=Qn?oi(Qn):void 0,Ln=c.at==="pointer"?Je:c.at==="midpoint"?{x:(yi.x+ci.x)/2,y:(yi.y+ci.y)/2}:oi(st),Hn=y.get(c.prototypeId),zt=Math.max(0,Math.min(16,Math.floor(c.countVariableId?Number(Z[c.countVariableId]):(we=c.count)!==null&&we!==void 0?we:1))),nn=0;nn<zt;nn++){var qr=c.jitterX?(Ai.rng.next()*2-1)*c.jitterX:0,kr=c.jitterY?(Ai.rng.next()*2-1)*c.jitterY:0;Gd(c.prototypeId,Ln.x+c.offsetX+qr-Hn.parameters.width/2,Ln.y+c.offsetY+kr-Hn.parameters.height/2)}}else if(c.kind==="random"){var Qe=Z[c.variableId],rt=Ai.rng.between(c.min,c.max,c.integer===!0);Z[c.variableId]=rt,Qe!==rt&&en({kind:"variableChange",variableId:c.variableId,instanceId:_.instanceId})}else if(c.kind==="modifyInstanceState"){var Mt=c.target==="component"?nt(c.componentId):Ca(c.componentId,_,c.target);Mt&&No(Mt,c.field,c.op,c.variableId?Z[c.variableId]:c.value)}else if(c.kind==="launchToward"){var Gn=y.get(c.componentId),Vi=mi(Gn),En=(Ie=_.selfInstanceId)!==null&&Ie!==void 0?Ie:_.instanceId,Mt=Gn.prototype?(Ce=Vi.find(function(on){return on.instanceId===En||on.id===En}))!==null&&Ce!==void 0?Ce:Vi[Vi.length-1]:(Ye=Ca(c.componentId,_,"self"))!==null&&Ye!==void 0?Ye:nt(c.componentId),jt=yn("physics-body",c.componentId),Nt=Mt&&ys(Mt,jt);if(!Nt)return;var Ct=void 0;if(c.targetMode==="angle-variable")Ct=Number(Z[c.angleVariableId])*Math.PI/180;else{var st=lp(Mt,c);if(!st)return;var Ln=oi(Mt);Ct=Math.atan2(st.y-Ln.y,st.x-Ln.x)}var ii=Number(c.speedVariableId?Z[c.speedVariableId]:c.speed);if(!Number.isFinite(ii)){pi("Launch speed invalid");return}Nt.vx=Math.cos(Ct)*ii,Nt.vy=Math.sin(Ct)*ii,Nt.atRest=!1,Nt.restElapsed=0,Nt.captured=!1,Nt.exited=!1,c.orientToVelocity!==!1&&ks(Mt,Ct),en(si("launch",Mt))}else if(c.kind==="moveToComponent"){var Ki=y.get(c.targetComponentId),Mt=Ca(c.componentId,_,(at=c.target)!==null&&at!==void 0?at:"self"),st=Ki&&Ui(Ki)?(Xe=Ca(c.targetComponentId,_,c.target==="other"?"self":"other"))!==null&&Xe!==void 0?Xe:mi(Ki)[0]:nt(c.targetComponentId);Mt&&st&&xs(Mt,oi(st),c.seconds)}else if(c.kind==="returnToOrigin"){var Mt=Ca(c.componentId,_,"self"),vr=Mt&&ar.get(Mt.id);Mt&&vr&&xs(Mt,vr,c.seconds)}else if(c.kind==="spawnOnPath")Gd(c.prototypeId,0,0,{startNode:c.startNode,targetNode:c.targetNode,networkBehaviorId:c.networkBehaviorId});else if(["setVelocity","applyImpulse","stopBody"].includes(c.kind)){var zr=y.get(c.componentId),Rn=_.instanceId?qe([],Le(et.values()),!1).filter(function(Mn){return Mn.instanceId===_.instanceId&&Mn.prototypeId===zr.id}):mi(zr),jt=yn("physics-body",zr.id);try{for(var ur=Ne(Rn),Cr=ur.next();!Cr.done;Cr=ur.next()){var Mt=Cr.value,Nt=ys(Mt,jt);c.kind==="setVelocity"?(Nt.vx=c.vxVariableId?Z[c.vxVariableId]:c.vx,Nt.vy=c.vyVariableId?Z[c.vyVariableId]:c.vy):c.kind==="applyImpulse"?(Nt.vx+=c.vxVariableId?Z[c.vxVariableId]:c.ix,Nt.vy+=c.vyVariableId?Z[c.vyVariableId]:c.iy):(Nt.vx=0,Nt.vy=0,Nt.atRest=!0),Nt.captured=!1,Nt.exited=!1,Nt.restElapsed=0,c.kind!=="stopBody"&&(Nt.atRest=!1)}}catch(Mn){A={error:Mn}}finally{try{Cr&&!Cr.done&&(R=ur.return)&&R.call(ur)}finally{if(A)throw A.error}}}else if(c.kind==="setPosition"){var qa=y.get(c.componentId),Rn=_.instanceId?qe([],Le(et.values()),!1).filter(function(Jt){return Jt.instanceId===_.instanceId&&Jt.prototypeId===qa.id}):mi(qa),jt=yn("physics-body",qa.id);try{for(var Rr=Ne(Rn),dr=Rr.next();!dr.done;dr=Rr.next()){var Mt=dr.value,Nt=ys(Mt,jt);Nt.x=c.xVariableId?Z[c.xVariableId]:c.x,Nt.y=c.yVariableId?Z[c.yVariableId]:c.y,Nt.vx=0,Nt.vy=0,Nt.captured=!1,Nt.exited=!1,Nt.atRest=!0,sa(Mt,Nt.x,Nt.y)}}catch(Jt){U={error:Jt}}finally{try{dr&&!dr.done&&(L=Rr.return)&&L.call(Rr)}finally{if(U)throw U.error}}}else if(c.kind==="setPathEdge")(pt=In.get(c.behaviorId))===null||pt===void 0||pt.setEdge(c.edgeId,c.enabled,c.cost);else if(c.kind==="setPathGate")(Bt=In.get((mt=n.gameplay.find(function(Nn){return Nn.id===c.behaviorId}))===null||mt===void 0?void 0:mt.parameters.networkBehaviorId))===null||Bt===void 0||Bt.setGate(c.behaviorId,c.mode,c.holdSeconds);else if(c.kind==="setPathTarget"){var la=y.get(c.componentId),jt=yn("path-agent",la.id),hr=In.get(jt.parameters.networkBehaviorId);try{for(var ca=Ne(_.instanceId?qe([],Le(et.values()),!1).filter(function(Mn){return Mn.instanceId===_.instanceId&&Mn.prototypeId===la.id}):mi(la)),Gi=ca.next();!Gi.done;Gi=ca.next()){var Mt=Gi.value;Mt.pathTargetNode=c.targetNode,hr?.setTarget(Mt.id,c.targetNode)}}catch(Mn){Y={error:Mn}}finally{try{Gi&&!Gi.done&&(z=ca.return)&&z.call(ca)}finally{if(Y)throw Y.error}}}else if(c.kind==="compute"){var xi=Number(Z[c.variableId]),ui=c.operandVariableId!==void 0?Number(Z[c.operandVariableId]):c.value;if(["div","mod"].includes(c.op)&&ui===0){pi("Division by zero");return}var rt={add:function(){return xi+ui},sub:function(){return xi-ui},mul:function(){return xi*ui},div:function(){return ui===0?xi:xi/ui},mod:function(){return ui===0?xi:xi%ui},min:function(){return Math.min(xi,ui)},max:function(){return Math.max(xi,ui)},set:function(){return ui},floor:function(){return Math.floor(xi)},ceil:function(){return Math.ceil(xi)},abs:function(){return Math.abs(xi)},clamp:function(){return Math.max(c.min,Math.min(c.max,xi))}}[c.op]();if(c.round&&(rt=Math.round(rt)),!Number.isFinite(rt)||Math.abs(rt)>1e12){pi("Variable range exceeded");return}var Qe=Z[c.variableId];Z[c.variableId]=rt,Qe!==rt&&en({kind:"variableChange",variableId:c.variableId,instanceId:_.instanceId})}else if(c.kind==="despawn"){var Un=(kt=_.selfInstanceId)!==null&&kt!==void 0?kt:_.instanceId;c.target==="other"?Zn(_.otherInstanceId):c.target==="both"?(Zn(Un),Zn(_.otherInstanceId)):Zn(Un)}else if(c.kind==="changeScene")hn=c.sceneId;else if(c.kind==="restart")(it=D?.notifyGameRetry)===null||it===void 0||it.call(D),hn="__restart";else if(c.kind==="cameraShake")E?.matches||(Me={intensity:c.intensity,seconds:c.seconds,elapsed:0});else if(c.kind==="screenFlash")ve.push({color:c.color,opacity:c.opacity,seconds:c.seconds,elapsed:0}),ve.length>8&&ve.shift();else if(c.kind==="floatingText"){var Ra=y.get(c.componentId),Gn=_.instanceId?(Yt=qe([],Le(et.values()),!1).find(function(Jt){return Jt.instanceId===_.instanceId&&Jt.prototypeId===c.componentId}))!==null&&Yt!==void 0?Yt:Ra:(It=nt(c.componentId))!==null&&It!==void 0?It:Ra,st=Gn?.sceneId===W?Gn:Ra;if(st){var Ln=void 0;if(st.contract==="native.mesh3d.v1"&&(Ln=Ud(st.id)),!Ln){var _i=Ft(st);Ln=Cn(Fn(st),_i.width/2,_i.height/2)}le.push({x:Ln.x,y:Ln.y,text:c.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(on,Vr){var Fi;return String((Fi=Z[Vr])!==null&&Fi!==void 0?Fi:"")}),color:c.color,fontSize:c.fontSize,risePx:c.risePx,seconds:c.seconds,elapsed:0}),le.length>32&&le.shift()}}else if(c.kind==="store")_.kind==="click"&&_.pointerId!==void 0&&!w&&(w={pointerId:_.pointerId,targetId:_.targetId,condition:P},(dt=e.setPointerCapture)===null||dt===void 0||dt.call(e,_.pointerId));else if(c.behaviorId){var Jn=n.gameplay.find(function(Nn){return Nn.id===c.behaviorId});if(c.kind==="playAudio")op(Jn);else if(c.kind==="animate"){var Pn=y.get(Jn.componentId),Rn=Ui(Pn)?qe([],Le(et.values()),!1).filter(function(Mn){return Mn.prototypeId===Pn.id&&(!_.instanceId||Mn.instanceId===_.instanceId)}):[Pn],ua=function(Mn){var Jt=Jn.id+":"+Mn.id;Se=Se.filter(function(Vr){return Vr.id!==Jt});var on=St({},Jn.parameters);on.fromCurrent&&(on.from=on.property==="opacity"?Ft(Mn).opacity:lr(Mn)[on.property==="x"?4:5]),Se.push(St(St({},Jn),{parameters:on,id:Jt,behaviorId:Jn.id,targetId:Mn.id,elapsed:0,baseTransform:qe([],Le(Mn.transform),!1)}))};try{for(var fr=Ne(Rn),gr=fr.next();!gr.done;gr=fr.next()){var st=gr.value;ua(st)}}catch(Mn){J={error:Mn}}finally{try{gr&&!gr.done&&(G=fr.return)&&G.call(fr)}finally{if(J)throw J.error}}}else c.kind==="stopAnimation"?Se=Se.filter(function(Nn){return Nn.behaviorId!==Jn.id}):c.kind==="emit"&&Fv(Jn,_)}}function Fv(c,_){var P,A,R,U,L,Y,z=c.parameters,J=z.shape==="pixel-confetti",G=z.shape==="confetti",K=J||G;if(!(K&&E?.matches)){if(ye.length+z.count>256){pi("Particle budget exhausted");return}if(J&&z.coverage==="screen"){ye.push.apply(ye,qe([],Le(av(z)),!1));return}if(G&&z.coverage==="screen"){ye.push.apply(ye,qe([],Le(ov(z)),!1));return}for(var $=y.get(c.componentId),ee=_.instanceId&&(P=qe([],Le(et.values()),!1).find(function(Ie){return Ie.instanceId===_.instanceId&&Ie.prototypeId===$.id}))!==null&&P!==void 0?P:$,te=lr(ee),H,ce=nt(ee.parentId);ce;ce=nt(ce.parentId)){if(K&&ce.contract==="native.group.v1"&&Ft(ce).clip){H=ce.id;break}te=Hs(lr(ce),te)}var de=Ft(ee),he=z.origin==="anchor"?Cn(te,0,0):K||z.origin==="center"?Cn(te,de.width/2,de.height/2):{x:te[4]+ee.parameters.width/2,y:te[5]+ee.parameters.height/2};if(J){ye.push.apply(ye,qe([],Le(Xf(z,he,H)),!1));return}if(G){ye.push.apply(ye,qe([],Le(Yf(z,he,H)),!1));return}for(var _e=0;_e<z.count;_e++){var me=((A=z.spread)!==null&&A!==void 0?A:360)===360?_e*2.399963:-Math.PI/2+((_e+.5)/z.count-.5)*((R=z.spread)!==null&&R!==void 0?R:360)*Math.PI/180,we=z.speed*(.5+_e%7/14);ye.push(St(St({},he),{vx:Math.cos(me)*we,vy:Math.sin(me)*we,life:(U=z.lifetime)!==null&&U!==void 0?U:.7,gravity:(L=z.gravity)!==null&&L!==void 0?L:250,color:z.color,shape:(Y=z.shape)!==null&&Y!==void 0?Y:"circle"}))}}}function oa(){for(var c=function(){var _,P,A,R,U,L,Y=ue.shift();Gt++;var z=function(me){return me===void 0||!!nt(me)||qe([],Le(et.values()),!1).some(function(we){return we.instanceId===me})};if(!z(Y.selfInstanceId)||!z(Y.otherInstanceId)||["contactBegin","boundaryExit"].includes(Y.kind)&&Y.instanceId&&!et.has(Y.instanceId))return"continue";try{for(var J=(_=void 0,Ne(n.eventBindings)),G=J.next();!G.done;G=J.next()){var K=G.value;if(Object.entries(O.get(K.eventId)).every(function(me){var we=Le(me,2),Ie=we[0],Ce=we[1];return Ie==="id"||Y[Ie]===Ce})&&Xa(K.condition,Y)){try{for(var $=(A=void 0,Ne(K.actions)),ee=$.next();!ee.done;ee=$.next()){var te=ee.value;if(ut>=1024||wt)break;Uv(te,Y,K.condition)}}catch(me){A={error:me}}finally{try{ee&&!ee.done&&(R=$.return)&&R.call($)}finally{if(A)throw A.error}}if(hn)break}}}catch(me){_={error:me}}finally{try{G&&!G.done&&(P=J.return)&&P.call(J)}finally{if(_)throw _.error}}if(hn){var H=hn;if(hn=void 0,H==="__restart")Fd();else if(H!==W){var ce=W;yt(),W=H,Zi.clear(),Tn.clear(),ar.clear(),Ar.clear(),ra.clear(),qi.clear(),Ve=[],Tt=[],sr.clear(),aa.clear(),bn=void 0,re=[],ye=[],le=[],ve=[],Me=void 0,$e=!1,Ae=0,et.clear(),vt.clear(),gn.clear(),Et.clear(),ln.clear(),dn.clear(),gt.clear(),Ht?.reset(),Di.clear(),Er.clear(),I=void 0,ep(),ue=ue.filter(function(me){return me.kind==="variableChange"}),De.clear(),qn=void 0;try{for(var de=(U=void 0,Ne(ni.values())),he=de.next();!he.done;he=de.next()){var _e=he.value;_e.reset()}}catch(me){U={error:me}}finally{try{he&&!he.done&&(L=de.return)&&L.call(de)}finally{if(U)throw U.error}}fe.clear(),Fe.clear(),lt.clear(),Se=[],Ii(),F.clear(),Pt=void 0,$t=void 0,nc(),tp(),ec(0,!1),zd(),Dd(0),en({kind:"sceneExit",sceneId:ce}),en({kind:"sceneEnter",sceneId:W})}}};ue.length&&!wt&&Gt<256&&ut<1024;)c();ue.length&&pi("Event/action budget exhausted")}function Fn(c){return Hs(c.parentId?Fn(nt(c.parentId)):pa(),lr(c))}var Cn=function(c,_,P){return{x:c[0]*_+c[2]*P+c[4],y:c[1]*_+c[3]*P+c[5]}};function $i(c,_){var P=Ft(c),A=[[0,0],[P.width,0],[P.width,P.height],[0,P.height]].map(function(R){var U=Le(R,2),L=U[0],Y=U[1];return Cn(_,L,Y)});return{left:Math.min.apply(Math,qe([],Le(A.map(function(R){return R.x})),!1)),right:Math.max.apply(Math,qe([],Le(A.map(function(R){return R.x})),!1)),top:Math.min.apply(Math,qe([],Le(A.map(function(R){return R.y})),!1)),bottom:Math.max.apply(Math,qe([],Le(A.map(function(R){return R.y})),!1))}}function ti(c){return Ft(c).visible&&Ft(c).opacity>0&&(!c.parentId||ti(nt(c.parentId)))}function cp(c,_){for(var P=Ft(c),A=Fn(c),R=Math.min(P.width,P.height)/2,U=_==="circle"?Array.from({length:32},function(z,J){return Cn(A,P.width/2+Math.cos(J*Math.PI/16)*R,P.height/2+Math.sin(J*Math.PI/16)*R)}):[[0,0],[P.width,0],[P.width,P.height],[0,P.height]].map(function(z){var J=Le(z,2),G=J[0],K=J[1];return Cn(A,G,K)}),L=c.parentId?nt(c.parentId):void 0,Y=function(){var z=Ft(L);if(L.contract==="native.group.v1"&&z.clip){for(var J=Fn(L),G=[[0,0],[z.width,0],[z.width,z.height],[0,z.height]].map(function(H){var ce=Le(H,2),de=ce[0],he=ce[1];return Cn(J,de,he)}),K=0,$=0;$<4;$++)K+=G[$].x*G[($+1)%4].y-G[($+1)%4].x*G[$].y;for(var ee=K>=0?1:-1,te=function(H){var ce,de,he=G[H],_e=G[(H+1)%4],me=function(Bt){return ee*((_e.x-he.x)*(Bt.y-he.y)-(_e.y-he.y)*(Bt.x-he.x))},we=U;U=[];var Ie=we[we.length-1],Ce=me(Ie);try{for(var Ye=(ce=void 0,Ne(we)),at=Ye.next();!at.done;at=Ye.next()){var Xe=at.value,pt=me(Xe);if(pt>=0!=Ce>=0){var mt=Ce/(Ce-pt);U.push({x:Ie.x+(Xe.x-Ie.x)*mt,y:Ie.y+(Xe.y-Ie.y)*mt})}pt>=0&&U.push(Xe),Ie=Xe,Ce=pt}}catch(Bt){ce={error:Bt}}finally{try{at&&!at.done&&(de=Ye.return)&&de.call(Ye)}finally{if(ce)throw ce.error}}},$=0;$<4&&U.length;$++)te($)}L=L.parentId?nt(L.parentId):void 0};L;)Y();return U}function Ov(c,_){var P,A,R,U,L,Y;if(c.length<3||_.length<3)return!1;try{for(var z=Ne([c,_]),J=z.next();!J.done;J=z.next())for(var G=J.value,K=0;K<G.length;K++){var $=G[K],ee=G[(K+1)%G.length],te=$.y-ee.y,H=ee.x-$.x,ce=1/0,de=-1/0,he=1/0,_e=-1/0;try{for(var me=(R=void 0,Ne(c)),we=me.next();!we.done;we=me.next()){var Ie=we.value,Ce=Ie.x*te+Ie.y*H;ce=Math.min(ce,Ce),de=Math.max(de,Ce)}}catch(Xe){R={error:Xe}}finally{try{we&&!we.done&&(U=me.return)&&U.call(me)}finally{if(R)throw R.error}}try{for(var Ye=(L=void 0,Ne(_)),at=Ye.next();!at.done;at=Ye.next()){var Ie=at.value,Ce=Ie.x*te+Ie.y*H;he=Math.min(he,Ce),_e=Math.max(_e,Ce)}}catch(Xe){L={error:Xe}}finally{try{at&&!at.done&&(Y=Ye.return)&&Y.call(Ye)}finally{if(L)throw L.error}}if(de<he||_e<ce)return!1}}catch(Xe){P={error:Xe}}finally{try{J&&!J.done&&(A=z.return)&&A.call(z)}finally{if(P)throw P.error}}return!0}function Bv(c){var _,P,A,R,U=b();try{for(var L=Ne(Zi.values()),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=z.behavior.parameters;if(!(!J.moveComponentId||z.magnitude<=0)){var G=nt(J.moveComponentId);if(!(!G||!ti(G))){var K=(A=J.moveSpeed)!==null&&A!==void 0?A:220,$=yn("physics-body",(R=G.prototypeId)!==null&&R!==void 0?R:G.id);if($&&$.parameters.mode==="dynamic"){var ee=ys(G,$);ee.vx=z.nx*K,ee.vy=z.ny*K,ee.atRest=!1,ee.restElapsed=0}else{var te=oi(G),H=Ft(G),ce=te.x+z.nx*K*c,de=te.y+z.ny*K*c;up(G)||(ce=Math.max(H.width/2,Math.min(U.width-H.width/2,ce)),de=Math.max(H.height/2,Math.min(U.height-H.height/2,de))),sa(G,ce,de)}J.orientToMove&&ks(G,Math.atan2(z.ny,z.nx))}}}}catch(he){_={error:he}}finally{try{Y&&!Y.done&&(P=L.return)&&P.call(L)}finally{if(_)throw _.error}}}function kv(c){var _,P,A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he,_e,me,we,Ie,Ce,Ye,at,Xe,pt,mt,Bt,kt,it,Yt,It=b();ne+=c,jv(c),Dv(c),Bv(c),Nv(c),bv();try{for(var dt=Ne(Kt),Qe=dt.next();!Qe.done;Qe=dt.next()){var rt=Le(Qe.value,2),Mt=rt[0],bt=rt[1];!bt.held&&ne-((Ce=bt.releasedAt)!==null&&Ce!==void 0?Ce:ne)>=bt.behavior.springBackSeconds&&Kt.delete(Mt)}}catch(Wt){_={error:Wt}}finally{try{Qe&&!Qe.done&&(P=dt.return)&&P.call(dt)}finally{if(_)throw _.error}}Me&&(Me.elapsed+=c,Me.elapsed>=Me.seconds&&(Me=void 0));try{for(var jt=Ne(ve),zt=jt.next();!zt.done;zt=jt.next()){var nn=zt.value;nn.elapsed+=c}}catch(Wt){A={error:Wt}}finally{try{zt&&!zt.done&&(R=jt.return)&&R.call(jt)}finally{if(A)throw A.error}}ve=ve.filter(function(Wt){return Wt.elapsed<Wt.seconds});try{for(var Vt=Ne(le),rn=Vt.next();!rn.done;rn=Vt.next()){var Ot=rn.value;Ot.elapsed+=c}}catch(Wt){U={error:Wt}}finally{try{rn&&!rn.done&&(L=Vt.return)&&L.call(Vt)}finally{if(U)throw U.error}}le=le.filter(function(Wt){return Wt.elapsed<Wt.seconds});try{for(var st=Ne(ni),Ut=st.next();!Ut.done;Ut=st.next()){var Gn=Le(Ut.value,2),Mt=Gn[0],Ln=Gn[1];y.get(Mt).sceneId===W&&ti(y.get(Mt))&&Ln.tick(c)}}catch(Wt){Y={error:Wt}}finally{try{Ut&&!Ut.done&&(z=st.return)&&z.call(st)}finally{if(Y)throw Y.error}}var Ri=function(Wt){var kn,Oi,Wn=y.get(Wt.componentId);if(Wn.sceneId!==W)return"continue";var xr=Ui(Wn)?qe([],Le(et.values()),!1).filter(function(Vo){return Vo.prototypeId===Wn.id}):[Wn];try{for(var On=(kn=void 0,Ne(xr)),Bi=On.next();!Bi.done;Bi=On.next()){var Hi=Bi.value,Pa=Wt.id+":"+Hi.id;if(Wt.kind==="motion"){var Qi=(Ye=De.get(Hi.id))!==null&&Ye!==void 0?Ye:{transform:qe([],Le(Hi.transform),!1),parameters:{}},da=(at=Qi.velocity)!==null&&at!==void 0?at:{x:Wt.parameters.vx,y:Wt.parameters.vy};da.y+=Wt.parameters.gravity*c,Qi.transform[4]+=da.x*c,Qi.transform[5]+=da.y*c,Qi.velocity=da,De.set(Hi.id,Qi),Hi.prototypeId&&(Hi.transform=Qi.transform);var Vs=Fn(Hi);(Vs[5]>It.height||Vs[4]<-300||Vs[4]>It.width+300)&&(Qi.exited||(Qi.exited=!0,en({kind:"boundaryExit",componentId:Wn.id,instanceId:Hi.instanceId})))}else if(Wt.kind==="timer"){var Ja=((Xe=lt.get(Pa))!==null&&Xe!==void 0?Xe:0)+c;lt.set(Pa,Ja),Ja>=Wt.parameters.seconds&&Ja-c<Wt.parameters.seconds&&(en({kind:"timer",behaviorId:Wt.id,componentId:Wn.id}),Wt.parameters.repeat&&lt.set(Pa,Ja-Wt.parameters.seconds))}}}catch(Vo){kn={error:Vo}}finally{try{Bi&&!Bi.done&&(Oi=On.return)&&Oi.call(On)}finally{if(kn)throw kn.error}}};try{for(var li=Ne(n.gameplay),Dn=li.next();!Dn.done;Dn=li.next()){var Un=Dn.value;Ri(Un)}}catch(Wt){J={error:Wt}}finally{try{Dn&&!Dn.done&&(G=li.return)&&G.call(li)}finally{if(J)throw J.error}}Sv(c),Tv(c),ec(c),Dd(c);var Qn=[],yi=function(Wt){var kn,Oi,Wn=y.get(Wt.componentId);if(Wn.sceneId!==W)return"continue";try{for(var xr=(kn=void 0,Ne(Ui(Wn)?qe([],Le(et.values()),!1).filter(function(Hi){return Hi.prototypeId===Wn.id}):[Wn])),On=xr.next();!On.done;On=xr.next()){var Bi=On.value;if(ti(Bi)){if(Qn.length>=256){pi("Collider budget exhausted");break}Qn.push({b:Wt,c:Bi,box:$i(Bi,Fn(Bi)),polygon:cp(Bi,Wt.parameters.shape)})}}}catch(Hi){kn={error:Hi}}finally{try{On&&!On.done&&(Oi=xr.return)&&Oi.call(xr)}finally{if(kn)throw kn.error}}};try{for(var ci=Ne(n.gameplay.filter(function(Wt){return Wt.kind==="collider"})),Hn=ci.next();!Hn.done;Hn=ci.next()){var Un=Hn.value;yi(Un)}}catch(Wt){K={error:Wt}}finally{try{Hn&&!Hn.done&&($=ci.return)&&$.call(ci)}finally{if(K)throw K.error}}var qr=new Set,kr=new Map,Vi=function(Wt,kn,Oi){var Wn,xr,On;((Wn=kn.c.prototypeId)!==null&&Wn!==void 0?Wn:kn.c.id)===((xr=Oi.c.prototypeId)!==null&&xr!==void 0?xr:Oi.c.id)&&kn.c.id>Oi.c.id||en(St(St({},si(Wt,kn.c,Oi.c)),{instanceId:(On=kn.c.instanceId)!==null&&On!==void 0?On:Oi.c.instanceId}))},En=0;e:for(var Nt=0;Nt<Qn.length;Nt++)for(var Un=Nt+1;Un<Qn.length;Un++){var Ct=Qn[Nt],ii=Qn[Un];if(!(Ct.c.instanceId&&Ct.c.instanceId===ii.c.instanceId)){var Ki=Ct.box,vr=ii.box,zr=Ki.left<vr.right&&Ki.right>vr.left&&Ki.top<vr.bottom&&Ki.bottom>vr.top;if(zr){if(++En>4096){pi("Collision budget exhausted");break e}zr=Ov(Ct.polygon,ii.polygon)}if(zr){var Rn=[Ct.c.id,ii.c.id].sort().join("|");if(qr.add(Rn),kr.set(Rn,[Ct,ii]),!fe.has(Rn))try{for(var ur=(ee=void 0,Ne([[Ct,ii],[ii,Ct]])),Cr=ur.next();!Cr.done;Cr=ur.next()){var qa=Le(Cr.value,2),Rr=qa[0],dr=qa[1];Vi("contactBegin",Rr,dr)}}catch(kn){ee={error:kn}}finally{try{Cr&&!Cr.done&&(te=ur.return)&&te.call(ur)}finally{if(ee)throw ee.error}}}}}try{for(var la=Ne(Fe),hr=la.next();!hr.done;hr=la.next()){var ca=Le(hr.value,2),Rn=ca[0],Gi=Le(ca[1],2),Ct=Gi[0],ii=Gi[1];if(!qr.has(Rn))try{for(var xi=(de=void 0,Ne([[Ct,ii],[ii,Ct]])),ui=xi.next();!ui.done;ui=xi.next()){var Ra=Le(ui.value,2),Rr=Ra[0],dr=Ra[1];Vi("contactEnd",Rr,dr)}}catch(Wn){de={error:Wn}}finally{try{ui&&!ui.done&&(he=xi.return)&&he.call(xi)}finally{if(de)throw de.error}}}}catch(Wt){H={error:Wt}}finally{try{hr&&!hr.done&&(ce=la.return)&&ce.call(la)}finally{if(H)throw H.error}}fe=qr,Fe=kr;try{for(var _i=Ne(Se),Jn=_i.next();!Jn.done;Jn=_i.next()){var Nt=Jn.value;Nt.elapsed+=c;var Pn=Nt.parameters,ua=(pt=Pn.delay)!==null&&pt!==void 0?pt:0,fr=Nt.elapsed-ua;if(!(fr<0)){var gr=fr/Pn.seconds,Nn=Pn.loop?gr%1:Math.min(1,gr),Mn=(mt=Pn.easing)!==null&&mt!==void 0?mt:"ease-out",Jt=Nn;Pn.loop&&Mn==="ease-in-out"?Jt=.5-.5*Math.cos(Nn*Math.PI*2):Mn==="ease-out"?Jt=1-Math.pow(1-Nn,3):Mn==="ease-in"?Jt=Math.pow(Nn,3):Mn==="ease-in-out"?Jt=Nn<.5?4*Math.pow(Nn,3):1-Math.pow(-2*Nn+2,3)/2:Mn==="back-out"&&(Jt=1+2.70158*Math.pow(Nn-1,3)+1.70158*Math.pow(Nn-1,2));var on=Pn.from+(Pn.to-Pn.from)*Jt,Vr=nt((Bt=Nt.targetId)!==null&&Bt!==void 0?Bt:Nt.componentId);if(Vr){var Fi=(kt=De.get(Vr.id))!==null&&kt!==void 0?kt:{transform:qe([],Le(Vr.transform),!1),parameters:{}},yr=(it=Nt.baseTransform)!==null&&it!==void 0?it:Vr.transform;if(Pn.property==="opacity")Fi.parameters.opacity=Math.max(0,Math.min(1,on));else if(["scale","scaleX","scaleY","rotation"].includes(Pn.property)){(Yt=Fi.animationAxes)!==null&&Yt!==void 0||(Fi.animationAxes={scale:1,scaleX:1,scaleY:1,rotation:0}),Fi.animationAxes[Pn.property]=on;var Zr=Fi.animationAxes,lc=Zr.rotation*Math.PI/180,_s=Math.cos(lc),Za=Math.sin(lc),zs=Zr.scale*Zr.scaleX,zo=Zr.scale*Zr.scaleY;Fi.transform[0]=(yr[0]*_s+yr[2]*Za)*zs,Fi.transform[1]=(yr[1]*_s+yr[3]*Za)*zs,Fi.transform[2]=(-yr[0]*Za+yr[2]*_s)*zo,Fi.transform[3]=(-yr[1]*Za+yr[3]*_s)*zo}else Fi.transform[Pn.property==="x"?4:5]=on;De.set(Vr.id,Fi),Pn.loop&&fr>=Pn.seconds&&(Nt.elapsed=ua+fr%Pn.seconds)}}}}catch(Wt){_e={error:Wt}}finally{try{Jn&&!Jn.done&&(me=_i.return)&&me.call(_i)}finally{if(_e)throw _e.error}}Se=Se.filter(function(Wt){var kn,Oi;return nt((kn=Wt.targetId)!==null&&kn!==void 0?kn:Wt.componentId)&&(Wt.elapsed<Wt.parameters.seconds+((Oi=Wt.parameters.delay)!==null&&Oi!==void 0?Oi:0)||Wt.parameters.loop)});try{for(var Jr=Ne(ye),$r=Jr.next();!$r.done;$r=Jr.next()){var Pn=$r.value;if(Pn.shape==="pixel-confetti"||Pn.shape==="confetti"){Pn.age+=c;continue}Pn.life-=c,Pn.x+=Pn.vx*c,Pn.y+=Pn.vy*c,Pn.vy+=Pn.gravity*c}}catch(Wt){we={error:Wt}}finally{try{$r&&!$r.done&&(Ie=Jr.return)&&Ie.call(Jr)}finally{if(we)throw we.error}}ye=ye.filter(function(Wt){var kn;return Wt.life>((kn=Wt.age)!==null&&kn!==void 0?kn:0)}),oa()}function rc(c,_){var P,A,R;if(v.beginPath(),c.contract==="native.ellipse.v1")v.ellipse(_.width/2,_.height/2,_.width/2,_.height/2,0,0,Math.PI*2);else if(c.contract==="native.path.v1"){var U=function($,ee){({M:function(){return v.moveTo.apply(v,qe([],Le(ee),!1))},L:function(){return v.lineTo.apply(v,qe([],Le(ee),!1))},C:function(){return v.bezierCurveTo.apply(v,qe([],Le(ee),!1))},Q:function(){return v.quadraticCurveTo.apply(v,qe([],Le(ee),!1))},Z:function(){return v.closePath()}})[$]()};try{for(var L=Ne(_.commands),Y=L.next();!Y.done;Y=L.next()){var z=Le(Y.value),J=z[0],G=z.slice(1);U(J,G)}}catch($){P={error:$}}finally{try{Y&&!Y.done&&(A=L.return)&&A.call(L)}finally{if(P)throw P.error}}}else{var K=Math.min((R=_.radius)!==null&&R!==void 0?R:0,_.width/2,_.height/2);typeof v.roundRect=="function"?v.roundRect(0,0,_.width,_.height,K):(v.moveTo(K,0),v.arcTo(_.width,0,_.width,_.height,K),v.arcTo(_.width,_.height,0,_.height,K),v.arcTo(0,_.height,0,0,K),v.arcTo(0,0,_.width,0,K),v.closePath())}}function zv(c,_,P){var A,R,U,L=(A=De.get(c.id))===null||A===void 0?void 0:A.pathFrame;if(L!==void 0)return Math.min(_.frameCount-1,L);if(h||!_.frameRate)return 0;if(c.contract!=="native.walk-sprite.v1")return Math.floor(Math.max(0,ne-((R=c.spawnTime)!==null&&R!==void 0?R:0))*_.frameRate)%_.frameCount;var Y=(U=c.runtimeId)!==null&&U!==void 0?U:c.id,z=ie.get(Y);if(!z)return ie.set(Y,{x:P[4],y:P[5],phase:0,lastMove:-1/0,frame:0}),0;var J=Math.hypot(P[4]-z.x,P[5]-z.y)>.3;if(J){var G=ne-z.lastMove;z.phase=Number.isFinite(G)&&G<.25?z.phase+Math.min(G,.12)*_.frameRate:0,z.lastMove=ne}return z.x=P[4],z.y=P[5],ne-z.lastMove>.11&&(z.phase=0),z.frame=Math.floor(z.phase)%_.frameCount,z.frame}function ko(c,_,P,A){var R,U,L,Y,z,J,G,K,$,ee,te;if(_===void 0&&(_=pa()),P===void 0&&(P=[]),c.contract!=="native.mesh3d.v1"){var H=Ft(c),ce=yn("erase-mask",(z=c.prototypeId)!==null&&z!==void 0?z:c.id);if(!(!H.visible||H.opacity<=0)){var de=Hs(_,lr(c));v.save(),v.transform.apply(v,qe([],Le(lr(c)),!1)),v.globalAlpha*=H.opacity;var he=Kt.get(c.id);he?.behavior.liftShadow&&(v.shadowColor="#00000055",v.shadowBlur=8,v.shadowOffsetY=4);var _e=P;c.contract==="native.group.v1"&&H.clip&&(v.beginPath(),v.rect(0,0,H.width,H.height),v.clip(),_e=qe(qe([],Le(P),!1),[{matrix:de,width:H.width,height:H.height}],!1));var me=!1;if(!["native.group.v1","native.text.v1","native.image.v1","native.sprite.v1","native.walk-sprite.v1","native.stage3d.v1","native.mesh3d.v1"].includes(c.contract)){var we=c.contract==="native.button.v1",Ie=Pt===c.id,Ce=we?H.enabled?Ie?H.pressedFill:cn===c.id?H.hoverFill:H.fill:H.disabledFill:H.fill;if(we&&(H.presentation==="pixel-cta"||H.presentation==="shiny-cta")){var Ye=(J=q.get(c.id))!==null&&J!==void 0?J:oe;F.set(c.id,Ye);var at=!h&&!E?.matches?oe-Ye:-1;H.presentation==="shiny-cta"?uv(v,H,Ce,Ie,at):cv(v,H,Ce,Ie,at)}else H.pixelFrame&&(v.save(),v.translate(3,4),rc(c,H),v.fillStyle="#3c293366",v.fill(),v.restore()),rc(c,H),ce?(v.save(),v.clip(),Oo(c,ce).render(v),v.restore(),me=!0,rc(c,H)):(v.fillStyle=Ce,v.fill()),H.pixelFrame&&!(H.radius>0)&&(v.fillStyle="#ffffff22",v.fillRect(2,2,Math.max(0,H.width-4),2),v.fillRect(2,2,2,Math.max(0,H.height-4))),H.strokeWidth&&(v.strokeStyle=H.stroke,v.lineWidth=H.strokeWidth,v.stroke());bn===c.id&&(rc(c,H),v.strokeStyle="#ffffff",v.lineWidth=5,v.stroke())}var Xe;if(c.contract==="native.text.v1"){var pt=H.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(Dn,Un){var Qn;return String((Qn=Z[Un])!==null&&Qn!==void 0?Qn:"")});H.pixelPanel&&(v.fillStyle="#3c293366",v.fillRect(3,4,H.width,H.height),v.fillStyle=H.panelFill,v.fillRect(0,0,H.width,H.height),v.strokeStyle=(G=H.panelStroke)!==null&&G!==void 0?G:H.color,v.lineWidth=2,v.strokeRect(1,1,H.width-2,H.height-2),v.fillStyle="#ffffff22",v.fillRect(3,3,Math.max(0,H.width-6),2));var mt=H.fontFamily==="pixel"?Gf(pt,H):void 0;mt&&!mt.unsupportedChars.length?Xe=rv(v,pt,H):Xe=qb(v,pt,mt?St(St({},H),{fontFamily:"sans-serif",fontWeight:"700"}):H)}if(["native.image.v1","native.sprite.v1","native.walk-sprite.v1"].includes(c.contract)&&!ce){var Bt=N.get(($=(K=De.get(c.id))===null||K===void 0?void 0:K.assetId)!==null&&$!==void 0?$:(ee=c.assetSlots[0])===null||ee===void 0?void 0:ee.assetId);if(Bt?.complete&&Bt.naturalWidth){v.save(),v.beginPath(),v.rect(0,0,H.width,H.height),v.clip();var kt=c.contract!=="native.image.v1",it=kt?Math.min(H.frameColumns,H.frameCount):1,Yt=kt?Math.ceil(H.frameCount/it):1,It=Bt.width/it,dt=Bt.height/Yt,Qe=kt?zv(c,H,de):0,rt=Qe%it*It,Mt=Math.floor(Qe/it)*dt,bt=H.fit==="cover"?Math.max(H.width/It,H.height/dt):Math.min(H.width/It,H.height/dt),jt=H.fit==="stretch"?H.width:It*bt,zt=H.fit==="stretch"?H.height:dt*bt;v.imageSmoothingEnabled=(te=H.smoothing)!==null&&te!==void 0?te:!0,v.drawImage(Bt,rt,Mt,It,dt,(H.width-jt)/2,(H.height-zt)/2,jt,zt),v.restore()}}if(ce&&!me&&Oo(c,ce).render(v),c.contract==="native.stage3d.v1"&&Ht){var rt=Math.hypot(de[0],de[1]),Mt=Math.hypot(de[2],de[3]),nn=Ht.renderStage(c,v,H.width*rt*se*be,H.height*Mt*se*be,H.width,H.height,{time:ne,ambientTime:oe,propsOf:Ft,bodies3d:Et,fpsPose:gt.get(c.id),instances3d:np(c.id),aimLocked:!!ct,groundFn:Xs,worldWidth:H.width*rt,worldHeight:H.height*Mt});try{for(var Vt=Ne(Et),rn=Vt.next();!rn.done;rn=Vt.next()){var Ot=Le(rn.value,2),st=Ot[0],Ut=Ot[1];if(Ut.stageId===c.id&&Ut.mode==="dynamic"){var Gn=nn.project({x:Ut.x,y:Ut.y,z:Ut.z},H.width,H.height);dn.set(st,Cn(de,Gn.x,Gn.y))}}}catch(Qn){R={error:Qn}}finally{try{rn&&!rn.done&&(U=Vt.return)&&U.call(Vt)}finally{if(R)throw R.error}}}X.push({c,m:de,clips:_e,instance:A??c.prototypeId,textMetrics:Xe});try{for(var Ln=Ne(_n(c.id)),Ri=Ln.next();!Ri.done;Ri=Ln.next()){var li=Ri.value;ko(li,de,_e,A??c.prototypeId)}}catch(Dn){L={error:Dn}}finally{try{Ri&&!Ri.done&&(Y=Ln.return)&&Y.call(Ln)}finally{if(L)throw L.error}}H.clip&&c.contract==="native.group.v1"&&Hd(c.id),v.restore()}}}function Hd(c,_){var P,A;if(!E?.matches)try{for(var R=Ne(ye),U=R.next();!U.done;U=R.next()){var L=U.value;L.shape!=="pixel-confetti"&&L.shape!=="confetti"||L.clipId!==c||!!L.screen!=!!_||(v.save(),L.shape==="confetti"?lv(v,L,_):sv(v,L,_),v.restore())}}catch(Y){P={error:Y}}finally{try{U&&!U.done&&(A=R.return)&&A.call(R)}finally{if(P)throw P.error}}}function Vv(c,_,P,A){v.save(),v.translate(c,_),v.globalAlpha=.92,v.lineWidth=2,v.lineJoin="round",P==="tap"&&(v.strokeStyle="#fff0bd",v.globalAlpha=.7*(1-A),v.beginPath(),v.arc(0,0,12+A*12,0,Math.PI*2),v.stroke(),v.globalAlpha=.92),v.fillStyle="#fff0bd",v.strokeStyle="#193b46",v.beginPath(),v.moveTo(-7,10),v.lineTo(-9,-1),v.quadraticCurveTo(-9,-5,-5,-5),v.lineTo(-3,-3),v.lineTo(-3,-17),v.quadraticCurveTo(-3,-22,1,-22),v.quadraticCurveTo(5,-22,5,-17),v.lineTo(5,-6),v.quadraticCurveTo(9,-9,11,-5),v.quadraticCurveTo(15,-7,16,-2),v.lineTo(14,9),v.quadraticCurveTo(12,18,3,18),v.lineTo(-1,18),v.quadraticCurveTo(-5,17,-7,10),v.closePath(),v.fill(),v.stroke(),v.restore()}function Gv(){var c,_,P,A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he;if(Ae=0,!h)try{for(var _e=Ne(n.gameplay.filter(function(Rn){return Rn.kind==="tutorial-hand"})),me=_e.next();!me.done;me=_e.next()){var we=me.value,Ie=y.get(we.componentId),Ce=nt(we.parameters.targetId);if(!(!Ie||Ie.sceneId!==W||!Ce||Ce.sceneId!==W||!ti(Ce))&&!(we.parameters.hideOnFirstInput&&$e)){var Ye=Te?ne:oe;if(!(Ye-He<we.parameters.idleDelaySeconds)){Ae++;var at=we.parameters.destinationId?nt(we.parameters.destinationId):void 0,Xe=Ft(Ce),pt=void 0;Ce.contract==="native.mesh3d.v1"&&(pt=Ud(Ce.id)),pt||(pt=Cn(Fn(Ce),Xe.width/2,Xe.height/2));var mt=Ye%1.2/1.2,Bt=E?.matches?0:mt*mt*(3-2*mt),kt=pt.x,it=pt.y;if(we.parameters.mode!=="tap"){var Yt=at?Cn(Fn(at),Ft(at).width/2,Ft(at).height/2):{x:pt.x-36,y:pt.y+48};kt=pt.x+(Yt.x-pt.x)*Bt,it=pt.y+(Yt.y-pt.y)*Bt}Vv(kt+8,it+22,we.parameters.mode,Bt)}}}}catch(Rn){c={error:Rn}}finally{try{me&&!me.done&&(_=_e.return)&&_.call(_e)}finally{if(c)throw c.error}}try{for(var It=Ne(qi),dt=It.next();!dt.done;dt=It.next()){var Qe=Le(dt.value,2),rt=Qe[0],Mt=Qe[1],bt=yn("draw-stroke",rt).parameters;try{for(var jt=(R=void 0,Ne(Mt.strokes)),zt=jt.next();!zt.done;zt=jt.next()){var nn=zt.value;if(!(nn.points.length<2)){v.save(),v.globalAlpha=bt.mode==="slice-blade"?Math.max(0,1-nn.age/.18):1,v.strokeStyle=bt.color,v.lineWidth=bt.strokeWidth,v.lineCap="round",v.lineJoin="round",v.beginPath(),v.moveTo(nn.points[0].x,nn.points[0].y);try{for(var Vt=(L=void 0,Ne(nn.points.slice(1))),rn=Vt.next();!rn.done;rn=Vt.next()){var Ot=rn.value;v.lineTo(Ot.x,Ot.y)}}catch(Rn){L={error:Rn}}finally{try{rn&&!rn.done&&(Y=Vt.return)&&Y.call(Vt)}finally{if(L)throw L.error}}v.stroke(),v.restore()}}}catch(Rn){R={error:Rn}}finally{try{zt&&!zt.done&&(U=jt.return)&&U.call(jt)}finally{if(R)throw R.error}}}}catch(Rn){P={error:Rn}}finally{try{dt&&!dt.done&&(A=It.return)&&A.call(It)}finally{if(P)throw P.error}}try{for(var st=Ne(Tt),Ut=st.next();!Ut.done;Ut=st.next()){var Gn=Ut.value;if(!(Gn.broken||!Gn.drawRope)){var Ln=vt.get(Gn.bodyId),Ri=nt(Gn.anchorId);if(!(!Ln||!Ri)){var li=oi(Ri);v.save(),v.strokeStyle=Gn.ropeColor,v.lineWidth=Gn.ropeWidth,v.beginPath(),v.moveTo(li.x,li.y),v.lineTo(Ln.x,Ln.y),v.stroke(),v.restore()}}}}catch(Rn){z={error:Rn}}finally{try{Ut&&!Ut.done&&(J=st.return)&&J.call(st)}finally{if(z)throw z.error}}try{for(var Dn=Ne(n.gameplay.filter(function(Rn){var ur;return Rn.kind==="virtual-joystick"&&((ur=y.get(Rn.componentId))===null||ur===void 0?void 0:ur.sceneId)===W})),Un=Dn.next();!Un.done;Un=Dn.next()){var we=Un.value,Qn=nt(we.componentId),Xe=we.parameters;if(!(!Qn||!ti(Qn)||Xe.drawControl===!1)){var yi=Zi.get(we.id),ci=yi&&yi.pointerId!==null?yi.origin:oi(Qn),Hn=yi&&yi.pointerId!==null?yi.knobX:ci.x,qr=yi&&yi.pointerId!==null?yi.knobY:ci.y,kr=(ce=Xe.radiusPx)!==null&&ce!==void 0?ce:56;v.save(),v.fillStyle=(de=Xe.baseColor)!==null&&de!==void 0?de:"#ffffff44",v.strokeStyle="#ffffffaa",v.lineWidth=2.5,v.beginPath(),v.arc(ci.x,ci.y,kr,0,Math.PI*2),v.fill(),v.stroke(),v.fillStyle=(he=Xe.knobColor)!==null&&he!==void 0?he:"#fff0bdee",v.strokeStyle="#193b46aa",v.lineWidth=2,v.beginPath(),v.arc(Hn,qr,kr*.42,0,Math.PI*2),v.fill(),v.stroke(),v.restore()}}}catch(Rn){G={error:Rn}}finally{try{Un&&!Un.done&&(K=Dn.return)&&K.call(Dn)}finally{if(G)throw G.error}}try{for(var Vi=Ne(le),En=Vi.next();!En.done;En=Vi.next()){var Nt=En.value,Ct=Math.min(1,Nt.elapsed/Nt.seconds);v.save(),v.globalAlpha=1-Ct,v.fillStyle=Nt.color,v.strokeStyle="#193b46",v.lineWidth=3,v.font="900 "+Nt.fontSize+"px sans-serif",v.textAlign="center",v.textBaseline="middle";var it=Nt.y-(E?.matches?0:Nt.risePx*Ct);v.strokeText(Nt.text,Nt.x,it),v.fillText(Nt.text,Nt.x,it),v.restore()}}catch(Rn){$={error:Rn}}finally{try{En&&!En.done&&(ee=Vi.return)&&ee.call(Vi)}finally{if($)throw $.error}}try{for(var ii=Ne(ve),Ki=ii.next();!Ki.done;Ki=ii.next()){var vr=Ki.value,Ct=Math.min(1,vr.elapsed/vr.seconds),zr=b();v.save(),v.globalAlpha=vr.opacity*(1-Ct),v.fillStyle=vr.color,v.fillRect(0,0,zr.width,zr.height),v.restore()}}catch(Rn){te={error:Rn}}finally{try{Ki&&!Ki.done&&(H=ii.return)&&H.call(ii)}finally{if(te)throw te.error}}}function Hv(){if(I){var c=vt.get(I.targetId),_=I.behavior.parameters;if(c){var P=I.current.x-I.start.x,A=I.current.y-I.start.y,R=Math.hypot(P,A),U=Math.min(_.maxPullPx,R),L=R>.001?U/R:0;v.save(),v.lineCap="round";var Y=Math.max(12,Math.min(c.width,c.height)*.62);if(v.strokeStyle="#173a2f66",v.lineWidth=3.5,v.beginPath(),v.arc(c.x,c.y,Y,0,Math.PI*2),v.stroke(),v.strokeStyle=_.trajectoryColor,v.lineWidth=2,v.beginPath(),v.arc(c.x,c.y,Y,0,Math.PI*2),v.stroke(),_.showTrajectory&&R>=_.minPullPx){var z=Xd(),J=jf(),G=J.bodies,K=J.zones,$=b(),ee=$p({body:St(St({},c),{vx:z.vx,vy:z.vy,atRest:!1}),bodies:G,zones:K,bounds:{left:0,top:0,right:$.width,bottom:$.height},dots:_.trajectoryDots,bounces:_.trajectoryBounces});ee.forEach(function(ce,de){var he=.96-.52*(de/Math.max(1,ee.length)),_e=Math.max(2.2,4.5-de*.22);v.globalAlpha=he,v.fillStyle="#173a2f88",v.beginPath(),v.arc(ce.x,ce.y,_e+1.3,0,Math.PI*2),v.fill(),v.fillStyle=_.trajectoryColor,v.beginPath(),v.arc(ce.x,ce.y,_e,0,Math.PI*2),v.fill()})}if(R>=4){var te=c.x+P*L,H=c.y+A*L;v.globalAlpha=.9,v.strokeStyle="#173a2f66",v.lineWidth=5,v.beginPath(),v.moveTo(c.x,c.y),v.lineTo(te,H),v.stroke(),v.strokeStyle=_.trajectoryColor,v.lineWidth=2.6,v.beginPath(),v.moveTo(c.x,c.y),v.lineTo(te,H),v.stroke(),v.fillStyle="#173a2f88",v.beginPath(),v.arc(te,H,5.2,0,Math.PI*2),v.fill(),v.fillStyle=_.trajectoryColor,v.beginPath(),v.arc(te,H,3.6,0,Math.PI*2),v.fill()}v.restore()}}}function Wv(c){var _,P,A,R;try{for(var U=Ne(vs()),L=U.next();!L.done;L=U.next()){var Y=L.value,z=Y.contract==="native.group.v1"?_n(Y.id):[Y];try{for(var J=(A=void 0,Ne(z)),G=J.next();!G.done;G=J.next()){var K=G.value;if(K.contract==="native.stage3d.v1"&&ti(K)&&Ft(K).skyColor)return Ft(K).skyColor;if(!(K.contract!=="native.rectangle.v1"||!ti(K))){var $=Ft(K);if(!($.opacity<.95||!$.fill||$.fill==="transparent")&&(/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test(K.id)||$.width>=c.width*.9&&$.height>=c.height*.9))return $.fill}}}catch(ee){A={error:ee}}finally{try{G&&!G.done&&(R=J.return)&&R.call(J)}finally{if(A)throw A.error}}}}catch(ee){_={error:ee}}finally{try{L&&!L.done&&(P=U.return)&&P.call(U)}finally{if(_)throw _.error}}return"#102a34"}function Xv(){var c;if(xe&&ti(xe.c)){var _=xe.c,P=Ft(_);v.save(),v.transform.apply(v,qe([],Le(Fn(_)),!1)),v.strokeStyle=(c=xe.highlightColor)!==null&&c!==void 0?c:"#ffffff",v.lineWidth=4,v.globalAlpha=.85,v.strokeRect(-4,-4,P.width+8,P.height+8),v.restore()}if(_t?.b.parameters.bringToFront){var _=nt(_t.targetId);_&&ko(_,_.parentId?Fn(nt(_.parentId)):pa(),[],_.prototypeId)}}function Ci(){var c,_,P,A,R,U;q=F,F=new Map;var L=b();B!==void 0&&B!==L.landscape&&Ii(),B=L.landscape;var Y=Math.min(devicePixelRatio||1,2),z=e.clientWidth,J=e.clientHeight;(e.width!==Math.round(z*Y)||e.height!==Math.round(J*Y))&&(e.width=Math.round(z*Y),e.height=Math.round(J*Y)),v.setTransform(Y,0,0,Y,0,0),v.fillStyle=Wv(L),v.fillRect(0,0,z,J);var G=Math.min(z/L.width,J/L.height),K=(z-L.width*G)/2,$=(J-L.height*G)/2;if(se=G||1,be=Y,v.translate(K,$),v.scale(G,G),Me){var ee=Math.min(1,Me.elapsed/Me.seconds),te=Me.intensity*(1-ee);v.translate(Math.sin(Me.elapsed*95)*te,Math.cos(Me.elapsed*113)*te)}v.save(),v.beginPath(),v.rect(0,0,L.width,L.height),v.clip(),X=[];try{for(var H=Ne(vs()),ce=H.next();!ce.done;ce=H.next()){var de=ce.value;ko(de)}}catch(it){c={error:it}}finally{try{ce&&!ce.done&&(_=H.return)&&_.call(H)}finally{if(c)throw c.error}}try{for(var he=Ne(re),_e=he.next();!_e.done;_e=he.next()){var de=_e.value;de.parentId||ko(de,pa(),[],de.prototypeId)}}catch(it){P={error:it}}finally{try{_e&&!_e.done&&(A=he.return)&&A.call(he)}finally{if(P)throw P.error}}if(Xv(),Hv(),h&&qt){for(var me=y.get(qt);me?.parentId;)me=y.get(me.parentId);me?.prototype&&ko(me)}Hd(),v.save();try{for(var we=Ne(ye),Ie=we.next();!Ie.done;Ie=we.next()){var Ce=Ie.value;if(!(Ce.shape==="pixel-confetti"||Ce.shape==="confetti")){var Ye=Math.min(1,Ce.life*2),at=1.5+2.5*Ye;if(v.globalAlpha=Ye,v.globalCompositeOperation=Ce.shape==="square"?"source-over":"lighter",v.fillStyle=Ce.color,Ce.shape==="square"){var Xe=Math.max(2,Math.round(at*1.6));v.fillRect(Math.round(Ce.x-Xe/2),Math.round(Ce.y-Xe/2),Xe,Xe);continue}v.globalCompositeOperation="lighter",v.shadowColor=Ce.color,v.shadowBlur=ye.length<=16?6:0,v.strokeStyle=Ce.color,v.lineWidth=1.5+Ye,v.beginPath(),v.moveTo(Ce.x-Ce.vx*.025,Ce.y-Ce.vy*.025),v.lineTo(Ce.x,Ce.y),v.stroke(),v.beginPath(),v.arc(Ce.x,Ce.y,at,0,Math.PI*2),v.fill()}}}catch(it){R={error:it}}finally{try{Ie&&!Ie.done&&(U=we.return)&&U.call(we)}finally{if(R)throw R.error}}if(v.restore(),Gv(),h&&qt){var pt=X.filter(function(it){return it.c.contract!=="native.group.v1"&&(it.c.id===qt||Ir(it.c,qt))});if(pt.length){var mt=pt.map(function(it){return $i(it.c,it.m)}),Bt=Math.min.apply(Math,qe([],Le(mt.map(function(it){return it.left})),!1)),kt=Math.min.apply(Math,qe([],Le(mt.map(function(it){return it.top})),!1));v.strokeStyle="#55e6ef",v.lineWidth=2/G,v.strokeRect(Bt,kt,Math.max.apply(Math,qe([],Le(mt.map(function(it){return it.right})),!1))-Bt,Math.max.apply(Math,qe([],Le(mt.map(function(it){return it.bottom})),!1))-kt)}}v.restore(),G>0&&Hd(void 0,{x:-K/G,y:-$/G,width:z/G,height:J/G})}function Yv(c){var _,P,A,R,U=Array.isArray(c)?qe([],Le(new Set(c)),!1):void 0;Ci();var L=b(),Y=new Set,z=[];try{for(var J=Ne(X),G=J.next();!G.done;G=J.next()){var K=G.value,$=(A=K.c.prototypeId)!==null&&A!==void 0?A:K.c.id;if(!(K.c.contract==="native.group.v1"||U&&!U.includes($))){Y.add($);var ee=$i(K.c,K.m),te=((R=Ft(K.c).strokeWidth)!==null&&R!==void 0?R:0)/2;ee.left-=te,ee.right+=te,ee.top-=te,ee.bottom+=te;var H={left:Math.max(0,-ee.left),right:Math.max(0,ee.right-L.width),top:Math.max(0,-ee.top),bottom:Math.max(0,ee.bottom-L.height)};Object.values(H).some(function(de){return de>.01})&&z.push({id:$,contract:K.c.contract,bounds:ee,overflow:H})}}}catch(de){_={error:de}}finally{try{G&&!G.done&&(P=J.return)&&P.call(J)}finally{if(_)throw _.error}}var ce=U?U.filter(function(de){return!Y.has(de)}):[];return{ok:z.length===0&&ce.length===0,viewport:St(St({},L),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight}),issues:z,missing:ce}}function qv(c){var _,P,A,R,U,L,Y,z,J,G,K,$,ee,te,H,ce,de,he,_e,me,we,Ie,Ce,Ye,at,Xe,pt,mt,Bt,kt,it,Yt,It,dt=c===void 0?{}:c,Qe=dt.ids,rt=dt.interactiveIds,Mt=dt.network,bt=Mt===void 0?"standalone":Mt,jt=dt.minTouchPx,zt=jt===void 0?44:jt,nn=Array.isArray(Qe)?qe([],Le(new Set(Qe)),!1):void 0;Ci();var Vt=b(),rn=Math.min(e.clientWidth/Vt.width,e.clientHeight/Vt.height),Ot=Qf(Vt,bt),st=[],Ut=new Set,Gn=function(Ee){var Lt;return!nn||nn.includes((Lt=Ee.c.prototypeId)!==null&&Lt!==void 0?Lt:Ee.c.id)},Ln=X.filter(Gn),Ri=new Set(n.events.filter(function(Ee){return Ee.kind==="click"}).map(function(Ee){return Ee.componentId}));try{for(var li=Ne(n.gameplay),Dn=li.next();!Dn.done;Dn=li.next()){var Un=Dn.value;["drag","match-tile","aim-launch","aim-launch-3d","swipe-input","hold-charge","virtual-joystick","draw-stroke","erase-mask"].includes(Un.kind)&&Ri.add(Un.componentId)}}catch(Ee){_={error:Ee}}finally{try{Dn&&!Dn.done&&(P=li.return)&&P.call(li)}finally{if(_)throw _.error}}var Qn=new Set(rt??Ri),yi=new Set(n.gameplay.filter(function(Ee){return["aim-launch","aim-launch-3d","swipe-input","hold-charge","draw-stroke","virtual-joystick"].includes(Ee.kind)&&(Ee.parameters.dragMode==="anywhere"||Ee.kind==="draw-stroke"||Ee.kind==="virtual-joystick"&&Ee.parameters.mode==="floating")}).map(function(Ee){return Ee.componentId})),ci=function(Ee){var Lt;return Qn.has((Lt=Ee.c.prototypeId)!==null&&Lt!==void 0?Lt:Ee.c.id)},Hn=function(Ee,Lt,Xt,Sn,wi,di){return st.push(St(St({kind:Ee,severity:Lt,id:Xt},di?{otherId:di}:{}),{detail:Sn,metrics:wi}))},qr=function(Ee){var Lt=[[0,0],[Ee.width,0],[Ee.width,Ee.height],[0,Ee.height]].map(function(Xt){var Sn=Le(Xt,2),wi=Sn[0],di=Sn[1];return Cn(Ee.matrix,wi,di)});return{left:Math.min.apply(Math,qe([],Le(Lt.map(function(Xt){return Xt.x})),!1)),right:Math.max.apply(Math,qe([],Le(Lt.map(function(Xt){return Xt.x})),!1)),top:Math.min.apply(Math,qe([],Le(Lt.map(function(Xt){return Xt.y})),!1)),bottom:Math.max.apply(Math,qe([],Le(Lt.map(function(Xt){return Xt.y})),!1))}};try{for(var kr=Ne(Ln),Vi=kr.next();!Vi.done;Vi=kr.next()){var En=Vi.value,Nt=(Ce=En.c.prototypeId)!==null&&Ce!==void 0?Ce:En.c.id;Ut.add(Nt);var Ct=$i(En.c,En.m),ii=((Ye=Ft(En.c).strokeWidth)!==null&&Ye!==void 0?Ye:0)/2;Ct.left-=ii,Ct.right+=ii,Ct.top-=ii,Ct.bottom+=ii;var Ki=En.c.contract==="native.group.v1"&&!Ft(En.c).clip,vr=En.c.contract==="native.image.v1"&&En.clips.length===0&&Ft(En.c).fit==="cover"&&Ct.left<=0&&Ct.top<=0&&Ct.right>=Vt.width&&Ct.bottom>=Vt.height||En.c.contract==="native.stage3d.v1"&&Ct.left<=0&&Ct.top<=0&&Ct.right>=Vt.width&&Ct.bottom>=Vt.height,zr=En.c.contract==="native.rectangle.v1"&&ii===0&&Ct.left<=0&&Ct.top<=0&&Ct.right>=Vt.width&&Ct.bottom>=Vt.height||vr;if(!Ki){var Rn={left:Math.max(0,-Ct.left),right:Math.max(0,Ct.right-Vt.width),top:Math.max(0,-Ct.top),bottom:Math.max(0,Ct.bottom-Vt.height)};if(!zr&&!up(En.c)&&Object.values(Rn).some(function(Ee){return Ee>.01})&&Hn("stage-overflow","blocker",Nt,"Component extends beyond the active stage.",{bounds:Ct,overflow:Rn}),En.c.contract==="native.image.v1"&&En.clips.length===0){var ur=Ct.right-Ct.left,Cr=Ct.bottom-Ct.top,qa=/(?:^|\.)(backdrop|background|bg)$/.test(Nt)||Ft(En.c).fit==="cover"&&!En.c.parentId&&Ct.left<=1&&Ct.top<=1&&(ur>=Vt.width*.4||Cr>=Vt.height*.4);qa&&(Ct.left>.5||Ct.top>.5||Ct.right<Vt.width-.5||Ct.bottom<Vt.height-.5)&&Hn("backdrop-incomplete","blocker",Nt,"Backdrop image does not cover the full active stage, leaving a visible seam.",{bounds:Ct,stage:{width:Vt.width,height:Vt.height}})}try{for(var Rr=(U=void 0,Ne(En.clips)),dr=Rr.next();!dr.done;dr=Rr.next()){var la=dr.value,hr=qr(la),ca={left:Math.max(0,hr.left-Ct.left),right:Math.max(0,Ct.right-hr.right),top:Math.max(0,hr.top-Ct.top),bottom:Math.max(0,Ct.bottom-hr.bottom)};Object.values(ca).some(function(Ee){return Ee>.01})&&Hn("parent-clip-crop","blocker",Nt,"Component is cropped by an ancestor clipping group.",{bounds:Ct,clip:hr,crop:ca})}}catch(Ee){U={error:Ee}}finally{try{dr&&!dr.done&&(L=Rr.return)&&L.call(Rr)}finally{if(U)throw U.error}}}if(En.textMetrics){var Gi=En.textMetrics;(Gi.overflowsWidth||Gi.overflowsHeight)&&Hn("text-overflow","blocker",Nt,"Text does not fit its component after wrapping and auto-fit.",Gi);var xi=(at=Gi.fontSize)!==null&&at!==void 0?at:Gi.scale*8;xi<12&&Hn("text-illegible",xi<8?"blocker":"warning",Nt,"Rendered text is below the recommended legible size.",St({renderedFontSize:xi},Gi));var ui=Ft(En.c);if(ui.pixelPanel&&ui.align!=="center"){var Ra=Math.max(0,ui.width-2*(ui.padding===void 0?8:ui.padding));Ra-((Xe=Gi.renderedWidth)!==null&&Xe!==void 0?Xe:0)>12&&Hn("panel-off-center","blocker",Nt,"Text inside a framed pixel panel is not horizontally centered.",{align:ui.align,innerWidth:Ra,renderedWidth:(pt=Gi.renderedWidth)!==null&&pt!==void 0?pt:0})}}if(ci(En)&&!yi.has(Nt)&&(En.c.contract!=="native.group.v1"||Ct.right>Ct.left&&Ct.bottom>Ct.top)){var _i=(Ct.right-Ct.left)*rn,Jn=(Ct.bottom-Ct.top)*rn;(_i<zt-.01||Jn<zt-.01)&&Hn("touch-target-small","blocker",Nt,"Interactive target is smaller than the required physical touch size.",{width:_i,height:Jn,minTouchPx:zt,scale:rn})}if(ci(En)&&!yi.has(Nt)||En.c.contract==="native.text.v1")try{for(var Pn=(Y=void 0,Ne(Ot.zones)),ua=Pn.next();!ua.done;ua=Pn.next()){var fr=ua.value,_i=Math.min(Ct.right,fr.right)-Math.max(Ct.left,fr.left),Jn=Math.min(Ct.bottom,fr.bottom)-Math.max(Ct.top,fr.top);_i>.01&&Jn>.01&&Hn("sdk-safe-area-collision","blocker",Nt,"Component intersects a reserved ad-SDK overlay zone.",{bounds:Ct,zone:fr,intersection:{width:_i,height:Jn},network:bt})}}catch(Ee){Y={error:Ee}}finally{try{ua&&!ua.done&&(z=Pn.return)&&z.call(Pn)}finally{if(Y)throw Y.error}}}}catch(Ee){A={error:Ee}}finally{try{Vi&&!Vi.done&&(R=kr.return)&&R.call(kr)}finally{if(A)throw A.error}}for(var gr=Ln.filter(function(Ee){return ci(Ee)&&Ee.c.contract!=="native.group.v1"}),Nn=0;Nn<gr.length;Nn++)for(var Mn=Nn+1;Mn<gr.length;Mn++){var Jt=gr[Nn],on=gr[Mn],Vr=(mt=Jt.c.prototypeId)!==null&&mt!==void 0?mt:Jt.c.id,Fi=(Bt=on.c.prototypeId)!==null&&Bt!==void 0?Bt:on.c.id;if(!(Vr===Fi||Ir(Jt.c,on.c.id)||Ir(on.c,Jt.c.id))){var yr=$i(Jt.c,Jt.m),Zr=$i(on.c,on.m),_i=Math.min(yr.right,Zr.right)-Math.max(yr.left,Zr.left),Jn=Math.min(yr.bottom,Zr.bottom)-Math.max(yr.top,Zr.top);_i>1&&Jn>1&&Hn("interactive-overlap","blocker",Vr,"Interactive targets overlap.",{intersection:{width:_i,height:Jn},first:yr,second:Zr},Fi)}}var lc=function(Ee){if(!Ee||Ee==="transparent")return!1;var Lt=/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.exec(Ee);if(Lt)return Lt[1].length===4?Lt[1][3].toLowerCase()==="f":Lt[1].slice(6).toLowerCase()==="ff";var Xt=/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\s*\)$/i.exec(Ee);return Xt?Number(Xt[1])>=.95:!0},_s=[];Ln.forEach(function(Ee,Lt){var Xt,Sn;Ee.c.contract==="native.rectangle.v1"&&!ci(Ee)&&((Xt=Ft(Ee.c).opacity)!==null&&Xt!==void 0?Xt:1)>=.95&&lc(Ft(Ee.c).fill)&&_s.push({rowIndex:Lt,row:Ee,order:(Sn=Ee.c.order)!==null&&Sn!==void 0?Sn:0,bounds:$i(Ee.c,Ee.m)})});var Za=Ln.filter(function(Ee,Lt){var Xt,Sn=$i(Ee.c,Ee.m),wi=(Xt=Ee.c.order)!==null&&Xt!==void 0?Xt:0;return!_s.some(function(di){return di.rowIndex>Lt&&di.order>wi&&di.row.c.id!==Ee.c.id&&!Ir(di.row.c,Ee.c.id)&&!Ir(Ee.c,di.row.c.id)&&di.bounds.left<=Sn.left+1&&di.bounds.right>=Sn.right-1&&di.bounds.top<=Sn.top+1&&di.bounds.bottom>=Sn.bottom-1})}),zs=Za.map(function(Ee,Lt){return{row:Ee,rowIndex:Lt}}).filter(function(Ee){var Lt,Xt=Ee.row;if(Xt.c.contract!=="native.rectangle.v1")return!1;var Sn=$i(Xt.c,Xt.m),wi=Sn.right-Sn.left,di=Sn.bottom-Sn.top,La=((Lt=Ft(Xt.c).strokeWidth)!==null&&Lt!==void 0?Lt:0)===0&&Sn.left<=0&&Sn.right>=Vt.width;return!La&&wi>=180&&di>=140&&!ci(Xt)}).map(function(Ee){var Lt,Xt=Ee.row,Sn=Ee.rowIndex;return{id:(Lt=Xt.c.prototypeId)!==null&&Lt!==void 0?Lt:Xt.c.id,row:Xt,rowIndex:Sn,bounds:$i(Xt.c,Xt.m)}}),zo=function(Ee,Lt,Xt,Sn){var wi,di;Sn===void 0&&(Sn=!1);var La=(wi=Ee.c.prototypeId)!==null&&wi!==void 0?wi:Ee.c.id,Zo=(Xt.left+Xt.right)/2,Da=(Xt.top+Xt.bottom)/2,jd=(di=Ee.c.order)!==null&&di!==void 0?di:0;return zs.filter(function($n){var Na;return $n.id!==La&&(!Sn||$n.rowIndex<Lt||((Na=$n.row.c.order)!==null&&Na!==void 0?Na:0)===jd)&&Xt.right-Xt.left<=$n.bounds.right-$n.bounds.left+4&&Xt.bottom-Xt.top<=$n.bounds.bottom-$n.bounds.top+4&&Zo>=$n.bounds.left&&Zo<=$n.bounds.right&&Da>=$n.bounds.top&&Da<=$n.bounds.bottom}).sort(function($n,Na){return($n.bounds.right-$n.bounds.left)*($n.bounds.bottom-$n.bounds.top)-(Na.bounds.right-Na.bounds.left)*(Na.bounds.bottom-Na.bounds.top)||Na.rowIndex-$n.rowIndex})[0]},Jr=new Map,$r=new Map;if(zs.length){Za.forEach(function(Ee,Lt){var Xt,Sn=(Xt=Ee.c.prototypeId)!==null&&Xt!==void 0?Xt:Ee.c.id,wi=$i(Ee.c,Ee.m),di=(wi.left+wi.right)/2,La=(wi.top+wi.bottom)/2,Zo=Ee.c.contract==="native.button.v1"&&!Qt.has(Ee.c.id),Da=Ee.c.parentId?nt(Ee.c.parentId):void 0,jd=Ee.c.contract==="native.text.v1"&&Ft(Ee.c).align==="center"&&Da?.contract!=="native.button.v1";if(Zo||jd){var $n=zo(Ee,Lt,wi,!1);$n&&(Jr.has($n.id)||Jr.set($n.id,{panel:$n,items:[]}),Jr.get($n.id).items.push({id:Sn,bounds:wi,cx:di,cy:La,isBtn:Zo}))}if(["native.text.v1","native.image.v1","native.button.v1"].includes(Ee.c.contract)&&Da?.contract!=="native.button.v1"){var $n=zo(Ee,Lt,wi,!0);$n&&($r.has($n.id)||$r.set($n.id,{panel:$n,content:[]}),$r.get($n.id).content.push({row:Ee,id:Sn,bounds:wi}))}});try{for(var Wt=Ne(Jr.values()),kn=Wt.next();!kn.done;kn=Wt.next()){var Oi=kn.value,Wn=Oi.panel,xr=Oi.items;if(xr.some(function(Ee){return Ee.isBtn})){var On=Wn.bounds,Bi=(On.left+On.right)/2;try{for(var Hi=(K=void 0,Ne(xr)),Pa=Hi.next();!Pa.done;Pa=Hi.next()){var Qi=Pa.value,da={left:Qi.bounds.left-On.left,right:On.right-Qi.bounds.right,top:Qi.bounds.top-On.top,bottom:On.bottom-Qi.bounds.bottom},Vs=Math.min(da.left,da.right,da.top,da.bottom);(Vs<10||Vs*rn<8)&&Hn("panel-edge-cramped","blocker",Qi.id,"Element sits too close to its enclosing panel edge.",{panelId:Wn.id,margins:da,scale:rn,minStagePx:10,minCssPx:8},Wn.id)}}catch(Ee){K={error:Ee}}finally{try{Pa&&!Pa.done&&($=Hi.return)&&$.call(Hi)}finally{if(K)throw K.error}}var Ja=[],Vo=function(Ee){var Lt=Ja.find(function(Xt){return Math.abs(Xt.cy-Ee.cy)<=16&&Xt.isBtn===Ee.isBtn});Lt?Lt.items.push(Ee):Ja.push({cy:Ee.cy,isBtn:Ee.isBtn,items:[Ee]})};try{for(var cc=(ee=void 0,Ne(xr)),Go=cc.next();!Go.done;Go=cc.next()){var Qi=Go.value;Vo(Qi)}}catch(Ee){ee={error:Ee}}finally{try{Go&&!Go.done&&(te=cc.return)&&te.call(cc)}finally{if(ee)throw ee.error}}try{for(var uc=(H=void 0,Ne(Ja)),Ho=uc.next();!Ho.done;Ho=uc.next()){var Kd=Ho.value,ig=Math.min.apply(Math,qe([],Le(Kd.items.map(function(Ee){return Ee.bounds.left})),!1)),rg=Math.max.apply(Math,qe([],Le(Kd.items.map(function(Ee){return Ee.bounds.right})),!1)),xp=(ig+rg)/2,_p=xp-Bi;Math.abs(_p)>3&&Hn("panel-off-center","blocker",Kd.items[0].id,"Element is not horizontally centered inside its enclosing panel.",{panelId:Wn.id,offsetX:_p,groupCenterX:xp,panelCenterX:Bi,scale:rn},Wn.id)}}catch(Ee){H={error:Ee}}finally{try{Ho&&!Ho.done&&(ce=uc.return)&&ce.call(uc)}finally{if(H)throw H.error}}}}}catch(Ee){J={error:Ee}}finally{try{kn&&!kn.done&&(G=Wt.return)&&G.call(Wt)}finally{if(J)throw J.error}}try{for(var dc=Ne($r.values()),Wo=dc.next();!Wo.done;Wo=dc.next())for(var Mp=Wo.value,Wn=Mp.panel,hc=Mp.content,ag=Jr.has(Wn.id),Nn=0;Nn<hc.length;Nn++)for(var Mn=Nn+1;Mn<hc.length;Mn++){var Jt=hc[Nn],on=hc[Mn];if(!(Jt.id===on.id||Ir(Jt.row.c,on.row.c.id)||Ir(on.row.c,Jt.row.c.id))){var sg=Jt.row.c.contract==="native.image.v1"&&on.row.c.contract==="native.image.v1";if(!(sg&&(!ag||Jt.row.c.parentId&&Jt.row.c.parentId===on.row.c.parentId))){var _i=Math.min(Jt.bounds.right,on.bounds.right)-Math.max(Jt.bounds.left,on.bounds.left),Jn=Math.min(Jt.bounds.bottom,on.bounds.bottom)-Math.max(Jt.bounds.top,on.bounds.top);_i>2&&Jn>2&&Hn("panel-content-overlap","blocker",Jt.id,"Panel elements overlap each other.",{panelId:Wn.id,intersection:{width:_i,height:Jn},first:Jt.bounds,second:on.bounds},on.id)}}}}catch(Ee){de={error:Ee}}finally{try{Wo&&!Wo.done&&(he=dc.return)&&he.call(dc)}finally{if(de)throw de.error}}}var Gs=Za.filter(function(Ee){if(Ee.c.contract!=="native.text.v1")return!1;var Lt=Ee.c.parentId?nt(Ee.c.parentId):void 0;return Lt?.contract!=="native.button.v1"}).map(function(Ee){var Lt,Xt,Sn=String((Lt=Ft(Ee.c).text)!==null&&Lt!==void 0?Lt:"").replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(wi,di){var La;return String((La=Z[di])!==null&&La!==void 0?La:"")}).trim();return{row:Ee,id:(Xt=Ee.c.prototypeId)!==null&&Xt!==void 0?Xt:Ee.c.id,bounds:$i(Ee.c,Ee.m),raw:Sn,norm:Sn.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}}).filter(function(Ee){return Ee.raw.length>0}),og=zs.filter(function(Ee){var Lt,Xt;return((Lt=Jr.get(Ee.id))===null||Lt===void 0?void 0:Lt.items.some(function(Sn){return Sn.isBtn}))||((Xt=$r.get(Ee.id))===null||Xt===void 0?void 0:Xt.content.some(function(Sn){return Sn.row.c.contract==="native.button.v1"}))});try{for(var fc=Ne(og),Xo=fc.next();!Xo.done;Xo=fc.next()){var Wn=Xo.value,On=Wn.bounds,Bi=(On.left+On.right)/2,lg=On.right-On.left;try{for(var pc=(we=void 0,Ne(Gs)),Yo=pc.next();!Yo.done;Yo=pc.next()){var ha=Yo.value;if(Ft(ha.row.c).align==="center"&&!(ha.bounds.bottom>On.top+6||On.top-ha.bounds.bottom>48)){var Sp=ha.bounds.right-ha.bounds.left,qo=(ha.bounds.left+ha.bounds.right)/2,cg=Math.min(ha.bounds.right,On.right)-Math.max(ha.bounds.left,On.left);(qo>=On.left&&qo<=On.right||cg>=Sp*.6)&&Sp<=lg+60&&Math.abs(qo-Bi)>4&&Hn("header-off-center","blocker",ha.id,"Centered text above a panel is not horizontally aligned with the panel below it.",{panelId:Wn.id,offsetX:qo-Bi,textCenterX:qo,panelCenterX:Bi,scale:rn},Wn.id)}}}catch(Sn){we={error:Sn}}finally{try{Yo&&!Yo.done&&(Ie=pc.return)&&Ie.call(pc)}finally{if(we)throw we.error}}}}catch(Ee){_e={error:Ee}}finally{try{Xo&&!Xo.done&&(me=fc.return)&&me.call(fc)}finally{if(_e)throw _e.error}}for(var Nn=0;Nn<Gs.length;Nn++)for(var Mn=Nn+1;Mn<Gs.length;Mn++){var Jt=Gs[Nn],on=Gs[Mn];if(!(Jt.id===on.id||Ir(Jt.row.c,on.row.c.id)||Ir(on.row.c,Jt.row.c.id))){var _i=Math.min(Jt.bounds.right,on.bounds.right)-Math.max(Jt.bounds.left,on.bounds.left),Jn=Math.min(Jt.bounds.bottom,on.bounds.bottom)-Math.max(Jt.bounds.top,on.bounds.top);if(_i>2&&Jn>2&&Hn("panel-content-overlap","blocker",Jt.id,"Visible text elements overlap.",{intersection:{width:_i,height:Jn},first:Jt.bounds,second:on.bounds},on.id),Jt.norm&&on.norm){var bp=Le(Jt.norm.length<=on.norm.length?[Jt.norm,on.norm]:[on.norm,Jt.norm],2),mc=bp[0],wp=bp[1];(mc===wp&&mc.length>=6||mc.length>=12&&wp.includes(mc))&&Hn("duplicate-visible-copy","blocker",Jt.id,"Duplicate visible copy appears in multiple text elements simultaneously.",{first:Jt.raw,second:on.raw},on.id)}}}var fa=Gs.filter(function(Ee){return!/^[\d\s/.,:%+\-x]+$/i.test(Ee.raw)}),vc=fa.reduce(function(Ee,Lt){return Ee+(Lt.norm?Lt.norm.split(" ").filter(Boolean).length:0)},0),Qd=fa.reduce(function(Ee,Lt){return Ee+Lt.raw.replace(/\s+/g," ").length},0);vc>20||Qd>130||fa.length>5?Hn("text-clutter-heavy","blocker",(it=(kt=fa[0])===null||kt===void 0?void 0:kt.id)!==null&&it!==void 0?it:null,"Too much visible copy on one screen; keep playable ads visual and concise.",{blocks:fa.length,wordCount:vc,charCount:Qd,texts:fa.map(function(Ee){return Ee.raw})}):(vc>12||fa.length>4)&&Hn("text-clutter-heavy","warning",(It=(Yt=fa[0])===null||Yt===void 0?void 0:Yt.id)!==null&&It!==void 0?It:null,"Screen copy is getting dense; consider trimming narration so gameplay carries the experience.",{blocks:fa.length,wordCount:vc,charCount:Qd,texts:fa.map(function(Ee){return Ee.raw})});var Tp=nn?nn.filter(function(Ee){if(Ut.has(Ee))return!1;var Lt=nt(Ee);return Lt?.contract==="native.mesh3d.v1"?!1:!Lt||ti(Lt)}):[];return{ok:!st.some(function(Ee){return Ee.severity==="blocker"})&&Tp.length===0,viewport:St(St({},Vt),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight,scale:rn}),defects:st,missing:Tp,interactive:gr.map(function(Ee){var Lt;return{id:(Lt=Ee.c.prototypeId)!==null&&Lt!==void 0?Lt:Ee.c.id,bounds:$i(Ee.c,Ee.m)}}),safeArea:Ot}}function Ir(c,_){for(;c.parentId;){if(c.parentId===_)return!0;c=nt(c.parentId)}return!1}function up(c){for(var _=function(R){if(n.gameplay.some(function(U){var L;return U.kind==="camera-follow"&&U.componentId===((L=R.prototypeId)!==null&&L!==void 0?L:R.id)}))return{value:!0}},P=c;P;P=P.parentId?nt(P.parentId):void 0){var A=_(P);if(typeof A=="object")return A.value}return!1}function Wd(c){var _=b(),P=e.getBoundingClientRect(),A=Math.min(P.width/_.width,P.height/_.height);return{x:(c.clientX-P.left-(P.width-_.width*A)/2)/A,y:(c.clientY-P.top-(P.height-_.height*A)/2)/A}}function Zv(c,_){var P,A,R,U;try{try{for(var L=Ne(c.clips),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=Cn(_r(z.matrix),_.x,_.y);if(J.x<0||J.y<0||J.x>z.width||J.y>z.height)return!1}}catch(me){P={error:me}}finally{try{Y&&!Y.done&&(A=L.return)&&A.call(L)}finally{if(P)throw P.error}}var G=Cn(_r(c.m),_.x,_.y),K=Ft(c.c);if(c.c.contract==="native.path.v1"){var $=new Path2D,ee=function(me,we){({M:function(){return $.moveTo.apply($,qe([],Le(we),!1))},L:function(){return $.lineTo.apply($,qe([],Le(we),!1))},C:function(){return $.bezierCurveTo.apply($,qe([],Le(we),!1))},Q:function(){return $.quadraticCurveTo.apply($,qe([],Le(we),!1))},Z:function(){return $.closePath()}})[me]()};try{for(var te=Ne(K.commands),H=te.next();!H.done;H=te.next()){var ce=Le(H.value),de=ce[0],he=ce.slice(1);ee(de,he)}}catch(me){R={error:me}}finally{try{H&&!H.done&&(U=te.return)&&U.call(te)}finally{if(R)throw R.error}}v.save(),v.setTransform(1,0,0,1,0,0),v.lineWidth=K.strokeWidth;var _e=v.isPointInPath($,G.x,G.y)||K.strokeWidth>0&&v.isPointInStroke($,G.x,G.y);return v.restore(),_e}return c.c.contract==="native.ellipse.v1"?Math.pow((G.x-K.width/2)/(K.width/2),2)+Math.pow((G.y-K.height/2)/(K.height/2),2)<=1:G.x>=0&&G.y>=0&&G.x<=K.width&&G.y<=K.height}catch{return!1}}function ac(c){return qe([],Le(X),!1).reverse().find(function(_){return _.c.contract!=="native.group.v1"&&_.c.sceneId===W&&nt(_.c.id)&&ti(_.c)&&Zv(_,c)})}function sc(c){for(var _=[];c;)_.push(c),c=nt(c.parentId);return _}function Xd(){if(!I)return{vx:0,vy:0,power:0,pull:0};var c=I.behavior.parameters,_=I.current.x-I.start.x,P=I.current.y-I.start.y,A=Math.hypot(_,P),R=Math.max(0,Math.min(1,(A-c.minPullPx)/Math.max(1,c.maxPullPx-c.minPullPx))),U=c.minSpeed+(c.maxSpeed-c.minSpeed)*R,L=c.invert?-1:1;return{vx:A?_/A*U*L:0,vy:A?P/A*U*L:0,power:R,pull:A}}function dp(c){if(I){I.current=c;var _=Xd();I.power=_.power,I.behavior.parameters.powerVariableId&&(Z[I.behavior.parameters.powerVariableId]=_.power)}}function Yd(c){var _,P;c===void 0&&(c=!1);try{var A=(_=globalThis.AudioContext)!==null&&_!==void 0?_:globalThis.webkitAudioContext;A&&!je&&(je=new A,(P=je.addEventListener)===null||P===void 0||P.call(je,"statechange",function(){je?.state==="running"&&Od()})),Bo(c)}catch{}}function Jv(c,_,P){var A,R,U,L,Y,z,J=function(we){var Ie=P.find(function(at){var Xe;return((Xe=at.prototypeId)!==null&&Xe!==void 0?Xe:at.id)===we.componentId});if(!Ie)return"continue";var Ce=Cn(_r(Fn(Ie)),_.x,_.y),Ye=Oo(Ie,we);return Ye.stampSegment(Ce,Ce),We={kind:"mask",pointerId:c.pointerId,c:Ie,behavior:we,last:Ce},(Y=e.setPointerCapture)===null||Y===void 0||Y.call(e,c.pointerId),{value:!0}};try{for(var G=Ne(n.gameplay.filter(function(we){var Ie;return we.kind==="erase-mask"&&((Ie=y.get(we.componentId))===null||Ie===void 0?void 0:Ie.sceneId)===W})),K=G.next();!K.done;K=G.next()){var $=K.value,ee=J($);if(typeof ee=="object")return ee.value}}catch(we){A={error:we}}finally{try{K&&!K.done&&(R=G.return)&&R.call(G)}finally{if(A)throw A.error}}if(P.some(function(we){return we.contract==="native.button.v1"||n.events.some(function(Ie){var Ce;return Ie.kind==="click"&&Ie.componentId===((Ce=we.prototypeId)!==null&&Ce!==void 0?Ce:we.id)})}))return!1;try{for(var te=Ne(n.gameplay.filter(function(we){var Ie;return we.kind==="draw-stroke"&&((Ie=y.get(we.componentId))===null||Ie===void 0?void 0:Ie.sceneId)===W})),H=te.next();!H.done;H=te.next()){var $=H.value,ce=y.get($.componentId),de=_r(Fn(ce)),he=Cn(de,_.x,_.y),_e=Ft(ce);if(!(he.x<0||he.y<0||he.x>_e.width||he.y>_e.height)){var me=Mv($);return me.begin(_),We={kind:"stroke",pointerId:c.pointerId,c:ce,behavior:$,store:me,last:_},en({kind:"strokeStart",componentId:ce.id}),(z=e.setPointerCapture)===null||z===void 0||z.call(e,c.pointerId),!0}}}catch(we){U={error:we}}finally{try{H&&!H.done&&(L=te.return)&&L.call(te)}finally{if(U)throw U.error}}return!1}function $v(c,_,P){var A,R,U,L,Y,z,J,G=P.store.active;if(G){try{for(var K=Ne(n.gameplay.filter(function(Ye){var at;return Ye.kind==="collider"&&((at=y.get(Ye.componentId))===null||at===void 0?void 0:at.sceneId)===W})),$=K.next();!$.done;$=K.next()){var ee=$.value,te=y.get(ee.componentId);try{for(var H=(U=void 0,Ne(mi(te))),ce=H.next();!ce.done;ce=H.next()){var de=ce.value;!ti(de)||G.hitIds.has(de.id)||Vp(c,_,cp(de,ee.parameters.shape))&&(G.hitIds.add(de.id),en(si("sliceHit",de)))}}catch(Ye){U={error:Ye}}finally{try{ce&&!ce.done&&(L=H.return)&&L.call(H)}finally{if(U)throw U.error}}}}catch(Ye){A={error:Ye}}finally{try{$&&!$.done&&(R=K.return)&&R.call(K)}finally{if(A)throw A.error}}try{for(var he=Ne(Tt),_e=he.next();!_e.done;_e=he.next()){var me=_e.value;if(!(me.broken||!me.breakable||G.hitIds.has(me.key))){var we=vt.get(me.bodyId),Ie=nt(me.anchorId);if(!(!we||!Ie)){var Ce=oi(Ie);sh(c,_,{x:Ce.x,y:Ce.y},{x:we.x,y:we.y})&&(G.hitIds.add(me.key),me.broken=!0,aa.add(me.key),en({kind:"jointBreak",behaviorId:me.id,componentId:me.componentId,selfInstanceId:me.bodyId,instanceId:(J=nt(me.bodyId))===null||J===void 0?void 0:J.instanceId}))}}}}catch(Ye){Y={error:Ye}}finally{try{_e&&!_e.done&&(z=he.return)&&z.call(he)}finally{if(Y)throw Y.error}}}}function Kv(c,_){var P,A=_.last,R=_.behavior.parameters;if(R.inkVariableId){var U=R.inkVariableId,L=Math.hypot(c.x-A.x,c.y-A.y);if(((P=Z[U])!==null&&P!==void 0?P:0)<L)return;Z[U]-=L}_.store.add(c)&&(R.mode==="slice-blade"&&$v(A,c,_),_.last=c)}function Qv(c){var _,P;if(!(!We||We.pointerId!==c.pointerId)){var A=We;We=void 0;try{!((_=e.hasPointerCapture)===null||_===void 0)&&_.call(e,c.pointerId)&&((P=e.releasePointerCapture)===null||P===void 0||P.call(e,c.pointerId))}catch{}if(A.kind==="stroke"){var R=A.store.end(),U=A.behavior.parameters;if(R){if(U.mode==="physics-wall"){var L=new Set(A.store.strokes.map(function(z){return z.id}));Ve=Ve.filter(function(z){return z.owner!==A.c.id||L.has(z.strokeId)}),Ve.push.apply(Ve,qe([],Le(Hp(R,U.strokeWidth).map(function(z){return St(St({},z),{owner:A.c.id})})),!1))}else if(U.mode==="path-trace"){var Y=nt(U.followComponentId);Y&&R.points.length>1&&sr.set(Y.id,{points:R.points,index:1,speed:U.followSpeed})}}en({kind:"strokeEnd",componentId:A.c.id})}}}function jv(c){var _,P,A,R;try{for(var U=Ne(qi.values()),L=U.next();!L.done;L=U.next()){var Y=L.value;Y.tick(c)}}catch(me){_={error:me}}finally{try{L&&!L.done&&(P=U.return)&&P.call(U)}finally{if(_)throw _.error}}try{for(var z=Ne(sr),J=z.next();!J.done;J=z.next()){var G=Le(J.value,2),K=G[0],$=G[1],ee=nt(K);if(!ee){sr.delete(K);continue}var te=$.points[$.index];if(!te){sr.delete(K),en(si("pathArrive",ee));continue}var H=oi(ee),ce=te.x-H.x,de=te.y-H.y,he=Math.hypot(ce,de),_e=$.speed*c;he<=_e?(sa(ee,te.x,te.y),$.index++):he>.001&&sa(ee,H.x+ce/he*_e,H.y+de/he*_e)}}catch(me){A={error:me}}finally{try{J&&!J.done&&(R=z.return)&&R.call(z)}finally{if(A)throw A.error}}}function eg(c,_,P){var A,R,U=[],L=[],Y=function(K){var $=y.get(K.componentId),ee=K.parameters.dragMode==="anywhere"?mi($).find(function(ce){return ti(ce)}):P.find(function(ce){var de;return((de=ce.prototypeId)!==null&&de!==void 0?de:ce.id)===$.id});if(!ee)return"continue";if(K.kind==="swipe-input")L.push({behavior:K,c:ee});else{var te=K.parameters,H=Math.max(te.min,Math.min(te.max,Number(Z[te.variableId])));Z[te.variableId]=H,U.push({behavior:K,c:ee,charge:Lp(te,H)}),en(si("holdStart",ee))}};try{for(var z=Ne(n.gameplay.filter(function(K){var $;return["swipe-input","hold-charge"].includes(K.kind)&&(($=y.get(K.componentId))===null||$===void 0?void 0:$.sceneId)===W})),J=z.next();!J.done;J=z.next()){var G=J.value;Y(G)}}catch(K){A={error:K}}finally{try{J&&!J.done&&(R=z.return)&&R.call(z)}finally{if(A)throw A.error}}(U.length||L.length)&&(pe={pointerId:c.pointerId,start:_,current:_,holds:U,swipes:L})}function tg(c,_){var P,A,R,U,L,Y,z,J;if(!(!pe||pe.pointerId!==c.pointerId)){var G=pe,K=new Set;pe=void 0;try{for(var $=Ne(qe(qe([],Le(G.holds),!1),Le(G.swipes),!1)),ee=$.next();!ee.done;ee=$.next()){var te=ee.value,H=te.behavior,ce=te.c;K.has(H.componentId)||(K.add(H.componentId),en(si("pointerUp",ce,void 0,{targetId:ce.id,pointerId:c.pointerId})))}}catch(Xe){P={error:Xe}}finally{try{ee&&!ee.done&&(A=$.return)&&A.call($)}finally{if(P)throw P.error}}try{for(var de=Ne(G.holds),he=de.next();!he.done;he=de.next()){var _e=he.value,me=_e.behavior.parameters;if(en(si("holdRelease",_e.c)),me.resetOnRelease!==!1){var we=Z[me.variableId];Z[me.variableId]=me.min,we!==me.min&&en({kind:"variableChange",variableId:me.variableId,selfInstanceId:(z=_e.c.instanceId)!==null&&z!==void 0?z:_e.c.id,instanceId:_e.c.instanceId})}}}catch(Xe){R={error:Xe}}finally{try{he&&!he.done&&(U=de.return)&&U.call(de)}finally{if(R)throw R.error}}try{for(var Ie=Ne(G.swipes),Ce=Ie.next();!Ce.done;Ce=Ie.next()){var Ye=Ce.value,at=Pp(G.start,_,Ye.behavior.parameters.minDistancePx,(J=Ar.get(Ye.behavior.id))!==null&&J!==void 0?J:-1/0,ne*1e3,Ye.behavior.parameters.cooldownMs);at&&(Ar.set(Ye.behavior.id,ne*1e3),en(si("swipe",Ye.c,void 0,{direction:at})))}}catch(Xe){L={error:Xe}}finally{try{Ce&&!Ce.done&&(Y=Ie.return)&&Y.call(Ie)}finally{if(L)throw L.error}}return K}}function ng(c,_,P){var A,R,U;if(P.some(function(H){return H.contract==="native.button.v1"&&Ft(H).enabled}))return!1;try{for(var L=Ne(n.gameplay.filter(function(H){var ce;return H.kind==="virtual-joystick"&&((ce=y.get(H.componentId))===null||ce===void 0?void 0:ce.sceneId)===W})),Y=L.next();!Y.done;Y=L.next()){var z=Y.value,J=y.get(z.componentId);if(ti(J)){var G=Zi.get(z.id);if(!(G&&G.pointerId!==null)){var K=Cn(_r(Fn(J)),_.x,_.y),$=Ft(J);if(!(K.x<0||K.y<0||K.x>$.width||K.y>$.height)){var ee=z.parameters.mode==="floating"?St({},_):oi(J),te=rh(ee,_,z.parameters.radiusPx,z.parameters.deadZone);return G=St({behavior:z,c:J,pointerId:c.pointerId,origin:ee,current:_},te),Zi.set(z.id,G),Ji(G),en(si("joystickStart",J)),(U=e.setPointerCapture)===null||U===void 0||U.call(e,c.pointerId),!0}}}}}catch(H){A={error:H}}finally{try{Y&&!Y.done&&(R=L.return)&&R.call(L)}finally{if(A)throw A.error}}return!1}var hp=function(c){var _,P,A,R,U,L,Y,z,J,G,K,$,ee;M();var te=Wd(c),H=ac(te);if(Je=te,!(!H&&h)){if(h){H&&(qt=H.c.id,T((U=H.c.prototypeId)!==null&&U!==void 0?U:H.c.id));return}var ce=n.gameplay.some(function(Ot){return Ot.kind==="virtual-joystick"||Ot.kind==="fps-controller-3d"});if(!(!c.isTrusted||c.button!==void 0&&c.button!==0||!ce&&c.isPrimary===!1||ht||Oe||!ce&&(_t&&_t.pointerId!==c.pointerId||pe&&pe.pointerId!==c.pointerId||I&&I.pointerId!==c.pointerId||ct&&ct.pointerId!==c.pointerId)||D&&(!Pe||!Ke))){var de=!Te;He=ne,$e=!0,Te=!0,Yd(!0),de&&!wt&&(Gt=ut=0,oa());var he=H?sc(H.c):[];if(ng(c,te,he)){Gt=ut=0,wt=!1,oa(),Ci();return}if(Jv(c,te,he)){oa(),Ci();return}eg(c,te,he);var _e=Ht&&!he.some(function(Ot){return Ot.contract==="native.button.v1"})?n.gameplay.find(function(Ot){var st;return Ot.kind==="aim-launch-3d"&&((st=y.get(Ot.componentId))===null||st===void 0?void 0:st.sceneId)===W}):void 0;if(_e){var me=y.get(_e.componentId),we=yn("physics-3d",me.id),Ie=we?Nd(me,we):void 0,Ce=Ud(me.id),Ye=_e.parameters.dragMode==="anywhere"||Ce&&Math.hypot(te.x-Ce.x,te.y-Ce.y)<=_e.parameters.hitRadiusPx;if(Ie&&Ie.atRest&&!Ie.captured&&Ye){ct={behavior:_e,targetId:me.id,sourceId:me.id,stageId:_e.parameters.stageId,pointerId:c.pointerId,start:te,current:te,power:0},ap(te),(L=e.setPointerCapture)===null||L===void 0||L.call(e,c.pointerId);return}}var at=he.some(function(Ot){return Ot.contract==="native.button.v1"&&Ft(Ot).enabled||n.events.some(function(st){var Ut;return st.kind==="click"&&st.componentId===((Ut=Ot.prototypeId)!==null&&Ut!==void 0?Ut:Ot.id)})});if(Ht&&!pn&&!at){var Xe=n.gameplay.find(function(Ot){var st;return Ot.kind==="fps-controller-3d"&&Ot.parameters.lookMode!=="none"&&((st=y.get(Ot.componentId))===null||st===void 0?void 0:st.sceneId)===W});if(Xe){var pt=y.get(Xe.componentId),mt=Cn(_r(Fn(pt)),te.x,te.y),Bt=Ft(pt);if(mt.x>=0&&mt.y>=0&&mt.x<=Bt.width&&mt.y<=Bt.height){ic(Xe),pn={pointerId:c.pointerId,stageId:pt.id,behavior:Xe,last:te},(Y=e.setPointerCapture)===null||Y===void 0||Y.call(e,c.pointerId);return}}}var kt=n.gameplay.find(function(Ot){return Ot.kind==="aim-launch"&&y.get(Ot.componentId).sceneId===W&&(Ot.parameters.dragMode==="anywhere"&&!he.some(function(st){return st.contract==="native.button.v1"})||he.some(function(st){var Ut;return((Ut=st.prototypeId)!==null&&Ut!==void 0?Ut:st.id)===Ot.componentId}))});if(kt){var it=y.get(kt.componentId),Yt=(z=he.find(function(st){var Ut;return((Ut=st.prototypeId)!==null&&Ut!==void 0?Ut:st.id)===it.id}))!==null&&z!==void 0?z:mi(it).find(function(st){return ti(st)}),Ie=Yt&&ys(Yt,yn("physics-body",it.id));if(Ie&&(!kt.parameters.onlyWhenAtRest||Ie.atRest)){I={behavior:kt,targetId:Yt.id,sourceId:it.id,pointerId:c.pointerId,start:te,current:te,power:0},dp(te),(J=e.setPointerCapture)===null||J===void 0||J.call(e,c.pointerId),Ci();return}}try{for(var It=Ne(he),dt=It.next();!dt.done;dt=It.next()){var Qe=dt.value,rt=yn("press-feedback",(G=Qe.prototypeId)!==null&&G!==void 0?G:Qe.id);rt&&(Qe.contract!=="native.button.v1"||Ft(Qe).enabled)&&Kt.set(Qe.id,{behavior:rt.parameters,pointerId:c.pointerId,held:!0})}}catch(Ot){_={error:Ot}}finally{try{dt&&!dt.done&&(P=It.return)&&P.call(It)}finally{if(_)throw _.error}}var Mt=he.find(function(Ot){var st;return((st=Qt.get(Ot.id))===null||st===void 0?void 0:st.sceneId)===W});if(Mt){var bt=ni.get(Mt.parentId);if(bt?.snapshot().busy)return;Pv(Mt),bt&&!bt.snapshot().busy&&(qn={pointerId:c.pointerId,boardId:Mt.parentId,tileId:Mt.id,start:te},(K=e.setPointerCapture)===null||K===void 0||K.call(e,c.pointerId))}Pt=($=he.find(function(Ot){return Ot.contract==="native.button.v1"&&Ft(Ot).enabled}))===null||$===void 0?void 0:$.id,$t=Pt?c.pointerId:void 0;var jt=n.gameplay.find(function(Ot){return Ot.kind==="drag"&&he.some(function(st){var Ut;return((Ut=st.prototypeId)!==null&&Ut!==void 0?Ut:st.id)===Ot.componentId})});if(jt){var Qe=he.find(function(st){var Ut;return((Ut=st.prototypeId)!==null&&Ut!==void 0?Ut:st.id)===jt.componentId}),zt=oi(Qe),nn=Tn.zoneOf(Qe.id);ar.set(Qe.id,zt),Tn.release(Qe.id),_t={b:jt,targetId:Qe.id,start:te,current:te,origin:zt,originZone:nn,m:qe([],Le(lr(Qe)),!1),pointerId:c.pointerId},en(si("dragStart",Qe)),e.setPointerCapture(c.pointerId)}Gt=ut=0,wt=!1;try{for(var Vt=Ne(he),rn=Vt.next();!rn.done;rn=Vt.next()){var Qe=rn.value;(Qe.contract!=="native.button.v1"||Ft(Qe).enabled)&&en({kind:"click",componentId:(ee=Qe.prototypeId)!==null&&ee!==void 0?ee:Qe.id,instanceId:Qe.instanceId,targetId:Qe.id,pointerId:c.pointerId})}}catch(Ot){A={error:Ot}}finally{try{rn&&!rn.done&&(R=Vt.return)&&R.call(Vt)}finally{if(A)throw A.error}}oa(),Ci()}}};function fp(c,_){if(!qn||qn.pointerId!==c.pointerId)return!1;if(!c.isTrusted||!bi())return!0;var P=qn,A=ni.get(P.boardId);if(A.snapshot().busy)return qn=void 0,!0;var R=_r(Fn(y.get(P.boardId))),U=Cn(R,P.start.x,P.start.y),L=Cn(R,_.x,_.y),Y=L.x-U.x,z=L.y-U.y,J=y.get(P.tileId);if(Math.max(Math.abs(Y),Math.abs(z))<Math.min(J.parameters.width,J.parameters.height)*.35)return!0;var G=Qt.get(J.id),K=Math.abs(Y)>Math.abs(z),$=G.row+(K?0:Math.sign(z)),ee=G.column+(K?Math.sign(Y):0),te=qe([],Le(Qt),!1).find(function(H){var ce=Le(H,2),de=ce[1];return de.boardId===P.boardId&&de.row===$&&de.column===ee});return te&&A.swap(J.id,te[0])&&(bn=void 0,Ci()),qn=void 0,!0}var pp=function(c){var _,P,A,R;if(!ht){M();var U=b(),L=Wd(c);Je=L,pe?.pointerId===c.pointerId&&(pe.current=L);var Y=function(It){var dt,Qe;if(It.pointerId===c.pointerId){var rt=L.x-It.current.x,Mt=L.y-It.current.y;if(c.isTrusted&&bi())try{for(var bt=(dt=void 0,Ne(n.gameplay.filter(function(nn){var Vt,rn;return nn.kind==="fps-controller-3d"&&nn.parameters.aimJoystickBehaviorId===It.behavior.id&&((Vt=nn.parameters.aimMode)!==null&&Vt!==void 0?Vt:"delta")==="delta"&&((rn=y.get(nn.componentId))===null||rn===void 0?void 0:rn.sceneId)===W}))),jt=bt.next();!jt.done;jt=bt.next()){var zt=jt.value;ip(zt,rt,Mt)}}catch(nn){dt={error:nn}}finally{try{jt&&!jt.done&&(Qe=bt.return)&&Qe.call(bt)}finally{if(dt)throw dt.error}}return Object.assign(It,{current:L},rh(It.origin,L,It.behavior.parameters.radiusPx,It.behavior.parameters.deadZone)),Ji(It),Ci(),{value:void 0}}};try{for(var z=Ne(Zi.values()),J=z.next();!J.done;J=z.next()){var G=J.value,K=Y(G);if(typeof K=="object")return K.value}}catch(It){_={error:It}}finally{try{J&&!J.done&&(P=z.return)&&P.call(z)}finally{if(_)throw _.error}}if(We?.pointerId===c.pointerId){if(We.kind==="mask"){var $=We,ee=Cn(_r(Fn($.c)),L.x,L.y);Oo($.c,$.behavior).stampSegment($.last,ee),$.last=ee}else Kv(L,We);oa(),Ci();return}if(pn?.pointerId===c.pointerId){c.isTrusted&&bi()&&(ip(pn.behavior,L.x-pn.last.x,L.y-pn.last.y),pn.last=L,Ci());return}if(ct?.pointerId===c.pointerId){c.isTrusted&&bi()&&ap(L);return}if(I?.pointerId===c.pointerId){c.isTrusted&&bi()&&dp(L),Ci();return}var te=ac(L);if(cn=te?(A=sc(te.c).find(function(It){return It.contract==="native.button.v1"}))===null||A===void 0?void 0:A.id:void 0,!fp(c,L)&&!(!_t||_t.pointerId!==c.pointerId)){var H=nt(_t.targetId);if(!H){or();return}var ce=H.parentId?Fn(nt(H.parentId)):pa(),de=_r(ce),he=Cn(de,_t.start.x,_t.start.y),_e=Cn(de,L.x,L.y),me=qe([],Le(_t.m),!1),we=_t.b.parameters.axis;if(we!=="y"){var Ie=_t.m[4]+_e.x-he.x;Number.isFinite(_t.b.parameters.minX)&&(Ie=Math.max(_t.b.parameters.minX,Ie)),Number.isFinite(_t.b.parameters.maxX)&&(Ie=Math.min(_t.b.parameters.maxX,Ie)),me[4]=Ie}if(we!=="x"){var Ce=_t.m[5]+_e.y-he.y;Number.isFinite(_t.b.parameters.minY)&&(Ce=Math.max(_t.b.parameters.minY,Ce)),Number.isFinite(_t.b.parameters.maxY)&&(Ce=Math.min(_t.b.parameters.maxY,Ce)),me[5]=Ce}if(!H.parentId)we!=="y"&&(me[4]=Math.max(0,Math.min(U.width-H.parameters.width,me[4])));else{var Ye=$i(H,Hs(ce,me)),at=0;Ye.left<0||Ye.right-Ye.left>U.width?at=-Ye.left:Ye.right>U.width&&(at=U.width-Ye.right);var Xe=we==="y"?0:ce[0],pt=we==="x"?0:ce[2];Math.abs(Xe)>=Math.abs(pt)&&Math.abs(Xe)>1e-8?me[4]+=at/Xe:Math.abs(pt)>1e-8&&(me[5]+=at/pt)}var mt=(R=De.get(H.id))!==null&&R!==void 0?R:{parameters:{}};De.set(H.id,St(St({},mt),{transform:me})),_t.current=L;var Bt=kd(H),kt=Bt.zones,it=Bt.tag,Yt=yc({itemId:H.id,tag:it,zones:kt,occupancy:Tn});xe=Yt&&Yt.kind!=="reject"?Yt.zone:void 0}}},mp=function(c){var _,P,A,R,U;M();var L=Wd(c),Y=w;Je=L,Ni(c.pointerId,!0),gi(c.pointerId),Qv(c);var z=(A=tg(c,L))!==null&&A!==void 0?A:new Set;if(Lv(c),c.isTrusted&&bi()){var J=ac(L);try{for(var G=Ne(J?sc(J.c):[]),K=G.next();!K.done;K=G.next()){var $=K.value;!z.has((R=$.prototypeId)!==null&&R!==void 0?R:$.id)&&($.contract!=="native.button.v1"||Ft($).enabled)&&en(si("pointerUp",$,void 0,{targetId:$.id,pointerId:c.pointerId}))}}catch(he){_={error:he}}finally{try{K&&!K.done&&(P=G.return)&&P.call(G)}finally{if(_)throw _.error}}}if(oa(),Ci(),ct?.pointerId===c.pointerId){var ee=ct,te=rp(),H=Et.get(ee.targetId);(U=Ht?.getStage(y.get(ee.stageId)))===null||U===void 0||U.setGuide([]),ct=void 0,ee.behavior.parameters.powerVariableId&&(Z[ee.behavior.parameters.powerVariableId]=0);var ce=Math.hypot(te.vx,te.vz);c.isTrusted&&Yd(!0),H&&c.isTrusted&&bi()&&te.pull>=ee.behavior.parameters.minPullPx&&ce>=ee.behavior.parameters.minSpeed&&(H.vx=te.vx,H.vy=0,H.vz=te.vz,H.atRest=!1,H.restElapsed=0,H.movingTime=0,H.captured=!1,H.lastSafe={x:H.x,y:H.y,z:H.z},en({kind:"launch",componentId:ee.sourceId})),xn(c),oa();return}if(I?.pointerId===c.pointerId){var ee=I,te=Xd(),H=vt.get(ee.targetId);I=void 0,ee.behavior.parameters.powerVariableId&&(Z[ee.behavior.parameters.powerVariableId]=0),H&&c.isTrusted&&bi()&&te.pull>=ee.behavior.parameters.minPullPx&&(H.vx=te.vx,H.vy=te.vy,H.atRest=!1,H.restElapsed=0,H.captured=!1,H.exited=!1,en({kind:"launch",componentId:ee.sourceId,instanceId:H.instanceId})),xn(c),oa(),Ci();return}if(fp(c,L),qn?.pointerId===c.pointerId&&(qn=void 0),xn(c),!(Y?.pointerId!==c.pointerId||!c.isTrusted||!bi()||navigator.userActivation&&navigator.userActivation.isActive!==!0||!Xa(Y.condition))){var de=ac(L);!de||!sc(de.c).some(function(he){return he.id===Y.targetId&&(he.contract!=="native.button.v1"||Ft(he).enabled)})||(D?D.openStore(n.base.storeUrl):window.open(n.base.storeUrl,"_blank","noopener"))}},oc=function(c){var _,P;if(ct?.pointerId===c.pointerId&&fn(c.pointerId),pn?.pointerId===c.pointerId&&gi(c.pointerId),Ni(c.pointerId,!0),I?.pointerId===c.pointerId&&(I.behavior.parameters.powerVariableId&&(Z[I.behavior.parameters.powerVariableId]=0),I=void 0),qn?.pointerId===c.pointerId&&(qn=void 0),We?.pointerId===c.pointerId&&(We.kind==="stroke"&&We.store.cancel(),We=void 0),pe?.pointerId===c.pointerId){try{for(var A=Ne(pe.holds),R=A.next();!R.done;R=A.next()){var U=R.value;U.behavior.parameters.resetOnRelease!==!1&&(Z[U.behavior.parameters.variableId]=U.behavior.parameters.min)}}catch(L){_={error:L}}finally{try{R&&!R.done&&(P=A.return)&&P.call(A)}finally{if(_)throw _.error}}pe=void 0}xn(c)},vp=function(c){c?.isTrusted&&!h&&!ht&&!Oe&&Yd(!0)},qd=function(){Ge||Ci()},Ya=typeof globalThis.ResizeObserver=="function"?new globalThis.ResizeObserver(qd):void 0;try{(s=Ya?.observe)===null||s===void 0||s.call(Ya,e)}catch{}var gp=function(){Be=0,ze=0,document.hidden&&Ii(),je&&(document.hidden?je.suspend().catch(function(){}):!ht&&Te&&Bo())};document.addEventListener("visibilitychange",gp),(o=globalThis.addEventListener)===null||o===void 0||o.call(globalThis,"resize",qd),e.addEventListener("pointerdown",hp),e.addEventListener("pointermove",pp),e.addEventListener("pointerup",mp),e.addEventListener("pointercancel",oc),e.addEventListener("lostpointercapture",oc),e.addEventListener("click",vp);var Zd=D?.onVisibilityChanged(function(c){Ke=c,Be=0,ze=0,c||Ii(),je&&(c?!ht&&Te&&Bo():je.suspend().catch(function(){}))}),Jd=D?.onClosed(function(){Oe=!0,Be=0,ze=0,Ii(),yt()}),$d=(u=D?.onVolumeChanged)===null||u===void 0?void 0:u.call(D,function(c){typeof c=="number"&&Number.isFinite(c)&&c>=0&&(Mi=Math.min(1,c>1?c/100:c),Bd())});function yp(c){var _=!h&&!ht&&!document.hidden&&Pe&&Ke&&!Oe;if(_&&ze&&(oe+=Math.min((c-ze)/1e3,5/60)),bi()){Gt=ut=0,wt=!1,ze&&(Be+=Math.min((c-ze)/1e3,5/60));for(var P=0;P<5&&Be>=1/60;P++)kv(1/60),Be-=1/60;oa()}else Be=0;ze=c,Ci(),ae=requestAnimationFrame(yp)}return Fd(),h&&(W=m),Ci(),ae=requestAnimationFrame(yp),D&&D.init().then(function(){Ge||(Pe=!0,Ke=D.isVisible(),Be=0,ze=0)}).catch(function(){Ge||(Oe=!0,Ii(),yt())}),{state:Vn,auditViewport:Yv,auditSceneLayout:qv,restart:function(){var c;(c=D?.notifyGameRetry)===null||c===void 0||c.call(D),Fd(),Ci()},select:function(c){qt=c},inspectScene:function(c){h&&n.scenes.some(function(_){return _.id===c})&&(W=c,qt=void 0)},pause:function(c){ht=c,Be=0,ze=0,c&&Ii(),je&&(c?je.suspend().catch(function(){}):Te&&Bo())},destroy:function(){var c,_;Ge=!0,cancelAnimationFrame(ae),Ii(),yt(),Ht?.dispose(),Zd?.(),Jd?.(),$d?.(),D?.destroy(),(c=Ya?.disconnect)===null||c===void 0||c.call(Ya),document.removeEventListener("visibilitychange",gp),(_=globalThis.removeEventListener)===null||_===void 0||_.call(globalThis,"resize",qd),e.removeEventListener("pointerdown",hp),e.removeEventListener("pointermove",pp),e.removeEventListener("pointerup",mp),e.removeEventListener("pointercancel",oc),e.removeEventListener("lostpointercapture",oc),e.removeEventListener("click",vp),je?.close().catch(function(){})}}}return mg(Jb);})();
