export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'gxw1990**',
  database: 'api_factory',
  entities: ['dist/**/*.entity{.ts,.js}'],
  entityPrefix: 't_',
  synchronize: true,
};
