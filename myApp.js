require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Joseph:mLUt7jXx2tqyDHV@cluster0.vrtej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// CREATION D'UN MODELE
  // Création d'un schema, elément indispensable pour définir tout objet avec MongoDB

const Schema  = mongoose.Schema;

const personSchema = new Schema({
  name: {type:String, required:true},
  age: Number,
  favoriteFoods: [String]
});
  
const Person = mongoose.model('Person', personSchema); // Modèle de personne


//Création et sauvegarde d'une personne;
const createAndSavePerson = (done) => {
  var John = new Person({
  name: "John",
  age: 35,
  favoriteFoods:['Potatoes', 'Carots', 'Fish', 'Cream']});
  John.save(function(err, data){
    if (err) return console.error(err);
    done(null, data)});
};

// Création multiple grâce à Model.create(liste, callback) 
var arrayOfPeople = [{name: "Johan",
  age: 55,
  favoriteFoods:['Potatoes', 'Pounded Yams', 'Chocolate']},
  {name: "Vianney",
  age: 15,
  favoriteFoods:['Tomatoes', 'Cabage', 'beaf', 'Rice']},
  {name: "Gloria",
  age: 42,
  favoriteFoods:['Milk', 'Cheese', 'Orange', 'Water']},
  {name: "Henry",
  age: 75,
  favoriteFoods:['Jollof Rice', 'Pineaple', 'Eggs', 'Ice Cream']}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people){
    if (err) return console.error(err);
    done(null, people)
  });
};

// Rechercher dans la base de donnée avec Model.find()
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    if (err) return console.log(err);
    done(null, personFound)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foundFood){
    if (err) return console.log(err);
    done(null, foundFood)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personFound){
    if (err) return console.log(err);
    //console.log(personfound);
    done(null, personFound)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};


// Rechercher un document et le mettre à jour à l'aide de .findOneAndUpdate(to_find, to_update, conditions, callbacks)
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, updated) {
    if (err) console.log(err);
    done(null, updated)
  });
};



const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) =>
  {
    if (err) return console.log(err);
    done(null, doc)
  });
};



const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, returnedDoc) =>
  {
    if (err) console.log(err);
    done(null, returnedDoc)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) =>
    {
      if (err) console.log(err);
      done(null, data)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
