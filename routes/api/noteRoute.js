const fs = require(`fs`)
const {
  v4: uuidv4
} = require('uuid');


module.exports = (app) => {

  //get notes
  app.get(`/api/notes`, (req, res) => {
    let existingNotes = [];

    const existingNotesString = fs.readFileSync('./db/db.json', { encoding: 'utf-8' });
    console.log(existingNotesString);
    if (existingNotesString) {
      existingNotes = JSON.parse(existingNotesString);
    }
    res.json(existingNotes);
  });

  //post new notes
  app.post(`/api/notes`, (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    fs.readFile('./db/db.json', { encoding: 'utf-8' }, (err, existingNotesString) => {
      console.log(existingNotesString)
      if (err) throw err;

      let existingNotes = [];
      if (existingNotesString) {
        existingNotes = JSON.parse(existingNotesString);
      }
      existingNotes.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(existingNotes), (err) => {
        if (err) throw err;
        res.json(newNote)
      });
    });
  })
};