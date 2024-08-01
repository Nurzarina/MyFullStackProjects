import express from "express";
import { body, ExpressValidator, validationResult, query, param } from "express-validator";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const authMiddleware = (req, res, next) => {
    if (req.headers.authorization) {
        console.log("Authorization header is present");
    } else {
        console.log("No authorization header");
    }
    next();
}

const classStudents = [
    { id: 1, name: "Adam", age: 28 },
    { id: 2, name: "Yatt", age: 32 },
    { id: 3, name: "Aini", age: 27 },
    { id: 4, name: "Maisarah", age: 25 },
    { id: 5, name: "Brad", age: 28 },
    { id: 6, name: "Masyitah", age: 28 },
    { id: 7, name: "Faris", age: 32 },
    { id: 8, name: "Zarina", age: 31 },
    { id: 9, name: "Matt", age: 28 },
    { id: 10, name: "Syaheerah", age: 32 },
    { id: 11, name: "Mel", age: 28 },
    { id: 12, name: "Lan", age: 32 },
    { id: 13, name: "Niqi", age: 27 },
    { id: 14, name: "Faisal", age: 26 },
    { id: 15, name: "Mel", age: 25 },
    { id: 16, name: "Nurul", age: 29 },
    { id: 17, name: "Att", age: 27 },
    { id: 18, name: "Acai", age: 32 },
    { id: 19, name: "Zayn", age: 29 },
    { id: 20, name: "Ricky", age: 32 },
    { id: 21, name: "Yunus", age: 30 },
    { id: 22, name: "Yat", age: 32 },
    { id: 23, name: "Ya", age: 30 },
    { id: 24, name: "Amir", age: 32 },
]

app.use(authMiddleware);
app.use(loggingMiddleware);

query('search_query').trim().notEmpty();

app.get("/api/class", (req, res) => {
    console.log(req.query);
    const { filter, value } = req.query;
    console.log(value);

    if (!filter || !value) return res.send(classStudents);

    // If filter = "id", run this.
    if (filter === "id") {

        if (filter && value) {
            const parseId = parseInt(value);
            console.log(parseId);
            const filteredStudentsID = classStudents.find((user) => user.id === parseId);

            if (isNaN(parseId)) { return res.status(400).send({ "Bad request": "Invalid ID" }) };

            if (filteredStudentsID == null) { return res.status(404).send({ error: "User not found for this ID." }) };

            return res.status(200).send(filteredStudentsID);
        };
    }

    // If filter = "name", run this.
    else if (filter === "name") {

        if (filter && value) {
            const filteredStudentsName = classStudents.filter((user1) => user1[filter].includes(value));

            if (filteredStudentsName.length === 0) { return res.status(404).send({ error: "No result." }) };

            return res.status(200).send(filteredStudentsName);
        }
    }

    // If filter = "age", run this.
    else if (filter === "age") {

        if (filter && value) {
            const parseAge = parseInt(value);
            console.log(parseAge);
            const filteredStudentsAge = classStudents.filter((user2) => user2[filter] === (parseAge));

            if (isNaN(parseAge)) { return res.status(400).send({ "Bad request": "Invalid age" }) };

            if (filteredStudentsAge.length === 0) { return res.status(404).send({ error: "No result." }) };

            return res.status(200).send(filteredStudentsAge);
        }
    }

    else { return res.status(404).send({ msg: "Category not found" }); }

});

app.post("/api/class", [
    body('name')                //validate name
        .trim()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    body('age')               //validate age
        .isLength({ min: 1 })
        .withMessage('Age is required'),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = { id: classStudents[classStudents.length - 1].id + 1, ...req.body };
    classStudents.push(newUser);
    res.status(201).send(newUser);
});



app.get("/api/class/:id", [param('id').isInt({ gt: 0}).withMessage('ID must be more than 0 and must be a positive integer')],(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const userID = parseInt(req.params.id);
    console.log(`Requested ID in url is ${req.params.id}`);
    console.log(`Parsed ID is ${userID}`);

    if (isNaN(userID))
        return res.status(400).send({ "Bad Request": "Invalid ID" });

    const findStudent = classStudents.find((student) => student.id === (userID));

    if (!findStudent)
        return res.status(404).send({ msg: "Student not found" });

    res.status(200).send(findStudent);
}
);

app.put("/api/class/:id", [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    body('age')
        .isInt({ min: 0 })
        .withMessage('Age is required'),
], (req, res) => {
    const userID = parseInt(req.params.id);
    if (isNaN(userID)) return res.status(400).send({ error: "Invalid ID" });

    const studentIndex = classStudents.findIndex(user3 => user3.id === userID);

    if (studentIndex === -1) {
        return res.status(404).send({ message: "User not found" });
    }

    const errors2 = validationResult(req);

    if (!errors2.isEmpty()) {
        return res.status(400).json({ errors: errors2.array() });
    }

    classStudents[studentIndex] = { id: userID, ...req.body };
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});