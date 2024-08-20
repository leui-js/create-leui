#!/usr/bin/env node

import { Command } from 'commander'
import prompts from 'prompts'
import inquirer from 'inquirer'
import chalk from 'chalk'

import { templateFiles, customPrompts } from './config.js'
import { gitCloneTemplate, preClone, renderTemplates } from './helper.mjs'


const program = new Command();


/**
 * le-ui-cli -h
 */
program.version('0.0.1').description('乐信 OA 前端框架 LeUI 应用脚手架');

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


/**
 * le-ui-cli create <project-name>
 */
program
  .command('create <project-name>')
  .description('新建一个 LeUI 项目: ')
  .action(async (projectName) => {
    debugger

    const confirm = await confirmProjectName(projectName);

    if (confirm) {
      const promptsInput = await prompts(customPrompts)

      const projPath = preClone(projectName)
      await gitCloneTemplate(projPath)
      renderTemplates(projPath, templateFiles, { projectName, ...promptsInput })

      console.log(chalk.greenBright('项目创建成功!'));

    } else {

    }
  });

program.parse(process.argv);
