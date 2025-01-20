const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const PORT = 7000
const cors = require("cors") // memanggil library cors
const app = express() //implementasi express

app.use(bodyParser.json())
// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({ extended: true }))
// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

app.get("/test", (req, res) => {
    // req merupakan variabel yang berisi data request
    // res merupakan variabel yang berisi data response dari end-point
    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        message: "Ini end-point pertama ku", // menampilkan data
        method: req.method, // menampilkan method
        code: res.statusCode // menampilkan response code
    }
    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})
// menjalankan server pada port 8000
app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})