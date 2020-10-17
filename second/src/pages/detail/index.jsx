'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Form, Typography,
  Avatar, Tab, MenuButton, Button,
  Card, Step, Table, Divider, Loading,
} from '@alifd/next';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
} from 'bizcharts';
import qs from 'qs';
import Wouldcloud from './wordcloud';
import Tools from '../../utils';
import request from '../../api/request';
import ajax from '../../api/ajax';
import './index.scss';

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const renderTab = () => (
    <Tab navClassName={'TabBar'} onChange={() => { }}>
      <Tab.Item title={<span className={'TabItemTitle'}>操作日志一</span>} key="1" className={'TabItem'} />
      <Tab.Item title={<span className={'TabItemTitle'}>操作日志二</span>} key="2" className={'TabItem'} />
      <Tab.Item title={<span className={'TabItemTitle'}>操作日志三</span>} key="3" />
    </Tab>
  );

  const getDetail = async () => {
    setLoading(true);
    const id = Tools.getUrlParam('id');

    const aj = await ajax({
      url: `/data/detail.json?${qs.stringify({ id })}`, // 请求地址
      method: 'GET', // 请求方式
    });
    console.log('ajax', aj);

    await fetch(`/data/detail.json?${qs.stringify({ id })}`,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json', // 通过头指定，获取的数据类型是JSON
        }),
      }
    ).then((response) => {
      console.log('response', response);
      return response.json();
    }).then((re) => {
      console.log('result', re);
    });
    const re = await request('/data/detail.json', { id });
    console.log(re);
    setLoading(false);
    if (re.code === 200) {
      setDataSource(re.data);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (<React.Fragment>
    <Loading tip="加载中..." visible={loading} fullScreen>
      {
        dataSource ? (
          <div className={'myContainer'}>
            <Card free className={'AdvancedDetailHead'}>
              <Box spacing={10}>
                <Box direction="row" spacing={10}>
                  <Avatar size="large" src={dataSource.person.avatar} />
                  <Box flex={1} spacing={15}>
                    <Box direction="row" justify="space-between">
                      <Box>
                        <Typography.Text className={'TitleName'}>
                          {dataSource.person.surname}{dataSource.person.name}
                        </Typography.Text>
                        <Typography.Text className={'TitleInfo'}>
                          {dataSource.person.phone} | {dataSource.person.email}
                        </Typography.Text>
                      </Box>
                      <Box spacing={8} direction="row" className="oprGroup">
                        <Button type="primary" className={'button'}>
                          主操作
                        </Button>
                        <MenuButton label="更多" className={'button'}>
                          <MenuButton.Item key="1">添加钉钉</MenuButton.Item>
                          <MenuButton.Item key="2">手机联系</MenuButton.Item>
                        </MenuButton>
                        <a href={'/demos/list.html'}>返回列表页</a>
                      </Box>
                    </Box>
                    <Form labelAlign="top" responsive>
                      <Form.Item colSpan={4} label="现在所在地">
                        <span className="next-form-preview">{dataSource.person.region}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="年级">
                        <span className="next-form-preview">{dataSource.person.workTime}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="高等教育">
                        <span className="next-form-preview">{dataSource.person.education}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="职级">
                        <span className="next-form-preview">{dataSource.person.position}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="学院" >
                        <span className="next-form-preview">{dataSource.person.college}</span>
                      </Form.Item>
                    </Form>
                  </Box>
                </Box>
                <Tab navClassName={'TabBar'} onChange={() => { }}>
                  <Tab.Item title={<span className={'TabItemTitle'}>选项卡一</span>} key="1" className={'TabItem'} />
                  <Tab.Item title={<span className={'TabItemTitle'}>选项卡二</span>} key="2" className={'TabItem'} />
                  <Tab.Item title={<span className={'TabItemTitle'}>选项卡三</span>} key="3" />
                </Tab>
              </Box>
            </Card>
            <Box spacing={20} style={{ marginTop: 20 }}>
              <Card contentHeight="auto">
                <Step shape="dot" current={1} className={'Step'}>
                  <Step.Item
                    title="申请"
                    content={<div>
                      <span>{dataSource.person.surname}{dataSource.person.name}</span>
                      <span>{dataSource.person.email}</span>
                    </div>}
                  />
                  <Step.Item title="审批" content={<a className={'a'}>张三</a>} />
                  <Step.Item title="接受" />
                  <Step.Item title="发送" />
                  <Step.Item title="接受" />
                  <Step.Item title="入职" />
                  <Step.Item title="完成" />
                </Step>
              </Card>
              <Card free>
                <Card.Header title="基础信息" />
                <Card.Divider />
                <Card.Content>
                  <div className={'Content'}>
                    <Form labelAlign="top" responsive>
                      <Form.Item colSpan={4} label="姓氏" required>
                        <span className="next-form-preview">{dataSource.person.surname}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="名字" required>
                        <span className="next-form-preview">{dataSource.person.name}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="国家/地区" required>
                        <span className="next-form-preview">{dataSource.person.region}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="电话号码" required>
                        <span className="next-form-preview">{dataSource.person.phone}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="邮箱" required>
                        <span className="next-form-preview">{dataSource.person.email}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="现居地址" required>
                        <span className="next-form-preview">{dataSource.person.address}</span>
                      </Form.Item>
                    </Form>
                  </div>
                </Card.Content>
              </Card>
              <Card free showHeadDivider={false}>
                <Card.Header title="学习成绩" />
                <Card.Divider />
                <Card.Content>
                  <Box>
                    <Form labelAlign="top" responsive>
                      <Form.Item colSpan={4} label="绩点" required>
                        <span className="next-form-preview">{dataSource.achievement.gPoint}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="奖学金" required>
                        <span className="next-form-preview">{dataSource.achievement.scholarship}</span>
                      </Form.Item>
                      <Form.Item colSpan={4} label="获奖比赛" required>
                        <span className="next-form-preview">{dataSource.achievement.match}</span>
                      </Form.Item>
                    </Form>
                  </Box>
                  <Divider dashed />
                </Card.Content>
              </Card>
              <Card free showHeadDivider={false}>
                <Card.Header title="技能介绍" />
                <Card.Divider />
                <Chart height={400} data={dataSource.dataLabelLine} autoFit>
                  <Coordinate type="polar" innerRadius={0.2} />
                  <Axis visible={false} />
                  <Tooltip showTitle={false} />
                  <Interval
                    position="name*population"
                    adjust="stack"
                    color="name"
                    element-highlight
                    style={{
                      lineWidth: 1,
                      stroke: '#fff',
                    }}
                    label={['name', {
                      offset: -15,
                    }]}
                  />
                </Chart>
              </Card>
              <Card free showHeadDivider={false}>
                <Card.Header title="自我评价" />
                <Card.Divider />
                <Wouldcloud />
              </Card>
              <Card free showHeadDivider={false}>
                <Card.Header title="实习经历" />
                <Card.Divider />
                {dataSource.preJobs.map(preJob => (
                  <Card.Content key={preJob.id}>
                    <Box>
                      <Typography.Text className={'SubTitle'}>{`${preJob.company}${preJob.time}`}</Typography.Text>
                      <Form labelAlign="top" responsive>
                        <Form.Item colSpan={4} label="工作部门" required>
                          <span className="next-form-preview">{preJob.bu}</span>
                        </Form.Item>
                        <Form.Item colSpan={4} label="职位" required>
                          <span className="next-form-preview">{preJob.position}</span>
                        </Form.Item>
                        <Form.Item colSpan={4} label="国家/地区" required>
                          <span className="next-form-preview">{preJob.address}</span>
                        </Form.Item>
                        <Form.Item colSpan={12} label="项目描述" required>
                          <span className="next-form-preview">{preJob.description}</span>
                        </Form.Item>
                      </Form>
                    </Box>
                    <Divider dashed />
                  </Card.Content>
                ))}
              </Card>
              <Card free>
                <Card.Header title={renderTab()} className={'TableCardHeader'} />
                <Card.Divider />
                <Card.Content>
                  <div className={'Content'}>
                    <Table dataSource={dataSource.logs} hasBorder={false} className={'Table'}>
                      <Table.Column title="操作进程" dataIndex="opStatus" />
                      <Table.Column title="操作人" dataIndex="operator" />
                      <Table.Column title="执行结果" dataIndex="opResult" />
                      <Table.Column title="操作时间" dataIndex="opTime" />
                    </Table>
                  </div>
                </Card.Content>
              </Card>
            </Box>

          </div>
        ) : null
      }
    </Loading>
  </React.Fragment>);
};

ReactDOM.render(<Detail />, document.getElementById('container'));
