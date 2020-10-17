/* eslint-disable array-callback-return */
/* eslint max-len: ["error", { "code": 300 }]*/

import React from 'react';
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


class List extends React.Component {
  constructor(props) {
    super(props);
    const list = initList();
    this.state = {
      tableType: 'normal',
      defaultList: list.slice(0),
      list: list.slice(0),
      nowList: [...list],
      current: 1,
      total: list.length,
      dataSource: [],
      pageSize: 10,
      loading: false,
      drawerVisible: false,
      drawerData: null,
      searchVal: '',
      selectedRowKeys: [],
      batchOpr: false,
    };
    this.field = new Field(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    const { current, pageSize, nowList } = this.state;
    this.setState({ loading: true });
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: nowList.slice((current - 1) * pageSize, current * pageSize),
          total: nowList.length,
        });
      }, randomNum(100, 500));
    });
    this.setState({
      loading: false,
      total: res.total,
      dataSource: res.data,
    });
  }

  getRowSelectionOpt = () => {
    const { selectedRowKeys, batchOpr } = this.state;
    if (!batchOpr) {
      return null;
    }
    return {
      onChange: this.handleTableRowChange,
      onSelect(selected, record, records) {
        console.log('onSelect', selected, record, records);
      },
      onSelectAll(selected, records) {
        console.log('onSelectAll', selected, records);
      },
      selectedRowKeys,
    };
  }

  handleAction = (data, type) => {
    this.setState({
      drawerVisible: true,
      drawerData: data,
      actionType: type,
    });
  }

  handleSearchIptChange = (val) => {
    this.setState({
      searchVal: val,
    });
  }

  handleSearch = async () => {
    const { searchVal, list, total } = this.state;
    if (searchVal === '' && total === list.length) {
      return false;
    }
    this.setState({
      loading: true,
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, randomNum(100, 500));
    });

    if (searchVal === '' && total < list.length) {
      this.setState({
        nowList: list,
      }, () => {
        this.getList();
      });

      return false;
    }
    // eslint-disable-next-line max-len
    const res = list.filter(item => (item.name.indexOf(searchVal) > -1 || (`${item.uId}`).indexOf(searchVal) > -1 || item.phone.indexOf(searchVal) > -1));
    this.setState({
      nowList: res,
    }, () => {
      this.getList();
    });
  }

  delete = async (id) => {
    const { nowList, list } = this.state;
    this.setState({ loading: true });
    await new Promise((resolve) => {
      setTimeout(() => {
        const nowIdx = getDataIdx(nowList, id);
        const idx = getDataIdx(list, id);
        nowList.splice(nowIdx, 1);
        list.splice(idx, 1);
        resolve();
      }, randomNum(100, 500));
    });
    this.setState({
      nowList: [...nowList],
      list: [...list],
    }, () => {
      this.getList();
    });
  }
  deleteConfirm = (item) => {
    Dialog.confirm({
      title: '确认删除',
      content: `是否确认删除联系人------${item.name}`,
      onOk: () => { this.delete(item.id); },
      onCancel: () => console.log('cancel'),
    });
  };

  handleNewSubmit = async (values, errors) => {
    const { list } = this.state;

    if (errors) {
      return;
    }
    this.setState({ loading: true });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, randomNum(100, 500));
    });
    const newData = {
      ...values,
      id: new Date().getTime(),
    };
    const _list = [newData, ...list];
    this.setState({
      nowList: _list,
      list: _list,
    }, () => {
      this.getList();
    });
    this.handleClearNew();
  }

  handleClearNew = () => {
    this.setState({
      newVisible: false,
    });
  }

  handleDrawerSubmit = async (values, errors) => {
    const { drawerData, nowList, list } = this.state;

    if (errors) {
      return;
    }

    this.setState({ loading: true });

    const editData = {
      ...drawerData,
      ...values,
    };

    await new Promise((resolve) => {
      setTimeout(() => {
        const nowIdx = getDataIdx(nowList, editData.id);
        const idx = getDataIdx(list, editData.id);
        nowList.splice(nowIdx, 1, editData);
        list.splice(idx, 1, editData);
        resolve();
      }, randomNum(100, 500));
    });

    this.setState({
      nowList: [...nowList],
      list: [...list],
      drawerVisible: false,
    }, () => {
      this.getList();
    });
  }

  handleReset = () => {
    const { defaultList } = this.state;
    this.setState({
      list: [...defaultList],
      nowList: [...defaultList],
    }, () => {
      this.getList();
    });
  }

  handleMoreCallback = (record, key) => {
    console.log(record);
    console.log(key);
  }
  handleTableRowChange = (ids) => {
    this.setState({
      selectedRowKeys: ids,
    });
  }

  handleTableType = (val) => {
    this.setState({
      tableType: val,
    }, () => {
      this.handleReset();
    });
  }

  handleIptKeyDown = (e) => {
    const { keyCode } = e;
    // Stop bubble up the events of keyUp, keyDown, keyLeft, and keyRight
    if (keyCode > 36 && keyCode < 41) {
      e.stopPropagation();
    }
  }

  handleIptBlur = (record, event) => {
    const { list, nowList, current, pageSize } = this.state;

    const idx = getDataIdx(list, record.id);
    const nowIdx = getDataIdx(nowList, record.id);
    const _value = { ...record, phone: event.target.value };
    nowList.splice(nowIdx, 1, _value);
    list.splice(idx, 1, _value);
    this.setState({
      list: [...list],
      nowList: [...nowList],
      dataSource: [...nowList].slice((current - 1) * pageSize, current * pageSize),
    });
  }

  handleDifDeleteToggle = (record) => {
    const { list, nowList, current, pageSize } = this.state;

    const idx = getDataIdx(list, record.id);
    const nowIdx = getDataIdx(nowList, record.id);
    const _value = { ...record, hidden: !record.hidden };
    nowList.splice(nowIdx, 1, _value);
    list.splice(idx, 1, _value);
    this.setState({
      list: [...list],
      nowList: [...nowList],
      dataSource: [...nowList].slice((current - 1) * pageSize, current * pageSize),
    });
  }

  handlePageChange = (current) => {
    this.setState({
      current,
      loading: true,
    }, () => {
      this.getList();
    });
  }

  renderOper = (value, index, record) => {
    const { tableType } = this.state;
    return tableType === 'edit' ?
      (<div className={'btn-group'}>
        <Button text type="primary" onClick={() => this.handleDifDeleteToggle(record)}>{record.hidden ? '恢复' : '删除'}</Button>
      </div>) :
      (<div className={'btn-group'}>
        <Button text type="primary" onClick={() => this.handleAction(record, 'edit')}>编辑</Button>
        <Button text type="primary" onClick={() => this.handleAction(record, 'detail')}>详情</Button>
        <Button text type="primary" onClick={() => this.deleteConfirm(record, index)}>删除</Button>
        <Dropdown
          trigger={
            <Button text type="primary">
              更多<Icon type="arrow-down" />
            </Button>
          }
        >
          <Menu onItemClick={key => this.handleMoreCallback(record, key)}>
            <Menu.Item key="submitAudit">提交审核</Menu.Item>
            <Menu.Item key="backTo">打回</Menu.Item>
          </Menu>
        </Dropdown>
      </div>);
  }

  renderDrawer = () => {
    const { drawerData, actionType } = this.state;
    if (!drawerData) {
      return null;
    }
    return (<div>
      <Form style={{ width: '60%' }} {...formItemLayout} >
        <FormItem label="姓名：">
          <p>{drawerData.name}</p>
        </FormItem>
        <FormItem label="学号：" required={actionType !== 'detail'}>
          {
            actionType === 'detail' ?
              (<p>{drawerData.uId}</p>) :
              <Input placeholder="请输入学号" name="uId" defaultValue={drawerData.uId} />
          }
        </FormItem>
        <FormItem label="联系方式：" required={actionType !== 'detail'}>
          {
            actionType === 'detail' ?
              (<p>{drawerData.phone}</p>) :
              <Input placeholder="请输入联系方式" name="phone" defaultValue={drawerData.phone} />
          }
        </FormItem>
        {actionType !== 'detail' && <Row style={{ marginTop: 24 }}>
          <Col offset="12" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Form.Submit type="primary" onClick={this.handleDrawerSubmit}>更新</Form.Submit>
            <Button onClick={() => { this.setState({ drawerVisible: false }); }}>取消</Button>
          </Col>
        </Row>}
      </Form>
    </div>);
  }

  renderName = (value, index, record) => (record.hidden ?
    <span
      className={'remove-line'}
    >{value}</span> :
    (<a href={`/demos/detail.html?id=${record.id}`}>
      {value}
    </a>))

  renderBtnGroup = () => {
    const { batchOpr, tableType } = this.state;
    return (<Button.Group>
      <Button warning onClick={() => { window.location.href = '/demos/dev.html'; }}>Go开发页面</Button>
      <Button onClick={() => { this.setState({ newVisible: true }); }}>
        新增一条(弹窗)
      </Button>
      <Button onClick={() => { window.location.href = '/demos/new.html'; }}>新增一条(跳转)</Button>
      {
        tableType === 'edit' ?
          <React.Fragment>
            <Button type="primary" onClick={this.handleReset}>数据重置</Button>
            <Button onClick={() => { Message.notice('table插入一条可编辑的数据'); }}>新增(table内插入一条)</Button>
            <Button onClick={() => { Message.notice('你新增的数据是：xxx，你更新的数据是：xxx，你删除的数据是xxx'); }}>确认数据提交</Button>
          </React.Fragment> :
          <Button onClick={() => { this.setState({ batchOpr: !batchOpr }); }}>{batchOpr ? '取消批量操作' : '批量操作'}</Button>
      }
      {batchOpr &&
        (<React.Fragment>
          <Button onClick={() => { console.log('批量删除'); }}>批量删除</Button>
          <Button onClick={() => { console.log('批量审批'); }}>批量审批</Button>
        </React.Fragment>)}
    </Button.Group>);
  }

  renderExpandedRow = record => `我是${record.name}，我是联系方式是${record.phone}，学号是${record.uId}`

  renderEditCell = (phone, idx, record) => {
    const { tableType } = this.state;
    if (tableType !== 'edit') {
      return phone;
    }

    return !record.hidden ?
      <Input defaultValue={phone} onKeyDown={this.handleIptKeyDown} onBlur={event => this.handleIptBlur(record, event)} /> :
      <span
        className={`${record.hidden ? 'remove-line' : ''}`}
        onDoubleClick={this.handleDblClick}
      >{phone}</span>;
  }

  render() {
    const { tableType,
      current, loading, dataSource,
      pageSize, total, drawerVisible, searchVal,
      newVisible } = this.state;
    return (
      <React.Fragment>
        <div className={'myapp-container'}>
          <div>
            列表类型：<RadioGroup dataSource={tableTypeArr} value={tableType} onChange={this.handleTableType} />
          </div>
          <div className={'header-container'}>
            {this.renderBtnGroup()}
            <Input
              innerAfter={<Icon type="search" size="xs" onClick={this.handleSearch} style={{ margin: 4 }} />}
              placeholder="search"
              value={searchVal}
              aria-label="input with config of innerAfter"
              onChange={this.handleSearchIptChange}
            /></div>
          <Table
            rowSelection={this.getRowSelectionOpt()}
            dataSource={dataSource}
            loading={loading}
            className={'table-dom'}
            primaryKey={'id'}
            expandedRowRender={tableType === 'tree' ? this.renderExpandedRow : null}
          >
            <Table.Column title="学号" dataIndex="uId" />
            <Table.Column title="姓名" dataIndex="name" cell={this.renderName} />
            <Table.Column
              title={`联系方式${tableType === 'edit' ? '(可编辑列)' : ''}`}
              cell={this.renderEditCell}
              dataIndex="phone"
            />
            <Table.Column cell={this.renderOper} width={200} resizable />
          </Table>
          <div className={'footer-container'}>
            <div style={{ marginRight: 10 }}>{`共  ${total}  条`}</div>
            <Pagination current={current} onChange={this.handlePageChange} pageSize={pageSize} total={total} />
          </div>
        </div>
        { drawerVisible && <Drawer
          title="学员信息"
          visible={drawerVisible}
          placement={'right'}
          width={600}
          onClose={() => { this.setState({ drawerVisible: false }); }}
        >
          {this.renderDrawer()}
        </Drawer>}
        {newVisible && <Dialog
          title="新增学员"
          visible={newVisible}
          footer={false}
          onClose={() => { this.setState({ newVisible: false }); }}
          isFullScreen
        >
          <Form style={{ width: 500, height: 300 }} field={this.field} fullWidth>
            <FormItem label="姓名：" required>
              <Input placeholder="请输入姓名" name="name" />
            </FormItem>
            <FormItem label="学号：" required>
              <Input placeholder="请输入学号" name="uId" />
            </FormItem>
            <FormItem label="联系方式：" required>
              <Input placeholder="请输入联系方式" name="phone" />
            </FormItem>
            <Row style={{ marginTop: 24 }}>
              <Col offset="18" className="btn-group">
                <Form.Submit type="primary" onClick={this.handleNewSubmit} validate>新建</Form.Submit>
                <Button style={{ marginLeft: 5 }} onClick={this.handleClearNew}>取消</Button>
              </Col>
            </Row>
          </Form>
        </Dialog>}
      </React.Fragment>
    );
  }
}

export default List;
