(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{440:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(1),c=r(2),i=r(150),l=r.n(i),s=(r(524),r(16)),u=function(e){var t=e.userData,r=Object(n.useState)(!1),i=Object(o.a)(r,2),u=i[0],m=(i[1],Object(c.o)()),f=t._id;function h(){m("/dashboard/updateProfile/".concat(f),{state:{id:f,userData:t}})}function d(){m("/dashboard/SubjectTests",{state:{id:f}})}return a.a.createElement("div",null,a.a.createElement("link",{href:"https://use.fontawesome.com/releases/v5.15.1/css/all.css",rel:"stylesheet"}),a.a.createElement(s.h,{show:u,tag:"nav",className:"d-lg-block bg-white sidebar"},a.a.createElement("div",{className:"position-sticky"},a.a.createElement(s.p,{flush:!0,className:"mx-3 mt-4"},a.a.createElement(s.C,{rippleTag:"span"},a.a.createElement(s.q,{tag:"a",onClick:function(){m("/dashboard")},action:!0,className:"border-0 border-bottom rounded rounded"},a.a.createElement(s.n,{fas:!0,icon:"tachometer-alt me-3"}),"Main Dashboard")),a.a.createElement(s.C,{rippleTag:"span"},a.a.createElement(s.q,{tag:"a",onClick:h,action:!0,className:"border-0 border-bottom rounded","aria-current":"true"},a.a.createElement(s.n,{fas:!0,icon:"user-edit me-3"}),"Edit Profile")),a.a.createElement(s.C,{rippleTag:"span"},a.a.createElement(s.q,{tag:"a",onClick:d,action:!0,className:"border-0 border-bottom rounded"},a.a.createElement(s.n,{fas:!0,icon:"fas fa-book me-3"}),"Available Tests")),a.a.createElement(s.C,{rippleTag:"span"},a.a.createElement(s.q,{tag:"a",onClick:function(){m("/dashboard/viewTestResults")},action:!0,className:"border-0 border-bottom rounded"},a.a.createElement(s.n,{fas:!0,icon:"fas fa-receipt me-3"}),"View Test Results"))))),a.a.createElement(s.y,{expand:"lg",light:!0,style:{backgroundColor:"#B6C0E5"}},a.a.createElement(s.i,{fluid:!0},a.a.createElement(s.z,{href:"/"},a.a.createElement("img",{src:l.a,height:"50",width:"150",alt:"",loading:"lazy",style:{borderRadius:"10px"}})),a.a.createElement(s.B,{className:"d-flex justify-content-center align-items-center w-100"},a.a.createElement("div",{className:"text-center"},a.a.createElement("h1",{className:"lobster"},"Student Dashboard"))),a.a.createElement(s.B,{className:"d-flex flex-row justify-content-end w-auto"},a.a.createElement(s.A,{className:"me-3 me-lg-0 d-flex align-items-center"},a.a.createElement(s.j,null,a.a.createElement(s.m,{tag:"a",href:"#!",className:"hidden-arrow nav-link"},a.a.createElement(s.n,{fas:!0,icon:"bell"}),a.a.createElement(s.a,{color:"danger",notification:!0,pill:!0},"1")),a.a.createElement(s.l,null,a.a.createElement(s.k,null,a.a.createElement("div",{onClick:d},"View Your Tests"))))),a.a.createElement(s.A,{className:"me-3 me-lg-0 d-flex align-items-center"},a.a.createElement(s.j,null,a.a.createElement(s.m,{tag:"a",onClick:h,className:"hidden-arrow nav-link"},a.a.createElement("img",{src:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",className:"rounded-circle",height:"45",alt:"",loading:"lazy"})),a.a.createElement(s.l,null,a.a.createElement(s.k,null,a.a.createElement("div",{href:"#"},"My profile")),a.a.createElement(s.k,null,a.a.createElement("div",{href:"#"},"Settings")),a.a.createElement(s.k,null,a.a.createElement("div",{href:"#"},"Logout")))),a.a.createElement(s.b,{onClick:function(){fetch("".concat("https://sparkling-sneakers-bee.cyclic.app","/logout"),{method:"POST",headers:{"Content-Type":"application/json",token:localStorage.getItem("token")}}).then(function(e){return e.json()}).then(function(e){"ok"===e.status?(console.log("Logout Succesfully"),window.localStorage.clear(),window.location.href="./sign-in"):console.log("Logout error:",e.error)}).catch(function(e){console.log("Logout error:",e)})},color:"danger",style:{width:"100px",marginLeft:"10px"}},"Log Out"))))))},m=r(441);r(528);function f(e){var t=e.userId,r=Object(c.o)(),i=Object(n.useState)([]),l=Object(o.a)(i,2),u=l[0],f=l[1];function h(){r("/dashboard/SubjectTests",{state:{id:t}})}return console.log(t,"userId"),Object(n.useEffect)(function(){fetch("".concat("https://sparkling-sneakers-bee.cyclic.app","/upcomingTests")).then(function(e){return e.json()}).then(function(e){f(e.data),console.log(e.data)}).catch(function(e){console.error(e)})},[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",null,"Upcoming Test Reminders"),a.a.createElement(s.D,{className:"row-cols-1 row-cols-md-3 g-2"},u.map(function(e,t){return a.a.createElement(s.g,{key:t,className:"col-4"},a.a.createElement(s.c,{className:"custom-card",alignment:"center"},a.a.createElement(s.f,null,a.a.createElement(m.a,null)," Reminder"),a.a.createElement(s.d,null,a.a.createElement("h5",null,e.subject),a.a.createElement("h6",null,e.testName),a.a.createElement("p",null,e.daysLeft," days left"),a.a.createElement(s.b,{onClick:h},"View")),a.a.createElement(s.e,{className:"text-muted"})))})))}var h=r(5),d=r(56),p=r(925),g=r(504),v=r(505),y=r(916),E=r(106),b=r(924),w=r(265);function k(){k=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(T){l=function(e,t,r){return e[t]=r}}function s(e,t,r,a){var o=t&&t.prototype instanceof f?t:f,c=Object.create(o.prototype),i=new N(a||[]);return n(c,"_invoke",{value:w(e,r,i)}),c}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(T){return{type:"throw",arg:T}}}e.wrap=s;var m={};function f(){}function h(){}function d(){}var p={};l(p,o,function(){return this});var g=Object.getPrototypeOf,v=g&&g(g(O([])));v&&v!==t&&r.call(v,o)&&(p=v);var y=d.prototype=f.prototype=Object.create(p);function E(e){["next","throw","return"].forEach(function(t){l(e,t,function(e){return this._invoke(t,e)})})}function b(e,t){var a;n(this,"_invoke",{value:function(n,o){function c(){return new t(function(a,c){!function n(a,o,c,i){var l=u(e[a],e,o);if("throw"!==l.type){var s=l.arg,m=s.value;return m&&"object"==typeof m&&r.call(m,"__await")?t.resolve(m.__await).then(function(e){n("next",e,c,i)},function(e){n("throw",e,c,i)}):t.resolve(m).then(function(e){s.value=e,c(s)},function(e){return n("throw",e,c,i)})}i(l.arg)}(n,o,a,c)})}return a=a?a.then(c,c):c()}})}function w(e,t,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return S()}for(r.method=a,r.arg=o;;){var c=r.delegate;if(c){var i=x(c,r);if(i){if(i===m)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=u(e,t,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}function x(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var a=u(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,m;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function N(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function O(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:S}}function S(){return{value:void 0,done:!0}}return h.prototype=d,n(y,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:h,configurable:!0}),h.displayName=l(d,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,l(e,i,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},E(b.prototype),l(b.prototype,c,function(){return this}),e.AsyncIterator=b,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var c=new b(s(t,r,n,a),o);return e.isGeneratorFunction(r)?c:c.next().then(function(e){return e.done?e.value:c.next()})},E(y),l(y,i,"Generator"),l(y,o,function(){return this}),l(y,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=O,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return c.type="throw",c.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var i=r.call(o,"catchLoc"),l=r.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;L(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:O(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),m}},e}function x(e){var t=e.userId,r=Object(n.useState)(""),c=Object(o.a)(r,2),i=c[0],l=c[1],s=Object(n.useState)([]),u=Object(o.a)(s,2),m=u[0],f=u[1];Object(n.useEffect)(function(){(function(){var e=Object(h.a)(k().mark(function e(){var r,n;return k().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://sparkling-sneakers-bee.cyclic.app","/getStudentResults"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:t})});case 3:return r=e.sent,e.next=6,r.json();case 6:if(n=e.sent,!r.ok){e.next=11;break}f(n.studentResults),e.next=13;break;case 11:throw console.log(n),new Error(n.message);case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.error(e.t0);case 18:case"end":return e.stop()}},e,null,[[0,15]])}));return function(){return e.apply(this,arguments)}})()()},[t]);var x=function(e){var t={};return e.forEach(function(e){var r=e.subject,n=e.testname,a=e.percentageScore;t[r]||(t[r]=[]),t[r].push({name:n,Score:a})}),t}(m),j=i?x[i]:[];return a.a.createElement("div",null,a.a.createElement("h3",null,"Tests Results"),a.a.createElement(d.a,{variant:"tabs",activeKey:i,onSelect:function(e){l(e)}},Object.keys(x).map(function(e,t){return a.a.createElement(d.a.Item,{key:t},a.a.createElement(d.a.Link,{eventKey:e},e," Tests"))})),a.a.createElement(p.a,{width:900,height:300,data:j,margin:{top:5,right:30,left:20,bottom:5},barSize:20},a.a.createElement(g.a,{dataKey:"name",scale:"point",padding:{left:10,right:10}}),a.a.createElement(v.a,{domain:[0,100]}),a.a.createElement(y.a,null),a.a.createElement(E.a,null),a.a.createElement(b.a,{strokeDasharray:"3 3"}),a.a.createElement(w.a,{dataKey:"Score",fill:"#8884d8",background:{fill:"#eee"}})))}var j=r(431);function L(e){var t=e.userData,r=t._id;return a.a.createElement(a.a.Fragment,null,a.a.createElement(u,{userData:t}),a.a.createElement(s.i,null,a.a.createElement(s.D,{className:"g-2"},a.a.createElement(s.g,{size:"2"}),a.a.createElement(s.g,{size:"10"},a.a.createElement("div",{className:"auth-wrapper",style:{height:"auto"}},a.a.createElement("div",{className:"auth-inner",style:{width:"auto"}},a.a.createElement("h2",{className:"mogra"},"Hi ",t.fname," ",t.lname,a.a.createElement("span",{role:"img","aria-label":"student-emoji"},"\ud83c\udf93")),a.a.createElement(j.a,{userData:t}),a.a.createElement("br",null),a.a.createElement(x,{userId:r}),a.a.createElement("br",null),a.a.createElement(f,{userId:r})))))))}r.d(t,"default",function(){return L})}}]);
//# sourceMappingURL=3.e5dea050.chunk.js.map