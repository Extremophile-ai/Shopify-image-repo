import seeder from "mongoose-seed";
import dotenv from "dotenv";
import userSeed from "./user-seed";

dotenv.config();
//DEV_MONGO_URI

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}
// seeder.connect(process.env.DEV_MONGO_URI, options, () => {

seeder.connect(process.env.TEST_MONGO_URI, options, () => {
// load models
seeder.loadModels([
  "./src/model/User.js"
  ]);

//   clear database
seeder.clearModels(["User"], () => {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, (err, done) => {
      if(err) {
        console.log(err);
        return err;
      }
      if(done) {
        console.log("seeding done");
      }
      seeder.disconnect();
    });
 
  });
});

// Data array containing seed data - documents organized by Model
const data = [ 
  userSeed
];

