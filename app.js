const express = require('express');
const app = express();
const fs = require('fs');
const { title } = require('process');




// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the root route
app.get('/', (req, res) => {
    fs.readdir('./files', { withFileTypes: true }, (err, data) => {
        res.render('home', { data });
    })
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.get('/show/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, datas) => {
        res.render('show', { datas ,title:req.params.filename});

    })
});

app.get('/delete/:filename', (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if (err) throw err
        else { res.redirect('/') }
    })
});

app.get('/newban', (req, res) => {
    fs.writeFile(`./files/${req.query.filename}.txt`, req.query.filemsg, (err) => {
        if (err) { res.send("nhi bana") }
        else { res.redirect('/') }
    })
})


app.get('/edit/:name', (req, res) => {
    const title = req.params.name
    fs.readFile(`./files/${title}`, 'utf-8', (err, note) => {
        res.render('update', {
            title: title,
            Notes: note,

        })
    })
});

app.get('/edited/:oldnote', (req, res) => {
    const oldNote = req.params.oldnote;
    const newNote = req.query.updatenote;
    const data = req.query.updatemsg;

    fs.rename(`./files/${oldNote}`, `./files/${newNote}`, (err) => {
        if (err) throw err;
        fs.writeFile(`./files/${newNote}`, data, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});




// Start the server
app.listen(3000, () => {
    console.log(`Server is running`);
});
