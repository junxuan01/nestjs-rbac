export default {
  type: 'mysql',
  host: 'rm-2vcm1f8gb4125ppb9co.mysql.cn-chengdu.rds.aliyuncs.com',
  port: 3306,
  username: 'root',
  password: 'gxw1990**',
  database: 'api_factory',
  entities: ['dist/**/*.entity{.ts,.js}'],
  entityPrefix: 't_',
  synchronize: true,
};
