import { parse } from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export type DataBaseType = 'mysql' | 'mongodb';

// 读取项目配置
export const getConfig = (type?: DataBaseType) => {
  const environment = getEnv() || 'dev';
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  // console.log('config', config);
  if (type) {
    return config[type];
  }
  return config;
};
