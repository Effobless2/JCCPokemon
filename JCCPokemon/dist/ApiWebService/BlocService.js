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
class BlocService {
    static CreateNewBloc(newBloc) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(`https://localhost:44390/api/Bloc/CreateNewBloc`, {
                method: "POST",
                body: JSON.stringify(newBloc),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).catch((result) => { return result; });
            return res.status;
        });
    }
    static GetAllBlocs() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch('https://localhost:44390/admin/GetAllBlocs', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).catch((result) => { return result; });
            if (res.status == 200) {
                let json = yield res.json();
                let comments = json.map(d => {
                    return d;
                });
                return comments;
            }
        });
    }
}
exports.BlocService = BlocService;
//# sourceMappingURL=BlocService.js.map