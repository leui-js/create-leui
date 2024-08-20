import { simpleGit } from 'simple-git';
import path from 'path'
import fs from 'fs-extra'
import { exit } from 'node:process';
import chalk from 'chalk';
import ejs from "ejs";
import { repoUrl } from './config.js'


export const preClone = (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.pathExistsSync(projectPath)) {
    console.error(chalk.red(`项目目录 ${ projectName } 已存在，请重新指定`))
    return exit(1);
  }
  return projectPath
}


export function gitCloneTemplate(projectPath) {


  const git = simpleGit();
  return git.clone(repoUrl, projectPath)
    .then(() => {
      console.log(chalk.greenBright('项目 clone 成功!'));
      fs.removeSync(path.join(projectPath, '.git'));
    })
    .catch((error) => {
      console.error('项目 clone 异常:', error);
    });
}


export const renderTemplates = (projectPath, files, keywords) => {

  files.forEach(async (file) => {
    const filePath = path.join(projectPath, file)
    if (fs.pathExistsSync(filePath)) {

      const template = fs.readFileSync(filePath, 'utf-8');
      const rendered = ejs.render(template, keywords);
      fs.writeFileSync(filePath, rendered);
    }
  })

}


