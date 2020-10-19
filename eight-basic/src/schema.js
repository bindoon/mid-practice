export default {
  componentName: 'Form',
  props: {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
    name: 'basic',
    initialValues: { remember: true }
  },
  children: [{
    componentName: 'Form.Item',
    props: {
      label: '用户名',
      name: 'username',
      rules: [{ required: true, message: '请输入你的用户名!' }]
    },
    children: [{
      componentName: 'Input'
    }]
  }, {
    componentName: 'Form.Item',
    props: {
      label: '密码',
      name: 'password',
      rules: [{ required: true, message: '请输入你的密码!' }]
    },
    children: [{
      componentName: 'Input.Password'
    }]
  }, {
    componentName: 'Form.Item',
    props: {
      wrapperCol: { offset: 8, span: 8 },
      name='remember',
      valuePropName: 'checked'
    },
    children: [{
      componentName: 'Checkbox',
      children: ['Remember me']
    }]
  }, {
    componentName: 'Form.Item',
    props: {
      wrapperCol: { offset: 8, span: 8 },
    },
    children: [{
      componentName: 'Button',
      props: {
        type: 'primary',
        htmlType: 'submit'
      },
      children: ['提交']
    }]
  }]
}