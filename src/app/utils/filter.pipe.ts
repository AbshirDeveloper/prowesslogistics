import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(x: any, search: any): any {
    if(search === undefined || search === null){
      return x;
    }
    return x.filter(function(x){
      return x.name.includes(search) || x.phone.includes(search);
    })
  }
  
}


@Pipe({
  name: 'filterLoads'
})
export class FilterLoadsPipe implements PipeTransform {

  transform(x: any, search: any): any {
    if(search === undefined || search === null){
      return x;
    }
    return x.filter(function(x){
      return x.driver.toLowerCase().includes(search) || x.ref_id.includes(search);
    })
  }
  
}

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(x: any, search: any): any {
    if(search === undefined || search === null){
      return x;
    }
    return x.filter(function(x){
      return new Date(x.date).getTime() > new Date(search).getTime()
    })
  }
  
}