import Web3 from 'web3';
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js';
import LoomClientConfig from '../../json/loom-client-info.json';


export default class Contract {
  
  constructor() {
    if (new.target === Contract) {
      throw new TypeError('Contract is an interface and cannot be instantiated directly')
    }
  }

  async initialize(name, abi) {
    const clientHost = LoomClientConfig.clientHost;
    this.client = createLoomClient(clientHost);
    setWeb3Provider(this.client);
    const loomContractAddress = await this.client.getContractAddressAsync(name);
    const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)
    setContract(contractAddress, abi)
  }

  createLoomClient(clientHost) {
    return new Client(
      'default',
      `ws://${clientHost}:46658/websocket`,
      `ws://${clientHost}:46658/queryws`,
    );
  }
  
  setWeb3Provider(loomClient) {
    this.privateKey = CryptoUtils.generatePrivateKey();
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey);
    web3 = new Web3(new LoomProvider(loomClient, this.privateKey));
  }
  
  setContract(address, ABI) {
    // TODO: Use a real logger lib instead of the console logger.
    //       Needs to be able to specify log_level so we can control output
    console.log(ABI);
    const from = LocalAddress.fromPublicKey(this.publicKey).toString(); // The address for the caller of the function
    this.contract = new web3.eth.Contract(ABI, address, {from});
    console.log("CONTRACT");
    console.log(this.contract);
  }
}
