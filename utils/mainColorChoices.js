import chalk from 'chalk'

const mainColorChoices = [
  { title: '紫色', value: ['#8C57FF', '#7E4EE6'] },
  { title: '蓝色', value: ['#16B1FF', '#149FE6'] },
  { title: '绿色', value: ['#0D9394', '#0C8485'] },
  {
    title: '黄色',
    description: '暂不支持',
    value: ['#FFB400', '#E6A200'],
    disabled: true
  },
]


// const mainColorHint = mainColorChoices.reduce((str, { title, value: colors}) => {
//   const output = colors.map( color => chalk.hex(color).bold('■')).join('-')
//   return `${str} ${title}: ${output} \n`
// }, '')


mainColorChoices.forEach( (choice) => {
  const { value: colors , title} = choice
  const colorSquare = colors.map( color => chalk.hex(color).bold('■')).join('')
  choice.title = `${title}: ${colorSquare} `
  // console.log(choice.title)
} )

export default mainColorChoices

