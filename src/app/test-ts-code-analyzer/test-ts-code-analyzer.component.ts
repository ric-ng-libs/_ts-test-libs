import { Component, OnInit } from '@angular/core';


// import { 
//   GenericList
// } from '@ric-ng/ts-general'; // cf. tsconfig.json (baseUrl+paths), la rech. de ce chemin
//                                           // NON relatif, mènera à ./dist/ts-general/package.json -
//                                           //  (champ typings...)
//                                           // MAIS ATTENTION, cette syntaxe d'import n'est surtout pas celle à
//                                           // utiliser depuis le code des sources de ma lib ! (dans /projects/)
//                                           // Car en prod. (répertoire dist/ publié et "NPM-installé"),
//                                           // le tsconfig.json n'existera pas !!
//                                           // Donc la syntaxe d'import à utiliser dans les sources de ma lib,
//                                           // sera :
//                                           //  - soit, avec chemin relatif pour faire réf. à des sources de
//                                           //    la lib. elle-même.
//                                           //  - soit du style : import ... from '@aaa/bbb'
//                                           //    avec '@aaa', organisation/namespace NPM où a été publié
//                                           //    le package 'bbb', dont donc dépend notre lib.
//                                           //    En pareil cas, ce package devra ici être installé via NPM i,
//                                           //    (donc dans /node_modules/@aaa/bbb/), afin de ne pas avoir
//                                           //    d'erreur de compil./build ici.

@Component({
  selector: 'app-test-ts-code-analyzer',
  templateUrl: './test-ts-code-analyzer.component.html',
  styleUrls: ['./test-ts-code-analyzer.component.css']
})
export class TestTsCodeAnalyzerComponent implements OnInit {

  libraryName: string = "ts-code-analyzer";
  libraryDescription: string = "Analyseur de code.";  


  constructor() {
  }
  

  ngOnInit() {

  }

}
