"use strict";
var Observable_1 = require('rxjs/Observable');
var axis_resolver_1 = require('./axis-resolver');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/throttle');
var Scroller = (function () {
    function Scroller(windowElement, $interval, $elementRef, infiniteScrollDownCallback, infiniteScrollUpCallback, infiniteScrollDownDistance, infiniteScrollUpDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate, horizontal, alwaysCallback) {
        if (horizontal === void 0) { horizontal = false; }
        if (alwaysCallback === void 0) { alwaysCallback = false; }
        this.windowElement = windowElement;
        this.$interval = $interval;
        this.$elementRef = $elementRef;
        this.infiniteScrollDownCallback = infiniteScrollDownCallback;
        this.infiniteScrollUpCallback = infiniteScrollUpCallback;
        this.infiniteScrollThrottle = infiniteScrollThrottle;
        this.isImmediate = isImmediate;
        this.horizontal = horizontal;
        this.alwaysCallback = alwaysCallback;
        this.lastScrollPosition = 0;
        this.isContainerWindow = Object.prototype.toString.call(this.windowElement).includes('Window');
        this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
        this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);
        // if (attrs.infiniteScrollParent != null) {
        // 	attachEvent(angular.element(elem.parent()));
        // }
        this.handleInfiniteScrollDisabled(false);
        this.defineContainer();
        this.createInterval();
        this.axis = new axis_resolver_1.AxisResolver(!this.horizontal);
    }
    Scroller.prototype.defineContainer = function () {
        if (this.isContainerWindow) {
            this.container = this.windowElement;
        }
        else {
            this.container = this.windowElement.nativeElement;
        }
        this.attachEvent(this.container);
    };
    Scroller.prototype.createInterval = function () {
        var _this = this;
        if (this.isImmediate) {
            this.checkInterval = this.$interval(function () {
                return _this.handler();
            }, 0);
        }
    };
    Scroller.prototype.height = function (elem) {
        var offsetHeight = this.axis.offsetHeightKey();
        var clientHeight = this.axis.clientHeightKey();
        // elem = elem.nativeElement;
        if (isNaN(elem[offsetHeight])) {
            return this.documentElement[clientHeight];
        }
        else {
            return elem[offsetHeight];
        }
    };
    Scroller.prototype.offsetTop = function (elem) {
        var top = this.axis.topKey();
        // elem = elem.nativeElement;
        if (!elem.getBoundingClientRect) {
            return;
        }
        return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
    };
    Scroller.prototype.pageYOffset = function (elem) {
        var pageYOffset = this.axis.pageYOffsetKey();
        var scrollTop = this.axis.scrollTopKey();
        var offsetTop = this.axis.offsetTopKey();
        // elem = elem.nativeElement;
        if (isNaN(window[pageYOffset])) {
            return this.documentElement[scrollTop];
        }
        else if (elem.ownerDocument) {
            return elem.ownerDocument.defaultView[pageYOffset];
        }
        else {
            return elem[offsetTop];
        }
    };
    Scroller.prototype.handler = function () {
        var container = this.calculatePoints();
        var scrollingDown = this.lastScrollPosition < container.scrolledUntilNow;
        this.lastScrollPosition = container.scrolledUntilNow;
        var remaining;
        var containerBreakpoint;
        if (scrollingDown) {
            remaining = container.totalToScroll - container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollDownDistance + 1;
        }
        else {
            remaining = container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollUpDistance + 1;
        }
        var shouldScroll = remaining <= containerBreakpoint;
        var triggerCallback = (this.alwaysCallback || shouldScroll) && this.scrollEnabled;
        var shouldClearInterval = shouldScroll && this.checkInterval;
        // if (this.useDocumentBottom) {
        // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
        // }
        this.checkWhenEnabled = shouldScroll;
        if (triggerCallback) {
            if (scrollingDown) {
                this.infiniteScrollDownCallback({ currentScrollPosition: container.scrolledUntilNow });
            }
            else {
                this.infiniteScrollUpCallback({ currentScrollPosition: container.scrolledUntilNow });
            }
        }
        if (shouldClearInterval) {
            clearInterval(this.checkInterval);
        }
    };
    Scroller.prototype.calculatePoints = function () {
        return this.isContainerWindow
            ? this.calculatePointsForWindow()
            : this.calculatePointsForElement();
    };
    Scroller.prototype.calculatePointsForWindow = function () {
        // container's height
        var height = this.height(this.container);
        // scrolled until now / current y point
        var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
        // total height / most bottom y point
        var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    Scroller.prototype.calculatePointsForElement = function () {
        var scrollTop = this.axis.scrollTopKey();
        var scrollHeight = this.axis.scrollHeightKey();
        var height = this.height(this.container);
        // perhaps use this.container.offsetTop instead of 'scrollTop'
        var scrolledUntilNow = this.container[scrollTop];
        var containerTopOffset = 0;
        var offsetTop = this.offsetTop(this.container);
        if (offsetTop !== void 0) {
            containerTopOffset = offsetTop;
        }
        var totalToScroll = this.container[scrollHeight];
        // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    Scroller.prototype.handleInfiniteScrollDistance = function (scrollDownDistance, scrollUpDistance) {
        this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
        this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
    };
    Scroller.prototype.attachEvent = function (newContainer) {
        var _this = this;
        this.clean();
        if (newContainer) {
            var throttle_1 = this.infiniteScrollThrottle;
            this.disposeScroll = Observable_1.Observable.fromEvent(this.container, 'scroll')
                .throttle(function (ev) { return Observable_1.Observable.timer(throttle_1); })
                .subscribe(function (ev) { return _this.handler(); });
        }
    };
    Scroller.prototype.clean = function () {
        if (this.disposeScroll) {
            this.disposeScroll.unsubscribe();
        }
    };
    Scroller.prototype.handleInfiniteScrollDisabled = function (enableScroll) {
        this.scrollEnabled = !enableScroll;
        // if (this.scrollEnabled && checkWhenEnabled) {
        // 	checkWhenEnabled = false;
        // 	return handler();
        // }
    };
    return Scroller;
}());
exports.Scroller = Scroller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFFN0MsOEJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsUUFBTywrQkFBK0IsQ0FBQyxDQUFBO0FBQ3ZDLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFFcEM7SUFlQyxrQkFDUyxhQUF3QyxFQUN4QyxTQUFtQixFQUNuQixXQUF1QixFQUN2QiwwQkFBb0MsRUFDcEMsd0JBQWtDLEVBQzFDLDBCQUFrQyxFQUNsQyx3QkFBZ0MsRUFDaEMsb0JBQStDLEVBQ3ZDLHNCQUE4QixFQUM5QixXQUFvQixFQUNwQixVQUEyQixFQUMzQixjQUErQjtRQUR2QywwQkFBbUMsR0FBbkMsa0JBQW1DO1FBQ25DLDhCQUF1QyxHQUF2QyxzQkFBdUM7UUFYL0Isa0JBQWEsR0FBYixhQUFhLENBQTJCO1FBQ3hDLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUFVO1FBQ3BDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBVTtRQUlsQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVE7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBZmpDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQWlCckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFB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Q0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQWEsWUFBdUM7UUFBcEQsaUJBUUM7UUFQQSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQU0sVUFBUSxHQUFXLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO2lCQUNqRSxRQUFRLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSx1QkFBVSxDQUFDLEtBQUssQ0FBQyxVQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQztpQkFDMUMsU0FBUyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNGLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUIsVUFBOEIsWUFBcUI7UUFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUNuQyxnREFBZ0Q7UUFDaEQsNkJBQTZCO1FBQzdCLHFCQUFxQjtRQUNyQixJQUFJO0lBQ0wsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBL0xELElBK0xDO0FBL0xZLGdCQUFRLFdBK0xwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBBeGlzUmVzb2x2ZXIgfSBmcm9tICcuL2F4aXMtcmVzb2x2ZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGltZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90aHJvdHRsZSc7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxlciB7XG5cdHB1YmxpYyBzY3JvbGxEb3duRGlzdGFuY2U6IG51bWJlcjtcblx0cHVibGljIHNjcm9sbFVwRGlzdGFuY2U6IG51bWJlcjtcblx0cHVibGljIHNjcm9sbEVuYWJsZWQ6IGJvb2xlYW47XG5cdHB1YmxpYyBjaGVja1doZW5FbmFibGVkOiBib29sZWFuO1xuXHRwdWJsaWMgY29udGFpbmVyOiBXaW5kb3cgfCBFbGVtZW50UmVmIHwgYW55O1xuXHRwdWJsaWMgaW1tZWRpYXRlQ2hlY2s6IGJvb2xlYW47XG5cdHB1YmxpYyB1c2VEb2N1bWVudEJvdHRvbTogYm9vbGVhbjtcblx0cHVibGljIGNoZWNrSW50ZXJ2YWw6IG51bWJlcjtcblx0cHJpdmF0ZSBkb2N1bWVudEVsZW1lbnQ6IFdpbmRvdyB8IEVsZW1lbnRSZWYgfCBhbnk7XG5cdHByaXZhdGUgaXNDb250YWluZXJXaW5kb3c6IGJvb2xlYW47XG5cdHByaXZhdGUgZGlzcG9zZVNjcm9sbDogU3Vic2NyaXB0aW9uO1xuXHRwdWJsaWMgbGFzdFNjcm9sbFBvc2l0aW9uOiBudW1iZXIgPSAwO1xuXHRwcml2YXRlIGF4aXM6IEF4aXNSZXNvbHZlcjtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHdpbmRvd0VsZW1lbnQ6IFdpbmRvdyB8IEVsZW1lbnRSZWYgfCBhbnksXG5cdFx0cHJpdmF0ZSAkaW50ZXJ2YWw6IEZ1bmN0aW9uLFxuXHRcdHByaXZhdGUgJGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBpbmZpbml0ZVNjcm9sbERvd25DYWxsYmFjazogRnVuY3Rpb24sXG5cdFx0cHJpdmF0ZSBpbmZpbml0ZVNjcm9sbFVwQ2FsbGJhY2s6IEZ1bmN0aW9uLFxuXHRcdGluZmluaXRlU2Nyb2xsRG93bkRpc3RhbmNlOiBudW1iZXIsXG5cdFx0aW5maW5pdGVTY3JvbGxVcERpc3RhbmNlOiBudW1iZXIsXG5cdFx0aW5maW5pdGVTY3JvbGxQYXJlbnQ6IFdpbmRvdyB8IEVsZW1lbnRSZWYgfCBhbnksXG5cdFx0cHJpdmF0ZSBpbmZpbml0ZVNjcm9sbFRocm90dGxlOiBudW1iZXIsXG5cdFx0cHJpdmF0ZSBpc0ltbWVkaWF0ZTogYm9vbGVhbixcblx0XHRwcml2YXRlIGhvcml6b250YWw6IGJvb2xlYW4gPSBmYWxzZSxcblx0XHRwcml2YXRlIGFsd2F5c0NhbGxiYWNrOiBib29sZWFuID0gZmFsc2Vcblx0KSB7XG5cdFx0dGhpcy5pc0NvbnRhaW5lcldpbmRvdyA9IHRvU3RyaW5nLmNhbGwodGhpcy53aW5kb3dFbGVtZW50KS5pbmNsdWRlcygnV2luZG93Jyk7XG5cdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQgPSB0aGlzLmlzQ29udGFpbmVyV2luZG93ID8gdGhpcy53aW5kb3dFbGVtZW50LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IG51bGw7XG5cdFx0dGhpcy5oYW5kbGVJbmZpbml0ZVNjcm9sbERpc3RhbmNlKGluZmluaXRlU2Nyb2xsRG93bkRpc3RhbmNlLCBpbmZpbml0ZVNjcm9sbFVwRGlzdGFuY2UpO1xuXG5cdFx0Ly8gaWYgKGF0dHJzLmluZmluaXRlU2Nyb2xsUGFyZW50ICE9IG51bGwpIHtcblx0XHQvLyBcdGF0dGFjaEV2ZW50KGFuZ3VsYXIuZWxlbWVudChlbGVtLnBhcmVudCgpKSk7XG5cdFx0Ly8gfVxuXHRcdHRoaXMuaGFuZGxlSW5maW5pdGVTY3JvbGxEaXNhYmxlZChmYWxzZSk7XG5cdFx0dGhpcy5kZWZpbmVDb250YWluZXIoKTtcblx0XHR0aGlzLmNyZWF0ZUludGVydmFsKCk7XG5cdFx0dGhpcy5heGlzID0gbmV3IEF4aXNSZXNvbHZlcighdGhpcy5ob3Jpem9udGFsKTtcblx0fVxuXG5cdGRlZmluZUNvbnRhaW5lciAoKSB7XG5cdFx0aWYgKHRoaXMuaXNDb250YWluZXJXaW5kb3cpIHtcblx0XHRcdHRoaXMuY29udGFpbmVyID0gdGhpcy53aW5kb3dFbGVtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lciA9IHRoaXMud2luZG93RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXHRcdH1cblx0XHR0aGlzLmF0dGFjaEV2ZW50KHRoaXMuY29udGFpbmVyKTtcblx0fVxuXG5cdGNyZWF0ZUludGVydmFsICgpIHtcblx0XHRpZiAodGhpcy5pc0ltbWVkaWF0ZSkge1xuXHRcdFx0dGhpcy5jaGVja0ludGVydmFsID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVyKCk7XG5cdFx0XHR9LCAwKTtcblx0XHR9XG5cdH1cblxuXHRoZWlnaHQgKGVsZW06IGFueSkge1xuXHRcdGxldCBvZmZzZXRIZWlnaHQgPSB0aGlzLmF4aXMub2Zmc2V0SGVpZ2h0S2V5KCk7XG5cdFx0bGV0IGNsaWVudEhlaWdodCA9IHRoaXMuYXhpcy5jbGllbnRIZWlnaHRLZXkoKTtcblxuXHRcdC8vIGVsZW0gPSBlbGVtLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0aWYgKGlzTmFOKGVsZW1bb2Zmc2V0SGVpZ2h0XSkpIHtcblx0XHRcdHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudFtjbGllbnRIZWlnaHRdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWxlbVtvZmZzZXRIZWlnaHRdO1xuXHRcdH1cblx0fVxuXG5cdG9mZnNldFRvcCAoZWxlbTogYW55KSB7XG5cdFx0bGV0IHRvcCA9IHRoaXMuYXhpcy50b3BLZXkoKTtcblxuXHRcdC8vIGVsZW0gPSBlbGVtLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0aWYgKCFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkgeyAvLyB8fCBlbGVtLmNzcygnbm9uZScpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3RvcF0gKyB0aGlzLnBhZ2VZT2Zmc2V0KGVsZW0pO1xuXHR9XG5cblx0cGFnZVlPZmZzZXQgKGVsZW06IGFueSkge1xuXHRcdGxldCBwYWdlWU9mZnNldCA9IHRoaXMuYXhpcy5wYWdlWU9mZnNldEtleSgpO1xuXHRcdGxldCBzY3JvbGxUb3AgICA9IHRoaXMuYXhpcy5zY3JvbGxUb3BLZXkoKTtcblx0XHRsZXQgb2Zmc2V0VG9wICAgPSB0aGlzLmF4aXMub2Zmc2V0VG9wS2V5KCk7XG5cblx0XHQvLyBlbGVtID0gZWxlbS5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChpc05hTih3aW5kb3dbcGFnZVlPZmZzZXRdKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50W3Njcm9sbFRvcF07XG5cdFx0fSBlbHNlIGlmIChlbGVtLm93bmVyRG9jdW1lbnQpIHtcblx0XHRcdHJldHVybiBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdbcGFnZVlPZmZzZXRdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZWxlbVtvZmZzZXRUb3BdO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZXIgKCkge1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG5cdFx0Y29uc3Qgc2Nyb2xsaW5nRG93bjogYm9vbGVhbiA9IHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uIDwgY29udGFpbmVyLnNjcm9sbGVkVW50aWxOb3c7XG5cdFx0dGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBjb250YWluZXIuc2Nyb2xsZWRVbnRpbE5vdztcblxuXHRcdGxldCByZW1haW5pbmc6IG51bWJlcjtcblx0XHRsZXQgY29udGFpbmVyQnJlYWtwb2ludDogbnVtYmVyO1xuXHRcdGlmIChzY3JvbGxpbmdEb3duKSB7XG5cdFx0XHRyZW1haW5pbmcgPSBjb250YWluZXIudG90YWxUb1Njcm9sbCAtIGNvbnRhaW5lci5zY3JvbGxlZFVudGlsTm93O1xuXHRcdFx0Y29udGFpbmVyQnJlYWtwb2ludCA9IGNvbnRhaW5lci5oZWlnaHQgKiB0aGlzLnNjcm9sbERvd25EaXN0YW5jZSArIDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbWFpbmluZyA9IGNvbnRhaW5lci5zY3JvbGxlZFVudGlsTm93O1xuXHRcdFx0Y29udGFpbmVyQnJlYWtwb2ludCA9IGNvbnRhaW5lci5oZWlnaHQgKiB0aGlzLnNjcm9sbFVwRGlzdGFuY2UgKyAxO1xuXHRcdH1cblx0XHRjb25zdCBzaG91bGRTY3JvbGw6IGJvb2xlYW4gPSByZW1haW5pbmcgPD0gY29udGFpbmVyQnJlYWtwb2ludDtcblx0XHRjb25zdCB0cmlnZ2VyQ2FsbGJhY2s6IGJvb2xlYW4gPSAodGhpcy5hbHdheXNDYWxsYmFjayB8fCBzaG91bGRTY3JvbGwpICYmIHRoaXMuc2Nyb2xsRW5hYmxlZDtcblx0XHRjb25zdCBzaG91bGRDbGVhckludGVydmFsID0gc2hvdWxkU2Nyb2xsICYmIHRoaXMuY2hlY2tJbnRlcnZhbDtcblx0XHQvLyBpZiAodGhpcy51c2VEb2N1bWVudEJvdHRvbSkge1xuXHRcdC8vIFx0Y29udGFpbmVyLnRvdGFsVG9TY3JvbGwgPSB0aGlzLmhlaWdodCh0aGlzLiRlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCk7XG5cdFx0Ly8gfVxuXHRcdHRoaXMuY2hlY2tXaGVuRW5hYmxlZCA9IHNob3VsZFNjcm9sbDtcblxuXHRcdGlmICh0cmlnZ2VyQ2FsbGJhY2spIHtcblx0XHRcdGlmIChzY3JvbGxpbmdEb3duKSB7XG5cdFx0XHRcdHRoaXMuaW5maW5pdGVTY3JvbGxEb3duQ2FsbGJhY2soe2N1cnJlbnRTY3JvbGxQb3NpdGlvbjogY29udGFpbmVyLnNjcm9sbGVkVW50aWxOb3d9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuaW5maW5pdGVTY3JvbGxVcENhbGxiYWNrKHtjdXJyZW50U2Nyb2xsUG9zaXRpb246IGNvbnRhaW5lci5zY3JvbGxlZFVudGlsTm93fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChzaG91bGRDbGVhckludGVydmFsKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuY2hlY2tJbnRlcnZhbCk7XG5cdFx0fVxuXHR9XG5cblx0Y2FsY3VsYXRlUG9pbnRzKCkge1xuXHRcdHJldHVybiB0aGlzLmlzQ29udGFpbmVyV2luZG93XG5cdFx0XHQ/IHRoaXMuY2FsY3VsYXRlUG9pbnRzRm9yV2luZG93KClcblx0XHRcdDogdGhpcy5jYWxjdWxhdGVQb2ludHNGb3JFbGVtZW50KCk7XG5cdH1cblxuXHRjYWxjdWxhdGVQb2ludHNGb3JXaW5kb3cgKCkge1xuXHRcdC8vIGNvbnRhaW5lcidzIGhlaWdodFxuXHRcdGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcblx0XHQvLyBzY3JvbGxlZCB1bnRpbCBub3cgLyBjdXJyZW50IHkgcG9pbnRcblx0XHRjb25zdCBzY3JvbGxlZFVudGlsTm93ID0gaGVpZ2h0ICsgdGhpcy5wYWdlWU9mZnNldCh0aGlzLmRvY3VtZW50RWxlbWVudCk7XG5cdFx0Ly8gdG90YWwgaGVpZ2h0IC8gbW9zdCBib3R0b20geSBwb2ludFxuXHRcdGNvbnN0IHRvdGFsVG9TY3JvbGwgPSB0aGlzLm9mZnNldFRvcCh0aGlzLiRlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpICsgdGhpcy5oZWlnaHQodGhpcy4kZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblx0XHRyZXR1cm4geyBoZWlnaHQsIHNjcm9sbGVkVW50aWxOb3csIHRvdGFsVG9TY3JvbGwgfTtcblx0fVxuXG5cdGNhbGN1bGF0ZVBvaW50c0ZvckVsZW1lbnQgKCkge1xuXHRcdGxldCBzY3JvbGxUb3AgICAgPSB0aGlzLmF4aXMuc2Nyb2xsVG9wS2V5KCk7XG5cdFx0bGV0IHNjcm9sbEhlaWdodCA9IHRoaXMuYXhpcy5zY3JvbGxIZWlnaHRLZXkoKTtcblxuXHRcdGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcblx0XHQvLyBwZXJoYXBzIHVzZSB0aGlzLmNvbnRhaW5lci5vZmZzZXRUb3AgaW5zdGVhZCBvZiAnc2Nyb2xsVG9wJ1xuXHRcdGNvbnN0IHNjcm9sbGVkVW50aWxOb3cgPSB0aGlzLmNvbnRhaW5lcltzY3JvbGxUb3BdO1xuXHRcdGxldCBjb250YWluZXJUb3BPZmZzZXQgPSAwO1xuXHRcdGNvbnN0IG9mZnNldFRvcCA9IHRoaXMub2Zmc2V0VG9wKHRoaXMuY29udGFpbmVyKTtcblx0XHRpZiAob2Zmc2V0VG9wICE9PSB2b2lkIDApIHtcblx0XHRcdGNvbnRhaW5lclRvcE9mZnNldCA9IG9mZnNldFRvcDtcblx0XHR9XG5cdFx0Y29uc3QgdG90YWxUb1Njcm9sbCA9IHRoaXMuY29udGFpbmVyW3Njcm9sbEhlaWdodF07XG5cdFx0Ly8gY29uc3QgdG90YWxUb1Njcm9sbCA9IHRoaXMub2Zmc2V0VG9wKHRoaXMuJGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgLSBjb250YWluZXJUb3BPZmZzZXQgKyB0aGlzLmhlaWdodCh0aGlzLiRlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdHJldHVybiB7IGhlaWdodCwgc2Nyb2xsZWRVbnRpbE5vdywgdG90YWxUb1Njcm9sbCB9O1xuXHR9XG5cblx0aGFuZGxlSW5maW5pdGVTY3JvbGxEaXN0YW5jZSAoc2Nyb2xsRG93bkRpc3RhbmNlOiBudW1iZXIgfCBhbnksIHNjcm9sbFVwRGlzdGFuY2U6IG51bWJlciB8IGFueSkge1xuXHRcdHRoaXMuc2Nyb2xsRG93bkRpc3RhbmNlID0gcGFyc2VGbG9hdChzY3JvbGxEb3duRGlzdGFuY2UpIHx8IDA7XG5cdFx0dGhpcy5zY3JvbGxVcERpc3RhbmNlID0gcGFyc2VGbG9hdChzY3JvbGxVcERpc3RhbmNlKSB8fCAwO1xuXHR9XG5cblx0YXR0YWNoRXZlbnQgKG5ld0NvbnRhaW5lcjogV2luZG93IHwgRWxlbWVudFJlZiB8IGFueSkge1xuXHRcdHRoaXMuY2xlYW4oKTtcblx0XHRpZiAobmV3Q29udGFpbmVyKSB7XG5cdFx0XHRjb25zdCB0aHJvdHRsZTogbnVtYmVyID0gdGhpcy5pbmZpbml0ZVNjcm9sbFRocm90dGxlO1xuXHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy5jb250YWluZXIsICdzY3JvbGwnKVxuXHRcdFx0XHQudGhyb3R0bGUoZXYgPT4gT2JzZXJ2YWJsZS50aW1lcih0aHJvdHRsZSkpXG5cdFx0XHRcdC5zdWJzY3JpYmUoZXYgPT4gdGhpcy5oYW5kbGVyKCkpXG5cdFx0fVxuXHR9XG5cblx0Y2xlYW4gKCkge1xuXHRcdGlmICh0aGlzLmRpc3Bvc2VTY3JvbGwpIHtcblx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbC51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZUluZmluaXRlU2Nyb2xsRGlzYWJsZWQgKGVuYWJsZVNjcm9sbDogYm9vbGVhbikge1xuXHRcdHRoaXMuc2Nyb2xsRW5hYmxlZCA9ICFlbmFibGVTY3JvbGw7XG5cdFx0Ly8gaWYgKHRoaXMuc2Nyb2xsRW5hYmxlZCAmJiBjaGVja1doZW5FbmFibGVkKSB7XG5cdFx0Ly8gXHRjaGVja1doZW5FbmFibGVkID0gZmFsc2U7XG5cdFx0Ly8gXHRyZXR1cm4gaGFuZGxlcigpO1xuXHRcdC8vIH1cblx0fVxufVxuIl19
