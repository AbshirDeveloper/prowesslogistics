import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterDateStart'
})
export class FilterDateStartPipe implements PipeTransform {

  transform(x: any, search: any): any {
    if(search === undefined || search === null){
      return x;
    }
    return x.filter(function(x){
      return new Date(x.date).getTime() > new Date(search).getTime()
    })
  }
  
}