import mongoose, { Schema, Document, Types } from 'mongoose';
import { User } from '../../domain/User';
import { UserRepository } from '../../interfaces/userRepository';

interface IUserDocument extends Document<Types.ObjectId> {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export class MongooseUserRepository implements UserRepository {
  
  async findById(id: string): Promise<User | null> {
    // Convierte el id string a ObjectId para la consulta
    if (!Types.ObjectId.isValid(id)) return null;

    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;

    // Convierte ObjectId a string para el dominio
    return new User(userDoc.name, userDoc.email, userDoc._id.toString(),);
  }

    async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find();
    return userDocs.map(
      (userDoc) => new User( userDoc.name, userDoc.email, userDoc._id.toString(),)
    );
  }

  async save(user: User): Promise<void> {
    // Si user.id no existe, crea nuevo documento
    if (user.id && Types.ObjectId.isValid(user.id)) {
      // Actualiza usando _id
      await UserModel.updateOne(
        { _id: new Types.ObjectId(user.id) },
        { name: user.name, email: user.email },
        { upsert: true }
      );
    } else {
      // Crea nuevo documento
      const newUser = new UserModel({
        name: user.name,
        email: user.email,
      });
      await newUser.save();
    }
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
