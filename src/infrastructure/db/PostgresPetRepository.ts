import { Pool } from 'pg';
import { Pet } from '../../domain/Pet';
import { PetRepository } from '../../interfaces/petRepository';

export class PostgresPetRepository implements PetRepository {
  constructor(private pool: Pool) {}

  async findById(id: string): Promise<Pet | null> {
    const result = await this.pool.query(
      'SELECT id, name, species, owner_id FROM pets WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return new Pet(row.name, row.species, row.owner_id, row.id);
  }
  
  async findAll(): Promise<Pet[]> {
  const result = await this.pool.query(
    'SELECT id, name, species, owner_id FROM pets'
  );
  return result.rows.map(
    row => new Pet(row.id, row.name, row.species, row.owner_id)
  );
}

  async save(pet: Pet): Promise<void> {
    await this.pool.query(
      `INSERT INTO pets (name, species, owner_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, species = EXCLUDED.species, owner_id = EXCLUDED.owner_id`,
      [pet.id, pet.name, pet.species, pet.ownerId]
    );
  }

  async findByOwnerId(ownerId: string): Promise<Pet[]> {
    const result = await this.pool.query(
      'SELECT id, name, species, owner_id FROM pets WHERE owner_id = $1',
      [ownerId]
    );
    return result.rows.map(
      row => new Pet(row.name, row.species, row.owner_id, row.id,)
    );
  }
}
