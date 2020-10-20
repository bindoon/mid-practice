export default class RenderEngine {
  schema = null;

  // schema 为页面描述，components 为需要用到的组件
  constructor(schema, components) {
    this.schema = schema;
    this.components = components;
  }

  createApp() {

  }
}