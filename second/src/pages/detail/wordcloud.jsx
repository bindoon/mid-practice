/* eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/
/* eslint no-bitwise: ["error", { "allow": ["~"] }] */

import React from 'react';
import _ from 'lodash';
import {
  Chart,
  Geom,
  Tooltip,
  Coordinate,
  Legend,
  Axis,
  Interaction,
  G2,
  registerShape,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { randomNum } from '../list/utils';

// 给point注册一个词云的shape

function getTextAttrs(cfg) {
  return _.assign(
    {},
    cfg.style,
    {
      fontSize: cfg.data.size,
      text: cfg.data.text,
      textAlign: 'center',
      fontFamily: cfg.data.font,
      fill: cfg.color,
      textBaseline: 'Alphabetic',
    }
  );
}
registerShape('point', 'cloud', {
  draw(cfg, container) {
    const attrs = getTextAttrs(cfg);
    const textShape = container.addShape('text', {
      attrs: _.assign(attrs, {
        x: cfg.x,
        y: cfg.y,
      }),
    });
    if (cfg.data.rotate) {
      G2.Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
    }
    return textShape;
  },
});
const data = [
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
  {
    x: '开朗',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '乐观',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '积极',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '喜爱自然',
    value: randomNum(10000000, 9999999999),
    category: randomNum(10000000, 9999999999),
  },
  {
    x: '充实',
    value: 1383220000,
    category: '',
  },
];


class Wordcloud extends React.Component {
  render() {
    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [600, 500],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return (((d.value - min) / (max - min)) * (40 - 12) + 12);
        }
        return 0;
      },
    });
    const scale = {
      x: {
        nice: false,
      },
      y: {
        nice: false,
      },
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', height: 500 }}>
        <Chart
          autoFit
          data={dv.rows}
          scale={scale}
          padding={0}
        >
          <Tooltip showTitle={false} visible={false} />
          <Coordinate reflect="y" />
          <Axis name="x" visible={false} />
          <Axis name="y" visible={false} />
          <Legend visible={false} />
          <Geom
            type="point"
            position="x*y"
            color="category"
            shape="cloud"
          />
          <Interaction type="element-active" />
        </Chart>
      </div>
    );
  }
}

export default Wordcloud;

