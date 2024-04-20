import Task from "../models/task.model.js";
import axios from 'axios';
// import fs from 'fs';
// import path from 'path';

export const getCartola = async (req, res) => {
    try {
        const [cartolaResponse, mercadoStatusResponse, partidasResponse] = await Promise.all([
            axios.get('https://api.cartolafc.globo.com/atletas/mercado'),
            axios.get('https://api.cartolafc.globo.com/mercado/status'),
            axios.get('https://api.cartola.globo.com/partidas')
        ]);
        
        const cartolaData = cartolaResponse.data;
        const mercadoStatusData = mercadoStatusResponse.data;
        const partidasData = partidasResponse.data;

        // return { cartolaData, mercadoStatusData, partidasData };
        // const response = await axios.get('https://api.cartolafc.globo.com/atletas/mercado');
        res.json([cartolaData, mercadoStatusData, partidasData]);
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o arquivo JSON',error });
    }
};

export const getMercadoStatus = async (req,res) => {
    try {
        axios.get('https://sports.sportingbet.com/cds-api/coupons/fixtures', {
            headers: {
              'x-bwin-accessid': 'MjcxNjZlZTktOGZkNS00NWJjLTkzYzgtODNkNThkNzZhZDg2',
              'lang': 'pt-br',
              'country': 'BR',
              'userCountry': 'BR',
              // Outros cabeçalhos, se necessário
            },
            params: {
              sportIds: '4',
              couponId: '789',
              skip: '0',
              take: '30',
              sortBy: 'Tags',
              couponSubType: 'Regular',
              statisticsModes: 'None',
              scoreboardMode: 'Slim',
              // Outros parâmetros de consulta, se necessário
            }
          })
          .then(response => {
            // Manipular a resposta aqui
            console.log('Resposta:', response.data);
          })
          .catch(error => {
            // Manipular erros aqui
            console.error('Erro:', error);
          });
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o endereço JSON' });
    }
};

export const getBet = async (req,res) => {
    try {
        const response = await axios.get('https://sports.sportingbet.com/cds-api/coupons/fixtures?x-bwin-accessid=MjcxNjZlZTktOGZkNS00NWJjLTkzYzgtODNkNThkNzZhZDg2&lang=pt-br&country=BR&userCountry=BR&sportIds=4&couponId=789&skip=0&take=30&sortBy=Tags&couponSubType=Regular&statisticsModes=None&scoreboardMode=Slim');
        res.json(response);
    } catch (error) {
        return res.status(404).json({ message: 'Erro ao acessar o endereço JSON',error });
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

export const loginCartola = async (req,res) => {
    const email = 'leone.bellotti@gmail.com';
    const password = 'b3ll0tt1';
    const serviceId = 4728;
    
    const url = 'https://login.globo.com/api/authentication';
    axios.defaults.agent = false;
    const jsonAuth = {
      captcha: '',
      payload: {
        email: email,
        password: password,
        serviceId: serviceId
      }
    };
    
    axios.post(url, jsonAuth, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const result = response.data;
      if (!result.glbId) {
        console.error('Erro: glbId não encontrado no resultado.');
        return;
      }
      console.log('glbId:', result.glbId);
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);
    });
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