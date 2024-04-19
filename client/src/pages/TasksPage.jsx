import { useState, useEffect } from 'react';

function TasksPage() {
    const [atletas, setAtletas] = useState([]);
    const [posicaoSelecionada, setPosicaoSelecionada] = useState(null);
    const [ordenacao, setOrdenacao] = useState({
        coluna: null,
        direcao: 'asc',
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/cartola')
            .then(response => response.json())
            .then(data => {
                const atletasData = data.atletas;
                setAtletas(atletasData);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    const handleOrdenar = (coluna) => {
        const isAsc = ordenacao.coluna === coluna && ordenacao.direcao === 'asc';
        setOrdenacao({
            coluna: coluna,
            direcao: isAsc ? 'desc' : 'asc',
        });
        setAtletas(prevAtletas => {
            return [...prevAtletas].sort((a, b) => {
                if (isAsc) {
                    return a[coluna] > b[coluna] ? 1 : -1;
                } else {
                    return a[coluna] < b[coluna] ? 1 : -1;
                }
            });
        });
    };

    const handleFiltrarPorPosicao = (posicaoId) => {
        setPosicaoSelecionada(posicaoId);
    };

    const atletasFiltrados = posicaoSelecionada ? atletas.filter(atleta => atleta.posicao_id === posicaoSelecionada) : atletas;

    return (
        <div>
            <div className="flex">
                <div className="flex justify-center items-center space-x-4 p-4 bg-white">
                    <button className="p-2 rounded-full bg-green-500">
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 12l-8 8-4-4 1.5-1.5L12 16l6.5-6.5L18 10z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded-full bg-red-500">
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V7h2v1z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded-full bg-yellow-500">
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12v5h2V8h-2zm0 6v2h2v-2h-2z" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center items-center space-x-4 p-4 bg-white">
                    <button onClick={() => handleFiltrarPorPosicao(1)} className="p-2 rounded-full bg-gray-200 text-black">
                        Gol
                    </button>
                    <button onClick={() => handleFiltrarPorPosicao(2)} className="p-2 rounded-full bg-gray-200 text-black">
                        Lat
                    </button>
                    <button onClick={() => handleFiltrarPorPosicao(3)} className="p-2 rounded-full bg-gray-200 text-black">
                        Zag
                    </button>
                    <button onClick={() => handleFiltrarPorPosicao(4)} className="p-2 rounded-full bg-gray-200 text-black">
                        Mei
                    </button>
                    <button onClick={() => handleFiltrarPorPosicao(5)} className="p-2 rounded-full bg-gray-200 text-black">
                        Ata
                    </button>
                    <button onClick={() => handleFiltrarPorPosicao(6)} className="p-2 rounded-full bg-gray-200 text-black">
                        Tec
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto mt-3">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('nome')}>
                                Apelido
                                <span className="ml-1">{ordenacao.coluna === 'nome' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('status_id')}>
                                Status
                                <span className="ml-1">{ordenacao.coluna === 'status_id' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('jogos_num')}>
                                Jogos
                                <span className="ml-1">{ordenacao.coluna === 'jogos_num' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('pontos_num')}>
                                Pontos
                                <span className="ml-1">{ordenacao.coluna === 'pontos_num' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('media_num')}>
                                Media
                                <span className="ml-1">{ordenacao.coluna === 'media_num' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('preco_num')}>
                                Preco
                                <span className="ml-1">{ordenacao.coluna === 'preco_num' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleOrdenar('variacao_num')}>
                                Estatísticas
                                <span className="ml-1">{ordenacao.coluna === 'variacao_num' ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">         
                        {atletasFiltrados.map(atleta => (
                            <tr className="text-black" key={atleta.atleta_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.status_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.jogos_num}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.pontos_num}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.media_num}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.preco_num}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atleta.variacao_num}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TasksPage