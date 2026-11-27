var ToraNative=(()=>{var af=Object.defineProperty;var mg=Object.getOwnPropertyDescriptor;var vg=Object.getOwnPropertyNames;var gg=Object.prototype.hasOwnProperty;var yg=(n,e)=>{for(var t in e)af(n,t,{get:e[t],enumerable:!0})},xg=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of vg(e))!gg.call(n,r)&&r!==t&&af(n,r,{get:()=>e[r],enumerable:!(i=mg(e,r))||i.enumerable});return n};var _g=n=>xg(af({},"__esModule",{value:!0}),n);var ew={};yg(ew,{computeSafeArea:()=>np,createNetworkBridge:()=>wv,layoutStandardText:()=>Tv,mountNative:()=>jb});var Pp=function(n,e){if(!n)throw Error(e)},ga=function(){return[1,0,0,1,0,0]};function sf(n){return Pp(Array.isArray(n)&&n.length===6&&n.every(Number.isFinite),"E_SCENE_MATRIX"),n}function qs(n,e){return sf(n),sf(e),[n[0]*e[0]+n[2]*e[1],n[1]*e[0]+n[3]*e[1],n[0]*e[2]+n[2]*e[3],n[1]*e[2]+n[3]*e[3],n[0]*e[4]+n[2]*e[5]+n[4],n[1]*e[4]+n[3]*e[5]+n[5]]}function wr(n){sf(n);var e=n[0]*n[3]-n[1]*n[2];return Pp(Math.abs(e)>1e-12,"E_SCENE_SINGULAR_TRANSFORM"),[n[3]/e,-n[1]/e,-n[2]/e,n[0]/e,(n[2]*n[5]-n[3]*n[4])/e,(n[1]*n[4]-n[0]*n[5])/e]}var lf=function(){return lf=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},lf.apply(this,arguments)},ya=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ts=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},of=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Lp(n){var e=n.rows,t=n.columns,i=n.seed,r=n.slots,a=n.paint,s=n.onEvent,o=r.map(function(fe){return fe.group}),u=Ts([],ya(new Set(o)),!1),l=Ts([],ya(o),!1),d=i,f="idle",h=0,v,y,T=[],g=[],m=0,L=0,F=0,_,p,S=function(fe,pe){return fe*t+pe},B=function(fe){return Math.floor(fe/t)},b=function(fe){return fe%t},I=function(){return d=Math.imul(d,1664525)+1013904223>>>0,d/4294967296};function z(fe){for(var pe=new Set,Fe=0;Fe<e;Fe++)for(var ae=0;ae<t;ae++){var de=S(Fe,ae),_e=fe[de];if(ae+2<t&&_e===fe[de+1]&&_e===fe[de+2])for(var Ge=0;Ge<3;Ge++)pe.add(de+Ge);if(Fe+2<e&&_e===fe[de+t]&&_e===fe[de+t*2])for(var Ge=0;Ge<3;Ge++)pe.add(de+t*Ge)}return Ts([],ya(pe),!1)}function U(fe,pe){var Fe;if(l[fe]===l[pe])return!1;var ae=Ts([],ya(l),!1);return Fe=ya([ae[pe],ae[fe]],2),ae[fe]=Fe[0],ae[pe]=Fe[1],z(ae).some(function(de){return de===fe||de===pe})}function Y(){for(var fe=[],pe=0;pe<l.length;pe++)b(pe)+1<t&&U(pe,pe+1)&&fe.push({from:r[pe].id,to:r[pe+1].id}),B(pe)+1<e&&U(pe,pe+t)&&fe.push({from:r[pe].id,to:r[pe+t].id});return fe}function E(){for(var fe=0;fe<64;fe++){l=[];for(var pe=function(ae){var de=u.filter(function(_e){return!(b(ae)>=2&&l[ae-1]===_e&&l[ae-2]===_e)&&!(B(ae)>=2&&l[ae-t]===_e&&l[ae-t*2]===_e)});l.push(de[Math.floor(I()*de.length)])},Fe=0;Fe<r.length;Fe++)pe(Fe);if(Y().length)return}l=r.map(function(ae,de){return u[(B(de)*2+b(de))%3]}),l[0]=u[0],l[1]=u[1],l[2]=u[0],l[t+1]=u[0]}function M(){for(var fe=0;fe<r.length;fe++)a(fe,l[fe],{})}function O(){d=i,l=Ts([],ya(o),!1),f="idle",h=0,v=void 0,y=void 0,T=[],g=[],m=0,L=0,F=0,_=void 0,p=void 0,(z(l).length||!Y().length)&&E(),M()}function H(fe,pe){if(f!=="idle")return!1;var Fe=r.findIndex(function(de){return de.id===fe}),ae=r.findIndex(function(de){return de.id===pe});return Fe<0||ae<0||Math.abs(B(Fe)-B(ae))+Math.abs(b(Fe)-b(ae))!==1?!1:(v=void 0,_=void 0,M(),y=[Fe,ae],f="swap",h=0,!0)}function ee(fe){if(f==="idle"){if(v===fe){v=void 0;return}if(!(v&&H(v,fe)))return v=fe,v}}function j(){T=z(l),F+=T.length,p={group:l[T[0]],from:r[T[0]].id,count:T.length},s("matchClear"),f="clear",h=0}function K(){var fe=new Set(T),pe=Ts([],ya(l),!1);g=[];for(var Fe=0;Fe<t;Fe++){for(var ae=[],de=e-1;de>=0;de--)fe.has(S(de,Fe))||ae.push(S(de,Fe));for(var _e=0,de=e-1;de>=0;de--){var Ge=S(de,Fe),$e=ae[e-1-de];$e!==void 0?(pe[Ge]=l[$e],g.push({cell:Ge,from:$e,offsetRows:0})):(pe[Ge]=u[Math.floor(I()*u.length)],g.push({cell:Ge,from:Ge,offsetRows:-(de+1+_e++)}))}}l=pe,f="fall",h=0}function re(){if(z(l).length&&m<3){m++,j();return}(z(l).length||!Y().length)&&E(),M(),f="idle",h=0,y=void 0,T=[],g=[],L++,s("validMatch")}function J(fe){var pe,Fe,ae,de,_e,Ge,$e;if(f==="idle"){if(_){_.elapsed+=fe;var ut=1+.065*Math.sin(Math.min(1,_.elapsed/.8)*Math.PI*4),zt=function(ze){a(r.findIndex(function(Ye){return Ye.id===ze}),l[r.findIndex(function(Ye){return Ye.id===ze})],{scale:ut})};try{for(var ct=of(_.ids),Tt=ct.next();!Tt.done;Tt=ct.next()){var Zt=Tt.value;zt(Zt)}}catch(ze){pe={error:ze}}finally{try{Tt&&!Tt.done&&(Fe=ct.return)&&Fe.call(ct)}finally{if(pe)throw pe.error}}_.elapsed>=.8&&(_=void 0,M())}return}if(h+=fe,f==="swap"||f==="reverse"){var wt=Math.min(1,h/.14),bt=wt*wt*(3-2*wt),_t=ya(y,2),ln=_t[0],rt=_t[1];if(a(ln,l[ln],{from:rt,progress:f==="swap"?bt:1-bt}),a(rt,l[rt],{from:ln,progress:f==="swap"?bt:1-bt}),wt<1)return;if(f==="reverse"){M(),f="idle",y=void 0,s("invalidMatch");return}if(!U(ln,rt)){f="reverse",h=0;return}ae=ya([l[rt],l[ln]],2),l[ln]=ae[0],l[rt]=ae[1],M(),j();return}if(f==="clear"){var an=Math.min(1,h/.18),ut=an<.22?1+an*.45:Math.max(.05,1.1*(1-an)/.78);try{for(var se=of(T),mn=se.next();!mn.done;mn=se.next()){var nn=mn.value;a(nn,l[nn],{scale:ut,opacity:1-an})}}catch(Ye){de={error:Ye}}finally{try{mn&&!mn.done&&(_e=se.return)&&_e.call(se)}finally{if(de)throw de.error}}an===1&&K();return}var W=Math.min(1,h/.25),w=1-Math.pow(1-W,3);try{for(var ue=of(g),ye=ue.next();!ye.done;ye=ue.next()){var we=ye.value;a(we.cell,l[we.cell],{from:we.from,offsetRows:we.offsetRows,progress:1-w})}}catch(ze){Ge={error:ze}}finally{try{ye&&!ye.done&&($e=ue.return)&&$e.call(ue)}finally{if(Ge)throw Ge.error}}W===1&&re()}function ne(){if(f==="idle"){v=void 0;var fe=Y()[0];fe&&(_={ids:[fe.from,fe.to],elapsed:0})}}function Te(){var fe;return{phase:f,busy:f!=="idle",selected:v??null,moves:L,cleared:F,groups:Ts([],ya(l),!1),legalMoves:f==="idle"?Y():[],hint:(fe=_?.ids)!==null&&fe!==void 0?fe:[],lastMatch:p?lf({},p):null}}return{reset:O,select:ee,swap:H,tick:J,showHint:ne,snapshot:Te,cancelSelection:function(){v=void 0,_&&(_=void 0,M())}}}var bc=function(){return bc=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},bc.apply(this,arguments)},Dp=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Mg=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Np=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Up(){var n=new Map,e=new Map,t=function(r){var a,s,o=e.get(r);o!==void 0&&((a=n.get(o))===null||a===void 0||a.delete(r),((s=n.get(o))===null||s===void 0?void 0:s.size)===0&&n.delete(o)),e.delete(r)},i=function(r,a){t(r),a!=null&&(n.has(a)||n.set(a,new Set),n.get(a).add(r),e.set(r,a))};return{occupants:n,itemZone:e,release:t,place:i,clear:function(){n.clear(),e.clear()},items:function(r){var a;return Mg([],Dp((a=n.get(r))!==null&&a!==void 0?a:[]),!1).sort()},zoneOf:function(r){return e.get(r)},snapshot:function(){return{itemZone:Object.fromEntries(e)}}}}function wc(n){var e,t,i=n.itemId,r=n.tag,a=r===void 0?"":r,s=n.zones,o=n.occupancy,u=s.filter(function(y){var T,g,m;return y.id!==i&&(((g=(T=y.acceptTags)===null||T===void 0?void 0:T.length)!==null&&g!==void 0?g:0)===0||((m=y.acceptTags)===null||m===void 0?void 0:m.includes(a)))});u.sort(function(y,T){return Number(T.itemTarget)-Number(y.itemTarget)||T.paintOrder-y.paintOrder||y.distance-T.distance||y.id.localeCompare(T.id)});try{for(var l=Np(u),d=l.next();!d.done;d=l.next()){var f=d.value,h=o.items(f.id).filter(function(y){return y!==i}),v=f.capacity>0&&h.length>=f.capacity;return f.snapMode==="reject"?{kind:"reject",zone:f,occupantId:h[0]}:v?f.onOccupied==="emit"?{kind:"emit",zone:f,occupantId:h[0]}:f.onOccupied==="swap"&&h.length?{kind:"swap",zone:f,occupantId:h[0]}:{kind:"reject",zone:f,occupantId:h[0]}:{kind:"accept",zone:f}}}catch(y){e={error:y}}finally{try{d&&!d.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}return null}function Fp(n,e,t,i,r,a){if(t===void 0&&(t=28),i===void 0&&(i=-1/0),r===void 0&&(r=0),a===void 0&&(a=80),r-i<a)return null;var s=e.x-n.x,o=e.y-n.y;return Math.max(Math.abs(s),Math.abs(o))<t?null:Math.abs(s)>Math.abs(o)?s<0?"left":"right":o<0?"up":"down"}function Op(n,e){var t=e,i=1;return{tick:function(r){return n.pingPong?(t+=i*n.ratePerSecond*r,t>=n.max?(t=n.max,i=-1):t<=n.min&&(t=n.min,i=1)):t=Math.max(n.min,Math.min(n.max,t+n.ratePerSecond*r)),t}}}function Bp(){var n=new Map;return{to:function(e,t,i,r,a){r===void 0&&(r=.18),n.set(e,{from:bc({},t),to:bc({},i),seconds:Math.max(.02,r),elapsed:0,onDone:a})},cancel:function(e){n.delete(e)},clear:function(){n.clear()},tick:function(e,t){var i,r,a;try{for(var s=Np(n),o=s.next();!o.done;o=s.next()){var u=Dp(o.value,2),l=u[0],d=u[1];d.elapsed+=e;var f=Math.min(1,d.elapsed/d.seconds),h=1-Math.pow(1-f,3);t(l,{x:d.from.x+(d.to.x-d.from.x)*h,y:d.from.y+(d.to.y-d.from.y)*h}),f===1&&(n.delete(l),(a=d.onDone)===null||a===void 0||a.call(d))}}catch(v){i={error:v}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}}}}function cf(n,e,t,i){t===void 0&&(t=56),i===void 0&&(i=.12);var r=Math.max(1,t),a=e.x-n.x,s=e.y-n.y,o=Math.hypot(a,s),u=Math.min(o,r),l=u/r,d=o>1e-6?a/o:0,f=o>1e-6?s/o:0,h=n.x+d*u,v=n.y+f*u;if(l<=i)return{nx:0,ny:0,magnitude:0,angle:0,knobX:h,knobY:v};var y=(l-i)/Math.max(1e-6,1-i);return{nx:d*y,ny:f*y,magnitude:y,angle:Math.atan2(f,d)*180/Math.PI,knobX:h,knobY:v}}var uf=function(){return uf=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},uf.apply(this,arguments)},kp=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function zp(n){var e,t,i=2166136261;try{for(var r=kp(String(n)),a=r.next();!a.done;a=r.next()){var s=a.value;i^=s.codePointAt(0),i=Math.imul(i,16777619)}}catch(o){e={error:o}}finally{try{a&&!a.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return i>>>0||1}function Sg(n){var e=n>>>0||1,t=e;return{next:function(){return t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296},between:function(i,r,a){if(a===void 0&&(a=!1),a){var s=Math.ceil(i),o=Math.floor(r);return o<s?s:Math.min(o,s+Math.floor((o-s+1)*this.next()))}return i+(r-i)*this.next()},reset:function(){t=e}}}function Vp(n,e,t,i,r){var a,s;i===void 0&&(i=0);var o=null,u=1/0;try{for(var l=kp(e),d=l.next();!d.done;d=l.next()){var f=d.value;if(!(f.id===r||f.team!==t)){var h=Math.hypot(f.x-n.x,f.y-n.y);i>0&&h>i||(h<u||h===u&&f.id<o?.id)&&(o=f,u=h)}}}catch(v){a={error:v}}finally{try{d&&!d.done&&(s=l.return)&&s.call(l)}finally{if(a)throw a.error}}return o}function Gp(n,e,t){var i=((e-n+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return n+Math.max(-t,Math.min(t,i))}function Hp(n){var e=Sg(n),t=new Map,i=new Map;return{rng:e,states:t,headings:i,reset:function(){e.reset(),t.clear(),i.clear()},initialize:function(r,a){var s;return t.has(r)||t.set(r,{hp:a.hp,maxHp:a.maxHp,value:a.value,tag:(s=a.tag)!==null&&s!==void 0?s:"",team:a.team}),t.get(r)},remove:function(r){t.delete(r),i.delete(r)},snapshot:function(r){var a=t.get(r);return a?uf({},a):void 0}}}function Wp(n,e){var t,i,r,a,s=e===void 0?{}:e,o=s.width,u=s.height,l=s.onProgress,d=l===void 0?function(){}:l,f=s.onComplete,h=f===void 0?function(){}:f,v=s.canvasFactory,y=s.source,T=n,g=T.gridSize,m=new Uint8Array(g*g),L=0,F=!1,_=-1,p=!1,S=Math.max(1,o),B=Math.max(1,u),b=Math.min(1,512/Math.max(S,B)),I=(t=v?.())!==null&&t!==void 0?t:!((i=globalThis.document)===null||i===void 0)&&i.createElement?globalThis.document.createElement("canvas"):void 0;I&&(I.width=Math.max(1,Math.round(S*b)),I.height=Math.max(1,Math.round(B*b)));var z=(r=I?.getContext)===null||r===void 0?void 0:r.call(I,"2d"),U=(a=T.maskColor)!==null&&a!==void 0?a:"#dceeff",Y=function(){return!!(y&&y.complete&&y.naturalWidth>0)},E=function(){z&&(z.globalCompositeOperation="source-over",z.clearRect(0,0,I.width,I.height),T.mode==="erase"&&(Y()?(z.drawImage(y,0,0,I.width,I.height),p=!0):(z.fillStyle=U,z.fillRect(0,0,I.width,I.height),p=!1)))};E();var M=function(){if(!F){var H=Math.round(L/m.length*100),ee=Math.min(100,H);ee!==_&&(_=ee,d(ee)),ee>=T.targetPercent&&(F=!0,h(ee))}},O=function(H,ee){for(var j=Math.max(0,Math.min(g-1,Math.floor(H/S*g))),K=Math.max(0,Math.min(g-1,Math.floor(ee/B*g))),re=Math.max(0,Math.ceil(T.brushRadiusPx/S*g)),J=Math.max(0,Math.ceil(T.brushRadiusPx/B*g)),ne=Math.max(0,K-J);ne<=Math.min(g-1,K+J);ne++)for(var Te=Math.max(0,j-re);Te<=Math.min(g-1,j+re);Te++)if(!(Math.hypot((Te+.5)/g*S-H,(ne+.5)/g*B-ee)>T.brushRadiusPx)){var fe=ne*g+Te;m[fe]||(m[fe]=1,L++)}z&&(z.save(),z.scale(b,b),z.globalCompositeOperation=T.mode==="erase"?"destination-out":"source-over",z.fillStyle=U,z.beginPath(),z.arc(H,ee,T.brushRadiusPx,0,Math.PI*2),z.fill(),T.mode==="reveal"&&y&&(z.globalCompositeOperation="source-in",z.drawImage(y,0,0,S,B)),z.restore()),M()};return{canvas:I,stampSegment:function(H,ee){for(var j=Math.hypot(ee.x-H.x,ee.y-H.y),K=Math.max(1,Math.ceil(j/Math.max(1,T.brushRadiusPx*.45))),re=0;re<=K;re++)O(H.x+(ee.x-H.x)*re/K,H.y+(ee.y-H.y)*re/K)},reset:function(){m.fill(0),L=0,F=!1,_=-1,E(),M()},get progress(){return Math.round(L/m.length*100)},render:function(H){T.mode==="erase"&&L===0&&!p&&Y()&&E(),I?H.drawImage(I,0,0,I.width,I.height,0,0,o,u):T.mode==="erase"&&this.progress<100&&(H.save(),H.globalAlpha=1-this.progress/100,H.fillStyle=U,H.fillRect(0,0,o,u),H.restore())}}}var Es=function(){return Es=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Es.apply(this,arguments)},bg=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function df(n,e,t,i){var r=function(d,f,h){return(f.x-d.x)*(h.y-d.y)-(f.y-d.y)*(h.x-d.x)},a=r(n,e,t),s=r(n,e,i),o=r(t,i,n),u=r(t,i,e),l=1e-8;return Math.abs(a)<l&&Math.abs(s)<l&&Math.abs(o)<l&&Math.abs(u)<l?Math.max(Math.min(n.x,e.x),Math.min(t.x,i.x))<=Math.min(Math.max(n.x,e.x),Math.max(t.x,i.x))+l&&Math.max(Math.min(n.y,e.y),Math.min(t.y,i.y))<=Math.min(Math.max(n.y,e.y),Math.max(t.y,i.y))+l:a>0!=s>0&&o>0!=u>0}function Xp(n,e){for(var t=!1,i=0,r=e.length-1;i<e.length;r=i++){var a=e[i],s=e[r];a.y>n.y!=s.y>n.y&&n.x<(s.x-a.x)*(n.y-a.y)/(s.y-a.y)+a.x&&(t=!t)}return t}function Yp(n,e,t){if(t.length>=3&&(Xp(n,t)||Xp(e,t)))return!0;for(var i=0;i<t.length;i++)if(df(n,e,t[i],t[(i+1)%t.length]))return!0;return!1}function qp(n){var e=n,t=[],i=null,r=0,a=function(s){return Es(Es({},s),{points:s.points.map(function(o){return Es({},o)})})};return{begin:function(s){var o={id:++r,points:[Es({},s)],age:0,hitIds:new Set};return i=o,t.push(o),t.length>e.maxStrokes&&t.shift(),o},add:function(s){if(!i||i.points.length>=e.maxPoints)return!1;var o=i.points[i.points.length-1];return Math.hypot(s.x-o.x,s.y-o.y)<e.minSegmentPx?!1:(i.points.push(Es({},s)),!0)},end:function(){var s=i;return i=null,s?a(s):void 0},cancel:function(){i&&(t=t.filter(function(s){return s!==i})),i=null},clear:function(){i=null,t=[]},tick:function(s){var o,u;try{for(var l=bg(t),d=l.next();!d.done;d=l.next()){var f=d.value;f.age+=s}}catch(h){o={error:h}}finally{try{d&&!d.done&&(u=l.return)&&u.call(l)}finally{if(o)throw o.error}}t=t.filter(function(h){return h===i||h.age<.18||e.mode!=="slice-blade"})},get active(){return i},get strokes(){return t}}}function Zp(n,e){for(var t=[],i=1;i<n.points.length;i++){var r=n.points[i-1],a=n.points[i],s=Math.hypot(a.x-r.x,a.y-r.y);s<.001||t.push({id:"stroke-".concat(n.id,"-").concat(i),strokeId:n.id,mode:"static",shape:"box",x:(r.x+a.x)/2,y:(r.y+a.y)/2,width:s,height:Math.max(2,e),angle:Math.atan2(a.y-r.y,a.x-r.x),restitution:.8})}return t}var jo=function(){return jo=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},jo.apply(this,arguments)},em=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},ts=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},wg=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ba=function(n,e){return Math.hypot(n,e)},Jp=function(n,e,t){return Math.max(e,Math.min(t,n))},As=function(n){return Math.max(1,Math.min(n.width,n.height)/2)};function $p(n){var e,t,i=Math.cos((e=n.angle)!==null&&e!==void 0?e:0),r=Math.sin((t=n.angle)!==null&&t!==void 0?t:0),a=n.width/2,s=n.height/2;return[[-a,-s],[a,-s],[a,s],[-a,s]].map(function(o){var u=em(o,2),l=u[0],d=u[1];return{x:n.x+l*i-d*r,y:n.y+l*r+d*i}})}function Tg(n,e){var t,i,r,a,s,o,u,l,d,f,h=$p(n),v=$p(e),y=[(u=n.angle)!==null&&u!==void 0?u:0,((l=n.angle)!==null&&l!==void 0?l:0)+Math.PI/2,(d=e.angle)!==null&&d!==void 0?d:0,((f=e.angle)!==null&&f!==void 0?f:0)+Math.PI/2],T=1/0,g=1,m=0;try{for(var L=ts(y),F=L.next();!F.done;F=L.next()){var _=F.value,p=Math.cos(_),S=Math.sin(_),B=1/0,b=-1/0,I=1/0,z=-1/0;try{for(var U=(r=void 0,ts(h)),Y=U.next();!Y.done;Y=U.next()){var E=Y.value,M=E.x*p+E.y*S;M<B&&(B=M),M>b&&(b=M)}}catch(j){r={error:j}}finally{try{Y&&!Y.done&&(a=U.return)&&a.call(U)}finally{if(r)throw r.error}}try{for(var O=(s=void 0,ts(v)),H=O.next();!H.done;H=O.next()){var E=H.value,M=E.x*p+E.y*S;M<I&&(I=M),M>z&&(z=M)}}catch(j){s={error:j}}finally{try{H&&!H.done&&(o=O.return)&&o.call(O)}finally{if(s)throw s.error}}var ee=Math.min(b,z)-Math.max(B,I);if(ee<=0)return null;ee<T&&(T=ee,g=p,m=S)}}catch(j){t={error:j}}finally{try{F&&!F.done&&(i=L.return)&&i.call(L)}finally{if(t)throw t.error}}return(n.x-e.x)*g+(n.y-e.y)*m<0&&(g=-g,m=-m),{nx:g,ny:m,penetration:T}}function Kp(n,e){var t,i,r,a=As(n),s=-((t=e.angle)!==null&&t!==void 0?t:0),o=Math.cos(s),u=Math.sin(s),l=n.x-e.x,d=n.y-e.y,f=l*o-d*u,h=l*u+d*o,v=e.width/2,y=e.height/2,T=Jp(f,-v,v),g=Jp(h,-y,y),m=f-T,L=h-g,F=Ba(m,L),_;if(F>=a)return null;if(F<1e-4){var p=[{d:v-Math.abs(f),x:f>=0?1:-1,y:0},{d:y-Math.abs(h),x:0,y:h>=0?1:-1}].sort(function(b,I){return b.d-I.d});m=p[0].x,L=p[0].y,_=a+p[0].d}else m/=F,L/=F,_=a-F;var S=Math.cos((i=e.angle)!==null&&i!==void 0?i:0),B=Math.sin((r=e.angle)!==null&&r!==void 0?r:0);return{nx:m*S-L*B,ny:m*B+L*S,penetration:_}}function Qp(n,e){var t;return!!(n.ignoreGroup&&n.ignoreGroup!=="none"&&(n.ignoreGroup==="all"||n.ignoreGroup===((t=e.collisionGroup)!==null&&t!==void 0?t:"all")))}function jp(n,e,t){var i,r,a,s,o,u;if(!(n.captured||e.captured||Qp(n,e)||Qp(e,n))){var l=n.x-e.x,d=n.y-e.y,f;if(n.shape==="circle"&&e.shape==="circle"){var h=Ba(l,d),v=As(n)+As(e)-h;if(v<=0)return;f=v,h>1e-4?(l/=h,d/=h):(l=1,d=0)}else if(n.shape==="circle"&&e.shape==="box"){var y=Kp(n,e);if(!y)return;l=y.nx,d=y.ny,f=y.penetration}else if(n.shape==="box"&&e.shape==="circle"){var y=Kp(e,n);if(!y)return;l=-y.nx,d=-y.ny,f=y.penetration}else if(n.shape==="box"&&e.shape==="box"){var y=Tg(n,e);if(!y)return;l=y.nx,d=y.ny,f=y.penetration}else return;var T=n.mode==="dynamic"?1/((i=n.mass)!==null&&i!==void 0?i:1):0,g=e.mode==="dynamic"?1/((r=e.mass)!==null&&r!==void 0?r:1):0,m=T+g;if(m){n.x+=l*f*T/m,n.y+=d*f*T/m,e.mode==="dynamic"&&(e.x-=l*f*g/m,e.y-=d*f*g/m);var L=n.vx-((a=e.vx)!==null&&a!==void 0?a:0),F=n.vy-((s=e.vy)!==null&&s!==void 0?s:0),_=L*l+F*d;if(!(_>=0)){var p=Math.max((o=n.restitution)!==null&&o!==void 0?o:0,(u=e.restitution)!==null&&u!==void 0?u:0),S=-(1+p)*_/m;n.vx+=l*S*T,n.vy+=d*S*T,e.mode==="dynamic"&&(e.vx-=l*S*g,e.vy-=d*S*g),n.atRest=!1,n.restElapsed=0,e.mode==="dynamic"&&(e.atRest=!1,e.restElapsed=0),Math.abs(_)>4&&(t("bodyBounce",n,e,{speed:Math.abs(_)}),e.mode==="dynamic"&&t("bodyBounce",e,n,{speed:Math.abs(_)}))}}}}function Eg(n,e,t,i){var r,a;if(!(n.mode!=="dynamic"||n.captured))try{for(var s=ts(e),o=s.next();!o.done;o=s.next()){var u=o.value,l=u.x-n.x,d=u.y-n.y,f=Ba(l,d);if(!(f>=u.radius*2.5)){if(f>u.radius&&f>.001&&u.pullStrength>0){var h=u.pullStrength*(1-f/(u.radius*2.5));n.vx+=l/f*h*t,n.vy+=d/f*h*t}if(f<u.radius&&Ba(n.vx,n.vy)<=u.maxCaptureSpeed){n.captured=!0,n.atRest=!0,n.vx=u.stopBody?0:n.vx,n.vy=u.stopBody?0:n.vy,u.stopBody&&(n.x=u.x,n.y=u.y),i("zoneCapture",n,u,{});return}}}}catch(v){r={error:v}}finally{try{o&&!o.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}}function Ag(n,e){var t,i,r,a,s,o,u=function(h){if(h.broken)return"continue";var v=e.find(function(B){return B.id===h.bodyId}),y=e.find(function(B){return B.id===h.anchorId});if(!v||v.mode!=="dynamic")return"continue";var T=(a=(r=y?.x)!==null&&r!==void 0?r:h.x)!==null&&a!==void 0?a:0,g=(o=(s=y?.y)!==null&&s!==void 0?s:h.y)!==null&&o!==void 0?o:0,m=v.x-T,L=v.y-g,F=Ba(m,L);if(F<=h.lengthPx||F<1e-4)return"continue";var _=m/F,p=L/F;v.x=T+_*h.lengthPx,v.y=g+p*h.lengthPx;var S=v.vx*_+v.vy*p;S>0&&(v.vx-=_*S,v.vy-=p*S)};try{for(var l=ts(n),d=l.next();!d.done;d=l.next()){var f=d.value;u(f)}}catch(h){t={error:h}}finally{try{d&&!d.done&&(i=l.return)&&i.call(l)}finally{if(t)throw t.error}}}function ff(n){for(var e,t,i,r,a,s,o,u,l,d,f,h=n.bodies,v=n.zones,y=v===void 0?[]:v,T=n.joints,g=T===void 0?[]:T,m=n.bounds,L=n.dt,F=n.onEvent,_=F===void 0?function(){}:F,p=h.filter(function(ae){return ae.mode==="dynamic"&&!ae.captured}),S=p.reduce(function(ae,de){return Math.max(ae,Ba(de.vx,de.vy))},0),B=p.reduce(function(ae,de){return Math.min(ae,As(de))},24),b=Math.min(16,Math.max(1,Math.ceil(S*L/(B*.45)))),I=L/b,z=0;z<b;z++){try{for(var U=(e=void 0,ts(p)),Y=U.next();!Y.done;Y=U.next()){var E=Y.value;E.vy+=((o=E.gravity)!==null&&o!==void 0?o:0)*I;var M=Ba(E.vx,E.vy);if(M>E.maxSpeed){var O=E.maxSpeed/M;E.vx*=O,E.vy*=O,M=E.maxSpeed}E.x+=E.vx*I,E.y+=E.vy*I;var H=Math.max(0,M-((u=E.friction)!==null&&u!==void 0?u:0)*I),ee=Math.exp(-((l=E.linearDamping)!==null&&l!==void 0?l:0)*I);if(M>1e-4){var j=H/M*ee;E.vx*=j,E.vy*=j}E.spinToRotation&&(E.angle=((d=E.angle)!==null&&d!==void 0?d:0)+Ba(E.vx,E.vy)*I/As(E)*(E.vx<0?-1:1))}}catch(ae){e={error:ae}}finally{try{Y&&!Y.done&&(t=U.return)&&t.call(U)}finally{if(e)throw e.error}}for(var K=0;K<p.length;K++){var E=p[K];try{for(var re=(i=void 0,ts(h)),J=re.next();!J.done;J=re.next()){var ne=J.value;ne.id!==E.id&&ne.mode!=="dynamic"&&jp(E,ne,_)}}catch(de){i={error:de}}finally{try{J&&!J.done&&(r=re.return)&&r.call(re)}finally{if(i)throw i.error}}for(var ne=K+1;ne<p.length;ne++)jp(p[ne],E,_);var Te=E.shape==="box"?E.width/2:As(E),fe=E.shape==="box"?E.height/2:As(E);E.wallBounce?(E.x-Te<m.left&&(E.x=m.left+Te,E.vx<0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.x+Te>m.right&&(E.x=m.right-Te,E.vx>0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.y-fe<m.top&&(E.y=m.top+fe,E.vy<0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution)),E.y+fe>m.bottom&&(E.y=m.bottom-fe,E.vy>0&&(_("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution))):!E.exited&&(E.x+Te<m.left||E.x-Te>m.right||E.y+fe<m.top||E.y-fe>m.bottom)&&(E.exited=!0,_("boundaryExit",E,null,{})),Eg(E,y,I,_)}Ag(g,h)}try{for(var pe=ts(p),Fe=pe.next();!Fe.done;Fe=pe.next()){var E=Fe.value,M=Ba(E.vx,E.vy);M<E.restSpeed&&!E.captured?(E.restElapsed=((f=E.restElapsed)!==null&&f!==void 0?f:0)+L,E.restElapsed>=E.restDelaySeconds&&!E.atRest&&(E.atRest=!0,E.vx=0,E.vy=0,_("bodyRest",E,null,{}))):M>=E.restSpeed&&(E.restElapsed=0,E.atRest=!1)}}catch(ae){a={error:ae}}finally{try{Fe&&!Fe.done&&(s=pe.return)&&s.call(pe)}finally{if(a)throw a.error}}}function tm(n){for(var e=n.body,t=n.bodies,i=n.zones,r=i===void 0?[]:i,a=n.bounds,s=n.dots,o=s===void 0?8:s,u=n.bounces,l=u===void 0?1:u,d=function(F){return jo({},F)},f=d(e),h=t.filter(function(F){return F.id!==e.id}).map(d),v=wg([f],em(h),!1),y=[],T=0,g=!1,m=function(F,_,p,S){F==="bodyBounce"&&S.sourceId===e.id&&T++,F==="zoneCapture"&&S.sourceId===e.id&&(g=!0)},L=0;L<90&&y.length<o&&!g&&T<=l;L++)ff({bodies:v,zones:r,bounds:a,dt:1/60,onEvent:function(F,_,p,S){return m(F,_,p,jo(jo({},S),{sourceId:_.id}))}}),L%Math.max(1,Math.floor(90/o))===0&&y.push({x:f.x,y:f.y});return y}var Zs=function(){return Zs=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Zs.apply(this,arguments)},el=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},im=.008333333333333333;function Js(n,e,t){var i,r,a,s=(i=n.boundsX)!==null&&i!==void 0?i:3,o=(r=n.boundsZ)!==null&&r!==void 0?r:7;if(Math.abs(e)>s||Math.abs(t)>o)return null;if(!n.ramp)return 0;var u=(a=n.rampHeight)!==null&&a!==void 0?a:1.1;return t>=1?0:t<=-1?u:(1-t)*(u*.5)}function nm(n,e,t,i){var r,a,s,o=n.radius,u=Math.cos(e.angle),l=Math.sin(e.angle),d=n.x-e.x,f=n.z-e.z,h=u*d+l*f,v=-l*d+u*f,y=Math.max(-e.hx,Math.min(e.hx,h)),T=Math.max(-e.hz,Math.min(e.hz,v)),g=h-y,m=v-T,L=Math.hypot(g,m),F=Js(n,n.x,n.z);if(!(L>=o||F!==null&&n.y>F+.55)){L<1e-8?e.hx-Math.abs(h)<e.hz-Math.abs(v)?(g=h<0?-1:1,m=0,L=0):(g=0,m=v<0?-1:1,L=0):(g/=L,m/=L);var _=u*g-l*m,p=l*g+u*m;n.x+=_*(o-L+1e-5),n.z+=p*(o-L+1e-5);var S=(r=e.vx)!==null&&r!==void 0?r:0,B=(a=e.vz)!==null&&a!==void 0?a:0,b=(n.vx-S)*_+(n.vz-B)*p;if(b<0){var I=1+((s=n.restitution)!==null&&s!==void 0?s:.72);n.vx-=I*b*_,n.vz-=I*b*p,Math.abs(b)>.3&&t>0&&i&&i("bodyBounce",n,e.sourceId?e:void 0)}}}function rm(n,e){n.vx=0,n.vy=0,n.vz=0,n.airborne=!1,n.atRest=!0,n.restElapsed=0,n.movingTime=0,e&&e("bodyRest",n)}function hf(n,e){n.x=n.lastSafe.x,n.y=n.lastSafe.y,n.z=n.lastSafe.z,rm(n,e)}function pf(n){var e,t,i,r,a,s,o,u,l,d,f,h,v,y,T,g,m,L,F=n.bodies,_=n.walls,p=n.zones,S=n.dt,B=n.onEvent;if(!(!Number.isFinite(S)||S<=0))for(var b=Math.max(1,Math.round(S/im)),I=S/b,z=0;z<b;z++)try{for(var U=(e=void 0,el(F)),Y=U.next();!Y.done;Y=U.next()){var E=Y.value;if(!(E.mode!=="dynamic"||E.captured)&&!E.atRest){var M=(l=E.boundsX)!==null&&l!==void 0?l:3,O=(d=E.boundsZ)!==null&&d!==void 0?d:7;if(E.y<-3||Math.abs(E.x)>M+2||Math.abs(E.z)>O+2){hf(E,B);continue}E.movingTime=((f=E.movingTime)!==null&&f!==void 0?f:0)+I;var H=E.radius,ee=Math.hypot(E.vx,E.vy,E.vz),j=Math.max(1,Math.min(16,Math.ceil(ee*I/(H*.45)))),K=I/j;(!E._perimeter||E._pbx!==M||E._pbz!==O)&&(E._pbx=M,E._pbz=O,E._perimeter=[{x:-(M+.1),z:0,hx:.1,hz:O+.1,angle:0,vx:0,vz:0},{x:M+.1,z:0,hx:.1,hz:O+.1,angle:0,vx:0,vz:0},{x:0,z:-(O+.1),hx:M+.1,hz:.1,angle:0,vx:0,vz:0},{x:0,z:O+.1,hx:M+.1,hz:.1,angle:0,vx:0,vz:0}]);for(var re=E._perimeter,J=!1,ne=0;ne<j;ne++){var Te=Js(E,E.x,E.z),fe=Te!==null&&E.y<=Te+H+.012&&E.vy<=.1,pe=Te;if(fe){E.y=Te+H,E.vy=0;var Fe=Math.hypot(E.vx,E.vz),ae=Math.max(0,Fe-((h=E.friction)!==null&&h!==void 0?h:1.05)*K);if(Fe>0&&(E.vx*=ae/Fe,E.vz*=ae/Fe),E.ramp&&E.z<1&&E.z>-1){var de=((v=E.rampHeight)!==null&&v!==void 0?v:1.1)*.5;E.vz+=9.81*de/(1+de*de)*K}}else E.vy-=9.81*K,E.airborne||(E.airborne=!0,B&&B("bodyJump",E));E.x+=E.vx*K,E.z+=E.vz*K,E.y+=E.vy*K;var _e=Js(E,E.x,E.z);if(_e!==null){if(fe&&pe!==null){var de=((y=E.rampHeight)!==null&&y!==void 0?y:1.1)*.5;E.ramp&&E.z<=-1&&E.z-E.vz*K>-1.5&&E.vz<-.8?(E.vy=-E.vz*de,E.airborne=!0,B&&B("bodyJump",E)):E.y=_e+H}E.y<_e+H&&(E.y=_e+H,E.vy=0,E.airborne=!1)}if(E.y<2){try{for(var Ge=(i=void 0,el(_)),$e=Ge.next();!$e.done;$e=Ge.next()){var ut=$e.value;nm(E,ut,K,B)}}catch(rt){i={error:rt}}finally{try{$e&&!$e.done&&(r=Ge.return)&&r.call(Ge)}finally{if(i)throw i.error}}try{for(var zt=(a=void 0,el(re)),ct=zt.next();!ct.done;ct=zt.next()){var ut=ct.value;nm(E,ut,K,B)}}catch(rt){a={error:rt}}finally{try{ct&&!ct.done&&(s=zt.return)&&s.call(zt)}finally{if(a)throw a.error}}}E.spin=((T=E.spin)!==null&&T!==void 0?T:0)+Math.hypot(E.vx,E.vz)*K/H;var Tt=Math.hypot(E.vx,E.vz);try{for(var Zt=(o=void 0,el(p)),wt=Zt.next();!wt.done;wt=Zt.next()){var bt=wt.value,_t=Math.hypot(E.x-bt.x,E.z-bt.z);if(_t<bt.radius&&Math.abs(E.y-(bt.y+H))<bt.heightTolerance&&Tt<bt.maxCaptureSpeed){E.captured=!0,E.captureElapsed=0,E.captureTarget={x:bt.x,y:bt.y,z:bt.z},E.vx=0,E.vy=0,E.vz=0,E.atRest=!0,B&&B("zoneCapture",E,bt),J=!0;break}}}catch(rt){o={error:rt}}finally{try{wt&&!wt.done&&(u=Zt.return)&&u.call(Zt)}finally{if(o)throw o.error}}if(J)break;if(E.y<-3||Math.abs(E.x)>M+2||Math.abs(E.z)>O+2){hf(E,B),J=!0;break}}if(!J){var ln=Math.hypot(E.vx,E.vy,E.vz);ln<((g=E.restSpeed)!==null&&g!==void 0?g:.07)?(E.restElapsed=((m=E.restElapsed)!==null&&m!==void 0?m:0)+I,E.restElapsed>((L=E.restDelaySeconds)!==null&&L!==void 0?L:.25)&&rm(E,B)):E.restElapsed=0,E.movingTime>18&&hf(E,B)}}}}catch(rt){e={error:rt}}finally{try{Y&&!Y.done&&(t=U.return)&&t.call(U)}finally{if(e)throw e.error}}}function am(n){var e,t=n.body,i=n.walls,r=n.zones,a=n.vx,s=n.vz,o=n.dots,u=o===void 0?15:o,l=Math.hypot(a,s);if(!Number.isFinite(l)||l<.35)return[];for(var d=Math.min(1,((e=t.maxSpeed)!==null&&e!==void 0?e:9)/l),f=Zs(Zs({},t),{vx:a*d,vy:0,vz:s*d,atRest:!1,captured:!1,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:t.x,y:t.y,z:t.z}}),h=i.map(function(L){return Zs(Zs({},L),{vx:0,vz:0})}),v=[f],y={bodies:v,walls:h,zones:r,dt:im},T=[],g=Math.max(18,u*6),m=0;m<g&&(pf(y),m%6===0&&T.push({x:f.x,y:f.y,z:f.z}),!(f.atRest||f.captured));m++);return T}function mf(n,e,t,i,r,a){var s,o,u,l;i===void 0&&(i=[]),r===void 0&&(r=12),a===void 0&&(a=12);for(var d=n,f=e,h=Math.max(.05,t??.45),v=0;v<2;v++){try{for(var y=(s=void 0,el(i)),T=y.next();!T.done;T=y.next()){var g=T.value,m=Math.cos((u=g.angle)!==null&&u!==void 0?u:0),L=Math.sin((l=g.angle)!==null&&l!==void 0?l:0),F=d-g.x,_=f-g.z,p=m*F+L*_,S=-L*F+m*_,B=Math.max(-g.hx,Math.min(g.hx,p)),b=Math.max(-g.hz,Math.min(g.hz,S)),I=p-B,z=S-b,U=Math.hypot(I,z);if(!(U>=h)){U<1e-8?g.hx-Math.abs(p)<g.hz-Math.abs(S)?(I=p<0?-1:1,z=0):(I=0,z=S<0?-1:1):(I/=U,z/=U);var Y=m*I-L*z,E=L*I+m*z;d+=Y*(h-U+1e-4),f+=E*(h-U+1e-4)}}}catch(H){s={error:H}}finally{try{T&&!T.done&&(o=y.return)&&o.call(y)}finally{if(s)throw s.error}}var M=Math.max(0,(r??12)-h),O=Math.max(0,(a??12)-h);d=Math.max(-M,Math.min(M,d)),f=Math.max(-O,Math.min(O,f))}return{x:d,z:f}}var Bm=0,jf=1,km=2;var kl=1,Du=2,Eo=3,ms=0,pr=1,Ir=2,Aa=0,Ao=1,eh=2,th=3,nh=4,zm=5;var Fs=100,Vm=101,Gm=102,Hm=103,Wm=104,Xm=200,Ym=201,qm=202,Zm=203,ih=204,rh=205,Jm=206,$m=207,Km=208,Qm=209,jm=210,e0=211,t0=212,n0=213,i0=214,Jc=0,$c=1,Kc=2,ho=3,Qc=4,jc=5,eu=6,tu=7,Nu=0,r0=1,a0=2,aa=0,ah=1,sh=2,oh=3,lh=4,ch=5,uh=6,dh=7;var fh=300,vs=301,Os=302,Uu=303,Fu=304,zl=306,nu=1e3,_a=1001,iu=1002,Bi=1003,s0=1004;var Vl=1005;var Hi=1006,Ou=1007;var gs=1008;var Cr=1009,hh=1010,ph=1011,Io=1012,Bu=1013,sa=1014,Yr=1015,oa=1016,ku=1017,zu=1018,Co=1020,mh=35902,vh=35899,gh=1021,yh=1022,qr=1023,Ma=1026,ys=1027,Vu=1028,Gu=1029,xs=1030,Hu=1031;var Wu=1033,Gl=33776,Hl=33777,Wl=33778,Xl=33779,Xu=35840,Yu=35841,qu=35842,Zu=35843,Ju=36196,$u=37492,Ku=37496,Qu=37488,ju=37489,Yl=37490,ed=37491,td=37808,nd=37809,id=37810,rd=37811,ad=37812,sd=37813,od=37814,ld=37815,cd=37816,ud=37817,dd=37818,fd=37819,hd=37820,pd=37821,md=36492,vd=36494,gd=36495,yd=36283,xd=36284,ql=36285,_d=36286;var dl=2300,ru=2301,qc=2302,Gf=2303,Hf=2400,Wf=2401,Xf=2402;var o0=3200;var Md=0,l0=1,Ya="",hr="srgb",fl="srgb-linear",hl="linear",Jn="srgb";var Zc=7680;var c0=519,u0=512,d0=513,f0=514,Sd=515,h0=516,p0=517,bd=518,m0=519,v0=35044;var xh="300 es",ra=2e3,po=2001;function Ig(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Cg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function pl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function g0(){let n=pl("canvas");return n.style.display="block",n}var sm={},mo=null;function _h(...n){let e="THREE."+n.shift();mo?mo("log",e,...n):console.log(e,...n)}function y0(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function rn(...n){n=y0(n);let e="THREE."+n.shift();if(mo)mo("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function sn(...n){n=y0(n);let e="THREE."+n.shift();if(mo)mo("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ls(...n){let e=n.join(" ");e in sm||(sm[e]=!0,rn(...n))}function x0(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}var _0={[Jc]:$c,[Kc]:eu,[Qc]:tu,[ho]:jc,[$c]:Jc,[eu]:Kc,[tu]:Qc,[jc]:ho},Sa=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}},Qi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var vf=Math.PI/180,au=180/Math.PI;function Ro(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qi[n&255]+Qi[n>>8&255]+Qi[n>>16&255]+Qi[n>>24&255]+"-"+Qi[e&255]+Qi[e>>8&255]+"-"+Qi[e>>16&15|64]+Qi[e>>24&255]+"-"+Qi[t&63|128]+Qi[t>>8&255]+"-"+Qi[t>>16&255]+Qi[t>>24&255]+Qi[i&255]+Qi[i>>8&255]+Qi[i>>16&255]+Qi[i>>24&255]).toLowerCase()}function Tn(n,e,t){return Math.max(e,Math.min(t,n))}function Rg(n,e){return(n%e+e)%e}function gf(n,e,t){return(1-t)*n+t*e}function tl(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Tr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Eh=class Eh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Tn(this.x,e.x,t.x),this.y=Tn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Tn(this.x,e,t),this.y=Tn(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Tn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Tn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Eh.prototype.isVector2=!0;var kt=Eh,ba=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let u=i[r+0],l=i[r+1],d=i[r+2],f=i[r+3],h=a[s+0],v=a[s+1],y=a[s+2],T=a[s+3];if(f!==T||u!==h||l!==v||d!==y){let g=u*h+l*v+d*y+f*T;g<0&&(h=-h,v=-v,y=-y,T=-T,g=-g);let m=1-o;if(g<.9995){let L=Math.acos(g),F=Math.sin(L);m=Math.sin(m*L)/F,o=Math.sin(o*L)/F,u=u*m+h*o,l=l*m+v*o,d=d*m+y*o,f=f*m+T*o}else{u=u*m+h*o,l=l*m+v*o,d=d*m+y*o,f=f*m+T*o;let L=1/Math.sqrt(u*u+l*l+d*d+f*f);u*=L,l*=L,d*=L,f*=L}}e[t]=u,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,s){let o=i[r],u=i[r+1],l=i[r+2],d=i[r+3],f=a[s],h=a[s+1],v=a[s+2],y=a[s+3];return e[t]=o*y+d*f+u*v-l*h,e[t+1]=u*y+d*h+l*f-o*v,e[t+2]=l*y+d*v+o*h-u*f,e[t+3]=d*y-o*f-u*h-l*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,u=Math.sin,l=o(i/2),d=o(r/2),f=o(a/2),h=u(i/2),v=u(r/2),y=u(a/2);switch(s){case"XYZ":this._x=h*d*f+l*v*y,this._y=l*v*f-h*d*y,this._z=l*d*y+h*v*f,this._w=l*d*f-h*v*y;break;case"YXZ":this._x=h*d*f+l*v*y,this._y=l*v*f-h*d*y,this._z=l*d*y-h*v*f,this._w=l*d*f+h*v*y;break;case"ZXY":this._x=h*d*f-l*v*y,this._y=l*v*f+h*d*y,this._z=l*d*y+h*v*f,this._w=l*d*f-h*v*y;break;case"ZYX":this._x=h*d*f-l*v*y,this._y=l*v*f+h*d*y,this._z=l*d*y-h*v*f,this._w=l*d*f+h*v*y;break;case"YZX":this._x=h*d*f+l*v*y,this._y=l*v*f+h*d*y,this._z=l*d*y-h*v*f,this._w=l*d*f-h*v*y;break;case"XZY":this._x=h*d*f-l*v*y,this._y=l*v*f-h*d*y,this._z=l*d*y+h*v*f,this._w=l*d*f+h*v*y;break;default:rn("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],u=t[9],l=t[2],d=t[6],f=t[10],h=i+o+f;if(h>0){let v=.5/Math.sqrt(h+1);this._w=.25/v,this._x=(d-u)*v,this._y=(a-l)*v,this._z=(s-r)*v}else if(i>o&&i>f){let v=2*Math.sqrt(1+i-o-f);this._w=(d-u)/v,this._x=.25*v,this._y=(r+s)/v,this._z=(a+l)/v}else if(o>f){let v=2*Math.sqrt(1+o-i-f);this._w=(a-l)/v,this._x=(r+s)/v,this._y=.25*v,this._z=(u+d)/v}else{let v=2*Math.sqrt(1+f-i-o);this._w=(s-r)/v,this._x=(a+l)/v,this._y=(u+d)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tn(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,u=t._y,l=t._z,d=t._w;return this._x=i*d+s*o+r*l-a*u,this._y=r*d+s*u+a*o-i*l,this._z=a*d+s*l+i*u-r*o,this._w=s*d-i*o-r*u-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let u=1-t;if(o<.9995){let l=Math.acos(o),d=Math.sin(l);u=Math.sin(u*l)/d,t=Math.sin(t*l)/d,this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ah=class Ah{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(om.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(om.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,u=e.w,l=2*(s*r-o*i),d=2*(o*t-a*r),f=2*(a*i-s*t);return this.x=t+u*l+s*f-o*d,this.y=i+u*d+o*l-a*f,this.z=r+u*f+a*d-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Tn(this.x,e.x,t.x),this.y=Tn(this.y,e.y,t.y),this.z=Tn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Tn(this.x,e,t),this.y=Tn(this.y,e,t),this.z=Tn(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Tn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,u=t.z;return this.x=r*u-a*o,this.y=a*s-i*u,this.z=i*o-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yf.copy(this).projectOnVector(e),this.sub(yf)}reflect(e){return this.sub(yf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Tn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ah.prototype.isVector3=!0;var ge=Ah,yf=new ge,om=new ba,Ih=class Ih{constructor(e,t,i,r,a,s,o,u,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,l)}set(e,t,i,r,a,s,o,u,l){let d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=a,d[5]=u,d[6]=i,d[7]=s,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],u=i[6],l=i[1],d=i[4],f=i[7],h=i[2],v=i[5],y=i[8],T=r[0],g=r[3],m=r[6],L=r[1],F=r[4],_=r[7],p=r[2],S=r[5],B=r[8];return a[0]=s*T+o*L+u*p,a[3]=s*g+o*F+u*S,a[6]=s*m+o*_+u*B,a[1]=l*T+d*L+f*p,a[4]=l*g+d*F+f*S,a[7]=l*m+d*_+f*B,a[2]=h*T+v*L+y*p,a[5]=h*g+v*F+y*S,a[8]=h*m+v*_+y*B,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8];return t*s*d-t*o*l-i*a*d+i*o*u+r*a*l-r*s*u}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8],f=d*s-o*l,h=o*u-d*a,v=l*a-s*u,y=t*f+i*h+r*v;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/y;return e[0]=f*T,e[1]=(r*l-d*i)*T,e[2]=(o*i-r*s)*T,e[3]=h*T,e[4]=(d*t-r*u)*T,e[5]=(r*a-o*t)*T,e[6]=v*T,e[7]=(i*u-l*t)*T,e[8]=(s*t-i*a)*T,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){let u=Math.cos(a),l=Math.sin(a);return this.set(i*u,i*l,-i*(u*s+l*o)+s+e,-r*l,r*u,-r*(-l*s+u*o)+o+t,0,0,1),this}scale(e,t){return Ls("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xf.makeScale(e,t)),this}rotate(e){return Ls("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xf.makeRotation(-e)),this}translate(e,t){return Ls("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ih.prototype.isMatrix3=!0;var un=Ih,xf=new un,lm=new un().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cm=new un().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pg(){let n={enabled:!0,workingColorSpace:fl,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===Jn&&(r.r=Wa(r.r),r.g=Wa(r.g),r.b=Wa(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Jn&&(r.r=uo(r.r),r.g=uo(r.g),r.b=uo(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ya?hl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fl]:{primaries:e,whitePoint:i,transfer:hl,toXYZ:lm,fromXYZ:cm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hr},outputColorSpaceConfig:{drawingBufferColorSpace:hr}},[hr]:{primaries:e,whitePoint:i,transfer:Jn,toXYZ:lm,fromXYZ:cm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hr}}}),n}var Ln=Pg();function Wa(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function uo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var $s,su=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{$s===void 0&&($s=pl("canvas")),$s.width=e.width,$s.height=e.height;let r=$s.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=$s}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pl("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Wa(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wa(t[i]/255)*255):t[i]=Wa(t[i]);return{data:t,width:e.width,height:e.height}}else return rn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Lg=0,vo=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=Ro(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(_f(r[s].image)):a.push(_f(r[s]))}else a=_f(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function _f(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?su.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(rn("Texture: Unable to serialize Texture."),{})}var Dg=0,Mf=new ge,tr=class n extends Sa{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=_a,r=_a,a=Hi,s=gs,o=qr,u=Cr,l=n.DEFAULT_ANISOTROPY,d=Ya){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=Ro(),this.name="",this.source=new vo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=u,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new un,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mf).x}get height(){return this.source.getSize(Mf).y}get depth(){return this.source.getSize(Mf).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){rn(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){rn(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nu:e.x=e.x-Math.floor(e.x);break;case _a:e.x=e.x<0?0:1;break;case iu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nu:e.y=e.y-Math.floor(e.y);break;case _a:e.y=e.y<0?0:1;break;case iu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};tr.DEFAULT_IMAGE=null;tr.DEFAULT_MAPPING=fh;tr.DEFAULT_ANISOTROPY=1;var Ch=class Ch{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a,u=e.elements,l=u[0],d=u[4],f=u[8],h=u[1],v=u[5],y=u[9],T=u[2],g=u[6],m=u[10];if(Math.abs(d-h)<.01&&Math.abs(f-T)<.01&&Math.abs(y-g)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+T)<.1&&Math.abs(y+g)<.1&&Math.abs(l+v+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let F=(l+1)/2,_=(v+1)/2,p=(m+1)/2,S=(d+h)/4,B=(f+T)/4,b=(y+g)/4;return F>_&&F>p?F<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(F),r=S/i,a=B/i):_>p?_<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(_),i=S/r,a=b/r):p<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(p),i=B/a,r=b/a),this.set(i,r,a,t),this}let L=Math.sqrt((g-y)*(g-y)+(f-T)*(f-T)+(h-d)*(h-d));return Math.abs(L)<.001&&(L=1),this.x=(g-y)/L,this.y=(f-T)/L,this.z=(h-d)/L,this.w=Math.acos((l+v+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Tn(this.x,e.x,t.x),this.y=Tn(this.y,e.y,t.y),this.z=Tn(this.z,e.z,t.z),this.w=Tn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Tn(this.x,e,t),this.y=Tn(this.y,e,t),this.z=Tn(this.z,e,t),this.w=Tn(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Tn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ch.prototype.isVector4=!0;var fi=Ch,ou=class extends Sa{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new fi(0,0,e,t),this.scissorTest=!1,this.viewport=new fi(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new tr(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Hi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new vo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ar=class extends ou{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ml=class extends tr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=_a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var lu=class extends tr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=_a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Lu=class Lu{constructor(e,t,i,r,a,s,o,u,l,d,f,h,v,y,T,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,l,d,f,h,v,y,T,g)}set(e,t,i,r,a,s,o,u,l,d,f,h,v,y,T,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=a,m[5]=s,m[9]=o,m[13]=u,m[2]=l,m[6]=d,m[10]=f,m[14]=h,m[3]=v,m[7]=y,m[11]=T,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Lu().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Ks.setFromMatrixColumn(e,0).length(),a=1/Ks.setFromMatrixColumn(e,1).length(),s=1/Ks.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),u=Math.cos(r),l=Math.sin(r),d=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){let h=s*d,v=s*f,y=o*d,T=o*f;t[0]=u*d,t[4]=-u*f,t[8]=l,t[1]=v+y*l,t[5]=h-T*l,t[9]=-o*u,t[2]=T-h*l,t[6]=y+v*l,t[10]=s*u}else if(e.order==="YXZ"){let h=u*d,v=u*f,y=l*d,T=l*f;t[0]=h+T*o,t[4]=y*o-v,t[8]=s*l,t[1]=s*f,t[5]=s*d,t[9]=-o,t[2]=v*o-y,t[6]=T+h*o,t[10]=s*u}else if(e.order==="ZXY"){let h=u*d,v=u*f,y=l*d,T=l*f;t[0]=h-T*o,t[4]=-s*f,t[8]=y+v*o,t[1]=v+y*o,t[5]=s*d,t[9]=T-h*o,t[2]=-s*l,t[6]=o,t[10]=s*u}else if(e.order==="ZYX"){let h=s*d,v=s*f,y=o*d,T=o*f;t[0]=u*d,t[4]=y*l-v,t[8]=h*l+T,t[1]=u*f,t[5]=T*l+h,t[9]=v*l-y,t[2]=-l,t[6]=o*u,t[10]=s*u}else if(e.order==="YZX"){let h=s*u,v=s*l,y=o*u,T=o*l;t[0]=u*d,t[4]=T-h*f,t[8]=y*f+v,t[1]=f,t[5]=s*d,t[9]=-o*d,t[2]=-l*d,t[6]=v*f+y,t[10]=h-T*f}else if(e.order==="XZY"){let h=s*u,v=s*l,y=o*u,T=o*l;t[0]=u*d,t[4]=-f,t[8]=l*d,t[1]=h*f+T,t[5]=s*d,t[9]=v*f-y,t[2]=y*f-v,t[6]=o*d,t[10]=T*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ng,e,Ug)}lookAt(e,t,i){let r=this.elements;return Dr.subVectors(e,t),Dr.lengthSq()===0&&(Dr.z=1),Dr.normalize(),ns.crossVectors(i,Dr),ns.lengthSq()===0&&(Math.abs(i.z)===1?Dr.x+=1e-4:Dr.z+=1e-4,Dr.normalize(),ns.crossVectors(i,Dr)),ns.normalize(),Tc.crossVectors(Dr,ns),r[0]=ns.x,r[4]=Tc.x,r[8]=Dr.x,r[1]=ns.y,r[5]=Tc.y,r[9]=Dr.y,r[2]=ns.z,r[6]=Tc.z,r[10]=Dr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],u=i[8],l=i[12],d=i[1],f=i[5],h=i[9],v=i[13],y=i[2],T=i[6],g=i[10],m=i[14],L=i[3],F=i[7],_=i[11],p=i[15],S=r[0],B=r[4],b=r[8],I=r[12],z=r[1],U=r[5],Y=r[9],E=r[13],M=r[2],O=r[6],H=r[10],ee=r[14],j=r[3],K=r[7],re=r[11],J=r[15];return a[0]=s*S+o*z+u*M+l*j,a[4]=s*B+o*U+u*O+l*K,a[8]=s*b+o*Y+u*H+l*re,a[12]=s*I+o*E+u*ee+l*J,a[1]=d*S+f*z+h*M+v*j,a[5]=d*B+f*U+h*O+v*K,a[9]=d*b+f*Y+h*H+v*re,a[13]=d*I+f*E+h*ee+v*J,a[2]=y*S+T*z+g*M+m*j,a[6]=y*B+T*U+g*O+m*K,a[10]=y*b+T*Y+g*H+m*re,a[14]=y*I+T*E+g*ee+m*J,a[3]=L*S+F*z+_*M+p*j,a[7]=L*B+F*U+_*O+p*K,a[11]=L*b+F*Y+_*H+p*re,a[15]=L*I+F*E+_*ee+p*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],u=e[9],l=e[13],d=e[2],f=e[6],h=e[10],v=e[14],y=e[3],T=e[7],g=e[11],m=e[15],L=u*v-l*h,F=o*v-l*f,_=o*h-u*f,p=s*v-l*d,S=s*h-u*d,B=s*f-o*d;return t*(T*L-g*F+m*_)-i*(y*L-g*p+m*S)+r*(y*F-T*p+m*B)-a*(y*_-T*S+g*B)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],u=e[2],l=e[6],d=e[10];return t*(s*d-o*l)-i*(a*d-o*u)+r*(a*l-s*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],l=e[7],d=e[8],f=e[9],h=e[10],v=e[11],y=e[12],T=e[13],g=e[14],m=e[15],L=t*o-i*s,F=t*u-r*s,_=t*l-a*s,p=i*u-r*o,S=i*l-a*o,B=r*l-a*u,b=d*T-f*y,I=d*g-h*y,z=d*m-v*y,U=f*g-h*T,Y=f*m-v*T,E=h*m-v*g,M=L*E-F*Y+_*U+p*z-S*I+B*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/M;return e[0]=(o*E-u*Y+l*U)*O,e[1]=(r*Y-i*E-a*U)*O,e[2]=(T*B-g*S+m*p)*O,e[3]=(h*S-f*B-v*p)*O,e[4]=(u*z-s*E-l*I)*O,e[5]=(t*E-r*z+a*I)*O,e[6]=(g*_-y*B-m*F)*O,e[7]=(d*B-h*_+v*F)*O,e[8]=(s*Y-o*z+l*b)*O,e[9]=(i*z-t*Y-a*b)*O,e[10]=(y*S-T*_+m*L)*O,e[11]=(f*_-d*S-v*L)*O,e[12]=(o*I-s*U-u*b)*O,e[13]=(t*U-i*I+r*b)*O,e[14]=(T*F-y*p-g*L)*O,e[15]=(d*p-f*F+h*L)*O,this}scale(e){let t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,u=e.z,l=a*s,d=a*o;return this.set(l*s+i,l*o-r*u,l*u+r*o,0,l*o+r*u,d*o+i,d*u-r*s,0,l*u-r*o,d*u+r*s,a*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,a=t._x,s=t._y,o=t._z,u=t._w,l=a+a,d=s+s,f=o+o,h=a*l,v=a*d,y=a*f,T=s*d,g=s*f,m=o*f,L=u*l,F=u*d,_=u*f,p=i.x,S=i.y,B=i.z;return r[0]=(1-(T+m))*p,r[1]=(v+_)*p,r[2]=(y-F)*p,r[3]=0,r[4]=(v-_)*S,r[5]=(1-(h+m))*S,r[6]=(g+L)*S,r[7]=0,r[8]=(y+F)*B,r[9]=(g-L)*B,r[10]=(1-(h+T))*B,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=Ks.set(r[0],r[1],r[2]).length(),o=Ks.set(r[4],r[5],r[6]).length(),u=Ks.set(r[8],r[9],r[10]).length();a<0&&(s=-s),ta.copy(this);let l=1/s,d=1/o,f=1/u;return ta.elements[0]*=l,ta.elements[1]*=l,ta.elements[2]*=l,ta.elements[4]*=d,ta.elements[5]*=d,ta.elements[6]*=d,ta.elements[8]*=f,ta.elements[9]*=f,ta.elements[10]*=f,t.setFromRotationMatrix(ta),i.x=s,i.y=o,i.z=u,this}makePerspective(e,t,i,r,a,s,o=ra,u=!1){let l=this.elements,d=2*a/(t-e),f=2*a/(i-r),h=(t+e)/(t-e),v=(i+r)/(i-r),y,T;if(u)y=a/(s-a),T=s*a/(s-a);else if(o===ra)y=-(s+a)/(s-a),T=-2*s*a/(s-a);else if(o===po)y=-s/(s-a),T=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=v,l[13]=0,l[2]=0,l[6]=0,l[10]=y,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=ra,u=!1){let l=this.elements,d=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),v=-(i+r)/(i-r),y,T;if(u)y=1/(s-a),T=s/(s-a);else if(o===ra)y=-2/(s-a),T=-(s+a)/(s-a);else if(o===po)y=-1/(s-a),T=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=v,l[2]=0,l[6]=0,l[10]=y,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Lu.prototype.isMatrix4=!0;var $n=Lu,Ks=new ge,ta=new $n,Ng=new ge(0,0,0),Ug=new ge(1,1,1),ns=new ge,Tc=new ge,Dr=new ge,um=new $n,dm=new ba,Xa=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,a=r[0],s=r[4],o=r[8],u=r[1],l=r[5],d=r[9],f=r[2],h=r[6],v=r[10];switch(t){case"XYZ":this._y=Math.asin(Tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,v),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,v),this._z=Math.atan2(u,l)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Tn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,v),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-Tn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,v),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,v));break;case"XZY":this._z=Math.asin(-Tn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,v),this._y=0);break;default:rn("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return um.makeRotationFromQuaternion(e),this.setFromRotationMatrix(um,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dm.setFromEuler(this),this.setFromQuaternion(dm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xa.DEFAULT_ORDER="XYZ";var go=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Fg=0,fm=new ge,Qs=new ba,ka=new $n,Ec=new ge,nl=new ge,Og=new ge,Bg=new ba,hm=new ge(1,0,0),pm=new ge(0,1,0),mm=new ge(0,0,1),vm={type:"added"},kg={type:"removed"},js={type:"childadded",child:null},Sf={type:"childremoved",child:null},nr=class n extends Sa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=Ro(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new ge,t=new Xa,i=new ba,r=new ge(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new $n},normalMatrix:{value:new un}}),this.matrix=new $n,this.matrixWorld=new $n,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.multiply(Qs),this}rotateOnWorldAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.premultiply(Qs),this}rotateX(e){return this.rotateOnAxis(hm,e)}rotateY(e){return this.rotateOnAxis(pm,e)}rotateZ(e){return this.rotateOnAxis(mm,e)}translateOnAxis(e,t){return fm.copy(e).applyQuaternion(this.quaternion),this.position.add(fm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hm,e)}translateY(e){return this.translateOnAxis(pm,e)}translateZ(e){return this.translateOnAxis(mm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ka.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ec.copy(e):Ec.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ka.lookAt(nl,Ec,this.up):ka.lookAt(Ec,nl,this.up),this.quaternion.setFromRotationMatrix(ka),r&&(ka.extractRotation(r.matrixWorld),Qs.setFromRotationMatrix(ka),this.quaternion.premultiply(Qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(sn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vm),js.child=e,this.dispatchEvent(js),js.child=null):sn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kg),Sf.child=e,this.dispatchEvent(Sf),Sf.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ka.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ka.multiply(e.parent.matrixWorld)),e.applyMatrix4(ka),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vm),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,e,Og),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,Bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let u=o.shapes;if(Array.isArray(u))for(let l=0,d=u.length;l<d;l++){let f=u[l];a(e.shapes,f)}else a(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let u=0,l=this.material.length;u<l;u++)o.push(a(e.materials,this.material[u]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let u=this.animations[o];r.animations.push(a(e.animations,u))}}if(t){let o=s(e.geometries),u=s(e.materials),l=s(e.textures),d=s(e.images),f=s(e.shapes),h=s(e.skeletons),v=s(e.animations),y=s(e.nodes);o.length>0&&(i.geometries=o),u.length>0&&(i.materials=u),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),v.length>0&&(i.animations=v),y.length>0&&(i.nodes=y)}return i.object=r,i;function s(o){let u=[];for(let l in o){let d=o[l];delete d.metadata,u.push(d)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};nr.DEFAULT_UP=new ge(0,1,0);nr.DEFAULT_MATRIX_AUTO_UPDATE=!0;nr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Er=class extends nr{constructor(){super(),this.isGroup=!0,this.type="Group"}},zg={type:"move"},yo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ge,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ge),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ge,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ge,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null,o=this._targetRay,u=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let T of e.hand.values()){let g=t.getJointPose(T,i),m=this._getHandJoint(l,T);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=d.position.distanceTo(f.position),v=.02,y=.005;l.inputState.pinching&&h>v+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=v-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zg)))}return o!==null&&(o.visible=r!==null),u!==null&&(u.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Er;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},M0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Ac={h:0,s:0,l:0};function bf(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var vn=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ln.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ln.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ln.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ln.workingColorSpace){if(e=Rg(e,1),t=Tn(t,0,1),i=Tn(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=bf(s,a,e+1/3),this.g=bf(s,a,e),this.b=bf(s,a,e-1/3)}return Ln.colorSpaceToWorking(this,r),this}setStyle(e,t=hr){function i(a){a!==void 0&&parseFloat(a)<1&&rn("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:rn("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);rn("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hr){let i=M0[e.toLowerCase()];return i!==void 0?this.setHex(i,t):rn("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wa(e.r),this.g=Wa(e.g),this.b=Wa(e.b),this}copyLinearToSRGB(e){return this.r=uo(e.r),this.g=uo(e.g),this.b=uo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hr){return Ln.workingToColorSpace(ji.copy(this),e),Math.round(Tn(ji.r*255,0,255))*65536+Math.round(Tn(ji.g*255,0,255))*256+Math.round(Tn(ji.b*255,0,255))}getHexString(e=hr){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ln.workingColorSpace){Ln.workingToColorSpace(ji.copy(this),t);let i=ji.r,r=ji.g,a=ji.b,s=Math.max(i,r,a),o=Math.min(i,r,a),u,l,d=(o+s)/2;if(o===s)u=0,l=0;else{let f=s-o;switch(l=d<=.5?f/(s+o):f/(2-s-o),s){case i:u=(r-a)/f+(r<a?6:0);break;case r:u=(a-i)/f+2;break;case a:u=(i-r)/f+4;break}u/=6}return e.h=u,e.s=l,e.l=d,e}getRGB(e,t=Ln.workingColorSpace){return Ln.workingToColorSpace(ji.copy(this),t),e.r=ji.r,e.g=ji.g,e.b=ji.b,e}getStyle(e=hr){Ln.workingToColorSpace(ji.copy(this),e);let t=ji.r,i=ji.g,r=ji.b;return e!==hr?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(Ac);let i=gf(is.h,Ac.h,t),r=gf(is.s,Ac.s,t),a=gf(is.l,Ac.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ji=new vn;vn.NAMES=M0;var vl=class extends nr{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xa,this.environmentIntensity=1,this.environmentRotation=new Xa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},na=new ge,za=new ge,wf=new ge,Va=new ge,eo=new ge,to=new ge,gm=new ge,Tf=new ge,Ef=new ge,Af=new ge,If=new fi,Cf=new fi,Rf=new fi,os=class n{constructor(e=new ge,t=new ge,i=new ge){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),na.subVectors(e,t),r.cross(na);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){na.subVectors(r,t),za.subVectors(i,t),wf.subVectors(e,t);let s=na.dot(na),o=na.dot(za),u=na.dot(wf),l=za.dot(za),d=za.dot(wf),f=s*l-o*o;if(f===0)return a.set(0,0,0),null;let h=1/f,v=(l*u-o*d)*h,y=(s*d-o*u)*h;return a.set(1-v-y,y,v)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Va)===null?!1:Va.x>=0&&Va.y>=0&&Va.x+Va.y<=1}static getInterpolation(e,t,i,r,a,s,o,u){return this.getBarycoord(e,t,i,r,Va)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,Va.x),u.addScaledVector(s,Va.y),u.addScaledVector(o,Va.z),u)}static getInterpolatedAttribute(e,t,i,r,a,s){return If.setScalar(0),Cf.setScalar(0),Rf.setScalar(0),If.fromBufferAttribute(e,t),Cf.fromBufferAttribute(e,i),Rf.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(If,a.x),s.addScaledVector(Cf,a.y),s.addScaledVector(Rf,a.z),s}static isFrontFacing(e,t,i,r){return na.subVectors(i,t),za.subVectors(e,t),na.cross(za).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return na.subVectors(this.c,this.b),za.subVectors(this.a,this.b),na.cross(za).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,a=this.c,s,o;eo.subVectors(r,i),to.subVectors(a,i),Tf.subVectors(e,i);let u=eo.dot(Tf),l=to.dot(Tf);if(u<=0&&l<=0)return t.copy(i);Ef.subVectors(e,r);let d=eo.dot(Ef),f=to.dot(Ef);if(d>=0&&f<=d)return t.copy(r);let h=u*f-d*l;if(h<=0&&u>=0&&d<=0)return s=u/(u-d),t.copy(i).addScaledVector(eo,s);Af.subVectors(e,a);let v=eo.dot(Af),y=to.dot(Af);if(y>=0&&v<=y)return t.copy(a);let T=v*l-u*y;if(T<=0&&l>=0&&y<=0)return o=l/(l-y),t.copy(i).addScaledVector(to,o);let g=d*y-v*f;if(g<=0&&f-d>=0&&v-y>=0)return gm.subVectors(a,r),o=(f-d)/(f-d+(v-y)),t.copy(r).addScaledVector(gm,o);let m=1/(g+T+h);return s=T*m,o=h*m,t.copy(i).addScaledVector(eo,s).addScaledVector(to,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wa=class{constructor(e=new ge(1/0,1/0,1/0),t=new ge(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ia.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ia.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ia.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,ia):ia.fromBufferAttribute(a,s),ia.applyMatrix4(e.matrixWorld),this.expandByPoint(ia);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ic.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ic.copy(i.boundingBox)),Ic.applyMatrix4(e.matrixWorld),this.union(Ic)}let r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ia),ia.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(il),Cc.subVectors(this.max,il),no.subVectors(e.a,il),io.subVectors(e.b,il),ro.subVectors(e.c,il),rs.subVectors(io,no),as.subVectors(ro,io),Is.subVectors(no,ro);let t=[0,-rs.z,rs.y,0,-as.z,as.y,0,-Is.z,Is.y,rs.z,0,-rs.x,as.z,0,-as.x,Is.z,0,-Is.x,-rs.y,rs.x,0,-as.y,as.x,0,-Is.y,Is.x,0];return!Pf(t,no,io,ro,Cc)||(t=[1,0,0,0,1,0,0,0,1],!Pf(t,no,io,ro,Cc))?!1:(Rc.crossVectors(rs,as),t=[Rc.x,Rc.y,Rc.z],Pf(t,no,io,ro,Cc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ia).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ia).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ga[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ga[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ga[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ga[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ga[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ga[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ga[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ga[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ga),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ga=[new ge,new ge,new ge,new ge,new ge,new ge,new ge,new ge],ia=new ge,Ic=new wa,no=new ge,io=new ge,ro=new ge,rs=new ge,as=new ge,Is=new ge,il=new ge,Cc=new ge,Rc=new ge,Cs=new ge;function Pf(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){Cs.fromArray(n,a);let o=r.x*Math.abs(Cs.x)+r.y*Math.abs(Cs.y)+r.z*Math.abs(Cs.z),u=e.dot(Cs),l=t.dot(Cs),d=i.dot(Cs);if(Math.max(-Math.max(u,l,d),Math.min(u,l,d))>o)return!1}return!0}var Ci=new ge,Pc=new kt,Vg=0,Fr=class extends Sa{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=v0,this.updateRanges=[],this.gpuType=Yr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Pc.fromBufferAttribute(this,t),Pc.applyMatrix3(e),this.setXY(t,Pc.x,Pc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ci.fromBufferAttribute(this,t),Ci.applyMatrix3(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ci.fromBufferAttribute(this,t),Ci.applyMatrix4(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ci.fromBufferAttribute(this,t),Ci.applyNormalMatrix(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ci.fromBufferAttribute(this,t),Ci.transformDirection(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=tl(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Tr(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tl(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tl(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tl(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tl(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Tr(t,this.array),i=Tr(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Tr(t,this.array),i=Tr(i,this.array),r=Tr(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=Tr(t,this.array),i=Tr(i,this.array),r=Tr(r,this.array),a=Tr(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var gl=class extends Fr{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var yl=class extends Fr{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Xn=class extends Fr{constructor(e,t,i){super(new Float32Array(e),t,i)}},Gg=new wa,rl=new ge,Lf=new ge,ls=class{constructor(e=new ge,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Gg.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rl.subVectors(e,this.center);let t=rl.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(rl,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rl.copy(e.center).add(Lf)),this.expandByPoint(rl.copy(e.center).sub(Lf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Hg=0,Xr=new $n,Df=new nr,ao=new ge,Nr=new wa,al=new wa,Oi=new ge,Wi=class n extends Sa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Ro(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ig(e)?yl:gl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new un().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xr.makeRotationFromQuaternion(e),this.applyMatrix4(Xr),this}rotateX(e){return Xr.makeRotationX(e),this.applyMatrix4(Xr),this}rotateY(e){return Xr.makeRotationY(e),this.applyMatrix4(Xr),this}rotateZ(e){return Xr.makeRotationZ(e),this.applyMatrix4(Xr),this}translate(e,t,i){return Xr.makeTranslation(e,t,i),this.applyMatrix4(Xr),this}scale(e,t,i){return Xr.makeScale(e,t,i),this.applyMatrix4(Xr),this}lookAt(e){return Df.lookAt(e),Df.updateMatrix(),this.applyMatrix4(Df.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ao).negate(),this.translate(ao.x,ao.y,ao.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,a=e.length;r<a;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Xn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&rn("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ge(-1/0,-1/0,-1/0),new ge(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let a=t[i];Nr.setFromBufferAttribute(a),this.morphTargetsRelative?(Oi.addVectors(this.boundingBox.min,Nr.min),this.boundingBox.expandByPoint(Oi),Oi.addVectors(this.boundingBox.max,Nr.max),this.boundingBox.expandByPoint(Oi)):(this.boundingBox.expandByPoint(Nr.min),this.boundingBox.expandByPoint(Nr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&sn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ge,1/0);return}if(e){let i=this.boundingSphere.center;if(Nr.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){let o=t[a];al.setFromBufferAttribute(o),this.morphTargetsRelative?(Oi.addVectors(Nr.min,al.min),Nr.expandByPoint(Oi),Oi.addVectors(Nr.max,al.max),Nr.expandByPoint(Oi)):(Nr.expandByPoint(al.min),Nr.expandByPoint(al.max))}Nr.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Oi.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Oi));if(t)for(let a=0,s=t.length;a<s;a++){let o=t[a],u=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Oi.fromBufferAttribute(o,l),u&&(ao.fromBufferAttribute(e,l),Oi.add(ao)),r=Math.max(r,i.distanceToSquared(Oi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&sn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){sn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,a=t.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new Fr(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let o=[],u=[];for(let b=0;b<i.count;b++)o[b]=new ge,u[b]=new ge;let l=new ge,d=new ge,f=new ge,h=new kt,v=new kt,y=new kt,T=new ge,g=new ge;function m(b,I,z){l.fromBufferAttribute(i,b),d.fromBufferAttribute(i,I),f.fromBufferAttribute(i,z),h.fromBufferAttribute(a,b),v.fromBufferAttribute(a,I),y.fromBufferAttribute(a,z),d.sub(l),f.sub(l),v.sub(h),y.sub(h);let U=1/(v.x*y.y-y.x*v.y);isFinite(U)&&(T.copy(d).multiplyScalar(y.y).addScaledVector(f,-v.y).multiplyScalar(U),g.copy(f).multiplyScalar(v.x).addScaledVector(d,-y.x).multiplyScalar(U),o[b].add(T),o[I].add(T),o[z].add(T),u[b].add(g),u[I].add(g),u[z].add(g))}let L=this.groups;L.length===0&&(L=[{start:0,count:e.count}]);for(let b=0,I=L.length;b<I;++b){let z=L[b],U=z.start,Y=z.count;for(let E=U,M=U+Y;E<M;E+=3)m(e.getX(E+0),e.getX(E+1),e.getX(E+2))}let F=new ge,_=new ge,p=new ge,S=new ge;function B(b){p.fromBufferAttribute(r,b),S.copy(p);let I=o[b];F.copy(I),F.sub(p.multiplyScalar(p.dot(I))).normalize(),_.crossVectors(S,I);let U=_.dot(u[b])<0?-1:1;s.setXYZW(b,F.x,F.y,F.z,U)}for(let b=0,I=L.length;b<I;++b){let z=L[b],U=z.start,Y=z.count;for(let E=U,M=U+Y;E<M;E+=3)B(e.getX(E+0)),B(e.getX(E+1)),B(e.getX(E+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Fr(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,v=i.count;h<v;h++)i.setXYZ(h,0,0,0);let r=new ge,a=new ge,s=new ge,o=new ge,u=new ge,l=new ge,d=new ge,f=new ge;if(e)for(let h=0,v=e.count;h<v;h+=3){let y=e.getX(h+0),T=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,T),s.fromBufferAttribute(t,g),d.subVectors(s,a),f.subVectors(r,a),d.cross(f),o.fromBufferAttribute(i,y),u.fromBufferAttribute(i,T),l.fromBufferAttribute(i,g),o.add(d),u.add(d),l.add(d),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(T,u.x,u.y,u.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,v=t.count;h<v;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),d.subVectors(s,a),f.subVectors(r,a),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Oi.fromBufferAttribute(e,t),Oi.normalize(),e.setXYZ(t,Oi.x,Oi.y,Oi.z)}toNonIndexed(){function e(o,u){let l=o.array,d=o.itemSize,f=o.normalized,h=new l.constructor(u.length*d),v=0,y=0;for(let T=0,g=u.length;T<g;T++){o.isInterleavedBufferAttribute?v=u[T]*o.data.stride+o.offset:v=u[T]*d;for(let m=0;m<d;m++)h[y++]=l[v++]}return new Fr(h,d,f)}if(this.index===null)return rn("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let u=r[o],l=e(u,i);t.setAttribute(o,l)}let a=this.morphAttributes;for(let o in a){let u=[],l=a[o];for(let d=0,f=l.length;d<f;d++){let h=l[d],v=e(h,i);u.push(v)}t.morphAttributes[o]=u}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,u=s.length;o<u;o++){let l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let u=this.parameters;for(let l in u)u[l]!==void 0&&(e[l]=u[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let u in i){let l=i[u];e.data.attributes[u]=l.toJSON(e.data)}let r={},a=!1;for(let u in this.morphAttributes){let l=this.morphAttributes[u],d=[];for(let f=0,h=l.length;f<h;f++){let v=l[f];d.push(v.toJSON(e.data))}d.length>0&&(r[u]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let d=r[l];this.setAttribute(l,d.clone(t))}let a=e.morphAttributes;for(let l in a){let d=[],f=a[l];for(let h=0,v=f.length;h<v;h++)d.push(f[h].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,d=s.length;l<d;l++){let f=s[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Nf=new ge,Wg=new ge,Xg=new un,Ur=class{constructor(e=new ge(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Nf.subVectors(i,t).cross(Wg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Nf),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Xg.getNormalMatrix(e),r=this.coplanarPoint(Nf).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Yg=0,cs=class extends Sa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=Ro(),this.name="",this.type="Material",this.blending=Ao,this.side=ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ih,this.blendDst=rh,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vn(0,0,0),this.blendAlpha=0,this.depthFunc=ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=c0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zc,this.stencilZFail=Zc,this.stencilZPass=Zc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){rn(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){rn(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let s=[];for(let o in a){let u=a[o];delete u.metadata,s.push(u)}return s}if(t){let a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new vn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ur().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new kt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new kt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ha=new ge,Uf=new ge,Lc=new ge,Dc=new ge,xl=class{constructor(e=new ge,t=new ge(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ha)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ha.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ha.copy(this.origin).addScaledVector(this.direction,t),Ha.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Uf.copy(e).add(t).multiplyScalar(.5),Lc.copy(t).sub(e).normalize(),Dc.copy(this.origin).sub(Uf);let a=e.distanceTo(t)*.5,s=-this.direction.dot(Lc),o=Dc.dot(this.direction),u=-Dc.dot(Lc),l=Dc.lengthSq(),d=Math.abs(1-s*s),f,h,v,y;if(d>0)if(f=s*u-o,h=s*o-u,y=a*d,f>=0)if(h>=-y)if(h<=y){let T=1/d;f*=T,h*=T,v=f*(f+s*h+2*o)+h*(s*f+h+2*u)+l}else h=a,f=Math.max(0,-(s*h+o)),v=-f*f+h*(h+2*u)+l;else h=-a,f=Math.max(0,-(s*h+o)),v=-f*f+h*(h+2*u)+l;else h<=-y?(f=Math.max(0,-(-s*a+o)),h=f>0?-a:Math.min(Math.max(-a,-u),a),v=-f*f+h*(h+2*u)+l):h<=y?(f=0,h=Math.min(Math.max(-a,-u),a),v=h*(h+2*u)+l):(f=Math.max(0,-(s*a+o)),h=f>0?a:Math.min(Math.max(-a,-u),a),v=-f*f+h*(h+2*u)+l);else h=s>0?-a:a,f=Math.max(0,-(s*h+o)),v=-f*f+h*(h+2*u)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Uf).addScaledVector(Lc,h),v}intersectSphere(e,t){if(e.radius<0)return null;Ha.subVectors(e.center,this.origin);let i=Ha.dot(this.direction),r=Ha.dot(Ha)-i*i,a=e.radius*e.radius;if(r>a)return null;let s=Math.sqrt(a-r),o=i-s,u=i+s;return u<0?null:o<0?this.at(u,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,u,l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),d>=0?(a=(e.min.y-h.y)*d,s=(e.max.y-h.y)*d):(a=(e.max.y-h.y)*d,s=(e.min.y-h.y)*d),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),f>=0?(o=(e.min.z-h.z)*f,u=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,u=(e.min.z-h.z)*f),i>u||o>r)||((o>i||i!==i)&&(i=o),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ha)!==null}intersectTriangle(e,t,i,r,a){let s=this.origin,o=this.direction,u=o.x,l=o.y,d=o.z,f=e.x-s.x,h=e.y-s.y,v=e.z-s.z,y=t.x-s.x,T=t.y-s.y,g=t.z-s.z,m=i.x-s.x,L=i.y-s.y,F=i.z-s.z,_=Math.abs(u),p=Math.abs(l),S=Math.abs(d),B,b,I,z,U,Y,E,M,O,H,ee,j;if(_>=p&&_>=S?(I=u,Y=f,O=y,j=m,u>=0?(B=l,b=d,z=h,U=v,E=T,M=g,H=L,ee=F):(B=d,b=l,z=v,U=h,E=g,M=T,H=F,ee=L)):p>=S?(I=l,Y=h,O=T,j=L,l>=0?(B=d,b=u,z=v,U=f,E=g,M=y,H=F,ee=m):(B=u,b=d,z=f,U=v,E=y,M=g,H=m,ee=F)):(I=d,Y=v,O=g,j=F,d>=0?(B=u,b=l,z=f,U=h,E=y,M=T,H=m,ee=L):(B=l,b=u,z=h,U=f,E=T,M=y,H=L,ee=m)),I===0)return null;let K=B/I,re=b/I,J=1/I,ne=z-K*Y,Te=U-re*Y,fe=E-K*O,pe=M-re*O,Fe=H-K*j,ae=ee-re*j,de=Fe*pe-ae*fe,_e=ne*ae-Te*Fe,Ge=fe*Te-pe*ne;if(r){if(de<0||_e<0||Ge<0)return null}else if((de<0||_e<0||Ge<0)&&(de>0||_e>0||Ge>0))return null;let $e=de+_e+Ge;if($e===0)return null;let ut=J*(de*Y+_e*O+Ge*j);return($e>0?ut<0:ut>0)?null:this.at(ut/$e,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ta=class extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xa,this.combine=Nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ym=new $n,Rs=new xl,Nc=new ls,xm=new ge,Uc=new ge,Fc=new ge,Oc=new ge,Ff=new ge,Bc=new ge,_m=new ge,kc=new ge,jn=class extends nr{constructor(e=new Wi,t=new Ta){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){let o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(a&&o){Bc.set(0,0,0);for(let u=0,l=a.length;u<l;u++){let d=o[u],f=a[u];d!==0&&(Ff.fromBufferAttribute(f,e),s?Bc.addScaledVector(Ff,d):Bc.addScaledVector(Ff.sub(t),d))}t.add(Bc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Nc.copy(i.boundingSphere),Nc.applyMatrix4(a),Rs.copy(e.ray).recast(e.near),!(Nc.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(Nc,xm)===null||Rs.origin.distanceToSquared(xm)>(e.far-e.near)**2))&&(ym.copy(a).invert(),Rs.copy(e.ray).applyMatrix4(ym),!(i.boundingBox!==null&&Rs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Rs)))}_computeIntersections(e,t,i){let r,a=this.geometry,s=this.material,o=a.index,u=a.attributes.position,l=a.attributes.uv,d=a.attributes.uv1,f=a.attributes.normal,h=a.groups,v=a.drawRange;if(o!==null)if(Array.isArray(s))for(let y=0,T=h.length;y<T;y++){let g=h[y],m=s[g.materialIndex],L=Math.max(g.start,v.start),F=Math.min(o.count,Math.min(g.start+g.count,v.start+v.count));for(let _=L,p=F;_<p;_+=3){let S=o.getX(_),B=o.getX(_+1),b=o.getX(_+2);r=zc(this,m,e,i,l,d,f,S,B,b),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,v.start),T=Math.min(o.count,v.start+v.count);for(let g=y,m=T;g<m;g+=3){let L=o.getX(g),F=o.getX(g+1),_=o.getX(g+2);r=zc(this,s,e,i,l,d,f,L,F,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(s))for(let y=0,T=h.length;y<T;y++){let g=h[y],m=s[g.materialIndex],L=Math.max(g.start,v.start),F=Math.min(u.count,Math.min(g.start+g.count,v.start+v.count));for(let _=L,p=F;_<p;_+=3){let S=_,B=_+1,b=_+2;r=zc(this,m,e,i,l,d,f,S,B,b),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,v.start),T=Math.min(u.count,v.start+v.count);for(let g=y,m=T;g<m;g+=3){let L=g,F=g+1,_=g+2;r=zc(this,s,e,i,l,d,f,L,F,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function qg(n,e,t,i,r,a,s,o){let u;if(e.side===pr?u=i.intersectTriangle(s,a,r,!0,o):u=i.intersectTriangle(r,a,s,e.side===ms,o),u===null)return null;kc.copy(o),kc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(kc);return l<t.near||l>t.far?null:{distance:l,point:kc.clone(),object:n}}function zc(n,e,t,i,r,a,s,o,u,l){n.getVertexPosition(o,Uc),n.getVertexPosition(u,Fc),n.getVertexPosition(l,Oc);let d=qg(n,e,t,i,Uc,Fc,Oc,_m);if(d){let f=new ge;os.getBarycoord(_m,Uc,Fc,Oc,f),r&&(d.uv=os.getInterpolatedAttribute(r,o,u,l,f,new kt)),a&&(d.uv1=os.getInterpolatedAttribute(a,o,u,l,f,new kt)),s&&(d.normal=os.getInterpolatedAttribute(s,o,u,l,f,new ge),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let h={a:o,b:u,c:l,normal:new ge,materialIndex:0};os.getNormal(Uc,Fc,Oc,h.normal),d.face=h,d.barycoord=f}return d}var _l=class extends tr{constructor(e=null,t=1,i=1,r,a,s,o,u,l=Bi,d=Bi,f,h){super(null,s,o,u,l,d,r,a,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ml=class extends Fr{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},so=new $n,Mm=new $n,Vc=[],Sm=new wa,Zg=new $n,sl=new jn,ol=new ls,Ea=class extends jn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ml(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Zg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wa),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,so),Sm.copy(e.boundingBox).applyMatrix4(so),this.boundingBox.union(Sm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ls),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,so),ol.copy(e.boundingSphere).applyMatrix4(so),this.boundingSphere.union(ol)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(sl.geometry=this.geometry,sl.material=this.material,sl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ol.copy(this.boundingSphere),ol.applyMatrix4(i),e.ray.intersectsSphere(ol)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,so),Mm.multiplyMatrices(i,so),sl.matrixWorld=Mm,sl.raycast(e,Vc);for(let s=0,o=Vc.length;s<o;s++){let u=Vc[s];u.instanceId=a,u.object=this,t.push(u)}Vc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ml(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new _l(new Float32Array(r*this.count),r,this.count,Vu,Yr));let a=this.morphTexture.source.data.data,s=0;for(let l=0;l<i.length;l++)s+=i[l];let o=this.geometry.morphTargetsRelative?1:1-s,u=r*e;return a[u]=o,a.set(i,u+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ps=new ls,Jg=new kt(.5,.5),Gc=new ge,xo=class{constructor(e=new Ur,t=new Ur,i=new Ur,r=new Ur,a=new Ur,s=new Ur){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ra,i=!1){let r=this.planes,a=e.elements,s=a[0],o=a[1],u=a[2],l=a[3],d=a[4],f=a[5],h=a[6],v=a[7],y=a[8],T=a[9],g=a[10],m=a[11],L=a[12],F=a[13],_=a[14],p=a[15];if(r[0].setComponents(l-s,v-d,m-y,p-L).normalize(),r[1].setComponents(l+s,v+d,m+y,p+L).normalize(),r[2].setComponents(l+o,v+f,m+T,p+F).normalize(),r[3].setComponents(l-o,v-f,m-T,p-F).normalize(),i)r[4].setComponents(u,h,g,_).normalize(),r[5].setComponents(l-u,v-h,m-g,p-_).normalize();else if(r[4].setComponents(l-u,v-h,m-g,p-_).normalize(),t===ra)r[5].setComponents(l+u,v+h,m+g,p+_).normalize();else if(t===po)r[5].setComponents(u,h,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(e){Ps.center.set(0,0,0);let t=Jg.distanceTo(e.center);return Ps.radius=.7071067811865476+t,Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Gc.x=r.normal.x>0?e.max.x:e.min.x,Gc.y=r.normal.y>0?e.max.y:e.min.y,Gc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Sl=class extends tr{constructor(e=[],t=vs,i,r,a,s,o,u,l,d){super(e,t,i,r,a,s,o,u,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var us=class extends tr{constructor(e,t,i=sa,r,a,s,o=Bi,u=Bi,l,d=Ma,f=1){if(d!==Ma&&d!==ys)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,a,s,o,u,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},cu=class extends us{constructor(e,t=sa,i=vs,r,a,s=Bi,o=Bi,u,l=Ma){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,r,a,s,o,u,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},bl=class extends tr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Or=class n extends Wi{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};let o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);let u=[],l=[],d=[],f=[],h=0,v=0;y("z","y","x",-1,-1,i,t,e,s,a,0),y("z","y","x",1,-1,i,t,-e,s,a,1),y("x","z","y",1,1,e,i,t,r,s,2),y("x","z","y",1,-1,e,i,-t,r,s,3),y("x","y","z",1,-1,e,t,i,r,a,4),y("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(u),this.setAttribute("position",new Xn(l,3)),this.setAttribute("normal",new Xn(d,3)),this.setAttribute("uv",new Xn(f,2));function y(T,g,m,L,F,_,p,S,B,b,I){let z=_/B,U=p/b,Y=_/2,E=p/2,M=S/2,O=B+1,H=b+1,ee=0,j=0,K=new ge;for(let re=0;re<H;re++){let J=re*U-E;for(let ne=0;ne<O;ne++){let Te=ne*z-Y;K[T]=Te*L,K[g]=J*F,K[m]=M,l.push(K.x,K.y,K.z),K[T]=0,K[g]=0,K[m]=S>0?1:-1,d.push(K.x,K.y,K.z),f.push(ne/B),f.push(1-re/b),ee+=1}}for(let re=0;re<b;re++)for(let J=0;J<B;J++){let ne=h+J+O*re,Te=h+J+O*(re+1),fe=h+(J+1)+O*(re+1),pe=h+(J+1)+O*re;u.push(ne,Te,pe),u.push(Te,fe,pe),j+=6}o.addGroup(v,j,I),v+=j,h+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var _o=class n extends Wi{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let a=[],s=[],o=[],u=[],l=new ge,d=new kt;s.push(0,0,0),o.push(0,0,1),u.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let v=i+f/t*r;l.x=e*Math.cos(v),l.y=e*Math.sin(v),s.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(s[h]/e+1)/2,d.y=(s[h+1]/e+1)/2,u.push(d.x,d.y)}for(let f=1;f<=t;f++)a.push(f,f+1,0);this.setIndex(a),this.setAttribute("position",new Xn(s,3)),this.setAttribute("normal",new Xn(o,3)),this.setAttribute("uv",new Xn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ds=class n extends Wi{constructor(e=1,t=1,i=1,r=32,a=1,s=!1,o=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:u};let l=this;r=Math.floor(r),a=Math.floor(a);let d=[],f=[],h=[],v=[],y=0,T=[],g=i/2,m=0;L(),s===!1&&(e>0&&F(!0),t>0&&F(!1)),this.setIndex(d),this.setAttribute("position",new Xn(f,3)),this.setAttribute("normal",new Xn(h,3)),this.setAttribute("uv",new Xn(v,2));function L(){let _=new ge,p=new ge,S=0,B=(t-e)/i;for(let b=0;b<=a;b++){let I=[],z=b/a,U=z*(t-e)+e;for(let Y=0;Y<=r;Y++){let E=Y/r,M=E*u+o,O=Math.sin(M),H=Math.cos(M);p.x=U*O,p.y=-z*i+g,p.z=U*H,f.push(p.x,p.y,p.z),_.set(O,B,H).normalize(),h.push(_.x,_.y,_.z),v.push(E,1-z),I.push(y++)}T.push(I)}for(let b=0;b<r;b++)for(let I=0;I<a;I++){let z=T[I][b],U=T[I+1][b],Y=T[I+1][b+1],E=T[I][b+1];(e>0||I!==0)&&(d.push(z,U,E),S+=3),(t>0||I!==a-1)&&(d.push(U,Y,E),S+=3)}l.addGroup(m,S,0),m+=S}function F(_){let p=y,S=new kt,B=new ge,b=0,I=_===!0?e:t,z=_===!0?1:-1;for(let Y=1;Y<=r;Y++)f.push(0,g*z,0),h.push(0,z,0),v.push(.5,.5),y++;let U=y;for(let Y=0;Y<=r;Y++){let M=Y/r*u+o,O=Math.cos(M),H=Math.sin(M);B.x=I*H,B.y=g*z,B.z=I*O,f.push(B.x,B.y,B.z),h.push(0,z,0),S.x=O*.5+.5,S.y=H*.5*z+.5,v.push(S.x,S.y),y++}for(let Y=0;Y<r;Y++){let E=p+Y,M=U+Y;_===!0?d.push(M,M+1,E):d.push(M+1,M,E),b+=3}l.addGroup(m,b,_===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Br=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){rn("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,s;t?s=t:s=e*i[a-1];let o=0,u=a-1,l;for(;o<=u;)if(r=Math.floor(o+(u-o)/2),l=i[r]-s,l<0)o=r+1;else if(l>0)u=r-1;else{u=r;break}if(r=u,i[r]===s)return r/(a-1);let d=i[r],h=i[r+1]-d,v=(s-d)/h;return(r+v)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);let s=this.getPoint(r),o=this.getPoint(a),u=t||(s.isVector2?new kt:new ge);return u.copy(o).sub(s).normalize(),u}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new ge,r=[],a=[],s=[],o=new ge,u=new $n;for(let v=0;v<=e;v++){let y=v/e;r[v]=this.getTangentAt(y,new ge)}a[0]=new ge,s[0]=new ge;let l=Number.MAX_VALUE,d=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);d<=l&&(l=d,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let v=1;v<=e;v++){if(a[v]=a[v-1].clone(),s[v]=s[v-1].clone(),o.crossVectors(r[v-1],r[v]),o.length()>Number.EPSILON){o.normalize();let y=Math.acos(Tn(r[v-1].dot(r[v]),-1,1));a[v].applyMatrix4(u.makeRotationAxis(o,y))}s[v].crossVectors(r[v],a[v])}if(t===!0){let v=Math.acos(Tn(a[0].dot(a[e]),-1,1));v/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(v=-v);for(let y=1;y<=e;y++)a[y].applyMatrix4(u.makeRotationAxis(r[y],v*y)),s[y].crossVectors(r[y],a[y])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Mo=class extends Br{constructor(e=0,t=0,i=1,r=1,a=0,s=Math.PI*2,o=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=u}getPoint(e,t=new kt){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);let o=this.aStartAngle+e*a,u=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=u-this.aX,v=l-this.aY;u=h*d-v*f+this.aX,l=h*f+v*d+this.aY}return i.set(u,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},uu=class extends Mo{constructor(e,t,i,r,a,s){super(e,t,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function Mh(){let n=0,e=0,t=0,i=0;function r(a,s,o,u){n=a,e=o,t=-3*a+3*s-2*o-u,i=2*a-2*s+o+u}return{initCatmullRom:function(a,s,o,u,l){r(s,o,l*(o-a),l*(u-s))},initNonuniformCatmullRom:function(a,s,o,u,l,d,f){let h=(s-a)/l-(o-a)/(l+d)+(o-s)/d,v=(o-s)/d-(u-s)/(d+f)+(u-o)/f;h*=d,v*=d,r(s,o,h,v)},calc:function(a){let s=a*a,o=s*a;return n+e*a+t*s+i*o}}}var bm=new ge,wm=new ge,Of=new Mh,Bf=new Mh,kf=new Mh,du=class extends Br{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new ge){let i=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e,o=Math.floor(s),u=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:u===0&&o===a-1&&(o=a-2,u=1);let l,d;this.closed||o>0?l=r[(o-1)%a]:(wm.subVectors(r[0],r[1]).add(r[0]),l=wm);let f=r[o%a],h=r[(o+1)%a];if(this.closed||o+2<a?d=r[(o+2)%a]:(bm.subVectors(r[a-1],r[a-2]).add(r[a-1]),d=bm),this.curveType==="centripetal"||this.curveType==="chordal"){let v=this.curveType==="chordal"?.5:.25,y=Math.pow(l.distanceToSquared(f),v),T=Math.pow(f.distanceToSquared(h),v),g=Math.pow(h.distanceToSquared(d),v);T<1e-4&&(T=1),y<1e-4&&(y=T),g<1e-4&&(g=T),Of.initNonuniformCatmullRom(l.x,f.x,h.x,d.x,y,T,g),Bf.initNonuniformCatmullRom(l.y,f.y,h.y,d.y,y,T,g),kf.initNonuniformCatmullRom(l.z,f.z,h.z,d.z,y,T,g)}else this.curveType==="catmullrom"&&(Of.initCatmullRom(l.x,f.x,h.x,d.x,this.tension),Bf.initCatmullRom(l.y,f.y,h.y,d.y,this.tension),kf.initCatmullRom(l.z,f.z,h.z,d.z,this.tension));return i.set(Of.calc(u),Bf.calc(u),kf.calc(u)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new ge().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Tm(n,e,t,i,r){let a=(i-e)*.5,s=(r-t)*.5,o=n*n,u=n*o;return(2*t-2*i+a+s)*u+(-3*t+3*i-2*a-s)*o+a*n+t}function $g(n,e){let t=1-n;return t*t*e}function Kg(n,e){return 2*(1-n)*n*e}function Qg(n,e){return n*n*e}function cl(n,e,t,i){return $g(n,e)+Kg(n,t)+Qg(n,i)}function jg(n,e){let t=1-n;return t*t*t*e}function ey(n,e){let t=1-n;return 3*t*t*n*e}function ty(n,e){return 3*(1-n)*n*n*e}function ny(n,e){return n*n*n*e}function ul(n,e,t,i,r){return jg(n,e)+ey(n,t)+ty(n,i)+ny(n,r)}var wl=class extends Br{constructor(e=new kt,t=new kt,i=new kt,r=new kt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new kt){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(ul(e,r.x,a.x,s.x,o.x),ul(e,r.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fu=class extends Br{constructor(e=new ge,t=new ge,i=new ge,r=new ge){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new ge){let i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(ul(e,r.x,a.x,s.x,o.x),ul(e,r.y,a.y,s.y,o.y),ul(e,r.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Tl=class extends Br{constructor(e=new kt,t=new kt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new kt){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new kt){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hu=class extends Br{constructor(e=new ge,t=new ge){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new ge){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},El=class extends Br{constructor(e=new kt,t=new kt,i=new kt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new kt){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(cl(e,r.x,a.x,s.x),cl(e,r.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pu=class extends Br{constructor(e=new ge,t=new ge,i=new ge){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ge){let i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(cl(e,r.x,a.x,s.x),cl(e,r.y,a.y,s.y),cl(e,r.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Al=class extends Br{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new kt){let i=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,u=r[s===0?s:s-1],l=r[s],d=r[s>r.length-2?r.length-1:s+1],f=r[s>r.length-3?r.length-1:s+2];return i.set(Tm(o,u.x,l.x,d.x,f.x),Tm(o,u.y,l.y,d.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new kt().fromArray(r))}return this}},Em=Object.freeze({__proto__:null,ArcCurve:uu,CatmullRomCurve3:du,CubicBezierCurve:wl,CubicBezierCurve3:fu,EllipseCurve:Mo,LineCurve:Tl,LineCurve3:hu,QuadraticBezierCurve:El,QuadraticBezierCurve3:pu,SplineCurve:Al}),mu=class extends Br{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Em[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let s=r[a]-i,o=this.curves[a],u=o.getLength(),l=u===0?0:1-s/u;return o.getPointAt(l,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let s=a[r],o=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,u=s.getPoints(o);for(let l=0;l<u.length;l++){let d=u[l];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Em[r.type]().fromJSON(r))}return this}},Ns=class extends mu{constructor(e){super(),this.type="Path",this.currentPoint=new kt,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Tl(this.currentPoint.clone(),new kt(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new El(this.currentPoint.clone(),new kt(e,t),new kt(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,s){let o=new wl(this.currentPoint.clone(),new kt(e,t),new kt(i,r),new kt(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Al(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,s){let o=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+o,t+u,i,r,a,s),this}absarc(e,t,i,r,a,s){return this.absellipse(e,t,i,i,r,a,s),this}ellipse(e,t,i,r,a,s,o,u){let l=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+l,t+d,i,r,a,s,o,u),this}absellipse(e,t,i,r,a,s,o,u){let l=new Mo(e,t,i,r,a,s,o,u);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let d=l.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},So=class extends Ns{constructor(e){super(e),this.uuid=Ro(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Ns().fromJSON(r))}return this}};function iy(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,a=S0(n,0,r,t,!0),s=[];if(!a||a.next===a.prev)return s;let o,u,l;if(i&&(a=ly(n,e,a,t)),n.length>80*t){o=n[0],u=n[1];let d=o,f=u;for(let h=t;h<r;h+=t){let v=n[h],y=n[h+1];v<o&&(o=v),y<u&&(u=y),v>d&&(d=v),y>f&&(f=y)}l=Math.max(d-o,f-u),l=l!==0?32767/l:0}return Il(a,s,t,o,u,l,0),s}function S0(n,e,t,i,r){let a;if(r===xy(n,e,t,i)>0)for(let s=e;s<t;s+=i)a=Am(s/i|0,n[s],n[s+1],a);else for(let s=t-i;s>=e;s-=i)a=Am(s/i|0,n[s],n[s+1],a);return a&&bo(a,a.next)&&(Rl(a),a=a.next),a}function Us(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(bo(t,t.next)||mi(t.prev,t,t.next)===0)){if(Rl(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Il(n,e,t,i,r,a,s){if(!n)return;!s&&a&&hy(n,i,r,a);let o=n;for(;n.prev!==n.next;){let u=n.prev,l=n.next;if(a?ay(n,i,r,a):ry(n)){e.push(u.i,n.i,l.i),Rl(n),n=l.next,o=l.next;continue}if(n=l,n===o){s?s===1?(n=sy(Us(n),e),Il(n,e,t,i,r,a,2)):s===2&&oy(n,e,t,i,r,a):Il(Us(n),e,t,i,r,a,1);break}}}function ry(n){let e=n.prev,t=n,i=n.next;if(mi(e,t,i)>=0)return!1;let r=e.x,a=t.x,s=i.x,o=e.y,u=t.y,l=i.y,d=Math.min(r,a,s),f=Math.min(o,u,l),h=Math.max(r,a,s),v=Math.max(o,u,l),y=i.next;for(;y!==e;){if(y.x>=d&&y.x<=h&&y.y>=f&&y.y<=v&&ll(r,o,a,u,s,l,y.x,y.y)&&mi(y.prev,y,y.next)>=0)return!1;y=y.next}return!0}function ay(n,e,t,i){let r=n.prev,a=n,s=n.next;if(mi(r,a,s)>=0)return!1;let o=r.x,u=a.x,l=s.x,d=r.y,f=a.y,h=s.y,v=Math.min(o,u,l),y=Math.min(d,f,h),T=Math.max(o,u,l),g=Math.max(d,f,h),m=Yf(v,y,e,t,i),L=Yf(T,g,e,t,i),F=n.prevZ,_=n.nextZ;for(;F&&F.z>=m&&_&&_.z<=L;){if(F.x>=v&&F.x<=T&&F.y>=y&&F.y<=g&&F!==r&&F!==s&&ll(o,d,u,f,l,h,F.x,F.y)&&mi(F.prev,F,F.next)>=0||(F=F.prevZ,_.x>=v&&_.x<=T&&_.y>=y&&_.y<=g&&_!==r&&_!==s&&ll(o,d,u,f,l,h,_.x,_.y)&&mi(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;F&&F.z>=m;){if(F.x>=v&&F.x<=T&&F.y>=y&&F.y<=g&&F!==r&&F!==s&&ll(o,d,u,f,l,h,F.x,F.y)&&mi(F.prev,F,F.next)>=0)return!1;F=F.prevZ}for(;_&&_.z<=L;){if(_.x>=v&&_.x<=T&&_.y>=y&&_.y<=g&&_!==r&&_!==s&&ll(o,d,u,f,l,h,_.x,_.y)&&mi(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function sy(n,e){let t=n;do{let i=t.prev,r=t.next.next;!bo(i,r)&&w0(i,t,t.next,r)&&Cl(i,r)&&Cl(r,i)&&(e.push(i.i,t.i,r.i),Rl(t),Rl(t.next),t=n=r),t=t.next}while(t!==n);return Us(t)}function oy(n,e,t,i,r,a){let s=n;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&vy(s,o)){let u=T0(s,o);s=Us(s,s.next),u=Us(u,u.next),Il(s,e,t,i,r,a,0),Il(u,e,t,i,r,a,0);return}o=o.next}s=s.next}while(s!==n)}function ly(n,e,t,i){let r=[];for(let a=0,s=e.length;a<s;a++){let o=e[a]*i,u=a<s-1?e[a+1]*i:n.length,l=S0(n,o,u,i,!1);l===l.next&&(l.steiner=!0),r.push(my(l))}r.sort(cy);for(let a=0;a<r.length;a++)t=uy(r[a],t);return t}function cy(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function uy(n,e){let t=dy(n,e);if(!t)return e;let i=T0(t,n);return Us(i,i.next),Us(t,t.next)}function dy(n,e){let t=e,i=n.x,r=n.y,a=-1/0,s;if(bo(n,t))return t;do{if(bo(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>a&&(a=f,s=t.x<t.next.x?t:t.next,f===i))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,u=s.x,l=s.y,d=1/0;t=s;do{if(i>=t.x&&t.x>=u&&i!==t.x&&b0(r<l?i:a,r,u,l,r<l?a:i,r,t.x,t.y)){let f=Math.abs(r-t.y)/(i-t.x);Cl(t,n)&&(f<d||f===d&&(t.x>s.x||t.x===s.x&&fy(s,t)))&&(s=t,d=f)}t=t.next}while(t!==o);return s}function fy(n,e){return mi(n.prev,n,e.prev)<0&&mi(e.next,n,n.next)<0}function hy(n,e,t,i){let r=n;do r.z===0&&(r.z=Yf(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,py(r)}function py(n){let e,t=1;do{let i=n,r;n=null;let a=null;for(e=0;i;){e++;let s=i,o=0;for(let l=0;l<t&&(o++,s=s.nextZ,!!s);l++);let u=t;for(;o>0||u>0&&s;)o!==0&&(u===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,o--):(r=s,s=s.nextZ,u--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;i=s}a.nextZ=null,t*=2}while(e>1);return n}function Yf(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function my(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function b0(n,e,t,i,r,a,s,o){return(r-s)*(e-o)>=(n-s)*(a-o)&&(n-s)*(i-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(r-s)*(i-o)}function ll(n,e,t,i,r,a,s,o){return!(n===s&&e===o)&&b0(n,e,t,i,r,a,s,o)}function vy(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!gy(n,e)&&(Cl(n,e)&&Cl(e,n)&&yy(n,e)&&(mi(n.prev,n,e.prev)||mi(n,e.prev,e))||bo(n,e)&&mi(n.prev,n,n.next)>0&&mi(e.prev,e,e.next)>0)}function mi(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function bo(n,e){return n.x===e.x&&n.y===e.y}function w0(n,e,t,i){let r=Wc(mi(n,e,t)),a=Wc(mi(n,e,i)),s=Wc(mi(t,i,n)),o=Wc(mi(t,i,e));return!!(r!==a&&s!==o||r===0&&Hc(n,t,e)||a===0&&Hc(n,i,e)||s===0&&Hc(t,n,i)||o===0&&Hc(t,e,i))}function Hc(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Wc(n){return n>0?1:n<0?-1:0}function gy(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&w0(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Cl(n,e){return mi(n.prev,n,n.next)<0?mi(n,e,n.next)>=0&&mi(n,n.prev,e)>=0:mi(n,e,n.prev)<0||mi(n,n.next,e)<0}function yy(n,e){let t=n,i=!1,r=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&r<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function T0(n,e){let t=qf(n.i,n.x,n.y),i=qf(e.i,e.x,e.y),r=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function Am(n,e,t,i){let r=qf(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Rl(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function qf(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function xy(n,e,t,i){let r=0;for(let a=e,s=t-i;a<t;a+=i)r+=(n[s]-n[a])*(n[a+1]+n[s+1]),s=a;return r}var Zf=class{static triangulate(e,t,i=2){return iy(e,t,i)}},fo=class n{static area(e){let t=e.length,i=0;for(let r=t-1,a=0;a<t;r=a++)i+=e[r].x*e[a].y-e[a].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],a=[];Im(e),Cm(i,e);let s=e.length;t.forEach(Im);for(let u=0;u<t.length;u++)r.push(s),s+=t[u].length,Cm(i,t[u]);let o=Zf.triangulate(i,r);for(let u=0;u<o.length;u+=3)a.push(o.slice(u,u+3));return a}};function Im(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Cm(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Pl=class n extends Wi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let a=e/2,s=t/2,o=Math.floor(i),u=Math.floor(r),l=o+1,d=u+1,f=e/o,h=t/u,v=[],y=[],T=[],g=[];for(let m=0;m<d;m++){let L=m*h-s;for(let F=0;F<l;F++){let _=F*f-a;y.push(_,-L,0),T.push(0,0,1),g.push(F/o),g.push(1-m/u)}}for(let m=0;m<u;m++)for(let L=0;L<o;L++){let F=L+l*m,_=L+l*(m+1),p=L+1+l*(m+1),S=L+1+l*m;v.push(F,_,S),v.push(_,p,S)}this.setIndex(v),this.setAttribute("position",new Xn(y,3)),this.setAttribute("normal",new Xn(T,3)),this.setAttribute("uv",new Xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},wo=class n extends Wi{constructor(e=.5,t=1,i=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:a,thetaLength:s},i=Math.max(3,i),r=Math.max(1,r);let o=[],u=[],l=[],d=[],f=e,h=(t-e)/r,v=new ge,y=new kt;for(let T=0;T<=r;T++){for(let g=0;g<=i;g++){let m=a+g/i*s;v.x=f*Math.cos(m),v.y=f*Math.sin(m),u.push(v.x,v.y,v.z),l.push(0,0,1),y.x=(v.x/t+1)/2,y.y=(v.y/t+1)/2,d.push(y.x,y.y)}f+=h}for(let T=0;T<r;T++){let g=T*(i+1);for(let m=0;m<i;m++){let L=m+g,F=L,_=L+i+1,p=L+i+2,S=L+1;o.push(F,_,S),o.push(_,p,S)}}this.setIndex(o),this.setAttribute("position",new Xn(u,3)),this.setAttribute("normal",new Xn(l,3)),this.setAttribute("uv",new Xn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ll=class n extends Wi{constructor(e=new So([new kt(0,.5),new kt(-.5,-.5),new kt(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],a=[],s=[],o=0,u=0;if(Array.isArray(e)===!1)l(e);else for(let d=0;d<e.length;d++)l(e[d]),this.addGroup(o,u,d),o+=u,u=0;this.setIndex(i),this.setAttribute("position",new Xn(r,3)),this.setAttribute("normal",new Xn(a,3)),this.setAttribute("uv",new Xn(s,2));function l(d){let f=r.length/3,h=d.extractPoints(t),v=h.shape,y=h.holes;fo.isClockWise(v)===!1&&(v=v.reverse());for(let g=0,m=y.length;g<m;g++){let L=y[g];fo.isClockWise(L)===!0&&(y[g]=L.reverse())}let T=fo.triangulateShape(v,y);for(let g=0,m=y.length;g<m;g++){let L=y[g];v=v.concat(L)}for(let g=0,m=v.length;g<m;g++){let L=v[g];r.push(L.x,L.y,0),a.push(0,0,1),s.push(L.x,L.y)}for(let g=0,m=T.length;g<m;g++){let L=T[g],F=L[0]+f,_=L[1]+f,p=L[2]+f;i.push(F,_,p),u+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return _y(t,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let s=t[e.shapes[r]];i.push(s)}return new n(i,e.curveSegments)}};function _y(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var ds=class n extends Wi{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let u=Math.min(s+o,Math.PI),l=0,d=[],f=new ge,h=new ge,v=[],y=[],T=[],g=[];for(let m=0;m<=i;m++){let L=[],F=m/i,_=s+F*o,p=e*Math.cos(_),S=Math.sqrt(e*e-p*p),B=0;m===0&&s===0?B=.5/t:m===i&&u===Math.PI&&(B=-.5/t);for(let b=0;b<=t;b++){let I=b/t,z=r+I*a;f.x=-S*Math.cos(z),f.y=p,f.z=S*Math.sin(z),y.push(f.x,f.y,f.z),h.copy(f).normalize(),T.push(h.x,h.y,h.z),g.push(I+B,1-F),L.push(l++)}d.push(L)}for(let m=0;m<i;m++)for(let L=0;L<t;L++){let F=d[m][L+1],_=d[m][L],p=d[m+1][L],S=d[m+1][L+1];(m!==0||s>0)&&v.push(F,_,S),(m!==i-1||u<Math.PI)&&v.push(_,p,S)}this.setIndex(v),this.setAttribute("position",new Xn(y,3)),this.setAttribute("normal",new Xn(T,3)),this.setAttribute("uv",new Xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Bs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Rm(r))r.isRenderTargetTexture?(rn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Rm(r[0])){let a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function ir(n){let e={};for(let t=0;t<n.length;t++){let i=Bs(n[t]);for(let r in i)e[r]=i[r]}return e}function Rm(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function My(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ln.workingColorSpace}var E0={clone:Bs,merge:ir},Sy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,by=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kr=class extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sy,this.fragmentShader=by,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=My(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new vn().setHex(r.value);break;case"v2":this.uniforms[i].value=new kt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new ge().fromArray(r.value);break;case"v4":this.uniforms[i].value=new fi().fromArray(r.value);break;case"m3":this.uniforms[i].value=new un().fromArray(r.value);break;case"m4":this.uniforms[i].value=new $n().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},vu=class extends kr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Xi=class extends cs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new vn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Md,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xa,this.combine=Nu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gu=class extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=o0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},yu=class extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function oo(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function zf(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var fs=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let s;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<a)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=r,r=t[++i],e<r)break t}s=t.length;break n}if(!(e>=a)){let o=t[1];e<o&&(i=2,a=o);for(let u=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(r=a,a=t[--i-1],e>=a)break t}s=i,i=0;break n}break e}for(;i<s;){let o=i+s>>>1;e<t[o]?s=o:i=o+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let s=0;s!==r;++s)t[s]=i[a+s];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xu=class extends fs{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hf,endingEnd:Hf}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,s=e+1,o=r[a],u=r[s];if(o===void 0)switch(this.getSettings_().endingStart){case Wf:a=e,o=2*t-i;break;case Xf:a=r.length-2,o=t+r[a]-r[a+1];break;default:a=e,o=i}if(u===void 0)switch(this.getSettings_().endingEnd){case Wf:s=e,u=2*i-t;break;case Xf:s=1,u=i+r[1]-r[0];break;default:s=e-1,u=t}let l=(i-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(u-i),this._offsetPrev=a*d,this._offsetNext=s*d}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,v=this._weightNext,y=(i-t)/(r-t),T=y*y,g=T*y,m=-h*g+2*h*T-h*y,L=(1+h)*g+(-1.5-2*h)*T+(-.5+h)*y+1,F=(-1-v)*g+(1.5+v)*T+.5*y,_=v*g-v*T;for(let p=0;p!==o;++p)a[p]=m*s[d+p]+L*s[l+p]+F*s[u+p]+_*s[f+p];return a}},_u=class extends fs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=(i-t)/(r-t),f=1-d;for(let h=0;h!==o;++h)a[h]=s[l+h]*f+s[u+h]*d;return a}},Mu=class extends fs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Su=class extends fs{interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,l=u-o,d=this.inTangents,f=this.outTangents;if(!d||!f){let y=(i-t)/(r-t),T=1-y;for(let g=0;g!==o;++g)a[g]=s[l+g]*T+s[u+g]*y;return a}let h=o*2,v=e-1;for(let y=0;y!==o;++y){let T=s[l+y],g=s[u+y],m=v*h+y*2,L=f[m],F=f[m+1],_=e*h+y*2,p=d[_],S=d[_+1],B=Ty(i,t,L,p,r);a[y]=A0(B,T,F,S,g)}return a}};function A0(n,e,t,i,r){let a=1-n;return a*a*a*e+3*a*a*n*t+3*a*n*n*i+n*n*n*r}function wy(n,e,t,i,r){let a=1-n;return 3*a*a*(t-e)+6*a*n*(i-t)+3*n*n*(r-i)}function Ty(n,e,t,i,r){let a=(n-e)/(r-e);for(let s=0;s<8;s++){let o=A0(a,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let u=wy(a,e,t,i,r);if(Math.abs(u)<1e-10)break;a=Math.max(0,Math.min(1,a-o/u))}return a}var zr=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=oo(t,this.TimeBufferType),this.values=oo(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:oo(e.times,Array),values:oo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),zf(e.settings)&&(i.settings={inTangents:oo(e.settings.inTangents,Array),outTangents:oo(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _u(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Su(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case dl:t=this.InterpolantFactoryMethodDiscrete;break;case ru:t=this.InterpolantFactoryMethodLinear;break;case qc:t=this.InterpolantFactoryMethodSmooth;break;case Gf:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return rn("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dl;case this.InterpolantFactoryMethodLinear:return ru;case this.InterpolantFactoryMethodSmooth:return qc;case this.InterpolantFactoryMethodBezier:return Gf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;zf(this.settings)&&(Pm(this.settings.inTangents,e),Pm(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,s=r-1;for(;a!==r&&i[a]<e;)++a;for(;s!==-1&&i[s]>t;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let o=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*o,s*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(sn("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(sn("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==a;o++){let u=i[o];if(typeof u=="number"&&isNaN(u)){sn("KeyframeTrack: Time is not a valid number.",this,o,u),e=!1;break}if(s!==null&&s>u){sn("KeyframeTrack: Out of order keys.",this,o,u,s),e=!1;break}s=u}if(r!==void 0&&Cg(r))for(let o=0,u=r.length;o!==u;++o){let l=r[o];if(isNaN(l)){sn("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===qc,a=e.length-1,s=1;for(let o=1;o<a;++o){let u=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(r)u=!0;else{let f=o*i,h=f-i,v=f+i;for(let y=0;y!==i;++y){let T=t[f+y];if(T!==t[h+y]||T!==t[v+y]){u=!0;break}}}if(u){if(o!==s){e[s]=e[o];let f=o*i,h=s*i;for(let v=0;v!==i;++v)t[h+v]=t[f+v]}++s}}if(a>0){e[s]=e[a];for(let o=a*i,u=s*i,l=0;l!==i;++l)t[u+l]=t[o+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,zf(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Pm(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}zr.prototype.ValueTypeName="";zr.prototype.TimeBufferType=Float32Array;zr.prototype.ValueBufferType=Float32Array;zr.prototype.DefaultInterpolation=ru;var hs=class extends zr{constructor(e,t,i){super(e,t,i)}};hs.prototype.ValueTypeName="bool";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=dl;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var bu=class extends zr{constructor(e,t,i,r){super(e,t,i,r)}};bu.prototype.ValueTypeName="color";var wu=class extends zr{constructor(e,t,i,r){super(e,t,i,r)}};wu.prototype.ValueTypeName="number";var Tu=class extends fs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=(i-t)/(r-t),l=e*o;for(let d=l+o;l!==d;l+=4)ba.slerpFlat(a,0,s,l-o,s,l,u);return a}},Dl=class extends zr{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Tu(this.times,this.values,this.getValueSize(),e)}};Dl.prototype.ValueTypeName="quaternion";Dl.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends zr{constructor(e,t,i){super(e,t,i)}};ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=dl;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Eu=class extends zr{constructor(e,t,i,r){super(e,t,i,r)}};Eu.prototype.ValueTypeName="vector";var Au=class{constructor(e,t,i){let r=this,a=!1,s=0,o=0,u,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,a===!1&&r.onStart!==void 0&&r.onStart(d,s,o),a=!0},this.itemEnd=function(d){s++,r.onProgress!==void 0&&r.onProgress(d,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),u?u(d):d},this.setURLModifier=function(d){return u=d,this},this.addHandler=function(d,f){return l.push(d,f),this},this.removeHandler=function(d){let f=l.indexOf(d);return f!==-1&&l.splice(f,2),this},this.getHandler=function(d){for(let f=0,h=l.length;f<h;f+=2){let v=l[f],y=l[f+1];if(v.global&&(v.lastIndex=0),v.test(d))return y}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},I0=new Au,Iu=class{constructor(e){this.manager=e!==void 0?e:I0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Iu.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nl=class extends nr{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new vn(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ul=class extends Nl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new vn(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Vf=new $n,Lm=new ge,Dm=new ge,Cu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=Cr,this.map=null,this.mapPass=null,this.matrix=new $n,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xo,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new fi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Lm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lm),Dm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Dm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Vf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Vf,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,s=r?r.z/a.x:1,o=r?r.w/a.y:1,u=r?r.x/a.x:0,l=r?r.y/a.y:0;e.coordinateSystem===po||e.reversedDepth?t.set(.5*s,0,0,.5*s+u,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*s,0,0,.5*s+u,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Vf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xc=new ge,Yc=new ba,xa=new ge,Fl=class extends nr{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $n,this.projectionMatrix=new $n,this.projectionMatrixInverse=new $n,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xc,Yc,xa),xa.x===1&&xa.y===1&&xa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xc,Yc,xa.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Xc,Yc,xa),xa.x===1&&xa.y===1&&xa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xc,Yc,xa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ss=new ge,Nm=new kt,Um=new kt,er=class extends Fl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=au*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(vf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return au*2*Math.atan(Math.tan(vf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ss.x,ss.y).multiplyScalar(-e/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ss.x,ss.y).multiplyScalar(-e/ss.z)}getViewSize(e,t){return this.getViewBounds(e,Nm,Um),t.subVectors(Um,Nm)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(vf*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let u=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/u,t-=s.offsetY*i/l,r*=s.width/u,i*=s.height/l}let o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var To=class extends Fl{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,s=i+e,o=r+t,u=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=d*this.view.offsetY,u=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Jf=class extends Cu{constructor(){super(new To(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ol=class extends Nl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nr.DEFAULT_UP),this.updateMatrix(),this.target=new nr,this.shadow=new Jf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var lo=-90,co=1,Ru=class extends nr{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new er(lo,co,e,t);r.layers=this.layers,this.add(r);let a=new er(lo,co,e,t);a.layers=this.layers,this.add(a);let s=new er(lo,co,e,t);s.layers=this.layers,this.add(s);let o=new er(lo,co,e,t);o.layers=this.layers,this.add(o);let u=new er(lo,co,e,t);u.layers=this.layers,this.add(u);let l=new er(lo,co,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,u]=t;for(let l of t)this.remove(l);if(e===ra)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===po)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,o,u,l,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;let T=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=T,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,h,v),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}},Pu=class extends er{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bh="\\[\\]\\.:\\/",Ey=new RegExp("["+bh+"]","g"),wh="[^"+bh+"]",Ay="[^"+bh.replace("\\.","")+"]",Iy=/((?:WC+[\/:])*)/.source.replace("WC",wh),Cy=/(WCOD+)?/.source.replace("WCOD",Ay),Ry=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wh),Py=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wh),Ly=new RegExp("^"+Iy+Cy+Ry+Py+"$"),Dy=["material","materials","bones","map"],$f=class{constructor(e,t,i){let r=i||li.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},li=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ey,"")}static parseTrackName(e){let t=Ly.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);Dy.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(a){for(let s=0;s<a.length;s++){let o=a[s];if(o.name===t||o.uuid===t)return o;let u=i(o.children);if(u)return u}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){rn("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){sn("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){sn("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){sn("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){sn("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){sn("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){sn("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){sn("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;sn("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){sn("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){sn("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}u=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(u=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};li.Composite=$f;li.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};li.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};li.prototype.GetterByBindingType=[li.prototype._getValue_direct,li.prototype._getValue_array,li.prototype._getValue_arrayElement,li.prototype._getValue_toArray];li.prototype.SetterByBindingTypeAndVersioning=[[li.prototype._setValue_direct,li.prototype._setValue_direct_setNeedsUpdate,li.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[li.prototype._setValue_array,li.prototype._setValue_array_setNeedsUpdate,li.prototype._setValue_array_setMatrixWorldNeedsUpdate],[li.prototype._setValue_arrayElement,li.prototype._setValue_arrayElement_setNeedsUpdate,li.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[li.prototype._setValue_fromArray,li.prototype._setValue_fromArray_setNeedsUpdate,li.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uw=new Float32Array(1);var Fm=new $n,Bl=class{constructor(e,t,i=0,r=1/0){this.ray=new xl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):sn("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Fm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fm),this}intersectObject(e,t=!0,i=[]){return Kf(e,this,i,t),i.sort(Om),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)Kf(e[r],this,i,t);return i.sort(Om),i}};function Om(n,e){return n.distance-e.distance}function Kf(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let a=n.children;for(let s=0,o=a.length;s<o;s++)Kf(a[s],e,t,!0)}}var Rh=class Rh{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}};Rh.prototype.isMatrix2=!0;var Qf=Rh;function Th(n,e,t,i){let r=Ny(i);switch(t){case gh:return n*e;case Vu:return n*e/r.components*r.byteLength;case Gu:return n*e/r.components*r.byteLength;case xs:return n*e*2/r.components*r.byteLength;case Hu:return n*e*2/r.components*r.byteLength;case yh:return n*e*3/r.components*r.byteLength;case qr:return n*e*4/r.components*r.byteLength;case Wu:return n*e*4/r.components*r.byteLength;case Gl:case Hl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wl:case Xl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yu:case Zu:return Math.max(n,16)*Math.max(e,8)/4;case Xu:case qu:return Math.max(n,8)*Math.max(e,8)/2;case Ju:case $u:case Qu:case ju:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ku:case Yl:case ed:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case td:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case id:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case rd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ad:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case sd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case od:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ld:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case cd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ud:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case dd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case fd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case hd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case pd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case md:case vd:case gd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case yd:case xd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ql:case _d:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ny(n){switch(n){case Cr:case hh:return{byteLength:1,components:1};case Io:case ph:case oa:return{byteLength:2,components:1};case ku:case zu:return{byteLength:2,components:4};case sa:case Bu:case Yr:return{byteLength:4,components:1};case mh:case vh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?rn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function $0(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Fy(n){let e=new WeakMap;function t(o,u){let l=o.array,d=o.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(u,h),n.bufferData(u,l,d),o.onUploadCallback();let v;if(l instanceof Float32Array)v=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)v=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?v=n.HALF_FLOAT:v=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)v=n.SHORT;else if(l instanceof Uint32Array)v=n.UNSIGNED_INT;else if(l instanceof Int32Array)v=n.INT;else if(l instanceof Int8Array)v=n.BYTE;else if(l instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:v,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,u,l){let d=u.array,f=u.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,d);else{f.sort((v,y)=>v.start-y.start);let h=0;for(let v=1;v<f.length;v++){let y=f[h],T=f[v];T.start<=y.start+y.count+1?y.count=Math.max(y.count,T.start+T.count-y.start):(++h,f[h]=T)}f.length=h+1;for(let v=0,y=f.length;v<y;v++){let T=f[v];n.bufferSubData(l,T.start*d.BYTES_PER_ELEMENT,d,T.start,T.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let u=e.get(o);u&&(n.deleteBuffer(u.buffer),e.delete(o))}function s(o,u){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,u));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,u),l.version=o.version}}return{get:r,remove:a,update:s}}var Oy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,By=`#ifdef USE_ALPHAHASH
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
#endif`,ky=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hy=`#ifdef USE_AOMAP
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
#endif`,Wy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xy=`#ifdef USE_BATCHING
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
#endif`,Yy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$y=`#ifdef USE_IRIDESCENCE
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
#endif`,Ky=`#ifdef USE_BUMPMAP
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
#endif`,Qy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ix=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ax=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sx=`#define PI 3.141592653589793
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
} // validated`,ox=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lx=`vec3 transformedNormal = objectNormal;
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
#endif`,cx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ux=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hx="gl_FragColor = linearToOutputTexel( gl_FragColor );",px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mx=`#ifdef USE_ENVMAP
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
#endif`,vx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
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
#endif`,yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xx=`#ifdef USE_ENVMAP
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
#endif`,_x=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wx=`#ifdef USE_GRADIENTMAP
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
}`,Tx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ex=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ax=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ix=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Cx=`#ifdef USE_ENVMAP
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
#endif`,Rx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nx=`PhysicalMaterial material;
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
#endif`,Ux=`uniform sampler2D dfgLUT;
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
}`,Fx=`
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
#endif`,Ox=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qx=`#if defined( USE_POINTS_UV )
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
#endif`,Zx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$x=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jx=`#ifdef USE_MORPHTARGETS
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
#endif`,e_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,n_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,i_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,s_=`#ifdef USE_NORMALMAP
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
#endif`,o_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,c_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,h_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,p_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,m_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,g_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,__=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,S_=`float getShadowMask() {
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
}`,b_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,w_=`#ifdef USE_SKINNING
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
#endif`,T_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E_=`#ifdef USE_SKINNING
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
#endif`,A_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,R_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,P_=`#ifdef USE_TRANSMISSION
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
#endif`,L_=`#ifdef USE_TRANSMISSION
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
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,O_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B_=`uniform sampler2D t2D;
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
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H_=`#include <common>
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
}`,W_=`#if DEPTH_PACKING == 3200
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
}`,X_=`#define DISTANCE
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
}`,Y_=`#define DISTANCE
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
}`,q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Z_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`uniform float scale;
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
}`,$_=`uniform vec3 diffuse;
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
}`,K_=`#include <common>
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
}`,Q_=`uniform vec3 diffuse;
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
}`,j_=`#define LAMBERT
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
}`,eM=`#define LAMBERT
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
}`,tM=`#define MATCAP
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
}`,nM=`#define MATCAP
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
}`,iM=`#define NORMAL
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
}`,rM=`#define NORMAL
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
}`,aM=`#define PHONG
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
}`,sM=`#define PHONG
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
}`,oM=`#define STANDARD
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
}`,lM=`#define STANDARD
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
}`,cM=`#define TOON
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
}`,uM=`#define TOON
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
}`,dM=`uniform float size;
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
}`,fM=`uniform vec3 diffuse;
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
}`,hM=`#include <common>
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
}`,pM=`uniform vec3 color;
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
}`,mM=`uniform float rotation;
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
}`,vM=`uniform vec3 diffuse;
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
}`,gn={alphahash_fragment:Oy,alphahash_pars_fragment:By,alphamap_fragment:ky,alphamap_pars_fragment:zy,alphatest_fragment:Vy,alphatest_pars_fragment:Gy,aomap_fragment:Hy,aomap_pars_fragment:Wy,batching_pars_vertex:Xy,batching_vertex:Yy,begin_vertex:qy,beginnormal_vertex:Zy,bsdfs:Jy,iridescence_fragment:$y,bumpmap_pars_fragment:Ky,clipping_planes_fragment:Qy,clipping_planes_pars_fragment:jy,clipping_planes_pars_vertex:ex,clipping_planes_vertex:tx,color_fragment:nx,color_pars_fragment:ix,color_pars_vertex:rx,color_vertex:ax,common:sx,cube_uv_reflection_fragment:ox,defaultnormal_vertex:lx,displacementmap_pars_vertex:cx,displacementmap_vertex:ux,emissivemap_fragment:dx,emissivemap_pars_fragment:fx,colorspace_fragment:hx,colorspace_pars_fragment:px,envmap_fragment:mx,envmap_common_pars_fragment:vx,envmap_pars_fragment:gx,envmap_pars_vertex:yx,envmap_physical_pars_fragment:Cx,envmap_vertex:xx,fog_vertex:_x,fog_pars_vertex:Mx,fog_fragment:Sx,fog_pars_fragment:bx,gradientmap_pars_fragment:wx,lightmap_pars_fragment:Tx,lights_lambert_fragment:Ex,lights_lambert_pars_fragment:Ax,lights_pars_begin:Ix,lights_toon_fragment:Rx,lights_toon_pars_fragment:Px,lights_phong_fragment:Lx,lights_phong_pars_fragment:Dx,lights_physical_fragment:Nx,lights_physical_pars_fragment:Ux,lights_fragment_begin:Fx,lights_fragment_maps:Ox,lights_fragment_end:Bx,lightprobes_pars_fragment:kx,logdepthbuf_fragment:zx,logdepthbuf_pars_fragment:Vx,logdepthbuf_pars_vertex:Gx,logdepthbuf_vertex:Hx,map_fragment:Wx,map_pars_fragment:Xx,map_particle_fragment:Yx,map_particle_pars_fragment:qx,metalnessmap_fragment:Zx,metalnessmap_pars_fragment:Jx,morphinstance_vertex:$x,morphcolor_vertex:Kx,morphnormal_vertex:Qx,morphtarget_pars_vertex:jx,morphtarget_vertex:e_,normal_fragment_begin:t_,normal_fragment_maps:n_,normal_pars_fragment:i_,normal_pars_vertex:r_,normal_vertex:a_,normalmap_pars_fragment:s_,clearcoat_normal_fragment_begin:o_,clearcoat_normal_fragment_maps:l_,clearcoat_pars_fragment:c_,iridescence_pars_fragment:u_,opaque_fragment:d_,packing:f_,premultiplied_alpha_fragment:h_,project_vertex:p_,dithering_fragment:m_,dithering_pars_fragment:v_,roughnessmap_fragment:g_,roughnessmap_pars_fragment:y_,shadowmap_pars_fragment:x_,shadowmap_pars_vertex:__,shadowmap_vertex:M_,shadowmask_pars_fragment:S_,skinbase_vertex:b_,skinning_pars_vertex:w_,skinning_vertex:T_,skinnormal_vertex:E_,specularmap_fragment:A_,specularmap_pars_fragment:I_,tonemapping_fragment:C_,tonemapping_pars_fragment:R_,transmission_fragment:P_,transmission_pars_fragment:L_,uv_pars_fragment:D_,uv_pars_vertex:N_,uv_vertex:U_,worldpos_vertex:F_,background_vert:O_,background_frag:B_,backgroundCube_vert:k_,backgroundCube_frag:z_,cube_vert:V_,cube_frag:G_,depth_vert:H_,depth_frag:W_,distance_vert:X_,distance_frag:Y_,equirect_vert:q_,equirect_frag:Z_,linedashed_vert:J_,linedashed_frag:$_,meshbasic_vert:K_,meshbasic_frag:Q_,meshlambert_vert:j_,meshlambert_frag:eM,meshmatcap_vert:tM,meshmatcap_frag:nM,meshnormal_vert:iM,meshnormal_frag:rM,meshphong_vert:aM,meshphong_frag:sM,meshphysical_vert:oM,meshphysical_frag:lM,meshtoon_vert:cM,meshtoon_frag:uM,points_vert:dM,points_frag:fM,shadow_vert:hM,shadow_frag:pM,sprite_vert:mM,sprite_frag:vM},At={common:{diffuse:{value:new vn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new un}},envmap:{envMap:{value:null},envMapRotation:{value:new un},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new un}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new un}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new un},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new un},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new un},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new un}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new un}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new un}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ge},probesMax:{value:new ge},probesResolution:{value:new ge}},points:{diffuse:{value:new vn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0},uvTransform:{value:new un}},sprite:{diffuse:{value:new vn(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}}},Ca={basic:{uniforms:ir([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:gn.meshbasic_vert,fragmentShader:gn.meshbasic_frag},lambert:{uniforms:ir([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new vn(0)},envMapIntensity:{value:1}}]),vertexShader:gn.meshlambert_vert,fragmentShader:gn.meshlambert_frag},phong:{uniforms:ir([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new vn(0)},specular:{value:new vn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:gn.meshphong_vert,fragmentShader:gn.meshphong_frag},standard:{uniforms:ir([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new vn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gn.meshphysical_vert,fragmentShader:gn.meshphysical_frag},toon:{uniforms:ir([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new vn(0)}}]),vertexShader:gn.meshtoon_vert,fragmentShader:gn.meshtoon_frag},matcap:{uniforms:ir([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:gn.meshmatcap_vert,fragmentShader:gn.meshmatcap_frag},points:{uniforms:ir([At.points,At.fog]),vertexShader:gn.points_vert,fragmentShader:gn.points_frag},dashed:{uniforms:ir([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gn.linedashed_vert,fragmentShader:gn.linedashed_frag},depth:{uniforms:ir([At.common,At.displacementmap]),vertexShader:gn.depth_vert,fragmentShader:gn.depth_frag},normal:{uniforms:ir([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:gn.meshnormal_vert,fragmentShader:gn.meshnormal_frag},sprite:{uniforms:ir([At.sprite,At.fog]),vertexShader:gn.sprite_vert,fragmentShader:gn.sprite_frag},background:{uniforms:{uvTransform:{value:new un},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gn.background_vert,fragmentShader:gn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new un}},vertexShader:gn.backgroundCube_vert,fragmentShader:gn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gn.cube_vert,fragmentShader:gn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gn.equirect_vert,fragmentShader:gn.equirect_frag},distance:{uniforms:ir([At.common,At.displacementmap,{referencePosition:{value:new ge},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gn.distance_vert,fragmentShader:gn.distance_frag},shadow:{uniforms:ir([At.lights,At.fog,{color:{value:new vn(0)},opacity:{value:1}}]),vertexShader:gn.shadow_vert,fragmentShader:gn.shadow_frag}};Ca.physical={uniforms:ir([Ca.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new un},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new un},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new un},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new un},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new un},sheen:{value:0},sheenColor:{value:new vn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new un},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new un},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new un},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new un},attenuationDistance:{value:0},attenuationColor:{value:new vn(0)},specularColor:{value:new vn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new un},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new un},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new un}}]),vertexShader:gn.meshphysical_vert,fragmentShader:gn.meshphysical_frag};var wd={r:0,b:0,g:0},gM=new $n,K0=new un;K0.set(-1,0,0,0,1,0,0,0,1);function yM(n,e,t,i,r,a){let s=new vn(0),o=r===!0?0:1,u,l,d=null,f=0,h=null;function v(L){let F=L.isScene===!0?L.background:null;if(F&&F.isTexture){let _=L.backgroundBlurriness>0;F=e.get(F,_)}return F}function y(L){let F=!1,_=v(L);_===null?g(s,o):_&&_.isColor&&(g(_,1),F=!0);let p=n.xr.getEnvironmentBlendMode();p==="additive"?t.buffers.color.setClear(0,0,0,1,a):p==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||F)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function T(L,F){let _=v(F);_&&(_.isCubeTexture||_.mapping===zl)?(l===void 0&&(l=new jn(new Or(1,1,1),new kr({name:"BackgroundCubeMaterial",uniforms:Bs(Ca.backgroundCube.uniforms),vertexShader:Ca.backgroundCube.vertexShader,fragmentShader:Ca.backgroundCube.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(p,S,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gM.makeRotationFromEuler(F.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(K0),l.material.toneMapped=Ln.getTransfer(_.colorSpace)!==Jn,(d!==_||f!==_.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=_,f=_.version,h=n.toneMapping),l.layers.enableAll(),L.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(u===void 0&&(u=new jn(new Pl(2,2),new kr({name:"BackgroundMaterial",uniforms:Bs(Ca.background.uniforms),vertexShader:Ca.background.vertexShader,fragmentShader:Ca.background.fragmentShader,side:ms,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=_,u.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,u.material.toneMapped=Ln.getTransfer(_.colorSpace)!==Jn,_.matrixAutoUpdate===!0&&_.updateMatrix(),u.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=_,f=_.version,h=n.toneMapping),u.layers.enableAll(),L.unshift(u,u.geometry,u.material,0,0,null))}function g(L,F){L.getRGB(wd,Sh(n)),t.buffers.color.setClear(wd.r,wd.g,wd.b,F,a)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return s},setClearColor:function(L,F=1){s.set(L),o=F,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(L){o=L,g(s,o)},render:y,addToRenderList:T,dispose:m}}function xM(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),a=r,s=!1;function o(U,Y,E,M,O){let H=!1,ee=f(U,M,E,Y);a!==ee&&(a=ee,l(a.object)),H=v(U,M,E,O),H&&y(U,M,E,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(H||s)&&(s=!1,_(U,Y,E,M),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function u(){return n.createVertexArray()}function l(U){return n.bindVertexArray(U)}function d(U){return n.deleteVertexArray(U)}function f(U,Y,E,M){let O=M.wireframe===!0,H=i[Y.id];H===void 0&&(H={},i[Y.id]=H);let ee=U.isInstancedMesh===!0?U.id:0,j=H[ee];j===void 0&&(j={},H[ee]=j);let K=j[E.id];K===void 0&&(K={},j[E.id]=K);let re=K[O];return re===void 0&&(re=h(u()),K[O]=re),re}function h(U){let Y=[],E=[],M=[];for(let O=0;O<t;O++)Y[O]=0,E[O]=0,M[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:E,attributeDivisors:M,object:U,attributes:{},index:null}}function v(U,Y,E,M){let O=a.attributes,H=Y.attributes,ee=0,j=E.getAttributes();for(let K in j)if(j[K].location>=0){let J=O[K],ne=H[K];if(ne===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(ne=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(ne=U.instanceColor)),J===void 0||J.attribute!==ne||ne&&J.data!==ne.data)return!0;ee++}return a.attributesNum!==ee||a.index!==M}function y(U,Y,E,M){let O={},H=Y.attributes,ee=0,j=E.getAttributes();for(let K in j)if(j[K].location>=0){let J=H[K];J===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(J=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(J=U.instanceColor));let ne={};ne.attribute=J,J&&J.data&&(ne.data=J.data),O[K]=ne,ee++}a.attributes=O,a.attributesNum=ee,a.index=M}function T(){let U=a.newAttributes;for(let Y=0,E=U.length;Y<E;Y++)U[Y]=0}function g(U){m(U,0)}function m(U,Y){let E=a.newAttributes,M=a.enabledAttributes,O=a.attributeDivisors;E[U]=1,M[U]===0&&(n.enableVertexAttribArray(U),M[U]=1),O[U]!==Y&&(n.vertexAttribDivisor(U,Y),O[U]=Y)}function L(){let U=a.newAttributes,Y=a.enabledAttributes;for(let E=0,M=Y.length;E<M;E++)Y[E]!==U[E]&&(n.disableVertexAttribArray(E),Y[E]=0)}function F(U,Y,E,M,O,H,ee){ee===!0?n.vertexAttribIPointer(U,Y,E,O,H):n.vertexAttribPointer(U,Y,E,M,O,H)}function _(U,Y,E,M){T();let O=M.attributes,H=E.getAttributes(),ee=Y.defaultAttributeValues;for(let j in H){let K=H[j];if(K.location>=0){let re=O[j];if(re===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(re=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(re=U.instanceColor)),re!==void 0){let J=re.normalized,ne=re.itemSize,Te=e.get(re);if(Te===void 0)continue;let fe=Te.buffer,pe=Te.type,Fe=Te.bytesPerElement,ae=pe===n.INT||pe===n.UNSIGNED_INT||re.gpuType===Bu;if(re.isInterleavedBufferAttribute){let de=re.data,_e=de.stride,Ge=re.offset;if(de.isInstancedInterleavedBuffer){for(let $e=0;$e<K.locationSize;$e++)m(K.location+$e,de.meshPerAttribute);U.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let $e=0;$e<K.locationSize;$e++)g(K.location+$e);n.bindBuffer(n.ARRAY_BUFFER,fe);for(let $e=0;$e<K.locationSize;$e++)F(K.location+$e,ne/K.locationSize,pe,J,_e*Fe,(Ge+ne/K.locationSize*$e)*Fe,ae)}else{if(re.isInstancedBufferAttribute){for(let de=0;de<K.locationSize;de++)m(K.location+de,re.meshPerAttribute);U.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let de=0;de<K.locationSize;de++)g(K.location+de);n.bindBuffer(n.ARRAY_BUFFER,fe);for(let de=0;de<K.locationSize;de++)F(K.location+de,ne/K.locationSize,pe,J,ne*Fe,ne/K.locationSize*de*Fe,ae)}}else if(ee!==void 0){let J=ee[j];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(K.location,J);break;case 3:n.vertexAttrib3fv(K.location,J);break;case 4:n.vertexAttrib4fv(K.location,J);break;default:n.vertexAttrib1fv(K.location,J)}}}}L()}function p(){I();for(let U in i){let Y=i[U];for(let E in Y){let M=Y[E];for(let O in M){let H=M[O];for(let ee in H)d(H[ee].object),delete H[ee];delete M[O]}}delete i[U]}}function S(U){if(i[U.id]===void 0)return;let Y=i[U.id];for(let E in Y){let M=Y[E];for(let O in M){let H=M[O];for(let ee in H)d(H[ee].object),delete H[ee];delete M[O]}}delete i[U.id]}function B(U){for(let Y in i){let E=i[Y];for(let M in E){let O=E[M];if(O[U.id]===void 0)continue;let H=O[U.id];for(let ee in H)d(H[ee].object),delete H[ee];delete O[U.id]}}}function b(U){for(let Y in i){let E=i[Y],M=U.isInstancedMesh===!0?U.id:0,O=E[M];if(O!==void 0){for(let H in O){let ee=O[H];for(let j in ee)d(ee[j].object),delete ee[j];delete O[H]}delete E[M],Object.keys(E).length===0&&delete i[Y]}}}function I(){z(),s=!0,a!==r&&(a=r,l(a.object))}function z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:z,dispose:p,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:B,initAttributes:T,enableAttribute:g,disableUnusedAttributes:L}}function _M(n,e,t){let i;function r(u){i=u}function a(u,l){n.drawArrays(i,u,l),t.update(l,i,1)}function s(u,l,d){d!==0&&(n.drawArraysInstanced(i,u,l,d),t.update(l,i,d))}function o(u,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,l,0,d);let h=0;for(let v=0;v<d;v++)h+=l[v];t.update(h,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function MM(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let B=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(B){return!(B!==qr&&i.convert(B)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(B){let b=B===oa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==Cr&&B!==Yr&&!b&&i.convert(B)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function u(B){if(B==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=u(l);d!==l&&(rn("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&rn("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let v=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),L=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),F=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),p=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:v,maxVertexTextures:y,maxTextureSize:T,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:L,maxVaryings:F,maxFragmentUniforms:_,maxSamples:p,samples:S}}function SM(n){let e=this,t=null,i=0,r=!1,a=!1,s=new Ur,o=new un,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let v=f.length!==0||h||i!==0||r;return r=h,i=f.length,v},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,h){t=d(f,h,0)},this.setState=function(f,h,v){let y=f.clippingPlanes,T=f.clipIntersection,g=f.clipShadows,m=n.get(f);if(!r||y===null||y.length===0||a&&!g)a?d(null):l();else{let L=a?0:i,F=L*4,_=m.clippingState||null;u.value=_,_=d(y,h,F,v);for(let p=0;p!==F;++p)_[p]=t[p];m.clippingState=_,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function l(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,v,y){let T=f!==null?f.length:0,g=null;if(T!==0){if(g=u.value,y!==!0||g===null){let m=v+T*4,L=h.matrixWorldInverse;o.getNormalMatrix(L),(g===null||g.length<m)&&(g=new Float32Array(m));for(let F=0,_=v;F!==T;++F,_+=4)s.copy(f[F]).applyMatrix4(L,o),s.normal.toArray(g,_),g[_+3]=s.constant}u.value=g,u.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,g}}var Lo=4,bM=6,wM=20,TM=256,Zl=new To,C0=new vn,Ph=null,Lh=0,Dh=0,Nh=!1,EM=new ge,ks=new ge,Ed=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:s=256,position:o=EM}=a;Ph=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,r,u,o),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=L0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=P0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ph,Lh,Dh),this._renderer.xr.enabled=Nh,e.scissorTest=!1,Po(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ph=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Hi,minFilter:Hi,generateMipmaps:!1,type:oa,format:qr,colorSpace:fl,depthBuffer:!1},r=R0(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=R0(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=AM(a)),this._blurMaterial=CM(a,e,t),this._ggxMaterial=IM(a,e,t)}return r}_compileMaterial(e){let t=new jn(new Wi,e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,i,r,a){let u=new er(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,v=f.toneMapping;f.getClearColor(C0),f.toneMapping=aa,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jn(new Or,new Ta({name:"PMREM.Background",side:pr,depthWrite:!1,depthTest:!1})));let T=this._backgroundBox,g=T.material,m=!1,L=e.background;L?L.isColor&&(g.color.copy(L),e.background=null,m=!0):(g.color.copy(C0),m=!0);for(let F=0;F<6;F++){let _=F%3;_===0?(u.up.set(0,l[F],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x+d[F],a.y,a.z)):_===1?(u.up.set(0,0,l[F]),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y+d[F],a.z)):(u.up.set(0,l[F],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y,a.z+d[F]));let p=this._cubeSize;Po(r,_*p,F>2?p:0,p,p),f.setRenderTarget(r),m&&f.render(T,u),f.render(e,u)}f.toneMapping=v,f.autoClear=h,e.background=L}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===vs||e.mapping===Os;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=L0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=P0());let a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;let o=a.uniforms;o.envMap.value=e;let u=this._cubeSize;Po(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(s,Zl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;let u=s.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),h=l*1.25,v=f*h,{_lodMax:y}=this,T=this._sizeLods[i],g=3*T*(i>y-Lo?i-y+Lo:0),m=4*(this._cubeSize-T);u.envMap.value=e.texture,u.roughness.value=v,u.mipInt.value=y-t,Po(a,g,m,3*T,2*T),r.setRenderTarget(a),r.render(o,Zl),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=y-i,Po(e,g,m,3*T,2*T),r.setRenderTarget(e),r.render(o,Zl)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){let s=this._renderer,o=this._blurMaterial,u=this._lodMeshes[r];u.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let d=this._sizeLods[r],f=3*d*(r>this._lodMax-Lo?r-this._lodMax+Lo:0),h=4*(this._cubeSize-d);Po(t,f,h,3*d,2*d),s.setRenderTarget(t),s.render(u,Zl)}};function AM(n){let e=[],t=[],i=n,r=n-Lo+1+bM;for(let a=0;a<r;a++){let s=Math.pow(2,i);e.push(s);let o=1/(s-2),u=-o,l=1+o,d=[u,u,l,u,l,l,u,u,l,l,u,l],f=6,h=6,v=3,y=new Float32Array(v*h*f),T=new Float32Array(v*h*f);for(let m=0;m<f;m++){let L=m%3*2/3-1,F=m>2?0:-1,_=[L,F,0,L+2/3,F,0,L+2/3,F+1,0,L,F,0,L+2/3,F+1,0,L,F+1,0];y.set(_,v*h*m);for(let p=0;p<h;p++){let S=d[p*2]*2-1,B=d[p*2+1]*2-1;m===0?ks.set(1,B,S):m===1?ks.set(-S,1,-B):m===2?ks.set(-S,B,1):m===3?ks.set(-1,B,-S):m===4?ks.set(-S,-1,B):ks.set(S,B,-1),ks.toArray(T,(m*h+p)*v)}}let g=new Wi;g.setAttribute("position",new Fr(y,v)),g.setAttribute("outputDirection",new Fr(T,v)),t.push(new jn(g,null)),i>Lo&&i--}return{lodMeshes:t,sizeLods:e}}function R0(n,e,t){let i=new Ar(n,e,t);return i.texture.mapping=zl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Po(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function IM(n,e,t){return new kr({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:TM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Cd(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function CM(n,e,t){return new kr({name:"SphericalGaussianBlur",defines:{SAMPLES:wM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Cd(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function P0(){return new kr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cd(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function L0(){return new kr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function Cd(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ad=class extends Ar{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Sl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Or(5,5,5),a=new kr({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pr,blending:Aa});a.uniforms.tEquirect.value=t;let s=new jn(r,a),o=t.minFilter;return t.minFilter===gs&&(t.minFilter=Hi),new Ru(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}};function RM(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,v=!1){return h==null?null:v?s(h):a(h)}function a(h){if(h&&h.isTexture){let v=h.mapping;if(v===Uu||v===Fu)if(e.has(h)){let y=e.get(h).texture;return o(y,h.mapping)}else{let y=h.image;if(y&&y.height>0){let T=new Ad(y.height);return T.fromEquirectangularTexture(n,h),e.set(h,T),h.addEventListener("dispose",l),o(T.texture,h.mapping)}else return null}}return h}function s(h){if(h&&h.isTexture){let v=h.mapping,y=v===Uu||v===Fu,T=v===vs||v===Os;if(y||T){let g=t.get(h),m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Ed(n)),g=y?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let L=h.image;return y&&L&&L.height>0||T&&L&&u(L)?(i===null&&(i=new Ed(n)),g=y?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",d),g.texture):null}}}return h}function o(h,v){return v===Uu?h.mapping=vs:v===Fu&&(h.mapping=Os),h}function u(h){let v=0,y=6;for(let T=0;T<y;T++)h[T]!==void 0&&v++;return v===y}function l(h){let v=h.target;v.removeEventListener("dispose",l);let y=e.get(v);y!==void 0&&(e.delete(v),y.dispose())}function d(h){let v=h.target;v.removeEventListener("dispose",d);let y=t.get(v);y!==void 0&&(t.delete(v),y.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function PM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Ls("WebGLRenderer: "+i+" extension not supported."),r}}}function LM(n,e,t,i){let r={},a=new WeakMap;function s(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let y in h.attributes)e.remove(h.attributes[y]);h.removeEventListener("dispose",s),delete r[h.id];let v=a.get(h);v&&(e.remove(v),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function u(f){let h=f.attributes;for(let v in h)e.update(h[v],n.ARRAY_BUFFER)}function l(f){let h=[],v=f.index,y=f.attributes.position,T=0;if(y===void 0)return;if(v!==null){let L=v.array;T=v.version;for(let F=0,_=L.length;F<_;F+=3){let p=L[F+0],S=L[F+1],B=L[F+2];h.push(p,S,S,B,B,p)}}else{let L=y.array;T=y.version;for(let F=0,_=L.length/3-1;F<_;F+=3){let p=F+0,S=F+1,B=F+2;h.push(p,S,S,B,B,p)}}let g=new(y.count>=65535?yl:gl)(h,1);g.version=T;let m=a.get(f);m&&e.remove(m),a.set(f,g)}function d(f){let h=a.get(f);if(h){let v=f.index;v!==null&&h.version<v.version&&l(f)}else l(f);return a.get(f)}return{get:o,update:u,getWireframeAttribute:d}}function DM(n,e,t){let i;function r(f){i=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function u(f,h){n.drawElements(i,h,a,f*s),t.update(h,i,1)}function l(f,h,v){v!==0&&(n.drawElementsInstanced(i,h,a,f*s,v),t.update(h,i,v))}function d(f,h,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,a,f,0,v);let T=0;for(let g=0;g<v;g++)T+=h[g];t.update(T,i,1)}this.setMode=r,this.setIndex=o,this.render=u,this.renderInstances=l,this.renderMultiDraw=d}function NM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:sn("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function UM(n,e,t){let i=new WeakMap,r=new fi;function a(s,o,u){let l=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,h=i.get(o);if(h===void 0||h.count!==f){let I=function(){B.dispose(),i.delete(o),o.removeEventListener("dispose",I)};h!==void 0&&h.texture.dispose();let v=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],L=o.morphAttributes.color||[],F=0;v===!0&&(F=1),y===!0&&(F=2),T===!0&&(F=3);let _=o.attributes.position.count*F,p=1;_>e.maxTextureSize&&(p=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*p*4*f),B=new ml(S,_,p,f);B.type=Yr,B.needsUpdate=!0;let b=F*4;for(let z=0;z<f;z++){let U=g[z],Y=m[z],E=L[z],M=_*p*4*z;for(let O=0;O<U.count;O++){let H=O*b;v===!0&&(r.fromBufferAttribute(U,O),S[M+H+0]=r.x,S[M+H+1]=r.y,S[M+H+2]=r.z,S[M+H+3]=0),y===!0&&(r.fromBufferAttribute(Y,O),S[M+H+4]=r.x,S[M+H+5]=r.y,S[M+H+6]=r.z,S[M+H+7]=0),T===!0&&(r.fromBufferAttribute(E,O),S[M+H+8]=r.x,S[M+H+9]=r.y,S[M+H+10]=r.z,S[M+H+11]=E.itemSize===4?r.w:1)}}h={count:f,texture:B,size:new kt(_,p)},i.set(o,h),o.addEventListener("dispose",I)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let v=0;for(let T=0;T<l.length;T++)v+=l[T];let y=o.morphTargetsRelative?1:1-v;u.getUniforms().setValue(n,"morphTargetBaseInfluence",y),u.getUniforms().setValue(n,"morphTargetInfluences",l)}u.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function FM(n,e,t,i,r){let a=new WeakMap;function s(l){let d=r.render.frame,f=l.geometry,h=e.get(l,f);if(a.get(h)!==d&&(e.update(h),a.set(h,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",u)===!1&&l.addEventListener("dispose",u),a.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,d))),l.isSkinnedMesh){let v=l.skeleton;a.get(v)!==d&&(v.update(),a.set(v,d))}return h}function o(){a=new WeakMap}function u(l){let d=l.target;d.removeEventListener("dispose",u),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:s,dispose:o}}var OM={[ah]:"LINEAR_TONE_MAPPING",[sh]:"REINHARD_TONE_MAPPING",[oh]:"CINEON_TONE_MAPPING",[lh]:"ACES_FILMIC_TONE_MAPPING",[uh]:"AGX_TONE_MAPPING",[dh]:"NEUTRAL_TONE_MAPPING",[ch]:"CUSTOM_TONE_MAPPING"};function BM(n,e,t,i,r,a){let s=new Ar(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,u=null,l=new Wi;l.setAttribute("position",new Xn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Xn([0,2,0,0,2,0],2));let d=new vu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new jn(l,d),h=new To(-1,1,1,-1,0,1),v=null,y=null,T=!1,g,m=null,L=[],F=!1;this.setSize=function(_,p){s.setSize(_,p),o!==null&&o.setSize(_,p),u!==null&&u.setSize(_,p);for(let S=0;S<L.length;S++){let B=L[S];B.setSize&&B.setSize(_,p)}},this.setEffects=function(_){L=_,F=L.length>0&&L[0].isRenderPass===!0;let p=s.width,S=s.height;L.length>0&&o===null&&(o=new Ar(p,S,{type:oa,depthBuffer:!1,stencilBuffer:!1}),u=new Ar(p,S,{type:oa,depthBuffer:!1,stencilBuffer:!1}));for(let B=0;B<L.length;B++){let b=L[B];b.setSize&&b.setSize(p,S)}},this.begin=function(_,p){if(T||_.toneMapping===aa&&L.length===0)return!1;if(m=p,p!==null){let S=p.width,B=p.height;(s.width!==S||s.height!==B)&&this.setSize(S,B)}return F===!1&&_.setRenderTarget(s),g=_.toneMapping,_.toneMapping=aa,!0},this.hasRenderPass=function(){return F},this.end=function(_,p){_.toneMapping=g,T=!0;let S=s,B=o;for(let b=0;b<L.length;b++){let I=L[b];I.enabled!==!1&&(I.render(_,B,S,p),I.needsSwap!==!1&&(S=B,B=B===o?u:o))}if(v!==_.outputColorSpace||y!==_.toneMapping){v=_.outputColorSpace,y=_.toneMapping,d.defines={},Ln.getTransfer(v)===Jn&&(d.defines.SRGB_TRANSFER="");let b=OM[y];b&&(d.defines[b]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(m),_.render(f,h),m=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),u!==null&&u.dispose(),l.dispose(),d.dispose()}}var Q0=new tr,Oh=new us(1,1),j0=new ml,ev=new lu,tv=new Sl,D0=[],N0=[],U0=new Float32Array(16),F0=new Float32Array(9),O0=new Float32Array(4);function No(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,a=D0[r];if(a===void 0&&(a=new Float32Array(r),D0[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Ri(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pi(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Rd(n,e){let t=N0[e];t===void 0&&(t=new Int32Array(e),N0[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function kM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function zM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ri(t,e))return;n.uniform2fv(this.addr,e),Pi(t,e)}}function VM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ri(t,e))return;n.uniform3fv(this.addr,e),Pi(t,e)}}function GM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ri(t,e))return;n.uniform4fv(this.addr,e),Pi(t,e)}}function HM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ri(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pi(t,e)}else{if(Ri(t,i))return;O0.set(i),n.uniformMatrix2fv(this.addr,!1,O0),Pi(t,i)}}function WM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ri(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pi(t,e)}else{if(Ri(t,i))return;F0.set(i),n.uniformMatrix3fv(this.addr,!1,F0),Pi(t,i)}}function XM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ri(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pi(t,e)}else{if(Ri(t,i))return;U0.set(i),n.uniformMatrix4fv(this.addr,!1,U0),Pi(t,i)}}function YM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ri(t,e))return;n.uniform2iv(this.addr,e),Pi(t,e)}}function ZM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ri(t,e))return;n.uniform3iv(this.addr,e),Pi(t,e)}}function JM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ri(t,e))return;n.uniform4iv(this.addr,e),Pi(t,e)}}function $M(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function KM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ri(t,e))return;n.uniform2uiv(this.addr,e),Pi(t,e)}}function QM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ri(t,e))return;n.uniform3uiv(this.addr,e),Pi(t,e)}}function jM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ri(t,e))return;n.uniform4uiv(this.addr,e),Pi(t,e)}}function eS(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Oh.compareFunction=t.isReversedDepthBuffer()?bd:Sd,a=Oh):a=Q0,t.setTexture2D(e||a,r)}function tS(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ev,r)}function nS(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||tv,r)}function iS(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||j0,r)}function rS(n){switch(n){case 5126:return kM;case 35664:return zM;case 35665:return VM;case 35666:return GM;case 35674:return HM;case 35675:return WM;case 35676:return XM;case 5124:case 35670:return YM;case 35667:case 35671:return qM;case 35668:case 35672:return ZM;case 35669:case 35673:return JM;case 5125:return $M;case 36294:return KM;case 36295:return QM;case 36296:return jM;case 35678:case 36198:case 36298:case 36306:case 35682:return eS;case 35679:case 36299:case 36307:return tS;case 35680:case 36300:case 36308:case 36293:return nS;case 36289:case 36303:case 36311:case 36292:return iS}}function aS(n,e){n.uniform1fv(this.addr,e)}function sS(n,e){let t=No(e,this.size,2);n.uniform2fv(this.addr,t)}function oS(n,e){let t=No(e,this.size,3);n.uniform3fv(this.addr,t)}function lS(n,e){let t=No(e,this.size,4);n.uniform4fv(this.addr,t)}function cS(n,e){let t=No(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function uS(n,e){let t=No(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function dS(n,e){let t=No(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function fS(n,e){n.uniform1iv(this.addr,e)}function hS(n,e){n.uniform2iv(this.addr,e)}function pS(n,e){n.uniform3iv(this.addr,e)}function mS(n,e){n.uniform4iv(this.addr,e)}function vS(n,e){n.uniform1uiv(this.addr,e)}function gS(n,e){n.uniform2uiv(this.addr,e)}function yS(n,e){n.uniform3uiv(this.addr,e)}function xS(n,e){n.uniform4uiv(this.addr,e)}function _S(n,e,t){let i=this.cache,r=e.length,a=Rd(t,r);Ri(i,a)||(n.uniform1iv(this.addr,a),Pi(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=Oh:s=Q0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function MS(n,e,t){let i=this.cache,r=e.length,a=Rd(t,r);Ri(i,a)||(n.uniform1iv(this.addr,a),Pi(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||ev,a[s])}function SS(n,e,t){let i=this.cache,r=e.length,a=Rd(t,r);Ri(i,a)||(n.uniform1iv(this.addr,a),Pi(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||tv,a[s])}function bS(n,e,t){let i=this.cache,r=e.length,a=Rd(t,r);Ri(i,a)||(n.uniform1iv(this.addr,a),Pi(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||j0,a[s])}function wS(n){switch(n){case 5126:return aS;case 35664:return sS;case 35665:return oS;case 35666:return lS;case 35674:return cS;case 35675:return uS;case 35676:return dS;case 5124:case 35670:return fS;case 35667:case 35671:return hS;case 35668:case 35672:return pS;case 35669:case 35673:return mS;case 5125:return vS;case 36294:return gS;case 36295:return yS;case 36296:return xS;case 35678:case 36198:case 36298:case 36306:case 35682:return _S;case 35679:case 36299:case 36307:return MS;case 35680:case 36300:case 36308:case 36293:return SS;case 36289:case 36303:case 36311:case 36292:return bS}}var Bh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=rS(t.type)}},kh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wS(t.type)}},zh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let o=r[a];o.setValue(e,t[o.id],i)}}},Uh=/(\w+)(\])?(\[|\.)?/g;function B0(n,e){n.seq.push(e),n.map[e.id]=e}function TS(n,e,t){let i=n.name,r=i.length;for(Uh.lastIndex=0;;){let a=Uh.exec(i),s=Uh.lastIndex,o=a[1],u=a[2]==="]",l=a[3];if(u&&(o=o|0),l===void 0||l==="["&&s+2===r){B0(t,l===void 0?new Bh(o,n,e):new kh(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new zh(o),B0(t,f)),t=f}}}var Do=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let o=e.getActiveUniform(t,s),u=e.getUniformLocation(t,o.name);TS(o,u,this)}let r=[],a=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){let o=t[a],u=i[o.id];u.needsUpdate!==!1&&o.setValue(e,u.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function k0(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var ES=37297,AS=0;function IS(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){let o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}var z0=new un;function CS(n){Ln._getMatrix(z0,Ln.workingColorSpace,n);let e=`mat3( ${z0.elements.map(t=>t.toFixed(4))} )`;switch(Ln.getTransfer(n)){case hl:return[e,"LinearTransferOETF"];case Jn:return[e,"sRGBTransferOETF"];default:return rn("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function V0(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+IS(n.getShaderSource(e),o)}else return a}function RS(n,e){let t=CS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var PS={[ah]:"Linear",[sh]:"Reinhard",[oh]:"Cineon",[lh]:"ACESFilmic",[uh]:"AgX",[dh]:"Neutral",[ch]:"Custom"};function LS(n,e){let t=PS[e];return t===void 0?(rn("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Td=new ge;function DS(){Ln.getLuminanceCoefficients(Td);let n=Td.x.toFixed(4),e=Td.y.toFixed(4),t=Td.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($l).join(`
`)}function US(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function FS(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let a=n.getActiveAttrib(e,r),s=a.name,o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function $l(n){return n!==""}function G0(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function H0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var OS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vh(n){return n.replace(OS,kS)}var BS=new Map;function kS(n,e){let t=gn[e];if(t===void 0){let i=BS.get(e);if(i!==void 0)t=gn[i],rn('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Vh(t)}var zS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function W0(n){return n.replace(zS,VS)}function VS(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function X0(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var GS={[kl]:"SHADOWMAP_TYPE_PCF",[Eo]:"SHADOWMAP_TYPE_VSM"};function HS(n){return GS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var WS={[vs]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[zl]:"ENVMAP_TYPE_CUBE_UV"};function XS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":WS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var YS={[Os]:"ENVMAP_MODE_REFRACTION"};function qS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":YS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ZS={[Nu]:"ENVMAP_BLENDING_MULTIPLY",[r0]:"ENVMAP_BLENDING_MIX",[a0]:"ENVMAP_BLENDING_ADD"};function JS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ZS[n.combine]||"ENVMAP_BLENDING_NONE"}function $S(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function KS(n,e,t,i){let r=n.getContext(),a=t.defines,s=t.vertexShader,o=t.fragmentShader,u=HS(t),l=XS(t),d=qS(t),f=JS(t),h=$S(t),v=NS(t),y=US(a),T=r.createProgram(),g,m,L=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter($l).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter($l).join(`
`),m.length>0&&(m+=`
`)):(g=[X0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($l).join(`
`),m=[X0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==aa?"#define TONE_MAPPING":"",t.toneMapping!==aa?gn.tonemapping_pars_fragment:"",t.toneMapping!==aa?LS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gn.colorspace_pars_fragment,RS("linearToOutputTexel",t.outputColorSpace),DS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($l).join(`
`)),s=Vh(s),s=G0(s,t),s=H0(s,t),o=Vh(o),o=G0(o,t),o=H0(o,t),s=W0(s),o=W0(o),t.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,g=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let F=L+g+s,_=L+m+o,p=k0(r,r.VERTEX_SHADER,F),S=k0(r,r.FRAGMENT_SHADER,_);r.attachShader(T,p),r.attachShader(T,S),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function B(U){if(n.debug.checkShaderErrors){let Y=r.getProgramInfoLog(T)||"",E=r.getShaderInfoLog(p)||"",M=r.getShaderInfoLog(S)||"",O=Y.trim(),H=E.trim(),ee=M.trim(),j=!0,K=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,T,p,S);else{let re=V0(r,p,"vertex"),J=V0(r,S,"fragment");sn("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+O+`
`+re+`
`+J)}else O!==""?rn("WebGLProgram: Program Info Log:",O):(H===""||ee==="")&&(K=!1);K&&(U.diagnostics={runnable:j,programLog:O,vertexShader:{log:H,prefix:g},fragmentShader:{log:ee,prefix:m}})}r.deleteShader(p),r.deleteShader(S),b=new Do(r,T),I=FS(r,T)}let b;this.getUniforms=function(){return b===void 0&&B(this),b};let I;this.getAttributes=function(){return I===void 0&&B(this),I};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(T,ES)),z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=AS++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=p,this.fragmentShader=S,this}var QS=0,Gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Hh(e),t.set(e,i)),i}},Hh=class{constructor(e){this.id=QS++,this.code=e,this.usedTimes=0}};function jS(n){return n===xs||n===Yl||n===ql}function eb(n,e,t,i,r,a){let s=new go,o=new Gh,u=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer,h=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return u.add(b),b===0?"uv":`uv${b}`}function T(b,I,z,U,Y,E){let M=U.fog,O=Y.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?U.environment:null,ee=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,j=e.get(b.envMap||H,ee),K=j&&j.mapping===zl?j.image.height:null,re=v[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&rn("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let J=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ne=J!==void 0?J.length:0,Te=0;O.morphAttributes.position!==void 0&&(Te=1),O.morphAttributes.normal!==void 0&&(Te=2),O.morphAttributes.color!==void 0&&(Te=3);let fe,pe,Fe,ae;if(re){let cn=Ca[re];fe=cn.vertexShader,pe=cn.fragmentShader}else{fe=b.vertexShader,pe=b.fragmentShader;let cn=o.getVertexShaderStage(b),dn=o.getFragmentShaderStage(b);o.update(b,cn,dn),Fe=cn.id,ae=dn.id}let de=n.getRenderTarget(),_e=n.state.buffers.depth.getReversed(),Ge=Y.isInstancedMesh===!0,$e=Y.isBatchedMesh===!0,ut=!!b.map,zt=!!b.matcap,ct=!!j,Tt=!!b.aoMap,Zt=!!b.lightMap,wt=!!b.bumpMap&&b.wireframe===!1,bt=!!b.normalMap,_t=!!b.displacementMap,ln=!!b.emissiveMap,rt=!!b.metalnessMap,an=!!b.roughnessMap,se=b.anisotropy>0,mn=b.clearcoat>0,nn=b.dispersion>0,W=b.retroreflectivity>0,w=b.iridescence>0,ue=b.sheen>0,ye=b.transmission>0,we=se&&!!b.anisotropyMap,ze=mn&&!!b.clearcoatMap,Ye=mn&&!!b.clearcoatNormalMap,Re=mn&&!!b.clearcoatRoughnessMap,Ae=w&&!!b.iridescenceMap,Ne=w&&!!b.iridescenceThicknessMap,je=ue&&!!b.sheenColorMap,Ve=ue&&!!b.sheenRoughnessMap,qe=!!b.specularMap,ot=!!b.specularColorMap,pt=!!b.specularIntensityMap,He=ye&&!!b.transmissionMap,ie=ye&&!!b.thicknessMap,Oe=!!b.gradientMap,Pe=!!b.alphaMap,nt=b.alphaTest>0,dt=!!b.alphaHash,Be=!!b.extensions,Rt=aa;b.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Rt=n.toneMapping);let vt={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:fe,fragmentShader:pe,defines:b.defines,customVertexShaderID:Fe,customFragmentShaderID:ae,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:$e,batchingColor:$e&&Y._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&Y.instanceColor!==null,instancingMorph:Ge&&Y.morphTexture!==null,outputColorSpace:de===null?n.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ln.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:ut,matcap:zt,envMap:ct,envMapMode:ct&&j.mapping,envMapCubeUVHeight:K,aoMap:Tt,lightMap:Zt,bumpMap:wt,normalMap:bt,displacementMap:_t,emissiveMap:ln,normalMapObjectSpace:bt&&b.normalMapType===l0,normalMapTangentSpace:bt&&b.normalMapType===Md,packedNormalMap:bt&&b.normalMapType===Md&&jS(b.normalMap.format),metalnessMap:rt,roughnessMap:an,anisotropy:se,anisotropyMap:we,clearcoat:mn,clearcoatMap:ze,clearcoatNormalMap:Ye,clearcoatRoughnessMap:Re,dispersion:nn,retroreflection:W,iridescence:w,iridescenceMap:Ae,iridescenceThicknessMap:Ne,sheen:ue,sheenColorMap:je,sheenRoughnessMap:Ve,specularMap:qe,specularColorMap:ot,specularIntensityMap:pt,transmission:ye,transmissionMap:He,thicknessMap:ie,gradientMap:Oe,opaque:b.transparent===!1&&b.blending===Ao&&b.alphaToCoverage===!1,alphaMap:Pe,alphaTest:nt,alphaHash:dt,combine:b.combine,mapUv:ut&&y(b.map.channel),aoMapUv:Tt&&y(b.aoMap.channel),lightMapUv:Zt&&y(b.lightMap.channel),bumpMapUv:wt&&y(b.bumpMap.channel),normalMapUv:bt&&y(b.normalMap.channel),displacementMapUv:_t&&y(b.displacementMap.channel),emissiveMapUv:ln&&y(b.emissiveMap.channel),metalnessMapUv:rt&&y(b.metalnessMap.channel),roughnessMapUv:an&&y(b.roughnessMap.channel),anisotropyMapUv:we&&y(b.anisotropyMap.channel),clearcoatMapUv:ze&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:je&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&y(b.sheenRoughnessMap.channel),specularMapUv:qe&&y(b.specularMap.channel),specularColorMapUv:ot&&y(b.specularColorMap.channel),specularIntensityMapUv:pt&&y(b.specularIntensityMap.channel),transmissionMapUv:He&&y(b.transmissionMap.channel),thicknessMapUv:ie&&y(b.thicknessMap.channel),alphaMapUv:Pe&&y(b.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(bt||se),vertexNormals:!!O.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!O.attributes.uv&&(ut||Pe),fog:!!M,useFog:b.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||O.attributes.normal===void 0&&bt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_e,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Te,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:E.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Rt,decodeVideoTexture:ut&&b.map.isVideoTexture===!0&&Ln.getTransfer(b.map.colorSpace)===Jn,decodeVideoTextureEmissive:ln&&b.emissiveMap.isVideoTexture===!0&&Ln.getTransfer(b.emissiveMap.colorSpace)===Jn,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ir,flipSided:b.side===pr,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Be&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&b.extensions.multiDraw===!0||$e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return vt.vertexUv1s=u.has(1),vt.vertexUv2s=u.has(2),vt.vertexUv3s=u.has(3),u.clear(),vt}function g(b){let I=[];if(b.shaderID?I.push(b.shaderID):(I.push(b.customVertexShaderID),I.push(b.customFragmentShaderID)),b.defines!==void 0)for(let z in b.defines)I.push(z),I.push(b.defines[z]);return b.isRawShaderMaterial===!1&&(m(I,b),L(I,b),I.push(n.outputColorSpace)),I.push(b.customProgramCacheKey),I.join()}function m(b,I){b.push(I.precision),b.push(I.outputColorSpace),b.push(I.envMapMode),b.push(I.envMapCubeUVHeight),b.push(I.mapUv),b.push(I.alphaMapUv),b.push(I.lightMapUv),b.push(I.aoMapUv),b.push(I.bumpMapUv),b.push(I.normalMapUv),b.push(I.displacementMapUv),b.push(I.emissiveMapUv),b.push(I.metalnessMapUv),b.push(I.roughnessMapUv),b.push(I.anisotropyMapUv),b.push(I.clearcoatMapUv),b.push(I.clearcoatNormalMapUv),b.push(I.clearcoatRoughnessMapUv),b.push(I.iridescenceMapUv),b.push(I.iridescenceThicknessMapUv),b.push(I.sheenColorMapUv),b.push(I.sheenRoughnessMapUv),b.push(I.specularMapUv),b.push(I.specularColorMapUv),b.push(I.specularIntensityMapUv),b.push(I.transmissionMapUv),b.push(I.thicknessMapUv),b.push(I.combine),b.push(I.fogExp2),b.push(I.sizeAttenuation),b.push(I.morphTargetsCount),b.push(I.morphAttributeCount),b.push(I.numSunLights),b.push(I.numDirLights),b.push(I.numPointLights),b.push(I.numSpotLights),b.push(I.numSpotLightMaps),b.push(I.numHemiLights),b.push(I.numRectAreaLights),b.push(I.numSunLightShadows),b.push(I.numDirLightShadows),b.push(I.numPointLightShadows),b.push(I.numSpotLightShadows),b.push(I.numSpotLightShadowsWithMaps),b.push(I.numLightProbes),b.push(I.shadowMapType),b.push(I.toneMapping),b.push(I.numClippingPlanes),b.push(I.numClipIntersection),b.push(I.depthPacking)}function L(b,I){s.disableAll(),I.instancing&&s.enable(0),I.instancingColor&&s.enable(1),I.instancingMorph&&s.enable(2),I.matcap&&s.enable(3),I.envMap&&s.enable(4),I.normalMapObjectSpace&&s.enable(5),I.normalMapTangentSpace&&s.enable(6),I.clearcoat&&s.enable(7),I.iridescence&&s.enable(8),I.alphaTest&&s.enable(9),I.vertexColors&&s.enable(10),I.vertexAlphas&&s.enable(11),I.vertexUv1s&&s.enable(12),I.vertexUv2s&&s.enable(13),I.vertexUv3s&&s.enable(14),I.vertexTangents&&s.enable(15),I.anisotropy&&s.enable(16),I.alphaHash&&s.enable(17),I.batching&&s.enable(18),I.dispersion&&s.enable(19),I.retroreflection&&s.enable(24),I.batchingColor&&s.enable(20),I.gradientMap&&s.enable(21),I.packedNormalMap&&s.enable(22),I.vertexNormals&&s.enable(23),b.push(s.mask),s.disableAll(),I.fog&&s.enable(0),I.useFog&&s.enable(1),I.flatShading&&s.enable(2),I.logarithmicDepthBuffer&&s.enable(3),I.reversedDepthBuffer&&s.enable(4),I.skinning&&s.enable(5),I.morphTargets&&s.enable(6),I.morphNormals&&s.enable(7),I.morphColors&&s.enable(8),I.premultipliedAlpha&&s.enable(9),I.shadowMapEnabled&&s.enable(10),I.doubleSided&&s.enable(11),I.flipSided&&s.enable(12),I.useDepthPacking&&s.enable(13),I.dithering&&s.enable(14),I.transmission&&s.enable(15),I.sheen&&s.enable(16),I.opaque&&s.enable(17),I.pointsUvs&&s.enable(18),I.decodeVideoTexture&&s.enable(19),I.decodeVideoTextureEmissive&&s.enable(20),I.alphaToCoverage&&s.enable(21),I.numLightProbeGrids>0&&s.enable(22),I.hasPositionAttribute&&s.enable(23),b.push(s.mask)}function F(b){let I=v[b.type],z;if(I){let U=Ca[I];z=E0.clone(U.uniforms)}else z=b.uniforms;return z}function _(b,I){let z=d.get(I);return z!==void 0?++z.usedTimes:(z=new KS(n,I,b,r),l.push(z),d.set(I,z)),z}function p(b){if(--b.usedTimes===0){let I=l.indexOf(b);l[I]=l[l.length-1],l.pop(),d.delete(b.cacheKey),b.destroy()}}function S(b){o.remove(b)}function B(){o.dispose()}return{getParameters:T,getProgramCacheKey:g,getUniforms:F,acquireProgram:_,releaseProgram:p,releaseShaderCache:S,programs:l,dispose:B}}function tb(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,u){n.get(s)[o]=u}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function nb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Y0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function q0(){let n=[],e=0,t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(h){let v=0;return h.isInstancedMesh&&(v+=2),h.isSkinnedMesh&&(v+=1),v}function o(h,v,y,T,g,m){let L=n[e];return L===void 0?(L={id:h.id,object:h,geometry:v,material:y,materialVariant:s(h),groupOrder:T,renderOrder:h.renderOrder,z:g,group:m},n[e]=L):(L.id=h.id,L.object=h,L.geometry=v,L.material=y,L.materialVariant=s(h),L.groupOrder=T,L.renderOrder=h.renderOrder,L.z=g,L.group=m),e++,L}function u(h,v,y,T,g,m,L){L.reversedDepth===!0&&(g=-g);let F=o(h,v,y,T,g,m);y.transmission>0?i.push(F):y.transparent===!0?r.push(F):t.push(F)}function l(h,v,y,T,g,m){let L=o(h,v,y,T,g,m);y.transmission>0?i.unshift(L):y.transparent===!0?r.unshift(L):t.unshift(L)}function d(h,v){t.length>1&&t.sort(h||nb),i.length>1&&i.sort(v||Y0),r.length>1&&r.sort(v||Y0)}function f(){for(let h=e,v=n.length;h<v;h++){let y=n[h];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:u,unshift:l,finish:f,sort:d}}function ib(){let n=new WeakMap;function e(i,r){let a=n.get(i),s;return a===void 0?(s=new q0,n.set(i,[s])):r>=a.length?(s=new q0,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function rb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new ge,color:new vn};break;case"SpotLight":t={position:new ge,direction:new ge,color:new vn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ge,color:new vn,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ge,skyColor:new vn,groundColor:new vn};break;case"RectAreaLight":t={color:new vn,position:new ge,halfWidth:new ge,halfHeight:new ge};break}return n[e.id]=t,t}}}function ab(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var sb=0;function ob(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function lb(n){let e=new rb,t=ab(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new ge);let r=new ge,a=new $n,s=new $n;function o(l){let d=0,f=0,h=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let v=0,y=0,T=0,g=0,m=0,L=0,F=0,_=0,p=0,S=0,B=0,b=0,I=0,z=0;l.sort(ob);for(let Y=0,E=l.length;Y<E;Y++){let M=l[Y],O=M.color,H=M.intensity,ee=M.distance,j=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===xs?j=M.shadow.map.texture:j=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)d+=O.r*H,f+=O.g*H,h+=O.b*H;else if(M.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(M.sh.coefficients[K],H);z++}else if(M.isSunLight){let K=e.get(M);if(K.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let re=M.shadow,J=t.get(M);J.shadowIntensity=re.intensity,J.shadowBias=re.bias,J.shadowNormalBias=re.normalBias,J.shadowRadius=re.radius,J.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),i.sunShadow[y]=J,i.sunShadowMap[y]=j;let ne=re.getViewportCount();for(let Te=0;Te<ne;Te++)i.sunShadowMatrix[T+Te]=re.getMatrix(Te),i.sunShadowCascade[T+Te]=re._cascadeData[Te];T+=ne,y++}i.sun[v]=K,v++}else if(M.isDirectionalLight){let K=e.get(M);if(K.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let re=M.shadow,J=t.get(M);J.shadowIntensity=re.intensity,J.shadowBias=re.bias,J.shadowNormalBias=re.normalBias,J.shadowRadius=re.radius,J.shadowMapSize=re.mapSize,i.directionalShadow[g]=J,i.directionalShadowMap[g]=j,i.directionalShadowMatrix[g]=M.shadow.matrix,p++}i.directional[g]=K,g++}else if(M.isSpotLight){let K=e.get(M);K.position.setFromMatrixPosition(M.matrixWorld),K.color.copy(O).multiplyScalar(H),K.distance=ee,K.coneCos=Math.cos(M.angle),K.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),K.decay=M.decay,i.spot[L]=K;let re=M.shadow;if(M.map&&(i.spotLightMap[b]=M.map,b++,re.updateMatrices(M),M.castShadow&&I++),i.spotLightMatrix[L]=re.matrix,M.castShadow){let J=t.get(M);J.shadowIntensity=re.intensity,J.shadowBias=re.bias,J.shadowNormalBias=re.normalBias,J.shadowRadius=re.radius,J.shadowMapSize=re.mapSize,i.spotShadow[L]=J,i.spotShadowMap[L]=j,B++}L++}else if(M.isRectAreaLight){let K=e.get(M);K.color.copy(O).multiplyScalar(H),K.halfWidth.set(M.width*.5,0,0),K.halfHeight.set(0,M.height*.5,0),i.rectArea[F]=K,F++}else if(M.isPointLight){let K=e.get(M);if(K.color.copy(M.color).multiplyScalar(M.intensity),K.distance=M.distance,K.decay=M.decay,M.castShadow){let re=M.shadow,J=t.get(M);J.shadowIntensity=re.intensity,J.shadowBias=re.bias,J.shadowNormalBias=re.normalBias,J.shadowRadius=re.radius,J.shadowMapSize=re.mapSize,J.shadowCameraNear=re.camera.near,J.shadowCameraFar=re.camera.far,i.pointShadow[m]=J,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=M.shadow.matrix,S++}i.point[m]=K,m++}else if(M.isHemisphereLight){let K=e.get(M);K.skyColor.copy(M.color).multiplyScalar(H),K.groundColor.copy(M.groundColor).multiplyScalar(H),i.hemi[_]=K,_++}}F>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=h;let U=i.hash;(U.sunLength!==v||U.directionalLength!==g||U.pointLength!==m||U.spotLength!==L||U.rectAreaLength!==F||U.hemiLength!==_||U.numSunShadows!==y||U.numDirectionalShadows!==p||U.numPointShadows!==S||U.numSpotShadows!==B||U.numSpotMaps!==b||U.numLightProbes!==z)&&(i.sun.length=v,i.directional.length=g,i.spot.length=L,i.rectArea.length=F,i.point.length=m,i.hemi.length=_,i.sunShadow.length=y,i.sunShadowMap.length=y,i.sunShadowMatrix.length=T,i.sunShadowCascade.length=T,i.directionalShadow.length=p,i.directionalShadowMap.length=p,i.directionalShadowMatrix.length=p,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=B,i.spotShadowMap.length=B,i.spotLightMatrix.length=B+b-I,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=z,U.sunLength=v,U.directionalLength=g,U.pointLength=m,U.spotLength=L,U.rectAreaLength=F,U.hemiLength=_,U.numSunShadows=y,U.numDirectionalShadows=p,U.numPointShadows=S,U.numSpotShadows=B,U.numSpotMaps=b,U.numLightProbes=z,i.version=sb++)}function u(l,d){let f=0,h=0,v=0,y=0,T=0,g=0,m=d.matrixWorldInverse;for(let L=0,F=l.length;L<F;L++){let _=l[L];if(_.isSunLight){let p=i.sun[f];p.direction.setFromMatrixPosition(_.matrixWorld),p.direction.transformDirection(m),f++}else if(_.isDirectionalLight){let p=i.directional[h];p.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),p.direction.sub(r),p.direction.transformDirection(m),h++}else if(_.isSpotLight){let p=i.spot[y];p.position.setFromMatrixPosition(_.matrixWorld),p.position.applyMatrix4(m),p.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),p.direction.sub(r),p.direction.transformDirection(m),y++}else if(_.isRectAreaLight){let p=i.rectArea[T];p.position.setFromMatrixPosition(_.matrixWorld),p.position.applyMatrix4(m),s.identity(),a.copy(_.matrixWorld),a.premultiply(m),s.extractRotation(a),p.halfWidth.set(_.width*.5,0,0),p.halfHeight.set(0,_.height*.5,0),p.halfWidth.applyMatrix4(s),p.halfHeight.applyMatrix4(s),T++}else if(_.isPointLight){let p=i.point[v];p.position.setFromMatrixPosition(_.matrixWorld),p.position.applyMatrix4(m),v++}else if(_.isHemisphereLight){let p=i.hemi[g];p.direction.setFromMatrixPosition(_.matrixWorld),p.direction.transformDirection(m),g++}}}return{setup:o,setupView:u,state:i}}function Z0(n){let e=new lb(n),t=[],i=[],r=[];function a(h){f.camera=h,t.length=0,i.length=0,r.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function u(h){r.push(h)}function l(){e.setup(t)}function d(h){e.setupView(t,h)}let f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:l,setupLightsView:d,pushLight:s,pushShadow:o,pushLightProbeGrid:u}}function cb(n){let e=new WeakMap;function t(r,a=0){let s=e.get(r),o;return s===void 0?(o=new Z0(n),e.set(r,[o])):a>=s.length?(o=new Z0(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var ub=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,db=`uniform sampler2D shadow_pass;
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
}`,fb=[new ge(1,0,0),new ge(-1,0,0),new ge(0,1,0),new ge(0,-1,0),new ge(0,0,1),new ge(0,0,-1)],hb=[new ge(0,-1,0),new ge(0,-1,0),new ge(0,0,1),new ge(0,0,-1),new ge(0,-1,0),new ge(0,-1,0)],J0=new $n,Jl=new ge,Fh=new ge;function pb(n,e,t){let i=new xo,r=new kt,a=new kt,s=new fi,o=new gu,u=new yu,l={},d=t.maxTextureSize,f={[ms]:pr,[pr]:ms,[Ir]:Ir},h=new kr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:ub,fragmentShader:db}),v=h.clone();v.defines.HORIZONTAL_PASS=1;let y=new Wi;y.setAttribute("position",new Fr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new jn(y,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let m=this.type;this.render=function(S,B,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Du&&(rn("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=kl);let I=n.getRenderTarget(),z=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(Aa),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let E=m!==this.type;E&&B.traverse(function(M){M.material&&(Array.isArray(M.material)?M.material.forEach(O=>O.needsUpdate=!0):M.material.needsUpdate=!0)});for(let M=0,O=S.length;M<O;M++){let H=S[M],ee=H.shadow;if(ee===void 0){rn("WebGLShadowMap:",H,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);let j=ee.getFrameExtents();r.multiply(j),a.copy(ee.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/j.x),r.x=a.x*j.x,ee.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/j.y),r.y=a.y*j.y,ee.mapSize.y=a.y));let K=n.state.buffers.depth.getReversed();if(ee.camera._reversedDepth=K,ee.map===null||E===!0){if(ee.map!==null&&(ee.map.depthTexture!==null&&(ee.map.depthTexture.dispose(),ee.map.depthTexture=null),ee.map.dispose()),this.type===Eo){if(H.isPointLight){rn("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ee.map=new Ar(r.x,r.y,{format:xs,type:oa,minFilter:Hi,magFilter:Hi,generateMipmaps:!1}),ee.map.texture.name=H.name+".shadowMap",ee.map.depthTexture=new us(r.x,r.y,Yr),ee.map.depthTexture.name=H.name+".shadowMapDepth",ee.map.depthTexture.format=Ma,ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=Bi,ee.map.depthTexture.magFilter=Bi}else H.isPointLight?(ee.map=new Ad(r.x),ee.map.depthTexture=new cu(r.x,sa)):(ee.map=new Ar(r.x,r.y),ee.map.depthTexture=new us(r.x,r.y,sa)),ee.map.depthTexture.name=H.name+".shadowMap",ee.map.depthTexture.format=Ma,this.type===kl?(ee.map.depthTexture.compareFunction=K?bd:Sd,ee.map.depthTexture.minFilter=Hi,ee.map.depthTexture.magFilter=Hi):(ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=Bi,ee.map.depthTexture.magFilter=Bi);ee.camera.updateProjectionMatrix()}ee.map.isWebGLCubeRenderTarget!==!0&&(ee.map.width!==r.x||ee.map.height!==r.y)&&ee.map.setSize(r.x,r.y);let re=ee.map.isWebGLCubeRenderTarget?6:ee.getViewportCount();H.isPointLight!==!0&&ee.updateMatrices(H,b);for(let J=0;J<re;J++){let ne=ee.getCamera(J);if(H.isPointLight){let Te=ee.camera,fe=ee.matrix,pe=H.distance||Te.far;pe!==Te.far&&(Te.far=pe,Te.updateProjectionMatrix()),Jl.setFromMatrixPosition(H.matrixWorld),Te.position.copy(Jl),Fh.copy(Te.position),Fh.add(fb[J]),Te.up.copy(hb[J]),Te.lookAt(Fh),Te.updateMatrixWorld(),fe.makeTranslation(-Jl.x,-Jl.y,-Jl.z),J0.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),ee._frustum.setFromProjectionMatrix(J0,Te.coordinateSystem,Te.reversedDepth)}if(ee.map.isWebGLCubeRenderTarget)n.setRenderTarget(ee.map,J),n.clear();else{J===0&&(n.setRenderTarget(ee.map),n.clear());let Te=ee.getViewport(J);s.set(a.x*Te.x,a.y*Te.y,a.x*Te.z,a.y*Te.w),Y.viewport(s)}i=ee.getFrustum(J),_(B,b,ne,H,this.type)}ee.isPointLightShadow!==!0&&this.type===Eo&&L(ee,b),ee.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(I,z,U)};function L(S,B){let b=e.update(T);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,v.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,v.needsUpdate=!0),S.mapPass===null?S.mapPass=new Ar(r.x,r.y,{format:xs,type:oa}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(B,null,b,h,T,null),v.uniforms.shadow_pass.value=S.mapPass.texture,v.uniforms.resolution.value.set(S.map.width,S.map.height),v.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(B,null,b,v,T,null)}function F(S,B,b,I){let z=null,U=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(U!==void 0)z=U;else if(z=b.isPointLight===!0?u:o,n.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){let Y=z.uuid,E=B.uuid,M=l[Y];M===void 0&&(M={},l[Y]=M);let O=M[E];O===void 0&&(O=z.clone(),M[E]=O,B.addEventListener("dispose",p)),z=O}if(z.visible=B.visible,z.wireframe=B.wireframe,I===Eo?z.side=B.shadowSide!==null?B.shadowSide:B.side:z.side=B.shadowSide!==null?B.shadowSide:f[B.side],z.alphaMap=B.alphaMap,z.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,z.map=B.map,z.clipShadows=B.clipShadows,z.clippingPlanes=B.clippingPlanes,z.clipIntersection=B.clipIntersection,z.displacementMap=B.displacementMap,z.displacementScale=B.displacementScale,z.displacementBias=B.displacementBias,z.wireframeLinewidth=B.wireframeLinewidth,z.linewidth=B.linewidth,b.isPointLight===!0&&z.isMeshDistanceMaterial===!0){let Y=n.properties.get(z);Y.light=b}return z}function _(S,B,b,I,z){if(S.visible===!1)return;if(S.layers.test(B.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&z===Eo)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);let E=e.update(S),M=S.material;if(Array.isArray(M)){let O=E.groups;for(let H=0,ee=O.length;H<ee;H++){let j=O[H],K=M[j.materialIndex];if(K&&K.visible){let re=F(S,K,I,z);S.onBeforeShadow(n,S,B,b,E,re,j),n.renderBufferDirect(b,null,E,re,S,j),S.onAfterShadow(n,S,B,b,E,re,j)}}}else if(M.visible){let O=F(S,M,I,z);S.onBeforeShadow(n,S,B,b,E,O,null),n.renderBufferDirect(b,null,E,O,S,null),S.onAfterShadow(n,S,B,b,E,O,null)}}let Y=S.children;for(let E=0,M=Y.length;E<M;E++)_(Y[E],B,b,I,z)}function p(S){S.target.removeEventListener("dispose",p);for(let b in l){let I=l[b],z=S.target.uuid;z in I&&(I[z].dispose(),delete I[z])}}}function mb(n,e){function t(){let ie=!1,Oe=new fi,Pe=null,nt=new fi(0,0,0,0);return{setMask:function(dt){Pe!==dt&&!ie&&(n.colorMask(dt,dt,dt,dt),Pe=dt)},setLocked:function(dt){ie=dt},setClear:function(dt,Be,Rt,vt,cn){cn===!0&&(dt*=vt,Be*=vt,Rt*=vt),Oe.set(dt,Be,Rt,vt),nt.equals(Oe)===!1&&(n.clearColor(dt,Be,Rt,vt),nt.copy(Oe))},reset:function(){ie=!1,Pe=null,nt.set(-1,0,0,0)}}}function i(){let ie=!1,Oe=!1,Pe=null,nt=null,dt=null;return{setReversed:function(Be){if(Oe!==Be){let Rt=e.get("EXT_clip_control");Be?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),Oe=Be;let vt=dt;dt=null,this.setClear(vt)}},getReversed:function(){return Oe},setTest:function(Be){Be?de(n.DEPTH_TEST):_e(n.DEPTH_TEST)},setMask:function(Be){Pe!==Be&&!ie&&(n.depthMask(Be),Pe=Be)},setFunc:function(Be){if(Oe&&(Be=_0[Be]),nt!==Be){switch(Be){case Jc:n.depthFunc(n.NEVER);break;case $c:n.depthFunc(n.ALWAYS);break;case Kc:n.depthFunc(n.LESS);break;case ho:n.depthFunc(n.LEQUAL);break;case Qc:n.depthFunc(n.EQUAL);break;case jc:n.depthFunc(n.GEQUAL);break;case eu:n.depthFunc(n.GREATER);break;case tu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=Be}},setLocked:function(Be){ie=Be},setClear:function(Be){dt!==Be&&(dt=Be,Oe&&(Be=1-Be),n.clearDepth(Be))},reset:function(){ie=!1,Pe=null,nt=null,dt=null,Oe=!1}}}function r(){let ie=!1,Oe=null,Pe=null,nt=null,dt=null,Be=null,Rt=null,vt=null,cn=null;return{setTest:function(dn){ie||(dn?de(n.STENCIL_TEST):_e(n.STENCIL_TEST))},setMask:function(dn){Oe!==dn&&!ie&&(n.stencilMask(dn),Oe=dn)},setFunc:function(dn,Fn,Dn){(Pe!==dn||nt!==Fn||dt!==Dn)&&(n.stencilFunc(dn,Fn,Dn),Pe=dn,nt=Fn,dt=Dn)},setOp:function(dn,Fn,Dn){(Be!==dn||Rt!==Fn||vt!==Dn)&&(n.stencilOp(dn,Fn,Dn),Be=dn,Rt=Fn,vt=Dn)},setLocked:function(dn){ie=dn},setClear:function(dn){cn!==dn&&(n.clearStencil(dn),cn=dn)},reset:function(){ie=!1,Oe=null,Pe=null,nt=null,dt=null,Be=null,Rt=null,vt=null,cn=null}}}let a=new t,s=new i,o=new r,u=new WeakMap,l=new WeakMap,d={},f={},h={},v=new WeakMap,y=[],T=null,g=!1,m=null,L=null,F=null,_=null,p=null,S=null,B=null,b=new vn(0,0,0),I=0,z=!1,U=null,Y=null,E=null,M=null,O=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,j=0,K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(K)[1]),ee=j>=1):K.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),ee=j>=2);let re=null,J={},ne=n.getParameter(n.SCISSOR_BOX),Te=n.getParameter(n.VIEWPORT),fe=new fi().fromArray(ne),pe=new fi().fromArray(Te);function Fe(ie,Oe,Pe,nt){let dt=new Uint8Array(4),Be=n.createTexture();n.bindTexture(ie,Be),n.texParameteri(ie,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(ie,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Rt=0;Rt<Pe;Rt++)ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?n.texImage3D(Oe,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,dt):n.texImage2D(Oe+Rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,dt);return Be}let ae={};ae[n.TEXTURE_2D]=Fe(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=Fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=Fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=Fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),de(n.DEPTH_TEST),s.setFunc(ho),wt(!1),bt(jf),de(n.CULL_FACE),Tt(Aa);function de(ie){d[ie]!==!0&&(n.enable(ie),d[ie]=!0)}function _e(ie){d[ie]!==!1&&(n.disable(ie),d[ie]=!1)}function Ge(ie,Oe){return h[ie]!==Oe?(n.bindFramebuffer(ie,Oe),h[ie]=Oe,ie===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Oe),ie===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Oe),!0):!1}function $e(ie,Oe){let Pe=y,nt=!1;if(ie){Pe=v.get(Oe),Pe===void 0&&(Pe=[],v.set(Oe,Pe));let dt=ie.textures;if(Pe.length!==dt.length||Pe[0]!==n.COLOR_ATTACHMENT0){for(let Be=0,Rt=dt.length;Be<Rt;Be++)Pe[Be]=n.COLOR_ATTACHMENT0+Be;Pe.length=dt.length,nt=!0}}else Pe[0]!==n.BACK&&(Pe[0]=n.BACK,nt=!0);nt&&n.drawBuffers(Pe)}function ut(ie){return T!==ie?(n.useProgram(ie),T=ie,!0):!1}let zt={[Fs]:n.FUNC_ADD,[Vm]:n.FUNC_SUBTRACT,[Gm]:n.FUNC_REVERSE_SUBTRACT};zt[Hm]=n.MIN,zt[Wm]=n.MAX;let ct={[Xm]:n.ZERO,[Ym]:n.ONE,[qm]:n.SRC_COLOR,[ih]:n.SRC_ALPHA,[jm]:n.SRC_ALPHA_SATURATE,[Km]:n.DST_COLOR,[Jm]:n.DST_ALPHA,[Zm]:n.ONE_MINUS_SRC_COLOR,[rh]:n.ONE_MINUS_SRC_ALPHA,[Qm]:n.ONE_MINUS_DST_COLOR,[$m]:n.ONE_MINUS_DST_ALPHA,[e0]:n.CONSTANT_COLOR,[t0]:n.ONE_MINUS_CONSTANT_COLOR,[n0]:n.CONSTANT_ALPHA,[i0]:n.ONE_MINUS_CONSTANT_ALPHA};function Tt(ie,Oe,Pe,nt,dt,Be,Rt,vt,cn,dn){if(ie===Aa){g===!0&&(_e(n.BLEND),g=!1);return}if(g===!1&&(de(n.BLEND),g=!0),ie!==zm){if(ie!==m||dn!==z){if((L!==Fs||p!==Fs)&&(n.blendEquation(n.FUNC_ADD),L=Fs,p=Fs),dn)switch(ie){case Ao:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case eh:n.blendFunc(n.ONE,n.ONE);break;case th:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case nh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:sn("WebGLState: Invalid blending: ",ie);break}else switch(ie){case Ao:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case eh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case th:sn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:sn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:sn("WebGLState: Invalid blending: ",ie);break}F=null,_=null,S=null,B=null,b.set(0,0,0),I=0,m=ie,z=dn}return}dt=dt||Oe,Be=Be||Pe,Rt=Rt||nt,(Oe!==L||dt!==p)&&(n.blendEquationSeparate(zt[Oe],zt[dt]),L=Oe,p=dt),(Pe!==F||nt!==_||Be!==S||Rt!==B)&&(n.blendFuncSeparate(ct[Pe],ct[nt],ct[Be],ct[Rt]),F=Pe,_=nt,S=Be,B=Rt),(vt.equals(b)===!1||cn!==I)&&(n.blendColor(vt.r,vt.g,vt.b,cn),b.copy(vt),I=cn),m=ie,z=!1}function Zt(ie,Oe){ie.side===Ir?_e(n.CULL_FACE):de(n.CULL_FACE);let Pe=ie.side===pr;Oe&&(Pe=!Pe),wt(Pe),ie.blending===Ao&&ie.transparent===!1?Tt(Aa):Tt(ie.blending,ie.blendEquation,ie.blendSrc,ie.blendDst,ie.blendEquationAlpha,ie.blendSrcAlpha,ie.blendDstAlpha,ie.blendColor,ie.blendAlpha,ie.premultipliedAlpha),s.setFunc(ie.depthFunc),s.setTest(ie.depthTest),s.setMask(ie.depthWrite),a.setMask(ie.colorWrite);let nt=ie.stencilWrite;o.setTest(nt),nt&&(o.setMask(ie.stencilWriteMask),o.setFunc(ie.stencilFunc,ie.stencilRef,ie.stencilFuncMask),o.setOp(ie.stencilFail,ie.stencilZFail,ie.stencilZPass)),ln(ie.polygonOffset,ie.polygonOffsetFactor,ie.polygonOffsetUnits),ie.alphaToCoverage===!0?de(n.SAMPLE_ALPHA_TO_COVERAGE):_e(n.SAMPLE_ALPHA_TO_COVERAGE)}function wt(ie){U!==ie&&(ie?n.frontFace(n.CW):n.frontFace(n.CCW),U=ie)}function bt(ie){ie!==Bm?(de(n.CULL_FACE),ie!==Y&&(ie===jf?n.cullFace(n.BACK):ie===km?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_e(n.CULL_FACE),Y=ie}function _t(ie){ie!==E&&(ee&&n.lineWidth(ie),E=ie)}function ln(ie,Oe,Pe){ie?(de(n.POLYGON_OFFSET_FILL),(M!==Oe||O!==Pe)&&(M=Oe,O=Pe,s.getReversed()&&(Oe=-Oe),n.polygonOffset(Oe,Pe))):_e(n.POLYGON_OFFSET_FILL)}function rt(ie){ie?de(n.SCISSOR_TEST):_e(n.SCISSOR_TEST)}function an(ie){ie===void 0&&(ie=n.TEXTURE0+H-1),re!==ie&&(n.activeTexture(ie),re=ie)}function se(ie,Oe,Pe){Pe===void 0&&(re===null?Pe=n.TEXTURE0+H-1:Pe=re);let nt=J[Pe];nt===void 0&&(nt={type:void 0,texture:void 0},J[Pe]=nt),(nt.type!==ie||nt.texture!==Oe)&&(re!==Pe&&(n.activeTexture(Pe),re=Pe),n.bindTexture(ie,Oe||ae[ie]),nt.type=ie,nt.texture=Oe)}function mn(){let ie=J[re];ie!==void 0&&ie.type!==void 0&&(n.bindTexture(ie.type,null),ie.type=void 0,ie.texture=void 0)}function nn(){try{n.compressedTexImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function w(){try{n.texSubImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function ue(){try{n.texSubImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function ye(){try{n.compressedTexSubImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function we(){try{n.compressedTexSubImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function ze(){try{n.texStorage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Ye(){try{n.texStorage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Re(){try{n.texImage2D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Ae(){try{n.texImage3D(...arguments)}catch(ie){sn("WebGLState:",ie)}}function Ne(ie){return f[ie]!==void 0?f[ie]:n.getParameter(ie)}function je(ie,Oe){f[ie]!==Oe&&(n.pixelStorei(ie,Oe),f[ie]=Oe)}function Ve(ie){fe.equals(ie)===!1&&(n.scissor(ie.x,ie.y,ie.z,ie.w),fe.copy(ie))}function qe(ie){pe.equals(ie)===!1&&(n.viewport(ie.x,ie.y,ie.z,ie.w),pe.copy(ie))}function ot(ie,Oe){let Pe=l.get(Oe);Pe===void 0&&(Pe=new WeakMap,l.set(Oe,Pe));let nt=Pe.get(ie);nt===void 0&&(nt=n.getUniformBlockIndex(Oe,ie.name),Pe.set(ie,nt))}function pt(ie,Oe){let nt=l.get(Oe).get(ie);u.get(Oe)!==nt&&(n.uniformBlockBinding(Oe,nt,ie.__bindingPointIndex),u.set(Oe,nt))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},re=null,J={},h={},v=new WeakMap,y=[],T=null,g=!1,m=null,L=null,F=null,_=null,p=null,S=null,B=null,b=new vn(0,0,0),I=0,z=!1,U=null,Y=null,E=null,M=null,O=null,fe.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:de,disable:_e,bindFramebuffer:Ge,drawBuffers:$e,useProgram:ut,setBlending:Tt,setMaterial:Zt,setFlipSided:wt,setCullFace:bt,setLineWidth:_t,setPolygonOffset:ln,setScissorTest:rt,activeTexture:an,bindTexture:se,unbindTexture:mn,compressedTexImage2D:nn,compressedTexImage3D:W,texImage2D:Re,texImage3D:Ae,pixelStorei:je,getParameter:Ne,updateUBOMapping:ot,uniformBlockBinding:pt,texStorage2D:ze,texStorage3D:Ye,texSubImage2D:w,texSubImage3D:ue,compressedTexSubImage2D:ye,compressedTexSubImage3D:we,scissor:Ve,viewport:qe,reset:He}}function vb(n,e,t,i,r,a,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new kt,d=new WeakMap,f=new Set,h,v=new WeakMap,y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(W,w){return y?new OffscreenCanvas(W,w):pl("canvas")}function g(W,w,ue){let ye=1,we=nn(W);if((we.width>ue||we.height>ue)&&(ye=ue/Math.max(we.width,we.height)),ye<1)if(typeof HTMLImageElement<"u"&&W instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&W instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&W instanceof ImageBitmap||typeof VideoFrame<"u"&&W instanceof VideoFrame){let ze=Math.floor(ye*we.width),Ye=Math.floor(ye*we.height);h===void 0&&(h=T(ze,Ye));let Re=w?T(ze,Ye):h;return Re.width=ze,Re.height=Ye,Re.getContext("2d").drawImage(W,0,0,ze,Ye),rn("WebGLRenderer: Texture has been resized from ("+we.width+"x"+we.height+") to ("+ze+"x"+Ye+")."),Re}else return"data"in W&&rn("WebGLRenderer: Image in DataTexture is too big ("+we.width+"x"+we.height+")."),W;return W}function m(W){return W.generateMipmaps}function L(W){n.generateMipmap(W)}function F(W){return W.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:W.isWebGL3DRenderTarget?n.TEXTURE_3D:W.isWebGLArrayRenderTarget||W.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(W,w,ue,ye,we,ze=!1){if(W!==null){if(n[W]!==void 0)return n[W];rn("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+W+"'")}let Ye;ye&&(Ye=e.get("EXT_texture_norm16"),Ye||rn("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Re=w;if(w===n.RED&&(ue===n.FLOAT&&(Re=n.R32F),ue===n.HALF_FLOAT&&(Re=n.R16F),ue===n.UNSIGNED_BYTE&&(Re=n.R8),ue===n.UNSIGNED_SHORT&&Ye&&(Re=Ye.R16_EXT),ue===n.SHORT&&Ye&&(Re=Ye.R16_SNORM_EXT)),w===n.RED_INTEGER&&(ue===n.UNSIGNED_BYTE&&(Re=n.R8UI),ue===n.UNSIGNED_SHORT&&(Re=n.R16UI),ue===n.UNSIGNED_INT&&(Re=n.R32UI),ue===n.BYTE&&(Re=n.R8I),ue===n.SHORT&&(Re=n.R16I),ue===n.INT&&(Re=n.R32I)),w===n.RG&&(ue===n.FLOAT&&(Re=n.RG32F),ue===n.HALF_FLOAT&&(Re=n.RG16F),ue===n.UNSIGNED_BYTE&&(Re=n.RG8),ue===n.UNSIGNED_SHORT&&Ye&&(Re=Ye.RG16_EXT),ue===n.SHORT&&Ye&&(Re=Ye.RG16_SNORM_EXT)),w===n.RG_INTEGER&&(ue===n.UNSIGNED_BYTE&&(Re=n.RG8UI),ue===n.UNSIGNED_SHORT&&(Re=n.RG16UI),ue===n.UNSIGNED_INT&&(Re=n.RG32UI),ue===n.BYTE&&(Re=n.RG8I),ue===n.SHORT&&(Re=n.RG16I),ue===n.INT&&(Re=n.RG32I)),w===n.RGB_INTEGER&&(ue===n.UNSIGNED_BYTE&&(Re=n.RGB8UI),ue===n.UNSIGNED_SHORT&&(Re=n.RGB16UI),ue===n.UNSIGNED_INT&&(Re=n.RGB32UI),ue===n.BYTE&&(Re=n.RGB8I),ue===n.SHORT&&(Re=n.RGB16I),ue===n.INT&&(Re=n.RGB32I)),w===n.RGBA_INTEGER&&(ue===n.UNSIGNED_BYTE&&(Re=n.RGBA8UI),ue===n.UNSIGNED_SHORT&&(Re=n.RGBA16UI),ue===n.UNSIGNED_INT&&(Re=n.RGBA32UI),ue===n.BYTE&&(Re=n.RGBA8I),ue===n.SHORT&&(Re=n.RGBA16I),ue===n.INT&&(Re=n.RGBA32I)),w===n.RGB&&(ue===n.UNSIGNED_SHORT&&Ye&&(Re=Ye.RGB16_EXT),ue===n.SHORT&&Ye&&(Re=Ye.RGB16_SNORM_EXT),ue===n.UNSIGNED_INT_5_9_9_9_REV&&(Re=n.RGB9_E5),ue===n.UNSIGNED_INT_10F_11F_11F_REV&&(Re=n.R11F_G11F_B10F)),w===n.RGBA){let Ae=ze?hl:Ln.getTransfer(we);ue===n.FLOAT&&(Re=n.RGBA32F),ue===n.HALF_FLOAT&&(Re=n.RGBA16F),ue===n.UNSIGNED_BYTE&&(Re=Ae===Jn?n.SRGB8_ALPHA8:n.RGBA8),ue===n.UNSIGNED_SHORT&&Ye&&(Re=Ye.RGBA16_EXT),ue===n.SHORT&&Ye&&(Re=Ye.RGBA16_SNORM_EXT),ue===n.UNSIGNED_SHORT_4_4_4_4&&(Re=n.RGBA4),ue===n.UNSIGNED_SHORT_5_5_5_1&&(Re=n.RGB5_A1)}return(Re===n.R16F||Re===n.R32F||Re===n.RG16F||Re===n.RG32F||Re===n.RGBA16F||Re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Re}function p(W,w){let ue;return W?w===null||w===sa||w===Co?ue=n.DEPTH24_STENCIL8:w===Yr?ue=n.DEPTH32F_STENCIL8:w===Io&&(ue=n.DEPTH24_STENCIL8,rn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===sa||w===Co?ue=n.DEPTH_COMPONENT24:w===Yr?ue=n.DEPTH_COMPONENT32F:w===Io&&(ue=n.DEPTH_COMPONENT16),ue}function S(W,w){return m(W)===!0||W.isFramebufferTexture&&W.minFilter!==Bi&&W.minFilter!==Hi?Math.log2(Math.max(w.width,w.height))+1:W.mipmaps!==void 0&&W.mipmaps.length>0?W.mipmaps.length:W.isCompressedTexture&&Array.isArray(W.image)?w.mipmaps.length:1}function B(W){let w=W.target;w.removeEventListener("dispose",B),I(w),w.isVideoTexture&&d.delete(w),w.isHTMLTexture&&f.delete(w)}function b(W){let w=W.target;w.removeEventListener("dispose",b),U(w)}function I(W){let w=i.get(W);if(w.__webglInit===void 0)return;let ue=W.source,ye=v.get(ue);if(ye){let we=ye[w.__cacheKey];we.usedTimes--,we.usedTimes===0&&z(W),Object.keys(ye).length===0&&v.delete(ue)}i.remove(W)}function z(W){let w=i.get(W);n.deleteTexture(w.__webglTexture);let ue=W.source,ye=v.get(ue);delete ye[w.__cacheKey],s.memory.textures--}function U(W){let w=i.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),i.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let ye=0;ye<6;ye++){if(Array.isArray(w.__webglFramebuffer[ye]))for(let we=0;we<w.__webglFramebuffer[ye].length;we++)n.deleteFramebuffer(w.__webglFramebuffer[ye][we]);else n.deleteFramebuffer(w.__webglFramebuffer[ye]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[ye])}else{if(Array.isArray(w.__webglFramebuffer))for(let ye=0;ye<w.__webglFramebuffer.length;ye++)n.deleteFramebuffer(w.__webglFramebuffer[ye]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ye=0;ye<w.__webglColorRenderbuffer.length;ye++)w.__webglColorRenderbuffer[ye]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[ye]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let ue=W.textures;for(let ye=0,we=ue.length;ye<we;ye++){let ze=i.get(ue[ye]);ze.__webglTexture&&(n.deleteTexture(ze.__webglTexture),s.memory.textures--),i.remove(ue[ye])}i.remove(W)}let Y=0;function E(){Y=0}function M(){return Y}function O(W){Y=W}function H(){let W=Y;return W>=r.maxTextures&&rn("WebGLTextures: Trying to use "+(W+1)+" texture units while this GPU supports only "+r.maxTextures),Y+=1,W}function ee(W){let w=[];return w.push(W.wrapS),w.push(W.wrapT),w.push(W.wrapR||0),w.push(W.magFilter),w.push(W.minFilter),w.push(W.anisotropy),w.push(W.internalFormat),w.push(W.format),w.push(W.type),w.push(W.generateMipmaps),w.push(W.premultiplyAlpha),w.push(W.flipY),w.push(W.unpackAlignment),w.push(W.colorSpace),w.join()}function j(W,w){let ue=i.get(W);if(W.isVideoTexture&&se(W),W.isRenderTargetTexture===!1&&W.isExternalTexture!==!0&&W.version>0&&ue.__version!==W.version){let ye=W.image;if(ye===null)rn("WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)rn("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(ue,W,w);return}}else W.isExternalTexture&&(ue.__webglTexture=W.sourceTexture?W.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,ue.__webglTexture,n.TEXTURE0+w)}function K(W,w){let ue=i.get(W);if(W.isRenderTargetTexture===!1&&W.version>0&&ue.__version!==W.version){_e(ue,W,w);return}else W.isExternalTexture&&(ue.__webglTexture=W.sourceTexture?W.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,ue.__webglTexture,n.TEXTURE0+w)}function re(W,w){let ue=i.get(W);if(W.isRenderTargetTexture===!1&&W.version>0&&ue.__version!==W.version){_e(ue,W,w);return}t.bindTexture(n.TEXTURE_3D,ue.__webglTexture,n.TEXTURE0+w)}function J(W,w){let ue=i.get(W);if(W.isCubeDepthTexture!==!0&&W.version>0&&ue.__version!==W.version){Ge(ue,W,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,ue.__webglTexture,n.TEXTURE0+w)}let ne={[nu]:n.REPEAT,[_a]:n.CLAMP_TO_EDGE,[iu]:n.MIRRORED_REPEAT},Te={[Bi]:n.NEAREST,[s0]:n.NEAREST_MIPMAP_NEAREST,[Vl]:n.NEAREST_MIPMAP_LINEAR,[Hi]:n.LINEAR,[Ou]:n.LINEAR_MIPMAP_NEAREST,[gs]:n.LINEAR_MIPMAP_LINEAR},fe={[u0]:n.NEVER,[m0]:n.ALWAYS,[d0]:n.LESS,[Sd]:n.LEQUAL,[f0]:n.EQUAL,[bd]:n.GEQUAL,[h0]:n.GREATER,[p0]:n.NOTEQUAL};function pe(W,w){if(w.type===Yr&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Hi||w.magFilter===Ou||w.magFilter===Vl||w.magFilter===gs||w.minFilter===Hi||w.minFilter===Ou||w.minFilter===Vl||w.minFilter===gs)&&rn("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(W,n.TEXTURE_WRAP_S,ne[w.wrapS]),n.texParameteri(W,n.TEXTURE_WRAP_T,ne[w.wrapT]),(W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY)&&n.texParameteri(W,n.TEXTURE_WRAP_R,ne[w.wrapR]),n.texParameteri(W,n.TEXTURE_MAG_FILTER,Te[w.magFilter]),n.texParameteri(W,n.TEXTURE_MIN_FILTER,Te[w.minFilter]),w.compareFunction&&(n.texParameteri(W,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(W,n.TEXTURE_COMPARE_FUNC,fe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Bi||w.minFilter!==Vl&&w.minFilter!==gs||w.type===Yr&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let ue=e.get("EXT_texture_filter_anisotropic");n.texParameterf(W,ue.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Fe(W,w){let ue=!1;W.__webglInit===void 0&&(W.__webglInit=!0,w.addEventListener("dispose",B));let ye=w.source,we=v.get(ye);we===void 0&&(we={},v.set(ye,we));let ze=ee(w);if(ze!==W.__cacheKey){we[ze]===void 0&&(we[ze]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,ue=!0),we[ze].usedTimes++;let Ye=we[W.__cacheKey];Ye!==void 0&&(we[W.__cacheKey].usedTimes--,Ye.usedTimes===0&&z(w)),W.__cacheKey=ze,W.__webglTexture=we[ze].texture}return ue}function ae(W,w,ue){return Math.floor(Math.floor(W/ue)/w)}function de(W,w,ue,ye){let ze=W.updateRanges;if(ze.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,ue,ye,w.data);else{ze.sort((je,Ve)=>je.start-Ve.start);let Ye=0;for(let je=1;je<ze.length;je++){let Ve=ze[Ye],qe=ze[je],ot=Ve.start+Ve.count,pt=ae(qe.start,w.width,4),He=ae(Ve.start,w.width,4);qe.start<=ot+1&&pt===He&&ae(qe.start+qe.count-1,w.width,4)===pt?Ve.count=Math.max(Ve.count,qe.start+qe.count-Ve.start):(++Ye,ze[Ye]=qe)}ze.length=Ye+1;let Re=t.getParameter(n.UNPACK_ROW_LENGTH),Ae=t.getParameter(n.UNPACK_SKIP_PIXELS),Ne=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let je=0,Ve=ze.length;je<Ve;je++){let qe=ze[je],ot=Math.floor(qe.start/4),pt=Math.ceil(qe.count/4),He=ot%w.width,ie=Math.floor(ot/w.width),Oe=pt,Pe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,He),t.pixelStorei(n.UNPACK_SKIP_ROWS,ie),t.texSubImage2D(n.TEXTURE_2D,0,He,ie,Oe,Pe,ue,ye,w.data)}W.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ae),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ne)}}function _e(W,w,ue){let ye=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ye=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ye=n.TEXTURE_3D);let we=Fe(W,w),ze=w.source;t.bindTexture(ye,W.__webglTexture,n.TEXTURE0+ue);let Ye=i.get(ze);if(ze.version!==Ye.__version||we===!0){if(t.activeTexture(n.TEXTURE0+ue),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let Pe=Ln.getPrimaries(Ln.workingColorSpace),nt=w.colorSpace===Ya?null:Ln.getPrimaries(w.colorSpace),dt=w.colorSpace===Ya||Pe===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt)}t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment);let Ae=g(w.image,!1,r.maxTextureSize);Ae=mn(w,Ae);let Ne=a.convert(w.format,w.colorSpace),je=a.convert(w.type),Ve=_(w.internalFormat,Ne,je,w.normalized,w.colorSpace,w.isVideoTexture);pe(ye,w);let qe,ot=w.mipmaps,pt=w.isVideoTexture!==!0,He=Ye.__version===void 0||we===!0,ie=ze.dataReady,Oe=S(w,Ae);if(w.isDepthTexture)Ve=p(w.format===ys,w.type),He&&(pt?t.texStorage2D(n.TEXTURE_2D,1,Ve,Ae.width,Ae.height):t.texImage2D(n.TEXTURE_2D,0,Ve,Ae.width,Ae.height,0,Ne,je,null));else if(w.isDataTexture)if(ot.length>0){pt&&He&&t.texStorage2D(n.TEXTURE_2D,Oe,Ve,ot[0].width,ot[0].height);for(let Pe=0,nt=ot.length;Pe<nt;Pe++)qe=ot[Pe],pt?ie&&t.texSubImage2D(n.TEXTURE_2D,Pe,0,0,qe.width,qe.height,Ne,je,qe.data):t.texImage2D(n.TEXTURE_2D,Pe,Ve,qe.width,qe.height,0,Ne,je,qe.data);w.generateMipmaps=!1}else pt?(He&&t.texStorage2D(n.TEXTURE_2D,Oe,Ve,Ae.width,Ae.height),ie&&de(w,Ae,Ne,je)):t.texImage2D(n.TEXTURE_2D,0,Ve,Ae.width,Ae.height,0,Ne,je,Ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){pt&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Oe,Ve,ot[0].width,ot[0].height,Ae.depth);for(let Pe=0,nt=ot.length;Pe<nt;Pe++)if(qe=ot[Pe],w.format!==qr)if(Ne!==null)if(pt){if(ie)if(w.layerUpdates.size>0){let dt=Th(qe.width,qe.height,w.format,w.type);for(let Be of w.layerUpdates){let Rt=qe.data.subarray(Be*dt/qe.data.BYTES_PER_ELEMENT,(Be+1)*dt/qe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Pe,0,0,Be,qe.width,qe.height,1,Ne,Rt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Pe,0,0,0,qe.width,qe.height,Ae.depth,Ne,qe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Pe,Ve,qe.width,qe.height,Ae.depth,0,qe.data,0,0);else rn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pt?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Pe,0,0,0,qe.width,qe.height,Ae.depth,Ne,je,qe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Pe,Ve,qe.width,qe.height,Ae.depth,0,Ne,je,qe.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{pt&&He&&t.texStorage2D(n.TEXTURE_2D,Oe,Ve,ot[0].width,ot[0].height);for(let Pe=0,nt=ot.length;Pe<nt;Pe++)qe=ot[Pe],w.format!==qr?Ne!==null?pt?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,Pe,0,0,qe.width,qe.height,Ne,qe.data):t.compressedTexImage2D(n.TEXTURE_2D,Pe,Ve,qe.width,qe.height,0,qe.data):rn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?ie&&t.texSubImage2D(n.TEXTURE_2D,Pe,0,0,qe.width,qe.height,Ne,je,qe.data):t.texImage2D(n.TEXTURE_2D,Pe,Ve,qe.width,qe.height,0,Ne,je,qe.data)}else if(w.isDataArrayTexture)if(pt){if(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Oe,Ve,Ae.width,Ae.height,Ae.depth),ie)if(w.layerUpdates.size>0){let Pe=Th(Ae.width,Ae.height,w.format,w.type);for(let nt of w.layerUpdates){let dt=Ae.data.subarray(nt*Pe/Ae.data.BYTES_PER_ELEMENT,(nt+1)*Pe/Ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,Ae.width,Ae.height,1,Ne,je,dt)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Ae.width,Ae.height,Ae.depth,Ne,je,Ae.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ve,Ae.width,Ae.height,Ae.depth,0,Ne,je,Ae.data);else if(w.isData3DTexture)pt?(He&&t.texStorage3D(n.TEXTURE_3D,Oe,Ve,Ae.width,Ae.height,Ae.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Ae.width,Ae.height,Ae.depth,Ne,je,Ae.data)):t.texImage3D(n.TEXTURE_3D,0,Ve,Ae.width,Ae.height,Ae.depth,0,Ne,je,Ae.data);else if(w.isFramebufferTexture){if(He)if(pt)t.texStorage2D(n.TEXTURE_2D,Oe,Ve,Ae.width,Ae.height);else{let Pe=Ae.width,nt=Ae.height;for(let dt=0;dt<Oe;dt++)t.texImage2D(n.TEXTURE_2D,dt,Ve,Pe,nt,0,Ne,je,null),Pe>>=1,nt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in n){let Pe=n.canvas;if(Pe.hasAttribute("layoutsubtree")||Pe.setAttribute("layoutsubtree","true"),Ae.parentNode!==Pe){Pe.appendChild(Ae),f.add(w),Pe.onpaint=nt=>{let dt=nt.changedElements;for(let Be of f)dt.includes(Be.image)&&(Be.needsUpdate=!0)},Pe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Ae);else{let dt=n.RGBA,Be=n.RGBA,Rt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,dt,Be,Rt,Ae)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ot.length>0){if(pt&&He){let Pe=nn(ot[0]);t.texStorage2D(n.TEXTURE_2D,Oe,Ve,Pe.width,Pe.height)}for(let Pe=0,nt=ot.length;Pe<nt;Pe++)qe=ot[Pe],pt?ie&&t.texSubImage2D(n.TEXTURE_2D,Pe,0,0,Ne,je,qe):t.texImage2D(n.TEXTURE_2D,Pe,Ve,Ne,je,qe);w.generateMipmaps=!1}else if(pt){if(He){let Pe=nn(Ae);t.texStorage2D(n.TEXTURE_2D,Oe,Ve,Pe.width,Pe.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ne,je,Ae)}else t.texImage2D(n.TEXTURE_2D,0,Ve,Ne,je,Ae);m(w)&&L(ye),Ye.__version=ze.version,w.onUpdate&&w.onUpdate(w)}W.__version=w.version}function Ge(W,w,ue){if(w.image.length!==6)return;let ye=Fe(W,w),we=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+ue);let ze=i.get(we);if(we.version!==ze.__version||ye===!0){t.activeTexture(n.TEXTURE0+ue);let Ye=Ln.getPrimaries(Ln.workingColorSpace),Re=w.colorSpace===Ya?null:Ln.getPrimaries(w.colorSpace),Ae=w.colorSpace===Ya||Ye===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Ne=w.isCompressedTexture||w.image[0].isCompressedTexture,je=w.image[0]&&w.image[0].isDataTexture,Ve=[];for(let Be=0;Be<6;Be++)!Ne&&!je?Ve[Be]=g(w.image[Be],!0,r.maxCubemapSize):Ve[Be]=je?w.image[Be].image:w.image[Be],Ve[Be]=mn(w,Ve[Be]);let qe=Ve[0],ot=a.convert(w.format,w.colorSpace),pt=a.convert(w.type),He=_(w.internalFormat,ot,pt,w.normalized,w.colorSpace),ie=w.isVideoTexture!==!0,Oe=ze.__version===void 0||ye===!0,Pe=we.dataReady,nt=S(w,qe);pe(n.TEXTURE_CUBE_MAP,w);let dt;if(Ne){ie&&Oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,nt,He,qe.width,qe.height);for(let Be=0;Be<6;Be++){dt=Ve[Be].mipmaps;for(let Rt=0;Rt<dt.length;Rt++){let vt=dt[Rt];w.format!==qr?ot!==null?ie?Pe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt,0,0,vt.width,vt.height,ot,vt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt,He,vt.width,vt.height,0,vt.data):rn("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ie?Pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt,0,0,vt.width,vt.height,ot,pt,vt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt,He,vt.width,vt.height,0,ot,pt,vt.data)}}}else{if(dt=w.mipmaps,ie&&Oe){dt.length>0&&nt++;let Be=nn(Ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,nt,He,Be.width,Be.height)}for(let Be=0;Be<6;Be++)if(je){ie?Pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Ve[Be].width,Ve[Be].height,ot,pt,Ve[Be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,He,Ve[Be].width,Ve[Be].height,0,ot,pt,Ve[Be].data);for(let Rt=0;Rt<dt.length;Rt++){let cn=dt[Rt].image[Be].image;ie?Pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt+1,0,0,cn.width,cn.height,ot,pt,cn.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt+1,He,cn.width,cn.height,0,ot,pt,cn.data)}}else{ie?Pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,ot,pt,Ve[Be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,He,ot,pt,Ve[Be]);for(let Rt=0;Rt<dt.length;Rt++){let vt=dt[Rt];ie?Pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt+1,0,0,ot,pt,vt.image[Be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,Rt+1,He,ot,pt,vt.image[Be])}}}m(w)&&L(n.TEXTURE_CUBE_MAP),ze.__version=we.version,w.onUpdate&&w.onUpdate(w)}W.__version=w.version}function $e(W,w,ue,ye,we,ze){let Ye=a.convert(ue.format,ue.colorSpace),Re=a.convert(ue.type),Ae=_(ue.internalFormat,Ye,Re,ue.normalized,ue.colorSpace),Ne=i.get(w),je=i.get(ue);if(je.__renderTarget=w,!Ne.__hasExternalTextures){let Ve=Math.max(1,w.width>>ze),qe=Math.max(1,w.height>>ze);we===n.TEXTURE_3D||we===n.TEXTURE_2D_ARRAY?t.texImage3D(we,ze,Ae,Ve,qe,w.depth,0,Ye,Re,null):t.texImage2D(we,ze,Ae,Ve,qe,0,Ye,Re,null)}t.bindFramebuffer(n.FRAMEBUFFER,W),an(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ye,we,je.__webglTexture,0,rt(w)):(we===n.TEXTURE_2D||we>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&we<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ye,we,je.__webglTexture,ze),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(W,w,ue){if(n.bindRenderbuffer(n.RENDERBUFFER,W),w.depthBuffer){let ye=w.depthTexture,we=ye&&ye.isDepthTexture?ye.type:null,ze=p(w.stencilBuffer,we),Ye=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;an(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(w),ze,w.width,w.height):ue?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(w),ze,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ze,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ye,n.RENDERBUFFER,W)}else{let ye=w.textures;for(let we=0;we<ye.length;we++){let ze=ye[we],Ye=a.convert(ze.format,ze.colorSpace),Re=a.convert(ze.type),Ae=_(ze.internalFormat,Ye,Re,ze.normalized,ze.colorSpace);an(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(w),Ae,w.width,w.height):ue?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(w),Ae,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function zt(W,w,ue){let ye=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,W),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let we=i.get(w.depthTexture);if(we.__renderTarget=w,(!we.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ye){if(we.__webglInit===void 0&&(we.__webglInit=!0,w.depthTexture.addEventListener("dispose",B)),we.__webglTexture===void 0){we.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,we.__webglTexture),pe(n.TEXTURE_CUBE_MAP,w.depthTexture);let Ne=a.convert(w.depthTexture.format),je=a.convert(w.depthTexture.type),Ve;w.depthTexture.format===Ma?Ve=n.DEPTH_COMPONENT24:w.depthTexture.format===ys&&(Ve=n.DEPTH24_STENCIL8);for(let qe=0;qe<6;qe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+qe,0,Ve,w.width,w.height,0,Ne,je,null)}}else j(w.depthTexture,0);let ze=we.__webglTexture,Ye=rt(w),Re=ye?n.TEXTURE_CUBE_MAP_POSITIVE_X+ue:n.TEXTURE_2D,Ae=w.depthTexture.format===ys?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ma)an(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ae,Re,ze,0,Ye):n.framebufferTexture2D(n.FRAMEBUFFER,Ae,Re,ze,0);else if(w.depthTexture.format===ys)an(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ae,Re,ze,0,Ye):n.framebufferTexture2D(n.FRAMEBUFFER,Ae,Re,ze,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ct(W){let w=i.get(W),ue=W.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==W.depthTexture){let ye=W.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ye){let we=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ye.removeEventListener("dispose",we)};ye.addEventListener("dispose",we),w.__depthDisposeCallback=we}w.__boundDepthTexture=ye}if(W.depthTexture&&!w.__autoAllocateDepthBuffer)if(ue)for(let ye=0;ye<6;ye++)zt(w.__webglFramebuffer[ye],W,ye);else{let ye=W.texture.mipmaps;ye&&ye.length>0?zt(w.__webglFramebuffer[0],W,0):zt(w.__webglFramebuffer,W,0)}else if(ue){w.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ye]),w.__webglDepthbuffer[ye]===void 0)w.__webglDepthbuffer[ye]=n.createRenderbuffer(),ut(w.__webglDepthbuffer[ye],W,!1);else{let we=W.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ze=w.__webglDepthbuffer[ye];n.bindRenderbuffer(n.RENDERBUFFER,ze),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,ze)}}else{let ye=W.texture.mipmaps;if(ye&&ye.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),ut(w.__webglDepthbuffer,W,!1);else{let we=W.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ze=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ze),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,ze)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(W,w,ue){let ye=i.get(W);w!==void 0&&$e(ye.__webglFramebuffer,W,W.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),ue!==void 0&&ct(W)}function Zt(W){let w=W.texture,ue=i.get(W),ye=i.get(w);W.addEventListener("dispose",b);let we=W.textures,ze=W.isWebGLCubeRenderTarget===!0,Ye=we.length>1;if(Ye||(ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture()),ye.__version=w.version,s.memory.textures++),ze){ue.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(w.mipmaps&&w.mipmaps.length>0){ue.__webglFramebuffer[Re]=[];for(let Ae=0;Ae<w.mipmaps.length;Ae++)ue.__webglFramebuffer[Re][Ae]=n.createFramebuffer()}else ue.__webglFramebuffer[Re]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){ue.__webglFramebuffer=[];for(let Re=0;Re<w.mipmaps.length;Re++)ue.__webglFramebuffer[Re]=n.createFramebuffer()}else ue.__webglFramebuffer=n.createFramebuffer();if(Ye)for(let Re=0,Ae=we.length;Re<Ae;Re++){let Ne=i.get(we[Re]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=n.createTexture(),s.memory.textures++)}if(W.samples>0&&an(W)===!1){ue.__webglMultisampledFramebuffer=n.createFramebuffer(),ue.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer);for(let Re=0;Re<we.length;Re++){let Ae=we[Re];ue.__webglColorRenderbuffer[Re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,ue.__webglColorRenderbuffer[Re]);let Ne=a.convert(Ae.format,Ae.colorSpace),je=a.convert(Ae.type),Ve=_(Ae.internalFormat,Ne,je,Ae.normalized,Ae.colorSpace,W.isXRRenderTarget===!0),qe=rt(W);n.renderbufferStorageMultisample(n.RENDERBUFFER,qe,Ve,W.width,W.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,ue.__webglColorRenderbuffer[Re])}n.bindRenderbuffer(n.RENDERBUFFER,null),W.depthBuffer&&(ue.__webglDepthRenderbuffer=n.createRenderbuffer(),ut(ue.__webglDepthRenderbuffer,W,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ze){t.bindTexture(n.TEXTURE_CUBE_MAP,ye.__webglTexture),pe(n.TEXTURE_CUBE_MAP,w);for(let Re=0;Re<6;Re++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)$e(ue.__webglFramebuffer[Re][Ae],W,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ae);else $e(ue.__webglFramebuffer[Re],W,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);m(w)&&L(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){for(let Re=0,Ae=we.length;Re<Ae;Re++){let Ne=we[Re],je=i.get(Ne),Ve=n.TEXTURE_2D;(W.isWebGL3DRenderTarget||W.isWebGLArrayRenderTarget)&&(Ve=W.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ve,je.__webglTexture),pe(Ve,Ne),$e(ue.__webglFramebuffer,W,Ne,n.COLOR_ATTACHMENT0+Re,Ve,0),m(Ne)&&L(Ve)}t.unbindTexture()}else{let Re=n.TEXTURE_2D;if((W.isWebGL3DRenderTarget||W.isWebGLArrayRenderTarget)&&(Re=W.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Re,ye.__webglTexture),pe(Re,w),w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)$e(ue.__webglFramebuffer[Ae],W,w,n.COLOR_ATTACHMENT0,Re,Ae);else $e(ue.__webglFramebuffer,W,w,n.COLOR_ATTACHMENT0,Re,0);m(w)&&L(Re),t.unbindTexture()}W.depthBuffer&&ct(W)}function wt(W){let w=W.textures;for(let ue=0,ye=w.length;ue<ye;ue++){let we=w[ue];if(m(we)){let ze=F(W),Ye=i.get(we).__webglTexture;t.bindTexture(ze,Ye),L(ze),t.unbindTexture()}}}let bt=[],_t=[];function ln(W){if(W.samples>0){if(an(W)===!1){let w=W.textures,ue=W.width,ye=W.height,we=n.COLOR_BUFFER_BIT,ze=W.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ye=i.get(W),Re=w.length>1;if(Re)for(let Ne=0;Ne<w.length;Ne++)t.bindFramebuffer(n.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ne,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ne,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer);let Ae=W.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer);for(let Ne=0;Ne<w.length;Ne++){if(W.resolveDepthBuffer&&(W.depthBuffer&&(we|=n.DEPTH_BUFFER_BIT),W.stencilBuffer&&W.resolveStencilBuffer&&(we|=n.STENCIL_BUFFER_BIT)),Re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ye.__webglColorRenderbuffer[Ne]);let je=i.get(w[Ne]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,je,0)}n.blitFramebuffer(0,0,ue,ye,0,0,ue,ye,we,n.NEAREST),u===!0&&(bt.length=0,_t.length=0,bt.push(n.COLOR_ATTACHMENT0+Ne),W.depthBuffer&&W.storeMultisampledDepthBuffer===!1&&(bt.push(ze),_t.push(ze),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_t)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Re)for(let Ne=0;Ne<w.length;Ne++){t.bindFramebuffer(n.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ne,n.RENDERBUFFER,Ye.__webglColorRenderbuffer[Ne]);let je=i.get(w[Ne]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ne,n.TEXTURE_2D,je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer)}else if(W.depthBuffer&&W.storeMultisampledDepthBuffer===!1&&u){let w=W.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function rt(W){return Math.min(r.maxSamples,W.samples)}function an(W){let w=i.get(W);return W.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function se(W){let w=s.render.frame;d.get(W)!==w&&(d.set(W,w),W.update())}function mn(W,w){let ue=W.colorSpace,ye=W.format,we=W.type;return W.isCompressedTexture===!0||W.isVideoTexture===!0||ue!==fl&&ue!==Ya&&(Ln.getTransfer(ue)===Jn?(ye!==qr||we!==Cr)&&rn("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):sn("WebGLTextures: Unsupported texture color space:",ue)),w}function nn(W){return typeof HTMLImageElement<"u"&&W instanceof HTMLImageElement?(l.width=W.naturalWidth||W.width,l.height=W.naturalHeight||W.height):typeof VideoFrame<"u"&&W instanceof VideoFrame?(l.width=W.displayWidth,l.height=W.displayHeight):(l.width=W.width,l.height=W.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=E,this.getTextureUnits=M,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=re,this.setTextureCube=J,this.rebindTextures=Tt,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=ln,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=$e,this.useMultisampledRTT=an,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function gb(n,e){function t(i,r=Ya){let a,s=Ln.getTransfer(r);if(i===Cr)return n.UNSIGNED_BYTE;if(i===ku)return n.UNSIGNED_SHORT_4_4_4_4;if(i===zu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===mh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hh)return n.BYTE;if(i===ph)return n.SHORT;if(i===Io)return n.UNSIGNED_SHORT;if(i===Bu)return n.INT;if(i===sa)return n.UNSIGNED_INT;if(i===Yr)return n.FLOAT;if(i===oa)return n.HALF_FLOAT;if(i===gh)return n.ALPHA;if(i===yh)return n.RGB;if(i===qr)return n.RGBA;if(i===Ma)return n.DEPTH_COMPONENT;if(i===ys)return n.DEPTH_STENCIL;if(i===Vu)return n.RED;if(i===Gu)return n.RED_INTEGER;if(i===xs)return n.RG;if(i===Hu)return n.RG_INTEGER;if(i===Wu)return n.RGBA_INTEGER;if(i===Gl||i===Hl||i===Wl||i===Xl)if(s===Jn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Gl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Hl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Gl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Hl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xu||i===Yu||i===qu||i===Zu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Xu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ju||i===$u||i===Ku||i===Qu||i===ju||i===Yl||i===ed)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ju||i===$u)return s===Jn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Ku)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Qu)return a.COMPRESSED_R11_EAC;if(i===ju)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Yl)return a.COMPRESSED_RG11_EAC;if(i===ed)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===td||i===nd||i===id||i===rd||i===ad||i===sd||i===od||i===ld||i===cd||i===ud||i===dd||i===fd||i===hd||i===pd)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===td)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===nd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===id)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===rd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ad)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===od)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ld)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===cd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ud)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===dd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pd)return s===Jn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===md||i===vd||i===gd)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===md)return s===Jn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yd||i===xd||i===ql||i===_d)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===yd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===xd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ql)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_d)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Co?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var yb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xb=`
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

}`,Wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new bl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new kr({vertexShader:yb,fragmentShader:xb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jn(new Pl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xh=class extends Sa{constructor(e,t){super();let i=this,r=null,a=1,s=null,o="local-floor",u=1,l=null,d=null,f=null,h=null,v=null,y=null,T=typeof XRWebGLBinding<"u",g=new Wh,m={},L=t.getContextAttributes(),F=null,_=null,p=[],S=[],B=new kt,b=null,I=null,z=new er;z.viewport=new fi;let U=new er;U.viewport=new fi;let Y=[z,U],E=new Pu,M=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let de=p[ae];return de===void 0&&(de=new yo,p[ae]=de),de.getTargetRaySpace()},this.getControllerGrip=function(ae){let de=p[ae];return de===void 0&&(de=new yo,p[ae]=de),de.getGripSpace()},this.getHand=function(ae){let de=p[ae];return de===void 0&&(de=new yo,p[ae]=de),de.getHandSpace()};function H(ae){let de=S.indexOf(ae.inputSource);if(de===-1)return;let _e=p[de];_e!==void 0&&(_e.update(ae.inputSource,ae.frame,l||s),_e.dispatchEvent({type:ae.type,data:ae.inputSource}))}function ee(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",j);for(let ae=0;ae<p.length;ae++){let de=S[ae];de!==null&&(S[ae]=null,p[ae].disconnect(de))}M=null,O=null,g.reset();for(let ae in m)delete m[ae];if(e.setRenderTarget(F),v=null,h=null,f=null,r=null,_=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(B.width,B.height,!1),I!==null){let ae=I.camera;ae.fov=I.fov,ae.zoom=I.zoom,ae.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){a=ae,i.isPresenting===!0&&rn("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){o=ae,i.isPresenting===!0&&rn("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(ae){l=ae},this.getBaseLayer=function(){return h!==null?h:v},this.getBinding=function(){return f===null&&T&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(ae){if(r=ae,r!==null){if(F=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",j),L.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(B),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Ge=null,$e=null;L.depth&&($e=L.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=L.stencil?ys:Ma,Ge=L.stencil?Co:sa);let ut={colorFormat:t.RGBA8,depthFormat:$e,scaleFactor:a};f=this.getBinding(),h=f.createProjectionLayer(ut),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Ar(h.textureWidth,h.textureHeight,{format:qr,type:Cr,depthTexture:new us(h.textureWidth,h.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:L.stencil,colorSpace:e.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let _e={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:a};v=new XRWebGLLayer(r,t,_e),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),_=new Ar(v.framebufferWidth,v.framebufferHeight,{format:qr,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(u),l=null,s=await r.requestReferenceSpace(o),Fe.setContext(r),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(ae){for(let de=0;de<ae.removed.length;de++){let _e=ae.removed[de],Ge=S.indexOf(_e);Ge>=0&&(S[Ge]=null,p[Ge].disconnect(_e))}for(let de=0;de<ae.added.length;de++){let _e=ae.added[de],Ge=S.indexOf(_e);if(Ge===-1){for(let ut=0;ut<p.length;ut++)if(ut>=S.length){S.push(_e),Ge=ut;break}else if(S[ut]===null){S[ut]=_e,Ge=ut;break}if(Ge===-1)break}let $e=p[Ge];$e&&$e.connect(_e)}}let K=new ge,re=new ge;function J(ae,de,_e){K.setFromMatrixPosition(de.matrixWorld),re.setFromMatrixPosition(_e.matrixWorld);let Ge=K.distanceTo(re),$e=de.projectionMatrix.elements,ut=_e.projectionMatrix.elements,zt=$e[14]/($e[10]-1),ct=$e[14]/($e[10]+1),Tt=($e[9]+1)/$e[5],Zt=($e[9]-1)/$e[5],wt=($e[8]-1)/$e[0],bt=(ut[8]+1)/ut[0],_t=zt*wt,ln=zt*bt,rt=Ge/(-wt+bt),an=rt*-wt;if(de.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(an),ae.translateZ(rt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),$e[10]===-1)ae.projectionMatrix.copy(de.projectionMatrix),ae.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{let se=zt+rt,mn=ct+rt,nn=_t-an,W=ln+(Ge-an),w=Tt*ct/mn*se,ue=Zt*ct/mn*se;ae.projectionMatrix.makePerspective(nn,W,w,ue,se,mn),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function ne(ae,de){de===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(de.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(r===null)return;let de=ae.near,_e=ae.far;g.texture!==null&&(g.depthNear>0&&(de=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),E.near=U.near=z.near=de,E.far=U.far=z.far=_e,(M!==E.near||O!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),M=E.near,O=E.far),E.layers.mask=ae.layers.mask|6,z.layers.mask=E.layers.mask&-5,U.layers.mask=E.layers.mask&-3;let Ge=ae.parent,$e=E.cameras;ne(E,Ge);for(let ut=0;ut<$e.length;ut++)ne($e[ut],Ge);$e.length===2?J(E,z,U):E.projectionMatrix.copy(z.projectionMatrix),I===null&&ae.isPerspectiveCamera&&(I={camera:ae,fov:ae.fov,zoom:ae.zoom}),Te(ae,E,Ge)};function Te(ae,de,_e){_e===null?ae.matrix.copy(de.matrixWorld):(ae.matrix.copy(_e.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(de.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(de.projectionMatrix),ae.projectionMatrixInverse.copy(de.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=au*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&v===null))return u},this.setFoveation=function(ae){u=ae,h!==null&&(h.fixedFoveation=ae),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=ae)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(E)},this.getCameraTexture=function(ae){return m[ae]};let fe=null;function pe(ae,de){if(d=de.getViewerPose(l||s),y=de,d!==null){let _e=d.views;v!==null&&(e.setRenderTargetFramebuffer(_,v.framebuffer),e.setRenderTarget(_));let Ge=!1;_e.length!==E.cameras.length&&(E.cameras.length=0,Ge=!0);for(let ct=0;ct<_e.length;ct++){let Tt=_e[ct],Zt=null;if(v!==null)Zt=v.getViewport(Tt);else{let bt=f.getViewSubImage(h,Tt);Zt=bt.viewport,ct===0&&(e.setRenderTargetTextures(_,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(_))}let wt=Y[ct];wt===void 0&&(wt=new er,wt.layers.enable(ct),wt.viewport=new fi,Y[ct]=wt),wt.matrix.fromArray(Tt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Tt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),ct===0&&(E.matrix.copy(wt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Ge===!0&&E.cameras.push(wt)}let $e=r.enabledFeatures;if($e&&$e.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){f=i.getBinding();let ct=f.getDepthInformation(_e[0]);ct&&ct.isValid&&ct.texture&&g.init(ct,r.renderState)}if($e&&$e.includes("camera-access")&&T){e.state.unbindTexture(),f=i.getBinding();for(let ct=0;ct<_e.length;ct++){let Tt=_e[ct].camera;if(Tt){let Zt=m[Tt];Zt||(Zt=new bl,m[Tt]=Zt);let wt=f.getCameraImage(Tt);Zt.sourceTexture=wt}}}}for(let _e=0;_e<p.length;_e++){let Ge=S[_e],$e=p[_e];Ge!==null&&$e!==void 0&&$e.update(Ge,de,l||s)}fe&&fe(ae,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),y=null}let Fe=new $0;Fe.setAnimationLoop(pe),this.setAnimationLoop=function(ae){fe=ae},this.dispose=function(){}}},_b=new $n,nv=new un;nv.set(-1,0,0,0,1,0,0,0,1);function Mb(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Sh(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,L,F,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?a(g,m):m.isMeshLambertMaterial?(a(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(g,m),f(g,m)):m.isMeshPhongMaterial?(a(g,m),d(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(g,m),h(g,m),m.isMeshPhysicalMaterial&&v(g,m,_)):m.isMeshMatcapMaterial?(a(g,m),y(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),T(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(s(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?u(g,m,L,F):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===pr&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===pr&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let L=e.get(m),F=L.envMap,_=L.envMapRotation;F&&(g.envMap.value=F,g.envMapRotation.value.setFromMatrix4(_b.makeRotationFromEuler(_)).transpose(),F.isCubeTexture&&F.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(nv),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function s(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function u(g,m,L,F){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*L,g.scale.value=F*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function d(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function v(g,m,L){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===pr&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=L.texture,g.transmissionSamplerSize.value.set(L.width,L.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,m){m.matcap&&(g.matcap.value=m.matcap)}function T(g,m){let L=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(L.matrixWorld),g.nearDistance.value=L.shadow.camera.near,g.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Sb(n,e,t,i){let r={},a={},s=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(_,p){let S=p.program;i.uniformBlockBinding(_,S)}function l(_,p){let S=r[_.id];S===void 0&&(g(_),S=d(_),r[_.id]=S,_.addEventListener("dispose",L));let B=p.program;i.updateUBOMapping(_,B);let b=e.render.frame;a[_.id]!==b&&(h(_),a[_.id]=b)}function d(_){let p=f();_.__bindingPointIndex=p;let S=n.createBuffer(),B=_.__size,b=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,B,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,p,S),S}function f(){for(let _=0;_<o;_++)if(s.indexOf(_)===-1)return s.push(_),_;return sn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let p=r[_.id],S=_.uniforms,B=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,p);for(let b=0,I=S.length;b<I;b++){let z=S[b];if(Array.isArray(z))for(let U=0,Y=z.length;U<Y;U++)v(z[U],b,U,B);else v(z,b,0,B)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function v(_,p,S,B){if(T(_,p,S,B)===!0){let b=_.__offset,I=_.value;if(Array.isArray(I)){let z=0;for(let U=0;U<I.length;U++){let Y=I[U],E=m(Y);y(Y,_.__data,z),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(z+=E.storage/Float32Array.BYTES_PER_ELEMENT)}}else y(I,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,_.__data)}}function y(_,p,S){typeof _=="number"||typeof _=="boolean"?p[0]=_:_.isMatrix3?(p[0]=_.elements[0],p[1]=_.elements[1],p[2]=_.elements[2],p[3]=0,p[4]=_.elements[3],p[5]=_.elements[4],p[6]=_.elements[5],p[7]=0,p[8]=_.elements[6],p[9]=_.elements[7],p[10]=_.elements[8],p[11]=0):ArrayBuffer.isView(_)?p.set(new _.constructor(_.buffer,_.byteOffset,p.length)):_.toArray(p,S)}function T(_,p,S,B){let b=_.value,I=p+"_"+S;if(B[I]===void 0)return typeof b=="number"||typeof b=="boolean"?B[I]=b:ArrayBuffer.isView(b)?B[I]=b.slice():B[I]=b.clone(),!0;{let z=B[I];if(typeof b=="number"||typeof b=="boolean"){if(z!==b)return B[I]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(z.equals(b)===!1)return z.copy(b),!0}}return!1}function g(_){let p=_.uniforms,S=0,B=16;for(let I=0,z=p.length;I<z;I++){let U=Array.isArray(p[I])?p[I]:[p[I]];for(let Y=0,E=U.length;Y<E;Y++){let M=U[Y],O=Array.isArray(M.value)?M.value:[M.value];for(let H=0,ee=O.length;H<ee;H++){let j=O[H],K=m(j),re=S%B,J=re%K.boundary,ne=re+J;S+=J,ne!==0&&B-ne<K.storage&&(S+=B-ne),M.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=S,S+=K.storage}}}let b=S%B;return b>0&&(S+=B-b),_.__size=S,_.__cache={},this}function m(_){let p={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(p.boundary=4,p.storage=4):_.isVector2?(p.boundary=8,p.storage=8):_.isVector3||_.isColor?(p.boundary=16,p.storage=12):_.isVector4?(p.boundary=16,p.storage=16):_.isMatrix3?(p.boundary=48,p.storage=48):_.isMatrix4?(p.boundary=64,p.storage=64):_.isTexture?rn("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(p.boundary=16,p.storage=_.byteLength):rn("WebGLRenderer: Unsupported uniform value type.",_),p}function L(_){let p=_.target;p.removeEventListener("dispose",L);let S=s.indexOf(p.__bindingPointIndex);s.splice(S,1),n.deleteBuffer(r[p.id]),delete r[p.id],delete a[p.id]}function F(){for(let _ in r)n.deleteBuffer(r[_]);s=[],r={},a={}}return{bind:u,update:l,dispose:F}}var bb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ia=null;function wb(){return Ia===null&&(Ia=new _l(bb,16,16,xs,oa),Ia.name="DFG_LUT",Ia.minFilter=Hi,Ia.magFilter=Hi,Ia.wrapS=_a,Ia.wrapT=_a,Ia.generateMipmaps=!1,Ia.needsUpdate=!0),Ia}var Id=class{constructor(e={}){let{canvas:t=g0(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:v=Cr}=e;this.isWebGLRenderer=!0;let y;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=i.getContextAttributes().alpha}else y=s;let T=v,g=new Set([Wu,Hu,Gu]),m=new Set([Cr,sa,Io,Co,ku,zu]),L=new Uint32Array(4),F=new Int32Array(4),_=new ge,p=null,S=null,B=[],b=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=aa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let z=this,U=!1,Y=null,E=null,M=null,O=null;this._outputColorSpace=hr;let H=0,ee=0,j=null,K=-1,re=null,J=new fi,ne=new fi,Te=null,fe=new vn(0),pe=0,Fe=t.width,ae=t.height,de=1,_e=null,Ge=null,$e=new fi(0,0,Fe,ae),ut=new fi(0,0,Fe,ae),zt=!1,ct=new xo,Tt=!1,Zt=!1,wt=new $n,bt=new ge,_t=new fi,ln={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},rt=!1;function an(){return j===null?de:1}let se=i;function mn(D,le){return t.getContext(D,le)}let nn,W,w,ue,ye,we,ze,Ye,Re,Ae,Ne,je,Ve,qe,ot,pt,He,ie,Oe,Pe,nt,dt,Be;try{let D={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:u,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",cn,!1),t.addEventListener("webglcontextrestored",dn,!1),t.addEventListener("webglcontextcreationerror",Fn,!1),se===null){let le="webgl2";if(se=mn(le,D),se===null)throw mn(le)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Rt()}catch(D){throw t.removeEventListener("webglcontextlost",cn,!1),t.removeEventListener("webglcontextrestored",dn,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),sn("WebGLRenderer: "+D.message),D}function Rt(){nn=new PM(se),nn.init(),nt=new gb(se,nn),W=new MM(se,nn,e,nt),w=new mb(se,nn),W.reversedDepthBuffer&&h&&w.buffers.depth.setReversed(!0),E=se.createFramebuffer(),M=se.createFramebuffer(),O=se.createFramebuffer(),ue=new NM(se),ye=new tb,we=new vb(se,nn,w,ye,W,nt,ue),ze=new RM(z),Ye=new Fy(se),dt=new xM(se,Ye),Re=new LM(se,Ye,ue,dt),Ae=new FM(se,Re,Ye,dt,ue),ie=new UM(se,W,we),ot=new SM(ye),Ne=new eb(z,ze,nn,W,dt,ot),je=new Mb(z,ye),Ve=new ib,qe=new cb(nn),He=new yM(z,ze,w,Ae,y,u),pt=new pb(z,Ae,W),Be=new Sb(se,ue,W,w),Oe=new _M(se,nn,ue),Pe=new DM(se,nn,ue),ue.programs=Ne.programs,z.capabilities=W,z.extensions=nn,z.properties=ye,z.renderLists=Ve,z.shadowMap=pt,z.state=w,z.info=ue}T!==Cr&&(I=new BM(T,t.width,t.height,o,r,a));let vt=new Xh(z,se);this.xr=vt,this.getContext=function(){return se},this.getContextAttributes=function(){return se.getContextAttributes()},this.forceContextLoss=function(){let D=nn.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=nn.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(D){D!==void 0&&(de=D,this.setSize(Fe,ae,!1))},this.getSize=function(D){return D.set(Fe,ae)},this.setSize=function(D,le,he=!0){if(vt.isPresenting){rn("WebGLRenderer: Can't change size while VR device is presenting.");return}Fe=D,ae=le,t.width=Math.floor(D*de),t.height=Math.floor(le*de),he===!0&&(t.style.width=D+"px",t.style.height=le+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,D,le)},this.getDrawingBufferSize=function(D){return D.set(Fe*de,ae*de).floor()},this.setDrawingBufferSize=function(D,le,he){Fe=D,ae=le,de=he,t.width=Math.floor(D*he),t.height=Math.floor(le*he),this.setViewport(0,0,D,le)},this.setEffects=function(D){if(T===Cr){sn("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let le=0;le<D.length;le++)if(D[le].isOutputPass===!0){rn("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(J)},this.getViewport=function(D){return D.copy($e)},this.setViewport=function(D,le,he,Me){D.isVector4?$e.set(D.x,D.y,D.z,D.w):$e.set(D,le,he,Me),w.viewport(J.copy($e).multiplyScalar(de).round())},this.getScissor=function(D){return D.copy(ut)},this.setScissor=function(D,le,he,Me){D.isVector4?ut.set(D.x,D.y,D.z,D.w):ut.set(D,le,he,Me),w.scissor(ne.copy(ut).multiplyScalar(de).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(D){w.setScissorTest(zt=D)},this.setOpaqueSort=function(D){_e=D},this.setTransparentSort=function(D){Ge=D},this.getClearColor=function(D){return D.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(D=!0,le=!0,he=!0){let Me=0;if(D){let Se=!1;if(j!==null){let ke=j.texture.format;Se=g.has(ke)}if(Se){let ke=j.texture.type,et=m.has(ke),Je=He.getClearColor(),ft=He.getClearAlpha(),Dt=Je.r,tn=Je.g,$t=Je.b;et?(L[0]=Dt,L[1]=tn,L[2]=$t,L[3]=ft,se.clearBufferuiv(se.COLOR,0,L)):(F[0]=Dt,F[1]=tn,F[2]=$t,F[3]=ft,se.clearBufferiv(se.COLOR,0,F))}else Me|=se.COLOR_BUFFER_BIT}le&&(Me|=se.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),he&&(Me|=se.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Me!==0&&se.clear(Me)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),Y=D},this.dispose=function(){t.removeEventListener("webglcontextlost",cn,!1),t.removeEventListener("webglcontextrestored",dn,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),He.dispose(),Ve.dispose(),qe.dispose(),ye.dispose(),ze.dispose(),Ae.dispose(),dt.dispose(),Be.dispose(),Ne.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",en),vt.removeEventListener("sessionend",xt),ni.stop()};function cn(D){D.preventDefault(),_h("WebGLRenderer: Context Lost."),U=!0}function dn(){_h("WebGLRenderer: Context Restored."),U=!1;let D=ue.autoReset,le=pt.enabled,he=pt.autoUpdate,Me=pt.needsUpdate,Se=pt.type;Rt(),ue.autoReset=D,pt.enabled=le,pt.autoUpdate=he,pt.needsUpdate=Me,pt.type=Se}function Fn(D){sn("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Dn(D){let le=D.target;le.removeEventListener("dispose",Dn),vi(le)}function vi(D){rr(D),ye.remove(D)}function rr(D){let le=ye.get(D).programs;le!==void 0&&(le.forEach(function(he){Ne.releaseProgram(he)}),D.isShaderMaterial&&Ne.releaseShaderCache(D))}this.renderBufferDirect=function(D,le,he,Me,Se,ke){le===null&&(le=ln);let et=Se.isMesh&&Se.matrixWorld.determinantAffine()<0,Je=Ei(D,le,he,Me,Se);w.setMaterial(Me,et);let ft=he.index,Dt=1;if(Me.wireframe===!0){if(ft=Re.getWireframeAttribute(he),ft===void 0)return;Dt=2}let tn=he.drawRange,$t=he.attributes.position,Et=tn.start*Dt,hn=(tn.start+tn.count)*Dt;ke!==null&&(Et=Math.max(Et,ke.start*Dt),hn=Math.min(hn,(ke.start+ke.count)*Dt)),ft!==null?(Et=Math.max(Et,0),hn=Math.min(hn,ft.count)):$t!=null&&(Et=Math.max(Et,0),hn=Math.min(hn,$t.count));let Vn=hn-Et;if(Vn<0||Vn===1/0)return;dt.setup(Se,Me,Je,he,ft);let It,Qt=Oe;if(ft!==null&&(It=Ye.get(ft),Qt=Pe,Qt.setIndex(It)),Se.isMesh)Me.wireframe===!0?(w.setLineWidth(Me.wireframeLinewidth*an()),Qt.setMode(se.LINES)):Qt.setMode(se.TRIANGLES);else if(Se.isLine){let jt=Me.linewidth;jt===void 0&&(jt=1),w.setLineWidth(jt*an()),Se.isLineSegments?Qt.setMode(se.LINES):Se.isLineLoop?Qt.setMode(se.LINE_LOOP):Qt.setMode(se.LINE_STRIP)}else Se.isPoints?Qt.setMode(se.POINTS):Se.isSprite&&Qt.setMode(se.TRIANGLES);if(Se.isBatchedMesh)if(nn.get("WEBGL_multi_draw"))Qt.renderMultiDraw(Se._multiDrawStarts,Se._multiDrawCounts,Se._multiDrawCount);else{let jt=Se._multiDrawStarts,Le=Se._multiDrawCounts,An=Se._multiDrawCount,pn=ft?Ye.get(ft).bytesPerElement:1,yi=ye.get(Me).currentProgram.getUniforms();for(let or=0;or<An;or++)yi.setValue(se,"_gl_DrawID",or),Qt.render(jt[or]/pn,Le[or])}else if(Se.isInstancedMesh)Qt.renderInstances(Et,Vn,Se.count);else if(he.isInstancedBufferGeometry){let jt=he._maxInstanceCount!==void 0?he._maxInstanceCount:1/0,Le=Math.min(he.instanceCount,jt);Qt.renderInstances(Et,Vn,Le)}else Qt.render(Et,Vn)};function yn(D,le,he,Me){Y!==null&&D.isNodeMaterial&&Y.setObject(Me,D),Tt===!0&&ot.setState(D,he,!1),D.transparent===!0&&D.side===Ir&&D.forceSinglePass===!1?(D.side=pr,D.needsUpdate=!0,Bn(D,le,Me),D.side=ms,D.needsUpdate=!0,Bn(D,le,Me),D.side=Ir):Bn(D,le,Me)}this.compile=function(D,le,he=null){he===null&&(he=D),Y!==null&&Y.renderStart(D,le,he),S=qe.get(he),S.init(le),b.push(S),he.traverseVisible(function(Se){Se.isLight&&Se.layers.test(le.layers)&&(S.pushLight(Se),Se.castShadow&&S.pushShadow(Se))}),D!==he&&D.traverseVisible(function(Se){Se.isLight&&Se.layers.test(le.layers)&&(S.pushLight(Se),Se.castShadow&&S.pushShadow(Se))}),S.setupLights(),Y!==null&&Y.updateLights(S.state.lightsArray),Zt=this.localClippingEnabled,Tt=ot.init(this.clippingPlanes,Zt),Tt===!0&&ot.setGlobalState(this.clippingPlanes,le),Y!==null&&pt.render(S.state.shadowsArray,he,le);let Me=new Set;return D.traverse(function(Se){if(!(Se.isMesh||Se.isPoints||Se.isLine||Se.isSprite))return;let ke=Se.material;if(ke)if(Array.isArray(ke))for(let et=0;et<ke.length;et++){let Je=ke[et];yn(Je,he,le,Se),Me.add(Je)}else yn(ke,he,le,Se),Me.add(ke)}),S=b.pop(),Y!==null&&Y.renderEnd(),Me},this.compileAsync=function(D,le,he=null){let Me=this.compile(D,le,he);return new Promise(Se=>{function ke(){if(Me.forEach(function(et){let ft=ye.get(et).currentProgram;(ft===void 0||ft.isReady())&&Me.delete(et)}),Me.size===0){Se(D);return}setTimeout(ke,10)}nn.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let En=null;function Yi(D){En&&En(D)}function en(){ni.stop()}function xt(){ni.start()}let ni=new $0;ni.setAnimationLoop(Yi),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(D){En=D,vt.setAnimationLoop(D),D===null?ni.stop():ni.start()},vt.addEventListener("sessionstart",en),vt.addEventListener("sessionend",xt),this.render=function(D,le){if(le!==void 0&&le.isCamera!==!0){sn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;Y!==null&&Y.renderStart(D,le);let he=vt.enabled===!0&&vt.isPresenting===!0,Me=I!==null&&(j===null||he)&&I.begin(z,j);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),le.parent===null&&le.matrixWorldAutoUpdate===!0&&le.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(le),le=vt.getCamera()),D.isScene===!0&&D.onBeforeRender(z,D,le,j),S=qe.get(D,b.length),S.init(le),S.state.textureUnits=we.getTextureUnits(),b.push(S),wt.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),ct.setFromProjectionMatrix(wt,ra,le.reversedDepth),Zt=this.localClippingEnabled,Tt=ot.init(this.clippingPlanes,Zt),p=Ve.get(D,B.length),p.init(),B.push(p),vt.enabled===!0&&vt.isPresenting===!0){let et=z.xr.getDepthSensingMesh();et!==null&&fn(et,le,-1/0,z.sortObjects)}fn(D,le,0,z.sortObjects),p.finish(),Y!==null&&Y.updateLights(S.state.lightsArray),z.sortObjects===!0&&p.sort(_e,Ge),rt=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,rt&&He.addToRenderList(p,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Tt===!0&&ot.beginShadows();let Se=S.state.shadowsArray;if(pt.render(Se,D,le),Tt===!0&&ot.endShadows(),(Me&&I.hasRenderPass())===!1){let et=p.opaque,Je=p.transmissive;if(S.setupLights(),le.isArrayCamera){let ft=le.cameras;if(Je.length>0)for(let Dt=0,tn=ft.length;Dt<tn;Dt++){let $t=ft[Dt];qi(et,Je,D,$t)}rt&&He.render(D);for(let Dt=0,tn=ft.length;Dt<tn;Dt++){let $t=ft[Dt];bi(p,D,$t,$t.viewport)}}else Je.length>0&&qi(et,Je,D,le),rt&&He.render(D),bi(p,D,le)}j!==null&&ee===0&&(we.updateMultisampleRenderTarget(j),we.updateRenderTargetMipmap(j)),Me&&I.end(z),D.isScene===!0&&D.onAfterRender(z,D,le),dt.resetDefaultState(),K=-1,re=null,b.pop(),b.length>0?(S=b[b.length-1],we.setTextureUnits(S.state.textureUnits),Tt===!0&&ot.setGlobalState(z.clippingPlanes,S.state.camera)):S=null,B.pop(),B.length>0?p=B[B.length-1]:p=null,Y!==null&&Y.renderEnd()};function fn(D,le,he,Me){if(D.visible===!1)return;if(D.layers.test(le.layers)){if(D.isGroup)he=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(le);else if(D.isLightProbeGrid)S.pushLightProbeGrid(D);else if(D.isLight)S.pushLight(D),D.castShadow&&S.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(ct)){Me&&_t.setFromMatrixPosition(D.matrixWorld).applyMatrix4(wt);let et=Ae.update(D),Je=D.material;Je.visible&&p.push(D,et,Je,he,_t.z,null,le)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(ct))){let et=Ae.update(D),Je=D.material;if(Me&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),_t.copy(D.boundingSphere.center)):(et.boundingSphere===null&&et.computeBoundingSphere(),_t.copy(et.boundingSphere.center)),_t.applyMatrix4(D.matrixWorld).applyMatrix4(wt)),Array.isArray(Je)){let ft=et.groups;for(let Dt=0,tn=ft.length;Dt<tn;Dt++){let $t=ft[Dt],Et=Je[$t.materialIndex];Et&&Et.visible&&p.push(D,et,Et,he,_t.z,$t,le)}}else Je.visible&&p.push(D,et,Je,he,_t.z,null,le)}}let ke=D.children;for(let et=0,Je=ke.length;et<Je;et++)fn(ke[et],le,he,Me)}function bi(D,le,he,Me){let{opaque:Se,transmissive:ke,transparent:et}=D;S.setupLightsView(he),Tt===!0&&ot.setGlobalState(z.clippingPlanes,he),Me&&w.viewport(J.copy(Me)),Se.length>0&&wi(Se,le,he),ke.length>0&&wi(ke,le,he),et.length>0&&wi(et,le,he),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function qi(D,le,he,Me){if((he.isScene===!0?he.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Me.id]===void 0){let Et=nn.has("EXT_color_buffer_half_float")||nn.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Me.id]=new Ar(1,1,{generateMipmaps:!0,type:Et?oa:Cr,minFilter:gs,samples:Math.max(4,W.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ln.workingColorSpace})}let ke=S.state.transmissionRenderTarget[Me.id],et=Me.viewport||J;ke.setSize(et.z*z.transmissionResolutionScale,et.w*z.transmissionResolutionScale);let Je=z.getRenderTarget(),ft=z.getActiveCubeFace(),Dt=z.getActiveMipmapLevel();z.setRenderTarget(ke),z.getClearColor(fe),pe=z.getClearAlpha(),pe<1&&z.setClearColor(16777215,.5),z.clear(),rt&&He.render(he);let tn=z.toneMapping;z.toneMapping=aa;let $t=Me.viewport;if(Me.viewport!==void 0&&(Me.viewport=void 0),S.setupLightsView(Me),Tt===!0&&ot.setGlobalState(z.clippingPlanes,Me),wi(D,he,Me),we.updateMultisampleRenderTarget(ke),we.updateRenderTargetMipmap(ke),nn.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let hn=0,Vn=le.length;hn<Vn;hn++){let It=le[hn],{object:Qt,geometry:jt,material:Le,group:An}=It;if(Le.side===Ir&&Qt.layers.test(Me.layers)){let pn=Le.side;Le.side=pr,Le.needsUpdate=!0,gi(Qt,he,Me,jt,Le,An),Le.side=pn,Le.needsUpdate=!0,Et=!0}}Et===!0&&(we.updateMultisampleRenderTarget(ke),we.updateRenderTargetMipmap(ke))}z.setRenderTarget(Je,ft,Dt),z.setClearColor(fe,pe),$t!==void 0&&(Me.viewport=$t),z.toneMapping=tn}function wi(D,le,he){let Me=le.isScene===!0?le.overrideMaterial:null;for(let Se=0,ke=D.length;Se<ke;Se++){let et=D[Se],{object:Je,geometry:ft,group:Dt}=et,tn=et.material;tn.allowOverride===!0&&Me!==null&&(tn=Me),Je.layers.test(he.layers)&&gi(Je,le,he,ft,tn,Dt)}}function gi(D,le,he,Me,Se,ke){Y!==null&&Se.isNodeMaterial&&Y.setObject(D,Se),D.onBeforeRender(z,le,he,Me,Se,ke),D.modelViewMatrix.multiplyMatrices(he.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Se.onBeforeRender(z,le,he,Me,D,ke),Se.transparent===!0&&Se.side===Ir&&Se.forceSinglePass===!1?(Se.side=pr,Se.needsUpdate=!0,z.renderBufferDirect(he,le,Me,Se,D,ke),Se.side=ms,Se.needsUpdate=!0,z.renderBufferDirect(he,le,Me,Se,D,ke),Se.side=Ir):z.renderBufferDirect(he,le,Me,Se,D,ke),D.onAfterRender(z,le,he,Me,Se,ke)}function Bn(D,le,he){le.isScene!==!0&&(le=ln);let Me=ye.get(D),Se=S.state.lights,ke=S.state.shadowsArray,et=Se.state.version,Je=Ne.getParameters(D,Se.state,ke,le,he,S.state.lightProbeGridArray),ft=Ne.getProgramCacheKey(Je),Dt=Me.programs;Me.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?le.environment:null,Me.fog=le.fog;let tn=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Me.envMap=ze.get(D.envMap||Me.environment,tn),Me.envMapRotation=Me.environment!==null&&D.envMap===null?le.environmentRotation:D.envMapRotation,Dt===void 0&&(D.addEventListener("dispose",Dn),Dt=new Map,Me.programs=Dt);let $t=Dt.get(ft);if($t!==void 0){if(Me.currentProgram===$t&&Me.lightsStateVersion===et)return la(D,Je),$t}else Je.uniforms=Ne.getUniforms(D),Y!==null&&D.isNodeMaterial&&Y.build(D,he,Je),D.onBeforeCompile(Je,z),$t=Ne.acquireProgram(Je,ft),Dt.set(ft,$t),Me.uniforms=Je.uniforms;let Et=Me.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Et.clippingPlanes=ot.uniform),la(D,Je),Me.needsLights=sr(D),Me.lightsStateVersion=et,Me.needsLights&&(Et.ambientLightColor.value=Se.state.ambient,Et.lightProbe.value=Se.state.probe,Et.sunLights.value=Se.state.sun,Et.sunLightShadows.value=Se.state.sunShadow,Et.directionalLights.value=Se.state.directional,Et.directionalLightShadows.value=Se.state.directionalShadow,Et.spotLights.value=Se.state.spot,Et.spotLightShadows.value=Se.state.spotShadow,Et.rectAreaLights.value=Se.state.rectArea,Et.ltc_1.value=Se.state.rectAreaLTC1,Et.ltc_2.value=Se.state.rectAreaLTC2,Et.pointLights.value=Se.state.point,Et.pointLightShadows.value=Se.state.pointShadow,Et.hemisphereLights.value=Se.state.hemi,Et.sunShadowMatrix.value=Se.state.sunShadowMatrix,Et.sunShadowCascade.value=Se.state.sunShadowCascade,Et.directionalShadowMatrix.value=Se.state.directionalShadowMatrix,Et.spotLightMatrix.value=Se.state.spotLightMatrix,Et.spotLightMap.value=Se.state.spotLightMap,Et.pointShadowMatrix.value=Se.state.pointShadowMatrix),Me.lightProbeGrid=S.state.lightProbeGridArray.length>0,Me.currentProgram=$t,Me.uniformsList=null,$t}function ar(D){if(D.uniformsList===null){let le=D.currentProgram.getUniforms();D.uniformsList=Do.seqWithValue(le.seq,D.uniforms)}return D.uniformsList}function la(D,le){let he=ye.get(D);he.outputColorSpace=le.outputColorSpace,he.batching=le.batching,he.batchingColor=le.batchingColor,he.instancing=le.instancing,he.instancingColor=le.instancingColor,he.instancingMorph=le.instancingMorph,he.skinning=le.skinning,he.morphTargets=le.morphTargets,he.morphNormals=le.morphNormals,he.morphColors=le.morphColors,he.morphTargetsCount=le.morphTargetsCount,he.numClippingPlanes=le.numClippingPlanes,he.numIntersection=le.numClipIntersection,he.vertexAlphas=le.vertexAlphas,he.vertexTangents=le.vertexTangents,he.toneMapping=le.toneMapping}function Za(D,le){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;_.setFromMatrixPosition(le.matrixWorld);for(let he=0,Me=D.length;he<Me;he++){let Se=D[he];if(Se.texture!==null&&Se.boundingBox.containsPoint(_))return Se}return null}function Ei(D,le,he,Me,Se){le.isScene!==!0&&(le=ln),we.resetTextureUnits();let ke=le.fog,et=Me.isMeshStandardMaterial||Me.isMeshLambertMaterial||Me.isMeshPhongMaterial?le.environment:null,Je=j===null?z.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ln.workingColorSpace,ft=Me.isMeshStandardMaterial||Me.isMeshLambertMaterial&&!Me.envMap||Me.isMeshPhongMaterial&&!Me.envMap,Dt=ze.get(Me.envMap||et,ft),tn=Me.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,$t=!!he.attributes.tangent&&(!!Me.normalMap||Me.anisotropy>0),Et=!!he.morphAttributes.position,hn=!!he.morphAttributes.normal,Vn=!!he.morphAttributes.color,It=aa;Me.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(It=z.toneMapping);let Qt=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,jt=Qt!==void 0?Qt.length:0,Le=ye.get(Me),An=S.state.lights;if(Tt===!0&&(Zt===!0||D!==re)){let kn=D===re&&Me.id===K;ot.setState(Me,D,kn)}let pn=!1;Me.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==An.state.version||Le.outputColorSpace!==Je||Se.isBatchedMesh&&Le.batching===!1||!Se.isBatchedMesh&&Le.batching===!0||Se.isBatchedMesh&&Le.batchingColor===!0&&Se._colorsTexture===null||Se.isBatchedMesh&&Le.batchingColor===!1&&Se._colorsTexture!==null||Se.isInstancedMesh&&Le.instancing===!1||!Se.isInstancedMesh&&Le.instancing===!0||Se.isSkinnedMesh&&Le.skinning===!1||!Se.isSkinnedMesh&&Le.skinning===!0||Se.isInstancedMesh&&Le.instancingColor===!0&&Se.instanceColor===null||Se.isInstancedMesh&&Le.instancingColor===!1&&Se.instanceColor!==null||Se.isInstancedMesh&&Le.instancingMorph===!0&&Se.morphTexture===null||Se.isInstancedMesh&&Le.instancingMorph===!1&&Se.morphTexture!==null||Le.envMap!==Dt||Me.fog===!0&&Le.fog!==ke||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ot.numPlanes||Le.numIntersection!==ot.numIntersection)||Le.vertexAlphas!==tn||Le.vertexTangents!==$t||Le.morphTargets!==Et||Le.morphNormals!==hn||Le.morphColors!==Vn||Le.toneMapping!==It||Le.morphTargetsCount!==jt||!!Le.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(pn=!0):(pn=!0,Le.__version=Me.version);let yi=Le.currentProgram;pn===!0&&(yi=Bn(Me,le,Se),Y&&Me.isNodeMaterial&&Y.onUpdateProgram(Me,yi,Le));let or=!1,Li=!1,vr=!1,Mn=yi.getUniforms(),Yn=Le.uniforms;if(w.useProgram(yi.program)&&(or=!0,Li=!0,vr=!0),Me.id!==K&&(K=Me.id,Li=!0),Le.needsLights){let kn=Za(S.state.lightProbeGridArray,Se);Le.lightProbeGrid!==kn&&(Le.lightProbeGrid=kn,Li=!0)}if(or||re!==D){w.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Mn.setValue(se,"projectionMatrix",D.projectionMatrix),Mn.setValue(se,"viewMatrix",D.matrixWorldInverse);let ki=Mn.map.cameraPosition;ki!==void 0&&ki.setValue(se,bt.setFromMatrixPosition(D.matrixWorld)),W.logarithmicDepthBuffer&&Mn.setValue(se,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Me.isMeshPhongMaterial||Me.isMeshToonMaterial||Me.isMeshLambertMaterial||Me.isMeshBasicMaterial||Me.isMeshStandardMaterial||Me.isShaderMaterial)&&Mn.setValue(se,"isOrthographic",D.isOrthographicCamera===!0),re!==D&&(re=D,Li=!0,vr=!0)}if(Le.needsLights&&(An.state.sunShadowMap.length>0&&Mn.setValue(se,"sunShadowMap",An.state.sunShadowMap,we),An.state.directionalShadowMap.length>0&&Mn.setValue(se,"directionalShadowMap",An.state.directionalShadowMap,we),An.state.spotShadowMap.length>0&&Mn.setValue(se,"spotShadowMap",An.state.spotShadowMap,we),An.state.pointShadowMap.length>0&&Mn.setValue(se,"pointShadowMap",An.state.pointShadowMap,we)),Se.isSkinnedMesh){Mn.setOptional(se,Se,"bindMatrix"),Mn.setOptional(se,Se,"bindMatrixInverse");let kn=Se.skeleton;kn&&(kn.boneTexture===null&&kn.computeBoneTexture(),Mn.setValue(se,"boneTexture",kn.boneTexture,we))}Se.isBatchedMesh&&(Mn.setOptional(se,Se,"batchingTexture"),Mn.setValue(se,"batchingTexture",Se._matricesTexture,we),Mn.setOptional(se,Se,"batchingIdTexture"),Mn.setValue(se,"batchingIdTexture",Se._indirectTexture,we),Mn.setOptional(se,Se,"batchingColorTexture"),Se._colorsTexture!==null&&Mn.setValue(se,"batchingColorTexture",Se._colorsTexture,we));let Zi=he.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&ie.update(Se,he,yi),(Li||Le.receiveShadow!==Se.receiveShadow)&&(Le.receiveShadow=Se.receiveShadow,Mn.setValue(se,"receiveShadow",Se.receiveShadow)),(Me.isMeshStandardMaterial||Me.isMeshLambertMaterial||Me.isMeshPhongMaterial)&&Me.envMap===null&&le.environment!==null&&(Yn.envMapIntensity.value=le.environmentIntensity),Yn.dfgLUT!==void 0&&(Yn.dfgLUT.value=wb()),Li){if(Mn.setValue(se,"toneMappingExposure",z.toneMappingExposure),Le.needsLights&&mr(Yn,vr),ke&&Me.fog===!0&&je.refreshFogUniforms(Yn,ke),je.refreshMaterialUniforms(Yn,Me,de,ae,S.state.transmissionRenderTarget[D.id]),Le.needsLights&&Le.lightProbeGrid){let kn=Le.lightProbeGrid;Yn.probesSH.value=kn.texture,Yn.probesMin.value.copy(kn.boundingBox.min),Yn.probesMax.value.copy(kn.boundingBox.max),Yn.probesResolution.value.copy(kn.resolution)}Do.upload(se,ar(Le),Yn,we)}if(Me.isShaderMaterial&&Me.uniformsNeedUpdate===!0&&(Do.upload(se,ar(Le),Yn,we),Me.uniformsNeedUpdate=!1),Me.isSpriteMaterial&&Mn.setValue(se,"center",Se.center),Mn.setValue(se,"modelViewMatrix",Se.modelViewMatrix),Mn.setValue(se,"normalMatrix",Se.normalMatrix),Mn.setValue(se,"modelMatrix",Se.matrixWorld),Me.uniformsGroups!==void 0){let kn=Me.uniformsGroups;for(let ki=0,ca=kn.length;ki<ca;ki++){let lr=kn[ki];Be.update(lr,yi),Be.bind(lr,yi)}}return yi}function mr(D,le){D.ambientLightColor.needsUpdate=le,D.lightProbe.needsUpdate=le,D.sunLights.needsUpdate=le,D.sunLightShadows.needsUpdate=le,D.directionalLights.needsUpdate=le,D.directionalLightShadows.needsUpdate=le,D.pointLights.needsUpdate=le,D.pointLightShadows.needsUpdate=le,D.spotLights.needsUpdate=le,D.spotLightShadows.needsUpdate=le,D.rectAreaLights.needsUpdate=le,D.hemisphereLights.needsUpdate=le}function sr(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(D,le,he){let Me=ye.get(D);Me.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Me.__autoAllocateDepthBuffer===!1&&(Me.__useRenderToTexture=!1),ye.get(D.texture).__webglTexture=le,ye.get(D.depthTexture).__webglTexture=Me.__autoAllocateDepthBuffer?void 0:he,Me.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,le){let he=ye.get(D);he.__webglFramebuffer=le,he.__useDefaultFramebuffer=le===void 0},this.setRenderTarget=function(D,le=0,he=0){j=D,H=le,ee=he;let Me=null,Se=!1,ke=!1;if(D){let Je=ye.get(D);if(Je.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(se.FRAMEBUFFER,Je.__webglFramebuffer),J.copy(D.viewport),ne.copy(D.scissor),Te=D.scissorTest,w.viewport(J),w.scissor(ne),w.setScissorTest(Te),K=-1;return}else if(Je.__webglFramebuffer===void 0)we.setupRenderTarget(D);else if(Je.__hasExternalTextures)we.rebindTextures(D,ye.get(D.texture).__webglTexture,ye.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let tn=D.depthTexture;if(Je.__boundDepthTexture!==tn){if(tn!==null&&ye.has(tn)&&(D.width!==tn.image.width||D.height!==tn.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");we.setupDepthRenderbuffer(D)}}let ft=D.texture;(ft.isData3DTexture||ft.isDataArrayTexture||ft.isCompressedArrayTexture)&&(ke=!0);let Dt=ye.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Dt[le])?Me=Dt[le][he]:Me=Dt[le],Se=!0):D.samples>0&&we.useMultisampledRTT(D)===!1?Me=ye.get(D).__webglMultisampledFramebuffer:Array.isArray(Dt)?Me=Dt[he]:Me=Dt,J.copy(D.viewport),ne.copy(D.scissor),Te=D.scissorTest}else J.copy($e).multiplyScalar(de).floor(),ne.copy(ut).multiplyScalar(de).floor(),Te=zt;if(he!==0&&(Me=E),w.bindFramebuffer(se.FRAMEBUFFER,Me)&&w.drawBuffers(D,Me),w.viewport(J),w.scissor(ne),w.setScissorTest(Te),Se){let Je=ye.get(D.texture);se.framebufferTexture2D(se.FRAMEBUFFER,se.COLOR_ATTACHMENT0,se.TEXTURE_CUBE_MAP_POSITIVE_X+le,Je.__webglTexture,he)}else if(ke){let Je=le;for(let ft=0;ft<D.textures.length;ft++){let Dt=ye.get(D.textures[ft]);se.framebufferTextureLayer(se.FRAMEBUFFER,se.COLOR_ATTACHMENT0+ft,Dt.__webglTexture,he,Je)}}else if(D!==null&&he!==0){let Je=ye.get(D.texture);se.framebufferTexture2D(se.FRAMEBUFFER,se.COLOR_ATTACHMENT0,se.TEXTURE_2D,Je.__webglTexture,he)}K=-1};function Vr(D){let le=ye.get(D);return(le.__readFormat!==D.format||le.__readType!==D.type)&&(le.__readFormat=D.format,le.__readType=D.type,le.__formatReadable=W.textureFormatReadable(D.format),le.__typeReadable=W.textureTypeReadable(D.type)),le}this.readRenderTargetPixels=function(D,le,he,Me,Se,ke,et,Je=0){if(!(D&&D.isWebGLRenderTarget)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=ye.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&et!==void 0&&(ft=ft[et]),ft){w.bindFramebuffer(se.FRAMEBUFFER,ft);try{let Dt=D.textures[Je],tn=Dt.format,$t=Dt.type;D.textures.length>1&&se.readBuffer(se.COLOR_ATTACHMENT0+Je);let Et=Vr(Dt);if(Et.__formatReadable===!1){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}le>=0&&le<=D.width-Me&&he>=0&&he<=D.height-Se&&se.readPixels(le,he,Me,Se,nt.convert(tn),nt.convert($t),ke)}finally{let Dt=j!==null?ye.get(j).__webglFramebuffer:null;w.bindFramebuffer(se.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(D,le,he,Me,Se,ke,et,Je=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=ye.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&et!==void 0&&(ft=ft[et]),ft)if(le>=0&&le<=D.width-Me&&he>=0&&he<=D.height-Se){w.bindFramebuffer(se.FRAMEBUFFER,ft);let Dt=D.textures[Je],tn=Dt.format,$t=Dt.type;D.textures.length>1&&se.readBuffer(se.COLOR_ATTACHMENT0+Je);let Et=Vr(Dt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let hn=se.createBuffer();se.bindBuffer(se.PIXEL_PACK_BUFFER,hn),se.bufferData(se.PIXEL_PACK_BUFFER,ke.byteLength,se.STREAM_READ),se.readPixels(le,he,Me,Se,nt.convert(tn),nt.convert($t),0),se.bindBuffer(se.PIXEL_PACK_BUFFER,null);let Vn=j!==null?ye.get(j).__webglFramebuffer:null;w.bindFramebuffer(se.FRAMEBUFFER,Vn);let It=se.fenceSync(se.SYNC_GPU_COMMANDS_COMPLETE,0);return se.flush(),await x0(se,It,4),se.bindBuffer(se.PIXEL_PACK_BUFFER,hn),se.getBufferSubData(se.PIXEL_PACK_BUFFER,0,ke),se.bindBuffer(se.PIXEL_PACK_BUFFER,null),se.deleteBuffer(hn),se.deleteSync(It),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,le=null,he=0){let Me=Math.pow(2,-he),Se=Math.floor(D.image.width*Me),ke=Math.floor(D.image.height*Me),et=le!==null?le.x:0,Je=le!==null?le.y:0;we.setTexture2D(D,0),se.copyTexSubImage2D(se.TEXTURE_2D,he,0,0,et,Je,Se,ke),w.unbindTexture()},this.copyTextureToTexture=function(D,le,he=null,Me=null,Se=0,ke=0){let et,Je,ft,Dt,tn,$t,Et,hn,Vn,It=D.isCompressedTexture?D.mipmaps[ke]:D.image;if(he!==null)et=he.max.x-he.min.x,Je=he.max.y-he.min.y,ft=he.isBox3?he.max.z-he.min.z:1,Dt=he.min.x,tn=he.min.y,$t=he.isBox3?he.min.z:0;else{let Yn=Math.pow(2,-Se);et=Math.floor(It.width*Yn),Je=Math.floor(It.height*Yn),D.isDataArrayTexture?ft=It.depth:D.isData3DTexture?ft=Math.floor(It.depth*Yn):ft=1,Dt=0,tn=0,$t=0}Me!==null?(Et=Me.x,hn=Me.y,Vn=Me.z):(Et=0,hn=0,Vn=0);let Qt=nt.convert(le.format),jt=nt.convert(le.type),Le;le.isData3DTexture?(we.setTexture3D(le,0),Le=se.TEXTURE_3D):le.isDataArrayTexture||le.isCompressedArrayTexture?(we.setTexture2DArray(le,0),Le=se.TEXTURE_2D_ARRAY):(we.setTexture2D(le,0),Le=se.TEXTURE_2D),w.activeTexture(se.TEXTURE0),w.pixelStorei(se.UNPACK_FLIP_Y_WEBGL,le.flipY),w.pixelStorei(se.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),w.pixelStorei(se.UNPACK_ALIGNMENT,le.unpackAlignment);let An=w.getParameter(se.UNPACK_ROW_LENGTH),pn=w.getParameter(se.UNPACK_IMAGE_HEIGHT),yi=w.getParameter(se.UNPACK_SKIP_PIXELS),or=w.getParameter(se.UNPACK_SKIP_ROWS),Li=w.getParameter(se.UNPACK_SKIP_IMAGES);w.pixelStorei(se.UNPACK_ROW_LENGTH,It.width),w.pixelStorei(se.UNPACK_IMAGE_HEIGHT,It.height),w.pixelStorei(se.UNPACK_SKIP_PIXELS,Dt),w.pixelStorei(se.UNPACK_SKIP_ROWS,tn),w.pixelStorei(se.UNPACK_SKIP_IMAGES,$t);let vr=D.isDataArrayTexture||D.isData3DTexture,Mn=le.isDataArrayTexture||le.isData3DTexture;if(D.isDepthTexture){let Yn=ye.get(D),Zi=ye.get(le),kn=ye.get(Yn.__renderTarget),ki=ye.get(Zi.__renderTarget);w.bindFramebuffer(se.READ_FRAMEBUFFER,kn.__webglFramebuffer),w.bindFramebuffer(se.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let ca=0;ca<ft;ca++)vr&&(se.framebufferTextureLayer(se.READ_FRAMEBUFFER,se.COLOR_ATTACHMENT0,ye.get(D).__webglTexture,Se,$t+ca),se.framebufferTextureLayer(se.DRAW_FRAMEBUFFER,se.COLOR_ATTACHMENT0,ye.get(le).__webglTexture,ke,Vn+ca)),se.blitFramebuffer(Dt,tn,et,Je,Et,hn,et,Je,se.DEPTH_BUFFER_BIT,se.NEAREST);w.bindFramebuffer(se.READ_FRAMEBUFFER,null),w.bindFramebuffer(se.DRAW_FRAMEBUFFER,null)}else if(Se!==0||D.isRenderTargetTexture||ye.has(D)){let Yn=ye.get(D),Zi=ye.get(le);w.bindFramebuffer(se.READ_FRAMEBUFFER,M),w.bindFramebuffer(se.DRAW_FRAMEBUFFER,O);for(let kn=0;kn<ft;kn++)vr?se.framebufferTextureLayer(se.READ_FRAMEBUFFER,se.COLOR_ATTACHMENT0,Yn.__webglTexture,Se,$t+kn):se.framebufferTexture2D(se.READ_FRAMEBUFFER,se.COLOR_ATTACHMENT0,se.TEXTURE_2D,Yn.__webglTexture,Se),Mn?se.framebufferTextureLayer(se.DRAW_FRAMEBUFFER,se.COLOR_ATTACHMENT0,Zi.__webglTexture,ke,Vn+kn):se.framebufferTexture2D(se.DRAW_FRAMEBUFFER,se.COLOR_ATTACHMENT0,se.TEXTURE_2D,Zi.__webglTexture,ke),Se!==0?se.blitFramebuffer(Dt,tn,et,Je,Et,hn,et,Je,se.COLOR_BUFFER_BIT,se.NEAREST):Mn?se.copyTexSubImage3D(Le,ke,Et,hn,Vn+kn,Dt,tn,et,Je):se.copyTexSubImage2D(Le,ke,Et,hn,Dt,tn,et,Je);w.bindFramebuffer(se.READ_FRAMEBUFFER,null),w.bindFramebuffer(se.DRAW_FRAMEBUFFER,null)}else Mn?D.isDataTexture||D.isData3DTexture?se.texSubImage3D(Le,ke,Et,hn,Vn,et,Je,ft,Qt,jt,It.data):le.isCompressedArrayTexture?se.compressedTexSubImage3D(Le,ke,Et,hn,Vn,et,Je,ft,Qt,It.data):se.texSubImage3D(Le,ke,Et,hn,Vn,et,Je,ft,Qt,jt,It):D.isDataTexture?se.texSubImage2D(se.TEXTURE_2D,ke,Et,hn,et,Je,Qt,jt,It.data):D.isCompressedTexture?se.compressedTexSubImage2D(se.TEXTURE_2D,ke,Et,hn,It.width,It.height,Qt,It.data):se.texSubImage2D(se.TEXTURE_2D,ke,Et,hn,et,Je,Qt,jt,It);w.pixelStorei(se.UNPACK_ROW_LENGTH,An),w.pixelStorei(se.UNPACK_IMAGE_HEIGHT,pn),w.pixelStorei(se.UNPACK_SKIP_PIXELS,yi),w.pixelStorei(se.UNPACK_SKIP_ROWS,or),w.pixelStorei(se.UNPACK_SKIP_IMAGES,Li),ke===0&&le.generateMipmaps&&se.generateMipmap(Le),w.unbindTexture()},this.initRenderTarget=function(D){ye.get(D).__webglFramebuffer===void 0&&we.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?we.setTextureCube(D,0):D.isData3DTexture?we.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?we.setTexture2DArray(D,0):we.setTexture2D(D,0),w.unbindTexture()},this.resetState=function(){H=0,ee=0,j=null,w.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ln._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ln._getUnpackColorSpace()}};var Pd=function(){return Pd=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Pd.apply(this,arguments)},ti=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Kl=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},iv=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function Tb(n){for(var e=atob(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);for(var r=new DataView(t.buffer,t.byteOffset,t.byteLength),a=r.getUint32(8,!0),s=r.getUint32(12,!0),o=new Float32Array(a*3),u=new Float32Array(a*3),l=new Float32Array(a*2),d=16,i=0;i<a;i++)o[i*3]=r.getFloat32(d,!0),o[i*3+1]=r.getFloat32(d+4,!0),o[i*3+2]=r.getFloat32(d+8,!0),u[i*3]=r.getFloat32(d+12,!0),u[i*3+1]=r.getFloat32(d+16,!0),u[i*3+2]=r.getFloat32(d+20,!0),l[i*2]=r.getFloat32(d+24,!0),l[i*2+1]=r.getFloat32(d+28,!0),d+=32;for(var f=new Uint16Array(s),i=0;i<s;i++)f[i]=r.getUint16(d+i*2,!0);var h=new Wi;return h.setAttribute("position",new Xn(o,3)),h.setAttribute("normal",new Xn(u,3)),h.setAttribute("uv",new Xn(l,2)),h.setIndex(Array.from(f)),h}function rv(n,e,t){return!n||t>=1?0:t<=-1?1.1:(1-t)*.55}function Eb(n,e,t){var i,r,a,s,o,u,l,d,f,h,v,y,T,g,m,L,F,_=new Er,p=!!n.fairwayRamp,S=(T=n.cupX)!==null&&T!==void 0?T:0,B=(g=n.cupZ)!==null&&g!==void 0?g:-4.8,b=(m=n.cupRadius)!==null&&m!==void 0?m:.23,I=new Or(1,1,1),z=new Map,U=function(Ae,Ne,je,Ve,qe,ot,pt){var He=z.get(pt);He||(He=new Xi({color:pt}),z.set(pt,He));var ie=new jn(I,He);ie.position.set(Ae,Ne,je),ie.scale.set(Ve,qe,ot),_.add(ie)};try{for(var Y=ti([-3.2,3.2]),E=Y.next();!E.done;E=Y.next()){var M=E.value;U(M,-.65,0,.2,1.1,14.6,"#a1b8b1"),U(M-Math.sign(M)*.1,-.18,0,.2,.25,14.4,"#e9cea5")}}catch(Ae){i={error:Ae}}finally{try{E&&!E.done&&(r=Y.return)&&r.call(Y)}finally{if(i)throw i.error}}try{for(var O=ti([-7.2,7.2]),H=O.next();!H.done;H=O.next()){var ee=H.value;U(0,-.65,ee,6.4,1.1,.2,"#a1b8b1"),U(0,-.18,ee-Math.sign(ee)*.1,6.2,.25,.2,"#e9cea5")}}catch(Ae){a={error:Ae}}finally{try{H&&!H.done&&(s=O.return)&&s.call(O)}finally{if(a)throw a.error}}var j=.5,K=.5;if(t){var re=t.getAttribute("uv"),J=t.getAttribute("normal");if(re&&J){for(var ne=0;ne<J.count&&J.getY(ne)<.9;)ne++;ne<re.count&&(j=re.getX(ne),K=re.getY(ne))}}var Te=!!(e&&(!((L=e.image)===null||L===void 0)&&L.complete)&&((F=e.image)===null||F===void 0?void 0:F.naturalWidth)>0),fe=Te?new Xi({map:e}):new Xi({color:"#6ec458"}),pe=Te?new Xi({map:e,color:"#779263"}):new Xi({color:"#5a9949"});e&&!Te&&(fe.userData.pendingTex={tex:e,color:"#ffffff"},pe.userData.pendingTex={tex:e,color:"#779263"});var Fe=p?[[-7,-1],[-1,1],[1,7]]:[[-7,7]];try{for(var ae=ti(Fe),de=ae.next();!de.done;de=ae.next()){var _e=Kl(de.value,2),Ge=_e[0],$e=_e[1],ut=new So;if(ut.moveTo(-3,Ge),ut.lineTo(3,Ge),ut.lineTo(3,$e),ut.lineTo(-3,$e),ut.closePath(),B>Ge&&B<$e){var zt=new Ns;zt.absarc(S,B,b,0,Math.PI*2,!0),ut.holes.push(zt)}for(var ct=new Ll(ut,32),Tt=ct.getAttribute("position"),Zt=!1,wt=!1,bt=0;bt<Tt.count;bt++){var _t=Tt.getX(bt),ln=Tt.getY(bt),rt=rv(p,_t,ln);rt===0&&(Zt=!0),rt>0&&(wt=!0),Tt.setXYZ(bt,_t,rt,ln)}var an=ct.getIndex();if(an)for(var bt=0;bt<an.count;bt+=3){var se=an.getX(bt+1);an.setX(bt+1,an.getX(bt+2)),an.setX(bt+2,se)}ct.computeVertexNormals();for(var mn=ct.getAttribute("uv"),bt=0;bt<mn.count;bt++)mn.setXY(bt,j,K);var nn=new jn(ct,p&&Zt&&wt?pe:fe);nn.name="continuous-fairway",_.add(nn)}}catch(Ae){o={error:Ae}}finally{try{de&&!de.done&&(u=ae.return)&&u.call(ae)}finally{if(o)throw o.error}}var W="#d69260",w="#f1bd87";try{for(var ue=ti([-3.1,3.1]),ye=ue.next();!ye.done;ye=ue.next()){var M=ye.value;U(M,.12,0,.2,.3,14.2,W),U(M,.29,0,.22,.04,14.2,w)}}catch(Ae){l={error:Ae}}finally{try{ye&&!ye.done&&(d=ue.return)&&d.call(ue)}finally{if(l)throw l.error}}try{for(var we=ti([-7.1,7.1]),ze=we.next();!ze.done;ze=we.next()){var ee=ze.value;U(0,rv(p,0,ee>0?6:-6)+.12,ee,6.4,.3,.2,W)}}catch(Ae){f={error:Ae}}finally{try{ze&&!ze.done&&(h=we.return)&&h.call(we)}finally{if(f)throw f.error}}if(p)try{for(var Ye=ti([-3.1,3.1]),Re=Ye.next();!Re.done;Re=Ye.next()){var M=Re.value;U(M,.7,-4.5,.2,1.1,5.2,W)}}catch(Ae){v={error:Ae}}finally{try{Re&&!Re.done&&(y=Ye.return)&&y.call(Ye)}finally{if(v)throw v.error}}return _}function Ab(n){var e,t=new Er,i=(e=n.cupRadius)!==null&&e!==void 0?e:.23,r=new jn(new Ds(i,i*.89,.48,24,1,!0),new Xi({color:"#244640",side:Ir}));r.position.y=-.24,t.add(r);var a=new jn(new _o(i*.91,24),new Ta({color:"#082c2b"}));a.rotation.x=-Math.PI/2,a.position.y=-.475,t.add(a);var s=new jn(new Ds(i,i*.978,.09,24,1,!0),new Xi({color:"#eee9cf",side:Ir}));s.position.y=-.045,t.add(s);var o=new jn(new wo(i,i+.06,24),new Xi({color:"#fff7d1"}));return o.rotation.x=-Math.PI/2,o.position.y=.004,t.add(o),t}function Ib(){for(var n,e,t=new Er,i=new Or(.18,1,.18),r=new Xi({color:"#b27b59"}),a=new Or(1.5,.2,1.6),s=new Xi({color:"#82b88b"}),o=new ds(.62,7,5),u=new ds(.49,7,5),l=new Xi({color:"#77b86b"}),d=new Xi({color:"#3e9d79"}),f=new Ea(i,r,14),h=new Ea(a,s,14),v=5,y=9,T=new Ea(o,l,v),g=new Ea(u,l,v),m=new Ea(o,d,y),L=new Ea(u,d,y),F=new $n,_=0,p=0,S=0;S<14;S++){var B=S%2?-1:1,b=B*(3.8+S%3*.35),I=-6.5+Math.floor(S/2)*2;F.makeTranslation(b,-.02,I),f.setMatrixAt(S,F),F.makeTranslation(b,-.48,I),h.setMatrixAt(S,F),S%3===0?(F.makeTranslation(b,.5,I),T.setMatrixAt(_,F),F.makeTranslation(b,1,I),g.setMatrixAt(_,F),_++):(F.makeTranslation(b,.5,I),m.setMatrixAt(p,F),F.makeTranslation(b,1,I),L.setMatrixAt(p,F),p++)}try{for(var z=ti([f,h,T,g,m,L]),U=z.next();!U.done;U=z.next()){var Y=U.value;Y.instanceMatrix.needsUpdate=!0,t.add(Y)}}catch(E){n={error:E}}finally{try{U&&!U.done&&(e=z.return)&&e.call(z)}finally{if(n)throw n.error}}return t}function Cb(n,e,t){for(var i=n.getAttribute("position"),r=0;r<i.count;r++){var a=e[r*3],s=e[r*3+1],o=e[r*3+2],u=s>.7?Math.max(0,Math.min(1,(-a-.035)/.32)):0;i.setXYZ(r,a,s+Math.sin(t*3.2+a*10)*.018*u,o+Math.sin(t*3.2+a*10+s*2)*.07*u)}i.needsUpdate=!0,n.computeVertexNormals()}function av(n,e,t){var i=new Map,r=new Map,a=new Map,s,o,u,l,d;function f(){var _,p;if(o!==void 0)return o;try{return s=document.createElement("canvas"),(_=s.addEventListener)===null||_===void 0||_.call(s,"webglcontextrestored",function(){var S,B;d=void 0;try{for(var b=ti(a.values()),I=b.next();!I.done;I=b.next()){var z=I.value;z.compiled=!1,z.textureDirty=!0,z.lastRenderedTime=-1,z.lastFlagStep=-1}}catch(U){S={error:U}}finally{try{I&&!I.done&&(B=b.return)&&B.call(b)}finally{if(S)throw S.error}}t?.()}),u=document.createElement("canvas"),l=(p=u.getContext)===null||p===void 0?void 0:p.call(u,"2d"),o=new Id({canvas:s,antialias:!0,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"default"}),o.shadowMap.type=Du,o}catch{return o=null,null}}function h(_){if(_){if(i.has(_))return i.get(_);var p=e.get(_);if(!(!p||p.mime!=="model/tora-mesh"||!p.data)){var S=Tb(p.data);return i.set(_,S),S}}}function v(_){if(_){if(r.has(_))return r.get(_);var p=e.get(_);if(!(!p||!p.mime.startsWith("image/")||!p.data)){var S=new Image,B=new tr(S);B.colorSpace=hr;var b=function(I){var z,U;B.needsUpdate=!0;try{for(var Y=ti(a.values()),E=Y.next();!E.done;E=Y.next()){var M=E.value;M.scene.traverse(function(O){var H,ee,j,K=O.isMesh&&O.material?Array.isArray(O.material)?O.material:[O.material]:[];try{for(var re=(H=void 0,ti(K)),J=re.next();!J.done;J=re.next()){var ne=J.value;!((j=ne.userData)===null||j===void 0)&&j.pendingTex&&ne.userData.pendingTex.tex===B&&(ne.map=B,ne.color.set(ne.userData.pendingTex.color||"#ffffff"),delete ne.userData.pendingTex,ne.needsUpdate=!0)}}catch(Te){H={error:Te}}finally{try{J&&!J.done&&(ee=re.return)&&ee.call(re)}finally{if(H)throw H.error}}}),M.textureDirty=!0}}catch(O){z={error:O}}finally{try{E&&!E.done&&(U=Y.return)&&U.call(Y)}finally{if(z)throw z.error}}I&&t?.()};return r.set(_,B),S.onload=function(){return b(!0)},S.src="data:"+p.mime+";base64,"+p.data,S.complete&&S.naturalWidth&&b(!1),B}}}function y(_){var p,S,B,b,I,z,U,Y,E,M,O,H,ee,j,K,re,J,ne,Te,fe,pe=_.parameters,Fe=new vl;Fe.background=new vn(pe.skyColor||"#b8e2ed");var ae=new er((B=pe.cameraFov)!==null&&B!==void 0?B:39,1,.1,160);ae.position.set((b=pe.cameraX)!==null&&b!==void 0?b:10,(I=pe.cameraY)!==null&&I!==void 0?I:18,(z=pe.cameraZ)!==null&&z!==void 0?z:21),ae.lookAt((U=pe.lookAtX)!==null&&U!==void 0?U:0,(Y=pe.lookAtY)!==null&&Y!==void 0?Y:.15,(E=pe.lookAtZ)!==null&&E!==void 0?E:0),Fe.add(ae),Fe.add(new Ul(pe.hemiSkyColor||"#fff9dd",pe.hemiGroundColor||"#527b75",(M=pe.hemiIntensity)!==null&&M!==void 0?M:1.8));var de=new Ol(pe.sunColor||"#fff0cf",(O=pe.sunIntensity)!==null&&O!==void 0?O:2.1);de.position.set((H=pe.sunX)!==null&&H!==void 0?H:-9,(ee=pe.sunY)!==null&&ee!==void 0?ee:18,(j=pe.sunZ)!==null&&j!==void 0?j:8),Fe.add(de);var _e=v((re=(K=_.assetSlots)===null||K===void 0?void 0:K[0])===null||re===void 0?void 0:re.assetId),Ge=new Map,$e=new Map,ut=[],zt=[];function ct(Ne,je,Ve,qe){Ne.traverse(function(ot){ot.userData.toraRootId=je,ot.userData.toraSourceId=Ve,qe&&(ot.userData.cameraAttached=!0)})}function Tt(Ne,je,Ve,qe,ot){var pt,He,ie,Oe,Pe,nt,dt,Be,Rt,vt,cn,dn,Fn,Dn,vi,rr,yn,En,Yi,en=Ne.parameters,xt,ni=function(){var qi,wi,gi={},Bn=!!(_e&&(!((qi=_e.image)===null||qi===void 0)&&qi.complete)&&((wi=_e.image)===null||wi===void 0?void 0:wi.naturalWidth)>0);en.useTexture&&_e&&Bn?gi.map=_e:gi.color=en.useTexture?en.waveFlag?"#e85d56":"#d89b6a":en.color||"#ffffff",en.doubleSide&&(gi.side=Ir),en.opacity<1&&(gi.transparent=!0,gi.opacity=en.opacity,gi.depthWrite=!1);var ar=en.unlit?new Ta(gi):new Xi(gi);return en.useTexture&&_e&&!Bn&&(ar.userData.pendingTex={tex:_e,color:"#ffffff"}),ar};if(en.primitive==="group")xt=new Er;else if(en.primitive==="fairway")xt=Eb(en,_e,h((He=(pt=Ne.assetSlots)===null||pt===void 0?void 0:pt[0])===null||He===void 0?void 0:He.assetId));else if(en.primitive==="cup")xt=Ab(en);else if(en.primitive==="garden")xt=Ib();else if(en.primitive==="mesh"){var fn=h((Oe=(ie=Ne.assetSlots)===null||ie===void 0?void 0:ie[0])===null||Oe===void 0?void 0:Oe.assetId),bi=en.waveFlag&&fn?fn.clone():fn??new Or(1,1,1);xt=new jn(bi,ni()),en.waveFlag&&fn&&ut.push({geo:bi,rest:new Float32Array(bi.getAttribute("position").array)})}else en.primitive==="sphere"?xt=new jn(new ds((Pe=en.radiusTop)!==null&&Pe!==void 0?Pe:.5,16,12),ni()):en.primitive==="cylinder"?xt=new jn(new Ds((nt=en.radiusTop)!==null&&nt!==void 0?nt:.23,(dt=en.radiusBottom)!==null&&dt!==void 0?dt:.21,1,32,1,!!en.openEnded),ni()):en.primitive==="ring"?xt=new jn(new wo((Be=en.innerRadius)!==null&&Be!==void 0?Be:0,(Rt=en.radiusTop)!==null&&Rt!==void 0?Rt:.15,24),ni()):en.primitive==="circle"?xt=new jn(new _o((vt=en.radiusTop)!==null&&vt!==void 0?vt:.21,32),ni()):xt=new jn(new Or(1,1,1),ni());return xt.position.set((cn=en.x)!==null&&cn!==void 0?cn:0,(dn=en.y)!==null&&dn!==void 0?dn:0,(Fn=en.z)!==null&&Fn!==void 0?Fn:0),xt.rotation.set((Dn=en.rx)!==null&&Dn!==void 0?Dn:0,(vi=en.ry)!==null&&vi!==void 0?vi:0,(rr=en.rz)!==null&&rr!==void 0?rr:0),xt.scale.set((yn=en.sx)!==null&&yn!==void 0?yn:1,(En=en.sy)!==null&&En!==void 0?En:1,(Yi=en.sz)!==null&&Yi!==void 0?Yi:1),xt.visible=en.visible!==!1,ct(xt,Ve,qe,ot),je.add(xt),xt}var Zt=[],wt=new Map,bt=function(Ne,je,Ve){var qe,ot;try{for(var pt=ti(n.components),He=pt.next();!He.done;He=pt.next()){var ie=He.value;if(ie.parentId===Ne&&ie.contract==="native.mesh3d.v1"&&!ie.prototype){var Oe=je??ie,Pe=Ve||!!ie.parameters.attachToCamera;wt.set(ie.id,{rootId:Oe.id,sourceId:Oe.id,cameraAttached:Pe}),Zt.push(ie),bt(ie.id,Oe,Pe)}}}catch(nt){qe={error:nt}}finally{try{He&&!He.done&&(ot=pt.return)&&ot.call(pt)}finally{if(qe)throw qe.error}}};bt(_.id,null,!1);var _t=function(Ne){var je=Ne.parameters,Ve=wt.get(Ne.id),qe=je.attachToCamera&&Ne.parentId===_.id?ae:Ne.parentId===_.id?Fe:(J=Ge.get(Ne.parentId))!==null&&J!==void 0?J:Fe,ot=Tt(Ne,qe,Ve.rootId,Ve.sourceId,Ve.cameraAttached);if(Ge.set(Ne.id,ot),je.confetti){var pt=new Er;pt.userData.isConfetti=!0;var He=new Or(.08,.025,.12),ie=["#ffda69","#fff6c9","#ef8774","#7cc6bf"].map(function(Pe){return new Ta({color:Pe})}),Oe=Array.from({length:28},function(Pe,nt){var dt=new jn(He,ie[nt%4]);return dt.visible=!1,pt.add(dt),dt});Fe.add(pt),zt.push({id:Ne.id,origin:{x:(ne=je.x)!==null&&ne!==void 0?ne:0,y:(Te=je.y)!==null&&Te!==void 0?Te:0,z:(fe=je.z)!==null&&fe!==void 0?fe:0},pieces:Oe})}};try{for(var ln=ti(Zt),rt=ln.next();!rt.done;rt=ln.next()){var an=rt.value;_t(an)}}catch(Ne){p={error:Ne}}finally{try{rt&&!rt.done&&(S=ln.return)&&S.call(ln)}finally{if(p)throw p.error}}var se=new Er;Fe.add(se);var mn=new ds(1,8,5),nn=new Ta({color:"#fff1a2",transparent:!0,opacity:.85}),W=Array.from({length:24},function(){var Ne=new jn(mn,nn);return Ne.visible=!1,se.add(Ne),Ne}),w=new Bl,ue=new kt,ye=new ge,we=new Ur(new ge(0,1,0),0),ze=new ge,Ye="",Re=Array.from(Ge,function(Ne){var je=Kl(Ne,2),Ve=je[0],qe=je[1];return{id:Ve,obj:qe,comp:n.components.find(function(ot){return ot.id===Ve})}}).filter(function(Ne){return Ne.comp}),Ae={id:_.id,scene:Fe,camera:ae,nodes:Ge,dynamicNodes:$e,nodeEntries:Re,createMeshObject:Tt,wavingFlags:ut,confettiSystems:zt,guideGroup:se,guidePool:W,compiled:!1,lastRenderMs:0,textureDirty:!0,skyColor:pe.skyColor||"#b8e2ed",lastWaveAt:-1,lastRenderedTime:-1,lastRenderedW:0,lastRenderedH:0,lastPoseSig:"",guideDirty:!0,focusZ:0,lastTime:-1,lastWidth:0,lastHeight:0,setGuide:function(Ne){var je=Ne?Math.min(Ne.length,W.length):0,Ve=je?Ne.slice(0,je).map(function(ie){return"".concat(ie.x.toFixed(2),",").concat(ie.y.toFixed(2),",").concat(ie.z.toFixed(2))}).join("|"):"";if(Ve!==Ye){Ye=Ve,Ae.guideDirty=!0;for(var qe=0;qe<W.length;qe++){var ot=W[qe];if(qe<je){var pt=Ne[qe],He=.055*(1-qe/je*.5);ot.visible=!0,ot.scale.setScalar(He),ot.position.set(pt.x,pt.y+.03,pt.z)}else ot.visible=!1}}},project:function(Ne,je,Ve){return ye.set(Ne.x,Ne.y,Ne.z).project(ae),{x:(ye.x+1)*je/2,y:(1-ye.y)*Ve/2}},unproject:function(Ne,je,Ve,qe,ot){return ue.set(Ne/Ve*2-1,1-je/qe*2),w.setFromCamera(ue,ae),we.constant=-ot,w.ray.intersectPlane(we,ze)?{x:ze.x,y:ze.y,z:ze.z}:null},raycast:function(Ne,je,Ve,qe){var ot,pt,He,ie,Oe,Pe;Ve===void 0&&(Ve=80);var nt=qe===void 0?{}:qe,dt=nt.isTarget,Be=dt===void 0?function(){return!0}:dt,Rt=nt.isOccluder,vt=Rt===void 0?function(){return!1}:Rt;Fe.updateMatrixWorld(!0),ae.updateMatrixWorld(!0),ue.set(Ne,je),w.near=.05,w.far=Ve,w.setFromCamera(ue,ae);var cn=w.intersectObjects(Fe.children,!0),dn=new Set;try{for(var Fn=ti(cn),Dn=Fn.next();!Dn.done;Dn=Fn.next()){for(var vi=Dn.value,rr=!1,yn=vi.object;yn;yn=yn.parent)if(!yn.visible||yn===se||!((He=yn.userData)===null||He===void 0)&&He.cameraAttached||!((ie=yn.userData)===null||ie===void 0)&&ie.isConfetti){rr=!0;break}if(!rr){var En=(Oe=vi.object.userData)===null||Oe===void 0?void 0:Oe.toraRootId,Yi=(Pe=vi.object.userData)===null||Pe===void 0?void 0:Pe.toraSourceId;if(!(!En||dn.has(En))){if(dn.add(En),Be(En,Yi))return{id:En,sourceId:Yi,distance:vi.distance,point:{x:vi.point.x,y:vi.point.y,z:vi.point.z}};if(vt(En,Yi))return null}}}}catch(en){ot={error:en}}finally{try{Dn&&!Dn.done&&(pt=Fn.return)&&pt.call(Fn)}finally{if(ot)throw ot.error}}return null}};return a.set(_.id,Ae),Ae}function T(_){var p;return(p=a.get(_.id))!==null&&p!==void 0?p:y(_)}function g(_,p){var S,B,b,I,z,U,Y,E,M,O,H,ee,j,K,re,J,ne,Te,fe,pe,Fe,ae,de,_e,Ge,$e,ut,zt,ct,Tt,Zt,wt,bt,_t,ln,rt,an,se,mn,nn,W,w,ue,ye,we,ze,Ye,Re,Ae,Ne,je,Ve,qe,ot,pt,He,ie,Oe,Pe,nt=p.time,dt=nt===void 0?0:nt,Be=p.ambientTime,Rt=p.propsOf,vt=p.bodies3d,cn=p.fpsPose,dn=p.instances3d,Fn=dn===void 0?[]:dn,Dn=p.aimLocked,vi=Dn===void 0?!1:Dn,rr=p.groundFn,yn=p.worldWidth,En=yn===void 0?390:yn,Yi=p.worldHeight,en=Yi===void 0?700:Yi,xt=T(_),ni=Be??dt,fn=Rt(_),bi=fn.skyColor||"#b8e2ed";xt.skyColor!==bi&&(xt.skyColor=bi,xt.scene.background=new vn(bi));var qi=new Set(Fn.map(function(Sn){return Sn.id}));try{for(var wi=ti(xt.dynamicNodes),gi=wi.next();!gi.done;gi=wi.next()){var Bn=Kl(gi.value,2),ar=Bn[0],la=Bn[1];qi.has(ar)||((H=la.parent)===null||H===void 0||H.remove(la),xt.dynamicNodes.delete(ar))}}catch(Sn){S={error:Sn}}finally{try{gi&&!gi.done&&(B=wi.return)&&B.call(wi)}finally{if(S)throw S.error}}var Za=function(Sn){if(xt.dynamicNodes.has(Sn.id))return"continue";var Di=Sn.parentId===_.id?xt.scene:(j=(ee=xt.dynamicNodes.get(Sn.parentId))!==null&&ee!==void 0?ee:xt.nodes.get(Sn.parentId))!==null&&j!==void 0?j:xt.scene,yr=(K=Sn.instanceId)!==null&&K!==void 0?K:Sn.id,Pa=(re=Fn.find(function($r){return $r.id===yr}))!==null&&re!==void 0?re:Sn,Jt=(J=Pa.prototypeId)!==null&&J!==void 0?J:Pa.id,pi=xt.createMeshObject(Sn,Di,yr,Jt,!!Sn.parameters.attachToCamera);xt.dynamicNodes.set(Sn.id,pi)};try{for(var Ei=ti(Fn),mr=Ei.next();!mr.done;mr=Ei.next()){var sr=mr.value;Za(sr)}}catch(Sn){b={error:Sn}}finally{try{mr&&!mr.done&&(I=Ei.return)&&I.call(Ei)}finally{if(b)throw b.error}}var Vr=iv(iv([],Kl(xt.nodeEntries),!1),Kl(Fn.map(function(Sn){return{id:Sn.id,obj:xt.dynamicNodes.get(Sn.id),comp:Sn}}).filter(function(Sn){return Sn.obj})),!1),D="";try{for(var le=ti(Vr),he=le.next();!he.done;he=le.next()){var Me=he.value,Se=Me.id,ke=Me.obj,sr=Me.comp,et=Rt(sr);ke.visible=et.visible!==!1,!et.useTexture&&ke.isMesh&&(!((ne=ke.material)===null||ne===void 0)&&ne.color)&&et.color&&ke.material.color.set(et.color);var Je=vt?.get(Se);if(Je&&Je.mode==="dynamic"){var ft=Je.captured?Math.min(1,((Te=Je.captureElapsed)!==null&&Te!==void 0?Te:0)/.55):0,Dt=Je.captured&&Je.captureTarget?Je.x+(Je.captureTarget.x-Je.x)*ft:Je.x,tn=Je.y-ft*.45,$t=Je.captured&&Je.captureTarget?Je.z+(Je.captureTarget.z-Je.z)*ft:Je.z;ke.position.set(Dt,tn,$t);var Et=1-ft*.65;ke.scale.set(((fe=et.sx)!==null&&fe!==void 0?fe:1)*Et,((pe=et.sy)!==null&&pe!==void 0?pe:1)*Et,((Fe=et.sz)!==null&&Fe!==void 0?Fe:1)*Et),ke.rotation.set(-((ae=Je.spin)!==null&&ae!==void 0?ae:0),(de=et.ry)!==null&&de!==void 0?de:0,((_e=Je.spin)!==null&&_e!==void 0?_e:0)*.22)}else if(Je&&Je.mode==="kinematic")ke.position.set(Je.x,($e=(Ge=Je.y)!==null&&Ge!==void 0?Ge:et.y)!==null&&$e!==void 0?$e:0,Je.z),ke.rotation.set((ut=et.rx)!==null&&ut!==void 0?ut:0,-((ct=(zt=Je.angle)!==null&&zt!==void 0?zt:et.ry)!==null&&ct!==void 0?ct:0),(Tt=et.rz)!==null&&Tt!==void 0?Tt:0);else if(et.dropShadowOf&&vt?.has(et.dropShadowOf)){var hn=vt.get(et.dropShadowOf),Vn=rr?(Zt=rr(hn,hn.x,hn.z))!==null&&Zt!==void 0?Zt:-1:0;ke.position.set(hn.x,Vn+.008,hn.z);var It=Math.max(0,hn.y-Vn-hn.radius);ke.material&&(ke.material.opacity=.22/(1+It*2));var Et=1+It*.4;ke.scale.set(Et,Et,Et),ke.visible=!hn.captured&&et.visible!==!1}else ke.position.set((wt=et.x)!==null&&wt!==void 0?wt:0,(bt=et.y)!==null&&bt!==void 0?bt:0,(_t=et.z)!==null&&_t!==void 0?_t:0),ke.rotation.set((ln=et.rx)!==null&&ln!==void 0?ln:0,(rt=et.ry)!==null&&rt!==void 0?rt:0,(an=et.rz)!==null&&an!==void 0?an:0),ke.scale.set((se=et.sx)!==null&&se!==void 0?se:1,(mn=et.sy)!==null&&mn!==void 0?mn:1,(nn=et.sz)!==null&&nn!==void 0?nn:1);(cn||xt.dynamicNodes.size>0)&&(D+="".concat(Se,":").concat(ke.visible?1:0,",").concat(ke.position.x.toFixed(3),",").concat(ke.position.y.toFixed(3),",").concat(ke.position.z.toFixed(3),",").concat(ke.rotation.y.toFixed(3),",").concat((W=et.color)!==null&&W!==void 0?W:"","|"))}}catch(Sn){z={error:Sn}}finally{try{he&&!he.done&&(U=le.return)&&U.call(le)}finally{if(z)throw z.error}}var Qt;if(vt)try{for(var jt=ti(vt.values()),Le=jt.next();!Le.done;Le=jt.next()){var Je=Le.value;if(Je.stageId===_.id&&Je.captured){Qt=Je;break}}}catch(Sn){Y={error:Sn}}finally{try{Le&&!Le.done&&(E=jt.return)&&E.call(jt)}finally{if(Y)throw Y.error}}var An=function(Sn){var Di=!!Qt,yr=Qt&&(w=Qt.captureElapsed)!==null&&w!==void 0?w:0;Sn.pieces.forEach(function(Pa,Jt){var pi,$r,Ms,Oo,Bo,Ja;if(Pa.visible=Di,!!Di){var ko=Jt*2.399,kd=($r=(pi=Qt.captureTarget)===null||pi===void 0?void 0:pi.x)!==null&&$r!==void 0?$r:Sn.origin.x,rc=(Oo=(Ms=Qt.captureTarget)===null||Ms===void 0?void 0:Ms.y)!==null&&Oo!==void 0?Oo:Sn.origin.y,ci=(Ja=(Bo=Qt.captureTarget)===null||Bo===void 0?void 0:Bo.z)!==null&&Ja!==void 0?Ja:Sn.origin.z;Pa.position.set(kd+Math.cos(ko)*yr*(.5+Jt%4*.17),rc+.3+Math.sin(Math.min(1,yr/2)*Math.PI)*(1+Jt%5*.15),ci+Math.sin(ko)*yr*(.5+Jt%4*.17)),Pa.rotation.set(yr*3+Jt,yr*2+Jt,Math.sin(yr+Jt))}})};try{for(var pn=ti(xt.confettiSystems),yi=pn.next();!yi.done;yi=pn.next()){var or=yi.value;An(or)}}catch(Sn){M={error:Sn}}finally{try{yi&&!yi.done&&(O=pn.return)&&O.call(pn)}finally{if(M)throw M.error}}var Li=en>=En,vr=xt.lastTime<0||ni<xt.lastTime?0:Math.min(.05,ni-xt.lastTime);xt.camera.aspect=En/Math.max(1,en);var Mn=!1;if(cn)xt.lastTime=ni,xt.camera.rotation.order="YXZ",xt.camera.position.set(cn.x,cn.y+((ue=cn.bob)!==null&&ue!==void 0?ue:0),cn.z),xt.camera.rotation.set(cn.pitch,cn.yaw,0),xt.camera.fov=Li?(ye=fn.cameraFov)!==null&&ye!==void 0?ye:68:(we=fn.landscapeCameraFov)!==null&&we!==void 0?we:54,D+="cam:".concat(xt.camera.position.x.toFixed(3),",").concat(xt.camera.position.y.toFixed(3),",").concat(xt.camera.position.z.toFixed(3),",").concat(cn.yaw.toFixed(4),",").concat(cn.pitch.toFixed(4),",").concat(xt.camera.fov.toFixed(2));else{var Yn=fn.followTargetId?vt?.get(fn.followTargetId):void 0,Zi=Yn?Yn.z*((ze=fn.followZFactor)!==null&&ze!==void 0?ze:.12):(Ye=fn.lookAtZ)!==null&&Ye!==void 0?Ye:0;xt.lastTime<0||ni<xt.lastTime?xt.focusZ=Zi:vi||(xt.focusZ+=(Zi-xt.focusZ)*(1-Math.exp(-6*vr))),xt.lastTime=ni;var kn=Math.max(0,1-ni/1.5);if(Mn=!fn.followTargetId&&((Re=fn.introLift)!==null&&Re!==void 0?Re:2)===0,!vi){var ki=Mn?Math.sin(ni*.42)*1.15:0,ca=Mn?(Math.cos(ni*.42)-1)*.55:0,lr=(Li?(Ae=fn.cameraX)!==null&&Ae!==void 0?Ae:10:(Ne=fn.landscapeCameraX)!==null&&Ne!==void 0?Ne:13)+ki,gr=Li?((je=fn.cameraY)!==null&&je!==void 0?je:18)+kn*((Ve=fn.introLift)!==null&&Ve!==void 0?Ve:2):(qe=fn.landscapeCameraY)!==null&&qe!==void 0?qe:15,Ai=(Li?(ot=fn.cameraZ)!==null&&ot!==void 0?ot:21:(pt=fn.landscapeCameraZ)!==null&&pt!==void 0?pt:18)+ca,Vt=vr===0?gr:xt.camera.position.y+(gr-xt.camera.position.y)*(1-Math.exp(-6*vr));xt.camera.position.set(lr,Vt,Ai+xt.focusZ),xt.camera.fov=Li?(He=fn.cameraFov)!==null&&He!==void 0?He:39:(ie=fn.landscapeCameraFov)!==null&&ie!==void 0?ie:22.6199,xt.camera.lookAt((Oe=fn.lookAtX)!==null&&Oe!==void 0?Oe:0,(Pe=fn.lookAtY)!==null&&Pe!==void 0?Pe:.15,xt.focusZ)}}return xt.camera.updateProjectionMatrix(),xt.camera.updateMatrixWorld(!0),{entry:xt,waveTime:ni,victorySway:Mn,poseParts:D}}function m(_,p,S,B,b,I,z){var U,Y,E,M,O,H,ee,j,K,re,J,ne,Te,fe=g(_,Pd(Pd({},z),{worldWidth:(K=z.worldWidth)!==null&&K!==void 0?K:b,worldHeight:(re=z.worldHeight)!==null&&re!==void 0?re:I})),pe=fe.entry,Fe=fe.waveTime,ae=fe.victorySway,de=fe.poseParts,_e=z.bodies3d;if(S<2||B<2)return p.fillStyle=pe.skyColor,p.fillRect(0,0,b,I),pe;var Ge=f();if(!Ge||!((Te=(ne=(J=Ge.getContext)===null||J===void 0?void 0:J.call(Ge))===null||ne===void 0?void 0:ne.isContextLost)===null||Te===void 0)&&Te.call(ne))return p.fillStyle=pe.skyColor,p.fillRect(0,0,b,I),pe;var $e=Math.max(S,B,1),ut=520,zt=$e>ut?ut/$e:1,ct=Math.max(2,Math.round(S*zt)),Tt=Math.max(2,Math.round(B*zt)),Zt=s.width!==ct||s.height!==Tt;if(Zt&&(Ge.setPixelRatio(1),Ge.setSize(ct,Tt,!1),u.width=ct,u.height=Tt,d=void 0),!pe.compiled){pe.compiled=!0;var wt=[];pe.guidePool[0]&&!pe.guidePool[0].visible&&(pe.guidePool[0].visible=!0,pe.guidePool[0].position.set(0,-99,0),wt.push(pe.guidePool[0]));try{for(var bt=ti(pe.confettiSystems),_t=bt.next();!_t.done;_t=bt.next()){var ln=_t.value;ln.pieces[0]&&!ln.pieces[0].visible&&(ln.pieces[0].visible=!0,ln.pieces[0].position.set(0,-99,0),wt.push(ln.pieces[0]))}}catch(Ve){U={error:Ve}}finally{try{_t&&!_t.done&&(Y=bt.return)&&Y.call(bt)}finally{if(U)throw U.error}}Ge.compile(pe.scene,pe.camera);try{for(var rt=ti(wt),an=rt.next();!an.done;an=rt.next()){var se=an.value;se.visible=!1}}catch(Ve){E={error:Ve}}finally{try{an&&!an.done&&(M=rt.return)&&M.call(rt)}finally{if(E)throw E.error}}}var mn=!1;if(_e)try{for(var nn=ti(_e.values()),W=nn.next();!W.done;W=nn.next()){var w=W.value;if(w.stageId===_.id&&(w.mode==="kinematic"||w.mode==="dynamic"&&(!w.atRest||w.captured))){mn=!0;break}}}catch(Ve){O={error:Ve}}finally{try{W&&!W.done&&(H=nn.return)&&H.call(nn)}finally{if(O)throw O.error}}var ue=Math.floor(Fe*20),ye=pe.wavingFlags.length>0&&pe.lastFlagStep!==ue,we=ae&&Math.abs(Fe-pe.lastRenderedTime)>=.032,ze=mn&&pe.lastRenderedTime!==Fe,Ye=de!==pe.lastPoseSig,Re=Zt||d!==_.id||pe.guideDirty||pe.textureDirty||pe.lastRenderedTime<0||pe.lastRenderedW!==ct||pe.lastRenderedH!==Tt||ye||we||ze||Ye;if(Re){if(pe.wavingFlags.length>0&&pe.lastFlagStep!==ue){try{for(var Ae=ti(pe.wavingFlags),Ne=Ae.next();!Ne.done;Ne=Ae.next()){var je=Ne.value;Cb(je.geo,je.rest,ue/20)}}catch(Ve){ee={error:Ve}}finally{try{Ne&&!Ne.done&&(j=Ae.return)&&j.call(Ae)}finally{if(ee)throw ee.error}}pe.lastFlagStep=ue}Ge.setClearColor(pe.skyColor,1),Ge.render(pe.scene,pe.camera),s.width>0&&s.height>0&&(l.drawImage(s,0,0,ct,Tt),d=_.id),pe.lastRenderedTime=Fe,pe.lastRenderedW=ct,pe.lastRenderedH=Tt,pe.lastPoseSig=de,pe.guideDirty=!1,pe.textureDirty=!1}return pe.lastWidth=b,pe.lastHeight=I,u.width>0&&u.height>0&&p.drawImage(u,0,0,b,I),pe}function L(){var _,p,S,B,b;try{for(var I=ti(a.values()),z=I.next();!z.done;z=I.next()){var U=z.value;try{for(var Y=(S=void 0,ti(U.dynamicNodes.values())),E=Y.next();!E.done;E=Y.next()){var M=E.value;(b=M.parent)===null||b===void 0||b.remove(M)}}catch(O){S={error:O}}finally{try{E&&!E.done&&(B=Y.return)&&B.call(Y)}finally{if(S)throw S.error}}U.dynamicNodes.clear(),U.focusZ=0,U.lastTime=-1,U.lastRenderedTime=-1,U.lastFlagStep=-1,U.lastPoseSig="",U.guideDirty=!0,U.setGuide([])}}catch(O){_={error:O}}finally{try{z&&!z.done&&(p=I.return)&&p.call(I)}finally{if(_)throw _.error}}}function F(){var _,p,S,B,b,I,z;try{for(var U=ti(a.values()),Y=U.next();!Y.done;Y=U.next()){var E=Y.value;E.scene.traverse(function(re){var J,ne;if(re.isMesh&&(re.geometry&&!Array.from(i.values()).includes(re.geometry)&&re.geometry.dispose(),re.material))try{for(var Te=(J=void 0,ti(Array.isArray(re.material)?re.material:[re.material])),fe=Te.next();!fe.done;fe=Te.next()){var pe=fe.value;pe.dispose()}}catch(Fe){J={error:Fe}}finally{try{fe&&!fe.done&&(ne=Te.return)&&ne.call(Te)}finally{if(J)throw J.error}}})}}catch(re){_={error:re}}finally{try{Y&&!Y.done&&(p=U.return)&&p.call(U)}finally{if(_)throw _.error}}try{for(var M=ti(i.values()),O=M.next();!O.done;O=M.next()){var H=O.value;H.dispose()}}catch(re){S={error:re}}finally{try{O&&!O.done&&(B=M.return)&&B.call(M)}finally{if(S)throw S.error}}try{for(var ee=ti(r.values()),j=ee.next();!j.done;j=ee.next()){var K=j.value;K.dispose()}}catch(re){b={error:re}}finally{try{j&&!j.done&&(I=ee.return)&&I.call(ee)}finally{if(b)throw b.error}}a.clear(),i.clear(),r.clear(),(z=o?.forceContextLoss)===null||z===void 0||z.call(o),o?.dispose(),o=void 0,s=void 0,u=void 0,l=void 0,d=void 0}return{getStage:T,syncStage:g,renderStage:m,reset:L,dispose:F}}var qa=function(){return qa=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},qa.apply(this,arguments)},Zr=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Jr=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ql=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},sv=function(n,e,t){return Math.max(e,Math.min(t,n))},_s=function(n,e){return Math.hypot(e.x-n.x,e.y-n.y)};function ov(n){var e=n.id,t=n.nodes,i=n.edges,r=n.gates,a=r===void 0?[]:r,s=n.onEvent,o=s===void 0?function(){}:s,u=new Map(t.map(function(M){return[M.id,qa({},M)]})),l=new Map(i.map(function(M){return[M.id,qa({speedScale:1,enabled:!0,bidirectional:!1,cost:0},M)]})),d=new Map(a.map(function(M){return[M.id,qa({},M)]})),f=new Map,h=f,v=0,y=0,T=function(M){return u.get(M)},g=function(M){return Jr([],Zr(d.values()),!1).find(function(O){return O.parameters.nodeId===M})},m=function(M){var O=M.parameters;if(O.mode==="open")return!0;if(O.mode==="closed")return!1;var H=O.openSeconds+O.closedSeconds,ee=(v+O.phaseOffsetSeconds)%H;return ee<O.openSeconds},L=function(M){return Jr([],Zr(l.values()),!1).filter(function(O){return O.enabled&&(O.from===M||O.bidirectional&&O.to===M)}).sort(function(O,H){return O.id<H.id?-1:O.id>H.id?1:0})},F=function(M,O){return Jr([],Zr(l.values()),!1).find(function(H){return H.enabled&&(H.from===M&&H.to===O||H.bidirectional&&H.from===O&&H.to===M)})};function _(M,O){var H,ee,j,K;if(M===O)return[M];for(var re=new Map([[M,0]]),J=new Map,ne=new Set([M]);ne.size;){var Te=Jr([],Zr(ne),!1).sort(function(ct,Tt){return re.get(ct)-re.get(Tt)||(ct<Tt?-1:ct>Tt?1:0)})[0];if(ne.delete(Te),Te===O)break;try{for(var fe=(H=void 0,Ql(L(Te))),pe=fe.next();!pe.done;pe=fe.next()){var Fe=pe.value,ae=Fe.from===Te?Fe.to:Fe.from,de=g(ae),_e=T(ae),Ge=de?de.parameters.holdSeconds*90+(m(de)?0:de.parameters.closedSeconds*90):0,$e=re.get(Te)+_s(T(Te),_e)/Fe.speedScale+Fe.cost+((j=_e.cost)!==null&&j!==void 0?j:0)+Ge;$e>=((K=re.get(ae))!==null&&K!==void 0?K:1/0)||(re.set(ae,$e),J.set(ae,Te),ne.add(ae))}}catch(ct){H={error:ct}}finally{try{pe&&!pe.done&&(ee=fe.return)&&ee.call(fe)}finally{if(H)throw H.error}}}if(!re.has(O))return[];for(var ut=[O],zt=O;zt!==M;)zt=J.get(zt),ut.unshift(zt);return ut}function p(M){var O,H=M.route.length>=2&&M.segment<M.route.length-1;if(!H){var ee=(O=M.route[Math.min(M.segment,M.route.length-1)])!==null&&O!==void 0?O:M.startNode,j=_(ee,M.target);M.route=j.length?j:[ee],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var K=M.route[M.segment],re=M.route[M.segment+1],J=_s(T(K),T(re));if(M.arrived||M.distance>=J-1e-4){var j=_(re,M.target);M.route=j.length?j:[re],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var ne=_(re,M.target);M.route=ne.length?Jr([K],Zr(ne),!1):[K,re],M.segment=0}function S(M){var O,H=_(M.startNode,M.targetNode),ee=T(M.startNode),j=H.length>=2?T(H[1]):ee,K=H.length>=2?Math.atan2(j.y-ee.y,j.x-ee.x):0,re=Math.floor((K%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4,J=qa(qa({},M),{loop:(O=M.loop)!==null&&O!==void 0?O:"none",originNode:M.startNode,destinationNode:M.targetNode,target:M.targetNode,networkId:e,route:H.length?H:[M.startNode],segment:0,distance:0,x:ee.x,y:ee.y,heading:K,frame:[0,1,2,3][re],flipX:Math.cos(K)<0,hold:0,arrived:!1,active:M.active&&H.length>=2,blockedTicks:0,blockedEmitted:!1,speedMultiplier:1});return f.set(J.id,J),J}function B(M){if(b("pathArrive",M,M.target),M.loop==="none"){M.active=!1;return}var O=M.target,H=M.loop==="ping-pong"?O===M.destinationNode?M.originNode:M.destinationNode:O===M.originNode?M.destinationNode:M.originNode;M.startNode=O,M.target=H,M.route=_(O,H),M.segment=0,M.distance=0,M.arrived=!1,M.route.length<2&&(M.active=!1)}function b(M,O,H){o(M,{componentId:O.id,nodeId:H})}function I(M,O){var H,ee,j=M.route[M.segment+1],K=g(j);if(K&&!m(K)){M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,b("pathBlocked",M,j));return}if(!M.arrived){if(M.arrived=!0,M.segment+1===M.route.length-1){j===M.target?B(M):(M.active=!1,M.blockedEmitted||(M.blockedEmitted=!0,b("pathBlocked",M,j)));return}M.hold=Math.max((H=T(j).holdSeconds)!==null&&H!==void 0?H:0,(ee=K?.parameters.holdSeconds)!==null&&ee!==void 0?ee:0)}if(M.hold>0){M.hold=Math.max(0,M.hold-O),M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,b("pathBlocked",M,j));return}M.segment++,M.distance=0,M.arrived=!1,M.blockedTicks=0,M.blockedEmitted=!1}function z(M,O){var H,ee;if(M.spacing<=0)return O;var j=M.route[M.segment],K=M.route[M.segment+1],re=_s(T(j),T(K)),J=re-M.distance,ne=O;try{for(var Te=Ql(h.values()),fe=Te.next();!fe.done;fe=Te.next()){var pe=fe.value;if(!(pe.id===M.id||!pe.active||pe.route.length<2||pe.segment>=pe.route.length-1)){var Fe=pe.route[pe.segment],ae=pe.route[pe.segment+1],de=1/0;if(Fe===j&&ae===K&&(pe.distance>M.distance||pe.distance===M.distance&&pe.id<M.id))de=pe.distance-M.distance;else if(Fe===K)de=J+pe.distance;else if(ae===K&&Fe!==j){var _e=_s(T(Fe),T(ae))-pe.distance;_e<M.spacing&&(_e<J||_e===J&&pe.id<M.id)&&(de=J)}de<1/0&&(ne=Math.min(ne,Math.max(0,de-M.spacing)))}}}catch(Ge){H={error:Ge}}finally{try{fe&&!fe.done&&(ee=Te.return)&&ee.call(Te)}finally{if(H)throw H.error}}return ne}function U(M){var O=T(M.route[M.segment]),H=T(M.route[M.segment+1]),ee=_s(O,H),j=sv(M.distance/Math.max(1e-4,ee),0,1),K=O.x+(H.x-O.x)*j,re=O.y+(H.y-O.y)*j,J=Math.atan2(H.y-O.y,H.x-O.x),ne=Math.min(M.cornerRadius,ee/3),Te=M.route[M.segment+2];if(ne>0&&Te){var fe=T(Te),pe=_s(H,fe),Fe=Math.min(ne,pe/3);if(M.distance>ee-ne){var ae={x:H.x-(H.x-O.x)/ee*ne,y:H.y-(H.y-O.y)/ee*ne},de={x:H.x+(fe.x-H.x)/pe*Fe,y:H.y+(fe.y-H.y)/pe*Fe},_e=sv((M.distance-(ee-ne))/(ne*2),0,.5),Ge=1-_e;K=Ge*Ge*ae.x+2*Ge*_e*H.x+_e*_e*de.x,re=Ge*Ge*ae.y+2*Ge*_e*H.y+_e*_e*de.y;var $e=2*Ge*(H.x-ae.x)+2*_e*(de.x-H.x),ut=2*Ge*(H.y-ae.y)+2*_e*(de.y-H.y);Math.abs($e)+Math.abs(ut)>.001&&(J=Math.atan2(ut,$e))}}return{x:K,y:re,heading:J}}function Y(M){var O,H,ee,j;v+=M,y++;var K=Jr([],Zr(f.values()),!1).sort(function(wt,bt){return wt.id<bt.id?-1:wt.id>bt.id?1:0}),re=K.length?y%K.length:0,J=Jr(Jr([],Zr(K.slice(re)),!1),Zr(K.slice(0,re)),!1);try{for(var ne=Ql(J),Te=ne.next();!Te.done;Te=ne.next()){var fe=Te.value;if(!(!fe.active||fe.route.length<2||fe.segment>=fe.route.length-1)){var pe=fe.route[fe.segment],Fe=fe.route[fe.segment+1],ae=_s(T(pe),T(Fe));if(!(fe.distance>=ae-1e-4&&(I(fe,M),!fe.active||fe.route.length<2||fe.segment>=fe.route.length-1))){var de=fe.route[fe.segment],_e=fe.route[fe.segment+1],Ge=_s(T(de),T(_e)),$e=Ge-fe.distance,ut=(j=(ee=F(de,_e))===null||ee===void 0?void 0:ee.speedScale)!==null&&j!==void 0?j:1,zt=Math.min($e,fe.speed*ut*Math.max(0,fe.speedMultiplier)*M),ct=z(fe,zt);ct<=1e-4?(fe.blockedTicks++,fe.blockedTicks>=30&&!fe.blockedEmitted&&(fe.blockedEmitted=!0,b("pathBlocked",fe,_e))):(fe.distance+=ct,fe.blockedTicks=0,fe.blockedEmitted=!1);var Tt=U(fe);fe.x=Tt.x,fe.y=Tt.y,fe.heading=Tt.heading;var Zt=Math.floor((fe.heading%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4;fe.frame=[0,1,2,3][Zt],fe.flipX=Math.cos(fe.heading)<0}}}}catch(wt){O={error:wt}}finally{try{Te&&!Te.done&&(H=ne.return)&&H.call(ne)}finally{if(O)throw O.error}}}function E(){return{id:e,nodeCount:u.size,edgeCount:l.size,activeAgents:Jr([],Zr(f.values()),!1).filter(function(M){return M.active}).length,queuedAgents:Jr([],Zr(f.values()),!1).filter(function(M){return M.active&&M.blockedTicks>0}).length,agents:Jr([],Zr(f.values()),!1).map(function(M){var O;return{id:M.id,x:M.x,y:M.y,heading:M.heading,frame:(O=M.frame)!==null&&O!==void 0?O:0,flipX:!!M.flipX,active:M.active,targetNode:M.target,route:Jr([],Zr(M.route),!1),segment:M.segment,distance:M.distance,blocked:M.blockedTicks>0}})}}return{addAgent:S,removeAgent:function(M){return f.delete(M)},getAgent:function(M){return f.get(M)},setTarget:function(M,O){var H=f.get(M);return!H||!T(O)?!1:(H.target=O,H.destinationNode=O,H.active=!0,p(H),!0)},setEdge:function(M,O,H){var ee,j,K=l.get(M);if(!K)return!1;K.enabled=O,H!==void 0&&(K.cost=H);try{for(var re=Ql(f.values()),J=re.next();!J.done;J=re.next()){var ne=J.value;p(ne)}}catch(Te){ee={error:Te}}finally{try{J&&!J.done&&(j=re.return)&&j.call(re)}finally{if(ee)throw ee.error}}return!0},setGate:function(M,O,H){var ee,j,K=d.get(M);if(!K)return!1;K.parameters=qa(qa({},K.parameters),{mode:O,holdSeconds:H});try{for(var re=Ql(f.values()),J=re.next();!J.done;J=re.next()){var ne=J.value;p(ne)}}catch(Te){ee={error:Te}}finally{try{J&&!J.done&&(j=re.return)&&j.call(re)}finally{if(ee)throw ee.error}}return!0},tick:Y,snapshot:E}}var jl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Ld=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Dd=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Nd={A:["01110","10001","10001","11111","10001","10001","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],C:["01111","10000","10000","10000","10000","10000","01111"],D:["11110","10001","10001","10001","10001","10001","11110"],E:["11111","10000","10000","11110","10000","10000","11111"],F:["11111","10000","10000","11110","10000","10000","10000"],G:["01111","10000","10000","10111","10001","10001","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],I:["11111","00100","00100","00100","00100","00100","11111"],J:["00111","00010","00010","00010","10010","10010","01100"],K:["10001","10010","10100","11000","10100","10010","10001"],L:["10000","10000","10000","10000","10000","10000","11111"],M:["10001","11011","10101","10101","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"],O:["01110","10001","10001","10001","10001","10001","01110"],P:["11110","10001","10001","11110","10000","10000","10000"],Q:["01110","10001","10001","10001","10101","10010","01101"],R:["11110","10001","10001","11110","10100","10010","10001"],S:["01111","10000","10000","01110","00001","00001","11110"],T:["11111","00100","00100","00100","00100","00100","00100"],U:["10001","10001","10001","10001","10001","10001","01110"],V:["10001","10001","10001","10001","10001","01010","00100"],W:["10001","10001","10001","10101","10101","10101","01010"],X:["10001","10001","01010","00100","01010","10001","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],Z:["11111","00001","00010","00100","01000","10000","11111"],0:["01110","10001","10011","10101","11001","10001","01110"],1:["00100","01100","00100","00100","00100","00100","01110"],2:["01110","10001","00001","00010","00100","01000","11111"],3:["11110","00001","00001","01110","00001","00001","11110"],4:["00010","00110","01010","10010","11111","00010","00010"],5:["11111","10000","10000","11110","00001","00001","11110"],6:["01110","10000","10000","11110","10001","10001","01110"],7:["11111","00001","00010","00100","01000","01000","01000"],8:["01110","10001","10001","01110","10001","10001","01110"],9:["01110","10001","10001","01111","00001","00001","01110"],"!":["00100","00100","00100","00100","00100","00000","00100"],"?":["01110","10001","00001","00010","00100","00000","00100"],".":["00000","00000","00000","00000","00000","00110","00110"],",":["00000","00000","00000","00000","00110","00110","00100"],":":["00000","00110","00110","00000","00110","00110","00000"],"+":["00000","00100","00100","11111","00100","00100","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],"/":["00001","00010","00010","00100","01000","01000","10000"],"'":["00100","00100","00000","00000","00000","00000","00000"]," ":["000","000","000","000","000","000","000"]},ec=function(n){var e,t,i,r,a=0;try{for(var s=jl(n),o=s.next();!o.done;o=s.next()){var u=o.value;a+=((r=(i=Nd[u])===null||i===void 0?void 0:i[0].length)!==null&&r!==void 0?r:5)+1}}catch(l){e={error:l}}finally{try{o&&!o.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}return Math.max(0,a-1)},Rb=function(n,e){var t,i,r=[],a="";try{for(var s=jl(n),o=s.next();!o.done;o=s.next()){var u=o.value;a&&ec(a+u)>e&&(r.push(a),a=""),a+=u}}catch(l){t={error:l}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(t)throw t.error}}return a&&r.push(a),r};function Pb(n,e,t){var i,r,a,s,o;t===void 0&&(t=1);var u=Math.max(1,Math.floor(e/Math.max(1,t))),l=[];try{for(var d=jl(String(n).toUpperCase().split(`
`)),f=d.next();!f.done;f=d.next()){var h=f.value,v=h.split(/\s+/).filter(Boolean);if(!v.length){l.push("");continue}var y="";try{for(var T=(a=void 0,jl(v)),g=T.next();!g.done;g=T.next()){var m=g.value;if(ec(m)>u){y&&l.push(y);var L=Rb(m,u);l.push.apply(l,Dd([],Ld(L.slice(0,-1)),!1)),y=(o=L.at(-1))!==null&&o!==void 0?o:""}else{var F=y?y+" "+m:m;ec(F)<=u?y=F:(y&&l.push(y),y=m)}}}catch(_){a={error:_}}finally{try{g&&!g.done&&(s=T.return)&&s.call(T)}finally{if(a)throw a.error}}y&&l.push(y)}}catch(_){i={error:_}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(i)throw i.error}}return l}var lv=function(n){var e,t=Math.max(0,(e=n.padding)!==null&&e!==void 0?e:4),i=n.pixelPanel&&n.padding===void 0;return{x:i?8:t,y:i?4:t}},Lb=function(n,e,t,i){var r,a=e.wrap===!1?String(n).toUpperCase().split(`
`):Pb(n,i,t),s=a.slice(0,16),o=Math.round(t*8*((r=e.lineHeight)!==null&&r!==void 0?r:1.2));return{allLines:a,lines:s,renderedWidth:Math.max.apply(Math,Dd([0],Ld(s.map(function(u){return ec(u)*t})),!1)),renderedHeight:(s.length-1)*o+7*t}};function Yh(n,e){for(var t,i=lv(e),r=Math.max(0,e.width-2*i.x),a=Math.max(0,e.height-2*i.y),s=Math.max(1,Math.floor(e.fontSize/8)),o=e.autoFit===!1?s:Math.min(s,Math.max(1,Math.ceil(((t=e.minFontSize)!==null&&t!==void 0?t:12)/8))),u=Dd([],Ld(new Set(Dd([],Ld(String(n).toUpperCase()),!1).filter(function(y){return y!==`
`&&!Nd[y]}))),!1),l,d=s;d>=o;d--){var f=Lb(n,e,d,r),h=f.renderedWidth>r,v=f.allLines.length>16||f.renderedHeight>a;if(l={lines:f.lines,scale:d,fontSize:d*8,renderedWidth:f.renderedWidth,renderedHeight:f.renderedHeight,overflowsWidth:h,overflowsHeight:v,unsupportedChars:u},e.autoFit===!1||!h&&!v)break}return l}function cv(n,e,t){var i,r=Yh(e,t),a=r.lines,s=r.scale,o=lv(t),u=Math.max(0,t.width-2*o.x),l=Math.max(0,t.height-2*o.y),d=Math.round(r.fontSize*((i=t.lineHeight)!==null&&i!==void 0?i:1.2)),f=o.y+(l-r.renderedHeight)/2;return n.fillStyle=t.color,a.forEach(function(h,v){var y,T,g,m=ec(h)*s,L=t.align==="left"?o.x:t.align==="right"?t.width-m-o.x:o.x+(u-m)/2,F=L;try{for(var _=jl(h),p=_.next();!p.done;p=_.next()){var S=p.value,B=(g=Nd[S])!==null&&g!==void 0?g:Nd["?"];B.forEach(function(b,I){for(var z=0;z<b.length;z++)b[z]==="1"&&n.fillRect(Math.round(F+z*s),Math.round(f+v*d+I*s),s,s)}),F+=(B[0].length+1)*s}}catch(b){y={error:b}}finally{try{p&&!p.done&&(T=_.return)&&T.call(_)}finally{if(y)throw y.error}}}),r}var Ra=function(){return Ra=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Ra.apply(this,arguments)},Zh=Math.PI*2,hi=function(n,e){return((Math.imul(n+1,2654435769)^Math.imul(e,2246822507))>>>0)/4294967296};function Jh(n,e,t){var i,r,a=[n.color,n.color2,n.color3].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(u,l){var d,f,h=o+((l+.2+hi(l,1)*.6)/n.count-.5)*s,v=n.speed*(.42+.65*hi(l,2));return Ra(Ra({},e),{clipId:t,shape:"pixel-confetti",age:-.12*hi(l,3),vx:Math.cos(h)*v,vy:Math.sin(h)*v,gravity:(d=n.gravity)!==null&&d!==void 0?d:250,life:((f=n.lifetime)!==null&&f!==void 0?f:.7)*(.6+.4*hi(l,4)),color:a[l%a.length],size:3+Math.floor(3*hi(l,5)),angle:Zh*hi(l,6),spin:(hi(l,7)-.5)*12})})}function uv(n){var e=Math.min(12,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return Jh(n).map(function(r,a){return Ra(Ra({},r),{screen:!0,x:(a%e+.15+.7*hi(a,8))/e,y:(Math.floor(a/e)+.15+.7*hi(a,9))/t,vx:i*(hi(a,10)-.5)*.7,vy:i*(.3+.5*hi(a,11)),size:r.size+1})})}var Fd=function(n,e){return(n%e+e)%e};function dv(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,u=e.life,l=e.gravity,d=e.size,f=e.angle,h=e.spin,v=e.color;if(!(o<0)){var y=a*o,T=s*o+l*o*o/2,g=Math.round(t?t.x+Fd(i*t.width+y,t.width):i+y),m=Math.round(t?t.y+Fd(r*t.height+T,t.height):r+T),L=Math.round((f+h*o)/(Math.PI/4))&3;if(n.globalAlpha*=Math.min(1,(u-o)*4),n.fillStyle="#3c293388",L===0)n.fillRect(g-d+1,m+1,d*2+1,d+1);else if(L===2)n.fillRect(g+1,m-d+1,d+1,d*2+1);else for(var F=-1;F<=1;F++)n.fillRect(g+F*d+1,m+F*d*(L===1?1:-1)+1,d+1,d+1);if(n.fillStyle=v,L===0)n.fillRect(g-d,m,d*2,d);else if(L===2)n.fillRect(g,m-d,d,d*2);else for(var F=-1;F<=1;F++)n.fillRect(g+F*d,m+F*d*(L===1?1:-1),d,d)}}function $h(n,e,t){var i,r,a=[n.color,n.color2,n.color3,"#ff6b6b","#4ecdc4","#fff3b0"].filter(Boolean),s=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(u,l){var d,f,h=o+((l+.2+hi(l,11)*.6)/n.count-.5)*s,v=n.speed*(.45+.65*hi(l,12));return Ra(Ra({},e),{clipId:t,shape:"confetti",age:-.15*hi(l,13),vx:Math.cos(h)*v,vy:Math.sin(h)*v,gravity:(d=n.gravity)!==null&&d!==void 0?d:140,life:((f=n.lifetime)!==null&&f!==void 0?f:2.6)*(.75+.35*hi(l,14)),color:a[l%a.length],size:5+Math.floor(5*hi(l,15)),kind:l%5===0?"star":"ribbon",angle:Zh*hi(l,16),spin:(hi(l,17)-.5)*5.5,flutter:1.6+2.2*hi(l,18),phase:Zh*hi(l,19)})})}function fv(n){var e=Math.min(14,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return $h(n,{x:0,y:0}).map(function(r,a){var s;return Ra(Ra({},r),{screen:!0,x:(a%e+.12+.76*hi(a,20))/e,y:(Math.floor(a/e)+.08+.84*hi(a,21))/t,vx:i*(hi(a,22)-.5)*.65,vy:i*(.38+.55*hi(a,23)),gravity:Math.min((s=n.gravity)!==null&&s!==void 0?s:90,90)})})}function hv(n,e,t){var i=e.x,r=e.y,a=e.vx,s=e.vy,o=e.age,u=e.life,l=e.gravity,d=e.size,f=e.angle,h=e.spin,v=e.flutter,y=e.phase,T=e.color,g=e.kind;if(!(o<0)){var m=Math.sin(o*v+y)*14,L=a*o+m,F=s*o+l*o*o/2,_=t?t.x+Fd(i*t.width+L,t.width):i+L,p=t?t.y+Fd(r*t.height+F,t.height):r+F,S=Math.min(1,o*2.8,(u-o)*2.2);if(!(S<=0)){n.save(),n.globalAlpha*=S,n.translate(_,p),n.rotate(f+h*o);var B=Math.cos(o*v*1.4+y);if(n.scale(1,Math.max(.22,Math.abs(B))),n.fillStyle=T,g==="star"){var b=d*.85;n.beginPath();for(var I=0;I<8;I++){var z=I%2===0?b:b*.38,U=I*Math.PI/4;I===0?n.moveTo(Math.cos(U)*z,Math.sin(U)*z):n.lineTo(Math.cos(U)*z,Math.sin(U)*z)}n.closePath(),n.fill()}else n.fillRect(-d*.7,-d*.34,d*1.4,d*.68),n.fillStyle="#ffffff55",n.fillRect(-d*.7,-d*.34,d*1.4,d*.2);n.restore()}}}function pv(n,e,t,i,r){var a=e.width,s=e.height;if(!(a<=0||s<=0)){var o=Math.min(3,Math.floor(Math.min(a,s)/8));if(!o){n.fillStyle=t,n.fillRect(0,0,a,s);return}var u=i?o*2:0,l=s-(i?o:o*3),d=r>=0?.5+.5*Math.sin(r*4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd05a99",n.shadowBlur=8+d*9,n.fillStyle=t,n.fillRect(o,u+o,a-2*o,s-u-2*o),n.restore()),n.fillStyle=e.stroke,n.fillRect(o,0,a-2*o,s),n.fillRect(0,o,a,s-2*o),n.fillStyle=t,n.fillRect(o,u+o,a-2*o,s-u-2*o),n.fillStyle="#431d1380",n.fillRect(o,l,a-2*o,s-o-l),n.fillStyle=e.enabled?"#fff4be":"#ffffff55",n.fillRect(2*o,u+o,a-4*o,i?o:o*2),n.fillStyle="#ffffff55",n.fillRect(o,u+3*o,o,Math.max(0,l-u-3*o)),n.fillStyle="#521b2444",n.fillRect(a-2*o,u+3*o,o,Math.max(0,l-u-3*o));var f=r>=0?r%1.9:-1,h=(f-.1)/.55;if(e.enabled&&!i&&h>=0&&h<1){n.save(),n.beginPath(),n.rect(2*o,u+3*o,a-4*o,Math.max(0,l-u-3*o)),n.clip();for(var v=Math.floor(((a+14*o)*h-6*o)/o)*o,y=u+3*o,T=0;y<l;y+=o,T++){var g=v-Math.floor(T/2)*o;n.fillStyle="#fff4be44",n.fillRect(g-2*o,y,9*o,o),n.fillStyle="#fffef0aa",n.fillRect(g,y,4*o,o)}n.restore()}if(e.enabled&&!i&&r>=0){var m=Math.max(0,Math.sin(r*4.2)),L=Math.max(0,Math.sin(r*4.2+2.2)),F=function(_,p,S){if(!(S<.25)){n.save(),n.globalAlpha*=S*.95,n.fillStyle="#fffef4";var B=S>.65?o*2:o;n.fillRect(Math.round(_-B),Math.round(p-o/2),B*2+o,o),n.fillRect(Math.round(_-o/2),Math.round(p-B),o,B*2+o),n.restore()}};F(5*o,u+4*o,m),F(a-6*o,u+5*o,L)}}}function Ud(n,e,t,i,r,a){var s=Math.max(0,Math.min(a,i/2,r/2));n.beginPath(),typeof n.roundRect=="function"?n.roundRect(e,t,i,r,s):(n.moveTo(e+s,t),n.arcTo(e+i,t,e+i,t+r,s),n.arcTo(e+i,t+r,e,t+r,s),n.arcTo(e,t+r,e,t,s),n.arcTo(e,t,e+i,t,s),n.closePath())}function qh(n,e,t,i,r){if(!(r<=.02||i<=.5)){n.save(),n.translate(e,t),n.globalAlpha*=r,n.fillStyle="#fffef0",n.beginPath();for(var a=0;a<8;a++){var s=a%2===0?i:i*.24,o=a*Math.PI/4;a===0?n.moveTo(Math.cos(o)*s,Math.sin(o)*s):n.lineTo(Math.cos(o)*s,Math.sin(o)*s)}n.closePath(),n.fill(),n.restore()}}function mv(n,e,t,i,r){var a,s,o,u=e.width,l=e.height;if(!(u<=0||l<=0)){var d=Math.min((a=e.radius)!==null&&a!==void 0?a:16,u/2,l/2),f=i?2:6,h=i?3:0,v=r>=0?.5-.5*Math.cos(r*2.4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd23f99",n.shadowBlur=10+v*12,Ud(n,0,h,u,l-h,d),n.fillStyle=t,n.fill(),n.restore()),n.save(),Ud(n,0,h+2,u,Math.max(4,l-h-2),d),n.fillStyle="#0e2830",n.fill(),n.restore(),n.save(),Ud(n,0,h,u,Math.max(4,l-f),d),n.fillStyle=t,n.fill(),n.clip();var y=(s=n.createLinearGradient)===null||s===void 0?void 0:s.call(n,0,h,0,l-f);if(y?.addColorStop&&(y.addColorStop(0,"#ffffffa8"),y.addColorStop(.42,"#ffffff26"),y.addColorStop(.45,"#00000000"),y.addColorStop(1,"#00000024"),n.fillStyle=y,n.fillRect(0,h,u,l-f)),n.fillStyle="#fffef0bb",n.fillRect(d*.55,h+3,Math.max(0,u-d*1.1),3),e.enabled&&!i&&r>=0){var T=(r%2.4-.15)/.95;if(T>0&&T<1){var g=T*T*(3-2*T),m=Math.sin(T*Math.PI),L=-u*.36+u*1.72*g;n.save(),n.globalAlpha*=m,n.translate(L,h),n.transform(1,0,-.36,1,0,0);var F=(o=n.createLinearGradient)===null||o===void 0?void 0:o.call(n,-48,0,48,0);F?.addColorStop?(F.addColorStop(0,"#ffffff00"),F.addColorStop(.32,"#ffffff48"),F.addColorStop(.5,"#fffef8cc"),F.addColorStop(.68,"#ffffff48"),F.addColorStop(1,"#ffffff00"),n.fillStyle=F,n.fillRect(-48,0,96,l)):(n.fillStyle="#fffef8a8",n.fillRect(-14,0,28,l)),n.restore()}}if(n.restore(),e.strokeWidth&&(n.save(),Ud(n,0,h,u,Math.max(4,l-f),d),n.strokeStyle=e.stroke,n.lineWidth=e.strokeWidth,n.stroke(),n.restore()),e.enabled&&!i&&r>=0){var _=Math.max(0,Math.sin(r*2.4)),p=_*_,S=Math.max(0,Math.sin(r*2.4+2.1)),B=S*S,b=Math.max(0,Math.sin(r*2.4+4.2)),I=b*b;qh(n,u*.12,h+9,4+p*6,p*.92),qh(n,u*.88,h+10,3.8+B*5.5,B*.9),qh(n,u*.76,Math.max(h+14,l-f-8),3+I*4.2,I*.8)}}}function Od(n){if(/\s/.test(n)||n.length>512)return!1;var e=/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,9}$/,t=/^https:\/\/apps\.apple\.com\/([a-z]{2}\/)?app\/([a-zA-Z0-9-]+\/)?id[1-9][0-9]{5,19}$/;return e.test(n)&&!/id=example\.|[.=]placeholder(\.|$)|id=com\.example(\.|$)/.test(n)||t.test(n)}var tc=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},nc=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Kh=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function vv(n){var e,t,i;n===void 0&&(n={});var r=(e=n.timeoutMs)!==null&&e!==void 0?e:5e3,a=(t=n.pollMs)!==null&&t!==void 0?t:25;if(![r,a].every(function(j){return Number.isFinite(j)&&j>=1&&j<=6e4}))throw Error("Invalid Unity host deadline/poll interval");var s=(i=n.getHost)!==null&&i!==void 0?i:(function(){return window.mraid}),o=new Set,u=new Set,l=[],d={},f=!1,h=!1,v=!1,y=!1,T=!1,g=!1,m,L,F,_,p,S,B=function(){return v||y};function b(){var j,K,re;clearTimeout(p),clearTimeout(S);try{for(var J=tc(l.splice(0)),ne=J.next();!ne.done;ne=J.next()){var Te=nc(ne.value,2),fe=Te[0],pe=Te[1];try{(re=d.mraid)===null||re===void 0||re.removeEventListener(fe,pe)}catch{}}}catch(Fe){j={error:Fe}}finally{try{ne&&!ne.done&&(K=J.return)&&K.call(J)}finally{if(j)throw j.error}}}function I(j){_?.(j instanceof Error?j:Error(String(j))),F=void 0,_=void 0}function z(j){var K,re;if(!B()){var J=f;if(v=!0,f=!1,h=!1,b(),I(j),J)try{for(var ne=tc(Kh([],nc(u),!1)),Te=ne.next();!Te.done;Te=ne.next()){var fe=Te.value;fe()}}catch(pe){K={error:pe}}finally{try{Te&&!Te.done&&(re=ne.return)&&re.call(ne)}finally{if(K)throw K.error}}o.clear(),u.clear()}}function U(j,K){return l.push([j,K]),d.mraid.addEventListener(j,K),Y(j,K)}function Y(j,K){if(B()){try{d.mraid.removeEventListener(j,K)}catch{}return!1}return!0}function E(j){var K,re;if(!B()){if(typeof j!="boolean"){z(Error("Invalid Unity viewability event"));return}if(!f){m=j;return}if(h!==j){h=j;try{for(var J=tc(Kh([],nc(o),!1)),ne=J.next();!ne.done;ne=J.next()){var Te=ne.value;if(B())break;Te(h)}}catch(fe){K={error:fe}}finally{try{ne&&!ne.done&&(re=J.return)&&re.call(J)}finally{if(K)throw K.error}}}}}var M=function(j){j==="hidden"&&z(Error("Unity host closed"))},O=function(){var j;f&&!B()&&((j=n.onResize)===null||j===void 0||j.call(n))};function H(){var j,K,re,J;if(!(!T||f||g||B())){g=!0;try{var ne=d.mraid.getState();if(B()||ne==="loading")return;if(ne==="hidden")throw Error("Unity host closed before ready");if(!["default","expanded","resized"].includes(ne))throw Error("Invalid Unity host state");var Te=d.mraid.getVersion();if(B())return;if(Te!=="3.0")throw Error("Unity Ads UA requires MRAID 3.0");try{for(var fe=tc([["viewableChange",E],["stateChange",M],["sizeChange",O]]),pe=fe.next();!pe.done;pe=fe.next()){var Fe=nc(pe.value,2),ae=Fe[0],de=Fe[1];if(!U(ae,de))return}}catch(zt){j={error:zt}}finally{try{pe&&!pe.done&&(K=fe.return)&&K.call(fe)}finally{if(j)throw j.error}}var _e=d.mraid.isViewable();if(B())return;if(typeof _e!="boolean")throw Error("Invalid Unity initial viewability");h=m??_e,f=!0,clearTimeout(p),clearTimeout(S),F?.(),F=void 0,_=void 0;try{for(var Ge=tc(Kh([],nc(o),!1)),$e=Ge.next();!$e.done;$e=Ge.next()){var ut=$e.value;if(B())break;ut(h)}}catch(zt){re={error:zt}}finally{try{$e&&!$e.done&&(J=Ge.return)&&J.call(Ge)}finally{if(re)throw re.error}}}catch(zt){z(zt)}finally{g=!1}}}function ee(){if(!B())try{var j=s();if(B())return;if(!j){S=setTimeout(ee,a);return}if(d.mraid=j,l.push(["ready",H]),d.mraid.addEventListener("ready",H),!Y("ready",H))return;T=!0,H()}catch(K){z(K)}}return{init:function(){return L||(L=new Promise(function(j,K){F=j,_=K}),B()?(I(Error("Unity bridge destroyed")),L):(p=setTimeout(function(){return z(Error("Unity MRAID readiness timed out"))},r),ee(),L))},isReady:function(){return f&&!B()},isVisible:function(){return f&&h&&!B()},isClosed:B,onVisibilityChanged:function(j){return B()||o.add(j),function(){return o.delete(j)}},onClosed:function(j){return B()||u.add(j),function(){return u.delete(j)}},openStore:function(j){if(!f||!h||B()||!Od(j))throw Error("Unity store request not permitted");d.mraid.open(j)},destroy:function(){y||(y=!0,f=!1,h=!1,b(),I(Error("Unity bridge destroyed")),o.clear(),u.clear())}}}var Uo=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Fo=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Qh=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function gv(n){var e;n===void 0&&(n={});var t=(e=n.getHost)!==null&&e!==void 0?e:(function(){return window.mraid}),i,r=!1,a=!1,s=!1,o=!1,u=!1,l,d,f,h,v,y=new Set,T=new Set,g=[];function m(){var U,Y;clearTimeout(h),clearTimeout(v);try{for(var E=Uo(g.splice(0)),M=E.next();!M.done;M=E.next()){var O=Fo(M.value,2),H=O[0],ee=O[1];try{i?.removeEventListener(H,ee)}catch{}}}catch(j){U={error:j}}finally{try{M&&!M.done&&(Y=E.return)&&Y.call(E)}finally{if(U)throw U.error}}}function L(U,Y){if(g.push([U,Y]),i.addEventListener(U,Y),s||o){try{i.removeEventListener(U,Y)}catch{}return!1}return!0}function F(U){var Y=U instanceof Error?U:Error(String(U));f?.(Y),d=void 0,f=void 0}function _(U,Y){var E,M;if(!(s||o)&&(s=!0,r=!1,a=!1,m(),F(U),Y))try{for(var O=Uo(Qh([],Fo(T),!1)),H=O.next();!H.done;H=O.next()){var ee=H.value;ee()}}catch(j){E={error:j}}finally{try{H&&!H.done&&(M=O.return)&&M.call(O)}finally{if(E)throw E.error}}}function p(){var U,Y,E,M;if(!(!u||r||s||o))try{var O=i.getState();if(s||o||O==="loading")return;if(O==="hidden"){_(Error("MRAID closed before ready"),!0);return}if(!["default","expanded","resized"].includes(O))throw Error("Invalid MRAID state");try{for(var H=Uo([["viewableChange",B],["stateChange",b],["sizeChange",I]]),ee=H.next();!ee.done;ee=H.next()){var j=Fo(ee.value,2),K=j[0],re=j[1];if(!L(K,re))return}}catch(fe){U={error:fe}}finally{try{ee&&!ee.done&&(Y=H.return)&&Y.call(H)}finally{if(U)throw U.error}}var J=i.isViewable();if(s||o)return;if(typeof J!="boolean")throw Error("Invalid MRAID viewability");a=J,r=!0,clearTimeout(h),clearTimeout(v),d?.(),d=void 0,f=void 0;try{for(var ne=Uo(Qh([],Fo(y),!1)),Te=ne.next();!Te.done;Te=ne.next()){var re=Te.value;re(a)}}catch(fe){E={error:fe}}finally{try{Te&&!Te.done&&(M=ne.return)&&M.call(ne)}finally{if(E)throw E.error}}}catch(fe){_(fe,r)}}var S=function(){return p()},B=function(U){var Y,E;if(!(!r||s||o)){if(typeof U!="boolean"){_(Error("Invalid MRAID visibility event"),!0);return}a=U;try{for(var M=Uo(Qh([],Fo(y),!1)),O=M.next();!O.done;O=M.next()){var H=O.value;H(a)}}catch(ee){Y={error:ee}}finally{try{O&&!O.done&&(E=M.return)&&E.call(M)}finally{if(Y)throw Y.error}}}},b=function(U){U==="hidden"&&_(Error("MRAID closed"),!0)},I=function(){var U;r&&!s&&!o&&((U=n.onResize)===null||U===void 0||U.call(n))};function z(){var U,Y,E;if(!(s||o))try{if(i=t(),s||o)return;if(!i){v=setTimeout(z,(E=n.pollMs)!==null&&E!==void 0?E:50);return}if(![i.getState,i.isViewable,i.addEventListener,i.removeEventListener,i.open].every(function(K){return typeof K=="function"}))throw Error("Incomplete MRAID 2 interface");try{for(var M=Uo([["ready",S]]),O=M.next();!O.done;O=M.next()){var H=Fo(O.value,2),ee=H[0],j=H[1];if(!L(ee,j))return}}catch(K){U={error:K}}finally{try{O&&!O.done&&(Y=M.return)&&Y.call(M)}finally{if(U)throw U.error}}u=!0,p()}catch(K){_(K,!1)}}return{init:function(){var U;return l||(l=new Promise(function(Y,E){d=Y,f=E}),s||o?(F(Error("MRAID bridge destroyed")),l):(h=setTimeout(function(){return _(Error("MRAID readiness timed out"),!1)},(U=n.timeoutMs)!==null&&U!==void 0?U:5e3),z(),l))},isReady:function(){return r&&!s&&!o},isVisible:function(){return a&&r&&!s&&!o},isClosed:function(){return s||o},onVisibilityChanged:function(U){return!s&&!o&&y.add(U),function(){return y.delete(U)}},onClosed:function(U){return!s&&!o&&T.add(U),function(){return T.delete(U)}},openStore:function(U){if(!r||!a||s||o||!Od(U))throw Error("MRAID store request not permitted");i.open(U)},destroy:function(){o||(o=!0,r=!1,a=!1,m(),F(Error("MRAID bridge destroyed")),y.clear(),T.clear())}}}var zs=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Vs=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},ic=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))};function yv(n){n===void 0&&(n={});var e=new Set,t=new Set,i=new Set,r=[],a,s=!1,o=!1,u=!1,l=!1,d,f,h,v,y,T=function(){return u||l};function g(){var I,z;clearTimeout(v),clearTimeout(y);try{for(var U=zs(r.splice(0)),Y=U.next();!Y.done;Y=U.next()){var E=Vs(Y.value,2),M=E[0],O=E[1];try{a?.removeEventListener(M,O)}catch{}}}catch(H){I={error:H}}finally{try{Y&&!Y.done&&(z=U.return)&&z.call(U)}finally{if(I)throw I.error}}}function m(I){var z,U;if(!T()){u=!0,s=!1,o=!1,g(),h?.(I instanceof Error?I:Error(String(I))),f=void 0,h=void 0;try{for(var Y=zs(ic([],Vs(t),!1)),E=Y.next();!E.done;E=Y.next()){var M=E.value;M()}}catch(O){z={error:O}}finally{try{E&&!E.done&&(U=Y.return)&&U.call(Y)}finally{if(z)throw z.error}}}}var L=function(I){if(!(typeof I!="number"||!Number.isFinite(I)||I<0))return Math.min(1,I>1?I/100:I)},F=function(I){if(typeof I=="boolean")return I;if(I&&typeof I=="object"&&typeof I.isViewable=="boolean")return I.isViewable},_=function(){var I,z,U,Y,E,M;if(!(s||T()||!a||((E=a.isReady)===null||E===void 0?void 0:E.call(a))===!1))try{o=a.isViewable();var O=(M=a.getAudioVolume)===null||M===void 0?void 0:M.call(a),H=O===void 0?void 0:L(O);if(typeof o!="boolean"||O!==void 0&&H===void 0)throw Error("Invalid DAPI initial state");if(s=!0,clearTimeout(v),clearTimeout(y),f?.(),f=void 0,h=void 0,H!==void 0)try{for(var ee=zs(ic([],Vs(i),!1)),j=ee.next();!j.done;j=ee.next()){var K=j.value;K(H)}}catch(ne){I={error:ne}}finally{try{j&&!j.done&&(z=ee.return)&&z.call(ee)}finally{if(I)throw I.error}}try{for(var re=zs(ic([],Vs(e),!1)),J=re.next();!J.done;J=re.next()){var K=J.value;K(o)}}catch(ne){U={error:ne}}finally{try{J&&!J.done&&(Y=re.return)&&Y.call(re)}finally{if(U)throw U.error}}}catch(ne){m(ne)}},p=function(I){var z,U;if(!T()){var Y=F(I);if(Y===void 0){m(Error("Invalid DAPI visibility"));return}o=Y;try{for(var E=zs(ic([],Vs(e),!1)),M=E.next();!M.done;M=E.next()){var O=M.value;O(Y)}}catch(H){z={error:H}}finally{try{M&&!M.done&&(U=E.return)&&U.call(E)}finally{if(z)throw z.error}}}},S=function(I){var z,U;if(!T()){var Y=L(I);if(Y===void 0){m(Error("Invalid DAPI volume"));return}try{for(var E=zs(ic([],Vs(i),!1)),M=E.next();!M.done;M=E.next()){var O=M.value;O(Y)}}catch(H){z={error:H}}finally{try{M&&!M.done&&(U=E.return)&&U.call(E)}finally{if(z)throw z.error}}}},B=function(){var I;s&&!T()&&((I=n.onResize)===null||I===void 0||I.call(n))};function b(){var I,z,U;if(!T()){if(a=window.dapi,!a){y=setTimeout(b,(U=n.pollMs)!==null&&U!==void 0?U:25);return}try{try{for(var Y=zs([["ready",_],["viewableChange",p],["audioVolumeChange",S],["adResized",B]]),E=Y.next();!E.done;E=Y.next()){var M=Vs(E.value,2),O=M[0],H=M[1];r.push([O,H]),a.addEventListener(O,H)}}catch(ee){I={error:ee}}finally{try{E&&!E.done&&(z=Y.return)&&z.call(Y)}finally{if(I)throw I.error}}_()}catch(ee){m(ee)}}}return{init:function(){var I;return d||(d=new Promise(function(z,U){f=z,h=U}),T()?(h?.(Error("DAPI bridge closed")),d):(v=setTimeout(function(){return m(Error("DAPI readiness timed out"))},(I=n.timeoutMs)!==null&&I!==void 0?I:5e3),b(),d))},isReady:function(){return s&&!T()},isVisible:function(){return s&&o&&!T()},isClosed:T,onVisibilityChanged:function(I){return T()||e.add(I),function(){return e.delete(I)}},onClosed:function(I){return T()||t.add(I),function(){return t.delete(I)}},onVolumeChanged:function(I){return T()||i.add(I),function(){return i.delete(I)}},openStore:function(){if(!s||!o||T()||typeof a?.openStoreUrl!="function")throw Error("DAPI store host unavailable");a.openStoreUrl()},destroy:function(){l||(l=!0,s=!1,o=!1,g(),h?.(Error("DAPI bridge destroyed")),e.clear(),t.clear(),i.clear())}}}var Db=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(f){s(f)}}function u(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Nb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},Ub=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Fb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ob=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function xv(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Ob(Fb([],Ub(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return Db(this,void 0,void 0,function(){return Nb(this,function(a){switch(a.label){case 0:if(i)throw Error("Meta bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("Meta bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a=window.FbPlayableAd;if(!e||!t||i||typeof a?.onCTAClick!="function")throw Error("Meta CTA host unavailable");a.onCTAClick()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var Bb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(f){s(f)}}function u(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},kb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},zb=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Vb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Gb=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function _v(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Gb(Vb([],zb(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return Bb(this,void 0,void 0,function(){return kb(this,function(a){switch(a.label){case 0:if(i)throw Error("Google Ads bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("Google Ads bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a=window.ExitApi;if(!e||!t||i||typeof a?.exit!="function")throw Error("Google ExitApi unavailable");a.exit()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var Hb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(f){s(f)}}function u(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Wb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},jh=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},ep=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},tp=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Mv(){var n=window,e=new Set,t=new Set,i=n.gameStart,r=n.gameClose,a=!1,s=!1,o=!1,u=!1,l=function(){var f,h;if(!(o||u)){var v=!s||!a;if(a=!0,s=!0,v)try{for(var y=tp(ep([],jh(e),!1)),T=y.next();!T.done;T=y.next()){var g=T.value;g(!0)}}catch(m){f={error:m}}finally{try{T&&!T.done&&(h=y.return)&&h.call(y)}finally{if(f)throw f.error}}}},d=function(){var f,h,v,y;if(!(o||u)){a=!1,s=!1,o=!0;try{for(var T=tp(ep([],jh(e),!1)),g=T.next();!g.done;g=T.next()){var m=g.value;m(!1)}}catch(_){f={error:_}}finally{try{g&&!g.done&&(h=T.return)&&h.call(T)}finally{if(f)throw f.error}}try{for(var L=tp(ep([],jh(t),!1)),F=L.next();!F.done;F=L.next()){var m=F.value;m()}}catch(_){v={error:_}}finally{try{F&&!F.done&&(y=L.return)&&y.call(L)}finally{if(v)throw v.error}}}};return n.gameStart=l,n.gameClose=d,{init:function(){return Hb(this,void 0,void 0,function(){return Wb(this,function(f){if(o||u)throw Error("Mintegral bridge closed");if(typeof n.gameReady!="function")throw Error("Mintegral gameReady host unavailable");return n.gameReady(),[2]})})},isReady:function(){return a&&!o&&!u},isVisible:function(){return a&&s&&!o&&!u},isClosed:function(){return o||u},onVisibilityChanged:function(f){return!o&&!u&&e.add(f),function(){return e.delete(f)}},onClosed:function(f){return!o&&!u&&t.add(f),function(){return t.delete(f)}},notifyGameEnd:function(){var f;!o&&!u&&((f=n.gameEnd)===null||f===void 0||f.call(n))},notifyGameRetry:function(){var f;!o&&!u&&((f=n.gameRetry)===null||f===void 0||f.call(n))},openStore:function(){if(!a||!s||o||u||typeof n.install!="function")throw Error("Mintegral install host unavailable");n.install()},destroy:function(){u||(u=!0,a=!1,s=!1,n.gameStart===l&&(i?n.gameStart=i:delete n.gameStart),n.gameClose===d&&(r?n.gameClose=r:delete n.gameClose),e.clear(),t.clear())}}}var Xb=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(f){s(f)}}function u(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Yb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},qb=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Zb=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Jb=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Sv(){var n=new Set,e=!1,t=!1,i=!1,r=function(){var a,s;if(!i){t=document.visibilityState!=="hidden";try{for(var o=Jb(Zb([],qb(n),!1)),u=o.next();!u.done;u=o.next()){var l=u.value;l(t)}}catch(d){a={error:d}}finally{try{u&&!u.done&&(s=o.return)&&s.call(o)}finally{if(a)throw a.error}}}};return{init:function(){return Xb(this,void 0,void 0,function(){return Yb(this,function(a){switch(a.label){case 0:if(i)throw Error("TikTok bridge destroyed");return document.readyState!=="loading"?[3,2]:[4,new Promise(function(s){return document.addEventListener("DOMContentLoaded",function(){return s()},{once:!0})})];case 1:a.sent(),a.label=2;case 2:if(i)throw Error("TikTok bridge destroyed");return document.addEventListener("visibilitychange",r),t=document.visibilityState!=="hidden",e=!0,r(),[2]}})})},isReady:function(){return e&&!i},isVisible:function(){return e&&t&&!i},isClosed:function(){return i},onVisibilityChanged:function(a){return i||n.add(a),function(){return n.delete(a)}},onClosed:function(){return function(){}},openStore:function(){var a,s,o=window,u=typeof o.openAppStore=="function"?o.openAppStore.bind(o):(s=(a=o.playableSDK)===null||a===void 0?void 0:a.openAppStore)===null||s===void 0?void 0:s.bind(o.playableSDK);if(!e||!t||i||!u)throw Error("TikTok store host unavailable");u()},destroy:function(){i=!0,e=!1,t=!1,document.removeEventListener("visibilitychange",r),n.clear()}}}var gt=function(){return gt=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},gt.apply(this,arguments)},$b=function(n,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{l(i.next(d))}catch(f){s(f)}}function u(d){try{l(i.throw(d))}catch(f){s(f)}}function l(d){d.done?a(d.value):r(d.value).then(o,u)}l((i=i.apply(n,e||[])).next())})},Kb=function(n,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,r,a,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=o(0),s.throw=o(1),s.return=o(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(l){return function(d){return u([l,d])}}function u(l){if(i)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(a=l[0]&2?r.return:l[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;switch(r=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){t.label=l[1];break}if(l[0]===6&&t.label<a[1]){t.label=a[1],a=l;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(l);break}a[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],r=0}finally{i=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},De=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,a=[],s;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(o){s={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(s)throw s.error}}return a},Ke=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,a;i<r;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return n.concat(a||Array.prototype.slice.call(e))},Ue=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function wv(n){if(n!=="standalone"){if(n==="unity-ads-ua-playable")return vv();if(n==="applovin-growth-playable")return gv();if(n==="ironsource-levelplay-playable")return yv();if(n==="meta-audience-playable")return xv();if(n==="google-ads-app-playable")return _v();if(n==="mintegral-appgrowth-zip")return Mv();if(n==="tiktok-ads-playable")return Sv();throw Error("E_NATIVE_TARGET")}}function np(n){var e=[{id:"sdk-top-left",left:0,top:0,right:Math.min(48,n.width),bottom:Math.min(48,n.height)},{id:"sdk-top-right",left:Math.max(0,n.width-56),top:0,right:n.width,bottom:Math.min(56,n.height)},{id:"sdk-bottom-left",left:0,top:Math.max(0,n.height-28),right:Math.min(48,n.width),bottom:n.height}];return{left:Math.min(48,n.width),top:Math.min(56,n.height),right:Math.max(0,n.width-56),bottom:Math.max(0,n.height-28),zones:e}}function Bd(n,e){var t,i,r=(i=(t=n.measureText)===null||t===void 0?void 0:t.call(n,e))===null||i===void 0?void 0:i.width,a=/(\d+(?:\.\d+)?)px/.exec(n.font||"");return Number.isFinite(r)?r:Ke([],De(e),!1).length*(a?Number(a[1]):16)*.6}function bv(n,e,t,i){var r,a,s,o,u,l,d;n.font=t.fontWeight+" "+i+"px "+t.fontFamily;var f=Math.max(0,t.width-2*((d=t.padding)!==null&&d!==void 0?d:4)),h=[];try{for(var v=Ue(String(e).split(`
`)),y=v.next();!y.done;y=v.next()){var T=y.value;if(t.wrap===!1){h.push(T);continue}var g=T.trim()?T.trim().split(/\s+/):[""],m=void 0;try{for(var L=(s=void 0,Ue(g)),F=L.next();!F.done;F=L.next()){var _=F.value,p=m?m+" "+_:_;if(Bd(n,p)<=f){m=p;continue}if(m&&h.push(m),Bd(n,_)<=f){m=_;continue}var S="";try{for(var B=(u=void 0,Ue(_)),b=B.next();!b.done;b=B.next()){var I=b.value;S&&Bd(n,S+I)>f?(h.push(S),S=I):S+=I}}catch(z){u={error:z}}finally{try{b&&!b.done&&(l=B.return)&&l.call(B)}finally{if(u)throw u.error}}m=S}}catch(z){s={error:z}}finally{try{F&&!F.done&&(o=L.return)&&o.call(L)}finally{if(s)throw s.error}}h.push(m)}}catch(z){r={error:z}}finally{try{y&&!y.done&&(a=v.return)&&a.call(v)}finally{if(r)throw r.error}}return h}function Tv(n,e,t){var i,r,a=(i=t.padding)!==null&&i!==void 0?i:4,s=Math.max(0,t.width-2*a),o=Math.max(0,t.height-2*a),u=Math.min(t.fontSize,(r=t.minFontSize)!==null&&r!==void 0?r:12),l=t.fontSize,d=bv(n,e,t,l),f,h=function(){var v;n.font=t.fontWeight+" "+l+"px "+t.fontFamily;var y=Math.max.apply(Math,Ke([0],De(d.map(function(L){return Bd(n,L)})),!1)),T=l*((v=t.lineHeight)!==null&&v!==void 0?v:1.2),g=d.length>16;g&&(d=d.slice(0,16));var m=d.length*T;return{lines:d,fontSize:l,scale:l/t.fontSize,renderedWidth:y,renderedHeight:m,availableWidth:s,availableHeight:o,padding:a,lineHeight:T,overflowsWidth:y>s+.01,overflowsHeight:g||m>o+.01,unsupportedChars:[]}};if(f=h(),t.autoFit!==!1)for(;(f.overflowsWidth||f.overflowsHeight)&&l>u;)l=Math.max(u,l-1),d=bv(n,e,t,l),f=h();return f}function Qb(n,e,t){var i=Tv(n,e,t),r=i.padding;n.fillStyle=t.color,n.font=t.fontWeight+" "+i.fontSize+"px "+t.fontFamily,n.textAlign=t.align,n.textBaseline="middle";var a=t.align==="left"?r:t.align==="right"?t.width-r:t.width/2,s=(t.height-i.renderedHeight)/2;return i.lines.forEach(function(o,u){return n.fillText(o,a,s+(u+.5)*i.lineHeight)}),i}function jb(n,e,t){var i,r,a,s,o,u,l=t===void 0?{}:t,d=l.edit,f=d===void 0?!1:d,h=l.sceneId,v=h===void 0?n.base.startScene:h,y=l.onSelect,T=y===void 0?function(){}:y,g=l.network,m=g===void 0?"standalone":g,L=l.review,F=L===void 0?!1:L,_=wv(m),p=e.getContext("2d"),S=new Map(n.components.map(function(c){return[c.id,c]})),B=new Map(n.assets.map(function(c){return[c.id,c]})),b=new Map,I=new Map(n.events.map(function(c){return[c.id,c]})),z=new Map(n.gameplay.filter(function(c){return c.kind==="responsive-layout"}).map(function(c){return[c.componentId,c.parameters]})),U=(a=globalThis.matchMedia)===null||a===void 0?void 0:a.call(globalThis,"(prefers-reduced-motion: reduce)"),Y,E=new Map,M=E;function O(){var c=z.size>0&&e.clientWidth>e.clientHeight;return{width:c?Math.max(n.base.width,n.base.height):n.base.width,height:c?Math.min(n.base.width,n.base.height):n.base.height,landscape:c}}function H(){Y!==O().landscape&&(gr(),ei())}try{for(var ee=Ue(n.assets),j=ee.next();!j.done;j=ee.next()){var K=j.value;if(K.mime.startsWith("image/")){var re=new Image;re.src="data:"+K.mime+";base64,"+K.data,b.set(K.id,re)}}}catch(c){i={error:c}}finally{try{j&&!j.done&&(r=ee.return)&&r.call(ee)}finally{if(i)throw i.error}}var J=v,ne={},Te=[],fe=[],pe=[],Fe=[],ae=new Set,de=new Map,_e=0,Ge=0,$e=0,ut=0,zt=0,ct=!1,Tt=0,Zt=0,wt=!1,bt=[],_t,ln,rt,an,se,mn,nn,W,w,ue=[],ye,we=[],ze=[],Ye,Re=0,Ae=!1,Ne=0,je=m==="standalone",Ve=m==="standalone",qe=m==="standalone",ot=!1,pt=!1,He=new Map,ie=new Map,Oe=new Map,Pe=new Map,nt=new Set,dt=new Map,Be=new Set,Rt=new Map,vt=new Map,cn=new Map,dn=new Map,Fn=new Map,Dn=new Map,vi=0,rr=0,yn,En,Yi=1,en,xt=new Map,ni=new Map,fn=new Map,bi=new Map,qi=new Map,wi=new Map,gi=new Map,Bn=Up(),ar=Bp(),la=new Map,Za=new Map,Ei=Hp(zp(n.projectId)),mr=new Map,sr=new Map,Vr=new Map,D=new Set,le=new Map,he,Me=1,Se=1,ke,et,Je={x:0,y:0},ft,Dt=[],tn=[],$t=new Map,Et=new Map,hn=new Map,Vn=new Map,It,Qt,jt;n.components.some(function(c){return c.contract==="native.stage3d.v1"})&&(jt=av(n,B,function(){pt||Promise.resolve().then(function(){pt||ei()})}));var Le=function(c){var x;return(x=Oe.get(c))!==null&&x!==void 0?x:S.get(c)},An=function(c,x){return n.gameplay.find(function(R){return R.kind===c&&R.componentId===x})},pn=function(){var c,x;vi++,Be.clear(),Rt.clear(),cn.clear(),dn.clear();try{for(var R=Ue(nt),A=R.next();!A.done;A=R.next()){var C=A.value;try{C.stop()}catch{}}}catch(N){c={error:N}}finally{try{A&&!A.done&&(x=R.return)&&x.call(R)}finally{if(c)throw c.error}}nt.clear(),vt.clear()},yi=function(c){var x,R;if(!he||c!==void 0&&he.pointerId!==c)return!1;var A=he.pointerId;he.behavior.parameters.powerVariableId&&(ne[he.behavior.parameters.powerVariableId]=0),he=void 0;try{!((x=e.hasPointerCapture)===null||x===void 0)&&x.call(e,A)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,A))}catch{}return!0},or=function(c){var x,R,A;if(!It||c!==void 0&&It.pointerId!==c)return!1;var C=It.pointerId;It.behavior.parameters.powerVariableId&&(ne[It.behavior.parameters.powerVariableId]=0),(x=jt?.getStage(S.get(It.stageId)))===null||x===void 0||x.setGuide([]),It=void 0;try{!((R=e.hasPointerCapture)===null||R===void 0)&&R.call(e,C)&&((A=e.releasePointerCapture)===null||A===void 0||A.call(e,C))}catch{}return!0},Li=function(c){var x,R;if(!Qt||c!==void 0&&Qt.pointerId!==c)return!1;var A=Qt.pointerId;Qt=void 0;try{!((x=e.hasPointerCapture)===null||x===void 0)&&x.call(e,A)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,A))}catch{}return!0},vr=function(c){var x=c.behavior.parameters;x.axisXVariableId&&(ne[x.axisXVariableId]=c.nx),x.axisYVariableId&&(ne[x.axisYVariableId]=c.ny),x.magnitudeVariableId&&(ne[x.magnitudeVariableId]=c.magnitude),x.angleVariableId&&c.magnitude>0&&(ne[x.angleVariableId]=c.angle)},Mn=function(c,x){var R,A,C,N;x===void 0&&(x=!1);try{for(var P=Ue(le.values()),X=P.next();!X.done;X=P.next()){var k=X.value;if(!(k.pointerId===null||c!==void 0&&k.pointerId!==c)){var Z=k.pointerId;k.pointerId=null,k.nx=0,k.ny=0,k.magnitude=0,k.knobX=k.origin.x,k.knobY=k.origin.y,vr(k);try{!((C=e.hasPointerCapture)===null||C===void 0)&&C.call(e,Z)&&((N=e.releasePointerCapture)===null||N===void 0||N.call(e,Z))}catch{}x&&Jt(pi("joystickEnd",k.c))}}}catch(V){R={error:V}}finally{try{X&&!X.done&&(A=P.return)&&A.call(P)}finally{if(R)throw R.error}}},Yn=function(c,x){var R,A;if(x===void 0&&(x=!0),!rt||c!==void 0&&rt.pointerId!==c)return!1;var C=rt,N=C.pointerId;if(rt=void 0,et=void 0,x){var P=Le(C.targetId);P&&C.b.parameters.snapBack&&(ua(P,C.origin.x,C.origin.y),C.originZone&&Bn.place(P.id,C.originZone))}try{!((R=e.hasPointerCapture)===null||R===void 0)&&R.call(e,N)&&((A=e.releasePointerCapture)===null||A===void 0||A.call(e,N))}catch{}return!0},Zi=function(c){var x,R;ye?.pointerId===c.pointerId&&(ye=void 0);try{for(var A=Ue(Fn.values()),C=A.next();!C.done;C=A.next()){var N=C.value;N.pointerId===c.pointerId&&N.held&&(N.held=!1,N.releasedAt=_e)}}catch(X){x={error:X}}finally{try{C&&!C.done&&(R=A.return)&&R.call(A)}finally{if(x)throw x.error}}var P=Yn(c.pointerId);return mn===c.pointerId?(se=void 0,mn=void 0,!0):P},kn=function(c){var x,R,A,C,N,P,X,k;if(c){rt&&((X=Oe.get(rt.targetId))===null||X===void 0?void 0:X.instanceId)===c&&Yn(void 0,!1),he&&((k=Oe.get(he.targetId))===null||k===void 0?void 0:k.instanceId)===c&&yi();var Z=[];Bn.release(c),ar.cancel(c),mr.delete(c),Vr.delete(c),Ei.remove(c),Te=Te.filter(function(be){return be.id!==c});try{for(var V=Ue(Oe),$=V.next();!$.done;$=V.next()){var q=De($.value,2),Q=q[0],te=q[1];if(te.instanceId===c){Z.push(Q),Bn.release(Q),ar.cancel(Q),Oe.delete(Q),He.delete(Q),Pe.delete(Q),fn.delete(Q),qi.delete(Q),wi.delete(Q);try{for(var G=(A=void 0,Ue(bi.values())),ce=G.next();!ce.done;ce=G.next()){var me=ce.value;me.removeAgent(Q)}}catch(be){A={error:be}}finally{try{ce&&!ce.done&&(C=G.return)&&C.call(G)}finally{if(A)throw A.error}}try{for(var ve=(N=void 0,Ue(ie.keys())),xe=ve.next();!xe.done;xe=ve.next()){var oe=xe.value;oe.endsWith(":"+Q)&&ie.delete(oe)}}catch(be){N={error:be}}finally{try{xe&&!xe.done&&(P=ve.return)&&P.call(ve)}finally{if(N)throw N.error}}}}}catch(be){x={error:be}}finally{try{$&&!$.done&&(R=V.return)&&R.call(V)}finally{if(x)throw x.error}}pe=pe.filter(function(be){return!Z.includes(be.targetId)})}},ki=function(c){for(;c;){if(c.prototype)return c.id;c=Le(c.parentId)}},ca=function(){var c,x,R;return{viewport:O(),components:Object.fromEntries(Ke([],De(He),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,gt(gt({},P),{parameters:gt({},P.parameters)})]})),mode:f?"edit":"play",scene:J,variables:gt({},ne),time:_e,instances:Te.map(function(A){return gt({id:A.id,prototypeId:A.prototypeId,x:A.transform[4],y:A.transform[5]},Ei.snapshot(A.id))}),particles:fe.length,animations:pe.length,contacts:ae.size,spriteFrames:Object.fromEntries(Ke([],De(Pe),!1).map(function(A){var C,N=De(A,2),P=N[0],X=N[1];return[P,(C=X.frame)!==null&&C!==void 0?C:0]})),input:{dragging:!!rt,pointerId:(x=(c=rt?.pointerId)!==null&&c!==void 0?c:ke?.pointerId)!==null&&x!==void 0?x:null,pressed:se??null,holding:!!ke?.holds.length,occupancy:Bn.snapshot(),joysticks:Object.fromEntries(Ke([],De(le),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,{active:P.pointerId!==null,x:P.nx,y:P.ny,magnitude:P.magnitude,angle:P.angle}]}))},feedback:{presses:Fn.size,floatingTexts:we.length,flashes:ze.length,shaking:!!Ye,tutorialHands:Ne},match:{boards:Object.fromEntries(Ke([],De(xt),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,P.snapshot()]})),selected:yn??null,cells:Ke([],De(Dn),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return gt({id:N},P)})},physics:Cv(),physics3d:Nv(),paths:Object.fromEntries(Ke([],De(bi),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,P.snapshot()]})),canvas:{masks:Object.fromEntries(Ke([],De(mr),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,{progress:P.progress}]})),strokes:Object.fromEntries(Ke([],De(sr),!1).map(function(A){var C=De(A,2),N=C[0],P=C[1];return[N,P.strokes.length]})),walls:Dt.length,joints:tn.filter(function(A){return!A.broken}).length},audio:{state:(R=_t?.state)!==null&&R!==void 0?R:"locked",voices:nt.size,blocked:rr},network:{target:m,ready:Ve,visible:qe,started:je,closed:ot,hostVolume:Yi},diagnostics:Ke([],De(bt),!1)}},lr=function(){return!f&&!ct&&!document.hidden&&Ve&&qe&&je&&!ot},gr=function(){var c,x,R,A;ye=void 0,yi(),or(),Li(),Mn(),Yn(),ke=void 0,et=void 0,ft=void 0;try{for(var C=Ue(sr.values()),N=C.next();!N.done;N=C.next()){var P=N.value;P.cancel()}}catch(V){c={error:V}}finally{try{N&&!N.done&&(x=C.return)&&x.call(C)}finally{if(c)throw c.error}}ar.clear(),En=void 0;try{for(var X=Ue(xt.values()),k=X.next();!k.done;k=X.next()){var Z=k.value;Z.cancelSelection()}}catch(V){R={error:V}}finally{try{k&&!k.done&&(A=X.return)&&A.call(X)}finally{if(R)throw R.error}}xt.size&&(yn=void 0),se=void 0,mn=void 0,Fn.clear()},Ai=function(c){wt=!0,bt.push(c),bt=bt.slice(-16),Fe=[]},Vt=function(c){var x,R,A;return gt(gt(gt({},c.parameters),c.prototypeId?(x=He.get(c.prototypeId))===null||x===void 0?void 0:x.parameters:{}),(A=He.get((R=c.runtimeId)!==null&&R!==void 0?R:c.id))===null||A===void 0?void 0:A.parameters)};function Sn(c,x){var R,A=Fn.get(c.id);if(!A||U?.matches)return x;var C=Ke([],De(x),!1),N=A.held?0:_e-((R=A.releasedAt)!==null&&R!==void 0?R:_e),P=A.held?0:Math.min(1,N/A.behavior.springBackSeconds),X=A.held?A.behavior.scaleDown:A.behavior.scaleDown+(1-A.behavior.scaleDown)*(1-Math.pow(1-P,3)),k=Vt(c);C[4]+=(1-X)*(C[0]*k.width+C[2]*k.height)/2,C[5]+=(1-X)*(C[1]*k.width+C[3]*k.height)/2;for(var Z=0;Z<4;Z++)C[Z]*=X;return C}function Di(c){var x,R,A,C,N,P,X,k=c.transform,Z=(A=(R=He.get((x=c.runtimeId)!==null&&x!==void 0?x:c.id))===null||R===void 0?void 0:R.transform)!==null&&A!==void 0?A:k,V=z.get((C=c.prototypeId)!==null&&C!==void 0?C:c.id);if(!V)return Sn(c,Z);var $=O(),q=Ke([],De(Z),!1);$.landscape&&(q[4]+=V.x-k[4],q[5]+=V.y-k[5],q[0]*=V.scaleX,q[1]*=V.scaleX,q[2]*=V.scaleY,q[3]*=V.scaleY);var Q=(N=V.anchor)!==null&&N!==void 0?N:"none";if(Q==="none"&&!V.respectSafeArea)return Sn(c,q);var te=V.respectSafeArea?np($):{left:0,top:0,right:$.width,bottom:$.height},G=Vt(c),ce=(P=V.marginX)!==null&&P!==void 0?P:0,me=(X=V.marginY)!==null&&X!==void 0?X:0,ve=Math.abs(q[0])*G.width+Math.abs(q[2])*G.height,xe=Math.abs(q[1])*G.width+Math.abs(q[3])*G.height;return Q!=="none"?(q[4]=Q.endsWith("left")?te.left+ce:Q.endsWith("right")?te.right-ve-ce:(te.left+te.right-ve)/2,q[5]=Q.startsWith("top")?te.top+me:Q.startsWith("bottom")?te.bottom-xe-me:(te.top+te.bottom-xe)/2):(q[4]=Math.max(te.left+ce,Math.min(te.right-ve-ce,q[4])),q[5]=Math.max(te.top+me,Math.min(te.bottom-xe-me,q[5]))),Sn(c,q)}var yr=function(c){return(Oe.has(c)?Ke([],De(Oe.values()),!1):Ke(Ke([],De(n.components),!1),De(Te),!1)).filter(function(x){return x.parentId===c&&!x.prototype}).sort(function(x,R){return x.order-R.order||(x.id<R.id?-1:x.id>R.id?1:0)})},Pa=function(){return n.components.filter(function(c){return c.sceneId===J&&!c.parentId&&!c.prototype}).sort(function(c,x){return c.order-x.order||(c.id<x.id?-1:c.id>x.id?1:0)})},Jt=function(c){var x,R;if(c.kind==="sceneEnter"&&((x=n.scenes.find(function(A){return A.id===c.sceneId}))===null||x===void 0?void 0:x.role)==="end-card"&&en!==c.sceneId&&(en=c.sceneId,(R=_?.notifyGameEnd)===null||R===void 0||R.call(_)),Fe.length>=256){Ai("Event queue budget exhausted");return}Fe.push(c)},pi=function(c,x,R,A){var C,N,P,X;return A===void 0&&(A={}),gt(gt({kind:c,componentId:(C=x.prototypeId)!==null&&C!==void 0?C:x.id,selfInstanceId:(N=x.instanceId)!==null&&N!==void 0?N:x.id,instanceId:x.instanceId},R?{otherId:(P=R.prototypeId)!==null&&P!==void 0?P:R.id,otherInstanceId:(X=R.instanceId)!==null&&X!==void 0?X:R.id}:{}),A)};function $r(c){for(var x,R=c;R;R=Le(R.parentId)){var A=Ei.states.get((x=R.instanceId)!==null&&x!==void 0?x:R.id);if(A)return A}}function Ms(c){var x,R,A=An("instance-state",(x=c.prototypeId)!==null&&x!==void 0?x:c.id);return A?Ei.initialize((R=c.instanceId)!==null&&R!==void 0?R:c.id,A.parameters):void 0}function Oo(){var c,x,R,A;try{for(var C=Ue(n.gameplay.filter(function(V){return V.kind==="instance-state"})),N=C.next();!N.done;N=C.next()){var P=N.value;try{for(var X=(R=void 0,Ue(ci(S.get(P.componentId)))),k=X.next();!k.done;k=X.next()){var Z=k.value;Ms(Z)}}catch(V){R={error:V}}finally{try{k&&!k.done&&(A=X.return)&&A.call(X)}finally{if(R)throw R.error}}}}catch(V){c={error:V}}finally{try{N&&!N.done&&(x=C.return)&&x.call(C)}finally{if(c)throw c.error}}}function Bo(c,x,R,A){var C=$r(c);if(C){var N=C.hp;if(x==="tag")C.tag=R==="set"?String(A):C.tag;else{var P=Number(A);if(C[x]=R==="add"?C[x]+P:R==="sub"?C[x]-P:P,!Number.isFinite(C[x])){Ai("Instance state range exceeded");return}x==="hp"&&(C.hp=Math.max(0,Math.min(C.maxHp,C.hp)))}N>0&&C.hp<=0&&Jt(pi("instanceDepleted",c))}}function Ja(c,x){var R,A,C;if(!c)return!0;if(c.all)return c.all.every(function(Z){return Ja(Z,x)});if(c.any)return c.any.some(function(Z){return Ja(Z,x)});var N=c.instanceTarget==="other"?x?.otherInstanceId:(R=x?.selfInstanceId)!==null&&R!==void 0?R:x?.instanceId,P=c.instanceField?(A=Le(N))!==null&&A!==void 0?A:Ke([],De(Oe.values()),!1).find(function(Z){return Z.instanceId===N}):void 0,X=c.instanceField?(C=$r(P))===null||C===void 0?void 0:C[c.instanceField]:ne[c.variableId],k=c.compareVariableId?ne[c.compareVariableId]:c.value;return{eq:function(){return X===k},ne:function(){return X!==k},lt:function(){return X<k},lte:function(){return X<=k},gt:function(){return X>k},gte:function(){return X>=k}}[c.op]()}function ko(c){var x,R,A;yn=void 0,En=void 0,c||Dn.clear();try{for(var C=Ue(n.gameplay),N=C.next();!N.done;N=C.next()){var P=N.value;if(P.kind==="match-tile"){var X=S.get(P.componentId);if(c&&X.id!==c&&!Rr(X,c))continue;He.delete(X.id),Dn.set(X.id,{row:P.parameters.row,column:P.parameters.column,group:P.parameters.group,sceneId:X.sceneId,boardId:(A=X.parentId)!==null&&A!==void 0?A:X.sceneId})}}}catch(k){x={error:k}}finally{try{N&&!N.done&&(R=C.return)&&R.call(C)}finally{if(x)throw x.error}}}function kd(){var c,x,R=function(P){var X,k;if(xt.has(P.componentId))return"continue";var Z=P.componentId,V=P.parameters,$=n.gameplay.filter(function(oe){return oe.kind==="match-tile"&&S.get(oe.componentId).parentId===Z}).sort(function(oe,be){return oe.parameters.row-be.parameters.row||oe.parameters.column-be.parameters.column}).map(function(oe){return gt({id:oe.componentId},oe.parameters)}),q=new Map;try{for(var Q=(X=void 0,Ue($)),te=Q.next();!te.done;te=Q.next()){var G=te.value;if(!q.has(G.group)){var ce=S.get(G.id);q.set(G.group,{fill:ce.parameters.fill,children:yr(G.id).filter(function(oe){return["native.image.v1","native.text.v1"].includes(oe.contract)})})}}}catch(oe){X={error:oe}}finally{try{te&&!te.done&&(k=Q.return)&&k.call(Q)}finally{if(X)throw X.error}}ni.set(Z,q);var me=S.get($[V.columns].id).transform[5]-S.get($[0].id).transform[5],ve=function(oe,be,Ee){var Ie,Ze=Ee.from,lt=Ze===void 0?oe:Ze,Xe=Ee.progress,ht=Xe===void 0?0:Xe,yt=Ee.offsetRows,Gt=yt===void 0?0:yt,Ut=Ee.scale,at=Ut===void 0?1:Ut,Wt=Ee.opacity,Mt=Wt===void 0?1:Wt,mt=$[oe],Qe=S.get(mt.id),st=S.get($[lt].id),We=q.get(be),tt=Ke([],De(Qe.transform),!1);tt[4]+=(st.transform[4]-Qe.transform[4])*ht,tt[5]+=(st.transform[5]-Qe.transform[5]+Gt*me)*ht,tt[4]+=(1-at)*(tt[0]*Qe.parameters.width+tt[2]*Qe.parameters.height)/2,tt[5]+=(1-at)*(tt[1]*Qe.parameters.width+tt[3]*Qe.parameters.height)/2;for(var St=0;St<4;St++)tt[St]*=at;He.set(mt.id,gt(gt({},He.get(mt.id)),{transform:tt,parameters:gt(gt({},(Ie=He.get(mt.id))===null||Ie===void 0?void 0:Ie.parameters),{fill:We.fill,opacity:Mt})})),Dn.get(mt.id).group=be;var Ct=yr(mt.id).filter(function(Pt){return["native.image.v1","native.text.v1"].includes(Pt.contract)});Ct.forEach(function(Pt,Nt){var Yt,Bt,it=We.children[Nt];if(!(!it||it.contract!==Pt.contract)){var Ft=(Yt=He.get(Pt.id))!==null&&Yt!==void 0?Yt:{transform:Ke([],De(Pt.transform),!1),parameters:{}};Pt.contract==="native.image.v1"?Ft.assetId=(Bt=it.assetSlots[0])===null||Bt===void 0?void 0:Bt.assetId:Ft.parameters.text=it.parameters.text,He.set(Pt.id,Ft)}})},xe=Lp(gt(gt({},V),{slots:$,paint:ve,onEvent:function(oe){yn=void 0,Jt({kind:oe,componentId:Z})}}));xt.set(Z,xe)};try{for(var A=Ue(n.gameplay.filter(function(P){return P.kind==="match-board"})),C=A.next();!C.done;C=A.next()){var N=C.value;R(N)}}catch(P){c={error:P}}finally{try{C&&!C.done&&(x=A.return)&&x.call(A)}finally{if(c)throw c.error}}}function rc(c){var x,R;kd();try{for(var A=Ue(xt),C=A.next();!C.done;C=A.next()){var N=De(C.value,2),P=N[0],X=N[1];(!c||c===P||Rr(S.get(P),c))&&X.reset()}}catch(k){x={error:k}}finally{try{C&&!C.done&&(R=A.return)&&R.call(A)}finally{if(x)throw x.error}}}function ci(c){return ki(c)?Ke([],De(Oe.values()),!1).filter(function(x){return x.prototypeId===c.id}):[c]}function xi(c){var x=Vt(c);return In(zn(c),x.width/2,x.height/2)}function Ss(c,x,R){var A;R===void 0&&(R="self");var C=S.get(c),N=R==="other"?x.otherInstanceId:(A=x.selfInstanceId)!==null&&A!==void 0?A:x.instanceId,P=!!(C&&ki(C));if(N!==void 0){if(c){var X=Ke([],De(Oe.values()),!1).find(function(k){return k.prototypeId===c&&(k.instanceId===N||k.id===N)});if(X)return X}if(R==="other"||!c)return Le(N);if(P&&typeof N=="string"&&N.startsWith("instance."))return}return C?P?ci(C)[0]:Le(c):void 0}function ua(c,x,R){var A,C=Vt(c),N=(A=He.get(c.id))!==null&&A!==void 0?A:{transform:Ke([],De(c.transform),!1),parameters:{}},P=Ke([],De(N.transform),!1),X=c.parentId?zn(Le(c.parentId)):ga(),k=In(wr(X),x,R);P[4]=k.x-(P[0]*C.width+P[2]*C.height)/2,P[5]=k.y-(P[1]*C.width+P[3]*C.height)/2,He.set(c.id,gt(gt({},N),{transform:P})),c.prototypeId&&(c.transform=Ke([],De(P),!1))}function Gs(c,x,R){var A,C,N,P;R===void 0&&(R=!1);var X=(A=He.get(c.id))!==null&&A!==void 0?A:{transform:Ke([],De(c.transform),!1),parameters:{}},k=(P=(N=S.get((C=c.prototypeId)!==null&&C!==void 0?C:c.id))===null||N===void 0?void 0:N.transform)!==null&&P!==void 0?P:c.transform,Z=Math.hypot(k[0],k[1])*(R?-1:1),V=Math.hypot(k[2],k[3]),$=x+(R?0:Math.atan2(k[1],k[0])),q=Math.cos($),Q=Math.sin($),te=Ke([],De(X.transform),!1);te[0]=q*Z,te[1]=Q*Z,te[2]=-Q*V,te[3]=q*V,He.set(c.id,gt(gt({},X),{transform:te}))}function $a(c,x){var R=fn.get(c.id);if(R)return R;var A=zn(c),C=Vt(c),N=In(A,C.width/2,C.height/2);return R=gt({id:c.id,sourceId:x.componentId,instanceId:c.instanceId,x:N.x,y:N.y,vx:0,vy:0,width:Math.hypot(A[0],A[1])*C.width,height:Math.hypot(A[2],A[3])*C.height,angle:Math.atan2(A[1],A[0]),restElapsed:0,atRest:!0},x.parameters),fn.set(c.id,R),R}function zo(c,x){var R,A=mr.get(c.id);if(A)return A;var C=Vt(c),N=x.parameters;return A=Wp(N,{width:C.width,height:C.height,source:c.contract==="native.image.v1"?b.get((R=c.assetSlots[0])===null||R===void 0?void 0:R.assetId):void 0,onProgress:function(P){N.progressVariableId&&(ne[N.progressVariableId]=P),Jt(pi("maskProgress",c))},onComplete:function(){return Jt(pi("maskComplete",c))}}),mr.set(c.id,A),A}function Ev(c){var x=sr.get(c.componentId);return x||(x=qp(c.parameters),sr.set(c.componentId,x)),x}function ip(){var c,x,R,A,C,N,P,X,k,Z,V,$,q=new Set,Q=[];try{for(var te=Ue(n.gameplay.filter(function(tt){return tt.kind==="physics-body"})),G=te.next();!G.done;G=te.next()){var ce=G.value,me=S.get(ce.componentId);if(me.sceneId===J)try{for(var ve=(R=void 0,Ue(ci(me))),xe=ve.next();!xe.done;xe=ve.next()){var oe=xe.value;if(ii(oe)){if(Q.length>=64){Ai("Physics body budget exhausted");break}var be=$a(oe,ce),Ee=zn(oe),Ie=Vt(oe),Ze=In(Ee,Ie.width/2,Ie.height/2);if(q.add(oe.id),be.width=Math.hypot(Ee[0],Ee[1])*Ie.width,be.height=Math.hypot(Ee[2],Ee[3])*Ie.height,be.mode!=="dynamic"){var lt=qi.get(oe.id),Xe=oe.parentId?zn(Le(oe.parentId)):ga(),ht=(V=lt?.vx)!==null&&V!==void 0?V:0,yt=($=lt?.vy)!==null&&$!==void 0?$:0;be.x=Ze.x,be.y=Ze.y,be.angle=Math.atan2(Ee[1],Ee[0]),be.vx=Xe[0]*ht+Xe[2]*yt,be.vy=Xe[1]*ht+Xe[3]*yt}else be.atRest&&(be.x=Ze.x,be.y=Ze.y);Q.push(be)}}}catch(tt){R={error:tt}}finally{try{xe&&!xe.done&&(A=ve.return)&&A.call(ve)}finally{if(R)throw R.error}}}}catch(tt){c={error:tt}}finally{try{G&&!G.done&&(x=te.return)&&x.call(te)}finally{if(c)throw c.error}}try{for(var Gt=Ue(fn.keys()),Ut=Gt.next();!Ut.done;Ut=Gt.next()){var at=Ut.value;!q.has(at)&&!Oe.has(at)&&fn.delete(at)}}catch(tt){C={error:tt}}finally{try{Ut&&!Ut.done&&(N=Gt.return)&&N.call(Gt)}finally{if(C)throw C.error}}var Wt=[];try{for(var Mt=Ue(n.gameplay.filter(function(tt){return tt.kind==="capture-zone"})),mt=Mt.next();!mt.done;mt=Mt.next()){var ce=mt.value,me=S.get(ce.componentId);if(me.sceneId===J)try{for(var Qe=(k=void 0,Ue(ci(me))),st=Qe.next();!st.done;st=Qe.next()){var oe=st.value;if(ii(oe)){var Ee=zn(oe),Ie=Vt(oe),Ze=In(Ee,Ie.width/2,Ie.height/2),We=Math.max(.1,Math.min(Math.hypot(Ee[0],Ee[1]),Math.hypot(Ee[2],Ee[3])));Wt.push(gt(gt({id:oe.id,sourceId:me.id,instanceId:oe.instanceId,x:Ze.x,y:Ze.y},ce.parameters),{radius:ce.parameters.radius*We}))}}}catch(Ct){k={error:Ct}}finally{try{st&&!st.done&&(Z=Qe.return)&&Z.call(Qe)}finally{if(k)throw k.error}}}}catch(tt){P={error:tt}}finally{try{mt&&!mt.done&&(X=Mt.return)&&X.call(Mt)}finally{if(P)throw P.error}}return{bodies:Ke(Ke([],De(Q),!1),De(Dt),!1),zones:Wt}}function Av(c){var x,R,A,C,N,P,X,k=ip(),Z=k.bodies,V=k.zones,$=O();tn=[];try{for(var q=Ue(n.gameplay.filter(function(Xe){return Xe.kind==="physics-joint"})),Q=q.next();!Q.done;Q=q.next()){var te=Q.value,G=S.get(te.componentId);if(G.sceneId===J){var ce=Le(te.parameters.anchorComponentId),me=An("physics-body",G.id);if(!(!ce||!me))try{for(var ve=(A=void 0,Ue(ci(G))),xe=ve.next();!xe.done;xe=ve.next()){var oe=xe.value;$a(oe,me);var be=xi(ce),Ee=te.id+":"+oe.id;tn.push(gt(gt({},te.parameters),{id:te.id,key:Ee,componentId:G.id,bodyId:oe.id,anchorId:ce.id,x:be.x,y:be.y,broken:D.has(Ee)}))}}catch(Xe){A={error:Xe}}finally{try{xe&&!xe.done&&(C=ve.return)&&C.call(ve)}finally{if(A)throw A.error}}}}}catch(Xe){x={error:Xe}}finally{try{Q&&!Q.done&&(R=q.return)&&R.call(q)}finally{if(x)throw x.error}}ff({bodies:Z,zones:V,joints:tn,bounds:{left:0,top:0,right:$.width,bottom:$.height},dt:c,onEvent:function(Xe,ht,yt){var Gt,Ut,at,Wt;if(!(Xe==="bodyBounce"&&yt&&ht.sourceId===yt.sourceId&&ht.id>yt.id)){var Mt=(Gt=ht.instanceId)!==null&&Gt!==void 0?Gt:ht.id,mt=yt?(Ut=yt.instanceId)!==null&&Ut!==void 0?Ut:yt.id:void 0,Qe=gt(gt({kind:Xe,componentId:ht.sourceId,selfInstanceId:Mt},mt?{otherInstanceId:mt}:{}),{instanceId:(at=ht.instanceId)!==null&&at!==void 0?at:yt?.instanceId});if(yt&&(Qe.otherId=yt.sourceId),Jt(Qe),Xe==="zoneCapture"){var st=Le(ht.id),We=S.get(yt.sourceId);if(yt.hideCaptured&&st){var tt=(Wt=He.get(st.id))!==null&&Wt!==void 0?Wt:{transform:Ke([],De(st.transform),!1),parameters:{}};tt.parameters.visible=!1,He.set(st.id,tt)}yt.stopBody&&We&&st&&ua(st,yt.x,yt.y)}}}});try{for(var Ie=Ue(Z),Ze=Ie.next();!Ze.done;Ze=Ie.next()){var lt=Ze.value,oe=Le(lt.id);!oe||lt.mode!=="dynamic"||(lt.spinToRotation&&Gs(oe,(X=lt.angle)!==null&&X!==void 0?X:0),ua(oe,lt.x,lt.y))}}catch(Xe){N={error:Xe}}finally{try{Ze&&!Ze.done&&(P=Ie.return)&&P.call(Ie)}finally{if(N)throw N.error}}}function Iv(){var c,x,R,A,C;try{for(var N=Ue(n.gameplay.filter(function(xe){return xe.kind==="oscillate"})),P=N.next();!P.done;P=N.next()){var X=P.value,k=S.get(X.componentId);if(k.sceneId===J)try{for(var Z=(R=void 0,Ue(ci(k))),V=Z.next();!V.done;V=Z.next()){var $=V.value,q=qi.get($.id);q||(q={base:Ke([],De(Di($)),!1),vx:0,vy:0},qi.set($.id,q));var Q=X.parameters,te=(_e/Q.periodSeconds+Q.phase)*Math.PI*2,G=Math.sin(te)*Q.amplitude,ce=Math.cos(te)*Q.amplitude*Math.PI*2/Q.periodSeconds,me=(C=He.get($.id))!==null&&C!==void 0?C:{parameters:{}},ve=Ke([],De(q.base),!1);Q.axis==="x"?(ve[4]+=G,q.vx=ce,q.vy=0):(ve[5]+=G,q.vy=ce,q.vx=0),He.set($.id,gt(gt({},me),{transform:ve})),qi.set($.id,q)}}catch(xe){R={error:xe}}finally{try{V&&!V.done&&(A=Z.return)&&A.call(Z)}finally{if(R)throw R.error}}}}catch(xe){c={error:xe}}finally{try{P&&!P.done&&(x=N.return)&&x.call(N)}finally{if(c)throw c.error}}}function rp(){var c,x;bi.clear();var R=function(P){var X=n.gameplay.filter(function(Z){return Z.kind==="path-gate"&&Z.parameters.networkBehaviorId===P.id}),k=ov({id:P.id,nodes:P.parameters.nodes,edges:P.parameters.edges,gates:X,onEvent:function(Z,V){var $,q=Le(V.componentId),Q=($=q?.prototypeId)!==null&&$!==void 0?$:V.componentId;Jt(gt({kind:Z,componentId:Q,instanceId:q?.instanceId},V.nodeId?{nodeId:V.nodeId}:{}))}});bi.set(P.id,k)};try{for(var A=Ue(n.gameplay.filter(function(P){return P.kind==="path-network"})),C=A.next();!C.done;C=A.next()){var N=C.value;R(N)}}catch(P){c={error:P}}finally{try{C&&!C.done&&(x=A.return)&&x.call(A)}finally{if(c)throw c.error}}}function ac(c,x){var R,A,C,N,P,X,k,Z,V,$,q,Q,te;x===void 0&&(x=!0);var G=0;try{for(var ce=Ue(n.gameplay.filter(function(tt){return tt.kind==="path-agent"})),me=ce.next();!me.done;me=ce.next()){var ve=me.value,xe=S.get(ve.componentId),oe=bi.get(ve.parameters.networkBehaviorId);if(!(xe.sceneId!==J||!oe))try{for(var be=(C=void 0,Ue(ci(xe))),Ee=be.next();!Ee.done;Ee=be.next()){var Ie=Ee.value;if(++G>64){Ai("Path agent budget exhausted");break}var Ze=oe.getAgent(Ie.id);Ze||(Ze=oe.addAgent(gt(gt({},ve.parameters),{id:Ie.id,startNode:(q=Ie.pathStartNode)!==null&&q!==void 0?q:ve.parameters.startNode,targetNode:(Q=Ie.pathTargetNode)!==null&&Q!==void 0?Q:ve.parameters.targetNode}))),Ze.speedMultiplier=Math.max(0,Number(ve.parameters.speedMultiplierVariableId?ne[ve.parameters.speedMultiplierVariableId]:1))}}catch(tt){C={error:tt}}finally{try{Ee&&!Ee.done&&(N=be.return)&&N.call(be)}finally{if(C)throw C.error}}}}catch(tt){R={error:tt}}finally{try{me&&!me.done&&(A=ce.return)&&A.call(ce)}finally{if(R)throw R.error}}if(x){var lt=function(tt,St){var Ct=n.gameplay.find(function(Pt){return Pt.id===tt});S.get(Ct.componentId).sceneId===J&&St.tick(c)};try{for(var Xe=Ue(bi),ht=Xe.next();!ht.done;ht=Xe.next()){var yt=De(ht.value,2),Gt=yt[0],Ut=yt[1];lt(Gt,Ut)}}catch(tt){P={error:tt}}finally{try{ht&&!ht.done&&(X=Xe.return)&&X.call(Xe)}finally{if(P)throw P.error}}}try{for(var at=Ue(n.gameplay.filter(function(tt){return tt.kind==="path-agent"})),Wt=at.next();!Wt.done;Wt=at.next()){var ve=Wt.value,xe=S.get(ve.componentId),Mt=bi.get(ve.parameters.networkBehaviorId);if(!(xe.sceneId!==J||!Mt))try{for(var mt=(V=void 0,Ue(ci(xe))),Qe=mt.next();!Qe.done;Qe=mt.next()){var Ie=Qe.value,Ze=Mt.getAgent(Ie.id);if(Ze){if(Ze.orientToPath==="rotate")Gs(Ie,Ze.heading);else if(Ze.orientToPath==="flip-x")Gs(Ie,0,Ze.flipX);else if(Ze.orientToPath==="iso-4"){var st=(te=He.get(Ie.id))!==null&&te!==void 0?te:{transform:Ke([],De(Ie.transform),!1),parameters:{}};st.pathFrame=Ze.frame,He.set(Ie.id,st)}var We=Ie.parentId?In(zn(Le(Ie.parentId)),Ze.x,Ze.y):Ze;ua(Ie,We.x,We.y)}}}catch(Ct){V={error:Ct}}finally{try{Qe&&!Qe.done&&($=mt.return)&&$.call(mt)}finally{if(V)throw V.error}}}}catch(tt){k={error:tt}}finally{try{Wt&&!Wt.done&&(Z=at.return)&&Z.call(at)}finally{if(k)throw k.error}}}function zd(c){var x,R,A,C,N,P,X,k,Z,V,$=new Set;try{for(var q=Ue(n.gameplay.filter(function(Ft){return Ft.kind==="value-meter"})),Q=q.next();!Q.done;Q=q.next()){var te=Q.value,G=S.get(te.componentId);if(G.sceneId===J)try{for(var ce=(A=void 0,Ue(ci(G))),me=ce.next();!me.done;me=ce.next()){var ve=me.value,xe=te.parameters,oe=xe.instanceField?$r(ve):void 0,be=xe.instanceField==="hp"&&oe?oe.hp/oe.maxHp*(xe.max-xe.min)+xe.min:xe.instanceField==="value"&&oe?oe.value:Number(ne[xe.variableId]),Ee=wi.get(ve.id);Ee||(Ee={base:Ke([],De(Di(ve)),!1),value:Number.isFinite(be)?Math.max(xe.min,Math.min(xe.max,be)):xe.min},wi.set(ve.id,Ee)),$.add(ve.id);var Ie=Math.max(xe.min,Math.min(xe.max,be)),Ze=xe.smoothingSeconds?1-Math.exp(-c/xe.smoothingSeconds):1;Ee.value+=((Number.isFinite(Ie)?Ie:xe.min)-Ee.value)*Ze;var lt=Math.max(0,Math.min(1,(Ee.value-xe.min)/(xe.max-xe.min))),Xe=Ke([],De(Ee.base),!1),ht=(Z=He.get(ve.id))!==null&&Z!==void 0?Z:{parameters:{}},yt=xe.axis==="x"?Vt(ve).width:Vt(ve).height;if(xe.axis==="x"?(Xe[0]*=lt,Xe[1]*=lt):(Xe[2]*=lt,Xe[3]*=lt),xe.direction==="negative"){var Gt=yt*(1-lt);xe.axis==="x"?(Xe[4]+=Ee.base[0]*Gt,Xe[5]+=Ee.base[1]*Gt):(Xe[4]+=Ee.base[2]*Gt,Xe[5]+=Ee.base[3]*Gt)}He.set(ve.id,gt(gt({},ht),{transform:Xe}))}}catch(Ft){A={error:Ft}}finally{try{me&&!me.done&&(C=ce.return)&&C.call(ce)}finally{if(A)throw A.error}}}}catch(Ft){x={error:Ft}}finally{try{Q&&!Q.done&&(R=q.return)&&R.call(q)}finally{if(x)throw x.error}}try{for(var Ut=Ue(wi.keys()),at=Ut.next();!at.done;at=Ut.next()){var Wt=at.value;$.has(Wt)||wi.delete(Wt)}}catch(Ft){N={error:Ft}}finally{try{at&&!at.done&&(P=Ut.return)&&P.call(Ut)}finally{if(N)throw N.error}}try{for(var Mt=Ue(n.gameplay.filter(function(Ft){return Ft.kind==="camera-follow"})),mt=Mt.next();!mt.done;mt=Mt.next()){var te=mt.value,Qe=S.get(te.componentId),Ie=Le(te.parameters.targetId);if(!(Qe.sceneId!==J||!Ie)){var st=gi.get(Qe.id);st||(st={base:Ke([],De(Qe.transform),!1),x:te.parameters.minX,y:te.parameters.minY},gi.set(Qe.id,st));var We=function(Rn,Hn){for(var si=[],ai=Rn;ai&&ai.id!==Hn.id;ai=Le(ai.parentId))si.unshift(ai);return si.reduce(function(qn,Kr){return qs(qn,Di(Kr))},ga())},Xe=Rr(Ie,Qe.id)?We(Ie,Qe):zn(Ie),xe=Vt(Ie),tt=In(Xe,xe.width/2,xe.height/2),St=O(),Ct=te.parameters,Pt=Math.max(Ct.minX,Ct.maxX-St.width/Ct.zoom),Nt=Math.max(Ct.minY,Ct.maxY-St.height/Ct.zoom),Yt=Math.max(Ct.minX,Math.min(Pt,tt.x-St.width/(2*Ct.zoom))),Bt=Math.max(Ct.minY,Math.min(Nt,tt.y-St.height/(2*Ct.zoom))),Ze=1-Math.exp(-Ct.smoothing*c);st.x+=(Yt-st.x)*Ze,st.y+=(Bt-st.y)*Ze;var ht=(V=He.get(Qe.id))!==null&&V!==void 0?V:{parameters:{}},it=Ke([],De(st.base),!1);it[0]*=Ct.zoom,it[1]*=Ct.zoom,it[2]*=Ct.zoom,it[3]*=Ct.zoom,it[4]-=st.x*Ct.zoom,it[5]-=st.y*Ct.zoom,He.set(Qe.id,gt(gt({},ht),{transform:it}))}}}catch(Ft){X={error:Ft}}finally{try{mt&&!mt.done&&(k=Mt.return)&&k.call(Mt)}finally{if(X)throw X.error}}}function Cv(){return{bodies:Ke([],De(fn.values()),!1).map(function(c){return{id:c.id,sourceId:c.sourceId,x:c.x,y:c.y,vx:c.vx,vy:c.vy,atRest:!!c.atRest,captured:!!c.captured}}),aiming:he?{componentId:he.sourceId,pointerId:he.pointerId,power:he.power}:null}}function sc(c){for(var x=c;x;){if(x.contract==="native.stage3d.v1")return x;x=x.parentId?Le(x.parentId):void 0}}function oc(c,x){var R,A,C,N,P,X,k=$t.get(c.id);if(k)return k;var Z=Vt(c),V=sc(c);return k=gt({id:c.id,sourceId:x.componentId,stageId:V?.id,x:(R=Z.x)!==null&&R!==void 0?R:0,y:(A=Z.y)!==null&&A!==void 0?A:0,z:(C=Z.z)!==null&&C!==void 0?C:0,vx:0,vy:0,vz:0,spin:0,atRest:!0,captured:!1,captureElapsed:0,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:(N=Z.x)!==null&&N!==void 0?N:0,y:(P=Z.y)!==null&&P!==void 0?P:0,z:(X=Z.z)!==null&&X!==void 0?X:0}},x.parameters),$t.set(c.id,k),k}function lc(){var c,x,R,A,C,N,P,X=[],k=[],Z=[];if(!jt)return{bodies:X,walls:k,zones:Z};try{for(var V=Ue(n.gameplay.filter(function(ve){return ve.kind==="physics-3d"})),$=V.next();!$.done;$=V.next()){var q=$.value,Q=S.get(q.componentId);if(!(!Q||Q.sceneId!==J||!ii(Q))){var te=oc(Q,q);te.mode==="dynamic"?X.push(te):k.push(te)}}}catch(ve){c={error:ve}}finally{try{$&&!$.done&&(x=V.return)&&x.call(V)}finally{if(c)throw c.error}}try{for(var G=Ue(n.gameplay.filter(function(ve){return ve.kind==="capture-zone-3d"})),ce=G.next();!ce.done;ce=G.next()){var q=ce.value,Q=S.get(q.componentId);if(!(!Q||Q.sceneId!==J||!ii(Q))){var me=Vt(Q);Z.push(gt({id:Q.id,sourceId:Q.id,x:(C=me.x)!==null&&C!==void 0?C:0,y:(N=me.y)!==null&&N!==void 0?N:0,z:(P=me.z)!==null&&P!==void 0?P:0},q.parameters))}}}catch(ve){R={error:ve}}finally{try{ce&&!ce.done&&(A=G.return)&&A.call(G)}finally{if(R)throw R.error}}return{bodies:X,walls:k,zones:Z}}function Rv(c){var x,R,A,C,N,P,X,k,Z,V;if(jt){try{for(var $=Ue(n.gameplay.filter(function(Wt){return Wt.kind==="oscillate-3d"})),q=$.next();!q.done;q=$.next()){var Q=q.value,te=S.get(Q.componentId);if(!(!te||te.sceneId!==J)){var G=Et.get(te.id);if(!G){var ce=Vt(te);G={x:(N=ce.x)!==null&&N!==void 0?N:0,y:(P=ce.y)!==null&&P!==void 0?P:0,z:(X=ce.z)!==null&&X!==void 0?X:0},Et.set(te.id,G)}var me=Q.parameters,ve=_e*me.angularSpeed+me.phase,xe=Math.sin(ve)*me.amplitude,oe=Math.cos(ve)*me.amplitude*me.angularSpeed,be=(k=$t.get(te.id))!==null&&k!==void 0?k:An("physics-3d",te.id)?oc(te,An("physics-3d",te.id)):void 0,Ee=G.x+(me.axis==="x"?xe:0),Ie=G.y+(me.axis==="y"?xe:0),Ze=G.z+(me.axis==="z"?xe:0);if(be)be.x=Ee,be.y=Ie,be.z=Ze,be.vx=me.axis==="x"?oe:0,be.vy=me.axis==="y"?oe:0,be.vz=me.axis==="z"?oe:0;else{var lt=(Z=He.get(te.id))!==null&&Z!==void 0?Z:{transform:Ke([],De(te.transform),!1),parameters:{}};lt.parameters.x=Ee,lt.parameters.y=Ie,lt.parameters.z=Ze,He.set(te.id,lt)}}}}catch(Wt){x={error:Wt}}finally{try{q&&!q.done&&(R=$.return)&&R.call($)}finally{if(x)throw x.error}}var Xe=lc(),ht=Xe.bodies,yt=Xe.walls,Gt=Xe.zones;pf({bodies:ht,walls:yt,zones:Gt,dt:c,onEvent:function(Wt,Mt,mt){var Qe={kind:Wt,componentId:Mt.sourceId};mt&&(Qe.otherId=mt.sourceId),Jt(Qe)}});try{for(var Ut=Ue(ht),at=Ut.next();!at.done;at=Ut.next()){var be=at.value;be.captured&&(be.captureElapsed=((V=be.captureElapsed)!==null&&V!==void 0?V:0)+c)}}catch(Wt){A={error:Wt}}finally{try{at&&!at.done&&(C=Ut.return)&&C.call(Ut)}finally{if(A)throw A.error}}Pv(c,yt)}}function cc(c){var x=Vn.get(c.componentId);if(!x){var R=c.parameters;x={behavior:c,x:R.x,y:R.y,z:R.z,yaw:R.yaw,pitch:R.pitch,bobPhase:0,bob:0},Vn.set(c.componentId,x)}return x}function ap(){var c,x;try{for(var R=Ue(n.gameplay.filter(function(N){var P;return N.kind==="fps-controller-3d"&&((P=S.get(N.componentId))===null||P===void 0?void 0:P.sceneId)===J})),A=R.next();!A.done;A=R.next()){var C=A.value;cc(C)}}catch(N){c={error:N}}finally{try{A&&!A.done&&(x=R.return)&&x.call(R)}finally{if(c)throw c.error}}}function sp(c){var x,R,A,C=[];try{for(var N=Ue(Oe.values()),P=N.next();!P.done;P=N.next()){var X=P.value;X.contract==="native.mesh3d.v1"&&((A=sc(X))===null||A===void 0?void 0:A.id)===c&&C.push(X)}}catch(k){x={error:k}}finally{try{P&&!P.done&&(R=N.return)&&R.call(N)}finally{if(x)throw x.error}}return C}function op(c,x,R){var A,C,N=cc(c),P=c.parameters,X=P.lookSensitivity,k=P.invertAimY?-1:1,Z=N.yaw-x*X;P.minYaw!==void 0&&P.maxYaw!==void 0&&(Z=Math.max(P.minYaw,Math.min(P.maxYaw,Z))),N.yaw=Z,N.pitch=Math.max((A=P.minPitch)!==null&&A!==void 0?A:-.75,Math.min((C=P.maxPitch)!==null&&C!==void 0?C:.75,N.pitch-R*X*k))}function Pv(c,x){var R,A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve,xe,oe,be=function(Mt){var mt=S.get(Mt.componentId);if(!mt||mt.sceneId!==J)return"continue";var Qe=cc(Mt),st=Mt.parameters,We=st.aimJoystickBehaviorId?le.get(st.aimJoystickBehaviorId):void 0;if(We&&st.aimMode==="rate"&&We.magnitude>1e-4&&c>0){var tt=(k=st.aimTurnSpeed)!==null&&k!==void 0?k:1.8,St=st.invertAimY?-1:1,Ct=Qe.yaw-We.nx*tt*c;st.minYaw!==void 0&&st.maxYaw!==void 0&&(Ct=Math.max(st.minYaw,Math.min(st.maxYaw,Ct))),Qe.yaw=Ct,Qe.pitch=Math.max((Z=st.minPitch)!==null&&Z!==void 0?Z:-.75,Math.min((V=st.maxPitch)!==null&&V!==void 0?V:.75,Qe.pitch-We.ny*tt*St*c))}var Pt=st.joystickBehaviorId?le.get(st.joystickBehaviorId):void 0,Nt=Pt?Pt.nx:Number(st.moveXVariableId?ne[st.moveXVariableId]:0),Yt=Pt?Pt.ny:Number(st.moveYVariableId?ne[st.moveYVariableId]:0),Bt=Math.min(1,Math.hypot(Nt,Yt));if(Bt>1e-4&&st.moveSpeed>0&&c>0){var it=-Yt,Ft=Nt,Cn=-Math.sin(Qe.yaw),bn=-Math.cos(Qe.yaw),_i=Math.cos(Qe.yaw),ri=-Math.sin(Qe.yaw),wn=st.moveSpeed*c,Rn=x.filter(function(si){return si.stageId===mt.id}),Hn=mf(Qe.x+(Cn*it+_i*Ft)*wn,Qe.z+(bn*it+ri*Ft)*wn,($=st.playerRadius)!==null&&$!==void 0?$:.45,Rn,(q=st.boundsX)!==null&&q!==void 0?q:12,(Q=st.boundsZ)!==null&&Q!==void 0?Q:12);Qe.x=Hn.x,Qe.z=Hn.z,Qe.bobPhase+=c*10*Bt,Qe.bob=U?.matches?0:Math.sin(Qe.bobPhase)*((te=st.bobAmplitude)!==null&&te!==void 0?te:.04)*Bt}else Qe.bob*=Math.max(0,1-12*c)};try{for(var Ee=Ue(n.gameplay.filter(function(Mt){return Mt.kind==="fps-controller-3d"})),Ie=Ee.next();!Ie.done;Ie=Ee.next()){var Ze=Ie.value;be(Ze)}}catch(Mt){R={error:Mt}}finally{try{Ie&&!Ie.done&&(A=Ee.return)&&A.call(Ee)}finally{if(R)throw R.error}}try{for(var lt=Ue(n.gameplay.filter(function(Mt){return Mt.kind==="steer-3d"})),Xe=lt.next();!Xe.done;Xe=lt.next()){var Ze=Xe.value,ht=S.get(Ze.componentId);if(!(!ht||ht.sceneId!==J)){var yt=Ze.parameters,Gt=function(mt){if(!ii(mt))return"continue";var Qe=sc(mt),st=Qe?Vn.get(Qe.id):void 0;if(!st)return"continue";var We=Vt(mt),tt=(G=We.x)!==null&&G!==void 0?G:0,St=(ce=We.z)!==null&&ce!==void 0?ce:0,Ct=st.x-tt,Pt=st.z-St,Nt=Math.hypot(Ct,Pt),Yt=(me=yt.stopDistance)!==null&&me!==void 0?me:2.5,Bt=tt,it=St;if(yt.mode==="chase-camera"&&Nt>Yt&&Nt>1e-4){var Ft=Math.min(Nt-Yt,yt.speed*c);Bt+=Ct/Nt*Ft,it+=Pt/Nt*Ft}else if(yt.mode==="strafe-camera"&&Nt>1e-4){var Cn=-Pt/Nt,bn=Ct/Nt;Bt+=Cn*yt.speed*c,it+=bn*yt.speed*c}else yt.mode==="patrol"&&(Bt+=Math.cos(_e*1.5)*yt.speed*c);var _i=x.filter(function(Rn){return Rn.stageId===Qe.id&&Rn.id!==mt.id}),ri=mf(Bt,it,.45,_i,(ve=yt.boundsX)!==null&&ve!==void 0?ve:12,(xe=yt.boundsZ)!==null&&xe!==void 0?xe:12),wn=(oe=He.get(mt.id))!==null&&oe!==void 0?oe:{transform:Ke([],De(mt.transform),!1),parameters:{}};wn.parameters.x=ri.x,wn.parameters.z=ri.z,yt.faceCamera!==!1&&(wn.parameters.ry=Math.atan2(st.x-ri.x,st.z-ri.z)),He.set(mt.id,wn)};try{for(var Ut=(P=void 0,Ue(ci(ht))),at=Ut.next();!at.done;at=Ut.next()){var Wt=at.value;Gt(Wt)}}catch(mt){P={error:mt}}finally{try{at&&!at.done&&(X=Ut.return)&&X.call(Ut)}finally{if(P)throw P.error}}}}}catch(Mt){C={error:Mt}}finally{try{Xe&&!Xe.done&&(N=lt.return)&&N.call(lt)}finally{if(C)throw C.error}}}function Lv(c,x,R,A){if(Te.length>=128){Ai("Instance budget exhausted");return}var C=S.get(c),N=function(Z){return 1+n.components.filter(function(V){return V.parentId===Z}).reduce(function(V,$){return V+N($.id)},0)};if(Oe.size+N(C.id)>4096){Ai("Runtime node budget exhausted");return}var P="instance."+ ++$e;function X(Z,V){var $,q,Q=Z.id===C.id?P:P+":"+Z.id,te=gt(gt({},Z),{id:Q,runtimeId:Q,instanceId:P,prototypeId:Z.id,prototype:!1,parentId:V,transform:Ke([],De(Z.transform),!1),parameters:gt({},Z.parameters),spawnTime:_e});Oe.set(Q,te);try{for(var G=Ue(n.components.filter(function(ve){return ve.parentId===Z.id})),ce=G.next();!ce.done;ce=G.next()){var me=ce.value;X(me,Q)}}catch(ve){$={error:ve}}finally{try{ce&&!ce.done&&(q=G.return)&&q.call(G)}finally{if($)throw $.error}}return te}var k=X(C,C.parentId);return k.parameters.x=x,k.parameters.y=R,k.parameters.z=A,Te.push(k),Ms(k),k}function Dv(c){var x,R;if(jt){var A=S.get(c.stageId);if(!(!A||A.sceneId!==J)){var C=Vt(A),N=zn(A),P=Math.hypot(N[0],N[1]),X=Math.hypot(N[2],N[3]),k=jt.syncStage(A,{time:_e,ambientTime:Ge,propsOf:Vt,bodies3d:$t,fpsPose:Vn.get(A.id),instances3d:sp(A.id),aimLocked:!!It,groundFn:Js,worldWidth:C.width*P,worldHeight:C.height*X}).entry,Z=0,V=0;if(c.mode==="pointer"){var $=In(wr(N),Je.x,Je.y);Z=$.x/Math.max(1,C.width)*2-1,V=1-$.y/Math.max(1,C.height)*2}var q=new Set(n.gameplay.filter(function(me){return me.kind==="physics-3d"&&me.parameters.mode!=="dynamic"}).map(function(me){return me.componentId})),Q=(x=c.targetTeam)!==null&&x!==void 0?x:"any",te=function(me){var ve,xe,oe=Le(me);return!oe||!ii(oe)?!1:Q!=="any"?((ve=$r(oe))===null||ve===void 0?void 0:ve.team)===Q:!!$r(oe)||!q.has((xe=oe.prototypeId)!==null&&xe!==void 0?xe:oe.id)},G=k.raycast(Z,V,(R=c.maxDistance)!==null&&R!==void 0?R:80,{isTarget:te,isOccluder:function(me){return q.has(me)}});if(G){var ce=Le(G.id);ce&&Jt(pi("raycastHit3d",ce,A))}else Jt({kind:"raycastMiss3d",componentId:A.id})}}}function Vd(c){var x,R,A;if(!jt)return null;var C=Le(c);if(!C||C.contract!=="native.mesh3d.v1")return null;var N=sc(C);if(!N)return null;var P=jt.getStage(N);if(!P||!P.lastWidth||!P.lastHeight)return null;var X=$t.get(C.id),k=Vt(C),Z=P.project({x:X?X.x:(x=k.x)!==null&&x!==void 0?x:0,y:X?X.y:(R=k.y)!==null&&R!==void 0?R:0,z:X?X.z:(A=k.z)!==null&&A!==void 0?A:0},P.lastWidth,P.lastHeight);return In(zn(N),Z.x,Z.y)}function lp(){if(!It||!jt)return{vx:0,vz:0,power:0,pull:0};var c=S.get(It.stageId),x=jt.getStage(c),R=$t.get(It.targetId),A=It.behavior.parameters;if(!x||!R||!x.lastWidth||!x.lastHeight)return{vx:0,vz:0,power:0,pull:0};var C=wr(zn(c)),N=In(C,It.start.x,It.start.y),P=In(C,It.current.x,It.current.y),X=Math.hypot(It.current.x-It.start.x,It.current.y-It.start.y),k=x.unproject(N.x,N.y,x.lastWidth,x.lastHeight,R.y),Z=x.unproject(P.x,P.y,x.lastWidth,x.lastHeight,R.y);if(!k||!Z)return{vx:0,vz:0,power:0,pull:X};var V=(k.x-Z.x)*A.dragScale,$=(k.z-Z.z)*A.dragScale,q=Math.hypot(V,$);return q>A.maxSpeed&&(V*=A.maxSpeed/q,$*=A.maxSpeed/q),{vx:V,vz:$,power:Math.min(1,Math.hypot(V,$)/Math.max(.001,A.maxSpeed)),pull:X}}function cp(c){if(!(!It||!jt)){It.current=c;var x=lp(),R=It.behavior.parameters;It.power=x.power,R.powerVariableId&&(ne[R.powerVariableId]=x.power);var A=S.get(It.stageId),C=jt.getStage(A),N=$t.get(It.targetId);if(C&&N&&R.showTrajectory&&x.pull>=R.minPullPx){var P=lc(),X=P.walls,k=P.zones;C.setGuide(am({body:N,walls:X,zones:k,vx:x.vx,vz:x.vz,dots:R.trajectoryDots}))}else C?.setGuide([])}}function Nv(){return{bodies:Ke([],De($t.values()),!1).map(function(c){return{id:c.id,sourceId:c.sourceId,x:c.x,y:c.y,z:c.z,vx:c.vx,vy:c.vy,vz:c.vz,atRest:!!c.atRest,captured:!!c.captured,airborne:!!c.airborne}}),aiming:It?{componentId:It.sourceId,pointerId:It.pointerId,power:It.power}:null,projected:Object.fromEntries(hn),fps:Object.fromEntries(Ke([],De(Vn),!1).map(function(c){var x=De(c,2),R=x[0],A=x[1];return[R,{x:A.x,y:A.y,z:A.z,yaw:A.yaw,pitch:A.pitch}]}))}}function uc(){en=void 0,gr(),le.clear(),Bn.clear(),la.clear(),Za.clear(),Ei.reset(),mr.clear(),sr.clear(),Dt=[],tn=[],Vr.clear(),D.clear(),E.clear(),we=[],ze=[],Ye=void 0,Re=0,Ae=!1,Ne=0,ne=Object.fromEntries(n.variables.map(function(c){return[c.id,c.initial]})),pn(),rr=0,Oe.clear(),Pe.clear(),fn.clear(),qi.clear(),$t.clear(),Et.clear(),hn.clear(),Vn.clear(),jt?.reset(),wi.clear(),gi.clear(),he=void 0,Te=[],fe=[],pe=[],He.clear(),ko(),ie.clear(),ae.clear(),de.clear(),Fe=[],_e=0,Ge=0,$e=0,wt=!1,ut=0,J=n.base.startScene,se=void 0,mn=void 0,an=void 0,W=void 0,f||(Oo(),rc(),rp(),lc(),ap(),ac(0,!1),Xd(),zd(0),Jt({kind:"sceneEnter",sceneId:J}))}function Gd(){var c,x;if(!(!_t||_t.state!=="running"||!Rt.size)){var R=Ke([],De(Rt.values()),!1);Rt.clear();try{for(var A=Ue(R),C=A.next();!C.done;C=A.next()){var N=C.value;dp(N)}}catch(P){c={error:P}}finally{try{C&&!C.done&&(x=A.return)&&x.call(A)}finally{if(c)throw c.error}}}}function Hs(c){if(c===void 0&&(c=!1),!_t)return Promise.resolve(void 0);if(_t.state==="running")return Promise.resolve().then(Gd),Promise.resolve(_t);if(!ln||c){var x=_t,R=Promise.resolve().then(function(){return x.resume()}).then(function(){if(x.state==="running")return Gd(),x}).catch(function(){}).finally(function(){ln===R&&(ln=void 0)});ln=R}return ln}function Hd(){var c,x,R=Ke([],De(vt.values()),!1),A=R.some(function(V){return V.bus==="voice"}),C=R.some(function(V){return V.bus==="stinger"}),N=C?.2:A?.25:1;try{for(var P=Ue(R),X=P.next();!X.done;X=P.next()){var k=X.value,Z=k.volume*Yi*(k.bus==="music"?N:1);k.gain.gain.setTargetAtTime?k.gain.gain.setTargetAtTime(Z,_t.currentTime,.04):k.gain.gain.value=Z}}catch(V){c={error:V}}finally{try{X&&!X.done&&(x=P.return)&&x.call(P)}finally{if(c)throw c.error}}}function up(c,x,R){var A,C=(A=R.parameters.bus)!==null&&A!==void 0?A:"sfx";c.connect(x),x.connect(_t.destination),nt.add(c),vt.set(c,{gain:x,bus:C,volume:R.parameters.volume}),c.onended=function(){nt.delete(c),vt.delete(c),R.parameters.loop&&Be.delete(R.id),Hd()},Hd()}function dp(c){return $b(this,void 0,void 0,function(){var x,R,A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve,xe,oe,be,Ee,Ie,Ze,lt,Xe,ht,yt,Gt,Ut;return Kb(this,function(at){switch(at.label){case 0:return nt.size>=32?[2]:_t?(x=_t,R=vi,A=(Ze=c.parameters.cooldownMs)!==null&&Ze!==void 0?Ze:45,C=x.currentTime,A>0&&C-((lt=cn.get(c.id))!==null&&lt!==void 0?lt:-1/0)<A/1e3?[2]:c.parameters.loop&&Be.has(c.id)?[2]:(N=S.get(c.componentId),P=B.get((Xe=N?.assetSlots[0])===null||Xe===void 0?void 0:Xe.assetId),X=P?.mime==="audio/wav"||P?.mime==="audio/mpeg",!X&&c.parameters.allowSynthFallback===!1?(rr++,[2]):(cn.set(c.id,C),k=x.state!=="running",k?[4,Hs()]:[3,2]))):(c.parameters.loop&&Rt.set(c.id,c),[2]);case 1:k=!at.sent(),at.label=2;case 2:if(k)return c.parameters.loop&&Rt.set(c.id,c),[2];if(_t!==x||x.state!=="running"||R!==vi||nt.size>=32)return[2];if(Z=(ht=dn.get(c.id))!==null&&ht!==void 0?ht:0,V=[0,-.5,.5,-1,1],$=((yt=c.parameters.pitchJitter)!==null&&yt!==void 0?yt:0)*V[Z%V.length],q=Number((Gt=ne[c.parameters.pitchVariableId])!==null&&Gt!==void 0?Gt:0),Q=Math.max(-12,Math.min(12,$+q*((Ut=c.parameters.pitchStep)!==null&&Ut!==void 0?Ut:0))),te=Math.pow(2,Q/12),dn.set(c.id,Z+1),!X)return[3,8];c.parameters.loop&&Be.add(c.id),at.label=3;case 3:if(at.trys.push([3,6,,7]),G=dt.get(P.hash),G)return[3,5];for(ce=atob(P.data),me=new Uint8Array(ce.length),ve=0;ve<ce.length;ve++)me[ve]=ce.charCodeAt(ve);return[4,new Promise(function(Wt,Mt){var mt=x.decodeAudioData(me.buffer,Wt,Mt);mt&&typeof mt.then=="function"&&mt.then(Wt,Mt)})];case 4:G=at.sent(),dt.set(P.hash,G),at.label=5;case 5:return _t!==x||x.state!=="running"||R!==vi||nt.size>=32?(c.parameters.loop&&R===vi&&Be.delete(c.id),[2]):(xe=x.createBufferSource(),oe=x.createGain(),xe.buffer=G,xe.loop=c.parameters.loop,xe.playbackRate&&(xe.playbackRate.value=te),oe.gain.value=c.parameters.volume,up(xe,oe,c),xe.start(),[3,7]);case 6:return be=at.sent(),Be.delete(c.id),Ai("Audio decode failed"),[3,7];case 7:return[2];case 8:return Ee=x.createOscillator(),Ie=x.createGain(),Ee.frequency.value=c.parameters.frequency*te,Ee.type="sine",Ie.gain.setValueAtTime(c.parameters.volume,x.currentTime),Ie.gain.exponentialRampToValueAtTime(.001,x.currentTime+c.parameters.seconds),up(Ee,Ie,c),Ee.start(),Ee.stop(x.currentTime+c.parameters.seconds),[2]}})})}function Uv(c,x){for(var R=Ke([],De(Dn.values()),!1).filter(function(V){return V.boardId===c}),A=function(V,$){var q;return(q=R.find(function(Q){return Q.row===V&&Q.column===$}))===null||q===void 0?void 0:q.group},C=function(V){for(var $=function(te){var G=A(V,te);if(G&&G===A(V,te+1)&&G===A(V,te+2)&&x.some(function(ce){return ce.row===V&&ce.column>=te&&ce.column<=te+2}))return{value:!0}},q=0;q<14;q++){var Q=$(q);if(typeof Q=="object")return Q}},N=0;N<16;N++){var P=C(N);if(typeof P=="object")return P.value}for(var X=function(V){for(var $=function(te){var G=A(te,V);if(G&&G===A(te+1,V)&&G===A(te+2,V)&&x.some(function(ce){return ce.column===V&&ce.row>=te&&ce.row<=te+2}))return{value:!0}},q=0;q<14;q++){var Q=$(q);if(typeof Q=="object")return Q}},k=0;k<16;k++){var Z=X(k);if(typeof Z=="object")return Z.value}return!1}function Fv(c){var x,R,A,C=Dn.get(c.id);if(!(!C||C.sceneId!==J||!Vt(c).enabled||!ii(c))){var N=xt.get(c.parentId);if(N){yn=N.select(c.id);return}if(yn===c.id){yn=void 0;return}var P=Dn.get(yn);if(!P||P.sceneId!==J||P.boardId!==C.boardId){yn=c.id;return}var X=S.get(yn);if(Math.abs(P.row-C.row)+Math.abs(P.column-C.column)!==1){yn=c.id;return}if(P.group===C.group){yn=void 0,Jt({kind:"invalidMatch",componentId:(x=c.parentId)!==null&&x!==void 0?x:c.id});return}var k=P.row,Z=P.column,V=C.row,$=C.column,q=Ke([],De(Di(X)),!1),Q=Ke([],De(Di(c)),!1);if(P.row=V,P.column=$,C.row=k,C.column=Z,Uv(C.boardId,[P,C])){var te=function(G,ce){var me,ve=(me=He.get(G.id))!==null&&me!==void 0?me:{transform:Ke([],De(Di(G)),!1),parameters:{}};ve.transform=Ke([],De(ve.transform),!1),ve.transform[4]=ce[4],ve.transform[5]=ce[5],He.set(G.id,ve)};te(X,Q),te(c,q),yn=void 0,Jt({kind:"validMatch",componentId:(R=c.parentId)!==null&&R!==void 0?R:c.id})}else P.row=k,P.column=Z,C.row=V,C.column=$,yn=void 0,Jt({kind:"invalidMatch",componentId:(A=c.parentId)!==null&&A!==void 0?A:c.id})}}function Wd(c){var x,R,A,C,N=[],P=zi(c,zn(c)),X=xi(c),k=An("drag",(A=c.prototypeId)!==null&&A!==void 0?A:c.id),Z=function(Q){var te,G,ce=S.get(Q.componentId),me=Q.parameters;if(ce.sceneId!==J)return"continue";var ve=function(Ee){if(Ee.id===c.id||Rr(Ee,c.id)||!ii(Ee))return"continue";var Ie=zi(Ee,zn(Ee)),Ze=xi(Ee),lt=Math.hypot(Ze.x-X.x,Ze.y-X.y),Xe=me.radiusPx>0?lt<=me.radiusPx:P.left<Ie.right&&P.right>Ie.left&&P.top<Ie.bottom&&P.bottom>Ie.top;if(!Xe)return"continue";N.push(gt({id:Ee.id,c:Ee,sourceId:ce.id,paintOrder:ue.findIndex(function(ht){return ht.c.id===Ee.id}),distance:lt,itemTarget:n.gameplay.some(function(ht){return ht.kind==="drag"&&ht.componentId===ce.id})},me))};try{for(var xe=(te=void 0,Ue(ci(ce))),oe=xe.next();!oe.done;oe=xe.next()){var be=oe.value;ve(be)}}catch(Ee){te={error:Ee}}finally{try{oe&&!oe.done&&(G=xe.return)&&G.call(xe)}finally{if(te)throw te.error}}};try{for(var V=Ue(n.gameplay.filter(function(Q){return Q.kind==="drop-zone"})),$=V.next();!$.done;$=V.next()){var q=$.value;Z(q)}}catch(Q){x={error:Q}}finally{try{$&&!$.done&&(R=V.return)&&R.call(V)}finally{if(x)throw x.error}}return{zones:N,tag:(C=k?.parameters.tag)!==null&&C!==void 0?C:""}}function Xd(c){var x,R,A=c?[c]:n.gameplay.filter(function($){return $.kind==="drag"}).flatMap(function($){return ci(S.get($.componentId))});try{for(var C=Ue(A),N=C.next();!N.done;N=C.next()){var P=N.value;if(!(!P||!ii(P)||Bn.zoneOf(P.id))){var X=Wd(P),k=X.zones,Z=X.tag,V=wc({itemId:P.id,tag:Z,zones:k.filter(function($){return!$.itemTarget}),occupancy:Bn});V?.kind==="accept"&&Bn.place(P.id,V.zone.id)}}}catch($){x={error:$}}finally{try{N&&!N.done&&(R=C.return)&&R.call(C)}finally{if(x)throw x.error}}}function bs(c,x,R){R===void 0&&(R=.18),c&&ar.to(c.id,xi(c),x,R)}function Yd(c,x,R,A){var C,N,P=A??R?.c;Jt(gt(gt({},pi(c,x,P,gt({},R?{otherId:R.sourceId}:{}))),{instanceId:(C=x.instanceId)!==null&&C!==void 0?C:(N=R?.c)===null||N===void 0?void 0:N.instanceId}))}function Ov(c){var x,R,A,C,N,P,X;if(!rt||rt.pointerId!==c.pointerId)return!1;var k=rt,Z=Le(k.targetId),V=k.b.parameters;rt=void 0,et=void 0;try{!((x=e.hasPointerCapture)===null||x===void 0)&&x.call(e,c.pointerId)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,c.pointerId))}catch{}if(!Z)return!0;var $=Wd(Z),q=$.zones,Q=$.tag,te=wc({itemId:Z.id,tag:Q,zones:q,occupancy:Bn}),G=k.origin,ce=k.originZone;if(!te)return Yd("dragReject",Z,void 0,void 0),V.snapBack&&(ce&&Bn.place(Z.id,ce),bs(Z,G,(A=V.snapBackSeconds)!==null&&A!==void 0?A:.18)),!0;var me=te.zone,ve=te.occupantId?Le(te.occupantId):void 0;return te.kind==="reject"?(Yd("dragReject",Z,me,ve),V.snapBack&&(ce&&Bn.place(Z.id,ce),bs(Z,G,(C=V.snapBackSeconds)!==null&&C!==void 0?C:.18)),!0):(te.kind==="accept"?(Bn.place(Z.id,me.id),me.snapMode==="center"&&bs(Z,xi(me.c),(N=V.snapBackSeconds)!==null&&N!==void 0?N:.18)):te.kind==="swap"&&ve&&(Bn.place(Z.id,me.id),ce?Bn.place(ve.id,ce):Bn.release(ve.id),bs(Z,xi(me.c),(P=V.snapBackSeconds)!==null&&P!==void 0?P:.18),bs(ve,G,(X=V.snapBackSeconds)!==null&&X!==void 0?X:.18)),Yd("dragDrop",Z,me,te.kind==="accept"?me.c:ve),!0)}function Bv(c){var x,R,A,C,N;ar.tick(c,function(te,G){var ce=Le(te);ce&&ua(ce,G.x,G.y)});try{for(var P=Ue(Ke([],De(Bn.itemZone.keys()),!1)),X=P.next();!X.done;X=P.next()){var k=X.value,Z=Le(k);(!Z||!ii(Z))&&Bn.release(k)}}catch(te){x={error:te}}finally{try{X&&!X.done&&(R=P.return)&&R.call(P)}finally{if(x)throw x.error}}if(ke)try{for(var V=Ue(ke.holds),$=V.next();!$.done;$=V.next()){var q=$.value,Q=q.charge.tick(c);Q!==ne[q.behavior.parameters.variableId]&&(ne[q.behavior.parameters.variableId]=Q,Jt({kind:"variableChange",variableId:q.behavior.parameters.variableId,instanceId:q.c.instanceId,selfInstanceId:(N=q.c.instanceId)!==null&&N!==void 0?N:q.c.id}))}}catch(te){A={error:te}}finally{try{$&&!$.done&&(C=V.return)&&C.call(V)}finally{if(A)throw A.error}}}function fp(c,x){var R,A,C,N,P=x.targetMode;if(P==="pointer")return gt({},Je);if(P==="component"){var X=Le(x.targetComponentId);return X?xi(X):void 0}if(P==="nearest-team"){var k=xi(c),Z=[],V=x.team,$=(C=x.maxRangePx)!==null&&C!==void 0?C:0;try{for(var q=Ue(Ei.states),Q=q.next();!Q.done;Q=q.next()){var te=De(Q.value,2),G=te[0],ce=te[1],X=Le(G);X&&ii(X)&&Z.push(gt(gt({id:G},xi(X)),{team:ce.team}))}}catch(me){R={error:me}}finally{try{Q&&!Q.done&&(A=q.return)&&A.call(q)}finally{if(R)throw R.error}}return Vp(k,Z,V,$,(N=c.instanceId)!==null&&N!==void 0?N:c.id)}}function kv(c){var x,R,A,C,N;try{for(var P=Ue(n.gameplay.filter(function(be){return be.kind==="steer"})),X=P.next();!X.done;X=P.next()){var k=X.value,Z=S.get(k.componentId),V=k.parameters;if(Z.sceneId===J)try{for(var $=(A=void 0,Ue(ci(Z))),q=$.next();!q.done;q=$.next()){var Q=q.value;if(ii(Q)){var te=fp(Q,V);if(te){var G=xi(Q),ce=te.x-G.x,me=te.y-G.y;if(!(V.maxRangePx>0&&Math.hypot(ce,me)>V.maxRangePx)){var ve=Math.atan2(me,ce);V.mode==="flee"?ve+=Math.PI:V.mode==="orbit"&&(ve+=Math.PI/2);var xe=(N=Ei.headings.get(Q.id))!==null&&N!==void 0?N:ve,oe=Gp(xe,ve,V.turnRateDegPerSec*Math.PI/180*c);Ei.headings.set(Q.id,oe),ua(Q,G.x+Math.cos(oe)*V.speed*c,G.y+Math.sin(oe)*V.speed*c),V.orientToVelocity!==!1&&Gs(Q,oe)}}}}}catch(be){A={error:be}}finally{try{q&&!q.done&&(C=$.return)&&C.call($)}finally{if(A)throw A.error}}}}catch(be){x={error:be}}finally{try{X&&!X.done&&(R=P.return)&&R.call(P)}finally{if(x)throw x.error}}}function qd(c,x,R,A){var C;if(Te.length>=128){Ai("Instance budget exhausted");return}var N=S.get(c),P=function(V){return 1+n.components.filter(function($){return $.parentId===V}).reduce(function($,q){return $+P(q.id)},0)};if(Oe.size+P(N.id)>4096){Ai("Runtime node budget exhausted");return}var X="instance."+ ++$e;function k(V,$){var q,Q,te=V.id===N.id?X:X+":"+V.id,G=gt(gt({},V),{id:te,runtimeId:te,instanceId:X,prototypeId:V.id,prototype:!1,parentId:$,transform:Ke([],De(V.transform),!1),spawnTime:_e});Oe.set(te,G);try{for(var ce=Ue(n.components.filter(function(xe){return xe.parentId===V.id})),me=ce.next();!me.done;me=ce.next()){var ve=me.value;k(ve,te)}}catch(xe){q={error:xe}}finally{try{me&&!me.done&&(Q=ce.return)&&Q.call(ce)}finally{if(q)throw q.error}}return G}var Z=k(N,void 0);return Z.transform[4]=x,Z.transform[5]=R,A&&(Z.pathStartNode=A.startNode,Z.pathTargetNode=A.targetNode,Z.parentId=(C=n.gameplay.find(function(V){return V.id===A.networkBehaviorId}))===null||C===void 0?void 0:C.componentId),Te.push(Z),Ms(Z),Xd(Z),A&&ac(0,!1),Z}function zv(c,x,R){var A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve,xe,oe,be,Ee,Ie,Ze,lt,Xe,ht,yt,Gt,Ut,at,Wt,Mt,mt;if(++Zt>1024){Ai("Action budget exhausted");return}if(c.kind==="add"||c.kind==="set"){var Qe=ne[c.variableId],st=c.kind==="add"?Qe+c.value:c.value;if(typeof st=="number"&&(!Number.isFinite(st)||Math.abs(st)>1e12)){Ai("Variable range exceeded");return}ne[c.variableId]=st,Qe!==st&&Jt({kind:"variableChange",variableId:c.variableId,instanceId:x.instanceId})}else if(c.kind==="setComponent"||c.kind==="setAsset"){var We=Le(c.componentId);if(!We)return;var tt=($=He.get(We.id))!==null&&$!==void 0?$:{transform:Ke([],De(We.transform),!1),parameters:{}};c.kind==="setComponent"?tt.parameters[c.key]=c.valueVariableId?ne[c.valueVariableId]:c.value:tt.assetId=c.assetId,He.set(We.id,tt),c.kind==="setComponent"&&c.key==="visible"&&c.value===!1&&(Bn.release(We.id),ar.cancel(We.id))}else if(c.kind==="resetMatch")ko(c.componentId),rc(c.componentId);else if(c.kind==="clearStrokes")(q=sr.get(c.componentId))===null||q===void 0||q.clear(),Dt=Dt.filter(function(On){return On.owner!==c.componentId});else if(c.kind==="resetMask"){var We=Le(c.componentId),St=An("erase-mask",c.componentId);We&&St&&zo(We,St).reset()}else if(c.kind==="raycast3d")Dv(c);else if(c.kind==="spawnAt3d")for(var Ct=Math.max(1,Math.min(16,Math.floor((Q=c.count)!==null&&Q!==void 0?Q:1))),Pt=0;Pt<Ct;Pt++){var Nt=c.jitterX?(Ei.rng.next()*2-1)*c.jitterX:0,Yt=c.jitterZ?(Ei.rng.next()*2-1)*c.jitterZ:0;Lv(c.prototypeId,c.x+Nt,c.y,c.z+Yt)}else if(c.kind==="copyMatchAsset"){var Bt=(te=xt.get(c.boardId))===null||te===void 0?void 0:te.snapshot().lastMatch,it=S.get(c.componentId),Ft=Bt&&((ce=(G=ni.get(c.boardId))===null||G===void 0?void 0:G.get(Bt.group))===null||ce===void 0?void 0:ce.children.find(function(On){return On.contract==="native.image.v1"}));if(Bt&&Ft){var Cn=S.get(Bt.from),bn=In(zn(Cn),Cn.parameters.width/2,Cn.parameters.height/2),_i=it.parentId?zn(S.get(it.parentId)):ga(),ri=In(wr(_i),bn.x,bn.y),wn=(me=He.get(it.id))!==null&&me!==void 0?me:{transform:Ke([],De(it.transform),!1),parameters:{}};wn.transform=Ke([],De(wn.transform),!1),wn.transform[4]=ri.x-it.parameters.width/2,wn.transform[5]=ri.y-it.parameters.height/2,wn.assetId=(ve=Ft.assetSlots[0])===null||ve===void 0?void 0:ve.assetId,He.set(it.id,wn)}}else if(c.kind==="hintMatch")yn=void 0,(xe=xt.get(c.componentId))===null||xe===void 0||xe.showHint();else if(c.kind==="spawn")qd(c.prototypeId,c.x,c.y);else if(c.kind==="spawnAt"){var Rn=(c.at==="self"||c.at==="midpoint")&&(x.selfInstanceId!==void 0||x.instanceId!==void 0)?Le((oe=x.selfInstanceId)!==null&&oe!==void 0?oe:x.instanceId):Ss(c.targetComponentId,x,"self"),Hn=(c.at==="other"||c.at==="midpoint")&&x.otherInstanceId!==void 0?Le(x.otherInstanceId):void 0,it=c.at==="other"?Hn:Rn;if(c.at==="pointer"||(c.at==="midpoint"?Rn&&Hn:it))for(var si=Rn?xi(Rn):void 0,ai=Hn?xi(Hn):void 0,bn=c.at==="pointer"?Je:c.at==="midpoint"?{x:(si.x+ai.x)/2,y:(si.y+ai.y)/2}:xi(it),qn=S.get(c.prototypeId),Ct=Math.max(0,Math.min(16,Math.floor(c.countVariableId?Number(ne[c.countVariableId]):(be=c.count)!==null&&be!==void 0?be:1))),Pt=0;Pt<Ct;Pt++){var Kr=c.jitterX?(Ei.rng.next()*2-1)*c.jitterX:0,Gr=c.jitterY?(Ei.rng.next()*2-1)*c.jitterY:0;qd(c.prototypeId,bn.x+c.offsetX+Kr-qn.parameters.width/2,bn.y+c.offsetY+Gr-qn.parameters.height/2)}}else if(c.kind==="random"){var Qe=ne[c.variableId],st=Ei.rng.between(c.min,c.max,c.integer===!0);ne[c.variableId]=st,Qe!==st&&Jt({kind:"variableChange",variableId:c.variableId,instanceId:x.instanceId})}else if(c.kind==="modifyInstanceState"){var We=c.target==="component"?Le(c.componentId):Ss(c.componentId,x,c.target);We&&Bo(We,c.field,c.op,c.variableId?ne[c.variableId]:c.value)}else if(c.kind==="launchToward"){var Cn=S.get(c.componentId),Ii=ci(Cn),Pn=(Ee=x.selfInstanceId)!==null&&Ee!==void 0?Ee:x.instanceId,We=Cn.prototype?(Ie=Ii.find(function(on){return on.instanceId===Pn||on.id===Pn}))!==null&&Ie!==void 0?Ie:Ii[Ii.length-1]:(Ze=Ss(c.componentId,x,"self"))!==null&&Ze!==void 0?Ze:Le(c.componentId),St=An("physics-body",c.componentId),Ht=We&&$a(We,St);if(!Ht)return;var Lt=void 0;if(c.targetMode==="angle-variable")Lt=Number(ne[c.angleVariableId])*Math.PI/180;else{var it=fp(We,c);if(!it)return;var bn=xi(We);Lt=Math.atan2(it.y-bn.y,it.x-bn.x)}var oi=Number(c.speedVariableId?ne[c.speedVariableId]:c.speed);if(!Number.isFinite(oi)){Ai("Launch speed invalid");return}Ht.vx=Math.cos(Lt)*oi,Ht.vy=Math.sin(Lt)*oi,Ht.atRest=!1,Ht.restElapsed=0,Ht.captured=!1,Ht.exited=!1,c.orientToVelocity!==!1&&Gs(We,Lt),Jt(pi("launch",We))}else if(c.kind==="moveToComponent"){var $i=S.get(c.targetComponentId),We=Ss(c.componentId,x,(lt=c.target)!==null&&lt!==void 0?lt:"self"),it=$i&&ki($i)?(Xe=Ss(c.targetComponentId,x,c.target==="other"?"self":"other"))!==null&&Xe!==void 0?Xe:ci($i)[0]:Le(c.targetComponentId);We&&it&&bs(We,xi(it),c.seconds)}else if(c.kind==="returnToOrigin"){var We=Ss(c.componentId,x,"self"),_r=We&&la.get(We.id);We&&_r&&bs(We,_r,c.seconds)}else if(c.kind==="spawnOnPath")qd(c.prototypeId,0,0,{startNode:c.startNode,targetNode:c.targetNode,networkBehaviorId:c.networkBehaviorId});else if(["setVelocity","applyImpulse","stopBody"].includes(c.kind)){var Hr=S.get(c.componentId),Nn=x.instanceId?Ke([],De(Oe.values()),!1).filter(function(xn){return xn.instanceId===x.instanceId&&xn.prototypeId===Hr.id}):ci(Hr),St=An("physics-body",Hr.id);try{for(var cr=Ue(Nn),Pr=cr.next();!Pr.done;Pr=cr.next()){var We=Pr.value,Ht=$a(We,St);c.kind==="setVelocity"?(Ht.vx=c.vxVariableId?ne[c.vxVariableId]:c.vx,Ht.vy=c.vyVariableId?ne[c.vyVariableId]:c.vy):c.kind==="applyImpulse"?(Ht.vx+=c.vxVariableId?ne[c.vxVariableId]:c.ix,Ht.vy+=c.vyVariableId?ne[c.vyVariableId]:c.iy):(Ht.vx=0,Ht.vy=0,Ht.atRest=!0),Ht.captured=!1,Ht.exited=!1,Ht.restElapsed=0,c.kind!=="stopBody"&&(Ht.atRest=!1)}}catch(xn){A={error:xn}}finally{try{Pr&&!Pr.done&&(C=cr.return)&&C.call(cr)}finally{if(A)throw A.error}}}else if(c.kind==="setPosition"){var Qa=S.get(c.componentId),Nn=x.instanceId?Ke([],De(Oe.values()),!1).filter(function(Kt){return Kt.instanceId===x.instanceId&&Kt.prototypeId===Qa.id}):ci(Qa),St=An("physics-body",Qa.id);try{for(var Lr=Ue(Nn),ur=Lr.next();!ur.done;ur=Lr.next()){var We=ur.value,Ht=$a(We,St);Ht.x=c.xVariableId?ne[c.xVariableId]:c.x,Ht.y=c.yVariableId?ne[c.yVariableId]:c.y,Ht.vx=0,Ht.vy=0,Ht.captured=!1,Ht.exited=!1,Ht.atRest=!0,ua(We,Ht.x,Ht.y)}}catch(Kt){N={error:Kt}}finally{try{ur&&!ur.done&&(P=Lr.return)&&P.call(Lr)}finally{if(N)throw N.error}}}else if(c.kind==="setPathEdge")(ht=bi.get(c.behaviorId))===null||ht===void 0||ht.setEdge(c.edgeId,c.enabled,c.cost);else if(c.kind==="setPathGate")(Gt=bi.get((yt=n.gameplay.find(function(On){return On.id===c.behaviorId}))===null||yt===void 0?void 0:yt.parameters.networkBehaviorId))===null||Gt===void 0||Gt.setGate(c.behaviorId,c.mode,c.holdSeconds);else if(c.kind==="setPathTarget"){var da=S.get(c.componentId),St=An("path-agent",da.id),dr=bi.get(St.parameters.networkBehaviorId);try{for(var fa=Ue(x.instanceId?Ke([],De(Oe.values()),!1).filter(function(xn){return xn.instanceId===x.instanceId&&xn.prototypeId===da.id}):ci(da)),Vi=fa.next();!Vi.done;Vi=fa.next()){var We=Vi.value;We.pathTargetNode=c.targetNode,dr?.setTarget(We.id,c.targetNode)}}catch(xn){X={error:xn}}finally{try{Vi&&!Vi.done&&(k=fa.return)&&k.call(fa)}finally{if(X)throw X.error}}}else if(c.kind==="compute"){var Mi=Number(ne[c.variableId]),ui=c.operandVariableId!==void 0?Number(ne[c.operandVariableId]):c.value;if(["div","mod"].includes(c.op)&&ui===0){Ai("Division by zero");return}var st={add:function(){return Mi+ui},sub:function(){return Mi-ui},mul:function(){return Mi*ui},div:function(){return ui===0?Mi:Mi/ui},mod:function(){return ui===0?Mi:Mi%ui},min:function(){return Math.min(Mi,ui)},max:function(){return Math.max(Mi,ui)},set:function(){return ui},floor:function(){return Math.floor(Mi)},ceil:function(){return Math.ceil(Mi)},abs:function(){return Math.abs(Mi)},clamp:function(){return Math.max(c.min,Math.min(c.max,Mi))}}[c.op]();if(c.round&&(st=Math.round(st)),!Number.isFinite(st)||Math.abs(st)>1e12){Ai("Variable range exceeded");return}var Qe=ne[c.variableId];ne[c.variableId]=st,Qe!==st&&Jt({kind:"variableChange",variableId:c.variableId,instanceId:x.instanceId})}else if(c.kind==="despawn"){var Rn=(Ut=x.selfInstanceId)!==null&&Ut!==void 0?Ut:x.instanceId;c.target==="other"?kn(x.otherInstanceId):c.target==="both"?(kn(Rn),kn(x.otherInstanceId)):kn(Rn)}else if(c.kind==="changeScene")W=c.sceneId;else if(c.kind==="restart")(at=_?.notifyGameRetry)===null||at===void 0||at.call(_),W="__restart";else if(c.kind==="cameraShake")U?.matches||(Ye={intensity:c.intensity,seconds:c.seconds,elapsed:0});else if(c.kind==="screenFlash")ze.push({color:c.color,opacity:c.opacity,seconds:c.seconds,elapsed:0}),ze.length>8&&ze.shift();else if(c.kind==="floatingText"){var Da=S.get(c.componentId),Cn=x.instanceId?(Wt=Ke([],De(Oe.values()),!1).find(function(Kt){return Kt.instanceId===x.instanceId&&Kt.prototypeId===c.componentId}))!==null&&Wt!==void 0?Wt:Da:(Mt=Le(c.componentId))!==null&&Mt!==void 0?Mt:Da,it=Cn?.sceneId===J?Cn:Da;if(it){var bn=void 0;if(it.contract==="native.mesh3d.v1"&&(bn=Vd(it.id)),!bn){var Si=Vt(it);bn=In(zn(it),Si.width/2,Si.height/2)}we.push({x:bn.x,y:bn.y,text:c.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(on,Wr){var Ni;return String((Ni=ne[Wr])!==null&&Ni!==void 0?Ni:"")}),color:c.color,fontSize:c.fontSize,risePx:c.risePx,seconds:c.seconds,elapsed:0}),we.length>32&&we.shift()}}else if(c.kind==="store")x.kind==="click"&&x.pointerId!==void 0&&!ye&&(ye={pointerId:x.pointerId,targetId:x.targetId,condition:R},(mt=e.setPointerCapture)===null||mt===void 0||mt.call(e,x.pointerId));else if(c.behaviorId){var Kn=n.gameplay.find(function(On){return On.id===c.behaviorId});if(c.kind==="playAudio")dp(Kn);else if(c.kind==="animate"){var Un=S.get(Kn.componentId),Nn=ki(Un)?Ke([],De(Oe.values()),!1).filter(function(xn){return xn.prototypeId===Un.id&&(!x.instanceId||xn.instanceId===x.instanceId)}):[Un],ha=function(xn){var Kt=Kn.id+":"+xn.id;pe=pe.filter(function(Wr){return Wr.id!==Kt});var on=gt({},Kn.parameters);on.fromCurrent&&(on.from=on.property==="opacity"?Vt(xn).opacity:Di(xn)[on.property==="x"?4:5]),pe.push(gt(gt({},Kn),{parameters:on,id:Kt,behaviorId:Kn.id,targetId:xn.id,elapsed:0,baseTransform:Ke([],De(xn.transform),!1)}))};try{for(var fr=Ue(Nn),Mr=fr.next();!Mr.done;Mr=fr.next()){var it=Mr.value;ha(it)}}catch(xn){Z={error:xn}}finally{try{Mr&&!Mr.done&&(V=fr.return)&&V.call(fr)}finally{if(Z)throw Z.error}}}else c.kind==="stopAnimation"?pe=pe.filter(function(On){return On.behaviorId!==Kn.id}):c.kind==="emit"&&Vv(Kn,x)}}function Vv(c,x){var R,A,C,N,P,X,k=c.parameters,Z=k.shape==="pixel-confetti",V=k.shape==="confetti",$=Z||V;if(!($&&U?.matches)){if(fe.length+k.count>256){Ai("Particle budget exhausted");return}if(Z&&k.coverage==="screen"){fe.push.apply(fe,Ke([],De(uv(k)),!1));return}if(V&&k.coverage==="screen"){fe.push.apply(fe,Ke([],De(fv(k)),!1));return}for(var q=S.get(c.componentId),Q=x.instanceId&&(R=Ke([],De(Oe.values()),!1).find(function(Ee){return Ee.instanceId===x.instanceId&&Ee.prototypeId===q.id}))!==null&&R!==void 0?R:q,te=Di(Q),G,ce=Le(Q.parentId);ce;ce=Le(ce.parentId)){if($&&ce.contract==="native.group.v1"&&Vt(ce).clip){G=ce.id;break}te=qs(Di(ce),te)}var me=Vt(Q),ve=k.origin==="anchor"?In(te,0,0):$||k.origin==="center"?In(te,me.width/2,me.height/2):{x:te[4]+Q.parameters.width/2,y:te[5]+Q.parameters.height/2};if(Z){fe.push.apply(fe,Ke([],De(Jh(k,ve,G)),!1));return}if(V){fe.push.apply(fe,Ke([],De($h(k,ve,G)),!1));return}for(var xe=0;xe<k.count;xe++){var oe=((A=k.spread)!==null&&A!==void 0?A:360)===360?xe*2.399963:-Math.PI/2+((xe+.5)/k.count-.5)*((C=k.spread)!==null&&C!==void 0?C:360)*Math.PI/180,be=k.speed*(.5+xe%7/14);fe.push(gt(gt({},ve),{vx:Math.cos(oe)*be,vy:Math.sin(oe)*be,life:(N=k.lifetime)!==null&&N!==void 0?N:.7,gravity:(P=k.gravity)!==null&&P!==void 0?P:250,color:k.color,shape:(X=k.shape)!==null&&X!==void 0?X:"circle"}))}}}function xr(){for(var c=function(){var x,R,A,C,N,P,X=Fe.shift();Tt++;var k=function(oe){return oe===void 0||!!Le(oe)||Ke([],De(Oe.values()),!1).some(function(be){return be.instanceId===oe})};if(!k(X.selfInstanceId)||!k(X.otherInstanceId)||["contactBegin","boundaryExit"].includes(X.kind)&&X.instanceId&&!Oe.has(X.instanceId))return"continue";try{for(var Z=(x=void 0,Ue(n.eventBindings)),V=Z.next();!V.done;V=Z.next()){var $=V.value;if(Object.entries(I.get($.eventId)).every(function(oe){var be=De(oe,2),Ee=be[0],Ie=be[1];return Ee==="id"||X[Ee]===Ie})&&Ja($.condition,X)){try{for(var q=(A=void 0,Ue($.actions)),Q=q.next();!Q.done;Q=q.next()){var te=Q.value;if(Zt>=1024||wt)break;zv(te,X,$.condition)}}catch(oe){A={error:oe}}finally{try{Q&&!Q.done&&(C=q.return)&&C.call(q)}finally{if(A)throw A.error}}if(W)break}}}catch(oe){x={error:oe}}finally{try{V&&!V.done&&(R=Z.return)&&R.call(Z)}finally{if(x)throw x.error}}if(W){var G=W;if(W=void 0,G==="__restart")uc();else if(G!==J){var ce=J;pn(),J=G,le.clear(),Bn.clear(),la.clear(),Za.clear(),mr.clear(),sr.clear(),Dt=[],tn=[],Vr.clear(),D.clear(),yn=void 0,Te=[],fe=[],we=[],ze=[],Ye=void 0,Ae=!1,Ne=0,Oe.clear(),fn.clear(),qi.clear(),$t.clear(),Et.clear(),hn.clear(),Vn.clear(),jt?.reset(),wi.clear(),gi.clear(),he=void 0,rp(),Fe=Fe.filter(function(oe){return oe.kind==="variableChange"}),He.clear(),En=void 0;try{for(var me=(N=void 0,Ue(xt.values())),ve=me.next();!ve.done;ve=me.next()){var xe=ve.value;xe.reset()}}catch(oe){N={error:oe}}finally{try{ve&&!ve.done&&(P=me.return)&&P.call(me)}finally{if(N)throw N.error}}ae.clear(),de.clear(),ie.clear(),pe=[],gr(),E.clear(),se=void 0,mn=void 0,lc(),ap(),ac(0,!1),Xd(),zd(0),Jt({kind:"sceneExit",sceneId:ce}),Jt({kind:"sceneEnter",sceneId:J})}}};Fe.length&&!wt&&Tt<256&&Zt<1024;)c();Fe.length&&Ai("Event/action budget exhausted")}function zn(c){return qs(c.parentId?zn(Le(c.parentId)):ga(),Di(c))}var In=function(c,x,R){return{x:c[0]*x+c[2]*R+c[4],y:c[1]*x+c[3]*R+c[5]}};function zi(c,x){var R=Vt(c),A=[[0,0],[R.width,0],[R.width,R.height],[0,R.height]].map(function(C){var N=De(C,2),P=N[0],X=N[1];return In(x,P,X)});return{left:Math.min.apply(Math,Ke([],De(A.map(function(C){return C.x})),!1)),right:Math.max.apply(Math,Ke([],De(A.map(function(C){return C.x})),!1)),top:Math.min.apply(Math,Ke([],De(A.map(function(C){return C.y})),!1)),bottom:Math.max.apply(Math,Ke([],De(A.map(function(C){return C.y})),!1))}}function ii(c){return Vt(c).visible&&Vt(c).opacity>0&&(!c.parentId||ii(Le(c.parentId)))}function hp(c,x){for(var R=Vt(c),A=zn(c),C=Math.min(R.width,R.height)/2,N=x==="circle"?Array.from({length:32},function(k,Z){return In(A,R.width/2+Math.cos(Z*Math.PI/16)*C,R.height/2+Math.sin(Z*Math.PI/16)*C)}):[[0,0],[R.width,0],[R.width,R.height],[0,R.height]].map(function(k){var Z=De(k,2),V=Z[0],$=Z[1];return In(A,V,$)}),P=c.parentId?Le(c.parentId):void 0,X=function(){var k=Vt(P);if(P.contract==="native.group.v1"&&k.clip){for(var Z=zn(P),V=[[0,0],[k.width,0],[k.width,k.height],[0,k.height]].map(function(G){var ce=De(G,2),me=ce[0],ve=ce[1];return In(Z,me,ve)}),$=0,q=0;q<4;q++)$+=V[q].x*V[(q+1)%4].y-V[(q+1)%4].x*V[q].y;for(var Q=$>=0?1:-1,te=function(G){var ce,me,ve=V[G],xe=V[(G+1)%4],oe=function(Gt){return Q*((xe.x-ve.x)*(Gt.y-ve.y)-(xe.y-ve.y)*(Gt.x-ve.x))},be=N;N=[];var Ee=be[be.length-1],Ie=oe(Ee);try{for(var Ze=(ce=void 0,Ue(be)),lt=Ze.next();!lt.done;lt=Ze.next()){var Xe=lt.value,ht=oe(Xe);if(ht>=0!=Ie>=0){var yt=Ie/(Ie-ht);N.push({x:Ee.x+(Xe.x-Ee.x)*yt,y:Ee.y+(Xe.y-Ee.y)*yt})}ht>=0&&N.push(Xe),Ee=Xe,Ie=ht}}catch(Gt){ce={error:Gt}}finally{try{lt&&!lt.done&&(me=Ze.return)&&me.call(Ze)}finally{if(ce)throw ce.error}}},q=0;q<4&&N.length;q++)te(q)}P=P.parentId?Le(P.parentId):void 0};P;)X();return N}function Gv(c,x){var R,A,C,N,P,X;if(c.length<3||x.length<3)return!1;try{for(var k=Ue([c,x]),Z=k.next();!Z.done;Z=k.next())for(var V=Z.value,$=0;$<V.length;$++){var q=V[$],Q=V[($+1)%V.length],te=q.y-Q.y,G=Q.x-q.x,ce=1/0,me=-1/0,ve=1/0,xe=-1/0;try{for(var oe=(C=void 0,Ue(c)),be=oe.next();!be.done;be=oe.next()){var Ee=be.value,Ie=Ee.x*te+Ee.y*G;ce=Math.min(ce,Ie),me=Math.max(me,Ie)}}catch(Xe){C={error:Xe}}finally{try{be&&!be.done&&(N=oe.return)&&N.call(oe)}finally{if(C)throw C.error}}try{for(var Ze=(P=void 0,Ue(x)),lt=Ze.next();!lt.done;lt=Ze.next()){var Ee=lt.value,Ie=Ee.x*te+Ee.y*G;ve=Math.min(ve,Ie),xe=Math.max(xe,Ie)}}catch(Xe){P={error:Xe}}finally{try{lt&&!lt.done&&(X=Ze.return)&&X.call(Ze)}finally{if(P)throw P.error}}if(me<ve||xe<ce)return!1}}catch(Xe){R={error:Xe}}finally{try{Z&&!Z.done&&(A=k.return)&&A.call(k)}finally{if(R)throw R.error}}return!0}function Hv(c){var x,R,A,C,N=O();try{for(var P=Ue(le.values()),X=P.next();!X.done;X=P.next()){var k=X.value,Z=k.behavior.parameters;if(!(!Z.moveComponentId||k.magnitude<=0)){var V=Le(Z.moveComponentId);if(!(!V||!ii(V))){var $=(A=Z.moveSpeed)!==null&&A!==void 0?A:220,q=An("physics-body",(C=V.prototypeId)!==null&&C!==void 0?C:V.id);if(q&&q.parameters.mode==="dynamic"){var Q=$a(V,q);Q.vx=k.nx*$,Q.vy=k.ny*$,Q.atRest=!1,Q.restElapsed=0}else{var te=xi(V),G=Vt(V),ce=te.x+k.nx*$*c,me=te.y+k.ny*$*c;mp(V)||(ce=Math.max(G.width/2,Math.min(N.width-G.width/2,ce)),me=Math.max(G.height/2,Math.min(N.height-G.height/2,me))),ua(V,ce,me)}Z.orientToMove&&Gs(V,Math.atan2(k.ny,k.nx))}}}}catch(ve){x={error:ve}}finally{try{X&&!X.done&&(R=P.return)&&R.call(P)}finally{if(x)throw x.error}}}function pp(c){var x,R,A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve,xe,oe,be,Ee,Ie,Ze,lt,Xe,ht,yt,Gt,Ut,at,Wt,Mt=O();_e+=c,ig(c),Bv(c),Hv(c),kv(c),Iv();try{for(var mt=Ue(Fn),Qe=mt.next();!Qe.done;Qe=mt.next()){var st=De(Qe.value,2),We=st[0],tt=st[1];!tt.held&&_e-((Ie=tt.releasedAt)!==null&&Ie!==void 0?Ie:_e)>=tt.behavior.springBackSeconds&&Fn.delete(We)}}catch(Xt){x={error:Xt}}finally{try{Qe&&!Qe.done&&(R=mt.return)&&R.call(mt)}finally{if(x)throw x.error}}Ye&&(Ye.elapsed+=c,Ye.elapsed>=Ye.seconds&&(Ye=void 0));try{for(var St=Ue(ze),Ct=St.next();!Ct.done;Ct=St.next()){var Pt=Ct.value;Pt.elapsed+=c}}catch(Xt){A={error:Xt}}finally{try{Ct&&!Ct.done&&(C=St.return)&&C.call(St)}finally{if(A)throw A.error}}ze=ze.filter(function(Xt){return Xt.elapsed<Xt.seconds});try{for(var Nt=Ue(we),Yt=Nt.next();!Yt.done;Yt=Nt.next()){var Bt=Yt.value;Bt.elapsed+=c}}catch(Xt){N={error:Xt}}finally{try{Yt&&!Yt.done&&(P=Nt.return)&&P.call(Nt)}finally{if(N)throw N.error}}we=we.filter(function(Xt){return Xt.elapsed<Xt.seconds});try{for(var it=Ue(xt),Ft=it.next();!Ft.done;Ft=it.next()){var Cn=De(Ft.value,2),We=Cn[0],bn=Cn[1];S.get(We).sceneId===J&&ii(S.get(We))&&bn.tick(c)}}catch(Xt){X={error:Xt}}finally{try{Ft&&!Ft.done&&(k=it.return)&&k.call(it)}finally{if(X)throw X.error}}var _i=function(Xt){var Wn,Ui,Zn=S.get(Xt.componentId);if(Zn.sceneId!==J)return"continue";var br=ki(Zn)?Ke([],De(Oe.values()),!1).filter(function(Xo){return Xo.prototypeId===Zn.id}):[Zn];try{for(var Gn=(Wn=void 0,Ue(br)),Fi=Gn.next();!Fi.done;Fi=Gn.next()){var Gi=Fi.value,Na=Xt.id+":"+Gi.id;if(Xt.kind==="motion"){var Ki=(Ze=He.get(Gi.id))!==null&&Ze!==void 0?Ze:{transform:Ke([],De(Gi.transform),!1),parameters:{}},pa=(lt=Ki.velocity)!==null&&lt!==void 0?lt:{x:Xt.parameters.vx,y:Xt.parameters.vy};pa.y+=Xt.parameters.gravity*c,Ki.transform[4]+=pa.x*c,Ki.transform[5]+=pa.y*c,Ki.velocity=pa,He.set(Gi.id,Ki),Gi.prototypeId&&(Gi.transform=Ki.transform);var Xs=zn(Gi);(Xs[5]>Mt.height||Xs[4]<-300||Xs[4]>Mt.width+300)&&(Ki.exited||(Ki.exited=!0,Jt({kind:"boundaryExit",componentId:Zn.id,instanceId:Gi.instanceId})))}else if(Xt.kind==="timer"){var es=((Xe=ie.get(Na))!==null&&Xe!==void 0?Xe:0)+c;ie.set(Na,es),es>=Xt.parameters.seconds&&es-c<Xt.parameters.seconds&&(Jt({kind:"timer",behaviorId:Xt.id,componentId:Zn.id}),Xt.parameters.repeat&&ie.set(Na,es-Xt.parameters.seconds))}}}catch(Xo){Wn={error:Xo}}finally{try{Fi&&!Fi.done&&(Ui=Gn.return)&&Ui.call(Gn)}finally{if(Wn)throw Wn.error}}};try{for(var ri=Ue(n.gameplay),wn=ri.next();!wn.done;wn=ri.next()){var Rn=wn.value;_i(Rn)}}catch(Xt){Z={error:Xt}}finally{try{wn&&!wn.done&&(V=ri.return)&&V.call(ri)}finally{if(Z)throw Z.error}}Av(c),Rv(c),ac(c),zd(c);var Hn=[],si=function(Xt){var Wn,Ui,Zn=S.get(Xt.componentId);if(Zn.sceneId!==J)return"continue";try{for(var br=(Wn=void 0,Ue(ki(Zn)?Ke([],De(Oe.values()),!1).filter(function(Gi){return Gi.prototypeId===Zn.id}):[Zn])),Gn=br.next();!Gn.done;Gn=br.next()){var Fi=Gn.value;if(ii(Fi)){if(Hn.length>=256){Ai("Collider budget exhausted");break}Hn.push({b:Xt,c:Fi,box:zi(Fi,zn(Fi)),polygon:hp(Fi,Xt.parameters.shape)})}}}catch(Gi){Wn={error:Gi}}finally{try{Gn&&!Gn.done&&(Ui=br.return)&&Ui.call(br)}finally{if(Wn)throw Wn.error}}};try{for(var ai=Ue(n.gameplay.filter(function(Xt){return Xt.kind==="collider"})),qn=ai.next();!qn.done;qn=ai.next()){var Rn=qn.value;si(Rn)}}catch(Xt){$={error:Xt}}finally{try{qn&&!qn.done&&(q=ai.return)&&q.call(ai)}finally{if($)throw $.error}}var Kr=new Set,Gr=new Map,Ii=function(Xt,Wn,Ui){var Zn,br,Gn;((Zn=Wn.c.prototypeId)!==null&&Zn!==void 0?Zn:Wn.c.id)===((br=Ui.c.prototypeId)!==null&&br!==void 0?br:Ui.c.id)&&Wn.c.id>Ui.c.id||Jt(gt(gt({},pi(Xt,Wn.c,Ui.c)),{instanceId:(Gn=Wn.c.instanceId)!==null&&Gn!==void 0?Gn:Ui.c.instanceId}))},Pn=0;e:for(var Ht=0;Ht<Hn.length;Ht++)for(var Rn=Ht+1;Rn<Hn.length;Rn++){var Lt=Hn[Ht],oi=Hn[Rn];if(!(Lt.c.instanceId&&Lt.c.instanceId===oi.c.instanceId)){var $i=Lt.box,_r=oi.box,Hr=$i.left<_r.right&&$i.right>_r.left&&$i.top<_r.bottom&&$i.bottom>_r.top;if(Hr){if(++Pn>4096){Ai("Collision budget exhausted");break e}Hr=Gv(Lt.polygon,oi.polygon)}if(Hr){var Nn=[Lt.c.id,oi.c.id].sort().join("|");if(Kr.add(Nn),Gr.set(Nn,[Lt,oi]),!ae.has(Nn))try{for(var cr=(Q=void 0,Ue([[Lt,oi],[oi,Lt]])),Pr=cr.next();!Pr.done;Pr=cr.next()){var Qa=De(Pr.value,2),Lr=Qa[0],ur=Qa[1];Ii("contactBegin",Lr,ur)}}catch(Wn){Q={error:Wn}}finally{try{Pr&&!Pr.done&&(te=cr.return)&&te.call(cr)}finally{if(Q)throw Q.error}}}}}try{for(var da=Ue(de),dr=da.next();!dr.done;dr=da.next()){var fa=De(dr.value,2),Nn=fa[0],Vi=De(fa[1],2),Lt=Vi[0],oi=Vi[1];if(!Kr.has(Nn))try{for(var Mi=(me=void 0,Ue([[Lt,oi],[oi,Lt]])),ui=Mi.next();!ui.done;ui=Mi.next()){var Da=De(ui.value,2),Lr=Da[0],ur=Da[1];Ii("contactEnd",Lr,ur)}}catch(Zn){me={error:Zn}}finally{try{ui&&!ui.done&&(ve=Mi.return)&&ve.call(Mi)}finally{if(me)throw me.error}}}}catch(Xt){G={error:Xt}}finally{try{dr&&!dr.done&&(ce=da.return)&&ce.call(da)}finally{if(G)throw G.error}}ae=Kr,de=Gr;try{for(var Si=Ue(pe),Kn=Si.next();!Kn.done;Kn=Si.next()){var Ht=Kn.value;Ht.elapsed+=c;var Un=Ht.parameters,ha=(ht=Un.delay)!==null&&ht!==void 0?ht:0,fr=Ht.elapsed-ha;if(!(fr<0)){var Mr=fr/Un.seconds,On=Un.loop?Mr%1:Math.min(1,Mr),xn=(yt=Un.easing)!==null&&yt!==void 0?yt:"ease-out",Kt=On;Un.loop&&xn==="ease-in-out"?Kt=.5-.5*Math.cos(On*Math.PI*2):xn==="ease-out"?Kt=1-Math.pow(1-On,3):xn==="ease-in"?Kt=Math.pow(On,3):xn==="ease-in-out"?Kt=On<.5?4*Math.pow(On,3):1-Math.pow(-2*On+2,3)/2:xn==="back-out"&&(Kt=1+2.70158*Math.pow(On-1,3)+1.70158*Math.pow(On-1,2));var on=Un.from+(Un.to-Un.from)*Kt,Wr=Le((Gt=Ht.targetId)!==null&&Gt!==void 0?Gt:Ht.componentId);if(Wr){var Ni=(Ut=He.get(Wr.id))!==null&&Ut!==void 0?Ut:{transform:Ke([],De(Wr.transform),!1),parameters:{}},Sr=(at=Ht.baseTransform)!==null&&at!==void 0?at:Wr.transform;if(Un.property==="opacity")Ni.parameters.opacity=Math.max(0,Math.min(1,on));else if(["scale","scaleX","scaleY","rotation"].includes(Un.property)){(Wt=Ni.animationAxes)!==null&&Wt!==void 0||(Ni.animationAxes={scale:1,scaleX:1,scaleY:1,rotation:0}),Ni.animationAxes[Un.property]=on;var Qr=Ni.animationAxes,pc=Qr.rotation*Math.PI/180,ws=Math.cos(pc),ja=Math.sin(pc),Ws=Qr.scale*Qr.scaleX,Wo=Qr.scale*Qr.scaleY;Ni.transform[0]=(Sr[0]*ws+Sr[2]*ja)*Ws,Ni.transform[1]=(Sr[1]*ws+Sr[3]*ja)*Ws,Ni.transform[2]=(-Sr[0]*ja+Sr[2]*ws)*Wo,Ni.transform[3]=(-Sr[1]*ja+Sr[3]*ws)*Wo}else Ni.transform[Un.property==="x"?4:5]=on;He.set(Wr.id,Ni),Un.loop&&fr>=Un.seconds&&(Ht.elapsed=ha+fr%Un.seconds)}}}}catch(Xt){xe={error:Xt}}finally{try{Kn&&!Kn.done&&(oe=Si.return)&&oe.call(Si)}finally{if(xe)throw xe.error}}pe=pe.filter(function(Xt){var Wn,Ui;return Le((Wn=Xt.targetId)!==null&&Wn!==void 0?Wn:Xt.componentId)&&(Xt.elapsed<Xt.parameters.seconds+((Ui=Xt.parameters.delay)!==null&&Ui!==void 0?Ui:0)||Xt.parameters.loop)});try{for(var jr=Ue(fe),ea=jr.next();!ea.done;ea=jr.next()){var Un=ea.value;if(Un.shape==="pixel-confetti"||Un.shape==="confetti"){Un.age+=c;continue}Un.life-=c,Un.x+=Un.vx*c,Un.y+=Un.vy*c,Un.vy+=Un.gravity*c}}catch(Xt){be={error:Xt}}finally{try{ea&&!ea.done&&(Ee=jr.return)&&Ee.call(jr)}finally{if(be)throw be.error}}fe=fe.filter(function(Xt){var Wn;return Xt.life>((Wn=Xt.age)!==null&&Wn!==void 0?Wn:0)}),xr()}function dc(c,x){var R,A,C;if(p.beginPath(),c.contract==="native.ellipse.v1")p.ellipse(x.width/2,x.height/2,x.width/2,x.height/2,0,0,Math.PI*2);else if(c.contract==="native.path.v1"){var N=function(q,Q){({M:function(){return p.moveTo.apply(p,Ke([],De(Q),!1))},L:function(){return p.lineTo.apply(p,Ke([],De(Q),!1))},C:function(){return p.bezierCurveTo.apply(p,Ke([],De(Q),!1))},Q:function(){return p.quadraticCurveTo.apply(p,Ke([],De(Q),!1))},Z:function(){return p.closePath()}})[q]()};try{for(var P=Ue(x.commands),X=P.next();!X.done;X=P.next()){var k=De(X.value),Z=k[0],V=k.slice(1);N(Z,V)}}catch(q){R={error:q}}finally{try{X&&!X.done&&(A=P.return)&&A.call(P)}finally{if(R)throw R.error}}}else{var $=Math.min((C=x.radius)!==null&&C!==void 0?C:0,x.width/2,x.height/2);typeof p.roundRect=="function"?p.roundRect(0,0,x.width,x.height,$):(p.moveTo($,0),p.arcTo(x.width,0,x.width,x.height,$),p.arcTo(x.width,x.height,0,x.height,$),p.arcTo(0,x.height,0,0,$),p.arcTo(0,0,x.width,0,$),p.closePath())}}function Wv(c,x,R){var A,C,N,P=(A=He.get(c.id))===null||A===void 0?void 0:A.pathFrame;if(P!==void 0)return Math.min(x.frameCount-1,P);if(f||!x.frameRate)return 0;if(c.contract!=="native.walk-sprite.v1")return Math.floor(Math.max(0,_e-((C=c.spawnTime)!==null&&C!==void 0?C:0))*x.frameRate)%x.frameCount;var X=(N=c.runtimeId)!==null&&N!==void 0?N:c.id,k=Pe.get(X);if(!k)return Pe.set(X,{x:R[4],y:R[5],phase:0,lastMove:-1/0,frame:0}),0;var Z=Math.hypot(R[4]-k.x,R[5]-k.y)>.3;if(Z){var V=_e-k.lastMove;k.phase=Number.isFinite(V)&&V<.25?k.phase+Math.min(V,.12)*x.frameRate:0,k.lastMove=_e}return k.x=R[4],k.y=R[5],_e-k.lastMove>.11&&(k.phase=0),k.frame=Math.floor(k.phase)%x.frameCount,k.frame}function Vo(c,x,R,A){var C,N,P,X,k,Z,V,$,q,Q,te;if(x===void 0&&(x=ga()),R===void 0&&(R=[]),c.contract!=="native.mesh3d.v1"){var G=Vt(c),ce=An("erase-mask",(k=c.prototypeId)!==null&&k!==void 0?k:c.id);if(!(!G.visible||G.opacity<=0)){var me=qs(x,Di(c));p.save(),p.transform.apply(p,Ke([],De(Di(c)),!1)),p.globalAlpha*=G.opacity;var ve=Fn.get(c.id);ve?.behavior.liftShadow&&(p.shadowColor="#00000055",p.shadowBlur=8,p.shadowOffsetY=4);var xe=R;c.contract==="native.group.v1"&&G.clip&&(p.beginPath(),p.rect(0,0,G.width,G.height),p.clip(),xe=Ke(Ke([],De(R),!1),[{matrix:me,width:G.width,height:G.height}],!1));var oe=!1;if(!["native.group.v1","native.text.v1","native.image.v1","native.sprite.v1","native.walk-sprite.v1","native.stage3d.v1","native.mesh3d.v1"].includes(c.contract)){var be=c.contract==="native.button.v1",Ee=se===c.id,Ie=be?G.enabled?Ee?G.pressedFill:an===c.id?G.hoverFill:G.fill:G.disabledFill:G.fill;if(be&&(G.presentation==="pixel-cta"||G.presentation==="shiny-cta")){var Ze=(Z=M.get(c.id))!==null&&Z!==void 0?Z:Ge;E.set(c.id,Ze);var lt=!f&&!U?.matches?Ge-Ze:-1;G.presentation==="shiny-cta"?mv(p,G,Ie,Ee,lt):pv(p,G,Ie,Ee,lt)}else G.pixelFrame&&(p.save(),p.translate(3,4),dc(c,G),p.fillStyle="#3c293366",p.fill(),p.restore()),dc(c,G),ce?(p.save(),p.clip(),zo(c,ce).render(p),p.restore(),oe=!0,dc(c,G)):(p.fillStyle=Ie,p.fill()),G.pixelFrame&&!(G.radius>0)&&(p.fillStyle="#ffffff22",p.fillRect(2,2,Math.max(0,G.width-4),2),p.fillRect(2,2,2,Math.max(0,G.height-4))),G.strokeWidth&&(p.strokeStyle=G.stroke,p.lineWidth=G.strokeWidth,p.stroke());yn===c.id&&(dc(c,G),p.strokeStyle="#ffffff",p.lineWidth=5,p.stroke())}var Xe;if(c.contract==="native.text.v1"){var ht=G.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(wn,Rn){var Hn;return String((Hn=ne[Rn])!==null&&Hn!==void 0?Hn:"")});G.pixelPanel&&(p.fillStyle="#3c293366",p.fillRect(3,4,G.width,G.height),p.fillStyle=G.panelFill,p.fillRect(0,0,G.width,G.height),p.strokeStyle=(V=G.panelStroke)!==null&&V!==void 0?V:G.color,p.lineWidth=2,p.strokeRect(1,1,G.width-2,G.height-2),p.fillStyle="#ffffff22",p.fillRect(3,3,Math.max(0,G.width-6),2));var yt=G.fontFamily==="pixel"?Yh(ht,G):void 0;yt&&!yt.unsupportedChars.length?Xe=cv(p,ht,G):Xe=Qb(p,ht,yt?gt(gt({},G),{fontFamily:"sans-serif",fontWeight:"700"}):G)}if(["native.image.v1","native.sprite.v1","native.walk-sprite.v1"].includes(c.contract)&&!ce){var Gt=b.get((q=($=He.get(c.id))===null||$===void 0?void 0:$.assetId)!==null&&q!==void 0?q:(Q=c.assetSlots[0])===null||Q===void 0?void 0:Q.assetId);if(Gt?.complete&&Gt.naturalWidth){p.save(),p.beginPath(),p.rect(0,0,G.width,G.height),p.clip();var Ut=c.contract!=="native.image.v1",at=Ut?Math.min(G.frameColumns,G.frameCount):1,Wt=Ut?Math.ceil(G.frameCount/at):1,Mt=Gt.width/at,mt=Gt.height/Wt,Qe=Ut?Wv(c,G,me):0,st=Qe%at*Mt,We=Math.floor(Qe/at)*mt,tt=G.fit==="cover"?Math.max(G.width/Mt,G.height/mt):Math.min(G.width/Mt,G.height/mt),St=G.fit==="stretch"?G.width:Mt*tt,Ct=G.fit==="stretch"?G.height:mt*tt;p.imageSmoothingEnabled=(te=G.smoothing)!==null&&te!==void 0?te:!0,p.drawImage(Gt,st,We,Mt,mt,(G.width-St)/2,(G.height-Ct)/2,St,Ct),p.restore()}}if(ce&&!oe&&zo(c,ce).render(p),c.contract==="native.stage3d.v1"&&jt){var st=Math.hypot(me[0],me[1]),We=Math.hypot(me[2],me[3]),Pt=jt.renderStage(c,p,G.width*st*Me*Se,G.height*We*Me*Se,G.width,G.height,{time:_e,ambientTime:Ge,propsOf:Vt,bodies3d:$t,fpsPose:Vn.get(c.id),instances3d:sp(c.id),aimLocked:!!It,groundFn:Js,worldWidth:G.width*st,worldHeight:G.height*We});try{for(var Nt=Ue($t),Yt=Nt.next();!Yt.done;Yt=Nt.next()){var Bt=De(Yt.value,2),it=Bt[0],Ft=Bt[1];if(Ft.stageId===c.id&&Ft.mode==="dynamic"){var Cn=Pt.project({x:Ft.x,y:Ft.y,z:Ft.z},G.width,G.height);hn.set(it,In(me,Cn.x,Cn.y))}}}catch(Hn){C={error:Hn}}finally{try{Yt&&!Yt.done&&(N=Nt.return)&&N.call(Nt)}finally{if(C)throw C.error}}}ue.push({c,m:me,clips:xe,instance:A??c.prototypeId,textMetrics:Xe});try{for(var bn=Ue(yr(c.id)),_i=bn.next();!_i.done;_i=bn.next()){var ri=_i.value;Vo(ri,me,xe,A??c.prototypeId)}}catch(wn){P={error:wn}}finally{try{_i&&!_i.done&&(X=bn.return)&&X.call(bn)}finally{if(P)throw P.error}}G.clip&&c.contract==="native.group.v1"&&Zd(c.id),p.restore()}}}function Zd(c,x){var R,A;if(!U?.matches)try{for(var C=Ue(fe),N=C.next();!N.done;N=C.next()){var P=N.value;P.shape!=="pixel-confetti"&&P.shape!=="confetti"||P.clipId!==c||!!P.screen!=!!x||(p.save(),P.shape==="confetti"?hv(p,P,x):dv(p,P,x),p.restore())}}catch(X){R={error:X}}finally{try{N&&!N.done&&(A=C.return)&&A.call(C)}finally{if(R)throw R.error}}}function Xv(c,x,R,A){p.save(),p.translate(c,x),p.globalAlpha=.92,p.lineWidth=2,p.lineJoin="round",R==="tap"&&(p.strokeStyle="#fff0bd",p.globalAlpha=.7*(1-A),p.beginPath(),p.arc(0,0,12+A*12,0,Math.PI*2),p.stroke(),p.globalAlpha=.92),p.fillStyle="#fff0bd",p.strokeStyle="#193b46",p.beginPath(),p.moveTo(-7,10),p.lineTo(-9,-1),p.quadraticCurveTo(-9,-5,-5,-5),p.lineTo(-3,-3),p.lineTo(-3,-17),p.quadraticCurveTo(-3,-22,1,-22),p.quadraticCurveTo(5,-22,5,-17),p.lineTo(5,-6),p.quadraticCurveTo(9,-9,11,-5),p.quadraticCurveTo(15,-7,16,-2),p.lineTo(14,9),p.quadraticCurveTo(12,18,3,18),p.lineTo(-1,18),p.quadraticCurveTo(-5,17,-7,10),p.closePath(),p.fill(),p.stroke(),p.restore()}function Yv(){var c,x,R,A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve;if(Ne=0,!f)try{for(var xe=Ue(n.gameplay.filter(function(Nn){return Nn.kind==="tutorial-hand"})),oe=xe.next();!oe.done;oe=xe.next()){var be=oe.value,Ee=S.get(be.componentId),Ie=Le(be.parameters.targetId);if(!(!Ee||Ee.sceneId!==J||!Ie||Ie.sceneId!==J||!ii(Ie))&&!(be.parameters.hideOnFirstInput&&Ae)){var Ze=je?_e:Ge;if(!(Ze-Re<be.parameters.idleDelaySeconds)){Ne++;var lt=be.parameters.destinationId?Le(be.parameters.destinationId):void 0,Xe=Vt(Ie),ht=void 0;Ie.contract==="native.mesh3d.v1"&&(ht=Vd(Ie.id)),ht||(ht=In(zn(Ie),Xe.width/2,Xe.height/2));var yt=Ze%1.2/1.2,Gt=U?.matches?0:yt*yt*(3-2*yt),Ut=ht.x,at=ht.y;if(be.parameters.mode!=="tap"){var Wt=lt?In(zn(lt),Vt(lt).width/2,Vt(lt).height/2):{x:ht.x-36,y:ht.y+48};Ut=ht.x+(Wt.x-ht.x)*Gt,at=ht.y+(Wt.y-ht.y)*Gt}Xv(Ut+8,at+22,be.parameters.mode,Gt)}}}}catch(Nn){c={error:Nn}}finally{try{oe&&!oe.done&&(x=xe.return)&&x.call(xe)}finally{if(c)throw c.error}}try{for(var Mt=Ue(sr),mt=Mt.next();!mt.done;mt=Mt.next()){var Qe=De(mt.value,2),st=Qe[0],We=Qe[1],tt=An("draw-stroke",st).parameters;try{for(var St=(C=void 0,Ue(We.strokes)),Ct=St.next();!Ct.done;Ct=St.next()){var Pt=Ct.value;if(!(Pt.points.length<2)){p.save(),p.globalAlpha=tt.mode==="slice-blade"?Math.max(0,1-Pt.age/.18):1,p.strokeStyle=tt.color,p.lineWidth=tt.strokeWidth,p.lineCap="round",p.lineJoin="round",p.beginPath(),p.moveTo(Pt.points[0].x,Pt.points[0].y);try{for(var Nt=(P=void 0,Ue(Pt.points.slice(1))),Yt=Nt.next();!Yt.done;Yt=Nt.next()){var Bt=Yt.value;p.lineTo(Bt.x,Bt.y)}}catch(Nn){P={error:Nn}}finally{try{Yt&&!Yt.done&&(X=Nt.return)&&X.call(Nt)}finally{if(P)throw P.error}}p.stroke(),p.restore()}}}catch(Nn){C={error:Nn}}finally{try{Ct&&!Ct.done&&(N=St.return)&&N.call(St)}finally{if(C)throw C.error}}}}catch(Nn){R={error:Nn}}finally{try{mt&&!mt.done&&(A=Mt.return)&&A.call(Mt)}finally{if(R)throw R.error}}try{for(var it=Ue(tn),Ft=it.next();!Ft.done;Ft=it.next()){var Cn=Ft.value;if(!(Cn.broken||!Cn.drawRope)){var bn=fn.get(Cn.bodyId),_i=Le(Cn.anchorId);if(!(!bn||!_i)){var ri=xi(_i);p.save(),p.strokeStyle=Cn.ropeColor,p.lineWidth=Cn.ropeWidth,p.beginPath(),p.moveTo(ri.x,ri.y),p.lineTo(bn.x,bn.y),p.stroke(),p.restore()}}}}catch(Nn){k={error:Nn}}finally{try{Ft&&!Ft.done&&(Z=it.return)&&Z.call(it)}finally{if(k)throw k.error}}try{for(var wn=Ue(n.gameplay.filter(function(Nn){var cr;return Nn.kind==="virtual-joystick"&&((cr=S.get(Nn.componentId))===null||cr===void 0?void 0:cr.sceneId)===J})),Rn=wn.next();!Rn.done;Rn=wn.next()){var be=Rn.value,Hn=Le(be.componentId),Xe=be.parameters;if(!(!Hn||!ii(Hn)||Xe.drawControl===!1)){var si=le.get(be.id),ai=si&&si.pointerId!==null?si.origin:xi(Hn),qn=si&&si.pointerId!==null?si.knobX:ai.x,Kr=si&&si.pointerId!==null?si.knobY:ai.y,Gr=(ce=Xe.radiusPx)!==null&&ce!==void 0?ce:56;p.save(),p.fillStyle=(me=Xe.baseColor)!==null&&me!==void 0?me:"#ffffff44",p.strokeStyle="#ffffffaa",p.lineWidth=2.5,p.beginPath(),p.arc(ai.x,ai.y,Gr,0,Math.PI*2),p.fill(),p.stroke(),p.fillStyle=(ve=Xe.knobColor)!==null&&ve!==void 0?ve:"#fff0bdee",p.strokeStyle="#193b46aa",p.lineWidth=2,p.beginPath(),p.arc(qn,Kr,Gr*.42,0,Math.PI*2),p.fill(),p.stroke(),p.restore()}}}catch(Nn){V={error:Nn}}finally{try{Rn&&!Rn.done&&($=wn.return)&&$.call(wn)}finally{if(V)throw V.error}}try{for(var Ii=Ue(we),Pn=Ii.next();!Pn.done;Pn=Ii.next()){var Ht=Pn.value,Lt=Math.min(1,Ht.elapsed/Ht.seconds);p.save(),p.globalAlpha=1-Lt,p.fillStyle=Ht.color,p.strokeStyle="#193b46",p.lineWidth=3,p.font="900 "+Ht.fontSize+"px sans-serif",p.textAlign="center",p.textBaseline="middle";var at=Ht.y-(U?.matches?0:Ht.risePx*Lt);p.strokeText(Ht.text,Ht.x,at),p.fillText(Ht.text,Ht.x,at),p.restore()}}catch(Nn){q={error:Nn}}finally{try{Pn&&!Pn.done&&(Q=Ii.return)&&Q.call(Ii)}finally{if(q)throw q.error}}try{for(var oi=Ue(ze),$i=oi.next();!$i.done;$i=oi.next()){var _r=$i.value,Lt=Math.min(1,_r.elapsed/_r.seconds),Hr=O();p.save(),p.globalAlpha=_r.opacity*(1-Lt),p.fillStyle=_r.color,p.fillRect(0,0,Hr.width,Hr.height),p.restore()}}catch(Nn){te={error:Nn}}finally{try{$i&&!$i.done&&(G=oi.return)&&G.call(oi)}finally{if(te)throw te.error}}}function qv(){if(he){var c=fn.get(he.targetId),x=he.behavior.parameters;if(c){var R=he.current.x-he.start.x,A=he.current.y-he.start.y,C=Math.hypot(R,A),N=Math.min(x.maxPullPx,C),P=C>.001?N/C:0;p.save(),p.lineCap="round";var X=Math.max(12,Math.min(c.width,c.height)*.62);if(p.strokeStyle="#173a2f66",p.lineWidth=3.5,p.beginPath(),p.arc(c.x,c.y,X,0,Math.PI*2),p.stroke(),p.strokeStyle=x.trajectoryColor,p.lineWidth=2,p.beginPath(),p.arc(c.x,c.y,X,0,Math.PI*2),p.stroke(),x.showTrajectory&&C>=x.minPullPx){var k=Jd(),Z=ip(),V=Z.bodies,$=Z.zones,q=O(),Q=tm({body:gt(gt({},c),{vx:k.vx,vy:k.vy,atRest:!1}),bodies:V,zones:$,bounds:{left:0,top:0,right:q.width,bottom:q.height},dots:x.trajectoryDots,bounces:x.trajectoryBounces});Q.forEach(function(ce,me){var ve=.96-.52*(me/Math.max(1,Q.length)),xe=Math.max(2.2,4.5-me*.22);p.globalAlpha=ve,p.fillStyle="#173a2f88",p.beginPath(),p.arc(ce.x,ce.y,xe+1.3,0,Math.PI*2),p.fill(),p.fillStyle=x.trajectoryColor,p.beginPath(),p.arc(ce.x,ce.y,xe,0,Math.PI*2),p.fill()})}if(C>=4){var te=c.x+R*P,G=c.y+A*P;p.globalAlpha=.9,p.strokeStyle="#173a2f66",p.lineWidth=5,p.beginPath(),p.moveTo(c.x,c.y),p.lineTo(te,G),p.stroke(),p.strokeStyle=x.trajectoryColor,p.lineWidth=2.6,p.beginPath(),p.moveTo(c.x,c.y),p.lineTo(te,G),p.stroke(),p.fillStyle="#173a2f88",p.beginPath(),p.arc(te,G,5.2,0,Math.PI*2),p.fill(),p.fillStyle=x.trajectoryColor,p.beginPath(),p.arc(te,G,3.6,0,Math.PI*2),p.fill()}p.restore()}}}function Zv(c){var x,R,A,C;try{for(var N=Ue(Pa()),P=N.next();!P.done;P=N.next()){var X=P.value,k=X.contract==="native.group.v1"?yr(X.id):[X];try{for(var Z=(A=void 0,Ue(k)),V=Z.next();!V.done;V=Z.next()){var $=V.value;if($.contract==="native.stage3d.v1"&&ii($)&&Vt($).skyColor)return Vt($).skyColor;if(!($.contract!=="native.rectangle.v1"||!ii($))){var q=Vt($);if(!(q.opacity<.95||!q.fill||q.fill==="transparent")&&(/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test($.id)||q.width>=c.width*.9&&q.height>=c.height*.9))return q.fill}}}catch(Q){A={error:Q}}finally{try{V&&!V.done&&(C=Z.return)&&C.call(Z)}finally{if(A)throw A.error}}}}catch(Q){x={error:Q}}finally{try{P&&!P.done&&(R=N.return)&&R.call(N)}finally{if(x)throw x.error}}return"#102a34"}function Jv(){var c;if(et&&ii(et.c)){var x=et.c,R=Vt(x);p.save(),p.transform.apply(p,Ke([],De(zn(x)),!1)),p.strokeStyle=(c=et.highlightColor)!==null&&c!==void 0?c:"#ffffff",p.lineWidth=4,p.globalAlpha=.85,p.strokeRect(-4,-4,R.width+8,R.height+8),p.restore()}if(rt?.b.parameters.bringToFront){var x=Le(rt.targetId);x&&Vo(x,x.parentId?zn(Le(x.parentId)):ga(),[],x.prototypeId)}}function ei(){var c,x,R,A,C,N;M=E,E=new Map;var P=O();Y!==void 0&&Y!==P.landscape&&gr(),Y=P.landscape;var X=Math.min(devicePixelRatio||1,2),k=e.clientWidth,Z=e.clientHeight;(e.width!==Math.round(k*X)||e.height!==Math.round(Z*X))&&(e.width=Math.round(k*X),e.height=Math.round(Z*X)),p.setTransform(X,0,0,X,0,0),p.fillStyle=Zv(P),p.fillRect(0,0,k,Z);var V=Math.min(k/P.width,Z/P.height),$=(k-P.width*V)/2,q=(Z-P.height*V)/2;if(Me=V||1,Se=X,p.translate($,q),p.scale(V,V),Ye){var Q=Math.min(1,Ye.elapsed/Ye.seconds),te=Ye.intensity*(1-Q);p.translate(Math.sin(Ye.elapsed*95)*te,Math.cos(Ye.elapsed*113)*te)}p.save(),p.beginPath(),p.rect(0,0,P.width,P.height),p.clip(),ue=[];try{for(var G=Ue(Pa()),ce=G.next();!ce.done;ce=G.next()){var me=ce.value;Vo(me)}}catch(at){c={error:at}}finally{try{ce&&!ce.done&&(x=G.return)&&x.call(G)}finally{if(c)throw c.error}}try{for(var ve=Ue(Te),xe=ve.next();!xe.done;xe=ve.next()){var me=xe.value;me.parentId||Vo(me,ga(),[],me.prototypeId)}}catch(at){R={error:at}}finally{try{xe&&!xe.done&&(A=ve.return)&&A.call(ve)}finally{if(R)throw R.error}}if(Jv(),qv(),f&&w){for(var oe=S.get(w);oe?.parentId;)oe=S.get(oe.parentId);oe?.prototype&&Vo(oe)}Zd(),p.save();try{for(var be=Ue(fe),Ee=be.next();!Ee.done;Ee=be.next()){var Ie=Ee.value;if(!(Ie.shape==="pixel-confetti"||Ie.shape==="confetti")){var Ze=Math.min(1,Ie.life*2),lt=1.5+2.5*Ze;if(p.globalAlpha=Ze,p.globalCompositeOperation=Ie.shape==="square"?"source-over":"lighter",p.fillStyle=Ie.color,Ie.shape==="square"){var Xe=Math.max(2,Math.round(lt*1.6));p.fillRect(Math.round(Ie.x-Xe/2),Math.round(Ie.y-Xe/2),Xe,Xe);continue}p.globalCompositeOperation="lighter",p.shadowColor=Ie.color,p.shadowBlur=fe.length<=16?6:0,p.strokeStyle=Ie.color,p.lineWidth=1.5+Ze,p.beginPath(),p.moveTo(Ie.x-Ie.vx*.025,Ie.y-Ie.vy*.025),p.lineTo(Ie.x,Ie.y),p.stroke(),p.beginPath(),p.arc(Ie.x,Ie.y,lt,0,Math.PI*2),p.fill()}}}catch(at){C={error:at}}finally{try{Ee&&!Ee.done&&(N=be.return)&&N.call(be)}finally{if(C)throw C.error}}if(p.restore(),Yv(),f&&w){var ht=ue.filter(function(at){return at.c.contract!=="native.group.v1"&&(at.c.id===w||Rr(at.c,w))});if(ht.length){var yt=ht.map(function(at){return zi(at.c,at.m)}),Gt=Math.min.apply(Math,Ke([],De(yt.map(function(at){return at.left})),!1)),Ut=Math.min.apply(Math,Ke([],De(yt.map(function(at){return at.top})),!1));p.strokeStyle="#55e6ef",p.lineWidth=2/V,p.strokeRect(Gt,Ut,Math.max.apply(Math,Ke([],De(yt.map(function(at){return at.right})),!1))-Gt,Math.max.apply(Math,Ke([],De(yt.map(function(at){return at.bottom})),!1))-Ut)}}p.restore(),V>0&&Zd(void 0,{x:-$/V,y:-q/V,width:k/V,height:Z/V})}function $v(c){var x,R,A,C,N=Array.isArray(c)?Ke([],De(new Set(c)),!1):void 0;ei();var P=O(),X=new Set,k=[];try{for(var Z=Ue(ue),V=Z.next();!V.done;V=Z.next()){var $=V.value,q=(A=$.c.prototypeId)!==null&&A!==void 0?A:$.c.id;if(!($.c.contract==="native.group.v1"||N&&!N.includes(q))){X.add(q);var Q=zi($.c,$.m),te=((C=Vt($.c).strokeWidth)!==null&&C!==void 0?C:0)/2;Q.left-=te,Q.right+=te,Q.top-=te,Q.bottom+=te;var G={left:Math.max(0,-Q.left),right:Math.max(0,Q.right-P.width),top:Math.max(0,-Q.top),bottom:Math.max(0,Q.bottom-P.height)};Object.values(G).some(function(me){return me>.01})&&k.push({id:q,contract:$.c.contract,bounds:Q,overflow:G})}}}catch(me){x={error:me}}finally{try{V&&!V.done&&(R=Z.return)&&R.call(Z)}finally{if(x)throw x.error}}var ce=N?N.filter(function(me){return!X.has(me)}):[];return{ok:k.length===0&&ce.length===0,viewport:gt(gt({},P),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight}),issues:k,missing:ce}}function Kv(c){var x,R,A,C,N,P,X,k,Z,V,$,q,Q,te,G,ce,me,ve,xe,oe,be,Ee,Ie,Ze,lt,Xe,ht,yt,Gt,Ut,at,Wt,Mt,mt=c===void 0?{}:c,Qe=mt.ids,st=mt.interactiveIds,We=mt.network,tt=We===void 0?"standalone":We,St=mt.minTouchPx,Ct=St===void 0?44:St,Pt=Array.isArray(Qe)?Ke([],De(new Set(Qe)),!1):void 0;ei();var Nt=O(),Yt=Math.min(e.clientWidth/Nt.width,e.clientHeight/Nt.height),Bt=np(Nt,tt),it=[],Ft=new Set,Cn=function(Ce){var Ot;return!Pt||Pt.includes((Ot=Ce.c.prototypeId)!==null&&Ot!==void 0?Ot:Ce.c.id)},bn=ue.filter(Cn),_i=new Set(n.events.filter(function(Ce){return Ce.kind==="click"}).map(function(Ce){return Ce.componentId}));try{for(var ri=Ue(n.gameplay),wn=ri.next();!wn.done;wn=ri.next()){var Rn=wn.value;["drag","match-tile","aim-launch","aim-launch-3d","swipe-input","hold-charge","virtual-joystick","draw-stroke","erase-mask"].includes(Rn.kind)&&_i.add(Rn.componentId)}}catch(Ce){x={error:Ce}}finally{try{wn&&!wn.done&&(R=ri.return)&&R.call(ri)}finally{if(x)throw x.error}}var Hn=new Set(st??_i),si=new Set(n.gameplay.filter(function(Ce){return["aim-launch","aim-launch-3d","swipe-input","hold-charge","draw-stroke","virtual-joystick"].includes(Ce.kind)&&(Ce.parameters.dragMode==="anywhere"||Ce.kind==="draw-stroke"||Ce.kind==="virtual-joystick"&&Ce.parameters.mode==="floating")}).map(function(Ce){return Ce.componentId})),ai=function(Ce){var Ot;return Hn.has((Ot=Ce.c.prototypeId)!==null&&Ot!==void 0?Ot:Ce.c.id)},qn=function(Ce,Ot,qt,_n,Ti,di){return it.push(gt(gt({kind:Ce,severity:Ot,id:qt},di?{otherId:di}:{}),{detail:_n,metrics:Ti}))},Kr=function(Ce){var Ot=[[0,0],[Ce.width,0],[Ce.width,Ce.height],[0,Ce.height]].map(function(qt){var _n=De(qt,2),Ti=_n[0],di=_n[1];return In(Ce.matrix,Ti,di)});return{left:Math.min.apply(Math,Ke([],De(Ot.map(function(qt){return qt.x})),!1)),right:Math.max.apply(Math,Ke([],De(Ot.map(function(qt){return qt.x})),!1)),top:Math.min.apply(Math,Ke([],De(Ot.map(function(qt){return qt.y})),!1)),bottom:Math.max.apply(Math,Ke([],De(Ot.map(function(qt){return qt.y})),!1))}};try{for(var Gr=Ue(bn),Ii=Gr.next();!Ii.done;Ii=Gr.next()){var Pn=Ii.value,Ht=(Ie=Pn.c.prototypeId)!==null&&Ie!==void 0?Ie:Pn.c.id;Ft.add(Ht);var Lt=zi(Pn.c,Pn.m),oi=((Ze=Vt(Pn.c).strokeWidth)!==null&&Ze!==void 0?Ze:0)/2;Lt.left-=oi,Lt.right+=oi,Lt.top-=oi,Lt.bottom+=oi;var $i=Pn.c.contract==="native.group.v1"&&!Vt(Pn.c).clip,_r=Pn.c.contract==="native.image.v1"&&Pn.clips.length===0&&Vt(Pn.c).fit==="cover"&&Lt.left<=0&&Lt.top<=0&&Lt.right>=Nt.width&&Lt.bottom>=Nt.height||Pn.c.contract==="native.stage3d.v1"&&Lt.left<=0&&Lt.top<=0&&Lt.right>=Nt.width&&Lt.bottom>=Nt.height,Hr=Pn.c.contract==="native.rectangle.v1"&&oi===0&&Lt.left<=0&&Lt.top<=0&&Lt.right>=Nt.width&&Lt.bottom>=Nt.height||_r;if(!$i){var Nn={left:Math.max(0,-Lt.left),right:Math.max(0,Lt.right-Nt.width),top:Math.max(0,-Lt.top),bottom:Math.max(0,Lt.bottom-Nt.height)};if(!Hr&&!mp(Pn.c)&&Object.values(Nn).some(function(Ce){return Ce>.01})&&qn("stage-overflow","blocker",Ht,"Component extends beyond the active stage.",{bounds:Lt,overflow:Nn}),Pn.c.contract==="native.image.v1"&&Pn.clips.length===0){var cr=Lt.right-Lt.left,Pr=Lt.bottom-Lt.top,Qa=/(?:^|\.)(backdrop|background|bg)$/.test(Ht)||Vt(Pn.c).fit==="cover"&&!Pn.c.parentId&&Lt.left<=1&&Lt.top<=1&&(cr>=Nt.width*.4||Pr>=Nt.height*.4);Qa&&(Lt.left>.5||Lt.top>.5||Lt.right<Nt.width-.5||Lt.bottom<Nt.height-.5)&&qn("backdrop-incomplete","blocker",Ht,"Backdrop image does not cover the full active stage, leaving a visible seam.",{bounds:Lt,stage:{width:Nt.width,height:Nt.height}})}try{for(var Lr=(N=void 0,Ue(Pn.clips)),ur=Lr.next();!ur.done;ur=Lr.next()){var da=ur.value,dr=Kr(da),fa={left:Math.max(0,dr.left-Lt.left),right:Math.max(0,Lt.right-dr.right),top:Math.max(0,dr.top-Lt.top),bottom:Math.max(0,Lt.bottom-dr.bottom)};Object.values(fa).some(function(Ce){return Ce>.01})&&qn("parent-clip-crop","blocker",Ht,"Component is cropped by an ancestor clipping group.",{bounds:Lt,clip:dr,crop:fa})}}catch(Ce){N={error:Ce}}finally{try{ur&&!ur.done&&(P=Lr.return)&&P.call(Lr)}finally{if(N)throw N.error}}}if(Pn.textMetrics){var Vi=Pn.textMetrics;(Vi.overflowsWidth||Vi.overflowsHeight)&&qn("text-overflow","blocker",Ht,"Text does not fit its component after wrapping and auto-fit.",Vi);var Mi=(lt=Vi.fontSize)!==null&&lt!==void 0?lt:Vi.scale*8;Mi<12&&qn("text-illegible",Mi<8?"blocker":"warning",Ht,"Rendered text is below the recommended legible size.",gt({renderedFontSize:Mi},Vi));var ui=Vt(Pn.c);if(ui.pixelPanel&&ui.align!=="center"){var Da=Math.max(0,ui.width-2*(ui.padding===void 0?8:ui.padding));Da-((Xe=Vi.renderedWidth)!==null&&Xe!==void 0?Xe:0)>12&&qn("panel-off-center","blocker",Ht,"Text inside a framed pixel panel is not horizontally centered.",{align:ui.align,innerWidth:Da,renderedWidth:(ht=Vi.renderedWidth)!==null&&ht!==void 0?ht:0})}}if(ai(Pn)&&!si.has(Ht)&&(Pn.c.contract!=="native.group.v1"||Lt.right>Lt.left&&Lt.bottom>Lt.top)){var Si=(Lt.right-Lt.left)*Yt,Kn=(Lt.bottom-Lt.top)*Yt;(Si<Ct-.01||Kn<Ct-.01)&&qn("touch-target-small","blocker",Ht,"Interactive target is smaller than the required physical touch size.",{width:Si,height:Kn,minTouchPx:Ct,scale:Yt})}if(ai(Pn)&&!si.has(Ht)||Pn.c.contract==="native.text.v1")try{for(var Un=(X=void 0,Ue(Bt.zones)),ha=Un.next();!ha.done;ha=Un.next()){var fr=ha.value,Si=Math.min(Lt.right,fr.right)-Math.max(Lt.left,fr.left),Kn=Math.min(Lt.bottom,fr.bottom)-Math.max(Lt.top,fr.top);Si>.01&&Kn>.01&&qn("sdk-safe-area-collision","blocker",Ht,"Component intersects a reserved ad-SDK overlay zone.",{bounds:Lt,zone:fr,intersection:{width:Si,height:Kn},network:tt})}}catch(Ce){X={error:Ce}}finally{try{ha&&!ha.done&&(k=Un.return)&&k.call(Un)}finally{if(X)throw X.error}}}}catch(Ce){A={error:Ce}}finally{try{Ii&&!Ii.done&&(C=Gr.return)&&C.call(Gr)}finally{if(A)throw A.error}}for(var Mr=bn.filter(function(Ce){return ai(Ce)&&Ce.c.contract!=="native.group.v1"}),On=0;On<Mr.length;On++)for(var xn=On+1;xn<Mr.length;xn++){var Kt=Mr[On],on=Mr[xn],Wr=(yt=Kt.c.prototypeId)!==null&&yt!==void 0?yt:Kt.c.id,Ni=(Gt=on.c.prototypeId)!==null&&Gt!==void 0?Gt:on.c.id;if(!(Wr===Ni||Rr(Kt.c,on.c.id)||Rr(on.c,Kt.c.id))){var Sr=zi(Kt.c,Kt.m),Qr=zi(on.c,on.m),Si=Math.min(Sr.right,Qr.right)-Math.max(Sr.left,Qr.left),Kn=Math.min(Sr.bottom,Qr.bottom)-Math.max(Sr.top,Qr.top);Si>1&&Kn>1&&qn("interactive-overlap","blocker",Wr,"Interactive targets overlap.",{intersection:{width:Si,height:Kn},first:Sr,second:Qr},Ni)}}var pc=function(Ce){if(!Ce||Ce==="transparent")return!1;var Ot=/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.exec(Ce);if(Ot)return Ot[1].length===4?Ot[1][3].toLowerCase()==="f":Ot[1].slice(6).toLowerCase()==="ff";var qt=/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\s*\)$/i.exec(Ce);return qt?Number(qt[1])>=.95:!0},ws=[];bn.forEach(function(Ce,Ot){var qt,_n;Ce.c.contract==="native.rectangle.v1"&&!ai(Ce)&&((qt=Vt(Ce.c).opacity)!==null&&qt!==void 0?qt:1)>=.95&&pc(Vt(Ce.c).fill)&&ws.push({rowIndex:Ot,row:Ce,order:(_n=Ce.c.order)!==null&&_n!==void 0?_n:0,bounds:zi(Ce.c,Ce.m)})});var ja=bn.filter(function(Ce,Ot){var qt,_n=zi(Ce.c,Ce.m),Ti=(qt=Ce.c.order)!==null&&qt!==void 0?qt:0;return!ws.some(function(di){return di.rowIndex>Ot&&di.order>Ti&&di.row.c.id!==Ce.c.id&&!Rr(di.row.c,Ce.c.id)&&!Rr(Ce.c,di.row.c.id)&&di.bounds.left<=_n.left+1&&di.bounds.right>=_n.right-1&&di.bounds.top<=_n.top+1&&di.bounds.bottom>=_n.bottom-1})}),Ws=ja.map(function(Ce,Ot){return{row:Ce,rowIndex:Ot}}).filter(function(Ce){var Ot,qt=Ce.row;if(qt.c.contract!=="native.rectangle.v1")return!1;var _n=zi(qt.c,qt.m),Ti=_n.right-_n.left,di=_n.bottom-_n.top,Ua=((Ot=Vt(qt.c).strokeWidth)!==null&&Ot!==void 0?Ot:0)===0&&_n.left<=0&&_n.right>=Nt.width;return!Ua&&Ti>=180&&di>=140&&!ai(qt)}).map(function(Ce){var Ot,qt=Ce.row,_n=Ce.rowIndex;return{id:(Ot=qt.c.prototypeId)!==null&&Ot!==void 0?Ot:qt.c.id,row:qt,rowIndex:_n,bounds:zi(qt.c,qt.m)}}),Wo=function(Ce,Ot,qt,_n){var Ti,di;_n===void 0&&(_n=!1);var Ua=(Ti=Ce.c.prototypeId)!==null&&Ti!==void 0?Ti:Ce.c.id,Qo=(qt.left+qt.right)/2,Fa=(qt.top+qt.bottom)/2,rf=(di=Ce.c.order)!==null&&di!==void 0?di:0;return Ws.filter(function(Qn){var Oa;return Qn.id!==Ua&&(!_n||Qn.rowIndex<Ot||((Oa=Qn.row.c.order)!==null&&Oa!==void 0?Oa:0)===rf)&&qt.right-qt.left<=Qn.bounds.right-Qn.bounds.left+4&&qt.bottom-qt.top<=Qn.bounds.bottom-Qn.bounds.top+4&&Qo>=Qn.bounds.left&&Qo<=Qn.bounds.right&&Fa>=Qn.bounds.top&&Fa<=Qn.bounds.bottom}).sort(function(Qn,Oa){return(Qn.bounds.right-Qn.bounds.left)*(Qn.bounds.bottom-Qn.bounds.top)-(Oa.bounds.right-Oa.bounds.left)*(Oa.bounds.bottom-Oa.bounds.top)||Oa.rowIndex-Qn.rowIndex})[0]},jr=new Map,ea=new Map;if(Ws.length){ja.forEach(function(Ce,Ot){var qt,_n=(qt=Ce.c.prototypeId)!==null&&qt!==void 0?qt:Ce.c.id,Ti=zi(Ce.c,Ce.m),di=(Ti.left+Ti.right)/2,Ua=(Ti.top+Ti.bottom)/2,Qo=Ce.c.contract==="native.button.v1"&&!Dn.has(Ce.c.id),Fa=Ce.c.parentId?Le(Ce.c.parentId):void 0,rf=Ce.c.contract==="native.text.v1"&&Vt(Ce.c).align==="center"&&Fa?.contract!=="native.button.v1";if(Qo||rf){var Qn=Wo(Ce,Ot,Ti,!1);Qn&&(jr.has(Qn.id)||jr.set(Qn.id,{panel:Qn,items:[]}),jr.get(Qn.id).items.push({id:_n,bounds:Ti,cx:di,cy:Ua,isBtn:Qo}))}if(["native.text.v1","native.image.v1","native.button.v1"].includes(Ce.c.contract)&&Fa?.contract!=="native.button.v1"){var Qn=Wo(Ce,Ot,Ti,!0);Qn&&(ea.has(Qn.id)||ea.set(Qn.id,{panel:Qn,content:[]}),ea.get(Qn.id).content.push({row:Ce,id:_n,bounds:Ti}))}});try{for(var Xt=Ue(jr.values()),Wn=Xt.next();!Wn.done;Wn=Xt.next()){var Ui=Wn.value,Zn=Ui.panel,br=Ui.items;if(br.some(function(Ce){return Ce.isBtn})){var Gn=Zn.bounds,Fi=(Gn.left+Gn.right)/2;try{for(var Gi=($=void 0,Ue(br)),Na=Gi.next();!Na.done;Na=Gi.next()){var Ki=Na.value,pa={left:Ki.bounds.left-Gn.left,right:Gn.right-Ki.bounds.right,top:Ki.bounds.top-Gn.top,bottom:Gn.bottom-Ki.bounds.bottom},Xs=Math.min(pa.left,pa.right,pa.top,pa.bottom);(Xs<10||Xs*Yt<8)&&qn("panel-edge-cramped","blocker",Ki.id,"Element sits too close to its enclosing panel edge.",{panelId:Zn.id,margins:pa,scale:Yt,minStagePx:10,minCssPx:8},Zn.id)}}catch(Ce){$={error:Ce}}finally{try{Na&&!Na.done&&(q=Gi.return)&&q.call(Gi)}finally{if($)throw $.error}}var es=[],Xo=function(Ce){var Ot=es.find(function(qt){return Math.abs(qt.cy-Ce.cy)<=16&&qt.isBtn===Ce.isBtn});Ot?Ot.items.push(Ce):es.push({cy:Ce.cy,isBtn:Ce.isBtn,items:[Ce]})};try{for(var mc=(Q=void 0,Ue(br)),Yo=mc.next();!Yo.done;Yo=mc.next()){var Ki=Yo.value;Xo(Ki)}}catch(Ce){Q={error:Ce}}finally{try{Yo&&!Yo.done&&(te=mc.return)&&te.call(mc)}finally{if(Q)throw Q.error}}try{for(var vc=(G=void 0,Ue(es)),qo=vc.next();!qo.done;qo=vc.next()){var tf=qo.value,lg=Math.min.apply(Math,Ke([],De(tf.items.map(function(Ce){return Ce.bounds.left})),!1)),cg=Math.max.apply(Math,Ke([],De(tf.items.map(function(Ce){return Ce.bounds.right})),!1)),wp=(lg+cg)/2,Tp=wp-Fi;Math.abs(Tp)>3&&qn("panel-off-center","blocker",tf.items[0].id,"Element is not horizontally centered inside its enclosing panel.",{panelId:Zn.id,offsetX:Tp,groupCenterX:wp,panelCenterX:Fi,scale:Yt},Zn.id)}}catch(Ce){G={error:Ce}}finally{try{qo&&!qo.done&&(ce=vc.return)&&ce.call(vc)}finally{if(G)throw G.error}}}}}catch(Ce){Z={error:Ce}}finally{try{Wn&&!Wn.done&&(V=Xt.return)&&V.call(Xt)}finally{if(Z)throw Z.error}}try{for(var gc=Ue(ea.values()),Zo=gc.next();!Zo.done;Zo=gc.next())for(var Ep=Zo.value,Zn=Ep.panel,yc=Ep.content,ug=jr.has(Zn.id),On=0;On<yc.length;On++)for(var xn=On+1;xn<yc.length;xn++){var Kt=yc[On],on=yc[xn];if(!(Kt.id===on.id||Rr(Kt.row.c,on.row.c.id)||Rr(on.row.c,Kt.row.c.id))){var dg=Kt.row.c.contract==="native.image.v1"&&on.row.c.contract==="native.image.v1";if(!(dg&&(!ug||Kt.row.c.parentId&&Kt.row.c.parentId===on.row.c.parentId))){var Si=Math.min(Kt.bounds.right,on.bounds.right)-Math.max(Kt.bounds.left,on.bounds.left),Kn=Math.min(Kt.bounds.bottom,on.bounds.bottom)-Math.max(Kt.bounds.top,on.bounds.top);Si>2&&Kn>2&&qn("panel-content-overlap","blocker",Kt.id,"Panel elements overlap each other.",{panelId:Zn.id,intersection:{width:Si,height:Kn},first:Kt.bounds,second:on.bounds},on.id)}}}}catch(Ce){me={error:Ce}}finally{try{Zo&&!Zo.done&&(ve=gc.return)&&ve.call(gc)}finally{if(me)throw me.error}}}var Ys=ja.filter(function(Ce){if(Ce.c.contract!=="native.text.v1")return!1;var Ot=Ce.c.parentId?Le(Ce.c.parentId):void 0;return Ot?.contract!=="native.button.v1"}).map(function(Ce){var Ot,qt,_n=String((Ot=Vt(Ce.c).text)!==null&&Ot!==void 0?Ot:"").replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(Ti,di){var Ua;return String((Ua=ne[di])!==null&&Ua!==void 0?Ua:"")}).trim();return{row:Ce,id:(qt=Ce.c.prototypeId)!==null&&qt!==void 0?qt:Ce.c.id,bounds:zi(Ce.c,Ce.m),raw:_n,norm:_n.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}}).filter(function(Ce){return Ce.raw.length>0}),fg=Ws.filter(function(Ce){var Ot,qt;return((Ot=jr.get(Ce.id))===null||Ot===void 0?void 0:Ot.items.some(function(_n){return _n.isBtn}))||((qt=ea.get(Ce.id))===null||qt===void 0?void 0:qt.content.some(function(_n){return _n.row.c.contract==="native.button.v1"}))});try{for(var xc=Ue(fg),Jo=xc.next();!Jo.done;Jo=xc.next()){var Zn=Jo.value,Gn=Zn.bounds,Fi=(Gn.left+Gn.right)/2,hg=Gn.right-Gn.left;try{for(var _c=(be=void 0,Ue(Ys)),$o=_c.next();!$o.done;$o=_c.next()){var ma=$o.value;if(Vt(ma.row.c).align==="center"&&!(ma.bounds.bottom>Gn.top+6||Gn.top-ma.bounds.bottom>48)){var Ap=ma.bounds.right-ma.bounds.left,Ko=(ma.bounds.left+ma.bounds.right)/2,pg=Math.min(ma.bounds.right,Gn.right)-Math.max(ma.bounds.left,Gn.left);(Ko>=Gn.left&&Ko<=Gn.right||pg>=Ap*.6)&&Ap<=hg+60&&Math.abs(Ko-Fi)>4&&qn("header-off-center","blocker",ma.id,"Centered text above a panel is not horizontally aligned with the panel below it.",{panelId:Zn.id,offsetX:Ko-Fi,textCenterX:Ko,panelCenterX:Fi,scale:Yt},Zn.id)}}}catch(_n){be={error:_n}}finally{try{$o&&!$o.done&&(Ee=_c.return)&&Ee.call(_c)}finally{if(be)throw be.error}}}}catch(Ce){xe={error:Ce}}finally{try{Jo&&!Jo.done&&(oe=xc.return)&&oe.call(xc)}finally{if(xe)throw xe.error}}for(var On=0;On<Ys.length;On++)for(var xn=On+1;xn<Ys.length;xn++){var Kt=Ys[On],on=Ys[xn];if(!(Kt.id===on.id||Rr(Kt.row.c,on.row.c.id)||Rr(on.row.c,Kt.row.c.id))){var Si=Math.min(Kt.bounds.right,on.bounds.right)-Math.max(Kt.bounds.left,on.bounds.left),Kn=Math.min(Kt.bounds.bottom,on.bounds.bottom)-Math.max(Kt.bounds.top,on.bounds.top);if(Si>2&&Kn>2&&qn("panel-content-overlap","blocker",Kt.id,"Visible text elements overlap.",{intersection:{width:Si,height:Kn},first:Kt.bounds,second:on.bounds},on.id),Kt.norm&&on.norm){var Ip=De(Kt.norm.length<=on.norm.length?[Kt.norm,on.norm]:[on.norm,Kt.norm],2),Mc=Ip[0],Cp=Ip[1];(Mc===Cp&&Mc.length>=6||Mc.length>=12&&Cp.includes(Mc))&&qn("duplicate-visible-copy","blocker",Kt.id,"Duplicate visible copy appears in multiple text elements simultaneously.",{first:Kt.raw,second:on.raw},on.id)}}}var va=Ys.filter(function(Ce){return!/^[\d\s/.,:%+\-x]+$/i.test(Ce.raw)}),Sc=va.reduce(function(Ce,Ot){return Ce+(Ot.norm?Ot.norm.split(" ").filter(Boolean).length:0)},0),nf=va.reduce(function(Ce,Ot){return Ce+Ot.raw.replace(/\s+/g," ").length},0);Sc>20||nf>130||va.length>5?qn("text-clutter-heavy","blocker",(at=(Ut=va[0])===null||Ut===void 0?void 0:Ut.id)!==null&&at!==void 0?at:null,"Too much visible copy on one screen; keep playable ads visual and concise.",{blocks:va.length,wordCount:Sc,charCount:nf,texts:va.map(function(Ce){return Ce.raw})}):(Sc>12||va.length>4)&&qn("text-clutter-heavy","warning",(Mt=(Wt=va[0])===null||Wt===void 0?void 0:Wt.id)!==null&&Mt!==void 0?Mt:null,"Screen copy is getting dense; consider trimming narration so gameplay carries the experience.",{blocks:va.length,wordCount:Sc,charCount:nf,texts:va.map(function(Ce){return Ce.raw})});var Rp=Pt?Pt.filter(function(Ce){if(Ft.has(Ce))return!1;var Ot=Le(Ce);return Ot?.contract==="native.mesh3d.v1"?!1:!Ot||ii(Ot)}):[];return{ok:!it.some(function(Ce){return Ce.severity==="blocker"})&&Rp.length===0,viewport:gt(gt({},Nt),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight,scale:Yt}),defects:it,missing:Rp,interactive:Mr.map(function(Ce){var Ot;return{id:(Ot=Ce.c.prototypeId)!==null&&Ot!==void 0?Ot:Ce.c.id,bounds:zi(Ce.c,Ce.m)}}),safeArea:Bt}}function Rr(c,x){for(;c.parentId;){if(c.parentId===x)return!0;c=Le(c.parentId)}return!1}function mp(c){for(var x=function(C){if(n.gameplay.some(function(N){var P;return N.kind==="camera-follow"&&N.componentId===((P=C.prototypeId)!==null&&P!==void 0?P:C.id)}))return{value:!0}},R=c;R;R=R.parentId?Le(R.parentId):void 0){var A=x(R);if(typeof A=="object")return A.value}return!1}function fc(c){var x=O(),R=e.getBoundingClientRect(),A=Math.min(R.width/x.width,R.height/x.height);return{x:(c.clientX-R.left-(R.width-x.width*A)/2)/A,y:(c.clientY-R.top-(R.height-x.height*A)/2)/A}}function Qv(c,x){var R,A,C,N;try{try{for(var P=Ue(c.clips),X=P.next();!X.done;X=P.next()){var k=X.value,Z=In(wr(k.matrix),x.x,x.y);if(Z.x<0||Z.y<0||Z.x>k.width||Z.y>k.height)return!1}}catch(oe){R={error:oe}}finally{try{X&&!X.done&&(A=P.return)&&A.call(P)}finally{if(R)throw R.error}}var V=In(wr(c.m),x.x,x.y),$=Vt(c.c);if(c.c.contract==="native.path.v1"){var q=new Path2D,Q=function(oe,be){({M:function(){return q.moveTo.apply(q,Ke([],De(be),!1))},L:function(){return q.lineTo.apply(q,Ke([],De(be),!1))},C:function(){return q.bezierCurveTo.apply(q,Ke([],De(be),!1))},Q:function(){return q.quadraticCurveTo.apply(q,Ke([],De(be),!1))},Z:function(){return q.closePath()}})[oe]()};try{for(var te=Ue($.commands),G=te.next();!G.done;G=te.next()){var ce=De(G.value),me=ce[0],ve=ce.slice(1);Q(me,ve)}}catch(oe){C={error:oe}}finally{try{G&&!G.done&&(N=te.return)&&N.call(te)}finally{if(C)throw C.error}}p.save(),p.setTransform(1,0,0,1,0,0),p.lineWidth=$.strokeWidth;var xe=p.isPointInPath(q,V.x,V.y)||$.strokeWidth>0&&p.isPointInStroke(q,V.x,V.y);return p.restore(),xe}return c.c.contract==="native.ellipse.v1"?Math.pow((V.x-$.width/2)/($.width/2),2)+Math.pow((V.y-$.height/2)/($.height/2),2)<=1:V.x>=0&&V.y>=0&&V.x<=$.width&&V.y<=$.height}catch{return!1}}function Go(c){return Ke([],De(ue),!1).reverse().find(function(x){return x.c.contract!=="native.group.v1"&&x.c.sceneId===J&&Le(x.c.id)&&ii(x.c)&&Qv(x,c)})}function Ho(c){for(var x=[];c;)x.push(c),c=Le(c.parentId);return x}function Jd(){if(!he)return{vx:0,vy:0,power:0,pull:0};var c=he.behavior.parameters,x=he.current.x-he.start.x,R=he.current.y-he.start.y,A=Math.hypot(x,R),C=Math.max(0,Math.min(1,(A-c.minPullPx)/Math.max(1,c.maxPullPx-c.minPullPx))),N=c.minSpeed+(c.maxSpeed-c.minSpeed)*C,P=c.invert?-1:1;return{vx:A?x/A*N*P:0,vy:A?R/A*N*P:0,power:C,pull:A}}function vp(c){if(he){he.current=c;var x=Jd();he.power=x.power,he.behavior.parameters.powerVariableId&&(ne[he.behavior.parameters.powerVariableId]=x.power)}}function $d(c){var x,R;c===void 0&&(c=!1);try{var A=(x=globalThis.AudioContext)!==null&&x!==void 0?x:globalThis.webkitAudioContext;A&&!_t&&(_t=new A,(R=_t.addEventListener)===null||R===void 0||R.call(_t,"statechange",function(){_t?.state==="running"&&Gd()})),Hs(c)}catch{}}function jv(c,x,R){var A,C,N,P,X,k,Z=function(be){var Ee=R.find(function(lt){var Xe;return((Xe=lt.prototypeId)!==null&&Xe!==void 0?Xe:lt.id)===be.componentId});if(!Ee)return"continue";var Ie=In(wr(zn(Ee)),x.x,x.y),Ze=zo(Ee,be);return Ze.stampSegment(Ie,Ie),ft={kind:"mask",pointerId:c.pointerId,c:Ee,behavior:be,last:Ie},(X=e.setPointerCapture)===null||X===void 0||X.call(e,c.pointerId),{value:!0}};try{for(var V=Ue(n.gameplay.filter(function(be){var Ee;return be.kind==="erase-mask"&&((Ee=S.get(be.componentId))===null||Ee===void 0?void 0:Ee.sceneId)===J})),$=V.next();!$.done;$=V.next()){var q=$.value,Q=Z(q);if(typeof Q=="object")return Q.value}}catch(be){A={error:be}}finally{try{$&&!$.done&&(C=V.return)&&C.call(V)}finally{if(A)throw A.error}}if(R.some(function(be){return be.contract==="native.button.v1"||n.events.some(function(Ee){var Ie;return Ee.kind==="click"&&Ee.componentId===((Ie=be.prototypeId)!==null&&Ie!==void 0?Ie:be.id)})}))return!1;try{for(var te=Ue(n.gameplay.filter(function(be){var Ee;return be.kind==="draw-stroke"&&((Ee=S.get(be.componentId))===null||Ee===void 0?void 0:Ee.sceneId)===J})),G=te.next();!G.done;G=te.next()){var q=G.value,ce=S.get(q.componentId),me=wr(zn(ce)),ve=In(me,x.x,x.y),xe=Vt(ce);if(!(ve.x<0||ve.y<0||ve.x>xe.width||ve.y>xe.height)){var oe=Ev(q);return oe.begin(x),ft={kind:"stroke",pointerId:c.pointerId,c:ce,behavior:q,store:oe,last:x},Jt({kind:"strokeStart",componentId:ce.id}),(k=e.setPointerCapture)===null||k===void 0||k.call(e,c.pointerId),!0}}}catch(be){N={error:be}}finally{try{G&&!G.done&&(P=te.return)&&P.call(te)}finally{if(N)throw N.error}}return!1}function eg(c,x,R){var A,C,N,P,X,k,Z,V=R.store.active;if(V){try{for(var $=Ue(n.gameplay.filter(function(Ze){var lt;return Ze.kind==="collider"&&((lt=S.get(Ze.componentId))===null||lt===void 0?void 0:lt.sceneId)===J})),q=$.next();!q.done;q=$.next()){var Q=q.value,te=S.get(Q.componentId);try{for(var G=(N=void 0,Ue(ci(te))),ce=G.next();!ce.done;ce=G.next()){var me=ce.value;!ii(me)||V.hitIds.has(me.id)||Yp(c,x,hp(me,Q.parameters.shape))&&(V.hitIds.add(me.id),Jt(pi("sliceHit",me)))}}catch(Ze){N={error:Ze}}finally{try{ce&&!ce.done&&(P=G.return)&&P.call(G)}finally{if(N)throw N.error}}}}catch(Ze){A={error:Ze}}finally{try{q&&!q.done&&(C=$.return)&&C.call($)}finally{if(A)throw A.error}}try{for(var ve=Ue(tn),xe=ve.next();!xe.done;xe=ve.next()){var oe=xe.value;if(!(oe.broken||!oe.breakable||V.hitIds.has(oe.key))){var be=fn.get(oe.bodyId),Ee=Le(oe.anchorId);if(!(!be||!Ee)){var Ie=xi(Ee);df(c,x,{x:Ie.x,y:Ie.y},{x:be.x,y:be.y})&&(V.hitIds.add(oe.key),oe.broken=!0,D.add(oe.key),Jt({kind:"jointBreak",behaviorId:oe.id,componentId:oe.componentId,selfInstanceId:oe.bodyId,instanceId:(Z=Le(oe.bodyId))===null||Z===void 0?void 0:Z.instanceId}))}}}}catch(Ze){X={error:Ze}}finally{try{xe&&!xe.done&&(k=ve.return)&&k.call(ve)}finally{if(X)throw X.error}}}}function tg(c,x){var R,A=x.last,C=x.behavior.parameters;if(C.inkVariableId){var N=C.inkVariableId,P=Math.hypot(c.x-A.x,c.y-A.y);if(((R=ne[N])!==null&&R!==void 0?R:0)<P)return;ne[N]-=P}x.store.add(c)&&(C.mode==="slice-blade"&&eg(A,c,x),x.last=c)}function ng(c){var x,R;if(!(!ft||ft.pointerId!==c.pointerId)){var A=ft;ft=void 0;try{!((x=e.hasPointerCapture)===null||x===void 0)&&x.call(e,c.pointerId)&&((R=e.releasePointerCapture)===null||R===void 0||R.call(e,c.pointerId))}catch{}if(A.kind==="stroke"){var C=A.store.end(),N=A.behavior.parameters;if(C){if(N.mode==="physics-wall"){var P=new Set(A.store.strokes.map(function(k){return k.id}));Dt=Dt.filter(function(k){return k.owner!==A.c.id||P.has(k.strokeId)}),Dt.push.apply(Dt,Ke([],De(Zp(C,N.strokeWidth).map(function(k){return gt(gt({},k),{owner:A.c.id})})),!1))}else if(N.mode==="path-trace"){var X=Le(N.followComponentId);X&&C.points.length>1&&Vr.set(X.id,{points:C.points,index:1,speed:N.followSpeed})}}Jt({kind:"strokeEnd",componentId:A.c.id})}}}function ig(c){var x,R,A,C;try{for(var N=Ue(sr.values()),P=N.next();!P.done;P=N.next()){var X=P.value;X.tick(c)}}catch(oe){x={error:oe}}finally{try{P&&!P.done&&(R=N.return)&&R.call(N)}finally{if(x)throw x.error}}try{for(var k=Ue(Vr),Z=k.next();!Z.done;Z=k.next()){var V=De(Z.value,2),$=V[0],q=V[1],Q=Le($);if(!Q){Vr.delete($);continue}var te=q.points[q.index];if(!te){Vr.delete($),Jt(pi("pathArrive",Q));continue}var G=xi(Q),ce=te.x-G.x,me=te.y-G.y,ve=Math.hypot(ce,me),xe=q.speed*c;ve<=xe?(ua(Q,te.x,te.y),q.index++):ve>.001&&ua(Q,G.x+ce/ve*xe,G.y+me/ve*xe)}}catch(oe){A={error:oe}}finally{try{Z&&!Z.done&&(C=k.return)&&C.call(k)}finally{if(A)throw A.error}}}function rg(c,x,R){var A,C,N=[],P=[],X=function($){var q=S.get($.componentId),Q=$.parameters.dragMode==="anywhere"?ci(q).find(function(ce){return ii(ce)}):R.find(function(ce){var me;return((me=ce.prototypeId)!==null&&me!==void 0?me:ce.id)===q.id});if(!Q)return"continue";if($.kind==="swipe-input")P.push({behavior:$,c:Q});else{var te=$.parameters,G=Math.max(te.min,Math.min(te.max,Number(ne[te.variableId])));ne[te.variableId]=G,N.push({behavior:$,c:Q,charge:Op(te,G)}),Jt(pi("holdStart",Q))}};try{for(var k=Ue(n.gameplay.filter(function($){var q;return["swipe-input","hold-charge"].includes($.kind)&&((q=S.get($.componentId))===null||q===void 0?void 0:q.sceneId)===J})),Z=k.next();!Z.done;Z=k.next()){var V=Z.value;X(V)}}catch($){A={error:$}}finally{try{Z&&!Z.done&&(C=k.return)&&C.call(k)}finally{if(A)throw A.error}}(N.length||P.length)&&(ke={pointerId:c.pointerId,start:x,current:x,holds:N,swipes:P})}function ag(c,x){var R,A,C,N,P,X,k,Z;if(!(!ke||ke.pointerId!==c.pointerId)){var V=ke,$=new Set;ke=void 0;try{for(var q=Ue(Ke(Ke([],De(V.holds),!1),De(V.swipes),!1)),Q=q.next();!Q.done;Q=q.next()){var te=Q.value,G=te.behavior,ce=te.c;$.has(G.componentId)||($.add(G.componentId),Jt(pi("pointerUp",ce,void 0,{targetId:ce.id,pointerId:c.pointerId})))}}catch(Xe){R={error:Xe}}finally{try{Q&&!Q.done&&(A=q.return)&&A.call(q)}finally{if(R)throw R.error}}try{for(var me=Ue(V.holds),ve=me.next();!ve.done;ve=me.next()){var xe=ve.value,oe=xe.behavior.parameters;if(Jt(pi("holdRelease",xe.c)),oe.resetOnRelease!==!1){var be=ne[oe.variableId];ne[oe.variableId]=oe.min,be!==oe.min&&Jt({kind:"variableChange",variableId:oe.variableId,selfInstanceId:(k=xe.c.instanceId)!==null&&k!==void 0?k:xe.c.id,instanceId:xe.c.instanceId})}}}catch(Xe){C={error:Xe}}finally{try{ve&&!ve.done&&(N=me.return)&&N.call(me)}finally{if(C)throw C.error}}try{for(var Ee=Ue(V.swipes),Ie=Ee.next();!Ie.done;Ie=Ee.next()){var Ze=Ie.value,lt=Fp(V.start,x,Ze.behavior.parameters.minDistancePx,(Z=Za.get(Ze.behavior.id))!==null&&Z!==void 0?Z:-1/0,_e*1e3,Ze.behavior.parameters.cooldownMs);lt&&(Za.set(Ze.behavior.id,_e*1e3),Jt(pi("swipe",Ze.c,void 0,{direction:lt})))}}catch(Xe){P={error:Xe}}finally{try{Ie&&!Ie.done&&(X=Ee.return)&&X.call(Ee)}finally{if(P)throw P.error}}return $}}function sg(c,x,R){var A,C,N;if(R.some(function(G){return G.contract==="native.button.v1"&&Vt(G).enabled}))return!1;try{for(var P=Ue(n.gameplay.filter(function(G){var ce;return G.kind==="virtual-joystick"&&((ce=S.get(G.componentId))===null||ce===void 0?void 0:ce.sceneId)===J})),X=P.next();!X.done;X=P.next()){var k=X.value,Z=S.get(k.componentId);if(ii(Z)){var V=le.get(k.id);if(!(V&&V.pointerId!==null)){var $=In(wr(zn(Z)),x.x,x.y),q=Vt(Z);if(!($.x<0||$.y<0||$.x>q.width||$.y>q.height)){var Q=k.parameters.mode==="floating"?gt({},x):xi(Z),te=cf(Q,x,k.parameters.radiusPx,k.parameters.deadZone);return V=gt({behavior:k,c:Z,pointerId:c.pointerId,origin:Q,current:x},te),le.set(k.id,V),vr(V),Jt(pi("joystickStart",Z)),(N=e.setPointerCapture)===null||N===void 0||N.call(e,c.pointerId),!0}}}}}catch(G){A={error:G}}finally{try{X&&!X.done&&(C=P.return)&&C.call(P)}finally{if(A)throw A.error}}return!1}var gp=function(c){var x,R,A,C,N,P,X,k,Z,V,$,q,Q;H();var te=fc(c),G=Go(te);if(Je=te,!(!G&&f)){if(f){G&&(w=G.c.id,T((N=G.c.prototypeId)!==null&&N!==void 0?N:G.c.id));return}var ce=n.gameplay.some(function(Bt){return Bt.kind==="virtual-joystick"||Bt.kind==="fps-controller-3d"});if(!(!c.isTrusted||c.button!==void 0&&c.button!==0||!ce&&c.isPrimary===!1||ct||ot||!ce&&(rt&&rt.pointerId!==c.pointerId||ke&&ke.pointerId!==c.pointerId||he&&he.pointerId!==c.pointerId||It&&It.pointerId!==c.pointerId)||_&&(!Ve||!qe))){var me=!je;Re=_e,Ae=!0,je=!0,$d(!0),me&&!wt&&(Tt=Zt=0,xr());var ve=G?Ho(G.c):[];if(sg(c,te,ve)){Tt=Zt=0,wt=!1,xr(),ei();return}if(jv(c,te,ve)){xr(),ei();return}rg(c,te,ve);var xe=jt&&!ve.some(function(Bt){return Bt.contract==="native.button.v1"})?n.gameplay.find(function(Bt){var it;return Bt.kind==="aim-launch-3d"&&((it=S.get(Bt.componentId))===null||it===void 0?void 0:it.sceneId)===J}):void 0;if(xe){var oe=S.get(xe.componentId),be=An("physics-3d",oe.id),Ee=be?oc(oe,be):void 0,Ie=Vd(oe.id),Ze=xe.parameters.dragMode==="anywhere"||Ie&&Math.hypot(te.x-Ie.x,te.y-Ie.y)<=xe.parameters.hitRadiusPx;if(Ee&&Ee.atRest&&!Ee.captured&&Ze){It={behavior:xe,targetId:oe.id,sourceId:oe.id,stageId:xe.parameters.stageId,pointerId:c.pointerId,start:te,current:te,power:0},cp(te),(P=e.setPointerCapture)===null||P===void 0||P.call(e,c.pointerId);return}}var lt=ve.some(function(Bt){return Bt.contract==="native.button.v1"&&Vt(Bt).enabled||n.events.some(function(it){var Ft;return it.kind==="click"&&it.componentId===((Ft=Bt.prototypeId)!==null&&Ft!==void 0?Ft:Bt.id)})});if(jt&&!Qt&&!lt){var Xe=n.gameplay.find(function(Bt){var it;return Bt.kind==="fps-controller-3d"&&Bt.parameters.lookMode!=="none"&&((it=S.get(Bt.componentId))===null||it===void 0?void 0:it.sceneId)===J});if(Xe){var ht=S.get(Xe.componentId),yt=In(wr(zn(ht)),te.x,te.y),Gt=Vt(ht);if(yt.x>=0&&yt.y>=0&&yt.x<=Gt.width&&yt.y<=Gt.height){cc(Xe),Qt={pointerId:c.pointerId,stageId:ht.id,behavior:Xe,last:te},(X=e.setPointerCapture)===null||X===void 0||X.call(e,c.pointerId);return}}}var Ut=n.gameplay.find(function(Bt){return Bt.kind==="aim-launch"&&S.get(Bt.componentId).sceneId===J&&(Bt.parameters.dragMode==="anywhere"&&!ve.some(function(it){return it.contract==="native.button.v1"})||ve.some(function(it){var Ft;return((Ft=it.prototypeId)!==null&&Ft!==void 0?Ft:it.id)===Bt.componentId}))});if(Ut){var at=S.get(Ut.componentId),Wt=(k=ve.find(function(it){var Ft;return((Ft=it.prototypeId)!==null&&Ft!==void 0?Ft:it.id)===at.id}))!==null&&k!==void 0?k:ci(at).find(function(it){return ii(it)}),Ee=Wt&&$a(Wt,An("physics-body",at.id));if(Ee&&(!Ut.parameters.onlyWhenAtRest||Ee.atRest)){he={behavior:Ut,targetId:Wt.id,sourceId:at.id,pointerId:c.pointerId,start:te,current:te,power:0},vp(te),(Z=e.setPointerCapture)===null||Z===void 0||Z.call(e,c.pointerId),ei();return}}try{for(var Mt=Ue(ve),mt=Mt.next();!mt.done;mt=Mt.next()){var Qe=mt.value,st=An("press-feedback",(V=Qe.prototypeId)!==null&&V!==void 0?V:Qe.id);st&&(Qe.contract!=="native.button.v1"||Vt(Qe).enabled)&&Fn.set(Qe.id,{behavior:st.parameters,pointerId:c.pointerId,held:!0})}}catch(Bt){x={error:Bt}}finally{try{mt&&!mt.done&&(R=Mt.return)&&R.call(Mt)}finally{if(x)throw x.error}}var We=ve.find(function(Bt){var it;return((it=Dn.get(Bt.id))===null||it===void 0?void 0:it.sceneId)===J});if(We){var tt=xt.get(We.parentId);if(tt?.snapshot().busy)return;Fv(We),tt&&!tt.snapshot().busy&&(En={pointerId:c.pointerId,boardId:We.parentId,tileId:We.id,start:te},($=e.setPointerCapture)===null||$===void 0||$.call(e,c.pointerId))}se=(q=ve.find(function(Bt){return Bt.contract==="native.button.v1"&&Vt(Bt).enabled}))===null||q===void 0?void 0:q.id,mn=se?c.pointerId:void 0;var St=n.gameplay.find(function(Bt){return Bt.kind==="drag"&&ve.some(function(it){var Ft;return((Ft=it.prototypeId)!==null&&Ft!==void 0?Ft:it.id)===Bt.componentId})});if(St){var Qe=ve.find(function(it){var Ft;return((Ft=it.prototypeId)!==null&&Ft!==void 0?Ft:it.id)===St.componentId}),Ct=xi(Qe),Pt=Bn.zoneOf(Qe.id);la.set(Qe.id,Ct),Bn.release(Qe.id),rt={b:St,targetId:Qe.id,start:te,current:te,origin:Ct,originZone:Pt,m:Ke([],De(Di(Qe)),!1),pointerId:c.pointerId},Jt(pi("dragStart",Qe)),e.setPointerCapture(c.pointerId)}Tt=Zt=0,wt=!1;try{for(var Nt=Ue(ve),Yt=Nt.next();!Yt.done;Yt=Nt.next()){var Qe=Yt.value;(Qe.contract!=="native.button.v1"||Vt(Qe).enabled)&&Jt({kind:"click",componentId:(Q=Qe.prototypeId)!==null&&Q!==void 0?Q:Qe.id,instanceId:Qe.instanceId,targetId:Qe.id,pointerId:c.pointerId})}}catch(Bt){A={error:Bt}}finally{try{Yt&&!Yt.done&&(C=Nt.return)&&C.call(Nt)}finally{if(A)throw A.error}}xr(),ei()}}};function yp(c,x){if(!En||En.pointerId!==c.pointerId)return!1;if(!c.isTrusted||!lr())return!0;var R=En,A=xt.get(R.boardId);if(A.snapshot().busy)return En=void 0,!0;var C=wr(zn(S.get(R.boardId))),N=In(C,R.start.x,R.start.y),P=In(C,x.x,x.y),X=P.x-N.x,k=P.y-N.y,Z=S.get(R.tileId);if(Math.max(Math.abs(X),Math.abs(k))<Math.min(Z.parameters.width,Z.parameters.height)*.35)return!0;var V=Dn.get(Z.id),$=Math.abs(X)>Math.abs(k),q=V.row+($?0:Math.sign(k)),Q=V.column+($?Math.sign(X):0),te=Ke([],De(Dn),!1).find(function(G){var ce=De(G,2),me=ce[1];return me.boardId===R.boardId&&me.row===q&&me.column===Q});return te&&A.swap(Z.id,te[0])&&(yn=void 0,ei()),En=void 0,!0}var xp=function(c){var x,R,A,C;if(!ct){H();var N=O(),P=fc(c);Je=P,ke?.pointerId===c.pointerId&&(ke.current=P);var X=function(Mt){var mt,Qe;if(Mt.pointerId===c.pointerId){var st=P.x-Mt.current.x,We=P.y-Mt.current.y;if(c.isTrusted&&lr())try{for(var tt=(mt=void 0,Ue(n.gameplay.filter(function(Pt){var Nt,Yt;return Pt.kind==="fps-controller-3d"&&Pt.parameters.aimJoystickBehaviorId===Mt.behavior.id&&((Nt=Pt.parameters.aimMode)!==null&&Nt!==void 0?Nt:"delta")==="delta"&&((Yt=S.get(Pt.componentId))===null||Yt===void 0?void 0:Yt.sceneId)===J}))),St=tt.next();!St.done;St=tt.next()){var Ct=St.value;op(Ct,st,We)}}catch(Pt){mt={error:Pt}}finally{try{St&&!St.done&&(Qe=tt.return)&&Qe.call(tt)}finally{if(mt)throw mt.error}}return Object.assign(Mt,{current:P},cf(Mt.origin,P,Mt.behavior.parameters.radiusPx,Mt.behavior.parameters.deadZone)),vr(Mt),ei(),{value:void 0}}};try{for(var k=Ue(le.values()),Z=k.next();!Z.done;Z=k.next()){var V=Z.value,$=X(V);if(typeof $=="object")return $.value}}catch(Mt){x={error:Mt}}finally{try{Z&&!Z.done&&(R=k.return)&&R.call(k)}finally{if(x)throw x.error}}if(ft?.pointerId===c.pointerId){if(ft.kind==="mask"){var q=ft,Q=In(wr(zn(q.c)),P.x,P.y);zo(q.c,q.behavior).stampSegment(q.last,Q),q.last=Q}else tg(P,ft);xr(),ei();return}if(Qt?.pointerId===c.pointerId){c.isTrusted&&lr()&&(op(Qt.behavior,P.x-Qt.last.x,P.y-Qt.last.y),Qt.last=P,ei());return}if(It?.pointerId===c.pointerId){c.isTrusted&&lr()&&cp(P);return}if(he?.pointerId===c.pointerId){c.isTrusted&&lr()&&vp(P),ei();return}var te=Go(P);if(an=te?(A=Ho(te.c).find(function(Mt){return Mt.contract==="native.button.v1"}))===null||A===void 0?void 0:A.id:void 0,!yp(c,P)&&!(!rt||rt.pointerId!==c.pointerId)){var G=Le(rt.targetId);if(!G){Yn();return}var ce=G.parentId?zn(Le(G.parentId)):ga(),me=wr(ce),ve=In(me,rt.start.x,rt.start.y),xe=In(me,P.x,P.y),oe=Ke([],De(rt.m),!1),be=rt.b.parameters.axis;if(be!=="y"){var Ee=rt.m[4]+xe.x-ve.x;Number.isFinite(rt.b.parameters.minX)&&(Ee=Math.max(rt.b.parameters.minX,Ee)),Number.isFinite(rt.b.parameters.maxX)&&(Ee=Math.min(rt.b.parameters.maxX,Ee)),oe[4]=Ee}if(be!=="x"){var Ie=rt.m[5]+xe.y-ve.y;Number.isFinite(rt.b.parameters.minY)&&(Ie=Math.max(rt.b.parameters.minY,Ie)),Number.isFinite(rt.b.parameters.maxY)&&(Ie=Math.min(rt.b.parameters.maxY,Ie)),oe[5]=Ie}if(!G.parentId)be!=="y"&&(oe[4]=Math.max(0,Math.min(N.width-G.parameters.width,oe[4])));else{var Ze=zi(G,qs(ce,oe)),lt=0;Ze.left<0||Ze.right-Ze.left>N.width?lt=-Ze.left:Ze.right>N.width&&(lt=N.width-Ze.right);var Xe=be==="y"?0:ce[0],ht=be==="x"?0:ce[2];Math.abs(Xe)>=Math.abs(ht)&&Math.abs(Xe)>1e-8?oe[4]+=lt/Xe:Math.abs(ht)>1e-8&&(oe[5]+=lt/ht)}var yt=(C=He.get(G.id))!==null&&C!==void 0?C:{parameters:{}};He.set(G.id,gt(gt({},yt),{transform:oe})),rt.current=P;var Gt=Wd(G),Ut=Gt.zones,at=Gt.tag,Wt=wc({itemId:G.id,tag:at,zones:Ut,occupancy:Bn});et=Wt&&Wt.kind!=="reject"?Wt.zone:void 0}}},_p=function(c){var x,R,A,C,N;H();var P=fc(c),X=ye;Je=P,Mn(c.pointerId,!0),Li(c.pointerId),ng(c);var k=(A=ag(c,P))!==null&&A!==void 0?A:new Set;if(Ov(c),c.isTrusted&&lr()){var Z=Go(P);try{for(var V=Ue(Z?Ho(Z.c):[]),$=V.next();!$.done;$=V.next()){var q=$.value;!k.has((C=q.prototypeId)!==null&&C!==void 0?C:q.id)&&(q.contract!=="native.button.v1"||Vt(q).enabled)&&Jt(pi("pointerUp",q,void 0,{targetId:q.id,pointerId:c.pointerId}))}}catch(ve){x={error:ve}}finally{try{$&&!$.done&&(R=V.return)&&R.call(V)}finally{if(x)throw x.error}}}if(xr(),ei(),It?.pointerId===c.pointerId){var Q=It,te=lp(),G=$t.get(Q.targetId);(N=jt?.getStage(S.get(Q.stageId)))===null||N===void 0||N.setGuide([]),It=void 0,Q.behavior.parameters.powerVariableId&&(ne[Q.behavior.parameters.powerVariableId]=0);var ce=Math.hypot(te.vx,te.vz);c.isTrusted&&$d(!0),G&&c.isTrusted&&lr()&&te.pull>=Q.behavior.parameters.minPullPx&&ce>=Q.behavior.parameters.minSpeed&&(G.vx=te.vx,G.vy=0,G.vz=te.vz,G.atRest=!1,G.restElapsed=0,G.movingTime=0,G.captured=!1,G.lastSafe={x:G.x,y:G.y,z:G.z},Jt({kind:"launch",componentId:Q.sourceId})),Zi(c),xr();return}if(he?.pointerId===c.pointerId){var Q=he,te=Jd(),G=fn.get(Q.targetId);he=void 0,Q.behavior.parameters.powerVariableId&&(ne[Q.behavior.parameters.powerVariableId]=0),G&&c.isTrusted&&lr()&&te.pull>=Q.behavior.parameters.minPullPx&&(G.vx=te.vx,G.vy=te.vy,G.atRest=!1,G.restElapsed=0,G.captured=!1,G.exited=!1,Jt({kind:"launch",componentId:Q.sourceId,instanceId:G.instanceId})),Zi(c),xr(),ei();return}if(yp(c,P),En?.pointerId===c.pointerId&&(En=void 0),Zi(c),!(F||X?.pointerId!==c.pointerId||!c.isTrusted||!lr()||navigator.userActivation&&navigator.userActivation.isActive!==!0||!Ja(X.condition))){var me=Go(P);!me||!Ho(me.c).some(function(ve){return ve.id===X.targetId&&(ve.contract!=="native.button.v1"||Vt(ve).enabled)})||(_?_.openStore(n.base.storeUrl):window.open(n.base.storeUrl,"_blank","noopener"))}},hc=function(c){var x,R;if(It?.pointerId===c.pointerId&&or(c.pointerId),Qt?.pointerId===c.pointerId&&Li(c.pointerId),Mn(c.pointerId,!0),he?.pointerId===c.pointerId&&(he.behavior.parameters.powerVariableId&&(ne[he.behavior.parameters.powerVariableId]=0),he=void 0),En?.pointerId===c.pointerId&&(En=void 0),ft?.pointerId===c.pointerId&&(ft.kind==="stroke"&&ft.store.cancel(),ft=void 0),ke?.pointerId===c.pointerId){try{for(var A=Ue(ke.holds),C=A.next();!C.done;C=A.next()){var N=C.value;N.behavior.parameters.resetOnRelease!==!1&&(ne[N.behavior.parameters.variableId]=N.behavior.parameters.min)}}catch(P){x={error:P}}finally{try{C&&!C.done&&(R=A.return)&&R.call(A)}finally{if(x)throw x.error}}ke=void 0}Zi(c)},Mp=function(c){c?.isTrusted&&!f&&!ct&&!ot&&$d(!0)},Kd=function(){pt||ei()},Ka=typeof globalThis.ResizeObserver=="function"?new globalThis.ResizeObserver(Kd):void 0;try{(s=Ka?.observe)===null||s===void 0||s.call(Ka,e)}catch{}var Sp=function(){ut=0,zt=0,document.hidden&&gr(),_t&&(document.hidden?_t.suspend().catch(function(){}):!ct&&je&&Hs())};document.addEventListener("visibilitychange",Sp),(o=globalThis.addEventListener)===null||o===void 0||o.call(globalThis,"resize",Kd),e.addEventListener("pointerdown",gp),e.addEventListener("pointermove",xp),e.addEventListener("pointerup",_p),e.addEventListener("pointercancel",hc),e.addEventListener("lostpointercapture",hc),e.addEventListener("click",Mp);var Qd=_?.onVisibilityChanged(function(c){qe=c,ut=0,zt=0,c||gr(),_t&&(c?!ct&&je&&Hs():_t.suspend().catch(function(){}))}),jd=_?.onClosed(function(){ot=!0,ut=0,zt=0,gr(),pn()}),ef=(u=_?.onVolumeChanged)===null||u===void 0?void 0:u.call(_,function(c){typeof c=="number"&&Number.isFinite(c)&&c>=0&&(Yi=Math.min(1,c>1?c/100:c),Hd())}),Ji,La;function bp(c){var x=!f&&!ct&&!document.hidden&&Ve&&qe&&!ot;if(x&&zt&&(Ge+=Math.min((c-zt)/1e3,5/60)),lr()){Tt=Zt=0,wt=!1,zt&&(ut+=Math.min((c-zt)/1e3,5/60));for(var R=0;R<5&&ut>=1/60;R++)La?.(),pp(1/60),ut-=1/60;xr(),Ji?.()&&(ct=!0,Ji=void 0,La=void 0)}else ut=0;zt=c,ei(),nn=requestAnimationFrame(bp)}uc(),f&&(J=v),ei(),nn=requestAnimationFrame(bp),_&&_.init().then(function(){pt||(Ve=!0,qe=_.isVisible(),ut=0,zt=0)}).catch(function(){pt||(ot=!0,gr(),pn())});var og=F?{freezeReview:function(){ct=!0,Ji=void 0,La=void 0,ut=0,zt=0,yi(),Yn(),En=void 0,_t?.suspend().catch(function(){}),ei()},seekReview:function(c,x){var R,A,C,N,P=x===void 0?{}:x,X=P.motion,k=X===void 0?!1:X,Z=P.trustedEvent;ct=!0,Ji=void 0,La=void 0,uc();var V=xt.get("harvest.board"),$=k&&Z instanceof globalThis.Event&&Z.isTrusted,q=function(){var We=_t;_t=void 0;try{Tt=Zt=0,wt=!1,pp(1/60),xr()}finally{_t=We}},Q=function(){var We;if($)try{var tt=(We=globalThis.AudioContext)!==null&&We!==void 0?We:globalThis.webkitAudioContext;tt&&(_t??(_t=new tt)),Hs()}catch{}ut=0,zt=0,ct=!1,ei()};if(S.has("salvage.ship")&&Object.hasOwn(ne,"salvage.phase")){if(!["opening","first-catch","end-card","timeout"].includes(c))throw Error("Review moment unavailable");var te=S.get("salvage.ship"),G=function(We){var tt,St=Te.filter(function(Nt){return Nt.prototypeId.startsWith("salvage.core")}).sort(function(Nt,Yt){return Yt.transform[5]-Nt.transform[5]})[0],Ct=He.get(te.id),Pt=Ke([],De((tt=Ct?.transform)!==null&&tt!==void 0?tt:te.transform),!1);Pt[4]=We&&St?Math.max(20,Math.min(306,St.transform[4]-8)):20,He.set(te.id,gt(gt({},Ct),{transform:Pt,parameters:gt(gt({},Ct?.parameters),{visible:We})}))},ce,me,ve=function(){return ne["salvage.phase"]!=="cta"?!1:(ce??(ce=_e),_e-ce>=.65)};if(c==="opening"){if(k){Ji=function(){return _e>=4},Q();return}ei();return}if(c==="timeout"){var xe=(R=n.gameplay.find(function(We){return We.id==="salvage.deadline"}))===null||R===void 0?void 0:R.parameters.seconds;if(!Number.isFinite(xe))throw Error("Timeout replay unavailable");if(G(!1),k){for(;_e<xe-.25&&ne["salvage.phase"]!=="cta";)G(!1),q();if(ne["salvage.phase"]==="cta")throw Error("Timeout replay unavailable");La=function(){ne["salvage.phase"]!=="cta"&&G(!1)},Ji=function(){return ve()||_e>=xe+1},Q();return}for(var oe=0;ne["salvage.phase"]!=="cta"&&oe<3600;oe++)G(!1),q();if(ne["salvage.phase"]!=="cta")throw Error("Timeout card unavailable");ei();return}var be=c==="first-catch"?1:3;if(k){for(var oe=0;ne["salvage.catches"]<be-1&&oe<3600;oe++)G(!0),q();if(ne["salvage.catches"]!==be-1)throw Error("Review replay unavailable");La=function(){ne["salvage.catches"]<be&&G(!0)},Ji=function(){return be===1&&ne["salvage.catches"]>=1?(me??(me=_e),_e-me>=1):be===3&&ve()||_e>=20},Q();return}for(var oe=0;ne["salvage.catches"]<be&&oe<3600;oe++)G(!0),q();if(ne["salvage.catches"]!==be)throw Error("Review catch unavailable");if(be===1)for(var oe=0;oe<84;oe++)q();else{for(var oe=0;ne["salvage.phase"]!=="cta"&&oe<300;oe++)q();if(ne["salvage.phase"]!=="cta")throw Error("End card unavailable")}ei();return}if(!V){if(!["opening","first-input","end-card","timeout"].includes(c))throw Error("Review moment unavailable");if(c==="opening"){k?(Ji=function(){return _e>=4},Q()):ei();return}var Ee=n.gameplay.find(function(We){return We.kind==="aim-launch"&&S.get(We.componentId).sceneId===J}),Ie=n.gameplay.find(function(We){return We.kind==="aim-launch-3d"&&S.get(We.componentId).sceneId===J}),Ze=n.events.find(function(We){var tt;return We.kind==="click"&&((tt=S.get(We.componentId))===null||tt===void 0?void 0:tt.sceneId)===J&&n.eventBindings.some(function(St){return St.eventId===We.id})}),lt=function(){var We,tt;if(Ie){var St=S.get(Ie.componentId),Ct=An("physics-3d",St.id),Pt=oc(St,Ct),Nt=n.gameplay.find(function(ai){return ai.kind==="capture-zone-3d"&&S.get(ai.componentId).sceneId===J}),Yt=0,Bt=-Ie.parameters.maxSpeed*.45;if(Nt){var it=S.get(Nt.componentId),Ft=Vt(it),Cn=((We=Ft.x)!==null&&We!==void 0?We:0)-Pt.x,bn=((tt=Ft.z)!==null&&tt!==void 0?tt:0)-Pt.z,_i=Math.hypot(Cn,bn)||1;Yt=Cn/_i*Ie.parameters.maxSpeed*.55,Bt=bn/_i*Ie.parameters.maxSpeed*.55}Pt.vx=Yt,Pt.vy=0,Pt.vz=Bt,Pt.atRest=!1,Pt.restElapsed=0,Pt.movingTime=0,Pt.lastSafe={x:Pt.x,y:Pt.y,z:Pt.z},Jt({kind:"launch",componentId:St.id}),xr();return}if(Ee){var St=S.get(Ee.componentId),ri=ci(St)[0],Pt=$a(ri,An("physics-body",St.id)),Nt=n.gameplay.find(function(Ii){return Ii.kind==="capture-zone"&&S.get(Ii.componentId).sceneId===J}),Yt=Ee.parameters.maxSpeed*.45,wn=0;if(Nt){var it=S.get(Nt.componentId),Rn=In(zn(it),Vt(it).width/2,Vt(it).height/2),Cn=Rn.x-Pt.x,Hn=Rn.y-Pt.y,si=Math.hypot(Cn,Hn)||1;Yt=Cn/si*Ee.parameters.maxSpeed*.45,wn=Hn/si*Ee.parameters.maxSpeed*.45}Pt.vx=Yt,Pt.vy=wn,Pt.atRest=!1,Pt.restElapsed=0,Jt({kind:"launch",componentId:St.id,instanceId:ri.instanceId})}else if(Ze)Jt({kind:"click",componentId:Ze.componentId,targetId:Ze.componentId});else throw Error("Review primary input unavailable");xr()};if(c==="first-input"){if(lt(),k)Ji=function(){return _e>=2},Q();else{for(var oe=0;oe<60;oe++)q();ei()}return}c==="end-card"&&lt();var Xe=c==="timeout"?Math.min(60,Math.max(1,(C=(A=n.gameplay.find(function(We){return We.kind==="timer"}))===null||A===void 0?void 0:A.parameters.seconds)!==null&&C!==void 0?C:10)):60,ht=function(){var We;return((We=n.scenes.find(function(tt){return tt.id===J}))===null||We===void 0?void 0:We.role)==="end-card"},yt=function(){var We,tt;return c==="timeout"?(We=n.scenes.find(function(St){return St.role==="end-card"&&/fail|loss|timeout/i.test(St.id)}))!==null&&We!==void 0?We:n.scenes.find(function(St){return St.role==="end-card"}):(tt=n.scenes.find(function(St){return St.role==="end-card"&&!/fail|loss|timeout/i.test(St.id)}))!==null&&tt!==void 0?tt:n.scenes.find(function(St){return St.role==="end-card"})};if(k){Ji=function(){return ht()&&_e>=1||_e>=Xe+1},Q();return}for(var oe=0;oe<Xe*60&&!ht();oe++)q();if(!ht()||c==="timeout"&&!/fail|loss|timeout/i.test(J)||c==="end-card"&&/fail|loss|timeout/i.test(J)){var Gt=yt();if(!Gt)throw Error("End card unavailable");J=Gt.id,he=void 0,gr(),Jt({kind:"sceneEnter",sceneId:J}),xr()}for(var oe=0;oe<45;oe++)q();ei();return}var Ut,at=function(){return ne["harvest.phase"]!=="cta"?!1:(Ut??(Ut=_e),_e-Ut>=.65)};if(c==="opening"&&k&&(Ji=function(){return _e>=7},ut=0,zt=0,ct=!1),c==="timeout"){if(!V)throw Error("Review moment unavailable");if(k){var Wt=(N=n.gameplay.find(function(We){return We.id==="harvest.deadline"}))===null||N===void 0?void 0:N.parameters.seconds;if(!Number.isFinite(Wt))throw Error("Timeout replay unavailable");for(;_e<Wt-.25&&ne["harvest.phase"]!=="cta";)q();if(ne["harvest.phase"]==="cta")throw Error("Timeout replay unavailable");Ji=function(){return at()||_e>=Wt+1},Q();return}for(var oe=0;ne["harvest.phase"]!=="cta"&&oe<3600;oe++)q();if(ne["harvest.phase"]!=="cta")throw Error("Timeout card unavailable")}else if(c!=="opening"){if(!V||!["first-harvest","end-card"].includes(c))throw Error("Review moment unavailable");for(var Mt=c==="first-harvest"?1:3,mt=function(We){var tt=V.snapshot().legalMoves[0];if(!tt||!V.swap(tt.from,tt.to))throw Error("Review move unavailable");if(k&&We===Mt-1){var St=_e+(Mt===1?3:8);return Ji=function(){return _e>=St||Mt===3&&at()},Q(),{value:void 0}}for(var Ct=0;V.snapshot().busy&&Ct<240;Ct++)q();if(V.snapshot().busy)throw Error("Review replay did not settle")},Qe=0;Qe<Mt;Qe++){var st=mt(Qe);if(typeof st=="object")return st.value}if(Mt===1)for(var oe=0;oe<84;oe++)q();else{for(var oe=0;ne["harvest.phase"]!=="cta"&&oe<300;oe++)q();if(ne["harvest.phase"]!=="cta")throw Error("End card unavailable")}}ei()},pickReview:function(c,x){var R=Go(fc({clientX:c,clientY:x}));return R?Ho(R.c).map(function(A){var C;return(C=A.prototypeId)!==null&&C!==void 0?C:A.id}):[]},reviewBounds:function(c){var x=O(),R=e.clientWidth,A=e.clientHeight,C=Math.min(R/x.width,A/x.height);return ue.filter(function(N){return c.includes(N.c.id)}).map(function(N){var P=zi(N.c,N.m);return{left:(R-x.width*C)/2+P.left*C,top:(A-x.height*C)/2+P.top*C,width:(P.right-P.left)*C,height:(P.bottom-P.top)*C}})}}:void 0;return gt(gt({},og),{state:ca,auditViewport:$v,auditSceneLayout:Kv,restart:function(){var c;Ji=void 0,La=void 0,(c=_?.notifyGameRetry)===null||c===void 0||c.call(_),uc(),ei()},select:function(c){w=c},inspectScene:function(c){f&&n.scenes.some(function(x){return x.id===c})&&(J=c,w=void 0)},pause:function(c){ct=c,ut=0,zt=0,c&&gr(),_t&&(c?_t.suspend().catch(function(){}):je&&Hs())},destroy:function(){var c,x;pt=!0,cancelAnimationFrame(nn),gr(),pn(),jt?.dispose(),Qd?.(),jd?.(),ef?.(),_?.destroy(),(c=Ka?.disconnect)===null||c===void 0||c.call(Ka),document.removeEventListener("visibilitychange",Sp),(x=globalThis.removeEventListener)===null||x===void 0||x.call(globalThis,"resize",Kd),e.removeEventListener("pointerdown",gp),e.removeEventListener("pointermove",xp),e.removeEventListener("pointerup",_p),e.removeEventListener("pointercancel",hc),e.removeEventListener("lostpointercapture",hc),e.removeEventListener("click",Mp),_t?.close().catch(function(){})}})}return _g(ew);})();
