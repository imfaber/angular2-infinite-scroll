import { ElementRef } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttle';
export declare class Scroller {
    private windowElement;
    private $interval;
    private $elementRef;
    private infiniteScrollDownCallback;
    private infiniteScrollUpCallback;
    private infiniteScrollThrottle;
    private isImmediate;
    private horizontal;
    private alwaysCallback;
    scrollDownDistance: number;
    scrollUpDistance: number;
    scrollEnabled: boolean;
    checkWhenEnabled: boolean;
    container: Window | ElementRef | any;
    immediateCheck: boolean;
    useDocumentBottom: boolean;
    checkInterval: number;
    private documentElement;
    private isContainerWindow;
    private disposeScroll;
    lastScrollPosition: number;
    private axis;
    constructor(windowElement: Window | ElementRef | any, $interval: Function, $elementRef: ElementRef, infiniteScrollDownCallback: Function, infiniteScrollUpCallback: Function, infiniteScrollDownDistance: number, infiniteScrollUpDistance: number, infiniteScrollParent: Window | ElementRef | any, infiniteScrollThrottle: number, isImmediate: boolean, horizontal?: boolean, alwaysCallback?: boolean);
    defineContainer(): void;
    createInterval(): void;
    height(elem: any): any;
    offsetTop(elem: any): any;
    pageYOffset(elem: any): any;
    handler(): void;
    calculatePoints(): {
        height: any;
        scrolledUntilNow: any;
        totalToScroll: any;
    };
    calculatePointsForWindow(): {
        height: any;
        scrolledUntilNow: any;
        totalToScroll: any;
    };
    calculatePointsForElement(): {
        height: any;
        scrolledUntilNow: any;
        totalToScroll: any;
    };
    handleInfiniteScrollDistance(scrollDownDistance: number | any, scrollUpDistance: number | any): void;
    attachEvent(newContainer: Window | ElementRef | any): void;
    clean(): void;
    handleInfiniteScrollDisabled(enableScroll: boolean): void;
}
