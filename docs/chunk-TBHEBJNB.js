import{d as Le,e as K,f as Ae,g as ze}from"./chunk-OREF4QRJ.js";import{a as Qe,b as Ue,c as me,s as ft}from"./chunk-SU5IE62J.js";import{$ as Ce,$a as ae,$e as lt,Aa as I,Ab as De,Bb as P,Ca as R,Cb as x,Db as S,De as et,Fb as j,Gb as Ie,Ge as tt,Ha as l,Hb as D,Ia as E,Ib as q,Jb as Q,Lc as J,Ld as We,Le as nt,Mc as b,Md as Ne,Me as it,Od as Z,Pd as $,Ra as V,Sd as qe,Ue as ot,V as be,Ve as at,Wa as w,Wb as U,Wd as ee,We as rt,Xa as ke,Xb as G,Xd as te,Ya as f,Ye as st,Z as ie,Za as L,Zb as He,_a as C,a as ue,aa as Me,ab as Pe,af as mt,b as ge,bb as k,bc as X,bd as le,bf as dt,cb as Se,cc as Y,db as A,df as ct,eb as z,ec as Ve,ef as pt,fa as y,fb as r,fe as Ge,ff as ut,gb as s,ge as Xe,gf as gt,hb as _,he as Ye,ia as O,ja as xe,jd as Be,k as fe,ka as B,kd as Re,la as ve,lb as v,me as Je,nc as Fe,ob as M,pa as ye,qb as m,ra as p,rb as je,re as Ke,sa as u,sb as re,se as Ze,t as F,ta as Oe,tb as Ee,u as he,ua as we,ub as Te,vb as W,wb as N,xb as T,ya as oe,yb as c,z as _e,zb as se,ze as $e}from"./chunk-YWCUAPD2.js";var Pt=t=>({active:t}),St=t=>({paths:t,queryParams:"ignored",matrixParams:"ignored",fragment:"ignored"}),jt=t=>({"padding-left.px":t}),Et=t=>({expanded:t}),Tt=()=>[];function Dt(t,e){if(t&1&&_(0,"mat-icon",7),t&2){let a=m();ae(a.menu.style),f("svgIcon",a.menu.icon)}}function It(t,e){if(t&1&&(r(0,"mat-icon"),c(1),s()),t&2){let a=m();ae(a.menu.style),l(),se(a.menu.icon)}}function Ht(t,e){if(t&1){let a=v();r(0,"button",8),M("click",function(n){p(a);let i=m();return u(i.toggleItem(n))}),r(1,"mat-icon",9),c(2," expand_more "),s()()}if(t&2){let a=m(),o=T(2);f("disabled",o.isActive),ke("aria-label","Ouvrir le menu "+a.menu.text),l(),f("ngClass",D(3,Et,a.expanded))}}function Vt(t,e){if(t&1&&_(0,"mdl-side-menu-item",10),t&2){let a=e.$implicit,o=m(2);f("level",o.level+1)("menu",a)}}function Ft(t,e){if(t&1&&A(0,Vt,1,2,"mdl-side-menu-item",10,Se),t&2){let a,o=m();z((a=o.menu.children)!==null&&a!==void 0?a:Ie(0,Tt))}}var ht=(()=>{let e=class e{constructor(){this.level=0,this.simple=!1}get _simple(){return this.simple}get expanded(){return this.menu.expanded||this.rla&&this.rla.isActive}toggleItem(o){this.menu.expanded=!this.menu.expanded}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=O({type:e,selectors:[["mdl-side-menu-item"]],viewQuery:function(n,i){if(n&1&&Te(me,5),n&2){let d;W(d=N())&&(i.rla=d.first)}},hostVars:2,hostBindings:function(n,i){n&2&&C("simple",i._simple)},inputs:{level:"level",menu:"menu",simple:"simple"},standalone:!0,features:[j],decls:9,vars:17,consts:[["rla","routerLinkActive"],[1,"menu-item-content",3,"ngClass"],["matRipple","","routerLinkActive","active",3,"matRippleDisabled","matRippleColor","routerLink","routerLinkActiveOptions","ngStyle"],[3,"svgIcon","style"],[3,"style"],[1,"content"],["mat-icon-button","",1,"menu-item-expand-button",3,"disabled"],[3,"svgIcon"],["mat-icon-button","",1,"menu-item-expand-button",3,"click","disabled"],[1,"expand-icon","mat-icon-rtl-mirror",3,"ngClass"],[1,"child",3,"level","menu"]],template:function(n,i){if(n&1&&(r(0,"div",1)(1,"a",2,0),w(3,Dt,1,3,"mat-icon",3)(4,It,2,3,"mat-icon",4),r(5,"div",5),c(6),s()(),w(7,Ht,3,5,"button",6),s(),w(8,Ft,2,1)),n&2){let d,g=T(2);f("ngClass",D(11,Pt,g.isActive)),l(),f("matRippleDisabled",!i.menu.ripple)("matRippleColor",(d=i.menu.rippleColor)!==null&&d!==void 0?d:"#FFFFFF4F")("routerLink",i.menu.link)("routerLinkActiveOptions",D(13,St,i.menu.link==="/"?"exact":"subset"))("ngStyle",D(15,jt,i.simple?0:10+16*i.level)),l(2),k(i.menu.icon&&i.menu.icon.startsWith("sncf")?3:-1),l(),k(i.menu.icon&&!i.menu.icon.startsWith("sncf")?4:-1),l(2),se(i.menu.text),l(),k(!i.simple&&i.menu.children&&i.menu.children.length>0?7:-1),l(),k(!i.simple&&i.expanded?8:-1)}},dependencies:[e,X,Y,Ue,me,Re,Be,$,Z,te,ee],styles:["[_nghost-%COMP%]{display:block;transition:max-height 225ms cubic-bezier(.4,0,.2,1);font-size:1rem}.simple[_nghost-%COMP%]{font-size:.75rem}.simple[_nghost-%COMP%]   .menu-item-content[_ngcontent-%COMP%]{height:80px;border-left-width:0}.simple[_nghost-%COMP%]   .menu-item-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{flex-direction:column;justify-content:center;text-align:center}.menu-item-content[_ngcontent-%COMP%]{display:flex;align-items:stretch;border:0;background:transparent;color:inherit;border-left:6px solid transparent;transition:background-color 225ms cubic-bezier(.4,0,.2,1);box-sizing:border-box;height:48px}.menu-item-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;flex-grow:1;column-gap:.75rem;align-items:center;text-decoration:none;color:inherit}.menu-item-content.active[_ngcontent-%COMP%]{background-color:#00000026;font-weight:700;border-left-color:currentColor}.menu-item-content[_ngcontent-%COMP%]:hover{background-color:#0003}.menu-item-content[_ngcontent-%COMP%]   .menu-item-expand-button[_ngcontent-%COMP%]{margin-left:auto;align-self:center}.menu-item-content[_ngcontent-%COMP%]   .menu-item-expand-button[_ngcontent-%COMP%]   .expand-icon[_ngcontent-%COMP%]{transition:transform 225ms cubic-bezier(.4,0,.2,1)}.menu-item-content[_ngcontent-%COMP%]   .menu-item-expand-button[_ngcontent-%COMP%]   .expand-icon.expanded[_ngcontent-%COMP%]{transform:scaleY(-1)}"],changeDetection:0});let t=e;return t})();var _t=(()=>{let e=class e{constructor(o,n){this.sidenav=o,this.breakpointObserver=n,this._opened=!1,this._simple=!1,this.simpleSubject=new fe(!1),this.menuMode$=he([this.breakpointObserver.observe([b.XSmall,b.Small,b.Medium]).pipe(F(i=>i.matches?"over":"side")),this.simpleSubject]),this.openedChange=new I}get opened(){return this._opened}get simple(){return this._simple}set opened(o){this._opened=o,this.sidenav.opened=o,this.openedChange.emit(o)}set simple(o){this._simple=o,this.sidenav.disableClose=o,this.simpleSubject.next(o)}ngOnInit(){this.sidenav.mode="side",this.sub=this.menuMode$.subscribe(([o,n])=>{n&&(this.opened=!0),this.sidenav.mode=n?"side":o}),this.sub.add(this.sidenav.closedStart.subscribe(()=>this.opened=!1))}ngOnDestroy(){this.sub?.unsubscribe()}};e.\u0275fac=function(n){return new(n||e)(E(K),E(J))},e.\u0275dir=B({type:e,selectors:[["","appMainMenu",""]],inputs:{opened:"opened",simple:"simple"},outputs:{openedChange:"openedChange"},standalone:!0});let t=e;return t})();function bt(t){var e=(t.children??[]).flatMap(bt);return[ge(ue({},t),{children:void 0}),...e]}var Ct=(()=>{let e=class e{transform(o){let n=o.flatMap(bt);return console.log(o,n),n}};e.\u0275fac=function(n){return new(n||e)},e.\u0275pipe=ve({name:"flatten",type:e,pure:!0,standalone:!0});let t=e;return t})();var Rt=["*",[["mat-toolbar-row"]]],Lt=["*","mat-toolbar-row"],de=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=B({type:e,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0});let t=e;return t})(),Mt=(()=>{let e=class e{constructor(o,n,i){this._elementRef=o,this._platform=n,this._document=i}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}};e.\u0275fac=function(n){return new(n||e)(E(R),E(Fe),E(He))},e.\u0275cmp=O({type:e,selectors:[["mat-toolbar"]],contentQueries:function(n,i,d){if(n&1&&Ee(d,de,5),n&2){let g;W(g=N())&&(i._toolbarRows=g)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(n,i){n&2&&(Pe(i.color?"mat-"+i.color:""),C("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[j],ngContentSelectors:Lt,decls:2,vars:0,template:function(n,i){n&1&&(je(Rt),re(0),re(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-app-surface));color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-app-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-app-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-app-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-app-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-app-title-large-tracking));margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface));--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-app-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0});let t=e;return t})();var xt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=xe({type:e}),e.\u0275inj=Me({imports:[le,le]});let t=e;return t})();function ce(t,e){let a=!e?.manualCleanup;a&&!e?.injector&&ye(ce);let o=a?e?.injector?.get(oe)??y(oe):null,n=zt(e?.equal),i;e?.requireSync?i=V({kind:0},{equal:n}):i=V({kind:1,value:e?.initialValue},{equal:n});let d=t.subscribe({next:g=>i.set({kind:1,value:g}),error:g=>{if(e?.rejectErrors)throw g;i.set({kind:2,error:g})}});if(e?.requireSync&&i().kind===0)throw new ie(601,!1);return o?.onDestroy(d.unsubscribe.bind(d)),U(()=>{let g=i();switch(g.kind){case 1:return g.value;case 2:throw g.error;case 0:throw new ie(601,!1)}},{equal:e?.equal})}function zt(t=Object.is){return(e,a)=>e.kind===1&&a.kind===1&&t(e.value,a.value)}var ne=(()=>{let e=class e{constructor(){this.systemPrefersDark=ce(Wt),this.toStorage=G(()=>{let o=this.theme();o==="auto"?localStorage.removeItem("dark"):localStorage.setItem("dark",`${o}`)}),this.applyDark=U(()=>{let o=this.theme();return o==="dark"||o==="auto"&&this.systemPrefersDark()}),this.classMutator=G(()=>{let o=this.applyDark();document.body.classList.add(o?"dark":"light"),document.body.classList.remove(o?"light":"dark")}),this.theme=V(this.getValueFromStorage())}getValueFromStorage(){let o=localStorage.getItem("dark");return o?o==="light"?"light":"dark":"auto"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=Ce({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var vt=window.matchMedia("(prefers-color-scheme: dark)"),Wt=_e(vt,"change").pipe(be(vt),F(t=>t.matches));function Nt(t,e){if(t&1){let a=v();r(0,"div",12)(1,"mat-form-field")(2,"mat-icon",13),c(3,"search"),s(),_(4,"input",14),s()(),r(5,"mat-slide-toggle",15),S("ngModelChange",function(n){p(a);let i=m(2);return x(i.simpleMenu,n)||(i.simpleMenu=n),u(n)}),c(6," Menu simple "),s(),r(7,"mat-slide-toggle",16),S("ngModelChange",function(n){p(a);let i=m(2);return x(i.fixedHeight,n)||(i.fixedHeight=n),u(n)}),c(8," Hauteur de page fixe "),s(),r(9,"mat-button-toggle-group",17),M("valueChange",function(n){p(a);let i=m(2);return u(i.darkMode.theme.set(n))}),r(10,"mat-button-toggle",18),c(11,"auto"),s(),r(12,"mat-button-toggle",19)(13,"mat-icon"),c(14,"light_mode"),s()(),r(15,"mat-button-toggle",20)(16,"mat-icon"),c(17,"dark_mode"),s()()(),r(18,"a",21),_(19,"img",22),s()}if(t&2){let a=m(2);C("light",!a.darkMode.applyDark()),l(5),P("ngModel",a.simpleMenu),l(2),P("ngModel",a.fixedHeight),l(2),f("value",a.darkMode.theme())}}function qt(t,e){if(t&1){let a=v();r(0,"mat-card")(1,"mat-card-content")(2,"mat-slide-toggle",25),S("ngModelChange",function(n){p(a);let i=m(3);return x(i.simpleMenu,n)||(i.simpleMenu=n),u(n)}),c(3," Menu simple "),s(),r(4,"mat-slide-toggle",25),S("ngModelChange",function(n){p(a);let i=m(3);return x(i.fixedHeight,n)||(i.fixedHeight=n),u(n)}),c(5," Hauteur de page fixe "),s(),r(6,"div",26)(7,"div",27),c(8,"Th\xE8me:"),s(),r(9,"mat-button-toggle-group",28),M("valueChange",function(n){p(a);let i=m(3);return u(i.darkMode.theme.set(n))}),r(10,"mat-button-toggle",18),c(11,"auto"),s(),r(12,"mat-button-toggle",19)(13,"mat-icon",29),c(14,"light_mode"),s()(),r(15,"mat-button-toggle",20)(16,"mat-icon",29),c(17,"dark_mode"),s()()()(),r(18,"a",21),_(19,"img",22),s()()()}if(t&2){let a=m(3);l(2),P("ngModel",a.simpleMenu),l(2),P("ngModel",a.fixedHeight),l(5),f("value",a.darkMode.theme())}}function Qt(t,e){if(t&1){let a=v();r(0,"button",23,0),M("click",function(){p(a);let n=m(2);return u(n.popupOpen=!n.popupOpen)}),r(2,"mat-icon"),c(3,"more_vert"),s(),w(4,qt,20,3,"ng-template",24),M("detach",function(){p(a);let n=m(2);return u(n.popupOpen=!1)})("backdropClick",function(){p(a);let n=m(2);return u(n.popupOpen=!1)}),s()}if(t&2){let a=T(1),o=m(2);l(4),f("cdkConnectedOverlayOrigin",a)("cdkConnectedOverlayOpen",o.popupOpen)}}function Ut(t,e){if(t&1){let a=v();r(0,"mat-toolbar")(1,"mat-toolbar-row")(2,"div",1)(3,"div",2),_(4,"img",3),s(),r(5,"button",4),M("click",function(){p(a);let n=m();return u(n.menuOpen=!n.menuOpen)}),r(6,"div",5),Oe(),r(7,"svg",6),_(8,"path",7)(9,"path",8)(10,"path",9),s(),c(11," MDL lib demo "),s()()(),we(),r(12,"div",10),w(13,Nt,20,5)(14,Qt,5,2,"button",11),s()()()}if(t&2){let a=m();l(3),C("simple-menu",a.simpleMenu),l(4),C("open",a.menuOpen),l(6),k(e.breakpoints[a.breakpoints.XSmall]?14:13)}}var yt=(()=>{let e=class e{constructor(){this.darkMode=y(ne),this.breakpoints=b,this.breakpoints$=y(J).observe([b.XSmall,b.Small,b.Medium,b.Large,b.XLarge]),this.popupOpen=!1,this.hostElement=y(R),this.fixedHeightChange=new I,this.menuOpenChange=new I,this.simpleMenuChange=new I}get fixedHeight(){return this._fixedHeight}get menuOpen(){return this._menuOpen}get simpleMenu(){return this._simpleMenu}set fixedHeight(o){this._fixedHeight=o,this.fixedHeightChange.emit(o)}set menuOpen(o){this._menuOpen=o,this.menuOpenChange.emit(o)}set simpleMenu(o){this._simpleMenu=o,this.simpleMenuChange.emit(o)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=O({type:e,selectors:[["app-header"]],inputs:{fixedHeight:"fixedHeight",menuOpen:"menuOpen",simpleMenu:"simpleMenu"},outputs:{fixedHeightChange:"fixedHeightChange",menuOpenChange:"menuOpenChange",simpleMenuChange:"simpleMenuChange"},standalone:!0,features:[j],decls:2,vars:3,consts:[["trigger","cdkOverlayOrigin"],[1,"logos"],[1,"sncf-logo"],["alt","SNCF","src","assets/logo-sncf.svg"],["mat-button","",1,"mdl","menu-button",3,"click"],[1,"flex","gap-2","items-center"],["viewBox","-1 -1 12 12",1,"hamburger-menu"],["d","M0,1 L10,1",1,"top-bar"],["d","M0,5 L10,5",1,"middle-bar"],["d","M0,9 L10,9",1,"bottom-bar"],[1,"ms-auto","flex","gap-4","items-center"],["mat-icon-button","","matTooltip","Menu","cdkOverlayOrigin",""],[1,"small","self-center"],["matIconPrefix",""],["type","text","placeholder","Rechercher...","matInput",""],["color","primary",1,"self-center",3,"ngModelChange","ngModel"],["color","primary",1,"ms-auto",3,"ngModelChange","ngModel"],[1,"options","small","dark",2,"font-size","14px",3,"valueChange","value"],["value","auto","matTooltip","Suit le r\xE9glage syst\xE8me"],["value","light","matTooltip","Mode clair"],["value","dark","matTooltip","Mode sombre"],["mat-flat-button","","color","accent","href","https://github.com/ThomasPrioul/mdl-angular-libs","target","_blank"],["src","assets/GitHub_Logo_White.png","alt","GitHub logo","width","80px"],["mat-icon-button","","matTooltip","Menu","cdkOverlayOrigin","",3,"click"],["cdkConnectedOverlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayDisposeOnNavigation","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen"],["color","primary",1,"w-full",3,"ngModelChange","ngModel"],[1,"flex","w-full"],[2,"align-self","center","margin-right","1rem"],[1,"options","small",2,"font-size","14px",3,"valueChange","value"],[2,"margin-right","0"]],template:function(n,i){if(n&1&&(w(0,Ut,15,5,"mat-toolbar"),q(1,"async")),n&2){let d;k((d=Q(1,1,i.breakpoints$))?0:-1,d)}},dependencies:[Ve,tt,$e,et,xt,Mt,de,gt,pt,ut,lt,rt,st,ct,dt,mt,it,nt,$,Ne,We,Z,te,ee,Ze,Ke,Je,at,ot,Ye,Xe,Ge],styles:['[_nghost-%COMP%]{display:block}.hamburger-menu[_ngcontent-%COMP%]{width:20px;height:20px;stroke:currentColor;transition:all .2s}.hamburger-menu[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:none;color:inherit;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;transition:.2s;transition-property:d}.hamburger-menu.open[_ngcontent-%COMP%]   .top-bar[_ngcontent-%COMP%]{d:path("M1,0 L1,10")}.hamburger-menu.open[_ngcontent-%COMP%]   .middle-bar[_ngcontent-%COMP%]{d:path("M5,10 L5,0")}.hamburger-menu.open[_ngcontent-%COMP%]   .bottom-bar[_ngcontent-%COMP%]{d:path("M9,0 L9,10")}.mat-mdc-card[_ngcontent-%COMP%]{--mdc-elevated-card-container-shape: 8px;--mdc-elevated-card-container-elevation: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}.mat-mdc-card[_ngcontent-%COMP%]   .mat-mdc-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.mat-toolbar-row[_ngcontent-%COMP%]{gap:1rem;overflow-y:auto}.mat-divider[_ngcontent-%COMP%]{height:24px}.logos[_ngcontent-%COMP%]{display:flex;flex-shrink:0;gap:1rem}.sncf-logo[_ngcontent-%COMP%]{display:flex}.sncf-logo[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:48px}.sncf-logo.simple-menu[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:70px;margin-right:1rem}.menu-button[_ngcontent-%COMP%]{margin-left:-8px}.menu-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:25px}.menu-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:20px;margin-bottom:-4px;transition:transform .3s ease-out}.menu-button[_ngcontent-%COMP%]   i.opened[_ngcontent-%COMP%]{transform:scaleY(-1)}.right-buttons[_ngcontent-%COMP%]{margin-left:auto;display:flex;gap:16px;align-items:center}.right-buttons[_ngcontent-%COMP%]   #searchBar[_ngcontent-%COMP%]{flex:1 1 auto;min-width:160px;max-width:400px}@media (max-width: 959.98px){.menu-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:18px}.sncf-logo[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:40px}.title[_ngcontent-%COMP%]{font-size:1rem}#searchBar[_ngcontent-%COMP%]{flex:1;max-width:unset}}'],changeDetection:0});let t=e;return t})();var Ot={name:"mdl-angular",version:"1.2.2",description:"Librairie de composants et styles Angular Material respectant le design system SNCF",author:{name:"Thomas Prioul (MASTERIS)",email:"thomas.prioul@masteris.com"},keywords:["angular","material","components","design system","sncf"],repository:{type:"git",url:"github:ThomasPrioul/mdl-angular-libs"},exports:{".":{sass:"./scss/",types:"./index.d.ts",esm2022:"./esm2022/mdl-angular.mjs",esm:"./esm2022/mdl-angular.mjs",default:"./fesm2022/mdl-angular.mjs"},"./package.json":{default:"./package.json"},"./breadcrumbs":{types:"./breadcrumbs/index.d.ts",esm2022:"./esm2022/breadcrumbs/mdl-angular-breadcrumbs.mjs",esm:"./esm2022/breadcrumbs/mdl-angular-breadcrumbs.mjs",default:"./fesm2022/mdl-angular-breadcrumbs.mjs"},"./dark":{types:"./dark/index.d.ts",esm2022:"./esm2022/dark/mdl-angular-dark.mjs",esm:"./esm2022/dark/mdl-angular-dark.mjs",default:"./fesm2022/mdl-angular-dark.mjs"},"./date-picker":{types:"./date-picker/index.d.ts",esm2022:"./esm2022/date-picker/mdl-angular-date-picker.mjs",esm:"./esm2022/date-picker/mdl-angular-date-picker.mjs",default:"./fesm2022/mdl-angular-date-picker.mjs"},"./fullscreen":{types:"./fullscreen/index.d.ts",esm2022:"./esm2022/fullscreen/mdl-angular-fullscreen.mjs",esm:"./esm2022/fullscreen/mdl-angular-fullscreen.mjs",default:"./fesm2022/mdl-angular-fullscreen.mjs"},"./select":{types:"./select/index.d.ts",esm2022:"./esm2022/select/mdl-angular-select.mjs",esm:"./esm2022/select/mdl-angular-select.mjs",default:"./fesm2022/mdl-angular-select.mjs"},"./side-menu-item":{types:"./side-menu-item/index.d.ts",esm2022:"./esm2022/side-menu-item/mdl-angular-side-menu-item.mjs",esm:"./esm2022/side-menu-item/mdl-angular-side-menu-item.mjs",default:"./fesm2022/mdl-angular-side-menu-item.mjs"},"./spinner":{types:"./spinner/index.d.ts",esm2022:"./esm2022/spinner/mdl-angular-spinner.mjs",esm:"./esm2022/spinner/mdl-angular-spinner.mjs",default:"./fesm2022/mdl-angular-spinner.mjs"},"./table2":{types:"./table2/index.d.ts",esm2022:"./esm2022/table2/mdl-angular-table2.mjs",esm:"./esm2022/table2/mdl-angular-table2.mjs",default:"./fesm2022/mdl-angular-table2.mjs"},"./time-picker":{types:"./time-picker/index.d.ts",esm2022:"./esm2022/time-picker/mdl-angular-time-picker.mjs",esm:"./esm2022/time-picker/mdl-angular-time-picker.mjs",default:"./fesm2022/mdl-angular-time-picker.mjs"},"./tree-select":{types:"./tree-select/index.d.ts",esm2022:"./esm2022/tree-select/mdl-angular-tree-select.mjs",esm:"./esm2022/tree-select/mdl-angular-tree-select.mjs",default:"./fesm2022/mdl-angular-tree-select.mjs"},"./zoom-button":{types:"./zoom-button/index.d.ts",esm2022:"./esm2022/zoom-button/mdl-angular-zoom-button.mjs",esm:"./esm2022/zoom-button/mdl-angular-zoom-button.mjs",default:"./fesm2022/mdl-angular-zoom-button.mjs"}},peerDependencies:{"@angular/cdk":"^18.2.0","@angular/common":">=18.2.0","@angular/core":">=18.2.0","@angular/material":"^18.2.0"},dependencies:{tslib:"^2.3.0"},sideEffects:!1,module:"fesm2022/mdl-angular.mjs",typings:"index.d.ts"};var Xt=(t,e)=>e.link,Yt=t=>({"--header-height":t,"--content-height":"calc(100vh - var(--header-height))"});function Jt(t,e){if(t&1&&_(0,"mdl-side-menu-item",6),t&2){let a=e.$implicit,o=m();f("simple",o.simpleMenu)("menu",a)}}var Kt=(()=>{let e=class e{constructor(){this._dark=y(ne),this.appEnvIndex=0,this.appEnv=pe[0],this.fixedHeight=!0,this.menuOpen=!1,this.menus=[{text:"Accueil",link:"/home",icon:"home",children:[{text:"Table2",link:"/home/table2",icon:"table_rows"},{text:"Forms",link:"/home/forms",icon:"list"}]}],this.simpleMenu=!1,this.version=Ot.version}changeEnv(){++this.appEnvIndex>=pe.length&&(this.appEnvIndex=0),this.appEnv=pe[this.appEnvIndex]}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=O({type:e,selectors:[["app-showcase"]],standalone:!0,features:[j],decls:19,vars:22,consts:[["header",""],[1,"app-header","dark",3,"fixedHeightChange","simpleMenuChange","menuOpenChange","fixedHeight","simpleMenu","menuOpen"],[1,"app-sidenav-container"],["appMainMenu","",1,"app-sidenav","dark",3,"openedChange","simple","opened"],[1,"menu",3,"ngClass"],[1,"menu-group"],[3,"simple","menu"],[1,"menu-group","mt-auto"],[1,"flex","p-3","items-center","gap-3"],["id","logo","alt","APP LOGO",1,"app-logo","no-path"],[1,"small","ms-auto","text-align-right",3,"click"],[3,"ngStyle"]],template:function(n,i){if(n&1){let d=v();r(0,"app-header",1,0),S("fixedHeightChange",function(h){return p(d),x(i.fixedHeight,h)||(i.fixedHeight=h),u(h)})("simpleMenuChange",function(h){return p(d),x(i.simpleMenu,h)||(i.simpleMenu=h),u(h)})("menuOpenChange",function(h){return p(d),x(i.menuOpen,h)||(i.menuOpen=h),u(h)}),s(),r(2,"mat-sidenav-container",2)(3,"mat-sidenav",3),S("openedChange",function(h){return p(d),x(i.menuOpen,h)||(i.menuOpen=h),u(h)}),r(4,"div",4)(5,"div",5),A(6,Jt,1,2,"mdl-side-menu-item",6,Xt),q(8,"flatten"),s(),r(9,"div",7)(10,"div",8),_(11,"img",9),r(12,"div",10),M("click",function(){return p(d),u(i.changeEnv())}),c(13),_(14,"br"),c(15," Click to change env "),s()()()()(),r(16,"mat-sidenav-content")(17,"main",11),_(18,"router-outlet"),s()()()}if(n&2){let d=T(1);P("fixedHeight",i.fixedHeight)("simpleMenu",i.simpleMenu)("menuOpen",i.menuOpen),l(3),L("top",d.hostElement.nativeElement.offsetHeight,"px"),C("sncf-nav",i.simpleMenu),f("simple",i.simpleMenu),P("opened",i.menuOpen),l(),f("ngClass",i.appEnv),l(2),z(i.simpleMenu?Q(8,18,i.menus):i.menus),l(4),L("flex-direction",i.simpleMenu?"column":void 0),l(3),De(" v",i.version,""),l(4),L("min-height","var(--content-height)")("height",i.fixedHeight?"var(--content-height)":null),f("ngStyle",D(20,Yt,d.hostElement.nativeElement.offsetHeight+"px"))}},dependencies:[X,Y,Qe,ze,K,Ae,Le,ht,_t,Ct,yt],styles:[".app-header[_ngcontent-%COMP%]{width:100%;position:sticky;top:0;z-index:1;border-bottom:1px solid #222}.app-sidenav-container[_ngcontent-%COMP%]{min-height:100%;width:100%;height:max-content;margin:0;transform:none;z-index:0;position:relative}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]{position:fixed;top:64px;bottom:0;left:0;min-width:260px;border-right:0}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav.sncf-nav[_ngcontent-%COMP%]{min-width:unset;width:100px}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav.sncf-nav[_ngcontent-%COMP%]   .menu-group[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{border-top:1px solid rgba(255,255,255,.3)}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav.sncf-nav[_ngcontent-%COMP%]   .menu-group[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:last-of-type{border-bottom:1px solid rgba(255,255,255,.3)}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav.sncf-nav[_ngcontent-%COMP%]   .menu-group[_ngcontent-%COMP%]:first-child > *[_ngcontent-%COMP%]:first-child{border-top:0}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav.sncf-nav[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{min-width:unset;width:100px}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{height:100%;min-width:250px;display:flex;flex-direction:column;overflow-y:auto}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .menu.prod[_ngcontent-%COMP%]{background:#0088ce;color:#fff}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .menu.local[_ngcontent-%COMP%]{background:#333;color:#fff}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .menu.dev[_ngcontent-%COMP%]{background:#6e1e78;color:#fff}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .menu.rec[_ngcontent-%COMP%]{background:#009aa6;color:#fff}.app-sidenav-container[_ngcontent-%COMP%]   .app-sidenav[_ngcontent-%COMP%]   .app-logo.no-path[_ngcontent-%COMP%]{border:1px solid #d7d7d7}main[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column}"],changeDetection:0});let t=e;return t})();function xi(){qe(Kt,ft).catch(t=>console.error(t))}var pe=["prod","rec","dev","local"];export{Kt as AppComponent,xi as launchApp};