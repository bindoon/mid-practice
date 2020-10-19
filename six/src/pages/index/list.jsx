import React from 'react';
import { Table, Space, Card, Button } from 'antd';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/antd'; // 或者 @formily/next
import { Input } from '@formily/antd-components'; // 或者@formily/next-components
import { service } from './service';

export const ListPage = () => {
  const { form, table } = useFormTableQuery(
    service, // 请求函数
    [], // 中间件
    {
      // 默认配置
      pagination: {
        pageSize: 10,
      },
    }
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (value, record) => (
        <Space size="middle">
          <a href={`./detail.html?id=${record.login.uuid}`}>详情</a>
          <a href={`./edit.html?id=${record.login.uuid}`}>编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-page">
      <Card style={{ marginBottom: 20 }}>
        <SchemaForm {...form} components={{ Input }} inline>
          <Field type="string" name="name" title="Name" x-component="Input" />
          <FormButtonGroup>
            <Submit>查询</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
      <Card
        title="用户管理列表"
        extra={
          <Button type="primary" href="./create.html">
            创建用户
          </Button>
        }
      >
        <Table
          {...table}
          columns={columns}
          rowKey={record => record.login.uuid}
        />
      </Card>
    </div>
  );
};
