const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

/***** APP CONFIG *****/

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 4000;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

const fileDirectory = "public";

/***** LOCAL STORAGE *****/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "---" + file.originalname )
    }
});
const upload = multer({ storage: storage, dest: fileDirectory + "/"}).single("file")

/**
 * Stores files locally in the `public` directory
 */
app.post("/api/upload/file", upload, (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        console.log(fileDirectory + "/" + req.file.filename + ' was added');
        return res.status(200).json(fileDirectory + "/" + req.file.filename + ' was added');
    });
});

/**
 * File overviews contain the file's name and size
 */
app.get("/api/overview", async (req, res) => {
    await fs.readdir(fileDirectory, {withFileTypes: true}, (err, fileNames) => {
        if (err) {
            return res.status(500).json(err);
        }

        let fileOverviews = [];
        fileNames.forEach((filename) => {
            const stats = fs.statSync(fileDirectory + "/" + filename.name)
            const fileSizeInBytes = stats.size;
            fileOverviews.push({
                name: filename.name,
                size: fileSizeInBytes,
            });
        })
        console.log(fileOverviews.length + " file overviews were found");
        return res.status(200).json(fileOverviews);
    });
});

/**
 * Deletes the specified file
 */
app.delete("/api/delete", async (req, res) => {
    fs.unlink(fileDirectory + "/" + req.body.fileName, (err) => {
        if (err) {
            throw Error(err)
        };
        console.log(fileDirectory + "/" + req.body.fileName + ' was deleted');
        return res.status(200).json(fileDirectory + "/" + req.body.fileName + ' was deleted');
    });
});

/**
 * Gets the specified file and makes the user's client download it
 */
app.post("/api/download", async (req, res) => {
    const file = `${__dirname}/` + fileDirectory + "/" + req.body.fileName;
    const filename = path.basename(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    const filestream = fs.createReadStream(file);

    console.log(req.body.fileName + " was downloaded");
    filestream.pipe(res);
})

