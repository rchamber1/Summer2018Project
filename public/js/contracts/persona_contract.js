import Contract from './contract.js';
import PersonaTokenJson from '../../json/PersonaToken.json';

export default class PersonaContract extends Contract {

  constructor() {
    super();
  }

  async initialize() {
    console.log('PersonaContract: awaiting initialize')
    await super.initialize(PersonaTokenJson.contractName, PersonaTokenJson.abi);
    console.log('PersonaContract: initialize complete')
  }

  async createPersona(name) {
    await this.contract.methods.createPersona(name).send();
  }

  async newPersonaHandler(err, event) {
    if(err) {
      return console.error(err);
    }
    console.log('New Persona created! Name: ', event.returnValues._name);
    console.log('PersonaId: ', event.returnValues._personaId);
  }
  
  async registerContractEvents() {
    this.contract.events.NewPersona({}, (err, event) => 
      this.newPersonaHandler(err, event)
    );
    console.log('REGISTERED EVENTS')
  }
}
