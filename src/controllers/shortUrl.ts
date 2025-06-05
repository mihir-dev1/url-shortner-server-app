import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
    const { originalUrl } = req.body;
    try {
        const urlFound = await urlModel.find({ originalUrl });
        if (urlFound.length > 0) {
            res.status(409);
            res.send({ message: 'url already exist please enter unique url' })
        } else {
            const shortUrl = await urlModel.create({ originalUrl });
            res.status(201).send(shortUrl);
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}
export const getUrl = async (req: express.Request, res: express.Response) => {
    // const { originalUrl } = req.body;
    try {
        const urlFound = await urlModel.find();
        if (urlFound.length == 0) {
            res.status(404).send({ message: 'Short url not found' })
        } else {
            res.status(200).send({ message: 'url fetch Successful', data: urlFound });
        }



    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}
export const getUrlById = async (req: express.Request, res: express.Response) => {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    try {
        if (!shortUrl) {
            res.status(404).send({ message: "url not found" });
        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(shortUrl.originalUrl);
        }
    } catch (error) {
        res.status(200).send({ message: 'url fetch Successful', data: shortUrl });
    }
}

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "url deleted successful" });
        }
    } catch(error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}