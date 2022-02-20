// const fileOperations = require("./contacts");
const { listContacts, getContactById, addContact } = require("./contacts");
const { Command } = require("commander");
const { error } = require("console");
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
  console.log("action", action);
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        if (contact) {
          console.log(`contact by id ${id}`, contact);
          return;
        }
        throw new Error(`contact by id = ${id} not found`);
      } catch (error) {
        console.error(error.message);
      }

      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log("New contact", newContact);
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();

// fileOperations("./db/text.txt", "add", "\n\nEnglish its good.");

// fileOperations("./db/text.txt");

// fileOperations("./db/cloneText.txt", "replace", "Its my life");
