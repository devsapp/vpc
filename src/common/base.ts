export default class BaseComponent {
  protected __report(reportData: ServerlessDevsReport.ReportData) {
    if (process && process.send) {
      const { name, content, access } = reportData;
      process.send({
        action: 'resource',
        access,
        data: {
          name,
          content: JSON.stringify(content),
        },
      });
      return content;
    }
  }
}
