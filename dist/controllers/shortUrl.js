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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrlById = exports.getUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../model/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = req.body;
    try {
        const urlFound = yield shortUrl_1.urlModel.find({ originalUrl });
        if (urlFound.length > 0) {
            res.status(409);
            res.send({ message: 'url already exist please enter unique url' });
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({ originalUrl });
            res.status(201).send(shortUrl);
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.createUrl = createUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { originalUrl } = req.body;
    try {
        const urlFound = yield shortUrl_1.urlModel.find();
        if (urlFound.length == 0) {
            res.status(404).send({ message: 'Short url not found' });
        }
        else {
            res.status(200).send({ message: 'url fetch Successful', data: urlFound });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.getUrl = getUrl;
const getUrlById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
    try {
        if (!shortUrl) {
            res.status(404).send({ message: "url not found" });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(shortUrl.originalUrl);
        }
    }
    catch (error) {
        res.status(200).send({ message: 'url fetch Successful', data: shortUrl });
    }
});
exports.getUrlById = getUrlById;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "url deleted successful" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.deleteUrl = deleteUrl;
