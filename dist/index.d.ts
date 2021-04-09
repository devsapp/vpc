import { ILogger } from '@serverless-devs/core';
import { ICredentials, IProperties } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    getCredentials(credentials: {} | ICredentials, provider: string, accessAlias?: string): Promise<ICredentials>;
    checkPropertiesAndGenerateResourcesName(properties: IProperties): IProperties;
    create(inputs: any): Promise<import("./interface").IVpcConfig>;
    delete(inputs: any): Promise<void>;
}
