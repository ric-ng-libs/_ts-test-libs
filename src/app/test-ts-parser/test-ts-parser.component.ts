import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { 
  IToScreenLogger ,
  ToScreenLogger,
  HTMLFactory
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
      
    this.test1ForClass(this.getStringToParseForClass());
    // this.test1Basic(this.getStringToParse());


  }

  ngAfterViewInit(): void {
    // this.testHTML();
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
    
    const result: IStringToParseMatchingsListOrNull = 
      pattern.setStringablesLogger(this.logger).listStringToParseNextConsecutiveMatchings(stringToParse);
  
    this.loggerOutput();

    return(result);
  }


  private loggerOutput(): void {

    window.setTimeout(() => {
      // this.logger.outputToHTMLElement(this.loggerDiv.nativeElement); //Marche pas si pas de timeout !
    }, 1);

    this.logger.outputToConsole();

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





/*
  private test999(stringToParse: IStringToParse): void {

    const patternsFactory: IPatternsFactory = new PatternsFactory();
    const languageTokensProvider: ILanguageTokensProvider = new LanguageTypescriptTokensProvider();
    const languagePatternsFactory: ILanguagePatternsFactory = this.languagePatternsFactory;

    const stringPattern0: IStringPattern = patternsFactory.getStringPattern(" ", 0, null);
    const stringPattern1: IStringPattern = patternsFactory.getStringPattern("let ", 1, null, true);
    const regExpStringPattern1: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[a-z]{1}[a-z0-9]*[ ]*", 1, 1, false);
    const stringPattern2: IStringPattern = patternsFactory.getStringPattern("=", 1, null, true);
    // const stringPattern3: IStringPattern = patternsFactory.getStringPattern(" ", 0, null, false);
    // const stringPattern4: IStringPattern = patternsFactory.getStringPattern("FIN", 1, null, true);
    const regExpStringPattern2: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[ ]*", 0, 1, false);
    const regExpStringPattern3: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[0-9]+[ ]*;", 0, 1, false);

    const spaces0Null: IStringPattern = patternsFactory.getStringPattern(" ", 0, null);
    const spaces1Null: IStringPattern = patternsFactory.getStringPattern(" ", 1, null);
    const exportKeyWord: IStringPattern = patternsFactory.getStringPattern("export", 1, 1);
    const abstractKeyWord: IStringPattern = patternsFactory.getStringPattern("abstract", 1, 1);
    const classKeyWord: IStringPattern = patternsFactory.getStringPattern("class", 1, 1);
    const identifier: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[a-z]{1}[a-z0-9]*", 1, 1, false);
    const classBlockStartToken: IStringPattern = patternsFactory.getStringPattern("{", 1, 1);

    const classBlockEndToken: IStringPattern = patternsFactory.getStringPattern("}", 1, 1);
    // const regExpAnyThingBetween: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("\{(.*)\}", 0, 1, false);


    // const patternsList: IPatternsList = patternsFactory.getOrderedFullMatchPatternsList([
    //   spaces0Null,
      
    //   patternsFactory.getOrderedFullMatchPatternsList([exportKeyWord, spaces1Null], 0, 1),

    //   patternsFactory.getOrderedFullMatchPatternsList([abstractKeyWord, spaces1Null], 0, 1),

    //   patternsFactory.getOrderedFullMatchPatternsList([classKeyWord, spaces1Null], 1, 1),

    //   identifier,

    //   patternsFactory.getOrderedFullMatchPatternsList([spaces0Null, classBlockStartToken], 1, 1),
      
    //   classBlockEndToken
    //   // blockStartToken, regExpAnyThingBetween, blockEndToken

    //   // stringPattern0,
    //   // stringPattern1,
    //   // regExpStringPattern1,
    //   // stringPattern2,
    //   // regExpStringPattern2,
    //   // stringPattern2,
    //   // regExpStringPattern3
    //   // stringPattern3,
    //   // stringPattern2,
    //   // stringPattern4
    // ], 1, null);

    const languageTypescriptClassPattern: IPattern = this.languagePatternsFactory.getClass();

    const spaceToken0Null: IPattern = patternsFactory.getStringPattern( 
      " ",
      0, null
    );
    const spaceToken1Null: IPattern = patternsFactory.getStringPattern( 
      " ",
      1, null
    );    

    const space0Null: IPattern = patternsFactory.getOrderedOneMatchPatternsList([
      spaceToken1Null
    ], 0, 1);

    const space1Null: IPattern = patternsFactory.getOrderedOneMatchPatternsList([
      spaceToken1Null
    ], 1, 1);

    // languageTypescriptClassPattern = patternsFactory.getOrderedFullMatchPatternsList([
    //   space0Null,
      
    //   patternsFactory.getOrderedFullMatchPatternsList([
    //     patternsFactory.getStringPattern("export", 1, 1), //getExportToken
    //     space1Null
    //   ], 1, 1)

    // ], 1, null);

    // const patternsList: IPatternsList = patternsFactory.getOrderedFullMatchPatternsList([
    //   spaces0Null,
      
    //   patternsFactory.getOrderedFullMatchPatternsList([exportKeyWord, spaces1Null], 0, 1),

    //   patternsFactory.getOrderedFullMatchPatternsList([abstractKeyWord, spaces1Null], 0, 1),

    //   patternsFactory.getOrderedFullMatchPatternsList([classKeyWord, spaces1Null], 1, 1),

    //   identifier,

    //   patternsFactory.getOrderedFullMatchPatternsList([spaces0Null, classBlockStartToken], 1, 1),
      
    //   classBlockEndToken
    //   // blockStartToken, regExpAnyThingBetween, blockEndToken

    //   // stringPattern0,
    //   // stringPattern1,
    //   // regExpStringPattern1,
    //   // stringPattern2,
    //   // regExpStringPattern2,
    //   // stringPattern2,
    //   // regExpStringPattern3
    //   // stringPattern3,
    //   // stringPattern2,
    //   // stringPattern4
    // ], 1, null);    

    


    const patternsList2: IPatternsList = patternsFactory.getOrderedFullMatchPatternsList([
    ]);

    this.stringToParseMatchingsListOrNull = this.runParser(stringToParse, languageTypescriptClassPattern);

    console.log(`stringToParse pointer position: ${stringToParse.getPointerPosition()}\n\n************** FIN ****************`);
  }
  */


  
}