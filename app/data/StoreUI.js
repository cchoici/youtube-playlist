import Store from 'electron-store';
import StoreBasic from './StoreBasic';

export default class StoreUI extends StoreBasic {
  static init(name) {
    this.data = new Store({ name });  
  }
}
