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
  
  async registerContractEvents() {
    this.contract.events.NewPersona({}, (err, event) => {
      if(err) {
        console.log('ERROR!')
        return console.error(err);
      }
      console.log('New Persona created!', event.returnValues);
    });
    console.log('REGISTERED EVENTS')
  }
}
