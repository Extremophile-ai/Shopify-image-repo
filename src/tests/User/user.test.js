import chai from "chai";
import chaiHttp from "chai-http";
import { dropDB } from "../../config/db"
import server from "../../server";
import {
    user,
    user2,
    user3,
    user4,
    user5,
    profile,
    image
} from "./user-test-data";


chai.should();
chai.use(chaiHttp);


describe("Should handle correct user's behaviour", async () => {
    describe("/user/signup should create a user", () => {
        it("it should create a user with complete details successfully", (done) => {
          chai
            .request(server)
            .post("/user/signup")
            .set("Accept", "application/json")
            .send(user)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eql(true);
              res.body.should.have.property("message").eql("you have successfuly signed up. please check your provided email address to confirm your email");
              done();
            });
        });
    
        it("it should not create a user with an already taken username", done => {
            chai
            .request(server)
            .post("/user/signup")
            .set("Accept", "application/json")
            .send(user4)
            .end((err, res) => {
                res.should.have.status(409);
                done();
              });
        });
        it("it should not create a user with an already registered email", done => {
            chai
              .request(server)
              .post("/user/signup")
              .set("Accept", "application/json")
              .send(user2)
              .end((err, res) => {
                res.should.have.status(409);
                done();
              });
        });
    });
    
    describe("/user/signup/verify-user/:email should verify a user's email", () => {
        it("it should verify a user's account", (done) => {
            chai
              .request(server)
              .get(`/user/signup/verify-user/${user.email}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    describe("/user/login Should log in user", () => {
        it("it should sign in a user with complete details successfully", (done) => {
            chai
                .request(server)
                .post("/user/login")
                .set("Accept", "application/json")
                .send(user5)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message").eql("log in successful");
                    done();
                });
        });
        it("it should not sign in a user with unregistered details", (done) => {
            chai
            .request(server)
            .post("/user/login")
            .set("Accept", "application/json")
            .send(user4)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("error").eql("email supplied is incorrect");
                done();
            });
        });
    });

    describe("Handle authenticated user action", () => {
        let userToken;
        before(done => {
            chai
            .request(server)
            .post("/user/login")
            .set("Accept", "application/json")
            .send(user5)
            .end((err, res) => {
                if (err) throw err;
                userToken = res.body.token;
                done();
            });
        });
        it("Authenticated user can update his profile", (done) => {
            chai
              .request(server)
              .patch("/user/profile/update")
              .set("Authorization", `Bearer ${userToken}`)
              .send(profile)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("user details updated");
                done();
            });
        });
        it("Authenticated user can upload images", (done) => {
            chai
              .request(server)
              .patch("/user/image/upload")
              .set("Authorization", `Bearer ${userToken}`)
              .send(image)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("image added successfuly");
                done();
            });
        });
        it("Authenticated user can view his uploaded image", (done) => {
            chai
              .request(server)
              .get("/user/image/hospital")
              .set("Authorization", `Bearer ${userToken}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("image retrieved!");
                done();
            });
        });
        it("Authenticated user can delete his uploaded image", (done) => {
            chai
              .request(server)
              .delete("/user/image/hospital/delete")
              .set("Authorization", `Bearer ${userToken}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("image deleted");
                done();
            });
        });
        it("Authenticated user can delete his account", (done) => {
            chai
              .request(server)
              .delete("/user/delete/")
              .set("Authorization", `Bearer ${userToken}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("user account deleted");
                done();
            });
        });
    })
    
    describe("Handle unauthorized user  operations", () => {
        it("/user/:id should get a single user by ID", (done) => {
            chai
            .request(server)
            .get("/user/5ffc98c715fb3323f4edd474")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("user retrieved!");
                done();
            });
        });
        it("/users should get all registered users", (done) => {
            chai
            .request(server)
            .get("/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("all users retrieved successfully");
                done();
            });
        });
        it("Unauthorized user cannot delete an image", (done) => {
            chai
            .request(server)
            .delete("/user/image/hospital/delete")
            .end((err, res) => {
              res.should.have.status(401);
              done();
          });
        });
    });
    after(async () => {  
        await dropDB("CI_lesson_test");
      });
});