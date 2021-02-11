import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { StringToParseMatchingsList } from '../../../projects/ts-parser/src/lib/modeles/concreteClasses/StringToParseMatchingsList';

import { 
  IToScreenLogger ,
  ToScreenLogger,
  HTMLFactory,
  LoggerMessageType
} from '@ric-ng/ts-general';


import {
  IPattern,
  ILanguagePatternsFactory,
  ILanguageTokensProvider,
  ILanguageStringToParseMatchingInterpreter,
  IStringPattern,
  IRegExpStringPattern,
  IPatternsList,
  IPatternsFactory,
  IStringToParse,
  IStringToParseMatchingsList,
  IStringToParseMatchingsListOrNull,

  PatternsFactory,
  StringPattern,
  RegExpStringPattern,
  OrderedFullMatchPatternsList,
  OrderedOneMatchPatternsList,
  LanguageTypescriptPatternsFactory,
  LanguageTypescriptTokensProvider,
  LanguageTypescriptStringToParseMatchingInterpreter,

  StringToParse,
  
} from '@ric-ng/ts-parser';




@Component({
  selector: 'app-test-ts-parser',
  templateUrl: './test-ts-parser.component.html',
  styleUrls: ['./test-ts-parser.component.css']
})
export class TestTsParserComponent implements AfterViewInit {

  libraryName: string = "ts-parser";
  libraryDescription: string = "Parser";


  @ViewChild("loggerDiv", {static: false})
  private loggerDiv: ElementRef<HTMLElement>;


  stringToParseMatchingsListOrNull: IStringToParseMatchingsListOrNull;

  private logger: IToScreenLogger;

  private patternsFactory: IPatternsFactory;
  private languageTokensProvider: ILanguageTokensProvider;
  private languagePatternsFactory: ILanguagePatternsFactory;
  private languageStringToParseMatchingInterpreter: ILanguageStringToParseMatchingInterpreter;

  constructor() {

    this.logger = new ToScreenLogger();
    
    this.patternsFactory = new PatternsFactory();
    this.languageTokensProvider = new LanguageTypescriptTokensProvider();
    this.languageStringToParseMatchingInterpreter = new LanguageTypescriptStringToParseMatchingInterpreter();
    this.languagePatternsFactory = new LanguageTypescriptPatternsFactory(
      this.patternsFactory, 
      this.languageTokensProvider,
      this.languageStringToParseMatchingInterpreter
    );

    // this.testLogger();
    // this.testNativeClassesEnhancement();
      
    this.test1ForXML(this.getStringToParseForXML());
    // this.test1ForClass(this.getStringToParseForClass());
    // this.test1Basic(this.getStringToParse());


  }

  ngAfterViewInit(): void {
    // this.testHTML();
  }



  private test1ForXML(stringToParse: IStringToParse): void {

    const languageXMLPattern: IPattern = this.languagePatternsFactory.getXMLTagsPair();
    const pattern1: IPattern = this.patternsFactory.getOrderedOneMatchPatternsList([
      this.patternsFactory.getStringPattern("A"),
      this.patternsFactory.getStringPattern("B")
    ]);    

    this.stringToParseMatchingsListOrNull = this.runParser(stringToParse, languageXMLPattern);

  }
  private test1ForClass(stringToParse: IStringToParse): void {

    const languageTypescriptClassPattern: IPattern = this.languagePatternsFactory.getClass();

    this.stringToParseMatchingsListOrNull = this.runParser(stringToParse, languageTypescriptClassPattern);

    if (this.stringToParseMatchingsListOrNull !== null) {
      // this.stringToParseMatchingsListOrNull.interpret();
    }

  }
  private test1Basic(stringToParse: IStringToParse): void {

    const pattern1: IPattern = this.patternsFactory.getOrderedOneMatchPatternsList([
      this.patternsFactory.getStringPattern("A"),
      this.patternsFactory.getStringPattern("B")
    ]);
    const pattern2: IPattern = this.patternsFactory.getRegExpStringPattern("(A|B)"); 

    this.stringToParseMatchingsListOrNull = this.runParser(stringToParse, pattern1);
    // this.stringToParseMatchingsListOrNull = this.runParser(stringToParse, pattern2);

  }  
  

