import { Injectable } from "@angular/core";
import { assets } from "./fake-data/assets";
import Asset from "../models/asset";

@Injectable({
  providedIn: "root",
})
export class AssetService {
  constructor() {}

  getAsset(): Asset[] {
    return assets;
  }
}
