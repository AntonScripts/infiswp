class Personen {
  #name;
  #alter;
  constructor(name, alter) {
    this.#name = name;
    this.#alter = alter;
  }

  grüßen() {
    console.log(`Hallo ${this.#name}, du bist ${this.#alter} Jahre alt.`);
  }

  // Getter für das private Feld #alter
  get alter() {
    return this.#alter;
  }
}

const person1 = new Personen("Max", 25);
const person2 = new Personen("Anna", 30);
person1.grüßen();
person2.grüßen();

console.log(`Gemeinsames Alter: ${person1.alter + person2.alter}`);