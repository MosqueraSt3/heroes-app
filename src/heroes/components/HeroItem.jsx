import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const HeroItem = ({ 
    id,
    superhero, 
    publisher, 
    alter_ego,
    first_appearance,
    characters,
}) => {

    // To dev mode remove the /heroes-app/
    const heroImg = `/heroes-app/assets/heroes/${ id }.jpg`;

    return (
        <div className='col animate__animated animate__fadeIn mt-2'>
            <div className='card'>
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={ heroImg } className='card-img' alt={ superhero }/>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className='card-title'>{ superhero }</h5>
                            <p className='card-text'>{ alter_ego }</p>
                            {
                                ( alter_ego !== characters ) && ( <p>{ characters }</p> )
                            }
                            <p className='card-text'>
                                <small className='text-muted'>{ first_appearance }</small>
                            </p>
                            <Link to={ `/hero/${ id }` }>
                                More...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

HeroItem.propTypes = {
    id: PropTypes.string.isRequired,
    superhero: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired, 
    alter_ego: PropTypes.string.isRequired,
    first_appearance: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired,
}
