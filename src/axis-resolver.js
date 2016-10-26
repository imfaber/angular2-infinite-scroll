"use strict";
var AxisResolver = (function () {
    function AxisResolver(vertical) {
        if (vertical === void 0) { vertical = true; }
        this.vertical = vertical;
    }
    AxisResolver.prototype.clientHeightKey = function () { return this.vertical ? 'clientHeight' : 'clientWidth'; };
    AxisResolver.prototype.offsetHeightKey = function () { return this.vertical ? 'offsetHeight' : 'offsetWidth'; };
    AxisResolver.prototype.scrollHeightKey = function () { return this.vertical ? 'scrollHeight' : 'scrollWidth'; };
    AxisResolver.prototype.pageYOffsetKey = function () { return this.vertical ? 'pageYOffset' : 'pageXOffset'; };
    AxisResolver.prototype.offsetTopKey = function () { return this.vertical ? 'offsetTop' : 'offsetLeft'; };
    AxisResolver.prototype.scrollTopKey = function () { return this.vertical ? 'scrollTop' : 'scrollLeft'; };
    AxisResolver.prototype.topKey = function () { return this.vertical ? 'top' : 'left'; };
    return AxisResolver;
}());
exports.AxisResolver = AxisResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF4aXMtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBR0Usc0JBQVksUUFBZTtRQUFmLHdCQUFlLEdBQWYsZUFBZTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0NBQWUsR0FBZixjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUcsYUFBYSxDQUFBLENBQUEsQ0FBQztJQUN6RSxzQ0FBZSxHQUFmLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsR0FBRyxhQUFhLENBQUEsQ0FBQSxDQUFDO0lBQ3pFLHNDQUFlLEdBQWYsY0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxHQUFHLGFBQWEsQ0FBQSxDQUFBLENBQUM7SUFDekUscUNBQWMsR0FBZCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLEdBQUksYUFBYSxDQUFBLENBQUEsQ0FBQztJQUN6RSxtQ0FBWSxHQUFaLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsR0FBTSxZQUFZLENBQUEsQ0FBQSxDQUFDO0lBQ3hFLG1DQUFZLEdBQVosY0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxHQUFNLFlBQVksQ0FBQSxDQUFBLENBQUM7SUFDeEUsNkJBQU0sR0FBTixjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQVksTUFBTSxDQUFBLENBQUEsQ0FBQztJQUNwRSxtQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksb0JBQVksZUFjeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBeGlzUmVzb2x2ZXIge1xuICBwcml2YXRlIHZlcnRpY2FsOiBib29sZWFuOyAvLyBlbHNlIGhvcml6b250YWxcblxuICBjb25zdHJ1Y3Rvcih2ZXJ0aWNhbCA9IHRydWUpIHtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBjbGllbnRIZWlnaHRLZXkoKSB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAnY2xpZW50SGVpZ2h0JyA6ICdjbGllbnRXaWR0aCd9XG4gIG9mZnNldEhlaWdodEtleSgpIHtyZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdvZmZzZXRIZWlnaHQnIDogJ29mZnNldFdpZHRoJ31cbiAgc2Nyb2xsSGVpZ2h0S2V5KCkge3JldHVybiB0aGlzLnZlcnRpY2FsID8gJ3Njcm9sbEhlaWdodCcgOiAnc2Nyb2xsV2lkdGgnfVxuICBwYWdlWU9mZnNldEtleSgpICB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAncGFnZVlPZmZzZXQnICA6ICdwYWdlWE9mZnNldCd9XG4gIG9mZnNldFRvcEtleSgpICAgIHtyZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdvZmZzZXRUb3AnICAgIDogJ29mZnNldExlZnQnfVxuICBzY3JvbGxUb3BLZXkoKSAgICB7cmV0dXJuIHRoaXMudmVydGljYWwgPyAnc2Nyb2xsVG9wJyAgICA6ICdzY3JvbGxMZWZ0J31cbiAgdG9wS2V5KCkgICAgICAgICAge3JldHVybiB0aGlzLnZlcnRpY2FsID8gJ3RvcCcgICAgICAgICAgOiAnbGVmdCd9XG59XG4iXX0=