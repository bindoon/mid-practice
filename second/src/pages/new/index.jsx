import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Radio,
  Field,
  Step,
  Button,
  Box,
  Typography,
  Select,
  Message,
  DatePicker,
} from '@alifd/next';
import moment from 'moment';

import './index.scss';


const DEFAULT_DATA = {
  name: '',
  phone: '',
  category: 'football',
  time: '',
  authority: '',
  file: null,
  desc: '',
};

const StepForm = () => {
  const projectField = Field.useField({ values: DEFAULT_DATA });
  const [currentStep, setStep] = useState(0);

  const steps = ['填写信息', '确认信息', '完成'].map((item, index) =>
    <Step.Item aria-current={index === currentStep ? 'step' : null} key={item} title={item} />,
  );

  const toLastStep = () => {
    const values = projectField.getValues();
    console.log('values:', values);
    setStep(currentStep + 1);
  };

  const goNext = async () => {
    const { errors } = await projectField.validatePromise();

    if (errors) {
      console.log('errors', errors);
      return;
    }
    setStep(currentStep + 1);
  };

  const goPrev = () => {
    setStep(currentStep - 1);
  };

  const goInitial = () => {
    setStep(0);
  };

  const handleValidator = (item, val) => {
    console.log(item);
    console.log(val);
  };

  let actions;
  let mainbody;
  switch (currentStep) {
    case 0:
      actions = (<React.Fragment>
        <Button type="primary" onClick={goNext} style={{ marginRight: '5px' }}>下一步</Button>
        <Button onClick={() => {
          Message.notice(JSON.stringify(projectField.getValues(), null, 2));
        }}
        >弹出数据</Button>
      </React.Fragment>);
      break;
    case 1:
      actions = (<React.Fragment>
        <Button onClick={goPrev} style={{ marginRight: '5px' }}>上一步</Button>
        <Button onClick={toLastStep}>下一步</Button>
      </React.Fragment>);
      break;
    case 2:
      mainbody = (<React.Fragment>
        <Box align="center">
          <Icon type="success-filling" size={72} className={'succesIcon'} />
          <Typography.H1>提交成功</Typography.H1>
          <Typography.Text>5s 后自动跳转至工单页</Typography.Text>
          <Box margin={20} direction="row">
            <Button type="primary" style={{ marginRight: '5px' }} onClick={goInitial}>返回主页</Button>
            <Button onClick={goInitial}>继续创建</Button>
          </Box>
        </Box>
      </React.Fragment>);
      break;
    default:
      break;
  }

  if (!mainbody) {
    mainbody = (<React.Fragment>
      <Form field={projectField} isPreview={currentStep === 1} className={'form'} responsive fullWidth labelAlign="top">
        <Form.Item
          colSpan={12}
          label="项目名称"
          required
          requiredMessage="必填必填必填必填"
          validator={handleValidator}
        >
          <Input placeholder="给项目起个名字" name="name" />
        </Form.Item>

        <Form.Item
          colSpan={12}
          label="联系方式"
          required
          autoValidate
          pattern={/^1(5)\d{9}$/}
          patternMessage="正则diy提示，手机号，只要15开头"
        >
          <Input placeholder="请输入你的联系方式" name="phone" />
        </Form.Item>

        <Form.Item colSpan={12} label="项目分类" required >
          <Select name="category" aria-labelledby="category of project">
            <Select.Option id="step1" value="basketball">篮球</Select.Option>
            <Select.Option id="step2" value="football">足球</Select.Option>
            <Select.Option id="step3" value="esports">电竞联动</Select.Option>
          </Select>
        </Form.Item>
        {
          projectField.getValue('category') === 'esports' && <Button style={{ width: 200 }}>这是一个联动后出现的宝物</Button>
        }


        <Form.Item colSpan={12} label="项目时间" >
          <DatePicker
            name="time"
            {...projectField.init('time', {
              getValueFormatter: value => value.format(`YYYY年MM月DD 当前时间：${moment().format()}`),
              setValueFormatter: value => moment(value, 'YYYY-MM-DD HH:mm:ss'),
            })}
          />
        </Form.Item>

        <Form.Item colSpan={12} label="这是自定义项目时间返回值：" >
          {projectField.getValue('time')}
        </Form.Item>

        <Form.Item colSpan={12} label="项目权限" >
          <Radio.Group name="authority" aria-labelledby="authority of project">
            <Radio id="private" value="private">私密项目</Radio>
            <Radio id="internal" value="internal">内部项目</Radio>
            <Radio id="publish" value="publish">开放目</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item colSpan={12} label="项目描述" >
          <Input.TextArea placeholder="请输入项目详细信息" name="desc" />
        </Form.Item>

        <Form.Item colSpan={12}>
          {actions}
        </Form.Item>
      </Form>
    </React.Fragment>);
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: 20 }}>
        <a href={'/demos/list.html'}>返回列表页</a>
      </h3>
      <Card free>
        <Card.Content className={'StepForm'}>
          <Step current={currentStep} shape="circle">
            {steps}
          </Step>
          {mainbody}
        </Card.Content>
      </Card>
    </div>
  );
};


ReactDOM.render(<StepForm />, document.getElementById('container'));
