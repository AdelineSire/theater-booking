import { v4 as uuidv4 } from 'uuid';
import WeekendIcon from '@material-ui/icons/Weekend';

import './Show.scss';

const Show = ({ show }) => {
	return (
		<div>
			<div className='infos'></div>
			<div className='seats'>
				{show.seats.map((seatsRow) => (
					<div key={uuidv4()} className='seats-row'>
						{seatsRow.map((seat) => (
							<div
								key={seat.id}
								className={seat.isBooked ? 'seat-group' : 'seat-group free'}
							>
								<WeekendIcon />
								{seat.id}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Show;
