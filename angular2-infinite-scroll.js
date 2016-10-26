"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var infinite_scroll_1 = require('./src/infinite-scroll');
var scroller_1 = require('./src/scroller');
var axis_resolver_1 = require('./src/axis-resolver');
__export(require('./src/infinite-scroll'));
__export(require('./src/scroller'));
__export(require('./src/axis-resolver'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller, axis_resolver_1.AxisResolver]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItaW5maW5pdGUtc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjItaW5maW5pdGUtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnQ0FBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RCx5QkFBeUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxQyw4QkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUVuRCxpQkFBYyx1QkFBdUIsQ0FBQyxFQUFBO0FBQ3RDLGlCQUFjLGdCQUFnQixDQUFDLEVBQUE7QUFDL0IsaUJBQWMscUJBQXFCLENBQUMsRUFBQTtBQUVwQztrQkFBZTtJQUNkLFVBQVUsRUFBRSxDQUFFLGdDQUFjLEVBQUUsbUJBQVEsRUFBRSw0QkFBWSxDQUFFO0NBQ3RELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmZpbml0ZVNjcm9sbCB9IGZyb20gJy4vc3JjL2luZmluaXRlLXNjcm9sbCc7XG5pbXBvcnQgeyBTY3JvbGxlciB9IGZyb20gJy4vc3JjL3Njcm9sbGVyJztcbmltcG9ydCB7IEF4aXNSZXNvbHZlciB9IGZyb20gJy4vc3JjL2F4aXMtcmVzb2x2ZXInO1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9pbmZpbml0ZS1zY3JvbGwnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvc2Nyb2xsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvYXhpcy1yZXNvbHZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGlyZWN0aXZlczogWyBJbmZpbml0ZVNjcm9sbCwgU2Nyb2xsZXIsIEF4aXNSZXNvbHZlciBdXG59Il19