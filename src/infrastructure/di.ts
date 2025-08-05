import dotenv from 'dotenv';
dotenv.config();

const DB_TYPE = process.env.DB_TYPE || 'mongo';

import { UserRepository } from '../interfaces/userRepository';
import { PetRepository } from '../interfaces/petRepository';
import { MongooseUserRepository } from './db/MongooseUserRepository';
import { MongoosePetRepository } from './db/MongoosePetRepository';
import { PostgresUserRepository } from './db/PostgresUserRepository';
import { PostgresPetRepository } from './db/PostgresPetRepository';

import { Pool } from 'pg';

let userRepo: UserRepository;
let petRepo: PetRepository;

async function setupDependencies() {
  if (DB_TYPE === 'mongo') {
    const mongoose = await import('mongoose');
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 Connected to MongoDB');

    userRepo = new MongooseUserRepository();
    petRepo = new MongoosePetRepository();

  } else if (DB_TYPE === 'postgres') {
    // Crear pool de conexión a Postgres
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
    });

    // Opcional: probar conexión
    await pool.connect();
    console.log('🔵 Connected to Postgres');

    userRepo = new PostgresUserRepository(pool);
    petRepo = new PostgresPetRepository(pool);

  } else {
    throw new Error(`DB_TYPE no soportado: ${DB_TYPE}`);
  }
}

export { userRepo, petRepo, setupDependencies };
