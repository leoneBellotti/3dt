import Task from "../models/task.model.js";
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const getCartola = async (req, res) => {
    try {
        
        const response = await axios.get('https://api.cartolafc.globo.com/atletas/mercado');
        res.json(response.data);

        // const filePath = path.resolve('./src/data/cartola.json');
        // const data = fs.readFileSync(filePath, 'utf8');
        // res.json(JSON.parse(data));
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o arquivo JSON',error });
    }
};

export const getMercadoStatus = async (req,res) => {
    try {
        const response = await axios.get('https://api.cartolafc.globo.com/mercado/status');
        res.json(response.data);
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o endereço JSON' });
    }
};

export const getPartidas = async (req,res) => {
    try {
        const response = await axios.get('https://api.cartola.globo.com/partidas');
        const data = response.data;
        res.json(data);
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o endereço JSON' });
    }
};

export const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({user: req.user.id}).populate('user');  // join faz assim
        if (!tasks) return res.status(404).json({message:'task nao encontrada'});
        res.json(tasks);
    } catch (error) {
        return res.status(404).json({message:error})
    }
};

export const createTasks = async (req,res) => {
    try {
        const {title,description,date} = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user:req.user.id
        });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(404).json({message:'falha na criacao da tarefa'})
    }
};

export const getTask = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');
        if(!task) return res.status(404).json({message:"task nao encontrada."});
        res.json(task);
    } catch (error) {
        return res.status(404).json({message:'tarefa nao encontrada'})
    }
};

export const deleteTasks = async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({message:"task nao encontrada."});
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message:'tarefa nao encontrada'})
    }
};

export const updateTasks = async (req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!task) return res.status(404).json({message:"task nao encontrada."});
        res.json(task);
    } catch (error) {
        return res.status(404).json({message:'tarefa nao encontrada'})
    }
};