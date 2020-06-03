export class MarvelCard {

  public static getDefault(card: MarvelCard): MarvelCard {
    const name = card.name ? card.name : undefined;
    const attack = card.attack ? card.attack : undefined;
    const defense = card.defense ? card.defense : undefined;
    const combines = card.combines ? card.combines : undefined;
    const cardtype = card.cardtype ? card.cardtype : undefined;
    const alignment = card.alignment ? card.alignment : undefined;
    const affiliation = card.affiliation ? card.affiliation : undefined;
    const imagefront = card.imagefront ? card.imagefront : undefined;
    const imageback = card.imageback ? card.imageback : undefined;
    const id = card._id ? card._id : undefined;
    return new MarvelCard(
      name,
      attack,
      defense,
      combines,
      cardtype,
      alignment,
      affiliation,
      imagefront,
      imageback,
      id
    );
  }

  public static getEmptyDefault(): MarvelCard {
    return new MarvelCard(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  constructor(
    public name: string,
    public attack: number,
    public defense: number,
    public combines: string[],
    public cardtype: string,
    public alignment: string,
    public affiliation: string,
    public imagefront: string,
    public imageback: string,
    public _id: string,
  ) {}
}
