import LaunchIcon from '@material-ui/icons/Launch';

const ShowsList = ({ shows, openShow }) => {
	return (
		<div className='section section2'>
			<h3>Prochaines représentations</h3>
			{shows.length === 0 ? (
				<p>Aucune représentation</p>
			) : (
				<div className='shows-list'>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Heure</th>
								<th>Pièce</th>
								<th>Salle</th>
								<th>Tarif N</th>
								<th>Tarif R</th>
							</tr>
						</thead>
						<tbody>
							{shows.map((show) => (
								<tr key={show._id}>
									<td>{show.date.date}</td>
									<td>{show.date.time}</td>
									<td>{show.play}</td>
									<td>{show.theater.name}</td>
									<td>{show.price1}</td>
									<td>{show.price2}</td>
									<td onClick={() => openShow(show)}>
										<LaunchIcon />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ShowsList;
