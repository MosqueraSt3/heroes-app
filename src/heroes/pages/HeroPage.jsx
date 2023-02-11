import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';

export const HeroPage = () => {

    const navigate = useNavigate();

    const { heroId } = useParams();
    const hero = useMemo( () => getHeroById( heroId ), [ heroId ]);

    const onNavigateBack = () => {
        if ( hero.publisher === 'DC Comics' ) navigate('/dc');
        if ( hero.publisher === 'Marvel Comics' ) navigate('/marvel');
    };

    if ( !hero ) {
        return <Navigate to="/marvel" />
    }

    return (
        <div className='row mt-5'>
            <div className="col-4">
                <img 
                    // To dev mode remove /heroes-app
                    src={ `/heroes/${ hero.id }.jpg` } 
                    alt={ hero.superhero } 
                    className='img-thumbnail animate__animated animate__rubberBand' 
                />
            </div>
            <div className="col-8">
                <h3>{ hero.superhero }</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter ego:</b> { hero.alter_ego }</li>
                    <li className='list-group-item'><b>Publisher:</b> { hero.publisher }</li>
                    <li className='list-group-item'><b>First appereance:</b> { hero.first_appearance }</li>
                </ul>
                <h5 className='mt-3'> Characters </h5>
                <p>{ hero.characters }</p>
                <button
                    className='btn btn-outline-primary'
                    onClick={ onNavigateBack }
                >Back</button>
            </div>
        </div>
    )
}
