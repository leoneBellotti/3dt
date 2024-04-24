/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';
import Draggable from 'react-draggable';
import campoFutebolPNG from '../assets/campo.png';

const CampoFutebol = ({jogadores}) => {
  
  const formacoes = {
    '3-4-3': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'zag', x: 50, y: 180, jogador:null },
      { tipo: 'zag', x: 130, y: 180, jogador:null },
      { tipo: 'zag', x: 208, y: 180, jogador:null },
      { tipo: 'mei', x: 30, y: 100, jogador:null },
      { tipo: 'mei', x: 90, y: 100, jogador:null },
      { tipo: 'mei', x: 160, y: 100, jogador:null },
      { tipo: 'mei', x: 220, y: 100, jogador:null },
      { tipo: 'ata', x: 52, y: 25, jogador:null },
      { tipo: 'ata', x: 130, y: 25, jogador:null },
      { tipo: 'ata', x: 208, y: 25, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '3-5-2': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'zag', x: 50, y: 180, jogador:null },
      { tipo: 'zag', x: 130, y: 180, jogador:null },
      { tipo: 'zag', x: 208, y: 180, jogador:null },
      { tipo: 'mei', x: 30, y: 100, jogador:null },
      { tipo: 'mei', x: 80, y: 100, jogador:null },
      { tipo: 'mei', x: 125, y: 100, jogador:null },
      { tipo: 'mei', x: 170, y: 100, jogador:null },
      { tipo: 'mei', x: 220, y: 100, jogador:null },
      { tipo: 'ata', x: 70, y: 25, jogador:null },
      { tipo: 'ata', x: 180, y: 25, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '4-3-3': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'lat', x: 20, y: 180, jogador:null },
      { tipo: 'zag', x: 80, y: 180, jogador:null },
      { tipo: 'zag', x: 170, y: 180, jogador:null },
      { tipo: 'lat', x: 230, y: 180, jogador:null },
      { tipo: 'mei', x: 40, y: 100, jogador:null },
      { tipo: 'mei', x: 125, y: 100, jogador:null },
      { tipo: 'mei', x: 210, y: 100, jogador:null },
      { tipo: 'ata', x: 52, y: 25, jogador:null },
      { tipo: 'ata', x: 130, y: 25, jogador:null },
      { tipo: 'ata', x: 208, y: 25, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '4-4-2': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'lat', x: 20, y: 180, jogador:null },
      { tipo: 'zag', x: 80, y: 180, jogador:null },
      { tipo: 'zag', x: 170, y: 180, jogador:null },
      { tipo: 'lat', x: 230, y: 180, jogador:null },
      { tipo: 'mei', x: 30, y: 100, jogador:null },
      { tipo: 'mei', x: 90, y: 100, jogador:null },
      { tipo: 'mei', x: 160, y: 100, jogador:null },
      { tipo: 'mei', x: 220, y: 100, jogador:null },
      { tipo: 'ata', x: 70, y: 25, jogador:null },
      { tipo: 'ata', x: 180, y: 25, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '4-5-1': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'lat', x: 20, y: 180, jogador:null },
      { tipo: 'zag', x: 80, y: 180, jogador:null },
      { tipo: 'zag', x: 170, y: 180, jogador:null },
      { tipo: 'lat', x: 230, y: 180, jogador:null },
      { tipo: 'mei', x: 30, y: 100, jogador:null },
      { tipo: 'mei', x: 80, y: 100, jogador:null },
      { tipo: 'mei', x: 125, y: 100, jogador:null },
      { tipo: 'mei', x: 170, y: 100, jogador:null },
      { tipo: 'mei', x: 220, y: 100, jogador:null },
      { tipo: 'ata', x: 125, y: 30, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '5-3-2': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'lat', x: 20, y: 180, jogador:null },
      { tipo: 'zag', x: 75, y: 180, jogador:null },
      { tipo: 'zag', x: 130, y: 180, jogador:null },
      { tipo: 'zag', x: 185, y: 180, jogador:null },
      { tipo: 'lat', x: 230, y: 180, jogador:null },
      { tipo: 'mei', x: 40, y: 100, jogador:null },
      { tipo: 'mei', x: 125, y: 100, jogador:null },
      { tipo: 'mei', x: 210, y: 100, jogador:null },
      { tipo: 'ata', x: 70, y: 25, jogador:null },
      { tipo: 'ata', x: 180, y: 25, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
    '5-4-1': [
      { tipo: 'gol', x: 130, y: 250, jogador:null },
      { tipo: 'lat', x: 20, y: 180, jogador:null },
      { tipo: 'zag', x: 75, y: 180, jogador:null },
      { tipo: 'zag', x: 130, y: 180, jogador:null },
      { tipo: 'zag', x: 185, y: 180, jogador:null },
      { tipo: 'lat', x: 230, y: 180, jogador:null },
      { tipo: 'mei', x: 30, y: 100, jogador:null },
      { tipo: 'mei', x: 90, y: 100, jogador:null },
      { tipo: 'mei', x: 160, y: 100, jogador:null },
      { tipo: 'mei', x: 220, y: 100, jogador:null },
      { tipo: 'ata', x: 125, y: 30, jogador:null },
      { tipo: 'tec', x: -10, y: 240, jogador:null },
    ],
  };
  const posicoes = [
    {id:1, nome:'gol'},
    {id:2, nome:'lat'},
    {id:3, nome:'zag'},
    {id:4, nome:'mei'},
    {id:5, nome:'ata'},
    {id:6, nome:'tec'}
  ]
  const [visivel, setVisivel] = useState(true);
  const [popupAberto, setPopupAberto] = useState(false);
  const [formacaoSelecionada, setFormacaoSelecionada] = useState('4-3-3');
  const [estrategiaSelecionada, setEstrategiaSelecionada] = useState(formacoes[formacaoSelecionada]);


  const toggleVisibilidade = () => {
    setVisivel(!visivel);
  };

  const togglePopup = () => {
    setPopupAberto(!popupAberto);
  };

  const handleEsquemaSelecionado = (esquema) => {
    setFormacaoSelecionada(esquema);
    setEstrategiaSelecionada(formacoes[formacaoSelecionada]);
    togglePopup();
  };

  useEffect(() => {
    if (jogadores && estrategiaSelecionada) {
      const tipoJogador = posicoes.find(posicao => posicao.id === jogadores.posicao_id)?.nome;
      const posicaoVazia = estrategiaSelecionada.find(posicao => posicao.tipo == tipoJogador && posicao.jogador == null);
      if (jogadores.length !== 0 && posicaoVazia && posicaoVazia.jogador == null) {
        // Verifica se posicaoVazia.jogador é null ou undefined antes de acessar a propriedade push
        if (!posicaoVazia.jogador) {
          posicaoVazia.jogador = []; // Inicializa posicaoVazia.jogador como um array se ainda não estiver definido
        }
        // Adiciona o novo jogador ao array de jogadores da posição vazia
        // console.log(posicaoVazia);
        posicaoVazia.jogador=jogadores;
      }
      // console.log(estrategiaSelecionada);
    }
  }, [jogadores])

  const limparJogador = (index) => {
    setEstrategiaSelecionada(prevState => {
      const newState = [...prevState];
      newState[index].jogador = null;
      return newState;
    });
  };
  return (
    <Draggable>
      <div className="absolute z-50" style={{ height: '373px', width: '280px' }}>
        {visivel?
          <div className=''>
            {formacaoSelecionada && (
              <>
                {estrategiaSelecionada.map((posicao, index) => (
                  <div
                    key={index}
                    className=" text-center flex justify-center items-center absolute"
                    style={{ top: `${posicao.y}px`, left: `${posicao.x}px` }}>
                    {posicao.jogador ?
                    <div>
                      <div className='h-7 w-7 overflow-hidden bg-green-600 hover:bg-green-500 cursor-pointer shadow rounded-full border-green-700 border-2'>
                        <img 
                          src={posicao.jogador.foto.replace('FORMATO', '220x220')} 
                          alt={posicao.jogador.nome} title={posicao.jogador.nome}
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ marginTop: '0px' }} />
                      </div>
                      <span 
                      className='text-black absolute bottom-3 left-6 hover:text-red-600 cursor-pointer'
                      onClick={() => limparJogador(index)}>x</span> 
                    </div> 
                    :
                    <span className='h-7 w-7 font-bold bg-green-600 hover:bg-green-500 cursor-pointer shadow rounded-full border-green-700 border-2'>{posicao.tipo}</span>}
                  </div>
                ))}
              </>
            )}            
          </div>
        :''}
        {visivel && (
          <img src={campoFutebolPNG} alt="Campo de Futebol" style={{width: '100%', objectFit: 'cover', objectPosition: 'left top' }} />
        )}
        <div className="absolute top-0 right-0 mt-0 mr-0 bg-gray-200 rounded-full border-2 h-7 w-7 border-gray-300 hover:bg-gray-100">
          <button onClick={toggleVisibilidade}>
            {visivel ? (
              <img src="../src/assets/eye.svg" title='Ver Campo' alt="Olho aberto" className="w-6 h-6" />
            ) : (
              <img src="../src/assets/eye-off.svg" title='Ver Campo' alt="Olho fechado" className="w-6 h-6" />
            )}
          </button>
        </div>
        {visivel && (
        <div className="absolute top-0 right-0 mt-8 mr-0 text-red-600">
          <button className='text-black mt-0 mr-0 bg-gray-200 rounded-full border-2 h-7 w-7 border-gray-300 hover:bg-gray-100' onClick={togglePopup}><img src="../src/assets/tactics.png" style={{width:'30px'}}/></button>
        </div>
        )}
        {popupAberto && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-lime-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Escolha um esquema tático</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formacoes).map((formacao, index) => (
                  <button key={index} onClick={() => handleEsquemaSelecionado(formacao)} className="border border-gray-300 p-4 rounded-lg hover:bg-gray-100 hover:text-black">{formacao}</button>
                ))}
              </div>
              <button onClick={togglePopup} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default CampoFutebol;
