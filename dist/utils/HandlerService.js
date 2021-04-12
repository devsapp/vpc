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
var inquirer_1 = __importDefault(require("inquirer"));
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var constant_1 = require("../constant");
var requestOption = {
    method: 'POST',
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var HandlerService = /** @class */ (function () {
    function HandlerService(credentials) {
        this.vpcClient = this.getPopClient('https://vpc.aliyuncs.com', '2016-04-28', credentials);
        this.ecsClient = this.getPopClient('https://ecs.aliyuncs.com', '2014-05-26', credentials);
    }
    HandlerService.prototype.getPopClient = function (endpoint, apiVersion, profile) {
        var timeout = 10;
        if (process.env.ALIYUN_RAM_CLIENT_TIMEOUT) {
            timeout = parseInt(process.env.ALIYUN_RAM_CLIENT_TIMEOUT);
        }
        return new pop_core_1.default({
            endpoint: endpoint,
            apiVersion: apiVersion,
            accessKeyId: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            opts: {
                timeout: timeout * 1000,
            },
        });
    };
    HandlerService.prototype.create = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, vpcDescription, vpcCidrBlock, vSwitchName, vSwitchDescription, vSwitchCidrBlock, zoneId, securityGroupDescription, securityGroupName, vpcId, vSwitchId, securityGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, vpcName = properties.vpcName, vpcDescription = properties.vpcDescription, vpcCidrBlock = properties.vpcCidrBlock, vSwitchName = properties.vSwitchName, vSwitchDescription = properties.vSwitchDescription, vSwitchCidrBlock = properties.vSwitchCidrBlock, zoneId = properties.zoneId, securityGroupDescription = properties.securityGroupDescription, securityGroupName = properties.securityGroupName;
                        return [4 /*yield*/, this.mackVpc({
                                regionId: regionId,
                                vpcName: vpcName,
                                description: vpcDescription,
                                cidrBlock: vpcCidrBlock,
                            })];
                    case 1:
                        vpcId = _a.sent();
                        return [4 /*yield*/, this.mackVswitch({
                                regionId: regionId,
                                vpcId: vpcId,
                                zoneId: zoneId,
                                vSwitchName: vSwitchName,
                                cidrBlock: vSwitchCidrBlock,
                                description: vSwitchDescription,
                            })];
                    case 2:
                        vSwitchId = _a.sent();
                        this.logger.info("VSwitchId is " + vSwitchId + ".");
                        return [4 /*yield*/, this.mackSecurityGroup({
                                regionId: regionId,
                                vpcId: vpcId,
                                securityGroupName: securityGroupName,
                                description: securityGroupDescription,
                            })];
                    case 3:
                        securityGroupId = _a.sent();
                        this.logger.info("SecurityGroupId is " + securityGroupId + ".");
                        return [2 /*return*/, {
                                vpcId: vpcId,
                                vSwitchId: vSwitchId,
                                securityGroupId: securityGroupId,
                            }];
                }
            });
        });
    };
    HandlerService.prototype.delete = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, vSwitchId, securityGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = inputs.regionId, vpcId = inputs.vpcId, vSwitchId = inputs.vSwitchId, securityGroupId = inputs.securityGroupId;
                        if (!securityGroupId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteSecurityGroupId(regionId, securityGroupId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!vSwitchId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteVSwitchId(regionId, vSwitchId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!vpcId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.deleteVpc(regionId, vpcId)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.getVpcConfigs = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, vSwitchName, zoneId, securityGroupName, vpcId, vSwitchId, securityGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, vpcName = properties.vpcName, vSwitchName = properties.vSwitchName, zoneId = properties.zoneId, securityGroupName = properties.securityGroupName;
                        return [4 /*yield*/, this.mackVpc({
                                regionId: regionId,
                                vpcName: vpcName,
                                onlyGet: true,
                            })];
                    case 1:
                        vpcId = _a.sent();
                        return [4 /*yield*/, this.mackVswitch({
                                regionId: regionId,
                                vpcId: vpcId,
                                zoneId: zoneId,
                                vSwitchName: vSwitchName,
                                onlyGet: true,
                            })];
                    case 2:
                        vSwitchId = _a.sent();
                        this.logger.info("VSwitchId is " + vSwitchId + ".");
                        return [4 /*yield*/, this.mackSecurityGroup({
                                regionId: regionId,
                                vpcId: vpcId,
                                securityGroupName: securityGroupName,
                                onlyGet: true,
                            })];
                    case 3:
                        securityGroupId = _a.sent();
                        this.logger.info("SecurityGroupId is " + securityGroupId + ".");
                        return [2 /*return*/, {
                                regionId: regionId,
                                vpcId: vpcId,
                                vSwitchId: vSwitchId,
                                securityGroupId: securityGroupId,
                            }];
                }
            });
        });
    };
    HandlerService.prototype.mackVpc = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, onlyGet, _a, total, filterVpcs, vpcId, vpcId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        regionId = inputs.regionId, vpcName = inputs.vpcName, onlyGet = inputs.onlyGet;
                        return [4 /*yield*/, this.findVpcs(regionId, vpcName)];
                    case 1:
                        _a = _b.sent(), total = _a.total, filterVpcs = _a.list;
                        this.logger.debug("filter vpcs:: " + JSON.stringify(filterVpcs));
                        if (!(total === 1)) return [3 /*break*/, 2];
                        vpcId = filterVpcs[0].VpcId;
                        this.logger.info("There is only one vpc, directly reuse the current vpc, vpcId is: " + vpcId);
                        return [2 /*return*/, vpcId];
                    case 2:
                        if (!(total > 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer_1.default.prompt({
                                type: 'list',
                                name: 'vpcId',
                                message: 'There are multiple vpcs, please select a vpc:',
                                choices: filterVpcs.map(function (_a) {
                                    var VpcId = _a.VpcId;
                                    return VpcId;
                                }),
                            })];
                    case 3:
                        vpcId = (_b.sent()).vpcId;
                        this.logger.debug("vpcId is: " + vpcId);
                        return [2 /*return*/, vpcId];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        this.logger.info('Vpc not found.');
                        return [4 /*yield*/, this.createVpc(inputs)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    HandlerService.prototype.mackVswitch = function (mackVswitch) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, zoneId, vSwitchName, onlyGet, _a, total, vSwitches, vSwitchId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        regionId = mackVswitch.regionId, vpcId = mackVswitch.vpcId, zoneId = mackVswitch.zoneId, vSwitchName = mackVswitch.vSwitchName, onlyGet = mackVswitch.onlyGet;
                        return [4 /*yield*/, this.findVSwitches(regionId, vpcId, vSwitchName, zoneId)];
                    case 1:
                        _a = _b.sent(), total = _a.total, vSwitches = _a.list;
                        if (!(total === 1)) return [3 /*break*/, 2];
                        this.logger.info("There is only one vSwitch, directly reuse the current vSwitch.");
                        return [2 /*return*/, vSwitches[0].VSwitchId];
                    case 2:
                        if (!(total === 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer_1.default.prompt({
                                type: 'list',
                                name: 'vSwitchId',
                                message: 'There are multiple vSwitch, please select a vSwitch:',
                                choices: vSwitches.map(function (_a) {
                                    var VSwitchId = _a.VSwitchId;
                                    return VSwitchId;
                                }),
                            })];
                    case 3:
                        vSwitchId = (_b.sent()).vSwitchId;
                        return [2 /*return*/, vSwitchId];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        this.logger.info('VSwitch not found.');
                        return [4 /*yield*/, this.createVSwitch(mackVswitch)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    HandlerService.prototype.mackSecurityGroup = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, securityGroupName, onlyGet, _a, total, securityGroups, securityGroup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        regionId = inputs.regionId, vpcId = inputs.vpcId, securityGroupName = inputs.securityGroupName, onlyGet = inputs.onlyGet;
                        return [4 /*yield*/, this.findSecurityGroups(regionId, vpcId, securityGroupName)];
                    case 1:
                        _a = _b.sent(), total = _a.total, securityGroups = _a.list;
                        if (!(total === 1)) return [3 /*break*/, 2];
                        this.logger.info("There is only one securityGroup, directly reuse the current securityGroups.");
                        return [2 /*return*/, securityGroups[0].SecurityGroupId];
                    case 2:
                        if (!(total === 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer_1.default.prompt({
                                type: 'list',
                                name: 'securityGroup',
                                message: 'There are multiple securityGroup, please select a securityGroup:',
                                choices: securityGroups.map(function (_a) {
                                    var SecurityGroupId = _a.SecurityGroupId;
                                    return SecurityGroupId;
                                }),
                            })];
                    case 3:
                        securityGroup = (_b.sent()).securityGroup;
                        return [2 /*return*/, securityGroup];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        this.logger.info('SecurityGroup not found.');
                        return [4 /*yield*/, this.createSecurityGroup(inputs)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    HandlerService.prototype.findVpcs = function (regionId, vpcName) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, requestPageNumber, totalCount, pageNumber, vpcs, params, rs, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = 2;
                        requestPageNumber = 0;
                        vpcs = [];
                        this.logger.debug("find vpc start...");
                        _a.label = 1;
                    case 1:
                        params = {
                            RegionId: regionId,
                            PageSize: pageSize,
                            VpcName: vpcName,
                            PageNumber: ++requestPageNumber,
                        };
                        this.logger.debug("find vpc PageNumber: " + params.PageNumber);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 3:
                        rs = _a.sent();
                        this.logger.debug("find vpc rs: " + JSON.stringify(rs));
                        totalCount = rs.TotalCount;
                        pageNumber = rs.PageNumber;
                        vpcs = vpcs.concat(rs.Vpcs.Vpc);
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        throw ex_1;
                    case 5:
                        if (totalCount && pageNumber && pageNumber * pageSize < totalCount) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6:
                        this.logger.debug("find vpcs end, findVpcs vpcs response: " + JSON.stringify(vpcs));
                        return [2 /*return*/, { total: totalCount, list: vpcs }];
                }
            });
        });
    };
    HandlerService.prototype.findVSwitches = function (regionId, vpcId, vSwitchName, zoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            VSwitchName: vSwitchName,
                            ZoneId: zoneId,
                            PageSize: 50,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.vpcClient.request('DescribeVSwitches', params, requestOption)];
                    case 2:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeVSwitches response: " + JSON.stringify(rs));
                        return [2 /*return*/, { total: rs.TotalCount, list: rs.VSwitches.VSwitch }];
                    case 3:
                        ex_2 = _a.sent();
                        throw ex_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.findSecurityGroups = function (regionId, vpcId, securityGroupName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs, securityGroup, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            SecurityGroupName: securityGroupName,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ecsClient.request('DescribeSecurityGroups', params, requestOption)];
                    case 2:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeSecurityGroups response: " + JSON.stringify(rs));
                        securityGroup = rs.SecurityGroups.SecurityGroup;
                        return [2 /*return*/, { total: rs.TotalCount, list: securityGroup }];
                    case 3:
                        ex_3 = _a.sent();
                        throw ex_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.createVSwitch = function (_a) {
        var regionId = _a.regionId, vpcId = _a.vpcId, zoneId = _a.zoneId, vSwitchName = _a.vSwitchName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var params, createRs, ex_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            ZoneId: zoneId,
                            VSwitchName: vSwitchName,
                            Description: description,
                            CidrBlock: cidrBlock || '10.20.0.0/16',
                        };
                        this.logger.debug("createVSwitch params is " + JSON.stringify(params) + ".");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.vpcClient.request('CreateVSwitch', params, requestOption)];
                    case 2:
                        createRs = _b.sent();
                        return [2 /*return*/, createRs.VSwitchId];
                    case 3:
                        ex_4 = _b.sent();
                        throw ex_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.createVpc = function (_a) {
        var regionId = _a.regionId, vpcName = _a.vpcName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var createParams, createRs, ex_5, vpcId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        createParams = {
                            RegionId: regionId,
                            CidrBlock: cidrBlock || '10.0.0.0/8',
                            EnableIpv6: false,
                            VpcName: vpcName,
                            Description: description,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.logger.info("Create vpc start...");
                        return [4 /*yield*/, this.vpcClient.request('CreateVpc', createParams, requestOption)];
                    case 2:
                        createRs = _b.sent();
                        this.logger.debug("create vpc response is: " + JSON.stringify(createRs));
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _b.sent();
                        throw ex_5;
                    case 4:
                        vpcId = createRs.VpcId;
                        return [4 /*yield*/, this.waitVpcUntilAvaliable(regionId, vpcId)];
                    case 5:
                        _b.sent();
                        this.logger.info("Create vpc success, vpcId is: " + vpcId);
                        return [2 /*return*/, vpcId];
                }
            });
        });
    };
    HandlerService.prototype.createSecurityGroup = function (_a) {
        var regionId = _a.regionId, vpcId = _a.vpcId, securityGroupName = _a.securityGroupName, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var params, createRs, id, ex_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            SecurityGroupName: securityGroupName,
                            Description: description,
                            VpcId: vpcId,
                            SecurityGroupType: 'normal',
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.logger.info("Create securityGroup start...");
                        return [4 /*yield*/, this.ecsClient.request('CreateSecurityGroup', params, requestOption)];
                    case 2:
                        createRs = _b.sent();
                        this.logger.debug("Call CreateSecurityGroup response is: " + JSON.stringify(createRs));
                        id = createRs.SecurityGroupId;
                        this.logger.info("Create securityGroup success, vpcId is: " + id);
                        return [2 /*return*/, id];
                    case 3:
                        ex_6 = _b.sent();
                        throw ex_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.waitVpcUntilAvaliable = function (regionId, vpcId) {
        return __awaiter(this, void 0, void 0, function () {
            var count, status, params, rs, vpcs, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        _a.label = 1;
                    case 1:
                        count++;
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                        };
                        return [4 /*yield*/, sleep(800)];
                    case 2:
                        _a.sent();
                        this.logger.debug("Call to DescribeVpcs: " + count + ".");
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 4:
                        rs = _a.sent();
                        vpcs = rs.Vpcs.Vpc;
                        if (vpcs && vpcs.length) {
                            status = vpcs[0].Status;
                            this.logger.info("VPC already created, waiting for status to be 'Available', the status is " + status + " currently");
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        ex_7 = _a.sent();
                        throw ex_7;
                    case 6:
                        if (count < 15 && status !== 'Available') return [3 /*break*/, 1];
                        _a.label = 7;
                    case 7:
                        if (status !== 'Available') {
                            throw new Error("Timeout while waiting for vpc " + vpcId + " status to be 'Available'");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteVpc = function (regionId, vpcId) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("DeleteVpc " + regionId + "/" + vpcId + " start...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, sleep(1000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vpcClient.request('DeleteVpc', {
                                RegionId: regionId,
                                VpcId: vpcId,
                            }, requestOption)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_8 = _a.sent();
                        throw ex_8;
                    case 5:
                        this.logger.info("DeleteVpc " + regionId + "/" + vpcId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteVSwitchId = function (regionId, vSwitchId) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("DeleteVSwitch " + regionId + "/" + vSwitchId + " start...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.vpcClient.request('DeleteVSwitch', {
                                RegionId: regionId,
                                VSwitchId: vSwitchId,
                            }, requestOption)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        throw ex_9;
                    case 4:
                        this.logger.info("DeleteVSwitch " + regionId + "/" + vSwitchId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteSecurityGroupId = function (regionId, securityGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("DeleteSecurityGroup " + regionId + "/" + securityGroupId + " start...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ecsClient.request('DeleteSecurityGroup', {
                                RegionId: regionId,
                                SecurityGroupId: securityGroupId,
                            }, requestOption)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        throw ex_10;
                    case 4:
                        this.logger.info("DeleteSecurityGroup " + regionId + "/" + securityGroupId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], HandlerService.prototype, "logger", void 0);
    return HandlerService;
}());
exports.default = HandlerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFuZGxlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvSGFuZGxlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFFekQsc0RBQWdDO0FBQ2hDLGdFQUFxQztBQUNyQyx3Q0FBc0M7QUFHdEMsSUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBRUYsSUFBTSxLQUFLLEdBQUcsVUFBQyxFQUFVLElBQUssT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztBQThCaEY7SUFLRSx3QkFBWSxXQUF5QjtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsT0FBcUI7UUFDdEUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTtZQUN6QyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUMzRDtRQUVELE9BQU8sSUFBSSxrQkFBRyxDQUFDO1lBQ2IsUUFBUSxFQUFFLFFBQVE7WUFDbEIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsV0FBVyxFQUFFLE9BQU8s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