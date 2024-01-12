"use strict";(self.webpackChunkshowcase=self.webpackChunkshowcase||[]).push([[116],{116:(pt,k,c)=>{c.r(k),c.d(k,{HomeComponent:()=>ht});var I=c(6814),i=c(9212),h=c(3680),F=c(8484),M=c(7131),f=c(4300),w=c(9388),g=c(8645),v=c(2438),O=c(2096),R=c(3019),N=c(6232),j=c(5592),G=c(4825),Q=c(5619),p=c(9773),z=c(8180),B=c(7921),W=c(4664),$=c(836),V=c(2181),_=(c(6825),c(2495)),P=c(2835),x=c(2831),u=c(6028);const T=["*"],Y=["tabListContainer"],Z=["tabList"],U=["tabListInner"],K=["nextPaginator"],J=["previousPaginator"],et=["mat-tab-nav-bar",""],at=["mat-tab-link",""],y="mdc-tab-indicator--active",D="mdc-tab-indicator--no-transition";class it{constructor(r){this._items=r}hide(){this._items.forEach(r=>r.deactivateInkBar())}alignToElement(r){const t=this._items.find(a=>a.elementRef.nativeElement===r),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){const a=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(a),this._currentItem=t}}}function nt(o){return class extends o{constructor(...r){super(...r),this._fitToContent=!1}get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(r){const t=(0,_.Ig)(r);this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(r){const t=this.elementRef.nativeElement;if(!r||!t.getBoundingClientRect||!this._inkBarContentElement)return void t.classList.add(y);const e=t.getBoundingClientRect(),a=r.width/e.width,n=r.left-e.left;t.classList.add(D),this._inkBarContentElement.style.setProperty("transform",`translateX(${n}px) scaleX(${a})`),t.getBoundingClientRect(),t.classList.remove(D),t.classList.add(y),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this.elementRef.nativeElement.classList.remove(y)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){const r=this.elementRef.nativeElement.ownerDocument||document;this._inkBarElement=r.createElement("span"),this._inkBarContentElement=r.createElement("span"),this._inkBarElement.className="mdc-tab-indicator",this._inkBarContentElement.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",this._inkBarElement.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){(this._fitToContent?this.elementRef.nativeElement.querySelector(".mdc-tab__content"):this.elementRef.nativeElement).appendChild(this._inkBarElement)}}}const L=(0,x.i$)({passive:!0});let ct=(()=>{class o{get disablePagination(){return this._disablePagination}set disablePagination(t){this._disablePagination=(0,_.Ig)(t)}get selectedIndex(){return this._selectedIndex}set selectedIndex(t){t=(0,_.su)(t),this._selectedIndex!=t&&(this._selectedIndexChanged=!0,this._selectedIndex=t,this._keyManager&&this._keyManager.updateActiveItem(t))}constructor(t,e,a,n,s,d,b){this._elementRef=t,this._changeDetectorRef=e,this._viewportRuler=a,this._dir=n,this._ngZone=s,this._platform=d,this._animationMode=b,this._scrollDistance=0,this._selectedIndexChanged=!1,this._destroyed=new g.x,this._showPaginationControls=!1,this._disableScrollAfter=!0,this._disableScrollBefore=!0,this._stopScrolling=new g.x,this._disablePagination=!1,this._selectedIndex=0,this.selectFocusedIndex=new i.vpe,this.indexFocused=new i.vpe,s.runOutsideAngular(()=>{(0,v.R)(t.nativeElement,"mouseleave").pipe((0,p.R)(this._destroyed)).subscribe(()=>{this._stopInterval()})})}ngAfterViewInit(){(0,v.R)(this._previousPaginator.nativeElement,"touchstart",L).pipe((0,p.R)(this._destroyed)).subscribe(()=>{this._handlePaginatorPress("before")}),(0,v.R)(this._nextPaginator.nativeElement,"touchstart",L).pipe((0,p.R)(this._destroyed)).subscribe(()=>{this._handlePaginatorPress("after")})}ngAfterContentInit(){const t=this._dir?this._dir.change:(0,O.of)("ltr"),e=this._viewportRuler.change(150),a=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new f.Em(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(this._selectedIndex),this._ngZone.onStable.pipe((0,z.q)(1)).subscribe(a),(0,R.T)(t,e,this._items.changes,this._itemsResized()).pipe((0,p.R)(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),a()})}),this._keyManager.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(n=>{this.indexFocused.emit(n),this._setTabFocus(n)})}_itemsResized(){return"function"!=typeof ResizeObserver?N.E:this._items.changes.pipe((0,B.O)(this._items),(0,W.w)(t=>new j.y(e=>this._ngZone.runOutsideAngular(()=>{const a=new ResizeObserver(n=>e.next(n));return t.forEach(n=>a.observe(n.elementRef.nativeElement)),()=>{a.disconnect()}}))),(0,$.T)(1),(0,V.h)(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!(0,u.Vb)(t))switch(t.keyCode){case u.K5:case u.L_:if(this.focusIndex!==this.selectedIndex){const e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager.onKeydown(t)}}_onContentChanges(){const t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return!this._items||!!this._items.toArray()[t]}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();const e=this._tabListContainer.nativeElement;e.scrollLeft="ltr"==this._getLayoutDirection()?0:e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;const t=this.scrollDistance,e="ltr"===this._getLayoutDirection()?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){return this._scrollTo(this._scrollDistance+("before"==t?-1:1)*this._tabListContainer.nativeElement.offsetWidth/3)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;const e=this._items?this._items.toArray()[t]:null;if(!e)return;const a=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:n,offsetWidth:s}=e.elementRef.nativeElement;let d,b;"ltr"==this._getLayoutDirection()?(d=n,b=d+s):(b=this._tabListInner.nativeElement.offsetWidth-n,d=b-s);const m=this.scrollDistance,H=this.scrollDistance+a;d<m?this.scrollDistance-=m-d:b>H&&(this.scrollDistance+=Math.min(b-H,d-m))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{const t=this._tabListInner.nativeElement.scrollWidth>this._elementRef.nativeElement.offsetWidth;t||(this.scrollDistance=0),t!==this._showPaginationControls&&this._changeDetectorRef.markForCheck(),this._showPaginationControls=t}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=0==this.scrollDistance,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){return this._tabListInner.nativeElement.scrollWidth-this._tabListContainer.nativeElement.offsetWidth||0}_alignInkBarToSelectedTab(){const t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&null!=e.button&&0!==e.button||(this._stopInterval(),(0,G.H)(650,100).pipe((0,p.R)((0,R.T)(this._stopScrolling,this._destroyed))).subscribe(()=>{const{maxScrollDistance:a,distance:n}=this._scrollHeader(t);(0===n||n>=a)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};const e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static#t=this.\u0275fac=function(e){return new(e||o)(i.Y36(i.SBq),i.Y36(i.sBO),i.Y36(P.rL),i.Y36(w.Is,8),i.Y36(i.R0b),i.Y36(x.t4),i.Y36(i.QbO,8))};static#e=this.\u0275dir=i.lG2({type:o,inputs:{disablePagination:"disablePagination"}})}return o})();const dt=new i.OlP("MAT_TABS_CONFIG");let A=0,E=(()=>{class o extends ct{get fitInkBarToContent(){return this._fitInkBarToContent.value}set fitInkBarToContent(t){this._fitInkBarToContent.next((0,_.Ig)(t)),this._changeDetectorRef.markForCheck()}get stretchTabs(){return this._stretchTabs}set stretchTabs(t){this._stretchTabs=(0,_.Ig)(t)}get animationDuration(){return this._animationDuration}set animationDuration(t){this._animationDuration=/^\d+$/.test(t+"")?t+"ms":t}get backgroundColor(){return this._backgroundColor}set backgroundColor(t){const e=this._elementRef.nativeElement.classList;e.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&e.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=(0,_.Ig)(t)}constructor(t,e,a,n,s,d,b,m){super(t,n,s,e,a,d,b),this._fitInkBarToContent=new Q.X(!1),this._stretchTabs=!0,this._disableRipple=!1,this.color="primary",this.disablePagination=!(!m||null==m.disablePagination)&&m.disablePagination,this.fitInkBarToContent=!(!m||null==m.fitInkBarToContent)&&m.fitInkBarToContent,this.stretchTabs=!m||null==m.stretchTabs||m.stretchTabs}_itemSelected(){}ngAfterContentInit(){this._inkBar=new it(this._items),this._items.changes.pipe((0,B.O)(null),(0,p.R)(this._destroyed)).subscribe(()=>{this.updateActiveLink()}),super.ngAfterContentInit()}ngAfterViewInit(){super.ngAfterViewInit()}updateActiveLink(){if(!this._items)return;const t=this._items.toArray();for(let e=0;e<t.length;e++)if(t[e].active)return this.selectedIndex=e,this._changeDetectorRef.markForCheck(),void(this.tabPanel&&(this.tabPanel._activeTabId=t[e].id));this.selectedIndex=-1,this._inkBar.hide()}_getRole(){return this.tabPanel?"tablist":this._elementRef.nativeElement.getAttribute("role")}static#t=this.\u0275fac=function(e){return new(e||o)(i.Y36(i.SBq),i.Y36(w.Is,8),i.Y36(i.R0b),i.Y36(i.sBO),i.Y36(P.rL),i.Y36(x.t4),i.Y36(i.QbO,8),i.Y36(dt,8))};static#e=this.\u0275cmp=i.Xpm({type:o,selectors:[["","mat-tab-nav-bar",""]],contentQueries:function(e,a,n){if(1&e&&i.Suo(n,S,5),2&e){let s;i.iGM(s=i.CRH())&&(a._items=s)}},viewQuery:function(e,a){if(1&e&&(i.Gf(Y,7),i.Gf(Z,7),i.Gf(U,7),i.Gf(K,5),i.Gf(J,5)),2&e){let n;i.iGM(n=i.CRH())&&(a._tabListContainer=n.first),i.iGM(n=i.CRH())&&(a._tabList=n.first),i.iGM(n=i.CRH())&&(a._tabListInner=n.first),i.iGM(n=i.CRH())&&(a._nextPaginator=n.first),i.iGM(n=i.CRH())&&(a._previousPaginator=n.first)}},hostAttrs:[1,"mat-mdc-tab-nav-bar","mat-mdc-tab-header"],hostVars:17,hostBindings:function(e,a){2&e&&(i.uIk("role",a._getRole()),i.Udp("--mat-tab-animation-duration",a.animationDuration),i.ekj("mat-mdc-tab-header-pagination-controls-enabled",a._showPaginationControls)("mat-mdc-tab-header-rtl","rtl"==a._getLayoutDirection())("mat-mdc-tab-nav-bar-stretch-tabs",a.stretchTabs)("mat-primary","warn"!==a.color&&"accent"!==a.color)("mat-accent","accent"===a.color)("mat-warn","warn"===a.color)("_mat-animation-noopable","NoopAnimations"===a._animationMode))},inputs:{color:"color",fitInkBarToContent:"fitInkBarToContent",stretchTabs:["mat-stretch-tabs","stretchTabs"],animationDuration:"animationDuration",backgroundColor:"backgroundColor",disableRipple:"disableRipple",tabPanel:"tabPanel"},exportAs:["matTabNavBar","matTabNav"],features:[i.qOj],attrs:et,ngContentSelectors:T,decls:13,vars:8,consts:[["aria-hidden","true","type","button","mat-ripple","","tabindex","-1",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"matRippleDisabled","disabled","click","mousedown","touchend"],["previousPaginator",""],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-link-container",3,"keydown"],["tabListContainer",""],[1,"mat-mdc-tab-list",3,"cdkObserveContent"],["tabList",""],[1,"mat-mdc-tab-links"],["tabListInner",""],["aria-hidden","true","type","button","mat-ripple","","tabindex","-1",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"matRippleDisabled","disabled","mousedown","click","touchend"],["nextPaginator",""]],template:function(e,a){1&e&&(i.F$t(),i.TgZ(0,"button",0,1),i.NdJ("click",function(){return a._handlePaginatorClick("before")})("mousedown",function(s){return a._handlePaginatorPress("before",s)})("touchend",function(){return a._stopInterval()}),i._UZ(2,"div",2),i.qZA(),i.TgZ(3,"div",3,4),i.NdJ("keydown",function(s){return a._handleKeydown(s)}),i.TgZ(5,"div",5,6),i.NdJ("cdkObserveContent",function(){return a._onContentChanges()}),i.TgZ(7,"div",7,8),i.Hsn(9),i.qZA()()(),i.TgZ(10,"button",9,10),i.NdJ("mousedown",function(s){return a._handlePaginatorPress("after",s)})("click",function(){return a._handlePaginatorClick("after")})("touchend",function(){return a._stopInterval()}),i._UZ(12,"div",2),i.qZA()),2&e&&(i.ekj("mat-mdc-tab-header-pagination-disabled",a._disableScrollBefore),i.Q6J("matRippleDisabled",a._disableScrollBefore||a.disableRipple)("disabled",a._disableScrollBefore||null),i.xp6(10),i.ekj("mat-mdc-tab-header-pagination-disabled",a._disableScrollAfter),i.Q6J("matRippleDisabled",a._disableScrollAfter||a.disableRipple)("disabled",a._disableScrollAfter||null))},dependencies:[h.wG,M.wD],styles:[".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"],encapsulation:2})}return o})();const lt=nt((0,h.sb)((0,h.Kr)((0,h.Id)(class{}))));let S=(()=>{class o extends lt{get active(){return this._isActive}set active(t){const e=(0,_.Ig)(t);e!==this._isActive&&(this._isActive=e,this._tabNavBar.updateActiveLink())}get rippleDisabled(){return this.disabled||this.disableRipple||this._tabNavBar.disableRipple||!!this.rippleConfig.disabled}constructor(t,e,a,n,s,d){super(),this._tabNavBar=t,this.elementRef=e,this._focusMonitor=s,this._destroyed=new g.x,this._isActive=!1,this.id="mat-tab-link-"+A++,this.rippleConfig=a||{},this.tabIndex=parseInt(n)||0,"NoopAnimations"===d&&(this.rippleConfig.animation={enterDuration:0,exitDuration:0}),t._fitInkBarToContent.pipe((0,p.R)(this._destroyed)).subscribe(b=>{this.fitInkBarToContent=b})}focus(){this.elementRef.nativeElement.focus()}ngAfterViewInit(){this._focusMonitor.monitor(this.elementRef)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),super.ngOnDestroy(),this._focusMonitor.stopMonitoring(this.elementRef)}_handleFocus(){this._tabNavBar.focusIndex=this._tabNavBar._items.toArray().indexOf(this)}_handleKeydown(t){(t.keyCode===u.L_||t.keyCode===u.K5)&&(this.disabled?t.preventDefault():this._tabNavBar.tabPanel&&this.elementRef.nativeElement.click())}_getAriaControls(){return this._tabNavBar.tabPanel?this._tabNavBar.tabPanel?.id:this.elementRef.nativeElement.getAttribute("aria-controls")}_getAriaSelected(){return this._tabNavBar.tabPanel?this.active?"true":"false":this.elementRef.nativeElement.getAttribute("aria-selected")}_getAriaCurrent(){return this.active&&!this._tabNavBar.tabPanel?"page":null}_getRole(){return this._tabNavBar.tabPanel?"tab":this.elementRef.nativeElement.getAttribute("role")}_getTabIndex(){return this._tabNavBar.tabPanel?this._isActive&&!this.disabled?0:-1:this.tabIndex}static#t=this.\u0275fac=function(e){return new(e||o)(i.Y36(E),i.Y36(i.SBq),i.Y36(h.Y2,8),i.$8M("tabindex"),i.Y36(f.tE),i.Y36(i.QbO,8))};static#e=this.\u0275cmp=i.Xpm({type:o,selectors:[["","mat-tab-link",""],["","matTabLink",""]],hostAttrs:[1,"mdc-tab","mat-mdc-tab-link","mat-mdc-focus-indicator"],hostVars:11,hostBindings:function(e,a){1&e&&i.NdJ("focus",function(){return a._handleFocus()})("keydown",function(s){return a._handleKeydown(s)}),2&e&&(i.uIk("aria-controls",a._getAriaControls())("aria-current",a._getAriaCurrent())("aria-disabled",a.disabled)("aria-selected",a._getAriaSelected())("id",a.id)("tabIndex",a._getTabIndex())("role",a._getRole()),i.ekj("mat-mdc-tab-disabled",a.disabled)("mdc-tab--active",a.active))},inputs:{disabled:"disabled",disableRipple:"disableRipple",tabIndex:"tabIndex",active:"active",id:"id"},exportAs:["matTabLink"],features:[i.qOj],attrs:at,ngContentSelectors:T,decls:5,vars:2,consts:[[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"]],template:function(e,a){1&e&&(i.F$t(),i._UZ(0,"span",0)(1,"div",1),i.TgZ(2,"span",2)(3,"span",3),i.Hsn(4),i.qZA()()),2&e&&(i.xp6(),i.Q6J("matRippleTrigger",a.elementRef.nativeElement)("matRippleDisabled",a.rippleDisabled))},dependencies:[h.wG],styles:['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}'],encapsulation:2,changeDetection:0})}return o})(),bt=(()=>{class o{constructor(){this.id="mat-tab-nav-panel-"+A++}static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275cmp=i.Xpm({type:o,selectors:[["mat-tab-nav-panel"]],hostAttrs:["role","tabpanel",1,"mat-mdc-tab-nav-panel"],hostVars:2,hostBindings:function(e,a){2&e&&i.uIk("aria-labelledby",a._activeTabId)("id",a.id)},inputs:{id:"id"},exportAs:["matTabNavPanel"],ngContentSelectors:T,decls:1,vars:0,template:function(e,a){1&e&&(i.F$t(),i.Hsn(0))},encapsulation:2,changeDetection:0})}return o})(),mt=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275mod=i.oAB({type:o});static#a=this.\u0275inj=i.cJS({imports:[I.ez,h.BQ,F.eL,h.si,M.Q8,f.rt,h.BQ]})}return o})();var C=c(1896);let ht=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275cmp=i.Xpm({type:o,selectors:[["ng-component"]],standalone:!0,features:[i.jDz],decls:10,vars:3,consts:[["mat-tab-nav-bar","","fitInkBarToContent","","mat-stretch-tabs","false","mat-align-tabs","start",3,"tabPanel"],["mat-tab-link","","routerLink","table2","replaceUrl","","routerLinkActive","",3,"active"],["rla1","routerLinkActive"],["mat-tab-link","","routerLink","forms","replaceUrl","","routerLinkActive","",3,"active"],["rla2","routerLinkActive"],["tabPanel",""]],template:function(e,a){if(1&e&&(i.TgZ(0,"nav",0)(1,"a",1,2),i._uU(3," Table2 "),i.qZA(),i.TgZ(4,"a",3,4),i._uU(6," Forms "),i.qZA()(),i.TgZ(7,"mat-tab-nav-panel",null,5),i._UZ(9,"router-outlet"),i.qZA()),2&e){const n=i.MAs(2),s=i.MAs(5),d=i.MAs(8);i.Q6J("tabPanel",d),i.xp6(),i.Q6J("active",n.isActive),i.xp6(3),i.Q6J("active",s.isActive)}},dependencies:[I.ez,C.Od,C.rH,C.lC,mt,E,bt,S],styles:["[_nghost-%COMP%]{position:relative;display:flex;flex-direction:column;height:100%}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]{margin:8px 16px 0}.mat-mdc-tab-nav-panel[_ngcontent-%COMP%]{flex-grow:1;min-height:0;overflow-y:auto;padding-bottom:1.5rem}.mat-mdc-tab-nav-panel[_ngcontent-%COMP%]     router-outlet+*{height:100%;padding:1.5rem 2.5rem 2.5rem}.mat-mdc-tab-group[_ngcontent-%COMP%]{height:100%}  .mat-mdc-tab-body-wrapper{flex-grow:1}  .mat-mdc-tab-body-content{gap:1.5rem;padding:1.5rem;display:flex;flex-direction:column;overflow:unset}"],changeDetection:0})}return o})()}}]);