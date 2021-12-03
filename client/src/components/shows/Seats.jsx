import { v4 as uuidv4 } from 'uuid';
import WeekendIcon from '@material-ui/icons/Weekend';

import './Seats.scss';

const Seats = ({ show }) => {
	console.log('show in seats', show);
	return (
		<div className='section'>
			<div className='seats'>
				{show.seats?.map((seatsRow) => (
					<div key={uuidv4()} className='seats-row'>
						{seatsRow.map((seat) => (
							<div key={seat.id} className='seat-group'>
								<div className={seat.isBooked ? 'booked' : 'free'}>
									<WeekendIcon />
								</div>
								{seat.id}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Seats;
