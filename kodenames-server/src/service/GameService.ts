import { User } from '../entity/User';
import { Game } from '../entity/Game';
import { TeamType } from '../entity/Player';
import { Dictionary } from '../entity/Dictionary';
import { Card, CardType } from '../entity/Card';

export class GameService {
  async createGame(userId: string): Promise<Game> {
    const cards: Card[] = await this.createCards();

    const user = await User.findOne({
      where: { id: userId },
    });

    const player = user!.player;
    player.team = !Math.round(Math.random()) ? TeamType.RED : TeamType.BLUE;
    await player.save();

    const game = await Game.create({
      cards,
      players: [player],
      dateCreated: new Date(),
    }).save();

    return game;
  }

  private async createCards() {
    const DICTIONARY_NAME = 'ENGLISH_BASIC';
    const LIST_SIZE = {
      CARDS: 25,
      RED_CARDS: 0,
      BLUE_CARDS: 0,
    };

    if (!Math.round(Math.random())) {
      LIST_SIZE.RED_CARDS = 9;
      LIST_SIZE.BLUE_CARDS = 8;
    } else {
      LIST_SIZE.RED_CARDS = 8;
      LIST_SIZE.BLUE_CARDS = 9;
    }

    const dictionary = await Dictionary.findOne({
      where: { name: DICTIONARY_NAME },
    });
    const allWords = dictionary!.words.split(',');

    const cardIndexes = this.getRandomIndexes(LIST_SIZE.CARDS, allWords.length);
    const blackCardIndex = this.getRandomIndexes(1, LIST_SIZE.CARDS)[0];
    const redCardIndexes = this.getRandomIndexes(
      LIST_SIZE.RED_CARDS,
      LIST_SIZE.CARDS,
      [blackCardIndex],
    );
    const blueCardIndexes = this.getRandomIndexes(
      LIST_SIZE.BLUE_CARDS,
      LIST_SIZE.CARDS,
      [...redCardIndexes, blackCardIndex],
    );

    const cards: Card[] = [];

    for (let i = 0; i < cardIndexes.length; i++) {
      const index = cardIndexes[i];
      let cardType: CardType;
      if (redCardIndexes.includes(i)) {
        cardType = CardType.RED;
      } else if (blueCardIndexes.includes(i)) {
        cardType = CardType.BLUE;
      } else if (blackCardIndex === i) {
        cardType = CardType.BLACK;
      } else {
        cardType = CardType.WHITE;
      }

      const card = Card.create({
        word: allWords[index],
        type: cardType,
        isOpen: false,
        isActive: true,
      });
      cards.push(card);
    }

    return cards;
  }

  private getRandomIndexes(
    numberOfIndexes: number,
    maxIndexNumber: number,
    excludeIndexes?: number[],
  ): number[] {
    const indexes = new Set();
    while (indexes.size !== numberOfIndexes) {
      const index = Math.floor(Math.random() * maxIndexNumber) + 1;
      if (excludeIndexes) {
        if (!excludeIndexes.includes(index)) {
          indexes.add(index);
        }
      } else {
        indexes.add(index);
      }
    }

    return Array.from(indexes) as number[];
  }
}
