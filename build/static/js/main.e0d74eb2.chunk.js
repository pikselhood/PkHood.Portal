(this.webpackJsonppixel=this.webpackJsonppixel||[]).push([[0],{156:function(e,t,n){},236:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),a=n(28),i=n.n(a),s=n(20),r=n(21),l=n(23),d=n(22),u=n(69),j=n(9),g=n(2),b=n(239),h=n(240),O=n(242),f=n(243),p=n(92),x=n.n(p),m=n(93),k=(n(156),n(11)),y=b.a.Header,v=b.a.Footer,w=b.a.Content;h.a.Option;function S(){var e=Object(o.useState)(),t=Object(g.a)(e,2),n=t[0],c=t[1],a=Object(o.useState)(),i=Object(g.a)(a,2),s=i[0],r=i[1],l=Object(o.useState)(!1),d=Object(g.a)(l,2),u=d[0],h=d[1],p=Object(j.f)(),S=function(e){console.log("login success. Ptoken: ",e),r(e),h(!0)};return Object(o.useEffect)((function(){n&&x.a.get("http://20.120.33.143:5000/user/authorize?googleIdToken="+n).then((function(e){S(e.data.PToken)})).catch((function(e){x.a.post("http://20.120.33.143:5000/user/create",{googleIdToken:n}).then((function(e){S(e.data.pToken)})).catch((function(e){return console.log(e)}))}))}),[n]),Object(o.useEffect)((function(){s?window.localStorage.setItem("p_token",s):window.localStorage.removeItem("p_token")}),[s]),Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(b.a,{children:[Object(k.jsx)(y,{children:Object(k.jsxs)(O.a,{className:"antd-menu",theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],children:[Object(k.jsx)("img",{src:"./logo.svg",alt:"Logo",style:{height:"64px"}}),u&&Object(k.jsx)(m.GoogleLogout,{clientId:"215306563787-3h1jm6ccsqg6cbgckf3datbrt1d24hk8.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(){console.log("logged out."),r(void 0),h(!1)}}),!u&&Object(k.jsx)(m.GoogleLogin,{clientId:"215306563787-3h1jm6ccsqg6cbgckf3datbrt1d24hk8.apps.googleusercontent.com",buttonText:"Login with Google",onSuccess:function(e){c(e.tokenObj.id_token)},onFailure:function(e){console.log("logging failed.",e)},cookiePolicy:"single_host_origin",isSignedIn:!0})]})}),Object(k.jsx)(w,{children:Object(k.jsx)("div",{className:"play",children:u&&s&&Object(k.jsx)(f.a,{onClick:function(){p("play")},children:"Play"})})}),Object(k.jsx)(v,{children:"Footer"})]})})}var L=n(95);function I(){var e=Object(j.f)(),t=window.localStorage.p_token;t||e("/");var n=Object(L.useUnityContext)({loaderUrl:"unity/Build.loader.js",dataUrl:"unity/Build.data",frameworkUrl:"unity/Build.framework.js",codeUrl:"unity/Build.wasm"}),o=n.unityProvider,c=n.sendMessage,a=(n.addEventListener,n.removeEventListener,n.loadingProgression),i=n.isLoaded,s=Math.round(100*a);return c("Auth","SetPToken",t),Object(k.jsxs)("div",{className:"container",children:[!1===i&&Object(k.jsx)("div",{className:"loading-overlay",children:Object(k.jsxs)("p",{children:["Loading... (",s,"%)"]})}),Object(k.jsx)(L.Unity,{className:"unity",unityProvider:o,style:{width:"100%",height:"100%"}})]})}var P=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(k.jsx)(u.a,{children:Object(k.jsxs)(j.c,{children:[Object(k.jsx)(j.a,{path:"/play",element:Object(k.jsx)(I,{})}),Object(k.jsx)(j.a,{path:"/",element:Object(k.jsx)(S,{})})]})})}}]),n}(o.Component),T=P;n(235);i.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsx)(T,{})}),document.getElementById("root"))}},[[236,1,2]]]);