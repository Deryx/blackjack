(window.webpackJsonpblackjack=window.webpackJsonpblackjack||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(4),c=n.n(l),i=(n(10),n(1)),o={Clubs:"\u2663",Diamonds:"\u2666",Hearts:"\u2665",Spades:"\u2660"},s={A:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,J:10,Q:10,K:10},u=(n(11),function(e){var t=["card"];return t.push(e.suit===o.Diamonds||e.suit===o.Hearts?"red":"black"),t=t.join(" "),a.a.createElement("div",{className:t},a.a.createElement("div",{className:"left-corner"},a.a.createElement("div",null,e.rank),a.a.createElement("div",null,e.suit)),a.a.createElement("div",{className:"right-corner"},a.a.createElement("div",{className:"invert"},e.suit),a.a.createElement("div",{className:"invert"},e.rank)))});function d(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){i=!0,l=e},f:function(){try{c||null==n.return||n.return()}finally{if(i)throw l}}}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=[],y=function(e){for(var t=Object.values(o),n=Object.keys(s),r=0;r<e;r++){var l,c=d(t);try{for(c.s();!(l=c.n()).done;){var i,m=l.value,y=d(n);try{for(y.s();!(i=y.n()).done;){var v=i.value;f.push(a.a.createElement(u,{suit:m,rank:v}))}}catch(h){y.e(h)}finally{y.f()}}}catch(h){c.e(h)}finally{c.f()}}return f},v=n(2),h=(n(12),function(e){return a.a.createElement("div",{id:"score"+e.player,className:"score"},a.a.createElement("span",null,"score:"),a.a.createElement("span",null,e.score))}),p=(n(13),function(e){return a.a.createElement("div",null,a.a.createElement("button",{id:"hitBtn"+e.player,onClick:e.hitBtnClick,disabled:e.stayedStatus},"hit"))}),b=(n(14),function(e){return a.a.createElement("div",null,a.a.createElement("button",{id:"stayBtn"+e.player,onClick:e.stayBtnClick},"stay"))}),E=(n(15),function(e){return a.a.createElement("div",{id:"hand"+e.player,className:"cards"},e.cards)}),S=(n(16),function(e){return a.a.createElement("div",{className:"buttons"},a.a.createElement("button",{id:"newGameBtn",onClick:e.newGameBtnClick},"New Game"))}),w=function(e){for(var t=0,n=0;n<e.length;n++){var r=e[n].props.rank;t+=s[r]}return t},k=(n(17),function(e){var t,n=e.deck,l=Object(r.useState)(1),c=Object(v.a)(l,2),o=c[0],s=c[1],u=Object(r.useState)({dealerHand:e.dealerCards,playerHands:e.playersCards}),d=Object(v.a)(u,2),m=d[0],f=d[1],y=function(){s(o+1)},k=function(){return o===N.length},g=function(){var e=document.querySelector(".dealerRow #handDealer div:first-child .left-corner"),t=document.querySelectorAll(".dealerRow #handDealer div.card:nth-child(n+2)"),n=document.querySelector("#scoreDealer"),r=document.querySelector("#dealerSection .score span:nth-child(2)"),a=document.querySelectorAll(".playersRow div[id^=score] span:nth-child(2)");e.style.visibility="visible";for(var l=0;l<t.length;l++)t[l].style.visibility="visible";n.style.visibility="visible";for(var c=parseInt(r.innerText),i=0;i<a.length;i++)q(i,c)},A=function(e){var t=e.target.id,r=parseInt(t.split("")[t.length-1]),a=document.querySelector("#stayBtn"+r),l=document.querySelector("#hitBtn"+r),c=document.querySelector("#dealerSection .score span:nth-child(2)"),o=parseInt(c.innerText),s=n.shift(),u=N,d=N[r];d=[].concat(Object(i.a)(d),[s]),w(d)>21&&(y(),a.disabled=!0,l.disabled=!0,q(r,o),k()&&g()),u[r]=d,f({dealerHand:B,playerHands:u})},q=function(e,t){var n=document.querySelector("#score"+e+" span:nth-child(2)"),r=parseInt(n.innerText),a=document.querySelector("#player"+e+"GameStatus");""===a.innerText&&(r<=21&&t>21&&(a.innerText="You win!"),r<=21&&r>t&&(a.innerText="You win!"),r>21&&(a.innerText="You lose!"),r<=21&&r<t&&(a.innerText="You lose!"),r<=21&&t<=21&&r===t&&(a.innerText="You tie!"))},j=function(e){var t=e.target.id,n=parseInt(t.split("")[t.length-1]),r=document.querySelector("#"+t),a="hitBtn"+n;document.querySelector("#"+a).disabled=!0,r.disabled=!0,y(),k()&&g()},B=m.dealerHand,N=m.playerHands;return t=function(){for(var e=[],t=0;t<N.length;t++)e.push(a.a.createElement("div",{id:"player"+t,className:"playerArea"},a.a.createElement("div",{id:"player"+t+"Buttons",className:"buttons"},a.a.createElement(p,{player:t,hitBtnClick:A}),a.a.createElement(b,{player:t,stayBtnClick:j})),a.a.createElement("div",{id:"player"+t+"GameStatus",className:"gameStatus"}),a.a.createElement("div",{id:"player"+t+"Cards",className:"cardArea"},a.a.createElement(h,{player:t,score:"A"===N[t][0].props.rank||"A"===N[t][1].props.rank?w(N[t])+10:w(N[t])}),a.a.createElement(E,{player:t,cards:N[t]}))));return e}(),a.a.createElement("div",{className:"bj-table"},a.a.createElement("div",{id:"dealerSection"},a.a.createElement("div",{className:"dealerRow"},a.a.createElement("div",{className:"dealerArea"},a.a.createElement(h,{player:"Dealer",score:"A"===B[0].props.rank||"A"===B[1].props.rank?w(B)+10:w(B)}),a.a.createElement(E,{player:"Dealer",cards:B})))),a.a.createElement(S,{newGameBtnClick:function(){var e,t=document.querySelector(".dealerRow #handDealer div:first-child .left-corner"),r=document.querySelectorAll(".dealerRow #handDealer div.card:nth-child(n+3)"),a=document.querySelector("#scoreDealer"),l=document.querySelectorAll(".playersRow div[id^=score] span:nth-child(2)"),c=document.querySelectorAll("button[id^='stayBtn']"),o=document.querySelectorAll("button[id^='hitBtn']"),u=document.querySelectorAll("button[id^='aceBtn']");s(1),function(){for(var e=[],t=[],r=0;r<N.length;r++)t.push([]);for(var a=0;a<2;a++){for(var l=0;l<N.length;l++)t[l]=[].concat(Object(i.a)(t[l]),[n.shift()]);e=[].concat(Object(i.a)(e),[n.shift()])}for(;w(e)<17;)e=[].concat(Object(i.a)(e),[n.shift()]);f({dealerHand:e,playerHands:t})}(),t.style.visibility="hidden";for(var d=0;d<r.length;d++)r[d].style.visibility="hidden";a.style.visibility="hidden",c.forEach((function(e){return e.disabled=!1})),o.forEach((function(e){return e.disabled=!1})),u.forEach((function(e){return e.disabled,!1}));for(var m=0;m<l.length;m++)e=m,document.querySelector("#player"+e+"GameStatus").innerText=""}}),a.a.createElement("div",{id:"playersSection"},a.a.createElement("div",{className:"playersRow"},t)))}),g=(n(18),[]),A=[],q=0,j=function e(t,n,r){if(q<t){var a=function(e){return Math.floor(Math.random()*e)}(n);return r.push(a),q++,e(t,n,r)}return q=0,r},B=y(8);B=function(e){var t=e.length,n=[],r=[];j(t,t,n);for(var a=0;a<t;a++)r.push(e[n[a]]);return r}(B);!function(){for(var e=[],t=[],n=0;n<5;n++)t.push([]);for(var r=0;r<2;r++){for(var a=0;a<5;a++)t[a]=[].concat(Object(i.a)(t[a]),[B.shift()]);e.push(B.shift())}for(;w(e)<17;)e.push(B.shift());g=[].concat(e),A=[].concat(t)}();var N=function(){return a.a.createElement("div",{className:"game"},a.a.createElement(k,{dealerCards:g,playersCards:A,deck:B}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.cda19fc6.chunk.js.map