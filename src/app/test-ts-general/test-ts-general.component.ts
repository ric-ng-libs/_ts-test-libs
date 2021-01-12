import { Component, OnInit } from '@angular/core';


import { 
  Item, IItem,
  GenericList
} from '@ric-ng/ts-general'; // cf. tsconfig.json (baseUrl+paths), la rech. de ce chemin
                                          // NON relatif, mènera à ./dist/ts-general/package.json -
                                          //  (champ typings...)
                                          // MAIS ATTENTION, cette syntaxe d'import n'est surtout pas celle à
                                          // utiliser depuis le code des sources de ma lib ! (dans /projects/)
                                          // Car en prod. (répertoire dist/ publié et "NPM-installé"),
                                          // le tsconfig.json n'existera pas !!
                                          // Donc la syntaxe d'import à utiliser dans les sources de ma lib,
                                          // sera :
                                          //  - soit, avec chemin relatif pour faire réf. à des sources de
                                          //    la lib. elle-même.
                                          //  - soit du style : import ... from '@aaa/bbb'
                                          //    avec '@aaa', organisation/namespace NPM où a été publié
                                          //    le package 'bbb', dont donc dépend notre lib.
                                          //    En pareil cas, ce package devra ici être installé via NPM i,
                                          //    (donc dans /node_modules/@aaa/bbb/), afin de ne pas avoir
                                          //    d'erreur de compil./build ici.

@Component({
  selector: 'app-test-ts-general',
  templateUrl: './test-ts-general.component.html',
  styleUrls: ['./test-ts-general.component.css']
})
export class TestTsGeneralComponent implements OnInit {

  libraryName: string = "ts-general";
  libraryDescription: string = "Classes/Interfaces Typescript - générales.";


  aItems: Array<IItem> = [];
  list1: GenericList<string>;
  list2: GenericList<string>;

  constructor() {

    this.testsItems();
    this.testsGenericList();
  }
  
  testsItems(): void {
    this.aItems = this.aItems.concat([
      new Item(1, 'AAAA'),
      new Item(2, 'BBB')
    ]);
    
  }

  testsGenericList(): void {
        this.list1 = new GenericList<string>();
        this.list1.setAllowNullElement(true);
        this.list1.addElements(Array("A",'B',"C",null));

        this.list2 = new GenericList<string>();
        this.list2.setAllowNullElement(true);
        this.list2.addElementsFromList(this.list1);
        this.list2.addElements(Array("D",'E',"F", null));        

  }

  ngOnInit() {

  }

}