  private getStringToParseAsStringForXML(): string {
    const result: string = [

      //"<balise1></balise1> " 

      // " <balise1></balise1>  vv <balise2></balise2>  zz",
      "  export   abstract \r  class \r\n NomClas$se4{ \n\r \r  \r\n\r\n }   \n  export  \n\r    "
       +"class Nom_Classe_Z5$ {}   abstract   class \n\r NomClasse5{  }  <balise3></balise3>  \r class NomClasse6{}",

      " <balise1></balise1> class Nom_Classe { } x  class Nom_Classe2 { } <balise2></balise2>",

      " <balise1></balise1>  vv <balise2></balise2>  zz",
      " rr export   abstract \r  class \r\n NomClas$se4{ \n\r \r  \r\n\r\n }  q \n pp export",
      "class Nom_Classe_Z5$ {}   abstract   class \n\r NomClasse5{  }  <balise3></balise3>  \r class NomClasse6{}"

    ].join(" ");
    return (result);
  }  
  private getStringToParseAsStringForClass(): string {
    const result: string = [

      //  "  export expor "
      //"   export class NomClasse {}  export class NomClasse2 {} export class NomClasse3 {}"

      "  export   abstract \r  class \r\n NomClas$se4{ \n\r \r  \r\n\r\n }   \n  export  \n\r    "
       +"class Nom_Classe_Z5$ {}    abstract   class \n\r NomClasse5{  }  \r class NomClasse6{}",

      // "  class NomClasseFIN  {\n\r  \n\r}\n\r  "

    ].join(" ");
    return (result);
  }
  private getStringToParseAsString(): string {
    const result: string = [

      // "ABAABB"
      //"AA"
      "AB"

    ].join(" ");
    return (result);
  }


  //@return {IStringToParseMatchingsListOrNull} null if matching fails.
  private runParser(stringToParse: IStringToParse, pattern: IPattern)
    : IStringToParseMatchingsListOrNull {
    
    const patternsList: IPatternsList = this.patternsFactory.getOrderedOneMatchPatternsList([
      pattern,
      this.languagePatternsFactory.getClass()
    ]);

    const result: IStringToParseMatchingsListOrNull = new StringToParseMatchingsList(patternsList);
    let partialResult: IStringToParseMatchingsListOrNull = null;
const overRecurs: number = 2000;
let nbRecurs: number = 0;
    while(!stringToParse.isPointerAtTheEnd() && nbRecurs<overRecurs) {

      partialResult = patternsList.setStringablesLogger(this.logger).listStringToParseNextConsecutiveMatchings(stringToParse);
      this.logger.addLineToLog("\n\n"+stringToParse.getPointerPosition()+" / "+stringToParse.getMaxPointerPosition(), 
      LoggerMessageType.error, false);
      
      
      if (partialResult === null && !stringToParse.isPointerAtTheEnd()) {
        stringToParse.incrementPointerPosition(1);
      } else {
        result.addStringToParseMatching(partialResult);
        stringToParse.incrementPointerPosition(partialResult.getTotalLength());
      }
      // this.loggerOutput();
      nbRecurs++;
      this.logger.addLineToLog(stringToParse.getPointerPosition()+" / "+stringToParse.getMaxPointerPosition(), 
        LoggerMessageType.error, false);         
    }
  
 
    this.loggerOutput();
    console.log("\n\n--------------\n\n", result);


    return(result);
  }


  private loggerOutput(): void {

    window.setTimeout(() => {
      // this.logger.outputToHTMLElement(this.loggerDiv.nativeElement); //Marche pas si pas de timeout !
    }, 1);

    this.logger.outputToConsole();

  }


