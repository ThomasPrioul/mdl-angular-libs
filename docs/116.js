"use strict";(self.webpackChunkshowcase=self.webpackChunkshowcase||[]).push([[116],{116:(ht,y,d)=>{d.r(y),d.d(y,{HomeComponent:()=>mt});var E=d(6814),a=d(9212),u=d(3680),_=d(8645),f=d(2438),S=d(2096),C=d(3019),F=d(6232),H=d(5592),O=d(4825),N=d(5619),k=d(1887),g=d(2831),I=d(9388),j=d(2495),w=d(4300),p=d(6028),h=d(9773),G=d(8180),M=d(7921),Q=d(4664),z=d(836),W=d(2181),$=d(7131);d(6825);const v=["*"],V=["tabListContainer"],Y=["tabList"],Z=["tabListInner"],U=["nextPaginator"],X=["previousPaginator"],tt=["mat-tab-nav-bar",""],et=["mat-tab-link",""],x="mdc-tab-indicator--active",D="mdc-tab-indicator--no-transition";class at{constructor(r){this._items=r}hide(){this._items.forEach(r=>r.deactivateInkBar())}alignToElement(r){const t=this._items.find(i=>i.elementRef.nativeElement===r),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){const i=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(i),this._currentItem=t}}}function it(o){return class extends o{constructor(...r){super(...r),this._fitToContent=!1}get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(r){const t=(0,j.Ig)(r);this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(r){const t=this.elementRef.nativeElement;if(!r||!t.getBoundingClientRect||!this._inkBarContentElement)return void t.classList.add(x);const e=t.getBoundingClientRect(),i=r.width/e.width,n=r.left-e.left;t.classList.add(D),this._inkBarContentElement.style.setProperty("transform",`translateX(${n}px) scaleX(${i})`),t.getBoundingClientRect(),t.classList.remove(D),t.classList.add(x),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this.elementRef.nativeElement.classList.remove(x)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){const r=this.elementRef.nativeElement.ownerDocument||document;this._inkBarElement=r.createElement("span"),this._inkBarContentElement=r.createElement("span"),this._inkBarElement.className="mdc-tab-indicator",this._inkBarContentElement.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",this._inkBarElement.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){(this._fitToContent?this.elementRef.nativeElement.querySelector(".mdc-tab__content"):this.elementRef.nativeElement).appendChild(this._inkBarElement)}}}const R=(0,g.i$)({passive:!0});let st=(()=>{class o{get selectedIndex(){return this._selectedIndex}set selectedIndex(t){const e=isNaN(t)?0:t;this._selectedIndex!=e&&(this._selectedIndexChanged=!0,this._selectedIndex=e,this._keyManager&&this._keyManager.updateActiveItem(e))}constructor(t,e,i,n,s,c,b){this._elementRef=t,this._changeDetectorRef=e,this._viewportRuler=i,this._dir=n,this._ngZone=s,this._platform=c,this._animationMode=b,this._scrollDistance=0,this._selectedIndexChanged=!1,this._destroyed=new _.x,this._showPaginationControls=!1,this._disableScrollAfter=!0,this._disableScrollBefore=!0,this._stopScrolling=new _.x,this.disablePagination=!1,this._selectedIndex=0,this.selectFocusedIndex=new a.vpe,this.indexFocused=new a.vpe,s.runOutsideAngular(()=>{(0,f.R)(t.nativeElement,"mouseleave").pipe((0,h.R)(this._destroyed)).subscribe(()=>{this._stopInterval()})})}ngAfterViewInit(){(0,f.R)(this._previousPaginator.nativeElement,"touchstart",R).pipe((0,h.R)(this._destroyed)).subscribe(()=>{this._handlePaginatorPress("before")}),(0,f.R)(this._nextPaginator.nativeElement,"touchstart",R).pipe((0,h.R)(this._destroyed)).subscribe(()=>{this._handlePaginatorPress("after")})}ngAfterContentInit(){const t=this._dir?this._dir.change:(0,S.of)("ltr"),e=this._viewportRuler.change(150),i=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new w.Em(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(this._selectedIndex),this._ngZone.onStable.pipe((0,G.q)(1)).subscribe(i),(0,C.T)(t,e,this._items.changes,this._itemsResized()).pipe((0,h.R)(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),i()})}),this._keyManager.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(n=>{this.indexFocused.emit(n),this._setTabFocus(n)})}_itemsResized(){return"function"!=typeof ResizeObserver?F.E:this._items.changes.pipe((0,M.O)(this._items),(0,Q.w)(t=>new H.y(e=>this._ngZone.runOutsideAngular(()=>{const i=new ResizeObserver(n=>e.next(n));return t.forEach(n=>i.observe(n.elementRef.nativeElement)),()=>{i.disconnect()}}))),(0,z.T)(1),(0,W.h)(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!(0,p.Vb)(t))switch(t.keyCode){case p.K5:case p.L_:if(this.focusIndex!==this.selectedIndex){const e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager.onKeydown(t)}}_onContentChanges(){const t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return!this._items||!!this._items.toArray()[t]}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();const e=this._tabListContainer.nativeElement;e.scrollLeft="ltr"==this._getLayoutDirection()?0:e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;const t=this.scrollDistance,e="ltr"===this._getLayoutDirection()?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){return this._scrollTo(this._scrollDistance+("before"==t?-1:1)*this._tabListContainer.nativeElement.offsetWidth/3)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;const e=this._items?this._items.toArray()[t]:null;if(!e)return;const i=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:n,offsetWidth:s}=e.elementRef.nativeElement;let c,b;"ltr"==this._getLayoutDirection()?(c=n,b=c+s):(b=this._tabListInner.nativeElement.offsetWidth-n,c=b-s);const m=this.scrollDistance,A=this.scrollDistance+i;c<m?this.scrollDistance-=m-c:b>A&&(this.scrollDistance+=Math.min(b-A,c-m))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{const t=this._tabListInner.nativeElement.scrollWidth>this._elementRef.nativeElement.offsetWidth;t||(this.scrollDistance=0),t!==this._showPaginationControls&&this._changeDetectorRef.markForCheck(),this._showPaginationControls=t}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=0==this.scrollDistance,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){return this._tabListInner.nativeElement.scrollWidth-this._tabListContainer.nativeElement.offsetWidth||0}_alignInkBarToSelectedTab(){const t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&null!=e.button&&0!==e.button||(this._stopInterval(),(0,O.H)(650,100).pipe((0,h.R)((0,C.T)(this._stopScrolling,this._destroyed))).subscribe(()=>{const{maxScrollDistance:i,distance:n}=this._scrollHeader(t);(0===n||n>=i)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};const e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static#t=this.\u0275fac=function(e){return new(e||o)(a.Y36(a.SBq),a.Y36(a.sBO),a.Y36(k.rL),a.Y36(I.Is,8),a.Y36(a.R0b),a.Y36(g.t4),a.Y36(a.QbO,8))};static#e=this.\u0275dir=a.lG2({type:o,inputs:{disablePagination:[a.lbL.HasDecoratorInputTransform,"disablePagination","disablePagination",a.VuI],selectedIndex:[a.lbL.HasDecoratorInputTransform,"selectedIndex","selectedIndex",a.Cb_]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"},features:[a.Xq5]})}return o})();const dt=new a.OlP("MAT_TABS_CONFIG");let B=0,P=(()=>{class o extends st{get fitInkBarToContent(){return this._fitInkBarToContent.value}set fitInkBarToContent(t){this._fitInkBarToContent.next(t),this._changeDetectorRef.markForCheck()}get animationDuration(){return this._animationDuration}set animationDuration(t){const e=t+"";this._animationDuration=/^\d+$/.test(e)?t+"ms":e}get backgroundColor(){return this._backgroundColor}set backgroundColor(t){const e=this._elementRef.nativeElement.classList;e.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&e.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}constructor(t,e,i,n,s,c,b,m){super(t,n,s,e,i,c,b),this._fitInkBarToContent=new N.X(!1),this.stretchTabs=!0,this.disableRipple=!1,this.color="primary",this.disablePagination=!(!m||null==m.disablePagination)&&m.disablePagination,this.fitInkBarToContent=!(!m||null==m.fitInkBarToContent)&&m.fitInkBarToContent,this.stretchTabs=!m||null==m.stretchTabs||m.stretchTabs}_itemSelected(){}ngAfterContentInit(){this._inkBar=new at(this._items),this._items.changes.pipe((0,M.O)(null),(0,h.R)(this._destroyed)).subscribe(()=>{this.updateActiveLink()}),super.ngAfterContentInit()}ngAfterViewInit(){super.ngAfterViewInit()}updateActiveLink(){if(!this._items)return;const t=this._items.toArray();for(let e=0;e<t.length;e++)if(t[e].active)return this.selectedIndex=e,this._changeDetectorRef.markForCheck(),void(this.tabPanel&&(this.tabPanel._activeTabId=t[e].id));this.selectedIndex=-1,this._inkBar.hide()}_getRole(){return this.tabPanel?"tablist":this._elementRef.nativeElement.getAttribute("role")}static#t=this.\u0275fac=function(e){return new(e||o)(a.Y36(a.SBq),a.Y36(I.Is,8),a.Y36(a.R0b),a.Y36(a.sBO),a.Y36(k.rL),a.Y36(g.t4),a.Y36(a.QbO,8),a.Y36(dt,8))};static#e=this.\u0275cmp=a.Xpm({type:o,selectors:[["","mat-tab-nav-bar",""]],contentQueries:function(e,i,n){if(1&e&&a.Suo(n,L,5),2&e){let s;a.iGM(s=a.CRH())&&(i._items=s)}},viewQuery:function(e,i){if(1&e&&(a.Gf(V,7),a.Gf(Y,7),a.Gf(Z,7),a.Gf(U,5),a.Gf(X,5)),2&e){let n;a.iGM(n=a.CRH())&&(i._tabListContainer=n.first),a.iGM(n=a.CRH())&&(i._tabList=n.first),a.iGM(n=a.CRH())&&(i._tabListInner=n.first),a.iGM(n=a.CRH())&&(i._nextPaginator=n.first),a.iGM(n=a.CRH())&&(i._previousPaginator=n.first)}},hostAttrs:[1,"mat-mdc-tab-nav-bar","mat-mdc-tab-header"],hostVars:17,hostBindings:function(e,i){2&e&&(a.uIk("role",i._getRole()),a.Udp("--mat-tab-animation-duration",i.animationDuration),a.ekj("mat-mdc-tab-header-pagination-controls-enabled",i._showPaginationControls)("mat-mdc-tab-header-rtl","rtl"==i._getLayoutDirection())("mat-mdc-tab-nav-bar-stretch-tabs",i.stretchTabs)("mat-primary","warn"!==i.color&&"accent"!==i.color)("mat-accent","accent"===i.color)("mat-warn","warn"===i.color)("_mat-animation-noopable","NoopAnimations"===i._animationMode))},inputs:{fitInkBarToContent:[a.lbL.HasDecoratorInputTransform,"fitInkBarToContent","fitInkBarToContent",a.VuI],stretchTabs:[a.lbL.HasDecoratorInputTransform,"mat-stretch-tabs","stretchTabs",a.VuI],animationDuration:"animationDuration",backgroundColor:"backgroundColor",disableRipple:[a.lbL.HasDecoratorInputTransform,"disableRipple","disableRipple",a.VuI],color:"color",tabPanel:"tabPanel"},exportAs:["matTabNavBar","matTabNav"],standalone:!0,features:[a.Xq5,a.qOj,a.jDz],attrs:tt,ngContentSelectors:v,decls:13,vars:8,consts:[["aria-hidden","true","type","button","mat-ripple","","tabindex","-1",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"matRippleDisabled","disabled","click","mousedown","touchend"],["previousPaginator",""],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-link-container",3,"keydown"],["tabListContainer",""],[1,"mat-mdc-tab-list",3,"cdkObserveContent"],["tabList",""],[1,"mat-mdc-tab-links"],["tabListInner",""],["aria-hidden","true","type","button","mat-ripple","","tabindex","-1",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"matRippleDisabled","disabled","mousedown","click","touchend"],["nextPaginator",""]],template:function(e,i){1&e&&(a.F$t(),a.TgZ(0,"button",0,1),a.NdJ("click",function(){return i._handlePaginatorClick("before")})("mousedown",function(s){return i._handlePaginatorPress("before",s)})("touchend",function(){return i._stopInterval()}),a._UZ(2,"div",2),a.qZA(),a.TgZ(3,"div",3,4),a.NdJ("keydown",function(s){return i._handleKeydown(s)}),a.TgZ(5,"div",5,6),a.NdJ("cdkObserveContent",function(){return i._onContentChanges()}),a.TgZ(7,"div",7,8),a.Hsn(9),a.qZA()()(),a.TgZ(10,"button",9,10),a.NdJ("mousedown",function(s){return i._handlePaginatorPress("after",s)})("click",function(){return i._handlePaginatorClick("after")})("touchend",function(){return i._stopInterval()}),a._UZ(12,"div",2),a.qZA()),2&e&&(a.ekj("mat-mdc-tab-header-pagination-disabled",i._disableScrollBefore),a.Q6J("matRippleDisabled",i._disableScrollBefore||i.disableRipple)("disabled",i._disableScrollBefore||null),a.xp6(10),a.ekj("mat-mdc-tab-header-pagination-disabled",i._disableScrollAfter),a.Q6J("matRippleDisabled",i._disableScrollAfter||i.disableRipple)("disabled",i._disableScrollAfter||null))},dependencies:[u.wG,$.wD],styles:[".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}"],encapsulation:2})}return o})();const ct=it(class{});let L=(()=>{class o extends ct{get active(){return this._isActive}set active(t){t!==this._isActive&&(this._isActive=t,this._tabNavBar.updateActiveLink())}get rippleDisabled(){return this.disabled||this.disableRipple||this._tabNavBar.disableRipple||!!this.rippleConfig.disabled}constructor(t,e,i,n,s,c){super(),this._tabNavBar=t,this.elementRef=e,this._focusMonitor=s,this._destroyed=new _.x,this._isActive=!1,this.disabled=!1,this.disableRipple=!1,this.tabIndex=0,this.id="mat-tab-link-"+B++,this.rippleConfig=i||{},this.tabIndex=parseInt(n)||0,"NoopAnimations"===c&&(this.rippleConfig.animation={enterDuration:0,exitDuration:0}),t._fitInkBarToContent.pipe((0,h.R)(this._destroyed)).subscribe(b=>{this.fitInkBarToContent=b})}focus(){this.elementRef.nativeElement.focus()}ngAfterViewInit(){this._focusMonitor.monitor(this.elementRef)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),super.ngOnDestroy(),this._focusMonitor.stopMonitoring(this.elementRef)}_handleFocus(){this._tabNavBar.focusIndex=this._tabNavBar._items.toArray().indexOf(this)}_handleKeydown(t){(t.keyCode===p.L_||t.keyCode===p.K5)&&(this.disabled?t.preventDefault():this._tabNavBar.tabPanel&&this.elementRef.nativeElement.click())}_getAriaControls(){return this._tabNavBar.tabPanel?this._tabNavBar.tabPanel?.id:this.elementRef.nativeElement.getAttribute("aria-controls")}_getAriaSelected(){return this._tabNavBar.tabPanel?this.active?"true":"false":this.elementRef.nativeElement.getAttribute("aria-selected")}_getAriaCurrent(){return this.active&&!this._tabNavBar.tabPanel?"page":null}_getRole(){return this._tabNavBar.tabPanel?"tab":this.elementRef.nativeElement.getAttribute("role")}_getTabIndex(){return this._tabNavBar.tabPanel?this._isActive&&!this.disabled?0:-1:this.disabled?-1:this.tabIndex}static#t=this.\u0275fac=function(e){return new(e||o)(a.Y36(P),a.Y36(a.SBq),a.Y36(u.Y2,8),a.$8M("tabindex"),a.Y36(w.tE),a.Y36(a.QbO,8))};static#e=this.\u0275cmp=a.Xpm({type:o,selectors:[["","mat-tab-link",""],["","matTabLink",""]],hostAttrs:[1,"mdc-tab","mat-mdc-tab-link","mat-mdc-focus-indicator"],hostVars:11,hostBindings:function(e,i){1&e&&a.NdJ("focus",function(){return i._handleFocus()})("keydown",function(s){return i._handleKeydown(s)}),2&e&&(a.uIk("aria-controls",i._getAriaControls())("aria-current",i._getAriaCurrent())("aria-disabled",i.disabled)("aria-selected",i._getAriaSelected())("id",i.id)("tabIndex",i._getTabIndex())("role",i._getRole()),a.ekj("mat-mdc-tab-disabled",i.disabled)("mdc-tab--active",i.active))},inputs:{active:[a.lbL.HasDecoratorInputTransform,"active","active",a.VuI],disabled:[a.lbL.HasDecoratorInputTransform,"disabled","disabled",a.VuI],disableRipple:[a.lbL.HasDecoratorInputTransform,"disableRipple","disableRipple",a.VuI],tabIndex:[a.lbL.HasDecoratorInputTransform,"tabIndex","tabIndex",t=>null==t?0:(0,a.Cb_)(t)],id:"id"},exportAs:["matTabLink"],standalone:!0,features:[a.Xq5,a.qOj,a.jDz],attrs:et,ngContentSelectors:v,decls:5,vars:2,consts:[[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"]],template:function(e,i){1&e&&(a.F$t(),a._UZ(0,"span",0)(1,"div",1),a.TgZ(2,"span",2)(3,"span",3),a.Hsn(4),a.qZA()()),2&e&&(a.xp6(),a.Q6J("matRippleTrigger",i.elementRef.nativeElement)("matRippleDisabled",i.rippleDisabled))},dependencies:[u.wG],styles:['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}'],encapsulation:2,changeDetection:0})}return o})(),lt=(()=>{class o{constructor(){this.id="mat-tab-nav-panel-"+B++}static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275cmp=a.Xpm({type:o,selectors:[["mat-tab-nav-panel"]],hostAttrs:["role","tabpanel",1,"mat-mdc-tab-nav-panel"],hostVars:2,hostBindings:function(e,i){2&e&&a.uIk("aria-labelledby",i._activeTabId)("id",i.id)},inputs:{id:"id"},exportAs:["matTabNavPanel"],standalone:!0,features:[a.jDz],ngContentSelectors:v,decls:1,vars:0,template:function(e,i){1&e&&(a.F$t(),a.Hsn(0))},encapsulation:2,changeDetection:0})}return o})(),bt=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275mod=a.oAB({type:o});static#a=this.\u0275inj=a.cJS({imports:[u.BQ,u.BQ]})}return o})();var T=d(1896);let mt=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#e=this.\u0275cmp=a.Xpm({type:o,selectors:[["ng-component"]],standalone:!0,features:[a.jDz],decls:10,vars:3,consts:[["mat-tab-nav-bar","","fitInkBarToContent","","mat-stretch-tabs","false","mat-align-tabs","start",3,"tabPanel"],["mat-tab-link","","routerLink","table2","replaceUrl","","routerLinkActive","",3,"active"],["rla1","routerLinkActive"],["mat-tab-link","","routerLink","forms","replaceUrl","","routerLinkActive","",3,"active"],["rla2","routerLinkActive"],["tabPanel",""]],template:function(e,i){if(1&e&&(a.TgZ(0,"nav",0)(1,"a",1,2),a._uU(3," Tableau (table2) "),a.qZA(),a.TgZ(4,"a",3,4),a._uU(6," Formulaires "),a.qZA()(),a.TgZ(7,"mat-tab-nav-panel",null,5),a._UZ(9,"router-outlet"),a.qZA()),2&e){const n=a.MAs(2),s=a.MAs(5),c=a.MAs(8);a.Q6J("tabPanel",c),a.xp6(),a.Q6J("active",n.isActive),a.xp6(3),a.Q6J("active",s.isActive)}},dependencies:[E.ez,T.Od,T.rH,T.lC,bt,P,lt,L],styles:["[_nghost-%COMP%]{position:relative;display:flex;flex-direction:column;height:100%}@media (min-width: 599.98px){.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]{margin:8px 16px 0}}.mat-mdc-tab-nav-panel[_ngcontent-%COMP%]{flex-grow:1;min-height:0;overflow-y:auto}.mat-mdc-tab-nav-panel[_ngcontent-%COMP%]     router-outlet+*{height:100%;padding:.5rem}@media (min-width: 599.98px){.mat-mdc-tab-nav-panel[_ngcontent-%COMP%]     router-outlet+*{padding:1.5rem 2.5rem 2.5rem}}.mat-mdc-tab-group[_ngcontent-%COMP%]{height:100%}  .mat-mdc-tab-body-wrapper{flex-grow:1}  .mat-mdc-tab-body-content{gap:1.5rem;padding:.5rem;display:flex;flex-direction:column;overflow:unset}@media (min-width: 599.98px){  .mat-mdc-tab-body-content{padding:1.5rem}}"],changeDetection:0})}return o})()}}]);