import { HLogger, ILogger, getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import _ from 'lodash';
import { CONTEXT, HELP, CONTEXT_NAME } from './constant';
import { IInputs, IProperties, IDeleteProperties, isDeleteProperties } from './interface';
import Base from './common/base';
import StdoutFormattter from './common/stdout-formatter';
import HandlerService from './utils/handlerService';

export default class SlsCompoent extends Base {
  @HLogger(CONTEXT) logger: ILogger;

  async create(inputs: IInputs) {
    this.logger.debug('Create vpc start...');
    this.logger.debug(`[inputs params: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await this.initStdout();

    const credential = inputs.credentials || await getCredential(inputs.project.access);

    reportComponent(CONTEXT_NAME, {
      uid: credential.AccountID,
      command: 'create',
    });

    const properties = this.checkPropertiesAndGenerateResourcesName(_.cloneDeep(inputs.props));
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);
    const client = new HandlerService(credential);
    const vpcConfig = await client.create(properties);

    this.logger.debug(`Create vpc success, config is: ${JSON.stringify(vpcConfig)}.`);
    super.__report({
      name: 'vpc',
      access: inputs.project?.access,
      content: { region: properties.regionId, ...vpcConfig },
    });
    return vpcConfig;
  }

  async delete(inputs) {
    this.logger.debug('Delete vpc start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await this.initStdout();

    const credential = inputs.credentials || await getCredential(inputs.project?.access);
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
    super.__report({
      name: 'vpc',
      access: inputs.project?.access,
      content: { region: properties.regionId, vpcId: '', vSwitchId: '', securityGroupId: '' },
    });
    this.logger.debug('Delete vpc success.');
  }

  private checkPropertiesAndGenerateResourcesName(properties: IProperties): IProperties {
    if (!properties.regionId) {
      throw new Error('RegionId not fount.');
    }
    if (!properties.zoneId) {
      throw new Error('ZoneId not fount.');
    }

    const name = `${CONTEXT}-generate-resources`;
    if (!properties.vpcName) {
      properties.vpcName = name;
      this.logger.info(StdoutFormattter.stdoutFormatter.using('vpc name', name));
    }

    if (!properties.vSwitchName) {
      properties.vSwitchName = name;
      this.logger.info(StdoutFormattter.stdoutFormatter.using('vswitch name', name));
    }

    if (!properties.securityGroupName) {
      properties.securityGroupName = name;
      this.logger.info(StdoutFormattter.stdoutFormatter.using('securityGroup name', name));
    }

    return properties;
  }

  private async initStdout() {
    await StdoutFormattter.initStdout();
  }
}
