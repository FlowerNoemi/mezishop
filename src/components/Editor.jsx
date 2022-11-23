import { useNavigate} from 'react-router-dom';
import { MyButtonmedium}  from '../components/button/Buttoncomponents';
import './editor.css';
import loginlogo from '../assets/logo1.webp';

const Editor = () => {
    const navigate = useNavigate();

const change = () => {
    navigate('/change');
}

const news = () => {
    navigate('/new');
}

return (
    <div className='backgroundEditor' >
        <section className='editorBox'>
            <div className='imgBoxEditor'>
                <h1 className='editorh1'>Szerkesztő felület</h1>
                <img src={loginlogo} loading='lazy' alt='Mézishop logó' title='Mézishop logó' className='imgLogoEditor' />
            </div>
            <div className='editorSection'>
                <MyButtonmedium onClick={news} value='Új termék '></MyButtonmedium>
                <MyButtonmedium onClick={change} value='Termékek módosítása'></MyButtonmedium>
            </div>
        </section>
    </div>
)
}

export default Editor;