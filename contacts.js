const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");
// console.log("path", contactsPath);
// fs.readFile("./db/text.txt", "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log(error));

const fileOperations = async (filePath, action = "read", data = "") => {
  switch (action) {
    case "read":
      const text = await fs.readFile(filePath, "utf-8");
      console.log(text);
      break;

    case "add":
      await fs.appendFile(filePath, data);
      break;

    case "replace":
      await fs.writeFile(filePath, data);
      break;

    default:
      console.log("Unknown action type in switch");
  }
};

async function listContacts() {
  const content = await fs.readFile(contactsPath);
  const result = JSON.parse(content);
  return result;
}

async function getContactById(contactId) {
  const content = await listContacts();
  const contact = content.find((item) => item.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  // ...твой код
}

async function addContact({ name, email, phone }) {
  // ...твой код
  const content = await listContacts();
  const newContact = { name, email, phone, id: randomUUID() };
  content.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(content));
  return newContact;
}

// module.exports = fileOperations;
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
