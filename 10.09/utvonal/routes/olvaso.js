import { Router } from "express";

const olvasoRoutes = Router();

olvasoRoutes.get('/',(req,res) => {
    res.send('olvasora erkezel')
});

olvasoRoutes.post('/',(req,res) => {
    res.send('olvasora erkezel')
});

olvasoRoutes.put('/',(req,res) => {
    res.send('olvasora erkezel')
});

olvasoRoutes.delete('/',(req,res) => {
    res.send('olvasora erkezel')
});

export default olvasoRoutes;