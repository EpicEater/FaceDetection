import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Logo.png'

function Logo () {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} >
                    <img className="Tilt-inner" alt='logo' src={brain} />   
            </Tilt>
        </div>
    );
}

export default Logo;