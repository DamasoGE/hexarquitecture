import mongoose, { Schema, Document, Types } from 'mongoose';
import { Pet } from '../../domain/Pet';
import { PetRepository } from '../../interfaces/petRepository';

interface IPetDocument extends Document<Types.ObjectId> {
  name: string;
  species: string;
  ownerId: string;
}

const PetSchema = new Schema<IPetDocument>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  ownerId: { type: String, required: true }
});

const PetModel = mongoose.model<IPetDocument>('Pet', PetSchema);

export class MongoosePetRepository implements PetRepository {
    
  async findById(id: string): Promise<Pet | null> {
    const petDoc = await PetModel.findById(id);
    if (!petDoc) return null;
    return new Pet( petDoc.name, petDoc.species, petDoc.ownerId, petDoc._id.toString(),);
  }

  async findAll(): Promise<Pet[]> {
    const petsDocs = await PetModel.find();
    return petsDocs.map(
      petDoc => new Pet( petDoc.name, petDoc.species, petDoc.ownerId, petDoc._id.toString(),)
    );
  }

  async save(pet: Pet): Promise<void> {
    // Si user.id no existe, crea nuevo documento
    if (pet.id && Types.ObjectId.isValid(pet.id)) {
      // Actualiza usando _id
      await PetModel.updateOne(
        { _id: new Types.ObjectId(pet.id) },
        { name: pet.name, species: pet.species, ownerId: pet.ownerId },
        { upsert: true }
      );
    } else {
      // Crea nuevo documento
      const newPet = new PetModel({
        name: pet.name,
        species: pet.species, 
        ownerId: pet.ownerId
      });
      await newPet.save();
    }
  }

  async findByOwnerId(ownerId: string): Promise<Pet[]> {
    const petsDocs = await PetModel.find({ ownerId });
    return petsDocs.map(
      petDoc => new Pet(petDoc._id.toString(), petDoc.name, petDoc.species, petDoc.ownerId)
    );
  }

  async delete(id: string): Promise<void> {
    await PetModel.findByIdAndDelete(id);
  }

}
