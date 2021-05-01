const fs = require(`fs`)
const {
  v4: uuidv4
} = require('uuid');

module.exports = (app) => {

  //get notes
  app.get(`/api/note`, (req, res) => {
    let note = JSON.parse(fs.readFileSync('Develop/db/db.json'));
    res.json(note)
  });

  //post new notes
  app.post(`/api/note`, (req, res) => {
    const writtenNote = req.body;
    writtenNote.id = uuidv4();

    fs.readFile('Develop/db/db.json', (err, data) => {
      if (err) throw err;
      const note = JSON.parse(data);
      note.push(writtenNote);

      fs.writeFile('Develop/db/db.json', JSON.stringify(note), (err) => {
        if (err) throw err;
        res.json(writtenNote)
      });
    });
  })
};