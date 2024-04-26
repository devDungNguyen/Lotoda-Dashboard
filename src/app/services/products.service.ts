import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "../utils/definitions";
import { Product } from "../models/product.model";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "Application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(`${BASE_URL}/products`);
  }
}
