import express from 'express';
import { setupDependencies, userRepo, petRepo } from './di';
import { userRoutes } from './routes/userRoutes';
import { petRoutes } from './routes/petRoutes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

export async function startApp() {
  try {
    await setupDependencies();

    app.use('/api/users', userRoutes(userRepo));
    app.use('/api/pets', petRoutes(petRepo));

    app.get('/', (_, res) => {
      res.json({ message: '🐶 Welcome to the Hexagonal Backend API!' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('🔴 Error starting application:', error);
    process.exit(1);
  }
}
