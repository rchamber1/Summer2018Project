import Contract from './contract.js';
import PersonaTokenJson from '../../json/PersonaToken.json';

export default class PersonaContract extends Contract {

  constructor() {
    super();
  }

  async initialize() {
    super.initialize(PersonaTokenJson.contractName, PersonaTokenJson.abi);
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
