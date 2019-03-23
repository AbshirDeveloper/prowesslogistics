import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { driver, broker } from "../utils/interface";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  loggedInStaff;

  post(info) {
    return this.http.post(
      "https://www.prowesslogistics.com/application/php/api/post.php",
      info
    );
  }

  delete(info) {
    return this.http.post(
      "https://www.prowesslogistics.com/application/php/api/delete.php",
      info
    );
  }

  get() {
    return this.http.get<any>(
      "https://www.prowesslogistics.com/application/php/api/get.php"
    );
  }
}