  private getStringToParseForXML(): IStringToParse {
    const result: IStringToParse = new StringToParse(this.getStringToParseAsStringForXML());
    return (result);
  }   
  private getStringToParseForClass(): IStringToParse {
    const result: IStringToParse = new StringToParse(this.getStringToParseAsStringForClass());
    return (result);
  }  
  private getStringToParse(): IStringToParse {
    const result: IStringToParse = new StringToParse(this.getStringToParseAsString());
    return (result);
  }  



  private testLogger(): void {
    
    this.logger. addLineToLog("Categ 1");
      this.logger.startBlock(false);
      this.logger.addLineToLog("sous-Categ 10");
        this.logger.startBlock();
        this.logger.addLineToLog("art 101");
        this.logger.addLineToLog(["yo:", this.logger, "/ LineEnd"]);      
        this.logger.addLineToLog("art 102");      
        this.logger.endBlock();
      this.logger.endBlock();

      this.logger.startBlock();
      this.logger.addLineToLog("sous-Categ 11");
        this.logger.startBlock();
        this.logger.addLineToLog("art 111");
        this.logger.addLineToLog(["yo:", this.logger, "/ LineEnd"]);      
        this.logger.addLineToLog("art 112");      
        this.logger.endBlock();
      this.logger.endBlock(true);

      
      this.logger.addLineToLog("Categ 2");
      this.logger.startBlock(false);
      this.logger.addLineToLog("sous-Categ 10");
        this.logger.startBlock();
        this.logger.addLineToLog("art 101");
        this.logger.addLineToLog(["yo:", this.logger, "/ LineEnd"]);      
        this.logger.addLineToLog("art 102");      
        this.logger.endBlock();
      this.logger.endBlock();

      this.logger.startBlock();
      this.logger.addLineToLog("sous-Categ 11");
        this.logger.startBlock();
        this.logger.addLineToLog("art 111");
        this.logger.addLineToLog(["yo:", this.logger, " / LineEnd"]);      
        this.logger.addLineToLog("art 112");      
        this.logger.endBlock();
      this.logger.endBlock(true);

    this.logger.outputToConsole();
    // this.logger.outputToPopup();

    // console.log(this.logger.getLogAsString());


    
  }


  private testHTML(): void {


    this.testLogger();

    const loggerDiv: HTMLElement  = window.document.querySelector("#loggerDivId");
    loggerDiv.appendRawText("xxxxxxxx\n\nxYYYxxxxxx\n\n");

    // const autreDiv: HTMLElement = HTMLFactory.createDiv();
    // autreDiv.style.border="solid red";
    // autreDiv.appendRawText("Ligne1\nLigne2");
    // HTMLFactory.getBody().appendChild(autreDiv);



    // tslint:disable-next-line:no-string-literal
    // loggerDiv.addHTML(HTMLElement["createTextNode"]("QQQQQQQQQQ\n".toHTML())); //Cas particulier pour HTMLElement et l'ajout de static.

    
    window.setTimeout(() => {
      this.logger.outputToHTMLElement(this.loggerDiv.nativeElement); //Marche pas si pas de timeout ! Pourtant bien dans le ngAfterViewInit.
      this.logger.outputToHTMLBody();  //<< Et si je sors cette ligne du setTimeout, l'ajout dynamique dans le ViewChild, ci-dessus, échoue.
    }, 1);

    // this.logger.outputToHTMLBody();
    this.logger.outputToHTMLElement(loggerDiv); //OK, marche sans problème

  }
 
  

  private testNativeClassesEnhancement(): void {
    const w: string = "\n\n OO \r AA  \n\r UU \r\n ZZ";    
    console.log(w.replaceCRLFBy());

    const y: string = String.crDefaultReplacementString;
    console.log(y);

    const zz: string = w.toHTML();
    console.log(zz);

    // const z: number = Array.x;
    // console.log(z);

    // const a: Array<number> = Array(0,5);
    // a.add10();
    // console.log(a);    
  }





}