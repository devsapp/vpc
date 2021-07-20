"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var interface_1 = require("./interface");
var base_1 = __importDefault(require("./common/base"));
var stdout_formatter_1 = __importDefault(require("./common/stdout-formatter"));
var HandlerService_1 = __importDefault(require("./utils/HandlerService"));
var SlsCompoent = /** @class */ (function (_super) {
    __extends(SlsCompoent, _super);
    function SlsCompoent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlsCompoent.prototype.create = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, _c, properties, client, vpcConfig;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug('Create vpc start...');
                        this.logger.debug("[inputs params: " + JSON.stringify(inputs.props));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initStdout()];
                    case 1:
                        _d.sent();
                        _c = inputs.credentials;
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 2:
                        _c = (_d.sent());
                        _d.label = 3;
                    case 3:
                        credential = _c;
                        core_1.reportComponent(constant_1.CONTEXT_NAME, {
                            uid: credential.AccountID,
                            command: 'create',
                        });
                        properties = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        client = new HandlerService_1.default(credential);
                        return [4 /*yield*/, client.create(properties)];
                    case 4:
                        vpcConfig = _d.sent();
                        this.logger.debug("Create vpc success, config is: " + JSON.stringify(vpcConfig) + ".");
                        _super.prototype.__report.call(this, {
                            name: 'vpc',
                            access: (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access,
                            content: __assign({ region: properties.regionId }, vpcConfig),
                        });
                        return [2 /*return*/, vpcConfig];
                }
            });
        });
    };
    SlsCompoent.prototype.delete = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, _d, properties, client, pro;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.logger.debug('Delete vpc start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs.props));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initStdout()];
                    case 1:
                        _e.sent();
                        _d = inputs.credentials;
                        if (_d) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 2:
                        _d = (_e.sent());
                        _e.label = 3;
                    case 3:
                        credential = _d;
                        core_1.reportComponent(constant_1.CONTEXT_NAME, {
                            uid: credential.AccountID,
                            command: 'delete',
                        });
                        client = new HandlerService_1.default(credential);
                        if (!interface_1.isDeleteProperties(inputs.Properties)) return [3 /*break*/, 4];
                        properties = inputs.Properties;
                        return [3 /*break*/, 6];
                    case 4:
                        pro = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        return [4 /*yield*/, client.getVpcConfigs(pro)];
                    case 5:
                        properties = _e.sent();
                        _e.label = 6;
                    case 6:
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        return [4 /*yield*/, client.delete(properties)];
                    case 7:
                        _e.sent();
                        _super.prototype.__report.call(this, {
                            name: 'vpc',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: { region: properties.regionId, vpcId: '', vSwitchId: '', securityGroupId: '' },
                        });
                        this.logger.debug('Delete vpc success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    SlsCompoent.prototype.checkPropertiesAndGenerateResourcesName = function (properties) {
        if (!properties.regionId) {
            throw new Error('RegionId not fount.');
        }
        if (!properties.zoneId) {
            throw new Error('ZoneId not fount.');
        }
        var name = constant_1.CONTEXT + "-generate-resources";
        if (!properties.vpcName) {
            properties.vpcName = name;
            this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('vpc name', name));
        }
        if (!properties.vSwitchName) {
            properties.vSwitchName = name;
            this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('vswitch name', name));
        }
        if (!properties.securityGroupName) {
            properties.securityGroupName = name;
            this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('securityGroup name', name));
        }
        return properties;
    };
    SlsCompoent.prototype.initStdout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], SlsCompoent.prototype, "logger", void 0);
    return SlsCompoent;
}(base_1.default));
exports.default = SlsCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkc7QUFDN0csa0RBQXVCO0FBQ3ZCLHVDQUF5RDtBQUN6RCx5Q0FBMEY7QUFDMUYsdURBQWlDO0FBQ2pDLCtFQUF5RDtBQUN6RCwwRUFBb0Q7QUFFcEQ7SUFBeUMsK0JBQUk7SUFBN0M7O0lBMkdBLENBQUM7SUF4R08sNEJBQU0sR0FBWixVQUFhLE1BQWU7Ozs7Ozs7d0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO3dCQUUvRCxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt3QkFDbkQsV0FBVyxHQUFRLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFDO3dCQUNyRSxVQUFJLFdBQVcsQ0FBQyxJQUFJLDBDQUFFLElBQUksRUFBRTs0QkFDMUIsV0FBSSxDQUFDLGVBQUksQ0FBQyxDQUFDOzRCQUNYLHNCQUFPO3lCQUNSO3dCQUNELHFCQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQXZCLFNBQXVCLENBQUM7d0JBRUws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