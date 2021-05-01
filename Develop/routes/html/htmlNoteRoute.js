const path = require(`path`);

module.exports = (app) => {


  app.get(`/note`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/notes.html`))
  });
    
  app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/index.html`))
  });
    
}
