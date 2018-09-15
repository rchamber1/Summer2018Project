import Contract from './contract.js';
import PersonaContractJson from '../../json/PersonaContract.json';

export default class PersonaContract extends Contract {

  constructor() {
    super();
  }

  async initialize() {
    super(PersonaContractJson.contractName, PersonaContractJson.abi);
  }
  
  // TODO: Make this function register events from THIS contract!
  registerContractEvents() {
    this.contract.events.NewValueSet({}, (err, event) => {
      if(err) {
        return console.error(err);
      }
      console.log('New value set', event.returnValues._value);
    });
  }
}
