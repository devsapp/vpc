import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
import Base from './common/base';
export default class SlsCompoent extends Base {
    logger: ILogger;
    create(inputs: IInputs): Promise<import("./interface").IVpcConfig>;
    delete(inputs: any): Promise<void>;
    private checkPropertiesAndGenerateResourcesName;
    private initStdout;
}
