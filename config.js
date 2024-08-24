export const templateFiles = [
  'package.json',
  'index.html',
  'vite.config.ts',
  'themeConfig.ts',
  'src/plugins/vuetify/theme.ts',
]

export const repoUrl = 'http://gitlab.fenqile.com/soa/le-ui-template.git';

export const customPrompts = [
  {
    type: 'text',
    name: 'appName',
    // name: 'title',
    message: '应用标题：',
    initial: ' OA 应用',
  },
  {
    type: 'select',
    name: 'mainColor',
    message: `请挑选主色调`,
    choices: [
      { title: '紫色', value: ['#8C57FF', '#7E4EE6'] },
      { title: '蓝色', value: ['#16B1FF', '#149FE6'] },
      { title: '绿色', value: ['#0D9394', '#0C8485'] },
      {
        title: '黄色',
        description: '暂不支持',
        value: ['#FFB400', '#E6A200'],
        disabled: true
      },
    ],
  },
  {
    type: 'select',
    name: 'navType',
    message: '导航方式',
    choices: [
      { title: '水平导航', value: 'Horizontal' },
      { title: '垂直导航', value: 'Vertical' },
    ]
  },
  {
    type: 'select',
    name: 'domain',
    message: '请选择应用的访问域名:',
    choices: [
      { title: 'm.oa.fenqile.com', value: 'm.oa.fenqile.com' },
      { title: 'hr.oa.fenqile.com', value: 'hr.oa.fenqile.com' }
    ]
  }
]
