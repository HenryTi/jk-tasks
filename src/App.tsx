
import * as React from 'react';
import './App.css';
import { start, NavView, nav } from 'tonva';
import { CApp, appConfig } from './nv';
//import { faceTabs } from 'facetabs';

//const tonvaApp = "bruce/TestApp";

class App extends React.Component {

    private onLogined = async () => {
        nav.setSettings(appConfig);
        await start(CApp, appConfig);
        /*
        let page = <Page header={false}>
          <Tabs tabs={faceTabs} />
        </Page>
        nav.push(page);
        */
        //let b = new B('b');
        //await b.d();
        //nav.push(<div>ddd</div>)
    }
    public render() {
        // notLogined={this.onLogined}
        return <NavView onLogined={this.onLogined} />
    }
}

export default App;

/*
class B extends A {
  constructor(b:string) {
    super(b);
  }
  //get super() {return this.A}
  async test():Promise<string> {return 'B'}
  async superTest() {
    console.log('superTest: ' + super.t())
    return super.test()
  }
  t() {return 'tb'}
  async d() {
    console.log(super.test);
    console.log(this.test);
    console.log(super.t);
    console.log(this.t);
    console.log('A.test ' + await this.superTest());
    console.log('B.test ' + await this.test());
    console.log('A.t ' + super.t());
    console.log('B.t ' + this.t());
  }
}
*/