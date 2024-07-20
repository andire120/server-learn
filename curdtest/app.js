const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const avengers = [
  {
    age: 50,
    name: "Tony Stark",
    heroname: "Iron Man",
    condition: "Alive",
    id: 1,
  },

  {
    age: 102,
    name: "Steve Rogers",
    heroname: "Captain America",
    condition: "leave",
    id: 2,
  },

  {
    age: 51,
    name: "Bruce Banner",
    heroname: "Hulk",
    condition: "Alive",
    id: 3,
  },

  {
    age: 36,
    name: "Наташа Романов",
    heroname: "Black Widow",
    condition: "die",
    id: 4,
  },

  {
    age: 1054,
    name: "Thor Odinson",
    heroname: "Thor",
    condition: "Alive",
    id: 5,
  },
];

app.get("/avengers", (req, res) => {
  res.json(avengers);
});

app.post("/avengers", (req, res) => {
  const newavenger = req.body;
  newavenger.id = avengers.length + 1;
  avengers.push(newavenger);
  res.status(200).json(newavenger);
});

app.delete("/avengers/:id", (req, res) => {
  const avengerId = parseInt(req.params.id, 10);
  const avengerIndex = avengers.findIndex((i) => i.id === avengerId);

  if (avengerIndex !== -1) {
    avengers.splice(avengerIndex, 1);
    res.status(204).send({ message: "데이터 삭제됨" });
  } else {
    res.status(404).json({ message: "삭제할 데이터가 없음" });
  }
});

app.put("/avengers/:id", (req, res) => {
  const avengerId = parseInt(req.params.id, 10);
  const avengerIndex = avengers.findIndex((i) => i.id === avengerId);

  if (avengerIndex !== -1) {
    const updatedavenger = { ...avengers[avengerIndex], ...req.body };
    avengers[avengerIndex] = updatedavenger;
    res.json(updatedavenger);
  } else {
    res.status(404).json({ message: "업데이트 할 데이터가 없음." });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버가 켜졌습니다.`);
});
