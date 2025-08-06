import { Pool } from "pg";
import { User } from "../../domain/User";
import { UserRepository } from "../../interfaces/userRepository";

export class PostgresUserRepository implements UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return new User(row.id, row.name, row.email);
  }

  async findAll(): Promise<User[]> {
    const result = await this.pool.query("SELECT id, name, email FROM users");
    return result.rows.map((row) => new User(row.id, row.name, row.email));
  }

  async save(user: User): Promise<void> {
    await this.pool.query(
      `INSERT INTO users (name, email) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email`,
      [user.id, user.name, user.email]
    );
  }

  async delete(id: string): Promise<void> {
    const result = await this.pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      throw new Error("Usuario no encontrado");
    }
  }
}
