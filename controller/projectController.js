const projects = require('../modal/projectModal')

// project add
exports.addProject = async (req, res) => {

    console.log("inside add project controller");

    const { title, language, github, link, overview } = req.body

    const userId = req.userId
    console.log(userId)
    const prjctImg = req.file.filename

    // res.status(200).json("add project request received")
    console.log(title, language, github, link, overview, prjctImg);

    //check already exist github link in db

    try {
        const existingProject = await projects.findOne({ github })

        if (existingProject) {
            res.status(406).json("project already added to ur db")
        } else {
            const newProject = new projects({ title, language, github, link, overview, prjctImg, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {

        res.status(401).json(err)
    }

}


// for 3 project for home page
exports.getHomeProjectController = async (req, res) => {
    console.log("inside getHomeProjectController")

    try {
        const homeProjects = await projects.find().limit(3)
        // if getsuccessfully then return
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}


// for allprojects
exports.allProjectController = async (req, res) => {
    console.log("inside allProjectController")

    // from search
    const searchkey = req.query.search

    const query = {

        language: {

            $regex: searchkey,
            //check if includes searchkey in language

            $options: "i"
            //small and capital
        }

    }

    try {
        const allProjects = await projects.find(query)
        // if getsuccessfully then return
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}


// for a specific user projects
exports.getUserProjectController = async (req, res) => {
    console.log("inside getUserProjectController")

    const userId = req.userId

    try {
        const userProject = await projects.find({ userId })
        // if getsuccessfully then return
        res.status(200).json(userProject)
    } catch (err) {
        res.status(401).json(err)
    }
}


exports.updateProjectController = async (req, res) => {

    console.log("inside updateProjectController")

    const { pid } = req.params

    const { title, language, github, link, overview, prjctImg } = req.body

    // check if imgfile is application/json or multipart/formdata
    const uploadImg = req.file ? req.file.filename : prjctImg

    // from jwt
    const { userId } = req.userId

    try {

        // pass 3 argument for updating id,details,new:true
        const updatedProject = await projects.findByIdAndUpdate({ _id: pid }, { title, language, github, link, overview, uploadImg, userId }, { new: true })

        // save to mongodb
        await updatedProject.save()

        res.status(200).json(updatedProject)

    } catch (err) {
        console.log(err)
    }

}


// delete a project
exports.deleteProjectController = async (req, res) => {

    console.log("inside deleteProjectController")

    const { pid } = req.params

    try {
        const deleteProject = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(deleteProject)
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }

}