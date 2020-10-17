/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Pagination, Button, Dialog, Drawer, Form, Input, Icon, Grid, Field, Menu, Dropdown, Radio, Message } from '@alifd/next';
import { surnameArr, nameArr, phoneHeaderArr } from './data/name';
import { randomNum, getDataIdx } from './utils';
import './index.scss';


const FormItem = Form.Item;
const { Row, Col } = Grid;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const tableTypeArr = [
  {
    value: 'normal',
    label: '通用',
  }, {
    value: 'edit',
    label: '可编辑',
  }, {
    value: 'tree',
    label: '可展开',
  },
];

const initList = () => {
  const result = [];
  for (let i = 0; i < 2021; i++) {
    result.push({
      id: 100200300400 + i,
      uId: 100200300400 + i,
      hidden: false,
      name: `${surnameArr[i % 598]}${nameArr[i % 10]}`,
      address: '',
      phone: `${phoneHeaderArr[i % 5]}${(`${randomNum(10000000, 99999999)}`).slice(0, 8)}`,
    });
  }
  return result;
};


class Dev extends React.Component {
  render() {
    return (
      <div className="help-page">
        <div className="tip-text">
          <span>devdev</span>
        </div>
      </div>);
  }
}

ReactDOM.render(<Dev />, document.getElementById('container'));

