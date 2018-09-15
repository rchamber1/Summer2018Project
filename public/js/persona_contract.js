import Web3 from 'web3';
import SimpleStore from './public/SimpleStore.json';
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js';


export default class PersonaContract {

  async initialize() {
    const clientHost = "192.168.86.72";
    setWeb3Provider(createLoomClient(clientHost));
    const loomContractAddress = await client.getContractAddressAsync('PersonaContract');
    const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)
    // TODO: Make this NOT be SimpleStore
    setContract(contractAddress, SimpleStore.abi)
  }

  createLoomClient(clientHost) {
    return new Client(
      'default',
      `ws://${clientHost}:46657/websocket`,
      `ws://${clientHost}:9999/queryws`,
    );
  }
  
  setWeb3Provider(loomClient) {
    privateKey = CryptoUtils.generatePrivateKey();
    publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
    web3js = new Web3(new LoomProvider(loomClient, privateKey));
  }
  
  setContract(address, ABI) {
    // TODO: Use a real logger lib instead of the console logger.
    //       Needs to be able to specify log_level so we can control output
    console.log(ABI);
    //const loomContractAddress = client.getContractAddressAsync("SimpleStore")
    //console.log(loomContractAddress);
    const from = LocalAddress.fromPublicKey(publicKey).toString(); // The address for the caller of the function
    this.contract = new web3.eth.Contract(ABI, address, {from});
    console.log("CONTRACT");
    console.log(this.contract);
  }
  
  registerContractEvents() {
    this.contract.events.NewValueSet({}, (err, event) => {
      if(err) {
        return console.error(err);
      }
      console.log('New value set', event.returnValues._value);
    });
  }
}
