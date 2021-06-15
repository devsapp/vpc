import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    private checkPropertiesAndGenerateResourcesName;
    private initStdout;
    create(inputs: IInputs): Promise<import("./interface").IVpcConfig>;
    delete(inputs: any): Promise<void>;
}
