class Player {
    private _hand: any;
    private _score: number;
    private _bank: number;
    private _hasAce: boolean;
    private _hasStayed: boolean;
  
    constructor() {
      this._hand = [];
      this._score = 0;
      this._bank = 500;
      this._hasAce = false;
      this._hasStayed = false;
    }
  
    get hand(): any {
      return this._hand;
    }
  
    set hand(hand: any) {
      this._hand = hand;
    }
  
    get score(): number {
      return this._score;
    }
  
    set score(score: number) {
      this._score = score;
    }
  
    get bank(): number {
      return this._bank;
    }
  
    set bank(bank: number) {
      this._bank = bank;
    }
  
    get hasAce(): boolean {
        return this._hasAce;
    }

    set hasAce(hasAce: boolean) {
        this._hasAce = hasAce;
    }
  
    get hasStayed(): boolean {
        return this._hasStayed;
    }

    set hasStayed(hasStayed: boolean) {
        this._hasStayed = hasStayed;
    }
}

export default Player;  