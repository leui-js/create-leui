export const templateFiles = ['package.json', 'index.html', 'vite.config.ts']

export const repoUrl = 'http://gitlab.fenqile.com/soa/le-ui-template.git';

export const customPrompts = [
  {
    type: 'text',
    name: 'title',
    message: '应用标题：',
    initial: ' OA 应用',
  },
  {
    type: 'select',
    name: 'mainColor',
    message: `请挑选主色调`,
    choices: [
      { title: '蓝色', value: 'blue' },
      { title: '绿色', value: 'green' },
      {
        title: '黄色',
        description: 'This option has a description',
        value: 'yellow',
        disabled: true
      },
    ],
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
