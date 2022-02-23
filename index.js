// const fileOperations = require("./contacts");
const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log(`contact by id ${id}`, contact);
        return;
      }
      throw new Error(`contact by id = ${id} not found`);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log("New contact", newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log("Removed contact: ", removedContact);
      break;

    case "update":
      const updatedProduct = await updateContactById({
        id,
        name,
        email,
        phone,
      });

      if (updatedProduct) {
        console.log(`contact by id ${id}`, updatedProduct);
        return;
      }

      throw new Error(`contact by id = ${id} not found`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

console.log("null == 0", 0 == undefined);

(async () => {
  await invokeAction(argv);
})();

// fileOperations("./db/text.txt", "add", "\n\nEnglish its good.");

// fileOperations("./db/text.txt");

// fileOperations("./db/cloneText.txt", "replace", "Its my life");
