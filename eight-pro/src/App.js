import { Button } from 'antd';
import schema from './schema';
import RenderEngine from './render-engine';
import './App.css';

const components = { Button };
// 渲染引擎的输入为页面描述 schema 和组件依赖的映射 components
const re = new RenderEngine(schema, components);
const App = re.createApp();

export default App;
