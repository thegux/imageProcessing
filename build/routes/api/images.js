"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("../../helpers/images"));
var fs_1 = __importDefault(require("fs"));
var images = express_1.default.Router();
images.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, imageExtension, originalImageInfo, width, height, imagePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageName = String(req.query.imageName);
                imageExtension = String(req.query.imageExtension);
                imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';
                return [4 /*yield*/, images_1.default.imageParams(imageName)];
            case 1:
                originalImageInfo = _a.sent();
                width = isNaN(Number(req.query.width)) ? originalImageInfo.width : Number(req.query.width);
                height = isNaN(Number(req.query.height)) ? originalImageInfo.height : Number(req.query.height);
                imagePath = "images/resized/".concat(imageName, "(").concat(width, "x").concat(height, ").").concat(imageExtension);
                if (fs_1.default.existsSync(imagePath)) {
                    res.status(200);
                    res.sendFile(imagePath, { root: '.' });
                }
                else {
                    res.status(404);
                    res.send("This image doesn't exist, please provide an image in the folder images->source");
                }
                return [2 /*return*/];
        }
    });
}); });
images.get('/images/imageProcessing', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, imageExtension, originalImageInfo, width, height, invalidDimensions, redirectPath, resizedImageExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageName = String(req.query.imageName);
                imageExtension = String(req.query.imageExtension);
                imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';
                return [4 /*yield*/, images_1.default.imageParams(imageName)];
            case 1:
                originalImageInfo = _a.sent();
                width = isNaN(Number(req.query.width)) ? originalImageInfo.width : Number(req.query.width);
                height = isNaN(Number(req.query.height)) ? originalImageInfo.height : Number(req.query.height);
                invalidDimensions = isNaN(Number(req.query.width)) && isNaN(Number(req.query.height));
                redirectPath = "/images?imageName=".concat(imageName, "&imageExtension=").concat(imageExtension, "&width=").concat(width, "&height=").concat(height);
                if (!originalImageInfo.imageExists) {
                    res.status(404);
                    res.send("Source image doesn't exist, please provide an image in the folder images->source");
                }
                else {
                    if (imageName && width && height && !invalidDimensions) {
                        resizedImageExists = fs_1.default.existsSync("images/resized/".concat(imageName, "(").concat(width, "x").concat(height, ").").concat(imageExtension));
                        if (!resizedImageExists) {
                            images_1.default
                                .resizeImage(imageName, width, height, imageExtension)
                                .then(function () {
                                res.status(302);
                                res.redirect(redirectPath);
                            }).catch(function (e) {
                                res.status(400);
                                res.send("The following error occured when trying to resize the image: ".concat(e));
                            });
                        }
                        else {
                            res.status(302);
                            res.redirect(redirectPath);
                        }
                    }
                    else {
                        res.status(400);
                        res.send("This api requires an imageName (type = string), width (type = number) or height (type = number) parameter to properly resize it");
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = images;
