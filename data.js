module.exports = function() {
	const faker = require('faker');
	const _ = require('lodash');
    
    const hotelsCount = 100;
    
    let hotelUUIDs = [];
    for (let i = 0; i <= hotelsCount; i++) {
        hotelUUIDs.push(faker.random.uuid());
    }

	function generateImageUrls(n) {
		const result = [];
		for (let i = 0; i <= n; i++) {
			result.push(faker.image.nature());
		}

		return result;
	}

	return {
        hotels: hotelUUIDs.map(uuid => {
			const amenities = [ 'free_parking', 'free_wifi', 'pets', 'restaurant', 'gym', 'pool', 'spa' ];

			return {
				id: uuid,
				name: faker.company.companyName(),
				description: faker.lorem.paragraph(),
				distance_to_venue: faker.random.number({
					min: 1,
					max: 4000
				}),
				rating: parseFloat(faker.finance.amount(0, 5, 1)),
				price_category: [ 'low', 'medium', 'high' ][
					faker.random.number({
						min: 0,
						max: 2
					})
				],
				amenities: _.take(
					amenities,
					faker.random.number({
						min: 0,
						max: amenities.length - 1
					})
				),
				images: generateImageUrls(
					faker.random.number({
						min: 1,
						max: 10
					})
				)
			};
		}),
		rooms: _.times(hotelsCount * 3, (n) => {
			return {
				id: faker.random.uuid(),
				name: faker.commerce.color(),
				description: faker.lorem.paragraph(),
				max_occupancy: faker.random.number({
					min: 1,
					max: 4
				}),
				price_in_usd: parseFloat(faker.finance.amount(10, 400, 2)),
                hotelId: hotelUUIDs[faker.random.number({
					min: 0,
					max: hotelsCount
				})]
			};
		})
	};
};
