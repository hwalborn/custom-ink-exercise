import Card from "../../classes/Card";

export default Array.from(Array(5)).map((x, i) => new Card(i.toString(), 'mock', x));