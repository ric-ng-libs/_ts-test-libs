import { Component } from '@angular/core';


import {
  IPattern,
  ILanguagePatternsFactory,
  ILanguageTokensProvider,
  IStringPattern,
  IRegExpStringPattern,
  IPatternsList,
  IPatternsFactory,
  IStringToParse,
  IStringToParseMatchingsList,

  PatternsFactory,
  StringPattern,
  RegExpStringPattern,
  OrderedFullMatchPatternsList,
  OrderedOneMatchPatternsList,
  LanguageTypescriptPatternsFactory,
  LanguageTypescriptTokensProvider,

  StringToParse,
  StringToParseMatchingsListOrNull,
  StringToParseMatchingsList,
} from '@ric-ng/ts-parser';




@Component({
  selector: 'app-test-ts-parser',
  templateUrl: './test-ts-parser.component.html',
  styleUrls: ['./test-ts-parser.component.css']
})
export class TestTsParserComponent {

  libraryName: string = "ts-parser";
  libraryDescription: string = "Parser";



  stringToParseMatchingsList: IStringToParseMatchingsList;

  private patternsFactory: IPatternsFactory;
  private languageTokensProvider: ILanguageTokensProvider;
  private languagePatternsFactory: ILanguagePatternsFactory;


  constructor() {
    
    this.patternsFactory = new PatternsFactory();
    this.languageTokensProvider = new LanguageTypescriptTokensProvider();
    this.languagePatternsFactory = new LanguageTypescriptPatternsFactory(
      this.patternsFactory, this.languageTokensProvider
    );
      
    this.test1(this.getStringToParse());
  }


  private test1(stringToParse: IStringToParse): void {

    const languageTypescriptClassPattern: IPattern = this.languagePatternsFactory.getClass();

    this.stringToParseMatchingsList = this.runParser(stringToParse, languageTypescriptClassPattern);

    console.log(`stringToParse pointer position: ${stringToParse.getPointerPosition()}\n\n************** FIN ****************`);
  }
  

  private getStringToParseAsString(): string {
    const result: string = [

      "  export   abstract \r  class \r\n NomClas$se4{ \n\r \r  \r\n\r\n }   \n  export  \n\r    class Nom_Classe_Z5$ {}    abstract   class \n\r NomClasse5{  }  \r class NomClasse6{}",
      "  class NomClasseFIN  {\n\r  \n\r}\n\r  "
    ].join(" ");
    return (result);
  }

  private getStringToParse(): IStringToParse {
    const result: IStringToParse = new StringToParse(this.getStringToParseAsString());
    return (result);
  }


  //@return {StringToParseMatchingsListOrNull} null if matching fails.
  private runParser(stringToParse: IStringToParse, pattern: IPattern)
    : StringToParseMatchingsListOrNull {
    let result: StringToParseMatchingsListOrNull = null;
    
    console.log(`===== PARSER - stringToParse:`, stringToParse.getRemainingStringToParse());

    result = pattern.listStringToParseNextConsecutiveMatchings(stringToParse);

    console.log(`\n\n===== PARSER RESULT :`);
    console.log(result);

    return(result);
  }







  private test999(stringToParse: IStringToParse): void {

    const patternsFactory: IPatternsFactory = new PatternsFactory();
    const languageTokensProvider: ILanguageTokensProvider = new LanguageTypescriptTokensProvider();
    const languagePatternsFactory: ILanguagePatternsFactory = new LanguageTypescriptPatternsFactory(
      patternsFactory, languageTokensProvider
    );

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

    this.stringToParseMatchingsList = this.runParser(stringToParse, languageTypescriptClassPattern);

    console.log(`stringToParse pointer position: ${stringToParse.getPointerPosition()}\n\n************** FIN ****************`);
  }
  
}
