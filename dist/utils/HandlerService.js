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
var stdout_formatter_1 = __importDefault(require("../common/stdout-formatter"));
var constant_1 = require("../constant");
var requestOption = {
    method: 'POST',
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var HandlerService = /** @class */ (function () {
    function HandlerService(credentials) {
        this.stdoutFormatter = stdout_formatter_1.default.stdoutFormatter;
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
                        this.logger.debug(this.stdoutFormatter.using('vswitchId', vSwitchId));
                        return [4 /*yield*/, this.mackSecurityGroup({
                                regionId: regionId,
                                vpcId: vpcId,
                                securityGroupName: securityGroupName,
                                description: securityGroupDescription,
                            })];
                    case 3:
                        securityGroupId = _a.sent();
                        this.logger.debug(this.stdoutFormatter.using('securityGroupId', securityGroupId));
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
                        this.logger.debug("VSwitchId is " + vSwitchId + ".");
                        return [4 /*yield*/, this.mackSecurityGroup({
                                regionId: regionId,
                                vpcId: vpcId,
                                securityGroupName: securityGroupName,
                                onlyGet: true,
                            })];
                    case 3:
                        securityGroupId = _a.sent();
                        this.logger.debug("SecurityGroupId is " + securityGroupId + ".");
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
                        this.logger.debug(this.stdoutFormatter.using('vpcId', vpcId));
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
                        this.logger.debug('Vpc not found.');
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
                        this.logger.debug('There is only one vSwitch, directly reuse the current vSwitch.');
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
                        this.logger.debug('VSwitch not found.');
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
                        this.logger.debug('There is only one securityGroup, directly reuse the current securityGroups.');
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
                        this.logger.debug('SecurityGroup not found.');
                        return [4 /*yield*/, this.createSecurityGroup(inputs)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    HandlerService.prototype.findVpcs = function (regionId, vpcName) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, requestPageNumber, totalCount, pageNumber, vpcs, params, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = 2;
                        requestPageNumber = 0;
                        vpcs = [];
                        this.logger.info(this.stdoutFormatter.get('vpc', vpcName));
                        _a.label = 1;
                    case 1:
                        params = {
                            RegionId: regionId,
                            PageSize: pageSize,
                            VpcName: vpcName,
                            PageNumber: ++requestPageNumber,
                        };
                        this.logger.debug("find vpc PageNumber: " + params.PageNumber);
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 2:
                        rs = _a.sent();
                        this.logger.debug("find vpc rs: " + JSON.stringify(rs));
                        totalCount = rs.TotalCount;
                        pageNumber = rs.PageNumber;
                        vpcs = vpcs.concat(rs.Vpcs.Vpc);
                        _a.label = 3;
                    case 3:
                        if (totalCount && pageNumber && pageNumber * pageSize < totalCount) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this.logger.debug("find vpcs end, findVpcs vpcs response: " + JSON.stringify(vpcs));
                        return [2 /*return*/, { total: totalCount, list: vpcs }];
                }
            });
        });
    };
    HandlerService.prototype.findVSwitches = function (regionId, vpcId, vSwitchName, zoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs;
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
                        this.logger.info(this.stdoutFormatter.get('vswitch', vSwitchName));
                        return [4 /*yield*/, this.vpcClient.request('DescribeVSwitches', params, requestOption)];
                    case 1:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeVSwitches response: " + JSON.stringify(rs));
                        return [2 /*return*/, { total: rs.TotalCount, list: rs.VSwitches.VSwitch }];
                }
            });
        });
    };
    HandlerService.prototype.findSecurityGroups = function (regionId, vpcId, securityGroupName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs, securityGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            SecurityGroupName: securityGroupName,
                        };
                        this.logger.info(this.stdoutFormatter.get('securityGroup', securityGroupName));
                        return [4 /*yield*/, this.ecsClient.request('DescribeSecurityGroups', params, requestOption)];
                    case 1:
                        rs = _a.sent();
                        this.logger.debug("Call DescribeSecurityGroups response: " + JSON.stringify(rs));
                        securityGroup = rs.SecurityGroups.SecurityGroup;
                        return [2 /*return*/, { total: rs.TotalCount, list: securityGroup }];
                }
            });
        });
    };
    HandlerService.prototype.createVSwitch = function (_a) {
        var regionId = _a.regionId, vpcId = _a.vpcId, zoneId = _a.zoneId, vSwitchName = _a.vSwitchName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var params, createRs;
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
                        this.logger.info(this.stdoutFormatter.create('vswitch', vSwitchName));
                        return [4 /*yield*/, this.vpcClient.request('CreateVSwitch', params, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        return [2 /*return*/, createRs.VSwitchId];
                }
            });
        });
    };
    HandlerService.prototype.createVpc = function (_a) {
        var regionId = _a.regionId, vpcName = _a.vpcName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var createParams, createRs, vpcId;
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
                        this.logger.info(this.stdoutFormatter.create('vpc', vpcName));
                        return [4 /*yield*/, this.vpcClient.request('CreateVpc', createParams, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        this.logger.debug("create vpc response is: " + JSON.stringify(createRs));
                        vpcId = createRs.VpcId;
                        return [4 /*yield*/, this.waitVpcUntilAvaliable(regionId, vpcId)];
                    case 2:
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
            var params, createRs, id;
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
                        this.logger.info(this.stdoutFormatter.create('securityGroup', securityGroupName));
                        return [4 /*yield*/, this.ecsClient.request('CreateSecurityGroup', params, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        this.logger.debug("Call CreateSecurityGroup response is: " + JSON.stringify(createRs));
                        id = createRs.SecurityGroupId;
                        this.logger.info("Create securityGroup success, vpcId is: " + id);
                        return [2 /*return*/, id];
                }
            });
        });
    };
    HandlerService.prototype.waitVpcUntilAvaliable = function (regionId, vpcId) {
        return __awaiter(this, void 0, void 0, function () {
            var count, status, params, rs, vpcs;
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
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 3:
                        rs = _a.sent();
                        vpcs = rs.Vpcs.Vpc;
                        if (vpcs && vpcs.length) {
                            status = vpcs[0].Status;
                            this.logger.info("VPC already created, waiting for status to be 'Available', the status is " + status + " currently");
                        }
                        _a.label = 4;
                    case 4:
                        if (count < 15 && status !== 'Available') return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.remove('vpc', vpcId));
                        return [4 /*yield*/, sleep(1000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.vpcClient.request('DeleteVpc', {
                                RegionId: regionId,
                                VpcId: vpcId,
                            }, requestOption)];
                    case 2:
                        _a.sent();
                        this.logger.debug("DeleteVpc " + regionId + "/" + vpcId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteVSwitchId = function (regionId, vSwitchId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.remove('vswitch', vSwitchId));
                        return [4 /*yield*/, this.vpcClient.request('DeleteVSwitch', {
                                RegionId: regionId,
                                VSwitchId: vSwitchId,
                            }, requestOption)];
                    case 1:
                        _a.sent();
                        this.logger.debug("DeleteVSwitch " + regionId + "/" + vSwitchId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteSecurityGroupId = function (regionId, securityGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.remove('securityGroup', securityGroupId));
                        return [4 /*yield*/, this.ecsClient.request('DeleteSecurityGroup', {
                                RegionId: regionId,
                                SecurityGroupId: securityGroupId,
                            }, requestOption)];
                    case 1:
                        _a.sent();
                        this.logger.debug("DeleteSecurityGroup " + regionId + "/" + securityGroupId + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], HandlerService.prototype, "logger", void 0);
    return HandlerService;
}());
exports.default = HandlerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFuZGxlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvSGFuZGxlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFDekQsc0RBQWdDO0FBQ2hDLGdFQUFxQztBQUNyQyxnRkFBMEQ7QUFDMUQsd0NBQXNDO0FBR3RDLElBQU0sYUFBYSxHQUFHO0lBQ3BCLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUM7QUE4QmhGO0lBTUUsd0JBQVksV0FBeUI7UUFGckMsb0JBQWUsR0FBRywwQkFBZ0IsQ0FBQyxlQUFlLENBQUM7UUFHakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUEwQixFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLE9BQXFCO1FBQ3RFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUU7WUFDekMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDM0Q7UUFFRCxPQUFPLElBQUksa0JBQUcsQ0FBQztZQUNiLFFBQVEs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