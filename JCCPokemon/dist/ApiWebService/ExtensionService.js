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
class ExtensionDatas {
}
class ExtensionService {
    static CreateNewExtension(newExtension, image) {
        return __awaiter(this, void 0, void 0, function* () {
            let f = new FormData();
            //f.append("englishName", newExtension.englishName);
            //f.append("frenchName", newExtension.frenchName);
            //f.append("blocId", newExtension.blocId);
            f.append("file", image);
            console.log(image);
            console.log(image.name);
            console.log(image.type);
            console.log(newExtension);
            /*
            f.append("image", image);
            f.append("newExtension", JSON.stringify(newExtension));*/
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/Admin/CreateNewExtension");
            xhr.onload = (response) => {
                console.log(response);
            };
            xhr.send(f);
            let e = image;
            /*e.blocId = newExtension.blocId;
            e.englishName = newExtension.englishName;
            e.frenchName = newExtension.frenchName;
            e.imageInfos = image;
            */ console.log(e);
            //let res = await fetch(`https://localhost:44390/admin/CreateNewExtension`,{
            //    method:"POST",
            //    body: f,
            //    headers: {
            //        'Accept': 'application/json, text/plain, */*',
            //        'Content-Type': 'application/json'
            //    }
            //}).catch((result) => {return result;})
            //return res.status;
        });
    }
}
exports.ExtensionService = ExtensionService;
//# sourceMappingURL=ExtensionService.js.map