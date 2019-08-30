import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "mathRound"
})
export class MathRoundPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      return Math.round(value);
    }
  }
}
