import { ILogger } from '@serverless-devs/core';
import { IInputs, IProperties } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    checkPropertiesAndGenerateResourcesName(properties: IProperties): IProperties;
    create(inputs: IInputs): Promise<import("./interface").IVpcConfig>;
    delete(inputs: any): Promise<void>;
}
