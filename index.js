const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  const transporter = await nodeMail.createTransport({
    service: 'gmail',
    auth: {
      user: '5938002@isd535.org',
      pass: 'lawtonpeng'
    },
  });
  const mailOption = {
    from: '5938002@isd535.org',
    to: '5938002@isd535.org',
    subject: subject,
    html: `You got mail'
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent");
  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
}
/*
app.get("/", (req, res) => {
  res.render(index.html);
});

app.get("/", (req, res) => {
  res.render('contact.html');
});*/

app.post("/contact", async (req, res, next) => {
  const { myname, myemail, mysubject, mymessage } = req.body;
  try {
    await mainMail(myname, myemail, mysubject, mymessage);
    
    res.send("Message Sent");
  } catch (error) {
    res.send("Error message not sent");
  }
});

app.listen(3000, () => console.log("Server is running"));