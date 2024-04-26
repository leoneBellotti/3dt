/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React , { useState, useEffect } from 'react';
import axios from'../api/axios';
import { format } from 'date-fns';
import Loading from "../components/TelaLoading";
import CampoFutebol from '../pages/campoPage';

function TasksPage() { 
  const [isLoading, setIsLoading] = useState(true);
  const [atletas, setAtletas] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [status, setStatus] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [rodada, setRodada] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [mediaGeralScouts, setMediaGeralScouts] = useState([]);
  

  const statusColors = {
   2: {id:2, nome: "Dúvida", color: "yellow", icon: "⚠️" },
   3: {id:3, nome: "Suspenso", color: "red", icon: "❌" },
   5: {id:5, nome: "Contundido", color: "red", icon: "💢" },
   6: {id:6, nome: "Nulo", color: "gray", icon: "❓" },
   7: {id:7, nome: "Provável", color: "green", icon: "✅" }
  };
  
  const StatusIcons = ({ statusId }) => {
    const status = statusColors[statusId];
    if (!status) return null;
  
    const { nome, color, icon } = status;
  
    return (
      <div className='flex flex-col text-center'>
        <span className={`text-${color}`}>
          {icon}
        </span>
        {nome}
      </div>
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get('/cartola')
        .then(response => {
          const data = response.data;
          setAtletas(data[0].atletas);
          setClubes(data[0].clubes);
          setStatus(data[0].status);
          setPosicoes(data[0].posicoes);
          setRodada(data[1]);
          setPartidas(data[2].partidas);
          handleLimpaClick();
          setIsLoading(false);
          setMediaGeralScouts(calcularMediaGeral(data[0].atletas));
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const arrayStatus = Object.keys(status).map(key => status[key]);
  const arrayPosicoes = Object.keys(posicoes).map(key => posicoes[key]);

  const fechamentoTimestamp = rodada?.fechamento?.timestamp * 1000;

  const calculateTimeLeft = () => {
    const difference = fechamentoTimestamp - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortedAtletas = [...atletas].sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
      if (!isNaN(parseFloat(columnA)) && !isNaN(parseFloat(columnB))) {
        return sortDirection === 'asc' ? columnA - columnB : columnB - columnA;
      }
      return sortDirection === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    }
    return 0;
  });

  
  const [statusFilter, setStatusFilter] = useState(null);
  const [posicaoFilter, setPosicaoFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState(null);
  const filteredSortedAtletas = sortedAtletas.filter(item => 
    (timeFilter === null || timeFilter.includes(item.clube_id)) && 
    (statusFilter === null || item.status_id === statusFilter) && 
    (posicaoFilter === null || item.posicao_id === posicaoFilter)
  );


  
  var [array_clubes, setArray_clubes] = useState([]);

  const handleClubeClick = (clube_id) => {
    if (!array_clubes.includes(clube_id)) {
      setArray_clubes([...array_clubes, clube_id]);
    }
    // console.log(array_clubes)
    // setTimeFilter(array_clubes);
  };
  useEffect(() => {
    array_clubes.length > 0 ? setTimeFilter(array_clubes):''; 
  }, [array_clubes]);
  
  const [activeTr, setActiveTr] = useState(null);

  const handleClick = (index) => {
    setActiveTr(index === activeTr ? null : index);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM HH:mm');
  };

  const handleLimpaClick = () => {
    setPosicaoFilter(null);
    setStatusFilter(null);
    setTimeFilter(null);
    setArray_clubes([]);
    setActiveItems([]);
  };

  const tamanhoFixo = {
    height: '650px'
  };

  const calcularMediaGeral = (listaAtletas) => {
    const somaScouts = {
      GS: 0,
      G: 0,
      CA: 0,
      CV: 0,
      FS: 0,
      DD: 0,
      RB: 0,
      PE: 0,
      FT: 0,
      FO: 0,
      DE: 0,
      SG: 0,
      DS: 0,
      FC: 0,
      FF: 0,
      P: 0,
      PC: 0,
      I: 0,
    };
    const maxScouts = {};
    for (const key in somaScouts) {
      if (somaScouts.hasOwnProperty(key)) {
        maxScouts[key] = { valor: 0, jogador: null };
      }
    }
  

    listaAtletas.forEach((atleta) => {
      const scout = atleta.scout;
      for (const key in scout) {
        if (scout.hasOwnProperty(key)) {
          somaScouts[key] += scout[key];
          if (scout[key] && maxScouts[key]) {
              if(scout[key] > maxScouts[key].valor){
                maxScouts[key].valor = scout[key];
                maxScouts[key].jogador = atleta;
              }
          }
        }
      }
    });
  
    const mediaGeral = {};
    for (const key in somaScouts) {
      if (somaScouts.hasOwnProperty(key)) {
        mediaGeral[key] = somaScouts[key];
      }
    }
    return [maxScouts,mediaGeral];
  };

  const calcularEstatisticas = (atleta) => {
    const scout = atleta.scout;
    const nomeCompleto = {
      GS: "Gols por partida",
      G: "Gols",
      CA: "Cartões Amarelos",
      CV: "Cartões Vermelhos",
      FS: "Faltas Sofridas",
      DD: "Defesas Difíceis",
      RB: "Roubadas de Bola",
      PE: "Passes Errados",
      FT: "Finalizações na Trave",
      FO: "Finalizações para Fora",
      DS: "Defesas de Pênalti",
      FC: "Faltas Cometidas",
      FF: "Finalizações a Favor",
      P: "Passes",
      PC: "Passes certos",
      I: "Interceptações",
    };
    const estatisticas = {
      GS: scout.GS || 0,
      G: scout.G || 0,
      CA: scout.CA || 0,
      CV: scout.CV || 0,
      FS: scout.FS || 0,
      DD: scout.DD || 0,
      RB: scout.RB || 0,
      PE: scout.PE || 0,
      FT: scout.FT || 0,
      FO: scout.FO || 0,
      DS: scout.DS || 0,
      FC: scout.FC || 0,
      FF: scout.FF || 0,
      P: scout.P || 0,
      PC: scout.PC || 0,
      I: scout.I || 0,
    };
    // console.log(mediaGeralScouts)
    return (
      <ul className="list-disc list-inside">
        {Object.entries(estatisticas).map(([key, value]) => {
          if (value > 0) {
            return (
              <li key={key}>
                <strong>{nomeCompleto[key]}:</strong> {value}
                &nbsp;&nbsp;&nbsp;
                <b>1º da liga:</b> {mediaGeralScouts[0][key].valor} por {mediaGeralScouts[0][key].jogador.apelido} do {clubes[mediaGeralScouts[0][key].jogador.clube_id]?.apelido}
              </li>
            )
          }
          return null;
        })}
      </ul>
    );
  };

  const calcularDadosAtleta = (atleta, ultimaPontuacao) => {
    const precoAtual = atleta.preco_num || 0;
    const minimoParaValorizar = precoAtual + 0.25;
  
    const mediaHistorica = atleta.media_num || 0;
    let estimativaValorizacao;

    if (mediaHistorica && ultimaPontuacao > mediaHistorica) {
      estimativaValorizacao = <span className="text-green-500">+$ Pode valorizar</span>;
    } else {
      estimativaValorizacao = <span className="text-red-500">-$ Talvez desvalorize</span>;
    }
  
    return {
      minimoParaValorizar,
      estimativaValorizacao,
    };
  };

  const calcularDesempenhoCampeonato = (atleta) => {
    const scout = atleta.scout || {};
    const mediaPontos = atleta.media_num || 0;
  
    const pontosScout = {
      CA: -1, // Pontos por cartão amarelo
      DD: 4, // Pontos por defesa difícil
      DE: 3, // Pontos para defesa
      DS: 4, // Pontos para defesa de pênalti
      FC: -2, // Pontos para falta cometida
      FF: 1, // Pontos por finalização a gol
      FO: 0, // Pontos por finalização para fora
      FS: 1, // Pontos por falta sofrida
      FT: 0, // Pontos por finalização na trave
      G: 3, // Pontos por gol
      GS: -2, // Pontos por gol sofrido
      I: 1, // Pontos por interceptação
      PE: -0.5, // Pontos por passe errado
      RB: 0.5, // Pontos por roubada de bola
      P: 0.5, // Pontos por passe
      PC: 1, // Pontos por passe certo
      SG: 2, // Pontos por jogo sem sofrer gol
    };
  
    let pontuacaoTotal = 0;
    for (const stat in scout) {
      if (pontosScout.hasOwnProperty(stat)) {
        pontuacaoTotal += scout[stat] * pontosScout[stat];
      }
    }
  
    let desempenhoCampeonato;
    if (pontuacaoTotal > mediaPontos) {
      desempenhoCampeonato = pontuacaoTotal+' 🟢';
    } else if (pontuacaoTotal < mediaPontos) {
      desempenhoCampeonato = pontuacaoTotal+' 🟠';
    } else {
      desempenhoCampeonato = pontuacaoTotal+' 🟡';
    }
  
    return desempenhoCampeonato;
  };
  
  const DesempenhoCampeonato = (atleta) => {
    const desempenho = calcularDesempenhoCampeonato(atleta);
    return (
      <div>
        Desempenho: {desempenho}
      </div>
    );
  };
  const ativarItem = (id) => {
    const isActive = activeItems.includes(id);
    if (isActive) {
        // setActiveItems(activeItems.filter(itemId => itemId !== id));
    } else {
        setActiveItems([...activeItems, id]);
    }
  };
  const removerActiveItem = (id) => {
    setActiveItems(activeItems.filter(itemId => itemId !== id));
  };
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState([]);

  const enviarJogadoresParaCampo = (atleta) => {
    setJogadoresSelecionados(atleta);
  };

  const listarAtletasComScout = (scoutDesejado, valorDesejado) => {
    const atletasComScout = [];
    // console.log(listaAtletas, scoutDesejado, valorDesejado)
    atletas.forEach((atleta) => {
      const scout = atleta.scout;
      if (scout[scoutDesejado] === valorDesejado) {
        atletasComScout.push(atleta);
      }
    });
    // console.log(atletasComScout)
    return atletasComScout;
  };
  return (
    <div>
      {isLoading ? <Loading /> : ''}
      <CampoFutebol jogadores={jogadoresSelecionados} />
      <div className='bg-white text-black flex justify-center items-center space-x-8 pt-3 px-3'>
        {partidas.map((partida, index) => (
          <div key={index}>
            <div className='flex'>
              <div className="flex items-center space-x-1 text-center">
                <div onClick={() => {handleClubeClick(partida.clube_casa_id);ativarItem(partida.clube_casa_id);}}
                      className={activeItems.includes(partida.clube_casa_id) ? 'active' : ''}>
                  <span className="remove-btn" onClick={(e) => { e.stopPropagation(); removerActiveItem(partida.clube_casa_id); }}>x</span>
                  <img 
                    src={clubes[partida.clube_casa_id]?.escudos['60x60']} 
                    alt={clubes[partida.clube_casa_id]?.nome}
                    title={clubes[partida.clube_casa_id]?.nome}
                    className='block' />
                </div>
                <div>X</div>
                <div onClick={() => {handleClubeClick(partida.clube_visitante_id);ativarItem(partida.clube_visitante_id)}}
                      className={activeItems.includes(partida.clube_visitante_id) ? 'active' : ''}>
                  <img 
                    src={clubes[partida.clube_visitante_id]?.escudos['60x60']} 
                    alt={clubes[partida.clube_visitante_id]?.nome}
                    title={clubes[partida.clube_visitante_id]?.nome}
                    className='block'  />
                  </div>
              </div>
            </div>
            <div className='text-xs text-center pt-2'>{formatDate(partida.partida_data)}</div>
          </div>
        ))}
        <button 
          className='bg-orange-400 text-black rounded-lg p-2' 
          onClick={() => handleLimpaClick()} 
          >Limpar filtros
        </button>
      </div>
      <div className="flex flex-warp">
        <div className="w-3/12 justify-center items-center space-x-4 text-center pt-9 bg-white text-black">
          { status.length != 0 ? 
            arrayStatus.map((item, index) => (
              <button key={index} onClick={() => setStatusFilter(item.id)}>
                <StatusIcons statusId={item.id} />
              </button>
            ))
          : '' }
        </div>
        <div className="w-3/12 justify-center items-center space-x-4 text-center pt-9 bg-white">
          {arrayPosicoes.map((posicaoItem) => (
            <button
              onClick={() => setPosicaoFilter(posicaoItem.id)}
              key={posicaoItem.id}
              className="p-2 w-10 h-10 rounded-full bg-gray-200 text-black">
              {posicaoItem.abreviacao}
              
            </button>
          ))}
        </div>
        <div className='w-5/12 bg-white text-black flex flex-row'>
          {mediaGeralScouts[0]?
          <div className='flex flex-col flex-grow'>
            <b>Goleadores da liga ({mediaGeralScouts[0]['G'].valor} gols):</b>
            <div style={{ overflowY: 'auto', height: '70px' }} className='flex flex-col'>
              {listarAtletasComScout('G', mediaGeralScouts[0]['G'].valor).map((atleta) => (
                <div key={atleta.atleta_id}>
                  <p>{atleta.apelido} do {clubes[atleta.clube_id]?.apelido};</p>
                </div>
              ))}
            </div>
          </div>
          :''}
          
          {mediaGeralScouts[0]?
          <div className='flex flex-col flex-grow'>
            <b>Interceptacoes ({mediaGeralScouts[0]['I'].valor} gols):</b>
            <div style={{ overflowY: 'auto', height: '70px' }} className='flex flex-col'>
              {listarAtletasComScout('I', mediaGeralScouts[0]['I'].valor).map((atleta) => (
                <div key={atleta.atleta_id}>
                  <p>{atleta.apelido} do {clubes[atleta.clube_id]?.apelido};</p>
                </div>
              ))}
            </div>
          </div>
          :''}
        </div>
        <div className='w-1/12 bg-white'>
          {rodada.status_mercado !== 1 ? (
            <div className="flex flex-col items-center text-red-500">
              <span>Mercado</span>
              <span>fechado</span>
              <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          ) : (
            <div className="flex flex-col items-center text-green-500 text-center m-4">
              <span className='text-xs'>Mercado</span>
              <span className='text-xs'>aberto</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              
              {timeLeft.dias > 0 && (
                <span>{timeLeft.dias} dias </span>
              )}
              {timeLeft.horas > 0 && (
                <span className='flex flex-row text-black'>
                  <span className='text-xs pt-1'> Fecha: </span>
                  <span className='font-bold ms-4'>{timeLeft.horas}h</span>
                </span>
              )}
              {Object.keys(timeLeft).length === 0 && (
                <span>Tempo esgotado</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto mt-3" style={tamanhoFixo}>
        <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className='sticky top-0 bg-white z-10'>
                <th scope="col" 
                    className="sticky top-0 bg-white z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('apelido')}>
                    Apelido {sortColumn === 'apelido' && (
                      <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                    )}
                </th>
                <th scope="col" 
                  className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status_id')}>
                  Status {sortColumn === 'status_id' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
              </th>
              <th scope="col" 
                  className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('preco_num')}>
                  Preço {sortColumn === 'preco_num' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
              </th>
              <th scope="col" 
                  className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('variacao_num')}>
                  Var(R$) {sortColumn === 'variacao_num' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
              </th>
              <th scope="col" 
                  className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('pontos_num')}>
                  Pontos {sortColumn === 'pontos_num' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
              </th>
              <th scope="col" 
                  className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('media_num')}>
                  Média {sortColumn === 'media_num' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
              </th>
                <th scope="col" className="sticky top-0 bg-white z-10 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Estatísticas
                </th>
              </tr>
            </thead>
            <tbody className="sticky top-0 z-10 bg-white divide-y divide-gray-200 text-black">
              {filteredSortedAtletas.map((atleta,index) => (
                <React.Fragment key={atleta.atleta_id}>
                  <tr>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      <div className='flex flex-row'>
                        <div className='flex flex-col text-center'>
                          <img src={clubes[atleta.clube_id]?.escudos['60x60']} alt={clubes[atleta.clube_id].apelido} title={clubes[atleta.clube_id].apelido} className="w-14 h-14 mr-2 inline-block" />
                          <span className='me-3 font-bold'>{clubes[atleta.clube_id].abreviacao}</span>
                        </div>
                        <div className='flex flex-row'>
                          {atleta.foto ? 
                            <img src={atleta.foto.replace('FORMATO', '220x220')} alt={atleta.nome} title={atleta.nome} className="h-20 inline-block" /> 
                            :
                            <svg width="80px" height="80px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="24" cy="16" r="6" fill="#2F88FF" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M36 36C36 29.3726 30.6274 24 24 24C17.3726 24 12 29.3726 12 36" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M36 4H44V12" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 4H4V12" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M36 44H44V36" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 44H4V36" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          }
                          <div className='flex flex-col text-left ms-4'>
                            <span className='font-extrabold'>{atleta.apelido}</span>
                            <span>{posicoes[atleta.posicao_id].abreviacao}</span>
                            <small>{atleta.jogos_num} jogos</small>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      <StatusIcons statusId={atleta.status_id} />
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      R$ {atleta.preco_num}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      {atleta.variacao_num > 0 ? (
                        <span className="text-green-500">
                          <svg className="h-4 w-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                          </svg>
                          {atleta.variacao_num}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <svg className="h-4 w-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                          </svg>
                          {atleta.variacao_num*-1}
                        </span>
                      )}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      {atleta.pontos_num}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      {atleta.media_num}
                    </td>
                    <td className="text-center px-6 py-4">
                      {DesempenhoCampeonato(atleta)}
                      {calcularDadosAtleta(atleta, atleta.pontos_num).estimativaValorizacao}<br/>
                      <button 
                        className='me-2 px-2 w-8 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        onClick={() => handleClick(index)}>?</button>
                      <button 
                        className='px-2 w-8 py-1 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
                        onClick={() => enviarJogadoresParaCampo(atleta)}><b>+</b></button>
                    </td>
                  </tr>
                  {activeTr === index && (
                    <tr className='bg-gray-100'>
                      <td colSpan="7">
                        <div className='m-6' style={activeTr === index ? activeStyle : inactiveStyle}>
                          <h2 className="text-xl font-bold mb-2">{atleta.nome}</h2>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p><strong>Posição:</strong> {posicoes[atleta.posicao_id].abreviacao}</p>
                              <p><strong>Jogos:</strong> {atleta.jogos_num}</p>
                              <p><strong>Média de Pontos:</strong> {atleta.media_num}</p>
                              <p><strong>Mínimo para Valorizar:</strong> {calcularDadosAtleta(atleta, atleta.pontos_num).minimoParaValorizar}</p>
                              <p><strong>Estimativa de Valorização:</strong> {calcularDadosAtleta(atleta, atleta.pontos_num).estimativaValorizacao}</p>
                            </div>
                            <div>
                              <p><strong>Pontos:</strong> {atleta.pontos_num}</p>
                              <p><strong>Preço:</strong> R$ {atleta.preco_num}</p>
                              <p><strong>Rodada:</strong> {atleta.rodada_id}</p>
                              <p><strong>Status:</strong> {status[atleta.status_id].nome}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-bold">Scout</h3>
                            {calcularEstatisticas(atleta)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
        </table>
      </div>
      <style>
          {`
              .active {
                  background-color: #dbdbdb;
                  padding:3px;
                  border-radius:24px;
                  color: #fff;
              }
              img{
                cursor:pointer;
              }
              .remove-btn {
                position: absolute;
                top: -8px;
                right: -8px;
                color: #000;
                padding: 2px;
                cursor: pointer;
              }              
          `}
      </style>
    </div>
  );
}
const activeStyle = {
  height: 'auto',
  transition: 'height 0.7s ease',
  overflow: 'hidden',
};

const inactiveStyle = {
  height: 0,
  overflow: 'hidden',
  transition: 'height 0.7s ease',
};
export default TasksPage
