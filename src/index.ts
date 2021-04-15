import { HLogger, ILogger, getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import _ from 'lodash';
import { CONTEXT, HELP, CONTEXT_NAME } from './constant';
import { IInputs, IProperties, IDeleteProperties, isDeleteProperties } from './interface';
import HandlerService from './utils/HandlerService';

export default class SlsCompoent {
  @HLogger(CONTEXT) logger: ILogger;

  checkPropertiesAndGenerateResourcesName(properties: IProperties): IProperties {
    if (!properties.regionId) {
      throw new Error('RegionId not fount.');
    }
    if (!properties.zoneId) {
      throw new Error('ZoneId not fount.');
    }

    const name = `${CONTEXT}-generate-resources`;
    if (!properties.vpcName) {
      properties.vpcName = name;
      this.logger.info(`Vpc name not fount, generate name is: ${name}.`);
    }

    if (!properties.vSwitchName) {
      properties.vSwitchName = name;
      this.logger.info(`VSwitch name not fount, generate name is: ${name}.`);
    }

    if (!properties.securityGroupName) {
      properties.securityGroupName = name;
      this.logger.info(`SecurityGroup name not fount, generate name is: ${name}.`);
    }

    return properties;
  }

  async create(inputs: IInputs) {
    this.logger.debug('Create vpc start...');
    this.logger.debug(`[inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }

    const credential = await getCredential(inputs.project.access);
    reportComponent(CONTEXT_NAME, {
      uid: credential.AccountID,
      command: 'create',
    });

    const properties = this.checkPropertiesAndGenerateResourcesName(_.cloneDeep(inputs.props));
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);
    const client = new HandlerService(credential);
    const vpcConfig = await client.create(properties);

    this.logger.debug(`Create vpc success, config is: ${JSON.stringify(vpcConfig)}.`);
    return vpcConfig;
  }

  async delete(inputs) {
    this.logger.debug('Delete vpc start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }

    const credential = await getCredential(inputs.project.access);
    reportComponent(CONTEXT_NAME, {
      uid: credential.AccountID,
      command: 'delete',
    });

    let properties: IDeleteProperties;

    const client = new HandlerService(credential);

    if (isDeleteProperties(inputs.Properties)) {
      properties = inputs.Properties;
    } else {
      const pro = this.checkPropertiesAndGenerateResourcesName(_.cloneDeep(inputs.props));
      properties = await client.getVpcConfigs(pro);
    }
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    await client.delete(properties);

    this.logger.debug('Delete vpc success.');
  }
}
