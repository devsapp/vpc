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
var HandlerService_1 = __importDefault(require("./utils/HandlerService"));
var SlsCompoent = /** @class */ (function () {
    function SlsCompoent() {
    }
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
            this.logger.info("Vpc name not fount, generate name is: " + name + ".");
        }
        if (!properties.vSwitchName) {
            properties.vSwitchName = name;
            this.logger.info("VSwitch name not fount, generate name is: " + name + ".");
        }
        if (!properties.securityGroupName) {
            properties.securityGroupName = name;
            this.logger.info("SecurityGroup name not fount, generate name is: " + name + ".");
        }
        return properties;
    };
    SlsCompoent.prototype.create = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, properties, client, vpcConfig;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.debug('Create vpc start...');
                        this.logger.debug("[inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.credentials) === null || _b === void 0 ? void 0 : _b.Alias)];
                    case 1:
                        credential = _c.sent();
                        properties = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        client = new HandlerService_1.default(credential);
                        return [4 /*yield*/, client.create(properties)];
                    case 2:
                        vpcConfig = _c.sent();
                        this.logger.debug("Create vpc success, config is: " + JSON.stringify(vpcConfig) + ".");
                        return [2 /*return*/, vpcConfig];
                }
            });
        });
    };
    SlsCompoent.prototype.delete = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, properties, client, pro;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.debug('Delete vpc start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core_1.getCredential((_b = inputs.credentials) === null || _b === void 0 ? void 0 : _b.Alias)];
                    case 1:
                        credential = _c.sent();
                        client = new HandlerService_1.default(credential);
                        if (!interface_1.isDeleteProperties(inputs.Properties)) return [3 /*break*/, 2];
                        properties = inputs.Properties;
                        return [3 /*break*/, 4];
                    case 2:
                        pro = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        return [4 /*yield*/, client.getVpcConfigs(pro)];
                    case 3:
                        properties = _c.sent();
                        _c.label = 4;
                    case 4:
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        return [4 /*yield*/, client.delete(properties)];
                    case 5:
                        _c.sent();
                        this.logger.debug('Delete vpc success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], SlsCompoent.prototype, "logger", void 0);
    return SlsCompoent;
}());
exports.default = SlsCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNEY7QUFDNUYsa0RBQXVCO0FBQ3ZCLHVDQUEyQztBQUMzQyx5Q0FBMEY7QUFDMUYsMEVBQW9EO0FBRXBEO0lBQUE7SUFrRkEsQ0FBQztJQS9FQyw2REFBdUMsR0FBdkMsVUFBd0MsVUFBdUI7UUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBTSxJQUFJLEdBQU0sa0JBQU8sd0JBQXFCLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkNBQXlDLElBQUksTUFBRyxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUMzQixVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBNkMsSUFBSSxNQUFHLENBQUMsQ0FBQztTQUN4RTtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsVUFBVSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxREFBbUQsSUFBSSxNQUFHLENBQUMsQ0FBQztTQUM5RTtR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