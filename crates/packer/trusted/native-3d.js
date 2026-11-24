var ToraNative=(()=>{var bh=Object.defineProperty;var _0=Object.getOwnPropertyDescriptor;var M0=Object.getOwnPropertyNames;var S0=Object.prototype.hasOwnProperty;var b0=(n,e)=>{for(var t in e)bh(n,t,{get:e[t],enumerable:!0})},w0=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of M0(e))!S0.call(n,r)&&r!==t&&bh(n,r,{get:()=>e[r],enumerable:!(i=_0(e,r))||i.enumerable});return n};var T0=n=>w0(bh({},"__esModule",{value:!0}),n);var BM={};b0(BM,{computeSafeArea:()=>pf,createNetworkBridge:()=>n0,layoutStandardText:()=>i0,mountNative:()=>OM});var Pf=function(n,e){if(!n)throw Error(e)},cs=function(){return[1,0,0,1,0,0]};function wh(n){return Pf(Array.isArray(n)&&n.length===6&&n.every(Number.isFinite),"E_SCENE_MATRIX"),n}function Sa(n,e){return wh(n),wh(e),[n[0]*e[0]+n[2]*e[1],n[1]*e[0]+n[3]*e[1],n[0]*e[2]+n[2]*e[3],n[1]*e[2]+n[3]*e[3],n[0]*e[4]+n[2]*e[5]+n[4],n[1]*e[4]+n[3]*e[5]+n[5]]}function Es(n){wh(n);var e=n[0]*n[3]-n[1]*n[2];return Pf(Math.abs(e)>1e-12,"E_SCENE_SINGULAR_TRANSFORM"),[n[3]/e,-n[1]/e,-n[2]/e,n[0]/e,(n[2]*n[5]-n[3]*n[4])/e,(n[1]*n[4]-n[0]*n[5])/e]}var Eh=function(){return Eh=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Eh.apply(this,arguments)},Vr=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},ta=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))},Th=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function Lf(n){var e=n.rows,t=n.columns,i=n.seed,r=n.slots,s=n.paint,a=n.onEvent,o=r.map(function(oe){return oe.group}),c=ta([],Vr(new Set(o)),!1),l=ta([],Vr(o),!1),u=i,d="idle",h=0,m,x,w=[],g=[],p=0,v=0,b=0,_,I,A=function(oe,pe){return oe*t+pe},P=function(oe){return Math.floor(oe/t)},y=function(oe){return oe%t},C=function(){return u=Math.imul(u,1664525)+1013904223>>>0,u/4294967296};function O(oe){for(var pe=new Set,Ue=0;Ue<e;Ue++)for(var ne=0;ne<t;ne++){var te=A(Ue,ne),Te=oe[te];if(ne+2<t&&Te===oe[te+1]&&Te===oe[te+2])for(var Fe=0;Fe<3;Fe++)pe.add(te+Fe);if(Ue+2<e&&Te===oe[te+t]&&Te===oe[te+t*2])for(var Fe=0;Fe<3;Fe++)pe.add(te+t*Fe)}return ta([],Vr(pe),!1)}function E(oe,pe){var Ue;if(l[oe]===l[pe])return!1;var ne=ta([],Vr(l),!1);return Ue=Vr([ne[pe],ne[oe]],2),ne[oe]=Ue[0],ne[pe]=Ue[1],O(ne).some(function(te){return te===oe||te===pe})}function G(){for(var oe=[],pe=0;pe<l.length;pe++)y(pe)+1<t&&E(pe,pe+1)&&oe.push({from:r[pe].id,to:r[pe+1].id}),P(pe)+1<e&&E(pe,pe+t)&&oe.push({from:r[pe].id,to:r[pe+t].id});return oe}function L(){for(var oe=0;oe<64;oe++){l=[];for(var pe=function(ne){var te=c.filter(function(Te){return!(y(ne)>=2&&l[ne-1]===Te&&l[ne-2]===Te)&&!(P(ne)>=2&&l[ne-t]===Te&&l[ne-t*2]===Te)});l.push(te[Math.floor(C()*te.length)])},Ue=0;Ue<r.length;Ue++)pe(Ue);if(G().length)return}l=r.map(function(ne,te){return c[(P(te)*2+y(te))%3]}),l[0]=c[0],l[1]=c[1],l[2]=c[0],l[t+1]=c[0]}function M(){for(var oe=0;oe<r.length;oe++)s(oe,l[oe],{})}function N(){u=i,l=ta([],Vr(o),!1),d="idle",h=0,m=void 0,x=void 0,w=[],g=[],p=0,v=0,b=0,_=void 0,I=void 0,(O(l).length||!G().length)&&L(),M()}function z(oe,pe){if(d!=="idle")return!1;var Ue=r.findIndex(function(te){return te.id===oe}),ne=r.findIndex(function(te){return te.id===pe});return Ue<0||ne<0||Math.abs(P(Ue)-P(ne))+Math.abs(y(Ue)-y(ne))!==1?!1:(m=void 0,_=void 0,M(),x=[Ue,ne],d="swap",h=0,!0)}function q(oe){if(d==="idle"){if(m===oe){m=void 0;return}if(!(m&&z(m,oe)))return m=oe,m}}function H(){w=O(l),b+=w.length,I={group:l[w[0]],from:r[w[0]].id,count:w.length},a("matchClear"),d="clear",h=0}function B(){var oe=new Set(w),pe=ta([],Vr(l),!1);g=[];for(var Ue=0;Ue<t;Ue++){for(var ne=[],te=e-1;te>=0;te--)oe.has(A(te,Ue))||ne.push(A(te,Ue));for(var Te=0,te=e-1;te>=0;te--){var Fe=A(te,Ue),Pe=ne[e-1-te];Pe!==void 0?(pe[Fe]=l[Pe],g.push({cell:Fe,from:Pe,offsetRows:0})):(pe[Fe]=c[Math.floor(C()*c.length)],g.push({cell:Fe,from:Fe,offsetRows:-(te+1+Te++)}))}}l=pe,d="fall",h=0}function Z(){if(O(l).length&&p<3){p++,H();return}(O(l).length||!G().length)&&L(),M(),d="idle",h=0,x=void 0,w=[],g=[],v++,a("validMatch")}function J(oe){var pe,Ue,ne,te,Te,Fe,Pe;if(d==="idle"){if(_){_.elapsed+=oe;var at=1+.065*Math.sin(Math.min(1,_.elapsed/.8)*Math.PI*4),It=function(Le){s(r.findIndex(function(ke){return ke.id===Le}),l[r.findIndex(function(ke){return ke.id===Le})],{scale:at})};try{for(var lt=Th(_.ids),qe=lt.next();!qe.done;qe=lt.next()){var zt=qe.value;It(zt)}}catch(Le){pe={error:Le}}finally{try{qe&&!qe.done&&(Ue=lt.return)&&Ue.call(lt)}finally{if(pe)throw pe.error}}_.elapsed>=.8&&(_=void 0,M())}return}if(h+=oe,d==="swap"||d==="reverse"){var We=Math.min(1,h/.14),ft=We*We*(3-2*We),Jt=Vr(x,2),en=Jt[0],Lt=Jt[1];if(s(en,l[en],{from:Lt,progress:d==="swap"?ft:1-ft}),s(Lt,l[Lt],{from:en,progress:d==="swap"?ft:1-ft}),We<1)return;if(d==="reverse"){M(),d="idle",x=void 0,a("invalidMatch");return}if(!E(en,Lt)){d="reverse",h=0;return}ne=Vr([l[Lt],l[en]],2),l[en]=ne[0],l[Lt]=ne[1],M(),H();return}if(d==="clear"){var Wt=Math.min(1,h/.18),at=Wt<.22?1+Wt*.45:Math.max(.05,1.1*(1-Wt)/.78);try{for(var W=Th(w),$t=W.next();!$t.done;$t=W.next()){var Nt=$t.value;s(Nt,l[Nt],{scale:at,opacity:1-Wt})}}catch(ke){te={error:ke}}finally{try{$t&&!$t.done&&(Te=W.return)&&Te.call(W)}finally{if(te)throw te.error}}Wt===1&&B();return}var D=Math.min(1,h/.25),S=1-Math.pow(1-D,3);try{for(var ee=Th(g),le=ee.next();!le.done;le=ee.next()){var ve=le.value;s(ve.cell,l[ve.cell],{from:ve.from,offsetRows:ve.offsetRows,progress:1-S})}}catch(Le){Fe={error:Le}}finally{try{le&&!le.done&&(Pe=ee.return)&&Pe.call(ee)}finally{if(Fe)throw Fe.error}}D===1&&Z()}function fe(){if(d==="idle"){m=void 0;var oe=G()[0];oe&&(_={ids:[oe.from,oe.to],elapsed:0})}}function Me(){var oe;return{phase:d,busy:d!=="idle",selected:m??null,moves:v,cleared:b,groups:ta([],Vr(l),!1),legalMoves:d==="idle"?G():[],hint:(oe=_?.ids)!==null&&oe!==void 0?oe:[],lastMatch:I?Eh({},I):null}}return{reset:N,select:q,swap:z,tick:J,showHint:fe,snapshot:Me,cancelSelection:function(){m=void 0,_&&(_=void 0,M())}}}var Po=function(){return Po=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Po.apply(this,arguments)},Of=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},ia=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},E0=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))},As=function(n,e){return Math.hypot(n,e)},Nf=function(n,e,t){return Math.max(e,Math.min(t,n))},na=function(n){return Math.max(1,Math.min(n.width,n.height)/2)};function Df(n){var e,t,i=Math.cos((e=n.angle)!==null&&e!==void 0?e:0),r=Math.sin((t=n.angle)!==null&&t!==void 0?t:0),s=n.width/2,a=n.height/2;return[[-s,-a],[s,-a],[s,a],[-s,a]].map(function(o){var c=Of(o,2),l=c[0],u=c[1];return{x:n.x+l*i-u*r,y:n.y+l*r+u*i}})}function A0(n,e){var t,i,r,s,a,o,c,l,u,d,h=Df(n),m=Df(e),x=[(c=n.angle)!==null&&c!==void 0?c:0,((l=n.angle)!==null&&l!==void 0?l:0)+Math.PI/2,(u=e.angle)!==null&&u!==void 0?u:0,((d=e.angle)!==null&&d!==void 0?d:0)+Math.PI/2],w=1/0,g=1,p=0;try{for(var v=ia(x),b=v.next();!b.done;b=v.next()){var _=b.value,I=Math.cos(_),A=Math.sin(_),P=1/0,y=-1/0,C=1/0,O=-1/0;try{for(var E=(r=void 0,ia(h)),G=E.next();!G.done;G=E.next()){var L=G.value,M=L.x*I+L.y*A;M<P&&(P=M),M>y&&(y=M)}}catch(H){r={error:H}}finally{try{G&&!G.done&&(s=E.return)&&s.call(E)}finally{if(r)throw r.error}}try{for(var N=(a=void 0,ia(m)),z=N.next();!z.done;z=N.next()){var L=z.value,M=L.x*I+L.y*A;M<C&&(C=M),M>O&&(O=M)}}catch(H){a={error:H}}finally{try{z&&!z.done&&(o=N.return)&&o.call(N)}finally{if(a)throw a.error}}var q=Math.min(y,O)-Math.max(P,C);if(q<=0)return null;q<w&&(w=q,g=I,p=A)}}catch(H){t={error:H}}finally{try{b&&!b.done&&(i=v.return)&&i.call(v)}finally{if(t)throw t.error}}return(n.x-e.x)*g+(n.y-e.y)*p<0&&(g=-g,p=-p),{nx:g,ny:p,penetration:w}}function Uf(n,e){var t,i,r,s=na(n),a=-((t=e.angle)!==null&&t!==void 0?t:0),o=Math.cos(a),c=Math.sin(a),l=n.x-e.x,u=n.y-e.y,d=l*o-u*c,h=l*c+u*o,m=e.width/2,x=e.height/2,w=Nf(d,-m,m),g=Nf(h,-x,x),p=d-w,v=h-g,b=As(p,v),_;if(b>=s)return null;if(b<1e-4){var I=[{d:m-Math.abs(d),x:d>=0?1:-1,y:0},{d:x-Math.abs(h),x:0,y:h>=0?1:-1}].sort(function(y,C){return y.d-C.d});p=I[0].x,v=I[0].y,_=s+I[0].d}else p/=b,v/=b,_=s-b;var A=Math.cos((i=e.angle)!==null&&i!==void 0?i:0),P=Math.sin((r=e.angle)!==null&&r!==void 0?r:0);return{nx:p*A-v*P,ny:p*P+v*A,penetration:_}}function Ff(n,e,t){var i,r,s,a;if(!(n.captured||e.captured)){var o=n.x-e.x,c=n.y-e.y,l;if(n.shape==="circle"&&e.shape==="circle"){var u=As(o,c),d=na(n)+na(e)-u;if(d<=0)return;l=d,u>1e-4?(o/=u,c/=u):(o=1,c=0)}else if(n.shape==="circle"&&e.shape==="box"){var h=Uf(n,e);if(!h)return;o=h.nx,c=h.ny,l=h.penetration}else if(n.shape==="box"&&e.shape==="circle"){var h=Uf(e,n);if(!h)return;o=-h.nx,c=-h.ny,l=h.penetration}else if(n.shape==="box"&&e.shape==="box"){var h=A0(n,e);if(!h)return;o=h.nx,c=h.ny,l=h.penetration}else return;var m=n.mode==="dynamic"?1:0,x=e.mode==="dynamic"?1:0,w=m+x;if(w){n.x+=o*l*m/w,n.y+=c*l*m/w,e.mode==="dynamic"&&(e.x-=o*l*x/w,e.y-=c*l*x/w);var g=n.vx-((i=e.vx)!==null&&i!==void 0?i:0),p=n.vy-((r=e.vy)!==null&&r!==void 0?r:0),v=g*o+p*c;if(!(v>=0)){var b=Math.max((s=n.restitution)!==null&&s!==void 0?s:0,(a=e.restitution)!==null&&a!==void 0?a:0),_=-(1+b)*v/w;n.vx+=o*_*m,n.vy+=c*_*m,e.mode==="dynamic"&&(e.vx-=o*_*x,e.vy-=c*_*x),n.atRest=!1,n.restElapsed=0,e.mode==="dynamic"&&(e.atRest=!1,e.restElapsed=0),Math.abs(v)>4&&(t("bodyBounce",n,e,{speed:Math.abs(v)}),e.mode==="dynamic"&&t("bodyBounce",e,n,{speed:Math.abs(v)}))}}}}function I0(n,e,t,i){var r,s;if(!(n.mode!=="dynamic"||n.captured))try{for(var a=ia(e),o=a.next();!o.done;o=a.next()){var c=o.value,l=c.x-n.x,u=c.y-n.y,d=As(l,u);if(!(d>=c.radius*2.5)){if(d>c.radius&&d>.001&&c.pullStrength>0){var h=c.pullStrength*(1-d/(c.radius*2.5));n.vx+=l/d*h*t,n.vy+=u/d*h*t}if(d<c.radius&&As(n.vx,n.vy)<=c.maxCaptureSpeed){n.captured=!0,n.atRest=!0,n.vx=c.stopBody?0:n.vx,n.vy=c.stopBody?0:n.vy,c.stopBody&&(n.x=c.x,n.y=c.y),i("zoneCapture",n,c,{});return}}}}catch(m){r={error:m}}finally{try{o&&!o.done&&(s=a.return)&&s.call(a)}finally{if(r)throw r.error}}}function Ah(n){for(var e,t,i,r,s,a,o,c,l,u,d,h=n.bodies,m=n.zones,x=m===void 0?[]:m,w=n.bounds,g=n.dt,p=n.onEvent,v=p===void 0?function(){}:p,b=h.filter(function(pe){return pe.mode==="dynamic"&&!pe.captured}),_=b.reduce(function(pe,Ue){return Math.max(pe,As(Ue.vx,Ue.vy))},0),I=b.reduce(function(pe,Ue){return Math.min(pe,na(Ue))},24),A=Math.min(16,Math.max(1,Math.ceil(_*g/(I*.45)))),P=g/A,y=0;y<A;y++){try{for(var C=(e=void 0,ia(b)),O=C.next();!O.done;O=C.next()){var E=O.value;E.vy+=((o=E.gravity)!==null&&o!==void 0?o:0)*P;var G=As(E.vx,E.vy);if(G>E.maxSpeed){var L=E.maxSpeed/G;E.vx*=L,E.vy*=L,G=E.maxSpeed}E.x+=E.vx*P,E.y+=E.vy*P;var M=Math.max(0,G-((c=E.friction)!==null&&c!==void 0?c:0)*P),N=Math.exp(-((l=E.linearDamping)!==null&&l!==void 0?l:0)*P);if(G>1e-4){var z=M/G*N;E.vx*=z,E.vy*=z}E.spinToRotation&&(E.angle=((u=E.angle)!==null&&u!==void 0?u:0)+As(E.vx,E.vy)*P/na(E)*(E.vx<0?-1:1))}}catch(pe){e={error:pe}}finally{try{O&&!O.done&&(t=C.return)&&t.call(C)}finally{if(e)throw e.error}}for(var q=0;q<b.length;q++){var E=b[q];try{for(var H=(i=void 0,ia(h)),B=H.next();!B.done;B=H.next()){var Z=B.value;Z.id!==E.id&&Z.mode!=="dynamic"&&Ff(E,Z,v)}}catch(Ue){i={error:Ue}}finally{try{B&&!B.done&&(r=H.return)&&r.call(H)}finally{if(i)throw i.error}}for(var Z=q+1;Z<b.length;Z++)Ff(b[Z],E,v);var J=E.shape==="box"?E.width/2:na(E),fe=E.shape==="box"?E.height/2:na(E);E.wallBounce?(E.x-J<w.left&&(E.x=w.left+J,E.vx<0&&(v("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.x+J>w.right&&(E.x=w.right-J,E.vx>0&&(v("bodyBounce",E,null,{speed:Math.abs(E.vx)}),E.vx=-E.vx*E.restitution)),E.y-fe<w.top&&(E.y=w.top+fe,E.vy<0&&(v("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution)),E.y+fe>w.bottom&&(E.y=w.bottom-fe,E.vy>0&&(v("bodyBounce",E,null,{speed:Math.abs(E.vy)}),E.vy=-E.vy*E.restitution))):!E.exited&&(E.x+J<w.left||E.x-J>w.right||E.y+fe<w.top||E.y-fe>w.bottom)&&(E.exited=!0,v("boundaryExit",E,null,{})),I0(E,x,P,v)}}try{for(var Me=ia(b),oe=Me.next();!oe.done;oe=Me.next()){var E=oe.value,G=As(E.vx,E.vy);G<E.restSpeed&&!E.captured?(E.restElapsed=((d=E.restElapsed)!==null&&d!==void 0?d:0)+g,E.restElapsed>=E.restDelaySeconds&&!E.atRest&&(E.atRest=!0,E.vx=0,E.vy=0,v("bodyRest",E,null,{}))):G>=E.restSpeed&&(E.restElapsed=0,E.atRest=!1)}}catch(pe){s={error:pe}}finally{try{oe&&!oe.done&&(a=Me.return)&&a.call(Me)}finally{if(s)throw s.error}}}function Bf(n){for(var e=n.body,t=n.bodies,i=n.zones,r=i===void 0?[]:i,s=n.bounds,a=n.dots,o=a===void 0?8:a,c=n.bounces,l=c===void 0?1:c,u=function(b){return Po({},b)},d=u(e),h=t.filter(function(b){return b.id!==e.id}).map(u),m=E0([d],Of(h),!1),x=[],w=0,g=!1,p=function(b,_,I,A){b==="bodyBounce"&&A.sourceId===e.id&&w++,b==="zoneCapture"&&A.sourceId===e.id&&(g=!0)},v=0;v<90&&x.length<o&&!g&&w<=l;v++)Ah({bodies:m,zones:r,bounds:s,dt:1/60,onEvent:function(b,_,I,A){return p(b,_,I,Po(Po({},A),{sourceId:_.id}))}}),v%Math.max(1,Math.floor(90/o))===0&&x.push({x:d.x,y:d.y});return x}var ba=function(){return ba=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},ba.apply(this,arguments)},Jl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},kf=.008333333333333333;function Lo(n,e,t){var i,r,s,a=(i=n.boundsX)!==null&&i!==void 0?i:3,o=(r=n.boundsZ)!==null&&r!==void 0?r:7;if(Math.abs(e)>a||Math.abs(t)>o)return null;if(!n.ramp)return 0;var c=(s=n.rampHeight)!==null&&s!==void 0?s:1.1;return t>=1?0:t<=-1?c:(1-t)*(c*.5)}function zf(n,e,t,i){var r,s,a,o=n.radius,c=Math.cos(e.angle),l=Math.sin(e.angle),u=n.x-e.x,d=n.z-e.z,h=c*u+l*d,m=-l*u+c*d,x=Math.max(-e.hx,Math.min(e.hx,h)),w=Math.max(-e.hz,Math.min(e.hz,m)),g=h-x,p=m-w,v=Math.hypot(g,p),b=Lo(n,n.x,n.z);if(!(v>=o||b!==null&&n.y>b+.55)){v<1e-8?e.hx-Math.abs(h)<e.hz-Math.abs(m)?(g=h<0?-1:1,p=0,v=0):(g=0,p=m<0?-1:1,v=0):(g/=v,p/=v);var _=c*g-l*p,I=l*g+c*p;n.x+=_*(o-v+1e-5),n.z+=I*(o-v+1e-5);var A=(r=e.vx)!==null&&r!==void 0?r:0,P=(s=e.vz)!==null&&s!==void 0?s:0,y=(n.vx-A)*_+(n.vz-P)*I;if(y<0){var C=1+((a=n.restitution)!==null&&a!==void 0?a:.72);n.vx-=C*y*_,n.vz-=C*y*I,Math.abs(y)>.3&&t>0&&i&&i("bodyBounce",n,e.sourceId?e:void 0)}}}function Vf(n,e){n.vx=0,n.vy=0,n.vz=0,n.airborne=!1,n.atRest=!0,n.restElapsed=0,n.movingTime=0,e&&e("bodyRest",n)}function Ih(n,e){n.x=n.lastSafe.x,n.y=n.lastSafe.y,n.z=n.lastSafe.z,Vf(n,e)}function Ch(n){var e,t,i,r,s,a,o,c,l,u,d,h,m,x,w,g,p,v,b=n.bodies,_=n.walls,I=n.zones,A=n.dt,P=n.onEvent;if(!(!Number.isFinite(A)||A<=0))for(var y=Math.max(1,Math.round(A/kf)),C=A/y,O=0;O<y;O++)try{for(var E=(e=void 0,Jl(b)),G=E.next();!G.done;G=E.next()){var L=G.value;if(!(L.mode!=="dynamic"||L.captured)&&!L.atRest){var M=(l=L.boundsX)!==null&&l!==void 0?l:3,N=(u=L.boundsZ)!==null&&u!==void 0?u:7;if(L.y<-3||Math.abs(L.x)>M+2||Math.abs(L.z)>N+2){Ih(L,P);continue}L.movingTime=((d=L.movingTime)!==null&&d!==void 0?d:0)+C;var z=L.radius,q=Math.hypot(L.vx,L.vy,L.vz),H=Math.max(1,Math.min(16,Math.ceil(q*C/(z*.45)))),B=C/H;(!L._perimeter||L._pbx!==M||L._pbz!==N)&&(L._pbx=M,L._pbz=N,L._perimeter=[{x:-(M+.1),z:0,hx:.1,hz:N+.1,angle:0,vx:0,vz:0},{x:M+.1,z:0,hx:.1,hz:N+.1,angle:0,vx:0,vz:0},{x:0,z:-(N+.1),hx:M+.1,hz:.1,angle:0,vx:0,vz:0},{x:0,z:N+.1,hx:M+.1,hz:.1,angle:0,vx:0,vz:0}]);for(var Z=L._perimeter,J=!1,fe=0;fe<H;fe++){var Me=Lo(L,L.x,L.z),oe=Me!==null&&L.y<=Me+z+.012&&L.vy<=.1,pe=Me;if(oe){L.y=Me+z,L.vy=0;var Ue=Math.hypot(L.vx,L.vz),ne=Math.max(0,Ue-((h=L.friction)!==null&&h!==void 0?h:1.05)*B);if(Ue>0&&(L.vx*=ne/Ue,L.vz*=ne/Ue),L.ramp&&L.z<1&&L.z>-1){var te=((m=L.rampHeight)!==null&&m!==void 0?m:1.1)*.5;L.vz+=9.81*te/(1+te*te)*B}}else L.vy-=9.81*B,L.airborne||(L.airborne=!0,P&&P("bodyJump",L));L.x+=L.vx*B,L.z+=L.vz*B,L.y+=L.vy*B;var Te=Lo(L,L.x,L.z);if(Te!==null){if(oe&&pe!==null){var te=((x=L.rampHeight)!==null&&x!==void 0?x:1.1)*.5;L.ramp&&L.z<=-1&&L.z-L.vz*B>-1.5&&L.vz<-.8?(L.vy=-L.vz*te,L.airborne=!0,P&&P("bodyJump",L)):L.y=Te+z}L.y<Te+z&&(L.y=Te+z,L.vy=0,L.airborne=!1)}if(L.y<2){try{for(var Fe=(i=void 0,Jl(_)),Pe=Fe.next();!Pe.done;Pe=Fe.next()){var at=Pe.value;zf(L,at,B,P)}}catch(Lt){i={error:Lt}}finally{try{Pe&&!Pe.done&&(r=Fe.return)&&r.call(Fe)}finally{if(i)throw i.error}}try{for(var It=(s=void 0,Jl(Z)),lt=It.next();!lt.done;lt=It.next()){var at=lt.value;zf(L,at,B,P)}}catch(Lt){s={error:Lt}}finally{try{lt&&!lt.done&&(a=It.return)&&a.call(It)}finally{if(s)throw s.error}}}L.spin=((w=L.spin)!==null&&w!==void 0?w:0)+Math.hypot(L.vx,L.vz)*B/z;var qe=Math.hypot(L.vx,L.vz);try{for(var zt=(o=void 0,Jl(I)),We=zt.next();!We.done;We=zt.next()){var ft=We.value,Jt=Math.hypot(L.x-ft.x,L.z-ft.z);if(Jt<ft.radius&&Math.abs(L.y-(ft.y+z))<ft.heightTolerance&&qe<ft.maxCaptureSpeed){L.captured=!0,L.captureElapsed=0,L.captureTarget={x:ft.x,y:ft.y,z:ft.z},L.vx=0,L.vy=0,L.vz=0,L.atRest=!0,P&&P("zoneCapture",L,ft),J=!0;break}}}catch(Lt){o={error:Lt}}finally{try{We&&!We.done&&(c=zt.return)&&c.call(zt)}finally{if(o)throw o.error}}if(J)break;if(L.y<-3||Math.abs(L.x)>M+2||Math.abs(L.z)>N+2){Ih(L,P),J=!0;break}}if(!J){var en=Math.hypot(L.vx,L.vy,L.vz);en<((g=L.restSpeed)!==null&&g!==void 0?g:.07)?(L.restElapsed=((p=L.restElapsed)!==null&&p!==void 0?p:0)+C,L.restElapsed>((v=L.restDelaySeconds)!==null&&v!==void 0?v:.25)&&Vf(L,P)):L.restElapsed=0,L.movingTime>18&&Ih(L,P)}}}}catch(Lt){e={error:Lt}}finally{try{G&&!G.done&&(t=E.return)&&t.call(E)}finally{if(e)throw e.error}}}function Gf(n){var e,t=n.body,i=n.walls,r=n.zones,s=n.vx,a=n.vz,o=n.dots,c=o===void 0?15:o,l=Math.hypot(s,a);if(!Number.isFinite(l)||l<.35)return[];for(var u=Math.min(1,((e=t.maxSpeed)!==null&&e!==void 0?e:9)/l),d=ba(ba({},t),{vx:s*u,vy:0,vz:a*u,atRest:!1,captured:!1,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:t.x,y:t.y,z:t.z}}),h=i.map(function(v){return ba(ba({},v),{vx:0,vz:0})}),m=[d],x={bodies:m,walls:h,zones:r,dt:kf},w=[],g=Math.max(18,c*6),p=0;p<g&&(Ch(x),p%6===0&&w.push({x:d.x,y:d.y,z:d.z}),!(d.atRest||d.captured));p++);return w}var Mp=0,fd=1,Sp=2;var gl=1,ru=2,ja=3,Vs=0,Xi=1,ji=2,$r=0,eo=1,pd=2,md=3,vd=4,bp=5;var da=100,wp=101,Tp=102,Ep=103,Ap=104,Ip=200,Cp=201,Rp=202,Pp=203,gd=204,xd=205,Lp=206,Np=207,Dp=208,Up=209,Fp=210,Op=211,Bp=212,zp=213,kp=214,_c=0,Mc=1,Sc=2,ka=3,bc=4,wc=5,Tc=6,Ec=7,su=0,Vp=1,Gp=2,Cr=0,yd=1,_d=2,Md=3,Sd=4,bd=5,wd=6,Td=7;var Ed=300,Gs=301,fa=302,au=303,ou=304,xl=306,Ac=1e3,Hr=1001,Ic=1002,Mi=1003,Hp=1004;var yl=1005;var Ti=1006,lu=1007;var Hs=1008;var er=1009,Ad=1010,Id=1011,to=1012,cu=1013,Rr=1014,yr=1015,Pr=1016,uu=1017,hu=1018,no=1020,Cd=35902,Rd=35899,Pd=1021,Ld=1022,_r=1023,Wr=1026,Ws=1027,du=1028,fu=1029,Xs=1030,pu=1031;var mu=1033,_l=33776,Ml=33777,Sl=33778,bl=33779,vu=35840,gu=35841,xu=35842,yu=35843,_u=36196,Mu=37492,Su=37496,bu=37488,wu=37489,wl=37490,Tu=37491,Eu=37808,Au=37809,Iu=37810,Cu=37811,Ru=37812,Pu=37813,Lu=37814,Nu=37815,Du=37816,Uu=37817,Fu=37818,Ou=37819,Bu=37820,zu=37821,ku=36492,Vu=36494,Gu=36495,Hu=36283,Wu=36284,Tl=36285,Xu=36286;var Ho=2300,Cc=2301,xc=2302,nd=2303,id=2400,rd=2401,sd=2402;var Wp=3200;var qu=0,Xp=1,gs="",Wi="srgb",Wo="srgb-linear",Xo="linear",Pn="srgb";var yc=7680;var qp=519,Yp=512,Zp=513,Jp=514,Yu=515,$p=516,Kp=517,Zu=518,Qp=519,jp=35044;var Nd="300 es",Ir=2e3,Va=2001;function C0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function R0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function qo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function em(){let n=qo("canvas");return n.style.display="block",n}var Hf={},Ga=null;function Dd(...n){let e="THREE."+n.shift();Ga?Ga("log",e,...n):console.log(e,...n)}function tm(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ht(...n){n=tm(n);let e="THREE."+n.shift();if(Ga)Ga("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Xt(...n){n=tm(n);let e="THREE."+n.shift();if(Ga)Ga("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function la(...n){let e=n.join(" ");e in Hf||(Hf[e]=!0,Ht(...n))}function nm(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var im={[_c]:Mc,[Sc]:Tc,[bc]:Ec,[ka]:wc,[Mc]:_c,[Tc]:Sc,[Ec]:bc,[wc]:ka},Xr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Rh=Math.PI/180,Rc=180/Math.PI;function io(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ni[n&255]+Ni[n>>8&255]+Ni[n>>16&255]+Ni[n>>24&255]+"-"+Ni[e&255]+Ni[e>>8&255]+"-"+Ni[e>>16&15|64]+Ni[e>>24&255]+"-"+Ni[t&63|128]+Ni[t>>8&255]+"-"+Ni[t>>16&255]+Ni[t>>24&255]+Ni[i&255]+Ni[i>>8&255]+Ni[i>>16&255]+Ni[i>>24&255]).toLowerCase()}function dn(n,e,t){return Math.max(e,Math.min(t,n))}function P0(n,e){return(n%e+e)%e}function Ph(n,e,t){return(1-t)*n+t*e}function No(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $i(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var kd=class kd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dn(this.x,e.x,t.x),this.y=dn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dn(this.x,e,t),this.y=dn(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(dn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};kd.prototype.isVector2=!0;var wt=kd,qr=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],h=s[a+0],m=s[a+1],x=s[a+2],w=s[a+3];if(d!==w||c!==h||l!==m||u!==x){let g=c*h+l*m+u*x+d*w;g<0&&(h=-h,m=-m,x=-x,w=-w,g=-g);let p=1-o;if(g<.9995){let v=Math.acos(g),b=Math.sin(v);p=Math.sin(p*v)/b,o=Math.sin(o*v)/b,c=c*p+h*o,l=l*p+m*o,u=u*p+x*o,d=d*p+w*o}else{c=c*p+h*o,l=l*p+m*o,u=u*p+x*o,d=d*p+w*o;let v=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=v,l*=v,u*=v,d*=v}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[a],h=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*d+c*m-l*h,e[t+1]=c*x+u*h+l*d-o*m,e[t+2]=l*x+u*m+o*h-c*d,e[t+3]=u*x-o*d-c*h-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(s/2),h=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*m*x,this._y=l*m*d-h*u*x,this._z=l*u*x+h*m*d,this._w=l*u*d-h*m*x;break;case"YXZ":this._x=h*u*d+l*m*x,this._y=l*m*d-h*u*x,this._z=l*u*x-h*m*d,this._w=l*u*d+h*m*x;break;case"ZXY":this._x=h*u*d-l*m*x,this._y=l*m*d+h*u*x,this._z=l*u*x+h*m*d,this._w=l*u*d-h*m*x;break;case"ZYX":this._x=h*u*d-l*m*x,this._y=l*m*d+h*u*x,this._z=l*u*x-h*m*d,this._w=l*u*d+h*m*x;break;case"YZX":this._x=h*u*d+l*m*x,this._y=l*m*d+h*u*x,this._z=l*u*x-h*m*d,this._w=l*u*d-h*m*x;break;case"XZY":this._x=h*u*d-l*m*x,this._y=l*m*d-h*u*x,this._z=l*u*x+h*m*d,this._w=l*u*d+h*m*x;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>d){let m=2*Math.sqrt(1+i-o-d);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>d){let m=2*Math.sqrt(1+o-i-d);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+d-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dn(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Vd=class Vd{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+c*l+a*d-o*u,this.y=i+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dn(this.x,e.x,t.x),this.y=dn(this.y,e.y,t.y),this.z=dn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dn(this.x,e,t),this.y=dn(this.y,e,t),this.z=dn(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Lh.copy(this).projectOnVector(e),this.sub(Lh)}reflect(e){return this.sub(Lh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(dn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vd.prototype.isVector3=!0;var re=Vd,Lh=new re,Wf=new qr,Gd=class Gd{constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],m=i[5],x=i[8],w=r[0],g=r[3],p=r[6],v=r[1],b=r[4],_=r[7],I=r[2],A=r[5],P=r[8];return s[0]=a*w+o*v+c*I,s[3]=a*g+o*b+c*A,s[6]=a*p+o*_+c*P,s[1]=l*w+u*v+d*I,s[4]=l*g+u*b+d*A,s[7]=l*p+u*_+d*P,s[2]=h*w+m*v+x*I,s[5]=h*g+m*b+x*A,s[8]=h*p+m*_+x*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,m=l*s-a*c,x=t*d+i*h+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/x;return e[0]=d*w,e[1]=(r*l-u*i)*w,e[2]=(o*i-r*a)*w,e[3]=h*w,e[4]=(u*t-r*c)*w,e[5]=(r*s-o*t)*w,e[6]=m*w,e[7]=(i*c-l*t)*w,e[8]=(a*t-i*s)*w,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return la("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nh.makeScale(e,t)),this}rotate(e){return la("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nh.makeRotation(-e)),this}translate(e,t){return la("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Gd.prototype.isMatrix3=!0;var Kt=Gd,Nh=new Kt,Xf=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qf=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function L0(){let n={enabled:!0,workingColorSpace:Wo,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Pn&&(r.r=ms(r.r),r.g=ms(r.g),r.b=ms(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Pn&&(r.r=Ba(r.r),r.g=Ba(r.g),r.b=Ba(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gs?Xo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return la("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return la("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Wo]:{primaries:e,whitePoint:i,transfer:Xo,toXYZ:Xf,fromXYZ:qf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wi},outputColorSpaceConfig:{drawingBufferColorSpace:Wi}},[Wi]:{primaries:e,whitePoint:i,transfer:Pn,toXYZ:Xf,fromXYZ:qf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wi}}}),n}var mn=L0();function ms(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ba(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var wa,Pc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{wa===void 0&&(wa=qo("canvas")),wa.width=e.width,wa.height=e.height;let r=wa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=wa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=qo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ms(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ms(t[i]/255)*255):t[i]=ms(t[i]);return{data:t,width:e.width,height:e.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},N0=0,Ha=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=io(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Dh(r[a].image)):s.push(Dh(r[a]))}else s=Dh(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Dh(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Pc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}var D0=0,Uh=new re,Fi=class n extends Xr{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Hr,r=Hr,s=Ti,a=Hs,o=_r,c=er,l=n.DEFAULT_ANISOTROPY,u=gs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=io(),this.name="",this.source=new Ha(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uh).x}get height(){return this.source.getSize(Uh).y}get depth(){return this.source.getSize(Uh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ht(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ht(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ac:e.x=e.x-Math.floor(e.x);break;case Hr:e.x=e.x<0?0:1;break;case Ic:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ac:e.y=e.y-Math.floor(e.y);break;case Hr:e.y=e.y<0?0:1;break;case Ic:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Fi.DEFAULT_IMAGE=null;Fi.DEFAULT_MAPPING=Ed;Fi.DEFAULT_ANISOTROPY=1;var Hd=class Hd{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],m=c[5],x=c[9],w=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-w)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+w)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,_=(m+1)/2,I=(p+1)/2,A=(u+h)/4,P=(d+w)/4,y=(x+g)/4;return b>_&&b>I?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=A/i,s=P/i):_>I?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=A/r,s=y/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=P/s,r=y/s),this.set(i,r,s,t),this}let v=Math.sqrt((g-x)*(g-x)+(d-w)*(d-w)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-x)/v,this.y=(d-w)/v,this.z=(h-u)/v,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dn(this.x,e.x,t.x),this.y=dn(this.y,e.y,t.y),this.z=dn(this.z,e.z,t.z),this.w=dn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dn(this.x,e,t),this.y=dn(this.y,e,t),this.z=dn(this.z,e,t),this.w=dn(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dn(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hd.prototype.isVector4=!0;var qn=Hd,Lc=class extends Xr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ti,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new qn(0,0,e,t),this.scissorTest=!1,this.viewport=new qn(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Fi(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ti,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ha(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qi=class extends Lc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Yo=class extends Fi{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Mi,this.minFilter=Mi,this.wrapR=Hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Nc=class extends Fi{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Mi,this.minFilter=Mi,this.wrapR=Hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var iu=class iu{constructor(e,t,i,r,s,a,o,c,l,u,d,h,m,x,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,d,h,m,x,w,g)}set(e,t,i,r,s,a,o,c,l,u,d,h,m,x,w,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=m,p[7]=x,p[11]=w,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new iu().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Ta.setFromMatrixColumn(e,0).length(),s=1/Ta.setFromMatrixColumn(e,1).length(),a=1/Ta.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=a*u,m=a*d,x=o*u,w=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=m+x*l,t[5]=h-w*l,t[9]=-o*c,t[2]=w-h*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){let h=c*u,m=c*d,x=l*u,w=l*d;t[0]=h+w*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=w+h*o,t[10]=a*c}else if(e.order==="ZXY"){let h=c*u,m=c*d,x=l*u,w=l*d;t[0]=h-w*o,t[4]=-a*d,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=w-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let h=a*u,m=a*d,x=o*u,w=o*d;t[0]=c*u,t[4]=x*l-m,t[8]=h*l+w,t[1]=c*d,t[5]=w*l+h,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let h=a*c,m=a*l,x=o*c,w=o*l;t[0]=c*u,t[4]=w-h*d,t[8]=x*d+m,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*d+x,t[10]=h-w*d}else if(e.order==="XZY"){let h=a*c,m=a*l,x=o*c,w=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+w,t[5]=a*u,t[9]=m*d-x,t[2]=x*d-m,t[6]=o*u,t[10]=w*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U0,e,F0)}lookAt(e,t,i){let r=this.elements;return lr.subVectors(e,t),lr.lengthSq()===0&&(lr.z=1),lr.normalize(),Is.crossVectors(i,lr),Is.lengthSq()===0&&(Math.abs(i.z)===1?lr.x+=1e-4:lr.z+=1e-4,lr.normalize(),Is.crossVectors(i,lr)),Is.normalize(),$l.crossVectors(lr,Is),r[0]=Is.x,r[4]=$l.x,r[8]=lr.x,r[1]=Is.y,r[5]=$l.y,r[9]=lr.y,r[2]=Is.z,r[6]=$l.z,r[10]=lr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],m=i[13],x=i[2],w=i[6],g=i[10],p=i[14],v=i[3],b=i[7],_=i[11],I=i[15],A=r[0],P=r[4],y=r[8],C=r[12],O=r[1],E=r[5],G=r[9],L=r[13],M=r[2],N=r[6],z=r[10],q=r[14],H=r[3],B=r[7],Z=r[11],J=r[15];return s[0]=a*A+o*O+c*M+l*H,s[4]=a*P+o*E+c*N+l*B,s[8]=a*y+o*G+c*z+l*Z,s[12]=a*C+o*L+c*q+l*J,s[1]=u*A+d*O+h*M+m*H,s[5]=u*P+d*E+h*N+m*B,s[9]=u*y+d*G+h*z+m*Z,s[13]=u*C+d*L+h*q+m*J,s[2]=x*A+w*O+g*M+p*H,s[6]=x*P+w*E+g*N+p*B,s[10]=x*y+w*G+g*z+p*Z,s[14]=x*C+w*L+g*q+p*J,s[3]=v*A+b*O+_*M+I*H,s[7]=v*P+b*E+_*N+I*B,s[11]=v*y+b*G+_*z+I*Z,s[15]=v*C+b*L+_*q+I*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],m=e[14],x=e[3],w=e[7],g=e[11],p=e[15],v=c*m-l*h,b=o*m-l*d,_=o*h-c*d,I=a*m-l*u,A=a*h-c*u,P=a*d-o*u;return t*(w*v-g*b+p*_)-i*(x*v-g*I+p*A)+r*(x*b-w*I+p*P)-s*(x*_-w*A+g*P)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],m=e[11],x=e[12],w=e[13],g=e[14],p=e[15],v=t*o-i*a,b=t*c-r*a,_=t*l-s*a,I=i*c-r*o,A=i*l-s*o,P=r*l-s*c,y=u*w-d*x,C=u*g-h*x,O=u*p-m*x,E=d*g-h*w,G=d*p-m*w,L=h*p-m*g,M=v*L-b*G+_*E+I*O-A*C+P*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/M;return e[0]=(o*L-c*G+l*E)*N,e[1]=(r*G-i*L-s*E)*N,e[2]=(w*P-g*A+p*I)*N,e[3]=(h*A-d*P-m*I)*N,e[4]=(c*O-a*L-l*C)*N,e[5]=(t*L-r*O+s*C)*N,e[6]=(g*_-x*P-p*b)*N,e[7]=(u*P-h*_+m*b)*N,e[8]=(a*G-o*O+l*y)*N,e[9]=(i*O-t*G-s*y)*N,e[10]=(x*A-w*_+p*v)*N,e[11]=(d*_-u*A-m*v)*N,e[12]=(o*C-a*E-c*y)*N,e[13]=(t*E-i*C+r*y)*N,e[14]=(w*b-x*I-g*v)*N,e[15]=(u*I-d*b+h*v)*N,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,m=s*u,x=s*d,w=a*u,g=a*d,p=o*d,v=c*l,b=c*u,_=c*d,I=i.x,A=i.y,P=i.z;return r[0]=(1-(w+p))*I,r[1]=(m+_)*I,r[2]=(x-b)*I,r[3]=0,r[4]=(m-_)*A,r[5]=(1-(h+p))*A,r[6]=(g+v)*A,r[7]=0,r[8]=(x+b)*P,r[9]=(g-v)*P,r[10]=(1-(h+w))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ta.set(r[0],r[1],r[2]).length(),o=Ta.set(r[4],r[5],r[6]).length(),c=Ta.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Tr.copy(this);let l=1/a,u=1/o,d=1/c;return Tr.elements[0]*=l,Tr.elements[1]*=l,Tr.elements[2]*=l,Tr.elements[4]*=u,Tr.elements[5]*=u,Tr.elements[6]*=u,Tr.elements[8]*=d,Tr.elements[9]*=d,Tr.elements[10]*=d,t.setFromRotationMatrix(Tr),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Ir,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),m=(i+r)/(i-r),x,w;if(c)x=s/(a-s),w=a*s/(a-s);else if(o===Ir)x=-(a+s)/(a-s),w=-2*a*s/(a-s);else if(o===Va)x=-a/(a-s),w=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=w,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Ir,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),m=-(i+r)/(i-r),x,w;if(c)x=1/(a-s),w=a/(a-s);else if(o===Ir)x=-2/(a-s),w=-(a+s)/(a-s);else if(o===Va)x=-1/(a-s),w=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=w,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};iu.prototype.isMatrix4=!0;var Ln=iu,Ta=new re,Tr=new Ln,U0=new re(0,0,0),F0=new re(1,1,1),Is=new re,$l=new re,lr=new re,Yf=new Ln,Zf=new qr,vs=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(dn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(dn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-dn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(dn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-dn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Yf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zf.setFromEuler(this),this.setFromQuaternion(Zf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vs.DEFAULT_ORDER="XYZ";var Wa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},O0=0,Jf=new re,Ea=new qr,us=new Ln,Kl=new re,Do=new re,B0=new re,z0=new qr,$f=new re(1,0,0),Kf=new re(0,1,0),Qf=new re(0,0,1),jf={type:"added"},k0={type:"removed"},Aa={type:"childadded",child:null},Fh={type:"childremoved",child:null},Oi=class n extends Xr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=io(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new re,t=new vs,i=new qr,r=new re(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ln},normalMatrix:{value:new Kt}}),this.matrix=new Ln,this.matrixWorld=new Ln,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ea.setFromAxisAngle(e,t),this.quaternion.multiply(Ea),this}rotateOnWorldAxis(e,t){return Ea.setFromAxisAngle(e,t),this.quaternion.premultiply(Ea),this}rotateX(e){return this.rotateOnAxis($f,e)}rotateY(e){return this.rotateOnAxis(Kf,e)}rotateZ(e){return this.rotateOnAxis(Qf,e)}translateOnAxis(e,t){return Jf.copy(e).applyQuaternion(this.quaternion),this.position.add(Jf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($f,e)}translateY(e){return this.translateOnAxis(Kf,e)}translateZ(e){return this.translateOnAxis(Qf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(us.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Kl.copy(e):Kl.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Do.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?us.lookAt(Do,Kl,this.up):us.lookAt(Kl,Do,this.up),this.quaternion.setFromRotationMatrix(us),r&&(us.extractRotation(r.matrixWorld),Ea.setFromRotationMatrix(us),this.quaternion.premultiply(Ea.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jf),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(k0),Fh.child=e,this.dispatchEvent(Fh),Fh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),us.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),us.multiply(e.parent.matrixWorld)),e.applyMatrix4(us),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jf),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,e,B0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,z0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Oi.DEFAULT_UP=new re(0,1,0);Oi.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ki=class extends Oi{constructor(){super(),this.isGroup=!0,this.type="Group"}},V0={type:"move"},Xa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let w of e.hand.values()){let g=t.getJointPose(w,i),p=this._getHandJoint(l,w);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,x=.005;l.inputState.pinching&&h>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(V0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cs={h:0,s:0,l:0},Ql={h:0,s:0,l:0};function Oh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var rn=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mn.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=mn.workingColorSpace){return this.r=e,this.g=t,this.b=i,mn.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=mn.workingColorSpace){if(e=P0(e,1),t=dn(t,0,1),i=dn(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Oh(a,s,e+1/3),this.g=Oh(a,s,e),this.b=Oh(a,s,e-1/3)}return mn.colorSpaceToWorking(this,r),this}setStyle(e,t=Wi){function i(s){s!==void 0&&parseFloat(s)<1&&Ht("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ht("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ht("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wi){let i=rm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ht("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}copyLinearToSRGB(e){return this.r=Ba(e.r),this.g=Ba(e.g),this.b=Ba(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wi){return mn.workingToColorSpace(Di.copy(this),e),Math.round(dn(Di.r*255,0,255))*65536+Math.round(dn(Di.g*255,0,255))*256+Math.round(dn(Di.b*255,0,255))}getHexString(e=Wi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mn.workingColorSpace){mn.workingToColorSpace(Di.copy(this),t);let i=Di.r,r=Di.g,s=Di.b,a=Math.max(i,r,s),o=Math.min(i,r,s),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=mn.workingColorSpace){return mn.workingToColorSpace(Di.copy(this),t),e.r=Di.r,e.g=Di.g,e.b=Di.b,e}getStyle(e=Wi){mn.workingToColorSpace(Di.copy(this),e);let t=Di.r,i=Di.g,r=Di.b;return e!==Wi?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Cs),this.setHSL(Cs.h+e,Cs.s+t,Cs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Cs),e.getHSL(Ql);let i=Ph(Cs.h,Ql.h,t),r=Ph(Cs.s,Ql.s,t),s=Ph(Cs.l,Ql.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Di=new rn;rn.NAMES=rm;var Zo=class extends Oi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vs,this.environmentIntensity=1,this.environmentRotation=new vs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Er=new re,hs=new re,Bh=new re,ds=new re,Ia=new re,Ca=new re,ep=new re,zh=new re,kh=new re,Vh=new re,Gh=new qn,Hh=new qn,Wh=new qn,Ns=class n{constructor(e=new re,t=new re,i=new re){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Er.subVectors(e,t),r.cross(Er);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Er.subVectors(r,t),hs.subVectors(i,t),Bh.subVectors(e,t);let a=Er.dot(Er),o=Er.dot(hs),c=Er.dot(Bh),l=hs.dot(hs),u=hs.dot(Bh),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;let h=1/d,m=(l*c-o*u)*h,x=(a*u-o*c)*h;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,ds)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ds.x),c.addScaledVector(a,ds.y),c.addScaledVector(o,ds.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return Gh.setScalar(0),Hh.setScalar(0),Wh.setScalar(0),Gh.fromBufferAttribute(e,t),Hh.fromBufferAttribute(e,i),Wh.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Gh,s.x),a.addScaledVector(Hh,s.y),a.addScaledVector(Wh,s.z),a}static isFrontFacing(e,t,i,r){return Er.subVectors(i,t),hs.subVectors(e,t),Er.cross(hs).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Er.subVectors(this.c,this.b),hs.subVectors(this.a,this.b),Er.cross(hs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;Ia.subVectors(r,i),Ca.subVectors(s,i),zh.subVectors(e,i);let c=Ia.dot(zh),l=Ca.dot(zh);if(c<=0&&l<=0)return t.copy(i);kh.subVectors(e,r);let u=Ia.dot(kh),d=Ca.dot(kh);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(Ia,a);Vh.subVectors(e,s);let m=Ia.dot(Vh),x=Ca.dot(Vh);if(x>=0&&m<=x)return t.copy(s);let w=m*l-c*x;if(w<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(Ca,o);let g=u*x-m*d;if(g<=0&&d-u>=0&&m-x>=0)return ep.subVectors(s,r),o=(d-u)/(d-u+(m-x)),t.copy(r).addScaledVector(ep,o);let p=1/(g+w+h);return a=w*p,o=h*p,t.copy(i).addScaledVector(Ia,a).addScaledVector(Ca,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yr=class{constructor(e=new re(1/0,1/0,1/0),t=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ar):Ar.fromBufferAttribute(s,a),Ar.applyMatrix4(e.matrixWorld),this.expandByPoint(Ar);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jl.copy(i.boundingBox)),jl.applyMatrix4(e.matrixWorld),this.union(jl)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ar),Ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Uo),ec.subVectors(this.max,Uo),Ra.subVectors(e.a,Uo),Pa.subVectors(e.b,Uo),La.subVectors(e.c,Uo),Rs.subVectors(Pa,Ra),Ps.subVectors(La,Pa),ra.subVectors(Ra,La);let t=[0,-Rs.z,Rs.y,0,-Ps.z,Ps.y,0,-ra.z,ra.y,Rs.z,0,-Rs.x,Ps.z,0,-Ps.x,ra.z,0,-ra.x,-Rs.y,Rs.x,0,-Ps.y,Ps.x,0,-ra.y,ra.x,0];return!Xh(t,Ra,Pa,La,ec)||(t=[1,0,0,0,1,0,0,0,1],!Xh(t,Ra,Pa,La,ec))?!1:(tc.crossVectors(Rs,Ps),t=[tc.x,tc.y,tc.z],Xh(t,Ra,Pa,La,ec))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fs=[new re,new re,new re,new re,new re,new re,new re,new re],Ar=new re,jl=new Yr,Ra=new re,Pa=new re,La=new re,Rs=new re,Ps=new re,ra=new re,Uo=new re,ec=new re,tc=new re,sa=new re;function Xh(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){sa.fromArray(n,s);let o=r.x*Math.abs(sa.x)+r.y*Math.abs(sa.y)+r.z*Math.abs(sa.z),c=e.dot(sa),l=t.dot(sa),u=i.dot(sa);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var li=new re,nc=new wt,G0=0,hr=class extends Xr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:G0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jp,this.updateRanges=[],this.gpuType=yr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)nc.fromBufferAttribute(this,t),nc.applyMatrix3(e),this.setXY(t,nc.x,nc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)li.fromBufferAttribute(this,t),li.applyMatrix3(e),this.setXYZ(t,li.x,li.y,li.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)li.fromBufferAttribute(this,t),li.applyMatrix4(e),this.setXYZ(t,li.x,li.y,li.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)li.fromBufferAttribute(this,t),li.applyNormalMatrix(e),this.setXYZ(t,li.x,li.y,li.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)li.fromBufferAttribute(this,t),li.transformDirection(e),this.setXYZ(t,li.x,li.y,li.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=No(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$i(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=No(t,this.array)),t}setX(e,t){return this.normalized&&(t=$i(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=No(t,this.array)),t}setY(e,t){return this.normalized&&(t=$i(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=No(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$i(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=No(t,this.array)),t}setW(e,t){return this.normalized&&(t=$i(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$i(t,this.array),i=$i(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=$i(t,this.array),i=$i(i,this.array),r=$i(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=$i(t,this.array),i=$i(i,this.array),r=$i(r,this.array),s=$i(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Jo=class extends hr{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var $o=class extends hr{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var En=class extends hr{constructor(e,t,i){super(new Float32Array(e),t,i)}},H0=new Yr,Fo=new re,qh=new re,Ds=class{constructor(e=new re,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):H0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fo.subVectors(e,this.center);let t=Fo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Fo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fo.copy(e.center).add(qh)),this.expandByPoint(Fo.copy(e.center).sub(qh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},W0=0,xr=new Ln,Yh=new Oi,Na=new re,cr=new Yr,Oo=new Yr,_i=new re,Ei=class n extends Xr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=io(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(C0(e)?$o:Jo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Kt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xr.makeRotationFromQuaternion(e),this.applyMatrix4(xr),this}rotateX(e){return xr.makeRotationX(e),this.applyMatrix4(xr),this}rotateY(e){return xr.makeRotationY(e),this.applyMatrix4(xr),this}rotateZ(e){return xr.makeRotationZ(e),this.applyMatrix4(xr),this}translate(e,t,i){return xr.makeTranslation(e,t,i),this.applyMatrix4(xr),this}scale(e,t,i){return xr.makeScale(e,t,i),this.applyMatrix4(xr),this}lookAt(e){return Yh.lookAt(e),Yh.updateMatrix(),this.applyMatrix4(Yh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Na).negate(),this.translate(Na.x,Na.y,Na.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];cr.setFromBufferAttribute(s),this.morphTargetsRelative?(_i.addVectors(this.boundingBox.min,cr.min),this.boundingBox.expandByPoint(_i),_i.addVectors(this.boundingBox.max,cr.max),this.boundingBox.expandByPoint(_i)):(this.boundingBox.expandByPoint(cr.min),this.boundingBox.expandByPoint(cr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ds);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new re,1/0);return}if(e){let i=this.boundingSphere.center;if(cr.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Oo.setFromBufferAttribute(o),this.morphTargetsRelative?(_i.addVectors(cr.min,Oo.min),cr.expandByPoint(_i),_i.addVectors(cr.max,Oo.max),cr.expandByPoint(_i)):(cr.expandByPoint(Oo.min),cr.expandByPoint(Oo.max))}cr.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)_i.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(_i));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)_i.fromBufferAttribute(o,l),c&&(Na.fromBufferAttribute(e,l),_i.add(Na)),r=Math.max(r,i.distanceToSquared(_i))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hr(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<i.count;y++)o[y]=new re,c[y]=new re;let l=new re,u=new re,d=new re,h=new wt,m=new wt,x=new wt,w=new re,g=new re;function p(y,C,O){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,C),d.fromBufferAttribute(i,O),h.fromBufferAttribute(s,y),m.fromBufferAttribute(s,C),x.fromBufferAttribute(s,O),u.sub(l),d.sub(l),m.sub(h),x.sub(h);let E=1/(m.x*x.y-x.x*m.y);isFinite(E)&&(w.copy(u).multiplyScalar(x.y).addScaledVector(d,-m.y).multiplyScalar(E),g.copy(d).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(E),o[y].add(w),o[C].add(w),o[O].add(w),c[y].add(g),c[C].add(g),c[O].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,C=v.length;y<C;++y){let O=v[y],E=O.start,G=O.count;for(let L=E,M=E+G;L<M;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let b=new re,_=new re,I=new re,A=new re;function P(y){I.fromBufferAttribute(r,y),A.copy(I);let C=o[y];b.copy(C),b.sub(I.multiplyScalar(I.dot(C))).normalize(),_.crossVectors(A,C);let E=_.dot(c[y])<0?-1:1;a.setXYZW(y,b.x,b.y,b.z,E)}for(let y=0,C=v.length;y<C;++y){let O=v[y],E=O.start,G=O.count;for(let L=E,M=E+G;L<M;L+=3)P(e.getX(L+0)),P(e.getX(L+1)),P(e.getX(L+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hr(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);let r=new re,s=new re,a=new re,o=new re,c=new re,l=new re,u=new re,d=new re;if(e)for(let h=0,m=e.count;h<m;h+=3){let x=e.getX(h+0),w=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,w),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,w),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(w,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)_i.fromBufferAttribute(e,t),_i.normalize(),e.setXYZ(t,_i.x,_i.y,_i.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u),m=0,x=0;for(let w=0,g=c.length;w<g;w++){o.isInterleavedBufferAttribute?m=c[w]*o.data.stride+o.offset:m=c[w]*u;for(let p=0;p<u;p++)h[x++]=l[m++]}return new hr(h,u,d)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=e(c,i);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){let h=l[u],m=e(h,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let m=l[d];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Zh=new re,X0=new re,q0=new Kt,ur=class{constructor(e=new re(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Zh.subVectors(i,t).cross(X0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Zh),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||q0.getNormalMatrix(e),r=this.coplanarPoint(Zh).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Y0=0,Us=class extends Xr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=io(),this.name="",this.type="Material",this.blending=eo,this.side=Vs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gd,this.blendDst=xd,this.blendEquation=da,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rn(0,0,0),this.blendAlpha=0,this.depthFunc=ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yc,this.stencilZFail=yc,this.stencilZPass=yc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ht(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ht(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ur().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new wt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new wt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ps=new re,Jh=new re,ic=new re,rc=new re,Ko=class{constructor(e=new re,t=new re(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ps.copy(this.origin).addScaledVector(this.direction,t),ps.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Jh.copy(e).add(t).multiplyScalar(.5),ic.copy(t).sub(e).normalize(),rc.copy(this.origin).sub(Jh);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ic),o=rc.dot(this.direction),c=-rc.dot(ic),l=rc.lengthSq(),u=Math.abs(1-a*a),d,h,m,x;if(u>0)if(d=a*c-o,h=a*o-c,x=s*u,d>=0)if(h>=-x)if(h<=x){let w=1/u;d*=w,h*=w,m=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h<=-x?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),m=-d*d+h*(h+2*c)+l):h<=x?(d=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),m=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Jh).addScaledVector(ic,h),m}intersectSphere(e,t){if(e.radius<0)return null;ps.subVectors(e.center,this.origin);let i=ps.dot(this.direction),r=ps.dot(ps)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ps)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,m=e.z-a.z,x=t.x-a.x,w=t.y-a.y,g=t.z-a.z,p=i.x-a.x,v=i.y-a.y,b=i.z-a.z,_=Math.abs(c),I=Math.abs(l),A=Math.abs(u),P,y,C,O,E,G,L,M,N,z,q,H;if(_>=I&&_>=A?(C=c,G=d,N=x,H=p,c>=0?(P=l,y=u,O=h,E=m,L=w,M=g,z=v,q=b):(P=u,y=l,O=m,E=h,L=g,M=w,z=b,q=v)):I>=A?(C=l,G=h,N=w,H=v,l>=0?(P=u,y=c,O=m,E=d,L=g,M=x,z=b,q=p):(P=c,y=u,O=d,E=m,L=x,M=g,z=p,q=b)):(C=u,G=m,N=g,H=b,u>=0?(P=c,y=l,O=d,E=h,L=x,M=w,z=p,q=v):(P=l,y=c,O=h,E=d,L=w,M=x,z=v,q=p)),C===0)return null;let B=P/C,Z=y/C,J=1/C,fe=O-B*G,Me=E-Z*G,oe=L-B*N,pe=M-Z*N,Ue=z-B*H,ne=q-Z*H,te=Ue*pe-ne*oe,Te=fe*ne-Me*Ue,Fe=oe*Me-pe*fe;if(r){if(te<0||Te<0||Fe<0)return null}else if((te<0||Te<0||Fe<0)&&(te>0||Te>0||Fe>0))return null;let Pe=te+Te+Fe;if(Pe===0)return null;let at=J*(te*G+Te*N+Fe*H);return(Pe>0?at<0:at>0)?null:this.at(at/Pe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Zr=class extends Us{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vs,this.combine=su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},tp=new Ln,aa=new Ko,sc=new Ds,np=new re,ac=new re,oc=new re,lc=new re,$h=new re,cc=new re,ip=new re,uc=new re,Dn=class extends Oi{constructor(e=new Ei,t=new Zr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){cc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=o[c],d=s[c];u!==0&&($h.fromBufferAttribute(d,e),a?cc.addScaledVector($h,u):cc.addScaledVector($h.sub(t),u))}t.add(cc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),sc.copy(i.boundingSphere),sc.applyMatrix4(s),aa.copy(e.ray).recast(e.near),!(sc.containsPoint(aa.origin)===!1&&(aa.intersectSphere(sc,np)===null||aa.origin.distanceToSquared(np)>(e.far-e.near)**2))&&(tp.copy(s).invert(),aa.copy(e.ray).applyMatrix4(tp),!(i.boundingBox!==null&&aa.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,aa)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,w=h.length;x<w;x++){let g=h[x],p=a[g.materialIndex],v=Math.max(g.start,m.start),b=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,I=b;_<I;_+=3){let A=o.getX(_),P=o.getX(_+1),y=o.getX(_+2);r=hc(this,p,e,i,l,u,d,A,P,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let g=x,p=w;g<p;g+=3){let v=o.getX(g),b=o.getX(g+1),_=o.getX(g+2);r=hc(this,a,e,i,l,u,d,v,b,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,w=h.length;x<w;x++){let g=h[x],p=a[g.materialIndex],v=Math.max(g.start,m.start),b=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,I=b;_<I;_+=3){let A=_,P=_+1,y=_+2;r=hc(this,p,e,i,l,u,d,A,P,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),w=Math.min(c.count,m.start+m.count);for(let g=x,p=w;g<p;g+=3){let v=g,b=g+1,_=g+2;r=hc(this,a,e,i,l,u,d,v,b,_),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Z0(n,e,t,i,r,s,a,o){let c;if(e.side===Xi?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Vs,o),c===null)return null;uc.copy(o),uc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(uc);return l<t.near||l>t.far?null:{distance:l,point:uc.clone(),object:n}}function hc(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,ac),n.getVertexPosition(c,oc),n.getVertexPosition(l,lc);let u=Z0(n,e,t,i,ac,oc,lc,ip);if(u){let d=new re;Ns.getBarycoord(ip,ac,oc,lc,d),r&&(u.uv=Ns.getInterpolatedAttribute(r,o,c,l,d,new wt)),s&&(u.uv1=Ns.getInterpolatedAttribute(s,o,c,l,d,new wt)),a&&(u.normal=Ns.getInterpolatedAttribute(a,o,c,l,d,new re),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new re,materialIndex:0};Ns.getNormal(ac,oc,lc,h.normal),u.face=h,u.barycoord=d}return u}var Qo=class extends Fi{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Mi,u=Mi,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var jo=class extends hr{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Da=new Ln,rp=new Ln,dc=[],sp=new Yr,J0=new Ln,Bo=new Dn,zo=new Ds,Jr=class extends Dn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,J0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Da),sp.copy(e.boundingBox).applyMatrix4(Da),this.boundingBox.union(sp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ds),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Da),zo.copy(e.boundingSphere).applyMatrix4(Da),this.boundingSphere.union(zo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Bo.geometry=this.geometry,Bo.material=this.material,Bo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zo.copy(this.boundingSphere),zo.applyMatrix4(i),e.ray.intersectsSphere(zo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Da),rp.multiplyMatrices(i,Da),Bo.matrixWorld=rp,Bo.raycast(e,dc);for(let a=0,o=dc.length;a<o;a++){let c=dc[a];c.instanceId=s,c.object=this,t.push(c)}dc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new jo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Qo(new Float32Array(r*this.count),r,this.count,du,yr));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},oa=new Ds,$0=new wt(.5,.5),fc=new re,qa=class{constructor(e=new ur,t=new ur,i=new ur,r=new ur,s=new ur,a=new ur){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ir,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],m=s[7],x=s[8],w=s[9],g=s[10],p=s[11],v=s[12],b=s[13],_=s[14],I=s[15];if(r[0].setComponents(l-a,m-u,p-x,I-v).normalize(),r[1].setComponents(l+a,m+u,p+x,I+v).normalize(),r[2].setComponents(l+o,m+d,p+w,I+b).normalize(),r[3].setComponents(l-o,m-d,p-w,I-b).normalize(),i)r[4].setComponents(c,h,g,_).normalize(),r[5].setComponents(l-c,m-h,p-g,I-_).normalize();else if(r[4].setComponents(l-c,m-h,p-g,I-_).normalize(),t===Ir)r[5].setComponents(l+c,m+h,p+g,I+_).normalize();else if(t===Va)r[5].setComponents(c,h,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),oa.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oa)}intersectsSprite(e){oa.center.set(0,0,0);let t=$0.distanceTo(e.center);return oa.radius=.7071067811865476+t,oa.applyMatrix4(e.matrixWorld),this.intersectsSphere(oa)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(fc.x=r.normal.x>0?e.max.x:e.min.x,fc.y=r.normal.y>0?e.max.y:e.min.y,fc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var el=class extends Fi{constructor(e=[],t=Gs,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Fs=class extends Fi{constructor(e,t,i=Rr,r,s,a,o=Mi,c=Mi,l,u=Wr,d=1){if(u!==Wr&&u!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ha(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Dc=class extends Fs{constructor(e,t=Rr,i=Gs,r,s,a=Mi,o=Mi,c,l=Wr){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},tl=class extends Fi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},dr=class n extends Ei{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],u=[],d=[],h=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new En(l,3)),this.setAttribute("normal",new En(u,3)),this.setAttribute("uv",new En(d,2));function x(w,g,p,v,b,_,I,A,P,y,C){let O=_/P,E=I/y,G=_/2,L=I/2,M=A/2,N=P+1,z=y+1,q=0,H=0,B=new re;for(let Z=0;Z<z;Z++){let J=Z*E-L;for(let fe=0;fe<N;fe++){let Me=fe*O-G;B[w]=Me*v,B[g]=J*b,B[p]=M,l.push(B.x,B.y,B.z),B[w]=0,B[g]=0,B[p]=A>0?1:-1,u.push(B.x,B.y,B.z),d.push(fe/P),d.push(1-Z/y),q+=1}}for(let Z=0;Z<y;Z++)for(let J=0;J<P;J++){let fe=h+J+N*Z,Me=h+J+N*(Z+1),oe=h+(J+1)+N*(Z+1),pe=h+(J+1)+N*Z;c.push(fe,Me,pe),c.push(Me,oe,pe),H+=6}o.addGroup(m,H,C),m+=H,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ya=class n extends Ei{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new re,u=new wt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){let m=i+d/t*r;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new En(a,3)),this.setAttribute("normal",new En(o,3)),this.setAttribute("uv",new En(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ca=class n extends Ei{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],m=[],x=0,w=[],g=i/2,p=0;v(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new En(d,3)),this.setAttribute("normal",new En(h,3)),this.setAttribute("uv",new En(m,2));function v(){let _=new re,I=new re,A=0,P=(t-e)/i;for(let y=0;y<=s;y++){let C=[],O=y/s,E=O*(t-e)+e;for(let G=0;G<=r;G++){let L=G/r,M=L*c+o,N=Math.sin(M),z=Math.cos(M);I.x=E*N,I.y=-O*i+g,I.z=E*z,d.push(I.x,I.y,I.z),_.set(N,P,z).normalize(),h.push(_.x,_.y,_.z),m.push(L,1-O),C.push(x++)}w.push(C)}for(let y=0;y<r;y++)for(let C=0;C<s;C++){let O=w[C][y],E=w[C+1][y],G=w[C+1][y+1],L=w[C][y+1];(e>0||C!==0)&&(u.push(O,E,L),A+=3),(t>0||C!==s-1)&&(u.push(E,G,L),A+=3)}l.addGroup(p,A,0),p+=A}function b(_){let I=x,A=new wt,P=new re,y=0,C=_===!0?e:t,O=_===!0?1:-1;for(let G=1;G<=r;G++)d.push(0,g*O,0),h.push(0,O,0),m.push(.5,.5),x++;let E=x;for(let G=0;G<=r;G++){let M=G/r*c+o,N=Math.cos(M),z=Math.sin(M);P.x=C*z,P.y=g*O,P.z=C*N,d.push(P.x,P.y,P.z),h.push(0,O,0),A.x=N*.5+.5,A.y=z*.5*O+.5,m.push(A.x,A.y),x++}for(let G=0;G<r;G++){let L=I+G,M=E+G;_===!0?u.push(M,M+1,L):u.push(M+1,M,L),y+=3}l.addGroup(p,y,_===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var fr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ht("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,a;t?a=t:a=e*i[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===a)return r/(s-1);let u=i[r],h=i[r+1]-u,m=(a-u)/h;return(r+m)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new wt:new re);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new re,r=[],s=[],a=[],o=new re,c=new Ln;for(let m=0;m<=e;m++){let x=m/e;r[m]=this.getTangentAt(x,new re)}s[0]=new re,a[0]=new re;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(r[m-1],r[m]),o.length()>Number.EPSILON){o.normalize();let x=Math.acos(dn(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,x))}a[m].crossVectors(r[m],s[m])}if(t===!0){let m=Math.acos(dn(s[0].dot(s[e]),-1,1));m/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let x=1;x<=e;x++)s[x].applyMatrix4(c.makeRotationAxis(r[x],m*x)),a[x].crossVectors(r[x],s[x])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Za=class extends fr{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new wt){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,m=l-this.aY;c=h*u-m*d+this.aX,l=h*d+m*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Uc=class extends Za{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ud(){let n=0,e=0,t=0,i=0;function r(s,a,o,c){n=s,e=o,t=-3*s+3*a-2*o-c,i=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,u,d){let h=(a-s)/l-(o-s)/(l+u)+(o-a)/u,m=(o-a)/u-(c-a)/(u+d)+(c-o)/d;h*=u,m*=u,r(a,o,h,m)},calc:function(s){let a=s*s,o=a*s;return n+e*s+t*a+i*o}}}var ap=new re,op=new re,Kh=new Ud,Qh=new Ud,jh=new Ud,Fc=class extends fr{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new re){let i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%s]:(op.subVectors(r[0],r[1]).add(r[0]),l=op);let d=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(ap.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ap),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,x=Math.pow(l.distanceToSquared(d),m),w=Math.pow(d.distanceToSquared(h),m),g=Math.pow(h.distanceToSquared(u),m);w<1e-4&&(w=1),x<1e-4&&(x=w),g<1e-4&&(g=w),Kh.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,x,w,g),Qh.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,x,w,g),jh.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,x,w,g)}else this.curveType==="catmullrom"&&(Kh.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Qh.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),jh.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return i.set(Kh.calc(c),Qh.calc(c),jh.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new re().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function lp(n,e,t,i,r){let s=(i-e)*.5,a=(r-t)*.5,o=n*n,c=n*o;return(2*t-2*i+s+a)*c+(-3*t+3*i-2*s-a)*o+s*n+t}function K0(n,e){let t=1-n;return t*t*e}function Q0(n,e){return 2*(1-n)*n*e}function j0(n,e){return n*n*e}function Vo(n,e,t,i){return K0(n,e)+Q0(n,t)+j0(n,i)}function ev(n,e){let t=1-n;return t*t*t*e}function tv(n,e){let t=1-n;return 3*t*t*n*e}function nv(n,e){return 3*(1-n)*n*n*e}function iv(n,e){return n*n*n*e}function Go(n,e,t,i,r){return ev(n,e)+tv(n,t)+nv(n,i)+iv(n,r)}var nl=class extends fr{constructor(e=new wt,t=new wt,i=new wt,r=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new wt){let i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Go(e,r.x,s.x,a.x,o.x),Go(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Oc=class extends fr{constructor(e=new re,t=new re,i=new re,r=new re){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new re){let i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Go(e,r.x,s.x,a.x,o.x),Go(e,r.y,s.y,a.y,o.y),Go(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},il=class extends fr{constructor(e=new wt,t=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new wt){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new wt){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bc=class extends fr{constructor(e=new re,t=new re){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new re){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rl=class extends fr{constructor(e=new wt,t=new wt,i=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new wt){let i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Vo(e,r.x,s.x,a.x),Vo(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zc=class extends fr{constructor(e=new re,t=new re,i=new re){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new re){let i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Vo(e,r.x,s.x,a.x),Vo(e,r.y,s.y,a.y),Vo(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sl=class extends fr{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new wt){let i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return i.set(lp(o,c.x,l.x,u.x,d.x),lp(o,c.y,l.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new wt().fromArray(r))}return this}},cp=Object.freeze({__proto__:null,ArcCurve:Uc,CatmullRomCurve3:Fc,CubicBezierCurve:nl,CubicBezierCurve3:Oc,EllipseCurve:Za,LineCurve:il,LineCurve3:Bc,QuadraticBezierCurve:rl,QuadraticBezierCurve3:zc,SplineCurve:sl}),kc=class extends fr{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cp[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let a=r[s]-i,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new cp[r.type]().fromJSON(r))}return this}},ua=class extends kc{constructor(e){super(),this.type="Path",this.currentPoint=new wt,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new il(this.currentPoint.clone(),new wt(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new rl(this.currentPoint.clone(),new wt(e,t),new wt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){let o=new nl(this.currentPoint.clone(),new wt(e,t),new wt(i,r),new wt(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new sl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,i,r,s,a,o,c),this}absellipse(e,t,i,r,s,a,o,c){let l=new Za(e,t,i,r,s,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ja=class extends ua{constructor(e){super(e),this.uuid=io(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new ua().fromJSON(r))}return this}};function rv(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=sm(n,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(i&&(s=cv(n,e,s,t)),n.length>80*t){o=n[0],c=n[1];let u=o,d=c;for(let h=t;h<r;h+=t){let m=n[h],x=n[h+1];m<o&&(o=m),x<c&&(c=x),m>u&&(u=m),x>d&&(d=x)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return al(s,a,t,o,c,l,0),a}function sm(n,e,t,i,r){let s;if(r===_v(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=up(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=up(a/i|0,n[a],n[a+1],s);return s&&$a(s,s.next)&&(ll(s),s=s.next),s}function ha(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&($a(t,t.next)||$n(t.prev,t,t.next)===0)){if(ll(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function al(n,e,t,i,r,s,a){if(!n)return;!a&&s&&pv(n,i,r,s);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(s?av(n,i,r,s):sv(n)){e.push(c.i,n.i,l.i),ll(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=ov(ha(n),e),al(n,e,t,i,r,s,2)):a===2&&lv(n,e,t,i,r,s):al(ha(n),e,t,i,r,s,1);break}}}function sv(n){let e=n.prev,t=n,i=n.next;if($n(e,t,i)>=0)return!1;let r=e.x,s=t.x,a=i.x,o=e.y,c=t.y,l=i.y,u=Math.min(r,s,a),d=Math.min(o,c,l),h=Math.max(r,s,a),m=Math.max(o,c,l),x=i.next;for(;x!==e;){if(x.x>=u&&x.x<=h&&x.y>=d&&x.y<=m&&ko(r,o,s,c,a,l,x.x,x.y)&&$n(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function av(n,e,t,i){let r=n.prev,s=n,a=n.next;if($n(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,u=r.y,d=s.y,h=a.y,m=Math.min(o,c,l),x=Math.min(u,d,h),w=Math.max(o,c,l),g=Math.max(u,d,h),p=ad(m,x,e,t,i),v=ad(w,g,e,t,i),b=n.prevZ,_=n.nextZ;for(;b&&b.z>=p&&_&&_.z<=v;){if(b.x>=m&&b.x<=w&&b.y>=x&&b.y<=g&&b!==r&&b!==a&&ko(o,u,c,d,l,h,b.x,b.y)&&$n(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=m&&_.x<=w&&_.y>=x&&_.y<=g&&_!==r&&_!==a&&ko(o,u,c,d,l,h,_.x,_.y)&&$n(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=p;){if(b.x>=m&&b.x<=w&&b.y>=x&&b.y<=g&&b!==r&&b!==a&&ko(o,u,c,d,l,h,b.x,b.y)&&$n(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=v;){if(_.x>=m&&_.x<=w&&_.y>=x&&_.y<=g&&_!==r&&_!==a&&ko(o,u,c,d,l,h,_.x,_.y)&&$n(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ov(n,e){let t=n;do{let i=t.prev,r=t.next.next;!$a(i,r)&&om(i,t,t.next,r)&&ol(i,r)&&ol(r,i)&&(e.push(i.i,t.i,r.i),ll(t),ll(t.next),t=n=r),t=t.next}while(t!==n);return ha(t)}function lv(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&gv(a,o)){let c=lm(a,o);a=ha(a,a.next),c=ha(c,c.next),al(a,e,t,i,r,s,0),al(c,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function cv(n,e,t,i){let r=[];for(let s=0,a=e.length;s<a;s++){let o=e[s]*i,c=s<a-1?e[s+1]*i:n.length,l=sm(n,o,c,i,!1);l===l.next&&(l.steiner=!0),r.push(vv(l))}r.sort(uv);for(let s=0;s<r.length;s++)t=hv(r[s],t);return t}function uv(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function hv(n,e){let t=dv(n,e);if(!t)return e;let i=lm(t,n);return ha(i,i.next),ha(t,t.next)}function dv(n,e){let t=e,i=n.x,r=n.y,s=-1/0,a;if($a(n,t))return t;do{if($a(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>s&&(s=d,a=t.x<t.next.x?t:t.next,d===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(i>=t.x&&t.x>=c&&i!==t.x&&am(r<l?i:s,r,c,l,r<l?s:i,r,t.x,t.y)){let d=Math.abs(r-t.y)/(i-t.x);ol(t,n)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&fv(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function fv(n,e){return $n(n.prev,n,e.prev)<0&&$n(e.next,n,n.next)<0}function pv(n,e,t,i){let r=n;do r.z===0&&(r.z=ad(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,mv(r)}function mv(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,c--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function ad(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function vv(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function am(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function ko(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&am(n,e,t,i,r,s,a,o)}function gv(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!xv(n,e)&&(ol(n,e)&&ol(e,n)&&yv(n,e)&&($n(n.prev,n,e.prev)||$n(n,e.prev,e))||$a(n,e)&&$n(n.prev,n,n.next)>0&&$n(e.prev,e,e.next)>0)}function $n(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function $a(n,e){return n.x===e.x&&n.y===e.y}function om(n,e,t,i){let r=mc($n(n,e,t)),s=mc($n(n,e,i)),a=mc($n(t,i,n)),o=mc($n(t,i,e));return!!(r!==s&&a!==o||r===0&&pc(n,t,e)||s===0&&pc(n,i,e)||a===0&&pc(t,n,i)||o===0&&pc(t,e,i))}function pc(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function mc(n){return n>0?1:n<0?-1:0}function xv(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&om(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function ol(n,e){return $n(n.prev,n,n.next)<0?$n(n,e,n.next)>=0&&$n(n,n.prev,e)>=0:$n(n,e,n.prev)<0||$n(n,n.next,e)<0}function yv(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function lm(n,e){let t=od(n.i,n.x,n.y),i=od(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function up(n,e,t,i){let r=od(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ll(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function od(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _v(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}var ld=class{static triangulate(e,t,i=2){return rv(e,t,i)}},za=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];hp(e),dp(i,e);let a=e.length;t.forEach(hp);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,dp(i,t[c]);let o=ld.triangulate(i,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function hp(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function dp(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var cl=class n extends Ei{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,m=[],x=[],w=[],g=[];for(let p=0;p<u;p++){let v=p*h-a;for(let b=0;b<l;b++){let _=b*d-s;x.push(_,-v,0),w.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let b=v+l*p,_=v+l*(p+1),I=v+1+l*(p+1),A=v+1+l*p;m.push(b,_,A),m.push(_,I,A)}this.setIndex(m),this.setAttribute("position",new En(x,3)),this.setAttribute("normal",new En(w,3)),this.setAttribute("uv",new En(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Ka=class n extends Ei{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);let o=[],c=[],l=[],u=[],d=e,h=(t-e)/r,m=new re,x=new wt;for(let w=0;w<=r;w++){for(let g=0;g<=i;g++){let p=s+g/i*a;m.x=d*Math.cos(p),m.y=d*Math.sin(p),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,u.push(x.x,x.y)}d+=h}for(let w=0;w<r;w++){let g=w*(i+1);for(let p=0;p<i;p++){let v=p+g,b=v,_=v+i+1,I=v+i+2,A=v+1;o.push(b,_,A),o.push(_,I,A)}}this.setIndex(o),this.setAttribute("position",new En(c,3)),this.setAttribute("normal",new En(l,3)),this.setAttribute("uv",new En(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ul=class n extends Ei{constructor(e=new Ja([new wt(0,.5),new wt(-.5,-.5),new wt(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new En(r,3)),this.setAttribute("normal",new En(s,3)),this.setAttribute("uv",new En(a,2));function l(u){let d=r.length/3,h=u.extractPoints(t),m=h.shape,x=h.holes;za.isClockWise(m)===!1&&(m=m.reverse());for(let g=0,p=x.length;g<p;g++){let v=x[g];za.isClockWise(v)===!0&&(x[g]=v.reverse())}let w=za.triangulateShape(m,x);for(let g=0,p=x.length;g<p;g++){let v=x[g];m=m.concat(v)}for(let g=0,p=m.length;g<p;g++){let v=m[g];r.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let g=0,p=w.length;g<p;g++){let v=w[g],b=v[0]+d,_=v[1]+d,I=v[2]+d;i.push(b,_,I),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Mv(t,e)}static fromJSON(e,t){let i=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];i.push(a)}return new n(i,e.curveSegments)}};function Mv(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var Os=class n extends Ei{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new re,h=new re,m=[],x=[],w=[],g=[];for(let p=0;p<=i;p++){let v=[],b=p/i,_=a+b*o,I=e*Math.cos(_),A=Math.sqrt(e*e-I*I),P=0;p===0&&a===0?P=.5/t:p===i&&c===Math.PI&&(P=-.5/t);for(let y=0;y<=t;y++){let C=y/t,O=r+C*s;d.x=-A*Math.cos(O),d.y=I,d.z=A*Math.sin(O),x.push(d.x,d.y,d.z),h.copy(d).normalize(),w.push(h.x,h.y,h.z),g.push(C+P,1-b),v.push(l++)}u.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){let b=u[p][v+1],_=u[p][v],I=u[p+1][v],A=u[p+1][v+1];(p!==0||a>0)&&m.push(b,_,A),(p!==i-1||c<Math.PI)&&m.push(_,I,A)}this.setIndex(m),this.setAttribute("position",new En(x,3)),this.setAttribute("normal",new En(w,3)),this.setAttribute("uv",new En(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function pa(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(fp(r))r.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(fp(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Bi(n){let e={};for(let t=0;t<n.length;t++){let i=pa(n[t]);for(let r in i)e[r]=i[r]}return e}function fp(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Sv(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fd(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mn.workingColorSpace}var cm={clone:pa,merge:Bi},bv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pr=class extends Us{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bv,this.fragmentShader=wv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pa(e.uniforms),this.uniformsGroups=Sv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new rn().setHex(r.value);break;case"v2":this.uniforms[i].value=new wt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new re().fromArray(r.value);break;case"v4":this.uniforms[i].value=new qn().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ln().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Vc=class extends pr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ai=class extends Us{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new rn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qu,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vs,this.combine=su,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gc=class extends Us{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hc=class extends Us{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ua(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function ed(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Bs=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wc=class extends Bs{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:id,endingEnd:id}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case rd:s=e,o=2*t-i;break;case sd:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case rd:a=e,c=2*i-t;break;case sd:a=1,c=i+r[1]-r[0];break;default:a=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,m=this._weightNext,x=(i-t)/(r-t),w=x*x,g=w*x,p=-h*g+2*h*w-h*x,v=(1+h)*g+(-1.5-2*h)*w+(-.5+h)*x+1,b=(-1-m)*g+(1.5+m)*w+.5*x,_=m*g-m*w;for(let I=0;I!==o;++I)s[I]=p*a[u+I]+v*a[l+I]+b*a[c+I]+_*a[d+I];return s}},Xc=class extends Bs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(i-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[l+h]*d+a[c+h]*u;return s}},qc=class extends Bs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Yc=class extends Bs{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let x=(i-t)/(r-t),w=1-x;for(let g=0;g!==o;++g)s[g]=a[l+g]*w+a[c+g]*x;return s}let h=o*2,m=e-1;for(let x=0;x!==o;++x){let w=a[l+x],g=a[c+x],p=m*h+x*2,v=d[p],b=d[p+1],_=e*h+x*2,I=u[_],A=u[_+1],P=Ev(i,t,v,I,r);s[x]=um(P,w,b,A,g)}return s}};function um(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function Tv(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function Ev(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=um(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let c=Tv(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var mr=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ua(t,this.TimeBufferType),this.values=Ua(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ua(e.times,Array),values:Ua(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),ed(e.settings)&&(i.settings={inTangents:Ua(e.settings.inTangents,Array),outTangents:Ua(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ho:t=this.InterpolantFactoryMethodDiscrete;break;case Cc:t=this.InterpolantFactoryMethodLinear;break;case xc:t=this.InterpolantFactoryMethodSmooth;break;case nd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ht("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ho;case this.InterpolantFactoryMethodLinear:return Cc;case this.InterpolantFactoryMethodSmooth:return xc;case this.InterpolantFactoryMethodBezier:return nd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;ed(this.settings)&&(pp(this.settings.inTangents,e),pp(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xt("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Xt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Xt("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Xt("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&R0(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Xt("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===xc,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(r)c=!0;else{let d=o*i,h=d-i,m=d+i;for(let x=0;x!==i;++x){let w=t[d+x];if(w!==t[h+x]||w!==t[m+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let m=0;m!==i;++m)t[h+m]=t[d+m]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,ed(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function pp(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}mr.prototype.ValueTypeName="";mr.prototype.TimeBufferType=Float32Array;mr.prototype.ValueBufferType=Float32Array;mr.prototype.DefaultInterpolation=Cc;var zs=class extends mr{constructor(e,t,i){super(e,t,i)}};zs.prototype.ValueTypeName="bool";zs.prototype.ValueBufferType=Array;zs.prototype.DefaultInterpolation=Ho;zs.prototype.InterpolantFactoryMethodLinear=void 0;zs.prototype.InterpolantFactoryMethodSmooth=void 0;var Zc=class extends mr{constructor(e,t,i,r){super(e,t,i,r)}};Zc.prototype.ValueTypeName="color";var Jc=class extends mr{constructor(e,t,i,r){super(e,t,i,r)}};Jc.prototype.ValueTypeName="number";var $c=class extends Bs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(r-t),l=e*o;for(let u=l+o;l!==u;l+=4)qr.slerpFlat(s,0,a,l-o,a,l,c);return s}},hl=class extends mr{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new $c(this.times,this.values,this.getValueSize(),e)}};hl.prototype.ValueTypeName="quaternion";hl.prototype.InterpolantFactoryMethodSmooth=void 0;var ks=class extends mr{constructor(e,t,i){super(e,t,i)}};ks.prototype.ValueTypeName="string";ks.prototype.ValueBufferType=Array;ks.prototype.DefaultInterpolation=Ho;ks.prototype.InterpolantFactoryMethodLinear=void 0;ks.prototype.InterpolantFactoryMethodSmooth=void 0;var Kc=class extends mr{constructor(e,t,i,r){super(e,t,i,r)}};Kc.prototype.ValueTypeName="vector";var Qc=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let m=l[d],x=l[d+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hm=new Qc,jc=class{constructor(e){this.manager=e!==void 0?e:hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};jc.DEFAULT_MATERIAL_NAME="__DEFAULT";var dl=class extends Oi{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rn(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},fl=class extends dl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oi.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rn(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},td=new Ln,mp=new re,vp=new re,eu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.mapType=er,this.map=null,this.mapPass=null,this.matrix=new Ln,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qa,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new qn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;mp.setFromMatrixPosition(e.matrixWorld),t.position.copy(mp),vp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){td.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(td,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===Va||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(td)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},vc=new re,gc=new qr,Gr=new re,pl=class extends Oi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ln,this.projectionMatrix=new Ln,this.projectionMatrixInverse=new Ln,this.coordinateSystem=Ir,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(vc,gc,Gr),Gr.x===1&&Gr.y===1&&Gr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vc,gc,Gr.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(vc,gc,Gr),Gr.x===1&&Gr.y===1&&Gr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vc,gc,Gr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ls=new re,gp=new wt,xp=new wt,Ui=class extends pl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Rc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rc*2*Math.atan(Math.tan(Rh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ls.x,Ls.y).multiplyScalar(-e/Ls.z),Ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ls.x,Ls.y).multiplyScalar(-e/Ls.z)}getViewSize(e,t){return this.getViewBounds(e,gp,xp),t.subVectors(xp,gp)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rh*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Qa=class extends pl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},cd=class extends eu{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ml=class extends dl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oi.DEFAULT_UP),this.updateMatrix(),this.target=new Oi,this.shadow=new cd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Fa=-90,Oa=1,tu=class extends Oi{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ui(Fa,Oa,e,t);r.layers=this.layers,this.add(r);let s=new Ui(Fa,Oa,e,t);s.layers=this.layers,this.add(s);let a=new Ui(Fa,Oa,e,t);a.layers=this.layers,this.add(a);let o=new Ui(Fa,Oa,e,t);o.layers=this.layers,this.add(o);let c=new Ui(Fa,Oa,e,t);c.layers=this.layers,this.add(c);let l=new Ui(Fa,Oa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ir)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Va)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},nu=class extends Ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Od="\\[\\]\\.:\\/",Av=new RegExp("["+Od+"]","g"),Bd="[^"+Od+"]",Iv="[^"+Od.replace("\\.","")+"]",Cv=/((?:WC+[\/:])*)/.source.replace("WC",Bd),Rv=/(WCOD+)?/.source.replace("WCOD",Iv),Pv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bd),Lv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bd),Nv=new RegExp("^"+Cv+Rv+Pv+Lv+"$"),Dv=["material","materials","bones","map"],ud=class{constructor(e,t,i){let r=i||Gn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Gn=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Av,"")}static parseTrackName(e){let t=Nv.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Dv.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ht("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Xt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Xt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[r];if(a===void 0){let l=t.nodeName;Xt("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Gn.Composite=ud;Gn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Gn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Gn.prototype.GetterByBindingType=[Gn.prototype._getValue_direct,Gn.prototype._getValue_array,Gn.prototype._getValue_arrayElement,Gn.prototype._getValue_toArray];Gn.prototype.SetterByBindingTypeAndVersioning=[[Gn.prototype._setValue_direct,Gn.prototype._setValue_direct_setNeedsUpdate,Gn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Gn.prototype._setValue_array,Gn.prototype._setValue_array_setNeedsUpdate,Gn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Gn.prototype._setValue_arrayElement,Gn.prototype._setValue_arrayElement_setNeedsUpdate,Gn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Gn.prototype._setValue_fromArray,Gn.prototype._setValue_fromArray_setNeedsUpdate,Gn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var WM=new Float32Array(1);var yp=new Ln,vl=class{constructor(e,t,i=0,r=1/0){this.ray=new Ko(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Wa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yp),this}intersectObject(e,t=!0,i=[]){return hd(e,this,i,t),i.sort(_p),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)hd(e[r],this,i,t);return i.sort(_p),i}};function _p(n,e){return n.distance-e.distance}function hd(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)hd(s[a],e,t,!0)}}var Wd=class Wd{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Wd.prototype.isMatrix2=!0;var dd=Wd;function zd(n,e,t,i){let r=Uv(i);switch(t){case Pd:return n*e;case du:return n*e/r.components*r.byteLength;case fu:return n*e/r.components*r.byteLength;case Xs:return n*e*2/r.components*r.byteLength;case pu:return n*e*2/r.components*r.byteLength;case Ld:return n*e*3/r.components*r.byteLength;case _r:return n*e*4/r.components*r.byteLength;case mu:return n*e*4/r.components*r.byteLength;case _l:case Ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sl:case bl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gu:case yu:return Math.max(n,16)*Math.max(e,8)/4;case vu:case xu:return Math.max(n,8)*Math.max(e,8)/2;case _u:case Mu:case bu:case wu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Su:case wl:case Tu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Eu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Au:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Iu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ru:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Lu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Nu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Du:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Uu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Fu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ou:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Bu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case zu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ku:case Vu:case Gu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Hu:case Wu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Tl:case Xu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uv(n){switch(n){case er:case Ad:return{byteLength:1,components:1};case to:case Id:case Pr:return{byteLength:2,components:1};case uu:case hu:return{byteLength:2,components:4};case Rr:case cu:case yr:return{byteLength:4,components:1};case Cd:case Rd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Nm(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Ov(n){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,u);else{d.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<d.length;m++){let x=d[h],w=d[m];w.start<=x.start+x.count+1?x.count=Math.max(x.count,w.start+w.count-x.start):(++h,d[h]=w)}d.length=h+1;for(let m=0,x=d.length;m<x;m++){let w=d[m];n.bufferSubData(l,w.start*u.BYTES_PER_ELEMENT,u,w.start,w.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Bv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zv=`#ifdef USE_ALPHAHASH
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
#endif`,kv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wv=`#ifdef USE_AOMAP
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
#endif`,Xv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qv=`#ifdef USE_BATCHING
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
#endif`,Yv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$v=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kv=`#ifdef USE_IRIDESCENCE
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
#endif`,Qv=`#ifdef USE_BUMPMAP
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
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,og=`#define PI 3.141592653589793
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
} // validated`,lg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cg=`vec3 transformedNormal = objectNormal;
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
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",mg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vg=`#ifdef USE_ENVMAP
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
#endif`,gg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tg=`#ifdef USE_GRADIENTMAP
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
}`,Eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Rg=`#ifdef USE_ENVMAP
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
#endif`,Pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ug=`PhysicalMaterial material;
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
#endif`,Fg=`uniform sampler2D dfgLUT;
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
}`,Og=`
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
#endif`,Bg=`#if defined( RE_IndirectDiffuse )
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
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zg=`#if defined( USE_POINTS_UV )
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
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$g=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ex=`#ifdef USE_MORPHTARGETS
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
#endif`,tx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ix=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ax=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ox=`#ifdef USE_NORMALMAP
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
#endif`,lx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ux=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,px=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bx=`float getShadowMask() {
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
}`,wx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tx=`#ifdef USE_SKINNING
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
#endif`,Ex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ax=`#ifdef USE_SKINNING
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
#endif`,Ix=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Px=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lx=`#ifdef USE_TRANSMISSION
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
#endif`,Nx=`#ifdef USE_TRANSMISSION
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
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ox=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zx=`uniform sampler2D t2D;
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
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`#include <common>
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
}`,Xx=`#if DEPTH_PACKING == 3200
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
}`,qx=`#define DISTANCE
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
}`,Yx=`#define DISTANCE
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
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`uniform float scale;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,Qx=`#include <common>
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
}`,jx=`uniform vec3 diffuse;
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
}`,ey=`#define LAMBERT
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
}`,ty=`#define LAMBERT
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
}`,ny=`#define MATCAP
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
}`,iy=`#define MATCAP
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
}`,ry=`#define NORMAL
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
}`,sy=`#define NORMAL
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
}`,ay=`#define PHONG
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
}`,oy=`#define PHONG
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
}`,ly=`#define STANDARD
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
}`,cy=`#define STANDARD
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
}`,uy=`#define TOON
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
}`,hy=`#define TOON
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
}`,dy=`uniform float size;
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
}`,fy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 color;
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
}`,vy=`uniform float rotation;
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
}`,gy=`uniform vec3 diffuse;
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
}`,sn={alphahash_fragment:Bv,alphahash_pars_fragment:zv,alphamap_fragment:kv,alphamap_pars_fragment:Vv,alphatest_fragment:Gv,alphatest_pars_fragment:Hv,aomap_fragment:Wv,aomap_pars_fragment:Xv,batching_pars_vertex:qv,batching_vertex:Yv,begin_vertex:Zv,beginnormal_vertex:Jv,bsdfs:$v,iridescence_fragment:Kv,bumpmap_pars_fragment:Qv,clipping_planes_fragment:jv,clipping_planes_pars_fragment:eg,clipping_planes_pars_vertex:tg,clipping_planes_vertex:ng,color_fragment:ig,color_pars_fragment:rg,color_pars_vertex:sg,color_vertex:ag,common:og,cube_uv_reflection_fragment:lg,defaultnormal_vertex:cg,displacementmap_pars_vertex:ug,displacementmap_vertex:hg,emissivemap_fragment:dg,emissivemap_pars_fragment:fg,colorspace_fragment:pg,colorspace_pars_fragment:mg,envmap_fragment:vg,envmap_common_pars_fragment:gg,envmap_pars_fragment:xg,envmap_pars_vertex:yg,envmap_physical_pars_fragment:Rg,envmap_vertex:_g,fog_vertex:Mg,fog_pars_vertex:Sg,fog_fragment:bg,fog_pars_fragment:wg,gradientmap_pars_fragment:Tg,lightmap_pars_fragment:Eg,lights_lambert_fragment:Ag,lights_lambert_pars_fragment:Ig,lights_pars_begin:Cg,lights_toon_fragment:Pg,lights_toon_pars_fragment:Lg,lights_phong_fragment:Ng,lights_phong_pars_fragment:Dg,lights_physical_fragment:Ug,lights_physical_pars_fragment:Fg,lights_fragment_begin:Og,lights_fragment_maps:Bg,lights_fragment_end:zg,lightprobes_pars_fragment:kg,logdepthbuf_fragment:Vg,logdepthbuf_pars_fragment:Gg,logdepthbuf_pars_vertex:Hg,logdepthbuf_vertex:Wg,map_fragment:Xg,map_pars_fragment:qg,map_particle_fragment:Yg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:$g,morphinstance_vertex:Kg,morphcolor_vertex:Qg,morphnormal_vertex:jg,morphtarget_pars_vertex:ex,morphtarget_vertex:tx,normal_fragment_begin:nx,normal_fragment_maps:ix,normal_pars_fragment:rx,normal_pars_vertex:sx,normal_vertex:ax,normalmap_pars_fragment:ox,clearcoat_normal_fragment_begin:lx,clearcoat_normal_fragment_maps:cx,clearcoat_pars_fragment:ux,iridescence_pars_fragment:hx,opaque_fragment:dx,packing:fx,premultiplied_alpha_fragment:px,project_vertex:mx,dithering_fragment:vx,dithering_pars_fragment:gx,roughnessmap_fragment:xx,roughnessmap_pars_fragment:yx,shadowmap_pars_fragment:_x,shadowmap_pars_vertex:Mx,shadowmap_vertex:Sx,shadowmask_pars_fragment:bx,skinbase_vertex:wx,skinning_pars_vertex:Tx,skinning_vertex:Ex,skinnormal_vertex:Ax,specularmap_fragment:Ix,specularmap_pars_fragment:Cx,tonemapping_fragment:Rx,tonemapping_pars_fragment:Px,transmission_fragment:Lx,transmission_pars_fragment:Nx,uv_pars_fragment:Dx,uv_pars_vertex:Ux,uv_vertex:Fx,worldpos_vertex:Ox,background_vert:Bx,background_frag:zx,backgroundCube_vert:kx,backgroundCube_frag:Vx,cube_vert:Gx,cube_frag:Hx,depth_vert:Wx,depth_frag:Xx,distance_vert:qx,distance_frag:Yx,equirect_vert:Zx,equirect_frag:Jx,linedashed_vert:$x,linedashed_frag:Kx,meshbasic_vert:Qx,meshbasic_frag:jx,meshlambert_vert:ey,meshlambert_frag:ty,meshmatcap_vert:ny,meshmatcap_frag:iy,meshnormal_vert:ry,meshnormal_frag:sy,meshphong_vert:ay,meshphong_frag:oy,meshphysical_vert:ly,meshphysical_frag:cy,meshtoon_vert:uy,meshtoon_frag:hy,points_vert:dy,points_frag:fy,shadow_vert:py,shadow_frag:my,sprite_vert:vy,sprite_frag:gy},ct={common:{diffuse:{value:new rn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new re},probesMax:{value:new re},probesResolution:{value:new re}},points:{diffuse:{value:new rn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new rn(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Qr={basic:{uniforms:Bi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:sn.meshbasic_vert,fragmentShader:sn.meshbasic_frag},lambert:{uniforms:Bi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new rn(0)},envMapIntensity:{value:1}}]),vertexShader:sn.meshlambert_vert,fragmentShader:sn.meshlambert_frag},phong:{uniforms:Bi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new rn(0)},specular:{value:new rn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:sn.meshphong_vert,fragmentShader:sn.meshphong_frag},standard:{uniforms:Bi([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new rn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:sn.meshphysical_vert,fragmentShader:sn.meshphysical_frag},toon:{uniforms:Bi([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new rn(0)}}]),vertexShader:sn.meshtoon_vert,fragmentShader:sn.meshtoon_frag},matcap:{uniforms:Bi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:sn.meshmatcap_vert,fragmentShader:sn.meshmatcap_frag},points:{uniforms:Bi([ct.points,ct.fog]),vertexShader:sn.points_vert,fragmentShader:sn.points_frag},dashed:{uniforms:Bi([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:sn.linedashed_vert,fragmentShader:sn.linedashed_frag},depth:{uniforms:Bi([ct.common,ct.displacementmap]),vertexShader:sn.depth_vert,fragmentShader:sn.depth_frag},normal:{uniforms:Bi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:sn.meshnormal_vert,fragmentShader:sn.meshnormal_frag},sprite:{uniforms:Bi([ct.sprite,ct.fog]),vertexShader:sn.sprite_vert,fragmentShader:sn.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:sn.background_vert,fragmentShader:sn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:sn.backgroundCube_vert,fragmentShader:sn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:sn.cube_vert,fragmentShader:sn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:sn.equirect_vert,fragmentShader:sn.equirect_frag},distance:{uniforms:Bi([ct.common,ct.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:sn.distance_vert,fragmentShader:sn.distance_frag},shadow:{uniforms:Bi([ct.lights,ct.fog,{color:{value:new rn(0)},opacity:{value:1}}]),vertexShader:sn.shadow_vert,fragmentShader:sn.shadow_frag}};Qr.physical={uniforms:Bi([Qr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new rn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new rn(0)},specularColor:{value:new rn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:sn.meshphysical_vert,fragmentShader:sn.meshphysical_frag};var Ju={r:0,b:0,g:0},xy=new Ln,Dm=new Kt;Dm.set(-1,0,0,0,1,0,0,0,1);function yy(n,e,t,i,r,s){let a=new rn(0),o=r===!0?0:1,c,l,u=null,d=0,h=null;function m(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let _=v.backgroundBlurriness>0;b=e.get(b,_)}return b}function x(v){let b=!1,_=m(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),b=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?t.buffers.color.setClear(0,0,0,1,s):I==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function w(v,b){let _=m(b);_&&(_.isCubeTexture||_.mapping===xl)?(l===void 0&&(l=new Dn(new dr(1,1,1),new pr({name:"BackgroundCubeMaterial",uniforms:pa(Qr.backgroundCube.uniforms),vertexShader:Qr.backgroundCube.vertexShader,fragmentShader:Qr.backgroundCube.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(I,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xy.makeRotationFromEuler(b.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Dm),l.material.toneMapped=mn.getTransfer(_.colorSpace)!==Pn,(u!==_||d!==_.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,h=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Dn(new cl(2,2),new pr({name:"BackgroundMaterial",uniforms:pa(Qr.background.uniforms),vertexShader:Qr.background.vertexShader,fragmentShader:Qr.background.fragmentShader,side:Vs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=mn.getTransfer(_.colorSpace)!==Pn,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,h=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,b){v.getRGB(Ju,Fd(n)),t.buffers.color.setClear(Ju.r,Ju.g,Ju.b,b,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:x,addToRenderList:w,dispose:p}}function _y(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,a=!1;function o(E,G,L,M,N){let z=!1,q=d(E,M,L,G);s!==q&&(s=q,l(s.object)),z=m(E,M,L,N),z&&x(E,M,L,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(E,G,L,M),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return n.createVertexArray()}function l(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function d(E,G,L,M){let N=M.wireframe===!0,z=i[G.id];z===void 0&&(z={},i[G.id]=z);let q=E.isInstancedMesh===!0?E.id:0,H=z[q];H===void 0&&(H={},z[q]=H);let B=H[L.id];B===void 0&&(B={},H[L.id]=B);let Z=B[N];return Z===void 0&&(Z=h(c()),B[N]=Z),Z}function h(E){let G=[],L=[],M=[];for(let N=0;N<t;N++)G[N]=0,L[N]=0,M[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:L,attributeDivisors:M,object:E,attributes:{},index:null}}function m(E,G,L,M){let N=s.attributes,z=G.attributes,q=0,H=L.getAttributes();for(let B in H)if(H[B].location>=0){let J=N[B],fe=z[B];if(fe===void 0&&(B==="instanceMatrix"&&E.instanceMatrix&&(fe=E.instanceMatrix),B==="instanceColor"&&E.instanceColor&&(fe=E.instanceColor)),J===void 0||J.attribute!==fe||fe&&J.data!==fe.data)return!0;q++}return s.attributesNum!==q||s.index!==M}function x(E,G,L,M){let N={},z=G.attributes,q=0,H=L.getAttributes();for(let B in H)if(H[B].location>=0){let J=z[B];J===void 0&&(B==="instanceMatrix"&&E.instanceMatrix&&(J=E.instanceMatrix),B==="instanceColor"&&E.instanceColor&&(J=E.instanceColor));let fe={};fe.attribute=J,J&&J.data&&(fe.data=J.data),N[B]=fe,q++}s.attributes=N,s.attributesNum=q,s.index=M}function w(){let E=s.newAttributes;for(let G=0,L=E.length;G<L;G++)E[G]=0}function g(E){p(E,0)}function p(E,G){let L=s.newAttributes,M=s.enabledAttributes,N=s.attributeDivisors;L[E]=1,M[E]===0&&(n.enableVertexAttribArray(E),M[E]=1),N[E]!==G&&(n.vertexAttribDivisor(E,G),N[E]=G)}function v(){let E=s.newAttributes,G=s.enabledAttributes;for(let L=0,M=G.length;L<M;L++)G[L]!==E[L]&&(n.disableVertexAttribArray(L),G[L]=0)}function b(E,G,L,M,N,z,q){q===!0?n.vertexAttribIPointer(E,G,L,N,z):n.vertexAttribPointer(E,G,L,M,N,z)}function _(E,G,L,M){w();let N=M.attributes,z=L.getAttributes(),q=G.defaultAttributeValues;for(let H in z){let B=z[H];if(B.location>=0){let Z=N[H];if(Z===void 0&&(H==="instanceMatrix"&&E.instanceMatrix&&(Z=E.instanceMatrix),H==="instanceColor"&&E.instanceColor&&(Z=E.instanceColor)),Z!==void 0){let J=Z.normalized,fe=Z.itemSize,Me=e.get(Z);if(Me===void 0)continue;let oe=Me.buffer,pe=Me.type,Ue=Me.bytesPerElement,ne=pe===n.INT||pe===n.UNSIGNED_INT||Z.gpuType===cu;if(Z.isInterleavedBufferAttribute){let te=Z.data,Te=te.stride,Fe=Z.offset;if(te.isInstancedInterleavedBuffer){for(let Pe=0;Pe<B.locationSize;Pe++)p(B.location+Pe,te.meshPerAttribute);E.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Pe=0;Pe<B.locationSize;Pe++)g(B.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let Pe=0;Pe<B.locationSize;Pe++)b(B.location+Pe,fe/B.locationSize,pe,J,Te*Ue,(Fe+fe/B.locationSize*Pe)*Ue,ne)}else{if(Z.isInstancedBufferAttribute){for(let te=0;te<B.locationSize;te++)p(B.location+te,Z.meshPerAttribute);E.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let te=0;te<B.locationSize;te++)g(B.location+te);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let te=0;te<B.locationSize;te++)b(B.location+te,fe/B.locationSize,pe,J,fe*Ue,fe/B.locationSize*te*Ue,ne)}}else if(q!==void 0){let J=q[H];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(B.location,J);break;case 3:n.vertexAttrib3fv(B.location,J);break;case 4:n.vertexAttrib4fv(B.location,J);break;default:n.vertexAttrib1fv(B.location,J)}}}}v()}function I(){C();for(let E in i){let G=i[E];for(let L in G){let M=G[L];for(let N in M){let z=M[N];for(let q in z)u(z[q].object),delete z[q];delete M[N]}}delete i[E]}}function A(E){if(i[E.id]===void 0)return;let G=i[E.id];for(let L in G){let M=G[L];for(let N in M){let z=M[N];for(let q in z)u(z[q].object),delete z[q];delete M[N]}}delete i[E.id]}function P(E){for(let G in i){let L=i[G];for(let M in L){let N=L[M];if(N[E.id]===void 0)continue;let z=N[E.id];for(let q in z)u(z[q].object),delete z[q];delete N[E.id]}}}function y(E){for(let G in i){let L=i[G],M=E.isInstancedMesh===!0?E.id:0,N=L[M];if(N!==void 0){for(let z in N){let q=N[z];for(let H in q)u(q[H].object),delete q[H];delete N[z]}delete L[M],Object.keys(L).length===0&&delete i[G]}}}function C(){O(),a=!0,s!==r&&(s=r,l(s.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:O,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:w,enableAttribute:g,disableUnusedAttributes:v}}function My(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let m=0;m<u;m++)h+=l[m];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Sy(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==_r&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==er&&P!==yr&&!y&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ht("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:w,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:_,maxSamples:I,samples:A}}function by(n){let e=this,t=null,i=0,r=!1,s=!1,a=new ur,o=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,m){let x=d.clippingPlanes,w=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!r||x===null||x.length===0||s&&!g)s?u(null):l();else{let v=s?0:i,b=v*4,_=p.clippingState||null;c.value=_,_=u(x,h,b,m);for(let I=0;I!==b;++I)_[I]=t[I];p.clippingState=_,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,m,x){let w=d!==null?d.length:0,g=null;if(w!==0){if(g=c.value,x!==!0||g===null){let p=m+w*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,_=m;b!==w;++b,_+=4)a.copy(d[b]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}var so=4,wy=6,Ty=20,Ey=256,El=new Qa,dm=new rn,Xd=null,qd=0,Yd=0,Zd=!1,Ay=new re,ma=new re,Ku=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=Ay}=s;Xd=this._renderer.getRenderTarget(),qd=this._renderer.getActiveCubeFace(),Yd=this._renderer.getActiveMipmapLevel(),Zd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xd,qd,Yd),this._renderer.xr.enabled=Zd,e.scissorTest=!1,ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===fa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xd=this._renderer.getRenderTarget(),qd=this._renderer.getActiveCubeFace(),Yd=this._renderer.getActiveMipmapLevel(),Zd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ti,minFilter:Ti,generateMipmaps:!1,type:Pr,format:_r,colorSpace:Wo,depthBuffer:!1},r=fm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fm(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Iy(s)),this._blurMaterial=Ry(s,e,t),this._ggxMaterial=Cy(s,e,t)}return r}_compileMaterial(e){let t=new Dn(new Ei,e);this._renderer.compile(t,El)}_sceneToCubeUV(e,t,i,r,s){let c=new Ui(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(dm),d.toneMapping=Cr,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Dn(new dr,new Zr({name:"PMREM.Background",side:Xi,depthWrite:!1,depthTest:!1})));let w=this._backgroundBox,g=w.material,p=!1,v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(dm),p=!0);for(let b=0;b<6;b++){let _=b%3;_===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[b],s.y,s.z)):_===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[b]));let I=this._cubeSize;ro(r,_*I,b>2?I:0,I,I),d.setRenderTarget(r),p&&d.render(w,c),d.render(e,c)}d.toneMapping=m,d.autoClear=h,e.background=v}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Gs||e.mapping===fa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pm());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;ro(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,El)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,m=d*h,{_lodMax:x}=this,w=this._sizeLods[i],g=3*w*(i>x-so?i-x+so:0),p=4*(this._cubeSize-w);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=x-t,ro(s,g,p,3*w,2*w),r.setRenderTarget(s),r.render(o,El),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-i,ro(e,g,p,3*w,2*w),r.setRenderTarget(e),r.render(o,El)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],d=3*u*(r>this._lodMax-so?r-this._lodMax+so:0),h=4*(this._cubeSize-u);ro(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(c,El)}};function Iy(n){let e=[],t=[],i=n,r=n-so+1+wy;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,m=3,x=new Float32Array(m*h*d),w=new Float32Array(m*h*d);for(let p=0;p<d;p++){let v=p%3*2/3-1,b=p>2?0:-1,_=[v,b,0,v+2/3,b,0,v+2/3,b+1,0,v,b,0,v+2/3,b+1,0,v,b+1,0];x.set(_,m*h*p);for(let I=0;I<h;I++){let A=u[I*2]*2-1,P=u[I*2+1]*2-1;p===0?ma.set(1,P,A):p===1?ma.set(-A,1,-P):p===2?ma.set(-A,P,1):p===3?ma.set(-1,P,-A):p===4?ma.set(-A,-1,P):ma.set(A,P,-1),ma.toArray(w,(p*h+I)*m)}}let g=new Ei;g.setAttribute("position",new hr(x,m)),g.setAttribute("outputDirection",new hr(w,m)),t.push(new Dn(g,null)),i>so&&i--}return{lodMeshes:t,sizeLods:e}}function fm(n,e,t){let i=new Qi(n,e,t);return i.texture.mapping=xl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ro(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Cy(n,e,t){return new pr({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ey,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:eh(),fragmentShader:`

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
		`,blending:$r,depthTest:!1,depthWrite:!1})}function Ry(n,e,t){return new pr({name:"SphericalGaussianBlur",defines:{SAMPLES:Ty,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:eh(),fragmentShader:`

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
		`,blending:$r,depthTest:!1,depthWrite:!1})}function pm(){return new pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eh(),fragmentShader:`

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
		`,blending:$r,depthTest:!1,depthWrite:!1})}function mm(){return new pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$r,depthTest:!1,depthWrite:!1})}function eh(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Qu=class extends Qi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new el(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new dr(5,5,5),s=new pr({name:"CubemapFromEquirect",uniforms:pa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xi,blending:$r});s.uniforms.tEquirect.value=t;let a=new Dn(r,s),o=t.minFilter;return t.minFilter===Hs&&(t.minFilter=Ti),new tu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function Py(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,m=!1){return h==null?null:m?a(h):s(h)}function s(h){if(h&&h.isTexture){let m=h.mapping;if(m===au||m===ou)if(e.has(h)){let x=e.get(h).texture;return o(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let w=new Qu(x.height);return w.fromEquirectangularTexture(n,h),e.set(h,w),h.addEventListener("dispose",l),o(w.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,x=m===au||m===ou,w=m===Gs||m===fa;if(x||w){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Ku(n)),g=x?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let v=h.image;return x&&v&&v.height>0||w&&v&&c(v)?(i===null&&(i=new Ku(n)),g=x?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,m){return m===au?h.mapping=Gs:m===ou&&(h.mapping=fa),h}function c(h){let m=0,x=6;for(let w=0;w<x;w++)h[w]!==void 0&&m++;return m===x}function l(h){let m=h.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(h){let m=h.target;m.removeEventListener("dispose",u);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Ly(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&la("WebGLRenderer: "+i+" extension not supported."),r}}}function Ny(n,e,t,i){let r={},s=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete r[h.id];let m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let m in h)e.update(h[m],n.ARRAY_BUFFER)}function l(d){let h=[],m=d.index,x=d.attributes.position,w=0;if(x===void 0)return;if(m!==null){let v=m.array;w=m.version;for(let b=0,_=v.length;b<_;b+=3){let I=v[b+0],A=v[b+1],P=v[b+2];h.push(I,A,A,P,P,I)}}else{let v=x.array;w=x.version;for(let b=0,_=v.length/3-1;b<_;b+=3){let I=b+0,A=b+1,P=b+2;h.push(I,A,A,P,P,I)}}let g=new(x.count>=65535?$o:Jo)(h,1);g.version=w;let p=s.get(d);p&&e.remove(p),s.set(d,g)}function u(d){let h=s.get(d);if(h){let m=d.index;m!==null&&h.version<m.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Dy(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,h){n.drawElements(i,h,s,d*a),t.update(h,i,1)}function l(d,h,m){m!==0&&(n.drawElementsInstanced(i,h,s,d*a,m),t.update(h,i,m))}function u(d,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,m);let w=0;for(let g=0;g<m;g++)w+=h[g];t.update(w,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Uy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Fy(n,e,t){let i=new WeakMap,r=new qn;function s(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let C=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],b=0;m===!0&&(b=1),x===!0&&(b=2),w===!0&&(b=3);let _=o.attributes.position.count*b,I=1;_>e.maxTextureSize&&(I=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let A=new Float32Array(_*I*4*d),P=new Yo(A,_,I,d);P.type=yr,P.needsUpdate=!0;let y=b*4;for(let O=0;O<d;O++){let E=g[O],G=p[O],L=v[O],M=_*I*4*O;for(let N=0;N<E.count;N++){let z=N*y;m===!0&&(r.fromBufferAttribute(E,N),A[M+z+0]=r.x,A[M+z+1]=r.y,A[M+z+2]=r.z,A[M+z+3]=0),x===!0&&(r.fromBufferAttribute(G,N),A[M+z+4]=r.x,A[M+z+5]=r.y,A[M+z+6]=r.z,A[M+z+7]=0),w===!0&&(r.fromBufferAttribute(L,N),A[M+z+8]=r.x,A[M+z+9]=r.y,A[M+z+10]=r.z,A[M+z+11]=L.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new wt(_,I)},i.set(o,h),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let w=0;w<l.length;w++)m+=l[w];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Oy(n,e,t,i,r){let s=new WeakMap;function a(l){let u=r.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return h}function o(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var By={[yd]:"LINEAR_TONE_MAPPING",[_d]:"REINHARD_TONE_MAPPING",[Md]:"CINEON_TONE_MAPPING",[Sd]:"ACES_FILMIC_TONE_MAPPING",[wd]:"AGX_TONE_MAPPING",[Td]:"NEUTRAL_TONE_MAPPING",[bd]:"CUSTOM_TONE_MAPPING"};function zy(n,e,t,i,r,s){let a=new Qi(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Ei;l.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new En([0,2,0,0,2,0],2));let u=new Vc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Dn(l,u),h=new Qa(-1,1,1,-1,0,1),m=null,x=null,w=!1,g,p=null,v=[],b=!1;this.setSize=function(_,I){a.setSize(_,I),o!==null&&o.setSize(_,I),c!==null&&c.setSize(_,I);for(let A=0;A<v.length;A++){let P=v[A];P.setSize&&P.setSize(_,I)}},this.setEffects=function(_){v=_,b=v.length>0&&v[0].isRenderPass===!0;let I=a.width,A=a.height;v.length>0&&o===null&&(o=new Qi(I,A,{type:Pr,depthBuffer:!1,stencilBuffer:!1}),c=new Qi(I,A,{type:Pr,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<v.length;P++){let y=v[P];y.setSize&&y.setSize(I,A)}},this.begin=function(_,I){if(w||_.toneMapping===Cr&&v.length===0)return!1;if(p=I,I!==null){let A=I.width,P=I.height;(a.width!==A||a.height!==P)&&this.setSize(A,P)}return b===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=Cr,!0},this.hasRenderPass=function(){return b},this.end=function(_,I){_.toneMapping=g,w=!0;let A=a,P=o;for(let y=0;y<v.length;y++){let C=v[y];C.enabled!==!1&&(C.render(_,P,A,I),C.needsSwap!==!1&&(A=P,P=P===o?c:o))}if(m!==_.outputColorSpace||x!==_.toneMapping){m=_.outputColorSpace,x=_.toneMapping,u.defines={},mn.getTransfer(m)===Pn&&(u.defines.SRGB_TRANSFER="");let y=By[x];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,_.setRenderTarget(p),_.render(d,h),p=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Um=new Fi,Kd=new Fs(1,1),Fm=new Yo,Om=new Nc,Bm=new el,vm=[],gm=[],xm=new Float32Array(16),ym=new Float32Array(9),_m=new Float32Array(4);function oo(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=vm[r];if(s===void 0&&(s=new Float32Array(r),vm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function di(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fi(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function th(n,e){let t=gm[e];t===void 0&&(t=new Int32Array(e),gm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ky(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Vy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(di(t,e))return;n.uniform2fv(this.addr,e),fi(t,e)}}function Gy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(di(t,e))return;n.uniform3fv(this.addr,e),fi(t,e)}}function Hy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(di(t,e))return;n.uniform4fv(this.addr,e),fi(t,e)}}function Wy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(di(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fi(t,e)}else{if(di(t,i))return;_m.set(i),n.uniformMatrix2fv(this.addr,!1,_m),fi(t,i)}}function Xy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(di(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fi(t,e)}else{if(di(t,i))return;ym.set(i),n.uniformMatrix3fv(this.addr,!1,ym),fi(t,i)}}function qy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(di(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fi(t,e)}else{if(di(t,i))return;xm.set(i),n.uniformMatrix4fv(this.addr,!1,xm),fi(t,i)}}function Yy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Zy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(di(t,e))return;n.uniform2iv(this.addr,e),fi(t,e)}}function Jy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(di(t,e))return;n.uniform3iv(this.addr,e),fi(t,e)}}function $y(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(di(t,e))return;n.uniform4iv(this.addr,e),fi(t,e)}}function Ky(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Qy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(di(t,e))return;n.uniform2uiv(this.addr,e),fi(t,e)}}function jy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(di(t,e))return;n.uniform3uiv(this.addr,e),fi(t,e)}}function e_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(di(t,e))return;n.uniform4uiv(this.addr,e),fi(t,e)}}function t_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Kd.compareFunction=t.isReversedDepthBuffer()?Zu:Yu,s=Kd):s=Um,t.setTexture2D(e||s,r)}function n_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Om,r)}function i_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Bm,r)}function r_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Fm,r)}function s_(n){switch(n){case 5126:return ky;case 35664:return Vy;case 35665:return Gy;case 35666:return Hy;case 35674:return Wy;case 35675:return Xy;case 35676:return qy;case 5124:case 35670:return Yy;case 35667:case 35671:return Zy;case 35668:case 35672:return Jy;case 35669:case 35673:return $y;case 5125:return Ky;case 36294:return Qy;case 36295:return jy;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return r_}}function a_(n,e){n.uniform1fv(this.addr,e)}function o_(n,e){let t=oo(e,this.size,2);n.uniform2fv(this.addr,t)}function l_(n,e){let t=oo(e,this.size,3);n.uniform3fv(this.addr,t)}function c_(n,e){let t=oo(e,this.size,4);n.uniform4fv(this.addr,t)}function u_(n,e){let t=oo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function h_(n,e){let t=oo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function d_(n,e){let t=oo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function f_(n,e){n.uniform1iv(this.addr,e)}function p_(n,e){n.uniform2iv(this.addr,e)}function m_(n,e){n.uniform3iv(this.addr,e)}function v_(n,e){n.uniform4iv(this.addr,e)}function g_(n,e){n.uniform1uiv(this.addr,e)}function x_(n,e){n.uniform2uiv(this.addr,e)}function y_(n,e){n.uniform3uiv(this.addr,e)}function __(n,e){n.uniform4uiv(this.addr,e)}function M_(n,e,t){let i=this.cache,r=e.length,s=th(t,r);di(i,s)||(n.uniform1iv(this.addr,s),fi(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Kd:a=Um;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function S_(n,e,t){let i=this.cache,r=e.length,s=th(t,r);di(i,s)||(n.uniform1iv(this.addr,s),fi(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Om,s[a])}function b_(n,e,t){let i=this.cache,r=e.length,s=th(t,r);di(i,s)||(n.uniform1iv(this.addr,s),fi(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Bm,s[a])}function w_(n,e,t){let i=this.cache,r=e.length,s=th(t,r);di(i,s)||(n.uniform1iv(this.addr,s),fi(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Fm,s[a])}function T_(n){switch(n){case 5126:return a_;case 35664:return o_;case 35665:return l_;case 35666:return c_;case 35674:return u_;case 35675:return h_;case 35676:return d_;case 5124:case 35670:return f_;case 35667:case 35671:return p_;case 35668:case 35672:return m_;case 35669:case 35673:return v_;case 5125:return g_;case 36294:return x_;case 36295:return y_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return M_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return w_}}var Qd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=s_(t.type)}},jd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=T_(t.type)}},ef=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},Jd=/(\w+)(\])?(\[|\.)?/g;function Mm(n,e){n.seq.push(e),n.map[e.id]=e}function E_(n,e,t){let i=n.name,r=i.length;for(Jd.lastIndex=0;;){let s=Jd.exec(i),a=Jd.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Mm(t,l===void 0?new Qd(o,n,e):new jd(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new ef(o),Mm(t,d)),t=d}}}var ao=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);E_(o,c,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function Sm(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var A_=37297,I_=0;function C_(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var bm=new Kt;function R_(n){mn._getMatrix(bm,mn.workingColorSpace,n);let e=`mat3( ${bm.elements.map(t=>t.toFixed(4))} )`;switch(mn.getTransfer(n)){case Xo:return[e,"LinearTransferOETF"];case Pn:return[e,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function wm(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+C_(n.getShaderSource(e),o)}else return s}function P_(n,e){let t=R_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var L_={[yd]:"Linear",[_d]:"Reinhard",[Md]:"Cineon",[Sd]:"ACESFilmic",[wd]:"AgX",[Td]:"Neutral",[bd]:"Custom"};function N_(n,e){let t=L_[e];return t===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $u=new re;function D_(){mn.getLuminanceCoefficients($u);let n=$u.x.toFixed(4),e=$u.y.toFixed(4),t=$u.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Il).join(`
`)}function F_(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function O_(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Il(n){return n!==""}function Tm(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Em(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var B_=/^[ \t]*#include +<([\w\d./]+)>/gm;function tf(n){return n.replace(B_,k_)}var z_=new Map;function k_(n,e){let t=sn[e];if(t===void 0){let i=z_.get(e);if(i!==void 0)t=sn[i],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return tf(t)}var V_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Am(n){return n.replace(V_,G_)}function G_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Im(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var H_={[gl]:"SHADOWMAP_TYPE_PCF",[ja]:"SHADOWMAP_TYPE_VSM"};function W_(n){return H_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var X_={[Gs]:"ENVMAP_TYPE_CUBE",[fa]:"ENVMAP_TYPE_CUBE",[xl]:"ENVMAP_TYPE_CUBE_UV"};function q_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":X_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Y_={[fa]:"ENVMAP_MODE_REFRACTION"};function Z_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Y_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var J_={[su]:"ENVMAP_BLENDING_MULTIPLY",[Vp]:"ENVMAP_BLENDING_MIX",[Gp]:"ENVMAP_BLENDING_ADD"};function $_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":J_[n.combine]||"ENVMAP_BLENDING_NONE"}function K_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Q_(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=W_(t),l=q_(t),u=Z_(t),d=$_(t),h=K_(t),m=U_(t),x=F_(s),w=r.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Il).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Il).join(`
`),p.length>0&&(p+=`
`)):(g=[Im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Il).join(`
`),p=[Im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cr?"#define TONE_MAPPING":"",t.toneMapping!==Cr?sn.tonemapping_pars_fragment:"",t.toneMapping!==Cr?N_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",sn.colorspace_pars_fragment,P_("linearToOutputTexel",t.outputColorSpace),D_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Il).join(`
`)),a=tf(a),a=Tm(a,t),a=Em(a,t),o=tf(o),o=Tm(o,t),o=Em(o,t),a=Am(a),o=Am(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Nd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=v+g+a,_=v+p+o,I=Sm(r,r.VERTEX_SHADER,b),A=Sm(r,r.FRAGMENT_SHADER,_);r.attachShader(w,I),r.attachShader(w,A),t.index0AttributeName!==void 0?r.bindAttribLocation(w,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function P(E){if(n.debug.checkShaderErrors){let G=r.getProgramInfoLog(w)||"",L=r.getShaderInfoLog(I)||"",M=r.getShaderInfoLog(A)||"",N=G.trim(),z=L.trim(),q=M.trim(),H=!0,B=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,w,I,A);else{let Z=wm(r,I,"vertex"),J=wm(r,A,"fragment");Xt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+N+`
`+Z+`
`+J)}else N!==""?Ht("WebGLProgram: Program Info Log:",N):(z===""||q==="")&&(B=!1);B&&(E.diagnostics={runnable:H,programLog:N,vertexShader:{log:z,prefix:g},fragmentShader:{log:q,prefix:p}})}r.deleteShader(I),r.deleteShader(A),y=new ao(r,w),C=O_(r,w)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(w,A_)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=I_++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=I,this.fragmentShader=A,this}var j_=0,nf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new rf(e),t.set(e,i)),i}},rf=class{constructor(e){this.id=j_++,this.code=e,this.usedTimes=0}};function eM(n){return n===Xs||n===wl||n===Tl}function tM(n,e,t,i,r,s){let a=new Wa,o=new nf,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function w(y,C,O,E,G,L){let M=E.fog,N=G.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?E.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,H=e.get(y.envMap||z,q),B=H&&H.mapping===xl?H.image.height:null,Z=m[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Ht("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let J=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,fe=J!==void 0?J.length:0,Me=0;N.morphAttributes.position!==void 0&&(Me=1),N.morphAttributes.normal!==void 0&&(Me=2),N.morphAttributes.color!==void 0&&(Me=3);let oe,pe,Ue,ne;if(Z){let He=Qr[Z];oe=He.vertexShader,pe=He.fragmentShader}else{oe=y.vertexShader,pe=y.fragmentShader;let He=o.getVertexShaderStage(y),kt=o.getFragmentShaderStage(y);o.update(y,He,kt),Ue=He.id,ne=kt.id}let te=n.getRenderTarget(),Te=n.state.buffers.depth.getReversed(),Fe=G.isInstancedMesh===!0,Pe=G.isBatchedMesh===!0,at=!!y.map,It=!!y.matcap,lt=!!H,qe=!!y.aoMap,zt=!!y.lightMap,We=!!y.bumpMap&&y.wireframe===!1,ft=!!y.normalMap,Jt=!!y.displacementMap,en=!!y.emissiveMap,Lt=!!y.metalnessMap,Wt=!!y.roughnessMap,W=y.anisotropy>0,$t=y.clearcoat>0,Nt=y.dispersion>0,D=y.retroreflectivity>0,S=y.iridescence>0,ee=y.sheen>0,le=y.transmission>0,ve=W&&!!y.anisotropyMap,Le=$t&&!!y.clearcoatMap,ke=$t&&!!y.clearcoatNormalMap,ye=$t&&!!y.clearcoatRoughnessMap,ge=S&&!!y.iridescenceMap,Ge=S&&!!y.iridescenceThicknessMap,pt=ee&&!!y.sheenColorMap,Ee=ee&&!!y.sheenRoughnessMap,Ye=!!y.specularMap,$e=!!y.specularColorMap,gt=!!y.specularIntensityMap,Et=le&&!!y.transmissionMap,Q=le&&!!y.thicknessMap,Ze=!!y.gradientMap,be=!!y.alphaMap,Ke=y.alphaTest>0,rt=!!y.alphaHash,Re=!!y.extensions,et=Cr;y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(et=n.toneMapping);let Be={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:oe,fragmentShader:pe,defines:y.defines,customVertexShaderID:Ue,customFragmentShaderID:ne,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Pe,batchingColor:Pe&&G._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&G.instanceColor!==null,instancingMorph:Fe&&G.morphTexture!==null,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:mn.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:at,matcap:It,envMap:lt,envMapMode:lt&&H.mapping,envMapCubeUVHeight:B,aoMap:qe,lightMap:zt,bumpMap:We,normalMap:ft,displacementMap:Jt,emissiveMap:en,normalMapObjectSpace:ft&&y.normalMapType===Xp,normalMapTangentSpace:ft&&y.normalMapType===qu,packedNormalMap:ft&&y.normalMapType===qu&&eM(y.normalMap.format),metalnessMap:Lt,roughnessMap:Wt,anisotropy:W,anisotropyMap:ve,clearcoat:$t,clearcoatMap:Le,clearcoatNormalMap:ke,clearcoatRoughnessMap:ye,dispersion:Nt,retroreflection:D,iridescence:S,iridescenceMap:ge,iridescenceThicknessMap:Ge,sheen:ee,sheenColorMap:pt,sheenRoughnessMap:Ee,specularMap:Ye,specularColorMap:$e,specularIntensityMap:gt,transmission:le,transmissionMap:Et,thicknessMap:Q,gradientMap:Ze,opaque:y.transparent===!1&&y.blending===eo&&y.alphaToCoverage===!1,alphaMap:be,alphaTest:Ke,alphaHash:rt,combine:y.combine,mapUv:at&&x(y.map.channel),aoMapUv:qe&&x(y.aoMap.channel),lightMapUv:zt&&x(y.lightMap.channel),bumpMapUv:We&&x(y.bumpMap.channel),normalMapUv:ft&&x(y.normalMap.channel),displacementMapUv:Jt&&x(y.displacementMap.channel),emissiveMapUv:en&&x(y.emissiveMap.channel),metalnessMapUv:Lt&&x(y.metalnessMap.channel),roughnessMapUv:Wt&&x(y.roughnessMap.channel),anisotropyMapUv:ve&&x(y.anisotropyMap.channel),clearcoatMapUv:Le&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ke&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&x(y.sheenRoughnessMap.channel),specularMapUv:Ye&&x(y.specularMap.channel),specularColorMapUv:$e&&x(y.specularColorMap.channel),specularIntensityMapUv:gt&&x(y.specularIntensityMap.channel),transmissionMapUv:Et&&x(y.transmissionMap.channel),thicknessMapUv:Q&&x(y.thicknessMap.channel),alphaMapUv:be&&x(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ft||W),vertexNormals:!!N.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!N.attributes.uv&&(at||be),fog:!!M,useFog:y.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||N.attributes.normal===void 0&&ft===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Te,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Me,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:et,decodeVideoTexture:at&&y.map.isVideoTexture===!0&&mn.getTransfer(y.map.colorSpace)===Pn,decodeVideoTextureEmissive:en&&y.emissiveMap.isVideoTexture===!0&&mn.getTransfer(y.emissiveMap.colorSpace)===Pn,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ji,flipSided:y.side===Xi,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&y.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(y){let C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(let O in y.defines)C.push(O),C.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(p(C,y),v(C,y),C.push(n.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function p(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numSunLights),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numSunLightShadows),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function v(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function b(y){let C=m[y.type],O;if(C){let E=Qr[C];O=cm.clone(E.uniforms)}else O=y.uniforms;return O}function _(y,C){let O=u.get(C);return O!==void 0?++O.usedTimes:(O=new Q_(n,C,y,r),l.push(O),u.set(C,O)),O}function I(y){if(--y.usedTimes===0){let C=l.indexOf(y);l[C]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function A(y){o.remove(y)}function P(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:b,acquireProgram:_,releaseProgram:I,releaseShaderCache:A,programs:l,dispose:P}}function nM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function iM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Cm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Rm(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,x,w,g,p){let v=n[e];return v===void 0?(v={id:h.id,object:h,geometry:m,material:x,materialVariant:a(h),groupOrder:w,renderOrder:h.renderOrder,z:g,group:p},n[e]=v):(v.id=h.id,v.object=h,v.geometry=m,v.material=x,v.materialVariant=a(h),v.groupOrder=w,v.renderOrder=h.renderOrder,v.z=g,v.group=p),e++,v}function c(h,m,x,w,g,p,v){v.reversedDepth===!0&&(g=-g);let b=o(h,m,x,w,g,p);x.transmission>0?i.push(b):x.transparent===!0?r.push(b):t.push(b)}function l(h,m,x,w,g,p){let v=o(h,m,x,w,g,p);x.transmission>0?i.unshift(v):x.transparent===!0?r.unshift(v):t.unshift(v)}function u(h,m){t.length>1&&t.sort(h||iM),i.length>1&&i.sort(m||Cm),r.length>1&&r.sort(m||Cm)}function d(){for(let h=e,m=n.length;h<m;h++){let x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function rM(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new Rm,n.set(i,[a])):r>=s.length?(a=new Rm,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function sM(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new re,color:new rn};break;case"SpotLight":t={position:new re,direction:new re,color:new rn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new re,color:new rn,distance:0,decay:0};break;case"HemisphereLight":t={direction:new re,skyColor:new rn,groundColor:new rn};break;case"RectAreaLight":t={color:new rn,position:new re,halfWidth:new re,halfHeight:new re};break}return n[e.id]=t,t}}}function aM(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var oM=0;function lM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cM(n){let e=new sM,t=aM(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new re);let r=new re,s=new Ln,a=new Ln;function o(l){let u=0,d=0,h=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let m=0,x=0,w=0,g=0,p=0,v=0,b=0,_=0,I=0,A=0,P=0,y=0,C=0,O=0;l.sort(lM);for(let G=0,L=l.length;G<L;G++){let M=l[G],N=M.color,z=M.intensity,q=M.distance,H=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===Xs?H=M.shadow.map.texture:H=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)u+=N.r*z,d+=N.g*z,h+=N.b*z;else if(M.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(M.sh.coefficients[B],z);O++}else if(M.isSunLight){let B=e.get(M);if(B.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let Z=M.shadow,J=t.get(M);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),i.sunShadow[x]=J,i.sunShadowMap[x]=H;let fe=Z.getViewportCount();for(let Me=0;Me<fe;Me++)i.sunShadowMatrix[w+Me]=Z.getMatrix(Me),i.sunShadowCascade[w+Me]=Z._cascadeData[Me];w+=fe,x++}i.sun[m]=B,m++}else if(M.isDirectionalLight){let B=e.get(M);if(B.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let Z=M.shadow,J=t.get(M);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,i.directionalShadow[g]=J,i.directionalShadowMap[g]=H,i.directionalShadowMatrix[g]=M.shadow.matrix,I++}i.directional[g]=B,g++}else if(M.isSpotLight){let B=e.get(M);B.position.setFromMatrixPosition(M.matrixWorld),B.color.copy(N).multiplyScalar(z),B.distance=q,B.coneCos=Math.cos(M.angle),B.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),B.decay=M.decay,i.spot[v]=B;let Z=M.shadow;if(M.map&&(i.spotLightMap[y]=M.map,y++,Z.updateMatrices(M),M.castShadow&&C++),i.spotLightMatrix[v]=Z.matrix,M.castShadow){let J=t.get(M);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,i.spotShadow[v]=J,i.spotShadowMap[v]=H,P++}v++}else if(M.isRectAreaLight){let B=e.get(M);B.color.copy(N).multiplyScalar(z),B.halfWidth.set(M.width*.5,0,0),B.halfHeight.set(0,M.height*.5,0),i.rectArea[b]=B,b++}else if(M.isPointLight){let B=e.get(M);if(B.color.copy(M.color).multiplyScalar(M.intensity),B.distance=M.distance,B.decay=M.decay,M.castShadow){let Z=M.shadow,J=t.get(M);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,J.shadowCameraNear=Z.camera.near,J.shadowCameraFar=Z.camera.far,i.pointShadow[p]=J,i.pointShadowMap[p]=H,i.pointShadowMatrix[p]=M.shadow.matrix,A++}i.point[p]=B,p++}else if(M.isHemisphereLight){let B=e.get(M);B.skyColor.copy(M.color).multiplyScalar(z),B.groundColor.copy(M.groundColor).multiplyScalar(z),i.hemi[_]=B,_++}}b>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let E=i.hash;(E.sunLength!==m||E.directionalLength!==g||E.pointLength!==p||E.spotLength!==v||E.rectAreaLength!==b||E.hemiLength!==_||E.numSunShadows!==x||E.numDirectionalShadows!==I||E.numPointShadows!==A||E.numSpotShadows!==P||E.numSpotMaps!==y||E.numLightProbes!==O)&&(i.sun.length=m,i.directional.length=g,i.spot.length=v,i.rectArea.length=b,i.point.length=p,i.hemi.length=_,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=w,i.sunShadowCascade.length=w,i.directionalShadow.length=I,i.directionalShadowMap.length=I,i.directionalShadowMatrix.length=I,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+y-C,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=O,E.sunLength=m,E.directionalLength=g,E.pointLength=p,E.spotLength=v,E.rectAreaLength=b,E.hemiLength=_,E.numSunShadows=x,E.numDirectionalShadows=I,E.numPointShadows=A,E.numSpotShadows=P,E.numSpotMaps=y,E.numLightProbes=O,i.version=oM++)}function c(l,u){let d=0,h=0,m=0,x=0,w=0,g=0,p=u.matrixWorldInverse;for(let v=0,b=l.length;v<b;v++){let _=l[v];if(_.isSunLight){let I=i.sun[d];I.direction.setFromMatrixPosition(_.matrixWorld),I.direction.transformDirection(p),d++}else if(_.isDirectionalLight){let I=i.directional[h];I.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),h++}else if(_.isSpotLight){let I=i.spot[x];I.position.setFromMatrixPosition(_.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),x++}else if(_.isRectAreaLight){let I=i.rectArea[w];I.position.setFromMatrixPosition(_.matrixWorld),I.position.applyMatrix4(p),a.identity(),s.copy(_.matrixWorld),s.premultiply(p),a.extractRotation(s),I.halfWidth.set(_.width*.5,0,0),I.halfHeight.set(0,_.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),w++}else if(_.isPointLight){let I=i.point[m];I.position.setFromMatrixPosition(_.matrixWorld),I.position.applyMatrix4(p),m++}else if(_.isHemisphereLight){let I=i.hemi[g];I.direction.setFromMatrixPosition(_.matrixWorld),I.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:i}}function Pm(n){let e=new cM(n),t=[],i=[],r=[];function s(h){d.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function uM(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new Pm(n),e.set(r,[o])):s>=a.length?(o=new Pm(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var hM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dM=`uniform sampler2D shadow_pass;
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
}`,fM=[new re(1,0,0),new re(-1,0,0),new re(0,1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1)],pM=[new re(0,-1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1),new re(0,-1,0),new re(0,-1,0)],Lm=new Ln,Al=new re,$d=new re;function mM(n,e,t){let i=new qa,r=new wt,s=new wt,a=new qn,o=new Gc,c=new Hc,l={},u=t.maxTextureSize,d={[Vs]:Xi,[Xi]:Vs,[ji]:ji},h=new pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:hM,fragmentShader:dM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let x=new Ei;x.setAttribute("position",new hr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new Dn(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gl;let p=this.type;this.render=function(A,P,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===ru&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=gl);let C=n.getRenderTarget(),O=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),G=n.state;G.setBlending($r),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let L=p!==this.type;L&&P.traverse(function(M){M.material&&(Array.isArray(M.material)?M.material.forEach(N=>N.needsUpdate=!0):M.material.needsUpdate=!0)});for(let M=0,N=A.length;M<N;M++){let z=A[M],q=z.shadow;if(q===void 0){Ht("WebGLShadowMap:",z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);let H=q.getFrameExtents();r.multiply(H),s.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/H.x),r.x=s.x*H.x,q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/H.y),r.y=s.y*H.y,q.mapSize.y=s.y));let B=n.state.buffers.depth.getReversed();if(q.camera._reversedDepth=B,q.map===null||L===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ja){if(z.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Qi(r.x,r.y,{format:Xs,type:Pr,minFilter:Ti,magFilter:Ti,generateMipmaps:!1}),q.map.texture.name=z.name+".shadowMap",q.map.depthTexture=new Fs(r.x,r.y,yr),q.map.depthTexture.name=z.name+".shadowMapDepth",q.map.depthTexture.format=Wr,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Mi,q.map.depthTexture.magFilter=Mi}else z.isPointLight?(q.map=new Qu(r.x),q.map.depthTexture=new Dc(r.x,Rr)):(q.map=new Qi(r.x,r.y),q.map.depthTexture=new Fs(r.x,r.y,Rr)),q.map.depthTexture.name=z.name+".shadowMap",q.map.depthTexture.format=Wr,this.type===gl?(q.map.depthTexture.compareFunction=B?Zu:Yu,q.map.depthTexture.minFilter=Ti,q.map.depthTexture.magFilter=Ti):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Mi,q.map.depthTexture.magFilter=Mi);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==r.x||q.map.height!==r.y)&&q.map.setSize(r.x,r.y);let Z=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();z.isPointLight!==!0&&q.updateMatrices(z,y);for(let J=0;J<Z;J++){let fe=q.getCamera(J);if(z.isPointLight){let Me=q.camera,oe=q.matrix,pe=z.distance||Me.far;pe!==Me.far&&(Me.far=pe,Me.updateProjectionMatrix()),Al.setFromMatrixPosition(z.matrixWorld),Me.position.copy(Al),$d.copy(Me.position),$d.add(fM[J]),Me.up.copy(pM[J]),Me.lookAt($d),Me.updateMatrixWorld(),oe.makeTranslation(-Al.x,-Al.y,-Al.z),Lm.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Lm,Me.coordinateSystem,Me.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)n.setRenderTarget(q.map,J),n.clear();else{J===0&&(n.setRenderTarget(q.map),n.clear());let Me=q.getViewport(J);a.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),G.viewport(a)}i=q.getFrustum(J),_(P,y,fe,z,this.type)}q.isPointLightShadow!==!0&&this.type===ja&&v(q,y),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(C,O,E)};function v(A,P){let y=e.update(w);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null?A.mapPass=new Qi(r.x,r.y,{format:Xs,type:Pr}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(P,null,y,h,w,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value.set(A.map.width,A.map.height),m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(P,null,y,m,w,null)}function b(A,P,y,C){let O=null,E=y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(E!==void 0)O=E;else if(O=y.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let G=O.uuid,L=P.uuid,M=l[G];M===void 0&&(M={},l[G]=M);let N=M[L];N===void 0&&(N=O.clone(),M[L]=N,P.addEventListener("dispose",I)),O=N}if(O.visible=P.visible,O.wireframe=P.wireframe,C===ja?O.side=P.shadowSide!==null?P.shadowSide:P.side:O.side=P.shadowSide!==null?P.shadowSide:d[P.side],O.alphaMap=P.alphaMap,O.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,O.map=P.map,O.clipShadows=P.clipShadows,O.clippingPlanes=P.clippingPlanes,O.clipIntersection=P.clipIntersection,O.displacementMap=P.displacementMap,O.displacementScale=P.displacementScale,O.displacementBias=P.displacementBias,O.wireframeLinewidth=P.wireframeLinewidth,O.linewidth=P.linewidth,y.isPointLight===!0&&O.isMeshDistanceMaterial===!0){let G=n.properties.get(O);G.light=y}return O}function _(A,P,y,C,O){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&O===ja)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,A.matrixWorld);let L=e.update(A),M=A.material;if(Array.isArray(M)){let N=L.groups;for(let z=0,q=N.length;z<q;z++){let H=N[z],B=M[H.materialIndex];if(B&&B.visible){let Z=b(A,B,C,O);A.onBeforeShadow(n,A,P,y,L,Z,H),n.renderBufferDirect(y,null,L,Z,A,H),A.onAfterShadow(n,A,P,y,L,Z,H)}}}else if(M.visible){let N=b(A,M,C,O);A.onBeforeShadow(n,A,P,y,L,N,null),n.renderBufferDirect(y,null,L,N,A,null),A.onAfterShadow(n,A,P,y,L,N,null)}}let G=A.children;for(let L=0,M=G.length;L<M;L++)_(G[L],P,y,C,O)}function I(A){A.target.removeEventListener("dispose",I);for(let y in l){let C=l[y],O=A.target.uuid;O in C&&(C[O].dispose(),delete C[O])}}}function vM(n,e){function t(){let Q=!1,Ze=new qn,be=null,Ke=new qn(0,0,0,0);return{setMask:function(rt){be!==rt&&!Q&&(n.colorMask(rt,rt,rt,rt),be=rt)},setLocked:function(rt){Q=rt},setClear:function(rt,Re,et,Be,He){He===!0&&(rt*=Be,Re*=Be,et*=Be),Ze.set(rt,Re,et,Be),Ke.equals(Ze)===!1&&(n.clearColor(rt,Re,et,Be),Ke.copy(Ze))},reset:function(){Q=!1,be=null,Ke.set(-1,0,0,0)}}}function i(){let Q=!1,Ze=!1,be=null,Ke=null,rt=null;return{setReversed:function(Re){if(Ze!==Re){let et=e.get("EXT_clip_control");Re?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT),Ze=Re;let Be=rt;rt=null,this.setClear(Be)}},getReversed:function(){return Ze},setTest:function(Re){Re?te(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(Re){be!==Re&&!Q&&(n.depthMask(Re),be=Re)},setFunc:function(Re){if(Ze&&(Re=im[Re]),Ke!==Re){switch(Re){case _c:n.depthFunc(n.NEVER);break;case Mc:n.depthFunc(n.ALWAYS);break;case Sc:n.depthFunc(n.LESS);break;case ka:n.depthFunc(n.LEQUAL);break;case bc:n.depthFunc(n.EQUAL);break;case wc:n.depthFunc(n.GEQUAL);break;case Tc:n.depthFunc(n.GREATER);break;case Ec:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ke=Re}},setLocked:function(Re){Q=Re},setClear:function(Re){rt!==Re&&(rt=Re,Ze&&(Re=1-Re),n.clearDepth(Re))},reset:function(){Q=!1,be=null,Ke=null,rt=null,Ze=!1}}}function r(){let Q=!1,Ze=null,be=null,Ke=null,rt=null,Re=null,et=null,Be=null,He=null;return{setTest:function(kt){Q||(kt?te(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(kt){Ze!==kt&&!Q&&(n.stencilMask(kt),Ze=kt)},setFunc:function(kt,_t,Ft){(be!==kt||Ke!==_t||rt!==Ft)&&(n.stencilFunc(kt,_t,Ft),be=kt,Ke=_t,rt=Ft)},setOp:function(kt,_t,Ft){(Re!==kt||et!==_t||Be!==Ft)&&(n.stencilOp(kt,_t,Ft),Re=kt,et=_t,Be=Ft)},setLocked:function(kt){Q=kt},setClear:function(kt){He!==kt&&(n.clearStencil(kt),He=kt)},reset:function(){Q=!1,Ze=null,be=null,Ke=null,rt=null,Re=null,et=null,Be=null,He=null}}}let s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap,u={},d={},h={},m=new WeakMap,x=[],w=null,g=!1,p=null,v=null,b=null,_=null,I=null,A=null,P=null,y=new rn(0,0,0),C=0,O=!1,E=null,G=null,L=null,M=null,N=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,H=0,B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(B)[1]),q=H>=1):B.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),q=H>=2);let Z=null,J={},fe=n.getParameter(n.SCISSOR_BOX),Me=n.getParameter(n.VIEWPORT),oe=new qn().fromArray(fe),pe=new qn().fromArray(Me);function Ue(Q,Ze,be,Ke){let rt=new Uint8Array(4),Re=n.createTexture();n.bindTexture(Q,Re),n.texParameteri(Q,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Q,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let et=0;et<be;et++)Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?n.texImage3D(Ze,0,n.RGBA,1,1,Ke,0,n.RGBA,n.UNSIGNED_BYTE,rt):n.texImage2D(Ze+et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,rt);return Re}let ne={};ne[n.TEXTURE_2D]=Ue(n.TEXTURE_2D,n.TEXTURE_2D,1),ne[n.TEXTURE_CUBE_MAP]=Ue(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[n.TEXTURE_2D_ARRAY]=Ue(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ne[n.TEXTURE_3D]=Ue(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(ka),We(!1),ft(fd),te(n.CULL_FACE),qe($r);function te(Q){u[Q]!==!0&&(n.enable(Q),u[Q]=!0)}function Te(Q){u[Q]!==!1&&(n.disable(Q),u[Q]=!1)}function Fe(Q,Ze){return h[Q]!==Ze?(n.bindFramebuffer(Q,Ze),h[Q]=Ze,Q===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Ze),Q===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Ze),!0):!1}function Pe(Q,Ze){let be=x,Ke=!1;if(Q){be=m.get(Ze),be===void 0&&(be=[],m.set(Ze,be));let rt=Q.textures;if(be.length!==rt.length||be[0]!==n.COLOR_ATTACHMENT0){for(let Re=0,et=rt.length;Re<et;Re++)be[Re]=n.COLOR_ATTACHMENT0+Re;be.length=rt.length,Ke=!0}}else be[0]!==n.BACK&&(be[0]=n.BACK,Ke=!0);Ke&&n.drawBuffers(be)}function at(Q){return w!==Q?(n.useProgram(Q),w=Q,!0):!1}let It={[da]:n.FUNC_ADD,[wp]:n.FUNC_SUBTRACT,[Tp]:n.FUNC_REVERSE_SUBTRACT};It[Ep]=n.MIN,It[Ap]=n.MAX;let lt={[Ip]:n.ZERO,[Cp]:n.ONE,[Rp]:n.SRC_COLOR,[gd]:n.SRC_ALPHA,[Fp]:n.SRC_ALPHA_SATURATE,[Dp]:n.DST_COLOR,[Lp]:n.DST_ALPHA,[Pp]:n.ONE_MINUS_SRC_COLOR,[xd]:n.ONE_MINUS_SRC_ALPHA,[Up]:n.ONE_MINUS_DST_COLOR,[Np]:n.ONE_MINUS_DST_ALPHA,[Op]:n.CONSTANT_COLOR,[Bp]:n.ONE_MINUS_CONSTANT_COLOR,[zp]:n.CONSTANT_ALPHA,[kp]:n.ONE_MINUS_CONSTANT_ALPHA};function qe(Q,Ze,be,Ke,rt,Re,et,Be,He,kt){if(Q===$r){g===!0&&(Te(n.BLEND),g=!1);return}if(g===!1&&(te(n.BLEND),g=!0),Q!==bp){if(Q!==p||kt!==O){if((v!==da||I!==da)&&(n.blendEquation(n.FUNC_ADD),v=da,I=da),kt)switch(Q){case eo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pd:n.blendFunc(n.ONE,n.ONE);break;case md:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Xt("WebGLState: Invalid blending: ",Q);break}else switch(Q){case eo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case md:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vd:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",Q);break}b=null,_=null,A=null,P=null,y.set(0,0,0),C=0,p=Q,O=kt}return}rt=rt||Ze,Re=Re||be,et=et||Ke,(Ze!==v||rt!==I)&&(n.blendEquationSeparate(It[Ze],It[rt]),v=Ze,I=rt),(be!==b||Ke!==_||Re!==A||et!==P)&&(n.blendFuncSeparate(lt[be],lt[Ke],lt[Re],lt[et]),b=be,_=Ke,A=Re,P=et),(Be.equals(y)===!1||He!==C)&&(n.blendColor(Be.r,Be.g,Be.b,He),y.copy(Be),C=He),p=Q,O=!1}function zt(Q,Ze){Q.side===ji?Te(n.CULL_FACE):te(n.CULL_FACE);let be=Q.side===Xi;Ze&&(be=!be),We(be),Q.blending===eo&&Q.transparent===!1?qe($r):qe(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),a.setFunc(Q.depthFunc),a.setTest(Q.depthTest),a.setMask(Q.depthWrite),s.setMask(Q.colorWrite);let Ke=Q.stencilWrite;o.setTest(Ke),Ke&&(o.setMask(Q.stencilWriteMask),o.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),o.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),en(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(Q){E!==Q&&(Q?n.frontFace(n.CW):n.frontFace(n.CCW),E=Q)}function ft(Q){Q!==Mp?(te(n.CULL_FACE),Q!==G&&(Q===fd?n.cullFace(n.BACK):Q===Sp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),G=Q}function Jt(Q){Q!==L&&(q&&n.lineWidth(Q),L=Q)}function en(Q,Ze,be){Q?(te(n.POLYGON_OFFSET_FILL),(M!==Ze||N!==be)&&(M=Ze,N=be,a.getReversed()&&(Ze=-Ze),n.polygonOffset(Ze,be))):Te(n.POLYGON_OFFSET_FILL)}function Lt(Q){Q?te(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function Wt(Q){Q===void 0&&(Q=n.TEXTURE0+z-1),Z!==Q&&(n.activeTexture(Q),Z=Q)}function W(Q,Ze,be){be===void 0&&(Z===null?be=n.TEXTURE0+z-1:be=Z);let Ke=J[be];Ke===void 0&&(Ke={type:void 0,texture:void 0},J[be]=Ke),(Ke.type!==Q||Ke.texture!==Ze)&&(Z!==be&&(n.activeTexture(be),Z=be),n.bindTexture(Q,Ze||ne[Q]),Ke.type=Q,Ke.texture=Ze)}function $t(){let Q=J[Z];Q!==void 0&&Q.type!==void 0&&(n.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function Nt(){try{n.compressedTexImage2D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function S(){try{n.texSubImage2D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function ee(){try{n.texSubImage3D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function le(){try{n.compressedTexSubImage2D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function ve(){try{n.compressedTexSubImage3D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function Le(){try{n.texStorage2D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function ke(){try{n.texStorage3D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function ye(){try{n.texImage2D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function ge(){try{n.texImage3D(...arguments)}catch(Q){Xt("WebGLState:",Q)}}function Ge(Q){return d[Q]!==void 0?d[Q]:n.getParameter(Q)}function pt(Q,Ze){d[Q]!==Ze&&(n.pixelStorei(Q,Ze),d[Q]=Ze)}function Ee(Q){oe.equals(Q)===!1&&(n.scissor(Q.x,Q.y,Q.z,Q.w),oe.copy(Q))}function Ye(Q){pe.equals(Q)===!1&&(n.viewport(Q.x,Q.y,Q.z,Q.w),pe.copy(Q))}function $e(Q,Ze){let be=l.get(Ze);be===void 0&&(be=new WeakMap,l.set(Ze,be));let Ke=be.get(Q);Ke===void 0&&(Ke=n.getUniformBlockIndex(Ze,Q.name),be.set(Q,Ke))}function gt(Q,Ze){let Ke=l.get(Ze).get(Q);c.get(Ze)!==Ke&&(n.uniformBlockBinding(Ze,Ke,Q.__bindingPointIndex),c.set(Ze,Ke))}function Et(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},Z=null,J={},h={},m=new WeakMap,x=[],w=null,g=!1,p=null,v=null,b=null,_=null,I=null,A=null,P=null,y=new rn(0,0,0),C=0,O=!1,E=null,G=null,L=null,M=null,N=null,oe.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:Te,bindFramebuffer:Fe,drawBuffers:Pe,useProgram:at,setBlending:qe,setMaterial:zt,setFlipSided:We,setCullFace:ft,setLineWidth:Jt,setPolygonOffset:en,setScissorTest:Lt,activeTexture:Wt,bindTexture:W,unbindTexture:$t,compressedTexImage2D:Nt,compressedTexImage3D:D,texImage2D:ye,texImage3D:ge,pixelStorei:pt,getParameter:Ge,updateUBOMapping:$e,uniformBlockBinding:gt,texStorage2D:Le,texStorage3D:ke,texSubImage2D:S,texSubImage3D:ee,compressedTexSubImage2D:le,compressedTexSubImage3D:ve,scissor:Ee,viewport:Ye,reset:Et}}function gM(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new wt,u=new WeakMap,d=new Set,h,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(D,S){return x?new OffscreenCanvas(D,S):qo("canvas")}function g(D,S,ee){let le=1,ve=Nt(D);if((ve.width>ee||ve.height>ee)&&(le=ee/Math.max(ve.width,ve.height)),le<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let Le=Math.floor(le*ve.width),ke=Math.floor(le*ve.height);h===void 0&&(h=w(Le,ke));let ye=S?w(Le,ke):h;return ye.width=Le,ye.height=ke,ye.getContext("2d").drawImage(D,0,0,Le,ke),Ht("WebGLRenderer: Texture has been resized from ("+ve.width+"x"+ve.height+") to ("+Le+"x"+ke+")."),ye}else return"data"in D&&Ht("WebGLRenderer: Image in DataTexture is too big ("+ve.width+"x"+ve.height+")."),D;return D}function p(D){return D.generateMipmaps}function v(D){n.generateMipmap(D)}function b(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(D,S,ee,le,ve,Le=!1){if(D!==null){if(n[D]!==void 0)return n[D];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ke;le&&(ke=e.get("EXT_texture_norm16"),ke||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ye=S;if(S===n.RED&&(ee===n.FLOAT&&(ye=n.R32F),ee===n.HALF_FLOAT&&(ye=n.R16F),ee===n.UNSIGNED_BYTE&&(ye=n.R8),ee===n.UNSIGNED_SHORT&&ke&&(ye=ke.R16_EXT),ee===n.SHORT&&ke&&(ye=ke.R16_SNORM_EXT)),S===n.RED_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ye=n.R8UI),ee===n.UNSIGNED_SHORT&&(ye=n.R16UI),ee===n.UNSIGNED_INT&&(ye=n.R32UI),ee===n.BYTE&&(ye=n.R8I),ee===n.SHORT&&(ye=n.R16I),ee===n.INT&&(ye=n.R32I)),S===n.RG&&(ee===n.FLOAT&&(ye=n.RG32F),ee===n.HALF_FLOAT&&(ye=n.RG16F),ee===n.UNSIGNED_BYTE&&(ye=n.RG8),ee===n.UNSIGNED_SHORT&&ke&&(ye=ke.RG16_EXT),ee===n.SHORT&&ke&&(ye=ke.RG16_SNORM_EXT)),S===n.RG_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ye=n.RG8UI),ee===n.UNSIGNED_SHORT&&(ye=n.RG16UI),ee===n.UNSIGNED_INT&&(ye=n.RG32UI),ee===n.BYTE&&(ye=n.RG8I),ee===n.SHORT&&(ye=n.RG16I),ee===n.INT&&(ye=n.RG32I)),S===n.RGB_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ye=n.RGB8UI),ee===n.UNSIGNED_SHORT&&(ye=n.RGB16UI),ee===n.UNSIGNED_INT&&(ye=n.RGB32UI),ee===n.BYTE&&(ye=n.RGB8I),ee===n.SHORT&&(ye=n.RGB16I),ee===n.INT&&(ye=n.RGB32I)),S===n.RGBA_INTEGER&&(ee===n.UNSIGNED_BYTE&&(ye=n.RGBA8UI),ee===n.UNSIGNED_SHORT&&(ye=n.RGBA16UI),ee===n.UNSIGNED_INT&&(ye=n.RGBA32UI),ee===n.BYTE&&(ye=n.RGBA8I),ee===n.SHORT&&(ye=n.RGBA16I),ee===n.INT&&(ye=n.RGBA32I)),S===n.RGB&&(ee===n.UNSIGNED_SHORT&&ke&&(ye=ke.RGB16_EXT),ee===n.SHORT&&ke&&(ye=ke.RGB16_SNORM_EXT),ee===n.UNSIGNED_INT_5_9_9_9_REV&&(ye=n.RGB9_E5),ee===n.UNSIGNED_INT_10F_11F_11F_REV&&(ye=n.R11F_G11F_B10F)),S===n.RGBA){let ge=Le?Xo:mn.getTransfer(ve);ee===n.FLOAT&&(ye=n.RGBA32F),ee===n.HALF_FLOAT&&(ye=n.RGBA16F),ee===n.UNSIGNED_BYTE&&(ye=ge===Pn?n.SRGB8_ALPHA8:n.RGBA8),ee===n.UNSIGNED_SHORT&&ke&&(ye=ke.RGBA16_EXT),ee===n.SHORT&&ke&&(ye=ke.RGBA16_SNORM_EXT),ee===n.UNSIGNED_SHORT_4_4_4_4&&(ye=n.RGBA4),ee===n.UNSIGNED_SHORT_5_5_5_1&&(ye=n.RGB5_A1)}return(ye===n.R16F||ye===n.R32F||ye===n.RG16F||ye===n.RG32F||ye===n.RGBA16F||ye===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ye}function I(D,S){let ee;return D?S===null||S===Rr||S===no?ee=n.DEPTH24_STENCIL8:S===yr?ee=n.DEPTH32F_STENCIL8:S===to&&(ee=n.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Rr||S===no?ee=n.DEPTH_COMPONENT24:S===yr?ee=n.DEPTH_COMPONENT32F:S===to&&(ee=n.DEPTH_COMPONENT16),ee}function A(D,S){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==Mi&&D.minFilter!==Ti?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function P(D){let S=D.target;S.removeEventListener("dispose",P),C(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&d.delete(S)}function y(D){let S=D.target;S.removeEventListener("dispose",y),E(S)}function C(D){let S=i.get(D);if(S.__webglInit===void 0)return;let ee=D.source,le=m.get(ee);if(le){let ve=le[S.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&O(D),Object.keys(le).length===0&&m.delete(ee)}i.remove(D)}function O(D){let S=i.get(D);n.deleteTexture(S.__webglTexture);let ee=D.source,le=m.get(ee);delete le[S.__cacheKey],a.memory.textures--}function E(D){let S=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(S.__webglFramebuffer[le]))for(let ve=0;ve<S.__webglFramebuffer[le].length;ve++)n.deleteFramebuffer(S.__webglFramebuffer[le][ve]);else n.deleteFramebuffer(S.__webglFramebuffer[le]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[le])}else{if(Array.isArray(S.__webglFramebuffer))for(let le=0;le<S.__webglFramebuffer.length;le++)n.deleteFramebuffer(S.__webglFramebuffer[le]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let le=0;le<S.__webglColorRenderbuffer.length;le++)S.__webglColorRenderbuffer[le]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[le]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let ee=D.textures;for(let le=0,ve=ee.length;le<ve;le++){let Le=i.get(ee[le]);Le.__webglTexture&&(n.deleteTexture(Le.__webglTexture),a.memory.textures--),i.remove(ee[le])}i.remove(D)}let G=0;function L(){G=0}function M(){return G}function N(D){G=D}function z(){let D=G;return D>=r.maxTextures&&Ht("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+r.maxTextures),G+=1,D}function q(D){let S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function H(D,S){let ee=i.get(D);if(D.isVideoTexture&&W(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&ee.__version!==D.version){let le=D.image;if(le===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(ee,D,S);return}}else D.isExternalTexture&&(ee.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture,n.TEXTURE0+S)}function B(D,S){let ee=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&ee.__version!==D.version){Te(ee,D,S);return}else D.isExternalTexture&&(ee.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,ee.__webglTexture,n.TEXTURE0+S)}function Z(D,S){let ee=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&ee.__version!==D.version){Te(ee,D,S);return}t.bindTexture(n.TEXTURE_3D,ee.__webglTexture,n.TEXTURE0+S)}function J(D,S){let ee=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&ee.__version!==D.version){Fe(ee,D,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture,n.TEXTURE0+S)}let fe={[Ac]:n.REPEAT,[Hr]:n.CLAMP_TO_EDGE,[Ic]:n.MIRRORED_REPEAT},Me={[Mi]:n.NEAREST,[Hp]:n.NEAREST_MIPMAP_NEAREST,[yl]:n.NEAREST_MIPMAP_LINEAR,[Ti]:n.LINEAR,[lu]:n.LINEAR_MIPMAP_NEAREST,[Hs]:n.LINEAR_MIPMAP_LINEAR},oe={[Yp]:n.NEVER,[Qp]:n.ALWAYS,[Zp]:n.LESS,[Yu]:n.LEQUAL,[Jp]:n.EQUAL,[Zu]:n.GEQUAL,[$p]:n.GREATER,[Kp]:n.NOTEQUAL};function pe(D,S){if(S.type===yr&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ti||S.magFilter===lu||S.magFilter===yl||S.magFilter===Hs||S.minFilter===Ti||S.minFilter===lu||S.minFilter===yl||S.minFilter===Hs)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,fe[S.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,fe[S.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,fe[S.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,Me[S.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,Me[S.minFilter]),S.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,oe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Mi||S.minFilter!==yl&&S.minFilter!==Hs||S.type===yr&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let ee=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ue(D,S){let ee=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",P));let le=S.source,ve=m.get(le);ve===void 0&&(ve={},m.set(le,ve));let Le=q(S);if(Le!==D.__cacheKey){ve[Le]===void 0&&(ve[Le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,ee=!0),ve[Le].usedTimes++;let ke=ve[D.__cacheKey];ke!==void 0&&(ve[D.__cacheKey].usedTimes--,ke.usedTimes===0&&O(S)),D.__cacheKey=Le,D.__webglTexture=ve[Le].texture}return ee}function ne(D,S,ee){return Math.floor(Math.floor(D/ee)/S)}function te(D,S,ee,le){let Le=D.updateRanges;if(Le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,ee,le,S.data);else{Le.sort((pt,Ee)=>pt.start-Ee.start);let ke=0;for(let pt=1;pt<Le.length;pt++){let Ee=Le[ke],Ye=Le[pt],$e=Ee.start+Ee.count,gt=ne(Ye.start,S.width,4),Et=ne(Ee.start,S.width,4);Ye.start<=$e+1&&gt===Et&&ne(Ye.start+Ye.count-1,S.width,4)===gt?Ee.count=Math.max(Ee.count,Ye.start+Ye.count-Ee.start):(++ke,Le[ke]=Ye)}Le.length=ke+1;let ye=t.getParameter(n.UNPACK_ROW_LENGTH),ge=t.getParameter(n.UNPACK_SKIP_PIXELS),Ge=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let pt=0,Ee=Le.length;pt<Ee;pt++){let Ye=Le[pt],$e=Math.floor(Ye.start/4),gt=Math.ceil(Ye.count/4),Et=$e%S.width,Q=Math.floor($e/S.width),Ze=gt,be=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Et),t.pixelStorei(n.UNPACK_SKIP_ROWS,Q),t.texSubImage2D(n.TEXTURE_2D,0,Et,Q,Ze,be,ee,le,S.data)}D.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ye),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ge)}}function Te(D,S,ee){let le=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(le=n.TEXTURE_3D);let ve=Ue(D,S),Le=S.source;t.bindTexture(le,D.__webglTexture,n.TEXTURE0+ee);let ke=i.get(Le);if(Le.version!==ke.__version||ve===!0){if(t.activeTexture(n.TEXTURE0+ee),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let be=mn.getPrimaries(mn.workingColorSpace),Ke=S.colorSpace===gs?null:mn.getPrimaries(S.colorSpace),rt=S.colorSpace===gs||be===Ke?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt)}t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment);let ge=g(S.image,!1,r.maxTextureSize);ge=$t(S,ge);let Ge=s.convert(S.format,S.colorSpace),pt=s.convert(S.type),Ee=_(S.internalFormat,Ge,pt,S.normalized,S.colorSpace,S.isVideoTexture);pe(le,S);let Ye,$e=S.mipmaps,gt=S.isVideoTexture!==!0,Et=ke.__version===void 0||ve===!0,Q=Le.dataReady,Ze=A(S,ge);if(S.isDepthTexture)Ee=I(S.format===Ws,S.type),Et&&(gt?t.texStorage2D(n.TEXTURE_2D,1,Ee,ge.width,ge.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ge.width,ge.height,0,Ge,pt,null));else if(S.isDataTexture)if($e.length>0){gt&&Et&&t.texStorage2D(n.TEXTURE_2D,Ze,Ee,$e[0].width,$e[0].height);for(let be=0,Ke=$e.length;be<Ke;be++)Ye=$e[be],gt?Q&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,Ye.width,Ye.height,Ge,pt,Ye.data):t.texImage2D(n.TEXTURE_2D,be,Ee,Ye.width,Ye.height,0,Ge,pt,Ye.data);S.generateMipmaps=!1}else gt?(Et&&t.texStorage2D(n.TEXTURE_2D,Ze,Ee,ge.width,ge.height),Q&&te(S,ge,Ge,pt)):t.texImage2D(n.TEXTURE_2D,0,Ee,ge.width,ge.height,0,Ge,pt,ge.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){gt&&Et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ze,Ee,$e[0].width,$e[0].height,ge.depth);for(let be=0,Ke=$e.length;be<Ke;be++)if(Ye=$e[be],S.format!==_r)if(Ge!==null)if(gt){if(Q)if(S.layerUpdates.size>0){let rt=zd(Ye.width,Ye.height,S.format,S.type);for(let Re of S.layerUpdates){let et=Ye.data.subarray(Re*rt/Ye.data.BYTES_PER_ELEMENT,(Re+1)*rt/Ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,Re,Ye.width,Ye.height,1,Ge,et)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,Ye.width,Ye.height,ge.depth,Ge,Ye.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,be,Ee,Ye.width,Ye.height,ge.depth,0,Ye.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?Q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,Ye.width,Ye.height,ge.depth,Ge,pt,Ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,be,Ee,Ye.width,Ye.height,ge.depth,0,Ge,pt,Ye.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{gt&&Et&&t.texStorage2D(n.TEXTURE_2D,Ze,Ee,$e[0].width,$e[0].height);for(let be=0,Ke=$e.length;be<Ke;be++)Ye=$e[be],S.format!==_r?Ge!==null?gt?Q&&t.compressedTexSubImage2D(n.TEXTURE_2D,be,0,0,Ye.width,Ye.height,Ge,Ye.data):t.compressedTexImage2D(n.TEXTURE_2D,be,Ee,Ye.width,Ye.height,0,Ye.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?Q&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,Ye.width,Ye.height,Ge,pt,Ye.data):t.texImage2D(n.TEXTURE_2D,be,Ee,Ye.width,Ye.height,0,Ge,pt,Ye.data)}else if(S.isDataArrayTexture)if(gt){if(Et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ze,Ee,ge.width,ge.height,ge.depth),Q)if(S.layerUpdates.size>0){let be=zd(ge.width,ge.height,S.format,S.type);for(let Ke of S.layerUpdates){let rt=ge.data.subarray(Ke*be/ge.data.BYTES_PER_ELEMENT,(Ke+1)*be/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ke,ge.width,ge.height,1,Ge,pt,rt)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Ge,pt,ge.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ge.width,ge.height,ge.depth,0,Ge,pt,ge.data);else if(S.isData3DTexture)gt?(Et&&t.texStorage3D(n.TEXTURE_3D,Ze,Ee,ge.width,ge.height,ge.depth),Q&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Ge,pt,ge.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ge.width,ge.height,ge.depth,0,Ge,pt,ge.data);else if(S.isFramebufferTexture){if(Et)if(gt)t.texStorage2D(n.TEXTURE_2D,Ze,Ee,ge.width,ge.height);else{let be=ge.width,Ke=ge.height;for(let rt=0;rt<Ze;rt++)t.texImage2D(n.TEXTURE_2D,rt,Ee,be,Ke,0,Ge,pt,null),be>>=1,Ke>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in n){let be=n.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),ge.parentNode!==be){be.appendChild(ge),d.add(S),be.onpaint=Ke=>{let rt=Ke.changedElements;for(let Re of d)rt.includes(Re.image)&&(Re.needsUpdate=!0)},be.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ge);else{let rt=n.RGBA,Re=n.RGBA,et=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,rt,Re,et,ge)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if($e.length>0){if(gt&&Et){let be=Nt($e[0]);t.texStorage2D(n.TEXTURE_2D,Ze,Ee,be.width,be.height)}for(let be=0,Ke=$e.length;be<Ke;be++)Ye=$e[be],gt?Q&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,Ge,pt,Ye):t.texImage2D(n.TEXTURE_2D,be,Ee,Ge,pt,Ye);S.generateMipmaps=!1}else if(gt){if(Et){let be=Nt(ge);t.texStorage2D(n.TEXTURE_2D,Ze,Ee,be.width,be.height)}Q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ge,pt,ge)}else t.texImage2D(n.TEXTURE_2D,0,Ee,Ge,pt,ge);p(S)&&v(le),ke.__version=Le.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function Fe(D,S,ee){if(S.image.length!==6)return;let le=Ue(D,S),ve=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+ee);let Le=i.get(ve);if(ve.version!==Le.__version||le===!0){t.activeTexture(n.TEXTURE0+ee);let ke=mn.getPrimaries(mn.workingColorSpace),ye=S.colorSpace===gs?null:mn.getPrimaries(S.colorSpace),ge=S.colorSpace===gs||ke===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Ge=S.isCompressedTexture||S.image[0].isCompressedTexture,pt=S.image[0]&&S.image[0].isDataTexture,Ee=[];for(let Re=0;Re<6;Re++)!Ge&&!pt?Ee[Re]=g(S.image[Re],!0,r.maxCubemapSize):Ee[Re]=pt?S.image[Re].image:S.image[Re],Ee[Re]=$t(S,Ee[Re]);let Ye=Ee[0],$e=s.convert(S.format,S.colorSpace),gt=s.convert(S.type),Et=_(S.internalFormat,$e,gt,S.normalized,S.colorSpace),Q=S.isVideoTexture!==!0,Ze=Le.__version===void 0||le===!0,be=ve.dataReady,Ke=A(S,Ye);pe(n.TEXTURE_CUBE_MAP,S);let rt;if(Ge){Q&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,Et,Ye.width,Ye.height);for(let Re=0;Re<6;Re++){rt=Ee[Re].mipmaps;for(let et=0;et<rt.length;et++){let Be=rt[et];S.format!==_r?$e!==null?Q?be&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et,0,0,Be.width,Be.height,$e,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et,Et,Be.width,Be.height,0,Be.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Q?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et,0,0,Be.width,Be.height,$e,gt,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et,Et,Be.width,Be.height,0,$e,gt,Be.data)}}}else{if(rt=S.mipmaps,Q&&Ze){rt.length>0&&Ke++;let Re=Nt(Ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,Et,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(pt){Q?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ee[Re].width,Ee[Re].height,$e,gt,Ee[Re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,Et,Ee[Re].width,Ee[Re].height,0,$e,gt,Ee[Re].data);for(let et=0;et<rt.length;et++){let He=rt[et].image[Re].image;Q?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et+1,0,0,He.width,He.height,$e,gt,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et+1,Et,He.width,He.height,0,$e,gt,He.data)}}else{Q?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,$e,gt,Ee[Re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,Et,$e,gt,Ee[Re]);for(let et=0;et<rt.length;et++){let Be=rt[et];Q?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et+1,0,0,$e,gt,Be.image[Re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,et+1,Et,$e,gt,Be.image[Re])}}}p(S)&&v(n.TEXTURE_CUBE_MAP),Le.__version=ve.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function Pe(D,S,ee,le,ve,Le){let ke=s.convert(ee.format,ee.colorSpace),ye=s.convert(ee.type),ge=_(ee.internalFormat,ke,ye,ee.normalized,ee.colorSpace),Ge=i.get(S),pt=i.get(ee);if(pt.__renderTarget=S,!Ge.__hasExternalTextures){let Ee=Math.max(1,S.width>>Le),Ye=Math.max(1,S.height>>Le);ve===n.TEXTURE_3D||ve===n.TEXTURE_2D_ARRAY?t.texImage3D(ve,Le,ge,Ee,Ye,S.depth,0,ke,ye,null):t.texImage2D(ve,Le,ge,Ee,Ye,0,ke,ye,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Wt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,ve,pt.__webglTexture,0,Lt(S)):(ve===n.TEXTURE_2D||ve>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,ve,pt.__webglTexture,Le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function at(D,S,ee){if(n.bindRenderbuffer(n.RENDERBUFFER,D),S.depthBuffer){let le=S.depthTexture,ve=le&&le.isDepthTexture?le.type:null,Le=I(S.stencilBuffer,ve),ke=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Wt(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Lt(S),Le,S.width,S.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt(S),Le,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Le,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ke,n.RENDERBUFFER,D)}else{let le=S.textures;for(let ve=0;ve<le.length;ve++){let Le=le[ve],ke=s.convert(Le.format,Le.colorSpace),ye=s.convert(Le.type),ge=_(Le.internalFormat,ke,ye,Le.normalized,Le.colorSpace);Wt(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Lt(S),ge,S.width,S.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt(S),ge,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ge,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function It(D,S,ee){let le=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ve=i.get(S.depthTexture);if(ve.__renderTarget=S,(!ve.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),le){if(ve.__webglInit===void 0&&(ve.__webglInit=!0,S.depthTexture.addEventListener("dispose",P)),ve.__webglTexture===void 0){ve.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ve.__webglTexture),pe(n.TEXTURE_CUBE_MAP,S.depthTexture);let Ge=s.convert(S.depthTexture.format),pt=s.convert(S.depthTexture.type),Ee;S.depthTexture.format===Wr?Ee=n.DEPTH_COMPONENT24:S.depthTexture.format===Ws&&(Ee=n.DEPTH24_STENCIL8);for(let Ye=0;Ye<6;Ye++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ye,0,Ee,S.width,S.height,0,Ge,pt,null)}}else H(S.depthTexture,0);let Le=ve.__webglTexture,ke=Lt(S),ye=le?n.TEXTURE_CUBE_MAP_POSITIVE_X+ee:n.TEXTURE_2D,ge=S.depthTexture.format===Ws?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(S.depthTexture.format===Wr)Wt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ge,ye,Le,0,ke):n.framebufferTexture2D(n.FRAMEBUFFER,ge,ye,Le,0);else if(S.depthTexture.format===Ws)Wt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ge,ye,Le,0,ke):n.framebufferTexture2D(n.FRAMEBUFFER,ge,ye,Le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(D){let S=i.get(D),ee=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){let le=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),le){let ve=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,le.removeEventListener("dispose",ve)};le.addEventListener("dispose",ve),S.__depthDisposeCallback=ve}S.__boundDepthTexture=le}if(D.depthTexture&&!S.__autoAllocateDepthBuffer)if(ee)for(let le=0;le<6;le++)It(S.__webglFramebuffer[le],D,le);else{let le=D.texture.mipmaps;le&&le.length>0?It(S.__webglFramebuffer[0],D,0):It(S.__webglFramebuffer,D,0)}else if(ee){S.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[le]),S.__webglDepthbuffer[le]===void 0)S.__webglDepthbuffer[le]=n.createRenderbuffer(),at(S.__webglDepthbuffer[le],D,!1);else{let ve=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=S.__webglDepthbuffer[le];n.bindRenderbuffer(n.RENDERBUFFER,Le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,Le)}}else{let le=D.texture.mipmaps;if(le&&le.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),at(S.__webglDepthbuffer,D,!1);else{let ve=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,Le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(D,S,ee){let le=i.get(D);S!==void 0&&Pe(le.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),ee!==void 0&&lt(D)}function zt(D){let S=D.texture,ee=i.get(D),le=i.get(S);D.addEventListener("dispose",y);let ve=D.textures,Le=D.isWebGLCubeRenderTarget===!0,ke=ve.length>1;if(ke||(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=S.version,a.memory.textures++),Le){ee.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(S.mipmaps&&S.mipmaps.length>0){ee.__webglFramebuffer[ye]=[];for(let ge=0;ge<S.mipmaps.length;ge++)ee.__webglFramebuffer[ye][ge]=n.createFramebuffer()}else ee.__webglFramebuffer[ye]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){ee.__webglFramebuffer=[];for(let ye=0;ye<S.mipmaps.length;ye++)ee.__webglFramebuffer[ye]=n.createFramebuffer()}else ee.__webglFramebuffer=n.createFramebuffer();if(ke)for(let ye=0,ge=ve.length;ye<ge;ye++){let Ge=i.get(ve[ye]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=n.createTexture(),a.memory.textures++)}if(D.samples>0&&Wt(D)===!1){ee.__webglMultisampledFramebuffer=n.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let ye=0;ye<ve.length;ye++){let ge=ve[ye];ee.__webglColorRenderbuffer[ye]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,ee.__webglColorRenderbuffer[ye]);let Ge=s.convert(ge.format,ge.colorSpace),pt=s.convert(ge.type),Ee=_(ge.internalFormat,Ge,pt,ge.normalized,ge.colorSpace,D.isXRRenderTarget===!0),Ye=Lt(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye,Ee,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,ee.__webglColorRenderbuffer[ye])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(ee.__webglDepthRenderbuffer=n.createRenderbuffer(),at(ee.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Le){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),pe(n.TEXTURE_CUBE_MAP,S);for(let ye=0;ye<6;ye++)if(S.mipmaps&&S.mipmaps.length>0)for(let ge=0;ge<S.mipmaps.length;ge++)Pe(ee.__webglFramebuffer[ye][ge],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ge);else Pe(ee.__webglFramebuffer[ye],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);p(S)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ke){for(let ye=0,ge=ve.length;ye<ge;ye++){let Ge=ve[ye],pt=i.get(Ge),Ee=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ee=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ee,pt.__webglTexture),pe(Ee,Ge),Pe(ee.__webglFramebuffer,D,Ge,n.COLOR_ATTACHMENT0+ye,Ee,0),p(Ge)&&v(Ee)}t.unbindTexture()}else{let ye=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ye=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,le.__webglTexture),pe(ye,S),S.mipmaps&&S.mipmaps.length>0)for(let ge=0;ge<S.mipmaps.length;ge++)Pe(ee.__webglFramebuffer[ge],D,S,n.COLOR_ATTACHMENT0,ye,ge);else Pe(ee.__webglFramebuffer,D,S,n.COLOR_ATTACHMENT0,ye,0);p(S)&&v(ye),t.unbindTexture()}D.depthBuffer&&lt(D)}function We(D){let S=D.textures;for(let ee=0,le=S.length;ee<le;ee++){let ve=S[ee];if(p(ve)){let Le=b(D),ke=i.get(ve).__webglTexture;t.bindTexture(Le,ke),v(Le),t.unbindTexture()}}}let ft=[],Jt=[];function en(D){if(D.samples>0){if(Wt(D)===!1){let S=D.textures,ee=D.width,le=D.height,ve=n.COLOR_BUFFER_BIT,Le=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ke=i.get(D),ye=S.length>1;if(ye)for(let Ge=0;Ge<S.length;Ge++)t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ke.__webglMultisampledFramebuffer);let ge=D.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglFramebuffer);for(let Ge=0;Ge<S.length;Ge++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ve|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ve|=n.STENCIL_BUFFER_BIT)),ye){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ke.__webglColorRenderbuffer[Ge]);let pt=i.get(S[Ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pt,0)}n.blitFramebuffer(0,0,ee,le,0,0,ee,le,ve,n.NEAREST),c===!0&&(ft.length=0,Jt.length=0,ft.push(n.COLOR_ATTACHMENT0+Ge),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(ft.push(Le),Jt.push(Le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Jt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ye)for(let Ge=0;Ge<S.length;Ge++){t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.RENDERBUFFER,ke.__webglColorRenderbuffer[Ge]);let pt=i.get(S[Ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.TEXTURE_2D,pt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){let S=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Lt(D){return Math.min(r.maxSamples,D.samples)}function Wt(D){let S=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function W(D){let S=a.render.frame;u.get(D)!==S&&(u.set(D,S),D.update())}function $t(D,S){let ee=D.colorSpace,le=D.format,ve=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||ee!==Wo&&ee!==gs&&(mn.getTransfer(ee)===Pn?(le!==_r||ve!==er)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",ee)),S}function Nt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=L,this.getTextureUnits=M,this.setTextureUnits=N,this.setTexture2D=H,this.setTexture2DArray=B,this.setTexture3D=Z,this.setTextureCube=J,this.rebindTextures=qe,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=en,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function xM(n,e){function t(i,r=gs){let s,a=mn.getTransfer(r);if(i===er)return n.UNSIGNED_BYTE;if(i===uu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Rd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ad)return n.BYTE;if(i===Id)return n.SHORT;if(i===to)return n.UNSIGNED_SHORT;if(i===cu)return n.INT;if(i===Rr)return n.UNSIGNED_INT;if(i===yr)return n.FLOAT;if(i===Pr)return n.HALF_FLOAT;if(i===Pd)return n.ALPHA;if(i===Ld)return n.RGB;if(i===_r)return n.RGBA;if(i===Wr)return n.DEPTH_COMPONENT;if(i===Ws)return n.DEPTH_STENCIL;if(i===du)return n.RED;if(i===fu)return n.RED_INTEGER;if(i===Xs)return n.RG;if(i===pu)return n.RG_INTEGER;if(i===mu)return n.RGBA_INTEGER;if(i===_l||i===Ml||i===Sl||i===bl)if(a===Pn)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===_l)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ml)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===_l)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ml)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vu||i===gu||i===xu||i===yu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===vu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_u||i===Mu||i===Su||i===bu||i===wu||i===wl||i===Tu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_u||i===Mu)return a===Pn?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Su)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===bu)return s.COMPRESSED_R11_EAC;if(i===wu)return s.COMPRESSED_SIGNED_R11_EAC;if(i===wl)return s.COMPRESSED_RG11_EAC;if(i===Tu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Eu||i===Au||i===Iu||i===Cu||i===Ru||i===Pu||i===Lu||i===Nu||i===Du||i===Uu||i===Fu||i===Ou||i===Bu||i===zu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Eu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Au)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Iu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ru)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Du)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ou)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zu)return a===Pn?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ku||i===Vu||i===Gu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ku)return a===Pn?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hu||i===Wu||i===Tl||i===Xu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Hu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Wu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Tl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===no?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var yM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_M=`
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

}`,sf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new tl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new pr({vertexShader:yM,fragmentShader:_M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Dn(new cl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},af=class extends Xr{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,m=null,x=null,w=typeof XRWebGLBinding<"u",g=new sf,p={},v=t.getContextAttributes(),b=null,_=null,I=[],A=[],P=new wt,y=null,C=null,O=new Ui;O.viewport=new qn;let E=new Ui;E.viewport=new qn;let G=[O,E],L=new nu,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let te=I[ne];return te===void 0&&(te=new Xa,I[ne]=te),te.getTargetRaySpace()},this.getControllerGrip=function(ne){let te=I[ne];return te===void 0&&(te=new Xa,I[ne]=te),te.getGripSpace()},this.getHand=function(ne){let te=I[ne];return te===void 0&&(te=new Xa,I[ne]=te),te.getHandSpace()};function z(ne){let te=A.indexOf(ne.inputSource);if(te===-1)return;let Te=I[te];Te!==void 0&&(Te.update(ne.inputSource,ne.frame,l||a),Te.dispatchEvent({type:ne.type,data:ne.inputSource}))}function q(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",H);for(let ne=0;ne<I.length;ne++){let te=A[ne];te!==null&&(A[ne]=null,I[ne].disconnect(te))}M=null,N=null,g.reset();for(let ne in p)delete p[ne];if(e.setRenderTarget(b),m=null,h=null,d=null,r=null,_=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),C!==null){let ne=C.camera;ne.fov=C.fov,ne.zoom=C.zoom,ne.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){s=ne,i.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,i.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&w&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(ne){if(r=ne,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",q),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Fe=null,Pe=null;v.depth&&(Pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=v.stencil?Ws:Wr,Fe=v.stencil?no:Rr);let at={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(at),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Qi(h.textureWidth,h.textureHeight,{format:_r,type:er,depthTexture:new Fs(h.textureWidth,h.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let Te={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,Te),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new Qi(m.framebufferWidth,m.framebufferHeight,{format:_r,type:er,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(ne){for(let te=0;te<ne.removed.length;te++){let Te=ne.removed[te],Fe=A.indexOf(Te);Fe>=0&&(A[Fe]=null,I[Fe].disconnect(Te))}for(let te=0;te<ne.added.length;te++){let Te=ne.added[te],Fe=A.indexOf(Te);if(Fe===-1){for(let at=0;at<I.length;at++)if(at>=A.length){A.push(Te),Fe=at;break}else if(A[at]===null){A[at]=Te,Fe=at;break}if(Fe===-1)break}let Pe=I[Fe];Pe&&Pe.connect(Te)}}let B=new re,Z=new re;function J(ne,te,Te){B.setFromMatrixPosition(te.matrixWorld),Z.setFromMatrixPosition(Te.matrixWorld);let Fe=B.distanceTo(Z),Pe=te.projectionMatrix.elements,at=Te.projectionMatrix.elements,It=Pe[14]/(Pe[10]-1),lt=Pe[14]/(Pe[10]+1),qe=(Pe[9]+1)/Pe[5],zt=(Pe[9]-1)/Pe[5],We=(Pe[8]-1)/Pe[0],ft=(at[8]+1)/at[0],Jt=It*We,en=It*ft,Lt=Fe/(-We+ft),Wt=Lt*-We;if(te.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(Wt),ne.translateZ(Lt),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Pe[10]===-1)ne.projectionMatrix.copy(te.projectionMatrix),ne.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let W=It+Lt,$t=lt+Lt,Nt=Jt-Wt,D=en+(Fe-Wt),S=qe*lt/$t*W,ee=zt*lt/$t*W;ne.projectionMatrix.makePerspective(Nt,D,S,ee,W,$t),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function fe(ne,te){te===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(te.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(r===null)return;let te=ne.near,Te=ne.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(Te=g.depthFar)),L.near=E.near=O.near=te,L.far=E.far=O.far=Te,(M!==L.near||N!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),M=L.near,N=L.far),L.layers.mask=ne.layers.mask|6,O.layers.mask=L.layers.mask&-5,E.layers.mask=L.layers.mask&-3;let Fe=ne.parent,Pe=L.cameras;fe(L,Fe);for(let at=0;at<Pe.length;at++)fe(Pe[at],Fe);Pe.length===2?J(L,O,E):L.projectionMatrix.copy(O.projectionMatrix),C===null&&ne.isPerspectiveCamera&&(C={camera:ne,fov:ne.fov,zoom:ne.zoom}),Me(ne,L,Fe)};function Me(ne,te,Te){Te===null?ne.matrix.copy(te.matrixWorld):(ne.matrix.copy(Te.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(te.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(te.projectionMatrix),ne.projectionMatrixInverse.copy(te.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Rc*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(ne){c=ne,h!==null&&(h.fixedFoveation=ne),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ne)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(ne){return p[ne]};let oe=null;function pe(ne,te){if(u=te.getViewerPose(l||a),x=te,u!==null){let Te=u.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let Fe=!1;Te.length!==L.cameras.length&&(L.cameras.length=0,Fe=!0);for(let lt=0;lt<Te.length;lt++){let qe=Te[lt],zt=null;if(m!==null)zt=m.getViewport(qe);else{let ft=d.getViewSubImage(h,qe);zt=ft.viewport,lt===0&&(e.setRenderTargetTextures(_,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(_))}let We=G[lt];We===void 0&&(We=new Ui,We.layers.enable(lt),We.viewport=new qn,G[lt]=We),We.matrix.fromArray(qe.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(qe.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(zt.x,zt.y,zt.width,zt.height),lt===0&&(L.matrix.copy(We.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Fe===!0&&L.cameras.push(We)}let Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){d=i.getBinding();let lt=d.getDepthInformation(Te[0]);lt&&lt.isValid&&lt.texture&&g.init(lt,r.renderState)}if(Pe&&Pe.includes("camera-access")&&w){e.state.unbindTexture(),d=i.getBinding();for(let lt=0;lt<Te.length;lt++){let qe=Te[lt].camera;if(qe){let zt=p[qe];zt||(zt=new tl,p[qe]=zt);let We=d.getCameraImage(qe);zt.sourceTexture=We}}}}for(let Te=0;Te<I.length;Te++){let Fe=A[Te],Pe=I[Te];Fe!==null&&Pe!==void 0&&Pe.update(Fe,te,l||a)}oe&&oe(ne,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),x=null}let Ue=new Nm;Ue.setAnimationLoop(pe),this.setAnimationLoop=function(ne){oe=ne},this.dispose=function(){}}},MM=new Ln,zm=new Kt;zm.set(-1,0,0,0,1,0,0,0,1);function SM(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Fd(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,b,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&m(g,p,_)):p.isMeshMatcapMaterial?(s(g,p),x(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),w(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,v,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xi&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xi&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),b=v.envMap,_=v.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(MM.makeRotationFromEuler(_)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(zm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xi&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function w(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function bM(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,I){let A=I.program;i.uniformBlockBinding(_,A)}function l(_,I){let A=r[_.id];A===void 0&&(g(_),A=u(_),r[_.id]=A,_.addEventListener("dispose",v));let P=I.program;i.updateUBOMapping(_,P);let y=e.render.frame;s[_.id]!==y&&(h(_),s[_.id]=y)}function u(_){let I=d();_.__bindingPointIndex=I;let A=n.createBuffer(),P=_.__size,y=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,P,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,I,A),A}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let I=r[_.id],A=_.uniforms,P=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,I);for(let y=0,C=A.length;y<C;y++){let O=A[y];if(Array.isArray(O))for(let E=0,G=O.length;E<G;E++)m(O[E],y,E,P);else m(O,y,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(_,I,A,P){if(w(_,I,A,P)===!0){let y=_.__offset,C=_.value;if(Array.isArray(C)){let O=0;for(let E=0;E<C.length;E++){let G=C[E],L=p(G);x(G,_.__data,O),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(O+=L.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(C,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,_.__data)}}function x(_,I,A){typeof _=="number"||typeof _=="boolean"?I[0]=_:_.isMatrix3?(I[0]=_.elements[0],I[1]=_.elements[1],I[2]=_.elements[2],I[3]=0,I[4]=_.elements[3],I[5]=_.elements[4],I[6]=_.elements[5],I[7]=0,I[8]=_.elements[6],I[9]=_.elements[7],I[10]=_.elements[8],I[11]=0):ArrayBuffer.isView(_)?I.set(new _.constructor(_.buffer,_.byteOffset,I.length)):_.toArray(I,A)}function w(_,I,A,P){let y=_.value,C=I+"_"+A;if(P[C]===void 0)return typeof y=="number"||typeof y=="boolean"?P[C]=y:ArrayBuffer.isView(y)?P[C]=y.slice():P[C]=y.clone(),!0;{let O=P[C];if(typeof y=="number"||typeof y=="boolean"){if(O!==y)return P[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(O.equals(y)===!1)return O.copy(y),!0}}return!1}function g(_){let I=_.uniforms,A=0,P=16;for(let C=0,O=I.length;C<O;C++){let E=Array.isArray(I[C])?I[C]:[I[C]];for(let G=0,L=E.length;G<L;G++){let M=E[G],N=Array.isArray(M.value)?M.value:[M.value];for(let z=0,q=N.length;z<q;z++){let H=N[z],B=p(H),Z=A%P,J=Z%B.boundary,fe=Z+J;A+=J,fe!==0&&P-fe<B.storage&&(A+=P-fe),M.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=A,A+=B.storage}}}let y=A%P;return y>0&&(A+=P-y),_.__size=A,_.__cache={},this}function p(_){let I={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(I.boundary=4,I.storage=4):_.isVector2?(I.boundary=8,I.storage=8):_.isVector3||_.isColor?(I.boundary=16,I.storage=12):_.isVector4?(I.boundary=16,I.storage=16):_.isMatrix3?(I.boundary=48,I.storage=48):_.isMatrix4?(I.boundary=64,I.storage=64):_.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(I.boundary=16,I.storage=_.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",_),I}function v(_){let I=_.target;I.removeEventListener("dispose",v);let A=a.indexOf(I.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(r[I.id]),delete r[I.id],delete s[I.id]}function b(){for(let _ in r)n.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:c,update:l,dispose:b}}var wM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kr=null;function TM(){return Kr===null&&(Kr=new Qo(wM,16,16,Xs,Pr),Kr.name="DFG_LUT",Kr.minFilter=Ti,Kr.magFilter=Ti,Kr.wrapS=Hr,Kr.wrapT=Hr,Kr.generateMipmaps=!1,Kr.needsUpdate=!0),Kr}var ju=class{constructor(e={}){let{canvas:t=em(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:m=er}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let w=m,g=new Set([mu,pu,fu]),p=new Set([er,Rr,to,no,uu,hu]),v=new Uint32Array(4),b=new Int32Array(4),_=new re,I=null,A=null,P=[],y=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let O=this,E=!1,G=null,L=null,M=null,N=null;this._outputColorSpace=Wi;let z=0,q=0,H=null,B=-1,Z=null,J=new qn,fe=new qn,Me=null,oe=new rn(0),pe=0,Ue=t.width,ne=t.height,te=1,Te=null,Fe=null,Pe=new qn(0,0,Ue,ne),at=new qn(0,0,Ue,ne),It=!1,lt=new qa,qe=!1,zt=!1,We=new Ln,ft=new re,Jt=new qn,en={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Lt=!1;function Wt(){return H===null?te:1}let W=i;function $t(T,K){return t.getContext(T,K)}let Nt,D,S,ee,le,ve,Le,ke,ye,ge,Ge,pt,Ee,Ye,$e,gt,Et,Q,Ze,be,Ke,rt,Re;try{let T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",kt,!1),t.addEventListener("webglcontextcreationerror",_t,!1),W===null){let K="webgl2";if(W=$t(K,T),W===null)throw $t(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}et()}catch(T){throw t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",kt,!1),t.removeEventListener("webglcontextcreationerror",_t,!1),Xt("WebGLRenderer: "+T.message),T}function et(){Nt=new Ly(W),Nt.init(),Ke=new xM(W,Nt),D=new Sy(W,Nt,e,Ke),S=new vM(W,Nt),D.reversedDepthBuffer&&h&&S.buffers.depth.setReversed(!0),L=W.createFramebuffer(),M=W.createFramebuffer(),N=W.createFramebuffer(),ee=new Uy(W),le=new nM,ve=new gM(W,Nt,S,le,D,Ke,ee),Le=new Py(O),ke=new Ov(W),rt=new _y(W,ke),ye=new Ny(W,ke,ee,rt),ge=new Oy(W,ye,ke,rt,ee),Q=new Fy(W,D,ve),$e=new by(le),Ge=new tM(O,Le,Nt,D,rt,$e),pt=new SM(O,le),Ee=new rM,Ye=new uM(Nt),Et=new yy(O,Le,S,ge,x,c),gt=new mM(O,ge,D),Re=new bM(W,ee,D,S),Ze=new My(W,Nt,ee),be=new Dy(W,Nt,ee),ee.programs=Ge.programs,O.capabilities=D,O.extensions=Nt,O.properties=le,O.renderLists=Ee,O.shadowMap=gt,O.state=S,O.info=ee}w!==er&&(C=new zy(w,t.width,t.height,o,r,s));let Be=new af(O,W);this.xr=Be,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let T=Nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(T){T!==void 0&&(te=T,this.setSize(Ue,ne,!1))},this.getSize=function(T){return T.set(Ue,ne)},this.setSize=function(T,K,me=!0){if(Be.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}Ue=T,ne=K,t.width=Math.floor(T*te),t.height=Math.floor(K*te),me===!0&&(t.style.width=T+"px",t.style.height=K+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,T,K)},this.getDrawingBufferSize=function(T){return T.set(Ue*te,ne*te).floor()},this.setDrawingBufferSize=function(T,K,me){Ue=T,ne=K,te=me,t.width=Math.floor(T*me),t.height=Math.floor(K*me),this.setViewport(0,0,T,K)},this.setEffects=function(T){if(w===er){Xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let K=0;K<T.length;K++)if(T[K].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(J)},this.getViewport=function(T){return T.copy(Pe)},this.setViewport=function(T,K,me,ue){T.isVector4?Pe.set(T.x,T.y,T.z,T.w):Pe.set(T,K,me,ue),S.viewport(J.copy(Pe).multiplyScalar(te).round())},this.getScissor=function(T){return T.copy(at)},this.setScissor=function(T,K,me,ue){T.isVector4?at.set(T.x,T.y,T.z,T.w):at.set(T,K,me,ue),S.scissor(fe.copy(at).multiplyScalar(te).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(T){S.setScissorTest(It=T)},this.setOpaqueSort=function(T){Te=T},this.setTransparentSort=function(T){Fe=T},this.getClearColor=function(T){return T.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor(...arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha(...arguments)},this.clear=function(T=!0,K=!0,me=!0){let ue=0;if(T){let ae=!1;if(H!==null){let Xe=H.texture.format;ae=g.has(Xe)}if(ae){let Xe=H.texture.type,Ae=p.has(Xe),it=Et.getClearColor(),st=Et.getClearAlpha(),bt=it.r,Yt=it.g,Ct=it.b;Ae?(v[0]=bt,v[1]=Yt,v[2]=Ct,v[3]=st,W.clearBufferuiv(W.COLOR,0,v)):(b[0]=bt,b[1]=Yt,b[2]=Ct,b[3]=st,W.clearBufferiv(W.COLOR,0,b))}else ue|=W.COLOR_BUFFER_BIT}K&&(ue|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),me&&(ue|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ue!==0&&W.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),G=T},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",kt,!1),t.removeEventListener("webglcontextcreationerror",_t,!1),Et.dispose(),Ee.dispose(),Ye.dispose(),le.dispose(),Le.dispose(),ge.dispose(),rt.dispose(),Re.dispose(),Ge.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",Si),Be.removeEventListener("sessionend",ri),St.stop()};function He(T){T.preventDefault(),Dd("WebGLRenderer: Context Lost."),E=!0}function kt(){Dd("WebGLRenderer: Context Restored."),E=!1;let T=ee.autoReset,K=gt.enabled,me=gt.autoUpdate,ue=gt.needsUpdate,ae=gt.type;et(),ee.autoReset=T,gt.enabled=K,gt.autoUpdate=me,gt.needsUpdate=ue,gt.type=ae}function _t(T){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ft(T){let K=T.target;K.removeEventListener("dispose",Ft),vn(K)}function vn(T){ut(T),le.remove(T)}function ut(T){let K=le.get(T).programs;K!==void 0&&(K.forEach(function(me){Ge.releaseProgram(me)}),T.isShaderMaterial&&Ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,K,me,ue,ae,Xe){K===null&&(K=en);let Ae=ae.isMesh&&ae.matrixWorld.determinantAffine()<0,it=vr(T,K,me,ue,ae);S.setMaterial(ue,Ae);let st=me.index,bt=1;if(ue.wireframe===!0){if(st=ye.getWireframeAttribute(me),st===void 0)return;bt=2}let Yt=me.drawRange,Ct=me.attributes.position,mt=Yt.start*bt,xn=(Yt.start+Yt.count)*bt;Xe!==null&&(mt=Math.max(mt,Xe.start*bt),xn=Math.min(xn,(Xe.start+Xe.count)*bt)),st!==null?(mt=Math.max(mt,0),xn=Math.min(xn,st.count)):Ct!=null&&(mt=Math.max(mt,0),xn=Math.min(xn,Ct.count));let Wn=xn-mt;if(Wn<0||Wn===1/0)return;rt.setup(ae,ue,it,me,st);let An,tn=Ze;if(st!==null&&(An=ke.get(st),tn=be,tn.setIndex(An)),ae.isMesh)ue.wireframe===!0?(S.setLineWidth(ue.wireframeLinewidth*Wt()),tn.setMode(W.LINES)):tn.setMode(W.TRIANGLES);else if(ae.isLine){let Jn=ue.linewidth;Jn===void 0&&(Jn=1),S.setLineWidth(Jn*Wt()),ae.isLineSegments?tn.setMode(W.LINES):ae.isLineLoop?tn.setMode(W.LINE_LOOP):tn.setMode(W.LINE_STRIP)}else ae.isPoints?tn.setMode(W.POINTS):ae.isSprite&&tn.setMode(W.TRIANGLES);if(ae.isBatchedMesh)if(Nt.get("WEBGL_multi_draw"))tn.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else{let Jn=ae._multiDrawStarts,ht=ae._multiDrawCounts,Un=ae._multiDrawCount,an=st?ke.get(st).bytesPerElement:1,bi=le.get(ue).currentProgram.getUniforms();for(let ki=0;ki<Un;ki++)bi.setValue(W,"_gl_DrawID",ki),tn.render(Jn[ki]/an,ht[ki])}else if(ae.isInstancedMesh)tn.renderInstances(mt,Wn,ae.count);else if(me.isInstancedBufferGeometry){let Jn=me._maxInstanceCount!==void 0?me._maxInstanceCount:1/0,ht=Math.min(me.instanceCount,Jn);tn.renderInstances(mt,Wn,ht)}else tn.render(mt,Wn)};function Sn(T,K,me,ue){G!==null&&T.isNodeMaterial&&G.setObject(ue,T),qe===!0&&$e.setState(T,me,!1),T.transparent===!0&&T.side===ji&&T.forceSinglePass===!1?(T.side=Xi,T.needsUpdate=!0,Dt(T,K,ue),T.side=Vs,T.needsUpdate=!0,Dt(T,K,ue),T.side=ji):Dt(T,K,ue)}this.compile=function(T,K,me=null){me===null&&(me=T),G!==null&&G.renderStart(T,K,me),A=Ye.get(me),A.init(K),y.push(A),me.traverseVisible(function(ae){ae.isLight&&ae.layers.test(K.layers)&&(A.pushLight(ae),ae.castShadow&&A.pushShadow(ae))}),T!==me&&T.traverseVisible(function(ae){ae.isLight&&ae.layers.test(K.layers)&&(A.pushLight(ae),ae.castShadow&&A.pushShadow(ae))}),A.setupLights(),G!==null&&G.updateLights(A.state.lightsArray),zt=this.localClippingEnabled,qe=$e.init(this.clippingPlanes,zt),qe===!0&&$e.setGlobalState(this.clippingPlanes,K),G!==null&&gt.render(A.state.shadowsArray,me,K);let ue=new Set;return T.traverse(function(ae){if(!(ae.isMesh||ae.isPoints||ae.isLine||ae.isSprite))return;let Xe=ae.material;if(Xe)if(Array.isArray(Xe))for(let Ae=0;Ae<Xe.length;Ae++){let it=Xe[Ae];Sn(it,me,K,ae),ue.add(it)}else Sn(Xe,me,K,ae),ue.add(Xe)}),A=y.pop(),G!==null&&G.renderEnd(),ue},this.compileAsync=function(T,K,me=null){let ue=this.compile(T,K,me);return new Promise(ae=>{function Xe(){if(ue.forEach(function(Ae){let st=le.get(Ae).currentProgram;(st===void 0||st.isReady())&&ue.delete(Ae)}),ue.size===0){ae(T);return}setTimeout(Xe,10)}Nt.get("KHR_parallel_shader_compile")!==null?Xe():setTimeout(Xe,10)})};let gn=null;function zi(T){gn&&gn(T)}function Si(){St.stop()}function ri(){St.start()}let St=new Nm;St.setAnimationLoop(zi),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(T){gn=T,Be.setAnimationLoop(T),T===null?St.stop():St.start()},Be.addEventListener("sessionstart",Si),Be.addEventListener("sessionend",ri),this.render=function(T,K){if(K!==void 0&&K.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;G!==null&&G.renderStart(T,K);let me=Be.enabled===!0&&Be.isPresenting===!0,ue=C!==null&&(H===null||me)&&C.begin(O,H);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(K),K=Be.getCamera()),T.isScene===!0&&T.onBeforeRender(O,T,K,H),A=Ye.get(T,y.length),A.init(K),A.state.textureUnits=ve.getTextureUnits(),y.push(A),We.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),lt.setFromProjectionMatrix(We,Ir,K.reversedDepth),zt=this.localClippingEnabled,qe=$e.init(this.clippingPlanes,zt),I=Ee.get(T,P.length),I.init(),P.push(I),Be.enabled===!0&&Be.isPresenting===!0){let Ae=O.xr.getDepthSensingMesh();Ae!==null&&Kn(Ae,K,-1/0,O.sortObjects)}Kn(T,K,0,O.sortObjects),I.finish(),G!==null&&G.updateLights(A.state.lightsArray),O.sortObjects===!0&&I.sort(Te,Fe),Lt=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,Lt&&Et.addToRenderList(I,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qe===!0&&$e.beginShadows();let ae=A.state.shadowsArray;if(gt.render(ae,T,K),qe===!0&&$e.endShadows(),(ue&&C.hasRenderPass())===!1){let Ae=I.opaque,it=I.transmissive;if(A.setupLights(),K.isArrayCamera){let st=K.cameras;if(it.length>0)for(let bt=0,Yt=st.length;bt<Yt;bt++){let Ct=st[bt];si(Ae,it,T,Ct)}Lt&&Et.render(T);for(let bt=0,Yt=st.length;bt<Yt;bt++){let Ct=st[bt];Hn(I,T,Ct,Ct.viewport)}}else it.length>0&&si(Ae,it,T,K),Lt&&Et.render(T),Hn(I,T,K)}H!==null&&q===0&&(ve.updateMultisampleRenderTarget(H),ve.updateRenderTargetMipmap(H)),ue&&C.end(O),T.isScene===!0&&T.onAfterRender(O,T,K),rt.resetDefaultState(),B=-1,Z=null,y.pop(),y.length>0?(A=y[y.length-1],ve.setTextureUnits(A.state.textureUnits),qe===!0&&$e.setGlobalState(O.clippingPlanes,A.state.camera)):A=null,P.pop(),P.length>0?I=P[P.length-1]:I=null,G!==null&&G.renderEnd()};function Kn(T,K,me,ue){if(T.visible===!1)return;if(T.layers.test(K.layers)){if(T.isGroup)me=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(K);else if(T.isLightProbeGrid)A.pushLightProbeGrid(T);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(lt)){ue&&Jt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(We);let Ae=ge.update(T),it=T.material;it.visible&&I.push(T,Ae,it,me,Jt.z,null,K)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(lt))){let Ae=ge.update(T),it=T.material;if(ue&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Jt.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Jt.copy(Ae.boundingSphere.center)),Jt.applyMatrix4(T.matrixWorld).applyMatrix4(We)),Array.isArray(it)){let st=Ae.groups;for(let bt=0,Yt=st.length;bt<Yt;bt++){let Ct=st[bt],mt=it[Ct.materialIndex];mt&&mt.visible&&I.push(T,Ae,mt,me,Jt.z,Ct,K)}}else it.visible&&I.push(T,Ae,it,me,Jt.z,null,K)}}let Xe=T.children;for(let Ae=0,it=Xe.length;Ae<it;Ae++)Kn(Xe[Ae],K,me,ue)}function Hn(T,K,me,ue){let{opaque:ae,transmissive:Xe,transparent:Ae}=T;A.setupLightsView(me),qe===!0&&$e.setGlobalState(O.clippingPlanes,me),ue&&S.viewport(J.copy(ue)),ae.length>0&&bn(ae,K,me),Xe.length>0&&bn(Xe,K,me),Ae.length>0&&bn(Ae,K,me),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function si(T,K,me,ue){if((me.isScene===!0?me.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[ue.id]===void 0){let mt=Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[ue.id]=new Qi(1,1,{generateMipmaps:!0,type:mt?Pr:er,minFilter:Hs,samples:Math.max(4,D.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:mn.workingColorSpace})}let Xe=A.state.transmissionRenderTarget[ue.id],Ae=ue.viewport||J;Xe.setSize(Ae.z*O.transmissionResolutionScale,Ae.w*O.transmissionResolutionScale);let it=O.getRenderTarget(),st=O.getActiveCubeFace(),bt=O.getActiveMipmapLevel();O.setRenderTarget(Xe),O.getClearColor(oe),pe=O.getClearAlpha(),pe<1&&O.setClearColor(16777215,.5),O.clear(),Lt&&Et.render(me);let Yt=O.toneMapping;O.toneMapping=Cr;let Ct=ue.viewport;if(ue.viewport!==void 0&&(ue.viewport=void 0),A.setupLightsView(ue),qe===!0&&$e.setGlobalState(O.clippingPlanes,ue),bn(T,me,ue),ve.updateMultisampleRenderTarget(Xe),ve.updateRenderTargetMipmap(Xe),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let mt=!1;for(let xn=0,Wn=K.length;xn<Wn;xn++){let An=K[xn],{object:tn,geometry:Jn,material:ht,group:Un}=An;if(ht.side===ji&&tn.layers.test(ue.layers)){let an=ht.side;ht.side=Xi,ht.needsUpdate=!0,Qt(tn,me,ue,Jn,ht,Un),ht.side=an,ht.needsUpdate=!0,mt=!0}}mt===!0&&(ve.updateMultisampleRenderTarget(Xe),ve.updateRenderTargetMipmap(Xe))}O.setRenderTarget(it,st,bt),O.setClearColor(oe,pe),Ct!==void 0&&(ue.viewport=Ct),O.toneMapping=Yt}function bn(T,K,me){let ue=K.isScene===!0?K.overrideMaterial:null;for(let ae=0,Xe=T.length;ae<Xe;ae++){let Ae=T[ae],{object:it,geometry:st,group:bt}=Ae,Yt=Ae.material;Yt.allowOverride===!0&&ue!==null&&(Yt=ue),it.layers.test(me.layers)&&Qt(it,K,me,st,Yt,bt)}}function Qt(T,K,me,ue,ae,Xe){G!==null&&ae.isNodeMaterial&&G.setObject(T,ae),T.onBeforeRender(O,K,me,ue,ae,Xe),T.modelViewMatrix.multiplyMatrices(me.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ae.onBeforeRender(O,K,me,ue,T,Xe),ae.transparent===!0&&ae.side===ji&&ae.forceSinglePass===!1?(ae.side=Xi,ae.needsUpdate=!0,O.renderBufferDirect(me,K,ue,ae,T,Xe),ae.side=Vs,ae.needsUpdate=!0,O.renderBufferDirect(me,K,ue,ae,T,Xe),ae.side=ji):O.renderBufferDirect(me,K,ue,ae,T,Xe),T.onAfterRender(O,K,me,ue,ae,Xe)}function Dt(T,K,me){K.isScene!==!0&&(K=en);let ue=le.get(T),ae=A.state.lights,Xe=A.state.shadowsArray,Ae=ae.state.version,it=Ge.getParameters(T,ae.state,Xe,K,me,A.state.lightProbeGridArray),st=Ge.getProgramCacheKey(it),bt=ue.programs;ue.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?K.environment:null,ue.fog=K.fog;let Yt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ue.envMap=Le.get(T.envMap||ue.environment,Yt),ue.envMapRotation=ue.environment!==null&&T.envMap===null?K.environmentRotation:T.envMapRotation,bt===void 0&&(T.addEventListener("dispose",Ft),bt=new Map,ue.programs=bt);let Ct=bt.get(st);if(Ct!==void 0){if(ue.currentProgram===Ct&&ue.lightsStateVersion===Ae)return ln(T,it),Ct}else it.uniforms=Ge.getUniforms(T),G!==null&&T.isNodeMaterial&&G.build(T,me,it),T.onBeforeCompile(it,O),Ct=Ge.acquireProgram(it,st),bt.set(st,Ct),ue.uniforms=it.uniforms;let mt=ue.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(mt.clippingPlanes=$e.uniform),ln(T,it),ue.needsLights=ts(T),ue.lightsStateVersion=Ae,ue.needsLights&&(mt.ambientLightColor.value=ae.state.ambient,mt.lightProbe.value=ae.state.probe,mt.sunLights.value=ae.state.sun,mt.sunLightShadows.value=ae.state.sunShadow,mt.directionalLights.value=ae.state.directional,mt.directionalLightShadows.value=ae.state.directionalShadow,mt.spotLights.value=ae.state.spot,mt.spotLightShadows.value=ae.state.spotShadow,mt.rectAreaLights.value=ae.state.rectArea,mt.ltc_1.value=ae.state.rectAreaLTC1,mt.ltc_2.value=ae.state.rectAreaLTC2,mt.pointLights.value=ae.state.point,mt.pointLightShadows.value=ae.state.pointShadow,mt.hemisphereLights.value=ae.state.hemi,mt.sunShadowMatrix.value=ae.state.sunShadowMatrix,mt.sunShadowCascade.value=ae.state.sunShadowCascade,mt.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,mt.spotLightMatrix.value=ae.state.spotLightMatrix,mt.spotLightMap.value=ae.state.spotLightMap,mt.pointShadowMatrix.value=ae.state.pointShadowMatrix),ue.lightProbeGrid=A.state.lightProbeGridArray.length>0,ue.currentProgram=Ct,ue.uniformsList=null,Ct}function wn(T){if(T.uniformsList===null){let K=T.currentProgram.getUniforms();T.uniformsList=ao.seqWithValue(K.seq,T.uniforms)}return T.uniformsList}function ln(T,K){let me=le.get(T);me.outputColorSpace=K.outputColorSpace,me.batching=K.batching,me.batchingColor=K.batchingColor,me.instancing=K.instancing,me.instancingColor=K.instancingColor,me.instancingMorph=K.instancingMorph,me.skinning=K.skinning,me.morphTargets=K.morphTargets,me.morphNormals=K.morphNormals,me.morphColors=K.morphColors,me.morphTargetsCount=K.morphTargetsCount,me.numClippingPlanes=K.numClippingPlanes,me.numIntersection=K.numClipIntersection,me.vertexAlphas=K.vertexAlphas,me.vertexTangents=K.vertexTangents,me.toneMapping=K.toneMapping}function es(T,K){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(K.matrixWorld);for(let me=0,ue=T.length;me<ue;me++){let ae=T[me];if(ae.texture!==null&&ae.boundingBox.containsPoint(_))return ae}return null}function vr(T,K,me,ue,ae){K.isScene!==!0&&(K=en),ve.resetTextureUnits();let Xe=K.fog,Ae=ue.isMeshStandardMaterial||ue.isMeshLambertMaterial||ue.isMeshPhongMaterial?K.environment:null,it=H===null?O.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:mn.workingColorSpace,st=ue.isMeshStandardMaterial||ue.isMeshLambertMaterial&&!ue.envMap||ue.isMeshPhongMaterial&&!ue.envMap,bt=Le.get(ue.envMap||Ae,st),Yt=ue.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,Ct=!!me.attributes.tangent&&(!!ue.normalMap||ue.anisotropy>0),mt=!!me.morphAttributes.position,xn=!!me.morphAttributes.normal,Wn=!!me.morphAttributes.color,An=Cr;ue.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(An=O.toneMapping);let tn=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,Jn=tn!==void 0?tn.length:0,ht=le.get(ue),Un=A.state.lights;if(qe===!0&&(zt===!0||T!==Z)){let fn=T===Z&&ue.id===B;$e.setState(ue,T,fn)}let an=!1;ue.version===ht.__version?(ht.needsLights&&ht.lightsStateVersion!==Un.state.version||ht.outputColorSpace!==it||ae.isBatchedMesh&&ht.batching===!1||!ae.isBatchedMesh&&ht.batching===!0||ae.isBatchedMesh&&ht.batchingColor===!0&&ae._colorsTexture===null||ae.isBatchedMesh&&ht.batchingColor===!1&&ae._colorsTexture!==null||ae.isInstancedMesh&&ht.instancing===!1||!ae.isInstancedMesh&&ht.instancing===!0||ae.isSkinnedMesh&&ht.skinning===!1||!ae.isSkinnedMesh&&ht.skinning===!0||ae.isInstancedMesh&&ht.instancingColor===!0&&ae.instanceColor===null||ae.isInstancedMesh&&ht.instancingColor===!1&&ae.instanceColor!==null||ae.isInstancedMesh&&ht.instancingMorph===!0&&ae.morphTexture===null||ae.isInstancedMesh&&ht.instancingMorph===!1&&ae.morphTexture!==null||ht.envMap!==bt||ue.fog===!0&&ht.fog!==Xe||ht.numClippingPlanes!==void 0&&(ht.numClippingPlanes!==$e.numPlanes||ht.numIntersection!==$e.numIntersection)||ht.vertexAlphas!==Yt||ht.vertexTangents!==Ct||ht.morphTargets!==mt||ht.morphNormals!==xn||ht.morphColors!==Wn||ht.toneMapping!==An||ht.morphTargetsCount!==Jn||!!ht.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(an=!0):(an=!0,ht.__version=ue.version);let bi=ht.currentProgram;an===!0&&(bi=Dt(ue,K,ae),G&&ue.isNodeMaterial&&G.onUpdateProgram(ue,bi,ht));let ki=!1,pi=!1,mi=!1,yn=bi.getUniforms(),On=ht.uniforms;if(S.useProgram(bi.program)&&(ki=!0,pi=!0,mi=!0),ue.id!==B&&(B=ue.id,pi=!0),ht.needsLights){let fn=es(A.state.lightProbeGridArray,ae);ht.lightProbeGrid!==fn&&(ht.lightProbeGrid=fn,pi=!0)}if(ki||Z!==T){S.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),yn.setValue(W,"projectionMatrix",T.projectionMatrix),yn.setValue(W,"viewMatrix",T.matrixWorldInverse);let vi=yn.map.cameraPosition;vi!==void 0&&vi.setValue(W,ft.setFromMatrixPosition(T.matrixWorld)),D.logarithmicDepthBuffer&&yn.setValue(W,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ue.isMeshPhongMaterial||ue.isMeshToonMaterial||ue.isMeshLambertMaterial||ue.isMeshBasicMaterial||ue.isMeshStandardMaterial||ue.isShaderMaterial)&&yn.setValue(W,"isOrthographic",T.isOrthographicCamera===!0),Z!==T&&(Z=T,pi=!0,mi=!0)}if(ht.needsLights&&(Un.state.sunShadowMap.length>0&&yn.setValue(W,"sunShadowMap",Un.state.sunShadowMap,ve),Un.state.directionalShadowMap.length>0&&yn.setValue(W,"directionalShadowMap",Un.state.directionalShadowMap,ve),Un.state.spotShadowMap.length>0&&yn.setValue(W,"spotShadowMap",Un.state.spotShadowMap,ve),Un.state.pointShadowMap.length>0&&yn.setValue(W,"pointShadowMap",Un.state.pointShadowMap,ve)),ae.isSkinnedMesh){yn.setOptional(W,ae,"bindMatrix"),yn.setOptional(W,ae,"bindMatrixInverse");let fn=ae.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),yn.setValue(W,"boneTexture",fn.boneTexture,ve))}ae.isBatchedMesh&&(yn.setOptional(W,ae,"batchingTexture"),yn.setValue(W,"batchingTexture",ae._matricesTexture,ve),yn.setOptional(W,ae,"batchingIdTexture"),yn.setValue(W,"batchingIdTexture",ae._indirectTexture,ve),yn.setOptional(W,ae,"batchingColorTexture"),ae._colorsTexture!==null&&yn.setValue(W,"batchingColorTexture",ae._colorsTexture,ve));let Ii=me.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&Q.update(ae,me,bi),(pi||ht.receiveShadow!==ae.receiveShadow)&&(ht.receiveShadow=ae.receiveShadow,yn.setValue(W,"receiveShadow",ae.receiveShadow)),(ue.isMeshStandardMaterial||ue.isMeshLambertMaterial||ue.isMeshPhongMaterial)&&ue.envMap===null&&K.environment!==null&&(On.envMapIntensity.value=K.environmentIntensity),On.dfgLUT!==void 0&&(On.dfgLUT.value=TM()),pi){if(yn.setValue(W,"toneMappingExposure",O.toneMappingExposure),ht.needsLights&&tr(On,mi),Xe&&ue.fog===!0&&pt.refreshFogUniforms(On,Xe),pt.refreshMaterialUniforms(On,ue,te,ne,A.state.transmissionRenderTarget[T.id]),ht.needsLights&&ht.lightProbeGrid){let fn=ht.lightProbeGrid;On.probesSH.value=fn.texture,On.probesMin.value.copy(fn.boundingBox.min),On.probesMax.value.copy(fn.boundingBox.max),On.probesResolution.value.copy(fn.resolution)}ao.upload(W,wn(ht),On,ve)}if(ue.isShaderMaterial&&ue.uniformsNeedUpdate===!0&&(ao.upload(W,wn(ht),On,ve),ue.uniformsNeedUpdate=!1),ue.isSpriteMaterial&&yn.setValue(W,"center",ae.center),yn.setValue(W,"modelViewMatrix",ae.modelViewMatrix),yn.setValue(W,"normalMatrix",ae.normalMatrix),yn.setValue(W,"modelMatrix",ae.matrixWorld),ue.uniformsGroups!==void 0){let fn=ue.uniformsGroups;for(let vi=0,qi=fn.length;vi<qi;vi++){let ys=fn[vi];Re.update(ys,bi),Re.bind(ys,bi)}}return bi}function tr(T,K){T.ambientLightColor.needsUpdate=K,T.lightProbe.needsUpdate=K,T.sunLights.needsUpdate=K,T.sunLightShadows.needsUpdate=K,T.directionalLights.needsUpdate=K,T.directionalLightShadows.needsUpdate=K,T.pointLights.needsUpdate=K,T.pointLightShadows.needsUpdate=K,T.spotLights.needsUpdate=K,T.spotLightShadows.needsUpdate=K,T.rectAreaLights.needsUpdate=K,T.hemisphereLights.needsUpdate=K}function ts(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(T,K,me){let ue=le.get(T);ue.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ue.__autoAllocateDepthBuffer===!1&&(ue.__useRenderToTexture=!1),le.get(T.texture).__webglTexture=K,le.get(T.depthTexture).__webglTexture=ue.__autoAllocateDepthBuffer?void 0:me,ue.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,K){let me=le.get(T);me.__webglFramebuffer=K,me.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(T,K=0,me=0){H=T,z=K,q=me;let ue=null,ae=!1,Xe=!1;if(T){let it=le.get(T);if(it.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(W.FRAMEBUFFER,it.__webglFramebuffer),J.copy(T.viewport),fe.copy(T.scissor),Me=T.scissorTest,S.viewport(J),S.scissor(fe),S.setScissorTest(Me),B=-1;return}else if(it.__webglFramebuffer===void 0)ve.setupRenderTarget(T);else if(it.__hasExternalTextures)ve.rebindTextures(T,le.get(T.texture).__webglTexture,le.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Yt=T.depthTexture;if(it.__boundDepthTexture!==Yt){if(Yt!==null&&le.has(Yt)&&(T.width!==Yt.image.width||T.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(T)}}let st=T.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Xe=!0);let bt=le.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(bt[K])?ue=bt[K][me]:ue=bt[K],ae=!0):T.samples>0&&ve.useMultisampledRTT(T)===!1?ue=le.get(T).__webglMultisampledFramebuffer:Array.isArray(bt)?ue=bt[me]:ue=bt,J.copy(T.viewport),fe.copy(T.scissor),Me=T.scissorTest}else J.copy(Pe).multiplyScalar(te).floor(),fe.copy(at).multiplyScalar(te).floor(),Me=It;if(me!==0&&(ue=L),S.bindFramebuffer(W.FRAMEBUFFER,ue)&&S.drawBuffers(T,ue),S.viewport(J),S.scissor(fe),S.setScissorTest(Me),ae){let it=le.get(T.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+K,it.__webglTexture,me)}else if(Xe){let it=K;for(let st=0;st<T.textures.length;st++){let bt=le.get(T.textures[st]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+st,bt.__webglTexture,me,it)}}else if(T!==null&&me!==0){let it=le.get(T.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,it.__webglTexture,me)}B=-1};function Lr(T){let K=le.get(T);return(K.__readFormat!==T.format||K.__readType!==T.type)&&(K.__readFormat=T.format,K.__readType=T.type,K.__formatReadable=D.textureFormatReadable(T.format),K.__typeReadable=D.textureTypeReadable(T.type)),K}this.readRenderTargetPixels=function(T,K,me,ue,ae,Xe,Ae,it=0){if(!(T&&T.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let st=le.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(st=st[Ae]),st){S.bindFramebuffer(W.FRAMEBUFFER,st);try{let bt=T.textures[it],Yt=bt.format,Ct=bt.type;T.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+it);let mt=Lr(bt);if(mt.__formatReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(mt.__typeReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=T.width-ue&&me>=0&&me<=T.height-ae&&W.readPixels(K,me,ue,ae,Ke.convert(Yt),Ke.convert(Ct),Xe)}finally{let bt=H!==null?le.get(H).__webglFramebuffer:null;S.bindFramebuffer(W.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(T,K,me,ue,ae,Xe,Ae,it=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let st=le.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(st=st[Ae]),st)if(K>=0&&K<=T.width-ue&&me>=0&&me<=T.height-ae){S.bindFramebuffer(W.FRAMEBUFFER,st);let bt=T.textures[it],Yt=bt.format,Ct=bt.type;T.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+it);let mt=Lr(bt);if(mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xn=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,xn),W.bufferData(W.PIXEL_PACK_BUFFER,Xe.byteLength,W.STREAM_READ),W.readPixels(K,me,ue,ae,Ke.convert(Yt),Ke.convert(Ct),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let Wn=H!==null?le.get(H).__webglFramebuffer:null;S.bindFramebuffer(W.FRAMEBUFFER,Wn);let An=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await nm(W,An,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,xn),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Xe),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(xn),W.deleteSync(An),Xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,K=null,me=0){let ue=Math.pow(2,-me),ae=Math.floor(T.image.width*ue),Xe=Math.floor(T.image.height*ue),Ae=K!==null?K.x:0,it=K!==null?K.y:0;ve.setTexture2D(T,0),W.copyTexSubImage2D(W.TEXTURE_2D,me,0,0,Ae,it,ae,Xe),S.unbindTexture()},this.copyTextureToTexture=function(T,K,me=null,ue=null,ae=0,Xe=0){let Ae,it,st,bt,Yt,Ct,mt,xn,Wn,An=T.isCompressedTexture?T.mipmaps[Xe]:T.image;if(me!==null)Ae=me.max.x-me.min.x,it=me.max.y-me.min.y,st=me.isBox3?me.max.z-me.min.z:1,bt=me.min.x,Yt=me.min.y,Ct=me.isBox3?me.min.z:0;else{let On=Math.pow(2,-ae);Ae=Math.floor(An.width*On),it=Math.floor(An.height*On),T.isDataArrayTexture?st=An.depth:T.isData3DTexture?st=Math.floor(An.depth*On):st=1,bt=0,Yt=0,Ct=0}ue!==null?(mt=ue.x,xn=ue.y,Wn=ue.z):(mt=0,xn=0,Wn=0);let tn=Ke.convert(K.format),Jn=Ke.convert(K.type),ht;K.isData3DTexture?(ve.setTexture3D(K,0),ht=W.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(ve.setTexture2DArray(K,0),ht=W.TEXTURE_2D_ARRAY):(ve.setTexture2D(K,0),ht=W.TEXTURE_2D),S.activeTexture(W.TEXTURE0),S.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,K.flipY),S.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),S.pixelStorei(W.UNPACK_ALIGNMENT,K.unpackAlignment);let Un=S.getParameter(W.UNPACK_ROW_LENGTH),an=S.getParameter(W.UNPACK_IMAGE_HEIGHT),bi=S.getParameter(W.UNPACK_SKIP_PIXELS),ki=S.getParameter(W.UNPACK_SKIP_ROWS),pi=S.getParameter(W.UNPACK_SKIP_IMAGES);S.pixelStorei(W.UNPACK_ROW_LENGTH,An.width),S.pixelStorei(W.UNPACK_IMAGE_HEIGHT,An.height),S.pixelStorei(W.UNPACK_SKIP_PIXELS,bt),S.pixelStorei(W.UNPACK_SKIP_ROWS,Yt),S.pixelStorei(W.UNPACK_SKIP_IMAGES,Ct);let mi=T.isDataArrayTexture||T.isData3DTexture,yn=K.isDataArrayTexture||K.isData3DTexture;if(T.isDepthTexture){let On=le.get(T),Ii=le.get(K),fn=le.get(On.__renderTarget),vi=le.get(Ii.__renderTarget);S.bindFramebuffer(W.READ_FRAMEBUFFER,fn.__webglFramebuffer),S.bindFramebuffer(W.DRAW_FRAMEBUFFER,vi.__webglFramebuffer);for(let qi=0;qi<st;qi++)mi&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,le.get(T).__webglTexture,ae,Ct+qi),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,le.get(K).__webglTexture,Xe,Wn+qi)),W.blitFramebuffer(bt,Yt,Ae,it,mt,xn,Ae,it,W.DEPTH_BUFFER_BIT,W.NEAREST);S.bindFramebuffer(W.READ_FRAMEBUFFER,null),S.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(ae!==0||T.isRenderTargetTexture||le.has(T)){let On=le.get(T),Ii=le.get(K);S.bindFramebuffer(W.READ_FRAMEBUFFER,M),S.bindFramebuffer(W.DRAW_FRAMEBUFFER,N);for(let fn=0;fn<st;fn++)mi?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,On.__webglTexture,ae,Ct+fn):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,On.__webglTexture,ae),yn?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ii.__webglTexture,Xe,Wn+fn):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ii.__webglTexture,Xe),ae!==0?W.blitFramebuffer(bt,Yt,Ae,it,mt,xn,Ae,it,W.COLOR_BUFFER_BIT,W.NEAREST):yn?W.copyTexSubImage3D(ht,Xe,mt,xn,Wn+fn,bt,Yt,Ae,it):W.copyTexSubImage2D(ht,Xe,mt,xn,bt,Yt,Ae,it);S.bindFramebuffer(W.READ_FRAMEBUFFER,null),S.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else yn?T.isDataTexture||T.isData3DTexture?W.texSubImage3D(ht,Xe,mt,xn,Wn,Ae,it,st,tn,Jn,An.data):K.isCompressedArrayTexture?W.compressedTexSubImage3D(ht,Xe,mt,xn,Wn,Ae,it,st,tn,An.data):W.texSubImage3D(ht,Xe,mt,xn,Wn,Ae,it,st,tn,Jn,An):T.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Xe,mt,xn,Ae,it,tn,Jn,An.data):T.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Xe,mt,xn,An.width,An.height,tn,An.data):W.texSubImage2D(W.TEXTURE_2D,Xe,mt,xn,Ae,it,tn,Jn,An);S.pixelStorei(W.UNPACK_ROW_LENGTH,Un),S.pixelStorei(W.UNPACK_IMAGE_HEIGHT,an),S.pixelStorei(W.UNPACK_SKIP_PIXELS,bi),S.pixelStorei(W.UNPACK_SKIP_ROWS,ki),S.pixelStorei(W.UNPACK_SKIP_IMAGES,pi),Xe===0&&K.generateMipmaps&&W.generateMipmap(ht),S.unbindTexture()},this.initRenderTarget=function(T){le.get(T).__webglFramebuffer===void 0&&ve.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ve.setTextureCube(T,0):T.isData3DTexture?ve.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ve.setTexture2DArray(T,0):ve.setTexture2D(T,0),S.unbindTexture()},this.resetState=function(){z=0,q=0,H=null,S.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ir}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=mn._getDrawingBufferColorSpace(e),t.unpackColorSpace=mn._getUnpackColorSpace()}};var Yn=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Vm=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s};function EM(n){for(var e=atob(n),t=new Uint8Array(e.length),i=0;i<e.length;i++)t[i]=e.charCodeAt(i);for(var r=new DataView(t.buffer,t.byteOffset,t.byteLength),s=r.getUint32(8,!0),a=r.getUint32(12,!0),o=new Float32Array(s*3),c=new Float32Array(s*3),l=new Float32Array(s*2),u=16,i=0;i<s;i++)o[i*3]=r.getFloat32(u,!0),o[i*3+1]=r.getFloat32(u+4,!0),o[i*3+2]=r.getFloat32(u+8,!0),c[i*3]=r.getFloat32(u+12,!0),c[i*3+1]=r.getFloat32(u+16,!0),c[i*3+2]=r.getFloat32(u+20,!0),l[i*2]=r.getFloat32(u+24,!0),l[i*2+1]=r.getFloat32(u+28,!0),u+=32;for(var d=new Uint16Array(a),i=0;i<a;i++)d[i]=r.getUint16(u+i*2,!0);var h=new Ei;return h.setAttribute("position",new En(o,3)),h.setAttribute("normal",new En(c,3)),h.setAttribute("uv",new En(l,2)),h.setIndex(Array.from(d)),h}function km(n,e,t){return!n||t>=1?0:t<=-1?1.1:(1-t)*.55}function AM(n,e,t){var i,r,s,a,o,c,l,u,d,h,m,x,w,g,p,v,b,_=new Ki,I=!!n.fairwayRamp,A=(w=n.cupX)!==null&&w!==void 0?w:0,P=(g=n.cupZ)!==null&&g!==void 0?g:-4.8,y=(p=n.cupRadius)!==null&&p!==void 0?p:.23,C=new dr(1,1,1),O=new Map,E=function(ge,Ge,pt,Ee,Ye,$e,gt){var Et=O.get(gt);Et||(Et=new Ai({color:gt}),O.set(gt,Et));var Q=new Dn(C,Et);Q.position.set(ge,Ge,pt),Q.scale.set(Ee,Ye,$e),_.add(Q)};try{for(var G=Yn([-3.2,3.2]),L=G.next();!L.done;L=G.next()){var M=L.value;E(M,-.65,0,.2,1.1,14.6,"#a1b8b1"),E(M-Math.sign(M)*.1,-.18,0,.2,.25,14.4,"#e9cea5")}}catch(ge){i={error:ge}}finally{try{L&&!L.done&&(r=G.return)&&r.call(G)}finally{if(i)throw i.error}}try{for(var N=Yn([-7.2,7.2]),z=N.next();!z.done;z=N.next()){var q=z.value;E(0,-.65,q,6.4,1.1,.2,"#a1b8b1"),E(0,-.18,q-Math.sign(q)*.1,6.2,.25,.2,"#e9cea5")}}catch(ge){s={error:ge}}finally{try{z&&!z.done&&(a=N.return)&&a.call(N)}finally{if(s)throw s.error}}var H=.5,B=.5;if(t){var Z=t.getAttribute("uv"),J=t.getAttribute("normal");if(Z&&J){for(var fe=0;fe<J.count&&J.getY(fe)<.9;)fe++;fe<Z.count&&(H=Z.getX(fe),B=Z.getY(fe))}}var Me=!!(e&&(!((v=e.image)===null||v===void 0)&&v.complete)&&((b=e.image)===null||b===void 0?void 0:b.naturalWidth)>0),oe=Me?new Ai({map:e}):new Ai({color:"#6ec458"}),pe=Me?new Ai({map:e,color:"#779263"}):new Ai({color:"#5a9949"});e&&!Me&&(oe.userData.pendingTex={tex:e,color:"#ffffff"},pe.userData.pendingTex={tex:e,color:"#779263"});var Ue=I?[[-7,-1],[-1,1],[1,7]]:[[-7,7]];try{for(var ne=Yn(Ue),te=ne.next();!te.done;te=ne.next()){var Te=Vm(te.value,2),Fe=Te[0],Pe=Te[1],at=new Ja;if(at.moveTo(-3,Fe),at.lineTo(3,Fe),at.lineTo(3,Pe),at.lineTo(-3,Pe),at.closePath(),P>Fe&&P<Pe){var It=new ua;It.absarc(A,P,y,0,Math.PI*2,!0),at.holes.push(It)}for(var lt=new ul(at,32),qe=lt.getAttribute("position"),zt=!1,We=!1,ft=0;ft<qe.count;ft++){var Jt=qe.getX(ft),en=qe.getY(ft),Lt=km(I,Jt,en);Lt===0&&(zt=!0),Lt>0&&(We=!0),qe.setXYZ(ft,Jt,Lt,en)}var Wt=lt.getIndex();if(Wt)for(var ft=0;ft<Wt.count;ft+=3){var W=Wt.getX(ft+1);Wt.setX(ft+1,Wt.getX(ft+2)),Wt.setX(ft+2,W)}lt.computeVertexNormals();for(var $t=lt.getAttribute("uv"),ft=0;ft<$t.count;ft++)$t.setXY(ft,H,B);var Nt=new Dn(lt,I&&zt&&We?pe:oe);Nt.name="continuous-fairway",_.add(Nt)}}catch(ge){o={error:ge}}finally{try{te&&!te.done&&(c=ne.return)&&c.call(ne)}finally{if(o)throw o.error}}var D="#d69260",S="#f1bd87";try{for(var ee=Yn([-3.1,3.1]),le=ee.next();!le.done;le=ee.next()){var M=le.value;E(M,.12,0,.2,.3,14.2,D),E(M,.29,0,.22,.04,14.2,S)}}catch(ge){l={error:ge}}finally{try{le&&!le.done&&(u=ee.return)&&u.call(ee)}finally{if(l)throw l.error}}try{for(var ve=Yn([-7.1,7.1]),Le=ve.next();!Le.done;Le=ve.next()){var q=Le.value;E(0,km(I,0,q>0?6:-6)+.12,q,6.4,.3,.2,D)}}catch(ge){d={error:ge}}finally{try{Le&&!Le.done&&(h=ve.return)&&h.call(ve)}finally{if(d)throw d.error}}if(I)try{for(var ke=Yn([-3.1,3.1]),ye=ke.next();!ye.done;ye=ke.next()){var M=ye.value;E(M,.7,-4.5,.2,1.1,5.2,D)}}catch(ge){m={error:ge}}finally{try{ye&&!ye.done&&(x=ke.return)&&x.call(ke)}finally{if(m)throw m.error}}return _}function IM(n){var e,t=new Ki,i=(e=n.cupRadius)!==null&&e!==void 0?e:.23,r=new Dn(new ca(i,i*.89,.48,24,1,!0),new Ai({color:"#244640",side:ji}));r.position.y=-.24,t.add(r);var s=new Dn(new Ya(i*.91,24),new Zr({color:"#082c2b"}));s.rotation.x=-Math.PI/2,s.position.y=-.475,t.add(s);var a=new Dn(new ca(i,i*.978,.09,24,1,!0),new Ai({color:"#eee9cf",side:ji}));a.position.y=-.045,t.add(a);var o=new Dn(new Ka(i,i+.06,24),new Ai({color:"#fff7d1"}));return o.rotation.x=-Math.PI/2,o.position.y=.004,t.add(o),t}function CM(){for(var n,e,t=new Ki,i=new dr(.18,1,.18),r=new Ai({color:"#b27b59"}),s=new dr(1.5,.2,1.6),a=new Ai({color:"#82b88b"}),o=new Os(.62,7,5),c=new Os(.49,7,5),l=new Ai({color:"#77b86b"}),u=new Ai({color:"#3e9d79"}),d=new Jr(i,r,14),h=new Jr(s,a,14),m=5,x=9,w=new Jr(o,l,m),g=new Jr(c,l,m),p=new Jr(o,u,x),v=new Jr(c,u,x),b=new Ln,_=0,I=0,A=0;A<14;A++){var P=A%2?-1:1,y=P*(3.8+A%3*.35),C=-6.5+Math.floor(A/2)*2;b.makeTranslation(y,-.02,C),d.setMatrixAt(A,b),b.makeTranslation(y,-.48,C),h.setMatrixAt(A,b),A%3===0?(b.makeTranslation(y,.5,C),w.setMatrixAt(_,b),b.makeTranslation(y,1,C),g.setMatrixAt(_,b),_++):(b.makeTranslation(y,.5,C),p.setMatrixAt(I,b),b.makeTranslation(y,1,C),v.setMatrixAt(I,b),I++)}try{for(var O=Yn([d,h,w,g,p,v]),E=O.next();!E.done;E=O.next()){var G=E.value;G.instanceMatrix.needsUpdate=!0,t.add(G)}}catch(L){n={error:L}}finally{try{E&&!E.done&&(e=O.return)&&e.call(O)}finally{if(n)throw n.error}}return t}function RM(n,e,t){for(var i=n.getAttribute("position"),r=0;r<i.count;r++){var s=e[r*3],a=e[r*3+1],o=e[r*3+2],c=a>.7?Math.max(0,Math.min(1,(-s-.035)/.32)):0;i.setXYZ(r,s,a+Math.sin(t*3.2+s*10)*.018*c,o+Math.sin(t*3.2+s*10+a*2)*.07*c)}i.needsUpdate=!0,n.computeVertexNormals()}function Gm(n,e,t){var i=new Map,r=new Map,s=new Map,a,o,c,l,u;function d(){var b;return o||(a=document.createElement("canvas"),(b=a.addEventListener)===null||b===void 0||b.call(a,"webglcontextrestored",function(){var _,I;u=void 0;try{for(var A=Yn(s.values()),P=A.next();!P.done;P=A.next()){var y=P.value;y.compiled=!1,y.textureDirty=!0,y.lastRenderedTime=-1,y.lastFlagStep=-1}}catch(C){_={error:C}}finally{try{P&&!P.done&&(I=A.return)&&I.call(A)}finally{if(_)throw _.error}}t?.()}),c=document.createElement("canvas"),l=c.getContext("2d"),o=new ju({canvas:a,antialias:!0,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"default"}),o.shadowMap.type=ru,o)}function h(b){if(b){if(i.has(b))return i.get(b);var _=e.get(b);if(!(!_||_.mime!=="model/tora-mesh"||!_.data)){var I=EM(_.data);return i.set(b,I),I}}}function m(b){if(b){if(r.has(b))return r.get(b);var _=e.get(b);if(!(!_||!_.mime.startsWith("image/")||!_.data)){var I=new Image,A=new Fi(I);A.colorSpace=Wi;var P=function(y){var C,O;A.needsUpdate=!0;try{for(var E=Yn(s.values()),G=E.next();!G.done;G=E.next()){var L=G.value;L.scene.traverse(function(M){var N,z,q,H=M.isMesh&&M.material?Array.isArray(M.material)?M.material:[M.material]:[];try{for(var B=(N=void 0,Yn(H)),Z=B.next();!Z.done;Z=B.next()){var J=Z.value;!((q=J.userData)===null||q===void 0)&&q.pendingTex&&J.userData.pendingTex.tex===A&&(J.map=A,J.color.set(J.userData.pendingTex.color||"#ffffff"),delete J.userData.pendingTex,J.needsUpdate=!0)}}catch(fe){N={error:fe}}finally{try{Z&&!Z.done&&(z=B.return)&&z.call(B)}finally{if(N)throw N.error}}}),L.textureDirty=!0}}catch(M){C={error:M}}finally{try{G&&!G.done&&(O=E.return)&&O.call(E)}finally{if(C)throw C.error}}y&&t?.()};return r.set(b,A),I.onload=function(){return P(!0)},I.src="data:"+_.mime+";base64,"+_.data,I.complete&&I.naturalWidth&&P(!1),A}}}function x(b){var _,I,A,P,y,C,O,E,G,L,M,N,z,q,H,B,Z,J,fe,Me,oe,pe,Ue,ne,te,Te,Fe,Pe,at,It,lt,qe,zt,We,ft,Jt,en,Lt,Wt,W=b.parameters,$t=new Zo;$t.background=new rn(W.skyColor||"#b8e2ed");var Nt=new Ui((A=W.cameraFov)!==null&&A!==void 0?A:39,1,.1,120);Nt.position.set((P=W.cameraX)!==null&&P!==void 0?P:10,(y=W.cameraY)!==null&&y!==void 0?y:18,(C=W.cameraZ)!==null&&C!==void 0?C:21),Nt.lookAt((O=W.lookAtX)!==null&&O!==void 0?O:0,(E=W.lookAtY)!==null&&E!==void 0?E:.15,(G=W.lookAtZ)!==null&&G!==void 0?G:0),$t.add(new fl(W.hemiSkyColor||"#fff9dd",W.hemiGroundColor||"#527b75",(L=W.hemiIntensity)!==null&&L!==void 0?L:1.8));var D=new ml(W.sunColor||"#fff0cf",(M=W.sunIntensity)!==null&&M!==void 0?M:2.1);D.position.set((N=W.sunX)!==null&&N!==void 0?N:-9,(z=W.sunY)!==null&&z!==void 0?z:18,(q=W.sunZ)!==null&&q!==void 0?q:8),$t.add(D);var S=m((B=(H=b.assetSlots)===null||H===void 0?void 0:H[0])===null||B===void 0?void 0:B.assetId),ee=new Map,le=[],ve=[],Le=[],ke=function(Be){var He,kt;try{for(var _t=Yn(n.components),Ft=_t.next();!Ft.done;Ft=_t.next()){var vn=Ft.value;vn.parentId===Be&&vn.contract==="native.mesh3d.v1"&&!vn.prototype&&(Le.push(vn),ke(vn.id))}}catch(ut){He={error:ut}}finally{try{Ft&&!Ft.done&&(kt=_t.return)&&kt.call(_t)}finally{if(He)throw He.error}}};ke(b.id);var ye=function(Be){var He=Be.parameters,kt=Be.parentId===b.id?$t:(Z=ee.get(Be.parentId))!==null&&Z!==void 0?Z:$t,_t=void 0,Ft=function(){var ri,St,Kn={},Hn=!!(S&&(!((ri=S.image)===null||ri===void 0)&&ri.complete)&&((St=S.image)===null||St===void 0?void 0:St.naturalWidth)>0);He.useTexture&&S&&Hn?Kn.map=S:Kn.color=He.useTexture?He.waveFlag?"#e85d56":"#d89b6a":He.color||"#ffffff",He.doubleSide&&(Kn.side=ji),He.opacity<1&&(Kn.transparent=!0,Kn.opacity=He.opacity,Kn.depthWrite=!1);var si=He.unlit?new Zr(Kn):new Ai(Kn);return He.useTexture&&S&&!Hn&&(si.userData.pendingTex={tex:S,color:"#ffffff"}),si};if(He.primitive==="group")_t=new Ki;else if(He.primitive==="fairway")_t=AM(He,S,h((fe=(J=Be.assetSlots)===null||J===void 0?void 0:J[0])===null||fe===void 0?void 0:fe.assetId));else if(He.primitive==="cup")_t=IM(He);else if(He.primitive==="garden")_t=CM();else if(He.primitive==="mesh"){var vn=h((oe=(Me=Be.assetSlots)===null||Me===void 0?void 0:Me[0])===null||oe===void 0?void 0:oe.assetId),ut=He.waveFlag&&vn?vn.clone():vn??new dr(1,1,1);_t=new Dn(ut,Ft()),He.waveFlag&&vn&&le.push({geo:ut,rest:new Float32Array(ut.getAttribute("position").array)})}else He.primitive==="sphere"?_t=new Dn(new Os((pe=He.radiusTop)!==null&&pe!==void 0?pe:.5,16,12),Ft()):He.primitive==="cylinder"?_t=new Dn(new ca((Ue=He.radiusTop)!==null&&Ue!==void 0?Ue:.23,(ne=He.radiusBottom)!==null&&ne!==void 0?ne:.21,1,32,1,!!He.openEnded),Ft()):He.primitive==="ring"?_t=new Dn(new Ka((te=He.innerRadius)!==null&&te!==void 0?te:0,(Te=He.radiusTop)!==null&&Te!==void 0?Te:.15,24),Ft()):He.primitive==="circle"?_t=new Dn(new Ya((Fe=He.radiusTop)!==null&&Fe!==void 0?Fe:.21,32),Ft()):_t=new Dn(new dr(1,1,1),Ft());if(_t.position.set((Pe=He.x)!==null&&Pe!==void 0?Pe:0,(at=He.y)!==null&&at!==void 0?at:0,(It=He.z)!==null&&It!==void 0?It:0),_t.rotation.set((lt=He.rx)!==null&&lt!==void 0?lt:0,(qe=He.ry)!==null&&qe!==void 0?qe:0,(zt=He.rz)!==null&&zt!==void 0?zt:0),_t.scale.set((We=He.sx)!==null&&We!==void 0?We:1,(ft=He.sy)!==null&&ft!==void 0?ft:1,(Jt=He.sz)!==null&&Jt!==void 0?Jt:1),_t.visible=He.visible!==!1,kt.add(_t),ee.set(Be.id,_t),He.confetti){var Sn=new Ki,gn=new dr(.08,.025,.12),zi=["#ffda69","#fff6c9","#ef8774","#7cc6bf"].map(function(ri){return new Zr({color:ri})}),Si=Array.from({length:28},function(ri,St){var Kn=new Dn(gn,zi[St%4]);return Kn.visible=!1,Sn.add(Kn),Kn});$t.add(Sn),ve.push({id:Be.id,origin:{x:(en=He.x)!==null&&en!==void 0?en:0,y:(Lt=He.y)!==null&&Lt!==void 0?Lt:0,z:(Wt=He.z)!==null&&Wt!==void 0?Wt:0},pieces:Si})}};try{for(var ge=Yn(Le),Ge=ge.next();!Ge.done;Ge=ge.next()){var pt=Ge.value;ye(pt)}}catch(Be){_={error:Be}}finally{try{Ge&&!Ge.done&&(I=ge.return)&&I.call(ge)}finally{if(_)throw _.error}}var Ee=new Ki;$t.add(Ee);var Ye=new Os(1,8,5),$e=new Zr({color:"#fff1a2",transparent:!0,opacity:.85}),gt=Array.from({length:24},function(){var Be=new Dn(Ye,$e);return Be.visible=!1,Ee.add(Be),Be}),Et=new vl,Q=new wt,Ze=new re,be=new ur(new re(0,1,0),0),Ke=new re,rt="",Re=Array.from(ee,function(Be){var He=Vm(Be,2),kt=He[0],_t=He[1];return{id:kt,obj:_t,comp:n.components.find(function(Ft){return Ft.id===kt})}}).filter(function(Be){return Be.comp}),et={id:b.id,scene:$t,camera:Nt,nodes:ee,nodeEntries:Re,wavingFlags:le,confettiSystems:ve,guideGroup:Ee,guidePool:gt,compiled:!1,lastRenderMs:0,textureDirty:!0,skyColor:W.skyColor||"#b8e2ed",lastWaveAt:-1,lastRenderedTime:-1,lastRenderedW:0,lastRenderedH:0,guideDirty:!0,focusZ:0,lastTime:-1,lastWidth:0,lastHeight:0,setGuide:function(Be){var He=Be?Math.min(Be.length,gt.length):0,kt=He?Be.slice(0,He).map(function(Sn){return"".concat(Sn.x.toFixed(2),",").concat(Sn.y.toFixed(2),",").concat(Sn.z.toFixed(2))}).join("|"):"";if(kt!==rt){rt=kt,et.guideDirty=!0;for(var _t=0;_t<gt.length;_t++){var Ft=gt[_t];if(_t<He){var vn=Be[_t],ut=.055*(1-_t/He*.5);Ft.visible=!0,Ft.scale.setScalar(ut),Ft.position.set(vn.x,vn.y+.03,vn.z)}else Ft.visible=!1}}},project:function(Be,He,kt){return Ze.set(Be.x,Be.y,Be.z).project(Nt),{x:(Ze.x+1)*He/2,y:(1-Ze.y)*kt/2}},unproject:function(Be,He,kt,_t,Ft){return Q.set(Be/kt*2-1,1-He/_t*2),Et.setFromCamera(Q,Nt),be.constant=-Ft,Et.ray.intersectPlane(be,Ke)?{x:Ke.x,y:Ke.y,z:Ke.z}:null}};return s.set(b.id,et),et}function w(b){var _;return(_=s.get(b.id))!==null&&_!==void 0?_:x(b)}function g(b,_,I,A,P,y,C){var O,E,G,L,M,N,z,q,H,B,Z,J,fe,Me,oe,pe,Ue,ne,te,Te,Fe,Pe,at,It,lt,qe,zt,We,ft,Jt,en,Lt,Wt,W,$t,Nt,D,S,ee,le,ve,Le,ke,ye,ge,Ge,pt,Ee,Ye,$e,gt,Et,Q,Ze,be,Ke=C.time,rt=C.ambientTime,Re=C.propsOf,et=C.bodies3d,Be=C.aimLocked,He=C.groundFn,kt=C.worldWidth,_t=kt===void 0?P:kt,Ft=C.worldHeight,vn=Ft===void 0?y:Ft,ut=w(b),Sn=rt??Ke,gn=Re(b),zi=gn.skyColor||"#b8e2ed";ut.skyColor!==zi&&(ut.skyColor=zi,ut.scene.background=new rn(zi));try{for(var Si=Yn(ut.nodeEntries),ri=Si.next();!ri.done;ri=Si.next()){var St=ri.value,Kn=St.id,Hn=St.obj,si=St.comp,bn=Re(si);Hn.visible=bn.visible!==!1;var Qt=et?.get(Kn);if(Qt&&Qt.mode==="dynamic"){var Dt=Qt.captured?Math.min(1,((oe=Qt.captureElapsed)!==null&&oe!==void 0?oe:0)/.55):0,wn=Qt.captured&&Qt.captureTarget?Qt.x+(Qt.captureTarget.x-Qt.x)*Dt:Qt.x,ln=Qt.y-Dt*.45,es=Qt.captured&&Qt.captureTarget?Qt.z+(Qt.captureTarget.z-Qt.z)*Dt:Qt.z;Hn.position.set(wn,ln,es);var vr=1-Dt*.65;Hn.scale.set(((pe=bn.sx)!==null&&pe!==void 0?pe:1)*vr,((Ue=bn.sy)!==null&&Ue!==void 0?Ue:1)*vr,((ne=bn.sz)!==null&&ne!==void 0?ne:1)*vr),Hn.rotation.set(-((te=Qt.spin)!==null&&te!==void 0?te:0),(Te=bn.ry)!==null&&Te!==void 0?Te:0,((Fe=Qt.spin)!==null&&Fe!==void 0?Fe:0)*.22)}else if(Qt&&Qt.mode==="kinematic")Hn.position.set(Qt.x,(at=(Pe=Qt.y)!==null&&Pe!==void 0?Pe:bn.y)!==null&&at!==void 0?at:0,Qt.z),Hn.rotation.set((It=bn.rx)!==null&&It!==void 0?It:0,-((qe=(lt=Qt.angle)!==null&&lt!==void 0?lt:bn.ry)!==null&&qe!==void 0?qe:0),(zt=bn.rz)!==null&&zt!==void 0?zt:0);else if(bn.dropShadowOf&&et?.has(bn.dropShadowOf)){var tr=et.get(bn.dropShadowOf),ts=He?(We=He(tr,tr.x,tr.z))!==null&&We!==void 0?We:-1:0;Hn.position.set(tr.x,ts+.008,tr.z);var Lr=Math.max(0,tr.y-ts-tr.radius);Hn.material&&(Hn.material.opacity=.22/(1+Lr*2));var vr=1+Lr*.4;Hn.scale.set(vr,vr,vr),Hn.visible=!tr.captured&&bn.visible!==!1}else Hn.position.set((ft=bn.x)!==null&&ft!==void 0?ft:0,(Jt=bn.y)!==null&&Jt!==void 0?Jt:0,(en=bn.z)!==null&&en!==void 0?en:0),Hn.rotation.set((Lt=bn.rx)!==null&&Lt!==void 0?Lt:0,(Wt=bn.ry)!==null&&Wt!==void 0?Wt:0,(W=bn.rz)!==null&&W!==void 0?W:0),Hn.scale.set(($t=bn.sx)!==null&&$t!==void 0?$t:1,(Nt=bn.sy)!==null&&Nt!==void 0?Nt:1,(D=bn.sz)!==null&&D!==void 0?D:1)}}catch(Qn){O={error:Qn}}finally{try{ri&&!ri.done&&(E=Si.return)&&E.call(Si)}finally{if(O)throw O.error}}var T;if(et)try{for(var K=Yn(et.values()),me=K.next();!me.done;me=K.next()){var Qt=me.value;if(Qt.stageId===b.id&&Qt.captured){T=Qt;break}}}catch(Qn){G={error:Qn}}finally{try{me&&!me.done&&(L=K.return)&&L.call(K)}finally{if(G)throw G.error}}var ue=function(Qn){var Ol=!!T,Ms=T&&(S=T.captureElapsed)!==null&&S!==void 0?S:0;Qn.pieces.forEach(function(Nr,In){var Mn,gi,xi,fo,po,mo;if(Nr.visible=Ol,!!Ol){var va=In*2.399,ch=(gi=(Mn=T.captureTarget)===null||Mn===void 0?void 0:Mn.x)!==null&&gi!==void 0?gi:Qn.origin.x,ga=(fo=(xi=T.captureTarget)===null||xi===void 0?void 0:xi.y)!==null&&fo!==void 0?fo:Qn.origin.y,vo=(mo=(po=T.captureTarget)===null||po===void 0?void 0:po.z)!==null&&mo!==void 0?mo:Qn.origin.z;Nr.position.set(ch+Math.cos(va)*Ms*(.5+In%4*.17),ga+.3+Math.sin(Math.min(1,Ms/2)*Math.PI)*(1+In%5*.15),vo+Math.sin(va)*Ms*(.5+In%4*.17)),Nr.rotation.set(Ms*3+In,Ms*2+In,Math.sin(Ms+In))}})};try{for(var ae=Yn(ut.confettiSystems),Xe=ae.next();!Xe.done;Xe=ae.next()){var Ae=Xe.value;ue(Ae)}}catch(Qn){M={error:Qn}}finally{try{Xe&&!Xe.done&&(N=ae.return)&&N.call(ae)}finally{if(M)throw M.error}}var it=vn>=_t,st=ut.lastTime<0||Sn<ut.lastTime?0:Math.min(.05,Sn-ut.lastTime),bt=gn.followTargetId?et?.get(gn.followTargetId):void 0,Yt=bt?bt.z*((ee=gn.followZFactor)!==null&&ee!==void 0?ee:.12):(le=gn.lookAtZ)!==null&&le!==void 0?le:0;ut.lastTime<0||Sn<ut.lastTime?ut.focusZ=Yt:Be||(ut.focusZ+=(Yt-ut.focusZ)*(1-Math.exp(-6*st))),ut.lastTime=Sn,ut.camera.aspect=_t/Math.max(1,vn);var Ct=Math.max(0,1-Sn/1.5),mt=!gn.followTargetId&&((ve=gn.introLift)!==null&&ve!==void 0?ve:2)===0;if(!Be){var xn=mt?Math.sin(Sn*.42)*1.15:0,Wn=mt?(Math.cos(Sn*.42)-1)*.55:0,An=(it?(Le=gn.cameraX)!==null&&Le!==void 0?Le:10:(ke=gn.landscapeCameraX)!==null&&ke!==void 0?ke:13)+xn,tn=it?((ye=gn.cameraY)!==null&&ye!==void 0?ye:18)+Ct*((ge=gn.introLift)!==null&&ge!==void 0?ge:2):(Ge=gn.landscapeCameraY)!==null&&Ge!==void 0?Ge:15,Jn=(it?(pt=gn.cameraZ)!==null&&pt!==void 0?pt:21:(Ee=gn.landscapeCameraZ)!==null&&Ee!==void 0?Ee:18)+Wn,ht=st===0?tn:ut.camera.position.y+(tn-ut.camera.position.y)*(1-Math.exp(-6*st));ut.camera.position.set(An,ht,Jn+ut.focusZ),ut.camera.fov=it?(Ye=gn.cameraFov)!==null&&Ye!==void 0?Ye:39:($e=gn.landscapeCameraFov)!==null&&$e!==void 0?$e:22.6199,ut.camera.lookAt((gt=gn.lookAtX)!==null&&gt!==void 0?gt:0,(Et=gn.lookAtY)!==null&&Et!==void 0?Et:.15,ut.focusZ)}if(ut.camera.updateProjectionMatrix(),I<2||A<2)return _.fillStyle=ut.skyColor,_.fillRect(0,0,P,y),ut;var Un=d();if(!((be=(Ze=(Q=Un.getContext)===null||Q===void 0?void 0:Q.call(Un))===null||Ze===void 0?void 0:Ze.isContextLost)===null||be===void 0)&&be.call(Ze))return _.fillStyle=ut.skyColor,_.fillRect(0,0,P,y),ut;var an=Math.max(I,A,1),bi=520,ki=an>bi?bi/an:1,pi=Math.max(2,Math.round(I*ki)),mi=Math.max(2,Math.round(A*ki)),yn=a.width!==pi||a.height!==mi;if(yn&&(Un.setPixelRatio(1),Un.setSize(pi,mi,!1),c.width=pi,c.height=mi,u=void 0),!ut.compiled){ut.compiled=!0;var On=[];ut.guidePool[0]&&!ut.guidePool[0].visible&&(ut.guidePool[0].visible=!0,ut.guidePool[0].position.set(0,-99,0),On.push(ut.guidePool[0]));try{for(var Ii=Yn(ut.confettiSystems),fn=Ii.next();!fn.done;fn=Ii.next()){var Ae=fn.value;Ae.pieces[0]&&!Ae.pieces[0].visible&&(Ae.pieces[0].visible=!0,Ae.pieces[0].position.set(0,-99,0),On.push(Ae.pieces[0]))}}catch(Qn){z={error:Qn}}finally{try{fn&&!fn.done&&(q=Ii.return)&&q.call(Ii)}finally{if(z)throw z.error}}Un.compile(ut.scene,ut.camera);try{for(var vi=Yn(On),qi=vi.next();!qi.done;qi=vi.next()){var ys=qi.value;ys.visible=!1}}catch(Qn){H={error:Qn}}finally{try{qi&&!qi.done&&(B=vi.return)&&B.call(vi)}finally{if(H)throw H.error}}}var uo=!1;if(et)try{for(var Ys=Yn(et.values()),Zs=Ys.next();!Zs.done;Zs=Ys.next()){var Qt=Zs.value;if(Qt.stageId===b.id&&(Qt.mode==="kinematic"||Qt.mode==="dynamic"&&(!Qt.atRest||Qt.captured))){uo=!0;break}}}catch(Qn){Z={error:Qn}}finally{try{Zs&&!Zs.done&&(J=Ys.return)&&J.call(Ys)}finally{if(Z)throw Z.error}}var _s=Math.floor(Sn*20),ho=ut.wavingFlags.length>0&&ut.lastFlagStep!==_s,Js=mt&&Math.abs(Sn-ut.lastRenderedTime)>=.032,Dl=uo&&ut.lastRenderedTime!==Sn,Ul=yn||u!==b.id||ut.guideDirty||ut.textureDirty||ut.lastRenderedTime<0||ut.lastRenderedW!==pi||ut.lastRenderedH!==mi||ho||Js||Dl;if(Ul){if(ut.wavingFlags.length>0&&ut.lastFlagStep!==_s){try{for(var $s=Yn(ut.wavingFlags),Ks=$s.next();!Ks.done;Ks=$s.next()){var Fl=Ks.value;RM(Fl.geo,Fl.rest,_s/20)}}catch(Qn){fe={error:Qn}}finally{try{Ks&&!Ks.done&&(Me=$s.return)&&Me.call($s)}finally{if(fe)throw fe.error}}ut.lastFlagStep=_s}Un.setClearColor(ut.skyColor,1),Un.render(ut.scene,ut.camera),a.width>0&&a.height>0&&(l.drawImage(a,0,0,pi,mi),u=b.id),ut.lastRenderedTime=Sn,ut.lastRenderedW=pi,ut.lastRenderedH=mi,ut.guideDirty=!1,ut.textureDirty=!1}return ut.lastWidth=P,ut.lastHeight=y,c.width>0&&c.height>0&&_.drawImage(c,0,0,P,y),ut}function p(){var b,_;try{for(var I=Yn(s.values()),A=I.next();!A.done;A=I.next()){var P=A.value;P.focusZ=0,P.lastTime=-1,P.lastRenderedTime=-1,P.lastFlagStep=-1,P.guideDirty=!0,P.setGuide([])}}catch(y){b={error:y}}finally{try{A&&!A.done&&(_=I.return)&&_.call(I)}finally{if(b)throw b.error}}}function v(){var b,_,I,A,P,y,C;try{for(var O=Yn(s.values()),E=O.next();!E.done;E=O.next()){var G=E.value;G.scene.traverse(function(B){var Z,J;if(B.isMesh&&(B.geometry&&!Array.from(i.values()).includes(B.geometry)&&B.geometry.dispose(),B.material))try{for(var fe=(Z=void 0,Yn(Array.isArray(B.material)?B.material:[B.material])),Me=fe.next();!Me.done;Me=fe.next()){var oe=Me.value;oe.dispose()}}catch(pe){Z={error:pe}}finally{try{Me&&!Me.done&&(J=fe.return)&&J.call(fe)}finally{if(Z)throw Z.error}}})}}catch(B){b={error:B}}finally{try{E&&!E.done&&(_=O.return)&&_.call(O)}finally{if(b)throw b.error}}try{for(var L=Yn(i.values()),M=L.next();!M.done;M=L.next()){var N=M.value;N.dispose()}}catch(B){I={error:B}}finally{try{M&&!M.done&&(A=L.return)&&A.call(L)}finally{if(I)throw I.error}}try{for(var z=Yn(r.values()),q=z.next();!q.done;q=z.next()){var H=q.value;H.dispose()}}catch(B){P={error:B}}finally{try{q&&!q.done&&(y=z.return)&&y.call(z)}finally{if(P)throw P.error}}s.clear(),i.clear(),r.clear(),(C=o?.forceContextLoss)===null||C===void 0||C.call(o),o?.dispose(),o=void 0,a=void 0,c=void 0,l=void 0,u=void 0}return{getStage:w,renderStage:g,reset:p,dispose:v}}var xs=function(){return xs=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},xs.apply(this,arguments)},Mr=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},Sr=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))},Cl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Hm=function(n,e,t){return Math.max(e,Math.min(t,n))},qs=function(n,e){return Math.hypot(e.x-n.x,e.y-n.y)};function Wm(n){var e=n.id,t=n.nodes,i=n.edges,r=n.gates,s=r===void 0?[]:r,a=n.onEvent,o=a===void 0?function(){}:a,c=new Map(t.map(function(M){return[M.id,xs({},M)]})),l=new Map(i.map(function(M){return[M.id,xs({speedScale:1,enabled:!0,bidirectional:!1,cost:0},M)]})),u=new Map(s.map(function(M){return[M.id,xs({},M)]})),d=new Map,h=d,m=0,x=0,w=function(M){return c.get(M)},g=function(M){return Sr([],Mr(u.values()),!1).find(function(N){return N.parameters.nodeId===M})},p=function(M){var N=M.parameters;if(N.mode==="open")return!0;if(N.mode==="closed")return!1;var z=N.openSeconds+N.closedSeconds,q=(m+N.phaseOffsetSeconds)%z;return q<N.openSeconds},v=function(M){return Sr([],Mr(l.values()),!1).filter(function(N){return N.enabled&&(N.from===M||N.bidirectional&&N.to===M)}).sort(function(N,z){return N.id<z.id?-1:N.id>z.id?1:0})},b=function(M,N){return Sr([],Mr(l.values()),!1).find(function(z){return z.enabled&&(z.from===M&&z.to===N||z.bidirectional&&z.from===N&&z.to===M)})};function _(M,N){var z,q,H,B;if(M===N)return[M];for(var Z=new Map([[M,0]]),J=new Map,fe=new Set([M]);fe.size;){var Me=Sr([],Mr(fe),!1).sort(function(lt,qe){return Z.get(lt)-Z.get(qe)||(lt<qe?-1:lt>qe?1:0)})[0];if(fe.delete(Me),Me===N)break;try{for(var oe=(z=void 0,Cl(v(Me))),pe=oe.next();!pe.done;pe=oe.next()){var Ue=pe.value,ne=Ue.from===Me?Ue.to:Ue.from,te=g(ne),Te=w(ne),Fe=te?te.parameters.holdSeconds*90+(p(te)?0:te.parameters.closedSeconds*90):0,Pe=Z.get(Me)+qs(w(Me),Te)/Ue.speedScale+Ue.cost+((H=Te.cost)!==null&&H!==void 0?H:0)+Fe;Pe>=((B=Z.get(ne))!==null&&B!==void 0?B:1/0)||(Z.set(ne,Pe),J.set(ne,Me),fe.add(ne))}}catch(lt){z={error:lt}}finally{try{pe&&!pe.done&&(q=oe.return)&&q.call(oe)}finally{if(z)throw z.error}}}if(!Z.has(N))return[];for(var at=[N],It=N;It!==M;)It=J.get(It),at.unshift(It);return at}function I(M){var N,z=M.route.length>=2&&M.segment<M.route.length-1;if(!z){var q=(N=M.route[Math.min(M.segment,M.route.length-1)])!==null&&N!==void 0?N:M.startNode,H=_(q,M.target);M.route=H.length?H:[q],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var B=M.route[M.segment],Z=M.route[M.segment+1],J=qs(w(B),w(Z));if(M.arrived||M.distance>=J-1e-4){var H=_(Z,M.target);M.route=H.length?H:[Z],M.segment=0,M.distance=0,M.arrived=!1,M.active=M.route.length>=2;return}var fe=_(Z,M.target);M.route=fe.length?Sr([B],Mr(fe),!1):[B,Z],M.segment=0}function A(M){var N,z=_(M.startNode,M.targetNode),q=w(M.startNode),H=z.length>=2?w(z[1]):q,B=z.length>=2?Math.atan2(H.y-q.y,H.x-q.x):0,Z=Math.floor((B%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4,J=xs(xs({},M),{loop:(N=M.loop)!==null&&N!==void 0?N:"none",originNode:M.startNode,destinationNode:M.targetNode,target:M.targetNode,networkId:e,route:z.length?z:[M.startNode],segment:0,distance:0,x:q.x,y:q.y,heading:B,frame:[0,1,2,3][Z],flipX:Math.cos(B)<0,hold:0,arrived:!1,active:M.active&&z.length>=2,blockedTicks:0,blockedEmitted:!1,speedMultiplier:1});return d.set(J.id,J),J}function P(M){if(y("pathArrive",M,M.target),M.loop==="none"){M.active=!1;return}var N=M.target,z=M.loop==="ping-pong"?N===M.destinationNode?M.originNode:M.destinationNode:N===M.originNode?M.destinationNode:M.originNode;M.startNode=N,M.target=z,M.route=_(N,z),M.segment=0,M.distance=0,M.arrived=!1,M.route.length<2&&(M.active=!1)}function y(M,N,z){o(M,{componentId:N.id,nodeId:z})}function C(M,N){var z,q,H=M.route[M.segment+1],B=g(H);if(B&&!p(B)){M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,y("pathBlocked",M,H));return}if(!M.arrived){if(M.arrived=!0,M.segment+1===M.route.length-1){H===M.target?P(M):(M.active=!1,M.blockedEmitted||(M.blockedEmitted=!0,y("pathBlocked",M,H)));return}M.hold=Math.max((z=w(H).holdSeconds)!==null&&z!==void 0?z:0,(q=B?.parameters.holdSeconds)!==null&&q!==void 0?q:0)}if(M.hold>0){M.hold=Math.max(0,M.hold-N),M.blockedTicks++,M.blockedTicks>=30&&!M.blockedEmitted&&(M.blockedEmitted=!0,y("pathBlocked",M,H));return}M.segment++,M.distance=0,M.arrived=!1,M.blockedTicks=0,M.blockedEmitted=!1}function O(M,N){var z,q;if(M.spacing<=0)return N;var H=M.route[M.segment],B=M.route[M.segment+1],Z=qs(w(H),w(B)),J=Z-M.distance,fe=N;try{for(var Me=Cl(h.values()),oe=Me.next();!oe.done;oe=Me.next()){var pe=oe.value;if(!(pe.id===M.id||!pe.active||pe.route.length<2||pe.segment>=pe.route.length-1)){var Ue=pe.route[pe.segment],ne=pe.route[pe.segment+1],te=1/0;if(Ue===H&&ne===B&&(pe.distance>M.distance||pe.distance===M.distance&&pe.id<M.id))te=pe.distance-M.distance;else if(Ue===B)te=J+pe.distance;else if(ne===B&&Ue!==H){var Te=qs(w(Ue),w(ne))-pe.distance;Te<M.spacing&&(Te<J||Te===J&&pe.id<M.id)&&(te=J)}te<1/0&&(fe=Math.min(fe,Math.max(0,te-M.spacing)))}}}catch(Fe){z={error:Fe}}finally{try{oe&&!oe.done&&(q=Me.return)&&q.call(Me)}finally{if(z)throw z.error}}return fe}function E(M){var N=w(M.route[M.segment]),z=w(M.route[M.segment+1]),q=qs(N,z),H=Hm(M.distance/Math.max(1e-4,q),0,1),B=N.x+(z.x-N.x)*H,Z=N.y+(z.y-N.y)*H,J=Math.atan2(z.y-N.y,z.x-N.x),fe=Math.min(M.cornerRadius,q/3),Me=M.route[M.segment+2];if(fe>0&&Me){var oe=w(Me),pe=qs(z,oe),Ue=Math.min(fe,pe/3);if(M.distance>q-fe){var ne={x:z.x-(z.x-N.x)/q*fe,y:z.y-(z.y-N.y)/q*fe},te={x:z.x+(oe.x-z.x)/pe*Ue,y:z.y+(oe.y-z.y)/pe*Ue},Te=Hm((M.distance-(q-fe))/(fe*2),0,.5),Fe=1-Te;B=Fe*Fe*ne.x+2*Fe*Te*z.x+Te*Te*te.x,Z=Fe*Fe*ne.y+2*Fe*Te*z.y+Te*Te*te.y;var Pe=2*Fe*(z.x-ne.x)+2*Te*(te.x-z.x),at=2*Fe*(z.y-ne.y)+2*Te*(te.y-z.y);Math.abs(Pe)+Math.abs(at)>.001&&(J=Math.atan2(at,Pe))}}return{x:B,y:Z,heading:J}}function G(M){var N,z,q,H;m+=M,x++;var B=Sr([],Mr(d.values()),!1).sort(function(We,ft){return We.id<ft.id?-1:We.id>ft.id?1:0}),Z=B.length?x%B.length:0,J=Sr(Sr([],Mr(B.slice(Z)),!1),Mr(B.slice(0,Z)),!1);try{for(var fe=Cl(J),Me=fe.next();!Me.done;Me=fe.next()){var oe=Me.value;if(!(!oe.active||oe.route.length<2||oe.segment>=oe.route.length-1)){var pe=oe.route[oe.segment],Ue=oe.route[oe.segment+1],ne=qs(w(pe),w(Ue));if(!(oe.distance>=ne-1e-4&&(C(oe,M),!oe.active||oe.route.length<2||oe.segment>=oe.route.length-1))){var te=oe.route[oe.segment],Te=oe.route[oe.segment+1],Fe=qs(w(te),w(Te)),Pe=Fe-oe.distance,at=(H=(q=b(te,Te))===null||q===void 0?void 0:q.speedScale)!==null&&H!==void 0?H:1,It=Math.min(Pe,oe.speed*at*Math.max(0,oe.speedMultiplier)*M),lt=O(oe,It);lt<=1e-4?(oe.blockedTicks++,oe.blockedTicks>=30&&!oe.blockedEmitted&&(oe.blockedEmitted=!0,y("pathBlocked",oe,Te))):(oe.distance+=lt,oe.blockedTicks=0,oe.blockedEmitted=!1);var qe=E(oe);oe.x=qe.x,oe.y=qe.y,oe.heading=qe.heading;var zt=Math.floor((oe.heading%(Math.PI*2)+Math.PI*2+1e-6)%(Math.PI*2)/(Math.PI/2))%4;oe.frame=[0,1,2,3][zt],oe.flipX=Math.cos(oe.heading)<0}}}}catch(We){N={error:We}}finally{try{Me&&!Me.done&&(z=fe.return)&&z.call(fe)}finally{if(N)throw N.error}}}function L(){return{id:e,nodeCount:c.size,edgeCount:l.size,activeAgents:Sr([],Mr(d.values()),!1).filter(function(M){return M.active}).length,queuedAgents:Sr([],Mr(d.values()),!1).filter(function(M){return M.active&&M.blockedTicks>0}).length,agents:Sr([],Mr(d.values()),!1).map(function(M){var N;return{id:M.id,x:M.x,y:M.y,heading:M.heading,frame:(N=M.frame)!==null&&N!==void 0?N:0,flipX:!!M.flipX,active:M.active,targetNode:M.target,route:Sr([],Mr(M.route),!1),segment:M.segment,distance:M.distance,blocked:M.blockedTicks>0}})}}return{addAgent:A,removeAgent:function(M){return d.delete(M)},getAgent:function(M){return d.get(M)},setTarget:function(M,N){var z=d.get(M);return!z||!w(N)?!1:(z.target=N,z.destinationNode=N,z.active=!0,I(z),!0)},setEdge:function(M,N,z){var q,H,B=l.get(M);if(!B)return!1;B.enabled=N,z!==void 0&&(B.cost=z);try{for(var Z=Cl(d.values()),J=Z.next();!J.done;J=Z.next()){var fe=J.value;I(fe)}}catch(Me){q={error:Me}}finally{try{J&&!J.done&&(H=Z.return)&&H.call(Z)}finally{if(q)throw q.error}}return!0},setGate:function(M,N,z){var q,H,B=u.get(M);if(!B)return!1;B.parameters=xs(xs({},B.parameters),{mode:N,holdSeconds:z});try{for(var Z=Cl(d.values()),J=Z.next();!J.done;J=Z.next()){var fe=J.value;I(fe)}}catch(Me){q={error:Me}}finally{try{J&&!J.done&&(H=Z.return)&&H.call(Z)}finally{if(q)throw q.error}}return!0},tick:G,snapshot:L}}var Rl=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},nh=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},ih=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))},rh={A:["01110","10001","10001","11111","10001","10001","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],C:["01111","10000","10000","10000","10000","10000","01111"],D:["11110","10001","10001","10001","10001","10001","11110"],E:["11111","10000","10000","11110","10000","10000","11111"],F:["11111","10000","10000","11110","10000","10000","10000"],G:["01111","10000","10000","10111","10001","10001","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],I:["11111","00100","00100","00100","00100","00100","11111"],J:["00111","00010","00010","00010","10010","10010","01100"],K:["10001","10010","10100","11000","10100","10010","10001"],L:["10000","10000","10000","10000","10000","10000","11111"],M:["10001","11011","10101","10101","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"],O:["01110","10001","10001","10001","10001","10001","01110"],P:["11110","10001","10001","11110","10000","10000","10000"],Q:["01110","10001","10001","10001","10101","10010","01101"],R:["11110","10001","10001","11110","10100","10010","10001"],S:["01111","10000","10000","01110","00001","00001","11110"],T:["11111","00100","00100","00100","00100","00100","00100"],U:["10001","10001","10001","10001","10001","10001","01110"],V:["10001","10001","10001","10001","10001","01010","00100"],W:["10001","10001","10001","10101","10101","10101","01010"],X:["10001","10001","01010","00100","01010","10001","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],Z:["11111","00001","00010","00100","01000","10000","11111"],0:["01110","10001","10011","10101","11001","10001","01110"],1:["00100","01100","00100","00100","00100","00100","01110"],2:["01110","10001","00001","00010","00100","01000","11111"],3:["11110","00001","00001","01110","00001","00001","11110"],4:["00010","00110","01010","10010","11111","00010","00010"],5:["11111","10000","10000","11110","00001","00001","11110"],6:["01110","10000","10000","11110","10001","10001","01110"],7:["11111","00001","00010","00100","01000","01000","01000"],8:["01110","10001","10001","01110","10001","10001","01110"],9:["01110","10001","10001","01111","00001","00001","01110"],"!":["00100","00100","00100","00100","00100","00000","00100"],"?":["01110","10001","00001","00010","00100","00000","00100"],".":["00000","00000","00000","00000","00000","00110","00110"],",":["00000","00000","00000","00000","00110","00110","00100"],":":["00000","00110","00110","00000","00110","00110","00000"],"+":["00000","00100","00100","11111","00100","00100","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],"/":["00001","00010","00010","00100","01000","01000","10000"],"'":["00100","00100","00000","00000","00000","00000","00000"]," ":["000","000","000","000","000","000","000"]},Pl=function(n){var e,t,i,r,s=0;try{for(var a=Rl(n),o=a.next();!o.done;o=a.next()){var c=o.value;s+=((r=(i=rh[c])===null||i===void 0?void 0:i[0].length)!==null&&r!==void 0?r:5)+1}}catch(l){e={error:l}}finally{try{o&&!o.done&&(t=a.return)&&t.call(a)}finally{if(e)throw e.error}}return Math.max(0,s-1)},PM=function(n,e){var t,i,r=[],s="";try{for(var a=Rl(n),o=a.next();!o.done;o=a.next()){var c=o.value;s&&Pl(s+c)>e&&(r.push(s),s=""),s+=c}}catch(l){t={error:l}}finally{try{o&&!o.done&&(i=a.return)&&i.call(a)}finally{if(t)throw t.error}}return s&&r.push(s),r};function LM(n,e,t){var i,r,s,a,o;t===void 0&&(t=1);var c=Math.max(1,Math.floor(e/Math.max(1,t))),l=[];try{for(var u=Rl(String(n).toUpperCase().split(`
`)),d=u.next();!d.done;d=u.next()){var h=d.value,m=h.split(/\s+/).filter(Boolean);if(!m.length){l.push("");continue}var x="";try{for(var w=(s=void 0,Rl(m)),g=w.next();!g.done;g=w.next()){var p=g.value;if(Pl(p)>c){x&&l.push(x);var v=PM(p,c);l.push.apply(l,ih([],nh(v.slice(0,-1)),!1)),x=(o=v.at(-1))!==null&&o!==void 0?o:""}else{var b=x?x+" "+p:p;Pl(b)<=c?x=b:(x&&l.push(x),x=p)}}}catch(_){s={error:_}}finally{try{g&&!g.done&&(a=w.return)&&a.call(w)}finally{if(s)throw s.error}}x&&l.push(x)}}catch(_){i={error:_}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(i)throw i.error}}return l}var Xm=function(n){var e,t=Math.max(0,(e=n.padding)!==null&&e!==void 0?e:4),i=n.pixelPanel&&n.padding===void 0;return{x:i?8:t,y:i?4:t}},NM=function(n,e,t,i){var r,s=e.wrap===!1?String(n).toUpperCase().split(`
`):LM(n,i,t),a=s.slice(0,16),o=Math.round(t*8*((r=e.lineHeight)!==null&&r!==void 0?r:1.2));return{allLines:s,lines:a,renderedWidth:Math.max.apply(Math,ih([0],nh(a.map(function(c){return Pl(c)*t})),!1)),renderedHeight:(a.length-1)*o+7*t}};function of(n,e){for(var t,i=Xm(e),r=Math.max(0,e.width-2*i.x),s=Math.max(0,e.height-2*i.y),a=Math.max(1,Math.floor(e.fontSize/8)),o=e.autoFit===!1?a:Math.min(a,Math.max(1,Math.ceil(((t=e.minFontSize)!==null&&t!==void 0?t:12)/8))),c=ih([],nh(new Set(ih([],nh(String(n).toUpperCase()),!1).filter(function(x){return x!==`
`&&!rh[x]}))),!1),l,u=a;u>=o;u--){var d=NM(n,e,u,r),h=d.renderedWidth>r,m=d.allLines.length>16||d.renderedHeight>s;if(l={lines:d.lines,scale:u,fontSize:u*8,renderedWidth:d.renderedWidth,renderedHeight:d.renderedHeight,overflowsWidth:h,overflowsHeight:m,unsupportedChars:c},e.autoFit===!1||!h&&!m)break}return l}function qm(n,e,t){var i,r=of(e,t),s=r.lines,a=r.scale,o=Xm(t),c=Math.max(0,t.width-2*o.x),l=Math.max(0,t.height-2*o.y),u=Math.round(r.fontSize*((i=t.lineHeight)!==null&&i!==void 0?i:1.2)),d=o.y+(l-r.renderedHeight)/2;return n.fillStyle=t.color,s.forEach(function(h,m){var x,w,g,p=Pl(h)*a,v=t.align==="left"?o.x:t.align==="right"?t.width-p-o.x:o.x+(c-p)/2,b=v;try{for(var _=Rl(h),I=_.next();!I.done;I=_.next()){var A=I.value,P=(g=rh[A])!==null&&g!==void 0?g:rh["?"];P.forEach(function(y,C){for(var O=0;O<y.length;O++)y[O]==="1"&&n.fillRect(Math.round(b+O*a),Math.round(d+m*u+C*a),a,a)}),b+=(P[0].length+1)*a}}catch(y){x={error:y}}finally{try{I&&!I.done&&(w=_.return)&&w.call(_)}finally{if(x)throw x.error}}}),r}var jr=function(){return jr=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},jr.apply(this,arguments)},cf=Math.PI*2,Zn=function(n,e){return((Math.imul(n+1,2654435769)^Math.imul(e,2246822507))>>>0)/4294967296};function uf(n,e,t){var i,r,s=[n.color,n.color2,n.color3].filter(Boolean),a=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(c,l){var u,d,h=o+((l+.2+Zn(l,1)*.6)/n.count-.5)*a,m=n.speed*(.42+.65*Zn(l,2));return jr(jr({},e),{clipId:t,shape:"pixel-confetti",age:-.12*Zn(l,3),vx:Math.cos(h)*m,vy:Math.sin(h)*m,gravity:(u=n.gravity)!==null&&u!==void 0?u:250,life:((d=n.lifetime)!==null&&d!==void 0?d:.7)*(.6+.4*Zn(l,4)),color:s[l%s.length],size:3+Math.floor(3*Zn(l,5)),angle:cf*Zn(l,6),spin:(Zn(l,7)-.5)*12})})}function Ym(n){var e=Math.min(12,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return uf(n).map(function(r,s){return jr(jr({},r),{screen:!0,x:(s%e+.15+.7*Zn(s,8))/e,y:(Math.floor(s/e)+.15+.7*Zn(s,9))/t,vx:i*(Zn(s,10)-.5)*.7,vy:i*(.3+.5*Zn(s,11)),size:r.size+1})})}var ah=function(n,e){return(n%e+e)%e};function Zm(n,e,t){var i=e.x,r=e.y,s=e.vx,a=e.vy,o=e.age,c=e.life,l=e.gravity,u=e.size,d=e.angle,h=e.spin,m=e.color;if(!(o<0)){var x=s*o,w=a*o+l*o*o/2,g=Math.round(t?t.x+ah(i*t.width+x,t.width):i+x),p=Math.round(t?t.y+ah(r*t.height+w,t.height):r+w),v=Math.round((d+h*o)/(Math.PI/4))&3;if(n.globalAlpha*=Math.min(1,(c-o)*4),n.fillStyle="#3c293388",v===0)n.fillRect(g-u+1,p+1,u*2+1,u+1);else if(v===2)n.fillRect(g+1,p-u+1,u+1,u*2+1);else for(var b=-1;b<=1;b++)n.fillRect(g+b*u+1,p+b*u*(v===1?1:-1)+1,u+1,u+1);if(n.fillStyle=m,v===0)n.fillRect(g-u,p,u*2,u);else if(v===2)n.fillRect(g,p-u,u,u*2);else for(var b=-1;b<=1;b++)n.fillRect(g+b*u,p+b*u*(v===1?1:-1),u,u)}}function hf(n,e,t){var i,r,s=[n.color,n.color2,n.color3,"#ff6b6b","#4ecdc4","#fff3b0"].filter(Boolean),a=((i=n.spread)!==null&&i!==void 0?i:360)*Math.PI/180,o=((r=n.direction)!==null&&r!==void 0?r:-90)*Math.PI/180;return Array.from({length:n.count},function(c,l){var u,d,h=o+((l+.2+Zn(l,11)*.6)/n.count-.5)*a,m=n.speed*(.45+.65*Zn(l,12));return jr(jr({},e),{clipId:t,shape:"confetti",age:-.15*Zn(l,13),vx:Math.cos(h)*m,vy:Math.sin(h)*m,gravity:(u=n.gravity)!==null&&u!==void 0?u:140,life:((d=n.lifetime)!==null&&d!==void 0?d:2.6)*(.75+.35*Zn(l,14)),color:s[l%s.length],size:5+Math.floor(5*Zn(l,15)),kind:l%5===0?"star":"ribbon",angle:cf*Zn(l,16),spin:(Zn(l,17)-.5)*5.5,flutter:1.6+2.2*Zn(l,18),phase:cf*Zn(l,19)})})}function Jm(n){var e=Math.min(14,Math.ceil(Math.sqrt(n.count))),t=Math.ceil(n.count/e),i=n.speed;return hf(n,{x:0,y:0}).map(function(r,s){var a;return jr(jr({},r),{screen:!0,x:(s%e+.12+.76*Zn(s,20))/e,y:(Math.floor(s/e)+.08+.84*Zn(s,21))/t,vx:i*(Zn(s,22)-.5)*.65,vy:i*(.38+.55*Zn(s,23)),gravity:Math.min((a=n.gravity)!==null&&a!==void 0?a:90,90)})})}function $m(n,e,t){var i=e.x,r=e.y,s=e.vx,a=e.vy,o=e.age,c=e.life,l=e.gravity,u=e.size,d=e.angle,h=e.spin,m=e.flutter,x=e.phase,w=e.color,g=e.kind;if(!(o<0)){var p=Math.sin(o*m+x)*14,v=s*o+p,b=a*o+l*o*o/2,_=t?t.x+ah(i*t.width+v,t.width):i+v,I=t?t.y+ah(r*t.height+b,t.height):r+b,A=Math.min(1,o*2.8,(c-o)*2.2);if(!(A<=0)){n.save(),n.globalAlpha*=A,n.translate(_,I),n.rotate(d+h*o);var P=Math.cos(o*m*1.4+x);if(n.scale(1,Math.max(.22,Math.abs(P))),n.fillStyle=w,g==="star"){var y=u*.85;n.beginPath();for(var C=0;C<8;C++){var O=C%2===0?y:y*.38,E=C*Math.PI/4;C===0?n.moveTo(Math.cos(E)*O,Math.sin(E)*O):n.lineTo(Math.cos(E)*O,Math.sin(E)*O)}n.closePath(),n.fill()}else n.fillRect(-u*.7,-u*.34,u*1.4,u*.68),n.fillStyle="#ffffff55",n.fillRect(-u*.7,-u*.34,u*1.4,u*.2);n.restore()}}}function Km(n,e,t,i,r){var s=e.width,a=e.height;if(!(s<=0||a<=0)){var o=Math.min(3,Math.floor(Math.min(s,a)/8));if(!o){n.fillStyle=t,n.fillRect(0,0,s,a);return}var c=i?o*2:0,l=a-(i?o:o*3),u=r>=0?.5+.5*Math.sin(r*4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd05a99",n.shadowBlur=8+u*9,n.fillStyle=t,n.fillRect(o,c+o,s-2*o,a-c-2*o),n.restore()),n.fillStyle=e.stroke,n.fillRect(o,0,s-2*o,a),n.fillRect(0,o,s,a-2*o),n.fillStyle=t,n.fillRect(o,c+o,s-2*o,a-c-2*o),n.fillStyle="#431d1380",n.fillRect(o,l,s-2*o,a-o-l),n.fillStyle=e.enabled?"#fff4be":"#ffffff55",n.fillRect(2*o,c+o,s-4*o,i?o:o*2),n.fillStyle="#ffffff55",n.fillRect(o,c+3*o,o,Math.max(0,l-c-3*o)),n.fillStyle="#521b2444",n.fillRect(s-2*o,c+3*o,o,Math.max(0,l-c-3*o));var d=r>=0?r%1.9:-1,h=(d-.1)/.55;if(e.enabled&&!i&&h>=0&&h<1){n.save(),n.beginPath(),n.rect(2*o,c+3*o,s-4*o,Math.max(0,l-c-3*o)),n.clip();for(var m=Math.floor(((s+14*o)*h-6*o)/o)*o,x=c+3*o,w=0;x<l;x+=o,w++){var g=m-Math.floor(w/2)*o;n.fillStyle="#fff4be44",n.fillRect(g-2*o,x,9*o,o),n.fillStyle="#fffef0aa",n.fillRect(g,x,4*o,o)}n.restore()}if(e.enabled&&!i&&r>=0){var p=Math.max(0,Math.sin(r*4.2)),v=Math.max(0,Math.sin(r*4.2+2.2)),b=function(_,I,A){if(!(A<.25)){n.save(),n.globalAlpha*=A*.95,n.fillStyle="#fffef4";var P=A>.65?o*2:o;n.fillRect(Math.round(_-P),Math.round(I-o/2),P*2+o,o),n.fillRect(Math.round(_-o/2),Math.round(I-P),o,P*2+o),n.restore()}};b(5*o,c+4*o,p),b(s-6*o,c+5*o,v)}}}function sh(n,e,t,i,r,s){var a=Math.max(0,Math.min(s,i/2,r/2));n.beginPath(),typeof n.roundRect=="function"?n.roundRect(e,t,i,r,a):(n.moveTo(e+a,t),n.arcTo(e+i,t,e+i,t+r,a),n.arcTo(e+i,t+r,e,t+r,a),n.arcTo(e,t+r,e,t,a),n.arcTo(e,t,e+i,t,a),n.closePath())}function lf(n,e,t,i,r){if(!(r<=.02||i<=.5)){n.save(),n.translate(e,t),n.globalAlpha*=r,n.fillStyle="#fffef0",n.beginPath();for(var s=0;s<8;s++){var a=s%2===0?i:i*.24,o=s*Math.PI/4;s===0?n.moveTo(Math.cos(o)*a,Math.sin(o)*a):n.lineTo(Math.cos(o)*a,Math.sin(o)*a)}n.closePath(),n.fill(),n.restore()}}function Qm(n,e,t,i,r){var s,a,o,c=e.width,l=e.height;if(!(c<=0||l<=0)){var u=Math.min((s=e.radius)!==null&&s!==void 0?s:16,c/2,l/2),d=i?2:6,h=i?3:0,m=r>=0?.5-.5*Math.cos(r*2.4):0;e.enabled&&!i&&r>=0&&(n.save(),n.shadowColor="#ffd23f99",n.shadowBlur=10+m*12,sh(n,0,h,c,l-h,u),n.fillStyle=t,n.fill(),n.restore()),n.save(),sh(n,0,h+2,c,Math.max(4,l-h-2),u),n.fillStyle="#0e2830",n.fill(),n.restore(),n.save(),sh(n,0,h,c,Math.max(4,l-d),u),n.fillStyle=t,n.fill(),n.clip();var x=(a=n.createLinearGradient)===null||a===void 0?void 0:a.call(n,0,h,0,l-d);if(x?.addColorStop&&(x.addColorStop(0,"#ffffffa8"),x.addColorStop(.42,"#ffffff26"),x.addColorStop(.45,"#00000000"),x.addColorStop(1,"#00000024"),n.fillStyle=x,n.fillRect(0,h,c,l-d)),n.fillStyle="#fffef0bb",n.fillRect(u*.55,h+3,Math.max(0,c-u*1.1),3),e.enabled&&!i&&r>=0){var w=(r%2.4-.15)/.95;if(w>0&&w<1){var g=w*w*(3-2*w),p=Math.sin(w*Math.PI),v=-c*.36+c*1.72*g;n.save(),n.globalAlpha*=p,n.translate(v,h),n.transform(1,0,-.36,1,0,0);var b=(o=n.createLinearGradient)===null||o===void 0?void 0:o.call(n,-48,0,48,0);b?.addColorStop?(b.addColorStop(0,"#ffffff00"),b.addColorStop(.32,"#ffffff48"),b.addColorStop(.5,"#fffef8cc"),b.addColorStop(.68,"#ffffff48"),b.addColorStop(1,"#ffffff00"),n.fillStyle=b,n.fillRect(-48,0,96,l)):(n.fillStyle="#fffef8a8",n.fillRect(-14,0,28,l)),n.restore()}}if(n.restore(),e.strokeWidth&&(n.save(),sh(n,0,h,c,Math.max(4,l-d),u),n.strokeStyle=e.stroke,n.lineWidth=e.strokeWidth,n.stroke(),n.restore()),e.enabled&&!i&&r>=0){var _=Math.max(0,Math.sin(r*2.4)),I=_*_,A=Math.max(0,Math.sin(r*2.4+2.1)),P=A*A,y=Math.max(0,Math.sin(r*2.4+4.2)),C=y*y;lf(n,c*.12,h+9,4+I*6,I*.92),lf(n,c*.88,h+10,3.8+P*5.5,P*.9),lf(n,c*.76,Math.max(h+14,l-d-8),3+C*4.2,C*.8)}}}function oh(n){if(/\s/.test(n)||n.length>512)return!1;var e=/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,9}$/,t=/^https:\/\/apps\.apple\.com\/([a-z]{2}\/)?app\/([a-zA-Z0-9-]+\/)?id[1-9][0-9]{5,19}$/;return e.test(n)&&!/id=example\.|[.=]placeholder(\.|$)|id=com\.example(\.|$)/.test(n)||t.test(n)}var Ll=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},Nl=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},df=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))};function jm(n){var e,t,i;n===void 0&&(n={});var r=(e=n.timeoutMs)!==null&&e!==void 0?e:5e3,s=(t=n.pollMs)!==null&&t!==void 0?t:25;if(![r,s].every(function(H){return Number.isFinite(H)&&H>=1&&H<=6e4}))throw Error("Invalid Unity host deadline/poll interval");var a=(i=n.getHost)!==null&&i!==void 0?i:(function(){return window.mraid}),o=new Set,c=new Set,l=[],u={},d=!1,h=!1,m=!1,x=!1,w=!1,g=!1,p,v,b,_,I,A,P=function(){return m||x};function y(){var H,B,Z;clearTimeout(I),clearTimeout(A);try{for(var J=Ll(l.splice(0)),fe=J.next();!fe.done;fe=J.next()){var Me=Nl(fe.value,2),oe=Me[0],pe=Me[1];try{(Z=u.mraid)===null||Z===void 0||Z.removeEventListener(oe,pe)}catch{}}}catch(Ue){H={error:Ue}}finally{try{fe&&!fe.done&&(B=J.return)&&B.call(J)}finally{if(H)throw H.error}}}function C(H){_?.(H instanceof Error?H:Error(String(H))),b=void 0,_=void 0}function O(H){var B,Z;if(!P()){var J=d;if(m=!0,d=!1,h=!1,y(),C(H),J)try{for(var fe=Ll(df([],Nl(c),!1)),Me=fe.next();!Me.done;Me=fe.next()){var oe=Me.value;oe()}}catch(pe){B={error:pe}}finally{try{Me&&!Me.done&&(Z=fe.return)&&Z.call(fe)}finally{if(B)throw B.error}}o.clear(),c.clear()}}function E(H,B){return l.push([H,B]),u.mraid.addEventListener(H,B),G(H,B)}function G(H,B){if(P()){try{u.mraid.removeEventListener(H,B)}catch{}return!1}return!0}function L(H){var B,Z;if(!P()){if(typeof H!="boolean"){O(Error("Invalid Unity viewability event"));return}if(!d){p=H;return}if(h!==H){h=H;try{for(var J=Ll(df([],Nl(o),!1)),fe=J.next();!fe.done;fe=J.next()){var Me=fe.value;if(P())break;Me(h)}}catch(oe){B={error:oe}}finally{try{fe&&!fe.done&&(Z=J.return)&&Z.call(J)}finally{if(B)throw B.error}}}}}var M=function(H){H==="hidden"&&O(Error("Unity host closed"))},N=function(){var H;d&&!P()&&((H=n.onResize)===null||H===void 0||H.call(n))};function z(){var H,B,Z,J;if(!(!w||d||g||P())){g=!0;try{var fe=u.mraid.getState();if(P()||fe==="loading")return;if(fe==="hidden")throw Error("Unity host closed before ready");if(!["default","expanded","resized"].includes(fe))throw Error("Invalid Unity host state");var Me=u.mraid.getVersion();if(P())return;if(Me!=="3.0")throw Error("Unity Ads UA requires MRAID 3.0");try{for(var oe=Ll([["viewableChange",L],["stateChange",M],["sizeChange",N]]),pe=oe.next();!pe.done;pe=oe.next()){var Ue=Nl(pe.value,2),ne=Ue[0],te=Ue[1];if(!E(ne,te))return}}catch(It){H={error:It}}finally{try{pe&&!pe.done&&(B=oe.return)&&B.call(oe)}finally{if(H)throw H.error}}var Te=u.mraid.isViewable();if(P())return;if(typeof Te!="boolean")throw Error("Invalid Unity initial viewability");h=p??Te,d=!0,clearTimeout(I),clearTimeout(A),b?.(),b=void 0,_=void 0;try{for(var Fe=Ll(df([],Nl(o),!1)),Pe=Fe.next();!Pe.done;Pe=Fe.next()){var at=Pe.value;if(P())break;at(h)}}catch(It){Z={error:It}}finally{try{Pe&&!Pe.done&&(J=Fe.return)&&J.call(Fe)}finally{if(Z)throw Z.error}}}catch(It){O(It)}finally{g=!1}}}function q(){if(!P())try{var H=a();if(P())return;if(!H){A=setTimeout(q,s);return}if(u.mraid=H,l.push(["ready",z]),u.mraid.addEventListener("ready",z),!G("ready",z))return;w=!0,z()}catch(B){O(B)}}return{init:function(){return v||(v=new Promise(function(H,B){b=H,_=B}),P()?(C(Error("Unity bridge destroyed")),v):(I=setTimeout(function(){return O(Error("Unity MRAID readiness timed out"))},r),q(),v))},isReady:function(){return d&&!P()},isVisible:function(){return d&&h&&!P()},isClosed:P,onVisibilityChanged:function(H){return P()||o.add(H),function(){return o.delete(H)}},onClosed:function(H){return P()||c.add(H),function(){return c.delete(H)}},openStore:function(H){if(!d||!h||P()||!oh(H))throw Error("Unity store request not permitted");u.mraid.open(H)},destroy:function(){x||(x=!0,d=!1,h=!1,y(),C(Error("Unity bridge destroyed")),o.clear(),c.clear())}}}var lo=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},co=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},ff=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))};function e0(n){var e;n===void 0&&(n={});var t=(e=n.getHost)!==null&&e!==void 0?e:(function(){return window.mraid}),i,r=!1,s=!1,a=!1,o=!1,c=!1,l,u,d,h,m,x=new Set,w=new Set,g=[];function p(){var E,G;clearTimeout(h),clearTimeout(m);try{for(var L=lo(g.splice(0)),M=L.next();!M.done;M=L.next()){var N=co(M.value,2),z=N[0],q=N[1];try{i?.removeEventListener(z,q)}catch{}}}catch(H){E={error:H}}finally{try{M&&!M.done&&(G=L.return)&&G.call(L)}finally{if(E)throw E.error}}}function v(E,G){if(g.push([E,G]),i.addEventListener(E,G),a||o){try{i.removeEventListener(E,G)}catch{}return!1}return!0}function b(E){var G=E instanceof Error?E:Error(String(E));d?.(G),u=void 0,d=void 0}function _(E,G){var L,M;if(!(a||o)&&(a=!0,r=!1,s=!1,p(),b(E),G))try{for(var N=lo(ff([],co(w),!1)),z=N.next();!z.done;z=N.next()){var q=z.value;q()}}catch(H){L={error:H}}finally{try{z&&!z.done&&(M=N.return)&&M.call(N)}finally{if(L)throw L.error}}}function I(){var E,G,L,M;if(!(!c||r||a||o))try{var N=i.getState();if(a||o||N==="loading")return;if(N==="hidden"){_(Error("MRAID closed before ready"),!0);return}if(!["default","expanded","resized"].includes(N))throw Error("Invalid MRAID state");try{for(var z=lo([["viewableChange",P],["stateChange",y],["sizeChange",C]]),q=z.next();!q.done;q=z.next()){var H=co(q.value,2),B=H[0],Z=H[1];if(!v(B,Z))return}}catch(oe){E={error:oe}}finally{try{q&&!q.done&&(G=z.return)&&G.call(z)}finally{if(E)throw E.error}}var J=i.isViewable();if(a||o)return;if(typeof J!="boolean")throw Error("Invalid MRAID viewability");s=J,r=!0,clearTimeout(h),clearTimeout(m),u?.(),u=void 0,d=void 0;try{for(var fe=lo(ff([],co(x),!1)),Me=fe.next();!Me.done;Me=fe.next()){var Z=Me.value;Z(s)}}catch(oe){L={error:oe}}finally{try{Me&&!Me.done&&(M=fe.return)&&M.call(fe)}finally{if(L)throw L.error}}}catch(oe){_(oe,r)}}var A=function(){return I()},P=function(E){var G,L;if(!(!r||a||o)){if(typeof E!="boolean"){_(Error("Invalid MRAID visibility event"),!0);return}s=E;try{for(var M=lo(ff([],co(x),!1)),N=M.next();!N.done;N=M.next()){var z=N.value;z(s)}}catch(q){G={error:q}}finally{try{N&&!N.done&&(L=M.return)&&L.call(M)}finally{if(G)throw G.error}}}},y=function(E){E==="hidden"&&_(Error("MRAID closed"),!0)},C=function(){var E;r&&!a&&!o&&((E=n.onResize)===null||E===void 0||E.call(n))};function O(){var E,G,L;if(!(a||o))try{if(i=t(),a||o)return;if(!i){m=setTimeout(O,(L=n.pollMs)!==null&&L!==void 0?L:50);return}if(![i.getState,i.isViewable,i.addEventListener,i.removeEventListener,i.open].every(function(B){return typeof B=="function"}))throw Error("Incomplete MRAID 2 interface");try{for(var M=lo([["ready",A]]),N=M.next();!N.done;N=M.next()){var z=co(N.value,2),q=z[0],H=z[1];if(!v(q,H))return}}catch(B){E={error:B}}finally{try{N&&!N.done&&(G=M.return)&&G.call(M)}finally{if(E)throw E.error}}c=!0,I()}catch(B){_(B,!1)}}return{init:function(){var E;return l||(l=new Promise(function(G,L){u=G,d=L}),a||o?(b(Error("MRAID bridge destroyed")),l):(h=setTimeout(function(){return _(Error("MRAID readiness timed out"),!1)},(E=n.timeoutMs)!==null&&E!==void 0?E:5e3),O(),l))},isReady:function(){return r&&!a&&!o},isVisible:function(){return s&&r&&!a&&!o},isClosed:function(){return a||o},onVisibilityChanged:function(E){return!a&&!o&&x.add(E),function(){return x.delete(E)}},onClosed:function(E){return!a&&!o&&w.add(E),function(){return w.delete(E)}},openStore:function(E){if(!r||!s||a||o||!oh(E))throw Error("MRAID store request not permitted");i.open(E)},destroy:function(){o||(o=!0,r=!1,s=!1,p(),b(Error("MRAID bridge destroyed")),x.clear(),w.clear())}}}var Pt=function(){return Pt=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++){e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},Pt.apply(this,arguments)},DM=function(n,e,t,i){function r(s){return s instanceof t?s:new t(function(a){a(s)})}return new(t||(t=Promise))(function(s,a){function o(u){try{l(i.next(u))}catch(d){a(d)}}function c(u){try{l(i.throw(u))}catch(d){a(d)}}function l(u){u.done?s(u.value):r(u.value).then(o,c)}l((i=i.apply(n,e||[])).next())})},UM=function(n,e){var t={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},i,r,s,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=o(0),a.throw=o(1),a.return=o(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(l){return function(u){return c([l,u])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(t=0)),t;)try{if(i=1,r&&(s=l[0]&2?r.return:l[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,l[1])).done)return s;switch(r=0,s&&(l=[l[0]&2,s.value]),l[0]){case 0:case 1:s=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,r=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(s=t.trys,!(s=s.length>0&&s[s.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!s||l[1]>s[0]&&l[1]<s[3])){t.label=l[1];break}if(l[0]===6&&t.label<s[1]){t.label=s[1],s=l;break}if(s&&t.label<s[2]){t.label=s[2],t.ops.push(l);break}s[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(u){l=[6,u],r=0}finally{i=s=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},De=function(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(o){a={error:o}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s},Je=function(n,e,t){if(t||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return n.concat(s||Array.prototype.slice.call(e))},Qe=function(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function n0(n){if(n!=="standalone"){if(n==="unity-ads-ua-playable")return jm();if(n==="applovin-growth-playable")return e0();throw Error("E_NATIVE_TARGET")}}function pf(n){var e=[{id:"sdk-top-left",left:0,top:0,right:Math.min(48,n.width),bottom:Math.min(48,n.height)},{id:"sdk-top-right",left:Math.max(0,n.width-56),top:0,right:n.width,bottom:Math.min(56,n.height)},{id:"sdk-bottom-left",left:0,top:Math.max(0,n.height-28),right:Math.min(48,n.width),bottom:n.height}];return{left:Math.min(48,n.width),top:Math.min(56,n.height),right:Math.max(0,n.width-56),bottom:Math.max(0,n.height-28),zones:e}}function lh(n,e){var t,i,r=(i=(t=n.measureText)===null||t===void 0?void 0:t.call(n,e))===null||i===void 0?void 0:i.width,s=/(\d+(?:\.\d+)?)px/.exec(n.font||"");return Number.isFinite(r)?r:Je([],De(e),!1).length*(s?Number(s[1]):16)*.6}function t0(n,e,t,i){var r,s,a,o,c,l,u;n.font=t.fontWeight+" "+i+"px "+t.fontFamily;var d=Math.max(0,t.width-2*((u=t.padding)!==null&&u!==void 0?u:4)),h=[];try{for(var m=Qe(String(e).split(`
`)),x=m.next();!x.done;x=m.next()){var w=x.value;if(t.wrap===!1){h.push(w);continue}var g=w.trim()?w.trim().split(/\s+/):[""],p=void 0;try{for(var v=(a=void 0,Qe(g)),b=v.next();!b.done;b=v.next()){var _=b.value,I=p?p+" "+_:_;if(lh(n,I)<=d){p=I;continue}if(p&&h.push(p),lh(n,_)<=d){p=_;continue}var A="";try{for(var P=(c=void 0,Qe(_)),y=P.next();!y.done;y=P.next()){var C=y.value;A&&lh(n,A+C)>d?(h.push(A),A=C):A+=C}}catch(O){c={error:O}}finally{try{y&&!y.done&&(l=P.return)&&l.call(P)}finally{if(c)throw c.error}}p=A}}catch(O){a={error:O}}finally{try{b&&!b.done&&(o=v.return)&&o.call(v)}finally{if(a)throw a.error}}h.push(p)}}catch(O){r={error:O}}finally{try{x&&!x.done&&(s=m.return)&&s.call(m)}finally{if(r)throw r.error}}return h}function i0(n,e,t){var i,r,s=(i=t.padding)!==null&&i!==void 0?i:4,a=Math.max(0,t.width-2*s),o=Math.max(0,t.height-2*s),c=Math.min(t.fontSize,(r=t.minFontSize)!==null&&r!==void 0?r:12),l=t.fontSize,u=t0(n,e,t,l),d,h=function(){var m;n.font=t.fontWeight+" "+l+"px "+t.fontFamily;var x=Math.max.apply(Math,Je([0],De(u.map(function(v){return lh(n,v)})),!1)),w=l*((m=t.lineHeight)!==null&&m!==void 0?m:1.2),g=u.length>16;g&&(u=u.slice(0,16));var p=u.length*w;return{lines:u,fontSize:l,scale:l/t.fontSize,renderedWidth:x,renderedHeight:p,availableWidth:a,availableHeight:o,padding:s,lineHeight:w,overflowsWidth:x>a+.01,overflowsHeight:g||p>o+.01,unsupportedChars:[]}};if(d=h(),t.autoFit!==!1)for(;(d.overflowsWidth||d.overflowsHeight)&&l>c;)l=Math.max(c,l-1),u=t0(n,e,t,l),d=h();return d}function FM(n,e,t){var i=i0(n,e,t),r=i.padding;n.fillStyle=t.color,n.font=t.fontWeight+" "+i.fontSize+"px "+t.fontFamily,n.textAlign=t.align,n.textBaseline="middle";var s=t.align==="left"?r:t.align==="right"?t.width-r:t.width/2,a=(t.height-i.renderedHeight)/2;return i.lines.forEach(function(o,c){return n.fillText(o,s,a+(c+.5)*i.lineHeight)}),i}function OM(n,e,t){var i,r,s,a,o,c=t===void 0?{}:t,l=c.edit,u=l===void 0?!1:l,d=c.sceneId,h=d===void 0?n.base.startScene:d,m=c.onSelect,x=m===void 0?function(){}:m,w=c.network,g=w===void 0?"standalone":w,p=n0(g),v=e.getContext("2d"),b=new Map(n.components.map(function(f){return[f.id,f]})),_=new Map(n.assets.map(function(f){return[f.id,f]})),I=new Map,A=new Map(n.events.map(function(f){return[f.id,f]})),P=new Map(n.gameplay.filter(function(f){return f.kind==="responsive-layout"}).map(function(f){return[f.componentId,f.parameters]})),y=(s=globalThis.matchMedia)===null||s===void 0?void 0:s.call(globalThis,"(prefers-reduced-motion: reduce)"),C,O=new Map,E=O;function G(){var f=P.size>0&&e.clientWidth>e.clientHeight;return{width:f?Math.max(n.base.width,n.base.height):n.base.width,height:f?Math.min(n.base.width,n.base.height):n.base.height,landscape:f}}function L(){C!==G().landscape&&(ae(),nr())}try{for(var M=Qe(n.assets),N=M.next();!N.done;N=M.next()){var z=N.value;if(z.mime.startsWith("image/")){var q=new Image;q.src="data:"+z.mime+";base64,"+z.data,I.set(z.id,q)}}}catch(f){i={error:f}}finally{try{N&&!N.done&&(r=M.return)&&r.call(M)}finally{if(i)throw i.error}}var H=h,B={},Z=[],J=[],fe=[],Me=[],oe=new Set,pe=0,Ue=0,ne=0,te=0,Te=0,Fe=!1,Pe=0,at=0,It=!1,lt=[],qe,zt,We,ft,Jt,en,Lt,Wt,W,$t=[],Nt,D=[],S=[],ee,le=0,ve=!1,Le=0,ke=g==="standalone",ye=g==="standalone",ge=g==="standalone",Ge=!1,pt=!1,Ee=new Map,Ye=new Map,$e=new Map,gt=new Map,Et=new Set,Q=new Map,Ze=new Set,be=new Map,Ke=new Map,rt=new Map,Re=new Map,et=new Map,Be=new Map,He=0,kt=0,_t,Ft,vn=new Map,ut=new Map,Sn=new Map,gn=new Map,zi=new Map,Si=new Map,ri=new Map,St,Kn=1,Hn=1,si=new Map,bn=new Map,Qt=new Map,Dt,wn;n.components.some(function(f){return f.contract==="native.stage3d.v1"})&&(wn=Gm(n,_,function(){pt||Promise.resolve().then(function(){pt||nr()})}));var ln=function(f){var R;return(R=$e.get(f))!==null&&R!==void 0?R:b.get(f)},es=function(){var f,R;He++,Ze.clear(),be.clear(),rt.clear(),Re.clear();try{for(var F=Qe(Et),U=F.next();!U.done;U=F.next()){var k=U.value;try{k.stop()}catch{}}}catch(Y){f={error:Y}}finally{try{U&&!U.done&&(R=F.return)&&R.call(F)}finally{if(f)throw f.error}}Et.clear(),Ke.clear()},vr=function(f){var R,F;if(!St||f!==void 0&&St.pointerId!==f)return!1;var U=St.pointerId;St.behavior.parameters.powerVariableId&&(B[St.behavior.parameters.powerVariableId]=0),St=void 0;try{!((R=e.hasPointerCapture)===null||R===void 0)&&R.call(e,U)&&((F=e.releasePointerCapture)===null||F===void 0||F.call(e,U))}catch{}return!0},tr=function(f){var R,F,U;if(!Dt||f!==void 0&&Dt.pointerId!==f)return!1;var k=Dt.pointerId;Dt.behavior.parameters.powerVariableId&&(B[Dt.behavior.parameters.powerVariableId]=0),(R=wn?.getStage(b.get(Dt.stageId)))===null||R===void 0||R.setGuide([]),Dt=void 0;try{!((F=e.hasPointerCapture)===null||F===void 0)&&F.call(e,k)&&((U=e.releasePointerCapture)===null||U===void 0||U.call(e,k))}catch{}return!0},ts=function(f){var R,F;if(!We||f!==void 0&&We.pointerId!==f)return!1;var U=We.pointerId;We=void 0;try{!((R=e.hasPointerCapture)===null||R===void 0)&&R.call(e,U)&&((F=e.releasePointerCapture)===null||F===void 0||F.call(e,U))}catch{}return!0},Lr=function(f){var R,F;Nt?.pointerId===f.pointerId&&(Nt=void 0);try{for(var U=Qe(et.values()),k=U.next();!k.done;k=U.next()){var Y=k.value;Y.pointerId===f.pointerId&&Y.held&&(Y.held=!1,Y.releasedAt=pe)}}catch(se){R={error:se}}finally{try{k&&!k.done&&(F=U.return)&&F.call(U)}finally{if(R)throw R.error}}var V=ts(f.pointerId);return en===f.pointerId?(Jt=void 0,en=void 0,!0):V},T=function(f){var R,F,U,k,Y,V,se,$;We&&((se=$e.get(We.targetId))===null||se===void 0?void 0:se.instanceId)===f&&ts(),St&&(($=$e.get(St.targetId))===null||$===void 0?void 0:$.instanceId)===f&&vr();var ce=[];Z=Z.filter(function(Ve){return Ve.id!==f});try{for(var j=Qe($e),he=j.next();!he.done;he=j.next()){var ie=De(he.value,2),de=ie[0],X=ie[1];if(X.instanceId===f){ce.push(de),$e.delete(de),Ee.delete(de),gt.delete(de),Sn.delete(de),zi.delete(de),Si.delete(de);try{for(var _e=(U=void 0,Qe(gn.values())),Se=_e.next();!Se.done;Se=_e.next()){var Ie=Se.value;Ie.removeAgent(de)}}catch(Ve){U={error:Ve}}finally{try{Se&&!Se.done&&(k=_e.return)&&k.call(_e)}finally{if(U)throw U.error}}try{for(var Ce=(Y=void 0,Qe(Ye.keys())),we=Ce.next();!we.done;we=Ce.next()){var Ne=we.value;Ne.endsWith(":"+de)&&Ye.delete(Ne)}}catch(Ve){Y={error:Ve}}finally{try{we&&!we.done&&(V=Ce.return)&&V.call(Ce)}finally{if(Y)throw Y.error}}}}}catch(Ve){R={error:Ve}}finally{try{he&&!he.done&&(F=j.return)&&F.call(j)}finally{if(R)throw R.error}}fe=fe.filter(function(Ve){return!ce.includes(Ve.targetId)})},K=function(f){for(;f;){if(f.prototype)return f.id;f=ln(f.parentId)}},me=function(){var f,R;return{viewport:G(),components:Object.fromEntries(Je([],De(Ee),!1).map(function(F){var U=De(F,2),k=U[0],Y=U[1];return[k,Pt(Pt({},Y),{parameters:Pt({},Y.parameters)})]})),mode:u?"edit":"play",scene:H,variables:Pt({},B),time:pe,instances:Z.map(function(F){return{id:F.id,prototypeId:F.prototypeId,x:F.transform[4],y:F.transform[5]}}),particles:J.length,animations:fe.length,contacts:oe.size,spriteFrames:Object.fromEntries(Je([],De(gt),!1).map(function(F){var U,k=De(F,2),Y=k[0],V=k[1];return[Y,(U=V.frame)!==null&&U!==void 0?U:0]})),input:{dragging:!!We,pointerId:(f=We?.pointerId)!==null&&f!==void 0?f:null,pressed:Jt??null},feedback:{presses:et.size,floatingTexts:D.length,flashes:S.length,shaking:!!ee,tutorialHands:Le},match:{boards:Object.fromEntries(Je([],De(vn),!1).map(function(F){var U=De(F,2),k=U[0],Y=U[1];return[k,Y.snapshot()]})),selected:_t??null,cells:Je([],De(Be),!1).map(function(F){var U=De(F,2),k=U[0],Y=U[1];return Pt({id:k},Y)})},physics:On(),physics3d:Zs(),paths:Object.fromEntries(Je([],De(gn),!1).map(function(F){var U=De(F,2),k=U[0],Y=U[1];return[k,Y.snapshot()]})),audio:{state:(R=qe?.state)!==null&&R!==void 0?R:"locked",voices:Et.size,blocked:kt},network:{target:g,ready:ye,visible:ge,started:ke,closed:Ge},diagnostics:Je([],De(lt),!1)}},ue=function(){return!u&&!Fe&&!document.hidden&&ye&&ge&&ke&&!Ge},ae=function(){var f,R;Nt=void 0,vr(),tr(),ts(),Ft=void 0;try{for(var F=Qe(vn.values()),U=F.next();!U.done;U=F.next()){var k=U.value;k.cancelSelection()}}catch(Y){f={error:Y}}finally{try{U&&!U.done&&(R=F.return)&&R.call(F)}finally{if(f)throw f.error}}vn.size&&(_t=void 0),Jt=void 0,en=void 0,et.clear()},Xe=function(f){It=!0,lt.push(f),lt=lt.slice(-16),Me=[]},Ae=function(f){var R,F,U;return Pt(Pt(Pt({},f.parameters),f.prototypeId?(R=Ee.get(f.prototypeId))===null||R===void 0?void 0:R.parameters:{}),(U=Ee.get((F=f.runtimeId)!==null&&F!==void 0?F:f.id))===null||U===void 0?void 0:U.parameters)};function it(f,R){var F,U=et.get(f.id);if(!U||y?.matches)return R;var k=Je([],De(R),!1),Y=U.held?0:pe-((F=U.releasedAt)!==null&&F!==void 0?F:pe),V=U.held?0:Math.min(1,Y/U.behavior.springBackSeconds),se=U.held?U.behavior.scaleDown:U.behavior.scaleDown+(1-U.behavior.scaleDown)*(1-Math.pow(1-V,3)),$=Ae(f);k[4]+=(1-se)*(k[0]*$.width+k[2]*$.height)/2,k[5]+=(1-se)*(k[1]*$.width+k[3]*$.height)/2;for(var ce=0;ce<4;ce++)k[ce]*=se;return k}function st(f){var R,F,U,k,Y,V,se,$=f.transform,ce=(U=(F=Ee.get((R=f.runtimeId)!==null&&R!==void 0?R:f.id))===null||F===void 0?void 0:F.transform)!==null&&U!==void 0?U:$,j=P.get((k=f.prototypeId)!==null&&k!==void 0?k:f.id);if(!j)return it(f,ce);var he=G(),ie=Je([],De(ce),!1);he.landscape&&(ie[4]+=j.x-$[4],ie[5]+=j.y-$[5],ie[0]*=j.scaleX,ie[1]*=j.scaleX,ie[2]*=j.scaleY,ie[3]*=j.scaleY);var de=(Y=j.anchor)!==null&&Y!==void 0?Y:"none";if(de==="none"&&!j.respectSafeArea)return it(f,ie);var X=j.respectSafeArea?pf(he):{left:0,top:0,right:he.width,bottom:he.height},_e=Ae(f),Se=(V=j.marginX)!==null&&V!==void 0?V:0,Ie=(se=j.marginY)!==null&&se!==void 0?se:0,Ce=Math.abs(ie[0])*_e.width+Math.abs(ie[2])*_e.height,we=Math.abs(ie[1])*_e.width+Math.abs(ie[3])*_e.height;return de!=="none"?(ie[4]=de.endsWith("left")?X.left+Se:de.endsWith("right")?X.right-Ce-Se:(X.left+X.right-Ce)/2,ie[5]=de.startsWith("top")?X.top+Ie:de.startsWith("bottom")?X.bottom-we-Ie:(X.top+X.bottom-we)/2):(ie[4]=Math.max(X.left+Se,Math.min(X.right-Ce-Se,ie[4])),ie[5]=Math.max(X.top+Ie,Math.min(X.bottom-we-Ie,ie[5]))),it(f,ie)}var bt=function(f){return($e.has(f)?Je([],De($e.values()),!1):Je(Je([],De(n.components),!1),De(Z),!1)).filter(function(R){return R.parentId===f&&!R.prototype}).sort(function(R,F){return R.order-F.order||(R.id<F.id?-1:R.id>F.id?1:0)})},Yt=function(){return n.components.filter(function(f){return f.sceneId===H&&!f.parentId&&!f.prototype}).sort(function(f,R){return f.order-R.order||(f.id<R.id?-1:f.id>R.id?1:0)})},Ct=function(f){if(Me.length>=256){Xe("Event queue budget exhausted");return}Me.push(f)};function mt(f){if(!f)return!0;if(f.all)return f.all.every(mt);if(f.any)return f.any.some(mt);var R=B[f.variableId],F=f.compareVariableId?B[f.compareVariableId]:f.value;return{eq:function(){return R===F},ne:function(){return R!==F},lt:function(){return R<F},lte:function(){return R<=F},gt:function(){return R>F},gte:function(){return R>=F}}[f.op]()}function xn(f){var R,F,U;_t=void 0,Ft=void 0,f||Be.clear();try{for(var k=Qe(n.gameplay),Y=k.next();!Y.done;Y=k.next()){var V=Y.value;if(V.kind==="match-tile"){var se=b.get(V.componentId);if(f&&se.id!==f&&!gr(se,f))continue;Ee.delete(se.id),Be.set(se.id,{row:V.parameters.row,column:V.parameters.column,group:V.parameters.group,sceneId:se.sceneId,boardId:(U=se.parentId)!==null&&U!==void 0?U:se.sceneId})}}}catch($){R={error:$}}finally{try{Y&&!Y.done&&(F=k.return)&&F.call(k)}finally{if(R)throw R.error}}}function Wn(){var f,R,F=function(V){var se,$;if(vn.has(V.componentId))return"continue";var ce=V.componentId,j=V.parameters,he=n.gameplay.filter(function(Ne){return Ne.kind==="match-tile"&&b.get(Ne.componentId).parentId===ce}).sort(function(Ne,Ve){return Ne.parameters.row-Ve.parameters.row||Ne.parameters.column-Ve.parameters.column}).map(function(Ne){return Pt({id:Ne.componentId},Ne.parameters)}),ie=new Map;try{for(var de=(se=void 0,Qe(he)),X=de.next();!X.done;X=de.next()){var _e=X.value;if(!ie.has(_e.group)){var Se=b.get(_e.id);ie.set(_e.group,{fill:Se.parameters.fill,children:bt(_e.id).filter(function(Ne){return["native.image.v1","native.text.v1"].includes(Ne.contract)})})}}}catch(Ne){se={error:Ne}}finally{try{X&&!X.done&&($=de.return)&&$.call(de)}finally{if(se)throw se.error}}ut.set(ce,ie);var Ie=b.get(he[j.columns].id).transform[5]-b.get(he[0].id).transform[5],Ce=function(Ne,Ve,ze){var Oe,tt=ze.from,dt=tt===void 0?Ne:tt,je=ze.progress,At=je===void 0?0:je,Tt=ze.offsetRows,Gt=Tt===void 0?0:Tt,vt=ze.scale,xt=vt===void 0?1:vt,Zt=ze.opacity,Ot=Zt===void 0?1:Zt,nt=he[Ne],ot=b.get(nt.id),Vt=b.get(he[dt].id),Cn=ie.get(Ve),Ut=Je([],De(ot.transform),!1);Ut[4]+=(Vt.transform[4]-ot.transform[4])*At,Ut[5]+=(Vt.transform[5]-ot.transform[5]+Gt*Ie)*At,Ut[4]+=(1-xt)*(Ut[0]*ot.parameters.width+Ut[2]*ot.parameters.height)/2,Ut[5]+=(1-xt)*(Ut[1]*ot.parameters.width+Ut[3]*ot.parameters.height)/2;for(var nn=0;nn<4;nn++)Ut[nn]*=xt;Ee.set(nt.id,Pt(Pt({},Ee.get(nt.id)),{transform:Ut,parameters:Pt(Pt({},(Oe=Ee.get(nt.id))===null||Oe===void 0?void 0:Oe.parameters),{fill:Cn.fill,opacity:Ot})})),Be.get(nt.id).group=Ve;var Bn=bt(nt.id).filter(function(Rn){return["native.image.v1","native.text.v1"].includes(Rn.contract)});Bn.forEach(function(Rn,pn){var Fn,jt,_n=Cn.children[pn];if(!(!_n||_n.contract!==Rn.contract)){var ai=(Fn=Ee.get(Rn.id))!==null&&Fn!==void 0?Fn:{transform:Je([],De(Rn.transform),!1),parameters:{}};Rn.contract==="native.image.v1"?ai.assetId=(jt=_n.assetSlots[0])===null||jt===void 0?void 0:jt.assetId:ai.parameters.text=_n.parameters.text,Ee.set(Rn.id,ai)}})},we=Lf(Pt(Pt({},j),{slots:he,paint:Ce,onEvent:function(Ne){_t=void 0,Ct({kind:Ne,componentId:ce})}}));vn.set(ce,we)};try{for(var U=Qe(n.gameplay.filter(function(V){return V.kind==="match-board"})),k=U.next();!k.done;k=U.next()){var Y=k.value;F(Y)}}catch(V){f={error:V}}finally{try{k&&!k.done&&(R=U.return)&&R.call(U)}finally{if(f)throw f.error}}}function An(f){var R,F;Wn();try{for(var U=Qe(vn),k=U.next();!k.done;k=U.next()){var Y=De(k.value,2),V=Y[0],se=Y[1];(!f||f===V||gr(b.get(V),f))&&se.reset()}}catch($){R={error:$}}finally{try{k&&!k.done&&(F=U.return)&&F.call(U)}finally{if(R)throw R.error}}}function tn(f){return K(f)?Je([],De($e.values()),!1).filter(function(R){return R.prototypeId===f.id}):[f]}function Jn(f,R,F){var U,k=Ae(f),Y=(U=Ee.get(f.id))!==null&&U!==void 0?U:{transform:Je([],De(f.transform),!1),parameters:{}},V=Je([],De(Y.transform),!1),se=f.parentId?In(ln(f.parentId)):cs(),$=Mn(Es(se),R,F);V[4]=$.x-(V[0]*k.width+V[2]*k.height)/2,V[5]=$.y-(V[1]*k.width+V[3]*k.height)/2,Ee.set(f.id,Pt(Pt({},Y),{transform:V})),f.prototypeId&&(f.transform=Je([],De(V),!1))}function ht(f,R,F){var U,k,Y,V;F===void 0&&(F=!1);var se=(U=Ee.get(f.id))!==null&&U!==void 0?U:{transform:Je([],De(f.transform),!1),parameters:{}},$=(V=(Y=b.get((k=f.prototypeId)!==null&&k!==void 0?k:f.id))===null||Y===void 0?void 0:Y.transform)!==null&&V!==void 0?V:f.transform,ce=Math.hypot($[0],$[1])*(F?-1:1),j=Math.hypot($[2],$[3]),he=R+(F?0:Math.atan2($[1],$[0])),ie=Math.cos(he),de=Math.sin(he),X=Je([],De(se.transform),!1);X[0]=ie*ce,X[1]=de*ce,X[2]=-de*j,X[3]=ie*j,Ee.set(f.id,Pt(Pt({},se),{transform:X}))}function Un(f,R){var F=Sn.get(f.id);if(F)return F;var U=In(f),k=Ae(f),Y=Mn(U,k.width/2,k.height/2);return F=Pt({id:f.id,sourceId:R.componentId,instanceId:f.instanceId,x:Y.x,y:Y.y,vx:0,vy:0,width:Math.hypot(U[0],U[1])*k.width,height:Math.hypot(U[2],U[3])*k.height,angle:Math.atan2(U[1],U[0]),restElapsed:0,atRest:!0},R.parameters),Sn.set(f.id,F),F}function an(){var f,R,F,U,k,Y,V,se,$,ce,j,he,ie=new Set,de=[];try{for(var X=Qe(n.gameplay.filter(function(Ut){return Ut.kind==="physics-body"})),_e=X.next();!_e.done;_e=X.next()){var Se=_e.value,Ie=b.get(Se.componentId);if(Ie.sceneId===H)try{for(var Ce=(F=void 0,Qe(tn(Ie))),we=Ce.next();!we.done;we=Ce.next()){var Ne=we.value;if(xi(Ne)){if(de.length>=64){Xe("Physics body budget exhausted");break}var Ve=Un(Ne,Se),ze=In(Ne),Oe=Ae(Ne),tt=Mn(ze,Oe.width/2,Oe.height/2);if(ie.add(Ne.id),Ve.width=Math.hypot(ze[0],ze[1])*Oe.width,Ve.height=Math.hypot(ze[2],ze[3])*Oe.height,Ve.mode!=="dynamic"){var dt=zi.get(Ne.id),je=Ne.parentId?In(ln(Ne.parentId)):cs(),At=(j=dt?.vx)!==null&&j!==void 0?j:0,Tt=(he=dt?.vy)!==null&&he!==void 0?he:0;Ve.x=tt.x,Ve.y=tt.y,Ve.angle=Math.atan2(ze[1],ze[0]),Ve.vx=je[0]*At+je[2]*Tt,Ve.vy=je[1]*At+je[3]*Tt}else Ve.atRest&&(Ve.x=tt.x,Ve.y=tt.y);de.push(Ve)}}}catch(Ut){F={error:Ut}}finally{try{we&&!we.done&&(U=Ce.return)&&U.call(Ce)}finally{if(F)throw F.error}}}}catch(Ut){f={error:Ut}}finally{try{_e&&!_e.done&&(R=X.return)&&R.call(X)}finally{if(f)throw f.error}}try{for(var Gt=Qe(Sn.keys()),vt=Gt.next();!vt.done;vt=Gt.next()){var xt=vt.value;!ie.has(xt)&&!$e.has(xt)&&Sn.delete(xt)}}catch(Ut){k={error:Ut}}finally{try{vt&&!vt.done&&(Y=Gt.return)&&Y.call(Gt)}finally{if(k)throw k.error}}var Zt=[];try{for(var Ot=Qe(n.gameplay.filter(function(Ut){return Ut.kind==="capture-zone"})),nt=Ot.next();!nt.done;nt=Ot.next()){var Se=nt.value,Ie=b.get(Se.componentId);if(Ie.sceneId===H)try{for(var ot=($=void 0,Qe(tn(Ie))),Vt=ot.next();!Vt.done;Vt=ot.next()){var Ne=Vt.value;if(xi(Ne)){var ze=In(Ne),Oe=Ae(Ne),tt=Mn(ze,Oe.width/2,Oe.height/2),Cn=Math.max(.1,Math.min(Math.hypot(ze[0],ze[1]),Math.hypot(ze[2],ze[3])));Zt.push(Pt(Pt({id:Ne.id,sourceId:Ie.id,instanceId:Ne.instanceId,x:tt.x,y:tt.y},Se.parameters),{radius:Se.parameters.radius*Cn}))}}}catch(Bn){$={error:Bn}}finally{try{Vt&&!Vt.done&&(ce=ot.return)&&ce.call(ot)}finally{if($)throw $.error}}}}catch(Ut){V={error:Ut}}finally{try{nt&&!nt.done&&(se=Ot.return)&&se.call(Ot)}finally{if(V)throw V.error}}return{bodies:de,zones:Zt}}function bi(f){var R,F,U,k=an(),Y=k.bodies,V=k.zones,se=G();Ah({bodies:Y,zones:V,bounds:{left:0,top:0,right:se.width,bottom:se.height},dt:f,onEvent:function(ie,de,X){var _e,Se={kind:ie,componentId:de.sourceId,instanceId:de.instanceId};if(X&&(Se.otherId=X.sourceId),Ct(Se),ie==="zoneCapture"){var Ie=ln(de.id),Ce=b.get(X.sourceId);if(X.hideCaptured&&Ie){var we=(_e=Ee.get(Ie.id))!==null&&_e!==void 0?_e:{transform:Je([],De(Ie.transform),!1),parameters:{}};we.parameters.visible=!1,Ee.set(Ie.id,we)}X.stopBody&&Ce&&Ie&&Jn(Ie,X.x,X.y)}}});try{for(var $=Qe(Y),ce=$.next();!ce.done;ce=$.next()){var j=ce.value,he=ln(j.id);!he||j.mode!=="dynamic"||(j.spinToRotation&&ht(he,(U=j.angle)!==null&&U!==void 0?U:0),Jn(he,j.x,j.y))}}catch(ie){R={error:ie}}finally{try{ce&&!ce.done&&(F=$.return)&&F.call($)}finally{if(R)throw R.error}}}function ki(){var f,R,F,U,k;try{for(var Y=Qe(n.gameplay.filter(function(we){return we.kind==="oscillate"})),V=Y.next();!V.done;V=Y.next()){var se=V.value,$=b.get(se.componentId);if($.sceneId===H)try{for(var ce=(F=void 0,Qe(tn($))),j=ce.next();!j.done;j=ce.next()){var he=j.value,ie=zi.get(he.id);ie||(ie={base:Je([],De(st(he)),!1),vx:0,vy:0},zi.set(he.id,ie));var de=se.parameters,X=(pe/de.periodSeconds+de.phase)*Math.PI*2,_e=Math.sin(X)*de.amplitude,Se=Math.cos(X)*de.amplitude*Math.PI*2/de.periodSeconds,Ie=(k=Ee.get(he.id))!==null&&k!==void 0?k:{parameters:{}},Ce=Je([],De(ie.base),!1);de.axis==="x"?(Ce[4]+=_e,ie.vx=Se,ie.vy=0):(Ce[5]+=_e,ie.vy=Se,ie.vx=0),Ee.set(he.id,Pt(Pt({},Ie),{transform:Ce})),zi.set(he.id,ie)}}catch(we){F={error:we}}finally{try{j&&!j.done&&(U=ce.return)&&U.call(ce)}finally{if(F)throw F.error}}}}catch(we){f={error:we}}finally{try{V&&!V.done&&(R=Y.return)&&R.call(Y)}finally{if(f)throw f.error}}}function pi(){var f,R;gn.clear();var F=function(V){var se=n.gameplay.filter(function(ce){return ce.kind==="path-gate"&&ce.parameters.networkBehaviorId===V.id}),$=Wm({id:V.id,nodes:V.parameters.nodes,edges:V.parameters.edges,gates:se,onEvent:function(ce,j){var he,ie=ln(j.componentId),de=(he=ie?.prototypeId)!==null&&he!==void 0?he:j.componentId;Ct(Pt({kind:ce,componentId:de,instanceId:ie?.instanceId},j.nodeId?{nodeId:j.nodeId}:{}))}});gn.set(V.id,$)};try{for(var U=Qe(n.gameplay.filter(function(V){return V.kind==="path-network"})),k=U.next();!k.done;k=U.next()){var Y=k.value;F(Y)}}catch(V){f={error:V}}finally{try{k&&!k.done&&(R=U.return)&&R.call(U)}finally{if(f)throw f.error}}}function mi(f,R){var F,U,k,Y,V,se,$,ce,j,he,ie,de,X;R===void 0&&(R=!0);var _e=0;try{for(var Se=Qe(n.gameplay.filter(function(Ut){return Ut.kind==="path-agent"})),Ie=Se.next();!Ie.done;Ie=Se.next()){var Ce=Ie.value,we=b.get(Ce.componentId),Ne=gn.get(Ce.parameters.networkBehaviorId);if(!(we.sceneId!==H||!Ne))try{for(var Ve=(k=void 0,Qe(tn(we))),ze=Ve.next();!ze.done;ze=Ve.next()){var Oe=ze.value;if(++_e>64){Xe("Path agent budget exhausted");break}var tt=Ne.getAgent(Oe.id);tt||(tt=Ne.addAgent(Pt(Pt({},Ce.parameters),{id:Oe.id,startNode:(ie=Oe.pathStartNode)!==null&&ie!==void 0?ie:Ce.parameters.startNode,targetNode:(de=Oe.pathTargetNode)!==null&&de!==void 0?de:Ce.parameters.targetNode}))),tt.speedMultiplier=Math.max(0,Number(Ce.parameters.speedMultiplierVariableId?B[Ce.parameters.speedMultiplierVariableId]:1))}}catch(Ut){k={error:Ut}}finally{try{ze&&!ze.done&&(Y=Ve.return)&&Y.call(Ve)}finally{if(k)throw k.error}}}}catch(Ut){F={error:Ut}}finally{try{Ie&&!Ie.done&&(U=Se.return)&&U.call(Se)}finally{if(F)throw F.error}}if(R){var dt=function(Ut,nn){var Bn=n.gameplay.find(function(Rn){return Rn.id===Ut});b.get(Bn.componentId).sceneId===H&&nn.tick(f)};try{for(var je=Qe(gn),At=je.next();!At.done;At=je.next()){var Tt=De(At.value,2),Gt=Tt[0],vt=Tt[1];dt(Gt,vt)}}catch(Ut){V={error:Ut}}finally{try{At&&!At.done&&(se=je.return)&&se.call(je)}finally{if(V)throw V.error}}}try{for(var xt=Qe(n.gameplay.filter(function(Ut){return Ut.kind==="path-agent"})),Zt=xt.next();!Zt.done;Zt=xt.next()){var Ce=Zt.value,we=b.get(Ce.componentId),Ot=gn.get(Ce.parameters.networkBehaviorId);if(!(we.sceneId!==H||!Ot))try{for(var nt=(j=void 0,Qe(tn(we))),ot=nt.next();!ot.done;ot=nt.next()){var Oe=ot.value,tt=Ot.getAgent(Oe.id);if(tt){if(tt.orientToPath==="rotate")ht(Oe,tt.heading);else if(tt.orientToPath==="flip-x")ht(Oe,0,tt.flipX);else if(tt.orientToPath==="iso-4"){var Vt=(X=Ee.get(Oe.id))!==null&&X!==void 0?X:{transform:Je([],De(Oe.transform),!1),parameters:{}};Vt.pathFrame=tt.frame,Ee.set(Oe.id,Vt)}var Cn=Oe.parentId?Mn(In(ln(Oe.parentId)),tt.x,tt.y):tt;Jn(Oe,Cn.x,Cn.y)}}}catch(Bn){j={error:Bn}}finally{try{ot&&!ot.done&&(he=nt.return)&&he.call(nt)}finally{if(j)throw j.error}}}}catch(Ut){$={error:Ut}}finally{try{Zt&&!Zt.done&&(ce=xt.return)&&ce.call(xt)}finally{if($)throw $.error}}}function yn(f){var R,F,U,k,Y,V,se,$,ce,j,he=new Set;try{for(var ie=Qe(n.gameplay.filter(function(_n){return _n.kind==="value-meter"})),de=ie.next();!de.done;de=ie.next()){var X=de.value,_e=b.get(X.componentId);if(_e.sceneId===H)try{for(var Se=(U=void 0,Qe(tn(_e))),Ie=Se.next();!Ie.done;Ie=Se.next()){var Ce=Ie.value,we=X.parameters,Ne=Number(B[we.variableId]),Ve=Si.get(Ce.id);Ve||(Ve={base:Je([],De(st(Ce)),!1),value:Number.isFinite(Ne)?Math.max(we.min,Math.min(we.max,Ne)):we.min},Si.set(Ce.id,Ve)),he.add(Ce.id);var ze=Math.max(we.min,Math.min(we.max,Ne)),Oe=we.smoothingSeconds?1-Math.exp(-f/we.smoothingSeconds):1;Ve.value+=((Number.isFinite(ze)?ze:we.min)-Ve.value)*Oe;var tt=Math.max(0,Math.min(1,(Ve.value-we.min)/(we.max-we.min))),dt=Je([],De(Ve.base),!1),je=(ce=Ee.get(Ce.id))!==null&&ce!==void 0?ce:{parameters:{}},At=we.axis==="x"?Ae(Ce).width:Ae(Ce).height;if(we.axis==="x"?(dt[0]*=tt,dt[1]*=tt):(dt[2]*=tt,dt[3]*=tt),we.direction==="negative"){var Tt=At*(1-tt);we.axis==="x"?(dt[4]+=Ve.base[0]*Tt,dt[5]+=Ve.base[1]*Tt):(dt[4]+=Ve.base[2]*Tt,dt[5]+=Ve.base[3]*Tt)}Ee.set(Ce.id,Pt(Pt({},je),{transform:dt}))}}catch(_n){U={error:_n}}finally{try{Ie&&!Ie.done&&(k=Se.return)&&k.call(Se)}finally{if(U)throw U.error}}}}catch(_n){R={error:_n}}finally{try{de&&!de.done&&(F=ie.return)&&F.call(ie)}finally{if(R)throw R.error}}try{for(var Gt=Qe(Si.keys()),vt=Gt.next();!vt.done;vt=Gt.next()){var xt=vt.value;he.has(xt)||Si.delete(xt)}}catch(_n){Y={error:_n}}finally{try{vt&&!vt.done&&(V=Gt.return)&&V.call(Gt)}finally{if(Y)throw Y.error}}try{for(var Zt=Qe(n.gameplay.filter(function(_n){return _n.kind==="camera-follow"})),Ot=Zt.next();!Ot.done;Ot=Zt.next()){var X=Ot.value,nt=b.get(X.componentId),ze=ln(X.parameters.targetId);if(!(nt.sceneId!==H||!ze)){var ot=ri.get(nt.id);ot||(ot={base:Je([],De(nt.transform),!1),x:X.parameters.minX,y:X.parameters.minY},ri.set(nt.id,ot));var Vt=function(ni,ci){for(var Ci=[],Ri=ni;Ri&&Ri.id!==ci.id;Ri=ln(Ri.parentId))Ci.unshift(Ri);return Ci.reduce(function(jn,zn){return Sa(jn,st(zn))},cs())},dt=gr(ze,nt.id)?Vt(ze,nt):In(ze),we=Ae(ze),Cn=Mn(dt,we.width/2,we.height/2),Ut=G(),nn=X.parameters,Bn=Math.max(nn.minX,nn.maxX-Ut.width/nn.zoom),Rn=Math.max(nn.minY,nn.maxY-Ut.height/nn.zoom),pn=Math.max(nn.minX,Math.min(Bn,Cn.x-Ut.width/(2*nn.zoom))),Fn=Math.max(nn.minY,Math.min(Rn,Cn.y-Ut.height/(2*nn.zoom))),Oe=1-Math.exp(-nn.smoothing*f);ot.x+=(pn-ot.x)*Oe,ot.y+=(Fn-ot.y)*Oe;var je=(j=Ee.get(nt.id))!==null&&j!==void 0?j:{parameters:{}},jt=Je([],De(ot.base),!1);jt[0]*=nn.zoom,jt[1]*=nn.zoom,jt[2]*=nn.zoom,jt[3]*=nn.zoom,jt[4]-=ot.x*nn.zoom,jt[5]-=ot.y*nn.zoom,Ee.set(nt.id,Pt(Pt({},je),{transform:jt}))}}}catch(_n){se={error:_n}}finally{try{Ot&&!Ot.done&&($=Zt.return)&&$.call(Zt)}finally{if(se)throw se.error}}}function On(){return{bodies:Je([],De(Sn.values()),!1).map(function(f){return{id:f.id,sourceId:f.sourceId,x:f.x,y:f.y,vx:f.vx,vy:f.vy,atRest:!!f.atRest,captured:!!f.captured}}),aiming:St?{componentId:St.sourceId,pointerId:St.pointerId,power:St.power}:null}}function Ii(f){for(var R=f;R;){if(R.contract==="native.stage3d.v1")return R;R=R.parentId?ln(R.parentId):void 0}}function fn(f,R){var F,U,k,Y,V,se,$=si.get(f.id);if($)return $;var ce=Ae(f),j=Ii(f);return $=Pt({id:f.id,sourceId:R.componentId,stageId:j?.id,x:(F=ce.x)!==null&&F!==void 0?F:0,y:(U=ce.y)!==null&&U!==void 0?U:0,z:(k=ce.z)!==null&&k!==void 0?k:0,vx:0,vy:0,vz:0,spin:0,atRest:!0,captured:!1,captureElapsed:0,airborne:!1,restElapsed:0,movingTime:0,lastSafe:{x:(Y=ce.x)!==null&&Y!==void 0?Y:0,y:(V=ce.y)!==null&&V!==void 0?V:0,z:(se=ce.z)!==null&&se!==void 0?se:0}},R.parameters),si.set(f.id,$),$}function vi(){var f,R,F,U,k,Y,V,se=[],$=[],ce=[];if(!wn)return{bodies:se,walls:$,zones:ce};try{for(var j=Qe(n.gameplay.filter(function(Ce){return Ce.kind==="physics-3d"})),he=j.next();!he.done;he=j.next()){var ie=he.value,de=b.get(ie.componentId);if(!(!de||de.sceneId!==H||!xi(de))){var X=fn(de,ie);X.mode==="dynamic"?se.push(X):$.push(X)}}}catch(Ce){f={error:Ce}}finally{try{he&&!he.done&&(R=j.return)&&R.call(j)}finally{if(f)throw f.error}}try{for(var _e=Qe(n.gameplay.filter(function(Ce){return Ce.kind==="capture-zone-3d"})),Se=_e.next();!Se.done;Se=_e.next()){var ie=Se.value,de=b.get(ie.componentId);if(!(!de||de.sceneId!==H||!xi(de))){var Ie=Ae(de);ce.push(Pt({id:de.id,sourceId:de.id,x:(k=Ie.x)!==null&&k!==void 0?k:0,y:(Y=Ie.y)!==null&&Y!==void 0?Y:0,z:(V=Ie.z)!==null&&V!==void 0?V:0},ie.parameters))}}}catch(Ce){F={error:Ce}}finally{try{Se&&!Se.done&&(U=_e.return)&&U.call(_e)}finally{if(F)throw F.error}}return{bodies:se,walls:$,zones:ce}}function qi(f){var R,F,U,k,Y,V,se,$,ce,j;if(wn){var he=function(ze){var Oe=b.get(ze.componentId);if(!Oe||Oe.sceneId!==H)return"continue";var tt=bn.get(Oe.id);if(!tt){var dt=Ae(Oe);tt={x:(Y=dt.x)!==null&&Y!==void 0?Y:0,y:(V=dt.y)!==null&&V!==void 0?V:0,z:(se=dt.z)!==null&&se!==void 0?se:0},bn.set(Oe.id,tt)}var je=ze.parameters,At=pe*je.angularSpeed+je.phase,Tt=Math.sin(At)*je.amplitude,Gt=Math.cos(At)*je.amplitude*je.angularSpeed,vt=($=si.get(Oe.id))!==null&&$!==void 0?$:n.gameplay.find(function(ot){return ot.kind==="physics-3d"&&ot.componentId===Oe.id})?fn(Oe,n.gameplay.find(function(ot){return ot.kind==="physics-3d"&&ot.componentId===Oe.id})):void 0,xt=tt.x+(je.axis==="x"?Tt:0),Zt=tt.y+(je.axis==="y"?Tt:0),Ot=tt.z+(je.axis==="z"?Tt:0);if(vt)vt.x=xt,vt.y=Zt,vt.z=Ot,vt.vx=je.axis==="x"?Gt:0,vt.vy=je.axis==="y"?Gt:0,vt.vz=je.axis==="z"?Gt:0;else{var nt=(ce=Ee.get(Oe.id))!==null&&ce!==void 0?ce:{transform:Je([],De(Oe.transform),!1),parameters:{}};nt.parameters.x=xt,nt.parameters.y=Zt,nt.parameters.z=Ot,Ee.set(Oe.id,nt)}};try{for(var ie=Qe(n.gameplay.filter(function(ze){return ze.kind==="oscillate-3d"})),de=ie.next();!de.done;de=ie.next()){var X=de.value;he(X)}}catch(ze){R={error:ze}}finally{try{de&&!de.done&&(F=ie.return)&&F.call(ie)}finally{if(R)throw R.error}}var _e=vi(),Se=_e.bodies,Ie=_e.walls,Ce=_e.zones;Ch({bodies:Se,walls:Ie,zones:Ce,dt:f,onEvent:function(ze,Oe,tt){var dt={kind:ze,componentId:Oe.sourceId};tt&&(dt.otherId=tt.sourceId),Ct(dt)}});try{for(var we=Qe(Se),Ne=we.next();!Ne.done;Ne=we.next()){var Ve=Ne.value;Ve.captured&&(Ve.captureElapsed=((j=Ve.captureElapsed)!==null&&j!==void 0?j:0)+f)}}catch(ze){U={error:ze}}finally{try{Ne&&!Ne.done&&(k=we.return)&&k.call(we)}finally{if(U)throw U.error}}}}function ys(f){var R,F,U;if(!wn)return null;var k=ln(f);if(!k||k.contract!=="native.mesh3d.v1")return null;var Y=Ii(k);if(!Y)return null;var V=wn.getStage(Y);if(!V||!V.lastWidth||!V.lastHeight)return null;var se=si.get(k.id),$=Ae(k),ce=V.project({x:se?se.x:(R=$.x)!==null&&R!==void 0?R:0,y:se?se.y:(F=$.y)!==null&&F!==void 0?F:0,z:se?se.z:(U=$.z)!==null&&U!==void 0?U:0},V.lastWidth,V.lastHeight);return Mn(In(Y),ce.x,ce.y)}function uo(){if(!Dt||!wn)return{vx:0,vz:0,power:0,pull:0};var f=b.get(Dt.stageId),R=wn.getStage(f),F=si.get(Dt.targetId),U=Dt.behavior.parameters;if(!R||!F||!R.lastWidth||!R.lastHeight)return{vx:0,vz:0,power:0,pull:0};var k=Es(In(f)),Y=Mn(k,Dt.start.x,Dt.start.y),V=Mn(k,Dt.current.x,Dt.current.y),se=Math.hypot(Dt.current.x-Dt.start.x,Dt.current.y-Dt.start.y),$=R.unproject(Y.x,Y.y,R.lastWidth,R.lastHeight,F.y),ce=R.unproject(V.x,V.y,R.lastWidth,R.lastHeight,F.y);if(!$||!ce)return{vx:0,vz:0,power:0,pull:se};var j=($.x-ce.x)*U.dragScale,he=($.z-ce.z)*U.dragScale,ie=Math.hypot(j,he);return ie>U.maxSpeed&&(j*=U.maxSpeed/ie,he*=U.maxSpeed/ie),{vx:j,vz:he,power:Math.min(1,Math.hypot(j,he)/Math.max(.001,U.maxSpeed)),pull:se}}function Ys(f){if(!(!Dt||!wn)){Dt.current=f;var R=uo(),F=Dt.behavior.parameters;Dt.power=R.power,F.powerVariableId&&(B[F.powerVariableId]=R.power);var U=b.get(Dt.stageId),k=wn.getStage(U),Y=si.get(Dt.targetId);if(k&&Y&&F.showTrajectory&&R.pull>=F.minPullPx){var V=vi(),se=V.walls,$=V.zones;k.setGuide(Gf({body:Y,walls:se,zones:$,vx:R.vx,vz:R.vz,dots:F.trajectoryDots}))}else k?.setGuide([])}}function Zs(){return{bodies:Je([],De(si.values()),!1).map(function(f){return{id:f.id,sourceId:f.sourceId,x:f.x,y:f.y,z:f.z,vx:f.vx,vy:f.vy,vz:f.vz,atRest:!!f.atRest,captured:!!f.captured,airborne:!!f.airborne}}),aiming:Dt?{componentId:Dt.sourceId,pointerId:Dt.pointerId,power:Dt.power}:null,projected:Object.fromEntries(Qt)}}function _s(){ae(),O.clear(),D=[],S=[],ee=void 0,le=0,ve=!1,Le=0,B=Object.fromEntries(n.variables.map(function(f){return[f.id,f.initial]})),es(),kt=0,$e.clear(),gt.clear(),Sn.clear(),zi.clear(),si.clear(),bn.clear(),Qt.clear(),wn?.reset(),Si.clear(),ri.clear(),St=void 0,Z=[],J=[],fe=[],Ee.clear(),xn(),Ye.clear(),oe.clear(),Me=[],pe=0,Ue=0,ne=0,It=!1,te=0,H=n.base.startScene,Jt=void 0,en=void 0,ft=void 0,Wt=void 0,u||(An(),pi(),vi(),mi(0,!1),yn(0),Ct({kind:"sceneEnter",sceneId:H}))}function ho(){var f,R;if(!(!qe||qe.state!=="running"||!be.size)){var F=Je([],De(be.values()),!1);be.clear();try{for(var U=Qe(F),k=U.next();!k.done;k=U.next()){var Y=k.value;$s(Y)}}catch(V){f={error:V}}finally{try{k&&!k.done&&(R=U.return)&&R.call(U)}finally{if(f)throw f.error}}}}function Js(f){if(f===void 0&&(f=!1),!qe)return Promise.resolve(void 0);if(qe.state==="running")return Promise.resolve().then(ho),Promise.resolve(qe);if(!zt||f){var R=qe,F=Promise.resolve().then(function(){return R.resume()}).then(function(){if(R.state==="running")return ho(),R}).catch(function(){}).finally(function(){zt===F&&(zt=void 0)});zt=F}return zt}function Dl(){var f,R,F=Je([],De(Ke.values()),!1),U=F.some(function(j){return j.bus==="voice"}),k=F.some(function(j){return j.bus==="stinger"}),Y=k?.2:U?.25:1;try{for(var V=Qe(F),se=V.next();!se.done;se=V.next()){var $=se.value;if($.bus==="music"){var ce=$.volume*Y;$.gain.gain.setTargetAtTime&&$.gain.gain.setTargetAtTime(ce,qe.currentTime,.04)}}}catch(j){f={error:j}}finally{try{se&&!se.done&&(R=V.return)&&R.call(V)}finally{if(f)throw f.error}}}function Ul(f,R,F){var U,k=(U=F.parameters.bus)!==null&&U!==void 0?U:"sfx";f.connect(R),R.connect(qe.destination),Et.add(f),Ke.set(f,{gain:R,bus:k,volume:F.parameters.volume}),f.onended=function(){Et.delete(f),Ke.delete(f),F.parameters.loop&&Ze.delete(F.id),Dl()},Dl()}function $s(f){return DM(this,void 0,void 0,function(){var R,F,U,k,Y,V,se,$,ce,j,he,ie,de,X,_e,Se,Ie,Ce,we,Ne,Ve,ze,Oe,tt,dt,je,At,Tt,Gt,vt;return UM(this,function(xt){switch(xt.label){case 0:return Et.size>=32?[2]:qe?(R=qe,F=He,U=(tt=f.parameters.cooldownMs)!==null&&tt!==void 0?tt:45,k=R.currentTime,U>0&&k-((dt=rt.get(f.id))!==null&&dt!==void 0?dt:-1/0)<U/1e3?[2]:f.parameters.loop&&Ze.has(f.id)?[2]:(Y=b.get(f.componentId),V=_.get((je=Y?.assetSlots[0])===null||je===void 0?void 0:je.assetId),se=V?.mime==="audio/wav"||V?.mime==="audio/mpeg",!se&&f.parameters.allowSynthFallback===!1?(kt++,[2]):(rt.set(f.id,k),$=R.state!=="running",$?[4,Js()]:[3,2]))):(f.parameters.loop&&be.set(f.id,f),[2]);case 1:$=!xt.sent(),xt.label=2;case 2:if($)return f.parameters.loop&&be.set(f.id,f),[2];if(qe!==R||R.state!=="running"||F!==He||Et.size>=32)return[2];if(ce=(At=Re.get(f.id))!==null&&At!==void 0?At:0,j=[0,-.5,.5,-1,1],he=((Tt=f.parameters.pitchJitter)!==null&&Tt!==void 0?Tt:0)*j[ce%j.length],ie=Number((Gt=B[f.parameters.pitchVariableId])!==null&&Gt!==void 0?Gt:0),de=Math.max(-12,Math.min(12,he+ie*((vt=f.parameters.pitchStep)!==null&&vt!==void 0?vt:0))),X=Math.pow(2,de/12),Re.set(f.id,ce+1),!se)return[3,8];f.parameters.loop&&Ze.add(f.id),xt.label=3;case 3:if(xt.trys.push([3,6,,7]),_e=Q.get(V.hash),_e)return[3,5];for(Se=atob(V.data),Ie=new Uint8Array(Se.length),Ce=0;Ce<Se.length;Ce++)Ie[Ce]=Se.charCodeAt(Ce);return[4,new Promise(function(Zt,Ot){var nt=R.decodeAudioData(Ie.buffer,Zt,Ot);nt&&typeof nt.then=="function"&&nt.then(Zt,Ot)})];case 4:_e=xt.sent(),Q.set(V.hash,_e),xt.label=5;case 5:return qe!==R||R.state!=="running"||F!==He||Et.size>=32?(f.parameters.loop&&F===He&&Ze.delete(f.id),[2]):(we=R.createBufferSource(),Ne=R.createGain(),we.buffer=_e,we.loop=f.parameters.loop,we.playbackRate&&(we.playbackRate.value=X),Ne.gain.value=f.parameters.volume,Ul(we,Ne,f),we.start(),[3,7]);case 6:return Ve=xt.sent(),Ze.delete(f.id),Xe("Audio decode failed"),[3,7];case 7:return[2];case 8:return ze=R.createOscillator(),Oe=R.createGain(),ze.frequency.value=f.parameters.frequency*X,ze.type="sine",Oe.gain.setValueAtTime(f.parameters.volume,R.currentTime),Oe.gain.exponentialRampToValueAtTime(.001,R.currentTime+f.parameters.seconds),Ul(ze,Oe,f),ze.start(),ze.stop(R.currentTime+f.parameters.seconds),[2]}})})}function Ks(f,R){for(var F=Je([],De(Be.values()),!1).filter(function(j){return j.boardId===f}),U=function(j,he){var ie;return(ie=F.find(function(de){return de.row===j&&de.column===he}))===null||ie===void 0?void 0:ie.group},k=function(j){for(var he=function(X){var _e=U(j,X);if(_e&&_e===U(j,X+1)&&_e===U(j,X+2)&&R.some(function(Se){return Se.row===j&&Se.column>=X&&Se.column<=X+2}))return{value:!0}},ie=0;ie<14;ie++){var de=he(ie);if(typeof de=="object")return de}},Y=0;Y<16;Y++){var V=k(Y);if(typeof V=="object")return V.value}for(var se=function(j){for(var he=function(X){var _e=U(X,j);if(_e&&_e===U(X+1,j)&&_e===U(X+2,j)&&R.some(function(Se){return Se.column===j&&Se.row>=X&&Se.row<=X+2}))return{value:!0}},ie=0;ie<14;ie++){var de=he(ie);if(typeof de=="object")return de}},$=0;$<16;$++){var ce=se($);if(typeof ce=="object")return ce.value}return!1}function Fl(f){var R,F,U,k=Be.get(f.id);if(!(!k||k.sceneId!==H||!Ae(f).enabled||!xi(f))){var Y=vn.get(f.parentId);if(Y){_t=Y.select(f.id);return}if(_t===f.id){_t=void 0;return}var V=Be.get(_t);if(!V||V.sceneId!==H||V.boardId!==k.boardId){_t=f.id;return}var se=b.get(_t);if(Math.abs(V.row-k.row)+Math.abs(V.column-k.column)!==1){_t=f.id;return}if(V.group===k.group){_t=void 0,Ct({kind:"invalidMatch",componentId:(R=f.parentId)!==null&&R!==void 0?R:f.id});return}var $=V.row,ce=V.column,j=k.row,he=k.column,ie=Je([],De(st(se)),!1),de=Je([],De(st(f)),!1);if(V.row=j,V.column=he,k.row=$,k.column=ce,Ks(k.boardId,[V,k])){var X=function(_e,Se){var Ie,Ce=(Ie=Ee.get(_e.id))!==null&&Ie!==void 0?Ie:{transform:Je([],De(st(_e)),!1),parameters:{}};Ce.transform=Je([],De(Ce.transform),!1),Ce.transform[4]=Se[4],Ce.transform[5]=Se[5],Ee.set(_e.id,Ce)};X(se,de),X(f,ie),_t=void 0,Ct({kind:"validMatch",componentId:(F=f.parentId)!==null&&F!==void 0?F:f.id})}else V.row=$,V.column=ce,k.row=j,k.column=he,_t=void 0,Ct({kind:"invalidMatch",componentId:(U=f.parentId)!==null&&U!==void 0?U:f.id})}}function Qn(f,R,F,U){var k;if(Z.length>=128){Xe("Instance budget exhausted");return}var Y=b.get(f),V=function(j){return 1+n.components.filter(function(he){return he.parentId===j}).reduce(function(he,ie){return he+V(ie.id)},0)};if($e.size+V(Y.id)>4096){Xe("Runtime node budget exhausted");return}var se="instance."+ ++ne;function $(j,he){var ie,de,X=j.id===Y.id?se:se+":"+j.id,_e=Pt(Pt({},j),{id:X,runtimeId:X,instanceId:se,prototypeId:j.id,prototype:!1,parentId:he,transform:Je([],De(j.transform),!1),spawnTime:pe});$e.set(X,_e);try{for(var Se=Qe(n.components.filter(function(we){return we.parentId===j.id})),Ie=Se.next();!Ie.done;Ie=Se.next()){var Ce=Ie.value;$(Ce,X)}}catch(we){ie={error:we}}finally{try{Ie&&!Ie.done&&(de=Se.return)&&de.call(Se)}finally{if(ie)throw ie.error}}return _e}var ce=$(Y,void 0);return ce.transform[4]=R,ce.transform[5]=F,U&&(ce.pathStartNode=U.startNode,ce.pathTargetNode=U.targetNode,ce.parentId=(k=n.gameplay.find(function(j){return j.id===U.networkBehaviorId}))===null||k===void 0?void 0:k.componentId),Z.push(ce),U&&mi(0,!1),ce}function Ol(f,R,F){var U,k,Y,V,se,$,ce,j,he,ie,de,X,_e,Se,Ie,Ce,we,Ne,Ve,ze,Oe,tt;if(++at>1024){Xe("Action budget exhausted");return}if(f.kind==="add"||f.kind==="set"){var dt=B[f.variableId],je=f.kind==="add"?dt+f.value:f.value;if(typeof je=="number"&&(!Number.isFinite(je)||Math.abs(je)>1e12)){Xe("Variable range exceeded");return}B[f.variableId]=je,dt!==je&&Ct({kind:"variableChange",variableId:f.variableId,instanceId:R.instanceId})}else if(f.kind==="setComponent"||f.kind==="setAsset"){var At=ln(f.componentId),Tt=(he=Ee.get(At.id))!==null&&he!==void 0?he:{transform:Je([],De(At.transform),!1),parameters:{}};f.kind==="setComponent"?Tt.parameters[f.key]=f.value:Tt.assetId=f.assetId,Ee.set(At.id,Tt)}else if(f.kind==="resetMatch")xn(f.componentId),An(f.componentId);else if(f.kind==="copyMatchAsset"){var Gt=(ie=vn.get(f.boardId))===null||ie===void 0?void 0:ie.snapshot().lastMatch,vt=b.get(f.componentId),xt=Gt&&((X=(de=ut.get(f.boardId))===null||de===void 0?void 0:de.get(Gt.group))===null||X===void 0?void 0:X.children.find(function(qt){return qt.contract==="native.image.v1"}));if(Gt&&xt){var Zt=b.get(Gt.from),Ot=Mn(In(Zt),Zt.parameters.width/2,Zt.parameters.height/2),nt=vt.parentId?In(b.get(vt.parentId)):cs(),ot=Mn(Es(nt),Ot.x,Ot.y),Vt=(_e=Ee.get(vt.id))!==null&&_e!==void 0?_e:{transform:Je([],De(vt.transform),!1),parameters:{}};Vt.transform=Je([],De(Vt.transform),!1),Vt.transform[4]=ot.x-vt.parameters.width/2,Vt.transform[5]=ot.y-vt.parameters.height/2,Vt.assetId=(Se=xt.assetSlots[0])===null||Se===void 0?void 0:Se.assetId,Ee.set(vt.id,Vt)}}else if(f.kind==="hintMatch")_t=void 0,(Ie=vn.get(f.componentId))===null||Ie===void 0||Ie.showHint();else if(f.kind==="spawn")Qn(f.prototypeId,f.x,f.y);else if(f.kind==="spawnAt"){var vt=(Ce=R.instanceId?Je([],De($e.values()),!1).find(function(cn){return cn.instanceId===R.instanceId&&cn.prototypeId===f.targetComponentId}):void 0)!==null&&Ce!==void 0?Ce:ln(f.targetComponentId);if(vt){var Cn=Ae(vt),Ot=Mn(In(vt),Cn.width/2,Cn.height/2),Ut=b.get(f.prototypeId);Qn(f.prototypeId,Ot.x+f.offsetX-Ut.parameters.width/2,Ot.y+f.offsetY-Ut.parameters.height/2)}}else if(f.kind==="spawnOnPath")Qn(f.prototypeId,0,0,{startNode:f.startNode,targetNode:f.targetNode,networkBehaviorId:f.networkBehaviorId});else if(["setVelocity","applyImpulse","stopBody"].includes(f.kind)){var nn=b.get(f.componentId),Bn=R.instanceId?Je([],De($e.values()),!1).filter(function(qt){return qt.instanceId===R.instanceId&&qt.prototypeId===nn.id}):tn(nn),Rn=n.gameplay.find(function(qt){return qt.kind==="physics-body"&&qt.componentId===nn.id});try{for(var pn=Qe(Bn),Fn=pn.next();!Fn.done;Fn=pn.next()){var At=Fn.value,jt=Un(At,Rn);f.kind==="setVelocity"?(jt.vx=f.vx,jt.vy=f.vy):f.kind==="applyImpulse"?(jt.vx+=f.ix,jt.vy+=f.iy):(jt.vx=0,jt.vy=0,jt.atRest=!0),jt.captured=!1,jt.exited=!1,jt.restElapsed=0,f.kind!=="stopBody"&&(jt.atRest=!1)}}catch(qt){U={error:qt}}finally{try{Fn&&!Fn.done&&(k=pn.return)&&k.call(pn)}finally{if(U)throw U.error}}}else if(f.kind==="setPosition"){var _n=b.get(f.componentId),Bn=R.instanceId?Je([],De($e.values()),!1).filter(function(yt){return yt.instanceId===R.instanceId&&yt.prototypeId===_n.id}):tn(_n),Rn=n.gameplay.find(function(yt){return yt.kind==="physics-body"&&yt.componentId===_n.id});try{for(var ai=Qe(Bn),br=ai.next();!br.done;br=ai.next()){var At=br.value,jt=Un(At,Rn);jt.x=f.x,jt.y=f.y,jt.vx=0,jt.vy=0,jt.captured=!1,jt.exited=!1,jt.atRest=!0,Jn(At,f.x,f.y)}}catch(yt){Y={error:yt}}finally{try{br&&!br.done&&(V=ai.return)&&V.call(ai)}finally{if(Y)throw Y.error}}}else if(f.kind==="setPathEdge")(we=gn.get(f.behaviorId))===null||we===void 0||we.setEdge(f.edgeId,f.enabled,f.cost);else if(f.kind==="setPathGate")(Ve=gn.get((Ne=n.gameplay.find(function(qt){return qt.id===f.behaviorId}))===null||Ne===void 0?void 0:Ne.parameters.networkBehaviorId))===null||Ve===void 0||Ve.setGate(f.behaviorId,f.mode,f.holdSeconds);else if(f.kind==="setPathTarget"){var ir=b.get(f.componentId),Rn=n.gameplay.find(function(cn){return cn.kind==="path-agent"&&cn.componentId===ir.id}),rr=gn.get(Rn.parameters.networkBehaviorId);try{for(var ti=Qe(R.instanceId?Je([],De($e.values()),!1).filter(function(cn){return cn.instanceId===R.instanceId&&cn.prototypeId===ir.id}):tn(ir)),ni=ti.next();!ni.done;ni=ti.next()){var At=ni.value;At.pathTargetNode=f.targetNode,rr?.setTarget(At.id,f.targetNode)}}catch(cn){se={error:cn}}finally{try{ni&&!ni.done&&($=ti.return)&&$.call(ti)}finally{if(se)throw se.error}}}else if(f.kind==="compute"){var ci=Number(B[f.variableId]),Ci=f.operandVariableId!==void 0?Number(B[f.operandVariableId]):f.value;if(f.op==="div"&&Ci===0){Xe("Division by zero");return}var je={add:function(){return ci+Ci},sub:function(){return ci-Ci},mul:function(){return ci*Ci},div:function(){return Ci===0?ci:ci/Ci},min:function(){return Math.min(ci,Ci)},max:function(){return Math.max(ci,Ci)},set:function(){return Ci}}[f.op]();if(f.round&&(je=Math.round(je)),!Number.isFinite(je)||Math.abs(je)>1e12){Xe("Variable range exceeded");return}var dt=B[f.variableId];B[f.variableId]=je,dt!==je&&Ct({kind:"variableChange",variableId:f.variableId,instanceId:R.instanceId})}else if(f.kind==="despawn")T(R.instanceId);else if(f.kind==="changeScene")Wt=f.sceneId;else if(f.kind==="restart")Wt="__restart";else if(f.kind==="cameraShake")y?.matches||(ee={intensity:f.intensity,seconds:f.seconds,elapsed:0});else if(f.kind==="screenFlash")S.push({color:f.color,opacity:f.opacity,seconds:f.seconds,elapsed:0}),S.length>8&&S.shift();else if(f.kind==="floatingText"){var Ri=b.get(f.componentId),Zt=R.instanceId?(ze=Je([],De($e.values()),!1).find(function(yt){return yt.instanceId===R.instanceId&&yt.prototypeId===f.componentId}))!==null&&ze!==void 0?ze:Ri:(Oe=ln(f.componentId))!==null&&Oe!==void 0?Oe:Ri,vt=Zt?.sceneId===H?Zt:Ri;if(vt){var Ot=void 0;if(vt.contract==="native.mesh3d.v1"&&(Ot=ys(vt.id)),!Ot){var Cn=Ae(vt);Ot=Mn(In(vt),Cn.width/2,Cn.height/2)}D.push({x:Ot.x,y:Ot.y,text:f.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(Pi,bs){var Dr;return String((Dr=B[bs])!==null&&Dr!==void 0?Dr:"")}),color:f.color,fontSize:f.fontSize,risePx:f.risePx,seconds:f.seconds,elapsed:0}),D.length>32&&D.shift()}}else if(f.kind==="store")R.kind==="click"&&R.pointerId!==void 0&&!Nt&&(Nt={pointerId:R.pointerId,targetId:R.targetId,condition:F},(tt=e.setPointerCapture)===null||tt===void 0||tt.call(e,R.pointerId));else if(f.behaviorId){var jn=n.gameplay.find(function(qt){return qt.id===f.behaviorId});if(f.kind==="playAudio")$s(jn);else if(f.kind==="animate"){var zn=b.get(jn.componentId),Bn=K(zn)?Je([],De($e.values()),!1).filter(function(cn){return cn.prototypeId===zn.id&&(!R.instanceId||cn.instanceId===R.instanceId)}):[zn],go=function(cn){var yt=jn.id+":"+cn.id;fe=fe.filter(function(bs){return bs.id!==yt});var Pi=Pt({},jn.parameters);Pi.fromCurrent&&(Pi.from=Pi.property==="opacity"?Ae(cn).opacity:st(cn)[Pi.property==="x"?4:5]),fe.push(Pt(Pt({},jn),{parameters:Pi,id:yt,behaviorId:jn.id,targetId:cn.id,elapsed:0,baseTransform:Je([],De(cn.transform),!1)}))};try{for(var ei=Qe(Bn),ui=ei.next();!ui.done;ui=ei.next()){var vt=ui.value;go(vt)}}catch(cn){ce={error:cn}}finally{try{ui&&!ui.done&&(j=ei.return)&&j.call(ei)}finally{if(ce)throw ce.error}}}else f.kind==="stopAnimation"?fe=fe.filter(function(qt){return qt.behaviorId!==jn.id}):f.kind==="emit"&&Ms(jn,R)}}function Ms(f,R){var F,U,k,Y,V,se,$=f.parameters,ce=$.shape==="pixel-confetti",j=$.shape==="confetti",he=ce||j;if(!(he&&y?.matches)){if(J.length+$.count>256){Xe("Particle budget exhausted");return}if(ce&&$.coverage==="screen"){J.push.apply(J,Je([],De(Ym($)),!1));return}if(j&&$.coverage==="screen"){J.push.apply(J,Je([],De(Jm($)),!1));return}for(var ie=b.get(f.componentId),de=R.instanceId&&(F=Je([],De($e.values()),!1).find(function(ze){return ze.instanceId===R.instanceId&&ze.prototypeId===ie.id}))!==null&&F!==void 0?F:ie,X=st(de),_e,Se=ln(de.parentId);Se;Se=ln(Se.parentId)){if(he&&Se.contract==="native.group.v1"&&Ae(Se).clip){_e=Se.id;break}X=Sa(st(Se),X)}var Ie=Ae(de),Ce=$.origin==="anchor"?Mn(X,0,0):he||$.origin==="center"?Mn(X,Ie.width/2,Ie.height/2):{x:X[4]+de.parameters.width/2,y:X[5]+de.parameters.height/2};if(ce){J.push.apply(J,Je([],De(uf($,Ce,_e)),!1));return}if(j){J.push.apply(J,Je([],De(hf($,Ce,_e)),!1));return}for(var we=0;we<$.count;we++){var Ne=((U=$.spread)!==null&&U!==void 0?U:360)===360?we*2.399963:-Math.PI/2+((we+.5)/$.count-.5)*((k=$.spread)!==null&&k!==void 0?k:360)*Math.PI/180,Ve=$.speed*(.5+we%7/14);J.push(Pt(Pt({},Ce),{vx:Math.cos(Ne)*Ve,vy:Math.sin(Ne)*Ve,life:(Y=$.lifetime)!==null&&Y!==void 0?Y:.7,gravity:(V=$.gravity)!==null&&V!==void 0?V:250,color:$.color,shape:(se=$.shape)!==null&&se!==void 0?se:"circle"}))}}}function Nr(){for(var f=function(){var R,F,U,k,Y,V,se=Me.shift();if(Pe++,["contactBegin","boundaryExit"].includes(se.kind)&&se.instanceId&&!$e.has(se.instanceId))return"continue";try{for(var $=(R=void 0,Qe(n.eventBindings)),ce=$.next();!ce.done;ce=$.next()){var j=ce.value;if(Object.entries(A.get(j.eventId)).every(function(we){var Ne=De(we,2),Ve=Ne[0],ze=Ne[1];return Ve==="id"||se[Ve]===ze})&&mt(j.condition)){try{for(var he=(U=void 0,Qe(j.actions)),ie=he.next();!ie.done;ie=he.next()){var de=ie.value;if(at>=1024||It)break;Ol(de,se,j.condition)}}catch(we){U={error:we}}finally{try{ie&&!ie.done&&(k=he.return)&&k.call(he)}finally{if(U)throw U.error}}if(Wt)break}}}catch(we){R={error:we}}finally{try{ce&&!ce.done&&(F=$.return)&&F.call($)}finally{if(R)throw R.error}}if(Wt){var X=Wt;if(Wt=void 0,X==="__restart")_s();else if(X!==H){var _e=H;es(),H=X,_t=void 0,Z=[],J=[],D=[],S=[],ee=void 0,ve=!1,Le=0,$e.clear(),Sn.clear(),zi.clear(),si.clear(),bn.clear(),Qt.clear(),wn?.reset(),Si.clear(),ri.clear(),St=void 0,pi(),Me=Me.filter(function(we){return we.kind==="variableChange"}),Ee.clear(),Ft=void 0;try{for(var Se=(Y=void 0,Qe(vn.values())),Ie=Se.next();!Ie.done;Ie=Se.next()){var Ce=Ie.value;Ce.reset()}}catch(we){Y={error:we}}finally{try{Ie&&!Ie.done&&(V=Se.return)&&V.call(Se)}finally{if(Y)throw Y.error}}oe.clear(),Ye.clear(),fe=[],ae(),O.clear(),Jt=void 0,en=void 0,vi(),mi(0,!1),yn(0),Ct({kind:"sceneExit",sceneId:_e}),Ct({kind:"sceneEnter",sceneId:H})}}};Me.length&&!It&&Pe<256&&at<1024;)f();Me.length&&Xe("Event/action budget exhausted")}function In(f){return Sa(f.parentId?In(ln(f.parentId)):cs(),st(f))}var Mn=function(f,R,F){return{x:f[0]*R+f[2]*F+f[4],y:f[1]*R+f[3]*F+f[5]}};function gi(f,R){var F=Ae(f),U=[[0,0],[F.width,0],[F.width,F.height],[0,F.height]].map(function(k){var Y=De(k,2),V=Y[0],se=Y[1];return Mn(R,V,se)});return{left:Math.min.apply(Math,Je([],De(U.map(function(k){return k.x})),!1)),right:Math.max.apply(Math,Je([],De(U.map(function(k){return k.x})),!1)),top:Math.min.apply(Math,Je([],De(U.map(function(k){return k.y})),!1)),bottom:Math.max.apply(Math,Je([],De(U.map(function(k){return k.y})),!1))}}function xi(f){return Ae(f).visible&&Ae(f).opacity>0&&(!f.parentId||xi(ln(f.parentId)))}function fo(f,R){for(var F=Ae(f),U=In(f),k=Math.min(F.width,F.height)/2,Y=R==="circle"?Array.from({length:32},function($,ce){return Mn(U,F.width/2+Math.cos(ce*Math.PI/16)*k,F.height/2+Math.sin(ce*Math.PI/16)*k)}):[[0,0],[F.width,0],[F.width,F.height],[0,F.height]].map(function($){var ce=De($,2),j=ce[0],he=ce[1];return Mn(U,j,he)}),V=f.parentId?ln(f.parentId):void 0,se=function(){var $=Ae(V);if(V.contract==="native.group.v1"&&$.clip){for(var ce=In(V),j=[[0,0],[$.width,0],[$.width,$.height],[0,$.height]].map(function(_e){var Se=De(_e,2),Ie=Se[0],Ce=Se[1];return Mn(ce,Ie,Ce)}),he=0,ie=0;ie<4;ie++)he+=j[ie].x*j[(ie+1)%4].y-j[(ie+1)%4].x*j[ie].y;for(var de=he>=0?1:-1,X=function(_e){var Se,Ie,Ce=j[_e],we=j[(_e+1)%4],Ne=function(Gt){return de*((we.x-Ce.x)*(Gt.y-Ce.y)-(we.y-Ce.y)*(Gt.x-Ce.x))},Ve=Y;Y=[];var ze=Ve[Ve.length-1],Oe=Ne(ze);try{for(var tt=(Se=void 0,Qe(Ve)),dt=tt.next();!dt.done;dt=tt.next()){var je=dt.value,At=Ne(je);if(At>=0!=Oe>=0){var Tt=Oe/(Oe-At);Y.push({x:ze.x+(je.x-ze.x)*Tt,y:ze.y+(je.y-ze.y)*Tt})}At>=0&&Y.push(je),ze=je,Oe=At}}catch(Gt){Se={error:Gt}}finally{try{dt&&!dt.done&&(Ie=tt.return)&&Ie.call(tt)}finally{if(Se)throw Se.error}}},ie=0;ie<4&&Y.length;ie++)X(ie)}V=V.parentId?ln(V.parentId):void 0};V;)se();return Y}function po(f,R){var F,U,k,Y,V,se;if(f.length<3||R.length<3)return!1;try{for(var $=Qe([f,R]),ce=$.next();!ce.done;ce=$.next())for(var j=ce.value,he=0;he<j.length;he++){var ie=j[he],de=j[(he+1)%j.length],X=ie.y-de.y,_e=de.x-ie.x,Se=1/0,Ie=-1/0,Ce=1/0,we=-1/0;try{for(var Ne=(k=void 0,Qe(f)),Ve=Ne.next();!Ve.done;Ve=Ne.next()){var ze=Ve.value,Oe=ze.x*X+ze.y*_e;Se=Math.min(Se,Oe),Ie=Math.max(Ie,Oe)}}catch(je){k={error:je}}finally{try{Ve&&!Ve.done&&(Y=Ne.return)&&Y.call(Ne)}finally{if(k)throw k.error}}try{for(var tt=(V=void 0,Qe(R)),dt=tt.next();!dt.done;dt=tt.next()){var ze=dt.value,Oe=ze.x*X+ze.y*_e;Ce=Math.min(Ce,Oe),we=Math.max(we,Oe)}}catch(je){V={error:je}}finally{try{dt&&!dt.done&&(se=tt.return)&&se.call(tt)}finally{if(V)throw V.error}}if(Ie<Ce||we<Se)return!1}}catch(je){F={error:je}}finally{try{ce&&!ce.done&&(U=$.return)&&U.call($)}finally{if(F)throw F.error}}return!0}function mo(f){var R,F,U,k,Y,V,se,$,ce,j,he,ie,de,X,_e,Se,Ie,Ce,we,Ne,Ve,ze,Oe,tt,dt,je,At,Tt,Gt,vt,xt,Zt=G();pe+=f,ki();try{for(var Ot=Qe(et),nt=Ot.next();!nt.done;nt=Ot.next()){var ot=De(nt.value,2),Vt=ot[0],Cn=ot[1];!Cn.held&&pe-((we=Cn.releasedAt)!==null&&we!==void 0?we:pe)>=Cn.behavior.springBackSeconds&&et.delete(Vt)}}catch(Bt){R={error:Bt}}finally{try{nt&&!nt.done&&(F=Ot.return)&&F.call(Ot)}finally{if(R)throw R.error}}ee&&(ee.elapsed+=f,ee.elapsed>=ee.seconds&&(ee=void 0));try{for(var Ut=Qe(S),nn=Ut.next();!nn.done;nn=Ut.next()){var Bn=nn.value;Bn.elapsed+=f}}catch(Bt){U={error:Bt}}finally{try{nn&&!nn.done&&(k=Ut.return)&&k.call(Ut)}finally{if(U)throw U.error}}S=S.filter(function(Bt){return Bt.elapsed<Bt.seconds});try{for(var Rn=Qe(D),pn=Rn.next();!pn.done;pn=Rn.next()){var Fn=pn.value;Fn.elapsed+=f}}catch(Bt){Y={error:Bt}}finally{try{pn&&!pn.done&&(V=Rn.return)&&V.call(Rn)}finally{if(Y)throw Y.error}}D=D.filter(function(Bt){return Bt.elapsed<Bt.seconds});try{for(var jt=Qe(vn),_n=jt.next();!_n.done;_n=jt.next()){var ai=De(_n.value,2),Vt=ai[0],br=ai[1];b.get(Vt).sceneId===H&&xi(b.get(Vt))&&br.tick(f)}}catch(Bt){se={error:Bt}}finally{try{_n&&!_n.done&&($=jt.return)&&$.call(jt)}finally{if(se)throw se.error}}var ir=function(Bt){var Vn,Vi,or=b.get(Bt.componentId);if(or.sceneId!==H)return"continue";var is=K(or)?Je([],De($e.values()),!1).filter(function(Li){return Li.prototypeId===or.id}):[or];try{for(var Zi=(Vn=void 0,Qe(is)),Gi=Zi.next();!Gi.done;Gi=Zi.next()){var Hi=Gi.value,Br=Bt.id+":"+Hi.id;if(Bt.kind==="motion"){var Ji=(Ne=Ee.get(Hi.id))!==null&&Ne!==void 0?Ne:{transform:Je([],De(Hi.transform),!1),parameters:{}},rs=(Ve=Ji.velocity)!==null&&Ve!==void 0?Ve:{x:Bt.parameters.vx,y:Bt.parameters.vy};rs.y+=Bt.parameters.gravity*f,Ji.transform[4]+=rs.x*f,Ji.transform[5]+=rs.y*f,Ji.velocity=rs,Ee.set(Hi.id,Ji),Hi.prototypeId&&(Hi.transform=Ji.transform);var ss=In(Hi);(ss[5]>Zt.height||ss[4]<-300||ss[4]>Zt.width+300)&&(Ji.exited||(Ji.exited=!0,Ct({kind:"boundaryExit",componentId:or.id,instanceId:Hi.instanceId})))}else if(Bt.kind==="timer"){var js=((ze=Ye.get(Br))!==null&&ze!==void 0?ze:0)+f;Ye.set(Br,js),js>=Bt.parameters.seconds&&js-f<Bt.parameters.seconds&&(Ct({kind:"timer",behaviorId:Bt.id,componentId:or.id}),Bt.parameters.repeat&&Ye.set(Br,js-Bt.parameters.seconds))}}}catch(Li){Vn={error:Li}}finally{try{Gi&&!Gi.done&&(Vi=Zi.return)&&Vi.call(Zi)}finally{if(Vn)throw Vn.error}}};try{for(var rr=Qe(n.gameplay),ti=rr.next();!ti.done;ti=rr.next()){var ni=ti.value;ir(ni)}}catch(Bt){ce={error:Bt}}finally{try{ti&&!ti.done&&(j=rr.return)&&j.call(rr)}finally{if(ce)throw ce.error}}bi(f),qi(f),mi(f),yn(f);var ci=[],Ci=function(Bt){var Vn,Vi,or=b.get(Bt.componentId);if(or.sceneId!==H)return"continue";try{for(var is=(Vn=void 0,Qe(K(or)?Je([],De($e.values()),!1).filter(function(Hi){return Hi.prototypeId===or.id}):[or])),Zi=is.next();!Zi.done;Zi=is.next()){var Gi=Zi.value;if(xi(Gi)){if(ci.length>=256){Xe("Collider budget exhausted");break}ci.push({b:Bt,c:Gi,box:gi(Gi,In(Gi)),polygon:fo(Gi,Bt.parameters.shape)})}}}catch(Hi){Vn={error:Hi}}finally{try{Zi&&!Zi.done&&(Vi=is.return)&&Vi.call(is)}finally{if(Vn)throw Vn.error}}};try{for(var Ri=Qe(n.gameplay.filter(function(Bt){return Bt.kind==="collider"})),jn=Ri.next();!jn.done;jn=Ri.next()){var ni=jn.value;Ci(ni)}}catch(Bt){he={error:Bt}}finally{try{jn&&!jn.done&&(ie=Ri.return)&&ie.call(Ri)}finally{if(he)throw he.error}}var zn=new Set,go=0;e:for(var ei=0;ei<ci.length;ei++)for(var ni=ei+1;ni<ci.length;ni++){var ui=ci[ei],qt=ci[ni];if(!(ui.c.instanceId&&ui.c.instanceId===qt.c.instanceId)){var cn=ui.box,yt=qt.box,Pi=cn.left<yt.right&&cn.right>yt.left&&cn.top<yt.bottom&&cn.bottom>yt.top;if(Pi){if(++go>4096){Xe("Collision budget exhausted");break e}Pi=po(ui.polygon,qt.polygon)}if(Pi){var bs=[ui.c.id,qt.c.id].sort().join("|");if(zn.add(bs),!oe.has(bs))try{for(var Dr=(de=void 0,Qe([[ui,qt],[qt,ui]])),Qs=Dr.next();!Qs.done;Qs=Dr.next()){var xo=De(Qs.value,2),yo=xo[0],_o=xo[1];Ct({kind:"contactBegin",componentId:(Oe=yo.c.prototypeId)!==null&&Oe!==void 0?Oe:yo.c.id,otherId:(tt=_o.c.prototypeId)!==null&&tt!==void 0?tt:_o.c.id,instanceId:(dt=yo.c.instanceId)!==null&&dt!==void 0?dt:_o.c.instanceId})}}catch(Vn){de={error:Vn}}finally{try{Qs&&!Qs.done&&(X=Dr.return)&&X.call(Dr)}finally{if(de)throw de.error}}}}}oe=zn;try{for(var xa=Qe(fe),Ur=xa.next();!Ur.done;Ur=xa.next()){var ei=Ur.value;ei.elapsed+=f;var Tn=ei.parameters,zl=(je=Tn.delay)!==null&&je!==void 0?je:0,Fr=ei.elapsed-zl;if(!(Fr<0)){var Mo=Fr/Tn.seconds,yi=Tn.loop?Mo%1:Math.min(1,Mo),ns=(At=Tn.easing)!==null&&At!==void 0?At:"ease-out",sr=yi;Tn.loop&&ns==="ease-in-out"?sr=.5-.5*Math.cos(yi*Math.PI*2):ns==="ease-out"?sr=1-Math.pow(1-yi,3):ns==="ease-in"?sr=Math.pow(yi,3):ns==="ease-in-out"?sr=yi<.5?4*Math.pow(yi,3):1-Math.pow(-2*yi+2,3)/2:ns==="back-out"&&(sr=1+2.70158*Math.pow(yi-1,3)+1.70158*Math.pow(yi-1,2));var ya=Tn.from+(Tn.to-Tn.from)*sr,oi=ln((Tt=ei.targetId)!==null&&Tt!==void 0?Tt:ei.componentId);if(oi){var kn=(Gt=Ee.get(oi.id))!==null&&Gt!==void 0?Gt:{transform:Je([],De(oi.transform),!1),parameters:{}},ar=(vt=ei.baseTransform)!==null&&vt!==void 0?vt:oi.transform;if(Tn.property==="opacity")kn.parameters.opacity=Math.max(0,Math.min(1,ya));else if(["scale","scaleX","scaleY","rotation"].includes(Tn.property)){(xt=kn.animationAxes)!==null&&xt!==void 0||(kn.animationAxes={scale:1,scaleX:1,scaleY:1,rotation:0}),kn.animationAxes[Tn.property]=ya;var wr=kn.animationAxes,ws=wr.rotation*Math.PI/180,Or=Math.cos(ws),hi=Math.sin(ws),Yi=wr.scale*wr.scaleX,un=wr.scale*wr.scaleY;kn.transform[0]=(ar[0]*Or+ar[2]*hi)*Yi,kn.transform[1]=(ar[1]*Or+ar[3]*hi)*Yi,kn.transform[2]=(-ar[0]*hi+ar[2]*Or)*un,kn.transform[3]=(-ar[1]*hi+ar[3]*Or)*un}else kn.transform[Tn.property==="x"?4:5]=ya;Ee.set(oi.id,kn),Tn.loop&&Fr>=Tn.seconds&&(ei.elapsed=zl+Fr%Tn.seconds)}}}}catch(Bt){_e={error:Bt}}finally{try{Ur&&!Ur.done&&(Se=xa.return)&&Se.call(xa)}finally{if(_e)throw _e.error}}fe=fe.filter(function(Bt){var Vn,Vi;return ln((Vn=Bt.targetId)!==null&&Vn!==void 0?Vn:Bt.componentId)&&(Bt.elapsed<Bt.parameters.seconds+((Vi=Bt.parameters.delay)!==null&&Vi!==void 0?Vi:0)||Bt.parameters.loop)});try{for(var on=Qe(J),Ts=on.next();!Ts.done;Ts=on.next()){var Tn=Ts.value;if(Tn.shape==="pixel-confetti"||Tn.shape==="confetti"){Tn.age+=f;continue}Tn.life-=f,Tn.x+=Tn.vx*f,Tn.y+=Tn.vy*f,Tn.vy+=Tn.gravity*f}}catch(Bt){Ie={error:Bt}}finally{try{Ts&&!Ts.done&&(Ce=on.return)&&Ce.call(on)}finally{if(Ie)throw Ie.error}}J=J.filter(function(Bt){var Vn;return Bt.life>((Vn=Bt.age)!==null&&Vn!==void 0?Vn:0)}),Nr()}function va(f,R){var F,U,k;if(v.beginPath(),f.contract==="native.ellipse.v1")v.ellipse(R.width/2,R.height/2,R.width/2,R.height/2,0,0,Math.PI*2);else if(f.contract==="native.path.v1"){var Y=function(ie,de){({M:function(){return v.moveTo.apply(v,Je([],De(de),!1))},L:function(){return v.lineTo.apply(v,Je([],De(de),!1))},C:function(){return v.bezierCurveTo.apply(v,Je([],De(de),!1))},Q:function(){return v.quadraticCurveTo.apply(v,Je([],De(de),!1))},Z:function(){return v.closePath()}})[ie]()};try{for(var V=Qe(R.commands),se=V.next();!se.done;se=V.next()){var $=De(se.value),ce=$[0],j=$.slice(1);Y(ce,j)}}catch(ie){F={error:ie}}finally{try{se&&!se.done&&(U=V.return)&&U.call(V)}finally{if(F)throw F.error}}}else{var he=Math.min((k=R.radius)!==null&&k!==void 0?k:0,R.width/2,R.height/2);typeof v.roundRect=="function"?v.roundRect(0,0,R.width,R.height,he):(v.moveTo(he,0),v.arcTo(R.width,0,R.width,R.height,he),v.arcTo(R.width,R.height,0,R.height,he),v.arcTo(0,R.height,0,0,he),v.arcTo(0,0,R.width,0,he),v.closePath())}}function ch(f,R,F){var U,k,Y,V=(U=Ee.get(f.id))===null||U===void 0?void 0:U.pathFrame;if(V!==void 0)return Math.min(R.frameCount-1,V);if(u||!R.frameRate)return 0;if(f.contract!=="native.walk-sprite.v1")return Math.floor(Math.max(0,pe-((k=f.spawnTime)!==null&&k!==void 0?k:0))*R.frameRate)%R.frameCount;var se=(Y=f.runtimeId)!==null&&Y!==void 0?Y:f.id,$=gt.get(se);if(!$)return gt.set(se,{x:F[4],y:F[5],phase:0,lastMove:-1/0,frame:0}),0;var ce=Math.hypot(F[4]-$.x,F[5]-$.y)>.3;if(ce){var j=pe-$.lastMove;$.phase=Number.isFinite(j)&&j<.25?$.phase+Math.min(j,.12)*R.frameRate:0,$.lastMove=pe}return $.x=F[4],$.y=F[5],pe-$.lastMove>.11&&($.phase=0),$.frame=Math.floor($.phase)%R.frameCount,$.frame}function ga(f,R,F,U){var k,Y,V,se,$,ce,j,he,ie,de;if(R===void 0&&(R=cs()),F===void 0&&(F=[]),f.contract!=="native.mesh3d.v1"){var X=Ae(f);if(!(!X.visible||X.opacity<=0)){var _e=Sa(R,st(f));v.save(),v.transform.apply(v,Je([],De(st(f)),!1)),v.globalAlpha*=X.opacity;var Se=et.get(f.id);Se?.behavior.liftShadow&&(v.shadowColor="#00000055",v.shadowBlur=8,v.shadowOffsetY=4);var Ie=F;if(f.contract==="native.group.v1"&&X.clip&&(v.beginPath(),v.rect(0,0,X.width,X.height),v.clip(),Ie=Je(Je([],De(F),!1),[{matrix:_e,width:X.width,height:X.height}],!1)),!["native.group.v1","native.text.v1","native.image.v1","native.sprite.v1","native.walk-sprite.v1","native.stage3d.v1","native.mesh3d.v1"].includes(f.contract)){var Ce=f.contract==="native.button.v1",we=Jt===f.id,Ne=Ce?X.enabled?we?X.pressedFill:ft===f.id?X.hoverFill:X.fill:X.disabledFill:X.fill;if(Ce&&(X.presentation==="pixel-cta"||X.presentation==="shiny-cta")){var Ve=($=E.get(f.id))!==null&&$!==void 0?$:Ue;O.set(f.id,Ve);var ze=!u&&!y?.matches?Ue-Ve:-1;X.presentation==="shiny-cta"?Qm(v,X,Ne,we,ze):Km(v,X,Ne,we,ze)}else X.pixelFrame&&(v.save(),v.translate(3,4),va(f,X),v.fillStyle="#3c293366",v.fill(),v.restore()),va(f,X),v.fillStyle=Ne,v.fill(),X.pixelFrame&&!(X.radius>0)&&(v.fillStyle="#ffffff22",v.fillRect(2,2,Math.max(0,X.width-4),2),v.fillRect(2,2,2,Math.max(0,X.height-4))),X.strokeWidth&&(v.strokeStyle=X.stroke,v.lineWidth=X.strokeWidth,v.stroke());_t===f.id&&(va(f,X),v.strokeStyle="#ffffff",v.lineWidth=5,v.stroke())}var Oe;if(f.contract==="native.text.v1"){var tt=X.text.replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(ir,rr){var ti;return String((ti=B[rr])!==null&&ti!==void 0?ti:"")});X.pixelPanel&&(v.fillStyle="#3c293366",v.fillRect(3,4,X.width,X.height),v.fillStyle=X.panelFill,v.fillRect(0,0,X.width,X.height),v.strokeStyle=(ce=X.panelStroke)!==null&&ce!==void 0?ce:X.color,v.lineWidth=2,v.strokeRect(1,1,X.width-2,X.height-2),v.fillStyle="#ffffff22",v.fillRect(3,3,Math.max(0,X.width-6),2));var dt=X.fontFamily==="pixel"?of(tt,X):void 0;dt&&!dt.unsupportedChars.length?Oe=qm(v,tt,X):Oe=FM(v,tt,dt?Pt(Pt({},X),{fontFamily:"sans-serif",fontWeight:"700"}):X)}if(["native.image.v1","native.sprite.v1","native.walk-sprite.v1"].includes(f.contract)){var je=I.get((he=(j=Ee.get(f.id))===null||j===void 0?void 0:j.assetId)!==null&&he!==void 0?he:(ie=f.assetSlots[0])===null||ie===void 0?void 0:ie.assetId);if(je?.complete&&je.naturalWidth){v.save(),v.beginPath(),v.rect(0,0,X.width,X.height),v.clip();var At=f.contract!=="native.image.v1",Tt=At?Math.min(X.frameColumns,X.frameCount):1,Gt=At?Math.ceil(X.frameCount/Tt):1,vt=je.width/Tt,xt=je.height/Gt,Zt=At?ch(f,X,_e):0,Ot=Zt%Tt*vt,nt=Math.floor(Zt/Tt)*xt,ot=X.fit==="cover"?Math.max(X.width/vt,X.height/xt):Math.min(X.width/vt,X.height/xt),Vt=X.fit==="stretch"?X.width:vt*ot,Cn=X.fit==="stretch"?X.height:xt*ot;v.imageSmoothingEnabled=(de=X.smoothing)!==null&&de!==void 0?de:!0,v.drawImage(je,Ot,nt,vt,xt,(X.width-Vt)/2,(X.height-Cn)/2,Vt,Cn),v.restore()}}if(f.contract==="native.stage3d.v1"&&wn){var Ot=Math.hypot(_e[0],_e[1]),nt=Math.hypot(_e[2],_e[3]),Ut=wn.renderStage(f,v,X.width*Ot*Kn*Hn,X.height*nt*Kn*Hn,X.width,X.height,{time:pe,ambientTime:Ue,propsOf:Ae,bodies3d:si,aimLocked:!!Dt,groundFn:Lo,worldWidth:X.width*Ot,worldHeight:X.height*nt});try{for(var nn=Qe(si),Bn=nn.next();!Bn.done;Bn=nn.next()){var Rn=De(Bn.value,2),pn=Rn[0],Fn=Rn[1];if(Fn.stageId===f.id&&Fn.mode==="dynamic"){var jt=Ut.project({x:Fn.x,y:Fn.y,z:Fn.z},X.width,X.height);Qt.set(pn,Mn(_e,jt.x,jt.y))}}}catch(ti){k={error:ti}}finally{try{Bn&&!Bn.done&&(Y=nn.return)&&Y.call(nn)}finally{if(k)throw k.error}}}$t.push({c:f,m:_e,clips:Ie,instance:U??f.prototypeId,textMetrics:Oe});try{for(var _n=Qe(bt(f.id)),ai=_n.next();!ai.done;ai=_n.next()){var br=ai.value;ga(br,_e,Ie,U??f.prototypeId)}}catch(ir){V={error:ir}}finally{try{ai&&!ai.done&&(se=_n.return)&&se.call(_n)}finally{if(V)throw V.error}}X.clip&&f.contract==="native.group.v1"&&vo(f.id),v.restore()}}}function vo(f,R){var F,U;if(!y?.matches)try{for(var k=Qe(J),Y=k.next();!Y.done;Y=k.next()){var V=Y.value;V.shape!=="pixel-confetti"&&V.shape!=="confetti"||V.clipId!==f||!!V.screen!=!!R||(v.save(),V.shape==="confetti"?$m(v,V,R):Zm(v,V,R),v.restore())}}catch(se){F={error:se}}finally{try{Y&&!Y.done&&(U=k.return)&&U.call(k)}finally{if(F)throw F.error}}}function r0(f,R,F,U){v.save(),v.translate(f,R),v.globalAlpha=.92,v.lineWidth=2,v.lineJoin="round",F==="tap"&&(v.strokeStyle="#fff0bd",v.globalAlpha=.7*(1-U),v.beginPath(),v.arc(0,0,12+U*12,0,Math.PI*2),v.stroke(),v.globalAlpha=.92),v.fillStyle="#fff0bd",v.strokeStyle="#193b46",v.beginPath(),v.moveTo(-7,10),v.lineTo(-9,-1),v.quadraticCurveTo(-9,-5,-5,-5),v.lineTo(-3,-3),v.lineTo(-3,-17),v.quadraticCurveTo(-3,-22,1,-22),v.quadraticCurveTo(5,-22,5,-17),v.lineTo(5,-6),v.quadraticCurveTo(9,-9,11,-5),v.quadraticCurveTo(15,-7,16,-2),v.lineTo(14,9),v.quadraticCurveTo(12,18,3,18),v.lineTo(-1,18),v.quadraticCurveTo(-5,17,-7,10),v.closePath(),v.fill(),v.stroke(),v.restore()}function s0(){var f,R,F,U,k,Y;if(Le=0,!u)try{for(var V=Qe(n.gameplay.filter(function(Tt){return Tt.kind==="tutorial-hand"})),se=V.next();!se.done;se=V.next()){var $=se.value,ce=b.get($.componentId),j=ln($.parameters.targetId);if(!(!ce||ce.sceneId!==H||!j||j.sceneId!==H||!xi(j))&&!($.parameters.hideOnFirstInput&&ve)){var he=ke?pe:Ue;if(!(he-le<$.parameters.idleDelaySeconds)){Le++;var ie=$.parameters.destinationId?ln($.parameters.destinationId):void 0,de=Ae(j),X=void 0;j.contract==="native.mesh3d.v1"&&(X=ys(j.id)),X||(X=Mn(In(j),de.width/2,de.height/2));var _e=he%1.2/1.2,Se=y?.matches?0:_e*_e*(3-2*_e),Ie=X.x,Ce=X.y;if($.parameters.mode!=="tap"){var we=ie?Mn(In(ie),Ae(ie).width/2,Ae(ie).height/2):{x:X.x-36,y:X.y+48};Ie=X.x+(we.x-X.x)*Se,Ce=X.y+(we.y-X.y)*Se}r0(Ie+8,Ce+22,$.parameters.mode,Se)}}}}catch(Tt){f={error:Tt}}finally{try{se&&!se.done&&(R=V.return)&&R.call(V)}finally{if(f)throw f.error}}try{for(var Ne=Qe(D),Ve=Ne.next();!Ve.done;Ve=Ne.next()){var ze=Ve.value,Oe=Math.min(1,ze.elapsed/ze.seconds);v.save(),v.globalAlpha=1-Oe,v.fillStyle=ze.color,v.strokeStyle="#193b46",v.lineWidth=3,v.font="900 "+ze.fontSize+"px sans-serif",v.textAlign="center",v.textBaseline="middle";var Ce=ze.y-(y?.matches?0:ze.risePx*Oe);v.strokeText(ze.text,ze.x,Ce),v.fillText(ze.text,ze.x,Ce),v.restore()}}catch(Tt){F={error:Tt}}finally{try{Ve&&!Ve.done&&(U=Ne.return)&&U.call(Ne)}finally{if(F)throw F.error}}try{for(var tt=Qe(S),dt=tt.next();!dt.done;dt=tt.next()){var je=dt.value,Oe=Math.min(1,je.elapsed/je.seconds),At=G();v.save(),v.globalAlpha=je.opacity*(1-Oe),v.fillStyle=je.color,v.fillRect(0,0,At.width,At.height),v.restore()}}catch(Tt){k={error:Tt}}finally{try{dt&&!dt.done&&(Y=tt.return)&&Y.call(tt)}finally{if(k)throw k.error}}}function a0(){if(St){var f=Sn.get(St.targetId),R=St.behavior.parameters;if(f){var F=St.current.x-St.start.x,U=St.current.y-St.start.y,k=Math.hypot(F,U),Y=Math.min(R.maxPullPx,k),V=k>.001?Y/k:0;v.save(),v.lineCap="round";var se=Math.max(12,Math.min(f.width,f.height)*.62);if(v.strokeStyle="#173a2f66",v.lineWidth=3.5,v.beginPath(),v.arc(f.x,f.y,se,0,Math.PI*2),v.stroke(),v.strokeStyle=R.trajectoryColor,v.lineWidth=2,v.beginPath(),v.arc(f.x,f.y,se,0,Math.PI*2),v.stroke(),R.showTrajectory&&k>=R.minPullPx){var $=fh(),ce=an(),j=ce.bodies,he=ce.zones,ie=G(),de=Bf({body:Pt(Pt({},f),{vx:$.vx,vy:$.vy,atRest:!1}),bodies:j,zones:he,bounds:{left:0,top:0,right:ie.width,bottom:ie.height},dots:R.trajectoryDots,bounces:R.trajectoryBounces});de.forEach(function(Se,Ie){var Ce=.96-.52*(Ie/Math.max(1,de.length)),we=Math.max(2.2,4.5-Ie*.22);v.globalAlpha=Ce,v.fillStyle="#173a2f88",v.beginPath(),v.arc(Se.x,Se.y,we+1.3,0,Math.PI*2),v.fill(),v.fillStyle=R.trajectoryColor,v.beginPath(),v.arc(Se.x,Se.y,we,0,Math.PI*2),v.fill()})}if(k>=4){var X=f.x+F*V,_e=f.y+U*V;v.globalAlpha=.9,v.strokeStyle="#173a2f66",v.lineWidth=5,v.beginPath(),v.moveTo(f.x,f.y),v.lineTo(X,_e),v.stroke(),v.strokeStyle=R.trajectoryColor,v.lineWidth=2.6,v.beginPath(),v.moveTo(f.x,f.y),v.lineTo(X,_e),v.stroke(),v.fillStyle="#173a2f88",v.beginPath(),v.arc(X,_e,5.2,0,Math.PI*2),v.fill(),v.fillStyle=R.trajectoryColor,v.beginPath(),v.arc(X,_e,3.6,0,Math.PI*2),v.fill()}v.restore()}}}function o0(f){var R,F,U,k;try{for(var Y=Qe(Yt()),V=Y.next();!V.done;V=Y.next()){var se=V.value,$=se.contract==="native.group.v1"?bt(se.id):[se];try{for(var ce=(U=void 0,Qe($)),j=ce.next();!j.done;j=ce.next()){var he=j.value;if(he.contract==="native.stage3d.v1"&&xi(he)&&Ae(he).skyColor)return Ae(he).skyColor;if(!(he.contract!=="native.rectangle.v1"||!xi(he))){var ie=Ae(he);if(!(ie.opacity<.95||!ie.fill||ie.fill==="transparent")&&(/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test(he.id)||ie.width>=f.width*.9&&ie.height>=f.height*.9))return ie.fill}}}catch(de){U={error:de}}finally{try{j&&!j.done&&(k=ce.return)&&k.call(ce)}finally{if(U)throw U.error}}}}catch(de){R={error:de}}finally{try{V&&!V.done&&(F=Y.return)&&F.call(Y)}finally{if(R)throw R.error}}return"#102a34"}function nr(){var f,R,F,U,k,Y;E=O,O=new Map;var V=G();C!==void 0&&C!==V.landscape&&ae(),C=V.landscape;var se=Math.min(devicePixelRatio||1,2),$=e.clientWidth,ce=e.clientHeight;(e.width!==Math.round($*se)||e.height!==Math.round(ce*se))&&(e.width=Math.round($*se),e.height=Math.round(ce*se)),v.setTransform(se,0,0,se,0,0),v.fillStyle=o0(V),v.fillRect(0,0,$,ce);var j=Math.min($/V.width,ce/V.height),he=($-V.width*j)/2,ie=(ce-V.height*j)/2;if(Kn=j||1,Hn=se,v.translate(he,ie),v.scale(j,j),ee){var de=Math.min(1,ee.elapsed/ee.seconds),X=ee.intensity*(1-de);v.translate(Math.sin(ee.elapsed*95)*X,Math.cos(ee.elapsed*113)*X)}v.save(),v.beginPath(),v.rect(0,0,V.width,V.height),v.clip(),$t=[];try{for(var _e=Qe(Yt()),Se=_e.next();!Se.done;Se=_e.next()){var Ie=Se.value;ga(Ie)}}catch(xt){f={error:xt}}finally{try{Se&&!Se.done&&(R=_e.return)&&R.call(_e)}finally{if(f)throw f.error}}try{for(var Ce=Qe(Z),we=Ce.next();!we.done;we=Ce.next()){var Ie=we.value;Ie.parentId||ga(Ie,cs(),[],Ie.prototypeId)}}catch(xt){F={error:xt}}finally{try{we&&!we.done&&(U=Ce.return)&&U.call(Ce)}finally{if(F)throw F.error}}if(a0(),u&&W){for(var Ne=b.get(W);Ne?.parentId;)Ne=b.get(Ne.parentId);Ne?.prototype&&ga(Ne)}vo(),v.save();try{for(var Ve=Qe(J),ze=Ve.next();!ze.done;ze=Ve.next()){var Oe=ze.value;if(!(Oe.shape==="pixel-confetti"||Oe.shape==="confetti")){var tt=Math.min(1,Oe.life*2),dt=1.5+2.5*tt;if(v.globalAlpha=tt,v.globalCompositeOperation=Oe.shape==="square"?"source-over":"lighter",v.fillStyle=Oe.color,Oe.shape==="square"){var je=Math.max(2,Math.round(dt*1.6));v.fillRect(Math.round(Oe.x-je/2),Math.round(Oe.y-je/2),je,je);continue}v.globalCompositeOperation="lighter",v.shadowColor=Oe.color,v.shadowBlur=J.length<=16?6:0,v.strokeStyle=Oe.color,v.lineWidth=1.5+tt,v.beginPath(),v.moveTo(Oe.x-Oe.vx*.025,Oe.y-Oe.vy*.025),v.lineTo(Oe.x,Oe.y),v.stroke(),v.beginPath(),v.arc(Oe.x,Oe.y,dt,0,Math.PI*2),v.fill()}}}catch(xt){k={error:xt}}finally{try{ze&&!ze.done&&(Y=Ve.return)&&Y.call(Ve)}finally{if(k)throw k.error}}if(v.restore(),s0(),u&&W){var At=$t.filter(function(xt){return xt.c.contract!=="native.group.v1"&&(xt.c.id===W||gr(xt.c,W))});if(At.length){var Tt=At.map(function(xt){return gi(xt.c,xt.m)}),Gt=Math.min.apply(Math,Je([],De(Tt.map(function(xt){return xt.left})),!1)),vt=Math.min.apply(Math,Je([],De(Tt.map(function(xt){return xt.top})),!1));v.strokeStyle="#55e6ef",v.lineWidth=2/j,v.strokeRect(Gt,vt,Math.max.apply(Math,Je([],De(Tt.map(function(xt){return xt.right})),!1))-Gt,Math.max.apply(Math,Je([],De(Tt.map(function(xt){return xt.bottom})),!1))-vt)}}v.restore(),j>0&&vo(void 0,{x:-he/j,y:-ie/j,width:$/j,height:ce/j})}function l0(f){var R,F,U,k,Y=Array.isArray(f)?Je([],De(new Set(f)),!1):void 0;nr();var V=G(),se=new Set,$=[];try{for(var ce=Qe($t),j=ce.next();!j.done;j=ce.next()){var he=j.value,ie=(U=he.c.prototypeId)!==null&&U!==void 0?U:he.c.id;if(!(he.c.contract==="native.group.v1"||Y&&!Y.includes(ie))){se.add(ie);var de=gi(he.c,he.m),X=((k=Ae(he.c).strokeWidth)!==null&&k!==void 0?k:0)/2;de.left-=X,de.right+=X,de.top-=X,de.bottom+=X;var _e={left:Math.max(0,-de.left),right:Math.max(0,de.right-V.width),top:Math.max(0,-de.top),bottom:Math.max(0,de.bottom-V.height)};Object.values(_e).some(function(Ie){return Ie>.01})&&$.push({id:ie,contract:he.c.contract,bounds:de,overflow:_e})}}}catch(Ie){R={error:Ie}}finally{try{j&&!j.done&&(F=ce.return)&&F.call(ce)}finally{if(R)throw R.error}}var Se=Y?Y.filter(function(Ie){return!se.has(Ie)}):[];return{ok:$.length===0&&Se.length===0,viewport:Pt(Pt({},V),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight}),issues:$,missing:Se}}function c0(f){var R,F,U,k,Y,V,se,$,ce,j,he,ie,de,X,_e,Se,Ie,Ce,we,Ne,Ve,ze,Oe,tt,dt,je,At,Tt,Gt,vt,xt,Zt,Ot,nt=f===void 0?{}:f,ot=nt.ids,Vt=nt.interactiveIds,Cn=nt.network,Ut=Cn===void 0?"standalone":Cn,nn=nt.minTouchPx,Bn=nn===void 0?44:nn,Rn=Array.isArray(ot)?Je([],De(new Set(ot)),!1):void 0;nr();var pn=G(),Fn=Math.min(e.clientWidth/pn.width,e.clientHeight/pn.height),jt=pf(pn,Ut),_n=[],ai=new Set,br=function(xe){var Mt;return!Rn||Rn.includes((Mt=xe.c.prototypeId)!==null&&Mt!==void 0?Mt:xe.c.id)},ir=$t.filter(br),rr=new Set(n.events.filter(function(xe){return xe.kind==="click"}).map(function(xe){return xe.componentId}));try{for(var ti=Qe(n.gameplay),ni=ti.next();!ni.done;ni=ti.next()){var ci=ni.value;["drag","match-tile","aim-launch","aim-launch-3d"].includes(ci.kind)&&rr.add(ci.componentId)}}catch(xe){R={error:xe}}finally{try{ni&&!ni.done&&(F=ti.return)&&F.call(ti)}finally{if(R)throw R.error}}var Ci=new Set(Vt??rr),Ri=new Set(n.gameplay.filter(function(xe){return(xe.kind==="aim-launch"||xe.kind==="aim-launch-3d")&&xe.parameters.dragMode==="anywhere"}).map(function(xe){return xe.componentId})),jn=function(xe){var Mt;return Ci.has((Mt=xe.c.prototypeId)!==null&&Mt!==void 0?Mt:xe.c.id)},zn=function(xe,Mt,Rt,hn,ii,Xn){return _n.push(Pt(Pt({kind:xe,severity:Mt,id:Rt},Xn?{otherId:Xn}:{}),{detail:hn,metrics:ii}))},go=function(xe){var Mt=[[0,0],[xe.width,0],[xe.width,xe.height],[0,xe.height]].map(function(Rt){var hn=De(Rt,2),ii=hn[0],Xn=hn[1];return Mn(xe.matrix,ii,Xn)});return{left:Math.min.apply(Math,Je([],De(Mt.map(function(Rt){return Rt.x})),!1)),right:Math.max.apply(Math,Je([],De(Mt.map(function(Rt){return Rt.x})),!1)),top:Math.min.apply(Math,Je([],De(Mt.map(function(Rt){return Rt.y})),!1)),bottom:Math.max.apply(Math,Je([],De(Mt.map(function(Rt){return Rt.y})),!1))}};try{for(var ei=Qe(ir),ui=ei.next();!ui.done;ui=ei.next()){var qt=ui.value,cn=(Oe=qt.c.prototypeId)!==null&&Oe!==void 0?Oe:qt.c.id;ai.add(cn);var yt=gi(qt.c,qt.m),Pi=((tt=Ae(qt.c).strokeWidth)!==null&&tt!==void 0?tt:0)/2;yt.left-=Pi,yt.right+=Pi,yt.top-=Pi,yt.bottom+=Pi;var bs=qt.c.contract==="native.group.v1"&&!Ae(qt.c).clip,Dr=qt.c.contract==="native.image.v1"&&qt.clips.length===0&&Ae(qt.c).fit==="cover"&&yt.left<=0&&yt.top<=0&&yt.right>=pn.width&&yt.bottom>=pn.height||qt.c.contract==="native.stage3d.v1"&&yt.left<=0&&yt.top<=0&&yt.right>=pn.width&&yt.bottom>=pn.height,Qs=qt.c.contract==="native.rectangle.v1"&&Pi===0&&yt.left<=0&&yt.top<=0&&yt.right>=pn.width&&yt.bottom>=pn.height||Dr;if(!bs){var xo={left:Math.max(0,-yt.left),right:Math.max(0,yt.right-pn.width),top:Math.max(0,-yt.top),bottom:Math.max(0,yt.bottom-pn.height)};if(!Qs&&!u0(qt.c)&&Object.values(xo).some(function(xe){return xe>.01})&&zn("stage-overflow","blocker",cn,"Component extends beyond the active stage.",{bounds:yt,overflow:xo}),qt.c.contract==="native.image.v1"&&qt.clips.length===0){var yo=yt.right-yt.left,_o=yt.bottom-yt.top,xa=/(?:^|\.)(backdrop|background|bg)$/.test(cn)||Ae(qt.c).fit==="cover"&&!qt.c.parentId&&yt.left<=1&&yt.top<=1&&(yo>=pn.width*.4||_o>=pn.height*.4);xa&&(yt.left>.5||yt.top>.5||yt.right<pn.width-.5||yt.bottom<pn.height-.5)&&zn("backdrop-incomplete","blocker",cn,"Backdrop image does not cover the full active stage, leaving a visible seam.",{bounds:yt,stage:{width:pn.width,height:pn.height}})}try{for(var Ur=(Y=void 0,Qe(qt.clips)),Tn=Ur.next();!Tn.done;Tn=Ur.next()){var zl=Tn.value,Fr=go(zl),Mo={left:Math.max(0,Fr.left-yt.left),right:Math.max(0,yt.right-Fr.right),top:Math.max(0,Fr.top-yt.top),bottom:Math.max(0,yt.bottom-Fr.bottom)};Object.values(Mo).some(function(xe){return xe>.01})&&zn("parent-clip-crop","blocker",cn,"Component is cropped by an ancestor clipping group.",{bounds:yt,clip:Fr,crop:Mo})}}catch(xe){Y={error:xe}}finally{try{Tn&&!Tn.done&&(V=Ur.return)&&V.call(Ur)}finally{if(Y)throw Y.error}}}if(qt.textMetrics){var yi=qt.textMetrics;(yi.overflowsWidth||yi.overflowsHeight)&&zn("text-overflow","blocker",cn,"Text does not fit its component after wrapping and auto-fit.",yi);var ns=(dt=yi.fontSize)!==null&&dt!==void 0?dt:yi.scale*8;ns<12&&zn("text-illegible",ns<8?"blocker":"warning",cn,"Rendered text is below the recommended legible size.",Pt({renderedFontSize:ns},yi));var sr=Ae(qt.c);if(sr.pixelPanel&&sr.align!=="center"){var ya=Math.max(0,sr.width-2*(sr.padding===void 0?8:sr.padding));ya-((je=yi.renderedWidth)!==null&&je!==void 0?je:0)>12&&zn("panel-off-center","blocker",cn,"Text inside a framed pixel panel is not horizontally centered.",{align:sr.align,innerWidth:ya,renderedWidth:(At=yi.renderedWidth)!==null&&At!==void 0?At:0})}}if(jn(qt)&&!Ri.has(cn)&&(qt.c.contract!=="native.group.v1"||yt.right>yt.left&&yt.bottom>yt.top)){var oi=(yt.right-yt.left)*Fn,kn=(yt.bottom-yt.top)*Fn;(oi<Bn-.01||kn<Bn-.01)&&zn("touch-target-small","blocker",cn,"Interactive target is smaller than the required physical touch size.",{width:oi,height:kn,minTouchPx:Bn,scale:Fn})}if(jn(qt)||qt.c.contract==="native.text.v1")try{for(var ar=(se=void 0,Qe(jt.zones)),wr=ar.next();!wr.done;wr=ar.next()){var ws=wr.value,oi=Math.min(yt.right,ws.right)-Math.max(yt.left,ws.left),kn=Math.min(yt.bottom,ws.bottom)-Math.max(yt.top,ws.top);oi>.01&&kn>.01&&zn("sdk-safe-area-collision","blocker",cn,"Component intersects a reserved ad-SDK overlay zone.",{bounds:yt,zone:ws,intersection:{width:oi,height:kn},network:Ut})}}catch(xe){se={error:xe}}finally{try{wr&&!wr.done&&($=ar.return)&&$.call(ar)}finally{if(se)throw se.error}}}}catch(xe){U={error:xe}}finally{try{ui&&!ui.done&&(k=ei.return)&&k.call(ei)}finally{if(U)throw U.error}}for(var Or=ir.filter(function(xe){return jn(xe)&&xe.c.contract!=="native.group.v1"}),hi=0;hi<Or.length;hi++)for(var Yi=hi+1;Yi<Or.length;Yi++){var un=Or[hi],on=Or[Yi],Ts=(Tt=un.c.prototypeId)!==null&&Tt!==void 0?Tt:un.c.id,Bt=(Gt=on.c.prototypeId)!==null&&Gt!==void 0?Gt:on.c.id;if(!(Ts===Bt||gr(un.c,on.c.id)||gr(on.c,un.c.id))){var Vn=gi(un.c,un.m),Vi=gi(on.c,on.m),oi=Math.min(Vn.right,Vi.right)-Math.max(Vn.left,Vi.left),kn=Math.min(Vn.bottom,Vi.bottom)-Math.max(Vn.top,Vi.top);oi>1&&kn>1&&zn("interactive-overlap","blocker",Ts,"Interactive targets overlap.",{intersection:{width:oi,height:kn},first:Vn,second:Vi},Bt)}}var or=function(xe){if(!xe||xe==="transparent")return!1;var Mt=/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.exec(xe);if(Mt)return Mt[1].length===4?Mt[1][3].toLowerCase()==="f":Mt[1].slice(6).toLowerCase()==="ff";var Rt=/^rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\s*\)$/i.exec(xe);return Rt?Number(Rt[1])>=.95:!0},is=[];ir.forEach(function(xe,Mt){var Rt,hn;xe.c.contract==="native.rectangle.v1"&&!jn(xe)&&((Rt=Ae(xe.c).opacity)!==null&&Rt!==void 0?Rt:1)>=.95&&or(Ae(xe.c).fill)&&is.push({rowIndex:Mt,row:xe,order:(hn=xe.c.order)!==null&&hn!==void 0?hn:0,bounds:gi(xe.c,xe.m)})});var Zi=ir.filter(function(xe,Mt){var Rt,hn=gi(xe.c,xe.m),ii=(Rt=xe.c.order)!==null&&Rt!==void 0?Rt:0;return!is.some(function(Xn){return Xn.rowIndex>Mt&&Xn.order>ii&&Xn.row.c.id!==xe.c.id&&!gr(Xn.row.c,xe.c.id)&&!gr(xe.c,Xn.row.c.id)&&Xn.bounds.left<=hn.left+1&&Xn.bounds.right>=hn.right-1&&Xn.bounds.top<=hn.top+1&&Xn.bounds.bottom>=hn.bottom-1})}),Gi=Zi.map(function(xe,Mt){return{row:xe,rowIndex:Mt}}).filter(function(xe){var Mt,Rt=xe.row;if(Rt.c.contract!=="native.rectangle.v1")return!1;var hn=gi(Rt.c,Rt.m),ii=hn.right-hn.left,Xn=hn.bottom-hn.top,as=((Mt=Ae(Rt.c).strokeWidth)!==null&&Mt!==void 0?Mt:0)===0&&hn.left<=0&&hn.right>=pn.width;return!as&&ii>=180&&Xn>=140&&!jn(Rt)}).map(function(xe){var Mt,Rt=xe.row,hn=xe.rowIndex;return{id:(Mt=Rt.c.prototypeId)!==null&&Mt!==void 0?Mt:Rt.c.id,row:Rt,rowIndex:hn,bounds:gi(Rt.c,Rt.m)}}),Hi=function(xe,Mt,Rt,hn){var ii,Xn;hn===void 0&&(hn=!1);var as=(ii=xe.c.prototypeId)!==null&&ii!==void 0?ii:xe.c.id,Ro=(Rt.left+Rt.right)/2,os=(Rt.top+Rt.bottom)/2,Sh=(Xn=xe.c.order)!==null&&Xn!==void 0?Xn:0;return Gi.filter(function(Nn){var ls;return Nn.id!==as&&(!hn||Nn.rowIndex<Mt||((ls=Nn.row.c.order)!==null&&ls!==void 0?ls:0)===Sh)&&Rt.right-Rt.left<=Nn.bounds.right-Nn.bounds.left+4&&Rt.bottom-Rt.top<=Nn.bounds.bottom-Nn.bounds.top+4&&Ro>=Nn.bounds.left&&Ro<=Nn.bounds.right&&os>=Nn.bounds.top&&os<=Nn.bounds.bottom}).sort(function(Nn,ls){return(Nn.bounds.right-Nn.bounds.left)*(Nn.bounds.bottom-Nn.bounds.top)-(ls.bounds.right-ls.bounds.left)*(ls.bounds.bottom-ls.bounds.top)||ls.rowIndex-Nn.rowIndex})[0]},Br=new Map,Ji=new Map;if(Gi.length){Zi.forEach(function(xe,Mt){var Rt,hn=(Rt=xe.c.prototypeId)!==null&&Rt!==void 0?Rt:xe.c.id,ii=gi(xe.c,xe.m),Xn=(ii.left+ii.right)/2,as=(ii.top+ii.bottom)/2,Ro=xe.c.contract==="native.button.v1"&&!Be.has(xe.c.id),os=xe.c.parentId?ln(xe.c.parentId):void 0,Sh=xe.c.contract==="native.text.v1"&&Ae(xe.c).align==="center"&&os?.contract!=="native.button.v1";if(Ro||Sh){var Nn=Hi(xe,Mt,ii,!1);Nn&&(Br.has(Nn.id)||Br.set(Nn.id,{panel:Nn,items:[]}),Br.get(Nn.id).items.push({id:hn,bounds:ii,cx:Xn,cy:as,isBtn:Ro}))}if(["native.text.v1","native.image.v1","native.button.v1"].includes(xe.c.contract)&&os?.contract!=="native.button.v1"){var Nn=Hi(xe,Mt,ii,!0);Nn&&(Ji.has(Nn.id)||Ji.set(Nn.id,{panel:Nn,content:[]}),Ji.get(Nn.id).content.push({row:xe,id:hn,bounds:ii}))}});try{for(var rs=Qe(Br.values()),ss=rs.next();!ss.done;ss=rs.next()){var js=ss.value,Li=js.panel,xh=js.items;if(xh.some(function(xe){return xe.isBtn})){var wi=Li.bounds,_a=(wi.left+wi.right)/2;try{for(var kl=(he=void 0,Qe(xh)),So=kl.next();!So.done;So=kl.next()){var ea=So.value,bo={left:ea.bounds.left-wi.left,right:wi.right-ea.bounds.right,top:ea.bounds.top-wi.top,bottom:wi.bottom-ea.bounds.bottom},bf=Math.min(bo.left,bo.right,bo.top,bo.bottom);(bf<10||bf*Fn<8)&&zn("panel-edge-cramped","blocker",ea.id,"Element sits too close to its enclosing panel edge.",{panelId:Li.id,margins:bo,scale:Fn,minStagePx:10,minCssPx:8},Li.id)}}catch(xe){he={error:xe}}finally{try{So&&!So.done&&(ie=kl.return)&&ie.call(kl)}finally{if(he)throw he.error}}var yh=[],d0=function(xe){var Mt=yh.find(function(Rt){return Math.abs(Rt.cy-xe.cy)<=16&&Rt.isBtn===xe.isBtn});Mt?Mt.items.push(xe):yh.push({cy:xe.cy,isBtn:xe.isBtn,items:[xe]})};try{for(var Vl=(de=void 0,Qe(xh)),wo=Vl.next();!wo.done;wo=Vl.next()){var ea=wo.value;d0(ea)}}catch(xe){de={error:xe}}finally{try{wo&&!wo.done&&(X=Vl.return)&&X.call(Vl)}finally{if(de)throw de.error}}try{for(var Gl=(_e=void 0,Qe(yh)),To=Gl.next();!To.done;To=Gl.next()){var _h=To.value,f0=Math.min.apply(Math,Je([],De(_h.items.map(function(xe){return xe.bounds.left})),!1)),p0=Math.max.apply(Math,Je([],De(_h.items.map(function(xe){return xe.bounds.right})),!1)),wf=(f0+p0)/2,Tf=wf-_a;Math.abs(Tf)>3&&zn("panel-off-center","blocker",_h.items[0].id,"Element is not horizontally centered inside its enclosing panel.",{panelId:Li.id,offsetX:Tf,groupCenterX:wf,panelCenterX:_a,scale:Fn},Li.id)}}catch(xe){_e={error:xe}}finally{try{To&&!To.done&&(Se=Gl.return)&&Se.call(Gl)}finally{if(_e)throw _e.error}}}}}catch(xe){ce={error:xe}}finally{try{ss&&!ss.done&&(j=rs.return)&&j.call(rs)}finally{if(ce)throw ce.error}}try{for(var Hl=Qe(Ji.values()),Eo=Hl.next();!Eo.done;Eo=Hl.next())for(var Ef=Eo.value,Li=Ef.panel,Wl=Ef.content,m0=Br.has(Li.id),hi=0;hi<Wl.length;hi++)for(var Yi=hi+1;Yi<Wl.length;Yi++){var un=Wl[hi],on=Wl[Yi];if(!(un.id===on.id||gr(un.row.c,on.row.c.id)||gr(on.row.c,un.row.c.id))){var v0=un.row.c.contract==="native.image.v1"&&on.row.c.contract==="native.image.v1";if(!(v0&&(!m0||un.row.c.parentId&&un.row.c.parentId===on.row.c.parentId))){var oi=Math.min(un.bounds.right,on.bounds.right)-Math.max(un.bounds.left,on.bounds.left),kn=Math.min(un.bounds.bottom,on.bounds.bottom)-Math.max(un.bounds.top,on.bounds.top);oi>2&&kn>2&&zn("panel-content-overlap","blocker",un.id,"Panel elements overlap each other.",{panelId:Li.id,intersection:{width:oi,height:kn},first:un.bounds,second:on.bounds},on.id)}}}}catch(xe){Ie={error:xe}}finally{try{Eo&&!Eo.done&&(Ce=Hl.return)&&Ce.call(Hl)}finally{if(Ie)throw Ie.error}}}var Ma=Zi.filter(function(xe){if(xe.c.contract!=="native.text.v1")return!1;var Mt=xe.c.parentId?ln(xe.c.parentId):void 0;return Mt?.contract!=="native.button.v1"}).map(function(xe){var Mt,Rt,hn=String((Mt=Ae(xe.c).text)!==null&&Mt!==void 0?Mt:"").replace(/\{\{([a-z0-9_.-]+)\}\}/g,function(ii,Xn){var as;return String((as=B[Xn])!==null&&as!==void 0?as:"")}).trim();return{row:xe,id:(Rt=xe.c.prototypeId)!==null&&Rt!==void 0?Rt:xe.c.id,bounds:gi(xe.c,xe.m),raw:hn,norm:hn.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}}).filter(function(xe){return xe.raw.length>0}),g0=Gi.filter(function(xe){var Mt,Rt;return((Mt=Br.get(xe.id))===null||Mt===void 0?void 0:Mt.items.some(function(hn){return hn.isBtn}))||((Rt=Ji.get(xe.id))===null||Rt===void 0?void 0:Rt.content.some(function(hn){return hn.row.c.contract==="native.button.v1"}))});try{for(var Xl=Qe(g0),Ao=Xl.next();!Ao.done;Ao=Xl.next()){var Li=Ao.value,wi=Li.bounds,_a=(wi.left+wi.right)/2,x0=wi.right-wi.left;try{for(var ql=(Ve=void 0,Qe(Ma)),Io=ql.next();!Io.done;Io=ql.next()){var zr=Io.value;if(Ae(zr.row.c).align==="center"&&!(zr.bounds.bottom>wi.top+6||wi.top-zr.bounds.bottom>48)){var Af=zr.bounds.right-zr.bounds.left,Co=(zr.bounds.left+zr.bounds.right)/2,y0=Math.min(zr.bounds.right,wi.right)-Math.max(zr.bounds.left,wi.left);(Co>=wi.left&&Co<=wi.right||y0>=Af*.6)&&Af<=x0+60&&Math.abs(Co-_a)>4&&zn("header-off-center","blocker",zr.id,"Centered text above a panel is not horizontally aligned with the panel below it.",{panelId:Li.id,offsetX:Co-_a,textCenterX:Co,panelCenterX:_a,scale:Fn},Li.id)}}}catch(hn){Ve={error:hn}}finally{try{Io&&!Io.done&&(ze=ql.return)&&ze.call(ql)}finally{if(Ve)throw Ve.error}}}}catch(xe){we={error:xe}}finally{try{Ao&&!Ao.done&&(Ne=Xl.return)&&Ne.call(Xl)}finally{if(we)throw we.error}}for(var hi=0;hi<Ma.length;hi++)for(var Yi=hi+1;Yi<Ma.length;Yi++){var un=Ma[hi],on=Ma[Yi];if(!(un.id===on.id||gr(un.row.c,on.row.c.id)||gr(on.row.c,un.row.c.id))){var oi=Math.min(un.bounds.right,on.bounds.right)-Math.max(un.bounds.left,on.bounds.left),kn=Math.min(un.bounds.bottom,on.bounds.bottom)-Math.max(un.bounds.top,on.bounds.top);if(oi>2&&kn>2&&zn("panel-content-overlap","blocker",un.id,"Visible text elements overlap.",{intersection:{width:oi,height:kn},first:un.bounds,second:on.bounds},on.id),un.norm&&on.norm){var If=De(un.norm.length<=on.norm.length?[un.norm,on.norm]:[on.norm,un.norm],2),Yl=If[0],Cf=If[1];(Yl===Cf&&Yl.length>=6||Yl.length>=12&&Cf.includes(Yl))&&zn("duplicate-visible-copy","blocker",un.id,"Duplicate visible copy appears in multiple text elements simultaneously.",{first:un.raw,second:on.raw},on.id)}}}var kr=Ma.filter(function(xe){return!/^[\d\s/.,:%+\-x]+$/i.test(xe.raw)}),Zl=kr.reduce(function(xe,Mt){return xe+(Mt.norm?Mt.norm.split(" ").filter(Boolean).length:0)},0),Mh=kr.reduce(function(xe,Mt){return xe+Mt.raw.replace(/\s+/g," ").length},0);Zl>20||Mh>130||kr.length>5?zn("text-clutter-heavy","blocker",(xt=(vt=kr[0])===null||vt===void 0?void 0:vt.id)!==null&&xt!==void 0?xt:null,"Too much visible copy on one screen; keep playable ads visual and concise.",{blocks:kr.length,wordCount:Zl,charCount:Mh,texts:kr.map(function(xe){return xe.raw})}):(Zl>12||kr.length>4)&&zn("text-clutter-heavy","warning",(Ot=(Zt=kr[0])===null||Zt===void 0?void 0:Zt.id)!==null&&Ot!==void 0?Ot:null,"Screen copy is getting dense; consider trimming narration so gameplay carries the experience.",{blocks:kr.length,wordCount:Zl,charCount:Mh,texts:kr.map(function(xe){return xe.raw})});var Rf=Rn?Rn.filter(function(xe){if(ai.has(xe))return!1;var Mt=ln(xe);return Mt?.contract==="native.mesh3d.v1"?!1:!Mt||xi(Mt)}):[];return{ok:!_n.some(function(xe){return xe.severity==="blocker"})&&Rf.length===0,viewport:Pt(Pt({},pn),{canvasWidth:e.clientWidth,canvasHeight:e.clientHeight,scale:Fn}),defects:_n,missing:Rf,interactive:Or.map(function(xe){var Mt;return{id:(Mt=xe.c.prototypeId)!==null&&Mt!==void 0?Mt:xe.c.id,bounds:gi(xe.c,xe.m)}}),safeArea:jt}}function gr(f,R){for(;f.parentId;){if(f.parentId===R)return!0;f=ln(f.parentId)}return!1}function u0(f){for(var R=function(k){if(n.gameplay.some(function(Y){var V;return Y.kind==="camera-follow"&&Y.componentId===((V=k.prototypeId)!==null&&V!==void 0?V:k.id)}))return{value:!0}},F=f;F;F=F.parentId?ln(F.parentId):void 0){var U=R(F);if(typeof U=="object")return U.value}return!1}function uh(f){var R=G(),F=e.getBoundingClientRect(),U=Math.min(F.width/R.width,F.height/R.height);return{x:(f.clientX-F.left-(F.width-R.width*U)/2)/U,y:(f.clientY-F.top-(F.height-R.height*U)/2)/U}}function h0(f,R){var F,U,k,Y;try{try{for(var V=Qe(f.clips),se=V.next();!se.done;se=V.next()){var $=se.value,ce=Mn(Es($.matrix),R.x,R.y);if(ce.x<0||ce.y<0||ce.x>$.width||ce.y>$.height)return!1}}catch(Ne){F={error:Ne}}finally{try{se&&!se.done&&(U=V.return)&&U.call(V)}finally{if(F)throw F.error}}var j=Mn(Es(f.m),R.x,R.y),he=Ae(f.c);if(f.c.contract==="native.path.v1"){var ie=new Path2D,de=function(Ne,Ve){({M:function(){return ie.moveTo.apply(ie,Je([],De(Ve),!1))},L:function(){return ie.lineTo.apply(ie,Je([],De(Ve),!1))},C:function(){return ie.bezierCurveTo.apply(ie,Je([],De(Ve),!1))},Q:function(){return ie.quadraticCurveTo.apply(ie,Je([],De(Ve),!1))},Z:function(){return ie.closePath()}})[Ne]()};try{for(var X=Qe(he.commands),_e=X.next();!_e.done;_e=X.next()){var Se=De(_e.value),Ie=Se[0],Ce=Se.slice(1);de(Ie,Ce)}}catch(Ne){k={error:Ne}}finally{try{_e&&!_e.done&&(Y=X.return)&&Y.call(X)}finally{if(k)throw k.error}}v.save(),v.setTransform(1,0,0,1,0,0),v.lineWidth=he.strokeWidth;var we=v.isPointInPath(ie,j.x,j.y)||he.strokeWidth>0&&v.isPointInStroke(ie,j.x,j.y);return v.restore(),we}return f.c.contract==="native.ellipse.v1"?Math.pow((j.x-he.width/2)/(he.width/2),2)+Math.pow((j.y-he.height/2)/(he.height/2),2)<=1:j.x>=0&&j.y>=0&&j.x<=he.width&&j.y<=he.height}catch{return!1}}function hh(f){return Je([],De($t),!1).reverse().find(function(R){return R.c.contract!=="native.group.v1"&&R.c.sceneId===H&&ln(R.c.id)&&xi(R.c)&&h0(R,f)})}function dh(f){for(var R=[];f;)R.push(f),f=ln(f.parentId);return R}function fh(){if(!St)return{vx:0,vy:0,power:0,pull:0};var f=St.behavior.parameters,R=St.current.x-St.start.x,F=St.current.y-St.start.y,U=Math.hypot(R,F),k=Math.max(0,Math.min(1,(U-f.minPullPx)/Math.max(1,f.maxPullPx-f.minPullPx))),Y=f.minSpeed+(f.maxSpeed-f.minSpeed)*k,V=f.invert?-1:1;return{vx:U?R/U*Y*V:0,vy:U?F/U*Y*V:0,power:k,pull:U}}function mf(f){if(St){St.current=f;var R=fh();St.power=R.power,St.behavior.parameters.powerVariableId&&(B[St.behavior.parameters.powerVariableId]=R.power)}}function ph(f){var R,F;f===void 0&&(f=!1);try{var U=(R=globalThis.AudioContext)!==null&&R!==void 0?R:globalThis.webkitAudioContext;U&&!qe&&(qe=new U,(F=qe.addEventListener)===null||F===void 0||F.call(qe,"statechange",function(){qe?.state==="running"&&ho()})),Js(f)}catch{}}var vf=function(f){var R,F,U,k,Y,V,se,$,ce,j,he;L();var ie=uh(f),de=hh(ie);if(!(!de&&u)){if(u){de&&(W=de.c.id,x((Y=de.c.prototypeId)!==null&&Y!==void 0?Y:de.c.id));return}if(!(!f.isTrusted||f.button!==void 0&&f.button!==0||f.isPrimary===!1||Fe||Ge||We&&We.pointerId!==f.pointerId||St&&St.pointerId!==f.pointerId||Dt&&Dt.pointerId!==f.pointerId||p&&(!ye||!ge))){var X=!ke;le=pe,ve=!0,ke=!0,ph(!0),X&&!It&&(Pe=at=0,Nr());var _e=de?dh(de.c):[],Se=wn&&!_e.some(function(nt){return nt.contract==="native.button.v1"})?n.gameplay.find(function(nt){var ot;return nt.kind==="aim-launch-3d"&&((ot=b.get(nt.componentId))===null||ot===void 0?void 0:ot.sceneId)===H}):void 0;if(Se){var Ie=b.get(Se.componentId),Ce=n.gameplay.find(function(nt){return nt.kind==="physics-3d"&&nt.componentId===Ie.id}),we=Ce?fn(Ie,Ce):void 0,Ne=ys(Ie.id),Ve=Se.parameters.dragMode==="anywhere"||Ne&&Math.hypot(ie.x-Ne.x,ie.y-Ne.y)<=Se.parameters.hitRadiusPx;if(we&&we.atRest&&!we.captured&&Ve){Dt={behavior:Se,targetId:Ie.id,sourceId:Ie.id,stageId:Se.parameters.stageId,pointerId:f.pointerId,start:ie,current:ie,power:0},Ys(ie),(V=e.setPointerCapture)===null||V===void 0||V.call(e,f.pointerId);return}}var ze=n.gameplay.find(function(nt){return nt.kind==="aim-launch"&&b.get(nt.componentId).sceneId===H&&(nt.parameters.dragMode==="anywhere"&&!_e.some(function(ot){return ot.contract==="native.button.v1"})||_e.some(function(ot){var Vt;return((Vt=ot.prototypeId)!==null&&Vt!==void 0?Vt:ot.id)===nt.componentId}))});if(ze){var Oe=b.get(ze.componentId),tt=(se=_e.find(function(ot){var Vt;return((Vt=ot.prototypeId)!==null&&Vt!==void 0?Vt:ot.id)===Oe.id}))!==null&&se!==void 0?se:tn(Oe).find(function(ot){return xi(ot)}),we=tt&&Un(tt,n.gameplay.find(function(ot){return ot.kind==="physics-body"&&ot.componentId===Oe.id}));if(we&&(!ze.parameters.onlyWhenAtRest||we.atRest)){St={behavior:ze,targetId:tt.id,sourceId:Oe.id,pointerId:f.pointerId,start:ie,current:ie,power:0},mf(ie),($=e.setPointerCapture)===null||$===void 0||$.call(e,f.pointerId),nr();return}}var dt=function(nt){var ot=n.gameplay.find(function(Vt){var Cn;return Vt.kind==="press-feedback"&&Vt.componentId===((Cn=nt.prototypeId)!==null&&Cn!==void 0?Cn:nt.id)});ot&&(nt.contract!=="native.button.v1"||Ae(nt).enabled)&&et.set(nt.id,{behavior:ot.parameters,pointerId:f.pointerId,held:!0})};try{for(var je=Qe(_e),At=je.next();!At.done;At=je.next()){var Tt=At.value;dt(Tt)}}catch(nt){R={error:nt}}finally{try{At&&!At.done&&(F=je.return)&&F.call(je)}finally{if(R)throw R.error}}var Gt=_e.find(function(nt){var ot;return((ot=Be.get(nt.id))===null||ot===void 0?void 0:ot.sceneId)===H});if(Gt){var vt=vn.get(Gt.parentId);if(vt?.snapshot().busy)return;Fl(Gt),vt&&!vt.snapshot().busy&&(Ft={pointerId:f.pointerId,boardId:Gt.parentId,tileId:Gt.id,start:ie},(ce=e.setPointerCapture)===null||ce===void 0||ce.call(e,f.pointerId))}Jt=(j=_e.find(function(nt){return nt.contract==="native.button.v1"&&Ae(nt).enabled}))===null||j===void 0?void 0:j.id,en=Jt?f.pointerId:void 0;var xt=n.gameplay.find(function(nt){return nt.kind==="drag"&&_e.some(function(ot){var Vt;return((Vt=ot.prototypeId)!==null&&Vt!==void 0?Vt:ot.id)===nt.componentId})});if(xt){var Tt=_e.find(function(ot){var Vt;return((Vt=ot.prototypeId)!==null&&Vt!==void 0?Vt:ot.id)===xt.componentId});We={b:xt,targetId:Tt.id,start:ie,m:Je([],De(st(Tt)),!1),pointerId:f.pointerId},e.setPointerCapture(f.pointerId)}Pe=at=0,It=!1;try{for(var Zt=Qe(_e),Ot=Zt.next();!Ot.done;Ot=Zt.next()){var Tt=Ot.value;(Tt.contract!=="native.button.v1"||Ae(Tt).enabled)&&Ct({kind:"click",componentId:(he=Tt.prototypeId)!==null&&he!==void 0?he:Tt.id,instanceId:Tt.instanceId,targetId:Tt.id,pointerId:f.pointerId})}}catch(nt){U={error:nt}}finally{try{Ot&&!Ot.done&&(k=Zt.return)&&k.call(Zt)}finally{if(U)throw U.error}}Nr(),nr()}}};function gf(f,R){if(!Ft||Ft.pointerId!==f.pointerId)return!1;if(!f.isTrusted||!ue())return!0;var F=Ft,U=vn.get(F.boardId);if(U.snapshot().busy)return Ft=void 0,!0;var k=Es(In(b.get(F.boardId))),Y=Mn(k,F.start.x,F.start.y),V=Mn(k,R.x,R.y),se=V.x-Y.x,$=V.y-Y.y,ce=b.get(F.tileId);if(Math.max(Math.abs(se),Math.abs($))<Math.min(ce.parameters.width,ce.parameters.height)*.35)return!0;var j=Be.get(ce.id),he=Math.abs(se)>Math.abs($),ie=j.row+(he?0:Math.sign($)),de=j.column+(he?Math.sign(se):0),X=Je([],De(Be),!1).find(function(_e){var Se=De(_e,2),Ie=Se[1];return Ie.boardId===F.boardId&&Ie.row===ie&&Ie.column===de});return X&&U.swap(ce.id,X[0])&&(_t=void 0,nr()),Ft=void 0,!0}var xf=function(f){var R,F;if(!Fe){L();var U=G(),k=uh(f);if(Dt?.pointerId===f.pointerId){f.isTrusted&&ue()&&Ys(k);return}if(St?.pointerId===f.pointerId){f.isTrusted&&ue()&&mf(k),nr();return}var Y=hh(k);if(ft=Y?(R=dh(Y.c).find(function(Ne){return Ne.contract==="native.button.v1"}))===null||R===void 0?void 0:R.id:void 0,!gf(f,k)&&!(!We||We.pointerId!==f.pointerId)){var V=ln(We.targetId);if(!V){ts();return}var se=V.parentId?In(ln(V.parentId)):cs(),$=Es(se),ce=Mn($,We.start.x,We.start.y),j=Mn($,k.x,k.y),he=Je([],De(We.m),!1),ie=We.b.parameters.axis;if(ie!=="y"){var de=We.m[4]+j.x-ce.x;Number.isFinite(We.b.parameters.minX)&&(de=Math.max(We.b.parameters.minX,de)),Number.isFinite(We.b.parameters.maxX)&&(de=Math.min(We.b.parameters.maxX,de)),he[4]=de}if(ie!=="x"){var X=We.m[5]+j.y-ce.y;Number.isFinite(We.b.parameters.minY)&&(X=Math.max(We.b.parameters.minY,X)),Number.isFinite(We.b.parameters.maxY)&&(X=Math.min(We.b.parameters.maxY,X)),he[5]=X}if(!V.parentId)ie!=="y"&&(he[4]=Math.max(0,Math.min(U.width-V.parameters.width,he[4])));else{var _e=gi(V,Sa(se,he)),Se=0;_e.left<0||_e.right-_e.left>U.width?Se=-_e.left:_e.right>U.width&&(Se=U.width-_e.right);var Ie=ie==="y"?0:se[0],Ce=ie==="x"?0:se[2];Math.abs(Ie)>=Math.abs(Ce)&&Math.abs(Ie)>1e-8?he[4]+=Se/Ie:Math.abs(Ce)>1e-8&&(he[5]+=Se/Ce)}var we=(F=Ee.get(V.id))!==null&&F!==void 0?F:{parameters:{}};Ee.set(V.id,Pt(Pt({},we),{transform:he}))}}},yf=function(f){var R;L();var F=uh(f),U=Nt;if(Dt?.pointerId===f.pointerId){var k=Dt,Y=uo(),V=si.get(k.targetId);(R=wn?.getStage(b.get(k.stageId)))===null||R===void 0||R.setGuide([]),Dt=void 0,k.behavior.parameters.powerVariableId&&(B[k.behavior.parameters.powerVariableId]=0);var se=Math.hypot(Y.vx,Y.vz);f.isTrusted&&ph(!0),V&&f.isTrusted&&ue()&&Y.pull>=k.behavior.parameters.minPullPx&&se>=k.behavior.parameters.minSpeed&&(V.vx=Y.vx,V.vy=0,V.vz=Y.vz,V.atRest=!1,V.restElapsed=0,V.movingTime=0,V.captured=!1,V.lastSafe={x:V.x,y:V.y,z:V.z},Ct({kind:"launch",componentId:k.sourceId})),Lr(f),Nr();return}if(St?.pointerId===f.pointerId){var k=St,Y=fh(),V=Sn.get(k.targetId);St=void 0,k.behavior.parameters.powerVariableId&&(B[k.behavior.parameters.powerVariableId]=0),V&&f.isTrusted&&ue()&&Y.pull>=k.behavior.parameters.minPullPx&&(V.vx=Y.vx,V.vy=Y.vy,V.atRest=!1,V.restElapsed=0,V.captured=!1,V.exited=!1,Ct({kind:"launch",componentId:k.sourceId,instanceId:V.instanceId})),Lr(f),Nr(),nr();return}if(gf(f,F),Ft?.pointerId===f.pointerId&&(Ft=void 0),Lr(f),!(U?.pointerId!==f.pointerId||!f.isTrusted||!ue()||navigator.userActivation&&navigator.userActivation.isActive!==!0||!mt(U.condition))){var $=hh(F);!$||!dh($.c).some(function(ce){return ce.id===U.targetId&&(ce.contract!=="native.button.v1"||Ae(ce).enabled)})||(p?p.openStore(n.base.storeUrl):window.open(n.base.storeUrl,"_blank","noopener"))}},Bl=function(f){Dt?.pointerId===f.pointerId&&tr(f.pointerId),St?.pointerId===f.pointerId&&(St.behavior.parameters.powerVariableId&&(B[St.behavior.parameters.powerVariableId]=0),St=void 0),Ft?.pointerId===f.pointerId&&(Ft=void 0),Lr(f)},_f=function(f){f?.isTrusted&&!u&&!Fe&&!Ge&&ph(!0)},mh=function(){pt||nr()},Ss=typeof globalThis.ResizeObserver=="function"?new globalThis.ResizeObserver(mh):void 0;try{(a=Ss?.observe)===null||a===void 0||a.call(Ss,e)}catch{}var Mf=function(){te=0,Te=0,document.hidden&&ae(),qe&&(document.hidden?qe.suspend().catch(function(){}):!Fe&&ke&&Js())};document.addEventListener("visibilitychange",Mf),(o=globalThis.addEventListener)===null||o===void 0||o.call(globalThis,"resize",mh),e.addEventListener("pointerdown",vf),e.addEventListener("pointermove",xf),e.addEventListener("pointerup",yf),e.addEventListener("pointercancel",Bl),e.addEventListener("lostpointercapture",Bl),e.addEventListener("click",_f);var vh=p?.onVisibilityChanged(function(f){ge=f,te=0,Te=0,f||ae(),qe&&(f?!Fe&&ke&&Js():qe.suspend().catch(function(){}))}),gh=p?.onClosed(function(){Ge=!0,te=0,Te=0,ae(),es()});function Sf(f){var R=!u&&!Fe&&!document.hidden&&ye&&ge&&!Ge;if(R&&Te&&(Ue+=Math.min((f-Te)/1e3,5/60)),ue()){Pe=at=0,It=!1,Te&&(te+=Math.min((f-Te)/1e3,5/60));for(var F=0;F<5&&te>=1/60;F++)mo(1/60),te-=1/60;Nr()}else te=0;Te=f,nr(),Lt=requestAnimationFrame(Sf)}return _s(),u&&(H=h),nr(),Lt=requestAnimationFrame(Sf),p&&p.init().then(function(){pt||(ye=!0,ge=p.isVisible(),te=0,Te=0)}).catch(function(){pt||(Ge=!0,ae(),es())}),{state:me,auditViewport:l0,auditSceneLayout:c0,restart:function(){_s(),nr()},select:function(f){W=f},inspectScene:function(f){u&&n.scenes.some(function(R){return R.id===f})&&(H=f,W=void 0)},pause:function(f){Fe=f,te=0,Te=0,f&&ae(),qe&&(f?qe.suspend().catch(function(){}):ke&&Js())},destroy:function(){var f,R;pt=!0,cancelAnimationFrame(Lt),ae(),es(),wn?.dispose(),vh?.(),gh?.(),p?.destroy(),(f=Ss?.disconnect)===null||f===void 0||f.call(Ss),document.removeEventListener("visibilitychange",Mf),(R=globalThis.removeEventListener)===null||R===void 0||R.call(globalThis,"resize",mh),e.removeEventListener("pointerdown",vf),e.removeEventListener("pointermove",xf),e.removeEventListener("pointerup",yf),e.removeEventListener("pointercancel",Bl),e.removeEventListener("lostpointercapture",Bl),e.removeEventListener("click",_f),qe?.close().catch(function(){})}}}return T0(BM);})();
