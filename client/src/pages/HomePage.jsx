import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function HomePage() {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        if(!isAuthenticated) navigate('/login');
    },[isAuthenticated, navigate])


    const [activeItems, setActiveItems] = useState([]);

    const handleClick = (id) => {
        const isActive = activeItems.includes(id);

        if (isActive) {
            setActiveItems(activeItems.filter(itemId => itemId !== id));
        } else {
            setActiveItems([...activeItems, id]);
        }
    };

    const handleRemoveItem = (id) => {
        setActiveItems(activeItems.filter(itemId => itemId !== id));
    };

    return (
        <div>
            {/* Lista de itens */}
            <ul>
                <li className={activeItems.includes(1) ? 'active' : ''} onClick={() => handleClick(1)}>Item 1<span className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemoveItem(1); }}>x</span></li>
                <li className={activeItems.includes(2) ? 'active' : ''} onClick={() => handleClick(2)}>Item 2<span className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemoveItem(2); }}>x</span></li>
                <li className={activeItems.includes(3) ? 'active' : ''} onClick={() => handleClick(3)}>Item 3<span className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemoveItem(3); }}>x</span></li>
            </ul>

            {/* CSS para a classe "active" */}
            <style>
                {`
                    .active {
                        background-color: #dbdbdb;
                        padding: 3px;
                        border-radius: 24px;
                        color: #fff;
                        position: relative;
                    }

                    .remove-btn {
                        position: absolute;
                        top: -8px;
                        right: -8px;
                        background-color: #f00;
                        color: #fff;
                        padding: 2px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
}
export default HomePage