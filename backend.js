const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});*/

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function idGenerator() {
    var index1=0;
    var index2=0;
    var id="";
    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z"];
    const numbers = ["0","1","2","3","4","5","6","7","8","9"];
    while(index1<3) {
        id+=letters[Math.floor(Math.random()*26)];
        index1++;
    }
    while(index2<3) {
        id+=numbers[Math.floor(Math.random()*10)];
        index2++;
    }
    return id;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if(result === undefined || result.length == 0)
        res.status(204).send('Resource not found.');
    else {
        //result = {users_list: result};
        const it = users['users_list'].indexOf(result);
        users['users_list'].splice(it, 1);
        res.status(200).send('Success!');
    }
});

app.post('/users', (req, res) => {
    //const userToAdd = req.body;
    const record=req.body;
    record['id']=idGenerator();
    /*if(addUser(record)===undefined){
        console.log("test");
        res.status(204).send("Failure");}
    else {console.log("testing");
        res.status(201).send(record);}*/
    addUser(record);
    res.status(201).send(record);

});

function addUser(user){
    users['users_list'].push(user);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}