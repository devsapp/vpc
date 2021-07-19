declare namespace ServerlessDevsReport {
  export interface Domain {
    domain: string;
    weight?: number;
  }

  export interface Fc {
    region: string;
    service: string;
    function: string;
  }

  export interface Oss {
    region: string;
    bucket: string;
  }

  export interface Ram {
    role: string;
  }

  export interface Sls {
    region: string;
    name: string;
  }

  export interface ApiGw {
    region: string;
    instance: string;
  }
  export interface CDN {
    region: string;
    domain: string;
  }

  export interface Vpc {
    region: string;
    vpcId: string;
    vSwitchId: string;
    securityGroupId: string;
  }
  export interface Fnf {
    region: string;
    name: string;
  }
  export interface Cr { // 容器镜像
    region: string;
    image: string;
  }
  export interface Sae {
    region: string;
    namespace: string;
    appid: string;
  }
  export interface ReportData {
    name: string;
    content: Domain | Fc | Oss | Ram | Sls | ApiGw | CDN | Vpc | Fnf | Cr | Sae;
  }
}
