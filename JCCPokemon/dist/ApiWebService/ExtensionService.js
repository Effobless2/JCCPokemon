"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ExtensionService {
    static CreateNewExtension(newExtension, logo, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let f = new FormData();
            f.append("englishName", newExtension.englishName);
            f.append("frenchName", newExtension.frenchName);
            f.append("blocId", newExtension.blocId);
            f.append("logo", logo);
            f.append("symbol", symbol);
            /*
            f.append("image", image);
            f.append("newExtension", JSON.stringify(newExtension));*/
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/Admin/CreateNewExtension");
            return new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status != 200) {
                        reject(xhr.status);
                    }
                    else {
                        resolve(xhr.status);
                    }
                };
                xhr.onerror = () => {
                    reject(xhr.status);
                };
                xhr.onloadend = () => {
                    if (xhr.status != 200) {
                        reject(xhr.status);
                    }
                    else {
                        resolve(xhr.status);
                    }
                };
                xhr.send(f);
            }).then(() => {
                return xhr.status;
            }).catch(err => { return err; });
        });
    }
}
exports.ExtensionService = ExtensionService;
//# sourceMappingURL=ExtensionService.js.map