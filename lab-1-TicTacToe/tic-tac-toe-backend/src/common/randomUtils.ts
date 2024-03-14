const Nouns = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "fish",
  "giraffe",
  "horse",
  "iguana",
  "jellyfish",
  "kangaroo",
  "lion",
  "monkey",
  "newt",
  "octopus",
  "penguin",
  "quail",
  "rhinoceros",
  "snake",
  "tiger",
  "unicorn",
  "vulture",
  "whale",
  "xerus",
  "yak",
  "zebra"
]
const Adjectives = [
  "awesome",
  "brave",
  "caring",
  "daring",
  "eager",
  "fearless",
  "genuine",
  "happy",
  "intelligent",
  "jovial",
  "kind",
  "loving",
  "merry",
  "nice",
  "open",
  "playful",
  "quick",
  "real",
  "silly",
  "true",
  "upbeat",
  "vibrant",
  "witty",
  "xenial",
  "young",
  "zany"
]


export const getRandomName = () => {
  const noun = Nouns[Math.floor(Math.random() * Nouns.length)];
  const adjective = Adjectives[Math.floor(Math.random() * Adjectives.length)];
  return `${adjective} ${noun}`;
}
