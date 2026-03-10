import app from './app';
import { AppDataSource } from './config/data-source';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization:', err);
    process.exit(1);
  });