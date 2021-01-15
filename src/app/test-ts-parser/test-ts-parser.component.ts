import { Component } from '@angular/core';


import {
  IPattern,
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


  constructor() {
    this.test1(this.getStringToParse());
  }

  private test1(stringToParse: IStringToParse): void {

    const patternsFactory: IPatternsFactory = new PatternsFactory();

    const stringPattern0: IStringPattern = patternsFactory.getStringPattern(" ", 0, null);
    const stringPattern1: IStringPattern = patternsFactory.getStringPattern("let ", 1, null, true);
    const stringPattern2: IStringPattern = patternsFactory.getStringPattern("=", 1, null, true);
    const stringPattern3: IStringPattern = patternsFactory.getStringPattern(" ", 1, null, false);
    const stringPattern4: IStringPattern = patternsFactory.getStringPattern("FIN", 1, null, true);
    const regExpStringPattern1: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[a-z]{1}[a-z0-9]*[ ]*", 1, 1, false);
    const regExpStringPattern2: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[ ]*", 1, 1, false);
    const regExpStringPattern3: IRegExpStringPattern = patternsFactory.getRegExpStringPattern("[0-9]+[ ]*;", 1, 1, false);


    const patternsList: IPatternsList = patternsFactory.getOrderedFullMatchPatternsList([
      stringPattern0,
      stringPattern1,
      regExpStringPattern1,
      stringPattern2,
      regExpStringPattern2,
      regExpStringPattern3
      // stringPattern3,
      // stringPattern2,
      // stringPattern4
    ], 1, null);

    this.stringToParseMatchingsList = this.runParser(stringToParse, patternsList);

    console.log(`stringToParse pointer position: ${stringToParse.getPointerPosition()}\n\n************** FIN ****************`);
  }

  private getStringToParse(): IStringToParse {
    const result: IStringToParse = new StringToParse(this.getStringToParseAsString());
    return (result);
  }

  private getStringToParseAsString(): string {
    const result: string = [
      "let toto = 5;"
      // "ù ù ù",
      // "KbJardin",
      // "aZ99Hu",
      // "mid",
      // "FIN",
      // "autre"
    ].join(" ");
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

}
