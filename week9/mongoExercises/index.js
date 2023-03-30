const { ObjectId } = require("mongodb");

require("./db");
const Dog = require("./models/Dog");
const Owner = require("./models/Owner");

const createOne = async () => {
  // create a dog, return created dog
  const newDog = new Dog({
    name: "clifford",
    dob: Date.now(),
    howGood: 9,
    pals: [],
  });
  await newDog.save();
  return newDog;
};

const createMany = async () => {
  const dogNames = [
    "odie",
    "yeller",
    "eddie",
    "poochie",
    "bryan",
    "santas little helper",
  ];
  const dates = [
    new Date("2000-01-01"),
    new Date("2019-07-07"),
    new Date("2009-10-12"),
  ];
  const result = await Dog.insertMany(
    dogNames.map((name) => ({
      name,
      dob: dates[Math.floor(Math.random() * dates.length)],
      howGood: Math.floor(Math.random() * 10) + 1,
    }))
  );
  return result;
};

const getAll = async () => {
  // get all the dogs
  const dogs = await Dog.find();
  return dogs;
};

const findById = (id) => {
  // return the dog with that
  return Dog.findById(id);
};

const findTheBestDogs = async () => {
  // return dogs with howGood === 10
  const perfectDogs = await Dog.find({ howGood: 10 });
  return perfectDogs;
};

const findByMatchingName = async (name) => {
  const regexp = new RegExp(name, "i");
  const dogs = await Dog.find({ name: regexp });
  return dogs;
};

const findGreaterThanDOB = async () => {
  const dogs = await Dog.find({
    dob: {
      $gt: new Date("2010-01-01"),
    },
  }).sort({ dob: 1 });
  return dogs;
};

const getMyPals = async (id) => {
  // get by id
  // populate my pals
  const dog = await Dog.findById(id).populate("pals").select("pals");

  //return just the array of pals
  return dog.pals;
};

const updateOne = async (id) => {
  // update our dog
  const updatedDog = await Dog.findByIdAndUpdate(
    id,
    {
      name: "updatedName2",
    },
    // need to tell mongoose that you want the updated document
    {
      returnOriginal: false,
    }
  );
  // return it
  return updatedDog;
};

const updateMyPals = async (id) => {
  const ids = [
    new ObjectId("640a7163c8392c3400e06627"),
    new ObjectId("640a3cdf04c9e90fb5a27488"),
    new ObjectId("640a7163c8392c3400e06624"),
  ];
  // update our dog
  const updatedDog = await Dog.findByIdAndUpdate(
    id,
    {
      pals: ids,
    },
    // need to tell mongoose that you want the updated document
    {
      returnOriginal: false,
    }
  );
  // return it
  return updatedDog;
};

const deleteById = async (id) => {
  // delete the dog
  return await Dog.findByIdAndDelete({ _id: id });

  // return the deleted dog
};

// const main = async () => {
//   // const id = "640a357ab65c1771f3a1b5ef";

//   // const res = await deleteById(id);
//   // console.log(res);

//   // const owner = new Owner({ name: "tim" });
//   // const res = await owner.save();
//   const dog = new Dog({
//     name: 'dogWithOwner',
//     dob: Date.now(),
//     owner: {
//       name: 'tim'
//     }
//   })
//   const res = await dog.save();
//   // const res = await Owner.find({});
//   console.log("res", res);
// };

const main = async () => {
  // const dogsFourGoodOrMore = await Dog.find().where("howGood").gte(8);
  const res = await Owner.find().populate("dogs");

  console.log("d", res);
};

main();
