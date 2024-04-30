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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z"/></svg>
              // <img src="../src/assets/eye.svg" title='Ver Campo' alt="Olho aberto" className="w-6 h-6" />
            ) : (
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"/></svg>
              // <img src="../src/assets/eye-off.svg" title='Ver Campo' alt="Olho fechado" className="w-6 h-6" />
            )}
          </button>
        </div>
        {visivel && (
        <div className="absolute top-0 right-0 mt-8 mr-0 text-red-600">
          <button className='text-black mt-0 mr-0 bg-gray-200 rounded-full border-2 h-7 w-7 border-gray-300 hover:bg-gray-100' onClick={togglePopup}>📖</button>
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
