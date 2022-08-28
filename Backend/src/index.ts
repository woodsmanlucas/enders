import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express from "express";

(async () => {

    AppDataSource.initialize().then(async () => {
        console.log("Datasource initialized")
    }).catch(error => {console.log(error)})

    const app = express();
    app.use(express.json());

    app.post('/', async (req, res) => {
        console.log(req.body)
        var newUser = req.body
        if(newUser.email === undefined && newUser.password === undefined){
            res.status(400)
            res.json({"error": "bad data"})
            return
        }

        const users = await AppDataSource.getRepository(User).findOneBy({
            email: newUser.email
        })
        // console.log(users)
        if(users){
            res.status(400)
            res.json({"error": "bad data"})
            return
        }
        // console.log("Inserting a new user into the database...")
        const user = new User()
        user.email = newUser.email
        user.password = newUser.password
        await AppDataSource.manager.save(user)
        // console.log("Saved a new user with id: " + user.id)

        res.status(200)
        res.send()
    })

    app.listen(4000, () =>{
        console.log("express server started")
    })
})()

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
