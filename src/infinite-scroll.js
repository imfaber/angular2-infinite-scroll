"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var scroller_1 = require('./scroller');
var InfiniteScroll = (function () {
    function InfiniteScroll(element) {
        this.element = element;
        this._distanceDown = 2;
        this._distanceUp = 1.5;
        this._throttle = 3;
        this.scrollWindow = true;
        this._immediate = false;
        this._horizontal = false;
        this._alwaysCallback = false;
        this.scrolled = new core_1.EventEmitter();
        this.scrolledUp = new core_1.EventEmitter();
    }
    InfiniteScroll.prototype.ngOnInit = function () {
        var containerElement = this.scrollWindow ? window : this.element;
        this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScrollDown.bind(this), this.onScrollUp.bind(this), this._distanceDown, this._distanceUp, {}, this._throttle, this._immediate, this._horizontal, this._alwaysCallback);
    };
    InfiniteScroll.prototype.ngOnDestroy = function () {
        this.scroller.clean();
    };
    InfiniteScroll.prototype.onScrollDown = function (data) {
        if (data === void 0) { data = {}; }
        this.scrolled.next(data);
    };
    InfiniteScroll.prototype.onScrollUp = function (data) {
        if (data === void 0) { data = {}; }
        this.scrolledUp.next(data);
    };
    __decorate([
        core_1.Input('infiniteScrollDistance'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_distanceDown", void 0);
    __decorate([
        core_1.Input('infiniteScrollUpDistance'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_distanceUp", void 0);
    __decorate([
        core_1.Input('infiniteScrollThrottle'), 
        __metadata('design:type', Number)
    ], InfiniteScroll.prototype, "_throttle", void 0);
    __decorate([
        core_1.Input('scrollWindow'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "scrollWindow", void 0);
    __decorate([
        core_1.Input('immediateCheck'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_immediate", void 0);
    __decorate([
        core_1.Input('horizontal'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_horizontal", void 0);
    __decorate([
        core_1.Input('alwaysCallback'), 
        __metadata('design:type', Boolean)
    ], InfiniteScroll.prototype, "_alwaysCallback", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InfiniteScroll.prototype, "scrolled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InfiniteScroll.prototype, "scrolledUp", void 0);
    InfiniteScroll = __decorate([
        core_1.Directive({
            selector: '[infinite-scroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InfiniteScroll);
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5maW5pdGUtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0csZUFBZSxDQUFDLENBQUE7QUFDcEgseUJBQXlCLFlBQVksQ0FBQyxDQUFBO0FBS3RDO0lBY0Usd0JBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFYTixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUN4QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUM1QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDaEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDekIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFaEQsYUFBUSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUVBLENBQUM7SUFFM0MsaUNBQVEsR0FBUjtRQUNFLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDcEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3hELElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxJQUFTO1FBQVQsb0JBQVMsR0FBVCxTQUFTO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsSUFBUztRQUFULG9CQUFTLEdBQVQsU0FBUztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBL0JEO1FBQUMsWUFBSyxDQUFDLHdCQUF3QixDQUFDOzt5REFBQTtJQUNoQztRQUFDLFlBQUssQ0FBQywwQkFBMEIsQ0FBQzs7dURBQUE7SUFDbEM7UUFBQyxZQUFLLENBQUMsd0JBQXdCLENBQUM7O3FEQUFBO0lBQ2hDO1FBQUMsWUFBSyxDQUFDLGNBQWMsQ0FBQzs7d0RBQUE7SUFDdEI7UUFBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUM7O3NEQUFBO0lBQ3hCO1FBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQzs7dURBQUE7SUFDcEI7UUFBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUM7OzJEQUFBO0lBRXhCO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztzREFBQTtJQWZYO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQzs7c0JBQUE7SUFvQ0YscUJBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLHNCQUFjLGlCQW1DMUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxlciB9IGZyb20gJy4vc2Nyb2xsZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaW5maW5pdGUtc2Nyb2xsXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGwgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHB1YmxpYyBzY3JvbGxlcjogU2Nyb2xsZXI7XG5cbiAgQElucHV0KCdpbmZpbml0ZVNjcm9sbERpc3RhbmNlJykgX2Rpc3RhbmNlRG93bjogbnVtYmVyID0gMjtcbiAgQElucHV0KCdpbmZpbml0ZVNjcm9sbFVwRGlzdGFuY2UnKSBfZGlzdGFuY2VVcDogbnVtYmVyID0gMS41O1xuICBASW5wdXQoJ2luZmluaXRlU2Nyb2xsVGhyb3R0bGUnKSBfdGhyb3R0bGU6IG51bWJlciA9IDM7XG4gIEBJbnB1dCgnc2Nyb2xsV2luZG93Jykgc2Nyb2xsV2luZG93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdpbW1lZGlhdGVDaGVjaycpIF9pbW1lZGlhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdob3Jpem9udGFsJykgX2hvcml6b250YWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdhbHdheXNDYWxsYmFjaycpIF9hbHdheXNDYWxsYmFjazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzY3JvbGxlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNjcm9sbGVkVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSB0aGlzLnNjcm9sbFdpbmRvdyA/IHdpbmRvdyA6IHRoaXMuZWxlbWVudDtcbiAgICB0aGlzLnNjcm9sbGVyID0gbmV3IFNjcm9sbGVyKGNvbnRhaW5lckVsZW1lbnQsIHNldEludGVydmFsLCB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHRoaXMub25TY3JvbGxEb3duLmJpbmQodGhpcyksIHRoaXMub25TY3JvbGxVcC5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLl9kaXN0YW5jZURvd24sIHRoaXMuX2Rpc3RhbmNlVXAsIHt9LCB0aGlzLl90aHJvdHRsZSxcbiAgICAgICAgdGhpcy5faW1tZWRpYXRlLCB0aGlzLl9ob3Jpem9udGFsLCB0aGlzLl9hbHdheXNDYWxsYmFjayk7XG4gIH1cblxuICBuZ09uRGVzdHJveSAoKSB7XG4gICAgdGhpcy5zY3JvbGxlci5jbGVhbigpO1xuICB9XG5cbiAgb25TY3JvbGxEb3duKGRhdGEgPSB7fSkge1xuICAgIHRoaXMuc2Nyb2xsZWQubmV4dChkYXRhKTtcbiAgfVxuXG4gIG9uU2Nyb2xsVXAoZGF0YSA9IHt9KSB7XG4gICAgdGhpcy5zY3JvbGxlZFVwLm5leHQoZGF0YSk7XG4gIH1cbn1cbiJdfQ==