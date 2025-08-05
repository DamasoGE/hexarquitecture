// domain/Pet.ts
export class Pet {
  constructor(
    public name: string,
    public species: string,
    public ownerId: string,
    public readonly id?: string,
  ) {}
}
