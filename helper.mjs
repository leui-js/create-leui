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
    console.error(chalk.red(`项目目录 ${ projectName } 已存在，请手动清理后重试`))
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
      onCloneError(projectPath, error.message)
    });
}


export const renderTemplates = (projectPath, files, keywords) => {

  const renderFailFile = files.find((file) => {
    const filePath = path.join(projectPath, file)
    if (fs.pathExistsSync(filePath)) {
      try {
        const template = fs.readFileSync(filePath, 'utf-8');
        const rendered = ejs.render(template, keywords);
        fs.writeFileSync(filePath, rendered);
      } catch (e) {
        console.error(e)
        return file
      }
    }
  })

  if (renderFailFile) {
    const message = `${ renderFailFile } 模板渲染异常`
    onRenderError(projectPath, message)
    throw new Error(message)
  }
}


export const onCreateError = (projectPath, message) => {
  console.error(chalk.redBright(`${ message }`))
  if (fs.pathExistsSync(projectPath)) {
    fs.removeSync(projectPath)
    console.log(chalk.gray(`${projectPath} 工程目录已清理`));
  }
  return exit(1);
}


const onRenderError = (projectPath, msg) => {
  onCreateError(projectPath, msg)
}

const onCloneError = (projectPath, message) => {
  onCreateError(projectPath, `模板 clone 异常: ${ message }`)
}


