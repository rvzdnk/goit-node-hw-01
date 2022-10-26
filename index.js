const {listContacts, getContactById, removeContact, addContact,} = require("./contacts");
require('colors');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contactsList = await listContacts();
          console.log("Contacts List:".white);
          console.table(contactsList);
      break;

    case 'get':
          const filterContactById = await getContactById(id);
          console.log("Searched contact:".blue);
          console.table(filterContactById);
      break;

    case 'add':
          const addNewContact = await addContact(name, email, phone);
          console.log("You added new contact.".green);
          console.table(addNewContact);
      break;

    case 'remove':
          const removedContact = await removeContact(id);
          console.log("Contact is removed".red);
          console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);