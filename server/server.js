const express = require("express")
const axios = require("axios")
const cors = require("cors")
const morgan = require("morgan")
const multer = require("multer")

const upload = multer({
    dest: "./uploads"
})
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  })
)
app.use('/uploads', express.static('uploads'))
app.use(morgan("tiny"))
let Token
app.get("/*/*", async (req, res) => {
  try {
    console.log(req.path)
    console.log(req.query)
    console.log("token", Token)
    let url = `https://test.swagger.print2block.in${req.path}/?from=${req.query.from}&to=${req.query.to}`
    console.log(url)
    const { data } = await axios.get(url, {
      headers: {
        "x-access-token": Token,
      },
    })
    if (!data) {
      throw new Error("Data not available")
    } else {
      return res.status(200).json(data)
    }
  } catch {
    res.status(400).json({ message: error.message })
  }
})

app.post("/*/*",upload.single('userimage'), async (req, res) => {
  try {
    console.log("File Details",req.file)
    console.log(req.path)
    if(req.path == "/docs/initiate"){
      let url = `https://test.swagger.print2block.in${req.path}/?qrcode=true`
      console.log(Token)
      let { data } = await axios.post(url, {
        "filename": req.file.originalname
      },{
        headers: {
          "x-access-token" : Token
        }
      })
      console.log(data)
      return res.status(200).json(data)
    }else{
      let url = `https://test.swagger.print2block.in${req.path}`
      sampleData = req.body
      let { data } = await axios.post(url, sampleData)
      Token = data.token
      if (!data) {
        throw new Error("Data not available")
      } else {
        return res.status(200).json(data)
      }
    }
  } catch {
    res.status(400).json({ message: error.message })
  }
})

const home = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at the port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

home()
