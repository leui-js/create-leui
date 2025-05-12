import { parseArgs } from 'node:util'
import validatePackName from 'validate-npm-package-name'
// import chalk from 'chalk'
import mainColorChoices from './mainColorChoices.js'

const args = process.argv.slice(2)

const options = {
  ts: { type: 'boolean' },
}

const { values: argv, positionals } = parseArgs({
  args,
  options,
  strict: false
})

let targetDir = positionals[0]

const defaultProjectName = !targetDir ? 'leui-app' : targetDir


export const templateFiles = [
  'package.json',
  'index.html',
  'vite.config.ts',
  'themeConfig.ts',
  'src/plugins/vuetify/theme.ts',
]

export const repoUrl = 'https://github.com/leui-js/leui-template.git';

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}


export const firstPrompt = {
  name: 'projectName',
  type: 'text',
  message: '工程名称',
  initial: defaultProjectName,
  onState(state) {
    return (targetDir = String(state.value).trim().toLowerCase() || defaultProjectName)
  },
  validate(dir) {
    const { validForNewPackages, validForOldPackages } = validatePackName(dir)

    if (validForNewPackages && validForOldPackages) {
      return isValidPackageName(dir)
    }

    return '工程名不合法，请重试'
  },
}

export const customPrompts = [
  // firstPrompt,
  {
    type: 'text',
    name: 'appName',
    // name: 'title',
    message: '应用标题：',
    initial: ' OA 应用',
  },

  {
    type: 'select',
    name: 'biz',
    message: '请选择应用所属的业务线',
    choices: [
      { title: 'OA', value: 'oa' },
      { title: '人事', value: 'hr' },
      { title: '财务', value: 'fi', disabled: true },
      { title: '法务', value: 'law', disabled: true },
      { title: '其他', value: 'app', disabled: true },
    ]
  },
  {
    type: 'select',
    name: 'mainColor',
    message: `请挑选主色调`,
    // hint: mainColorHint,
    choices: mainColorChoices,
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
      { title: 'oa.fenqile.com', value: 'oa.fenqile.com' },
      { title: 'hr.oa.fenqile.com', value: 'hr.oa.fenqile.com' }
    ]
  }
]
