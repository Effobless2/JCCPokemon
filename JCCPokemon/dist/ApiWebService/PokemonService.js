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
class PokemonService {
    static CreateNewPokemon(newPokemon, image) {
        return __awaiter(this, void 0, void 0, function* () {
            let f = new FormData();
            f.append("EnglishName", newPokemon.englishName);
            f.append("FrenchName", newPokemon.frenchName);
            f.append("NumPokedex", newPokemon.numPokedex + "");
            f.append("PokemonImage", image);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/Pokemon/CreateNewPokemon");
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
exports.default = PokemonService;
//# sourceMappingURL=PokemonService.js.map