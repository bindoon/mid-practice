import React from 'react';
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
import { Table, Button, Space } from 'antd';
import 'antd/dist/antd.css';

export const ListPage = () => {
  const { form, table } = useFormTableQuery(service, [], {
    pagination: {
      pageSize: 10,
    },
  });

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
      render: () => (
        <Space size="middle">
          <a href="./detail">详情</a>
          <a href="./edit">编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-page">
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </div>
  );
};
