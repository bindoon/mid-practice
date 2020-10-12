/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Pagination, Button, Dialog, Drawer, Form, Input, Icon, Grid, Field } from '@alifd/next';
import { surnameArr, nameArr, phoneHeaderArr } from './data/name';
import { randomNum, getDataIdx } from './utils';
import './index.scss';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const initList = () => {
  const result = [];
  for (let i = 0; i < 2021; i++) {
    result.push({
      id: 100200300400 + i,
      uId: 100200300400 + i,
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

  handlePageChange = (current) => {
    this.setState({
      current,
      loading: true,
    }, () => {
      this.getList();
    });
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

  renderOper = (value, index, record) => (<div className={'btn-group'}>
    <Button type="secondary" onClick={() => this.handleAction(record, 'edit')}>编辑</Button>
    <Button onClick={() => this.handleAction(record, 'detail')}>详情</Button>
    <Button type="normal" warning onClick={() => this.deleteConfirm(record, index)}>删除</Button>
  </div>)

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

  renderName = (value, index, record) => (<a href={`/demos/detail.html?id=${record.id}`}>
    {value}
  </a>)

  render() {
    const { current, loading, dataSource, pageSize, total, drawerVisible, searchVal, newVisible } = this.state;
    return (
      <React.Fragment>
        <div className={'myapp-container'}>
          <div className={'header-container'}>
            <div>
              <Button onClick={() => { this.setState({ newVisible: true }); }} style={{ marginRight: 10 }}>
                新增一条(弹窗)
              </Button>
              <Button onClick={() => { window.location.href = '/demos/new.html'; }}>新增一条(跳转)</Button>
            </div>
            <Input
              innerAfter={<Icon type="search" size="xs" onClick={this.handleSearch} style={{ margin: 4 }} />}
              placeholder="search"
              value={searchVal}
              aria-label="input with config of innerAfter"
              onChange={this.handleSearchIptChange}
            /></div>
          <Table
            dataSource={dataSource}
            loading={loading}
            className={'table-dom'}
            primaryKey={'id'}
          >
            <Table.Column title="学号" dataIndex="uId" />
            <Table.Column title="姓名" dataIndex="name" cell={this.renderName} />
            <Table.Column title="联系方式" dataIndex="phone" />
            <Table.Column cell={this.renderOper} width="20%" />
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
        >
          <Form style={{ width: 600 }} {...formItemLayout} field={this.field} fullWidth>
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
              <Col offset="18">
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
