#!/usr/bin/env node

import { Command } from 'commander'
import prompts from 'prompts'
import inquirer from 'inquirer'

import { customPrompts, firstPrompt, templateFiles } from './utils/config.js'
import { intro, logo } from './utils/copyright.js'
import { gitCloneTemplate, preClone, renderTemplates } from './utils/helper.mjs'
import chalk from 'chalk'

if (process.stdout.isTTY && process.stdout.getColorDepth() >= 8) {
  console.log() // 换行
  console.log(logo, '-', intro)
  console.log()
}

const program = new Command();

/**
 * create-leui -h
 */
program.version('0.0.2').description('乐信 OA 前端框架 LeUI 应用脚手架');

const confirmProjectName = async (projectName) => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认新项目工程 ID (project-name) ${ projectName }?`,
      default: true,
    },
  ]);
  return confirm;
}


const createLeUIProj = async () => {

  const { projectName } = await prompts(firstPrompt)

  const projPath = preClone(projectName)

  const promptsInput = await prompts(customPrompts)

  await gitCloneTemplate(projPath)
  renderTemplates(projPath, templateFiles, { projectName, ...promptsInput })
  console.log(chalk.greenBright('项目创建成功!'));

  // console.log(result)
}

createLeUIProj().then()

