declare namespace ServerlessDevsReport {
  export interface Vpc {
    region: string;
    vpcId: string;
    vSwitchId: string;
    securityGroupId: string;
  }
  export interface ReportData {
    name: string;
    content: Vpc;
  }
}
