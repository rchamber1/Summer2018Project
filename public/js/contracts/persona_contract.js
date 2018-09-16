import Contract from './contract.js';
import PersonaContractJson from '../../json/PersonaContract.json';

export default class PersonaContract extends Contract {

  constructor() {
    super();
  }

  async initialize() {
    super(PersonaContractJson.contractName, PersonaContractJson.abi);
  }
  
  registerContractEvents() {
    this.contract.events.NewPersona({}, (err, event) => {
      if(err) {
        return console.error(err);
      }
      console.log('New Persona created! Id: ', event.returnValues._personaId);
    });
  }
}
