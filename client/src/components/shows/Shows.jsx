import PlayForm from './PlayForm';

import './Shows.scss';

const Shows = () => {
	return (
		<div className='shows'>
			<div className='section section-left'>Display Shows</div>
			<div className='section section-right'>
				<PlayForm />
			</div>
		</div>
	);
};

export default Shows;
