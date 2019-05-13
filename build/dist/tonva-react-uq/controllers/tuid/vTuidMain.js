import * as tslib_1 from "tslib";
import * as React from 'react';
import { SearchBox, List, Muted, LMR } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity } from '../CVEntity';
var VTuidMain = /** @class */ (function (_super) {
    tslib_1.__extends(VTuidMain, _super);
    function VTuidMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNew = function () { return _this.event('new'); };
        _this.onList = function () { return _this.event('list'); };
        _this.onSearch = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, this.event('list', key)];
        }); }); };
        return _this;
    }
    VTuidMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.view);
                return [2 /*return*/];
            });
        });
    };
    VTuidMain.prototype.entityRender = function (link, index) {
        return link.render();
    };
    VTuidMain.prototype.entityClick = function (link) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, link.onClick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(VTuidMain.prototype, "view", {
        get: function () {
            var _a = this.controller, label = _a.label, proxyLinks = _a.proxyLinks, isFrom = _a.isFrom;
            var newButton;
            if (isFrom === false)
                newButton = React.createElement("button", { className: "btn btn-outline-success ml-2", onClick: this.onNew }, "\u65B0\u589E");
            var content;
            if (proxyLinks === undefined) {
                var right = React.createElement(React.Fragment, null,
                    newButton,
                    React.createElement("button", { className: "btn btn-outline-info ml-2", onClick: this.onList }, "\u5168\u90E8"));
                content = React.createElement(LMR, { className: 'm-3', right: right },
                    React.createElement(SearchBox, { className: "w-100", size: "md", onSearch: this.onSearch, placeholder: '搜索' + label }));
            }
            else {
                content = React.createElement(List, { className: "my-2", header: React.createElement(Muted, null,
                        label,
                        " \u4EE3\u7406\u4E0B\u5217Tuid"), items: proxyLinks, item: { render: this.entityRender, onClick: this.entityClick } });
            }
            return function () { return React.createElement(Page, { header: label }, content); };
        },
        enumerable: true,
        configurable: true
    });
    return VTuidMain;
}(VEntity));
export { VTuidMain };
//# sourceMappingURL=vTuidMain.js.map