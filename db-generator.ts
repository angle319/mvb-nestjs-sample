import { IConfig, ModelBuilder, DialectMySQL, DialectPostgres } from 'sequelize-typescript-generator';

(async () => {
  const dialect = new DialectPostgres();
  try {
    const schemas = ['public', 'cors']
    for (const schema of schemas) {
      const config: IConfig = {
        connection: {
          dialect: 'postgres',
          database: 'myviewboard-test',
          username: 'postgres',
          password: 'postgres'
        },
        metadata: {
          indices: true,
          case: 'CAMEL',
          schema: schema,
          associationsFile: './associations.csv'
        },
        output: {
          clean: true,
          outDir: `models/${schema}`
        },
        strict: true,
      };
      const builder = new ModelBuilder(config, dialect);
      await builder.build();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();