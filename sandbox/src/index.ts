import { Attack, isAttack, PokemonAttack } from "./generated/graphql";

type Data = {
  attackOrPokemonAttack: Attack | PokemonAttack;
};

const data: Data = {
  attackOrPokemonAttack: {
    __typename: "PokemonAttack",
    fast: [
      {
        __typename: "Attack",
        damage: 1,
        name: "attack",
        type: "type",
      },
    ],
    special: [
      {
        __typename: "Attack",
        damage: 1,
        name: "attack",
        type: "type",
      },
    ],
  },
};

(() => {
  const { attackOrPokemonAttack } = data;
  if (isAttack(attackOrPokemonAttack)) {
    attackOrPokemonAttack.damage;
    return;
  }

  attackOrPokemonAttack.special;
})();
