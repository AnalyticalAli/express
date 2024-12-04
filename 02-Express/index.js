
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";




const  app = express();
const port =  process.env.PORT||3000;
const morganFormat = ":method :url :status :response-time ms";


app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


//creating a crud app

app.use(express.json())

let patientData =[]
let patientId = 1;

/// adding patient detail
app.post('/patient',(req,res)=>{
   const {name,age,gender}= req.body
   const newPatient = {id:patientId++,name,age,gender}
   patientData.push(newPatient)
   res.status(201).send(newPatient)
})


//route to get all patient
app.get('/patient',(req,res)=>{
 res.status(200).send(patientData)
})


//getting patient with id
app.get('/patient/:id',(req,res)=>{
  const patient = patientData.find(p=> p.id === parseInt(req.params.id))
  if (!patient) {
    return res.status(404).send("Patient not Found")
  }
  res.status(200).send(patient)
})


// updating patient detail
app.put('/patient/:id',(req,res)=>{
  const patient = patientData.find(p=> p.id === parseInt(req.params.id))
  if (!patient) {
    return res.status(200).send("Patient not found")
  }

  const{name,age,gender}=req.body
  patient.name = name
  patient.age = age
  patient.gender =gender
res.status(200).send(patient)
})

//deleting the patient details

app.delete('/patient/:id',(req,res)=>{
  const index = patientData.findIndex(p=> p.id === parseInt(req.params.id))
  if (index === -1) {
    return res.send(404).send("user not found")
  }
  patientData.splice(index,1)
  return res.status(204).send ("patient is remove")
})


app.listen(port,()=>{
    console.log(`server is running at port :${port}...`);
    
})

