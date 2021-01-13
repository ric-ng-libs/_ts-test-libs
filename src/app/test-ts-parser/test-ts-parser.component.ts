import { Component, OnInit } from '@angular/core';


import { 
  IPattern, 
  StringPattern,
  RegExpStringPattern,
  IPatternsList,
  OrderedFullMatchPatternsList,
  OrderedOneMatchPatternsList, 

  IStringToParse,
  StringToParse,
  IStringToParseMatchingsList,
  StringToParseMatchingsListOrNull,
  StringToParseMatchingsList,
} from '@ric-ng/ts-parser';




@Component({
  selector: 'app-test-ts-parser',
  templateUrl: './test-ts-parser.component.html',
  styleUrls: ['./test-ts-parser.component.css']
})
export class TestTsParserComponent implements OnInit {

  libraryName: string = "ts-parser";
  libraryDescription: string = "Parser";  



  stringToParseMatchingsList: IStringToParseMatchingsList;


  constructor() {
    this.test1( this.getStringToParse() );
  }
  
  private test1(stringToParse: IStringToParse): void {
    const patternsList: IPatternsList = new OrderedOneMatchPatternsList();
    
    const regExpStringPattern1: IPattern = new RegExpStringPattern("[a-z0-9]+", false);

    const stringPattern1: IPattern = new StringPattern("DEB");
    const stringPattern2: IPattern = new StringPattern("\n");
    const stringPattern3: IPattern = new StringPattern("MID", false);
    const stringPattern4: IPattern = new StringPattern("FIN");

    patternsList.addPatterns([
      // stringPattern1,
      regExpStringPattern1,
      stringPattern2,
      stringPattern3,
      stringPattern2,
      stringPattern4
    ]);

    this.stringToParseMatchingsList = patternsList.getStringToParseMatchings( stringToParse );

    // stringToParse.incrementPointerPosition(this.stringToParseMatchingsList.getTotalLength());

    console.log(stringToParse.getPointerPosition());
  }

  private getStringToParse(): IStringToParse {
    const result: IStringToParse = new StringToParse( this.getStringToParseAsString() );
    return(result);
  }
  
  private getStringToParseAsString(): string {
    const result: string = [
      // "DEB",
      "ù ù ù",
      "KbJardin",
      "aZ99Hu",
      "mid",
      "FIN",
      "autre"
    ].join("\n");
    return(result);
  }



    //@return {Array<IStringToParseMatching> | null} null if matching fails.
    private getPatternStringToParseMatchings(pattern: IPattern, stringToParse: IStringToParse)
        : StringToParseMatchingsListOrNull {

        let result: StringToParseMatchingsListOrNull = null;
        if (!stringToParse.isPointerAtTheEnd()) {
            let isBadMatchingOccurencesNumber: boolean = false;
    
            let stringToParseMatchings: StringToParseMatchingsListOrNull;
            let match: boolean;

            result = new StringToParseMatchingsList();
            stringToParse.savePointerPosition();
            do {
                stringToParseMatchings = pattern.getStringToParseMatchings(
                    stringToParse
                );
                
                match = (stringToParseMatchings !== null);
                if (match)  {

                    result.addElementsFromList( stringToParseMatchings );
                    
                    isBadMatchingOccurencesNumber = this.hasFoundTooManyMatchingOccurences(
                        pattern, 
                        result.getElementsNumber()
                    );
    
                    stringToParse.incrementPointerPosition(stringToParseMatchings.getTotalLength());
                }            
    
            } while(match && !isBadMatchingOccurencesNumber && !stringToParse.isPointerAtTheEnd());
    
    
            if (!isBadMatchingOccurencesNumber) {
                isBadMatchingOccurencesNumber = this.hasFoundNotEnoughMatchingOccurences(
                    pattern, 
                    result.getElementsNumber()
                );
            }
    
            if (isBadMatchingOccurencesNumber) {
                result = null;
                stringToParse.restoreLastSavedPointerPosition();

            } else {
                stringToParse.cancelLastSavedPointerPosition();

            }
        }        

        return(result);
    }
    
    private hasFoundTooManyMatchingOccurences(pattern: IPattern, matchingOccurencesNumber: number): boolean {
        let result: boolean = false;

        if (pattern.isDefinedMaxOccurencesNumber()) {
            result = (matchingOccurencesNumber > pattern.getMaxOccurencesNumber());
        }

        return(result);
    }

    private hasFoundNotEnoughMatchingOccurences(pattern: IPattern, matchingOccurencesNumber: number): boolean {
        const result: boolean =  (matchingOccurencesNumber < pattern.getMinOccurencesNumber());
        return(result);
    }  
  

  ngOnInit() {

  }

}
