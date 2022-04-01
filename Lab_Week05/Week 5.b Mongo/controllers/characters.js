let Character = require('../models/characters');

exports.getAge = function (req, res) {
    let userData = req.body;
    if (userData == null)
        res.status(403).json('No data sent!')

    Character.find({first_name: userData.firstname, family_name: userData.lastname},
        'first_name family_name dob age')
        .then(characters => {
            let character = null;
            if (characters.length > 0) {
                let firstElem = characters[0];
                character = {
                    name: firstElem.first_name, surname: firstElem.family_name,
                    dob: firstElem.dob, age: firstElem.age
                };
                res.json(character.age);
            } else {
                res.json("not found");
            }
        })
        .catch((err) => {
            res.status(500).send('Invalid data or not found!' + JSON.stringify(err));
        });
}
